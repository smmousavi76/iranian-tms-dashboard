import { DashboardHeader } from '@/components/DashboardHeader';
import { EnhancedKPIBar } from '@/components/EnhancedKPIBar';
import { WaterfallChart } from '@/components/WaterfallChart';
import { ForecastChart } from '@/components/ForecastChart';
import { BankPositionsTable } from '@/components/BankPositionsTable';
import { RecentTransactions } from '@/components/RecentTransactions';
import { AiChatWidget } from '@/components/AiChatWidget';
import { accounts, forecastData, transactions, waterfallData, dueDebts, currencyPositions } from '@/data/mockData';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="داشبورد" />
      <main className="flex-1 bg-background overflow-auto">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <EnhancedKPIBar 
            accounts={accounts} 
            dueDebts={dueDebts} 
            currencyPositions={currencyPositions} 
          />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <WaterfallChart data={waterfallData} />
            <ForecastChart data={forecastData} />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="xl:col-span-2">
              <BankPositionsTable accounts={accounts} />
            </div>
            <div className="xl:col-span-1">
              <AiChatWidget />
            </div>
          </div>
          <RecentTransactions transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
