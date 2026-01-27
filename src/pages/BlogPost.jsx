import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AnimatedSection from '../components/AnimatedSection';
import { FiCalendar, FiUser, FiArrowLeft, FiTag } from 'react-icons/fi';
import './BlogPost.css';

export default function BlogPost() {
    // Use blog ID from the URL for a simple and robust lookup
    const { id } = useParams();
    const { data } = useData();

    const blog = data.blogs.find(b => b.id === id);
    const relatedBlogs = data.blogs
        .filter(b => b.published && b.id !== blog?.id && b.category === blog?.category)
        .slice(0, 2);

    if (!blog) {
        return (
            <div className="not-found">
                <div className="container">
                    <h1>Blog Post Not Found</h1>
                    <p>The article you're looking for doesn't exist.</p>
                    <Link to="/blog" className="btn btn-primary">
                        <FiArrowLeft /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="post-hero" style={{ backgroundImage: `url(${blog.image})` }}>
                <div className="post-hero-overlay" />
                <div className="container">
                    <AnimatedSection className="post-hero-content">
                        <Link to="/blog" className="back-link">
                            <FiArrowLeft /> Back to Blog
                        </Link>
                        <span className="post-category">{blog.category}</span>
                        <h1>{blog.title}</h1>
                        <div className="post-meta">
                            <span><FiUser /> {blog.author}</span>
                            <span><FiCalendar /> {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content */}
            <section className="post-content-section">
                <div className="container">
                    <AnimatedSection className="post-content">
                        <div className="post-body" dangerouslySetInnerHTML={{ __html: blog.content }} />

                        <div className="post-tags">
                            <FiTag /> <span>Category:</span> {blog.category}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="section related-section">
                    <div className="container">
                        <h3 className="related-title">Related Articles</h3>
                        <div className="related-grid">
                            {relatedBlogs.map(related => (
                                <Link key={related.id} to={`/blog/${related.slug}`} className="related-card">
                                    <img src={related.image} alt={related.title} />
                                    <div className="related-content">
                                        <h4>{related.title}</h4>
                                        <span>{new Date(related.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
