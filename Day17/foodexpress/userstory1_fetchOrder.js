// USER STORY 1 – Get order using CALLBACKS
// Simple idea:
// - User gives item name (ex: "Pizza")
// - User gives amount (ex: "250")
// - We create a random order ID
// - We return the order details after 1 second

function fetchOrder(itemName, amount, callback) {

  // Wait 1 second to simulate delay
  setTimeout(() => {

    // If item missing → error
    if (!itemName) {
      return callback(new Error("No item provided"), null);
    }

    // If amount missing → error
    if (!amount) {
      return callback(new Error("No amount provided"), null);
    }

    // Create the order
    const order = {
      id: Math.floor(Math.random() * 9000) + 1000,  // random ID
      item: itemName,                               // item from user
      amount: Number(amount)                        // amount from user
    };

    // Send back order
    callback(null, order);

  }, 1000);
}

module.exports = fetchOrder;


//Goal:
//We want to get an order from a mock database using a callback function.

//Why callbacks?
//Callbacks were the earliest method in Node.js to handle asynchronous tasks.
