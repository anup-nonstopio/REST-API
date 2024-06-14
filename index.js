const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express()
const PORT = 8000;

//routes
app.get('/api/users', (req, res) => {     //for client side rendering
    return res.json(users);
})

app.get('/users', (req, res) => {         //for server side rendering
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `

    return res.send(html);
})

app.post('/api/users', (req, res) => {
    //TODO: Create a new user
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

app.listen(PORT, () => console.log(`Server started at ${PORT}`))