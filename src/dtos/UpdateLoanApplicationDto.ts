import { body } from 'express-validator';

interface UpdateLoanApplicationDto {
    loanAmount?: number;
    status?: 'APPROVED' | 'REJECTED' | 'FRAUD_DETECTED' | 'HIGH_RISK';
}

const UpdateLoanApplicationDto = [
    body('loanAmount')
        .optional()
        .isNumeric().withMessage('El monto debe ser un número')
        .custom(value => value > 0).withMessage('El monto del préstamo debe ser mayor a cero'),
    
    body('status')
        .optional()
        .isIn(['APPROVED', 'REJECTED', 'FRAUD_DETECTED', 'HIGH_RISK'])
        .withMessage('El estado debe ser uno de: APPROVED, REJECTED, FRAUD_DETECTED, HIGH_RISK')
];

export default UpdateLoanApplicationDto;
export type { UpdateLoanApplicationDto as UpdateLoanApplicationDtoType };