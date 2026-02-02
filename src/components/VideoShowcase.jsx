import { useData } from '../context/DataContext';
import { FiPlay } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './VideoShowcase.css';

export default function VideoShowcase() {
    const { data } = useData();
    const { settings } = data;
    const videos = settings.videos || [];

    if (videos.length === 0) return null;

    return (
        <section className="video-showcase-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-badge">Experience Merryland</span>
                    <h2>Watch Our Stories</h2>
                    <p>Discover what makes Merryland School special through our student and parent testimonials</p>
                </motion.div>

                <div className="videos-grid">
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            className="video-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="video-thumbnail">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    loading="lazy"
                                />
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="play-button"
                                    aria-label={`Play ${video.title}`}
                                >
                                    <FiPlay />
                                </a>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p>{video.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
