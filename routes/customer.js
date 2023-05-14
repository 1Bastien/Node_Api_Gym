const { customerCreate, customers, customerUpdate, customerDelete } = require('../controllers/customer');

function customerRoute(app) {
    // Create
    app.post("/customerCreate", customerCreate);

    // Read
    app.get("/customers", customers);

    // Update
    app.post("/customerUpdate", customerUpdate);

    // Delete
    app.delete("/customerDelete", customerDelete);
}

module.exports = customerRoute;