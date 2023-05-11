import { useState } from "react"

const Modal = () => {
  const mode = 'create'
  const editMode = mode === 'edit' ? true : false  
 
  const [data , setData] = useState({
    user_email: "",
    title: "",
    progess: "",
    date: editMode ? "" : new Date()
  }) 


  const handleChange = (e) => {
    console.log('change', e)
  }

  return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3> Let's {mode} you task</h3>
            <button>X</button>
          </div>

          <form>
            <input 
            required 
            maxLength={30} 
            placeholder=" Your task goes here "
            name="title" 
            value={""} 
            onChange={handleChange}/>
            
            <br/>
            <label for="range">Drag to select your current progress</label>
            <input 
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={""}
            onChange={handleChange}
            />
            <input className={mode} type="submit"></input>

          </form>
        </div>
      </div>
    )
  }
  
  export default Modal;