import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Lock, CircleDollarSign } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatMoney, getCurrencyLabel, type BankAccount, getTotalBalance, getTotalBlocked, getAvailableBalance } from '@/data/mockData';

interface LiquiditySummaryCardsProps {
  accounts: BankAccount[];
}

export function LiquiditySummaryCards({ accounts }: LiquiditySummaryCardsProps) {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);
  
  const totalBalance = getTotalBalance(accounts);
  const totalBlocked = getTotalBlocked(accounts);
  const availableBalance = getAvailableBalance(accounts);
  
  const cards = [
    {
      title: 'مجموع موجودی',
      value: totalBalance,
      icon: Wallet,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'مبلغ مسدود شده',
      value: totalBlocked,
      icon: Lock,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'موجودی قابل برداشت',
      value: availableBalance,
      icon: CircleDollarSign,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="border border-card-border">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-1.5 sm:p-2 rounded-md ${card.iconBg}`}>
              <card.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${card.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground" data-testid={`text-${card.title}`}>
                {formatMoney(card.value, currencyMode)}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">{currencyLabel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
