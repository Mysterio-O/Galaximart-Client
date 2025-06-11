import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {auth} from '../firebase/firebase.init'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // console.log(user)

    const signUpNewUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        return signOut(auth)
    }

    const setProfileInfo = (obj) => {
        return updateProfile(auth.currentUser, obj)
    }


    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('user signed in')
                setUser(user);
                setLoading(false)
            } else {
                // console.log('user signed out');
                setUser(null);
            }
            setLoading(false);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const values = {
        signUpNewUser,
        signInUser,
        signOutUser,
        googleLogin,
        setProfileInfo,
        user,
        setUser,
        loading
    };
    return <AuthContext value={values}>{children}</AuthContext>
};

export default AuthProvider;