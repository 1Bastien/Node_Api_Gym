const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    level: { type: String, default: "deginner" },
    
    subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;