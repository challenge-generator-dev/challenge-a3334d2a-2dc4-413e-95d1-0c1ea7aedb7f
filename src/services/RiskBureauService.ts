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