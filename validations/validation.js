import {body} from 'express-validator'

export const loginValidation=[
    body('email','Invalid email format').isEmail(),
    body('password','Password need include minimum 5 symbols').isLength({min:5}),

];

export const registerValidation=[
    body('email','Invalid email format').isEmail(),
    body('password','Password need include minimum 5 symbols').isLength({min:5}),
    body('fullName','Please enter your name').isLength({min:3}),
    body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

export const postCreateValidation=[
    body('title','Enter article name').isLength({min:3}).isString(),
    body('text','Enter article text').isLength({min:3}).isString(),
    body('tags','Incorrect tags format (enter array)').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];
