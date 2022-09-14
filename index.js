import express from 'express'
import mongoose from 'mongoose'
import {registerValidation} from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import {getMe, login, register} from "./controllers/UserController.js";

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
app.post('/auth/login',login)

app.post('/auth/register', registerValidation,register)

app.get('/auth/me',checkAuth,getMe)

//запускаем сервер,
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})
