function customerRoute(app) {
    app.post("/customerCreate", async (req, res) => {
        const models = req.app.get("models");
        const NewUser = await new models.User({
            firstName: "test",
            lastName: "test",
            dateOfBirth: new Date(),
            token: "",
            salt: "",
            hash: "",
        }).save();
        const newCustomer = await new models.Customer({user: NewUser._id}).save();
        return res.json(newCustomer);
    })
}

module.exports = customerRoute;