/**
* DevExpress HTML/JS Analytics Core (dx-designer.js)
* Version: 18.1.1-pre-18103
* Build date: 2018-04-16
* Copyright (c) 2012 - 2018 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/NetComponents.xml
*/

var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function _defineProperty(legacyObject, realObject, propertyName) {
                delete legacyObject[propertyName];
                Object.defineProperty(legacyObject, propertyName, {
                    get: function () { return realObject[propertyName]; },
                    set: function (newVal) { realObject[propertyName] = newVal; }
                });
            }
            Internal._defineProperty = _defineProperty;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function deserializeArray(model, creator) {
                var result = [];
                getPropertyValues(model).forEach(function (item) {
                    var createdItem = creator(item);
                    result.push(createdItem);
                });
                return ko.observableArray(result);
            }
            Utils.deserializeArray = deserializeArray;
            function toStringWithDelimiter(values, delimiter) {
                return (values || []).map(function (value) {
                    var str = value !== undefined && value !== null ? value.toString() : "00";
                    if (str.length === 1) {
                        str = "0" + str;
                    }
                    return str;
                }).join(delimiter);
            }
            function serializeDate(date) {
                var datePart = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
                var timePart = toStringWithDelimiter([date.getHours(), date.getMinutes(), date.getSeconds()], ":");
                return timePart === "00:00:00" ? toStringWithDelimiter([datePart[2], datePart[0], datePart[1]], "-")
                    : toStringWithDelimiter(datePart, "/") + " " + timePart;
            }
            Utils.serializeDate = serializeDate;
            function knockoutArrayWrapper(items) {
                var onChange = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    onChange[_i - 1] = arguments[_i];
                }
                var array = ko.observableArray(items);
                var notifySubscribers = array.notifySubscribers;
                array.notifySubscribers = function (valueToNotify, event) {
                    if (onChange) {
                        for (var i = 0, len = onChange.length; i < len; i++) {
                            onChange[i](valueToNotify, event);
                        }
                    }
                    return notifySubscribers.call(array, valueToNotify, event);
                };
                return array;
            }
            Utils.knockoutArrayWrapper = knockoutArrayWrapper;
            function isWindow(obj) {
                return obj != null && obj === obj.window;
            }
            var class2type = {};
            var hasOwn = class2type.hasOwnProperty;
            ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"].forEach(function (name) { return class2type["[object " + name + "]"] = name.toLowerCase(); });
            function type(obj) {
                if (obj == null) {
                    return obj + "";
                }
                return typeof obj === "object" || typeof obj === "function" ?
                    class2type[class2type.toString.call(obj)] || "object" :
                    typeof obj;
            }
            function isNumeric(obj) {
                return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
            }
            function isPlainObject(obj) {
                if (type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
                    return false;
                }
                return !(obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf"));
            }
            Utils.isPlainObject = isPlainObject;
            function isEmptyObject(obj) {
                if ((typeof obj) === "string") {
                    return false;
                }
                for (var name in obj) {
                    return false;
                }
                return true;
            }
            Utils.isEmptyObject = isEmptyObject;
            function isFunction(obj) {
                return type(obj) === "function";
            }
            function extend(target, object1) {
                var objectN = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    objectN[_i - 2] = arguments[_i];
                }
                var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
                if (typeof target === "boolean") {
                    deep = target;
                    target = arguments[i] || {};
                    i++;
                }
                if (typeof target !== "object" && !isFunction(target)) {
                    target = {};
                }
                if (i === length) {
                    target = this;
                    i--;
                }
                for (; i < length; i++) {
                    if ((options = arguments[i]) != null) {
                        for (name in options) {
                            src = target[name];
                            copy = options[name];
                            if (target === copy) {
                                continue;
                            }
                            if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && Array.isArray(src) ? src : [];
                                }
                                else {
                                    clone = src && isPlainObject(src) ? src : {};
                                }
                                target[name] = extend(deep, clone, copy);
                            }
                            else if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }
                return target;
            }
            Utils.extend = extend;
            ;
            function getPropertyValues(target) {
                if (target === void 0) { target = {}; }
                var result = [];
                for (var propertyName in target) {
                    result.push(target[propertyName]);
                }
                return result;
            }
            Utils.getPropertyValues = getPropertyValues;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
/// <reference path="serializationInfo.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var ModelSerializer = (function () {
                function ModelSerializer(options) {
                    this._refTable = {};
                    this._linkTable = {};
                    this._options = Utils.extend({
                        useRefs: true,
                        serializeDate: Utils.serializeDate
                    }, options);
                }
                ModelSerializer.prototype.linkObjects = function () {
                    for (var index in this._linkTable) {
                        var val = this._refTable[index];
                        if (val) {
                            var properties = this._linkTable[index];
                            properties.forEach(function (property) { return property(val); });
                        }
                    }
                    ;
                };
                ModelSerializer.prototype.deserializeProperty = function (modelPropertyInfo, model) {
                    var _this = this;
                    var modelValue = modelPropertyInfo.defaultVal, propertyName = modelPropertyInfo.propertyName, propName = modelPropertyInfo.modelName;
                    if (!propName) {
                        return;
                    }
                    if (model[propName] !== undefined) {
                        modelValue = model[propName];
                    }
                    if (typeof modelPropertyInfo === "string") {
                        return ko.observable(modelValue);
                    }
                    else if (modelPropertyInfo.link) {
                        var value = ko.observable(null);
                        if (modelValue) {
                            var refVal = modelValue && modelValue.slice("#Ref-".length);
                            this._linkTable[refVal] = this._linkTable[refVal] || [];
                            this._linkTable[refVal].push(value);
                        }
                        return value;
                    }
                    else if (modelPropertyInfo.array) {
                        if (modelPropertyInfo.from) {
                            return modelPropertyInfo.from(modelValue, this);
                        }
                        else if (modelPropertyInfo.info) {
                            var result = [];
                            Utils.getPropertyValues(modelValue).forEach(function (item) {
                                var object = { getInfo: function () { return modelPropertyInfo.info; } };
                                _this.deserialize(object, item || {});
                                result.push(object);
                            });
                            return ko.observableArray(result);
                        }
                    }
                    else if (modelPropertyInfo.from) {
                        return modelPropertyInfo.from(modelValue, this);
                    }
                    else if (modelPropertyInfo.type) {
                        var ctorResult = new modelPropertyInfo.type(modelValue, this, modelPropertyInfo.info);
                        if (!ctorResult._model) {
                            this.deserialize(ctorResult, modelValue || {}, modelPropertyInfo.info);
                        }
                        return ctorResult;
                    }
                    else if (modelPropertyInfo.info) {
                        var object = { getInfo: function () { return modelPropertyInfo.info; } };
                        this.deserialize(object, modelValue || {});
                        return object;
                    }
                    else if (modelPropertyInfo.modelName) {
                        return ko.observable(modelValue);
                    }
                    else {
                        throw new Error("Invalid info '" + JSON.stringify(modelPropertyInfo) + "'");
                    }
                };
                ModelSerializer.prototype.deserialize = function (viewModel, model, serializationsInfo) {
                    var _this = this;
                    if (serializationsInfo === void 0) { serializationsInfo = null; }
                    if (!model) {
                        return;
                    }
                    viewModel._model = Utils.extend({}, model);
                    var serializationsInfo = viewModel.getInfo ? viewModel.getInfo() : serializationsInfo;
                    var refValue = model["@Ref"];
                    if (refValue) {
                        this._refTable[refValue] = viewModel;
                    }
                    serializationsInfo.forEach(function (modelPropertyInfo) {
                        var propertyName = modelPropertyInfo.propertyName, propName = modelPropertyInfo.modelName;
                        if (model[propName] !== undefined) {
                            delete viewModel._model[propName];
                        }
                        var property = _this.deserializeProperty(modelPropertyInfo, model);
                        if (property !== undefined)
                            viewModel[propertyName] = property;
                    });
                    this.linkObjects();
                };
                ModelSerializer.prototype.serialize = function (viewModel, serializationsInfo, refs) {
                    if (refs === void 0) { refs = null; }
                    if (!serializationsInfo && !refs) {
                        return this._serialize(viewModel, null, null);
                    }
                    return this._serialize(viewModel, serializationsInfo, refs);
                };
                ModelSerializer.prototype._isSerializableValue = function (resultValue) {
                    return (Utils.isPlainObject(resultValue) && !Utils.isEmptyObject(resultValue)) || (Array.isArray(resultValue) && resultValue["length"] > 0) || (!Array.isArray(resultValue) && !Utils.isPlainObject(resultValue));
                };
                ModelSerializer.prototype._serialize = function (viewModel, serializationsInfo, refs) {
                    var _this = this;
                    var result = Utils.extend({}, viewModel._model), isInitial = refs === null;
                    refs = refs || { linkObjTable: [], objects: [] };
                    serializationsInfo = viewModel.getInfo ? viewModel.getInfo() : serializationsInfo;
                    delete result["@Ref"];
                    if (viewModel["isEmpty"] && viewModel["isEmpty"]())
                        return {};
                    serializationsInfo.forEach(function (modelPropertyInfo) {
                        var propertyName = modelPropertyInfo.propertyName, value = ko.unwrap(viewModel["_" + propertyName] || viewModel[propertyName]), defaultVal = modelPropertyInfo.defaultVal;
                        if (!!modelPropertyInfo.from) {
                            defaultVal = ko.unwrap(modelPropertyInfo.from(defaultVal, _this));
                        }
                        var resultValue = {};
                        if (!modelPropertyInfo.modelName) {
                            return;
                        }
                        if (modelPropertyInfo.alwaysSerialize || ((value !== undefined && value !== null) && ((Utils.isPlainObject(value) || !Utils.isEmptyObject(value)) || (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && !Utils.isPlainObject(value))) && (value !== defaultVal))) {
                            if (modelPropertyInfo.link) {
                                refs.linkObjTable.push({
                                    obj: value,
                                    setRef: function (index) {
                                        if (index < 0) {
                                            delete result[modelPropertyInfo.modelName];
                                        }
                                        else {
                                            result[modelPropertyInfo.modelName] = "#Ref-" + index;
                                        }
                                    }
                                });
                                resultValue = undefined;
                            }
                            else if (modelPropertyInfo.array) {
                                resultValue = {};
                                var index = 1;
                                value.forEach(function (item) {
                                    var info = modelPropertyInfo.info || null;
                                    var item_ = _this._serialize(item, info, refs);
                                    if (_this._isSerializableValue(item_)) {
                                        resultValue["Item" + index] = item_;
                                        if (_this._options.useRefs) {
                                            item_["@Ref"] = (refs.objects.push(item) - 1).toString();
                                        }
                                        index++;
                                    }
                                });
                            }
                            else if (modelPropertyInfo.from) {
                                if (value["isEmpty"] && value["isEmpty"]()) {
                                    resultValue = {};
                                }
                                else {
                                    resultValue = modelPropertyInfo.toJsonObject ? modelPropertyInfo.toJsonObject(value, _this, refs) : value.toString();
                                }
                            }
                            else if (modelPropertyInfo.info || value["getInfo"]) {
                                resultValue = _this._serialize(value, modelPropertyInfo.info, refs);
                            }
                            else if (modelPropertyInfo.modelName) {
                                if (value instanceof Date) {
                                    resultValue = _this._options.serializeDate(value);
                                }
                                else {
                                    resultValue = value;
                                }
                            }
                            else {
                                throw new Error("Invalid info '" + serializationsInfo.stringify() + "'");
                            }
                            if (modelPropertyInfo.alwaysSerialize || _this._isSerializableValue(resultValue)) {
                                result[modelPropertyInfo.modelName] = resultValue;
                            }
                        }
                    });
                    if (isInitial) {
                        refs.linkObjTable.forEach(function (item) {
                            var refValue = refs.objects.indexOf(item.obj);
                            item.setRef(refValue);
                        });
                    }
                    return result;
                };
                return ModelSerializer;
            })();
            Utils.ModelSerializer = ModelSerializer;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="serializer.ts" />
/// <reference path="serializationInfo.ts" />
/// <reference path="utils.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            Utils.deserializeArray = DevExpress.Analytics.Utils.deserializeArray;
            var ModelSerializer = (function (_super) {
                __extends(ModelSerializer, _super);
                function ModelSerializer() {
                    _super.apply(this, arguments);
                }
                return ModelSerializer;
            })(DevExpress.Analytics.Utils.ModelSerializer);
            Utils.ModelSerializer = ModelSerializer;
            Utils.serializeDate = DevExpress.Analytics.Utils.serializeDate;
            Utils.extend = DevExpress.Analytics.Utils.extend;
            Utils.isPlainObject = DevExpress.Analytics.Utils.isPlainObject;
            Utils.isEmptyObject = DevExpress.Analytics.Utils.isEmptyObject;
            Utils.getPropertyValues = DevExpress.Analytics.Utils.getPropertyValues;
            Utils.knockoutArrayWrapper = DevExpress.Analytics.Utils.knockoutArrayWrapper;
            ;
            ;
            ;
            ;
            ;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "deserializeArray");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "ModelSerializer");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "serializeDate");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "extend");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "isPlainObject");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "isEmptyObject");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "getPropertyValues");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "knockoutArrayWrapper");
//# sourceMappingURL=dx-ko-serializer.js.map
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Localization;
        (function (Localization) {
            Localization.Globalize = DevExpress.Analytics.Localization.Globalize || window["Globalize"];
            Localization.messages = {};
            function addCultureInfo(json) {
                $.extend(Localization.messages, json.messages);
            }
            Localization.addCultureInfo = addCultureInfo;
            function localize(val) {
                return Localization.messages[val];
            }
            Localization.localize = localize;
            function parseDate(val) {
                if (val) {
                    if (val instanceof Date)
                        return val;
                    var enGlobalize = new Localization.Globalize("en");
                    var date = enGlobalize["parseDate"](val, { raw: "MM/dd/yyyy HH:mm:ss" });
                    if (!date)
                        date = enGlobalize["parseDate"](val, { raw: "yyyy-MM-dd" });
                    return date;
                }
                return null;
            }
            Localization.parseDate = parseDate;
            function selectPlaceholder() {
                return Analytics.getLocalization("Select...", "ASPxReportsStringId.ReportDesigner_PropertyGrid_Editor_EmptyText");
            }
            Localization.selectPlaceholder = selectPlaceholder;
            function noDataText() {
                return Analytics.getLocalization("No data to display", "ASPxReportsStringId.ReportDesigner_DataPreview_Empty");
            }
            Localization.noDataText = noDataText;
        })(Localization = Analytics.Localization || (Analytics.Localization = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        function _getLocalization(text) {
            return (Analytics.Localization.localize(text)) || text;
        }
        var custom_localization_values = {};
        function isCustomizedWithUpdateLocalizationMethod(text) {
            return !!custom_localization_values[text];
        }
        Analytics.isCustomizedWithUpdateLocalizationMethod = isCustomizedWithUpdateLocalizationMethod;
        function getLocalization(text, id) {
            if (id === void 0) { id = null; }
            var result;
            if (id && !isCustomizedWithUpdateLocalizationMethod(text)) {
                result = Analytics.Localization.localize(id);
            }
            return result || _getLocalization(text);
        }
        Analytics.getLocalization = getLocalization;
        function getSpecificLocalizationWithAddition(text, defaultText, addition, id) {
            if (addition === void 0) { addition = ""; }
            if (id === void 0) { id = null; }
            return isCustomizedWithUpdateLocalizationMethod(text) ? getLocalization(text) : (getLocalization(defaultText, id) + addition);
        }
        Analytics.getSpecificLocalizationWithAddition = getSpecificLocalizationWithAddition;
        function updateLocalization(object) {
            $.extend(custom_localization_values, object);
            var messages = {};
            for (var name in object) {
                messages[name] = object[name];
            }
            Analytics.Localization.addCultureInfo({
                messages: messages
            });
        }
        Analytics.updateLocalization = updateLocalization;
        ;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            DevExpress.Analytics.Utils.getLocalization = Analytics.getLocalization;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        Analytics.StringId = {
            MasterDetailRelationsEditor: "DataAccessUIStringId.MasterDetailEditorForm_Title",
            DataAccessBtnOK: "DataAccessUIStringId.Button_OK",
            DataAccessBtnCancel: "DataAccessUIStringId.Button_Cancel",
            DataSourceWizardTitle: "DataAccessUIStringId.WizardTitleDatasource",
            WizardPageConfigureQuery: 'DataAccessUIStringId.WizardPageConfigureQuery'
        };
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function compareEditorInfo(editor1, editor2) {
                return !!editor1 && !!editor2 &&
                    editor1.header === editor2.header
                    && editor1.content === editor2.content
                    && editor1.editorType === editor2.editorType;
            }
            Utils.compareEditorInfo = compareEditorInfo;
            function getLocalization(value) {
                return Analytics.Localization && Analytics.Localization.localize(value) || value;
            }
            Utils.getLocalization = getLocalization;
            function findMatchesInString(textToTest, searchPattern) {
                var searchExpr = escapeToRegExp(searchPattern);
                return !!textToTest && textToTest.match(new RegExp(searchExpr, "gi"));
            }
            Utils.findMatchesInString = findMatchesInString;
            function escapeToRegExp(string) {
                return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            }
            Utils.escapeToRegExp = escapeToRegExp;
            function formatUnicorn(text) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var str = text.toString();
                if (args.length) {
                    var t = typeof args[0];
                    var key;
                    var argsFinal = ("string" === t || "number" === t) ?
                        Array.prototype.slice.call(args)
                        : args[0];
                    for (key in argsFinal) {
                        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), argsFinal[key]);
                    }
                }
                return str;
            }
            Utils.formatUnicorn = formatUnicorn;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.editorTemplates = {
                color: { header: "dx-color" },
                bool: { header: "dx-boolean" },
                boolSelect: { header: "dx-boolean-select" },
                numeric: { header: "dx-numeric" },
                date: { header: "dx-date" },
                modificators: { custom: "dx-modificators" },
                combobox: { header: "dx-combobox" },
                comboboxEditable: { header: "dx-combobox-editable" },
                text: { header: "dx-text" },
                image: { header: "dx-image" },
                file: { header: "dx-file" },
                commonCollection: { custom: "dx-commonCollection" },
                stringArray: { header: "dx-emptyHeader", content: "dx-string-array" }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="editorsInfo.ts" />
/// <reference path="../utils.ts" />
///<reference path="../Localization/localization.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.propertiesGridEditorsPaddingLeft = 19;
            var Editor = (function () {
                function Editor(modelPropertyInfo, level, parentDisabled, textToSearch) {
                    var _this = this;
                    if (parentDisabled === void 0) { parentDisabled = ko.observable(false); }
                    if (textToSearch === void 0) { textToSearch = undefined; }
                    this._model = ko.observable();
                    this.isVisibleByContent = ko.observable(true);
                    this.isSearchedProperty = ko.observable(true);
                    this.isParentSearched = ko.observable(false);
                    this.rtl = DevExpress["config"]()["rtlEnabled"];
                    this.isEditorSelected = ko.observable(false);
                    this.isPropertyModified = ko.computed(function () {
                        return _this._model() && _this._model().isPropertyModified && _this._model().isPropertyModified(_this.name);
                    });
                    this.collapsed = ko.observable(true);
                    this.info = ko.observable(modelPropertyInfo);
                    this.displayName = ko.computed(function () {
                        var info = _this.info();
                        return info && DevExpress.Analytics.getLocalization(info.displayName, info["localizationId"]);
                    });
                    if (textToSearch) {
                        this.textToSearch = textToSearch;
                        this.isSearchedProperty = ko.computed(function () {
                            return _this.isParentSearched() || !!Analytics.Utils.findMatchesInString(_this.displayName(), textToSearch());
                        });
                    }
                    this.padding = this._setPadding(this.rtl ? "right" : "left", level * Widgets.propertiesGridEditorsPaddingLeft);
                    var defaultValue = ko.observable(null), propertyName = modelPropertyInfo.propertyName;
                    this.editorOptions = modelPropertyInfo.editorOptions;
                    if (modelPropertyInfo.defaultVal !== undefined) {
                        defaultValue = ko.observable(modelPropertyInfo.defaultVal);
                    }
                    if (modelPropertyInfo.from) {
                        defaultValue = modelPropertyInfo.from(modelPropertyInfo.defaultVal);
                    }
                    if (modelPropertyInfo.array) {
                        defaultValue = ko.observableArray();
                    }
                    this.values = ko.computed(function () {
                        var _values = _this.info().valueStore || _this.info().valuesArray;
                        if (_values) {
                            return _values;
                        }
                        _values = ko.unwrap(_this.info().values);
                        if (_values) {
                            return $.map(_values, function (displayValue, value) {
                                return { value: value, displayValue: displayValue };
                            });
                        }
                    });
                    this.level = level;
                    this._init(modelPropertyInfo.editor, defaultValue, propertyName);
                    var calculateAccessibleByPropertyInfo = function (model, propertyInfo, defaultValue) {
                        var result;
                        if (ko.isObservable(propertyInfo)) {
                            result = propertyInfo();
                        }
                        else if (typeof propertyInfo === 'function') {
                            result = propertyInfo(model);
                        }
                        else {
                            result = propertyInfo !== undefined ? propertyInfo : defaultValue;
                        }
                        return result;
                    };
                    this.disabled = ko.computed(function () {
                        var model = _this._model(), result = parentDisabled() || model && (model.isPropertyDisabled && model.isPropertyDisabled(_this.name));
                        if (!result) {
                            result = calculateAccessibleByPropertyInfo(model, _this.info().disabled, false);
                        }
                        return result;
                    });
                    this.visible = ko.computed(function () {
                        var model = _this._model(), result = _this.isSearchedProperty() && ((model && model.isPropertyVisible) ? model.isPropertyVisible(_this.name) : _this.isVisibleByContent());
                        if (result) {
                            result = calculateAccessibleByPropertyInfo(model, _this.info().visible, true);
                        }
                        return result;
                    });
                }
                Editor.prototype._setPadding = function (position, value) {
                    var obj = {};
                    obj["padding-" + position] = value;
                    return obj;
                };
                Editor.prototype._init = function (editorTemplate, value, name) {
                    var _this = this;
                    editorTemplate = editorTemplate || Widgets.editorTemplates.text;
                    this.templateName = editorTemplate.header;
                    this.contentTemplateName = editorTemplate.content;
                    this.defaultValue = editorTemplate === Widgets.editorTemplates.color ? "transparent" : null;
                    var cachedValue = undefined;
                    this.value = ko.computed({
                        read: function () {
                            var model = _this._model();
                            if (!model && cachedValue) {
                                return cachedValue;
                            }
                            var modelValue = model && model[name] !== undefined ? model[name] : value;
                            if (ko.isObservable(modelValue) && !modelValue["push"]) {
                                var hasValueInModel = modelValue() !== undefined && modelValue() !== null;
                                cachedValue = hasValueInModel ? modelValue() : _this.defaultValue;
                                return cachedValue;
                            }
                            else {
                                cachedValue = modelValue;
                                return cachedValue;
                            }
                        },
                        write: function (val) {
                            var model = _this._model();
                            if (!model) {
                                return;
                            }
                            var modelValue = model[name];
                            if (!DevExpress["validationEngine"].validate(val, _this.validationRules, _this.displayName()).isValid) {
                                return;
                            }
                            if (ko.isObservable(modelValue)) {
                                modelValue(val);
                            }
                            else {
                                model[name] = val;
                            }
                        }
                    });
                    this.name = name;
                    this.editorTemplate = editorTemplate && editorTemplate.custom || 'dx-property-editor';
                };
                Editor.prototype.findInfo = function (viewModel) {
                    var _this = this;
                    if (!viewModel)
                        return null;
                    var modelInfo = viewModel["getInfo"] && viewModel["getInfo"]();
                    if (modelInfo) {
                        return modelInfo.filter(function (property) { return property.propertyName === _this.name; })[0];
                    }
                    return null;
                };
                Editor.prototype.updateInfo = function (propertyInfo) {
                    if (propertyInfo && Analytics.Utils.compareEditorInfo(propertyInfo.editor, this.info().editor)) {
                        if (this.info() !== propertyInfo) {
                            this.info(propertyInfo);
                        }
                        return true;
                    }
                    return !propertyInfo;
                };
                Editor.prototype.update = function (viewModel) {
                    if (!!viewModel) {
                        var propertyInfo = this.findInfo(viewModel);
                        this.isVisibleByContent(this.name in viewModel && this.updateInfo(propertyInfo));
                        this._model(this.isVisibleByContent() ? viewModel : null);
                    }
                    else {
                        this.isVisibleByContent(false);
                        this._model(null);
                    }
                };
                Editor.prototype.getOptions = function (templateOptions) {
                    var extendedOptions = this.info.peek().editor.extendedOptions;
                    return $.extend({}, templateOptions, this.editorOptions, extendedOptions);
                };
                Editor.prototype.getValidationRules = function () {
                    return !!this.info && !!this.info() && this.info().validationRules || [];
                };
                Object.defineProperty(Editor.prototype, "validationRules", {
                    get: function () {
                        return this.getValidationRules();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Editor.prototype, "isComplexEditor", {
                    get: function () { return !!this.contentTemplateName; },
                    enumerable: true,
                    configurable: true
                });
                return Editor;
            })();
            Widgets.Editor = Editor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
/// <reference path="widgets/editor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var ObjectProperties = (function () {
                function ObjectProperties(target, editorsInfo, level, parentDisabled, recreateEditors, textToSearch) {
                    var _this = this;
                    if (level === void 0) { level = 0; }
                    if (parentDisabled === void 0) { parentDisabled = ko.observable(false); }
                    if (recreateEditors === void 0) { recreateEditors = false; }
                    this._targetSubscription = null;
                    this._infoSubscription = null;
                    this._getInfoComputed = null;
                    this.level = 0;
                    this.rtl = DevExpress['config']()['rtlEnabled'];
                    this._editors = ko.observableArray([]);
                    this.level = level;
                    this._parentDisabled = parentDisabled;
                    this._textToSearch = textToSearch;
                    this.visible = ko.computed(function () {
                        return _this._editors().some(function (editor) { return editor.visible(); });
                    });
                    this._targetSubscription = target.subscribe(function (newVal) {
                        _this._infoSubscription && _this._infoSubscription.dispose();
                        _this._getInfoComputed && _this._getInfoComputed.dispose();
                        _this._update(newVal, editorsInfo, recreateEditors);
                    });
                    this._update(target(), editorsInfo, recreateEditors);
                }
                ObjectProperties.prototype.update = function (viewModel) {
                    if (viewModel) {
                        this._editors().forEach(function (editor) {
                            editor.update(viewModel);
                        });
                    }
                };
                ObjectProperties.prototype._cleanEditorsSubscriptions = function () {
                    this._editors().forEach(function (editor) {
                        for (var name in editor) {
                            if (ko.isComputed(editor[name])) {
                                editor[name].dispose();
                            }
                        }
                    });
                };
                ObjectProperties.prototype.cleanSubscriptions = function () {
                    this._infoSubscription && this._infoSubscription.dispose();
                    this._getInfoComputed && this._getInfoComputed.dispose();
                    this._targetSubscription && this._targetSubscription.dispose();
                    this._cleanEditorsSubscriptions();
                };
                ObjectProperties.prototype.cleanEditors = function () {
                    this._cleanEditorsSubscriptions();
                    this._editors([]);
                };
                ObjectProperties.prototype.findEditorByInfo = function (serializationInfo) {
                    return this._editors().filter(function (editor) { return editor.name === serializationInfo.propertyName && Analytics.Utils.compareEditorInfo(editor.info().editor, serializationInfo.editor); })[0];
                };
                ObjectProperties.prototype.createEditor = function (modelPropertyInfo) {
                    var editorType = modelPropertyInfo.editor && modelPropertyInfo.editor.editorType || Widgets.Editor;
                    return new editorType(modelPropertyInfo, this.level, this._parentDisabled, this._textToSearch);
                };
                ObjectProperties.prototype.createEditors = function (serializationInfo) {
                    var _this = this;
                    var self = this;
                    return (serializationInfo || [])
                        .filter(function (info) { return !!info.editor && !_this.findEditorByInfo(info); })
                        .map(function (info) { return _this.createEditor(info); });
                };
                ObjectProperties.prototype._createEditors = function (serializationInfo) {
                    var _this = this;
                    if (!serializationInfo || serializationInfo.length === 0)
                        return false;
                    this.createEditors(serializationInfo).forEach(function (editor) { return _this._editors.push(editor); });
                    var propertyNames = serializationInfo.map(function (info) { return info.propertyName; });
                    this._editors.sort(function (a, b) {
                        return propertyNames.indexOf(a.name) - propertyNames.indexOf(b.name);
                    });
                };
                ObjectProperties.prototype._update = function (target, editorsInfo, recreateEditors) {
                    var _this = this;
                    if (recreateEditors)
                        this._editors([]);
                    var infoSubscription = null;
                    this._getInfoComputed = ko.computed(function () {
                        return (editorsInfo && editorsInfo.editors && ko.unwrap(editorsInfo.editors))
                            || (target && target["getInfo"] && target["getInfo"]());
                    });
                    this._infoSubscription = this._getInfoComputed.subscribe(function (newInfo) {
                        if (recreateEditors)
                            _this._editors([]);
                        _this._createEditors(newInfo);
                        _this.update(target);
                    });
                    this._createEditors(this._getInfoComputed());
                    this.update(target);
                };
                ObjectProperties.prototype.getEditors = function () {
                    return this._editors();
                };
                return ObjectProperties;
            })();
            Widgets.ObjectProperties = ObjectProperties;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var CodeResolver = (function () {
                function CodeResolver() {
                    this._queue = [];
                    this._done = [];
                }
                CodeResolver.prototype.done = function (callback) {
                    this._done.push(callback);
                };
                CodeResolver.prototype.execute = function (func, time) {
                    if (time === void 0) { time = 0; }
                    var deferred = $.Deferred();
                    if (time) {
                        var self = this;
                        this._queue.push(function () {
                            setTimeout(function () {
                                deferred.resolve(func());
                                self._queue.splice(0, 1);
                                if (self._queue.length !== 0) {
                                    self._queue[0]();
                                }
                                else {
                                    for (var i = 0; i < self._done.length; i++) {
                                        self._done[i]();
                                    }
                                }
                            }, time);
                        });
                        if (this._queue.length === 1) {
                            this._queue[0]();
                        }
                    }
                    else {
                        deferred.resolve(func());
                    }
                    return deferred.promise();
                };
                return CodeResolver;
            })();
            Internal.CodeResolver = CodeResolver;
            Internal.globalResolver = new CodeResolver();
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
/// <reference path="propertygrid.ts" />
/// <reference path="Localization/localization.ts" />
/// <reference path="internal/codeResolver.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['dxPropertyGrid'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(element).children().remove();
                    var templateHtml = $('#dx-propertieseditor').text(), $element = $(element).append(templateHtml);
                    var value = valueAccessor();
                    var model = new Widgets.ObjectProperties(value.target, value.editorsInfo, value.level, value.parentDisabled, value.recreateEditors, value.textToSearch);
                    ko.applyBindings(bindingContext.createChildContext(model), $element.children()[0]);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        model.cleanSubscriptions();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            ko.virtualElements.allowedBindings["lazy"] = true;
            ko.bindingHandlers['lazy'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var resolver = Analytics.Internal.globalResolver;
                    var parsedBindings = valueAccessor();
                    if (parsedBindings.innerBindings) {
                        resolver = parsedBindings.resolver;
                        parsedBindings = parsedBindings.innerBindings;
                    }
                    var isDisposed = false;
                    $.each(parsedBindings, function (innerBindingKey, innerBindingParameters) {
                        var innerBinding = ko.bindingHandlers[innerBindingKey];
                        resolver.execute(function () {
                            if (!isDisposed) {
                                var isInitialized = false;
                                ko.computed({
                                    read: function () {
                                        if (!isInitialized && innerBinding.init) {
                                            innerBinding.init(element, function () { return innerBindingParameters; }, allBindings, viewModel, bindingContext);
                                            isInitialized = true;
                                        }
                                        if (innerBinding.update) {
                                            innerBinding.update(element, function () { return innerBindingParameters; }, allBindings, viewModel, bindingContext);
                                        }
                                    },
                                    disposeWhenNodeIsRemoved: element
                                });
                            }
                        }, 1);
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        isDisposed = true;
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            ko.bindingHandlers["dxdAccordion"] = {
                init: function (element, valueAccessor) {
                    var options = valueAccessor(), $element = $(element), $accordionContent = $element.find(".dx-accordion-content").first(), scrollUpdateCallback = function () {
                        var scrollView = $element.parents(".dx-scrollview").dxScrollView("instance");
                        scrollView && scrollView["update"]();
                    };
                    $element
                        .find(".dx-accordion-header,.dx-accordion-button").first()
                        .off("dxclick")
                        .on("dxclick", function () {
                        options.collapsed(options.alwaysShow && options.alwaysShow() ? false : !options.collapsed());
                    });
                    options.collapsed() ? $accordionContent.hide() : $accordionContent.show();
                    var subscription = options.collapsed.subscribe(function (newVal) {
                        $accordionContent.slideToggle(options.timeout, function () { return scrollUpdateCallback(); });
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () { return subscription.dispose(); });
                }
            };
            ko.bindingHandlers["dxdAccordionExt"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = valueAccessor(), $element = $(element), scrollUpdateCallback = function () {
                        var scrollView = $element.parents(".dx-scrollview").dxScrollView("instance");
                        scrollView && scrollView["update"]();
                    }, $accordionContent = $element.find(".dx-accordion-content").first(), accordionContentHTML = null;
                    if (options.collapsed() && options.lazyContentRendering === true) {
                        accordionContentHTML = $accordionContent.html();
                        $accordionContent.empty();
                    }
                    options.collapsed.subscribe(function (newVal) {
                        if (newVal) {
                            $accordionContent.slideUp(options.timeout, function () {
                                scrollUpdateCallback();
                            });
                        }
                        else {
                            if (accordionContentHTML) {
                                $accordionContent.html(accordionContentHTML);
                                ko.applyBindingsToDescendants(bindingContext, $accordionContent.get(0));
                                accordionContentHTML = null;
                            }
                            $accordionContent.slideDown(options.timeout, function () {
                                scrollUpdateCallback();
                            });
                        }
                    });
                    options.collapsed() ? $accordionContent.hide() : $accordionContent.show();
                }
            };
            ko.bindingHandlers["dxLocalizedSelectBox"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var options = valueAccessor();
                    var prevDisplayExpr = options.displayExpr;
                    options["placeholder"] = options["placeholder"] || Analytics.Localization.selectPlaceholder();
                    options["noDataText"] = options["noDataText"] || Analytics.Localization.noDataText();
                    options.displayExpr = function (value) {
                        if (!value)
                            return value;
                        if (!prevDisplayExpr)
                            return Analytics.getLocalization(value, value.localizationId);
                        return Analytics.getLocalization($.isFunction(prevDisplayExpr) ? prevDisplayExpr(value) : value[prevDisplayExpr], value.localizationId);
                    };
                    var extendedOptions = viewModel.getOptions ? viewModel.getOptions(options) : options;
                    ko.bindingHandlers["dxSelectBox"].init(element, function () { return extendedOptions; }, allBindings, viewModel, bindingContext);
                    return { controlsDescendantBindings: true };
                }
            };
            ko.bindingHandlers["styleunit"] = {
                'update': function (element, valueAccessor) {
                    var value = ko.utils.unwrapObservable(valueAccessor() || {});
                    $.each(value, function (styleName, styleValue) {
                        styleValue = ko.utils.unwrapObservable(styleValue) || 0;
                        element.style[styleName] = styleValue + "px";
                    });
                }
            };
            ko.bindingHandlers["service"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = ko.unwrap(valueAccessor() || {}), findService = function (serviceName) {
                        var context = bindingContext.$parents.filter(function (item) { return item[serviceName] !== undefined; })[0];
                        if (context) {
                            return context[serviceName];
                        }
                        return null;
                    }, service = findService(value.name);
                    if (service) {
                        var entity = service(viewModel);
                        var childContext = bindingContext.createChildContext(entity.data);
                        ko.renderTemplate(entity.templateName, childContext, {}, element, 'replaceNode');
                    }
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var PopupService = (function () {
                function PopupService() {
                    this.data = ko.observable();
                    this.title = ko.observable();
                    this.visible = ko.observable(false);
                    this.actions = ko.observableArray([]);
                    this.target = ko.observable();
                }
                return PopupService;
            })();
            Internal.PopupService = PopupService;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../widgets/editor.ts" />
/// <reference path="../utils.ts" />
/// <reference path="popupService.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var EditorAddOn = (function () {
                function EditorAddOn(editor, popupService) {
                    var _this = this;
                    this.showPopup = function (args) {
                        _this._popupService.title(_this._editor.displayName());
                        _this._updateActions(_this._editor._model());
                        _this._popupService.target(args.element);
                        _this._popupService.visible(true);
                    };
                    this.templateName = "dx-editor-addons";
                    this._editor = editor;
                    this._popupService = popupService;
                    this.visible = ko["pureComputed"](function () {
                        if (editor.disabled()) {
                            return false;
                        }
                        var actions = editor._model() && editor._model().actions;
                        return actions && actions.length > 0 && actions.some(function (x) { return x.visible(editor.name); });
                    });
                    this.editorMenuButtonCss = ko["pureComputed"](function () {
                        return editor._model() && editor._model()["getActionClassName"] && editor._model()["getActionClassName"](editor.name) || "";
                    });
                }
                EditorAddOn.prototype._updateActions = function (viewModel) {
                    var _this = this;
                    this._popupService.actions([]);
                    if (viewModel.actions) {
                        viewModel.actions.forEach(function (modelAction) {
                            if (modelAction.visible(_this._editor.name)) {
                                _this._popupService.actions.push({
                                    action: function () {
                                        modelAction.action(_this._editor.name);
                                        _this._popupService.visible(false);
                                    },
                                    title: modelAction.title,
                                    visible: function () { return true; }
                                });
                            }
                        });
                    }
                };
                return EditorAddOn;
            })();
            Internal.EditorAddOn = EditorAddOn;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="editor.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            function validateGuid(guid) {
                return guid && (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guid)
                    || /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/.test(guid)
                    || /^\([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\)$/.test(guid)
                    || /^[0-9a-fA-F]{32}$/.test(guid));
            }
            Widgets.validateGuid = validateGuid;
            Widgets.guidValidationRules = [{ type: "custom", validationCallback: function (options) { return validateGuid(options.value); }, message: DevExpress.Analytics.getLocalization('Guid is required and should have a valid format.', 'ASPxReportsStringId.ReportDesigner_GuidIsRequired_Error') }];
            var GuidEditor = (function (_super) {
                __extends(GuidEditor, _super);
                function GuidEditor() {
                    _super.apply(this, arguments);
                }
                GuidEditor.prototype.getValidationRules = function () {
                    return (_super.prototype.getValidationRules.call(this) || []).concat(Widgets.guidValidationRules);
                };
                return GuidEditor;
            })(Widgets.Editor);
            Widgets.GuidEditor = GuidEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="editor.ts" />
/// <reference path="editorsInfo.ts" />
/// <reference path="../propertygrid.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var PropertyGridEditor = (function (_super) {
                __extends(PropertyGridEditor, _super);
                function PropertyGridEditor(info, level, parentDisabled, textToSearch) {
                    var _this = this;
                    _super.call(this, info, level, parentDisabled, textToSearch);
                    this.editorCreated = ko.observable(false);
                    this.viewmodel = this.createObjectProperties();
                    var subscription = this.collapsed.subscribe(function (newVal) {
                        if (!newVal) {
                            subscription.dispose();
                            _this.editorCreated(true);
                        }
                    });
                    if (textToSearch) {
                        this.visibleByName = ko.computed(function () {
                            var visible = !!Analytics.Utils.findMatchesInString(_this.displayName(), textToSearch());
                            if (!$.isEmptyObject(_this.viewmodel)) {
                                _this.viewmodel._editors().forEach(function (editor) { return editor.isParentSearched(visible); });
                            }
                            return visible;
                        });
                        this.isSearchedProperty["dispose"] && this.isSearchedProperty["dispose"]();
                        this.isSearchedProperty = ko.computed(function () {
                            if (_this.visibleByName())
                                return true;
                            var visibleByEditors = _this.viewmodel.visible();
                            visibleByEditors && _this.collapsed(false);
                            return visibleByEditors;
                        });
                    }
                }
                PropertyGridEditor.prototype.createObjectProperties = function () {
                    var _this = this;
                    return new Widgets.ObjectProperties(this.value, { editors: ko.computed(function () { return _this.info().info; }) }, this.level + 1, this.disabled, undefined, this.textToSearch);
                };
                return PropertyGridEditor;
            })(Widgets.Editor);
            Widgets.PropertyGridEditor = PropertyGridEditor;
            Widgets.editorTemplates["objecteditor"] = { header: "dx-emptyHeader", content: "dx-objectEditorContent", editorType: PropertyGridEditor };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../../utils.ts" />
///<reference path="../../Localization/localization.ts" />
///<reference path="../editor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var CollectionItemWrapper = (function () {
                function CollectionItemWrapper(editor, array, index, displayNameField) {
                    var _this = this;
                    if (displayNameField === void 0) { displayNameField = ""; }
                    this.collapsed = ko.observable(true);
                    this.selected = ko.observable(false);
                    this.value = ko.computed({
                        read: function () {
                            return array.peek()[index()];
                        },
                        write: function (val) {
                            array.peek()[index()] = val;
                        }
                    });
                    this.editor = editor;
                    this.index = index;
                    this.name = ko.computed(function () {
                        return displayNameField && _this.value() && _this.value()[displayNameField] ? ko.unwrap(_this.value()[displayNameField]) : index();
                    });
                }
                return CollectionItemWrapper;
            })();
            Widgets.CollectionItemWrapper = CollectionItemWrapper;
            var CollectionEditorViewModel = (function () {
                function CollectionEditorViewModel(options, disabled) {
                    var _this = this;
                    if (disabled === void 0) { disabled = ko.observable(false); }
                    this.buttonMap = {
                        "delete": { text: 'Delete', localizationId: 'ReportStringId.Cmd_Delete' },
                        "add": { text: 'Add', localizationId: 'ChartStringId.MenuItemAdd' },
                        "down": { text: 'Move Down', localizationId: 'ReportStringId.Cmd_BandMoveDown' },
                        "up": { text: 'Move Up', localizationId: 'ReportStringId.Cmd_BandMoveUp' }
                    };
                    this.selectedIndex = ko.observable(null);
                    this.alwaysShow = ko.observable(false);
                    this.collapsed = ko.observable(options.collapsed !== false);
                    var addHandler = options.addHandler || options.info && options.info() && options.info()["addHandler"];
                    var hideButtons = options.hideButtons || options.info && options.info() && options.info()["hideButtons"];
                    this.displayPropertyName = options.info && options.info() && options.info()["displayPropertyName"] || options.displayName;
                    this.showButtons = ko.computed(function () {
                        return !ko.unwrap(hideButtons) && !_this.collapsed();
                    });
                    var _isDisabled = function (selectedIndex, name) {
                        if (options.isDisabledButton) {
                            return options.isDisabledButton(selectedIndex, name);
                        }
                        else if (name === "delete") {
                            return selectedIndex === null;
                        }
                        else if (name === "add") {
                            return false;
                        }
                        else if (name === "up") {
                            return selectedIndex === null || selectedIndex === 0;
                        }
                        else if (name === "down") {
                            return selectedIndex === null || selectedIndex === (_this.values().length - 1);
                        }
                    };
                    this.isDisabledButton = function (name) {
                        return disabled() || _isDisabled(_this.selectedIndex(), name);
                    };
                    this.isVisibleButton = function (name) {
                        if (!_this.showButtons()) {
                            return false;
                        }
                        else
                            return options.isVisibleButton ? options.isVisibleButton(_this.selectedIndex(), name) : true;
                    };
                    this.padding = options.level !== void 0 ? options.level * Widgets.propertiesGridEditorsPaddingLeft : 0;
                    this.displayName = (options.info && options.info()) ? DevExpress.Analytics.getLocalization(options.info().displayName, options.info().localizationId) : options.displayName;
                    this.options = options;
                    if (!options.displayName) {
                        this.collapsed(false);
                        this.alwaysShow(true);
                    }
                    this.values = ko.computed(function () {
                        return ko.unwrap(options.values());
                    });
                    this.add = function (model) {
                        options.undoEngine && options.undoEngine().start();
                        options.values().push(addHandler());
                        options.undoEngine && options.undoEngine().end();
                        model.event.stopPropagation();
                    };
                    this.up = function (model) {
                        _this._move(options.values(), -1);
                        model.event.stopPropagation();
                    };
                    this.down = function (model) {
                        _this._move(options.values(), 1);
                        model.event.stopPropagation();
                    };
                    this.remove = function (model) {
                        if (_this.selectedIndex() >= 0) {
                            options.values().splice(_this.selectedIndex(), 1);
                            _this.selectedIndex(null);
                        }
                        model.event.stopPropagation();
                    };
                    this.select = function (event) {
                        _this.selectedIndex(event.model.index());
                    };
                    this.disabled = disabled;
                }
                CollectionEditorViewModel.prototype._move = function (array, offset) {
                    if (this.selectedIndex() >= 0) {
                        var old_index = this.selectedIndex(), new_index = old_index + offset;
                        if ((new_index >= array().length) || (new_index < 0)) {
                            return;
                        }
                        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
                        this.selectedIndex(new_index);
                    }
                };
                CollectionEditorViewModel.prototype.getDisplayTextButton = function (key) {
                    return DevExpress.Analytics.getLocalization(this.buttonMap[key].text, this.buttonMap[key].localizationId);
                };
                CollectionEditorViewModel.prototype.getDisplayTextEmptyArray = function () {
                    return DevExpress.Analytics.getLocalization('To create an item click the Add button.', 'ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageConfigureParametersEmpty');
                };
                CollectionEditorViewModel.prototype.createCollectionItemWrapper = function (grandfather, index) {
                    return new CollectionItemWrapper(grandfather, this.values, index, this.displayPropertyName);
                };
                return CollectionEditorViewModel;
            })();
            Widgets.CollectionEditorViewModel = CollectionEditorViewModel;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="editor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['dxCollectionEditor'] = {
                init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var values = valueAccessor(), gridViewModel = new Widgets.CollectionEditorViewModel(values, viewModel.disabled), templateHtml = $(values.editorTemplate || '#dx-collectioneditor').text(), $templateHtml = $(templateHtml), itemTemplateName = values.info && values.info() && values.info()["template"] || values.template;
                    if (itemTemplateName) {
                        var itemTemplateHtml = $(itemTemplateName).text();
                        $templateHtml.find(".dx-collection-item").append($(itemTemplateHtml));
                    }
                    else {
                        $templateHtml.find(".dx-collection-item").append($(element).children());
                    }
                    var $element = $(element).append($templateHtml);
                    var childContext = bindingContext.createChildContext(gridViewModel);
                    ko.applyBindings(childContext, $element.children()[0]);
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../../utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var editor_prefix = "dx-ellipsiseditor", EDITOR_CLASS = editor_prefix + " dx-dropdowneditor", EDITOR_BUTTON_CLASS = editor_prefix + "-button dx-widget dx-button-normal dx-dropdowneditor-button dx-ellipsis-button", EDITOR_BUTTON_ICON = editor_prefix + "-icon dx-ellipsis-image dx-dropdowneditor-icon";
            var dxEllipsisEditor = (function (_super) {
                __extends(dxEllipsisEditor, _super);
                function dxEllipsisEditor(element, options) {
                    _super.call(this, element, options);
                }
                dxEllipsisEditor.prototype._init = function () {
                    _super.prototype._init.call(this);
                    this.element().addClass(EDITOR_CLASS);
                };
                dxEllipsisEditor.prototype._render = function () {
                    _super.prototype._render.call(this);
                    this._renderButton();
                };
                dxEllipsisEditor.prototype._renderButton = function () {
                    this._button = $("<div />").addClass(EDITOR_BUTTON_CLASS);
                    this._attachButtonEvents();
                    this._buttonIcon = $("<div />").addClass(EDITOR_BUTTON_ICON).height("100%").appendTo(this._button);
                    var buttonsContainer = _super.prototype._buttonsContainer.call(this);
                    this._button.prependTo(buttonsContainer);
                };
                dxEllipsisEditor.prototype._updateButtonSize = function () {
                    this._buttonIcon.height(this.element().height());
                };
                dxEllipsisEditor.prototype._attachButtonEvents = function () {
                    var _this = this;
                    this._button.off("click");
                    if (!this.option("disabled")) {
                        this._button.on("click", function (e) {
                            if (_this.option("buttonAction")) {
                                _this.option("buttonAction")();
                                e.stopPropagation();
                            }
                        });
                    }
                };
                dxEllipsisEditor.prototype._optionChanged = function (obj, value) {
                    var name = obj.name || obj;
                    switch (name) {
                        case "disabled":
                            this._attachButtonEvents();
                            break;
                    }
                    _super.prototype._optionChanged.apply(this, arguments);
                };
                return dxEllipsisEditor;
            })(DevExpress.ui.dxTextBox);
            Widgets.dxEllipsisEditor = dxEllipsisEditor;
            DevExpress.registerComponent("dxEllipsisEditor", dxEllipsisEditor);
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../ellipsiseditor/editor.ts" />
///<reference path="../../Localization/localization.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var editor_prefix = "dx-fileimage", EDITOR_INPUT_WRAPPER_CLASS = editor_prefix + "-input-wrapper";
            var dxFileImagePicker = (function (_super) {
                __extends(dxFileImagePicker, _super);
                function dxFileImagePicker(element, options) {
                    options.placeholder = options.placeholder || DevExpress.Analytics.getLocalization("(none)", "ChartStringId.WizNoBackImage");
                    _super.call(this, element, options);
                }
                dxFileImagePicker.prototype._handleFiles = function (filesHolder) {
                    var _this = this;
                    var files = filesHolder.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (this.option("type") === "img") {
                            var imageType = /image.*/;
                            if (!file.type.match(imageType)) {
                                continue;
                            }
                        }
                        var fr = new FileReader();
                        if (this.option("readMode") !== "text") {
                            fr.onload = function (args) {
                                var encodedContent = fr.result.replace(/^data:[^,]+,/, '');
                                _this.option("value", encodedContent);
                                _this._filesinput.val("");
                            };
                            fr.readAsDataURL(file);
                        }
                        else {
                            fr.onload = function (args) {
                                _this.option("value", fr.result);
                                _this._filesinput.val("");
                            };
                            fr.readAsText(file);
                        }
                    }
                };
                dxFileImagePicker.prototype._$getInput = function () {
                    var accept = this.option('accept') ? "accept = '" + this.option('accept') + "'" : "";
                    return $("<input type='file' " + accept + " style='display:none' />");
                };
                dxFileImagePicker.prototype._render = function () {
                    _super.prototype._render.call(this);
                    var _this = this;
                    this._filesinput = this._$getInput().on("change", function (e) {
                        _this._handleFiles(_this._filesinput.get(0));
                    }).appendTo(this.element());
                };
                dxFileImagePicker.prototype._renderInput = function (inputContainer) {
                    this._inputContainer = inputContainer || $("<div />");
                    this._inputContainer.addClass(EDITOR_INPUT_WRAPPER_CLASS);
                    this.element().append(this["_inputContainer"]);
                    _super.prototype._renderInput.call(this, inputContainer);
                };
                dxFileImagePicker.prototype._attachButtonEvents = function () {
                    var _this = this;
                    this._button.off("click");
                    if (!this.option("disabled")) {
                        this._button.on("click", function (e) {
                            if (!_this.option("value")) {
                                _this._filesinput.val("");
                            }
                            _this._filesinput.click();
                        });
                    }
                };
                dxFileImagePicker.prototype._renderValue = function () {
                    if (this.option("placeHolder")) {
                        this.option("text", this.option("value") && this.option("placeHolder"));
                    }
                    else {
                        this.option("text", this.option("value"));
                    }
                    _super.prototype._renderValue.call(this);
                };
                return dxFileImagePicker;
            })(Widgets.dxEllipsisEditor);
            Widgets.dxFileImagePicker = dxFileImagePicker;
            DevExpress.registerComponent("dxFileImagePicker", dxFileImagePicker);
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.availableUnits = [
                { value: "pt", displayValue: "Point", localizationId: "DevExpress.ReportDesigner_FontOptions_Unit_Point" },
                { value: "world", displayValue: "World", localizationId: "ASPxReportsStringId.ReportDesigner_FontOptions_Unit_World" },
                { value: "px", displayValue: "Pixel", localizationId: "ASPxReportsStringId.ReportDesigner_FontOptions_Unit_Pixel" },
                { value: "in", displayValue: "Inch", localizationId: "ASPxReportsStringId.ReportDesigner_Wizard_Inch" },
                { value: "doc", displayValue: "Document", localizationId: "PreviewStringId.ReportDesigner_FontOptions_Unit_Document" },
                { value: "mm", displayValue: "Millimetr", localizationId: "ASPxReportsStringId.ReportDesigner_Wizard_Millimeter" }
            ];
            var FontModel = (function () {
                function FontModel(value) {
                    var _this = this;
                    this.family = ko.observable("Times New Roman");
                    this.unit = ko.observable("pt");
                    this.isUpdateModel = false;
                    this.size = ko.observable(9);
                    this.modificators = {
                        bold: ko.observable(false),
                        italic: ko.observable(false),
                        strikeout: ko.observable(false),
                        underline: ko.observable(false)
                    };
                    this.updateModel(value());
                    value.subscribe(function (newVal) {
                        _this.isUpdateModel = true;
                        _this.updateModel(newVal);
                        _this.isUpdateModel = false;
                    });
                    this.modificators.bold.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.modificators.italic.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.modificators.strikeout.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.modificators.underline.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.family.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.size.subscribe(function (newVal) { return _this.updateValue(value); });
                    this.unit.subscribe(function (newVal) { return _this.updateValue(value); });
                }
                FontModel.prototype.updateModel = function (value) {
                    if (value) {
                        var components = value.split(',');
                        this.family(components[0]);
                        var self = this;
                        Widgets.availableUnits.forEach(function (element) {
                            if (components[1].indexOf(element.value) != -1) {
                                self.size(parseFloat(components[1].split(element.value)[0]));
                                self.unit(element.value);
                            }
                        });
                        this.modificators.bold(value.indexOf("Bold") !== -1);
                        this.modificators.italic(value.indexOf("Italic") !== -1);
                        this.modificators.underline(value.indexOf("Underline") !== -1);
                        this.modificators.strikeout(value.indexOf("Strikeout") !== -1);
                    }
                };
                FontModel.prototype.updateValue = function (value) {
                    if (!this.isUpdateModel) {
                        var leftPart = [this.family(), this.size() + this.unit()].join(", ");
                        var modificators = [];
                        if (this.modificators.bold())
                            modificators.push("Bold");
                        if (this.modificators.italic())
                            modificators.push("Italic");
                        if (this.modificators.underline())
                            modificators.push("Underline");
                        if (this.modificators.strikeout())
                            modificators.push("Strikeout");
                        var rightPart = modificators.join(', ');
                        value(!!rightPart ? [leftPart, rightPart].join(", style=") : leftPart);
                    }
                };
                return FontModel;
            })();
            Widgets.FontModel = FontModel;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.availableFonts = ko.observable({
                "Times New Roman": "Times New Roman",
                "Arial": "Arial",
                "Arial Black": "Arial Black",
                "Comic Sans MS": "Comic Sans MS",
                "Courier New": "Courier New",
                "Georgia": "Georgia",
                "Impact": "Impact",
                "Lucida Console": "Lucida Console",
                "Lucida Sans Unicode": "Lucida Sans Unicode",
                "Tahoma": "Tahoma",
                "Trebuchet MS": "Trebuchet MS",
                "Verdana": "Verdana",
                "MS Sans Serif": "MS Sans Serif",
                "MS Serif": "MS Serif",
                "Symbol": "Symbol",
                "Webdings": "Webdings",
                "Wingdings": "Wingdings"
            });
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="model.ts" />
/// <reference path="fonts.ts" />
/// <reference path="../propertygrideditor.ts" />
/// <reference path="../editorsInfo.ts" />
/// <reference path="../../propertygrid.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FontEditor = (function (_super) {
                __extends(FontEditor, _super);
                function FontEditor(info, level, parentDisabled, textToSearch) {
                    _super.call(this, info, level, parentDisabled, textToSearch);
                }
                FontEditor.prototype.createObjectProperties = function () {
                    var model = new Widgets.FontModel(this.value);
                    return new Widgets.ObjectProperties(ko.observable(model), { editors: Widgets.fontInfo }, this.level + 1, this.disabled, undefined, this.textToSearch);
                };
                return FontEditor;
            })(Widgets.PropertyGridEditor);
            Widgets.FontEditor = FontEditor;
            Widgets.fontInfo = [
                {
                    propertyName: "family", displayName: "Font Name", localizationId: "ReportStringId.UD_TTip_FormatFontName",
                    editor: Widgets.editorTemplates.combobox, values: Widgets.availableFonts
                },
                { propertyName: "size", displayName: "Size", localizationId: "System.Drawing.Font.Size", editor: Widgets.editorTemplates.numeric },
                {
                    propertyName: "unit", displayName: "Unit", localizationId: "System.Drawing.Font.Unit", editor: Widgets.editorTemplates.combobox,
                    valuesArray: Widgets.availableUnits
                },
                { propertyName: "modificators", editor: Widgets.editorTemplates.modificators },
            ];
            Widgets.editorTemplates["font"] = { header: "dx-emptyHeader", content: "dx-objectEditorContent", editorType: FontEditor };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="internal/addon.ts" />
/// <reference path="internal/codeResolver.ts" />
/// <reference path="internal/popupService.ts" />
/// <reference path="Localization/localization.ts" />
/// <reference path="Localization/localizationStringIds.ts" />
/// <reference path="bindings.ts" />
/// <reference path="propertygrid.ts" />
/// <reference path="utils.ts" />
/// <reference path="widgets/editor.ts" />
/// <reference path="widgets/editorsInfo.ts" />
/// <reference path="widgets/guideditor.ts" />
/// <reference path="widgets/propertygrideditor.ts" />
/// <reference path="widgets/collectioneditor/bindings.ts" />
/// <reference path="widgets/collectioneditor/editor.ts" />
/// <reference path="widgets/ellipsiseditor/editor.ts" />
/// <reference path="widgets/fileimageeditor/editor.ts" />
/// <reference path="widgets/fonteditor/editor.ts" />
/// <reference path="widgets/fonteditor/fonts.ts" />
/// <reference path="widgets/fonteditor/model.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            Utils.getLocalization = DevExpress.Analytics.Utils.getLocalization;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "getLocalization");
            Utils.findMatchesInString = DevExpress.Analytics.Utils.findMatchesInString;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "findMatchesInString");
            Utils.escapeToRegExp = DevExpress.Analytics.Utils.escapeToRegExp;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "escapeToRegExp");
            Utils.formatUnicorn = DevExpress.Analytics.Utils.formatUnicorn;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "formatUnicorn");
            var PopupService = (function (_super) {
                __extends(PopupService, _super);
                function PopupService() {
                    _super.apply(this, arguments);
                }
                return PopupService;
            })(DevExpress.Analytics.Internal.PopupService);
            Utils.PopupService = PopupService;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Internal, "PopupService");
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            var CollectionItemWrapper = (function (_super) {
                __extends(CollectionItemWrapper, _super);
                function CollectionItemWrapper() {
                    _super.apply(this, arguments);
                }
                return CollectionItemWrapper;
            })(DevExpress.Analytics.Widgets.CollectionItemWrapper);
            Widgets.CollectionItemWrapper = CollectionItemWrapper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "CollectionItemWrapper");
            var CollectionEditorViewModel = (function (_super) {
                __extends(CollectionEditorViewModel, _super);
                function CollectionEditorViewModel() {
                    _super.apply(this, arguments);
                }
                return CollectionEditorViewModel;
            })(DevExpress.Analytics.Widgets.CollectionEditorViewModel);
            Widgets.CollectionEditorViewModel = CollectionEditorViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "CollectionEditorViewModel");
            var dxEllipsisEditor = (function (_super) {
                __extends(dxEllipsisEditor, _super);
                function dxEllipsisEditor() {
                    _super.apply(this, arguments);
                }
                return dxEllipsisEditor;
            })(DevExpress.Analytics.Widgets.dxEllipsisEditor);
            Widgets.dxEllipsisEditor = dxEllipsisEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "dxEllipsisEditor");
            var dxFileImagePicker = (function (_super) {
                __extends(dxFileImagePicker, _super);
                function dxFileImagePicker() {
                    _super.apply(this, arguments);
                }
                return dxFileImagePicker;
            })(DevExpress.Analytics.Widgets.dxFileImagePicker);
            Widgets.dxFileImagePicker = dxFileImagePicker;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "dxFileImagePicker");
            var FontEditor = (function (_super) {
                __extends(FontEditor, _super);
                function FontEditor() {
                    _super.apply(this, arguments);
                }
                return FontEditor;
            })(DevExpress.Analytics.Widgets.FontEditor);
            Widgets.FontEditor = FontEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FontEditor");
            Widgets.fontInfo = DevExpress.Analytics.Widgets.fontInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "fontInfo");
            Widgets.availableFonts = DevExpress.Analytics.Widgets.availableFonts;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "availableFonts");
            Widgets.availableUnits = DevExpress.Analytics.Widgets.availableUnits;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "availableUnits");
            var FontModel = (function (_super) {
                __extends(FontModel, _super);
                function FontModel() {
                    _super.apply(this, arguments);
                }
                return FontModel;
            })(DevExpress.Analytics.Widgets.FontModel);
            Widgets.FontModel = FontModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FontModel");
            Widgets.propertiesGridEditorsPaddingLeft = DevExpress.Analytics.Widgets.propertiesGridEditorsPaddingLeft;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "propertiesGridEditorsPaddingLeft");
            var Editor = (function (_super) {
                __extends(Editor, _super);
                function Editor() {
                    _super.apply(this, arguments);
                }
                return Editor;
            })(DevExpress.Analytics.Widgets.Editor);
            Widgets.Editor = Editor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "Editor");
            Widgets.editorTemplates = DevExpress.Analytics.Widgets.editorTemplates;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "editorTemplates");
            Widgets.validateGuid = DevExpress.Analytics.Widgets.validateGuid;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "validateGuid");
            Widgets.guidValidationRules = DevExpress.Analytics.Widgets.guidValidationRules;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "guidValidationRules");
            var GuidEditor = (function (_super) {
                __extends(GuidEditor, _super);
                function GuidEditor() {
                    _super.apply(this, arguments);
                }
                return GuidEditor;
            })(DevExpress.Analytics.Widgets.GuidEditor);
            Widgets.GuidEditor = GuidEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "GuidEditor");
            var PropertyGridEditor = (function (_super) {
                __extends(PropertyGridEditor, _super);
                function PropertyGridEditor() {
                    _super.apply(this, arguments);
                }
                return PropertyGridEditor;
            })(DevExpress.Analytics.Widgets.PropertyGridEditor);
            Widgets.PropertyGridEditor = PropertyGridEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "PropertyGridEditor");
            var EditorAddOn = (function (_super) {
                __extends(EditorAddOn, _super);
                function EditorAddOn() {
                    _super.apply(this, arguments);
                }
                return EditorAddOn;
            })(DevExpress.Analytics.Internal.EditorAddOn);
            Widgets.EditorAddOn = EditorAddOn;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Internal, "EditorAddOn");
            var ObjectProperties = (function (_super) {
                __extends(ObjectProperties, _super);
                function ObjectProperties() {
                    _super.apply(this, arguments);
                }
                return ObjectProperties;
            })(DevExpress.Analytics.Widgets.ObjectProperties);
            Widgets.ObjectProperties = ObjectProperties;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "ObjectProperties");
            Widgets.compareEditorInfo = DevExpress.Analytics.Utils.compareEditorInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Utils, "compareEditorInfo");
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Localization;
        (function (Localization) {
            Localization.Globalize = DevExpress.Analytics.Localization.Globalize;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "Globalize");
            Localization.messages = DevExpress.Analytics.Localization.messages;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "messages");
            Localization.addCultureInfo = DevExpress.Analytics.Localization.addCultureInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "addCultureInfo");
            Localization.localize = DevExpress.Analytics.Localization.localize;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "localize");
            Localization.parseDate = DevExpress.Analytics.Localization.parseDate;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "parseDate");
            Localization.selectPlaceholder = DevExpress.Analytics.Localization.selectPlaceholder;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "selectPlaceholder");
            Localization.noDataText = DevExpress.Analytics.Localization.noDataText;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Localization, DevExpress.Analytics.Localization, "noDataText");
        })(Localization = JS.Localization || (JS.Localization = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var CodeResolver = (function (_super) {
            __extends(CodeResolver, _super);
            function CodeResolver() {
                _super.apply(this, arguments);
            }
            return CodeResolver;
        })(DevExpress.Analytics.Internal.CodeResolver);
        JS.CodeResolver = CodeResolver;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.JS, DevExpress.Analytics.Internal, "CodeResolver");
        JS.globalResolver = DevExpress.Analytics.Internal.globalResolver;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.JS, DevExpress.Analytics.Internal, "globalResolver");
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        Designer.isCustomizedWithUpdateLocalizationMethod = DevExpress.Analytics.isCustomizedWithUpdateLocalizationMethod;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "isCustomizedWithUpdateLocalizationMethod");
        Designer.getLocalization = DevExpress.Analytics.getLocalization;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "getLocalization");
        Designer.getSpecificLocalizationWithAddition = DevExpress.Analytics.getSpecificLocalizationWithAddition;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "getSpecificLocalizationWithAddition");
        Designer.updateLocalization = DevExpress.Analytics.updateLocalization;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "updateLocalization");
        Designer.StringId = undefined;
        if (DevExpress.Analytics && DevExpress.Analytics["StringId"]) {
            Designer.StringId = DevExpress.Analytics["StringId"];
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "StringId");
        }
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-propertygrid.js.map
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function propertiesVisitor(target, visitor, visited, skip) {
                if (visited === void 0) { visited = []; }
                if (skip === void 0) { skip = ["surface"]; }
                if (target && target !== undefined) {
                    var properties = [];
                    for (var propertyName in target) {
                        if (propertyName.indexOf("_") !== 0 && skip.indexOf(propertyName) === -1) {
                            var realPropertyName = propertyName;
                            if (ko.isComputed(target[propertyName]) && ko.isWriteableObservable(target["_" + propertyName])) {
                                realPropertyName = "_" + realPropertyName;
                            }
                            if (visited.indexOf(target[realPropertyName]) === -1 && !ko.isComputed(target[realPropertyName])) {
                                properties.push(target[realPropertyName]);
                            }
                        }
                    }
                    visitor(properties);
                    visited.push.apply(visited, properties);
                    properties.forEach(function (property) {
                        property = ko.unwrap(property);
                        if (typeof property === 'object') {
                            propertiesVisitor(property, visitor, visited, skip);
                        }
                    });
                }
            }
            Utils.propertiesVisitor = propertiesVisitor;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function checkModelReady(model) {
                return model.isModelReady ? model.isModelReady() : true;
            }
            Utils.checkModelReady = checkModelReady;
            var UndoEngine = (function () {
                function UndoEngine(target, ignoredProperties, getInfoMethodName) {
                    var _this = this;
                    if (ignoredProperties === void 0) { ignoredProperties = ["surface"]; }
                    this._disposeUndoEngineSubscriptionsName = "___dispose___UndoEngine___Subscriptions___";
                    this._groupObservers = [];
                    this._getInfoMethodName = null;
                    this._groupPosition = -1;
                    this._observers = [];
                    this._subscriptions = [];
                    this._visited = [];
                    this._position = -1;
                    this._inUndoRedo = false;
                    this.redoEnabled = ko.observable(false);
                    this.undoEnabled = ko.observable(false);
                    this.isIngroup = -1;
                    this.isDirty = ko.observable(false);
                    this._model = ko.unwrap(target);
                    this._getInfoMethodName = getInfoMethodName;
                    this._ignoredProperties = ignoredProperties;
                    if (this._getInfoMethodName) {
                        if (ko.isSubscribable(target)) {
                            this._targetSubscription = this.subscribeProperty(target, true);
                        }
                        else {
                            this._createDisposeFunction(target);
                        }
                    }
                    else {
                        var innerSubscriptions = this.subscribe(this._model);
                        if (ko.isSubscribable(target)) {
                            var prevVal = target();
                            this._targetSubscription = target.subscribe(function (newTargetValue) {
                                _this._removePropertiesSubscriptions();
                                if (!_this._inUndoRedo) {
                                    _this.properyChanged({
                                        observable: target, propertyChanged: { oldVal: prevVal, val: newTargetValue }
                                    });
                                    prevVal = newTargetValue;
                                }
                                _this._cleanSubscribtions(innerSubscriptions);
                                _this._model = newTargetValue;
                                innerSubscriptions = _this.subscribe(_this._model);
                            });
                        }
                    }
                }
                Object.defineProperty(UndoEngine.prototype, "_modelReady", {
                    get: function () {
                        return checkModelReady(this._model);
                    },
                    enumerable: true,
                    configurable: true
                });
                UndoEngine.prototype.properyChanged = function (undoRecord) {
                    if (this._inUndoRedo) {
                        return;
                    }
                    var currentPosition = this._position + 1;
                    if (currentPosition < this._observers.length) {
                        this._observers = this._observers.splice(0, currentPosition);
                    }
                    this._observers.push(undoRecord);
                    this.isDirty(true);
                    this._position = currentPosition;
                    this.undoEnabled(true);
                    this.redoEnabled(false);
                };
                UndoEngine.prototype.visitProperties = function (target, info) {
                    var subscribtions = [];
                    if (target && info) {
                        for (var i = 0; i < info.length; i++) {
                            if (info[i].modelName || info[i].editor || info[i].info) {
                                var propertyName = info[i].propertyName;
                                if ((!this._ignoredProperties || (this._ignoredProperties && this._ignoredProperties.indexOf(propertyName) === -1)) && propertyName.indexOf("_") !== 0) {
                                    var realPropertyName = propertyName;
                                    if (ko.isWriteableObservable(target["_" + propertyName])) {
                                        realPropertyName = "_" + realPropertyName;
                                    }
                                    if (!ko.isComputed(target[realPropertyName])) {
                                        if (!ko.isObservable(target[realPropertyName])) {
                                            subscribtions.push.apply([], this._createDisposeFunction(target[realPropertyName], info[i].info));
                                        }
                                        else {
                                            subscribtions.push(this.subscribeProperty(target[realPropertyName], !info[i].link));
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return subscribtions;
                };
                UndoEngine.prototype.undoChangeSet = function (changeSet) {
                    if (changeSet.propertyChanged) {
                        changeSet.observable(changeSet.propertyChanged.oldVal);
                    }
                    else {
                        var array = changeSet.observable();
                        for (var i = 0; i < changeSet.arrayChanges.length; i++) {
                            if (changeSet.arrayChanges[i].status === "added") {
                                array.splice(array.indexOf(changeSet.arrayChanges[i].value), 1);
                            }
                            else if (changeSet.arrayChanges[i].status === "deleted") {
                                array.splice(changeSet.arrayChanges[i].index, 0, changeSet.arrayChanges[i].value);
                            }
                        }
                        changeSet.observable.valueHasMutated();
                    }
                };
                UndoEngine.prototype.redoChangeSet = function (changeSet) {
                    if (changeSet.propertyChanged) {
                        changeSet.observable(changeSet.propertyChanged.val);
                    }
                    else {
                        var array = changeSet.observable();
                        for (var i = 0; i < changeSet.arrayChanges.length; i++) {
                            if (changeSet.arrayChanges[i].status === "added") {
                                array.splice(changeSet.arrayChanges[i].index, 0, changeSet.arrayChanges[i].value);
                            }
                            else if (changeSet.arrayChanges[i].status === "deleted") {
                                array.splice(array.indexOf(changeSet.arrayChanges[i].value), 1);
                            }
                        }
                        changeSet.observable.valueHasMutated();
                    }
                };
                UndoEngine.prototype._disposeChilds = function (target, info) {
                    if (target && info) {
                        for (var i = 0; i < info.length; i++) {
                            if (info[i].modelName || info[i].editor || info[i].info) {
                                var propertyName = info[i].propertyName;
                                if (propertyName.indexOf("_") !== 0) {
                                    var realPropertyName = propertyName;
                                    if (ko.isWriteableObservable(target["_" + propertyName])) {
                                        realPropertyName = "_" + realPropertyName;
                                    }
                                    if (!ko.isComputed(target[realPropertyName])) {
                                        var val = ko.unwrap(target[realPropertyName]);
                                        if (!!val && typeof val === "object") {
                                            if (!info[i].link) {
                                                this._callDisposeFunction(val);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                UndoEngine.prototype._createDisposeFunction = function (val, info) {
                    var _this = this;
                    var subscriptions = [];
                    if (val && typeof val === "object") {
                        var objectInfo = info || (val[this._getInfoMethodName] && val[this._getInfoMethodName]());
                        if (!!objectInfo) {
                            if (val[this._disposeUndoEngineSubscriptionsName]) {
                                val[this._disposeUndoEngineSubscriptionsName].inc++;
                            }
                            else {
                                val[this._disposeUndoEngineSubscriptionsName] = { inc: 1 };
                                subscriptions = this.subscribe(val, objectInfo);
                                val[this._disposeUndoEngineSubscriptionsName]["func"] = function () {
                                    val[_this._disposeUndoEngineSubscriptionsName].inc--;
                                    _this._disposeChilds(val, objectInfo);
                                    if (val[_this._disposeUndoEngineSubscriptionsName].inc === 0) {
                                        _this._cleanSubscribtions(subscriptions);
                                        delete val[_this._disposeUndoEngineSubscriptionsName];
                                    }
                                };
                            }
                        }
                    }
                    return subscriptions;
                };
                UndoEngine.prototype._callDisposeFunction = function (val) {
                    if (val) {
                        if (Array.isArray(val)) {
                            for (var i = 0; i < val.length; i++) {
                                val[i][this._disposeUndoEngineSubscriptionsName] && val[i][this._disposeUndoEngineSubscriptionsName].func();
                            }
                        }
                        else {
                            val[this._disposeUndoEngineSubscriptionsName] && val[this._disposeUndoEngineSubscriptionsName].func();
                        }
                    }
                };
                UndoEngine.prototype._cleanSubscribtions = function (subscribtionArray) {
                    if (subscribtionArray) {
                        if (subscribtionArray.length) {
                            for (var i = 0; i < subscribtionArray.length; i++) {
                                this._cleanSubscribtions(subscribtionArray[i]);
                            }
                        }
                        else {
                            subscribtionArray.dispose && subscribtionArray.dispose();
                        }
                    }
                };
                UndoEngine.prototype.subscribeProperty = function (property, subscribeChilds) {
                    var _this = this;
                    if (ko.isObservable(property)) {
                        var prevVal = property();
                        if (Array.isArray(prevVal)) {
                            for (var i = 0; i < property().length; i++) {
                                this._createDisposeFunction(property()[i]);
                            }
                            return property.subscribe(function (args) {
                                if (_this._modelReady) {
                                    var addedItems = args.filter(function (x) { return x.status === "added"; });
                                    var removedItems = args.filter(function (x) { return x.status === "deleted"; });
                                    for (var i = 0; i < removedItems.length; i++) {
                                        _this._callDisposeFunction(removedItems[i].value);
                                    }
                                    for (var i = 0; i < addedItems.length; i++) {
                                        _this._createDisposeFunction(addedItems[i].value);
                                    }
                                    _this.properyChanged({ observable: property, arrayChanges: args });
                                }
                            }, null, "arrayChange");
                        }
                        else {
                            if (ko.isWriteableObservable(property)) {
                                if (subscribeChilds) {
                                    this._createDisposeFunction(property());
                                }
                                return property.subscribe(function (val) {
                                    if (_this._modelReady) {
                                        if (subscribeChilds) {
                                            _this._callDisposeFunction(prevVal);
                                        }
                                        _this.properyChanged({
                                            observable: property, propertyChanged: { oldVal: prevVal, val: val }
                                        });
                                        prevVal = val;
                                        if (subscribeChilds) {
                                            _this._createDisposeFunction(val);
                                        }
                                    }
                                });
                            }
                        }
                    }
                };
                UndoEngine.prototype.subscribeProperties = function (properties) {
                    var _this = this;
                    properties.forEach(function (property) {
                        if (ko.isObservable(property)) {
                            var prevVal = property();
                            if (property["push"]) {
                                _this._subscriptions.push(property.subscribe(function (args) {
                                    if (_this._modelReady) {
                                        if (!_this._inUndoRedo) {
                                            _this.properyChanged({ observable: property, arrayChanges: args });
                                            _this.subscribe(args.map(function (item) { return item.value; }));
                                        }
                                    }
                                }, null, "arrayChange"));
                            }
                            else {
                                if (ko.isWriteableObservable(property)) {
                                    _this._subscriptions.push(property.subscribe(function (val) {
                                        if (_this._modelReady) {
                                            _this.properyChanged({
                                                observable: property, propertyChanged: { oldVal: prevVal, val: val }
                                            });
                                            prevVal = property();
                                        }
                                    }));
                                }
                            }
                        }
                    });
                };
                UndoEngine.prototype.subscribe = function (target, info) {
                    var _this = this;
                    if (this._getInfoMethodName) {
                        return this.visitProperties(target, info || (target && target[this._getInfoMethodName] && target[this._getInfoMethodName]()));
                    }
                    else {
                        Utils.propertiesVisitor(target, function (properties) { _this.subscribeProperties(properties); }, this._visited, this._ignoredProperties);
                    }
                };
                UndoEngine.prototype._removePropertiesSubscriptions = function () {
                    this._subscriptions.forEach(function (subscription) { return subscription.dispose(); });
                    this._subscriptions = [];
                    this._visited = [];
                };
                UndoEngine.prototype.removeTargetSubscription = function () {
                    this._targetSubscription.dispose();
                    this.reset();
                };
                UndoEngine.prototype.undoAll = function () {
                    if (this.undoEnabled()) {
                        this.undo();
                        this.undoAll();
                    }
                };
                UndoEngine.prototype.reset = function () {
                    this._removePropertiesSubscriptions();
                    this.clearHistory();
                };
                UndoEngine.prototype.clearHistory = function () {
                    this._groupObservers = [];
                    this._observers = [];
                    this.redoEnabled(false);
                    this.undoEnabled(false);
                    this._inUndoRedo = false;
                    this._groupPosition = -1;
                    this._position = -1;
                    this.isDirty(false);
                };
                UndoEngine.prototype.undo = function () {
                    var _this = this;
                    try {
                        this._inUndoRedo = true;
                        if (this.undoEnabled()) {
                            var changeSet = this._observers[this._position];
                            if (changeSet) {
                                if (Array.isArray(changeSet)) {
                                    changeSet.reverse().forEach(function (item) { return _this.undoChangeSet(item); });
                                }
                                else {
                                    this.undoChangeSet(changeSet);
                                }
                                this._position = this._position - 1;
                                this.isDirty(true);
                                this.undoEnabled(this._observers.length !== 0 && this._position >= 0);
                                this.redoEnabled(true);
                            }
                        }
                    }
                    finally {
                        this._inUndoRedo = false;
                    }
                };
                UndoEngine.prototype.redo = function () {
                    var _this = this;
                    try {
                        this._inUndoRedo = true;
                        if (this.redoEnabled()) {
                            var changeSet = this._observers[this._position + 1];
                            if (changeSet) {
                                if (Array.isArray(changeSet)) {
                                    changeSet.reverse().forEach(function (item) { return _this.redoChangeSet(item); });
                                }
                                else {
                                    this.redoChangeSet(changeSet);
                                }
                                this._position = this._position + 1;
                                this.isDirty(true);
                                this.undoEnabled(this._observers.length !== 0 && this._position >= 0);
                                this.redoEnabled(this._position + 1 < this._observers.length);
                            }
                        }
                    }
                    finally {
                        this._inUndoRedo = false;
                    }
                };
                UndoEngine.prototype.start = function () {
                    this.isIngroup++;
                    if (this.isIngroup !== 0)
                        return;
                    this._groupObservers = this._observers;
                    this._observers = [];
                    this._groupPosition = this._position;
                    this._position = -1;
                };
                UndoEngine.prototype.end = function () {
                    this.isIngroup--;
                    if (this.isIngroup !== -1) {
                        return;
                    }
                    if (this._observers.length > 0) {
                        this._position = this._groupPosition + 1;
                        this._groupObservers.splice(this._position, this._groupObservers.length - this._position, this._observers);
                    }
                    else {
                        this._position = this._groupPosition;
                    }
                    this._observers = this._groupObservers;
                };
                return UndoEngine;
            })();
            Utils.UndoEngine = UndoEngine;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="utils.ts" />
/// <reference path="undoengine.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            var UndoEngine = (function (_super) {
                __extends(UndoEngine, _super);
                function UndoEngine() {
                    _super.apply(this, arguments);
                }
                return UndoEngine;
            })(DevExpress.Analytics.Utils.UndoEngine);
            Utils.UndoEngine = UndoEngine;
            ;
            Utils.DEBUG = true;
            Utils.NotifyAboutWarning = function () { };
            Utils.propertiesVisitor = DevExpress.Analytics.Utils.propertiesVisitor;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "UndoEngine");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "propertiesVisitor");
//# sourceMappingURL=dx-ko-undoengine.js.map
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var PathRequest = (function () {
                function PathRequest(fullPath, pathParts) {
                    if (pathParts === void 0) { pathParts = []; }
                    this.pathParts = pathParts;
                    this.path = "";
                    this.fullPath = fullPath;
                    if (fullPath) {
                        if (fullPath.indexOf('.') !== -1) {
                            var pathComponents = fullPath.split('.');
                            this.id = this.ref = pathComponents[0];
                            pathComponents.splice(0, 1);
                            this.path = pathComponents.join('.');
                        }
                        else {
                            this.id = this.ref = fullPath;
                        }
                    }
                }
                return PathRequest;
            })();
            Utils.PathRequest = PathRequest;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var ValueEditorHelper = (function () {
                    function ValueEditorHelper() {
                    }
                    ValueEditorHelper._getCharFromKeyCode = function (e) {
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
                        return null;
                    };
                    ValueEditorHelper._getCaretPosition = function (el) {
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
                    };
                    ValueEditorHelper._validate = function (value, minValue, maxValue) {
                        if (!/^(0|(-?(([1-9]\d*)|(0\.\d+)|([1-9]\d*\.\d+)|(\d*\.\d+[eE][+\-]?\d+))))$/.test(value))
                            return false;
                        if (!maxValue)
                            return true;
                        var negative = value[0] === "-";
                        var valModulo = negative ? value.substring(1) : value;
                        if (negative && !minValue)
                            return false;
                        var boundModulo = negative ? minValue.substring(1) : maxValue;
                        var valMantissa, valExp, boundMantissa, boundExp;
                        _a = valModulo.toLowerCase().split("e"), valMantissa = _a[0], valExp = _a[1];
                        _b = boundModulo.toLowerCase().split("e"), boundMantissa = _b[0], boundExp = _b[1];
                        var valIntPart, valFracPart, boundIntPart, boundFracPart;
                        _c = valMantissa.split("."), valIntPart = _c[0], valFracPart = _c[1];
                        _d = boundMantissa.split("."), boundIntPart = _d[0], boundFracPart = _d[1];
                        valIntPart = (valIntPart || "").replace(/^0+/, "");
                        boundIntPart = (boundIntPart || "").replace(/^0+/, "");
                        var valOrder = valIntPart.length;
                        if (valExp)
                            valOrder += parseInt(valExp);
                        var boundOrder = boundIntPart.length;
                        if (boundExp)
                            boundOrder += parseInt(boundExp);
                        if (valOrder < boundOrder)
                            return true;
                        if (valOrder > boundOrder)
                            return false;
                        valFracPart = valFracPart || "0";
                        boundFracPart = boundFracPart || "0";
                        if (valIntPart + valFracPart > boundIntPart + boundFracPart)
                            return false;
                        return true;
                        var _a, _b, _c, _d;
                    };
                    ValueEditorHelper._checkFinalValue = function (e, validate, defaultVal) {
                        var currentValue = e.component.option("value");
                        if (!validate(currentValue)) {
                            e.component.option("value", defaultVal);
                        }
                    };
                    ValueEditorHelper.getNumberEditorOptions = function (id, specifics, extendOptions) {
                        if (extendOptions === void 0) { extendOptions = {}; }
                        var editorOptions = ValueEditorHelper.editors[id] || ValueEditorHelper.editors[specifics];
                        return editorOptions ? ValueEditorHelper.getValueEditorOptions(editorOptions.regExpEditing, function (value) {
                            return ValueEditorHelper._validate(value, editorOptions.minValue, editorOptions.maxValue);
                        }, "", extendOptions) : extendOptions;
                    };
                    ValueEditorHelper.getValueEditorOptions = function (regExpEditing, validate, defaultVal, extendOptions) {
                        var _this = this;
                        if (extendOptions === void 0) { extendOptions = {}; }
                        var options = {
                            onFocusIn: function (e) {
                                ValueEditorHelper._checkFinalValue(e, validate, defaultVal);
                                ValueEditorHelper._invokeStandardHandler(extendOptions, "onFocusIn", e);
                            },
                            onKeyPress: function (e) {
                                var char = ValueEditorHelper._getCharFromKeyCode(e.event);
                                if (!char)
                                    return;
                                var $input = $(e.element).find("input").eq(0);
                                var caretPosition = ValueEditorHelper._getCaretPosition($input.get(0)).start;
                                var currentValue = $input.val();
                                if (caretPosition < 0) {
                                    caretPosition = currentValue ? currentValue.length : 0;
                                }
                                var result = [currentValue.slice(0, caretPosition), char, currentValue.slice(caretPosition)].join("");
                                if (!regExpEditing.test(result))
                                    e.event.preventDefault();
                                $input = null;
                                ValueEditorHelper._invokeStandardHandler(extendOptions, "onKeyPress", e);
                            },
                            onPaste: function (e) {
                                var clipboardData = e.event.originalEvent.clipboardData || window["clipboardData"] || {};
                                var pastedData = clipboardData.getData && clipboardData.getData("Text");
                                if (typeof pastedData !== "string")
                                    return;
                                var $input = $(e.element).find("input").eq(0);
                                var caretPosition = ValueEditorHelper._getCaretPosition($input.get(0));
                                var currentValue = $input.val();
                                if (caretPosition.start < 0) {
                                    caretPosition.end = caretPosition.start = currentValue ? currentValue.length : 0;
                                }
                                var result = [
                                    currentValue.slice(0, caretPosition.start), pastedData, currentValue.slice(caretPosition.end)
                                ].join("");
                                if (!regExpEditing.test(result))
                                    e.event.preventDefault();
                                $input = null;
                                ValueEditorHelper._invokeStandardHandler(extendOptions, "onPaste", e);
                            },
                            onValueChanged: function (e) {
                                if (e.value !== defaultVal)
                                    _this._checkFinalValue(e, validate, e.previousValue);
                                ValueEditorHelper._invokeStandardHandler(extendOptions, "onValueChanged", e);
                            }
                        };
                        return $.extend({}, extendOptions, options);
                    };
                    ValueEditorHelper.isValid = function (id, specifics, value) {
                        var editorOptions = ValueEditorHelper.editors[id] || ValueEditorHelper.editors[specifics];
                        return editorOptions.regExpEditing.test(value) && ValueEditorHelper._validate(value, editorOptions.minValue, editorOptions.maxValue);
                    };
                    ValueEditorHelper._invokeStandardHandler = function (extendOptions, name, e) {
                        if ($.isFunction(extendOptions[name]))
                            extendOptions[name](e);
                    };
                    ValueEditorHelper.editors = {
                        "integer": {
                            regExpEditing: /^-?\d*$/
                        },
                        "float": {
                            regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d+)?$/
                        },
                        "System.Byte": {
                            regExpEditing: /^\d*$/,
                            minValue: null,
                            maxValue: "255"
                        },
                        "System.SByte": {
                            regExpEditing: /^-?\d*$/,
                            minValue: "-128",
                            maxValue: "127"
                        },
                        "System.Int16": {
                            regExpEditing: /^-?\d*$/,
                            minValue: "-32768",
                            maxValue: "32767"
                        },
                        "System.UInt16": {
                            regExpEditing: /^\d*$/,
                            minValue: null,
                            maxValue: "65535"
                        },
                        "System.Int32": {
                            regExpEditing: /^-?\d*$/,
                            minValue: "-2147483648",
                            maxValue: "2147483647"
                        },
                        "System.UInt32": {
                            regExpEditing: /^\d*$/,
                            minValue: null,
                            maxValue: "4294967295"
                        },
                        "System.Int64": {
                            regExpEditing: /^-?\d*$/,
                            minValue: "-9223372036854775808",
                            maxValue: "9223372036854775807"
                        },
                        "System.UInt64": {
                            regExpEditing: /^\d*$/,
                            minValue: null,
                            maxValue: "18446744073709551615"
                        },
                        "System.Single": {
                            regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
                            minValue: "-3.40282347e+38",
                            maxValue: "3.40282347e+38"
                        },
                        "System.Double": {
                            regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
                            minValue: "-1.7976931348623157e+308",
                            maxValue: "1.7976931348623157e+308"
                        },
                        "System.Decimal": {
                            regExpEditing: /^-?(\d+\.?\d*)?([eE][+\-]?\d*)?$/,
                            minValue: "-79228162514264337593543950335",
                            maxValue: "79228162514264337593543950335"
                        }
                    };
                    return ValueEditorHelper;
                })();
                Internal.ValueEditorHelper = ValueEditorHelper;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="common/pathRequest.ts" />
///<reference path="internal/valueEditorHelper.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var Disposable = (function () {
                function Disposable() {
                    this._disposables = [];
                    this.isDisposing = false;
                }
                Disposable.prototype.dispose = function () {
                    if (!this.isDisposing) {
                        this.isDisposing = true;
                        this._disposables.forEach(function (x) { return x && x.dispose(); });
                        this._disposables = [];
                    }
                };
                return Disposable;
            })();
            Utils.Disposable = Disposable;
            function integerValueConverter(val, defaultValue) {
                var stringValue = "" + val;
                return Analytics.Widgets.Internal.ValueEditorHelper.isValid(this.value, "integer", stringValue) ? stringValue : defaultValue;
            }
            Utils.integerValueConverter = integerValueConverter;
            function validateExpression(options) {
                var deferred = $.Deferred();
                try {
                    var requests = [];
                    var expression = Analytics.Criteria.CriteriaOperator.parse(options.expression);
                    Analytics.Criteria.Utils.criteriaForEach(expression, function (operator, innerPath) {
                        if (operator instanceof Analytics.Criteria.OperandProperty) {
                            var propertyName = operator.propertyName.indexOf("^.") === 0 ? operator.propertyName.substring(2) : operator.propertyName;
                            var path = propertyName;
                            if ((options.rootItems || []).indexOf(propertyName.split('.')[0]) === -1 && innerPath) {
                                path = [innerPath, propertyName].join('.');
                            }
                            var propertyDeferred = $.Deferred();
                            options.fieldListProvider.getItemByPath(new Utils.PathRequest(path))
                                .done(function (_) { return propertyDeferred.resolve(); }).fail(function (_) {
                                path === propertyName ? propertyDeferred.reject()
                                    : options.fieldListProvider.getItemByPath(new Utils.PathRequest([path.split('.')[0], propertyName].join('.')))
                                        .done(function (_) { return propertyDeferred.resolve(); }).fail(function (_) { return propertyDeferred.reject(); });
                            });
                            requests.push(propertyDeferred);
                        }
                    }, options.path);
                    $.when.apply($, requests).done(function (_) { return deferred.resolve(); }).fail(function (_) { return deferred.reject(); });
                }
                catch (e) {
                    deferred.reject();
                }
                return deferred.promise();
            }
            Utils.validateExpression = validateExpression;
            function floatValueConverter(val, defaultValue) {
                var stringValue = "" + val;
                return Analytics.Widgets.Internal.ValueEditorHelper.isValid(this.value, "float", stringValue) ? stringValue : defaultValue;
            }
            Utils.floatValueConverter = floatValueConverter;
            function classExists(selector) {
                var lowerCaseSelector = selector.toLowerCase(), styleSheets = document.styleSheets || [], result = false;
                for (var sheetIndex = 0; sheetIndex < styleSheets.length; sheetIndex++) {
                    try {
                        var rules = styleSheets[sheetIndex]["rules"];
                        if (!rules)
                            rules = styleSheets[sheetIndex]["cssRules"];
                    }
                    catch (e) {
                        continue;
                    }
                    for (var ruleIndex = 0; ruleIndex < (rules || []).length; ruleIndex++) {
                        if (rules[ruleIndex].selectorText && rules[ruleIndex].selectorText.toLowerCase() === lowerCaseSelector) {
                            result = true;
                            break;
                        }
                    }
                    if (result) {
                        break;
                    }
                }
                return result;
            }
            Utils.classExists = classExists;
            function setCursorInFunctionParameter(paramCount, editor, insertValue) {
                if (!paramCount || paramCount <= 0)
                    return;
                var cursorPosition = editor.getCursorPosition(), lastIndexOpeningBracket = insertValue.lastIndexOf("(");
                if (insertValue.charAt(lastIndexOpeningBracket + 1) === "'")
                    lastIndexOpeningBracket++;
                editor.gotoLine(cursorPosition.row + 1, cursorPosition.column - (insertValue.length - 1 - lastIndexOpeningBracket));
            }
            Utils.setCursorInFunctionParameter = setCursorInFunctionParameter;
            function isList(data) {
                return data.isList === true || data.specifics === "List" || data.specifics === "ListSource";
            }
            Utils.isList = isList;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.ace = DevExpress.Analytics.Widgets["ace"] || window["ace"];
            Widgets.aceAvailable = !!Widgets.ace;
            ko.bindingHandlers["dxAceEditor"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var values = valueAccessor(), text = values.value, editorContainer = values.editorContainer, editor, _setEditorText = function (editorInstance, text) {
                        editorInstance.getSession().setValue((text && text.toString()) || "");
                        editorInstance.clearSelection();
                        editorInstance.getSession().getUndoManager().reset();
                    };
                    if (Widgets.ace) {
                        var showGutter = values.options.showGutter != undefined ? values.options.showGutter : true;
                        var additionalOptions = values.additionalOptions;
                        var langTools = Widgets.ace.require("ace/ext/language_tools");
                        editor = Widgets.ace.edit(element);
                        var guid = ko.observable(null);
                        var theme = values.theme;
                        if (!theme)
                            theme = Analytics.Utils.classExists(".dx-designer-dark") ? "ace/theme/ambiance" : "ace/theme/dreamweaver";
                        editor.setTheme(theme);
                        editor.$blockScrolling = Infinity;
                        var languageMode = viewModel.languageHelper.getLanguageMode();
                        var session = editor.getSession();
                        session.gutterRenderer = {
                            getWidth: function (session, lastLineNumber, config) {
                                return lastLineNumber.toString().length * config.characterWidth;
                            },
                            getText: function (session, row) {
                                return row + 1;
                            }
                        };
                        session.setMode(languageMode);
                        if (additionalOptions && additionalOptions.onChange) {
                            var timer = null;
                            session.on("change", function (e) {
                                if (timer !== null)
                                    clearTimeout(timer);
                                timer = setTimeout(function () {
                                    additionalOptions.onChange(session);
                                }, additionalOptions && additionalOptions.changeTimeout || 1000);
                            });
                        }
                        if (additionalOptions && additionalOptions.onFocus) {
                            editor.onFocus = function (_) { return additionalOptions.onFocus(session); };
                        }
                        if (additionalOptions && additionalOptions.onBlur) {
                            editor.onBlur = function (_) { return additionalOptions.onBlur(session); };
                        }
                        var completers = viewModel.languageHelper.createCompleters(editor, bindingContext, viewModel);
                        langTools.setCompleters(completers);
                        editor.setOptions(values.options);
                        if (additionalOptions && "setUseWrapMode" in additionalOptions) {
                            editor.getSession().setUseWrapMode(additionalOptions.setUseWrapMode);
                        }
                        if (!showGutter) {
                            editor.renderer.setShowGutter(showGutter);
                        }
                        var oldMouseMove = editor._defaultHandlers.guttermousemove;
                        editor._defaultHandlers.guttermousemove = function (e) {
                            var rect = element.getBoundingClientRect();
                            e.x = e.x - rect.left;
                            e.y = e.y - rect.top;
                            oldMouseMove(e);
                        };
                        if (ko.isSubscribable(text)) {
                            var subscription = text.subscribe(function (newText) {
                                if (newText !== session.getValue()) {
                                    _setEditorText(editor, newText);
                                }
                                if (additionalOptions && additionalOptions.onValueChange)
                                    additionalOptions.onValueChange(editor);
                            });
                        }
                        _setEditorText(editor, ko.unwrap(text));
                        if (values.callbacks)
                            values.callbacks.focus = function () {
                                setTimeout(function () {
                                    editor.textInput.getElement().focus();
                                }, 10);
                            };
                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                            subscription.dispose();
                            if (values.callbacks)
                                values.callbacks.focus = $.noop;
                            completers.forEach(function (x) { return x.dispose && x.dispose(); });
                        });
                    }
                    if (ko.isObservable(editorContainer)) {
                        editorContainer(editor);
                    }
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers["focus"] = {
                init: function (element, valueAccessor) {
                    var visible = valueAccessor().on || valueAccessor();
                    var subscription = visible.subscribe(function (newVal) {
                        if (newVal) {
                            setTimeout(function () {
                                $(element).find(":input").focus();
                            }, 1);
                        }
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        subscription.dispose();
                    });
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                Internal.operatorNames = [
                    { text: "+", image: "addition", descriptionStringId: 'XtraEditorsExpressionEditor.Plus.Description' },
                    { text: "-", image: "subtraction", descriptionStringId: 'XtraEditorsExpressionEditor.Minus.Description' },
                    { text: "*", image: "multiplication", descriptionStringId: 'XtraEditorsExpressionEditor.Multiply.Description' },
                    { text: "/", image: "division", descriptionStringId: 'XtraEditorsExpressionEditor.Divide.Description' },
                    { text: "%", image: "modulus", hasSeparator: true, descriptionStringId: 'XtraEditorsExpressionEditor.Modulo.Description' },
                    { text: "()", image: "parenthesis", hasSeparator: true },
                    { text: "|", descriptionStringId: 'XtraEditorsExpressionEditor.BitwiseOr.Description' },
                    { text: "&", descriptionStringId: 'XtraEditorsExpressionEditor.BitwiseAnd.Description' },
                    { text: "^", descriptionStringId: 'XtraEditorsExpressionEditor.BitwiseXor.Description' },
                    { text: "==", image: "equal", descriptionStringId: 'XtraEditorsExpressionEditor.Equal.Description' },
                    { text: "!=", image: "not_equal", descriptionStringId: 'XtraEditorsExpressionEditor.NotEqual.Description' },
                    { text: "<", image: "less", descriptionStringId: 'XtraEditorsExpressionEditor.Less.Description' },
                    { text: "<=", image: "less_or_equal", descriptionStringId: 'XtraEditorsExpressionEditor.LessOrEqual.Description' },
                    { text: ">=", image: "greater_or_equal", descriptionStringId: 'XtraEditorsExpressionEditor.GreaterOrEqual.Description' },
                    { text: ">", hasSeparator: true, image: "greater", descriptionStringId: 'XtraEditorsExpressionEditor.Greater.Description' },
                    { text: "In", descriptionStringId: 'XtraEditorsExpressionEditor.In.Description' },
                    { text: "Like", descriptionStringId: 'XtraEditorsExpressionEditor.Like.Description' },
                    { text: "Between", descriptionStringId: 'XtraEditorsExpressionEditor.Between.Description' },
                    { text: "And", image: "and", descriptionStringId: 'XtraEditorsExpressionEditor.And.Description' },
                    { text: "Or", image: "or", descriptionStringId: 'XtraEditorsExpressionEditor.Or.Description' },
                    { text: "Not", image: "not", descriptionStringId: 'XtraEditorsExpressionEditor.Not.Description' }
                ];
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="operatorNames.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                Internal.functionDisplay = [
                    {
                        display: "Aggregate",
                        localizationId: 'XtraEditorsExpressionEditor.functionsTypes.Properties.AggregateItems',
                        category: "Aggregate",
                        items: {
                            Avg: [{ paramCount: 1, text: "[].Avg()", displayName: "Avg()", descriptionStringId: 'XtraEditorsExpressionEditor.AvgAggregate.Description' }],
                            Count: [{ paramCount: 1, text: "[].Count()", displayName: "Count()", descriptionStringId: 'XtraEditorsExpressionEditor.CountAggregate.Description' }],
                            Exists: [{ paramCount: 1, text: "[].Exists()", displayName: "Exists()", descriptionStringId: 'XtraEditorsExpressionEditor.ExistsAggregate.Description' }],
                            Max: [{ paramCount: 1, text: "[].Max()", displayName: "Max()", descriptionStringId: 'XtraEditorsExpressionEditor.MaxAggregate.Description' }],
                            Min: [{ paramCount: 1, text: "[].Min()", displayName: "Min()", descriptionStringId: 'XtraEditorsExpressionEditor.MinAggregate.Description' }],
                            Single: [{ paramCount: 1, text: "[].Single()", displayName: "Single()", descriptionStringId: 'XtraEditorsExpressionEditor.SingleAggregate.Description' }],
                            Sum: [{ paramCount: 1, text: "[].Sum()", displayName: "Sum()", descriptionStringId: 'XtraEditorsExpressionEditor.SumAggregate.Description' }],
                        }
                    }, {
                        display: "Date-Time",
                        localizationId: 'XtraEditorsExpressionEditor.functionsTypes.Properties.DateTimeItems',
                        items: {
                            LocalDateTimeThisYear: [{ paramCount: 0, text: "LocalDateTimeThisYear()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeThisYear.Description' }],
                            LocalDateTimeThisMonth: [{ paramCount: 0, text: "LocalDateTimeThisMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeThisMonth.Description' }],
                            LocalDateTimeLastMonth: [{ paramCount: 0, text: "LocalDateTimeLastMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeLastMonth.Description' }],
                            LocalDateTimeLastWeek: [{ paramCount: 0, text: "LocalDateTimeLastWeek()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeLastWeek.Description' }],
                            LocalDateTimeLastYear: [{ paramCount: 0, text: "LocalDateTimeLastYear()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeLastYear.Description' }],
                            LocalDateTimeThisWeek: [{ paramCount: 0, text: "LocalDateTimeThisWeek()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeThisWeek.Description' }],
                            LocalDateTimeYesterday: [{ paramCount: 0, text: "LocalDateTimeYesterday()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeYesterday.Description' }],
                            LocalDateTimeToday: [{ paramCount: 0, text: "LocalDateTimeToday()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeToday.Description' }],
                            LocalDateTimeNow: [{ paramCount: 0, text: "LocalDateTimeNow()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeNow.Description' }],
                            LocalDateTimeTomorrow: [{ paramCount: 0, text: "LocalDateTimeTomorrow()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeTomorrow.Description' }],
                            LocalDateTimeDayAfterTomorrow: [{ paramCount: 0, text: "LocalDateTimeDayAfterTomorrow()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeDayAfterTomorrow.Description' }],
                            LocalDateTimeNextWeek: [{ paramCount: 0, text: "LocalDateTimeNextWeek()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeNextWeek.Description' }],
                            LocalDateTimeTwoMonthsAway: [{ paramCount: 0, text: "LocalDateTimeTwoMonthsAway()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeTwoMonthsAway.Description' }],
                            LocalDateTimeTwoYearsAway: [{ paramCount: 0, text: "LocalDateTimeTwoYearsAway()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeTwoYearsAway.Description' }],
                            LocalDateTimeTwoWeeksAway: [{ paramCount: 0, text: "LocalDateTimeTwoWeeksAway()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeTwoWeeksAway.Description' }],
                            LocalDateTimeNextMonth: [{ paramCount: 0, text: "LocalDateTimeNextMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeNextMonth.Description' }],
                            LocalDateTimeNextYear: [{ paramCount: 0, text: "LocalDateTimeNextYear()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeNextYear.Description' }],
                            LocalDateTimeYearBeforeToday: [{ paramCount: 0, text: "LocalDateTimeYearBeforeToday()", descriptionStringId: 'XtraEditorsExpressionEditor.LocalDateTimeYearBeforeToday.Description' }],
                            IsOutlookIntervalBeyondThisYear: null,
                            IsOutlookIntervalLaterThisYear: null,
                            IsOutlookIntervalLaterThisMonth: null,
                            IsOutlookIntervalNextWeek: null,
                            IsOutlookIntervalLaterThisWeek: null,
                            IsOutlookIntervalTomorrow: null,
                            IsOutlookIntervalToday: null,
                            IsOutlookIntervalYesterday: null,
                            IsOutlookIntervalEarlierThisWeek: null,
                            IsOutlookIntervalLastWeek: null,
                            IsOutlookIntervalEarlierThisMonth: null,
                            IsOutlookIntervalEarlierThisYear: null,
                            IsOutlookIntervalPriorThisYear: null,
                            IsLastMonth: [{ paramCount: 1, text: "IsLastMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.IsLastMonth.Description' }],
                            IsLastYear: [{ paramCount: 1, text: "IsLastYear()", descriptionStringId: 'XtraEditorsExpressionEditor.IsLastYear.Description' }],
                            IsNextMonth: [{ paramCount: 1, text: "IsNextMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.IsNextMonth.Description' }],
                            IsNextYear: [{ paramCount: 1, text: "IsNextYear()", descriptionStringId: 'XtraEditorsExpressionEditor.IsNextYear.Description' }],
                            IsThisWeek: [{ paramCount: 1, text: "IsThisWeek()", descriptionStringId: 'XtraEditorsExpressionEditor.IsThisWeek.Description' }],
                            IsThisMonth: [{ paramCount: 1, text: "IsThisMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.IsThisMonth.Description' }],
                            IsThisYear: [{ paramCount: 1, text: "IsThisYear()", descriptionStringId: 'XtraEditorsExpressionEditor.IsThisYear.Description' }],
                            IsJanuary: [{ paramCount: 1, text: "IsJanuary()", descriptionStringId: 'XtraEditorsExpressionEditor.IsJanuary.Description' }],
                            IsFebruary: [{ paramCount: 1, text: "IsFebruary()", descriptionStringId: 'XtraEditorsExpressionEditor.IsFebruary.Description' }],
                            IsMarch: [{ paramCount: 1, text: "IsMarch()", descriptionStringId: 'XtraEditorsExpressionEditor.IsMarch.Description' }],
                            IsApril: [{ paramCount: 1, text: "IsApril()", descriptionStringId: 'XtraEditorsExpressionEditor.IsApril.Description' }],
                            IsMay: [{ paramCount: 1, text: "IsMay()", descriptionStringId: 'XtraEditorsExpressionEditor.IsMay.Description' }],
                            IsJune: [{ paramCount: 1, text: "IsJune()", descriptionStringId: 'XtraEditorsExpressionEditor.IsJune.Description' }],
                            IsJule: [{ paramCount: 1, text: "IsJule()", descriptionStringId: 'XtraEditorsExpressionEditor.IsJule.Description' }],
                            IsAugust: [{ paramCount: 1, text: "IsAugust()", descriptionStringId: 'XtraEditorsExpressionEditor.IsAugust.Description' }],
                            IsSemptember: [{ paramCount: 1, text: "IsSemptember()", descriptionStringId: 'XtraEditorsExpressionEditor.IsSemptember.Description' }],
                            IsOctober: [{ paramCount: 1, text: "IsOctober()", descriptionStringId: 'XtraEditorsExpressionEditor.IsOctober.Description' }],
                            IsNovember: [{ paramCount: 1, text: "IsNovember()", descriptionStringId: 'XtraEditorsExpressionEditor.IsNovember.Description' }],
                            IsDecember: [{ paramCount: 1, text: "IsDecember()", descriptionStringId: 'XtraEditorsExpressionEditor.IsDecember.Description' }],
                            IsSameDay: [{ paramCount: 2, text: "IsSameDay(, )", descriptionStringId: 'XtraEditorsExpressionEditor.IsSameDay.Description' }],
                            IsYearToDate: [{ paramCount: 1, text: "IsYearToDate()", descriptionStringId: 'XtraEditorsExpressionEditor.IsYearToDate.Description' }],
                            DateDiffTick: [{ paramCount: 2, text: "DateDiffTick(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffTick.Description' }],
                            DateDiffSecond: [{ paramCount: 2, text: "DateDiffSecond(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffSecond.Description' }],
                            DateDiffMilliSecond: [{ paramCount: 2, text: "DateDiffMilliSecond(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffMilliSecond.Description' }],
                            DateDiffMinute: [{ paramCount: 2, text: "DateDiffMinute(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffMinute.Description' }],
                            DateDiffHour: [{ paramCount: 2, text: "DateDiffHour(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffHour.Description' }],
                            DateDiffDay: [{ paramCount: 2, text: "DateDiffDay(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffDay.Description' }],
                            DateDiffMonth: [{ paramCount: 2, text: "DateDiffMonth(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffMonth.Description' }],
                            DateDiffYear: [{ paramCount: 2, text: "DateDiffYear(, )", descriptionStringId: 'XtraEditorsExpressionEditor.DateDiffYear.Description' }],
                            GetDate: [{ paramCount: 1, text: "GetDate()", descriptionStringId: 'XtraEditorsExpressionEditor.GetDate.Description' }],
                            GetMilliSecond: [{ paramCount: 1, text: "GetMilliSecond()", descriptionStringId: 'XtraEditorsExpressionEditor.GetMilliSecond.Description' }],
                            GetSecond: [{ paramCount: 1, text: "GetSecond()", descriptionStringId: 'XtraEditorsExpressionEditor.GetSecond.Description' }],
                            GetMinute: [{ paramCount: 1, text: "GetMinute()", descriptionStringId: 'XtraEditorsExpressionEditor.GetMinute.Description' }],
                            GetHour: [{ paramCount: 1, text: "GetHour()", descriptionStringId: 'XtraEditorsExpressionEditor.GetHour.Description' }],
                            GetDay: [{ paramCount: 1, text: "GetDay()", descriptionStringId: 'XtraEditorsExpressionEditor.GetDay.Description' }],
                            GetMonth: [{ paramCount: 1, text: "GetMonth()", descriptionStringId: 'XtraEditorsExpressionEditor.GetMonth.Description' }],
                            GetYear: [{ paramCount: 1, text: "GetYear()", descriptionStringId: 'XtraEditorsExpressionEditor.GetYear.Description' }],
                            GetDayOfWeek: [{ paramCount: 1, text: "GetDayOfWeek()", descriptionStringId: 'XtraEditorsExpressionEditor.GetDayOfWeek.Description' }],
                            GetDayOfYear: [{ paramCount: 1, text: "GetDayOfYear()", descriptionStringId: 'XtraEditorsExpressionEditor.GetDayOfYear.Description' }],
                            GetTimeOfDay: [{ paramCount: 1, text: "GetTimeOfDay()", descriptionStringId: 'XtraEditorsExpressionEditor.GetTimeOfDay.Description' }],
                            Now: [{ paramCount: 0, text: "Now()", descriptionStringId: 'XtraEditorsExpressionEditor.Now.Description' }],
                            UtcNow: [{ paramCount: 0, text: "UtcNow()", descriptionStringId: 'XtraEditorsExpressionEditor.UtcNow.Description' }],
                            Today: [{ paramCount: 0, text: "Today()", descriptionStringId: 'XtraEditorsExpressionEditor.Today.Description' }],
                            AddTimeSpan: [{ paramCount: 2, text: "AddTimeSpan(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddTimeSpan.Description' }],
                            AddTicks: [{ paramCount: 2, text: "AddTicks(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddTicks.Description' }],
                            AddMilliSeconds: [{ paramCount: 2, text: "AddMilliSeconds(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddMilliSeconds.Description' }],
                            AddSeconds: [{ paramCount: 2, text: "AddSeconds(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddSeconds.Description' }],
                            AddMinutes: [{ paramCount: 2, text: "AddMinutes(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddMinutes.Description' }],
                            AddHours: [{ paramCount: 2, text: "AddHours(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddHours.Description' }],
                            AddDays: [{ paramCount: 2, text: "AddDays(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddDays.Description' }],
                            AddMonths: [{ paramCount: 2, text: "AddMonths(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddMonths.Description' }],
                            AddYears: [{ paramCount: 2, text: "AddYears(, )", descriptionStringId: 'XtraEditorsExpressionEditor.AddYears.Description' }],
                        },
                    }, {
                        display: "Logical",
                        localizationId: 'XtraEditorsExpressionEditor.functionsTypes.Properties.LogicalItems',
                        items: {
                            Iif: [{ paramCount: 3, text: "Iif(, , )", descriptionStringId: 'XtraEditorsExpressionEditor.Iif.Description' }],
                            IsNull: [{ paramCount: 1, text: "IsNull()", descriptionStringId: 'XtraEditorsExpressionEditor.IsNull.Description' }],
                            IsNullOrEmpty: [{ paramCount: 1, text: "IsNullOrEmpty()", descriptionStringId: 'XtraEditorsExpressionEditor.IsNullOrEmpty.Description' }],
                        }
                    }, {
                        display: "Math",
                        localizationId: 'XtraEditorsExpressionEditor.functionsTypes.Properties.MathItems',
                        items: {
                            Abs: [{ paramCount: 1, text: "Abs()", descriptionStringId: 'XtraEditorsExpressionEditor.Abs.Description' }],
                            Sqr: [{ paramCount: 1, text: "Sqr()", descriptionStringId: 'XtraEditorsExpressionEditor.Sqr.Description' }],
                            Cos: [{ paramCount: 1, text: "Cos()", descriptionStringId: 'XtraEditorsExpressionEditor.Cos.Description' }],
                            Sin: [{ paramCount: 1, text: "Sin()", descriptionStringId: 'XtraEditorsExpressionEditor.Sin.Description' }],
                            Atn: [{ paramCount: 1, text: "Atn()", descriptionStringId: 'XtraEditorsExpressionEditor.Atn.Description' }],
                            Exp: [{ paramCount: 1, text: "Exp()", descriptionStringId: 'XtraEditorsExpressionEditor.Exp.Description' }],
                            Log: [
                                { paramCount: 1, text: "Log()", descriptionStringId: 'XtraEditorsExpressionEditor.Log.Description' },
                                { paramCount: 2, text: "Log(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Log2Param.Description' },
                            ],
                            Rnd: [{ paramCount: 0, text: "Rnd()", descriptionStringId: 'XtraEditorsExpressionEditor.Rnd.Description' }],
                            Tan: [{ paramCount: 1, text: "Tan()", descriptionStringId: 'XtraEditorsExpressionEditor.Tan.Description' }],
                            Power: [{ paramCount: 2, text: "Power(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Power.Description' }],
                            Sign: [{ paramCount: 1, text: "Sign()", descriptionStringId: 'XtraEditorsExpressionEditor.Sign.Description' }],
                            Round: [
                                { paramCount: 1, text: "Round()", descriptionStringId: 'XtraEditorsExpressionEditor.Round.Description' },
                                { paramCount: 2, text: "Round(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Round2Param.Description' },
                            ],
                            Ceiling: [{ paramCount: 1, text: "Ceiling()", descriptionStringId: 'XtraEditorsExpressionEditor.Ceiling.Description' }],
                            Floor: [{ paramCount: 1, text: "Floor()", descriptionStringId: 'XtraEditorsExpressionEditor.Floor.Description' }],
                            Max: [{ paramCount: 2, text: "Max(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Max.Description' }],
                            Min: [{ paramCount: 2, text: "Min(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Min.Description' }],
                            Acos: [{ paramCount: 1, text: "Acos()", descriptionStringId: 'XtraEditorsExpressionEditor.Acos.Description' }],
                            Asin: [{ paramCount: 1, text: "Asin()", descriptionStringId: 'XtraEditorsExpressionEditor.Asin.Description' }],
                            Atn2: [{ paramCount: 2, text: "Atn2(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Atn2.Description' }],
                            BigMul: [{ paramCount: 2, text: "BigMul(, )", descriptionStringId: 'XtraEditorsExpressionEditor.BigMul.Description' }],
                            Cosh: [{ paramCount: 1, text: "Cosh()", descriptionStringId: 'XtraEditorsExpressionEditor.Cosh.Description' }],
                            Log10: [{ paramCount: 1, text: "Log10()", descriptionStringId: 'XtraEditorsExpressionEditor.Log10.Description' }],
                            Sinh: [{ paramCount: 1, text: "Sinh()", descriptionStringId: 'XtraEditorsExpressionEditor.Sinh.Description' }],
                            Tanh: [{ paramCount: 1, text: "Tanh()", descriptionStringId: 'XtraEditorsExpressionEditor.Tanh.Description' }],
                            ToInt: [{ paramCount: 1, text: "ToInt()", descriptionStringId: 'XtraEditorsExpressionEditor.ToInt.Description' }],
                            ToLong: [{ paramCount: 1, text: "ToLong()", descriptionStringId: 'XtraEditorsExpressionEditor.ToLong.Description' }],
                            ToFloat: [{ paramCount: 1, text: "ToFloat()", descriptionStringId: 'XtraEditorsExpressionEditor.ToFloat.Description' }],
                            ToDouble: [{ paramCount: 1, text: "ToDouble()", descriptionStringId: 'XtraEditorsExpressionEditor.ToDouble.Description' }],
                            ToDecimal: [{ paramCount: 1, text: "ToDecimal()", descriptionStringId: 'XtraEditorsExpressionEditor.ToDecimal.Description' }],
                        }
                    }, {
                        display: "String",
                        localizationId: 'XtraEditorsExpressionEditor.functionsTypes.Properties.StringItems',
                        items: {
                            Trim: [{ paramCount: 1, text: "Trim()", descriptionStringId: 'XtraEditorsExpressionEditor.Trim.Description' }],
                            Len: [{ paramCount: 1, text: "Len()", descriptionStringId: 'XtraEditorsExpressionEditor.Len.Description' }],
                            Substring: [
                                { paramCount: 3, text: "Substring('', , )", descriptionStringId: 'XtraEditorsExpressionEditor.Substring3param.Description' },
                                { paramCount: 2, text: "Substring('', )", descriptionStringId: 'XtraEditorsExpressionEditor.Substring2param.Description' }
                            ],
                            Upper: [{ paramCount: 1, text: "Upper()", descriptionStringId: 'XtraEditorsExpressionEditor.Upper.Description' }],
                            Lower: [{ paramCount: 1, text: "Lower()", descriptionStringId: 'XtraEditorsExpressionEditor.Lower.Description' }],
                            Concat: [{ paramCount: Infinity, text: "Concat(, )", descriptionStringId: 'XtraEditorsExpressionEditor.Concat.Description' }],
                            Ascii: [{ paramCount: 1, text: "Ascii('')", descriptionStringId: 'XtraEditorsExpressionEditor.Ascii.Description' }],
                            Char: [{ paramCount: 1, text: "Char()", descriptionStringId: 'XtraEditorsExpressionEditor.Char.Description' }],
                            ToStr: [{ paramCount: 1, text: "ToStr()", descriptionStringId: 'XtraEditorsExpressionEditor.ToStr.Description' }],
                            Replace: [{ paramCount: 3, text: "Replace('','', '')", descriptionStringId: 'XtraEditorsExpressionEditor.Replace.Description' }],
                            Reverse: [{ paramCount: 1, text: "Reverse('')", descriptionStringId: 'XtraEditorsExpressionEditor.Reverse.Description' }],
                            Insert: [{ paramCount: 3, text: "Insert('', , '')", descriptionStringId: 'XtraEditorsExpressionEditor.Insert.Description' }],
                            CharIndex: [
                                { paramCount: 2, text: "CharIndex('','')", descriptionStringId: 'XtraEditorsExpressionEditor.CharIndex.Description' },
                                { paramCount: 3, text: "CharIndex('','', )", descriptionStringId: 'XtraEditorsExpressionEditor.CharIndex3Param.Description' }],
                            Remove: [
                                { paramCount: 2, text: "Remove('', )", descriptionStringId: 'XtraEditorsExpressionEditor.Remove2Param.Description' },
                                { paramCount: 3, text: "Remove('', , )", descriptionStringId: 'XtraEditorsExpressionEditor.Remove3Param.Description' }],
                            PadLeft: [
                                { paramCount: 2, text: "PadLeft(, )", descriptionStringId: 'XtraEditorsExpressionEditor.PadLeft.Description' },
                                { paramCount: 3, text: "PadLeft(, , '')", descriptionStringId: 'XtraEditorsExpressionEditor.PadLeft3Param.Description' }
                            ],
                            PadRight: [
                                { paramCount: 2, text: "PadRight(, )", descriptionStringId: 'XtraEditorsExpressionEditor.PadRight.Description' },
                                { paramCount: 3, text: "PadRight(, , '')", descriptionStringId: 'XtraEditorsExpressionEditor.PadRight3Param.Description' }
                            ],
                            StartsWith: [{ paramCount: 2, text: "StartsWith('', '')", descriptionStringId: 'XtraEditorsExpressionEditor.StartsWith.Description' }],
                            EndsWith: [{ paramCount: 2, text: "EndsWith('', '')", descriptionStringId: 'XtraEditorsExpressionEditor.EndsWith.Description' }],
                            Contains: [{ paramCount: 0, text: "Contains('', '')", descriptionStringId: 'XtraEditorsExpressionEditor.Contains.Description' }],
                            Join: [
                                { paramCount: 1, text: "Join()", descriptionStringId: "ExpressionEditorStringId.Function_Join" },
                                { paramCount: 2, text: "Join(, '')", descriptionStringId: "ExpressionEditorStringId.Function_Join_2" }],
                        }
                    }
                ];
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            function getEnumNames(enumType) {
                var result = [];
                for (var enumValue in enumType) {
                    if (isNaN(enumValue)) {
                        result.push(enumValue);
                    }
                }
                return result;
            }
            var CriteriaOperator = (function () {
                function CriteriaOperator() {
                    var _this = this;
                    this.type = "Default";
                    this.operands = null;
                    this.changeValueType = function (type, location) {
                        var result = new type();
                        if (location.index !== null) {
                            _this[location.name][location.index] = result;
                        }
                        else {
                            _this[location.name] = result;
                        }
                        return result;
                    };
                    this.changeValue = function (operand, reverse, location) {
                        var result = reverse ? new Criteria.UnaryOperator(Criteria.UnaryOperatorType.Minus, operand) : operand;
                        if (location.index !== null) {
                            _this[location.name][location.index] = result;
                        }
                        else {
                            _this[location.name] = result;
                        }
                        return result;
                    };
                    this.assignLeftPart = function (criteriaOperator) { return void 0; };
                    this.assignRightPart = function (criteriaOperator) { return void 0; };
                    this.assignType = function (type) {
                        _this.operatorType = type;
                    };
                    this.resetrightPart = function (value) { return void 0; };
                }
                CriteriaOperator.operators = function (enums) {
                    var result = [].concat.apply([], enums.map(function (enumType) {
                        return getEnumNames(enumType).map(function (enumName) {
                            return { name: enumName, value: enumType[enumName], type: enumType };
                        });
                    }));
                    return result;
                };
                CriteriaOperator.parse = function (stringCriteria) {
                    if (stringCriteria && stringCriteria !== "") {
                        return Criteria["criteriaparser"].parse(stringCriteria);
                    }
                    return null;
                };
                CriteriaOperator.create = function (operatorType) {
                    var operator = null;
                    switch (operatorType.type) {
                        case Criteria.BinaryOperatorType:
                            operator = new Criteria.BinaryOperator(new Criteria.OperandProperty(), new Criteria.OperandValue(), operatorType.value);
                            break;
                        case Criteria.GroupOperatorType:
                            operator = new Criteria.GroupOperator(operatorType.value, []);
                            break;
                        case Criteria.FunctionOperatorType:
                            operator = new Criteria.FunctionOperator(operatorType.value, [new Criteria.OperandProperty()]);
                            break;
                        case Criteria.BetweenOperator:
                            operator = new Criteria.BetweenOperator(new Criteria.OperandProperty(), new Criteria.OperandValue(), new Criteria.OperandValue());
                            break;
                        case Criteria.InOperator:
                            operator = new Criteria.InOperator(new Criteria.OperandProperty(), [new Criteria.OperandValue()]);
                            break;
                        case Criteria.UnaryOperatorType:
                            operator = new Criteria.UnaryOperator(operatorType.value, new Criteria.OperandProperty());
                            break;
                        case Criteria.Aggregate:
                            var result = new Criteria.AggregateOperand(new Criteria.OperandProperty(), null, operatorType.value, new Criteria.GroupOperator(Criteria.GroupOperatorType.And, []));
                            if (operatorType.value === Criteria.Aggregate.Exists) {
                                operator = result;
                            }
                            else {
                                if (operatorType.value !== Criteria.Aggregate.Count) {
                                    result.aggregatedExpression = new Criteria.OperandProperty();
                                }
                                operator = new Criteria.BinaryOperator(result, new Criteria.OperandValue(), Criteria.BinaryOperatorType.Equal);
                            }
                            break;
                        default:
                            throw Error("Unsupported operator type");
                    }
                    if (operatorType.reverse) {
                        return new Criteria.UnaryOperator(Criteria.UnaryOperatorType.Not, operator);
                    }
                    return operator;
                };
                CriteriaOperator.and = function (left, right) {
                    return Criteria.GroupOperator.combine(Criteria.GroupOperatorType.Or, [left, right]);
                };
                CriteriaOperator.or = function (left, right) {
                    return Criteria.GroupOperator.combine(Criteria.GroupOperatorType.Or, [left, right]);
                };
                CriteriaOperator.getNotValidRange = function (value, errorMessage) {
                    var start = 0;
                    var end = 0;
                    var parts = errorMessage.split('\n');
                    var errorText = parts[1];
                    var errorLength = parts[2].length;
                    if (errorText.indexOf('...') === 0) {
                        errorText = errorText.split("...")[1];
                    }
                    var start = value.indexOf(errorText);
                    var end = start + errorLength;
                    return { start: start, end: end };
                };
                Object.defineProperty(CriteriaOperator.prototype, "displayType", {
                    get: function () {
                        return this.operatorType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperator.prototype, "enumType", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperator.prototype, "leftPart", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperator.prototype, "rightPart", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                CriteriaOperator.prototype.assignFrom = function (criteriaOperator, incorrectSpecificsForAggregate) {
                    if (incorrectSpecificsForAggregate === void 0) { incorrectSpecificsForAggregate = false; }
                    var operator = criteriaOperator;
                    if (criteriaOperator instanceof Criteria.UnaryOperator && !(criteriaOperator.leftPart instanceof Criteria.OperandProperty)) {
                        operator = criteriaOperator.leftPart;
                    }
                    if (incorrectSpecificsForAggregate) {
                        this.assignLeftPart(operator.leftPart);
                    }
                    else {
                        this.assignLeftPart(operator);
                    }
                    if (operator.rightPart) {
                        this.assignRightPart(operator);
                    }
                };
                CriteriaOperator.prototype.children = function () {
                    var operands = [];
                    if (this.leftPart)
                        operands.push.apply(operands, $.isArray(this.leftPart) ? this.leftPart : [this.leftPart]);
                    if (this.rightPart)
                        operands.push.apply(operands, $.isArray(this.rightPart) ? this.rightPart : [this.rightPart]);
                    return operands;
                };
                CriteriaOperator.prototype.accept = function (visitor) { throw "Not implemented"; };
                return CriteriaOperator;
            })();
            Criteria.CriteriaOperator = CriteriaOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../utils.ts" />
/// <reference path="../expressioneditor/tools/functions.ts" />
/// <reference path="../expressioneditor/tools/operatorNames.ts" />
/// <reference path="../criteria/operators/criteriaOperator.ts" />
/// <reference path="pathRequest.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var CodeCompletor = (function (_super) {
                __extends(CodeCompletor, _super);
                function CodeCompletor(_options) {
                    var _this = this;
                    _super.call(this);
                    this._options = _options;
                    this._contextPath = null;
                    this._isInContext = function () { return _this._contextPath !== null; };
                    this._getPath = function () { return _this._contextPath ? _this._path() + "." + _this._contextPath : _this._path(); };
                    this.identifierRegexps = [/\./, /\[/];
                    this._fieldListProvider = _options.fieldListProvider;
                    this._path = _options.path;
                    this._editor = _options.editor;
                    this._functions = ko.computed(function () { return ko.unwrap(_options.functions) || Widgets.Internal.functionDisplay; });
                    this._rootItems = _options.rootItems || [{ name: "Parameters", needPrefix: true }];
                    this._disposables.push(this._functions);
                }
                CodeCompletor.prototype._previousSymbol = function () {
                    var cursorPosition = this._editor.getCursorPosition();
                    return this._editor.session.getLine(cursorPosition.row)[cursorPosition.column - 1];
                };
                CodeCompletor.prototype.beforeInsertMatch = function (editor, token, parentPrefix) {
                    var cursorPosition = editor.getCursorPosition();
                    token = token || editor.session.getTokenAt(cursorPosition.row, cursorPosition.column);
                    if (!token)
                        return;
                    var endColumn = null;
                    if (token.type === "support.variable" || token.type === "support.function") {
                        endColumn = Math.max(token.start + token.value.length, cursorPosition.column);
                    }
                    else if (token.type === "support.context.start" && cursorPosition.column < token.start + token.value.length) {
                        endColumn = token.start + token.value.length - 1;
                    }
                    if (endColumn !== null)
                        editor.session.remove({
                            start: { column: token.start || 0, row: cursorPosition.row },
                            end: { column: endColumn, row: cursorPosition.row }
                        });
                };
                CodeCompletor.prototype.insertMatch = function (editor, parentPrefix, fieldName) {
                    editor.insert("[" + (parentPrefix || "") + fieldName + "]");
                };
                CodeCompletor.prototype.generateFieldDisplayName = function (parentPrefix, displayName) {
                    return "[" + displayName + "]";
                };
                CodeCompletor.prototype._convertDataMemberInfoToCompletions = function (fields, token, parentPrefix) {
                    var _this = this;
                    if (parentPrefix === void 0) { parentPrefix = ""; }
                    return (fields || []).map(function (field) {
                        var displayName = _this.generateFieldDisplayName(parentPrefix, field.displayName);
                        return {
                            caption: field.displayName || field.name,
                            snippet: displayName,
                            meta: Analytics.Utils.isList(field) && Analytics.getLocalization("list", "DxDesignerStringId.CodeCompletion_List") || Analytics.getLocalization("field", "DxDesignerStringId.CodeCompletion_Field"),
                            score: Analytics.Utils.isList(field) && 200 || 100,
                            completer: {
                                insertMatch: function (editor, data) {
                                    _this.beforeInsertMatch(editor, token, parentPrefix);
                                    _this.insertMatch(editor, parentPrefix, _this._options.getRealExpression ? (field.displayName || field.name) : field.name);
                                }
                            }
                        };
                    });
                };
                CodeCompletor.prototype._combinePath = function (parentPrefix) {
                    var path = this._getPath();
                    if (parentPrefix) {
                        var rootItem = this._rootItems.filter(function (item) { return parentPrefix.indexOf(item.name) === 0; })[0];
                        if (rootItem && rootItem.rootPath)
                            path = [rootItem.rootPath, parentPrefix].join('.');
                        else
                            path = [path, parentPrefix].join('.');
                    }
                    return path;
                };
                CodeCompletor.prototype._getParentPrefix = function (token) {
                    var position = this._editor.getCursorPosition().column - token.start - 1;
                    var dotIndex = token.value.lastIndexOf(".", position);
                    var closeIndex = token.value.lastIndexOf("]", position);
                    dotIndex = Math.max(closeIndex, dotIndex);
                    var startIndex = token.type === "support.variable" || token.type === "support.context.start" ? 1 : 0;
                    var parentPrefix = token.value.substring(startIndex, dotIndex);
                    if (parentPrefix[0] === "[")
                        parentPrefix = parentPrefix.substr(1);
                    if (parentPrefix[parentPrefix.length - 1] === "]")
                        parentPrefix = parentPrefix.substring(0, parentPrefix.length - 1);
                    return parentPrefix;
                };
                CodeCompletor.prototype._getRealPath = function (path) {
                    var pathArray = path.split('.');
                    var $deferred = $.Deferred();
                    if (this._options.getRealExpression) {
                        this._options.getRealExpression(pathArray[0], this.generateFieldDisplayName(null, pathArray.splice(1).join('.'))).done(function (result) {
                            result = result.slice(1, result.length - 1);
                            $deferred.resolve(result && [pathArray[0], result].join('.') || pathArray[0]);
                        }).fail(function () { $deferred.resolve(path); });
                    }
                    else {
                        $deferred.resolve(path);
                    }
                    return $deferred.promise();
                };
                CodeCompletor.prototype._getFields = function (token, completions, ignorePrefix) {
                    var _this = this;
                    if (token === void 0) { token = null; }
                    if (completions === void 0) { completions = []; }
                    if (ignorePrefix === void 0) { ignorePrefix = false; }
                    var $deferred = $.Deferred();
                    var parentPrefix = undefined;
                    if (token && (token.type === "support.variable" || token.type === "support.function" || token.type === "support.context.start")) {
                        parentPrefix = this._getParentPrefix(token);
                    }
                    this._getRealPath(this._combinePath(parentPrefix)).done(function (path) {
                        var $fields = ko.unwrap(_this._fieldListProvider).getItems(new Analytics.Utils.PathRequest(path))
                            .done(function (fields) {
                            completions.push.apply(completions, _this._convertDataMemberInfoToCompletions(CodeCompletor._cleanupFields(fields), token, ignorePrefix ? null : parentPrefix && parentPrefix + "."));
                        });
                        var $deferreds = [$fields];
                        if (!parentPrefix) {
                            _this._rootItems.forEach(function (item) {
                                $deferreds.push(ko.unwrap(_this._fieldListProvider).getItems(new Analytics.Utils.PathRequest(item.rootPath || item.name))
                                    .done(function (fields) {
                                    completions.push.apply(completions, _this._convertDataMemberInfoToCompletions(CodeCompletor._cleanupFields(fields), token, item.needPrefix ? item.name + "." : ""));
                                }));
                            });
                        }
                        $.when($deferreds).always(function () { $deferred.resolve(completions); });
                    });
                    return $deferred.promise();
                };
                CodeCompletor._cleanupFields = function (fields) {
                    return fields.filter(function (x) { return x.specifics !== "parameters" && x.specifics !== "none"; });
                };
                CodeCompletor.prototype.getFunctionsCompletions = function () {
                    var functions = [];
                    var functionsWithoutAggregates = ko.unwrap(this._functions).filter(function (fnDisplay) { return fnDisplay.category !== "Aggregate"; });
                    functionsWithoutAggregates.forEach(function (fnDisplay) {
                        Object.keys(fnDisplay.items).forEach(function (fnKey) {
                            if (fnDisplay.items[fnKey]) {
                                functions.push(createFunctionCompletion(fnDisplay.items[fnKey][0], fnKey));
                            }
                        });
                    });
                    return functions;
                };
                CodeCompletor.prototype.getAggregateCompletions = function () {
                    var functions = [];
                    var aggregates = ko.unwrap(this._functions).filter(function (fnDisplay) { return fnDisplay.category === "Aggregate"; })[0];
                    Object.keys(aggregates.items).forEach(function (fnKey) {
                        if (aggregates.items[fnKey]) {
                            functions.push(createFunctionCompletion(aggregates.items[fnKey][0], fnKey, fnKey + "()"));
                        }
                    });
                    return functions;
                };
                CodeCompletor.prototype.getOperatorCompletions = function (prefix) {
                    return Widgets.Internal.operatorNames.map(function (operator) {
                        return { caption: operator.text, snippet: prefix + operator.text, meta: Analytics.getLocalization("operator", "DxDesignerStringId.CodeCompletion_Operator") };
                    });
                };
                CodeCompletor.prototype._addFunctions = function (completions) {
                    completions.push.apply(completions, this.getFunctionsCompletions());
                };
                CodeCompletor.prototype._addAggregates = function (completions) {
                    completions.push.apply(completions, this.getAggregateCompletions());
                };
                CodeCompletor.prototype._addOperators = function (completions, text) {
                    var prefix = /\s/.test(text[text.length - 1]) ? "" : " ";
                    completions.push.apply(completions, this.getOperatorCompletions(prefix));
                };
                CodeCompletor.prototype._getOperands = function (token) {
                    if (token === void 0) { token = null; }
                    var result = [];
                    this._addFunctions(result);
                    return this._getFields(token, result);
                };
                CodeCompletor.prototype._getOperandsOrOperators = function (text, completions) {
                    var exceptionInfo;
                    try {
                        Analytics.Criteria.CriteriaOperator.parse(text);
                    }
                    catch (exception) {
                        exceptionInfo = exception.hash;
                    }
                    var trimmedText = text.trim();
                    var lastNonSpaceSymbol = trimmedText[trimmedText.length - 1];
                    if (!exceptionInfo && trimmedText || (lastNonSpaceSymbol === "]" || lastNonSpaceSymbol === ")")) {
                        this._addOperators(completions, text);
                    }
                    else {
                        return this._getOperands();
                    }
                };
                CodeCompletor.prototype._findStartContextTokenPosition = function (tokens, index) {
                    var blocks = 0;
                    var path = [];
                    for (var i = index; i > -1; i--) {
                        if (tokens[i].type === "support.context.end") {
                            blocks++;
                        }
                        else if (tokens[i].type === "support.context.start") {
                            if (blocks > 0)
                                blocks--;
                            else
                                return i;
                        }
                    }
                };
                CodeCompletor.prototype._findOpenedStartContext = function (tokens, index) {
                    var openedContextIndexes = [];
                    var contextItems = tokens.filter(function (token, tokenIndex) { return (token.type === "support.context.start" || token.type === "support.context.end") && tokenIndex < index; });
                    for (var i = 0; i < contextItems.length; i++) {
                        if (contextItems[i].type === "support.context.start") {
                            openedContextIndexes.push(tokens.indexOf(contextItems[i]));
                        }
                        else {
                            openedContextIndexes.pop();
                        }
                    }
                    return openedContextIndexes;
                };
                CodeCompletor.prototype._findOpenedAggregates = function (tokens, index) {
                    var openedAggregatesIndexes = [];
                    var aggregates = tokens.filter(function (token, tokenIndex) { return token.type === "support.other.aggregate" && tokenIndex < index; });
                    if (aggregates.length > 0) {
                        var currentToken = tokens[index];
                        var currentCursorPosition = this._editor.getCursorPosition().column - (currentToken && currentToken.start || 0);
                        for (var i = aggregates.length - 1; i > -1; i--) {
                            var aggregateIndex = tokens.indexOf(aggregates[i]);
                            var openBrace = 0;
                            var closeBrace = 0;
                            var isClosedAggregate = false;
                            if (aggregateIndex + 1 === index && tokens[aggregateIndex + 1].value.substr(0, currentCursorPosition).indexOf("()") !== -1 ||
                                aggregateIndex + 1 < index && tokens[aggregateIndex + 1].value.indexOf("()") !== -1) {
                                isClosedAggregate = true;
                                index = aggregateIndex;
                                continue;
                            }
                            for (var j = aggregateIndex; j < index; j++) {
                                if (tokens[j].value.trim() === "(") {
                                    openBrace++;
                                }
                                else if (tokens[j].value.trim() === ")") {
                                    closeBrace++;
                                }
                                if (openBrace === closeBrace && openBrace !== 0) {
                                    isClosedAggregate = true;
                                    break;
                                }
                            }
                            if (!isClosedAggregate)
                                openedAggregatesIndexes.splice(0, 0, aggregateIndex);
                            index = aggregateIndex;
                        }
                    }
                    return openedAggregatesIndexes;
                };
                CodeCompletor.prototype._getContextPath = function (tokens, currentPosition) {
                    var path = [];
                    var openedAggregatePositions = this._findOpenedAggregates(tokens, currentPosition);
                    var openedContextPositions = this._findOpenedStartContext(tokens, currentPosition);
                    var contextPath = openedContextPositions.concat.apply(openedContextPositions, openedAggregatePositions).sort(function (a, b) { return a - b; });
                    if (contextPath.length > 0) {
                        for (var i = 0; i < contextPath.length; i++) {
                            if (tokens[contextPath[i]].type === "support.other.aggregate") {
                                if (tokens[contextPath[i] - 1].type === "support.context.end") {
                                    var startContextToken = this._findStartContextTokenPosition(tokens, contextPath[i] - 2);
                                    var member = trimBrackets(tokens[startContextToken].value.match(/^\[(?:[^\]\)])*\]/)[0]);
                                    path.push(member);
                                }
                                else if (tokens[contextPath[i] - 1].type === "support.variable") {
                                    path.push(trimBrackets(tokens[contextPath[i] - 1].value));
                                }
                            }
                            else {
                                var member = trimBrackets(tokens[contextPath[i]].value.match(/^\[(?:[^\]\)])*\]/)[0]);
                                path.push(member);
                            }
                        }
                    }
                    return path.filter(function (x) { return !!x; }).join('.');
                };
                CodeCompletor.prototype._getCompletions = function (editor, session, pos, prefix) {
                    var $deferred;
                    var completions = [];
                    var currentToken = session.getTokenAt(pos.row, pos.column);
                    var text = editor.session.getLine(pos.row).substring(0, pos.column);
                    var tokens = session.getTokens(pos.row);
                    var currentTokenIndex = currentToken ? currentToken.index : -1;
                    this._contextPath = this._getContextPath(tokens, currentTokenIndex);
                    if (!currentToken) {
                        $deferred = this._getOperands();
                    }
                    else if (currentToken.type === "support.context.start") {
                        var ignorePrefix = this._editor.getCursorPosition().column - currentToken.start === currentToken.value.length;
                        if (ignorePrefix) {
                            var functions = [];
                            this._addFunctions(functions);
                        }
                        $deferred = this._getFields(currentToken, functions, ignorePrefix);
                    }
                    else if (currentToken.type === "string.quoted.single") {
                    }
                    else if (currentToken.type === "support.variable") {
                        $deferred = this._getFields(currentToken);
                    }
                    else if (currentToken.type === "support.function") {
                        $deferred = this.defaultProcess(currentToken, text.substring(0, currentToken.start), completions);
                    }
                    else if (currentToken.type === "support.other.aggregate") {
                        var previousToken = tokens[currentTokenIndex - 1];
                        this._addAggregates(completions);
                        if (trimBrackets(previousToken.value).trim()) {
                            $deferred = this._getFields({
                                start: (currentToken.start - (previousToken.value || "").length) || 0,
                                value: previousToken.value + currentToken.value,
                                type: "support.function"
                            }, completions);
                        }
                    }
                    else {
                        $deferred = this.defaultProcess(currentToken, text, completions);
                    }
                    return $deferred ? $deferred.promise() : $.Deferred().resolve(completions).promise();
                };
                CodeCompletor.prototype.defaultProcess = function (token, text, completions) {
                    return this._getOperandsOrOperators(text, completions);
                };
                CodeCompletor.prototype.getCompletions = function (aceEditor, session, pos, prefix, callback) {
                    this._getCompletions(aceEditor, session, pos, prefix).done(function (completions) {
                        callback(null, completions);
                    });
                };
                CodeCompletor.prototype.getDocTooltip = function (item) {
                    if (item.tooltip && !item.docHTML) {
                        item.docHTML = [
                            item.tooltip
                        ].join("");
                    }
                };
                return CodeCompletor;
            })(Analytics.Utils.Disposable);
            Widgets.CodeCompletor = CodeCompletor;
            function createFunctionCompletion(fnInfo, name, insertValue) {
                if (insertValue === void 0) { insertValue = null; }
                var insertValue = insertValue || fnInfo.text;
                return {
                    caption: name,
                    snippet: insertValue,
                    meta: Analytics.getLocalization("function", "DxDesignerStringId.CodeCompletion_Function"),
                    tooltip: fnInfo.description || DevExpress.Analytics.getLocalization(fnInfo.text, fnInfo.descriptionStringId) || null,
                    score: 10,
                    completer: {
                        insertMatch: function (editor, data) {
                            var completions = editor.completer.completions;
                            if (completions.filterText) {
                                var ranges = editor.selection.getAllRanges();
                                for (var i = 0, range; range = ranges[i]; i++) {
                                    range.start.column -= completions.filterText.length;
                                    editor.session.remove(range);
                                }
                            }
                            if (insertValue.substr(0, 3) === "[].") {
                                var ranges = editor.selection.getAllRanges();
                                for (var i = 0, range; range = ranges[i]; i++) {
                                    range.start.column -= 2;
                                    if (editor.session.getTextRange(range) === "].")
                                        insertValue = insertValue.substr(3);
                                }
                            }
                            editor.insert(insertValue);
                            Analytics.Utils.setCursorInFunctionParameter(fnInfo.paramCount, editor, insertValue);
                        }
                    }
                };
            }
            Widgets.createFunctionCompletion = createFunctionCompletion;
            function trimBrackets(value) {
                return value.substring(value[0] === "[" ? 1 : 0, value[value.length - 1] === "]" ? value.length - 1 : value.length);
            }
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var Utils;
            (function (Utils) {
                Utils.operatorTokens = {
                    "Plus": "+",
                    "Minus": "-",
                    "Equal": "=",
                    "NotEqual": "<>",
                    "Greater": ">",
                    "Less": "<",
                    "LessOrEqual": "<=",
                    "GreaterOrEqual": ">="
                };
                function criteriaForEach(operator, callback, path) {
                    if (path === void 0) { path = ""; }
                    callback(operator, path);
                    if (operator instanceof Criteria.AggregateOperand) {
                        operator.leftPart && criteriaForEach(operator.leftPart, callback, path);
                        if (operator.leftPart && operator.leftPart["propertyName"]) {
                            path = path ? [path, operator.leftPart["propertyName"]].join('.') : operator.leftPart["propertyName"];
                        }
                    }
                    operator.children().forEach(function (item) { return criteriaForEach(item, callback, path); });
                }
                Utils.criteriaForEach = criteriaForEach;
            })(Utils = Criteria.Utils || (Criteria.Utils = {}));
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var OperandProperty = (function (_super) {
                __extends(OperandProperty, _super);
                function OperandProperty(propertyName, startColumn, startLine) {
                    if (propertyName === void 0) { propertyName = ""; }
                    if (startColumn === void 0) { startColumn = -1; }
                    if (startLine === void 0) { startLine = -1; }
                    _super.call(this);
                    this.type = "Property";
                    this.propertyName = propertyName;
                    this.startPosition = { column: startColumn, line: startLine };
                }
                Object.defineProperty(OperandProperty.prototype, "displayType", {
                    get: function () {
                        return '[' + this.propertyName + ']';
                    },
                    enumerable: true,
                    configurable: true
                });
                OperandProperty.prototype.accept = function (visitor) {
                    return visitor.visitOperandProperty
                        ? visitor.visitOperandProperty(this)
                        : new OperandProperty(this.propertyName);
                };
                return OperandProperty;
            })(Criteria.CriteriaOperator);
            Criteria.OperandProperty = OperandProperty;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../criteria/operators/criteriaOperator.ts" />
///<reference path="../criteria/utils.ts" />
///<reference path="../utils.ts" />
///<reference path="../criteria/operators/property.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var DisplayExpressionConverter = (function () {
                function DisplayExpressionConverter(displayNameProvider) {
                    this.displayNameProvider = displayNameProvider;
                }
                DisplayExpressionConverter.prototype._replaceNames = function (path, expression, getDisplayExpression) {
                    var _this = this;
                    var def = $.Deferred();
                    if (!expression)
                        return def.resolve("").promise();
                    try {
                        var expressionCriteria = Analytics.Criteria.CriteriaOperator.parse(expression);
                    }
                    catch (e) {
                        return def.reject().promise();
                    }
                    var requests = [];
                    var result = [];
                    Analytics.Criteria.Utils.criteriaForEach(expressionCriteria, function (operator, innerPath) {
                        if (operator instanceof Analytics.Criteria.OperandProperty) {
                            var isContainsParentRelationshipTraversalOperator = operator.propertyName.indexOf("^.") === 0;
                            var propertyName = isContainsParentRelationshipTraversalOperator ? operator.propertyName.substring(2) : operator.propertyName;
                            propertyName = innerPath ? [innerPath, propertyName].join('.') : propertyName;
                            var request = getDisplayExpression ? _this.displayNameProvider.getDisplayNameByPath(path, propertyName) :
                                _this.displayNameProvider.getRealName(path, propertyName);
                            requests.push(request.done(function (data) {
                                var convertedName = isContainsParentRelationshipTraversalOperator ? "^." + data : data;
                                convertedName = innerPath ? convertedName.split('.').slice(innerPath.split('.').length).join('.') : convertedName;
                                result.push({
                                    operand: operator,
                                    convertedName: convertedName
                                });
                            }));
                        }
                    });
                    if (requests.length === 0) {
                        def.resolve(expression);
                    }
                    else {
                        var processedRequestsCount = 0;
                        var onAlways = function () {
                            if (++processedRequestsCount < requests.length)
                                return;
                            var lines = expression.split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                var operands = result.filter(function (value) { return value.operand.startPosition.line === i; });
                                for (var j = 0, delta = 0; j < operands.length; j++) {
                                    var column = operands[j].operand.startPosition.column;
                                    var originalName = operands[j].operand.propertyName;
                                    var convertedName = operands[j].convertedName;
                                    if (!originalName || column < 0)
                                        continue;
                                    lines[i] = lines[i].substring(0, column + delta) + convertedName + lines[i].substring(column + originalName.length + delta);
                                    delta += convertedName.length - originalName.length;
                                }
                            }
                            def.resolve(lines.join('\n'));
                        };
                        requests.forEach(function (r) { return r.always(onAlways); });
                    }
                    return def.promise();
                };
                DisplayExpressionConverter.prototype.toDisplayExpression = function (path, expression) {
                    return this._replaceNames(path, expression, true);
                };
                DisplayExpressionConverter.prototype.toRealExpression = function (path, expression) {
                    return this._replaceNames(path, expression, false);
                };
                return DisplayExpressionConverter;
            })();
            Utils.DisplayExpressionConverter = DisplayExpressionConverter;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="operators/criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var CriteriaOperatorPreprocessor = (function () {
                function CriteriaOperatorPreprocessor() {
                    this._func = [];
                }
                CriteriaOperatorPreprocessor.prototype.CriteriaOperator = function () {
                    return new Criteria.CriteriaOperator();
                };
                CriteriaOperatorPreprocessor.prototype.BinaryOperator = function (options) {
                    return new Criteria.BinaryOperator(options.left, options.right, options.operatorType);
                };
                CriteriaOperatorPreprocessor.prototype.FunctionOperator = function (options) {
                    return new Criteria.FunctionOperator(options.operatorType, options.operands);
                };
                CriteriaOperatorPreprocessor.prototype.AggregateOperand = function (options) {
                    return new Criteria.AggregateOperand(options.property, options.aggregatedExpression, options.aggregateType, options.condition);
                };
                CriteriaOperatorPreprocessor.prototype.GroupOperator = function (options) {
                    return new Criteria.GroupOperator(options.operation, options.operands);
                };
                CriteriaOperatorPreprocessor.prototype.InOperator = function (options) {
                    return new Criteria.InOperator(options.criteriaOperator, options.operands);
                };
                CriteriaOperatorPreprocessor.prototype.ConstantValue = function (options) {
                    return new Criteria.ConstantValue(options.value);
                };
                CriteriaOperatorPreprocessor.prototype.OperandValue = function (options) {
                    return new Criteria.OperandValue(options.value);
                };
                CriteriaOperatorPreprocessor.prototype.OperandParameter = function (options) {
                    return new Criteria.OperandParameter(options.parameterName, options.value);
                };
                CriteriaOperatorPreprocessor.prototype.OperandProperty = function (options) {
                    return new Criteria.OperandProperty(options.propertyName, options.startColumn, options.startLine);
                };
                CriteriaOperatorPreprocessor.prototype.UnaryOperator = function (options) {
                    return new Criteria.UnaryOperator(options.operatorType, options.operator);
                };
                CriteriaOperatorPreprocessor.prototype.BetweenOperator = function (options) {
                    return new Criteria.BetweenOperator(options.property, options.begin, options.end);
                };
                CriteriaOperatorPreprocessor.prototype.JoinOperator = function (options) {
                    return new Criteria.JoinOperand(options.joinTypeName, options.condition, options.type, options.aggregated);
                };
                CriteriaOperatorPreprocessor.prototype.addListener = function (func) {
                    var index = this._func.indexOf(func);
                    if (index === -1) {
                        this._func.push(func);
                    }
                };
                CriteriaOperatorPreprocessor.prototype.removeListener = function (func) {
                    var index = this._func.indexOf(func);
                    if (index !== -1) {
                        this._func.splice(index, 1);
                    }
                };
                CriteriaOperatorPreprocessor.prototype.process = function (operatorType, options) {
                    var operand = this.CriteriaOperator();
                    switch (operatorType) {
                        case "join":
                            operand = this.JoinOperator(options);
                            break;
                        case "between":
                            operand = this.BetweenOperator(options);
                            break;
                        case "unary":
                            operand = this.UnaryOperator(options);
                            break;
                        case "property":
                            operand = this.OperandProperty(options);
                            break;
                        case "parameter":
                            operand = this.OperandParameter(options);
                            break;
                        case "value":
                            operand = this.OperandValue(options);
                            break;
                        case "in":
                            operand = this.InOperator(options);
                            break;
                        case "function":
                            operand = this.FunctionOperator(options);
                            break;
                        case "unary":
                            operand = this.UnaryOperator(options);
                            break;
                        case "group":
                            operand = this.GroupOperator(options);
                            break;
                        case "binary":
                            operand = this.BinaryOperator(options);
                            break;
                        case "const":
                            operand = this.ConstantValue(options);
                            break;
                        case "aggregate":
                            operand = this.AggregateOperand(options);
                            break;
                    }
                    this._func.forEach(function (func) { operand = func(operand, { operatorType: operatorType, options: options }); });
                    return operand;
                };
                return CriteriaOperatorPreprocessor;
            })();
            Criteria.CriteriaOperatorPreprocessor = CriteriaOperatorPreprocessor;
            Criteria.criteriaCreator = new CriteriaOperatorPreprocessor();
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            (function (Aggregate) {
                Aggregate[Aggregate["Count"] = 0] = "Count";
                Aggregate[Aggregate["Exists"] = 1] = "Exists";
                Aggregate[Aggregate["Min"] = 2] = "Min";
                Aggregate[Aggregate["Max"] = 3] = "Max";
                Aggregate[Aggregate["Avg"] = 4] = "Avg";
                Aggregate[Aggregate["Sum"] = 5] = "Sum";
                Aggregate[Aggregate["Single"] = 6] = "Single";
            })(Criteria.Aggregate || (Criteria.Aggregate = {}));
            var Aggregate = Criteria.Aggregate;
            var AggregateOperand = (function (_super) {
                __extends(AggregateOperand, _super);
                function AggregateOperand(property, aggregatedExpression, aggregateType, condition) {
                    var _this = this;
                    _super.call(this);
                    this.change = function (operationType, item) {
                        var operator = null;
                        if (operationType.type === Criteria.GroupOperatorType) {
                            operator = Criteria.CriteriaOperator.create(operationType);
                            if (operationType.type !== operator.enumType) {
                                operator.leftPart.assignFrom(item);
                            }
                            else {
                                operator.assignFrom(item);
                            }
                            _this.condition = operator;
                        }
                        return operator;
                    };
                    this.assignLeftPart = function (criteriaOperator) {
                        if (criteriaOperator.leftPart instanceof AggregateOperand) {
                            _this.assignFrom(criteriaOperator.leftPart);
                        }
                        else {
                            if (Criteria.CriteriaOperator instanceof AggregateOperand) {
                                _this.property = criteriaOperator.property;
                                if (_this.aggregatedExpression && criteriaOperator.aggregatedExpression) {
                                    _this.aggregatedExpression = criteriaOperator.aggregatedExpression;
                                }
                                _this.condition = criteriaOperator.property;
                            }
                            else {
                                _this.property = criteriaOperator.leftPart;
                            }
                        }
                    };
                    this.type = "Aggregate";
                    this.property = property;
                    if (condition instanceof Criteria.GroupOperator) {
                        this.condition = condition;
                    }
                    else {
                        if (condition instanceof Criteria.UnaryOperator && condition.operatorType === Criteria.UnaryOperatorType.Not) {
                            if (condition.operand instanceof Criteria.GroupOperator) {
                                this.condition = new Criteria.UnaryOperator(Criteria.UnaryOperatorType.Not, condition.operand);
                            }
                            else {
                                this.condition = new Criteria.UnaryOperator(Criteria.UnaryOperatorType.Not, new Criteria.GroupOperator(Criteria.GroupOperatorType.And, condition.operand ? [condition.operand] : []));
                            }
                        }
                        else {
                            this.condition = new Criteria.GroupOperator(Criteria.GroupOperatorType.And, condition ? [condition] : []);
                        }
                    }
                    this.operatorType = aggregateType;
                    this.aggregatedExpression = aggregatedExpression;
                }
                Object.defineProperty(AggregateOperand.prototype, "displayType", {
                    get: function () {
                        return Aggregate[this.operatorType];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AggregateOperand.prototype, "enumType", {
                    get: function () {
                        return Aggregate;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AggregateOperand.prototype, "leftPart", {
                    get: function () {
                        return this.property;
                    },
                    enumerable: true,
                    configurable: true
                });
                AggregateOperand.prototype.children = function () {
                    var operands = [];
                    this.condition && operands.push(this.condition);
                    this.aggregatedExpression && operands.push(this.aggregatedExpression);
                    return operands;
                };
                AggregateOperand.prototype.accept = function (visitor) {
                    return visitor.visitAggregateOperand
                        ? visitor.visitAggregateOperand(this)
                        : new AggregateOperand(this.property && this.property.accept(visitor), this.aggregatedExpression && this.aggregatedExpression.accept(visitor), this.operatorType, this.condition && this.condition.accept(visitor));
                };
                return AggregateOperand;
            })(Criteria.CriteriaOperator);
            Criteria.AggregateOperand = AggregateOperand;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var BetweenOperator = (function (_super) {
                __extends(BetweenOperator, _super);
                function BetweenOperator(property, begin, end) {
                    var _this = this;
                    _super.call(this);
                    this.resetRightPart = function (newVal) {
                        _this.begin = new Criteria.OperandValue(newVal);
                        _this.end = new Criteria.OperandValue(newVal);
                    };
                    this.assignLeftPart = function (criteriaOperator) {
                        _this.property = criteriaOperator.leftPart;
                    };
                    this.assignRightPart = function (criteriaOperator) {
                        if (criteriaOperator.rightPart.length !== null && criteriaOperator.rightPart.length !== undefined) {
                            if (criteriaOperator.rightPart.length) {
                                _this.begin = criteriaOperator.rightPart[0];
                                _this.end = criteriaOperator.rightPart.length > 1 ? criteriaOperator.rightPart[1] : new Criteria.OperandValue();
                            }
                            else {
                                _this.begin = new Criteria.OperandValue();
                                _this.end = new Criteria.OperandValue();
                            }
                        }
                        else {
                            _this.begin = criteriaOperator.rightPart;
                            _this.end = new Criteria.OperandValue();
                        }
                    };
                    this.operatorType = "Between";
                    this.type = "Between";
                    this.property = property;
                    this.begin = begin || new Criteria.OperandValue();
                    this.end = end || new Criteria.OperandValue();
                }
                Object.defineProperty(BetweenOperator.prototype, "leftPart", {
                    get: function () {
                        return this.property;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetweenOperator.prototype, "rightPart", {
                    get: function () {
                        return [this.begin, this.end];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetweenOperator.prototype, "displayType", {
                    get: function () {
                        return "Between";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetweenOperator.prototype, "enumType", {
                    get: function () {
                        return BetweenOperator;
                    },
                    enumerable: true,
                    configurable: true
                });
                BetweenOperator.prototype.accept = function (visitor) {
                    return visitor.visitBetweenOperator
                        ? visitor.visitBetweenOperator(this)
                        : new BetweenOperator(this.property && this.property.accept(visitor), this.begin && this.begin.accept(visitor), this.end && this.end.accept(visitor));
                };
                return BetweenOperator;
            })(Criteria.CriteriaOperator);
            Criteria.BetweenOperator = BetweenOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            (function (BinaryOperatorType) {
                BinaryOperatorType[BinaryOperatorType["Equal"] = 0] = "Equal";
                BinaryOperatorType[BinaryOperatorType["NotEqual"] = 1] = "NotEqual";
                BinaryOperatorType[BinaryOperatorType["Greater"] = 2] = "Greater";
                BinaryOperatorType[BinaryOperatorType["Less"] = 3] = "Less";
                BinaryOperatorType[BinaryOperatorType["LessOrEqual"] = 4] = "LessOrEqual";
                BinaryOperatorType[BinaryOperatorType["GreaterOrEqual"] = 5] = "GreaterOrEqual";
                BinaryOperatorType[BinaryOperatorType["Like"] = 6] = "Like";
                BinaryOperatorType[BinaryOperatorType["BitwiseAnd"] = 7] = "BitwiseAnd";
                BinaryOperatorType[BinaryOperatorType["BitwiseOr"] = 8] = "BitwiseOr";
                BinaryOperatorType[BinaryOperatorType["BitwiseXor"] = 9] = "BitwiseXor";
                BinaryOperatorType[BinaryOperatorType["Divide"] = 10] = "Divide";
                BinaryOperatorType[BinaryOperatorType["Modulo"] = 11] = "Modulo";
                BinaryOperatorType[BinaryOperatorType["Multiply"] = 12] = "Multiply";
                BinaryOperatorType[BinaryOperatorType["Plus"] = 13] = "Plus";
                BinaryOperatorType[BinaryOperatorType["Minus"] = 14] = "Minus";
            })(Criteria.BinaryOperatorType || (Criteria.BinaryOperatorType = {}));
            var BinaryOperatorType = Criteria.BinaryOperatorType;
            var BinaryOperator = (function (_super) {
                __extends(BinaryOperator, _super);
                function BinaryOperator(left, right, operatorType) {
                    var _this = this;
                    _super.call(this);
                    this.assignLeftPart = function (criteriaOperator) {
                        _this.leftOperand = criteriaOperator.leftPart;
                    };
                    this.assignRightPart = function (criteriaOperator) {
                        if (criteriaOperator.rightPart.length !== null && criteriaOperator.rightPart.length !== undefined) {
                            if (criteriaOperator.rightPart.length) {
                                _this.rightOperand = criteriaOperator.rightPart[0];
                            }
                        }
                        else {
                            _this.rightOperand = criteriaOperator.rightPart;
                        }
                    };
                    this.type = "Binary";
                    this.leftOperand = left || new Criteria.CriteriaOperator();
                    this.rightOperand = right || new Criteria.CriteriaOperator();
                    this.operatorType = operatorType;
                }
                Object.defineProperty(BinaryOperator.prototype, "leftPart", {
                    get: function () {
                        return this.leftOperand;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BinaryOperator.prototype, "rightPart", {
                    get: function () {
                        return this.rightOperand;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BinaryOperator.prototype, "displayType", {
                    get: function () {
                        return Criteria.Utils.operatorTokens[BinaryOperatorType[this.operatorType]] || BinaryOperatorType[this.operatorType];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BinaryOperator.prototype, "enumType", {
                    get: function () {
                        return BinaryOperatorType;
                    },
                    enumerable: true,
                    configurable: true
                });
                BinaryOperator.prototype.accept = function (visitor) {
                    return visitor.visitBinaryOperator
                        ? visitor.visitBinaryOperator(this)
                        : new BinaryOperator(this.leftOperand && this.leftOperand.accept(visitor), this.rightOperand && this.rightOperand.accept(visitor), this.operatorType);
                };
                return BinaryOperator;
            })(Criteria.CriteriaOperator);
            Criteria.BinaryOperator = BinaryOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var OperandValue = (function (_super) {
                __extends(OperandValue, _super);
                function OperandValue(value) {
                    _super.call(this);
                    this.type = "Value";
                    var result = value !== null && value !== undefined ? value : "";
                    if (value && value["length"] && value[0] === "'" && value[value.length - 1] === "'") {
                        result = value.slice(1, value.length - 1);
                    }
                    else if (value && value["length"] && value[0] === "#" && value[value.length - 1] === "#") {
                        result = value.slice(1, value.length - 1);
                        result = Analytics.Localization.parseDate(result);
                        if (!result) {
                            result = Analytics.Localization.parseDate(value.slice(1, value.length - 1));
                        }
                    }
                    else if (String(value).toLowerCase() === "true" || String(value).toLowerCase() === "false") {
                        result = String(value).toLowerCase() === "true" ? "True" : "False";
                    }
                    this.value = result;
                }
                Object.defineProperty(OperandValue.prototype, "displayType", {
                    get: function () {
                        return this.value || "?";
                    },
                    enumerable: true,
                    configurable: true
                });
                return OperandValue;
            })(Criteria.CriteriaOperator);
            Criteria.OperandValue = OperandValue;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="value.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var ConstantValue = (function (_super) {
                __extends(ConstantValue, _super);
                function ConstantValue(value) {
                    _super.call(this, value);
                }
                ConstantValue.prototype.accept = function (visitor) {
                    return visitor.visitConstantValue
                        ? visitor.visitConstantValue(this)
                        : new ConstantValue(this.value);
                };
                return ConstantValue;
            })(Criteria.OperandValue);
            Criteria.ConstantValue = ConstantValue;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            (function (FunctionOperatorType) {
                FunctionOperatorType[FunctionOperatorType["None"] = 0] = "None";
                FunctionOperatorType[FunctionOperatorType["Custom"] = 1] = "Custom";
                FunctionOperatorType[FunctionOperatorType["CustomNonDeterministic"] = 2] = "CustomNonDeterministic";
                FunctionOperatorType[FunctionOperatorType["Iif"] = 3] = "Iif";
                FunctionOperatorType[FunctionOperatorType["IsNull"] = 4] = "IsNull";
                FunctionOperatorType[FunctionOperatorType["IsNullOrEmpty"] = 5] = "IsNullOrEmpty";
                FunctionOperatorType[FunctionOperatorType["Trim"] = 6] = "Trim";
                FunctionOperatorType[FunctionOperatorType["Len"] = 7] = "Len";
                FunctionOperatorType[FunctionOperatorType["Substring"] = 8] = "Substring";
                FunctionOperatorType[FunctionOperatorType["Upper"] = 9] = "Upper";
                FunctionOperatorType[FunctionOperatorType["Lower"] = 10] = "Lower";
                FunctionOperatorType[FunctionOperatorType["Concat"] = 11] = "Concat";
                FunctionOperatorType[FunctionOperatorType["Ascii"] = 12] = "Ascii";
                FunctionOperatorType[FunctionOperatorType["Char"] = 13] = "Char";
                FunctionOperatorType[FunctionOperatorType["ToStr"] = 14] = "ToStr";
                FunctionOperatorType[FunctionOperatorType["Replace"] = 15] = "Replace";
                FunctionOperatorType[FunctionOperatorType["Reverse"] = 16] = "Reverse";
                FunctionOperatorType[FunctionOperatorType["Insert"] = 17] = "Insert";
                FunctionOperatorType[FunctionOperatorType["CharIndex"] = 18] = "CharIndex";
                FunctionOperatorType[FunctionOperatorType["Remove"] = 19] = "Remove";
                FunctionOperatorType[FunctionOperatorType["Abs"] = 20] = "Abs";
                FunctionOperatorType[FunctionOperatorType["Sqr"] = 21] = "Sqr";
                FunctionOperatorType[FunctionOperatorType["Cos"] = 22] = "Cos";
                FunctionOperatorType[FunctionOperatorType["Sin"] = 23] = "Sin";
                FunctionOperatorType[FunctionOperatorType["Atn"] = 24] = "Atn";
                FunctionOperatorType[FunctionOperatorType["Exp"] = 25] = "Exp";
                FunctionOperatorType[FunctionOperatorType["Log"] = 26] = "Log";
                FunctionOperatorType[FunctionOperatorType["Rnd"] = 27] = "Rnd";
                FunctionOperatorType[FunctionOperatorType["Tan"] = 28] = "Tan";
                FunctionOperatorType[FunctionOperatorType["Power"] = 29] = "Power";
                FunctionOperatorType[FunctionOperatorType["Sign"] = 30] = "Sign";
                FunctionOperatorType[FunctionOperatorType["Round"] = 31] = "Round";
                FunctionOperatorType[FunctionOperatorType["Ceiling"] = 32] = "Ceiling";
                FunctionOperatorType[FunctionOperatorType["Floor"] = 33] = "Floor";
                FunctionOperatorType[FunctionOperatorType["Max"] = 34] = "Max";
                FunctionOperatorType[FunctionOperatorType["Min"] = 35] = "Min";
                FunctionOperatorType[FunctionOperatorType["Acos"] = 36] = "Acos";
                FunctionOperatorType[FunctionOperatorType["Asin"] = 37] = "Asin";
                FunctionOperatorType[FunctionOperatorType["Atn2"] = 38] = "Atn2";
                FunctionOperatorType[FunctionOperatorType["BigMul"] = 39] = "BigMul";
                FunctionOperatorType[FunctionOperatorType["Cosh"] = 40] = "Cosh";
                FunctionOperatorType[FunctionOperatorType["Log10"] = 41] = "Log10";
                FunctionOperatorType[FunctionOperatorType["Sinh"] = 42] = "Sinh";
                FunctionOperatorType[FunctionOperatorType["Tanh"] = 43] = "Tanh";
                FunctionOperatorType[FunctionOperatorType["PadLeft"] = 44] = "PadLeft";
                FunctionOperatorType[FunctionOperatorType["PadRight"] = 45] = "PadRight";
                FunctionOperatorType[FunctionOperatorType["StartsWith"] = 46] = "StartsWith";
                FunctionOperatorType[FunctionOperatorType["EndsWith"] = 47] = "EndsWith";
                FunctionOperatorType[FunctionOperatorType["Contains"] = 48] = "Contains";
                FunctionOperatorType[FunctionOperatorType["ToInt"] = 49] = "ToInt";
                FunctionOperatorType[FunctionOperatorType["ToLong"] = 50] = "ToLong";
                FunctionOperatorType[FunctionOperatorType["ToFloat"] = 51] = "ToFloat";
                FunctionOperatorType[FunctionOperatorType["ToDouble"] = 52] = "ToDouble";
                FunctionOperatorType[FunctionOperatorType["ToDecimal"] = 53] = "ToDecimal";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeThisYear"] = 54] = "LocalDateTimeThisYear";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeThisMonth"] = 55] = "LocalDateTimeThisMonth";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeLastWeek"] = 56] = "LocalDateTimeLastWeek";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeThisWeek"] = 57] = "LocalDateTimeThisWeek";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeYesterday"] = 58] = "LocalDateTimeYesterday";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeToday"] = 59] = "LocalDateTimeToday";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeNow"] = 60] = "LocalDateTimeNow";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeTomorrow"] = 61] = "LocalDateTimeTomorrow";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeDayAfterTomorrow"] = 62] = "LocalDateTimeDayAfterTomorrow";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeNextWeek"] = 63] = "LocalDateTimeNextWeek";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeTwoWeeksAway"] = 64] = "LocalDateTimeTwoWeeksAway";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeNextMonth"] = 65] = "LocalDateTimeNextMonth";
                FunctionOperatorType[FunctionOperatorType["LocalDateTimeNextYear"] = 66] = "LocalDateTimeNextYear";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalBeyondThisYear"] = 67] = "IsOutlookIntervalBeyondThisYear";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalLaterThisYear"] = 68] = "IsOutlookIntervalLaterThisYear";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalLaterThisMonth"] = 69] = "IsOutlookIntervalLaterThisMonth";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalNextWeek"] = 70] = "IsOutlookIntervalNextWeek";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalLaterThisWeek"] = 71] = "IsOutlookIntervalLaterThisWeek";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalTomorrow"] = 72] = "IsOutlookIntervalTomorrow";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalToday"] = 73] = "IsOutlookIntervalToday";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalYesterday"] = 74] = "IsOutlookIntervalYesterday";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalEarlierThisWeek"] = 75] = "IsOutlookIntervalEarlierThisWeek";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalLastWeek"] = 76] = "IsOutlookIntervalLastWeek";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalEarlierThisMonth"] = 77] = "IsOutlookIntervalEarlierThisMonth";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalEarlierThisYear"] = 78] = "IsOutlookIntervalEarlierThisYear";
                FunctionOperatorType[FunctionOperatorType["IsOutlookIntervalPriorThisYear"] = 79] = "IsOutlookIntervalPriorThisYear";
                FunctionOperatorType[FunctionOperatorType["IsThisWeek"] = 80] = "IsThisWeek";
                FunctionOperatorType[FunctionOperatorType["IsThisMonth"] = 81] = "IsThisMonth";
                FunctionOperatorType[FunctionOperatorType["IsThisYear"] = 82] = "IsThisYear";
                FunctionOperatorType[FunctionOperatorType["DateDiffTick"] = 83] = "DateDiffTick";
                FunctionOperatorType[FunctionOperatorType["DateDiffSecond"] = 84] = "DateDiffSecond";
                FunctionOperatorType[FunctionOperatorType["DateDiffMilliSecond"] = 85] = "DateDiffMilliSecond";
                FunctionOperatorType[FunctionOperatorType["DateDiffMinute"] = 86] = "DateDiffMinute";
                FunctionOperatorType[FunctionOperatorType["DateDiffHour"] = 87] = "DateDiffHour";
                FunctionOperatorType[FunctionOperatorType["DateDiffDay"] = 88] = "DateDiffDay";
                FunctionOperatorType[FunctionOperatorType["DateDiffMonth"] = 89] = "DateDiffMonth";
                FunctionOperatorType[FunctionOperatorType["DateDiffYear"] = 90] = "DateDiffYear";
                FunctionOperatorType[FunctionOperatorType["GetDate"] = 91] = "GetDate";
                FunctionOperatorType[FunctionOperatorType["GetMilliSecond"] = 92] = "GetMilliSecond";
                FunctionOperatorType[FunctionOperatorType["GetSecond"] = 93] = "GetSecond";
                FunctionOperatorType[FunctionOperatorType["GetMinute"] = 94] = "GetMinute";
                FunctionOperatorType[FunctionOperatorType["GetHour"] = 95] = "GetHour";
                FunctionOperatorType[FunctionOperatorType["GetDay"] = 96] = "GetDay";
                FunctionOperatorType[FunctionOperatorType["GetMonth"] = 97] = "GetMonth";
                FunctionOperatorType[FunctionOperatorType["GetYear"] = 98] = "GetYear";
                FunctionOperatorType[FunctionOperatorType["GetDayOfWeek"] = 99] = "GetDayOfWeek";
                FunctionOperatorType[FunctionOperatorType["GetDayOfYear"] = 100] = "GetDayOfYear";
                FunctionOperatorType[FunctionOperatorType["GetTimeOfDay"] = 101] = "GetTimeOfDay";
                FunctionOperatorType[FunctionOperatorType["Now"] = 102] = "Now";
                FunctionOperatorType[FunctionOperatorType["UtcNow"] = 103] = "UtcNow";
                FunctionOperatorType[FunctionOperatorType["Today"] = 104] = "Today";
                FunctionOperatorType[FunctionOperatorType["AddTimeSpan"] = 105] = "AddTimeSpan";
                FunctionOperatorType[FunctionOperatorType["AddTicks"] = 106] = "AddTicks";
                FunctionOperatorType[FunctionOperatorType["AddMilliSeconds"] = 107] = "AddMilliSeconds";
                FunctionOperatorType[FunctionOperatorType["AddSeconds"] = 108] = "AddSeconds";
                FunctionOperatorType[FunctionOperatorType["AddMinutes"] = 109] = "AddMinutes";
                FunctionOperatorType[FunctionOperatorType["AddHours"] = 110] = "AddHours";
                FunctionOperatorType[FunctionOperatorType["AddDays"] = 111] = "AddDays";
                FunctionOperatorType[FunctionOperatorType["AddMonths"] = 112] = "AddMonths";
                FunctionOperatorType[FunctionOperatorType["AddYears"] = 113] = "AddYears";
                FunctionOperatorType[FunctionOperatorType["OrderDescToken"] = 114] = "OrderDescToken";
            })(Criteria.FunctionOperatorType || (Criteria.FunctionOperatorType = {}));
            var FunctionOperatorType = Criteria.FunctionOperatorType;
            var FunctionOperator = (function (_super) {
                __extends(FunctionOperator, _super);
                function FunctionOperator(operatorType, operands) {
                    var _this = this;
                    _super.call(this);
                    this.toString = function (reverse) {
                        var result = (Criteria.Utils.operatorTokens[_this.displayType] || _this.displayType) + '(' + _this.operands.map(function (operand) {
                            return operand.toString();
                        }).join(", ") + ')';
                        return reverse ? "Not " + result : result;
                    };
                    this.assignLeftPart = function (criteriaOperator) {
                        _this.operands = [criteriaOperator.leftPart];
                    };
                    this.assignRightPart = function (criteriaOperator) {
                        if (_this.operatorType !== FunctionOperatorType.IsNullOrEmpty &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalBeyondThisYear &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalLaterThisYear &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalLaterThisMonth &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalNextWeek &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalLaterThisWeek &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalTomorrow &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalToday &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalYesterday &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalEarlierThisWeek &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalLastWeek &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalEarlierThisMonth &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalEarlierThisYear &&
                            _this.operatorType !== FunctionOperatorType.IsOutlookIntervalPriorThisYear) {
                            if (criteriaOperator.rightPart.length !== null && criteriaOperator.rightPart.length !== undefined) {
                                if (criteriaOperator.rightPart.length) {
                                    _this.operands.push(criteriaOperator.rightPart[0]);
                                }
                                else {
                                    _this.operands.push(new Criteria.OperandValue());
                                }
                            }
                            else {
                                _this.operands.push(criteriaOperator.rightPart);
                            }
                        }
                    };
                    this.operands = [];
                    this.type = "Function";
                    this.operatorType = operatorType;
                    operands = operands || [new Criteria.CriteriaOperator()];
                    operands.forEach(function (operand) { return _this.operands.push(operand); });
                }
                Object.defineProperty(FunctionOperator.prototype, "leftPart", {
                    get: function () {
                        return this.operands[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FunctionOperator.prototype, "rightPart", {
                    get: function () {
                        return this.operands.filter(function (_, index) { return index !== 0; });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FunctionOperator.prototype, "displayType", {
                    get: function () {
                        return FunctionOperatorType[this.operatorType] || this.operatorType.toString();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FunctionOperator.prototype, "enumType", {
                    get: function () {
                        return FunctionOperatorType;
                    },
                    enumerable: true,
                    configurable: true
                });
                FunctionOperator.prototype.accept = function (visitor) {
                    return visitor.visitFunctionOperator
                        ? visitor.visitFunctionOperator(this)
                        : new FunctionOperator(this.operatorType, this.operands && this.operands.map(function (op) { return op.accept(visitor); }));
                };
                return FunctionOperator;
            })(Criteria.CriteriaOperator);
            Criteria.FunctionOperator = FunctionOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
///<reference path="../criteriaOperatorPreprocessor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            (function (GroupOperatorType) {
                GroupOperatorType[GroupOperatorType["And"] = 0] = "And";
                GroupOperatorType[GroupOperatorType["Or"] = 1] = "Or";
            })(Criteria.GroupOperatorType || (Criteria.GroupOperatorType = {}));
            var GroupOperatorType = Criteria.GroupOperatorType;
            var GroupOperator = (function (_super) {
                __extends(GroupOperator, _super);
                function GroupOperator(operation, operands) {
                    var _this = this;
                    _super.call(this);
                    this.create = function (isGroup, property, specifics) {
                        var operator = new Criteria.BinaryOperator(property, new Criteria.OperandValue(""), Criteria.BinaryOperatorType.Equal);
                        if (isGroup) {
                            operator = new GroupOperator(GroupOperatorType.And, []);
                        }
                        else if (specifics && specifics === "list") {
                            operator = new Criteria.AggregateOperand(property, null, Criteria.Aggregate.Exists, new GroupOperator(GroupOperatorType.And, []));
                        }
                        _this.operands.push(operator);
                        return _this.operands[_this.operands.indexOf(operator)];
                    };
                    this.change = function (operationType, item, incorrectSpecificsForAggregate) {
                        if (incorrectSpecificsForAggregate === void 0) { incorrectSpecificsForAggregate = false; }
                        var position = _this.operands.indexOf(item);
                        if (position !== -1) {
                            var operator = Criteria.CriteriaOperator.create(operationType);
                            if (operationType.type !== operator.enumType) {
                                operator.leftPart.assignFrom(item);
                            }
                            else {
                                operator.assignFrom(item, incorrectSpecificsForAggregate);
                            }
                            _this.operands[position] = operator;
                        }
                        else {
                            throw Error("dont have this element in operands collection");
                        }
                        item = null;
                        return _this.operands[position];
                    };
                    this.remove = function (operator) {
                        _this.operands.splice(_this.operands.indexOf(operator), 1);
                    };
                    this.assignLeftPart = function (operator) {
                        _this.operands = operator.operands;
                    };
                    this.operands = [];
                    this.type = "Group";
                    this.operatorType = operation;
                    operands = operands || [new Criteria.CriteriaOperator(), new Criteria.CriteriaOperator()];
                    operands.forEach(function (operand) { return _this.operands.push(operand); });
                }
                GroupOperator.combine = function (operation, operands) {
                    var combinedOperands = [];
                    (operands || []).forEach(function (operand) {
                        if (operand instanceof GroupOperator && operand.operatorType === operation) {
                            combinedOperands.push.apply(combinedOperands, operand.operands);
                        }
                        else {
                            combinedOperands.push(operand);
                        }
                    });
                    if (combinedOperands.length === 1) {
                        return combinedOperands[0];
                    }
                    return Criteria.criteriaCreator.process("group", { operands: combinedOperands, operation: operation });
                };
                GroupOperator.prototype.children = function () {
                    return this.operands;
                };
                Object.defineProperty(GroupOperator.prototype, "displayType", {
                    get: function () {
                        return GroupOperatorType[this.operatorType];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupOperator.prototype, "enumType", {
                    get: function () {
                        return GroupOperatorType;
                    },
                    enumerable: true,
                    configurable: true
                });
                GroupOperator.prototype.accept = function (visitor) {
                    return visitor.visitGroupOperator
                        ? visitor.visitGroupOperator(this)
                        : new GroupOperator(this.operatorType, this.operands && this.operands.map(function (op) { return op.accept(visitor); }));
                };
                return GroupOperator;
            })(Criteria.CriteriaOperator);
            Criteria.GroupOperator = GroupOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var InOperator = (function (_super) {
                __extends(InOperator, _super);
                function InOperator(criteriaOperator, operands) {
                    var _this = this;
                    _super.call(this);
                    this.assignLeftPart = function (criteriaOperator) {
                        _this.criteriaOperator = criteriaOperator.leftPart;
                    };
                    this.assignRightPart = function (criteriaOperator) {
                        _this.operands = [].concat(criteriaOperator.rightPart);
                    };
                    this.operatorType = "In";
                    this.type = "In";
                    this.operands = [];
                    this.criteriaOperator = criteriaOperator || new Criteria.CriteriaOperator();
                    (operands || []).forEach(function (operand) { return _this.operands.push(operand); });
                }
                Object.defineProperty(InOperator.prototype, "leftPart", {
                    get: function () {
                        return this.criteriaOperator;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InOperator.prototype, "rightPart", {
                    get: function () {
                        return this.operands;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InOperator.prototype, "displayType", {
                    get: function () {
                        return "In";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InOperator.prototype, "enumType", {
                    get: function () {
                        return InOperator;
                    },
                    enumerable: true,
                    configurable: true
                });
                InOperator.prototype.accept = function (visitor) {
                    return visitor.visitInOperator
                        ? visitor.visitInOperator(this)
                        : new InOperator(this.criteriaOperator && this.criteriaOperator.accept(visitor), this.operands && this.operands.map(function (op) { return op.accept(visitor); }));
                };
                return InOperator;
            })(Criteria.CriteriaOperator);
            Criteria.InOperator = InOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var JoinOperand = (function (_super) {
                __extends(JoinOperand, _super);
                function JoinOperand(joinTypeName, condition, type, aggregated) {
                    _super.call(this);
                    this.type = "Join";
                    this.joinTypeName = joinTypeName;
                    this.condition = condition;
                    this.operatorType = type;
                    this.aggregatedExpression = aggregated;
                }
                JoinOperand.joinOrAggregate = function (collectionProperty, condition, type, aggregated) {
                    if (collectionProperty === null || collectionProperty.propertyName.length < 2 || collectionProperty.propertyName[0] != '<' || collectionProperty.propertyName[collectionProperty.propertyName.length - 1] != '>') {
                        return Criteria.criteriaCreator.process("aggregate", {
                            property: collectionProperty,
                            aggregatedExpression: aggregated,
                            aggregateType: type,
                            condition: condition
                        });
                    }
                    else {
                        return Criteria.criteriaCreator.process("join", {
                            joinTypeName: collectionProperty.propertyName.substring(1, collectionProperty.propertyName.length - 2),
                            condition: condition,
                            type: type,
                            aggregated: aggregated
                        });
                    }
                };
                JoinOperand.prototype.accept = function (visitor) {
                    return visitor.visitJoinOperand
                        ? visitor.visitJoinOperand(this)
                        : new JoinOperand(this.joinTypeName, this.condition && this.condition.accept(visitor), this.operatorType, this.aggregatedExpression && this.aggregatedExpression.accept(visitor));
                };
                return JoinOperand;
            })(Criteria.CriteriaOperator);
            Criteria.JoinOperand = JoinOperand;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            var OperandParameter = (function (_super) {
                __extends(OperandParameter, _super);
                function OperandParameter(parameterName, value) {
                    _super.call(this, value);
                    this.type = "Parameter";
                    this.parameterName = parameterName || "";
                }
                Object.defineProperty(OperandParameter.prototype, "displayType", {
                    get: function () {
                        return '?' + this.parameterName;
                    },
                    enumerable: true,
                    configurable: true
                });
                OperandParameter.prototype.accept = function (visitor) {
                    return visitor.visitOperandParameter
                        ? visitor.visitOperandParameter(this)
                        : new OperandParameter(this.parameterName, this.value);
                };
                return OperandParameter;
            })(Criteria.OperandValue);
            Criteria.OperandParameter = OperandParameter;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Criteria;
        (function (Criteria) {
            (function (UnaryOperatorType) {
                UnaryOperatorType[UnaryOperatorType["Minus"] = 0] = "Minus";
                UnaryOperatorType[UnaryOperatorType["Plus"] = 1] = "Plus";
                UnaryOperatorType[UnaryOperatorType["BitwiseNot"] = 2] = "BitwiseNot";
                UnaryOperatorType[UnaryOperatorType["Not"] = 3] = "Not";
                UnaryOperatorType[UnaryOperatorType["IsNull"] = 4] = "IsNull";
            })(Criteria.UnaryOperatorType || (Criteria.UnaryOperatorType = {}));
            var UnaryOperatorType = Criteria.UnaryOperatorType;
            var UnaryOperator = (function (_super) {
                __extends(UnaryOperator, _super);
                function UnaryOperator(operatorType, operand) {
                    _super.call(this);
                    this.type = "Unary";
                    this.operand = operand || new Criteria.CriteriaOperator();
                    this.operatorType = operatorType;
                }
                Object.defineProperty(UnaryOperator.prototype, "leftPart", {
                    get: function () {
                        return this.operand;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnaryOperator.prototype.assignFrom = function (criteriaOperator) {
                    if (this.operatorType === UnaryOperatorType.Not) {
                        if (criteriaOperator instanceof UnaryOperator) {
                            this.operand.assignFrom(criteriaOperator.operand);
                        }
                        else {
                            this.operand.assignFrom(criteriaOperator);
                        }
                    }
                    else {
                        if (criteriaOperator instanceof UnaryOperator) {
                            this.operand = criteriaOperator.operand.leftPart;
                        }
                        else {
                            this.operand = criteriaOperator.leftPart || criteriaOperator;
                        }
                    }
                };
                Object.defineProperty(UnaryOperator.prototype, "displayType", {
                    get: function () {
                        return UnaryOperatorType[this.operatorType];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnaryOperator.prototype, "enumType", {
                    get: function () {
                        return UnaryOperatorType;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnaryOperator.prototype.accept = function (visitor) {
                    return visitor.visitUnaryOperator
                        ? visitor.visitUnaryOperator(this)
                        : new UnaryOperator(this.operatorType, this.operand && this.operand.accept(visitor));
                };
                return UnaryOperator;
            })(Criteria.CriteriaOperator);
            Criteria.UnaryOperator = UnaryOperator;
        })(Criteria = Analytics.Criteria || (Analytics.Criteria = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../expressioneditor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var Tools = (function (_super) {
                    __extends(Tools, _super);
                    function Tools(onClick, parametersOptions, options, fieldListOptions) {
                        var _this = this;
                        _super.call(this);
                        this.searchPlaceholder = function () { return Analytics.getLocalization("Enter text to search...", "ASPxReportsStringId.ReportDesigner_QueryBuilder_SearchBox_EmptyText"); };
                        this._categories = ko.observableArray([]);
                        this.showDescription = ko.observable(true);
                        this.toolBox = [];
                        this.description = ko.observable();
                        this._defaultClick = onClick;
                        Internal.operatorNames.filter(function (item) { return !!item.descriptionStringId; }).forEach(function (item) { return _this._initDescription(item); });
                        var functionGroups = ko.computed(function () {
                            return ko.unwrap(options().functions) || Internal.functionDisplay;
                        }), functions = ko.computed(function () {
                            return functionGroups().map(function (funtionGroup) {
                                return _this._createFunctionsCategoryItem(funtionGroup.items, Analytics.getLocalization(funtionGroup.display, funtionGroup.localizationId));
                            });
                        }), createDefaultCategories = function () {
                            return [
                                _this._createFieldsCategory(fieldListOptions, parametersOptions),
                                _this._createConstantCategory(),
                                _this._createFunctionsCategory(functions),
                                _this._createOperatorsCategory(Internal.operatorNames)
                            ];
                        }, selectedContent = ko.observable(null), resetCategoriesSelection = function () {
                            var firstItem = _this._categories()[0].content;
                            selectedContent() && selectedContent().isSelected(false);
                            selectedContent(firstItem);
                            firstItem.isSelected(true);
                        }, updateCategories = function (newOptions) {
                            _this._disposeCategories();
                            var defaultCategories = createDefaultCategories();
                            newOptions.customizeCategories && newOptions.customizeCategories(_this, defaultCategories, onClick);
                            _this._categories(defaultCategories);
                            resetCategoriesSelection();
                        };
                        this.resetCategoriesSelection = resetCategoriesSelection;
                        [functionGroups, functions].forEach(function (x) { return _this._disposables.push(x); });
                        this._disposables.push(options.subscribe(function (newOptions) {
                            updateCategories(newOptions);
                        }));
                        updateCategories(options());
                        this.toolBox = [
                            this._generateTab(this._categories, "dx-expressioneditor-categories", "170px", function (item) {
                                if (selectedContent() === item)
                                    return;
                                selectedContent().isSelected(false);
                                item.isSelected(true);
                                selectedContent(item);
                            }),
                            this._generateTab(selectedContent, "dx-expressioneditor-selectedcontent", ko.computed(function () { return _this.showDescription() ? "248px" : "435px"; }), function (item) { _this.description(Analytics.getLocalization(item.text, item.descriptionStringId)); }, this._defaultClick),
                            this._generateTab(this.description, "dx-expressioneditor-description", undefined, undefined, undefined, this.showDescription)
                        ];
                    }
                    Tools.prototype._generateTab = function (content, templateName, width, click, dblclick, visible) {
                        if (templateName === void 0) { templateName = null; }
                        return {
                            templateName: templateName,
                            width: width || "30%",
                            content: content,
                            click: click,
                            dblclick: dblclick,
                            visible: visible || true
                        };
                    };
                    Tools.prototype._initDescription = function (expressionEditorItem) {
                        expressionEditorItem.description = DevExpress.Analytics.getLocalization(expressionEditorItem.text, expressionEditorItem.descriptionStringId);
                    };
                    Tools.prototype._createFieldsCategory = function (fields, parameters) {
                        var _this = this;
                        var disposables = [], category = {
                            displayName: Analytics.getLocalization("Fields", "XtraEditorsExpressionEditor.Fields.Text"),
                            content: {
                                isSelected: ko.observable(false),
                                data: { fields: fields, parameters: parameters },
                                name: "dx-expressioneditor-fields"
                            },
                            dispose: function () {
                                disposables.forEach(function (x) { return x.dispose(); });
                                disposables.splice(0, disposables.length);
                            }
                        };
                        disposables.push(category.content.isSelected.subscribe(function (newVal) {
                            _this.showDescription(!newVal);
                        }));
                        return category;
                    };
                    Tools.prototype._createConstantCategory = function () {
                        return {
                            displayName: Analytics.getLocalization("Constants", "XtraEditorsExpressionEditor.Constants.Text"),
                            content: {
                                isSelected: ko.observable(false),
                                data: [
                                    { text: "?", descriptionStringId: 'XtraEditorsExpressionEditor.Null.Description' },
                                    { text: "False", descriptionStringId: 'XtraEditorsExpressionEditor.False.Description' },
                                    { text: "True", descriptionStringId: 'XtraEditorsExpressionEditor.True.Description' }
                                ],
                                name: "dx-expressioneditor-collection"
                            },
                            dispose: function () { return void 0; }
                        };
                    };
                    Tools.prototype._createOperatorsCategory = function (data) {
                        return {
                            displayName: Analytics.getLocalization("Operators", "XtraEditorsExpressionEditor.Operators.Text"),
                            content: {
                                isSelected: ko.observable(false),
                                data: data,
                                name: "dx-expressioneditor-collection"
                            },
                            dispose: function () { return void 0; }
                        };
                    };
                    Tools.prototype._createFunctionsCategoryContent = function (textToSearch, isSelected, items) {
                        return {
                            isSelected: isSelected,
                            data: {
                                textToSearch: textToSearch,
                                items: items,
                                availableItems: ko.observableArray(items)
                            },
                            name: "dx-expressioneditor-collection-function",
                        };
                    };
                    Tools.prototype._createFunctionsCategoryItem = function (functions, display) {
                        var _this = this;
                        var result = {
                            display: display,
                            isSelected: ko.observable(false),
                            data: [],
                            name: "dx-expressioneditor-collection-function",
                        };
                        $.map(functions, (function (item) {
                            if (item) {
                                item.forEach(function (functionItem) {
                                    _this._initDescription(functionItem);
                                    result.data.push(functionItem);
                                });
                            }
                        }));
                        return result;
                    };
                    Tools.prototype._createFunctionsCategory = function (items) {
                        var textToSearch = ko.observable(""), disposables = [], isSelected = ko.observable(false), timeout = null, allItems = ko.computed(function () { return (_a = []).concat.apply(_a, items().map(function (x) { return x.data; })); var _a; }), content = this._createFunctionsCategoryContent(textToSearch, isSelected, allItems()), category = {
                            displayName: Analytics.getLocalization("Functions", "XtraEditorsExpressionEditor.Functions.Text"),
                            items: items, allItems: allItems, isSelected: isSelected, content: content,
                            collapsed: ko.observable(true),
                            updateContent: function (items, isSelected) {
                                content.isSelected && content.isSelected(false);
                                content.isSelected = isSelected;
                                content.isSelected(true);
                                content.data.items = items;
                                content.data.availableItems(content.data.items.filter(function (x) { return !!Analytics.Utils.findMatchesInString(x.text, textToSearch()); }));
                            },
                            templateName: "dx-expressioneditor-category-accordion",
                            dispose: function () {
                                disposables.forEach(function (x) { return x.dispose(); });
                                disposables.splice(0, disposables.length);
                            }
                        };
                        disposables.push(allItems);
                        disposables.push(textToSearch.subscribe(function (newVal) {
                            timeout && clearTimeout(timeout);
                            timeout = setTimeout(function () {
                                category.content.data.availableItems(category.content.data.items.filter(function (x) { return !!Analytics.Utils.findMatchesInString(x.text, newVal); }));
                            }, 150);
                        }));
                        return category;
                    };
                    Tools.prototype._disposeCategories = function () {
                        this._categories().forEach(function (category) { return category.dispose && category.dispose(); });
                    };
                    Tools.prototype.dispose = function () {
                        _super.prototype.dispose.call(this);
                        this._disposeCategories();
                    };
                    return Tools;
                })(Analytics.Utils.Disposable);
                Internal.Tools = Tools;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../common/pathRequest.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            Widgets.treeListEditAction = {
                templateName: "dx-treelist-edit-action",
                imageClassName: "",
                text: "Edit",
                clickAction: $.noop,
                displayText: function () { return DevExpress.Analytics.getLocalization("Edit", "ReportStringId.UD_Group_Edit"); }
            };
            var TreeListItemViewModel = (function (_super) {
                __extends(TreeListItemViewModel, _super);
                function TreeListItemViewModel(options, path, onItemsVisibilityChanged, rtl, resolver) {
                    var _this = this;
                    if (path === void 0) { path = []; }
                    if (onItemsVisibilityChanged === void 0) { onItemsVisibilityChanged = $.noop; }
                    if (rtl === void 0) { rtl = false; }
                    if (resolver === void 0) { resolver = new Analytics.Internal.CodeResolver(); }
                    _super.call(this);
                    this.resolver = resolver;
                    this._rtl = false;
                    this._data = ko.observable(null);
                    this.level = -1;
                    this.items = ko.observableArray();
                    this.collapsed = ko.observable(true);
                    this.isSelected = ko.observable(false);
                    this.isHovered = ko.observable(false);
                    this.isMultiSelected = ko.observable(false);
                    this._path = path;
                    this._rtl = rtl;
                    this._treeListController = options.treeListController;
                    this._templateName = options.templateName;
                    this._onItemsVisibilityChanged = onItemsVisibilityChanged;
                    this.dragDropHandler = options.treeListController.dragDropHandler;
                    this.getItems = function () {
                        return _this._loadItems(options);
                    };
                    this.toggleSelected = function (_, event) {
                        if ((event.shiftKey || event.ctrlKey) && _this.selectedItems().length > 0 && _this._treeListController.canMultiSelect && _this._treeListController.canMultiSelect(_this)) {
                            options.selectedPath("");
                            _this._treeListController.multiSelect(_this, event.shiftKey, event.ctrlKey);
                        }
                        else if (_this._treeListController.canSelect(_this)) {
                            options.treeListController.clickHandler && options.treeListController.clickHandler(_this);
                            options.selectedPath(_this.path);
                        }
                    };
                    if (options.treeListController.dblClickHandler) {
                        this.dblClickHandler = function (item) {
                            options.treeListController.dblClickHandler && options.treeListController.dblClickHandler(item);
                        };
                    }
                    this.toggleCollapsed = function () {
                        if (_this.hasItems) {
                            _this.collapsed(!_this.collapsed.peek());
                            if (!_this.collapsed.peek() && _this.items().length === 0) {
                                _this._loadItems(options).always(function () { onItemsVisibilityChanged(); });
                            }
                            else {
                                onItemsVisibilityChanged();
                            }
                        }
                    };
                    this.nodeImageClass = this._getNodeImageClassName();
                }
                TreeListItemViewModel.prototype._equal = function (obj1, obj2) {
                    var ignore = ["innerActions", "noDragable", "dragData"];
                    if (obj2 === obj1)
                        return true;
                    return Object.keys(obj2).filter(function (key) { return ignore.indexOf(key) === -1; }).every(function (key) {
                        return obj2[key] === obj1[key];
                    });
                };
                TreeListItemViewModel.prototype._getImageClassName = function (showIcon) {
                    var _this = this;
                    return ko.computed(function () {
                        return "dx-image-fieldlist-"
                            + (ko.unwrap((_this.data && _this.data.icon) || (_this.data && _this.data.specifics)) || "default").toLowerCase()
                            + (!showIcon ? " dx-treelist-image-empty" : "");
                    });
                };
                TreeListItemViewModel.prototype._getNodeImageClassName = function () {
                    var _this = this;
                    var imageClassName = ko.observable("dx-collapsing-image");
                    return ko.computed({
                        read: function () {
                            if (!_this.hasItems) {
                                return 'dx-image-leaf-node';
                            }
                            return _this.collapsed() ? 'dx-collapsing-image' : imageClassName();
                        },
                        write: function (newValue) {
                            imageClassName(newValue);
                        }
                    });
                };
                TreeListItemViewModel.prototype._createItemsObj = function (items) {
                    var obj = {};
                    for (var i = 0; i < items.length; i++) {
                        obj[items[i].name] = { item: items[i], index: i };
                    }
                    return obj;
                };
                TreeListItemViewModel.prototype._loadItems = function (options) {
                    var _this = this;
                    var deferred = $.Deferred();
                    if (this._loader) {
                        this._loader.dispose();
                    }
                    var promise = ko.observable();
                    this._disposables.push(promise.subscribe(function (value) {
                        if (!value)
                            return;
                        value.done(function (data) {
                            var _data = data;
                            var items = _this.items.peek();
                            var dataObj = _this._createItemsObj(_data);
                            var isMutated = false;
                            var splicedItems = 0;
                            var tempItems = [].concat.apply([], items);
                            for (var i = 0; i < tempItems.length; i++) {
                                if (!dataObj[tempItems[i].data.name]) {
                                    tempItems[i].dispose();
                                    items.splice(i - splicedItems, 1);
                                    splicedItems++;
                                    isMutated = true;
                                }
                            }
                            var itemsObj = _this._createItemsObj(items);
                            var resorted = false;
                            var showIconsForChildItems = !_this._treeListController.showIconsForChildItems || _this._treeListController.showIconsForChildItems(_this);
                            _data.forEach(function (d, index) {
                                var currentItem = itemsObj[d.name];
                                if (!currentItem) {
                                    isMutated = true;
                                    var newItem = new TreeListItemViewModel(options, _this.pathParts, _this._onItemsVisibilityChanged, _this._rtl, _this.resolver);
                                    newItem.data = d;
                                    newItem.level = _this.level + 1;
                                    newItem.parent = _this;
                                    newItem.padding = _this._applyPadding(_this._rtl ? "right" : "left", 20 * newItem.level + 12);
                                    newItem.imageClassName = newItem._getImageClassName(showIconsForChildItems);
                                    items.splice(index, 0, newItem);
                                    itemsObj[d.name] = { item: newItem, index: index };
                                }
                                else {
                                    if (!_this._equal(d, currentItem.item.data))
                                        currentItem.item.data = d;
                                    if (!resorted)
                                        resorted = currentItem.index !== index;
                                }
                            });
                            if (resorted) {
                                var index = items.reduce(function (acc, x, index) {
                                    var max = Math.abs(index - (dataObj[x.data.name] ? dataObj[x.data.name].index : -1));
                                    if (!acc || acc.max < max) {
                                        return { max: max, index: index };
                                    }
                                    return acc;
                                }, null).index;
                                var curItem = items[index];
                                items.splice(index, 1);
                                items.splice(dataObj[curItem.data.name] ? dataObj[curItem.data.name].index : -1, 0, curItem);
                                isMutated = true;
                            }
                            isMutated && _this.items.valueHasMutated();
                            _this.items().forEach(function (item) {
                                if (!item.collapsed() && item.hasItems) {
                                    item._loadItems(options);
                                }
                            });
                            _this.nodeImageClass(_this.items.peek().some(function (x) { return x.visible; }) ? "dx-collapsing-image dx-image-expanded" : "dx-image-leaf-node");
                            deferred.resolve(_this.items.peek());
                            var selectedPath = options.selectedPath.peek();
                            if (selectedPath) {
                                var item2Select = _this.items.peek().filter(function (item) { return selectedPath.indexOf(item.path) === 0; })[0];
                                if (item2Select) {
                                    _this._selectItem(item2Select.name + selectedPath.substring(item2Select.path.length));
                                }
                            }
                        });
                    }));
                    this._disposables.push(this._loader = ko.computed(function () {
                        promise(options.itemsProvider.getItems(new Analytics.Utils.PathRequest(_this.path, _this.pathParts)));
                    }));
                    return deferred.promise();
                };
                TreeListItemViewModel.prototype._selectItem = function (itemPath) {
                    var _this = this;
                    if (!this.hasItems) {
                        return;
                    }
                    var selectItemDelegate = function () {
                        _this._find(itemPath);
                        if (_this.collapsed.peek()) {
                            _this.toggleCollapsed();
                        }
                    };
                    if (this.items.peek().length === 0) {
                        this.getItems().done(function (items) {
                            selectItemDelegate();
                        });
                    }
                    else {
                        selectItemDelegate();
                    }
                };
                TreeListItemViewModel.prototype._find = function (itemPath) {
                    var item = itemPath && this.items.peek().filter(function (childItem) {
                        return itemPath === childItem.name
                            || itemPath.indexOf(childItem.name) === 0 && itemPath[childItem.name.length] === '.';
                    })[0];
                    if (item) {
                        if (itemPath.length > item.name.length) {
                            item._selectItem(itemPath.substr(item.name.length + 1));
                        }
                        else {
                            this._treeListController.select(item);
                        }
                    }
                };
                TreeListItemViewModel.prototype._applyPadding = function (position, value) {
                    var padding = {};
                    padding["padding-" + position] = value;
                    return padding;
                };
                Object.defineProperty(TreeListItemViewModel.prototype, "hasItems", {
                    get: function () {
                        if (!this.data) {
                            return true;
                        }
                        return this._treeListController.hasItems(this.data);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "data", {
                    get: function () {
                        return this._data();
                    },
                    set: function (newVal) {
                        this._data(newVal);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "name", {
                    get: function () {
                        return ko.unwrap(this.data && this.data.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "path", {
                    get: function () {
                        return this.pathParts.join(".");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "pathParts", {
                    get: function () {
                        if (this.name) {
                            return (ko.unwrap(this._path) || []).concat([this.name]);
                        }
                        else {
                            return ko.unwrap(this._path);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "text", {
                    get: function () {
                        return this.data && this.data.displayName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "templateName", {
                    get: function () {
                        return this._templateName || this.data && this.data.templateName || "dx-treelist-item";
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeListItemViewModel.prototype.actionsTemplate = function () {
                    return this.data && ko.unwrap(this.data["actionsTemplate"]) || "dx-treelist-item-actions-with-edit";
                };
                TreeListItemViewModel.prototype.treeListEditAction = function () {
                    return Widgets.treeListEditAction;
                };
                Object.defineProperty(TreeListItemViewModel.prototype, "hasContent", {
                    get: function () {
                        return this.data && this.data["contenttemplate"];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "actions", {
                    get: function () {
                        return this._treeListController.getActions ? this._treeListController.getActions(this) : [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "isDraggable", {
                    get: function () {
                        if (this.data && this.data["dragData"]) {
                            return !this.data["dragData"].noDragable;
                        }
                        if (this._treeListController.isDraggable) {
                            return this._treeListController.isDraggable(this);
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "treeListController", {
                    get: function () {
                        return this._treeListController;
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeListItemViewModel.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this.items().forEach(function (item) { return item.dispose(); });
                };
                Object.defineProperty(TreeListItemViewModel.prototype, "visible", {
                    get: function () {
                        return !this._treeListController.itemsFilter || this._treeListController.itemsFilter(this.data, this.path);
                    },
                    enumerable: true,
                    configurable: true
                });
                TreeListItemViewModel.prototype.mouseenter = function () {
                    this.isHovered(true);
                };
                TreeListItemViewModel.prototype.mouseleave = function () {
                    this.isHovered(false);
                };
                TreeListItemViewModel.prototype.selectedItems = function () {
                    return this._treeListController.selectedItems && this._treeListController.selectedItems() || [];
                };
                return TreeListItemViewModel;
            })(Analytics.Utils.Disposable);
            Widgets.TreeListItemViewModel = TreeListItemViewModel;
            var TreeListRootItemViewModel = (function (_super) {
                __extends(TreeListRootItemViewModel, _super);
                function TreeListRootItemViewModel(options, path, onItemsVisibilityChanged, rtl) {
                    var _this = this;
                    if (path === void 0) { path = []; }
                    if (onItemsVisibilityChanged === void 0) { onItemsVisibilityChanged = $.noop; }
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this, options, path, onItemsVisibilityChanged, rtl);
                    this._disposables.push(options.selectedPath.subscribe(function (newPath) {
                        _this._selectItem(!!_this.path ? newPath.substr(_this.path.length + 1) : newPath);
                    }));
                    this._selectItem(!!this.path ? this.path + "." + options.selectedPath() : options.selectedPath());
                }
                return TreeListRootItemViewModel;
            })(TreeListItemViewModel);
            Widgets.TreeListRootItemViewModel = TreeListRootItemViewModel;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../utils.ts" />
///<reference path="treelistItem.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var TreeListController = (function () {
                function TreeListController() {
                    this.selectedItem = null;
                }
                TreeListController.prototype.itemsFilter = function (item) {
                    return true;
                };
                TreeListController.prototype.hasItems = function (item) {
                    return item.specifics !== "none" && (item.specifics === "List" || item.specifics === "ListSource" || item.isList === true);
                };
                TreeListController.prototype.canSelect = function (value) {
                    return !value.hasItems;
                };
                TreeListController.prototype.select = function (value) {
                    if (this.canSelect(value)) {
                        this.selectedItem && this.selectedItem.isSelected(false);
                        this.selectedItem = value;
                        value.isSelected(true);
                    }
                };
                return TreeListController;
            })();
            Widgets.TreeListController = TreeListController;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../../treelist/treelistItem.ts" />
///<reference path="../../treelist/treelistController.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var ExpressionEditorTreeListController = (function (_super) {
                __extends(ExpressionEditorTreeListController, _super);
                function ExpressionEditorTreeListController(fieldName, putSelectionHandler, selectionHandler) {
                    _super.call(this);
                    this.fieldName = fieldName;
                    this.putSelectionHandler = putSelectionHandler;
                    this.selectionHandler = selectionHandler;
                }
                ExpressionEditorTreeListController.prototype.itemsFilter = function (item) {
                    return item.specifics !== "none" && item.name !== "ReportItems";
                };
                ExpressionEditorTreeListController.prototype.select = function (value) {
                    this.selectionHandler && this.selectionHandler(ko.unwrap(value.data["type"]));
                };
                ExpressionEditorTreeListController.prototype.getActions = function (item) {
                    var _this = this;
                    return [{ clickAction: function (element) { return _this.putSelectionHandler(item, $(element)); } }];
                };
                ExpressionEditorTreeListController.prototype.canSelect = function (value) {
                    return true;
                };
                return ExpressionEditorTreeListController;
            })(Widgets.TreeListController);
            Widgets.ExpressionEditorTreeListController = ExpressionEditorTreeListController;
            var ExpressionEditorParametersTreeListController = (function (_super) {
                __extends(ExpressionEditorParametersTreeListController, _super);
                function ExpressionEditorParametersTreeListController(customFilter, putSelectionHandler, selectionHandler) {
                    _super.call(this);
                    this.customFilter = customFilter;
                    this.putSelectionHandler = putSelectionHandler;
                    this.selectionHandler = selectionHandler;
                }
                ExpressionEditorParametersTreeListController.prototype.itemsFilter = function (item) {
                    return item.specifics !== "none" && (!this.customFilter || this.customFilter(item));
                };
                ExpressionEditorParametersTreeListController.prototype.select = function (value) {
                    this.selectionHandler(ko.unwrap(value.data["type"]));
                };
                ExpressionEditorParametersTreeListController.prototype.getActions = function (item) {
                    var _this = this;
                    return [{
                            clickAction: function (element) {
                                if (item && item.text !== "Parameters")
                                    _this.putSelectionHandler(item.path, $(element));
                            }
                        }];
                };
                ExpressionEditorParametersTreeListController.prototype.canSelect = function (value) {
                    return true;
                };
                return ExpressionEditorParametersTreeListController;
            })(Widgets.TreeListController);
            Widgets.ExpressionEditorParametersTreeListController = ExpressionEditorParametersTreeListController;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="tools/tools.ts" />
/// <reference path="tools/functions.ts" />
/// <reference path="../criteria/operators/criteriaOperator.ts" />
/// <reference path="../common/pathRequest.ts" />
/// <reference path="../common/displayNameProvider.ts" />
/// <reference path="../common/codeCompletor.ts" />
/// <reference path="tools/treeListControllers.ts" />
/// <reference path="../ace/binding.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            function createExpressionEditorFieldListProvider(originalProvider, fieldName) {
                return ko.computed(function () {
                    var provider = ko.unwrap(originalProvider);
                    var unwrappedFieldName = ko.unwrap(fieldName);
                    return !unwrappedFieldName ? provider : {
                        getItems: function (path) {
                            var $deferred = $.Deferred();
                            provider.getItems(path)
                                .done(function (data) {
                                $deferred.resolve(data.filter(function (field) { return field.name !== unwrappedFieldName; }));
                            })
                                .fail(function () { return $deferred.reject(); });
                            return $deferred.promise();
                        },
                        getValues: function (path) {
                            return provider.getValues(path);
                        }
                    };
                });
            }
            function wrapExpressionValue(path, value, converter, subscriptions) {
                if (!(converter && path))
                    return value;
                var _displayValue = ko.observable(value());
                converter.toDisplayExpression(path(), value()).done(function (result) {
                    _displayValue(result);
                }).fail(function () {
                    _displayValue(value());
                });
                var valueSubscription = value.subscribe(function (newValue) {
                    converter.toDisplayExpression(path(), newValue).done(function (result) {
                        _displayValue(result);
                    }).fail(function () {
                        _displayValue(newValue);
                    });
                });
                var pathSubscription = path.subscribe(function (newPath) {
                    converter.toDisplayExpression(newPath, value())
                        .done(function (result) { _displayValue(result); })
                        .fail(function (_) { _displayValue(value()); });
                });
                var displayValue = ko.pureComputed({
                    read: function () { return _displayValue(); },
                    write: function (newValue) {
                        _displayValue(newValue);
                        converter.toRealExpression(path(), newValue).done(function (result) {
                            value(result);
                        }).fail(function () {
                            value(newValue);
                        });
                    }
                });
                if (subscriptions)
                    [displayValue, valueSubscription, pathSubscription].forEach(function (x) { return subscriptions.push(x); });
                return displayValue;
            }
            Widgets.wrapExpressionValue = wrapExpressionValue;
            var ExpressionEditor = (function (_super) {
                __extends(ExpressionEditor, _super);
                function ExpressionEditor(options, fieldListProvider, disabled, rtl, _displayNameProvider) {
                    var _this = this;
                    if (disabled === void 0) { disabled = ko.observable(false); }
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this);
                    this.options = options;
                    this._displayNameProvider = _displayNameProvider;
                    this._updateTextAreaValue = function (item, element) {
                        var textArea = _this._getTextArea(element), textAreaValue = _this.textAreaValue().toString(), cursorPosition = textArea && textArea.selectionStart || textAreaValue.length, newAddedText = textAreaValue[cursorPosition - 1] == " " ? (item.val || item.text || item) + " " : " " + (item.val || item.text || item) + " ";
                        _this.textAreaValue([textAreaValue.slice(0, cursorPosition), newAddedText, textAreaValue.slice(cursorPosition)].join(''));
                        if (textArea && textArea.setSelectionRange) {
                            textArea.focus();
                            var posisition = cursorPosition + (newAddedText.indexOf("(") !== -1 ? newAddedText.indexOf("(") + 1 : newAddedText.length);
                            textArea.setSelectionRange(posisition, posisition);
                        }
                    };
                    this._updateAceValue = function (item, element) {
                        var editor = _this.editorContainer(), _a = editor.getCursorPosition(), row = _a.row, col = _a.column, insertion = (item.val || item.text || item) + " ";
                        if (col && editor.getSession().getValue().split("\n")[row][col - 1] !== " ")
                            insertion = " " + insertion;
                        editor.insert(insertion);
                        editor.focus();
                        Analytics.Utils.setCursorInFunctionParameter(item.paramCount, editor, insertion);
                    };
                    this._updateValue = function (item, element) {
                        _this.aceAvailable ? _this._updateAceValue(item, $(element)) : _this._updateTextAreaValue(item, $(element));
                    };
                    this.patchFieldName = function (fieldName) { return fieldName; };
                    this._parametersPutSelectionHandler = function (selectedItemPath, element) {
                        var proposedFieldName = selectedItemPath;
                        var newAddedString = '[' + _this.patchFieldName(proposedFieldName) + ']';
                        _this._updateValue(newAddedString, element);
                    };
                    this._fieldsPutSelectionHandler = function (selectedItemPath, element) {
                        var path = _this.koOptions.peek().path.peek();
                        var proposedFieldName = selectedItemPath.substring(path.length + 1);
                        var newAddedString = '[' + _this.patchFieldName(proposedFieldName) + ']';
                        if (_this._displayNameProvider) {
                            _this.displayExpressionConverter.toDisplayExpression(path, newAddedString)
                                .done(function (result) { _this._updateValue(result, element); })
                                .fail(function () { _this._updateValue(newAddedString, element); });
                        }
                        else {
                            _this._updateValue(newAddedString, element);
                        }
                    };
                    this.aceAvailable = Widgets.aceAvailable;
                    this.popupVisible = ko.observable(false);
                    this.title = function () { return DevExpress.Analytics.getLocalization('Expression Editor', 'XtraEditorsExpressionEditor.Expression.Text'); };
                    this.value = ko.observable("");
                    this.textAreaValue = ko.observable("");
                    this.languageHelper = {
                        getLanguageMode: function () { return "ace/mode/criteria"; },
                        createCompleters: function (editor, bindingContext, viewModel) {
                            var path = ko.computed(function () { return ko.unwrap(viewModel.koOptions().path) || ""; }), functions = ko.computed(function () { return ko.unwrap(viewModel.koOptions().functions); }), completor = new Widgets.CodeCompletor({
                                editor: editor,
                                bindingContext: bindingContext,
                                fieldListProvider: viewModel.fieldListProvider,
                                path: path,
                                functions: functions,
                                rootItems: viewModel.options.rootItems,
                                getRealExpression: function (path, member) {
                                    return _this.displayExpressionConverter && _this.displayExpressionConverter.toRealExpression(path, member) || $.Deferred().resolve(member).promise();
                                }
                            });
                            [path, functions].forEach(function (x) { return completor._disposables.push(x); });
                            return [completor];
                        }
                    };
                    this.aceOptions = {
                        showLineNumbers: false,
                        showPrintMargin: false,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        showFoldWidgets: false,
                        highlightActiveLine: false
                    };
                    this.additionalOptions = {
                        onChange: function (session) {
                            var value = session.getValue();
                            try {
                                var operator = Analytics.Criteria.CriteriaOperator.parse(value);
                                if (_this.koOptions().validate) {
                                    _this.isValid(_this.koOptions().validate(operator));
                                }
                                session.clearAnnotations();
                            }
                            catch (exception) {
                                var row = exception.hash.line;
                                var column = 0;
                                var lines = exception.message.split('\n');
                                var text = lines[1] + "\n" + lines[2];
                                session.setAnnotations([{ row: row, column: column, text: text, "type": "error" }]);
                            }
                        }
                    };
                    this.callbacks = {
                        focus: $.noop
                    };
                    this.koOptions = ko.observable(null);
                    this.editorContainer = ko.observable();
                    this.isValid = ko.observable(true);
                    this.buttonItems = [];
                    this.rtl = false;
                    this.modelValueValid = ko.computed(function () {
                        if (_this.koOptions() && _this.koOptions().isValid) {
                            return _this.koOptions().isValid();
                        }
                        return true;
                    });
                    this.koOptions(options);
                    this.patchFieldName = function (fieldName) {
                        return _this.koOptions().patchFieldName && _this.koOptions().patchFieldName(fieldName) || fieldName;
                    };
                    this.theme = this.koOptions().theme;
                    this._disposables.push(this.value = ko.computed({
                        read: function () {
                            var value = ko.unwrap(_this.koOptions().value);
                            return (value && value.toString()) || "";
                        },
                        write: function (newVal) { return _this.koOptions().value(newVal); }
                    }));
                    if (_displayNameProvider && options.path) {
                        this.displayExpressionConverter = new Analytics.Utils.DisplayExpressionConverter(_displayNameProvider);
                        var pathFunc = ko.pureComputed(function () { return _this.koOptions().path && _this.koOptions().path(); });
                        this.displayValue = wrapExpressionValue(pathFunc, this.value, this.displayExpressionConverter, this._disposables);
                        this._disposables.push(pathFunc);
                    }
                    else {
                        this.displayValue = this.value;
                    }
                    this.rtl = rtl;
                    var validate = function (value, sender) {
                        try {
                            Analytics.Criteria.CriteriaOperator.parse(value);
                            _this.isValid(true);
                            return true;
                        }
                        catch (exception) {
                            var result = Analytics.Criteria.CriteriaOperator.getNotValidRange(value, exception.message);
                            var textArea = _this._getTextArea(sender && sender.element);
                            textArea && textArea.setSelectionRange(result.start, result.end);
                            _this.isValid(false);
                        }
                    };
                    this._disposables.push(this.popupVisible.subscribe(function (newVal) {
                        if (!newVal)
                            return;
                        _this.tools.resetCategoriesSelection && _this.tools.resetCategoriesSelection();
                        _this.textAreaValue(_this.displayValue());
                        if (!_this.aceAvailable) {
                            validate(_this.value());
                        }
                        else {
                            var editor = _this.editorContainer();
                            var session = editor && editor.getSession();
                            session && session.setValue(_this.textAreaValue());
                        }
                    }));
                    var fieldName = ko.computed(function () { return _this.koOptions() && _this.koOptions().fieldName && _this.koOptions().fieldName(); });
                    this._disposables.push(this.fieldListProvider = createExpressionEditorFieldListProvider(fieldListProvider, fieldName));
                    this.disabled = disabled;
                    var self = this;
                    this.save = function (sender) {
                        var value = _this.textAreaValue();
                        if (_this.aceAvailable) {
                            var editor = _this.editorContainer();
                            var session = editor && editor.getSession();
                            value = session && session.getValue();
                        }
                        if (validate(value, sender)) {
                            _this.displayValue(value);
                            _this.popupVisible(false);
                        }
                    };
                    var selectionHandler = function (objectName) { return function (selectedItemType) {
                        _this.tools.description(selectedItemType && selectedItemType !== "None" ? DevExpress.Analytics.getLocalization("The type of this " + objectName + " is: ", 'XtraEditorsExpressionEditor.Fields Description Prefix') + " " + selectedItemType : "");
                    }; };
                    var fieldsTreeListOptions = ko.pureComputed(function () {
                        return _this.koOptions().path && _this.koOptions().path() && _this._createToolsOptions(_this.koOptions().path(), _this.fieldListProvider(), new Widgets.ExpressionEditorTreeListController(fieldName, function (data, element) { _this._fieldsPutSelectionHandler(data.path, element); }, selectionHandler("field")));
                    });
                    this.parametersTreeListController = new Widgets.ExpressionEditorParametersTreeListController(function (item) { return item.specifics === "parameters" || !Analytics.Utils.isList(item); }, this._parametersPutSelectionHandler, selectionHandler("Parameter"));
                    var parametersTreeListOptions = ko.pureComputed(function () {
                        return _this._createToolsOptions("", _this.fieldListProvider(), _this.parametersTreeListController);
                    });
                    this._disposables.push(this.tools = new Widgets.Internal.Tools(this._updateValue, parametersTreeListOptions, this.koOptions, fieldsTreeListOptions));
                    this._createMainPopupButtons();
                    [fieldName, fieldsTreeListOptions, parametersTreeListOptions].forEach(function (x) { return _this._disposables.push(x); });
                }
                ExpressionEditor.prototype._createMainPopupButtons = function () {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('Save', 'XtraEditorsExpressionEditor.buttonOK.Text'), onClick: function (sender) { self.save(sender); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('Cancel', 'XtraEditorsExpressionEditor.buttonCancel.Text'), onClick: function () { self.popupVisible(false); } } }
                    ];
                };
                ExpressionEditor.prototype._getTextArea = function (element) {
                    return element && element.parents(".dx-expressioneditor").find(":input")[0];
                };
                ExpressionEditor.prototype._createToolsOptions = function (path, fieldListProvider, treeListController) {
                    return {
                        itemsProvider: fieldListProvider,
                        selectedPath: ko.observable(""),
                        path: path,
                        templateName: "dx-ee-treelist-item",
                        treeListController: treeListController,
                        rtl: this.rtl
                    };
                };
                ExpressionEditor.prototype.onShown = function () {
                    this.callbacks.focus();
                };
                ExpressionEditor.prototype.getPopupContainer = function (el) { return $(el).closest('.dx-viewport'); };
                ;
                return ExpressionEditor;
            })(Analytics.Utils.Disposable);
            Widgets.ExpressionEditor = ExpressionEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="expressioneditor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['dxExpressionEditor'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $element = $(element);
                    $element.children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-expressioneditor').text(), $element = $element.append(templateHtml), values = valueAccessor();
                    var subscriptions = [];
                    var optionSubscription = null;
                    var editor = new Widgets.ExpressionEditor(ko.unwrap(values.options), values.fieldListProvider, viewModel.disabled, $(element).closest('.dx-rtl').length > 0, values.displayNameProvider);
                    if (ko.isSubscribable(values.options)) {
                        optionSubscription = values.options.subscribe(function (newOptions) {
                            newOptions && editor.koOptions(newOptions);
                        });
                    }
                    ko.applyBindings(editor, $element.children()[0]);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        editor.dispose();
                        optionSubscription && optionSubscription.dispose();
                        subscriptions.forEach(function (x) { return x.dispose(); });
                        subscriptions.splice(0);
                    });
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../../criteria/operators/criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var CriteriaOperatorSurface = (function (_super) {
                __extends(CriteriaOperatorSurface, _super);
                function CriteriaOperatorSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this);
                    this.canRemove = true;
                    this.operatorType = ko.observable(null);
                    this.templateName = "dx-filtereditor-common";
                    this.isSelected = ko.observable(false);
                    this.operatorClass = "criteria-operator-item-operator";
                    this.popupService = parent.popupService || { visible: ko.observable(false) };
                    this.model = operator;
                    this.helper = parent.helper;
                    this.fieldListProvider = fieldListProvider;
                    this.path = path;
                    this.parent = parent;
                    this.operatorType(operator.operatorType);
                    this._disposables.push(this.operatorType.subscribe(function (newVal) {
                        _this.model.assignType(newVal);
                    }));
                }
                CriteriaOperatorSurface.prototype._createLeftPartProperty = function (value) {
                    var _this = this;
                    if (value instanceof Analytics.Criteria.OperandProperty) {
                        var surface = this.createChildSurface(value);
                    }
                    else {
                        var surface = this.createChildSurface(value);
                        var specifics = Object.keys(this.helper.filterEditorOperators).reduce(function (key, value) {
                            if (value !== "_common" && key === "integer"
                                && _this.helper.filterEditorOperators[value].filter(function (item) { return _this.operatorType() === item.value && _this.reverse === item.reverse && _this.model.enumType === item.type; }).length > 0) {
                                key = value;
                            }
                            return key;
                        }, "integer");
                        surface.specifics = surface.specifics || ko.observable(specifics);
                    }
                    surface["canChange"] = false;
                    surface.canRemove = false;
                    if (surface instanceof Widgets.AggregateOperandSurface) {
                        this.specifics = ko.computed(function () {
                            return surface["aggregatedExpression"]() && surface["aggregatedExpression"]().specifics() || "integer";
                        });
                        this.dataType = ko.computed(function () {
                            return surface["aggregatedExpression"]() && surface["aggregatedExpression"]().dataType() || "integer";
                        });
                        this._disposables.push(this.specifics);
                        this._disposables.push(this.dataType);
                    }
                    else {
                        this.specifics = surface.specifics;
                        this.dataType = surface.dataType;
                    }
                    return surface;
                };
                CriteriaOperatorSurface.prototype.createChildSurface = function (item, path, actions) {
                    return new this.helper.mapper[item.type](item, this, this.fieldListProvider, path || this.path);
                };
                Object.defineProperty(CriteriaOperatorSurface.prototype, "items", {
                    get: function () {
                        return this.helper.filterEditorOperators[this.specifics()] || this.helper.filterEditorOperators._common;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperatorSurface.prototype, "displayType", {
                    get: function () {
                        var _this = this;
                        var item = this.items.filter(function (item) { return _this.operatorType() === item.value && _this.reverse === item.reverse && _this.model.enumType === item.type; })[0];
                        return item && item.name && (item.displayText || DevExpress.Analytics.getLocalization(item.name, item.localizationId)) || this.operatorType && this.operatorType() || "";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperatorSurface.prototype, "leftPart", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperatorSurface.prototype, "rightPart", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperatorSurface.prototype, "css", {
                    get: function () {
                        return this.operatorClass + (this.isSelected() ? " selected" : "");
                    },
                    enumerable: true,
                    configurable: true
                });
                CriteriaOperatorSurface.prototype.change = function (type, surface) {
                    if (!surface && type && this.model.enumType === type.type && this.reverse === type.reverse && type.type !== Analytics.Criteria.FunctionOperatorType) {
                        this.operatorType(type.value);
                    }
                    else {
                        this.parent.change(type, this);
                    }
                    this.helper.onChange();
                };
                CriteriaOperatorSurface.prototype.remove = function (surface) {
                    this.parent.remove(this);
                    this.helper.onChange();
                };
                return CriteriaOperatorSurface;
            })(Analytics.Utils.Disposable);
            Widgets.CriteriaOperatorSurface = CriteriaOperatorSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../operators/criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var FilterEditorAddOn = (function () {
                    function FilterEditorAddOn(criteria, popupService, action, propertyName, templateName) {
                        var _this = this;
                        this.showPopup = function (args) {
                            if (_this._popupService["subscription"]) {
                                _this._popupService["subscription"].dispose();
                            }
                            _this._popupService.title("");
                            _this.target.isSelected(true);
                            _this._updateActions(_this.target);
                            _this._popupService.target(args.element);
                            setTimeout(function () {
                                _this._popupService.visible(true);
                            }, 10);
                        };
                        this.popupContentTemplate = "dx-filtereditor-popup-common";
                        this.target = criteria;
                        this._action = action;
                        this.propertyName = propertyName;
                        this._popupService = popupService;
                        this.popupContentTemplate = templateName || this.popupContentTemplate;
                    }
                    FilterEditorAddOn.prototype._updateActions = function (viewModel) {
                        var _this = this;
                        this._popupService.data(null);
                        if (viewModel) {
                            this._popupService["subscription"] = this._popupService.visible.subscribe(function (newVal) {
                                _this.target.isSelected(newVal);
                            });
                            this._popupService["viewModel"] = viewModel;
                            this._popupService.data({
                                data: ko.unwrap(viewModel[this.propertyName]),
                                template: this.popupContentTemplate,
                                click: function (data) {
                                    viewModel[_this._action](data);
                                    _this._popupService.visible(false);
                                },
                            });
                        }
                    };
                    return FilterEditorAddOn;
                })();
                Internal.FilterEditorAddOn = FilterEditorAddOn;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../../criteria/operators/criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                (function (CriteriaSurfaceValidatorState) {
                    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Left"] = 0] = "Left";
                    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Right"] = 1] = "Right";
                    CriteriaSurfaceValidatorState[CriteriaSurfaceValidatorState["Unary"] = 2] = "Unary";
                })(Internal.CriteriaSurfaceValidatorState || (Internal.CriteriaSurfaceValidatorState = {}));
                var CriteriaSurfaceValidatorState = Internal.CriteriaSurfaceValidatorState;
                var CriteriaSurfaceValidator = (function () {
                    function CriteriaSurfaceValidator() {
                    }
                    CriteriaSurfaceValidator.customValidate = function (operator, from) {
                        return false;
                    };
                    CriteriaSurfaceValidator.checkLeftPart = function (leftPart) {
                        return leftPart instanceof Analytics.Criteria.OperandProperty || CriteriaSurfaceValidator.customValidate(leftPart, CriteriaSurfaceValidatorState.Left);
                    };
                    CriteriaSurfaceValidator._checkRightPart = function (criteriaOperator) {
                        return criteriaOperator instanceof Analytics.Criteria.OperandProperty
                            || criteriaOperator instanceof Analytics.Criteria.OperandParameter
                            || criteriaOperator instanceof Analytics.Criteria.OperandValue
                            || criteriaOperator instanceof Analytics.Criteria.ConstantValue
                            || (criteriaOperator instanceof Analytics.Criteria.UnaryOperator && this._checkRightPart(criteriaOperator.operand))
                            || CriteriaSurfaceValidator.customValidate(criteriaOperator, CriteriaSurfaceValidatorState.Right);
                    };
                    CriteriaSurfaceValidator.checkRightPart = function (rigthPart) {
                        if (Array.isArray(rigthPart)) {
                            for (var i = 0; i < rigthPart.length; i++) {
                                if (!this._checkRightPart(rigthPart[i])) {
                                    return false;
                                }
                            }
                            return true;
                        }
                        else {
                            return this._checkRightPart(rigthPart);
                        }
                    };
                    CriteriaSurfaceValidator.aggregateIsValid = function (criteriaOperator) {
                        return this.checkLeftPart(criteriaOperator.leftPart)
                            && this.validateModel(criteriaOperator.condition)
                            && (!!criteriaOperator.aggregatedExpression ?
                                (criteriaOperator.aggregatedExpression instanceof Analytics.Criteria.OperandProperty ||
                                    CriteriaSurfaceValidator.validateModel(criteriaOperator.aggregatedExpression))
                                : true);
                    };
                    CriteriaSurfaceValidator.commonOperandValid = function (criteriaOperator) {
                        return criteriaOperator.leftPart instanceof Analytics.Criteria.AggregateOperand ?
                            this.validateModel(criteriaOperator.leftPart) : this.checkLeftPart(criteriaOperator.leftPart)
                            && this.checkRightPart(criteriaOperator.rightPart);
                    };
                    CriteriaSurfaceValidator.groupIsValid = function (criteriaOperator) {
                        for (var i = 0; i < criteriaOperator.operands.length; i++) {
                            if (!this.validateModel(criteriaOperator.operands[i])) {
                                return false;
                            }
                        }
                        return true;
                    };
                    CriteriaSurfaceValidator.unaryIsValid = function (criteriaOperator) {
                        return criteriaOperator.operand instanceof Analytics.Criteria.OperandProperty || this.validateModel(criteriaOperator.operand) || CriteriaSurfaceValidator.customValidate(criteriaOperator.operand, CriteriaSurfaceValidatorState.Unary);
                    };
                    CriteriaSurfaceValidator.validateModel = function (criteriaOperator) {
                        if (criteriaOperator instanceof Analytics.Criteria.AggregateOperand) {
                            return this.aggregateIsValid(criteriaOperator);
                        }
                        else if (criteriaOperator instanceof Analytics.Criteria.GroupOperator) {
                            return this.groupIsValid(criteriaOperator);
                        }
                        else if (criteriaOperator instanceof Analytics.Criteria.UnaryOperator) {
                            return this.unaryIsValid(criteriaOperator);
                        }
                        else {
                            return this.commonOperandValid(criteriaOperator);
                        }
                    };
                    return CriteriaSurfaceValidator;
                })();
                Internal.CriteriaSurfaceValidator = CriteriaSurfaceValidator;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../../criteria/operators/criteriaOperator.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var FilterEditorSerializer = (function () {
                    function FilterEditorSerializer(operatorTokens, custom) {
                        if (operatorTokens === void 0) { operatorTokens = Analytics.Criteria.Utils.operatorTokens; }
                        this.custom = custom;
                        this.operatorTokens = operatorTokens;
                    }
                    FilterEditorSerializer.prototype.serializeGroupOperand = function (groupOperator, reverse) {
                        var _this = this;
                        var result = groupOperator.operands.map(function (operand) {
                            if (operand instanceof Analytics.Criteria.GroupOperator) {
                                return "(" + _this.serialize(operand) + ")";
                            }
                            else {
                                return _this.serialize(operand);
                            }
                        }).filter(function (serialize) { return serialize !== "" && serialize !== "()"; }).join(' ' + (this.operatorTokens[groupOperator.displayType] || groupOperator.displayType) + ' ');
                        return reverse && result ? "Not(" + result + ")" : result;
                    };
                    FilterEditorSerializer.prototype.serializeAggregateOperand = function (aggregateOperand, reverse) {
                        var operatorTypeSuffix = aggregateOperand.operatorType === Analytics.Criteria.Aggregate.Exists ? "" : "." + Analytics.Criteria.Aggregate[aggregateOperand.operatorType];
                        var condition = aggregateOperand.condition ? this.serialize(aggregateOperand.condition) : "";
                        var result = this.serialize(aggregateOperand.property) + '[' + condition + ']';
                        var aggregateSuffix = aggregateOperand.operatorType !== Analytics.Criteria.Aggregate.Exists ?
                            '(' + (aggregateOperand.aggregatedExpression && this.serialize(aggregateOperand.aggregatedExpression) || "") + ')' : '';
                        return result + operatorTypeSuffix + aggregateSuffix;
                    };
                    FilterEditorSerializer.prototype.serializeOperandProperty = function (operandProperty) {
                        return operandProperty.displayType;
                    };
                    FilterEditorSerializer.prototype.serializeOperandValue = function (operandValue) {
                        var result = operandValue.value;
                        if (result !== null && result !== undefined && ($.isNumeric(result) || String(result).toLowerCase() === "true" || String(result).toLowerCase() === "false")) {
                            return operandValue.specifics === "string" ? "'" + result + "'" : result;
                        }
                        else if (result && operandValue.value instanceof Date) {
                            return "#" + Analytics.Utils.serializeDate(result) + "#";
                        }
                        else if (operandValue.specifics === "integer" || operandValue.specifics === "integer") {
                            return result || "?";
                        }
                        return result ? "'" + result + "'" : "?";
                    };
                    FilterEditorSerializer.prototype.serializeOperandParameter = function (operandParameter) {
                        return operandParameter.displayType;
                    };
                    FilterEditorSerializer.prototype.serializeBetweenOperator = function (betweenOperator, reverse) {
                        var result = this.serialize(betweenOperator.property) + " " + betweenOperator.displayType +
                            "(" + this.serialize(betweenOperator.begin) + ", " + this.serialize(betweenOperator.end) + ")";
                        return reverse ? "Not " + result : result;
                    };
                    FilterEditorSerializer.prototype.serializeInOperator = function (inOperator, reverse) {
                        var _this = this;
                        var result = this.serialize(inOperator.criteriaOperator) + " " + inOperator.displayType + "(" +
                            inOperator.operands.map(function (operand) { return _this.serialize(operand); }).join(', ') + ")";
                        return reverse ? "Not " + result : result;
                    };
                    FilterEditorSerializer.prototype.serializeBinaryOperator = function (binaryOperator, reverse) {
                        var separator = reverse ? " Not " : " ";
                        return this.serialize(binaryOperator.leftOperand) + separator + (this.operatorTokens[binaryOperator.displayType] || binaryOperator.displayType) + ' ' + this.serialize(binaryOperator.rightOperand);
                    };
                    FilterEditorSerializer.prototype.serializeUnaryOperator = function (unaryOperator, reverse) {
                        if (unaryOperator.operatorType === Analytics.Criteria.UnaryOperatorType.IsNull) {
                            var separator = reverse ? " Not " : " ";
                            return this.serialize(unaryOperator.operand) + " Is" + separator + "Null";
                        }
                        else if (unaryOperator.operatorType === Analytics.Criteria.UnaryOperatorType.Not) {
                            return this.serialize(unaryOperator.operand, true);
                        }
                        var result = (this.operatorTokens[unaryOperator.displayType] || unaryOperator.displayType) + this.serialize(unaryOperator.operand);
                        return reverse ? "Not " + result : result;
                    };
                    FilterEditorSerializer.prototype.serializeFunctionOperator = function (functionOperator, reverse) {
                        var _this = this;
                        var result = (this.operatorTokens[functionOperator.displayType] || functionOperator.displayType) + '(' + functionOperator.operands.map(function (operand) {
                            return _this.serialize(operand);
                        }).join(", ") + ')';
                        return reverse ? "Not " + result : result;
                    };
                    FilterEditorSerializer.prototype.serialize = function (criteriaOperator, reverse) {
                        if (reverse === void 0) { reverse = false; }
                        if (criteriaOperator instanceof Analytics.Criteria.AggregateOperand) {
                            return this.serializeAggregateOperand(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.BetweenOperator) {
                            return this.serializeBetweenOperator(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.BinaryOperator) {
                            return this.serializeBinaryOperator(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.ConstantValue) {
                            return this.serializeOperandValue(criteriaOperator);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.FunctionOperator) {
                            return this.serializeFunctionOperator(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.GroupOperator) {
                            return this.serializeGroupOperand(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.InOperator) {
                            return this.serializeInOperator(criteriaOperator, reverse);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.OperandParameter) {
                            return this.serializeOperandParameter(criteriaOperator);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.OperandProperty) {
                            return this.serializeOperandProperty(criteriaOperator);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.OperandValue) {
                            return this.serializeOperandValue(criteriaOperator);
                        }
                        if (criteriaOperator instanceof Analytics.Criteria.UnaryOperator) {
                            return this.serializeUnaryOperator(criteriaOperator, reverse);
                        }
                        if (this.custom) {
                            return this.custom(criteriaOperator, reverse);
                        }
                        throw Error("Undefined type criteria operator");
                    };
                    FilterEditorSerializer.prototype.deserialize = function (stringCriteria) {
                        return this.deserializeOperand(Analytics.Criteria.CriteriaOperator.parse(stringCriteria));
                    };
                    FilterEditorSerializer.prototype.deserializeOperand = function (operand) {
                        if (operand instanceof Analytics.Criteria.GroupOperator) {
                            return operand;
                        }
                        else if (operand instanceof Analytics.Criteria.UnaryOperator && operand.operatorType === Analytics.Criteria.UnaryOperatorType.Not) {
                            var child = operand["operand"];
                            if (child instanceof Analytics.Criteria.GroupOperator) {
                                return operand;
                            }
                            return new Analytics.Criteria.UnaryOperator(Analytics.Criteria.UnaryOperatorType.Not, new Analytics.Criteria.GroupOperator(Analytics.Criteria.GroupOperatorType.And, child ? [child] : []));
                        }
                        return new Analytics.Criteria.GroupOperator(Analytics.Criteria.GroupOperatorType.And, operand ? [operand] : []);
                    };
                    return FilterEditorSerializer;
                })();
                Internal.FilterEditorSerializer = FilterEditorSerializer;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="../../treelist/treelistItem.ts" />
///<reference path="../../treelist/treelistController.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FilterEditorTreeListController = (function (_super) {
                __extends(FilterEditorTreeListController, _super);
                function FilterEditorTreeListController(selectedItem) {
                    _super.call(this);
                    this.selectedItem = selectedItem;
                }
                FilterEditorTreeListController.prototype.itemsFilter = function (item) {
                    return true;
                };
                FilterEditorTreeListController.prototype.hasItems = function (item) {
                    return item.specifics !== "none" && (item.specifics !== "List" && item.isList === true);
                };
                FilterEditorTreeListController.prototype.canSelect = function (value) {
                    return !value.data.isList || (value.data.isList === true && value.data.specifics === "List");
                };
                FilterEditorTreeListController.prototype.select = function (value) {
                    if (this.canSelect(value)) {
                        this.selectedItem(value.data);
                        value.isSelected(true);
                    }
                };
                return FilterEditorTreeListController;
            })(Widgets.TreeListController);
            Widgets.FilterEditorTreeListController = FilterEditorTreeListController;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var AggregateOperandSurface = (function (_super) {
                __extends(AggregateOperandSurface, _super);
                function AggregateOperandSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.contentTemplateName = "dx-filtereditor-aggregate";
                    this.property = ko.observable(null);
                    this.aggregatedExpression = ko.observable(null);
                    this.condition = ko.observable(null);
                    this.property(this._createLeftPartProperty(operator.property));
                    var childPath = ko.computed(function () {
                        return _this.path() + "." + _this.property().propertyName();
                    });
                    this._disposables.push(childPath);
                    if (operator.aggregatedExpression) {
                        this.aggregatedExpression(this.createChildSurface(operator.aggregatedExpression, childPath));
                        this.templateName = "dx-filtereditor-aggregate-common";
                    }
                    if (operator.operatorType === Analytics.Criteria.Aggregate.Count) {
                        this.templateName = "dx-filtereditor-aggregate-common";
                    }
                    var surface = this.createChildSurface(operator.condition, childPath);
                    surface.canRemove = false;
                    if (surface instanceof Widgets.UnaryOperandSurface) {
                        surface.operand().canRemove = false;
                    }
                    this.condition(surface);
                    this.change = function (type, surface) {
                        if (surface) {
                            var newModel = _this.model.change(type, surface.model);
                            var condition = _this.createChildSurface(newModel, childPath);
                            condition.canRemove = false;
                            if (condition instanceof Widgets.UnaryOperandSurface) {
                                condition.operand().canRemove = false;
                            }
                            _this.condition(condition);
                        }
                        else {
                            if (_this.operatorType() === Analytics.Criteria.Aggregate.Exists || _this.operatorType() === Analytics.Criteria.Aggregate.Count) {
                                _this.parent.change(type, _this);
                            }
                            else {
                                if (type && (type.value === Analytics.Criteria.Aggregate.Exists || type.value === Analytics.Criteria.Aggregate.Count)) {
                                    _this.parent.change(type, _this);
                                }
                                else {
                                    _super.prototype.change.call(_this, type, surface);
                                }
                            }
                        }
                        _this.helper.onChange();
                    };
                }
                Object.defineProperty(AggregateOperandSurface.prototype, "leftPart", {
                    get: function () {
                        return this.property && this.property();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AggregateOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.aggregatedExpression();
                    },
                    enumerable: true,
                    configurable: true
                });
                AggregateOperandSurface.prototype.dispose = function () {
                    this.property().dispose();
                    this.condition().dispose();
                    this.aggregatedExpression() && this.aggregatedExpression().dispose();
                    _super.prototype.dispose.call(this);
                };
                return AggregateOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.AggregateOperandSurface = AggregateOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var BetweenOperandSurface = (function (_super) {
                __extends(BetweenOperandSurface, _super);
                function BetweenOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.property = ko.observable(null);
                    this.end = ko.observable(null);
                    this.begin = ko.observable(null);
                    this.contentTemplateName = "dx-filtereditor-between";
                    this.property(this._createLeftPartProperty(operator.property));
                    this.begin(this.createChildSurface(operator.begin));
                    this.end(this.createChildSurface(operator.end));
                }
                Object.defineProperty(BetweenOperandSurface.prototype, "leftPart", {
                    get: function () {
                        return this.property && this.property();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BetweenOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return [this.begin(), this.end()];
                    },
                    enumerable: true,
                    configurable: true
                });
                BetweenOperandSurface.prototype.dispose = function () {
                    this.property().dispose();
                    this.begin().dispose();
                    this.end().dispose();
                    _super.prototype.dispose.call(this);
                };
                return BetweenOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.BetweenOperandSurface = BetweenOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var BinaryOperandSurface = (function (_super) {
                __extends(BinaryOperandSurface, _super);
                function BinaryOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.contentTemplateName = "dx-filtereditor-binary";
                    this.leftOperand = ko.observable(null);
                    this.rightOperand = ko.observable(null);
                    this.leftOperand(this._createLeftPartProperty(operator.leftOperand));
                    this.rightOperand(this.createChildSurface(operator.rightOperand));
                }
                Object.defineProperty(BinaryOperandSurface.prototype, "leftPart", {
                    get: function () {
                        return this.leftOperand();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BinaryOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.rightOperand();
                    },
                    enumerable: true,
                    configurable: true
                });
                BinaryOperandSurface.prototype.dispose = function () {
                    this.leftOperand().dispose();
                    this.rightOperand().dispose();
                    _super.prototype.dispose.call(this);
                };
                return BinaryOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.BinaryOperandSurface = BinaryOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var OperandSurfaceBase = (function (_super) {
                __extends(OperandSurfaceBase, _super);
                function OperandSurfaceBase(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.canChange = true;
                    this.canRemove = false;
                    this.changeValueType = function (type) {
                        var parent = _this.getRealParent(_this.parent);
                        var property = _this.getRealProperty(_this);
                        var propertyLocation = _this.getPropertyName(parent, property);
                        var model = parent.model.changeValueType(type.instance, propertyLocation);
                        if (propertyLocation.index !== null) {
                            parent[propertyLocation.name]()[propertyLocation.index].dispose();
                            parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
                        }
                        else {
                            parent[propertyLocation.name]().dispose();
                            parent[propertyLocation.name](parent.createChildSurface(model));
                        }
                        _this.helper.onChange();
                    };
                }
                OperandSurfaceBase.prototype.getRealParent = function (parent) {
                    if (parent instanceof Widgets.UnaryOperandSurface) {
                        return this.getRealParent(parent.parent);
                    }
                    else {
                        return parent;
                    }
                };
                OperandSurfaceBase.prototype.getRealProperty = function (property) {
                    if (property.parent instanceof Widgets.UnaryOperandSurface) {
                        return this.getRealProperty(property.parent);
                    }
                    else {
                        return property;
                    }
                };
                OperandSurfaceBase.prototype.getPropertyName = function (parent, searchProperty) {
                    var position = null;
                    var name = null;
                    $.each(parent, function (propertyName, property) {
                        if (Array.isArray(ko.unwrap(property)) && ko.isObservable(property)) {
                            var index = ko.unwrap(property).indexOf(searchProperty);
                            if (index > -1) {
                                position = index;
                                name = propertyName;
                                return;
                            }
                        }
                        else if (searchProperty === ko.unwrap(property) && ko.isObservable(property)) {
                            name = propertyName;
                            return;
                        }
                    });
                    return { index: position, name: name };
                };
                Object.defineProperty(OperandSurfaceBase.prototype, "changeTypeItems", {
                    get: function () {
                        var _this = this;
                        var items = [{ name: "Value", instance: Analytics.Criteria.OperandValue, localizationId: "ASPxReportsStringId.FilterEditor_Operand_Type_Value" }];
                        if (this.helper.canChoiceProperty) {
                            items.push({ name: "Property", instance: Analytics.Criteria.OperandProperty, localizationId: "ASPxReportsStringId.FilterEditor_Operand_Type_Property" });
                        }
                        if (this.helper.canChoiceParameters && (this.helper.parameters() && this.helper.parameters().filter(function (item) { return item.specifics && item.specifics.toLowerCase() === _this.parent.specifics(); }).length > 0 || this.helper.canCreateParameters)) {
                            items.push({ name: "Parameter", instance: Analytics.Criteria.OperandParameter, localizationId: "ASPxReportsStringId.FilterEditor_Operand_Type_Parameter" });
                        }
                        items.forEach(Widgets.initDisplayText);
                        return items;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OperandSurfaceBase;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.OperandSurfaceBase = OperandSurfaceBase;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="operandSurfaceBase.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FunctionOperandSurface = (function (_super) {
                __extends(FunctionOperandSurface, _super);
                function FunctionOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.canRemove = true;
                    this.contentTemplateName = "dx-filtereditor-function";
                    this.operands = ko.observableArray([]);
                    if (operator.operands.length === 0) {
                        if (parent instanceof Widgets.UnaryOperandSurface) {
                            this.specifics = parent.parent.specifics;
                        }
                        else {
                            this.specifics = parent.specifics;
                        }
                        this.contentTemplateName = "dx-filtereditor-function-lightweight";
                        this.canRemove = false;
                    }
                    else {
                        this.operands.push(this._createLeftPartProperty(operator.operands[0]));
                        for (var i = 1; i < operator.operands.length; i++) {
                            this.operands.push(this.createChildSurface(operator.operands[i]));
                        }
                    }
                }
                Object.defineProperty(FunctionOperandSurface.prototype, "leftPart", {
                    get: function () {
                        return this.operands && this.operands()[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FunctionOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.operands && this.operands().filter(function (_, index) { return index !== 0; });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FunctionOperandSurface.prototype, "displayType", {
                    get: function () {
                        var _this = this;
                        var item = this.items.filter(function (item) { return _this.operatorType() === item.value && _this.reverse === item.reverse && _this.model.enumType === item.type; })[0];
                        if (item && item.name) {
                            return item.displayText || DevExpress.Analytics.getLocalization(item.name, item.localizationId);
                        }
                        else {
                            if (!isNaN(parseInt(this.operatorType()))) {
                                return Analytics.Criteria.FunctionOperatorType[this.operatorType()];
                            }
                            else {
                                return this.operatorType() || "";
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                FunctionOperandSurface.prototype.dispose = function () {
                    this.operands().forEach(function (x) { return x.dispose(); });
                    _super.prototype.dispose.call(this);
                };
                return FunctionOperandSurface;
            })(Widgets.OperandSurfaceBase);
            Widgets.FunctionOperandSurface = FunctionOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var GroupOperandSurface = (function (_super) {
                __extends(GroupOperandSurface, _super);
                function GroupOperandSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.templateName = "dx-filtereditor-group";
                    this.operatorClass = "criteria-operator-item-group";
                    this.operands = ko.observableArray([]);
                    this.createItems = null;
                    this.createItems = [
                        { name: "Add group", value: true, localizationId: "StringId.FilterMenuGroupAdd" },
                        { name: "Add condition", value: false, localizationId: "StringId.FilterMenuConditionAdd" }
                    ];
                    this.createItems.forEach(Widgets.initDisplayText);
                    this.operands((operator.operands || []).map(function (operand) {
                        return _this.createChildSurface(operand);
                    }));
                    this.specifics = ko.observable("group");
                }
                GroupOperandSurface.prototype.change = function (type, surface) {
                    if (surface) {
                        var specifics = surface.specifics() || "integer";
                        var operators = this.helper.filterEditorOperators[specifics] || this.helper.filterEditorOperators._common;
                        if (!type) {
                            var item = operators.filter(function (item) {
                                return surface.operatorType() === item.value && surface.reverse === item.reverse && surface.model.enumType === item.type;
                            })[0];
                            if (item) {
                                type = item;
                            }
                            else {
                                type = operators[0];
                            }
                        }
                        var newModel = this.model.change(type, surface.model, surface.leftPart instanceof Widgets.AggregateOperandSurface && surface.leftPart.leftPart.specifics() !== "list");
                        var position = this.operands().indexOf(surface);
                        var operand = this.createChildSurface(newModel);
                        this.operands()[position].dispose();
                        this.operands.splice(position, 1, operand);
                    }
                    else {
                        _super.prototype.change.call(this, type, surface);
                    }
                    this.helper.onChange();
                };
                GroupOperandSurface.prototype.remove = function (surface) {
                    if (surface) {
                        this.model.remove(surface.model);
                        this.operands.remove(surface);
                        surface.dispose();
                    }
                    else {
                        this.parent.remove(this);
                        this.dispose();
                    }
                    this.helper.onChange();
                };
                GroupOperandSurface.prototype.create = function (type) {
                    var newModel = this.model.create(type.value, new Analytics.Criteria.OperandProperty());
                    this.operands.push(this.createChildSurface(newModel));
                    this.helper.onChange();
                };
                Object.defineProperty(GroupOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.operands();
                    },
                    enumerable: true,
                    configurable: true
                });
                GroupOperandSurface.prototype.dispose = function () {
                    this.operands().forEach(function (x) { return x.dispose(); });
                    _super.prototype.dispose.call(this);
                };
                return GroupOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.GroupOperandSurface = GroupOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var InOperandSurface = (function (_super) {
                __extends(InOperandSurface, _super);
                function InOperandSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.contentTemplateName = "dx-filtereditor-in";
                    this.operands = ko.observableArray([]);
                    this.criteriaOperator = ko.observable(null);
                    this.criteriaOperator(this._createLeftPartProperty(operator.criteriaOperator));
                    this.operands((operator.operands || []).map(function (operand) {
                        return _this.createChildSurface(operand);
                    }));
                    this.addValue = function () {
                        var value = new Analytics.Criteria.OperandValue(null);
                        _this.model.operands.push(value);
                        _this.operands.push(_this.createChildSurface(value));
                    };
                }
                Object.defineProperty(InOperandSurface.prototype, "leftPart", {
                    get: function () {
                        return this.criteriaOperator();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.operands();
                    },
                    enumerable: true,
                    configurable: true
                });
                InOperandSurface.prototype.dispose = function () {
                    this.criteriaOperator().dispose();
                    this.operands().forEach(function (x) { return x.dispose(); });
                    _super.prototype.dispose.call(this);
                };
                return InOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.InOperandSurface = InOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="operandSurfaceBase.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var OperandParameterSurface = (function (_super) {
                __extends(OperandParameterSurface, _super);
                function OperandParameterSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.changeParameter = function (item) {
                        _this.model.parameterName = item.name;
                        _this.parameterName(item.name);
                        _this.helper.onChange();
                    };
                    this.operatorClass = "criteria-operator-item-parameter";
                    this.parameterName = ko.observable("");
                    this.templateName = "dx-filtereditor-parameter";
                    this.specifics = parent.specifics;
                    this.parameterName(operator.parameterName);
                }
                Object.defineProperty(OperandParameterSurface.prototype, "items", {
                    get: function () {
                        var _this = this;
                        return this.helper.parameters().filter(function (item) { return item.specifics.toLocaleLowerCase() === _this.specifics(); });
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OperandParameterSurface.prototype, "displayType", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OperandParameterSurface;
            })(Widgets.OperandSurfaceBase);
            Widgets.OperandParameterSurface = OperandParameterSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="operandSurfaceBase.ts" />
/// <reference path="../../common/pathRequest.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var OperandPropertySurface = (function (_super) {
                __extends(OperandPropertySurface, _super);
                function OperandPropertySurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this._displayName = ko.observable("");
                    this.propertyName = ko.observable("");
                    this.specifics = ko.observable("integer");
                    this.dataType = ko.observable("");
                    this.valueType = ko.observable("");
                    this.changeProperty = function (item) {
                        _this.fieldsOptions().selected(item);
                    };
                    this.templateName = "dx-filtereditor-property";
                    this.operatorClass = "criteria-operator-item-field";
                    this.propertyName(operator.propertyName);
                    var options = this.helper.generateTreelistOptions(fieldListProvider, path);
                    if (options.options && options.subscription) {
                        this.fieldsOptions = options.options;
                        this._disposables.push(options.subscription);
                    }
                    else {
                        this.fieldsOptions = options;
                    }
                    this._disposables.push(this.fieldsOptions().selectedPath.subscribe(function (newVal) {
                        var realName = _this.fieldsOptions().selectedPath().substr(_this.path && _this.path().length > 0 ? _this.path().length + 1 : 0);
                        _this.propertyName(realName);
                        _this.model.propertyName = realName;
                        _this.popupService.visible(false);
                    }));
                    this._disposables.push(this.fieldsOptions().selected.subscribe(function (newVal) {
                        _this._updateDisplayName(path, _this.propertyName(), newVal.displayName);
                        var specifics = newVal.specifics.toLowerCase();
                        if (specifics.indexOf("calc") === 0) {
                            specifics = specifics.split("calc")[1];
                        }
                        if (_this.specifics() !== specifics || _this.dataType() !== newVal.dataType) {
                            _this.specifics(specifics);
                            _this.dataType(newVal.dataType);
                            _this.parent.change();
                        }
                        _this.helper.onChange();
                    }));
                    this.fieldsOptions().selectedPath(this.path && !!ko.unwrap(this.path) ? [ko.unwrap(this.path), this.propertyName()].join('.') : this.propertyName());
                    this._updateSpecifics();
                    this._disposables.push(this.displayName = ko.computed(function () {
                        return _this._displayName() || _this.propertyName();
                    }));
                }
                OperandPropertySurface.prototype._updateDisplayName = function (path, propertyName, displayName) {
                    var _this = this;
                    if (!!this.helper.getDisplayPropertyName) {
                        this.helper.getDisplayPropertyName(ko.unwrap(path), propertyName).done(function (newVal) {
                            _this._displayName(newVal);
                        });
                    }
                    else {
                        this._displayName(displayName);
                    }
                };
                OperandPropertySurface.prototype._updateSpecifics = function () {
                    var _this = this;
                    var self = this;
                    var propertyPath = this.propertyName().split('.');
                    var realPropertyName = propertyPath.pop();
                    if (ko.unwrap(this.fieldsOptions).itemsProvider) {
                        ko.unwrap(this.fieldsOptions).itemsProvider.getItems(new Analytics.Utils.PathRequest([this.path()].concat(propertyPath).join('.'))).done(function (result) {
                            var notListProperties = result.filter(function (item) { return item.specifics !== "List" && !item.isList; });
                            if (!_this.propertyName() && notListProperties.length > 0) {
                                _this.model.propertyName = notListProperties[0].name;
                                _this.propertyName(notListProperties[0].name);
                                realPropertyName = notListProperties[0].name;
                            }
                            var item = result.filter(function (item) { return item.name === realPropertyName; })[0];
                            if (item) {
                                var specifics = item.specifics.toLowerCase();
                                if (specifics.indexOf("calc") === 0) {
                                    specifics = specifics.split("calc")[1];
                                }
                                _this.specifics(specifics);
                                _this.dataType(item.dataType);
                                _this._updateDisplayName(_this.path, _this.propertyName(), item.displayName);
                            }
                        });
                    }
                };
                Object.defineProperty(OperandPropertySurface.prototype, "items", {
                    get: function () {
                        return this.fieldsOptions;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OperandPropertySurface.prototype, "displayType", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OperandPropertySurface;
            })(Widgets.OperandSurfaceBase);
            Widgets.OperandPropertySurface = OperandPropertySurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="operandSurfaceBase.ts" />
/// <reference path="../../internal/valueEditorHelper.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var OperandValueSurface = (function (_super) {
                __extends(OperandValueSurface, _super);
                function OperandValueSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this._value = ko.observable(null);
                    this._updateDate = function (specifics) {
                        if (specifics === "date") {
                            if (!(this._value() instanceof Date)) {
                                this._value(new Date(new Date().setHours(0, 0, 0, 0)));
                            }
                        }
                        else {
                            this._value("");
                        }
                    };
                    this.changeValue = function () {
                        var parent = _this.getRealParent(_this.parent);
                        var property = _this.getRealProperty(_this);
                        var propertyLocation = _this.getPropertyName(parent, property);
                        var model = parent.model.changeValue(_this.model, _this.reverse, propertyLocation);
                        if (propertyLocation.index !== null) {
                            parent[propertyLocation.name]()[propertyLocation.index].dispose();
                            parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
                        }
                        else {
                            parent[propertyLocation.name]().dispose();
                            parent[propertyLocation.name](parent.createChildSurface(model));
                        }
                    };
                    this.dataType = ko.observable("");
                    this.values = ko.observable([]);
                    this.isEditable = ko.observable(false);
                    this.templateName = "dx-filtereditor-value";
                    this.getNumberEditorOptions = function () {
                        return DevExpress.Analytics.Widgets.Internal.ValueEditorHelper.getNumberEditorOptions(_this.dataType(), _this.specifics(), { value: _this._value, onFocusOut: function () { _this.isEditable(false); } });
                    };
                    if (parent instanceof Widgets.UnaryOperandSurface) {
                        this.specifics = parent.parent.specifics;
                        this.dataType = parent.parent.dataType;
                        if (parent.model.operatorType === Analytics.Criteria.UnaryOperatorType.Minus) {
                            this.reverse = true;
                        }
                    }
                    else {
                        this.specifics = parent.specifics;
                        this.dataType = parent.dataType;
                    }
                    this._disposables.push(this.specifics.subscribe(function (newVal) {
                        operator.specifics = newVal;
                        _this._updateDate(newVal);
                    }));
                    this._value(operator.value);
                    this._disposables.push(this._value.subscribe(function (newVal) {
                        _this.model.value = newVal;
                        _this.helper.onChange();
                    }));
                    if (this._value() === null || this._value() === undefined || this._value() === "") {
                        this._updateDate(this.specifics());
                    }
                    this._disposables.push(this.value = ko.computed({
                        read: function () {
                            var value = _this._value();
                            if (value instanceof Date) {
                                value = Analytics.Localization.Globalize["formatDate"](value);
                            }
                            if (_this.items.length > 0) {
                                var result = _this.items.filter(function (item) { return item.value === value; })[0];
                                if (result) {
                                    return result.display;
                                }
                            }
                            if (_this.reverse) {
                                value = "-" + value;
                            }
                            return value !== null && value !== undefined && value !== "" ? value : _this.getDefaultValue();
                        },
                        write: function (newVal) {
                            if (newVal > 0 && !_this.reverse || newVal < 0 && _this.reverse) {
                                _this._value(newVal);
                            }
                            else if (newVal > 0 && _this.reverse || newVal < 0 && !_this.reverse) {
                                _this.reverse = !_this.reverse;
                                _this._value(newVal < 0 ? ("" + newVal).substring(1) : newVal);
                                _this.changeValue();
                            }
                        }
                    }));
                    this._disposables.push(ko.computed(function () {
                        var itemsProvider = ko.unwrap(fieldListProvider);
                        if (itemsProvider && itemsProvider.getValues && _this.parent.leftPart instanceof Widgets.OperandPropertySurface) {
                            if (_this.parent.leftPart.propertyName()) {
                                itemsProvider.getValues(new Analytics.Utils.PathRequest(ko.unwrap(_this.path) + "." + _this.parent.leftPart.propertyName())).done(function (result) {
                                    _this.values(result);
                                });
                            }
                        }
                    }));
                    operator.specifics = this.specifics();
                }
                Object.defineProperty(OperandValueSurface.prototype, "items", {
                    get: function () {
                        return this.values();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OperandValueSurface.prototype, "displayType", {
                    get: function () {
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                OperandValueSurface.prototype.isDefaultDisplay = function () {
                    return this.value() === this.getDefaultValue();
                };
                OperandValueSurface.prototype.getDefaultValue = function () {
                    return OperandValueSurface._defaultValue ? OperandValueSurface._defaultValue :
                        OperandValueSurface._defaultValue = Analytics.getLocalization("Enter a value", "StringId.FilterEmptyEnter");
                };
                return OperandValueSurface;
            })(Widgets.OperandSurfaceBase);
            Widgets.OperandValueSurface = OperandValueSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="criteriaOperatorSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var UnaryOperandSurface = (function (_super) {
                __extends(UnaryOperandSurface, _super);
                function UnaryOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.contentTemplateName = "dx-filtereditor-unary";
                    this.operand = ko.observable(null);
                    var operand = this.createChildSurface(operator.operand);
                    if (operator.operatorType === Analytics.Criteria.UnaryOperatorType.Not) {
                        this.templateName = "dx-filtereditor-not";
                        operand.reverse = true;
                        this.specifics = operand.specifics;
                    }
                    else {
                        operand.dispose();
                        operand = this._createLeftPartProperty(operator.operand);
                    }
                    this.operand(operand);
                }
                Object.defineProperty(UnaryOperandSurface.prototype, "leftPart", {
                    get: function () {
                        var leftPart = this.operand();
                        if (this.operand() && this.operand().reverse && this.operand().leftPart) {
                            leftPart = this.operand().leftPart;
                        }
                        return leftPart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnaryOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.operand() && this.operand().reverse ? this.operand().rightPart : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                UnaryOperandSurface.prototype.dispose = function () {
                    this.operand().dispose();
                    _super.prototype.dispose.call(this);
                };
                return UnaryOperandSurface;
            })(Widgets.CriteriaOperatorSurface);
            Widgets.UnaryOperandSurface = UnaryOperandSurface;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="serializer.ts" />
/// <reference path="addon.ts" />
/// <reference path="treelistController.ts" />
/// <reference path="../operators/aggregateOperandSurface.ts" />
/// <reference path="../operators/betweenOperandSurface.ts" />
/// <reference path="../operators/binaryOperandSurface.ts" />
/// <reference path="../operators/functionOperandSurface.ts" />
/// <reference path="../operators/groupOperandSurface.ts" />
/// <reference path="../operators/inOperandSurface.ts" />
/// <reference path="../operators/operandParameterSurface.ts" />
/// <reference path="../operators/operandPropertySurface.ts" />
/// <reference path="../operators/operandValueSurface.ts" />
/// <reference path="../operators/unaryOperandSurface.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            function initDisplayText(object) {
                object.displayText = DevExpress.Analytics.getLocalization(object.name, object.localizationId);
            }
            Widgets.initDisplayText = initDisplayText;
            var FilterEditorHelper = (function () {
                function FilterEditorHelper(serializer) {
                    this.rtl = false;
                    this.parameters = ko.observable(null);
                    this.canSelectLists = true;
                    this.canCreateParameters = false;
                    this.canChoiceParameters = true;
                    this.canChoiceProperty = true;
                    this.filterEditorOperators = {
                        _common: [
                            { name: "Equals", insertVal: "==", value: Analytics.Criteria.BinaryOperatorType.Equal, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseEquals" },
                            { name: "Does not equal", insertVal: "!=", value: Analytics.Criteria.BinaryOperatorType.NotEqual, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseDoesNotEqual" },
                            { name: "Is greater than", insertVal: ">", value: Analytics.Criteria.BinaryOperatorType.Greater, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseGreater" },
                            { name: "Is greater than or equal to", insertVal: ">=", value: Analytics.Criteria.BinaryOperatorType.GreaterOrEqual, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseGreaterOrEqual" },
                            { name: "Is less than", insertVal: "<", value: Analytics.Criteria.BinaryOperatorType.Less, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseLess" },
                            { name: "Is less than or equal to", insertVal: "<=", value: Analytics.Criteria.BinaryOperatorType.LessOrEqual, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseLessOrEqual" },
                            { name: "Is between", value: "Between", insertVal: "Between(, )", paramCount: 1, type: Analytics.Criteria.BetweenOperator, localizationId: "StringId.FilterClauseBetween" },
                            { name: "Is not between", value: "Between", insertVal: "Between(, )", paramCount: 1, type: Analytics.Criteria.BetweenOperator, reverse: true, localizationId: "StringId.FilterClauseNotBetween" }],
                        string: [],
                        guid: [],
                        integer: [],
                        float: [],
                        date: [],
                        list: [],
                        group: [],
                    };
                    this.onChange = function () { };
                    this.handlers = {
                        create: function (criteria, popupService) {
                            return {
                                data: new Widgets.Internal.FilterEditorAddOn(criteria, popupService, "create", "createItems"),
                                templateName: "dx-filtereditor-create"
                            };
                        },
                        change: function (criteria, popupService) {
                            return {
                                data: new Widgets.Internal.FilterEditorAddOn(criteria, popupService, "change", "items"),
                                templateName: "dx-filtereditor-change"
                            };
                        },
                        changeProperty: function (criteria, popupService) {
                            return {
                                data: new Widgets.Internal.FilterEditorAddOn(criteria, popupService, "changeProperty", "items", "dx-filtereditor-popup-treelist"),
                                templateName: "dx-filtereditor-changeProperty"
                            };
                        },
                        changeValueType: function (criteria, popupService) {
                            return {
                                data: new Widgets.Internal.FilterEditorAddOn(criteria, popupService, "changeValueType", "changeTypeItems"),
                                templateName: "dx-filtereditor-changeValueType"
                            };
                        },
                        changeParameter: function (criteria, popupService) {
                            return {
                                data: new Widgets.Internal.FilterEditorAddOn(criteria, popupService, "changeParameter", "items"),
                                templateName: "dx-filtereditor-changeParameter"
                            };
                        }
                    };
                    this.mapper = {
                        Aggregate: Widgets.AggregateOperandSurface,
                        Property: Widgets.OperandPropertySurface,
                        Parameter: Widgets.OperandParameterSurface,
                        Value: Widgets.OperandValueSurface,
                        Group: Widgets.GroupOperandSurface,
                        Between: Widgets.BetweenOperandSurface,
                        Binary: Widgets.BinaryOperandSurface,
                        Function: Widgets.FunctionOperandSurface,
                        In: Widgets.InOperandSurface,
                        Unary: Widgets.UnaryOperandSurface,
                        Default: Widgets.CriteriaOperatorSurface
                    };
                    this.serializer = serializer || new Widgets.Internal.FilterEditorSerializer();
                    this.filterEditorOperators.string = [].concat(this.filterEditorOperators._common, [
                        { name: "Contains", insertVal: "Contains(, )", value: Analytics.Criteria.FunctionOperatorType.Contains, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterClauseContains" },
                        { name: "Does not contain", value: Analytics.Criteria.FunctionOperatorType.Contains, type: Analytics.Criteria.FunctionOperatorType, reverse: true, localizationId: "StringId.FilterClauseDoesNotContain" },
                        { name: "Begins with", insertVal: "StartsWith(, )", value: Analytics.Criteria.FunctionOperatorType.StartsWith, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterClauseBeginsWith" },
                        { name: "Ends with", insertVal: "StartsWith(, )", value: Analytics.Criteria.FunctionOperatorType.EndsWith, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterClauseEndsWith" },
                        { name: "Is like", insertVal: "Like", value: Analytics.Criteria.BinaryOperatorType.Like, type: Analytics.Criteria.BinaryOperatorType, localizationId: "StringId.FilterClauseLike" },
                        { name: "Is not like", insertVal: "Not Like", value: Analytics.Criteria.BinaryOperatorType.Like, type: Analytics.Criteria.BinaryOperatorType, reverse: true, localizationId: "StringId.FilterClauseNotLike" },
                        { name: "Is any of", value: "In", insertVal: "In()", paramCount: 1, type: Analytics.Criteria.InOperator, localizationId: "StringId.FilterClauseAnyOf" },
                        { name: "Is none of", value: "In", type: Analytics.Criteria.InOperator, reverse: true, localizationId: "StringId.FilterClauseNoneOf" },
                        { name: "Is blank", insertVal: "IsNullOrEmpty()", value: Analytics.Criteria.FunctionOperatorType.IsNullOrEmpty, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterClauseIsNullOrEmpty" },
                        { name: "Is not blank", insertVal: "Not IsNullOrEmpty()", value: Analytics.Criteria.FunctionOperatorType.IsNullOrEmpty, type: Analytics.Criteria.FunctionOperatorType, reverse: true, localizationId: "StringId.FilterClauseIsNotNullOrEmpty" }
                    ]);
                    this.filterEditorOperators.guid = this.filterEditorOperators.string;
                    this.filterEditorOperators.integer = [].concat(this.filterEditorOperators._common, [
                        { name: "Is null", insertVal: "Is Null", value: Analytics.Criteria.UnaryOperatorType.IsNull, type: Analytics.Criteria.UnaryOperatorType, localizationId: "StringId.FilterClauseIsNull" },
                        { name: "Is not null", insertVal: "Is Not Null", value: Analytics.Criteria.UnaryOperatorType.IsNull, type: Analytics.Criteria.UnaryOperatorType, reverse: true, localizationId: "StringId.FilterClauseIsNotNull" },
                        { name: "Is any of", value: "In", insertVal: "In()", paramCount: 1, type: Analytics.Criteria.InOperator, localizationId: "StringId.FilterClauseAnyOf" },
                        { name: "Is none of", value: "In", type: Analytics.Criteria.InOperator, reverse: true, localizationId: "StringId.FilterClauseNoneOf" },
                    ]);
                    this.filterEditorOperators.float = this.filterEditorOperators.integer;
                    this.filterEditorOperators.date = [].concat(this.filterEditorOperators._common, [
                        { name: "Is null", insertVal: "Is Null", value: Analytics.Criteria.UnaryOperatorType.IsNull, type: Analytics.Criteria.UnaryOperatorType, localizationId: "StringId.FilterClauseIsNull" },
                        { name: "Is not null", insertVal: "Is Not Null", value: Analytics.Criteria.UnaryOperatorType.IsNull, type: Analytics.Criteria.UnaryOperatorType, reverse: true, localizationId: "StringId.FilterClauseIsNotNull" },
                        { name: "Is any of", value: "In", insertVal: "In()", type: Analytics.Criteria.InOperator, localizationId: "StringId.FilterClauseAnyOf" },
                        { name: "Is none of", value: "In", type: Analytics.Criteria.InOperator, reverse: true, localizationId: "StringId.FilterClauseNoneOf" },
                        { name: "Is beyond this year", insertVal: "IsOutlookIntervalBeyondThisYear()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalBeyondThisYear, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalBeyondThisYear" },
                        { name: "Is later this year", insertVal: "IsOutlookIntervalLaterThisYear()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalLaterThisYear, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalLaterThisYear" },
                        { name: "Is later this month", insertVal: "IsOutlookIntervalLaterThisMonth()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalLaterThisMonth, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalLaterThisMonth" },
                        { name: "Is next week", insertVal: "IsOutlookIntervalNextWeek()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalNextWeek, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalNextWeek" },
                        { name: "Is later this week", insertVal: "IsOutlookIntervalLaterThisWeek()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalLaterThisWeek, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalLaterThisWeek" },
                        { name: "Is tomorrow", insertVal: "IsOutlookIntervalTomorrow()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalTomorrow, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalTomorrow" },
                        { name: "Is today", insertVal: "IsOutlookIntervalToday()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalToday, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalToday" },
                        { name: "Is yesterday", insertVal: "IsOutlookIntervalYesterday()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalYesterday, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalYesterday" },
                        { name: "Is earlier this week", insertVal: "IsOutlookIntervalEarlierThisWeek()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalEarlierThisWeek, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalEarlierThisWeek" },
                        { name: "Is last week", insertVal: "IsOutlookIntervalLastWeek()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalLastWeek, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalLastWeek" },
                        { name: "Is earlier this month", insertVal: "IsOutlookIntervalEarlierThisMonth()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalEarlierThisMonth, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalEarlierThisMonth" },
                        { name: "Is earlier this year", insertVal: "IsOutlookIntervalEarlierThisYear()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalEarlierThisYear, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalEarlierThisYear" },
                        { name: "Is prior this year", insertVal: "IsOutlookIntervalPriorThisYear()", value: Analytics.Criteria.FunctionOperatorType.IsOutlookIntervalPriorThisYear, type: Analytics.Criteria.FunctionOperatorType, localizationId: "StringId.FilterCriteriaToStringFunctionIsOutlookIntervalPriorThisYear" },
                    ]);
                    this.filterEditorOperators.list = [
                        { name: "Exists", value: Analytics.Criteria.Aggregate.Exists, insertVal: "Exists()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateExists" },
                        { name: "Count", value: Analytics.Criteria.Aggregate.Count, insertVal: "Count()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateCount" },
                        { name: "Max", value: Analytics.Criteria.Aggregate.Max, insertVal: "Max()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateMax" },
                        { name: "Min", value: Analytics.Criteria.Aggregate.Min, insertVal: "Min()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateMin" },
                        { name: "Sum", value: Analytics.Criteria.Aggregate.Sum, insertVal: "Sum()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateSum" },
                        { name: "Avg", value: Analytics.Criteria.Aggregate.Avg, insertVal: "Avg()", type: Analytics.Criteria.Aggregate, localizationId: "StringId.FilterAggregateAvg" }
                    ];
                    this.filterEditorOperators.group = [
                        { name: "And", insertVal: "And", value: Analytics.Criteria.GroupOperatorType.And, type: Analytics.Criteria.GroupOperatorType, localizationId: "StringId.FilterGroupAnd" },
                        { name: "Or", insertVal: "Or", value: Analytics.Criteria.GroupOperatorType.Or, type: Analytics.Criteria.GroupOperatorType, localizationId: "StringId.FilterGroupOr" },
                        { name: "Not And", value: Analytics.Criteria.GroupOperatorType.And, reverse: true, type: Analytics.Criteria.GroupOperatorType, localizationId: "StringId.FilterGroupNotAnd" },
                        { name: "Not Or", value: Analytics.Criteria.GroupOperatorType.Or, reverse: true, type: Analytics.Criteria.GroupOperatorType, localizationId: "StringId.FilterGroupNotOr" },
                    ];
                    this._initDisplayText();
                }
                FilterEditorHelper.prototype._initDisplayText = function () {
                    var _this = this;
                    Object.keys(this.filterEditorOperators).forEach(function (specific) {
                        _this.filterEditorOperators[specific].forEach(initDisplayText);
                    });
                };
                FilterEditorHelper.prototype.registrateOperator = function (specific, targetEnum, value, name, reverse, localizationId) {
                    if (reverse === void 0) { reverse = false; }
                    if (this.filterEditorOperators[specific]) {
                        if (!targetEnum[value]) {
                            var maxNumber = 0;
                            var index = 0;
                            $.each(targetEnum, function (name, _) {
                                index = parseInt(name);
                                if (!isNaN(index) && maxNumber < index) {
                                    maxNumber = index;
                                }
                            });
                            maxNumber++;
                            targetEnum[maxNumber] = value;
                            targetEnum[value] = maxNumber;
                        }
                        var newOperator = { name: name, value: targetEnum[value], type: targetEnum, reverse: reverse, displayText: DevExpress.Analytics.getLocalization(name, localizationId) };
                        this.filterEditorOperators[specific].push(newOperator);
                    }
                };
                FilterEditorHelper.prototype.generateTreelistOptions = function (fieldListProvider, path) {
                    var _this = this;
                    var treeListOptions = ko.observable(null);
                    var selected = ko.observable(null);
                    return {
                        subscription: ko.computed(function () {
                            treeListOptions({
                                itemsProvider: ko.unwrap(fieldListProvider),
                                selectedPath: ko.observable(""),
                                selected: selected,
                                path: ko.unwrap(path),
                                treeListController: new Widgets.FilterEditorTreeListController(selected),
                                rtl: _this.rtl
                            });
                        }),
                        options: treeListOptions
                    };
                };
                return FilterEditorHelper;
            })();
            Widgets.FilterEditorHelper = FilterEditorHelper;
            Widgets.DefaultFilterEditorHelper = FilterEditorHelper;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../../common/codeCompletor.ts" />
/// <reference path="helper.ts" />
/// <reference path="../../common/pathRequest.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var FilterEditorCodeCompletor = (function (_super) {
                    __extends(FilterEditorCodeCompletor, _super);
                    function FilterEditorCodeCompletor(options) {
                        _super.call(this, options);
                        var helper = new Widgets.FilterEditorHelper();
                        var functions = [];
                        var aggregate = [];
                        var operators = [];
                        var groups = Object.keys(helper.filterEditorOperators);
                        groups.forEach(function (groupName) {
                            helper.filterEditorOperators[groupName].forEach(function (operator) {
                                if (operator.insertVal) {
                                    var name = operator.name, insertVal = operator.insertVal, paramCount = operator.paramCount;
                                    if (operator.type === Analytics.Criteria.FunctionOperatorType && functions.filter(function (x) { return x.name === name; }).length === 0) {
                                        functions.push({ name: name, insertVal: insertVal });
                                    }
                                    else if (operator.type === Analytics.Criteria.Aggregate && aggregate.filter(function (x) { return x.name === name; }).length === 0) {
                                        aggregate.push({ name: name, insertVal: insertVal });
                                    }
                                    else if (operator.type !== Analytics.Criteria.Aggregate && operator.type !== Analytics.Criteria.FunctionOperatorType && operators.filter(function (x) { return x.name === name; }).length === 0) {
                                        operators.push({ name: name, insertVal: insertVal, paramCount: paramCount });
                                    }
                                }
                            });
                        });
                        this.filterEditorAvailable = { operators: operators, aggregate: aggregate, functions: functions };
                    }
                    FilterEditorCodeCompletor.prototype.getFunctionsCompletions = function () {
                        var functions = [];
                        this.filterEditorAvailable.functions.forEach(function (funcItem) {
                            functions.push(Widgets.createFunctionCompletion({ text: funcItem.name, paramCount: funcItem.insertVal.split(',').length }, funcItem.insertVal, funcItem.insertVal));
                        });
                        return functions;
                    };
                    FilterEditorCodeCompletor.prototype.getAggregateCompletions = function () {
                        var functions = [];
                        this.filterEditorAvailable.aggregate.forEach(function (funcItem) {
                            functions.push(Widgets.createFunctionCompletion({ text: funcItem.name, paramCount: 0 }, funcItem.insertVal, funcItem.insertVal));
                        });
                        return functions;
                    };
                    FilterEditorCodeCompletor.prototype.getOperatorCompletions = function (prefix) {
                        var operators = [];
                        this.filterEditorAvailable.operators.forEach(function (operator) {
                            operators.push((operator.insertVal.match(new RegExp("[\(][^\(\)]*[\)]", "g"))) ?
                                Widgets.createFunctionCompletion({ text: operator.name, paramCount: operator.paramCount || operator.insertVal.split(',').length }, operator.insertVal, operator.insertVal) :
                                { caption: operator.insertVal, snippet: prefix + operator.insertVal, meta: "operator" });
                        });
                        return operators;
                    };
                    FilterEditorCodeCompletor.prototype.beforeInsertMatch = function (editor, token, parentPrefix) {
                        if (parentPrefix === "Parameters.") {
                            var cursorPosition = editor.getCursorPosition();
                            token = token || !this["_isInContext"]() && editor.session.getTokenAt(cursorPosition.row, cursorPosition.column);
                            if (token) {
                                var trimmedText = token.value.trim();
                                var lastNonSpaceSymbol = trimmedText[trimmedText.length - 1];
                                if ((token.type === "support.variable" || token.type === "support.function")) {
                                    editor.session.remove({
                                        start: { column: token.start - 1 || 0, row: cursorPosition.row },
                                        end: { column: Math.max(token.start + token.value.length, cursorPosition.column), row: cursorPosition.row }
                                    });
                                }
                                else if (lastNonSpaceSymbol === "?") {
                                    editor.session.remove({
                                        start: { column: (token.start + token.value.length - 1) || 0, row: cursorPosition.row },
                                        end: { column: Math.max(token.start + token.value.length, cursorPosition.column), row: cursorPosition.row }
                                    });
                                }
                            }
                        }
                        else {
                            _super.prototype.beforeInsertMatch.call(this, editor, token, parentPrefix);
                        }
                    };
                    FilterEditorCodeCompletor.prototype.insertMatch = function (editor, parentPrefix, fieldName) {
                        if (parentPrefix === "Parameters.") {
                            editor.insert("?" + fieldName);
                        }
                        else {
                            _super.prototype.insertMatch.call(this, editor, parentPrefix, fieldName);
                        }
                    };
                    FilterEditorCodeCompletor.prototype.generateFieldDisplayName = function (parentPrefix, displayName) {
                        if (parentPrefix === "Parameters.") {
                            return "?" + displayName;
                        }
                        return _super.prototype.generateFieldDisplayName.call(this, parentPrefix, displayName);
                    };
                    FilterEditorCodeCompletor.prototype.defaultProcess = function (token, text, completions) {
                        var _this = this;
                        var trimmedText = text.trim();
                        var lastNonSpaceSymbol = trimmedText[trimmedText.length - 1];
                        if (lastNonSpaceSymbol === '?' && text[text.length - 1] !== " ") {
                            var $deferred = $.Deferred();
                            var $parametersPromise = ko.unwrap(this["_fieldListProvider"]).getItems(new Analytics.Utils.PathRequest("Parameters"))
                                .done(function (fields) {
                                completions.push.apply(completions, _this["_convertDataMemberInfoToCompletions"](fields, token, "Parameters."));
                            });
                            $.when($parametersPromise).always(function () { $deferred.resolve(completions); });
                            return $deferred.promise();
                        }
                        else {
                            return _super.prototype.defaultProcess.call(this, token, text, completions);
                        }
                    };
                    return FilterEditorCodeCompletor;
                })(Widgets.CodeCompletor);
                Internal.FilterEditorCodeCompletor = FilterEditorCodeCompletor;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
///<reference path="helpers/addon.ts" />
///<reference path="helpers/validator.ts" />
///<reference path="helpers/codeCompletor.ts" />
///<reference path="../common/displayNameProvider.ts" />
///<reference path="../ace/binding.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FilterEditor = (function (_super) {
                __extends(FilterEditor, _super);
                function FilterEditor(options, fieldListProvider, rtl, _displayNameProvider) {
                    var _this = this;
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this);
                    this._displayNameProvider = _displayNameProvider;
                    this._advancedMode = ko.observable(false);
                    this.textFocused = ko.observable(false);
                    this.aceAvailable = Widgets.aceAvailable;
                    this.languageHelper = {
                        getLanguageMode: function () { return "ace/mode/criteria"; },
                        createCompleters: function (editor, bindingContext, viewModel) {
                            var path = ko.computed(function () { return _this.path && _this.path(); }), completor = new Widgets.Internal.FilterEditorCodeCompletor({
                                editor: editor,
                                bindingContext: bindingContext,
                                fieldListProvider: viewModel.fieldListProvider(),
                                path: path,
                                getRealExpression: function (path, expression) {
                                    return _this.displayExpressionConverter && _this.displayExpressionConverter.toRealExpression(path, expression) || $.Deferred().resolve(expression).promise();
                                }
                            });
                            completor._disposables.push(path);
                            return [completor];
                        }
                    };
                    this.aceOptions = {
                        showLineNumbers: false,
                        showPrintMargin: false,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        showGutter: false
                    };
                    this.additionalOptions = {
                        onChange: function (session) { return _this.onValueChange(session.getValue()); },
                        changeTimeout: 200,
                        onFocus: function (_) { return _this.onFocus(); },
                        onBlur: function (_) { return _this.onBlur(); }
                    };
                    this.editorContainer = ko.observable();
                    this.textVisible = ko.observable(false);
                    this.timeout = null;
                    this.advancedMode = ko.computed({
                        read: function () {
                            return _this._advancedMode();
                        },
                        write: function (newVal) {
                            _this.timeout && clearTimeout(_this.timeout);
                            if (newVal) {
                                _this.textVisible(true);
                                _this.timeout = setTimeout(function () {
                                    _this._advancedMode(true);
                                    _this.focusText();
                                }, 1);
                            }
                            else {
                                _this._advancedMode(false);
                                _this.timeout = setTimeout(function () {
                                    _this.textVisible(false);
                                }, 200);
                            }
                        },
                    });
                    this.invalidMessage = function () { return DevExpress.Analytics.getLocalization("Cannot create a tree for this expression", "ASPxReportsStringId.FilterEditor_TreeCreationError"); };
                    this.advancedModeText = function () { return DevExpress.Analytics.getLocalization("Advanced Mode", "ASPxReportsStringId.FilterEditor_AdvancedMode"); };
                    this.operandSurface = ko.observable(null);
                    this.operand = null;
                    this.popupVisible = ko.observable(false);
                    this.buttonItems = [];
                    this.popupService = new Analytics.Internal.PopupService();
                    this.rtl = rtl;
                    options() && options().helper && (options().helper.rtl = rtl);
                    this.options = options;
                    this.value = ko.observable("");
                    this.displayExpressionConverter = _displayNameProvider && new Analytics.Utils.DisplayExpressionConverter(_displayNameProvider);
                    this.save = function () {
                        if (_this.operandSurface() && _this.isSurfaceValid()) {
                            var value = options().helper.serializer.serialize(_this.operand, false);
                            _this.options().value(value);
                        }
                        else {
                            _this.options().value(_this.value());
                        }
                        _this.popupVisible(false);
                    };
                    this.displayValue = Widgets.wrapExpressionValue(this.path, this.value, this.displayExpressionConverter, this._disposables);
                    var modelValue = ko.computed({
                        read: function () {
                            var options = _this.options();
                            return options && options.value();
                        },
                        write: function (newVal) {
                            var options = _this.options();
                            options && options.value(newVal);
                        }
                    });
                    this.modelDisplayValue = Widgets.wrapExpressionValue(this.path, modelValue, this.displayExpressionConverter, this._disposables);
                    this.fieldListProvider = fieldListProvider;
                    this.modelValueIsValid = ko.computed(function () {
                        return options() && _this._validateValue(options().value());
                    });
                    this.isValid = ko.computed(function () {
                        return _this._validateValue(_this.value());
                    });
                    this.isSurfaceValid = ko.computed(function () {
                        try {
                            return _this.options() && _this.isValid() && Widgets.Internal.CriteriaSurfaceValidator.validateModel(_this.options().helper.serializer.deserialize(_this.value()));
                        }
                        catch (e) {
                            return false;
                        }
                    });
                    this._disposables.push(modelValue);
                    this._disposables.push(this.modelValueIsValid);
                    this._disposables.push(this.isValid);
                    this._disposables.push(this.isSurfaceValid);
                    this._disposables.push(this.popupVisible.subscribe(function (newVal) {
                        if (newVal) {
                            _this.value(_this.options().value());
                            if (_this.isSurfaceValid()) {
                                _this.operand = _this._generateOperand(_this.value());
                                _this.operandSurface(_this._generateSurface(_this.operand));
                            }
                            else {
                                _this.textVisible(true);
                                _this._advancedMode(true);
                                _this.editorContainer() && _this.focusText();
                            }
                            options().helper.onChange = function () {
                                _this.value(options().helper.serializer.serialize(_this.operand, false));
                            };
                        }
                        else {
                            _this.value(null);
                            _this.operandSurface() && _this.operandSurface().dispose();
                            _this.operandSurface(null);
                            _this.operand = null;
                        }
                    }));
                    this.createAddButton = function (criteria) { return options().helper.handlers.create(criteria, _this.popupService); };
                    this.createChangeType = function (criteria) { return options().helper.handlers.change(criteria, _this.popupService); };
                    this.createChangeProperty = function (criteria) { return options().helper.handlers.changeProperty(criteria, _this.popupService); };
                    this.createChangeParameter = function (criteria) { return options().helper.handlers.changeParameter(criteria, _this.popupService); };
                    this.createChangeValueType = function (criteria) { return options().helper.handlers.changeValueType(criteria, _this.popupService); };
                    var saveDisabled = ko.computed(function () { return !_this.isValid(); });
                    this._disposables.push(saveDisabled);
                    this._disposables.push(this.advancedMode);
                    this._createMainPopupButtons(saveDisabled);
                }
                FilterEditor.prototype._createMainPopupButtons = function (saveDisabled) {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization("Save", "StringId.OK"), disabled: saveDisabled, onClick: function () { self.save(); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization("Cancel", "StringId.Cancel"), onClick: function () { self.popupVisible(false); } } },
                        { toolbar: 'bottom', location: 'before', widget: 'dxCheckBox', options: { value: self.advancedMode, text: self.advancedModeText() } }
                    ];
                };
                FilterEditor.prototype._generateOperand = function (value) {
                    return this.options().helper.serializer.deserialize(value);
                };
                FilterEditor.prototype._generateSurface = function (operand) {
                    var type = null;
                    if (operand instanceof Analytics.Criteria.UnaryOperator) {
                        type = this.options().helper.mapper.Unary;
                    }
                    else {
                        type = this.options().helper.mapper.Group;
                    }
                    var surface = new type(operand, this, this.fieldListProvider, this.path);
                    surface.canRemove = false;
                    if (surface instanceof Widgets.UnaryOperandSurface) {
                        surface.operand().canRemove = false;
                    }
                    return surface;
                };
                FilterEditor.prototype._validateValue = function (value) {
                    try {
                        if (this.options() && this.options().helper) {
                            this.options().helper.serializer.deserialize(value);
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    catch (e) {
                        return false;
                    }
                };
                FilterEditor.prototype.change = function (type, surface) {
                    this.operand = Analytics.Criteria.CriteriaOperator.create(type);
                    this.operand.assignFrom(surface.model);
                    var type = null;
                    if (this.operand instanceof Analytics.Criteria.UnaryOperator) {
                        type = this.options().helper.mapper.Unary;
                    }
                    else {
                        type = this.options().helper.mapper.Group;
                    }
                    var surface = new type(this.operand, this, this.fieldListProvider, this.path);
                    surface.canRemove = false;
                    if (surface instanceof Widgets.UnaryOperandSurface) {
                        surface.operand().canRemove = false;
                    }
                    this.operandSurface(surface);
                };
                Object.defineProperty(FilterEditor.prototype, "helper", {
                    get: function () {
                        return this.options() && this.options().helper;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FilterEditor.prototype, "path", {
                    get: function () {
                        return this.options() && this.options().path;
                    },
                    enumerable: true,
                    configurable: true
                });
                FilterEditor.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this.operandSurface() && this.operandSurface().dispose();
                };
                FilterEditor.prototype.onInput = function (s, e) {
                    var self = this;
                    this.timeout && clearTimeout(this.timeout);
                    this.timeout = setTimeout(function () {
                        self.onValueChange(s.component.option("text"));
                    }, 200);
                };
                FilterEditor.prototype.onFocus = function () {
                    this.textFocused(true);
                };
                FilterEditor.prototype.onBlur = function () {
                    this.textFocused(false);
                };
                FilterEditor.prototype.cacheElement = function ($element) {
                    this.editorContainer($element.dxTextArea("instance"));
                };
                FilterEditor.prototype.updateCriteria = function () {
                    if (this.isSurfaceValid()) {
                        this.operand = this._generateOperand(this.value());
                        this.operandSurface() && this.operandSurface().dispose();
                        this.operandSurface(this._generateSurface(this.operand));
                    }
                };
                FilterEditor.prototype.onValueChange = function (value) {
                    var _this = this;
                    if (this.displayValue() === value)
                        return;
                    this.displayValue(value);
                    if (this.displayExpressionConverter) {
                        this.displayExpressionConverter.toRealExpression(this.path(), value).done(function (result) {
                            _this.value(result);
                            _this.updateCriteria();
                        }).fail(function () {
                            _this.value(value);
                            _this.updateCriteria();
                        });
                    }
                    else {
                        this.updateCriteria();
                    }
                };
                FilterEditor.prototype.focusText = function () {
                    var focusFn = function (editor) {
                        setTimeout(function (_) {
                            if (editor.renderer)
                                editor.renderer.updateText();
                            editor.focus();
                        }, 1);
                    };
                    if (!this.editorContainer())
                        var subscription = this.editorContainer.subscribe(function (editor) {
                            subscription.dispose();
                            focusFn(editor);
                        });
                    else
                        focusFn(this.editorContainer());
                };
                FilterEditor.prototype.getPopupContainer = function (el) {
                    return $(el).closest(this.options()["popupContainer"] || ".dx-viewport");
                };
                return FilterEditor;
            })(Analytics.Utils.Disposable);
            Widgets.FilterEditor = FilterEditor;
            ko.bindingHandlers['dxFilterEditor'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-filtereditor').text(), $element = $(element).append(templateHtml), values = valueAccessor();
                    var itemsProvider = ko.observable(ko.unwrap(values.fieldListProvider));
                    var subscriptions = [];
                    subscriptions.push(ko.computed(function () {
                        if (values.options() && values.options().itemsProvider) {
                            itemsProvider(ko.unwrap(values.options().itemsProvider));
                        }
                        else {
                            itemsProvider(ko.unwrap(values.fieldListProvider));
                        }
                    }));
                    subscriptions.push(ko.computed(function () {
                        if (values.getDisplayNameByPath && values.options() && values.options().helper && !values.options().helper.getDisplayPropertyName) {
                            values.options().helper.getDisplayPropertyName = values.getDisplayNameByPath;
                        }
                    }));
                    var editor = new FilterEditor(values.options, itemsProvider, $(element).closest('.dx-rtl').length > 0, values.displayNameProvider);
                    ko.applyBindings(editor, $element.children()[0]);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        subscriptions.forEach(function (x) { return x.dispose(); });
                        editor.dispose();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            ko.components.register("dx-filtereditor-plain", {
                viewModel: {
                    createViewModel: function (params, componentInfo) {
                        var viewModel = new FilterEditor(params.options, ko.observable(params.fieldListProvider), undefined, params.displayNameProvider);
                        viewModel.popupVisible(true);
                        params.options().value.subscribe(function () {
                            viewModel.popupVisible(false);
                            viewModel.popupVisible(true);
                        });
                        return viewModel;
                    }
                },
                template: { element: 'dx-filtereditor-plain' }
            });
            ko.components.register("dx-filtereditor-advanced", {
                viewModel: {
                    createViewModel: function (params, componentInfo) {
                        var viewModel = new FilterEditor(params.options, ko.observable(params.fieldListProvider), undefined, params.displayNameProvider);
                        viewModel.advancedMode(true);
                        viewModel.popupVisible(true);
                        params.options().value.subscribe(function () {
                            viewModel.popupVisible(false);
                            viewModel.popupVisible(true);
                        });
                        return viewModel;
                    }
                },
                template: { element: 'dx-filtereditor-advanced' }
            });
            ko.bindingHandlers["cacheElement"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    value.action($(element));
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FilterStringOptions = (function () {
                function FilterStringOptions(filterString, dataMember, disabled, title) {
                    var _this = this;
                    this.popupContainer = ".dx-viewport";
                    this.itemsProvider = null;
                    this.resetValue = function () {
                        _this.value("");
                    };
                    this.title = ko.pureComputed({
                        read: function () {
                            var title = _this._title();
                            return DevExpress.Analytics.getLocalization(title.text, title.localizationId);
                        },
                        write: function (value) {
                            _this._title({ text: value });
                        }
                    });
                    this.value = filterString;
                    this.path = dataMember || ko.observable("");
                    this.disabled = disabled || ko.observable(false);
                    this.helper = new Widgets.DefaultFilterEditorHelper();
                    this._title = ko.observable(title || { text: DevExpress.Analytics.getLocalization("Filter Editor", "DataAccessUIStringId.FiltersView") });
                }
                return FilterStringOptions;
            })();
            Widgets.FilterStringOptions = FilterStringOptions;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                Internal.formatStringStandardPatterns = {
                    'DateTime': { type: 'System.DateTime', value: new Date(Date.now()), patterns: [] },
                    'Number': { type: 'System.Int32', value: '123456789', patterns: ['#.00', '#, #', '0.E+0.0', '0.e+0.0', 'n', 'n1', 'n2', 'e', 'e1', 'f', 'f1'] },
                    'Percent': { type: 'System.Int32', value: '100', patterns: ['0.00%', '0%'] },
                    'Currency': { type: 'System.Int32', value: '100', patterns: ['$0.00', '$0', 'c', 'c1', 'c2'] },
                    'Special': { type: 'System.Int32', value: '123456789', patterns: ['(###) ### - ####', '### - ## - ####'] },
                    'General': { type: 'System.String', value: '', patterns: ['General format have no specific number format'] }
                };
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="patterns.ts" />
/// <reference path="../utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FormatStringEditor = (function (_super) {
                __extends(FormatStringEditor, _super);
                function FormatStringEditor(value, disabled, defaultPatterns, customPatterns, actions, rtl, popupContainer) {
                    _super.call(this);
                    this.currentType = ko.observable();
                    this.patternList = ko.observableArray([]);
                    this.canAddCustomFormat = ko.observable(false);
                    this.formatPrefix = ko.observable("");
                    this.formatSuffix = ko.observable("");
                    this.previewString = ko.observable("Preview string");
                    this.formatResult = ko.observable("");
                    this.selectedFormats = ko.observable([]);
                    this.selectedTypes = ko.observable([]);
                    this.popupVisible = ko.observable(false);
                    this.localizationIdMap = {
                        'title': { text: 'FormatString Editor', localizationId: 'ASPxReportsStringId.ReportDesigner_FormatStringEditor_Title' },
                        'category': { text: 'Category', localizationId: 'DevExpress.XtraPrinting.XlDocumentOptions.Category' },
                        'preview': { text: 'Preview', localizationId: 'ASPxReportsStringId.ReportDesigner_TooltipButtons_Preview' },
                        'types': { text: 'Types', localizationId: 'ASPxReportsStringId.ReportDesigner_FormatStringEditor_Types' },
                        'add': { text: 'Add', localizationId: 'ChartStringId.MenuItemAdd' },
                        'prefix': { text: 'Prefix', localizationId: 'DevExpress.XtraPrinting.Recipient.Prefix' },
                        'suffix': { text: 'Suffix', localizationId: 'ASPxReportsStringId.ReportDesigner_FormatStringEditor_Suffix' }
                    };
                    this.option("value", value);
                    this.option("disabled", disabled || false);
                    this.option("rtl", rtl || false);
                    this.option("popupContainer", popupContainer || ".dx-viewport");
                    var self = this;
                    this.popupService = new Analytics.Internal.PopupService();
                    this._standardPatternSource = defaultPatterns || Widgets.Internal.formatStringStandardPatterns;
                    this._customPatternSource = customPatterns || {};
                    this.types = this._convertArray(Object.keys(this._standardPatternSource));
                    this._disposables.push(this.currentType.subscribe(function (newVal) {
                        if (self.isGeneralType) {
                            self.formatResult("");
                            self.selectedFormats([]);
                        }
                        else {
                            self._updateFormatList();
                        }
                    }));
                    this.currentType(this.types[0].name);
                    this._disposables.push(this.formatResult.subscribe(function (newVal) {
                        self._updateCanAddCustomFormat(newVal);
                        self._updatePreview();
                    }));
                    this._disposables.push(this.formatPrefix.subscribe(function (newVal) {
                        self._updatePreview();
                    }));
                    this._disposables.push(this.formatSuffix.subscribe(function (newVal) {
                        self._updatePreview();
                    }));
                    this._disposables.push(this.popupVisible.subscribe(function (newVal) {
                        if (!newVal)
                            return;
                        self._initEditor(value());
                        self.selectedTypes(self.types.filter(function (item) { return item.name === self.currentType(); }));
                    }));
                    this._createMainPopupButtons();
                    actions && actions.updatePreview && (this.updatePreview = actions.updatePreview);
                    this.setType = function (e) {
                        self.currentType(e.itemData.name);
                        self._updateSelection();
                    };
                    this.setFormat = function (e) {
                        self.formatResult(e.itemData.name);
                    };
                    this.addCustomFormat = function () {
                        if (self.formatResult() && self.canAddCustomFormat()) {
                            self.customPatterns.push(self.formatResult());
                            self._updateFormatList();
                            self._scrollToBottom();
                            actions && actions.saveCustomPattern(self.currentType(), self.formatResult());
                            self._updateSelection(self.patternList().length - 1);
                            self.canAddCustomFormat(false);
                        }
                    };
                    this.removeCustomFormat = function (data) {
                        var currentSelection = self.selectedFormats()[0];
                        var patternList = self.patternList();
                        var removedItemIndex = patternList.map(function (item) { return item.name; }).indexOf(data.name);
                        self.customPatterns.splice(self.customPatterns.indexOf(data.name), 1);
                        self._updateFormatList();
                        actions && actions.removeCustomPattern(self.currentType(), data.name);
                        if (currentSelection.name === data.name) {
                            self._updateSelection(removedItemIndex === (patternList.length - 1) ? (self.patternList().length - 1) : removedItemIndex);
                        }
                        else {
                            self.selectedFormats(self.patternList().filter(function (item) { return item.name === currentSelection.name; }));
                        }
                    };
                }
                FormatStringEditor.prototype.okAction = function () {
                    var result = this.isGeneralType ? this._getGeneralPreview('{0}') : this._wrapFormat();
                    this.option("value", result);
                    this.popupVisible(false);
                };
                FormatStringEditor.prototype._createMainPopupButtons = function () {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('OK', DevExpress.Analytics.StringId.DataAccessBtnOK), onClick: function () { self.okAction(); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('Cancel', DevExpress.Analytics.StringId.DataAccessBtnCancel), onClick: function () { self.popupVisible(false); } } }
                    ];
                };
                FormatStringEditor.prototype._convertArray = function (array, canRemove) {
                    return array.map(function (item) { return { name: item, displayName: DevExpress.Analytics.getLocalization(item), canRemove: !!canRemove }; });
                };
                FormatStringEditor.prototype._scrollToBottom = function () {
                    var $scrollView = $(".dx-format-string .dx-format-string-formats").find(".dx-scrollview").filter(":visible");
                    var scrollViewInstance = $scrollView.data("dxScrollView") && $scrollView.dxScrollView("instance");
                    scrollViewInstance && scrollViewInstance["scrollTo"] && scrollViewInstance["scrollTo"](scrollViewInstance["scrollHeight"]());
                };
                FormatStringEditor.prototype._updateFormatList = function () {
                    this.selectedFormats([]);
                    var currentTypeInfo = this._standardPatternSource[this.currentType()];
                    this.patternList(this._convertArray(currentTypeInfo.patterns).concat(this._convertArray(this.customPatterns, true)));
                };
                FormatStringEditor.prototype._updateSelection = function (selectedItemIndex) {
                    var currectFormat = this.patternList()[selectedItemIndex || 0];
                    if (currectFormat) {
                        this.selectedFormats([currectFormat]);
                        this.formatResult(currectFormat.name);
                    }
                };
                FormatStringEditor.prototype._updatePreview = function () {
                    var _this = this;
                    if (this.isGeneralType) {
                        this.previewString(this._getGeneralPreview(undefined));
                        return;
                    }
                    var category = this._standardPatternSource[this.currentType()];
                    var updatedPreviewPromise = this.updatePreview(category.value, category.type, this._wrapFormat());
                    this._lastUpdatePreviewPromise = updatedPreviewPromise;
                    updatedPreviewPromise
                        .done(function (previewString) {
                        if (_this._lastUpdatePreviewPromise === updatedPreviewPromise)
                            _this.previewString(previewString);
                    }).fail(function (error) {
                        if (_this._lastUpdatePreviewPromise === updatedPreviewPromise)
                            _this.previewString(Analytics.getLocalization("Preview string is not available", "ASPxReportsStringId.ReportDesigner_FormatStringEditor_PreviewNotAvailable_Text"));
                    });
                };
                FormatStringEditor.prototype._getGeneralPreview = function (value) {
                    if (value === void 0) { value = '###'; }
                    return this.formatPrefix() + value + this.formatSuffix();
                };
                FormatStringEditor.prototype._wrapFormat = function (format) {
                    var pattern = format || this.formatResult();
                    if (pattern && pattern.indexOf("{0:") !== -1) {
                        return pattern;
                    }
                    return pattern ? "{0:" + pattern + "}" : "";
                };
                FormatStringEditor.prototype._updateCanAddCustomFormat = function (newFormat) {
                    if (!newFormat) {
                        this.canAddCustomFormat(false);
                        return;
                    }
                    var canAddCustomFormat = true;
                    for (var name in this._standardPatternSource) {
                        canAddCustomFormat = this._standardPatternSource[name].patterns.indexOf(newFormat) === -1;
                        if (!canAddCustomFormat) {
                            break;
                        }
                    }
                    this.canAddCustomFormat(canAddCustomFormat ? this.customPatterns.indexOf(newFormat) === -1 : canAddCustomFormat);
                };
                FormatStringEditor.prototype._initEditor = function (formatStringValue) {
                    var _this = this;
                    if (!formatStringValue) {
                        this.setType({ itemData: this.types[0] });
                        return;
                    }
                    if (formatStringValue.indexOf("{0}") !== -1) {
                        this.currentType("General");
                        this.formatPrefix(formatStringValue.substring(0, formatStringValue.indexOf("{0}")));
                        this.formatSuffix(formatStringValue.substring(formatStringValue.indexOf("{0}") + 3));
                        return;
                    }
                    var startIndex = formatStringValue.indexOf("{0:"), closingBracketIndex = formatStringValue.indexOf("}", startIndex), formatPattern = formatStringValue.substring(startIndex + 3, closingBracketIndex), isFormatPatternFind;
                    var selectTypePatternPair = function () {
                        _this.currentType(name);
                        if (startIndex === 0 && closingBracketIndex === (formatStringValue.length - 1)) {
                            _this.selectedFormats(_this.patternList().filter(function (item) { return item.name === formatPattern; }));
                            _this.formatResult(formatPattern);
                            isFormatPatternFind = true;
                        }
                    };
                    for (var name in this._standardPatternSource) {
                        if (this._standardPatternSource[name].patterns.indexOf(formatPattern) !== -1) {
                            selectTypePatternPair();
                            break;
                        }
                        var customPatterns = this._customPatternSource[this._standardPatternSource[name].type];
                        if (customPatterns && customPatterns.indexOf(formatPattern) !== -1) {
                            selectTypePatternPair();
                            break;
                        }
                    }
                    if (!isFormatPatternFind) {
                        this.currentType(this.types[0].name);
                        this.selectedFormats([]);
                        this.formatResult(formatStringValue);
                    }
                };
                FormatStringEditor.prototype.updateInputText = function (propertyName, componentInstance) {
                    this[propertyName](componentInstance.option("text"));
                };
                FormatStringEditor.prototype.option = function (name, value) {
                    if (value !== void 0) {
                        if (ko.isObservable(this[name])) {
                            this[name](value);
                        }
                        else {
                            this[name] = value;
                        }
                    }
                    return ko.unwrap(this[name]);
                };
                FormatStringEditor.prototype.updatePreview = function (value, category, pattern) {
                    return $.Deferred().resolve(value || "preview string").promise();
                };
                Object.defineProperty(FormatStringEditor.prototype, "customPatterns", {
                    get: function () {
                        var currentTypeInfo = this._standardPatternSource[this.currentType()];
                        return this._customPatternSource[currentTypeInfo.type] = this._customPatternSource[currentTypeInfo.type] || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FormatStringEditor.prototype, "isGeneralType", {
                    get: function () {
                        return this.currentType() === "General";
                    },
                    enumerable: true,
                    configurable: true
                });
                FormatStringEditor.prototype.getDisplayText = function (key) {
                    return DevExpress.Analytics.getLocalization(this.localizationIdMap[key].text, this.localizationIdMap[key].localizationId);
                };
                FormatStringEditor.prototype.getPopupContainer = function (el) {
                    return $(el).closest(this.option("popupContainer"));
                };
                return FormatStringEditor;
            })(Analytics.Utils.Disposable);
            Widgets.FormatStringEditor = FormatStringEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="formatstringeditor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['dxFormatEditor'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-format-string').text(), $element = $(element).append(templateHtml), values = valueAccessor();
                    var formatEditor = new Widgets.FormatStringEditor(values.value, values['disabled'], values['standardPatterns'], values['customPatterns'] || DevExpress.Designer["Report"] && DevExpress.Designer["Report"]["formatStringEditorCustomSet"], values['actions'] || DevExpress.Designer["Report"] && DevExpress.Designer["Report"]["FormatStringService"].actions, values['rtl'], values['popupContainer']);
                    ko.applyBindings(formatEditor, $element.children()[0]);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        formatEditor.dispose();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Internal;
            (function (Internal) {
                var dxPopupWithAutoHeight = (function (_super) {
                    __extends(dxPopupWithAutoHeight, _super);
                    function dxPopupWithAutoHeight(element, options) {
                        _super.call(this, element, options);
                    }
                    dxPopupWithAutoHeight.prototype._setContentHeight = function () {
                        this["_$popupContent"].css({
                            height: "100%"
                        });
                    };
                    return dxPopupWithAutoHeight;
                })(DevExpress.ui.dxPopup);
                Internal.dxPopupWithAutoHeight = dxPopupWithAutoHeight;
                DevExpress.registerComponent("dxPopupWithAutoHeight", dxPopupWithAutoHeight);
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var HighlightEngine = (function (_super) {
                __extends(HighlightEngine, _super);
                function HighlightEngine(options) {
                    var _this = this;
                    _super.call(this);
                    this._$spanProtect = $("<span>");
                    this._$spanSearch = $("<span>").addClass('dx-datagrid-search-text');
                    this.content = ko.observable("");
                    if (ko.isSubscribable(options.text)) {
                        this._disposables.push(options.text.subscribe(function (newText) {
                            _this.content(_this._getHighlightContent(newText, ko.unwrap(options.textToSearch)));
                        }));
                    }
                    this._disposables.push(options.textToSearch.subscribe(function (newFind) {
                        _this.content(_this._getHighlightContent(ko.unwrap(options.text), newFind));
                    }));
                    this.content(this._getHighlightContent(ko.unwrap(options.text), ko.unwrap(options.textToSearch)));
                }
                HighlightEngine.prototype._getHighlightContent = function (text, textToSearch) {
                    var _this = this;
                    var searchPattern = textToSearch;
                    var result = text;
                    if (searchPattern) {
                        var match = Analytics.Utils.findMatchesInString(result, searchPattern);
                        if (match) {
                            var newResult = "", curIndex = 0, subString = result;
                            match.forEach(function (item, index) {
                                var itemIndex = subString.indexOf(item);
                                var textBeforeMath = result.substr(curIndex, itemIndex);
                                subString = subString.substr(itemIndex + item.length);
                                if (textBeforeMath) {
                                    _this._$spanProtect.text(textBeforeMath);
                                    newResult += _this._$spanProtect[0].outerHTML;
                                }
                                _this._$spanSearch.text(item);
                                newResult += _this._$spanSearch[0].outerHTML;
                                curIndex = result.length - subString.length;
                                if (index === match.length - 1) {
                                    if (subString) {
                                        _this._$spanProtect.text(subString);
                                        newResult += _this._$spanProtect[0].outerHTML;
                                    }
                                }
                            });
                            return newResult;
                        }
                    }
                    this._$spanProtect.text(result);
                    result = this._$spanProtect[0].outerHTML;
                    return result;
                };
                return HighlightEngine;
            })(Analytics.Utils.Disposable);
            Internal.HighlightEngine = HighlightEngine;
            ko.bindingHandlers["searchHighlighting"] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var highlight = new HighlightEngine(valueAccessor());
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        highlight.dispose();
                    });
                    setTimeout(function () {
                        var isInitialized = false;
                        ko.computed({
                            read: function () {
                                if (!isInitialized && ko.bindingHandlers["html"].init) {
                                    ko.bindingHandlers["html"].init(element, function () { return highlight.content; }, allBindings, viewModel, bindingContext);
                                    isInitialized = true;
                                }
                                if (ko.bindingHandlers["html"].update) {
                                    ko.bindingHandlers["html"].update(element, function () { return highlight.content; }, allBindings, viewModel, bindingContext);
                                }
                            },
                            disposeWhenNodeIsRemoved: element
                        });
                    }, 1);
                }
            };
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="treelistController.ts" />
/// <reference path="treelistItem.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['treelist'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var treeListViewModel = null;
                    var values = valueAccessor(), options = ko.unwrap(values), pathArray, updateScrollBar = function () {
                        var $scrollView = $(element).closest(".dx-scrollview");
                        if ($scrollView.data("dxScrollView")) {
                            var scrollView = $scrollView.dxScrollView("instance");
                            scrollView && scrollView["update"]();
                        }
                        if (options.onItemsVisibilityChanged) {
                            options.onItemsVisibilityChanged();
                        }
                    }, updateTreeList = function (options) {
                        options.treeListController = options.treeListController ? options.treeListController : new Widgets.TreeListController();
                        if (!options.treeListController.dragDropHandler) {
                            options.treeListController.dragDropHandler = bindingContext.$root.fieldDragHandler;
                        }
                        treeListViewModel && treeListViewModel.dispose();
                        if (!options.rtl) {
                            options.rtl = $(element).closest('.dx-rtl').length > 0;
                        }
                        pathArray = ko.computed(function () {
                            var result = ko.unwrap(options.path);
                            if (!Array.isArray(result)) {
                                return !!result ? result.split('.') : [];
                            }
                            return result;
                        });
                        treeListViewModel = new Widgets.TreeListRootItemViewModel(options, pathArray, updateScrollBar, options.rtl);
                        if (options.expandRootItems) {
                            treeListViewModel.items().forEach(function (item) { return item.toggleCollapsed(); });
                        }
                        var templateHtml = $('#dx-treelist').text() || options.templateHtml, $element = $(element).html(templateHtml);
                        var childContext = bindingContext.createChildContext(treeListViewModel);
                        ko.applyBindings(childContext, $element.children()[0]);
                    };
                    updateTreeList($.extend({}, options));
                    var subscribtion = null;
                    if (ko.isSubscribable(values)) {
                        subscribtion = values.subscribe(function (newValue) {
                            updateTreeList(newValue);
                        });
                    }
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        treeListViewModel && treeListViewModel.dispose();
                        subscribtion && subscribtion.dispose();
                        pathArray && pathArray.dispose();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="ace/binding.ts" />
/// <reference path="common/codeCompletor.ts" />
/// <reference path="common/displayNameProvider.ts" />
/// <reference path="common/pathRequest.ts" />
/// <reference path="criteria/operators/aggregate.ts" />
/// <reference path="criteria/operators/between.ts" />
/// <reference path="criteria/operators/binary.ts" />
/// <reference path="criteria/operators/constant.ts" />
/// <reference path="criteria/operators/criteriaOperator.ts" />
/// <reference path="criteria/operators/function.ts" />
/// <reference path="criteria/operators/group.ts" />
/// <reference path="criteria/operators/in.ts" />
/// <reference path="criteria/operators/join.ts" />
/// <reference path="criteria/operators/parameter.ts" />
/// <reference path="criteria/operators/property.ts" />
/// <reference path="criteria/operators/unary.ts" />
/// <reference path="criteria/operators/value.ts" />
/// <reference path="criteria/criteriaOperatorPreprocessor.ts" />
/// <reference path="criteria/utils.ts" />
/// <reference path="expressioneditor/tools/functions.ts" />
/// <reference path="expressioneditor/tools/operatorNames.ts" />
/// <reference path="expressioneditor/tools/tools.ts" />
/// <reference path="expressioneditor/tools/treeListControllers.ts" />
/// <reference path="expressioneditor/bindings.ts" />
/// <reference path="expressioneditor/expressioneditor.ts" />
/// <reference path="filtereditor/helpers/addon.ts" />
/// <reference path="filtereditor/helpers/codeCompletor.ts" />
/// <reference path="filtereditor/helpers/helper.ts" />
/// <reference path="filtereditor/helpers/serializer.ts" />
/// <reference path="filtereditor/helpers/treelistController.ts" />
/// <reference path="filtereditor/helpers/validator.ts" />
/// <reference path="filtereditor/operators/aggregateOperandSurface.ts" />
/// <reference path="filtereditor/operators/betweenOperandSurface.ts" />
/// <reference path="filtereditor/operators/binaryOperandSurface.ts" />
/// <reference path="filtereditor/operators/criteriaOperatorSurface.ts" />
/// <reference path="filtereditor/operators/functionOperandSurface.ts" />
/// <reference path="filtereditor/operators/groupOperandSurface.ts" />
/// <reference path="filtereditor/operators/inOperandSurface.ts" />
/// <reference path="filtereditor/operators/operandParameterSurface.ts" />
/// <reference path="filtereditor/operators/operandPropertySurface.ts" />
/// <reference path="filtereditor/operators/operandSurfaceBase.ts" />
/// <reference path="filtereditor/operators/operandValueSurface.ts" />
/// <reference path="filtereditor/operators/unaryOperandSurface.ts" />
/// <reference path="filtereditor/filtereditor.ts" />
/// <reference path="filtereditor/filtereditoroptions.ts" />
/// <reference path="formatstring/binding.ts" />
/// <reference path="formatstring/formatstringeditor.ts" />
/// <reference path="formatstring/patterns.ts" />
/// <reference path="internal/popupwithautoheight.ts" />
/// <reference path="internal/valueEditorHelper.ts" />
/// <reference path="bindings.ts" />
/// <reference path="utils.ts" />
/// <reference path="searchHighlighting.ts" />
/// <reference path="treelist/binding.ts" />
/// <reference path="treelist/treelistController.ts" />
/// <reference path="treelist/treelistItem.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            var DisplayExpressionConverter = (function (_super) {
                __extends(DisplayExpressionConverter, _super);
                function DisplayExpressionConverter() {
                    _super.apply(this, arguments);
                }
                return DisplayExpressionConverter;
            })(DevExpress.Analytics.Utils.DisplayExpressionConverter);
            Utils.DisplayExpressionConverter = DisplayExpressionConverter;
            var HighlightEngine = (function (_super) {
                __extends(HighlightEngine, _super);
                function HighlightEngine() {
                    _super.apply(this, arguments);
                }
                return HighlightEngine;
            })(DevExpress.Analytics.Internal.HighlightEngine);
            Utils.HighlightEngine = HighlightEngine;
            var Disposable = (function (_super) {
                __extends(Disposable, _super);
                function Disposable() {
                    _super.apply(this, arguments);
                }
                return Disposable;
            })(DevExpress.Analytics.Utils.Disposable);
            Utils.Disposable = Disposable;
            Utils.integerValueConverter = DevExpress.Analytics.Utils.integerValueConverter;
            Utils.floatValueConverter = DevExpress.Analytics.Utils.floatValueConverter;
            Utils.classExists = DevExpress.Analytics.Utils.classExists;
            Utils.setCursorInFunctionParameter = DevExpress.Analytics.Utils.setCursorInFunctionParameter;
            Utils.isList = DevExpress.Analytics.Utils.isList;
            ;
            ;
            ;
            ;
            ;
            ;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "DisplayExpressionConverter");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Internal, "HighlightEngine");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "Disposable");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "integerValueConverter");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "floatValueConverter");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "classExists");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "setCursorInFunctionParameter");
DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Utils, DevExpress.Analytics.Utils, "isList");
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            ;
            ;
            ;
            var PathRequest = (function (_super) {
                __extends(PathRequest, _super);
                function PathRequest() {
                    _super.apply(this, arguments);
                }
                return PathRequest;
            })(DevExpress.Analytics.Utils.PathRequest);
            Widgets.PathRequest = PathRequest;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Utils, "PathRequest");
            Widgets.ace = DevExpress.Analytics.Widgets.ace;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "ace");
            Widgets.aceAvailable = DevExpress.Analytics.Widgets.aceAvailable;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "aceAvailable");
            var CodeCompletor = (function (_super) {
                __extends(CodeCompletor, _super);
                function CodeCompletor() {
                    _super.apply(this, arguments);
                }
                return CodeCompletor;
            })(DevExpress.Analytics.Widgets.CodeCompletor);
            Widgets.CodeCompletor = CodeCompletor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "CodeCompletor");
            Widgets.createFunctionCompletion = DevExpress.Analytics.Widgets.createFunctionCompletion;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "createFunctionCompletion");
            Widgets.functionDisplay = DevExpress.Analytics.Widgets.Internal.functionDisplay;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "functionDisplay");
            Widgets.operatorNames = DevExpress.Analytics.Widgets.Internal.operatorNames;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "operatorNames");
            var Tools = (function (_super) {
                __extends(Tools, _super);
                function Tools() {
                    _super.apply(this, arguments);
                }
                return Tools;
            })(DevExpress.Analytics.Widgets.Internal.Tools);
            Widgets.Tools = Tools;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "Tools");
            var ExpressionEditorTreeListController = (function (_super) {
                __extends(ExpressionEditorTreeListController, _super);
                function ExpressionEditorTreeListController() {
                    _super.apply(this, arguments);
                }
                return ExpressionEditorTreeListController;
            })(DevExpress.Analytics.Widgets.ExpressionEditorTreeListController);
            Widgets.ExpressionEditorTreeListController = ExpressionEditorTreeListController;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "ExpressionEditorTreeListController");
            var ExpressionEditorParametersTreeListController = (function (_super) {
                __extends(ExpressionEditorParametersTreeListController, _super);
                function ExpressionEditorParametersTreeListController() {
                    _super.apply(this, arguments);
                }
                return ExpressionEditorParametersTreeListController;
            })(DevExpress.Analytics.Widgets.ExpressionEditorParametersTreeListController);
            Widgets.ExpressionEditorParametersTreeListController = ExpressionEditorParametersTreeListController;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "ExpressionEditorParametersTreeListController");
            Widgets.wrapExpressionValue = DevExpress.Analytics.Widgets.wrapExpressionValue;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "wrapExpressionValue");
            var ExpressionEditor = (function (_super) {
                __extends(ExpressionEditor, _super);
                function ExpressionEditor() {
                    _super.apply(this, arguments);
                }
                return ExpressionEditor;
            })(DevExpress.Analytics.Widgets.ExpressionEditor);
            Widgets.ExpressionEditor = ExpressionEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "ExpressionEditor");
            var FilterEditorAddOn = (function (_super) {
                __extends(FilterEditorAddOn, _super);
                function FilterEditorAddOn() {
                    _super.apply(this, arguments);
                }
                return FilterEditorAddOn;
            })(DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn);
            Widgets.FilterEditorAddOn = FilterEditorAddOn;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "FilterEditorAddOn");
            var FilterEditorCodeCompletor = (function (_super) {
                __extends(FilterEditorCodeCompletor, _super);
                function FilterEditorCodeCompletor() {
                    _super.apply(this, arguments);
                }
                return FilterEditorCodeCompletor;
            })(DevExpress.Analytics.Widgets.Internal.FilterEditorCodeCompletor);
            Widgets.FilterEditorCodeCompletor = FilterEditorCodeCompletor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "FilterEditorCodeCompletor");
            Widgets.initDisplayText = DevExpress.Analytics.Widgets.initDisplayText;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "initDisplayText");
            var FilterEditorHelper = (function (_super) {
                __extends(FilterEditorHelper, _super);
                function FilterEditorHelper() {
                    _super.apply(this, arguments);
                }
                return FilterEditorHelper;
            })(DevExpress.Analytics.Widgets.FilterEditorHelper);
            Widgets.FilterEditorHelper = FilterEditorHelper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FilterEditorHelper");
            Widgets.DefaultFilterEditorHelper = DevExpress.Analytics.Widgets.DefaultFilterEditorHelper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "DefaultFilterEditorHelper");
            var FilterEditorSerializer = (function (_super) {
                __extends(FilterEditorSerializer, _super);
                function FilterEditorSerializer() {
                    _super.apply(this, arguments);
                }
                return FilterEditorSerializer;
            })(DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer);
            Widgets.FilterEditorSerializer = FilterEditorSerializer;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "FilterEditorSerializer");
            var FilterEditorTreeListController = (function (_super) {
                __extends(FilterEditorTreeListController, _super);
                function FilterEditorTreeListController() {
                    _super.apply(this, arguments);
                }
                return FilterEditorTreeListController;
            })(DevExpress.Analytics.Widgets.FilterEditorTreeListController);
            Widgets.FilterEditorTreeListController = FilterEditorTreeListController;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FilterEditorTreeListController");
            Widgets.CriteriaSurfaceValidatorState = DevExpress.Analytics.Widgets.Internal.CriteriaSurfaceValidatorState;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "CriteriaSurfaceValidatorState");
            var CriteriaSurfaceValidator = (function (_super) {
                __extends(CriteriaSurfaceValidator, _super);
                function CriteriaSurfaceValidator() {
                    _super.apply(this, arguments);
                }
                return CriteriaSurfaceValidator;
            })(DevExpress.Analytics.Widgets.Internal.CriteriaSurfaceValidator);
            Widgets.CriteriaSurfaceValidator = CriteriaSurfaceValidator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "CriteriaSurfaceValidator");
            var AggregateOperandSurface = (function (_super) {
                __extends(AggregateOperandSurface, _super);
                function AggregateOperandSurface() {
                    _super.apply(this, arguments);
                }
                return AggregateOperandSurface;
            })(DevExpress.Analytics.Widgets.AggregateOperandSurface);
            Widgets.AggregateOperandSurface = AggregateOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "AggregateOperandSurface");
            var BetweenOperandSurface = (function (_super) {
                __extends(BetweenOperandSurface, _super);
                function BetweenOperandSurface() {
                    _super.apply(this, arguments);
                }
                return BetweenOperandSurface;
            })(DevExpress.Analytics.Widgets.BetweenOperandSurface);
            Widgets.BetweenOperandSurface = BetweenOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "BetweenOperandSurface");
            var BinaryOperandSurface = (function (_super) {
                __extends(BinaryOperandSurface, _super);
                function BinaryOperandSurface() {
                    _super.apply(this, arguments);
                }
                return BinaryOperandSurface;
            })(DevExpress.Analytics.Widgets.BinaryOperandSurface);
            Widgets.BinaryOperandSurface = BinaryOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "BinaryOperandSurface");
            var CriteriaOperatorSurface = (function (_super) {
                __extends(CriteriaOperatorSurface, _super);
                function CriteriaOperatorSurface() {
                    _super.apply(this, arguments);
                }
                return CriteriaOperatorSurface;
            })(DevExpress.Analytics.Widgets.CriteriaOperatorSurface);
            Widgets.CriteriaOperatorSurface = CriteriaOperatorSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "CriteriaOperatorSurface");
            var FunctionOperandSurface = (function (_super) {
                __extends(FunctionOperandSurface, _super);
                function FunctionOperandSurface() {
                    _super.apply(this, arguments);
                }
                return FunctionOperandSurface;
            })(DevExpress.Analytics.Widgets.FunctionOperandSurface);
            Widgets.FunctionOperandSurface = FunctionOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FunctionOperandSurface");
            var GroupOperandSurface = (function (_super) {
                __extends(GroupOperandSurface, _super);
                function GroupOperandSurface() {
                    _super.apply(this, arguments);
                }
                return GroupOperandSurface;
            })(DevExpress.Analytics.Widgets.GroupOperandSurface);
            Widgets.GroupOperandSurface = GroupOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "GroupOperandSurface");
            var InOperandSurface = (function (_super) {
                __extends(InOperandSurface, _super);
                function InOperandSurface() {
                    _super.apply(this, arguments);
                }
                return InOperandSurface;
            })(DevExpress.Analytics.Widgets.InOperandSurface);
            Widgets.InOperandSurface = InOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "InOperandSurface");
            var OperandParameterSurface = (function (_super) {
                __extends(OperandParameterSurface, _super);
                function OperandParameterSurface() {
                    _super.apply(this, arguments);
                }
                return OperandParameterSurface;
            })(DevExpress.Analytics.Widgets.OperandParameterSurface);
            Widgets.OperandParameterSurface = OperandParameterSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "OperandParameterSurface");
            var OperandPropertySurface = (function (_super) {
                __extends(OperandPropertySurface, _super);
                function OperandPropertySurface() {
                    _super.apply(this, arguments);
                }
                return OperandPropertySurface;
            })(DevExpress.Analytics.Widgets.OperandPropertySurface);
            Widgets.OperandPropertySurface = OperandPropertySurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "OperandPropertySurface");
            var OperandSurfaceBase = (function (_super) {
                __extends(OperandSurfaceBase, _super);
                function OperandSurfaceBase() {
                    _super.apply(this, arguments);
                }
                return OperandSurfaceBase;
            })(DevExpress.Analytics.Widgets.OperandSurfaceBase);
            Widgets.OperandSurfaceBase = OperandSurfaceBase;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "OperandSurfaceBase");
            var OperandValueSurface = (function (_super) {
                __extends(OperandValueSurface, _super);
                function OperandValueSurface() {
                    _super.apply(this, arguments);
                }
                return OperandValueSurface;
            })(DevExpress.Analytics.Widgets.OperandValueSurface);
            Widgets.OperandValueSurface = OperandValueSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "OperandValueSurface");
            var UnaryOperandSurface = (function (_super) {
                __extends(UnaryOperandSurface, _super);
                function UnaryOperandSurface() {
                    _super.apply(this, arguments);
                }
                return UnaryOperandSurface;
            })(DevExpress.Analytics.Widgets.UnaryOperandSurface);
            Widgets.UnaryOperandSurface = UnaryOperandSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "UnaryOperandSurface");
            var FilterEditor = (function (_super) {
                __extends(FilterEditor, _super);
                function FilterEditor() {
                    _super.apply(this, arguments);
                }
                return FilterEditor;
            })(DevExpress.Analytics.Widgets.FilterEditor);
            Widgets.FilterEditor = FilterEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FilterEditor");
            var FilterStringOptions = (function (_super) {
                __extends(FilterStringOptions, _super);
                function FilterStringOptions() {
                    _super.apply(this, arguments);
                }
                return FilterStringOptions;
            })(DevExpress.Analytics.Widgets.FilterStringOptions);
            Widgets.FilterStringOptions = FilterStringOptions;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FilterStringOptions");
            var FormatStringEditor = (function (_super) {
                __extends(FormatStringEditor, _super);
                function FormatStringEditor() {
                    _super.apply(this, arguments);
                }
                return FormatStringEditor;
            })(DevExpress.Analytics.Widgets.FormatStringEditor);
            Widgets.FormatStringEditor = FormatStringEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "FormatStringEditor");
            Widgets.formatStringStandardPatterns = DevExpress.Analytics.Widgets.Internal.formatStringStandardPatterns;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "formatStringStandardPatterns");
            var dxPopupWithAutoHeight = (function (_super) {
                __extends(dxPopupWithAutoHeight, _super);
                function dxPopupWithAutoHeight() {
                    _super.apply(this, arguments);
                }
                return dxPopupWithAutoHeight;
            })(DevExpress.Analytics.Widgets.Internal.dxPopupWithAutoHeight);
            Widgets.dxPopupWithAutoHeight = dxPopupWithAutoHeight;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "dxPopupWithAutoHeight");
            var ValueEditorHelper = (function (_super) {
                __extends(ValueEditorHelper, _super);
                function ValueEditorHelper() {
                    _super.apply(this, arguments);
                }
                return ValueEditorHelper;
            })(DevExpress.Analytics.Widgets.Internal.ValueEditorHelper);
            Widgets.ValueEditorHelper = ValueEditorHelper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets.Internal, "ValueEditorHelper");
            var TreeListController = (function (_super) {
                __extends(TreeListController, _super);
                function TreeListController() {
                    _super.apply(this, arguments);
                }
                return TreeListController;
            })(DevExpress.Analytics.Widgets.TreeListController);
            Widgets.TreeListController = TreeListController;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "TreeListController");
            Widgets.treeListEditAction = DevExpress.Analytics.Widgets.treeListEditAction;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "treeListEditAction");
            var TreeListItemViewModel = (function (_super) {
                __extends(TreeListItemViewModel, _super);
                function TreeListItemViewModel() {
                    _super.apply(this, arguments);
                }
                return TreeListItemViewModel;
            })(DevExpress.Analytics.Widgets.TreeListItemViewModel);
            Widgets.TreeListItemViewModel = TreeListItemViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "TreeListItemViewModel");
            var TreeListRootItemViewModel = (function (_super) {
                __extends(TreeListRootItemViewModel, _super);
                function TreeListRootItemViewModel() {
                    _super.apply(this, arguments);
                }
                return TreeListRootItemViewModel;
            })(DevExpress.Analytics.Widgets.TreeListRootItemViewModel);
            Widgets.TreeListRootItemViewModel = TreeListRootItemViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Widgets, DevExpress.Analytics.Widgets, "TreeListRootItemViewModel");
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Data;
        (function (Data) {
            Data.Aggregate = DevExpress.Analytics.Criteria.Aggregate;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "Aggregate");
            var AggregateOperand = (function (_super) {
                __extends(AggregateOperand, _super);
                function AggregateOperand() {
                    _super.apply(this, arguments);
                }
                return AggregateOperand;
            })(DevExpress.Analytics.Criteria.AggregateOperand);
            Data.AggregateOperand = AggregateOperand;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "AggregateOperand");
            var BetweenOperator = (function (_super) {
                __extends(BetweenOperator, _super);
                function BetweenOperator() {
                    _super.apply(this, arguments);
                }
                return BetweenOperator;
            })(DevExpress.Analytics.Criteria.BetweenOperator);
            Data.BetweenOperator = BetweenOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "BetweenOperator");
            Data.BinaryOperatorType = DevExpress.Analytics.Criteria.BinaryOperatorType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "BinaryOperatorType");
            var BinaryOperator = (function (_super) {
                __extends(BinaryOperator, _super);
                function BinaryOperator() {
                    _super.apply(this, arguments);
                }
                return BinaryOperator;
            })(DevExpress.Analytics.Criteria.BinaryOperator);
            Data.BinaryOperator = BinaryOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "BinaryOperator");
            var ConstantValue = (function (_super) {
                __extends(ConstantValue, _super);
                function ConstantValue() {
                    _super.apply(this, arguments);
                }
                return ConstantValue;
            })(DevExpress.Analytics.Criteria.ConstantValue);
            Data.ConstantValue = ConstantValue;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "ConstantValue");
            var CriteriaOperator = (function (_super) {
                __extends(CriteriaOperator, _super);
                function CriteriaOperator() {
                    _super.apply(this, arguments);
                }
                return CriteriaOperator;
            })(DevExpress.Analytics.Criteria.CriteriaOperator);
            Data.CriteriaOperator = CriteriaOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "CriteriaOperator");
            Data.FunctionOperatorType = DevExpress.Analytics.Criteria.FunctionOperatorType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "FunctionOperatorType");
            var FunctionOperator = (function (_super) {
                __extends(FunctionOperator, _super);
                function FunctionOperator() {
                    _super.apply(this, arguments);
                }
                return FunctionOperator;
            })(DevExpress.Analytics.Criteria.FunctionOperator);
            Data.FunctionOperator = FunctionOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "FunctionOperator");
            Data.GroupOperatorType = DevExpress.Analytics.Criteria.GroupOperatorType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "GroupOperatorType");
            var GroupOperator = (function (_super) {
                __extends(GroupOperator, _super);
                function GroupOperator() {
                    _super.apply(this, arguments);
                }
                return GroupOperator;
            })(DevExpress.Analytics.Criteria.GroupOperator);
            Data.GroupOperator = GroupOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "GroupOperator");
            var InOperator = (function (_super) {
                __extends(InOperator, _super);
                function InOperator() {
                    _super.apply(this, arguments);
                }
                return InOperator;
            })(DevExpress.Analytics.Criteria.InOperator);
            Data.InOperator = InOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "InOperator");
            var JoinOperand = (function (_super) {
                __extends(JoinOperand, _super);
                function JoinOperand() {
                    _super.apply(this, arguments);
                }
                return JoinOperand;
            })(DevExpress.Analytics.Criteria.JoinOperand);
            Data.JoinOperand = JoinOperand;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "JoinOperand");
            var OperandParameter = (function (_super) {
                __extends(OperandParameter, _super);
                function OperandParameter() {
                    _super.apply(this, arguments);
                }
                return OperandParameter;
            })(DevExpress.Analytics.Criteria.OperandParameter);
            Data.OperandParameter = OperandParameter;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "OperandParameter");
            var OperandProperty = (function (_super) {
                __extends(OperandProperty, _super);
                function OperandProperty() {
                    _super.apply(this, arguments);
                }
                return OperandProperty;
            })(DevExpress.Analytics.Criteria.OperandProperty);
            Data.OperandProperty = OperandProperty;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "OperandProperty");
            Data.UnaryOperatorType = DevExpress.Analytics.Criteria.UnaryOperatorType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "UnaryOperatorType");
            var UnaryOperator = (function (_super) {
                __extends(UnaryOperator, _super);
                function UnaryOperator() {
                    _super.apply(this, arguments);
                }
                return UnaryOperator;
            })(DevExpress.Analytics.Criteria.UnaryOperator);
            Data.UnaryOperator = UnaryOperator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "UnaryOperator");
            var OperandValue = (function (_super) {
                __extends(OperandValue, _super);
                function OperandValue() {
                    _super.apply(this, arguments);
                }
                return OperandValue;
            })(DevExpress.Analytics.Criteria.OperandValue);
            Data.OperandValue = OperandValue;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "OperandValue");
            var CriteriaOperatorPreprocessor = (function (_super) {
                __extends(CriteriaOperatorPreprocessor, _super);
                function CriteriaOperatorPreprocessor() {
                    _super.apply(this, arguments);
                }
                return CriteriaOperatorPreprocessor;
            })(DevExpress.Analytics.Criteria.CriteriaOperatorPreprocessor);
            Data.CriteriaOperatorPreprocessor = CriteriaOperatorPreprocessor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "CriteriaOperatorPreprocessor");
            Data.criteriaCreator = DevExpress.Analytics.Criteria.criteriaCreator;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria, "criteriaCreator");
            Data.operatorTokens = DevExpress.Analytics.Criteria.Utils.operatorTokens;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria.Utils, "operatorTokens");
            Data.criteriaForEach = DevExpress.Analytics.Criteria.Utils.criteriaForEach;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.JS.Data, DevExpress.Analytics.Criteria.Utils, "criteriaForEach");
        })(Data = JS.Data || (JS.Data = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-widgets.js.map
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var criteriaparser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,6],$V2=[1,28],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,23],$V7=[1,11],$V8=[1,12],$V9=[1,13],$Va=[1,14],$Vb=[1,15],$Vc=[1,16],$Vd=[1,17],$Ve=[1,18],$Vf=[1,19],$Vg=[1,20],$Vh=[1,21],$Vi=[1,22],$Vj=[1,25],$Vk=[1,27],$Vl=[1,26],$Vm=[1,30],$Vn=[1,31],$Vo=[1,32],$Vp=[1,33],$Vq=[1,34],$Vr=[1,35],$Vs=[1,36],$Vt=[1,37],$Vu=[1,38],$Vv=[1,39],$Vw=[1,40],$Vx=[1,41],$Vy=[1,42],$Vz=[1,43],$VA=[1,44],$VB=[1,45],$VC=[1,46],$VD=[1,47],$VE=[1,48],$VF=[1,49],$VG=[1,50],$VH=[5,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,50],$VI=[5,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,49,50,51,53,54,55],$VJ=[1,57],$VK=[5,14,15,16,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,50],$VL=[5,26,27,29,35,50],$VM=[1,109],$VN=[1,110],$VO=[1,104],$VP=[1,106],$VQ=[1,107],$VR=[1,105],$VS=[1,108],$VT=[5,11,12,14,15,16,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,50],$VU=[5,18,19,24,25,26,27,29,30,35,50],$VV=[5,18,19,20,21,22,23,24,25,26,27,29,30,35,50],$VW=[29,35];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"exp":4,"EOF":5,"const":6,"propertyWithAgg":7,"parameter":8,"*":9,"/":10,"+":11,"-":12,"%":13,"|":14,"&":15,"^":16,"~":17,"OP_EQ":18,"OP_NE":19,"OP_GT":20,"OP_LT":21,"OP_GE":22,"OP_LE":23,"OP_LIKE":24,"NOT":25,"AND":26,"OR":27,"(":28,")":29,"IS":30,"NULL":31,"OP_IN":32,"arguments":33,"OP_BETWEEN":34,",":35,"NAME_LATIN":36,"AGG_MIN":37,"AGG_MAX":38,"AGG_COUNT":39,"AGG_AVG":40,"AGG_SUM":41,"AGG_EXISTS":42,"AGG_SINGLE":43,"STRING":44,"NUMBER":45,"OBJECT":46,"BOOLEAN":47,"property":48,"[":49,"]":50,".":51,"agg":52,"FIELD_END":53,"CH":54,"ESC_CH":55,"FIELD_START":56,"?":57,"NAME_SOFT":58,"commaseparated":59,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"*",10:"/",11:"+",12:"-",13:"%",14:"|",15:"&",16:"^",17:"~",18:"OP_EQ",19:"OP_NE",20:"OP_GT",21:"OP_LT",22:"OP_GE",23:"OP_LE",24:"OP_LIKE",25:"NOT",26:"AND",27:"OR",28:"(",29:")",30:"IS",31:"NULL",32:"OP_IN",34:"OP_BETWEEN",35:",",36:"NAME_LATIN",37:"AGG_MIN",38:"AGG_MAX",39:"AGG_COUNT",40:"AGG_AVG",41:"AGG_SUM",42:"AGG_EXISTS",43:"AGG_SINGLE",44:"STRING",45:"NUMBER",46:"OBJECT",47:"BOOLEAN",49:"[",50:"]",51:".",53:"FIELD_END",54:"CH",55:"ESC_CH",56:"FIELD_START",57:"?",58:"NAME_SOFT"},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,4],[4,2],[4,3],[4,3],[4,3],[4,3],[4,4],[4,3],[4,7],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[6,1],[6,1],[6,1],[6,1],[6,1],[7,6],[7,5],[7,3],[7,4],[7,3],[7,1],[7,4],[52,3],[52,1],[52,3],[52,1],[52,4],[52,4],[52,3],[52,4],[52,4],[52,4],[48,2],[48,2],[48,2],[48,3],[48,3],[48,1],[48,1],[48,1],[8,2],[8,2],[8,1],[33,2],[33,3],[59,1],[59,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("const", { value: $$[$0] }); 
break;
case 3: case 4: case 40: case 41: case 42: case 43:
 this.$ = $$[$0]; 
break;
case 5:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Multiply }); 
break;
case 6:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Divide }); 
break;
case 7:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Plus }); 
break;
case 8:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Minus }); 
break;
case 9:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Modulo }); 
break;
case 10:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.BitwiseOr }); 
break;
case 11:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.BitwiseAnd }); 
break;
case 12:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.BitwiseXor }); 
break;
case 13:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.Minus, operator: $$[$0] }); 
break;
case 14:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.Plus, operator: $$[$0] }); 
break;
case 15:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.BitwiseNot, operator: $$[$0] }); 
break;
case 16:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Equal }); 
break;
case 17:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.NotEqual }); 
break;
case 18:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Greater }); 
break;
case 19:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Less }); 
break;
case 20:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.GreaterOrEqual }); 
break;
case 21:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.LessOrEqual }); 
break;
case 22:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("binary",  { left: $$[$0-2], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Like }); 
break;
case 23:

            this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { 
                operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.Not, 
                operator: DevExpress.Analytics.Criteria.criteriaCreator.process("binary", { left: $$[$0-3], right: $$[$0], operatorType: DevExpress.Analytics.Criteria.BinaryOperatorType.Like }) 
            });
        
break;
case 24:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.Not, operator: $$[$0] }); 
break;
case 25:
 this.$ = DevExpress.Analytics.Criteria.GroupOperator.combine(DevExpress.Analytics.Criteria.GroupOperatorType.And, [$$[$0-2], $$[$0]]); 
break;
case 26:
 this.$ = DevExpress.Analytics.Criteria.GroupOperator.combine(DevExpress.Analytics.Criteria.GroupOperatorType.Or, [$$[$0-2], $$[$0]]); 
break;
case 27: case 62: case 74:
 this.$ = $$[$0-1]; 
break;
case 28:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.IsNull, operator: $$[$0-2] }); 
break;
case 29:
 
            this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { 
                operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.Not,
                operator: DevExpress.Analytics.Criteria.criteriaCreator.process("unary", { operatorType: DevExpress.Analytics.Criteria.UnaryOperatorType.IsNull, operator: $$[$0-3] })
            }); 
        
break;
case 30:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("in", { criteriaOperator: $$[$0-2], operands: $$[$0] }); 
break;
case 31:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("between", { property: $$[$0-6], begin: $$[$0-3], end: $$[$0-1] }); 
break;
case 32:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType[$$[$0-1]] || $$[$0-1], operands: $$[$0] }); 
break;
case 33:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType.Min, operands: $$[$0] }); 
break;
case 34:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType.Max, operands: $$[$0] }); 
break;
case 35:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType["Count"] || "Count", operands: $$[$0] }); 
break;
case 36:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType["Avg"] || "Avg", operands: $$[$0] }); 
break;
case 37:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType["Sum"] || "Sum", operands: $$[$0] }); 
break;
case 38:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType["Exists"] || "Exists", operands: $$[$0] }); 
break;
case 39:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("function", { operatorType: DevExpress.Analytics.Criteria.FunctionOperatorType["Single"] || "Single", operands: $$[$0] }); 
break;
case 44:
 this.$ = null; 
break;
case 45:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0-5].name, startColumn: $$[$0-5].col, startLine: $$[$0-5].line }), 
                $$[$0-3], $$[$0].type, $$[$0].expr
            ); 
        
break;
case 46:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0-4].name, startColumn: $$[$0-4].col, startLine: $$[$0-4].line }), 
                null, $$[$0].type, $$[$0].expr
            ); 
        
break;
case 47:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0-2].name, startColumn: $$[$0-2].col, startLine: $$[$0-2].line }), 
                null, $$[$0].type, $$[$0].expr
            ); 
        
break;
case 48:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0-3].name, startColumn: $$[$0-3].col, startLine: $$[$0-3].line }), 
                $$[$0-1], DevExpress.Analytics.Criteria.Aggregate.Exists, null
            );
        
break;
case 49:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0-2].name, startColumn: $$[$0-2].col, startLine: $$[$0-2].line }), 
                null, DevExpress.Analytics.Criteria.Aggregate.Exists, null);
        
break;
case 50:
 
            this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: $$[$0].name, startColumn: $$[$0].col, startLine: $$[$0].line }); 
        
break;
case 51:
 
            this.$ = DevExpress.Analytics.Criteria.JoinOperand.joinOrAggregate(
                DevExpress.Analytics.Criteria.criteriaCreator.process("property", { }), 
                null, $$[$0].type, $$[$0].expr
            ); 
        
break;
case 52:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Count  };  
break;
case 53:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Count };   
break;
case 54: case 55:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Exists }; 
break;
case 56:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Avg, expr: $$[$0-1] }; 
break;
case 57:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Sum, expr: $$[$0-1] }; 
break;
case 58:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Single, expr: DevExpress.Analytics.Criteria.criteriaCreator.process("property", { propertyName: "This" }) }; 
break;
case 59:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Single, expr: $$[$0-1] }; 
break;
case 60:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Min, expr: $$[$0-1] }; 
break;
case 61:
 this.$ = { type:  DevExpress.Analytics.Criteria.Aggregate.Max, expr: $$[$0-1] }; 
break;
case 63:
 this.$ = { name: $$[$0-1].name + $$[$0], line: $$[$0-1].line, col: $$[$0-1].col }; 
break;
case 64:
 this.$ = { name: $$[$0-1].name +$$[$0].substr(1), line: $$[$0-1].line, col: $$[$0-1].col }; 
break;
case 65:
 this.$ = { name: $$[$0-2].name + ".", line: $$[$0-2].line, col: $$[$0-2].col }; 
break;
case 66:
 this.$ = { name: $$[$0-2].name + "." + $$[$0], line: $$[$0-2].line, col: $$[$0-2].col }; 
break;
case 67:
 this.$ = { name: "", line: _$[$0].first_line - 1, col: _$[$0].first_column + 1 }; 
break;
case 68:
 this.$ = { name: $$[$0], line: _$[$0].first_line - 1, col: _$[$0].first_column }; 
break;
case 69:
 this.$ = { name: "^", line: _$[$0].first_line - 1, col: _$[$0].first_column }; 
break;
case 70: case 71:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("parameter", { parameterName: $$[$0] }); 
break;
case 72:
 this.$ = DevExpress.Analytics.Criteria.criteriaCreator.process("value", { }); 
break;
case 73:
 this.$ = []; 
break;
case 75:
 this.$ = [$$[$0]]; 
break;
case 76:
 this.$ = $$[$0-2].concat($$[$0]); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{1:[3]},{5:[1,29],9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,30:$VE,32:$VF,34:$VG},o($VH,[2,2]),o($VH,[2,3]),o($VH,[2,4]),{4:51,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:52,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:53,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:54,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:55,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VI,[2,68],{33:56,28:$VJ}),{28:$VJ,33:58},{28:$VJ,33:59},{28:$VJ,33:60},{28:$VJ,33:61},{28:$VJ,33:62},{28:$VJ,33:63},{28:$VJ,33:64},o($VH,[2,40]),o($VH,[2,41]),o($VH,[2,42]),o($VH,[2,43]),o($VH,[2,44]),o($VH,[2,50],{49:[1,65],51:[1,66],53:[1,67],54:[1,68],55:[1,69]}),{50:[1,70]},o($VH,[2,72],{36:[1,71],58:[1,72]}),o($VI,[2,67]),o($VI,[2,69]),{1:[2,1]},{4:73,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:74,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:75,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:76,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:77,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:78,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:79,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:80,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:81,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:82,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:83,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:84,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:85,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:86,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:87,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{24:[1,88]},{4:89,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:90,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{25:[1,92],31:[1,91]},{28:$VJ,33:93},{28:[1,94]},o($VH,[2,13]),o($VH,[2,14]),o($VK,[2,15],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq}),o($VL,[2,24],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,30:$VE,32:$VF,34:$VG}),{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,95],30:$VE,32:$VF,34:$VG},o($VH,[2,32]),{4:98,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,29:[1,96],31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl,59:97},o($VH,[2,33]),o($VH,[2,34]),o($VH,[2,35]),o($VH,[2,36]),o($VH,[2,37]),o($VH,[2,38]),o($VH,[2,39]),{4:99,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,50:[1,100],56:$Vk,57:$Vl},{36:[1,103],37:$VM,38:$VN,39:$VO,40:$VP,41:$VQ,42:$VR,43:$VS,52:101,56:[1,102]},o($VI,[2,62]),o($VI,[2,63]),o($VI,[2,64]),{51:[1,111]},o($VH,[2,70]),o($VH,[2,71]),o($VH,[2,5]),o($VH,[2,6]),o($VT,[2,7],{9:$Vm,10:$Vn,13:$Vq}),o($VT,[2,8],{9:$Vm,10:$Vn,13:$Vq}),o($VH,[2,9]),o([5,14,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,50],[2,10],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,15:$Vs,16:$Vt}),o($VK,[2,11],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq}),o([5,14,16,18,19,20,21,22,23,24,25,26,27,29,30,32,34,35,50],[2,12],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,15:$Vs}),o($VU,[2,16],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,20:$Vw,21:$Vx,22:$Vy,23:$Vz,32:$VF,34:$VG}),o($VU,[2,17],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,20:$Vw,21:$Vx,22:$Vy,23:$Vz,32:$VF,34:$VG}),o($VV,[2,18],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,32:$VF,34:$VG}),o($VV,[2,19],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,32:$VF,34:$VG}),o($VV,[2,20],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,32:$VF,34:$VG}),o($VV,[2,21],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,32:$VF,34:$VG}),o($VU,[2,22],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,20:$Vw,21:$Vx,22:$Vy,23:$Vz,32:$VF,34:$VG}),{4:112,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VL,[2,25],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,30:$VE,32:$VF,34:$VG}),o([5,27,29,35,50],[2,26],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,30:$VE,32:$VF,34:$VG}),o($VH,[2,28]),{31:[1,113]},o($VH,[2,30]),{4:114,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VH,[2,27]),o($VH,[2,73]),{29:[1,115],35:[1,116]},o($VW,[2,75],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,30:$VE,32:$VF,34:$VG}),{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,30:$VE,32:$VF,34:$VG,50:[1,117]},o($VH,[2,49],{51:[1,118]}),o($VH,[2,47]),o($VI,[2,65]),o($VI,[2,66]),o($VH,[2,53],{28:[1,119]}),o($VH,[2,55],{28:[1,120]}),{28:[1,121]},{28:[1,122]},{28:[1,123]},{28:[1,124]},{28:[1,125]},{37:$VM,38:$VN,39:$VO,40:$VP,41:$VQ,42:$VR,43:$VS,52:126},o($VU,[2,23],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,20:$Vw,21:$Vx,22:$Vy,23:$Vz,32:$VF,34:$VG}),o($VH,[2,29]),{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,30:$VE,32:$VF,34:$VG,35:[1,127]},o($VH,[2,74]),{4:128,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VH,[2,48],{51:[1,129]}),{37:$VM,38:$VN,39:$VO,40:$VP,41:$VQ,42:$VR,43:$VS,52:130},{29:[1,131]},{29:[1,132]},{4:133,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:134,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:136,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,29:[1,135],31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:137,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},{4:138,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VH,[2,51]),{4:139,6:3,7:4,8:5,11:$V0,12:$V1,16:$V2,17:$V3,25:$V4,28:$V5,31:$V6,36:$V7,37:$V8,38:$V9,39:$Va,40:$Vb,41:$Vc,42:$Vd,43:$Ve,44:$Vf,45:$Vg,46:$Vh,47:$Vi,48:24,49:$Vj,56:$Vk,57:$Vl},o($VW,[2,76],{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,30:$VE,32:$VF,34:$VG}),{37:$VM,38:$VN,39:$VO,40:$VP,41:$VQ,42:$VR,43:$VS,52:140},o($VH,[2,46]),o($VH,[2,52]),o($VH,[2,54]),{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,141],30:$VE,32:$VF,34:$VG},{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,142],30:$VE,32:$VF,34:$VG},o($VH,[2,58]),{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,143],30:$VE,32:$VF,34:$VG},{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,144],30:$VE,32:$VF,34:$VG},{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,145],30:$VE,32:$VF,34:$VG},{9:$Vm,10:$Vn,11:$Vo,12:$Vp,13:$Vq,14:$Vr,15:$Vs,16:$Vt,18:$Vu,19:$Vv,20:$Vw,21:$Vx,22:$Vy,23:$Vz,24:$VA,25:$VB,26:$VC,27:$VD,29:[1,146],30:$VE,32:$VF,34:$VG},o($VH,[2,45]),o($VH,[2,56]),o($VH,[2,57]),o($VH,[2,59]),o($VH,[2,60]),o($VH,[2,61]),o($VH,[2,31])],
defaultActions: {29:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: this.begin('INITIAL'); return 49; 
break;
case 1: this.begin('INITIAL'); return 53; 
break;
case 2:return 55;
break;
case 3:return 54;
break;
case 4:return 'INVALID';
break;
case 5:return 44
break;
case 6:return 46
break;
case 7:return 45
break;
case 8:return 47
break;
case 9:return 47
break;
case 10:/* skip whitespace */
break;
case 11:return 34
break;
case 12:return 32
break;
case 13:return 25
break;
case 14:return 30
break;
case 15:return 31
break;
case 16:return 9
break;
case 17:return 10
break;
case 18:return 12
break;
case 19:return 11
break;
case 20:return 16
break;
case 21:return 17
break;
case 22:return 19
break;
case 23:return '!'
break;
case 24:return 13
break;
case 25:return 19
break;
case 26:return 22
break;
case 27:return 23
break;
case 28:return 20
break;
case 29:return 21
break;
case 30:return 27
break;
case 31:return 26
break;
case 32:return 40
break;
case 33:return 38
break;
case 34:return 37
break;
case 35:return 43
break;
case 36:return 39
break;
case 37:return 42
break;
case 38:return 41
break;
case 39:return 18
break;
case 40:return 18
break;
case 41:return 24
break;
case 42:return 26
break;
case 43:return 27
break;
case 44:return 15
break;
case 45:return 14
break;
case 46: this.begin('fieldname'); return 56; 
break;
case 47:return 50;
break;
case 48:return 28
break;
case 49:return 29
break;
case 50:return 51
break;
case 51:return 35
break;
case 52:return 57
break;
case 53:return 36
break;
case 54:return 58
break;
case 55:return 'INVALID'
break;
case 56:return 5
break;
}
},
rules: [/^(?:\]\s*\[)/i,/^(?:\])/i,/^(?:\\.)/i,/^(?:.)/i,/^(?:$)/i,/^(?:'(?:[^\\\']|(?:\\.))*')/i,/^(?:#(?:[^\\\#]|(?:\\.))*#)/i,/^(?:(?:\d*\.)?\d+)/i,/^(?:True\b)/i,/^(?:False\b)/i,/^(?:\s+)/i,/^(?:Between\b)/i,/^(?:In\b)/i,/^(?:Not\b)/i,/^(?:Is\b)/i,/^(?:Null\b)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:-)/i,/^(?:\+)/i,/^(?:\^)/i,/^(?:~)/i,/^(?:!=)/i,/^(?:!)/i,/^(?:%)/i,/^(?:<>)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:Avg\b)/i,/^(?:Max\b)/i,/^(?:Min\b)/i,/^(?:Single\b)/i,/^(?:Count\b)/i,/^(?:Exists\b)/i,/^(?:Sum\b)/i,/^(?:==)/i,/^(?:=)/i,/^(?:Like\b)/i,/^(?:And\b)/i,/^(?:Or\b)/i,/^(?:&)/i,/^(?:\|)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\()/i,/^(?:\))/i,/^(?:\.)/i,/^(?:,)/i,/^(?:\?)/i,/^(?:\w[\w\d]*)/i,/^(?:[_\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\d_\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*)/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"fieldname":{"rules":[0,1,2,3,4],"inclusive":false},"INITIAL":{"rules":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
DevExpress.JS.Data.criteriaparser = criteriaparser;
DevExpress.Analytics.Criteria.criteriaparser = criteriaparser

if(window["ace"]) {
    var _define = window["ace"].define || define;
    _define("ace/mode/criteria", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text"], function (require, exports, module) {
        "use strict";
        var oop = require("../lib/oop");
        // defines the parent mode
        var TextMode = require("./text").Mode;

        // defines the language specific highlighters and folding rules
        var CriteriaHighlightRules = require("./criteria_highlight_rules").CriteriaHighlightRules;

        var Mode = function() {
            // set everything up
            this.HighlightRules = CriteriaHighlightRules;
        };
        oop.inherits(Mode, TextMode);

        /*(function () {
            // create worker for live syntax checking
            this.createWorker = function (session) {
                var worker = new WorkerClient(["ace"], "ace/mode/xpo_worker", "NewWorker");
                worker.attachToDocument(session.getDocument());
                worker.on("errors", function (e) {
                    session.setAnnotations(e.data);
                });
                return worker;
            };
    
        }).call(Mode.prototype);*/

        exports.Mode = Mode;
    });

    _define("ace/mode/criteria_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (require, exports, module) {
        "use strict";
        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var CriteriaHighlightRules = function() {

            // regexp must not have capturing parentheses. Use (?:) instead.
            // regexps are ordered -> the first match is used
            this.$rules = {
                "start": [
                    {
                        token: "string.quoted.single",
                        regex: /N?'(?:\\.|[^'\\])*'?/,
                    },
                    {
                        token: "constant.numeric",
                        regex: /[+\-]?\.?\d[\d.]*/i
                    },
                    {
                        token: "support.other.aggregate",
                        regex: /\.([a-zA-Z_]\w*)?/
                    },
                    {
                        token: "keyword.operator",
                        regex: /[+\-*/%|&^<>]|==|!=|<=|>=|In|Like|Between|And|Or|Not/i
                    },
                    {
                        token: "constant.language",
                        regex: /True|False/i
                    },
                    {
                        token: "support.context.start",
                        regex: /\[(?:[^\]\)])*\]\[/
                    },
                    {
                        token: "support.variable",
                        regex: /\[(?:[^\]\)\,])*\]?/
                    },
                    {
                        token: "support.context.end",
                        regex: /\]/
                    },

                    {
                        token: "support.function",
                        regex: /[_\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\d_\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183-\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3006\u3031-\u3035\u303B-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*/
                    }
                ]
            };
        };

        oop.inherits(CriteriaHighlightRules, TextHighlightRules);

        exports.CriteriaHighlightRules = CriteriaHighlightRules;
    });
}


var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var BaseActionsProvider = (function () {
                function BaseActionsProvider() {
                }
                BaseActionsProvider.prototype.initActions = function (actions) {
                    this.actions = actions;
                    this.actions.forEach(function (action) {
                        if (!action.disabled)
                            action.disabled = ko.observable(false);
                    });
                };
                BaseActionsProvider.prototype.getActions = function (context) {
                    if (this.condition(context)) {
                        this.setDisabled && this.setDisabled(context);
                        return this.actions;
                    }
                    return [];
                };
                BaseActionsProvider.prototype.condition = function (context) {
                    return true;
                };
                return BaseActionsProvider;
            })();
            Internal.BaseActionsProvider = BaseActionsProvider;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Rectangle = (function () {
            function Rectangle(left, top, width, height) {
                if (left === void 0) { left = 0; }
                if (top === void 0) { top = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.left = ko.observable(0);
                this.top = ko.observable(0);
                this.width = ko.observable(0);
                this.height = ko.observable(0);
                this.className = "dxrd-drag-helper-item";
                this.left(left);
                this.top(top);
                this.width(width);
                this.height(height);
            }
            return Rectangle;
        })();
        Analytics.Rectangle = Rectangle;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../elements/rectangle.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var DragDropHandler = (function () {
                function DragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = this;
                    this._size = new Analytics.Size(0, 0);
                    this.alwaysAlt = false;
                    this.surface = surface;
                    this.selection = selection;
                    this.snapHelper = snapHelper;
                    this.dragHelperContent = dragHelperContent;
                    this.stopDrag = function (ui, draggable, event) {
                        undoEngine().start();
                        _this.doStopDrag(ui, draggable, event);
                        undoEngine().end();
                        snapHelper && snapHelper.deactivateSnapLines();
                    };
                }
                DragDropHandler.prototype._getAbsoluteSurfacePosition = function (ui) {
                    return { left: ui.position.left - ui["delta"].left, top: ui.position.top - ui["delta"].top };
                };
                DragDropHandler.prototype.addControl = function (control, dropTargetSurface, size) {
                    var targetWidth = (dropTargetSurface["width"] && dropTargetSurface["width"]()) || (dropTargetSurface["_width"] && dropTargetSurface["_width"]());
                    var underCursor = dropTargetSurface.underCursor();
                    if (underCursor.x < targetWidth) {
                        dropTargetSurface.getControlModel().addChild(control);
                        var controlSurface = Internal.findSurface(control);
                        var width = size.width(), height = size.height();
                        var left = (underCursor.x + width > targetWidth) ? (targetWidth - width - 1) : underCursor.x;
                        controlSurface.rect({ left: left, top: Math.max(underCursor.y, 0), width: width, height: height });
                        this.selection.initialize(controlSurface);
                    }
                };
                DragDropHandler.prototype.recalculateSize = function (size) {
                    var surface = ko.unwrap(this.surface);
                    this._size.width(Analytics.Utils.unitsToPixel(ko.unwrap(size.width) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
                    this._size.height(Analytics.Utils.unitsToPixel(ko.unwrap(size.height) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
                };
                DragDropHandler.prototype.helper = function (draggable, event) {
                    this.snapHelper && this.snapHelper.updateSnapLines();
                };
                DragDropHandler.prototype.startDrag = function (draggable) { };
                DragDropHandler.prototype.drag = function (event, ui) {
                    var needToActivateSnapLines = event.altKey !== true;
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel().getMetaData().isContainer ? this.selection.dropTarget : (this.selection.dropTarget.parent || this.selection.dropTarget), locked = dropTarget.locked;
                        var controlModel = ko.dataFor(event.target).getControlModel && ko.dataFor(event.target).getControlModel();
                        var metaData = controlModel && controlModel.getMetaData() || ko.dataFor(event.target).info;
                        if (metaData && metaData.canDrop) {
                            locked = locked || !metaData.canDrop(dropTarget, controlModel);
                        }
                        if (locked) {
                            this.snapHelper && this.snapHelper.deactivateSnapLines();
                            needToActivateSnapLines = false;
                            this.dragHelperContent && this.dragHelperContent.isLocked(true);
                        }
                        else {
                            this.dragHelperContent && this.dragHelperContent.isLocked(false);
                        }
                    }
                    if (needToActivateSnapLines) {
                        var position = this._getAbsoluteSurfacePosition(ui);
                        var snapDelta = this.snapHelper && this.snapHelper.activateSnapLines({
                            left: position.left,
                            top: position.top,
                            right: position.left + this._size.width(),
                            bottom: position.top + this._size.height()
                        });
                        ui.position.left -= snapDelta.left;
                        ui.position.top -= snapDelta.top;
                    }
                };
                DragDropHandler.prototype.doStopDrag = function (ui, draggable, event) { };
                DragDropHandler.started = ko.observable(false);
                return DragDropHandler;
            })();
            Internal.DragDropHandler = DragDropHandler;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var KeyboardHelper = (function () {
                function KeyboardHelper(selection, undoEngine) {
                    var _this = this;
                    this._selection = selection;
                    this._undoEngine = undoEngine;
                    this.shortcutMap = {
                        27: function (e) { _this.processEsc(); return true; },
                        37: function (e) { _this.moveSelectedControls(true, true, -1); return true; },
                        38: function (e) { _this.moveSelectedControls(true, false, -1); return true; },
                        39: function (e) { _this.moveSelectedControls(false, true, 1); return true; },
                        40: function (e) { _this.moveSelectedControls(false, false, 1); return true; },
                    };
                }
                KeyboardHelper.prototype.processShortcut = function (e) {
                    var method = this.shortcutMap[e.keyCode];
                    if (method) {
                        return method(e);
                    }
                    return false;
                };
                KeyboardHelper.prototype.processEsc = function () {
                    var parent = this._selection.focused() && this._selection.focused().parent;
                    parent && this._selection.focused(parent);
                };
                KeyboardHelper.prototype.moveSelectedControls = function (leftUp, isHoriz, sign) {
                    var focusedControl = this._selection.focused();
                    if (!focusedControl || focusedControl && focusedControl.getControlModel().getMetaData().isCopyDeny) {
                        return;
                    }
                    this._undoEngine && this._undoEngine().start();
                    var distance = 1, axisProperty = isHoriz ? "left" : "top", lengthProperty = isHoriz ? "width" : "height", minAxis, maxSide, newAxis;
                    if (focusedControl.rect) {
                        minAxis = focusedControl.rect()[axisProperty];
                        maxSide = focusedControl.rect()[axisProperty] + focusedControl.rect()[lengthProperty];
                    }
                    else {
                        return;
                    }
                    this._selection.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
                        var axis = item.rect()[axisProperty];
                        if (axis < minAxis) {
                            minAxis = axis;
                        }
                    });
                    this._selection.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
                        var side = item.rect()[axisProperty] + item.rect()[lengthProperty];
                        if (side > maxSide) {
                            maxSide = side;
                        }
                    });
                    if ((leftUp && minAxis <= 0) || (!focusedControl.parent.rect || (!leftUp && maxSide.toFixed(5) >= focusedControl.parent.rect()[lengthProperty]))) {
                        return;
                    }
                    else {
                        this._selection.selectedItems.filter(function (item) { return !item.locked; })
                            .filter(function (item) { return !!item.rect; })
                            .forEach(function (item) {
                            var newVal = {}, itemAxisProperty = item.rect()[axisProperty], itemLengthProperty = item.rect()[lengthProperty], parentLengthProperty = item.parent.rect()[lengthProperty];
                            newAxis = itemAxisProperty + sign * distance;
                            if ((leftUp && newAxis >= 0) || (!leftUp && (newAxis + itemLengthProperty) <= parentLengthProperty)) {
                                newVal[axisProperty] = newAxis;
                            }
                            if (!leftUp && (newAxis + itemLengthProperty) > parentLengthProperty) {
                                newVal[axisProperty] = parentLengthProperty - itemLengthProperty;
                            }
                            if (leftUp && newAxis < 0 && itemAxisProperty > 0) {
                                newVal[axisProperty] = 0;
                            }
                            item.rect(newVal);
                        });
                    }
                    this._undoEngine && this._undoEngine().end();
                };
                return KeyboardHelper;
            })();
            Internal.KeyboardHelper = KeyboardHelper;
            var KeyDownHandlersManager = (function () {
                function KeyDownHandlersManager(targetElement) {
                    this._handlers = [];
                    this._targetElement = targetElement;
                }
                Object.defineProperty(KeyDownHandlersManager.prototype, "_activeHandler", {
                    get: function () {
                        return this._handlers.length > 0 ? this._handlers[this._handlers.length - 1] : null;
                    },
                    enumerable: true,
                    configurable: true
                });
                KeyDownHandlersManager.prototype._removeHandler = function (handler) {
                    var index = this._handlers.indexOf(handler);
                    if (index < 0)
                        return;
                    this._handlers.splice(index, 1);
                    if (index === this._handlers.length) {
                        this._targetElement.off("keydown", handler);
                        if (this._activeHandler)
                            this._targetElement.on("keydown", this._activeHandler);
                    }
                };
                KeyDownHandlersManager.prototype.bindHandler = function (element, handler) {
                    var _this = this;
                    if (this._activeHandler)
                        this._targetElement.off("keydown", this._activeHandler);
                    this._handlers.push(handler);
                    this._targetElement.on("keydown", handler);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () { _this._removeHandler(handler); });
                };
                return KeyDownHandlersManager;
            })();
            Internal.KeyDownHandlersManager = KeyDownHandlersManager;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="dragDrop/dragDropHandler.ts" />
/// <reference path="tools/keyboardHelper.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        ko.bindingHandlers['cssArray'] = {
            'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                for (var i = 0; i < value.length; i++) {
                    ko.bindingHandlers['css'].update(element, function () { return value[i]; });
                }
            }
        };
        ko.bindingHandlers["selectable"] = {
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var values = valueAccessor(), isUpdate = false, selection = ko.unwrap(values.selection), options = $.extend({ filter: '.dxd-selectable', distance: 1 }, ko.unwrap(values), {
                    selecting: function (event, ui) {
                        var _event = { control: ko.dataFor(ui.selecting), cancel: false, ctrlKey: event.ctrlKey };
                        selection.selecting(_event);
                        if (_event.cancel) {
                            $(ui.selecting).removeClass('ui-selecting');
                        }
                    },
                    start: function (event, ui) {
                        selection.clickHandler(null, event);
                        selection.started = true;
                        event.stopPropagation();
                    },
                    stop: function () {
                        selection.started = false;
                        selection.applySelection();
                    },
                    unselecting: function (event, ui) {
                        selection.unselecting(ko.dataFor(ui.unselecting));
                    }
                });
                $(element).selectable(options);
            }
        };
        ko.bindingHandlers["updateTop"] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = valueAccessor();
                var $element = $(element);
                var updateTop = function (value) {
                    var scaleY = element.getBoundingClientRect().height / element.offsetHeight;
                    var top = (value === 0 || !!value) ? value : ($element.prev().position().top / scaleY) + $element.prev().outerHeight();
                    $element.css('top', top + "px");
                };
                var subscription = value.subscribe(function (newVal) {
                    updateTop(newVal);
                });
                updateTop(value());
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    subscription.dispose();
                });
            }
        };
        ko.bindingHandlers["draggable"] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var values = valueAccessor();
                if (!values)
                    return;
                var $element = $(element), $parent = $element.closest(".dx-designer"), containment = values.containment || ".dxrd-ghost-container", $viewport, $ghostContainerOffset, $containmentOffset, initialScroll = { left: 0, top: 0 }, attachDelta = function (ui) {
                    ui["delta"] = {
                        left: $ghostContainerOffset.left - $containmentOffset.left,
                        top: $ghostContainerOffset.top - $containmentOffset.top
                    };
                    ui["scroll"] = {
                        left: $viewport.scrollLeft() - initialScroll.left,
                        top: $viewport.scrollTop() - initialScroll.top
                    };
                }, options = $.extend({}, ko.unwrap(values), {
                    start: function (event, ui) {
                        Analytics.Internal.DragDropHandler.started(true);
                        var draggable = $element.data("ui-draggable");
                        $viewport = $parent.find(".dxrd-viewport");
                        $ghostContainerOffset = $parent.find(".dxrd-ghost-container").offset();
                        $containmentOffset = $parent.find(containment).offset();
                        initialScroll.left = $viewport.scrollLeft();
                        initialScroll.top = $viewport.scrollTop();
                        values.startDrag && values.startDrag(ko.dataFor(event.currentTarget || event.toElement));
                    },
                    stop: function (event, ui) {
                        attachDelta(ui);
                        values.stopDrag(ui, ko.dataFor(event.target), event);
                        Analytics.Internal.DragDropHandler.started(false);
                    },
                    drag: function (event, ui) {
                        attachDelta(ui);
                        values.drag && values.drag(event, ui);
                    },
                    helper: function (event) {
                        values.helper && values.helper(ko.dataFor(event.currentTarget || event["toElement"]), event);
                        var $container = $parent.find('.dxrd-drag-helper-source').clone().css({ 'display': 'block' });
                        $container.prependTo($parent.find(options.containment));
                        ko.applyBindings(bindingContext.$root, $container[0]);
                        return $container;
                    }
                });
                options.containment = $parent.find(options.containment);
                $element.draggable(options);
            }
        };
        ko.bindingHandlers["resizable"] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var values = valueAccessor(), $element = $(element), $parent = $element.closest(".dx-designer"), $selectedNodes = null, absolutePosition = null, options = $.extend({
                    handles: values.handles || "all", ghost: false,
                    stop: function (event, ui) {
                        $selectedNodes.each(function (_, el) {
                            var control = ko.dataFor(el), surface = ko.contextFor(el).$root.surface(), $el = $(el);
                            var rect = control.rect();
                            control.rect(Analytics.Internal.getControlRect($el, control, surface));
                            if (JSON.stringify(rect) === JSON.stringify(control.rect())) {
                                $el.css({
                                    left: rect.left,
                                    top: rect.top,
                                    width: rect.width,
                                    height: rect.height
                                });
                            }
                            $el.removeData("originalPosition");
                            $el.removeData("originalSize");
                        });
                        values.stopped();
                        values.started = false;
                        if (values.snapHelper) {
                            values.snapHelper.deactivateSnapLines();
                        }
                    },
                    start: function () {
                        values.started = true;
                        values.starting();
                        $selectedNodes = values.$selectedNodes || $(".dxrd-viewport > .dxrd-focused, .dxrd-selected").filter(":visible");
                        $selectedNodes
                            .each(function (_, el) {
                            var $el = $(el);
                            var bounds = el.getBoundingClientRect();
                            $el.data("originalPosition", { top: parseFloat($el.css("top")), left: parseFloat($el.css("left")) });
                            $el.data("originalSize", { width: bounds.width, height: bounds.height });
                        });
                        var elementOffset = $element.offset();
                        var ghostContainerOffset = $parent.find(".dxrd-ghost-container").offset();
                        if (!ghostContainerOffset) {
                            absolutePosition = elementOffset;
                        }
                        else {
                            absolutePosition = {
                                top: elementOffset.top - ghostContainerOffset.top,
                                left: elementOffset.left - ghostContainerOffset.left
                            };
                        }
                        if (values.snapHelper) {
                            values.snapHelper.updateSnapLines(viewModel);
                        }
                    },
                    resize: function (event, ui) {
                        var dw = ui.size.width - ui.originalSize.width, dh = ui.size.height - ui.originalSize.height, dx = ui.position.left - ui.originalPosition.left, dy = ui.position.top - ui.originalPosition.top;
                        if (values.forceResize) {
                            values.forceResize({ size: new Analytics.Size(ui.size.width, ui.size.height), delta: { dx: dx, dy: dy, dw: dw, dh: dh } });
                        }
                        if (values.snapHelper && $selectedNodes.length === 1) {
                            var newAbsolutePosition = Analytics.Internal.getControlNewAbsolutePositionOnResize(values.snapHelper, absolutePosition, ui, { x: dx, y: dy, width: dw, height: dh });
                            values.snapHelper.activateSnapLines(newAbsolutePosition);
                            $element.css({
                                left: ui.originalPosition.left + newAbsolutePosition.left - absolutePosition.left,
                                top: ui.originalPosition.top + newAbsolutePosition.top - absolutePosition.top,
                                width: newAbsolutePosition.right - newAbsolutePosition.left,
                                height: newAbsolutePosition.bottom - newAbsolutePosition.top
                            });
                        }
                        $selectedNodes
                            .each(function (key, el) {
                            if (el === event.target)
                                return;
                            var $el = $(el);
                            var originalPosition = $el.data("originalPosition"), originalSize = $el.data("originalSize");
                            $el.css({
                                left: originalPosition.left + dx,
                                top: originalPosition.top + dy,
                                width: originalSize.width + dw,
                                height: originalSize.height + dh
                            });
                        });
                    }
                }, ko.unwrap(values));
                var subscription = null;
                if (!values.disabled) {
                    subscription = Analytics.Internal.DragDropHandler.started.subscribe(function (newVal) {
                        $element.resizable("option", "disabled", newVal);
                        newVal ? $element.children(".ui-resizable-handle").css("display", "none") : $element.children(".ui-resizable-handle").css("display", "block");
                    });
                }
                $element.resizable(options);
                $element.resizable().on("resize", function (event) {
                    event.stopPropagation();
                });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $element = null;
                    subscription && subscription.dispose();
                });
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var $element = $(element);
                var disabled = !!(ko.unwrap(valueAccessor().disabled) || false || viewModel.locked);
                $element.resizable("option", "disabled", disabled);
                $element.resizable("option", "minHeight", ko.unwrap(valueAccessor()).minimumHeight) || 1;
                disabled ? $element.children(".ui-resizable-handle").css("display", "none") : $element.children(".ui-resizable-handle").css("display", "block");
            }
        };
        var trackCursorData = "dxd-track-cursor-data";
        var trackCursorClass = "dxd-track-cursor";
        var trackCursorSelector = "." + trackCursorClass;
        var dragHelperLineClass = "dxrd-drag-helper-item";
        ko.bindingHandlers["trackCursor"] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var $element = $(element);
                $element.addClass(trackCursorClass);
                var value = valueAccessor();
                var bounds = null;
                var selection = valueAccessor().dropTarget, subscriptionTarget = valueAccessor().subscriptionTarget || '.dx-designer', body = document.body, docElem = document.documentElement, overHandler = function (event) {
                    if (!(bindingContext.$root.selection.started && bindingContext.$root.resizeHandler.started)) {
                        bounds = element.getBoundingClientRect();
                        if (!value().isNotDropTarget) {
                            bindingContext.$root.selection.dropTarget = ko.dataFor(element);
                            event.stopPropagation();
                        }
                    }
                }, enterHandler = function (event) {
                    value($.extend(value(), { isOver: true }));
                }, leaveHandler = function (event) {
                    bindingContext.$root.selection.dropTarget = null;
                    value($.extend(value(), { isOver: false }));
                }, handler = function (event) {
                    if (!(bindingContext.$root.selection.started && bindingContext.$root.resizeHandler.started)) {
                        bounds = element.getBoundingClientRect();
                        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, y = event.pageY - (bounds.top + scrollTop - clientTop), x = event.pageX - (bounds.left + scrollLeft - clientLeft);
                        value($.extend(value(), { x: x, y: y }));
                    }
                };
                $element.bind("mousemove", handler);
                $element.bind("mouseenter", enterHandler);
                $element.bind("mouseover", overHandler);
                $element.bind("mouseleave", leaveHandler);
                $element.bind("dragover", function (event) { handler(event.originalEvent); });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $element.unbind("dragover", function (event) { handler(event.originalEvent); });
                    $element.unbind("mousemove", handler);
                    $element.unbind("mouseover", overHandler);
                    $element.unbind("mouseleave", leaveHandler);
                    $element.unbind("mouseenter", enterHandler);
                    $element.removeClass(trackCursorClass);
                });
            }
        };
        ko.bindingHandlers["templates"] = {
            init: function (element, valueAccessor) {
                var templateHtml = $(valueAccessor()).text(), $templateHtml = $(templateHtml);
                $(element).append($templateHtml);
                return { controlsDescendantBindings: true };
            }
        };
        ko.bindingHandlers["zoom"] = {
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor() || {});
                for (var i = 0; i < Analytics.Utils.cssTransform.length; i++) {
                    element.style[Analytics.Utils.cssTransform[i]] = "scale(" + (value) + ")";
                }
                $(element).addClass("dxrd-transform-origin-left-top");
            }
        };
        ko.bindingHandlers["keyDownActions"] = (function () {
            var handlersManager = new Analytics.Internal.KeyDownHandlersManager($(window));
            return {
                init: function (element, valueAccessor) {
                    var actionLists = valueAccessor(), handler = function (e) { actionLists.processShortcut(ko.unwrap(actionLists.toolbarItems), e); };
                    if (ko.isSubscribable(actionLists.enabled)) {
                        var subscribe = actionLists.enabled.subscribe(function (newVal) {
                            if (newVal)
                                handlersManager.bindHandler(element, handler);
                        });
                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () { return subscribe.dispose(); });
                    }
                    if (ko.unwrap(actionLists.enabled))
                        handlersManager.bindHandler(element, handler);
                }
            };
        })();
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var DragHelperContent = (function (_super) {
                __extends(DragHelperContent, _super);
                function DragHelperContent(selectionProvider) {
                    _super.call(this);
                    this.controls = ko.observableArray([]);
                    this.customData = ko.observable({});
                    this.isLocked = ko.observable(false);
                    this._selectionProvider = selectionProvider;
                }
                DragHelperContent.prototype.update = function (surface) {
                    var _this = this;
                    this.controls([]);
                    this.customData({});
                    this.left(surface.absolutePosition.x());
                    this.top(surface.absolutePosition.y());
                    this.width(surface.rect().width);
                    this.height(surface.rect().height);
                    this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (controlSurface) {
                        if (controlSurface.parent === surface.parent) {
                            _this.controls.push(new Analytics.Rectangle(controlSurface.absolutePosition.x() - _this.left(), controlSurface.absolutePosition.y() - _this.top(), controlSurface.rect().width, controlSurface.rect().height));
                        }
                    });
                };
                DragHelperContent.prototype.setContent = function (area, customData) {
                    if (customData === void 0) { customData = null; }
                    this.controls([]);
                    this.customData({});
                    this.left(area.left());
                    this.top(area.top());
                    this.width(area.width());
                    this.height(area.height());
                    this.controls.push(area);
                    this.customData(customData);
                };
                return DragHelperContent;
            })(Analytics.Rectangle);
            Internal.DragHelperContent = DragHelperContent;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SelectionDragDropHandler = (function (_super) {
                __extends(SelectionDragDropHandler, _super);
                function SelectionDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = this;
                    _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent);
                    this.ajustLocation = function (adjustedTarget, item) {
                        var left = adjustedTarget.underCursor().x + item.underCursor().offsetX, top = adjustedTarget.underCursor().y + item.underCursor().offsetY;
                        item.rect({ left: left > 0 ? left : 0, top: top > 0 ? top : 0 });
                    };
                    this.cursor = 'move';
                    this.containment = '.dxrd-ghost-container';
                    this["helper"] = function (draggable) {
                        _super.prototype.helper.call(_this, draggable);
                        if (_this.selection.selectedItems.indexOf(draggable) === -1) {
                            _this.selection.updateSelection(draggable);
                        }
                        dragHelperContent.update(draggable);
                        _this._size.width(dragHelperContent.width());
                        _this._size.height(dragHelperContent.height());
                    };
                }
                SelectionDragDropHandler.prototype.adjustDropTarget = function (dropTargetSurface) {
                    var selectedItemInTree = dropTargetSurface;
                    while (selectedItemInTree != null) {
                        if (selectedItemInTree.selected && selectedItemInTree.selected()) {
                            dropTargetSurface = selectedItemInTree.parent;
                            break;
                        }
                        selectedItemInTree = selectedItemInTree.parent;
                    }
                    return dropTargetSurface;
                };
                SelectionDragDropHandler.prototype.startDrag = function (control) {
                    this.selection.swapFocusedItem(control);
                    var focusedSurface = this.selection.focused();
                    var baseOffsetX = focusedSurface.rect().left + focusedSurface.underCursor().x;
                    var baseOffsetY = focusedSurface.rect().top + focusedSurface.underCursor().y;
                    this.selection.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
                        if (item.parent === focusedSurface.parent) {
                            item.underCursor().offsetX = item.rect().left - baseOffsetX;
                            item.underCursor().offsetY = item.rect().top - baseOffsetY;
                        }
                    });
                };
                SelectionDragDropHandler.prototype.drag = function (event, ui) {
                    ui.position.left += ui["scroll"].left;
                    ui.position.top += ui["scroll"].top;
                    _super.prototype.drag.call(this, event, ui);
                };
                SelectionDragDropHandler.prototype.doStopDrag = function (ui, _) {
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel(), dropTargetSurface = dropTarget.getNearestParent(dropTarget).surface;
                        var focusedSurface = this.selection.focused();
                        var adjustedTarget = this.adjustDropTarget(dropTargetSurface), focusedModel = focusedSurface.getControlModel(), parent = focusedModel.getNearestParent(adjustedTarget.getControlModel()), adjustedTarget = Internal.findSurface(parent), changeParent = adjustedTarget !== focusedSurface.parent;
                        if (!adjustedTarget || !adjustedTarget.canDrop()) {
                            return;
                        }
                        var dropPointRelativeX = ui.position.left;
                        var dropPointRelativeY = ui.position.top;
                        if (adjustedTarget["absolutePosition"]) {
                            dropPointRelativeX -= adjustedTarget["absolutePosition"].x();
                            dropPointRelativeY -= adjustedTarget["absolutePosition"].y();
                            adjustedTarget.underCursor().x = dropPointRelativeX - focusedSurface.underCursor().offsetX;
                            adjustedTarget.underCursor().y = dropPointRelativeY - focusedSurface.underCursor().offsetY;
                        }
                        var itemsToDrop = this.selection.selectedItems
                            .filter(function (item) { return !item.locked && item.parent === focusedSurface.parent; })
                            .map(function (item) {
                            return item.getControlModel();
                        })
                            .filter(function (item) {
                            return item.getMetaData().canDrop(adjustedTarget, item);
                        });
                        if (changeParent) {
                            for (var i = 0; i < itemsToDrop.length; i++) {
                                itemsToDrop[i].surface.rect({ top: 0, left: 0 });
                            }
                            focusedModel.parentModel().removeChilds(itemsToDrop);
                            parent["addChilds"](itemsToDrop);
                            for (var i = 0; i < itemsToDrop.length; i++) {
                                this.ajustLocation(adjustedTarget, itemsToDrop[i].surface);
                            }
                            this.selection.focused(focusedSurface);
                            this.selection.selectItems(itemsToDrop.map(function (item) { return item.surface; }));
                        }
                        else {
                            for (var i = 0; i < itemsToDrop.length; i++) {
                                this.ajustLocation(adjustedTarget, itemsToDrop[i].surface);
                            }
                            this.selection.expectClick = true;
                        }
                    }
                };
                SelectionDragDropHandler.prototype.create = function (event, ui) {
                    if (ko.dataFor(event.target).locked) {
                        $(this).draggable("disable");
                    }
                };
                return SelectionDragDropHandler;
            })(Internal.DragDropHandler);
            Internal.SelectionDragDropHandler = SelectionDragDropHandler;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var ToolboxDragDropHandler = (function (_super) {
                __extends(ToolboxDragDropHandler, _super);
                function ToolboxDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory) {
                    _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent);
                    this.cursor = 'arrow';
                    this._controlsFactory = controlsFactory;
                    this.containment = '.dxrd-designer';
                    this["cursorAt"] = {
                        top: 0,
                        left: 0
                    };
                }
                ToolboxDragDropHandler.prototype.helper = function (draggable) {
                    _super.prototype.helper.call(this, draggable);
                    var toolboxItem = draggable;
                    var size = Analytics.Size.fromString(toolboxItem.info["@SizeF"] || toolboxItem.info["size"] || "100,23");
                    this.recalculateSize(size);
                    this.dragHelperContent.setContent(new Analytics.Rectangle(0, 0, this._size.width(), this._size.height()));
                };
                ToolboxDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
                    if (this.selection.dropTarget) {
                        var toolboxItem = draggable, control = this._controlsFactory.createControl($.extend({}, toolboxItem.info), null), parent = control.getNearestParent(this.selection.dropTarget.getControlModel()), dropTargetSurface = Internal.findSurface(parent);
                        if (!dropTargetSurface.canDrop()) {
                            return;
                        }
                        var position = this._getAbsoluteSurfacePosition(ui);
                        dropTargetSurface.underCursor().x = position.left - (dropTargetSurface["absolutePosition"] && dropTargetSurface["absolutePosition"].x() || 0);
                        dropTargetSurface.underCursor().y = position.top - (dropTargetSurface["absolutePosition"] && dropTargetSurface["absolutePosition"].y() || 0);
                        if (this.surface().isFit && this.surface().isFit(dropTargetSurface) || dropTargetSurface.underCursor().isOver) {
                            this.addControl(control, dropTargetSurface, this._size);
                        }
                    }
                };
                return ToolboxDragDropHandler;
            })(Internal.DragDropHandler);
            Internal.ToolboxDragDropHandler = ToolboxDragDropHandler;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        ;
        var SurfaceElementArea = (function (_super) {
            __extends(SurfaceElementArea, _super);
            function SurfaceElementArea(control, context, unitProperties) {
                var _this = this;
                _super.call(this);
                this._createSurface = function (item) {
                    return item["surface"] || new (item.getControlFactory()).controlsMap[item.controlType].surfaceType(item, _this._context);
                };
                this._control = control;
                this._context = context;
                control["surface"] = this;
                if (this._context) {
                    Analytics.Utils.createUnitProperties(control, this, unitProperties, this._context.measureUnit, this._context.zoom);
                }
                this["_x"] = this["_x"] || ko.observable(0);
                this["_y"] = this["_y"] || ko.observable(0);
                this["_width"] = this["_width"] || ko.observable(0);
                this["_height"] = this["_height"] || ko.observable(0);
                var container = ko.pureComputed(function () { return _this.container(); });
                this._container = container();
                container.subscribe(function (value) {
                    if (_this._container !== value && _this.rtlLayout()) {
                        var x = _this._getX();
                        _this._container = value;
                        _this._setX(x);
                    }
                    else {
                        _this._container = value;
                    }
                });
                var x = ko.computed({
                    read: function () { return _this._getX(); },
                    write: function (value) {
                        _this._setX(value);
                    }
                }), y = this["_y"], width = this["_width"], height = this["_height"];
                this["position"] = {
                    top: y,
                    left: x,
                    width: width,
                    height: height,
                    lineHeight: height
                };
                var _rect = ko.observable();
                this._disposables.push(ko.computed(function () {
                    if (!_this._control.update()) {
                        _rect({ top: y(), left: x(), right: x() + width(), bottom: y() + height(), width: width(), height: height() });
                    }
                }));
                this.rect = ko.pureComputed({
                    read: function () {
                        return _rect();
                    },
                    write: function (newRect) {
                        newRect = _this.beforeRectUpdated(newRect);
                        _this._control.update(true);
                        try {
                            if (newRect.left !== undefined) {
                                _this._setX(newRect.left, newRect.width);
                            }
                            else if (newRect.width !== undefined) {
                                _this._setX(x(), newRect.width);
                            }
                            if (newRect.top !== undefined) {
                                y(newRect.top);
                            }
                            if (newRect.right !== undefined && newRect.left === undefined && newRect.width === undefined) {
                                width(newRect.right - x());
                            }
                            if (newRect.bottom !== undefined && newRect.top === undefined) {
                                height(newRect.bottom - y());
                            }
                            if (newRect.right !== undefined && newRect.left !== undefined && newRect.width === undefined) {
                                width(newRect.right - newRect.left);
                            }
                            if (newRect.bottom !== undefined && newRect.top !== undefined) {
                                height(newRect.bottom - newRect.top);
                            }
                            if (newRect.width !== undefined) {
                                width(newRect.width);
                            }
                            if (newRect.height !== undefined) {
                                height(newRect.height);
                            }
                        }
                        finally {
                            _this._control.update(false);
                        }
                    }
                });
            }
            SurfaceElementArea.prototype._getX = function () {
                if (this.rtlLayout() && this._container) {
                    return this._container.rect().width - this["_x"]() - this["_width"]();
                }
                else {
                    return this["_x"]();
                }
            };
            SurfaceElementArea.prototype._setX = function (value, width) {
                width = width || this["_width"]();
                if (this.rtlLayout() && this._container) {
                    this["_x"](this._container.rect().width - value - width);
                }
                else {
                    this["_x"](value);
                }
            };
            SurfaceElementArea.prototype.getRoot = function () {
                return this._context;
            };
            SurfaceElementArea.prototype.container = function () {
                return this["parent"];
            };
            SurfaceElementArea.prototype.beforeRectUpdated = function (rect) {
                rect.left = rect.left < 0 ? 0 : rect.left;
                rect.top = rect.top < 0 ? 0 : rect.top;
                return rect;
            };
            SurfaceElementArea.prototype.rtlLayout = function () {
                return !!ko.unwrap(this._context.rtl);
            };
            SurfaceElementArea.prototype.getControlModel = function () {
                return this._control;
            };
            return SurfaceElementArea;
        })(Analytics.Utils.Disposable);
        Analytics.SurfaceElementArea = SurfaceElementArea;
        var SurfaceElementBase = (function (_super) {
            __extends(SurfaceElementBase, _super);
            function SurfaceElementBase(control, context, unitProperties) {
                var _this = this;
                _super.call(this, control, context, unitProperties);
                this._countSelectedChildren = ko.observable(0);
                this.focused = ko.observable(false);
                this.selected = ko.observable(false);
                this.underCursor = ko.observable(new Analytics.Internal.HoverInfo());
                this.allowMultiselect = true;
                this.absolutePosition = new Analytics.Point(0, 0);
                this.getControlModel = function () {
                    return control;
                };
                this.cssCalculator = new Analytics.Internal.CssCalculator(control, context.rtl);
                if (this._getChildrenHolderName() && control[this._getChildrenHolderName()]) {
                    var collection = ko.observableArray();
                    if (this._getChildrenHolderName() === "controls") {
                        Analytics.Utils.createObservableReverseArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface);
                    }
                    else {
                        Analytics.Utils.createObservableArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface);
                    }
                    this[this._getChildrenHolderName()] = collection;
                    this.isSelected = ko.pureComputed(function () {
                        if (!(_this.focused() || _this.selected())) {
                            return collection().some(function (item) {
                                return item.isSelected();
                            });
                        }
                        return true;
                    });
                }
                else {
                    this.isSelected = ko.pureComputed(function () {
                        return _this.focused() || _this.selected();
                    });
                }
                this.css = ko.pureComputed(function () {
                    return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.foreColorCss(), _this.cssCalculator.backGroundCss(), _this.cssCalculator.textAlignmentCss());
                });
                this.contentCss = ko.pureComputed(function () {
                    return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.foreColorCss(), _this.cssCalculator.textAlignmentCss(), _this.cssCalculator.angle(), _this.cssCalculator.wordWrapCss(), _this.cssCalculator.paddingsCss());
                });
                this._disposables.push(ko.computed(function () {
                    _this.updateAbsolutePosition();
                }));
                this.absoluteRect = ko.pureComputed(function () {
                    var controlRect = _this.rect(), absolutePositionY = _this.absolutePosition.y(), absolutePositionX = _this.absolutePosition.x();
                    return { top: absolutePositionY, left: absolutePositionX, right: absolutePositionX + controlRect.width, bottom: absolutePositionY + controlRect.height, width: controlRect.width, height: controlRect.height };
                });
                this.locked = control["lockedInUserDesigner"] ? control["lockedInUserDesigner"]() : false;
            }
            Object.defineProperty(SurfaceElementBase.prototype, "parent", {
                get: function () {
                    return this.getControlModel().parentModel() && this.getControlModel().parentModel().surface;
                },
                enumerable: true,
                configurable: true
            });
            SurfaceElementBase.prototype.checkParent = function (surfaceParent) {
                return this.parent === surfaceParent;
            };
            SurfaceElementBase.prototype._getChildrenHolderName = function () { return "controls"; };
            SurfaceElementBase.prototype.getChildrenCollection = function () {
                return this._getChildrenHolderName() && this[this._getChildrenHolderName()] || ko.observableArray([]);
            };
            SurfaceElementBase.prototype.updateAbsolutePosition = function () {
                if (this.parent && this.parent.absolutePosition) {
                    var parentX = this.parent.absolutePosition.x(), parentY = this.parent.absolutePosition.y(), newX = parentX + this.rect().left, newY = parentY + this.rect().top;
                    this.absolutePosition.x(newX);
                    this.absolutePosition.y(newY);
                }
                else {
                    this.absolutePosition.x(0);
                    this.absolutePosition.y(0);
                }
                this.afterUpdateAbsolutePosition();
            };
            SurfaceElementBase.prototype.canDrop = function () { return !this.locked && this._control.getMetaData().isContainer; };
            SurfaceElementBase.prototype.afterUpdateAbsolutePosition = function () {
            };
            return SurfaceElementBase;
        })(SurfaceElementArea);
        Analytics.SurfaceElementBase = SurfaceElementBase;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var ElementViewModel = (function (_super) {
            __extends(ElementViewModel, _super);
            function ElementViewModel(model, parent, serializer) {
                var _this = this;
                _super.call(this);
                this.actions = [];
                this.update = ko.observable(false);
                this.parentModel = ko.observable(parent);
                this.controlType = this.controlType || this.getControlFactory().getControlType(model);
                serializer = serializer || new Analytics.Utils.ModelSerializer();
                serializer.deserialize(this, model);
                this["displayName"] = ko.pureComputed(function () {
                    var result = _this.name && _this.name();
                    if (!result) {
                        result = "unnamed " + _this.controlType;
                    }
                    return result;
                });
                this.resetValue = function (propertyName) {
                    if (_this[propertyName].resetValue) {
                        _this[propertyName].resetValue();
                    }
                    else {
                        var defaultValue = _this.getPropertyDefaultValue(propertyName);
                        if (ko.isObservable(_this[propertyName])) {
                            _this[propertyName](defaultValue);
                        }
                        else {
                            Analytics.Utils.copyObservables(defaultValue, _this[propertyName]);
                        }
                    }
                };
                this.actions.push({ action: this.resetValue, title: Analytics.getLocalization("Reset", "ASPxReportsStringId.ReportDesigner_PropertyGrid_PopupMenu_Reset"), visible: this.isResettableProperty });
            }
            ElementViewModel.prototype.getPropertyDefaultValue = function (propertyName) {
                var info = this.getPropertyInfo(propertyName);
                return ko.unwrap(info && new Analytics.Utils.ModelSerializer().deserializeProperty(info, {}));
            };
            ElementViewModel.prototype.getPropertyInfo = function (propertyName) {
                return this.getInfo().filter(function (info) { return info.propertyName === propertyName; })[0];
            };
            ElementViewModel.prototype.getInfo = function () {
                return this.getControlFactory().controlsMap[this.controlType].info;
            };
            ElementViewModel.prototype.createControl = function (model, serializer) {
                return this.getControlFactory().createControl(model, this, serializer);
            };
            ElementViewModel.prototype.getNearestParent = function (target) {
                return target.getMetaData().isContainer ? target : target.getNearestParent(target.parentModel());
            };
            ElementViewModel.prototype.getControlInfo = function () {
                return this.getControlFactory().controlsMap[this.controlType || "Unknown"];
            };
            ElementViewModel.prototype.getMetaData = function () {
                var controlType = this.controlType ? this.controlType : "Unknown", data = this.getControlFactory().controlsMap[controlType];
                return {
                    isContainer: data.isContainer || false,
                    isCopyDeny: data.isCopyDeny || false,
                    isDeleteDeny: data.isDeleteDeny || false,
                    canDrop: data.canDrop || (function () { return true; })
                };
            };
            ElementViewModel.prototype._hasModifiedValue = function (name) {
                return this["_" + name] && this["_" + name]() && this.isPropertyModified(name);
            };
            ElementViewModel.prototype.createChild = function (info) {
                var newControl = this.getControlFactory().createControl(info, this);
                this.addChild(newControl);
                return newControl;
            };
            ElementViewModel.prototype.removeChilds = function (controls) {
                if (this["controls"]) {
                    var childs = this["controls"]();
                    for (var i = 0; i < controls.length; i++) {
                        childs.splice(childs.indexOf(controls[i]), 1);
                    }
                    this["controls"].valueHasMutated();
                }
            };
            ElementViewModel.prototype.addChilds = function (controls) {
                if (this["controls"]) {
                    var childs = this["controls"]();
                    for (var i = 0; i < controls.length; i++) {
                        childs.splice(0, 0, controls[i]);
                    }
                    this["controls"].valueHasMutated();
                }
            };
            ElementViewModel.prototype.removeChild = function (control) {
                if (this["controls"]) {
                    this["controls"].splice(this["controls"]().indexOf(control), 1);
                }
            };
            ElementViewModel.prototype.addChild = function (control) {
                if (this["controls"] && this["controls"]().indexOf(control) === -1) {
                    control.parentModel(this);
                    this["controls"].splice(0, 0, control);
                }
            };
            ElementViewModel.prototype.isPropertyVisible = function (name) {
                return true;
            };
            ElementViewModel.prototype.isPropertyDisabled = function (name) {
                return false;
            };
            ElementViewModel.prototype.isPropertyModified = function (name) {
                var needName = this["_" + name] ? "_" + name : name;
                if (this[needName].isPropertyModified) {
                    return this[needName].isPropertyModified();
                }
                else if (this[needName].isEmpty) {
                    return !this[needName].isEmpty();
                }
                else {
                    var defaultValue = this.getPropertyDefaultValue(name), propertyValue = ko.unwrap(this[needName]);
                    if (defaultValue instanceof Object) {
                        return !Analytics.Utils.compareObjects(defaultValue, propertyValue);
                    }
                    else {
                        return defaultValue !== propertyValue;
                    }
                }
            };
            ElementViewModel.prototype.getControlFactory = function () {
                throw Error("Virtual method getControlFactory");
            };
            ElementViewModel.prototype.isResettableProperty = function (propertyName) {
                return ["name", "size", "location"].indexOf(propertyName) === -1;
            };
            Object.defineProperty(ElementViewModel.prototype, "root", {
                get: function () {
                    var root = this;
                    while (root && root.parentModel()) {
                        root = root.parentModel();
                    }
                    return root;
                },
                enumerable: true,
                configurable: true
            });
            ElementViewModel.prototype.rtl = function () {
                return false;
            };
            return ElementViewModel;
        })(Analytics.Utils.Disposable);
        Analytics.ElementViewModel = ElementViewModel;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Margins = (function () {
            function Margins(left, right, top, bottom) {
                this.bottom = ko.observable(bottom);
                this.left = ko.observable(left);
                this.right = ko.observable(right);
                this.top = ko.observable(top);
            }
            Margins.prototype.getInfo = function () {
                return Analytics.paddingSerializationsInfo;
            };
            Margins.prototype.isEmpty = function () {
                return this.toString() === Margins.defaultVal;
            };
            Margins.fromString = function (value) {
                if (value === void 0) { value = Margins.defaultVal; }
                var components = value.split(',');
                return new Margins(parseInt(components[0]), parseInt(components[1]), parseInt(components[2]), parseInt(components[3]));
            };
            Margins.prototype.toString = function () {
                var result = Math.round(this.left()) + ", " + Math.round(this.right()) + ", " + Math.round(this.top()) + ", " + Math.round(this.bottom());
                return result;
            };
            Margins.defaultVal = "100, 100, 100, 100";
            Margins.unitProperties = ["left", "right"];
            return Margins;
        })();
        Analytics.Margins = Margins;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        Analytics.left = {
            propertyName: "left", modelName: "@Left", localizationId: "DevExpress.XtraPrinting.PaddingInfo.Left", displayName: "Left", editor: Analytics.Widgets.editorTemplates.numeric
        }, Analytics.right = { propertyName: "right", localizationId: "DevExpress.XtraPrinting.PaddingInfo.Right", modelName: "@Right", displayName: "Right", editor: Analytics.Widgets.editorTemplates.numeric }, Analytics.top = { propertyName: "top", localizationId: "DevExpress.XtraPrinting.PaddingInfo.Top", modelName: "@Top", displayName: "Top", editor: Analytics.Widgets.editorTemplates.numeric }, Analytics.bottom = { propertyName: "bottom", localizationId: "DevExpress.XtraPrinting.PaddingInfo.Bottom", modelName: "@Bottom", displayName: "Bottom", editor: Analytics.Widgets.editorTemplates.numeric };
        Analytics.paddingSerializationsInfo = [Analytics.left, Analytics.right, Analytics.top, Analytics.bottom];
        var PaddingModel = (function (_super) {
            __extends(PaddingModel, _super);
            function PaddingModel(left, right, top, bottom, dpi) {
                var _this = this;
                if (left === void 0) { left = ko.observable(null); }
                if (right === void 0) { right = ko.observable(null); }
                if (top === void 0) { top = ko.observable(null); }
                if (bottom === void 0) { bottom = ko.observable(null); }
                if (dpi === void 0) { dpi = ko.observable(100); }
                _super.call(this);
                this.left = left;
                this.right = right;
                this.top = top;
                this.bottom = bottom;
                this.dpi = dpi;
                ["left", "right", "top", "bottom"].forEach(function (propertyName) {
                    _this['_' + propertyName] = ko.observable(_this[propertyName]());
                    _this[propertyName] = ko.computed({
                        read: function () {
                            return _this['_' + propertyName]() || 0;
                        },
                        write: function (newVal) {
                            _this['_' + propertyName](newVal);
                        }
                    });
                });
            }
            PaddingModel.prototype.getInfo = function () {
                return Analytics.paddingSerializationsInfo;
            };
            PaddingModel.prototype.resetValue = function () {
                var _this = this;
                ["left", "right", "top", "bottom"].forEach(function (name) { return _this['_' + name](null); });
            };
            PaddingModel.prototype.isEmpty = function () {
                var _this = this;
                return ["left", "right", "top", "bottom"].map(function (x) { return ko.unwrap(_this['_' + x]); }).every(function (x) { return x === null; });
            };
            PaddingModel.prototype.applyFromString = function (value) {
                if (value) {
                    var components = (value || "").split(',');
                    this.left(parseInt(components[0]) || 0);
                    this.right(parseInt(components[1]) || 0);
                    this.top(parseInt(components[2]) || 0);
                    this.bottom(parseInt(components[3]) || 0);
                }
                return this;
            };
            PaddingModel.from = function (val) {
                return new PaddingModel().applyFromString(val);
            };
            PaddingModel.prototype.toString = function () {
                if (this.isEmpty())
                    return;
                return this._toString();
            };
            PaddingModel.prototype._toString = function (inner) {
                var _this = this;
                if (inner === void 0) { inner = false; }
                return ["left", "right", "top", "bottom"].map(function (x) { return parseInt(ko.unwrap(_this[x])); }).concat(this.dpi()).join(', ');
            };
            PaddingModel.defaultVal = "0, 0, 0, 0, 100";
            PaddingModel.unitProperties = ["left", "right", "top", "bottom"];
            return PaddingModel;
        })(Analytics.Utils.Disposable);
        Analytics.PaddingModel = PaddingModel;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Point = (function () {
            function Point(x, y) {
                this.x = ko.observable(x);
                this.y = ko.observable(y);
            }
            Point.prototype.getInfo = function () {
                return Analytics.Internal.locationFake;
            };
            Point.fromString = function (value) {
                if (value === void 0) { value = "0, 0"; }
                var components = value.split(',');
                return new Point(parseFloat(components[0]), parseFloat(components[1]));
            };
            Point.prototype.toString = function () {
                return this.x() + ", " + this.y();
            };
            Point.unitProperties = ["x", "y"];
            return Point;
        })();
        Analytics.Point = Point;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var SerializableModel = (function (_super) {
            __extends(SerializableModel, _super);
            function SerializableModel(model, serializer, info) {
                _super.call(this);
                if (info) {
                    this.getInfo = function () {
                        return info;
                    };
                }
                serializer = serializer || new Analytics.Utils.ModelSerializer();
                serializer.deserialize(this, model, info);
            }
            return SerializableModel;
        })(Analytics.Utils.Disposable);
        Analytics.SerializableModel = SerializableModel;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Size = (function () {
            function Size(width, height) {
                this.isPropertyDisabled = function (name) { return void 0; };
                this.width = ko.observable(width);
                this.height = ko.observable(height);
            }
            Size.prototype.getInfo = function () {
                return Analytics.Internal.sizeFake;
            };
            Size.fromString = function (value) {
                if (value === void 0) { value = "0, 0"; }
                var components = value.split(',');
                return new Size(parseFloat(components[0]), parseFloat(components[1]));
            };
            Size.prototype.toString = function () {
                return this.width() + ", " + this.height();
            };
            Size.unitProperties = ["width", "height"];
            return Size;
        })();
        Analytics.Size = Size;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var AjaxSetup = (function () {
                function AjaxSetup() {
                    this.ajaxSettings = {};
                }
                AjaxSetup.prototype.sendRequest = function (settings) {
                    return $.ajax($.extend({}, this.ajaxSettings, settings));
                };
                return AjaxSetup;
            })();
            Internal.AjaxSetup = AjaxSetup;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var DesignControlsHelper = (function (_super) {
                __extends(DesignControlsHelper, _super);
                function DesignControlsHelper(target, handlers, collectionNames) {
                    var _this = this;
                    _super.call(this);
                    this.collectionNames = collectionNames;
                    this._handlers = [];
                    this._setText = false;
                    this._visitedCollections = [];
                    this._subscriptions = [];
                    this._setName = function (value) {
                        var names = _this.allControls().map(function (item) { return ko.unwrap(item.name); });
                        if (!value.name() || names.filter(function (x) { return x === value.name(); }).length > 1) {
                            var controlType = value.controlType || "Unknown", initialText = value.getControlInfo && value.getControlInfo().defaultVal && value.getControlInfo().defaultVal["@Text"];
                            var newName = Internal.getUniqueNameForNamedObjectsArray(_this.allControls(), controlType, names);
                            value.name(newName);
                            if (_this._setText && value["text"] && !value["text"]() && (initialText === null || initialText === undefined)) {
                                value["text"](value.name());
                            }
                        }
                    };
                    this.added = function (value) {
                        _this._setText = true;
                        _this._collectControls(value);
                        _this._setText = false;
                    };
                    this.deleted = function (value) {
                        var allControls = _this.allControls();
                        var index = allControls.indexOf(value);
                        allControls.splice(index, 1);
                        Analytics.Utils.collectionsVisitor(value, function (collection) {
                            collection().forEach(function (item) {
                                allControls.splice(allControls.indexOf(item), 1);
                            });
                        });
                        _this.allControls.valueHasMutated();
                    };
                    this.allControls = ko.observableArray();
                    var unwrappedTarget = target;
                    if (ko.isSubscribable(target)) {
                        this._disposables.push(target.subscribe(function (newTarget) {
                            _this._visitedCollections = [];
                            for (var i = 0, len = _this._subscriptions.length; i < len; i++) {
                                _this._subscriptions[i].dispose();
                            }
                            _this._subscriptions = [];
                            _this.allControls([]);
                            if (newTarget) {
                                _this._collectControls(newTarget);
                            }
                        }));
                        unwrappedTarget = target.peek();
                    }
                    this._disposables.push(this.allControls.subscribe(function (args) {
                        var addedItems = args.filter(function (x) { return x.status === "added"; });
                        for (var i = 0; i < addedItems.length; i++) {
                            _this._setName(addedItems[i].value);
                        }
                        ;
                    }, null, "arrayChange"));
                    this._collectControls(unwrappedTarget);
                    this._handlers.push.apply(this._handlers, handlers);
                }
                DesignControlsHelper.prototype._collectControls = function (target) {
                    var _this = this;
                    var array = [target];
                    Analytics.Utils.collectionsVisitor(target, function (collection) {
                        if (_this._visitedCollections.indexOf(collection) === -1) {
                            _this._visitedCollections.push(collection);
                            _this._subscriptions.push(collection.subscribe(function (args) {
                                args.forEach(function (changeSet) {
                                    _this[changeSet.status] && _this[changeSet.status](changeSet.value);
                                    _this._handlers.forEach(function (handler) {
                                        handler[changeSet.status] && handler[changeSet.status](changeSet.value);
                                    });
                                });
                            }, null, "arrayChange"));
                        }
                        array.push.apply(array, collection());
                    }, this.collectionNames);
                    this.allControls.push.apply(this.allControls, array);
                };
                DesignControlsHelper.prototype.getControls = function (target) {
                    var controls = ko.observableArray();
                    Analytics.Utils.collectionsVisitor(target, function (collection) {
                        controls.push.apply(controls, collection());
                    });
                    return controls;
                };
                return DesignControlsHelper;
            })(Analytics.Utils.Disposable);
            Internal.DesignControlsHelper = DesignControlsHelper;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function patchPositionByRTL(position, rtl) {
                if (rtl) {
                    if (position === "Left")
                        return "Right";
                    else if (position === "Right")
                        return "Left";
                }
                return position;
            }
            Internal.patchPositionByRTL = patchPositionByRTL;
            var CssCalculator = (function () {
                function CssCalculator(control, _rtlLayout) {
                    var _this = this;
                    this._rtlLayout = _rtlLayout;
                    this._control = control;
                    this.borderCss = function (zoom) {
                        var borderWidth = _this._getBorderWidth(control, zoom);
                        var borderDefault = control["borderDefault"] && control["borderDefault"]();
                        var borderColor = control["borderColor"] && control["borderColor"]() || "";
                        var borders = control["borders"] && control["borders"]() || "";
                        var borderStyle = control["borderDashStyle"] && control["borderDashStyle"]() || "";
                        return borderDefault ? _this.createBorders(borderStyle, borderWidth, borderColor, borders, borderDefault) :
                            _this.createBorders(borderStyle, borderWidth, borderColor, borders);
                    };
                    this.backGroundCss = function () {
                        return { backgroundColor: control["backColor"] && control["backColor"]() || "transparent" };
                    };
                    this.foreColorCss = function () {
                        var color = (control["foreColor"] && control["foreColor"]() || "transparent") === "transparent" ? "black" : control["foreColor"]();
                        return { color: color };
                    };
                    this.fontCss = function () {
                        return _this.createFont(control["font"] && control["font"]() || "");
                    };
                    this.wordWrapCss = function () {
                        return _this.createWordWrap(ko.unwrap(control["wordWrap"]), ko.unwrap(control["multiline"]));
                    };
                    this.paddingsCss = function () {
                        var controlPaddings = ko.unwrap(control["paddingObj"] || control["padding"]) || Analytics.PaddingModel.from(Analytics.PaddingModel.defaultVal);
                        var paddings = {};
                        paddings["paddingLeft"] = _this._getPixelValueFromUnit(controlPaddings.left(), control) + "px";
                        paddings["paddingTop"] = _this._getPixelValueFromUnit(controlPaddings.top(), control) + "px";
                        paddings["paddingRight"] = _this._getPixelValueFromUnit(controlPaddings.right(), control) + "px";
                        paddings["paddingBottom"] = _this._getPixelValueFromUnit(controlPaddings.bottom(), control) + "px";
                        return paddings;
                    };
                    this.textAlignmentCss = function () {
                        var align = control["textAlignment"] && control["textAlignment"]() || "";
                        return $.extend(_this.createVerticalAlignment(align), _this.createHorizontalAlignment(align));
                    };
                    this.stroke = function () {
                        var color = (control["foreColor"] && control["foreColor"]() || "transparent") === "transparent" ? "black" : control["foreColor"]();
                        return { 'stroke': color };
                    };
                    this.strokeWidth = function () {
                        var lineWidth = control["lineWidth"] && control["lineWidth"]() || "";
                        return { 'strokeWidth': lineWidth };
                    };
                    this.strokeWidthWithWidth = function () {
                        var lineWidth = control["width"] && control["width"]() || "";
                        return { 'strokeWidth': lineWidth };
                    };
                    this.strokeDashArray = function () {
                        var dashArray = _this.createStrokeDashArray(control["lineStyle"] && control["lineStyle"]() || "", control["lineWidth"] && control["lineWidth"]() || "");
                        return { 'strokeDasharray': dashArray };
                    };
                    this.strokeDashArrayWithWidth = function () {
                        var dashArray = _this.createStrokeDashArray(control["lineStyle"] && control["lineStyle"]() || "", control["width"] && control["width"]() || "");
                        return { 'strokeDasharray': dashArray };
                    };
                    this.crossBandBorder = function (position) {
                        return _this.createBorder(control["borderDashStyleCrossband"] && control["borderDashStyleCrossband"]() || "solid", _this._getBorderWidth(control), control["borderColor"] && control["borderColor"]() || "", control["borders"] && control["borders"]() || "", position);
                    };
                    this.angle = function () {
                        return _this.createAngle(control["angle"] && control["angle"]() || 0);
                    };
                    this.cellBorder = function (position, zoom) {
                        return _this.createControlBorder(control["borderDashStyle"] && control["borderDashStyle"]() || "solid", _this._getBorderWidth(control, zoom), control["borderColor"] && control["borderColor"]() || "", control["borders"] && control["borders"]() || "", position);
                    };
                    this.zipCodeFontCss = function (fontSize) {
                        return _this.createZipCodeFont(fontSize || control["size"]["height"]());
                    };
                    this.zipCodeAlignment = function () {
                        var align = "TopLeft";
                        return $.extend(_this.createVerticalAlignment(align), _this.createHorizontalAlignment(align));
                    };
                }
                CssCalculator.prototype._getPixelValueFromUnit = function (value, control) {
                    if (control["root"] && control["root"].measureUnit) {
                        return Analytics.Utils.unitsToPixel(value, control["root"].measureUnit());
                    }
                    return value;
                };
                CssCalculator.prototype._patchPosition = function (position) {
                    return patchPositionByRTL(position, this._rtlLayout());
                };
                CssCalculator.prototype._getBorderWidth = function (control, zoom) {
                    return control["borderWidth"] && Math.floor(control["borderWidth"]() * (zoom || 1)) || "";
                };
                CssCalculator.prototype.createBorder = function (dashStyle, width, color, positions, position) {
                    var line = {};
                    positions = positions || "All";
                    line = { stroke: "Silver", strokeWidth: 2 };
                    var dash = this.createStrokeDashArray(dashStyle, width);
                    if (positions.indexOf(position) !== -1 || positions.indexOf("All") !== -1) {
                        line["stroke"] = color;
                        line["strokeWidth"] = width;
                        line["strokeDasharray"] = dash;
                    }
                    return line;
                };
                CssCalculator.prototype.createControlBorder = function (borderStyle, width, color, positions, position, defaultColor) {
                    if (defaultColor === void 0) { defaultColor = "solid 1px Silver"; }
                    var border = {};
                    positions = positions || "";
                    if (borderStyle === "Dash") {
                        borderStyle = "dashed";
                    }
                    else if (borderStyle === "Dot") {
                        borderStyle = "dotted";
                    }
                    else if (borderStyle === "Double") {
                        borderStyle = "double";
                    }
                    else {
                        borderStyle = "solid";
                    }
                    if (positions.indexOf(position) !== -1 || positions.indexOf("All") !== -1) {
                        border["border" + this._patchPosition(position)] = borderStyle + " " + width + "px " + color;
                    }
                    else {
                        border["border" + this._patchPosition(position)] = defaultColor;
                    }
                    return border;
                };
                CssCalculator.prototype.createBorders = function (borderStyle, width, color, positions, defaultColor) {
                    if (defaultColor === void 0) { defaultColor = CssCalculator.DEFAULT_BORDER; }
                    var left = this.createControlBorder(borderStyle, width, color, positions, "Left", defaultColor);
                    var right = this.createControlBorder(borderStyle, width, color, positions, "Right", defaultColor);
                    var top = this.createControlBorder(borderStyle, width, color, positions, "Top", defaultColor);
                    var bottom = this.createControlBorder(borderStyle, width, color, positions, "Bottom", defaultColor);
                    var border = $.extend({}, left, right, top, bottom);
                    return border;
                };
                CssCalculator.prototype.createZipCodeFont = function (height) {
                    var fontStyles = {};
                    fontStyles["fontFamily"] = "Impact";
                    fontStyles["fontSize"] = height + "px";
                    return fontStyles;
                };
                CssCalculator.prototype.createFont = function (fontString) {
                    var fontStyles = {};
                    fontString = fontString || "";
                    var components = fontString.split(',');
                    fontStyles["fontFamily"] = components[0] ? '"' + components[0] + '"' : "";
                    fontStyles["fontSize"] = components[1];
                    if (components.length > 2) {
                        for (var i = 2; i < components.length; i++) {
                            if (components[i].indexOf("Bold") !== -1)
                                fontStyles["fontWeight"] = "Bold";
                            if (components[i].indexOf("Italic") !== -1)
                                fontStyles["fontStyle"] = "Italic";
                            if (components[i].indexOf("Underline") != -1)
                                fontStyles["textDecoration"] = "Underline";
                            if (components[i].indexOf("Strikeout") != -1)
                                fontStyles["textDecoration"] = (fontStyles["textDecoration"] ? fontStyles["textDecoration"] + " " : "") + "Line-through";
                        }
                    }
                    if (!fontStyles["fontWeight"]) {
                        fontStyles["fontWeight"] = "";
                    }
                    if (!fontStyles["fontStyle"]) {
                        fontStyles["fontStyle"] = "";
                    }
                    if (!fontStyles["textDecoration"]) {
                        fontStyles["textDecoration"] = "";
                    }
                    return fontStyles;
                };
                CssCalculator.prototype.createVerticalAlignment = function (alignment) {
                    var result = {};
                    if (alignment.indexOf("Top") !== -1) {
                        result["verticalAlign"] = "top";
                    }
                    if (alignment.indexOf("Middle") !== -1) {
                        result["verticalAlign"] = "middle";
                    }
                    if (alignment.indexOf("Bottom") !== -1) {
                        result["verticalAlign"] = "bottom";
                    }
                    return result;
                };
                CssCalculator.prototype.createHorizontalAlignment = function (alignment) {
                    var result = {};
                    if (alignment.indexOf("Left") !== -1) {
                        result["textAlign"] = patchPositionByRTL("Left", this._control.rtl()).toLowerCase();
                    }
                    if (alignment.indexOf("Right") !== -1) {
                        result["textAlign"] = patchPositionByRTL("Right", this._control.rtl()).toLowerCase();
                    }
                    if (alignment.indexOf("Center") !== -1) {
                        result["textAlign"] = "center";
                    }
                    if (alignment.indexOf("Justify") !== -1) {
                        result["textAlign"] = "justify";
                    }
                    return result;
                };
                CssCalculator.prototype.createStrokeDashArray = function (style, width) {
                    if (style === "Solid") {
                        return "";
                    }
                    else if (style === "Dot") {
                        return [width, width * 2].join("px, ") + "px";
                    }
                    else if (style === "Dash") {
                        return [width * 4, width * 4].join("px, ") + "px";
                    }
                    else if (style === "DashDot") {
                        return [width * 4, width * 2, width, width * 2].join("px, ") + "px";
                    }
                    else if (style === "DashDotDot") {
                        return [width * 4, width * 2, width, width * 2, width, width * 2].join("px, ") + "px";
                    }
                    else {
                        return "";
                    }
                };
                CssCalculator.prototype.createWordWrap = function (wordwrap, multiline) {
                    var result = {};
                    if (wordwrap === false && multiline === false) {
                        result["white-space"] = "nowrap";
                        result["word-wrap"] = "normal";
                    }
                    else if (wordwrap === true && multiline === false) {
                        result["word-wrap"] = "break-word";
                        result["white-space"] = "";
                    }
                    else if (wordwrap === false && multiline === true) {
                        result["word-wrap"] = "normal";
                        result["white-space"] = 'pre';
                    }
                    else if (wordwrap === true && multiline === true) {
                        result["white-space"] = 'pre-wrap';
                        result["word-wrap"] = "break-word";
                    }
                    return result;
                };
                CssCalculator.prototype.createAngle = function (angle) {
                    angle = -angle;
                    return {
                        '-webkit-transform': "rotate(" + angle + "deg)",
                        '-moz-transform': "rotate(" + angle + "deg)",
                        '-o-transform': "rotate(" + angle + "deg)",
                        '-ms-transform': "rotate(" + angle + "deg)",
                        'transform': "rotate(" + angle + "deg)"
                    };
                };
                CssCalculator.prototype.contentSizeCss = function (controlSurfaceWidth, controlSurfaceHeight, zoom, borders) {
                    var _this = this;
                    var result = { top: 1, left: 1, right: 1, bottom: 1, width: 1, height: 1 };
                    borders = borders || this._control["borders"] && this._control["borders"]() || "";
                    var borderWidth = this._getBorderWidth(this._control, zoom);
                    ["Left", "Top", "Right", "Bottom"].forEach(function (item) {
                        if (borders.indexOf(item) !== -1 || borders.indexOf("All") !== -1) {
                            result[_this._patchPosition(item).toLowerCase()] = borderWidth;
                        }
                    });
                    result.width = controlSurfaceWidth - result.left - result.right;
                    result.height = controlSurfaceHeight - result.top - result.bottom;
                    return result;
                };
                CssCalculator.DEFAULT_BORDER = "none";
                return CssCalculator;
            })();
            Internal.CssCalculator = CssCalculator;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var ColorPickerEditor = (function (_super) {
                __extends(ColorPickerEditor, _super);
                function ColorPickerEditor(info, level, parentDisabled, textToSearch) {
                    var _this = this;
                    _super.call(this, info, level, parentDisabled, textToSearch);
                    this.displayValue = ko.pureComputed({
                        read: function () {
                            if (_this.value() && _this.value().toLowerCase() === "transparent") {
                                return "rgba(0,0,0,0)";
                            }
                            return _this.value() && _this.value().indexOf("rgba") !== -1 ? _this.value() : "rgba(0,0,0,1)";
                        },
                        write: function (val) {
                            _this.value(val);
                        }
                    });
                }
                return ColorPickerEditor;
            })(Widgets.Editor);
            Widgets.ColorPickerEditor = ColorPickerEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var FieldListEditor = (function (_super) {
                __extends(FieldListEditor, _super);
                function FieldListEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
                    var _this = this;
                    _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch);
                    this.path = ko.pureComputed(function () {
                        return _this._model() && _this._model()["getPath"] && _this._model()["getPath"](_this.name) || "";
                    });
                    this.treeListController = new Widgets.TreeListController();
                }
                return FieldListEditor;
            })(Widgets.Editor);
            Widgets.FieldListEditor = FieldListEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="fieldListEditor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var DataMemberTreeListController = (function () {
                function DataMemberTreeListController() {
                    this.selectedItem = null;
                    this.suppressActions = true;
                }
                DataMemberTreeListController.prototype.itemsFilter = function (item) {
                    return item.specifics !== "parameters" && (item.specifics === "List" || item.specifics === "ListSource" || item.isList === true || item.specifics === "none");
                };
                DataMemberTreeListController.prototype.hasItems = function (item) {
                    return item.specifics !== "none";
                };
                DataMemberTreeListController.prototype.canSelect = function (value) {
                    return (value.hasItems && !!value.path && (value.data.specifics === "List" || value.data.specifics === "ListSource")) || value.data.specifics === "none";
                };
                DataMemberTreeListController.prototype.select = function (value) {
                    if (this.canSelect(value)) {
                        this.selectedItem && this.selectedItem.isSelected(false);
                        this.selectedItem = value;
                        value.isSelected(true);
                    }
                };
                return DataMemberTreeListController;
            })();
            Widgets.DataMemberTreeListController = DataMemberTreeListController;
            var DataMemberEditor = (function (_super) {
                __extends(DataMemberEditor, _super);
                function DataMemberEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
                    _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch);
                    this.treeListController = new DataMemberTreeListController();
                }
                return DataMemberEditor;
            })(Widgets.FieldListEditor);
            Widgets.DataMemberEditor = DataMemberEditor;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="colorPickerEditor.ts" />
/// <reference path="fieldListEditor.ts" />
/// <reference path="dataMemberEditor.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            function createNumericEditor(dotNetTypeFullName, specifics) {
                var DynamicNumberEditor = (function (_super) {
                    __extends(DynamicNumberEditor, _super);
                    function DynamicNumberEditor(info, level, parentDisabled, textToSearch) {
                        _super.call(this, info, level, parentDisabled, textToSearch);
                    }
                    DynamicNumberEditor.prototype.getOptions = function (templateOptions) {
                        var options = _super.prototype.getOptions.call(this, templateOptions);
                        return Widgets.Internal.ValueEditorHelper.getNumberEditorOptions(dotNetTypeFullName, specifics, options);
                    };
                    return DynamicNumberEditor;
                })(Widgets.Editor);
                return {
                    header: "dx-number-editor",
                    editorType: DynamicNumberEditor
                };
            }
            Widgets.createNumericEditor = createNumericEditor;
            Widgets.coreEditorTemplates = {
                guid: { header: "dxrd-guid", editorType: Widgets.GuidEditor },
                borders: { header: "dxrd-borders" },
                controls: { header: "dxrd-controls" },
                objecteditorCustom: { custom: "dxrd-objectEditorContent", editorType: Widgets.PropertyGridEditor },
                treelist: { custom: "dxrd-treelistContent", editorType: Widgets.Editor },
                field: { header: "dxrd-field", editorType: Widgets.FieldListEditor },
                dataMember: { header: "dxrd-field", editorType: Widgets.DataMemberEditor },
                filterEditor: { header: "dxrd-filterstring" },
                formatEditor: { header: "dxrd-formatstring" },
                expressionEditor: { header: "dxrd-expressionstring" },
                multiValue: { header: "dxrd-multivalue" },
                multiValueEditable: { custom: "dxrd-multivalue-editable" },
                customColorEditor: { header: "dxrd-colorpicker", editorType: Widgets.ColorPickerEditor },
                sbyte: createNumericEditor("System.SByte", "integer"),
                decimal: createNumericEditor("System.Decimal", "float"),
                int64: createNumericEditor("System.Int64", "integer"),
                int32: createNumericEditor("System.Int32", "integer"),
                int16: createNumericEditor("System.Int16", "integer"),
                single: createNumericEditor("System.Single", "float"),
                double: createNumericEditor("System.Double", "float"),
                byte: createNumericEditor("System.Byte", "integer"),
                uint16: createNumericEditor("System.UInt16", "integer"),
                uint32: createNumericEditor("System.UInt32", "integer"),
                uint64: createNumericEditor("System.UInt64", "integer")
            };
            Widgets.editorTemplates = Analytics.Utils.extend(Widgets.editorTemplates, Widgets.coreEditorTemplates);
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../widgets/editorsInfo.ts" />
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            Internal.editorTypeMapper = {
                "Enum": Analytics.Widgets.editorTemplates.combobox,
                "System.String": Analytics.Widgets.editorTemplates.text,
                "System.Guid": Analytics.Widgets.coreEditorTemplates.guid,
                "System.SByte": Analytics.Widgets.coreEditorTemplates.sbyte,
                "System.Decimal": Analytics.Widgets.coreEditorTemplates.decimal,
                "System.Int64": Analytics.Widgets.coreEditorTemplates.int64,
                "System.Int32": Analytics.Widgets.coreEditorTemplates.int32,
                "System.Int16": Analytics.Widgets.coreEditorTemplates.int16,
                "System.Single": Analytics.Widgets.coreEditorTemplates.single,
                "System.Double": Analytics.Widgets.coreEditorTemplates.double,
                "System.Byte": Analytics.Widgets.coreEditorTemplates.byte,
                "System.UInt16": Analytics.Widgets.coreEditorTemplates.uint16,
                "System.UInt32": Analytics.Widgets.coreEditorTemplates.uint32,
                "System.UInt64": Analytics.Widgets.coreEditorTemplates.uint64,
                "System.Boolean": Analytics.Widgets.editorTemplates.boolSelect,
                "System.DateTime": Analytics.Widgets.editorTemplates.date,
                "DevExpress.DataAccess.Expression": Analytics.Widgets.coreEditorTemplates.expressionEditor
            };
            function getEditorType(typeString) {
                return Internal.editorTypeMapper[typeString] || Analytics.Widgets.editorTemplates.text;
            }
            Internal.getEditorType = getEditorType;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function getTypeNameFromFullName(controlType) {
                return controlType.split(',')[0].trim();
            }
            Internal.getTypeNameFromFullName = getTypeNameFromFullName;
            function getShortTypeName(controlType) {
                var fullTypeName = getTypeNameFromFullName(controlType), typeNameParts = fullTypeName.split('.');
                return typeNameParts[typeNameParts.length - 1];
            }
            Internal.getShortTypeName = getShortTypeName;
            function getControlFullName(value) {
                var displayName = value && (ko.unwrap(value.name) || ko.unwrap(value.displayName)), controlType = value && value.controlType;
                return displayName + (controlType ? (' (' + Analytics.getLocalization(getShortTypeName(controlType)) + ')') : '');
            }
            Internal.getControlFullName = getControlFullName;
            function getImageClassName(controlType) {
                var controlType = getTypeNameFromFullName(controlType || "").split(".").join("_"), name;
                if (controlType.indexOf("XR") === 0) {
                    name = controlType.slice(2).toLowerCase();
                }
                else if (controlType === "DevExpress_XtraReports_UI_XtraReport") {
                    name = "master_report";
                }
                return "dxrd-image-" + (name ? name : controlType.toLowerCase());
            }
            Internal.getImageClassName = getImageClassName;
            function getUniqueNameForNamedObjectsArray(objects, prefix, names) {
                if (prefix.indexOf("XR") === 0) {
                    prefix = prefix[2].toLowerCase() + prefix.slice(3);
                }
                else {
                    var indexBand = prefix.indexOf("Band");
                    if (indexBand !== -1 && prefix !== "SubBand") {
                        prefix = prefix.slice(0, indexBand) + prefix.slice(indexBand + 4);
                    }
                }
                return getUniqueName(names || objects.map(function (item) { return ko.unwrap(item.name); }), prefix);
            }
            Internal.getUniqueNameForNamedObjectsArray = getUniqueNameForNamedObjectsArray;
            function getUniqueName(names, prefix) {
                var i = 1, result = prefix + i;
                while (names.filter(function (item) { return item === result; }).length > 0) {
                    i++;
                    result = prefix + i;
                }
                ;
                return result;
            }
            Internal.getUniqueName = getUniqueName;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function initGlobalize(settings) {
                var globalize = Analytics.Localization.Globalize;
                if (globalize && settings) {
                    settings.cldrSupplemental && globalize.load(settings.cldrSupplemental);
                    settings.cldrData && globalize.load(settings.cldrData);
                    settings.currentCulture && globalize.locale(settings.currentCulture);
                }
            }
            Internal.initGlobalize = initGlobalize;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var HoverInfo = (function () {
                function HoverInfo() {
                    this._x = 0;
                    this._y = 0;
                    this.isOver = false;
                }
                Object.defineProperty(HoverInfo.prototype, "x", {
                    get: function () {
                        return this._x;
                    },
                    set: function (newX) {
                        this._x = newX;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HoverInfo.prototype, "y", {
                    get: function () {
                        return this._y;
                    },
                    set: function (newY) {
                        this._y = newY;
                    },
                    enumerable: true,
                    configurable: true
                });
                return HoverInfo;
            })();
            Internal.HoverInfo = HoverInfo;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var InlineTextEdit = (function (_super) {
                __extends(InlineTextEdit, _super);
                function InlineTextEdit(selection) {
                    var _this = this;
                    _super.call(this);
                    this._showInline = ko.observable(false);
                    this.text = ko.observable();
                    var _controlText;
                    this._disposables.push(selection.focused.subscribe(function () {
                        if (_this._showInline() && _controlText) {
                            _controlText(_this.text());
                            _this._showInline(false);
                        }
                        var controlModel = selection.focused() && selection.focused().getControlModel();
                        _controlText = controlModel && (controlModel.textEditableProperty || controlModel.text);
                    }));
                    this.visible = ko.pureComputed(function () {
                        return _this._showInline();
                    });
                    this.show = function (element) {
                        if (_this._showInline()) {
                            return;
                        }
                        var isSingleControlSelected = !!selection.selectedItems ? selection.selectedItems.length === 1 : !!selection.focused();
                        if (isSingleControlSelected && _controlText && !selection.focused().locked) {
                            _this.text(_controlText());
                            _this._showInline(true);
                            if (element) {
                                var textarea = $(element).find('textarea')[0];
                                textarea && textarea["select"]();
                            }
                        }
                        else {
                            _this._showInline(false);
                        }
                    };
                    this.keypressAction = function (args) {
                        if (args.event.keyCode === 27) {
                            _this._showInline(false);
                        }
                        if (args.event.keyCode === 13) {
                            _controlText(_this.text());
                            _this._showInline(false);
                        }
                    };
                }
                return InlineTextEdit;
            })(Analytics.Utils.Disposable);
            Internal.InlineTextEdit = InlineTextEdit;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var ObjectStructureTreeListController = (function () {
                function ObjectStructureTreeListController(propertyNames, listPropertyNames) {
                    var _this = this;
                    this.selectedItem = null;
                    this.itemsFilter = function (item) {
                        var realPropertyName = item.name.split('.')[0];
                        return propertyNames ? propertyNames.indexOf(realPropertyName) !== -1 || $.isNumeric(realPropertyName) : true;
                    };
                    this.hasItems = function (item) {
                        var realPropertyName = item.name.split('.')[0];
                        return item.isList || (listPropertyNames ? listPropertyNames.indexOf(realPropertyName) !== -1 : false);
                    };
                    this.getActions = function (item) {
                        return item.isSelected() && item.data["innerActions"] || [];
                    };
                    this.select = function (value) {
                        _this.selectedItem && _this.selectedItem.isSelected(false);
                        _this.selectedItem = value;
                        value.isSelected(true);
                    };
                    this.showIconsForChildItems = function () { return true; };
                }
                ObjectStructureTreeListController.prototype.canSelect = function (value) {
                    return true;
                };
                return ObjectStructureTreeListController;
            })();
            Internal.ObjectStructureTreeListController = ObjectStructureTreeListController;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var ObjectStructureProviderBase = (function (_super) {
                __extends(ObjectStructureProviderBase, _super);
                function ObjectStructureProviderBase() {
                    _super.apply(this, arguments);
                    this.selectedPath = ko.observable("");
                    this.selectedMember = ko.observable();
                }
                ObjectStructureProviderBase.prototype.getClassName = function (instance) {
                    if (instance.className && instance.className()) {
                        return instance.className();
                    }
                    var funcNameRegex = /function (.{1,})\(/;
                    var results = (funcNameRegex).exec((instance).constructor.toString());
                    return (results && results.length > 1) ? results[1] : "";
                };
                ObjectStructureProviderBase.prototype.createItem = function (currentTarget, propertyName, propertyValue, result) {
                    var targetInfo = currentTarget.getInfo && currentTarget.getInfo();
                    var propertyInfo = targetInfo && targetInfo.filter(function (propertyInfo) { return propertyInfo.propertyName === propertyName; })[0], unwrapPropertyValue = ko.unwrap(propertyValue);
                    if (propertyInfo && unwrapPropertyValue !== null && typeof unwrapPropertyValue === 'object') {
                        result.push({
                            name: propertyName,
                            displayName: Analytics.getLocalization(propertyInfo.displayName, propertyInfo.localizationId),
                            specifics: propertyName,
                            innerActions: unwrapPropertyValue["innerActions"],
                            isList: !!unwrapPropertyValue.push
                        });
                    }
                };
                ObjectStructureProviderBase.prototype.getMemberByPath = function (target, path) {
                    var pathComponents = path.split("."), currentTarget = target;
                    pathComponents.splice(0, 1);
                    pathComponents.forEach(function (member) {
                        if (currentTarget && currentTarget[member]) {
                            currentTarget = ko.unwrap(currentTarget[member]);
                        }
                    });
                    return currentTarget;
                };
                ObjectStructureProviderBase.prototype.getObjectPropertiesForPath = function (target, path, propertyName) {
                    var currentTarget = this.getMemberByPath(target, path), result = [];
                    if (currentTarget) {
                        if (currentTarget.push) {
                            this.createArrayItem(currentTarget, result, propertyName);
                        }
                        else {
                            for (var name in currentTarget) {
                                this.createItem(currentTarget, name, currentTarget[name], result);
                            }
                        }
                    }
                    return result;
                };
                ObjectStructureProviderBase.prototype.createArrayItem = function (currentTarget, result, propertyName) {
                    for (var i = 0; i < currentTarget.length; i++) {
                        var unwrapArrayValue = ko.unwrap(currentTarget[i]);
                        result.push({
                            name: propertyName ? propertyName + "." + i.toString() : i.toString(),
                            displayName: ko.unwrap(unwrapArrayValue["displayName"] || unwrapArrayValue["name"]),
                            specifics: this.getClassName(unwrapArrayValue),
                            innerActions: unwrapArrayValue["innerActions"],
                            isList: !!unwrapArrayValue.push
                        });
                    }
                };
                return ObjectStructureProviderBase;
            })(Analytics.Utils.Disposable);
            Internal.ObjectStructureProviderBase = ObjectStructureProviderBase;
            var ObjectExplorerProvider = (function (_super) {
                __extends(ObjectExplorerProvider, _super);
                function ObjectExplorerProvider(rootITems, listPropertyNames, member, getPathByMember) {
                    var _this = this;
                    _super.call(this);
                    this.path = ko.observable("");
                    this.getPathByMember = getPathByMember;
                    this.listPropertyNames = listPropertyNames || [];
                    this.getItems = function (pathRequest) {
                        var result = $.Deferred();
                        if (!pathRequest.fullPath) {
                            result.resolve((rootITems || []).map(function (item) {
                                return { name: item.name, displayName: Analytics.getLocalization(item.displayName) || item.name, isList: true, specifics: item.className, dragData: { noDragable: true }, data: ko.unwrap(item.data) };
                            }));
                        }
                        else {
                            var target = rootITems.filter(function (item) { return item.name === pathRequest.fullPath.split('.')[0]; })[0];
                            result.resolve(_this.getObjectPropertiesForPath(ko.unwrap(target.model), pathRequest.fullPath, target.name));
                        }
                        return result.promise();
                    };
                    this.selectedPath = ko.computed({
                        read: function () {
                            if (member()) {
                                if (_this.path.peek()) {
                                    return _this.getPathByMember(member()).substr(_this.path.peek().length + 1);
                                }
                                else {
                                    return _this.getPathByMember(member());
                                }
                            }
                            else {
                                return null;
                            }
                        },
                        write: function (newVal) {
                            if (!!newVal) {
                                var root = !!_this.path() ? _this.path().split('.')[0] : newVal.split('.')[0];
                                var rootItem = rootITems.filter(function (x) { return x.displayName === root; })[0];
                                if (!!rootItem) {
                                    member(_this.getMemberByPath(ko.unwrap(rootItem.model), _this.path() ? [_this.path(), newVal].join('.') : newVal));
                                }
                            }
                            else {
                                member(null);
                            }
                        }
                    });
                }
                ObjectExplorerProvider.prototype.createArrayItem = function (currentTarget, result, propertyName) {
                    for (var i = 0; i < currentTarget.length; i++) {
                        var unwrapArrayValue = ko.unwrap(currentTarget[i]), isList = false;
                        this.listPropertyNames.forEach(function (name) {
                            if (!isList && unwrapArrayValue[name] && ko.unwrap(unwrapArrayValue[name]).length > 0) {
                                isList = true;
                            }
                        });
                        var specifics = this.getClassName(unwrapArrayValue);
                        result.push({
                            name: propertyName ? propertyName + "." + i.toString() : i.toString(),
                            displayName: ko.unwrap(unwrapArrayValue["displayName"] || unwrapArrayValue["name"]),
                            specifics: specifics,
                            isList: isList,
                            data: unwrapArrayValue,
                            dragData: {
                                noDragable: !((propertyName === "bands" && (specifics === "groupheaderband" || specifics === "groupfooterband" || specifics === "detailreportband")) ||
                                    propertyName === "controls" ||
                                    propertyName === "rows" ||
                                    propertyName === "cells" ||
                                    propertyName === "subBands" ||
                                    propertyName === "Styles" ||
                                    propertyName === "Formatting Rules")
                            }
                        });
                    }
                };
                ObjectExplorerProvider.prototype.createItem = function (currentTarget, propertyName, propertyValue, result) {
                    var isAvailableListProperty = this.listPropertyNames.length > 0 ? this.listPropertyNames.indexOf(propertyName) > -1 : true;
                    if (isAvailableListProperty && propertyValue && propertyValue.push) {
                        this.createArrayItem(ko.unwrap(propertyValue), result, propertyName);
                    }
                };
                return ObjectExplorerProvider;
            })(ObjectStructureProviderBase);
            Internal.ObjectExplorerProvider = ObjectExplorerProvider;
            var ObjectStructureProvider = (function (_super) {
                __extends(ObjectStructureProvider, _super);
                function ObjectStructureProvider(target, displayName, localizationId) {
                    var _this = this;
                    _super.call(this);
                    this.getItems = function (pathRequest) {
                        var result = $.Deferred();
                        if (!pathRequest.fullPath) {
                            result.resolve([{ name: displayName || ko.unwrap(target["name"]), displayName: Analytics.getLocalization(displayName || ko.unwrap(target["name"]), localizationId), isList: true, specifics: target.className && target.className(), dragData: { noDragable: true } }]);
                        }
                        else {
                            result.resolve(_this.getObjectPropertiesForPath(ko.unwrap(target), pathRequest.fullPath));
                        }
                        return result.promise();
                    };
                    this._disposables.push(this.selectedPath.subscribe(function (path) {
                        _this.selectedMember(ko.unwrap(_this.getMemberByPath(ko.unwrap(target), path)));
                    }));
                }
                return ObjectStructureProvider;
            })(ObjectStructureProviderBase);
            Internal.ObjectStructureProvider = ObjectStructureProvider;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            Internal.papperKindMapper = {
                A2: { width: 1654, height: 2339 },
                A3: { width: 1169, height: 1654 },
                A3Extra: { width: 1268, height: 1752 },
                A3ExtraTransverse: { width: 1268, height: 1752 },
                A3Rotated: { width: 1654, height: 1169 },
                A3Transverse: { width: 1169, height: 1654 },
                A4: { width: 827, height: 1169 },
                A4Extra: { width: 929, height: 1268 },
                A4Plus: { width: 827, height: 1299 },
                A4Rotated: { width: 1169, height: 827 },
                A4Small: { width: 827, height: 1169 },
                A4Transverse: { width: 827, height: 1169 },
                A5: { width: 583, height: 827 },
                A5Extra: { width: 685, height: 925 },
                A5Rotated: { width: 827, height: 583 },
                A5Transverse: { width: 583, height: 827 },
                A6: { width: 413, height: 583 },
                A6Rotated: { width: 583, height: 413 },
                APlus: { width: 894, height: 1402 },
                B4: { width: 984, height: 1390 },
                B4Envelope: { width: 984, height: 1390 },
                B4JisRotated: { width: 1433, height: 1012 },
                B5: { width: 693, height: 984 },
                B5Envelope: { width: 693, height: 984 },
                B5Extra: { width: 791, height: 1087 },
                B5JisRotated: { width: 1012, height: 717 },
                B5Transverse: { width: 717, height: 1012 },
                B6Envelope: { width: 693, height: 492 },
                B6Jis: { width: 504, height: 717 },
                B6JisRotated: { width: 717, height: 504 },
                BPlus: { width: 1201, height: 1917 },
                C3Envelope: { width: 1276, height: 1803 },
                C4Envelope: { width: 902, height: 1276 },
                C5Envelope: { width: 638, height: 902 },
                C65Envelope: { width: 449, height: 902 },
                C6Envelope: { width: 449, height: 638 },
                CSheet: { width: 1700, height: 2200 },
                DLEnvelope: { width: 433, height: 866 },
                DSheet: { width: 2200, height: 3400 },
                ESheet: { width: 3400, height: 4400 },
                Executive: { width: 725, height: 1050 },
                Folio: { width: 850, height: 1300 },
                GermanLegalFanfold: { width: 850, height: 1300 },
                GermanStandardFanfold: { width: 850, height: 1200 },
                InviteEnvelope: { width: 866, height: 866 },
                IsoB4: { width: 984, height: 1390 },
                ItalyEnvelope: { width: 433, height: 906 },
                JapaneseDoublePostcard: { width: 787, height: 583 },
                JapaneseDoublePostcardRotated: { width: 583, height: 787 },
                JapanesePostcard: { width: 394, height: 583 },
                Ledger: { width: 1700, height: 1100 },
                Legal: { width: 850, height: 1400 },
                LegalExtra: { width: 927, height: 1500 },
                Letter: { width: 850, height: 1100 },
                LetterExtra: { width: 927, height: 1200 },
                LetterExtraTransverse: { width: 927, height: 1200 },
                LetterPlus: { width: 850, height: 1269 },
                LetterRotated: { width: 1100, height: 850 },
                LetterSmall: { width: 850, height: 1100 },
                LetterTransverse: { width: 827, height: 1100 },
                MonarchEnvelope: { width: 388, height: 750 },
                Note: { width: 850, height: 1100 },
                Number10Envelope: { width: 412, height: 950 },
                Number11Envelope: { width: 450, height: 1038 },
                Number12Envelope: { width: 475, height: 1100 },
                Number14Envelope: { width: 500, height: 1150 },
                Number9Envelope: { width: 388, height: 888 },
                PersonalEnvelope: { width: 362, height: 650 },
                Prc16K: { width: 575, height: 846 },
                Prc16KRotated: { width: 575, height: 846 },
                Prc32K: { width: 382, height: 594 },
                Prc32KBig: { width: 382, height: 594 },
                Prc32KBigRotated: { width: 382, height: 594 },
                Prc32KRotated: { width: 382, height: 594 },
                PrcEnvelopeNumber1: { width: 402, height: 650 },
                PrcEnvelopeNumber10: { width: 1276, height: 1803 },
                PrcEnvelopeNumber10Rotated: { width: 1803, height: 1276 },
                PrcEnvelopeNumber1Rotated: { width: 650, height: 402 },
                PrcEnvelopeNumber2: { width: 402, height: 693 },
                PrcEnvelopeNumber2Rotated: { width: 693, height: 402 },
                PrcEnvelopeNumber3: { width: 492, height: 693 },
                PrcEnvelopeNumber3Rotated: { width: 693, height: 492 },
                PrcEnvelopeNumber4: { width: 433, height: 819 },
                PrcEnvelopeNumber4Rotated: { width: 819, height: 433 },
                PrcEnvelopeNumber5: { width: 433, height: 866 },
                PrcEnvelopeNumber5Rotated: { width: 866, height: 433 },
                PrcEnvelopeNumber6: { width: 472, height: 906 },
                PrcEnvelopeNumber6Rotated: { width: 906, height: 472 },
                PrcEnvelopeNumber7: { width: 630, height: 906 },
                PrcEnvelopeNumber7Rotated: { width: 906, height: 630 },
                PrcEnvelopeNumber8: { width: 472, height: 1217 },
                PrcEnvelopeNumber8Rotated: { width: 1217, height: 472 },
                PrcEnvelopeNumber9: { width: 902, height: 1276 },
                PrcEnvelopeNumber9Rotated: { width: 1276, height: 902 },
                Quarto: { width: 846, height: 1083 },
                Standard10x11: { width: 1000, height: 1100 },
                Standard10x14: { width: 1000, height: 1400 },
                Standard11x17: { width: 1100, height: 1700 },
                Standard12x11: { width: 1200, height: 1100 },
                Standard15x11: { width: 1500, height: 1100 },
                Standard9x11: { width: 900, height: 1100 },
                Statement: { width: 550, height: 850 },
                Tabloid: { width: 1100, height: 1700 },
                TabloidExtra: { width: 1169, height: 1800 },
                USStandardFanfold: { width: 1488, height: 1100 },
            };
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback) {
                var message = errorThrown;
                var error = Analytics.Utils.getErrorMessage(jqXHR);
                if (error && error !== message) {
                    message += ": " + error;
                }
                try {
                    processErrorCallback ? processErrorCallback(message, jqXHR, textStatus) : Analytics.Utils.NotifyAboutWarning(message);
                }
                finally {
                    deferred.reject(jqXHR, textStatus, errorThrown);
                }
            }
            Internal._processError = _processError;
            Internal._errorProcessor = {
                handlers: [],
                call: function (e) {
                    for (var i = 0; i < Internal._errorProcessor.handlers.length; i++) {
                        Internal._errorProcessor.handlers[i](e);
                    }
                }
            };
            function processErrorEvent(func) {
                if (func) {
                    Internal._errorProcessor.handlers.push(func);
                }
            }
            Internal.processErrorEvent = processErrorEvent;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SortedArrayStore = (function (_super) {
                __extends(SortedArrayStore, _super);
                function SortedArrayStore(options, sortPropertyName) {
                    if (sortPropertyName === void 0) { sortPropertyName = 'name'; }
                    if (options instanceof Array) {
                        options.sort(function (a, b) {
                            var propA = ko.unwrap(a[sortPropertyName]), propB = ko.unwrap(b[sortPropertyName]);
                            if (propA && propB) {
                                var diff = propA - propB;
                                if (!isNaN(diff))
                                    return diff;
                                propA = propA.toLowerCase ? propA.toLowerCase() : propA;
                                propB = propB.toLowerCase ? propB.toLowerCase() : propB;
                                return (propA < propB) ? -1 : (propA > propB) ? 1 : 0;
                            }
                        });
                    }
                    _super.call(this, options);
                }
                return SortedArrayStore;
            })(DevExpress.data.ArrayStore);
            Internal.SortedArrayStore = SortedArrayStore;
            var ControlsArrayStore = (function (_super) {
                __extends(ControlsArrayStore, _super);
                function ControlsArrayStore() {
                    _super.apply(this, arguments);
                }
                ControlsArrayStore.prototype.load = function (options) {
                    if (options && options.filter && options.filter.length === 2) {
                        return $.Deferred()
                            .resolve([options.filter[1]])
                            .promise();
                    }
                    return _super.prototype.load.call(this, options);
                };
                return ControlsArrayStore;
            })(SortedArrayStore);
            Internal.ControlsArrayStore = ControlsArrayStore;
            var ControlsStore = (function () {
                function ControlsStore(allControls) {
                    var _this = this;
                    this._filter = ko.observable(null);
                    this.dataSource = ko.computed(function () {
                        var dataSource = new DevExpress.data.DataSource({
                            store: new ControlsArrayStore(allControls()),
                            paginate: true,
                            filter: _this._filter(),
                            pageSize: 100
                        });
                        return dataSource;
                    });
                    this.visible = ko.computed(function () {
                        return allControls().length > 0;
                    });
                }
                ControlsStore.prototype.setFilter = function (filter) {
                    this._filter(filter);
                };
                ControlsStore.prototype.resetFilter = function () {
                    this._filter(null);
                };
                return ControlsStore;
            })();
            Internal.ControlsStore = ControlsStore;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function findSurface(viewModel) {
                return viewModel["surface"];
            }
            Internal.findSurface = findSurface;
            function getControlNewAbsolutePositionOnResize(snapHelper, absolutePosition, ui, delta) {
                var newAbsolutePosition = {
                    top: absolutePosition.top + delta.y,
                    left: absolutePosition.left + delta.x,
                    bottom: absolutePosition.top + ui.originalSize.height,
                    right: absolutePosition.left + ui.originalSize.width
                };
                if (delta.x !== 0) {
                    newAbsolutePosition.left = snapHelper.snapPosition(newAbsolutePosition.left, false);
                }
                else if (delta.width !== 0) {
                    newAbsolutePosition.right = snapHelper.snapPosition(absolutePosition.left + ui.size.width, false);
                }
                if (delta.y !== 0) {
                    newAbsolutePosition.top = snapHelper.snapPosition(newAbsolutePosition.top, true);
                }
                else if (delta.height !== 0) {
                    newAbsolutePosition.bottom = snapHelper.snapPosition(absolutePosition.top + ui.size.height, true);
                }
                return newAbsolutePosition;
            }
            Internal.getControlNewAbsolutePositionOnResize = getControlNewAbsolutePositionOnResize;
            function num(v) {
                return parseInt(v, 10) || 0;
            }
            function getControlRect(element, control, surface) {
                var curleft = num(element.css("left")), curtop = num(element.css("top"));
                if (surface.rtl()) {
                    var posLeft = surface.pageWidth() - surface.margins.left() - element.width();
                    if (curleft > posLeft) {
                        curleft = posLeft;
                    }
                }
                var bounds = element[0].getBoundingClientRect();
                return { top: curtop, left: curleft, width: bounds.width, height: bounds.height };
            }
            Internal.getControlRect = getControlRect;
            function minHeightWithoutScroll(element) {
                return Math.min(element.scrollHeight, element.offsetHeight, element.clientHeight) + element.offsetTop;
            }
            Internal.minHeightWithoutScroll = minHeightWithoutScroll;
            function chooseBetterPositionOf(html, designer) {
                return designer && (minHeightWithoutScroll(html) < minHeightWithoutScroll(designer) ? window : designer) || window;
            }
            Internal.chooseBetterPositionOf = chooseBetterPositionOf;
            function updateSurfaceContentSize(surfaceSize, root, rtl) {
                if (rtl === void 0) { rtl = false; }
                return function () {
                    var $root = $(root).find(".dxrd-designer").eq(0);
                    var rightAreaWidth = $root.find(".dxrd-right-panel").outerWidth() + $root.find(".dxrd-right-tabs").outerWidth();
                    var otherWidth = rightAreaWidth + $root.find(".dxrd-toolbox-wrapper").outerWidth(), surfaceWidth = $root.width() - (otherWidth + 5);
                    $root.find(".dxrd-surface-wrapper").eq(0).css({
                        "left": rtl ? rightAreaWidth : 64,
                        "right": !rtl ? rightAreaWidth : 64,
                        "width": surfaceWidth,
                        "bottom": $root.find(".dxrd-navigation-panel-wrapper").outerHeight() || 0
                    });
                    surfaceSize(surfaceWidth);
                };
            }
            Internal.updateSurfaceContentSize = updateSurfaceContentSize;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function validateName(nameCandidate) {
                if (!nameCandidate)
                    return false;
                var letter = "\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376-\\u0377\\u037A-\\u037D\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u052F\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E-\\u066F\\u0671-\\u06D3\\u06D5\\u06E5-\\u06E6\\u06EE-\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4-\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0980\\u0985-\\u098C\\u098F-\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC-\\u09DD\\u09DF-\\u09E1\\u09F0-\\u09F1\\u0A05-\\u0A0A\\u0A0F-\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32-\\u0A33\\u0A35-\\u0A36\\u0A38-\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2-\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0-\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F-\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32-\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C-\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99-\\u0B9A\\u0B9C\\u0B9E-\\u0B9F\\u0BA3-\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60-\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0-\\u0CE1\\u0CF1-\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32-\\u0E33\\u0E40-\\u0E46\\u0E81-\\u0E82\\u0E84\\u0E87-\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA-\\u0EAB\\u0EAD-\\u0EB0\\u0EB2-\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065-\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F5\\u13F8-\\u13FD\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE-\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5-\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183-\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2-\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3006\\u3031-\\u3035\\u303B-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A-\\uA62B\\uA640-\\uA66E\\uA67F-\\uA69D\\uA6A0-\\uA6E5\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA7AD\\uA7B0-\\uA7B7\\uA7F7-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uA9E0-\\uA9E4\\uA9E6-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5-\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uAB30-\\uAB5A\\uAB5C-\\uAB65\\uAB70-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40-\\uFB41\\uFB43-\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC";
                var pattern = new RegExp("^[" + letter + "_][" + letter + "_\\d]*$");
                return pattern.test(nameCandidate);
            }
            Internal.validateName = validateName;
            function replaceInvalidSymbols(text) {
                return text.replace(/[\W_]+/g, "_");
            }
            Internal.replaceInvalidSymbols = replaceInvalidSymbols;
            Internal.nameValidationRules = [{ type: "custom", validationCallback: function (options) { return validateName(options.value); }, message: DevExpress.Analytics.getLocalization('Name is required and should be a valid identifier.', 'ASPxReportsStringId.ReportDesigner_NameIsRequired_Error') }];
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var CombinedObject = (function () {
                function CombinedObject() {
                }
                CombinedObject.getInfo = function (controls) {
                    var infos = controls.map(function (item) { return item["getInfo"](); });
                    return function () {
                        var info = [];
                        for (var i = 0; i < infos[0].length; i++) {
                            if (infos.filter(function (info) { return info.filter(function (x) { return x.propertyName === infos[0][i].propertyName; }).length > 0; }).length === infos.length) {
                                info.push(infos[0][i]);
                            }
                        }
                        return info;
                    };
                };
                CombinedObject.isPropertyDisabled = function (controls) {
                    return function (name) {
                        for (var i = 0; i < controls.length; i++) {
                            if (controls[i]["isPropertyDisabled"](name)) {
                                return true;
                            }
                        }
                        return false;
                    };
                };
                CombinedObject.isPropertyVisible = function (controls) {
                    return function (name) {
                        for (var i = 0; i < controls.length; i++) {
                            if (!controls[i]["isPropertyVisible"](name)) {
                                return false;
                            }
                        }
                        return true;
                    };
                };
                CombinedObject.mergeProperty = function (controls, propertyName, undoEngine, customMerge) {
                    var property = controls[0][propertyName];
                    var combinedObj = null;
                    var subscriptions = null;
                    if (controls.filter(function (x) { return !!x[propertyName]; }).length === controls.length) {
                        combinedObj = customMerge && customMerge(propertyName, controls, undoEngine);
                        if (!combinedObj) {
                            if (ko.isObservable(property) && !property["push"]) {
                                if (!controls.every(function (control) { return ko.isObservable(control[propertyName]); }))
                                    return combinedObj;
                                var combinedObservable = ko.observable(controls.every(function (control) { return controls[0][propertyName].peek() === control[propertyName].peek(); }) ? controls[0][propertyName].peek() : null);
                                combinedObj = {
                                    result: combinedObservable,
                                    subscriptions: [combinedObservable.subscribe(function (newVal) {
                                            undoEngine && undoEngine().start();
                                            controls.forEach(function (control) { control[propertyName](newVal); });
                                            undoEngine && undoEngine().end();
                                        })]
                                };
                            }
                            else if (typeof property === "object" && !$.isArray(property)) {
                                combinedObj = this._merge(controls.map(function (x) { return x[propertyName]; }), undoEngine, customMerge);
                            }
                        }
                    }
                    return combinedObj;
                };
                CombinedObject._createProperty = function (result, propertyName, propertyValue) {
                    if (propertyValue) {
                        if (typeof propertyValue === "object" && $.isEmptyObject(propertyValue))
                            return;
                        result[propertyName] = propertyValue;
                    }
                };
                CombinedObject._merge = function (controls, undoEngine, customMerge, ignoreProperties) {
                    var _this = this;
                    var result = {};
                    var subscriptions = [];
                    ["getInfo", "isPropertyVisible", "isPropertyDisabled"].forEach(function (propertyName) {
                        if (controls[0][propertyName])
                            _this._createProperty(result, propertyName, _this[propertyName](controls));
                    });
                    if (ignoreProperties) {
                        var oldPropertyDisabled = result["isPropertyDisabled"];
                        result["isPropertyDisabled"] = function (name) {
                            return (oldPropertyDisabled && oldPropertyDisabled()) || ignoreProperties.indexOf(name) !== -1;
                        };
                    }
                    if (result && result["getInfo"]) {
                        result["getInfo"]().map(function (x) { return x.propertyName; }).forEach(function (propertyName) {
                            var combinedObj = _this.mergeProperty(controls, propertyName, undoEngine, customMerge);
                            if (combinedObj) {
                                subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                                _this._createProperty(result, propertyName, combinedObj.result);
                            }
                        });
                    }
                    else {
                        for (var propertyName in controls[0]) {
                            var combinedObj = this.mergeProperty(controls, propertyName, undoEngine, customMerge);
                            if (combinedObj) {
                                subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                                this._createProperty(result, propertyName, combinedObj.result);
                            }
                        }
                    }
                    return { result: result, subscriptions: subscriptions };
                };
                CombinedObject.mergeControls = function (controls, undoEngine, customMerge, ignoreProperties) {
                    var combinedObj = this._merge(controls, undoEngine, customMerge, ignoreProperties);
                    return {
                        result: $.extend(combinedObj.result, { controlType: "multiselect", displayName: ko.observable("") }),
                        subscriptions: combinedObj.subscriptions
                    };
                };
                CombinedObject.getEditableObject = function (selectionProvider, undoEngine, customMerge) {
                    var _this = this;
                    var editableObject = ko.observable(null);
                    var subscriptions = [];
                    selectionProvider.focused.subscribe(function (newVal) {
                        editableObject(newVal && newVal.getControlModel());
                    });
                    return ko.pureComputed({
                        read: function () {
                            subscriptions.forEach(function (x) { return x.dispose(); });
                            if (selectionProvider.selectedItems.length > 1) {
                                var combinedObj = _this.mergeControls(selectionProvider.selectedItems.map(function (item) { return item.getControlModel(); }), undoEngine, customMerge, selectionProvider.ignoreMultiSelectProperties);
                                subscriptions = combinedObj.subscriptions;
                                return combinedObj.result;
                            }
                            else {
                                return editableObject();
                            }
                        },
                        write: function (val) {
                            if (val && val.surface) {
                                selectionProvider.focused(val.surface);
                            }
                            else {
                                editableObject(val);
                            }
                        }
                    });
                };
                return CombinedObject;
            })();
            Internal.CombinedObject = CombinedObject;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SurfaceSelection = (function () {
                function SurfaceSelection(ignoreMultiSelectProperties) {
                    var _this = this;
                    if (ignoreMultiSelectProperties === void 0) { ignoreMultiSelectProperties = ["name"]; }
                    this.ignoreMultiSelectProperties = ignoreMultiSelectProperties;
                    this._focused = ko.observable(null);
                    this._selectedControls = ko.observableArray();
                    this._selectedControlsInner = [];
                    this.focused = ko.pureComputed({
                        read: function () {
                            return _this._focused();
                        },
                        write: function (val) {
                            if (val !== _this._focused()) {
                                if (!!val) {
                                    _this._firstSelected = val;
                                }
                                _this.updateSelection(_this._firstSelected);
                            }
                        }
                    });
                    this.dropTarget = null;
                    this.expectClick = false;
                }
                SurfaceSelection.prototype._removeFromSelection = function (control) {
                    control.focused(false);
                    control.selected(false);
                    if (this._selectedControlsInner.indexOf(control) !== -1) {
                        this._selectedControlsInner.splice(this._selectedControlsInner.indexOf(control), 1);
                    }
                };
                SurfaceSelection.prototype._setFocused = function (control) {
                    if (this._focused()) {
                        this._removeFromSelection(this._focused());
                    }
                    this._focused(control);
                    if (control) {
                        control.focused(true);
                        if (this._selectedControlsInner.indexOf(control) === -1) {
                            this._selectedControlsInner.push(control);
                        }
                        control.selected(true);
                    }
                };
                SurfaceSelection.prototype._resetTabPanelFocus = function () {
                    var isTabPanelFocused = document.activeElement && $(document.activeElement).closest(".dxrd-surface").length === 0;
                    if (isTabPanelFocused) {
                        document.activeElement["blur"] && document.activeElement["blur"]();
                    }
                };
                Object.defineProperty(SurfaceSelection.prototype, "selectedItems", {
                    get: function () {
                        return this._selectedControls();
                    },
                    enumerable: true,
                    configurable: true
                });
                SurfaceSelection.prototype.clear = function () {
                    this.focused(null);
                    this._selectedControls([]);
                };
                SurfaceSelection.prototype.applySelection = function () {
                    this._selectedControls(this._selectedControlsInner);
                };
                SurfaceSelection.prototype.selectItems = function (items) {
                    this._selectedControlsInner = items;
                    this._selectedControlsInner.forEach(function (selectedControl) {
                        if (!selectedControl.focused()) {
                            selectedControl.selected(true);
                        }
                    });
                    this.applySelection();
                };
                SurfaceSelection.prototype.updateSelection = function (control) {
                    this._selectedControlsInner.forEach(function (selectedControl) {
                        selectedControl.focused(false);
                        selectedControl.selected(false);
                    });
                    this._selectedControlsInner = [];
                    this._setFocused(control);
                    this.applySelection();
                };
                SurfaceSelection.prototype.swapFocusedItem = function (control) {
                    if (this._focused() !== control) {
                        this._focused().focused(false);
                        this._focused(control);
                        this._focused().focused(true);
                    }
                };
                SurfaceSelection.prototype.initialize = function (control) {
                    control = control || this.dropTarget;
                    this._firstSelected = !!(control && control["focused"]) ? control : null;
                    this.updateSelection(this._firstSelected);
                };
                SurfaceSelection.prototype.clickHandler = function (control, event) {
                    if (event === void 0) { event = { ctrlKey: false }; }
                    if (this.expectClick) {
                        this.expectClick = false;
                        return;
                    }
                    control = control || this.dropTarget;
                    if (!event.ctrlKey) {
                        if (this._selectedControlsInner.length > 1 && this._selectedControlsInner.indexOf(control) !== -1) {
                            this.swapFocusedItem(control);
                        }
                        else {
                            if (this._focused() !== control) {
                                this.initialize(control);
                            }
                        }
                    }
                    else {
                        this.selectionWithCtrl(control);
                        this.applySelection();
                    }
                    this._resetTabPanelFocus();
                };
                SurfaceSelection.prototype.selecting = function (event) {
                    if (!this._focused()) {
                        this._setFocused(event.control);
                    }
                    else {
                        event.cancel = !event.control.checkParent(this._firstSelected);
                        if (!event.cancel) {
                            if (this._firstSelected && this._firstSelected.focused()) {
                                this._setFocused(event.control);
                            }
                            else if (this._selectedControlsInner.indexOf(event.control) === -1) {
                                event.control.selected(true);
                                this._selectedControlsInner.push(event.control);
                            }
                        }
                    }
                };
                SurfaceSelection.prototype.unselecting = function (control) {
                    if (this._focused() === control) {
                        this._setFocused(null);
                        if (this._selectedControlsInner.length === 0) {
                            this._setFocused(this._firstSelected);
                        }
                        else {
                            this._setFocused(this._selectedControlsInner[0]);
                        }
                    }
                    else {
                        this._removeFromSelection(control);
                    }
                };
                SurfaceSelection.prototype.selectionWithCtrl = function (control) {
                    if (control && control.allowMultiselect) {
                        var selectedControls = this._selectedControlsInner;
                        if (selectedControls.length === 0 || (selectedControls.length === 1 && (!selectedControls[0].allowMultiselect))) {
                            this.initialize(control);
                        }
                        else {
                            if (this._selectedControlsInner.indexOf(control) === -1) {
                                control.selected(true);
                                this._selectedControlsInner.push(control);
                            }
                            else {
                                if (this._selectedControlsInner.length > 1) {
                                    this.unselecting(control);
                                }
                            }
                        }
                    }
                };
                return SurfaceSelection;
            })();
            Internal.SurfaceSelection = SurfaceSelection;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            function deleteSelection(selection) {
                var focused = selection.focused();
                selection.selectedItems.forEach(function (item) {
                    var itemModel = item.getControlModel(), parent = itemModel.parentModel();
                    if (!item.getControlModel().getMetaData().isDeleteDeny && parent && item !== focused) {
                        parent.removeChild(itemModel);
                    }
                });
                focused.getControlModel().parentModel().removeChild(focused.getControlModel());
                selection.focused(findNextSelection(focused));
            }
            Internal.deleteSelection = deleteSelection;
            function findNextSelection(removedElement) {
                var parentSurface = removedElement.parent;
                var targetSurface = parentSurface;
                if (parentSurface) {
                    var childrenCollection = parentSurface.getChildrenCollection()();
                    var indexInCollection = childrenCollection.indexOf(removedElement);
                    if (indexInCollection === -1 && childrenCollection.length > 0) {
                        targetSurface = childrenCollection[childrenCollection.length - 1];
                    }
                    else if (childrenCollection.length > 1 && indexInCollection === childrenCollection.length - 1) {
                        targetSurface = childrenCollection[indexInCollection - 1];
                    }
                    else if (childrenCollection.length > 1 && indexInCollection === 0) {
                        targetSurface = childrenCollection[childrenCollection.length - 1];
                    }
                    else if (childrenCollection.length > 1) {
                        targetSurface = childrenCollection[childrenCollection.length - 1];
                    }
                    else if (indexInCollection === -1 && targetSurface.parent && targetSurface.parent.getChildrenCollection()().indexOf(targetSurface) === -1) {
                        targetSurface = findNextSelection(targetSurface);
                    }
                }
                return targetSurface;
            }
            Internal.findNextSelection = findNextSelection;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SnapLinesCollector = (function () {
                function SnapLinesCollector() {
                    this._verticalSnapLines = [];
                    this._horizontalSnapLines = [];
                    this._snapTargetToIgnore = null;
                }
                SnapLinesCollector.prototype._appendSnapLine = function (position, limitInf, limitSup, snapLines) {
                    var line = {
                        position: position,
                        limitInf: limitInf,
                        limSup: limitSup
                    };
                    var index = Analytics.Utils.binaryIndexOf(snapLines, line, function (a, b) { return a.position - b.position; });
                    if (index > -1) {
                        snapLines[index].limitInf = Math.min(snapLines[index].limitInf, limitInf);
                        snapLines[index].limSup = Math.max(snapLines[index].limSup, limitSup);
                    }
                    else {
                        snapLines.splice(~index, 0, line);
                    }
                };
                SnapLinesCollector.prototype._collectSnaplines = function (parent, parentAbsoluteProsition) {
                    var _this = this;
                    this._enumerateCollection(parent, parentAbsoluteProsition, function (item, itemAbsoluteRect) {
                        if (item !== _this._snapTargetToIgnore) {
                            _this._appendSnapLine(itemAbsoluteRect.left, itemAbsoluteRect.top, itemAbsoluteRect.bottom, _this._verticalSnapLines);
                            _this._appendSnapLine(itemAbsoluteRect.right, itemAbsoluteRect.top, itemAbsoluteRect.bottom, _this._verticalSnapLines);
                            _this._appendSnapLine(itemAbsoluteRect.top, itemAbsoluteRect.left, itemAbsoluteRect.right, _this._horizontalSnapLines);
                            _this._appendSnapLine(itemAbsoluteRect.bottom, itemAbsoluteRect.left, itemAbsoluteRect.right, _this._horizontalSnapLines);
                            _this._collectSnaplines(item, itemAbsoluteRect);
                        }
                    });
                };
                SnapLinesCollector.prototype._getCollection = function (parent) {
                    return parent["controls"] && parent["controls"]();
                };
                SnapLinesCollector.prototype._enumerateCollection = function (parent, parentAbsoluteProsition, callback) {
                    var collection = this._getCollection(parent);
                    if (!collection)
                        return;
                    for (var i = 0; i < collection.length; i++) {
                        var itemRect = collection[i].rect && collection[i].rect();
                        if (itemRect) {
                            callback(collection[i], {
                                top: itemRect.top + parentAbsoluteProsition.top,
                                bottom: itemRect.bottom + parentAbsoluteProsition.top,
                                left: itemRect.left + parentAbsoluteProsition.left,
                                right: itemRect.right + parentAbsoluteProsition.left
                            });
                        }
                    }
                };
                SnapLinesCollector.prototype.collectSnaplines = function (root, snapTargetToIgnore) {
                    this._snapTargetToIgnore = snapTargetToIgnore;
                    this._verticalSnapLines.splice(0);
                    this._horizontalSnapLines.splice(0);
                    this._collectSnaplines(root, { top: 0, left: 0 });
                    return {
                        vertical: this._verticalSnapLines,
                        horizontal: this._horizontalSnapLines
                    };
                };
                return SnapLinesCollector;
            })();
            Internal.SnapLinesCollector = SnapLinesCollector;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SnapLinesHelper = (function () {
                function SnapLinesHelper(surface, snapTolerance, snapLinesCollector) {
                    if (surface === void 0) { surface = null; }
                    if (snapTolerance === void 0) { snapTolerance = SnapLinesHelper.snapTolerance; }
                    if (snapLinesCollector === void 0) { snapLinesCollector = new Internal.SnapLinesCollector(); }
                    this.snapLineSurfaces = [new Internal.SnapLineSurface(), new Internal.SnapLineSurface(), new Internal.SnapLineSurface(), new Internal.SnapLineSurface()];
                    this.verticalSnapLines = [];
                    this.horizontalSnapLines = [];
                    this._surfaceContext = surface;
                    this._snapTolerance = snapTolerance;
                    this._snapLinesCollector = snapLinesCollector;
                }
                SnapLinesHelper.prototype._findClosestSnapLine = function (position, snapLines) {
                    var line = {
                        position: position,
                        limitInf: 0,
                        limSup: 0
                    };
                    var index = Analytics.Utils.binaryIndexOf(snapLines, line, function (a, b) { return a.position - b.position; });
                    var snapLineCandidate;
                    if (index > -1) {
                        snapLineCandidate = {
                            snapLine: snapLines[index],
                            distance: position - snapLines[index].position
                        };
                    }
                    else {
                        index = ~index;
                        var delta1 = snapLines[index] ? (position - snapLines[index].position) : Number.MAX_VALUE;
                        var delta2 = snapLines[index - 1] ? (position - snapLines[index - 1].position) : Number.MAX_VALUE;
                        snapLineCandidate = Math.abs(delta1) > Math.abs(delta2) ?
                            { snapLine: snapLines[index - 1], distance: delta2 } :
                            { snapLine: snapLines[index], distance: delta1 };
                    }
                    return snapLineCandidate;
                };
                SnapLinesHelper.prototype._getActiveSnapLines = function (position1, position2, snapLines) {
                    var line1 = this._findClosestSnapLine(position1, snapLines);
                    var line2 = this._findClosestSnapLine(position2, snapLines);
                    var result = {
                        lines: [],
                        distance: 0
                    };
                    if (Math.abs(line1.distance - line2.distance) >= 1) {
                        var line = Math.abs(line1.distance) < Math.abs(line2.distance) ? line1 : line2;
                        if (Math.abs(line.distance) <= this._snapTolerance) {
                            result.lines = [line];
                            result.distance = line.distance;
                        }
                    }
                    else if (Math.abs(line1.distance) <= this._snapTolerance) {
                        result.lines = [line1, line2];
                        result.distance = line1.distance;
                    }
                    return result;
                };
                SnapLinesHelper.prototype.updateSnapLines = function (snapTargetToIgnore) {
                    if (snapTargetToIgnore === void 0) { snapTargetToIgnore = null; }
                    this.verticalSnapLines.splice(0);
                    this.horizontalSnapLines.splice(0);
                    var result = this._snapLinesCollector.collectSnaplines(this._surfaceContext(), snapTargetToIgnore);
                    this.verticalSnapLines.push.apply(this.verticalSnapLines, result.vertical);
                    this.horizontalSnapLines.push.apply(this.horizontalSnapLines, result.horizontal);
                };
                SnapLinesHelper.prototype.deactivateSnapLines = function () {
                    this.snapLineSurfaces[0].reset();
                    this.snapLineSurfaces[1].reset();
                    this.snapLineSurfaces[2].reset();
                    this.snapLineSurfaces[3].reset();
                };
                SnapLinesHelper.prototype.activateSnapLines = function (position) {
                    var vertical = this._getActiveSnapLines(position.left, position.right, this.verticalSnapLines);
                    var horizontal = this._getActiveSnapLines(position.top, position.bottom, this.horizontalSnapLines);
                    for (var i = 0; i < 2; i++) {
                        var line = vertical.lines[i];
                        if (!line) {
                            this.snapLineSurfaces[i].reset();
                        }
                        else {
                            var top = Math.min(line.snapLine.limitInf, position.top);
                            var bottom = Math.max(line.snapLine.limSup, position.bottom);
                            if (position.top < line.snapLine.limitInf) {
                                top -= horizontal.distance;
                            }
                            if (position.bottom > line.snapLine.limSup) {
                                bottom -= horizontal.distance;
                            }
                            this.snapLineSurfaces[i].updatePosition({
                                top: top,
                                left: line.snapLine.position,
                                height: bottom - top,
                                width: 1
                            });
                        }
                    }
                    for (var i = 0; i < 2; i++) {
                        var line = horizontal.lines[i];
                        if (!line) {
                            this.snapLineSurfaces[i + 2].reset();
                        }
                        else {
                            var left = Math.min(line.snapLine.limitInf, position.left);
                            var right = Math.max(line.snapLine.limSup, position.right);
                            if (position.left < line.snapLine.limitInf) {
                                left -= vertical.distance;
                            }
                            if (position.right > line.snapLine.limSup) {
                                right -= vertical.distance;
                            }
                            this.snapLineSurfaces[i + 2].updatePosition({
                                top: line.snapLine.position,
                                left: left,
                                width: right - left,
                                height: 1
                            });
                        }
                    }
                    return {
                        left: vertical.distance,
                        top: horizontal.distance
                    };
                };
                SnapLinesHelper.prototype.snapPosition = function (position, horizontal) {
                    var line = this._findClosestSnapLine(position, horizontal ? this.horizontalSnapLines : this.verticalSnapLines);
                    return (line && Math.abs(line.distance) <= this._snapTolerance) ? (position - line.distance) : position;
                };
                SnapLinesHelper.snapTolerance = 10;
                return SnapLinesHelper;
            })();
            Internal.SnapLinesHelper = SnapLinesHelper;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var SnapLineSurface = (function () {
                function SnapLineSurface() {
                    this._position = ko.observable(SnapLineSurface._blankPosition);
                }
                SnapLineSurface.prototype.transform = function () {
                    var position = this._position();
                    return "matrix(" + position.width + ", 0, 0, " + position.height + ", " + position.left + ", " + position.top + ")";
                };
                SnapLineSurface.prototype.updatePosition = function (position) {
                    this._position(position);
                };
                SnapLineSurface.prototype.reset = function () {
                    this.updatePosition(SnapLineSurface._blankPosition);
                };
                SnapLineSurface._blankPosition = { top: 0, left: 0, width: 0, height: 0, };
                return SnapLineSurface;
            })();
            Internal.SnapLineSurface = SnapLineSurface;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        Analytics.ActionId = {
            Cut: "dxd-cut",
            Copy: "dxd-copy",
            Paste: "dxd-paste",
            Delete: "dxd-delete",
            Undo: "dxd-undo",
            Redo: "dxd-redo",
            ZoomOut: "dxd-zoom-out",
            ZoomSelector: "dxd-zoom-selector",
            ZoomIn: "dxd-zoom-in",
        };
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            var ActionListsBase = (function () {
                function ActionListsBase(enabled) {
                    this.toolbarItems = [];
                    this.enabled = enabled || ko.observable(true);
                }
                ActionListsBase.prototype.processShortcut = function (actions, e) {
                    for (var i = 0; i < actions.length; i++) {
                        if (actions[i].hotKey && (actions[i].disabled && !actions[i].disabled() || !actions[i].disabled) && ($.isFunction(actions[i].visible) ? actions[i].visible() : actions[i].visible)) {
                            if (actions[i].hotKey.ctrlKey === e.ctrlKey && actions[i].hotKey.keyCode === e.keyCode) {
                                actions[i].clickAction();
                                e.preventDefault();
                            }
                        }
                    }
                };
                ActionListsBase.prototype.shouldIgnoreProcessing = function (e) {
                    if (e.altKey || !this.enabled.peek())
                        return true;
                    var activeElement = $(document.activeElement);
                    if (activeElement.is("textarea") || activeElement.is(":input") && (['password', 'text', 'number'].indexOf(activeElement.attr("type")) != -1)) {
                        return true;
                    }
                    return false;
                };
                return ActionListsBase;
            })();
            Internal.ActionListsBase = ActionListsBase;
            var ActionLists = (function (_super) {
                __extends(ActionLists, _super);
                function ActionLists(surfaceContext, selection, undoEngine, customizeActions, enabled, copyPasteStrategy) {
                    var _this = this;
                    _super.call(this, enabled);
                    this.menuItems = [];
                    var copyPasteHandler = new Internal.CopyPasteHandler(selection, copyPasteStrategy), actions = [];
                    var zoomStep = ko.observable(0.01);
                    if (selection) {
                        var selectionControlsLocked = ko.computed(function () {
                            return selection.selectedItems.some(function (item) { return item.locked; });
                        });
                        this._keyboardHelper = new Internal.KeyboardHelper(selection, undoEngine);
                        actions.push({
                            id: Analytics.ActionId.Cut,
                            text: "Cut",
                            displayText: function () { return Analytics.getLocalization("Cut", "ReportStringId.UD_TTip_EditCut"); },
                            imageClassName: "dxrd-image-cut",
                            disabled: ko.pureComputed(function () {
                                return !surfaceContext() || !copyPasteHandler.canCopy() || selectionControlsLocked();
                            }),
                            visible: true,
                            clickAction: function () {
                                undoEngine().start();
                                copyPasteHandler.cut();
                                undoEngine().end();
                            },
                            hotKey: { ctrlKey: true, keyCode: "X".charCodeAt(0) }
                        });
                        actions.push({
                            id: Analytics.ActionId.Copy,
                            text: "Copy",
                            displayText: function () { return Analytics.getLocalization("Copy", "ReportStringId.Cmd_Copy"); },
                            imageClassName: "dxrd-image-copy",
                            disabled: ko.pureComputed(function () {
                                return !surfaceContext() || !copyPasteHandler.canCopy() || selectionControlsLocked();
                            }),
                            visible: true,
                            clickAction: function () {
                                copyPasteHandler.copy();
                            },
                            hotKey: { ctrlKey: true, keyCode: "C".charCodeAt(0) }
                        });
                        actions.push({
                            id: Analytics.ActionId.Paste,
                            text: "Paste",
                            displayText: function () { return Analytics.getLocalization("Paste", "ReportStringId.Cmd_Paste"); },
                            imageClassName: "dxrd-image-paste",
                            disabled: ko.pureComputed(function () {
                                return !surfaceContext() || !copyPasteHandler.canPaste() || selectionControlsLocked();
                            }),
                            visible: true,
                            clickAction: function () {
                                undoEngine().start();
                                copyPasteHandler.paste();
                                undoEngine().end();
                            },
                            hotKey: { ctrlKey: true, keyCode: "V".charCodeAt(0) }
                        });
                        actions.push({
                            id: Analytics.ActionId.Delete,
                            text: "Delete",
                            displayText: function () { return Analytics.getLocalization("Delete", "ReportStringId.Cmd_Delete"); },
                            imageClassName: "dxrd-image-delete",
                            disabled: ko.pureComputed(function () {
                                if (selection.focused()) {
                                    return selection.focused().getControlModel().getMetaData().isDeleteDeny || selectionControlsLocked();
                                }
                                else {
                                    return true;
                                }
                            }),
                            visible: true,
                            hotKey: { ctrlKey: false, keyCode: 46 },
                            clickAction: function () {
                                undoEngine().start();
                                Internal.deleteSelection(selection);
                                undoEngine().end();
                            }
                        });
                    }
                    actions.push({
                        id: Analytics.ActionId.Undo,
                        text: "Undo",
                        displayText: function () { return Analytics.getLocalization("Undo", "ReportStringId.UD_Capt_Undo"); },
                        imageClassName: "dxrd-image-undo",
                        disabled: ko.pureComputed(function () { return !surfaceContext() || !undoEngine() || (undoEngine() && !undoEngine().undoEnabled()) || (selection && selectionControlsLocked()); }),
                        visible: true,
                        clickAction: function () {
                            undoEngine().undo();
                        },
                        hotKey: { ctrlKey: true, keyCode: "Z".charCodeAt(0) },
                        hasSeparator: true
                    });
                    actions.push({
                        id: Analytics.ActionId.Redo,
                        text: "Redo",
                        displayText: function () { return Analytics.getLocalization("Redo", "ReportStringId.UD_Capt_Redo"); },
                        imageClassName: "dxrd-image-redo",
                        disabled: ko.pureComputed(function () { return !surfaceContext() || !undoEngine() || (undoEngine() && !undoEngine().redoEnabled()) || (selection && selectionControlsLocked()); }),
                        visible: true,
                        clickAction: function () {
                            undoEngine().redo();
                        },
                        hotKey: { ctrlKey: true, keyCode: "Y".charCodeAt(0) }
                    });
                    actions.push({
                        id: Analytics.ActionId.ZoomOut,
                        text: "Zoom Out",
                        displayText: function () { return Analytics.getLocalization("Zoom Out", "ReportStringId.UD_Capt_ZoomOut"); },
                        imageClassName: "dxrd-image-zoomout",
                        disabled: ko.pureComputed(function () {
                            return !surfaceContext();
                        }),
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: 109 },
                        zoomStep: zoomStep,
                        clickAction: function () {
                            surfaceContext().zoom(Math.max(surfaceContext().zoom() - zoomStep(), 0.01));
                        },
                        hasSeparator: true
                    });
                    actions.push({
                        id: Analytics.ActionId.ZoomSelector,
                        text: "Zoom 100%",
                        displayText: function () { return Analytics.getLocalization("Zoom 100%"); },
                        imageClassName: "dxrd-image-zoom",
                        disabled: ko.pureComputed(function () {
                            return !surfaceContext();
                        }),
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: 187 },
                        clickAction: function () {
                            surfaceContext().zoom(1);
                        },
                        templateName: "dxrd-zoom-select-template",
                        zoomLevels: ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]),
                        zoom: ko.pureComputed({
                            read: function () { return surfaceContext() && surfaceContext().zoom(); },
                            write: function (val) { surfaceContext().zoom(val); }
                        })
                    });
                    actions.push({
                        id: Analytics.ActionId.ZoomIn,
                        text: "Zoom In",
                        displayText: function () { return Analytics.getLocalization("Zoom In", "ReportStringId.UD_Capt_ZoomIn"); },
                        imageClassName: "dxrd-image-zoomin",
                        disabled: ko.pureComputed(function () {
                            return !surfaceContext();
                        }),
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: 107 },
                        zoomStep: zoomStep,
                        clickAction: function () {
                            surfaceContext().zoom(surfaceContext().zoom() + zoomStep());
                        }
                    });
                    if (customizeActions) {
                        customizeActions(actions);
                    }
                    actions.forEach(function (action) {
                        _this._registerAction(action["container"] === "menu" ? _this.menuItems : ko.unwrap(_this.toolbarItems), action);
                    });
                }
                ActionLists.prototype._registerAction = function (container, action) {
                    if (action["index"]) {
                        container.splice(action["index"], 0, action);
                    }
                    else {
                        container.push(action);
                    }
                };
                ActionLists.prototype.processShortcut = function (actions, e) {
                    if (this.shouldIgnoreProcessing(e)) {
                        return;
                    }
                    if (!this._keyboardHelper.processShortcut(e)) {
                        _super.prototype.processShortcut.call(this, actions, e);
                    }
                    else {
                        e.preventDefault();
                    }
                };
                return ActionLists;
            })(ActionListsBase);
            Internal.ActionLists = ActionLists;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            Internal.copyPasteStrategy = {
                createChild: function (pasteTarget, info) {
                    return pasteTarget.createChild(info);
                },
                calculateDelta: function (selection, pasteTargetSurface, minPoint) {
                    return {
                        x: selection.rect().left - minPoint.x(),
                        y: selection.rect().top - minPoint.y()
                    };
                }
            };
            var CopyPasteHandler = (function () {
                function CopyPasteHandler(selectionProvider, _copyPasteStrategy) {
                    var _this = this;
                    if (_copyPasteStrategy === void 0) { _copyPasteStrategy = Internal.copyPasteStrategy; }
                    this._copyPasteStrategy = _copyPasteStrategy;
                    this._copyInfo = ko.observable(null);
                    this.hasPasteInfo = ko.pureComputed(function () { return _this._copyInfo() !== null; });
                    this._selectionProvider = selectionProvider;
                }
                CopyPasteHandler.prototype.canCopy = function () {
                    return this._selectionProvider.focused() !== null && !this._selectionProvider.focused().getControlModel().getMetaData().isCopyDeny;
                };
                CopyPasteHandler.prototype.canPaste = function () {
                    var pasteTargetSurface = this._selectionProvider.focused();
                    return pasteTargetSurface !== null
                        && this.hasPasteInfo()
                        && pasteTargetSurface.canDrop()
                        && pasteTargetSurface.getControlModel().getMetaData().isContainer;
                };
                CopyPasteHandler.prototype.copy = function () {
                    if (this.canCopy()) {
                        var serializer = new Analytics.Utils.ModelSerializer(), copyInfo = {
                            focused: this._selectionProvider.focused(),
                            objects: $.map(this._selectionProvider.selectedItems, function (item) {
                                return serializer.serialize(item.getControlModel());
                            })
                        };
                        this._copyInfo(copyInfo);
                    }
                };
                CopyPasteHandler.prototype.cut = function () {
                    var serializer = new Analytics.Utils.ModelSerializer(), cutInfo = {
                        focused: this._selectionProvider.focused(),
                        objects: $.map(this._selectionProvider.selectedItems, function (item) {
                            item.getControlModel().parentModel().removeChild(item.getControlModel());
                            return serializer.serialize(item.getControlModel());
                        })
                    };
                    this._copyInfo(cutInfo);
                };
                CopyPasteHandler.prototype.paste = function () {
                    var _this = this;
                    if (this.canPaste()) {
                        var pasteTargetSurface = this._selectionProvider.focused(), pasteTarget = pasteTargetSurface.getControlModel(), newSelection = [];
                        if (pasteTargetSurface === this._copyInfo().focused) {
                            pasteTargetSurface = pasteTargetSurface.parent;
                            pasteTarget = pasteTargetSurface.getControlModel();
                        }
                        if (!pasteTarget.getMetaData().isContainer) {
                            pasteTargetSurface = pasteTargetSurface.parent;
                            pasteTarget = pasteTargetSurface.getControlModel();
                        }
                        var minPoint = new Analytics.Point(Number.MAX_VALUE, Number.MAX_VALUE), maxPoint = new Analytics.Point(-1, -1);
                        for (var i = 0; i < this._copyInfo().objects.length; i++) {
                            var newControl = this._copyPasteStrategy.createChild(pasteTarget, this._copyInfo().objects[i]);
                            var newControlSurface = Internal.findSurface(newControl);
                            if (!newControlSurface)
                                continue;
                            var posMin = new Analytics.Point(newControlSurface.rect().left, newControlSurface.rect().top);
                            var posMax = new Analytics.Point(newControlSurface.rect().left + newControlSurface.rect().width, newControlSurface.rect().top + newControlSurface.rect().height);
                            if (minPoint.x() >= posMin.x())
                                minPoint.x(posMin.x());
                            if (maxPoint.x() <= posMax.x())
                                maxPoint.x(posMax.x());
                            if (minPoint.y() >= posMin.y())
                                minPoint.y(posMin.y());
                            if (maxPoint.y() <= posMax.y())
                                maxPoint.y(posMax.y());
                            newSelection.push(newControlSurface);
                        }
                        var newOriginPoint = new Analytics.Point(((pasteTargetSurface.rect().width - pasteTargetSurface["_context"].margins.right()) / 2) - ((maxPoint.x() - minPoint.x()) / 2) + (pasteTargetSurface["rtlLayout"]() ? pasteTargetSurface["_context"].margins.right() : 0), (pasteTargetSurface.rect().height / 2) - ((maxPoint.y() - minPoint.y()) / 2));
                        for (var i = 0; i < newSelection.length; i++) {
                            var delta = this._copyPasteStrategy.calculateDelta(newSelection[i], pasteTargetSurface, minPoint);
                            newSelection[i].rect({ left: newOriginPoint.x() + delta.x, top: newOriginPoint.y() + delta.y });
                        }
                        this._selectionProvider.initialize();
                        newSelection.forEach(function (newControlSurface) {
                            _this._selectionProvider.selecting({ control: newControlSurface, cancel: false });
                        });
                    }
                };
                return CopyPasteHandler;
            })();
            Internal.CopyPasteHandler = CopyPasteHandler;
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var TabPanel = (function (_super) {
            __extends(TabPanel, _super);
            function TabPanel(tabs, autoSelectTab, rtl) {
                var _this = this;
                if (autoSelectTab === void 0) { autoSelectTab = false; }
                if (rtl === void 0) { rtl = false; }
                _super.call(this);
                this.tabs = [];
                this.collapsed = ko.observable(false);
                this.toggleCollapsedText = ko.pureComputed(function () {
                    var actionString = _this.collapsed() ? "Open" : "Collapse";
                    return DevExpress.Analytics.getLocalization(actionString, "ASPxReportsStringId.SidePanel_" + actionString);
                });
                var _self = this;
                this.tabs = tabs;
                this._disposables.push(ko.computed(function () {
                    var visibleTabs = tabs.filter(function (tab) { return tab.visible(); });
                    if (visibleTabs.length !== 0) {
                        if (visibleTabs.filter(function (tab) { return tab.active.peek(); }).length === 0) {
                            visibleTabs[0].active(true);
                            if (autoSelectTab) {
                                _this.collapsed(true);
                            }
                        }
                    }
                    else {
                        _this.collapsed(true);
                    }
                }));
                if (autoSelectTab) {
                    this.tabs.forEach(function (tab) {
                        _this._disposables.push(tab.active.subscribe(function (newVal) {
                            if (newVal) {
                                _this.selectTab({ model: tab });
                            }
                        }));
                    });
                }
                this.selectTab = function (e) {
                    var selectedTab = e.model;
                    if (!selectedTab.disabled()) {
                        _this.tabs.forEach(function (tab) {
                            tab.active(tab === selectedTab);
                        });
                        _this.collapsed(false);
                    }
                };
                var _width = ko.observable(340);
                this.width = ko.pureComputed({
                    read: function () { return _this.collapsed() ? 0 : _width(); },
                    write: function (newWidth) { _width(newWidth); }
                });
                this.headerWidth = ko.pureComputed(function () { return 50 + (_this.collapsed() ? 0 : _this.width()); });
                this.getResizableOptions = function ($element, panelOffset, minWidth) {
                    if (!_this._resizableOptions || _this._resizableOptions.$element !== $element) {
                        _this._resizableOptions = {
                            starting: function () {
                                $($element).css(rtl ? 'right' : 'left', '');
                            },
                            stopped: $.noop,
                            stop: $.noop,
                            handles: rtl ? 'e' : 'w',
                            resize: function () {
                                $($element).css({ left: rtl ? panelOffset : '', right: rtl ? '' : panelOffset });
                                _self.width($($element).width());
                            },
                            disabled: _self.collapsed,
                            zoom: 1,
                            minWidth: minWidth,
                            maxWidth: 1000,
                            $element: $element
                        };
                    }
                    ;
                    return _this._resizableOptions;
                };
                this.toggleCollapsedImageClassName = ko.pureComputed(function () { return _this.collapsed() ? "dxrd-image-propertygrid-expand" : "dxrd-image-propertygrid-collapse"; });
            }
            return TabPanel;
        })(Analytics.Utils.Disposable);
        Analytics.TabPanel = TabPanel;
        var TabInfo = (function (_super) {
            __extends(TabInfo, _super);
            function TabInfo(text, template, model, localizationId, imageBaseName, computedVisible, computedDisabled) {
                var _this = this;
                _super.call(this);
                this.active = ko.observable(false);
                this.visible = ko.observable();
                this.disabled = ko.observable();
                imageBaseName = imageBaseName || text.toLowerCase();
                this._text = text;
                this._localizationId = localizationId;
                this.imageClassName = ko.pureComputed(function () {
                    return "dxrd-image-" + imageBaseName + (_this.active() ? "-active" : "-inactive");
                });
                this.template = template;
                this.visible = ko.pureComputed(function () { return computedVisible !== undefined ? computedVisible() : true; });
                this.disabled = ko.pureComputed(function () { return computedDisabled !== undefined ? computedDisabled() : false; });
                this._disposables.push(this.visible.subscribe(function (visibility) {
                    if (!visibility) {
                        _this.active(false);
                    }
                }));
                this.model = model;
            }
            Object.defineProperty(TabInfo.prototype, "text", {
                get: function () {
                    return Analytics.getLocalization(this._text, this._localizationId);
                },
                enumerable: true,
                configurable: true
            });
            return TabInfo;
        })(Analytics.Utils.Disposable);
        Analytics.TabInfo = TabInfo;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var ToolboxItem = (function () {
            function ToolboxItem(info) {
                this.disabled = ko.observable(false);
                this.info = info;
            }
            Object.defineProperty(ToolboxItem.prototype, "type", {
                get: function () {
                    return Analytics.Internal.getTypeNameFromFullName(this.info["@ControlType"]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToolboxItem.prototype, "imageClassName", {
                get: function () {
                    return [Analytics.Internal.getImageClassName(this.type), this.disabled() ? "dxrd-disabled-button" : ""].join(' ');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToolboxItem.prototype, "index", {
                get: function () {
                    return this.info.index;
                },
                enumerable: true,
                configurable: true
            });
            return ToolboxItem;
        })();
        Analytics.ToolboxItem = ToolboxItem;
        function getToolboxItems(controlsMap) {
            var toolboxItems = [];
            for (var controlType in controlsMap) {
                if (!controlsMap[controlType].nonToolboxItem) {
                    var item = {
                        "@ControlType": controlType,
                        index: controlsMap[controlType].toolboxIndex || 0,
                        canDrop: controlsMap[controlType].canDrop
                    };
                    if (controlsMap[controlType].size) {
                        item["size"] = controlsMap[controlType].size;
                    }
                    if (controlsMap[controlType].defaultVal) {
                        for (var name in controlsMap[controlType].defaultVal) {
                            item[name] = controlsMap[controlType].defaultVal[name];
                        }
                        ;
                    }
                    toolboxItems.push(new ToolboxItem(item));
                }
            }
            return toolboxItems.sort(function (item1, item2) { return item1.index - item2.index; });
        }
        Analytics.getToolboxItems = getToolboxItems;
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function createObservableReverseArrayMapCollection(elementModels, target, createItem) {
                var array = target();
                elementModels.peek().forEach(function (item) {
                    var surface = createItem(item);
                    array.splice(0, 0, surface);
                });
                target.valueHasMutated();
                elementModels.subscribe(function (args) {
                    var unwrapedTarget = target();
                    var targetLength = unwrapedTarget.length;
                    args.forEach(function (changeSet) {
                        if (changeSet.status === "deleted") {
                            unwrapedTarget.splice(unwrapedTarget.indexOf(changeSet.value.surface), 1);
                        }
                    });
                    args.forEach(function (changeSet) {
                        if (changeSet.status === "added") {
                            unwrapedTarget.splice(targetLength - changeSet.index, 0, createItem(changeSet.value));
                        }
                    });
                    target.valueHasMutated();
                }, null, "arrayChange");
            }
            Utils.createObservableReverseArrayMapCollection = createObservableReverseArrayMapCollection;
            function createObservableArrayMapCollection(elementModels, target, createItem) {
                var array = target();
                elementModels.peek().forEach(function (item) {
                    var surface = createItem(item);
                    array.push(surface);
                });
                target.valueHasMutated();
                elementModels.subscribe(function (args) {
                    var startIndex = target().length, deleteCount = 0, valuesToAdd = [];
                    args.forEach(function (changeSet) {
                        if (changeSet.status === "deleted") {
                            deleteCount++;
                            if (changeSet.index < startIndex) {
                                startIndex = changeSet.index;
                            }
                        }
                    });
                    args.forEach(function (changeSet) {
                        if (changeSet.status === "added") {
                            if (changeSet.index < startIndex) {
                                startIndex = changeSet.index;
                            }
                            valuesToAdd.push(createItem(changeSet.value));
                        }
                    });
                    target.splice.apply(target, [startIndex, deleteCount].concat(valuesToAdd));
                }, null, "arrayChange");
            }
            Utils.createObservableArrayMapCollection = createObservableArrayMapCollection;
            function deserializeChildArray(model, parent, creator) {
                var result = [];
                Utils.getPropertyValues(model).forEach(function (item) {
                    var createdItem = creator(item);
                    result.push(createdItem);
                });
                return Utils.knockoutArrayWrapper(result, function (array, event) {
                    if (event === "beforeChange") {
                        return;
                    }
                    if (event === "arrayChange") {
                        for (var i = 0; i < array.length; i++) {
                            array[i].value.parentModel(parent);
                        }
                    }
                    else {
                        for (var i = 0; i < array.length; i++) {
                            array[i].parentModel(parent);
                        }
                    }
                });
            }
            Utils.deserializeChildArray = deserializeChildArray;
            function getFirstItemByPropertyValue(array, propertyName, propertyValue, fromIndex) {
                var fromIndex = fromIndex || 0;
                for (var i = fromIndex; i < array.length; i++) {
                    var value = ko.isObservable(array[i][propertyName]) ? array[i][propertyName].peek() : array[i][propertyName];
                    if (value === propertyValue) {
                        return array[i];
                    }
                }
                return null;
            }
            Utils.getFirstItemByPropertyValue = getFirstItemByPropertyValue;
            function findFirstItemMatchesCondition(array, predicate) {
                for (var i = 0; i < array.length; i++) {
                    if (predicate(array[i])) {
                        return array[i];
                    }
                }
                return null;
            }
            Utils.findFirstItemMatchesCondition = findFirstItemMatchesCondition;
            Utils.find = findFirstItemMatchesCondition;
            function binaryIndexOf(ar, el, compare) {
                var m = 0;
                var n = ar.length - 1;
                while (m <= n) {
                    var k = (n + m) >> 1;
                    var cmp = compare(el, ar[k]);
                    if (cmp > 0) {
                        m = k + 1;
                    }
                    else if (cmp < 0) {
                        n = k - 1;
                    }
                    else {
                        return k;
                    }
                }
                return ~m;
            }
            Utils.binaryIndexOf = binaryIndexOf;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var ControlsFactory = (function () {
                function ControlsFactory() {
                    this.controlsMap = {};
                }
                ControlsFactory.prototype.getControlInfo = function (controlType) {
                    var info = this.controlsMap[controlType] || null;
                    return info;
                };
                ControlsFactory.prototype.getControlType = function (model) {
                    var controlType = Analytics.Internal.getTypeNameFromFullName(model["@ControlType"] || "");
                    return this.controlsMap[controlType] ? controlType : "Unknown";
                };
                ControlsFactory.prototype.createControl = function (model, parent, serializer) {
                    var controlType = this.getControlType(model);
                    return new (this.controlsMap[controlType] && this.controlsMap[controlType].type || Analytics.ElementViewModel)(model, parent, serializer);
                };
                ControlsFactory.prototype.registerControl = function (typeName, metadata) {
                    if (metadata.isToolboxItem !== undefined) {
                        metadata.nonToolboxItem = !metadata.isToolboxItem;
                    }
                    Object.defineProperty(metadata, "isToolboxItem", {
                        get: function () {
                            return !metadata.nonToolboxItem;
                        },
                        set: function (newVal) {
                            metadata.nonToolboxItem = !newVal;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    this.controlsMap[typeName] = metadata;
                    this.controlsMap[typeName].info = $.extend(true, [], metadata.info);
                };
                ControlsFactory.prototype._getPropertyInfo = function (info, path, position) {
                    var propertyInfo = info.filter(function (x) { return x.displayName === path[position]; })[0];
                    if (position === path.length - 1) {
                        return propertyInfo || null;
                    }
                    else {
                        if (propertyInfo.info) {
                            return this._getPropertyInfo(propertyInfo.info, path, position + 1);
                        }
                        else if (propertyInfo.from) {
                            var object = null;
                            try {
                                object = propertyInfo.from({});
                            }
                            catch (e) {
                                return null;
                            }
                            var newInfo = object.getInfo && object.getInfo();
                            if (newInfo) {
                                return this._getPropertyInfo(newInfo, path, position + 1);
                            }
                        }
                    }
                    return null;
                };
                ControlsFactory.prototype.getPropertyInfo = function (controlType, path) {
                    var properties = path;
                    if (!$.isArray(path)) {
                        properties = path.split('.');
                    }
                    return this._getPropertyInfo(this.controlsMap[controlType].info, properties, 0);
                };
                return ControlsFactory;
            })();
            Utils.ControlsFactory = ControlsFactory;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            var FieldListProvider = (function () {
                function FieldListProvider(fieldListCallback, rootItems, extenders) {
                    var _this = this;
                    this._extenders = extenders;
                    this.getItems = function (pathRequest) {
                        var result = $.Deferred();
                        var items = [];
                        if (_this._beforeFieldListCallback(pathRequest, items)) {
                            result.resolve(items);
                        }
                        else if (rootItems && !pathRequest.fullPath) {
                            items.push.apply(items, $.map(rootItems(), function (item) {
                                return { name: item.id || item.ref, displayName: item.name, isList: true, specifics: item.specifics || "ListSource", dragData: { noDragable: false } };
                            }));
                            _this._afterFieldListCallBack(pathRequest, items);
                            result.resolve(items);
                        }
                        else {
                            _this._patchRequest(pathRequest, rootItems);
                            fieldListCallback(pathRequest).done(function (fields) {
                                items.push.apply(items, fields);
                                _this._afterFieldListCallBack(pathRequest, items);
                                result.resolve(items);
                            });
                        }
                        return result.promise();
                    };
                }
                FieldListProvider.prototype._patchRequest = function (request, dataSources) {
                    if (!dataSources) {
                        return;
                    }
                    var dss = dataSources.peek();
                    for (var i = 0; i < dss.length; i++) {
                        if (dss[i].id === request.id && !!request.id) {
                            request.ref = undefined;
                            return;
                        }
                        if (dss[i].ref === request.ref && !!request.ref) {
                            request.id = undefined;
                            return;
                        }
                    }
                };
                FieldListProvider.prototype._beforeFieldListCallback = function (request, items) {
                    return !!this._extenders && this._extenders.some(function (extender) { return extender.beforeItemsFilled(request, items); });
                };
                FieldListProvider.prototype._afterFieldListCallBack = function (request, items) {
                    this._extenders && this._extenders.forEach(function (extender) { extender.afterItemsFilled && extender.afterItemsFilled(request, items); });
                };
                return FieldListProvider;
            })();
            Utils.FieldListProvider = FieldListProvider;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            Utils.NotifyType = {
                info: "info",
                warning: "warning",
                error: "error",
                success: "success"
            };
            var wrappedConsole = (function (console) {
                var getWrappedMethod = function (methodName) { return (function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (console && $.isFunction(console[methodName])) {
                        console[methodName].apply(console, arguments);
                    }
                }); };
                return {
                    info: getWrappedMethod("info"),
                    warn: getWrappedMethod("warn"),
                    error: getWrappedMethod("error")
                };
            })(window.console);
            function NotifyAboutWarning(msg, showForUser) {
                if (showForUser === void 0) { showForUser = false; }
                if (showForUser) {
                    ShowMessage(msg);
                }
                if (Utils.DEBUG) {
                    throw new Error(msg);
                }
                else {
                    wrappedConsole.warn(msg);
                }
            }
            Utils.NotifyAboutWarning = NotifyAboutWarning;
            function getErrorMessage(jqXHR) {
                return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.error ? jqXHR.responseJSON.error : '';
            }
            Utils.getErrorMessage = getErrorMessage;
            function ShowMessage(msg, type, displayTime, debugInfo) {
                if (type === void 0) { type = "error"; }
                DevExpress.ui.notify({
                    message: msg,
                    type: type,
                    position: { of: Analytics.Internal.chooseBetterPositionOf(document.documentElement, $(".dx-designer")[0]), my: "bottom", at: "bottom", offset: "0 -10" },
                    targetContainer: $(".dx-designer")[0],
                    closeOnOutsideClick: true,
                    closeOnSwipe: false,
                    displayTime: displayTime || (type === "error" ? 60000 : 3000)
                });
            }
            Utils.ShowMessage = ShowMessage;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function floatFromModel(val) {
                return ko.observable(val === undefined || val === null ? null : parseFloat(val));
            }
            Utils.floatFromModel = floatFromModel;
            function fromEnum(value) {
                var shotEnumValueKey = Analytics.Internal.getShortTypeName(value);
                var valuesArrayItem = this.valuesArray && this.valuesArray.filter(function (item) { return item.value == shotEnumValueKey; })[0];
                return ko.observable((this.values && this.values[shotEnumValueKey] !== undefined || valuesArrayItem) ? shotEnumValueKey : value);
            }
            Utils.fromEnum = fromEnum;
            function parseBool(val) {
                return ko.observable(val !== void 0 ? String(val).toLowerCase() === "true" : val);
            }
            Utils.parseBool = parseBool;
            function colorFromString(val) {
                var color = (val || "").split(",");
                var result = ko.observable(val);
                if (color.length > 1) {
                    var alpha = (parseFloat(color[0]) / 255).toFixed(2);
                    color.shift();
                    color.push(alpha.toString());
                    result = ko.observable("rgba(" + color.join(", ") + ")");
                }
                return result;
            }
            Utils.colorFromString = colorFromString;
            function saveAsInt(val) {
                return Math.round(val).toString();
            }
            Utils.saveAsInt = saveAsInt;
            function colorToString(val) {
                var color = (val || "").split(", ");
                var result = val;
                if (color.length > 1) {
                    var alpha = Math.round(parseFloat(color[3]) * 255);
                    color.pop();
                    color[0] = color[0].split("(")[1];
                    result = alpha.toString() + "," + color.join(",");
                }
                return result;
            }
            Utils.colorToString = colorToString;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function unitsToPixel(val, measureUnit, zoom) {
                if (zoom === void 0) { zoom = 1; }
                var result;
                if (measureUnit === "Test" || measureUnit === "Pixels") {
                    result = 1 * val;
                }
                else if (measureUnit === "TenthsOfAMillimeter") {
                    result = val * 3.78 / 10;
                }
                else {
                    result = val * 96 / 100;
                }
                result = result * (zoom);
                return Math.floor(result * 100) / 100;
            }
            Utils.unitsToPixel = unitsToPixel;
            function pixelToUnits(val, measureUnit, zoom) {
                var result;
                if (measureUnit === "Test" || measureUnit === "Pixels") {
                    result = 1 * val;
                }
                else if (measureUnit === "TenthsOfAMillimeter") {
                    result = val / 3.78 * 10;
                }
                else {
                    result = val / 96 * 100;
                }
                result = result / (zoom);
                return Math.floor(result * 100) / 100;
            }
            Utils.pixelToUnits = pixelToUnits;
            function createUnitProperty(model, target, propertyName, property, measureUnit, zoom) {
                var lastVal = 0;
                target[propertyName] = ko.pureComputed({
                    read: function () {
                        var val = property(model)(), newVal = unitsToPixel(val, measureUnit.peek(), zoom());
                        if (Math.abs(newVal - lastVal) > 0.2) {
                            lastVal = newVal;
                            return lastVal;
                        }
                        return lastVal;
                    },
                    write: function (val) {
                        lastVal = val;
                        var result = pixelToUnits(val, measureUnit.peek(), zoom());
                        property(model)(result);
                    }
                });
            }
            Utils.createUnitProperty = createUnitProperty;
            function createUnitProperties(model, target, properties, measureUnit, zoom) {
                if (!properties)
                    return;
                for (var propertyName in properties) {
                    createUnitProperty(model, target, propertyName, properties[propertyName], measureUnit, zoom);
                }
            }
            Utils.createUnitProperties = createUnitProperties;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function copyObservables(from, to) {
                for (var name in (from || {})) {
                    if (ko.isObservable(from[name])) {
                        to[name](from[name]());
                    }
                    else if (!$.isFunction(from[name])) {
                        copyObservables(from[name], to[name]);
                    }
                }
                ;
            }
            Utils.copyObservables = copyObservables;
            function compareObjects(a, b) {
                var result = a && b && !(a instanceof Array) && !(b instanceof Array);
                result = result && (Object.getOwnPropertyNames(a).length === Object.getOwnPropertyNames(b).length);
                if (result) {
                    for (var name in (a || {})) {
                        if (name.indexOf("_") !== 0 && (typeof a[name] !== "function" || ko.isObservable(a[name]))) {
                            if (ko.isObservable(a[name])) {
                                result = ko.unwrap(a[name]) === ko.unwrap(b[name]);
                            }
                            else if (a[name] instanceof Array) {
                                if ((b[name] instanceof Array) && a[name].length === b[name].length) {
                                    for (var i = 0; i < a[name].length; i++) {
                                        result = compareObjects(a[name][i], b[name][i]);
                                        if (result === false)
                                            break;
                                    }
                                }
                                else {
                                    result = false;
                                }
                            }
                            else if (a[name] instanceof Object) {
                                result = compareObjects(a[name], b[name]);
                            }
                            else {
                                result = a[name] === b[name];
                            }
                            if (result === false)
                                break;
                        }
                    }
                }
                return result;
            }
            Utils.compareObjects = compareObjects;
            Utils.cssTransform = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"];
            Utils.DEBUG = true;
            function getFullPath(path, dataMember) {
                return path + (dataMember ? "." + dataMember : "");
            }
            Utils.getFullPath = getFullPath;
            function loadTemplates() {
                var promises = $("script[type='text/html']").map(function (_, script) {
                    if (script.src) {
                        var deffered = $.Deferred();
                        $.get(script.src)
                            .done(function (tmpl) {
                            script.text = tmpl;
                            if (tmpl.indexOf('type="text/html"') !== -1 || tmpl.indexOf("type='text/html'") !== -1) {
                                $(document.body).append(tmpl);
                            }
                            deffered.resolve();
                        })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                            deffered.reject();
                        });
                        return deffered.promise();
                    }
                });
                return $.when.apply($.when, promises);
            }
            Utils.loadTemplates = loadTemplates;
            function appendStaticContextToRootViewModel(root) {
                root.dx = DevExpress;
                root.getLocalization = function () {
                    return Utils.getLocalization.apply(DevExpress.Analytics, arguments);
                };
            }
            Utils.appendStaticContextToRootViewModel = appendStaticContextToRootViewModel;
            Utils.ajaxSetup = new Analytics.Internal.AjaxSetup();
            function ajax(uri, action, arg, processErrorCallback, ignoreError, customOptions) {
                var deferred = $.Deferred();
                var requestData;
                if (action !== undefined && arg !== undefined) {
                    requestData = {
                        actionKey: action,
                        arg: arg
                    };
                }
                Utils.ajaxSetup.sendRequest($.extend({}, {
                    type: "POST",
                    data: requestData,
                    url: uri
                }, customOptions)).fail(function (jqXHR, textStatus, errorThrown) {
                    var _failData = requestData;
                    if (ignoreError && ignoreError())
                        return;
                    Analytics.Internal._errorProcessor.call({ jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown });
                    Analytics.Internal._processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback);
                })
                    .done(function (data, textStatus, jqXHR) {
                    var _doneData = requestData;
                    if (data.success) {
                        deferred.resolve(data.result);
                    }
                    else {
                        if (ignoreError && ignoreError())
                            return;
                        Analytics.Internal._errorProcessor.call({ jqXHR: jqXHR, data: data, textStatus: textStatus });
                        Analytics.Internal._processError("Internal Server Error", deferred, jqXHR, textStatus, processErrorCallback);
                    }
                });
                return deferred.promise();
            }
            Utils.ajax = ajax;
            ;
            function cutRefs(model) {
                Utils.objectsVisitor(model, function (target) {
                    delete target["@Ref"];
                });
                return model;
            }
            Utils.cutRefs = cutRefs;
            function createPopularProperties(info, popularProperties) {
                var properties = [];
                popularProperties.forEach(function (name) {
                    var property = info.filter(function (propertyInfo) { return propertyInfo.propertyName === name; })[0];
                    if (property) {
                        properties.push(property);
                    }
                });
                return properties;
            }
            Utils.DesignerBaseElements = {
                MenuButton: "dxrd-menubutton-template-base",
                Toolbar: "dxrd-toolbar-template-base",
                Toolbox: "dxrd-toolbox-template-base",
                Surface: "dxrd-surface-template-base",
                RightPanel: "dxrd-right-panel-template-base"
            };
            function generateDefaultParts(model) {
                return [
                    { id: Utils.DesignerBaseElements.MenuButton, templateName: Utils.DesignerBaseElements.MenuButton, model: model },
                    { id: Utils.DesignerBaseElements.Toolbar, templateName: Utils.DesignerBaseElements.Toolbar, model: model },
                    { id: Utils.DesignerBaseElements.Toolbox, templateName: Utils.DesignerBaseElements.Toolbox, model: model },
                    { id: Utils.DesignerBaseElements.Surface, templateName: Utils.DesignerBaseElements.Surface, model: model },
                    { id: Utils.DesignerBaseElements.RightPanel, templateName: Utils.DesignerBaseElements.RightPanel, model: model }
                ];
            }
            Utils.generateDefaultParts = generateDefaultParts;
            function createActionWrappingFunction(wrapperName, func) {
                return function (actions) {
                    actions.forEach(function (action) {
                        if (!action["wrappedWith"] || action["wrappedWith"].indexOf(wrapperName) === -1) {
                            var oldClickHandler = action.clickAction;
                            action.clickAction = function (model) {
                                return func(model, oldClickHandler);
                            };
                            action["wrappedWith"] = action["wrappedWith"] || [];
                            action["wrappedWith"].push(wrapperName);
                        }
                    });
                };
            }
            Utils.createActionWrappingFunction = createActionWrappingFunction;
            function createDesigner(model, surface, controlsFactory, groups, editors, parts, rtl, selection, designControlsHelper, undoEngine, customMerge, snapLinesCollector, groupLocalizationIDs) {
                if (groups === void 0) { groups = {}; }
                if (editors === void 0) { editors = []; }
                var undoEngine = undoEngine || ko.observable(new Utils.UndoEngine(model)), actionUndoEngineWrappingFunction = createActionWrappingFunction("WrapWithUndoEngine", function (model, handler) {
                    undoEngine().start();
                    handler(model);
                    undoEngine().end();
                }), selection = selection || new Analytics.Internal.SurfaceSelection(), contextActionProviders = [], snapHelper = new Analytics.Internal.SnapLinesHelper(surface, Analytics.Internal.SnapLinesHelper.snapTolerance, snapLinesCollector || new Analytics.Internal.SnapLinesCollector()), controlsHelper = designControlsHelper || new Analytics.Internal.DesignControlsHelper(model, [{
                        added: function (control) { },
                        deleted: function (control) { control.surface == selection.focused() && selection.focused(Analytics.Internal.findNextSelection(control.surface)); }
                    }]), dragHelperContent = new Analytics.Internal.DragHelperContent(selection), toolboxItems = Analytics.getToolboxItems(controlsFactory.controlsMap), appMenuVisible = ko.observable(false), inlineTextEdit = new Analytics.Internal.InlineTextEdit(selection), editableObject = Analytics.Internal.CombinedObject.getEditableObject(selection, undoEngine, customMerge).extend({ throttle: 1 }), propertyGrid = new Analytics.Widgets.ControlProperties(editableObject, { groups: groups, editors: editors, groupLocalizationIDs: groupLocalizationIDs }, null), popularProperties = new Analytics.Widgets.ObjectProperties(ko.pureComputed(function () {
                    var popularPropertiesObject = { getInfo: function () { return []; } }, editable = editableObject();
                    if (editable) {
                        var controlInfo = controlsFactory.controlsMap[editable.controlType], propertiesInfo = createPopularProperties(controlInfo && controlInfo.info || [], controlInfo && controlInfo.popularProperties || []);
                        (propertiesInfo).forEach(function (item) {
                            if (item.propertyName in editable)
                                popularPropertiesObject[item.propertyName] = editable[item.propertyName];
                        });
                        popularPropertiesObject.getInfo = function () {
                            return propertiesInfo;
                        };
                        popularPropertiesObject["root"] = editable.root;
                        popularPropertiesObject["actions"] = editable.actions;
                        popularPropertiesObject["getPath"] = function (propertyName) { return editable.getPath && editable.getPath(propertyName) || ""; };
                        popularPropertiesObject["isPropertyModified"] = function (name) {
                            return editable.isPropertyModified ? editable.isPropertyModified(name) : false;
                        };
                        popularPropertiesObject["getActionClassName"] = function (name) {
                            return editable["getActionClassName"] ? editable["getActionClassName"](name) : "";
                        };
                        popularPropertiesObject["isPropertyVisible"] = function (propertyName) {
                            return editable["isPropertyVisible"](propertyName);
                        };
                        popularPropertiesObject["isPropertyDisabled"] = function (name) {
                            return editable.isPropertyDisabled ? editable.isPropertyDisabled(name) : false;
                        };
                        popularPropertiesObject["isSame"] = function (x) { return x === editable; };
                    }
                    return popularPropertiesObject;
                }), undefined, undefined, undefined), tabPanel = new Analytics.TabPanel([
                    new Analytics.TabInfo("Properties", "dxrd-propertiestab", propertyGrid, 'ReportStringId.Cmd_Properties', undefined, ko.pureComputed(function () { return !!model(); }), ko.pureComputed(function () { return propertyGrid.focusedItem() instanceof Array; }).extend({ throttle: 100 }))
                ], undefined, rtl);
                var designerModel = {
                    parts: parts,
                    model: model,
                    isLoading: ko.observable(true),
                    surface: surface,
                    surfaceSize: ko.observable(0),
                    controlsHelper: controlsHelper,
                    selection: selection,
                    undoEngine: undoEngine,
                    toolboxItems: toolboxItems,
                    editableObject: editableObject,
                    popularProperties: popularProperties,
                    tabPanel: tabPanel,
                    rtl: rtl,
                    controlsStore: new Analytics.Internal.ControlsStore(controlsHelper.allControls),
                    appMenuVisible: appMenuVisible,
                    toggleAppMenu: function () {
                        appMenuVisible(!appMenuVisible());
                    },
                    getMenuPopupContainer: function (el) { return $(el).closest(".dxrd-menu-button").prev(".dxrd-menu-container"); },
                    getMenuPopupTarget: function (el) { return $(el).closest(".dxrd-menu-button").find(".dxrd-menu-place"); },
                    actionLists: new Analytics.Internal.ActionLists(surface, selection, undoEngine, function () { }),
                    contextActionProviders: contextActionProviders,
                    contextActions: ko.pureComputed(function () {
                        var editable = editableObject(), contextActions = [];
                        contextActionProviders.forEach(function (actionProvider) {
                            contextActions.push.apply(contextActions, actionProvider.getActions(editable));
                        });
                        actionUndoEngineWrappingFunction(contextActions);
                        return contextActions;
                    }),
                    actionsGroupTitle: function () { return Analytics.getLocalization('Actions', 'ASPxReportsStringId.ReportDesigner_Actions'); },
                    inlineTextEdit: inlineTextEdit,
                    resizeHandler: {
                        starting: function () {
                            selection.expectClick = true;
                            undoEngine().start();
                        },
                        stopped: function () {
                            undoEngine().end();
                            setTimeout(function () { selection.expectClick = false; }, 100);
                        },
                        disabled: Analytics.Internal.DragDropHandler.started,
                        snapHelper: snapHelper
                    },
                    snapHelper: snapHelper,
                    dragHelperContent: dragHelperContent,
                    dragHandler: new Analytics.Internal.SelectionDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent),
                    toolboxDragHandler: new Analytics.Internal.ToolboxDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory),
                    dragDropStarted: Analytics.Internal.DragDropHandler.started,
                    updateFont: function (values) {
                        DevExpress.Analytics.Widgets.availableFonts($.extend(DevExpress.Analytics.Widgets.availableFonts(), values));
                    }
                };
                designerModel["popularVisible"] = ko.pureComputed(function () {
                    return designerModel.popularProperties._editors().some(function (x) { return x.visible(); }) || designerModel.contextActions().length > 0;
                });
                designerModel.parts = designerModel.parts || generateDefaultParts(designerModel);
                return designerModel;
            }
            Utils.createDesigner = createDesigner;
            function localizeNoneString(noneValue) {
                var value = ko.unwrap(noneValue);
                if (value === "none") {
                    return Analytics.getLocalization("none", "DataAccessStringId.ParameterListEmpty");
                }
                else if (value === "(none)") {
                    return (Analytics.getLocalization("(none)", "ChartStringId.WizNoBackImage") !== "(none)") ? Analytics.getLocalization("(none)", "ChartStringId.WizNoBackImage") : ("(" + Analytics.getLocalization("none", "DataAccessStringId.ParameterListEmpty") + ")");
                }
                return value;
            }
            Utils.localizeNoneString = localizeNoneString;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Utils;
        (function (Utils) {
            function objectsVisitor(target, visitor, visited, skip) {
                if (visited === void 0) { visited = []; }
                if (skip === void 0) { skip = ["surface", "reportSource"]; }
                if (visited.indexOf(target) !== -1) {
                    return;
                }
                if (target && target !== undefined) {
                    var properties = [];
                    for (var propertyName in target) {
                        if (visited.indexOf(target[propertyName]) === -1 && propertyName.indexOf("_") !== 0 && skip.indexOf(propertyName) === -1) {
                            properties.push(target[propertyName]);
                        }
                    }
                    visitor(target);
                    visited.push(target);
                    for (var i = 0; i < properties.length; i++) {
                        properties[i] = ko.unwrap(properties[i]);
                        if (typeof properties[i] === 'object') {
                            objectsVisitor(properties[i], visitor, visited, skip);
                        }
                    }
                }
            }
            Utils.objectsVisitor = objectsVisitor;
            function collectionsVisitor(target, visitor, collectionsToProcess, visited) {
                if (collectionsToProcess === void 0) { collectionsToProcess = ["controls", "bands", "subBands", "crossBandControls", "rows", "cells", "fields"]; }
                if (visited === void 0) { visited = []; }
                if (target && target !== undefined) {
                    visited.push(target);
                    for (var i = 0, len = collectionsToProcess.length; i < len; i++) {
                        if (target[collectionsToProcess[i]]) {
                            visitor(target[collectionsToProcess[i]], target);
                            (target[collectionsToProcess[i]]() || []).forEach(function (item) { return collectionsVisitor(item, visitor, collectionsToProcess, visited); });
                        }
                    }
                }
            }
            Utils.collectionsVisitor = collectionsVisitor;
        })(Utils = Analytics.Utils || (Analytics.Utils = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var dxFieldListPicker = (function (_super) {
                __extends(dxFieldListPicker, _super);
                function dxFieldListPicker(element, options) {
                    _super.call(this, element, $.extend(options, { showClearButton: true }));
                    this._path = ko.observable("");
                    this._value = ko.observable("");
                    this._parentViewport = "";
                    this._itemsProvider = ko.observable(null);
                    this.option("path") && this._path(this.option("path"));
                    this.option("value") && this._value(this.option("value"));
                    this.option("itemsProvider") && this._itemsProvider(this.option("itemsProvider"));
                    this.option("valueChangeEvent", "change");
                    this._parentViewport = this["_$element"].parents(".dx-viewport");
                }
                dxFieldListPicker.prototype._showDropDown = function () {
                    if (this._popup) {
                        this._popup.option("width", this.element().width());
                        var popupContent = this._popup.content() && this._popup.content()[0];
                        popupContent.style.maxHeight = 'none';
                        popupContent.style.height = 'auto';
                        this._popup._renderPosition();
                    }
                };
                dxFieldListPicker.prototype._closeOutsideDropDownHandler = function (e, ignoreContainerClicks) { _super.prototype._closeOutsideDropDownHandler.call(this, e, true); };
                dxFieldListPicker.prototype._hideOnBlur = function () { return false; };
                dxFieldListPicker.prototype._popupConfig = function () {
                    var dxPolymorphWidget = this._options.integrationOptions.templates["dx-polymorph-widget"];
                    return $.extend(_super.prototype._popupConfig.call(this), {
                        container: this._parentViewport,
                        contentTemplate: dxPolymorphWidget && dxPolymorphWidget._template,
                        closeOnOutsideClick: true
                    });
                };
                dxFieldListPicker.prototype._optionChanged = function (obj, value) {
                    var _this = this;
                    var name = obj.name || obj, newValue = value || obj.value;
                    switch (name) {
                        case "value":
                            _super.prototype._optionChanged.apply(this, arguments);
                            setTimeout($.proxy(function () {
                                _this.option("opened", false);
                            }, this), 50);
                            break;
                        case "path":
                            this._path(newValue);
                            break;
                        case "itemsProvider":
                            this._itemsProvider(newValue);
                            break;
                        case "displayValue":
                            this["_renderInputValue"]();
                            break;
                        default:
                            _super.prototype._optionChanged.apply(this, arguments);
                            if (name === "opened" && newValue) {
                                this._showDropDown();
                            }
                    }
                };
                dxFieldListPicker.prototype._clearValueHandler = function () {
                    this["_input"]().val(null);
                    _super.prototype["_clearValueHandler"].apply(this, arguments);
                };
                dxFieldListPicker.prototype._renderPopupContent = function () {
                    var _this = this;
                    _super.prototype._renderPopupContent.call(this);
                    var selectedPath = ko.pureComputed({
                        read: function () {
                            return _this._path() ? _this._path() + "." + _this._value() : _this._value();
                        },
                        write: function (newVal) {
                            if (_this._path() && _this._path().length > 0) {
                                _this._value(newVal.substr(_this._path().length + 1));
                                _this.option("value", _this._value());
                            }
                            else {
                                _this._value(newVal);
                                _this.option("value", _this._value());
                            }
                        }
                    });
                    var $scroll = $("<div>").addClass("dx-treelist-wrapper").dxScrollView({ scrollByThumb: true });
                    var scroll = this["_createComponent"]($scroll, "dxScrollView");
                    var self = this;
                    scroll.content().append('<div data-bind="treelist: options"></div>');
                    var context = ko.contextFor(this.element()[0]);
                    var treeListController = this.option("treeListController");
                    var options = ko.computed(function () {
                        return {
                            itemsProvider: _this._itemsProvider(), onItemsVisibilityChanged: function () {
                                if (self._popup) {
                                    self._popup._renderPosition();
                                }
                            }, selectedPath: selectedPath, treeListController: treeListController, path: _this._path
                        };
                    });
                    var childContext = context.createChildContext({ options: options });
                    ko.applyBindings(childContext, scroll.content()[0]);
                    this._popup.content().append($scroll);
                };
                return dxFieldListPicker;
            })(DevExpress.ui.dxDropDownEditor);
            Widgets.dxFieldListPicker = dxFieldListPicker;
            DevExpress.registerComponent("dxFieldListPicker", dxFieldListPicker);
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            ko.bindingHandlers['dxBorderEditor'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(element).children().remove();
                    var templateHtml = $('#dxrd-bordereditor').text(), $element = $(element).append(templateHtml);
                    ko.applyBindings({ value: new Widgets.BordersModel(valueAccessor(), viewModel.disabled) }, $element.children()[0]);
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var BordersModel = (function (_super) {
                __extends(BordersModel, _super);
                function BordersModel(object, disabled) {
                    var _this = this;
                    if (disabled === void 0) { disabled = ko.observable(false); }
                    _super.call(this);
                    this.left = ko.observable(false);
                    this.right = ko.observable(false);
                    this.top = ko.observable(false);
                    this.bottom = ko.observable(false);
                    this.disabled = disabled;
                    this.value = object.value;
                    this.updateModel(object.value());
                    this._disposables.push(object.value.subscribe(function (newVal) {
                        _this.updateModel(newVal);
                    }));
                }
                BordersModel.prototype._setAllValues = function (value) {
                    this.left(value), this.bottom(value), this.right(value), this.top(value);
                };
                BordersModel.prototype.setValue = function (name) {
                    if (this.disabled())
                        return;
                    this[name](!this[name]());
                    this.updateValue();
                };
                BordersModel.prototype.setAll = function () {
                    if (this.disabled())
                        return;
                    this._setAllValues(true);
                    this.updateValue();
                };
                BordersModel.prototype.setNone = function () {
                    if (this.disabled())
                        return;
                    this._setAllValues(false);
                    this.updateValue();
                };
                BordersModel.prototype.updateModel = function (value) {
                    var val = value || "None";
                    if (val.indexOf("All") !== -1) {
                        this._setAllValues(true);
                    }
                    else if (val.indexOf("None") !== -1) {
                        this._setAllValues(false);
                    }
                    else {
                        this.left(val.indexOf("Left") !== -1);
                        this.top(val.indexOf("Top") !== -1);
                        this.right(val.indexOf("Right") !== -1);
                        this.bottom(val.indexOf("Bottom") !== -1);
                    }
                };
                BordersModel.prototype.updateValue = function () {
                    var result = [];
                    if (this.left() && this.right() && this.top() && this.bottom()) {
                        result.push("All");
                    }
                    else if (!this.left() && !this.right() && !this.top() && !this.bottom()) {
                        result.push("None");
                    }
                    else {
                        this.left() ? result.push("Left") : null;
                        this.right() ? result.push("Right") : null;
                        this.top() ? result.push("Top") : null;
                        this.bottom() ? result.push("Bottom") : null;
                    }
                    this.value(result.join(','));
                };
                return BordersModel;
            })(Analytics.Utils.Disposable);
            Widgets.BordersModel = BordersModel;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var ControlProperties = (function (_super) {
                __extends(ControlProperties, _super);
                function ControlProperties(target, editorsInfo, level) {
                    var _this = this;
                    if (level === void 0) { level = 0; }
                    _super.call(this, target, editorsInfo, level, undefined, undefined, ko.observable(""));
                    this.focusedItem = ko.observable();
                    this.createEditorAddOn = function (editor) {
                        var editorAddOn = new Analytics.Internal.EditorAddOn(editor, _this.popupService);
                        return {
                            templateName: editorAddOn.templateName,
                            data: editorAddOn
                        };
                    };
                    this.editorsRendered = ko.observable(false);
                    this.isSortingByGroups = ko.observable(true);
                    this.isSearching = ko.observable(false);
                    this.allEditorsCreated = ko.observable(false);
                    this.textToSearch = ko.observable("");
                    this._searchBox = null;
                    this.searchPlaceholder = function () { return Analytics.getLocalization("Enter text to search...", "ASPxReportsStringId.ReportDesigner_QueryBuilder_SearchBox_EmptyText"); };
                    this.switchSearchBox = function () {
                        if (_this.isSearching()) {
                            _this.isSearching(false);
                            _this.textToSearch("");
                        }
                        else {
                            _this.isSearching(true);
                            _this._searchBox && _this._searchBox.focus();
                        }
                    };
                    this.popupService = new Analytics.Internal.PopupService();
                    this.createGroups(editorsInfo.groups, editorsInfo.groupLocalizationIDs);
                    this.update(target());
                    this.focusedImageClassName = ko.pureComputed(function () {
                        return Analytics.Internal.getImageClassName(target() && target().controlType);
                    });
                    var subscription = this.isSortingByGroups.subscribe(function (newVal) {
                        if (!newVal) {
                            _this.editorsRendered(true);
                            subscription.dispose();
                        }
                    });
                    this.focusedItem = target;
                    this.displayExpr = function (value) { return DevExpress.Analytics.Internal.getControlFullName(value); };
                    var timeout = null;
                    this.textToSearch.subscribe(function (newValue) {
                        timeout && clearTimeout(timeout);
                        timeout = setTimeout(function () {
                            _this._textToSearch(newValue);
                            newValue && _this.groups.forEach(function (group) { return group.collapsed() && group.editors().some(function (editor) { return editor.isSearchedProperty(); }) && group.collapsed(false); });
                        }, 200);
                    });
                }
                ControlProperties.prototype.getEditors = function () {
                    var editors = _super.prototype.getEditors.call(this);
                    var editorNames = editors.map(function (editor) { return editor.displayName(); }).sort();
                    editors.sort(function (a, b) {
                        return editorNames.indexOf(a.displayName()) - editorNames.indexOf(b.displayName());
                    });
                    return editors;
                };
                ControlProperties.prototype.update = function (viewModel) {
                    _super.prototype.update.call(this, viewModel);
                    if (this.isSortingByGroups && !this.isSortingByGroups())
                        return;
                    (this.groups || []).forEach(function (group) {
                        group.update(viewModel);
                    });
                };
                ControlProperties.prototype.createGroups = function (groups, getGroupLocalizationId) {
                    var _this = this;
                    this.groups = $.map(groups, function (groupInfo, displayName) {
                        return new Widgets.Group(displayName, groupInfo, function (serializationInfo) {
                            return serializationInfo
                                .filter(function (info) { return !!info.editor; })
                                .map(function (info) {
                                var editor = _this.findEditorByInfo(info);
                                if (editor)
                                    return editor;
                                editor = _this.createEditor(info);
                                _this._editors.push(editor);
                                return editor;
                            });
                        }, true, getGroupLocalizationId && getGroupLocalizationId[displayName]);
                    });
                };
                ControlProperties.prototype.searchBox = function ($element) {
                    this._searchBox = $element.dxTextBox("instance");
                };
                return ControlProperties;
            })(Widgets.ObjectProperties);
            Widgets.ControlProperties = ControlProperties;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Widgets;
        (function (Widgets) {
            var Group = (function (_super) {
                __extends(Group, _super);
                function Group(displayName, serializationsInfo, createEditors, collapsed, localizationId) {
                    var _this = this;
                    if (collapsed === void 0) { collapsed = true; }
                    if (localizationId === void 0) { localizationId = ""; }
                    _super.call(this);
                    this.editors = ko.observableArray();
                    this.editorsCreated = ko.observable(false);
                    this.editorsRendered = ko.observable(false);
                    this._displayName = displayName;
                    this._localizationId = localizationId;
                    this._serializationsInfo = serializationsInfo;
                    this.collapsed = ko.observable(collapsed);
                    if (collapsed) {
                        var subscription = this.collapsed.subscribe(function (newVal) {
                            subscription.dispose();
                            _this.editorsRendered(true);
                        });
                    }
                    this.visible = ko.computed(function () {
                        return _this.editors().some(function (editor) { return editor.visible(); });
                    });
                    this.editors(createEditors(serializationsInfo));
                    this._disposables.push(this.visible);
                }
                Group.prototype.update = function (viewModel) {
                    var _this = this;
                    this._viewModel = viewModel;
                    this.editors().forEach(function (editor) {
                        editor.update(_this._viewModel);
                    });
                };
                Group.prototype.displayName = function () {
                    return this._localizationId ? Analytics.getLocalization(this._displayName, this._localizationId) : Analytics.getLocalization(this._displayName);
                };
                return Group;
            })(Analytics.Utils.Disposable);
            Widgets.Group = Group;
        })(Widgets = Analytics.Widgets || (Analytics.Widgets = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Internal;
        (function (Internal) {
            Internal.sizeFake = [
                { propertyName: "height", displayName: "Height", localizationId: "System.Drawing.SizeF.Height", editor: Analytics.Widgets.editorTemplates.numeric },
                { propertyName: "width", displayName: "Width", localizationId: "System.Drawing.SizeF.Width", editor: Analytics.Widgets.editorTemplates.numeric }
            ];
            Internal.locationFake = [
                { propertyName: "x", displayName: "X", editor: Analytics.Widgets.editorTemplates.numeric },
                { propertyName: "y", displayName: "Y", editor: Analytics.Widgets.editorTemplates.numeric }
            ];
        })(Internal = Analytics.Internal || (Analytics.Internal = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="dragDrop/dragDropHandler.ts" />
/// <reference path="dragDrop/dragHelperContent.ts" />
/// <reference path="dragDrop/selectionDragDropHandler.ts" />
/// <reference path="dragDrop/toolboxDragDropHandler.ts" />
/// <reference path="elements/baseSurface.ts" />
/// <reference path="elements/elementViewModel.ts" />
/// <reference path="elements/margins.ts" />
/// <reference path="elements/paddingModel.ts" />
/// <reference path="elements/point.ts" />
/// <reference path="elements/rectangle.ts" />
/// <reference path="elements/serializableModel.ts" />
/// <reference path="elements/size.ts" />
/// <reference path="internal/controlsHelper.ts" />
/// <reference path="internal/cssCalculator.ts" />
/// <reference path="internal/editorTypeMapper.ts" />
/// <reference path="internal/getNameHelpers.ts" />
/// <reference path="internal/globalize.ts" />
/// <reference path="internal/hoverInfo.ts" />
/// <reference path="internal/inlineTextEdit.ts" />
/// <reference path="internal/objectStructureControllers.ts" />
/// <reference path="internal/objectStructureProviders.ts" />
/// <reference path="internal/papperKindMapper.ts" />
/// <reference path="internal/processError.ts" />
/// <reference path="internal/stores.ts" />
/// <reference path="internal/surfaceHelpers.ts" />
/// <reference path="internal/validation.ts" />
/// <reference path="selection/combinedObj.ts" />
/// <reference path="selection/selection.ts" />
/// <reference path="selection/selectionHelpers.ts" />
/// <reference path="snapLines/snapLinesCollector.ts" />
/// <reference path="snapLines/snapLinesHelper.ts" />
/// <reference path="snapLines/snapLineSurface.ts" />
/// <reference path="tools/actionId.ts" />
/// <reference path="tools/actionList.ts" />
/// <reference path="tools/copyPaste.ts" />
/// <reference path="tools/keyboardHelper.ts" />
/// <reference path="tools/tabPanel.ts" />
/// <reference path="tools/toolbox.ts" />
/// <reference path="utils/arrayutils.ts" />
/// <reference path="utils/controlsFactory.ts" />
/// <reference path="utils/fieldListProvider.ts" />
/// <reference path="utils/infoMessageHelpers.ts" />
/// <reference path="utils/parsers.ts" />
/// <reference path="utils/units.ts" />
/// <reference path="utils/utils.ts" />
/// <reference path="utils/visitors.ts" />
/// <reference path="widgets/colorPickerEditor.ts" />
/// <reference path="widgets/dataMemberEditor.ts" />
/// <reference path="widgets/editorsInfo.ts" />
/// <reference path="widgets/fieldListEditor.ts" />
/// <reference path="widgets/fieldlistpicker.ts" />
/// <reference path="widgets/bordereditor/binding.ts" />
/// <reference path="widgets/bordereditor/bordereditor.ts" />
/// <reference path="widgets/propertygrid/controlProperties.ts" />
/// <reference path="widgets/propertygrid/group.ts" />
/// <reference path="actionProvider.ts" />
/// <reference path="bindings.ts" />
/// <reference path="metadata.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var DragDropHandler = (function (_super) {
            __extends(DragDropHandler, _super);
            function DragDropHandler() {
                _super.apply(this, arguments);
            }
            return DragDropHandler;
        })(DevExpress.Analytics.Internal.DragDropHandler);
        Designer.DragDropHandler = DragDropHandler;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "DragDropHandler");
        var DragHelperContent = (function (_super) {
            __extends(DragHelperContent, _super);
            function DragHelperContent() {
                _super.apply(this, arguments);
            }
            return DragHelperContent;
        })(DevExpress.Analytics.Internal.DragHelperContent);
        Designer.DragHelperContent = DragHelperContent;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "DragHelperContent");
        var SelectionDragDropHandler = (function (_super) {
            __extends(SelectionDragDropHandler, _super);
            function SelectionDragDropHandler() {
                _super.apply(this, arguments);
            }
            return SelectionDragDropHandler;
        })(DevExpress.Analytics.Internal.SelectionDragDropHandler);
        Designer.SelectionDragDropHandler = SelectionDragDropHandler;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SelectionDragDropHandler");
        var ToolboxDragDropHandler = (function (_super) {
            __extends(ToolboxDragDropHandler, _super);
            function ToolboxDragDropHandler() {
                _super.apply(this, arguments);
            }
            return ToolboxDragDropHandler;
        })(DevExpress.Analytics.Internal.ToolboxDragDropHandler);
        Designer.ToolboxDragDropHandler = ToolboxDragDropHandler;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ToolboxDragDropHandler");
        var SurfaceElementArea = (function (_super) {
            __extends(SurfaceElementArea, _super);
            function SurfaceElementArea() {
                _super.apply(this, arguments);
            }
            return SurfaceElementArea;
        })(DevExpress.Analytics.SurfaceElementArea);
        Designer.SurfaceElementArea = SurfaceElementArea;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "SurfaceElementArea");
        var SurfaceElementBase = (function (_super) {
            __extends(SurfaceElementBase, _super);
            function SurfaceElementBase() {
                _super.apply(this, arguments);
            }
            return SurfaceElementBase;
        })(DevExpress.Analytics.SurfaceElementBase);
        Designer.SurfaceElementBase = SurfaceElementBase;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "SurfaceElementBase");
        var Disposable = (function (_super) {
            __extends(Disposable, _super);
            function Disposable() {
                _super.apply(this, arguments);
            }
            return Disposable;
        })(DevExpress.Analytics.Utils.Disposable);
        Designer.Disposable = Disposable;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "Disposable");
        var ElementViewModel = (function (_super) {
            __extends(ElementViewModel, _super);
            function ElementViewModel() {
                _super.apply(this, arguments);
            }
            return ElementViewModel;
        })(DevExpress.Analytics.ElementViewModel);
        Designer.ElementViewModel = ElementViewModel;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "ElementViewModel");
        var SerializableModel = (function (_super) {
            __extends(SerializableModel, _super);
            function SerializableModel() {
                _super.apply(this, arguments);
            }
            return SerializableModel;
        })(DevExpress.Analytics.SerializableModel);
        Designer.SerializableModel = SerializableModel;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "SerializableModel");
        var CombinedObject = (function (_super) {
            __extends(CombinedObject, _super);
            function CombinedObject() {
                _super.apply(this, arguments);
            }
            return CombinedObject;
        })(DevExpress.Analytics.Internal.CombinedObject);
        Designer.CombinedObject = CombinedObject;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "CombinedObject");
        var SurfaceSelection = (function (_super) {
            __extends(SurfaceSelection, _super);
            function SurfaceSelection() {
                _super.apply(this, arguments);
            }
            return SurfaceSelection;
        })(DevExpress.Analytics.Internal.SurfaceSelection);
        Designer.SurfaceSelection = SurfaceSelection;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SurfaceSelection");
        var SnapLinesCollector = (function (_super) {
            __extends(SnapLinesCollector, _super);
            function SnapLinesCollector() {
                _super.apply(this, arguments);
            }
            return SnapLinesCollector;
        })(DevExpress.Analytics.Internal.SnapLinesCollector);
        Designer.SnapLinesCollector = SnapLinesCollector;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SnapLinesCollector");
        var SnapLinesHelper = (function (_super) {
            __extends(SnapLinesHelper, _super);
            function SnapLinesHelper() {
                _super.apply(this, arguments);
            }
            return SnapLinesHelper;
        })(DevExpress.Analytics.Internal.SnapLinesHelper);
        Designer.SnapLinesHelper = SnapLinesHelper;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SnapLinesHelper");
        var CopyPasteHandler = (function (_super) {
            __extends(CopyPasteHandler, _super);
            function CopyPasteHandler() {
                _super.apply(this, arguments);
            }
            return CopyPasteHandler;
        })(DevExpress.Analytics.Internal.CopyPasteHandler);
        Designer.CopyPasteHandler = CopyPasteHandler;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "CopyPasteHandler");
        var SnapLineSurface = (function (_super) {
            __extends(SnapLineSurface, _super);
            function SnapLineSurface() {
                _super.apply(this, arguments);
            }
            return SnapLineSurface;
        })(DevExpress.Analytics.Internal.SnapLineSurface);
        Designer.SnapLineSurface = SnapLineSurface;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SnapLineSurface");
        Designer.ActionId = DevExpress.Analytics.ActionId;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "ActionId");
        var ActionListsBase = (function (_super) {
            __extends(ActionListsBase, _super);
            function ActionListsBase() {
                _super.apply(this, arguments);
            }
            return ActionListsBase;
        })(DevExpress.Analytics.Internal.ActionListsBase);
        Designer.ActionListsBase = ActionListsBase;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ActionListsBase");
        var ActionLists = (function (_super) {
            __extends(ActionLists, _super);
            function ActionLists() {
                _super.apply(this, arguments);
            }
            return ActionLists;
        })(DevExpress.Analytics.Internal.ActionLists);
        Designer.ActionLists = ActionLists;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ActionLists");
        var KeyboardHelper = (function (_super) {
            __extends(KeyboardHelper, _super);
            function KeyboardHelper() {
                _super.apply(this, arguments);
            }
            return KeyboardHelper;
        })(DevExpress.Analytics.Internal.KeyboardHelper);
        Designer.KeyboardHelper = KeyboardHelper;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "KeyboardHelper");
        var KeyDownHandlersManager = (function (_super) {
            __extends(KeyDownHandlersManager, _super);
            function KeyDownHandlersManager() {
                _super.apply(this, arguments);
            }
            return KeyDownHandlersManager;
        })(DevExpress.Analytics.Internal.KeyDownHandlersManager);
        Designer.KeyDownHandlersManager = KeyDownHandlersManager;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "KeyDownHandlersManager");
        var TabPanel = (function (_super) {
            __extends(TabPanel, _super);
            function TabPanel() {
                _super.apply(this, arguments);
            }
            return TabPanel;
        })(DevExpress.Analytics.TabPanel);
        Designer.TabPanel = TabPanel;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "TabPanel");
        var TabInfo = (function (_super) {
            __extends(TabInfo, _super);
            function TabInfo() {
                _super.apply(this, arguments);
            }
            return TabInfo;
        })(DevExpress.Analytics.TabInfo);
        Designer.TabInfo = TabInfo;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "TabInfo");
        var ToolboxItem = (function (_super) {
            __extends(ToolboxItem, _super);
            function ToolboxItem() {
                _super.apply(this, arguments);
            }
            return ToolboxItem;
        })(DevExpress.Analytics.ToolboxItem);
        Designer.ToolboxItem = ToolboxItem;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "ToolboxItem");
        var ControlsFactory = (function (_super) {
            __extends(ControlsFactory, _super);
            function ControlsFactory() {
                _super.apply(this, arguments);
            }
            return ControlsFactory;
        })(DevExpress.Analytics.Utils.ControlsFactory);
        Designer.ControlsFactory = ControlsFactory;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "ControlsFactory");
        var DesignControlsHelper = (function (_super) {
            __extends(DesignControlsHelper, _super);
            function DesignControlsHelper() {
                _super.apply(this, arguments);
            }
            return DesignControlsHelper;
        })(DevExpress.Analytics.Internal.DesignControlsHelper);
        Designer.DesignControlsHelper = DesignControlsHelper;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "DesignControlsHelper");
        var CssCalculator = (function (_super) {
            __extends(CssCalculator, _super);
            function CssCalculator() {
                _super.apply(this, arguments);
            }
            return CssCalculator;
        })(DevExpress.Analytics.Internal.CssCalculator);
        Designer.CssCalculator = CssCalculator;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "CssCalculator");
        var FieldListProvider = (function (_super) {
            __extends(FieldListProvider, _super);
            function FieldListProvider() {
                _super.apply(this, arguments);
            }
            return FieldListProvider;
        })(DevExpress.Analytics.Utils.FieldListProvider);
        Designer.FieldListProvider = FieldListProvider;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "FieldListProvider");
        var HoverInfo = (function (_super) {
            __extends(HoverInfo, _super);
            function HoverInfo() {
                _super.apply(this, arguments);
            }
            return HoverInfo;
        })(DevExpress.Analytics.Internal.HoverInfo);
        Designer.HoverInfo = HoverInfo;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "HoverInfo");
        var InlineTextEdit = (function (_super) {
            __extends(InlineTextEdit, _super);
            function InlineTextEdit() {
                _super.apply(this, arguments);
            }
            return InlineTextEdit;
        })(DevExpress.Analytics.Internal.InlineTextEdit);
        Designer.InlineTextEdit = InlineTextEdit;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "InlineTextEdit");
        var Margins = (function (_super) {
            __extends(Margins, _super);
            function Margins() {
                _super.apply(this, arguments);
            }
            return Margins;
        })(DevExpress.Analytics.Margins);
        Designer.Margins = Margins;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "Margins");
        var ObjectStructureTreeListController = (function (_super) {
            __extends(ObjectStructureTreeListController, _super);
            function ObjectStructureTreeListController() {
                _super.apply(this, arguments);
            }
            return ObjectStructureTreeListController;
        })(DevExpress.Analytics.Internal.ObjectStructureTreeListController);
        Designer.ObjectStructureTreeListController = ObjectStructureTreeListController;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ObjectStructureTreeListController");
        var DataMemberTreeListController = (function (_super) {
            __extends(DataMemberTreeListController, _super);
            function DataMemberTreeListController() {
                _super.apply(this, arguments);
            }
            return DataMemberTreeListController;
        })(DevExpress.Analytics.Widgets.DataMemberTreeListController);
        Designer.DataMemberTreeListController = DataMemberTreeListController;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Widgets, "DataMemberTreeListController");
        var ObjectStructureProviderBase = (function (_super) {
            __extends(ObjectStructureProviderBase, _super);
            function ObjectStructureProviderBase() {
                _super.apply(this, arguments);
            }
            return ObjectStructureProviderBase;
        })(DevExpress.Analytics.Internal.ObjectStructureProviderBase);
        Designer.ObjectStructureProviderBase = ObjectStructureProviderBase;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ObjectStructureProviderBase");
        var ObjectExplorerProvider = (function (_super) {
            __extends(ObjectExplorerProvider, _super);
            function ObjectExplorerProvider() {
                _super.apply(this, arguments);
            }
            return ObjectExplorerProvider;
        })(DevExpress.Analytics.Internal.ObjectExplorerProvider);
        Designer.ObjectExplorerProvider = ObjectExplorerProvider;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ObjectExplorerProvider");
        var ObjectStructureProvider = (function (_super) {
            __extends(ObjectStructureProvider, _super);
            function ObjectStructureProvider() {
                _super.apply(this, arguments);
            }
            return ObjectStructureProvider;
        })(DevExpress.Analytics.Internal.ObjectStructureProvider);
        Designer.ObjectStructureProvider = ObjectStructureProvider;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ObjectStructureProvider");
        var Point = (function (_super) {
            __extends(Point, _super);
            function Point() {
                _super.apply(this, arguments);
            }
            return Point;
        })(DevExpress.Analytics.Point);
        Designer.Point = Point;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "Point");
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle() {
                _super.apply(this, arguments);
            }
            return Rectangle;
        })(DevExpress.Analytics.Rectangle);
        Designer.Rectangle = Rectangle;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "Rectangle");
        var Size = (function (_super) {
            __extends(Size, _super);
            function Size() {
                _super.apply(this, arguments);
            }
            return Size;
        })(DevExpress.Analytics.Size);
        Designer.Size = Size;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "Size");
        var SortedArrayStore = (function (_super) {
            __extends(SortedArrayStore, _super);
            function SortedArrayStore() {
                _super.apply(this, arguments);
            }
            return SortedArrayStore;
        })(DevExpress.Analytics.Internal.SortedArrayStore);
        Designer.SortedArrayStore = SortedArrayStore;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "SortedArrayStore");
        var ControlsArrayStore = (function (_super) {
            __extends(ControlsArrayStore, _super);
            function ControlsArrayStore() {
                _super.apply(this, arguments);
            }
            return ControlsArrayStore;
        })(DevExpress.Analytics.Internal.ControlsArrayStore);
        Designer.ControlsArrayStore = ControlsArrayStore;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ControlsArrayStore");
        var ControlsStore = (function (_super) {
            __extends(ControlsStore, _super);
            function ControlsStore() {
                _super.apply(this, arguments);
            }
            return ControlsStore;
        })(DevExpress.Analytics.Internal.ControlsStore);
        Designer.ControlsStore = ControlsStore;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "ControlsStore");
        var dxFieldListPicker = (function (_super) {
            __extends(dxFieldListPicker, _super);
            function dxFieldListPicker() {
                _super.apply(this, arguments);
            }
            return dxFieldListPicker;
        })(DevExpress.Analytics.Widgets.dxFieldListPicker);
        Designer.dxFieldListPicker = dxFieldListPicker;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Widgets, "dxFieldListPicker");
        var BaseActionsProvider = (function (_super) {
            __extends(BaseActionsProvider, _super);
            function BaseActionsProvider() {
                _super.apply(this, arguments);
            }
            return BaseActionsProvider;
        })(DevExpress.Analytics.Internal.BaseActionsProvider);
        Designer.BaseActionsProvider = BaseActionsProvider;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "BaseActionsProvider");
        Designer.createObservableArrayMapCollection = DevExpress.Analytics.Utils.createObservableArrayMapCollection;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createObservableArrayMapCollection");
        Designer.deserializeChildArray = DevExpress.Analytics.Utils.deserializeChildArray;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "deserializeChildArray");
        Designer.getFirstItemByPropertyValue = DevExpress.Analytics.Utils.getFirstItemByPropertyValue;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "getFirstItemByPropertyValue");
        Designer.findFirstItemMatchesCondition = DevExpress.Analytics.Utils.findFirstItemMatchesCondition;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "findFirstItemMatchesCondition");
        Designer.binaryIndexOf = DevExpress.Analytics.Utils.binaryIndexOf;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "binaryIndexOf");
        Designer.getEditorType = DevExpress.Analytics.Internal.getEditorType;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getEditorType");
        Designer.getTypeNameFromFullName = DevExpress.Analytics.Internal.getTypeNameFromFullName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getTypeNameFromFullName");
        Designer.getShortTypeName = DevExpress.Analytics.Internal.getShortTypeName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getShortTypeName");
        Designer.getControlFullName = DevExpress.Analytics.Internal.getControlFullName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getControlFullName");
        Designer.getImageClassName = DevExpress.Analytics.Internal.getImageClassName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getImageClassName");
        Designer.getUniqueNameForNamedObjectsArray = DevExpress.Analytics.Internal.getUniqueNameForNamedObjectsArray;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getUniqueNameForNamedObjectsArray");
        Designer.getUniqueName = DevExpress.Analytics.Internal.getUniqueName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getUniqueName");
        Designer.initGlobalize = DevExpress.Analytics.Internal.initGlobalize;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "initGlobalize");
        Designer.NotifyAboutWarning = DevExpress.Analytics.Utils.NotifyAboutWarning;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "NotifyAboutWarning");
        Designer.getErrorMessage = DevExpress.Analytics.Utils.getErrorMessage;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "getErrorMessage");
        Designer.ShowMessage = DevExpress.Analytics.Utils.ShowMessage;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "ShowMessage");
        Designer.floatFromModel = DevExpress.Analytics.Utils.floatFromModel;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "floatFromModel");
        Designer.fromEnum = DevExpress.Analytics.Utils.fromEnum;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "fromEnum");
        Designer.parseBool = DevExpress.Analytics.Utils.parseBool;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "parseBool");
        Designer.colorFromString = DevExpress.Analytics.Utils.colorFromString;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "colorFromString");
        Designer.saveAsInt = DevExpress.Analytics.Utils.saveAsInt;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "saveAsInt");
        Designer.colorToString = DevExpress.Analytics.Utils.colorToString;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "colorToString");
        Designer._processError = DevExpress.Analytics.Internal._processError;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "_processError");
        Designer.processErrorEvent = DevExpress.Analytics.Internal.processErrorEvent;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "processErrorEvent");
        Designer.deleteSelection = DevExpress.Analytics.Internal.deleteSelection;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "deleteSelection");
        Designer.findNextSelection = DevExpress.Analytics.Internal.findNextSelection;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "findNextSelection");
        Designer.findSurface = DevExpress.Analytics.Internal.findSurface;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "findSurface");
        Designer.getControlNewAbsolutePositionOnResize = DevExpress.Analytics.Internal.getControlNewAbsolutePositionOnResize;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getControlNewAbsolutePositionOnResize");
        Designer.getControlRect = DevExpress.Analytics.Internal.getControlRect;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "getControlRect");
        Designer.minHeightWithoutScroll = DevExpress.Analytics.Internal.minHeightWithoutScroll;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "minHeightWithoutScroll");
        Designer.chooseBetterPositionOf = DevExpress.Analytics.Internal.chooseBetterPositionOf;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "chooseBetterPositionOf");
        Designer.updateSurfaceContentSize = DevExpress.Analytics.Internal.updateSurfaceContentSize;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "updateSurfaceContentSize");
        Designer.unitsToPixel = DevExpress.Analytics.Utils.unitsToPixel;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "unitsToPixel");
        Designer.pixelToUnits = DevExpress.Analytics.Utils.pixelToUnits;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "pixelToUnits");
        Designer.createUnitProperty = DevExpress.Analytics.Utils.createUnitProperty;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createUnitProperty");
        Designer.createUnitProperties = DevExpress.Analytics.Utils.createUnitProperties;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createUnitProperties");
        Designer.validateName = DevExpress.Analytics.Internal.validateName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "validateName");
        Designer.replaceInvalidSymbols = DevExpress.Analytics.Internal.replaceInvalidSymbols;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "replaceInvalidSymbols");
        Designer.propertiesVisitor = DevExpress.Analytics.Utils.propertiesVisitor;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "propertiesVisitor");
        Designer.objectsVisitor = DevExpress.Analytics.Utils.objectsVisitor;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "objectsVisitor");
        Designer.collectionsVisitor = DevExpress.Analytics.Utils.collectionsVisitor;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "collectionsVisitor");
        Designer.copyObservables = DevExpress.Analytics.Utils.copyObservables;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "copyObservables");
        Designer.compareObjects = DevExpress.Analytics.Utils.compareObjects;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "compareObjects");
        Designer.getFullPath = DevExpress.Analytics.Utils.getFullPath;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "getFullPath");
        Designer.loadTemplates = DevExpress.Analytics.Utils.loadTemplates;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "loadTemplates");
        Designer.appendStaticContextToRootViewModel = DevExpress.Analytics.Utils.appendStaticContextToRootViewModel;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "appendStaticContextToRootViewModel");
        Designer.ajax = DevExpress.Analytics.Utils.ajax;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "ajax");
        Designer.checkModelReady = DevExpress.Analytics.Utils.checkModelReady;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "checkModelReady");
        Designer.cutRefs = DevExpress.Analytics.Utils.cutRefs;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "cutRefs");
        Designer.patchPositionByRTL = DevExpress.Analytics.Internal.patchPositionByRTL;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "patchPositionByRTL");
        Designer.generateDefaultParts = DevExpress.Analytics.Utils.generateDefaultParts;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "generateDefaultParts");
        Designer.createActionWrappingFunction = DevExpress.Analytics.Utils.createActionWrappingFunction;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createActionWrappingFunction");
        Designer.createDesigner = DevExpress.Analytics.Utils.createDesigner;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createDesigner");
        Designer.localizeNoneString = DevExpress.Analytics.Utils.localizeNoneString;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "localizeNoneString");
        Designer.find = DevExpress.Analytics.Utils.find;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "find");
        Designer.copyPasteStrategy = DevExpress.Analytics.Internal.copyPasteStrategy;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "copyPasteStrategy");
        Designer.getToolboxItems = DevExpress.Analytics.getToolboxItems;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics, "getToolboxItems");
        Designer.createObservableReverseArrayMapCollection = DevExpress.Analytics.Utils.createObservableReverseArrayMapCollection;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "createObservableReverseArrayMapCollection");
        Designer.editorTypeMapper = DevExpress.Analytics.Internal.editorTypeMapper;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "editorTypeMapper");
        Designer.NotifyType = DevExpress.Analytics.Utils.NotifyType;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "NotifyType");
        Designer.papperKindMapper = DevExpress.Analytics.Internal.papperKindMapper;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "papperKindMapper");
        Designer._errorProcessor = DevExpress.Analytics.Internal._errorProcessor;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "_errorProcessor");
        Designer.nameValidationRules = DevExpress.Analytics.Internal.nameValidationRules;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "nameValidationRules");
        Designer.sizeFake = DevExpress.Analytics.Internal.sizeFake;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "sizeFake");
        Designer.locationFake = DevExpress.Analytics.Internal.locationFake;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Internal, "locationFake");
        Designer.cssTransform = DevExpress.Analytics.Utils.cssTransform;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "cssTransform");
        Designer.DEBUG = DevExpress.Analytics.Utils.DEBUG;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "DEBUG");
        Designer.DesignerBaseElements = DevExpress.Analytics.Utils.DesignerBaseElements;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer, DevExpress.Analytics.Utils, "DesignerBaseElements");
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Widgets;
        (function (Widgets) {
            Widgets.left = DevExpress.Analytics.left;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "left");
            Widgets.right = DevExpress.Analytics.right;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "right");
            Widgets.top = DevExpress.Analytics.top;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "top");
            Widgets.bottom = DevExpress.Analytics.bottom;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "bottom");
            Widgets.paddingSerializationsInfo = DevExpress.Analytics.paddingSerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "paddingSerializationsInfo");
            Widgets.editorTemplates = DevExpress.Analytics.Widgets.coreEditorTemplates;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "coreEditorTemplates");
            Widgets.createNumericEditor = DevExpress.Analytics.Widgets.createNumericEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "createNumericEditor");
            var PaddingModel = (function (_super) {
                __extends(PaddingModel, _super);
                function PaddingModel() {
                    _super.apply(this, arguments);
                }
                return PaddingModel;
            })(DevExpress.Analytics.PaddingModel);
            Widgets.PaddingModel = PaddingModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics, "PaddingModel");
            var BordersModel = (function (_super) {
                __extends(BordersModel, _super);
                function BordersModel() {
                    _super.apply(this, arguments);
                }
                return BordersModel;
            })(DevExpress.Analytics.Widgets.BordersModel);
            Widgets.BordersModel = BordersModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "BordersModel");
            var ControlProperties = (function (_super) {
                __extends(ControlProperties, _super);
                function ControlProperties() {
                    _super.apply(this, arguments);
                }
                return ControlProperties;
            })(DevExpress.Analytics.Widgets.ControlProperties);
            Widgets.ControlProperties = ControlProperties;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "ControlProperties");
            var Group = (function (_super) {
                __extends(Group, _super);
                function Group() {
                    _super.apply(this, arguments);
                }
                return Group;
            })(DevExpress.Analytics.Widgets.Group);
            Widgets.Group = Group;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "Group");
            var ColorPickerEditor = (function (_super) {
                __extends(ColorPickerEditor, _super);
                function ColorPickerEditor() {
                    _super.apply(this, arguments);
                }
                return ColorPickerEditor;
            })(DevExpress.Analytics.Widgets.ColorPickerEditor);
            Widgets.ColorPickerEditor = ColorPickerEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "ColorPickerEditor");
            var DataMemberEditor = (function (_super) {
                __extends(DataMemberEditor, _super);
                function DataMemberEditor() {
                    _super.apply(this, arguments);
                }
                return DataMemberEditor;
            })(DevExpress.Analytics.Widgets.DataMemberEditor);
            Widgets.DataMemberEditor = DataMemberEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "DataMemberEditor");
            var FieldListEditor = (function (_super) {
                __extends(FieldListEditor, _super);
                function FieldListEditor() {
                    _super.apply(this, arguments);
                }
                return FieldListEditor;
            })(DevExpress.Analytics.Widgets.FieldListEditor);
            Widgets.FieldListEditor = FieldListEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Widgets, DevExpress.Analytics.Widgets, "FieldListEditor");
        })(Widgets = Designer.Widgets || (Designer.Widgets = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-designer-core.js.map