import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../server/db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT ?? 8000;
const app = express();
app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail', async (req, res) => {
   
    const { userEmail } = req.params;
    /* console.log('++++++++++++++++++');
    console.log(req.params);
    console.log('++++++++++++++++++'); */
    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = ?', userEmail)
        res.setHeader('Content-Type', 'application/json');
        /* console.log('***************');
        console.log(todos);
        console.log('***************'); */
        //res.json(todos.rows); outra forma de trazer o resultado, objeto
        res.json(todos[0]);
    } catch(err) {
        console.log(err);
    } 
});

app.post("/todos", async (req, res) => {
    const { user_email, title, progress, date} = req.body
   /*  console.log("body", {body:req.body})
    console.log("rota do post pt br")*/
    console.log(user_email, title, progress, date) 
    const id = uuidv4() 
    
    try {
        const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date ) VALUES (?, ? , ? , ? , ?)`,
        [id, user_email,title, progress,date])
        console.log('+++++++------+++++++')
        console.log(newTodo)
        console.log('++++++-----++++++')
        res.json(newTodo);
    }catch(err) {
        console.log(err)
    }
})

//edit a new todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const {user_email, title, progress, date} = req.body
    try{
        const editToDo = await pool.query('UPDATE todos SET user_email = ?, title = ?, progress = ?, date = ? WHERE id = ?',
        [user_email, title, progress, date, id])
        res.json(editToDo)
    } catch (err) {
        console.log(err)
    }
} )

//delete todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = ?;', [id])
        res.json(deleteToDo)
    } catch(err) {
        console.log(err)
    }
})

/* sign up */
app.post('/signup', async (req, res ) => {
    const {  email, password } = req.body
    const salt = bcrypt.genSaltSync(10) 
    const hashed_password = bcrypt.hashSync(password,salt)
    try {
        const signUp = await pool.query('INSERT INTO users (email, hashed_passoword) VALUES (? , ?)', 
        [email, hashed_password])

        const token = jwt.sign({email} , 'secret', {expiresIn: '1hr'})
        console.log('luisluisluisluis');
        console.log(email, token);
        res.json({ email, token })
    } catch(err) {
        console.log(err)
        if(err) {
            res.json({detail: err.details})
        }
    }
})
/* logn */
app.post('/login', async (req, res) => {
    const [email, password] = req.body
    try {

    } catch(err) {
        console.log(err)
    }
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
