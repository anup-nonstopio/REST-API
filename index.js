const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/REST-API")
    .then(() => console.log('Connected to MongoDB :)'))
    .catch((err) => console.log("MongoDB connection error: ", err));

//Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    }
}, { timestamps: true });

//Model
const User = mongoose.model('user', userSchema);

const app = express()
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile('logs.txt', `${req.method} ${req.url} ${new Date()}\n`, (err) => {
        if(err) {
            console.log(err);
        }
    })
    next();
})

//routes
app.route('/api/users')
    .post(async (req, res) => {
        const body = req.body;
        if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            job_title: body.job_title,
            gender: body.gender
        })

        console.log("User: ", user);
        return res.status(201).json({ message: 'User created successfully' });
    })
    .get((req, res) => { 
        return res.json(users);
    })

/*
app.post('/api/users', (req, res) => {
    const body = req.body;
    console.log("Body" ,body);
    return res.json({ status: 'pending' }); 
})

app.get('/api/users', (req, res) => {     //for client side rendering
    return res.json(users);
})
*/

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id); // id in params is a string
        const user = users.find((user) => user.id === id); 
        return res.json(user);
    })
    .patch((req, res) => {
        //TODO: Edit the user with ID = id
        return res.json({ status: 'pending' });
    })
    .delete((req, res) => {
        //TODO: Delete the user with ID = id
        return res.json({ status: 'pending' });
    })

//all three req has same route
/*
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id); // id in params is a string
    const user = users.find((user) => user.id === id); 
    return res.json(user);
})

app.patch('/api/users/:id', (req, res) => {
    //TODO: Edit the user with ID = id
    return res.json({ status: 'pending' });
})

app.delete('/api/users/:id', (req, res) => {
    //TODO: Delete the user with ID = id
    return res.json({ status: 'pending' });
})
*/

app.get('/users', (req, res) => {         //for server side rendering
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `

    return res.send(html);
})

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))