import React, {useState} from 'react';
import "./appStyle.css";
import { useSelector, useDispatch } from 'react-redux'
import {addUser, deleteUser, updateUsername} from './features/Users'


const App = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.usersStr.value);

  const [newName, setNewName] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [editUsername, setEditUsername] = useState("")

  const handleSubmit = (ev) => {
    ev.preventDefault();

    dispatch(addUser({
      id: userList[userList.length - 1].id + 1,
      name: newName,
      username: newUsername,
    }))

    setNewName("");
    setNewUsername("");
  }

  // handleDelete
  const handleDelete = (id) => {
    dispatch(deleteUser({id}))
  }

  // handleUpdate
  // onClick={() => dispatch(updateUsername({id: user.id, username: editUsername}))}
  const handleUpdate = (id, editedUsername) => {
    dispatch(updateUsername({id, username: editedUsername}));

    setEditUsername("");

  }
  
  
  return (
  <div className='App'>
    <form onSubmit={handleSubmit} className='form'>
      <input className='form__input' type="text" placeholder='Your Name' value={newName} onChange={(ev) => setNewName(ev.target.value)}/>
      <input className='form__input' type="text" placeholder='User Name' value={newUsername} onChange={(ev) => setNewUsername(ev.target.value)}/>
      <button className='form__button' type="submit">Add User</button>
    </form>

    <div className="displayUsers">
      {userList.map(user => (
        <div key={user.id} className='displayUsers__box'>
          <h4>name: {user.name}</h4>
          <h4>username: {user.username}</h4>
          <input 
          className='displayUsers__input'
          type="text" 
          placeholder='Edit username'
          value={editUsername}
          onChange={(ev) => setEditUsername(ev.target.value)}
          />
          <div className="displayUsers__buttonCont">
            <button 
              className="displayUsers__button"
              onClick={() => handleUpdate(user.id, editUsername)}
            >
              Update User
            </button>

            <button 
              className="displayUsers__button" 
              onClick={() => handleDelete(user.id)}
            >
              Delete User
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default App;
