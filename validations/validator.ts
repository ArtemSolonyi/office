import {validate, ValidationError} from 'class-validator'

import {Request, Response, NextFunction} from 'express'


export function validator(DataTransferObject: any) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const errors: ValidationError[] = await validate(Object.assign(new DataTransferObject(), req.body))
        if (errors.length > 0) {
            return res.status(422).json({"message": errors[0].constraints})
        } else {
            next()
        }

    }
}