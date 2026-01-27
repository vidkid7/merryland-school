import { useData } from '../context/DataContext';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiHeart, FiStar, FiUsers, FiBookOpen, FiGlobe } from 'react-icons/fi';
import './About.css';

export default function About() {
    const { data } = useData();
    const { about } = data;

    const values = [
        { icon: FiHeart, title: "Compassion", description: "We foster empathy and care for others in our community." },
        { icon: FiStar, title: "Excellence", description: "We strive for the highest standards in everything we do." },
        { icon: FiUsers, title: "Teamwork", description: "We believe in the power of collaboration and mutual support." },
        { icon: FiAward, title: "Integrity", description: "We uphold honesty and ethical behavior at all times." }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="container">
                    <AnimatedSection className="about-hero-content">
                        <span className="page-badge">About Us</span>
                        <h1>Building Tomorrow's Leaders Today</h1>
                        <p>Learn about our journey, mission, and the values that drive us to excel in education.</p>
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
                            <span className="section-badge">Our Story</span>
                            <h2>A Legacy of Excellence Since 2010</h2>
                            <p>
                                Subhakamana School was founded with a vision to provide world-class education
                                in Nepal. Starting with just 50 students and 5 teachers, we have grown into
                                one of the most respected educational institutions in Kathmandu.
                            </p>
                            <p>
                                Today, we serve over 1500 students with 85+ dedicated faculty members. Our
                                alumni have gone on to achieve success in diverse fields, from medicine and
                                engineering to arts and entrepreneurship.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection animation="fadeInRight" className="history-image">
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=450&fit=crop"
                                alt="School History"
                            />
                            <div className="history-badge">
                                <span className="number">15+</span>
                                <span className="text">Years</span>
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
                            <span className="section-badge">Principal's Message</span>
                            <blockquote>"{about.principal.message}"</blockquote>
                            <div className="principal-info">
                                <h4>{about.principal.name}</h4>
                                <span>{about.principal.title || 'Principal'}</span>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section values-section">
                <div className="container">
                    <AnimatedSection className="section-header text-center">
                        <span className="section-badge">Our Principles</span>
                        <h2>Core Values</h2>
                        <p>The principles that guide everything we do</p>
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
                        <span className="section-badge">Our Team</span>
                        <h2>Meet Our Leadership</h2>
                        <p>Dedicated professionals committed to excellence</p>
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
                        <h2>Experience Our Campus</h2>
                        <p>Schedule a visit to see our facilities and meet our team.</p>
                        <a href="/contact" className="btn btn-light btn-lg">Contact Us</a>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
