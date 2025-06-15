import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { AuthContext } from '../../Provider/AuthProvider';
import GoogleLoginButton from '../common/shared/GoogleLoginButton';
import Swal from 'sweetalert2';

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { signInUser } = useContext(AuthContext);

    const location = useLocation();
    console.log(location);

    const navigate = useNavigate();

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

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log('user signed in', result);
                Swal.fire({
                    title: 'Success!',
                    text: 'You have signed in successfully.',
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
                navigate(`${location?.state ? location?.state : '/'}`)
            })
            .catch((err) => {
                console.error('Sign-in error:', { code: err.code, message: err.message });
                let errorMessage = 'An error occurred during sign-in. Please try again.';
                switch (err.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email format. Please enter a valid email address.';
                        break;
                    case 'auth/invalid-credential':
                        errorMessage = 'Invalid email or password. Please check your credentials.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email. Please sign up.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many attempts. Please try again later.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'This account has been disabled. Contact support.';
                        break;
                    default:
                        errorMessage = `Sign-in failed: ${err.message || 'Unknown error'}`;
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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-violet-950 to-cyan-900 relative overflow-hidden px-4 md:px-0">
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
                    Sign In
                </h2>
                <form
                    onSubmit={handleSignIn}
                    className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="font-inter label-text font-semibold text-gray-100">Email</span>
                        </label>
                        <motion.input
                            type="email"
                            name='email'
                            placeholder="Enter your email"
                            className="font-inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="font-inter label-text font-semibold text-gray-100">Password</span>
                        </label>
                        <motion.input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder="Enter your password"
                            className="font-inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400"
                            whileFocus="focus"
                            variants={inputVariants}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-9 top-[59%] transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-cyan-400"
                        >
                            {!showPassword ? <VscEyeClosed size={24} /> : <VscEye size={24} />}
                        </span>
                    </div>
                    <motion.button
                        className="font-exo btn w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold uppercase tracking-wide hover:bg-gradient-to-r hover:from-cyan-600 hover:to-violet-600 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Sign In
                    </motion.button>
                    <p className="font-inter text-center text-gray-300 text-sm">
                        Don't have an account?{' '}
                        <NavLink to="/auth/signup">
                            <span className="font-exo text-cyan-400 hover:text-cyan-300 underline transition-all duration-300">
                                Sign Up
                            </span>
                        </NavLink>
                    </p>
                </form>
                <div className="divider divider-info text-white">Or Login With</div>
                <GoogleLoginButton />
            </motion.div>
        </div>
    );
};

export default SignIn;