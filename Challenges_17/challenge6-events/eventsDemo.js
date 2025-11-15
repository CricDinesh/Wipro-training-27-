/**
 * Challenge 6 - EventEmitter Usage
 * Goal: Simulate a simple notification system using custom events.
 */

const EventEmitter = require("events");

// Creating an event emitter object
const eventSystem = new EventEmitter();

// Listener for user login
eventSystem.on("userLoggedIn", (user) => {
  console.log(`User ${user} logged in.`);
});

// Listener for user logout
eventSystem.on("userLoggedOut", (user) => {
  console.log(`User ${user} logged out.`);
});

// Bonus: listener for session expiry
eventSystem.on("sessionExpired", (user) => {
  console.log(`Session expired for ${user}.`);
});

// Emit the events
eventSystem.emit("userLoggedIn", "John");

eventSystem.emit("userLoggedOut", "John");

// Bonus: emit sessionExpired after 5 seconds
setTimeout(() => {
  eventSystem.emit("sessionExpired", "John");
}, 5000);
