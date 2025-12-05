import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator, 
  BreadcrumbPage 
} from '@/components/ui/breadcrumb';
import { CurrencyToggle } from './CurrencyToggle';
import { UsdRateDisplay } from './UsdRateDisplay';
import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface DashboardHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function DashboardHeader({ title, breadcrumbs = [] }: DashboardHeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const renderBreadcrumbItems = () => {
    const items: JSX.Element[] = [];
    
    items.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
      </BreadcrumbItem>
    );
    
    breadcrumbs.forEach((crumb, index) => {
      items.push(<BreadcrumbSeparator key={`sep-${index}`} />);
      items.push(
        <BreadcrumbItem key={`crumb-${index}`}>
          {crumb.href ? (
            <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
      );
    });
    
    items.push(<BreadcrumbSeparator key="sep-final" />);
    items.push(
      <BreadcrumbItem key="current">
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    );
    
    return items;
  };

  return (
    <header className="flex items-center justify-between gap-2 border-b border-border bg-card px-3 py-2 sm:px-4 sm:py-3 sticky top-0 z-50 flex-wrap">
      <div className="flex items-center gap-2 sm:gap-3">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {renderBreadcrumbItems()}
          </BreadcrumbList>
        </Breadcrumb>
        <span className="sm:hidden text-sm font-medium text-foreground">{title}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <UsdRateDisplay />
        <CurrencyToggle />
        <Button 
          size="icon" 
          variant="ghost"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button size="icon" variant="ghost" data-testid="button-notifications" className="hidden sm:flex">
          <Bell className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
