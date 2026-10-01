import { ILoanApplication } from '../models/LoanApplication';
import { LoanApplicationRepository } from '../repositories/LoanApplicationRepository';
import { FraudEngineService } from './FraudEngineService';
import { RiskBureauService } from './RiskBureauService';

export interface CreateLoanApplicationDto {
  clientName: string;
  loanAmount: number;
  requestDate: Date;
  idempotencyKey: string;
}

export interface LoanApplicationResult {
  success: boolean;
  data?: ILoanApplication;
  error?: string;
}

export class LoanApplicationService {
  private repository: LoanApplicationRepository;
  private fraudEngine: FraudEngineService;
  private riskBureau: RiskBureauService;

  constructor(
    repository: LoanApplicationRepository,
    fraudEngine: FraudEngineService,
    riskBureau: RiskBureauService
  ) {
    this.repository = repository;
    this.fraudEngine = fraudEngine;
    this.riskBureau = riskBureau;
  }

  private validateLoanApplication(dto: CreateLoanApplicationDto): string | null {
    if (!dto.clientName || dto.clientName.trim().length === 0) {
      return 'El nombre del cliente es obligatorio';
    }
    if (dto.loanAmount <= 0) {
      return 'El monto del préstamo debe ser mayor a cero';
    }
    if (!dto.requestDate) {
      return 'La fecha de solicitud es obligatoria';
    }
    const requestDate = new Date(dto.requestDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (requestDate > today) {
      return 'La fecha de solicitud no puede ser futura';
    }
    if (!dto.idempotencyKey || dto.idempotencyKey.trim().length === 0) {
      return 'La clave de idempotencia es obligatoria';
    }
    return null;
  }

  async createApplication(dto: CreateLoanApplicationDto): Promise<LoanApplicationResult> {
    const validationError = this.validateLoanApplication(dto);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const existingApplication = await this.repository.findByIdempotencyKey(dto.idempotencyKey);
    if (existingApplication) {
      return { success: true, data: existingApplication };
    }

    const fraudCheckResult = await this.fraudEngine.checkFraud(dto.clientName, dto.loanAmount);
    if (!fraudCheckResult.approved) {
      const application = await this.repository.create({
        clientName: dto.clientName,
        loanAmount: dto.loanAmount,
        requestDate: new Date(dto.requestDate),
        status: 'REJECTED',
        idempotencyKey: dto.idempotencyKey,
        fraudCheckResult: fraudCheckResult,
        riskScore: null
      });
      return { success: true, data: application };
    }

    const riskCheckResult = await this.riskBureau.evaluateRisk(dto.clientName, dto.loanAmount);
    let status: 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING';
    if (riskCheckResult.approved) {
      status = 'APPROVED';
    } else {
      status = 'REJECTED';
    }

    const application = await this.repository.create({
      clientName: dto.clientName,
      loanAmount: dto.loanAmount,
      requestDate: new Date(dto.requestDate),
      status: status,
      idempotencyKey: dto.idempotencyKey,
      fraudCheckResult: fraudCheckResult,
      riskScore: riskCheckResult.riskScore
    });

    return { success: true, data: application };
  }

  async getApplicationById(id: string): Promise<ILoanApplication | null> {
    return this.repository.findById(id);
  }

  async getAllApplications(): Promise<ILoanApplication[]> {
    return this.repository.findAll();
  }

  async updateApplicationStatus(id: string, status: string): Promise<ILoanApplication | null> {
    return this.repository.updateStatus(id, status);
  }
}