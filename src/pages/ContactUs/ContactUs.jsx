import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import PrimaryButton from '../../shared/PrimaryButton';
import axios from 'axios';
import Swal from 'sweetalert2';

const ContactUs = () => {

    useEffect(() => {
        document.title = "Contact Us"
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add API call or form submission logic here

        const postMessage = await axios.post('http://localhost:3000/send-message', formData);
        console.log(postMessage?.status);

        if (postMessage?.status === 201) {
            Swal.fire({
                title: "Success",
                text: postMessage?.data?.message,
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    icon: "swal2-success"
                },
                buttonsStyling: false,
            })
        } else if (postMessage?.status === 400) {
            Swal.fire({
                title: "Failed",
                text: postMessage?.data?.message,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    icon: 'swal2-error'
                },
                buttonsStyling: false,
            })
        } else if (postMessage?.status === 404) {
            Swal.fire({
                title: "Failed",
                text: postMessage?.data?.message,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    icon: 'swal2-error'
                },
                buttonsStyling: false,
            })
        } else if (postMessage?.status === 500) {
            Swal.fire({
                title: "Failed",
                text: postMessage?.data?.message,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    icon: 'swal2-error'
                },
                buttonsStyling: false,
            })
        }

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
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron mb-4">
                    Contact Galaximart
                </h1>
                <p className="text-lg md:text-xl text-gray-100">
                    Reach out to us for business inquiries, support, or to explore the cosmos of wholesale opportunities.
                </p>
            </motion.section>

            {/* Contact Form and Info */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-[#2a2a5e]/50 backdrop-blur-sm p-8 rounded-lg shadow-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-100 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg  border border-gray-600 text-white focus:border-gray-100 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-100 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 text-white focus:border-gray-100 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-100 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-600 text-white focus:border-gray-100 focus:outline-none h-32"
                            required
                        ></textarea>
                    </div>
                    <PrimaryButton text={"Send Message"} />
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4">
                        <FaEnvelope className="text-white text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Email Us</h3>
                            <p className="text-neutral-300">support@galaximart.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaPhone className="text-white text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Call Us</h3>
                            <p className="text-neutral-300">+1 (800) 555-GALAXY</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-white text-2xl" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Visit Us</h3>
                            <p className="text-neutral-300">123 Cosmic Way, Nebula City, NC 12345</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;