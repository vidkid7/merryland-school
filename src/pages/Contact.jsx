import { useState } from 'react';
import { useData } from '../context/DataContext';
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
                        <span className="page-badge">Contact Us</span>
                        <h1>Get in Touch</h1>
                        <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <AnimatedSection animation="fadeInLeft" className="contact-info">
                            <h3>Contact Information</h3>
                            <p>Feel free to reach out to us through any of the following channels:</p>

                            <div className="contact-cards">
                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiMapPin />
                                    </div>
                                    <div>
                                        <h4>Address</h4>
                                        <p>{data.settings.address}</p>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiPhone />
                                    </div>
                                    <div>
                                        <h4>Phone</h4>
                                        <a href={`tel:${data.settings.phone}`}>{data.settings.phone}</a>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiMail />
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <a href={`mailto:${data.settings.email}`}>{data.settings.email}</a>
                                    </div>
                                </div>

                                <div className="contact-card">
                                    <div className="contact-icon">
                                        <FiClock />
                                    </div>
                                    <div>
                                        <h4>Office Hours</h4>
                                        <p>Sunday - Friday: 8:00 AM - 4:00 PM</p>
                                        <p>Saturday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Contact Form */}
                        <AnimatedSection animation="fadeInRight" className="contact-form-container">
                            <h3>Send us a Message</h3>

                            {submitted ? (
                                <div className="success-message">
                                    <div className="success-icon">
                                        <FiCheck />
                                    </div>
                                    <h4>Thank You!</h4>
                                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-input"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-input"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+977-XXXXXXXXXX"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject" className="form-label">Subject *</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                className="form-input"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder="How can we help?"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message" className="form-label">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-textarea"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Write your message here..."
                                            rows={5}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <FiSend /> Send Message
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
