import { RecentTransactions } from '../RecentTransactions';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { transactions } from '@/data/mockData';

export default function RecentTransactionsExample() {
  return (
    <CurrencyProvider>
      <RecentTransactions transactions={transactions} />
    </CurrencyProvider>
  );
}
