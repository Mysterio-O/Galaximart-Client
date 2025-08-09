import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassErr, setConfirmPassErr] = useState(false);
    const [passErr, setPassErr] = useState('');
    const [loading, setLoading] = useState(false);


    const { signUpNewUser, setProfileInfo } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const inputVariants = {
        focus: {
            scale: 1.03,
            boxShadow: '0 0 8px rgba(34, 211, 238, 0.5)',
            borderColor: '#22d3ee',
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.05, boxShadow: '0 0 12px rgba(139, 92, 246, 0.6)' },
        tap: { scale: 0.95 }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    useEffect(() => {
        if (pass !== confirmPass) {
            setConfirmPassErr(true);
        }
        else {
            setConfirmPassErr(false);
        }
    }, [confirmPass, pass])

    // console.log(confirmPassErr)


    const handleSignUp = e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;

        if (password !== confirmPassword) return

        // console.log(name, email, photo, password, confirmPassword)


        if (!/.{6,}/.test(password)) {
            setPassErr("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setPassErr("Password must contain at least 1 lowercase letter");
            setLoading(false);
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setPassErr('Password must contain at least one uppercase letter');
            setLoading(false);
            return;
        }
        else {
            setPassErr('');
        }


        signUpNewUser(email, password).then(result => {
            setProfileInfo({ photoURL: photo, displayName: name })
                .then(() => {
                    // console.log('user created and profile updated', result);
                    setLoading(false);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Account created successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'swal-dark',
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-confirm-button',
                        },
                        buttonsStyling: false,
                    })
                    navigate(`${location?.state ? location.state : '/'}`)
                }).catch((err) => {
                    console.error('Profile update error:', { code: err.code, message: err.message });
                    setLoading(false);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Account created, but profile update failed. Please update your profile later.',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'swal-dark',
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-confirm-button',
                        },
                        buttonsStyling: false,
                    }).then(() => {
                        navigate('/');
                    });
                });
        }).catch((err) => {
            console.error('Sign-up error:', { code: err.code, message: err.message });
            let errorMessage = 'An error occurred during sign-up. Please try again.';
            switch (err.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email format. Please enter a valid email address.';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered. Please sign in or use another email.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak. Please use a stronger password.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later.';
                    break;
                default:
                    errorMessage = `Sign-up failed: ${err.message || 'Unknown error'}`;
            }
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm-button',
                },
                buttonsStyling: false,
            });
        });
    }

    const customStyles = `
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
      `

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-violet-950 to-cyan-900 relative overflow-hidden px-4 md:px-0 py-20">
            <style>{customStyles}</style>
            {/* Background Particle Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse opacity-20 top-[10%] left-[10%]"></div>
                <div className="absolute w-96 h-96 bg-magenta-500/20 rounded-full filter blur-3xl animate-pulse opacity-20 bottom-[15%] right-[15%] animate-pulse-slow"></div>
            </div>

            <motion.div
                className="card bg-gray-900/80 backdrop-blur-xl w-full max-w-md p-8 shadow-[0_0_20px_rgba(139,92,246,0.3)] rounded-2xl border border-cyan-500/20"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="orbitron text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">
                    Sign Up
                </h2>
                <form
                    onSubmit={handleSignUp}
                    className="space-y-6">

                    {/* name input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="inter label-text font-semibold text-gray-100">Name</span>
                        </label>
                        <motion.input
                            type="text"
                            name='name'
                            placeholder="Enter your name"
                            className="inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </div>

                    {/* photo input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="inter label-text font-semibold text-gray-100">Photo URL</span>
                        </label>
                        <motion.input
                            type="url"
                            name='photo'
                            placeholder="Enter Photo URL"
                            className="inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </div>

                    {/* email input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="inter label-text font-semibold text-gray-100">Email</span>
                        </label>
                        <motion.input
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            className="inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </div>

                    {/* password input */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="inter label-text font-semibold text-gray-100">Password</span>
                        </label>
                        <motion.input
                            onChange={(e) => setPass(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder="Enter your password"
                            className="inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400 pr-12"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[69%] transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-400"
                        >
                            {!showPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
                        </span>
                    </div>

                    {/* confirm password input */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="inter label-text font-semibold text-gray-100">Confirm Password</span>
                        </label>
                        <motion.input
                            onChange={(e) => setConfirmPass(e.target.value)}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirm_password'
                            placeholder="Confirm your password"
                            className={`inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400 pr-12 ${confirmPassErr ? 'input-error' : ''}`}
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-[69%] transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-400"
                        >
                            {!showConfirmPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
                        </span>
                    </div>


                    {
                        confirmPassErr && <p className='text-red-500 text-center'>Confirm password doesn't match</p>
                    }
                    {
                        passErr && <p className='text-red-500 text-sm'>{passErr}</p>
                    }


                    <motion.button
                        className="exo-2 btn w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold uppercase tracking-wide hover:bg-gradient-to-r hover:from-cyan-600 hover:to-violet-600 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {
                            loading ? <span className="loading loading-spinner text-info"></span>
                                : "Sign Up"
                        }
                    </motion.button>
                    <p className="inter text-center text-gray-300 text-sm">
                        Already have an account?{' '}
                        <NavLink to="/auth/signin">
                            <span className="exo-2 text-cyan-400 hover:text-cyan-300 underline transition-all duration-300">
                                Sign In
                            </span>
                        </NavLink>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignUp;