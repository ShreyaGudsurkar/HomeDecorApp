import { useEffect, useState } from 'react';
import {
    fetchCatalog,
    fetchByMainAndSub,
    fetchMainCategories,
    fetchSubCategories,
    fetchTypes, fetchByMain, fetchBySub
} from './services/catalog-service.js';
import './ProductCatalog.css';
import BuyNowModal from "./BuyNowModal.jsx";
import { stripePromise } from './services/stripe';
import PaymentSuccessModal from './PaymentSuccessModal.jsx';
import PaymentCancelModal from "./PaymentCancelModal.jsx";
import {
    addToStoreWishlist,
    removeFromStoreWishlist,
    getStoreWishlist
} from './services/store-wishlist-service.js';



function ProductCatalog({ loggedInUser, setShowLogin }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedMain, setSelectedMain] = useState('');
    const [selectedSub, setSelectedSub] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [purchasedProduct, setPurchasedProduct] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [storeWishlist, setStoreWishlist] = useState([]);


    useEffect(() => {
        if (loggedInUser) {
            getStoreWishlist(loggedInUser.username)
                .then(setStoreWishlist)
                .catch(console.error);
        }
    }, [loggedInUser]);

    function isInWishlist(productId) {
        return storeWishlist.some(item => item.productId === productId);
    }

    async function toggleStoreWishlist(item) {
        const isSaved = isInWishlist(item.id);
        try {
            if (isSaved) {
                await removeFromStoreWishlist(loggedInUser.username, item.id);
                setStoreWishlist(prev => prev.filter(p => p.productId !== item.id));
            } else {
                const newItem = {
                    username: loggedInUser.username,
                    productId: item.id,
                    title: item.title || item.type,
                    imageUrl: item.imageUrl,
                    priceUsd: item.priceUsd,
                };
                const savedItem = await addToStoreWishlist(newItem);
                setStoreWishlist(prev => [...prev, savedItem]);
            }
        } catch (err) {
            console.error('Wishlist error:', err);
            alert('Could not update wishlist.');
        }
    }



    useEffect(() => {
        const hash = window.location.hash;

        if (hash.startsWith('#store-success')) {
            const query = hash.split('?')[1];
            const urlParams = new URLSearchParams(query);
            const product = urlParams.get('product');
            const amount = urlParams.get('amount');

            if (product && amount) {
                setPurchasedProduct({ name: product, price: amount });
                setShowSuccessModal(true);
                window.history.replaceState({}, document.title, '#store');
            }
        } else if (hash === '#store-cancel') {
            setShowCancelModal(true);
            window.history.replaceState({}, document.title, '#store');
        }
    }, []);




    useEffect(() => {
        fetchCatalog()
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => setError(err.message));

        fetchMainCategories().then(setMainCategories);
        fetchSubCategories().then(setSubCategories);
        fetchTypes().then(setTypes);
    }, []);

    async function handleBuy(product) {
        try {
            console.log('Attempting to buy:', product);
            console.log('Calculated amount (cents):', Number(product.priceUsd) * 100);

            const response = await fetch('http://localhost:8080/api/payment/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.title || product.type,
                    amount: Number(product.priceUsd) * 100
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const session = await response.json();
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: session.id });

        } catch (error) {
            console.error('Stripe checkout error:', error);
            alert('Could not proceed to checkout. Please try again.');
        }
    }



    const handleMainChange = (e) => {
        const value = e.target.value;
        setSelectedMain(value);

        if (value && selectedSub) {
            fetchByMainAndSub(value, selectedSub).then(setProducts);
        } else if (value) {
            fetchByMain(value).then(setProducts);
        } else if (selectedSub) {
            fetchBySub(selectedSub).then(setProducts);
        } else {
            fetchCatalog().then(setProducts);
        }
    };

    const handleSubChange = (e) => {
        const value = e.target.value;
        setSelectedSub(value);

        if (selectedMain && value) {
            fetchByMainAndSub(selectedMain, value).then(setProducts);
        } else if (value) {
            fetchBySub(value).then(setProducts);
        } else if (selectedMain) {
            fetchByMain(selectedMain).then(setProducts);
        } else {
            fetchCatalog().then(setProducts);
        }
    };

            if (error) return <p>Error: {error}</p>;
    if (!products) return <p>Loading...</p>;
    if (products.length === 0) {
        return (
            <div className="no-results">
                <p>No products found for selected filters.</p>
                <button
                    className="back-button"
                    onClick={() => {
                        setSelectedMain('');
                        setSelectedSub('');
                        fetchCatalog().then(setProducts);
                    }}
                >
                    Back to All Products
                </button>
            </div>
        );
    }

    return (
        <div className="catalog-page">
            <h2 className="store-title">Explore Our Product Collection</h2>

            <div className="filter-bar">
                <select onChange={handleMainChange} value={selectedMain}>
                    <option value="">All Main Categories</option>
                    {mainCategories.map((cat, index) => (
                        <option key={`main-${index}`} value={cat}>{cat}</option>
                    ))}
                </select>

                <select onChange={handleSubChange} value={selectedSub}>
                    <option value="">All Subcategories</option>
                    {subCategories.map((sub, index) => (
                        <option key={`sub-${index}`} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            <div className="catalog-grid">
                {products.map((item, ) => {
                    return (
                        <div className="card" key={item.id}>
                            <img className="store-cards" src={item.imageUrl} alt={item.type}/>
                            <h3>{item.title || item.type}</h3>
                            <p className="description">{item.description}</p>
                            <p className="rating"><img
                                src="/images/rating.svg"
                                alt="rating star icon"
                                className="rating-icon-img"
                            /> {item.rating}</p>
                            <div className="price-section">
                                <div className="prices">
                                    <span className="discounted">${item.priceUsd}</span>
                                    {item.originalPriceUsd && item.originalPriceUsd > item.priceUsd && (
                                        <span className="original">${item.originalPriceUsd}</span>
                                    )}
                                </div>
                                <p className="emi">{item.emiInfo}</p>
                                <p className="shipping">{item.shippingInfo}</p>
                            </div>

                            <div className="card-actions">
                                {loggedInUser ? (
                                    <>
                                        <button
                                            className="wishlist-icon"
                                            onClick={() => toggleStoreWishlist(item)}
                                            aria-label={isInWishlist(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                                        >
                                            <img
                                                src={isInWishlist(item.id) ? "/images/heart-filled.png" : "/images/heart-outline.png"}
                                                alt={isInWishlist(item.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                                                className="wishlist-icon-img"
                                            />
                                        </button>
                                        <button className="buy-now-button" onClick={() => handleBuy(item)}>Buy Now</button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="wishlist-icon disabled"
                                            onClick={() => setShowLogin(true)}
                                            title="Login to save item"
                                            aria-label="Login to add to Wishlist"
                                        >
                                            <img
                                                src="/images/heart-outline.png"
                                                alt="Login to add to Wishlist"
                                                className="wishlist-icon-img"
                                            />
                                        </button>

                                        <button
                                            className="buy-now-button disabled"
                                            onClick={() => setShowLogin(true)}
                                            title="Login to buy"
                                        >
                                            Buy Now
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    )
                        ;
                })}

            </div>
            {showBuyModal && selectedProduct && (
                <BuyNowModal
                    product={selectedProduct}
                    onClose={() => setShowBuyModal(false)}
                />
            )}
            {showSuccessModal && purchasedProduct && (
                <PaymentSuccessModal
                    product={purchasedProduct}
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
            {showCancelModal && (
                <PaymentCancelModal onClose={() => setShowCancelModal(false)} />
            )}

        </div>

    );
}

export default ProductCatalog;
