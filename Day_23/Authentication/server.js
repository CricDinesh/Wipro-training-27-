// in this file we will create a server using express framework along with routes and passport based authentication
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = 3000;

// parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// session configuration
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Dummy user data
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Passport Local Strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        const user = users.find(
            u => u.username === username && u.password === password
        );
        if (user) return done(null, user);
        return done(null, false, { message: 'Incorrect username or password.' });
    })
);

// serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});


// AUTH MIDDLEWARE
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}


// ROUTES


// Home page (Public)
app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href="/login">Login</a>
    `);
});

// Login page
app.get('/login', (req, res) => {
    res.send(`
        <h1>Login Page</h1>
        <form method="post" action="/login">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});

// Handle login
app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/protected');
    }
);


// PROTECTED ROUTE

app.get('/protected', isAuthenticated, (req, res) => {
    res.send(`
        <h1>Protected Page</h1>
        <p>Welcome ${req.user.username}!</p>
        <a href="/logout">Logout</a>
    `);
});


// LOGOUT

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);

        req.session.destroy(() => {
            res.redirect('/login');
        });
    });
});

// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Above code can be implemented susing below steps :
// 1. Set up an Express server.
// 2. Configure body-parser to parse form data.
// 3. Set up express-session for session management.    
// 4. Configure Passport.js with a local strategy for username-password authentication.
// 5. Create routes for login, logout, and a protected home page.
// 6. Use middleware to protect routes that require authentication.
// 7. Start the server and listen on a specified port.