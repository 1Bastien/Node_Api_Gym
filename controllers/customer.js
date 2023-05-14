const encryptPassword = require('../utils/encryptPassword');

async function customerCreate(req, res) {
    if (!req.body.password) {
        return res.json("Pas de mot de passe");
    }

    if (req.role !== "manager") {
        return res.json("Accès refusé");
    }

    const { token, salt, hash } = encryptPassword(req.body.password);
    const models = req.app.get("models");
    const NewUser = await new models.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        token,
        salt,
        hash
    }).save();
    const newCustomer = await new models.Customer({ user: NewUser._id }).save();

    return res.json(newCustomer);
};

async function customers(req, res) {
    const Customer = req.app.get("models").Customer;
    const CustomerList = await Customer.find().populate("user").populate("subscriptions");

    res.json(CustomerList);
}

async function customerUpdate(req, res) {
    if (req.role !== "manager") {
        return res.json("Accès refusé");
    }

    try {
        if (!req.body._id) {
            return res.json("_id manquant");
        }

        const Customer = req.app.get("models").Customer;
        let toModifyCustomer = await Customer.findById(req.body._id);
        if (!toModifyCustomer) {
            return res.json('customer not found')
        }

        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            toModifyCustomer[key] = req.body.toModify[key];
        }
        await toModifyCustomer.save();

        res.json(toModifyCustomer);
    } catch (error) {
        return res.json(error.message);
    }
};

async function customerDelete(req, res) {
    if (req.role !== "manager") {
        return res.json("Accès refusé");
    }

    if (!req.body._id) {
        return res.json("_id manquant");
    }

    const Customer = req.app.get("models").Customer;
    const User = req.app.get("models").User;

    let toDeleteCustomer = await Customer.findById(req.body._id);
    if (!toDeleteCustomer) {
        return res.json('Customer not found');
    }
    
    await Customer.findByIdAndRemove(req.body._id);
    await User.findByIdAndRemove(toDeleteCustomer.user);

    res.json("Utilisateur supprimé");
};

module.exports = { customerCreate, customers, customerDelete, customerUpdate };