import express from 'express';
import multer from 'multer'
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from "./validations/validation.js";
import {checkAuth,handleValidationErrors} from './utils/index.js'
import {PostController,UserController} from './controllers/index.js'


mongoose.connect('mongodb+srv://nodeAdmin:wwwwww@cluster0.e3vbbqh.mongodb.net/blog?retryWrites=true&w=majority').then(() => console.log('DB OK'))
    .catch((err) => console.log('DB Error', err));

const app = express();

const storage=multer.diskStorage({
    destination:(_, __, cb)=>{
      cb(null,'upload')
    },
    filename:(_, file, cb)=>{
        cb(null,file.originalname)
    },
})
const upload=multer({storage})

app.use(express.json());
app.use('/uploads',express.static('uploads'))
//User
app.post('auth/login',loginValidation,handleValidationErrors,UserController.login)
app.post('/auth/register', registerValidation,handleValidationErrors,UserController.register );
app.get('/auth/me',checkAuth,UserController.getMe );

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})
//Posts
app.get('/posts',PostController.getAll)
app.get('/posts:id',PostController.getOne)
app.post('/posts',checkAuth,postCreateValidation,handleValidationErrors,PostController.create)
app.delete('/posts/:id',checkAuth,PostController.remove)
app.path('/posts/:id',checkAuth,postCreateValidation,handleValidationErrors,PostController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
})
