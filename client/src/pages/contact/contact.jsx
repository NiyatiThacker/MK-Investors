import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/services';
import { toast } from 'react-hot-toast';

function Contact() {
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: location.state?.subject || '',
    message: ''
  });

  const [copiedPhone1, setCopiedPhone1] = useState(false);
  const [copiedPhone2, setCopiedPhone2] = useState(false);

  const handleCopyPhone1 = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+91 94272 17798');
    setCopiedPhone1(true);
    setTimeout(() => setCopiedPhone1(false), 2000);
  };

  const handleCopyPhone2 = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+91 79907 44040');
    setCopiedPhone2(true);
    setTimeout(() => setCopiedPhone2(false), 2000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'fullName') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Thank you for your message. We have received it and will get back to you soon!');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error('There was an issue sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please ensure the server is running.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">Get In Touch</h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Ready to start your investment journey? We're here to help you achieve your financial goals.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

          {/* Left Column: Contact Information */}
          <div className="lg:w-1/3 bg-white p-6 md:p-8 xl:p-12 border-r border-gray-100">
            <h2 className="text-3xl font-bold text-green-950 mb-8">Contact Information</h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {/* Address */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Address</h3>
                  <a href="https://maps.google.com/maps?q=Span%20Trade%20Center,%20Paldi%20Rd,%20Near%20Bony%20Travels,%20Pritam%20Nagar,%20Paldi,%20Ahmedabad,%20Gujarat%20380006" target="_blank" rel="noopener noreferrer" className="text-ink-muted text-sm leading-relaxed hover:text-gold-600 transition-colors">
                    Span Trade Centre, Paldi Rd, Near Bony Travels, Pritam Nagar, Paldi, Ahmedabad, Gujarat 380006
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Phone size={24} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-green-950 mb-2">Phone</h3>
                  <button onClick={handleCopyPhone1} className="text-ink-muted text-sm mb-1 flex items-center gap-2 hover:text-gold-600 transition-colors w-full text-left">
                    <span className="whitespace-nowrap">+91 94272 17798</span>
                    {copiedPhone1 ? <span className="text-xs text-green-500 font-medium whitespace-nowrap">Copied!</span> : <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Click to copy</span>}
                  </button>
                  <button onClick={handleCopyPhone2} className="text-ink-muted text-sm flex items-center gap-2 hover:text-gold-600 transition-colors w-full text-left">
                    <span className="whitespace-nowrap">+91 79907 44040</span>
                    {copiedPhone2 ? <span className="text-xs text-green-500 font-medium whitespace-nowrap">Copied!</span> : <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Click to copy</span>}
                  </button>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Email</h3>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=prospectssbs@gmail.com" target="_blank" rel="noopener noreferrer" className="text-ink-muted text-sm hover:text-gold-600 transition-colors">prospectssbs@gmail.com</a>
                </div>
              </motion.div>

              {/* Business Hours */}
              <motion.div variants={itemVariants} className="bg-green-100/30 p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <Icons.Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-green-950 mb-2">Business Hours</h3>
                  <p className="text-ink-muted text-sm mb-1">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-ink-muted text-sm">Sun: On Advance Appointment Basis</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-2/3 p-8 md:p-12 bg-white">
            <h2 className="text-3xl font-bold text-green-950 mb-8">Send Us a Message</h2>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="fullName" className="text-green-950 font-semibold md:w-1/3">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={40}
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="email" className="text-green-950 font-semibold md:w-1/3">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="phone" className="text-green-950 font-semibold md:w-1/3 whitespace-nowrap">Phone Number *</label>
                  <div className="w-full md:w-2/3 flex">
                    <div className="relative">
                      <select 
                        className="h-full pl-3 pr-8 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors appearance-none cursor-pointer text-gray-700 font-medium"
                        defaultValue="+91"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <Icons.ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      maxLength={10}
                      minLength={10}
                      className="flex-grow min-w-0 px-4 py-3 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors w-full"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <label htmlFor="subject" className="text-green-950 font-semibold md:w-1/3">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full md:w-2/3 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-slate-500"
                  >
                    <option value="" disabled>Select a subject</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 pt-4">
                <label htmlFor="message" className="text-green-950 font-semibold md:w-1/6">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="6"
                  maxLength={1000}
                  className="w-full md:w-5/6 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-6 md:pl-[16.666667%]">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3.5 shadow-lg shadow-gold-400/15"
                >
                  Send Message
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 h-[500px] w-full overflow-hidden">
          <iframe
            title="SBS Investments Location"
            src="https://maps.google.com/maps?q=Span%20Trade%20Center,%20Paldi%20Rd,%20Near%20Bony%20Travels,%20Pritam%20Nagar,%20Paldi,%20Ahmedabad,%20Gujarat%20380006&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '0.75rem' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default Contact;
