import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiYoutube,
    FiChevronRight
} from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    const { data } = useData();

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/admissions', label: 'Admissions' },
        { path: '/blog', label: 'Blog' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/contact', label: 'Contact' }
    ];

    const usefulLinks = [
        { path: '/notices', label: 'Notices' },
        { path: '/admissions', label: 'Fee Structure' },
        { path: '/about', label: 'Our Faculty' },
        { path: '/gallery', label: 'Campus Tour' },
        { path: '/contact', label: 'Careers' }
    ];

    return (
        <footer className="footer">
            {/* Map Section */}
            <div className="footer-map">
                <iframe
                    src={data.settings.mapUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location"
                />
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* About Column */}
                        <div className="footer-col footer-about">
                            <Link to="/" className="footer-logo">
                                <div className="footer-logo-icon">S</div>
                                <span>{data.settings.schoolName}</span>
                            </Link>
                            <p className="footer-description">
                                {data.settings.tagline}. Empowering students with knowledge,
                                values, and skills for a brighter tomorrow.
                            </p>
                            <div className="footer-social">
                                <h5>Follow Us</h5>
                                <div className="social-icons">
                                    <a href={data.settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <FiFacebook />
                                    </a>
                                    <a href={data.settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <FiInstagram />
                                    </a>
                                    <a href={data.settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <FiTwitter />
                                    </a>
                                    <a href={data.settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                        <FiYoutube />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map(link => (
                                    <li key={link.path + link.label}>
                                        <Link to={link.path}>
                                            <FiChevronRight /> {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Useful Links</h4>
                            <ul className="footer-links">
                                {usefulLinks.map(link => (
                                    <li key={link.path + link.label}>
                                        <Link to={link.path}>
                                            <FiChevronRight /> {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-col">
                            <h4 className="footer-heading">Contact Us</h4>
                            <div className="footer-contact">
                                <div className="contact-item">
                                    <FiMapPin />
                                    <span>{data.settings.address}</span>
                                </div>
                                <div className="contact-item">
                                    <FiPhone />
                                    <a href={`tel:${data.settings.phone}`}>{data.settings.phone}</a>
                                </div>
                                <div className="contact-item">
                                    <FiMail />
                                    <a href={`mailto:${data.settings.email}`}>{data.settings.email}</a>
                                </div>
                            </div>
                            <div className="footer-hours">
                                <h5>Office Hours</h5>
                                <p>Sunday - Friday: 8:00 AM - 4:00 PM</p>
                                <p>Saturday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} {data.settings.schoolName}. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/admin">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
