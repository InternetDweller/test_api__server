const express = require('express');
const users = require('./data/users.json');
const functions = require('./functions');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

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

// Get all sightings of a user
app.get('/api/v1/users/:userId/sightings', (req, res) => {
    const userId = Number(req.params.userId);
    const allSightings = functions.loadFromFile('./data/sightings.json');
    const sightings = allSightings.filter(el => el.owner === userId);
    return res.status(200).json( sightings );
});

// Create a sighting
app.post('/api/v1/users/:userId/sightings', (req, res) => {
    // Get user ID from params
    let owner = Number(req.params.userId);

    // Get data from request
    const { birdName, dateTime, location, notes } = req.body;
    const id = functions.generateNewId();
    const tmpSighting = { id, owner, birdName, dateTime, location, notes };

    // Read file with all sightings
    const allSightings = functions.loadFromFile('./data/sightings.json');

    // Add new sighting to array
    allSightings.push(tmpSighting);

    // Rewrite the file
    functions.writeToFile('./data/sightings.json', allSightings);

    // Return code OK (body is REQUIRED)
    return res.status(200).json({ success: true });
});

// Edit a sighting
app.put('/api/v1/users/:userId/sightings/:id', (req, res) => {
    // Get user ID and sighting ID from params
    const userId = Number(req.params.userId);
    const id = req.params.id;

    // Get data from request body
    const { birdName, dateTime, location, notes } = req.body;

    // Read file with all sightings
    const allSightings = functions.loadFromFile('./data/sightings.json');

    // Find the sighting by userId and id
    const currentSighting = allSightings.find(el => el.owner === userId && el.id === id);

    // Set new values
    currentSighting.birdName = birdName;
    currentSighting.dateTime = dateTime;
    currentSighting.location = location;
    currentSighting.notes = notes;

    // Rewrite the file
    functions.writeToFile('./data/sightings.json', allSightings);

    // Return code OK (body is REQUIRED)
    return res.status(200).json({ success: true });
});

// Delete a sighting
app.delete('/api/v1/users/:userId/sightings/:id', (req, res) => {
    // Get user ID and sighting ID from params
    const userId = Number(req.params.userId);
    const id = req.params.id;

    // Read file with all sightings
    const allSightings = functions.loadFromFile('./data/sightings.json');

    // Find the sighting by userId and id
    const currentSighting = allSightings.find(el => el.owner === userId && el.id === id);

    // Remove the sighting
    const index = allSightings.indexOf(currentSighting);
    if (index > -1) allSightings.splice(index, 1);

    // Rewrite the file
    functions.writeToFile('./data/sightings.json', allSightings);

    // Return code Success No Resource
    return res.status(204).json({});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));