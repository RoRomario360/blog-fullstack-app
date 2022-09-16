import {body} from "express-validator";

export const loginValidation=[
    body('email','Wrong email format').isEmail(),
    body('password','Password must be min 5 symbols').isLength({min:5}),
]

export const registerValidation=[
    body('email','Wrong email format').isEmail(),
    body('password','Password must be min 5 symbols').isLength({min:5}),
    body('fullName','Enter your name').isLength({min:3}),
    body('avatarUrl','Incorrect avatar url').optional().isURL()
]

export const postCreateValidation=[
    body('title','Enter a header of your post').isLength({min:3}).isString(),
    body('text','Enter your text').isLength({min:3}).isString(),
    body('tags','Wrong format of tags (enter an array)').optional().isString(),
    body('avatarUrl','Incorrect image url').optional().isString()
]
