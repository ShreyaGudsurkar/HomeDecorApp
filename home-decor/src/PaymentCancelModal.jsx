import './PaymentModal.css'
function PaymentCancelModal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="payment-cancel-modal">
                <h2>Payment Cancelled</h2>
                <p>Your transaction was not completed. You can try again anytime.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PaymentCancelModal;
