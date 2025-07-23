import { useEffect, useState } from 'react';
import { getStoreWishlist, removeFromStoreWishlist } from './services/store-wishlist-service';
import './StoreFavorites.css'

export default function StoreFavorites({ loggedInUser }) {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loggedInUser?.username) {
            getStoreWishlist(loggedInUser.username)
                .then((data) => {
                    setWishlist(data);
                })
                .catch(() => setError('Failed to load store favorites.'));
        }
    }, [loggedInUser]);

    const handleRemove = (productId) => {
        removeFromStoreWishlist(loggedInUser.username, productId)
            .then(() => {
                setWishlist((prev) => prev.filter(item => item.productId !== productId));
            })
            .catch(() => setError('Failed to remove item.'));
    };

    if (error) return <div className="error">{error}</div>;

    return (
        <div className="store-favorites">
            <h2>Store Favorites</h2>
            {wishlist.length === 0 ? (
                <p>You haven’t saved any products yet.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlist.map((item) => (
                        <div key={item.productId} className="wishlist-card">
                            <img src={item.imageUrl} alt={item.title}/>
                            <div className="wishlist-info">
                                <h3>{item.title}</h3>
                                <p>{item.rating}</p>
                                <p>${item.priceUsd}</p>
                                <button onClick={() => handleRemove(item.productId)}>Remove</button>
                            </div>
                        </div>
                            ))}
                        </div>
                    )}
                </div>
            );
}
