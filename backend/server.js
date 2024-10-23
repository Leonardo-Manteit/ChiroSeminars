const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

const authRouter = require('./routes/auth_router');
const seminarRouter = require('./routes/seminar_router');
const userRouter = require('./routes/user_router');
const errorHandler = require('./middlewares/error_hander');
const expressListRoutes = require('express-list-routes');


app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

app.use('/', express.static('./public/dist'));
app.use(express.json());

app.use(authRouter)
app.use(seminarRouter)
app.use(userRouter)
app.use(errorHandler)
expressListRoutes(app)

app.listen(port, ()=>{
    console.log('server listeneing on port', port)
})