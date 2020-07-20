import React from 'react';
import './index.scss';

import Button from 'app/components/Common/Button';
import Title from 'app/components/Common/Title';

import iconAdd from 'app/assets/icons/plus.svg';
import iconRemove from 'app/assets/icons/trash-can.svg';
import iconEdit from 'app/assets/icons/pencil.svg';
import iconExit from 'app/assets/icons/exit.svg';

function ChannelTools() {
  return (
    <aside className="Channel">
      <Title level="3">Kanalo įrankiai</Title>
      <div className="Channel__tools">
        <Button>
          <img src={iconAdd} alt="add" />
        </Button>
        <Button>
          <img src={iconExit} alt="exit" />
        </Button>
        <Button>
          <img src={iconEdit} alt="edit" />
        </Button>
        <Button>
          <img src={iconRemove} alt="remove" />
        </Button>
      </div>

      <div className="dropdown-divider"></div>
      <Title level="4">Kanalo nariai</Title>
      <ul className="Channel__users">
        <li>
          <img
            src="https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg"
            alt="user"
          />
          <span>name</span>
        </li>
        <li>
          <img
            src="https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg"
            alt="user"
          />
          <span>name</span>
        </li>
      </ul>
    </aside>
  );
}

export default ChannelTools;
