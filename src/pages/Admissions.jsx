import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AnimatedSection from '../components/AnimatedSection';
import {
    FiFileText,
    FiClipboard,
    FiUsers,
    FiCheckCircle,
    FiPhone,
    FiMail,
    FiArrowRight,
    FiCheck
} from 'react-icons/fi';
import './Admissions.css';

const stepIcons = [FiFileText, FiClipboard, FiUsers, FiCheckCircle];

export default function Admissions() {
    const { data, setIsAdmissionFormOpen } = useData();
    const { admissions } = data;

    return (
        <>
            {/* Hero Section */}
            <section className="admissions-hero">
                <div className="container">
                    <AnimatedSection className="admissions-hero-content">
                        <span className="page-badge">Admissions</span>
                        <h1>{admissions.intro.title}</h1>
                        <p>{admissions.intro.description}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Process Section */}
            <section className="section process-section">
                <div className="container">
                    <AnimatedSection className="section-header">
                        <h2 className="section-title">Admission Process</h2>
                        <p className="section-subtitle">Simple steps to become a part of our school family</p>
                    </AnimatedSection>

                    <div className="process-timeline">
                        {admissions.process.map((step, index) => {
                            const Icon = stepIcons[index] || FiCheckCircle;
                            return (
                                <AnimatedSection key={step.step} animation="fadeInUp" delay={index * 150}>
                                    <div className="process-step">
                                        <div className="step-number">{step.step}</div>
                                        <div className="step-icon">
                                            <Icon />
                                        </div>
                                        <h4>{step.title}</h4>
                                        <p>{step.description}</p>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
                        <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-primary btn-lg">
                            Apply Online Now <FiArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Requirements & Fees */}
            <section className="section requirements-section">
                <div className="container">
                    <div className="requirements-grid">
                        <AnimatedSection animation="fadeInLeft" className="requirements-card">
                            <h3>Requirements</h3>
                            <p>Please prepare the following documents for admission:</p>
                            <ul className="requirements-list">
                                {admissions.requirements.map((req, index) => (
                                    <li key={index}>
                                        <FiCheck /> {req}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-primary">
                                    Start Application
                                </button>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight" className="fees-card">
                            <h3>Fee Structure</h3>
                            <p>Investment in your child's future:</p>
                            <div className="fee-items">
                                <div className="fee-item">
                                    <span className="fee-label">Admission Fee</span>
                                    <span className="fee-value">{admissions.fees.admission}</span>
                                </div>
                                <div className="fee-item">
                                    <span className="fee-label">Annual Fee</span>
                                    <span className="fee-value">{admissions.fees.annual}</span>
                                </div>
                                <div className="fee-item">
                                    <span className="fee-label">Monthly Fee</span>
                                    <span className="fee-value">{admissions.fees.monthly}</span>
                                </div>
                            </div>
                            <p className="fee-note">* Fees are subject to change. Contact us for current rates.</p>
                            <div style={{ marginTop: 'var(--space-6)' }}>
                                <Link to="/contact" className="btn btn-outline">Enquire about fees</Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="admissions-cta">
                <div className="container">
                    <AnimatedSection className="cta-card">
                        <div className="cta-text">
                            <h3>Ready to join Merryland?</h3>
                            <p>Apply today and give your child the best education journey.</p>
                        </div>
                        <div className="cta-actions" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-accent btn-lg">
                                Open Application Form
                            </button>
                            <div className="cta-contact">
                                <a href={`tel:${data.settings.phone}`} className="contact-item">
                                    <FiPhone /> Call Us
                                </a>
                                <a href={`mailto:${data.settings.email}`} className="contact-item">
                                    <FiMail /> Email Us
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
