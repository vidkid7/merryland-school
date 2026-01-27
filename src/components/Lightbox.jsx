import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Lightbox.css';

export default function Lightbox({ images, currentIndex, onClose }) {
    const [index, setIndex] = useState(currentIndex);

    useEffect(() => {
        setIndex(currentIndex);
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [index]);

    const handlePrev = () => {
        setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images || images.length === 0) return null;

    const currentImage = images[index];

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose}>
                    <FiX />
                </button>

                <button className="lightbox-nav lightbox-prev" onClick={handlePrev}>
                    <FiChevronLeft />
                </button>

                <div className="lightbox-image-container">
                    <img
                        src={currentImage.image}
                        alt={currentImage.title}
                        className="lightbox-image"
                    />
                </div>

                <button className="lightbox-nav lightbox-next" onClick={handleNext}>
                    <FiChevronRight />
                </button>

                <div className="lightbox-info">
                    <h4 className="lightbox-title">{currentImage.title}</h4>
                    <span className="lightbox-counter">
                        {index + 1} / {images.length}
                    </span>
                </div>
            </div>
        </div>
    );
}
