import { validate } from 'class-validator';
export function validator(DataTransferObject) {
    return async function (req, res, next) {
        const errors = await validate(Object.assign(new DataTransferObject(), req.body));
        if (errors.length > 0) {
            return res.status(422).json({ "message": errors[0].constraints });
        }
        else {
            next();
        }
    };
}
//# sourceMappingURL=validator.js.map