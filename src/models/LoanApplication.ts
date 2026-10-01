import mongoose, { Schema, Document } from 'mongoose';

interface ILoanApplication extends Document {
    applicantName: string;
    loanAmount: number;
    applicationDate: Date;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FRAUD_DETECTED' | 'HIGH_RISK';
    idempotencyKey: string;
    fraudCheckResult?: {
        isFraudulent: boolean;
        fraudScore: number;
        checkedAt: Date;
    };
    riskCheckResult?: {
        riskScore: number;
        creditScore: number;
        checkedAt: Date;
    };
}

const LoanApplicationSchema: Schema = new Schema({
    applicantName: {
        type: String,
        required: [true, 'El nombre del solicitante es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    loanAmount: {
        type: Number,
        required: [true, 'El monto del préstamo es obligatorio'],
        min: [1, 'El monto del préstamo debe ser mayor a cero']
    },
    applicationDate: {
        type: Date,
        required: [true, 'La fecha de solicitud es obligatoria'],
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['PENDING', 'APPROVED', 'REJECTED', 'FRAUD_DETECTED', 'HIGH_RISK'],
            message: 'El estado {VALUE} no es válido'
        },
        default: 'PENDING'
    },
    idempotencyKey: {
        type: String,
        required: [true, 'La clave de idempotencia es obligatoria'],
        unique: true,
        trim: true
    },
    fraudCheckResult: {
        isFraudulent: {
            type: Boolean
        },
        fraudScore: {
            type: Number,
            min: [0, 'El puntaje de fraude no puede ser negativo'],
            max: [100, 'El puntaje de fraude no puede exceder 100']
        },
        checkedAt: {
            type: Date
        }
    },
    riskCheckResult: {
        riskScore: {
            type: Number,
            min: [0, 'El puntaje de riesgo no puede ser negativo'],
            max: [1000, 'El puntaje de riesgo no puede exceder 1000']
        },
        creditScore: {
            type: Number,
            min: [300, 'El puntaje de crédito no puede ser inferior a 300'],
            max: [850, 'El puntaje de crédito no puede exceder 850']
        },
        checkedAt: {
            type: Date
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Validación personalizada para la fecha de solicitud
LoanApplicationSchema.path('applicationDate').validate((value: Date) => {
    return value <= new Date();
}, 'La fecha de solicitud no puede ser futura');

// Índice único para garantizar idempotencia
LoanApplicationSchema.index({ idempotencyKey: 1 }, { unique: true });

const LoanApplication = mongoose.model<ILoanApplication>('LoanApplication', LoanApplicationSchema);

export default LoanApplication;