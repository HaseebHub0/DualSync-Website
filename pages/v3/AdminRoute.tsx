import React, { useEffect, useState } from 'react';
// The admin inbox (pages/Admin.tsx) was built on the previous design system
// (Tailwind + styles/index.css). Load that stylesheet only while /admin is
// open and remove it on the way out, so its global reset never touches the
// public site.
import legacyCssUrl from '../../styles/index.css?url';

const Admin = React.lazy(() => import('../Admin'));

const AdminRoute: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = legacyCssUrl;
    link.onload = () => setReady(true);
    link.onerror = () => setReady(true);
    document.head.appendChild(link);
    document.documentElement.classList.add('dark');
    return () => {
      link.remove();
      document.documentElement.classList.remove('dark');
    };
  }, []);

  if (!ready) return <div style={{ minHeight: '100vh', background: '#122017' }} role="status" aria-label="Loading inbox" />;
  return (
    <div className="font-sans antialiased bg-canvas text-ink min-h-screen">
      <Admin />
    </div>
  );
};

export default AdminRoute;
