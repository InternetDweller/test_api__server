const express = require('express');
const users = require('./data/users.json')

const PORT = process.env.PORT || 3000;

/*const values = [
    {
        id: 1,
        name: "melons"
    },
    {
        id: 2,
        name: "apples"
    },
    {
        id: 3,
        name: "strawberries"
    }
];*/

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

/*app.get('/api/v1/items', (req, res) => {
    res.send(values);
});

app.get('/api/v1/items/:id', (req, res) => {
    const currentId = Number(req.params.id);
    const itemById = values.find(el => el.id === currentId);
    res.send(itemById.name);
});*/

// Login
app.post('/api/v1/users', (req, res) => {
    if (!req.body) { return res.sendStatus(400); };
    const { username, password } = req.body;

    const user = users.find(el => el.username === username && el.password === password);
    if (user) {
        return res.status(200).json({ success: true, message: "User found", userId: user.id });
    } else {
        return res.status(200).json({ success: false, message: "User not found", userId: 0 });
    };
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));