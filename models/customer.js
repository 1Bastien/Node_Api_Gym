const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    level: { type: String, default: "deginner" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;