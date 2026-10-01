import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export interface ValidationError {
    field: string;
    message: string;
}

export class ValidationException extends Error {
    public readonly errors: ValidationError[];
    public readonly statusCode: number;

    constructor(errors: ValidationError[]) {
        super('Validation failed');
        this.name = 'ValidationException';
        this.errors = errors;
        this.statusCode = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const validate = (validations: ValidationChain[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
            return;
        }

        const formattedErrors: ValidationError[] = errors.array().map(err => {
            if ('path' in err && 'msg' in err) {
                return {
                    field: err.path,
                    message: err.msg
                };
            }
            return {
                field: 'unknown',
                message: String(err)
            };
        });

        next(new ValidationException(formattedErrors));
    };
};

export const createLoanApplicationValidation = (): ValidationChain[] => {
    const { body } = require('express-validator');
    return [
        body('clientName')
            .trim()
            .notEmpty()
            .withMessage('El nombre del cliente es obligatorio')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
        body('loanAmount')
            .notEmpty()
            .withMessage('El monto del préstamo es obligatorio')
            .isFloat({ min: 0.01 })
            .withMessage('El monto del préstamo debe ser mayor a cero'),
        body('requestDate')
            .notEmpty()
            .withMessage('La fecha de solicitud es obligatoria')
            .isISO8601()
            .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
            .custom((value: string) => {
                const requestDate = new Date(value);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                if (requestDate > today) {
                    throw new Error('La fecha de solicitud no puede ser futura');
                }
                return true;
            }),
        body('loanId')
            .optional()
            .isString()
            .withMessage('El identificador del préstamo debe ser texto')
            .isLength({ min: 1, max: 50 })
            .withMessage('El identificador debe tener entre 1 y 50 caracteres')
    ];
};

export const updateLoanApplicationValidation = (): ValidationChain[] => {
    const { body } = require('express-validator');
    return [
        body('clientName')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre del cliente no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
        body('loanAmount')
            .optional()
            .notEmpty()
            .withMessage('El monto del préstamo es obligatorio')
            .isFloat({ min: 0.01 })
            .withMessage('El monto del préstamo debe ser mayor a cero'),
        body('requestDate')
            .optional()
            .isISO8601()
            .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
            .custom((value: string) => {
                const requestDate = new Date(value);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                if (requestDate > today) {
                    throw new Error('La fecha de solicitud no puede ser futura');
                }
                return true;
            }),
        body('status')
            .optional()
            .isIn(['pending', 'approved', 'rejected', 'under_review'])
            .withMessage('El estado debe ser uno de: pending, approved, rejected, under_review')
    ];
};