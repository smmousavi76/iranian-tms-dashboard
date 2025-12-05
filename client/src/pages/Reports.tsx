import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const reportTypes = [
  {
    id: 'cash-flow',
    title: 'گزارش جریان نقدی',
    description: 'تحلیل ورودی و خروجی وجوه نقد در بازه زمانی مشخص',
    icon: TrendingUp,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'bank-balance',
    title: 'گزارش موجودی بانک‌ها',
    description: 'وضعیت موجودی تمام حساب‌های بانکی به تفکیک',
    icon: DollarSign,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'forecast-accuracy',
    title: 'دقت پیش‌بینی',
    description: 'مقایسه پیش‌بینی‌های انجام شده با مقادیر واقعی',
    icon: FileBarChart,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'expense-analysis',
    title: 'تحلیل هزینه‌ها',
    description: 'بررسی و دسته‌بندی هزینه‌های سازمان',
    icon: TrendingDown,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
  },
];

export default function Reports() {
  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="گزارش‌ها" />
      <main className="flex-1 bg-background overflow-auto">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">گزارش‌ها</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">تولید و مشاهده گزارش‌های مالی</p>
            </div>
            <Button variant="outline" data-testid="button-date-range">
              <Calendar className="w-4 h-4 ml-2" />
              انتخاب بازه زمانی
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <Card key={report.id} className="border border-card-border hover-elevate" data-testid={`card-report-${report.id}`}>
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className={`p-3 rounded-md ${report.iconBg}`}>
                    <report.icon className={`w-6 h-6 ${report.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleGenerateReport(report.id)}
                      data-testid={`button-generate-${report.id}`}
                    >
                      تولید گزارش
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-testid={`button-download-${report.id}`}
                    >
                      <Download className="w-4 h-4 ml-1" />
                      دانلود
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
