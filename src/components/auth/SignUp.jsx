import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {signUpNewUser,setProfileInfo} = useContext(AuthContext);

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

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;

        // console.log(name, email, photo, password, confirmPassword)

        signUpNewUser(email, password).then(result => {
            setProfileInfo({photoURL:photo}).then(()=> {
                console.log('user created and profile updated', result);
                navigate('/')
            })
        }).catch(err => console.log(err));
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-violet-950 to-cyan-900 relative overflow-hidden px-4 md:px-0 py-10">
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
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirm_password'
                            placeholder="Confirm your password"
                            className="inter input input-bordered w-full bg-gray-800/50 text-gray-100 border-gray-600 focus:border-cyan-400 pr-12"
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
                    <motion.button
                        className="exo-2 btn w-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold uppercase tracking-wide hover:bg-gradient-to-r hover:from-cyan-600 hover:to-violet-600 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Sign Up
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

            <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default SignUp;