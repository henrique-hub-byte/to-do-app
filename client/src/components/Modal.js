import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({mode, setShowModal, getData, task}) => {
  //const mode = 'create'
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false  
 
  const [data , setData] = useState({
    
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date()
  }) 
  console.log("aquiii")
  const postData = async (e) => {
    e.preventDefault()
    try {
      console.log({aqui:data})
      const response = await fetch(`http://localhost:8000/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if(response.status === 200) {
        console.log('WORKED')
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.log(err)
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)  
      })
     if(response.status === 200 ){
      setShowModal(false)
      getData()
     } 
    } catch(err) {
      console.log(err)
    } 
  }


  const handleChange = (e) => {
   // console.log('changing!', e)
    const {name, value} = e.target

  /*   console.log({"input alvo":e.target})
    data[name] = value
    console.log({data})
    const newValue = {}
    newValue[name] = value */

    setData(data => ({
      ...data,
      [name]: value
      /* ...newValue */
    })) 

    console.log('********')
     console.log(data)
     console.log('********')
  }

  return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3> Let's {mode} you task</h3>
            <button onClick={() => setShowModal(false)} >X</button>
          </div>

          <form>
            <input 
            required 
            maxLength={30} 
            placeholder=" Your task goes here "
            name="title" 
            value={data.title} 
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
            value={data.progress}
            onChange={handleChange}
            />
           
            <input className={mode} type="submit" onClick={editMode ? editData : postData}></input>

          </form>
        </div>
      </div>
    )
  }
  
  export default Modal;