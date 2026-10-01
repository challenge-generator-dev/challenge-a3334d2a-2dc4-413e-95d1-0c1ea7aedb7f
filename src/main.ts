import express from 'express';
import 'reflect-metadata';
import { connect } from 'mongoose';
import LoanApplicationController from './controllers/LoanApplicationController';
import errorMiddleware from './middlewares/errorMiddleware';
import validationMiddleware from './middlewares/validationMiddleware';

class Server {
    private app: express.Application;
    private port: number;
    private loanApplicationController: LoanApplicationController;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
        this.loanApplicationController = new LoanApplicationController();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private setupRoutes(): void {
        this.app.post(
            '/api/loan-applications',
            validationMiddleware.validateLoanApplication,
            this.loanApplicationController.createLoanApplication.bind(this.loanApplicationController)
        );
        this.app.use(errorMiddleware.handleErrors);
    }

    public async start(): Promise<void> {
        try {
            await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loanDB');
            console.log('Connected to MongoDB');
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            process.exit(1);
        }
    }
}

const server = new Server();
server.start().catch(err => {
    console.error('Server failed to start', err);
    process.exit(1);
});