async function subscriptions(req, res) {
    const subscription = req.app.get('models').Subscription;
    const subscriptionList = await subscription.find();

    res.json(subscriptionList);
}

async function subscriptionCreate(req, res) {
    if (req.role !== "manager") {
        return res.json("unauthorized");
    }

    const models = req.app.get('models');
    const newSubscription = await new models.Subscription({
        beginningDate: req.body.beginningDate,
        endDate: req.body.endDate,
        paymentMethod: req.body.paymentMethod,
        amountPaid: req.body.amountPaid,
        customer: req.body.customer
    }).save();

    let theCustomer = await models.Customer.findById(req.body.customer);
    theCustomer.subscriptions.push(newSubscription._id);
    await theCustomer.save();

    return res.json(newSubscription);
}

async function subscriptionUpdate(req, res) {
    if (req.role !== "manager") {
        return res.json("unauthorized");
    }

    try {
        if (!req.body._id) {
            return res.json("No _id provided");
        }

        const Subscription = req.app.get("models").Subscription;

        let toModifySubscription = await Subscription.findById(req.body._id);
        if (!toModifySubscription) {
            return res.json("Subscription not found");
        }

        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            toModifySubscription[key] = req.body.toModify[key];
        }
        await toModifySubscription.save();

        res.json(toModifySubscription);
    } catch (error) {
        return res.json(error.message);
    }
}

async function subscriptionDelete(req, res) {
    if (req.role !== "manager") {
        return res.json("unautorized");
    }

    if (!req.body._id) {
        return res.json("No _id provided");
    }

    const Subscription = req.app.get('models').Subscription;

    let toDeleteSubscription = await Subscription.findById(req.body._id);

    if (!toDeleteSubscription) {
        return res.json("Subscription not found");
    }

    let theCustomer = await models.Customer.findById(toDeleteSubscription.customer);
    let toDeleteIndex = theCustomer.subscriptions.indexof(toDeleteSubscription._id);
    theCustomer.subscriptions.splice(toDeleteIndex, 1);
    await theCustomer.save();

    await Subscription.findByIdAndRemove(req.body._id);

    res.json("Supprimé");
}

module.exports = {subscriptions, subscriptionCreate, subscriptionDelete, subscriptionUpdate}