import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Updated import to 'framer-motion' as 'motion/react' might be a typo or outdated
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

        const postMessage = await axios.post('https://galaxia-mart-server.vercel.app/send-message', formData);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900/95 via-violet-950/95 to-cyan-900/95 dark:from-gray-100/95 dark:via-violet-100/95 dark:to-cyan-100/95 text-gray-100 dark:text-gray-800 py-16 px-4 md:px-8 relative overflow-hidden backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            {/* Particle Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-72 h-72 bg-cyan-500/25 dark:bg-cyan-500/15 rounded-full filter blur-3xl animate-pulse opacity-20 top-[-80px] left-[-80px]"></div>
                <div className="absolute w-96 h-96 bg-magenta-500/25 dark:bg-magenta-500/15 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[-120px] right-[-120px] animate-pulse-slow"></div>
                <div className="w-1 h-1 bg-cyan-500/50 dark:bg-cyan-500/30 rounded-full absolute top-10 left-20 animate-pulse"></div>
                <div className="w-2 h-2 bg-magenta-500/30 dark:bg-magenta-500/20 rounded-full absolute bottom-20 right-30 animate-pulse delay-200"></div>
                <div className="w-1 h-1 bg-violet-500/40 dark:bg-violet-500/25 rounded-full absolute top-40 right-10 animate-pulse delay-400"></div>
            </div>

            {/* Contact Header */}
            <motion.section
                className="text-center max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron mb-4">
                    Contact Galaximart
                </h1>
                <p className="text-lg md:text-xl text-gray-300 dark:text-gray-700">
                    Reach out to us for business inquiries, support, or to explore the cosmos of wholesale opportunities.
                </p>
            </motion.section>

            {/* Contact Form and Info */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-gray-900/50 dark:bg-gray-100/50 backdrop-blur-md p-8 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.3)] dark:shadow-[0_0_10px_rgba(139,92,246,0.2)] border border-cyan-500/30 dark:border-violet-500/30 overflow-hidden relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {/* Form Particle Effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-24 h-24 bg-cyan-500/20 dark:bg-cyan-500/15 rounded-full filter blur-xl animate-pulse opacity-30 top-[-20px] left-[-20px]"></div>
                        <div className="absolute w-32 h-32 bg-magenta-500/20 dark:bg-magenta-500/15 rounded-full filter blur-xl animate-pulse-slow opacity-30 bottom-[-30px] right-[-30px]"></div>
                    </div>

                    <div className="mb-6 relative z-10">
                        <label htmlFor="name" className="block text-gray-100 dark:text-gray-800 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border border-cyan-500/30 dark:border-violet-500/30 text-gray-100 dark:text-gray-800 focus:border-cyan-400 dark:focus:border-violet-600 focus:outline-none focus:shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all duration-300"
                            required
                        />
                    </div>
                    <div className="mb-6 relative z-10">
                        <label htmlFor="email" className="block text-gray-100 dark:text-gray-800 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border border-cyan-500/30 dark:border-violet-500/30 text-gray-100 dark:text-gray-800 focus:border-cyan-400 dark:focus:border-violet-600 focus:outline-none focus:shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all duration-300"
                            required
                        />
                    </div>
                    <div className="mb-6 relative z-10">
                        <label htmlFor="message" className="block text-gray-100 dark:text-gray-800 font-semibold mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border border-cyan-500/30 dark:border-violet-500/30 text-gray-100 dark:text-gray-800 focus:border-cyan-400 dark:focus:border-violet-600 focus:outline-none focus:shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all duration-300 h-32"
                            required
                        ></textarea>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                    >
                        <PrimaryButton text={"Send Message"} />
                    </motion.div>
                </motion.form>

                {/* Contact Info */}
                <motion.div
                    className="flex flex-col gap-6 bg-gray-900/50 dark:bg-gray-100/50 backdrop-blur-md p-8 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.3)] dark:shadow-[0_0_10px_rgba(139,92,246,0.2)] border border-cyan-500/30 dark:border-violet-500/30 overflow-hidden relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {/* Info Particle Effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-24 h-24 bg-cyan-500/20 dark:bg-cyan-500/15 rounded-full filter blur-xl animate-pulse opacity-30 top-[-20px] left-[-20px]"></div>
                        <div className="absolute w-32 h-32 bg-magenta-500/20 dark:bg-magenta-500/15 rounded-full filter blur-xl animate-pulse-slow opacity-30 bottom-[-30px] right-[-30px]"></div>
                    </div>

                    <motion.div
                        className="flex items-center gap-4 relative z-10"
                        whileHover={{ scale: 1.05, x: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaEnvelope className="text-cyan-400 dark:text-cyan-600 text-2xl drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] dark:drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Email Us</h3>
                            <p className="text-gray-300 dark:text-gray-700">support@galaximart.com</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex items-center gap-4 relative z-10"
                        whileHover={{ scale: 1.05, x: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaPhone className="text-cyan-400 dark:text-cyan-600 text-2xl drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] dark:drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Call Us</h3>
                            <p className="text-gray-300 dark:text-gray-700">+1 (800) 555-GALAXY</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex items-center gap-4 relative z-10"
                        whileHover={{ scale: 1.05, x: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaMapMarkerAlt className="text-cyan-400 dark:text-cyan-600 text-2xl drop-shadow-[0_0_6px_rgba(34,211,238,0.5)] dark:drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
                        <div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">Visit Us</h3>
                            <p className="text-gray-300 dark:text-gray-700">123 Cosmic Way, Nebula City, NC 12345</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;