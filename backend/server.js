const express = require('express')
const app = express()
const port = 8000
// const authRouter = require('./routes/auth_router')
// const errorHandler = require('./middlewares/error_handler')
const expressListRoutes = require('express-list-routes')


app.use('/', express.static('./public/dist'))

app.use(express.json())
// app.use(authRouter)
// app.use(errorHandler)
expressListRoutes(app)

app.listen(port, ()=>{
    console.log('server listeneing on port', port)
})