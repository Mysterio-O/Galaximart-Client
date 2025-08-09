import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
const GoogleLoginButton = ({from}) => {
    console.log('location state from google button->',from);

    const { googleLogin } = useContext(AuthContext);

    const navigate = useNavigate();

    const onGoogleLogin = () => {
        googleLogin().then(result => {
            Swal.fire({
                title: 'Success!',
                text: 'Signed in with Google successfully.',
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
            // console.log('user signed in using google', result)
            navigate(`${from ? from : '/'}`)
        }).catch((err) => {
            console.error('Google sign-in error:', { code: err.code, message: err.message }); // Debug log
            let errorMessage = 'An error occurred during Google sign-in. Please try again.';
            switch (err.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Sign-in popup was closed. Please try again.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Popup was blocked by your browser. Please allow popups and try again.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'An account already exists with this email using a different sign-in method. Try another method or link accounts.';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid Google credentials. Please try again or contact support.';
                    break;
                case 'auth/auth-domain-config-required':
                    errorMessage = 'Authentication domain is not configured. Contact support.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many attempts. Please try again later.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This Google account has been disabled. Contact support.';
                    break;
                default:
                    errorMessage = `Google sign-in failed: ${err.message || 'Unknown error'}`;
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
    return (
        <button
            onClick={onGoogleLogin}
            className="flex items-center mx-auto gap-2 btn text-sm font-bold uppercase tracking-wider text-white px-6 py-3 rounded-xl 
          bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 
          hover:from-cyan-500 hover:to-indigo-500 
          hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] 
          border border-cyan-300/30 
          transition-all duration-500 ease-out
          focus:bg-gradient-to-r focus:from-cyan-700/60 focus:to-indigo-700/60 focus:text-cyan-100 focus:font-extrabold focus:border-cyan-400/70 focus:shadow-[0_0_25px_rgba(79,70,229,0.8)]"
        >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
            </svg>
            Login with Google
        </button>
    );
};

export default GoogleLoginButton;