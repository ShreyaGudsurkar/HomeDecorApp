import React from 'react';
import './BuyNowModal.css';

function BuyNowModal({ product, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Checkout</h2>
                <div className="product-info">
                    <img src={product.imageSrc} alt={product.name} />
                    <p><strong>{product.name}</strong></p>
                    <p>Price: ${product.price}</p>
                </div>
                <p>This is a demo payment screen. In a real application, you'd now be redirected to Stripe.</p>
                <button className="confirm-button" onClick={() => {
                    alert('Pretend payment complete!');
                    onClose();
                }}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}

export default BuyNowModal;
