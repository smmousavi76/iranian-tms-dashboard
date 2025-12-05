import { BankPositionsTable } from '../BankPositionsTable';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { accounts } from '@/data/mockData';

export default function BankPositionsTableExample() {
  return (
    <CurrencyProvider>
      <BankPositionsTable accounts={accounts} />
    </CurrencyProvider>
  );
}
