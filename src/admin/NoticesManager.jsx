import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from 'react-icons/fi';

export default function NoticesManager() {
    const { data, addNotice, updateNotice, deleteNotice, setLatestNotice } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Academic'
    });

    const categories = ['Academic', 'Events', 'Holiday', 'Exam', 'General'];

    const openModal = (notice = null) => {
        if (notice) {
            setEditingNotice(notice);
            setFormData({
                title: notice.title,
                content: notice.content,
                category: notice.category
            });
        } else {
            setEditingNotice(null);
            setFormData({ title: '', content: '', category: 'Academic' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingNotice(null);
        setFormData({ title: '', content: '', category: 'Academic' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNotice) {
            updateNotice(editingNotice.id, formData);
        } else {
            addNotice({ ...formData, isLatest: false, isPinned: false });
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this notice?')) {
            deleteNotice(id);
        }
    };

    const handleSetLatest = (id) => {
        setLatestNotice(id);
    };

    return (
        <>
            <header className="admin-header">
                <h1>Manage Notices</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <FiPlus /> Add Notice
                </button>
            </header>

            <main className="admin-main">
                <div className="admin-card">
                    <div className="admin-card-body">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.notices.map(notice => (
                                    <tr key={notice.id}>
                                        <td>{notice.title}</td>
                                        <td>
                                            <span className="badge badge-primary">{notice.category}</span>
                                        </td>
                                        <td>{new Date(notice.date).toLocaleDateString()}</td>
                                        <td>
                                            {notice.isLatest && (
                                                <span className="status-badge latest">Latest</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleSetLatest(notice.id)}
                                                    title="Set as Latest"
                                                >
                                                    <FiStar />
                                                </button>
                                                <button className="btn-edit" onClick={() => openModal(notice)}>
                                                    <FiEdit2 />
                                                </button>
                                                <button className="btn-delete" onClick={() => handleDelete(notice.id)}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h3>
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
                                        placeholder="Notice title"
                                    />
                                </div>

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

                                <div className="form-group">
                                    <label className="form-label">Content</label>
                                    <textarea
                                        className="form-textarea"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        required
                                        placeholder="Notice content..."
                                        rows={5}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingNotice ? 'Update' : 'Create'} Notice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
