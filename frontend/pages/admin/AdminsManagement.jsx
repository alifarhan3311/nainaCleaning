import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Plus, Edit, Trash2, X, Shield, User } from 'lucide-react';

const EMPTY_FORM = { username: '', email: '', password: '', role: 'admin' };

const AdminModal = ({ admin, onClose, onSave }) => {
  const [form, setForm] = useState(
    admin
      ? { username: admin.username, email: admin.email, password: '', role: admin.role }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.email.trim()) {
      showToast('Username and email are required', 'error');
      return;
    }
    if (!admin && !form.password) {
      showToast('Password is required for new admins', 'error');
      return;
    }
    if (form.password && form.password.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    setSaving(true);
    try {
      const payload = { username: form.username, email: form.email, role: form.role };
      if (form.password) payload.password = form.password;
      await onSave(admin ? 'update' : 'create', admin?._id, payload);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: '#374151',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 480, padding: 32, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700 }}>
          {admin ? 'Edit Admin' : 'Add New Admin'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username *</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="johndoe" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{admin ? 'New Password (leave blank to keep current)' : 'Password *'}</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Role *</label>
            <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : admin ? 'Update Admin' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminsManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAdmins();
      if (response.success) {
        setAdmins(response.data);
      }
    } catch (error) {
      showToast('Failed to fetch admins', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (action, id, data) => {
    try {
      let response;
      if (action === 'create') {
        response = await adminService.createAdmin(data);
        if (response.success) showToast('Admin created successfully', 'success');
      } else {
        response = await adminService.updateAdmin(id, data);
        if (response.success) showToast('Admin updated successfully', 'success');
      }
      setModalOpen(false);
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      showToast(error.message || 'Failed to save admin', 'error');
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    try {
      const response = await adminService.deleteAdmin(adminId);
      if (response.success) {
        showToast('Admin deleted successfully', 'success');
        fetchAdmins();
      }
    } catch (error) {
      showToast(error.message || 'Failed to delete admin', 'error');
    }
  };

  const openAdd = () => { setEditingAdmin(null); setModalOpen(true); };
  const openEdit = (admin) => { setEditingAdmin(admin); setModalOpen(true); };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {modalOpen && (
        <AdminModal
          admin={editingAdmin}
          onClose={() => { setModalOpen(false); setEditingAdmin(null); }}
          onSave={handleSave}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admins Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage admin accounts and permissions</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add Admin</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      {admin.role === 'superadmin'
                        ? <Shield size={16} className="text-blue-600" />
                        : <User size={16} className="text-blue-600" />
                      }
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{admin.username}</div>
                      {admin._id === currentUser?.id && (
                        <span className="text-xs text-green-600 font-medium">You</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    admin.role === 'superadmin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {admin.role === 'superadmin' ? <Shield size={10} /> : <User size={10} />}
                    {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="outline" size="sm" icon={Edit} onClick={() => openEdit(admin)}>Edit</Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => handleDelete(admin._id)}
                    disabled={admin._id === currentUser?.id}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {admins.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No admins found</p>
            <Button icon={Plus} onClick={openAdd}>Add First Admin</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminsManagement;
