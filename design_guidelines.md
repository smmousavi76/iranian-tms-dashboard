# Iranian Treasury Management System (TMS) - Design Guidelines

## Design Approach
**Reference-Based:** Enterprise fintech dashboards (Bloomberg Terminal, Interactive Brokers, enterprise banking platforms) with focus on information density, data visualization, and professional aesthetics.

## Critical Requirements

### RTL & Typography
- **Direction:** Mandatory RTL (`dir="rtl"`) on root element
- **Font:** Vazirmatn from CDN for all Persian text
- **Text Hierarchy:** High contrast, legible text optimized for financial data readability

### Color System
- **Primary Palette:** Slate and Blue/Indigo tones
- **Background:** Light gray (`bg-slate-50`)
- **Cards:** White (`bg-white shadow-sm`)
- **Sidebar:** Professional dark theme
- **Status Colors:** 
  - Green for incoming transactions/positive values
  - Red for outgoing transactions/negative values
  - Yellow/Amber for warnings or blocked funds

### Layout Structure

**Sidebar (Dark Theme):**
- Fixed right-side placement (RTL)
- Navigation items: Dashboard, Accounts, Reports, Settings
- Professional, compact design with icons from Lucide-React

**Header:**
- Breadcrumbs (right-aligned)
- **Prominent Rial/Toman Toggle:** Large, easily accessible switch component
- User profile section (left side in RTL)

**Dashboard Grid:**
High-density information layout with these sections:

1. **Liquidity Summary Cards (Top Row):**
   - Three cards: Total Balance, Blocked Funds, Available Funds
   - Large numbers with formatted separators
   - Responsive to currency toggle
   - Subtle card shadows, rounded corners

2. **Cash Flow Forecast Chart (Primary Focus):**
   - Full-width Recharts Area Chart
   - Dual-zone display:
     - Solid line for 7-day actual data
     - Dotted line with shaded confidence interval for 7-day forecast
   - Jalali date labels on X-axis
   - Clean grid lines, professional styling

3. **Bank Positions Table:**
   - Compact table with visual hierarchy
   - Columns: Bank Name (with colored logo indicators), Account Number, Balance, Blocked Amount
   - Horizontal progress bars showing each bank's share of total liquidity
   - Alternating row colors for readability

4. **Recent Transactions Feed:**
   - List-style layout
   - Color-coded entries (green/red indicators)
   - Transaction description, amount, date, category
   - Compact spacing for information density

### Component Specifications

**Number Formatting:**
- Persian comma separators (e.g., `12,500,000`)
- Billion-scale corporate values
- Currency suffix based on toggle state

**Date Display:**
- Jalali calendar format (e.g., "1402/10/01")
- Right-aligned in RTL context

**Data Visualization:**
- Recharts with professional styling
- Subtle animations (minimal)
- Clear legends and labels
- Tooltips with formatted values

**Interactive Elements:**
- Toggle switch with clear ON/OFF states for Rial/Toman
- Table sorting capabilities
- Chart hover interactions showing detailed data points

### Spacing System
Use Tailwind spacing: `2, 4, 6, 8, 12, 16, 24` units
- Card padding: `p-6`
- Section spacing: `space-y-6` or `gap-6`
- Table cells: `px-4 py-3`

### Typography Scale
- **Large Numbers (Balances):** `text-3xl` or `text-4xl font-bold`
- **Card Titles:** `text-lg font-semibold`
- **Table Headers:** `text-sm font-medium`
- **Body Text:** `text-sm` or `text-base`
- **Captions:** `text-xs text-slate-500`

### Accessibility
- High contrast ratios for financial data
- Clear focus states on interactive elements
- Keyboard navigation support
- Screen reader-friendly labels for charts

### Images
No hero images or marketing visuals. This is a data-focused enterprise dashboard prioritizing information density over decorative elements.

## Key Principles
1. **Information Density:** Maximize data visibility without clutter
2. **Real-Time Responsiveness:** Currency toggle updates all values instantly
3. **Professional Aesthetic:** Enterprise-grade polish and attention to detail
4. **Cultural Appropriateness:** Proper RTL flow and Persian typography
5. **Data Clarity:** Visual hierarchy that guides eye to critical financial metrics