import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
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
    const { data } = useData();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const { settings } = data;
    const isHome = location.pathname === '/';

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
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/admissions', label: 'Admissions' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/blog', label: 'Blog' },
        { path: '/notices', label: 'Notices' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container top-bar-content">
                    <div className="contact-info">
                        <a href={`tel:${settings.phone}`}><FiPhone /> {settings.phone}</a>
                        <a href={`mailto:${settings.email}`}><FiMail /> {settings.email}</a>
                        <span><FiMapPin /> {settings.address}</span>
                    </div>
                    <div className="social-links">
                        {settings.socialLinks.facebook && <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FiFacebook /></a>}
                        {settings.socialLinks.instagram && <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram /></a>}
                        {settings.socialLinks.twitter && <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FiTwitter /></a>}
                        {settings.socialLinks.youtube && <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer"><FiYoutube /></a>}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="main-nav">
                <div className="container nav-content">
                    <Link to="/" className="logo" style={{ opacity: isHome && !isScrolled ? 0 : 1, transition: 'opacity 0.3s ease' }}>
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
                        <Link to="/admissions" className="btn btn-primary btn-sm" style={{ marginLeft: 'var(--space-4)' }}>
                            Apply Now
                        </Link>
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
                    <Link to="/admissions" className="btn btn-primary btn-block" style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
                        Apply Now
                    </Link>
                </div>
            </div>
        </header>
    );
}
