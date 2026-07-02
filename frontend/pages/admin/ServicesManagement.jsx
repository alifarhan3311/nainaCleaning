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
    <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
          <X size={18} className="text-surface-muted" />
        </button>
        <h2 className="text-xl font-bold text-white mb-6">{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-surface-muted mb-1.5">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Office Cleaning"
              className="input-dark w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-surface-muted mb-1.5">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what this service includes..."
              rows={4}
              className="input-dark w-full resize-y"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-surface-muted mb-1.5">Icon (emoji)</label>
              <input
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="🏢"
                className="input-dark w-full text-center text-2xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-surface-muted mb-1.5">Price Range</label>
              <input
                name="priceRange"
                value={form.priceRange}
                onChange={handleChange}
                placeholder="e.g. $150 - $300"
                className="input-dark w-full"
              />
            </div>
          </div>
          <div className="mb-6 flex items-center gap-3">
            <input type="checkbox" name="isActive" id="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4 accent-primary" />
            <label htmlFor="isActive" className="text-sm font-medium text-surface-muted cursor-pointer">Active (visible on website)</label>
          </div>
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-white/10 rounded-lg text-sm font-semibold text-surface-muted hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary px-6">
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
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
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
        <div>
          <h1 className="text-2xl font-bold text-white">Services Management</h1>
          <p className="text-surface-muted text-sm mt-1">{services.length} service{services.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add Service</Button>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/6">
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Icon</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Title</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Description</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Price Range</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold text-surface-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                <td className="px-5 py-4 text-2xl">{service.icon}</td>
                <td className="px-5 py-4">
                  <div className="text-sm font-semibold text-white">{service.title}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm text-surface-muted max-w-xs truncate">{service.description}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-sm text-surface-muted">{service.priceRange || '-'}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${service.isActive ? 'bg-teal/15 text-teal' : 'bg-red-500/15 text-red-400'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" icon={Power} onClick={() => handleToggle(service)} className="hover:text-teal">Toggle</Button>
                    <Button variant="ghost" size="sm" icon={Edit} onClick={() => openEdit(service)} className="hover:text-primary">Edit</Button>
                    <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(service._id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-muted mb-4">No services found</p>
            <Button icon={Plus} onClick={openAdd}>Add Your First Service</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;
