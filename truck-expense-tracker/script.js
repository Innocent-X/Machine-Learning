// Expense Tracker Application
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDate();
        this.renderExpenses();
        this.updateDashboard();
    }

    // Set today's date as default
    setDefaultDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.max = today; // Prevent future dates
    }

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        document.getElementById('clearForm').addEventListener('click', () => {
            this.clearForm();
        });

        document.getElementById('filterCategory').addEventListener('change', () => {
            this.renderExpenses();
        });

        document.getElementById('sortBy').addEventListener('change', () => {
            this.renderExpenses();
        });

        document.getElementById('exportCSV').addEventListener('click', () => {
            this.exportToCSV();
        });

        document.getElementById('clearAll').addEventListener('click', () => {
            this.clearAllExpenses();
        });
    }

    // Add new expense
    addExpense() {
        const expense = {
            id: Date.now(),
            date: document.getElementById('date').value,
            category: document.getElementById('category').value,
            amount: parseFloat(document.getElementById('amount').value),
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        };

        this.expenses.push(expense);
        this.saveExpenses();
        this.renderExpenses();
        this.updateDashboard();
        this.clearForm();
        this.showNotification('Expense added successfully!');
    }

    // Delete expense
    deleteExpense(id) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(exp => exp.id !== id);
            this.saveExpenses();
            this.renderExpenses();
            this.updateDashboard();
            this.showNotification('Expense deleted successfully!');
        }
    }

    // Clear form
    clearForm() {
        document.getElementById('expenseForm').reset();
        this.setDefaultDate();
    }

    // Get filtered and sorted expenses
    getFilteredExpenses() {
        const filterCategory = document.getElementById('filterCategory').value;
        const sortBy = document.getElementById('sortBy').value;

        let filtered = [...this.expenses];

        // Filter by category
        if (filterCategory) {
            filtered = filtered.filter(exp => exp.category === filterCategory);
        }

        // Sort expenses
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-desc':
                    return b.amount - a.amount;
                case 'amount-asc':
                    return a.amount - b.amount;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        return filtered;
    }

    // Render expenses list
    renderExpenses() {
        const expenseList = document.getElementById('expenseList');
        const filtered = this.getFilteredExpenses();

        if (filtered.length === 0) {
            expenseList.innerHTML = '<p class="empty-state">No expenses found. Add your first expense above!</p>';
            return;
        }

        expenseList.innerHTML = filtered.map(expense => {
            const categoryIcons = {
                fuel: '⛽',
                tolls: '🛣️',
                maintenance: '🔧',
                food: '🍔',
                lodging: '🏨',
                parking: '🅿️',
                insurance: '📋',
                other: '📦'
            };

            const icon = categoryIcons[expense.category] || '📦';
            const formattedDate = new Date(expense.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <div class="expense-header">
                            <span class="category-icon">${icon}</span>
                            <span class="expense-category">${this.capitalizeFirst(expense.category)}</span>
                            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
                        </div>
                        <div class="expense-details">
                            <div><span class="expense-date">📅 ${formattedDate}</span></div>
                            ${expense.location ? `<div>📍 ${expense.location}</div>` : ''}
                            ${expense.description ? `<div>📝 ${expense.description}</div>` : ''}
                        </div>
                    </div>
                    <div class="expense-actions">
                        <button class="delete-btn" onclick="tracker.deleteExpense(${expense.id})">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update dashboard statistics
    updateDashboard() {
        const total = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        document.getElementById('totalExpenses').textContent = `$${total.toFixed(2)}`;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthTotal = this.expenses
            .filter(exp => {
                const expDate = new Date(exp.date);
                return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
            })
            .reduce((sum, exp) => sum + exp.amount, 0);
        document.getElementById('monthExpenses').textContent = `$${monthTotal.toFixed(2)}`;

        document.getElementById('totalEntries').textContent = this.expenses.length;
    }

    // Export to CSV
    exportToCSV() {
        if (this.expenses.length === 0) {
            alert('No expenses to export!');
            return;
        }

        const headers = ['Date', 'Category', 'Amount', 'Location', 'Description'];
        const csvContent = [
            headers.join(','),
            ...this.expenses.map(exp => [
                exp.date,
                exp.category,
                exp.amount.toFixed(2),
                `"${exp.location || ''}"`,
                `"${exp.description || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `truck-expenses-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showNotification('Expenses exported successfully!');
    }

    // Clear all expenses
    clearAllExpenses() {
        if (confirm('Are you sure you want to delete ALL expenses? This cannot be undone!')) {
            this.expenses = [];
            this.saveExpenses();
            this.renderExpenses();
            this.updateDashboard();
            this.showNotification('All expenses cleared!');
        }
    }

    // Save to localStorage
    saveExpenses() {
        localStorage.setItem('truckExpenses', JSON.stringify(this.expenses));
    }

    // Load from localStorage
    loadExpenses() {
        const saved = localStorage.getItem('truckExpenses');
        return saved ? JSON.parse(saved) : [];
    }

    // Utility: Capitalize first letter
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        // Add animation styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the tracker
const tracker = new ExpenseTracker();
