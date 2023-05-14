const { slotCreate, slots, slotUpdate, slotDelete, slotBook } = require('../controllers/slot');

function slotRoute(app) {
    // Create
    app.post("/slotCreate", slotCreate);

    // Read
    app.get("/slots", slots);

    // Update
    app.post("/slotUpdate", slotUpdate);

    // Delete
    app.delete("/slotDelete", slotDelete);

    //
    app.post("/slotBook", slotBook);
}

module.exports = slotRoute;