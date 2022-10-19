import express from "express";
import APIController from "../controller/APIControler"
let router = express.Router();
const initAPIRoute = (app) => {
    router.get('/user', APIController.getAllUsers);
    router.post('/create-user', APIController.createUser);
    router.put('/update-user/:id', APIController.updateUser);
    router.delete('/delete-user', APIController.deleteUser);
    return app.use('/api/v1', router)
};
export default initAPIRoute;