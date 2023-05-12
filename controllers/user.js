async function userGet(req, res) {
    try {
        const User = req.app.get("models").User;
        const MyUsers = await User.find();
        res.json(MyUsers);
    } catch (error) {
        return error.message;
    }
};

async function userCreate(req, res) {
    try {
        const User = req.app.get("models").User;
        const NewUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
        }).save();
        res.json(NewUser);
    } catch (error) {
        res.json(error.message);
    }
};

async function userDelete(req, res) {
    try {
        if (!req.body._id) {
            return res.json("_id manquant");
        }
        const User = req.app.get("models").User;
        const ToDeleteUser = await User.findById(req.body._id);
        await ToDeleteUser.remove();
        res.json("supp");
    } catch (error) {
        res.json(error.message);
    }
};

module.exports = { userGet, userCreate, userDelete };