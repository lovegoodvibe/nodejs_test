import express from 'express';
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web"
import initAPIRoute from "./route/api"
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    console.log('check middleware',req.method);
    next();
})
configViewEngine(app)
initWebRoute(app)
initAPIRoute(app)
app.use((req, res) => {
    return res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})