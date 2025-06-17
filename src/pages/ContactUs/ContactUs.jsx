import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {

    useEffect(()=> {
        document.title="Contact Us"
    },[])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add API call or form submission logic here
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a3d] to-[#2a2a5e] text-white py-16 px-4 md:px-8 relative overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-1 h-1 bg-orange-400/50 rounded-full absolute top-10 left-20 animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-400/30 rounded-full absolute bottom-20 right-30 animate-pulse delay-200"></div>
                <div className="w-1 h-1 bg-orange-400/40 rounded-full absolute top-40 right-10 animate-pulse delay-400"></div>
            </div>

            {/* Contact Header */}
            <motion.section
                className="text-center max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-orange-400 mb-4">
                    Contact Galaximart
                </h1>
                <p className="text-lg md:text-xl text-neutral-300">
                    Reach out to us for business inquiries, support, or to explore the cosmos of wholesale opportunities.
                </p>
            </motion.section>

            {/* Contact Form and Info */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-[#2a2a5e]/50 backdrop-blur-sm p-8 rounded-lg border border-orange-500/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-orange-400 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white focus:border-orange-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-orange-400 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white focus:border-orange-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-orange-400 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-600 text-white focus:border-orange-500 focus:outline-none h-32"
                            required
                        ></textarea>
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-orange-400 text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-orange-400">Email Us</h3>
                            <p className="text-neutral-300">support@galaximart.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaPhone className="text-orange-400 text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-orange-400">Call Us</h3>
                            <p className="text-neutral-300">+1 (800) 555-GALAXY</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-orange-400 text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-orange-400">Visit Us</h3>
                            <p className="text-neutral-300">123 Cosmic Way, Nebula City, NC 12345</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;