import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    FiHome,
    FiFileText,
    FiBell,
    FiEdit,
    FiImage,
    FiSettings,
    FiLogOut,
    FiGrid,
    FiUsers
} from 'react-icons/fi';
import './Admin.css';

export default function AdminLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('adminLoggedIn');
        navigate('/admin');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    <span>Merryland School</span>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <span className="nav-section-title">Main</span>
                        <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiGrid /> Dashboard
                        </NavLink>
                        <NavLink to="/admin/applications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiUsers /> Applications
                        </NavLink>
                    </div>

                    <div className="nav-section">
                        <span className="nav-section-title">Content</span>
                        <NavLink to="/admin/pages" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiFileText /> Pages
                        </NavLink>
                        <NavLink to="/admin/notices" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiBell /> Notices
                        </NavLink>
                        <NavLink to="/admin/blogs" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiEdit /> Blog Posts
                        </NavLink>
                        <NavLink to="/admin/gallery" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiImage /> Gallery
                        </NavLink>
                    </div>

                    <div className="nav-section">
                        <span className="nav-section-title">Settings</span>
                        <NavLink to="/admin/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                            <FiSettings /> Site Settings
                        </NavLink>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <NavLink to="/" className="sidebar-link">
                        <FiHome /> View Website
                    </NavLink>
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    );
}
