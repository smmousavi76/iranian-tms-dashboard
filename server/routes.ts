import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // AI Chat endpoint for financial analysis
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemPrompt = `شما یک دستیار هوش مصنوعی متخصص در تحلیل مالی و مدیریت خزانه‌داری هستید. 
      به سوالات کاربر درباره تحلیل داده‌های مالی، پیش‌بینی جریان نقدی، مدیریت نقدینگی و سایر موضوعات مالی پاسخ دهید.
      پاسخ‌ها باید به زبان فارسی و حرفه‌ای باشند.
      
      اطلاعات مالی فعلی:
      ${context || 'اطلاعات مالی در دسترس نیست'}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Using gpt-4o-mini for faster responses
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_completion_tokens: 1024,
      });

      const reply = response.choices[0]?.message?.content || "متأسفانه پاسخی دریافت نشد.";
      
      res.json({ reply });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "خطا در پردازش درخواست" });
    }
  });

  // USD Exchange Rate endpoint (mock data for prototype)
  app.get("/api/exchange-rate", async (req, res) => {
    try {
      // todo: remove mock functionality - replace with real API call
      // Mock USD to IRR rate - in production, fetch from a real exchange rate API
      const mockRate = 685000 + Math.floor(Math.random() * 10000);
      res.json({ 
        rate: mockRate,
        currency: "USD/IRR",
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: "خطا در دریافت نرخ ارز" });
    }
  });

  return httpServer;
}
