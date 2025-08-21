import { ResultSimulatorDTO } from "@/screens/ResultSimulator";

interface Product {
  id: number;
  nome: string;
  taxaJurosAnual: number;
  prazoMaximoMeses: number;
  valorMinimo: number;
  valorMaximo: number;
}

export const calculateAmortization = (
  principal: number,
  annualInterestRate: number,
  termInMonths: number,
  product: Product
): ResultSimulatorDTO => {
  const monthlyInterestRate = (annualInterestRate / 100) / 12;
  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -termInMonths));

  const parcels = [];
  let remainingBalance = principal;

  for (let i = 1; i <= termInMonths; i++) {
    const interest = remainingBalance * monthlyInterestRate;
    const amortization = monthlyPayment - interest;
    remainingBalance -= amortization;

    parcels.push({
      numero: i,
      valorAmortizacao: parseFloat(amortization.toFixed(2)),
      valorJuros: parseFloat(interest.toFixed(2)),
      valorPrestacao: parseFloat(monthlyPayment.toFixed(2)),
      saldoDevedor: parseFloat((remainingBalance > 0 ? remainingBalance : 0).toFixed(2)),
    });
  }

  return {
    codigoProduto: product.id,
    descricaoProduto: product.nome,
    taxaJuros: annualInterestRate,
    resultadoSimulacao: [{
      tipo: 'PRICE',
      parcelas: parcels,
    }],
  };
};