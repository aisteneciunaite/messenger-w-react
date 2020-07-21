import React, { useRef } from 'react';
import './index.scss';

// import Button from '../Button';
import Title from '../Title';
import Button from '../Button';

function Modal({ setShowModal, header, children }) {
  const dialog = useRef(null);
  function hideModal(e) {
    if (!dialog.current.contains(e.target)) {
      setShowModal(false);
    }
  }
  return (
    <div className="Modal" onMouseDown={hideModal}>
      <div className="Modal__dialog" ref={dialog}>
        <div className="Modal__content">
          <div className="Modal__header">
            <Title level="5" className="Modal__title">
              {header}
            </Title>
            <Button className="close" onClick={() => setShowModal(false)}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
