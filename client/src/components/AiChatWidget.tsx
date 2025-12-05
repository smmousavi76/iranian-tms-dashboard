import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { accounts, getTotalBalance, getTotalBlocked, getAvailableBalance, formatMoney } from '@/data/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AiChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { currencyMode } = useCurrency();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getFinancialContext = () => {
    const totalBalance = getTotalBalance(accounts);
    const totalBlocked = getTotalBlocked(accounts);
    const availableBalance = getAvailableBalance(accounts);
    
    return `
    مجموع موجودی: ${formatMoney(totalBalance, currencyMode)} ${currencyMode === 'RIAL' ? 'ریال' : 'تومان'}
    مبلغ مسدود شده: ${formatMoney(totalBlocked, currencyMode)} ${currencyMode === 'RIAL' ? 'ریال' : 'تومان'}
    موجودی قابل برداشت: ${formatMoney(availableBalance, currencyMode)} ${currencyMode === 'RIAL' ? 'ریال' : 'تومان'}
    تعداد حساب‌های بانکی: ${accounts.length}
    `;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          context: getFinancialContext()
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'متأسفانه پاسخی دریافت نشد.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    'تحلیل وضعیت نقدینگی',
    'پیشنهاد برای کاهش مبالغ مسدود',
    'پیش‌بینی جریان نقدی هفته آینده'
  ];

  return (
    <Card className="border border-card-border flex flex-col h-[400px]">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-base sm:text-lg font-semibold">دستیار هوش مصنوعی مالی</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Bot className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                سوالات خود را درباره تحلیل داده‌های مالی بپرسید
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(q)}
                    className="text-xs"
                    data-testid={`button-suggestion-${i}`}
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-1.5 rounded-full shrink-0 ${
                    msg.role === 'user' 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}>
                    {msg.role === 'user' ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="p-1.5 rounded-full bg-muted shrink-0">
                    <Bot className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="سوال خود را بنویسید..."
              className="min-h-[44px] max-h-[100px] resize-none text-sm"
              data-testid="input-chat-message"
            />
            <Button 
              size="icon" 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
