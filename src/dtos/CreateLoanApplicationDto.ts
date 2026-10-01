import { body } from 'express-validator';

const CreateLoanApplicationDto = [
    body('applicantName')
        .notEmpty().withMessage('El nombre del solicitante es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    
    body('loanAmount')
        .notEmpty().withMessage('El monto del préstamo es obligatorio')
        .isNumeric().withMessage('El monto debe ser un número')
        .custom(value => value > 0).withMessage('El monto del préstamo debe ser mayor a cero'),
    
    body('idempotencyKey')
        .notEmpty().withMessage('La clave de idempotencia es obligatoria')
        .isString().withMessage('La clave de idempotencia debe ser una cadena de texto')
        .trim()
        .isLength({ min: 5, max: 50 }).withMessage('La clave de idempotencia debe tener entre 5 y 50 caracteres'),
    
    body('applicationDate')
        .optional({ checkFalsy: true })
        .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
        .custom(value => new Date(value) <= new Date()).withMessage('La fecha de solicitud no puede ser futura')
];

export default CreateLoanApplicationDto;