# 📁 LuuTruScript - Adobe Illustrator Script Management Extension

**Professional script management solution for Adobe Illustrator with advanced category system and intuitive UI.**

## 🌟 Features Overview

### 📋 **Core Functionality**
- ✅ **Save & Organize Scripts** - Manage unlimited ExtendScript (.jsx) files
- ✅ **Category Management** - 6 default + unlimited custom categories  
- ✅ **Quick Execution** - Double-click scripts to run instantly
- ✅ **Import/Export** - Backup and share script collections
- ✅ **Search & Filter** - Find scripts by name or category
- ✅ **Persistent Storage** - LocalStorage saves all data

### 🎨 **Advanced Category System**
- ✅ **Default Categories**: General, Shapes, Colors, Text, Effects, Automation
- ✅ **Custom Categories**: Create unlimited categories with custom names
- ✅ **Color Picker**: Choose any color for custom categories using HTML5 color wheel
- ✅ **Preset Colors**: Quick selection from 9 popular colors
- ✅ **Category Management**: Edit colors and delete custom categories
- ✅ **Smart Migration**: Scripts automatically move to "General" when category is deleted

### 🎯 **User Experience**
- ✅ **Dark Theme** - Professional UI optimized for long coding sessions
- ✅ **Compact Layout** - Maximizes script list visibility
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Keyboard Shortcuts** - Ctrl+Enter to save, F5 to test
- ✅ **Visual Feedback** - Loading states and status messages
- ✅ **Modal Dialogs** - Intuitive category creation and management

## 🚀 Installation Guide

### Method 1: Manual Installation
1. **Download** the extension files
2. **Copy** `LuuTruScript` folder to:
   ```
   Windows: C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
   macOS: /Library/Application Support/Adobe/CEP/extensions/
   ```
3. **Enable Debug Mode** (if needed):
   - Run Registry Editor (Windows) or Terminal (macOS)
   - Set `PlayerDebugMode` to `1` in CEP registry
4. **Restart** Adobe Illustrator
5. **Access** via `Window > Extensions > Lưu Trữ Script`

### Method 2: Using ZXP Installer
1. **Package** folder as .zxp file using ZXP Packager
2. **Install** using Anastasiy's Extension Manager or ZXP Installer
3. **Restart** Adobe Illustrator

## 📖 Usage Instructions

### 🆕 **Creating Scripts**
1. **Enter script name** in the top field
2. **Select category** from dropdown (or create new)
3. **Write ExtendScript code** in the code editor
4. **Click Save** or press `Ctrl + Enter`

### 🏷️ **Managing Categories**
1. **Create New Category**:
   - Select "➕ Tạo danh mục mới..." from dropdown
   - Enter category name (max 20 characters)
   - Choose color using color picker or presets
   - Click "✅ Tạo" to confirm

2. **Manage Existing Categories**:
   - Click 🏷️ button in toolbar
   - View all default and custom categories
   - Edit colors using 🎨 button
   - Delete custom categories using 🗑️ button

### ▶️ **Running Scripts**
- **Double-click** any script in the list to execute immediately
- **Or** select script and click ▶️ button
- **Test Mode**: Click 🧪 to test current code without saving

### 📁 **Import/Export**
- **Import**: Click 📥 to load .jsx files
- **Export All**: Click 📤 to download all scripts as JSON
- **Clear All**: Click 🗑️ to remove all scripts (with confirmation)

## 🛠️ Technical Details

### **Architecture**
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Backend**: Adobe ExtendScript (CEP 5.0+)
- **Storage**: Browser LocalStorage
- **UI Framework**: Custom dark theme with CSS Grid/Flexbox

### **File Structure**
```
LuuTruScript/
├── index.html              # Main UI interface
├── CSXS/
│   └── manifest.xml         # CEP extension manifest
├── assets/
│   ├── css/
│   │   └── app.css          # Complete styling (600+ lines)
│   ├── js/
│   │   ├── app.js           # Main application logic (900+ lines)
│   │   └── CSInterface.js   # Adobe CEP interface
│   └── icons/               # Extension icons (normal, rollover, disabled)
├── scripts/
│   └── main.jsx             # ExtendScript backend utilities
└── README.md                # Documentation
```

### **Browser Compatibility**
- ✅ **Chrome/Chromium** (CEP embedded browser)
- ✅ **Safari WebKit** (macOS CEP)
- ✅ **Local Storage** support required

## 🎨 Color Picker Features

### **HTML5 Color Wheel**
- Full spectrum color selection
- Real-time preview
- Hex color output
- Cross-platform compatibility

### **Preset Color Palette**
```javascript
Preset Colors:
• #4a90e2 - Blue        • #50c878 - Green
• #ff6b6b - Red         • #ffa500 - Orange  
• #9b59b6 - Purple      • #f39c12 - Yellow
• #e91e63 - Pink        • #1abc9c - Teal
• #607d8b - Blue Grey
```

### **Dynamic Color Management**
- Colors save automatically to LocalStorage
- Visual feedback during color selection
- Category colors reflect throughout UI
- Smooth transitions and hover effects

## ⚡ Performance Features

### **Optimization**
- **Lazy Loading** - Scripts load on demand
- **Efficient DOM** - Minimal reflows and repaints
- **Smart Caching** - LocalStorage optimization
- **Event Delegation** - Optimized event handling

### **Memory Management**
- **Cleanup Functions** - Prevent memory leaks
- **Garbage Collection** - Proper object disposal
- **Minimal Global Scope** - Encapsulated modules

## 🐛 Troubleshooting

### **Common Issues**
1. **Extension not visible**: Enable CEP debug mode
2. **Scripts not saving**: Check LocalStorage permissions
3. **Import errors**: Ensure .jsx file format
4. **Color picker not working**: Update browser/CEP version

### **Debug Mode**
```bash
# Windows Registry
HKEY_CURRENT_USER\Software\Adobe\CSXS.5\PlayerDebugMode = "1"

# macOS Terminal  
defaults write com.adobe.CSXS.5 PlayerDebugMode 1
```

## 🤝 Contributing

### **Development Setup**
1. Clone repository
2. Open in VS Code or preferred editor
3. Test with Adobe Illustrator CC 2015+
4. Follow JavaScript ES5 syntax for CEP compatibility

### **Code Style**
- **JavaScript**: ES5 syntax, strict mode
- **CSS**: BEM methodology, mobile-first
- **HTML**: Semantic markup, accessibility

## 📄 License

**MIT License** - Feel free to modify and distribute

## 🎯 Roadmap

### **Upcoming Features**
- [ ] **Script Templates** - Predefined code snippets
- [ ] **Backup to Cloud** - Google Drive/Dropbox sync
- [ ] **Advanced Search** - Regex and tag-based filtering  
- [ ] **Script Dependencies** - Manage script relationships
- [ ] **Version Control** - Track script changes
- [ ] **Collaborative Features** - Share scripts with teams

## 📞 Support

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check inline code comments
- **Community**: Adobe Developer Forums

---

**Created with ❤️ for the Adobe Illustrator community**

*Transform your script workflow with professional category management and intuitive color organization.*
