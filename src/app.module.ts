export class AppModule {
    private app: express.Application;
    private controllers: any[];
    
    constructor() {
        this.app = express();
        this.controllers = [];
        this.initializeMiddlewares();
        this.initializeControllers();
        this.initializeErrorHandling();
    }
    
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }
    
    private initializeControllers(): void {
        const loanController = require('./controllers/LoanApplicationController').LoanApplicationController;
        this.controllers.push(loanController);
        
        this.app.post('/api/loan-applications', 
            require('./middlewares/validationMiddleware').validationMiddleware.validateLoanApplication,
            loanController.prototype.create
        );
        
        this.app.get('/api/loan-applications/:id', loanController.prototype.findById);
        this.app.get('/api/loan-applications', loanController.prototype.findAll);
        this.app.patch('/api/loan-applications/:id', loanController.prototype.update);
        this.app.delete('/api/loan-applications/:id', loanController.prototype.delete);
    }
    
    private initializeErrorHandling(): void {
        this.app.use(require('./middlewares/errorMiddleware').errorMiddleware.handle);
    }
    
    public getApp(): express.Application {
        return this.app;
    }
    
    public getController(name: string): any {
        return this.controllers.find(c => c.name === name);
    }
}