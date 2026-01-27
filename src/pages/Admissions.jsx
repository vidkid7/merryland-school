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
    const { data } = useData();
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
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="admissions-cta">
                <div className="container">
                    <AnimatedSection className="cta-card">
                        <div className="cta-text">
                            <h3>Ready to Apply?</h3>
                            <p>Have questions about admissions? Our team is here to help!</p>
                        </div>
                        <div className="cta-contact">
                            <a href={`tel:${admissions.contact.phone}`} className="contact-item">
                                <FiPhone /> {admissions.contact.phone}
                            </a>
                            <a href={`mailto:${admissions.contact.email}`} className="contact-item">
                                <FiMail /> {admissions.contact.email}
                            </a>
                        </div>
                        <Link to="/contact" className="btn btn-accent btn-lg">
                            Contact Us <FiArrowRight />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
