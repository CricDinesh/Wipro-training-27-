// USER STORY 2 – Process payment using PROMISES
// Simple idea:
// - Take the user-given amount
// - After 1 second, return "Payment Successful"

function processPayment(order) {
  return new Promise((resolve) => {

    setTimeout(() => {

      resolve({
        message: "Payment Successful",
        paidAmount: order.amount
      });

    }, 1000);
  });
}

module.exports = processPayment;

//Goal:
//We want to process the customer’s payment, but now using Promises instead of callbacks.

//Why Promises?
//Promises make asynchronous code cleaner and avoid “callback hell".