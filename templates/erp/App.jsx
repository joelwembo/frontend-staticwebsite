import { useState } from 'react'
import {
  LayoutDashboard, Package, Truck, DollarSign, BarChart3, Settings, Menu, X,
  Warehouse, FileText, Users, ShoppingCart, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight,
  ChevronRight, Bell, Search, Filter, Download, RefreshCw, Eye,
  Calendar, Globe, Layers, Activity, PieChart, Box, CreditCard,
  Building2, ChevronDown, UserPlus, Briefcase, CircleDollarSign,
  ClipboardList, Receipt, Banknote, UserCheck, Star, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExportCsvButton } from './components/ExportCsvButton'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, AreaChart, BarChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { CommandPalette } from '@/components/shared/CommandPalette'
import { useTheme } from '@/context/ThemeContext'

/* ------------------------------------------------------------------ */
/*  SIDEBAR DATA                                                       */
/* ------------------------------------------------------------------ */

const sidebarSections = [
  {
    title: 'Main',
    links: [
      { icon: LayoutDashboard, label: 'Dashboard', tab: 'overview', active: true },
      { icon: BarChart3, label: 'Analytics', tab: 'overview' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { icon: Package, label: 'Inventory', tab: 'inventory', badge: 5 },
      { icon: ShoppingCart, label: 'Purchase Orders', tab: 'orders' },
      { icon: FileText, label: 'Sales Orders', tab: 'orders' },
      { icon: Truck, label: 'Shipping', tab: 'orders' },
      { icon: Warehouse, label: 'Warehouses', tab: 'inventory' },
    ],
  },
  {
    title: 'Finance',
    links: [
      { icon: DollarSign, label: 'Accounting', tab: 'finance' },
      { icon: CreditCard, label: 'Invoices', tab: 'finance' },
      { icon: PieChart, label: 'Reports', tab: 'finance' },
    ],
  },
  {
    title: 'HR',
    links: [
      { icon: Users, label: 'Employees', tab: 'hr' },
      { icon: UserPlus, label: 'Recruiting', tab: 'hr' },
      { icon: Briefcase, label: 'Departments', tab: 'hr' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { icon: Settings, label: 'Settings', tab: 'overview' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  OVERVIEW DATA                                                      */
/* ------------------------------------------------------------------ */

const kpis = [
  { label: 'Revenue MTD', value: '$2.4M', change: '+14.2%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'Orders Today', value: '428', change: '+36', trend: 'up', icon: FileText, color: 'blue' },
  { label: 'Inventory Value', value: '$1.8M', change: '-1.4%', trend: 'down', icon: Package, color: 'violet' },
  { label: 'Pending Shipments', value: '73', change: '18 urgent', trend: 'neutral', icon: Truck, color: 'amber' },
  { label: 'Gross Margin', value: '34.2%', change: '+1.8pp', trend: 'up', icon: TrendingUp, color: 'cyan' },
  { label: 'Employee Count', value: '342', change: '+8 this mo', trend: 'up', icon: Users, color: 'pink' },
]

const revenueVsExpenses = [
  { label: 'Mar', value: 180 },
  { label: 'Apr', value: 195 },
  { label: 'May', value: 210 },
  { label: 'Jun', value: 185 },
  { label: 'Jul', value: 225 },
  { label: 'Aug', value: 240 },
  { label: 'Sep', value: 220 },
  { label: 'Oct', value: 260 },
  { label: 'Nov', value: 275 },
  { label: 'Dec', value: 250 },
  { label: 'Jan', value: 290 },
  { label: 'Feb', value: 310 },
]

const expenseData = [
  { label: 'Mar', value: 130 },
  { label: 'Apr', value: 140 },
  { label: 'May', value: 148 },
  { label: 'Jun', value: 135 },
  { label: 'Jul', value: 155 },
  { label: 'Aug', value: 162 },
  { label: 'Sep', value: 158 },
  { label: 'Oct', value: 170 },
  { label: 'Nov', value: 180 },
  { label: 'Dec', value: 175 },
  { label: 'Jan', value: 190 },
  { label: 'Feb', value: 204 },
]

const departmentPerformance = [
  { label: 'Mfg', value: 92, color: '#3b82f6' },
  { label: 'Sales', value: 87, color: '#10b981' },
  { label: 'Eng', value: 95, color: '#8b5cf6' },
  { label: 'Ops', value: 78, color: '#f59e0b' },
  { label: 'QA', value: 91, color: '#ec4899' },
  { label: 'CS', value: 84, color: '#06b6d4' },
]

const recentOrdersOverview = [
  { id: 'SO-2026-1847', customer: 'Apex Manufacturing Co', date: 'Feb 25, 2026', items: 14, total: '$18,420', status: 'processing', payment: 'paid' },
  { id: 'SO-2026-1846', customer: 'TechStart Industries', date: 'Feb 25, 2026', items: 7, total: '$9,750', status: 'shipped', payment: 'paid' },
  { id: 'SO-2026-1845', customer: 'Global Dynamics LLC', date: 'Feb 24, 2026', items: 32, total: '$41,200', status: 'delivered', payment: 'paid' },
  { id: 'SO-2026-1844', customer: 'InnovateTech Corp', date: 'Feb 24, 2026', items: 5, total: '$6,800', status: 'pending', payment: 'unpaid' },
  { id: 'SO-2026-1843', customer: 'DataFlow Systems', date: 'Feb 23, 2026', items: 11, total: '$13,200', status: 'processing', payment: 'partial' },
  { id: 'SO-2026-1842', customer: 'CloudNine Solutions', date: 'Feb 23, 2026', items: 19, total: '$24,900', status: 'shipped', payment: 'paid' },
  { id: 'SO-2026-1841', customer: 'Pinnacle Robotics', date: 'Feb 22, 2026', items: 8, total: '$11,340', status: 'delivered', payment: 'paid' },
  { id: 'SO-2026-1840', customer: 'Sterling Aerospace', date: 'Feb 22, 2026', items: 22, total: '$56,100', status: 'processing', payment: 'paid' },
]

/* ------------------------------------------------------------------ */
/*  INVENTORY DATA                                                     */
/* ------------------------------------------------------------------ */

const inventorySummary = [
  { label: 'Total SKUs', value: '2,847', icon: Box, color: 'blue' },
  { label: 'In Stock', value: '2,614', icon: CheckCircle2, color: 'emerald' },
  { label: 'Low Stock', value: '178', icon: AlertTriangle, color: 'amber' },
  { label: 'Out of Stock', value: '55', icon: AlertTriangle, color: 'red' },
]

const inventoryProducts = [
  { sku: 'NXM-1001', name: 'Industrial Sensor Module v3', category: 'Electronics', qty: 342, reorder: 200, warehouse: 'WH-Alpha', unitCost: '$48.50', status: 'in-stock' },
  { sku: 'NXM-1024', name: 'Precision Servo Motor 24V', category: 'Actuators', qty: 28, reorder: 100, warehouse: 'WH-Alpha', unitCost: '$124.00', status: 'low-stock' },
  { sku: 'NXM-2045', name: 'PCB Assembly Board Rev.C', category: 'Electronics', qty: 0, reorder: 150, warehouse: 'WH-Beta', unitCost: '$32.75', status: 'out-of-stock' },
  { sku: 'NXM-2078', name: 'Hydraulic Valve Unit HV-40', category: 'Hydraulics', qty: 15, reorder: 50, warehouse: 'WH-Alpha', unitCost: '$89.00', status: 'low-stock' },
  { sku: 'NXM-3012', name: 'LED Display Panel 7" IPS', category: 'Displays', qty: 512, reorder: 200, warehouse: 'WH-Gamma', unitCost: '$67.20', status: 'in-stock' },
  { sku: 'NXM-3056', name: 'Power Supply Unit 500W', category: 'Power', qty: 8, reorder: 60, warehouse: 'WH-Beta', unitCost: '$42.00', status: 'low-stock' },
  { sku: 'NXM-4001', name: 'Titanium Alloy Housing MK4', category: 'Enclosures', qty: 186, reorder: 100, warehouse: 'WH-Alpha', unitCost: '$156.80', status: 'in-stock' },
  { sku: 'NXM-4023', name: 'Thermal Compound TC-9', category: 'Materials', qty: 940, reorder: 500, warehouse: 'WH-Gamma', unitCost: '$8.50', status: 'in-stock' },
  { sku: 'NXM-5010', name: 'Stainless Steel Bearing 6205', category: 'Mechanical', qty: 0, reorder: 300, warehouse: 'WH-Beta', unitCost: '$12.40', status: 'out-of-stock' },
  { sku: 'NXM-5034', name: 'Copper Wire Spool AWG-18', category: 'Materials', qty: 72, reorder: 100, warehouse: 'WH-Gamma', unitCost: '$28.90', status: 'low-stock' },
  { sku: 'NXM-6001', name: 'Pneumatic Cylinder SC-63', category: 'Pneumatics', qty: 410, reorder: 150, warehouse: 'WH-Alpha', unitCost: '$74.50', status: 'in-stock' },
  { sku: 'NXM-6089', name: 'Optical Lens Assembly OL-12', category: 'Optics', qty: 5, reorder: 40, warehouse: 'WH-Beta', unitCost: '$210.00', status: 'low-stock' },
]

const warehouseCapacity = [
  { name: 'WH-Alpha', location: 'San Francisco, CA', capacity: 82, items: 1840, value: '$620K' },
  { name: 'WH-Beta', location: 'Chicago, IL', capacity: 67, items: 1290, value: '$410K' },
  { name: 'WH-Gamma', location: 'Newark, NJ', capacity: 94, items: 2180, value: '$770K' },
]

/* ------------------------------------------------------------------ */
/*  ORDERS DATA                                                        */
/* ------------------------------------------------------------------ */

const allOrders = [
  { id: 'SO-2026-1847', customer: 'Apex Manufacturing Co', date: 'Feb 25, 2026', items: 14, total: '$18,420', status: 'processing', payment: 'paid' },
  { id: 'SO-2026-1846', customer: 'TechStart Industries', date: 'Feb 25, 2026', items: 7, total: '$9,750', status: 'shipped', payment: 'paid' },
  { id: 'SO-2026-1845', customer: 'Global Dynamics LLC', date: 'Feb 24, 2026', items: 32, total: '$41,200', status: 'delivered', payment: 'paid' },
  { id: 'SO-2026-1844', customer: 'InnovateTech Corp', date: 'Feb 24, 2026', items: 5, total: '$6,800', status: 'pending', payment: 'unpaid' },
  { id: 'SO-2026-1843', customer: 'DataFlow Systems', date: 'Feb 23, 2026', items: 11, total: '$13,200', status: 'processing', payment: 'partial' },
  { id: 'SO-2026-1842', customer: 'CloudNine Solutions', date: 'Feb 23, 2026', items: 19, total: '$24,900', status: 'shipped', payment: 'paid' },
  { id: 'SO-2026-1841', customer: 'Pinnacle Robotics', date: 'Feb 22, 2026', items: 8, total: '$11,340', status: 'delivered', payment: 'paid' },
  { id: 'SO-2026-1840', customer: 'Sterling Aerospace', date: 'Feb 22, 2026', items: 22, total: '$56,100', status: 'processing', payment: 'paid' },
  { id: 'SO-2026-1839', customer: 'Quantum Devices Inc', date: 'Feb 21, 2026', items: 3, total: '$4,280', status: 'pending', payment: 'unpaid' },
  { id: 'SO-2026-1838', customer: 'Nordic Precision AB', date: 'Feb 21, 2026', items: 16, total: '$29,600', status: 'delivered', payment: 'paid' },
  { id: 'SO-2026-1837', customer: 'Cascade Automation', date: 'Feb 20, 2026', items: 9, total: '$15,750', status: 'shipped', payment: 'paid' },
  { id: 'SO-2026-1836', customer: 'Meridian Components', date: 'Feb 20, 2026', items: 41, total: '$72,400', status: 'processing', payment: 'partial' },
]

const fulfillmentPipeline = [
  { stage: 'New', count: 12, color: 'bg-slate-500' },
  { stage: 'Processing', count: 34, color: 'bg-blue-500' },
  { stage: 'Shipped', count: 28, color: 'bg-amber-500' },
  { stage: 'Delivered', count: 156, color: 'bg-emerald-500' },
]

/* ------------------------------------------------------------------ */
/*  FINANCE DATA                                                       */
/* ------------------------------------------------------------------ */

const plSummary = [
  { label: 'Revenue', value: '$2,412,000', change: '+14.2%', trend: 'up', icon: CircleDollarSign },
  { label: 'COGS', value: '$1,587,000', change: '+11.8%', trend: 'up', icon: Package },
  { label: 'Gross Profit', value: '$825,000', change: '+18.6%', trend: 'up', icon: TrendingUp },
  { label: 'Operating Expenses', value: '$482,000', change: '+5.2%', trend: 'up', icon: Receipt },
  { label: 'Net Income', value: '$343,000', change: '+32.4%', trend: 'up', icon: Banknote },
]

const arApSummary = [
  { label: 'Accounts Receivable', value: '$684,200', aging30: '$412K', aging60: '$185K', aging90: '$87K' },
  { label: 'Accounts Payable', value: '$521,800', aging30: '$298K', aging60: '$142K', aging90: '$82K' },
]

const recentInvoices = [
  { id: 'INV-2026-4021', customer: 'Apex Manufacturing Co', date: 'Feb 25, 2026', amount: '$18,420', due: 'Mar 27, 2026', status: 'sent' },
  { id: 'INV-2026-4020', customer: 'Global Dynamics LLC', date: 'Feb 24, 2026', amount: '$41,200', due: 'Mar 26, 2026', status: 'paid' },
  { id: 'INV-2026-4019', customer: 'Sterling Aerospace', date: 'Feb 22, 2026', amount: '$56,100', due: 'Mar 24, 2026', status: 'sent' },
  { id: 'INV-2026-4018', customer: 'Nordic Precision AB', date: 'Feb 21, 2026', amount: '$29,600', due: 'Mar 23, 2026', status: 'paid' },
  { id: 'INV-2026-4017', customer: 'Cascade Automation', date: 'Feb 20, 2026', amount: '$15,750', due: 'Mar 22, 2026', status: 'paid' },
  { id: 'INV-2026-4016', customer: 'Meridian Components', date: 'Feb 20, 2026', amount: '$72,400', due: 'Mar 22, 2026', status: 'overdue' },
  { id: 'INV-2026-4015', customer: 'Quantum Devices Inc', date: 'Feb 19, 2026', amount: '$4,280', due: 'Mar 21, 2026', status: 'sent' },
  { id: 'INV-2026-4014', customer: 'Pinnacle Robotics', date: 'Feb 18, 2026', amount: '$11,340', due: 'Mar 20, 2026', status: 'paid' },
]

const cashFlowData = [
  { label: 'Mar', value: 52 },
  { label: 'Apr', value: 58 },
  { label: 'May', value: 64 },
  { label: 'Jun', value: 48 },
  { label: 'Jul', value: 72 },
  { label: 'Aug', value: 80 },
  { label: 'Sep', value: 65 },
  { label: 'Oct', value: 92 },
  { label: 'Nov', value: 98 },
  { label: 'Dec', value: 78 },
  { label: 'Jan', value: 105 },
  { label: 'Feb', value: 112 },
]

/* ------------------------------------------------------------------ */
/*  HR DATA                                                            */
/* ------------------------------------------------------------------ */

const hrStats = [
  { label: 'Total Employees', value: '342', icon: Users, color: 'blue' },
  { label: 'Active', value: '328', icon: UserCheck, color: 'emerald' },
  { label: 'On Leave', value: '14', icon: Calendar, color: 'amber' },
  { label: 'New Hires (MTD)', value: '8', icon: UserPlus, color: 'violet' },
]

const departmentBreakdown = [
  { name: 'Manufacturing', headcount: 124, budget: '$1.2M', manager: 'Sarah Chen', utilization: 94 },
  { name: 'Engineering', headcount: 68, budget: '$980K', manager: 'Marcus Webb', utilization: 91 },
  { name: 'Sales & Marketing', headcount: 52, budget: '$720K', manager: 'Lisa Patel', utilization: 87 },
  { name: 'Operations', headcount: 38, budget: '$540K', manager: 'David Kim', utilization: 82 },
  { name: 'Quality Assurance', headcount: 28, budget: '$380K', manager: 'Ana Torres', utilization: 89 },
  { name: 'Customer Success', headcount: 18, budget: '$260K', manager: 'James Wright', utilization: 76 },
  { name: 'Finance & Admin', headcount: 14, budget: '$210K', manager: 'Rachel Nguyen', utilization: 85 },
]

const recentHires = [
  { name: 'Emily Zhang', role: 'Senior Manufacturing Engineer', dept: 'Manufacturing', startDate: 'Feb 24, 2026' },
  { name: 'Raj Krishnamurthy', role: 'Full Stack Developer', dept: 'Engineering', startDate: 'Feb 22, 2026' },
  { name: 'Sofia Martinez', role: 'Quality Analyst', dept: 'Quality Assurance', startDate: 'Feb 20, 2026' },
  { name: 'Tyler Okonkwo', role: 'Sales Representative', dept: 'Sales & Marketing', startDate: 'Feb 18, 2026' },
  { name: 'Hannah Lin', role: 'Supply Chain Coordinator', dept: 'Operations', startDate: 'Feb 15, 2026' },
]

const upcomingReviews = [
  { name: 'Michael Torres', role: 'Production Lead', reviewDate: 'Mar 01, 2026', rating: 4.5 },
  { name: 'Karen Olsen', role: 'QA Manager', reviewDate: 'Mar 03, 2026', rating: 4.8 },
  { name: 'Derek Pham', role: 'Warehouse Supervisor', reviewDate: 'Mar 05, 2026', rating: 4.2 },
  { name: 'Jessica Brown', role: 'Account Executive', reviewDate: 'Mar 07, 2026', rating: 3.9 },
]

const supplierRiskBoard = [
  { supplier: 'Meridian Components', category: 'Chips', risk: 72, etaVariance: '+4 days', status: 'high' },
  { supplier: 'Nordic Precision AB', category: 'Bearing', risk: 44, etaVariance: '+1 day', status: 'medium' },
  { supplier: 'Quantum Devices Inc', category: 'Sensors', risk: 28, etaVariance: 'On time', status: 'low' },
]

const plantUtilization = [
  { unit: 'Assembly Line A', usage: 88, output: '1,240 units/wk' },
  { unit: 'Assembly Line B', usage: 93, output: '1,410 units/wk' },
  { unit: 'QA Cell', usage: 76, output: '910 checks/day' },
]

/* ------------------------------------------------------------------ */
/*  COMMAND PALETTE ITEMS                                              */
/* ------------------------------------------------------------------ */

const commandItems = [
  { label: 'Dashboard', icon: LayoutDashboard, group: 'Navigation' },
  { label: 'Inventory', icon: Package, group: 'Navigation' },
  { label: 'Orders', icon: ShoppingCart, group: 'Navigation' },
  { label: 'Finance', icon: DollarSign, group: 'Navigation' },
  { label: 'HR', icon: Users, group: 'Navigation' },
  { label: 'Create Sales Order', icon: FileText, group: 'Actions' },
  { label: 'Create Purchase Order', icon: ClipboardList, group: 'Actions' },
  { label: 'Generate Invoice', icon: Receipt, group: 'Actions' },
  { label: 'Add Employee', icon: UserPlus, group: 'Actions' },
  { label: 'Export Report', icon: Download, group: 'Actions' },
  { label: 'Company Settings', icon: Settings, group: 'Admin' },
  { label: 'Warehouse Management', icon: Warehouse, group: 'Admin' },
]

/* ------------------------------------------------------------------ */
/*  STYLE MAPS                                                         */
/* ------------------------------------------------------------------ */

const orderStatusColors = {
  pending: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  shipped: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  delivered: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
}

const paymentColors = {
  paid: 'text-emerald-600 dark:text-emerald-400',
  unpaid: 'text-red-600 dark:text-red-400',
  partial: 'text-amber-600 dark:text-amber-400',
}

const invoiceStatusVariant = {
  paid: 'success',
  sent: 'info',
  overdue: 'error',
  draft: 'secondary',
}

const inventoryStatusVariant = {
  'in-stock': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'error',
}

const inventoryStatusLabel = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [orderFilter, setOrderFilter] = useState('all')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [orgSwitcherOpen, setOrgSwitcherOpen] = useState(false)
  const { isDark } = useTheme()

  const mainTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Inventory', count: 5 },
    { id: 'orders', label: 'Orders', count: 12 },
    { id: 'finance', label: 'Finance' },
    { id: 'hr', label: 'HR' },
  ]

  const orderFilterTabs = ['all', 'pending', 'processing', 'shipped', 'delivered']

  const filteredOrders = orderFilter === 'all'
    ? allOrders
    : allOrders.filter(o => o.status === orderFilter)

  const lowStockCount = inventoryProducts.filter(p => p.status === 'low-stock').length
  const outOfStockCount = inventoryProducts.filter(p => p.status === 'out-of-stock').length

  const sidebarWidth = sidebarCollapsed ? 'w-20' : 'w-64'
  const mainPadding = sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'

  function handleCommandSelect(item) {
    if (item === '__open__') {
      setCmdOpen(true)
      return
    }
    const tabMap = {
      'Dashboard': 'overview',
      'Inventory': 'inventory',
      'Orders': 'orders',
      'Finance': 'finance',
      'HR': 'hr',
    }
    if (tabMap[item.label]) {
      setActiveTab(tabMap[item.label])
    }
  }

  function handleSidebarLink(tab) {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

        {/* ---- SIDEBAR ---- */}
        <aside className={`fixed left-0 top-0 h-full ${sidebarWidth} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-all duration-200 lg:translate-x-0 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Org Switcher */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOrgSwitcherOpen(!orgSwitcherOpen)}
              className="flex items-center gap-2.5 flex-1 min-w-0"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M4 20V4h4l8 12V4h4v16h-4L8 8v12H4z" fill="currentColor"/></svg>
              </div>
              {!sidebarCollapsed && (
                <div className="flex items-center gap-1 min-w-0">
                  <div className="flex flex-col leading-tight text-left min-w-0">
                    <span className="text-sm font-bold font-display truncate">Nexus Manufacturing</span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">Operating system</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              )}
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
          </div>
          {orgSwitcherOpen && !sidebarCollapsed && (
            <div className="mt-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-2 space-y-1">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium">
                <Building2 className="w-4 h-4" />
                Nexus Manufacturing
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Building2 className="w-4 h-4" />
                Nexus Distribution
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <Building2 className="w-4 h-4" />
                Nexus R&D Labs
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Nav */}
        <div className="p-3">
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-4">
              {!sidebarCollapsed && (
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">{section.title}</p>
              )}
              {section.links.map(({ icon: Icon, label, tab, badge }) => {
                const isActive = tab === activeTab
                return (
                  <button
                    key={label}
                    onClick={() => handleSidebarLink(tab)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    title={sidebarCollapsed ? label : undefined}
                  >
                    <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="flex-1 text-left">{label}</span>}
                    {!sidebarCollapsed && badge && (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{badge}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        </aside>

        {/* ---- MAIN CONTENT ---- */}
        <div className={`${mainPadding} transition-all duration-200`}>
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Feb 25, 2026</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>Fiscal Q1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search...</span>
              <kbd className="ml-2 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">Ctrl+K</kbd>
            </button>
            <Button variant="outline" size="sm" className="text-xs hidden md:flex">
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm" className="text-xs hidden md:flex">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>Workspace</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 dark:text-slate-100 font-medium">Nexus Manufacturing</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900 dark:text-slate-100 font-medium">Operations</span>
              </div>
              <h1 className="text-2xl font-bold font-display">Operations Dashboard</h1>
              <p className="text-slate-500 text-sm mt-1">Real-time overview across all business units · Feb 25, 2026</p>
            </div>
            <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />
          </div>

          {/* ============================================================ */}
          {/*  OVERVIEW TAB                                                 */}
          {/* ============================================================ */}
          <TabContent id="overview" active={activeTab}>
            <div className="space-y-6">
              {/* Command-center hero */}
              <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white">
                <div className="pointer-events-none absolute -right-20 -top-16 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-0 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-6 p-6 lg:p-8">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-indigo-300/90 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      All systems operational · 3 plants online
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold font-display tracking-tight">
                      Good morning, Sarah.
                    </h2>
                    <p className="text-slate-300/80 text-sm lg:text-base mt-2 max-w-xl">
                      Revenue is pacing <span className="text-emerald-300 font-semibold">14.2% above plan</span> this month.
                      18 shipments need your attention before end of day.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-5">
                      <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition">
                        <ClipboardList className="w-3.5 h-3.5" />
                        Open operations queue
                      </button>
                      <button type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/15 transition">
                        <Activity className="w-3.5 h-3.5" />
                        Live plant feed
                      </button>
                      <button type="button" onClick={() => setActiveTab('finance')} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/15 transition">
                        <PieChart className="w-3.5 h-3.5" />
                        Month-end close
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Revenue MTD</p>
                      <p className="text-2xl font-bold font-display tabular-nums mt-1">$2.4M</p>
                      <p className="text-[11px] text-emerald-300 mt-0.5">+14.2% vs plan</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Open orders</p>
                      <p className="text-2xl font-bold font-display tabular-nums mt-1">428</p>
                      <p className="text-[11px] text-amber-300 mt-0.5">18 urgent</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">Fill rate</p>
                      <p className="text-2xl font-bold font-display tabular-nums mt-1">96.4%</p>
                      <p className="text-[11px] text-emerald-300 mt-0.5">+1.2pp</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpis.map(({ label, value, change, trend, icon: Icon }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </div>
                        {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
                        {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-rose-500" />}
                        {trend === 'neutral' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      </div>
                      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">{label}</p>
                      <p className="text-2xl font-bold font-display tabular-nums tracking-tight mt-1">{value}</p>
                      <p className={`text-xs mt-1 font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : trend === 'down' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>{change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue vs Expenses AreaChart */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display">Revenue vs Expenses</CardTitle>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                          Revenue
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          Expenses
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={revenueVsExpenses} height={160} color="hsl(200, 80%, 50%)" />
                    <div className="mt-2">
                      <AreaChart data={expenseData} height={80} color="hsl(350, 70%, 60%)" />
                    </div>
                  </CardContent>
                </Card>

                {/* Order Status DonutChart */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Order Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-4">
                      <DonutChart value={72} max={100} size={120} strokeWidth={12} color="hsl(142, 71%, 45%)" label="72%" sublabel="Fulfilled" />
                      <div className="w-full space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            Delivered
                          </span>
                          <span className="font-medium">156</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            Shipped
                          </span>
                          <span className="font-medium">28</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            Processing
                          </span>
                          <span className="font-medium">34</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                            Pending
                          </span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders + Department Performance */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display">Recent Orders</CardTitle>
                      <div className="flex items-center gap-2">
                        <ExportCsvButton data={recentOrdersOverview} filename="recent-orders.csv" />
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab('orders')}>
                          View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Order ID</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Customer</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Items</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Total</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrdersOverview.map((order) => (
                            <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-2 font-mono text-xs font-medium">{order.id}</td>
                              <td className="py-3 px-2 hidden sm:table-cell">{order.customer}</td>
                              <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{order.date}</td>
                              <td className="py-3 px-2 text-center hidden lg:table-cell">{order.items}</td>
                              <td className="py-3 px-2 text-right font-medium">{order.total}</td>
                              <td className="py-3 px-2 text-center">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${orderStatusColors[order.status]}`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className={`py-3 px-2 text-center text-xs font-medium capitalize hidden sm:table-cell ${paymentColors[order.payment]}`}>
                                {order.payment}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Performance BarChart */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Department Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={departmentPerformance} height={140} barWidth={28} gap={12} />
                    <div className="mt-4 space-y-2">
                      {departmentPerformance.map((d) => (
                        <div key={d.label} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                            {d.label}
                          </span>
                          <span className="font-medium">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display">Supplier Risk Board</CardTitle>
                      <Badge variant="warning">Procurement</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {supplierRiskBoard.map((item) => (
                      <div key={item.supplier} className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold">{item.supplier}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.category}</p>
                          </div>
                          <Badge variant={item.status === 'high' ? 'error' : item.status === 'medium' ? 'warning' : 'success'}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <Progress value={item.risk} max={100} size="sm" color={item.status === 'high' ? 'bg-red-500' : item.status === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'} />
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>{item.risk}% risk score</span>
                          <span>ETA variance: {item.etaVariance}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-display">Plant Utilization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {plantUtilization.map((line) => (
                      <div key={line.unit}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="font-medium">{line.unit}</span>
                          <span className="text-slate-500 dark:text-slate-400">{line.usage}%</span>
                        </div>
                        <Progress value={line.usage} max={100} size="sm" color={line.usage > 90 ? 'bg-red-500' : line.usage > 80 ? 'bg-amber-500' : 'bg-emerald-500'} />
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{line.output}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  INVENTORY TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="inventory" active={activeTab}>
            <div className="space-y-6">
              {/* Low Stock Alert Banner */}
              {(lowStockCount > 0 || outOfStockCount > 0) && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      Inventory Alert: {lowStockCount} items low stock, {outOfStockCount} items out of stock
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Review and reorder to avoid production delays</p>
                  </div>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                    Auto-Reorder
                  </Button>
                </div>
              )}

              {/* Inventory Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {inventorySummary.map(({ label, value, icon: Icon, color }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                          color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                          'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                            color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                            'text-red-600 dark:text-red-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-display">{value}</p>
                          <p className="text-xs text-slate-500">{label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Product Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Product Inventory</CardTitle>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search SKU or product..." className="w-48 h-8 text-xs" />
                      <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">SKU</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Product Name</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Qty</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Reorder Lvl</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Warehouse</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Unit Cost</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventoryProducts.map((item) => (
                          <tr key={item.sku} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-mono text-xs font-medium">{item.sku}</td>
                            <td className="py-3 px-2 font-medium">{item.name}</td>
                            <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{item.category}</td>
                            <td className="py-3 px-2 text-center">
                              <span className={`font-bold ${item.qty === 0 ? 'text-red-600 dark:text-red-400' : item.qty < item.reorder ? 'text-amber-600 dark:text-amber-400' : ''}`}>
                                {item.qty.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center text-slate-500 hidden lg:table-cell">{item.reorder}</td>
                            <td className="py-3 px-2 text-slate-500 hidden lg:table-cell">{item.warehouse}</td>
                            <td className="py-3 px-2 text-right hidden md:table-cell">{item.unitCost}</td>
                            <td className="py-3 px-2 text-center">
                              <Badge variant={inventoryStatusVariant[item.status]}>
                                {inventoryStatusLabel[item.status]}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Warehouse Capacity */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display">Warehouse Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {warehouseCapacity.map((wh) => (
                      <div key={wh.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium font-display">{wh.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {wh.location}
                            </p>
                          </div>
                          <span className={`text-lg font-bold ${wh.capacity > 90 ? 'text-red-500' : wh.capacity > 75 ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {wh.capacity}%
                          </span>
                        </div>
                        <Progress
                          value={wh.capacity}
                          max={100}
                          size="lg"
                          color={wh.capacity > 90 ? 'bg-red-500' : wh.capacity > 75 ? 'bg-amber-500' : 'bg-emerald-500'}
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>{wh.items.toLocaleString()} items</span>
                          <span>{wh.value} value</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  ORDERS TAB                                                   */}
          {/* ============================================================ */}
          <TabContent id="orders" active={activeTab}>
            <div className="space-y-6">
              {/* Fulfillment Pipeline */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display">Fulfillment Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {fulfillmentPipeline.map((stage, idx) => (
                      <div key={stage.stage} className="flex items-center gap-2 flex-1">
                        <div className="flex-1 text-center">
                          <div className={`${stage.color} text-white rounded-lg p-4`}>
                            <p className="text-2xl font-bold font-display">{stage.count}</p>
                            <p className="text-xs opacity-90 mt-1">{stage.stage}</p>
                          </div>
                        </div>
                        {idx < fulfillmentPipeline.length - 1 && (
                          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Filters + Orders Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="font-display">Sales Orders</CardTitle>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                      {orderFilterTabs.map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setOrderFilter(filter)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                            filter === orderFilter
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                        >
                          {filter}
                          {filter !== 'all' && (
                            <span className="ml-1.5 text-[10px] opacity-70">
                              ({allOrders.filter(o => o.status === filter).length})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Order ID</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Items</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Total</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Payment</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-mono text-xs font-medium">{order.id}</td>
                            <td className="py-3 px-2">{order.customer}</td>
                            <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{order.date}</td>
                            <td className="py-3 px-2 text-center hidden lg:table-cell">{order.items}</td>
                            <td className="py-3 px-2 text-right font-medium">{order.total}</td>
                            <td className="py-3 px-2 text-center">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${orderStatusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className={`py-3 px-2 text-center text-xs font-medium capitalize hidden sm:table-cell ${paymentColors[order.payment]}`}>
                              {order.payment}
                            </td>
                            <td className="py-3 px-2 text-center hidden md:table-cell">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Eye className="w-3 h-3 mr-1" /> View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      No orders match the current filter.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  FINANCE TAB                                                  */}
          {/* ============================================================ */}
          <TabContent id="finance" active={activeTab}>
            <div className="space-y-6">
              {/* P&L Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {plSummary.map(({ label, value, change, trend, icon: Icon }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {change}
                        </span>
                      </div>
                      <p className="text-lg font-bold font-display">{value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* AR/AP Summary */}
              <div className="grid md:grid-cols-2 gap-6">
                {arApSummary.map((account) => (
                  <Card key={account.label} className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-display">{account.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold font-display mb-4">{account.value}</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">0-30 days</span>
                          <span className="font-medium">{account.aging30}</span>
                        </div>
                        <Progress value={60} max={100} size="sm" color="bg-emerald-500" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">31-60 days</span>
                          <span className="font-medium">{account.aging60}</span>
                        </div>
                        <Progress value={30} max={100} size="sm" color="bg-amber-500" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">61-90 days</span>
                          <span className="font-medium">{account.aging90}</span>
                        </div>
                        <Progress value={15} max={100} size="sm" color="bg-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Invoices */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display">Recent Invoices</CardTitle>
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="w-3.5 h-3.5 mr-1" /> Create Invoice
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Invoice</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Customer</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Due Date</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentInvoices.map((inv) => (
                            <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-2 font-mono text-xs font-medium">{inv.id}</td>
                              <td className="py-3 px-2 hidden sm:table-cell">{inv.customer}</td>
                              <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{inv.date}</td>
                              <td className="py-3 px-2 text-right font-medium">{inv.amount}</td>
                              <td className="py-3 px-2 text-slate-500 hidden lg:table-cell">{inv.due}</td>
                              <td className="py-3 px-2 text-center">
                                <Badge variant={invoiceStatusVariant[inv.status]}>
                                  {inv.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Flow Trend */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Cash Flow Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={cashFlowData} height={180} color="hsl(142, 71%, 45%)" />
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">$112K</p>
                        <p className="text-xs text-slate-500">Inflow (Feb)</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold font-display text-red-600 dark:text-red-400">$68K</p>
                        <p className="text-xs text-slate-500">Outflow (Feb)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  HR TAB                                                       */}
          {/* ============================================================ */}
          <TabContent id="hr" active={activeTab}>
            <div className="space-y-6">
              {/* HR Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {hrStats.map(({ label, value, icon: Icon, color }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                          color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                          'bg-violet-100 dark:bg-violet-900/30'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                            color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                            'text-violet-600 dark:text-violet-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-display">{value}</p>
                          <p className="text-xs text-slate-500">{label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Department Breakdown */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display">Department Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Department</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Headcount</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Budget</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Manager</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Utilization</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departmentBreakdown.map((dept) => (
                            <tr key={dept.name} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-2 font-medium">{dept.name}</td>
                              <td className="py-3 px-2 text-center">{dept.headcount}</td>
                              <td className="py-3 px-2 text-right hidden md:table-cell">{dept.budget}</td>
                              <td className="py-3 px-2 text-slate-500 hidden lg:table-cell">{dept.manager}</td>
                              <td className="py-3 px-2">
                                <div className="flex items-center gap-2 justify-center">
                                  <Progress
                                    value={dept.utilization}
                                    max={100}
                                    size="sm"
                                    color={dept.utilization > 90 ? 'bg-emerald-500' : dept.utilization > 80 ? 'bg-blue-500' : 'bg-amber-500'}
                                    className="w-16"
                                  />
                                  <span className="text-xs font-medium w-8">{dept.utilization}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Right Column: Recent Hires + Upcoming Reviews */}
                <div className="space-y-6">
                  {/* Recent Hires */}
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-display">Recent Hires</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentHires.map((hire) => (
                          <div key={hire.name} className="flex items-start gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/50 last:border-0 last:pb-0">
                            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-sky-700 dark:text-sky-400">
                                {hire.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{hire.name}</p>
                              <p className="text-xs text-slate-500 truncate">{hire.role}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-[10px]">{hire.dept}</Badge>
                                <span className="text-[10px] text-slate-400">{hire.startDate}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Reviews */}
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-display">Upcoming Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingReviews.map((review) => (
                          <div key={review.name} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                            <div>
                              <p className="text-sm font-medium">{review.name}</p>
                              <p className="text-xs text-slate-500">{review.role}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{review.reviewDate}</p>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span className="text-sm font-bold">{review.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabContent>
        </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Command Palette */}
        <CommandPalette
          items={commandItems}
          isOpen={cmdOpen}
          onClose={() => setCmdOpen(false)}
          onSelect={handleCommandSelect}
        />

        {/* Theme Switcher */}
        <ThemeSwitcher position="bottom-right" />
      </div>
    </div>
  )
}

export default App
