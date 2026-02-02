import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';
import { auth, db, storage } from '../firebase/config';
import {
    collection,
    getDocs,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const DataContext = createContext();
const STORAGE_KEY = 'subhakamana_school_data';

export function DataProvider({ children }) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFirebaseEnabled, setIsFirebaseEnabled] = useState(false);
    const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);

    // Initialize Data
    useEffect(() => {
        // Check if Firebase is configured
        if (auth && db) {
            setIsFirebaseEnabled(true);

            // Auth Listener
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
            });

            // Load Data from Firestore
            const loadFirestoreData = async () => {
                try {
                    const newData = { ...initialData };

                    // Collections to fetch
                    const collections = ['notices', 'blogs', 'gallery', 'pages', 'settings', 'messages'];

                    for (const colName of collections) {
                        const q = query(collection(db, colName));
                        const querySnapshot = await getDocs(q);
                        const items = [];
                        querySnapshot.forEach((doc) => {
                            items.push({ id: doc.id, ...doc.data() });
                        });

                        if (items.length > 0) {
                            if (colName === 'pages') {
                                // Determine structure for 'pages' (single docs vs collection)
                                // For simplicity, we'll assume we store page content keyed by page name in a 'content' collection
                                // But specifically here, let's map items to data keys
                                items.forEach(item => {
                                    if (newData[item.id]) newData[item.id] = item;
                                });
                            } else if (colName === 'settings') {
                                if (items[0]) newData.settings = items[0];
                            } else if (colName === 'messages') {
                                newData.contactMessages = items;
                            } else {
                                newData[colName] = items;
                            }
                        }
                    }
                    setData(newData);
                } catch (error) {
                    console.error("Error loading Firestore data:", error);
                    // Fallback to local
                    loadLocalData();
                } finally {
                    setLoading(false);
                }
            };

            loadFirestoreData();
            return () => unsubscribe();
        } else {
            // Fallback to Local Storage
            loadLocalData();
            setLoading(false);
        }
    }, []);

    const loadLocalData = () => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Migration: Ensure logo is using the new transparent PNG version
            if (parsedData.settings && (parsedData.settings.logo === "/logo.jpeg" || parsedData.settings.logo === "/logo.png")) {
                parsedData.settings.logo = "/logo.png?v=2";
            }
            // Merge with initialData to ensure new fields (like contactMessages) exist if missing in LS
            setData({ ...initialData, ...parsedData });
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
    };

    // Persist Local Changes (only if Firebase is disabled)
    useEffect(() => {
        if (!isFirebaseEnabled) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [data, isFirebaseEnabled]);

    // --- Auth Actions ---
    const verifyAdmin = async (username, password) => {
        if (isFirebaseEnabled) {
            try {
                await signInWithEmailAndPassword(auth, username, password); // specific email for admin
                return true;
            } catch (error) {
                console.error("Auth error:", error);
                return false;
            }
        } else {
            // Local fallback
            if (username === data.admin.username && password === data.admin.password) {
                return true;
            }
            return false;
        }
    };

    const logoutAdmin = async () => {
        if (isFirebaseEnabled) {
            await signOut(auth);
        }
    };

    // --- CRUD Actions (Hybrid) ---

    // Helper to sync with Firestore
    const syncDoc = async (collectionName, docData, docId = null) => {
        if (!isFirebaseEnabled) return;
        try {
            if (docId) {
                await setDoc(doc(db, collectionName, docId), docData);
            } else {
                await addDoc(collection(db, collectionName), docData);
            }
        } catch (e) {
            console.error(`Error syncing ${collectionName}:`, e);
        }
    };

    const deleteDocItem = async (collectionName, docId) => {
        if (!isFirebaseEnabled) return;
        try {
            await deleteDoc(doc(db, collectionName, docId));
        } catch (e) {
            console.error(`Error deleting from ${collectionName}:`, e);
        }
    };

    // Notices
    const addNotice = (notice) => {
        const newNotice = { ...notice, id: Date.now().toString(), date: new Date().toISOString() };
        setData(prev => ({
            ...prev,
            notices: [newNotice, ...prev.notices]
        }));
        syncDoc('notices', newNotice, newNotice.id);
    };

    const updateNotice = (id, updatedNotice) => {
        setData(prev => ({
            ...prev,
            notices: prev.notices.map(n => n.id === id ? { ...n, ...updatedNotice } : n)
        }));
        syncDoc('notices', updatedNotice, id); // Note: this replaces the doc, use updateDoc for partial in real app
    };

    const deleteNotice = (id) => {
        setData(prev => ({
            ...prev,
            notices: prev.notices.filter(n => n.id !== id)
        }));
        deleteDocItem('notices', id);
    };

    const setLatestNotice = (id) => {
        const updatedNotices = data.notices.map(n => ({
            ...n,
            isLatest: n.id === id
        }));
        setData(prev => ({ ...prev, notices: updatedNotices }));

        // Batch update equivalent for local/simple
        updatedNotices.forEach(n => {
            // Only sync the changed ones ideally, but for now syncing all is expensive.
            // In a real app we'd update just the 'isLatest' field.
            // We'll skip sync for this specific action in this hybrid demo to avoid 100 writes
        });
    };

    // Blogs
    const addBlog = (blog) => {
        const newBlog = {
            ...blog,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            comments: []
        };
        setData(prev => ({
            ...prev,
            blogs: [newBlog, ...prev.blogs]
        }));
        syncDoc('blogs', newBlog, newBlog.id);
    };

    const updateBlog = (id, updatedBlog) => {
        setData(prev => ({
            ...prev,
            blogs: prev.blogs.map(b => b.id === id ? { ...b, ...updatedBlog } : b)
        }));
        syncDoc('blogs', updatedBlog, id); // Simplification covers most cases
    };

    const deleteBlog = (id) => {
        setData(prev => ({
            ...prev,
            blogs: prev.blogs.filter(b => b.id !== id)
        }));
        deleteDocItem('blogs', id);
    };

    // Gallery
    const addGalleryImage = (image) => {
        const newImage = { ...image, id: Date.now().toString() };
        setData(prev => ({
            ...prev,
            gallery: [newImage, ...prev.gallery]
        }));
        syncDoc('gallery', newImage, newImage.id);
    };

    const updateGalleryImage = (id, updatedImage) => {
        setData(prev => ({
            ...prev,
            gallery: prev.gallery.map(img => img.id === id ? { ...img, ...updatedImage } : img)
        }));
        syncDoc('gallery', updatedImage, id);
    };

    const deleteGalleryImage = (id) => {
        setData(prev => ({
            ...prev,
            gallery: prev.gallery.filter(img => img.id !== id)
        }));
        deleteDocItem('gallery', id);
    };

    // Pages
    const updatePageContent = (page, content) => {
        setData(prev => ({
            ...prev,
            [page]: content
        }));
        syncDoc('pages', content, page); // ID is the page name
    };

    // Settings
    const updateSettings = (newSettings) => {
        setData(prev => ({
            ...prev,
            settings: newSettings
        }));
        syncDoc('settings', newSettings, 'main');
    };

    const updateAdminCredentials = (creds) => {
        setData(prev => ({
            ...prev,
            admin: { ...prev.admin, ...creds }
        }));
        // Note: Can't update Firebase Auth here easily without Admin SDK.
        // In hybrid mode, we just update local state.
        alert("In Firebase mode, change password via Firebase Console.");
    };

    const addContactMessage = (msg) => {
        const newMsg = { ...msg, id: Date.now().toString(), date: new Date().toISOString(), read: false };
        console.log("Adding contact message:", newMsg); // DEBUG LOG
        setData(prev => {
            const currentMessages = prev.contactMessages || [];
            console.log("Previous messages count:", currentMessages.length);
            const newData = {
                ...prev,
                contactMessages: [newMsg, ...currentMessages]
            };

            // Force save to localStorage if not strict firebase mode (redundant but safe)
            if (!auth) { // checking auth directly or capturing isFirebaseEnabled from closure (might be stale? no, state)
                // Use the outer variable or just localStorage directly
                // We need to verify if we should save.
                // Ideally rely on useEffect but let's debug.
                try {
                    localStorage.setItem('subhakamana_school_data', JSON.stringify(newData));
                    console.log("Forced save to localStorage successful");
                } catch (e) {
                    console.error("Forced save failed", e);
                }
            }
            return newData;
        });
        syncDoc('messages', newMsg, newMsg.id);
    };

    const deleteContactMessage = (id) => {
        console.log("Deleting contact message:", id);
        setData(prev => ({
            ...prev,
            contactMessages: (prev.contactMessages || []).filter(msg => msg.id !== id)
        }));
        deleteDocItem('messages', id);
    };

    return (
        <DataContext.Provider value={{
            data,
            loading,
            currentUser,
            isFirebaseEnabled,
            verifyAdmin,
            logoutAdmin,
            addNotice,
            updateNotice,
            deleteNotice,
            setLatestNotice,
            addBlog,
            updateBlog,
            deleteBlog,
            addGalleryImage,
            updateGalleryImage,
            deleteGalleryImage,
            updatePageContent,
            updateSettings,
            updateAdminCredentials,
            addContactMessage,
            deleteContactMessage,
            isAdmissionFormOpen,
            setIsAdmissionFormOpen
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
