import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

//components
import Button from 'app/components/Common/Button';
import Title from 'app/components/Common/Title';
import Modal from 'app/components/Common/Modal';
import Input from 'app/components/Common/Input';
import Form from 'app/components/Common/Form';
//assets
import iconAdd from 'app/assets/icons/plus.svg';
import iconRemove from 'app/assets/icons/trash-can.svg';
import iconEdit from 'app/assets/icons/pencil.svg';
import iconExit from 'app/assets/icons/exit.svg';
import UserWithImage from '../UserWIthImage';
//modules
import contacts from 'contacts';
import channels from 'channels';
import auth from 'authentication';

function ChannelTools({ channelId, channelName }) {
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const renameInput = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector(auth.selectors.getToken);
  const userContacts = useSelector(contacts.selectors.getContacts);
  const channelUsers = useSelector(channels.selectors.getOpenChannelUsers);
  const channelUserIds = channelUsers.map(user => user._id);

  const [checkedUserIds, setCheckedUsers] = useState([]);

  const handleRenameSubmit = e => {
    e.preventDefault();
    dispatch(channels.actions.renameChannel({ channelId, name: renameInput.current.value, token }));
    setRenameModalVisible(false);
  };

  const handleDeleteSubmit = e => {
    e.preventDefault();
    dispatch(channels.actions.deleteChannel({ channelId, token }));
    setDeleteModalVisible(false);
  };

  const handleLeaveSubmit = e => {
    e.preventDefault();
    dispatch(channels.actions.leaveChannel({ channelId, token }));
    setDeleteModalVisible(false);
  };

  const handleCheckmarkChange = e => {
    e.persist();
    e.target.checked
      ? setCheckedUsers(prev => [...prev, e.target.id])
      : setCheckedUsers(prev => prev.filter(id => id !== e.target.id));
  };

  const handleAddSubmit = e => {
    e.preventDefault();
    const selectedUsers = checkedUserIds.map(id => userContacts.find(user => user._id === id));
    selectedUsers.forEach(user => {
      dispatch(channels.actions.addToChannel({ user, token, channelId }));
    });
    setAddModalVisible(false);
  };

  const eligableUsers = userContacts.filter(user => !channelUserIds.includes(user._id));

  return (
    <>
      <aside className="Channel">
        <Title level="3">Kanalo įrankiai</Title>
        <div className="Channel__tools">
          <Button onClick={() => setAddModalVisible(true)}>
            <img src={iconAdd} alt="add" />
          </Button>
          <Button onClick={() => setExitModalVisible(true)}>
            <img src={iconExit} alt="exit" />
          </Button>
          <Button onClick={() => setRenameModalVisible(true)}>
            <img src={iconEdit} alt="edit" />
          </Button>
          <Button onClick={() => setDeleteModalVisible(true)}>
            <img src={iconRemove} alt="remove" />
          </Button>
        </div>

        <div className="dropdown-divider"></div>
        <Title level="4">Kanalo nariai</Title>
        {channelUsers.map(user => (
          <UserWithImage user={user} key={user._id} />
        ))}
      </aside>

      {renameModalVisible && (
        <Modal header="Keisti kanalo pavadinimą" setShowModal={setRenameModalVisible}>
          <Form submitButtonText="Išsaugoti" className="Modal__body" onSubmit={handleRenameSubmit}>
            <Input
              input={{ id: 'changeName', type: 'text', ref: renameInput, value: channelName }}
            />
          </Form>
        </Modal>
      )}

      {addModalVisible && (
        <Modal header={`Pridėti į ${channelName}`} setShowModal={setAddModalVisible}>
          <Form submitButtonText="Pridėti" onSubmit={handleAddSubmit}>
            {eligableUsers.length === 0 ? (
              <p>Nėra ką pridėti...</p>
            ) : (
              eligableUsers.map(user => (
                <div className="checkboxContainer" key={user._id}>
                  <input type="checkbox" id={user._id} onChange={handleCheckmarkChange} />
                  <label htmlFor={user._id}>
                    <UserWithImage user={user} />
                  </label>
                </div>
              ))
            )}
          </Form>
        </Modal>
      )}

      {exitModalVisible && (
        <Modal header="Palikti kanalą" setShowModal={setExitModalVisible}>
          <Form submitButtonText="Taip" className="Modal__body" onSubmit={handleLeaveSubmit}>
            <p>{`Ar tikrai norite palikti ${channelName} kanalą?`}</p>
          </Form>
        </Modal>
      )}

      {deleteModalVisible && (
        <Modal header="Panaikinti kanalą" setShowModal={setDeleteModalVisible}>
          <Form submitButtonText="Taip" className="Modal__body" onSubmit={handleDeleteSubmit}>
            <p>{`Ar tikrai norite ištrinti ${channelName} kanalą?`}</p>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default ChannelTools;
