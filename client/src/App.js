import ListHeader from "./components/ListHeader";
import { useEffect } from 'react';

const App = () => {
  const getData = async () => {
    const userEmail = 'luis@gmail.com'
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      console.log(json)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getData, []);

  return (
    <div className="app">
      <ListHeader listName={'👺 holiday tick list'} />
    </div>
  )
}

export default App;