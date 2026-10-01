// Tipos personalizados para el dominio de préstamos y respuestas de servicios externos

/**
 * Estados posibles de una solicitud de préstamo
 */
export enum LoanApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FRAUD_REVIEW = 'FRAUD_REVIEW',
  RISK_ASSESSMENT = 'RISK_ASSESSMENT'
}

/**
 * Resultado de la validación del motor antifraude
 */
export interface FraudCheckResult {
  isFraudulent: boolean;
  riskScore: number;
  reasons: string[];
  checkedAt: Date;
}

/**
 * Resultado de la consulta al buró de riesgos
 */
export interface RiskBureauResult {
  creditScore: number;
  maxRecommendedAmount: number;
  outstandingDebt: number;
  isEligible: boolean;
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH';
  checkedAt: Date;
}

/**
 * Resultado combinado de las verificaciones externas
 */
export interface ExternalValidationResult {
  fraudCheck: FraudCheckResult;
  riskCheck: RiskBureauResult;
  overallApproved: boolean;
  rejectionReasons: string[];
}

/**
 * Datos de entrada para crear una solicitud de préstamo
 */
export interface CreateLoanApplicationDto {
  clientName: string;
  loanAmount: number;
  requestDate: Date | string;
  idempotencyKey: string;
}

/**
 * Respuesta estandarizada de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Respuesta paginada para listados
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Configuración de validación de campo
 */
export interface FieldValidationRule {
  field: string;
  validations: Array<{
    type: string;
    message: string;
    value?: unknown;
  }>;
}

/**
 * Resultado de validación de solicitud
 */
export interface ValidationResult {
  isValid: boolean;
  errors: FieldValidationRule[];
}

/**
 * Metadatos de auditoría para operaciones
 */
export interface AuditMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Opciones de configuración para el servicio de préstamos
 */
export interface LoanServiceConfig {
  maxLoanAmount: number;
  minLoanAmount: number;
  defaultApprovalThreshold: number;
  fraudThreshold: number;
}

/**
 * Tipo genérico para operaciones con resultado
 */
export type OperationResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Configuración de conexión a servicios externos
 */
export interface ExternalServiceConfig {
  fraudEngineUrl: string;
  riskBureauUrl: string;
  timeoutMs: number;
  apiKey?: string;
}