import { Switch } from '@/components/ui/switch';
import { useCurrency } from '@/contexts/CurrencyContext';

export function CurrencyToggle() {
  const { currencyMode, toggleCurrency } = useCurrency();
  
  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-secondary border border-border rounded-md px-2 sm:px-3 py-1.5" dir="ltr">
      <button
        type="button"
        onClick={() => currencyMode !== 'TOMAN' && toggleCurrency()}
        className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
          currencyMode === 'TOMAN' ? 'text-foreground' : 'text-muted-foreground'
        }`}
        data-testid="button-currency-toman"
      >
        تومان
      </button>
      <Switch
        checked={currencyMode === 'TOMAN'}
        onCheckedChange={toggleCurrency}
        data-testid="switch-currency-toggle"
      />
      <button
        type="button"
        onClick={() => currencyMode !== 'RIAL' && toggleCurrency()}
        className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
          currencyMode === 'RIAL' ? 'text-foreground' : 'text-muted-foreground'
        }`}
        data-testid="button-currency-rial"
      >
        ریال
      </button>
    </div>
  );
}
