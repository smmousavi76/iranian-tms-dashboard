import { LiquiditySummaryCards } from '../LiquiditySummaryCards';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { accounts } from '@/data/mockData';

export default function LiquiditySummaryCardsExample() {
  return (
    <CurrencyProvider>
      <LiquiditySummaryCards accounts={accounts} />
    </CurrencyProvider>
  );
}
