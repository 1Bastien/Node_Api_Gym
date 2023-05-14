const { subscriptionCreate, subscriptions, subscriptionUpdate, subscriptionDelete } = require('../controllers/subscription');

function subscriptionRoute(app) {
    // Create
    app.post("/subscriptionCreate", subscriptionCreate);

    // Read
    app.get("/subscriptions", subscriptions);

    // Update
    app.post("/subscriptionUpdate", subscriptionUpdate);

    // Delete
    app.delete("/subscriptionDelete", subscriptionDelete);
}

module.exports = subscriptionRoute;