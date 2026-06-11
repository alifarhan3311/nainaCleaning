import React, { useEffect, useState } from 'react';
import { serviceService } from '../../services/serviceService';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import { Plus, Edit, Trash2, Power, X } from 'lucide-react';

const EMPTY_FORM = { title: '', description: '', icon: '🏢', priceRange: '', isActive: true };

const ServiceModal = ({ service, onClose, onSave }) => {
  const [form, setForm] = useState(service ? { ...service } : { ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      showToast('Title and description are required', 'error');
      return;
    }
    setSaving(true);
    try {
      if (service) {
        await onSave('update', service._id, form);
      } else {
        await onSave('create', null, form);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 32, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700 }}>{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Office Cleaning"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what this service includes..."
              rows={4}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Icon (emoji)</label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="🏢"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 20, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Price Range</label>
              <input
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
                placeholder="e.g. $150 - $300"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} />
            <label htmlFor="isActive" style={{ fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>Active (visible on website)</label>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : service ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await serviceService.getServices({ limit: 100 });
      if (response.success) {
        setServices(response.data.services || []);
      }
    } catch (error) {
      showToast('Failed to fetch services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (action, id, data) => {
    try {
      let response;
      if (action === 'create') {
        response = await serviceService.createService(data);
        if (response.success) {
          showToast('Service created successfully', 'success');
        }
      } else {
        response = await serviceService.updateService(id, data);
        if (response.success) {
          showToast('Service updated successfully', 'success');
        }
      }
      setModalOpen(false);
      setEditingService(null);
      fetchServices();
    } catch (error) {
      showToast(error.message || 'Failed to save service', 'error');
    }
  };

  const handleToggle = async (service) => {
    try {
      const response = await serviceService.toggleService(service._id);
      if (response.success) {
        showToast(`Service ${response.data.isActive ? 'activated' : 'deactivated'}`, 'success');
        fetchServices();
      }
    } catch (error) {
      showToast('Failed to update service status', 'error');
    }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const response = await serviceService.deleteService(serviceId);
      if (response.success) {
        showToast('Service deleted successfully', 'success');
        fetchServices();
      }
    } catch (error) {
      showToast('Failed to delete service', 'error');
    }
  };

  const openAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

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
        <ServiceModal
          service={editingService}
          onClose={() => { setModalOpen(false); setEditingService(null); }}
          onSave={handleSave}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <Button icon={Plus} onClick={openAdd}>Add Service</Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-2xl">{service.icon}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">{service.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{service.priceRange || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="outline" size="sm" icon={Power} onClick={() => handleToggle(service)}>Toggle</Button>
                  <Button variant="outline" size="sm" icon={Edit} onClick={() => openEdit(service)}>Edit</Button>
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(service._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No services found</p>
            <Button icon={Plus} onClick={openAdd}>Add Your First Service</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;
