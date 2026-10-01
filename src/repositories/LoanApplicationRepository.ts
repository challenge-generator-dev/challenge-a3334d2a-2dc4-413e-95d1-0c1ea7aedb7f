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