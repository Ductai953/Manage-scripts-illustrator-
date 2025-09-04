// Main JavaScript for Lưu Trữ Script Extension
// Learning from TaoHinhVuong patterns

(function() {
    'use strict';
    
    // Extension instance
    var csInterface = new CSInterface();
    
    // Storage key for localStorage
    var STORAGE_KEY = 'luutru_scripts';
    
    // DOM elements
    var elements = {
        scriptName: null,
        scriptCategory: null,
        scriptCode: null,
        saveScript: null,
        testScript: null,
        categoryFilter: null,
        refreshList: null,
        scriptsList: null,
        importScript: null,
        exportAll: null,
        clearAll: null,
        status: null,
        fileInput: null,
        categoryModal: null,
        newCategoryName: null,
        confirmCategory: null,
        cancelCategory: null,
        manageCategoriesBtn: null,
        manageCategoriesModal: null,
        customCategoriesList: null,
        addNewCategoryFromManage: null,
        closeManageCategories: null,
        deleteConfirmModal: null,
        deleteCategoryName: null,
        confirmDelete: null,
        cancelDelete: null
    };
    
    // Scripts data
    var scripts = [];
    var selectedScript = null;
    var customCategories = []; // Store custom categories
    var editingCategoryId = null; // Track editing category
    
    // Initialize extension
    function init() {
        console.log('Initializing Lưu Trữ Script Extension...');
        
        // Get DOM elements
        getDOMElements();
        
        // Bind events
        bindEvents();
        
        // Load saved scripts
        loadScripts();
        
        // Load custom categories
        loadCustomCategories();
        
        // Set initial status
        updateStatus('Sẵn sàng. Double-click vào script để chạy ngay!', 'success');
        
        console.log('Lưu Trữ Script Extension initialized');
    }
    
    function getDOMElements() {
        elements.scriptName = document.getElementById('scriptName');
        elements.scriptCategory = document.getElementById('scriptCategory');
        elements.scriptCode = document.getElementById('scriptCode');
        elements.saveScript = document.getElementById('saveScript');
        elements.testScript = document.getElementById('testScript');
        elements.categoryFilter = document.getElementById('categoryFilter');
        elements.refreshList = document.getElementById('refreshList');
        elements.scriptsList = document.getElementById('scriptsList');
        elements.importScript = document.getElementById('importScript');
        elements.exportAll = document.getElementById('exportAll');
        elements.clearAll = document.getElementById('clearAll');
        elements.status = document.getElementById('status');
        elements.fileInput = document.getElementById('fileInput');
        elements.categoryModal = document.getElementById('categoryModal');
        elements.newCategoryName = document.getElementById('newCategoryName');
        elements.confirmCategory = document.getElementById('confirmCategory');
        elements.cancelCategory = document.getElementById('cancelCategory');
        elements.manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
        elements.manageCategoriesModal = document.getElementById('manageCategoriesModal');
        elements.customCategoriesList = document.getElementById('customCategoriesList');
        elements.addNewCategoryFromManage = document.getElementById('addNewCategoryFromManage');
        elements.closeManageCategories = document.getElementById('closeManageCategories');
        elements.deleteConfirmModal = document.getElementById('deleteConfirmModal');
        elements.deleteCategoryName = document.getElementById('deleteCategoryName');
        elements.confirmDelete = document.getElementById('confirmDelete');
        elements.cancelDelete = document.getElementById('cancelDelete');
        elements.categoryColorPicker = document.getElementById('categoryColorPicker');
        elements.colorPreview = document.getElementById('colorPreview');
        elements.editColorModal = document.getElementById('editColorModal');
        elements.editingCategoryName = document.getElementById('editingCategoryName');
        elements.editCategoryColorPicker = document.getElementById('editCategoryColorPicker');
        elements.editColorPreview = document.getElementById('editColorPreview');
        elements.confirmEditColor = document.getElementById('confirmEditColor');
        elements.cancelEditColor = document.getElementById('cancelEditColor');
    }
    
    function bindEvents() {
        // Save script
        elements.saveScript.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            saveScript();
        });
        
        // Test script
        elements.testScript.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            testCurrentScript();
        });
        
        // Filter scripts
        elements.categoryFilter.addEventListener('change', filterScripts);
        
        // Refresh list
        elements.refreshList.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            renderScriptsList();
        });
        
        // Import script
        elements.importScript.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            elements.fileInput.click();
        });
        
        // File input change
        elements.fileInput.addEventListener('change', handleFileImport);
        
        // Export all
        elements.exportAll.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            exportAllScripts();
        });
        
        // Clear all
        elements.clearAll.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            clearAllScripts();
        });
        
        // Enter key support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                saveScript();
            } else if (e.key === 'F5' || (e.key === 'r' && e.ctrlKey)) {
                e.preventDefault();
                testCurrentScript();
            }
        });
        
        // Category dropdown change
        elements.scriptCategory.addEventListener('change', function() {
            if (this.value === '__create_new__') {
                showCategoryModal();
            }
        });
        
        // Modal events
        elements.confirmCategory.addEventListener('click', createNewCategory);
        elements.cancelCategory.addEventListener('click', hideCategoryModal);
        
        // Modal keyboard events
        elements.newCategoryName.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                createNewCategory();
            } else if (e.key === 'Escape') {
                hideCategoryModal();
            }
        });
        
        // Click outside modal to close
        elements.categoryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideCategoryModal();
            }
        });
        
        // Manage Categories button
        elements.manageCategoriesBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 150);
            showManageCategoriesModal();
        });
        
        // Manage Categories Modal events
        elements.addNewCategoryFromManage.addEventListener('click', function() {
            hideManageCategoriesModal();
            showCategoryModal();
        });
        
        elements.closeManageCategories.addEventListener('click', hideManageCategoriesModal);
        
        // Delete confirmation modal events
        elements.confirmDelete.addEventListener('click', confirmDeleteCategory);
        elements.cancelDelete.addEventListener('click', hideDeleteConfirmModal);
        
        // Color picker events
        elements.categoryColorPicker.addEventListener('input', function() {
            updateColorPreview(this.value, elements.colorPreview);
        });
        
        elements.editCategoryColorPicker.addEventListener('input', function() {
            updateColorPreview(this.value, elements.editColorPreview);
        });
        
        // Edit color modal events
        elements.confirmEditColor.addEventListener('click', confirmEditColor);
        elements.cancelEditColor.addEventListener('click', hideEditColorModal);
        
        // Setup preset color click events
        setupPresetColorEvents();
        
        // Close modals when clicking outside
        elements.manageCategoriesModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideManageCategoriesModal();
            }
        });
        
        elements.deleteConfirmModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideDeleteConfirmModal();
            }
        });
        
        elements.editColorModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideEditColorModal();
            }
        });
    }
    
    function saveScript() {
        var name = elements.scriptName.value.trim();
        var category = elements.scriptCategory.value;
        var code = elements.scriptCode.value.trim();
        
        if (!name) {
            updateStatus('Vui lòng nhập tên script!', 'error');
            elements.scriptName.focus();
            return;
        }
        
        if (!code) {
            updateStatus('Vui lòng nhập code script!', 'error');
            elements.scriptCode.focus();
            return;
        }
        
        // Check if script name exists
        var existingIndex = scripts.findIndex(s => s.name === name);
        
        var scriptData = {
            id: existingIndex >= 0 ? scripts[existingIndex].id : generateId(),
            name: name,
            category: category,
            code: code,
            created: existingIndex >= 0 ? scripts[existingIndex].created : new Date().toISOString(),
            modified: new Date().toISOString()
        };
        
        if (existingIndex >= 0) {
            // Update existing script
            scripts[existingIndex] = scriptData;
            updateStatus(`Script "${name}" đã được cập nhật!`, 'success');
        } else {
            // Add new script
            scripts.push(scriptData);
            updateStatus(`Script "${name}" đã được lưu!`, 'success');
        }
        
        // Save to localStorage
        saveScripts();
        
        // Refresh list
        renderScriptsList();
        
        // Clear form
        clearForm();
    }
    
    function testCurrentScript() {
        var code = elements.scriptCode.value.trim();
        
        if (!code) {
            updateStatus('Không có code để test!', 'error');
            return;
        }
        
        updateStatus('Đang chạy script...', 'warning');
        
        // Execute script in Illustrator
        csInterface.evalScript(code, function(result) {
            if (result && result !== 'undefined') {
                try {
                    var response = JSON.parse(result);
                    if (response.success) {
                        updateStatus('Script chạy thành công!', 'success');
                    } else {
                        updateStatus('Lỗi: ' + response.error, 'error');
                    }
                } catch (e) {
                    updateStatus('Script đã được thực thi!', 'success');
                }
            } else {
                updateStatus('Script đã được thực thi!', 'success');
            }
        });
    }
    
    function runScript(scriptId) {
        var script = scripts.find(s => s.id === scriptId);
        if (!script) {
            updateStatus('Không tìm thấy script!', 'error');
            return;
        }
        
        updateStatus(`Đang chạy "${script.name}"...`, 'warning');
        
        csInterface.evalScript(script.code, function(result) {
            if (result && result !== 'undefined') {
                try {
                    var response = JSON.parse(result);
                    if (response.success) {
                        updateStatus(`"${script.name}" chạy thành công!`, 'success');
                    } else {
                        updateStatus('Lỗi: ' + response.error, 'error');
                    }
                } catch (e) {
                    updateStatus(`"${script.name}" đã được thực thi!`, 'success');
                }
            } else {
                updateStatus(`"${script.name}" đã được thực thi!`, 'success');
            }
        });
    }
    
    function loadScripts() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                scripts = JSON.parse(saved);
                console.log('Loaded', scripts.length, 'scripts');
            }
        } catch (e) {
            console.error('Error loading scripts:', e);
            scripts = [];
        }
        
        renderScriptsList();
    }
    
    function saveScripts() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
            console.log('Scripts saved to localStorage');
        } catch (e) {
            console.error('Error saving scripts:', e);
            updateStatus('Lỗi khi lưu scripts!', 'error');
        }
    }
    
    function renderScriptsList() {
        var filter = elements.categoryFilter.value;
        var filteredScripts = filter === 'all' ? scripts : scripts.filter(s => s.category === filter);
        
        if (filteredScripts.length === 0) {
            elements.scriptsList.innerHTML = `
                <div class="empty-state">
                    <div class="icon">📜</div>
                    <p>Không có script nào${filter !== 'all' ? ' trong danh mục này' : ''}.</p>
                    <p>Hãy thêm script mới! 👆</p>
                </div>
            `;
            return;
        }
        
        var html = filteredScripts.map(script => {
            var category = getAllCategories().find(c => c.id === script.category);
            var categoryStyle = category && category.color ? `style="background-color: ${category.color};"` : '';
            
            return `
            <div class="script-item category-${script.category}" data-id="${script.id}">
                <div class="script-header">
                    <div class="script-name">${escapeHtml(script.name)}</div>
                    <div class="script-category ${script.category}" ${categoryStyle}>${getCategoryLabel(script.category)}</div>
                </div>
                <div class="script-preview">${escapeHtml(script.code.split('\n')[0].substring(0, 50))}...</div>
                <div class="script-actions">
                    <button class="action-btn run" onclick="LuuTruScriptApp.runScript('${script.id}')" title="Chạy">▶️</button>
                    <button class="action-btn edit" onclick="LuuTruScriptApp.editScript('${script.id}')" title="Sửa">✏️</button>
                    <button class="action-btn delete" onclick="LuuTruScriptApp.deleteScript('${script.id}')" title="Xóa">🗑️</button>
                </div>
            </div>
        `;}).join('');
        
        elements.scriptsList.innerHTML = html;
        
        // Add double-click event to run scripts
        elements.scriptsList.querySelectorAll('.script-item').forEach(item => {
            item.addEventListener('dblclick', function() {
                var scriptId = this.getAttribute('data-id');
                runScript(scriptId);
            });
            
            item.addEventListener('click', function() {
                elements.scriptsList.querySelectorAll('.script-item').forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                selectedScript = this.getAttribute('data-id');
            });
        });
    }
    
    function filterScripts() {
        renderScriptsList();
        updateStatus(`Lọc theo: ${getCategoryLabel(elements.categoryFilter.value)}`, 'success');
    }
    
    function editScript(scriptId) {
        var script = scripts.find(s => s.id === scriptId);
        if (!script) return;
        
        elements.scriptName.value = script.name;
        elements.scriptCategory.value = script.category;
        elements.scriptCode.value = script.code;
        
        updateStatus(`Đang chỉnh sửa "${script.name}"`, 'warning');
    }
    
    function deleteScript(scriptId) {
        var script = scripts.find(s => s.id === scriptId);
        if (!script) return;
        
        if (confirm(`Bạn có chắc muốn xóa script "${script.name}"?`)) {
            scripts = scripts.filter(s => s.id !== scriptId);
            saveScripts();
            renderScriptsList();
            updateStatus(`Đã xóa script "${script.name}"`, 'success');
        }
    }
    
    function handleFileImport(e) {
        var file = e.target.files[0];
        if (!file) return;
        
        var reader = new FileReader();
        reader.onload = function(event) {
            var content = event.target.result;
            var name = file.name.replace(/\.(jsx|js)$/i, '');
            
            elements.scriptName.value = name;
            elements.scriptCode.value = content;
            
            updateStatus(`Đã import "${name}"`, 'success');
        };
        reader.readAsText(file);
        
        // Clear input
        e.target.value = '';
    }
    
    function exportAllScripts() {
        if (scripts.length === 0) {
            updateStatus('Không có script nào để export!', 'error');
            return;
        }
        
        var data = {
            version: '1.0.0',
            exported: new Date().toISOString(),
            scripts: scripts
        };
        
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = 'scripts_backup_' + new Date().getTime() + '.json';
        a.click();
        
        URL.revokeObjectURL(url);
        updateStatus(`Đã export ${scripts.length} scripts!`, 'success');
    }
    
    function clearAllScripts() {
        if (scripts.length === 0) {
            updateStatus('Không có script nào để xóa!', 'warning');
            return;
        }
        
        if (confirm(`Bạn có chắc muốn xóa tất cả ${scripts.length} scripts?`)) {
            scripts = [];
            saveScripts();
            renderScriptsList();
            clearForm();
            updateStatus('Đã xóa tất cả scripts!', 'success');
        }
    }
    
    function clearForm() {
        elements.scriptName.value = '';
        elements.scriptCode.value = '';
        elements.scriptCategory.value = 'general';
    }
    
    // Category Management Functions
    
    function hideCategoryModal() {
        elements.categoryModal.style.display = 'none';
        elements.scriptCategory.value = 'general'; // Reset to default
        
        // Clear selected presets
        document.querySelectorAll('.preset-color:not(.edit-preset)').forEach(p => p.classList.remove('selected'));
    }
    
    function createNewCategory() {
        var categoryName = elements.newCategoryName.value.trim();
        
        if (!categoryName) {
            alert('Vui lòng nhập tên danh mục!');
            elements.newCategoryName.focus();
            return;
        }
        
        // Validate category name
        if (categoryName.length > 20) {
            alert('Tên danh mục không được quá 20 ký tự!');
            elements.newCategoryName.focus();
            return;
        }
        
        // Check if category already exists
        var categoryId = slugify(categoryName);
        var existingCategories = getDefaultCategories();
        var allCategories = existingCategories.concat(customCategories);
        
        if (allCategories.find(cat => cat.id === categoryId)) {
            alert('Danh mục này đã tồn tại!');
            elements.newCategoryName.focus();
            return;
        }
        
        // Add new category
        var newCategory = {
            id: categoryId,
            name: categoryName,
            color: elements.categoryColorPicker.value
        };
        
        customCategories.push(newCategory);
        saveCustomCategories();
        updateCategoryDropdowns();
        
        // Update manage categories modal if it's open
        if (elements.manageCategoriesModal.style.display === 'block') {
            renderCustomCategoriesList();
        }
        
        // Select the new category
        elements.scriptCategory.value = categoryId;
        
        hideCategoryModal();
        updateStatus(`Đã tạo danh mục "${categoryName}"!`, 'success');
    }
    
    function slugify(text) {
        return text.toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
    }
    
    function getRandomColor() {
        var colors = ['#607d8b', '#4caf50', '#ff9800', '#2196f3', '#9c27b0', '#f44336', '#795548', '#009688', '#ff5722', '#3f51b5'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function getDefaultCategories() {
        return [
            { id: 'general', name: 'Tổng quát' },
            { id: 'shapes', name: 'Hình dạng' },
            { id: 'colors', name: 'Màu sắc' },
            { id: 'text', name: 'Văn bản' },
            { id: 'effects', name: 'Hiệu ứng' },
            { id: 'automation', name: 'Tự động hóa' }
        ];
    }
    
    function getAllCategories() {
        return getDefaultCategories().concat(customCategories);
    }
    
    function updateCategoryDropdowns() {
        var allCategories = getAllCategories();
        
        // Update script category dropdown
        var scriptCategoryHtml = allCategories.map(cat => 
            `<option value="${cat.id}">${cat.name}</option>`
        ).join('') + '<option value="__create_new__">➕ Tạo danh mục mới...</option>';
        
        elements.scriptCategory.innerHTML = scriptCategoryHtml;
        
        // Update filter dropdown
        var filterHtml = '<option value="all">Tất cả danh mục</option>' + 
            allCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        
        elements.categoryFilter.innerHTML = filterHtml;
    }
    
    function saveCustomCategories() {
        try {
            localStorage.setItem('luutru_custom_categories', JSON.stringify(customCategories));
        } catch (e) {
            console.error('Error saving custom categories:', e);
        }
    }
    
    function loadCustomCategories() {
        try {
            var saved = localStorage.getItem('luutru_custom_categories');
            if (saved) {
                customCategories = JSON.parse(saved);
                updateCategoryDropdowns();
            }
        } catch (e) {
            console.error('Error loading custom categories:', e);
            customCategories = [];
        }
    }
    
    function updateStatus(message, type) {
        if (!elements.status) return;
        
        elements.status.textContent = message;
        elements.status.className = 'status';
        
        if (type) {
            elements.status.classList.add(type);
        }
        
        console.log('Status:', message, type);
    }
    
    // Utility functions
    function generateId() {
        return 'script_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function getCategoryLabel(category) {
        var allCategories = getAllCategories();
        var cat = allCategories.find(c => c.id === category);
        return cat ? cat.name : category;
    }
    
    // Category Management Functions
    function showManageCategoriesModal() {
        renderCustomCategoriesList();
        elements.manageCategoriesModal.style.display = 'block';
    }
    
    function hideManageCategoriesModal() {
        elements.manageCategoriesModal.style.display = 'none';
    }
    
    function renderCustomCategoriesList() {
        var customCatsContainer = elements.customCategoriesList;
        
        if (customCategories.length === 0) {
            customCatsContainer.innerHTML = '';
            return;
        }
        
        var html = customCategories.map(function(category) {
            return `
                <div class="category-item" data-category-id="${category.id}">
                    <span class="category-color" style="background: ${category.color || '#4a90e2'};"></span>
                    <span class="category-name">${category.name}</span>
                    <span class="category-type">Tùy chỉnh</span>
                    <div class="category-actions">
                        <button class="edit-category-btn" data-category-id="${category.id}" title="Đổi màu">
                            🎨
                        </button>
                        <button class="delete-category-btn" data-category-id="${category.id}" title="Xóa danh mục">
                            🗑️
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        customCatsContainer.innerHTML = html;
        
        // Bind edit color events
        customCatsContainer.querySelectorAll('.edit-category-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var categoryId = this.getAttribute('data-category-id');
                var category = customCategories.find(cat => cat.id === categoryId);
                if (category) {
                    showEditColorModal(categoryId, category.name, category.color);
                }
            });
        });
        
        // Bind delete events
        customCatsContainer.querySelectorAll('.delete-category-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var categoryId = this.getAttribute('data-category-id');
                var category = customCategories.find(cat => cat.id === categoryId);
                if (category) {
                    showDeleteConfirmModal(categoryId, category.name);
                }
            });
        });
    }
    
    function showDeleteConfirmModal(categoryId, categoryName) {
        elements.deleteCategoryName.textContent = categoryName;
        elements.deleteConfirmModal.style.display = 'block';
        
        // Store category ID for deletion
        elements.confirmDelete.setAttribute('data-category-id', categoryId);
    }
    
    function hideDeleteConfirmModal() {
        elements.deleteConfirmModal.style.display = 'none';
        elements.confirmDelete.removeAttribute('data-category-id');
    }
    
    function confirmDeleteCategory() {
        var categoryId = elements.confirmDelete.getAttribute('data-category-id');
        if (!categoryId) return;
        
        // Find the category to delete
        var categoryIndex = customCategories.findIndex(cat => cat.id === categoryId);
        if (categoryIndex === -1) return;
        
        var categoryName = customCategories[categoryIndex].name;
        
        // Move all scripts from this category to 'general'
        scripts.forEach(function(script) {
            if (script.category === categoryId) {
                script.category = 'general';
            }
        });
        
        // Remove the category
        customCategories.splice(categoryIndex, 1);
        
        // Save updates
        saveScripts();
        saveCustomCategories();
        
        // Update UI
        updateCategoryDropdowns();
        renderCustomCategoriesList();
        filterScripts();
        
        // Close modals
        hideDeleteConfirmModal();
        
        updateStatus(`Đã xóa danh mục "${categoryName}" và chuyển script về "Tổng quát"`, 'success');
    }
    
    function saveCustomCategories() {
        try {
            localStorage.setItem('luutru_custom_categories', JSON.stringify(customCategories));
        } catch (e) {
            console.error('Error saving custom categories:', e);
        }
    }
    
    function loadCustomCategories() {
        try {
            var saved = localStorage.getItem('luutru_custom_categories');
            if (saved) {
                customCategories = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading custom categories:', e);
            customCategories = [];
        }
    }
    
    // Color Picker Functions
    function updateColorPreview(color, previewElement) {
        if (previewElement) {
            previewElement.style.background = color;
        }
    }
    
    function setupPresetColorEvents() {
        // Setup for create modal
        var createPresets = document.querySelectorAll('.preset-color:not(.edit-preset)');
        createPresets.forEach(function(preset) {
            preset.addEventListener('click', function() {
                var color = this.getAttribute('data-color');
                elements.categoryColorPicker.value = color;
                updateColorPreview(color, elements.colorPreview);
                
                // Update selected state
                createPresets.forEach(p => p.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Setup for edit modal
        var editPresets = document.querySelectorAll('.edit-preset');
        editPresets.forEach(function(preset) {
            preset.addEventListener('click', function() {
                var color = this.getAttribute('data-color');
                elements.editCategoryColorPicker.value = color;
                updateColorPreview(color, elements.editColorPreview);
                
                // Update selected state
                editPresets.forEach(p => p.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    function showEditColorModal(categoryId, categoryName, currentColor) {
        elements.editingCategoryName.textContent = categoryName;
        elements.editCategoryColorPicker.value = currentColor;
        updateColorPreview(currentColor, elements.editColorPreview);
        
        // Store category ID for editing
        elements.confirmEditColor.setAttribute('data-category-id', categoryId);
        
        // Update selected preset
        var editPresets = document.querySelectorAll('.edit-preset');
        editPresets.forEach(function(preset) {
            if (preset.getAttribute('data-color') === currentColor) {
                preset.classList.add('selected');
            } else {
                preset.classList.remove('selected');
            }
        });
        
        elements.editColorModal.style.display = 'block';
    }
    
    function hideEditColorModal() {
        elements.editColorModal.style.display = 'none';
        elements.confirmEditColor.removeAttribute('data-category-id');
        
        // Clear selected presets
        document.querySelectorAll('.edit-preset').forEach(p => p.classList.remove('selected'));
    }
    
    function confirmEditColor() {
        var categoryId = elements.confirmEditColor.getAttribute('data-category-id');
        if (!categoryId) return;
        
        var newColor = elements.editCategoryColorPicker.value;
        
        // Find and update category
        var category = customCategories.find(cat => cat.id === categoryId);
        if (category) {
            category.color = newColor;
            
            // Save and update UI
            saveCustomCategories();
            renderCustomCategoriesList();
            filterScripts(); // Update script list colors
            
            hideEditColorModal();
            updateStatus(`Đã cập nhật màu cho danh mục "${category.name}"`, 'success');
        }
    }
    
    function showCategoryModal() {
        // Reset color picker to default
        elements.categoryColorPicker.value = '#4a90e2';
        updateColorPreview('#4a90e2', elements.colorPreview);
        
        // Clear input
        elements.newCategoryName.value = '';
        
        // Reset selected presets
        document.querySelectorAll('.preset-color:not(.edit-preset)').forEach(function(preset) {
            if (preset.getAttribute('data-color') === '#4a90e2') {
                preset.classList.add('selected');
            } else {
                preset.classList.remove('selected');
            }
        });
        
        elements.categoryModal.style.display = 'block';
        elements.newCategoryName.focus();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for debugging and external access
    window.LuuTruScriptApp = {
        runScript: runScript,
        editScript: editScript,
        deleteScript: deleteScript,
        saveScript: saveScript,
        testCurrentScript: testCurrentScript,
        updateStatus: updateStatus,
        scripts: scripts
    };
    
})();
