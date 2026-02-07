import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

    const quickLinks = [
        { path: '/', label: t('footer.links.home') },
        { path: '/about', label: t('footer.links.about') },
        { path: '/admissions', label: t('footer.links.admissions') },
        { path: '/blog', label: t('footer.links.blog') },
        { path: '/gallery', label: t('footer.links.gallery') },
        { path: '/contact', label: t('footer.links.contact') }
    ];

    const usefulLinks = [
        { path: '/notices', label: t('footer.links.notices') },
        { path: '/admissions', label: t('footer.links.feeStructure') },
        { path: '/about', label: t('footer.links.ourFaculty') },
        { path: '/gallery', label: t('footer.links.campusTour') },
        { path: '/contact', label: t('footer.links.careers') }
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
                                {data.settings.tagline}. {t('footer.description')}
                            </p>
                            <div className="footer-social">
                                <h5>{t('footer.followUs')}</h5>
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
                            <h4 className="footer-heading">{t('footer.quickLinks')}</h4>
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
                            <h4 className="footer-heading">{t('footer.usefulLinks')}</h4>
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
                            <h4 className="footer-heading">{t('footer.contactUs')}</h4>
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
                                <h5>{t('footer.officeHours')}</h5>
                                <p>{t('footer.officeHoursDetail')}</p>
                                <p>{t('footer.saturday')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} {data.settings.schoolName}. {t('footer.copyright')}</p>
                    <div className="footer-bottom-links">
                        <Link to="/admin">{t('footer.admin')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
