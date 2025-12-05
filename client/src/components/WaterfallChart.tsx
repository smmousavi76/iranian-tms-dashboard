import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatMoney, getCurrencyLabel, type WaterfallDataPoint } from '@/data/mockData';

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
}

interface ChartDataItem {
  name: string;
  delta: number;
  runningTotal: number;
  type: 'start' | 'positive' | 'negative' | 'end';
  isTotal: boolean;
}

export function WaterfallChart({ data }: WaterfallChartProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);

  // Calculate chart data with running totals
  const chartData: ChartDataItem[] = (() => {
    let runningTotal = 0;
    
    return data.map((item) => {
      if (item.type === 'start') {
        runningTotal = item.value;
        return {
          name: item.name,
          delta: item.value,
          runningTotal: item.value,
          type: item.type,
          isTotal: true,
        };
      } else if (item.type === 'end') {
        return {
          name: item.name,
          delta: runningTotal,
          runningTotal: runningTotal,
          type: item.type,
          isTotal: true,
        };
      } else if (item.type === 'positive') {
        runningTotal += item.value;
        return {
          name: item.name,
          delta: item.value,
          runningTotal: runningTotal,
          type: item.type,
          isTotal: false,
        };
      } else {
        runningTotal += item.value;
        return {
          name: item.name,
          delta: Math.abs(item.value),
          runningTotal: runningTotal,
          type: item.type,
          isTotal: false,
        };
      }
    });
  })();

  const getBarColor = (type: string) => {
    switch (type) {
      case 'start': return '#3b82f6';
      case 'positive': return '#22c55e';
      case 'negative': return '#ef4444';
      case 'end': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getBarLabel = (type: string) => {
    switch (type) {
      case 'start': return 'موجودی اولیه';
      case 'positive': return 'ورودی';
      case 'negative': return 'خروجی';
      case 'end': return 'موجودی نهایی';
      default: return '';
    }
  };

  // Find max value for scaling
  const maxDelta = Math.max(...chartData.map(d => d.delta));
  const maxTotal = Math.max(...chartData.map(d => d.runningTotal));
  const maxValue = Math.max(maxDelta, maxTotal);

  const formatValue = (value: number) => {
    const val = currencyMode === 'TOMAN' ? value / 10 : value;
    if (val >= 1e12) return `${(val / 1e12).toFixed(1)}T`;
    if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(0)}M`;
    return val.toLocaleString('fa-IR');
  };

  const barHeight = (value: number) => {
    return (value / maxValue) * 180;
  };

  return (
    <Card className="border border-card-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold">نمودار آبشاری جریان نقدی</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" data-testid="chart-waterfall" dir="rtl">
          {/* Chart Area */}
          <div className="flex items-end justify-around gap-3 sm:gap-4 h-[280px] sm:h-[320px] px-2 sm:px-4 pb-4 border-b border-border">
            {chartData.map((item, index) => {
              const height = barHeight(item.delta);
              const color = getBarColor(item.type);
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center flex-1 max-w-[100px]"
                >
                  {/* Value Label on top */}
                  <div className="mb-2 text-center">
                    <span 
                      className="text-xs sm:text-sm font-bold block"
                      style={{ color }}
                    >
                      {item.type === 'negative' ? '-' : item.type === 'positive' ? '+' : ''}
                      {formatValue(item.delta)}
                    </span>
                    {!item.isTotal && (
                      <span className="text-[10px] text-muted-foreground block mt-0.5">
                        مجموع: {formatValue(item.runningTotal)}
                      </span>
                    )}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full rounded-t-lg transition-all duration-500 ease-out relative group cursor-pointer"
                    style={{ 
                      height: `${Math.max(height, 20)}px`,
                      backgroundColor: color,
                      minHeight: '20px',
                      boxShadow: `0 2px 8px ${color}40`
                    }}
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg p-2 shadow-lg z-10 whitespace-nowrap pointer-events-none">
                      <p className="text-xs font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === 'negative' ? '-' : item.type === 'positive' ? '+' : ''}
                        {formatMoney(item.delta, currencyMode)} {currencyLabel}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-Axis Labels */}
          <div className="flex justify-around gap-3 sm:gap-4 px-2 sm:px-4 pt-3">
            {chartData.map((item, index) => (
              <div 
                key={index} 
                className="flex-1 max-w-[100px] text-center"
              >
                <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight block">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }} />
            <span className="text-xs sm:text-sm text-muted-foreground">موجودی اولیه</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }} />
            <span className="text-xs sm:text-sm text-muted-foreground">ورودی</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }} />
            <span className="text-xs sm:text-sm text-muted-foreground">خروجی</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }} />
            <span className="text-xs sm:text-sm text-muted-foreground">موجودی نهایی</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 mb-1">موجودی اول روز</div>
            <div className="text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300">
              {formatMoney(chartData[0]?.delta || 0, currencyMode)}
            </div>
          </div>
          <div className="text-center p-2 bg-green-50 dark:bg-green-950/30 rounded-lg">
            <div className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 mb-1">کل ورودی‌ها</div>
            <div className="text-xs sm:text-sm font-bold text-green-700 dark:text-green-300">
              +{formatMoney(
                chartData.filter(d => d.type === 'positive').reduce((sum, d) => sum + d.delta, 0),
                currencyMode
              )}
            </div>
          </div>
          <div className="text-center p-2 bg-red-50 dark:bg-red-950/30 rounded-lg">
            <div className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 mb-1">کل خروجی‌ها</div>
            <div className="text-xs sm:text-sm font-bold text-red-700 dark:text-red-300">
              -{formatMoney(
                chartData.filter(d => d.type === 'negative').reduce((sum, d) => sum + d.delta, 0),
                currencyMode
              )}
            </div>
          </div>
          <div className="text-center p-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
            <div className="text-[10px] sm:text-xs text-purple-600 dark:text-purple-400 mb-1">موجودی پایان روز</div>
            <div className="text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-300">
              {formatMoney(chartData[chartData.length - 1]?.runningTotal || 0, currencyMode)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
