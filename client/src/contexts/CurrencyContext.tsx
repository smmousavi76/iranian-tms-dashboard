import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CurrencyMode } from '@/data/mockData';

interface CurrencyContextType {
  currencyMode: CurrencyMode;
  toggleCurrency: () => void;
  setCurrencyMode: (mode: CurrencyMode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyMode, setCurrencyMode] = useState<CurrencyMode>('RIAL');

  const toggleCurrency = () => {
    setCurrencyMode(prev => prev === 'RIAL' ? 'TOMAN' : 'RIAL');
  };

  return (
    <CurrencyContext.Provider value={{ currencyMode, toggleCurrency, setCurrencyMode }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
