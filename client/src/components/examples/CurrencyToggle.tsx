import { CurrencyToggle } from '../CurrencyToggle';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export default function CurrencyToggleExample() {
  return (
    <CurrencyProvider>
      <CurrencyToggle />
    </CurrencyProvider>
  );
}
