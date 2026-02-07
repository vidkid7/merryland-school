import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AnimatedSection from '../components/AnimatedSection';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    return (
        <>
            {/* Hero Section */}
            <section className="admissions-hero">
                <div className="container">
                    <AnimatedSection className="admissions-hero-content">
                        <span className="page-badge">{t('admissions.badge')}</span>
                        <h1>{admissions.intro.title}</h1>
                        <p>{admissions.intro.description}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Process Section */}
            <section className="section process-section">
                <div className="container">
                    <AnimatedSection className="section-header">
                        <h2 className="section-title">{t('admissions.process.title')}</h2>
                        <p className="section-subtitle">{t('admissions.process.description')}</p>
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
                            {t('nav.applyNow')} <FiArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Requirements & Fees */}
            <section className="section requirements-section">
                <div className="container">
                    <div className="requirements-grid">
                        <AnimatedSection animation="fadeInLeft" className="requirements-card">
                            <h3>{t('admissions.requirements.title')}</h3>
                            <p>{t('admissions.requirements.description')}</p>
                            <ul className="requirements-list">
                                {admissions.requirements.map((req, index) => (
                                    <li key={index}>
                                        <FiCheck /> {req}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: 'var(--space-8)' }}>
                                <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-primary">
                                    {t('admissions.requirements.button')}
                                </button>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight" className="fees-card">
                            <h3>{t('admissions.fees.title')}</h3>
                            <p>{t('admissions.fees.description')}</p>
                            <div className="fee-items">
                                <div className="fee-item">
                                    <span className="fee-label">{t('admissions.fees.admission')}</span>
                                    <span className="fee-value">{admissions.fees.admission}</span>
                                </div>
                                <div className="fee-item">
                                    <span className="fee-label">{t('admissions.fees.annual')}</span>
                                    <span className="fee-value">{admissions.fees.annual}</span>
                                </div>
                                <div className="fee-item">
                                    <span className="fee-label">{t('admissions.fees.monthly')}</span>
                                    <span className="fee-value">{admissions.fees.monthly}</span>
                                </div>
                            </div>
                            <p className="fee-note">{t('admissions.fees.note')}</p>
                            <div style={{ marginTop: 'var(--space-6)' }}>
                                <Link to="/contact" className="btn btn-outline">{t('admissions.fees.enquire')}</Link>
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
                            <h3>{t('admissions.cta.title')}</h3>
                            <p>{t('admissions.cta.description')}</p>
                        </div>
                        <div className="cta-actions" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-accent btn-lg">
                                {t('admissions.cta.apply')}
                            </button>
                            <div className="cta-contact">
                                <a href={`tel:${data.settings.phone}`} className="contact-item">
                                    <FiPhone /> {t('admissions.cta.call')}
                                </a>
                                <a href={`mailto:${data.settings.email}`} className="contact-item">
                                    <FiMail /> {t('admissions.cta.email')}
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
