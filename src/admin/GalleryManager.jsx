import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import ImageUpload from './ImageUpload';

export default function GalleryManager() {
    const { data, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingImage, setEditingImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        category: 'Campus'
    });

    const categories = ['Campus', 'Events', 'Facilities', 'Sports', 'Cultural', 'Academic'];

    const openModal = (image = null) => {
        if (image) {
            setEditingImage(image);
            setFormData({
                title: image.title,
                image: image.image,
                category: image.category
            });
        } else {
            setEditingImage(null);
            setFormData({ title: '', image: '', category: 'Campus' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingImage(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingImage) {
            updateGalleryImage(editingImage.id, formData);
        } else {
            addGalleryImage(formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            deleteGalleryImage(id);
        }
    };

    return (
        <>
            <header className="admin-header">
                <h1>Manage Gallery</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <FiPlus /> Add Image
                </button>
            </header>

            <main className="admin-main">
                <div className="admin-card">
                    <div className="admin-card-body">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: 'var(--space-4)'
                        }}>
                            {data.gallery.map(image => (
                                <div key={image.id} style={{
                                    position: 'relative',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <img
                                        src={image.image}
                                        alt={image.title}
                                        style={{
                                            width: '100%',
                                            height: '160px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{
                                        padding: 'var(--space-3)',
                                        background: 'var(--white)'
                                    }}>
                                        <h4 style={{
                                            fontSize: 'var(--text-sm)',
                                            marginBottom: 'var(--space-1)',
                                            color: 'var(--neutral-900)'
                                        }}>
                                            {image.title}
                                        </h4>
                                        <span className="badge badge-primary" style={{ fontSize: 'var(--text-xs)' }}>
                                            {image.category}
                                        </span>
                                        <div className="table-actions" style={{ marginTop: 'var(--space-2)' }}>
                                            <button className="btn-edit" onClick={() => openModal(image)}>
                                                <FiEdit2 />
                                            </button>
                                            <button className="btn-delete" onClick={() => handleDelete(image.id)}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingImage ? 'Edit Image' : 'Add New Image'}</h3>
                            <button className="modal-close" onClick={closeModal}>
                                <FiX />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        placeholder="Image title"
                                    />
                                </div>

                                <ImageUpload
                                    label="Gallery Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />

                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingImage ? 'Update' : 'Add'} Image
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
