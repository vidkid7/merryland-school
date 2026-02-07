import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useTranslation } from 'react-i18next';
import AnimatedSection from '../components/AnimatedSection';
import { FiSearch, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import './Blog.css';

export default function Blog() {
    const { data } = useData();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const publishedBlogs = data.blogs.filter(b => b.published);

    const categories = ['All', ...new Set(publishedBlogs.map(b => b.category))];

    const filteredBlogs = publishedBlogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="container">
                    <AnimatedSection className="blog-hero-content">
                        <span className="page-badge">{t('blog.badge')}</span>
                        <h1>{t('blog.hero.title')}</h1>
                        <p>{t('blog.hero.description')}</p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Filter Section */}
            <section className="blog-filters">
                <div className="container">
                    <div className="filters-content">
                        <div className="search-box">
                            <FiSearch />
                            <input
                                type="text"
                                placeholder={t('blog.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="category-filters">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section blog-grid-section">
                <div className="container">
                    {filteredBlogs.length === 0 ? (
                        <div className="no-results">
                            <h3>{t('blog.noResults.title')}</h3>
                            <p>{t('blog.noResults.description')}</p>
                        </div>
                    ) : (
                        <div className="blog-grid">
                            {filteredBlogs.map((blog, index) => (
                                <AnimatedSection key={blog.id} animation="fadeInUp" delay={index * 100}>
                                    {/* Use stable blog ID in URL so posts are always clickable and match the detail view */}
                                    <Link to={`/blog/${blog.id}`} className="blog-card-large">
                                        <div className="blog-card-image">
                                            <img src={blog.image} alt={blog.title} />
                                            <span className="blog-category">{blog.category}</span>
                                        </div>
                                        <div className="blog-card-content">
                                            <div className="blog-meta">
                                                <span><FiUser /> {blog.author}</span>
                                                <span><FiCalendar /> {new Date(blog.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                            <h3 className="blog-card-title">{blog.title}</h3>
                                            <p className="blog-card-excerpt">{blog.excerpt}</p>
                                            <span className="blog-read-more">
                                                {t('common.readMore')} <FiArrowRight />
                                            </span>
                                        </div>
                                    </Link>
                                </AnimatedSection>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
