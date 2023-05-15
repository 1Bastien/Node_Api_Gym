async function slots(req, res) {
    const Slot = req.app.get('models').Slot;
    const slotList = await Slot.find();

    res.json(slotList);
}

async function slotCreate(req, res) {
    if (req.role !== "coach") {
        return res.json("unauthorized");
    }

    const models = req.app.get('models');
    const newSlot = await new models.Slot({
        date: req.body.date,
        startHour: req.body.startHour,
        endHour: req.body.endHour,
        label: req.body.label,
        peopleLimit: req.body.peopleLimit,
        coach: req.body.coach,
        customers: []
    }).save();

    let theCoach = await models.Coach.findById(req.body.coach);
    theCoach.slots.push(newSlot._id);
    await theCoach.save();

    return res.json(newSlot);
}

async function slotUpdate(req, res) {
    if (req.role !== "coach") {
        return res.json("unauthorized");
    }

    try {
        if (!req.body._id) {
            return res.json("No _id provided");
        }

        const Slot = req.app.get("models").Slot;

        let toModifySlot = await Slot.findById(req.body._id);
        if (!toModifySlot) {
            return res.json("Slot not found");
        }

        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            toModifySlot[key] = req.body.toModify[key];
        }
        await toModifySlot.save();

        res.json(toModifySlot);
    } catch (error) {
        return res.json(error.message);
    }
}

async function slotDelete(req, res) {
    if (req.role !== "manager") {
        return res.json("unautorized");
    }

    if (!req.body._id) {
        return res.json("No _id provided");
    }

    const Slot = req.app.get('models').Slot;

    let toDeleteSlot = await Slot.findById(req.body._id);

    if (!toDeleteSlot) {
        return res.json("Slot not found");
    }

    for (const customer of toDeleteSlot.customers) {
        let theCustomer = await models.Customer.findById(customer);
        let toDeleteIndex = theCustomer.slots.indexof(toDeleteSlot._id);
        theCustomer.slots.splice(toDeleteIndex, 1);
        await theCustomer.save();
    }

    let theCoach = models.Coach.findById(toDeleteSlot.coach);
    let toDeleteIndex = theCoach.slots.indexof(toDeleteSlot._id);
    theCoach.slots.splice(toDeleteIndex, 1);
    await theCoach.save();

    await Slot.findByIdAndRemove(req.body._id);

    res.json("Supprimé");
}

async function slotBook(req, res) {
    if (req.role !== "customer") {
        return res.json("unauthorized");
    }

    const models = req.app.get("models");
    const theSlot = await models.Slot.findById(req.body.slot);

    if (theSlot.customers.length >= theSlot.peopleLimit) {
        return "No spot left for this slot"
    }

    const theCustomer = await models.Customer.findById(req.body.customer).populate("subscriptions");
    let isSubscribed = false;
    if (subscription.beginninDate <= theSlot.Date &&
        subscription.endDate >= theSlot.date
    ) {
        isSubscribed = true;
    }

    if (isSubscribed) {
        theSlot.customers.push(theCustomer._id);
        await theSlot.save();
        theCustomer.slots.push(theSlot._id);
        await theCustomer.save();

        return res.json("Success");
    } else {
        return res.json("No subscription for the slot date");
    }
}

module.exports = { slots, slotCreate, slotDelete, slotUpdate, slotBook }