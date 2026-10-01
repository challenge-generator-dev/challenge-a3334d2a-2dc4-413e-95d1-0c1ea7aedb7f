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