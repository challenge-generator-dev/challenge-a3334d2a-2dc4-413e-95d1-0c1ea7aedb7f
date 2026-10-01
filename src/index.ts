import express, { Application, Request, Response, NextFunction } from 'express';
import { LoanApplicationController } from './controllers/LoanApplicationController';
import { validationMiddleware } from './middlewares/validationMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { connectDatabase } from './config/db';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

const loanApplicationController = new LoanApplicationController();

app.post('/api/loan-applications', 
    validationMiddleware.validateLoanApplication, 
    loanApplicationController.create.bind(loanApplicationController)
);

app.get('/api/loan-applications/:id', loanApplicationController.findById.bind(loanApplicationController));

app.get('/api/loan-applications', loanApplicationController.findAll.bind(loanApplicationController));

app.patch('/api/loan-applications/:id', 
    validationMiddleware.validateUpdateLoanApplication,
    loanApplicationController.update.bind(loanApplicationController)
);

app.delete('/api/loan-applications/:id', loanApplicationController.delete.bind(loanApplicationController));

app.use(errorMiddleware.handle);

async function startServer() {
    try {
        await connectDatabase();
        console.log('Database connected successfully');
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();