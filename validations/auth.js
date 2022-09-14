import {body} from "express-validator";

export const registerValidation=[
    body('email','Wrong email format').isEmail(),
    body('password','Password must be min 5 symbols').isLength({min:5}),
    body('fullName','Enter your name').isLength({min:3}),
    body('avatarUrl','Incorrect avatar url').optional().isURL()

]