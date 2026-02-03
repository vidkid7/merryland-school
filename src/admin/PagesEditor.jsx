import { useState, useEffect, useCallback } from 'react';
import { useData } from '../context/DataContext';
import { FiSave, FiPlus, FiTrash, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';
import ImageUpload from './ImageUpload';

// Helper component for editing arrays of objects
const ArrayEditor = ({ items, onChange, schema, title, itemLabelKey = 'title' }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCreate = () => {
        const newItem = {};
        schema.forEach(field => newItem[field.key] = '');
        onChange([...items, newItem]);
        setExpandedIndex(items.length);
    };

    const handleChange = (index, key, value) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: value };
        onChange(newItems);
    };

    const handleDelete = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <div style={{ marginBottom: 'var(--space-6)', border: '1px solid var(--neutral-200)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h4 style={{ margin: 0 }}>{title}</h4>
                <button className="btn btn-sm btn-outline" onClick={handleCreate} style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', color: 'var(--primary-600)', borderColor: 'var(--primary-600)' }}>
                    <FiPlus /> Add Item
                </button>
            </div>

            {items.map((item, index) => (
                <div key={index} style={{ marginBottom: 'var(--space-2)', border: '1px solid var(--neutral-100)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div
                        style={{
                            padding: 'var(--space-3)',
                            background: 'var(--neutral-50)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                        <span style={{ fontWeight: 500 }}>{item[itemLabelKey] || `Item ${index + 1}`}</span>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button
                                className="btn btn-sm"
                                onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                                style={{ color: 'var(--error-500)', padding: 0 }}
                            >
                                <FiTrash />
                            </button>
                            {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                    </div>

                    {expandedIndex === index && (
                        <div style={{ padding: 'var(--space-4)', background: 'var(--white)' }}>
                            {schema.map(field => (
                                <div key={field.key}>
                                    {field.type === 'image' ? (
                                        <ImageUpload
                                            label={field.label}
                                            value={item[field.key] || ''}
                                            onChange={(url) => handleChange(index, field.key, url)}
                                        />
                                    ) : field.type === 'textarea' ? (
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '0.8rem' }}>{field.label}</label>
                                            <textarea
                                                className="form-textarea"
                                                value={item[field.key] || ''}
                                                onChange={e => handleChange(index, field.key, e.target.value)}
                                                rows={2}
                                            />
                                        </div>
                                    ) : (
                                        <div className="form-group">
                                            <label className="form-label" style={{ fontSize: '0.8rem' }}>{field.label}</label>
                                            <input
                                                type={field.type || 'text'}
                                                className="form-input"
                                                value={item[field.key] || ''}
                                                onChange={e => handleChange(index, field.key, e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function PagesEditor() {
    const { data, updatePageContent } = useData();
    const [activeTab, setActiveTab] = useState('home');
    const [saved, setSaved] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Local state for each page - initialize from context data
    const [homeData, setHomeData] = useState(data.home);
    const [aboutData, setAboutData] = useState(data.about);
    const [admissionsData, setAdmissionsData] = useState(data.admissions);

    // Track changes
    useEffect(() => {
        setHasUnsavedChanges(true);
    }, [homeData, aboutData, admissionsData]);

    // Keyboard shortcut for save (Ctrl+S or Cmd+S)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, homeData, aboutData, admissionsData]);

    // Sync local state when switching tabs to ensure we have latest data
    const handleTabChange = (tab) => {
        // Save current tab data before switching
        handleSave();
        setActiveTab(tab);
        // Refresh data from context
        setHomeData(data.home);
        setAboutData(data.about);
        setAdmissionsData(data.admissions);
    };

    const handleSave = useCallback(() => {
        if (activeTab === 'home') {
            updatePageContent('home', homeData);
            console.log('✅ Home page content saved');
        } else if (activeTab === 'about') {
            updatePageContent('about', aboutData);
            console.log('✅ About page content saved');
        } else if (activeTab === 'admissions') {
            updatePageContent('admissions', admissionsData);
            console.log('✅ Admissions page content saved');
        }
        setHasUnsavedChanges(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }, [activeTab, homeData, aboutData, admissionsData, updatePageContent]);

    return (
        <>
            <header className="admin-header">
                <h1>Edit Pages</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    {hasUnsavedChanges && !saved && (
                        <span style={{ color: 'var(--warning-600)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                            Unsaved changes
                        </span>
                    )}
                    {saved && (
                        <span style={{ color: 'var(--success-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <FiCheck /> Changes saved!
                        </span>
                    )}
                </div>
            </header>

            <main className="admin-main">
                {/* Floating Save Button */}
                <div style={{
                    position: 'fixed',
                    bottom: 'var(--space-6)',
                    right: 'var(--space-6)',
                    zIndex: 1000
                }}>
                    <button 
                        className="btn btn-primary btn-lg" 
                        onClick={handleSave}
                        style={{
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            fontSize: '1rem',
                            padding: '0.75rem 1.5rem',
                            background: hasUnsavedChanges ? 'var(--primary-600)' : 'var(--success-600)',
                            transition: 'all 0.2s ease'
                        }}
                        title="Save Changes (Ctrl+S)"
                    >
                        {saved ? <FiCheck /> : <FiSave />}
                        {saved ? 'Saved!' : hasUnsavedChanges ? 'Save Changes' : 'All Saved'}
                    </button>
                </div>

                {/* Info Banner */}
                <div style={{ 
                    padding: 'var(--space-4)', 
                    background: 'var(--info-50)', 
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-6)',
                    border: '1px solid var(--info-200)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--space-3)' }}>
                        <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
                        <div>
                            <h4 style={{ margin: 0, marginBottom: 'var(--space-2)', color: 'var(--info-700)' }}>
                                Edit Website Content
                            </h4>
                            <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--info-600)' }}>
                                Make changes to your Home, About, and Admissions pages. Changes save instantly to localStorage and appear immediately on your website. 
                                <strong> Press Ctrl+S or click the floating save button.</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-6)'
                }}>
                    {['home', 'about', 'admissions'].map(tab => (
                        <button
                            key={tab}
                            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleTabChange(tab)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Home Page Editor */}
                {activeTab === 'home' && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>Home Page Content</h3>
                        </div>
                        <div className="admin-card-body">
                            <h4 style={{ marginBottom: 'var(--space-4)' }}>Hero Section</h4>
                            <div className="form-group">
                                <label className="form-label">Hero Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={homeData.hero.title}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, title: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hero Subtitle</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={homeData.hero.subtitle}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, subtitle: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hero Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={homeData.hero.description}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, description: e.target.value }
                                    })}
                                    rows={3}
                                />
                            </div>
                            
                            <ImageUpload
                                label="Hero Background Image"
                                value={homeData.hero.backgroundImage}
                                onChange={(url) => setHomeData({
                                    ...homeData,
                                    hero: { ...homeData.hero, backgroundImage: url }
                                })}
                            />

                            <h4 style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>Quick Info Pills</h4>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={homeData.hero.location || ''}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, location: e.target.value }
                                    })}
                                    placeholder="e.g., Kalanki, Kathmandu"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Established</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={homeData.hero.established || ''}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, established: e.target.value }
                                    })}
                                    placeholder="e.g., Founded 2010"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Students Count</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={homeData.hero.students || ''}
                                    onChange={e => setHomeData({
                                        ...homeData,
                                        hero: { ...homeData.hero, students: e.target.value }
                                    })}
                                    placeholder="e.g., 1500+ Students"
                                />
                            </div>

                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <h4 style={{ marginBottom: 'var(--space-4)' }}>Sections</h4>

                                <ArrayEditor
                                    title="Services"
                                    items={homeData.services || []}
                                    onChange={newItems => setHomeData({ ...homeData, services: newItems })}
                                    schema={[
                                        { key: 'title', label: 'Title' },
                                        { key: 'desc', label: 'Description', type: 'textarea' },
                                        { key: 'icon', label: 'Icon Name (e.g. FiBook)' }
                                    ]}
                                />

                                <ArrayEditor
                                    title="Programs"
                                    items={homeData.programs || []}
                                    onChange={newItems => setHomeData({ ...homeData, programs: newItems })}
                                    schema={[
                                        { key: 'title', label: 'Title' },
                                        { key: 'desc', label: 'Description', type: 'textarea' },
                                        { key: 'image', label: 'Program Image', type: 'image' },
                                        { key: 'icon', label: 'Icon Name' }
                                    ]}
                                />

                                <ArrayEditor
                                    title="Testimonials"
                                    items={homeData.testimonials || []}
                                    onChange={newItems => setHomeData({ ...homeData, testimonials: newItems })}
                                    itemLabelKey="name"
                                    schema={[
                                        { key: 'name', label: 'Name' },
                                        { key: 'role', label: 'Role (e.g. Parent)' },
                                        { key: 'text', label: 'Testimonial', type: 'textarea' },
                                        { key: 'image', label: 'Photo', type: 'image' }
                                    ]}
                                />

                                <ArrayEditor
                                    title="Stats"
                                    items={homeData.stats || []}
                                    onChange={newItems => setHomeData({ ...homeData, stats: newItems })}
                                    itemLabelKey="label"
                                    schema={[
                                        { key: 'label', label: 'Label' },
                                        { key: 'value', label: 'Value' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* About Page Editor */}
                {activeTab === 'about' && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>About Page Content</h3>
                        </div>
                        <div className="admin-card-body">
                            <h4 style={{ marginBottom: 'var(--space-4)' }}>Mission</h4>
                            <div className="form-group">
                                <label className="form-label">Mission Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={aboutData.mission.title}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        mission: { ...aboutData.mission, title: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mission Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={aboutData.mission.description}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        mission: { ...aboutData.mission, description: e.target.value }
                                    })}
                                    rows={3}
                                />
                            </div>

                            <h4 style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>Vision</h4>
                            <div className="form-group">
                                <label className="form-label">Vision Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={aboutData.vision.title}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        vision: { ...aboutData.vision, title: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Vision Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={aboutData.vision.description}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        vision: { ...aboutData.vision, description: e.target.value }
                                    })}
                                    rows={3}
                                />
                            </div>

                            <h4 style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>Principal</h4>
                            <div className="form-group">
                                <label className="form-label">Principal Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={aboutData.principal.name}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        principal: { ...aboutData.principal, name: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Principal Message</label>
                                <textarea
                                    className="form-textarea"
                                    value={aboutData.principal.message}
                                    onChange={e => setAboutData({
                                        ...aboutData,
                                        principal: { ...aboutData.principal, message: e.target.value }
                                    })}
                                    rows={3}
                                />
                            </div>
                            
                            <ImageUpload
                                label="Principal Photo"
                                value={aboutData.principal.image}
                                onChange={(url) => setAboutData({
                                    ...aboutData,
                                    principal: { ...aboutData.principal, image: url }
                                })}
                            />

                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <ArrayEditor
                                    title="Team Members"
                                    items={aboutData.team || []}
                                    onChange={newItems => setAboutData({ ...aboutData, team: newItems })}
                                    itemLabelKey="name"
                                    schema={[
                                        { key: 'name', label: 'Name' },
                                        { key: 'role', label: 'Role' },
                                        { key: 'image', label: 'Photo', type: 'image' }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Admissions Page Editor */}
                {activeTab === 'admissions' && (
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>Admissions Page Content</h3>
                        </div>
                        <div className="admin-card-body">
                            <h4 style={{ marginBottom: 'var(--space-4)' }}>Introduction</h4>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={admissionsData.intro.title}
                                    onChange={e => setAdmissionsData({
                                        ...admissionsData,
                                        intro: { ...admissionsData.intro, title: e.target.value }
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-textarea"
                                    value={admissionsData.intro.description}
                                    onChange={e => setAdmissionsData({
                                        ...admissionsData,
                                        intro: { ...admissionsData.intro, description: e.target.value }
                                    })}
                                    rows={3}
                                />
                            </div>

                            <h4 style={{ marginBottom: 'var(--space-4)', marginTop: 'var(--space-6)' }}>Fees</h4>
                            <div className="grid grid-3" style={{ gap: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label className="form-label">Admission Fee</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={admissionsData.fees.admission}
                                        onChange={e => setAdmissionsData({
                                            ...admissionsData,
                                            fees: { ...admissionsData.fees, admission: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Annual Fee</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={admissionsData.fees.annual}
                                        onChange={e => setAdmissionsData({
                                            ...admissionsData,
                                            fees: { ...admissionsData.fees, annual: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Monthly Fee</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={admissionsData.fees.monthly}
                                        onChange={e => setAdmissionsData({
                                            ...admissionsData,
                                            fees: { ...admissionsData.fees, monthly: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
