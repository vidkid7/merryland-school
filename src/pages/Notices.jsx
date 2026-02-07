import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { FiCalendar, FiFilter, FiBell } from 'react-icons/fi';
import './Notices.css';

export default function Notices() {
    const { data } = useData();
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(data.notices.map(n => n.category))];

    const filteredNotices = selectedCategory === 'All'
        ? data.notices
        : data.notices.filter(n => n.category === selectedCategory);

    return (
        <>
            {/* Hero Section */}
            <section className="notices-hero">
                <div className="container">
                    <AnimatedSection className="notices-hero-content">
                        <span className="page-badge">{t('notices.badge')}</span>
                        <h1>{t('notices.hero.title')}</h1>
                        <p>{t('notices.hero.description')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Filter */}
            <section className="notices-filter">
                <div className="container">
                    <div className="filter-content">
                        <div className="filter-label">
                            <FiFilter /> {t('common.filterBy')}
                        </div>
                        <div className="filter-buttons">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Notices List */}
            <section className="section notices-list-section">
                <div className="container">
                    {filteredNotices.length === 0 ? (
                        <div className="no-notices">
                            <FiBell />
                            <h3>{t('notices.noResults.title')}</h3>
                            <p>{t('notices.noResults.description')}</p>
                        </div>
                    ) : (
                        <div className="notices-list">
                            {filteredNotices.map((notice, index) => (
                                <AnimatedSection key={notice.id} animation="fadeInUp" delay={index * 100}>
                                    <div className={`notice-item ${notice.isLatest ? 'latest' : ''}`}>
                                        {notice.isLatest && <span className="latest-badge">{t('common.latest')}</span>}
                                        <div className="notice-date-box">
                                            <span className="date-day">
                                                {new Date(notice.date).getDate()}
                                            </span>
                                            <span className="date-month">
                                                {new Date(notice.date).toLocaleDateString('en-US', { month: 'short' })}
                                            </span>
                                            <span className="date-year">
                                                {new Date(notice.date).getFullYear()}
                                            </span>
                                        </div>
                                        <div className="notice-content">
                                            <div className="notice-header">
                                                <span className="notice-category">{notice.category}</span>
                                            </div>
                                            <h3 className="notice-title">{notice.title}</h3>
                                            <p className="notice-text">{notice.content}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
