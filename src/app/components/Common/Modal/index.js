import React, { useRef, useLayoutEffect } from 'react';
import './index.scss';

// import Button from '../Button';
import Title from '../Title';
import Button from '../Button';

function Modal({ setShowModal, header, children }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);

  function hideModal(e) {
    if (!dialog.current.contains(e.target)) {
      setShowModal(false);
    }
  }

  useLayoutEffect(() => {
    closeButton.current.focus();
  });

  return (
    <div className="Modal" onMouseDown={hideModal}>
      <div className="Modal__dialog" ref={dialog}>
        <div className="Modal__content">
          <div className="Modal__header">
            <Title level="5" className="Modal__title">
              {header}
            </Title>
            <Button className="Button close" ref={closeButton} onClick={() => setShowModal(false)}>
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
