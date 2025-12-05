import { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExchangeRate {
  rate: number;
  currency: string;
  lastUpdated: string;
}

export function UsdRateDisplay() {
  const [rateData, setRateData] = useState<ExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/exchange-rate');
      const data = await response.json();
      setRateData(data);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
    // Refresh every 5 minutes
    const interval = setInterval(fetchRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatRate = (rate: number) => {
    return new Intl.NumberFormat('fa-IR').format(rate);
  };

  return (
    <div className="flex items-center gap-2 bg-secondary border border-border rounded-md px-2 sm:px-3 py-1.5">
      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-muted-foreground hidden sm:inline">دلار:</span>
        <span className="text-xs sm:text-sm font-medium text-foreground" dir="ltr" data-testid="text-usd-rate">
          {rateData ? formatRate(rateData.rate) : '---'}
        </span>
        <span className="text-xs text-muted-foreground">ریال</span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6"
        onClick={fetchRate}
        disabled={isLoading}
        data-testid="button-refresh-rate"
      >
        <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
