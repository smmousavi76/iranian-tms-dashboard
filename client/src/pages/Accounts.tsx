import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreVertical, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { accounts, formatMoney, getCurrencyLabel } from '@/data/mockData';

export default function Accounts() {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="حساب‌های بانکی" />
      <main className="flex-1 bg-background overflow-auto">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">حساب‌های بانکی</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">مدیریت و نظارت بر حساب‌های بانکی شرکت</p>
            </div>
            <Button data-testid="button-add-account">
              <Plus className="w-4 h-4 ml-2" />
              افزودن حساب جدید
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="border border-card-border" data-testid={`card-account-${account.id}`}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md ${account.logoColor} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">
                        {account.bankName.split(' ')[1]?.charAt(0) || account.bankName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{account.bankName}</CardTitle>
                      <p className="text-sm text-muted-foreground font-mono" dir="ltr">
                        {account.accountNumber}
                      </p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">موجودی کل</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatMoney(account.balanceRial, currencyMode)}
                        <span className="text-sm font-normal text-muted-foreground mr-1">{currencyLabel}</span>
                      </p>
                    </div>
                    {account.blockedRial > 0 && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        مسدود: {formatMoney(account.blockedRial, currencyMode)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                      انتقال
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowDownLeft className="w-4 h-4 ml-1" />
                      دریافت
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
