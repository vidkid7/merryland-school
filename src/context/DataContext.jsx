import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const DataContext = createContext();
const STORAGE_KEY = 'subhakamana_school_data';

export function DataProvider({ children }) {
    const [data, setData] = useState(() => {
        // Initialize from localStorage or use initialData
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // Merge with initialData to ensure new fields exist
                return { ...initialData, ...parsedData };
            } catch (error) {
                console.error("Error parsing saved data:", error);
                return initialData;
            }
        }
        return initialData;
    });
    const [loading, setLoading] = useState(false);
    const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);

    // Persist all data changes to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            console.log("Data saved to localStorage successfully");
        } catch (error) {
            console.error("Error saving to localStorage:", error);
        }
    }, [data]);

    // --- Auth Actions ---
    const verifyAdmin = (username, password) => {
        if (username === data.admin.username && password === data.admin.password) {
            return true;
        }
        return false;
    };

    const logoutAdmin = () => {
        // Clear session storage
        sessionStorage.removeItem('adminLoggedIn');
    };

    // Notices
    const addNotice = (notice) => {
        const newNotice = { ...notice, id: Date.now().toString(), date: new Date().toISOString() };
        setData(prev => ({
            ...prev,
            notices: [newNotice, ...prev.notices]
        }));
    };

    const updateNotice = (id, updatedNotice) => {
        setData(prev => ({
            ...prev,
            notices: prev.notices.map(n => n.id === id ? { ...n, ...updatedNotice } : n)
        }));
    };

    const deleteNotice = (id) => {
        setData(prev => ({
            ...prev,
            notices: prev.notices.filter(n => n.id !== id)
        }));
    };

    const setLatestNotice = (id) => {
        setData(prev => ({
            ...prev,
            notices: prev.notices.map(n => ({
                ...n,
                isLatest: n.id === id
            }))
        }));
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
    };

    const updateBlog = (id, updatedBlog) => {
        setData(prev => ({
            ...prev,
            blogs: prev.blogs.map(b => b.id === id ? { ...b, ...updatedBlog } : b)
        }));
    };

    const deleteBlog = (id) => {
        setData(prev => ({
            ...prev,
            blogs: prev.blogs.filter(b => b.id !== id)
        }));
    };

    // Gallery
    const addGalleryImage = (image) => {
        const newImage = { ...image, id: Date.now().toString() };
        setData(prev => ({
            ...prev,
            gallery: [newImage, ...prev.gallery]
        }));
    };

    const updateGalleryImage = (id, updatedImage) => {
        setData(prev => ({
            ...prev,
            gallery: prev.gallery.map(img => img.id === id ? { ...img, ...updatedImage } : img)
        }));
    };

    const deleteGalleryImage = (id) => {
        setData(prev => ({
            ...prev,
            gallery: prev.gallery.filter(img => img.id !== id)
        }));
    };

    // Pages
    const updatePageContent = (page, content) => {
        setData(prev => ({
            ...prev,
            [page]: content
        }));
    };

    // Settings
    const updateSettings = (newSettings) => {
        setData(prev => ({
            ...prev,
            settings: newSettings
        }));
    };

    const updateAdminCredentials = (creds) => {
        setData(prev => ({
            ...prev,
            admin: { ...prev.admin, ...creds }
        }));
    };

    const addContactMessage = (msg) => {
        const newMsg = { 
            ...msg, 
            id: Date.now().toString(), 
            date: new Date().toISOString(), 
            read: false 
        };
        console.log("Adding contact message:", newMsg);
        setData(prev => {
            const currentMessages = prev.contactMessages || [];
            console.log("Previous messages count:", currentMessages.length);
            return {
                ...prev,
                contactMessages: [newMsg, ...currentMessages]
            };
        });
    };

    const deleteContactMessage = (id) => {
        console.log("Deleting contact message:", id);
        setData(prev => ({
            ...prev,
            contactMessages: (prev.contactMessages || []).filter(msg => msg.id !== id)
        }));
    };

    return (
        <DataContext.Provider value={{
            data,
            loading,
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
