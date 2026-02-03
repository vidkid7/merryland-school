import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiSave } from 'react-icons/fi';

export default function SettingsManager() {
    const { data, updateSettings, updateAdminCredentials } = useData();
    const [settings, setSettings] = useState(data.settings);
    const [credentials, setCredentials] = useState({
        username: data.admin.username,
        password: ''
    });
    const [saved, setSaved] = useState(false);

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        updateSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleCredentialsSubmit = (e) => {
        e.preventDefault();
        if (credentials.password) {
            updateAdminCredentials(credentials);
            setSaved(true);
            setCredentials({ ...credentials, password: '' }); // Clear password field
            setTimeout(() => setSaved(false), 2000);
        } else {
            alert('Please enter a new password to update credentials.');
        }
    };

    // Export data as JSON
    const handleExportData = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `school-data-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Import data from JSON
    const handleImportData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    if (window.confirm('This will replace all current data. Are you sure?')) {
                        localStorage.setItem('subhakamana_school_data', JSON.stringify(importedData));
                        window.location.reload();
                    }
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                    console.error('Import error:', error);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <header className="admin-header">
                <h1>Site Settings</h1>
                {saved && (
                    <span style={{ color: 'var(--success-500)', fontWeight: 600 }}>
                        ✓ Settings saved!
                    </span>
                )}
            </header>

            <main className="admin-main">
                <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
                    {/* General Settings */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>General Settings</h3>
                        </div>
                        <form onSubmit={handleSettingsSubmit}>
                            <div className="admin-card-body">
                                <div className="form-group">
                                    <label className="form-label">School Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={settings.schoolName}
                                        onChange={e => setSettings({ ...settings, schoolName: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tagline</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={settings.tagline}
                                        onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={settings.email}
                                        onChange={e => setSettings({ ...settings, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        value={settings.phone}
                                        onChange={e => setSettings({ ...settings, phone: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={settings.address}
                                        onChange={e => setSettings({ ...settings, address: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Google Maps Embed URL</label>
                                    <input
                                        type="url"
                                        className="form-input"
                                        value={settings.mapUrl}
                                        onChange={e => setSettings({ ...settings, mapUrl: e.target.value })}
                                        placeholder="https://www.google.com/maps/embed?..."
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    <FiSave /> Save Settings
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Social Links & Admin */}
                    <div>
                        <div className="admin-card" style={{ marginBottom: 'var(--space-6)' }}>
                            <div className="admin-card-header">
                                <h3>Social Links</h3>
                            </div>
                            <form onSubmit={handleSettingsSubmit}>
                                <div className="admin-card-body">
                                    <div className="form-group">
                                        <label className="form-label">Facebook</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={settings.socialLinks.facebook}
                                            onChange={e => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                                            })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Instagram</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={settings.socialLinks.instagram}
                                            onChange={e => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                                            })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Twitter</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={settings.socialLinks.twitter}
                                            onChange={e => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                                            })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">YouTube</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={settings.socialLinks.youtube}
                                            onChange={e => setSettings({
                                                ...settings,
                                                socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                                            })}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        <FiSave /> Save Social Links
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="admin-card">
                            <div className="admin-card-header">
                                <h3>Admin Credentials</h3>
                            </div>
                            <form onSubmit={handleCredentialsSubmit}>
                                <div className="admin-card-body">
                                    <div style={{ 
                                        padding: 'var(--space-3)', 
                                        background: 'var(--primary-50)', 
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--space-4)',
                                        fontSize: 'var(--text-sm)',
                                        color: 'var(--primary-700)'
                                    }}>
                                        <strong>Note:</strong> Changes will be saved locally. Make sure to remember your new credentials!
                                    </div>
                                    
                                    <div className="form-group">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={credentials.username}
                                            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-input"
                                            value={credentials.password}
                                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                            placeholder="Enter new password"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        <FiSave /> Update Credentials
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="admin-card">
                            <div className="admin-card-header">
                                <h3>Data Backup & Restore</h3>
                            </div>
                            <div className="admin-card-body">
                                <div style={{ 
                                    padding: 'var(--space-3)', 
                                    background: 'var(--info-50)', 
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--space-4)',
                                    fontSize: 'var(--text-sm)',
                                    color: 'var(--info-700)'
                                }}>
                                    <strong>Backup your data:</strong> Export all website data as a JSON file for safekeeping.
                                </div>
                                
                                <button 
                                    onClick={handleExportData} 
                                    className="btn btn-primary"
                                    style={{ marginBottom: 'var(--space-4)', width: '100%' }}
                                >
                                    <FiSave /> Export Data (Backup)
                                </button>

                                <div style={{ 
                                    padding: 'var(--space-3)', 
                                    background: 'var(--warning-50)', 
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--space-4)',
                                    fontSize: 'var(--text-sm)',
                                    color: 'var(--warning-700)'
                                }}>
                                    <strong>Warning:</strong> Importing data will replace all current data. Make sure to backup first!
                                </div>

                                <label 
                                    htmlFor="import-data" 
                                    className="btn btn-secondary"
                                    style={{ width: '100%', cursor: 'pointer', textAlign: 'center' }}
                                >
                                    <FiSave /> Import Data (Restore)
                                </label>
                                <input
                                    id="import-data"
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportData}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
