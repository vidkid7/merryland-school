import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AdmissionForm from './AdmissionForm';
import LanguageSwitcher from './LanguageSwitcher';
import {
    FiMenu,
    FiX,
    FiPhone,
    FiMail,
    FiMapPin,
    FiFacebook,
    FiInstagram,
    FiTwitter,
    FiYoutube
} from 'react-icons/fi';
import './Header.css';

export default function Header() {
    const { data, isAdmissionFormOpen, setIsAdmissionFormOpen } = useData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    const { settings } = data;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/about', label: t('nav.about') },
        { path: '/admissions', label: t('nav.admissions') },
        { path: '/gallery', label: t('nav.gallery') },
        { path: '/blog', label: t('nav.blog') },
        { path: '/notices', label: t('nav.notices') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const handleApplyNowClick = (e) => {
        e.preventDefault();
        setIsAdmissionFormOpen(true);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="container top-bar-content">
                        <div className="contact-info">
                            <a href={`tel:${settings.phone}`}><FiPhone /> {settings.phone}</a>
                            <a href={`mailto:${settings.email}`}><FiMail /> {settings.email}</a>
                            <span><FiMapPin /> {settings.address}</span>
                        </div>
                        <div className="social-links-container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="social-links">
                                {settings.socialLinks.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FiFacebook /></a>}
                                {settings.socialLinks.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram /></a>}
                                {settings.socialLinks.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FiTwitter /></a>}
                                {settings.socialLinks.youtube && <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer"><FiYoutube /></a>}
                            </div>
                            {/* Language Switcher in Top Right */}
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="main-nav">
                    <div className="container nav-content">
                        <Link to="/" className="logo">
                            <img src={settings.logo} alt={settings.schoolName} className="logo-img" />
                            <div className="logo-text">
                                <span className="school-name">{settings.schoolName}</span>
                                <span className="tagline">{settings.tagline}</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="desktop-menu">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <button onClick={handleApplyNowClick} className="btn btn-primary btn-sm" style={{ marginLeft: 'var(--space-4)' }}>
                                {t('nav.applyNow')}
                            </button>
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-content">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                            {/* Also accessible in mobile menu if desired, optionally hide if it's already in top bar visible on mobile? 
                                usually top bar is hidden on mobile in this css. Let's keep it here.
                            */}
                            <LanguageSwitcher />
                        </div>
                        <button onClick={handleApplyNowClick} className="btn btn-primary btn-block" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
                            {t('nav.applyNow')}
                        </button>
                    </div>
                </div>
            </header>

            <AdmissionForm
                isOpen={isAdmissionFormOpen}
                onClose={() => setIsAdmissionFormOpen(false)}
            />
        </>
    );
}


