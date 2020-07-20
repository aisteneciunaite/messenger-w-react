import React, { useRef } from 'react';
import './index.scss';

function Modal({ setShowModal, children }) {
    const modal = useRef(null);
    function hideModal(e) {
        if (e.target !== modal) {
            setShowModal(false);
        }
    }
    return (
        <div className="Modal" onClick={hideModal}>
            {children}
        </div>
    );
}

export default Modal;