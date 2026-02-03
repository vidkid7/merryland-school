import { useState } from 'react';
import { FiLink, FiUpload, FiX, FiCheck } from 'react-icons/fi';

export default function ImageUpload({ value, onChange, label = "Image" }) {
    const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'
    const [previewUrl, setPreviewUrl] = useState(value || '');
    const [uploading, setUploading] = useState(false);

    const handleUrlChange = (url) => {
        setPreviewUrl(url);
        onChange(url);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);

        // Convert to base64 for localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setPreviewUrl(base64String);
            onChange(base64String);
            setUploading(false);
        };
        reader.onerror = () => {
            alert('Error reading file');
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setPreviewUrl('');
        onChange('');
    };

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            
            {/* Upload Method Toggle */}
            <div style={{ 
                display: 'flex', 
                gap: 'var(--space-2)', 
                marginBottom: 'var(--space-3)',
                borderBottom: '1px solid var(--neutral-200)',
                paddingBottom: 'var(--space-2)'
            }}>
                <button
                    type="button"
                    className={`btn btn-sm ${uploadMethod === 'url' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setUploadMethod('url')}
                    style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}
                >
                    <FiLink /> URL Link
                </button>
                <button
                    type="button"
                    className={`btn btn-sm ${uploadMethod === 'file' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setUploadMethod('file')}
                    style={{ fontSize: '0.875rem', padding: '0.375rem 0.75rem' }}
                >
                    <FiUpload /> Upload File
                </button>
            </div>

            {/* URL Input */}
            {uploadMethod === 'url' && (
                <div style={{ marginBottom: 'var(--space-3)' }}>
                    <input
                        type="url"
                        className="form-input"
                        value={value || ''}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                    <small style={{ color: 'var(--neutral-600)', fontSize: '0.75rem', marginTop: 'var(--space-1)', display: 'block' }}>
                        Enter a direct image URL (e.g., from Unsplash, Imgur, or your own server)
                    </small>
                </div>
            )}

            {/* File Upload */}
            {uploadMethod === 'file' && (
                <div style={{ marginBottom: 'var(--space-3)' }}>
                    <label 
                        htmlFor={`file-upload-${label}`}
                        className="btn btn-secondary"
                        style={{ 
                            width: '100%', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)'
                        }}
                    >
                        {uploading ? (
                            <>Processing...</>
                        ) : (
                            <>
                                <FiUpload /> Choose Image File
                            </>
                        )}
                    </label>
                    <input
                        id={`file-upload-${label}`}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        disabled={uploading}
                    />
                    <small style={{ color: 'var(--neutral-600)', fontSize: '0.75rem', marginTop: 'var(--space-1)', display: 'block' }}>
                        Max size: 5MB. Supported: JPG, PNG, GIF, WebP
                    </small>
                </div>
            )}

            {/* Preview */}
            {previewUrl && (
                <div style={{ 
                    position: 'relative',
                    marginTop: 'var(--space-3)',
                    border: '1px solid var(--neutral-200)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                }}>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                        }}
                    />
                    <div style={{
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                        background: 'var(--neutral-100)',
                        color: 'var(--neutral-600)',
                        fontSize: '0.875rem'
                    }}>
                        Invalid image URL
                    </div>
                    <button
                        type="button"
                        onClick={clearImage}
                        style={{
                            position: 'absolute',
                            top: 'var(--space-2)',
                            right: 'var(--space-2)',
                            background: 'var(--error-500)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                        title="Remove image"
                    >
                        <FiX />
                    </button>
                    {previewUrl.startsWith('data:') && (
                        <div style={{
                            position: 'absolute',
                            bottom: 'var(--space-2)',
                            left: 'var(--space-2)',
                            background: 'var(--success-500)',
                            color: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <FiCheck /> Uploaded
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
