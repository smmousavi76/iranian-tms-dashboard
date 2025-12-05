import { useMemo } from 'react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatMoney, getCurrencyLabel, type ForecastDataPoint } from '@/data/mockData';

interface ForecastChartProps {
  data: ForecastDataPoint[];
}

export function ForecastChart({ data }: ForecastChartProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);
  
  const chartData = useMemo(() => {
    return data.map(item => ({
      ...item,
      displayAmount: currencyMode === 'TOMAN' ? item.amount / 10 : item.amount,
      displayRangeLow: item.range ? (currencyMode === 'TOMAN' ? item.range[0] / 10 : item.range[0]) : undefined,
      displayRangeHigh: item.range ? (currencyMode === 'TOMAN' ? item.range[1] / 10 : item.range[1]) : undefined,
    }));
  }, [data, currencyMode]);

  const lastActualIndex = chartData.findIndex(d => d.type === 'Forecast') - 1;
  const lastActualDate = lastActualIndex >= 0 ? chartData[lastActualIndex].date : '';

  const formatYAxis = (value: number) => {
    if (value >= 1000000000000) {
      return `${(value / 1000000000000).toFixed(0)} هزار میلیارد`;
    }
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)} میلیارد`;
    }
    return formatMoney(value, currencyMode);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-card border border-card-border rounded-md p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            {item.type === 'Actual' ? 'واقعی' : 'پیش‌بینی'}
          </p>
          <p className="text-base font-bold text-foreground">
            {formatMoney(item.amount, currencyMode)} {currencyLabel}
          </p>
          {item.range && (
            <p className="text-xs text-muted-foreground mt-1">
              بازه: {formatMoney(item.range[0], currencyMode)} - {formatMoney(item.range[1], currencyMode)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-card-border">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <CardTitle className="text-base sm:text-lg font-semibold">پیش‌بینی جریان نقدی</CardTitle>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">واقعی</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/50 border-2 border-dashed border-primary" />
            <span className="text-muted-foreground">پیش‌بینی</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                className="text-muted-foreground"
                interval="preserveStartEnd"
              />
              <YAxis 
                tickFormatter={formatYAxis}
                tick={{ fontSize: 9 }}
                className="text-muted-foreground"
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              {lastActualDate && (
                <ReferenceLine 
                  x={lastActualDate} 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeDasharray="5 5"
                  label={{ value: 'امروز', position: 'top', fontSize: 10 }}
                />
              )}
              <Area
                type="monotone"
                dataKey="displayAmount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#actualGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
