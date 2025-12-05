import { ForecastChart } from '../ForecastChart';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { forecastData } from '@/data/mockData';

export default function ForecastChartExample() {
  return (
    <CurrencyProvider>
      <ForecastChart data={forecastData} />
    </CurrencyProvider>
  );
}
