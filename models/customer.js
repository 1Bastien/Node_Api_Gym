const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    subscritpions: { type: Array, default: [], },
    level: { type: String, default: "deginner" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Customer = new mongoose.model("Customer", CustomerSchema);

module.exports = Customer;