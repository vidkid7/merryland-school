import { useState } from 'react';
import { useData } from '../context/DataContext';
import { FiPhone, FiMessageCircle, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './FloatingActions.css';

export default function FloatingActions() {
    const { data } = useData();
    const { settings } = data;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Hello! I would like to inquire about Merryland School.');
        const whatsappNumber = settings.whatsapp.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    };

    const handleCallClick = () => {
        window.location.href = `tel:${settings.callNumber}`;
    };

    return (
        <div className="floating-actions">
            {isExpanded && (
                <div className="floating-actions-menu">
                    <button
                        className="floating-action-btn whatsapp-btn"
                        onClick={handleWhatsAppClick}
                        aria-label="Contact via WhatsApp"
                    >
                        <FaWhatsapp />
                        <span>WhatsApp</span>
                    </button>
                    <button
                        className="floating-action-btn call-btn"
                        onClick={handleCallClick}
                        aria-label="Call us"
                    >
                        <FiPhone />
                        <span>Call Now</span>
                    </button>
                </div>
            )}

            <button
                className={`floating-action-btn-main ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label="Contact options"
            >
                {isExpanded ? <FiX /> : <FiMessageCircle />}
            </button>
        </div>
    );
}
