import { Request } from 'express';

export interface IdempotencyRecord {
    key: string;
    response: {
        statusCode: number;
        body: unknown;
    };
    createdAt: Date;
    expiresAt: Date;
}

const idempotencyStore = new Map<string, IdempotencyRecord>();
const DEFAULT_TTL_HOURS = 24;

export class IdempotencyError extends Error {
    public readonly statusCode: number;
    public readonly previousResponse: unknown;

    constructor(key: string, previousResponse: unknown) {
        super(`Solicitud duplicada detectada para clave: ${key}`);
        this.name = 'IdempotencyError';
        this.statusCode = 409;
        this.previousResponse = previousResponse;
    }
}

export const generateIdempotencyKey = (loanId: string, action: string): string => {
    const timestamp = new Date().toISOString().split('T')[0];
    return `loan_${loanId}_${action}_${timestamp}`;
};

export const extractIdempotencyKey = (req: Request): string | null => {
    const headerKey = req.headers['idempotency-key'];
    if (headerKey && typeof headerKey === 'string' && headerKey.trim().length > 0) {
        return headerKey.trim();
    }
    if (req.body && req.body.idempotencyKey && typeof req.body.idempotencyKey === 'string') {
        return req.body.idempotencyKey.trim();
    }
    return null;
};

export const getIdempotencyRecord = (key: string): IdempotencyRecord | undefined => {
    const record = idempotencyStore.get(key);
    if (!record) {
        return undefined;
    }
    if (new Date() > record.expiresAt) {
        idempotencyStore.delete(key);
        return undefined;
    }
    return record;
};

export const saveIdempotencyRecord = (
    key: string,
    response: { statusCode: number; body: unknown },
    ttlHours: number = DEFAULT_TTL_HOURS
): void => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttlHours * 60 * 60 * 1000);

    const record: IdempotencyRecord = {
        key,
        response,
        createdAt: now,
        expiresAt
    };

    idempotencyStore.set(key, record);
};

export const checkAndStoreIdempotency = (
    key: string,
    response: { statusCode: number; body: unknown },
    ttlHours: number = DEFAULT_TTL_HOURS
): { isDuplicate: boolean; previousResponse?: unknown } => {
    const existingRecord = getIdempotencyRecord(key);

    if (existingRecord) {
        return {
            isDuplicate: true,
            previousResponse: existingRecord.response
        };
    }

    saveIdempotencyRecord(key, response, ttlHours);
    return { isDuplicate: false };
};

export const clearExpiredIdempotencyRecords = (): number => {
    const now = new Date();
    let clearedCount = 0;

    for (const [key, record] of idempotencyStore.entries()) {
        if (now > record.expiresAt) {
            idempotencyStore.delete(key);
            clearedCount++;
        }
    }

    return clearedCount;
};

export const clearAllIdempotencyRecords = (): void => {
    idempotencyStore.clear();
};

export const getIdempotencyStoreSize = (): number => {
    return idempotencyStore.size;
};

export const createIdempotencyMiddleware = () => {
    return (req: Request, res: any, next: any): void => {
        const idempotencyKey = extractIdempotencyKey(req);

        if (!idempotencyKey) {
            next();
            return;
        }

        const existingRecord = getIdempotencyRecord(idempotencyKey);
        if (existingRecord) {
            res.status(existingRecord.response.statusCode).json(existingRecord.response.body);
            return;
        }

        const originalSend = res.send;
        res.send = function (body: any): any {
            const response = {
                statusCode: res.statusCode,
                body: typeof body === 'string' ? JSON.parse(body) : body
            };

            if (res.statusCode >= 200 && res.statusCode < 300) {
                saveIdempotencyRecord(idempotencyKey, response);
            }

            return originalSend.call(this, body);
        };

        next();
    };
};