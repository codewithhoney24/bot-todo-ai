'use client';

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit, 
  Eye,
  DollarSign,
  TrendingUp,
  PiggyBank,
  CreditCard,
  ShoppingCart,
  Home,
  Briefcase,
  GraduationCap,
  Heart,
  Coffee,
  LogOut,
  Menu,
  X,
  Send,
  Sparkles,
  Save,
  HelpCircle
} from 'lucide-react';

const FINANCE_CATEGORIES = {
  INCOME: { icon: TrendingUp, color: '#10b981', label: 'Income' },
  EXPENSE: { icon: ShoppingCart, color: '#ef4444', label: 'Expense' },
  SAVINGS: { icon: PiggyBank, color: '#3b82f6', label: 'Savings' },
  INVESTMENT: { icon: Briefcase, color: '#8b5cf6', label: 'Investment' },
  BILL: { icon: CreditCard, color: '#f59e0b', label: 'Bill' },
  DEBT: { icon: Home, color: '#ec4899', label: 'Debt' },
  EDUCATION: { icon: GraduationCap, color: '#06b6d4', label: 'Education' },
  HEALTH: { icon: Heart, color: '#f43f5e', label: 'Health' },
  ENTERTAINMENT: { icon: Coffee, color: '#a855f7', label: 'Entertainment' },
};

interface Task {
  id: number;
  title: string;
  description: string;
  category: keyof typeof FINANCE_CATEGORIES;
  amount?: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', amount: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    title: '',
    description: '',
    category: 'EXPENSE' as keyof typeof FINANCE_CATEGORIES,
    amount: '',
  });

  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'Pay electricity bill',
        description: 'Monthly electricity payment',
        category: 'BILL',
        amount: 150,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Save for emergency fund',
        description: 'Monthly savings goal',
        category: 'SAVINGS',
        amount: 82934684.34,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    setTasks(mockTasks);
  }, []);

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed, updated_at: new Date().toISOString() } : task
    ));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addAssistantMessage(`Task "${task.title}" updated successfully! ✅`);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
    if (task) {
      addAssistantMessage(`Task "${task.title}" deleted! 🗑️`);
    }
  };

  const handleStartEdit = (task: Task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      amount: task.amount?.toString() || '',
    });
  };

  const handleSaveEdit = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId 
        ? { ...task, title: editForm.title, description: editForm.description, amount: parseFloat(editForm.amount), updated_at: new Date().toISOString() } 
        : task
    ));
    setEditingTask(null);
    addAssistantMessage("Task updated successfully! ✏️");
  };

  // --- HELP BUTTON FUNCTIONALITY ---
  const handleHelpButton = () => {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const completedTasks = tasks.filter(t => t.completed).length;
    
    let helpMessage = "🆘 **Quick Help Guide** 🆘\n\n";
    
    // Smart contextual help based on user data
    if (totalTasks === 0) {
      helpMessage += "📝 **Getting Started:**\n" +
        "• 'Add a new task for electricity bill'\n" +
        "• 'Create income task for salary'\n" +
        "• 'Add savings goal for emergency fund'\n\n";
    } else if (pendingTasks > 0) {
      helpMessage += `⏳ **You have ${pendingTasks} pending tasks:**\n` +
        "• 'Show my pending tasks'\n" +
        "• 'What tasks are remaining?'\n" +
        "• 'Mark task 1 as complete'\n\n";
    }
    
    // Category suggestions based on existing tasks
    const categoriesWithTasks = new Set(tasks.map(t => t.category));
    if (categoriesWithTasks.size > 0) {
      helpMessage += "📂 **Your active categories:**\n";
      categoriesWithTasks.forEach(cat => {
        const label = FINANCE_CATEGORIES[cat as keyof typeof FINANCE_CATEGORIES].label;
        helpMessage += `• 'Show ${label.toLowerCase()} tasks'\n`;
      });
      helpMessage += "\n";
    }
    
    // Always show general commands
    helpMessage += "🤖 **General Commands:**\n" +
      "• 'Show my tasks' - All tasks list\n" +
      "• 'Pending tasks' - Incomplete tasks\n" +
      "• 'Completed tasks' - Finished tasks\n" +
      "• 'Dashboard status' - Overview statistics\n" +
      "• 'Finance summary' - Money overview\n" +
      "• 'All categories' - All categories summary\n" +
      "• 'Total income/expense/savings' - Financial totals\n\n";
    
    // Quick examples
    helpMessage += "💡 **Quick Examples:**\n" +
      "1. 'Show me my pending bills'\n" +
      "2. 'What's my total savings?'\n" +
      "3. 'List all education expenses'\n" +
      "4. 'Give me today's activity summary'\n\n";
    
    // Pro tips
    helpMessage += "🚀 **Pro Tips:**\n" +
      "• You can combine queries: 'Show pending bills over $100'\n" +
      "• Use natural language: 'How much have I spent?'\n" +
      "• Ask for specific updates: 'Recent activity'\n" +
      "• Category-wise: 'Health expenses this month'";
    
    addAssistantMessage(helpMessage);
  };

  // --- ENHANCED AI FUNCTIONALITY ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userQuery = inputMessage.toLowerCase().trim();
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    setTimeout(() => {
      let aiResponse = "";
      
      // 1. TASKS RELATED QUERIES
      if (userQuery.includes("show my tasks") || 
          userQuery.includes("all tasks") || 
          userQuery.includes("list tasks") ||
          userQuery.includes("task list")) {
        if (tasks.length === 0) {
          aiResponse = "Aapki list mein abhi koi tasks nahi hain. Aap 'Add Task' button se naya task add kar sakte hain.";
        } else {
          const taskList = tasks.map((t, i) => 
            `${i+1}. ${t.title} (${FINANCE_CATEGORIES[t.category].label}) - ${t.completed ? '✅ Completed' : '⏳ Pending'} - $${t.amount || 0}`
          ).join('\n');
          aiResponse = `📋 **Aapke Sabhi Tasks:**\n${taskList}\n\nTotal Tasks: ${tasks.length}\nPending: ${tasks.filter(t => !t.completed).length}\nCompleted: ${tasks.filter(t => t.completed).length}`;
        }
      }
      
      // 2. PENDING TASKS QUERIES
      else if (userQuery.includes("pending tasks") || 
               userQuery.includes("show pending") || 
               userQuery.includes("incomplete tasks") ||
               userQuery.includes("tasks remaining")) {
        const pendingTasks = tasks.filter(t => !t.completed);
        if (pendingTasks.length === 0) {
          aiResponse = "🎉 Aapke sabhi tasks complete ho chuke hain! Koi pending task nahi hai.";
        } else {
          const pendingList = pendingTasks.map((t, i) => 
            `${i+1}. ${t.title} (${FINANCE_CATEGORIES[t.category].label}) - $${t.amount || 0}`
          ).join('\n');
          aiResponse = `⏳ **Pending Tasks:**\n${pendingList}\n\nTotal Pending: ${pendingTasks.length}`;
        }
      }
      
      // 3. COMPLETED TASKS QUERIES - FIXED
      else if (userQuery.includes("completed") || 
               userQuery.includes("show completed") || 
               userQuery.includes("done tasks") ||
               userQuery.includes("finished tasks") ||
               userQuery.includes("complete tasks")) {
        const completedTasks = tasks.filter(t => t.completed);
        if (completedTasks.length === 0) {
          aiResponse = "Aapka koi bhi task abhi tak complete nahi hua hai.";
        } else {
          const completedList = completedTasks.map((t, i) => 
            `${i+1}. ${t.title} (${FINANCE_CATEGORIES[t.category].label}) - $${t.amount || 0}`
          ).join('\n');
          aiResponse = `✅ **Completed Tasks:**\n${completedList}\n\nTotal Completed: ${completedTasks.length}`;
        }
      }
      
      // 4. DASHBOARD STATUS & STATS
      else if (userQuery.includes("dashboard status") || 
               userQuery.includes("overview") || 
               userQuery.includes("stats") ||
               userQuery.includes("summary") ||
               userQuery.includes("how many tasks")) {
        
        const categoryCounts: { [key: string]: number } = {};
        tasks.forEach(task => {
          categoryCounts[task.category] = (categoryCounts[task.category] || 0) + 1;
        });
        
        const categorySummary = Object.entries(categoryCounts)
          .map(([cat, count]) => `${FINANCE_CATEGORIES[cat as keyof typeof FINANCE_CATEGORIES].label}: ${count}`)
          .join(', ');
        
        const totalAmount = tasks.reduce((sum, task) => sum + (task.amount || 0), 0);
        
        aiResponse = `📊 **Dashboard Overview:**\n\n📁 Total Tasks: ${stats.total}\n⏳ Pending Tasks: ${stats.pending}\n✅ Completed Tasks: ${stats.completed}\n💰 Total Amount: $${totalAmount.toLocaleString()}\n📂 Category-wise: ${categorySummary || 'No categories yet'}`;
      }
      
      // 5. FINANCE RELATED QUERIES
      else if (userQuery.includes("total income") || userQuery.includes("income total")) {
        const incomeTasks = tasks.filter(t => t.category === 'INCOME');
        const totalIncome = incomeTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
        aiResponse = `💰 **Total Income:** $${totalIncome.toLocaleString()}\nTasks: ${incomeTasks.length}`;
      }
      
      else if (userQuery.includes("total expense") || userQuery.includes("expense total")) {
        const expenseTasks = tasks.filter(t => t.category === 'EXPENSE');
        const totalExpense = expenseTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
        aiResponse = `💸 **Total Expense:** $${totalExpense.toLocaleString()}\nTasks: ${expenseTasks.length}`;
      }
      
      else if (userQuery.includes("savings") && userQuery.includes("total")) {
        const savingsTasks = tasks.filter(t => t.category === 'SAVINGS');
        const totalSavings = savingsTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
        aiResponse = `🐖 **Total Savings:** $${totalSavings.toLocaleString()}\nTasks: ${savingsTasks.length}`;
      }
      
      else if (userQuery.includes("finance") || userQuery.includes("money") || userQuery.includes("budget")) {
        const categories = ['INCOME', 'EXPENSE', 'SAVINGS', 'INVESTMENT'];
        let financeSummary = "📈 **Finance Summary:**\n";
        
        categories.forEach(cat => {
          const catTasks = tasks.filter(t => t.category === cat);
          const total = catTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
          financeSummary += `${FINANCE_CATEGORIES[cat as keyof typeof FINANCE_CATEGORIES].label}: $${total.toLocaleString()} (${catTasks.length} tasks)\n`;
        });
        
        aiResponse = financeSummary;
      }
      
      // 6. ALL CATEGORIES QUERY - NEW ADDED
      else if (userQuery.includes("all categories") || 
               userQuery.includes("every category") ||
               userQuery.includes("show categories")) {
        
        const categoryStats: { [key: string]: { count: number, totalAmount: number } } = {};
        
        tasks.forEach(task => {
          if (!categoryStats[task.category]) {
            categoryStats[task.category] = { count: 0, totalAmount: 0 };
          }
          categoryStats[task.category].count += 1;
          categoryStats[task.category].totalAmount += (task.amount || 0);
        });
        
        if (Object.keys(categoryStats).length === 0) {
          aiResponse = "Aapke paas abhi tak kisi bhi category mein tasks nahi hain.";
        } else {
          let categoriesList = "📂 **All Categories Summary:**\n\n";
          
          Object.entries(categoryStats).forEach(([cat, stats]) => {
            const label = FINANCE_CATEGORIES[cat as keyof typeof FINANCE_CATEGORIES].label;
            categoriesList += `${label}:\n   • Total Tasks: ${stats.count}\n   • Total Amount: $${stats.totalAmount.toLocaleString()}\n\n`;
          });
          
          aiResponse = categoriesList;
        }
      }
      
      // 7. CATEGORY SPECIFIC QUERIES
      else if (userQuery.includes("category") || 
               userQuery.includes("categories")) {
        let categoryFound = false;
        
        // First check for specific category names
        Object.entries(FINANCE_CATEGORIES).forEach(([key, { label }]) => {
          const lowercaseLabel = label.toLowerCase();
          if (userQuery.includes(lowercaseLabel)) {
            categoryFound = true;
            const catTasks = tasks.filter(t => t.category === key);
            const total = catTasks.reduce((sum, task) => sum + (task.amount || 0), 0);
            const pending = catTasks.filter(t => !t.completed).length;
            const completed = catTasks.filter(t => t.completed).length;
            
            aiResponse = `📂 **${label} Tasks:**\n\n` +
                        `Total Tasks: ${catTasks.length}\n` +
                        `Total Amount: $${total.toLocaleString()}\n` +
                        `Pending: ${pending}\n` +
                        `Completed: ${completed}`;
            
            if (catTasks.length > 0) {
              const taskList = catTasks.map((t, i) => 
                `${i+1}. ${t.title} - ${t.completed ? '✅' : '⏳'} - $${t.amount || 0}`
              ).join('\n');
              aiResponse += `\n\nTask List:\n${taskList}`;
            }
          }
        });
        
        if (!categoryFound) {
          aiResponse = "Mujhe category nahi mili. Aap ye categories try kar sakte hain: Income, Expense, Savings, Investment, Bill, Debt, Education, Health, Entertainment.\n\nYa phir 'All categories' likh kar sab categories dekhein.";
        }
      }
      
      // 8. HELP & GENERAL QUERIES
      else if (userQuery.includes("help") || 
               userQuery.includes("what can you do") || 
               userQuery.includes("assist")) {
        aiResponse = `🤖 **I can help you with:**\n\n• "Show my tasks" - All tasks list\n• "Show my pending tasks" - Pending tasks only\n• "Show completed tasks" - Completed tasks\n• "Dashboard status" - Overview statistics\n• "Total income/expense/savings" - Finance totals\n• "Finance summary" - Money overview\n• "All categories" - All categories summary\n• Category-wise queries like "Bill tasks"\n• Task status updates`;
      }
      
      else if (userQuery.includes("hello") || 
               userQuery.includes("hi") || 
               userQuery.includes("hey")) {
        aiResponse = "👋 Hello! Main aapka FinanceTodo AI Assistant hoon. Aap apne tasks ke bare mein pooch sakte hain ya 'help' likh kar dekh sakte hain kya kya kar sakta hoon.";
      }
      
      else if (userQuery.includes("thank")) {
        aiResponse = "🙏 You're welcome! Koi aur help chahiye toh zaroor poochiye.";
      }
      
      // 9. RECENT ACTIVITY / UPDATED
      else if (userQuery.includes("recent") || 
               userQuery.includes("updated") || 
               userQuery.includes("last activity")) {
        if (tasks.length > 0) {
          const sortedTasks = [...tasks].sort((a, b) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
          const recentTask = sortedTasks[0];
          aiResponse = `🕐 **Recent Activity:**\n\nTask: "${recentTask.title}"\nCategory: ${FINANCE_CATEGORIES[recentTask.category].label}\nUpdated: ${new Date(recentTask.updated_at).toLocaleTimeString()}\nStatus: ${recentTask.completed ? '✅ Completed' : '⏳ Pending'}\nAmount: $${recentTask.amount || 0}`;
        } else {
          aiResponse = "Abhi tak koi activity nahi hui hai.";
        }
      }
      
      // 10. DEFAULT RESPONSE
      else {
        aiResponse = `Aapke query "${inputMessage}" ko main samajh gaya hoon. Aap yeh try kar sakte hain:\n\n• "Show my tasks" - Sabhi tasks dekhein\n• "Pending tasks" - Sirf incomplete tasks\n• "Completed tasks" - Complete hue tasks\n• "Dashboard status" - Statistics dekhein\n• "Finance summary" - Money overview\n• "All categories" - All categories ka summary\n• "Help" - Aur options dekhein\n\nAgar aap kisi specific task ya category ke bare mein janna chahte hain, toh detailed query bhejiye.`;
      }

      addAssistantMessage(aiResponse);
      setLoading(false);
    }, 800);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      ...addForm,
      amount: addForm.amount ? parseFloat(addForm.amount) : undefined,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
    setAddForm({ title: '', description: '', category: 'EXPENSE', amount: '' });
    addAssistantMessage(`New task "${newTask.title}" added successfully! 🎉`);
  };

  const addAssistantMessage = (content: string) => {
    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content, timestamp: new Date().toISOString() }]);
  };

  // Quick command handlers
  const handleQuickCommand = (command: string) => {
    setInputMessage(command);
    // Auto-send after setting the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || (filter === 'pending' && !task.completed) || (filter === 'completed' && task.completed);
    const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 border-b border-amber-400/10 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-amber-50" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400 italic tracking-tighter">FinanceTodoBot</h1>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Button size="sm" onClick={() => setShowAddModal(true)} className="bg-amber-400 hover:bg-amber-300 font-bold rounded-xl text-xs sm:text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button size="sm" onClick={() => setShowChat(!showChat)} className="bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl transition-all text-xs sm:text-sm">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">{showChat ? 'Close Chat' : 'AI ChatBot'}</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto flex-col lg:flex-row">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-full lg:w-64 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-r border-amber-400/10 p-4 sm:p-6 min-h-screen"
            >
              <nav className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-amber-400/60 uppercase tracking-widest mb-3">Overview</h3>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-amber-400/10 to-transparent p-3 rounded-lg border border-amber-400/20">
                      <div className="text-xs text-amber-200/60">Total Tasks</div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{stats.total}</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400/10 to-transparent p-3 rounded-lg border border-blue-400/20">
                      <div className="text-xs text-blue-200/60">Pending</div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{stats.pending}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-400/10 to-transparent p-3 rounded-lg border border-green-400/20">
                      <div className="text-xs text-green-200/60">Completed</div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{stats.completed}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-amber-400/60 uppercase tracking-widest mb-3">Categories</h3>
                  <div className="space-y-1 overflow-y-auto max-h-[400px]">
                    <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-bold ${selectedCategory === 'all' ? 'bg-amber-500/20 text-amber-500' : 'text-white/40'}`}>All Categories</button>
                    {Object.entries(FINANCE_CATEGORIES).map(([key, { icon: Icon, label }]) => (
                      <button key={key} onClick={() => setSelectedCategory(key)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-bold ${selectedCategory === key ? 'bg-amber-500/10 text-amber-500' : 'text-white/40 hover:text-white'}`}>
                        <Icon className="w-4 h-4" /> {label}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 p-4 sm:p-6 md:p-8 w-full">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
            {(['all', 'pending', 'completed'] as const).map(status => (
              <Button key={status} onClick={() => setFilter(status)} className={`rounded-xl font-bold text-xs sm:text-sm ${filter === status ? 'bg-amber-500 text-black' : 'bg-transparent border border-amber-500/20 text-amber-500 hover:bg-amber-500/5'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence>
              {filteredTasks.map(task => {
                const category = FINANCE_CATEGORIES[task.category];
                const isEditing = editingTask === task.id;

                return (
                  <motion.div key={task.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Card className="bg-gradient-to-br from-amber-400/[0.05] to-transparent border-amber-400/10 p-4 sm:p-5 rounded-[2rem] flex flex-col h-full group hover:border-amber-400/30 transition-all shadow-2xl overflow-hidden">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 shrink-0">
                            <category.icon className="w-4 h-4" />
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-black uppercase text-amber-400/40 tracking-widest truncate">{category.label}</span>
                        </div>
                        <button onClick={() => handleToggleComplete(task.id)} className="text-amber-400/40 hover:text-amber-400 transition-colors">
                          {task.completed ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /> : <Circle className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                      </div>

                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <div className="space-y-2 mb-4">
                            <Input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="bg-black/40 border-amber-500/20 text-white text-sm" />
                            <Input value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="bg-black/40 border-amber-500/20 text-white text-xs" />
                            <Input type="number" value={editForm.amount} onChange={e => setEditForm({...editForm, amount: e.target.value})} className="bg-black/40 border-amber-500/20 text-white text-sm" />
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">{task.title}</h3>
                            <p className="text-xs sm:text-sm text-white/30 line-clamp-1 mb-4">{task.description}</p>
                            {task.amount && (
                              <div className="bg-black/60 border border-white/5 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-5 overflow-hidden">
                                <p className="text-[8px] sm:text-[10px] font-bold text-amber-400/40 uppercase mb-1">Amount</p>
                                <div className="text-lg sm:text-xl font-black text-amber-400 truncate" title={`$${task.amount.toLocaleString()}`}>
                                  ${task.amount.toLocaleString()}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isEditing ? (
                          <>
                            <Button size="sm" onClick={() => handleSaveEdit(task.id)} className="flex-1 bg-amber-400/20 font-bold rounded-xl text-xs sm:text-sm"><Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingTask(null)} className="border-amber-400/20 text-amber-400 rounded-xl text-xs sm:text-sm">Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" className="flex-1 border-amber-400/20 text-amber-400 rounded-xl font-bold text-xs sm:text-sm" onClick={() => alert(`Title: ${task.title}\nDescription: ${task.description}\nAmount: ${task.amount}`)}>
                              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm" className="border-amber-400/20 text-amber-400 rounded-xl text-xs sm:text-sm" onClick={() => handleStartEdit(task)}>
                              <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-red-500/20 text-red-500 rounded-xl text-xs sm:text-sm" onClick={() => handleDeleteTask(task.id)}>
                              <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence>
          {showChat && (
            <motion.aside
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-full sm:w-80 md:w-96 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-l border-amber-500/10 flex flex-col h-screen fixed right-0 top-0 z-[60]"
            >
              <div className="p-4 sm:p-6 border-b border-amber-500/10 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">AI CHATBOT</h3>
                    <p className="text-[8px] sm:text-[10px] text-amber-500/60 uppercase font-black">FinanceTodo Intelligence</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowChat(false)} className="text-amber-500 hover:bg-amber-500/10">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-16 sm:py-20">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                    </div>
                    <p className="text-amber-200/40 text-xs sm:text-sm italic">"Try asking: show my tasks"</p>
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] sm:max-w-[85%] p-3 sm:p-4 rounded-[1.5rem] text-xs sm:text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-amber-600 text-black font-bold' : 'bg-white/5 text-amber-100 border border-amber-500/10'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-amber-400/10 p-4 rounded-full">
                      <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-6 border-t border-amber-400/10 bg-black/20">
                {/* Quick Command Buttons */}
                <div className="mb-3 sm:mb-4 flex flex-wrap gap-1 sm:gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("show my tasks")}
                    className="text-[10px] sm:text-xs border-amber-400/10 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/5"
                  >
                    📋 Tasks
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("pending tasks")}
                    className="text-[10px] sm:text-xs border-amber-400/10 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/5"
                  >
                    ⏳ Pending
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("completed tasks")}
                    className="text-[10px] sm:text-xs border-amber-400/10 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/5"
                  >
                    ✅ Completed
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("finance summary")}
                    className="text-[10px] sm:text-xs border-amber-400/10 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/5"
                  >
                    💰 Finance
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("dashboard status")}
                    className="text-[10px] sm:text-xs border-amber-400/10 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/5"
                  >
                    📊 Status
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickCommand("all categories")}
                    className="text-[10px] sm:text-xs border-amber-400/40 text-amber-500/70 hover:text-amber-300 hover:bg-amber-300/5"
                  >
                    📂 Categories
                  </Button>
                </div>

                <div className="flex gap-1 sm:gap-2">
                  <Input
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask anything..."
                    className="bg-white/5 border-amber-400/20 rounded-xl focus:border-amber-400/50 flex-1 text-sm"
                  />

                  {/* Help Button */}
                  <Button
                    onClick={handleHelpButton}
                    variant="outline"
                    disabled={loading}
                    className="border-amber-400/20 text-amber-400 hover:bg-amber-500/10 rounded-xl"
                    title="Get Help"
                  >
                    <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>

                  {/* Send Button */}
                  <Button onClick={handleSendMessage} disabled={loading} className="bg-amber-400 hover:bg-amber-300 text-black rounded-xl">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* Quick Tip */}
                <p className="text-[10px] sm:text-xs text-amber-500/40 mt-2 text-center">
                  💡 Tip: Click Help button for quick guide or use quick commands above
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#0a0a0a] border border-amber-400/20 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 max-w-xs sm:max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl sm:text-2xl font-black text-amber-400 mb-4 sm:mb-6 italic">Initialize New Task</h2>
              <div className="space-y-3 sm:space-y-4">
                <Input value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} placeholder="Task Title" className="bg-white/5 border-amber-400/10 h-10 sm:h-12 rounded-xl text-sm" />
                <Input value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} placeholder="Description" className="bg-white/5 border-amber-400/10 h-10 sm:h-12 rounded-xl text-sm" />
                <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value as any })} className="w-full bg-white/5 border border-amber-400/10 text-white rounded-xl h-10 sm:h-12 px-3 sm:px-4 focus:ring-1 focus:ring-amber-500 text-sm">
                  {Object.entries(FINANCE_CATEGORIES).map(([key, { label }]) => (
                    <option key={key} value={key} className="bg-[#0a0a0a]">{label}</option>
                  ))}
                </select>
                <Input type="number" value={addForm.amount} onChange={e => setAddForm({ ...addForm, amount: e.target.value })} placeholder="Amount (Optional)" className="bg-white/5 border-amber-400/10 h-10 sm:h-12 rounded-xl text-sm" />
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <Button onClick={handleAddTask} className="flex-1 bg-amber-400 hover:bg-amber-300 text-black font-black h-10 sm:h-12 rounded-xl text-sm">CREATE TASK</Button>
                  <Button onClick={() => setShowAddModal(false)} variant="outline" className="border-amber-400/20 text-amber-400 h-10 sm:h-12 rounded-xl text-sm">CANCEL</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}