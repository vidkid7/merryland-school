import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './AdmissionForm.css';

export default function AdmissionForm({ isOpen, onClose }) {
    const { addContactMessage } = useData();
    const { t } = useTranslation();
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
        if (!formData.studentName.trim()) newErrors.studentName = t('admissionForm.errors.studentNameRequired');
        if (!formData.dateOfBirth) newErrors.dateOfBirth = t('admissionForm.errors.dobRequired');
        if (!formData.grade) newErrors.grade = t('admissionForm.errors.gradeRequired');
        if (!formData.parentName.trim()) newErrors.parentName = t('admissionForm.errors.parentNameRequired');
        if (!formData.email.trim()) {
            newErrors.email = t('admissionForm.errors.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('admissionForm.errors.emailInvalid');
        }
        if (!formData.phone.trim()) {
            newErrors.phone = t('admissionForm.errors.phoneRequired');
        } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
            newErrors.phone = t('admissionForm.errors.phoneInvalid');
        }
        if (!formData.address.trim()) newErrors.address = t('admissionForm.errors.addressRequired');

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
                                <h2>{t('admissionForm.title')}</h2>
                                <p>{t('admissionForm.subtitle')}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="admission-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiUser /> {t('admissionForm.studentName')} {t('admissionForm.required')}
                                        </label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            className={`form-input ${errors.studentName ? 'error' : ''}`}
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            placeholder={t('admissionForm.placeholders.studentName')}
                                        />
                                        {errors.studentName && <span className="error-message">{errors.studentName}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiCalendar /> {t('admissionForm.dateOfBirth')} {t('admissionForm.required')}
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
                                        <FiFileText /> {t('admissionForm.grade')} {t('admissionForm.required')}
                                    </label>
                                    <select
                                        name="grade"
                                        className={`form-input ${errors.grade ? 'error' : ''}`}
                                        value={formData.grade}
                                        onChange={handleChange}
                                    >
                                        <option value="">{t('admissionForm.selectGrade')}</option>
                                        <option value="Nursery">{t('admissionForm.grades.nursery')}</option>
                                        <option value="LKG">{t('admissionForm.grades.lkg')}</option>
                                        <option value="UKG">{t('admissionForm.grades.ukg')}</option>
                                        <option value="Grade 1">{t('admissionForm.grades.grade1')}</option>
                                        <option value="Grade 2">{t('admissionForm.grades.grade2')}</option>
                                        <option value="Grade 3">{t('admissionForm.grades.grade3')}</option>
                                        <option value="Grade 4">{t('admissionForm.grades.grade4')}</option>
                                        <option value="Grade 5">{t('admissionForm.grades.grade5')}</option>
                                        <option value="Grade 6">{t('admissionForm.grades.grade6')}</option>
                                        <option value="Grade 7">{t('admissionForm.grades.grade7')}</option>
                                        <option value="Grade 8">{t('admissionForm.grades.grade8')}</option>
                                        <option value="Grade 9">{t('admissionForm.grades.grade9')}</option>
                                        <option value="Grade 10">{t('admissionForm.grades.grade10')}</option>
                                    </select>
                                    {errors.grade && <span className="error-message">{errors.grade}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <FiUser /> {t('admissionForm.parentName')} {t('admissionForm.required')}
                                    </label>
                                    <input
                                        type="text"
                                        name="parentName"
                                        className={`form-input ${errors.parentName ? 'error' : ''}`}
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        placeholder={t('admissionForm.placeholders.parentName')}
                                    />
                                    {errors.parentName && <span className="error-message">{errors.parentName}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiMail /> {t('admissionForm.email')} {t('admissionForm.required')}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('admissionForm.placeholders.email')}
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <FiPhone /> {t('admissionForm.phone')} {t('admissionForm.required')}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`form-input ${errors.phone ? 'error' : ''}`}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t('admissionForm.placeholders.phone')}
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">{t('admissionForm.address')} {t('admissionForm.required')}</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`form-input ${errors.address ? 'error' : ''}`}
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder={t('admissionForm.placeholders.address')}
                                    />
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">{t('admissionForm.additionalInfo')}</label>
                                    <textarea
                                        name="message"
                                        className="form-textarea"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder={t('admissionForm.additionalInfoPlaceholder')}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    {t('admissionForm.submit')}
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
                            <h2>{t('admissionForm.success.title')}</h2>
                            <p>{t('admissionForm.success.message')}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
