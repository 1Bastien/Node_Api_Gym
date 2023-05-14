const { coachCreate, coachUpdate, coachDelete, coaches } = require('../controllers/coach');

function coachRoute(app) {
    // Create
    app.post("/coachCreate", coachCreate);

    // Read
    app.get("/coaches", coaches);

    // Update
    app.post("/coachUpdate", coachUpdate);

    // Delete
    app.delete("/coachDelete", coachDelete);
}

module.exports = coachRoute;