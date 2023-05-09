import express from 'express';
import pool from '../server/db.js';
import cors from 'cors';


const PORT = process.env.PORT ?? 8000;
const app = express();
app.use(cors())

app.get('/todos/:userEmail', async (req, res) => {
   
    const { userEmail } = req.params;
    
    try {
    //const todos = await pool.query('SELECT * FROM todos where user_email = $1', [userEmail])
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = ?', [userEmail])

    res.setHeader('Content-Type', 'application/json');

    //console.log('----------');
    //console.log(todos[0]);
    res.json(todos.row)
  } catch(err) {
    console.log(err)
  } 
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
