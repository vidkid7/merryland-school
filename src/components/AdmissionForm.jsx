import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './AdmissionForm.css';

export default function AdmissionForm({ isOpen, onClose }) {
    const { addContactMessage } = useData();
    const [formData, setFormData] = useState({
        studentName: '',
        dateOfBirth: '',
        grade: '',
        parentName: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.grade) newErrors.grade = 'Grade is required';
        if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Submit the application
        const applicationData = {
            ...formData,
            type: 'admission',
            submittedAt: new Date().toISOString()
        };

        addContactMessage(applicationData);
        console.log("Application submitted successfully:", applicationData);

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
            setFormData({
                studentName: '',
                dateOfBirth: '',
                grade: '',
                parentName: '',
                email: '',
                phone: '',
                address: '',
                message: ''
            });
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="admission-form-overlay" onClick={onClose}>
                <motion.div
                    className="admission-form-modal"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <button className="close-btn" onClick={onClose} aria-label="Close">
                        <FiX />
                    </button>

                    {!submitted ? (
                        <>
                            <div className="form-header">
                                <h2>Apply for Admission</h2>
                                <p>Fill out the form below and we'll get back to you within 24 hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="admission-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiUser /> Student Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            className={`form-input ${errors.studentName ? 'error' : ''}`}
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            placeholder="Enter student's full name"
                                        />
                                        {errors.studentName && <span className="error-message">{errors.studentName}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiCalendar /> Date of Birth *
                                        </label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FiFileText /> Grade Applying For *
                                    </label>
                                    <select
                                        name="grade"
                                        className={`form-input ${errors.grade ? 'error' : ''}`}
                                        value={formData.grade}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Grade</option>
                                        <option value="Nursery">Nursery</option>
                                        <option value="LKG">LKG</option>
                                        <option value="UKG">UKG</option>
                                        <option value="Grade 1">Grade 1</option>
                                        <option value="Grade 2">Grade 2</option>
                                        <option value="Grade 3">Grade 3</option>
                                        <option value="Grade 4">Grade 4</option>
                                        <option value="Grade 5">Grade 5</option>
                                        <option value="Grade 6">Grade 6</option>
                                        <option value="Grade 7">Grade 7</option>
                                        <option value="Grade 8">Grade 8</option>
                                        <option value="Grade 9">Grade 9</option>
                                        <option value="Grade 10">Grade 10</option>
                                    </select>
                                    {errors.grade && <span className="error-message">{errors.grade}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FiUser /> Parent/Guardian Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="parentName"
                                        className={`form-input ${errors.parentName ? 'error' : ''}`}
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        placeholder="Enter parent/guardian name"
                                    />
                                    {errors.parentName && <span className="error-message">{errors.parentName}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiMail /> Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiPhone /> Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+977-XXX-XXXXXXX"
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`form-input ${errors.address ? 'error' : ''}`}
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Your full address"
                                    />
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Additional Information</label>
                                    <textarea
                                        name="message"
                                        className="form-textarea"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Any special requirements or questions..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Submit Application
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="success-message">
                            <motion.div
                                className="success-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 10, stiffness: 200 }}
                            >
                                ✓
                            </motion.div>
                            <h2>Application Submitted!</h2>
                            <p>Thank you for applying to Merryland School. We'll review your application and contact you within 24 hours.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
