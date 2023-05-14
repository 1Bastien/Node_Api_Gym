const encryptPassword = require('../utils/encryptPassword');

async function coachCreate(req, res) {
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
    const newCoach = await new models.Coach({ user: NewUser._id }).save();

    return res.json(newCoach);
};

async function coaches(req, res) {
    const Coach = req.app.get("models").Coach;
    const CoachesList = await Coach.find().populate("user");

    res.json(CoachesList);
}

async function coachUpdate(req, res) {
    if (req.role !== "manager") {
        return res.json("Accès refusé");
    }

    try {
        if (!req.body._id) {
            return res.json("_id manquant");
        }

        const Coach = req.app.get("models").Coach;
        let toModifyCoach = await Coach.findById(req.body._id);
        if (!toModifyCoach) {
            return res.json('coach not found')
        }

        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            toModifyCoach[key] = req.body.toModify[key];
        }
        await toModifyCoach.save();

        res.json(toModifyCoach);
    } catch (error) {
        return res.json(error.message);
    }
};

async function coachDelete(req, res) {
    if (req.role !== "manager") {
        return res.json("Accès refusé");
    }

    if (!req.body._id) {
        return res.json("_id manquant");
    }

    const Coach = req.app.get("models").Coach;

    let toDeleteCoach = await Coach.findById(req.body._id);
    if (!toDeleteCoach) {
        return res.json('Coach not found');
    }
    let toDeleteUser = await models.User.findById(toDeleteCoach.user);

    await toDeleteUser.deleteOne();
    await toDeleteCoach.deleteOne();

    res.json("Utilisateur supprimé");
};

module.exports = { coachCreate, coachDelete, coachUpdate, coaches };