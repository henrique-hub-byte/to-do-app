import Modal from './Modal';
import { useState } from 'react';

const ListHeader = ({listName }) => {
  const [showModal, setShowModal] = useState(false)

  const signOut = () => {
    console.log("are are are");
  }

  return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="create" onClick={() => setShowModal(true)} >ADD NEW</button>
          <button className="signout" onClick={signOut}>SING OUT</button>
        </div>
        {showModal &&<Modal mode={'create'} setShowModal={setShowModal}/>}
      </div>
    )   
  }
  
  export default ListHeader;