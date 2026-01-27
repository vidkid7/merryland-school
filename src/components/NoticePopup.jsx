import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { FiX, FiBell, FiCalendar } from 'react-icons/fi';
import './NoticePopup.css';

export default function NoticePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useData();

    const latestNotice = data.notices.find(n => n.isLatest);

    useEffect(() => {
        // Show popup after a short delay on initial load
        if (latestNotice) {
            const hasSeenNotice = sessionStorage.getItem(`notice_${latestNotice.id}`);
            if (!hasSeenNotice) {
                const timer = setTimeout(() => {
                    setIsOpen(true);
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [latestNotice]);

    const handleClose = () => {
        setIsOpen(false);
        if (latestNotice) {
            sessionStorage.setItem(`notice_${latestNotice.id}`, 'true');
        }
    };

    if (!latestNotice || !isOpen) return null;

    return (
        <>
            <div className="notice-overlay" onClick={handleClose} />
            <div className="notice-popup">
                <button className="notice-close" onClick={handleClose}>
                    <FiX />
                </button>

                <div className="notice-header">
                    <div className="notice-icon">
                        <FiBell />
                    </div>
                    <span className="notice-badge">Latest Notice</span>
                </div>

                <h3 className="notice-title">{latestNotice.title}</h3>

                <div className="notice-meta">
                    <span className="notice-date">
                        <FiCalendar />
                        {new Date(latestNotice.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <span className="notice-category">{latestNotice.category}</span>
                </div>

                <p className="notice-content">{latestNotice.content}</p>

                <div className="notice-actions">
                    <button className="btn btn-primary" onClick={handleClose}>
                        Got it!
                    </button>
                </div>
            </div>
        </>
    );
}
