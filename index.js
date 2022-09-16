import express from 'express'
import mongoose from 'mongoose'
import {registerValidation,loginValidation} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from './controllers/PostController.js'
//подключаем базу мангусе
mongoose.connect('mongodb+srv://admin:25522552@cluster0.2htwtwo.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB ok')
    })
    .catch((err) => console.log('DB error', err))

const app = express()

//учим экспресс понимать json
app.use(express.json())

//authorized
app.post('/auth/login',loginValidation,UserController.login)

app.post('/auth/register', registerValidation,UserController.register)

app.get('/auth/me',checkAuth,getMe)

// app.get('/posts',PostController,getAll)
app.get('/posts',UserController,getMe)
app.get('/posts',UserController,getMe)
app.get('/posts',UserController,getMe)
app.get('/posts',UserController,getMe)

//запускаем сервер,
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
