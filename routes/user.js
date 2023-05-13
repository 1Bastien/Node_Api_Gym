const { userGet, userCreate, userDelete, userUpdate, userLogin } = require("../controllers/user"); 

function userRoute(app){
    // Create
    app.post("/userCreate", userCreate);
    // Read 
    app.get("/users", userGet);
    // Update
    app.post("/userUpdate", userUpdate);
    // Delete
    app.post("/userDelete", userDelete);

    //Login
    app.post("/userLogin", userLogin);
}

module.exports = userRoute;