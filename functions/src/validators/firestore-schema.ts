import { body, param } from 'express-validator';


export const userSchema = [
    body('firstName')
    .exists({ checkFalsy: true }).withMessage("Missing field: firstName"),
    body('lastName')
    .exists({ checkFalsy: true }).withMessage("Missing field: lastName")
];

export const userParam = [
    param("id")
    .exists({ checkFalsy: true }).withMessage("Missing parameter: id")
];