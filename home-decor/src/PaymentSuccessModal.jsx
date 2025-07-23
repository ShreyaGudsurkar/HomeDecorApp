import React from 'react';
import './PaymentModal.css'

function PaymentSuccessModal({ onClose, product }) {
    return (
        <div className="modal-overlay">
            <div className="payment-success-modal">
                <h2> Payment Successful</h2>
                <p>Thank you for your purchase!</p>
                {product && (
                    <div className="receipt">
                        <p><strong>Item:</strong> {product.name}</p>
                        <p><strong>Amount Paid:</strong> ${product.price / 100}</p>
                    </div>
                )}
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default PaymentSuccessModal;
