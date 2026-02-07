import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiHeart, FiStar, FiUsers, FiBookOpen, FiGlobe } from 'react-icons/fi';
import './About.css';

export default function About() {
    const { data } = useData();
    const { about } = data;
    const { t } = useTranslation();

    const values = [
        { icon: FiHeart, title: t('about.values.compassion.title'), description: t('about.values.compassion.description') },
        { icon: FiStar, title: t('about.values.excellence.title'), description: t('about.values.excellence.description') },
        { icon: FiUsers, title: t('about.values.teamwork.title'), description: t('about.values.teamwork.description') },
        { icon: FiAward, title: t('about.values.integrity.title'), description: t('about.values.integrity.description') }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="container">
                    <AnimatedSection className="about-hero-content">
                        <span className="page-badge">{t('about.badge')}</span>
                        <h1>{t('about.hero.title')}</h1>
                        <p>{t('about.hero.description')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section mission-section">
                <div className="container">
                    <div className="mission-grid">
                        <AnimatedSection animation="fadeInLeft" className="mission-card">
                            <div className="mission-icon">
                                <FiTarget />
                            </div>
                            <h3>{about.mission.title}</h3>
                            <p>{about.mission.description}</p>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight" className="mission-card">
                            <div className="mission-icon vision-icon">
                                <FiEye />
                            </div>
                            <h3>{about.vision.title}</h3>
                            <p>{about.vision.description}</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section history-section">
                <div className="container">
                    <div className="history-content">
                        <AnimatedSection animation="fadeInLeft" className="history-text">
                            <span className="section-badge">{t('about.story.badge')}</span>
                            <h2>{t('about.story.title')}</h2>
                            <p>{t('about.story.paragraph1')}</p>
                            <p>{t('about.story.paragraph2')}</p>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight" className="history-image">
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=450&fit=crop"
                                alt="School History"
                            />
                            <div className="history-badge">
                                <span className="number">15+</span>
                                <span className="text">{t('about.story.years')}</span>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Principal Message */}
            <section className="section principal-section">
                <div className="container">
                    <div className="principal-content">
                        <AnimatedSection animation="fadeInLeft" className="principal-image">
                            <img src={about.principal.image} alt={about.principal.name} />
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight" className="principal-text">
                            <span className="section-badge">{t('about.principal.badge')}</span>
                            <blockquote>"{about.principal.message}"</blockquote>
                            <div className="principal-info">
                                <h4>{about.principal.name}</h4>
                                <span>{about.principal.title || t('about.principal.title')}</span>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section values-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('about.values.badge')}</span>
                        <h2>{t('about.values.title')}</h2>
                        <p>{t('about.values.description')}</p>
                    </AnimatedSection>

                    <div className="values-grid">
                        {values.map((value, index) => (
                            <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                                <motion.div
                                    className="value-card"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="value-icon">
                                        <value.icon />
                                    </div>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section team-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('about.team.badge')}</span>
                        <h2>{t('about.team.title')}</h2>
                        <p>{t('about.team.description')}</p>
                    </AnimatedSection>

                    <div className="team-grid">
                        {about.team && about.team.map((member, index) => (
                            <AnimatedSection key={index} animation="scaleIn" delay={index * 100}>
                                <motion.div
                                    className="team-card"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="team-image">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                    <div className="team-info">
                                        <h4>{member.name}</h4>
                                        <span>{member.role}</span>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <div className="container">
                    <AnimatedSection className="about-cta-content text-center">
                        <h2>{t('about.cta.title')}</h2>
                        <p>{t('about.cta.description')}</p>
                        <a href="/contact" className="btn btn-light btn-lg">{t('common.contactUs')}</a>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
