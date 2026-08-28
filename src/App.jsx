import { useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home          from './pages/Home';
import About         from './pages/About';
import Events        from './pages/Events';
import EventDetail   from './pages/EventDetail';
import Membership    from './pages/Membership';
import Announcements from './pages/Announcements';
import Resources     from './pages/Resources';
import Contact       from './pages/Contact';
import AdminLogin    from './pages/admin/AdminLogin';
import AdminLayout   from './pages/admin/AdminLayout';
import Dashboard         from './pages/admin/Dashboard';
import ManageEvents      from './pages/admin/ManageEvents';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManageMembers     from './pages/admin/ManageMembers';
import NotFound          from './pages/NotFound';

function ScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    const targetId = location.hash.replace('#', '');
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
      return;
    }

    // Global smooth scrolling is useful for anchor links, but route changes
    // should reset immediately so the previous page cannot remain visible.
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    root.style.scrollBehavior = previousScrollBehavior;
  }, [location.pathname, location.hash]);

  return null;
}

/** Wraps a page component with the shared Navbar + Footer shell */
function PublicPage({ children }) {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a href="#main-content" className="sr-only z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex="-1" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        {/* Public routes */}
        <Route path="/"              element={<PublicPage><Home /></PublicPage>} />
        <Route path="/about"         element={<PublicPage><About /></PublicPage>} />
        <Route path="/events"        element={<PublicPage><Events /></PublicPage>} />
        <Route path="/events/:id"    element={<PublicPage><EventDetail /></PublicPage>} />
        <Route path="/membership"    element={<PublicPage><Membership /></PublicPage>} />
        <Route path="/announcements" element={<PublicPage><Announcements /></PublicPage>} />
        <Route path="/resources"     element={<PublicPage><Resources /></PublicPage>} />
        <Route path="/contact"       element={<PublicPage><Contact /></PublicPage>} />
        <Route path="*"              element={<PublicPage><NotFound /></PublicPage>} />

        {/* Admin routes (auth-gated in Phase 2) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index          element={<Dashboard />} />
          <Route path="events"        element={<ManageEvents />} />
          <Route path="announcements" element={<ManageAnnouncements />} />
          <Route path="members"       element={<ManageMembers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
