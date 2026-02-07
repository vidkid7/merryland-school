import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import Lightbox from '../components/Lightbox';
import { FiImage } from 'react-icons/fi';
import './Gallery.css';

export default function Gallery() {
    const { data } = useData();
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const categories = ['All', ...new Set(data.gallery.map(g => g.category))];

    const filteredGallery = selectedCategory === 'All'
        ? data.gallery
        : data.gallery.filter(g => g.category === selectedCategory);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="gallery-hero">
                <div className="container">
                    <AnimatedSection className="gallery-hero-content">
                        <span className="page-badge">{t('gallery.badge')}</span>
                        <h1>{t('gallery.hero.title')}</h1>
                        <p>{t('gallery.hero.description')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Filter */}
            <section className="gallery-filter">
                <div className="container">
                    <div className="filter-tabs">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section gallery-grid-section">
                <div className="container">
                    {filteredGallery.length === 0 ? (
                        <div className="no-images">
                            <FiImage />
                            <h3>{t('gallery.noResults.title')}</h3>
                            <p>{t('gallery.noResults.description')}</p>
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {filteredGallery.map((item, index) => (
                                <AnimatedSection key={item.id} animation="scaleIn" delay={index * 50}>
                                    <div
                                        className="gallery-item"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img src={item.image} alt={item.title} />
                                        <div className="gallery-overlay">
                                            <h4>{item.title}</h4>
                                            <span>{item.category}</span>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={filteredGallery}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
    );
}
