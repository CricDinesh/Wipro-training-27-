// USER STORY 3 – Generate invoice using ASYNC/AWAIT
// Simple idea:
// - Create a nicely formatted invoice after 1 second

async function generateInvoice(order, payment) {
  return new Promise((resolve) => {

    setTimeout(() => {

      const invoice = `
----- INVOICE -----
Order ID : ${order.id}
Item     : ${order.item}
Amount   : ₹${order.amount}
Paid     : ₹${payment.paidAmount}
Status   : ${payment.message}
-------------------
`;

      resolve(invoice);

    }, 1000);
  });
}

module.exports = generateInvoice;

//Goal:
//We want to generate an invoice after the payment is processed.
//Why Async/Await?
//It looks like normal synchronous code but works asynchronously.
//It is very clean and easy to read.