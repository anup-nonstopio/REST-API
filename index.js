const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');

const app = express()
const PORT = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

//routes
app.route('/api/users')
    .post((req, res) => {
        const body = req.body;
        users.push({...body, id: users.length + 1});

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if(err) {
                return res.json({ status: 'failed' });
            }
            return res.json({ status: 'success', id: users.length});
        })
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

app.listen(PORT, () => console.log(`Server started at ${PORT}`))