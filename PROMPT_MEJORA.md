# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/controllers/LoanApplicationController.ts` — `LoanApplicationService.createLoanApplication`: Se invoca `createLoanApplication` sobre `LoanApplicationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/controllers/LoanApplicationController.ts` — `LoanApplicationService.updateLoanApplication`: Se invoca `updateLoanApplication` sobre `LoanApplicationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/controllers/LoanApplicationController.ts` — `LoanApplicationService.deleteLoanApplication`: Se invoca `deleteLoanApplication` sobre `LoanApplicationService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/services/LoanApplicationService.ts` — `LoanApplicationRepository.updateStatus`: Se invoca `updateStatus` sobre `LoanApplicationRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/middlewares/validationMiddleware.ts` — `ValidationError.isEmpty`: Se invoca `isEmpty` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/middlewares/validationMiddleware.ts` — `ValidationError.array`: Se invoca `array` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
Construir una API REST con Node.js, Express y MongoDB

### Reto
- Tema: Node.js Express
- Seniority: junior-l1
- Tipo: practical
- Título: Desarrollo de una API REST en el dominio de gestión de préstamos
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Registro de solicitudes de préstamos — objetivo: Implementar la funcionalidad básica para registrar solicitudes de préstamos. — entregable (NO resolver): API REST que acepta y persiste solicitudes de préstamos con validación de campos y garantía de idempotencia.
- Fase 2: Integración con motor antifraude y buró de riesgos — objetivo: Integrar la API con el motor antifraude y el buró de riesgos para validar las solicitudes de préstamos. — entregable (NO resolver): API REST integrada con el motor antifraude y el buró de riesgos, que actualiza el estado de las solicitudes según las respuestas recibidas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "loan-application-api",
  "version": "1.0.0",
  "description": "API REST para gestión de solicitudes de préstamos",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "nodemon --exec ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "4.18.2",
    "mongoose": "8.2.3",
    "express-validator": "7.0.1"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "20.12.2",
    "typescript": "5.4.3",
    "ts-node": "10.9.2",
    "nodemon": "3.1.0",
    "jest": "29.7.0",
    "@types/jest": "29.5.12",
    "supertest": "6.3.4"
  }
}

// === ARCHIVO: src/models/LoanApplication.ts ===
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

// === ARCHIVO: src/dtos/CreateLoanApplicationDto.ts ===
import { body } from 'express-validator';

const CreateLoanApplicationDto = [
    body('applicantName')
        .notEmpty().withMessage('El nombre del solicitante es obligatorio')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .trim()
        .isLength({ max: 100 }).withMessage('El nombre no puede exceder los 100 caracteres'),
    
    body('loanAmount')
        .notEmpty().withMessage('El monto del préstamo es obligatorio')
        .isNumeric().withMessage('El monto debe ser un número')
        .custom(value => value > 0).withMessage('El monto del préstamo debe ser mayor a cero'),
    
    body('idempotencyKey')
        .notEmpty().withMessage('La clave de idempotencia es obligatoria')
        .isString().withMessage('La clave de idempotencia debe ser una cadena de texto')
        .trim()
        .isLength({ min: 5, max: 50 }).withMessage('La clave de idempotencia debe tener entre 5 y 50 caracteres'),
    
    body('applicationDate')
        .optional({ checkFalsy: true })
        .isISO8601().withMessage('La fecha debe estar en formato ISO8601')
        .custom(value => new Date(value) <= new Date()).withMessage('La fecha de solicitud no puede ser futura')
];

export default CreateLoanApplicationDto;

// === ARCHIVO: src/dtos/UpdateLoanApplicationDto.ts ===
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

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: src/app.module.ts ===
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

// === ARCHIVO: src/repositories/LoanApplicationRepository.ts ===
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';
import { ILoanApplication } from '../models/LoanApplication';
import { UpdateLoanApplicationDto } from '../dtos/UpdateLoanApplicationDto';

export class LoanApplicationRepository {
    private model: Model<ILoanApplication & Document>;
    
    constructor(model: Model<ILoanApplication & Document>) {
        this.model = model;
    }
    
    async create(data: Partial<ILoanApplication>): Promise<ILoanApplication & Document> {
        const document = new this.model(data);
        return await document.save();
    }
    
    async findById(id: string): Promise<(ILoanApplication & Document) | null> {
        return await this.model.findById(id).exec();
    }
    
    async findByIdempotencyKey(key: string): Promise<(ILoanApplication & Document) | null> {
        return await this.model.findOne({ idempotencyKey: key }).exec();
    }
    
    async findAll(): Promise<(ILoanApplication & Document)[]> {
        return await this.model.find().exec();
    }
    
    async findByFilter(filter: FilterQuery<ILoanApplication>): Promise<(ILoanApplication & Document)[]> {
        return await this.model.find(filter).exec();
    }
    
    async update(id: string, data: UpdateQuery<ILoanApplication>): Promise<(ILoanApplication & Document) | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    
    async updateByIdempotencyKey(key: string, data: UpdateQuery<ILoanApplication>): Promise<(ILoanApplication & Document) | null> {
        return await this.model.findOneAndUpdate({ idempotencyKey: key }, data, { new: true }).exec();
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }
    
    async exists(id: string): Promise<boolean> {
        const count = await this.model.countDocuments({ _id: id }).exec();
        return count > 0;
    }
    
    async count(filter: FilterQuery<ILoanApplication> = {}): Promise<number> {
        return await this.model.countDocuments(filter).exec();
    }
    
    async findByStatus(status: string): Promise<(ILoanApplication & Document)[]> {
        return await this.model.find({ status }).exec();
    }
    
    async findByCustomerName(name: string): Promise<(ILoanApplication & Document)[]> {
        const regex = new RegExp(name, 'i');
        return await this.model.find({ customerName: regex }).exec();
    }
    
    async findByDateRange(startDate: Date, endDate: Date): Promise<(ILoanApplication & Document)[]> {
        return await this.model.find({
            requestDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).exec();
    }
}

// === ARCHIVO: src/config/db.ts ===
import mongoose, { Connection, ConnectionOptions } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loan-application-db';
const MONGO_OPTIONS: ConnectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let cachedConnection: Connection | null = null;

export async function connectToDatabase(): Promise<Connection> {
  if (cachedConnection && cachedConnection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('Connecting to MongoDB...');
    const connection = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    cachedConnection = connection.connection;
    
    cachedConnection.on('connected', () => {
      console.log('MongoDB connection established successfully');
    });

    cachedConnection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    cachedConnection.on('disconnected', () => {
      console.warn('MongoDB connection lost');
    });

    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('MongoDB disconnected');
  }
}

export function getConnection(): Connection | null {
  return cachedConnection;
}

// === ARCHIVO: src/controllers/LoanApplicationController.ts ===
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

// === ARCHIVO: src/services/LoanApplicationService.ts ===
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

// === ARCHIVO: src/services/FraudEngineService.ts ===
export interface FraudCheckResult {
  approved: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  reason?: string;
  checkTimestamp: Date;
}

export class FraudEngineService {
  private baseApprovalRate: number = 0.85;

  constructor() {}

  async checkFraud(clientName: string, loanAmount: number): Promise<FraudCheckResult> {
    await this.simulateExternalCallDelay();
    
    const nameLength = clientName.trim().length;
    const amountFactor = this.calculateAmountRiskFactor(loanAmount);
    const nameFactor = this.calculateNameRiskFactor(nameLength);
    const combinedRisk = amountFactor + nameFactor;
    
    const isApproved = Math.random() > (1 - this.baseApprovalRate) && combinedRisk < 0.7;
    
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let reason: string | undefined;
    
    if (!isApproved) {
      riskLevel = combinedRisk > 0.5 ? 'HIGH' : 'MEDIUM';
      if (loanAmount > 100000) {
        reason = 'Monto excesivamente alto para verificación automática';
      } else if (nameLength < 3) {
        reason = 'Nombre del cliente no válido para verificación';
      } else {
        reason = 'Patrón de comportamiento sospechoso detectado';
      }
    }

    return {
      approved: isApproved,
      riskLevel,
      reason,
      checkTimestamp: new Date()
    };
  }

  private calculateAmountRiskFactor(amount: number): number {
    if (amount <= 10000) return 0.1;
    if (amount <= 50000) return 0.3;
    if (amount <= 100000) return 0.5;
    return 0.8;
  }

  private calculateNameRiskFactor(nameLength: number): number {
    if (nameLength >= 5 && nameLength <= 50) return 0.1;
    if (nameLength > 50) return 0.3;
    return 0.5;
  }

  private async simulateExternalCallDelay(): Promise<void> {
    const delay = Math.floor(Math.random() * 300) + 100;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  async healthCheck(): Promise<{ available: boolean; responseTime: number }> {
    const start = Date.now();
    await this.simulateExternalCallDelay();
    const responseTime = Date.now() - start;
    return { available: responseTime < 1000, responseTime };
  }
}

// === ARCHIVO: src/services/RiskBureauService.ts ===
export interface RiskEvaluationResult {
  approved: boolean;
  riskScore: number;
  creditBureauReference: string;
  evaluationDetails: {
    score: number;
    category: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'VERY_POOR';
    maxLoanAmount: number;
  };
  evaluationTimestamp: Date;
}

export class RiskBureauService {
  private baseScore: number = 650;
  private bureauApiEndpoint: string = 'https://risk-bureau-api.internal/evaluate';

  constructor() {}

  async evaluateRisk(clientName: string, loanAmount: number): Promise<RiskEvaluationResult> {
    await this.simulateBureauCallDelay();
    
    const baseRiskScore = this.calculateBaseRiskScore(clientName);
    const amountRiskAdjustment = this.calculateAmountRiskAdjustment(loanAmount, baseRiskScore);
    const finalScore = Math.max(300, Math.min(850, baseRiskScore + amountRiskAdjustment));
    
    const category = this.determineCategory(finalScore);
    const maxLoanAmount = this.calculateMaxLoanAmount(finalScore);
    const isApproved = loanAmount <= maxLoanAmount;

    return {
      approved: isApproved,
      riskScore: finalScore,
      creditBureauReference: this.generateReferenceId(clientName),
      evaluationDetails: {
        score: finalScore,
        category,
        maxLoanAmount
      },
      evaluationTimestamp: new Date()
    };
  }

  private calculateBaseRiskScore(clientName: string): number {
    const nameHash = this.simpleHash(clientName);
    const normalizedHash = (nameHash % 200) + 500;
    return normalizedHash;
  }

  private calculateAmountRiskAdjustment(loanAmount: number, baseScore: number): number {
    const amountThresholds = [
      { limit: 10000, adjustment: 50 },
      { limit: 25000, adjustment: 20 },
      { limit: 50000, adjustment: -10 },
      { limit: 100000, adjustment: -30 },
      { limit: Infinity, adjustment: -50 }
    ];
    
    for (const threshold of amountThresholds) {
      if (loanAmount <= threshold.limit) {
        return threshold.adjustment;
      }
    }
    return -50;
  }

  private determineCategory(score: number): 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'VERY_POOR' {
    if (score >= 750) return 'EXCELLENT';
    if (score >= 700) return 'GOOD';
    if (score >= 650) return 'FAIR';
    if (score >= 600) return 'POOR';
    return 'VERY_POOR';
  }

  private calculateMaxLoanAmount(score: number): number {
    if (score >= 750) return 200000;
    if (score >= 700) return 150000;
    if (score >= 650) return 100000;
    if (score >= 600) return 50000;
    return 25000;
  }

  private generateReferenceId(clientName: string): string {
    const timestamp = Date.now().toString(36);
    const hash = this.simpleHash(clientName).toString(36);
    return `REF-${timestamp}-${hash}`.toUpperCase();
  }

  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  private async simulateBureauCallDelay(): Promise<void> {
    const delay = Math.floor(Math.random() * 400) + 200;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  async getCreditHistory(clientName: string): Promise<{
    exists: boolean;
    lastEvaluation?: RiskEvaluationResult;
  }> {
    await this.simulateBureauCallDelay();
    const hasHistory = Math.random() > 0.3;
    
    if (!hasHistory) {
      return { exists: false };
    }

    const previousEvaluation = await this.evaluateRisk(clientName, 10000);
    return { exists: true, lastEvaluation: previousEvaluation };
  }
}

// === ARCHIVO: src/middlewares/validationMiddleware.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export interface ValidationError {
    field: string;
    message: string;
}

export class ValidationException extends Error {
    public readonly errors: ValidationError[];
    public readonly statusCode: number;

    constructor(errors: ValidationError[]) {
        super('Validation failed');
        this.name = 'ValidationException';
        this.errors = errors;
        this.statusCode = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const validate = (validations: ValidationChain[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
            return;
        }

        const formattedErrors: ValidationError[] = errors.array().map(err => {
            if ('path' in err && 'msg' in err) {
                return {
                    field: err.path,
                    message: err.msg
                };
            }
            return {
                field: 'unknown',
                message: String(err)
            };
        });

        next(new ValidationException(formattedErrors));
    };
};

export const createLoanApplicationValidation = (): ValidationChain[] => {
    const { body } = require('express-validator');
    return [
        body('clientName')
            .trim()
            .notEmpty()
            .withMessage('El nombre del cliente es obligatorio')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
        body('loanAmount')
            .notEmpty()
            .withMessage('El monto del préstamo es obligatorio')
            .isFloat({ min: 0.01 })
            .withMessage('El monto del préstamo debe ser mayor a cero'),
        body('requestDate')
            .notEmpty()
            .withMessage('La fecha de solicitud es obligatoria')
            .isISO8601()
            .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
            .custom((value: string) => {
                const requestDate = new Date(value);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                if (requestDate > today) {
                    throw new Error('La fecha de solicitud no puede ser futura');
                }
                return true;
            }),
        body('loanId')
            .optional()
            .isString()
            .withMessage('El identificador del préstamo debe ser texto')
            .isLength({ min: 1, max: 50 })
            .withMessage('El identificador debe tener entre 1 y 50 caracteres')
    ];
};

export const updateLoanApplicationValidation = (): ValidationChain[] => {
    const { body } = require('express-validator');
    return [
        body('clientName')
            .optional()
            .trim()
            .notEmpty()
            .withMessage('El nombre del cliente no puede estar vacío')
            .isLength({ min: 2, max: 100 })
            .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
        body('loanAmount')
            .optional()
            .notEmpty()
            .withMessage('El monto del préstamo es obligatorio')
            .isFloat({ min: 0.01 })
            .withMessage('El monto del préstamo debe ser mayor a cero'),
        body('requestDate')
            .optional()
            .isISO8601()
            .withMessage('La fecha debe tener formato válido (YYYY-MM-DD)')
            .custom((value: string) => {
                const requestDate = new Date(value);
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                if (requestDate > today) {
                    throw new Error('La fecha de solicitud no puede ser futura');
                }
                return true;
            }),
        body('status')
            .optional()
            .isIn(['pending', 'approved', 'rejected', 'under_review'])
            .withMessage('El estado debe ser uno de: pending, approved, rejected, under_review')
    ];
};

// === ARCHIVO: src/middlewares/errorMiddleware.ts ===
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

// === ARCHIVO: src/utils/idempotencyUtils.ts ===
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

// === ARCHIVO: src/types/customTypes.ts ===
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

// === ARCHIVO: README.md ===
# Loan Application API

API REST para la gestión de solicitudes de préstamos con integración de servicios de verificación de riesgo y fraude.

## Requisitos Previos

- Node.js 20.x
- npm o yarn
- MongoDB (local o remoto)

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/loan-app
FRAUD_ENGINE_URL=http://localhost:4000
RISK_BUREAU_URL=http://localhost:5000
```

## Ejecución

### Desarrollo (con hot-reload)
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

### Tests
```bash
npm test
```

## Estructura del Proyecto

```
src/
├── config/          # Configuración deBase de datos y servicios externos
├── controllers/     # Controladores REST
├── dtos/           # Objetos de transferencia de datos
├── middlewares/    # Middlewares Express (validación, errores)
├── models/         # Modelos Mongoose
├── repositories/   # Capa de acceso a datos
├── services/       # Lógica de negocio (servicios externos)
├── types/          # Tipos y interfaces TypeScript
└── utils/          # Utilidades auxiliares
```

## Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /api/loan-applications | Crear solicitud de préstamo |
| GET | /api/loan-applications | Listar solicitudes |
| GET | /api/loan-applications/:id | Obtener solicitud por ID |
| PATCH | /api/loan-applications/:id | Actualizar solicitud |

## Dependencias

- **express** (4.18.2) - Framework web
- **mongoose** (8.2.3) - ODM para MongoDB
- **express-validator** (7.0.1) - Validación de requests

## Tecnologías de Desarrollo

- TypeScript 5.4.3
- Jest 29.7.0 para testing
- nodemon para desarrollo

## Patrón Arquitectónico

Arquitectura en capas estándar (Controller → Service → Repository)

- **Controllers**: Manejan HTTP requests/responses
- **Services**: Contienen lógica de negocio e integración con servicios externos
- **Repositories**: Abstraen acceso a MongoDB

## Características

- Validación de campos con express-validator
- Manejo centralizado de errores
- Idempotencia mediante claves únicas
- Integración con motor antifraude
- Integración con buró de riesgos
```
