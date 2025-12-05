import { DashboardHeader } from '../DashboardHeader';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardHeaderExample() {
  return (
    <SidebarProvider>
      <CurrencyProvider>
        <DashboardHeader title="داشبورد" />
      </CurrencyProvider>
    </SidebarProvider>
  );
}
