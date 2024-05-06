import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;