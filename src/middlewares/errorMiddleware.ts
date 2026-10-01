import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ValidationException } from './validationMiddleware';

export interface ErrorResponse {
    success: boolean;
    error: {
        type: string;
        message: string;
        details?: unknown;
        timestamp: string;
        path?: string;
    };
}

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errorCode?: string;

    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`${resource} no encontrado`, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409, 'CONFLICT');
        this.name = 'ConflictError';
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Error interno del servidor') {
        super(message, 500, 'INTERNAL_ERROR');
        this.name = 'InternalServerError';
    }
}

export const errorMiddleware: RequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const timestamp = new Date().toISOString();
    const path = req.path;

    let statusCode = 500;
    let errorType = 'INTERNAL_ERROR';
    let message = 'Error interno del servidor';
    let details: unknown = undefined;

    if (err instanceof ValidationException) {
        statusCode = err.statusCode;
        errorType = 'VALIDATION_ERROR';
        message = 'Error de validación';
        details = err.errors;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        errorType = err.errorCode || err.name;
        message = err.message;
    } else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
        statusCode = 500;
        errorType = 'DATABASE_ERROR';
        message = 'Error de base de datos';
        if ('code' in err && err.code === 11000) {
            statusCode = 409;
            errorType = 'DUPLICATE_KEY';
            message = 'Ya existe un registro con estos datos';
        }
    } else if (err.name === 'CastError') {
        statusCode = 400;
        errorType = 'INVALID_ID';
        message = 'El identificador proporcionado no es válido';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        errorType = 'INVALID_TOKEN';
        message = 'Token de autenticación inválido';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        errorType = 'TOKEN_EXPIRED';
        message = 'El token de autenticación ha expirado';
    }

    const response: ErrorResponse = {
        success: false,
        error: {
            type: errorType,
            message,
            details,
            timestamp,
            path
        }
    };

    res.status(statusCode).json(response);
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const notFoundMiddleware: RequestHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        success: false,
        error: {
            type: 'NOT_FOUND',
            message: `Ruta ${req.method} ${req.path} no encontrada`,
            timestamp: new Date().toISOString(),
            path: req.path
        }
    });
};