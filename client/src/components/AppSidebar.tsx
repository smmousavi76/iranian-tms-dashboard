import { useLocation, Link } from 'wouter';
import { 
  LayoutDashboard, 
  Building2, 
  FileBarChart, 
  Settings,
  TrendingUp,
  Wallet,
  Calculator
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'داشبورد', url: '/', icon: LayoutDashboard },
  { title: 'موقعیت نقدینگی', url: '/cash-position', icon: Calculator },
  { title: 'حساب‌های بانکی', url: '/accounts', icon: Building2 },
  { title: 'گزارش‌ها', url: '/reports', icon: FileBarChart },
  { title: 'تنظیمات', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold text-sidebar-foreground">خزانه‌داری</span>
            <span className="text-xs text-sidebar-foreground/60">سامانه مدیریت مالی</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">منوی اصلی</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.url} data-testid={`link-nav-${item.title}`}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-sidebar-accent-foreground">مک</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">محمد کریمی</span>
            <span className="text-xs text-sidebar-foreground/60">مدیر مالی</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
