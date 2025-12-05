import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useState } from 'react';

export default function Settings() {
  const { currencyMode, setCurrencyMode } = useCurrency();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="تنظیمات" />
      <main className="flex-1 bg-background overflow-auto">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">تنظیمات</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">پیکربندی سامانه مدیریت خزانه‌داری</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border border-card-border">
              <CardHeader>
                <CardTitle>تنظیمات نمایش</CardTitle>
                <CardDescription>تنظیمات مربوط به نحوه نمایش اطلاعات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="currency-select">واحد پول پیش‌فرض</Label>
                    <p className="text-sm text-muted-foreground">واحد نمایش مبالغ را انتخاب کنید</p>
                  </div>
                  <Select 
                    value={currencyMode} 
                    onValueChange={(value) => setCurrencyMode(value as 'RIAL' | 'TOMAN')}
                  >
                    <SelectTrigger className="w-32" data-testid="select-currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RIAL">ریال</SelectItem>
                      <SelectItem value="TOMAN">تومان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="auto-refresh">به‌روزرسانی خودکار</Label>
                    <p className="text-sm text-muted-foreground">داده‌ها هر ۵ دقیقه به‌روز شوند</p>
                  </div>
                  <Switch 
                    id="auto-refresh"
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                    data-testid="switch-auto-refresh"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-card-border">
              <CardHeader>
                <CardTitle>اعلان‌ها</CardTitle>
                <CardDescription>تنظیمات مربوط به اعلان‌ها و هشدارها</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="notifications">اعلان‌های سیستمی</Label>
                    <p className="text-sm text-muted-foreground">نمایش اعلان‌ها در داشبورد</p>
                  </div>
                  <Switch 
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    data-testid="switch-notifications"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <Label htmlFor="email-alerts">ایمیل هشدار</Label>
                    <p className="text-sm text-muted-foreground">ارسال هشدارها از طریق ایمیل</p>
                  </div>
                  <Switch 
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                    data-testid="switch-email-alerts"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-card-border">
              <CardHeader>
                <CardTitle>پروفایل کاربری</CardTitle>
                <CardDescription>اطلاعات حساب کاربری شما</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input id="name" defaultValue="محمد کریمی" data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input id="email" type="email" defaultValue="m.karimi@company.ir" dir="ltr" data-testid="input-email" />
                </div>
                <Button data-testid="button-save-profile">ذخیره تغییرات</Button>
              </CardContent>
            </Card>

            <Card className="border border-card-border">
              <CardHeader>
                <CardTitle>امنیت</CardTitle>
                <CardDescription>تنظیمات امنیتی حساب کاربری</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">رمز عبور فعلی</Label>
                  <Input id="current-password" type="password" data-testid="input-current-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">رمز عبور جدید</Label>
                  <Input id="new-password" type="password" data-testid="input-new-password" />
                </div>
                <Button variant="outline" data-testid="button-change-password">تغییر رمز عبور</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
