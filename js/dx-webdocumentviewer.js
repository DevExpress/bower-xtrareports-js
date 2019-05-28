/**
* DevExpress HTML/JS Reporting (dx-webdocumentviewer.js)
* Version: 18.2.8
* Build date: 2019-04-22
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/NetComponents.xml
*/

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            var MultiValueEditorOptions = (function (_super) {
                __extends(MultiValueEditorOptions, _super);
                function MultiValueEditorOptions(value, items) {
                    var _this = _super.call(this) || this;
                    _this.selectedItems = ko.observable([]);
                    var values = value();
                    _this.value = value;
                    var valueHasMutated = function () {
                        _this.editorValue.notifySubscribers(_this.displayItems[0]);
                    };
                    _this._items = items.map(function (item) {
                        var selected = ko.observable(_this._isValueSelected(item.value, values));
                        return { selected: selected, value: item.value, displayValue: item.displayValue || item.value, toggleSelected: function () { selected(!selected()); valueHasMutated(); } };
                    });
                    _this._disposables.push(_this.selectedItems = ko.pureComputed(function () {
                        return _this._items.filter(function (item) { return item.selected(); });
                    }));
                    var selectionInProcess = ko.observable(false), isSelectedAllState, stringValue;
                    _this._disposables.push(_this.selectedValuesString = ko.pureComputed({
                        read: function () {
                            if (selectionInProcess())
                                return stringValue;
                            stringValue = "";
                            _this.selectedItems().forEach(function (item, index, array) {
                                stringValue += item.displayValue;
                                if (index < array.length - 1) {
                                    stringValue += ", ";
                                }
                            });
                            return stringValue;
                        },
                        write: function (newValue) { }
                    }));
                    _this._disposables.push(_this.isSelectedAll = ko.pureComputed({
                        read: function () {
                            if (selectionInProcess())
                                return isSelectedAllState;
                            var selectedItemCount = _this.selectedItems().length;
                            if (selectedItemCount > 0 && selectedItemCount < _this._items.length) {
                                return undefined;
                            }
                            isSelectedAllState = selectedItemCount === _this._items.length;
                            return isSelectedAllState;
                        },
                        write: function (newValue) {
                            isSelectedAllState = newValue;
                            try {
                                selectionInProcess(true);
                                _this._items.forEach(function (item) { item.selected(newValue); });
                            }
                            finally {
                                selectionInProcess(false);
                            }
                        }
                    }));
                    var selectAllItem = { selected: _this.isSelectedAll, value: null, displayValue: DevExpress.Analytics.getLocalization('(Select All)', "ASPxReportsStringId.WebDocumentViewer_SelectAll"), toggleSelected: function () { _this.isSelectedAll(!_this.isSelectedAll()); valueHasMutated(); } };
                    _this.displayItems = [selectAllItem].concat(_this._items);
                    _this.dataSource = _this.displayItems;
                    _this.editorValue = ko.observable(selectAllItem);
                    _this.updateValue = function () {
                        value(_this._items.filter(function (item) { return item.selected(); }).map(function (item) { return item.value; }));
                        valueHasMutated();
                    };
                    _this.onOptionChanged = function (e) {
                        if (e.name !== "opened" || e.value)
                            return;
                        _this.updateValue();
                    };
                    return _this;
                }
                MultiValueEditorOptions.prototype._isValueSelected = function (value, array) {
                    if (value instanceof Date) {
                        return array.filter(function (item) { return item - value === 0; }).length > 0;
                    }
                    return array.indexOf(value) !== -1;
                };
                return MultiValueEditorOptions;
            }(DevExpress.JS.Utils.Disposable));
            Preview.MultiValueEditorOptions = MultiValueEditorOptions;
            var MultiValueEditor = (function (_super) {
                __extends(MultiValueEditor, _super);
                function MultiValueEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
                    var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
                    _this.options = ko.observable(null);
                    _this._disposables.push(_this.value.subscribe(function (newVal) {
                        _this.options() && _this.options().dispose();
                        _this.options(_this._createOptions(newVal));
                    }));
                    _this.options(_this._createOptions(_this.value()));
                    _this._disposables.push(_this.options());
                    return _this;
                }
                MultiValueEditor.prototype._createOptions = function (helper) {
                    if (!helper)
                        return null;
                    return new MultiValueEditorOptions(helper.value, helper.items);
                };
                return MultiValueEditor;
            }(DevExpress.JS.Widgets.Editor));
            Preview.MultiValueEditor = MultiValueEditor;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            Preview.cultureInfo = {};
            Preview.editorTemplates = {
                multiValue: {
                    header: "dxrd-multivalue", extendedOptions: {
                        placeHolder: function () { return DevExpress.Analytics.Localization.selectPlaceholder(); },
                        onMultiTagPreparing: function (args) {
                            var selectedItemsLength = args.selectedItems.length, totalCount = args.model.items.length;
                            if (selectedItemsLength === totalCount) {
                                var stringFormat = DevExpress.Analytics.getLocalization("All selected ({0})", "ASPxReportsStringId.WebDocumentViewer_MultiValueEditor_AllSelected");
                                args.text = DevExpress.Analytics.Utils.formatUnicorn(stringFormat, selectedItemsLength);
                            }
                        }
                    }
                },
                multiValueEditable: { custom: "dxrd-multivalue-editable" },
                multiValueSelectBox: { header: "dxrd-multivalue-selectbox", editorType: Preview.MultiValueEditor },
                csvSeparator: { header: DevExpress.JS.Widgets.editorTemplates.text.header, extendedOptions: { placeholder: function () { return (DevExpress.Report.Preview.cultureInfo["csvTextSeparator"] || "") + " " + DevExpress.Designer.getLocalization("(Using System Separator)", "PreviewStringId.ExportOption_CsvSeparator_UsingSystem"); } } },
                selectBox: { header: "dx-selectbox" }
            };
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            Report.pageBorderColor = { propertyName: "pageBorderColor", modelName: "@PageBorderColor", from: Designer.colorFromString, toJsonObject: Designer.colorToString, displayName: "Page Border Color", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderColor", editor: Designer.Widgets.editorTemplates.customColorEditor, defaultVal: "Black" };
            Report.pageBorderWidth = { propertyName: "pageBorderWidth", modelName: "@PageBorderWidth", displayName: "Page Border Width", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderWidth", from: Designer.floatFromModel, editor: DevExpress.JS.Widgets.editorTemplates.numeric, defaultVal: 1 };
            Report.pageRange = { propertyName: "pageRange", modelName: "@PageRange", displayName: "Page Range", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.PageRange", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "" };
            Report.expotOptionsTitle = { propertyName: "title", modelName: "@Title", displayName: "Title", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.Title", editor: DevExpress.JS.Widgets.editorTemplates.text, defaultVal: "Document" };
            Report.htmlTableLayout = { propertyName: "tableLayout", modelName: "@TableLayout", displayName: "Table Layout", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.TableLayout", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: true };
            Report.docxTableLayout = { propertyName: "tableLayout", modelName: "@TableLayout", displayName: "Table Layout", localizationId: "DevExpress.XtraPrinting.DocxExportOptions.TableLayout", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false };
            Report.allowURLsWithJSContent = { propertyName: "allowURLsWithJSContent", modelName: "@AllowURLsWithJSContent", displayName: "Allow URLs with JS Content", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.AllowURLsWithJSContent", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: true };
            Report.rasterizationResolution = { propertyName: "rasterizationResolution", modelName: "@RasterizationResolution", displayName: "Rasterization Resolution", localizationId: "DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizationResolution", editor: DevExpress.JS.Widgets.editorTemplates.numeric, defaultVal: 96 };
            Report.rasterizeImages = { propertyName: "rasterizeImages", modelName: "@RasterizeImages", displayName: "Rasterize Images", localizationId: "DevExpress.XtraPrinting.PageByPageExportOptionsBase.RasterizeImages", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.useHRefHyperlinks = { propertyName: "useHRefHyperlinks", modelName: "@UseHRefHyperlinks", displayName: "Use HRef Hyperlinks", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.UseHRefHyperlinks", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false };
            Report.exportWatermarks = { propertyName: "exportWatermarks", modelName: "@ExportWatermarks", displayName: "Export Watermarks", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportWatermarks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.inlineCss = { propertyName: "inlineCss", modelName: "@InlineCss", displayName: "Inline CSS", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.InlineCss", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.removeSecondarySymbols = { propertyName: "removeSecondarySymbols", modelName: "@RemoveSecondarySymbols", displayName: "Remove Secondary Symbols", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.RemoveSecondarySymbols", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false };
            Report.characterSet = {
                propertyName: "characterSet", modelName: "@CharacterSet", displayName: "Character Set", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.CharacterSet", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "utf-8",
                valuesArray: [{ value: "windows-1256", displayValue: "Arabic (Windows)" }, { value: "iso-8859-4", displayValue: "Baltic (ISO)" }, { value: "windows-1257", displayValue: "Baltic (Windows)" }, { value: "iso-8859-2", displayValue: "Central European (ISO)" }, { value: "windows-1250", displayValue: "Central European (Windows)" }, { value: "iso-8859-5", displayValue: "Cyrillic (ISO)" }, { value: "koi8-r", displayValue: "Cyrillic (KOI8-r)" }, { value: "windows-1251", displayValue: "Cyrillic (Windows)" }, { value: "iso-8859-15", displayValue: "Latin 9 (ISO)" }, { value: "utf-7", displayValue: "Unicode (UTF-7)" }, { value: "utf-8", displayValue: "Unicode (UTF-8)" }, { value: "iso-8859-1", displayValue: "Western European (ISO)" }, { value: "windows-1252", displayValue: "Western European (Windows)" }]
            };
            function getExportModeValues(format, preview, merged) {
                if (format === void 0) { format = "Html"; }
                var singleFile = { value: "SingleFile", displayValue: "Single File", localizationId: DevExpress.JS.Utils.formatUnicorn("PreviewStringId.ExportOption_{0}ExportMode_SingleFile", format) };
                var singleFilePageByPage = { value: "SingleFilePageByPage", displayValue: "Single File PageByPage", localizationId: DevExpress.JS.Utils.formatUnicorn("PreviewStringId.ExportOption_{0}ExportMode_SingleFilePageByPage", format) };
                var differentFiles = { value: "DifferentFiles", displayValue: "Different Files", localizationId: DevExpress.JS.Utils.formatUnicorn("PreviewStringId.ExportOption_{0}ExportMode_DifferentFiles", format) };
                var values = [];
                if (merged) {
                    return [singleFilePageByPage];
                }
                else if (preview) {
                    return [singleFile, singleFilePageByPage];
                }
                else {
                    return [singleFile, singleFilePageByPage, differentFiles];
                }
            }
            Report.getExportModeValues = getExportModeValues;
            Report.exportPageBreaks = { propertyName: "exportPageBreaks", modelName: "@ExportPageBreaks", displayName: "Export Page Breaks", localizationId: "DevExpress.XtraPrinting.FormattedTextExportOptions.ExportPageBreaks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
            Report.rtfExportMode = {
                propertyName: "rtfExportMode", modelName: "@ExportMode", defaultVal: "SingleFilePageByPage",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.RtfExportOptions.ExportMode",
                valuesArray: getExportModeValues("Rtf", true)
            };
            Report.docxExportMode = {
                propertyName: "docxExportMode", modelName: "@ExportMode", defaultVal: "SingleFilePageByPage",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.DocxExportOptions.ExportMode",
                valuesArray: getExportModeValues("Docx", true)
            };
            Report.rtfExportModeMergedPreview = $.extend({}, Report.rtfExportMode, {
                valuesArray: getExportModeValues("Rtf", true, true)
            });
            Report.docxExportModeMergedPreview = $.extend({}, Report.docxExportMode, {
                valuesArray: getExportModeValues("Docx", true, true)
            });
            Report.htmlExportMode = {
                propertyName: "htmlExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportMode",
                valuesArray: getExportModeValues("Html")
            };
            Report.embedImagesInHTML = {
                propertyName: "embedImagesInHTML", modelName: "@EmbedImagesInHTML", defaultVal: false,
                editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, displayName: "Embed Images In HTML", localizationId: "DevExpress.XtraPrinting.HtmlExportOptions.EmbedImagesInHTML"
            };
            Report.imageExportMode = {
                propertyName: "imageExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.ImageExportOptions.ExportMode",
                valuesArray: getExportModeValues("Image")
            };
            Report.xlsExportMode = {
                propertyName: "xlsExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.ExportMode",
                valuesArray: getExportModeValues("Xls")
            };
            Report.xlsxExportMode = {
                propertyName: "xlsxExportMode", modelName: "@ExportMode", defaultVal: "SingleFile",
                editor: DevExpress.JS.Widgets.editorTemplates.combobox, displayName: "Export Mode", localizationId: "DevExpress.XtraPrinting.XlsxExportOptions.ExportMode",
                valuesArray: getExportModeValues("Xlsx")
            };
            function getTextExportModeValues() {
                return [
                    { value: "Text", displayValue: "Text", localizationId: "DevExpress.XtraPrinting.TextExportMode.Text" },
                    { value: "Value", displayValue: "Value", localizationId: "DevExpress.XtraPrinting.TextExportMode.Value" }
                ];
            }
            Report.textExportMode = {
                propertyName: "textExportMode", modelName: "@TextExportMode", displayName: "Text Export Mode", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.TextExportMode", defaultVal: "Text", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: getTextExportModeValues()
            };
            Report.xlsTextExportMode = {
                propertyName: "textExportMode", modelName: "@TextExportMode", displayName: "Text Export Mode", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.TextExportMode", defaultVal: "Value", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: getTextExportModeValues()
            };
            Report.csvTextSeparator = { propertyName: "separator", modelName: "@Separator", defaultVal: "", displayName: "Separator", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.Separator", editor: DevExpress.Report.Preview.editorTemplates.csvSeparator }, Report.useCustomSeparator = { propertyName: "useCustomSeparator", displayName: "Use Custom Separator", localizationId: "DevExpress.XtraPrinting.CsvExportOptions.UseCustomSeparator", editor: DevExpress.JS.Widgets.editorTemplates.bool };
            Report.textEncodingType = {
                propertyName: "encodingType", modelName: "@EncodingType", displayName: "Encoding", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.Encoding", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Default", from: Designer.fromEnum,
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
                propertyName: "exportHyperlinks", modelName: "@ExportHyperlinks", displayName: "Export Hyperlinks", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.ExportHyperlinks", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsRawDataMode = {
                propertyName: "rawDataMode", modelName: "@RawDataMode", displayName: "Raw Data Mode", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.RawDataMode", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsShowGridLines = {
                propertyName: "showGridLines", modelName: "@ShowGridLines", displayName: "Show Grid Lines", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.ShowGridLines", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool
            };
            Report.xlsExportOptionsSheetName = {
                propertyName: "sheetName", modelName: "@SheetName", displayName: "Sheet Name", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.SheetName", defaultVal: "Sheet", editor: DevExpress.JS.Widgets.editorTemplates.text
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
                editor: Report.htmlExportMode.editor, displayName: Report.htmlExportMode.displayName, localizationId: Report.htmlExportMode.localizationId
            };
            Report.htmlExportModePreview = $.extend({}, Report.htmlExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: getExportModeValues("Html", true)
            });
            Report.htmlExportModeMergedPreview = $.extend({}, Report.htmlExportModePreviewBase, {
                valuesArray: getExportModeValues("Html", true, true)
            });
            Report.xlsExportModePreviewBase = {
                propertyName: Report.xlsExportMode.propertyName, modelName: Report.xlsExportMode.modelName, defaultVal: Report.xlsExportMode.defaultVal,
                editor: Report.xlsExportMode.editor, displayName: Report.xlsExportMode.displayName, localizationId: Report.xlsExportMode.localizationId
            };
            Report.xlsExportModePreview = $.extend({}, Report.xlsExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: getExportModeValues("Xls", true)
            });
            Report.xlsExportModeMergedPreview = $.extend({}, Report.xlsExportModePreviewBase, {
                valuesArray: getExportModeValues("Xls", true, true)
            });
            Report.imageExportModePreviewBase = {
                propertyName: Report.imageExportMode.propertyName, modelName: Report.imageExportMode.modelName, defaultVal: Report.imageExportMode.defaultVal,
                editor: Report.imageExportMode.editor, displayName: Report.imageExportMode.displayName, localizationId: Report.imageExportMode.localizationId
            };
            Report.imageExportModePreview = $.extend({}, Report.imageExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: getExportModeValues("Image", true)
            });
            Report.imageExportModeMergedPreview = $.extend({}, Report.imageExportModePreviewBase, {
                valuesArray: getExportModeValues("Image", true, true)
            });
            Report.xlsxExportModePreviewBase = {
                propertyName: Report.xlsxExportMode.propertyName, modelName: Report.xlsxExportMode.modelName, defaultVal: Report.xlsxExportMode.defaultVal,
                editor: Report.xlsxExportMode.editor, displayName: Report.xlsxExportMode.displayName, localizationId: Report.xlsxExportMode.localizationId
            };
            Report.xlsxExportModePreview = $.extend({}, Report.xlsxExportModePreviewBase, {
                from: excludeDifferentFilesMode,
                valuesArray: getExportModeValues("Xlsx", true)
            });
            Report.xlsxExportModeMergedPreview = $.extend({}, Report.xlsxExportModePreviewBase, {
                valuesArray: getExportModeValues("Xlsx", true, true)
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
                Text: { text: "Text", textId: "ASPxReportsStringId.ExportName_txt", format: "txt", propertyName: "textExportOptions" },
                CSV: { text: "CSV", textId: "ASPxReportsStringId.ExportName_csv", format: "csv" },
                Image: { text: "Image", textId: "ASPxReportsStringId.ExportName_png", format: "image" },
                DOCX: { text: "DOCX", textId: "ASPxReportsStringId.ExportName_docx", format: "docx" }
            };
            var ExportOptionsModel = (function () {
                function ExportOptionsModel(reportPreview) {
                    var _this = this;
                    this.actions = [];
                    this._reportPreview = reportPreview;
                    this.tabInfo = new DevExpress.Designer.TabInfo({
                        text: "Export Options",
                        template: "dxrd-preview-export-options",
                        model: reportPreview.exportOptionsModel,
                        localizationId: 'DevExpress.XtraPrinting.ExportOptions',
                        imageClassName: "properties",
                        imageTemplateName: "dxrd-svg-tabs-properties",
                        visible: ko.pureComputed(function () { return !!reportPreview.exportOptionsModel() && (!reportPreview.exportOptionsTabVisible || reportPreview.exportOptionsTabVisible()); })
                    });
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
                                    imageTemplateName: "dxrd-svg-preview-export-export-to",
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
            }());
            Preview.ExportOptionsModel = ExportOptionsModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            var CsvExportOptions = (function () {
                function CsvExportOptions(model, serializer) {
                    var _this = this;
                    this.defaultSeparatorValue = "";
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                    this.useCustomSeparator = ko.observable(this.separator && this.separator() !== this.defaultSeparatorValue);
                    var separatorValue = ko.observable(this.separator());
                    this.useCustomSeparator.subscribe(function (newValue) {
                        if (!newValue)
                            separatorValue(_this.defaultSeparatorValue);
                    });
                    this.separator = ko.computed({
                        read: function () { return separatorValue(); },
                        write: function (newValue) {
                            separatorValue(newValue);
                            if (_this.useCustomSeparator)
                                _this.useCustomSeparator(newValue !== _this.defaultSeparatorValue);
                        }
                    });
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
                CsvExportOptions.prototype.isPropertyDisabled = function (name) {
                    return (name === "separator") && !(this.useCustomSeparator && this.useCustomSeparator());
                };
                return CsvExportOptions;
            }());
            Report.CsvExportOptions = CsvExportOptions;
            var csvExportOptionsSerializationInfo = [
                Report.textEncodingType,
                Report.textExportMode,
                { propertyName: "quoteStringsWithSeparators", modelName: "@QuoteStringsWithSeparators", displayName: "Quote Strings with Separators", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                Report.useCustomSeparator, Report.csvTextSeparator,
                { propertyName: "skipEmptyRows", modelName: "@SkipEmptyRows", displayName: "Skip Empty Rows", localizationId: "DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyRows", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "skipEmptyColumns", modelName: "@SkipEmptyColumns", displayName: "Skip Empty Columns", localizationId: "DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyColumns", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
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
                    return ((name === "pageRange") || (name === "pageBorderWidth")) && ((this.imageExportMode ? this.imageExportMode() : Report.imageExportMode.defaultVal) === "SingleFile");
                };
                return ImageExportOptions;
            }());
            Report.ImageExportOptions = ImageExportOptions;
            var imageExportOptionsSerializationInfoBase = [
                Report.pageBorderColor,
                Report.pageBorderWidth,
                Report.pageRange,
                { propertyName: "resolution", modelName: "@Resolution", displayName: "Resolution", localizationId: "DevExpress.XtraPrinting.ImageExportOptions.Resolution", editor: DevExpress.JS.Widgets.editorTemplates.numeric, defaultVal: 96 },
                {
                    propertyName: "format", modelName: "@Format", displayName: "Format", localizationId: "DevExpress.XtraPrinting.ImageExportOptions.Format", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Png", from: Designer.fromEnum,
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
                { propertyName: "retainBackgroundTransparency", modelName: "@RetainBackgroundTransparency", displayName: "Retain Background Transparency", localizationId: "DevExpress.XtraPrinting.ImageExportOptions.RetainBackgroundTransparency", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "textRenderingMode", modelName: "@TextRenderingMode", displayName: "Text Rendering Mode", localizationId: "DevExpress.XtraPrinting.ImageExportOptions.TextRenderingMode", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "SystemDefault", from: Designer.fromEnum,
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
                Report.rasterizationResolution,
                Report.expotOptionsTitle,
                Report.htmlTableLayout,
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
                    return ((name === "pageRange") || (name === "pageBorderWidth") || (name === "exportWatermarks")) && ((this.htmlExportMode ? this.htmlExportMode() : Report.htmlExportMode.defaultVal) === "SingleFile");
                };
                return HtmlExportOptions;
            }());
            Report.HtmlExportOptions = HtmlExportOptions;
            var mhtExportOptionsSerializationInfoBase = [
                Report.pageBorderColor,
                Report.pageBorderWidth,
                Report.pageRange,
                Report.rasterizationResolution,
                Report.expotOptionsTitle,
                Report.characterSet,
                Report.htmlTableLayout,
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
                    return ((name === "pageRange") || (name === "pageBorderWidth")) && ((this.htmlExportMode ? this.htmlExportMode() : Report.htmlExportMode.defaultVal) === "SingleFile");
                };
                return MhtExportOptions;
            }());
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
            }());
            Report.PdfExportDocumentOptions = PdfExportDocumentOptions;
            var author = { propertyName: "author", modelName: "@Author", displayName: "Author", localizationId: "DevExpress.XtraPrinting.PdfDocumentOptions.Author", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, application = { propertyName: "application", modelName: "@Application", displayName: "Application", localizationId: "DevExpress.XtraPrinting.PdfDocumentOptions.Application", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, title = { propertyName: "title", modelName: "@Title", displayName: "Title", localizationId: "DevExpress.XtraPrinting.PdfDocumentOptions.Title", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }, subject = { propertyName: "subject", modelName: "@Subject", displayName: "Subject", localizationId: "DevExpress.XtraPrinting.PdfDocumentOptions.Subject", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text };
            var pdfExportDocumentOptionsSerializationInfo = [
                author, application, title, subject,
                { propertyName: "keywords", modelName: "@Keywords", displayName: "Keywords", localizationId: "DevExpress.XtraPrinting.PdfDocumentOptions.Keywords", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }
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
            }());
            Report.PdfPermissionsOptions = PdfPermissionsOptions;
            var pdfExportPermissionsOptionsSerializationInfo = [
                {
                    propertyName: "printingPermissions", modelName: "@PrintingPermissions", displayName: "Printing Permissions", localizationId: "DevExpress.XtraPrinting.PdfPermissionsOptions.PrintingPermissions", defaultVal: "None", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.None" },
                        { value: "LowResolution", displayValue: "LowResolution", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.LowResolution" },
                        { value: "HighResolution", displayValue: "HighResolution", localizationId: "DevExpress.XtraPrinting.PrintingPermissions.HighResolution" }
                    ]
                },
                {
                    propertyName: "changingPermissions", modelName: "@ChangingPermissions", displayName: "Changing Permissions", localizationId: "DevExpress.XtraPrinting.PdfPermissionsOptions.ChangingPermissions", defaultVal: "None", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                    valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.None" },
                        { value: "InsertingDeletingRotating", displayValue: "InsertingDeletingRotating", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.InsertingDeletingRotating" },
                        { value: "FillingSigning", displayValue: "FillingSigning", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.FillingSigning" },
                        { value: "CommentingFillingSigning", displayValue: "CommentingFillingSigning", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.CommentingFillingSigning" },
                        { value: "AnyExceptExtractingPages", displayValue: "AnyExceptExtractingPages", localizationId: "DevExpress.XtraPrinting.ChangingPermissions.AnyExceptExtractingPages" }
                    ]
                },
                { propertyName: "enableCopying", modelName: "@EnableCopying", displayName: "Enable Copying", localizationId: "DevExpress.XtraPrinting.PdfPermissionsOptions.EnableCopying", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "enableScreenReaders", modelName: "@EnableScreenReaders", displayName: "Enable Screen Readers", localizationId: "DevExpress.XtraPrinting.PdfPermissionsOptions.EnableScreenReaders", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
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
                    if (!(this.permissionsPassword && this.permissionsPassword())) {
                        if (name === "permissionsOptions")
                            return true;
                        if (name === pdfEncryptionLevel.propertyName)
                            return !(this.openPassword && this.openPassword());
                        return false;
                    }
                };
                PdfPasswordSecurityOptions.prototype.hasSensitiveData = function () {
                    return !!(this.openPassword && this.openPassword() || this.permissionsPassword && this.permissionsPassword());
                };
                return PdfPasswordSecurityOptions;
            }());
            Report.PdfPasswordSecurityOptions = PdfPasswordSecurityOptions;
            var pdfEncryptionLevel = {
                propertyName: "encryptionLevel", modelName: "@EncryptionLevel", displayName: "Encryption Level", localizationId: "DevExpress.XtraPrinting.PdfPasswordSecurityOptions.EncryptionLevel", defaultVal: "AES128", editor: DevExpress.JS.Widgets.editorTemplates.combobox,
                valuesArray: [
                    { value: "ARC4", displayValue: "ARC4", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.ARC4" },
                    { value: "AES128", displayValue: "AES128", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.AES128" },
                    { value: "AES256", displayValue: "AES256", localizationId: "DevExpress.XtraPrinting.PdfEncryptionLevel.AES256" },
                ]
            };
            var pdfExportPasswordSecurityOptionsSerializationInfo = [
                { propertyName: "openPassword", modelName: "@OpenPassword", displayName: "Open Password", localizationId: "DevExpress.XtraPrinting.PdfPasswordSecurityOptions.OpenPassword", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } },
                pdfEncryptionLevel,
                { propertyName: "permissionsPassword", modelName: "@PermissionsPassword", displayName: "Permissions Password", localizationId: "DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PermissionsPassword", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } },
                { propertyName: "permissionsOptions", modelName: "PermissionsOptions", displayName: "Pdf Permissions Options", localizationId: "DevExpress.XtraPrinting.PdfPermissionsOptions", from: PdfPermissionsOptions.from, toJsonObject: PdfPermissionsOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
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
                PdfExportOptions.prototype.isPropertyDisabled = function (propertyName) {
                    var compatibility = this.pdfACompatibility ? this.pdfACompatibility() : pdfACompatibility.defaultVal;
                    if (compatibility === pdfACompatibilityValues.None)
                        return false;
                    if (compatibility === pdfACompatibilityValues.PdfA1b)
                        return propertyName === "exportEditingFieldsToAcroForms";
                    return propertyName === "neverEmbeddedFonts"
                        || propertyName === "pdfPasswordSecurityOptions"
                        || propertyName === "showPrintDialogOnOpen";
                };
                PdfExportOptions.prototype.getInfo = function () {
                    return pdfExportOptionsSerializationInfo;
                };
                PdfExportOptions.prototype.hasSensitiveData = function () {
                    return this.pdfPasswordSecurityOptions && this.pdfPasswordSecurityOptions.hasSensitiveData();
                };
                return PdfExportOptions;
            }());
            Report.PdfExportOptions = PdfExportOptions;
            var pdfACompatibilityValues = { None: "None", PdfA1b: "PdfA1b", PdfA2b: "PdfA2b", PdfA3b: "PdfA3b" };
            var pdfACompatibility = {
                propertyName: "pdfACompatibility", modelName: "@PdfACompatibility", displayName: "PDF A Compatibility", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.PdfACompatibility", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: pdfACompatibilityValues.None, from: Designer.fromEnum,
                valuesArray: [
                    { value: pdfACompatibilityValues.None, displayValue: pdfACompatibilityValues.None, localizationId: "DevExpress.XtraPrinting.PdfACompatibility.None" },
                    { value: pdfACompatibilityValues.PdfA1b, displayValue: pdfACompatibilityValues.PdfA1b, localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA1b" },
                    { value: pdfACompatibilityValues.PdfA2b, displayValue: pdfACompatibilityValues.PdfA2b, localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA2b" },
                    { value: pdfACompatibilityValues.PdfA3b, displayValue: pdfACompatibilityValues.PdfA3b, localizationId: "DevExpress.XtraPrinting.PdfACompatibility.PdfA3b" }
                ]
            };
            var pdfExportOptionsSerializationInfo = [
                { propertyName: "convertImagesToJpeg", modelName: "@ConvertImagesToJpeg", displayName: "Convert Images to Jpeg", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.ConvertImagesToJpeg", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "showPrintDialogOnOpen", modelName: "@ShowPrintDialogOnOpen", displayName: "Show Print Dialog on Open", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.ShowPrintDialogOnOpen", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "compressed", modelName: "@Compressed", displayName: "Compressed", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.Compressed", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "neverEmbeddedFonts", modelName: "@NeverEmbeddedFonts", displayName: "Never Embedded Fonts", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.NeverEmbeddedFonts", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "exportEditingFieldsToAcroForms", modelName: "@ExportEditingFieldsToAcroForms", displayName: "Export Editing Fields To AcroForms", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.ExportEditingFieldsToAcroForms", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "imageQuality", modelName: "@ImageQuality", displayName: "Image Quality", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.ImageQuality", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "Highest", from: Designer.fromEnum,
                    valuesArray: [
                        { value: "Lowest", displayValue: "Lowest", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Lowest" },
                        { value: "Low", displayValue: "Low", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Low" },
                        { value: "Medium", displayValue: "Medium", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Medium" },
                        { value: "High", displayValue: "High", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.High" },
                        { value: "Highest", displayValue: "Highest", localizationId: "DevExpress.XtraPrinting.PdfJpegImageQuality.Highest" }
                    ]
                },
                pdfACompatibility,
                Report.pageRange,
                Report.rasterizationResolution,
                { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.DocumentOptions", from: PdfExportDocumentOptions.from, toJsonObject: PdfExportDocumentOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "pdfPasswordSecurityOptions", modelName: "PasswordSecurityOptions", displayName: "Pdf Password Security Options", localizationId: "DevExpress.XtraPrinting.PdfPasswordSecurityOptions", from: PdfPasswordSecurityOptions.from, toJsonObject: PdfPasswordSecurityOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var PrintPreviewOptions = (function () {
                function PrintPreviewOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                PrintPreviewOptions.from = function (model, serializer) {
                    return new PrintPreviewOptions(model || {}, serializer);
                };
                PrintPreviewOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, printPreviewOptionsSerializationInfo, refs);
                };
                PrintPreviewOptions.prototype.getInfo = function () {
                    return printPreviewOptionsSerializationInfo;
                };
                return PrintPreviewOptions;
            }());
            Report.PrintPreviewOptions = PrintPreviewOptions;
            var printPreviewOptionsSerializationInfo = [
                { propertyName: "defaultFileName", modelName: "@DefaultFileName", displayName: "Default File Name", localizationId: "DevExpress.XtraPrinting.PrintPreviewOptions.DefaultFileName", defaultVal: "Document", editor: DevExpress.JS.Widgets.editorTemplates.text }
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
                    var exportMode = this.rtfExportMode ? this.rtfExportMode() : Report.rtfExportMode.defaultVal;
                    if (name === "pageRange")
                        return exportMode === "SingleFile";
                    else if (name === "emptyFirstPageHeaderFooter" || name === "exportPageBreaks" || name === "keepRowHeight") {
                        return exportMode === "SingleFilePageByPage";
                    }
                };
                return RtfExportOptions;
            }());
            Report.RtfExportOptions = RtfExportOptions;
            var rtfExportOptionsSerializationInfoBase = [
                Report.pageRange,
                Report.rasterizationResolution,
                Report.exportWatermarks
            ];
            var emptyFirstPageHeaderFooter = { propertyName: "emptyFirstPageHeaderFooter", modelName: "@EmptyFirstPageHeaderFooter", displayName: "Empty First Page Header/Footer", localizationId: "DevExpress.XtraPrinting.FormattedTextExportOptions.EmptyFirstPageHeaderFooter", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }, keepRowHeight = { propertyName: "keepRowHeight", modelName: "@KeepRowHeight", displayName: "Keep Row Height", localizationId: "DevExpress.XtraPrinting.FormattedTextExportOptions.KeepRowHeight", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool };
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
            }());
            Report.TextExportOptions = TextExportOptions;
            var textExportOptionsSerializationInfo = [
                Report.textEncodingType,
                { propertyName: "quoteStringsWithSeparators", modelName: "@QuoteStringsWithSeparators", displayName: "Quote Strings with Separators", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "separator", modelName: "@Separator", displayName: "Separator", localizationId: "DevExpress.XtraPrinting.TextExportOptionsBase.Separator", defaultVal: "TAB", editor: DevExpress.JS.Widgets.editorTemplates.text },
                Report.textExportMode
            ];
            var documentOptionsSerializationsInfo = [
                author, application, title, subject,
                { propertyName: "tags", modelName: "@Tags", displayName: "Tags", localizationId: "DevExpress.XtraPrinting.XlDocumentOptions.Tags", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "category", modelName: "@Category", displayName: "Category", localizationId: "DevExpress.XtraPrinting.XlDocumentOptions.Category", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "comments", modelName: "@Comments", displayName: "Comments", localizationId: "DevExpress.XtraPrinting.XlDocumentOptions.Comments", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "company", modelName: "@Company", displayName: "Company", localizationId: "DevExpress.XtraPrinting.XlDocumentOptions.Company", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text }
            ];
            var documentOptions = { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.DocumentOptions", info: documentOptionsSerializationsInfo, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var encryptionOptionsSerializationsInfo = [
                {
                    propertyName: "type", modelName: "@Type", displayName: "Type", localizationId: "DevExpress.XtraPrinting.XlEncryptionOptions.Type", defaultVal: "Strong", editor: DevExpress.JS.Widgets.editorTemplates.combobox, from: Designer.fromEnum,
                    valuesArray: [
                        { value: "Strong", displayValue: "Strong", localizationId: "DevExpress.XtraPrinting.XlEncryptionType.Strong" },
                        { value: "Compatible", displayValue: "Compatible", localizationId: "DevExpress.XtraPrinting.XlEncryptionType.Compatible" }
                    ]
                },
                { propertyName: "password", modelName: "@Password", displayName: "Password", localizationId: "DevExpress.XtraPrinting.XlEncryptionOptions.Password", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text, editorOptions: { mode: 'password' } }
            ];
            var encryptionOptions = { propertyName: "encryptionOptions", modelName: "EncryptionOptions", displayName: "Encryption Options", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.EncryptionOptions", info: encryptionOptionsSerializationsInfo, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var xlsExportOptionsSerializationInfoCommon = [
                Report.xlsExportHyperlinks,
                Report.pageRange,
                Report.xlsRawDataMode,
                Report.xlsExportOptionsSheetName,
                Report.xlsShowGridLines,
                Report.xlsTextExportMode,
                Report.rasterizeImages,
                Report.rasterizationResolution,
                { propertyName: "fitToPrintedPageWidth", modelName: "@FitToPrintedPageWidth", displayName: "Fit To Printed Page Width", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageWidth", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "fitToPrintedPageHeight", modelName: "@FitToPrintedPageHeight", displayName: "Fit To Printed Page Height", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageHeight", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "ignoreErrors", modelName: "@IgnoreErrors", displayName: "Ignore Errors", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.IgnoreErrors", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "None", from: Designer.fromEnum, valuesArray: [
                        { value: "None", displayValue: "None", localizationId: "DevExpress.XtraPrinting.XlIgnoreErrors.None" },
                        { value: "NumberStoredAsText", displayValue: "Number Stored As Text", localizationId: "DevExpress.XtraPrinting.XlIgnoreErrors.NumberStoredAsText" }
                    ]
                },
                {
                    propertyName: "rightToLeftDocument", modelName: "@RightToLeftDocument", displayName: "Right To Left Document", localizationId: "DevExpress.XtraPrinting.XlExportOptionsBase.RightToLeftDocument", defaultVal: "Default", from: Designer.fromEnum, editor: DevExpress.JS.Widgets.editorTemplates.combobox, valuesArray: [
                        { value: "True", displayValue: "True", localizationId: "DevExpress.Utils.DefaultBoolean.True" },
                        { value: "False", displayValue: "False", localizationId: "DevExpress.Utils.DefaultBoolean.False" },
                        { value: "Default", displayValue: "Default", localizationId: "DevExpress.Utils.DefaultBoolean.Default" }
                    ]
                },
                documentOptions,
                encryptionOptions
            ];
            var xlsExportOptionsSerializationInfoBase = [
                { propertyName: "suppress256ColumnsWarning", modelName: "@Suppress256ColumnsWarning", displayName: "Suppress 256 Columns Warning", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.Suppress256ColumnsWarning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "suppress65536RowsWarning", modelName: "@Suppress65536RowsWarning", displayName: "Suppress 65536 Rows Warning", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.Suppress65536RowsWarning", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                {
                    propertyName: "workbookColorPaletteCompliance", modelName: "@WorkbookColorPaletteCompliance", displayName: "Workbook Color Palette Compliance", localizationId: "DevExpress.XtraPrinting.XlsExportOptions.WorkbookColorPaletteCompliance", editor: DevExpress.JS.Widgets.editorTemplates.combobox, defaultVal: "ReducePaletteForExactColors", from: Designer.fromEnum,
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
                    return name === "pageRange" && (this.xlsExportMode ? this.xlsExportMode() : Report.xlsExportMode.defaultVal) === "SingleFile";
                };
                XlsExportOptions.prototype.hasSensitiveData = function () {
                    return !!(this.encryptionOptions && this.encryptionOptions.password());
                };
                return XlsExportOptions;
            }());
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
                    return name === "pageRange" && (this.xlsxExportMode ? this.xlsxExportMode() : Report.xlsxExportMode.defaultVal) === "SingleFile";
                };
                XlsxExportOptions.prototype.hasSensitiveData = function () {
                    return !!(this.encryptionOptions && this.encryptionOptions.password());
                };
                return XlsxExportOptions;
            }());
            Report.XlsxExportOptions = XlsxExportOptions;
            var DocxExportDocumentOptions = (function () {
                function DocxExportDocumentOptions(model, serializer) {
                    serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                DocxExportDocumentOptions.from = function (model, serializer) {
                    return new DocxExportDocumentOptions(model || {}, serializer);
                };
                DocxExportDocumentOptions.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, docxExportDocumentOptionsSerializationInfo, refs);
                };
                DocxExportDocumentOptions.prototype.getInfo = function () {
                    return docxExportDocumentOptionsSerializationInfo;
                };
                return DocxExportDocumentOptions;
            }());
            Report.DocxExportDocumentOptions = DocxExportDocumentOptions;
            var docxExportDocumentOptionsSerializationInfo = [
                { propertyName: "title", modelName: "@Title", localizationId: "DevExpress.XtraPrinting.DocxDocumentOptions.Title", displayName: "Title", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "subject", modelName: "@Subject", localizationId: "DevExpress.XtraPrinting.DocxDocumentOptions.Subject", displayName: "Subject", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "keywords", modelName: "@Keywords", localizationId: "DevExpress.XtraPrinting.DocxDocumentOptions.Keywords", displayName: "Keywords", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "category", modelName: "@Category", localizationId: "DevExpress.XtraPrinting.DocxDocumentOptions.Category", displayName: "Category", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "comments", modelName: "@Comments", localizationId: "DevExpress.XtraPrinitng.DocxDocumentOptions.Comments", displayName: "Comments", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "author", modelName: "@Author", localizationId: "DevExpress.XtraPrinting.DocxDocumentOptions.Author", displayName: "Author", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
            ];
            Report.docxDocumentOptions = { propertyName: "documentOptions", modelName: "DocumentOptions", displayName: "Document Options", localizationId: "DevExpress.XtraPrinting.DocxExportOptions.DocumentOptions", from: DocxExportDocumentOptions.from, toJsonObject: DocxExportDocumentOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor };
            var docxExportOptionsSerializationInfo = [
                Report.docxExportMode,
                Report.exportWatermarks,
                Report.pageRange,
                Report.rasterizeImages,
                Report.rasterizationResolution,
                emptyFirstPageHeaderFooter,
                keepRowHeight,
                Report.exportPageBreaks,
                Report.docxTableLayout,
                { propertyName: "allowFloatingPictures", modelName: "@AllowFloatingPictures", localizationId: "DevExpress.XtraPrinting.DocxExportOptions.AllowFloatingPictures", displayName: "Allow Floating Pictures", editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool, defaultVal: false },
                Report.docxDocumentOptions,
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
                    var exportMode = this.docxExportMode ? this.docxExportMode() : Report.docxExportMode.defaultVal;
                    if (name === "pageRange" || name === "tableLayout")
                        return exportMode === "SingleFile";
                    else if (name === "emptyFirstPageHeaderFooter" || name === "exportPageBreaks") {
                        return exportMode === "SingleFilePageByPage";
                    }
                    else if (name === "keepRowHeight") {
                        return exportMode === "SingleFilePageByPage" && !this.tableLayout();
                    }
                };
                return DocxExportOptions;
            }());
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
            }());
            Report.ExportOptions = ExportOptions;
            var nativeFormatOptionsSerializationInfo = [
                { propertyName: "compressed", modelName: "@Compressed", displayName: "Compressed", localizationId: "DevExpress.XtraPrinting.PdfExportOptions.Compressed", defaultVal: true, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool },
                { propertyName: "showOptionsBeforeSave", modelName: "@ShowOptionsBeforeSave", displayName: "Show Options Before Save", localizationId: "DevExpress.XtraPrinting.NativeFormatOptions.ShowOptionsBeforeSave", defaultVal: false, editor: DevExpress.JS.Widgets.editorTemplates.bool, from: Designer.parseBool }
            ];
            var additionalRecipientSerializationsInfo = [
                { propertyName: "ContactName", modelName: "@ContactName", displayName: "ContactName", localizationId: "DevExpress.XtraPrinting.Recipient.ContactName", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "Address", modelName: "@Address", displayName: "Address", localizationId: "DevExpress.XtraPrinting.Recipient.Address", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "Prefix", modelName: "@Prefix", displayName: "Prefix", localizationId: "DevExpress.XtraPrinting.Recipient.Prefix", defaultVal: "SMTP:", editor: DevExpress.JS.Widgets.editorTemplates.text },
                {
                    propertyName: "fieldType", modelName: "@FieldType", displayName: "Field Type", localizationId: "DevExpress.XtraPrinting.Recipient.FieldType", defaultVal: "TO", editor: DevExpress.JS.Widgets.editorTemplates.combobox, from: Designer.fromEnum,
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
            }());
            Report.AdditionalRecipientModel = AdditionalRecipientModel;
            Report.additionalRecipients = { propertyName: "additionalRecipients", modelName: "AdditionalRecipients", displayName: "Additional Recipients", localizationId: "DevExpress.XtraPrinting.EmailOptions.AdditionalRecipients", array: true, editor: DevExpress.JS.Widgets.editorTemplates.commonCollection, addHandler: DevExpress.Designer.Report.AdditionalRecipientModel.createNew, template: '#dxrd-commonCollectionItem' };
            var emailOptionsSerializationInfo = [
                { propertyName: "recipientName", modelName: "@RecipientName", displayName: "Recipient Name", localizationId: "DevExpress.XtraPrinting.EmailOptions.RecipientName", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "recipientAddress", modelName: "@RecipientAddress", displayName: "Recipient Address", localizationId: "DevExpress.XtraPrinting.EmailOptions.RecipientAddress", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "recipientAddressPrefix", modelName: "@RecipientAddressPrefix", displayName: "Recipient Address Prefix", localizationId: "DevExpress.XtraPrinting.EmailOptions.RecipientAddressPrefix", defaultVal: "SMTP:", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "subject", modelName: "@Subject", displayName: "Subject", localizationId: "DevExpress.XtraPrinting.EmailOptions.Subject", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                { propertyName: "body", modelName: "@Body", displayName: "Body", localizationId: "DevExpress.XtraPrinting.EmailOptions.Body", defaultVal: "", editor: DevExpress.JS.Widgets.editorTemplates.text },
                Report.additionalRecipients
            ];
            var exportOptionsSerializationInfo = [
                { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", localizationId: "DevExpress.XtraPrinting.CsvExportOptions", from: CsvExportOptions.from, toJsonObject: CsvExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "email", modelName: "Email", displayName: "E-mail Options", localizationId: "DevExpress.XtraPrinting.EmailOptions", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor, info: emailOptionsSerializationInfo },
                { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", localizationId: "DevExpress.XtraPrinting.HtmlExportOptions", from: HtmlExportOptions.from, toJsonObject: HtmlExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "image", modelName: "Image", displayName: "Image Export Options", localizationId: "DevExpress.XtraPrinting.ImageExportOptions", from: ImageExportOptions.from, toJsonObject: ImageExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "mailMessage", modelName: "MailMessage", displayName: "Mail Message Export Options", localizationId: "DevExpress.XtraPrinting.MailMessageExportOptions", from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", localizationId: "DevExpress.XtraPrinting.MhtExportOptions", from: MhtExportOptions.from, toJsonObject: MhtExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "nativeFormat", modelName: "NativeFormat", displayName: "Native Format Options", localizationId: "DevExpress.XtraPrinting.NativeFormatOptions", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor, info: nativeFormatOptionsSerializationInfo },
                { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", localizationId: "DevExpress.XtraPrinting.PdfExportOptions", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "printPreview", modelName: "PrintPreview", displayName: "Print Preview Options", localizationId: "DevExpress.XtraPrinting.PrintPreviewOptions", from: PrintPreviewOptions.from, toJsonObject: PrintPreviewOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", localizationId: "DevExpress.XtraPrinting.RtfExportOptions", from: RtfExportOptions.from, toJsonObject: RtfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", localizationId: "DevExpress.XtraPrinting.TextExportOptions", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", localizationId: "DevExpress.XtraPrinting.XlsExportOptions", from: XlsExportOptions.from, toJsonObject: XlsExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", localizationId: "DevExpress.XtraPrinting.XlsxExportOptions", from: XlsxExportOptions.from, toJsonObject: XlsxExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", localizationId: "DevExpress.XtraPrinting.DocxExportOptions", from: DocxExportOptions.from, toJsonObject: DocxExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
            ];
            var CsvExportOptionsPreview = (function (_super) {
                __extends(CsvExportOptionsPreview, _super);
                function CsvExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CsvExportOptionsPreview.from = function (model, serializer) {
                    return new CsvExportOptionsPreview(model || {}, serializer);
                };
                CsvExportOptionsPreview.prototype.isPropertyVisible = function (name) {
                    return name !== Report.useCustomSeparator.propertyName;
                };
                CsvExportOptionsPreview.prototype.isPropertyDisabled = function (name) {
                    return false;
                };
                return CsvExportOptionsPreview;
            }(CsvExportOptions));
            Report.CsvExportOptionsPreview = CsvExportOptionsPreview;
            var htmlExportOptionsSerializationInfoPreview = [].concat(htmlExportOptionsSerializationInfoBase);
            var HtmlExportOptionsPreview = (function (_super) {
                __extends(HtmlExportOptionsPreview, _super);
                function HtmlExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(HtmlExportOptions));
            Report.HtmlExportOptionsPreview = HtmlExportOptionsPreview;
            var HtmlExportOptionsMergedPreview = (function (_super) {
                __extends(HtmlExportOptionsMergedPreview, _super);
                function HtmlExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.htmlExportMode(Report.excludeModesForMergedDocuments(_this.htmlExportMode())());
                    return _this;
                }
                HtmlExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModeMergedPreview];
                };
                HtmlExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.htmlExportModeMergedPreview.propertyName;
                };
                return HtmlExportOptionsMergedPreview;
            }(HtmlExportOptionsPreview));
            Report.HtmlExportOptionsMergedPreview = HtmlExportOptionsMergedPreview;
            var imageExportOptionsSerializationInfoPreview = [].concat(imageExportOptionsSerializationInfoBase);
            var ImageExportOptionsPreview = (function (_super) {
                __extends(ImageExportOptionsPreview, _super);
                function ImageExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(ImageExportOptions));
            Report.ImageExportOptionsPreview = ImageExportOptionsPreview;
            var ImageExportOptionsMergedPreview = (function (_super) {
                __extends(ImageExportOptionsMergedPreview, _super);
                function ImageExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.imageExportMode(Report.excludeModesForMergedDocuments(_this.imageExportMode())());
                    return _this;
                }
                ImageExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.imageExportModeMergedPreview];
                };
                ImageExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.imageExportModeMergedPreview.propertyName;
                };
                return ImageExportOptionsMergedPreview;
            }(ImageExportOptionsPreview));
            Report.ImageExportOptionsMergedPreview = ImageExportOptionsMergedPreview;
            var mhtExportOptionsSerializationInfoPreview = [].concat(mhtExportOptionsSerializationInfoBase);
            var MhtExportOptionsPreview = (function (_super) {
                __extends(MhtExportOptionsPreview, _super);
                function MhtExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(MhtExportOptions));
            Report.MhtExportOptionsPreview = MhtExportOptionsPreview;
            var MhtExportOptionsMergedPreview = (function (_super) {
                __extends(MhtExportOptionsMergedPreview, _super);
                function MhtExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.htmlExportMode(Report.excludeModesForMergedDocuments(_this.htmlExportMode())());
                    return _this;
                }
                MhtExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.htmlExportModeMergedPreview];
                };
                MhtExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.htmlExportModeMergedPreview.propertyName;
                };
                return MhtExportOptionsMergedPreview;
            }(MhtExportOptionsPreview));
            Report.MhtExportOptionsMergedPreview = MhtExportOptionsMergedPreview;
            var rtfExportOptionsSerializationInfoPreview = [].concat(rtfExportOptionsSerializationInfoBase);
            var RtfExportOptionsPreview = (function (_super) {
                __extends(RtfExportOptionsPreview, _super);
                function RtfExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(RtfExportOptions));
            Report.RtfExportOptionsPreview = RtfExportOptionsPreview;
            var RtfExportOptionsMergedPreview = (function (_super) {
                __extends(RtfExportOptionsMergedPreview, _super);
                function RtfExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.rtfExportMode(Report.excludeModesForMergedDocuments(_this.rtfExportMode())());
                    return _this;
                }
                RtfExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.rtfExportModeMergedPreview];
                };
                RtfExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.rtfExportModeMergedPreview.propertyName;
                };
                return RtfExportOptionsMergedPreview;
            }(RtfExportOptionsPreview));
            Report.RtfExportOptionsMergedPreview = RtfExportOptionsMergedPreview;
            var xlsExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoBase, xlsExportOptionsSerializationInfoCommon);
            var XlsExportOptionsPreview = (function (_super) {
                __extends(XlsExportOptionsPreview, _super);
                function XlsExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(XlsExportOptions));
            Report.XlsExportOptionsPreview = XlsExportOptionsPreview;
            var XlsExportOptionsMergedPreview = (function (_super) {
                __extends(XlsExportOptionsMergedPreview, _super);
                function XlsExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.xlsExportMode(Report.excludeModesForMergedDocuments(_this.xlsExportMode())());
                    return _this;
                }
                XlsExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsExportModeMergedPreview];
                };
                XlsExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.xlsExportModeMergedPreview.propertyName;
                };
                return XlsExportOptionsMergedPreview;
            }(XlsExportOptionsPreview));
            Report.XlsExportOptionsMergedPreview = XlsExportOptionsMergedPreview;
            var xlsxExportOptionsSerializationInfoPreview = [].concat(xlsExportOptionsSerializationInfoCommon);
            var XlsxExportOptionsPreview = (function (_super) {
                __extends(XlsxExportOptionsPreview, _super);
                function XlsxExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
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
            }(XlsxExportOptions));
            Report.XlsxExportOptionsPreview = XlsxExportOptionsPreview;
            var XlsxExportOptionsMergedPreview = (function (_super) {
                __extends(XlsxExportOptionsMergedPreview, _super);
                function XlsxExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.xlsxExportMode(Report.excludeModesForMergedDocuments(_this.xlsxExportMode())());
                    return _this;
                }
                XlsxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.xlsxExportModeMergedPreview];
                };
                XlsxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.xlsxExportModeMergedPreview.propertyName;
                };
                return XlsxExportOptionsMergedPreview;
            }(XlsxExportOptionsPreview));
            Report.XlsxExportOptionsMergedPreview = XlsxExportOptionsMergedPreview;
            var docxExportOptionsSerializationInfoPreview = [
                Report.pageRange,
                Report.docxTableLayout,
                keepRowHeight,
                Report.rasterizeImages,
                Report.rasterizationResolution,
                Report.exportWatermarks,
                Report.docxDocumentOptions,
            ];
            var DocxExportOptionsPreview = (function (_super) {
                __extends(DocxExportOptionsPreview, _super);
                function DocxExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DocxExportOptionsPreview.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                DocxExportOptionsPreview.prototype.getInfo = function () {
                    var variableInfo = this._getVariableInfo();
                    return variableInfo.concat(docxExportOptionsSerializationInfoPreview);
                };
                DocxExportOptionsPreview.prototype._getVariableInfo = function () {
                    return [Report.docxExportMode];
                };
                return DocxExportOptionsPreview;
            }(DocxExportOptions));
            Report.DocxExportOptionsPreview = DocxExportOptionsPreview;
            var DocxExportOptionsMergedPreview = (function (_super) {
                __extends(DocxExportOptionsMergedPreview, _super);
                function DocxExportOptionsMergedPreview(model, serializer) {
                    var _this = _super.call(this, model, serializer) || this;
                    _this.docxExportMode(Report.excludeModesForMergedDocuments(_this.docxExportMode())());
                    return _this;
                }
                DocxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
                    return [Report.docxExportModeMergedPreview];
                };
                DocxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
                    return _super.prototype.isPropertyDisabled.call(this, name) || name === Report.docxExportModeMergedPreview.propertyName;
                };
                return DocxExportOptionsMergedPreview;
            }(DocxExportOptionsPreview));
            Report.DocxExportOptionsMergedPreview = DocxExportOptionsMergedPreview;
            var ExportOptionsPreview = (function (_super) {
                __extends(ExportOptionsPreview, _super);
                function ExportOptionsPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ExportOptionsPreview.prototype._generateFromFunction = function (exportType) {
                    return function (model, serializer) {
                        return new exportType(model || {}, serializer);
                    };
                };
                ExportOptionsPreview.prototype._generateInfo = function () {
                    return [
                        { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", localizationId: "DevExpress.XtraPrinting.CsvExportOptions", from: CsvExportOptionsPreview.from, toJsonObject: CsvExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", localizationId: "DevExpress.XtraPrinting.HtmlExportOptions", from: this._generateFromFunction(HtmlExportOptionsPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "image", modelName: "Image", displayName: "Image Export Options", localizationId: "DevExpress.XtraPrinting.ImageExportOptions", from: this._generateFromFunction(ImageExportOptionsPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", localizationId: "DevExpress.XtraPrinting.MhtExportOptions", from: this._generateFromFunction(MhtExportOptionsPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", localizationId: "DevExpress.XtraPrinting.PdfExportOptions", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", localizationId: "DevExpress.XtraPrinting.RtfExportOptions", from: this._generateFromFunction(RtfExportOptionsPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", localizationId: "DevExpress.XtraPrinting.TextExportOptions", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", localizationId: "DevExpress.XtraPrinting.XlsExportOptions", from: this._generateFromFunction(XlsExportOptionsPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", localizationId: "DevExpress.XtraPrinting.XlsxExportOptions", from: this._generateFromFunction(XlsxExportOptionsPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", localizationId: "DevExpress.XtraPrinting.DocxExportOptions", from: this._generateFromFunction(DocxExportOptionsPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
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
            }(ExportOptions));
            Report.ExportOptionsPreview = ExportOptionsPreview;
            var ExportOptionsMergedPreview = (function (_super) {
                __extends(ExportOptionsMergedPreview, _super);
                function ExportOptionsMergedPreview() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ExportOptionsMergedPreview.prototype._generateInfo = function () {
                    return [
                        { propertyName: "csv", modelName: "Csv", displayName: "CSV Export Options", localizationId: "DevExpress.XtraPrinting.CsvExportOptions", from: CsvExportOptionsPreview.from, toJsonObject: CsvExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "html", modelName: "Html", displayName: "HTML Export Options", localizationId: "DevExpress.XtraPrinting.HtmlExportOptions", from: this._generateFromFunction(HtmlExportOptionsMergedPreview), toJsonObject: HtmlExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "image", modelName: "Image", displayName: "Image Export Options", localizationId: "DevExpress.XtraPrinting.ImageExportOptions", from: this._generateFromFunction(ImageExportOptionsMergedPreview), toJsonObject: ImageExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "mht", modelName: "Mht", displayName: "MHT Export Options", localizationId: "DevExpress.XtraPrinting.MhtExportOptions", from: this._generateFromFunction(MhtExportOptionsMergedPreview), toJsonObject: MhtExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "pdf", modelName: "Pdf", displayName: "PDF Export Options", localizationId: "DevExpress.XtraPrinting.PdfExportOptions", from: PdfExportOptions.from, toJsonObject: PdfExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "rtf", modelName: "Rtf", displayName: "RTF Export Options", localizationId: "DevExpress.XtraPrinting.RtfExportOptions", from: this._generateFromFunction(RtfExportOptionsMergedPreview), toJsonObject: RtfExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "textExportOptions", modelName: "Text", displayName: "Text Export Options", localizationId: "DevExpress.XtraPrinting.TextExportOptions", from: TextExportOptions.from, toJsonObject: TextExportOptions.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xls", modelName: "Xls", displayName: "XLS Export Options", localizationId: "DevExpress.XtraPrinting.XlsExportOptions", from: this._generateFromFunction(XlsExportOptionsMergedPreview), toJsonObject: XlsExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "xlsx", modelName: "Xlsx", displayName: "XLSx Export Options", localizationId: "DevExpress.XtraPrinting.XlsxExportOptions", from: this._generateFromFunction(XlsxExportOptionsMergedPreview), toJsonObject: XlsxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "docx", modelName: "Docx", displayName: "Docx Export Options", localizationId: "DevExpress.XtraPrinting.DocxExportOptions", from: this._generateFromFunction(DocxExportOptionsMergedPreview), toJsonObject: DocxExportOptionsPreview.toJson, editor: DevExpress.JS.Widgets.editorTemplates.objecteditor }
                    ];
                };
                return ExportOptionsMergedPreview;
            }(ExportOptionsPreview));
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
            function updateBricksPosition(brick, height, width) {
                if (!brick) {
                    return;
                }
                brick[brick.rtl ? 'rightP' : 'leftP'] = convertToPercent(brick.left, width);
                brick.widthP = convertToPercent(brick.width, width);
                brick.topP = convertToPercent(brick.top, height);
                brick.heightP = convertToPercent(brick.height, height);
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    updateBricksPosition(childBrick, height, width);
                });
            }
            Preview.updateBricksPosition = updateBricksPosition;
            function initializeBrick(brick, processClick, zoom, editingFieldBricks) {
                if (!brick) {
                    return;
                }
                !!brick.active ? brick.active(false) : (brick.active = ko.observable(false));
                brick["onClick"] = function (e) { processClick && processClick(brick, e); };
                brick.bricks && brick.bricks.forEach(function (childBrick) {
                    childBrick.top += brick.top;
                    childBrick.left += brick.left;
                    initializeBrick(childBrick, processClick, zoom, editingFieldBricks);
                });
                if (brick.efIndex > 0) {
                    editingFieldBricks.push(brick);
                }
                brick.text = function () { return brickText(brick); };
            }
            Preview.initializeBrick = initializeBrick;
            function getCurrentResolution(zoom) {
                return Math.floor((zoom || 1) * Preview.previewDefaultResolution);
            }
            Preview.getCurrentResolution = getCurrentResolution;
            var PreviewPage = (function (_super) {
                __extends(PreviewPage, _super);
                function PreviewPage(preview, pageIndex, processClick, loading) {
                    var _this = _super.call(this) || this;
                    _this.isClientVisible = ko.observable(false);
                    _this.originalHeight = ko.observable(0);
                    _this.originalWidth = ko.observable(0);
                    _this.loadingText = DevExpress.Designer.getLocalization("Loading...", "ASPxReportsStringId.WebDocumentViewer_Loading");
                    _this.realZoom = ko.observable(1);
                    _this.actualResolution = 0;
                    _this.currentScaleFactor = ko.observable(1);
                    _this.imageHeight = ko.observable(0);
                    _this.imageWidth = ko.observable(0);
                    _this.imageSrc = ko.observable("");
                    _this.displayImageSrc = ko.observable("");
                    _this.brick = ko.observable(null);
                    _this.brickLoading = ko.observable(true);
                    _this.bricks = ko.computed(function () {
                        return _this.getBricksFlatList(_this.brick());
                    });
                    _this.activeBricks = ko.computed(function () {
                        return _this.bricks().filter(function (x) { return x.active(); });
                    });
                    _this.clickableBricks = ko.computed(function () {
                        return _this.bricks().filter(function (x) { return !!x.navigation; });
                    });
                    _this.active = ko.observable(false);
                    _this.maxZoom = 0;
                    _this.disableResolutionReduction = false;
                    _this._lastZoom = 0;
                    _this._selectedBrickPath = null;
                    _this.pageIndex = pageIndex;
                    var timeout = null;
                    _this.documentId = preview._currentDocumentId || ko.observable(null);
                    _this.imageSrc.subscribe(function (newVal) {
                        var documentId = _this.documentId.peek();
                        var ignoreError = preview._closeDocumentRequests && (function () { return preview._closeDocumentRequests[documentId]; });
                        var zoom = _this.maxZoom ? Math.min(_this.maxZoom, _this.zoom()) : _this.zoom();
                        timeout && clearTimeout(timeout);
                        timeout = setTimeout(function () {
                            Preview.PreviewRequestWrapper.getPage(newVal, ignoreError).done(function (response) {
                                _this.imageHeight(response.height);
                                _this.imageWidth(response.width);
                                _this.currentScaleFactor(zoom);
                                _this.displayImageSrc("data:image/png;base64," + response.base64string);
                                _this._onPageLoaded(response, processClick, preview._editingFields);
                            }).fail(function (_e) {
                                _this._onPageLoadFailed();
                            });
                        }, 100);
                    });
                    var unifier = ko.isObservable(preview._unifier) ? preview._unifier : ko.observable(preview._unifier || Preview.generateGuid());
                    _this.pageLoading = loading || ko.observable(true);
                    _this.originalHeight(ko.unwrap(preview._pageHeight));
                    _this.originalWidth(ko.unwrap(preview._pageWidth));
                    _this.zoom = preview._zoom;
                    _this.imageWidth(_this.originalWidth() * _this.zoom() / _this._getPixelRatio());
                    _this.imageHeight(_this.originalHeight() * _this.zoom() / _this._getPixelRatio());
                    _this.isClientVisible.subscribe(function (newVal) {
                        if (_this.isClientVisible()) {
                            _this._setPageImgSrc(_this.documentId(), unifier(), _this.zoom());
                        }
                    });
                    _this.color = ko.isObservable(preview._pageBackColor) ? preview._pageBackColor.peek() : "";
                    _this.width = ko.pureComputed(function () {
                        return _this.imageWidth() * _this.zoom() / _this.currentScaleFactor() / _this._getPixelRatio();
                    });
                    _this.height = ko.pureComputed(function () {
                        return _this.imageHeight() * _this.zoom() / _this.currentScaleFactor() / _this._getPixelRatio();
                    });
                    var _self = _this;
                    _this.isEmpty = pageIndex === -1 && !_this.brick() && !processClick;
                    _this.resetBrickRecusive = function (brick) {
                        if (brick && brick.active) {
                            brick.active(false);
                            if (brick.bricks) {
                                brick.bricks.forEach(function (childBrick) { _self.resetBrickRecusive(childBrick); });
                            }
                        }
                    };
                    _this.selectBrick = function (path, ctrlKey) {
                        if (Preview.PreviewSelection.started)
                            return;
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
                    _this._disposables.push(ko.computed(function () {
                        if (!_this.active()) {
                            _this.resetBrickRecusive(_this.brick());
                            _this._selectedBrickPath = null;
                        }
                    }));
                    return _this;
                }
                PreviewPage.prototype._initializeEditingFields = function (editingFieldBricks, previewEditngFields, originalWidth, originalHeight) {
                    var _this = this;
                    if (this.editingFields) {
                        var oldEditFields = ko.unwrap(this.editingFields());
                        if (oldEditFields && oldEditFields.length > 0) {
                            oldEditFields.forEach(function (field) { return field.dispose && field.dispose(); });
                        }
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
                            pageFieldViewModels.push(editingField.createViewModel(_this.zoom, originalWidth, originalHeight, function () { return allEditingFields; }, brick.absoluteBounds));
                            brick.text = (function (brick) { return (function () { return brickText(brick, function () { return allEditingFields; }); }); })(brick);
                        }
                        return pageFieldViewModels;
                    });
                };
                PreviewPage.prototype._getPixelRatio = function () {
                    return window["devicePixelRatio"] || 1;
                };
                PreviewPage.prototype._onPageLoaded = function (result, processClick, previewEditingFields) {
                    this.pageLoading(false);
                    try {
                        if (!result || !result.brick) {
                            return;
                        }
                        this.brickColumnWidthArray = result.columnWidthArray;
                        this.originalWidth(result.brick.width);
                        this.originalHeight(result.brick.height);
                        var editignFieldBricks = [];
                        this.initializeBrick(result.brick, processClick, this.zoom, editignFieldBricks);
                        this._initializeEditingFields(editignFieldBricks, previewEditingFields, result.brick.width, result.brick.height);
                        this._selectedBrickPath && this.selectBrick(this._selectedBrickPath);
                    }
                    finally {
                        this.brickLoading(false);
                    }
                };
                PreviewPage.prototype._onPageLoadFailed = function () {
                    if (this.pageIndex !== -1 && this.isClientVisible()) {
                        this.pageLoading(false);
                        this.brickLoading(false);
                    }
                };
                PreviewPage.prototype.updateSize = function (zoom) {
                    var newResolution = getCurrentResolution(zoom);
                    this.realZoom(newResolution / Preview.previewDefaultResolution);
                    return newResolution;
                };
                PreviewPage.prototype.clearBricks = function () {
                    this.brickLoading(true);
                };
                PreviewPage.prototype._setPageImgSrc = function (documentId, unifier, zoom) {
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
                    var imageResolution = Math.floor(newResolution * this._getPixelRatio());
                    this.imageSrc(Preview.HandlerUri +
                        "?actionKey=getPage&unifier=" + unifier +
                        "&arg=" + encodeURIComponent(JSON.stringify({ pageIndex: this.pageIndex, documentId: documentId, resolution: imageResolution, includeBricks: this.brickLoading() })));
                };
                PreviewPage.prototype._clear = function () {
                    this.pageIndex = -1;
                    this.isClientVisible(false);
                    this._setPageImgSrc(null, null, 1);
                    this.actualResolution = 0;
                };
                PreviewPage.prototype.initializeBrick = function (brick, processClick, zoom, editingFieldBricks) {
                    initializeBrick(brick, processClick, this.zoom, editingFieldBricks);
                    updateBricksPosition(brick, brick.height, brick.width);
                    this.brick(brick);
                };
                PreviewPage.prototype.clickToBrick = function (s, e) {
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
                PreviewPage.prototype.getBricksFlatList = function (brick) {
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
                return PreviewPage;
            }(DevExpress.Designer.Disposable));
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
            Preview.formatSearchResult = function (value) { return value && (DevExpress.Designer.getLocalization("page", "ASPxReportsStringId.WebDocumentViewer_SearchPageNumberText") + " " + (value.pageIndex + 1)); };
            Preview.searchAvailable = ko.observable(true);
            var SearchViewModel = (function (_super) {
                __extends(SearchViewModel, _super);
                function SearchViewModel(reportPreview) {
                    var _this = _super.call(this) || this;
                    _this.actions = [];
                    _this.focusRequested = ko.observable(true);
                    _this.matchWholeWord = ko.observable(false);
                    _this.matchCase = ko.observable(false);
                    _this.searchUp = ko.observable(false);
                    _this.searchText = ko.observable();
                    _this.searchResult = ko.observable();
                    _this.loading = ko.observable(false);
                    _this.resetSearchResult();
                    _this._resultNavigator = SearchViewModel.createResultNavigator(_this, reportPreview);
                    _this.clean = function () { _this.searchText(""); };
                    _this._disposables.push(reportPreview._currentDocumentId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    _this._disposables.push(reportPreview._currentReportId.subscribe(function (newVal) {
                        _this.resetSearchResult();
                    }));
                    _this.findUp = function () { _this.searchUp(true); _this.findNext(); };
                    _this.findDown = function () { _this.searchUp(false); _this.findNext(); };
                    _this.goToResult = function (result) { _this._resultNavigator.goToResult(result.id); };
                    var newSearch = function (text, matchCase, matchWholeWord) {
                        _this.searchResult([]);
                        _this._resultNavigator.currentResult(null);
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
                        });
                    };
                    _this.findNext = function () {
                        if (_this.loading()) {
                            return;
                        }
                        _this._resultNavigator.next(_this.searchUp()) || newSearch(_this.searchText(), _this.matchCase(), _this.matchWholeWord());
                    };
                    _this._disposables.push(_this.searchText.subscribe(function (newVal) { newSearch(newVal, _this.matchCase(), _this.matchWholeWord()); }), _this.matchCase.subscribe(function (newVal) { newSearch(_this.searchText(), newVal, _this.matchWholeWord()); }), _this.matchWholeWord.subscribe(function (newVal) { newSearch(_this.searchText(), _this.matchCase(), newVal); }));
                    var disabled = ko.pureComputed(function () {
                        var documentId = reportPreview["_currentDocumentId"]();
                        var pageIndex = reportPreview.pageIndex();
                        return reportPreview.documentBuilding() || !documentId || pageIndex === -1;
                    });
                    _this.actions.push({
                        id: Preview.ActionId.Search,
                        text: DevExpress.Designer.getLocalization("Search", 'ASPxReportsStringId.SearchDialog_Header'),
                        imageClassName: "dxrd-image-search",
                        imageTemplateName: "dxrd-svg-preview-search",
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
                    _this.tabInfo = new DevExpress.Designer.TabInfo({
                        text: "Search",
                        template: "dxrd-preview-search",
                        model: _this,
                        localizationId: 'ASPxReportsStringId.SearchDialog_Header',
                        imageClassName: "search",
                        imageTemplateName: "dxrd-svg-preview-search",
                        visible: ko.pureComputed(function () { return !disabled() && Preview.searchAvailable(); })
                    });
                    _this._disposables.push(_this.tabInfo.active.subscribe(function (newVal) {
                        newVal && setTimeout(function () { return _this.focusRequested.notifySubscribers(); }, 100);
                    }));
                    return _this;
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
            }(DevExpress.Designer.Disposable));
            Preview.SearchViewModel = SearchViewModel;
            var SearchResultNavigator = (function (_super) {
                __extends(SearchResultNavigator, _super);
                function SearchResultNavigator(searchModel, reportPreview) {
                    var _this = _super.call(this) || this;
                    _this.currentResult = ko.observable(null);
                    var goToMatchedResult = function (foundResult) {
                        if (!foundResult) {
                            return;
                        }
                        reportPreview.goToPage && reportPreview.goToPage(foundResult.pageIndex);
                        var page = reportPreview.pages.peek()[foundResult.pageIndex];
                        page && page.selectBrick(foundResult.indexes);
                    };
                    _this.getFirstMatchFromPage = function (pageIndex, up, thisPageOnly) {
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
                    _this.goToResult = function (id) {
                        if (id !== 0 && !id) {
                            return null;
                        }
                        _setCurrentResult(true, id);
                    };
                    _this._disposables.push(reportPreview.pageIndex.subscribe(function (newPageIndex) {
                        if (_this.currentResult() && newPageIndex === _this.currentResult().pageIndex)
                            return;
                        _this.currentResult(null);
                    }));
                    _this._disposables.push(searchModel.searchResult.subscribe(function () {
                        _setCurrentResult(true);
                    }));
                    _this.next = function (up) {
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
                    return _this;
                }
                return SearchResultNavigator;
            }(DevExpress.Designer.Disposable));
            Preview.SearchResultNavigator = SearchResultNavigator;
            var editor_prefix = "dx-searcheditor", EDITOR_CLASS = editor_prefix + "", EDITOR_BUTTON_CLASS = editor_prefix + "-button dx-widget dx-dropdowneditor-button", EDITOR_BUTTON_SELECTOR = "." + editor_prefix + "-button", EDITOR_BUTTON_ICON_CLASS = editor_prefix + "-icon dx-dropdowneditor-icon dx-icon-dxrd-image-move", EDITOR_BUTTON_ICON_UP_TEMPLATE = "dxrd-svg-operations-moveup", EDITOR_BUTTON_ICON_DOWN_TEMPLATE = "dxrd-svg-operations-movedown";
            var dxSearchEditor = (function (_super) {
                __extends(dxSearchEditor, _super);
                function dxSearchEditor(element, options) {
                    var _this = this;
                    options["onKeyDown"] = function (e) {
                        if (e.event.keyCode === 13) {
                            e.event.stopPropagation();
                            e.event.preventDefault();
                            if (DevExpress.utils.browser && DevExpress.utils.browser.msie && e && e.component) {
                                e.component.blur();
                                e.component.focus();
                            }
                            _this.findNext(e && e.event && e.event.shiftKey);
                        }
                    };
                    options["onFocusOut"] = function (e) {
                        _this._searchModel.searchText(_this.option("text"));
                    };
                    _this = _super.call(this, element, options) || this;
                    _this._activeStateUnit = EDITOR_BUTTON_SELECTOR;
                    _this._focusRequestRaised = function () { _this.focus(); };
                    _this._searchModel = options.searchModel;
                    _this._searchModel.focusRequested.subscribe(function (val) { return _this._focusRequestRaised(); });
                    return _this;
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
                    var $element = $(this.element());
                    $element.addClass(EDITOR_CLASS);
                    this._koContext = ko.contextFor($element.get(0));
                };
                dxSearchEditor.prototype._render = function () {
                    _super.prototype._render.call(this);
                    this._renderButton("Down");
                    this._renderButton("Up");
                };
                dxSearchEditor.prototype._renderButton = function (direction) {
                    this._$button = $("<div />").addClass(EDITOR_BUTTON_CLASS);
                    this._attachButtonEvents(direction);
                    this._$buttonIcon = $("<div />").addClass(EDITOR_BUTTON_ICON_CLASS + direction.toLowerCase())
                        .append(ko.utils.parseHtmlFragment(DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.templates[direction.toLowerCase() === "up" ? EDITOR_BUTTON_ICON_UP_TEMPLATE : EDITOR_BUTTON_ICON_DOWN_TEMPLATE]))
                        .appendTo(this._$button);
                    ko.applyBindingsToDescendants(this._koContext, this._$buttonIcon[0]);
                    var buttonsContainer = _super.prototype._buttonsContainer.call(this);
                    this._$button.appendTo(buttonsContainer);
                };
                dxSearchEditor.prototype._attachButtonEvents = function (direction) {
                    var _this = this;
                    this._$button.off("click");
                    if (!this.option("disabled")) {
                        this._$button.on("click", function (e) {
                            _this.findNext(direction.toLowerCase() === "up") && e.stopPropagation();
                        });
                    }
                };
                return dxSearchEditor;
            }(DevExpress.ui.dxTextBox));
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
                    this._selectedPath = ko.observable("0");
                    this._setSelectedPathByNavigationNode = function (nodes, brickNavigation, path) {
                        if (path === void 0) { path = "0"; }
                        nodes.forEach(function (item, index) {
                            if (item.indexes === brickNavigation.indexes && item.pageIndex === brickNavigation.pageIndex) {
                                _this._selectedPath(path + "." + index.toString());
                            }
                            else if (item.nodes) {
                                _this._selectedPath(_this._setSelectedPathByNavigationNode(item.nodes, brickNavigation, path + "." + index.toString()));
                            }
                        });
                        return _this._selectedPath();
                    };
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
                    reportPreview.brickClickDocumentMapHandler = function (brickNavigation) {
                        if (reportPreview.documentMap && reportPreview.documentMap())
                            _this._setSelectedPathByNavigationNode(reportPreview.documentMap().nodes, brickNavigation);
                    };
                    this.documentMapOptions = ko.pureComputed(function () {
                        var rootNodeSubscribtion = treeListController.selectedItem.subscribe(function (item) {
                            item.path === "0" && item.collapsed() && item.toggleCollapsed();
                            rootNodeSubscribtion.dispose();
                        });
                        return {
                            itemsProvider: new DocumentMapItemsProvider(reportPreview.documentMap()),
                            selectedPath: _this._selectedPath,
                            treeListController: treeListController
                        };
                    });
                    this.tabInfo = new DevExpress.Designer.TabInfo({
                        text: "Document Map",
                        template: "dxrd-preview-document-map",
                        model: this,
                        localizationId: "DevExpress.XtraPrinting.PrintingSystemCommand.DocumentMap",
                        imageClassName: "reportexplorer",
                        imageTemplateName: "dxrd-svg-tabs-reportexplorer",
                        visible: ko.pureComputed(function () { return !_this.isEmpty(); })
                    });
                }
                return DocumentMapModel;
            }());
            Preview.DocumentMapModel = DocumentMapModel;
            var ColumnSortOrder;
            (function (ColumnSortOrder) {
                ColumnSortOrder[ColumnSortOrder["None"] = 0] = "None";
                ColumnSortOrder[ColumnSortOrder["Ascending"] = 1] = "Ascending";
                ColumnSortOrder[ColumnSortOrder["Descending"] = 2] = "Descending";
            })(ColumnSortOrder = Preview.ColumnSortOrder || (Preview.ColumnSortOrder = {}));
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
            }());
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
            }());
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
            var MultiValuesHelper = (function () {
                function MultiValuesHelper(value, items) {
                    var _this = this;
                    this.items = items;
                    this.selectedItems = ko.observableArray([]);
                    this.value = value;
                    this.dataSource = items;
                    var allValues;
                    this.maxDisplayedTags = ((items && items.length) || 1) - 1;
                    this.isSelectedAll = ko.pureComputed({
                        read: function () { return _this.value.length == items.length; },
                        write: function (selectAll) {
                            var newValue = selectAll ? (allValues || (allValues = items.map(function (x) { return x.value; }))) : [];
                            _this.value(newValue);
                        }
                    });
                }
                return MultiValuesHelper;
            }());
            Preview.MultiValuesHelper = MultiValuesHelper;
            function getEditorType(typeString) {
                if (typeString === "multiValueWithLookUp") {
                    return DevExpress.Report.Preview.editorTemplates.multiValue;
                }
                if (typeString === "multiValue") {
                    return DevExpress.Report.Preview.editorTemplates.multiValueEditable;
                }
                if (typeString === "Enum") {
                    return DevExpress.Report.Preview.editorTemplates.selectBox;
                }
                return undefined;
            }
            Preview.getEditorType = getEditorType;
            var ParameterHelper = (function () {
                function ParameterHelper() {
                    this._customizeParameterEditors = ko.observable();
                    this.getUnspecifiedDisplayText = function () { return DevExpress.Designer.getLocalization('(none)', "PreviewStringId.NoneString"); };
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
                ParameterHelper.createDefaultDataSource = function (store) {
                    return new DevExpress.data.DataSource({
                        store: store,
                        paginate: true,
                        pageSize: 100
                    });
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
                        localizationId: parameterDescriptor["localizationId"],
                        editor: getEditorType(typeString) || DevExpress.Designer.getEditorType(typeString),
                        editorOptions: {}
                    };
                    if (parameterDescriptor.type === "System.Guid") {
                        info.editorOptions.isNullable = parameterDescriptor.allowNull;
                    }
                    this.assignValueStore(info, parameter);
                    return info;
                };
                ParameterHelper.prototype.addShowCleanButton = function (info, parameter) {
                    var _this = this;
                    info.editorOptions.showClearButton = parameter.allowNull;
                    info.editorOptions.placeholder = ko.computed(function () { return ko.unwrap(parameter.allowNull) ? _this.getUnspecifiedDisplayText() : ""; });
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
                        return newItems ? newItems : ParameterHelper.createDefaultDataSource(sort ? new DevExpress.Designer.SortedArrayStore(items, "displayValue") : new DevExpress.data.ArrayStore(items));
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
                    if (parameter.allowNull !== undefined) {
                        this.addShowCleanButton(valueInfo, parameter);
                    }
                    if (ko.unwrap(parameter.isMultiValue)) {
                        valueInfo.editor = getEditorType(parameter["isMultiValueWithLookUp"] ? "multiValueWithLookUp" : "multiValue");
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
            }());
            Preview.ParameterHelper = ParameterHelper;
            var PreviewParameterHelper = (function (_super) {
                __extends(PreviewParameterHelper, _super);
                function PreviewParameterHelper(knownEnums, callbacks) {
                    var _this = _super.call(this) || this;
                    _this.callbacks = callbacks;
                    _this.initialize(knownEnums, callbacks);
                    return _this;
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
                    if (!parameter.isMultiValue && (parameter.lookUpValues() || this.isEnumType(parameter))) {
                        info.editorOptions.searchEnabled = true;
                    }
                    if ((parameter.type === "System.DateTime" || parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) && !parameter.allowNull) {
                        info.validationRules = DevExpress.Analytics.Widgets.requiredValidationRules;
                    }
                    else if (parameter.type === "System.Guid") {
                        info.editorOptions.displayCustomValue = false;
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
            }(ParameterHelper));
            Preview.PreviewParameterHelper = PreviewParameterHelper;
            var PreviewParameter = (function (_super) {
                __extends(PreviewParameter, _super);
                function PreviewParameter(parameterInfo, parameterHelper) {
                    var _this = _super.call(this) || this;
                    _this.valueInfo = ko.observable();
                    _this.lookUpValues = ko.observableArray();
                    _this.valueStoreCache = null;
                    _this.multiValueInfo = ko.observable();
                    _this.intTypes = ["System.Int16", "System.Int32", "System.Int64"];
                    _this.floatTypes = ["System.Single", "System.Double", "System.Decimal"];
                    _this.isTypesCurrentType = function (types, type) { return types.indexOf(type) > -1; };
                    _this.tag = parameterInfo.Tag;
                    _this.type = parameterInfo.TypeName;
                    _this.path = parameterInfo.Path;
                    _this.visible = parameterInfo.Visible;
                    _this.isFilteredLookUpSettings = parameterInfo.IsFilteredLookUpSettings;
                    _this._originalLookUpValues = parameterInfo.LookUpValues ? parameterHelper.mapLookUpValues(_this.type, parameterInfo.LookUpValues || []) : null;
                    _this.lookUpValues(_this._originalLookUpValues);
                    _this.lookUpValues.subscribe(function () { _this.valueStoreCache = null; });
                    _this.isMultiValue = parameterInfo.MultiValue;
                    _this.allowNull = parameterInfo.AllowNull;
                    _this.isMultiValueWithLookUp = _this.isMultiValue && !!_this.lookUpValues();
                    _this._originalValue = parameterInfo.Value;
                    if (parameterInfo.ValueInfo && _this.isTypesCurrentType(_this.intTypes.concat(_this.floatTypes), _this.type) && !_this.isMultiValueWithLookUp) {
                        _this._originalValue = parameterInfo.ValueInfo;
                    }
                    _this.getParameterDescriptor = function () {
                        return {
                            description: parameterInfo.Description,
                            displayName: parameterInfo.Description || parameterInfo.Name,
                            name: parameterInfo.Name,
                            tag: parameterInfo.Tag,
                            type: parameterInfo.TypeName,
                            value: _this._originalValue,
                            multiValue: parameterInfo.MultiValue,
                            allowNull: parameterInfo.AllowNull,
                            hasLookUpValues: !!_this.lookUpValues() || parameterHelper.isEnumType(_this),
                            visible: parameterInfo.Visible
                        };
                    };
                    _this._disposables.push(ko.computed(function () {
                        var info = parameterHelper.getParameterInfo(_this);
                        info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameterInfo.Path);
                        _this.valueInfo(info);
                    }));
                    _this.initialize(_this._originalValue, parameterHelper);
                    return _this;
                }
                PreviewParameter._compareValues = function (value1, value2) {
                    if (value1 instanceof Date && value2 instanceof Date) {
                        return value1 - value2 === 0;
                    }
                    return value1 === value2;
                };
                PreviewParameter.prototype.safeAssignObservable = function (name, value) {
                    if (this[name]) {
                        if (PreviewParameter._compareValues(this[name](), value()))
                            this[name](null);
                        this[name](value());
                    }
                    else {
                        this[name] = value;
                    }
                };
                PreviewParameter.prototype.initialize = function (value, parameterHelper) {
                    var _this = this;
                    var resultValue;
                    if (this.isMultiValueWithLookUp) {
                        this.safeAssignObservable("_value", ko.observableArray((value || []).map(function (arrayItem) {
                            return parameterHelper.getValueConverter(_this.type)(arrayItem);
                        })));
                        var multiValuesHelper = new MultiValuesHelper(this._value, this.lookUpValues());
                        var newItems;
                        if (parameterHelper.customizeParameterLookUpSource)
                            newItems = parameterHelper.customizeParameterLookUpSource(this.getParameterDescriptor(), multiValuesHelper.dataSource);
                        if (newItems) {
                            multiValuesHelper.dataSource = newItems;
                        }
                        else {
                            var store = new DevExpress.data.ArrayStore({
                                data: multiValuesHelper.dataSource,
                                key: "value",
                            });
                            multiValuesHelper.dataSource = ParameterHelper.createDefaultDataSource(store);
                        }
                        resultValue = ko.observable(multiValuesHelper);
                    }
                    else if (this.isMultiValue) {
                        resultValue = value ? parameterHelper.createMultiValueArray(value, this) : ko.observableArray();
                    }
                    else if (this.allowNull && !value) {
                        resultValue = ko.observable(null);
                    }
                    else {
                        resultValue = ko.observable(parameterHelper.getValueConverter(this.type)(value));
                    }
                    this.safeAssignObservable("value", resultValue);
                };
                return PreviewParameter;
            }(DevExpress.Designer.Disposable));
            Preview.PreviewParameter = PreviewParameter;
            var PreviewParametersViewModel = (function (_super) {
                __extends(PreviewParametersViewModel, _super);
                function PreviewParametersViewModel(reportPreview, parameterHelper) {
                    var _this = _super.call(this) || this;
                    _this._parameters = [];
                    _this._getLookUpValueRequest = function (argsObject) {
                        return DevExpress.Designer.ajax(Preview.HandlerUri, 'getLookUpValues', encodeURIComponent(JSON.stringify(argsObject)), function (message, jqXHR, textStatus) { return _this._reportPreview._processError(DevExpress.Designer.getLocalization("Cannot supply filtered lookup values to a report parameter editor", "ASPxReportsStringId.WebDocumentViewer_GetLookUpValuesError")); });
                    };
                    _this._getDoneGetLookUpValueHandler = function () {
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
                    _this._getFailGetLookUpValueHandler = function () {
                        var parametersViewModel = _this;
                        return function (jqXHRError) {
                            parametersViewModel.parametersLoading(false);
                        };
                    };
                    _this.getInfo = ko.observable(null);
                    _this.needToRefreshLookUps = ko.observable(false);
                    _this.isEmpty = ko.observable(true);
                    _this.processInvisibleParameters = false;
                    _this.parametersLoading = ko.observable(false);
                    _this._reportPreview = reportPreview;
                    _this.parameterHelper = parameterHelper || new PreviewParameterHelper();
                    _this.validateAndSubmit = function (params) {
                        var result = params && params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
                        if (!result || result.isValid)
                            _this.submit();
                    };
                    _this.submit = function () {
                        if (_this.parametersLoading())
                            return;
                        _this.parametersLoading(true);
                        var promise = reportPreview.startBuild();
                        promise && promise.done(function (val) { _this.parametersLoading(false); });
                    };
                    _this._disposables.push(reportPreview.originalParametersInfo.subscribe(function (originalParametersInfo) {
                        _this.initialize(originalParametersInfo);
                    }));
                    _this.initialize(reportPreview.originalParametersInfo());
                    var notEmpty = ko.pureComputed(function () { return !_this.isEmpty(); });
                    _this.tabInfo = new DevExpress.Designer.TabInfo({
                        text: "Parameters",
                        template: "dxrd-preview-parameters",
                        model: _this,
                        localizationId: 'PreviewStringId.RibbonPreview_Parameters_Caption',
                        imageClassName: "parameters",
                        imageTemplateName: "dxrd-svg-tabs-parameters",
                        visible: notEmpty
                    });
                    var popupVisibleSwitch = ko.observable(false);
                    var popupVisible = ko.pureComputed({
                        read: function () {
                            return notEmpty() && popupVisibleSwitch();
                        },
                        write: function (newVal) {
                            return popupVisibleSwitch(newVal);
                        }
                    });
                    _this.popupInfo = { visible: popupVisible, notEmpty: notEmpty };
                    return _this;
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
                                if (parameter.allowNull && (expandValue === "" || expandValue === undefined)) {
                                    expandValue = null;
                                }
                                else if (parameter.isTypesCurrentType(parameter.intTypes, parameter.type)) {
                                    expandValue = DevExpress.Analytics.Utils.integerValueConverter(expandValue, "0");
                                }
                                else if (parameter.isTypesCurrentType(parameter.floatTypes, parameter.type)) {
                                    expandValue = DevExpress.Analytics.Utils.floatValueConverter(expandValue, "0");
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
                            var selectedItems = parameter.value().value();
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
                        return PreviewParameter._compareValues(_this.parameterHelper.getValueConverter(parameterType)(x.Value), value);
                    });
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
                        if (parameter.allowNull) {
                            if ((parameter.isMultiValue && Array.isArray(value) && value.length === 0) || value === "") {
                                value = null;
                            }
                        }
                        params.push({ Value: ParameterHelper.getSerializationValue(value, convertItem), Key: parameter.path, TypeName: parameter.type });
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
                    var _this = this;
                    var requiredParameterPaths = this.getPathsAfterPath(changedParameterPath);
                    if (!requiredParameterPaths || requiredParameterPaths.length === 0) {
                        return;
                    }
                    var argsObject = {
                        reportId: this._reportPreview.reportId,
                        reportUrl: this._reportPreview.reportUrl,
                        requiredParameterPaths: requiredParameterPaths,
                        parameters: this.serializeParameters(),
                        timeZoneOffset: 0 - new Date().getTimezoneOffset()
                    };
                    setTimeout(function () {
                        _this.parametersLoading(true);
                        _this._getLookUpValueRequest(argsObject)
                            .done(_this._getDoneGetLookUpValueHandler())
                            .fail(_this._getFailGetLookUpValueHandler());
                    }, 10);
                };
                return PreviewParametersViewModel;
            }(DevExpress.Designer.Disposable));
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
            Preview.HandlerUri = "DXXRDV.axd";
            Preview.ReportServerDownloadUri = "";
            var ReportServerInvokeUri = "/RSWebDocumentViewerApi/Invoke";
            var ReportServerExportUri = "/RSWebDocumentViewerApi/Download";
            Preview.TimeOut = 105000;
            Preview.PollingDelay = 300;
            Preview.MessageHandler = {
                processError: function (message, showForUser, prefix) {
                    if (prefix === void 0) { prefix = ""; }
                    showForUser && DevExpress.Designer.ShowMessage(message.substr(prefix.length));
                    DevExpress.Designer.NotifyAboutWarning(message, false);
                },
                processMessage: function (message, showForUser) { showForUser && DevExpress.Designer.ShowMessage(message, DevExpress.Designer.NotifyType.success, 10000); },
                processWarning: function (message, showForUser) { showForUser && DevExpress.Designer.ShowMessage(message); }
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
                function ReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl) {
                    if (rtl === void 0) { rtl = false; }
                    var _this = _super.call(this) || this;
                    _this.predefinedZoomLevels = ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]);
                    _this._pageWidth = ko.observable(818);
                    _this._pageHeight = ko.observable(1058);
                    _this._pageBackColor = ko.observable('');
                    _this._currentReportId = ko.observable(null);
                    _this._currentReportUrl = ko.observable(null);
                    _this._currentDocumentId = ko.observable(null);
                    _this._unifier = ko.observable("");
                    _this._currentOperationId = ko.observable(null);
                    _this._stopBuildRequests = {};
                    _this._closeDocumentRequests = {};
                    _this._editingFields = ko.observable([]);
                    _this._startBuildOperationId = "";
                    _this._editingValuesSubscriptions = [];
                    _this._drillDownState = [];
                    _this._sortingState = [];
                    _this._window = null;
                    _this.rtlReport = ko.observable(false);
                    _this.currentPage = ko.observable(null);
                    _this.originalParametersInfo = ko.observable(null);
                    _this.pageIndex = ko.observable(-1);
                    _this.showMultipagePreview = ko.observable(false);
                    _this.documentMap = ko.observable();
                    _this.exportOptionsModel = ko.observable();
                    _this.pageLoading = ko.observable(false);
                    _this.documentBuilding = ko.observable(false);
                    _this.progressBar = new Preview.ProgressViewModel();
                    _this.pages = ko.observableArray([]).extend({ rateLimit: { timeout: 20, method: "notifyWhenChangesStop" } });
                    _this.isAutoFit = ko.observable(true);
                    _this.autoFitBy = ko.observable(Preview.ZoomAutoBy.WholePage);
                    _this.exportDisabled = ko.pureComputed(function () {
                        var inProgress = _this.progressBar.inProgress();
                        var documentBuilding = _this.documentBuilding();
                        return _this.pageIndex() === -1 || inProgress || documentBuilding;
                    });
                    _this._zoom = ko.observable(1);
                    _this.zoom = ko.pureComputed({
                        read: function () {
                            var autoFitBy = _this.autoFitBy();
                            if (autoFitBy != Preview.ZoomAutoBy.None || _this._zoom() === 0) {
                                return autoFitBy;
                            }
                            return _this._zoom();
                        },
                        write: function (val) {
                            if (val > 0) {
                                _this.autoFitBy(Preview.ZoomAutoBy.None);
                                _this._zoom(val);
                            }
                            else {
                                _this.autoFitBy(val);
                            }
                        }
                    });
                    _this.editingFieldsProvider = function () { return _this._editingFields(); };
                    _this._currentPageText = ko.pureComputed(function () {
                        if (_this.pageIndex() === -1) {
                            return DevExpress.Designer.getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
                        }
                        else {
                            var ofText = DevExpress.Designer.getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
                            return (_this.pageIndex() + 1) + " " + ofText + " " + _this.pages().length;
                        }
                    });
                    _this._raiseOnSizeChanged = function () { _this.onSizeChanged() && _this.onSizeChanged()(); };
                    _this.previewSize = ko.observable(0);
                    _this.onSizeChanged = ko.observable();
                    _this.previewVisible = ko.observable(false);
                    _this.editingFieldsHighlighted = ko.observable(false);
                    _this.canSwitchToDesigner = true;
                    _this.allowURLsWithJSContent = false;
                    _this.zoomStep = ko.observable(0.05);
                    _this.exportOptionsTabVisible = ko.observable(true);
                    Preview.HandlerUri = handlerUri || Preview.HandlerUri;
                    _this.previewHandlersHelper = previewHandlersHelper || new Preview.PreviewHandlersHelper(_this);
                    _this.requestWrapper = previewRequestWrapper || new Preview.PreviewRequestWrapper(null, callbacks);
                    _this.rtlViewer = rtl;
                    if (callbacks) {
                        _this.customProcessBrickClick = callbacks.previewClick;
                        _this.customizeExportOptions = callbacks.customizeExportOptions;
                    }
                    _this.documentBuilding.subscribe(function (newVal) {
                        if (!newVal) {
                            _this._unifier(Preview.generateGuid());
                            var documentId = _this._currentDocumentId();
                            var pageCount = _this.pages().length;
                            for (var i = 0; i < pageCount; i++) {
                                var page = _this.pages()[i];
                                if (!page.pageLoading()) {
                                    page.clearBricks();
                                }
                                page.updateSize(_this._zoom());
                                page.actualResolution = 0;
                                page.isClientVisible() && page._setPageImgSrc(documentId, _this._unifier(), _this._zoom());
                            }
                            if (callbacks && callbacks.documentReady) {
                                documentId && callbacks.documentReady(documentId, _this._currentReportId(), pageCount);
                            }
                        }
                    });
                    _this._disposables.push(_this._currentDocumentId.subscribe(function (newVal) {
                        _this._unifier(newVal ? Preview.generateGuid() : '');
                    }));
                    _this._disposables.push(_this.previewSize.subscribe(function () { return _this._raiseOnSizeChanged(); }));
                    _this._disposables.push(_this._zoom.subscribe(function () {
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
                    return _this;
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
                    this._editingValuesSubscriptions.forEach(function (item) { return item.dispose(); });
                    this._editingValuesSubscriptions = [];
                    this.documentMap(null);
                    this.pageIndex(-1);
                    this.pageLoading(true);
                    this.progressBar.complete();
                    this.pages([this.createPage(-1, undefined, this.pageLoading)]);
                };
                ReportPreview.prototype.createPage = function (pageIndex, processClick, loading) {
                    return new Preview.PreviewPage(this, pageIndex, processClick, loading);
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
                ReportPreview.prototype._initExportWindow = function () {
                    var message = DevExpress.Designer.getLocalization("Do not close this tab to get the resulting file.", "ASPxReportsStringId.WebDocumentViewer_AsyncExportCloseWarning");
                    var div = this._window.document.createElement("div");
                    div.style["text-align"] = "center";
                    div.innerText = message;
                    div.style.position = "absolute";
                    div.style.left = "0";
                    div.style.top = "0";
                    div.style.right = "0";
                    div.style.fontSize = "20px";
                    this._window.document.title = DevExpress.Designer.getLocalization("Exporting...", "ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle");
                    this._window.document.body.appendChild(div);
                };
                ReportPreview.prototype._export = function (args, actionUri, inlineResult, printable) {
                    var _this = this;
                    if (printable === void 0) { printable = false; }
                    var deffered = $.Deferred();
                    if (this._editingFields().length > 0 || Preview.AsyncExportApproach || this.exportOptionsModel().hasSensitiveData()) {
                        var self = this;
                        this._window = window.open();
                        this._window.onunload = function () {
                            _this.progressBar.stop();
                        };
                        this._initExportWindow();
                        this.progressBar.text(DevExpress.Designer.getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument'));
                        this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel', 'ASPxReportsStringId.SearchDialog_Cancel'));
                        this.progressBar.startProgress(function () { _this._currentOperationId(null); });
                        this.requestWrapper.getStartExportOperation(args)
                            .done(function (response) { self.previewHandlersHelper.doneStartExportHandler(deffered, inlineResult, response, printable); })
                            .fail(function (error) { self.previewHandlersHelper.errorStartExportHandler(deffered, error); });
                    }
                    else {
                        deffered.resolve(true);
                        this._safelyRunWindowOpen(actionUri + "?actionKey=exportTo&arg=" + args);
                    }
                    return deffered.promise();
                };
                ReportPreview.prototype._safelyRunWindowOpen = function (url, target, useIFrame) {
                    if (target === void 0) { target = "_blank"; }
                    if (useIFrame === void 0) { useIFrame = false; }
                    var newWindow = window.open(url, target);
                    target === "_blank" && newWindow && (newWindow.opener = newWindow);
                    return newWindow;
                };
                ReportPreview.prototype.createBrickClickProcessor = function (cyclePageIndex) {
                    var _self = this;
                    return function (brick, e) {
                        _self.goToPage(cyclePageIndex, true);
                        if (!brick)
                            return;
                        var page = _self.pages()[cyclePageIndex];
                        if (!page)
                            return;
                        page.selectBrick("");
                        var shiftKey = !!(e && e.shiftKey);
                        var ctrlKey = !!(e && e.ctrlKey);
                        var brickNavigation = brick && brick.navigation;
                        var defaultHandler = function () {
                            if (brickNavigation) {
                                if (brickNavigation.drillDownKey && _self.reportId && _self._doDrillDown && _self._drillDownState.length > 0) {
                                    if (_self._startBuildOperationId)
                                        return;
                                    _self._doDrillDown(brickNavigation.drillDownKey);
                                }
                                else if (brickNavigation.sortData && _self.reportId && _self._doSorting && _self._sortingState.length > 0) {
                                    if (_self._startBuildOperationId)
                                        return;
                                    _self._doSorting(brickNavigation.sortData, shiftKey, ctrlKey);
                                }
                                if (brickNavigation.pageIndex >= 0) {
                                    var targetPage = _self.pages().filter(function (page) { return page.pageIndex === brickNavigation.pageIndex; })[0];
                                    if (targetPage) {
                                        _self.goToPage(brickNavigation.pageIndex);
                                        targetPage.selectBrick(brickNavigation.indexes);
                                        _self.brickClickDocumentMapHandler && _self.brickClickDocumentMapHandler(brickNavigation);
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
                    this._clearReportInfo();
                    var deferred = $.Deferred();
                    this._openReportOperationDeferred = deferred;
                    this.requestWrapper.openReport(reportName).done(function (response) {
                        deferred.resolve(response);
                    }).fail(function (error) {
                        deferred.reject(error);
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
                            var customizeExportOptionsArgs = { exportOptions: deserializedExportOptions, panelVisible: true };
                            _this.customizeExportOptions && _this.customizeExportOptions(customizeExportOptionsArgs);
                            _this.exportOptionsTabVisible(customizeExportOptionsArgs.panelVisible);
                            _this.exportOptionsModel(deserializedExportOptions);
                            _this.originalParametersInfo(previewInitialize.parametersInfo);
                            if (previewInitialize.documentId) {
                                _this.progressBar.startProgress(function () { _this.documentBuilding(false); }, function () { _this.stopBuild(); });
                                _this.documentBuilding(true);
                                var doGetBuildStatusFunc = _this.getDoGetBuildStatusFunc();
                                doGetBuildStatusFunc(previewInitialize.documentId);
                            }
                        }
                        else {
                            _this.pageLoading(false);
                            _this._processError(DevExpress.Designer.getLocalization("The report preview initialization has failed", "ASPxReportsStringId.WebDocumentViewer_InitializationErro"), previewInitialize && previewInitialize.error);
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
                    this.originalParametersInfo(null);
                };
                ReportPreview.prototype.startBuild = function () {
                    this._initialize();
                    return this._startBuildRequest();
                };
                ReportPreview.prototype.updateExportStatus = function (progress) {
                    this.progressBar && this.progressBar.progress(progress);
                    if (this._window) {
                        var div = this._window.document.getElementById("loading");
                        if (!div) {
                            div = this._window.document.createElement("div");
                            div.id = "loading";
                            div.style.position = "absolute";
                            div.style.left = "0";
                            div.style.top = "0";
                            div.style.bottom = "0";
                            div.style.right = "0";
                            div.style["text-align"] = "center";
                            div.style.margin = "auto";
                            div.style.height = "0";
                            div.style.fontSize = "32px";
                            this._window.document.body.appendChild(div);
                        }
                        div.innerText = DevExpress.Designer.getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument') + " " + progress + "%";
                        this._window.document.title = DevExpress.Designer.getLocalization("Exporting...", "ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle") + progress + "%";
                    }
                };
                ReportPreview.prototype.customDocumentOperation = function (customData, hideMessageFromUser) {
                    var documentId = this._currentDocumentId();
                    if (this.documentBuilding() || !documentId)
                        return;
                    var serializedExportOptions = this.exportOptionsModel() ? JSON.stringify(new DevExpress.JS.Utils.ModelSerializer().serialize(this.exportOptionsModel())) : null;
                    var editingFields = this._editingFields && this._editingFields().map(function (item) { return item.editValue(); });
                    var deferred = $.Deferred();
                    this.requestWrapper.customDocumentOperation(documentId, serializedExportOptions, editingFields, customData, hideMessageFromUser)
                        .done(function (response) {
                        try {
                            if (response && response.message) {
                                var handler = response.succeeded ? Preview.MessageHandler.processMessage : Preview.MessageHandler.processError;
                                handler(response.message, !hideMessageFromUser);
                            }
                        }
                        finally {
                            deferred.resolve(response);
                        }
                    })
                        .fail(function (error) {
                        var response = { message: DevExpress.Designer.getLocalization("The requested document operation cannot be performed.", "ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error") };
                        deferred.reject(response);
                    });
                    return deferred.promise();
                };
                ReportPreview.prototype._initializeStartBuild = function () {
                    var _this = this;
                    if (this.documentBuilding() || this._startBuildOperationId) {
                        return false;
                    }
                    this._startBuildOperationId = Preview.generateGuid();
                    this._currentDocumentId(null);
                    this.progressBar.text(DevExpress.Designer.getLocalization("Creating the document...", "PreviewStringId.Msg_CreatingDocument"));
                    this.progressBar.cancelText(DevExpress.Designer.getLocalization('Cancel', 'ASPxReportsStringId.SearchDialog_Cancel'));
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
                ReportPreview.prototype.getExportResult = function (operationId, inlineDisposition, token, printable, uri) {
                    if (printable === void 0) { printable = false; }
                    if (uri === void 0) { uri = ""; }
                    if (uri) {
                    }
                    else if (token) {
                        var arg = DevExpress.JS.Utils.formatUnicorn("?token={0}&printable={1}", encodeURIComponent(token), printable);
                        uri = Preview.ReportServerDownloadUri + arg;
                    }
                    else {
                        var arg = encodeURIComponent(JSON.stringify({ id: operationId, inlineResult: !!inlineDisposition }));
                        uri = Preview.HandlerUri + "?actionKey=getExportResult&arg=" + arg;
                    }
                    this._window && this._window.location.replace(uri);
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
                ReportPreview.prototype.getDoGetBuildStatusFunc = function () {
                    var preview = this;
                    var doGetBuildStatus = function (documentId) {
                        var promise = preview.getBuildStatus(documentId);
                        promise.done(function (result) {
                            if (documentId !== preview._currentDocumentId())
                                return;
                            if (result && result.requestAgain && !preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                                var doStatusRequest = function () {
                                    if (!preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                                        doGetBuildStatus(documentId);
                                    }
                                };
                                Preview.PollingDelay ? setTimeout(doStatusRequest, Preview.PollingDelay) : doStatusRequest();
                            }
                            else {
                                try {
                                    if (result.error || !result.requestAgain && !result.pageCount) {
                                        preview.removeEmptyPages(!result.pageCount);
                                        if (!preview.pages().length)
                                            preview.pageIndex(-1);
                                        return;
                                    }
                                    if (!result.completed) {
                                        return;
                                    }
                                    else if (result.pageCount < preview.pages().length) {
                                        preview.pageIndex(Math.min(result.pageCount - 1, preview.pageIndex()));
                                        preview.pages.splice(result.pageCount, preview.pages().length);
                                    }
                                    preview.getDocumentData(documentId);
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
                            var customizeExportOptionsArgs = { exportOptions: deserializedExportOptions, panelVisible: true };
                            _this.customizeExportOptions && _this.customizeExportOptions(customizeExportOptionsArgs);
                            _this.exportOptionsTabVisible(customizeExportOptionsArgs.panelVisible);
                            _this.exportOptionsModel(deserializedExportOptions);
                        }
                        _this.documentMap(response.documentMap);
                        _this._editingValuesSubscriptions.forEach(function (item) { return item.dispose(); });
                        _this._editingValuesSubscriptions = [];
                        _this._editingFields((response.editingFields || []).map(function (item, index) {
                            var field = _this.createEditingField(item, index);
                            if (_this.editingFieldChanged) {
                                field.editingFieldChanged = _this.editingFieldChanged;
                            }
                            _this._editingValuesSubscriptions.push(field.editValue);
                            return field;
                        }));
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
                    this._export(args, Preview.HandlerUri, true, true);
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
                ReportPreview.prototype.goToPage = function (pageIndex, forcePageChanging, throttle) {
                    var _this = this;
                    if (!forcePageChanging && this.pageIndex.peek() === pageIndex || this.pages.peek().length === 0 || pageIndex < 0 || pageIndex >= this.pages.peek().length) {
                        return;
                    }
                    if (this._goToPageTimer !== undefined) {
                        clearTimeout(this._goToPageTimer);
                    }
                    var updateActivePage = function (activePageIndex) {
                        _this.pages.peek().forEach(function (page) {
                            var visible = page.pageIndex === activePageIndex;
                            page.active(visible);
                            page.isClientVisible(visible);
                        });
                        _this._goToPageTimer = undefined;
                    };
                    if (throttle)
                        this._goToPageTimer = setTimeout(function () { return updateActivePage(_this.pageIndex()); }, throttle);
                    else
                        updateActivePage(pageIndex);
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
                ReportPreview.prototype.createEditingField = function (item, index) {
                    return new Preview.EditingField(item, index, this.requestWrapper);
                };
                ReportPreview.prototype._getErrorMessage = function (jqXHR) {
                    var serverError = DevExpress.Designer.getErrorMessage(jqXHR);
                    if (!serverError)
                        return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.result && jqXHR.responseJSON.result.faultMessage ?
                            jqXHR.responseJSON.result.faultMessage :
                            serverError;
                    return serverError;
                };
                ReportPreview.prototype._processError = function (error, jqXHR, showForUser) {
                    if (showForUser === void 0) { showForUser = true; }
                    var prefix = error + ": ";
                    var serverError = this._getErrorMessage(jqXHR);
                    serverError && (error = prefix + serverError);
                    Preview.MessageHandler.processError(error, showForUser, serverError && prefix);
                };
                ReportPreview.prototype.emptyDocumentCaption = function () {
                    var parametersInfo = this.originalParametersInfo();
                    var parametersExist = parametersInfo && parametersInfo.parameters.length > 0;
                    if (this.documentBuilding()) {
                        return DevExpress.Designer.getLocalization("Creating the document...", "PreviewStringId.Msg_CreatingDocument");
                    }
                    else if (parametersExist && !this.documentId) {
                        return DevExpress.Designer.getLocalization("Waiting for parameter values...", "PreviewStringId.Msg_WaitingForParameterValues");
                    }
                    else if (this.documentId) {
                        return DevExpress.Designer.getLocalization("The document does not contain any pages.", "PreviewStringId.Msg_EmptyDocument");
                    }
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
            }(DevExpress.Designer.Disposable));
            Preview.ReportPreview = ReportPreview;
            function updatePreviewContentSize(previewSize, root, rtl) {
                return function (tabPanelPosition) {
                    var $root = $(root).find(".dxrd-preview");
                    var rightAreaWidth = $root.find(".dxrd-right-panel").outerWidth() + $root.find(".dxrd-right-tabs").outerWidth();
                    rightAreaWidth = isNaN(rightAreaWidth) ? 0 : rightAreaWidth;
                    var surfaceWidth = $root.width() - rightAreaWidth - 10;
                    var cssStyleData = (rtl || tabPanelPosition === DevExpress.Analytics.TabPanel.Position.Left) ? { 'right': '', 'left': rightAreaWidth } : { 'right': rightAreaWidth, 'left': '' };
                    $root.find(".dxrd-preview-wrapper").css(cssStyleData);
                    if (tabPanelPosition === DevExpress.Analytics.TabPanel.Position.Left)
                        $root.find(".dxrd-toolbar-wrapper").css(cssStyleData);
                    else
                        $root.find(".dxrd-toolbar-wrapper").css({ 'left': 'unset' });
                    previewSize(surfaceWidth);
                };
            }
            Preview.updatePreviewContentSize = updatePreviewContentSize;
            function updatePreviewZoomWithAutoFit(width, height, $element, autoFitBy) {
                if (autoFitBy === void 0) { autoFitBy = Preview.ZoomAutoBy.WholePage; }
                var $previewWrapper = $element.closest(".dxrd-preview-wrapper");
                var $preview = $element.closest(".dxrd-preview");
                if ($previewWrapper.length === 0 || $preview.length === 0) {
                    return 1;
                }
                var rightAreaWidth = $preview.find(".dxrd-right-panel").outerWidth() + $preview.find(".dxrd-right-tabs").outerWidth();
                rightAreaWidth = isNaN(rightAreaWidth) ? 0 : rightAreaWidth;
                var surfaceWidth = $preview.width() - rightAreaWidth - 10;
                var topAreaHeight = parseFloat($previewWrapper.css("top").split("px")[0]);
                var designerHeight = $preview.outerHeight();
                var surfaceHeight = designerHeight - topAreaHeight;
                if (autoFitBy === Preview.ZoomAutoBy.PageWidth) {
                    return (surfaceWidth - 12) / width;
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
            function createDesktopPreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, rtl, tabPanelSettings) {
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
                var tabPanel = new DevExpress.Designer.TabPanel({
                    tabs: [
                        parametersModel.tabInfo,
                        exportModel.tabInfo,
                        searchModel.tabInfo,
                        documentMapModel.tabInfo
                    ],
                    autoSelectTab: true,
                    rtl: rtl
                });
                tabPanel.collapsed(true);
                var globalActionProviders = ko.observableArray([new Preview.PreviewActions(reportPreview), exportModel, searchModel, new Preview.PreviewDesignerActions(reportPreview)]);
                var actionLists = new Preview.ActionLists(reportPreview, globalActionProviders, callbacks && callbacks.customizeActions, reportPreview.previewVisible);
                reportPreview.previewVisible(previewVisible);
                var designerModel = {
                    rootStyle: "dxrd-preview dxd-back-primary",
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
                    { id: Preview.PreviewElements.Toolbar, templateName: Preview.PreviewElements.Toolbar, model: { actionLists: actionLists } },
                    { id: Preview.PreviewElements.Surface, templateName: Preview.PreviewElements.Surface, model: designerModel.reportPreview },
                    { id: Preview.PreviewElements.RightPanel, templateName: Preview.PreviewElements.RightPanel, model: designerModel }
                ];
                callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
                var updatePreviewContentSize_ = updatePreviewContentSize(reportPreview.previewSize, element, rtl);
                if (tabPanelSettings) {
                    tabPanelSettings.width && tabPanel.width(tabPanelSettings.width);
                    tabPanelSettings.position && tabPanel.position(tabPanelSettings.position);
                }
                designerModel.resizeCallback = function () {
                    updatePreviewContentSize_(tabPanel.position());
                };
                $(window).bind("resize", designerModel.resizeCallback);
                tabPanel.width.subscribe(function () {
                    setTimeout(function () { return updatePreviewContentSize_(tabPanel.position()); }, 1);
                });
                tabPanel.position.subscribe(function (newVal) {
                    updatePreviewContentSize_(newVal);
                });
                tabPanel.isEmpty.subscribe(function () {
                    setTimeout(function () {
                        updatePreviewContentSize_(tabPanel.position());
                    }, 1);
                });
                designerModel.updateSurfaceSize = function () {
                    updatePreviewContentSize_(tabPanel.position());
                };
                updatePreviewContentSize_(tabPanel.position());
                DevExpress.Designer.appendStaticContextToRootViewModel(designerModel);
                if (element && !reportPreview.canSwitchToDesigner && applyBindings) {
                    callbacks.beforeRender && callbacks.beforeRender(designerModel);
                    $(element).children().remove();
                    ko.applyBindings(designerModel, element);
                }
                return designerModel;
            }
            Preview.createDesktopPreview = createDesktopPreview;
            function createPreview(element, callbacks, localization, parametersInfo, handlerUri, previewVisible, rtl, isMobile, mobileModeSettings, applyBindings, allowURLsWithJSContent, remoteSettings, tabPanelSettings) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                if (localization && localization.localization) {
                    DevExpress.JS.Localization.addCultureInfo({
                        messages: localization.localization
                    });
                }
                callbacks && callbacks.customizeLocalization && callbacks.customizeLocalization();
                callbacks && callbacks.onServerError && DevExpress.Designer.processErrorEvent(callbacks.onServerError);
                if (localization && localization.currentCulture) {
                    DevExpress.Analytics.Internal.applyLocalizationToDevExtreme(localization.currentCulture);
                }
                DevExpress.config({ rtlEnabled: !!rtl });
                if (remoteSettings && (remoteSettings.authToken || remoteSettings.serverUri)) {
                    Object.defineProperty(Preview, "AsyncExportApproach", {
                        get: function () { return true; },
                        set: function (newVal) { }
                    });
                    handlerUri = Report.RequestHelper.generateUri(remoteSettings.serverUri, ReportServerInvokeUri);
                    Preview.searchAvailable(false);
                    Preview.editablePreviewEnabled(false);
                    Preview.ReportServerDownloadUri = Report.RequestHelper.generateUri(remoteSettings.serverUri, ReportServerExportUri);
                    if (remoteSettings.authToken) {
                        DevExpress.Analytics.Utils.ajaxSetup.ajaxSettings = {
                            headers: {
                                'Authorization': 'Bearer ' + remoteSettings.authToken
                            }
                        };
                    }
                }
                var designerModel;
                if (isMobile) {
                    designerModel = DevExpress.Report.Preview.createMobilePreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, mobileModeSettings);
                }
                else {
                    designerModel = createDesktopPreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, rtl, tabPanelSettings);
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
                };
                designerModel.GetCurrentPageIndex = function () {
                    return designerModel.reportPreview.pageIndex();
                };
                designerModel.GoToPage = function (pageIndex) {
                    designerModel.reportPreview.goToPage(pageIndex);
                };
                designerModel.Close = function () {
                    designerModel.reportPreview.deactivate();
                };
                designerModel.ResetParameters = function () {
                    var parametersModel = designerModel.parametersModel;
                    parametersModel && designerModel.parametersModel.restore();
                };
                designerModel.StartBuild = function () {
                    var parametersModel = designerModel.parametersModel;
                    parametersModel && designerModel.parametersModel.submit();
                };
                designerModel.PerformCustomDocumentOperation = function (customData, hideMessageFromUser) {
                    return designerModel.reportPreview.customDocumentOperation(customData, hideMessageFromUser);
                };
                return designerModel;
            }
            Preview.createPreview = createPreview;
            function createAndInitPreviewModel(viewerModel, element, callbacks, applyBindings) {
                DevExpress.Designer.initGlobalize(viewerModel);
                var previewModel = DevExpress.Report.Preview.createPreview(element, callbacks, viewerModel, viewerModel.parametersInfo, viewerModel.handlerUri, undefined, viewerModel.rtl, viewerModel.isMobile, viewerModel.mobileModeSettings, applyBindings, viewerModel.allowURLsWithJSContent, viewerModel.remoteSettings, viewerModel.tabPanelSettings);
                if (viewerModel.reportId || viewerModel.documentId) {
                    previewModel.reportPreview.initialize($.Deferred().resolve(viewerModel));
                }
                else {
                    var unwrappedUrl = ko.unwrap(viewerModel.reportUrl);
                    if (unwrappedUrl) {
                        previewModel.OpenReport(unwrappedUrl);
                    }
                }
                $.extend(true, DevExpress.Report.Preview.cultureInfo, viewerModel.cultureInfoList);
                return previewModel;
            }
            Preview.createAndInitPreviewModel = createAndInitPreviewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Internal;
        (function (Internal) {
            DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.addTemplates({
                'dxrd-svg-actions-add_field_to_column_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0h4v14H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h2v2H6zM6 4h2v2H6zM6 8h2v2H6zM6 12h2v2H6zM10 0h2v2h-2zM10 4h2v2h-2zM10 8h2v2h-2zM14 0h2v2h-2zM14 4h2v2h-2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 12h-4V8h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-add_field_to_data_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 14v-4h-4v4h-4v4h4v4h4v-4h4v-4z"/><ellipse class="dxd-icon-fill dxd-opacity-80" cx="6" cy="2" rx="6" ry="2"/><path class="dxd-icon-fill dxd-opacity-80" d="M12 4c0 1.1-2.7 2-6 2s-6-.9-6-2v12c0 1.1 2.7 2 6 2 .7 0 1.4 0 2-.1V12h4V4z"/></svg>',
                'dxrd-svg-actions-add_field_to_filter_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 14v-4h-4v4h-4v4h4v4h4v-4h4v-4zM7 0C3.1 0 0 1.3 0 3v1l6 6v7c0 .5.4 1 1 1 .5 0 1-.4 1-1v-7l6-6V3c0-1.7-3.1-3-7-3zm0 4c-2.8 0-5-.4-5-1s2.2-1 5-1 5 .4 5 1-2.2 1-5 1z"/></svg>',
                'dxrd-svg-actions-add_field_to_row_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 0h14v4H2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M14 6h2v2h-2zM10 6h2v2h-2zM6 6h2v2H6zM2 6h2v2H2zM10 10h2v2h-2zM6 10h2v2H6zM2 10h2v2H2zM6 14h2v2H6zM2 14h2v2H2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 14h-4v-4h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-align_bottoms': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 20h22v2H0zM2 0h8v18H2zM12 8h8v10h-8z"/></svg>',
                'dxrd-svg-actions-align_centers': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 12H12v-2h6V4h-6V0h-2v4H4v6h6v2H0v6h10v4h2v-4h10z"/></svg>',
                'dxrd-svg-actions-align_lefts': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0h2v22H0zM4 12h18v8H4zM4 2h10v8H4z"/></svg>',
                'dxrd-svg-actions-align_middles': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M12 0v10h-2V4H4v6H0v2h4v6h6v-6h2v10h6V12h4v-2h-4V0z"/></svg>',
                'dxrd-svg-actions-align_rights': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 0h2v22h-2zM0 12h18v8H0zM8 2h10v8H8z"/></svg>',
                'dxrd-svg-actions-align_to_grid': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M24 6V4h-4V0h-2v4H6V0H4v4H0v2h4v12H0v2h4v4h2v-4h12v4h2v-4h4v-2h-4V6h4zm-6 12H6v-4h8V6h4v12z"/><path class="dxd-icon-fill dxd-opacity-80" d="M14 0h-4l2 2zM2 12l-2-2v4z"/></svg>',
                'dxrd-svg-actions-align_tops': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0h22v2H0zM2 4h8v18H2zM12 4h8v10h-8z"/></svg>',
                'dxrd-svg-actions-bottom_margin': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M6 20h10v2H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM18 0h2v2h-2zM2 4h2v14H2zM6 4h10v14H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M18 20h2v2h-2zM2 20h2v2H2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 4h2v14h-2zM2 0h2v2H2z"/></svg>',
                'dxrd-svg-actions-bring_to_front': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M6 6h12v12H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M4 4h4V0H0v8h4zM20 20v-4h4v8h-8v-4z"/></svg>',
                'dxrd-svg-actions-center_horizontally': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M8 6h6v10H8z"/><path class="dxd-icon-fill dxd-opacity-60" d="M0 0v22h22V0H0zm20 10h-4v2h4v8H2v-8h4v-2H2V2h18v8z"/></svg>',
                'dxrd-svg-actions-center_vertically': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M6 8h10v6H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M22 0H0v22h22V0zM12 20v-4h-2v4H2V2h8v4h2V2h8v18h-8z"/></svg>',
                'dxrd-svg-actions-decrease_horizontal_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 2v4h-4V0H8v6H4V4H0v6h4V8h4v6h6V8h4v4h4V2zM4 20H0v2h4v2l4-3-4-3zM18 18l-4 3 4 3v-2h4v-2h-4z"/></svg>',
                'dxrd-svg-actions-decrease_vertical_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 18h4v-4H0V8h6V4H4V0h6v4H8v4h6v6H8v4h4v4H2zM20 4V0h2v4h2l-3 4-3-4zM18 18l3-4 3 4h-2v4h-2v-4z"/></svg>',
                'dxrd-svg-actions-delete_cell': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 12l-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3 2-2-3-3z"/><path class="dxd-icon-fill dxd-opacity-60" d="M10 2h2v2h-2zM10 6h2v2h-2zM6 14h2v2H6zM14 2h2v2h-2zM14 6h2v2h-2zM6 2h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 6h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 10h2v2H6zM2 2h2v2H2zM2 6h2v2H2zM2 10h2v2H2zM2 14h2v2H2z"/></svg>',
                'dxrd-svg-actions-delete_column': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 12l-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3 2-2-3-3z"/><path class="dxd-icon-fill dxd-opacity-60" d="M12 2h2v2h-2zM12 6h2v2h-2zM8 14h2v2H8zM16 2h2v2h-2zM16 6h2v2h-2zM8 2h2v2H8zM8 6h2v2H8zM8 10h2v2H8z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 2h4v14H2z"/></svg>',
                'dxrd-svg-actions-delete_row': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 14l-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3 2-2-3-3z"/><path class="dxd-icon-fill dxd-opacity-60" d="M2 8h2v2H2zM6 12h2v2H6zM2 12h2v2H2zM6 16h2v2H6zM2 16h2v2H2zM14 8h2v2h-2zM10 8h2v2h-2zM6 8h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 2h14v4H2z"/></svg>',
                'dxrd-svg-actions-detail': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 0v22h18V0H2zm14 18H6v-2h10v2zm0-4H6v-2h10v2zm0-4H6V8h10v2zm0-4H6V4h10v2z"/></svg>',
                'dxrd-svg-actions-detail_report': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M16 2h-2V0H8v2H6v2h10z"/><path class="dxd-icon-fill dxd-opacity-80" d="M18 2v4H4V2H2v22h18V2h-2zm-2 18H6v-2h10v2zm0-4H6v-2h10v2zm0-4H6v-2h10v2z"/></svg>',
                'dxrd-svg-actions-distribute_columns_evenly': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 2v10h-2V8h-8v4h-2V8H2v4H0V2h2v4h8V2h2v4h8V2h2zM0 22h10v-8H0v8zm12 0h10v-8H12v8z"/></svg>',
                'dxrd-svg-actions-distribute_rows_evenly': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 4v6h4v2h-4v6h4v2H14v-2h4v-6h-4v-2h4V4h-4V2h10v2h-4zM2 10h10V2H2v8zm0 10h10v-8H2v8z"/></svg>',
                'dxrd-svg-actions-fit_bounds_to_text': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M16 24H8l4-4 4 4zm8-8V8l-4 4 4 4zM12 4l4-4H8l4 4zM0 8v8l4-4-4-4zm13.7-2h-3.4L6 18h3l1-3h4l1 3h3L13.7 6zm-3.1 7l1.2-3.8c.1-.3.2-.6.2-1.1 0 .4.1.8.2 1.1l1.2 3.8h-2.8z"/></svg>',
                'dxrd-svg-actions-fit_text_to_bounds': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M16 4H8l4-4 4 4zM4 16V8l-4 4 4 4zm8 8l4-4H8l4 4zm8-16v8l4-4-4-4zm-6.3-2h-3.4L6 18h3l1-3h4l1 3h3L13.7 6zm-3.1 7l1.2-3.8c.1-.3.2-.6.2-1.1 0 .4.1.8.2 1.1l1.2 3.8h-2.8z"/></svg>',
                'dxrd-svg-actions-fit_to_сontainer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M23 0H1C.5 0 0 .5 0 1v22c0 .5.5 1 1 1h22c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 22H2V2h20v20zm-6-6H8V8h8v8zM10 6l2-2 2 2s-3.9-.1-4 0zm-4 8l-2-2s2-2.1 2-2v4zm4 4h4l-2 2s-2.1-2-2-2zm10-6l-2 2v-4c0-.1 2 2 2 2z"/></svg>',
                'dxrd-svg-actions-group_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 0h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-80" d="M0 16h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M8 8h14v2H8zM8 12h14v2H8z"/></svg>',
                'dxrd-svg-actions-group_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 16h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-80" d="M0 0h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M8 12h14v2H8zM8 8h14v2H8z"/></svg>',
                'dxrd-svg-actions-increase_horizontal_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 2v4h-4V0H8v6H4V4H0v6h4V8h4v6h6V8h4v4h4V2zM18 20h-4v2h4v2l4-3-4-3zM4 18l-4 3 4 3v-2h4v-2H4z"/></svg>',
                'dxrd-svg-actions-increase_vertical_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 18h4v-4H0V8h6V4H4V0h6v4H8v4h6v6H8v4h4v4H2zM20 18v-4h2v4h2l-3 4-3-4zM18 4l3-4 3 4h-2v4h-2V4z"/></svg>',
                'dxrd-svg-actions-insert_cell': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 2h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 6h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 10h2v2H6zM6 14h2v2H6zM2 2h2v2H2zM2 6h2v2H2zM2 10h2v2H2zM2 14h2v2H2zM10 2h2v2h-2zM10 6h2v2h-2zM10 10h2v2h-2zM14 2h2v2h-2zM14 6h2v2h-2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 14h-4v-4h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-insert_column_to_left': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0h4v14H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h2v2H6zM6 4h2v2H6zM6 8h2v2H6zM6 12h2v2H6zM10 0h2v2h-2zM10 4h2v2h-2zM10 8h2v2h-2zM14 0h2v2h-2zM14 4h2v2h-2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 12h-4V8h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-insert_column_to_right': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M14 2h4v6h-4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M10 2h2v2h-2zM10 6h2v2h-2zM10 10h2v2h-2zM6 14h2v2H6zM6 2h2v2H6zM6 6h2v2H6zM6 10h2v2H6zM2 2h2v2H2zM2 6h2v2H2zM2 10h2v2H2zM2 14h2v2H2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 14h-4v-4h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-insert_row_above': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 0h14v4H2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M14 6h2v2h-2zM10 6h2v2h-2zM6 6h2v2H6zM2 6h2v2H2zM10 10h2v2h-2zM6 10h2v2H6zM2 10h2v2H2zM6 14h2v2H6zM2 14h2v2H2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 14h-4v-4h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-insert_row_below': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 14h6v4H2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M2 10h2v2H2zM6 10h2v2H6zM10 10h2v2h-2zM6 6h2v2H6zM2 6h2v2H2zM10 6h2v2h-2zM14 6h2v2h-2zM10 2h2v2h-2zM14 2h2v2h-2zM2 2h2v2H2zM6 2h2v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M22 14h-4v-4h-4v4h-4v4h4v4h4v-4h4z"/></svg>',
                'dxrd-svg-actions-make_horizontal_spacing_equal': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 4v6h-4V2H8v8H4V6H0v10h4v-4h4v8h6v-8h4v6h4V4z"/></svg>',
                'dxrd-svg-actions-make_same_height': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 16h-2v2h-2l3 4 3-4h-2zM18 6h2V4h2l-3-4-3 4h2zM0 0h6v22H0zM16 8h6v6h-6zM8 0h2v2H8zM12 0h2v2h-2zM8 20h2v2H8zM12 20h2v2h-2z"/></svg>',
                'dxrd-svg-actions-make_same_sizes': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M12 18v-2h-2v2H8l3 4 3-4zM10 4v2h2V4h2l-3-4-3 4zM4 12h2v-2H4V8l-4 3 4 3zM18 10h-2v2h2v2l4-3-4-3zM8 8h6v6H8zM2 2h6V0H0v8h2zM20 0h-6v2h6v6h2V0zM20 20h-6v2h8v-8h-2zM2 14H0v8h8v-2H2z"/></svg>',
                'dxrd-svg-actions-make_same_width': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M6 20v-2H4v-2l-4 3 4 3v-2zM16 18v2h2v2l4-3-4-3v2zM0 0h22v6H0zM8 16h6v6H8zM20 8h2v2h-2zM20 12h2v2h-2zM0 8h2v2H0zM0 12h2v2H0z"/></svg>',
                'dxrd-svg-actions-make_vertical_spacing_equal': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 18h-6v-4h8V8h-8V4h4V0H6v4h4v4H2v6h8v4H4v4h14z"/></svg>',
                'dxrd-svg-actions-master_report': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M12 2h-2V0H6v2H4v2h8zM14 14h10v4H14zM14 20h10v4H14z"/><path class="dxd-icon-fill dxd-opacity-80" d="M12 12h4V2h-2v4H2V2H0v20h12z"/></svg>',
                'dxrd-svg-actions-none': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M4 0v22h16V0H4zm14 14l-2 2-4-4-4 4-2-2 4-4-4-4 2-2 4 4 4-4 2 2-4 4 4 4z"/></svg>',
                'dxrd-svg-actions-page_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM6 4h10v8H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 14h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 0h2v2h-2zM6 20h10v2H6zM2 20h2v2H2zM2 4h2v14H2zM18 20h2v2h-2zM2 0h2v2H2zM18 4h2v14h-2z"/></svg>',
                'dxrd-svg-actions-page_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 10h10v8H6zM6 20h10v2H6zM18 0h2v2h-2zM2 4h2v14H2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 4h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM18 20h2v2h-2zM2 20h2v2H2zM2 0h2v2H2zM18 4h2v14h-2z"/></svg>',
                'dxrd-svg-actions-remove_horizontal_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M4 18H0v2h4v2l4-3-4-3zM18 16l-4 3 4 3v-2h4v-2h-4zM4 8V4H0v6h4zM14 8V0H8v14h6zM18 2v10h4V2z"/></svg>',
                'dxrd-svg-actions-remove_vertical_spacing': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 4h-2V0h-2v4h-2l3 4zM16 18h2v4h2v-4h2l-3-4zM4 0h6v4H4zM0 8h14v6H0zM2 18h10v4H2z"/></svg>',
                'dxrd-svg-actions-report_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M16 2h-2V0H8v2H6v2h10zM6 22h10v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 16h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 2h2v2h-2zM6 6h10v8H6zM2 6h2v14H2zM18 22h2v2h-2zM2 22h2v2H2zM2 2h2v2H2zM18 6h2v14h-2z"/></svg>',
                'dxrd-svg-actions-report_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M16 2h-2V0H8v2H6v2h10zM6 22h10v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 6h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 2h2v2h-2zM6 12h10v8H6zM2 6h2v14H2zM18 22h2v2h-2zM2 22h2v2H2zM2 2h2v2H2zM18 6h2v14h-2z"/></svg>',
                'dxrd-svg-actions-send_to_back': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 0h8v8H0zM16 16h8v8h-8z"/><path class="dxd-icon-fill dxd-opacity-80" d="M14 14h4V6h-8v4H6v8h8z"/></svg>',
                'dxrd-svg-actions-size_to_grid': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 4V0h-2v4H6V0H4v4H0v2h4v12H0v2h4v4h2v-4h12v4h2v-4h4v-2h-4V6h4V4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M14 0h-4l2 2zM0 10v4l2-2zM10 24h4l-2-2zM24 14v-4l-2 2z"/></svg>',
                'dxrd-svg-actions-subband': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M2 4h14v6H2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M8 14h14v6H8z"/></svg>',
                'dxrd-svg-actions-top_margin': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 20h10v2H6z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 0h10v2H6zM18 0h2v2h-2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M2 4h2v14H2zM6 4h10v14H6zM18 20h2v2h-2zM2 20h2v2H2zM18 4h2v14h-2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 0h2v2H2z"/></svg>',
                'dxrd-svg-actions-vertical_detail': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill dxd-opacity-80" d="M10 6h4v10h-4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM20 6h-4v10h4V6zM8 6H4v10h4V6zm12-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-actions-vertical_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill dxd-opacity-80" d="M4 6h4v10H4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM20 6H10v10h10V6zm0-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-actions-vertical_total': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill dxd-opacity-80" d="M16 6h4v10h-4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM14 6H4v10h10V6zm6-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-bands-bottom_margin': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M6 20h10v2H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM18 0h2v2h-2zM2 4h2v14H2zM6 4h10v14H6z"/><path class="dxd-icon-fill" d="M18 20h2v2h-2zM2 20h2v2H2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 4h2v14h-2zM2 0h2v2H2z"/></svg>',
                'dxrd-svg-bands-detail': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v22h18V0H2zm14 18H6v-2h10v2zm0-4H6v-2h10v2zm0-4H6V8h10v2zm0-4H6V4h10v2z"/></svg>',
                'dxrd-svg-bands-detail_report': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 2h-2V0H8v2H6v2h10z"/><path class="dxd-icon-fill" d="M18 2v4H4V2H2v22h18V2h-2zm-2 18H6v-2h10v2zm0-4H6v-2h10v2zm0-4H6v-2h10v2z"/></svg>',
                'dxrd-svg-bands-group_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 0h12v6H0z"/><path class="dxd-icon-fill" d="M0 16h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M8 8h14v2H8zM8 12h14v2H8z"/></svg>',
                'dxrd-svg-bands-group_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 16h12v6H0z"/><path class="dxd-icon-fill" d="M0 0h12v6H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M8 12h14v2H8zM8 8h14v2H8z"/></svg>',
                'dxrd-svg-bands-master_report': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M12 2h-2V0H6v2H4v2h8zM14 14h10v4H14zM14 20h10v4H14z"/><path class="dxd-icon-fill" d="M12 12h4V2h-2v4H2V2H0v20h12z"/></svg>',
                'dxrd-svg-bands-page_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM6 4h10v8H6z"/><path class="dxd-icon-fill" d="M6 14h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 0h2v2h-2zM6 20h10v2H6zM2 20h2v2H2zM2 4h2v14H2zM18 20h2v2h-2zM2 0h2v2H2zM18 4h2v14h-2z"/></svg>',
                'dxrd-svg-bands-page_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 10h10v8H6zM6 20h10v2H6zM18 0h2v2h-2zM2 4h2v14H2z"/><path class="dxd-icon-fill" d="M6 4h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 0h10v2H6zM18 20h2v2h-2zM2 20h2v2H2zM2 0h2v2H2zM18 4h2v14h-2z"/></svg>',
                'dxrd-svg-bands-report_footer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M16 2h-2V0H8v2H6v2h10zM6 22h10v2H6z"/><path class="dxd-icon-fill" d="M6 16h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 2h2v2h-2zM6 6h10v8H6zM2 6h2v14H2zM18 22h2v2h-2zM2 22h2v2H2zM2 2h2v2H2zM18 6h2v14h-2z"/></svg>',
                'dxrd-svg-bands-report_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M16 2h-2V0H8v2H6v2h10zM6 22h10v2H6z"/><path class="dxd-icon-fill" d="M6 6h10v4H6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 2h2v2h-2zM6 12h10v8H6zM2 6h2v14H2zM18 22h2v2h-2zM2 22h2v2H2zM2 2h2v2H2zM18 6h2v14h-2z"/></svg>',
                'dxrd-svg-bands-sub_band': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M2 4h14v6H2z"/><path class="dxd-icon-fill" d="M8 14h14v6H8z"/></svg>',
                'dxrd-svg-bands-top_margin': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M6 20h10v2H6z"/><path class="dxd-icon-fill" d="M6 0h10v2H6zM18 0h2v2h-2z"/><path class="dxd-icon-fill dxd-opacity-60" d="M2 4h2v14H2zM6 4h10v14H6zM18 20h2v2h-2zM2 20h2v2H2zM18 4h2v14h-2z"/><path class="dxd-icon-fill" d="M2 0h2v2H2z"/></svg>',
                'dxrd-svg-bands-vertical_detail': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill" d="M10 6h4v10h-4z"/><path class="dxd-icon-fill" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM20 6h-4v10h4V6zM8 6H4v10h4V6zm12-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-bands-vertical_header': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill" d="M4 6h4v10H4z"/><path class="dxd-icon-fill" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM20 6H10v10h10V6zm0-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-bands-vertical_total': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><g><path class="dxd-icon-fill" d="M16 6h4v10h-4z"/><path class="dxd-icon-fill" d="M2 4H0V2h2v2zm0 2H0v10h2V6zm0 12H0v2h2v-2zM14 6H4v10h10V6zm6-4H4v2h16V2zm4 0h-2v2h2V2zm0 4h-2v10h2V6zm0 12h-2v2h2v-2zM4 20h16v-2H4v2z" opacity=".72"/></g></svg>',
                'dxrd-svg-chartstructure-axes': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 20H4V0H2v4H0v2h2v4H0v2h2v4H0v2h2v4h4v2h2v-2h4v2h2v-2h4v2h2v-2h4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M24 6V4h-2V2h-2V0h-2v2h-4V0h-2v2H8V0H6v4h14v14h4v-2h-2v-4h2v-2h-2V6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M10 14V6H6v2h2v4H6v2h2v2h2v2h2v-2h4v2h2v-4z"/></svg>',
                'dxrd-svg-chartstructure-axisx': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M22 17l-6-5v4h-4v-2h-2v2H6v-2H4v2H0v2h4v2h2v-2h4v2h2v-2h4v4zM4 8h2V6h4v4l6-5-6-5v4H6V2H4v2H0v2h4z"/></svg>',
                'dxrd-svg-chartstructure-axisy': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M17 0l-5 6h4v4h-2v2h2v4h-2v2h2v4h2v-4h2v-2h-2v-4h2v-2h-2V6h4zM8 18v-2H6v-4h4L5 6l-5 6h4v4H2v2h2v4h2v-4z"/></svg>',
                'dxrd-svg-chartstructure-chart': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M10 22V12H0c.5 5 5 9.5 10 10zM12 12v10c5-.5 9.5-5 10-10H12z"/><path class="dxd-icon-fill" d="M0 6h4v4H0zM6 4h4v6H6zM12 2h4v8h-4z"/><g><path class="dxd-icon-fill" d="M18 0h4v10h-4z"/></g></svg>',
                'dxrd-svg-chartstructure-constantline': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 6h-6V0h-2v6H0v2h16v16h2V8h6z"/></svg>',
                'dxrd-svg-chartstructure-constantlines': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M24 20H4V0H2v4H0v2h2v4H0v2h2v4H0v2h2v4h4v2h2v-2h4v2h2v-2h4v2h2v-2h4z"/><path class="dxd-icon-fill" d="M24 6V4h-4V0h-2v4h-4V0h-2v4H6v2h6v4H6v2h6v6h2v-6h4v6h2v-6h4v-2h-4V6h4zm-10 4V6h4v4h-4z"/></svg>',
                'dxrd-svg-chartstructure-defaultpane': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h10v22H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M12 0v10h10V0H12zm8 8h-6V2h6v6zM12 22h10V12H12v10zm2-8h6v6h-6v-6z"/></svg>',
                'dxrd-svg-chartstructure-diagram': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M0 16h4v6H0zM12 10h4v12h-4z"/><path class="dxd-icon-fill" d="M18 2h4v20h-4zM6 6h4v16H6z"/></svg>',
                'dxrd-svg-chartstructure-legend': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h10v10H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M0 12h10v10H0z"/><path class="dxd-icon-fill" d="M12 2h10v2H12zM12 6h10v2H12zM12 14h10v2H12zM12 18h10v2H12z"/></svg>',
                'dxrd-svg-chartstructure-panes': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h10v22H0z"/><path class="dxd-icon-fill dxd-opacity-80" d="M12 0v10h10V0H12z"/><path class="dxd-icon-fill dxd-opacity-60" d="M12 22h10V12H12v10z"/></svg>',
                'dxrd-svg-chartstructure-series': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 22h22V10l-4-4-8 8-4-4-6 6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M18 0l-8 8-4-4-6 6v4l6-6 4 4 8-8 4 4V4z"/></svg>',
                'dxrd-svg-chartstructure-seriescollection': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 20H4V0H2v4H0v2h2v4H0v2h2v4H0v2h2v4h4v2h2v-2h4v2h2v-2h4v2h2v-2h4z"/><path class="dxd-icon-fill" d="M15 7l-9 9v2h18v-2z"/><path class="dxd-icon-fill dxd-opacity-80" d="M15 4l9 9V4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M6 13l9-9-9-4z"/></svg>',
                'dxrd-svg-chartstructure-title': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M4 8v14h14V8H4zm12 8h-2v-2h2v2zm-6 0v-2h2v2h-2zm2 2v2h-2v-2h2zm-4-2H6v-2h2v2zm8-6v2h-2v-2h2zm-4 2h-2v-2h2v2zm-4-2v2H6v-2h2zm-2 8h2v2H6v-2zm8 2v-2h2v2h-2z"/><path class="dxd-icon-fill" d="M8 0h6v6H8z"/></svg>',
                'dxrd-svg-chartstructure-titles': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2h4v4H2zM10 2h4v4h-4zM10 18h4v4h-4zM18 2h4v4h-4zM2 18h4v4H2zM2 10h4v4H2zM18 17.9h4v4h-4zM18 10h4v4h-4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M8 8v8h8V8H8zm6 6h-4v-4h4v4z"/></svg>',
                'dxrd-svg-color_gear': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.White{fill:#FFFFFF;}</style><path class="White" d="M30 18v-4l-4.4-.7c-.2-.8-.5-1.5-.9-2.1l2.6-3.6-2.8-2.8-3.6 2.6c-.7-.4-1.4-.7-2.1-.9L18 2h-4l-.7 4.4c-.8.2-1.5.5-2.1.9L7.5 4.7 4.7 7.5l2.6 3.6c-.4.7-.7 1.4-.9 2.1L2 14v4l4.4.7c.2.8.5 1.5.9 2.1l-2.6 3.6 2.8 2.8 3.6-2.6c.7.4 1.4.7 2.1.9L14 30h4l.7-4.4c.8-.2 1.5-.5 2.1-.9l3.6 2.6 2.8-2.8-2.6-3.6c.4-.7.7-1.4.9-2.1L30 18zm-14 2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>',
                'dxrd-svg-fieldlist-calcboolean': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm18 8L8 18l-4-4v-4l4 4L18 4v4z"/></svg>',
                'dxrd-svg-fieldlist-calcdate': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm11 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/><path class="dxd-icon-fill dxd-opacity-80" d="M15 10h-3V7c0-.5-.4-1-1-1-.5 0-1 .4-1 1v4c0 .5.4 1 1 1h4c.5 0 1-.4 1-1s-.4-1-1-1z"/></svg>',
                'dxrd-svg-fieldlist-calcdefault': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm17.6 5.8c-.2.1-.4.2-.7.2-.3 0-.5-.1-.7-.2-.2-.1-.2-.3-.2-.4 0-.2 0-.4.1-.6.1-.1.2-.2.2-.3 0-.1 0-.1-.1-.1s-.1-.1-.2-.1c-.4 0-.8.3-1.2.6-.7.6-1.4 2.1-1.8 3.1h2l-1 1.9h-1.6l-.8 2.3c-.6 1.7-1.1 2.8-1.6 3.6-.5.7-1.2 1.3-1.9 1.6-.7.4-1.6.6-2.5.6-.6 0-1-.1-1.3-.3-.2-.1-.3-.5-.3-.7s.2-1 1.2-1c.9 0 1 .8 1 1s-.1.3-.2.4-.2.1-.2.2l.1.1H6c.2 0 .4 0 .5-.1.4-.2.6-.5.8-.9.1-.2.4-.7.7-1.7l1.7-5H8l1-1.9h1.3c.2-.1.6-.9.7-1.1.8-1 1.4-1.7 2.2-2.2.9-.6 1.8-.8 2.9-.8.7 0 1.1.1 1.4.3.3.2.5.4.5.7s-.2.6-.4.8z"/></svg>',
                'dxrd-svg-fieldlist-calcfloat': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm8 16H2v-2h2v-4H2V8h2V6h2v8h2v2zm4 0h-2v-2h2v2zm8-8v2h-2v2h-2v2h4v2h-6v-4h2v-2h2V8h-4V6h6v2z"/></svg>',
                'dxrd-svg-fieldlist-calcinteger': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm6 16H4v-6H2V8h2V6h2v10zm6-9v3h-2v4h2v2H8v-6h2V8H8V6h4v1zm8 0v9h-6v-2h4v-2h-2v-2h2V8h-4V6h6v1z"/></svg>',
                'dxrd-svg-fieldlist-calcstring': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 0v22h22V0H0zm10 18H4v-6h4v-2H4V8h6v10zm8-4.3V18h-6V4h2v6h4v3.7z"/><path class="dxd-icon-fill dxd-opacity-80" d="M6 14h2v2H6zM14 12h2v4h-2z"/></svg>',
                'dxrd-svg-landscape': '<svg data-bind="svgAttrs" viewBox="0 0 34 34"><style>.st0{opacity:0.5;}</style><g><path class="dxd-icon-fill" d="M33 4H1c-.5 0-1 .5-1 1v24c0 .5.5 1 1 1h32c.5 0 1-.5 1-1V5c0-.5-.5-1-1-1zm-1 24H2V6h30v22z"/><path class="st0 dxd-icon-fill" d="M28 12H6v-2h22v2zm0 2H6v2h22v-2zm0 4H6v2h22v-2zm0 4H6v2h22v-2z"/></g></svg>',
                'dxrd-svg-menu-add_datasource': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><ellipse class="dxd-icon-fill" cx="8" cy="2" rx="6" ry="2"/><path class="dxd-icon-fill" d="M16 10c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm3 7h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2zM8 13c-3.1 0-6-.9-6-2v5c0 1.1 2.9 2 6 2h.3c-.2-.6-.3-1.3-.3-2 0-1.1.2-2.1.6-3H8zM14 8.3V4c0 1.1-2.9 2-6 2s-6-.9-6-2v5c0 1.1 2.9 2 6 2 .6 0 1.3 0 1.9-.1 1-1.3 2.5-2.2 4.1-2.6z"/></svg>',
                'dxrd-svg-menu-exit': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M22 12l-6-6v4H8v4h8v4z"/><path class="dxd-icon-fill" d="M12 20H2V4h10v4h2V2H0v20h14v-6h-2z"/></svg>',
                'dxrd-svg-menu-new_via_wizard': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M5.7 11.3L9.1 16l1.5-5.4L16 9.1l-4.7-3.4-.1-5.7-4.5 3.3-5.4-2 2 5.4L0 11.2z"/><path class="dxd-icon-fill" d="M23.5 20.6l-8.7-8.8-2.3.7-.6 2.1 8.7 8.8c.7.7 1.9.7 2.6 0l.2-.2c.8-.7.8-1.9.1-2.6zM18 12l2 2V2h-6v2h4zM6 20v-6H4v8h12l-2-2z"/></svg>',
                'dxrd-svg-menu-newreport': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M14 0v6h6z"/><path class="dxd-icon-fill" d="M12 0H2v22h18V8h-8z"/></svg>',
                'dxrd-svg-menu-run_wizard': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M11.3 5.7L11.2 0 6.7 3.3 1.5 1.5l1.8 5.2L0 11.2l5.7.1L9.1 16l1.5-5.4L16 9.1z"/><path class="dxd-icon-fill" d="M23.5 20.6l-8.7-8.8-2.3.7-.6 2.1 8.7 8.8c.7.7 1.9.7 2.6 0l.2-.2c.8-.7.8-1.9.1-2.6z"/></svg>',
                'dxrd-svg-multi_select': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M12 12h12v12H12zM12 0H0v12h4V4h8z"/><path class="dxd-icon-fill" d="M18 6H6v12h4v-8h8z"/></svg>',
                'dxrd-svg-none': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 0v22h16V0H4zm14 14l-2 2-4-4-4 4-2-2 4-4-4-4 2-2 4 4 4-4 2 2-4 4 4 4z"/></svg>',
                'dxrd-svg-pictureeditor-alignment_bottomcenter': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M10 16h12v12H10z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_bottomleft': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M4 16h12v12H4z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_bottomright': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M16 16h12v12H16z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_middlecenter': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M10 10h12v12H10z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_middleleft': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M4 10h12v12H4z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_middleright': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M16 10h12v12H16z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_topcenter': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M10 4h12v12H10z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_topleft': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M4 4h12v12H4z"/></g></svg>',
                'dxrd-svg-pictureeditor-alignment_topright': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .Green{fill:#039C23;} .Yellow{fill:#FFB115;} .Red{fill:#D11C1C;} .White{fill:#FFFFFF;} .st0{opacity:0.5;} .st1{opacity:0.75;}</style><g><path class="Black" d="M31 0H1C.5 0 0 .5 0 1v30c0 .5.5 1 1 1h30c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 30H2V2h28v28z"/><path class="Green" d="M16 4h12v12H16z"/></g></svg>',
                'dxrd-svg-pictureeditor-image_gallery': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><style>.White{fill:#FFFFFF;} .st0{opacity:0.5;}</style><path class="White" d="M22 2H2c-.5 0-1 .5-1 1v18c0 .5.5 1 1 1h20c.5 0 1-.5 1-1V3c0-.5-.5-1-1-1zm-1 18H3V4h18v16zM15.5 6C16.9 6 18 7.1 18 8.5S16.9 11 15.5 11 13 9.9 13 8.5 14.1 6 15.5 6zM15 19l-8-8-3 3v5h11z"/><path class="st0 White" d="M16.4 19H19l-4-4-1.3 1.3z"/></svg>',
                'dxrd-svg-pictureeditor-size_mode_normal': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .st0{opacity:0.35;}</style><g><path class="Blue" d="M10 10h12v12H10z"/><path class="st0 Black" d="M5 15h3v2H5v4l-5-5 5-5v4zm6-10h4v3h2V5h4l-5-5-5 5zm21 11l-5-5v4h-3v2h3v4l5-5zm-15 8h-2v3h-4l5 5 5-5h-4v-3z"/><path class="Black" d="M28 22c-2.2 0-4 1.8-4 4v5c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-5c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"/></g></svg>',
                'dxrd-svg-pictureeditor-size_mode_squeeze': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .st0{opacity:0.35;}</style><g><path class="Blue" d="M10 10h12v12H10z"/><path class="Black" d="M28.2 26.8l2.1 2.1-1.4 1.4-2.1-2.1L24 31v-7h7l-2.8 2.8zm-24.4 0l-2.1 2.1 1.4 1.4 2.1-2.1L8 31v-7H1l2.8 2.8zM28.2 5.2l2.1-2.1-1.4-1.4-2.1 2.1L24 1v7h7l-2.8-2.8zM1 8h7V1L5.2 3.8 3.1 1.7 1.7 3.1l2.1 2.1L1 8z"/></g></svg>',
                'dxrd-svg-pictureeditor-size_mode_stretchimage': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .st0{opacity:0.35;}</style><g><path class="Blue" d="M10 10h12v12H10z"/><path class="Black" d="M5 15h3v2H5v4l-5-5 5-5v4zm6-10h4v3h2V5h4l-5-5-5 5zm21 11l-5-5v4h-3v2h3v4l5-5zm-15 8h-2v3h-4l5 5 5-5h-4v-3z"/></g></svg>',
                'dxrd-svg-pictureeditor-size_mode_zoomimage': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><style>.Black{fill:#727272;} .Blue{fill:#1177D7;} .st0{opacity:0.35;}</style><g><path class="Blue" d="M10 10h12v12H10z"/><path class="Black" d="M6.2 4.8l2.1 2.1-1.4 1.4-2.1-2.1L2 9V2h7L6.2 4.8zm19.6 0l-2.1 2.1 1.4 1.4 2.1-2.1L30 9V2h-7l2.8 2.8zM6.2 27.2l2.1-2.1-1.4-1.4-2.1 2.1L2 23v7h7l-2.8-2.8zM23 30h7v-7l-2.8 2.8-2.1-2.1-1.4 1.4 2.1 2.1L23 30z"/></g></svg>',
                'dxrd-svg-pictureeditor-toolbar_brush_options': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><style>.White{fill:#FFFFFF;} .BrushColor{fill:#000000;} .st0{opacity:0.75;}</style><g><path class="BrushColor" d="M2 21c8.5 8.6 11.8-4.5 19 0-8.4-8.6-11.8 4.6-19 0z"/><path class="White" d="M8 13l2 2c-2.5 4.2-4 4-8 4 2.5-2.5 3.3-6 6-6zm6-1l6.5-6.5c.3-.3.3-.7 0-1l-2-2c-.3-.3-.7-.3-1 0L11 9l3 3zm-5-1c-.3.3-.3.7 0 1l2 2c.3.3.7.3 1 0l1-1-3-3-1 1z"/></g></svg>',
                'dxrd-svg-pictureeditor-toolbar_clear': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><style>.White{fill:#FFFFFF;} .Color{fill:#5DABE0;} .st0{opacity:0.75;}</style><path class="White" d="M14.2 12l5.5-5.5c.3-.3.3-.8 0-1.1l-1.1-1.1c-.3-.3-.8-.3-1.1 0L12 9.8 6.5 4.2c-.3-.3-.8-.3-1.1 0L4.2 5.4c-.3.3-.3.8 0 1.1L9.8 12l-5.5 5.5c-.3.3-.3.8 0 1.1l1.1 1.1c.3.3.8.3 1.1 0l5.5-5.5 5.5 5.5c.3.3.8.3 1.1 0l1.1-1.1c.3-.3.3-.8 0-1.1L14.2 12z"/></svg>',
                'dxrd-svg-pictureeditor-toolbar_open': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><style>.White{fill:#FFFFFF;} .Color{fill:#5DABE0;} .st0{opacity:0.75;}</style><g><path class="st0 White" d="M7.9 11.9c.4-.6 1-.9 1.7-.9H19V8.7c0-.4-.3-.7-.7-.7H10V5.7c0-.4-.3-.7-.7-.7H3.7c-.4 0-.7.3-.7.7v14l4.9-7.8z"/><path class="White" d="M9.6 12h13.2c.5 0 .9.6.6 1.1l-4 6.5c-.2.3-.5.5-.8.5H4l4.7-7.5c.2-.4.5-.6.9-.6z"/></g></svg>',
                'dxrd-svg-pictureeditor-toolbar_size_mode_and_alignment': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><style>.White{fill:#FFFFFF;} .Color{fill:#5DABE0;} .st0{opacity:0.75;}</style><path class="White" d="M20 12V4h-8l3 3-8 8-3-3v8h8l-3-3 8-8z"/></svg>',
                'dxrd-svg-portrait': '<svg data-bind="svgAttrs" viewBox="0 0 34 34"><style>.st0{opacity:0.5;}</style><g><path class="dxd-icon-fill" d="M29 0H5c-.5 0-1 .5-1 1v32c0 .5.5 1 1 1h24c.5 0 1-.5 1-1V1c0-.5-.5-1-1-1zm-1 32H6V2h22v30z"/><path class="st0 dxd-icon-fill" d="M24 8H10V6h14v2zm0 2H10v2h14v-2zm0 4H10v2h14v-2zm0 4H10v2h14v-2zm0 4H10v2h14v-2zm0 4H10v2h14v-2z"/></g></svg>',
                'dxrd-svg-preview-export-Export': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M22 10l-4-4v2h-1.4C11.8 8 8 11.1 8 15.9V18c1-4.2 4.6-6 8.6-6H18v2l4-4z"/><path class="dxd-icon-fill" d="M18 22H4V2h14l2 2V0H2v24h18v-8l-2 2z"/></svg>',
                'dxrd-svg-preview-export-export-to-csv': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h12v9H2v11h10v-7l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3zM0 3v7h13V3H0zm4 2H2v3h2v1H2V8H1V5h1V4h2v1zm4 0H6v1h1v1h1v1H7v1H5V8h2V7H6V6H5V5h1V4h2v1zm4 3h-1v1h-1V8H9V4h1v4h1V4h1v4z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4z"/></svg>',
                'dxrd-svg-preview-export-export-to-html': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h18v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM0 3v7h19V3H0zm4 6H3V7H2v2H1V4h1v2h1V4h1v5zm4-4H7v4H6V5H5V4h3v1zm6 4h-1V6h-1v1h-1V6h-1v3H9V4h1v1h1v1h1V5h1V4h1v5zm4 0h-3V4h1v4h2v1z"/></svg>',
                'dxrd-svg-preview-export-export-to-image': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h14v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM0 3v7h15V3H0zm2 6H1V4h1v5zm6 0H7V6H6v1H5V6H4v3H3V4h1v1h1v1h1V5h1V4h1v5zm5-4h-3v3h2V7h1v2h-3V8H9V5h1V4h3v1z"/></svg>',
                'dxrd-svg-preview-export-export-to-mht': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h12v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM2 5h1v1H2z"/><path class="dxd-icon-fill" d="M0 3v7h13V3H0zm4 3H3v1h1v2H3V7H2v2H1V4h2v1h1v1zm4-1H7v4H6V5H5V4h3v1zm4 0h-2v1h1v1h-1v2H9V4h3v1z"/></svg>',
                'dxrd-svg-preview-export-export-to-pdf': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h12v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM2 5h1v1H2z"/><path class="dxd-icon-fill" d="M0 3v7h13V3H0zm4 3H3v1H2v2H1V4h2v1h1v1zm4 2H7v1H5V4h2v1h1v3zm4-3h-2v1h1v1h-1v2H9V4h3v1z"/><path class="dxd-icon-fill" d="M6 5h1v3H6z"/></svg>',
                'dxrd-svg-preview-export-export-to-rtf': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h14v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM0 3v7h15V3H0zm6 6H5V6H4v1H3V6H2v3H1V4h1v1h1v1h1V5h1V4h1v5zm4 0H9V7H8v2H7V4h1v2h1V4h1v5zm4-4h-1v4h-1V5h-1V4h3v1z"/></svg>',
                'dxrd-svg-preview-export-export-to-txt': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h18v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM18 3H0v7h19V3h-1zM4 6H3v1h1v2H3V7H2v2H1V7h1V6H1V4h1v2h1V4h1v2zm4 3H5V4h1v4h2v1zm4-4h-2v1h1v1h1v1h-1v1H9V8h2V7h-1V6H9V5h1V4h2v1zm4 1h-1v1h1v2h-1V7h-1v2h-1V7h1V6h-1V4h1v2h1V4h1v2z"/></svg>',
                'dxrd-svg-preview-export-export-to-xls': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h12v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM12.3 3H0v7h13V3h-.7zM4 6H3v1h1v2H3V7H2v2H1V7h1V6H1V4h1v2h1V4h1v2zm4 3H5V4h1v4h2v1zm4-4h-2v1h1v1h1v1h-1v1H9V8h2V7h-1V6H9V5h1V4h2v1z"/></svg>',
                'dxrd-svg-preview-export-export-to-xlsx': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v2h12v9H2v12h10v-8l2-2h7V0z"/><path class="dxd-icon-fill" d="M17 14h3v3h-3z"/><path class="dxd-icon-fill" d="M21 14v4h-6v-4l-2 2v8h10V14h-2zm0 9h-6v-4h6v4zM0 3v7h13V3H0zm4 2H3v4H2V5H1V4h3v1zm4 1H7v1h1v2H7V7H6v2H5V7h1V6H5V4h1v2h1V4h1v2zm4-1h-1v4h-1V5H9V4h3v1z"/></svg>',
                'dxrd-svg-preview-export-export-to': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 4l-4-4v4h4zM22 10v6H12v-6l-2 2v12h14V10h-2zm0 12H12v-4h10v4z"/><path class="dxd-icon-fill" d="M16 10h4v4h-4z"/><path class="dxd-icon-fill" d="M18 6h-6V0H0v20h8V10l2-2h8z"/></svg>',
                'dxrd-svg-preview-first_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M6 12l14 8V4zM2 3h2v18H2z"/></svg>',
                'dxrd-svg-preview-last_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 12L2 20V4zM18 3h2v18h-2z"/></svg>',
                'dxrd-svg-preview-multi_page_preview': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 0H0v10h10V2H8V0zm0 8H2V2h4v2h2v4zM20 2V0h-8v10h10V2h-2zm0 6h-6V2h4v2h2v4zM8 12H0v10h10v-8H8v-2zm0 8H2v-6h4v2h2v4z"/></svg>',
                'dxrd-svg-preview-next_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 12L4 20V4z"/></svg>',
                'dxrd-svg-preview-previous_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 12l14 8V4z"/></svg>',
                'dxrd-svg-preview-print': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 0H6v10h10V0zm-2 8H8V2h6v6zM6 24h10v-6H6v6zm2-4h6v2H8v-2z"/><path class="dxd-icon-fill" d="M20 8h-2v4H4V8H2l-2 2v10h4v-4h14v4h4V10z"/></svg>',
                'dxrd-svg-preview-print_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 0H6v10h10V0zm-2 8H8V2h6v6zM20 8h-2v2h4z"/><path class="dxd-icon-fill" d="M4 8H2l-2 2v10h12v-8H4zM22 14v-2h-8v12h10V14h-2zm0 8h-6v-8h4v2h2v6z"/></svg>',
                'dxrd-svg-preview-print_preview': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 4l-4-4v4zM21.7 22.3l-4.5-4.5c.5-.8.8-1.8.8-2.8 0-2.8-2.2-5-5-5s-5 2.2-5 5 2.2 5 5 5c1 0 2-.3 2.8-.8l4.5 4.5c.4.4 1 .4 1.4 0s.4-1 0-1.4zM13.1 18c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.4 3-3 3z"/><path class="dxd-icon-fill" d="M13 8c2 0 3.7.8 5 2.1V6h-6V0H0v20h8.1C6.8 18.7 6 17 6 15c0-3.9 3.1-7 7-7z"/></svg>',
                'dxrd-svg-preview-report_designer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 6l-4-4v4h4zM14 18h2l8-8-2-2-8 8z"/><path class="dxd-icon-fill" d="M12 20v-4l6-6V8h-6V2H0v20h18v-4l-2 2h-4zm-6-4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/><path class="dxd-icon-fill" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2H6v-2z"/></svg>',
                'dxrd-svg-preview-search': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2.6 21.4c.8.8 2 .8 2.8 0l4.6-4.6c1.2.7 2.6 1.1 4.1 1.1 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8c0 1.5.4 2.9 1.1 4.1l-4.6 4.6c-.8.8-.8 2 0 2.8zM10 10.1c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.9-4-4z"/></svg>',
                'dxrd-svg-preview-single_page': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 4V0H2v24h20V4h-4zm2 18H4V2h12v4h4v16z"/></svg>',
                'dxrd-svg-preview-sort_asc': '<svg data-bind="svgAttrs" viewBox="0 0 11 11"><path class="dxd-icon-fill" d="M0 7l5-5 5 5z"/></svg>',
                'dxrd-svg-preview-sort_desc': '<svg data-bind="svgAttrs" viewBox="0 0 11 11"><path class="dxd-icon-fill" d="M10 3L5 8 0 3z"/></svg>',
                'dxrd-svg-reportexplorer-component': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><ellipse class="dxd-icon-fill" cx="11" cy="4" rx="7" ry="2"/><path class="dxd-icon-fill" d="M11 10c-3.9 0-7-.9-7-2v12c0 1.1 3.1 2 7 2s7-.9 7-2V8c0 1.1-3.1 2-7 2z"/></svg>',
                'dxrd-svg-reportexplorer-components': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><circle class="dxd-icon-fill" cx="12" cy="12" r="2"/><path class="dxd-icon-fill" d="M20 10h-.3c-.2-.7-.5-1.4-.9-2.1l.2-.2c.8-.8.8-2.1 0-2.8-.8-.8-2.1-.8-2.8 0l-.2.2c-.6-.4-1.3-.7-2.1-.9V4c0-1.1-.9-2-2-2S10 2.9 10 4v.3c-.7.2-1.4.4-2.1.8l-.1-.2c-.8-.7-2.1-.7-2.9 0-.7.8-.7 2.1 0 2.9l.2.2c-.4.6-.6 1.3-.8 2H4c-1.1 0-2 .9-2 2s.9 2 2 2h.3c.2.7.5 1.4.9 2.1l-.2.2c-.8.8-.8 2.1 0 2.8.8.8 2.1.8 2.8 0l.2-.2c.6.4 1.3.7 2.1.9v.2c0 1.1.9 2 2 2s2-.9 2-2v-.3c.7-.2 1.4-.5 2.1-.9l.2.2c.8.8 2.1.8 2.8 0 .8-.8.8-2.1 0-2.8L19 16c.4-.6.7-1.3.9-2.1h.1c1.1 0 2-.9 2-2 0-1-.9-1.9-2-1.9zm-8 6c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>',
                'dxrd-svg-reportexplorer-formatting_rule': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 10h6V2H2v18h12v-2l-4-4z"/><path class="dxd-icon-fill" d="M12 12v2l4 4v4h2v-4l4-4v-2z"/></svg>',
                'dxrd-svg-reportexplorer-formatting_rules': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M12 0H0v16h2V2h10z"/><path class="dxd-icon-fill" d="M10 10h6V4H4v16h10v-2l-4-4z"/><path class="dxd-icon-fill" d="M12 12v2l4 4v4h2v-4l4-4v-2z"/></svg>',
                'dxrd-svg-reportexplorer-style': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M6 20c1-.3 1.5-1.1 1.7-2 .2-.5.4-1 .8-1.4.3-.3.5-.5.9-.6 0 0 .7-.1 1-.5.1-.1.2-.3.2-.3l.7-1.3c.1-.2.8-.9.8-.9.6-.7 1.3-1.4 1.9-2.1V2H0v18h6zm5.4-6.4c-.1.3-.2.4 0 0zM21.8 8.1c-.2-.2-.5-.1-.8.1-.4.4-.9.7-1.3 1.1-2 1.7-3.5 3.4-5.3 5.3-.1.1-.5.5-.5.6-.2.2-.3.4-.6.8.6.5 1.5 1.2 2.1 1.7.4-.3.6-.6.6-.6l.4-.4c.7-.9 1.1-1.5 1.8-2.4 1.3-1.7 2.5-3.5 3.5-5.4.4-.3.3-.6.1-.8zM12.5 18.1c-.1-.1-.2-.1-.3-.1-.7-.1-1.2.2-1.7.7-.3.3-.6.8-.8 1.3-.2.9-.7 1.7-1.7 2h2.6c1 0 1.8-.4 2.5-1.1.4-.4.7-.9.6-1.5 0-.2-.1-.4-.2-.5-.3-.3-.7-.5-1-.8z"/></svg>',
                'dxrd-svg-reportexplorer-styles': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M12 0v2H2v14H0V0z"/><path class="dxd-icon-fill" d="M8 20c1-.3 1.5-1.1 1.7-2 .2-.5.4-1 .8-1.4.3-.3.5-.5.9-.6 0 0 .7-.1 1-.5.1-.1.2-.3.2-.3l.7-1.3c.1-.2.8-.9.8-.9.6-.7 1.3-1.4 1.9-2.1V4H4v16h4zm5.4-6.4c-.1.3-.2.4 0 0zM23.8 8.1c-.2-.2-.5-.1-.8.1-.4.4-.9.7-1.3 1.1-2 1.7-3.5 3.4-5.3 5.3-.1.1-.5.5-.5.6-.2.2-.3.4-.6.8.6.5 1.5 1.2 2.1 1.7.4-.3.6-.6.6-.6l.4-.4c.7-.9 1.1-1.5 1.8-2.4 1.3-1.7 2.5-3.5 3.5-5.4.4-.3.3-.6.1-.8zM14.5 18.1c-.1-.1-.2-.1-.3-.1-.7-.1-1.2.2-1.7.7-.4.4-.6.9-.8 1.4-.3.9-.7 1.6-1.7 2h2.6c1 0 1.8-.4 2.5-1.1.4-.4.7-.9.6-1.5 0-.2-.1-.4-.2-.5-.3-.4-.7-.6-1-.9z"/></svg>',
                'dxrd-svg-reportexplorer-tablecell': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 8v8h8V8H8zm6 6h-4v-4h4v4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M2 2v20h20V2H2zm18 6h-4v2h4v4h-4v2h4v4h-4v-4h-2v4h-4v-4H8v4H4v-4h4v-2H4v-4h4V8H4V4h4v4h2V4h4v4h2V4h4v4z"/></svg>',
                'dxrd-svg-reportexplorer-tablerow': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 8H2v8h20V8h-6zm-8 6H4v-4h4v4zm6 0h-4v-4h4v4zm6 0h-4v-4h4v4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M4 8V4h4v4h2V4h4v4h2V4h4v4h2V2H2v6zM20 16v4h-4v-4h-2v4h-4v-4H8v4H4v-4H2v6h20v-6z"/></svg>',
                'dxrd-svg-series-area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 20v-4l8-8 4 4 8-8v16z"/></svg>',
                'dxrd-svg-series-area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 12v2h4v2H8v2h4v2H8v2h6V12zM20 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M12 8L8 4l-8 8v4h6v-6h14V0z"/></svg>',
                'dxrd-svg-series-bubbles': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><circle class="dxd-icon-fill" cx="8" cy="4" r="2"/><circle class="dxd-icon-fill" cx="16" cy="10" r="4"/><circle class="dxd-icon-fill" cx="7" cy="19" r="3"/></svg>',
                'dxrd-svg-series-candle_stick': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 4V2h-2v2h-2v16h2v2h2v-2h2V4h-2zm0 14h-2V6h2v12zM8 2H6v2H4v16h2v2h2v-2h2V4H8z"/></svg>',
                'dxrd-svg-series-doughnut': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M5.1 10C5.5 7 7 5.5 10 5.1V0C5 .5.5 5 0 10h5.1zM12 5.1c3 .5 5 2.9 5 5.9 0 1.3-.4 2.5-1.1 3.5l3.6 3.6c1.5-2 2.5-4.4 2.5-7.1C22 5.3 18 .5 12 0v5.1zM14.5 15.9c-1 .7-2.2 1.1-3.5 1.1-3 0-5.4-2-5.9-5H0c.5 6 5.2 10 11 10 2.7 0 5.1-1 7-2.6l-3.5-3.5z"/></svg>',
                'dxrd-svg-series-doughnut3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2.5v-5.9L22 12zm0 8h-2v-6h2v6zM10 4.9V0C5 .5.5 5 0 10h5c.5-3 2-4.6 5-5.1zM12 0v4.9c2 .4 4.5 2.1 4.9 5.1h5C21.5 5 17 .5 12 0zM5.1 12H0c.4 5 4 7.9 8 9.1v-5.3C6 14.9 5.4 14 5.1 12z"/></svg>',
                'dxrd-svg-series-full_stacked_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2v14L12 6l4 4 6-6V2z"/><path class="dxd-icon-fill" d="M12 10L2 20v2h20V8l-6 6z"/></svg>',
                'dxrd-svg-series-full_stacked_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM14 8l6-6V0H0v14L10 4z"/><path class="dxd-icon-fill" d="M10 8L0 18v2h8v-8h6zM20 6l-6 6h6z"/></svg>',
                'dxrd-svg-series-full_stacked_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 4h4v10H4zM10 4h4v6h-4zM10 12h4v8h-4zM16 4h4v8h-4zM16 14h4v6h-4zM4 16h4v4H4z"/></svg>',
                'dxrd-svg-series-full_stacked_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0h4v10H2zM8 0h4v6H8zM8 8h4v4H8zM14 0h4v8h-4zM14 10h4v2h-4zM2 12h4v4H2zM8 14v2h4v2H8v2h4v2H8v2h6V14h-2zM20 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/></svg>',
                'dxrd-svg-series-full_stacked_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2h20v2H2zM12 8L2 18v4l10-10 4 4 6-6V6l-6 6z"/></svg>',
                'dxrd-svg-series-full_stacked_line3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 14v2h4v2H8v2h4v2H8v2h6V14h-2zM20 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 0h20v2H0z"/><path class="dxd-icon-fill" d="M12 12h4l4-4V4l-6 6-4-4L0 16v4l10-10z"/></svg>',
                'dxrd-svg-series-full_stacked_spline_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 11.9c1.8 0 2.6 1.3 3.3 2.3S6.5 16 8 16c1.4 0 2.6-2.1 3.7-4.2C13.3 9.1 14.9 6 18 6c1.5 0 2.8.7 4 1.8V2H2v9.9z"/><path class="dxd-icon-fill" d="M18 8c-1.9 0-3.2 2.4-4.5 4.7C12.1 15.3 10.6 18 8 18s-3.7-1.6-4.4-2.7C3 14.3 2.7 14 2 14v8h20V10.7C20.8 9.3 19.4 8 18 8z"/></svg>',
                'dxrd-svg-series-full_stacked_spline_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM16 4c1.5 0 2.8.7 4 1.8V0H0v9.9c1.8 0 2.6 1.3 3.3 2.3C4 13.2 4.5 14 6 14c1.4 0 2.6-2.1 3.7-4.2C11.3 7.1 12.9 4 16 4z"/><path class="dxd-icon-fill" d="M11.5 10.8l-.6 1.2H20V8.7C18.8 7.3 17.4 6 16 6c-1.9 0-3.2 2.5-4.5 4.8zM1.6 13.3C1 12.3.7 12 0 12v8h8v-4.6c-1 .4-1.2.6-2 .6-2.6 0-3.6-1.6-4.4-2.7z"/></svg>',
                'dxrd-svg-series-funnel': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12h4l6-6H4zM4 2h16v2H4zM10 22l4-2v-6h-4z"/></svg>',
                'dxrd-svg-series-funnel3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM6 10h4l6-6H0zM0 0h16v2H0zM6 20l2-1v-7H6z"/></svg>',
                'dxrd-svg-series-gantt': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 4h8v4H2zM6 10h14v4H6zM2 16h12v4H2z"/></svg>',
                'dxrd-svg-series-line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 16L12 6l4 4 6-6v4l-6 6-4-4L2 20z"/></svg>',
                'dxrd-svg-series-line3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M20 0l-6 6-4-4L0 12v4L10 6l4 4 6-6z"/><path class="dxd-icon-fill" d="M8 12v2h4v2H8v2h4v2H8v2h6V12h-2zM20 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/></svg>',
                'dxrd-svg-series-manhattan_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 12h4v8H0z"/><path class="dxd-icon-fill dxd-opacity-60" d="M12 5.9h4V10h-4z"/><path class="dxd-icon-fill dxd-opacity-80" d="M8 10h2V2H6v18h2z"/></svg>',
                'dxrd-svg-series-nested_doughnut': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M20 10h2c-.5-5-5-9.5-10-10v2c4 .5 7.5 4 8 8z"/><path class="dxd-icon-fill" d="M11 20c-5 0-9-4-9-9 0-4.6 3-8.5 8-9V0C4 .5 0 5.2 0 11c0 6.1 4.9 11 11 11 5.7 0 10.5-4 11-10h-2c-.5 5-4.3 8-9 8z"/><path class="dxd-icon-fill" d="M11 16c-2.4 0-4.4-2-4.9-4h-2c.5 3 3.4 6 6.9 6 1.4 0 2.7-.4 3.8-1.2l-1.5-1.5c-.6.5-1.4.7-2.3.7zM4.1 10h2c.5-2 2.5-4 4.9-4 2.8 0 5 2.2 5 5 0 .9-.2 1.7-.7 2.4l1.5 1.5c.8-1.1 1.2-2.5 1.2-3.9 0-3.9-3.1-7-7-7-3.5 0-6.4 3-6.9 6z"/></svg>',
                'dxrd-svg-series-pie': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M12 2v10H2c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2z"/><path class="dxd-icon-fill" d="M10 0C4.5 0 0 4.5 0 10h10V0z"/></svg>',
                'dxrd-svg-series-pie3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM10 0C4.5 0 0 4.5 0 10h10V0zM12 2v8h9.8c-.9-4.6-5-8-9.8-8zM8 21.1V12H2c0 4.1 2 7.6 6 9.1z"/></svg>',
                'dxrd-svg-series-point': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><circle class="dxd-icon-fill" cx="4" cy="16" r="2"/><circle class="dxd-icon-fill" cx="8" cy="8" r="2"/><circle class="dxd-icon-fill" cx="14" cy="12" r="2"/><circle class="dxd-icon-fill" cx="20" cy="6" r="2"/></svg>',
                'dxrd-svg-series-polar_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zm.9 19.9V17c0-.5-.5-1-1-1s-1 .5-1 1v3c-4-.4-7.5-3.8-8-8h3.1c.5 0 1-.5 1-1s-.5-1-1-1h-3H2c.5-4.2 4-7.5 8-8v1c0 .5.5 1 1 1s1-.5 1-1v-.9c4 .5 7.5 3.8 7.9 7.9H19c-.5 0-1 .5-1 1s.5 1 1 1h.9c-.4 4.1-3.9 7.4-7.9 7.9z"/><path class="dxd-icon-fill" d="M6 6h10v10z"/></svg>',
                'dxrd-svg-series-polar_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zm.9 19.9V17c0-.5-.5-1-1-1s-1 .5-1 1v3c-4-.4-7.5-3.8-8-8h3.1c.5 0 1-.5 1-1s-.5-1-1-1h-3H2c.5-4.2 4-7.5 8-8v1c0 .5.5 1 1 1s1-.5 1-1v-.9c4 .5 7.5 3.8 7.9 7.9H19c-.5 0-1 .5-1 1s.5 1 1 1h.9c-.4 4.1-3.9 7.4-7.9 7.9z"/><path class="dxd-icon-fill" d="M16 16L6 6h10v10zm-6-8l4 4V8h-4z"/></svg>',
                'dxrd-svg-series-polar_point': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zm8.8 10H12V2.1c4 .5 7.5 3.8 7.9 7.9zM10 2v8H2.1 2c.5-4.2 4-7.5 8-8zm0 18c-4-.4-7.5-3.8-8-8h8v8zm2-.1V12h7.9c-.4 4.1-3.9 7.4-7.9 7.9z"/><circle class="dxd-icon-fill" cx="7" cy="7" r="1"/><circle class="dxd-icon-fill" cx="7" cy="15" r="1"/><circle class="dxd-icon-fill" cx="15" cy="7" r="1"/><circle class="dxd-icon-fill" cx="15" cy="15" r="1"/></svg>',
                'dxrd-svg-series-radar_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 16L6 6h10v10zm-6-8l4 4V8h-4z"/><path class="dxd-icon-fill dxd-opacity-60" d="M11.9 15.9c-.3.1-.6.1-.9.1-2.8 0-5-2.2-5-5 0-.3 0-.6.1-.9L4.5 8.5c-.3.8-.5 1.6-.5 2.5 0 3.9 3.1 7 7 7 .9 0 1.7-.2 2.5-.5l-1.6-1.6z"/><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zM11 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/></svg>',
                'dxrd-svg-series-radar_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zM11 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/><circle class="dxd-icon-fill" cx="7" cy="7" r="1"/><circle class="dxd-icon-fill" cx="7" cy="15" r="1"/><circle class="dxd-icon-fill" cx="15" cy="7" r="1"/><circle class="dxd-icon-fill" cx="15" cy="15" r="1"/><g><path class="dxd-icon-fill dxd-opacity-60" d="M13.1 15.5c-.6.3-1.4.5-2.1.5-.7 0-1.4-.2-2.1-.5-.2.7-.8 1.3-1.6 1.4 1.1.7 2.3 1 3.6 1 1.3 0 2.6-.4 3.7-1-.7-.1-1.3-.6-1.5-1.4zM17 7.4c-.1.8-.7 1.4-1.4 1.6.2.6.4 1.3.4 2s-.2 1.4-.5 2.1c.7.2 1.3.8 1.4 1.6.6-1.1 1-2.3 1-3.6s-.3-2.7-.9-3.7zM8.9 6.5c.7-.3 1.4-.5 2.1-.5.7 0 1.5.2 2.1.5.2-.7.8-1.3 1.6-1.4-1.1-.7-2.3-1-3.7-1-1.3-.1-2.6.3-3.6.9.7.2 1.3.7 1.5 1.5zM6.5 13.1c-.3-.7-.5-1.4-.5-2.1s.2-1.4.5-2.1c-.8-.2-1.3-.8-1.5-1.6-.6 1.1-1 2.4-1 3.7s.4 2.6 1 3.7c.2-.8.7-1.4 1.5-1.6z"/></g></svg>',
                'dxrd-svg-series-radar_point': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-60" d="M11.1 0H11C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11C22 5 17.1.1 11.1 0zM11 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/><circle class="dxd-icon-fill" cx="7" cy="7" r="1"/><circle class="dxd-icon-fill" cx="15" cy="7" r="1"/><circle class="dxd-icon-fill" cx="15" cy="15" r="1"/><g><path class="dxd-icon-fill dxd-opacity-60" d="M13.1 15.5c-.6.3-1.4.5-2.1.5-.3 0-.6 0-.9-.1h-.2c-.2-.1-.5-.1-.7-.2-.1 0-.2-.1-.3-.1-1.1-.5-2-1.4-2.5-2.5-.1-.1-.1-.2-.1-.3-.1-.2-.2-.4-.2-.7v-.2c-.1-.3-.1-.6-.1-.9 0-.5.1-1 .2-1.5.1-.2.1-.4.2-.6-.7-.2-1.2-.8-1.4-1.6-.1.3-.2.5-.4.8 0 .1-.1.1-.1.2 0 .2-.1.4-.2.6 0 .1-.1.2-.1.3 0 .2-.1.4-.1.6v.3c-.1.3-.1.6-.1.9 0 .3 0 .6.1.9v.2c0 .3.1.5.2.8v.1c.5 1.7 1.6 3.1 3.1 4 .5.3 1.1.6 1.7.8h.1c.3.1.5.1.8.2h.2c.3 0 .6.1.9.1h.5c1.1-.1 2.2-.4 3.1-1-.8-.3-1.4-.8-1.6-1.6zM17 7.4c-.1.8-.7 1.4-1.4 1.6.2.6.4 1.3.4 2s-.2 1.4-.5 2.1c.7.2 1.3.8 1.4 1.6.6-1.1 1-2.3 1-3.6s-.3-2.7-.9-3.7zM7.4 5c.8.1 1.4.7 1.6 1.4.6-.2 1.3-.4 2-.4s1.5.2 2.1.5c.2-.7.8-1.3 1.6-1.4-1.1-.7-2.3-1-3.7-1-1.3-.1-2.6.3-3.6.9z"/></g></svg>',
                'dxrd-svg-series-range_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 14L12 4l4 4 6-6v6l-6 6-4-4L2 20z"/></svg>',
                'dxrd-svg-series-range_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M20 0l-6 6-4-4L0 12v6L10 8l2 2h4l4-4z"/></svg>',
                'dxrd-svg-series-range_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 12h4v8H4zM16 6h4v14h-4zM10 2h4v14h-4z"/></svg>',
                'dxrd-svg-series-scatter_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M22.8 8c-1.5-2.7-4-4.7-7-5.5-3-.8-6.1-.8-8.8.8C3 5.6.5 10 0 14h2.1c.4-4 2.5-6.9 6-8.9 2.2-1.3 4.8-1.4 7.2-.7 2.4.6 4.4 2.3 5.7 4.5 1 1.7 1.2 3.8.7 5.7-.5 1.9-1.8 3.5-3.5 4.5-2.7 1.6-6.2.6-7.8-2.2-1.2-2.1-.4-4.8 1.6-6 .8-.4 1.6-.5 2.5-.3.8.2 1.5.8 2 1.6.3.6.4 1.2.2 1.9-.2.6-.6 1.2-1.1 1.5-.8.5-1.9.2-2.4-.7-.3-.6-.1-1.3.4-1.6l-1-1.8c-1.5.9-2.1 2.9-1.2 4.4 1 1.8 3.3 2.5 5.1 1.4 2.1-1.2 2.9-4 1.7-6.1-.7-1.3-1.8-2.1-3.2-2.5-1.4-.4-2.8-.2-4 .5C8 11 6.9 14.9 8.7 18c2.1 3.8 6.8 5.1 10.6 2.9 2.2-1.3 3.8-3.3 4.4-5.7.6-2.4.3-5-.9-7.2z"/></svg>',
                'dxrd-svg-series-side_by_side_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 12h4v8H4zM16 6h4v14h-4zM10 2h4v18h-4z"/></svg>',
                'dxrd-svg-series-side_by_side_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 10h4v8H0zM12 4h4v6h-4zM10 0H6v18h2v-8h2z"/></svg>',
                'dxrd-svg-series-side_by_side_full_stacked_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h4v12H0zM0 14h4v8H0zM12 0h4v16h-4zM12 18h4v4h-4zM18 8h4v14h-4zM18 0h4v6h-4zM6 8h4v14H6zM6 0h4v6H6z"/></svg>',
                'dxrd-svg-series-side_by_side_full_stacked_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 0h4v12H0zM0 14h4v8H0zM12 0h4v12h-4zM18 8h4v4h-4zM18 0h4v6h-4zM6 0h4v6H6zM10 8H6v14h2V12h2z"/></svg>',
                'dxrd-svg-series-side_by_side_gantt': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0h8v4H2zM4 12h12v4H4zM6 18h12v4H6zM6 6h14v4H6z"/></svg>',
                'dxrd-svg-series-side_by_side_range_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 12h4v8H0zM12 6h4v12h-4zM18 4h4v12h-4zM6 2h4v14H6z"/></svg>',
                'dxrd-svg-series-side_by_side_stacked_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 10h4v2H0zM0 14h4v8H0zM6 12h4v10H6zM6 0h4v10H6zM12 4h4v4h-4zM12 10h4v12h-4zM18 2h4v4h-4zM18 8h4v14h-4z"/></svg>',
                'dxrd-svg-series-side_by_side_stacked_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 8h4v4H0zM0 14h4v8H0zM6 12h2v10H6zM6 0h4v10H6zM12 4h4v4h-4zM12 10h4v2h-4zM18 2h4v4h-4zM18 8h4v2h-4z"/></svg>',
                'dxrd-svg-series-spline': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 11.5C22.1 8.6 19.7 6 17 6c-3 0-4.7 3.1-6.2 5.8C9.6 13.8 8.4 16 7 16c-1.5 0-2-.8-2.7-1.8-.6-1-1.5-2.2-3.3-2.3-.4 0-.7.1-1 .2V15c0-.1.1-.5.4-.8.2-.2.5-.3.6-.3.7 0 1 .4 1.6 1.3C3.4 16.4 4.4 18 7 18c2.6 0 4.1-2.7 5.5-5.2C13.8 10.4 15.1 8 17 8c2.9 0 5.9 5.4 6.9 7.2l.1.2v-3.9z"/></svg>',
                'dxrd-svg-series-spline3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM15 2c2.9 0 5.9 5.4 6.9 7.2l.1.2V5.5C20.1 2.6 17.7 0 15 0c-3 0-4.7 3.1-6.2 5.8C7.6 7.8 6.4 10 5 10c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1v2.3c.2.2.4.5.6.9C1.4 10.4 2.4 12 5 12c2.6 0 4.1-2.7 5.5-5.2C11.8 4.4 13.1 2 15 2z"/></svg>',
                'dxrd-svg-series-spline_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M15 2c-3 0-4.7 3.1-6.2 5.8C7.6 9.8 6.4 12 5 12c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1V20h22V7.5C20.1 4.6 17.8 2 15 2z"/></svg>',
                'dxrd-svg-series-spline_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M22 7.5C20.1 4.6 17.8 2 15 2c-3 0-4.7 3.1-6.2 5.8C7.6 9.8 6.4 12 5 12c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1V20h8v-8h14V7.5z"/></svg>',
                'dxrd-svg-series-stacked_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 8l-4-4L2 14v4L12 8l4 4 6-6V2z"/><path class="dxd-icon-fill" d="M12 12L2 22h20V10l-6 6z"/></svg>',
                'dxrd-svg-series-stacked_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 12v2h4v2h-4v2h4v2h-4v2h6V12h-2zM22 12h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM8 22v-8l-8 8z"/><path class="dxd-icon-fill" d="M20 2l-6 6-4-4L0 14v4L10 8l2 2h4l4-4z"/></svg>',
                'dxrd-svg-series-stacked_bar': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 8h4v4H4zM4 14h4v6H4zM10 2h4v6h-4zM10 10h4v10h-4zM16 6h4v4h-4zM16 12h4v8h-4z"/></svg>',
                'dxrd-svg-series-stacked_bar3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM0 6h4v4H0zM0 12h4v6H0zM6 0h4v6H6zM10 8H6v10h2v-6h2zM12 4h4v4h-4zM12 10h4v2h-4z"/></svg>',
                'dxrd-svg-series-stacked_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M14 8l-4-4L0 14v4L10 8l4 4 8-8V0z"/><path class="dxd-icon-fill" d="M10 10L0 20v4l10-10 8 8 4-4v-4l-4 4z"/></svg>',
                'dxrd-svg-series-stacked_line3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M14 12l8-8V0l-8 8-4-4L0 14v4L10 8zM10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M10 10l-2 2h4zM0 24l8-8v-4l-8 8zM22 10V6l-6 6h4z"/></svg>',
                'dxrd-svg-series-stacked_spline_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M15 0c-3 0-4.7 3.1-6.2 5.8C7.6 7.8 6.4 10 5 10c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1v6c1.2.4 1.8 1.3 2.3 2.1C3 15.2 3.5 16 5 16c1.4 0 2.6-2.1 3.7-4.2C10.3 9.1 12 6 15 6c2.8 0 5.1 2.6 7 5.5v-6C20.1 2.6 17.8 0 15 0z"/><path class="dxd-icon-fill" d="M15 9c-3 0-4.7 3.1-6.2 5.8C7.6 16.8 6.4 19 5 19c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1V22h22v-7.5C20.1 11.6 17.8 9 15 9z"/></svg>',
                'dxrd-svg-series-stacked_spline_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M15 6c2.8 0 5.1 2.6 7 5.5v-6C20.1 2.6 17.8 0 15 0c-3 0-4.7 3.1-6.2 5.8C7.6 7.8 6.4 10 5 10c-1.5 0-2-.8-2.7-1.8-.5-.8-1.1-1.7-2.3-2.1v6c1.2.4 1.8 1.3 2.3 2.1C3 15.2 3.5 16 5 16c1.4 0 2.6-2.1 3.7-4.2C10.3 9.1 12 6 15 6z"/><path class="dxd-icon-fill" d="M5.1 19c-1.5 0-2.1-.8-2.8-1.8-.5-.8-1.2-1.7-2.3-2.1V22h8v-5.7C7 17.8 6.1 19 5.1 19zM10.4 12h9.7c-1.5-1.7-3.2-3-5.2-3-1.9 0-3.3 1.3-4.5 3z"/></svg>',
                'dxrd-svg-series-step_area': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 6V0h-6v12H6V8H0v14h24V6z"/></svg>',
                'dxrd-svg-series-step_area3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM18 14v10h4l2-2v-6l-2-2h-4zm4 8h-2v-6h2v6z"/><path class="dxd-icon-fill" d="M18 6V0h-6v10H6V6H0v14h8v-8h16V6z"/></svg>',
                'dxrd-svg-series-step_line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M14 2v18H8v-6H0v2h6v6h10V4h6v8h2V2z"/></svg>',
                'dxrd-svg-series-step_line3d': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M10 14v2h4v2h-4v2h4v2h-4v2h6V14h-2zM22 14h-4v10h4l2-2v-6l-2-2zm0 8h-2v-6h2v6zM6 12H0v2h4v6h4v-2H6zM16 10h4V8h-2V0h-8v12h2V2h4v6z"/></svg>',
                'dxrd-svg-series-stock': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 0H4v4H0v4h4v14h4v-4h4v-4H8zM20 18V0h-8v4h4v18h8v-4z"/></svg>',
                'dxrd-svg-series-swift_plot': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 8l-4 4-2-2-6 6-4-4-2 2-4-4-2 2v-2l2-2 4 4 2-2 4 4 6-6 2 2 4-4"/></svg>',
                'dxrd-svg-tabs-collapse': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M16 12l-6 6-2-2 4-4-4-4 2-2z"/></svg>',
                'dxrd-svg-tabs-expand': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 12l6 6 2-2-4-4 4-4-2-2z"/></svg>',
                'dxrd-svg-tabs-expressions': '<svg data-bind="svgAttrs" viewBox="0 0 32 32"><path class="dxd-icon-fill" d="M18.6 10c.3-2.5.6-3.4.8-3.7.6-1 2.2-.2 3 0l4.1-4c-3.6-.5-7.1-1.1-9.8 2-1.2 1.4-2 3.3-2.3 5.7l-.2 2H10l-4 4h7.7l-.7 7c-.2 1.9-.8 3.6-3 2.9l-.8-.3-3.7 3.3 2.3.8c2.4.8 4.9-.1 6.7-1.7 1-.9 1.7-1.9 2.2-3 .4-1.1.7-2.5.9-4.4L18 16h4l4-4h-7.6l.2-2z"/></svg>',
                'dxrd-svg-tabs-fieldlist': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><ellipse class="dxd-icon-fill" cx="11" cy="2" rx="7" ry="2"/><path class="dxd-icon-fill" d="M11 6c-3.9 0-7-.9-7-2v4c0 1.1 3.1 2 7 2s7-.9 7-2V4c0 1.1-3.1 2-7 2zM11 12c-3.9 0-7-.9-7-2v4c0 1.1 3.1 2 7 2s7-.9 7-2v-4c0 1.1-3.1 2-7 2zM11 18c-3.9 0-7-.9-7-2v4c0 1.1 3.1 2 7 2s7-.9 7-2v-4c0 1.1-3.1 2-7 2z"/></svg>',
                'dxrd-svg-tabs-parameters': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M19.8 5c-.2-.4-.4-.7-.9-1.1C17.3 2.7 14 2 11 2c-3.4 0-6.3.7-7.8 1.9 0 0-.7.5-1 1.1-.1.3-.2.7-.2 1 0 .2-.1.9 1 2l7 7v6c0 .6.5 1 1 1s1-.5 1-1v-6l7-7c.5-.4 1-1.2 1-2 0-.3-.1-.7-.2-1zM11 8c-3.9 0-7-.9-7-2s3.1-2 7-2c4 0 7 .9 7 2s-3.1 2-7 2z"/></svg>',
                'dxrd-svg-tabs-reportexplorer': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 16v-6h-6V6h4V0H6v6h4v4H4v6H0v6h10v-6H6v-4h10v4h-4v6h10v-6z"/></svg>',
                'dxrd-svg-tabs-search': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2.6 21.4c.8.8 2 .8 2.8 0l4.6-4.5c1.1.7 2.5 1.1 4 1.1 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8c0 1.5.4 2.9 1.1 4.1l-4.6 4.6c-.7.7-.7 1.9.1 2.7zM10 10c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>',
                'dxrd-svg-titles-bottom_center': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M4 0v14h14V0H4zm6 8V6h2v2h-2zm2 2v2h-2v-2h2zm-2-6V2h2v2h-2zM6 2h2v2H6V2zm0 4h2v2H6V6zm0 4h2v2H6v-2zm10 2h-2v-2h2v2zm0-4h-2V6h2v2zm-2-4V2h2v2h-2z"/><path class="dxd-icon-fill" d="M6 18h10v4H6z"/></svg>',
                'dxrd-svg-titles-bottom_left': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M6 0v14h14V0H6zm6 8V6h1.9v2H12zm1.9 2v2H12v-2h1.9zM12 4V2h1.9v2H12zM8 2h1.9v2H8V2zm0 4h1.9v2H8V6zm0 4h1.9v2H8v-2zm9.9 2H16v-2h1.9v2zm0-4H16V6h1.9v2zM16 4V2h1.9v2H16z"/><path class="dxd-icon-fill" d="M2 18h10v4H2z"/></svg>',
                'dxrd-svg-titles-bottom_right': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 0v14h14V0H2zm6 8V6h2v2H8zm2 2v2H8v-2h2zM8 4V2h2v2H8zm6 0h-2V2h2v2zm0 4h-2V6h2v2zm0 4h-2v-2h2v2zM4 10h2v2H4v-2zm0-4h2v2H4V6zm0-2V2h2v2H4z"/><path class="dxd-icon-fill" d="M10 18h10v4H10z"/></svg>',
                'dxrd-svg-titles-left_bottom_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 2H8v14h14V2zm-8 6h2v2h-2V8zm-2 2h-2V8h2v2zm6-2h2v2h-2V8zm0 6v-2h2v2h-2zm-4 0v-2h2v2h-2zm-4 0v-2h2v2h-2zm2-10v2h-2V4h2zm4 0v2h-2V4h2zm2 0h2v2h-2V4z"/><path class="dxd-icon-fill" d="M0 10h4v10H0z"/></svg>',
                'dxrd-svg-titles-left_center_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 4H8v14h14V4zm-8 6h2v2h-2v-2zm-2 2h-2v-2h2v2zm6-2h2v2h-2v-2zm2-4v2h-2V6h2zm-4 0v2h-2V6h2zm-4 0v2h-2V6h2zm-2 10v-2h2v2h-2zm4 0v-2h2v2h-2zm4-2h2v2h-2v-2z"/><path class="dxd-icon-fill" d="M0 6h4v10H0z"/></svg>',
                'dxrd-svg-titles-left_top_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M22 6H8v14h14V6zm-8 6h2v2h-2v-2zm-2 2h-2v-2h2v2zm6-2h2v2h-2v-2zm2-4v2h-2V8h2zm-4 0v2h-2V8h2zm-4 0v2h-2V8h2zm-2 10v-2h2v2h-2zm4 0v-2h2v2h-2zm4-2h2v2h-2v-2z"/><path class="dxd-icon-fill" d="M0 2h4v10H0z"/></svg>',
                'dxrd-svg-titles-right_bottom_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 16h14V2H0v14zm8-6H6V8h2v2zm2-2h2v2h-2V8zm-6 2H2V8h2v2zm-2 4v-2h2v2H2zm4 0v-2h2v2H6zm4 0v-2h2v2h-2zm2-10v2h-2V4h2zM8 4v2H6V4h2zM4 6H2V4h2v2z"/><path class="dxd-icon-fill" d="M18 10h4v10h-4z"/></svg>',
                'dxrd-svg-titles-right_center_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 18h14V4H0v14zm8-6H6v-2h2v2zm2-2h2v2h-2v-2zm-6 2H2v-2h2v2zm0-6v2H2V6h2zm4 0v2H6V6h2zm4 0v2h-2V6h2zm-2 10v-2h2v2h-2zm-4 0v-2h2v2H6zm-2 0H2v-2h2v2z"/><path class="dxd-icon-fill" d="M18 6h4v10h-4z"/></svg>',
                'dxrd-svg-titles-right_top_vertical': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 20h14V6H0v14zm8-6H6v-2h2v2zm2-2h2v2h-2v-2zm-6 2H2v-2h2v2zm0-6v2H2V8h2zm4 0v2H6V8h2zm4 0v2h-2V8h2zm-2 10v-2h2v2h-2zm-4 0v-2h2v2H6zm-2 0H2v-2h2v2z"/><path class="dxd-icon-fill" d="M18 2h4v10h-4z"/></svg>',
                'dxrd-svg-titles-top_center': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M18 22V8H4v14h14zm-6-8v2h-2v-2h2zm-2-2v-2h2v2h-2zm2 6v2h-2v-2h2zm-6 0h2v2H6v-2zm0-4h2v2H6v-2zm0-4h2v2H6v-2zm10 2h-2v-2h2v2zm0 4h-2v-2h2v2zm0 2v2h-2v-2h2z"/><path class="dxd-icon-fill" d="M6 0h10v4H6z"/></svg>',
                'dxrd-svg-titles-top_left': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 22V8H6v14h14zm-6-8v2h-2v-2h2zm-2-2v-2h2v2h-2zm2 6v2h-2v-2h2zm-6 0h2v2H8v-2zm0-4h2v2H8v-2zm0-4h2v2H8v-2zm10 2h-2v-2h2v2zm0 4h-2v-2h2v2zm0 2v2h-2v-2h2z"/><path class="dxd-icon-fill" d="M2 0h10v4H2z"/></svg>',
                'dxrd-svg-titles-top_right': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M16 22V8H2v14h14zm-6-8v2H8v-2h2zm-2-2v-2h2v2H8zm2 6v2H8v-2h2zm4 2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zM4 10h2v2H4v-2zm0 4h2v2H4v-2zm2 4v2H4v-2h2z"/><path class="dxd-icon-fill" d="M10 0h10v4H10z"/></svg>',
                'dxrd-svg-todo-chart': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M0 10h4v12H0zM18 12h4v10h-4zM6 6h4v16H6zM12 2h4v20h-4z"/></svg>',
                'dxrd-svg-todo-gauge': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M11 0C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11S17.1 0 11 0zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/><path class="dxd-icon-fill dxd-opacity-80" d="M11 9c-.2 0-.4 0-.5.1L7.4 6c-.4-.3-1.1-.3-1.5 0s-.4 1 0 1.4L9 10.5v.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2zM6 10.1L4.5 8.5c-.3.8-.5 1.6-.5 2.5 0 1.9.8 3.7 2 5l1.3-1.3c-.9-.9-1.4-2.1-1.4-3.5 0-.4.1-.8.1-1.1z"/><path class="dxd-icon-fill dxd-opacity-80" d="M11 4c-.9 0-1.8.2-2.5.5l1.8 1.8c.2 0 .5-.1.7-.1 2.8 0 5 2.2 5 5 0 1.3-.5 2.5-1.4 3.4L16 16c1.3-1.3 2-3.1 2-5 0-3.9-3.1-7-7-7z"/></svg>',
                'dxrd-svg-todo-pivotgrid': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M20 2H4v2l8 8-8 8v2h16v-2H7l8-8-8-8h13z"/></svg>',
                'dxrd-svg-todo-sparkline': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill dxd-opacity-80" d="M2 4v16h20V4H2zm18 10l-2-2-4 4-2-2-4 4-2-2-2 2v-4l2-2 2 2 4-4 2 2 4-4 2 2v4z"/></svg>',
                'dxrd-svg-toolbar-hightlightEditingFields': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M24 15l-12-5 5 12 2-3 3 3 2-2-3-3zM18 0H0v8h18V0zm-2 6H2V2h14v4zM2 16v-4h8.8l-.8-2H0v8h13.3l-.8-2z"/></svg>',
                'dxrd-svg-toolbar-scripts': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M22 6c-.1-1-1.4-3.4-3-4-.7.5-1.5 1.3-.5 4H22z"/><path class="dxd-icon-fill" d="M16 4c0-1.5.8-2.7 1.9-3.4-.4-.3-1.1-.6-2-.6h-12C1.7 0 0 1.8 0 4v.2L3.4 16H17.2s.2 1.9.4 2.4c.1.3.3 1 .5 1.2.4.6.7 1.1.8 1.1C19.6 20 20 19 20 18L16 4zM17.9.6c.2.1-.1-.1 0 0z"/><path class="dxd-icon-fill" d="M16.4 19.9c-.3-.8-.4-1.9-.4-1.9H0c0 2.2 1.7 4 3.9 4h12c.6 0 1.1-.1 1.6-.3 0-.1-.2-.3-.5-.8-.2-.2-.3-.5-.6-1z"/></svg>',
                'dxrd-svg-toolbar-validateBindingMode': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 5V3c0-1.7 3.6-3 8-3s8 1.3 8 3v2c0 1.7-3.6 3-8 3S0 6.7 0 5zm8 9h.5c.6-1.8 1.8-3.3 3.3-4.4-1.1.3-2.4.4-3.8.4-4.4 0-8-1.3-8-3v4c0 1.7 3.6 3 8 3zm0 3c0-.3 0-.7.1-1H8c-4.4 0-8-1.3-8-3v4c0 1.7 3.6 3 8 3h.5c-.3-.9-.5-2-.5-3zm9-7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm1 12h-2v-2h2v2zm0-4h-2v-6h2v6z"/></svg>',
                'dxrd-svg-toolbox-barcode': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h2v20H0zM14 0h4v18h-4zM10 0h2v16h-2zM4 0h4v18H4zM20 0h2v20h-2z"/></svg>',
                'dxrd-svg-toolbox-charactercomb': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 3v18h9V3H2zm7 10v5H5v-1H4v-3h1v-1h3v-2H5v-1h3v1h1v2z"/><path class="dxd-icon-fill" d="M5 14h3v3H5z"/><g><path class="dxd-icon-fill" d="M15 12h3v5h-3z"/><path class="dxd-icon-fill" d="M12 3v18h9V3h-9zm7 9v6h-5V8h1v3h4v1z"/></g></svg>',
                'dxrd-svg-toolbox-chart': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 10h4v12H0zM18 12h4v10h-4zM6 6h4v16H6zM12 2h4v20h-4z"/></svg>',
                'dxrd-svg-toolbox-checkbox': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2v20h20V2H2zm18 6L8 20l-4-4v-4l4 4L20 4v4z"/></svg>',
                'dxrd-svg-toolbox-crossbandbox': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 8h20v2H2zM2 12h20v2H2zM6 4h12v2h2V2H4v4h2zM18 18H6v-2H4v4h16v-4h-2z"/></svg>',
                'dxrd-svg-toolbox-crossbandline': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 8h18v2H2zM2 12h18v2H2zM10 0h2v6h-2zM10 16h2v6h-2z"/></svg>',
                'dxrd-svg-toolbox-gauge': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M11 0C4.9 0 0 4.9 0 11s4.9 11 11 11 11-4.9 11-11S17.1 0 11 0zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/><path class="dxd-icon-fill" d="M11 9c-.2 0-.4 0-.5.1L7.4 6c-.4-.3-1.1-.3-1.5 0s-.4 1 0 1.4L9 10.5v.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2zM6 10.1L4.5 8.5c-.3.8-.5 1.6-.5 2.5 0 1.9.8 3.7 2 5l1.3-1.3c-.9-.9-1.4-2.1-1.4-3.5 0-.4.1-.8.1-1.1z"/><path class="dxd-icon-fill" d="M11 4c-.9 0-1.8.2-2.5.5l1.8 1.8c.2 0 .5-.1.7-.1 2.8 0 5 2.2 5 5 0 1.3-.5 2.5-1.4 3.4L16 16c1.3-1.3 2-3.1 2-5 0-3.9-3.1-7-7-7z"/></svg>',
                'dxrd-svg-toolbox-label': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M20.7 20.9c-.4-.4-.9-1.4-1.6-2.9L12.3 2H12L5.3 17.6c-.6 1.5-1.2 2.5-1.6 3s-1 .8-1.7.9v.5h6v-.5c-1-.1-1.5-.2-1.7-.3-.4-.3-.6-.7-.6-1.2 0-.4.2-.9.4-1.6l.2-.4h8l.4.9c.3.6.4 1 .4 1.1.1.2.1.4.1.5 0 .3-.1.3-.3.4-.4.2-.9.1-1.6.1H13v1h9v-.5c-.6-.1-1-.3-1.3-.6zM13.4 16H7.2l3.2-7.4 3 7.4z"/></svg>',
                'dxrd-svg-toolbox-line': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M18 16L8 6V0H0v8h6l10 10v6h8v-8h-6zM2 6V2h4v4H2zm20 16h-4v-4h4v4z"/></svg>',
                'dxrd-svg-toolbox-pagebreak': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M4 2h14v6H4zM4 16h14v6H4zM0 8v8l4-4zM18 12l4 4V8z"/></svg>',
                'dxrd-svg-toolbox-pageinfo': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M15 10c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm1 12h-2v-6h2v6zm0-8h-2v-2h2v2z"/><path class="dxd-icon-fill" d="M14.9 8c.4 0 .8 0 1.1.1V6h-6V0H0v20h6.3c-.3-.9-.5-1.9-.5-3 0-5 4.1-9 9.1-9z"/><path class="dxd-icon-fill" d="M12 0v4h4z"/></svg>',
                'dxrd-svg-toolbox-panel': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2v20h20V2H2zm18 18H4V4h16v16z"/></svg>',
                'dxrd-svg-toolbox-picturebox': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 4v16h20V4H2zm6 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm12 12H4v-1.9L8 12l2 2 6-6 4 4v6z"/></svg>',
                'dxrd-svg-toolbox-pivotgrid': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M20 2H4v2l8 8-8 8v2h16v-2H7l8-8-8-8h13z"/></svg>',
                'dxrd-svg-toolbox-richtext': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M20 6h-4V2z"/><path class="dxd-icon-fill" d="M10 16v-6h6l4 4V8h-6V2H4v20h12z"/><path class="dxd-icon-fill" d="M12 12v2l8 8v-4l-6-6z"/></svg>',
                'dxrd-svg-toolbox-shape': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><circle class="dxd-icon-fill" cx="14" cy="14" r="6"/><path class="dxd-icon-fill" d="M14 6c.7 0 1.4.1 2 .3V2H4v12h2c0-4.4 3.6-8 8-8z"/></svg>',
                'dxrd-svg-toolbox-sparkline': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 4v16h20V4H2zm18 10l-2-2-4 4-2-2-4 4-2-2-2 2v-4l2-2 2 2 4-4 2 2 4-4 2 2v4z"/></svg>',
                'dxrd-svg-toolbox-subreport': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M8 0h6v4H8z"/><path class="dxd-icon-fill" d="M16 2v2h2v18H4V4h2V2H2v22h18V2z"/><path class="dxd-icon-fill" d="M6 6v14h10V6H6zm8 12H8v-2h6v2zm0-4H8v-2h6v2zm0-4H8V8h6v2z"/></svg>',
                'dxrd-svg-toolbox-table': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M0 0h6v4H0zM8 0h6v4H8zM16 0h6v4h-6zM0 6h6v4H0zM8 6h6v4H8zM16 6h6v4h-6zM0 12h6v4H0zM8 12h6v4H8zM16 12h6v4h-6zM0 18h6v4H0zM8 18h6v4H8zM16 18h6v4h-6z"/></svg>',
                'dxrd-svg-toolbox-tableofcontents': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 0v22h18V0H2zm5 18H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V8h2v2zm0-4H5V4h2v2zm10 12H9v-2h8v2zm0-4H9v-2h8v2zm0-4H9V8h8v2zm0-4H9V4h8v2z"/></svg>',
                'dxrd-svg-toolbox-zipcode': '<svg data-bind="svgAttrs" viewBox="0 0 24 24"><path class="dxd-icon-fill" d="M2 2h6v2H2zM0 4h2v6H0zM8 4h2v6H8zM0 12h2v8H0zM8 12h2v8H8zM2 10h6v2H2zM2 20h6v2H2zM14 2h6v2h-6zM12 4h2v6h-2zM20 4h2v6h-2zM12 12h2v8h-2zM20 12h2v8h-2zM14 10h6v2h-6zM14 20h6v2h-6z"/></svg>',
                'dxrd-svg-wizard-warning': '<svg data-bind="svgAttrs" viewBox="0 0 31 31"><path class="dxd-icon-fill" d="M15.5 0C6.9 0 0 6.9 0 15.5S6.9 31 15.5 31 31 24.1 31 15.5 24.1 0 15.5 0zm0 25c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zm0-7C14.1 18 13 9.9 13 8.5 13 7.1 14.1 6 15.5 6S18 7.1 18 8.5 16.9 18 15.5 18z"/></svg>',
            });
        })(Internal = Designer.Internal || (Designer.Internal = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
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
                HighlightEditingFields: "dxxrp-highlight-editing-fields",
                ZoomOut: "dxxrp-zoom-out",
                ZoomSelector: "dxxrp-zoom-selector",
                ZoomIn: "dxxrp-zoom-in",
                Print: "dxxrp-print",
                PrintPage: "dxxrp-print-page",
                ExportTo: "dxxrp-export-menu",
                Search: "dxxrp-search"
            };
            Object.defineProperty(Preview.ActionId, "HightlightEditingFields", {
                configurable: true,
                get: function () {
                    console.warn("DevExpress.Report.Preview.ActionId.HightlightEditingFields is DEPRECATED and will be removed in 19.1! Use DevExpress.Report.Preview.ActionId.HighlightEditingFields instead");
                    return Preview.ActionId.HighlightEditingFields;
                },
                set: function (newVal) {
                    console.warn("DevExpress.Report.Preview.ActionId.HightlightEditingFields is DEPRECATED and will be removed in 19.1! Use DevExpress.Report.Preview.ActionId.HighlightEditingFields instead");
                    Preview.ActionId.HighlightEditingFields = newVal;
                }
            });
            var PreviewDesignerActions = (function () {
                function PreviewDesignerActions(reportPreview) {
                    this.actions = [];
                    this.actions.push({
                        id: Preview.ActionId.Design,
                        text: DevExpress.Designer.getLocalization("Design", 'ReportStringId.RepTabCtl_Designer'),
                        imageClassName: "dxrd-image-design",
                        imageTemplateName: "dxrd-svg-preview-report_designer",
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
            }());
            Preview.PreviewDesignerActions = PreviewDesignerActions;
            var ActionLists = (function (_super) {
                __extends(ActionLists, _super);
                function ActionLists(reportPreview, globalActionProviders, customizeActions, enabled) {
                    var _this = _super.call(this, enabled) || this;
                    _this._reportPreview = reportPreview;
                    _this.globalActionProviders = globalActionProviders;
                    _this.toolbarItems = ko.computed(function () {
                        var globalActions = [];
                        globalActionProviders().forEach(function (actionProvider) {
                            globalActions.push.apply(globalActions, actionProvider.getActions(reportPreview));
                        });
                        customizeActions && customizeActions(globalActions);
                        return globalActions;
                    });
                    return _this;
                }
                ActionLists.prototype.processShortcut = function (actions, e) {
                    if (this.shouldIgnoreProcessing(e))
                        return;
                    _super.prototype.processShortcut.call(this, actions, e);
                };
                return ActionLists;
            }(DevExpress.Designer.ActionListsBase));
            Preview.ActionLists = ActionLists;
            var PreviewActions = (function () {
                function PreviewActions(reportPreview) {
                    this.actions = [];
                    var printDisabled = reportPreview.exportDisabled;
                    this.actions.push({
                        id: Preview.ActionId.FirstPage,
                        text: DevExpress.Designer.getLocalization("First Page", "ASPxReportsStringId.DocumentViewer_RibbonCommandText_FirstPage"),
                        imageClassName: "dxrd-image-preview-first",
                        imageTemplateName: "dxrd-svg-preview-first_page",
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
                        text: DevExpress.Designer.getLocalization("Previous Page", "ASPxReportsStringId.ToolBarItemText_PreviousPage"),
                        imageClassName: "dxrd-image-preview-prev",
                        imageTemplateName: "dxrd-svg-preview-previous_page",
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: false, keyCode: 37 },
                        clickAction: function () {
                            if (reportPreview.pageIndex() >= 1) {
                                reportPreview.goToPage(reportPreview.pageIndex() - 1, false, 500);
                            }
                        },
                    });
                    var paginationSelectBoxViewModel = {
                        id: Preview.ActionId.Pagination,
                        text: "Pagination",
                        imageClassName: "dxrd-image-pager",
                        disabled: ko.pureComputed(function () { return reportPreview.pages().length === 0 || reportPreview.pageIndex() === -1; }),
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
                            if (e.event.which !== 13)
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
                        text: DevExpress.Designer.getLocalization("Next Page", "ASPxReportsStringId.ToolBarItemText_NextPage"),
                        imageClassName: "dxrd-image-preview-next",
                        imageTemplateName: "dxrd-svg-preview-next_page",
                        disabled: ko.pureComputed(function () { return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1; }),
                        visible: ko.pureComputed(function () { return reportPreview.previewVisible(); }),
                        hotKey: { ctrlKey: false, keyCode: 39 },
                        clickAction: function () {
                            if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                                reportPreview.goToPage(reportPreview.pageIndex() + 1, false, 500);
                            }
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.LastPage,
                        text: DevExpress.Designer.getLocalization("Last Page", "ASPxReportsStringId.DocumentViewer_RibbonCommandText_LastPage"),
                        imageClassName: "dxrd-image-preview-last",
                        imageTemplateName: "dxrd-svg-preview-last_page",
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
                        text: DevExpress.Designer.getLocalization("Toggle Multipage Mode", "ASPxReportsStringId.WebDocumentViewer_ToggleMultipageMode"),
                        imageClassName: ko.pureComputed(function () { return reportPreview.showMultipagePreview() ? "dxrd-image-preview-single-page" : "dxrd-image-preview-multipage"; }),
                        imageTemplateName: ko.pureComputed(function () { return reportPreview.showMultipagePreview() ? "dxrd-svg-preview-single_page" : "dxrd-svg-preview-multi_page_preview"; }),
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
                        imageTemplateName: "dxrd-svg-toolbar-zoomout",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: reportPreview.zoomStep,
                        hotKey: { ctrlKey: false, keyCode: 109 },
                        clickAction: function () {
                            var currentZoom = reportPreview.zoom();
                            var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                            reportPreview.zoom(Math.max(zoomLevel - reportPreview.zoomStep(), 0.01));
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.ZoomSelector,
                        text: DevExpress.Designer.getLocalization('Zoom to Whole Page', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToWholePage'),
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
                                return DevExpress.Designer.getLocalization('Page Width', 'DevExpress.XtraReports.UI.XtraReport.PageWidth');
                            }
                            else if (Math.round(val * 100) === 0) {
                                return DevExpress.Designer.getLocalization('Whole Page', 'PreviewStringId.MenuItem_ZoomWholePage');
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
                        imageTemplateName: "dxrd-svg-toolbar-zoomin",
                        disabled: ko.observable(false),
                        visible: true,
                        zoomStep: reportPreview.zoomStep,
                        hotKey: { ctrlKey: false, keyCode: 107 },
                        clickAction: function () {
                            var currentZoom = reportPreview.zoom();
                            var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                            reportPreview.zoom(Math.min(zoomLevel + reportPreview.zoomStep(), 10));
                        }
                    });
                    this.actions.push({
                        id: Preview.ActionId.HighlightEditingFields,
                        text: DevExpress.Designer.getLocalization("Highlight Editing Fields", "DevExpress.XtraPrinting.PrintingSystemCommand.HighlightEditingFields"),
                        imageClassName: "dxrp-image-hightlight-editing-fields",
                        imageTemplateName: "dxrd-svg-toolbar-hightlightEditingFields",
                        disabled: ko.pureComputed(function () { return reportPreview.editingFieldsProvider().length < 1; }),
                        visible: ko.pureComputed(function () {
                            var available = Preview.editablePreviewEnabled();
                            var viewerVisible = reportPreview.previewVisible();
                            return available && viewerVisible;
                        }),
                        selected: ko.pureComputed(function () { return reportPreview.editingFieldsHighlighted(); }),
                        hotKey: { ctrlKey: true, keyCode: 72 },
                        clickAction: function () {
                            reportPreview.editingFieldsHighlighted(!reportPreview.editingFieldsHighlighted());
                        },
                        hasSeparator: true
                    });
                    this.actions.push({
                        id: Preview.ActionId.Print,
                        text: DevExpress.Designer.getLocalization("Print", "ASPxReportsStringId.DocumentViewer_RibbonPrintGroupText"),
                        imageClassName: "dxrd-image-print",
                        imageTemplateName: "dxrd-svg-preview-print",
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
                        text: DevExpress.Designer.getLocalization("Print Page", "ASPxReportsStringId.DocumentViewer_RibbonCommandText_PrintPage"),
                        imageClassName: "dxrd-image-print-page",
                        imageTemplateName: "dxrd-svg-preview-print_page",
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
            }());
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
            var ImageAlignment;
            (function (ImageAlignment) {
                ImageAlignment[ImageAlignment["TopLeft"] = 1] = "TopLeft";
                ImageAlignment[ImageAlignment["TopCenter"] = 2] = "TopCenter";
                ImageAlignment[ImageAlignment["TopRight"] = 3] = "TopRight";
                ImageAlignment[ImageAlignment["MiddleLeft"] = 4] = "MiddleLeft";
                ImageAlignment[ImageAlignment["MiddleCenter"] = 5] = "MiddleCenter";
                ImageAlignment[ImageAlignment["MiddleRight"] = 6] = "MiddleRight";
                ImageAlignment[ImageAlignment["BottomLeft"] = 7] = "BottomLeft";
                ImageAlignment[ImageAlignment["BottomCenter"] = 8] = "BottomCenter";
                ImageAlignment[ImageAlignment["BottomRight"] = 9] = "BottomRight";
            })(ImageAlignment = Preview.ImageAlignment || (Preview.ImageAlignment = {}));
            var ImageSizeMode;
            (function (ImageSizeMode) {
                ImageSizeMode[ImageSizeMode["Normal"] = 0] = "Normal";
                ImageSizeMode[ImageSizeMode["StretchImage"] = 1] = "StretchImage";
                ImageSizeMode[ImageSizeMode["ZoomImage"] = 4] = "ZoomImage";
                ImageSizeMode[ImageSizeMode["Squeeze"] = 5] = "Squeeze";
            })(ImageSizeMode = Preview.ImageSizeMode || (Preview.ImageSizeMode = {}));
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
                    else if (this._model.type === "image") {
                        return new Preview.DefaultImageEditingFieldViewModel(this, pageWidth, pageHeight, zoom, bounds);
                    }
                };
                return EditingField;
            }());
            Preview.EditingField = EditingField;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        Report.Categories = {
            Image: function () { return "Image"; },
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
                var getLocalizedString = DevExpress.Designer.getLocalization;
                EditingFieldExtensions.registerRegExpEditor("Integer", getLocalizedString("Integer", "PreviewStringId.EditingFieldEditors_Integer"), Report.Categories.Numeric(), /^-?\d*$/, /^-?\d+$/, "0");
                EditingFieldExtensions.registerRegExpEditor("IntegerPositive", getLocalizedString("Integer Positive", "PreviewStringId.EditingFieldEditors_IntegerPositive"), Report.Categories.Numeric(), /^\d+$/, /^\d+$/, "0");
                EditingFieldExtensions.registerRegExpEditor("FixedPoint", getLocalizedString("Fixed-Point", "PreviewStringId.EditingFieldEditors_FixedPoint"), Report.Categories.Numeric(), /^-?(\d+([\.,]?\d*)?)?$/, /^-?\d+([\.,]?\d*)?$/, "0");
                EditingFieldExtensions.registerRegExpEditor("FixedPointPositive", getLocalizedString("Fixed-Point Positive", "PreviewStringId.EditingFieldEditors_FixedPointPositive"), Report.Categories.Numeric(), /^\d+([\.,]?\d*)?$/, /^\d+([\.,]?\d*)?$/, "0");
                var dateEditorOptions = {
                    onPreRender: function (data) {
                        if (!(data.options.value() instanceof Date)) {
                            data.options.value(DevExpress.Analytics.Localization.parseDate(data.options.value(), false) || new Date(Date.now()));
                        }
                    },
                    onHideEditor: function (field) {
                        field.editValue(DevExpress.Analytics.Localization.formatDate(field._editorValue()));
                    }
                };
                EditingFieldExtensions.registerEditor("Date", getLocalizedString("Date", "PreviewStringId.EditingFieldEditors_Date"), Report.Categories.DateTime(), dateEditorOptions, "dxrp-editing-field-datetime");
                EditingFieldExtensions.registerImageEditor({
                    name: "Image",
                    displayName: getLocalizedString("Image", "PreviewStringId.EditingFieldEditors_Image"),
                    drawingEnabled: false,
                    imageLoadEnabled: true
                });
                EditingFieldExtensions.registerImageEditor({
                    name: "Signature",
                    displayName: getLocalizedString("Signature", "PreviewStringId.EditingFieldEditors_Signature"),
                    drawingEnabled: true,
                    imageLoadEnabled: false
                });
                EditingFieldExtensions.registerImageEditor({
                    name: "ImageAndSignature",
                    displayName: getLocalizedString("Image And Signature", "PreviewStringId.EditingFieldEditors_ImageAndSignature"),
                    drawingEnabled: true,
                    imageLoadEnabled: true
                });
                EditingFieldExtensions.registerRegExpEditor("OnlyLatinLetters", getLocalizedString("Only Latin Letters", "PreviewStringId.EditingFieldEditors_OnlyLatinLetters"), Report.Categories.Letters(), /^[a-zA-Z]*$/, /^[a-zA-Z]*$/, "");
            };
            EditingFieldExtensions.registerImageEditor = function (imageRegistrationOptions) {
                imageRegistrationOptions.imageLoadEnabled = imageRegistrationOptions.imageLoadEnabled === undefined ? true : imageRegistrationOptions.imageLoadEnabled;
                imageRegistrationOptions.drawingEnabled = imageRegistrationOptions.drawingEnabled === undefined ? false : imageRegistrationOptions.drawingEnabled;
                var editMode = Report.Preview.PictureEditMode.ImageAndSignature;
                if (!imageRegistrationOptions.imageLoadEnabled)
                    editMode = Report.Preview.PictureEditMode.Signature;
                if (!imageRegistrationOptions.drawingEnabled)
                    editMode = Report.Preview.PictureEditMode.Image;
                var options = { editMode: editMode };
                if (imageRegistrationOptions.images || imageRegistrationOptions.customizeActions) {
                    options["callbacks"] = {
                        customizeActions: function (s, actions) {
                            if (imageRegistrationOptions.customizeActions) {
                                imageRegistrationOptions.customizeActions(s, actions);
                                return;
                            }
                            var imagePickerAction = s.actionsProvider.createImagePickerAction(imageRegistrationOptions.images, imageRegistrationOptions.searchEnabled, function (base64) {
                                s.painter.image(base64);
                                s.painter.refresh();
                            });
                            var openFile = actions.filter((function (x) { return x.id === DevExpress.Report.Preview.PictureEditorActionId.OpenFile; }))[0];
                            if (openFile) {
                                actions.splice(actions.indexOf(openFile), 1);
                            }
                            actions.splice(0, 0, imagePickerAction);
                            if (!imageRegistrationOptions.sizeOptionsEnabled) {
                                var alignmentAction = actions.filter(function (x) { return x.id === Report.Preview.PictureEditorActionId.Alignment; })[0];
                                actions.splice(actions.indexOf(alignmentAction), 1);
                            }
                        }
                    };
                }
                EditingFieldExtensions.registerEditor(imageRegistrationOptions.name, imageRegistrationOptions.displayName, Report.Categories.Image(), options, "dxrp-editing-field-image");
            };
            EditingFieldExtensions.registerEditor = function (name, displayName, category, options, template, validate, defaultVal) {
                if (defaultVal === void 0) { defaultVal = ""; }
                var initValue;
                var extendOptions = {
                    onInitialized: function (e) {
                        if (validate) {
                            DevExpress.JS.Widgets.ValueEditorHelper.validateWidgetValue(e, validate, defaultVal);
                        }
                        initValue = e.component.option("value");
                    },
                    onKeyUp: function (e) {
                        var editor = e.component;
                        DevExpress.Analytics.Internal.processTextEditorHotKeys(e.event, {
                            esc: function () {
                                editor.blur();
                                editor.option("value", initValue);
                            },
                            ctrlEnter: function () {
                                editor.blur();
                            }
                        });
                    }
                };
                EditingFieldExtensions.instance()._editors[name] = {
                    name: name,
                    displayName: displayName,
                    category: category,
                    options: $.extend({}, options, extendOptions),
                    template: template
                };
            };
            EditingFieldExtensions.registerMaskEditor = function (editorID, displayName, category, mask) {
                EditingFieldExtensions.registerEditor(editorID, displayName, category, { mask: mask });
            };
            EditingFieldExtensions.registerRegExpEditor = function (editorID, displayName, category, regExpEditing, regExpFinal, defaultVal) {
                var validate = function (val) { return regExpFinal.test(val); };
                EditingFieldExtensions.registerEditor(editorID, displayName, category, DevExpress.JS.Widgets.ValueEditorHelper.getValueEditorOptions(regExpEditing, validate, defaultVal), null, validate, defaultVal);
            };
            EditingFieldExtensions.unregisterEditor = function (editorID) {
                delete EditingFieldExtensions.instance()._editors[editorID];
            };
            EditingFieldExtensions.prototype.categories = function (excludeCategories) {
                if (excludeCategories === void 0) { excludeCategories = []; }
                var categories = [];
                for (var p in this._editors) {
                    var category = this._editors[p].category;
                    if (excludeCategories.indexOf(category) === -1 && categories.indexOf(category) === -1) {
                        categories.push(category);
                    }
                }
                return categories;
            };
            EditingFieldExtensions.prototype.editors = function () {
                var _this = this;
                return Object.keys(this._editors).map(function (key) { return _this._editors[key]; });
            };
            EditingFieldExtensions.prototype.editorsByCategories = function (categories) {
                if (categories === void 0) { categories = []; }
                var editors = [];
                for (var p in this._editors) {
                    if (categories.indexOf(this._editors[p].category) != -1) {
                        editors.push(this._editors[p]);
                    }
                }
                return editors;
            };
            EditingFieldExtensions.prototype.editor = function (editorID) {
                return this._editors[editorID];
            };
            return EditingFieldExtensions;
        }());
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
            var CheckState;
            (function (CheckState) {
                CheckState[CheckState["Unchecked"] = 0] = "Unchecked";
                CheckState[CheckState["Checked"] = 1] = "Checked";
                CheckState[CheckState["Indeterminate"] = 2] = "Indeterminate";
            })(CheckState = Preview.CheckState || (Preview.CheckState = {}));
            ;
            Preview.editablePreviewEnabled = ko.observable(true);
            var TextEditingFieldViewModelBase = (function () {
                function TextEditingFieldViewModelBase() {
                }
                TextEditingFieldViewModelBase.prototype.keypressAction = function (data, event) {
                    var _this = this;
                    DevExpress.Analytics.Internal.processTextEditorHotKeys(event, {
                        esc: function () {
                            _this.hideEditor(false);
                        },
                        ctrlEnter: function () {
                            _this.hideEditor(true);
                        }
                    });
                };
                return TextEditingFieldViewModelBase;
            }());
            Preview.TextEditingFieldViewModelBase = TextEditingFieldViewModelBase;
            var TextEditingFieldViewModel = (function (_super) {
                __extends(TextEditingFieldViewModel, _super);
                function TextEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
                    var _this = _super.call(this) || this;
                    _this.template = "dxrp-editing-field-container";
                    _this.htmlValue = function () { return _this.field.htmlValue(); };
                    _this.wordWrap = true;
                    _this.active = ko.observable(false);
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
                    _this.breakOffsetStyle = function () {
                        return {
                            top: bounds.offset.y * -100 / bounds.height + "%",
                            left: bounds.offset.x * -100 / bounds.width + "%"
                        };
                    };
                    _this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
                    _this.zoom = zoom;
                    _this.field = field;
                    if (brickStyle.wordWrap != undefined) {
                        _this.wordWrap = brickStyle.wordWrap;
                    }
                    _this.hideEditor = function (shouldCommit) {
                        setTimeout(function () {
                            if (shouldCommit) {
                                if (editorOptions.onHideEditor) {
                                    editorOptions.onHideEditor(field);
                                }
                                else {
                                    field.editValue(field._editorValue());
                                }
                            }
                            else {
                                field._editorValue(field.editValue());
                            }
                            _this.active(false);
                        }, 1);
                    };
                    var editor = DevExpress.Report.EditingFieldExtensions.instance().editor(field.editorName());
                    var editorOptions = $.extend(true, {}, editor && editor.options || {});
                    _this.data = {
                        value: field._editorValue,
                        hideEditor: _this.hideEditor,
                        keypressAction: _this.keypressAction,
                        textStyle: _this.textStyle,
                        options: editorOptions
                    };
                    var isCustomEditor = !!(editor && editor.template && editor.template !== "dxrp-editing-field-datetime");
                    if (!isCustomEditor) {
                        var self = _this;
                        _this.data.options = $.extend(true, {}, editorOptions, {
                            value: field._editorValue,
                            onFocusOut: function (e) {
                                self.hideEditor(true);
                            }
                        });
                    }
                    if (editor) {
                        _this.editorTemplate = editor.template || "dxrp-editing-field-mask";
                    }
                    else {
                        _this.editorTemplate = "dxrp-editing-field-text";
                    }
                    _this.containerStyle = ko.pureComputed(function () {
                        return $.extend({
                            width: bounds.width + "px",
                            height: bounds.height + "px",
                            "line-height": (bounds.height - verticalPadding) + "px",
                            top: bounds.top * 100 / pageHeight + "%",
                            left: bounds.left * 100 / pageWidth + "%"
                        }, _this.active() || !_this.htmlValue() ? cssCalculator.borderCss() : { border: 'none' }, isCustomEditor && _this.active() || (!!_this.htmlValue() && !_this.active()) ? { padding: 0 } : cssCalculator.paddingsCss(), { "border-color": "transparent" });
                    });
                    _this.borderStyle = ko.pureComputed(function () {
                        if (style["borderWidth"]() > 0 && style["borders"]() !== "None") {
                            return {
                                left: "-" + style["borderWidth"]() + "px",
                                top: "-" + style["borderWidth"]() + "px",
                                paddingRight: (style["borderWidth"]() * 2 - 2) + "px",
                                paddingBottom: (style["borderWidth"]() * 2 - 2) + "px"
                            };
                        }
                    });
                    return _this;
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
                        var element = $(e && e.currentTarget).find(":focusable").eq(0)[0];
                        element.focus();
                        if (element["setSelectionRange"]) {
                            element["setSelectionRange"](element["value"].length, element["value"].length);
                        }
                    }
                };
                return TextEditingFieldViewModel;
            }(TextEditingFieldViewModelBase));
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
                    e.stopPropagation();
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
            }());
            Preview.CheckEditingFieldViewModel = CheckEditingFieldViewModel;
            var CharacterCombEditingFieldViewModel = (function (_super) {
                __extends(CharacterCombEditingFieldViewModel, _super);
                function CharacterCombEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
                    var _this = _super.call(this) || this;
                    _this.field = field;
                    _this.template = "dxrp-character-comb-editing-field";
                    _this.active = ko.observable(false);
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
                    _this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
                    _this.hideEditor = function (shouldCommit) {
                        setTimeout(function () {
                            if (shouldCommit) {
                                field.editValue(field._editorValue());
                            }
                            else {
                                field._editorValue(field.editValue());
                            }
                            _this.active(false);
                        });
                    };
                    _this.containerStyle = ko.pureComputed(function () {
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
                    _this.cells = [];
                    var rowTops = {};
                    for (var i = 0; i < characterCombBounds.length; i++) {
                        _this.cells.push({
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
                    var colsCount = _this.cells.length / rowsCount;
                    CharacterCombEditingFieldViewModel.setText(_this.cells, style["textAlignment"](), style.rtl(), field.editValue.peek(), rowsCount, colsCount);
                    field.editValue.subscribe(function (newValue) {
                        CharacterCombEditingFieldViewModel.setText(_this.cells, style["textAlignment"](), style.rtl(), newValue, rowsCount, colsCount);
                    });
                    _this.zoom = zoom;
                    return _this;
                }
                CharacterCombEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
                    if (!this.field.readOnly()) {
                        this.active(true);
                        var element = $(e && e.currentTarget).find(":focusable").eq(0)[0];
                        element.focus();
                        if (element["setSelectionRange"]) {
                            element["setSelectionRange"](element["value"].length, element["value"].length);
                        }
                    }
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
            }(TextEditingFieldViewModelBase));
            Preview.CharacterCombEditingFieldViewModel = CharacterCombEditingFieldViewModel;
            var ImageEditingFieldViewModel = (function (_super) {
                __extends(ImageEditingFieldViewModel, _super);
                function ImageEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
                    var _this = _super.call(this) || this;
                    _this.field = field;
                    _this.zoom = zoom;
                    _this.bounds = bounds;
                    _this.popupTarget = '.dx-designer';
                    _this.popupOptions = {
                        target: _this.popupTarget,
                        boundary: _this.popupTarget,
                        container: _this.popupTarget
                    };
                    _this.template = "dxrp-editing-field-image";
                    _this.isActive = ko.observable(false);
                    var brickStyle = field.model().brickOptions;
                    var style = { rtl: function () { return brickStyle.rtl; } };
                    new DevExpress.JS.Utils.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), DevExpress.Designer.Report.brickStyleSerializationsInfo);
                    var cssCalculator = new DevExpress.Designer.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
                    _this._disposables.push(_this.alignment = ko.computed(function () {
                        return field.editValue().alignment;
                    }), _this.sizeMode = ko.computed(function () {
                        return field.editValue().sizeMode;
                    }));
                    var editor = DevExpress.Report.EditingFieldExtensions.instance().editor(field.editorName());
                    var options = editor ? editor.options : { editMode: Preview.PictureEditMode.ImageAndSignature };
                    _this.editMode = options.editMode;
                    _this.containerStyle = function () {
                        return $.extend({
                            height: _this.bounds.height * zoom() + "px",
                            width: _this.bounds.width * zoom() + "px",
                            zIndex: _this.isActive() ? 10 : 0,
                            top: _this.bounds.top * 100 / pageHeight + "%",
                            left: _this.bounds.left * 100 / pageWidth + "%"
                        }, cssCalculator.borderCss(), cssCalculator.paddingsCss());
                    };
                    _this.callbacks = $.extend({
                        onDraw: function (s) { return _this.onDraw(s); },
                        onFocusIn: function (s) { return _this.onFocusIn(s); },
                        onFocusOut: function (s) { return _this.onBlur(s); }
                    }, options.callbacks);
                    return _this;
                }
                ImageEditingFieldViewModel.prototype.getImage = function () {
                    return this.field.editValue().image;
                };
                ImageEditingFieldViewModel.prototype.getImageType = function () {
                    return this.field.editValue().imageType;
                };
                ImageEditingFieldViewModel.prototype.onKeyDown = function (_, e) {
                    if (e.keyCode == 32) {
                    }
                    else {
                    }
                };
                ImageEditingFieldViewModel.prototype.onFocusIn = function (s) {
                    Preview.PreviewSelection.disabled = true;
                };
                ImageEditingFieldViewModel.prototype.onDraw = function (s) {
                    Preview.PreviewSelection.disabled = true;
                };
                ImageEditingFieldViewModel.prototype.onBlur = function (s) {
                    var options = s.getCurrentOptions();
                    this.field.editValue($.extend({}, this.field.editValue(), options, { imageType: options.imageType === "svg" ? "svg" : "img" }));
                    Preview.PreviewSelection.disabled = false;
                };
                return ImageEditingFieldViewModel;
            }(DevExpress.Analytics.Utils.Disposable));
            Preview.ImageEditingFieldViewModel = ImageEditingFieldViewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var Preview;
        (function (Preview) {
            function getImageBase64(url) {
                var deferred = $.Deferred();
                var background = new Image();
                background.src = url;
                background.crossOrigin = "anonymous";
                background.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = background.width;
                    canvas.height = background.height;
                    canvas.getContext("2d").drawImage(background, 0, 0);
                    try {
                        deferred.resolve(canvas.toDataURL());
                    }
                    catch (e) {
                        deferred.reject(e);
                    }
                };
                return deferred.promise();
            }
            Preview.getImageBase64 = getImageBase64;
            var PictureEditMode;
            (function (PictureEditMode) {
                PictureEditMode[PictureEditMode["Image"] = 0] = "Image";
                PictureEditMode[PictureEditMode["Signature"] = 1] = "Signature";
                PictureEditMode[PictureEditMode["ImageAndSignature"] = 2] = "ImageAndSignature";
            })(PictureEditMode = Preview.PictureEditMode || (Preview.PictureEditMode = {}));
            var PictureEditorActionId;
            (function (PictureEditorActionId) {
                PictureEditorActionId[PictureEditorActionId["OpenFile"] = 0] = "OpenFile";
                PictureEditorActionId[PictureEditorActionId["PickImage"] = 1] = "PickImage";
                PictureEditorActionId[PictureEditorActionId["Alignment"] = 2] = "Alignment";
                PictureEditorActionId[PictureEditorActionId["Brush"] = 3] = "Brush";
                PictureEditorActionId[PictureEditorActionId["Clear"] = 4] = "Clear";
            })(PictureEditorActionId = Preview.PictureEditorActionId || (Preview.PictureEditorActionId = {}));
            var ImagePainter = (function () {
                function ImagePainter(options) {
                    this.format = ko.observable();
                    this.image = options.imageSource;
                    this.sizeMode = options.sizeMode;
                    this.alignment = options.alignment;
                }
                ImagePainter.prototype._drawImage = function (imageSource, context, scale, contentSize) {
                    var _this = this;
                    var deferred = $.Deferred();
                    if (!imageSource)
                        return deferred.resolve().promise();
                    var background = new Image();
                    var prefix = "data:image/" + (this.format() || "png") + ";base64,";
                    if (this.format() === "svg") {
                        prefix = "data:image/svg+xml;charset=UTF-8;base64,";
                    }
                    var imageBase64 = imageSource.indexOf("base64,") !== -1 ? imageSource : prefix + imageSource;
                    background.src = imageBase64;
                    background.onload = function () {
                        var size = _this._getImageSize(background, scale, contentSize);
                        var location = _this._getImageCoordinate(size, contentSize);
                        context.drawImage(background, location.x, location.y, size.width, size.height);
                        deferred.resolve();
                    };
                    return deferred.promise();
                };
                ImagePainter.prototype._getImageSize = function (image, scale, contentSize) {
                    var sizeMode = this.sizeMode();
                    var width = image.width * scale, height = image.height * scale;
                    if (sizeMode === Preview.ImageSizeMode.StretchImage) {
                        width = contentSize.width;
                        height = contentSize.height;
                    }
                    else if (sizeMode === Preview.ImageSizeMode.ZoomImage || (sizeMode === Preview.ImageSizeMode.Squeeze && (contentSize.width < width || contentSize.height < height))) {
                        var ratio = Math.min(contentSize.width / width, contentSize.height / height);
                        width *= ratio;
                        height *= ratio;
                    }
                    return { width: width, height: height };
                };
                ImagePainter.prototype._getImageCoordinate = function (imageSize, contentSize) {
                    var alignment = this.alignment();
                    var x = 0, y = 0;
                    if (alignment === Preview.ImageAlignment.MiddleLeft || alignment === Preview.ImageAlignment.MiddleCenter || alignment === Preview.ImageAlignment.MiddleRight) {
                        y = (contentSize.height - imageSize.height) / 2;
                    }
                    else if (alignment === Preview.ImageAlignment.BottomLeft || alignment === Preview.ImageAlignment.BottomCenter || alignment === Preview.ImageAlignment.BottomRight) {
                        y = contentSize.height - imageSize.height;
                    }
                    if (alignment === Preview.ImageAlignment.TopCenter || alignment === Preview.ImageAlignment.MiddleCenter || alignment === Preview.ImageAlignment.BottomCenter) {
                        x = (contentSize.width - imageSize.width) / 2;
                    }
                    else if (alignment === Preview.ImageAlignment.TopRight || alignment === Preview.ImageAlignment.MiddleRight || alignment === Preview.ImageAlignment.BottomRight) {
                        x = contentSize.width - imageSize.width;
                    }
                    return { x: x, y: y };
                };
                ImagePainter.prototype.refresh = function (context, scale, contentSize) {
                    if (scale === void 0) { scale = 1; }
                    contentSize = contentSize || {
                        width: context.canvas.width,
                        height: context.canvas.height
                    };
                    return this._drawImage(this.image(), context, scale, contentSize);
                };
                return ImagePainter;
            }());
            Preview.ImagePainter = ImagePainter;
            var SignaturePainter = (function (_super) {
                __extends(SignaturePainter, _super);
                function SignaturePainter() {
                    var _this = _super.call(this) || this;
                    _this._points = ko.observableArray([]);
                    _this.hasPoints = ko.computed(function () { return _this._points().length > 0; });
                    _this._disposables.push(_this.hasPoints);
                    return _this;
                }
                SignaturePainter.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this.reset();
                };
                SignaturePainter.prototype._drawPath = function (context, x, y, lastX, lastY, color, lineWidth) {
                    context.beginPath();
                    context.strokeStyle = color;
                    context.lineWidth = lineWidth;
                    context.lineJoin = "round";
                    context.moveTo(lastX, lastY);
                    context.lineTo(x, y);
                    context.closePath();
                    context.stroke();
                };
                SignaturePainter.prototype._drawCircle = function (context, x, y, color, lineWidth) {
                    context.beginPath();
                    context.fillStyle = color;
                    context.arc(x, y, lineWidth / 2, 0, 2 * Math.PI, false);
                    context.fill();
                };
                SignaturePainter.prototype._drawAllPoints = function (context) {
                    var _this = this;
                    this._points().forEach(function (point) {
                        if (point.isStart) {
                            _this._drawCircle(context, point.x, point.y, point.color, point.width);
                        }
                        else {
                            _this._drawPath(context, point.x, point.y, point.lastX, point.lastY, point.color, point.width);
                        }
                    });
                };
                SignaturePainter.prototype.drawCircle = function (context, x, y, color, width) {
                    this._lastX = x;
                    this._lastY = y;
                    this._drawCircle(context, x, y, color, width);
                    this._points.push({ x: this._lastX, y: this._lastY, color: color, width: width, isStart: true });
                };
                SignaturePainter.prototype.drawPath = function (context, x, y, color, width) {
                    this._drawPath(context, x, y, this._lastX, this._lastY, color, width);
                    this._points.push({ x: x, y: y, lastX: this._lastX, lastY: this._lastY, color: color, width: width });
                    this._lastX = x;
                    this._lastY = y;
                };
                SignaturePainter.prototype.resetLastPosition = function () {
                    this._lastX = undefined;
                    this._lastY = undefined;
                };
                SignaturePainter.prototype.resetPoints = function () {
                    this._points([]);
                };
                SignaturePainter.prototype.reset = function () {
                    this.resetLastPosition();
                    this.resetPoints();
                };
                SignaturePainter.prototype.refresh = function (context) {
                    this._drawAllPoints(context);
                };
                return SignaturePainter;
            }(DevExpress.Analytics.Utils.Disposable));
            Preview.SignaturePainter = SignaturePainter;
            var Painter = (function (_super) {
                __extends(Painter, _super);
                function Painter(options) {
                    var _this = _super.call(this) || this;
                    _this._pointerDownHandler = function (e) {
                        var point = _this._getContextPoint(e);
                        point && _this.signaturePainter.drawCircle(_this._context, point.x, point.y, _this.lineColor(), _this.lineWidth());
                    };
                    _this._pointerMoveHandler = function (e) {
                        if (e.pointerType === "touch" || e.pointerType === "pen" || (e.pointerType === "mouse" && e.originalEvent["buttons"] == 1)) {
                            var point = _this._getContextPoint(e);
                            point && _this.signaturePainter.drawPath(_this._context, point.x, point.y, _this.lineColor(), _this.lineWidth());
                        }
                    };
                    _this._pointerLeaveHandler = function (e) {
                        _this.signaturePainter.resetLastPosition();
                    };
                    _this.format = function (newVal) {
                        if (newVal)
                            _this.imagePainter.format(newVal);
                        return _this.imagePainter.format();
                    };
                    _this.imageSizeMode = ko.observable(Preview.ImageSizeMode.Normal);
                    _this.imageAlignment = ko.observable(Preview.ImageAlignment.TopLeft);
                    _this.lineWidth = ko.observable(1);
                    _this.lineColor = ko.observable("#000000");
                    _this.zoom = options.zoom;
                    _this.image = ko.observable(options.imageSource);
                    _this.format = ko.observable(options.imageType);
                    _this.imageSizeMode(options.sizeMode);
                    _this.imageAlignment(options.alignment);
                    _this.imagePainter = new ImagePainter({
                        alignment: _this.imageAlignment,
                        imageSource: _this.image,
                        sizeMode: _this.imageSizeMode
                    });
                    _this._disposables.push(_this.signaturePainter = new SignaturePainter());
                    _this._disposables.push(_this.signaturePainter.hasPoints.subscribe(function (newVal) {
                        if (newVal)
                            _this._setCanvasSize(_this.initialSize.width, _this.initialSize.height);
                        else
                            _this._setCanvasSize(_this.initialSize.width * _this.zoom(), _this.initialSize.height * _this.zoom());
                        _this.refresh();
                    }));
                    _this._disposables.push(_this.scale = ko.computed(function () {
                        return _this.hasSignature() ? _this.zoom() : 1;
                    }));
                    if (options.canDraw) {
                        _this._disposables.push((options.canDraw).subscribe(function (newValue) {
                            if (newValue) {
                                _this._addEvents();
                            }
                            else {
                                _this._removeEvents();
                            }
                        }));
                    }
                    _this._disposables.push(_this.zoom.subscribe(function (newVal) {
                        if (!_this.signaturePainter.hasPoints()) {
                            _this._setCanvasSize(_this.initialSize.width * newVal, _this.initialSize.height * newVal);
                            _this.refresh();
                        }
                    }));
                    return _this;
                }
                Painter.prototype._getContextPoint = function (e) {
                    if (e.target.nodeName !== "CANVAS")
                        return;
                    var zoom = this.zoom();
                    var x, y;
                    if (e.offsetX && e.offsetY) {
                        zoom = this.hasSignature() ? 1 : zoom;
                        x = e.offsetX / zoom;
                        y = e.offsetY / zoom;
                    }
                    else {
                        var rect = this._context.canvas.getBoundingClientRect();
                        x = (e.clientX - rect.left) / zoom;
                        y = (e.clientY - rect.top) / zoom;
                    }
                    return { x: x, y: y };
                };
                Painter.prototype._addEvents = function () {
                    var element = this.$element.get(0);
                    DevExpress["events"].on(element, 'dxpointerdown', this._pointerDownHandler);
                    DevExpress["events"].on(element, 'dxpointermove', this._pointerMoveHandler);
                    DevExpress["events"].on(element, 'dxpointerleave', this._pointerLeaveHandler);
                };
                Painter.prototype._removeEvents = function () {
                    var element = this.$element.get(0);
                    DevExpress["events"].off(element, 'dxpointerdown', this._pointerDownHandler);
                    DevExpress["events"].off(element, 'dxpointermove', this._pointerMoveHandler);
                    DevExpress["events"].off(element, 'dxpointerleave', this._pointerLeaveHandler);
                };
                Painter.prototype._cleanCanvas = function () {
                    this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
                };
                Painter.prototype._setCanvasSize = function (width, height) {
                    this._context.canvas.setAttribute('width', width);
                    this._context.canvas.setAttribute('height', height);
                };
                Painter.prototype.refresh = function () {
                    var _this = this;
                    this._cleanCanvas();
                    var zoom = this.signaturePainter.hasPoints() ? 1 : this.zoom();
                    var size = this.signaturePainter.hasPoints() ? this.initialSize : undefined;
                    this.imagePainter.refresh(this._context, zoom, size)
                        .done(function () { return _this.signaturePainter.refresh(_this._context); });
                };
                Painter.prototype.initSize = function (element, zoom) {
                    this.$element = element;
                    this.initialSize = {
                        width: this.$element.outerWidth() / zoom,
                        height: this.$element.outerHeight() / zoom
                    };
                };
                Painter.prototype.initCanvas = function (element, zoom) {
                    var canvas = this.$element.find("canvas")[0];
                    this._context = canvas.getContext('2d');
                    this._setCanvasSize(this.initialSize.width * zoom, this.initialSize.height * zoom);
                    this.imagePainter.refresh(this._context, zoom, {
                        width: this._context.canvas.offsetWidth,
                        height: this._context.canvas.offsetHeight
                    });
                };
                Painter.prototype.getImage = function () {
                    return this._context.canvas.toDataURL('image/png');
                };
                Painter.prototype.hasSignature = function () {
                    return this.signaturePainter.hasPoints();
                };
                Painter.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this._removeEvents();
                    this.$element = null;
                    this._context = null;
                };
                Painter.prototype.reset = function (initialImage, initialAlignment, initialSizeMode) {
                    this.image(initialImage);
                    this.imageAlignment(initialAlignment);
                    this.imageSizeMode(initialSizeMode);
                    this.signaturePainter.reset();
                    this.refresh();
                };
                return Painter;
            }(DevExpress.Analytics.Utils.Disposable));
            Preview.Painter = Painter;
            var PictureEditorToolbarItem = (function () {
                function PictureEditorToolbarItem(options) {
                    this.id = options.id;
                    this.icon = options.icon;
                    this.action = options.action;
                    this.isActive = options.isActive;
                    this.renderedHandler = options.renderedHandler;
                    this.title = options.title;
                }
                PictureEditorToolbarItem.prototype.dispose = function () {
                    this.renderedHandler = null;
                    this.action = null;
                };
                return PictureEditorToolbarItem;
            }());
            Preview.PictureEditorToolbarItem = PictureEditorToolbarItem;
            var PictureEditorToolbarItemWithPopup = (function (_super) {
                __extends(PictureEditorToolbarItemWithPopup, _super);
                function PictureEditorToolbarItemWithPopup(options) {
                    var _this = _super.call(this, options) || this;
                    _this.component = ko.observable();
                    _this.template = options.template;
                    if (options.templateOptions) {
                        _this.templateOptions = options.templateOptions;
                        _this.templateOptions.onContentReady = function (e) {
                            _this.component(e.component);
                        };
                        _this.templateOptions.closeOnOutsideClick = function (e) {
                            var component = ko.unwrap(_this.component);
                            var $content = component && $(component.content());
                            return !$content || !($content.has(e.target).length || $content.is(e.target));
                        };
                        _this.templateOptions.onShown = function (e) {
                            var $element = $(e.element);
                            var topElement = $element.position().top;
                            var popupsOffset = e["model"].getPositionTarget().offset().top - $(e.component.content()).offset().top;
                            var $arrow = $($element.find(".dx-popover-arrow")[0]);
                            $arrow.css("top", popupsOffset + topElement - 24 - 11);
                        };
                    }
                    return _this;
                }
                PictureEditorToolbarItemWithPopup.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    var component = this.component();
                    component && component.dispose();
                    this.component(null);
                    this.templateOptions = null;
                };
                return PictureEditorToolbarItemWithPopup;
            }(PictureEditorToolbarItem));
            Preview.PictureEditorToolbarItemWithPopup = PictureEditorToolbarItemWithPopup;
            var PictureEditorActionProvider = (function (_super) {
                __extends(PictureEditorActionProvider, _super);
                function PictureEditorActionProvider(_editorModel, _popupOptions) {
                    var _this = _super.call(this) || this;
                    _this._editorModel = _editorModel;
                    _this._popupOptions = _popupOptions;
                    return _this;
                }
                PictureEditorActionProvider.prototype._getEnumValues = function (enumType, prefix, propertyName) {
                    var _this = this;
                    var array = [];
                    Object.keys(enumType).filter(function (key) { return !isNaN(Number(enumType[key])); }).forEach(function (item) {
                        array.push({
                            value: item,
                            iconTemplate: 'dxrd-svg-pictureeditor-' + prefix + '_' + item.toLowerCase(),
                            isSelected: ko.computed(function () { return _this._editorModel.painter[propertyName]() === enumType[item]; }),
                            action: function () {
                                _this._editorModel.painter[propertyName](enumType[item]);
                                _this._editorModel.painter.refresh();
                            }
                        });
                    });
                    return array;
                };
                PictureEditorActionProvider.prototype._getColorValues = function () {
                    var _this = this;
                    var array = [];
                    PictureEditorActionProvider.colors.forEach(function (item) {
                        array.push({
                            value: item,
                            isSelected: ko.computed(function () { return _this._editorModel.painter.lineColor() === item; }),
                            action: function (e) {
                                _this._editorModel.painter.lineColor(item);
                            }
                        });
                    });
                    return array;
                };
                PictureEditorActionProvider.prototype._initPopupOptions = function (options) {
                    var _this = this;
                    options.boundary = this._popupOptions.boundary;
                    options.getPositionTarget = function () { return _this._popupOptions.getPositionTarget(); };
                    options.target = this._popupOptions.target;
                    options.container = this._popupOptions.container;
                    return options;
                };
                PictureEditorActionProvider.prototype.createOpenFileAction = function (action) {
                    var openFileActionOptions = {
                        id: PictureEditorActionId.OpenFile,
                        icon: "dxrd-svg-pictureeditor-toolbar_open",
                        title: DevExpress.Designer.getLocalization("Load Image"),
                        template: "dx-file-dialog",
                        isActive: ko.observable(false),
                        action: function (e) { return action(e); }
                    };
                    return new PictureEditorToolbarItemWithPopup(openFileActionOptions);
                };
                PictureEditorActionProvider.prototype.createImagePickerAction = function (images, filterEnabled, action) {
                    var _this = this;
                    filterEnabled = filterEnabled && images.every(function (image) { return image.text !== undefined; });
                    var active = ko.observable(false);
                    var filter = ko.observable("");
                    images.forEach(function (image) {
                        if (filterEnabled) {
                            _this._disposables.push(image.visible = ko.computed(function () {
                                return !!DevExpress.Analytics.Utils.findMatchesInString(image.text, filter());
                            }));
                        }
                        else {
                            image.visible = true;
                        }
                    });
                    var popupOptions = this._initPopupOptions({
                        width: 'auto',
                        height: '300px',
                        visible: active,
                        contentTemplate: filterEnabled ? "dx-picture-editing-imagepickerwithfilter" : "dx-picture-editing-imagespicker",
                        contentData: {
                            filterEnabled: filterEnabled,
                            filter: filter,
                            searchPlaceholder: function () { return DevExpress.Analytics.getLocalization("Enter text to search...", "ASPxReportsStringId.ReportDesigner_QueryBuilder_SearchBox_EmptyText"); },
                            contentWidth: this._editorModel.painter.initialSize.width * 2 + 35,
                            width: Math.min(this._editorModel.painter.initialSize.width, 150),
                            height: Math.min(this._editorModel.painter.initialSize.height, 150),
                            action: function (data) {
                                if (data.url) {
                                    DevExpress.Report.Preview.getImageBase64(data.url).done(function (result) {
                                        action(result);
                                    }).fail(function (e) {
                                        DevExpress.ui.notify(e.name + " :" + e.message.split(':').pop(), "error");
                                    });
                                }
                                else {
                                    action(data.data);
                                }
                            },
                            images: images
                        }
                    });
                    return new Preview.PictureEditorToolbarItemWithPopup({
                        id: PictureEditorActionId.PickImage,
                        icon: "dxrd-svg-pictureeditor-image_gallery",
                        title: DevExpress.Designer.getLocalization("Choose Image"),
                        isActive: active,
                        template: "dx-picture-editing-toolbar-popup",
                        templateOptions: popupOptions
                    });
                };
                PictureEditorActionProvider.prototype.createSizingAction = function () {
                    var alignmentActive = ko.observable(false);
                    var popupOptions = this._initPopupOptions({
                        width: '174px',
                        height: '300px',
                        visible: alignmentActive,
                        contentTemplate: "dx-picture-editing-sizemode-alignment",
                        contentData: {
                            sizeModeText: DevExpress.Designer.getLocalization("Size mode", "DevExpress.XtraReports.UI.XRPictureBox.Sizing"),
                            sizeMode: this._editorModel.painter.imageSizeMode,
                            sizeModeValues: this._getEnumValues(Preview.ImageSizeMode, 'size_mode', 'imageSizeMode'),
                            alignmentText: DevExpress.Designer.getLocalization("Image Alignment", "DevExpress.XtraReports.UI.XRPictureBox.ImageAlignment"),
                            alignment: this._editorModel.painter.imageAlignment,
                            alignmentValues: this._getEnumValues(Preview.ImageAlignment, 'alignment', 'imageAlignment'),
                        }
                    });
                    return new PictureEditorToolbarItemWithPopup({
                        id: PictureEditorActionId.Alignment,
                        icon: "dxrd-svg-pictureeditor-toolbar_size_mode_and_alignment",
                        title: DevExpress.Designer.getLocalization("Size Mode and Alignment"),
                        isActive: alignmentActive,
                        template: "dx-picture-editing-toolbar-popup",
                        templateOptions: popupOptions
                    });
                };
                PictureEditorActionProvider.prototype.createBrushAction = function () {
                    var brushItemActive = ko.observable(false);
                    var popupOptions = this._initPopupOptions({
                        width: '226px',
                        height: '295px',
                        visible: brushItemActive,
                        contentTemplate: "dx-picture-editing-brush-options",
                        contentData: {
                            lineWidth: this._editorModel.painter.lineWidth,
                            lineColor: this._editorModel.painter.lineColor,
                            colors: this._getColorValues(),
                            brushWidthText: DevExpress.Designer.getLocalization("Brush size"),
                            brushColorText: DevExpress.Designer.getLocalization("Brush color"),
                        }
                    });
                    return new PictureEditorToolbarItemWithPopup({
                        id: PictureEditorActionId.Brush,
                        icon: "dxrd-svg-pictureeditor-toolbar_brush_options",
                        title: DevExpress.Designer.getLocalization("Brush Options"),
                        isActive: brushItemActive,
                        template: "dx-picture-editing-toolbar-popup",
                        templateOptions: popupOptions,
                        renderedHandler: function (elem, mod) {
                            if (elem[0].nodeName.toLowerCase() === "svg") {
                                var brushIcon = $(elem[0]).find(".BrushColor");
                                if (brushIcon) {
                                    brushIcon.attr('data-bind', '{ style: { fill: $data.templateOptions.contentData.lineColor }}');
                                    ko.applyBindingsToDescendants(mod, brushIcon[0]);
                                }
                            }
                        }
                    });
                };
                PictureEditorActionProvider.prototype.createClearItem = function (action) {
                    var clearItemOptions = {
                        id: PictureEditorActionId.Clear,
                        icon: "dxrd-svg-pictureeditor-toolbar_clear",
                        title: DevExpress.Designer.getLocalization("Clear Changes"),
                        isActive: ko.observable(false),
                        action: function (e) { return action(); }
                    };
                    return new PictureEditorToolbarItem(clearItemOptions);
                };
                PictureEditorActionProvider.colors = ["#FFFFFF", "#FFC0C0", "#FFE0C0", "#FFFFC0", "#C0FFC0", "#C0FFFF", "#C0C0FF", "#FFC0FF", "#E0E0E0", "#FF8080", "#FFC080", "#FFFF80", "#80FF80", "#80FFFF", "#8080FF", "#FF80FF", "#C0C0C0", "#FF0000", "#FF8000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#808080", "#C00000", "#C04000", "#C0C000", "#00C000", "#00C0C0", "#0000C0", "#C000C0", "#404040", "#800000", "#804000", "#808000", "#008000", "#008080", "#000080", "#800080", "#000000", "#400000", "#804040", "#404000", "#004000", "#004040", "#000040", "#400040"];
                return PictureEditorActionProvider;
            }(DevExpress.Analytics.Utils.Disposable));
            Preview.PictureEditorActionProvider = PictureEditorActionProvider;
            var PictureEditorModel = (function (_super) {
                __extends(PictureEditorModel, _super);
                function PictureEditorModel(options, element) {
                    var _this = _super.call(this) || this;
                    _this.GESTURE_COVER_CLASS = "dx-gesture-cover";
                    _this.ACTIVE_POPUP_CLASS = ".dx-picture-editing-active";
                    _this._getPopupContent = function () {
                        var popupInstance = DevExpress.ui.dxPopup["getInstance"](_this.$element.find(_this.ACTIVE_POPUP_CLASS).get(0));
                        return popupInstance && $(popupInstance.content());
                    };
                    _this.actions = [];
                    _this.canDraw = ko.observable(false);
                    var imageType = ko.unwrap(options.imageType) || "png";
                    _this.zoom = options.zoom || ko.observable(1);
                    _this.editMode = ko.unwrap(options.imageMode) || PictureEditMode.Image;
                    _this._initialImage = ko.unwrap(options.image);
                    _this._initialAlignment = ko.unwrap(options.alignment);
                    _this._initialSizeMode = ko.unwrap(options.sizeMode);
                    _this._callbacks = options.callbacks;
                    _this.$element = $(element);
                    _this.isActive = ko.isObservable(options.isActive) ? options.isActive : ko.observable(!!options.isActive);
                    var painterOptions = {
                        alignment: _this._initialAlignment,
                        canDraw: _this.editMode !== PictureEditMode.Image && _this.canDraw,
                        imageSource: _this._initialImage,
                        imageType: imageType,
                        sizeMode: _this._initialSizeMode,
                        zoom: _this.zoom
                    };
                    _this.painter = new Painter(painterOptions);
                    _this._disposables.push(_this.painter);
                    _this.painter.initSize(_this.$element, _this.zoom());
                    _this.actionsProvider = new PictureEditorActionProvider(_this, $.extend(true, {
                        getPositionTarget: function () {
                            return _this._getPopupContent().find('.dx-picture-editing-toolbar');
                        }
                    }, (options.popupOptions || {})));
                    _this._disposables.push(_this.actionsProvider);
                    _this._initActions(options.callbacks && options.callbacks.customizeActions);
                    _this.applyBindings();
                    return _this;
                }
                PictureEditorModel.prototype._takeFocus = function () {
                    if (!this.isActive()) {
                        this._callbacks && this._callbacks.onFocusIn && this._callbacks.onFocusIn(this);
                        this.isActive(true);
                    }
                    else if (this.editMode !== PictureEditMode.Image) {
                        this.canDraw(true);
                        this._callbacks && this._callbacks.onDraw && this._callbacks.onDraw(this);
                    }
                };
                PictureEditorModel.prototype._releaseFocus = function () {
                    if (this.isActive()) {
                        this._callbacks && this._callbacks.onFocusOut && this._callbacks.onFocusOut(this);
                        this.isActive(false);
                        this.canDraw(false);
                    }
                };
                PictureEditorModel.prototype._wrapButtonAction = function (item, model) {
                    var oldAction = item.action;
                    item.action = function (e) {
                        model.changeActiveButton(e.model);
                        if (oldAction)
                            oldAction(e, model);
                    };
                };
                PictureEditorModel.prototype._initActions = function (customizeActionsCallback) {
                    var _this = this;
                    if (this.editMode == PictureEditMode.Image || this.editMode == PictureEditMode.ImageAndSignature) {
                        this.actions.push(this.actionsProvider.createOpenFileAction(function (e) { return _this._loadImage(e); }));
                        this.actions.push(this.actionsProvider.createSizingAction());
                    }
                    if (this.editMode == PictureEditMode.Signature || this.editMode == PictureEditMode.ImageAndSignature) {
                        this.actions.push(this.actionsProvider.createBrushAction());
                    }
                    this.actions.push(this.actionsProvider.createClearItem(function () {
                        _this.painter.reset(_this._initialImage, _this._initialAlignment, _this._initialSizeMode);
                    }));
                    customizeActionsCallback && customizeActionsCallback(this, this.actions);
                    this.actions.forEach(function (item) { return _this._wrapButtonAction(item, _this); });
                };
                PictureEditorModel.prototype._loadImage = function (e) {
                    var self = this;
                    var $input = $(e.element).siblings('input');
                    $input.on("change", function (e) {
                        self._handleFiles($input.get(0));
                    });
                    $input.click();
                };
                PictureEditorModel.prototype._handleFiles = function (filesHolder) {
                    var _this = this;
                    var files = filesHolder.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var fileReader = new FileReader();
                        fileReader.onload = function (args) {
                            _this.painter.format(files[0].name.split('.').pop());
                            var encodedContent = fileReader.result.replace(/^data:[^,]+,/, '');
                            _this.painter.image(encodedContent);
                            _this.painter.refresh();
                        };
                        fileReader.readAsDataURL(file);
                    }
                };
                PictureEditorModel.prototype._addEvents = function () {
                    var _this = this;
                    this._pointerDownHandler = function (e) {
                        _this._takeFocus();
                    };
                    this._pointerCancelHandler = function (e) {
                        _this._releaseFocus();
                    };
                    this._pointerUpHandler = function (e) {
                        if (!_this.isActive())
                            return;
                        var isUnderCursor = function (componentContent) {
                            return componentContent && (componentContent.is(e.target) || componentContent.has(e.target).length > 0);
                        };
                        var isEditorContainer = _this.$element.is(e.target) || _this.$element.has(e.target).length > 0
                            || isUnderCursor(_this._getPopupContent())
                            || _this.actions.some(function (a) {
                                if (!a.isActive())
                                    return false;
                                var component = ko.unwrap(a.component);
                                return isUnderCursor(component && $(component.content()));
                            })
                            || (e.target.className.indexOf && e.target.className.indexOf(_this.GESTURE_COVER_CLASS) !== -1);
                        if (!isEditorContainer) {
                            _this._releaseFocus();
                        }
                    };
                    var element = this.$element.get(0);
                    DevExpress["events"].on(element, 'dxpointerdown', this._pointerDownHandler);
                    DevExpress["events"].on(element, 'dxpointercancel', this._pointerCancelHandler);
                    DevExpress["events"].on(document, 'dxpointerup', this._pointerUpHandler);
                };
                PictureEditorModel.prototype.changeActiveButton = function (selectedItem) {
                    this.actions.forEach(function (action) {
                        action.isActive(action === selectedItem && !action.isActive());
                    });
                };
                PictureEditorModel.prototype.applyBindings = function () {
                    ko.cleanNode(this.$element[0]);
                    ko.applyBindings(this, this.$element[0]);
                    this._addEvents();
                    this.painter.initCanvas(this.$element, this.zoom());
                };
                PictureEditorModel.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    var element = this.$element.get(0);
                    DevExpress["events"].off(element, 'dxpointerdown', this._pointerDownHandler);
                    DevExpress["events"].off(element, 'dxpointercancel', this._pointerCancelHandler);
                    DevExpress["events"].off(document, 'dxpointerup', this._pointerUpHandler);
                    this.actions.forEach(function (action) { return action.dispose && action.dispose(); });
                    this.$element = null;
                };
                PictureEditorModel.prototype.getImage = function () {
                    return this.painter.getImage();
                };
                PictureEditorModel.prototype.reset = function (image, aligment, sizeMode) {
                    this._initialImage = image;
                    this._initialAlignment = aligment;
                    this._initialSizeMode = sizeMode;
                    this.painter.reset(this._initialImage, this._initialAlignment, this._initialSizeMode);
                };
                PictureEditorModel.prototype.getCurrentOptions = function () {
                    var imageBase64 = (this.painter.hasSignature() ? this.painter.getImage() : this.painter.image()) || "";
                    var imageParts = imageBase64.split(",");
                    return {
                        sizeMode: this.painter.imageSizeMode(),
                        alignment: this.painter.imageAlignment(),
                        imageType: this.painter.format(),
                        image: imageParts[imageParts.length - 1]
                    };
                };
                return PictureEditorModel;
            }(DevExpress.Analytics.Utils.Disposable));
            Preview.PictureEditorModel = PictureEditorModel;
            ko.bindingHandlers['dxPictureEditor'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = (valueAccessor());
                    $(element).children().remove();
                    var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dx-picture-editing');
                    var $element = $(element).append(templateHtml);
                    var child = $element.children()[0];
                    var model = new PictureEditorModel(options, child);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        model.dispose();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            ko.bindingHandlers['dxPainter'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = (valueAccessor());
                    $(element).children().remove();
                    var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dx-painter');
                    var $element = $(element).append(templateHtml);
                    var child = $element.children()[0];
                    var $child = $(child);
                    var model = new Painter(options);
                    model.initSize($child, options.zoom());
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        model.dispose();
                    });
                    ko.applyBindings(model, child);
                    model.initCanvas($child, options.zoom());
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
            var PopupImageEditingFieldViewModel = (function (_super) {
                __extends(PopupImageEditingFieldViewModel, _super);
                function PopupImageEditingFieldViewModel() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.parentPopupClass = "dxrp-editing-field-popup-container";
                    _this._popupInitializedClass = "dxrp-editing-field-popup-container-initialized";
                    _this._getPopupContainer = function (element) { return $(element).closest("." + _this.parentPopupClass); };
                    _this._getPainterModel = function (element) {
                        var $painter = _this._getPopupContainer(element).find(".dx-painter");
                        return $painter.length ? ko.dataFor($painter[0]) : null;
                    };
                    _this._getPictureEditorModel = function (element) {
                        var $popupEditing = $(element).find(".dx-picture-editing");
                        return $popupEditing.length ? ko.dataFor($popupEditing[0]) : null;
                    };
                    _this._resetPictureEditor = function (pictureEditorModel) {
                        pictureEditorModel.reset(_this.painterData.imageSource, _this.painterData.alignment, _this.painterData.sizeMode);
                        _this._resetPainter(pictureEditorModel.painter);
                    };
                    _this._resetPainter = function (painter) {
                        painter.imagePainter.image(_this.getImage());
                        painter.refresh();
                    };
                    _this.template = "dxrp-mobile-editing-field-image";
                    return _this;
                }
                PopupImageEditingFieldViewModel.prototype.isPopupActive = function (element) {
                    return this.isActive() && this._getPopupContainer(element).hasClass(this._popupInitializedClass);
                };
                PopupImageEditingFieldViewModel.prototype.getPainter = function () {
                    if (this.painterData == null) {
                        this.painterData = {
                            imageSource: this.getImage(),
                            imageType: this.getImageType(),
                            alignment: this.alignment(),
                            sizeMode: this.sizeMode(),
                            zoom: this.zoom,
                            canDraw: ko.observable(false)
                        };
                    }
                    return this.painterData;
                };
                PopupImageEditingFieldViewModel.prototype.getPopupData = function () {
                    var _this = this;
                    var _showContent = ko.observable(false);
                    this.popupData = {
                        contentData: this,
                        paintData: this.painterData,
                        contentTemplate: 'dxrp-editing-field-image-editor',
                        isVisible: function (element) { return _this.isPopupActive(element); },
                        getContainer: function () { return _this.popupTarget; },
                        getPositionTarget: function (element) { return _this._getPopupContainer(element); },
                        showContent: _showContent,
                        onShown: function (e) {
                            _showContent(true);
                        },
                        onHiding: function (e) {
                            _this._getPictureEditorModel(e.component._$popupContent[0]).painter.signaturePainter.resetLastPosition();
                            _this._resetPainter(_this._getPainterModel(e.element));
                        },
                        onContentReady: function (e) {
                            _this._resetPainter(_this._getPainterModel(e.element));
                        },
                        renderedHandler: function (element, model) {
                            _this._resetPictureEditor(_this._getPictureEditorModel(element));
                        }
                    };
                    return this.popupData;
                };
                PopupImageEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
                    if (!this.field.readOnly()) {
                        var _parentPopup = this._getPopupContainer(e.target);
                        if (!_parentPopup.hasClass(this._popupInitializedClass))
                            _parentPopup.addClass(this._popupInitializedClass);
                        this.isActive(true);
                    }
                };
                return PopupImageEditingFieldViewModel;
            }(Preview.ImageEditingFieldViewModel));
            Preview.PopupImageEditingFieldViewModel = PopupImageEditingFieldViewModel;
            Preview.DefaultImageEditingFieldViewModel = PopupImageEditingFieldViewModel;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var ImageSource = (function () {
            function ImageSource(sourceType, data) {
                this.sourceType = sourceType;
                this.data = data;
            }
            ImageSource.prototype.getDataUrl = function (format) {
                switch (this.sourceType) {
                    case 'svg':
                        return "data:image/svg+xml;charset=UTF-8;base64," + encodeURI(this.data);
                    case 'img':
                        return DevExpress.Analytics.Utils.formatUnicorn("data:image/{0};base64,{1}", ko.unwrap(format) || "x", this.data);
                }
            };
            ImageSource.parse = function (val) {
                var _a;
                var sourceType, data;
                _a = (val || '').split(','), sourceType = _a[0], data = _a[1];
                return sourceType && new ImageSource(sourceType, data);
            };
            ImageSource.toString = function (val) {
                return DevExpress.Analytics.Utils.formatUnicorn('{0},{1}', val.sourceType, val.data);
            };
            return ImageSource;
        }());
        Report.ImageSource = ImageSource;
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            var Internal;
            (function (Internal) {
                var templates = DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.templates;
                DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.addTemplates({
                    'dxrd-svg-fieldlist-xrbarcode': templates['dxrd-svg-toolbox-barcode'],
                    'dxrd-svg-fieldlist-xrchart': templates['dxrd-svg-toolbox-chart'],
                    'dxrd-svg-fieldlist-xrcheckbox': templates['dxrd-svg-toolbox-checkbox'],
                    'dxrd-svg-fieldlist-xrcrossbandbox': templates['dxrd-svg-toolbox-crossbandbox'],
                    'dxrd-svg-fieldlist-xrcrossbandline': templates['dxrd-svg-toolbox-crossbandline'],
                    'dxrd-svg-fieldlist-xrlabel': templates['dxrd-svg-toolbox-label'],
                    'dxrd-svg-fieldlist-xrcharactercomb': templates['dxrd-svg-toolbox-charactercomb'],
                    'dxrd-svg-fieldlist-xrline': templates['dxrd-svg-toolbox-line'],
                    'dxrd-svg-fieldlist-xrpagebreak': templates['dxrd-svg-toolbox-pagebreak'],
                    'dxrd-svg-fieldlist-xrpageinfo': templates['dxrd-svg-toolbox-pageinfo'],
                    'dxrd-svg-fieldlist-xrpanel': templates['dxrd-svg-toolbox-panel'],
                    'dxrd-svg-fieldlist-xrpicturebox': templates['dxrd-svg-toolbox-picturebox'],
                    'dxrd-svg-fieldlist-xrpivotgrid': templates['dxrd-svg-toolbox-pivotgrid'],
                    'dxrd-svg-fieldlist-xrsubreport': templates['dxrd-svg-toolbox-subreport'],
                    'dxrd-svg-fieldlist-xrtableofcontents': templates['dxrd-svg-toolbox-tableofcontents'],
                    'dxrd-svg-fieldlist-xrrichtext': templates['dxrd-svg-toolbox-richtext'],
                    'dxrd-svg-fieldlist-xrshape': templates['dxrd-svg-toolbox-shape'],
                    'dxrd-svg-fieldlist-xrgauge': templates['dxrd-svg-toolbox-gauge'],
                    'dxrd-svg-fieldlist-xrsparkline': templates['dxrd-svg-toolbox-sparkline'],
                    'dxrd-svg-fieldlist-xrtable': templates['dxrd-svg-toolbox-table'],
                    'dxrd-svg-fieldlist-xrzipcode': templates['dxrd-svg-toolbox-zipcode'],
                    'dxrd-svg-fieldlist-xrtablerow': templates['dxrd-svg-reportexplorer-tablerow'],
                    'dxrd-svg-fieldlist-xrtablecell': templates['dxrd-svg-reportexplorer-tablecell'],
                    'dxrd-svg-fieldlist-bottommarginband': templates['dxrd-svg-bands-bottom_margin'],
                    'dxrd-svg-fieldlist-detailband': templates['dxrd-svg-bands-detail'],
                    'dxrd-svg-fieldlist-detailreportband': templates['dxrd-svg-bands-detail_report'],
                    'dxrd-svg-fieldlist-groupfooterband': templates['dxrd-svg-bands-group_footer'],
                    'dxrd-svg-fieldlist-groupheaderband': templates['dxrd-svg-bands-group_header'],
                    'dxrd-svg-fieldlist-master_report': templates['dxrd-svg-bands-master_report'],
                    'dxrd-svg-fieldlist-pagefooterband': templates['dxrd-svg-bands-page_footer'],
                    'dxrd-svg-fieldlist-pageheaderband': templates['dxrd-svg-bands-page_header'],
                    'dxrd-svg-fieldlist-reportfooterband': templates['dxrd-svg-bands-report_footer'],
                    'dxrd-svg-fieldlist-reportheaderband': templates['dxrd-svg-bands-report_header'],
                    'dxrd-svg-fieldlist-verticaldetailband': templates['dxrd-svg-bands-vertical_detail'],
                    'dxrd-svg-fieldlist-verticalheaderband': templates['dxrd-svg-bands-vertical_header'],
                    'dxrd-svg-fieldlist-verticaltotalband': templates['dxrd-svg-bands-vertical_total'],
                    'dxrd-svg-fieldlist-topmarginband': templates['dxrd-svg-bands-top_margin'],
                    'dxrd-svg-fieldlist-subband': templates['dxrd-svg-bands-sub_band'],
                    'dxrd-svg-fieldlist-styles': templates['dxrd-svg-reportexplorer-styles'],
                    'dxrd-svg-fieldlist-formattingrules': templates['dxrd-svg-reportexplorer-formatting_rules'],
                    'dxrd-svg-fieldlist-component': templates['dxrd-svg-reportexplorer-component'],
                    'dxrd-svg-fieldlist-components': templates['dxrd-svg-reportexplorer-components'],
                    'dxrd-svg-fieldlist-stylemodel': templates['dxrd-svg-reportexplorer-style'],
                    'dxrd-svg-fieldlist-formattingrule': templates['dxrd-svg-reportexplorer-formatting_rules'],
                });
            })(Internal = Report.Internal || (Report.Internal = {}));
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
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
                        scrollDown: false
                    };
                    this.isLeftMove = false;
                    this.isRightMove = false;
                    this.$window = $(window);
                    this.$element = $(element),
                        this.$body = $(document.body),
                        this.$gallery = this.$element.find(".dxrd-mobile-gallery");
                    this.$galleryblocks = this.$gallery.find(".dxrd-gallery-blocks");
                    this.firstMobilePageOffset = this._getFirstPageOffset();
                    this.slideOptions.searchPanel.height.subscribe(function (newVal) {
                        if (slideOptions.disabled())
                            return;
                        if (!_this.firstMobilePageOffset)
                            _this.firstMobilePageOffset = _this._getFirstPageOffset();
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
                EventProcessor.prototype._getFirstPageOffset = function () {
                    return this.$galleryblocks.find(".dxrd-mobile-page").eq(0).offset();
                };
                EventProcessor.prototype.getDirection = function (x, y) {
                    var differenceY = y - this._startingPositionY;
                    var distanceY = Math.abs(differenceY);
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
                        this._direction.scrollDown = false;
                    }
                    else {
                        this._direction.horizontal = false;
                        this._direction.vertical = true;
                        this._direction.scrollDown = differenceY > 0;
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
                    this._direction = { horizontal: false, vertical: false, scrollDown: false };
                };
                EventProcessor.prototype.start = function (e) {
                    this.$body.addClass("dxrd-prevent-refresh");
                    this.$galleryblocks = this.$gallery.find(".dxrd-gallery-blocks");
                    if (!this.slideOptions.topOffset()) {
                        this.firstMobilePageOffset = this._getFirstPageOffset();
                        if (this.firstMobilePageOffset) {
                            this.firstMobilePageOffset.top = this.firstMobilePageOffset.top * minScale;
                        }
                    }
                    this.initialize(e.pageX, e.pageY);
                };
                EventProcessor.prototype.move = function (e) {
                    if (this.slideOptions.zoomUpdating() || this.slideOptions.galleryIsAnimated() || this.slideOptions.disabled()) {
                        return;
                    }
                    if (Preview.searchAvailable() && !this.slideOptions.searchPanel.editorVisible()) {
                        var direction = this.getDirection(e.pageX, e.pageY);
                        if (!direction.vertical && !direction.horizontal)
                            return;
                        if (direction.vertical && direction.scrollDown || this.slideOptions.searchPanel.height() !== 0) {
                            if (this.slideOptions.reachedTop() && (Preview.MobileSearchViewModel.maxHeight + this.$element.offset().top) > this.$window.scrollTop()) {
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
                            var galleryInstance = Preview.dxGalleryReportPreview["getInstance"](this.$gallery.get(0));
                            if (this.slideOptions.reachedLeft() && this.isRightMove && galleryInstance.gallery.swipeLeftEnable()) {
                                galleryInstance.prevItem();
                            }
                            else if (this.slideOptions.reachedRight() && this.isLeftMove && galleryInstance.gallery.swipeRightEnable()) {
                                galleryInstance.nextItem();
                            }
                        }
                    }
                    if (Preview.searchAvailable() && !this.slideOptions.searchPanel.editorVisible()) {
                        if (this.slideOptions.searchPanel.height() >= Preview.MobileSearchViewModel.maxHeight / 2) {
                            this.slideOptions.searchPanel.height(Preview.MobileSearchViewModel.maxHeight);
                        }
                        else {
                            this.slideOptions.searchPanel.height(0);
                        }
                        if (this.slideOptions.searchPanel.height() == Preview.MobileSearchViewModel.maxHeight) {
                            this.slideOptions.autoFitBy(Preview.ZoomAutoBy.PageWidth);
                        }
                    }
                    this.$body.removeClass("dxrd-prevent-refresh");
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
            }());
            Preview.EventProcessor = EventProcessor;
            ko.bindingHandlers["mobileZoom"] = {
                init: function (element, valueAccessor) {
                    var $element = $(element);
                    var options = valueAccessor();
                    var zoom = options.zoom();
                    DevExpress["events"].on(element, "dxpinch", function (e) {
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
                    DevExpress["events"].on(element, "dxpinchstart", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        options.zoomUpdating(true);
                        zoom = options.zoom.peek();
                    });
                    DevExpress["events"].on(element, "dxpinchend", function (e) {
                        e.stopPropagation();
                        options.zoomUpdating(false);
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
                    DevExpress["events"].on(element, 'dxpointerdown', function (e) {
                        processor.start(e);
                        isStarted = true;
                    });
                    DevExpress["events"].on(element, 'dxpointermove', function (e) {
                        isStarted && processor.move(e);
                    });
                    ["dxpointercancel", "dxpointerleave", "dxpointerup"].forEach(function (value) {
                        DevExpress["events"].on(element, value, function (e) {
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
            Preview.MobilePreviewElements = {
                Surface: "dxrdp-surface-mobile",
                Search: "dxrdp-search-mobile",
                Pages: "dxrdp-pages-mobile",
                MobileActions: "dxrdp-surface-mobile-bottom",
                Parameters: "dxrd-menu-parameters-content"
            };
            function getPreviewActionsMobile(options) {
                var exportToModel = {
                    visible: ko.observable(false),
                    items: ko.pureComputed(function () {
                        var allFormats = options.exportModel._getExportFormatItems();
                        var availableFormats = options.exportTypes().filter(function (x) { return allFormats.indexOf(x) !== -1; });
                        if (availableFormats.length > 9) {
                            availableFormats.splice(9, availableFormats.length - 9);
                        }
                        else if (availableFormats.length < 9) {
                            var notUsedFormats = allFormats.filter(function (x) { return availableFormats.indexOf(x) === -1; });
                            availableFormats.push.apply(availableFormats, notUsedFormats.slice(0, 9 - availableFormats.length));
                        }
                        return availableFormats.map(function (item) {
                            item.action = function (e) { options.exportModel._exportDocumentByFormat(e.model && e.model.format); };
                            return item;
                        });
                    })
                };
                var actions = [
                    {
                        clickAction: function () {
                            options.searchModel.searchPanelVisible(true);
                            options.searchModel.editorVisible(true);
                            options.searchModel.focusEditor({ element: $('.dxrdp-taptosearch') });
                            options.reportPreview.actionsVisible(false);
                        },
                        imageClassName: "dxrd-image-search",
                        imageTemplateName: "dxrd-svg-preview-search",
                        visible: Preview.searchAvailable
                    },
                    {
                        clickAction: function () { exportToModel.visible(!exportToModel.visible()); },
                        imageClassName: "dxrd-image-export-to",
                        imageTemplateName: "dxrd-svg-preview-export-export-to",
                        visible: true,
                        content: {
                            name: "dxrd-menu-export-content",
                            data: exportToModel
                        }
                    },
                    {
                        clickAction: function () {
                            options.parametersModel.popupInfo.visible(!options.parametersModel.popupInfo.visible());
                            options.reportPreview.actionsVisible(false);
                        },
                        imageClassName: "dxrd-image-parameters",
                        imageTemplateName: "dxrd-svg-tabs-parameters",
                        visible: options.parametersModel.popupInfo.notEmpty
                    }
                ];
                options.callbacks && options.callbacks.customizeActions && options.callbacks.customizeActions(actions);
                return new Preview.MobileActionList(actions);
            }
            var ParametersPopupModel = (function (_super) {
                __extends(ParametersPopupModel, _super);
                function ParametersPopupModel(parametersModel, _reportPreview) {
                    var _this = _super.call(this) || this;
                    _this.parametersModel = parametersModel;
                    _this._reportPreview = _reportPreview;
                    _this.showIcons = ko.observable(false);
                    _this.visible = parametersModel.popupInfo.visible;
                    _this.model = parametersModel;
                    _this._disposables.push(_this.cancelDisabled = ko.computed(function () {
                        return _this._reportPreview._currentDocumentId() === null;
                    }));
                    _this.actionButtons = [
                        { className: "dxrdp-parameters-reset", text: DevExpress.Analytics.getLocalization('Reset', 'ASPxReportsStringId.ParametersPanel_Reset'), action: _this._reset, disabled: false },
                        { className: "dxrdp-parameters-cancel", text: DevExpress.Analytics.getLocalization('Cancel', 'ASPxReportsStringId.SearchDialog_Cancel'), action: _this._cancel, disabled: _this.cancelDisabled },
                        { className: "dxrdp-parameters-submit", text: DevExpress.Analytics.getLocalization('Submit', 'ASPxReportsStringId.ParametersPanel_Submit'), action: _this._submit, disabled: false }
                    ];
                    _this.actionIcons = [
                        { className: "dxrdp-parameters-reset dxrdp-image-parameters-reset", action: _this._reset, disabled: false },
                        { className: "dxrdp-parameters-cancel dxrdp-image-parameters-cancel", action: _this._cancel, disabled: _this.cancelDisabled },
                        { className: "dxrdp-parameters-submit dxrdp-image-parameters-submit", action: _this._submit, disabled: false }
                    ];
                    return _this;
                }
                ParametersPopupModel.prototype._submit = function (parametersModel, params) {
                    var result = params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
                    if (!result || result.isValid) {
                        parametersModel.submit();
                        parametersModel.popupInfo.visible(false);
                    }
                };
                ParametersPopupModel.prototype._reset = function (parametersModel) {
                    parametersModel.restore();
                };
                ParametersPopupModel.prototype._cancel = function (parametersModel) {
                    parametersModel.popupInfo.visible(false);
                };
                ParametersPopupModel.prototype.initVisibilityIcons = function () {
                    if (!this._parametersButtonContaner)
                        return;
                    var result = this.showIcons();
                    var nodeTop = this._parametersButtonContaner.offset().top;
                    this._parametersButtonContaner.find(".dxrdp-parameter-action").each(function (_, el) {
                        result = nodeTop !== el.getBoundingClientRect().top;
                    });
                    this.showIcons(result);
                };
                ParametersPopupModel.prototype.cacheElementContent = function (element) {
                    this._parametersButtonContaner = element;
                    this.initVisibilityIcons();
                };
                ParametersPopupModel.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this._parametersButtonContaner = null;
                };
                return ParametersPopupModel;
            }(DevExpress.Designer.Disposable));
            function updatePreviewContentSizeMobile(previewWrapperSize, $root) {
                return function () {
                    var height = $root.outerHeight();
                    var width = $root.outerWidth();
                    previewWrapperSize({ width: width, height: height });
                };
            }
            Preview.updatePreviewContentSizeMobile = updatePreviewContentSizeMobile;
            function updateMobilePreviewActionsPosition($actions, $viewer, $window) {
                return function (viewer) {
                    if ($viewer.length === 0)
                        $viewer = $(viewer);
                    if ($actions.length === 0)
                        $actions = $viewer.find(".dxrdp-mobile-actions");
                    if ($window.length === 0)
                        $window = $(window);
                    var actionTop = parseInt($actions.css("bottom")) + $actions.height();
                    var viewerTop = $viewer.offset().top;
                    var viewerHeight = $viewer.height();
                    var windowContentHeight = $window.height() + $window.scrollTop();
                    var result = viewerTop + viewerHeight - windowContentHeight;
                    if (result > 0 && result < viewerHeight - actionTop) {
                        var transform = "translateY(-" + result + "px)";
                        $actions.css({
                            '-webkit-transform': transform,
                            'transform': transform
                        });
                    }
                };
            }
            Preview.updateMobilePreviewActionsPosition = updateMobilePreviewActionsPosition;
            function createMobilePreview(element, callbacks, parametersInfo, handlerUri, previewVisible, applyBindings, allowURLsWithJSContent, mobileModeSettings) {
                if (previewVisible === void 0) { previewVisible = true; }
                if (applyBindings === void 0) { applyBindings = true; }
                if (allowURLsWithJSContent === void 0) { allowURLsWithJSContent = false; }
                var previewWrapper = new Preview.PreviewRequestWrapper(null, callbacks), reportPreview = new Preview.MobileReportPreview(handlerUri, previewWrapper, undefined, callbacks, undefined, mobileModeSettings);
                var $root = $(element);
                var updatePreviewContentSize_ = updatePreviewContentSizeMobile(reportPreview.previewWrapperSize, $root);
                updatePreviewContentSize_();
                var gallery = new Preview.GalleryModel(reportPreview, reportPreview.previewWrapperSize);
                var searchModel = new Preview.MobileSearchViewModel(reportPreview, gallery);
                var parametersModel = new Preview.PreviewParametersViewModel(reportPreview, new Preview.PreviewParameterHelper(parametersInfo && parametersInfo.knownEnums, callbacks));
                var exportModel = new Preview.ExportOptionsModel(reportPreview);
                reportPreview.allowURLsWithJSContent = allowURLsWithJSContent;
                previewWrapper.initialize(reportPreview, parametersModel, searchModel);
                var exportTypes = ko.observableArray([
                    Preview.ExportFormatID.PDF, Preview.ExportFormatID.XLS, Preview.ExportFormatID.XLSX,
                    Preview.ExportFormatID.RTF, Preview.ExportFormatID.DOCX, Preview.ExportFormatID.HTML,
                    Preview.ExportFormatID.Text, Preview.ExportFormatID.CSV, Preview.ExportFormatID.Image
                ]);
                var mobileActions = getPreviewActionsMobile({ reportPreview: reportPreview, exportModel: exportModel, parametersModel: parametersModel, searchModel: searchModel, exportTypes: exportTypes, callbacks: callbacks });
                reportPreview.pageIndex.subscribe(function (newVal) { mobileActions.visible(false); });
                reportPreview.actionsVisible = mobileActions.visible;
                var designerModel = {
                    rootStyle: "dxrd-preview dxrdp-mobile dxd-back-primary",
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
                    previewWrapperSize: reportPreview.previewWrapperSize,
                    reachedTop: reportPreview.scrollReachedTop,
                    reachedLeft: reportPreview.scrollReachedLeft,
                    reachedRight: reportPreview.scrollReachedRight,
                    scrollAvailable: ko.computed(function () {
                        return !(reportPreview.scrollReachedTop() && reportPreview.scrollReachedLeft()
                            && reportPreview.scrollReachedRight() && reportPreview.scrollReachedBottom());
                    }),
                    disabled: reportPreview.interactionDisabled,
                    swipeEnabled: ko.computed(function () {
                        if (reportPreview.zoomUpdating()) {
                            return false;
                        }
                        if (searchModel.height() > 0 && !searchModel.editorVisible()) {
                            return false;
                        }
                        if (!reportPreview.scrollReachedLeft() && !reportPreview.scrollReachedRight()) {
                            return false;
                        }
                        return true;
                    }),
                    autoFitBy: reportPreview.autoFitBy,
                    galleryIsAnimated: gallery.isAnimated,
                    zoomUpdating: reportPreview.zoomUpdating,
                    brickEventsDisabled: designerModel.brickEventsDisabled
                };
                var parametersPopup = new ParametersPopupModel(parametersModel, reportPreview);
                designerModel.parts = [
                    { id: Preview.MobilePreviewElements.Surface, templateName: Preview.MobilePreviewElements.Surface, model: designerModel.reportPreview },
                    { id: Preview.MobilePreviewElements.Search, templateName: Preview.MobilePreviewElements.Search, model: designerModel.searchModel },
                    { id: Preview.MobilePreviewElements.Pages, templateName: Preview.MobilePreviewElements.Pages, model: designerModel.paginator },
                    { id: Preview.MobilePreviewElements.MobileActions, templateName: Preview.MobilePreviewElements.MobileActions, model: mobileActions },
                    { id: Preview.MobilePreviewElements.Parameters, templateName: Preview.MobilePreviewElements.Parameters, model: parametersPopup }
                ];
                var $actions = $root.find(".dxrdp-mobile-actions");
                var $window = $(window);
                var updateMobilePreviewActionsPosition_ = updateMobilePreviewActionsPosition($actions, $root, $window);
                $(window).bind("resize", function () {
                    if (parametersModel.popupInfo.visible()) {
                        parametersPopup.initVisibilityIcons();
                    }
                    updatePreviewContentSize_();
                    if (reportPreview.actionsVisible())
                        updateMobilePreviewActionsPosition_(element);
                });
                reportPreview.actionsVisible.subscribe(function (newValue) {
                    if (newValue)
                        updateMobilePreviewActionsPosition_(element);
                });
                $(window).bind("scroll", function () {
                    if (reportPreview.actionsVisible())
                        updateMobilePreviewActionsPosition_(element);
                });
                DevExpress.Designer.appendStaticContextToRootViewModel(designerModel);
                if (element && !reportPreview.canSwitchToDesigner && applyBindings) {
                    callbacks.beforeRender && callbacks.beforeRender(designerModel);
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
                            return DevExpress.Designer.getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
                        }
                        else {
                            var ofText = DevExpress.Designer.getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
                            var pageText = DevExpress.Designer.getLocalization('Page', 'ASPxReportsStringId.ToolBarItemText_PageLabel');
                            return pageText + " " + gallery.currentBlockText() + " " + ofText + " " + reportPreview.pages().length;
                        }
                    });
                }
                return MobilePaginator;
            }());
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
            var MobilePreviewPage = (function (_super) {
                __extends(MobilePreviewPage, _super);
                function MobilePreviewPage(preview, pageIndex, processClick, loading) {
                    var _this = _super.call(this, preview, pageIndex, processClick, loading) || this;
                    _this.maxZoom = 1;
                    _this.selectBrick = function (path, ctrlKey) {
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
                    return _this;
                }
                return MobilePreviewPage;
            }(Preview.PreviewPage));
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
                    if (rtl === void 0) { rtl = false; }
                    if (mobileSettings === void 0) { mobileSettings = { readerMode: true, animationEnabled: true }; }
                    var _this = _super.call(this, handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl) || this;
                    _this.availablePages = ko.observable(null);
                    _this.visiblePages = ko.computed(function () {
                        if (!_this.availablePages()) {
                            return _this.pages();
                        }
                        else {
                            return _this.pages().filter(function (x) { return _this.availablePages().indexOf(x.pageIndex) !== -1; });
                        }
                    });
                    _this.topOffset = ko.observable(0);
                    _this.previewWrapperSize = ko.observable({ width: 0, height: 0 });
                    _this.searchPanelVisible = ko.observable(false);
                    _this.actionsVisible = ko.observable(false);
                    _this.scrollReachedLeft = ko.observable(false);
                    _this.scrollReachedRight = ko.observable(false);
                    _this.scrollReachedTop = ko.observable(true);
                    _this.scrollReachedBottom = ko.observable(true);
                    _this.zoomUpdating = ko.observable(false);
                    _this.mobileZoom = ko.computed({
                        read: function () {
                            var currentZoom = _this.zoom();
                            return currentZoom > 0 ? currentZoom : _this._zoom();
                        },
                        write: function (newVal) {
                            _this.zoom(newVal);
                        }
                    });
                    _this.readerMode = mobileSettings.readerMode;
                    var globalAnimationEnabled = mobileSettings.animationEnabled;
                    _this.animationSettings = { zoomEnabled: ko.observable(globalAnimationEnabled), swipeEnabled: ko.observable(globalAnimationEnabled) };
                    _this.canSwitchToDesigner = false;
                    _this.autoFitBy(Preview.ZoomAutoBy.PageWidth);
                    _this.showMultipagePreview(true);
                    _this.interactionDisabled = ko.pureComputed(function () { return _this.pages().length === 0; });
                    _this.searchPanelVisible.subscribe(function (newVal) {
                        if (newVal) {
                            _this.actionsVisible(false);
                        }
                    });
                    return _this;
                }
                MobileReportPreview.prototype.createPage = function (pageIndex, processClick, loading) {
                    return new Preview.MobilePreviewPage(this, pageIndex, processClick, loading);
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
                MobileReportPreview.prototype._hasActiveEditingFields = function () {
                    return this.visiblePages().some(function (p) {
                        var pageEditFields = ko.unwrap(p.editingFields);
                        return pageEditFields && pageEditFields.some(function (x) { return ko.unwrap(x.isActive) || ko.unwrap(x.active); });
                    });
                };
                MobileReportPreview.prototype.showActions = function (s) {
                    if (s.zoomUpdating() || s.interactionDisabled())
                        return;
                    var searchVisible = s.searchPanelVisible();
                    if (!searchVisible) {
                        if (!this._hasActiveEditingFields()) {
                            s.actionsVisible(!s.actionsVisible());
                        }
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
                MobileReportPreview.prototype.goToPage = function (pageIndex, forcePage) {
                    _super.prototype.goToPage.call(this, pageIndex, forcePage);
                };
                MobileReportPreview.prototype.getScrollViewOptions = function () {
                    var _this = this;
                    var options = {
                        onUpdated: function (e) { _this.setScrollReached(e); },
                        direction: 'both',
                        pushBackValue: 0,
                        bounceEnabled: false
                    };
                    return options;
                };
                MobileReportPreview.prototype.setScrollReached = function (e) {
                    this.scrollReachedLeft(e.reachedLeft);
                    this.scrollReachedRight(e.reachedRight);
                    this.scrollReachedTop(e.reachedTop);
                    this.scrollReachedBottom(e.reachedBottom);
                };
                return MobileReportPreview;
            }(Preview.ReportPreview));
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
                function MobileSearchViewModel(reportPreview, gallery) {
                    var _this = _super.call(this, reportPreview) || this;
                    _this.height = ko.observable(0);
                    _this["_resultNavigator"]["_disposables"].forEach(function (x) { x.dispose(); });
                    var _galleryCurrentItemBlocksSubscription;
                    var currentBlocksSubscribe = function (selectedIndex) {
                        _this._killSubscription(_galleryCurrentItemBlocksSubscription);
                        _galleryCurrentItemBlocksSubscription = gallery.items()[selectedIndex].blocks.subscribe(function (newBlocks) { return _this.updatePagesInBlocks(newBlocks); });
                        _this.updatePagesInBlocks(gallery.items()[selectedIndex].blocks());
                    };
                    var _gallerySelectedIndexSubscription;
                    var currentIndexSubscribe = function () {
                        _this._killSubscription(_gallerySelectedIndexSubscription);
                        _gallerySelectedIndexSubscription = gallery.selectedIndex.subscribe(function (newSelectedIndex) { return currentBlocksSubscribe(newSelectedIndex); });
                        currentBlocksSubscribe(gallery.selectedIndex());
                    };
                    _this._disposables.push(gallery.items.subscribe(function (newItems) { return currentIndexSubscribe(); }));
                    currentIndexSubscribe();
                    _this._disposables.push(_this.searchResult.subscribe(function (newResult) {
                        if (!newResult || newResult.length === 0) {
                            reportPreview.availablePages(null);
                            reportPreview.pages().forEach(function (page) { return page.resetBrickRecusive(page.brick()); });
                        }
                        else {
                            reportPreview.availablePages(newResult.map(function (x) { return x.pageIndex; }));
                        }
                        var blocks = gallery.items()[gallery.selectedIndex()].blocks();
                        blocks.forEach(function (block) {
                            block.page && block.page.resetBrickRecusive(block.page.brick());
                            _this._updateBricks(block.page, _this.searchResult());
                        });
                    }));
                    _this.searchPanelVisible = reportPreview.searchPanelVisible;
                    _this.editorVisible = ko.observable(false);
                    _this.searchPanelVisible.subscribe(function (newVal) {
                        if (!newVal || !Preview.searchAvailable()) {
                            _this.stopSearching();
                        }
                        else {
                            _this.height(MobileSearchViewModel.maxHeight);
                        }
                    });
                    _this.enabled = Preview.searchAvailable;
                    return _this;
                }
                MobileSearchViewModel.prototype.focusEditor = function (s) {
                    if (this.searchPanelVisible()) {
                        this.editorVisible(true);
                        var previewSearch = $(".dxrdp-search-editor");
                        var searchEditor = DevExpress.ui.dxTextBox["getInstance"](previewSearch.get(0));
                        searchEditor.focus();
                        setTimeout(function () {
                            s.element.blur();
                            searchEditor.focus();
                        }, 1);
                    }
                };
                MobileSearchViewModel.prototype._killSubscription = function (subscription) {
                    var index = this._disposables.indexOf(subscription);
                    if (index == -1)
                        return;
                    subscription && subscription.dispose();
                    this._disposables.splice(index, 1);
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
                MobileSearchViewModel.prototype.updatePagesInBlocks = function (blocks) {
                    var _this = this;
                    blocks.forEach(function (block) {
                        if (block.page && _this.searchResult() && _this.searchResult().length > 0) {
                            _this._updateBricks(block.page, _this.searchResult());
                        }
                    });
                };
                MobileSearchViewModel.prototype.stopSearching = function () {
                    this.height(0);
                    this.editorVisible(false);
                    this.searchResult(null);
                };
                MobileSearchViewModel.prototype.startSearch = function () {
                    if (this.searchResult() === null)
                        this.findNext();
                };
                MobileSearchViewModel.maxHeight = 80;
                return MobileSearchViewModel;
            }(Preview.SearchViewModel));
            Preview.MobileSearchViewModel = MobileSearchViewModel;
            var SearchBarModel = (function (_super) {
                __extends(SearchBarModel, _super);
                function SearchBarModel(viewModel, element, $searchText) {
                    var _this = _super.call(this) || this;
                    _this.viewModel = viewModel;
                    _this._disposables.push(viewModel.height.subscribe(function (newValue) {
                        if (!newValue) {
                            element.style.display = "none";
                        }
                        else {
                            element.style.display = "block";
                        }
                        $searchText.css({
                            'opacity': Math.min((newValue / MobileSearchViewModel.maxHeight), 1)
                        });
                    }));
                    return _this;
                }
                SearchBarModel.prototype.dispose = function () {
                    this.viewModel.stopSearching();
                    _super.prototype.dispose.call(this);
                };
                return SearchBarModel;
            }(DevExpress.Designer.Disposable));
            Preview.SearchBarModel = SearchBarModel;
            ko.bindingHandlers["dxrdSearchBar"] = {
                init: function (element, valueAccessor) {
                    var viewModel = ko.unwrap(valueAccessor());
                    var $element = $(element);
                    element.style.display = "none";
                    var $searchText = $element.find('.dxrdp-taptosearch-text');
                    var searchBarModel = new SearchBarModel(viewModel, element, $searchText);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        searchBarModel.dispose();
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
            }());
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
            }());
            Preview.InteractiveMenu = InteractiveMenu;
            ko.bindingHandlers['dxCircleMenu'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dx-circle-menu'), $element = $(element).append(templateHtml), values = valueAccessor();
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
                function GalleryModel(preview, previewWrapperSize) {
                    var _this = this;
                    this.preview = preview;
                    this.previewWrapperSize = previewWrapperSize;
                    this._spacing = 1;
                    this._animationTimeout = null;
                    this.repaint = ko.observable({});
                    this.horizontal = ko.observable(1);
                    this.vertical = ko.observable(1);
                    this.pageCount = 0;
                    this.isAnimated = ko.observable(false);
                    this.items = ko.observableArray([{ blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }, { blocks: ko.observableArray([]) }]);
                    this.currentBlockText = ko.observable("");
                    this.selectedIndexReal = ko.observable(0);
                    this.selectedIndex = ko.observable(0);
                    var oldIndex = this.selectedIndex();
                    this.contentSize = ko.pureComputed(function () {
                        var blocks = _this.items()[_this.selectedIndex()].blocks();
                        var width, height;
                        if (blocks.length === 1) {
                            var block = blocks[0];
                            var position = block.position();
                            width = Math.max(position.width, block.page.width());
                            height = Math.max(position.height, block.page.height());
                        }
                        return { width: width ? width + 'px' : 'auto', height: height ? height + 'px' : 'auto' };
                    });
                    this.animationEnabled = preview.animationSettings.swipeEnabled;
                    var _calcHorizontalVertical = function () {
                        var _zoom = preview._zoom();
                        var pageHeight = Math.ceil(preview._pageHeight() * Preview.getCurrentResolution(_zoom) / Preview.previewDefaultResolution);
                        var pageWidth = Math.ceil(preview._pageWidth() * Preview.getCurrentResolution(_zoom) / Preview.previewDefaultResolution);
                        var _containerSize = previewWrapperSize();
                        var horizontal = (preview.autoFitBy() != Preview.ZoomAutoBy.PageWidth && (Math.floor(_containerSize.width / (pageWidth + 2 * _this._spacing)))) || 1;
                        var vertical = Math.floor(_containerSize.height / (pageHeight + 2 * _this._spacing)) || 1;
                        _this.horizontal(horizontal);
                        _this.vertical(vertical);
                    };
                    var updateGalleryContent = function () {
                        _calcHorizontalVertical();
                        _this.pageCount = _this.horizontal() * _this.vertical();
                        _this.updateContent(preview, _this.pageCount);
                    };
                    previewWrapperSize.subscribe(function () {
                        _this.items().forEach(function (item) { return item.blocks().forEach(function (block) { return block.repaint = true; }); });
                        updateGalleryContent();
                        var currentGalleryItem = _this.items()[_this.selectedIndex()];
                        _this.updateBlocks(currentGalleryItem, _this.pageCount, preview, _this.selectedIndexReal(), preview.animationSettings.zoomEnabled());
                        _this.repaint.valueHasMutated();
                    });
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
                        var pageCount = _this.horizontal() * _this.vertical();
                        if (_this.pageCount !== pageCount) {
                            _this.pageCount = pageCount;
                            _this.items().forEach(function (item) { return item.blocks().forEach(function (block) { return block.repaint = true; }); });
                            _this.updateContent(preview, pageCount);
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
                        className && (classSet[className] = true);
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
                    var height = this.previewWrapperSize().height / this.vertical();
                    var width = this.previewWrapperSize().width / this.horizontal();
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
                                left: blocks[i].classSet["left"] ? ((this.previewWrapperSize().width + left) * -1) : this.previewWrapperSize().width + left,
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
                    var blocks = galleryItem.blocks();
                    if (galleryItem.realIndex !== index
                        || (blocks.length !== pagesCount || blocks[0].page.pageIndex === -1)
                        || blocks.some(function (x) { return x.repaint; })) {
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
            }());
            Preview.GalleryModel = GalleryModel;
            var dxGalleryReportPreview = (function (_super) {
                __extends(dxGalleryReportPreview, _super);
                function dxGalleryReportPreview(element, options) {
                    var _this = _super.call(this, element, options) || this;
                    _this._animationClassName = "dxrdp-gallery-item-animation";
                    _this.currentBlockItem = null;
                    _this.nextBlockItem = null;
                    _this.initializeBlockItems = function () {
                        _this.blockItems = [];
                        var $items = _this["_getAvailableItems"]();
                        for (var i = 0; i < $items.length; i++) {
                            var left = parseFloat($items[i]["style"].left);
                            left = isNaN(left) ? 0 : left;
                            _this.blockItems.push({
                                element: $($items[i]),
                                left: left
                            });
                        }
                    };
                    _this.initializeBlockItems();
                    _this.gallery = _this["option"]("gallery");
                    _this.gallery.repaint.subscribe(function (newVal) {
                        if (!_this.gallery.preview._hasActiveEditingFields()) {
                            _this.repaint();
                        }
                    });
                    return _this;
                }
                dxGalleryReportPreview.prototype.repaint = function () {
                    _super.prototype.repaint.call(this);
                    this.initializeBlockItems();
                };
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
                        e.event.maxLeftOffset = startOffset;
                        e.event.maxRightOffset = endOffset;
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
                    var offset = e.event.offset;
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
            }(DevExpress.ui.dxGallery));
            Preview.dxGalleryReportPreview = dxGalleryReportPreview;
            DevExpress.registerComponent("dxGalleryReportPreview", dxGalleryReportPreview);
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Report;
    (function (Report) {
        var CustomizeExportOptionsEventArgs = (function () {
            function CustomizeExportOptionsEventArgs(options) {
                this._options = options;
            }
            CustomizeExportOptionsEventArgs.prototype.HideExportOptionsPanel = function () { this._options.panelVisible = false; };
            CustomizeExportOptionsEventArgs.prototype.HideFormat = function (format) { delete this._options.exportOptions[format.propertyName || format.format]; };
            CustomizeExportOptionsEventArgs.prototype.HideProperties = function (format) {
                var _this = this;
                var paths = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    paths[_i - 1] = arguments[_i];
                }
                var patchPropName = function (propName, obj) {
                    var info = obj.getInfo && obj.getInfo();
                    if (info) {
                        var p = info.filter(function (x) { return x.modelName === propName || x.modelName === '@' + propName; })[0];
                        if (p)
                            return p.propertyName;
                    }
                    return propName;
                };
                var addPredicate = function (obj, propName) {
                    propName = patchPropName(propName, obj);
                    var oldPredicate = obj.isPropertyVisible;
                    obj.isPropertyVisible =
                        oldPredicate
                            ? (function (x) { return oldPredicate(x) && x !== propName; })
                            : (function (x) { return x !== propName; });
                };
                if (paths.length == 0) {
                    addPredicate(this._options.exportOptions, format.format);
                }
                else {
                    paths.forEach(function (property) {
                        var path = Array.isArray(property)
                            ? property
                            : property.split('.');
                        var obj = _this._options.exportOptions[format.format];
                        while (path.length > 1) {
                            obj = ko.unwrap(obj[patchPropName(path[0], obj)]);
                            path.splice(0, 1);
                        }
                        addPredicate(obj, path[0]);
                    });
                }
            };
            CustomizeExportOptionsEventArgs.prototype.GetExportOptionsModel = function (format) { return this._options.exportOptions[format.format]; };
            return CustomizeExportOptionsEventArgs;
        }());
        Report.CustomizeExportOptionsEventArgs = CustomizeExportOptionsEventArgs;
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
                function beforeRender(designerModel) {
                    fireEvent("BeforeRender", designerModel);
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
                        Report: args.report
                    };
                    fireEvent("ReportSaved", arg);
                }
                function reportOpened(args) {
                    var arg = {
                        Url: args.url,
                        Report: args.report
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
                function tabChanged(tab) {
                    fireEvent("TabChanged", {
                        Tab: tab
                    });
                }
                function onServerError(args) {
                    fireEvent("OnServerError", { Error: args });
                }
                function componentAdded(args) {
                    fireEvent("ComponentAdded", { Model: args.model, Parent: args.parent });
                }
                function customizeParts(parts) {
                    fireEvent("CustomizeElements", {
                        Elements: parts,
                        GetById: function (id) {
                            return id
                                ? parts.filter(function (item) { return id === item.id; })[0]
                                : null;
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
                function customizeLocalization() {
                    fireEvent("CustomizeLocalization");
                }
                function customizeFieldListActions(item, actions) {
                    fireEvent("CustomizeFieldListActions", {
                        Item: item,
                        Actions: actions
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
                    tabChanged: tabChanged,
                    onServerError: onServerError,
                    customizeParts: customizeParts,
                    componentAdded: componentAdded,
                    customizeSaveDialog: customizeSaveDialog,
                    customizeSaveAsDialog: customizeSaveAsDialog,
                    customizeOpenDialog: customizeOpenDialog,
                    customizeToolbox: customizeToolbox,
                    customizeLocalization: customizeLocalization,
                    customizeFieldListActions: customizeFieldListActions,
                    beforeRender: beforeRender
                };
            };
            EventGenerator.generatePreviewEvents = function (fireEvent, prefix) {
                var self = this;
                function customizeParameterEditors(parameter, info) {
                    fireEvent("CustomizeParameterEditors", { parameter: parameter, info: info });
                }
                function customizeParts(parts) {
                    fireEvent([prefix, "CustomizeElements"].join(''), {
                        Elements: parts,
                        GetById: function (templateId) {
                            return templateId ? parts.filter(function (item) { return templateId === item.templateName; })[0] : null;
                        }
                    });
                }
                function beforeRender(designerModel) {
                    fireEvent("BeforeRender", designerModel);
                }
                function customizeActions(actions) {
                    fireEvent([prefix, "CustomizeMenuActions"].join(''), {
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
                function previewClick(pageIndex, brick, defaultHandler) {
                    var arg = {
                        PageIndex: pageIndex,
                        Brick: brick,
                        DefaultHandler: defaultHandler,
                        GetBrickText: function () { return brick && brick.text(); },
                        GetBrickValue: function (key) {
                            if (key === void 0) { key = "value"; }
                            var contentValue = brick && brick.content && brick.content.filter(function (x) { return x.Key === key; })[0];
                            return contentValue && contentValue.Value;
                        },
                        Handled: false
                    };
                    fireEvent("PreviewClick", arg);
                    return arg.Handled;
                }
                function parametersReset(model, parameters) {
                    fireEvent([prefix, "ParametersReset"].join(''), {
                        ParametersViewModel: model,
                        Parameters: parameters
                    });
                }
                function parametersSubmitted(model, parameters) {
                    fireEvent([prefix, "ParametersSubmitted"].join(''), {
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
                    fireEvent([prefix, "EditingFieldChanged"].join(''), arg);
                    return arg.NewValue;
                }
                function documentReady(documentId, reportId, pageCount) {
                    fireEvent([prefix, "DocumentReady"].join(''), {
                        ReportId: reportId,
                        DocumentId: documentId,
                        PageCount: pageCount
                    });
                }
                function onServerError(args) {
                    fireEvent("OnServerError", { Error: args });
                }
                function customizeExportOptions(options) {
                    var arg = new CustomizeExportOptionsEventArgs(options);
                    fireEvent([prefix, "CustomizeExportOptions"].join(''), arg);
                }
                var result = {
                    previewClick: previewClick,
                    documentReady: documentReady,
                    editingFieldChanged: editingFieldChanged,
                    parametersSubmitted: parametersSubmitted,
                    parametersReset: parametersReset,
                    customizeParameterLookUpSource: customizeParameterLookUpSource,
                    customizeParameterEditors: customizeParameterEditors,
                    customizeActions: customizeActions,
                    customizeParts: customizeParts,
                    customizeExportOptions: customizeExportOptions,
                    onServerError: onServerError
                };
                function customizeLocalization() {
                    fireEvent("CustomizeLocalization");
                }
                if (!prefix) {
                    result["beforeRender"] = beforeRender;
                    result["customizeLocalization"] = customizeLocalization;
                }
                return result;
            };
            return EventGenerator;
        }());
        Report.EventGenerator = EventGenerator;
        var RequestHelper = (function () {
            function RequestHelper() {
            }
            RequestHelper.generateUri = function (host, uri) {
                host = host || "";
                if (host && host[host.length - 1] === '/' && uri && uri[0] === '/') {
                    return host + uri.substring(1);
                }
                return host + uri;
            };
            return RequestHelper;
        }());
        Report.RequestHelper = RequestHelper;
        var JSDesignerBindingCommon = (function () {
            function JSDesignerBindingCommon(_options, _customEventRaiser) {
                this._options = _options;
                this._customEventRaiser = _customEventRaiser;
                this._templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dxrd-designer');
            }
            JSDesignerBindingCommon.prototype._fireEvent = function (eventName, args) {
                if (this._customEventRaiser) {
                    this._customEventRaiser(eventName, args);
                    return;
                }
                this._options.callbacks && this._options.callbacks[eventName] && this._options.callbacks[eventName](this.sender, args);
            };
            JSDesignerBindingCommon.prototype._getServerActionUrl = function (host, uri) {
                return RequestHelper.generateUri(host, uri);
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
            JSDesignerBindingCommon.prototype._getLocalizationRequest = function () {
                var self = this;
                var deferred = $.Deferred();
                var requestOptions = this._options.requestOptions;
                if (requestOptions.getLocalizationAction) {
                    var actionUrl = this._getServerActionUrl(requestOptions.host, requestOptions.getLocalizationAction);
                    $.getJSON(actionUrl)
                        .fail(function (jqXHR, textStatus, errorThrown) {
                        try {
                            DevExpress.Designer._processError(errorThrown.message, $.Deferred(), jqXHR, textStatus);
                        }
                        finally {
                            deferred.reject();
                        }
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
        }());
        Report.JSDesignerBindingCommon = JSDesignerBindingCommon;
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
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
                    var $element = $(element), enabled = valueAccessor().enabled, load = null, loadVisibleImages = function (time) {
                        if (time === void 0) { time = 300; }
                        load && clearTimeout(load);
                        load = setTimeout(function () {
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
                        }, time);
                    };
                    if (ko.isObservable(valueAccessor().updateCallback)) {
                        valueAccessor().updateCallback(loadVisibleImages);
                    }
                    var subscribtion = enabled.subscribe(function (newVal) {
                        newVal && loadVisibleImages(500);
                    });
                    var scrollLoad = function () { return loadVisibleImages(700); };
                    $element.on("scroll", scrollLoad);
                    loadVisibleImages(500);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $element.off("scroll", scrollLoad);
                        subscribtion.dispose();
                    });
                }
            };
            function rectIntersection(r1, r2) {
                return !(r2.left > r1.right ||
                    r2.right < r1.left ||
                    r2.top > r1.bottom ||
                    r2.bottom < r1.top);
            }
            var PreviewSelection = (function () {
                function PreviewSelection(_element, _page, _click) {
                    var _this = this;
                    this._element = _element;
                    this._page = _page;
                    this._click = _click;
                    this._bodyEvents = {
                        move: null,
                        up: null
                    };
                    this.dispose = function () { return _this._dispose && _this._dispose(); };
                    this._$element = $(this._element);
                    var mousemove = function (event) { return _this._mouseMove(event); };
                    var mouseup = function (event) { return _this._mouseUp(event); };
                    var mousedown = function (event) { return _this._mouseDown(event); };
                    this._element.addEventListener("mousemove", mousemove);
                    this._element.addEventListener("mouseup", mouseup);
                    this._element.addEventListener("mousedown", mousedown);
                    this._dispose = function () {
                        _this._element.removeEventListener("mousemove", mousemove);
                        _this._element.removeEventListener("mouseup", mouseup);
                        _this._element.removeEventListener("mousedown", mousedown);
                        _this._dispose = null;
                        _this._click = null;
                        _this._page = null;
                        _this._element = null;
                        mousemove = null;
                        mouseup = null;
                        mousedown = null;
                    };
                }
                PreviewSelection.prototype._updateSelectionContent = function (event) {
                    if (this._startRect.left > event.pageX) {
                        this._$selectionContent.css("left", event.pageX);
                    }
                    else {
                        this._$selectionContent.css("right", window.innerWidth - event.pageX);
                    }
                    if (this._startRect.top > event.pageY) {
                        this._$selectionContent.css("top", event.pageY);
                    }
                    else {
                        this._$selectionContent.css("bottom", window.innerHeight - event.pageY);
                    }
                    var offset = this._$element.offset();
                    var currentRect = {
                        left: (parseInt(this._$selectionContent.css("left")) - offset.left) / this._$element.width() * 100,
                        width: this._$selectionContent.width() / this._$element.width() * 100,
                        top: (parseInt(this._$selectionContent.css("top")) - offset.top) / this._$element.height() * 100,
                        height: this._$selectionContent.height() / this._$element.height() * 100
                    };
                    currentRect["right"] = currentRect.left + currentRect.width;
                    currentRect["bottom"] = currentRect.top + currentRect.height;
                    var bricks = this._page.bricks();
                    for (var i = 0; i < bricks.length; i++) {
                        if (!bricks[i].bricks) {
                            bricks[i].active(rectIntersection({
                                left: parseFloat(bricks[i].leftP),
                                top: parseFloat(bricks[i].topP),
                                right: parseFloat(bricks[i].leftP) + parseFloat(bricks[i].widthP),
                                bottom: parseFloat(bricks[i].topP) + parseFloat(bricks[i].heightP),
                            }, currentRect));
                        }
                    }
                };
                PreviewSelection.prototype._mouseMove = function (event) {
                    var _this = this;
                    if (!this._startRect || !this._page.active() || PreviewSelection.disabled)
                        return;
                    var leftButtonPressed = event.which === 1;
                    if (leftButtonPressed) {
                        if (!this._$selectionContent) {
                            if (Math.abs(this._startRect.left - event.pageX) >= 2 || Math.abs(this._startRect.top - event.pageY) >= 2) {
                                PreviewSelection.started = true;
                                this._$selectionContent = $("<div>").appendTo(document.body);
                                this._$selectionContent.css(this._startRect);
                                this._$selectionContent.addClass("dxrd-selection-content");
                                if (DevExpress.ui.dxPopup.prototype._zIndexInitValue)
                                    this._$selectionContent.css("z-index", DevExpress.ui.dxPopup.prototype._zIndexInitValue() + 100);
                                this._updateSelectionContent(event);
                                this._bodyEvents.move = function (event) { return _this._mouseMove(event); };
                                this._bodyEvents.up = function (event) { return _this._mouseUp(event); };
                                document.body.addEventListener("mousemove", this._bodyEvents.move);
                                document.body.addEventListener("mouseup", this._bodyEvents.up);
                            }
                        }
                        else {
                            this._updateSelectionContent(event);
                        }
                    }
                };
                PreviewSelection.prototype._mouseUp = function (event) {
                    this._$selectionContent && this._$selectionContent.remove();
                    this._$selectionContent = null;
                    this._bodyEvents.move && document.body.removeEventListener("mousemove", this._bodyEvents.move);
                    this._bodyEvents.up && document.body.removeEventListener("mouseup", this._bodyEvents.up);
                    this._startRect = null;
                    setTimeout(function () {
                        PreviewSelection.started = false;
                    }, 1);
                };
                PreviewSelection.prototype._mouseDown = function (event) {
                    if (PreviewSelection.disabled) {
                        return;
                    }
                    this._startRect = {
                        left: event.pageX,
                        top: event.pageY,
                        right: window.innerWidth - event.pageX,
                        bottom: window.innerHeight - event.pageY
                    };
                    this._click(this._page.pageIndex);
                };
                PreviewSelection.started = false;
                PreviewSelection.disabled = false;
                return PreviewSelection;
            }());
            Preview.PreviewSelection = PreviewSelection;
            ko.bindingHandlers["brick-selection-prog"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var values = valueAccessor(), unwrappedValues = ko.unwrap(values);
                    var selection = new PreviewSelection(element, unwrappedValues.page, unwrappedValues.click);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        selection.dispose();
                    });
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
                        var $element = $(element);
                        var autoFitBy = newOptions.autoFitBy();
                        if (autoFitBy != Preview.ZoomAutoBy.None && ((!newOptions.brickLoading || (newOptions.brickLoading && !newOptions.brickLoading())) || options.alwaysRecalculate)) {
                            if (options.skipIfInvisible && $element.filter(":visible").length == 0)
                                return;
                            var newZoom = Math.floor(Preview.updatePreviewZoomWithAutoFit(newOptions.width(), newOptions.height(), $element, autoFitBy) * 100) / 100;
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
            }());
            Preview.JSReportViewer = JSReportViewer;
            var JSReportViewerBinding = (function (_super) {
                __extends(JSReportViewerBinding, _super);
                function JSReportViewerBinding(_options, customEventRaiser) {
                    var _this = _super.call(this, _options, customEventRaiser) || this;
                    _options.viewerModel = ko.isWriteableObservable(_options.viewerModel) ? _options.viewerModel : ko.observable(null);
                    _this.sender = new JSReportViewer(_options.viewerModel);
                    return _this;
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
                    this._callbacks = this._initializeCallbacks();
                    return DevExpress.Report.Preview.createAndInitPreviewModel(this._options, element, this._callbacks, false);
                };
                JSReportViewerBinding.prototype._applyBindings = function (model, _$element) {
                    _$element.children().remove();
                    var child = _$element.append(this._templateHtml).children()[0];
                    if (!child)
                        return;
                    ko.cleanNode(child);
                    this._callbacks && this._callbacks.beforeRender && this._callbacks.beforeRender(model);
                    ko.applyBindings(model, child);
                    this._fireEvent("Init");
                };
                JSReportViewerBinding.prototype.applyBindings = function (element) {
                    var _this = this;
                    var self = this;
                    var _$element = $(element);
                    _$element.addClass("dx-designer");
                    if (self._options.reportPreview && self._options.parts) {
                        self._applyBindings(self._options, _$element);
                        return;
                    }
                    var requestOptions = self._options.requestOptions;
                    var subscription = null;
                    var applyModel = function () {
                        if (requestOptions && requestOptions.invokeAction) {
                            self._options.handlerUri = _this._getServerActionUrl(requestOptions.host, requestOptions.invokeAction);
                        }
                        self.sender.previewModel = self._createModel(element);
                        if (self._options.reportUrl) {
                            if (ko.isSubscribable(self._options.reportUrl)) {
                                subscription = self._options.reportUrl.subscribe(function (newVal) {
                                    self.sender.OpenReport(newVal);
                                });
                            }
                        }
                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                            subscription && subscription.dispose();
                        });
                        self._applyBindings(self.sender.previewModel, _$element);
                    };
                    if (requestOptions) {
                        self._getLocalizationRequest().done(function (localization) {
                            localization && DevExpress.JS.Localization.addCultureInfo(localization);
                        }).always(function () {
                            applyModel();
                        });
                    }
                    else {
                        applyModel();
                    }
                };
                return JSReportViewerBinding;
            }(Report.JSDesignerBindingCommon));
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
                PreviewHandlersHelper.prototype.doneStartExportHandler = function (deffered, inlineResult, response, printable) {
                    var _this = this;
                    if (printable === void 0) { printable = false; }
                    try {
                        if (!response) {
                            this._preview.progressBar.complete();
                            return;
                        }
                        this._preview._currentOperationId(response);
                        var progress = 0;
                        var doGetExportStatus = function (operationId) {
                            var promise = _this._preview.getExportStatus(operationId);
                            promise.done(function (result) {
                                if (result && result.requestAgain) {
                                    if (progress < result.progress) {
                                        progress = result.progress;
                                        _this._preview.updateExportStatus(result.progress);
                                    }
                                    var doStatusRequest = function () { doGetExportStatus(operationId); };
                                    Preview.PollingDelay ? setTimeout(doStatusRequest, Preview.PollingDelay) : doStatusRequest();
                                }
                                else {
                                    _this._preview.progressBar.complete();
                                    if (!result.requestAgain && result.completed) {
                                        _this._preview.updateExportStatus(result.progress);
                                        _this._preview.getExportResult(operationId, inlineResult, result.token, printable, result.uri);
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
                };
                PreviewHandlersHelper.prototype.doneExportStatusHandler = function (deffered, operationId, response) {
                    try {
                        if (!response) {
                            deffered.resolve({ requestAgain: false });
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
                PreviewHandlersHelper.prototype.errorStartBuildHandler = function (deffered, error, startBuildOperationId) {
                    this._preview.pageLoading(false);
                    this._preview.progressBar.complete();
                    deffered.resolve(true);
                    this._preview._startBuildOperationId = "";
                    this._preview.removeEmptyPages();
                };
                PreviewHandlersHelper.prototype.errorGetBuildStatusHandler = function (deffered, error, ignoreError) {
                    deffered.resolve({ requestAgain: false, created: false });
                };
                PreviewHandlersHelper.prototype.doneGetBuildStatusHandler = function (deffered, documentId, response, stopProcessingPredicate) {
                    var _this = this;
                    try {
                        if (!response) {
                            deffered.resolve({ requestAgain: false });
                            return;
                        }
                        this._preview.progressBar.progress() < response.progress && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate()
                            && this._preview.progressBar.progress(response.progress);
                        var wereNoPagesAndNewOnesExist = this._preview.pageIndex() === -1 && response.pageCount > 0;
                        if (wereNoPagesAndNewOnesExist) {
                            this._preview.pageIndex(0);
                        }
                        for (var i = 0; i < response.pageCount && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate(); i++) {
                            var createNewPage = function (index) {
                                return _this._preview.createPage(index, _this._preview.createBrickClickProcessor(index));
                            };
                            if (i < this._preview.pages().length) {
                                var page = this._preview.pages()[i];
                                if (!page || page.isEmpty) {
                                    page = createNewPage(i);
                                    this._preview.pages.splice(i, 1, page);
                                }
                                if (page.pageIndex === -1) {
                                    page.pageIndex = i;
                                    if (this._preview.pageIndex.peek() === i) {
                                        page.isClientVisible(true);
                                    }
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
            }());
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
                    this.cancelText = ko.observable(DevExpress.Designer.getLocalization('Cancel', 'ASPxReportsStringId.SearchDialog_Cancel'));
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
            }());
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
                PreviewRequestWrapper.getProcessErrorCallback = function (reportPreview, defaultErrorMessage, showMessage) {
                    if (showMessage === void 0) { showMessage = true; }
                    return function (message, jqXHR, textStatus) {
                        if (!reportPreview) {
                            var error = DevExpress.Analytics.Utils.getErrorMessage(jqXHR);
                            Preview.MessageHandler.processError(error || defaultErrorMessage || "Internal Server Error", showMessage);
                        }
                        else
                            reportPreview._processError(defaultErrorMessage, jqXHR, showMessage);
                    };
                };
                PreviewRequestWrapper.getPage = function (url, ignoreError) {
                    return DevExpress.Designer.ajax(url, undefined, undefined, PreviewRequestWrapper.getProcessErrorCallback(), ignoreError, { type: "GET" });
                };
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
                    })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("An error occurred during search", "ASPxReportsStringId.WebDocumentViewer_SearchError")));
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
                    return DevExpress.Designer.ajax({
                        uri: Preview.HandlerUri,
                        action: 'startBuild',
                        arg: encodeURIComponent(JSON.stringify({
                            reportId: this._reportPreview.reportId,
                            reportUrl: this._reportPreview.reportUrl,
                            drillDownKeys: this._reportPreview["_drillDownState"],
                            sortingState: this._reportPreview["_sortingState"],
                            timeZoneOffset: 0 - new Date().getTimezoneOffset(),
                            parameters: parameters
                        })),
                        processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Cannot create a document for the current report", "ASPxReportsStringId.WebDocumentViewer_DocumentCreationError")),
                        isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage) || !data.success; },
                        getErrorMessage: this._reportPreview._getErrorMessage
                    });
                };
                PreviewRequestWrapper.prototype.getBuildStatusRequest = function (documentId, shouldIgnoreError) {
                    return DevExpress.Designer.ajax({
                        uri: Preview.HandlerUri,
                        action: 'getBuildStatus',
                        arg: encodeURIComponent(JSON.stringify({
                            documentId: documentId,
                            timeOut: Math.max(5000, DevExpress.Report.Preview.TimeOut)
                        })),
                        processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Error obtaining a build status", "ASPxReportsStringId.WebDocumentViewer_GetBuildStatusError")),
                        ignoreError: shouldIgnoreError,
                        isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage) || !data.success; },
                        getErrorMessage: this._reportPreview._getErrorMessage
                    });
                };
                PreviewRequestWrapper.prototype.getDocumentData = function (documentId, shouldIgnoreError) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'getDocumentData', encodeURIComponent(documentId), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Cannot obtain additional document data for the current document", "ASPxReportsStringId.WebDocumentViewer_GetDocumentDataError")), shouldIgnoreError);
                };
                PreviewRequestWrapper.prototype.customDocumentOperation = function (documentId, serializedExportOptions, editindFields, customData, hideMessageFromUser) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'documentOperation', encodeURIComponent(JSON.stringify({
                        documentId: documentId,
                        customData: customData,
                        exportOptions: serializedExportOptions,
                        editingFieldValues: editindFields
                    })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("The requested document operation cannot be performed.", "ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error"), !hideMessageFromUser));
                };
                PreviewRequestWrapper.prototype.openReport = function (reportName) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'openReport', encodeURIComponent(reportName), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Could not open report", "ASPxReportsStringId.WebDocumentViewer_OpenReportError") + " '" + reportName + "'"));
                };
                PreviewRequestWrapper.prototype.drillThrough = function (customData) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'drillThrough', encodeURIComponent(JSON.stringify({
                        reportId: this._reportPreview.reportId,
                        reportUrl: this._reportPreview.reportUrl,
                        documentId: this._reportPreview.documentId,
                        parameters: this._parametersModel.serializeParameters(),
                        editingFields: this._reportPreview.editingFieldsProvider().map(function (field) { return field.model(); }),
                        customData: customData
                    })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Drill through operation failed", "ASPxReportsStringId.WebDocumentViewer_DrillThroughError")));
                };
                PreviewRequestWrapper.prototype.getStartExportOperation = function (arg) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, 'startExport', arg, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("An error occurred during the export", "ASPxReportsStringId.WebDocumentViewer_ExportError")));
                };
                PreviewRequestWrapper.prototype.getExportStatusRequest = function (operationId) {
                    return DevExpress.Designer.ajax({
                        uri: Preview.HandlerUri,
                        action: 'getExportStatus',
                        arg: encodeURIComponent(JSON.stringify({
                            id: operationId,
                            timeOut: Math.max(5000, DevExpress.Report.Preview.TimeOut)
                        })),
                        processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, DevExpress.Designer.getLocalization("Error obtaining an export status", "ASPxReportsStringId.WebDocumentViewer_GetExportStatusError")),
                        isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage) || !data.success; }
                    });
                };
                PreviewRequestWrapper.prototype.getEditingFieldHtml = function (value, editingFieldIndex) {
                    return DevExpress.Designer.ajax(Preview.HandlerUri, "getEditingFieldHtmlValue", encodeURIComponent(JSON.stringify({
                        documentId: this._reportPreview.documentId,
                        value: value,
                        editingFieldIndex: editingFieldIndex
                    })));
                };
                return PreviewRequestWrapper;
            }());
            Preview.PreviewRequestWrapper = PreviewRequestWrapper;
        })(Preview = Report.Preview || (Report.Preview = {}));
    })(Report = DevExpress.Report || (DevExpress.Report = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Reporting;
    (function (Reporting) {
        var Templates;
        (function (Templates) {
            DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.addTemplates({
                'dx-picture-editing': '<div class="dx-picture-editing">        <canvas data-bind="zoom: painter.scale"></canvas>        <div class="dx-picture-editing-active" data-bind="dxPopup: {                width: 48, height: \'auto\',                position:{ my: \'left top\', at: \'right top\', boundary: \'.dxrd-preview-surface\', of: $data.$element, collision: \'fit fit\', offset: \'1 -1\' },                container: \'.dx-designer\',                target: \'.dx-designer\',                showTitle: false,                showCloseButton: false,                animation: {},                shading: false,                visible: $data.isActive            }">            <div data-options="dxTemplate: { name: \'content\' }">                <div class="dx-picture-editing-toolbar" data-bind="foreach: $data.actions">                    <div class="dx-picture-editing-toolbar-item" data-bind="dxAction: $data.action, attr: { title: title }">                        <div class="dx-picture-editing-toolbar-item-icon" data-bind="template: { name: icon, afterRender: $data.renderedHandler }"> </div>                    </div>                    <!-- ko template: { if: $data.template, name: $data.template, data: $data.templateOptions }-->                    <!-- /ko -->                </div>            </div>        </div>    </div>',
                'dx-painter': '<div class="dx-painter">        <canvas data-bind="zoom: scale"></canvas>    </div>',
                'dx-file-dialog': '<input type="file" accept="image/*" style="display:none">',
                'dx-picture-editing-toolbar-popup': '<div class="dx-picture-edit-popup-content" data-bind="dxPopover: {            width: width,            height: height,            closeOnOutsideClick: $data.closeOnOutsideClick,            onShown: $data.onShown,            onContentReady: $data.onContentReady,            position: { my: \'left top\', at: \'right top\', boundary: \'.dx-designer\', of: getPositionTarget(), collision: \'flipfit fit\', offset: \'-10 0\' },            container: getPositionTarget(),            showTitle: false,            target: getPositionTarget(),            showCloseButton: false,            shading: false,            animation: {},            visible: visible }">        <!-- ko template: { name: contentTemplate, data: contentData } -->        <!--/ko-->    </div>',
                'dx-picture-editing-brush-options': '<div class="dx-picture-editing-brush-options">        <div class="dx-picture-editing-line-width">            <div class="dx-picture-editing-text" data-bind="text: brushWidthText"></div>            <div class="dx-picture-editing-line-width-slider" data-bind="dxSlider: { min: 1, max: 9, value: $data.lineWidth,             label: { visible: true },             tooltip: { enabled: true, showMode: \'always\', position: \'bottom\' } }"></div>        </div>        <div class="dx-picture-editing-line-color">            <div class="dx-picture-editing-text" data-bind="text: brushColorText"></div>            <div class="dx-picture-editing-brush-options-colors" data-bind="foreach: $data.colors">                <div class="dx-picture-editing-brush-options-color" data-bind="css: { selected: $data.isSelected }">                    <div class="dx-picture-editing-brush-options-color-cell" data-bind="style: { background: $data.value }, dxAction: $data.action"></div>                </div>            </div>        </div>    </div>',
                'dx-picture-editing-sizemode-alignment': '<div class="dx-picture-editing-sizemode-alignment">        <div class="dx-picture-editing-sizemode">            <div class="dx-picture-editing-text" data-bind="text: sizeModeText"></div>            <div class="dx-picture-editing-sizemode-values" data-bind="foreach: { data: sizeModeValues }">                <div class="dx-picture-editing-sizemode-alignment-value" data-bind="css: { selected: isSelected }, template: $data.iconTemplate, dxAction: $data.action">                </div>            </div>        </div>        <div class="dx-picture-editing-alignment">            <div class="dx-picture-editing-text" data-bind="text: alignmentText"></div>            <div class="dx-picture-editing-alignment-values" data-bind="foreach: { data: alignmentValues }">                <div class="dx-picture-editing-sizemode-alignment-value" data-bind="css: { selected: isSelected }, template: $data.iconTemplate, dxAction: $data.action">                </div>            </div>        </div>    </div>',
                'dx-picture-editing-imagepickerwithfilter': '<div class="dx-picture-editing-filtercontent" data-bind="styleunit: { width: contentWidth }">        <div class="dx-picture-editing-filtercontent-editor" data-bind="dxTextBox: { value: filter, valueChangeEvent: \'keyup\', placeholder: searchPlaceholder(), showClearButton: true  }"></div>        <div class="dx-picture-editing-filtercontent-images">            <!-- ko template: \'dx-picture-editing-imagespicker\' -->            <!-- /ko -->        </div>    </div>',
                'dx-picture-editing-imagespicker': '<div class="dx-picture-editing-imagescontainer dxd-text-primary" data-bind="styleunit: { width: contentWidth }, dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }">        <!-- ko foreach: images -->        <div class="dx-picture-editing-block dxd-state-normal dxd-back-highlighted" data-bind="styleunit: { width: $parent.width + 10 }, visible: visible, click: function() { $parent.action($data); }">            <div class="dx-picture-editing-block-image" data-bind="styleunit: { width: $parent.width, height: $parent.height }, style: { backgroundImage: \'url(\' + ($data.url || $data.data) + \')\' }"></div>            <!-- ko if: $data.text-->            <!-- ko if: $parent.filterEnabled -->            <div class="dx-picture-editing-block-text" data-bind="searchHighlighting: { text: $data.text, textToSearch: $parent.filter }, attr: { title: $data.text }"></div>            <!-- /ko -->            <!-- ko ifnot: $parent.filterEnabled -->            <div class="dx-picture-editing-block-text" data-bind="text: $data.text, attr: { title: $data.text }"></div>            <!-- /ko -->            <!-- /ko -->        </div>        <!-- /ko -->    </div>',
                'dxrp-editing-field-container': '<div class="dxrp-editing-field-container" data-bind="style: containerStyle(), zoom: zoom, css: { active: active(), readonly: field.readOnly() }">        <div class="dxrp-editing-field-borders" data-bind="style: borderStyle()"></div>        <div class="dxrp-editing-field-content" data-bind="dxclick: activateEditor">            <!-- ko if: !active() || field.readOnly()  -->            <div class="dxrp-editing-field-readonly-text" data-bind="style: textStyle(), css: {\'dxrp-editing-field-text-wordwrap\': !wordWrap}">                <!-- ko if: htmlValue()  -->                <div class="dxrp-editing-field-text-html" data-bind="style: breakOffsetStyle(), html: htmlValue()"></div>                <!--/ko-->                <!-- ko ifnot: htmlValue()  -->                <div class="dxrp-editing-field-text-html" data-bind="style: breakOffsetStyle(), text: field.editValue()"></div>                <!--/ko-->            </div>            <!--/ko-->            <!-- ko if: active() && !field.readOnly() -->            <!-- ko template: { name: editorTemplate, data: data } -->            <!--/ko-->            <!--/ko-->        </div>    </div>',
                'dxrp-editing-field-text': '<textarea class="dxrp-editing-field-text" data-bind="value: value, valueUpdate: \'keypress\', style: textStyle(), event: { blur: hideEditor, keyup: keypressAction }"></textarea>',
                'dxrp-editing-field-mask': '<div class="dxrp-editing-field-mask" data-bind="dxTextBox: options, childStyle: { style: textStyle(), selector: \'.dx-texteditor-input\'}"></div>',
                'dxrp-editing-field-number': '<div class="dxrp-editing-field-mask" data-bind="dxNumberBox: options, childStyle: { style: textStyle(), selector: \'.dx-texteditor-input\'}"></div>',
                'dxrp-editing-field-datetime': '<div style="width: 100%" class="dxrp-editing-field-datetime" data-bind="dxDateBox: options, childStyle: { style: textStyle(), selector: \'.dx-texteditor-input\'}"></div>',
                'dxrp-editing-field-image': '<div class="dxrp-editing-field-container" data-bind="style: containerStyle() ">        <!-- ko template: \'dxrp-editing-field-image-editor\' -->        <!-- /ko -->    </div>',
                'dxrp-editing-field-image-editor': '<div style="height: 100%; width: 100%;" data-bind="dxPictureEditor: { image: $data.getImage(), imageType: $data.getImageType(), imageMode: editMode, alignment: alignment, sizeMode: sizeMode, callbacks: callbacks, isActive: isActive, zoom: zoom, popupOptions: popupOptions }"></div>',
                'dxrp-editing-field-checkbox': '<div class="dxrp-editing-field-check-container" data-bind="style: containerStyle(), zoom: zoom, click: onClick">        <div class="dxrp-editing-field-check" data-bind="style: checkStyle()">            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 650 650" preserveAspectRatio="xMidYMid meet">                <path d="M0 25 H625 V625 H25 V50" class="highlight" style="stroke: #808080; stroke-width: 50;"></path>                <path d="M222 437 l-72 -72 0 -70 0 -69 70 69 70 70 110 -110 110 -110 0 75 0 75 -108 108 -107 107 -73 -73z" data-bind="style: { fill: checked() ? \'black\' : \'transparent\' }" />            </svg>        </div>    </div>',
                'dxrp-editing-field-radio': '<div class="dxrp-editing-field-check-container" data-bind="style: containerStyle(), zoom: zoom, click: onClick">        <div class="dxrp-editing-field-check" data-bind="style: checkStyle()">            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 760 760" preserveAspectRatio="xMidYMid meet">                <g fill="#010101" stroke="none">                    <path d="M32,380a348,348 0 1,0 696,0a348,348 0 1,0 -696,0" class="highlight" style="stroke-width: 50;stroke: rgb(0, 0, 0);" />                    <path d="M185,380a195,195 0 1,0 390,0a195,195 0 1,0 -390,0" data-bind="style: { fill: checked() ? \'black\' : \'transparent\' }"/>                </g>            </svg>        </div>    </div>',
                'dxrp-character-comb-editing-field': '<div class="dxrp-editing-field-charactercomb" data-bind="style: containerStyle(), dxclick: activateEditor, zoom: zoom, css: { active: active(), readonly: field.readOnly() }">        <!-- ko if: !active() || field.readOnly()  -->        <!-- ko foreach: cells -->            <div class="dxrp-editing-field-charactercomb-cell" data-bind="style: style, text: text"></div>        <!-- /ko -->        <!-- /ko -->        <!-- ko if: active() && !field.readOnly() -->        <textarea style="background:white" class="dxrp-editing-field-text" data-bind="value: field._editorValue, valueUpdate: \'keypress\', style: textStyle(), event: { blur: hideEditor, keyup: keypressAction }"></textarea>        <!--/ko-->    </div>',
                'dxrdp-search-mobile': '<!-- ko if: $data.enabled -->    <div class="dxrdp-search-wrapper" data-bind="styleunit:{ height: height }, dxrdSearchBar: $data">        <div class="dxrd-mobile-search">            <div class="dxrdp-taptosearch" data-bind="visible: !$data.editorVisible(), dxAction: function(s) { $data.focusEditor(s); }">                <div class="dxrdp-taptosearch-text" data-bind="text: $root.getLocalization(\'Tap here to Search\', \'ASPxReportsStringId.WebDocumentViewer_Mobile_TapHereToSearch\')"></div>            </div>            <div class="dxrdp-search-panel" data-bind="visible: $data.editorVisible()">                <div class="dxrdp-search-editor" data-bind="dxTextBox: { value: searchText, onEnterKey: function() { $data.startSearch(); } }"></div>            </div>        </div>    </div>    <!-- /ko -->',
                'dxrdp-surface-mobile': '<div class="dxrd-preview-wrapper dxrdp-fullscreen dxrd-preview-surface" data-bind="style: { pointerEvents: $data.documentId === null ? \'none\' : \'\', touchEvents: $data.documentId === null ? \'none\' : \'\' }, styleunit: { top: topOffset, height: previewWrapperSize().height, width: previewWrapperSize().width }, slide: $root.slideOptions, mobileZoom: { zoom: mobileZoom, zoomUpdating: zoomUpdating }, dxclick: function(s,e) { if(!$root.brickEventsDisabled()) { $data.showActions(s,e); } }">        <!-- ko template: {name: \'dxrd-preview-progress-bar\', data: progressBar }-->        <!-- /ko -->        <div class="dxrd-mobile-content">            <div class="dxrd-mobile-gallery" data-bind="style: { pointerEvents: $data.zoomUpdating() ? \'none\' : \'\', touchEvents: $data.zoomUpdating() ? \'none\' : \'\' }, dxGalleryReportPreview: { dataSource: $root.gallery.items, gallery: $root.gallery, animationEnabled: $root.gallery.animationEnabled, selectedIndex: $root.gallery.selectedIndex, width:\'100%\', height: \'100%\', showIndicator: false, loop: true, onSelectionChanged: onSlide, swipeEnabled: $root.slideOptions.swipeEnabled }">                <div data-options="dxTemplate: { name: \'item\' }">                    <div class="dxrd-scrollView-mobile" data-bind="dxScrollView: $root.reportPreview.getScrollViewOptions()">                        <div class="dxrd-gallery-blocks" data-bind="style: $root.gallery.contentSize()">                            <!-- ko foreach: $data.blocks() -->                            <!-- ko if: $data.page -->                            <div class="dxrd-gallery-block" data-bind="styleunit: position, css: $data.classSet">                                <div class="dxrd-gallery-block-content" data-bind="styleunit: { width: Math.max(page.width(), position().width), height: Math.max(page.height(), position().height) }, style: { \'background-color\': page.color }">                                    <div class="dxrdp-active-border" data-bind="css: { \'dxrdp-active\': page.active() && $parents[0].blocks().length > 1, \'dxrdp-page-padding\': $parents[0].blocks().length > 1 }, visible: $root.slideOptions.readerMode"></div>                                    <div class="dxrd-mobile-page" data-bind="styleunit: { width: page.width, height: page.height }, style: { pointerEvents: $root.brickEventsDisabled() ? \'none\' : \'\', touchEvents: $root.brickEventsDisabled() ? \'none\' : \'\' }">                                        <!-- ko template: { name :\'dxrd-preview-page-mobile\', data: page } -->                                        <!-- /ko -->                                    </div>                                </div>                            </div>                            <!-- /ko -->                            <!-- /ko -->                        </div>                    </div>                </div>            </div>        </div>    </div>    <input type="text" style="display:none" />',
                'dxrd-preview-page-mobile': '<div class="dxrdp-content" data-bind="dxclick: clickToBrick, styleunit: { width: width, height: height }, autoFit: { autoFitBy: $root.reportPreview.autoFitBy, zoom: zoom, width: originalWidth, height: originalHeight, alwaysRecalculate: true, previewSize: $root.reportPreview.previewSize, brickLoading: brickLoading, skipIfInvisible: true }">        <div class="dxrdp-loading-wrapper" data-bind="styleunit: { width: width, height: height, lineHeight: height }, style: { \'background-color\': color }, visible: pageLoading, text: loadingText">        </div>        <img style="width:100%; height:100%;" data-bind="attr: { src: displayImageSrc }, style:{ \'background-color\': color }" />        <div class="dxrdp-active-border" data-bind="css: { \'dxrdp-active\': active() && $parents[1].blocks().length > 1 }, visible: !$root.slideOptions.readerMode"></div>        <!-- ko foreach: activeBricks -->        <!-- ko template: { name: "dxrd-page-brick-mobile", data: $data } -->        <!--/ko-->        <!--/ko-->        <!-- ko if: !brickLoading() && $data.editingFields-->        <!-- ko foreach: editingFields -->        <!-- ko template: template -->        <!--/ko-->        <!--/ko-->        <!--/ko-->    </div>',
                'dxrd-page-brick-mobile': '<div class="dxrd-report-preview-brick" data-bind="style: { top: topP, left: $data.leftP, right: $data.rightP, height: heightP, width: widthP }, css: { \'dxrd-report-preview-brick-selected\': $data.active }">    </div>',
                'dxrd-preview-export-to-mobile': '<div class="dxrd-preview-export-to" data-bind="dxMenu: { items: items, onItemClick: clickAction }, attr: { title: $root.getLocalization(text, $data.textId) }">        <div class="dxrd-preview-export-menu-item" data-options="dxTemplate: { name: \'item\' }" data-bind="attr: { title: $root.getLocalization(text, $data.textId) }">            <!--ko if: $data.format -->            <div class="dxrd-preview-export-item-text" data-bind="text: $root.getLocalization($data.text, $data.textId)"></div>            <!-- /ko -->            <!--ko ifnot: $data.format -->            <div class="dxrd-preview-export-item-image-wrapper">                <div class="dxrd-preview-export-item-image" data-bind="css: ko.unwrap($data.imageClassName), template: { name: ko.unwrap($data.imageTemplateName), if: !!ko.unwrap($data.imageTemplateName)}"> </div>            </div>            <div class="dx-menu-item-popout-container">                <div class="dx-menu-item-popout"></div>            </div>            <!-- /ko -->        </div>    </div>',
                'dxrdp-pages-mobile': '<div class="dxrdp-mobile-paginator" data-bind="dxrdMobilePaginator: $data">        <div class="dxrdp-mobile-paginator-content">            <div class="dxrdp-mobile-paginator-text" data-bind="text : text"></div>        </div>    </div>',
                'dxrdp-surface-mobile-bottom': '<div class="dxrdp-mobile-actions" data-bind="visible: visible">        <div class="dxrdp-mobile-actions-content">            <!-- ko foreach: actions -->            <div class="dxrdp-mobile-action" data-bind="visible: visible, css: $data.imageClassName, template: { name: $data.imageTemplateName, if: !!ko.unwrap($data.imageTemplateName)}, dxAction: clickAction"> </div>            <!-- ko if: $data.content -->            <!-- ko template: $data.content -->            <!-- /ko -->            <!-- /ko -->            <!-- /ko -->        </div>    </div>',
                'dxrd-menu-export-content': '<div class="dxrd-menu-export-popover" data-bind="dxPopover: { width: \'266px\', height: \'266px\', visible: visible, target: \'.dxrdp-mobile-action.dxrd-image-export-to\' }">        <!-- ko foreach: items -->        <div class="dxrd-menu-export-item" data-bind="dxAction: action, text: text">        </div>        <!-- /ko-->    </div>',
                'dxrd-menu-parameters-content': '<div class="dxrd-menu-parameters-popup" data-bind="dxPopup: { showTitle: false, width: \'100%\', height: \'100%\', visible: visible }">        <!--TODO: use container: \'.dxrd-preview-wrapper\' and fix styles-->        <!-- ko template: { name: \'dxrd-preview-parameters-mobile\', data: $data }-->        <!-- /ko -->    </div>',
                'dxrd-preview-parameters-mobile': '<div class="dxrdp-parameters-mobile" data-bind="dxValidationGroup: {}">        <div class="dxrdp-parameters-title" data-bind="text: $root.getLocalization(\'Parameters\', \'DevExpress.XtraReports.UI.XtraReport.Parameters\')"> </div>        <div class="dxrdp-parameters-scroll" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true, bounceEnabled: false }">            <div class="dx-fieldset">                <div data-bind="dxPropertyGrid: { target: ko.observable(model) }"></div>            </div>        </div>        <div class="dxrdp-parameters-buttons text-buttons" data-bind="foreach: { data: $data.actionButtons }, cacheElement: { action: function(element) { $data.cacheElementContent(element); } }">            <div class="dxrdp-parameter-action" data-bind="dxButton: { text: text, onClick: function(params){ $data.action($parent.parametersModel, params) }, disabled: disabled }, css: className"></div>        </div>        <div class="dxrdp-parameters-buttons" data-bind="visible: showIcons, foreach: { data: $data.actionIcons }">            <div class="dxrdp-parameter-icon" data-bind="dxButton: { onClick: function(params){ $data.action($parent.parametersModel, params)}, disabled: disabled }, css: className"></div>        </div>    </div>',
                'dxrp-mobile-editing-field-image': '<div class="dxrp-editing-field-container" data-bind="style: containerStyle() ">        <div data-bind="dxclick: activateEditor, css: parentPopupClass">            <div class="dxrp-editing-field-popup-container-cloned" data-bind="dxPainter: $data.getPainter()"></div>            <!-- ko template: { name: \'dx-picture-editing-mobile\', data: $data.getPopupData() } -->            <!-- /ko -->        </div>    </div>',
                'dx-picture-editing-mobile': '<div class="dx-picture-edit-popup-content dx-picture-edit-popup-content-fullscreen" data-bind="dxPopup: {            width: contentData.containerStyle().width,            height: contentData.containerStyle().height,            position: { boundary: getContainer(), of: getPositionTarget($element) },            container: getContainer(),            showTitle: false,            target: getContainer(),            deferRendering: false,            closeOnOutsideClick: true,            showCloseButton: false,            onContentReady: onContentReady,            onHiding: onHiding,            onShown: onShown,            shading: false,            animation: { show: {}, hide: { type: \'fade\', duration: 100, to: { opacity: 0 }, from: { opacity: 1 } }},            visible: isVisible($element) }">        <!-- ko if: showContent -->        <!-- ko template: { name: contentTemplate, data: contentData, afterRender: $data.renderedHandler } -->        <!--/ko-->        <!--/ko-->    </div>',
                'dx-circle-menu': '<div class="dx-circle-menu">        <div class="dx-circle-menu-container" data-bind="visible: collectionVisible">            <!-- ko foreach: items-->            <div class="dx-circle-menu-item" data-bind="visible: visible">                <div class="dx-circle-menu-item-content">                    <div class="dx-circle-menu-item-image" data-bind="css: image, dxAction: action"></div>                    <div class="dx-circle-menu-item-text" data-bind="text: text"></div>                </div>            </div>            <!-- /ko -->        </div>        <div class="dx-circle-menu-mainbutton" data-bind="dxAction: function() { $data.changeMenuItemVisible() }, css: { expanded: collectionVisible() }"></div>    </div>',
                'dxrd-preview-document-map': '<div class="dxrd-preview-document-map" data-bind="visible: active() && visible()" style="height: 100%; overflow:hidden">    <div class="dxrd-right-panel-header dxd-text-primary">        <div style="display: inline-block;" data-bind="text: $root.getLocalization(\'Document Map\', \'ASPxReportsStringId.DocumentViewer_RibbonCommandText_DocumentMap\')"></div>    </div>    <!-- ko if: model -->    <!-- ko with: model -->    <div class="dxrd-right-panel-body" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }">        <div id="documentMapTree" data-bind="treelist: documentMapOptions" style="width:100%; height: 100%;"></div>    </div>    <!-- /ko -->    <!-- /ko --></div>',
                'dxrd-preview-export-options': '<div class="dxrd-preview-export-options-wrapper dxrd-preview-property-wrapper" data-bind="visible: active() && visible()">    <div class="dxrd-right-panel-header dxd-text-primary">        <span data-bind="text: $root.getLocalization(\'Export Options\', \'DevExpress.XtraReports.UI.XtraReport.ExportOptions\')"></span>    </div>    <!-- ko if: model-->    <div class="dxrd-right-panel-body" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }">        <div class="dx-fieldset">            <div data-bind="dxPropertyGrid: { target: model }"></div>        </div>    </div>    <!-- /ko --></div>',
                'dxrd-page-brick-clickable': '<div class="dxrd-report-preview-brick" data-bind="dxAction: function(a){ onClick(a && a.event); }, style: { top: topP, left: $data.leftP, right: $data.rightP, height: heightP, width: widthP }, css: { \'dxrd-report-preview-brick-selected\': $data.active, \'dxrd-report-preview-brick-selectable\': !($data.bricks) }">        <!-- ko if: $data.navigation -->        <div class="dxrd-report-preview-brick-navigation" data-bind="css: { \'dxrdp-navigation-brick-drill-down\' : !!navigation.drillDownKey, \'dxrdp-navigation-brick-sorting\' : !!navigation.sortData }"></div>        <!--/ko-->    </div>',
                'dxrd-preview-page': '<div class="dxrd-report-preview-content" style="position: relative; width: 100%; height: 100%" data-bind="dxclick: clickToBrick, \'brick-selection-prog\': { page: $data, preview: $parent, click: function(pageIndex) { $parent.goToPage(pageIndex) } }">        <div class="dxrd-report-preview-content-loading-wrapper" style="background: white;" data-bind="styleunit: { \'width\': width() + 2, \'height\': height() + 2 }, visible: pageLoading">            <div class="dxrd-report-preview-content-loading-panel" style="text-align: center;" data-bind="styleunit: { \'paddingTop\': height() / 2.3 }">                <div class="dxrd-report-preview-content-loading-panel-text" data-bind="text: loadingText"></div>            </div>        </div>        <img style="pointer-events: none; width: 100%; height: 100%;" data-bind="attr: { src: displayImageSrc }" />        <!-- ko foreach: activeBricks -->        <!-- ko template: { name: "dxrd-page-brick-mobile", data: $data } -->        <!--/ko-->        <!--/ko-->        <!-- ko foreach: clickableBricks -->        <!-- ko template: { name: "dxrd-page-brick-clickable", data: $data } -->        <!--/ko-->        <!--/ko-->        <!-- ko if: !brickLoading() && $data.editingFields-->        <!-- ko foreach: editingFields -->        <!-- ko template: template -->        <!--/ko-->        <!--/ko-->        <!--/ko-->    </div>',
                'dxrd-preview-parameters': '<div class="dxrd-preview-parameters-wrapper dxrd-preview-property-wrapper" data-bind="visible: active() && visible()">    <div class="dxrd-right-panel-header dxd-text-primary">        <span data-bind="text: $root.getLocalization(\'Preview Parameters\', \'ASPxReportsStringId.ReportDesigner_Preview_ParametersTitle\')"></span>        <!-- ko if: (model && !model.isEmpty()) -->        <!-- /ko -->    </div>    <!-- ko if: (!model || model.isEmpty()) -->    <div class="dxrd-group-header-parameters-empty dxd-text-primary" data-bind="text: $root.getLocalization(\'The report does not contain any parameters.\', \'ASPxReportsStringId.WebDocumentViewer_NoParameters\')"></div>    <!-- /ko -->    <!-- ko if: (model && !model.isEmpty()) -->    <div class="dxrd-right-panel-body" id="propertiesPanel" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }, dxValidationGroup: {}">        <div class="dx-fieldset">            <div data-bind="dxPropertyGrid: { target: ko.observable(model), recreateEditors: true }"></div>        </div>        <div class="dxrd-preview-parameter-action dxrdp-parameters-submit" data-bind="dxButton: { text: $root.getLocalization(\'Submit\', \'ASPxReportsStringId.ParametersPanel_Submit\'), onClick: function(params) { model.validateAndSubmit(params); } }"></div>        <div class="dxrd-preview-parameter-action dxrdp-parameters-reset" data-bind="dxButton: { text: $root.getLocalization(\'Reset\', \'ASPxReportsStringId.ParametersPanel_Reset\'), onClick: function() { model.restore(); } }"></div>        <div class="dxrd-preview-parameter-action dxrd-preview-loading" data-bind="dxLoadIndicator: { visible: model.parametersLoading }"></div>    </div>    <!-- /ko --></div>',
                'dxrd-preview-search': '<div class="dxrd-preview-search-wrapper" data-bind="visible: active() && visible()">    <!-- ko with: model -->    <div class="dxrd-preview-search-tab-header">        <span class="dxrd-preview-search-tab-header-text dxd-text-primary" data-bind="text: $root.getLocalization(\'Search\', \'ASPxReportsStringId.SearchDialog_Header\')"></span>        <div class="dxrd-preview-search-editor" data-bind="dxSearchEditor: { searchModel: $data } "></div>        <div class="dxrd-preview-search-checkbox" data-bind="dxCheckBox: { value: matchCase, text: $root.getLocalization(\'Match case\', \'ASPxReportsStringId.SearchDialog_Case\')}"></div>        <div class="dxrd-preview-search-checkbox" data-bind="dxCheckBox: { value: matchWholeWord, text: $root.getLocalization(\'Match whole word only\', \'ASPxReportsStringId.SearchDialog_WholeWord\')}"></div>    </div>    <div class="dxrd-preview-search-result-header dxd-border-primary">        <div class="dxrd-preview-search-result-header-text" data-bind="text: $root.getLocalization(\'Search result\', \'ASPxReportsStringId.WebDocumentViewer_SearchResultText\')"></div><!--TODO: correctors-->    </div>    <div class="dxrd-preview-search-result" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">        <!-- ko foreach: searchResult -->        <div class="dxrd-preview-search-result-item dxd-list-item-back-color dxd-back-highlighted" data-bind="dxAction: function() { $parent.goToResult($data); }">            <div class="dxrd-preview-search-tab-item-text propertygrid-editor-displayName dxd-text-primary" data-bind="text: text"></div>            <div class="dxrd-preview-search-tab-item-info" data-bind="text: $root.dx.Report.Preview.formatSearchResult($data)"></div>        </div>        <!-- /ko -->        <div class="dxrd-preview-search-result dxrdp-search-loading" data-bind="visible: loading">            <div data-bind="dxLoadIndicator: { height: \'30px\', width: \'30px\' }"></div>        </div>    </div>    <!-- /ko --></div>',
                'dxrd-preview-export-to': '<div class="dxrd-preview-export-toolbar-item dxrd-toolbar-item" data-bind="visible: visible">        <div class="dxrd-preview-export-to dxd-button-back-color dxd-state-normal dxd-back-highlighted" data-bind="dxMenu: { disabled: $data.disabled(), items: items, cssClass: \'dxrdp-export-to-menu\', onItemClick: clickAction }, attr: { title: $root.getLocalization(text, $data.textId) }">            <div class="dxrd-preview-export-menu-item" data-options="dxTemplate: { name: \'item\' }" data-bind="attr: { title: $root.getLocalization(text, $data.textId) }">                <!--ko if: $data.format -->                <div class="dxrd-preview-export-item-text" data-bind="text: $root.getLocalization($data.text, $data.textId)"></div>                <!-- /ko -->                <!--ko ifnot: $data.format -->                <div class="dxrd-preview-export-item-image-wrapper">                    <div class="dxrd-preview-export-item-image" data-bind="css: ko.unwrap($data.imageClassName), template: ko.unwrap($data.imageTemplateName)"> </div>                </div>                <div class="dx-menu-item-popout-container">                    <div class="dx-menu-item-popout"></div>                </div>                <!-- /ko -->            </div>        </div>        <div class="dxrd-toolbar-item-separator dxd-toolbar-separator-color dxd-border-secondary" data-bind="visible: $data.hasSeparator"></div>    </div>',
                'dxrd-preview-progress-bar': '<div class="dxrd-preview-progress dxd-popup-back-color dxd-back-primary2 dxd-border-primary" data-bind="visible: visible">        <div class="dxrd-preview-progress-text dxd-text-primary" data-bind="text : text"></div>        <div class="dxrd-preview-progress-bar dxd-back-primary">            <div class="dxrd-preview-progress-value dxd-preview-progress-bar-value-color dxd-back-accented" data-bind="style : { width: progress()  + \'%\' }"></div>        </div>        <div class="dxrd-preview-progress-cancel dxd-hyperlink-color dxd-border-accented dxd-text-accented" data-bind="text: cancelText, dxAction: function() { $data.stop && stop(); }"></div>    </div>',
                'dxrd-preview-pager': '<div class="dxrd-preview-pager dxrd-toolbar-item" data-bind="visible: visible">        <div class="dxrd-preview-pager-selectbox" data-bind="dxSelectBox: { dataSource: pageItems, value: selectedItem, opened: opened, displayExpr: displayExpr, onFocusOut: focusOut, onKeyUp: keyUp, itemTemplate: itemTemplate, searchMode: searchMode, searchEnabled: searchEnabled, searchTimeout: searchTimeout, disabled: disabled }"></div>        <div class="dxrd-toolbar-item-separator dxd-toolbar-separator-color dxd-border-secondary" data-bind="visible: $data.hasSeparator"></div>    </div>',
                'dxrd-page-brick': '<div class="dxrd-report-preview-brick" data-bind="dxAction: function(a){ onClick(a && a.event); }, style: { top: topP, left: $data.leftP, right: $data.rightP, height: heightP, width: widthP }, css: { \'dxrd-report-preview-brick-selected\': $data.active, \'dxrd-report-preview-brick-selectable\': !($data.bricks) }">        <!-- ko if: $data.navigation -->        <div class="dxrd-report-preview-brick-navigation" data-bind="css: { \'dxrdp-navigation-brick-drill-down\' : !!navigation.drillDownKey, \'dxrdp-navigation-brick-sorting\' : !!navigation.sortData }"></div>        <!--/ko-->        <!-- ko foreach: ($data.bricks || []) -->        <!-- ko lazy: { template: { name: "dxrd-page-brick" } } -->        <!--/ko-->        <!--/ko-->    </div>',
                'dx-selectbox': '<div data-bind="dxSelectBox: getOptions({ dataSource: values, value: value, valueExpr: \'value\', displayExpr: \'displayValue\', displayCustomValue: true, disabled: disabled }), dxValidator: { validationRules: $data.validationRules || [] }"></div>',
                'dxrd-zoom-autofit-select-template': '<div class="dxrd-toolbar-item-zoom" data-bind="visible: visible">        <div class="dxrd-toolbar-item-zoom-editor" data-bind="dxSelectBox: { items: zoomItems, value: $data.zoom, displayExpr: displayExpr, displayCustomValue: true }"></div>    </div>',
                'dxrd-multivalue': '<!-- ko with: value -->    <div data-bind="dxTagBox: $parent.getOptions({ dataSource: dataSource, searchEnabled: true, searchExpr: [\'displayValue\'], value: value,          displayExpr: $data.displayExpr || \'displayValue\', valueExpr: \'value\', multiline: false, showSelectionControls: true,          showDropDownButton: !!$data.showDropDownButton, selectAllMode: \'allPages\', selectedItems: $data.selectedItems,          placeholder: $root.dx.Analytics.Localization.selectPlaceholder(), maxDisplayedTags: $data.maxDisplayedTags }), dxValidator: { validationRules: $parent.validationRules || [] }">    </div>    <!-- /ko -->',
                'dxrd-multivalue-selectbox': '<!-- ko if: options -->    <!-- ko with: options -->    <div data-bind="dxSelectBox: $parent.getOptions({ dataSource: dataSource, itemTemplate: \'valueItem\', onOptionChanged: onOptionChanged, value: editorValue, displayExpr: function() { return selectedValuesString(); } })">        <div class="dxrd-multivalue-editor-item" data-options="dxTemplate: { name: \'valueItem\' }" data-bind="dxAction: function(args) { toggleSelected(); args.event.stopPropagation(); }">            <div class="dxrd-multivalue-editor-item-checkState" data-bind="dxCheckBox: { value: selected, readOnly: true }"></div>            <div class="dxrd-multivalue-editor-item-text" data-bind="text: displayValue"></div>        </div>    </div>    <!-- /ko -->    <!-- /ko -->',
                'dxrd-multivalue-editable': '<!-- ko if: value -->    <div class="dxrd-editor" data-bind="visible: visible">        <div data-bind="dxCollectionEditor: { values: value, info: info, level: level, displayName: $root.getLocalization(displayName) }">            <div data-bind="dxPropertyGrid: { target: value, level: editor.level + 1 }"></div>        </div>    </div>    <!-- /ko -->',
                'dxrd-report-preview': '<div class="dxrd-preview dxrd-designer-wrapper dxd-scrollbar-color dxd-surface-back-color" data-bind="visible: reportPreview.previewVisible, cssArray: [ $data.rootStyle , { \'dx-rtl\' : $data.rtl, \'dx-ltr\': !$data.rtl } ]">        <!-- ko foreach: parts -->        <!-- ko template: { name: templateName, data: model }-->        <!-- /ko -->        <!-- /ko -->    </div>',
                'dxrd-preview-toolbar-scrollable': '<div class="dxrd-toolbar-wrapper dxrdp-toolbar-scrollable" data-bind="dxScrollView: { showScrollbar: \'onHover\', direction: \'horizontal\', useNative: false, scrollByThumb: true }">        <div class="dxrd-toolbar" data-bind="template: {name: \'dxrd-toolbar-tmplt\', data: actionLists.toolbarItems }, keyDownActions: actionLists"></div>    </div>',
                'dxrdp-surface': '<div class="dxrd-preview-wrapper" data-bind="textCopier, css: { \'dx-rtl\': $data.rtlReport, \'dxrp-editing-fields-hightlighted\': editingFieldsHighlighted } ">        <!-- ko with: progressBar-->        <!-- ko template: \'dxrd-preview-progress-bar\'-->        <!-- /ko -->        <!-- /ko -->        <div class="dxrd-preview-surface">            <!-- ko if: !showMultipagePreview() -->            <div class="dxrd-report-preview-holder">                <!-- ko with: currentPage-->                <!-- ko if: pageLoading() || (!pageLoading() && displayImageSrc()) -->                <div class="dxrd-report-preview" data-bind="styleunit: { width: width, height: height }, autoFit: { autoFitBy: $parent.autoFitBy, zoom: zoom, width: originalWidth, height: originalHeight, rightPanelWidth: $root.tabPanel.width, previewSize: $parent.previewSize, brickLoading: brickLoading } ">                    <!-- ko template: \'dxrd-preview-page\'-->                    <!-- /ko -->                </div>                <!-- /ko -->                <!-- /ko -->            </div>            <!-- /ko -->            <!-- ko if: showMultipagePreview() && !!currentPage() -->            <div class="dxrd-report-preview-holder" data-bind="lazyImages: { enabled: showMultipagePreview, updateCallback: onSizeChanged }">                <!-- ko foreach: pages -->                <!-- ko lazy: { if: pageLoading() || (!pageLoading() && displayImageSrc()) } -->                <div class="dxrd-report-preview dxrd-report-preview-multipage" data-bind="styleunit: { \'width\': width(), \'height\': height() }, toView: { active: active }, css : { \'dxrd-report-preview-active\': active }">                    <!-- ko template: \'dxrd-preview-page\'-->                    <!-- /ko -->                </div>                <!-- /ko -->                <!-- /ko -->            </div>            <!-- /ko -->            <!-- ko if: !currentPage() -->            <div class="dxrd-report-preview-placeholder">                <div class="dxd-empty-area-placeholder-text-color dxd-text-info" data-bind="text: emptyDocumentCaption()"></div>            </div>            <!-- /ko -->        </div>    </div>    <div id="clipboard-container" style="position:absolute;top:-100px;"><textarea id="clipboard"></textarea></div>',
            });
        })(Templates = Reporting.Templates || (Reporting.Templates = {}));
    })(Reporting = DevExpress.Reporting || (DevExpress.Reporting = {}));
})(DevExpress || (DevExpress = {}));