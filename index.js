const express = require('express');
const mongoose = require("mongoose");

const models = require('./models');
const getRoleMiddleware = require('./utils/getRoleMiddleware');

mongoose.connect("mongodb://localhost/sportCenters", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.set("models", models);

const userRoute = require("./routes/user");
const customerRoute = require("./routes/customer");
const coachRoute = require("./routes/coach");
const subscriptionRoute = require('./routes/subscription');
const slotRoute = require("./routes/slot");

app.use(express.json());
app.use(getRoleMiddleware);

userRoute(app);
customerRoute(app);
coachRoute(app);
subscriptionRoute(app);
slotRoute(app);

app.listen(3000, ()=> {
    console.log("serveur ok")
});