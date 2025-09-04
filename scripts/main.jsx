// ExtendScript for Adobe Illustrator
// Lưu Trữ Script Extension
// Learning from TaoHinhVuong patterns

try {
    
    // Global utility functions
    function getActiveDocument() {
        if (app.documents.length === 0) {
            throw new Error("Không có document nào đang mở. Vui lòng tạo hoặc mở một document.");
        }
        return app.activeDocument;
    }
    
    // Script execution wrapper
    function executeScript(scriptCode) {
        try {
            // Validate script code
            if (!scriptCode || typeof scriptCode !== 'string') {
                throw new Error("Script code không hợp lệ");
            }
            
            // Remove any dangerous functions (basic security)
            var dangerousFunctions = ['File', 'Folder', 'system', 'app.quit'];
            for (var i = 0; i < dangerousFunctions.length; i++) {
                if (scriptCode.indexOf(dangerousFunctions[i]) !== -1) {
                    throw new Error("Script chứa hàm không được phép: " + dangerousFunctions[i]);
                }
            }
            
            // Execute the script
            eval(scriptCode);
            
            return JSON.stringify({
                success: true,
                message: "Script đã được thực thi thành công",
                timestamp: new Date().toString()
            });
            
        } catch (error) {
            return JSON.stringify({
                success: false,
                error: error.toString(),
                timestamp: new Date().toString()
            });
        }
    }
    
    // Common utility functions for scripts
    function createRectangle(width, height, x, y) {
        try {
            var doc = getActiveDocument();
            
            var rect = doc.pathItems.rectangle(
                y || 0,           // top
                x || 0,           // left
                width || 100,     // width
                height || 100     // height
            );
            
            return rect;
            
        } catch (error) {
            throw new Error("Lỗi khi tạo hình chữ nhật: " + error.toString());
        }
    }
    
    function createCircle(radius, x, y) {
        try {
            var doc = getActiveDocument();
            
            var circle = doc.pathItems.ellipse(
                y || 0,           // top
                x || 0,           // left
                radius * 2 || 100, // width
                radius * 2 || 100  // height
            );
            
            return circle;
            
        } catch (error) {
            throw new Error("Lỗi khi tạo hình tròn: " + error.toString());
        }
    }
    
    function setObjectColor(object, colorHex, isStroke) {
        try {
            // Convert hex to RGB
            var hex = colorHex.replace('#', '');
            var r = parseInt(hex.substring(0, 2), 16);
            var g = parseInt(hex.substring(2, 4), 16);
            var b = parseInt(hex.substring(4, 6), 16);
            
            var color = new RGBColor();
            color.red = r;
            color.green = g;
            color.blue = b;
            
            if (isStroke) {
                object.stroked = true;
                object.strokeColor = color;
            } else {
                object.filled = true;
                object.fillColor = color;
            }
            
        } catch (error) {
            throw new Error("Lỗi khi thiết lập màu: " + error.toString());
        }
    }
    
    function getSelectedObjects() {
        try {
            var doc = getActiveDocument();
            return doc.selection;
        } catch (error) {
            throw new Error("Lỗi khi lấy đối tượng đã chọn: " + error.toString());
        }
    }
    
    function centerObjectOnArtboard(object) {
        try {
            var doc = getActiveDocument();
            var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
            var artboardRect = artboard.artboardRect;
            
            var centerX = (artboardRect[0] + artboardRect[2]) / 2;
            var centerY = (artboardRect[1] + artboardRect[3]) / 2;
            
            var bounds = object.geometricBounds;
            var objectWidth = bounds[2] - bounds[0];
            var objectHeight = bounds[1] - bounds[3];
            
            object.position = [centerX - objectWidth/2, centerY + objectHeight/2];
            
        } catch (error) {
            throw new Error("Lỗi khi căn giữa đối tượng: " + error.toString());
        }
    }
    
    // Sample scripts that can be saved and executed
    function sampleCreateGrid() {
        try {
            var doc = getActiveDocument();
            var rows = 5;
            var cols = 5;
            var spacing = 50;
            var size = 40;
            
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var rect = doc.pathItems.rectangle(
                        -i * spacing,
                        j * spacing,
                        size,
                        size
                    );
                    
                    // Alternate colors
                    if ((i + j) % 2 === 0) {
                        rect.filled = true;
                        var color = new RGBColor();
                        color.red = 100;
                        color.green = 150;
                        color.blue = 200;
                        rect.fillColor = color;
                    } else {
                        rect.filled = false;
                        rect.stroked = true;
                        rect.strokeWidth = 1;
                    }
                }
            }
            
            return JSON.stringify({
                success: true,
                message: "Đã tạo lưới " + rows + "x" + cols + " thành công"
            });
            
        } catch (error) {
            return JSON.stringify({
                success: false,
                error: error.toString()
            });
        }
    }
    
    function sampleRandomColors() {
        try {
            var selection = getSelectedObjects();
            
            if (selection.length === 0) {
                throw new Error("Vui lòng chọn ít nhất một đối tượng");
            }
            
            for (var i = 0; i < selection.length; i++) {
                var object = selection[i];
                
                if (object.typename === 'PathItem') {
                    var color = new RGBColor();
                    color.red = Math.floor(Math.random() * 256);
                    color.green = Math.floor(Math.random() * 256);
                    color.blue = Math.floor(Math.random() * 256);
                    
                    object.filled = true;
                    object.fillColor = color;
                }
            }
            
            return JSON.stringify({
                success: true,
                message: "Đã áp dụng màu ngẫu nhiên cho " + selection.length + " đối tượng"
            });
            
        } catch (error) {
            return JSON.stringify({
                success: false,
                error: error.toString()
            });
        }
    }
    
    // Document information
    function getDocumentInfo() {
        try {
            var doc = getActiveDocument();
            var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
            var artboardRect = artboard.artboardRect;
            
            return JSON.stringify({
                success: true,
                document: {
                    name: doc.name,
                    width: artboardRect[2] - artboardRect[0],
                    height: artboardRect[1] - artboardRect[3],
                    units: doc.rulerUnits.toString(),
                    pathItems: doc.pathItems.length,
                    textFrames: doc.textFrames.length,
                    selection: doc.selection.length
                }
            });
            
        } catch (error) {
            return JSON.stringify({
                success: false,
                error: error.toString()
            });
        }
    }
    
    // Event handling functions
    function dispatchEvent(eventType, data) {
        try {
            var event = new CSXSEvent();
            event.type = eventType;
            event.data = data;
            event.dispatch();
        } catch (error) {
            // Handle error silently
        }
    }
    
    // Test function
    function testConnection() {
        return JSON.stringify({
            success: true,
            message: "ExtendScript connection working",
            timestamp: new Date().toString(),
            appName: app.name,
            appVersion: app.version,
            availableFunctions: [
                "executeScript",
                "createRectangle",
                "createCircle",
                "setObjectColor",
                "getSelectedObjects",
                "centerObjectOnArtboard",
                "sampleCreateGrid",
                "sampleRandomColors",
                "getDocumentInfo"
            ]
        });
    }
    
    // Error handling wrapper for all functions
    function safeExecute(functionName, args) {
        try {
            switch (functionName) {
                case 'executeScript':
                    return executeScript(args[0]);
                case 'sampleCreateGrid':
                    return sampleCreateGrid();
                case 'sampleRandomColors':
                    return sampleRandomColors();
                case 'getDocumentInfo':
                    return getDocumentInfo();
                case 'testConnection':
                    return testConnection();
                default:
                    throw new Error("Function không tồn tại: " + functionName);
            }
        } catch (error) {
            return JSON.stringify({
                success: false,
                error: error.toString(),
                function: functionName
            });
        }
    }
    
} catch (globalError) {
    // Global error handler
    function executeScript() {
        return JSON.stringify({
            success: false,
            error: "Extension initialization error: " + globalError.toString()
        });
    }
    
    function testConnection() {
        return JSON.stringify({
            success: false,
            error: "Extension initialization error: " + globalError.toString()
        });
    }
    
    function safeExecute() {
        return JSON.stringify({
            success: false,
            error: "Extension initialization error: " + globalError.toString()
        });
    }
}
