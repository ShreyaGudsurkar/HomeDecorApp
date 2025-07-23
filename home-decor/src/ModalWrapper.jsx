import './ModalWrapper.css';

function ModalWrapper({ title, children, onClose }) {
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2 className="modal-title">{title}</h2>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalWrapper;
