import { useData } from '../context/DataContext';
import { FiFileText, FiBell, FiEdit, FiImage, FiMail } from 'react-icons/fi';

export default function Dashboard() {
    const { data } = useData();

    const stats = [
        {
            icon: FiBell,
            value: data.notices.length,
            label: 'Total Notices',
            color: 'primary'
        },
        {
            icon: FiEdit,
            value: data.blogs.filter(b => b.published).length,
            label: 'Published Blogs',
            color: 'accent'
        },
        {
            icon: FiImage,
            value: data.gallery.length,
            label: 'Gallery Images',
            color: 'success'
        },
        {
            icon: FiMail,
            value: data.contactMessages.length,
            label: 'Contact Messages',
            color: 'info'
        }
    ];

    const recentNotices = data.notices.slice(0, 5);
    const recentBlogs = data.blogs.slice(0, 5);

    return (
        <>
            <header className="admin-header">
                <h1>Dashboard</h1>
                <span>Welcome back, Admin!</span>
            </header>

            <main className="admin-main">
                {/* Stats */}
                <div className="dashboard-stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-box">
                            <div className={`stat-icon ${stat.color}`}>
                                <stat.icon />
                            </div>
                            <div className="stat-info">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Content */}
                <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
                    {/* Recent Notices */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>Recent Notices</h3>
                            <span className="badge badge-primary">{data.notices.length} Total</span>
                        </div>
                        <div className="admin-card-body">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentNotices.map(notice => (
                                        <tr key={notice.id}>
                                            <td>{notice.title.substring(0, 30)}...</td>
                                            <td>{new Date(notice.date).toLocaleDateString()}</td>
                                            <td>
                                                {notice.isLatest && (
                                                    <span className="status-badge latest">Latest</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Blogs */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>Recent Blogs</h3>
                            <span className="badge badge-primary">{data.blogs.length} Total</span>
                        </div>
                        <div className="admin-card-body">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBlogs.map(blog => (
                                        <tr key={blog.id}>
                                            <td>{blog.title.substring(0, 30)}...</td>
                                            <td>{blog.author}</td>
                                            <td>
                                                <span className={`status-badge ${blog.published ? 'published' : 'draft'}`}>
                                                    {blog.published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
