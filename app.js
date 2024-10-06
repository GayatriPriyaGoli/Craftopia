const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Path to users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Function to read users from the JSON file
function readUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading users file:', err);
        return { customers: [], sellers: [] }; // Return empty arrays if file read fails
    }
}

// Function to write users to the JSON file
function writeUsers(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing to users file:', err);
    }
}

// Check if user exists
function doesUserExist(role, username, users) {
    return role === 'customer'
        ? users.customers.some(user => user.username === username)
        : users.sellers.some(user => user.username === username);
}

// Login endpoint
app.post('/login', (req, res) => {
    const { role, username, password } = req.body; // Include password in the request
    const users = readUsers();
    let foundUser = null;

    if (role === 'customer') {
        foundUser = users.customers.find(user => user.username === username && user.password === password);
    } else if (role === 'seller') {
        foundUser = users.sellers.find(user => user.username === username && user.password === password);
    }

    if (foundUser) {
        res.json({ success: true, user: foundUser });
    } else {
        res.json({ success: false, message: 'Invalid username or password.' });
    }
});


// Register endpoint
app.post('/register', (req, res) => {
    const { username, password, role, email } = req.body;
    const users = readUsers();

    // Check if the user already exists
    if (doesUserExist(role, username, users)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Add new user to the appropriate array
    const newUser = { username, password, email }; // Include email in the new user object
    if (role === 'customer') {
        users.customers.push(newUser);
    } else if (role === 'seller') {
        users.sellers.push(newUser);
    } else {
        return res.status(400).json({ success: false, message: 'Invalid role specified.' });
    }

    // Write the updated users to users.json
    writeUsers(users);
    res.json({ success: true, message: 'User registered successfully' });
});
