import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f1f5f9',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>
        <AdminHeader onMenuClick={() => setSidebarOpen(o => !o)} />
        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
