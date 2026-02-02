import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Notices from './pages/Notices';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import PagesEditor from './admin/PagesEditor';
import NoticesManager from './admin/NoticesManager';
import BlogManager from './admin/BlogManager';
import GalleryManager from './admin/GalleryManager';
import SettingsManager from './admin/SettingsManager';
import ApplicationsManager from './admin/ApplicationsManager';

import './index.css';

// Wrapper for AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/admissions" element={<PublicLayout><Admissions /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        {/* Blog detail uses the blog's ID as URL param for reliable linking */}
        <Route path="/blog/:id" element={<PublicLayout><BlogPost /></PublicLayout>} />
        <Route path="/notices" element={<PublicLayout><Notices /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="applications" element={<ApplicationsManager />} />
          <Route path="pages" element={<PagesEditor />} />
          <Route path="notices" element={<NoticesManager />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

// Scroll to top on route change so sections always start from the top
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Use instant scroll to avoid feeling laggy with page transitions
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function PublicLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main className={!isHome ? 'page-wrapper' : ''} style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
