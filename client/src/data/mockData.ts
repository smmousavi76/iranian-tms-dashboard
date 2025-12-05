// todo: remove mock functionality - this file contains mock data for the prototype
import jalaliMoment from 'jalali-moment';

export type CurrencyMode = 'RIAL' | 'TOMAN';

export interface BankAccount {
  id: string;
  bankName: string;
  logoColor: string;
  accountNumber: string;
  balanceRial: number;
  blockedRial: number;
  incomingCheques?: number;
  pendingPayaOutflows?: number;
}

export interface Transaction {
  id: string;
  description: string;
  amountRial: number;
  type: 'DEBIT' | 'CREDIT';
  date: string;
  category: string;
  bankId?: string;
  status?: 'completed' | 'pending' | 'scheduled';
}

export interface ForecastDataPoint {
  date: string;
  amount: number;
  type: 'Actual' | 'Forecast';
  range?: [number, number];
}

export interface WaterfallDataPoint {
  name: string;
  value: number;
  type: 'start' | 'positive' | 'negative' | 'end';
}

export interface DueDebt {
  id: string;
  creditor: string;
  amountRial: number;
  dueDate: string;
  status: 'overdue' | 'dueToday' | 'upcoming';
}

export interface CurrencyPosition {
  currency: string;
  amount: number;
  equivalentRial: number;
  position: 'long' | 'short' | 'neutral';
}

export const accounts: BankAccount[] = [
  { id: '1', bankName: 'بانک ملت', logoColor: 'bg-red-600', accountNumber: '4423/88/1029', balanceRial: 45000000000, blockedRial: 5000000000, incomingCheques: 2500000000, pendingPayaOutflows: 1200000000 },
  { id: '2', bankName: 'بانک تجارت', logoColor: 'bg-blue-600', accountNumber: '3002/11/9090', balanceRial: 23500000000, blockedRial: 0, incomingCheques: 800000000, pendingPayaOutflows: 500000000 },
  { id: '3', bankName: 'بانک پاسارگاد', logoColor: 'bg-yellow-500', accountNumber: '110.200.3399', balanceRial: 89000000000, blockedRial: 12000000000, incomingCheques: 5000000000, pendingPayaOutflows: 3000000000 },
  { id: '4', bankName: 'بانک سامان', logoColor: 'bg-blue-400', accountNumber: '880-10-2020-1', balanceRial: 15600000000, blockedRial: 0, incomingCheques: 0, pendingPayaOutflows: 800000000 },
];

export const forecastData: ForecastDataPoint[] = [
  { date: '1402/09/10', amount: 155000000000, type: 'Actual' },
  { date: '1402/09/11', amount: 148000000000, type: 'Actual' },
  { date: '1402/09/12', amount: 160000000000, type: 'Actual' },
  { date: '1402/09/13', amount: 173100000000, type: 'Actual' },
  { date: '1402/09/14', amount: 170000000000, type: 'Forecast', range: [165000000000, 175000000000] },
  { date: '1402/09/15', amount: 185000000000, type: 'Forecast', range: [178000000000, 192000000000] },
  { date: '1402/09/16', amount: 180000000000, type: 'Forecast', range: [170000000000, 190000000000] },
];

// Waterfall data showing cash flow movement from morning to end of day
export const waterfallData: WaterfallDataPoint[] = [
  { name: 'موجودی صبح', value: 173100000000, type: 'start' },
  { name: 'دریافت مشتری', value: 15200000000, type: 'positive' },
  { name: 'چک وصولی', value: 8300000000, type: 'positive' },
  { name: 'سود سپرده', value: 1850000000, type: 'positive' },
  { name: 'حقوق', value: -12500000000, type: 'negative' },
  { name: 'تامین‌کننده', value: -6800000000, type: 'negative' },
  { name: 'مالیات', value: -5600000000, type: 'negative' },
  { name: 'موجودی عصر', value: 173550000000, type: 'end' },
];

export const transactions: Transaction[] = [
  { id: '1', description: 'واریز حقوق کارکنان', amountRial: 12500000000, type: 'DEBIT', date: '1402/09/13', category: 'حقوق و دستمزد', bankId: '1', status: 'completed' },
  { id: '2', description: 'دریافت از مشتری - شرکت آلفا', amountRial: 8700000000, type: 'CREDIT', date: '1402/09/13', category: 'فروش', bankId: '3', status: 'completed' },
  { id: '3', description: 'پرداخت به تامین‌کننده', amountRial: 3200000000, type: 'DEBIT', date: '1402/09/12', category: 'خرید', bankId: '2', status: 'completed' },
  { id: '4', description: 'دریافت سود سپرده', amountRial: 1850000000, type: 'CREDIT', date: '1402/09/12', category: 'سود بانکی', bankId: '3', status: 'completed' },
  { id: '5', description: 'پرداخت مالیات', amountRial: 5600000000, type: 'DEBIT', date: '1402/09/11', category: 'مالیات', bankId: '1', status: 'completed' },
  { id: '6', description: 'دریافت از مشتری - شرکت بتا', amountRial: 15200000000, type: 'CREDIT', date: '1402/09/11', category: 'فروش', bankId: '4', status: 'completed' },
  { id: '7', description: 'پرداخت پایا - تامین‌کننده گاما', amountRial: 2100000000, type: 'DEBIT', date: '1402/09/14', category: 'خرید', bankId: '1', status: 'pending' },
  { id: '8', description: 'چک دریافتی - شرکت دلتا', amountRial: 4500000000, type: 'CREDIT', date: '1402/09/14', category: 'فروش', bankId: '2', status: 'scheduled' },
];

export const dueDebts: DueDebt[] = [
  { id: '1', creditor: 'بانک ملت - تسهیلات', amountRial: 8500000000, dueDate: '1402/09/13', status: 'dueToday' },
  { id: '2', creditor: 'شرکت تامین‌کننده آلفا', amountRial: 3200000000, dueDate: '1402/09/13', status: 'dueToday' },
  { id: '3', creditor: 'سازمان امور مالیاتی', amountRial: 5600000000, dueDate: '1402/09/10', status: 'overdue' },
  { id: '4', creditor: 'بانک پاسارگاد - اقساط', amountRial: 2100000000, dueDate: '1402/09/15', status: 'upcoming' },
];

export const currencyPositions: CurrencyPosition[] = [
  { currency: 'USD', amount: 125000, equivalentRial: 85625000000, position: 'long' },
  { currency: 'EUR', amount: -15000, equivalentRial: -11250000000, position: 'short' },
  { currency: 'AED', amount: 50000, equivalentRial: 9350000000, position: 'long' },
];

export function formatMoney(amount: number, currencyMode: CurrencyMode): string {
  const value = currencyMode === 'TOMAN' ? amount / 10 : amount;
  return new Intl.NumberFormat('fa-IR').format(Math.round(value));
}

export function getCurrencyLabel(currencyMode: CurrencyMode): string {
  return currencyMode === 'RIAL' ? 'ریال' : 'تومان';
}

export function getTotalBalance(accounts: BankAccount[]): number {
  return accounts.reduce((sum, acc) => sum + acc.balanceRial, 0);
}

export function getTotalBlocked(accounts: BankAccount[]): number {
  return accounts.reduce((sum, acc) => sum + acc.blockedRial, 0);
}

export function getAvailableBalance(accounts: BankAccount[]): number {
  return getTotalBalance(accounts) - getTotalBlocked(accounts);
}

// Kyriba-style Available Liquidity calculation
export function getAvailableLiquidity(accounts: BankAccount[]): number {
  return accounts.reduce((sum, acc) => {
    const ledgerBalance = acc.balanceRial;
    const incomingCheques = acc.incomingCheques || 0;
    const blocked = acc.blockedRial;
    const pendingPaya = acc.pendingPayaOutflows || 0;
    return sum + ledgerBalance + incomingCheques - blocked - pendingPaya;
  }, 0);
}

export function getTotalDueToday(debts: DueDebt[]): number {
  return debts
    .filter(d => d.status === 'dueToday')
    .reduce((sum, d) => sum + d.amountRial, 0);
}

export function getTotalOverdue(debts: DueDebt[]): number {
  return debts
    .filter(d => d.status === 'overdue')
    .reduce((sum, d) => sum + d.amountRial, 0);
}

export function getNetCurrencyPosition(positions: CurrencyPosition[]): number {
  return positions.reduce((sum, p) => sum + p.equivalentRial, 0);
}

// Jalali date formatting utilities
export function getCurrentJalaliDate(): string {
  return jalaliMoment().locale('fa').format('jYYYY/jMM/jDD');
}

export function formatJalaliDate(date: string): string {
  return jalaliMoment(date, 'jYYYY/jMM/jDD').locale('fa').format('jD jMMMM jYYYY');
}

export function getJalaliWeekday(): string {
  return jalaliMoment().locale('fa').format('dddd');
}

export function getTransactionsByBank(transactions: Transaction[], bankId: string): Transaction[] {
  return transactions.filter(t => t.bankId === bankId);
}
