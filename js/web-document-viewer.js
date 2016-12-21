/*! DevExpress HTML/JS Designer - v16.1.9 - 2016-12-20
* http://www.devexpress.com
* Copyright (c) 2016 Developer Express Inc; Licensed Commercial */

var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            Report.pageBorderColor = { propertyName: "pageBorderColor", modelName: "@PageBorderColor", from: Designer.colorFromString, toJsonObject: Designer.colorToString, displayName: "Page Border Color", editor: Designer.Widgets.editorTemplates.customColorEditor, defaultVal: "Black" };
            Report.pageBorderWidth = { propertyName: "pageBorderWidth", modelName: "@PageBorderWidth", displayName: "Page Border Width", from: Designer.floatFromModel, editor: DevExpress.JS.Widgets.editorTemplates.numeric, defaultVal: 1 };
            Report.pageRange = { propertyName: "pageRange", modelName: "@PageRange", displayName: "Page Range", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "" };
            Report.expotOptionsTitle = { propertyName: "title", modelName: "@Title", displayName: "Title", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "Document" };
            Report.tableLayout = { propertyName: "tableLayout", modelName: "@TableLayout", displayName: "Table Layout", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: true };
            Report.allowURLsWithJSContent = { propertyName: "allowURLsWithJSContent", modelName: "@AllowURLsWithJSContent", displayName: "Allow URLs with JS Content", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: true };
            Report.useHRefHyperlinks = { propertyName: "useHRefHyperlinks", modelName: "@UseHRefHyperlinks", displayName: "Use HRef Hyperlinks", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false };
            Report.exportWatermarks = { propertyName: "exportWatermarks", modelName: "@ExportWatermarks", displayName: "Export Watermarks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.inlineCss = { propertyName: "inlineCss", modelName: "@InlineCss", displayName: "Inline Css", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.removeSecondarySymbols = { propertyName: "removeSecondarySymbols", modelName: "@RemoveSecondarySymbols", displayName: "Remove Secondary Symbols", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false };
            Report.characterSet = {
                propertyName: "characterSet",
                modelName: "@CharacterSet",
                displayName: "Character Set",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                defaultVal: "utf-8",
                values: {
                    "windows-1256": "Arabic (Windows)",
                    "iso-8859-4": "Baltic (ISO)",
                    "windows-1257": "Baltic (Windows)",
                    "iso-8859-2": "Central European (ISO)",
                    "windows-1250": "Central European (Windows)",
                    "iso-8859-5": "Cyrillic (ISO)",
                    "koi8-r": "Cyrillic (KOI8-r)",
                    "windows-1251": "Cyrillic (Windows)",
                    "iso-8859-15": "Latin 9 (ISO)",
                    "utf-7": "Unicode (UTF-7)",
                    "utf-8": "Unicode (UTF-8)",
                    "iso-8859-1": "Western European (ISO)",
                    "windows-1252": "Western European (Windows)"
                }
            };
            Report.defaultExportModePreview = {
                "SingleFile": "Single File",
                "SingleFilePageByPage": "Single File PageByPage"
            };
            Report.defaultExportMode = {
                "SingleFile": "Single File",
                "SingleFilePageByPage": "Single File PageByPage",
                "DifferentFiles": "Different Files"
            };
            Report.rtfExportMode = {
                propertyName: "rtfExportMode",
                modelName: "@ExportMode",
                defaultVal: "SingleFilePageByPage",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                displayName: "Export Mode",
                values: {
                    "SingleFile": "Single File",
                    "SingleFilePageByPage": "Single File PageByPage",
                }
            };
            Report.htmlExportMode = {
                propertyName: "htmlExportMode",
                modelName: "@ExportMode",
                defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                displayName: "Export Mode",
                values: Report.defaultExportMode
            };
            Report.embedImagesInHTML = {
                propertyName: "embedImagesInHTML",
                modelName: "@EmbedImagesInHTML",
                defaultVal: false,
                editor: DevExpress.JS.Widgets.editorTemplates.bool,
                from: Designer.parseBool,
                displayName: "Embed Images In HTML"
            };
            Report.imageExportMode = {
                propertyName: "imageExportMode",
                modelName: "@ExportMode",
                defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                displayName: "Export Mode",
                values: Report.defaultExportMode
            };
            Report.xlsExportMode = {
                propertyName: "xlsExportMode",
                modelName: "@ExportMode",
                defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                displayName: "Export Mode",
                values: Report.defaultExportMode
            };
            Report.xlsxExportMode = {
                propertyName: "xlsxExportMode",
                modelName: "@ExportMode",
                defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                displayName: "Export Mode",
                values: Report.defaultExportMode
            };
            Report.textExportMode = {
                propertyName: "textExportMode",
                modelName: "@TextExportMode",
                displayName: "Text Export Mode",
                defaultVal: "Text",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                values: {
                    "Text": "Text",
                    "Value": "Value"
                }
            };
            Report.xlsTextExportMode = {
                propertyName: "textExportMode",
                modelName: "@TextExportMode",
                displayName: "Text Export Mode",
                defaultVal: "Value",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                values: {
                    "Text": "Text",
                    "Value": "Value"
                }
            };
            Report.csvTextSeparator = { propertyName: "separator", modelName: "@Separator", displayName: "Separator", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "," };
            Report.textEncodingType = {
                propertyName: "encodingType",
                modelName: "@EncodingType",
                displayName: "Encoding",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                defaultVal: "Default",
                from: Designer.fromEnum,
                values: {
                    "Default": "Windows-1252",
                    "ASCII": "us-ascii",
                    "Unicode": "utf-16",
                    "BigEndianUnicode": "utf-16BE",
                    "UTF7": "utf-7",
                    "UTF8": "utf-8",
                    "UTF32": "utf-32"
                }
            };
            Report.xlsExportHyperlinks = {
                propertyName: "exportHyperlinks",
                modelName: "@ExportHyperlinks",
                displayName: "Export Hyperlinks",
                defaultVal: true,
                editor: DevExpress.JS.Widgets.editorTemplates.bool,
                from: Designer.parseBool
            };
            Report.xlsRawDataMode = {
                propertyName: "rawDataMode",
                modelName: "@RawDataMode",
                displayName: "Raw Data Mode",
                defaultVal: false,
                editor: DevExpress.JS.Widgets.editorTemplates.bool,
                from: Designer.parseBool
            };
            Report.xlsShowGridLines = {
                propertyName: "showGridLines",
                modelName: "@ShowGridLines",
                displayName: "Show Grid Lines",
                defaultVal: false,
                editor: DevExpress.JS.Widgets.editorTemplates.bool,
                from: Designer.parseBool
            };
            Report.xlsExportOptionsSheetName = {
                propertyName: "sheetName",
                modelName: "@SheetName",
                displayName: "Sheet Name",
                defaultVal: "Sheet",
                editor: DevExpress.JS.Widgets.editorTemplates.text
            };
            function excludeDifferentFilesMode(val) {
                return ko.observable(val === "DifferentFiles" ? "SingleFile" : val);
            }
            Report.excludeDifferentFilesMode = excludeDifferentFilesMode;
            Report.htmlExportModePreview = {
                propertyName: Report.htmlExportMode.propertyName,
                modelName: Report.htmlExportMode.modelName,
                defaultVal: Report.htmlExportMode.defaultVal,
                editor: Report.htmlExportMode.editor,
                displayName: Report.htmlExportMode.displayName,
                from: excludeDifferentFilesMode,
                values: Report.defaultExportModePreview
            };
            Report.xlsExportModePreview = {
                propertyName: Report.xlsExportMode.propertyName,
                modelName: Report.xlsExportMode.modelName,
                defaultVal: Report.xlsExportMode.defaultVal,
                editor: Report.xlsExportMode.editor,
                displayName: Report.xlsExportMode.displayName,
                from: excludeDifferentFilesMode,
                values: Report.defaultExportModePreview
            };
            Report.imageExportModePreview = {
                propertyName: Report.imageExportMode.propertyName,
                modelName: Report.imageExportMode.modelName,
                defaultVal: Report.imageExportMode.defaultVal,
                editor: Report.imageExportMode.editor,
                displayName: Report.imageExportMode.displayName,
                from: excludeDifferentFilesMode,
                values: Report.defaultExportModePreview
            };
            Report.xlsxExportModePreview = {
                propertyName: Report.xlsxExportMode.propertyName,
                modelName: Report.xlsxExportMode.modelName,
                defaultVal: Report.xlsxExportMode.defaultVal,
                editor: Report.xlsxExportMode.editor,
                displayName: Report.xlsxExportMode.displayName,
                from: excludeDifferentFilesMode,
                values: Report.defaultExportModePreview
            };
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.AsyncExportApproach = false;
            var ExportOptionsModel = (function () {
                function ExportOptionsModel(reportPreview) {
                    this.actions = [];
                    this.tabInfo = new DevExpress.Designer.TabInfo(DevExpress.Designer.getLocalization("Export Options"), "dxrd-preview-export-options", reportPreview.exportOptionsModel, "properties", ko.pureComputed(function () { return !!reportPreview.exportOptionsModel(); }));
                    this.actions.push({
                        id: Preview.ActionId.ExportTo,
                        text: "Export To",
                        disabled: reportPreview.exportDisabled,
                        visible: true,
                        clickAction: function (model) {
                            if (reportPreview.exportDisabled())
                                return;
                            if (model.itemData.format) {
                                reportPreview.exportDocumentTo(model.itemData.format);
                            }
                        },
                        items: ko.pureComputed(function () {
                            var result = [];
                            if (reportPreview.exportOptionsModel()) {
                                reportPreview.exportOptionsModel().pdf && result.push({ text: 'PDF', format: 'pdf' });
                                reportPreview.exportOptionsModel().xls && result.push({ text: 'XLS', format: 'xls' });
                                reportPreview.exportOptionsModel().xlsx && result.push({ text: 'XLSX', format: 'xlsx' });
                                reportPreview.exportOptionsModel().rtf && result.push({ text: 'RTF', format: 'rtf' });
                                reportPreview.exportOptionsModel().mht && result.push({ text: 'MHT', format: 'mht' });
                                reportPreview.exportOptionsModel().html && result.push({ text: 'HTML', format: 'html' });
                                reportPreview.exportOptionsModel().textExportOptions && result.push({ text: 'Text', format: 'txt' });
                                reportPreview.exportOptionsModel().csv && result.push({ text: 'CSV', format: 'csv' });
                                reportPreview.exportOptionsModel().image && result.push({ text: 'Image', format: 'image' });
                            }
                            ;
                            return [{
                                text: "Export To",
                                imageClassName: "dxrd-image-export-to",
                                items: result
                            }];
                        }),
                        templateName: "dxrd-preview-export-to"
                    });
                }
                ExportOptionsModel.prototype.getActions = function (context) {
                    return this.actions;
                };
                return ExportOptionsModel;
            })();
            Preview.ExportOptionsModel = ExportOptionsModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            var CsvExportOptions = (function () {
                function CsvExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                CsvExportOptions.from = function (model, serializer) {
                    return new CsvExportOptions(model || {}, serializer);
                };
                CsvExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, csvExportOptionsSerializationInfo, refs);
                };
                CsvExportOptions.prototype.getInfo = function () {
                    return csvExportOptionsSerializationInfo;
                };
                return CsvExportOptions;
            })();
            Report.CsvExportOptions = CsvExportOptions;
            var csvExportOptionsSerializationInfo = [
                Report.textEncodingType,
                Report.textExportMode,
                { propertyName: "quoteStringsWithSeparators", modelName: "@QuoteStringsWithSeparators", displayName: "Quote Strings with Separators", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                Report.csvTextSeparator,
                { propertyName: "skipEmptyRows", modelName: "@SkipEmptyRows", displayName: "Skip Empty Rows", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "skipEmptyColumns", modelName: "@SkipEmptyColumns", displayName: "Skip Empty Columns", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
            ];
            var ImageExportOptions = (function () {
                function ImageExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                ImageExportOptions.from = function (model, serializer) {
                    return new ImageExportOptions(model || {}, serializer);
                };
                ImageExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, imageExportOptionsSerializationInfo, refs);
                };
                ImageExportOptions.prototype.getInfo = function () {
                    return imageExportOptionsSerializationInfo;
                };
                ImageExportOptions.prototype.isPropertyDisabled = function (name) {
                    return ((name === "pageRange") || (name === "pageBorderWidth")) && this.imageExportMode() === "SingleFile";
                };
                return ImageExportOptions;
            })();
            Report.ImageExportOptions = ImageExportOptions;
            var imageExportOptionsSerializationInfoBase = [
                Report.pageBorderColor,
                Report.pageBorderWidth,
                Report.pageRange,
                { propertyName: "resolution", modelName: "@Resolution", displayName: "Resolution", editor: DevExpress.JS.Widgets.editorTemplates.numeric, defaultVal: 96 },
                {
                    propertyName: "format",
                    modelName: "@Format",
                    displayName: "Format",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    defaultVal: "Png",
                    from: Designer.fromEnum,
                    values: {
                        "Bmp": "BMP",
                        "Gif": "GIF",
                        "Jpeg": "JPEG",
                        "Png": "PNG",
                        "Emf": "EMF",
                        "Wmf": "WMF",
                        "Tiff": "TIFF"
                    }
                }
            ];
            var imageExportOptionsSerializationInfo = [Report.imageExportMode, { propertyName: "retainBackgroundTransparency", modelName: "@RetainBackgroundTransparency", displayName: "Retain Background Transparency", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }, {
                propertyName: "textRenderingMode",
                modelName: "@TextRenderingMode",
                displayName: "Text Rendering Mode",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                defaultVal: "SystemDefault",
                from: Designer.fromEnum,
                values: {
                    "SystemDefault": "SystemDefault",
                    "SingleBitPerPixelGridFit": "SingleBitPerPixelGridFit",
                    "SingleBitPerPixel": "SingleBitPerPixel",
                    "AntiAliasGridFit": "AntiAliasGridFit",
                    "AntiAlias": "AntiAlias",
                    "ClearTypeGridFit": "ClearTypeGridFit"
                }
            }].concat(imageExportOptionsSerializationInfoBase);
            var htmlExportOptionsSerializationInfoBase = [
                Report.pageBorderColor,
                Report.pageBorderWidth,
                Report.pageRange,
                Report.expotOptionsTitle,
                Report.tableLayout,
                Report.useHRefHyperlinks,
                Report.allowURLsWithJSContent,
                Report.removeSecondarySymbols,
                Report.exportWatermarks,
                Report.characterSet
            ];
            var htmlExportOptionsSerializationInfo = [Report.htmlExportMode, Report.embedImagesInHTML, Report.inlineCss].concat(htmlExportOptionsSerializationInfoBase);
            var HtmlExportOptions = (function () {
                function HtmlExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                HtmlExportOptions.from = function (model, serializer) {
                    return new HtmlExportOptions(model || {}, serializer);
                };
                HtmlExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, htmlExportOptionsSerializationInfo, refs);
                };
                HtmlExportOptions.prototype.getInfo = function () {
                    return htmlExportOptionsSerializationInfo;
                };
                HtmlExportOptions.prototype.isPropertyDisabled = function (name) {
                    return ((name === "pageRange") || (name === "pageBorderWidth") || (name === "exportWatermarks")) && this.htmlExportMode() === "SingleFile";
                };
                return HtmlExportOptions;
            })();
            Report.HtmlExportOptions = HtmlExportOptions;
            var mhtExportOptionsSerializationInfoBase = [
                Report.pageBorderColor,
                Report.pageBorderWidth,
                Report.pageRange,
                Report.expotOptionsTitle,
                Report.characterSet,
                Report.tableLayout,
                Report.useHRefHyperlinks,
                Report.allowURLsWithJSContent,
                Report.removeSecondarySymbols,
                Report.exportWatermarks
            ];
            var mhtExportOptionsSerializationInfo = [Report.htmlExportMode, Report.inlineCss].concat(mhtExportOptionsSerializationInfoBase);
            var MhtExportOptions = (function () {
                function MhtExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                MhtExportOptions.from = function (model, serializer) {
                    return new MhtExportOptions(model || {}, serializer);
                };
                MhtExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, mhtExportOptionsSerializationInfo, refs);
                };
                MhtExportOptions.prototype.getInfo = function () {
                    return mhtExportOptionsSerializationInfo;
                };
                MhtExportOptions.prototype.isPropertyDisabled = function (name) {
                    return ((name === "pageRange") || (name === "pageBorderWidth")) && this.htmlExportMode() === "SingleFile";
                };
                return MhtExportOptions;
            })();
            Report.MhtExportOptions = MhtExportOptions;
            var PdfExportDocumentOptions = (function () {
                function PdfExportDocumentOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                PdfExportDocumentOptions.from = function (model, serializer) {
                    return new PdfExportDocumentOptions(model || {}, serializer);
                };
                PdfExportDocumentOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, pdfExportDocumentOptionsSerializationInfo, refs);
                };
                PdfExportDocumentOptions.prototype.getInfo = function () {
                    return pdfExportDocumentOptionsSerializationInfo;
                };
                return PdfExportDocumentOptions;
            })();
            Report.PdfExportDocumentOptions = PdfExportDocumentOptions;
            var author = { propertyName: "author", modelName: "@Author", displayName: "Author", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, application = { propertyName: "application", modelName: "@Application", displayName: "Application", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, title = { propertyName: "title", modelName: "@Title", displayName: "Title", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, subject = { propertyName: "subject", modelName: "@Subject", displayName: "Subject", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text };
            var pdfExportDocumentOptionsSerializationInfo = [
                author,
                application,
                title,
                subject,
                { propertyName: "keywords", modelName: "@Keywords", displayName: "Keywords", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }
            ];
            var PdfPermissionsOptions = (function () {
                function PdfPermissionsOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                PdfPermissionsOptions.from = function (model, serializer) {
                    return new PdfPermissionsOptions(model || {}, serializer);
                };
                PdfPermissionsOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, pdfExportPermissionsOptionsSerializationInfo, refs);
                };
                PdfPermissionsOptions.prototype.getInfo = function () {
                    return pdfExportPermissionsOptionsSerializationInfo;
                };
                return PdfPermissionsOptions;
            })();
            Report.PdfPermissionsOptions = PdfPermissionsOptions;
            var pdfExportPermissionsOptionsSerializationInfo = [
                {
                    propertyName: "printingPermissions",
                    modelName: "@PrintingPermissions",
                    displayName: "Printing Permissions",
                    defaultVal: "None",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    values: {
                        "None": "None",
                        "LowResolution": "LowResolution",
                        "HighResolution": "HighResolution"
                    }
                },
                {
                    propertyName: "changingPermissions",
                    modelName: "@ChangingPermissions",
                    displayName: "Changing Permissions",
                    defaultVal: "None",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    values: {
                        "None": "None",
                        "InsertingDeletingRotating": "InsertingDeletingRotating",
                        "FillingSigning": "FillingSigning",
                        "CommentingFillingSigning": "CommentingFillingSigning",
                        "AnyExceptExtractingPages": "AnyExceptExtractingPages"
                    }
                },
                { propertyName: "enableCopying", modelName: "@EnableCopying", displayName: "Enable Copying", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "enableScreenReaders", modelName: "@EnableScreenReaders", displayName: "Enable Screen Readers", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
            ];
            var PdfPasswordSecurityOptions = (function () {
                function PdfPasswordSecurityOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                PdfPasswordSecurityOptions.from = function (model, serializer) {
                    return new PdfPasswordSecurityOptions(model || {}, serializer);
                };
                PdfPasswordSecurityOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, pdfExportPasswordSecurityOptionsSerializationInfo, refs);
                };
                PdfPasswordSecurityOptions.prototype.getInfo = function () {
                    return pdfExportPasswordSecurityOptionsSerializationInfo;
                };
                return PdfPasswordSecurityOptions;
            })();
            Report.PdfPasswordSecurityOptions = PdfPasswordSecurityOptions;
            var pdfExportPasswordSecurityOptionsSerializationInfo = [
                { propertyName: "openPassword", modelName: "@OpenPassword", displayName: "Open Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "permissionsPassword", modelName: "@PermissionsPassword", displayName: "Permissions Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "permissionsOptions", modelName: "PermissionsOptions", displayName: "Pdf Permissions Options", from: PdfPermissionsOptions.from, toJsonObject: PdfPermissionsOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var PdfExportOptions = (function () {
                function PdfExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                PdfExportOptions.from = function (model, serializer) {
                    return new PdfExportOptions(model || {}, serializer);
                };
                PdfExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, pdfExportOptionsSerializationInfo, refs);
                };
                PdfExportOptions.prototype.getInfo = function () {
                    return pdfExportOptionsSerializationInfo;
                };
                PdfExportOptions.prototype.isPropertyDisabled = function (name) {
                    return false;
                };
                return PdfExportOptions;
            })();
            Report.PdfExportOptions = PdfExportOptions;
            var pdfExportOptionsSerializationInfo = [
                { propertyName: "convertImagesToJpeg", modelName: "@ConvertImagesToJpeg", displayName: "Convert Images to Jpeg", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "showPrintDialogOnOpen", modelName: "@ShowPrintDialogOnOpen", displayName: "Show Print Dialog on Open", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "compressed", modelName: "@Compressed", displayName: "Compressed", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "neverEmbeddedFonts", modelName: "@NeverEmbeddedFonts", displayName: "Never Embedded Fonts", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                {
                    propertyName: "imageQuality",
                    modelName: "@ImageQuality",
                    displayName: "Image Quality",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    defaultVal: "Highest",
                    from: Designer.fromEnum,
                    values: {
                        "Lowest": "Lowest",
                        "Low": "Low",
                        "Medium": "Medium",
                        "Hight": "Hight",
                        "Highest": "Highest"
                    }
                },
                {
                    propertyName: "pdfACompatibility",
                    modelName: "@PdfACompatibility",
                    displayName: "PDF A Compatibility",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    defaultVal: "None",
                    from: Designer.fromEnum,
                    values: {
                        "Hight": "None",
                        "PdfA2b": "PdfA2b"
                    }
                },
                Report.pageRange,
                { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", from: PdfExportDocumentOptions.from, toJsonObject: PdfExportDocumentOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "pdfPasswordSecurityOptions", modelName: "PasswordSecurityOptions", displayName: "Pdf Password Security Options", from: PdfPasswordSecurityOptions.from, toJsonObject: PdfPasswordSecurityOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var RtfExportOptions = (function () {
                function RtfExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                RtfExportOptions.from = function (model, serializer) {
                    return new RtfExportOptions(model || {}, serializer);
                };
                RtfExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, rtfExportOptionsSerializationInfo, refs);
                };
                RtfExportOptions.prototype.getInfo = function () {
                    return rtfExportOptionsSerializationInfo;
                };
                RtfExportOptions.prototype.isPropertyDisabled = function (name) {
                    return ((name === "pageRange") || (name === "exportWatermarks")) && this.rtfExportMode() === "SingleFile";
                };
                return RtfExportOptions;
            })();
            Report.RtfExportOptions = RtfExportOptions;
            var rtfExportOptionsSerializationInfoBase = [
                Report.rtfExportMode,
                Report.pageRange,
                Report.exportWatermarks
            ];
            var rtfExportOptionsSerializationInfo = [
                { propertyName: "emptyFirstPageHeaderFooter", modelName: "@EmptyFirstPageHeaderFooter", displayName: "Empty First Page Header Footer", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "exportPageBreaks", modelName: "@ExportPageBreaks", displayName: "Export Page Breaks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "keepRowHeight", modelName: "@KeepRowHeight", displayName: "Keep Row Height", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
            ].concat(rtfExportOptionsSerializationInfoBase);
            var TextExportOptions = (function () {
                function TextExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                TextExportOptions.from = function (model, serializer) {
                    return new TextExportOptions(model || {}, serializer);
                };
                TextExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, textExportOptionsSerializationInfo, refs);
                };
                TextExportOptions.prototype.getInfo = function () {
                    return textExportOptionsSerializationInfo;
                };
                return TextExportOptions;
            })();
            Report.TextExportOptions = TextExportOptions;
            var textExportOptionsSerializationInfo = [
                Report.textEncodingType,
                { propertyName: "quoteStringsWithSeparators", modelName: "@QuoteStringsWithSeparators", displayName: "Quote Strings with Separators", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "separator", modelName: "@Separator", displayName: "Separator", defaultVal: "TAB", editor: DevExpress.JS.Widgets.editorTemplates.text },
                Report.textExportMode
            ];
            var documentOptionsSerializationsInfo = [
                author,
                application,
                title,
                subject,
                { propertyName: "tags", modelName: "@Tags", displayName: "Tags", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "category", modelName: "@Category", displayName: "Category", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "comments", modelName: "@Comments", displayName: "Comments", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "company", modelName: "@Company", displayName: "Company", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }
            ];
            var documentOptions = { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", info: documentOptionsSerializationsInfo, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var xlsExportOptionsSerializationInfoCommon = [
                { propertyName: "rasterizeImages", modelName: "@RasterizeImages", displayName: "Rasterize Images", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "rasterizationResolution", modelName: "@RasterizationResolution", displayName: "Rasterization Resolution", defaultVal: 96, editor: DevExpress.JS.Widgets.editorTemplates.numeric },
                { propertyName: "fitToPrintedPageWidth", modelName: "@FitToPrintedPageWidth", displayName: "Fit To Printed Page Width", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "fitToPrintedPageHeight", modelName: "@FitToPrintedPageHeight", displayName: "Fit To Printed Page Height", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "ignoreErrors",
                    modelName: "@IgnoreErrors",
                    displayName: "Ignore Errors",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    defaultVal: "None",
                    from: Designer.fromEnum,
                    values: {
                        "None": "None",
                        "NumberStoredAsText": "Number Stored As Text"
                    }
                },
                {
                    propertyName: "rightToLeftDocument",
                    modelName: "@RightToLeftDocument",
                    displayName: "Right To Left Document",
                    defaultVal: "Default",
                    from: Designer.fromEnum,
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    values: {
                        "True": "True",
                        "False": "False",
                        "Default": "Default"
                    }
                },
                documentOptions
            ];
            var xlsExportOptionsSerializationInfoBase = [
                Report.xlsExportHyperlinks,
                Report.pageRange,
                Report.xlsRawDataMode,
                Report.xlsExportOptionsSheetName,
                Report.xlsShowGridLines,
                { propertyName: "suppress256ColumnsWarning", modelName: "@Suppress256ColumnsWarning", displayName: "Suppress 256 Columns Warning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "suppress65536RowsWarning", modelName: "@Suppress65536RowsWarning", displayName: "Suppress 65536 Rows Warning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                Report.xlsTextExportMode,
                {
                    propertyName: "workbookColorPaletteCompliance",
                    modelName: "@WorkbookColorPaletteCompliance",
                    displayName: "Workbook Color Palette Compliance",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    defaultVal: "ReducePaletteForExactColors",
                    from: Designer.fromEnum,
                    values: {
                        "ReducePaletteForExactColors": "ReducePaletteForExactColors",
                        "AdjustColorsToDefaultPalette": "AdjustColorsToDefaultPalette"
                    }
                }
            ];
            var xlsExportOptionsSerializationInfo = [Report.xlsExportMode].concat(xlsExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon);
            var XlsExportOptions = (function () {
                function XlsExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                XlsExportOptions.from = function (model, serializer) {
                    return new XlsExportOptions(model || {}, serializer);
                };
                XlsExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, xlsExportOptionsSerializationInfo, refs);
                };
                XlsExportOptions.prototype.getInfo = function () {
                    return xlsExportOptionsSerializationInfo;
                };
                XlsExportOptions.prototype.isPropertyDisabled = function (name) {
                    return name === "pageRange" && this.xlsExportMode() === "SingleFile";
                };
                return XlsExportOptions;
            })();
            Report.XlsExportOptions = XlsExportOptions;
            var xlsxExportOptionsSerializationInfoBase = [
                Report.xlsExportHyperlinks,
                Report.pageRange,
                Report.xlsRawDataMode,
                Report.xlsExportOptionsSheetName,
                Report.xlsShowGridLines,
                Report.xlsTextExportMode
            ];
            var xlsxExportOptionsSerializationInfo = [Report.xlsxExportMode].concat(xlsxExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon);
            var XlsxExportOptions = (function () {
                function XlsxExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                XlsxExportOptions.from = function (model, serializer) {
                    return new XlsxExportOptions(model || {}, serializer);
                };
                XlsxExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, xlsxExportOptionsSerializationInfo, refs);
                };
                XlsxExportOptions.prototype.getInfo = function () {
                    return xlsxExportOptionsSerializationInfo;
                };
                XlsxExportOptions.prototype.isPropertyDisabled = function (name) {
                    return name === "pageRange" && this.xlsxExportMode() === "SingleFile";
                };
                return XlsxExportOptions;
            })();
            Report.XlsxExportOptions = XlsxExportOptions;
            var ExportOptions = (function () {
                function ExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                ExportOptions.from = function (model, serializer) {
                    return new ExportOptions(model || {}, serializer);
                };
                ExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, exportOptionsSerializationInfo, refs);
                };
                ExportOptions.prototype.getInfo = function () {
                    return exportOptionsSerializationInfo;
                };
                return ExportOptions;
            })();
            Report.ExportOptions = ExportOptions;
            var nativeFormatOptionsSerializationInfo = [
                { propertyName: "compressed", modelName: "@Compressed", displayName: "Compressed", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "showOptionsBeforeSave", modelName: "@ShowOptionsBeforeSave", displayName: "Show Options Before Save", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
            ];
            var additionalRecipientSerializationsInfo = [
                { propertyName: "ContactName", modelName: "@ContactName", displayName: "ContactName", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "Address", modelName: "@Address", displayName: "Address", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "Prefix", modelName: "@Prefix", displayName: "Prefix", defaultVal: "SMTP:", editor: DevExpress.JS.Widgets.editorTemplates.text },
                {
                    propertyName: "fieldType",
                    modelName: "@FieldType",
                    displayName: "Field Type",
                    defaultVal: "TO",
                    editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    from: Designer.fromEnum,
                    values: {
                        "TO": "TO",
                        "CC": "CC",
                        "BCC": "BCC"
                    }
                },
            ];
            var AdditionalRecipientModel = (function () {
                function AdditionalRecipientModel(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                AdditionalRecipientModel.prototype.getInfo = function () {
                    return additionalRecipientSerializationsInfo;
                };
                AdditionalRecipientModel.createNew = function () {
                    return new AdditionalRecipientModel({});
                };
                return AdditionalRecipientModel;
            })();
            Report.AdditionalRecipientModel = AdditionalRecipientModel;
            Report.additionalRecipients = { propertyName: "additionalRecipients", modelName: "AdditionalRecipients", displayName: "Additional Recipients", array: true, editor: DevExpress.JS.Widgets.editorTemplates.commonCollection, addHandler: DevExpress.Designer.Report.AdditionalRecipientModel.createNew, template: '#dxrd-commonCollectionItem' };
            var emailOptionsSerializationInfo = [
                { propertyName: "recipientName", modelName: "@RecipientName", displayName: "Recipient Name", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "recipientAddress", modelName: "@RecipientAddress", displayName: "Recipient Address", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "recipientAddressPrefix", modelName: "@RecipientAddressPrefix", displayName: "Recipient Address Prefix", defaultVal: "SMTP:", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "subject", modelName: "@Subject", displayName: "Subject", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "body", modelName: "@Body", displayName: "Body", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                Report.additionalRecipients
            ];
            var exportOptionsSerializationInfo = [
                { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "email", modelName: "Email", displayName: "E-mail Options", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor, info: emailOptionsSerializationInfo },
                { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", from: HtmlExportOptions.from, toJsonObject: HtmlExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "image", modelName: "Image", displayName: "Image Export Options", from: ImageExportOptions.from, toJsonObject: ImageExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "mailMessage", modelName: "MailMessage", displayName: "Mail Message Export Options", from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "nativeFormat", modelName: "NativeFormat", displayName: "Native Format Options", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor, info: nativeFormatOptionsSerializationInfo },
                { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", from: RtfExportOptions.from, toJsonObject: RtfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", from: XlsExportOptions.from, toJsonObject: XlsExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", from: XlsxExportOptions.from, toJsonObject: XlsxExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var htmlExportOptionsSerializationInfoPreview = [Report.htmlExportModePreview].concat(htmlExportOptionsSerializationInfoBase);
            var HtmlExportOptionsPreview = (function (_super) {
                __extends(HtmlExportOptionsPreview, _super);
                function HtmlExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                HtmlExportOptionsPreview.from = function (model, serializer) {
                    return new HtmlExportOptionsPreview(model || {}, serializer);
                };
                HtmlExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, htmlExportOptionsSerializationInfoPreview, refs);
                };
                HtmlExportOptionsPreview.prototype.getInfo = function () {
                    return htmlExportOptionsSerializationInfoPreview;
                };
                return HtmlExportOptionsPreview;
            })(HtmlExportOptions);
            Report.HtmlExportOptionsPreview = HtmlExportOptionsPreview;
            var imageExportOptionsSerializationInfoPreview = [Report.imageExportModePreview].concat(imageExportOptionsSerializationInfoBase);
            var ImageExportOptionsPreview = (function (_super) {
                __extends(ImageExportOptionsPreview, _super);
                function ImageExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                ImageExportOptionsPreview.from = function (model, serializer) {
                    return new ImageExportOptionsPreview(model || {}, serializer);
                };
                ImageExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, imageExportOptionsSerializationInfoPreview, refs);
                };
                ImageExportOptionsPreview.prototype.getInfo = function () {
                    return imageExportOptionsSerializationInfoPreview;
                };
                return ImageExportOptionsPreview;
            })(ImageExportOptions);
            Report.ImageExportOptionsPreview = ImageExportOptionsPreview;
            var mhtExportOptionsSerializationInfoPreview = [Report.htmlExportModePreview].concat(mhtExportOptionsSerializationInfoBase);
            var MhtExportOptionsPreview = (function (_super) {
                __extends(MhtExportOptionsPreview, _super);
                function MhtExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                MhtExportOptionsPreview.from = function (model, serializer) {
                    return new MhtExportOptionsPreview(model || {}, serializer);
                };
                MhtExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, mhtExportOptionsSerializationInfoPreview, refs);
                };
                MhtExportOptionsPreview.prototype.getInfo = function () {
                    return mhtExportOptionsSerializationInfoPreview;
                };
                return MhtExportOptionsPreview;
            })(MhtExportOptions);
            Report.MhtExportOptionsPreview = MhtExportOptionsPreview;
            var rtfExportOptionsSerializationInfoPreview = [].concat(rtfExportOptionsSerializationInfoBase);
            var RtfExportOptionsPreview = (function (_super) {
                __extends(RtfExportOptionsPreview, _super);
                function RtfExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                RtfExportOptionsPreview.from = function (model, serializer) {
                    return new RtfExportOptionsPreview(model || {}, serializer);
                };
                RtfExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, rtfExportOptionsSerializationInfoPreview, refs);
                };
                RtfExportOptionsPreview.prototype.getInfo = function () {
                    return rtfExportOptionsSerializationInfoPreview;
                };
                return RtfExportOptionsPreview;
            })(RtfExportOptions);
            Report.RtfExportOptionsPreview = RtfExportOptionsPreview;
            var xlsExportOptionsSerializationInfoPreview = [Report.xlsExportModePreview].concat(xlsExportOptionsSerializationInfoBase);
            var XlsExportOptionsPreview = (function (_super) {
                __extends(XlsExportOptionsPreview, _super);
                function XlsExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                XlsExportOptionsPreview.from = function (model, serializer) {
                    return new XlsExportOptionsPreview(model || {}, serializer);
                };
                XlsExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, xlsExportOptionsSerializationInfoPreview, refs);
                };
                XlsExportOptionsPreview.prototype.getInfo = function () {
                    return xlsExportOptionsSerializationInfoPreview;
                };
                return XlsExportOptionsPreview;
            })(XlsExportOptions);
            Report.XlsExportOptionsPreview = XlsExportOptionsPreview;
            var xlsxExportOptionsSerializationInfoPreview = [Report.xlsxExportModePreview].concat(xlsxExportOptionsSerializationInfoBase);
            var XlsxExportOptionsPreview = (function (_super) {
                __extends(XlsxExportOptionsPreview, _super);
                function XlsxExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                XlsxExportOptionsPreview.from = function (model, serializer) {
                    return new XlsxExportOptionsPreview(model || {}, serializer);
                };
                XlsxExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, xlsxExportOptionsSerializationInfoPreview, refs);
                };
                XlsxExportOptionsPreview.prototype.getInfo = function () {
                    return xlsxExportOptionsSerializationInfoPreview;
                };
                return XlsxExportOptionsPreview;
            })(XlsxExportOptions);
            Report.XlsxExportOptionsPreview = XlsxExportOptionsPreview;
            var ExportOptionsPreview = (function (_super) {
                __extends(ExportOptionsPreview, _super);
                function ExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                ExportOptionsPreview.from = function (model, serializer) {
                    return new ExportOptionsPreview(model || {}, serializer);
                };
                ExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, exportOptionsSerializationInfoPreview, refs);
                };
                ExportOptionsPreview.prototype.getInfo = function () {
                    return exportOptionsSerializationInfoPreview;
                };
                return ExportOptionsPreview;
            })(ExportOptions);
            Report.ExportOptionsPreview = ExportOptionsPreview;
            var exportOptionsSerializationInfoPreview = [
                { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", from: HtmlExportOptionsPreview.from, toJsonObject: HtmlExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "image", modelName: "Image", displayName: "Image Export Options", from: ImageExportOptionsPreview.from, toJsonObject: ImageExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", from: MhtExportOptionsPreview.from, toJsonObject: MhtExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", from: RtfExportOptionsPreview.from, toJsonObject: RtfExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", from: XlsExportOptionsPreview.from, toJsonObject: XlsExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", from: XlsxExportOptionsPreview.from, toJsonObject: XlsxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var previewDefaultResolution = 96;
            function convetToPercent(childSize, parentSize) {
                return childSize * 100 / parentSize + '%';
            }
            function initializeBrick(brick, processClick, rtl) {
                if (!brick) {
                    return;
                }
                !!brick.active && !!brick.active(false) || (brick.active = ko.observable(false));
                brick["onClick"] = function () {
                    processClick && processClick(brick);
                };
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    childBrick[rtl ? 'rightP' : 'leftP'] = convetToPercent(childBrick.left, brick.width);
                    childBrick.widthP = convetToPercent(childBrick.width, brick.width);
                    childBrick.topP = convetToPercent(childBrick.top, brick.height);
                    childBrick.heightP = convetToPercent(childBrick.height, brick.height);
                    initializeBrick(childBrick, processClick, rtl);
                });
            }
            Preview.initializeBrick = initializeBrick;
            var PreviewPageBrickProvider = (function () {
                function PreviewPageBrickProvider(handlerUri, documentId) {
                    this.getBricks = function (pageIndex) {
                        return DevExpress.Designer.ajax(handlerUri, 'getBrickMap', encodeURIComponent(JSON.stringify({ pageIndex: pageIndex, documentId: documentId })));
                    };
                }
                return PreviewPageBrickProvider;
            })();
            Preview.PreviewPageBrickProvider = PreviewPageBrickProvider;
            var PreviewPage = (function (_super) {
                __extends(PreviewPage, _super);
                function PreviewPage(pageIndex, width, height, zoom, documentId, brickProvider, loading, processClick) {
                    var _this = this;
                    _super.call(this);
                    this.isClientVisible = ko.observable(false);
                    this.originalHeight = ko.observable(0);
                    this.originalWidth = ko.observable(0);
                    this.loadingText = DevExpress.Designer.getLocalization("Loading...");
                    this.realZoom = ko.observable(1);
                    this.actualResolution = 0;
                    this.pageLoadFailed = ko.observable(false);
                    this.imageSrc = ko.observable("");
                    this.cachedImageSrc = ko.observable("");
                    this.brick = ko.observable(null);
                    this.brickLoading = ko.observable(true);
                    this.active = ko.observable(false);
                    this._selectedBrickPath = null;
                    this.pageIndex = pageIndex;
                    this.documentId = documentId || ko.observable(null);
                    this.brickProvider = brickProvider;
                    this.pageLoading = loading || ko.observable(true);
                    this.originalHeight(ko.unwrap(height));
                    this.originalWidth(ko.unwrap(width));
                    this.zoom = zoom;
                    this.isClientVisible.subscribe(function (newVal) {
                        if (_this.isClientVisible()) {
                            _this._setPageImgSrc(documentId(), _this.zoom());
                        }
                    });
                    this.width = ko.pureComputed(function () {
                        return Math.ceil(_this.originalWidth() * _this._getCurrentResolution(_this.zoom()) / previewDefaultResolution);
                    });
                    this.height = ko.pureComputed(function () {
                        return Math.ceil(_this.originalHeight() * _this._getCurrentResolution(_this.zoom()) / previewDefaultResolution);
                    });
                    var _self = this;
                    this.isEmpty = pageIndex === -1 && !brickProvider && !processClick;
                    this.onPageLoaded = function (_s, _e) {
                        _self.pageLoading(false);
                        _self.pageLoadFailed(false);
                        if (_self.cachedImageSrc() !== _self.imageSrc()) {
                            _self.originalHeight() && ko.isObservable(height) && height(_self.originalHeight());
                            _self.originalWidth() && ko.isObservable(width) && width(_self.originalWidth());
                            if (!_self.brick() && _self.brickProvider) {
                                _self.brickProvider.getBricks(_self.pageIndex).done(function (result) {
                                    try {
                                        if (!result || !result.brick) {
                                            return;
                                        }
                                        _self.brickColumnWidthArray = result.columnWidthArray;
                                        _self.originalWidth(result.brick.width);
                                        _self.originalHeight(result.brick.height);
                                        initializeBrick(result.brick, processClick, result.rtl);
                                        result.brick[result.rtl ? 'rightP' : 'leftP'] = convetToPercent(result.brick.left, _this.originalWidth());
                                        result.brick.topP = convetToPercent(result.brick.top, _this.originalHeight());
                                        result.brick.widthP = convetToPercent(result.brick.width, _this.originalWidth());
                                        result.brick.heightP = convetToPercent(result.brick.height, _this.originalHeight());
                                        _self.brick(result.brick);
                                        _self._selectedBrickPath && _self.selectBrick(_self._selectedBrickPath);
                                    }
                                    finally {
                                        _self.brickLoading(false);
                                    }
                                }).fail(function (error) {
                                    _self.brickLoading(false);
                                });
                            }
                            else {
                                _self.brickLoading(false);
                            }
                            _self.cachedImageSrc(_self.imageSrc());
                        }
                    };
                    this.onPageLoadFailed = function (s, e) {
                        if (_self.pageIndex !== -1 && _self.isClientVisible()) {
                            _self.pageLoadFailed(true);
                            _self.pageLoading(false);
                            _self.brickLoading(false);
                        }
                    };
                    this.resetBrickRecusive = function (brick) {
                        if (brick && brick.active) {
                            brick.active(false);
                            if (brick.bricks) {
                                brick.bricks.forEach(function (childBrick) {
                                    _self.resetBrickRecusive(childBrick);
                                });
                            }
                        }
                    };
                    this.selectBrick = function (path, ctrlKey) {
                        processClick && processClick(null);
                        var currentBrick = _self.brick();
                        !ctrlKey && _self.resetBrickRecusive(currentBrick);
                        if (!path) {
                            return;
                        }
                        if (!currentBrick) {
                            _self._selectedBrickPath = path;
                            return;
                        }
                        var pathElements = path.split(",");
                        pathElements.forEach(function (el) {
                            currentBrick = currentBrick.bricks[parseInt(el)];
                        });
                        currentBrick.active(true);
                    };
                    this._disposables.push(ko.computed(function () {
                        if (!_this.active()) {
                            _this.resetBrickRecusive(_this.brick());
                            _this._selectedBrickPath = null;
                        }
                    }));
                }
                PreviewPage.prototype._getCurrentResolution = function (zoom) {
                    return Math.round((zoom ? zoom : 1) * previewDefaultResolution);
                };
                PreviewPage.prototype.updateSize = function (zoom) {
                    var newResolution = this._getCurrentResolution(zoom);
                    this.realZoom(newResolution / previewDefaultResolution);
                    return newResolution;
                };
                PreviewPage.prototype.clearBricks = function () {
                    this.brick(null);
                    this.brickLoading(true);
                };
                PreviewPage.prototype._setPageImgSrc = function (documentId, zoom) {
                    this.pageLoadFailed(false);
                    if (!documentId || this.pageIndex === -1) {
                        this.imageSrc(null);
                        return;
                    }
                    var newResolution = this.updateSize(zoom);
                    if ((this.actualResolution === newResolution || newResolution < 20) && this.imageSrc()) {
                        return;
                    }
                    this.actualResolution = newResolution;
                    var imageResolution = Math.round(newResolution * (window["devicePixelRatio"] || 1));
                    this.imageSrc(Preview.HandlerUri + "?actionKey=getPage&unifier=" + Preview.generateGuid() + "&arg=" + encodeURIComponent(JSON.stringify({ pageIndex: this.pageIndex, documentId: documentId, resolution: imageResolution })));
                };
                return PreviewPage;
            })(DevExpress.Designer.Disposable);
            Preview.PreviewPage = PreviewPage;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.formatSearchResult = function (value) {
                return value && ('page ' + (value.pageIndex + 1));
            };
            Preview.searchAvailable = ko.observable(true);
            var SearchViewModel = (function (_super) {
                __extends(SearchViewModel, _super);
                function SearchViewModel(reportPreview) {
                    var _this = this;
                    _super.call(this);
                    this.actions = [];
                    this.focusRequested = ko.observable(true);
                    this.matchWholeWord = ko.observable(false);
                    this.matchCase = ko.observable(false);
                    this.searchUp = ko.observable(false);
                    this.searchText = ko.observable();
                    this.searchResult = ko.observable();
                    this.loading = ko.observable(false);
                    this.resetSearchResult();
                    this._resultNavigator = SearchViewModel.createResultNavigator(this, reportPreview);
                    this.clean = function () {
                        _this.searchText("");
                    };
                    var lastMatchCase = this.matchCase();
                    var lastMatchWholeWord = this.matchWholeWord();
                    this._disposables.push(reportPreview._currentDocumentId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    this._disposables.push(reportPreview._currentReportId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    this.findUp = function () {
                        _this.searchUp(true);
                        _this.findNext();
                    };
                    this.findDown = function () {
                        _this.searchUp(false);
                        _this.findNext();
                    };
                    this.goToResult = function (result) {
                        _this._resultNavigator.goToResult(result.id);
                    };
                    var newSearch = function (text) {
                        _this.searchResult([]);
                        _this._resultNavigator.currentResult(null);
                        lastMatchCase = _this.matchCase();
                        lastMatchWholeWord = _this.matchWholeWord();
                        if (!text) {
                            reportPreview.pages() && reportPreview.pages()[reportPreview.pageIndex()] && reportPreview.pages()[reportPreview.pageIndex()].selectBrick("");
                            return;
                        }
                        var mCase = _this.matchCase();
                        var text = mCase ? _this.searchText() : _this.searchText().toLocaleLowerCase();
                        var cache = _this.matchWholeWord() ? mCase ? _this._cachedWholeWordWithCaseRequests : _this._cachedWholeWordRequests : mCase ? _this._cachedCaseSensitiveRequests : _this._cachedRequests;
                        if (cache[text]) {
                            _this.searchResult(cache[text]);
                            return;
                        }
                        _this.loading(true);
                        var self = _this;
                        reportPreview.requestWrapper.findTextRequest(text).done(function (result) {
                            self.findTextRequestDone(result, cache[text]);
                        }).fail(function (error) {
                            self.loading(false);
                            reportPreview._processError(DevExpress.Designer.getLocalization("An error occurred during search"), error);
                        });
                    };
                    this.findNext = function () {
                        if (_this.loading()) {
                            return;
                        }
                        (lastMatchCase === _this.matchCase() || _this.searchText().toUpperCase() === _this.searchText().toLowerCase()) && lastMatchWholeWord === _this.matchWholeWord() && _this._resultNavigator.next(_this.searchUp()) || newSearch(_this.searchText());
                    };
                    this._disposables.push(this.searchText.subscribe(function (newVal) {
                        newSearch(newVal);
                    }));
                    var disabled = ko.pureComputed(function () {
                        var documentId = reportPreview["_currentDocumentId"]();
                        var pageIndex = reportPreview.pageIndex();
                        return reportPreview.documentBuilding() || !documentId || pageIndex === -1;
                    });
                    this.actions.push({
                        id: Preview.ActionId.Search,
                        text: "Search",
                        imageClassName: "dxrd-image-search",
                        disabled: disabled,
                        visible: ko.pureComputed(function () { return Preview.searchAvailable(); }),
                        hasSeparator: true,
                        clickAction: function () {
                            if (!_this.tabInfo.active()) {
                                _this.tabInfo.active(true);
                            }
                            else {
                                _this.tabInfo.active.notifySubscribers(true);
                            }
                        }
                    });
                    this.tabInfo = new DevExpress.Designer.TabInfo(DevExpress.Designer.getLocalization("Search"), "dxrd-preview-search", this, "search", ko.pureComputed(function () { return !disabled() && Preview.searchAvailable(); }));
                    this._disposables.push(this.tabInfo.active.subscribe(function (newVal) {
                        newVal && setTimeout(function () { return _this.focusRequested.notifySubscribers(); }, 100);
                    }));
                }
                SearchViewModel.prototype.resetSearchResult = function () {
                    this._cachedRequests = {};
                    this._cachedWholeWordRequests = {};
                    this._cachedCaseSensitiveRequests = {};
                    this._cachedWholeWordWithCaseRequests = {};
                    this.searchResult([]);
                    this.searchText("");
                };
                SearchViewModel.prototype.findTextRequestDone = function (result, cache) {
                    this.loading(false);
                    if (!result) {
                        this.searchResult([]);
                        return;
                    }
                    cache = (result.success ? result.matches : []) || [];
                    this.searchResult(cache);
                };
                SearchViewModel.prototype.getActions = function (context) {
                    return this.actions;
                };
                Object.defineProperty(SearchViewModel.prototype, "disabled", {
                    get: function () {
                        return this.loading();
                    },
                    enumerable: true,
                    configurable: true
                });
                SearchViewModel.createResultNavigator = function (seacrhModel, reportPreview) {
                    return new SearchResultNavigator(seacrhModel, reportPreview);
                };
                return SearchViewModel;
            })(DevExpress.Designer.Disposable);
            Preview.SearchViewModel = SearchViewModel;
            var SearchResultNavigator = (function (_super) {
                __extends(SearchResultNavigator, _super);
                function SearchResultNavigator(seachModel, reportPreview) {
                    var _this = this;
                    _super.call(this);
                    this.currentResult = ko.observable(null);
                    var goToMatchedResult = function (foundResult) {
                        if (!foundResult) {
                            return;
                        }
                        reportPreview.goToPage && reportPreview.goToPage(foundResult.pageIndex);
                        var page = reportPreview.pages.peek()[foundResult.pageIndex];
                        page && page.selectBrick(foundResult.indexes);
                    };
                    this.getFirstMatchFromPage = function (pageIndex, up, thisPageOnly) {
                        if (!seachModel.searchResult() || seachModel.searchResult().length === 0) {
                            return null;
                        }
                        var firstMatch;
                        var sortOutResult = function (index) {
                            seachModel.searchResult().forEach(function (m) {
                                if (thisPageOnly && m.pageIndex === index) {
                                    if (!firstMatch || (m.id < firstMatch.id && !up || m.id > firstMatch.id && up)) {
                                        firstMatch = m;
                                    }
                                }
                                else {
                                    if (m.pageIndex >= index && !up && (!firstMatch || m.id < firstMatch.id) || m.pageIndex <= index && up && (!firstMatch || m.id > firstMatch.id)) {
                                        firstMatch = m;
                                    }
                                }
                            });
                        };
                        sortOutResult(pageIndex);
                        !firstMatch && sortOutResult(up ? reportPreview.pages().length : 0);
                        return firstMatch;
                    };
                    var _setCurrentResult = function (highlight, resultId, thisPageOnly) {
                        if (seachModel.searchResult() && seachModel.searchResult().length !== 0) {
                            var currentResult = (resultId >= 0 && seachModel.searchResult().length > resultId) ? seachModel.searchResult()[resultId] : _this.getFirstMatchFromPage(reportPreview.pageIndex.peek(), seachModel.searchUp.peek(), thisPageOnly);
                            _this.currentResult(currentResult);
                            highlight && goToMatchedResult(_this.currentResult.peek());
                        }
                        else {
                            reportPreview.pages() && reportPreview.pages()[reportPreview.pageIndex()] && reportPreview.pages()[reportPreview.pageIndex()].selectBrick("");
                        }
                    };
                    this.goToResult = function (id) {
                        if (id !== 0 && !id) {
                            return null;
                        }
                        _setCurrentResult(true, id);
                    };
                    this._disposables.push(reportPreview.pageIndex.subscribe(function (newPageIndex) {
                        _this.currentResult(null);
                    }));
                    this._disposables.push(seachModel.searchResult.subscribe(function () {
                        _setCurrentResult(true);
                    }));
                    this.next = function (up) {
                        if (!seachModel.searchResult()) {
                            return false;
                        }
                        !_this.currentResult() && _this.currentResult(_this.getFirstMatchFromPage(reportPreview.pageIndex(), up));
                        if (!_this.currentResult()) {
                            return false;
                        }
                        var id, currentId = _this.currentResult().id;
                        if (up) {
                            id = (currentId === 0) ? seachModel.searchResult().length - 1 : (currentId - 1);
                        }
                        else {
                            id = (currentId === seachModel.searchResult().length - 1) ? 0 : (currentId + 1);
                        }
                        _this.currentResult(seachModel.searchResult()[id]);
                        goToMatchedResult(_this.currentResult());
                        return true;
                    };
                }
                return SearchResultNavigator;
            })(DevExpress.Designer.Disposable);
            Preview.SearchResultNavigator = SearchResultNavigator;
            var editor_prefix = "dx-searcheditor", EDITOR_CLASS = editor_prefix + "", EDITOR_BUTTON_CLASS = editor_prefix + "-button dx-widget dx-dropdowneditor-button", EDITOR_BUTTON_SELECTOR = "." + editor_prefix + "-button", EDITOR_BUTTON_ICON = editor_prefix + "-icon dx-dropdowneditor-icon dx-icon-dxrd-image-move";
            var dxSearchEditor = (function (_super) {
                __extends(dxSearchEditor, _super);
                function dxSearchEditor(element, options) {
                    this._activeStateUnit = EDITOR_BUTTON_SELECTOR;
                    var _self = this;
                    var searchModel = null;
                    this._focusRequestRaised = function () {
                        _self.focus();
                    };
                    options["onEnterKey"] = function (e) {
                        if (DevExpress.browser && DevExpress.browser.msie && e && e.component) {
                            e.component.blur();
                            e.component.focus();
                        }
                        var text = e.component.option("text");
                        var _searchModel = searchModel && searchModel();
                        if (_searchModel && (_searchModel.searchText() != text))
                            _searchModel.searchText(text);
                        else
                            _self.findNext(searchModel, e && e.jQueryEvent && e.jQueryEvent.shiftKey);
                    };
                    _super.call(this, element, options);
                    searchModel = options && options.searchModel;
                    searchModel().focusRequested.subscribe(function (val) { return _self._focusRequestRaised(); });
                }
                dxSearchEditor.prototype.findNext = function (searchModel, searchUp) {
                    var _searchModel = null;
                    if (!searchModel || !(_searchModel = searchModel())) {
                        return false;
                    }
                    try {
                        if (searchUp) {
                            (_searchModel.loading && !_searchModel.loading()) && _searchModel.findUp();
                        }
                        else {
                            (_searchModel.loading && !_searchModel.loading()) && _searchModel.findDown();
                        }
                    }
                    finally {
                        return true;
                    }
                };
                dxSearchEditor.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.element().addClass(EDITOR_CLASS);
                };
                dxSearchEditor.prototype._optionChanged = function (obj, value) {
                    var name = obj.name || obj, newValue = value || obj.value;
                    switch (name) {
                        case "searchModel":
                            newValue && this.option("value", newValue.searchText());
                            break;
                        case "value":
                            var searchModel = this.option("searchModel");
                            searchModel && searchModel() && searchModel().searchText(newValue);
                        default:
                            _super.prototype._optionChanged.apply(this, arguments);
                    }
                };
                dxSearchEditor.prototype._render = function () {
                    _super.prototype._render.call(this);
                    this._renderButton("Down");
                    this._renderButton("Up");
                };
                dxSearchEditor.prototype._renderButton = function (direction) {
                    this._button = $("<div />").addClass(EDITOR_BUTTON_CLASS);
                    this._attachButtonEvents(direction);
                    this._buttonIcon = $("<div />").addClass(EDITOR_BUTTON_ICON + direction.toLowerCase()).appendTo(this._button);
                    var buttonsContainer = _super.prototype._buttonsContainer.call(this);
                    this._button.appendTo(buttonsContainer);
                };
                dxSearchEditor.prototype._attachButtonEvents = function (direction) {
                    var _this = this;
                    this._button.off("click");
                    if (!this.option("disabled")) {
                        this._button.on("click", function (e) {
                            _this.findNext(_this.option("searchModel"), direction.toLowerCase() === "up") && e.stopPropagation();
                        });
                    }
                };
                return dxSearchEditor;
            })(DevExpress.ui.dxTextBox);
            Preview.dxSearchEditor = dxSearchEditor;
            DevExpress.registerComponent("dxSearchEditor", dxSearchEditor);
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var DocumentMapModel = (function () {
                function DocumentMapModel(reportPreview) {
                    var _this = this;
                    var treeListController = new DocumentMapTreeListController();
                    this.isEmpty = ko.pureComputed(function () {
                        return !(reportPreview.documentMap() && reportPreview.documentMap().nodes && (reportPreview.documentMap().nodes.length !== 0));
                    });
                    treeListController.clickHandler = function (item) {
                        var bookmark = item.data.bookmark;
                        if (bookmark) {
                            var pageIndex = bookmark.pageIndex < 0 ? 0 : bookmark.pageIndex;
                            reportPreview.pages.peek()[pageIndex].selectBrick(bookmark.indexes);
                        }
                    };
                    this.documentMapOptions = ko.pureComputed(function () {
                        var rootNodeSubscribtion = treeListController.selectedItem.subscribe(function (item) {
                            item.path === "0" && item.collapsed() && item.toggleCollapsed();
                            rootNodeSubscribtion.dispose();
                        });
                        return {
                            itemsProvider: new DocumentMapItemsProvider(reportPreview.documentMap()),
                            selectedPath: ko.observable("0"),
                            treeListController: treeListController
                        };
                    });
                    this.tabInfo = new DevExpress.Designer.TabInfo(DevExpress.Designer.getLocalization("Document Map"), "dxrd-preview-document-map", this, "reportexplorer", ko.pureComputed(function () { return !_this.isEmpty(); }));
                }
                return DocumentMapModel;
            })();
            Preview.DocumentMapModel = DocumentMapModel;
            var DocumentMapItemsProvider = (function () {
                function DocumentMapItemsProvider(bookmark) {
                    var _this = this;
                    this.bookmarkDict = {};
                    this.getItems = function (pathRequest) {
                        var result = $.Deferred();
                        if (bookmark) {
                            if (pathRequest.fullPath) {
                                var nodes = _this._selectNode(bookmark, pathRequest.fullPath);
                                result.resolve(nodes);
                            }
                            else {
                                var root = _this._getRootNode(bookmark);
                                result.resolve(root);
                            }
                        }
                        return result.promise();
                    };
                }
                DocumentMapItemsProvider.prototype._selectNode = function (root, path) {
                    if (!!this.bookmarkDict[path]) {
                        return this.bookmarkDict[path];
                    }
                    var pathComponents = path.split("."), currentNode = root;
                    if (pathComponents[0] !== "0") {
                        return null;
                    }
                    for (var i = 1, index = pathComponents[i]; i < pathComponents.length; i++, index = pathComponents[i]) {
                        if (currentNode && currentNode.nodes && currentNode.nodes[index]) {
                            currentNode = currentNode.nodes[index];
                        }
                        else {
                            return null;
                        }
                    }
                    var result = DocumentMapItemsProvider.fillNode(currentNode);
                    if (result && result.length !== 0) {
                        this.bookmarkDict[path] = result;
                    }
                    return result;
                };
                DocumentMapItemsProvider.fillNode = function (bookmark) {
                    if (!bookmark || !bookmark.nodes || bookmark.nodes.length <= 0) {
                        return null;
                    }
                    return bookmark.nodes.map(function (node, i) {
                        return { name: i + "", displayName: node.text, isList: node.nodes && node.nodes.length > 0, bookmark: node, specifics: "node" };
                    });
                };
                DocumentMapItemsProvider.prototype._getRootNode = function (bookmark) {
                    return [{ name: "0", displayName: bookmark.text, isList: bookmark.nodes && bookmark.nodes.length > 0, bookmark: bookmark, specifics: "node" }];
                };
                return DocumentMapItemsProvider;
            })();
            Preview.DocumentMapItemsProvider = DocumentMapItemsProvider;
            var DocumentMapTreeListController = (function () {
                function DocumentMapTreeListController() {
                    this.selectedItem = ko.observable(null);
                    this.clickHandler = function (item) { return void 0; };
                }
                DocumentMapTreeListController.prototype.itemsFilter = function (item) {
                    return true;
                };
                DocumentMapTreeListController.prototype.hasItems = function (item) {
                    return item.isList === true;
                };
                DocumentMapTreeListController.prototype.canSelect = function (value) {
                    return true;
                };
                DocumentMapTreeListController.prototype.select = function (value) {
                    if (this.canSelect(value) && value !== this.selectedItem.peek()) {
                        this.selectedItem.peek() && this.selectedItem.peek().isSelected(false);
                        this.selectedItem(value);
                        value.isSelected(true);
                    }
                };
                return DocumentMapTreeListController;
            })();
            Preview.DocumentMapTreeListController = DocumentMapTreeListController;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var ParameterHelper = (function () {
                function ParameterHelper() {
                    this._customizeParameterEditors = ko.observable();
                }
                ParameterHelper.prototype._isKnownEnumType = function (type) {
                    return !!this._knownEnums && this._knownEnums.some(function (knownEnumType) {
                        return knownEnumType.enumType === type;
                    });
                };
                ParameterHelper.getSerializationValue = function (value, dateConverter) {
                    if (value instanceof Array) {
                        return value.map(function (item) {
                            var itemValue = ko.isObservable(item.value) ? item.value() : item;
                            return (itemValue instanceof Date) ? dateConverter(itemValue) : itemValue;
                        });
                    }
                    return (value instanceof Date) ? dateConverter(value) : value;
                };
                ParameterHelper.prototype.initialize = function (knownEnums, callbacks) {
                    if (arguments.length > 0) {
                        this._knownEnums = knownEnums;
                        if (callbacks) {
                            callbacks.customizeParameterEditors && this._customizeParameterEditors(callbacks.customizeParameterEditors);
                            callbacks.customizeParameterLookUpSource && (this.customizeParameterLookUpSource = callbacks.customizeParameterLookUpSource);
                        }
                    }
                };
                ParameterHelper.prototype.createInfo = function (parameter) {
                    var parameterDescriptor = parameter.getParameterDescriptor();
                    var typeString = this.isEnumType(parameter) ? "Enum" : ko.unwrap(parameterDescriptor.type);
                    var info = {
                        propertyName: "value",
                        displayName: parameterDescriptor["displayName"],
                        editor: DevExpress.Designer.getEditorType(typeString)
                    };
                    this.assignValueStore(info, parameter);
                    return info;
                };
                ParameterHelper.prototype.assignValueStore = function (info, parameter) {
                    var items = this.getEnumCollection(parameter);
                    info['valueStore'] = this.getItemsSource(parameter.getParameterDescriptor(), items, true);
                };
                ParameterHelper.prototype.createMultiValue = function (parameter, value) {
                    var newValue = ko.observable();
                    if (value !== null && value !== void 0) {
                        newValue(value);
                    }
                    return { value: newValue, getInfo: function () {
                        return [parameter.multiValueInfo()];
                    } };
                };
                ParameterHelper.prototype.createMultiValueArray = function (fromArray, parameter, convertSingleValue) {
                    var _this = this;
                    var converter = convertSingleValue ? convertSingleValue : this.getValueConverter(ko.unwrap(parameter.type));
                    return ko.observableArray(fromArray.map(function (item) {
                        return _this.createMultiValue(parameter, converter(item));
                    }));
                };
                ParameterHelper.prototype.isEnumType = function (parameter) {
                    return this._isKnownEnumType(ko.unwrap(parameter.type));
                };
                ParameterHelper.prototype.getItemsSource = function (parameterDescriptor, items, sort) {
                    if (items) {
                        var newItems;
                        if (this.customizeParameterLookUpSource)
                            newItems = this.customizeParameterLookUpSource(parameterDescriptor, items.slice(0));
                        return newItems ? newItems : new DevExpress.data.DataSource({
                            store: sort ? new DevExpress.Designer.SortedArrayStore(items, "displayValue") : new DevExpress.data.ArrayStore(items),
                            pageSize: 100
                        });
                    }
                    return items;
                };
                ParameterHelper.prototype.getEnumCollection = function (parameter) {
                    var type = ko.unwrap(parameter.type);
                    if (this._isKnownEnumType(type)) {
                        var currentKnownEnumInfo = this._knownEnums.filter(function (knownEnumType) {
                            return knownEnumType.enumType === type;
                        })[0];
                        if (currentKnownEnumInfo && currentKnownEnumInfo.values && currentKnownEnumInfo.values.length !== 0) {
                            return currentKnownEnumInfo.values.map(function (val) {
                                return { value: val.value, displayValue: val.displayName };
                            });
                        }
                    }
                };
                ParameterHelper.prototype.getParameterInfo = function (parameter) {
                    var _this = this;
                    var valueInfo = this.createInfo(parameter);
                    parameter.multiValueInfo($.extend(true, {}, valueInfo, { propertyName: "value" }));
                    if (ko.unwrap(parameter.isMultiValue)) {
                        valueInfo.editor = DevExpress.Designer.getEditorType(parameter["isMultiValueWithLookUp"] ? "multiValueWithLookUp" : "multiValue");
                        valueInfo["addHandler"] = function () {
                            return _this.createMultiValue(parameter);
                        };
                    }
                    if (this._customizeParameterEditors()) {
                        this._customizeParameterEditors()(parameter.getParameterDescriptor(), valueInfo);
                    }
                    return valueInfo;
                };
                ParameterHelper.prototype.getValueConverter = function (type) {
                    return (function (val) {
                        return val;
                    });
                };
                return ParameterHelper;
            })();
            Preview.ParameterHelper = ParameterHelper;
            var PreviewParameterHelper = (function (_super) {
                __extends(PreviewParameterHelper, _super);
                function PreviewParameterHelper(knownEnums, callbacks) {
                    _super.call(this);
                    this.initialize(knownEnums, callbacks);
                }
                PreviewParameterHelper.prototype.mapLookUpValues = function (type, lookUpValues) {
                    var converter = this.getValueConverter(type);
                    return $.map(lookUpValues || [], function (lookUpValue) {
                        return { value: converter(lookUpValue.Value), displayValue: lookUpValue.Description };
                    });
                };
                PreviewParameterHelper.fixPropertyName = function (propertyName) {
                    return propertyName.replace(/\./g, '_');
                };
                PreviewParameterHelper.prototype.createInfo = function (parameter) {
                    var info = _super.prototype.createInfo.call(this, parameter);
                    info.propertyName = PreviewParameterHelper.fixPropertyName(parameter.path);
                    if (parameter.type === "System.DateTime") {
                        info.validationRules = [{ type: 'required', message: DevExpress.Designer.getLocalization('The value cannot be empty') }];
                    }
                    return info;
                };
                PreviewParameterHelper.prototype.assignValueStore = function (info, parameter) {
                    var _helper = this;
                    if (!parameter.isMultiValueWithLookUp) {
                        Object.defineProperty(info, 'valueStore', {
                            get: function () {
                                var items = [];
                                var needSorting = false;
                                if (parameter.isFilteredLookUpSettings || parameter.lookUpValues() && parameter.lookUpValues().length !== 0) {
                                    items = parameter.lookUpValues();
                                }
                                else {
                                    items = _helper.getEnumCollection(parameter);
                                    needSorting = true;
                                }
                                if (parameter.valueStoreCache)
                                    return parameter.valueStoreCache;
                                var itemsSource = _helper.getItemsSource(parameter.getParameterDescriptor(), items, needSorting);
                                if (itemsSource)
                                    parameter.valueStoreCache = itemsSource;
                                return itemsSource;
                            },
                            set: function (values) {
                                parameter.lookUpValues(values);
                            }
                        });
                    }
                };
                PreviewParameterHelper.prototype.isEnumType = function (parameter) {
                    return parameter.isFilteredLookUpSettings || !!parameter.lookUpValues() || _super.prototype.isEnumType.call(this, parameter);
                };
                PreviewParameterHelper.prototype.getValueConverter = function (type) {
                    if (type === "System.DateTime") {
                        return function (dateString) {
                            return DevExpress.JS.Localization.parseDate(dateString);
                        };
                    }
                    return _super.prototype.getValueConverter.call(this, type);
                };
                return PreviewParameterHelper;
            })(ParameterHelper);
            Preview.PreviewParameterHelper = PreviewParameterHelper;
            var PreviewParameter = (function (_super) {
                __extends(PreviewParameter, _super);
                function PreviewParameter(parameterInfo, parameterHelper) {
                    var _this = this;
                    _super.call(this);
                    this.valueInfo = ko.observable();
                    this.lookUpValues = ko.observableArray();
                    this.valueStoreCache = null;
                    this.multiValueInfo = ko.observable();
                    this.type = parameterInfo.TypeString;
                    this.path = parameterInfo.Path;
                    this.visible = parameterInfo.Visible;
                    this.isFilteredLookUpSettings = parameterInfo.IsFilteredLookUpSettings;
                    this._originalLookUpValues = parameterInfo.LookUpValues ? parameterHelper.mapLookUpValues(this.type, parameterInfo.LookUpValues || []) : null;
                    this.lookUpValues(this._originalLookUpValues);
                    this.lookUpValues.subscribe(function () {
                        _this.valueStoreCache = null;
                    });
                    this.isMultiValue = parameterInfo.MultiValue;
                    this.isMultiValueWithLookUp = this.isMultiValue && !!this.lookUpValues();
                    this.getParameterDescriptor = function () {
                        return {
                            description: parameterInfo.Description,
                            displayName: parameterInfo.Description || parameterInfo.Name,
                            name: parameterInfo.Name,
                            type: parameterInfo.TypeString,
                            value: parameterInfo.Value,
                            multiValue: parameterInfo.MultiValue,
                            visible: parameterInfo.Visible
                        };
                    };
                    this._disposables.push(ko.computed(function () {
                        var info = parameterHelper.getParameterInfo(_this);
                        info.propertyName = PreviewParameterHelper.fixPropertyName(parameterInfo.Path);
                        _this.valueInfo(info);
                    }));
                    this._originalValue = parameterInfo.Value;
                    this.initialize(this._originalValue, parameterHelper);
                }
                PreviewParameter.prototype.safeAssignObservable = function (name, value) {
                    if (this[name]) {
                        this[name](value());
                    }
                    else {
                        this[name] = value;
                    }
                };
                PreviewParameter.prototype.initialize = function (value, parameterHelper) {
                    var _this = this;
                    if (this.isMultiValueWithLookUp) {
                        this.safeAssignObservable("_value", ko.observableArray((value || []).map(function (arrayItem) {
                            return parameterHelper.getValueConverter(_this.type)(arrayItem);
                        })));
                        var multiValuesHelper = new DevExpress.Designer.Widgets.MultiValuesHelper(this._value, this.lookUpValues());
                        var newItems;
                        if (parameterHelper.customizeParameterLookUpSource)
                            newItems = parameterHelper.customizeParameterLookUpSource(this.getParameterDescriptor(), multiValuesHelper.displayItems.slice(0));
                        if (newItems)
                            multiValuesHelper.displayItems = newItems;
                        this.safeAssignObservable("value", ko.observable(multiValuesHelper));
                    }
                    else if (this.isMultiValue) {
                        this.safeAssignObservable("value", parameterHelper.createMultiValueArray(value, this));
                    }
                    else {
                        this.safeAssignObservable("value", ko.observable(parameterHelper.getValueConverter(this.type)(value)));
                    }
                };
                return PreviewParameter;
            })(DevExpress.Designer.Disposable);
            Preview.PreviewParameter = PreviewParameter;
            var PreviewParametersViewModel = (function (_super) {
                __extends(PreviewParametersViewModel, _super);
                function PreviewParametersViewModel(reportPreview, parameterHelper) {
                    var _this = this;
                    _super.call(this);
                    this._parameters = [];
                    this._getLookUpValueRequest = function (argsObject) {
                        return DevExpress.Designer.ajax(Preview.HandlerUri, 'getLookUpValues', encodeURIComponent(JSON.stringify(argsObject)));
                    };
                    this._getDoneGetLookUpValueHandler = function () {
                        var parametersViewModel = _this;
                        return function (response) {
                            try {
                                if (!response || !response.parameters) {
                                    return;
                                }
                                response.parameters.forEach(function (lookUpCollection) {
                                    var matchedParameter = parametersViewModel._parameters.filter(function (p) {
                                        return p.path === lookUpCollection.Key;
                                    })[0];
                                    if (!parametersViewModel._shouldProcessParameter(matchedParameter))
                                        return;
                                    parametersViewModel._setLookUpValues(matchedParameter, lookUpCollection.Value, matchedParameter.visible);
                                });
                            }
                            finally {
                                parametersViewModel.parametersLoading(false);
                            }
                        };
                    };
                    this._getFailGetLookUpValueHandler = function () {
                        var parametersViewModel = _this;
                        return function (jqXHRError) {
                            parametersViewModel.parametersLoading(false);
                            parametersViewModel._reportPreview._processError(DevExpress.Designer.getLocalization("Cannot supply filtered lookup values to a report parameter editor"), jqXHRError);
                        };
                    };
                    this.getInfo = ko.observable(null);
                    this.needToRefreshLookUps = ko.observable(false);
                    this.isEmpty = ko.observable(true);
                    this.processInvisibleParameters = false;
                    this.parametersLoading = ko.observable(false);
                    this._reportPreview = reportPreview;
                    this.parameterHelper = parameterHelper || new PreviewParameterHelper();
                    var _self = this;
                    this.submit = function () {
                        if (_self.parametersLoading()) {
                            return;
                        }
                        _self.parametersLoading(true);
                        var promise = reportPreview.startBuild();
                        promise && promise.done(function (val) {
                            _self.parametersLoading(false);
                        });
                    };
                    this._disposables.push(reportPreview.originalParametersInfo.subscribe(function (originalParametersInfo) {
                        _this.initialize(originalParametersInfo);
                    }));
                    this.initialize(reportPreview.originalParametersInfo());
                    this.tabInfo = new DevExpress.Designer.TabInfo(DevExpress.Designer.getLocalization("Parameters"), "dxrd-preview-parameters", this, "parameters", ko.pureComputed(function () { return !_this.isEmpty(); }));
                }
                Object.defineProperty(PreviewParametersViewModel.prototype, "_visibleParameters", {
                    get: function () {
                        return this._parameters.filter(function (p) {
                            return p.visible;
                        });
                    },
                    enumerable: true,
                    configurable: true
                });
                PreviewParametersViewModel.prototype._shouldProcessParameter = function (param) {
                    return this.processInvisibleParameters || (param && param.visible);
                };
                PreviewParametersViewModel.prototype._convertLocalDateToUTC = function (localDate) {
                    return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
                };
                PreviewParametersViewModel.prototype._add = function (parameterInfo) {
                    var _this = this;
                    var parameter = new PreviewParameter(parameterInfo, this.parameterHelper);
                    this._parameters.push(parameter);
                    var needToRefreshLookUps = this.needToRefreshLookUps() || (this._shouldProcessParameter(parameter)) && parameter.isFilteredLookUpSettings;
                    this.needToRefreshLookUps(needToRefreshLookUps);
                    if (this._shouldProcessParameter(parameter)) {
                        this._disposables.push((parameter.isMultiValueWithLookUp ? parameter._value : parameter.value).subscribe(function (newValue) {
                            if (!_this.parametersLoading() && _this.needToRefreshLookUps()) {
                                _this.getLookUpValues(parameter.path);
                            }
                        }));
                    }
                    if (!parameterInfo.Visible) {
                        return;
                    }
                    this.isEmpty(false);
                    var parameterPropertyName = PreviewParameterHelper.fixPropertyName(parameter.path);
                    this[parameterPropertyName] = parameter.value;
                };
                PreviewParametersViewModel.prototype._setLookUpValues = function (parameter, lookUpValues, assignFirstLookUpValue) {
                    parameter.lookUpValues(this.parameterHelper.mapLookUpValues(parameter.type, lookUpValues));
                    var _parameterValuesContainedInLookUps = this._getParameterValuesContainedInLookups(lookUpValues, parameter);
                    if (parameter.isMultiValue) {
                        parameter.initialize(_parameterValuesContainedInLookUps.length > 0 ? _parameterValuesContainedInLookUps : [], this.parameterHelper);
                    }
                    else {
                        parameter.initialize(_parameterValuesContainedInLookUps[0] && _parameterValuesContainedInLookUps[0].Value || (assignFirstLookUpValue && lookUpValues.length > 0 ? lookUpValues[0].Value : null), this.parameterHelper);
                    }
                };
                PreviewParametersViewModel.prototype._getParameterValuesContainedInLookups = function (parameterLookUpValues, parameter) {
                    var _this = this;
                    if (parameterLookUpValues) {
                        if (parameter.isMultiValue) {
                            var selectedItems = (parameter.value() && parameter.value().selectedItems() || []).map(function (item) {
                                return item.value;
                            });
                            return selectedItems.filter(function (item) { return _this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, item).length > 0; });
                        }
                        else {
                            return this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, parameter.value());
                        }
                    }
                    return [];
                };
                PreviewParametersViewModel.prototype._filterParameterValuesContainsInLookups = function (parameterLookUpValues, parameterType, value) {
                    var _this = this;
                    return parameterLookUpValues.filter(function (x) { return _this._compareValues(_this.parameterHelper.getValueConverter(parameterType)(x.Value), value); });
                };
                PreviewParametersViewModel.prototype._compareValues = function (value1, value2) {
                    if (value1 instanceof Date && value2 instanceof Date) {
                        return value1 - value2 === 0;
                    }
                    return value1 === value2;
                };
                PreviewParametersViewModel.prototype.initialize = function (originalParametersInfo) {
                    var _this = this;
                    this._parameters.forEach(function (usedParameter) {
                        delete _this[PreviewParameterHelper.fixPropertyName(usedParameter.path)];
                    });
                    this._parameters = [];
                    if (!originalParametersInfo) {
                        this.isEmpty(true);
                        this.getInfo([]);
                        return;
                    }
                    this.parameterHelper.initialize(originalParametersInfo.knownEnums);
                    (originalParametersInfo.parameters || []).forEach(function (parameter) {
                        _this._add(parameter);
                    });
                    if (this._visibleParameters.length === 0) {
                        this.isEmpty(true);
                    }
                    var info = this._visibleParameters.map(function (parameter) {
                        return parameter.valueInfo();
                    });
                    this.getInfo(info);
                    if (this._reportPreview.documentId)
                        return;
                    if (!originalParametersInfo.shouldRequestParameters || this.isEmpty()) {
                        this.submit();
                    }
                    else {
                        this._reportPreview.removeEmptyPages();
                        this.tabInfo.active(true);
                        this._reportPreview.pageLoading(false);
                    }
                };
                PreviewParametersViewModel.prototype.getPathsAfterPath = function (parameterPath) {
                    var _this = this;
                    var startIndex = 0;
                    for (var index = 0; index < this._parameters.length; index++) {
                        if (this._parameters[index].path === parameterPath) {
                            startIndex = index + 1;
                            break;
                        }
                    }
                    var paths = this._parameters.filter(function (param, index) {
                        return (_this._shouldProcessParameter(param) && param.isFilteredLookUpSettings && (index >= startIndex));
                    }).map(function (x) { return x.path; });
                    return paths || [];
                };
                PreviewParametersViewModel.prototype.serializeParameters = function () {
                    var params = [], self = this;
                    this._parameters.forEach(function (parameter) {
                        var convertItem = function (item) {
                            return (parameter.type === "System.DateTime" && !!item && (item instanceof Date)) ? self._convertLocalDateToUTC(item) : item;
                        };
                        var value = parameter.isMultiValueWithLookUp ? parameter._value() : parameter.value();
                        params.push({ Value: ParameterHelper.getSerializationValue(value, convertItem), Key: parameter.path, TypeString: parameter.type });
                    });
                    return params;
                };
                PreviewParametersViewModel.prototype.restore = function () {
                    var _this = this;
                    if (this.parametersLoading()) {
                        return;
                    }
                    try {
                        this.parametersLoading(true);
                        this._parameters.forEach(function (parameter) {
                            if (!_this._shouldProcessParameter(parameter))
                                return;
                            parameter.lookUpValues(parameter._originalLookUpValues);
                            parameter.initialize(parameter._originalValue, _this.parameterHelper);
                        });
                    }
                    finally {
                        this.parametersLoading(false);
                    }
                };
                PreviewParametersViewModel.prototype.isPropertyDisabled = function (name) {
                    return this.parametersLoading();
                };
                PreviewParametersViewModel.prototype.getLookUpValues = function (changedParameterPath) {
                    var requiredParameterPaths = this.getPathsAfterPath(changedParameterPath);
                    if (!requiredParameterPaths || requiredParameterPaths.length === 0) {
                        return;
                    }
                    this.parametersLoading(true);
                    var argsObject = {
                        reportId: this._reportPreview.reportId,
                        requiredParameterPaths: requiredParameterPaths,
                        parameters: this.serializeParameters(),
                        timeZoneOffset: 0 - new Date().getTimezoneOffset()
                    };
                    this._getLookUpValueRequest(argsObject).done(this._getDoneGetLookUpValueHandler()).fail(this._getFailGetLookUpValueHandler());
                };
                return PreviewParametersViewModel;
            })(DevExpress.Designer.Disposable);
            Preview.PreviewParametersViewModel = PreviewParametersViewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            DevExpress.JS.Utils.getLocalization = DevExpress.Designer.getLocalization;
            Preview.HandlerUri = "DXXRDV.axd";
            Preview.TimeOut = 120000;
            Preview.MessageHandler = {
                processError: function (message, showForUser) {
                    DevExpress.Designer.NotifyAboutWarning(message, showForUser);
                },
                processMessage: function (message, showForUser) {
                    DevExpress.Designer.NotifyAboutWarning(message, showForUser);
                },
                processWarning: function (message, showForUser) {
                    DevExpress.Designer.NotifyAboutWarning(message, showForUser);
                }
            };
            Preview.generateGuid = function () {
                var getNewQuartet = function (i) {
                    return Math.floor((1 + Math.random()) * Math.pow(0x10000, i)).toString(16).substring(1);
                };
                return getNewQuartet(2) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(3);
            };
            var ReportPreview = (function (_super) {
                __extends(ReportPreview, _super);
                function ReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, rtl) {
                    var _this = this;
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this);
                    this.getPreviewPageBrickProvider = function (handlerUri, documentId) {
                        return new Preview.PreviewPageBrickProvider(handlerUri, documentId);
                    };
                    this.predefinedZoomLevels = ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]);
                    this._pageWidth = ko.observable(818);
                    this._pageHeight = ko.observable(1058);
                    this._currentReportId = ko.observable(null);
                    this._currentDocumentId = ko.observable(null);
                    this._currentOperationId = ko.observable(null);
                    this._stopBuildRequests = {};
                    this._closeDocumentRequests = {};
                    this._startBuildOperationId = "";
                    this._drillDownState = [];
                    this.rtlReport = ko.observable(false);
                    this.currentPage = ko.observable(null);
                    this.originalParametersInfo = ko.observable(null);
                    this.pageIndex = ko.observable(-1);
                    this.showMultipagePreview = ko.observable(false);
                    this.documentMap = ko.observable();
                    this.exportOptionsModel = ko.observable();
                    this.pageLoading = ko.observable(false);
                    this.documentBuilding = ko.observable(false);
                    this.pendingOperation = ko.observable(false);
                    this.progressBar = new Preview.ProgressViewModel();
                    this.pages = ko.observableArray([]).extend({ rateLimit: { timeout: 20, method: "notifyWhenChangesStop" } });
                    this.isAutoFit = ko.observable(true);
                    this.exportDisabled = ko.pureComputed(function () {
                        var inProgress = _this.progressBar.inProgress();
                        var documentBuilding = _this.documentBuilding();
                        return _this.pageIndex() === -1 || inProgress || documentBuilding;
                    });
                    this._zoom = ko.observable(1);
                    this.zoom = ko.pureComputed({
                        read: function () {
                            if (_this.isAutoFit() || _this._zoom() === 0) {
                                return 0;
                            }
                            return _this._zoom();
                        },
                        write: function (val) {
                            if (val !== 0) {
                                _this._zoom(val);
                                _this.isAutoFit(false);
                            }
                            else {
                                _this.isAutoFit(true);
                            }
                        }
                    });
                    this._currentPageText = ko.pureComputed(function () {
                        if (_this.pageIndex() === -1) {
                            return DevExpress.Designer.getLocalization('0 pages');
                        }
                        else {
                            var ofText = DevExpress.Designer.getLocalization('of');
                            return (_this.pageIndex() + 1) + " " + ofText + " " + _this.pages().length;
                        }
                    });
                    this._raiseOnSizeChanged = function () {
                        _this.onSizeChanged() && _this.onSizeChanged()();
                    };
                    this.previewSize = ko.observable(0);
                    this.onSizeChanged = ko.observable();
                    this.previewVisible = ko.observable(false);
                    this.canSwitchToDesigner = true;
                    this.allowURLsWithJSContent = false;
                    Preview.HandlerUri = handlerUri || Preview.HandlerUri;
                    this.previewHandlersHelper = previewHandlersHelper || new Preview.PreviewHandlersHelper(this);
                    this.requestWrapper = previewRequestWrapper || new Preview.PreviewRequestWrapper();
                    this.rtlViewer = rtl;
                    this.documentBuilding.subscribe(function (newVal) {
                        if (!newVal) {
                            for (var i = 0; i < _this.pages().length; i++) {
                                var page = _this.pages()[i];
                                if (!page.pageLoading()) {
                                    page.clearBricks();
                                }
                            }
                        }
                    });
                    this._disposables.push(this.previewSize.subscribe(function () { return _this._raiseOnSizeChanged(); }));
                    this._disposables.push(this._zoom.subscribe(function () {
                        if (_this.showMultipagePreview()) {
                            _this.pages().forEach(function (page) {
                                page.updateSize(page.zoom());
                                page.isClientVisible(false);
                            });
                            _this._raiseOnSizeChanged();
                        }
                        else {
                            var currentPage = _this.pages()[_this.pageIndex()];
                            currentPage && currentPage.isClientVisible.notifySubscribers(currentPage.isClientVisible.peek());
                        }
                    }));
                    ko.computed(function () {
                        var pagesArray = _this.pages();
                        var pageIndex = _this.pageIndex();
                        if (!pagesArray || pageIndex >= pagesArray.length)
                            return;
                        var currentPage = null;
                        if (pageIndex >= 0)
                            currentPage = pagesArray[pageIndex];
                        if (currentPage != _this.currentPage.peek())
                            _this.currentPage(currentPage);
                    });
                }
                ReportPreview.prototype._doDrillDown = function (drillDownKey) {
                    this._drillDownState.filter(function (x) { return x.Key === drillDownKey && (x.Value = !x.Value); });
                    this.closeDocument();
                    this.progressBar.complete();
                    this.documentMap(null);
                    for (var i = this.pages().length - 1; i >= 0; i--) {
                        var page = this.pages()[i];
                        if (i > this.pageIndex()) {
                            this.pages.remove(page);
                        }
                        else {
                            page.pageIndex = -1;
                            page.brick(null);
                            page._setPageImgSrc(null, 1);
                        }
                    }
                    this._startBuildRequest();
                };
                ReportPreview.prototype.removeEmptyPages = function (all) {
                    all && this.pages.removeAll();
                    for (var idx = this.pages().length - 1; idx >= 0; idx--) {
                        var tempPage = this.pages()[idx];
                        (tempPage.isEmpty || tempPage.pageIndex === -1) && this.pages.remove(tempPage);
                    }
                };
                ReportPreview.prototype._initialize = function () {
                    this._drillDownState = [];
                    this.closeDocument();
                    this.documentMap(null);
                    this.pageIndex(-1);
                    this.pageLoading(true);
                    this.progressBar.complete();
                    this.pages([new Preview.PreviewPage(-1, this._pageWidth, this._pageHeight, this._zoom, this._currentDocumentId, null, this.pageLoading)]);
                };
                ReportPreview.prototype._cleanTabInfo = function () {
                    this.exportOptionsModel(null);
                    this.documentMap(null);
                };
                ReportPreview.prototype._export = function (args, actionUri, printable) {
                    var _this = this;
                    var deffered = $.Deferred();
                    if (Preview.AsyncExportApproach) {
                        var self = this;
                        this.progressBar.text(DevExpress.Designer.getLocalization('Exporting the document...'));
                        this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel'));
                        this.progressBar.startProgress(function () {
                            _this._currentOperationId(null);
                        });
                        this.requestWrapper.getStartExportOperation(args).done(function (response) {
                            self.previewHandlersHelper.doneStartExportHandler(deffered, printable, response);
                        }).fail(function (error) {
                            self.previewHandlersHelper.errorStartExportHandler(deffered, error);
                        });
                    }
                    else {
                        deffered.resolve(true);
                        this._safelyRunWindowOpen(actionUri + "?actionKey=exportTo&arg=" + args);
                    }
                    return deffered.promise();
                };
                ReportPreview.prototype._safelyRunWindowOpen = function (url, target) {
                    if (target === void 0) { target = "_blank"; }
                    var newWindow = window.open(url, target);
                    target === "_blank" && newWindow && (newWindow.opener = null);
                    return newWindow;
                };
                ReportPreview.prototype.createBrickClickProcessor = function (cyclePageIndex) {
                    var _self = this;
                    return function (brick) {
                        _self.goToPage(cyclePageIndex, true);
                        brick && _self.pages()[cyclePageIndex].selectBrick("");
                        if (_self.customProcessBrickClick && _self.customProcessBrickClick(cyclePageIndex, brick)) {
                            return;
                        }
                        if (brick && brick.navigation) {
                            brick.navigation.drillDownKey && _self.reportId && _self._doDrillDown && _self._doDrillDown(brick.navigation.drillDownKey);
                            if (brick.navigation.pageIndex >= 0) {
                                var targetPage = _self.pages().filter(function (page) { return page.pageIndex === brick.navigation.pageIndex; })[0];
                                if (targetPage) {
                                    _self.goToPage(brick.navigation.pageIndex);
                                    targetPage.selectBrick(brick.navigation.indexes);
                                }
                            }
                            else {
                                var validateUrl = function (url) {
                                    return _self.allowURLsWithJSContent || (typeof url === "string" && (url.toLocaleLowerCase().indexOf("javascript:") === -1));
                                };
                                if (brick.navigation.url && validateUrl(brick.navigation.url)) {
                                    _self._safelyRunWindowOpen(brick.navigation.url, brick.navigation.target || "_blank");
                                }
                            }
                        }
                    };
                };
                ReportPreview.prototype.openReport = function (reportName) {
                    var _this = this;
                    this._cleanTabInfo();
                    this.closeReport();
                    this.originalParametersInfo(null);
                    var deferred = $.Deferred();
                    this._openReportOperationDeferred = deferred;
                    this.requestWrapper.openReport(reportName).done(function (response) {
                        deferred.resolve(response);
                    }).fail(function (error) {
                        deferred.reject(error);
                        _this._processError(DevExpress.Designer.getLocalization("Could not open report '" + reportName + "'"), error);
                    });
                    return this.initialize(deferred.promise());
                };
                ReportPreview.prototype.initialize = function (initializeDataPromise) {
                    this._currentReportId(null);
                    this._currentDocumentId(null);
                    var _self = this;
                    this._initialize();
                    initializeDataPromise.done(function (previewInitialize) {
                        if (previewInitialize && !previewInitialize.error && (previewInitialize.reportId || previewInitialize.documentId)) {
                            _self._currentReportId(previewInitialize.reportId);
                            _self._currentDocumentId(previewInitialize.documentId);
                            _self.rtlReport(previewInitialize.rtlReport);
                            if (previewInitialize.pageHeight) {
                                _self._pageHeight(previewInitialize.pageHeight);
                            }
                            if (previewInitialize.pageWidth) {
                                _self._pageWidth(previewInitialize.pageWidth);
                            }
                            var deserializedExportOptions = new DevExpress.Designer.Report.ExportOptionsPreview(previewInitialize.exportOptions && JSON.parse(previewInitialize.exportOptions));
                            _self.exportOptionsModel(deserializedExportOptions);
                            _self.originalParametersInfo(previewInitialize.parametersInfo);
                            if (previewInitialize.documentId) {
                                var doGetBuildStatusFunc = _self.getDoGetBuildStatusFunc();
                                doGetBuildStatusFunc(previewInitialize.documentId);
                            }
                        }
                        else {
                            _self.pageLoading(false);
                            _self._processError(DevExpress.Designer.getLocalization("The report preview initialization has failed"), previewInitialize && previewInitialize.error);
                        }
                    }).fail(function (error) {
                        _self.removeEmptyPages();
                    });
                    return initializeDataPromise;
                };
                ReportPreview.prototype.deactivate = function () {
                    this._initialize();
                    this._cleanTabInfo();
                    this.closeReport();
                    this._currentDocumentId(null);
                    this._currentReportId(null);
                };
                ReportPreview.prototype.startBuild = function () {
                    this._initialize();
                    return this._startBuildRequest();
                };
                ReportPreview.prototype._initializeStartBuild = function () {
                    var _this = this;
                    if (this.pendingOperation() || this._startBuildOperationId) {
                        return false;
                    }
                    this._startBuildOperationId = Preview.generateGuid();
                    this._currentDocumentId(null);
                    this.progressBar.text(DevExpress.Designer.getLocalization('Document is building...'));
                    this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel'));
                    this.progressBar.startProgress(function () {
                        _this.documentBuilding(false);
                    }, function () {
                        _this.stopBuild();
                    });
                    this.documentBuilding(true);
                    return true;
                };
                ReportPreview.prototype._startBuildRequest = function () {
                    if (!this._initializeStartBuild()) {
                        return null;
                    }
                    var self = this;
                    var deffered = $.Deferred();
                    this.requestWrapper.startBuildRequest().done(function (response) {
                        self.previewHandlersHelper.doneStartBuildHandler(deffered, response);
                    }).fail(function (error) {
                        self.previewHandlersHelper.errorStartBuildHandler(deffered, error);
                    });
                    return deffered.promise();
                };
                ReportPreview.prototype.getExportStatus = function (operationId) {
                    var _this = this;
                    var self = this;
                    var deffered = $.Deferred();
                    setTimeout(function () {
                        _this.requestWrapper.getExportStatusRequest(operationId).done(function (response) {
                            self.previewHandlersHelper.doneExportStatusHandler(deffered, operationId, response);
                        }).fail(function (error) {
                            self.previewHandlersHelper.errorExportStatusHandler(deffered, error);
                        });
                    }, 250);
                    return deffered.promise();
                };
                ReportPreview.prototype.getExportResult = function (operationId, printDisposition) {
                    var arg = encodeURIComponent(JSON.stringify({ id: operationId, printable: !!printDisposition }));
                    this._safelyRunWindowOpen(Preview.HandlerUri + "?actionKey=getExportResult&arg=" + arg);
                };
                ReportPreview.prototype.getBuildStatus = function (documentId) {
                    var _this = this;
                    var self = this;
                    var deffered = $.Deferred();
                    setTimeout(function () {
                        _this.requestWrapper.getBuildStatusRequest(documentId).done(function (response) {
                            self.previewHandlersHelper.doneGetBuildStatusHandler(deffered, documentId, response);
                        }).fail(function (error) {
                            self.previewHandlersHelper.errorGetBuildStatusHandler(deffered, error);
                        });
                    }, 250);
                    return deffered.promise();
                };
                ReportPreview.prototype.getDoGetBuildStatusFunc = function () {
                    var preview = this;
                    var doGetBuildStatus = function (documentId) {
                        var promise = preview.getBuildStatus(documentId);
                        promise.done(function (result) {
                            if (result && result.requestAgain && !preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                                doGetBuildStatus(documentId);
                            }
                            else {
                                try {
                                    if (result.error || !result.requestAgain && !result.pageCount) {
                                        preview.removeEmptyPages(!result.pageCount);
                                        return;
                                    }
                                    if (!result.completed) {
                                        return;
                                    }
                                    preview.getDocumentData(documentId);
                                    preview.pages().forEach(function (page) {
                                        page.updateSize(preview._zoom());
                                        var isCurrentPage = page.pageIndex === preview.pageIndex();
                                        page.actualResolution = 0;
                                        page.isClientVisible(isCurrentPage);
                                        isCurrentPage && page._setPageImgSrc(documentId, preview._zoom());
                                    });
                                }
                                finally {
                                    preview.progressBar.complete();
                                    setTimeout(preview._raiseOnSizeChanged, 1000);
                                }
                            }
                        });
                    };
                    return doGetBuildStatus;
                };
                ReportPreview.prototype.getDocumentData = function (documentId) {
                    var _self = this;
                    this.requestWrapper.getDocumentData(documentId).done(function (response) {
                        if (!response) {
                            return;
                        }
                        _self._drillDownState = response.drillDownKeys || [];
                        _self.documentMap(response.documentMap);
                    }).fail(function (error) {
                        _self._processError(DevExpress.Designer.getLocalization("Cannot obtain additional document data for the current document"), error, _self._closeDocumentRequests[documentId]);
                    });
                };
                ReportPreview.prototype.exportDocumentTo = function (format) {
                    if (!this._currentDocumentId())
                        return;
                    var serializedExportOptions = this.exportOptionsModel() ? JSON.stringify(new DevExpress.JS.Utils.ModelSerializer().serialize(this.exportOptionsModel())) : null;
                    var args = encodeURIComponent(JSON.stringify({
                        documentId: this._currentDocumentId(),
                        exportOptions: serializedExportOptions,
                        format: format
                    }));
                    this._export(args, Preview.HandlerUri);
                };
                ReportPreview.prototype.printDocument = function (pageIndex) {
                    if (!this._currentDocumentId())
                        return;
                    var exportOptions = new DevExpress.Designer.Report.ExportOptionsPreview({});
                    exportOptions.pdf["showPrintDialogOnOpen"] = true;
                    pageIndex = parseInt(pageIndex);
                    if ((!!pageIndex && pageIndex > 0 || pageIndex === 0) && (this.pages().length > pageIndex)) {
                        (exportOptions.pdf["pageRange"] = pageIndex + 1);
                    }
                    var serializedExportOptions = JSON.stringify(new DevExpress.JS.Utils.ModelSerializer().serialize(exportOptions));
                    var args = encodeURIComponent(JSON.stringify({
                        documentId: this._currentDocumentId(),
                        exportOptions: serializedExportOptions,
                        format: "printpdf"
                    }));
                    this._export(args, Preview.HandlerUri, true);
                };
                ReportPreview.prototype.stopBuild = function (documentId) {
                    var id = documentId || this._currentDocumentId();
                    if (!id) {
                        this._startBuildOperationId && (this._stopBuildRequests[this._startBuildOperationId] = true);
                        return;
                    }
                    this._stopBuildRequests[id] = true;
                    this.progressBar.complete();
                    this.requestWrapper.stopBuild(id);
                };
                ReportPreview.prototype.closeDocument = function (documentId) {
                    var _documentId = documentId || this._currentDocumentId();
                    if (!_documentId) {
                        this._startBuildOperationId && (this._closeDocumentRequests[this._startBuildOperationId] = true);
                        return;
                    }
                    this._closeDocumentRequests[_documentId] = true;
                    this.progressBar.complete();
                    this.requestWrapper.sendCloseRequest(_documentId);
                };
                ReportPreview.prototype.closeReport = function (reportId) {
                    this._openReportOperationDeferred && this._openReportOperationDeferred.reject();
                    if (!this._currentReportId()) {
                        return;
                    }
                    this.requestWrapper.sendCloseRequest(null, this._currentReportId());
                };
                ReportPreview.prototype.goToPage = function (pageIndex, forcePageChanging) {
                    if (!forcePageChanging && this.pageIndex.peek() === pageIndex || this.pages.peek().length === 0 || pageIndex < 0 || pageIndex >= this.pages.peek().length) {
                        return;
                    }
                    this.pageIndex(pageIndex);
                    this.pages.peek().forEach(function (page) {
                        var visible = page.pageIndex === pageIndex;
                        page.active(visible);
                        page.isClientVisible(visible);
                    });
                };
                ReportPreview.prototype.getSelectedContent = function () {
                    var currentPage = this.pages()[this.pageIndex()];
                    if (!currentPage || !currentPage.brickColumnWidthArray) {
                        return "";
                    }
                    var activeBricks = [];
                    var getActiveBricks = function (currentBrick, resultArray) {
                        if (!currentBrick) {
                            return;
                        }
                        currentBrick.active() && currentBrick.genlIndex != -1 && activeBricks.push(currentBrick);
                        currentBrick.bricks && currentBrick.bricks.length != 0 && currentBrick.bricks.forEach(function (innerBrick) {
                            getActiveBricks(innerBrick, resultArray);
                        });
                    };
                    getActiveBricks(currentPage.brick(), activeBricks);
                    if (!activeBricks) {
                        return "";
                    }
                    var sortedActiveBricks = [];
                    var extendWithSpaces = function (width, text) {
                        text = text || "";
                        var spaceCount = width - text.length;
                        for (var i = 0; i <= spaceCount; i++) {
                            text += " ";
                        }
                        return text;
                    };
                    var firstUsedColumn = currentPage.brickColumnWidthArray.length, lastUsedColumn = -1;
                    activeBricks.forEach(function (activeBrick) {
                        var row = sortedActiveBricks[activeBrick.row];
                        if (!row) {
                            row = [];
                            sortedActiveBricks[activeBrick.row] = row;
                        }
                        var brickText = activeBrick.content && activeBrick.content.filter(function (x) { return x.Key === "text"; })[0];
                        row[activeBrick.col] = brickText && brickText.Value;
                        if (firstUsedColumn > activeBrick.col) {
                            firstUsedColumn = activeBrick.col;
                        }
                        if (lastUsedColumn < activeBrick.col) {
                            lastUsedColumn = activeBrick.col;
                        }
                    });
                    var result = "";
                    sortedActiveBricks.forEach(function (row) {
                        for (var c = firstUsedColumn; c <= lastUsedColumn; c++) {
                            result += extendWithSpaces(currentPage.brickColumnWidthArray[c], row[c]);
                        }
                        result += "\r\n";
                    });
                    return result;
                };
                ReportPreview.prototype._processError = function (error, jqXHR, ignoreExceptionPredicate, showForUser) {
                    if (showForUser === void 0) { showForUser = true; }
                    if (ignoreExceptionPredicate) {
                        return;
                    }
                    var serverError = DevExpress.Designer.getErrorMessage(jqXHR);
                    serverError && (error += ": " + serverError);
                    Preview.MessageHandler.processError(error, showForUser);
                };
                Object.defineProperty(ReportPreview.prototype, "reportId", {
                    get: function () {
                        return this._currentReportId();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ReportPreview.prototype, "documentId", {
                    get: function () {
                        return this._currentDocumentId();
                    },
                    enumerable: true,
                    configurable: true
                });
                return ReportPreview;
            })(DevExpress.Designer.Disposable);
            Preview.ReportPreview = ReportPreview;
            function updatePreviewContentSize(previewSize, root, rtl) {
                return function () {
                    var $root = $(root);
                    var rightAreaWidth = $root.find(".dxrd-preview .dxrd-right-panel").outerWidth() + $root.find(".dxrd-right-tabs").outerWidth();
                    var surfaceWidth = $root.find(".dxrd-preview").width() - (rightAreaWidth + 5);
                    var cssStyleData = rtl ? { 'right': '', 'left': rightAreaWidth } : { 'right': rightAreaWidth, 'left': '' };
                    cssStyleData['width'] = surfaceWidth;
                    $root.find(".dxrd-preview-wrapper").css(cssStyleData);
                    previewSize(surfaceWidth);
                };
            }
            Preview.updatePreviewContentSize = updatePreviewContentSize;
            function updatePreviewZoomWithAutoFit(width, height, element) {
                var $element = $(element);
                var $previewWrapper = $element.closest(".dxrd-preview-wrapper");
                var $preview = $element.closest(".dxrd-preview");
                if ($previewWrapper.length === 0 || $preview.length === 0) {
                    return 1;
                }
                var rightAreaWidth = $preview.find(".dxrd-right-panel").outerWidth() + $preview.find(".dxrd-right-tabs").outerWidth();
                var surfaceWidth = $preview.width() - (rightAreaWidth + 10);
                var topAreaHeight = parseFloat($previewWrapper.css("top").split("px")[0]);
                var designerHeight = $preview.outerHeight();
                var needHeight = designerHeight - topAreaHeight;
                var zoomHeight = needHeight / (height + 6);
                var zoomWidth = surfaceWidth / width;
                return Math.min(zoomHeight, zoomWidth);
            }
            Preview.updatePreviewZoomWithAutoFit = updatePreviewZoomWithAutoFit;
            function createPreview(element, callbacks, localization, parametersInfo, handlerUri, previewVisible, rtl, applyBindings, allowURLsWithJSContent) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                if (localization) {
                    DevExpress.JS.Localization.addCultureInfo({
                        messages: localization
                    });
                }
                DevExpress["config"]({ rtlEnabled: !!rtl });
                var previewWrapper = new Preview.PreviewRequestWrapper();
                var reportPreview = new ReportPreview(handlerUri, previewWrapper, undefined, rtl);
                var searchModel = new Preview.SearchViewModel(reportPreview);
                var documentMapModel = new Preview.DocumentMapModel(reportPreview);
                var parametersModel = new Preview.PreviewParametersViewModel(reportPreview, new Preview.PreviewParameterHelper(parametersInfo && parametersInfo.knownEnums, callbacks));
                var exportModel = new Preview.ExportOptionsModel(reportPreview);
                reportPreview.canSwitchToDesigner = !previewVisible;
                reportPreview.allowURLsWithJSContent = !!allowURLsWithJSContent;
                previewWrapper.initialize(reportPreview, parametersModel, searchModel);
                var tabPanel = new DevExpress.Designer.TabPanel([
                    parametersModel.tabInfo,
                    exportModel.tabInfo,
                    searchModel.tabInfo,
                    documentMapModel.tabInfo
                ], true, rtl);
                tabPanel.collapsed(true);
                var globalActionProviders = ko.observableArray([new Preview.PreviewActions(reportPreview), exportModel, searchModel, new Preview.PreviewDesignerActions(reportPreview)]);
                reportPreview.previewVisible(previewVisible);
                var designerModel = {
                    rootStyle: "dxrd-preview",
                    reportPreview: reportPreview,
                    parametersModel: parametersModel,
                    exportModel: exportModel,
                    searchModel: searchModel,
                    documentMapModel: documentMapModel,
                    tabPanel: tabPanel,
                    globalActionProviders: globalActionProviders,
                    globalActions: ko.computed(function () {
                        var globalActions = [];
                        globalActionProviders().forEach(function (actionProvider) {
                            globalActions.push.apply(globalActions, actionProvider.getActions(reportPreview));
                        });
                        if (callbacks && callbacks.customizeActions) {
                            callbacks.customizeActions(globalActions);
                        }
                        return globalActions;
                    }),
                    rtl: reportPreview.rtlViewer
                };
                designerModel.parts = [
                    { templateName: 'dxrd-preview-toolbar-scrollable', model: { actionLists: { toolbarItems: designerModel.globalActions } } },
                    { templateName: 'dxrdp-surface', model: designerModel.reportPreview },
                    { templateName: 'dxrd-right-panel-template-base', model: designerModel }
                ];
                if (element && !reportPreview.canSwitchToDesigner && applyBindings) {
                    $(element).children().remove();
                    ko.applyBindings(designerModel, element);
                }
                var updatePreviewContentSize_ = updatePreviewContentSize(reportPreview.previewSize, element, rtl);
                $(window).bind("resize", function () {
                    updatePreviewContentSize_();
                });
                tabPanel.width.subscribe(function () {
                    setTimeout(updatePreviewContentSize_, 1);
                });
                designerModel.updateSurfaceSize = function () {
                    updatePreviewContentSize_();
                };
                updatePreviewContentSize_();
                return designerModel;
            }
            Preview.createPreview = createPreview;
            function createAndInitPreviewModel(viewerModel, element, callbacks, rtl, applyBindings) {
                var previewModel = DevExpress.Report.Preview.createPreview(element, callbacks, viewerModel.localization, viewerModel.parametersInfo, viewerModel.handlerUri, undefined, rtl, applyBindings, viewerModel.allowURLsWithJSContent);
                if (viewerModel.reportId || viewerModel.documentId) {
                    previewModel.reportPreview.initialize($.Deferred().resolve(viewerModel));
                }
                return previewModel;
            }
            Preview.createAndInitPreviewModel = createAndInitPreviewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.ActionId = {
                Design: "dxxrp-design",
                FirstPage: "dxxrp-first-page",
                PrevPage: "dxxrp-prev-page",
                Pagination: "dxxrp-pagination",
                NextPage: "dxxrp-next-page",
                LastPage: "dxxrp-last-page",
                MultipageToggle: "dxxrp-multipage-toggle",
                ZoomOut: "dxxrp-zoom-out",
                ZoomSelector: "dxxrp-zoom-selector",
                ZoomIn: "dxxrp-zoom-in",
                Print: "dxxrp-print",
                PrintPage: "dxxrp-print-page",
                ExportTo: "dxxrp-export-menu",
                Search: "dxxrp-search"
            };
            var PreviewDesignerActions = (function () {
                function PreviewDesignerActions(reportPreview) {
                    this.actions = [];
                    this.actions.push({
                        id: Preview.ActionId.Design,
                        text: DevExpress.Designer.getLocalization("Design"),
                        imageClassName: "dxrd-image-design",
                        disabled: ko.observable(false),
                        visible: reportPreview.canSwitchToDesigner,
                        hotKey: { ctrlKey: true, keyCode: "P".charCodeAt(0) },
                        clickAction: function () {
                            reportPreview.previewVisible(false);
                            reportPreview.deactivate();
                        }
                    });
                }
                PreviewDesignerActions.prototype.getActions = function (context) {
                    return this.actions;
                };
                return PreviewDesignerActions;
            })();
            Preview.PreviewDesignerActions = PreviewDesignerActions;
            var PreviewActions = (function () {
                function PreviewActions(reportPreview) {
                    this.actions = [];
                    var zoomStep = ko.observable(0.01);
                    var printDisabled = ko.pureComputed(function () {
                        var inProgress = reportPreview.progressBar.inProgress();
                        var documentBuilding = reportPreview.documentBuilding();
                        return reportPreview.pageIndex() === -1 || inProgress || documentBuilding;
                    });
                    this.actions.push({
                        id: Preview.ActionId.FirstPage,
                        text: DevExpress.Designer.getLocalization("First Page"),
                        imageClassName: "dxrd-image-preview-first",
                        disabled: ko.pureComputed(function () {
                            return reportPreview.pageIndex() < 1;
                        }),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        hotKey: { ctrlKey: true, keyCode: "1".charCodeAt(0) },
                        clickAction: function () {
                            if (reportPreview.pageIndex() > 0) {
                                reportPreview.goToPage(0);
                            }
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.PrevPage,
                        text: DevExpress.Designer.getLocalization("Previous Page"),
                        imageClassName: "dxrd-image-preview-prev",
                        disabled: ko.pureComputed(function () {
                            return reportPreview.pageIndex() < 1;
                        }),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        hotKey: { ctrlKey: true, keyCode: ",".charCodeAt(0) },
                        clickAction: function () {
                            if (reportPreview.pageIndex() >= 1) {
                                reportPreview.goToPage(reportPreview.pageIndex() - 1);
                            }
                        },
                    });
                    var paginationSelectBoxViewModel = {
                        id: Preview.ActionId.Pagination,
                        text: "Pagination",
                        imageClassName: "dxrd-image-pager",
                        disabled: ko.observable(false),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        clickAction: $.noop,
                        selectedItem: ko.pureComputed({
                            read: function () {
                                if (reportPreview.pageIndex() < 0) {
                                    return null;
                                }
                                var items = paginationSelectBoxViewModel.pageItems();
                                return items && items.store && (items.store.length > reportPreview.pageIndex()) && items.store[reportPreview.pageIndex()];
                            },
                            write: function (newValue) {
                                if (!!newValue && (newValue.index || newValue.index === 0)) {
                                    reportPreview.goToPage(newValue.index);
                                }
                            },
                            deferEvaluation: true
                        }),
                        pageItems: ko.pureComputed(function () {
                            var pageCount = reportPreview.pages().length;
                            if (pageCount === 0 || reportPreview.pageIndex.peek() === -1) {
                                return [];
                            }
                            var pagesArray = new Array();
                            for (var i = 0; i < pageCount;) {
                                pagesArray.push({ index: i, text: ++i });
                            }
                            return {
                                store: pagesArray,
                                paginate: pageCount > 200,
                                pageSize: 100
                            };
                        }),
                        currentPage: reportPreview._currentPageText,
                        focusOut: function (e) {
                            if (!paginationSelectBoxViewModel._isPageChanged(e.component.option("text"))) {
                                reportPreview._currentPageText.notifySubscribers(reportPreview._currentPageText());
                            }
                        },
                        keyUp: function (e) {
                            if (e.jQueryEvent.which !== 13)
                                return;
                            if (paginationSelectBoxViewModel._isPageChanged(e.component.option("text"))) {
                                paginationSelectBoxViewModel.opened(false);
                            }
                        },
                        _isPageChanged: function (value) {
                            var val = parseInt && parseInt(value);
                            if (!!val && val-- > 0 && val < reportPreview.pages().length) {
                                reportPreview.goToPage(val);
                                return true;
                            }
                            return false;
                        },
                        displayExpr: function (value) {
                            var pageIndex = reportPreview.pageIndex.peek();
                            if (pageIndex === -1 || !value || pageIndex === value.index) {
                                return reportPreview._currentPageText.peek();
                            }
                            else {
                                return value.text;
                            }
                        },
                        itemTemplate: function (value) {
                            return value.text;
                        },
                        searchMode: 'startswith',
                        searchEnabled: ko.observable(true),
                        searchTimeout: 10,
                        opened: ko.observable(false),
                        templateName: "dxrd-preview-pager"
                    };
                    this.actions.push(paginationSelectBoxViewModel);
                    this.actions.push({
                        id: Preview.ActionId.NextPage,
                        text: DevExpress.Designer.getLocalization("Next Page"),
                        imageClassName: "dxrd-image-preview-next",
                        disabled: ko.pureComputed(function () {
                            return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1;
                        }),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        hotKey: { ctrlKey: true, keyCode: ".".charCodeAt(0) },
                        clickAction: function () {
                            if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                                reportPreview.goToPage(reportPreview.pageIndex() + 1);
                            }
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.LastPage,
                        text: DevExpress.Designer.getLocalization("Last Page"),
                        imageClassName: "dxrd-image-preview-last",
                        disabled: ko.pureComputed(function () {
                            return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1;
                        }),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        hotKey: { ctrlKey: true, keyCode: "L".charCodeAt(0) },
                        clickAction: function () {
                            if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                                reportPreview.goToPage(reportPreview.pages().length - 1);
                            }
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.MultipageToggle,
                        text: DevExpress.Designer.getLocalization("Toggle Multipage Mode"),
                        imageClassName: ko.pureComputed(function () {
                            return reportPreview.showMultipagePreview() ? "dxrd-image-preview-single-page" : "dxrd-image-preview-multipage";
                        }),
                        disabled: ko.observable(false),
                        visible: ko.pureComputed(function () {
                            return reportPreview.previewVisible();
                        }),
                        hotKey: { ctrlKey: true, keyCode: "M".charCodeAt(0) },
                        clickAction: function () {
                            var zoom = reportPreview._zoom();
                            reportPreview.showMultipagePreview(!reportPreview.showMultipagePreview());
                            reportPreview.zoom(zoom);
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomOut,
                        text: DevExpress.Designer.getLocalization("Zoom Out"),
                        imageClassName: "dxrd-image-zoomout",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: zoomStep,
                        clickAction: function () {
                            var zoomLevel = reportPreview.zoom() || reportPreview._zoom();
                            reportPreview.zoom(Math.max(zoomLevel - zoomStep(), 0.01));
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomSelector,
                        text: DevExpress.Designer.getLocalization("Zoom 100%"),
                        imageClassName: "dxrd-image-zoom",
                        disabled: ko.observable(false),
                        visible: true,
                        clickAction: function () {
                            reportPreview.zoom(1);
                        },
                        templateName: "dxrd-zoom-autofit-select-template",
                        zoom: reportPreview.zoom,
                        zoomLevels: reportPreview.predefinedZoomLevels,
                        zoomItems: ko.pureComputed(function () {
                            var items = reportPreview.predefinedZoomLevels.slice(0);
                            if (reportPreview.showMultipagePreview() === false && items.indexOf(0) === -1) {
                                items.push(0);
                            }
                            return items;
                        })
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomIn,
                        text: DevExpress.Designer.getLocalization("Zoom In"),
                        imageClassName: "dxrd-image-zoomin",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: zoomStep,
                        clickAction: function () {
                            var zoomLevel = reportPreview.zoom() || reportPreview._zoom();
                            reportPreview.zoom(Math.min(zoomLevel + zoomStep(), 10));
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.Print,
                        text: DevExpress.Designer.getLocalization("Print"),
                        imageClassName: "dxrd-image-print",
                        hasSeparator: true,
                        disabled: printDisabled,
                        visible: true,
                        clickAction: function () {
                            if (printDisabled()) {
                                return;
                            }
                            reportPreview.printDocument();
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.PrintPage,
                        text: DevExpress.Designer.getLocalization("Print Page"),
                        imageClassName: "dxrd-image-print-page",
                        disabled: printDisabled,
                        visible: true,
                        clickAction: function () {
                            if (printDisabled()) {
                                return;
                            }
                            reportPreview.printDocument(reportPreview.pageIndex());
                        }
                    });
                }
                PreviewActions.prototype.getActions = function (context) {
                    return this.actions;
                };
                return PreviewActions;
            })();
            Preview.PreviewActions = PreviewActions;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            ko.bindingHandlers["toView"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $previewPage = $(element), $container = $previewPage.parent(".dxrd-report-preview-holder"), pageActive = valueAccessor().active, subscription = pageActive.subscribe(function (active) {
                        if (active) {
                            var pageTop = $previewPage.position().top;
                            if (pageTop < 0 && (pageTop + $previewPage.height() < 0) || pageTop > $container.height()) {
                                $container.scrollTop($container.scrollTop() + pageTop);
                            }
                        }
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        subscription.dispose();
                    });
                }
            };
            ko.bindingHandlers["lazyImages"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $element = $(element), enabled = valueAccessor().enabled, loadVisibleImages = function () {
                        if (!enabled()) {
                            return;
                        }
                        var visibleArea = $element.height() + 100;
                        for (var i = 0; i < element.children.length; i++) {
                            var previewPage = element.children[i], rect = previewPage.getBoundingClientRect(), pageTop = rect.top;
                            if (visibleArea > pageTop && pageTop >= 0 || pageTop < 0 && pageTop + rect.height > -100) {
                                var previewPageModel = ko.dataFor(previewPage);
                                previewPageModel && previewPageModel.isClientVisible && previewPageModel.isClientVisible(true);
                            }
                        }
                    };
                    if (ko.isObservable(valueAccessor().updateCallback)) {
                        valueAccessor().updateCallback(loadVisibleImages);
                    }
                    var load;
                    var throttledLoad = function () {
                        if (load) {
                            clearTimeout(load);
                        }
                        load = setTimeout(function () {
                            loadVisibleImages();
                            load = undefined;
                        }, 700);
                    };
                    var subscribtion = enabled.subscribe(function (newVal) {
                        if (newVal) {
                            loadVisibleImages();
                        }
                    });
                    $element.on("scroll", throttledLoad);
                    setTimeout(loadVisibleImages, 500);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $element.off("scroll", throttledLoad);
                        subscribtion.dispose();
                    });
                }
            };
            ko.bindingHandlers["brick-selection"] = {
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var values = valueAccessor(), unwrappedValues = ko.unwrap(values);
                    var $element = $(element);
                    if ($element.selectable('instance')) {
                        return;
                    }
                    var touchEventName = 'touchstart', touchStartHandler = function (e) {
                        $element.selectable("destroy");
                        element.removeEventListener(touchEventName, touchStartHandler);
                    }, selectBrick = unwrappedValues.selectBrick, toggleBrickSelection = function (el, ctrl) {
                        if (el) {
                            var brick = ko.dataFor(el);
                            if (brick && brick.active) {
                                brick.active(ctrl || !brick.active());
                            }
                        }
                    }, resetBrickSelection = function (el) {
                        if (el) {
                            var brick = ko.dataFor(el);
                            if (brick && brick.active) {
                                brick.active(false);
                            }
                        }
                    }, options = $.extend({ filter: '.dxrd-report-preview-brick-selectable', distance: 5 }, unwrappedValues, {
                        selecting: function (event, ui) {
                            toggleBrickSelection(ui.selecting, event.ctrlKey);
                        },
                        start: function (event, ui) {
                            window.focus();
                            var focusedInput = $('input:focus,textarea:focus');
                            focusedInput[0] && focusedInput.blur();
                            selectBrick && selectBrick("", event.ctrlKey);
                        },
                        unselecting: function (event, ui) {
                            resetBrickSelection(ui.unselecting);
                        }
                    });
                    $element.selectable(options);
                    element.addEventListener(touchEventName, touchStartHandler, false);
                }
            };
            ko.bindingHandlers["textCopier"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var keyDownHandler = function (e) {
                        var value = viewModel.getSelectedContent();
                        if (!value || !(e.ctrlKey || e.metaKey) || $(e.target).is("input:visible,textarea:visible") || window.getSelection && window.getSelection() && window.getSelection().toString() || document["selection"] && document["selection"].createRange().text) {
                            return;
                        }
                        var $clipboardContainer = $("#clipboard-container");
                        $clipboardContainer.empty().show();
                        $("<textarea id='clipboard'></textarea>").val(value).appendTo($clipboardContainer).focus().select();
                    };
                    var keyUpHandler = function (e) {
                        if ($(e.target).is("#clipboard")) {
                            $("#clipboard-container").empty().hide();
                        }
                    };
                    $(document).on("keydown", keyDownHandler);
                    $(document).on("keyup", keyUpHandler);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $(document).off("keydown", keyDownHandler);
                        $(document).off("keyup", keyUpHandler);
                    });
                }
            };
            ko.bindingHandlers["autoFit"] = {
                init: function (element, valueAccessor) {
                    var options = valueAccessor();
                    var subscriptions = [];
                    var updateZoom = function (newOptions) {
                        if (newOptions.isAutoFit() === true && !newOptions.brickLoading()) {
                            var newZoom = Math.round(Preview.updatePreviewZoomWithAutoFit(newOptions.width(), newOptions.height(), element) * 100 - 1) / 100;
                            newOptions.zoom(Math.max(newZoom, 0.02));
                        }
                    };
                    updateZoom(options);
                    var onResize = function () {
                        updateZoom(options);
                    };
                    $(window).bind("resize", onResize);
                    subscriptions.push(options.rightPanelWidth.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    subscriptions.push(options.width.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    subscriptions.push(options.height.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    subscriptions.push(options.isAutoFit.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    subscriptions.push(options.brickLoading.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    subscriptions.push(options.previewSize.subscribe(function (newVal) {
                        updateZoom(options);
                    }));
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $(window).unbind("resize", onResize);
                        subscriptions.forEach(function (subscription) {
                            subscription.dispose();
                        });
                    });
                }
            };
            ko.bindingHandlers['dxReportViewer'] = {
                init: function (element, valueAccessor) {
                    var $element = $(element), values = ko.unwrap(valueAccessor()) || {}, getDesignerTemplate = function () {
                        return $('#dxrd-designer').text();
                    }, templateHtml = getDesignerTemplate(), processBinding = function () {
                        if (!templateHtml)
                            templateHtml = getDesignerTemplate();
                        $element.children().remove();
                        var child = $element.append(templateHtml).children()[0];
                        if (!child)
                            return;
                        ko.cleanNode(child);
                        var viewerModel = ko.isWriteableObservable(values.viewerModel) ? values.viewerModel : ko.observable(null);
                        if (!values.reportPreview || !values.parts) {
                            var model = DevExpress.Report.Preview.createAndInitPreviewModel(values, element, values.callbacks, values.rtl, false);
                            viewerModel(model);
                        }
                        else {
                            viewerModel(values);
                        }
                        ko.applyBindings(viewerModel, child);
                    };
                    if (!templateHtml) {
                        DevExpress.Designer.loadTemplates().done(processBinding);
                    }
                    else {
                        processBinding();
                    }
                    return { controlsDescendantBindings: true };
                }
            };
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var PreviewHandlersHelper = (function () {
                function PreviewHandlersHelper(preview) {
                    this._preview = preview;
                }
                PreviewHandlersHelper.prototype.doneStartExportHandler = function (deffered, printable, response) {
                    var _this = this;
                    try {
                        if (!response) {
                            this._preview.progressBar.complete();
                            return;
                        }
                        this._preview._currentOperationId(response);
                        var doGetExportStatus = function (operationId) {
                            var promise = _this._preview.getExportStatus(operationId);
                            promise.done(function (result) {
                                if (result && result.requestAgain) {
                                    _this._preview.progressBar && _this._preview.progressBar.progress(result.progress);
                                    doGetExportStatus(operationId);
                                }
                                else {
                                    _this._preview.progressBar.complete();
                                    if (!result.requestAgain && result.completed) {
                                        _this._preview.getExportResult(operationId, printable);
                                    }
                                    if (result.error) {
                                        _this._preview._processError(DevExpress.Designer.getLocalization("Error on retrieving an exporting status: ") + result.error);
                                        return;
                                    }
                                }
                            });
                        };
                        doGetExportStatus(this._preview._currentOperationId());
                    }
                    finally {
                        deffered.resolve(true);
                        this._preview._startBuildOperationId = "";
                    }
                };
                PreviewHandlersHelper.prototype.errorStartExportHandler = function (deffered, error) {
                    this._preview.progressBar.complete();
                    if (error) {
                        this._preview._processError(DevExpress.Designer.getLocalization("An error occurred during the export"), error);
                    }
                };
                PreviewHandlersHelper.prototype.doneExportStatusHandler = function (deffered, operationId, response) {
                    try {
                        if (!response) {
                            deffered.resolve({ requestAgain: false });
                            this._preview.progressBar.complete();
                            return;
                        }
                        if (response.faultMessage) {
                            deffered.resolve({ requestAgain: false, error: response.faultMessage });
                            this._preview._processError(response.faultMessage, null);
                            this._preview.progressBar.complete();
                            return;
                        }
                        this._preview.progressBar && this._preview.progressBar.progress() < response.progress && this._preview.progressBar.progress(response.progress);
                        deffered.resolve(response);
                    }
                    finally {
                        if (!deffered.state || deffered.state() === "pending") {
                            deffered.resolve({ requestAgain: false });
                        }
                    }
                };
                PreviewHandlersHelper.prototype.errorExportStatusHandler = function (deffered, error) {
                    this._preview.progressBar.complete();
                    deffered.resolve({ requestAgain: false, created: false });
                    this._preview._processError(DevExpress.Designer.getLocalization("Error obtaining an export status"), error);
                };
                PreviewHandlersHelper.prototype.doneStartBuildHandler = function (deffered, response) {
                    var _this = this;
                    try {
                        var removeAllEmptyPages = function (all) {
                            all && _this._preview.pages.removeAll();
                            _this._preview.removeEmptyPages();
                        };
                        if (!response || !response.documentId) {
                            this._preview.progressBar.complete();
                            removeAllEmptyPages();
                            return;
                        }
                        var stopBuildRequest = this._preview._stopBuildRequests[this._preview._startBuildOperationId];
                        var closeDocumentRequest = this._preview._closeDocumentRequests[this._preview._startBuildOperationId];
                        if (this._preview._startBuildOperationId && (stopBuildRequest || closeDocumentRequest)) {
                            if (closeDocumentRequest) {
                                closeDocumentRequest && this._preview.closeDocument(response.documentId);
                            }
                            else {
                                stopBuildRequest && this._preview.stopBuild(response.documentId);
                            }
                            this._preview.progressBar.complete();
                            removeAllEmptyPages();
                            return;
                        }
                        this._preview._currentDocumentId(response.documentId);
                        var doGetBuildStatus = this._preview.getDoGetBuildStatusFunc();
                        doGetBuildStatus(this._preview._currentDocumentId());
                    }
                    finally {
                        deffered.resolve(true);
                        this._preview._startBuildOperationId = "";
                    }
                };
                PreviewHandlersHelper.prototype.errorStartBuildHandler = function (deffered, error) {
                    this._preview.pageLoading(false);
                    this._preview.progressBar.complete();
                    deffered.resolve(true);
                    this._preview._startBuildOperationId = "";
                    this._preview.removeEmptyPages();
                    this._preview._processError(DevExpress.Designer.getLocalization("Cannot create a document for the current report"), error, this._preview._closeDocumentRequests[this._preview._startBuildOperationId]);
                };
                PreviewHandlersHelper.prototype.errorGetBuildStatusHandler = function (deffered, error) {
                    deffered.resolve({ requestAgain: false, created: false });
                    this._preview._processError(DevExpress.Designer.getLocalization("Error obtaining a build status"), error, this._preview._closeDocumentRequests[this._preview._currentDocumentId()]);
                };
                PreviewHandlersHelper.prototype.doneGetBuildStatusHandler = function (deffered, documentId, response) {
                    var _this = this;
                    try {
                        if (!response) {
                            deffered.resolve({ requestAgain: false });
                            return;
                        }
                        if (response.faultMessage) {
                            deffered.resolve({ requestAgain: false, pageCount: -1, error: response.faultMessage });
                            this._preview._processError(response.faultMessage, null, this._preview._closeDocumentRequests[documentId]);
                            return;
                        }
                        this._preview.progressBar.progress() < response.progress && !this._preview._stopBuildRequests[documentId] && !this._preview._closeDocumentRequests[documentId] && this._preview.progressBar.progress(response.progress);
                        var wereNoPagesAndNewOnesExist = this._preview.pageIndex() === -1 && response.pageCount > 0;
                        if (wereNoPagesAndNewOnesExist) {
                            this._preview.pageIndex(0);
                        }
                        var brickProvider = this._preview.getPreviewPageBrickProvider(Preview.HandlerUri, documentId);
                        for (var i = 0; i < response.pageCount && !this._preview._stopBuildRequests[documentId] && !this._preview._closeDocumentRequests[documentId]; i++) {
                            var createNewPage = function (index) {
                                return new Preview.PreviewPage(index, _this._preview._pageWidth, _this._preview._pageHeight, _this._preview._zoom, _this._preview._currentDocumentId, brickProvider, null, _this._preview.createBrickClickProcessor(index));
                            };
                            if (i < this._preview.pages().length) {
                                var page = this._preview.pages()[i];
                                if (!page || page.isEmpty) {
                                    page = createNewPage(i);
                                    this._preview.pages.splice(i, 1, page);
                                }
                                if (page.pageIndex === -1) {
                                    page.pageIndex = i;
                                    page.brickProvider = brickProvider;
                                }
                            }
                            else {
                                var newPage = createNewPage(i);
                                this._preview.pages.push(newPage);
                            }
                        }
                        this._preview._raiseOnSizeChanged();
                        if (wereNoPagesAndNewOnesExist) {
                            var pageIndex = this._preview.pages().length ? 0 : -1;
                            this._preview.goToPage(pageIndex, true);
                        }
                        deffered.resolve(response);
                    }
                    finally {
                        if (deffered.state() === "pending") {
                            deffered.resolve({ requestAgain: false });
                        }
                    }
                };
                return PreviewHandlersHelper;
            })();
            Preview.PreviewHandlersHelper = PreviewHandlersHelper;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var ProgressViewModel = (function () {
                function ProgressViewModel() {
                    var _this = this;
                    this.progress = ko.observable(0);
                    this._forceInvisible = ko.observable(false);
                    this.inProgress = ko.observable(false);
                    this.cancelText = ko.observable(DevExpress.Designer.getLocalization('Cancel'));
                    this.text = ko.observable('');
                    this.visible = ko.pureComputed({
                        read: function () {
                            if (_this._forceInvisible()) {
                                return false;
                            }
                            return _this.inProgress();
                        },
                        write: function (visibleState) {
                            _this._forceInvisible(!visibleState);
                        }
                    });
                    this.complete = function () {
                        _this.inProgress(false);
                        _this.progress(0);
                        $.isFunction(_this._onComplete) && _this._onComplete();
                        _this._onComplete = null;
                    };
                    this.startProgress = function (onComplete, onStop) {
                        _this.inProgress(true);
                        _this.progress(0);
                        _this._onComplete = onComplete;
                        _this.stop = function () {
                            try {
                                $.isFunction(onStop) && onStop();
                            }
                            finally {
                                _this.complete();
                            }
                        };
                    };
                }
                return ProgressViewModel;
            })();
            Preview.ProgressViewModel = ProgressViewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var PreviewRequestWrapper = (function () {
                function PreviewRequestWrapper(handlers) {
                    for (var name in handlers || {}) {
                        this[name] = handlers[name];
                    }
                }
                PreviewRequestWrapper.prototype.initialize = function (reportPreview, parametersModel, searchModel) {
                    this._reportPreview = reportPreview;
                    this._parametersModel = parametersModel;
                    this._searchModel = searchModel;
                };
                PreviewRequestWrapper.prototype.findTextRequest = function (text) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'findText', encodeURIComponent(JSON.stringify({
                        text: text,
                        documentId: this._reportPreview.documentId,
                        matchCase: this._searchModel.matchCase(),
                        wholeWord: this._searchModel.matchWholeWord(),
                        searchUp: this._searchModel.searchUp()
                    })));
                };
                PreviewRequestWrapper.prototype.stopBuild = function (id) {
                    DevExpress.Designer.ajax(Preview.HandlerUri, 'stopBuild', encodeURIComponent(id));
                };
                PreviewRequestWrapper.prototype.sendCloseRequest = function (documentId, reportId) {
                    DevExpress.Designer.ajax(Preview.HandlerUri, 'close', encodeURIComponent(JSON.stringify({
                        reportId: reportId,
                        documentId: documentId
                    })));
                };
                PreviewRequestWrapper.prototype.startBuildRequest = function () {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'startBuild', encodeURIComponent(JSON.stringify({
                        reportId: this._reportPreview.reportId,
                        drillDownKeys: this._reportPreview["_drillDownState"],
                        timeZoneOffset: 0 - new Date().getTimezoneOffset(),
                        parameters: this._parametersModel.serializeParameters()
                    })));
                };
                PreviewRequestWrapper.prototype.getBuildStatusRequest = function (documentId) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getBuildStatus', encodeURIComponent(JSON.stringify({
                        documentId: documentId,
                        timeOut: Math.max(5000, DevExpress.Report.Preview.TimeOut)
                    })));
                };
                PreviewRequestWrapper.prototype.getDocumentData = function (documentId) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getDocumentData', encodeURIComponent(documentId));
                };
                PreviewRequestWrapper.prototype.openReport = function (reportName) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'openReport', encodeURIComponent(reportName), Preview.MessageHandler.processError);
                };
                PreviewRequestWrapper.prototype.getStartExportOperation = function (arg) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'startExport', arg);
                };
                PreviewRequestWrapper.prototype.getExportStatusRequest = function (operationId) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getExportStatus', encodeURIComponent(JSON.stringify({
                        id: operationId,
                        timeOut: Math.max(5000, DevExpress.Report.Preview.TimeOut)
                    })));
                };
                return PreviewRequestWrapper;
            })();
            Preview.PreviewRequestWrapper = PreviewRequestWrapper;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=web-document-viewer.js.map