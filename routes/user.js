const { userGet, userCreate, userDelete } = require("../controllers/user"); 

function userRoute(app){
    // Update
    // Delete
    app.post("/userDelete", userDelete);
    // Create
    app.post("/userCreate", userCreate);
    // Read 
    app.get("/user", userGet);
}

module.exports = userRoute;