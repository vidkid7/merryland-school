import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock,
    FiSend,
    FiCheck
} from 'react-icons/fi';
import './Contact.css';

export default function Contact() {
    const { data, addContactMessage } = useData();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContactMessage(formData);
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <AnimatedSection className="contact-hero-content">
                        <span className="page-badge">{t('contact.badge')}</span>
                        <h1>{t('contact.hero.title')}</h1>
                        <p>{t('contact.hero.description')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <AnimatedSection animation="fadeInLeft" className="contact-info">
                            <h3>{t('contact.info.title')}</h3>
                            <p>{t('contact.info.description')}</p>

                            <div className="contact-cards">
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiMapPin />
                                    </div>
                                    <div>
                                        <h4>{t('contact.info.address')}</h4>
                                        <p>{data.settings.address}</p>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiPhone />
                                    </div>
                                    <div>
                                        <h4>{t('contact.info.phone')}</h4>
                                        <a href={`tel:${data.settings.phone}`}>{data.settings.phone}</a>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiMail />
                                    </div>
                                    <div>
                                        <h4>{t('contact.info.email')}</h4>
                                        <a href={`mailto:${data.settings.email}`}>{data.settings.email}</a>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiClock />
                                    </div>
                                    <div>
                                        <h4>{t('contact.info.hours')}</h4>
                                        <p>{t('contact.info.hoursDetail')}</p>
                                        <p>{t('contact.info.saturday')}</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection animation="fadeInRight" className="contact-form-container">
                            <h3>{t('contact.form.title')}</h3>

                            {submitted ? (
                                <div className="success-message">
                                    <div className="success-icon">
                                        <FiCheck />
                                    </div>
                                    <h4>{t('contact.success.title')}</h4>
                                    <p>{t('contact.success.message')}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">{t('contact.form.name')} {t('contact.form.required')}</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-input"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('contact.form.namePlaceholder')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">{t('contact.form.email')} {t('contact.form.required')}</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('contact.form.emailPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">{t('contact.form.phone')}</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-input"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder={t('contact.form.phonePlaceholder')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject" className="form-label">{t('contact.form.subject')} {t('contact.form.required')}</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                className="form-input"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('contact.form.subjectPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">{t('contact.form.message')} {t('contact.form.required')}</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-textarea"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('contact.form.messagePlaceholder')}
                                            rows={5}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <FiSend /> {t('contact.form.submit')}
                                    </button>
                                </form>
                            )}
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}
