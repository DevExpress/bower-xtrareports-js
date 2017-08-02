/**
* DevExpress HTML/JS Reporting (web-document-viewer.js)
* Version: 17.1.5
* Build date: 2017-07-31
* Copyright (c) 2012 - 2017 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/NetComponents.xml
*/

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
                propertyName: "characterSet", modelName: "@CharacterSet", displayName: "Character Set", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "utf-8",
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
            Report.defaultExportModePreview = [
                { value: "SingleFile", displayValue: "Single File", localizationId: "PreviewStringId.ExportOption_RtfExportMode_SingleFile" },
                { value: "SingleFilePageByPage", displayValue: "Single File PageByPage", localizationId: "PreviewStringId.ExportOption_RtfExportMode_SingleFilePageByPage" }
            ];
            Report.defaultExportModeMerdedPreview = [
                { value: "SingleFilePageByPage", displayValue: "Single File PageByPage", localizationId: "PreviewStringId.ExportOption_RtfExportMode_SingleFilePageByPage" }
            ];
            Report.defaultExportMode = [
                { value: "SingleFile", displayValue: "Single File", localizationId: "PreviewStringId.ExportOption_HtmlExportMode_SingleFile" },
                { value: "SingleFilePageByPage", displayValue: "Single File PageByPage", localizationId: "PreviewStringId.ExportOption_HtmlExportMode_SingleFilePageByPage" },
                { value: "DifferentFiles", displayValue: "Different Files", localizationId: "PreviewStringId.ExportOption_HtmlExportMode_DifferentFiles" }
            ];
            Report.exportPageBreaks = { propertyName: "exportPageBreaks", modelName: "@ExportPageBreaks", displayName: "Export Page Breaks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.rtfExportMode = {
                propertyName: "rtfExportMode", modelName: "@ExportMode", defaultVal: "SingleFilePageByPage",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode",
                valuesArray: Report.defaultExportModePreview
            };
            Report.rtfExportModeMergedPreview = $.extend({}, Report.rtfExportMode, {
                from: excludeModesForMergedDocuments,
                valuesArray: Report.defaultExportModeMerdedPreview
            });
            Report.htmlExportMode = {
                propertyName: "htmlExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode",
                valuesArray: Report.defaultExportMode
            };
            Report.embedImagesInHTML = {
                propertyName: "embedImagesInHTML", modelName: "@EmbedImagesInHTML", defaultVal: false,
                editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, displayName: "Embed Images In HTML"
            };
            Report.imageExportMode = {
                propertyName: "imageExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode",
                valuesArray: Report.defaultExportMode
            };
            Report.xlsExportMode = {
                propertyName: "xlsExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode",
                valuesArray: Report.defaultExportMode
            };
            Report.xlsxExportMode = {
                propertyName: "xlsxExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode",
                valuesArray: Report.defaultExportMode
            };
            Report.textExportMode = {
                propertyName: "textExportMode", modelName: "@TextExportMode", displayName: "Text Export Mode", defaultVal: "Text", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: [
                    { value: "Text", displayValue: "Text", localizationId: "DevExpress.XtraPrinting.TextExportMode.Text" },
                    { value: "Value", displayValue: "Value", localizationId: "DevExpress.XtraPrinting.TextExportMode.Value" }
                ]
            };
            Report.xlsTextExportMode = {
                propertyName: "textExportMode", modelName: "@TextExportMode", displayName: "Text Export Mode", defaultVal: "Value", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: [
                    { value: "Text", displayValue: "Text", localizationId: "DevExpress.XtraPrinting.TextExportMode.Text" },
                    { value: "Value", displayValue: "Value", localizationId: "DevExpress.XtraPrinting.TextExportMode.Value" }
                ]
            };
            Report.csvTextSeparator = { propertyName: "separator", modelName: "@Separator", displayName: "Separator", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "," };
            Report.textEncodingType = {
                propertyName: "encodingType", modelName: "@EncodingType", displayName: "Encoding", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Default", from: Designer.fromEnum,
                valuesArray: [
                    { value: "Default", displayValue: "Windows-1252", localizationId: "DevExpress.XtraPrinting.EncodingType.Default" },
                    { value: "ASCII", displayValue: "us-ascii", localizationId: "DevExpress.XtraPrinting.EncodingType.ASCII" },
                    { value: "Unicode", displayValue: "utf-16", localizationId: "DevExpress.XtraPrinting.EncodingType.Unicode" },
                    { value: "BigEndianUnicode", displayValue: "utf-16BE", localizationId: "DevExpress.XtraPrinting.EncodingType.BigEndianUnicode" },
                    { value: "UTF7", displayValue: "utf-7", localizationId: "DevExpress.XtraPrinting.EncodingType.UTF7" },
                    { value: "UTF8", displayValue: "utf-8", localizationId: "DevExpress.XtraPrinting.EncodingType.UTF8" },
                    { value: "UTF32", displayValue: "utf-32", localizationId: "DevExpress.XtraPrinting.EncodingType.UTF32" }
                ]
            };
            Report.xlsExportHyperlinks = {
                propertyName: "exportHyperlinks", modelName: "@ExportHyperlinks", displayName: "Export Hyperlinks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsRawDataMode = {
                propertyName: "rawDataMode", modelName: "@RawDataMode", displayName: "Raw Data Mode", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsShowGridLines = {
                propertyName: "showGridLines", modelName: "@ShowGridLines", displayName: "Show Grid Lines", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsExportOptionsSheetName = {
                propertyName: "sheetName", modelName: "@SheetName", displayName: "Sheet Name", defaultVal: "Sheet", editor: DevExpress.JS.Widgets.editorTemplates.text
            };
            function excludeModesForMergedDocuments(val) {
                return ko.observable("SingleFilePageByPage");
            }
            Report.excludeModesForMergedDocuments = excludeModesForMergedDocuments;
            function excludeDifferentFilesMode(val) {
                return ko.observable(val === "DifferentFiles" ? "SingleFile" : val);
            }
            Report.excludeDifferentFilesMode = excludeDifferentFilesMode;
            Report.htmlExportModePreviewBase = {
                propertyName: Report.htmlExportMode.propertyName, modelName: Report.htmlExportMode.modelName, defaultVal: Report.htmlExportMode.defaultVal,
                editor: Report.htmlExportMode.editor, displayName: Report.htmlExportMode.displayName
            };
            Report.htmlExportModePreview = $.extend({}, Report.htmlExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: Report.defaultExportModePreview
            });
            Report.htmlExportModeMergedPreview = $.extend({}, Report.htmlExportModePreviewBase, {
                from: excludeModesForMergedDocuments,
                valuesArray: Report.defaultExportModeMerdedPreview
            });
            Report.xlsExportModePreviewBase = {
                propertyName: Report.xlsExportMode.propertyName, modelName: Report.xlsExportMode.modelName, defaultVal: Report.xlsExportMode.defaultVal,
                editor: Report.xlsExportMode.editor, displayName: Report.xlsExportMode.displayName
            };
            Report.xlsExportModePreview = $.extend({}, Report.xlsExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: Report.defaultExportModePreview
            });
            Report.xlsExportModeMergedPreview = $.extend({}, Report.xlsExportModePreviewBase, {
                from: excludeModesForMergedDocuments,
                valuesArray: Report.defaultExportModeMerdedPreview
            });
            Report.imageExportModePreviewBase = {
                propertyName: Report.imageExportMode.propertyName, modelName: Report.imageExportMode.modelName, defaultVal: Report.imageExportMode.defaultVal,
                editor: Report.imageExportMode.editor, displayName: Report.imageExportMode.displayName
            };
            Report.imageExportModePreview = $.extend({}, Report.imageExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: Report.defaultExportModePreview
            });
            Report.imageExportModeMergedPreview = $.extend({}, Report.imageExportModePreviewBase, {
                from: excludeModesForMergedDocuments,
                valuesArray: Report.defaultExportModeMerdedPreview
            });
            Report.xlsxExportModePreviewBase = {
                propertyName: Report.xlsxExportMode.propertyName, modelName: Report.xlsxExportMode.modelName, defaultVal: Report.xlsxExportMode.defaultVal,
                editor: Report.xlsxExportMode.editor, displayName: Report.xlsxExportMode.displayName,
            };
            Report.xlsxExportModePreview = $.extend({}, Report.xlsxExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: Report.defaultExportModePreview
            });
            Report.xlsxExportModeMergedPreview = $.extend({}, Report.xlsxExportModePreviewBase, {
                from: excludeModesForMergedDocuments,
                valuesArray: Report.defaultExportModeMerdedPreview
            });
            Report.previewBackColor = { propertyName: "backColor", modelName: "@BackColor", from: Designer.colorFromString, toJsonObject: Designer.colorToString };
            Report.previewSides = { propertyName: "borders", modelName: "@Sides" };
            Report.previewBorderColor = { propertyName: "borderColor", modelName: "@BorderColor", from: Designer.colorFromString, toJsonObject: Designer.colorToString };
            Report.previewBorderStyle = { propertyName: "borderStyle", modelName: "@BorderStyle" };
            Report.previewBorderDashStyle = { propertyName: "borderDashStyle", modelName: "@BorderDashStyle" };
            Report.previewBorderWidth = { propertyName: "borderWidth", modelName: "@BorderWidthSerializable", from: Designer.floatFromModel };
            Report.previewForeColor = { propertyName: "foreColor", modelName: "@ForeColor", from: Designer.colorFromString, toJsonObject: Designer.colorToString };
            Report.previewFont = { propertyName: "font", modelName: "@Font" };
            Report.previewPadding = { propertyName: "padding", modelName: "@Padding", from: Designer.Widgets.PaddingModel.from };
            Report.previewTextAlignment = { propertyName: "textAlignment", modelName: "@TextAlignment" };
            Report.brickStyleSerializationsInfo = [
                Report.previewBackColor,
                Report.previewSides,
                Report.previewBorderColor,
                Report.previewBorderStyle,
                Report.previewBorderDashStyle,
                Report.previewBorderWidth,
                Report.previewForeColor,
                Report.previewFont,
                Report.previewPadding,
                Report.previewTextAlignment
            ];
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.AsyncExportApproach = false;
            Preview.ExportFormatID = {
                PDF: { text: "PDF", textId: "ASPxReportsStringId.ExportName_pdf", format: "pdf" },
                XLS: { text: "XLS", textId: "ASPxReportsStringId.ExportName_xls", format: "xls" },
                XLSX: { text: "XLSX", textId: "ASPxReportsStringId.ExportName_xlsx", format: "xlsx" },
                RTF: { text: "RTF", textId: "ASPxReportsStringId.ExportName_rtf", format: "rtf" },
                MHT: { text: "MHT", textId: "ASPxReportsStringId.ExportName_mht", format: "mht" },
                HTML: { text: "HTML", textId: "ASPxReportsStringId.ExportName_html", format: "html" },
                Text: { text: "Text", textId: "ASPxReportsStringId.ExportName_txt", format: "txt" },
                CSV: { text: "CSV", textId: "ASPxReportsStringId.ExportName_csv", format: "csv" },
                Image: { text: "Image", textId: "ASPxReportsStringId.ExportName_png", format: "image" },
                DOCX: { text: "DOCX", textId: "ASPxReportsStringId.ExportName_docx", format: "docx" }
            };
            var ExportOptionsModel = (function () {
                function ExportOptionsModel(reportPreview) {
                    var _this = this;
                    this.actions = [];
                    this._reportPreview = reportPreview;
                    this.tabInfo = new DevExpress.Designer.TabInfo("Export Options", "dxrd-preview-export-options", reportPreview.exportOptionsModel, 'DevExpress.XtraPrinting.ExportOptions', "properties", ko.pureComputed(function () { return !!reportPreview.exportOptionsModel(); }));
                    this.actions.push({
                        id: Preview.ActionId.ExportTo,
                        text: "Export To",
                        textId: "ASPxReportsStringId.WebDocumentViewer_ExportToText",
                        disabled: reportPreview.exportDisabled,
                        visible: true,
                        clickAction: function (model) {
                            if (reportPreview.exportDisabled())
                                return;
                            _this._exportDocumentByFormat(model.itemData.format);
                        },
                        items: ko.pureComputed(function () {
                            var result = _this._getExportFormatItems();
                            return [{
                                    text: "Export To",
                                    textId: "ASPxReportsStringId.WebDocumentViewer_ExportToText",
                                    imageClassName: "dxrd-image-export-to",
                                    items: result
                                }];
                        }),
                        templateName: "dxrd-preview-export-to"
                    });
                }
                ExportOptionsModel.prototype._getExportFormatItems = function () {
                    var result = [];
                    var exportOptionsModel = this._reportPreview.exportOptionsModel();
                    if (exportOptionsModel) {
                        exportOptionsModel.pdf && result.push(Preview.ExportFormatID.PDF);
                        exportOptionsModel.xls && result.push(Preview.ExportFormatID.XLS);
                        exportOptionsModel.xlsx && result.push(Preview.ExportFormatID.XLSX);
                        exportOptionsModel.rtf && result.push(Preview.ExportFormatID.RTF);
                        exportOptionsModel.docx && result.push(Preview.ExportFormatID.DOCX);
                        exportOptionsModel.mht && result.push(Preview.ExportFormatID.MHT);
                        exportOptionsModel.html && result.push(Preview.ExportFormatID.HTML);
                        exportOptionsModel.textExportOptions && result.push(Preview.ExportFormatID.Text);
                        exportOptionsModel.csv && result.push(Preview.ExportFormatID.CSV);
                        exportOptionsModel.image && result.push(Preview.ExportFormatID.Image);
                    }
                    ;
                    return result;
                };
                ExportOptionsModel.prototype._exportDocumentByFormat = function (format) {
                    format && this._reportPreview.exportDocumentTo(format);
                };
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
                    propertyName: "format", modelName: "@Format", displayName: "Format", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Png", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "Bmp", displayValue: "BMP" },
                        { value: "Gif", displayValue: "GIF" },
                        { value: "Jpeg", displayValue: "JPEG" },
                        { value: "Png", displayValue: "PNG" },
                        { value: "Emf", displayValue: "EMF" },
                        { value: "Wmf", displayValue: "WMF" },
                        { value: "Tiff", displayValue: "TIFF" }
                    ]
                }
            ];
            var imageExportOptionsSerializationInfo = [Report.imageExportMode,
                { propertyName: "retainBackgroundTransparency", modelName: "@RetainBackgroundTransparency", displayName: "Retain Background Transparency", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "textRenderingMode", modelName: "@TextRenderingMode", displayName: "Text Rendering Mode", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "SystemDefault", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "SystemDefault", displayValue: "SystemDefault", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.SystemDefault" },
                        { value: "SingleBitPerPixelGridFit", displayValue: "SingleBitPerPixelGridFit", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixelGridFit" },
                        { value: "SingleBitPerPixel", displayValue: "SingleBitPerPixel", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixel" },
                        { value: "AntiAliasGridFit", displayValue: "AntiAliasGridFit", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.AntiAliasGridFit" },
                        { value: "AntiAlias", displayValue: "AntiAlias", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.AntiAlias" },
                        { value: "ClearTypeGridFit", displayValue: "ClearTypeGridFit", localizationId: "DevExpress.XtraPrinting.TextRenderingMode.ClearTypeGridFit" }
                    ]
                }
            ].concat(imageExportOptionsSerializationInfoBase);
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
                author, application, title, subject,
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
                    propertyName: "printingPermissions", modelName: "@PrintingPermissions", displayName: "Printing Permissions", defaultVal: "None", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.None" },
                        { value: "LowResolution", displayValue: "LowResolution", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.LowResolution" },
                        { value: "HighResolution", displayValue: "HighResolution", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.HighResolution" }
                    ]
                },
                {
                    propertyName: "changingPermissions", modelName: "@ChangingPermissions", displayName: "Changing Permissions", defaultVal: "None", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.None" },
                        { value: "InsertingDeletingRotating", displayValue: "InsertingDeletingRotating", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.InsertingDeletingRotating" },
                        { value: "FillingSigning", displayValue: "FillingSigning", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.FillingSigning" },
                        { value: "CommentingFillingSigning", displayValue: "CommentingFillingSigning", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.CommentingFillingSigning" },
                        { value: "AnyExceptExtractingPages", displayValue: "AnyExceptExtractingPages", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.AnyExceptExtractingPages" }
                    ]
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
                PdfPasswordSecurityOptions.prototype.isPropertyDisabled = function (name) {
                    var openPass = this.openPassword();
                    if (!this.permissionsPassword()) {
                        if (name === "permissionsOptions")
                            return true;
                        if (!openPass && name === pdfEncryptionLevel.propertyName)
                            return true;
                    }
                };
                PdfPasswordSecurityOptions.prototype.hasSensitiveData = function () {
                    return !!(this.openPassword() || this.permissionsPassword());
                };
                return PdfPasswordSecurityOptions;
            })();
            Report.PdfPasswordSecurityOptions = PdfPasswordSecurityOptions;
            var pdfEncryptionLevel = {
                propertyName: "encryptionLevel", modelName: "@EncryptionLevel", displayName: "Encryption Level", defaultVal: "AES128", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: [
                    { value: "ARC4", displayValue: "ARC4", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.ARC4" },
                    { value: "AES128", displayValue: "AES128", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.AES128" },
                    { value: "AES256", displayValue: "AES256", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.AES256" },
                ]
            };
            var pdfExportPasswordSecurityOptionsSerializationInfo = [
                { propertyName: "openPassword", modelName: "@OpenPassword", displayName: "Open Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } },
                pdfEncryptionLevel,
                { propertyName: "permissionsPassword", modelName: "@PermissionsPassword", displayName: "Permissions Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } },
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
                PdfExportOptions.prototype.hasSensitiveData = function () {
                    return this.pdfPasswordSecurityOptions && this.pdfPasswordSecurityOptions.hasSensitiveData();
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
                    propertyName: "imageQuality", modelName: "@ImageQuality", displayName: "Image Quality", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Highest", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "Lowest", displayValue: "Lowest", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Lowest" },
                        { value: "Low", displayValue: "Low", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Low" },
                        { value: "Medium", displayValue: "Medium", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Medium" },
                        { value: "High", displayValue: "High", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.High" },
                        { value: "Highest", displayValue: "Highest", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Highest" }
                    ]
                },
                {
                    propertyName: "pdfACompatibility", modelName: "@PdfACompatibility", displayName: "PDF A Compatibility", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "None", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.PdfACompatibility.None" },
                        { value: "PdfA1b", displayValue: "PdfA1b", localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA1b" },
                        { value: "PdfA2b", displayValue: "PdfA2b", localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA2b" },
                        { value: "PdfA3b", displayValue: "PdfA3b", localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA3b" }
                    ]
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
                    var exportMode = this.rtfExportMode();
                    if (name === "pageRange")
                        return exportMode === "SingleFile";
                    else if (name === "emptyFirstPageHeaderFooter" || name === "exportPageBreaks" || name === "keepRowHeight") {
                        return exportMode === "SingleFilePageByPage";
                    }
                };
                return RtfExportOptions;
            })();
            Report.RtfExportOptions = RtfExportOptions;
            var rtfExportOptionsSerializationInfoBase = [
                Report.pageRange,
                Report.exportWatermarks
            ];
            var emptyFirstPageHeaderFooter = { propertyName: "emptyFirstPageHeaderFooter", modelName: "@EmptyFirstPageHeaderFooter", displayName: "Empty First Page Header Footer", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }, keepRowHeight = { propertyName: "keepRowHeight", modelName: "@KeepRowHeight", displayName: "Keep Row Height", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            var rtfExportOptionsSerializationInfo = [
                emptyFirstPageHeaderFooter,
                Report.exportPageBreaks,
                keepRowHeight,
                Report.rtfExportMode
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
                author, application, title, subject,
                { propertyName: "tags", modelName: "@Tags", displayName: "Tags", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "category", modelName: "@Category", displayName: "Category", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "comments", modelName: "@Comments", displayName: "Comments", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "company", modelName: "@Company", displayName: "Company", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }
            ];
            var documentOptions = { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", info: documentOptionsSerializationsInfo, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var encryptionOptionsSerializationsInfo = [
                {
                    propertyName: "type", modelName: "@Type", displayName: "Type", defaultVal: "Strong", editor: DevExpress.JS.Widgets.editorTemplates.combobox, from: Designer.fromEnum,
                    valuesArray: [
                        { value: "Strong", displayValue: "Strong", localizationId: "DevExpress.XtraPrinting.XlEncryptionType.Strong" },
                        { value: "Compatible", displayValue: "Compatible", localizationId: "DevExpress.XtraPrinting.XlEncryptionType.Compatible" }
                    ]
                },
                { propertyName: "password", modelName: "@Password", displayName: "Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } }
            ];
            var encryptionOptions = { propertyName: "encryptionOptions", modelName: "EncryptionOptions", displayName: "Encryption Options", info: encryptionOptionsSerializationsInfo, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var xlsExportOptionsSerializationInfoCommon = [
                Report.xlsExportHyperlinks,
                Report.pageRange,
                Report.xlsRawDataMode,
                Report.xlsExportOptionsSheetName,
                Report.xlsShowGridLines,
                Report.xlsTextExportMode,
                { propertyName: "rasterizeImages", modelName: "@RasterizeImages", displayName: "Rasterize Images", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "rasterizationResolution", modelName: "@RasterizationResolution", displayName: "Rasterization Resolution", defaultVal: 96, editor: DevExpress.JS.Widgets.editorTemplates.numeric },
                { propertyName: "fitToPrintedPageWidth", modelName: "@FitToPrintedPageWidth", displayName: "Fit To Printed Page Width", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "fitToPrintedPageHeight", modelName: "@FitToPrintedPageHeight", displayName: "Fit To Printed Page Height", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "ignoreErrors", modelName: "@IgnoreErrors", displayName: "Ignore Errors", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "None", from: Designer.fromEnum, valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.XlIgnoreErrors.None" },
                        { value: "NumberStoredAsText", displayValue: "Number Stored As Text", localizationId: "DevExpress.XtraPrinting.XlIgnoreErrors.NumberStoredAsText" }
                    ]
                },
                {
                    propertyName: "rightToLeftDocument", modelName: "@RightToLeftDocument", displayName: "Right To Left Document", defaultVal: "Default", from: Designer.fromEnum, editor: DevExpress.JS.Widgets.editorTemplates.combobox, valuesArray: [
                        { value: "True", displayValue: "True", localizationId: "DevExpress.Utils.DefaultBoolean.True" },
                        { value: "False", displayValue: "False", localizationId: "DevExpress.Utils.DefaultBoolean.False" },
                        { value: "Default", displayValue: "Default", localizationId: "DevExpress.Utils.DefaultBoolean.Default" }
                    ]
                },
                documentOptions,
                encryptionOptions
            ];
            var xlsExportOptionsSerializationInfoBase = [
                { propertyName: "suppress256ColumnsWarning", modelName: "@Suppress256ColumnsWarning", displayName: "Suppress 256 Columns Warning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "suppress65536RowsWarning", modelName: "@Suppress65536RowsWarning", displayName: "Suppress 65536 Rows Warning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "workbookColorPaletteCompliance", modelName: "@WorkbookColorPaletteCompliance", displayName: "Workbook Color Palette Compliance", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "ReducePaletteForExactColors", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "ReducePaletteForExactColors", displayValue: "ReducePaletteForExactColors", localizationId: "DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.ReducePaletteForExactColors" },
                        { value: "AdjustColorsToDefaultPalette", displayValue: "AdjustColorsToDefaultPalette", localizationId: "DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.AdjustColorsToDefaultPalette" }
                    ]
                }
            ];
            var xlsExportOptionsSerializationInfo = [Report.xlsExportMode].concat(xlsExportOptionsSerializationInfoCommon, xlsExportOptionsSerializationInfoBase);
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
                XlsExportOptions.prototype.hasSensitiveData = function () {
                    return !!(this.encryptionOptions && this.encryptionOptions.password());
                };
                return XlsExportOptions;
            })();
            Report.XlsExportOptions = XlsExportOptions;
            var xlsxExportOptionsSerializationInfo = [Report.xlsxExportMode].concat(xlsExportOptionsSerializationInfoCommon);
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
                XlsxExportOptions.prototype.hasSensitiveData = function () {
                    return !!(this.encryptionOptions && this.encryptionOptions.password());
                };
                return XlsxExportOptions;
            })();
            Report.XlsxExportOptions = XlsxExportOptions;
            var docxExportOptionsSerializationInfo = [
                Report.rtfExportMode,
                Report.exportWatermarks,
                Report.pageRange,
                emptyFirstPageHeaderFooter,
                keepRowHeight,
                Report.exportPageBreaks,
                { propertyName: "tableLayout", modelName: "@TableLayout", displayName: "Table Layout", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false },
            ];
            var DocxExportOptions = (function () {
                function DocxExportOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                DocxExportOptions.from = function (model, serializer) {
                    return new DocxExportOptions(model || {}, serializer);
                };
                DocxExportOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, docxExportOptionsSerializationInfo, refs);
                };
                DocxExportOptions.prototype.getInfo = function () {
                    return docxExportOptionsSerializationInfo;
                };
                DocxExportOptions.prototype.isPropertyDisabled = function (name) {
                    var exportMode = this.rtfExportMode();
                    if (name === "pageRange" || name === "tableLayout")
                        return exportMode === "SingleFile";
                    else if (name === "emptyFirstPageHeaderFooter" || name === "exportPageBreaks") {
                        return exportMode === "SingleFilePageByPage";
                    }
                    else if (name === "keepRowHeight") {
                        return exportMode === "SingleFilePageByPage" && !this["tableLayout"]();
                    }
                };
                return DocxExportOptions;
            })();
            Report.DocxExportOptions = DocxExportOptions;
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
                    propertyName: "fieldType", modelName: "@FieldType", displayName: "Field Type", defaultVal: "TO", editor: DevExpress.JS.Widgets.editorTemplates.combobox, from: Designer.fromEnum,
                    valuesArray: [
                        { value: "TO", displayValue: "TO", localizationId: "DevExpress.XtraPrinting.RecipientFieldType.TO" },
                        { value: "CC", displayValue: "CC", localizationId: "DevExpress.XtraPrinting.RecipientFieldType.CC" },
                        { value: "BCC", displayValue: "BCC", localizationId: "DevExpress.XtraPrinting.RecipientFieldType.BCC" }
                    ]
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
                { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", from: XlsxExportOptions.from, toJsonObject: XlsxExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", from: DocxExportOptions.from, toJsonObject: DocxExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var htmlExportOptionsSerializationInfoPreview = [].concat(htmlExportOptionsSerializationInfoBase);
            var HtmlExportOptionsPreview = (function (_super) {
                __extends(HtmlExportOptionsPreview, _super);
                function HtmlExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                HtmlExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                HtmlExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(htmlExportOptionsSerializationInfoPreview);
                };
                HtmlExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModePreview];
                };
                return HtmlExportOptionsPreview;
            })(HtmlExportOptions);
            Report.HtmlExportOptionsPreview = HtmlExportOptionsPreview;
            var HtmlExportOptionsMergedPreview = (function (_super) {
                __extends(HtmlExportOptionsMergedPreview, _super);
                function HtmlExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                HtmlExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModeMergedPreview];
                };
                HtmlExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.htmlExportModeMergedPreview.propertyName;
                };
                return HtmlExportOptionsMergedPreview;
            })(HtmlExportOptionsPreview);
            Report.HtmlExportOptionsMergedPreview = HtmlExportOptionsMergedPreview;
            var imageExportOptionsSerializationInfoPreview = [].concat(imageExportOptionsSerializationInfoBase);
            var ImageExportOptionsPreview = (function (_super) {
                __extends(ImageExportOptionsPreview, _super);
                function ImageExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                ImageExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                ImageExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(imageExportOptionsSerializationInfoPreview);
                };
                ImageExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.imageExportModePreview];
                };
                return ImageExportOptionsPreview;
            })(ImageExportOptions);
            Report.ImageExportOptionsPreview = ImageExportOptionsPreview;
            var ImageExportOptionsMergedPreview = (function (_super) {
                __extends(ImageExportOptionsMergedPreview, _super);
                function ImageExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                ImageExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.imageExportModeMergedPreview];
                };
                ImageExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.imageExportModeMergedPreview.propertyName;
                };
                return ImageExportOptionsMergedPreview;
            })(ImageExportOptionsPreview);
            Report.ImageExportOptionsMergedPreview = ImageExportOptionsMergedPreview;
            var mhtExportOptionsSerializationInfoPreview = [].concat(mhtExportOptionsSerializationInfoBase);
            var MhtExportOptionsPreview = (function (_super) {
                __extends(MhtExportOptionsPreview, _super);
                function MhtExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                MhtExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                MhtExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(mhtExportOptionsSerializationInfoPreview);
                };
                MhtExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModePreview];
                };
                return MhtExportOptionsPreview;
            })(MhtExportOptions);
            Report.MhtExportOptionsPreview = MhtExportOptionsPreview;
            var MhtExportOptionsMergedPreview = (function (_super) {
                __extends(MhtExportOptionsMergedPreview, _super);
                function MhtExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                MhtExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModeMergedPreview];
                };
                MhtExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.htmlExportModeMergedPreview.propertyName;
                };
                return MhtExportOptionsMergedPreview;
            })(MhtExportOptionsPreview);
            Report.MhtExportOptionsMergedPreview = MhtExportOptionsMergedPreview;
            var rtfExportOptionsSerializationInfoPreview = [].concat(rtfExportOptionsSerializationInfoBase);
            var RtfExportOptionsPreview = (function (_super) {
                __extends(RtfExportOptionsPreview, _super);
                function RtfExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                RtfExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                RtfExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(rtfExportOptionsSerializationInfoPreview);
                };
                RtfExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.rtfExportMode];
                };
                return RtfExportOptionsPreview;
            })(RtfExportOptions);
            Report.RtfExportOptionsPreview = RtfExportOptionsPreview;
            var RtfExportOptionsMergedPreview = (function (_super) {
                __extends(RtfExportOptionsMergedPreview, _super);
                function RtfExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                RtfExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.rtfExportModeMergedPreview];
                };
                RtfExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.rtfExportModeMergedPreview.propertyName;
                };
                return RtfExportOptionsMergedPreview;
            })(RtfExportOptionsPreview);
            Report.RtfExportOptionsMergedPreview = RtfExportOptionsMergedPreview;
            var xlsExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon);
            var XlsExportOptionsPreview = (function (_super) {
                __extends(XlsExportOptionsPreview, _super);
                function XlsExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                XlsExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                XlsExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(xlsExportOptionsSerializationInfoPreview);
                };
                XlsExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsExportModePreview];
                };
                return XlsExportOptionsPreview;
            })(XlsExportOptions);
            Report.XlsExportOptionsPreview = XlsExportOptionsPreview;
            var XlsExportOptionsMergedPreview = (function (_super) {
                __extends(XlsExportOptionsMergedPreview, _super);
                function XlsExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                XlsExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsExportModeMergedPreview];
                };
                XlsExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.xlsExportModeMergedPreview.propertyName;
                };
                return XlsExportOptionsMergedPreview;
            })(XlsExportOptionsPreview);
            Report.XlsExportOptionsMergedPreview = XlsExportOptionsMergedPreview;
            var xlsxExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoCommon);
            var XlsxExportOptionsPreview = (function (_super) {
                __extends(XlsxExportOptionsPreview, _super);
                function XlsxExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                XlsxExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                XlsxExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(xlsxExportOptionsSerializationInfoPreview);
                };
                XlsxExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsxExportModePreview];
                };
                return XlsxExportOptionsPreview;
            })(XlsxExportOptions);
            Report.XlsxExportOptionsPreview = XlsxExportOptionsPreview;
            var XlsxExportOptionsMergedPreview = (function (_super) {
                __extends(XlsxExportOptionsMergedPreview, _super);
                function XlsxExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                XlsxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsxExportModeMergedPreview];
                };
                XlsxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.xlsxExportModeMergedPreview.propertyName;
                };
                return XlsxExportOptionsMergedPreview;
            })(XlsxExportOptionsPreview);
            Report.XlsxExportOptionsMergedPreview = XlsxExportOptionsMergedPreview;
            var docxExportOptionsSerializationInfoPreview = [
                Report.pageRange,
                Report.exportWatermarks
            ];
            var DocxExportOptionsPreview = (function (_super) {
                __extends(DocxExportOptionsPreview, _super);
                function DocxExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                DocxExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                DocxExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(docxExportOptionsSerializationInfoPreview);
                };
                DocxExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.rtfExportMode];
                };
                return DocxExportOptionsPreview;
            })(DocxExportOptions);
            Report.DocxExportOptionsPreview = DocxExportOptionsPreview;
            var DocxExportOptionsMergedPreview = (function (_super) {
                __extends(DocxExportOptionsMergedPreview, _super);
                function DocxExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                DocxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.rtfExportModeMergedPreview];
                };
                DocxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.rtfExportModeMergedPreview.propertyName;
                };
                return DocxExportOptionsMergedPreview;
            })(DocxExportOptionsPreview);
            Report.DocxExportOptionsMergedPreview = DocxExportOptionsMergedPreview;
            var ExportOptionsPreview = (function (_super) {
                __extends(ExportOptionsPreview, _super);
                function ExportOptionsPreview() {
                    _super.apply(this, arguments);
                }
                ExportOptionsPreview.prototype._generateFromFunction = function (exportType) {
                    return function (model, serializer) {
                        return new exportType(model || {}, serializer);
                    };
                };
                ExportOptionsPreview.prototype._generateInfo = function () {
                    return [
                        { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", from: this._generateFromFunction(HtmlExportOptionsPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "image", modelName: "Image", displayName: "Image Export Options", from: this._generateFromFunction(ImageExportOptionsPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", from: this._generateFromFunction(MhtExportOptionsPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", from: this._generateFromFunction(RtfExportOptionsPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", from: this._generateFromFunction(XlsExportOptionsPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", from: this._generateFromFunction(XlsxExportOptionsPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", from: this._generateFromFunction(DocxExportOptionsPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
                    ];
                };
                ExportOptionsPreview.prototype.hasSensitiveData = function () {
                    return (this.xls && this.xls.hasSensitiveData())
                        || (this.xlsx && this.xlsx.hasSensitiveData())
                        || (this.pdf && this.pdf.hasSensitiveData());
                };
                ExportOptionsPreview.prototype.getInfo = function () {
                    return this._generateInfo();
                };
                return ExportOptionsPreview;
            })(ExportOptions);
            Report.ExportOptionsPreview = ExportOptionsPreview;
            var ExportOptionsMergedPreview = (function (_super) {
                __extends(ExportOptionsMergedPreview, _super);
                function ExportOptionsMergedPreview() {
                    _super.apply(this, arguments);
                }
                ExportOptionsMergedPreview.prototype._generateInfo = function () {
                    return [
                        { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", from: this._generateFromFunction(HtmlExportOptionsMergedPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "image", modelName: "Image", displayName: "Image Export Options", from: this._generateFromFunction(ImageExportOptionsMergedPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", from: this._generateFromFunction(MhtExportOptionsMergedPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", from: this._generateFromFunction(RtfExportOptionsMergedPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", from: this._generateFromFunction(XlsExportOptionsMergedPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", from: this._generateFromFunction(XlsxExportOptionsMergedPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", from: this._generateFromFunction(DocxExportOptionsMergedPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
                    ];
                };
                return ExportOptionsMergedPreview;
            })(ExportOptionsPreview);
            Report.ExportOptionsMergedPreview = ExportOptionsMergedPreview;
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.previewDefaultResolution = 96;
            function convertToPercent(childSize, parentSize) {
                return childSize * 100 / parentSize + '%';
            }
            Preview.convertToPercent = convertToPercent;
            function brickText(brick, editingFieldsProvider) {
                var fields = editingFieldsProvider ? editingFieldsProvider() : [];
                if (brick.efIndex && brick.efIndex > 0 && brick.efIndex <= fields.length && fields[brick.efIndex - 1].type() === "text") {
                    return fields[brick.efIndex - 1].editValue();
                }
                else {
                    var brickTextProperty = brick.content && brick.content.filter(function (x) { return x.Key === "text"; })[0];
                    return brickTextProperty && brickTextProperty.Value;
                }
            }
            Preview.brickText = brickText;
            function initializeBrick(brick, processClick, zoom, editingFieldBricks) {
                if (!brick) {
                    return;
                }
                !!brick.active && !!brick.active(false) || (brick.active = ko.observable(false));
                brick.onClick = function (e) { processClick && processClick(brick, e); };
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    childBrick[brick.rtl ? 'rightP' : 'leftP'] = convertToPercent(childBrick.left, brick.width);
                    childBrick.widthP = convertToPercent(childBrick.width, brick.width);
                    childBrick.topP = convertToPercent(childBrick.top, brick.height);
                    childBrick.heightP = convertToPercent(childBrick.height, brick.height);
                    initializeBrick(childBrick, processClick, zoom, editingFieldBricks);
                });
                if (brick.efIndex > 0) {
                    editingFieldBricks.push(brick);
                }
                brick.text = function () { return brickText(brick); };
            }
            Preview.initializeBrick = initializeBrick;
            var PreviewPageBrickProvider = (function () {
                function PreviewPageBrickProvider(handlerUri, documentId, ignoreErrorPredicate) {
                    this.getBricks = function (pageIndex) {
                        return DevExpress.Designer.ajax(handlerUri, 'getBrickMap', encodeURIComponent(JSON.stringify({ pageIndex: pageIndex, documentId: documentId })), undefined, ignoreErrorPredicate);
                    };
                }
                return PreviewPageBrickProvider;
            })();
            Preview.PreviewPageBrickProvider = PreviewPageBrickProvider;
            function getCurrentResolution(zoom) {
                return Math.floor((zoom || 1) * Preview.previewDefaultResolution);
            }
            Preview.getCurrentResolution = getCurrentResolution;
            var PreviewPage = (function (_super) {
                __extends(PreviewPage, _super);
                function PreviewPage(pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick, previewEditingFields) {
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
                    this.maxZoom = 0;
                    this.disableResolutionReduction = false;
                    this._lastZoom = 0;
                    this._selectedBrickPath = null;
                    this.pageIndex = pageIndex;
                    this.documentId = documentId || ko.observable(null);
                    unifier = ko.isObservable(unifier) ? unifier : ko.observable(unifier || Preview.generateGuid());
                    this.brickProvider = brickProvider;
                    this.pageLoading = loading || ko.observable(true);
                    this.originalHeight(ko.unwrap(height));
                    this.originalWidth(ko.unwrap(width));
                    this.zoom = zoom;
                    this.isClientVisible.subscribe(function (newVal) {
                        if (_this.isClientVisible()) {
                            _this._setPageImgSrc(_this.documentId(), unifier(), _this.zoom());
                        }
                    });
                    this.color = color;
                    this.width = ko.pureComputed(function () {
                        return Math.ceil(_this.originalWidth() * getCurrentResolution(_this.zoom()) / Preview.previewDefaultResolution);
                    });
                    this.height = ko.pureComputed(function () {
                        return Math.ceil(_this.originalHeight() * getCurrentResolution(_this.zoom()) / Preview.previewDefaultResolution);
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
                                _self.brickProvider.getBricks(_self.pageIndex)
                                    .done(function (result) {
                                    try {
                                        if (!result || !result.brick) {
                                            return;
                                        }
                                        _self.brickColumnWidthArray = result.columnWidthArray;
                                        _self.originalWidth(result.brick.width);
                                        _self.originalHeight(result.brick.height);
                                        var editignFieldBricks = [];
                                        _self.initializeBrick(result.brick, processClick, _self.zoom, editignFieldBricks);
                                        _self._initializeEditingFields(editignFieldBricks, previewEditingFields, result.brick.width, result.brick.height);
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
                                brick.bricks.forEach(function (childBrick) { _self.resetBrickRecusive(childBrick); });
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
                PreviewPage.prototype._initializeEditingFields = function (editingFieldBricks, previewEditngFields, originalWidth, originalHeight) {
                    var _this = this;
                    if (this.editingFields) {
                        this.editingFields.dispose();
                    }
                    this.editingFields = ko.pureComputed(function () {
                        if (!previewEditngFields || editingFieldBricks.length === 0) {
                            return [];
                        }
                        var allEditingFields = previewEditngFields();
                        var pageFieldViewModels = [];
                        for (var i = 0; i < editingFieldBricks.length; i++) {
                            var brick = editingFieldBricks[i];
                            var editingField = allEditingFields[brick.efIndex - 1];
                            if (!editingField)
                                return [];
                            pageFieldViewModels.push(editingField.createViewModel(_this.realZoom, originalWidth, originalHeight, function () { return allEditingFields; }, brick.absoluteBounds));
                            brick.text = function () { return brickText(brick, function () { return allEditingFields; }); };
                        }
                        return pageFieldViewModels;
                    });
                };
                PreviewPage.prototype.updateSize = function (zoom) {
                    var newResolution = getCurrentResolution(zoom);
                    this.realZoom(newResolution / Preview.previewDefaultResolution);
                    return newResolution;
                };
                PreviewPage.prototype.clearBricks = function () {
                    this.brick(null);
                    this.brickLoading(true);
                };
                PreviewPage.prototype._setPageImgSrc = function (documentId, unifier, zoom) {
                    this.pageLoadFailed(false);
                    if (!documentId || this.pageIndex === -1) {
                        return;
                    }
                    if (this.maxZoom && this.maxZoom < zoom) {
                        zoom = this.maxZoom;
                    }
                    if (this._lastZoom < zoom) {
                        this._lastZoom = zoom;
                    }
                    else {
                        if (this.actualResolution && this.disableResolutionReduction && this.imageSrc())
                            return;
                    }
                    var newResolution = this.updateSize(zoom);
                    if ((this.actualResolution === newResolution || newResolution < 9) && this.imageSrc()) {
                        return;
                    }
                    this.actualResolution = newResolution;
                    var imageResolution = Math.floor(newResolution * (window["devicePixelRatio"] || 1));
                    this.imageSrc(Preview.HandlerUri +
                        "?actionKey=getPage&unifier=" + unifier +
                        "&arg=" + encodeURIComponent(JSON.stringify({ pageIndex: this.pageIndex, documentId: documentId, resolution: imageResolution })));
                };
                PreviewPage.prototype._clear = function () {
                    this.pageIndex = -1;
                    this.brick(null);
                    this._setPageImgSrc(null, null, 1);
                    this.actualResolution = 0;
                };
                PreviewPage.prototype.initializeBrick = function (brick, processClick, zoom, editingFieldBricks) {
                    initializeBrick(brick, processClick, this.zoom, editingFieldBricks);
                    brick['leftP'] = convertToPercent(brick.left, this.originalWidth());
                    brick.topP = convertToPercent(brick.top, this.originalHeight());
                    brick.widthP = convertToPercent(brick.width, this.originalWidth());
                    brick.heightP = convertToPercent(brick.height, this.originalHeight());
                    this.brick(brick);
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
            Preview.formatSearchResult = function (value) { return value && ('page ' + (value.pageIndex + 1)); };
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
                    this.clean = function () { _this.searchText(""); };
                    var lastMatchCase = this.matchCase();
                    var lastMatchWholeWord = this.matchWholeWord();
                    this._disposables.push(reportPreview._currentDocumentId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    this._disposables.push(reportPreview._currentReportId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    this.findUp = function () { _this.searchUp(true); _this.findNext(); };
                    this.findDown = function () { _this.searchUp(false); _this.findNext(); };
                    this.goToResult = function (result) { _this._resultNavigator.goToResult(result.id); };
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
                        var cache = _this.matchWholeWord()
                            ? mCase ? _this._cachedWholeWordWithCaseRequests : _this._cachedWholeWordRequests
                            : mCase ? _this._cachedCaseSensitiveRequests : _this._cachedRequests;
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
                    this._disposables.push(this.searchText.subscribe(function (newVal) { newSearch(newVal); }));
                    var disabled = ko.pureComputed(function () {
                        var documentId = reportPreview["_currentDocumentId"]();
                        var pageIndex = reportPreview.pageIndex();
                        return reportPreview.documentBuilding() || !documentId || pageIndex === -1;
                    });
                    this.actions.push({
                        id: Preview.ActionId.Search,
                        text: "Search",
                        textId: 'ASPxReportsStringId.SearchDialog_Header',
                        imageClassName: "dxrd-image-search",
                        disabled: disabled,
                        visible: ko.pureComputed(function () { return Preview.searchAvailable(); }),
                        hasSeparator: true,
                        hotKey: { ctrlKey: false, keyCode: 70 },
                        clickAction: function () {
                            if (!_this.tabInfo.active()) {
                                _this.tabInfo.active(true);
                            }
                            else {
                                _this.tabInfo.active.notifySubscribers(true);
                            }
                        }
                    });
                    this.tabInfo = new DevExpress.Designer.TabInfo("Search", "dxrd-preview-search", this, 'ASPxReportsStringId.SearchDialog_Header', "search", ko.pureComputed(function () { return !disabled() && Preview.searchAvailable(); }));
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
                    get: function () { return this.loading(); },
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
                function SearchResultNavigator(searchModel, reportPreview) {
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
                        if (!searchModel.searchResult() || searchModel.searchResult().length === 0) {
                            return null;
                        }
                        var firstMatch;
                        var sortOutResult = function (index) {
                            searchModel.searchResult().forEach(function (m) {
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
                        if (searchModel.searchResult() && searchModel.searchResult().length !== 0) {
                            var currentResult = (resultId >= 0 && searchModel.searchResult().length > resultId) ?
                                searchModel.searchResult()[resultId] :
                                _this.getFirstMatchFromPage(reportPreview.pageIndex.peek(), searchModel.searchUp.peek(), thisPageOnly);
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
                        if (_this.currentResult() && newPageIndex === _this.currentResult().pageIndex)
                            return;
                        _this.currentResult(null);
                    }));
                    this._disposables.push(searchModel.searchResult.subscribe(function () {
                        _setCurrentResult(true);
                    }));
                    this.next = function (up) {
                        if (!searchModel.searchResult()) {
                            return false;
                        }
                        if (!_this.currentResult()) {
                            var prevPageIndex = (reportPreview.pageIndex() === 0 ? reportPreview.pages.length : reportPreview.pageIndex()) - 1;
                            var pageIndexToSearchFrom = up ? prevPageIndex : reportPreview.pageIndex();
                            var firstResult = _this.getFirstMatchFromPage(pageIndexToSearchFrom, up);
                            _this.currentResult(firstResult);
                            if (firstResult) {
                                goToMatchedResult(firstResult);
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        var id, currentId = _this.currentResult().id;
                        if (up) {
                            id = (currentId === 0) ? searchModel.searchResult().length - 1 : (currentId - 1);
                        }
                        else {
                            id = (currentId === searchModel.searchResult().length - 1) ? 0 : (currentId + 1);
                        }
                        _this.currentResult(searchModel.searchResult()[id]);
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
                    var _this = this;
                    options["onEnterKey"] = function (e) {
                        if (DevExpress.browser && DevExpress.browser.msie && e && e.component) {
                            e.component.blur();
                            e.component.focus();
                        }
                        _this.findNext(e && e.jQueryEvent && e.jQueryEvent.shiftKey);
                    };
                    options["onFocusOut"] = function (e) {
                        _this._searchModel.searchText(_this.option("text"));
                    };
                    _super.call(this, element, options);
                    this._activeStateUnit = EDITOR_BUTTON_SELECTOR;
                    this._focusRequestRaised = function () { _this.focus(); };
                    this._searchModel = options.searchModel;
                    this._searchModel.focusRequested.subscribe(function (val) { return _this._focusRequestRaised(); });
                }
                dxSearchEditor.prototype.findNext = function (searchUp) {
                    if (this._searchModel.searchText() !== this.option("text")) {
                        this._searchModel.searchText(this.option("text"));
                    }
                    else {
                        try {
                            if (searchUp) {
                                (!this._searchModel.loading()) && this._searchModel.findUp();
                            }
                            else {
                                (!this._searchModel.loading()) && this._searchModel.findDown();
                            }
                        }
                        finally {
                            return true;
                        }
                    }
                };
                dxSearchEditor.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.element().addClass(EDITOR_CLASS);
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
                            _this.findNext(direction.toLowerCase() === "up") && e.stopPropagation();
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
                    this.tabInfo = new DevExpress.Designer.TabInfo("Document Map", "dxrd-preview-document-map", this, "DevExpress.XtraPrinting.PrintingSystemCommand.DocumentMap", "reportexplorer", ko.pureComputed(function () { return !_this.isEmpty(); }));
                }
                return DocumentMapModel;
            })();
            Preview.DocumentMapModel = DocumentMapModel;
            (function (ColumnSortOrder) {
                ColumnSortOrder[ColumnSortOrder["None"] = 0] = "None";
                ColumnSortOrder[ColumnSortOrder["Ascending"] = 1] = "Ascending";
                ColumnSortOrder[ColumnSortOrder["Descending"] = 2] = "Descending";
            })(Preview.ColumnSortOrder || (Preview.ColumnSortOrder = {}));
            var ColumnSortOrder = Preview.ColumnSortOrder;
            ;
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
                    return bookmark.nodes.map(function (node, i) { return { name: i + "", displayName: node.text, isList: node.nodes && node.nodes.length > 0, bookmark: node, specifics: "node" }; });
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
                DocumentMapTreeListController.prototype.showIconsForChildItems = function () {
                    return false;
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
                    return !!this._knownEnums && this._knownEnums.some(function (knownEnumType) { return knownEnumType.enumType === type; });
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
                    return { value: newValue, getInfo: function () { return [parameter.multiValueInfo()]; } };
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
                            paginate: true,
                            pageSize: 100
                        });
                    }
                    return items;
                };
                ParameterHelper.prototype.getEnumCollection = function (parameter) {
                    var type = ko.unwrap(parameter.type);
                    if (this._isKnownEnumType(type)) {
                        var currentKnownEnumInfo = this._knownEnums.filter(function (knownEnumType) { return knownEnumType.enumType === type; })[0];
                        if (currentKnownEnumInfo && currentKnownEnumInfo.values && currentKnownEnumInfo.values.length !== 0) {
                            return currentKnownEnumInfo.values.map(function (val) { return { value: val.value, displayValue: val.displayName }; });
                        }
                    }
                };
                ParameterHelper.prototype.getParameterInfo = function (parameter) {
                    var _this = this;
                    var valueInfo = this.createInfo(parameter);
                    parameter.multiValueInfo($.extend(true, {}, valueInfo, { propertyName: "value" }));
                    if (ko.unwrap(parameter.isMultiValue)) {
                        valueInfo.editor = DevExpress.Designer.getEditorType(parameter["isMultiValueWithLookUp"] ? "multiValueWithLookUp" : "multiValue");
                        valueInfo["addHandler"] = function () { return _this.createMultiValue(parameter); };
                    }
                    if (this._customizeParameterEditors()) {
                        this._customizeParameterEditors()(parameter.getParameterDescriptor(), valueInfo);
                    }
                    return valueInfo;
                };
                ParameterHelper.prototype.getValueConverter = function (type) {
                    return (function (val) { return val; });
                };
                return ParameterHelper;
            })();
            Preview.ParameterHelper = ParameterHelper;
            var PreviewParameterHelper = (function (_super) {
                __extends(PreviewParameterHelper, _super);
                function PreviewParameterHelper(knownEnums, callbacks) {
                    _super.call(this);
                    this.callbacks = callbacks;
                    this.initialize(knownEnums, callbacks);
                }
                PreviewParameterHelper.prototype.mapLookUpValues = function (type, lookUpValues) {
                    var converter = this.getValueConverter(type);
                    return $.map(lookUpValues || [], function (lookUpValue) { return { value: converter(lookUpValue.Value), displayValue: lookUpValue.Description }; });
                };
                PreviewParameterHelper.fixPropertyName = function (propertyName) {
                    return propertyName.replace(/\./g, '_');
                };
                PreviewParameterHelper.getPrivatePropertyName = function (propertyName) {
                    return "_" + PreviewParameterHelper.fixPropertyName(propertyName);
                };
                PreviewParameterHelper.prototype.createInfo = function (parameter) {
                    var info = _super.prototype.createInfo.call(this, parameter);
                    info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameter.path);
                    if (!parameter.isMultiValue && (parameter.lookUpValues() || this.isEnumType(parameter)))
                        info.editorOptions = { searchEnabled: true };
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
                        return function (dateString) { return DevExpress.JS.Localization.parseDate(dateString); };
                    }
                    else if (["System.Int16", "System.Int32", "System.Int64"].indexOf(type) > -1) {
                        return function (val) { return DevExpress.JS.Utils.integerValueConverter(val, "0"); };
                    }
                    else if (["System.Single", "System.Double", "System.Decimal"].indexOf(type) > -1) {
                        return function (val) { return DevExpress.JS.Utils.floatValueConverter(val, "0"); };
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
                    this.intTypes = ["System.Int16", "System.Int32", "System.Int64"];
                    this.floatTypes = ["System.Single", "System.Double", "System.Decimal"];
                    this.isTypesCurrentType = function (types, type) { return types.indexOf(type) > -1; };
                    this.type = parameterInfo.TypeString;
                    this.path = parameterInfo.Path;
                    this.visible = parameterInfo.Visible;
                    this.isFilteredLookUpSettings = parameterInfo.IsFilteredLookUpSettings;
                    this._originalLookUpValues = parameterInfo.LookUpValues ? parameterHelper.mapLookUpValues(this.type, parameterInfo.LookUpValues || []) : null;
                    this.lookUpValues(this._originalLookUpValues);
                    this.lookUpValues.subscribe(function () { _this.valueStoreCache = null; });
                    this.isMultiValue = parameterInfo.MultiValue;
                    this.isMultiValueWithLookUp = this.isMultiValue && !!this.lookUpValues();
                    this._originalValue = parameterInfo.Value;
                    if (parameterInfo.ValueInfo && this.isTypesCurrentType(this.intTypes.concat(this.floatTypes), this.type) && !this.isMultiValueWithLookUp) {
                        this._originalValue = parameterInfo.ValueInfo;
                    }
                    this.getParameterDescriptor = function () {
                        return {
                            description: parameterInfo.Description,
                            displayName: parameterInfo.Description || parameterInfo.Name,
                            name: parameterInfo.Name,
                            type: parameterInfo.TypeString,
                            value: _this._originalValue,
                            multiValue: parameterInfo.MultiValue,
                            visible: parameterInfo.Visible
                        };
                    };
                    this._disposables.push(ko.computed(function () {
                        var info = parameterHelper.getParameterInfo(_this);
                        info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameterInfo.Path);
                        _this.valueInfo(info);
                    }));
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
                            newItems = parameterHelper.customizeParameterLookUpSource(this.getParameterDescriptor(), multiValuesHelper.displayItems);
                        if (newItems) {
                            multiValuesHelper.dataSource = newItems;
                        }
                        else {
                            multiValuesHelper.dataSource = new DevExpress.data.DataSource({ store: multiValuesHelper.displayItems, pageSize: 100, paginate: true });
                        }
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
                                    var matchedParameter = parametersViewModel._parameters.filter(function (p) { return p.path === lookUpCollection.Key; })[0];
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
                    this.validateAndSubmit = function (params) {
                        var result = params && params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
                        if (!result || result.isValid)
                            _this.submit();
                    };
                    this.submit = function () {
                        if (_this.parametersLoading())
                            return;
                        _this.parametersLoading(true);
                        var promise = reportPreview.startBuild();
                        promise && promise.done(function (val) { _this.parametersLoading(false); });
                    };
                    this._disposables.push(reportPreview.originalParametersInfo.subscribe(function (originalParametersInfo) {
                        _this.initialize(originalParametersInfo);
                    }));
                    this.initialize(reportPreview.originalParametersInfo());
                    var notEmpty = ko.pureComputed(function () { return !_this.isEmpty(); });
                    this.tabInfo = new DevExpress.Designer.TabInfo("Parameters", "dxrd-preview-parameters", this, 'PreviewStringId.RibbonPreview_Parameters_Caption', "parameters", notEmpty);
                    var popupVisibleSwitch = ko.observable(false);
                    var popupVisible = ko.pureComputed({
                        read: function () {
                            return notEmpty() && popupVisibleSwitch();
                        },
                        write: function (newVal) {
                            return popupVisibleSwitch(newVal);
                        }
                    });
                    this.popupInfo = { visible: popupVisible, notEmpty: notEmpty };
                }
                Object.defineProperty(PreviewParametersViewModel.prototype, "_visibleParameters", {
                    get: function () {
                        return this._parameters.filter(function (p) { return p.visible; });
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
                    this[PreviewParameterHelper.getPrivatePropertyName(parameter.path)] = parameter.value;
                    var parameterPropertyName = PreviewParameterHelper.fixPropertyName(parameter.path);
                    if (parameter.isMultiValue || !parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) {
                        this[parameterPropertyName] = parameter.value;
                    }
                    else {
                        this[parameterPropertyName] = ko.pureComputed({
                            read: function () {
                                var parseValue = parameter.value();
                                if (parseValue === null || parseValue === undefined) {
                                    return parseValue;
                                }
                                if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                                    parseValue = parseInt(parseValue);
                                }
                                else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                                    parseValue = parseFloat(parseValue);
                                }
                                return parseValue;
                            },
                            write: function (newVal) {
                                var expandValue = newVal;
                                if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                                    expandValue = DevExpress.JS.Utils.integerValueConverter(expandValue, "0");
                                }
                                else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                                    expandValue = DevExpress.JS.Utils.floatValueConverter(expandValue, "0");
                                }
                                parameter.value(expandValue);
                            }
                        });
                    }
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
                            var selectedItems = (parameter.value() && parameter.value().selectedItems() || []).map(function (item) { return item.value; });
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
                    return parameterLookUpValues.filter(function (x) {
                        return _this._compareValues(_this.parameterHelper.getValueConverter(parameterType)(x.Value), value);
                    });
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
                        delete _this[PreviewParameterHelper.getPrivatePropertyName(usedParameter.path)];
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
                        this.popupInfo.visible(true);
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
                    var paths = this._parameters
                        .filter(function (param, index) {
                        return (_this._shouldProcessParameter(param) && param.isFilteredLookUpSettings && (index >= startIndex));
                    })
                        .map(function (x) { return x.path; });
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
                        this.parameterHelper.callbacks && this.parameterHelper.callbacks.parametersReset && this.parameterHelper.callbacks.parametersReset(this, this._parameters);
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
                        reportUrl: this._reportPreview.reportUrl,
                        requiredParameterPaths: requiredParameterPaths,
                        parameters: this.serializeParameters(),
                        timeZoneOffset: 0 - new Date().getTimezoneOffset()
                    };
                    this._getLookUpValueRequest(argsObject)
                        .done(this._getDoneGetLookUpValueHandler())
                        .fail(this._getFailGetLookUpValueHandler());
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
                processError: function (message, showForUser) { DevExpress.Designer.NotifyAboutWarning(message, showForUser); },
                processMessage: function (message, showForUser) { DevExpress.Designer.NotifyAboutWarning(message, showForUser); },
                processWarning: function (message, showForUser) { DevExpress.Designer.NotifyAboutWarning(message, showForUser); }
            };
            Preview.ZoomAutoBy = {
                None: 1,
                WholePage: 0,
                PageWidth: -1
            };
            Preview.generateGuid = function () {
                var getNewQuartet = function (i) {
                    return Math.floor((1 + Math.random()) * Math.pow(0x10000, i)).toString(16).substring(1);
                };
                return getNewQuartet(2) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(1) + '-' + getNewQuartet(3);
            };
            var ReportPreview = (function (_super) {
                __extends(ReportPreview, _super);
                function ReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, _callbacks, rtl) {
                    var _this = this;
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this);
                    this._callbacks = _callbacks;
                    this.getPreviewPageBrickProvider = function (handlerUri, documentId) {
                        var ignoreErrorPredicate = function () {
                            return _this._closeDocumentRequests[documentId];
                        };
                        return new Preview.PreviewPageBrickProvider(handlerUri, documentId, ignoreErrorPredicate);
                    };
                    this.predefinedZoomLevels = ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]);
                    this._pageWidth = ko.observable(818);
                    this._pageHeight = ko.observable(1058);
                    this._pageBackColor = ko.observable('');
                    this._currentReportId = ko.observable(null);
                    this._currentReportUrl = ko.observable(null);
                    this._currentDocumentId = ko.observable(null);
                    this._unifier = ko.observable("");
                    this._currentOperationId = ko.observable(null);
                    this._stopBuildRequests = {};
                    this._closeDocumentRequests = {};
                    this._editingFields = ko.observable([]);
                    this._startBuildOperationId = "";
                    this._editingValuesSubscriptions = [];
                    this._drillDownState = [];
                    this._sortingState = [];
                    this.rtlReport = ko.observable(false);
                    this.currentPage = ko.observable(null);
                    this.originalParametersInfo = ko.observable(null);
                    this.pageIndex = ko.observable(-1);
                    this.showMultipagePreview = ko.observable(false);
                    this.documentMap = ko.observable();
                    this.exportOptionsModel = ko.observable();
                    this.pageLoading = ko.observable(false);
                    this.documentBuilding = ko.observable(false);
                    this.progressBar = new Preview.ProgressViewModel();
                    this.pages = ko.observableArray([]).extend({ rateLimit: { timeout: 20, method: "notifyWhenChangesStop" } });
                    this.isAutoFit = ko.observable(true);
                    this.autoFitBy = ko.observable(Preview.ZoomAutoBy.WholePage);
                    this.exportDisabled = ko.pureComputed(function () {
                        var inProgress = _this.progressBar.inProgress();
                        var documentBuilding = _this.documentBuilding();
                        return _this.pageIndex() === -1 || inProgress || documentBuilding;
                    });
                    this._zoom = ko.observable(1);
                    this.zoom = ko.pureComputed({
                        read: function () {
                            var autoFitBy = _this.autoFitBy();
                            if (autoFitBy != Preview.ZoomAutoBy.None || _this._zoom() === 0) {
                                return autoFitBy;
                            }
                            return _this._zoom();
                        },
                        write: function (val) {
                            if (val > 0) {
                                _this._zoom(val);
                                _this.autoFitBy(Preview.ZoomAutoBy.None);
                            }
                            else {
                                _this.autoFitBy(val);
                            }
                        }
                    });
                    this.editingFieldsProvider = function () { return _this._editingFields(); };
                    this._currentPageText = ko.pureComputed(function () {
                        if (_this.pageIndex() === -1) {
                            return DevExpress.Designer.getLocalization('0 pages');
                        }
                        else {
                            var ofText = DevExpress.Designer.getLocalization('of');
                            return (_this.pageIndex() + 1) + " " + ofText + " " + _this.pages().length;
                        }
                    });
                    this._raiseOnSizeChanged = function () { _this.onSizeChanged() && _this.onSizeChanged()(); };
                    this.previewSize = ko.observable(0);
                    this.onSizeChanged = ko.observable();
                    this.previewVisible = ko.observable(false);
                    this.editingFieldsHighlighted = ko.observable(false);
                    this.canSwitchToDesigner = true;
                    this.allowURLsWithJSContent = false;
                    Preview.HandlerUri = handlerUri || Preview.HandlerUri;
                    this.previewHandlersHelper = previewHandlersHelper || new Preview.PreviewHandlersHelper(this);
                    this.requestWrapper = previewRequestWrapper || new Preview.PreviewRequestWrapper(null, _callbacks);
                    this.rtlViewer = rtl;
                    if (_callbacks) {
                        this.customProcessBrickClick = _callbacks.previewClick;
                    }
                    this.documentBuilding.subscribe(function (newVal) {
                        if (!newVal) {
                            var pageCount = _this.pages().length;
                            for (var i = 0; i < pageCount; i++) {
                                var page = _this.pages()[i];
                                if (!page.pageLoading()) {
                                    page.clearBricks();
                                }
                            }
                            if (_callbacks && _callbacks.documentReady) {
                                var documentId = _this._currentDocumentId();
                                documentId && _callbacks.documentReady(documentId, _this._currentReportId(), pageCount);
                            }
                        }
                    });
                    this._disposables.push(this._currentDocumentId.subscribe(function (newVal) {
                        _this._unifier(newVal ? Preview.generateGuid() : '');
                    }));
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
                    this._drillDownState.forEach(function (x) { return x.Key === drillDownKey && (x.Value = !x.Value); });
                    this.closeDocument();
                    this.progressBar.complete();
                    this.documentMap(null);
                    for (var i = this.pages().length - 1; i >= 0; i--) {
                        var page = this.pages()[i];
                        if (i > this.pageIndex()) {
                            this.pages.remove(page);
                        }
                        else {
                            page._clear();
                        }
                    }
                    this._startBuildRequest();
                };
                ReportPreview.prototype._applySorting = function (sortData) {
                    var _this = this;
                    (this._sortingState || []).forEach(function (x) {
                        if (x && x.Key === sortData.target) {
                            (x.Value || []).forEach(function (f) {
                                if (f && (f.fieldName === sortData.field))
                                    _this._changeSortOrder(f);
                                else
                                    f.sortOrder = Preview.ColumnSortOrder.None;
                            });
                        }
                    });
                };
                ReportPreview.prototype._appendSorting = function (sortData) {
                    var _this = this;
                    (this._sortingState || []).forEach(function (x) {
                        if (x && x.Key === sortData.target) {
                            (x.Value || []).forEach(function (f) { f && (f.fieldName === sortData.field) && _this._changeSortOrder(f); });
                            return;
                        }
                    });
                };
                ReportPreview.prototype._detachSorting = function (sortData) {
                    var skipProcessing = false;
                    (this._sortingState || []).forEach(function (x) {
                        if (x && x.Key === sortData.target) {
                            (x.Value || []).forEach(function (f) {
                                if (f && (f.fieldName === sortData.field)) {
                                    if (f.sortOrder === Preview.ColumnSortOrder.None)
                                        skipProcessing = true;
                                    else
                                        f.sortOrder = Preview.ColumnSortOrder.None;
                                }
                            });
                            return;
                        }
                    });
                    return skipProcessing;
                };
                ReportPreview.prototype._changeSortOrder = function (fieldInfo) {
                    fieldInfo.sortOrder = fieldInfo.sortOrder === Preview.ColumnSortOrder.Ascending ? Preview.ColumnSortOrder.Descending : Preview.ColumnSortOrder.Ascending;
                };
                ReportPreview.prototype._doSorting = function (sortData, shiftKey, ctrlKey) {
                    if (!sortData)
                        return;
                    if (ctrlKey) {
                        if (this._detachSorting(sortData))
                            return;
                    }
                    else if (shiftKey)
                        this._appendSorting(sortData);
                    else
                        this._applySorting(sortData);
                    this.closeDocument();
                    this.progressBar.complete();
                    this.documentMap(null);
                    this.pages().forEach(function (page) { return page._clear(); });
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
                    this._sortingState = [];
                    this.closeDocument();
                    this._editingFields([]);
                    this.documentMap(null);
                    this.pageIndex(-1);
                    this.pageLoading(true);
                    this.progressBar.complete();
                    this.pages([this.createPage(-1, this._pageWidth, this._pageHeight, this._zoom, this._currentDocumentId, this._unifier, this._pageBackColor.peek(), null, this.pageLoading)]);
                };
                ReportPreview.prototype.createPage = function (pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick) {
                    return new Preview.PreviewPage(pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick, this._editingFields);
                };
                ReportPreview.prototype._cleanTabInfo = function () {
                    this.exportOptionsModel(null);
                    this.documentMap(null);
                };
                ReportPreview.prototype._clearReportInfo = function () {
                    this._cleanTabInfo();
                    this.closeReport();
                    this.originalParametersInfo(null);
                };
                ReportPreview.prototype._export = function (args, actionUri, inlineResult) {
                    var _this = this;
                    var deffered = $.Deferred();
                    if (this._editingFields().length > 0 || Preview.AsyncExportApproach || this.exportOptionsModel().hasSensitiveData()) {
                        var self = this;
                        this.progressBar.text(DevExpress.Designer.getLocalization('Exporting the document...'));
                        this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel'));
                        this.progressBar.startProgress(function () { _this._currentOperationId(null); });
                        this.requestWrapper.getStartExportOperation(args)
                            .done(function (response) { self.previewHandlersHelper.doneStartExportHandler(deffered, inlineResult, response); })
                            .fail(function (error) { self.previewHandlersHelper.errorStartExportHandler(deffered, error); });
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
                    return function (brick, e) {
                        _self.goToPage(cyclePageIndex, true);
                        if (!brick)
                            return;
                        _self.pages()[cyclePageIndex].selectBrick("");
                        var shiftKey = !!(e && e.shiftKey);
                        var ctrlKey = !!(e && e.ctrlKey);
                        var brickNavigation = brick && brick.navigation;
                        var defaultHandler = function () {
                            if (brickNavigation) {
                                if (brickNavigation.drillDownKey && _self.reportId && _self._doDrillDown && _self._drillDownState.length > 0) {
                                    _self._doDrillDown(brickNavigation.drillDownKey);
                                }
                                else if (brickNavigation.sortData && _self.reportId && _self._doSorting && _self._sortingState.length > 0) {
                                    _self._doSorting(brickNavigation.sortData, shiftKey, ctrlKey);
                                }
                                if (brickNavigation.pageIndex >= 0) {
                                    var targetPage = _self.pages().filter(function (page) { return page.pageIndex === brickNavigation.pageIndex; })[0];
                                    if (targetPage) {
                                        _self.goToPage(brickNavigation.pageIndex);
                                        targetPage.selectBrick(brickNavigation.indexes);
                                    }
                                }
                                else {
                                    var validateUrl = function (url) {
                                        var isUrlString = typeof url === "string";
                                        if (isUrlString) {
                                            url = url.toLocaleLowerCase();
                                        }
                                        if (url === "empty") {
                                            return false;
                                        }
                                        return _self.allowURLsWithJSContent || (isUrlString && (url.indexOf("javascript:") === -1));
                                    };
                                    if (brickNavigation.url && validateUrl(brickNavigation.url)) {
                                        _self._safelyRunWindowOpen(brickNavigation.url, brickNavigation.target || "_blank");
                                    }
                                }
                            }
                        };
                        if (_self.customProcessBrickClick && _self.customProcessBrickClick(cyclePageIndex, brick, defaultHandler))
                            return;
                        defaultHandler();
                    };
                };
                ReportPreview.prototype.openReport = function (reportName) {
                    var _this = this;
                    this._clearReportInfo();
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
                ReportPreview.prototype.drillThrough = function (customData, closeCurrentReport) {
                    var _this = this;
                    if (closeCurrentReport === void 0) { closeCurrentReport = true; }
                    var deferred = $.Deferred();
                    this.requestWrapper.drillThrough(customData).done(function (response) {
                        if (closeCurrentReport) {
                            _this._clearReportInfo();
                            _this.initialize(deferred.promise());
                        }
                        deferred.resolve(response);
                    }).fail(function (error) {
                        deferred.reject(error);
                        _this._processError(DevExpress.Designer.getLocalization("Drill through operation failed"), error);
                    });
                    return deferred.promise();
                };
                ReportPreview.prototype.initialize = function (initializeDataPromise) {
                    var _this = this;
                    this._currentReportId(null);
                    this._currentReportUrl(null);
                    this._currentDocumentId(null);
                    this._initialize();
                    initializeDataPromise.done(function (previewInitialize) {
                        if (previewInitialize && !previewInitialize.error && (previewInitialize.reportId || previewInitialize.documentId)) {
                            _this._currentReportId(previewInitialize.reportId);
                            _this._currentReportUrl(previewInitialize.reportUrl);
                            _this._currentDocumentId(previewInitialize.documentId);
                            _this.rtlReport(previewInitialize.rtlReport);
                            var pageSettings = previewInitialize.pageSettings;
                            if (pageSettings) {
                                if (pageSettings.height)
                                    _this._pageHeight(pageSettings.height);
                                if (pageSettings.width)
                                    _this._pageWidth(pageSettings.width);
                                _this._pageBackColor((pageSettings.color && _this.readerMode) ? 'rgba(' + pageSettings.color + ')' : '');
                            }
                            var deserializedExportOptions = _this._deserializeExportOptions(previewInitialize.exportOptions);
                            _this.exportOptionsModel(deserializedExportOptions);
                            _this.originalParametersInfo(previewInitialize.parametersInfo);
                            if (previewInitialize.documentId) {
                                var fireDocumentReady = function (documentId) {
                                    if (_this._callbacks && _this._callbacks.documentReady) {
                                        _this._callbacks.documentReady(documentId, _this.reportId, _this.pages.peek().length);
                                    }
                                };
                                var doGetBuildStatusFunc = _this.getDoGetBuildStatusFunc(fireDocumentReady);
                                doGetBuildStatusFunc(previewInitialize.documentId);
                            }
                        }
                        else {
                            _this.pageLoading(false);
                            _this._processError(DevExpress.Designer.getLocalization("The report preview initialization has failed"), previewInitialize && previewInitialize.error);
                        }
                    }).fail(function (error) {
                        _this.removeEmptyPages();
                    });
                    return initializeDataPromise;
                };
                ReportPreview.prototype._deserializeExportOptions = function (exportOptionsString, isMerged) {
                    var jsonModel = exportOptionsString && JSON.parse(exportOptionsString);
                    return (!this.reportId || isMerged) ? new DevExpress.Designer.Report.ExportOptionsMergedPreview(jsonModel) : new DevExpress.Designer.Report.ExportOptionsPreview(jsonModel);
                };
                ReportPreview.prototype.deactivate = function () {
                    this._initialize();
                    this._cleanTabInfo();
                    this.closeReport();
                    this._currentDocumentId(null);
                    this._currentReportId(null);
                    this._currentReportUrl(null);
                };
                ReportPreview.prototype.startBuild = function () {
                    this._initialize();
                    return this._startBuildRequest();
                };
                ReportPreview.prototype._initializeStartBuild = function () {
                    var _this = this;
                    if (this.documentBuilding() || this._startBuildOperationId) {
                        return false;
                    }
                    this._startBuildOperationId = Preview.generateGuid();
                    this._currentDocumentId(null);
                    this.progressBar.text(DevExpress.Designer.getLocalization('Document is building...'));
                    this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel'));
                    this.progressBar.startProgress(function () { _this.documentBuilding(false); }, function () { _this.stopBuild(); });
                    this.documentBuilding(true);
                    return true;
                };
                ReportPreview.prototype._startBuildRequest = function () {
                    var _this = this;
                    if (!this._initializeStartBuild()) {
                        return null;
                    }
                    var deffered = $.Deferred();
                    this.requestWrapper.startBuildRequest()
                        .done(function (response) { _this.previewHandlersHelper.doneStartBuildHandler(deffered, response); })
                        .fail(function (error) { _this.previewHandlersHelper.errorStartBuildHandler(deffered, error, _this._startBuildOperationId); });
                    return deffered.promise();
                };
                ReportPreview.prototype.getExportStatus = function (operationId) {
                    var _this = this;
                    var deffered = $.Deferred();
                    setTimeout(function () {
                        _this.requestWrapper.getExportStatusRequest(operationId)
                            .done(function (response) { _this.previewHandlersHelper.doneExportStatusHandler(deffered, operationId, response); })
                            .fail(function (error) { _this.previewHandlersHelper.errorExportStatusHandler(deffered, error); });
                    }, 250);
                    return deffered.promise();
                };
                ReportPreview.prototype.getExportResult = function (operationId, inlineDisposition) {
                    var arg = encodeURIComponent(JSON.stringify({ id: operationId, inlineResult: !!inlineDisposition }));
                    var newWindow = this._safelyRunWindowOpen(Preview.HandlerUri + "?actionKey=getExportResult&arg=" + arg);
                };
                ReportPreview.prototype.getBuildStatus = function (documentId) {
                    var _this = this;
                    var deffered = $.Deferred();
                    setTimeout(function () {
                        var ignorePredicate = function () { return _this._closeDocumentRequests[documentId]; };
                        _this.requestWrapper.getBuildStatusRequest(documentId, ignorePredicate)
                            .done(function (response) { _this.previewHandlersHelper.doneGetBuildStatusHandler(deffered, documentId, response, ignorePredicate); })
                            .fail(function (error) { _this.previewHandlersHelper.errorGetBuildStatusHandler(deffered, error, ignorePredicate); });
                    }, 250);
                    return deffered.promise();
                };
                ReportPreview.prototype.getDoGetBuildStatusFunc = function (onComplete) {
                    var preview = this;
                    var doGetBuildStatus = function (documentId) {
                        var promise = preview.getBuildStatus(documentId);
                        promise.done(function (result) {
                            if (result && result.requestAgain && !preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                                doGetBuildStatus(documentId);
                            }
                            else {
                                try {
                                    preview._unifier(Preview.generateGuid());
                                    if (result.error || !result.requestAgain && !result.pageCount) {
                                        preview.removeEmptyPages(!result.pageCount);
                                        var pageCount = preview.pages().length;
                                        if (!pageCount) {
                                            preview.pageIndex(-1);
                                        }
                                        else if (preview.pageIndex.peek() > pageCount) {
                                            preview.goToPage(pageCount - 1);
                                        }
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
                                        isCurrentPage && page._setPageImgSrc(documentId, preview._unifier(), preview._zoom());
                                    });
                                }
                                finally {
                                    preview.progressBar.complete();
                                    onComplete && onComplete(documentId);
                                    setTimeout(preview._raiseOnSizeChanged, 1000);
                                }
                            }
                        });
                    };
                    return doGetBuildStatus;
                };
                ReportPreview.prototype.getDocumentData = function (documentId) {
                    var _this = this;
                    var ignoreErrorPredicate = function () { return _this._closeDocumentRequests[documentId]; };
                    this.requestWrapper.getDocumentData(documentId, ignoreErrorPredicate)
                        .done(function (response) {
                        if (!response) {
                            return;
                        }
                        _this._drillDownState = response.drillDownKeys || [];
                        _this._sortingState = response.sortingState || [];
                        if (response.canPerformContinuousExport === false && _this.reportId) {
                            var deserializedExportOptions = _this._deserializeExportOptions(response.exportOptions || {}, true);
                            _this.exportOptionsModel(deserializedExportOptions);
                        }
                        _this.documentMap(response.documentMap);
                        _this._editingValuesSubscriptions.forEach(function (item) { return item.dispose(); });
                        _this._editingValuesSubscriptions = [];
                        _this._editingFields((response.editingFields || []).map(function (item, index) {
                            var field = new Preview.EditingField(item, index, _this.requestWrapper);
                            if (_this.editingFieldChanged) {
                                field.editingFieldChanged = _this.editingFieldChanged;
                            }
                            return field;
                        }));
                    })
                        .fail(function (error) {
                        if (!ignoreErrorPredicate())
                            _this._processError(DevExpress.Designer.getLocalization("Cannot obtain additional document data for the current document"), error);
                    });
                };
                ReportPreview.prototype.exportDocumentTo = function (format, inlineResult) {
                    if (!this._currentDocumentId())
                        return;
                    var serializedExportOptions = this.exportOptionsModel() ? JSON.stringify(new DevExpress.JS.Utils.ModelSerializer().serialize(this.exportOptionsModel())) : null;
                    var args = encodeURIComponent(JSON.stringify({
                        documentId: this._currentDocumentId(),
                        exportOptions: serializedExportOptions,
                        format: format,
                        inlineResult: inlineResult,
                        editingFieldValues: this._editingFields && this._editingFields().map(function (item) { return item.editValue(); })
                    }));
                    this._export(args, Preview.HandlerUri, inlineResult);
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
                        format: "printpdf",
                        inlineResult: true,
                        editingFieldValues: this._editingFields && this._editingFields().map(function (item) { return item.editValue(); })
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
                    this.pages.peek().forEach(function (page) {
                        var visible = page.pageIndex === pageIndex;
                        page.active(visible);
                        page.isClientVisible(visible);
                    });
                    this.pageIndex(pageIndex);
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
                        currentBrick.bricks && currentBrick.bricks.length != 0 && currentBrick.bricks.forEach(function (innerBrick) { getActiveBricks(innerBrick, resultArray); });
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
                        row[activeBrick.col] = activeBrick.text();
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
                ReportPreview.prototype._processError = function (error, jqXHR, showForUser) {
                    if (showForUser === void 0) { showForUser = true; }
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
                Object.defineProperty(ReportPreview.prototype, "reportUrl", {
                    get: function () {
                        return this._currentReportUrl();
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
            function updatePreviewZoomWithAutoFit(width, height, element, autoFitBy) {
                if (autoFitBy === void 0) { autoFitBy = Preview.ZoomAutoBy.WholePage; }
                var $element = $(element);
                var $previewWrapper = $element.closest(".dxrd-preview-wrapper");
                var $preview = $element.closest(".dxrd-preview");
                if ($previewWrapper.length === 0 || $preview.length === 0) {
                    return 1;
                }
                var rightAreaWidth = $preview.find(".dxrd-right-panel").outerWidth() + $preview.find(".dxrd-right-tabs").outerWidth();
                var surfaceWidth = $preview.width() - (rightAreaWidth > 0 ? (rightAreaWidth + 10) : 0);
                var topAreaHeight = parseFloat($previewWrapper.css("top").split("px")[0]);
                var designerHeight = $preview.outerHeight();
                var surfaceHeight = designerHeight - topAreaHeight;
                if (autoFitBy === Preview.ZoomAutoBy.PageWidth) {
                    return (surfaceWidth - 12 - (rightAreaWidth ? 0 : 10)) / width;
                }
                var heightZoom = surfaceHeight / (height + 6);
                var widthZoom = surfaceWidth / width;
                return Math.min(heightZoom, widthZoom);
            }
            Preview.updatePreviewZoomWithAutoFit = updatePreviewZoomWithAutoFit;
            Preview.PreviewElements = {
                Toolbar: 'dxrd-preview-toolbar-scrollable',
                Surface: 'dxrdp-surface',
                RightPanel: 'dxrd-right-panel-template-base',
            };
            function createDesktopPreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, rtl) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                var previewWrapper = new Preview.PreviewRequestWrapper(null, callbacks), reportPreview = new ReportPreview(handlerUri, previewWrapper, undefined, callbacks, rtl), searchModel = new Preview.SearchViewModel(reportPreview);
                reportPreview.editingFieldChanged = callbacks && callbacks.editingFieldChanged;
                var documentMapModel = new Preview.DocumentMapModel(reportPreview);
                var parametersModel = new Preview.PreviewParametersViewModel(reportPreview, new Preview.PreviewParameterHelper(parametersInfo && parametersInfo.knownEnums, callbacks));
                var exportModel = new Preview.ExportOptionsModel(reportPreview);
                reportPreview.canSwitchToDesigner = !previewVisible;
                reportPreview.allowURLsWithJSContent = allowURLsWithJSContent;
                previewWrapper.initialize(reportPreview, parametersModel, searchModel);
                var tabPanel = new DevExpress.Designer.TabPanel([
                    parametersModel.tabInfo,
                    exportModel.tabInfo,
                    searchModel.tabInfo,
                    documentMapModel.tabInfo
                ], true, rtl);
                tabPanel.collapsed(true);
                var globalActionProviders = ko.observableArray([new Preview.PreviewActions(reportPreview), exportModel, searchModel, new Preview.PreviewDesignerActions(reportPreview)]);
                var actionLists = new Preview.ActionLists(reportPreview, globalActionProviders, callbacks && callbacks.customizeActions, reportPreview.previewVisible);
                reportPreview.previewVisible(previewVisible);
                var designerModel = {
                    rootStyle: { 'dxrd-preview': true },
                    reportPreview: reportPreview,
                    parametersModel: parametersModel,
                    exportModel: exportModel,
                    searchModel: searchModel,
                    documentMapModel: documentMapModel,
                    tabPanel: tabPanel,
                    actionLists: actionLists,
                    rtl: reportPreview.rtlViewer
                };
                designerModel.parts = [
                    { templateName: Preview.PreviewElements.Toolbar, model: { actionLists: actionLists } },
                    { templateName: Preview.PreviewElements.Surface, model: designerModel.reportPreview },
                    { templateName: Preview.PreviewElements.RightPanel, model: designerModel }
                ];
                callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
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
                if (element && !reportPreview.canSwitchToDesigner && applyBindings) {
                    $(element).children().remove();
                    ko.applyBindings(designerModel, element);
                }
                designerModel.GetParametersModel = function () {
                    return designerModel.parametersModel;
                };
                designerModel.OpenReport = function (reportName) {
                    designerModel.reportPreview.openReport(reportName);
                };
                designerModel.Print = function (pageIndex) {
                    return designerModel.reportPreview.printDocument(pageIndex);
                };
                designerModel.ExportTo = function (format, inlineResult) {
                    var preview = designerModel.reportPreview;
                    if (!preview.exportDisabled()) {
                        preview.exportDocumentTo(format || 'pdf', inlineResult);
                    }
                },
                    designerModel.GetCurrentPageIndex = function () {
                        return designerModel.reportPreview.pageIndex();
                    },
                    designerModel.GoToPage = function (pageIndex) {
                        designerModel.reportPreview.goToPage(pageIndex);
                    },
                    designerModel.Close = function () {
                        designerModel.reportPreview.deactivate();
                    },
                    designerModel.ResetParameters = function () {
                        var parametersModel = designerModel.parametersModel;
                        parametersModel && designerModel.parametersModel.restore();
                    },
                    designerModel.StartBuild = function () {
                        var parametersModel = designerModel.parametersModel;
                        parametersModel && designerModel.parametersModel.submit();
                    };
                return designerModel;
            }
            Preview.createDesktopPreview = createDesktopPreview;
            function createPreview(element, callbacks, localization, parametersInfo, handlerUri, previewVisible, rtl, isMobile, mobileModeSettings, applyBindings, allowURLsWithJSContent) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                DevExpress.JS.Localization.addCultureInfo({
                    messages: localization
                });
                DevExpress["config"]({ rtlEnabled: !!rtl });
                if (isMobile) {
                    return Preview.createMobilePreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, mobileModeSettings);
                }
                else {
                    return createDesktopPreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, rtl);
                }
            }
            Preview.createPreview = createPreview;
            function createAndInitPreviewModel(viewerModel, element, callbacks, applyBindings) {
                DevExpress.Designer.initGlobalize(viewerModel);
                var previewModel = DevExpress.Report.Preview.createPreview(element, callbacks, viewerModel.localization, viewerModel.parametersInfo, viewerModel.handlerUri, undefined, viewerModel.rtl, viewerModel.isMobile, viewerModel.mobileModeSettings, applyBindings, viewerModel.allowURLsWithJSContent);
                if (viewerModel.reportId || viewerModel.documentId) {
                    previewModel.reportPreview.initialize($.Deferred().resolve(viewerModel));
                }
                return previewModel;
            }
            Preview.createAndInitPreviewModel = createAndInitPreviewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="sources/metadata.ts" />
/// <reference path="sources/exportoptions.ts" />
/// <reference path="sources/preview-page.ts" />
/// <reference path="sources/preview-search.ts" />
/// <reference path="sources/preview-document-map.ts" />
/// <reference path="sources/preview-parameters.ts" />
/// <reference path="sources/preview.ts" /> 
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
                HightlightEditingFields: "dxxrp-highlight-editing-fields",
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
                        text: "Design",
                        textId: 'ReportStringId.RepTabCtl_Designer',
                        imageClassName: "dxrd-image-design",
                        disabled: ko.observable(false),
                        visible: reportPreview.canSwitchToDesigner,
                        hotKey: { ctrlKey: true, keyCode: 68 },
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
            var ActionLists = (function (_super) {
                __extends(ActionLists, _super);
                function ActionLists(reportPreview, globalActionProviders, customizeActions, enabled) {
                    _super.call(this, enabled);
                    this._reportPreview = reportPreview;
                    this.globalActionProviders = globalActionProviders;
                    this.toolbarItems = ko.computed(function () {
                        var globalActions = [];
                        globalActionProviders().forEach(function (actionProvider) {
                            globalActions.push.apply(globalActions, actionProvider.getActions(reportPreview));
                        });
                        customizeActions && customizeActions(globalActions);
                        return globalActions;
                    });
                }
                ActionLists.prototype.processShortcut = function (actions, e) {
                    if (this.shouldIgnoreProcessing(e))
                        return;
                    _super.prototype.processShortcut.call(this, actions, e);
                };
                return ActionLists;
            })(DevExpress.Designer.ActionListsBase);
            Preview.ActionLists = ActionLists;
            var PreviewActions = (function () {
                function PreviewActions(reportPreview) {
                    this.actions = [];
                    var zoomStep = ko.observable(0.01);
                    var printDisabled = reportPreview.exportDisabled;
                    this.actions.push({
                        id: Preview.ActionId.FirstPage,
                        text: DevExpress.Designer.getLocalization("First Page"),
                        imageClassName: "dxrd-image-preview-first",
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: true, keyCode: 37 },
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
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: false, keyCode: 37 },
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
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
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
                        itemTemplate: function (value) { return value.text; },
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
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: false, keyCode: 39 },
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
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: true, keyCode: 39 },
                        clickAction: function () {
                            if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                                reportPreview.goToPage(reportPreview.pages().length - 1);
                            }
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.MultipageToggle,
                        text: DevExpress.Designer.getLocalization("Toggle Multipage Mode"),
                        imageClassName: ko.pureComputed(function () { return reportPreview.showMultipagePreview() ? "dxrd-image-preview-single-page" : "dxrd-image-preview-multipage"; }),
                        disabled: ko.observable(false),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: true, keyCode: 77 },
                        clickAction: function () {
                            var zoom = reportPreview._zoom();
                            reportPreview.showMultipagePreview(!reportPreview.showMultipagePreview());
                            reportPreview.zoom(zoom);
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomOut,
                        text: DevExpress.Designer.getLocalization("Zoom Out", "DevExpress.XtraPrinting.PrintingSystemCommand.ZoomOut"),
                        imageClassName: "dxrd-image-zoomout",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: zoomStep,
                        hotKey: { ctrlKey: false, keyCode: 109 },
                        clickAction: function () {
                            var currentZoom = reportPreview.zoom();
                            var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                            reportPreview.zoom(Math.max(zoomLevel - zoomStep(), 0.01));
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomSelector,
                        text: DevExpress.Designer.getLocalization('Zoom to Whole Page'),
                        imageClassName: "dxrd-image-zoom",
                        disabled: ko.observable(false),
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: 187 },
                        clickAction: function () {
                            reportPreview.zoom(0);
                        },
                        templateName: "dxrd-zoom-autofit-select-template",
                        displayExpr: function (val) {
                            if (val === Preview.ZoomAutoBy.PageWidth) {
                                return DevExpress.Designer.getLocalization('Page Width');
                            }
                            else if (Math.round(val * 100) === 0) {
                                return DevExpress.Designer.getLocalization('Whole Page');
                            }
                            else {
                                return Math.round((val || reportPreview.zoom.peek()) * 100) + '%';
                            }
                        },
                        zoom: reportPreview.zoom,
                        zoomLevels: reportPreview.predefinedZoomLevels,
                        zoomItems: ko.pureComputed(function () {
                            var items = reportPreview.predefinedZoomLevels.slice(0);
                            if (reportPreview.showMultipagePreview() === false && items.indexOf(0) === -1) {
                                items.push(Preview.ZoomAutoBy.PageWidth);
                                items.push(Preview.ZoomAutoBy.WholePage);
                            }
                            return items;
                        })
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomIn,
                        text: DevExpress.Designer.getLocalization("Zoom In", "DevExpress.XtraPrinting.PrintingSystemCommand.ZoomIn"),
                        imageClassName: "dxrd-image-zoomin",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: zoomStep,
                        hotKey: { ctrlKey: false, keyCode: 107 },
                        clickAction: function () {
                            var currentZoom = reportPreview.zoom();
                            var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                            reportPreview.zoom(Math.min(zoomLevel + zoomStep(), 10));
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.HightlightEditingFields,
                        text: DevExpress.Designer.getLocalization("Highlight Editing Fields"),
                        imageClassName: "dxrp-image-hightlight-editing-fields",
                        disabled: ko.pureComputed(function () { return reportPreview.editingFieldsProvider().length < 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        selected: ko.pureComputed(function () { return reportPreview.editingFieldsHighlighted(); }),
                        hotKey: { ctrlKey: true, keyCode: 72 },
                        clickAction: function () {
                            reportPreview.editingFieldsHighlighted(!reportPreview.editingFieldsHighlighted());
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.Print,
                        text: DevExpress.Designer.getLocalization("Print"),
                        imageClassName: "dxrd-image-print",
                        hasSeparator: true,
                        disabled: printDisabled,
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: 80 },
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
            var EditingField = (function () {
                function EditingField(model, index, htmlProvider) {
                    var _this = this;
                    this._needToUseHtml = false;
                    this._index = -1;
                    this._model = model;
                    this._index = index;
                    this.readOnly = ko.observable(model.readOnly);
                    this.modelValue = ko.observable(model.editValue);
                    this.editValue = ko.computed({
                        read: function () {
                            return _this.modelValue();
                        },
                        write: function (newVal) {
                            var oldVal = _this.modelValue();
                            _this.modelValue(newVal);
                            var val = _this.editingFieldChanged(_this, oldVal, newVal);
                            val = val == null ? newVal : val;
                            if (val !== oldVal) {
                                _this._refreshHtmlValue(val);
                            }
                            if (val !== newVal) {
                                _this.modelValue(val);
                                _this._editorValue(val);
                            }
                        }
                    });
                    this._editorValue = ko.observable(model.editValue);
                    this.htmlValue = ko.observable(model.htmlValue);
                    this._htmlProvider = htmlProvider;
                }
                EditingField.prototype._refreshHtmlValue = function (newValue) {
                    var _this = this;
                    this.htmlValue(null);
                    if (this._needToUseHtml) {
                        this._htmlProvider.getEditingFieldHtml(newValue, this._index).done(function (html) {
                            _this.htmlValue(html);
                        });
                    }
                };
                EditingField.prototype.editingFieldChanged = function (field, oldVal, newVal) {
                    return newVal;
                };
                EditingField.prototype.editorName = function () { return this._model.editorName; };
                EditingField.prototype.id = function () { return this._model.id; };
                EditingField.prototype.groupID = function () { return this._model.groupID; };
                EditingField.prototype.pageIndex = function () { return this._model.pageIndex; };
                EditingField.prototype.type = function () { return this._model.type; };
                EditingField.prototype.model = function () {
                    return $.extend({}, this._model, {
                        readOnly: this.readOnly.peek(),
                        editValue: this.editValue.peek(),
                        htmlValue: this.htmlValue.peek(),
                    });
                };
                EditingField.prototype.createViewModel = function (zoom, pageWidth, pageHeight, editingFieldsProvider, bounds) {
                    if (this._model.type === "check") {
                        return new Preview.CheckEditingFieldViewModel(this, pageWidth, pageHeight, zoom, editingFieldsProvider);
                    }
                    else if (this._model.type === "text") {
                        this._needToUseHtml = bounds.height !== this._model.bounds.height || !!this._model.brickOptions.formatString;
                        if (!this._needToUseHtml) {
                            this.htmlValue(null);
                        }
                        return new Preview.TextEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
                    }
                    else if (this._model.type === "charactercomb") {
                        return new Preview.CharacterCombEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
                    }
                };
                return EditingField;
            })();
            Preview.EditingField = EditingField;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        Report.Categories = {
            Numeric: function () { return "Numeric"; },
            DateTime: function () { return "Date-Time"; },
            Letters: function () { return "Letters"; }
        };
        function getCharFromKeyCode(e) {
            var code = 0;
            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                code = e.keyCode;
            }
            else if (e.ctrlKey === false) {
                code = e.charCode;
            }
            if (code) {
                return String.fromCharCode(code);
            }
        }
        var EditingFieldExtensions = (function () {
            function EditingFieldExtensions() {
                this._editors = {};
            }
            EditingFieldExtensions.instance = function () {
                if (!EditingFieldExtensions._instance) {
                    EditingFieldExtensions._instance = new EditingFieldExtensions();
                    EditingFieldExtensions._instance._registerStandartEditors();
                }
                return EditingFieldExtensions._instance;
            };
            EditingFieldExtensions.prototype._registerStandartEditors = function () {
                EditingFieldExtensions.registerRegExpEditor("Integer", "Integer", Report.Categories.Numeric(), /^-?\d*$/, /^-?\d+$/, "0");
                EditingFieldExtensions.registerRegExpEditor("IntegerPositive", "Integer Positive", Report.Categories.Numeric(), /^\d+$/, /^\d+$/, "0");
                EditingFieldExtensions.registerRegExpEditor("FixedPoint", "Fixed - Point", Report.Categories.Numeric(), /^-?(\d+([\.,]?\d*)?)?$/, /^-?\d+([\.,]?\d*)?$/, "0");
                EditingFieldExtensions.registerRegExpEditor("FixedPointPositive", "Fixed - Point Positive", Report.Categories.Numeric(), /^\d+([\.,]?\d*)?$/, /^\d+([\.,]?\d*)?$/, "0");
                EditingFieldExtensions.registerEditor("Date", "Date", Report.Categories.DateTime(), {
                    onPreRender: function (data) {
                        if (!(data.options.value() instanceof Date)) {
                            data.options.value(Globalize.parseDate(data.options.value()) || new Date(Date.now()));
                        }
                    },
                    onHideEditor: function (field) {
                        field.editValue(Globalize["formatDate"](field._editorValue()));
                    }
                }, "dxrp-editing-field-datetime");
                EditingFieldExtensions.registerRegExpEditor("OnlyLatinLetters", "Only Latin Letters", Report.Categories.Letters(), /^[a-zA-Z]*$/, /^[a-zA-Z]*$/, "");
            };
            EditingFieldExtensions.registerEditor = function (name, displayName, category, options, template) {
                EditingFieldExtensions.instance()._editors[name] = {
                    name: name,
                    displayName: displayName,
                    category: category,
                    options: options,
                    template: template
                };
            };
            EditingFieldExtensions.registerMaskEditor = function (editorID, displayName, category, mask) {
                EditingFieldExtensions.registerEditor(editorID, displayName, category, { mask: mask });
            };
            EditingFieldExtensions.registerRegExpEditor = function (editorID, displayName, category, regExpEditing, regExpFinal, defaultVal) {
                EditingFieldExtensions.registerEditor(editorID, displayName, category, DevExpress.JS.Widgets.ValueEditorHelper.getValueEditorOptions(regExpEditing, function (val) { return regExpFinal.test(val); }, defaultVal));
            };
            EditingFieldExtensions.unregisterEditor = function (editorID) {
                delete EditingFieldExtensions.instance()._editors[editorID];
            };
            EditingFieldExtensions.prototype.categories = function () {
                var categories = [];
                for (var p in this._editors) {
                    var category = this._editors[p].category;
                    if (categories.indexOf(category) === -1) {
                        categories.push(category);
                    }
                }
                return categories;
            };
            EditingFieldExtensions.prototype.editors = function () {
                var _this = this;
                return Object.keys(this._editors).map(function (key) { return _this._editors[key]; });
            };
            EditingFieldExtensions.prototype.editorsByCategory = function (category) {
                var editors = [];
                for (var p in this._editors) {
                    if (this._editors[p].category === category) {
                        editors.push(this._editors[p]);
                    }
                }
                return editors;
            };
            EditingFieldExtensions.prototype.editor = function (editorID) {
                return this._editors[editorID];
            };
            return EditingFieldExtensions;
        })();
        Report.EditingFieldExtensions = EditingFieldExtensions;
        function getCaretPosition(el) {
            var start = -1, end = -1, normalizedValue, range, textInputRange, len, endRange;
            try {
                if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
                    start = el.selectionStart;
                    end = el.selectionEnd;
                }
                else if (document["selection"]) {
                    range = document["selection"].createRange();
                    if (range && range.parentElement() == el) {
                        len = el.value.length;
                        normalizedValue = el.value.replace(/\r\n/g, "\n");
                        textInputRange = el.createTextRange();
                        textInputRange.moveToBookmark(range.getBookmark());
                        endRange = el.createTextRange();
                        endRange.collapse(false);
                        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                            start = end = len;
                        }
                        else {
                            start = -textInputRange.moveStart("character", -len);
                            start += normalizedValue.slice(0, start).split("\n").length - 1;
                            if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                                end = len;
                            }
                            else {
                                end = -textInputRange.moveEnd("character", -len);
                                end += normalizedValue.slice(0, end).split("\n").length - 1;
                            }
                        }
                    }
                }
            }
            catch (e) {
            }
            return {
                start: start,
                end: end
            };
        }
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            (function (CheckState) {
                CheckState[CheckState["Unchecked"] = 0] = "Unchecked";
                CheckState[CheckState["Checked"] = 1] = "Checked";
                CheckState[CheckState["Indeterminate"] = 2] = "Indeterminate";
            })(Preview.CheckState || (Preview.CheckState = {}));
            var CheckState = Preview.CheckState;
            ;
            var TextEditingFieldViewModel = (function () {
                function TextEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
                    var _this = this;
                    this.template = "dxrp-editing-field-container";
                    this.htmlValue = function () { return _this.field.htmlValue(); };
                    this.wordWrap = true;
                    this.active = ko.observable(false);
                    var brickStyle = field.model().brickOptions;
                    var style = { rtl: function () { return brickStyle.rtl; } };
                    new DevExpress.JS.Utils.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), DevExpress.Designer.Report.brickStyleSerializationsInfo);
                    var cssCalculator = new DevExpress.Designer.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
                    var padding = cssCalculator.paddingsCss();
                    var verticalPadding = parseInt(padding["paddingTop"]) + parseInt(padding["paddingBottom"]);
                    if (cssCalculator.borderCss()["borderTop"] !== "none") {
                        verticalPadding += style["borderWidth"]();
                    }
                    if (cssCalculator.borderCss()["borderBottom"] !== "none") {
                        verticalPadding += style["borderWidth"]();
                    }
                    this.breakOffsetStyle = function () {
                        return {
                            top: bounds.offset.y * -100 / bounds.height + "%",
                            left: bounds.offset.x * -100 / bounds.width + "%"
                        };
                    };
                    this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
                    this.zoom = zoom;
                    this.field = field;
                    if (brickStyle.wordWrap != undefined) {
                        this.wordWrap = brickStyle.wordWrap;
                    }
                    this.hideEditor = function () {
                        _this.active(false);
                        setTimeout(function () {
                            if (!!editorOptions.onHideEditor) {
                                editorOptions.onHideEditor(field);
                            }
                            else {
                                field.editValue(field._editorValue());
                            }
                        }, 1);
                    };
                    var editor = DevExpress.Report.EditingFieldExtensions.instance().editor(field.editorName());
                    var editorOptions = $.extend(true, {}, editor && editor.options || {});
                    this.data = {
                        value: field._editorValue,
                        hideEditor: this.hideEditor,
                        textStyle: this.textStyle,
                        options: editorOptions
                    };
                    var isCustomEditor = !!(editor && editor.template && editor.template !== "dxrp-editing-field-datetime");
                    if (!isCustomEditor) {
                        var self = this;
                        this.data.options = $.extend(true, {}, editorOptions, {
                            value: field._editorValue,
                            onFocusOut: function (e) {
                                self.hideEditor();
                            }
                        });
                    }
                    if (editor) {
                        this.editorTemplate = editor.template || "dxrp-editing-field-mask";
                    }
                    else {
                        this.editorTemplate = "dxrp-editing-field-text";
                    }
                    this.containerStyle = ko.pureComputed(function () {
                        return $.extend({
                            width: bounds.width + "px",
                            height: bounds.height + "px",
                            "line-height": (bounds.height - verticalPadding) + "px",
                            top: bounds.top * 100 / pageHeight + "%",
                            left: bounds.left * 100 / pageWidth + "%"
                        }, _this.active() || !_this.htmlValue() ? cssCalculator.borderCss() : { border: 'none' }, isCustomEditor && _this.active() || (!!_this.htmlValue() && !_this.active()) ? { padding: 0 } : cssCalculator.paddingsCss(), { "border-color": "transparent" });
                    });
                    this.borderStyle = ko.pureComputed(function () {
                        if (style["borderWidth"]() > 0 && style["borders"]() !== "None") {
                            return {
                                left: "-" + style["borderWidth"]() + "px",
                                top: "-" + style["borderWidth"]() + "px",
                                paddingRight: (style["borderWidth"]() * 2 - 2) + "px",
                                paddingBottom: (style["borderWidth"]() * 2 - 2) + "px"
                            };
                        }
                    });
                }
                TextEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
                    if (this.field.readOnly()) {
                        return;
                    }
                    var data = viewModel.data;
                    if (data && data.options && data.options.onPreRender) {
                        data.options.onPreRender(this.data);
                    }
                    this.active(true);
                    var elementFocused = false;
                    if (viewModel.options && viewModel.options.onEditorShown) {
                        elementFocused = viewModel.options.onEditorShown(this.data, $(e && e.currentTarget).first().get(0));
                    }
                    if (!elementFocused) {
                        $(e && e.currentTarget).find(":focusable").eq(0).focus();
                    }
                };
                return TextEditingFieldViewModel;
            })();
            Preview.TextEditingFieldViewModel = TextEditingFieldViewModel;
            ko.bindingHandlers["childStyle"] = {
                init: function (element, valueAccessor) {
                    var values = valueAccessor();
                    $(element).find(values.selector).css(values.style);
                }
            };
            var CheckEditingFieldViewModel = (function () {
                function CheckEditingFieldViewModel(field, pageWidth, pageHeight, zoom, editingFieldsProvider) {
                    this.focused = ko.observable(false);
                    this._editingFieldsProvider = editingFieldsProvider;
                    this.template = "dxrp-editing-field-checkbox";
                    this.field = field;
                    this.zoom = zoom;
                    var bounds = this.field.model().bounds;
                    var checkBounds = this.field.model().brickOptions.checkBoxBounds;
                    var rtl = this.field.model().brickOptions.rtlLayout;
                    this.containerStyle = function () {
                        return {
                            height: bounds.height + "px",
                            width: bounds.width + "px",
                            top: bounds.top * 100 / pageHeight + "%",
                            left: bounds.left * 100 / pageWidth + "%"
                        };
                    };
                    this.checkStyle = function () {
                        var result = {
                            height: checkBounds.height + "px",
                            width: checkBounds.width + "px",
                            top: checkBounds.top + "px",
                            left: (rtl ? (bounds.width - checkBounds.left - checkBounds.width) : checkBounds.left) + "px"
                        };
                        return result;
                    };
                }
                CheckEditingFieldViewModel.prototype._toggleCheckState = function () {
                    if (this.field.editValue() === CheckState.Checked) {
                        this.field.editValue(CheckState.Unchecked);
                    }
                    else {
                        this.field.editValue(CheckState.Checked);
                    }
                };
                CheckEditingFieldViewModel.prototype.onKeyDown = function (_, e) {
                    if (e.keyCode == 32) {
                        this.toggleCheckState();
                    }
                    else {
                    }
                };
                CheckEditingFieldViewModel.prototype.onBlur = function () {
                    this.focused(false);
                };
                CheckEditingFieldViewModel.prototype.onFocus = function () {
                    this.focused(true);
                };
                CheckEditingFieldViewModel.prototype.onClick = function (_, e) {
                    this.toggleCheckState();
                };
                CheckEditingFieldViewModel.prototype.checked = function () {
                    if (this.field.editValue() === CheckState.Checked) {
                        return true;
                    }
                    if (this.field.editValue() === CheckState.Unchecked) {
                        return false;
                    }
                };
                CheckEditingFieldViewModel.prototype.toggleCheckState = function () {
                    var _this = this;
                    if (this.field.readOnly())
                        return;
                    if (!this.field.groupID()) {
                        this._toggleCheckState();
                    }
                    else if (this.checked() === false) {
                        this._editingFieldsProvider().forEach(function (value) {
                            if (value.groupID() === _this.field.groupID()) {
                                value.editValue(CheckState.Unchecked);
                            }
                        });
                        this._toggleCheckState();
                    }
                };
                return CheckEditingFieldViewModel;
            })();
            Preview.CheckEditingFieldViewModel = CheckEditingFieldViewModel;
            var CharacterCombEditingFieldViewModel = (function () {
                function CharacterCombEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
                    var _this = this;
                    this.field = field;
                    this.template = "dxrp-character-comb-editing-field";
                    this.active = ko.observable(false);
                    var brickStyle = field.model().brickOptions;
                    var style = { rtl: function () { return brickStyle.rtl; } };
                    new DevExpress.JS.Utils.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), DevExpress.Designer.Report.brickStyleSerializationsInfo);
                    var cssCalculator = new DevExpress.Designer.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
                    var verticalPadding = parseInt(cssCalculator.paddingsCss()["paddingTop"]) + parseInt(cssCalculator.paddingsCss()["paddingBottom"]);
                    var borderCss = cssCalculator.borderCss();
                    if (borderCss["borderTop"] !== "none") {
                        verticalPadding += style["borderWidth"]();
                    }
                    if (borderCss["borderBottom"] !== "none") {
                        verticalPadding += style["borderWidth"]();
                    }
                    this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
                    this.containerStyle = ko.pureComputed(function () {
                        return $.extend({
                            width: bounds.width + "px",
                            height: bounds.height + "px",
                            "line-height": (bounds.height - verticalPadding) + "px",
                            top: bounds.top * 100 / pageHeight + "%",
                            left: bounds.left * 100 / pageWidth + "%"
                        }, cssCalculator.fontCss(), cssCalculator.foreColorCss());
                    });
                    var cellVerticalPadding = 0;
                    var borderCellStyle = "none";
                    ["Left", "Top", "Right", "Bottom"].forEach(function (item) {
                        if (borderCss["border" + item] !== "none") {
                            borderCellStyle = borderCss["border" + item];
                            cellVerticalPadding = style["borderWidth"]() * 2;
                        }
                    });
                    var cellStyle = {
                        "border": borderCellStyle,
                        "text-align": "center",
                        "position": "absolute",
                        "box-sizing": "border-box",
                        "border-color": "transparent"
                    };
                    var characterCombBounds = field.model().brickOptions.characterCombBounds;
                    this.cells = [];
                    var rowTops = {};
                    for (var i = 0; i < characterCombBounds.length; i++) {
                        this.cells.push({
                            style: $.extend({
                                width: characterCombBounds[i].width + "px",
                                height: characterCombBounds[i].height + "px",
                                "line-height": (characterCombBounds[i].height - cellVerticalPadding) + "px",
                                top: characterCombBounds[i].top + "px",
                                left: characterCombBounds[i].left + "px"
                            }, cellStyle),
                            text: ""
                        });
                        rowTops[characterCombBounds[i].top] = i;
                    }
                    var rowsCount = Object.keys(rowTops).length;
                    var colsCount = this.cells.length / rowsCount;
                    CharacterCombEditingFieldViewModel.setText(this.cells, style["textAlignment"](), style.rtl(), field.editValue.peek(), rowsCount, colsCount);
                    field.editValue.subscribe(function (newValue) {
                        CharacterCombEditingFieldViewModel.setText(_this.cells, style["textAlignment"](), style.rtl(), newValue, rowsCount, colsCount);
                    });
                    this.zoom = zoom;
                }
                CharacterCombEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
                    if (!this.field.readOnly()) {
                        this.active(true);
                        $(e && e.currentTarget).find(":focusable").eq(0).focus();
                    }
                };
                CharacterCombEditingFieldViewModel.prototype.hideEditor = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.active(false);
                    });
                };
                CharacterCombEditingFieldViewModel.setText = function (cells, textAlignment, rtl, text, rowsCount, colsCount) {
                    for (var j = 0; j < cells.length; j++) {
                        cells[j].text = "";
                    }
                    var textRowsCount = Math.ceil(text.length / colsCount);
                    var textLastRowColCount = text.length % colsCount;
                    var startRow = -1;
                    if (textAlignment.indexOf("Bottom") === 0) {
                        startRow = rowsCount - textRowsCount;
                    }
                    else if (textAlignment.indexOf("Middle") === 0) {
                        startRow = Math.floor((rowsCount - textRowsCount) / 2);
                    }
                    else {
                        startRow = 0;
                    }
                    var lastRowStartCol = -1;
                    if (textAlignment.indexOf("Right") > 0) {
                        lastRowStartCol = rtl ? 0 : (colsCount - textLastRowColCount);
                    }
                    else if (textAlignment.indexOf("Center") > 0) {
                        lastRowStartCol = Math.floor((colsCount - textLastRowColCount) / 2);
                    }
                    else {
                        lastRowStartCol = rtl ? (colsCount - textLastRowColCount) : 0;
                    }
                    var j = startRow * colsCount;
                    var i = 0;
                    for (; i < text.length - textLastRowColCount; i++, j++) {
                        if (j >= 0 && j < cells.length) {
                            cells[j].text = text[i];
                        }
                    }
                    for (; i < text.length; i++, j++) {
                        if (j >= 0 && j < cells.length) {
                            cells[j + lastRowStartCol].text = text[i];
                        }
                    }
                };
                return CharacterCombEditingFieldViewModel;
            })();
            Preview.CharacterCombEditingFieldViewModel = CharacterCombEditingFieldViewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            Report.StringId = {
                Copy: "ReportStringId.RibbonXRDesign_Copy_STipTitle",
                NewViaWizard: "ReportStringId.UD_Capt_NewWizardReport",
                Open: "ReportStringId.UD_Capt_OpenFile",
                Save: "ReportStringId.Verb_Save",
                SaveAs: "ReportStringId.UD_Capt_SaveFileAs",
                MdiReportChanged: "ReportStringId.UD_Msg_MdiReportChanged"
            };
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var slowdownDisctanceFactor = 2.5;
            var minScale = 0.92;
            var EventProcessor = (function () {
                function EventProcessor(element, slideOptions) {
                    var _this = this;
                    this.element = element;
                    this.slideOptions = slideOptions;
                    this._direction = {
                        vertical: false,
                        horizontal: false,
                    };
                    this.isLeftMove = false;
                    this.isRightMove = false;
                    this.$element = $(element),
                        this.$gallery = this.$element.find(".dxrd-mobile-gallery");
                    this.$galleryblocks = this.$gallery.find(".dxrd-gallery-blocks");
                    this.firstMobilePageOffset = $(this.$galleryblocks.find(".dxrd-mobile-page")[0]).offset();
                    this.slideOptions.searchPanel.height.subscribe(function (newVal) {
                        if (_this.slideOptions.readerMode) {
                            _this.slideOptions.topOffset(newVal);
                        }
                        else {
                            _this.slideOptions.topOffset(Math.min(newVal, Math.max(0, Preview.MobileSearchViewModel.maxHeight - _this.firstMobilePageOffset.top)));
                        }
                        if (!newVal) {
                            _this.applySearchAnimation(newVal);
                        }
                        else if (newVal === Preview.MobileSearchViewModel.maxHeight) {
                            _this.slideOptions.searchPanel.searchPanelVisible(true);
                            _this.applySearchAnimation(newVal);
                        }
                        else {
                            var dif = 1 - minScale;
                            var perc = newVal / Preview.MobileSearchViewModel.maxHeight;
                            var scale = 1 - dif * perc;
                            setTransform(_this.$galleryblocks, 'scale(' + Math.max(minScale, scale) + ')');
                        }
                    });
                }
                EventProcessor.prototype.getDirection = function (x, y) {
                    var distanceY = Math.abs(y - this._startingPositionY);
                    var distanceX = Math.abs(x - this._startingPositionX);
                    if (distanceY === 0 && distanceX === 0) {
                        this._direction.horizontal = false;
                        this._direction.vertical = false;
                        return this._direction;
                    }
                    var tg = !distanceX ? 10 : distanceY / distanceX;
                    if (tg < 2) {
                        this._direction.horizontal = true;
                        this._direction.vertical = false;
                    }
                    else {
                        this._direction.horizontal = false;
                        this._direction.vertical = true;
                    }
                    return this._direction;
                };
                EventProcessor.prototype.setPosition = function (x, y) {
                    this.isLeftMove = this.latestX > x;
                    this.isRightMove = this.latestX < x;
                    this.latestY = y;
                    this.latestX = x;
                };
                EventProcessor.prototype.initialize = function (x, y) {
                    this._startingPositionX = x;
                    this._startingPositionY = y;
                    this.latestX = x;
                    this.latestY = y;
                    this._direction = { horizontal: false, vertical: false };
                };
                EventProcessor.prototype.start = function (e) {
                    this.$galleryblocks = this.$gallery.find(".dxrd-gallery-blocks");
                    if (!this.slideOptions.topOffset()) {
                        this.firstMobilePageOffset = $(this.$galleryblocks.find(".dxrd-mobile-page")[0]).offset();
                        this.firstMobilePageOffset.top = this.firstMobilePageOffset.top * minScale;
                    }
                    this.initialize(e.pageX, e.pageY);
                };
                EventProcessor.prototype.move = function (e) {
                    e.preventDefault();
                    if (this.slideOptions.zoomUpdating() || this.slideOptions.galleryIsAnimated()) {
                        return;
                    }
                    if (!this.slideOptions.searchPanel.editorVisible()) {
                        var direction = this.getDirection(e.pageX, e.pageY);
                        if (!direction.vertical && !direction.horizontal)
                            return;
                        if (direction.vertical || this.slideOptions.searchPanel.height() !== 0) {
                            if (this.slideOptions.reachedTop()) {
                                this.slideOptions.brickEventsDisabled(true);
                                e.stopPropagation();
                                var currentHeight = this.slideOptions.searchPanel.height();
                                var difference = currentHeight + (e.clientY - this.latestY) / slowdownDisctanceFactor;
                                var distance = difference > 0 ? Math.min(difference, Preview.MobileSearchViewModel.maxHeight) : 0;
                                this.slideOptions.searchPanel.height(distance);
                            }
                        }
                    }
                    this.setPosition(e.clientX, e.clientY);
                };
                EventProcessor.prototype.end = function (e) {
                    var _this = this;
                    if (this.slideOptions.zoomUpdating() || this.slideOptions.galleryIsAnimated()) {
                        var touches = e["touches"];
                        if (!touches || touches.length === 0) {
                            if (this.slideOptions.zoomUpdating()) {
                                e.stopPropagation();
                            }
                            this.slideOptions.zoomUpdating(false);
                        }
                        return;
                    }
                    var direction = this.getDirection(e.pageX, e.pageY);
                    if (this.slideOptions.scrollAvailable()) {
                        if (direction.horizontal && this.slideOptions.swipeEnabled()) {
                            var galleryInstance = this.$gallery["dxGalleryReportPreview"]("instance");
                            if (this.slideOptions.reachedLeft() && this.isRightMove) {
                                galleryInstance.prevItem();
                            }
                            else if (this.slideOptions.reachedRight() && this.isLeftMove) {
                                galleryInstance.nextItem();
                            }
                        }
                    }
                    if (this.slideOptions.searchPanel.height() >= Preview.MobileSearchViewModel.maxHeight / 2) {
                        this.slideOptions.searchPanel.height(Preview.MobileSearchViewModel.maxHeight);
                    }
                    else {
                        this.slideOptions.searchPanel.height(0);
                    }
                    if (this.slideOptions.searchPanel.height() == Preview.MobileSearchViewModel.maxHeight) {
                        this.slideOptions.autoFitBy(Preview.ZoomAutoBy.WholePage);
                    }
                    setTimeout(function () { _this.slideOptions.brickEventsDisabled(false); }, 10);
                };
                EventProcessor.prototype.applySearchAnimation = function (value) {
                    var _this = this;
                    if (this.slideOptions.animationSettings.zoomEnabled()) {
                        this.$galleryblocks.addClass("dxrdp-animation");
                        this.$element.addClass("dxrdp-animation");
                        setTimeout(function () {
                            _this.$galleryblocks.removeClass("dxrdp-animation");
                            _this.$element.removeClass("dxrdp-animation");
                        }, 410);
                    }
                    setTransform(this.$galleryblocks, !value ? '' : 'scale(0.92)');
                };
                return EventProcessor;
            })();
            Preview.EventProcessor = EventProcessor;
            ko.bindingHandlers["mobileZoom"] = {
                init: function (element, valueAccessor) {
                    var $element = $(element);
                    var options = valueAccessor();
                    var zoom = options.zoom();
                    $element.on('dxpinch', function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var scale = e['scale'];
                        var newZoom = zoom;
                        if (scale > 1) {
                            newZoom += ((scale - 1) / slowdownDisctanceFactor);
                        }
                        else {
                            newZoom -= ((1 - scale) / slowdownDisctanceFactor);
                        }
                        newZoom = Math.max(0.15, Math.min(2, newZoom));
                        options.zoom(newZoom);
                    });
                    $element.on("dxpinchstart", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        options.zoomUpdating(true);
                        zoom = options.zoom.peek();
                    });
                    $element.on("dxpinchend", function (e) {
                        e.stopPropagation();
                    });
                }
            };
            function setTransform($element, transform) {
                $element.css({
                    '-webkit-transform': transform,
                    'transform': transform
                });
            }
            ko.bindingHandlers["slide"] = {
                init: function (element, valueAccessor) {
                    var slideOptionsValue = valueAccessor();
                    var isStarted = false;
                    var processor = new EventProcessor(element, slideOptionsValue);
                    processor.$element.on('dxpointerdown', function (e) {
                        processor.start(e);
                        isStarted = true;
                    });
                    processor.$element.on('dxpointermove', function (e) {
                        isStarted && processor.move(e);
                    });
                    ["dxpointercancel", "dxpointerleave", "dxpointerup"].forEach(function (value) {
                        processor.$element.on(value, function (e) {
                            if (isStarted) {
                                processor.end(e);
                                isStarted = false;
                            }
                        });
                    });
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
            function getPreviewActionsMobile(preview, exportModel, parametersModel, searchModel, exportTypes) {
                var exportToModel = {
                    visible: ko.observable(false),
                    items: ko.pureComputed(function () {
                        var allFormats = exportModel._getExportFormatItems();
                        var availableFormats = exportTypes().filter(function (x) { return allFormats.indexOf(x) !== -1; });
                        if (availableFormats.length > 9) {
                            availableFormats.splice(9, availableFormats.length - 9);
                        }
                        else if (availableFormats.length < 9) {
                            var notUsedFormats = allFormats.filter(function (x) { return availableFormats.indexOf(x) === -1; });
                            availableFormats.push.apply(availableFormats, notUsedFormats.slice(0, 9 - availableFormats.length));
                        }
                        return availableFormats.map(function (item) {
                            item.action = function (e) { exportModel._exportDocumentByFormat(e.model && e.model.format); };
                            return item;
                        });
                    })
                };
                return new Preview.MobileActionList([
                    {
                        action: function () {
                            searchModel.searchPanelVisible(true);
                            searchModel.editorVisible(true);
                            searchModel.focusEditor({ element: $('.dxrdp-taptosearch') });
                            preview.actionsVisible(false);
                        },
                        image: "dxrd-image-search-inactive",
                        visible: true
                    },
                    {
                        action: function () { exportToModel.visible(!exportToModel.visible()); },
                        image: "dxrd-image-export-to",
                        visible: true,
                        content: {
                            name: "dxrd-menu-export-content",
                            data: exportToModel
                        }
                    },
                    {
                        action: function () {
                            parametersModel.popupInfo.visible(!parametersModel.popupInfo.visible());
                            preview.actionsVisible(false);
                        },
                        image: "dxrd-image-parameters-inactive",
                        visible: parametersModel.popupInfo.notEmpty
                    }
                ]);
            }
            function updatePreviewContentSizeMobile(previewSize, root, rtl) {
                return function () {
                    var $root = $(root);
                    var $surface = $root.find(".dxrd-preview-wrapper");
                    $surface.css("width", $root.outerWidth());
                    $surface.css("height", $root.outerHeight());
                    previewSize({ height: $root.outerHeight(), width: $root.outerWidth() });
                };
            }
            Preview.updatePreviewContentSizeMobile = updatePreviewContentSizeMobile;
            function createMobilePreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, mobileModeSettings) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                var previewWrapper = new Preview.PreviewRequestWrapper(null, callbacks), reportPreview = new Preview.MobileReportPreview(handlerUri, previewWrapper, undefined, callbacks, undefined, mobileModeSettings), searchModel = new Preview.MobileSearchViewModel(reportPreview);
                var parametersModel = new Preview.PreviewParametersViewModel(reportPreview, new Preview.PreviewParameterHelper(parametersInfo && parametersInfo.knownEnums, callbacks));
                var exportModel = new Preview.ExportOptionsModel(reportPreview);
                reportPreview.allowURLsWithJSContent = allowURLsWithJSContent;
                previewWrapper.initialize(reportPreview, parametersModel, searchModel);
                var exportTypes = ko.observableArray([
                    Preview.ExportFormatID.PDF, Preview.ExportFormatID.XLS, Preview.ExportFormatID.XLSX,
                    Preview.ExportFormatID.RTF, Preview.ExportFormatID.DOCX, Preview.ExportFormatID.HTML,
                    Preview.ExportFormatID.Text, Preview.ExportFormatID.CSV, Preview.ExportFormatID.Image
                ]);
                var mobileActions = getPreviewActionsMobile(reportPreview, exportModel, parametersModel, searchModel, exportTypes);
                reportPreview.pageIndex.subscribe(function (newVal) { mobileActions.visible(false); });
                reportPreview.actionsVisible = mobileActions.visible;
                var contentSize = ko.observable({ width: 0, height: 0 });
                var updatePreviewContentSize_ = updatePreviewContentSizeMobile(contentSize, element);
                updatePreviewContentSize_();
                var gallery = new Preview.GalleryModel(reportPreview, contentSize);
                var designerModel = {
                    rootStyle: { 'dxrd-preview': true, 'dxrdp-mobile': true },
                    reportPreview: reportPreview,
                    parametersModel: parametersModel,
                    exportModel: exportModel,
                    searchModel: searchModel,
                    rtl: reportPreview.rtlViewer,
                    brickEventsDisabled: ko.observable(false),
                    gallery: gallery,
                    paginator: new Preview.MobilePaginator(reportPreview, gallery),
                    updateSurfaceSize: function () { updatePreviewContentSize_(); },
                    availableFormats: exportTypes
                };
                designerModel.slideOptions = {
                    readerMode: reportPreview.readerMode,
                    animationSettings: reportPreview.animationSettings,
                    searchPanel: searchModel,
                    topOffset: reportPreview.topOffset,
                    reachedTop: reportPreview.scrollReachedTop,
                    reachedLeft: reportPreview.scrollReachedLeft,
                    reachedRight: reportPreview.scrollReachedRight,
                    scrollAvailable: ko.computed(function () {
                        return !(reportPreview.scrollReachedTop() && reportPreview.scrollReachedLeft()
                            && reportPreview.scrollReachedRight() && reportPreview.scrollReachedBottom());
                    }),
                    swipeEnabled: ko.computed(function () {
                        if (reportPreview.zoomUpdating()) {
                            return false;
                        }
                        if (searchModel.height() > 0 && !searchModel.editorVisible()) {
                            return false;
                        }
                        if (!(reportPreview.scrollReachedLeft() || reportPreview.scrollReachedRight())) {
                            return false;
                        }
                        return true;
                    }),
                    autoFitBy: reportPreview.autoFitBy,
                    galleryIsAnimated: gallery.isAnimated,
                    zoomUpdating: reportPreview.zoomUpdating,
                    brickEventsDisabled: designerModel.brickEventsDisabled
                };
                var parametersPopup = {
                    visible: parametersModel.popupInfo.visible,
                    model: parametersModel,
                    submit: function (params) {
                        var result = params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
                        if (!result || result.isValid) {
                            parametersModel.submit();
                            parametersModel.popupInfo.visible(false);
                        }
                    },
                    cancelDisabled: ko.computed(function () {
                        return reportPreview._currentDocumentId() === null;
                    }),
                    reset: function () { parametersModel.restore(); },
                    cancel: function () { parametersModel.popupInfo.visible(false); }
                };
                designerModel.parts = [
                    { templateName: 'dxrdp-surface-mobile', model: designerModel.reportPreview },
                    { templateName: 'dxrdp-search-mobile', model: designerModel.searchModel },
                    { templateName: 'dxrdp-pages-mobile', model: designerModel.paginator },
                    { templateName: 'dxrdp-surface-mobile-bottom', model: mobileActions },
                    { templateName: 'dxrd-menu-parameters-content', model: parametersPopup }
                ];
                $(window).bind("resize", function () {
                    updatePreviewContentSize_();
                });
                if (element && !reportPreview.canSwitchToDesigner && applyBindings) {
                    $(element).children().remove();
                    ko.applyBindings(designerModel, element);
                }
                return designerModel;
            }
            Preview.createMobilePreview = createMobilePreview;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var MobilePaginator = (function () {
                function MobilePaginator(reportPreview, gallery) {
                    var _this = this;
                    this.visible = ko.observable(false).extend({ notify: 'always' });
                    this.text = ko.computed(function () {
                        setTimeout(function () { _this.visible(true); }, 1);
                        if (reportPreview.pageIndex() === -1) {
                            return DevExpress.Designer.getLocalization('0 pages');
                        }
                        else {
                            var ofText = DevExpress.Designer.getLocalization('of');
                            var pageText = DevExpress.Designer.getLocalization('Page');
                            return pageText + " " + gallery.currentBlockText() + " " + ofText + " " + reportPreview.pages().length;
                        }
                    });
                }
                return MobilePaginator;
            })();
            Preview.MobilePaginator = MobilePaginator;
            ko.bindingHandlers["dxrdMobilePaginator"] = {
                init: function (element, valueAccessor) {
                    var values = valueAccessor();
                    var $element = $(element);
                    var timeoutId = null;
                    var hideAnimationTimeoutId = null;
                    values.visible.subscribe(function (newVal) {
                        if (newVal) {
                            $element.removeClass("dxrdp-hide").addClass("dxrdp-show");
                            timeoutId && clearTimeout(timeoutId);
                            timeoutId = setTimeout(function () { values.visible(false); }, 2000);
                        }
                        else {
                            $element.removeClass("dxrdp-show").addClass("dxrdp-hide");
                            hideAnimationTimeoutId && clearTimeout(hideAnimationTimeoutId);
                            hideAnimationTimeoutId = setTimeout(function () {
                                $element.removeClass("dxrdp-hide");
                            }, 500);
                        }
                    });
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
            function updateBricksPosition(brick, height, width) {
                if (!brick) {
                    return;
                }
                brick[brick.rtl ? 'rightP' : 'leftP'] = Preview.convertToPercent(brick.left, width);
                brick.widthP = Preview.convertToPercent(brick.width, width);
                brick.topP = Preview.convertToPercent(brick.top, height);
                brick.heightP = Preview.convertToPercent(brick.height, height);
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    updateBricksPosition(childBrick, height, width);
                });
            }
            Preview.updateBricksPosition = updateBricksPosition;
            function initializeBrickMobile(brick, processClick, zoom, editingFieldBricks) {
                if (!brick) {
                    return;
                }
                !!brick.active && !!brick.active(false) || (brick.active = ko.observable(false));
                brick["onClick"] = function () { processClick && processClick(brick); };
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    childBrick.top += brick.top;
                    childBrick.left += brick.left;
                    initializeBrickMobile(childBrick, processClick, zoom, editingFieldBricks);
                });
                if (brick.efIndex > 0) {
                    editingFieldBricks.push(brick);
                }
                brick.text = function () { return Preview.brickText(brick); };
            }
            Preview.initializeBrickMobile = initializeBrickMobile;
            var MobilePreviewPage = (function (_super) {
                __extends(MobilePreviewPage, _super);
                function MobilePreviewPage(pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick, editingFields) {
                    var _this = this;
                    _super.call(this, pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick, editingFields);
                    this.bricks = ko.computed(function () {
                        return _this.getBricksFlatList(_this.brick());
                    });
                    this.activeBricks = ko.computed(function () {
                        return _this.bricks().filter(function (x) { return x.active(); });
                    });
                    this.selectBrick = function (path, ctrlKey) {
                        var currentBrick = _this.brick();
                        !ctrlKey && _this.resetBrickRecusive(currentBrick);
                        if (!path) {
                            return;
                        }
                        if (!currentBrick) {
                            _this["_selectedBrickPath"] = path;
                            return;
                        }
                        _this.bricks().forEach(function (brick) { brick.indexes === path && brick.active(true); });
                    };
                }
                MobilePreviewPage.prototype.clickToBrick = function (s, e) {
                    var target = $(e.currentTarget);
                    var offset = target.offset();
                    var xPerc = (e.clientX - offset.left) / target.width() * 100;
                    var yPerc = (e.clientY - offset.top) / target.height() * 100;
                    var bricks = s.bricks();
                    for (var i = 0; i < bricks.length; i++) {
                        if (parseFloat(bricks[i].topP) < yPerc && parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP) > yPerc
                            && parseFloat(bricks[i].leftP) < xPerc && parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP) > xPerc) {
                            bricks[i].onClick && bricks[i].onClick(e);
                            break;
                        }
                    }
                };
                MobilePreviewPage.prototype.initializeBrick = function (brick, processClick, zoom, editingFieldBricks) {
                    initializeBrickMobile(brick, processClick, this.zoom, editingFieldBricks);
                    updateBricksPosition(brick, brick.height, brick.width);
                    this.brick(brick);
                };
                MobilePreviewPage.prototype.getBricksFlatList = function (brick) {
                    if (brick) {
                        var bricks = [];
                        var innerBricksLength = brick.bricks && brick.bricks.length || 0;
                        for (var i = 0; i < innerBricksLength; i++) {
                            bricks = bricks.concat(this.getBricksFlatList(brick.bricks[i]));
                        }
                        bricks.push(brick);
                        return bricks;
                    }
                    return [];
                };
                return MobilePreviewPage;
            })(Preview.PreviewPage);
            Preview.MobilePreviewPage = MobilePreviewPage;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var MobileReportPreview = (function (_super) {
                __extends(MobileReportPreview, _super);
                function MobileReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl, mobileSettings) {
                    var _this = this;
                    if (rtl === void 0) { rtl = false; }
                    if (mobileSettings === void 0) { mobileSettings = { readerMode: true, animationEnabled: true }; }
                    _super.call(this, handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl);
                    this.availablePages = ko.observable(null);
                    this.visiblePages = ko.computed(function () {
                        if (!_this.availablePages()) {
                            return _this.pages();
                        }
                        else {
                            return _this.pages().filter(function (x) { return _this.availablePages().indexOf(x.pageIndex) !== -1; });
                        }
                    });
                    this.topOffset = ko.observable(0);
                    this.searchPanelVisible = ko.observable(false);
                    this.actionsVisible = ko.observable(false);
                    this.scrollReachedLeft = ko.observable(false);
                    this.scrollReachedRight = ko.observable(false);
                    this.scrollReachedTop = ko.observable(true);
                    this.scrollReachedBottom = ko.observable(true);
                    this.zoomUpdating = ko.observable(false);
                    this.mobileZoom = ko.computed({
                        read: function () {
                            var currentZoom = _this.zoom();
                            return currentZoom > 0 ? currentZoom : _this._zoom();
                        },
                        write: function (newVal) {
                            _this.zoom(newVal);
                        }
                    });
                    this.readerMode = mobileSettings.readerMode;
                    var globalAnimationEnabled = mobileSettings.animationEnabled;
                    this.animationSettings = { zoomEnabled: ko.observable(globalAnimationEnabled), swipeEnabled: ko.observable(globalAnimationEnabled) };
                    this.canSwitchToDesigner = false;
                    this.autoFitBy(Preview.ZoomAutoBy.PageWidth);
                    this.showMultipagePreview(true);
                    this.searchPanelVisible.subscribe(function (newVal) {
                        if (newVal) {
                            _this.actionsVisible(false);
                        }
                    });
                }
                MobileReportPreview.prototype.createPage = function (pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick) {
                    return new Preview.MobilePreviewPage(pageIndex, width, height, zoom, documentId, unifier, color, brickProvider, loading, processClick, this._editingFields);
                };
                MobileReportPreview.prototype.createBrickClickProcessor = function (cyclePageIndex) {
                    var _this = this;
                    var _clickHandler = _super.prototype.createBrickClickProcessor.call(this, cyclePageIndex);
                    var func = function (brick) {
                        if (_this.zoomUpdating())
                            return;
                        if (cyclePageIndex !== _this.pageIndex()) {
                            _this.actionsVisible(false);
                            var supscription = _this.actionsVisible.subscribe(function (newVal) {
                                supscription.dispose();
                                _this.actionsVisible(false);
                            });
                        }
                        _clickHandler(brick);
                    };
                    return func;
                };
                MobileReportPreview.prototype.showActions = function (s) {
                    if (s.zoomUpdating())
                        return;
                    var searchVisible = s.searchPanelVisible();
                    if (!searchVisible) {
                        s.actionsVisible(!s.actionsVisible());
                    }
                    else {
                        s.searchPanelVisible(!searchVisible);
                    }
                };
                MobileReportPreview.prototype.onSlide = function (e) {
                    this.scrollReachedLeft(true);
                    this.scrollReachedRight(true);
                    if (this.autoFitBy() === Preview.ZoomAutoBy.None && e.removedItems && e.removedItems[0].blocks().length === 1 && e.addedItems && e.addedItems[0].blocks().length === 1)
                        this.autoFitBy(Preview.ZoomAutoBy.PageWidth);
                };
                MobileReportPreview.prototype.setScrollReached = function (e) {
                    this.scrollReachedLeft(e.reachedLeft);
                    this.scrollReachedRight(e.reachedRight);
                    this.scrollReachedTop(e.reachedTop);
                    this.scrollReachedBottom(e.reachedBottom);
                };
                return MobileReportPreview;
            })(Preview.ReportPreview);
            Preview.MobileReportPreview = MobileReportPreview;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var MobileSearchViewModel = (function (_super) {
                __extends(MobileSearchViewModel, _super);
                function MobileSearchViewModel(reportPreview) {
                    var _this = this;
                    _super.call(this, reportPreview);
                    this.height = ko.observable(0);
                    this["_resultNavigator"]["_disposables"].forEach(function (x) { x.dispose(); });
                    reportPreview.currentPage.subscribe(function (page) {
                        if (page && _this.searchResult() && _this.searchResult().length > 0) {
                            _this._updateBricks(page, _this.searchResult());
                        }
                    });
                    this._disposables.push(this.searchResult.subscribe(function (newResult) {
                        var currentPage = reportPreview.currentPage();
                        currentPage && currentPage.resetBrickRecusive(currentPage.brick());
                        if (!newResult || newResult.length === 0) {
                            reportPreview.availablePages(null);
                        }
                        else {
                            reportPreview.availablePages(newResult.map(function (x) { return x.pageIndex; }));
                            if (currentPage) {
                                _this._updateBricks(currentPage, _this.searchResult());
                            }
                        }
                    }));
                    this.searchPanelVisible = reportPreview.searchPanelVisible;
                    this.editorVisible = ko.observable(false);
                    this.searchPanelVisible.subscribe(function (newVal) {
                        if (!newVal) {
                            _this.height(0);
                            _this.editorVisible(false);
                            _this.searchResult(null);
                        }
                        else {
                            _this.height(MobileSearchViewModel.maxHeight);
                        }
                    });
                }
                MobileSearchViewModel.prototype.focusEditor = function (s) {
                    if (this.searchPanelVisible()) {
                        this.editorVisible(true);
                        var previewSearch = $(".dxrdp-search-editor");
                        var searchEditor = previewSearch.data("dxTextBox") && previewSearch["dxTextBox"]("instance");
                        setTimeout(function () {
                            s.element.blur();
                            searchEditor.focus();
                        }, 1);
                    }
                };
                MobileSearchViewModel.prototype._updateBricks = function (page, searchResult) {
                    var _this = this;
                    if (page.brick() && searchResult && searchResult.length > 0) {
                        var results = searchResult.filter(function (x) { return x.pageIndex === page.pageIndex; });
                        for (var i = 0; i < results.length; i++) {
                            page.selectBrick(results[i].indexes, true);
                        }
                    }
                    else {
                        var subscription = page.brick.subscribe(function (newVal) {
                            subscription.dispose();
                            _this._updateBricks(page, _this.searchResult());
                        });
                    }
                };
                MobileSearchViewModel.maxHeight = 80;
                return MobileSearchViewModel;
            })(Preview.SearchViewModel);
            Preview.MobileSearchViewModel = MobileSearchViewModel;
            ko.bindingHandlers["dxrdSearchBar"] = {
                init: function (element, valueAccessor) {
                    var viewModel = ko.unwrap(valueAccessor());
                    var $element = $(element);
                    element.style.display = "none";
                    var $searchText = $element.find('.dxrdp-taptosearch-text');
                    viewModel.height.subscribe(function (newValue) {
                        if (!newValue) {
                            element.style.display = "none";
                        }
                        else {
                            element.style.display = "block";
                        }
                        $searchText.css({
                            'opacity': Math.min((newValue / MobileSearchViewModel.maxHeight), 1)
                        });
                    });
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
            var MobileActionList = (function () {
                function MobileActionList(actions) {
                    this.actions = actions;
                    this.visible = ko.observable(false);
                }
                return MobileActionList;
            })();
            Preview.MobileActionList = MobileActionList;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var InteractiveMenu = (function () {
                function InteractiveMenu(items, $_element) {
                    this.items = items;
                    this.$_element = $_element;
                    this.collectionVisible = ko.observable(false);
                    this.$_itemsContainer = this.$_element.find(".dx-circle-menu-container");
                }
                InteractiveMenu.prototype.hideContent = function () {
                    if (!!this.$_hideDiv) {
                        this.$_hideDiv.remove();
                        this.$_hideDiv = null;
                    }
                    else {
                        this.$_hideDiv = $("<div>").css({
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0,
                            "z-index": 100,
                            "background": "black",
                            "opacity": "0.3",
                            "position": "absolute"
                        }).appendTo($("body"));
                        this.$_element.zIndex(101);
                        this.$_hideDiv.focus(function () {
                            this.$_hideDiv.remove();
                            this.$_hideDiv = null;
                        });
                    }
                };
                InteractiveMenu.prototype.fade = function (delay, item, opacity) {
                    setTimeout(function () {
                        item.css("opacity", opacity);
                    }, delay);
                };
                InteractiveMenu.prototype.changeMenuItemVisible = function () {
                    var _this = this;
                    this.hideContent();
                    if (!this.collectionVisible()) {
                        this.collectionVisible(true);
                        setTimeout(function () {
                            var $items = _this.$_itemsContainer.find(".dx-circle-menu-item");
                            for (var i = $items.length - 1; i >= 0; i--) {
                                _this.fade(($items.length - i - 1) * 30, $items.eq(i), 1);
                            }
                        }, 10);
                    }
                    else {
                        var $items = this.$_itemsContainer.find(".dx-circle-menu-item");
                        for (var i = 0; i < $items.length; i++) {
                            this.fade(i * 15, $items.eq(i), 0);
                        }
                        setTimeout(function () {
                            _this.collectionVisible(false);
                        }, 250 + $items.length * 30);
                    }
                };
                return InteractiveMenu;
            })();
            Preview.InteractiveMenu = InteractiveMenu;
            ko.bindingHandlers['dxCircleMenu'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    var templateHtml = $('#dx-circle-menu').text(), $element = $(element).append(templateHtml), values = valueAccessor();
                    ko.applyBindings(new InteractiveMenu(values.options, $element), $element.children()[0]);
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
            var GalleryModel = (function () {
                function GalleryModel(preview, containerSize) {
                    var _this = this;
                    this.preview = preview;
                    this.containerSize = containerSize;
                    this._spacing = 1;
                    this._animationTimeout = null;
                    this.horizontal = ko.observable(1);
                    this.vertical = ko.observable(1);
                    this.pageCount = 0;
                    this.isAnimated = ko.observable(false);
                    this.items = ko.observableArray([{ blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }]);
                    this.currentBlockText = ko.observable("");
                    this.selectedIndexReal = ko.observable(0);
                    this.selectedIndex = ko.observable(0);
                    var oldIndex = this.selectedIndex();
                    this.animationEnabled = preview.animationSettings.swipeEnabled;
                    var _calcHorizontalVertical = function () {
                        var pageHeight = Math.ceil(preview._pageHeight() * Preview.getCurrentResolution(preview._zoom()) / Preview.previewDefaultResolution);
                        var pageWidth = Math.ceil(preview._pageWidth() * Preview.getCurrentResolution(preview._zoom()) / Preview.previewDefaultResolution);
                        _this.horizontal(Math.floor(containerSize().width / (pageWidth + 2 * _this._spacing)) || 1);
                        _this.vertical(Math.floor(containerSize().height / (pageHeight + 2 * _this._spacing)) || 1);
                    };
                    var updateGalleryContent = function () {
                        _calcHorizontalVertical();
                        _this.updateContent(preview, _this.horizontal() * _this.vertical());
                    };
                    containerSize.subscribe(updateGalleryContent);
                    preview.visiblePages.subscribe(function () {
                        for (var i = 0; i < _this.items().length; i++) {
                            _this.items()[i].blocks([]);
                            _this.items()[i].realIndex = -1;
                        }
                        updateGalleryContent();
                    });
                    preview.pageIndex.subscribe(updateGalleryContent);
                    preview._zoom.subscribe(function () {
                        _calcHorizontalVertical();
                        if (_this.pageCount !== _this.horizontal() * _this.vertical()) {
                            _this.pageCount = _this.horizontal() * _this.vertical();
                            _this.updateContent(preview, _this.horizontal() * _this.vertical());
                        }
                    });
                    this.selectedIndexReal.subscribe(function (newVal) {
                        if (newVal >= 0) {
                            _this.changePage(preview);
                        }
                        else if (newVal < 0) {
                            _this.selectedIndexReal(0);
                        }
                    });
                    this.selectedIndex.subscribe(function (newVal) {
                        var result = newVal - oldIndex;
                        if (result === -2 || result === 1) {
                            _this.selectedIndexReal(_this.selectedIndexReal() + 1);
                        }
                        else if (result === 2 || result === -1) {
                            _this.selectedIndexReal(_this.selectedIndexReal() - 1);
                        }
                        oldIndex = newVal;
                    });
                    this.swipeLeftEnable = ko.computed(function () {
                        return _this.selectedIndexReal() !== 0;
                    });
                    this.swipeRightEnable = ko.computed(function () {
                        return _this.selectedIndexReal() != (Math.ceil(preview.visiblePages().length / (_this.horizontal() * _this.vertical())) - 1);
                    });
                }
                GalleryModel.prototype._createBlock = function (previewPage, className, visible) {
                    previewPage.disableResolutionReduction = true;
                    previewPage.maxZoom = 1;
                    var classSet = {};
                    if (this.animationEnabled()) {
                        classSet[className] = true;
                        classSet["dxrdp-animation"] = true;
                    }
                    return {
                        page: previewPage,
                        visible: visible,
                        classSet: classSet,
                        position: ko.observable({ top: 0, left: 0, width: 0, height: 0 })
                    };
                };
                GalleryModel.prototype.updatePagesVisible = function (preview) {
                    if (this.items()[this.selectedIndex()]) {
                        var someActive = false;
                        var pages = this.items()[this.selectedIndex()].blocks();
                        if (pages.length > 0) {
                            for (var i = 0; i < pages.length; i++) {
                                if (pages[i].page) {
                                    pages[i].page.isClientVisible(true);
                                    if (pages[i].page.active()) {
                                        someActive = true;
                                    }
                                }
                                ;
                            }
                            if (!someActive) {
                                pages[0].page && preview.goToPage(pages[0].page.pageIndex);
                            }
                        }
                    }
                };
                GalleryModel.prototype.updateCurrentBlock = function () {
                    if (this.items()[this.selectedIndex()]) {
                        var blocks = this.items()[this.selectedIndex()].blocks();
                        if (blocks.length > 0) {
                            if (blocks.length > 1) {
                                this.currentBlockText([blocks[0].page.pageIndex + 1, blocks[blocks.length - 1].page.pageIndex + 1].join(" - "));
                            }
                            else {
                                if (blocks[0].page) {
                                    this.currentBlockText((this.preview.pageIndex() + 1).toString());
                                }
                            }
                        }
                    }
                };
                GalleryModel.prototype.updateContent = function (preview, pagesCount) {
                    var itemsCount = Math.ceil(preview.visiblePages().length / pagesCount);
                    var pageIndex = 0;
                    var isCurrentBlock = false;
                    var realIndex = 0;
                    for (var i = 0; i < itemsCount; i++) {
                        for (var j = 0; j < pagesCount; j++) {
                            if (preview.visiblePages()[pageIndex].active()) {
                                isCurrentBlock = true;
                                realIndex = i;
                                break;
                            }
                            pageIndex++;
                            if (preview.visiblePages().length === pageIndex) {
                                break;
                            }
                        }
                        if (isCurrentBlock)
                            break;
                    }
                    if (this.selectedIndexReal() !== realIndex) {
                        this.selectedIndexReal(realIndex);
                    }
                    else {
                        this.changePage(preview);
                    }
                };
                GalleryModel.prototype.updateBlockPositions = function (blocks, visible) {
                    var height = this.containerSize().height / this.vertical();
                    var width = this.containerSize().width / this.horizontal();
                    for (var i = 0; i < blocks.length; i++) {
                        var vertical = Math.floor((i) / this.horizontal());
                        var horizontal = i - (this.horizontal() * vertical);
                        var left = horizontal * width;
                        if (blocks[i].visible === visible || blocks[i].visible === true) {
                            blocks[i].position({
                                top: vertical * height,
                                left: left,
                                width: width,
                                height: height
                            });
                            blocks[i].visible = true;
                        }
                        else {
                            blocks[i].position({
                                top: vertical * height,
                                left: blocks[i].classSet["left"] ? ((this.containerSize().width + left) * -1) : this.containerSize().width + left,
                                width: width,
                                height: height
                            });
                        }
                    }
                };
                GalleryModel.prototype.updateStartBlocks = function (galleryItem, pages) {
                    var currentBlockPages = galleryItem.blocks().map(function (x) { return x.page; });
                    var firstPage = pages.indexOf(currentBlockPages[0]);
                    if (firstPage !== -1) {
                        for (var i = 0; i < firstPage; i++) {
                            galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], "left", false));
                        }
                    }
                    else {
                        firstPage = currentBlockPages.indexOf(pages[0]);
                        if (firstPage !== -1) {
                            galleryItem.blocks.splice(0, firstPage);
                        }
                    }
                    return firstPage;
                };
                GalleryModel.prototype.updateLastBlocks = function (galleryItem, pages) {
                    var currentBlockPages = galleryItem.blocks().map(function (x) { return x.page; });
                    var lastPage = pages.indexOf(currentBlockPages[currentBlockPages.length - 1]);
                    if (lastPage === pages.length - 1) {
                        return 0;
                    }
                    if (lastPage !== -1) {
                        for (var i = lastPage + 1; i < pages.length; i++) {
                            galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], "right", false));
                        }
                    }
                    else {
                        lastPage = currentBlockPages.indexOf(pages[pages.length - 1]);
                        galleryItem.blocks.splice(lastPage + 1, currentBlockPages.length - lastPage);
                    }
                    return lastPage;
                };
                GalleryModel.prototype.updateBlocks = function (galleryItem, pagesCount, preview, index, useAnimation) {
                    if (useAnimation === void 0) { useAnimation = false; }
                    if (galleryItem.realIndex !== index || (galleryItem.blocks().length !== pagesCount || galleryItem.blocks()[0].page.pageIndex === -1)) {
                        galleryItem.realIndex = index;
                        clearTimeout(this._animationTimeout);
                        var startIndex = pagesCount * index;
                        if (startIndex < 0 || startIndex >= preview.visiblePages().length) {
                            galleryItem.blocks([]);
                            return;
                        }
                        var pages = [];
                        for (var i = startIndex; i < startIndex + pagesCount; i++) {
                            if (i >= preview.visiblePages().length) {
                                break;
                            }
                            pages.push(preview.visiblePages()[i]);
                        }
                        var first = this.updateStartBlocks(galleryItem, pages);
                        var last = this.updateLastBlocks(galleryItem, pages);
                        if (first === -1 && last === -1) {
                            galleryItem.blocks([]);
                            for (var i = 0; i < pages.length; i++) {
                                galleryItem.blocks.splice(i, 0, this._createBlock(pages[i], null, true));
                            }
                        }
                        this.updateBlockPositions(galleryItem.blocks(), true);
                        var self = this;
                        if (useAnimation) {
                            this._animationTimeout = setTimeout(function () {
                                self.updateBlockPositions(galleryItem.blocks(), false);
                            }, 400);
                        }
                        else {
                            self.updateBlockPositions(galleryItem.blocks(), false);
                        }
                    }
                };
                GalleryModel.prototype.changePage = function (preview) {
                    var pagesCount = this.horizontal() * this.vertical();
                    var itemsCount = Math.ceil(preview.visiblePages().length / pagesCount);
                    if (this.selectedIndex() === this.items().length - 1) {
                        this.updateBlocks(this.items()[0], pagesCount, preview, this.selectedIndexReal() + 1);
                        this.updateBlocks(this.items()[1], pagesCount, preview, this.selectedIndexReal() - 1);
                    }
                    else if (this.selectedIndex() === 0) {
                        this.updateBlocks(this.items()[2], pagesCount, preview, this.selectedIndexReal() - 1);
                        this.updateBlocks(this.items()[1], pagesCount, preview, this.selectedIndexReal() + 1);
                    }
                    else {
                        this.updateBlocks(this.items()[0], pagesCount, preview, this.selectedIndexReal() - 1);
                        this.updateBlocks(this.items()[2], pagesCount, preview, this.selectedIndexReal() + 1);
                    }
                    var currentGalleryItem = this.items()[this.selectedIndex()];
                    this.updateBlocks(currentGalleryItem, pagesCount, preview, this.selectedIndexReal(), preview.animationSettings.zoomEnabled());
                    if (!this.isAnimated()) {
                        this.updatePagesVisible(preview);
                    }
                    this.updateCurrentBlock();
                };
                return GalleryModel;
            })();
            Preview.GalleryModel = GalleryModel;
            var dxGalleryReportPreview = (function (_super) {
                __extends(dxGalleryReportPreview, _super);
                function dxGalleryReportPreview(element, options) {
                    _super.call(this, element, options);
                    this._animationClassName = "dxrdp-gallery-item-animation";
                    this.blockItems = [];
                    this.currentBlockItem = null;
                    this.nextBlockItem = null;
                    var $items = this["_getAvailableItems"]();
                    for (var i = 0; i < $items.length; i++) {
                        this.blockItems.push({
                            element: $($items[i]),
                            left: parseFloat($items[i]["style"].left)
                        });
                    }
                    this.gallery = this["option"]("gallery");
                }
                dxGalleryReportPreview.prototype._swipeStartHandler = function (e) {
                    _super.prototype._swipeStartHandler.call(this, e);
                    var swipeRightEnable = this.gallery.swipeRightEnable();
                    var swipeLeftEnable = this.gallery.swipeLeftEnable();
                    if (!swipeRightEnable || !swipeLeftEnable) {
                        var selectedIndex = swipeRightEnable ? 0 : 2;
                        var startOffset = 3 - selectedIndex - 1, endOffset = selectedIndex;
                        if (!swipeRightEnable && !swipeLeftEnable) {
                            startOffset = 0;
                            endOffset = 0;
                        }
                        e.jQueryEvent.maxLeftOffset = startOffset;
                        e.jQueryEvent.maxRightOffset = endOffset;
                    }
                    this.gallery.isAnimated(true);
                    if (this.gallery.animationEnabled()) {
                        this.currentBlockItem && this.currentBlockItem.element.removeClass(this._animationClassName);
                        this.nextBlockItem && this.nextBlockItem.element.removeClass(this._animationClassName);
                    }
                };
                dxGalleryReportPreview.prototype._getNextIndex = function (offset) {
                    var index = this.gallery.selectedIndex();
                    if (offset < 0) {
                        if (index === 2) {
                            index = 0;
                        }
                        else {
                            index++;
                        }
                    }
                    else {
                        if (index === 0) {
                            index = 2;
                        }
                        else {
                            index--;
                        }
                    }
                    return index;
                };
                dxGalleryReportPreview.prototype._setSwipeAnimation = function (element, difference, offset, right) {
                    var diffperc = 100 * offset / 4;
                    var newLeft = "0%";
                    if (right) {
                        newLeft = (element.left + diffperc) + "%";
                    }
                    else {
                        newLeft = (element.left - diffperc) + "%";
                    }
                    element.element.css({
                        "opacity": difference,
                        "transform": "scale(" + difference + ")",
                        "left": newLeft
                    });
                };
                dxGalleryReportPreview.prototype._addAnimation = function (item) {
                    if (item) {
                        if (this.gallery.animationEnabled()) {
                            item.element.addClass(this._animationClassName);
                        }
                    }
                };
                dxGalleryReportPreview.prototype._restoreDefault = function (item) {
                    if (item) {
                        item.element.css({
                            "opacity": 1,
                            "transform": "scale(" + 1 + ")",
                            "left": item.left + "%"
                        });
                    }
                };
                dxGalleryReportPreview.prototype._getItem = function (index, loopTest) {
                    var realIndex = index;
                    var currentBlockIndex = this.blockItems.indexOf(this.currentBlockItem);
                    if (loopTest) {
                        if (currentBlockIndex === 2 && index === 0) {
                            realIndex = 3;
                        }
                        else if (currentBlockIndex === 0 && index === 2) {
                            realIndex = 4;
                        }
                    }
                    var item = this.blockItems[realIndex];
                    if (this.gallery.animationEnabled()) {
                        item.element.removeClass(this._animationClassName);
                    }
                    return item;
                };
                dxGalleryReportPreview.prototype._swipeUpdateHandler = function (e) {
                    _super.prototype._swipeUpdateHandler.call(this, e);
                    var offset = e.jQueryEvent.offset;
                    var nextIndex = this._getNextIndex(offset);
                    var currentIndex = this.gallery.selectedIndex();
                    var currentBlockIndex = this.blockItems.indexOf(this.currentBlockItem);
                    var nextBlockIndex = this.blockItems.indexOf(this.nextBlockItem);
                    if (!this.currentBlockItem || currentBlockIndex !== currentIndex) {
                        this.currentBlockItem = this._getItem(currentIndex, false);
                    }
                    if (!this.nextBlockItem || nextBlockIndex !== nextIndex) {
                        this.nextBlockItem = this._getItem(nextIndex, true);
                    }
                    if (this.gallery.animationEnabled()) {
                        offset = Math.abs(offset);
                        var right = (nextIndex - currentIndex === 1) || (currentIndex === 2 && nextIndex === 0);
                        this._setSwipeAnimation(this.currentBlockItem, Math.min(1, (1 - offset)), offset, right);
                        this._setSwipeAnimation(this.nextBlockItem, Math.min(1, offset * 1.5), offset, !right);
                    }
                };
                dxGalleryReportPreview.prototype._swipeEndHandler = function (e) {
                    _super.prototype._swipeEndHandler.call(this, e);
                    if (this.gallery.animationEnabled()) {
                        for (var i = 0; i < this.blockItems.length; i++) {
                            if (this.blockItems[i] === this.currentBlockItem || this.blockItems[i] === this.nextBlockItem) {
                                this._addAnimation(this.blockItems[i]);
                            }
                            this._restoreDefault(this.blockItems[i]);
                        }
                    }
                    else {
                        this.gallery.isAnimated(false);
                        this.gallery.updatePagesVisible(this.gallery.preview);
                    }
                };
                dxGalleryReportPreview.prototype._endSwipe = function () {
                    _super.prototype._endSwipe.apply(this, arguments);
                    this.gallery.isAnimated(false);
                    this.gallery.updatePagesVisible(this.gallery.preview);
                };
                return dxGalleryReportPreview;
            })(DevExpress.ui.dxGallery);
            Preview.dxGalleryReportPreview = dxGalleryReportPreview;
            DevExpress.registerComponent("dxGalleryReportPreview", dxGalleryReportPreview);
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var EventGenerator = (function () {
            function EventGenerator() {
            }
            EventGenerator.generateDesignerEvents = function (fireEvent) {
                var self = this;
                function customizeActions(actions) {
                    fireEvent("CustomizeMenuActions", {
                        Actions: actions,
                        GetById: function (actionId) {
                            return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                        }
                    });
                }
                function customizeParameterEditors(parameter, info) {
                    fireEvent("CustomizeParameterEditors", {
                        parameter: parameter,
                        info: info
                    });
                }
                function customizeParameterLookUpSource(parameter, items) {
                    var arg = {
                        parameter: parameter,
                        items: items,
                        dataSource: null
                    };
                    fireEvent("CustomizeParameterLookUpSource", arg);
                    return arg.dataSource;
                }
                function exitDesigner() {
                    fireEvent("ExitDesigner");
                }
                function reportSaving(args) {
                    var arg = {
                        Url: args.url,
                        Report: args.report,
                        Cancel: args.cancel
                    };
                    fireEvent("ReportSaving", arg);
                    args.cancel = arg.Cancel;
                }
                function reportSaved(args) {
                    var arg = {
                        Url: args.url,
                        Report: args.report,
                        Cancel: args.cancel
                    };
                    fireEvent("ReportSaved", arg);
                }
                function reportOpened(args) {
                    var arg = {
                        Url: args.url,
                        Report: args.report,
                        Cancel: args.cancel
                    };
                    fireEvent("ReportOpened", arg);
                }
                function reportOpening(args) {
                    var arg = {
                        Url: args.url,
                        Report: args.report,
                        Cancel: args.cancel
                    };
                    fireEvent("ReportOpening", arg);
                    args.cancel = arg.Cancel;
                }
                function OnServerError(args) {
                    fireEvent("OnServerError", { Error: args });
                }
                function componentAdded(args) {
                    fireEvent("ComponentAdded", { Model: args.model, Parent: args.parent });
                }
                function customizeParts(parts) {
                    fireEvent("CustomizeElements", {
                        Elements: parts,
                        GetById: function (templateId) {
                            return templateId ? parts.filter(function (item) { return templateId === item.templateName; })[0] : null;
                        }
                    });
                }
                function customizeSaveDialog(popup) {
                    fireEvent("CustomizeSaveDialog", {
                        Popup: popup,
                        Customize: function (template, model) {
                            popup.customize(template, model);
                        }
                    });
                }
                function customizeSaveAsDialog(popup) {
                    fireEvent("CustomizeSaveAsDialog", {
                        Popup: popup,
                        Customize: function (template, model) {
                            popup.customize(template, model);
                        }
                    });
                }
                function customizeOpenDialog(popup) {
                    fireEvent("CustomizeOpenDialog", {
                        Popup: popup,
                        Customize: function (template, model) {
                            popup.customize(template, model);
                        }
                    });
                }
                function customizeToolbox(controlsFactory) {
                    fireEvent("CustomizeToolbox", {
                        ControlsFactory: controlsFactory
                    });
                }
                return {
                    customizeActions: customizeActions,
                    customizeParameterEditors: customizeParameterEditors,
                    customizeParameterLookUpSource: customizeParameterLookUpSource,
                    exitDesigner: exitDesigner,
                    reportSaving: reportSaving,
                    reportSaved: reportSaved,
                    reportOpening: reportOpening,
                    reportOpened: reportOpened,
                    onServerError: OnServerError,
                    customizeParts: customizeParts,
                    componentAdded: componentAdded,
                    customizeSaveDialog: customizeSaveDialog,
                    customizeSaveAsDialog: customizeSaveAsDialog,
                    customizeOpenDialog: customizeOpenDialog,
                    customizeToolbox: customizeToolbox
                };
            };
            EventGenerator.generatePreviewEvents = function (fireEvent, prefix) {
                var self = this;
                function customizeParameterEditors(parameter, info) {
                    fireEvent("CustomizeParameterEditors", { parameter: parameter, info: info });
                }
                function customizeParts(parts) {
                    fireEvent(prefix + "CustomizeElements", {
                        Elements: parts,
                        GetById: function (templateId) {
                            return templateId ? parts.filter(function (item) { return templateId === item.templateName; })[0] : null;
                        }
                    });
                }
                function customizeActions(actions) {
                    fireEvent(prefix + "CustomizeMenuActions", {
                        Actions: actions,
                        GetById: function (actionId) {
                            return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                        }
                    });
                }
                function customizeParameterLookUpSource(parameter, items) {
                    var arg = {
                        parameter: parameter,
                        items: items,
                        dataSource: null
                    };
                    fireEvent("CustomizeParameterLookUpSource", arg);
                    return arg.dataSource;
                }
                function PreviewClick(pageIndex, brick, defaultHandler) {
                    var arg = {
                        PageIndex: pageIndex,
                        Brick: brick,
                        DefaultHandler: defaultHandler,
                        GetBrickText: function () { return brick && brick.text(); },
                        GetBrickValue: function () { return brick && brick.content && brick.content.filter(function (x) { return x.Key === "value"; })[0]; },
                        Handled: false
                    };
                    fireEvent("PreviewClick", arg);
                    return arg.Handled;
                }
                function parametersReset(model, parameters) {
                    fireEvent(prefix + "ParametersReset", {
                        ParametersViewModel: model,
                        Parameters: parameters
                    });
                }
                function parametersSubmitted(model, parameters) {
                    fireEvent(prefix + "ParametersSubmitted", {
                        ParametersViewModel: model,
                        Parameters: parameters
                    });
                }
                function editingFieldChanged(field, oldValue, newValue) {
                    var arg = {
                        Field: field,
                        OldValue: oldValue,
                        NewValue: newValue
                    };
                    fireEvent(prefix + "EditingFieldChanged", arg);
                    return arg.NewValue;
                }
                function documentReady(documentId, reportId, pageCount) {
                    fireEvent(prefix + "DocumentReady", {
                        ReportId: reportId,
                        DocumentId: documentId,
                        PageCount: pageCount
                    });
                }
                return {
                    previewClick: PreviewClick,
                    documentReady: documentReady,
                    editingFieldChanged: editingFieldChanged,
                    parametersSubmitted: parametersSubmitted,
                    parametersReset: parametersReset,
                    customizeParameterLookUpSource: customizeParameterLookUpSource,
                    customizeParameterEditors: customizeParameterEditors,
                    customizeActions: customizeActions,
                    customizeParts: customizeParts
                };
            };
            return EventGenerator;
        })();
        Report.EventGenerator = EventGenerator;
        var JSDesignerBindingCommon = (function () {
            function JSDesignerBindingCommon(_options) {
                this._options = _options;
                this._templateHtml = $('#dxrd-designer').text();
            }
            JSDesignerBindingCommon.prototype._fireEvent = function (eventName, args) {
                this._options.callbacks && this._options.callbacks[eventName] && this._options.callbacks[eventName](this._sender, args);
            };
            JSDesignerBindingCommon.prototype._getAvailableEvents = function (events, prefix) {
                var _this = this;
                var result = events;
                if (prefix && this._options.callbacks[prefix]) {
                    Object.keys(events).forEach(function (propertyName) {
                        result[propertyName] = _this._options.callbacks[prefix][propertyName] || events[propertyName];
                    });
                }
                else {
                    Object.keys(events).forEach(function (propertyName) {
                        result[propertyName] = _this._options.callbacks[propertyName] || events[propertyName];
                    });
                }
                return result;
            };
            JSDesignerBindingCommon.prototype._loadTemplates = function () {
                var _this = this;
                var deferred = $.Deferred();
                if (!this._templateHtml) {
                    DevExpress.Designer.loadTemplates().done(function () {
                        _this._templateHtml = $('#dxrd-designer').text();
                        deferred.resolve();
                    });
                }
                else {
                    deferred.resolve();
                }
                return deferred.promise();
            };
            JSDesignerBindingCommon.prototype._getLocalizationRequest = function () {
                var self = this;
                var deferred = $.Deferred();
                if (!!this._options.requestOptions.getLocalizationAction) {
                    $.getJSON((this._options.requestOptions.host || "") + this._options.requestOptions.getLocalizationAction)
                        .fail(function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + ": " + errorThrown.message);
                        deferred.reject();
                    }).done(function (localization) {
                        deferred.resolve(localization);
                    });
                }
                else {
                    deferred.resolve();
                }
                return deferred.promise();
            };
            return JSDesignerBindingCommon;
        })();
        Report.JSDesignerBindingCommon = JSDesignerBindingCommon;
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
                            if (pageTop < 0 && (pageTop + $previewPage.height() < 0) || pageTop >= $container.height()) {
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
                        load = setTimeout(function () { loadVisibleImages(); load = undefined; }, 700);
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
                    element.addEventListener("mouseup", function (e) {
                        var $target = $(e.target);
                        var isTargetElementFocusable = $target.is(":focusable") || $target.closest(".dxrp-editing-field-container").length > 0;
                        if (!isTargetElementFocusable) {
                            var ieVersion = getInternetExplorerVersion();
                            if (ieVersion > -1 && ieVersion <= 10) {
                                $("body").focus();
                            }
                            else {
                                $(":focus").blur();
                            }
                        }
                    }, false);
                }
            };
            ko.bindingHandlers["textCopier"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var keyDownHandler = function (e) {
                        var value = viewModel.getSelectedContent();
                        if (!value || !(e.ctrlKey || e.metaKey)
                            || $(e.target).is("input:visible,textarea:visible")
                            || window.getSelection && window.getSelection() && window.getSelection().toString()
                            || document["selection"] && document["selection"].createRange().text) {
                            return;
                        }
                        var $clipboardContainer = $("#clipboard-container");
                        $clipboardContainer.empty().show();
                        $("<textarea id='clipboard'></textarea>").val(value)
                            .appendTo($clipboardContainer)
                            .focus()
                            .select();
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
                        var autoFitBy = newOptions.autoFitBy();
                        if (autoFitBy != Preview.ZoomAutoBy.None && ((!newOptions.brickLoading || (newOptions.brickLoading && !newOptions.brickLoading())) || options.alwaysRecalculate)) {
                            var newZoom = Math.floor(Preview.updatePreviewZoomWithAutoFit(newOptions.width(), newOptions.height(), element, autoFitBy) * 100) / 100;
                            newOptions.zoom(Math.max(newZoom, 0.1));
                        }
                    };
                    updateZoom(options);
                    var onResize = function () {
                        updateZoom(options);
                    };
                    $(window).bind("resize", onResize);
                    var subscribe = function (value) {
                        if (value) {
                            subscriptions.push(value.subscribe(function (newVal) {
                                updateZoom(options);
                            }));
                        }
                    };
                    subscribe(options.rightPanelWidth);
                    subscribe(options.width);
                    subscribe(options.height);
                    subscribe(options.autoFitBy);
                    subscribe(options.brickLoading);
                    subscribe(options.previewSize);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $(window).unbind("resize", onResize);
                        subscriptions.forEach(function (subscription) {
                            subscription.dispose();
                        });
                    });
                }
            };
            var JSReportViewer = (function () {
                function JSReportViewer(_previewModel) {
                    this._previewModel = _previewModel;
                }
                Object.defineProperty(JSReportViewer.prototype, "previewModel", {
                    get: function () {
                        return this._previewModel();
                    },
                    set: function (newVal) {
                        this._previewModel(newVal);
                    },
                    enumerable: true,
                    configurable: true
                });
                JSReportViewer.prototype.previewExists = function () {
                    return this.previewModel && this.previewModel.reportPreview;
                };
                JSReportViewer.prototype.GetPreviewModel = function () {
                    return this.previewModel;
                };
                JSReportViewer.prototype.GetParametersModel = function () {
                    return this.previewModel && this.previewModel.GetParametersModel();
                };
                JSReportViewer.prototype.OpenReport = function (reportName) {
                    return this.previewExists() && this.previewModel.OpenReport(reportName);
                };
                JSReportViewer.prototype.Print = function (pageIndex) {
                    return this.previewExists() && this.previewModel.Print(pageIndex);
                };
                JSReportViewer.prototype.ExportTo = function (format, inlineResult) {
                    this.previewExists() && this.previewModel.ExportTo(format, inlineResult);
                };
                JSReportViewer.prototype.GetCurrentPageIndex = function () {
                    return this.previewExists() && this.previewModel.GetCurrentPageIndex();
                };
                JSReportViewer.prototype.GoToPage = function (pageIndex) {
                    this.previewExists() && this.previewModel.GoToPage(pageIndex);
                };
                JSReportViewer.prototype.Close = function () {
                    this.previewExists() && this.previewModel.Close();
                };
                JSReportViewer.prototype.ResetParameters = function () {
                    this.previewModel && this.previewModel.ResetParameters();
                };
                JSReportViewer.prototype.StartBuild = function () {
                    return this.previewModel && this.previewModel.StartBuild();
                };
                JSReportViewer.prototype.UpdateLocalization = function (localization) {
                    DevExpress.Designer.updateLocalization(localization);
                };
                JSReportViewer.prototype.AdjustControlCore = function () {
                    this.previewModel && this.previewModel.updateSurfaceSize && this.previewModel.updateSurfaceSize();
                };
                return JSReportViewer;
            })();
            Preview.JSReportViewer = JSReportViewer;
            var JSReportViewerBinding = (function (_super) {
                __extends(JSReportViewerBinding, _super);
                function JSReportViewerBinding(_options) {
                    _super.call(this, _options);
                    _options.viewerModel = ko.isWriteableObservable(_options.viewerModel) ? _options.viewerModel : ko.observable(null);
                    this._sender = new JSReportViewer(_options.viewerModel);
                }
                JSReportViewerBinding.prototype._initializeEvents = function () {
                    var _this = this;
                    return this._getAvailableEvents(Report.EventGenerator.generatePreviewEvents(function (eventName, args) {
                        _this._fireEvent(eventName, args);
                    }));
                };
                JSReportViewerBinding.prototype._initializeCallbacks = function () {
                    if (this._options.callbacks) {
                        return this._initializeEvents();
                    }
                };
                JSReportViewerBinding.prototype._createModel = function (element) {
                    return DevExpress.Report.Preview.createAndInitPreviewModel(this._options, element, this._initializeCallbacks(), false);
                };
                JSReportViewerBinding.prototype._applyBindings = function (model, _$element) {
                    _$element.children().remove();
                    var child = _$element.append(this._templateHtml).children()[0];
                    if (!child)
                        return;
                    ko.cleanNode(child);
                    ko.applyBindings(model, child);
                    this._fireEvent("Init");
                };
                JSReportViewerBinding.prototype.applyBindings = function (element) {
                    var self = this;
                    this._loadTemplates().done(function () {
                        var _$element = $(element);
                        _$element.addClass("dx-designer");
                        if (self._options.reportPreview && self._options.parts) {
                            self._applyBindings(self._options, _$element);
                            return;
                        }
                        if (!!self._options.requestOptions) {
                            self._getLocalizationRequest().done(function (localization) {
                                localization && DevExpress.JS.Localization.addCultureInfo(localization);
                            });
                            DevExpress.Report.Preview.HandlerUri = (self._options.requestOptions.host || "") + self._options.requestOptions.invokeAction;
                        }
                        self._sender.previewModel = (self._createModel(element));
                        ;
                        var subscription = null;
                        if (!!self._options.reportUrl) {
                            if (ko.isSubscribable(self._options.reportUrl)) {
                                subscription = self._options.reportUrl.subscribe(function (newVal) {
                                    self._sender.OpenReport(newVal);
                                });
                            }
                            self._sender.OpenReport(ko.unwrap(self._options.reportUrl));
                        }
                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                            subscription && subscription.dispose();
                        });
                        self._applyBindings(self._sender.previewModel, _$element);
                    });
                };
                return JSReportViewerBinding;
            })(Report.JSDesignerBindingCommon);
            Preview.JSReportViewerBinding = JSReportViewerBinding;
            ko.bindingHandlers['dxReportViewer'] = {
                init: function (element, valueAccessor) {
                    new JSReportViewerBinding(ko.unwrap(valueAccessor()) || {}).applyBindings(element);
                    return { controlsDescendantBindings: true };
                }
            };
            function getInternetExplorerVersion() {
                var rv = -1;
                if (navigator.appName == 'Microsoft Internet Explorer') {
                    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(navigator.userAgent) != null)
                        rv = parseFloat(RegExp.$1);
                }
                else if (navigator.appName == 'Netscape') {
                    var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(navigator.userAgent) != null)
                        rv = parseFloat(RegExp.$1);
                }
                return rv;
            }
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
                PreviewHandlersHelper.prototype.doneStartExportHandler = function (deffered, inlineResult, response) {
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
                                        _this._preview.getExportResult(operationId, inlineResult);
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
                            if (response && response.faultMessage)
                                this._preview._processError(response.faultMessage, null);
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
                PreviewHandlersHelper.prototype.errorStartBuildHandler = function (deffered, error, startBuildOperationId) {
                    this._preview.pageLoading(false);
                    this._preview.progressBar.complete();
                    deffered.resolve(true);
                    this._preview._startBuildOperationId = "";
                    this._preview.removeEmptyPages();
                    if (!this._preview._closeDocumentRequests[startBuildOperationId])
                        this._preview._processError(DevExpress.Designer.getLocalization("Cannot create a document for the current report"), error);
                };
                PreviewHandlersHelper.prototype.errorGetBuildStatusHandler = function (deffered, error, ignoreError) {
                    deffered.resolve({ requestAgain: false, created: false });
                    if (!ignoreError())
                        this._preview._processError(DevExpress.Designer.getLocalization("Error obtaining a build status"), error);
                };
                PreviewHandlersHelper.prototype.doneGetBuildStatusHandler = function (deffered, documentId, response, stopProcessingPredicate) {
                    var _this = this;
                    try {
                        if (!response) {
                            deffered.resolve({ requestAgain: false });
                            return;
                        }
                        if (response.faultMessage) {
                            deffered.resolve({ requestAgain: false, pageCount: -1, error: response.faultMessage });
                            if (!stopProcessingPredicate())
                                this._preview._processError(response.faultMessage, null);
                            return;
                        }
                        this._preview.progressBar.progress() < response.progress && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate()
                            && this._preview.progressBar.progress(response.progress);
                        var wereNoPagesAndNewOnesExist = this._preview.pageIndex() === -1 && response.pageCount > 0;
                        if (wereNoPagesAndNewOnesExist) {
                            this._preview.pageIndex(0);
                        }
                        var brickProvider = this._preview.getPreviewPageBrickProvider(Preview.HandlerUri, documentId);
                        for (var i = 0; i < response.pageCount && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate(); i++) {
                            var createNewPage = function (index) {
                                return _this._preview.createPage(index, _this._preview._pageWidth, _this._preview._pageHeight, _this._preview._zoom, _this._preview._currentDocumentId, _this._preview._unifier, _this._preview._pageBackColor.peek(), brickProvider, null, _this._preview.createBrickClickProcessor(index));
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
                function PreviewRequestWrapper(handlers, _callbacks) {
                    this._callbacks = _callbacks;
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
                    DevExpress.Designer.ajax(Preview.HandlerUri, 'stopBuild', encodeURIComponent(id), undefined, function () { return true; });
                };
                PreviewRequestWrapper.prototype.sendCloseRequest = function (documentId, reportId) {
                    DevExpress.Designer.ajax(Preview.HandlerUri, 'close', encodeURIComponent(JSON.stringify({
                        reportId: reportId,
                        documentId: documentId
                    })), undefined, function () { return true; });
                };
                PreviewRequestWrapper.prototype.startBuildRequest = function () {
                    var parameters = this._parametersModel.serializeParameters();
                    this._callbacks && this._callbacks.parametersSubmitted && this._callbacks.parametersSubmitted(this._parametersModel, parameters);
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'startBuild', encodeURIComponent(JSON.stringify({
                        reportId: this._reportPreview.reportId,
                        reportUrl: this._reportPreview.reportUrl,
                        drillDownKeys: this._reportPreview["_drillDownState"],
                        sortingState: this._reportPreview["_sortingState"],
                        timeZoneOffset: 0 - new Date().getTimezoneOffset(),
                        parameters: parameters
                    })));
                };
                PreviewRequestWrapper.prototype.getBuildStatusRequest = function (documentId, shouldIgnoreError) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getBuildStatus', encodeURIComponent(JSON.stringify({
                        documentId: documentId,
                        timeOut: Math.max(5000, DevExpress.Report.Preview.TimeOut)
                    })), undefined, shouldIgnoreError);
                };
                PreviewRequestWrapper.prototype.getDocumentData = function (documentId, shouldIgnoreError) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getDocumentData', encodeURIComponent(documentId), undefined, shouldIgnoreError);
                };
                PreviewRequestWrapper.prototype.openReport = function (reportName) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'openReport', encodeURIComponent(reportName), Preview.MessageHandler.processError);
                };
                PreviewRequestWrapper.prototype.drillThrough = function (customData) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'drillThrough', encodeURIComponent(JSON.stringify({
                        reportId: this._reportPreview.reportId,
                        reportUrl: this._reportPreview.reportUrl,
                        documentId: this._reportPreview.documentId,
                        parameters: this._parametersModel.serializeParameters(),
                        editingFields: this._reportPreview.editingFieldsProvider().map(function (field) { return field.model(); }),
                        customData: customData
                    })));
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
                PreviewRequestWrapper.prototype.getEditingFieldHtml = function (value, editingFieldIndex) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, "getEditingFieldHtmlValue", encodeURIComponent(JSON.stringify({
                        documentId: this._reportPreview.documentId,
                        value: value,
                        editingFieldIndex: editingFieldIndex
                    })));
                };
                return PreviewRequestWrapper;
            })();
            Preview.PreviewRequestWrapper = PreviewRequestWrapper;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=web-document-viewer.js.map