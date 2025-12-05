import { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { 
  formatMoney, 
  getCurrencyLabel, 
  accounts, 
  transactions,
  type Transaction,
  getAvailableLiquidity,
  getTotalBalance,
  getTotalBlocked,
  getTransactionsByBank
} from '@/data/mockData';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Download, 
  ArrowDownLeft,
  ArrowUpRight,
  Calculator,
  Layers,
  Building2
} from 'lucide-react';

type GroupBy = 'none' | 'bank';

interface AccountRowData {
  id: string;
  name: string;
  accountNumber: string;
  logoColor: string;
  balance: number;
  blocked: number;
  incomingCheques: number;
  pendingPaya: number;
  available: number;
  transactions: Transaction[];
}

interface GroupData {
  name: string;
  accounts: AccountRowData[];
  totalBalance: number;
  totalBlocked: number;
  totalIncoming: number;
  totalPending: number;
  totalAvailable: number;
}

export default function CashPosition() {
  const { currencyMode } = useCurrency();
  const currencyLabel = getCurrencyLabel(currencyMode);
  const [groupBy, setGroupBy] = useState<GroupBy>('none');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['all']));
  const [sortColumn, setSortColumn] = useState<string>('balance');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const toggleGroup = (name: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedGroups(newExpanded);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const accountData = useMemo((): AccountRowData[] => {
    const data = accounts.map(acc => ({
      id: acc.id,
      name: acc.bankName,
      accountNumber: acc.accountNumber,
      logoColor: acc.logoColor,
      balance: acc.balanceRial,
      blocked: acc.blockedRial,
      incomingCheques: acc.incomingCheques || 0,
      pendingPaya: acc.pendingPayaOutflows || 0,
      available: acc.balanceRial - acc.blockedRial + (acc.incomingCheques || 0) - (acc.pendingPayaOutflows || 0),
      transactions: getTransactionsByBank(transactions, acc.id)
    }));

    return data.sort((a, b) => {
      const aVal = a[sortColumn as keyof AccountRowData] as number;
      const bVal = b[sortColumn as keyof AccountRowData] as number;
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [sortColumn, sortDirection]);

  const groupedData = useMemo((): GroupData[] => {
    if (groupBy === 'none') {
      return [{
        name: 'all',
        accounts: accountData,
        totalBalance: accountData.reduce((sum, a) => sum + a.balance, 0),
        totalBlocked: accountData.reduce((sum, a) => sum + a.blocked, 0),
        totalIncoming: accountData.reduce((sum, a) => sum + a.incomingCheques, 0),
        totalPending: accountData.reduce((sum, a) => sum + a.pendingPaya, 0),
        totalAvailable: accountData.reduce((sum, a) => sum + a.available, 0),
      }];
    }
    
    // Group by bank - each bank becomes its own group
    return accountData.map(acc => ({
      name: acc.name,
      accounts: [acc],
      totalBalance: acc.balance,
      totalBlocked: acc.blocked,
      totalIncoming: acc.incomingCheques,
      totalPending: acc.pendingPaya,
      totalAvailable: acc.available,
    }));
  }, [accountData, groupBy]);

  const totals = useMemo(() => ({
    balance: getTotalBalance(accounts),
    blocked: getTotalBlocked(accounts),
    incomingCheques: accounts.reduce((sum, a) => sum + (a.incomingCheques || 0), 0),
    pendingPaya: accounts.reduce((sum, a) => sum + (a.pendingPayaOutflows || 0), 0),
    available: getAvailableLiquidity(accounts),
    transactions: transactions.length
  }), []);

  const SortableHeader = ({ column, label }: { column: string; label: string }) => (
    <th 
      className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-3 px-4 cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(column)}
      data-testid={`header-${column}`}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortColumn === column && (
          sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
        )}
      </div>
    </th>
  );

  const renderRows = () => {
    const rows: JSX.Element[] = [];

    groupedData.forEach((group) => {
      const isGroupExpanded = expandedGroups.has(group.name);
      
      if (groupBy !== 'none') {
        // Render group header row
        rows.push(
          <tr 
            key={`group-${group.name}`}
            className="bg-primary/5 border-b border-border cursor-pointer hover-elevate"
            onClick={() => toggleGroup(group.name)}
            data-testid={`row-group-${group.name}`}
          >
            <td className="py-3 px-4">
              <Button size="icon" variant="ghost" className="h-6 w-6">
                {isGroupExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </td>
            <td className="py-3 px-4" colSpan={2}>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{group.name}</span>
                <Badge variant="secondary" className="text-xs">{group.accounts.length} حساب</Badge>
              </div>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm font-semibold text-foreground">{formatMoney(group.totalBalance, currencyMode)}</span>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+{formatMoney(group.totalIncoming, currencyMode)}</span>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">-{formatMoney(group.totalBlocked, currencyMode)}</span>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">-{formatMoney(group.totalPending, currencyMode)}</span>
            </td>
            <td className="py-3 px-4">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(group.totalAvailable, currencyMode)}</span>
            </td>
          </tr>
        );
      }
      
      // Render account rows (if no grouping or if group is expanded)
      if (groupBy === 'none' || isGroupExpanded) {
        group.accounts.forEach((row, index) => {
          const isExpanded = expandedRows.has(row.id);
          
          rows.push(
            <tr 
              key={row.id}
              className={`border-b border-border cursor-pointer hover-elevate ${
                index % 2 === 1 ? 'bg-muted/20' : ''
              } ${groupBy !== 'none' ? 'pr-8' : ''}`}
              onClick={() => toggleRow(row.id)}
              data-testid={`row-position-${row.id}`}
            >
              <td className="py-3 px-4">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6"
                  data-testid={`button-expand-${row.id}`}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${row.logoColor}`} />
                  <span className="text-sm font-medium text-foreground">{row.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-muted-foreground font-mono" dir="ltr">{row.accountNumber}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-foreground" data-testid={`text-balance-${row.id}`}>{formatMoney(row.balance, currencyMode)}</span>
              </td>
              <td className="py-3 px-4">
                {row.incomingCheques > 0 ? (
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+{formatMoney(row.incomingCheques, currencyMode)}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {row.blocked > 0 ? (
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">-{formatMoney(row.blocked, currencyMode)}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                {row.pendingPaya > 0 ? (
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">-{formatMoney(row.pendingPaya, currencyMode)}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400" data-testid={`text-available-${row.id}`}>{formatMoney(row.available, currencyMode)}</span>
              </td>
            </tr>
          );
          
          if (isExpanded) {
            rows.push(
              <tr key={`${row.id}-details`} className="bg-muted/30">
                <td colSpan={8} className="p-0">
                  <div className="p-4 border-r-4 border-primary mr-4" data-testid={`details-${row.id}`}>
                    <div className="text-xs font-medium text-muted-foreground mb-3">تراکنش‌های اخیر - {row.name}</div>
                    {row.transactions.length > 0 ? (
                      <div className="space-y-2">
                        {row.transactions.slice(0, 5).map((tx) => (
                          <div 
                            key={tx.id} 
                            className="flex items-center justify-between gap-2 p-3 bg-card rounded-md border border-border"
                            data-testid={`detail-tx-${tx.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-full ${
                                tx.type === 'CREDIT' 
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                                  : 'bg-red-100 dark:bg-red-900/30'
                              }`}>
                                {tx.type === 'CREDIT' ? (
                                  <ArrowDownLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">{tx.description}</div>
                                <div className="text-xs text-muted-foreground">{tx.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs">{tx.category}</Badge>
                              <span className={`text-sm font-medium ${
                                tx.type === 'CREDIT' 
                                  ? 'text-emerald-600 dark:text-emerald-400' 
                                  : 'text-red-600 dark:text-red-400'
                              }`}>
                                {tx.type === 'CREDIT' ? '+' : '-'}
                                {formatMoney(tx.amountRial, currencyMode)} {currencyLabel}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-4">تراکنشی ثبت نشده است</div>
                    )}
                  </div>
                </td>
              </tr>
            );
          }
        });
      }
    });

    return rows;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader 
        title="کاربرگ موقعیت نقدینگی" 
        breadcrumbs={[{ label: 'مدیریت نقدینگی' }]}
      />
      <main className="flex-1 bg-background overflow-auto">
        <div className="mx-auto w-full max-w-7xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          
          <Card className="border border-card-border">
            <CardHeader className="pb-3 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold">کاربرگ موقعیت نقدینگی</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    برای مرتب‌سازی روی عنوان ستون کلیک کنید - برای گروه‌بندی از منوی سمت راست استفاده کنید
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Select value={groupBy} onValueChange={(v) => setGroupBy(v as GroupBy)}>
                    <SelectTrigger className="w-[160px]" data-testid="select-group-by">
                      <Layers className="w-4 h-4 ml-2" />
                      <SelectValue placeholder="گروه‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون گروه‌بندی</SelectItem>
                      <SelectItem value="bank">گروه‌بندی بر اساس بانک</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" data-testid="button-filter">
                    <Filter className="w-4 h-4 ml-2" />
                    فیلتر
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-export">
                    <Download className="w-4 h-4 ml-2" />
                    خروجی اکسل
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]" data-testid="table-cash-position">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-3 px-4 w-8"></th>
                      <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-3 px-4">نام بانک</th>
                      <th className="text-right text-xs sm:text-sm font-medium text-muted-foreground py-3 px-4">شماره حساب</th>
                      <SortableHeader column="balance" label="موجودی دفتری" />
                      <SortableHeader column="incomingCheques" label="چک‌های وصولی" />
                      <SortableHeader column="blocked" label="مبلغ مسدود" />
                      <SortableHeader column="pendingPaya" label="پایا در انتظار" />
                      <SortableHeader column="available" label="نقدینگی در دسترس" />
                    </tr>
                  </thead>
                  <tbody>
                    {renderRows()}
                    <tr className="bg-primary/5 border-t-2 border-primary font-semibold">
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-foreground">جمع کل</span>
                      </td>
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-foreground" data-testid="text-total-balance">{formatMoney(totals.balance, currencyMode)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+{formatMoney(totals.incomingCheques, currencyMode)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">-{formatMoney(totals.blocked, currencyMode)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">-{formatMoney(totals.pendingPaya, currencyMode)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400" data-testid="text-total-available">{formatMoney(totals.available, currencyMode)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-card-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <CardTitle className="text-base sm:text-lg font-semibold">فرمول محاسبه نقدینگی در دسترس (Kyriba)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm border border-border" dir="ltr">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Available Liquidity</span> = 
                <span className="text-blue-600 dark:text-blue-400"> (Ledger Balance)</span> + 
                <span className="text-green-600 dark:text-green-400"> (Incoming Cleared Cheques)</span> - 
                <span className="text-amber-600 dark:text-amber-400"> (Blocked Amounts)</span> - 
                <span className="text-red-600 dark:text-red-400"> (Pending PAYA Outflows)</span>
              </div>
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-xs text-blue-700 dark:text-blue-300 mb-1">موجودی دفتری</div>
                  <div className="text-sm font-bold text-blue-800 dark:text-blue-200">{formatMoney(totals.balance, currencyMode)}</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-xs text-green-700 dark:text-green-300 mb-1">چک‌های وصولی</div>
                  <div className="text-sm font-bold text-green-800 dark:text-green-200">+ {formatMoney(totals.incomingCheques, currencyMode)}</div>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="text-xs text-amber-700 dark:text-amber-300 mb-1">مبالغ مسدود</div>
                  <div className="text-sm font-bold text-amber-800 dark:text-amber-200">- {formatMoney(totals.blocked, currencyMode)}</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="text-xs text-red-700 dark:text-red-300 mb-1">پایاهای در انتظار</div>
                  <div className="text-sm font-bold text-red-800 dark:text-red-200">- {formatMoney(totals.pendingPaya, currencyMode)}</div>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 lg:col-span-1 col-span-2">
                  <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">نقدینگی در دسترس</div>
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">= {formatMoney(totals.available, currencyMode)} {currencyLabel}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
