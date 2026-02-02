import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiFileText, FiTrash2, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './ApplicationsManager.css';

export default function ApplicationsManager() {
    const { data, deleteContactMessage } = useData();
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [filter, setFilter] = useState('all');

    // Filter applications (type: 'admission')
    const rawMessages = data.contactMessages || [];
    console.log("ApplicationsManager Raw Messages:", rawMessages); // DEBUG LOG

    const applications = rawMessages.filter(msg => msg.type === 'admission');
    console.log("ApplicationsManager Filtered Applications:", applications); // DEBUG LOG

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        if (filter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            const appDate = new Date(app.submittedAt).toISOString().split('T')[0];
            return today === appDate;
        }
        if (filter === 'week') {
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return new Date(app.submittedAt) >= weekAgo;
        }
        return true;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await deleteContactMessage(id);
            if (selectedApplication?.id === id) {
                setSelectedApplication(null);
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="applications-manager">
            <div className="applications-header">
                <div>
                    <h2>Student Applications</h2>
                    <p>Manage and review admission applications</p>
                </div>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All ({applications.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
                        onClick={() => setFilter('today')}
                    >
                        Today
                    </button>
                    <button
                        className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
                        onClick={() => setFilter('week')}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <div className="applications-content">
                {filteredApplications.length === 0 ? (
                    <div className="no-applications">
                        <FiFileText size={48} />
                        <h3>No Applications Found</h3>
                        <p>When students apply, their applications will appear here.</p>
                        <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', fontSize: '12px', textAlign: 'left' }}>
                            <strong>Debug Info:</strong><br />
                            Total Messages in DataContext: {rawMessages.length}<br />
                            Filtered (Admission): {applications.length}<br />
                            Current Filter: {filter}<br />
                            Example Msg: {rawMessages.length > 0 ? JSON.stringify(rawMessages[0]) : 'None'}
                        </div>
                    </div>
                ) : (
                    <div className="applications-grid">
                        <div className="applications-list">
                            {filteredApplications.map((app) => (
                                <motion.div
                                    key={app.id}
                                    className={`application-card ${selectedApplication?.id === app.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedApplication(app)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="card-header">
                                        <div>
                                            <h3>{app.studentName}</h3>
                                            <p className="grade-badge">Grade {app.grade}</p>
                                        </div>
                                        <button
                                            className="btn-icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(app.id);
                                            }}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                    <div className="card-info">
                                        <span><FiUser /> {app.parentName}</span>
                                        <span><FiMail /> {app.email}</span>
                                    </div>
                                    <div className="card-footer">
                                        <span className="date">
                                            <FiCalendar />
                                            {formatDate(app.submittedAt)}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <AnimatePresence>
                            {selectedApplication && (
                                <motion.div
                                    className="application-details"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <div className="details-header">
                                        <h3>Application Details</h3>
                                        <button
                                            className="btn-close"
                                            onClick={() => setSelectedApplication(null)}
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="details-content">
                                        <div className="detail-section">
                                            <h4>Student Information</h4>
                                            <div className="detail-grid">
                                                <div className="detail-item">
                                                    <label><FiUser /> Full Name</label>
                                                    <p>{selectedApplication.studentName}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <label><FiCalendar /> Date of Birth</label>
                                                    <p>{selectedApplication.dateOfBirth}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <label><FiFileText /> Grade</label>
                                                    <p>{selectedApplication.grade}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="detail-section">
                                            <h4>Parent/Guardian Information</h4>
                                            <div className="detail-grid">
                                                <div className="detail-item">
                                                    <label><FiUser /> Name</label>
                                                    <p>{selectedApplication.parentName}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <label><FiMail /> Email</label>
                                                    <p>{selectedApplication.email}</p>
                                                </div>
                                                <div className="detail-item">
                                                    <label><FiPhone /> Phone</label>
                                                    <p>{selectedApplication.phone}</p>
                                                </div>
                                                <div className="detail-item full-width">
                                                    <label><FiMapPin /> Address</label>
                                                    <p>{selectedApplication.address}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedApplication.message && (
                                            <div className="detail-section">
                                                <h4>Additional Information</h4>
                                                <div className="message-box">
                                                    <p>{selectedApplication.message}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="detail-section">
                                            <h4>Submission Details</h4>
                                            <div className="detail-item">
                                                <label><FiCalendar /> Submitted At</label>
                                                <p>{formatDate(selectedApplication.submittedAt)}</p>
                                            </div>
                                        </div>

                                        <div className="details-actions">
                                            <a
                                                href={`mailto:${selectedApplication.email}`}
                                                className="btn btn-primary"
                                            >
                                                <FiMail /> Send Email
                                            </a>
                                            <a
                                                href={`tel:${selectedApplication.phone}`}
                                                className="btn btn-secondary"
                                            >
                                                <FiPhone /> Call Parent
                                            </a>
                                            <button
                                                className="btn btn-outline"
                                                onClick={() => handleDelete(selectedApplication.id)}
                                            >
                                                <FiTrash2 /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
