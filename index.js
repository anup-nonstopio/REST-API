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

app.listen(PORT, () => console.log(`Server started at ${PORT}`))