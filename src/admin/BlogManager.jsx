import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import ImageUpload from './ImageUpload';

export default function BlogManager() {
    const { data, addBlog, updateBlog, deleteBlog } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        category: 'Education',
        published: true
    });

    const categories = ['Education', 'Events', 'Technology', 'Sports', 'Arts', 'News'];

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                excerpt: blog.excerpt,
                content: blog.content,
                image: blog.image,
                author: blog.author,
                category: blog.category,
                published: blog.published
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                image: '',
                author: '',
                category: 'Education',
                published: true
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBlog) {
            updateBlog(editingBlog.id, formData);
        } else {
            addBlog(formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            deleteBlog(id);
        }
    };

    const togglePublish = (blog) => {
        updateBlog(blog.id, { published: !blog.published });
    };

    return (
        <>
            <header className="admin-header">
                <h1>Manage Blog Posts</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <FiPlus /> Add Blog Post
                </button>
            </header>

            <main className="admin-main">
                <div className="admin-card">
                    <div className="admin-card-body">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.blogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>{blog.title.substring(0, 40)}...</td>
                                        <td>{blog.author}</td>
                                        <td>
                                            <span className="badge badge-primary">{blog.category}</span>
                                        </td>
                                        <td>{new Date(blog.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => togglePublish(blog)}
                                                    title={blog.published ? 'Unpublish' : 'Publish'}
                                                >
                                                    {blog.published ? <FiEyeOff /> : <FiEye />}
                                                </button>
                                                <button className="btn-edit" onClick={() => openModal(blog)}>
                                                    <FiEdit2 />
                                                </button>
                                                <button className="btn-delete" onClick={() => handleDelete(blog.id)}>
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
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
                        <div className="modal-header">
                            <h3>{editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
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
                                        placeholder="Blog title"
                                    />
                                </div>

                                <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
                                    <div className="form-group">
                                        <label className="form-label">Author</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.author}
                                            onChange={e => setFormData({ ...formData, author: e.target.value })}
                                            required
                                            placeholder="Author name"
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
                                </div>

                                <ImageUpload
                                    label="Blog Post Image"
                                    value={formData.image}
                                    onChange={(url) => setFormData({ ...formData, image: url })}
                                />

                                <div className="form-group">
                                    <label className="form-label">Excerpt (Short Description)</label>
                                    <textarea
                                        className="form-textarea"
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                        required
                                        placeholder="A brief description of the blog post..."
                                        rows={2}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Content (HTML supported)</label>
                                    <textarea
                                        className="form-textarea"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        required
                                        placeholder="<p>Write your blog content here...</p>"
                                        rows={8}
                                    />
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                        />
                                        Publish immediately
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBlog ? 'Update' : 'Create'} Blog Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
