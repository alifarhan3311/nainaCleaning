import React, { useState } from 'react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { messageService } from '../../services/messageService';
import { useToast } from '../../context/ToastContext';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await messageService.sendMessage(formData);
      
      if (response.success) {
        showToast('Message sent successfully!', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      }
    } catch (error) {
      showToast(error.message || 'Failed to send message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label="Phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+1 (555) 123-4567"
      />

      <Input
        label="Service of Interest"
        name="service"
        value={formData.service}
        onChange={handleChange}
        placeholder="e.g., Office Cleaning"
      />

      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
        rows={5}
        placeholder="Tell us about your cleaning needs..."
      />

      <Button
        type="submit"
        loading={submitting}
        disabled={submitting}
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
