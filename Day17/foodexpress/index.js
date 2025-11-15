// MAIN FILE – Combines all user stories
// Simple idea:
// - User gives item + amount
// - Fetch order → Process Payment → Generate Invoice

const fetchOrder = require("./userstory1_fetchOrder");
const processPayment = require("./userstory2_processPayment");
const generateInvoice = require("./userstory3_generateInvoice");

// Read user inputs: item + amount
// Example: node index.js Pizza 250
const itemName = process.argv[2];
const itemAmount = process.argv[3];

console.log("=== FoodExpress Order Processing Started ===");

// Step 1: Fetch Order
fetchOrder(itemName, itemAmount, (err, order) => {

  if (err) {
    console.log("Error:", err.message);
    return;
  }

  console.log("Order Created:", order);

  // Step 2: Payment
  processPayment(order)
    .then(async (paymentInfo) => {

      console.log("Payment Info:", paymentInfo);

      // Step 3: Invoice
      const invoice = await generateInvoice(order, paymentInfo);
      console.log(invoice);

      console.log("=== All Steps Completed ===");
    });
});
