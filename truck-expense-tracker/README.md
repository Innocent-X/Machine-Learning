# 🚚 Truck Driver Expense Tracker

A comprehensive web-based application designed specifically for truck drivers to track and manage their expenses on the road.

## Features

### 📊 Dashboard
- **Total Expenses**: View all-time expense totals
- **Monthly Expenses**: Track current month spending
- **Total Entries**: See the number of expense records

### 💰 Expense Management
- Add expenses with the following details:
  - Date
  - Category (Fuel, Tolls, Maintenance, Food, Lodging, Parking, Insurance, Other)
  - Amount
  - Location (optional)
  - Description (optional)

### 🔍 Filter & Sort
- Filter expenses by category
- Sort by:
  - Date (newest/oldest)
  - Amount (high to low / low to high)

### 📥 Export & Data Management
- Export all expenses to CSV format
- Data persists using browser localStorage
- Clear all expenses option

### 📱 Responsive Design
- Mobile-friendly interface
- Works on phones, tablets, and desktops
- Touch-optimized controls

## How to Use

1. **Open the Application**
   - Open `index.html` in any modern web browser
   - No installation or server required

2. **Add an Expense**
   - Fill in the expense form with required fields (Date, Category, Amount)
   - Optionally add Location and Description
   - Click "Add Expense" button

3. **View Expenses**
   - All expenses are displayed in the Expense History section
   - Use filters and sorting options to organize your view

4. **Export Data**
   - Click "📥 Export CSV" to download all expenses as a CSV file
   - Open in Excel, Google Sheets, or any spreadsheet application

5. **Delete Expenses**
   - Click the delete button on any expense to remove it
   - Use "Clear All" to delete all expenses (with confirmation)

## Categories Included

- ⛽ **Fuel**: Gas and diesel expenses
- 🛣️ **Tolls**: Highway and bridge tolls
- 🔧 **Maintenance**: Vehicle repairs and maintenance
- 🍔 **Food**: Meals and snacks on the road
- 🏨 **Lodging**: Hotels and accommodation
- 🅿️ **Parking**: Parking fees
- 📋 **Insurance**: Insurance payments
- 📦 **Other**: Miscellaneous expenses

## Technical Details

### Files
- `index.html` - Main application page
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and data management

### Technologies Used
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+)
- LocalStorage API for data persistence

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Data Storage

All expense data is stored locally in your browser using localStorage. This means:
- ✅ Your data stays private on your device
- ✅ No internet connection required
- ✅ Fast and instant access
- ⚠️ Data is browser-specific (clearing browser data will delete expenses)
- ⚠️ Make sure to export your data regularly as backup

## Tips for Truck Drivers

1. **Daily Tracking**: Add expenses at the end of each day
2. **Be Detailed**: Include location and notes for better records
3. **Regular Exports**: Export your data monthly for tax purposes
4. **Use Categories**: Proper categorization helps with reimbursement
5. **Keep Receipts**: This tracker complements physical receipts for auditing

## Privacy & Security

- All data is stored locally on your device
- No data is sent to any server
- No account or login required
- No tracking or analytics

## Future Enhancements (Potential)

- Receipt photo attachment
- Trip-based expense grouping
- Budget alerts and limits
- Multi-currency support
- Cloud sync option
- PDF export with reports

## Support

For issues or suggestions, please create an issue in the repository.

## License

Open source - free to use and modify.
