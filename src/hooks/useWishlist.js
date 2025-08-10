import { useState, useEffect } from 'react';

const useWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load wishlist from localStorage on initial render
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            try {
                setWishlist(JSON.parse(storedWishlist));
            } catch (error) {
                console.error('Error parsing wishlist:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isInitialized]);

    const addToWishlist = (product) => {
        if (!wishlist.some(item => item._id === product._id)) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item._id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, isInitialized };
};

export default useWishlist;