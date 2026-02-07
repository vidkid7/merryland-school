import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import AnimatedSection from '../components/AnimatedSection';
import NoticePopup from '../components/NoticePopup';
import VideoShowcase from '../components/VideoShowcase';
import FAQ from '../components/FAQ';
import SplineLazyLoader from '../components/SplineLazyLoader';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './Home.css';

// Helper to get icon by string name
const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.FiStar;
    return <Icon />;
};

export default function Home() {
    const { data, setIsAdmissionFormOpen } = useData();
    const { home, blogs, notices, gallery, settings } = data;
    const { t } = useTranslation();

    const latestBlogs = blogs.filter(b => b.published).slice(0, 3);
    const upcomingNotices = notices.slice(0, 3);
    const galleryPreview = gallery.slice(0, 6);

    return (
        <>
            <NoticePopup />

            {/* Hero Section with Spline */}
            <section className="hero hero-split">
                <div className="hero-overlay"></div>
                <div className="hero-bg-pattern"></div>
                <div className="hero-content container">
                    <div className="hero-left">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="hero-text"
                        >
                            <div className="hero-text-bg-decoration"></div>
                            <div className="hero-text-blob"></div>
                            <div className="hero-text-blob-2"></div>

                            {/* Floating Math/Education Equipment - Optimized to 4 elements */}
                            <div className="hero-equipment eq-1"><Icons.FiBook /></div>
                            <div className="hero-equipment eq-2"><Icons.FiEdit3 /></div>
                            <div className="hero-equipment eq-3"><Icons.FiCompass /></div>
                            <div className="hero-equipment eq-6" style={{ fontWeight: 'bold' }}>π</div>

                            {/* Floating Shapes - Optimized to 3 elements */}
                            <div className="hero-floating-shape shape-1"></div>
                            <div className="hero-floating-shape shape-2"></div>
                            <div className="hero-floating-shape shape-3"></div>

                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="hero-subtitle"
                            >
                                {home.hero.subtitle}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {home.hero.title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {home.hero.description}
                            </motion.p>
                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <button onClick={() => setIsAdmissionFormOpen(true)} className="btn btn-primary btn-lg">
                                    {t('home.hero.applyNow')} <Icons.FiArrowRight />
                                </button>
                                <Link to="/about" className="btn btn-outline btn-lg">
                                    {t('home.hero.learnMore')}
                                </Link>
                            </motion.div>

                            {/* Quick Info Pills */}
                            <motion.div
                                className="hero-pills"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="hero-pill">
                                    <Icons.FiMapPin /> {home.hero.location}
                                </div>
                                <div className="hero-pill">
                                    <Icons.FiClock /> {home.hero.established}
                                </div>
                                <div className="hero-pill">
                                    <Icons.FiUsers /> {home.hero.students}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Spline 3D Animation */}
                    <motion.div
                        className="hero-right"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <SplineLazyLoader
                            url="https://prod.spline.design/k0v196fCnQarCKhe/scene.splinecode"
                            fallbackImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"
                            className="hero-spline"
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="section services-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('home.chooseUs.badge')}</span>
                        <h2>{t('home.chooseUs.title')}</h2>
                        <p>{t('home.chooseUs.desc')}</p>
                    </AnimatedSection>

                    <div className="services-grid">
                        {home.services && home.services.map((service, index) => (
                            <AnimatedSection
                                key={index}
                                animation="fadeInUp"
                                delay={index * 100}
                            >
                                <motion.div
                                    className="service-card"
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                >
                                    <div className="service-icon">
                                        {getIcon(service.icon)}
                                    </div>
                                    {/* Note: In a real i18n app, service content should also come from translation files or data structure with locales. 
                                        For now we keep English content for dynamic lists unless we refactor data context. */}
                                    <h3>{service.title}</h3>
                                    <p>{service.desc}</p>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="section about-preview-section">
                <div className="container">
                    <div className="about-preview-grid">
                        <AnimatedSection animation="fadeInLeft" className="about-preview-image">
                            <img
                                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=500&fit=crop"
                                alt="Students in classroom"
                            />
                            <div className="about-preview-badge">
                                <span className="badge-number">15+</span>
                                <span className="badge-text">Years of Excellence</span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeInRight" className="about-preview-content">
                            <span className="section-badge">{t('home.about.badge')}</span>
                            <h2>{t('home.about.title')}</h2>
                            <p>
                                {t('home.about.text')}
                            </p>

                            <div className="features-list">
                                {home.features && home.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        {getIcon(feature.icon)}
                                        <span>{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/about" className="btn btn-primary">
                                {t('home.about.cta')} <Icons.FiArrowRight />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="section programs-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('home.programs.badge')}</span>
                        <h2>{t('home.programs.title')}</h2>
                        <p>{t('home.programs.desc')}</p>
                    </AnimatedSection>

                    <div className="programs-grid">
                        {home.programs && home.programs.map((program, index) => (
                            <AnimatedSection
                                key={index}
                                animation="scaleIn"
                                delay={index * 100}
                            >
                                <motion.div
                                    className="program-card"
                                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                >
                                    <div className="program-image">
                                        <img src={program.image} alt={program.title} />
                                        <div className="program-icon">
                                            {getIcon(program.icon)}
                                        </div>
                                    </div>
                                    <div className="program-content">
                                        <h3>{program.title}</h3>
                                        <p>{program.desc}</p>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {home.stats.map((stat, index) => (
                            <AnimatedSection
                                key={index}
                                animation="scaleIn"
                                delay={index * 100}
                                className="stat-item"
                            >
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section testimonials-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('home.testimonials.badge')}</span>
                        <h2>{t('home.testimonials.title')}</h2>
                        <p>{t('home.testimonials.desc')}</p>
                    </AnimatedSection>

                    <div className="testimonials-grid">
                        {home.testimonials && home.testimonials.map((testimonial, index) => (
                            <AnimatedSection
                                key={index}
                                animation="fadeInUp"
                                delay={index * 100}
                            >
                                <div className="testimonial-card">
                                    <div className="testimonial-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Icons.FiStar key={i} />
                                        ))}
                                    </div>
                                    <p className="testimonial-text">"{testimonial.text}"</p>
                                    <div className="testimonial-author">
                                        <img src={testimonial.image} alt={testimonial.name} />
                                        <div>
                                            <h4>{testimonial.name}</h4>
                                            <span>{testimonial.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News & Notices */}
            <section className="section news-section">
                <div className="container">
                    <div className="news-grid">
                        {/* Latest Blogs */}
                        <AnimatedSection animation="fadeInLeft">
                            <div className="news-column">
                                <div className="news-header">
                                    <h3><Icons.FiCalendar /> {t('home.news.recentBlogs')}</h3>
                                    <Link to="/blog" className="view-all">{t('home.news.viewAll')} <Icons.FiArrowRight /></Link>
                                </div>
                                <div className="news-list">
                                    {latestBlogs.length > 0 ? latestBlogs.map(blog => (
                                        <Link key={blog.id} to={`/blog/${blog.id}`} className="news-item">
                                            <img src={blog.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=80&fit=crop"} alt={blog.title} />
                                            <div>
                                                <h4>{blog.title}</h4>
                                                <span>{new Date(blog.date).toLocaleDateString()}</span>
                                            </div>
                                        </Link>
                                    )) : (
                                        <p className="no-content">{t('home.news.noNews')}</p>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Upcoming Notices */}
                        <AnimatedSection animation="fadeInRight">
                            <div className="news-column">
                                <div className="news-header">
                                    <h3><Icons.FiTarget /> {t('home.news.recentNotices')}</h3>
                                    <Link to="/notices" className="view-all">{t('home.news.viewAll')} <Icons.FiArrowRight /></Link>
                                </div>
                                <div className="notices-list">
                                    {upcomingNotices.length > 0 ? upcomingNotices.map(notice => (
                                        <div key={notice.id} className="notice-item-home">
                                            <div className="notice-date">
                                                <span className="day">{new Date(notice.date).getDate()}</span>
                                                <span className="month">{new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                            </div>
                                            <div className="notice-info">
                                                <h4>{notice.title}</h4>
                                                <span className="notice-category">{notice.category}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="no-content">{t('home.news.noNotices')}</p>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="section gallery-preview-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">{t('home.gallery.badge')}</span>
                        <h2>{t('home.gallery.title')}</h2>
                        <p>{t('home.gallery.desc')}</p>
                    </AnimatedSection>

                    <div className="gallery-preview-grid">
                        {galleryPreview.map((img, index) => (
                            <AnimatedSection key={img.id} animation="scaleIn" delay={index * 50}>
                                <motion.div
                                    className="gallery-preview-item"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <img src={img.image} alt={img.title} />
                                    <div className="gallery-preview-overlay">
                                        <span>{img.title}</span>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection className="text-center" style={{ marginTop: 'var(--space-8)' }}>
                        <Link to="/gallery" className="btn btn-primary">
                            {t('home.gallery.viewFull')} <Icons.FiArrowRight />
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <AnimatedSection animation="fadeInLeft">
                            <h2>{t('home.cta.title')}</h2>
                            <p>{t('home.cta.desc')}</p>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight">
                            <div className="cta-buttons">
                                <Link to="/admissions" className="btn btn-light btn-lg">
                                    {t('home.hero.applyNow')} <Icons.FiArrowRight />
                                </Link>
                                <Link to="/contact" className="btn btn-outline-dark btn-lg">
                                    {t('home.cta.contactUs')}
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}

