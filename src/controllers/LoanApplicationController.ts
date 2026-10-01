import { Router, Request, Response, NextFunction } from 'express';
import { LoanApplicationService } from '../services/LoanApplicationService';
import { LoanApplicationRepository } from '../repositories/LoanApplicationRepository';
import { CreateLoanApplicationDto } from '../dtos/CreateLoanApplicationDto';
import { UpdateLoanApplicationDto } from '../dtos/UpdateLoanApplicationDto';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { IdempotencyUtils } from '../utils/idempotencyUtils';

export class LoanApplicationController {
  private router: Router;
  private service: LoanApplicationService;
  private repository: LoanApplicationRepository;

  constructor(service: LoanApplicationService, repository: LoanApplicationRepository) {
    this.router = Router();
    this.service = service;
    this.repository = repository;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', 
      validationMiddleware(CreateLoanApplicationDto),
      this.createLoanApplication.bind(this)
    );
    
    this.router.get('/', this.getAllLoanApplications.bind(this));
    
    this.router.get('/:id', this.getLoanApplicationById.bind(this));
    
    this.router.put('/:id', 
      validationMiddleware(UpdateLoanApplicationDto),
      this.updateLoanApplication.bind(this)
    );
    
    this.router.delete('/:id', this.deleteLoanApplication.bind(this));
  }

  private async createLoanApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idempotencyKey = req.headers['idempotency-key'] as string;
      
      if (idempotencyKey) {
        const existingRequest = await this.repository.findByIdempotencyKey(idempotencyKey);
        if (existingRequest) {
          res.status(200).json({
            message: 'Solicitud procesada correctamente (idempotente)',
            data: existingRequest,
          });
          return;
        }
      }

      const dto: CreateLoanApplicationDto = req.body;
      
      if (dto.amount <= 0) {
        res.status(400).json({
          error: 'El monto del préstamo debe ser mayor a cero',
        });
        return;
      }

      const requestDate = new Date(dto.requestDate);
      if (isNaN(requestDate.getTime())) {
        res.status(400).json({
          error: 'La fecha de solicitud no es válida',
        });
        return;
      }

      if (requestDate > new Date()) {
        res.status(400).json({
          error: 'La fecha de solicitud no puede ser futura',
        });
        return;
      }

      const loanApplication = await this.service.createLoanApplication(dto, idempotencyKey);
      
      res.status(201).json({
        message: 'Solicitud de préstamo creada exitosamente',
        data: loanApplication,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAllLoanApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, minAmount, maxAmount, startDate, endDate } = req.query;
      
      const filters: Record<string, unknown> = {};
      
      if (status) {
        filters.status = status;
      }
      
      if (minAmount || maxAmount) {
        filters.amount = {};
        if (minAmount) {
          (filters.amount as Record<string, number>).$gte = parseFloat(minAmount as string);
        }
        if (maxAmount) {
          (filters.amount as Record<string, number>).$lte = parseFloat(maxAmount as string);
        }
      }
      
      if (startDate || endDate) {
        filters.requestDate = {};
        if (startDate) {
          (filters.requestDate as Record<string, Date>).$gte = new Date(startDate as string);
        }
        if (endDate) {
          (filters.requestDate as Record<string, Date>).$lte = new Date(endDate as string);
        }
      }

      const applications = await this.repository.findAll(filters);
      
      res.status(200).json({
        message: 'Solicitudes de préstamo obtenidas correctamente',
        count: applications.length,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  private async getLoanApplicationById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!IdempotencyUtils.isValidId(id)) {
        res.status(400).json({
          error: 'ID de solicitud inválido',
        });
        return;
      }

      const application = await this.repository.findById(id);
      
      if (!application) {
        res.status(404).json({
          error: 'Solicitud de préstamo no encontrada',
        });
        return;
      }

      res.status(200).json({
        message: 'Solicitud de préstamo obtenida correctamente',
        data: application,
      });
    } catch (error) {
      next(error);
    }
  }

  private async updateLoanApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateLoanApplicationDto = req.body;
      
      if (!IdempotencyUtils.isValidId(id)) {
        res.status(400).json({
          error: 'ID de solicitud inválido',
        });
        return;
      }

      const existingApplication = await this.repository.findById(id);
      
      if (!existingApplication) {
        res.status(404).json({
          error: 'Solicitud de préstamo no encontrada',
        });
        return;
      }

      if (dto.amount !== undefined && dto.amount <= 0) {
        res.status(400).json({
          error: 'El monto del préstamo debe ser mayor a cero',
        });
        return;
      }

      const updatedApplication = await this.service.updateLoanApplication(id, dto);
      
      res.status(200).json({
        message: 'Solicitud de préstamo actualizada correctamente',
        data: updatedApplication,
      });
    } catch (error) {
      next(error);
    }
  }

  private async deleteLoanApplication(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!IdempotencyUtils.isValidId(id)) {
        res.status(400).json({
          error: 'ID de solicitud inválido',
        });
        return;
      }

      const existingApplication = await this.repository.findById(id);
      
      if (!existingApplication) {
        res.status(404).json({
          error: 'Solicitud de préstamo no encontrada',
        });
        return;
      }

      await this.service.deleteLoanApplication(id);
      
      res.status(200).json({
        message: 'Solicitud de préstamo eliminada correctamente',
      });
    } catch (error) {
      next(error);
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}