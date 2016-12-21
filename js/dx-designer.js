/*! DevExpress HTML/JS Designer - v16.1.9 - 2016-12-20
* http://www.devexpress.com
* Copyright (c) 2016 Developer Express Inc; Licensed Commercial */

var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
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
                    this.selectedIndex = ko.observable(null);
                    this.alwaysShow = ko.observable(false);
                    this.collapsed = ko.observable(options.collapsed !== false);
                    var addHandler = options.addHandler || options.info && options.info() && options.info()["addHandler"];
                    var hideButtons = options.hideButtons || options.info && options.info() && options.info()["hideButtons"];
                    this.displayPropertyName = options.info && options.info() && options.info()["displayPropertyName"] || options.displayName;
                    this.showButtons = ko.computed(function () {
                        return !ko.unwrap(hideButtons) && !_this.collapsed();
                    });
                    this.padding = options.level !== void 0 ? options.level * Widgets.propertiesGridEditorsPaddingLeft : 0;
                    this.displayName = options.displayName;
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
                        model.jQueryEvent.stopPropagation();
                    };
                    this.up = function (model) {
                        _this._move(options.values(), -1);
                        model.jQueryEvent.stopPropagation();
                    };
                    this.down = function (model) {
                        _this._move(options.values(), 1);
                        model.jQueryEvent.stopPropagation();
                    };
                    this.remove = function (model) {
                        if (_this.selectedIndex() >= 0) {
                            options.values().splice(_this.selectedIndex(), 1);
                            _this.selectedIndex(null);
                        }
                        model.jQueryEvent.stopPropagation();
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
                return CollectionEditorViewModel;
            })();
            Widgets.CollectionEditorViewModel = CollectionEditorViewModel;
            ko.bindingHandlers['dxCollectionEditor'] = {
                init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var values = valueAccessor(), gridViewModel = new CollectionEditorViewModel(values, viewModel.disabled), templateHtml = $(values.editorTemplate || '#dx-collectioneditor').text(), $templateHtml = $(templateHtml), itemTemplateName = values.info && values.info() && values.info()["template"] || values.template;
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
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
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
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            var editor_prefix = "dx-fileimage", EDITOR_INPUT_WRAPPER_CLASS = editor_prefix + "-input-wrapper";
            var dxFileImagePicker = (function (_super) {
                __extends(dxFileImagePicker, _super);
                function dxFileImagePicker(element, options) {
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
                        fr.onload = function (args) {
                            var encodedContent = fr.result.replace(/^data:[^,]+,/, '');
                            _this.option("value", encodedContent);
                        };
                        fr.readAsDataURL(file);
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
                    this.option("text", this.option("value") ? this.option("placeHolder") : DevExpress.JS.Utils.getLocalization("(none)"));
                    _super.prototype._renderValue.call(this);
                };
                return dxFileImagePicker;
            })(Widgets.dxEllipsisEditor);
            Widgets.dxFileImagePicker = dxFileImagePicker;
            DevExpress.registerComponent("dxFileImagePicker", dxFileImagePicker);
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            Widgets.availableFonts = {
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
            };
            Widgets.availableUnits = {
                "pt": "Point",
                "world": "World",
                "px": "Pixel",
                "in": "Inch",
                "doc": "Document",
                "mm": "Millimetr"
            };
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
                        Object.keys(Widgets.availableUnits).forEach(function (element) {
                            if (components[1].indexOf(element) != -1) {
                                self.size(parseFloat(components[1].split(element)[0]));
                                self.unit(element);
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
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        JS.Localization = {
            messages: {},
            addCultureInfo: function (json) {
                $.extend(JS.Localization.messages, json.messages);
            },
            localize: function (val) {
                return JS.Localization.messages[val];
            },
            parseDate: function (val) {
                if (val) {
                    if (val instanceof Date)
                        return val;
                    var enGlobalize = new window["Globalize"]("en");
                    var date = enGlobalize["parseDate"](val, { raw: "MM/dd/yyyy HH:mm:ss" });
                    if (!date)
                        date = enGlobalize["parseDate"](val, { raw: "yyyy-MM-dd" });
                    return date;
                }
                return null;
            }
        };
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            function getLocalization(value) {
                return DevExpress.JS.Localization && DevExpress.JS.Localization.localize(value) || value;
            }
            Utils.getLocalization = getLocalization;
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
            Utils.PopupService = PopupService;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        ko.virtualElements.allowedBindings["lazy"] = true;
        ko.bindingHandlers['lazy'] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var parsedBindings = valueAccessor();
                $.each(parsedBindings, function (innerBindingKey, innerBindingParameters) {
                    var innerBinding = ko.bindingHandlers[innerBindingKey];
                    setTimeout(function () {
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
                    }, 1);
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
                    var newCollapsed = options.alwaysShow && options.alwaysShow() ? false : !options.collapsed();
                    if (newCollapsed) {
                        options.collapsed(true);
                        $accordionContent.slideUp(options.timeout, function () {
                            scrollUpdateCallback();
                        });
                    }
                    else {
                        options.collapsed(false);
                        $accordionContent.slideDown(options.timeout, function () {
                            scrollUpdateCallback();
                        });
                    }
                });
                options.collapsed() ? $accordionContent.hide() : $accordionContent.show();
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
                options.displayExpr = function (value) {
                    if ($.isFunction(prevDisplayExpr)) {
                        return JS.Utils.getLocalization(prevDisplayExpr(value));
                    }
                    else {
                        return value ? JS.Utils.getLocalization(value[prevDisplayExpr]) : value;
                    }
                };
                ko.bindingHandlers["dxSelectBox"].init(element, function () { return options; }, allBindings, viewModel, bindingContext);
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
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
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
            Widgets.EditorAddOn = EditorAddOn;
            Widgets.propertiesGridEditorsPaddingLeft = 19;
            function compareEditorInfo(editor1, editor2) {
                return !!editor1 && !!editor2 &&
                    editor1.header === editor2.header
                    && editor1.content === editor2.content
                    && editor1.editorType === editor2.editorType;
            }
            var ObjectProperties = (function () {
                function ObjectProperties(target, editorsInfo, level, parentDisabled) {
                    var _this = this;
                    if (level === void 0) { level = 0; }
                    if (parentDisabled === void 0) { parentDisabled = ko.observable(false); }
                    this.level = 0;
                    this.rtl = DevExpress['config']()['rtlEnabled'];
                    this._editors = ko.observableArray([]);
                    this.level = level;
                    this._parentDisabled = parentDisabled;
                    ko.computed(function () {
                        var viewModel = target();
                        var serializationInfo = editorsInfo && editorsInfo.editors || viewModel && viewModel["getInfo"] && viewModel["getInfo"]();
                        _this._createEditors(viewModel, serializationInfo);
                        _this.update(viewModel);
                    });
                }
                ObjectProperties.prototype.update = function (viewModel) {
                    if (viewModel) {
                        this._editors().forEach(function (editor) {
                            editor.update(viewModel);
                        });
                    }
                };
                ObjectProperties.prototype.createEditor = function (modelPropertyInfo) {
                    var editorType = modelPropertyInfo.editor && modelPropertyInfo.editor.editorType || Editor;
                    return new editorType(modelPropertyInfo, this.level, this._parentDisabled);
                };
                ObjectProperties.prototype.createEditors = function (serializationInfo) {
                    var _this = this;
                    var self = this;
                    return (serializationInfo || [])
                        .filter(function (info) { return !!info.editor && self._editors().filter(function (editor) { return editor.name === info.propertyName && compareEditorInfo(editor.info().editor, info.editor); }).length === 0; })
                        .map(function (info) { return _this.createEditor(info); });
                };
                ObjectProperties.prototype._createEditors = function (target, serializationInfo) {
                    var _this = this;
                    if (!serializationInfo)
                        return false;
                    this.createEditors(serializationInfo).forEach(function (editor) { return _this._editors.push(editor); });
                    var propertyNames = serializationInfo.map(function (info) { return info.propertyName; });
                    this._editors.sort(function (a, b) {
                        return propertyNames.indexOf(a.name) - propertyNames.indexOf(b.name);
                    });
                };
                ObjectProperties.prototype.getEditors = function () {
                    return this._editors();
                };
                return ObjectProperties;
            })();
            Widgets.ObjectProperties = ObjectProperties;
            var Editor = (function () {
                function Editor(modelPropertyInfo, level, parentDisabled) {
                    var _this = this;
                    if (parentDisabled === void 0) { parentDisabled = ko.observable(false); }
                    this._model = ko.observable();
                    this.isVisibleByContent = ko.observable(true);
                    this.rtl = DevExpress["config"]()["rtlEnabled"];
                    this.isEditorSelected = ko.observable(false);
                    this.isPropertyModified = ko.computed(function () {
                        return _this._model() && _this._model().isPropertyModified && _this._model().isPropertyModified(_this.name);
                    });
                    this.collapsed = ko.observable(true);
                    this.info = ko.observable(modelPropertyInfo);
                    this.displayName = ko.computed(function () { return _this.info() && _this.info().displayName; });
                    this.padding = this._setPadding(this.rtl ? "right" : "left", level * Widgets.propertiesGridEditorsPaddingLeft);
                    var defaultValue = ko.observable(null), propertyName = modelPropertyInfo.propertyName;
                    this["localizationId"] = modelPropertyInfo.localizationId;
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
                        var _values = _this.info().valueStore;
                        if (_values) {
                            return _values;
                        }
                        _values = _this.info().values;
                        if (_values) {
                            return $.map(_values, function (displayValue, value) {
                                return { value: value, displayValue: displayValue };
                            });
                        }
                        _values = _this.info().valuesArray;
                        if (_values) {
                            return $.map(_values, function (value) {
                                return { value: value.value, displayValue: value.displayValue };
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
                        var model = _this._model(), result = (model && model.isPropertyVisible) ? model.isPropertyVisible(_this.name) : _this.isVisibleByContent();
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
                    this.value = ko.computed({
                        read: function () {
                            var model = _this._model();
                            var modelValue = model && model[name] !== undefined ? model[name] : value;
                            if (ko.isObservable(modelValue) && !modelValue["push"]) {
                                var hasValueInModel = modelValue() !== undefined && modelValue() !== null;
                                return hasValueInModel ? modelValue() : _this.defaultValue;
                            }
                            else {
                                return modelValue;
                            }
                        },
                        write: function (val) {
                            var model = _this._model();
                            if (!model) {
                                return;
                            }
                            var modelValue = model[name];
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
                    var modelInfo = viewModel["getInfo"] && viewModel["getInfo"]();
                    if (modelInfo) {
                        return modelInfo.filter(function (property) { return property.propertyName === _this.name; })[0];
                    }
                    return null;
                };
                Editor.prototype.updateInfo = function (propertyInfo) {
                    if (propertyInfo && compareEditorInfo(propertyInfo.editor, this.info().editor)) {
                        this.info(propertyInfo);
                        return true;
                    }
                    return !propertyInfo;
                };
                Editor.prototype.update = function (viewModel) {
                    var propertyInfo = this.findInfo(viewModel);
                    this.isVisibleByContent(viewModel[this.name] !== undefined && this.updateInfo(propertyInfo));
                    this._model(this.isVisibleByContent() ? viewModel : null);
                };
                Editor.prototype.localizingDisplayName = function () {
                    return this["localizationId"] ? (DevExpress.JS.Localization.localize(this["localizationId"]) || this.displayName()) : DevExpress.JS.Utils.getLocalization(this.displayName());
                };
                Object.defineProperty(Editor.prototype, "validationRules", {
                    get: function () {
                        return !!this.info && !!this.info() && this.info().validationRules || [];
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
            var PropertyGridEditor = (function (_super) {
                __extends(PropertyGridEditor, _super);
                function PropertyGridEditor(info, level, parentDisabled) {
                    var _this = this;
                    _super.call(this, info, level, parentDisabled);
                    this.editorCreated = ko.observable(false);
                    this.collapsed.subscribe(function () {
                        if (!_this.editorCreated()) {
                            _this.viewmodel = new ObjectProperties(_this.value, { editors: info.info }, level + 1, _this.disabled);
                            _this.editorCreated(true);
                        }
                    });
                    this.viewmodel = {};
                }
                return PropertyGridEditor;
            })(Editor);
            Widgets.PropertyGridEditor = PropertyGridEditor;
            var FontEditor = (function (_super) {
                __extends(FontEditor, _super);
                function FontEditor(info, level, parentDisabled) {
                    _super.call(this, info, level, parentDisabled);
                    var model = new Widgets.FontModel(this.value);
                    var grid = new ObjectProperties(ko.observable(model), { editors: Widgets.fontInfo }, level + 1, this.disabled);
                    this.viewmodel = grid;
                }
                return FontEditor;
            })(Editor);
            Widgets.FontEditor = FontEditor;
            Widgets.editorTemplates = {
                color: { header: "dx-color" },
                bool: { header: "dx-boolean" },
                boolSelect: { header: "dx-boolean-select" },
                numeric: { header: "dx-numeric" },
                date: { header: "dx-date" },
                modificators: { custom: "dx-modificators" },
                font: { header: "dx-emptyHeader", content: "dx-objectEditorContent", editorType: FontEditor },
                combobox: { header: "dx-combobox" },
                comboboxEditable: { header: "dx-combobox-editable" },
                text: { header: "dx-text" },
                image: { header: "dx-image" },
                file: { header: "dx-file" },
                objecteditor: { header: "dx-emptyHeader", content: "dx-objectEditorContent", editorType: PropertyGridEditor },
                commonCollection: { custom: "dx-commonCollection" },
                stringArray: { header: "dx-emptyHeader", content: "dx-string-array" }
            };
            Widgets.fontInfo = [
                {
                    propertyName: "family", displayName: "Font Name",
                    editor: Widgets.editorTemplates.combobox, values: Widgets.availableFonts
                },
                { propertyName: "size", displayName: "Size", editor: Widgets.editorTemplates.numeric },
                {
                    propertyName: "unit", displayName: "Unit", editor: Widgets.editorTemplates.combobox,
                    values: Widgets.availableUnits
                },
                { propertyName: "modificators", editor: Widgets.editorTemplates.modificators },
            ];
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-propertygrid.js.map
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
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
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            function deserializeArray(model, creator) {
                var result = [];
                Utils.getPropertyValues(model).forEach(function (item) {
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
            var ModelSerializer = (function () {
                function ModelSerializer(options) {
                    this._refTable = {};
                    this._linkTable = {};
                    this._options = Utils.extend({
                        useRefs: true,
                        serializeDate: serializeDate
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
                                var object = {};
                                _this.deserialize(object, item || {}, modelPropertyInfo.info);
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
                        var object = {};
                        this.deserialize(object, modelValue || {}, modelPropertyInfo.info);
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
                        viewModel[propertyName] = _this.deserializeProperty(modelPropertyInfo, model);
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
                ModelSerializer.prototype._serialize = function (viewModel, serializationsInfo, refs) {
                    var _this = this;
                    var result = Utils.extend({}, viewModel._model), isInitial = refs === null;
                    refs = refs || { linkObjTable: [], objects: [] };
                    serializationsInfo = viewModel.getInfo ? viewModel.getInfo() : serializationsInfo;
                    delete result["@Ref"];
                    if (viewModel["isEmpty"] && viewModel["isEmpty"]())
                        return;
                    serializationsInfo.forEach(function (modelPropertyInfo) {
                        var propertyName = modelPropertyInfo.propertyName, value = ko.unwrap(viewModel["_" + propertyName] || viewModel[propertyName]), defaultVal = modelPropertyInfo.defaultVal;
                        var resultValue = {};
                        if (!modelPropertyInfo.modelName) {
                            return;
                        }
                        if ((value !== undefined && value !== null) && ((Utils.isPlainObject(value) || !Utils.isEmptyObject(value)) || (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && !Utils.isPlainObject(value))) && (value !== defaultVal)) {
                            if (modelPropertyInfo.link) {
                                refs.linkObjTable.push({
                                    obj: value,
                                    setRef: function (index) {
                                        result[modelPropertyInfo.modelName] = "#Ref-" + index;
                                    }
                                });
                            }
                            else if (modelPropertyInfo.array) {
                                resultValue = {};
                                var index = 1;
                                value.forEach(function (item) {
                                    var info = modelPropertyInfo.info || null;
                                    var item_ = _this._serialize(item, info, refs);
                                    if (item_) {
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
                            if ((Utils.isPlainObject(resultValue) && !Utils.isEmptyObject(resultValue)) || (Array.isArray(resultValue) && resultValue["length"] > 0) || (!Array.isArray(resultValue) && !Utils.isPlainObject(resultValue))) {
                                result[modelPropertyInfo.modelName] = resultValue;
                            }
                        }
                    });
                    if (isInitial) {
                        refs.linkObjTable.forEach(function (item) {
                            var refValue = refs.objects.indexOf(item.obj);
                            if (refValue !== -1) {
                                item.setRef(refValue.toString());
                            }
                        });
                    }
                    return result;
                };
                return ModelSerializer;
            })();
            Utils.ModelSerializer = ModelSerializer;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-serializer.js.map
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            function checkModelReady(model) {
                return model.isModelReady ? model.isModelReady() : true;
            }
            Utils.DEBUG = true;
            function NotifyAboutWarning(msg) {
                if (Utils.DEBUG) {
                    throw new Error(msg);
                }
                else {
                    console.warn(msg);
                }
            }
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
                                if (propertyName.indexOf("_") !== 0) {
                                    var realPropertyName = propertyName;
                                    if (ko.isWriteableObservable(target["_" + propertyName])) {
                                        realPropertyName = "_" + realPropertyName;
                                    }
                                    if (!ko.isComputed(target[realPropertyName])) {
                                        if (!ko.isObservable(target[realPropertyName])) {
                                            this._createDisposeFunction(target[realPropertyName], info[i].info);
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
                            else
                                NotifyAboutWarning("Unsupported array modification status: " + changeSet.arrayChanges[i].status);
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
                            else
                                NotifyAboutWarning("Unsupported array modification status: " + changeSet.arrayChanges[i].status);
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
                    val && val[this._disposeUndoEngineSubscriptionsName] && val[this._disposeUndoEngineSubscriptionsName].func();
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
                        propertiesVisitor(target, function (properties) { _this.subscribeProperties(properties); }, this._visited, this._ignoredProperties);
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
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-undoengine.js.map
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            var Disposable = (function () {
                function Disposable() {
                    this._disposables = [];
                    this.isDisposing = false;
                }
                Disposable.prototype.dispose = function () {
                    this.isDisposing = true;
                    ko.utils.arrayForEach(this._disposables, this.disposeOne);
                    this._disposables = [];
                };
                Disposable.prototype.disposeOne = function (propOrValue, value) {
                    var disposable = value || propOrValue;
                    if (disposable && !disposable.isDisposing && typeof disposable.dispose === "function") {
                        disposable.dispose();
                    }
                };
                return Disposable;
            })();
            Utils.Disposable = Disposable;
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Data;
        (function (Data) {
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
                        var result = reverse ? new UnaryOperator(UnaryOperatorType.Minus, operand) : operand;
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
                        return window["criteriaparser"].parse(stringCriteria);
                    }
                    return null;
                };
                CriteriaOperator.create = function (operatorType) {
                    var operator = null;
                    switch (operatorType.type) {
                        case BinaryOperatorType:
                            operator = new BinaryOperator(new OperandProperty(), new OperandValue(), operatorType.value);
                            break;
                        case GroupOperatorType:
                            operator = new GroupOperator(operatorType.value, []);
                            break;
                        case FunctionOperatorType:
                            operator = new FunctionOperator(operatorType.value, [new OperandProperty()]);
                            break;
                        case BetweenOperator:
                            operator = new BetweenOperator(new OperandProperty(), new OperandValue(), new OperandValue());
                            break;
                        case InOperator:
                            operator = new InOperator(new OperandProperty(), [new OperandValue()]);
                            break;
                        case UnaryOperatorType:
                            operator = new UnaryOperator(operatorType.value, new OperandProperty());
                            break;
                        case Aggregate:
                            var result = new AggregateOperand(new OperandProperty(), null, operatorType.value, new GroupOperator(GroupOperatorType.And, []));
                            if (operatorType.value === Aggregate.Exists) {
                                operator = result;
                            }
                            else {
                                if (operatorType.value !== Aggregate.Count) {
                                    result.aggregatedExpression = new OperandProperty();
                                }
                                operator = new BinaryOperator(result, new OperandValue(), BinaryOperatorType.Equal);
                            }
                            break;
                        default:
                            throw Error("Unsupported operator type");
                    }
                    if (operatorType.reverse) {
                        return new UnaryOperator(UnaryOperatorType.Not, operator);
                    }
                    return operator;
                };
                CriteriaOperator.and = function (left, right) {
                    return GroupOperator.combine(GroupOperatorType.Or, [left, right]);
                };
                CriteriaOperator.or = function (left, right) {
                    return GroupOperator.combine(GroupOperatorType.Or, [left, right]);
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
                    if (criteriaOperator instanceof UnaryOperator && !(criteriaOperator.leftPart instanceof OperandProperty)) {
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
                return CriteriaOperator;
            })();
            Data.CriteriaOperator = CriteriaOperator;
            function getEnumNames(enumType) {
                var result = [];
                for (var enumValue in enumType) {
                    if (isNaN(enumValue)) {
                        result.push(enumValue);
                    }
                }
                return result;
            }
            (function (GroupOperatorType) {
                GroupOperatorType[GroupOperatorType["And"] = 0] = "And";
                GroupOperatorType[GroupOperatorType["Or"] = 1] = "Or";
            })(Data.GroupOperatorType || (Data.GroupOperatorType = {}));
            var GroupOperatorType = Data.GroupOperatorType;
            var GroupOperator = (function (_super) {
                __extends(GroupOperator, _super);
                function GroupOperator(operation, operands) {
                    var _this = this;
                    _super.call(this);
                    this.create = function (isGroup, property, specifics) {
                        var operator = new BinaryOperator(property, new OperandValue(""), BinaryOperatorType.Equal);
                        if (isGroup) {
                            operator = new GroupOperator(GroupOperatorType.And, []);
                        }
                        else if (specifics && specifics === "list") {
                            operator = new AggregateOperand(property, null, Aggregate.Exists, new GroupOperator(GroupOperatorType.And, []));
                        }
                        _this.operands.push(operator);
                        return _this.operands[_this.operands.indexOf(operator)];
                    };
                    this.change = function (operationType, item, incorrectSpecificsForAggregate) {
                        if (incorrectSpecificsForAggregate === void 0) { incorrectSpecificsForAggregate = false; }
                        var position = _this.operands.indexOf(item);
                        if (position !== -1) {
                            var operator = CriteriaOperator.create(operationType);
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
                    operands = operands || [new CriteriaOperator(), new CriteriaOperator()];
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
                    return new GroupOperator(operation, combinedOperands);
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
                return GroupOperator;
            })(CriteriaOperator);
            Data.GroupOperator = GroupOperator;
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
                return OperandProperty;
            })(CriteriaOperator);
            Data.OperandProperty = OperandProperty;
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
                        result = JS.Localization.parseDate(result);
                        if (!result) {
                            result = JS.Localization.parseDate(value.slice(1, value.length - 1));
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
            })(CriteriaOperator);
            Data.OperandValue = OperandValue;
            var ConstantValue = (function (_super) {
                __extends(ConstantValue, _super);
                function ConstantValue(value) {
                    _super.call(this, value);
                }
                return ConstantValue;
            })(OperandValue);
            Data.ConstantValue = ConstantValue;
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
                return OperandParameter;
            })(OperandValue);
            Data.OperandParameter = OperandParameter;
            (function (Aggregate) {
                Aggregate[Aggregate["Count"] = 0] = "Count";
                Aggregate[Aggregate["Exists"] = 1] = "Exists";
                Aggregate[Aggregate["Min"] = 2] = "Min";
                Aggregate[Aggregate["Max"] = 3] = "Max";
                Aggregate[Aggregate["Avg"] = 4] = "Avg";
                Aggregate[Aggregate["Sum"] = 5] = "Sum";
                Aggregate[Aggregate["Single"] = 6] = "Single";
            })(Data.Aggregate || (Data.Aggregate = {}));
            var Aggregate = Data.Aggregate;
            var AggregateOperand = (function (_super) {
                __extends(AggregateOperand, _super);
                function AggregateOperand(property, aggregatedExpression, aggregateType, condition) {
                    var _this = this;
                    _super.call(this);
                    this.change = function (operationType, item) {
                        var operator = null;
                        if (operationType.type === GroupOperatorType) {
                            operator = CriteriaOperator.create(operationType);
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
                            if (CriteriaOperator instanceof AggregateOperand) {
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
                    if (condition instanceof GroupOperator) {
                        this.condition = condition;
                    }
                    else {
                        if (condition instanceof UnaryOperator && condition.operatorType === UnaryOperatorType.Not) {
                            if (condition.operand instanceof GroupOperator) {
                                this.condition = new UnaryOperator(UnaryOperatorType.Not, condition.operand);
                            }
                            else {
                                this.condition = new UnaryOperator(UnaryOperatorType.Not, new GroupOperator(GroupOperatorType.And, condition.operand ? [condition.operand] : []));
                            }
                        }
                        else {
                            this.condition = new GroupOperator(GroupOperatorType.And, condition ? [condition] : []);
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
                    this.property && operands.push(this.property);
                    this.aggregatedExpression && operands.push(this.aggregatedExpression);
                    this.condition && operands.push(this.condition);
                    return operands;
                };
                return AggregateOperand;
            })(CriteriaOperator);
            Data.AggregateOperand = AggregateOperand;
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
                        return new AggregateOperand(collectionProperty, aggregated, type, condition);
                    }
                    else {
                        return new JoinOperand(collectionProperty.propertyName.substring(1, collectionProperty.propertyName.length - 2), condition, type, aggregated);
                    }
                };
                return JoinOperand;
            })(CriteriaOperator);
            Data.JoinOperand = JoinOperand;
            var BetweenOperator = (function (_super) {
                __extends(BetweenOperator, _super);
                function BetweenOperator(property, begin, end) {
                    var _this = this;
                    _super.call(this);
                    this.resetRightPart = function (newVal) {
                        _this.begin = new OperandValue(newVal);
                        _this.end = new OperandValue(newVal);
                    };
                    this.assignLeftPart = function (criteriaOperator) {
                        _this.property = criteriaOperator.leftPart;
                    };
                    this.assignRightPart = function (criteriaOperator) {
                        if (criteriaOperator.rightPart.length !== null && criteriaOperator.rightPart.length !== undefined) {
                            if (criteriaOperator.rightPart.length) {
                                _this.begin = criteriaOperator.rightPart[0];
                                _this.end = criteriaOperator.rightPart.length > 1 ? criteriaOperator.rightPart[1] : new OperandValue();
                            }
                            else {
                                _this.begin = new OperandValue();
                                _this.end = new OperandValue();
                            }
                        }
                        else {
                            _this.begin = criteriaOperator.rightPart;
                            _this.end = new OperandValue();
                        }
                    };
                    this.operatorType = "Between";
                    this.type = "Between";
                    this.property = property;
                    this.begin = begin || new OperandValue();
                    this.end = end || new OperandValue();
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
                return BetweenOperator;
            })(CriteriaOperator);
            Data.BetweenOperator = BetweenOperator;
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
                    this.criteriaOperator = criteriaOperator || new CriteriaOperator();
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
                return InOperator;
            })(CriteriaOperator);
            Data.InOperator = InOperator;
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
            })(Data.BinaryOperatorType || (Data.BinaryOperatorType = {}));
            var BinaryOperatorType = Data.BinaryOperatorType;
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
                    this.leftOperand = left || new CriteriaOperator();
                    this.rightOperand = right || new CriteriaOperator();
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
                        return Data.operatorTokens[BinaryOperatorType[this.operatorType]] || BinaryOperatorType[this.operatorType];
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
                return BinaryOperator;
            })(CriteriaOperator);
            Data.BinaryOperator = BinaryOperator;
            (function (UnaryOperatorType) {
                UnaryOperatorType[UnaryOperatorType["Minus"] = 0] = "Minus";
                UnaryOperatorType[UnaryOperatorType["Plus"] = 1] = "Plus";
                UnaryOperatorType[UnaryOperatorType["BitwiseNot"] = 2] = "BitwiseNot";
                UnaryOperatorType[UnaryOperatorType["Not"] = 3] = "Not";
                UnaryOperatorType[UnaryOperatorType["IsNull"] = 4] = "IsNull";
            })(Data.UnaryOperatorType || (Data.UnaryOperatorType = {}));
            var UnaryOperatorType = Data.UnaryOperatorType;
            var UnaryOperator = (function (_super) {
                __extends(UnaryOperator, _super);
                function UnaryOperator(operatorType, operand) {
                    _super.call(this);
                    this.type = "Unary";
                    this.operand = operand || new CriteriaOperator();
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
                return UnaryOperator;
            })(CriteriaOperator);
            Data.UnaryOperator = UnaryOperator;
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
            })(Data.FunctionOperatorType || (Data.FunctionOperatorType = {}));
            var FunctionOperatorType = Data.FunctionOperatorType;
            var FunctionOperator = (function (_super) {
                __extends(FunctionOperator, _super);
                function FunctionOperator(operatorType, operands) {
                    var _this = this;
                    _super.call(this);
                    this.toString = function (reverse) {
                        var result = (Data.operatorTokens[_this.displayType] || _this.displayType) + '(' + _this.operands.map(function (operand) {
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
                                    _this.operands.push(new OperandValue());
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
                    operands = operands || [new CriteriaOperator()];
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
                return FunctionOperator;
            })(CriteriaOperator);
            Data.FunctionOperator = FunctionOperator;
            Data.operatorTokens = {
                "Plus": "+",
                "Minus": "-",
                "Equal": "=",
                "NotEqual": "<>",
                "Greater": ">",
                "Less": "<",
                "LessOrEqual": "<=",
                "GreaterOrEqual": ">="
            };
            function criteriaForEach(operator, callback) {
                callback(operator);
                operator.children().forEach(function (item) { return criteriaForEach(item, callback); });
            }
            Data.criteriaForEach = criteriaForEach;
        })(Data = JS.Data || (JS.Data = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            var PathRequest = (function () {
                function PathRequest(fullPath) {
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
            Widgets.PathRequest = PathRequest;
            var TreeListItemViewModel = (function () {
                function TreeListItemViewModel(options, path, hasItems, onItemsVisibilityChanged, rtl) {
                    var _this = this;
                    if (path === void 0) { path = ""; }
                    if (hasItems === void 0) { hasItems = true; }
                    if (onItemsVisibilityChanged === void 0) { onItemsVisibilityChanged = $.noop; }
                    if (rtl === void 0) { rtl = false; }
                    this._rtl = false;
                    this.level = -1;
                    this.hasItems = true;
                    this.items = ko.observableArray();
                    this.collapsed = ko.observable(true);
                    this.data = null;
                    this.isSelected = ko.observable(false);
                    this._path = path;
                    this._rtl = rtl;
                    this.hasItems = hasItems;
                    this._treeListController = options.treeListController;
                    this._templateName = options.templateName;
                    this._onItemsVisibilityChanged = onItemsVisibilityChanged;
                    this.dragDropHandler = options.treeListController.dragDropHandler;
                    this.getItems = function () {
                        return _this._loadItems(options);
                    };
                    this.toggleSelected = function () {
                        if (_this._treeListController.canSelect(_this)) {
                            options.treeListController["clickHandler"] && options.treeListController["clickHandler"](_this);
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
                TreeListItemViewModel.prototype._getImageClassName = function (field) {
                    return ko.computed(function () {
                        return "dx-image-fieldlist-" + (ko.unwrap(field.specifics) || "default").toLowerCase();
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
                TreeListItemViewModel.prototype._loadItems = function (options) {
                    var _this = this;
                    var deferred = $.Deferred();
                    if (this._loader) {
                        this._loader.dispose();
                    }
                    var promise = ko.observable();
                    promise.subscribe(function (value) {
                        if (!value)
                            return;
                        value.done(function (data) {
                            var _data = data;
                            _this.items.peek().forEach(function (item) { return item.dispose(); });
                            _this.items($.map(_data, function (item) {
                                var newItem = new TreeListItemViewModel(options, _this.path, options.treeListController.hasItems(item), _this._onItemsVisibilityChanged, _this._rtl);
                                newItem.data = item;
                                newItem.level = _this.level + 1;
                                newItem.padding = _this._applyPadding(_this._rtl ? "right" : "left", 20 * newItem.level + 12);
                                newItem.imageClassName = _this._getImageClassName(item);
                                return newItem;
                            }));
                            _this.nodeImageClass(_this.items.peek().filter(function (x) { return x.visible; }).length > 0 ? "dx-collapsing-image dx-image-expanded" : "dx-image-leaf-node");
                            deferred.resolve(_this.items.peek());
                            var selectedPath = options.selectedPath.peek();
                            if (selectedPath) {
                                var item2Select = _this.items.peek().filter(function (item) { return selectedPath.indexOf(item.path) === 0; })[0];
                                if (item2Select) {
                                    _this._selectItem(item2Select.name + selectedPath.substring(item2Select.path.length));
                                }
                            }
                        });
                    });
                    this._loader = ko.computed(function () {
                        promise(options.itemsProvider.getItems(new PathRequest(_this.path)));
                    });
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
                Object.defineProperty(TreeListItemViewModel.prototype, "name", {
                    get: function () {
                        return this.data && this.data.name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TreeListItemViewModel.prototype, "path", {
                    get: function () {
                        if (this.name) {
                            return !ko.unwrap(this._path) ? ko.unwrap(this.name) : ko.unwrap(this._path) + "." + ko.unwrap(this.name);
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
                TreeListItemViewModel.prototype.dispose = function () {
                    if (this._loader) {
                        this._loader.dispose();
                    }
                    this.items().forEach(function (item) { return item.dispose(); });
                };
                Object.defineProperty(TreeListItemViewModel.prototype, "visible", {
                    get: function () {
                        return !this._treeListController.itemsFilter || this._treeListController.itemsFilter(this.data, this.path);
                    },
                    enumerable: true,
                    configurable: true
                });
                return TreeListItemViewModel;
            })();
            Widgets.TreeListItemViewModel = TreeListItemViewModel;
            var TreeListRootItemViewModel = (function (_super) {
                __extends(TreeListRootItemViewModel, _super);
                function TreeListRootItemViewModel(options, path, hasItems, onItemsVisibilityChanged, rtl) {
                    var _this = this;
                    if (path === void 0) { path = ""; }
                    if (hasItems === void 0) { hasItems = true; }
                    if (onItemsVisibilityChanged === void 0) { onItemsVisibilityChanged = $.noop; }
                    if (rtl === void 0) { rtl = false; }
                    _super.call(this, options, path, hasItems, onItemsVisibilityChanged, rtl);
                    var selectedPathSubscriptions = options.selectedPath.subscribe(function (newPath) {
                        _this._selectItem(!!_this.path ? newPath.substr(_this.path.length + 1) : newPath);
                    });
                    this._selectItem(!!this.path ? this.path + "." + options.selectedPath() : options.selectedPath());
                    this.dispose = function () {
                        selectedPathSubscriptions.dispose();
                        _super.prototype.dispose.call(_this);
                    };
                }
                return TreeListRootItemViewModel;
            })(TreeListItemViewModel);
            Widgets.TreeListRootItemViewModel = TreeListRootItemViewModel;
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
            ko.bindingHandlers['treelist'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var treeListViewModel = null;
                    var values = valueAccessor(), options = ko.unwrap(values), updateScrollBar = function () {
                        var $scrollView = $(element).closest(".dx-scrollview");
                        if ($scrollView.data("dxScrollView")) {
                            var scrollView = $scrollView.dxScrollView("instance");
                            scrollView && scrollView["update"]();
                        }
                        if (options.onItemsVisibilityChanged) {
                            options.onItemsVisibilityChanged();
                        }
                    }, updateTreeList = function (options) {
                        options.treeListController = options.treeListController ? options.treeListController : new TreeListController();
                        if (!options.treeListController.dragDropHandler) {
                            options.treeListController.dragDropHandler = bindingContext.$root.fieldDragHandler;
                        }
                        treeListViewModel && treeListViewModel.dispose();
                        if (!options.rtl) {
                            options.rtl = $(element).closest('.dx-rtl').length > 0;
                        }
                        treeListViewModel = new TreeListRootItemViewModel(options, options.path, true, updateScrollBar, options.rtl);
                        var templateHtml = $('#dx-treelist').text() || options.templateHtml, $element = $(element).html(templateHtml);
                        var childContext = bindingContext.createChildContext(treeListViewModel.items);
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
                    });
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            var FilterEditorHelper = (function () {
                function FilterEditorHelper(serializer) {
                    this.rtl = false;
                    this.parameters = ko.observable(null);
                    this.canSelectLists = true;
                    this.canCreateParameters = false;
                    this.canChoiceParameters = true;
                    this.canChoiceProperty = true;
                    this.handlers = {
                        create: function (criteria, popupService) {
                            return {
                                data: new FilterEditorAddOn(criteria, popupService, "create", "createItems"),
                                templateName: "dx-filtereditor-create"
                            };
                        },
                        change: function (criteria, popupService) {
                            return {
                                data: new FilterEditorAddOn(criteria, popupService, "change", "items"),
                                templateName: "dx-filtereditor-change"
                            };
                        },
                        changeProperty: function (criteria, popupService) {
                            return {
                                data: new FilterEditorAddOn(criteria, popupService, "changeProperty", "items", "dx-filtereditor-popup-treelist"),
                                templateName: "dx-filtereditor-changeProperty"
                            };
                        },
                        changeValueType: function (criteria, popupService) {
                            return {
                                data: new FilterEditorAddOn(criteria, popupService, "changeValueType", "changeTypeItems"),
                                templateName: "dx-filtereditor-changeValueType"
                            };
                        },
                        changeParameter: function (criteria, popupService) {
                            return {
                                data: new FilterEditorAddOn(criteria, popupService, "changeParameter", "items"),
                                templateName: "dx-filtereditor-changeParameter"
                            };
                        }
                    };
                    this.mapper = {
                        Aggregate: AggregateOperandSurface,
                        Property: OperandPropertySurface,
                        Parameter: OperandParameterSurface,
                        Value: OperandValueSurface,
                        Group: GroupOperandSurface,
                        Between: BetweenOperandSurface,
                        Binary: BinaryOperandSurface,
                        Function: FunctionOperandSurface,
                        In: InOperandSurface,
                        Unary: UnaryOperandSurface,
                        Default: CriteriaOperatorSurface
                    };
                    this.serializer = serializer || new FilterEditorSerializer();
                }
                FilterEditorHelper.prototype.generateTreelistOptions = function (fieldListProvider, path) {
                    var _this = this;
                    var treeListOptions = ko.observable(null);
                    var selected = ko.observable(null);
                    ko.computed(function () {
                        treeListOptions({
                            itemsProvider: ko.unwrap(fieldListProvider),
                            selectedPath: ko.observable(""),
                            selected: selected,
                            path: ko.unwrap(path),
                            treeListController: new FilterEditorTreeListController(selected),
                            rtl: _this.rtl
                        });
                    });
                    return treeListOptions;
                };
                return FilterEditorHelper;
            })();
            Widgets.FilterEditorHelper = FilterEditorHelper;
            var FilterStringOptions = (function () {
                function FilterStringOptions(filterString, dataMember, disabled) {
                    var _this = this;
                    this.popupContainer = ".dx-viewport";
                    this.itemsProvider = null;
                    this.resetValue = function () {
                        _this.value("");
                    };
                    this.value = filterString;
                    this.path = dataMember || ko.observable("");
                    this.disabled = disabled || ko.observable(false);
                    this.helper = new FilterEditorHelper();
                }
                return FilterStringOptions;
            })();
            Widgets.FilterStringOptions = FilterStringOptions;
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
                            click: function (data) { viewModel[_this._action](data); _this._popupService.visible(false); },
                        });
                    }
                };
                return FilterEditorAddOn;
            })();
            Widgets.FilterEditorAddOn = FilterEditorAddOn;
            var FilterEditorSerializer = (function () {
                function FilterEditorSerializer(operatorTokens) {
                    if (operatorTokens === void 0) { operatorTokens = JS.Data.operatorTokens; }
                    this.operatorTokens = operatorTokens;
                }
                FilterEditorSerializer.prototype.serializeGroupOperand = function (groupOperator, reverse) {
                    var _this = this;
                    var result = groupOperator.operands.map(function (operand) {
                        if (operand instanceof JS.Data.GroupOperator) {
                            return "(" + _this.serialize(operand) + ")";
                        }
                        else {
                            return _this.serialize(operand);
                        }
                    }).filter(function (serialize) { return serialize !== "" && serialize !== "()"; }).join(' ' + (this.operatorTokens[groupOperator.displayType] || groupOperator.displayType) + ' ');
                    return reverse && result ? "Not(" + result + ")" : result;
                };
                FilterEditorSerializer.prototype.serializeAggregateOperand = function (aggregateOperand, reverse) {
                    var operatorTypeSuffix = aggregateOperand.operatorType === JS.Data.Aggregate.Exists ? "" : "." + JS.Data.Aggregate[aggregateOperand.operatorType];
                    var condition = aggregateOperand.condition ? this.serialize(aggregateOperand.condition) : "";
                    var result = this.serialize(aggregateOperand.property) + '[' + condition + ']';
                    var aggregateSuffix = aggregateOperand.operatorType !== JS.Data.Aggregate.Exists ?
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
                        return "#" + JS.Utils.serializeDate(result) + "#";
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
                    if (unaryOperator.operatorType === JS.Data.UnaryOperatorType.IsNull) {
                        var separator = reverse ? " Not " : " ";
                        return this.serialize(unaryOperator.operand) + " Is" + separator + "Null";
                    }
                    else if (unaryOperator.operatorType === JS.Data.UnaryOperatorType.Not) {
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
                    if (criteriaOperator instanceof JS.Data.AggregateOperand) {
                        return this.serializeAggregateOperand(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.BetweenOperator) {
                        return this.serializeBetweenOperator(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.BinaryOperator) {
                        return this.serializeBinaryOperator(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.ConstantValue) {
                        return this.serializeOperandValue(criteriaOperator);
                    }
                    if (criteriaOperator instanceof JS.Data.FunctionOperator) {
                        return this.serializeFunctionOperator(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.GroupOperator) {
                        return this.serializeGroupOperand(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.InOperator) {
                        return this.serializeInOperator(criteriaOperator, reverse);
                    }
                    if (criteriaOperator instanceof JS.Data.OperandParameter) {
                        return this.serializeOperandParameter(criteriaOperator);
                    }
                    if (criteriaOperator instanceof JS.Data.OperandProperty) {
                        return this.serializeOperandProperty(criteriaOperator);
                    }
                    if (criteriaOperator instanceof JS.Data.OperandValue) {
                        return this.serializeOperandValue(criteriaOperator);
                    }
                    if (criteriaOperator instanceof JS.Data.UnaryOperator) {
                        return this.serializeUnaryOperator(criteriaOperator, reverse);
                    }
                    throw Error("Undefined type criteria operator");
                };
                FilterEditorSerializer.prototype.deserialize = function (stringCriteria) {
                    var operand = JS.Data.CriteriaOperator.parse(stringCriteria);
                    if (operand instanceof JS.Data.GroupOperator) {
                        return operand;
                    }
                    else if (operand instanceof JS.Data.UnaryOperator && operand.operatorType === JS.Data.UnaryOperatorType.Not) {
                        var child = operand["operand"];
                        if (child instanceof JS.Data.GroupOperator) {
                            return operand;
                        }
                        return new JS.Data.UnaryOperator(JS.Data.UnaryOperatorType.Not, new JS.Data.GroupOperator(JS.Data.GroupOperatorType.And, child ? [child] : []));
                    }
                    return new JS.Data.GroupOperator(JS.Data.GroupOperatorType.And, operand ? [operand] : []);
                };
                return FilterEditorSerializer;
            })();
            Widgets.FilterEditorSerializer = FilterEditorSerializer;
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
            var FilterEditor = (function () {
                function FilterEditor(options, fieldListProvider, rtl) {
                    var _this = this;
                    if (rtl === void 0) { rtl = false; }
                    this.isValid = ko.observable(true);
                    this.operandSurface = ko.observable(null);
                    this.operand = null;
                    this.popupVisible = ko.observable(false);
                    this.buttonItems = [];
                    this.popupService = new JS.Utils.PopupService();
                    this.rtl = rtl;
                    options() && options().helper && (options().helper.rtl = rtl);
                    this.options = options;
                    this.save = function () {
                        _this.options().value(options().helper.serializer.serialize(_this.operandSurface().model, false));
                        _this.popupVisible(false);
                    };
                    this.fieldListProvider = fieldListProvider;
                    this.isValid = ko.computed(function () {
                        try {
                            _this.operand = _this.options().helper.serializer.deserialize(_this.options().value());
                            return true;
                        }
                        catch (e) {
                            return false;
                        }
                    });
                    this.popupVisible.subscribe(function (newVal) {
                        _this.operand = _this.options().helper.serializer.deserialize(_this.options().value());
                        if (newVal) {
                            var type = null;
                            if (_this.operand instanceof JS.Data.UnaryOperator) {
                                type = _this.options().helper.mapper.Unary;
                            }
                            else {
                                type = _this.options().helper.mapper.Group;
                            }
                            var surface = new type(_this.operand, _this, _this.fieldListProvider, _this.path);
                            surface.canRemove = false;
                            if (surface instanceof UnaryOperandSurface) {
                                surface.operand().canRemove = false;
                            }
                            _this.operandSurface(surface);
                        }
                        else {
                            _this.operandSurface(null);
                        }
                    });
                    this.createAddButton = function (criteria) { return options().helper.handlers.create(criteria, _this.popupService); };
                    this.createChangeType = function (criteria) { return options().helper.handlers.change(criteria, _this.popupService); };
                    this.createChangeProperty = function (criteria) { return options().helper.handlers.changeProperty(criteria, _this.popupService); };
                    this.createChangeParameter = function (criteria) { return options().helper.handlers.changeParameter(criteria, _this.popupService); };
                    this.createChangeValueType = function (criteria) { return options().helper.handlers.changeValueType(criteria, _this.popupService); };
                    this._createMainPopupButtons();
                }
                FilterEditor.prototype._createMainPopupButtons = function () {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: JS.Utils.getLocalization('Save'), onClick: function () { self.save(); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: JS.Utils.getLocalization('Cancel'), onClick: function () { self.popupVisible(false); } } }
                    ];
                };
                FilterEditor.prototype.change = function (type, surface) {
                    this.operand = JS.Data.CriteriaOperator.create(type);
                    this.operand.assignFrom(surface.model);
                    var type = null;
                    if (this.operand instanceof JS.Data.UnaryOperator) {
                        type = this.options().helper.mapper.Unary;
                    }
                    else {
                        type = this.options().helper.mapper.Group;
                    }
                    var surface = new type(this.operand, this, this.fieldListProvider, this.path);
                    surface.canRemove = false;
                    if (surface instanceof UnaryOperandSurface) {
                        surface.operand().canRemove = false;
                    }
                    this.operandSurface(surface);
                };
                Object.defineProperty(FilterEditor.prototype, "helper", {
                    get: function () {
                        return this.options().helper;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FilterEditor.prototype, "path", {
                    get: function () {
                        return this.options().path;
                    },
                    enumerable: true,
                    configurable: true
                });
                return FilterEditor;
            })();
            Widgets.FilterEditor = FilterEditor;
            var CriteriaOperatorSurface = (function () {
                function CriteriaOperatorSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
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
                    this.operatorType.subscribe(function (newVal) {
                        _this.model.assignType(newVal);
                    });
                }
                CriteriaOperatorSurface.filterEditorOperators = function (specific) {
                    if (specific === void 0) { specific = "string"; }
                    var common = [{ name: "Equals", value: JS.Data.BinaryOperatorType.Equal, type: JS.Data.BinaryOperatorType },
                        { name: "Does not equal", value: JS.Data.BinaryOperatorType.NotEqual, type: JS.Data.BinaryOperatorType },
                        { name: "Is greater than", value: JS.Data.BinaryOperatorType.Greater, type: JS.Data.BinaryOperatorType },
                        { name: "Is greater than or equal to", value: JS.Data.BinaryOperatorType.GreaterOrEqual, type: JS.Data.BinaryOperatorType },
                        { name: "Is less than", value: JS.Data.BinaryOperatorType.Less, type: JS.Data.BinaryOperatorType },
                        { name: "Is less than or equal to", value: JS.Data.BinaryOperatorType.LessOrEqual, type: JS.Data.BinaryOperatorType },
                        { name: "Is between", value: "Between", type: JS.Data.BetweenOperator },
                        { name: "Is not between", value: "Between", type: JS.Data.BetweenOperator, reverse: true }];
                    switch (specific) {
                        case "guid":
                        case "string":
                            return [].concat(common, [
                                { name: "Contains", value: JS.Data.FunctionOperatorType.Contains, type: JS.Data.FunctionOperatorType },
                                { name: "Does not contain", value: JS.Data.FunctionOperatorType.Contains, type: JS.Data.FunctionOperatorType, reverse: true },
                                { name: "Begins with", value: JS.Data.FunctionOperatorType.StartsWith, type: JS.Data.FunctionOperatorType },
                                { name: "Ends with", value: JS.Data.FunctionOperatorType.EndsWith, type: JS.Data.FunctionOperatorType },
                                { name: "Is like", value: JS.Data.BinaryOperatorType.Like, type: JS.Data.BinaryOperatorType },
                                { name: "Is not like", value: JS.Data.BinaryOperatorType.Like, type: JS.Data.BinaryOperatorType, reverse: true },
                                { name: "Is any of", value: "In", type: JS.Data.InOperator },
                                { name: "Is none of", value: "In", type: JS.Data.InOperator, reverse: true },
                                { name: "Is blank", value: JS.Data.FunctionOperatorType.IsNullOrEmpty, type: JS.Data.FunctionOperatorType },
                                { name: "Is not blank", value: JS.Data.FunctionOperatorType.IsNullOrEmpty, type: JS.Data.FunctionOperatorType, reverse: true }
                            ]);
                        case "integer":
                        case "float":
                            return [].concat(common, [
                                { name: "Is null", value: JS.Data.UnaryOperatorType.IsNull, type: JS.Data.UnaryOperatorType },
                                { name: "Is not null", value: JS.Data.UnaryOperatorType.IsNull, type: JS.Data.UnaryOperatorType, reverse: true },
                                { name: "Is any of", value: "In", type: JS.Data.InOperator },
                                { name: "Is none of", value: "In", type: JS.Data.InOperator, reverse: true },
                            ]);
                        case "date":
                            return [].concat(common, [
                                { name: "Is null", value: JS.Data.UnaryOperatorType.IsNull, type: JS.Data.UnaryOperatorType },
                                { name: "Is not null", value: JS.Data.UnaryOperatorType.IsNull, type: JS.Data.UnaryOperatorType, reverse: true },
                                { name: "Is any of", value: "In", type: JS.Data.InOperator },
                                { name: "Is none of", value: "In", type: JS.Data.InOperator, reverse: true },
                                { name: "Is beyond this year", value: JS.Data.FunctionOperatorType.IsOutlookIntervalBeyondThisYear, type: JS.Data.FunctionOperatorType },
                                { name: "Is later this year", value: JS.Data.FunctionOperatorType.IsOutlookIntervalLaterThisYear, type: JS.Data.FunctionOperatorType },
                                { name: "Is later this month", value: JS.Data.FunctionOperatorType.IsOutlookIntervalLaterThisMonth, type: JS.Data.FunctionOperatorType },
                                { name: "Is next week", value: JS.Data.FunctionOperatorType.IsOutlookIntervalNextWeek, type: JS.Data.FunctionOperatorType },
                                { name: "Is later this week", value: JS.Data.FunctionOperatorType.IsOutlookIntervalLaterThisWeek, type: JS.Data.FunctionOperatorType },
                                { name: "Is tomorrow", value: JS.Data.FunctionOperatorType.IsOutlookIntervalTomorrow, type: JS.Data.FunctionOperatorType },
                                { name: "Is today", value: JS.Data.FunctionOperatorType.IsOutlookIntervalToday, type: JS.Data.FunctionOperatorType },
                                { name: "Is yesterday", value: JS.Data.FunctionOperatorType.IsOutlookIntervalYesterday, type: JS.Data.FunctionOperatorType },
                                { name: "Is earlier this week", value: JS.Data.FunctionOperatorType.IsOutlookIntervalEarlierThisWeek, type: JS.Data.FunctionOperatorType },
                                { name: "Is last week", value: JS.Data.FunctionOperatorType.IsOutlookIntervalLastWeek, type: JS.Data.FunctionOperatorType },
                                { name: "Is earlier this month", value: JS.Data.FunctionOperatorType.IsOutlookIntervalEarlierThisMonth, type: JS.Data.FunctionOperatorType },
                                { name: "Is earlier this year", value: JS.Data.FunctionOperatorType.IsOutlookIntervalEarlierThisYear, type: JS.Data.FunctionOperatorType },
                                { name: "Is prior this year", value: JS.Data.FunctionOperatorType.IsOutlookIntervalPriorThisYear, type: JS.Data.FunctionOperatorType },
                            ]);
                        case "list":
                            return [
                                { name: "Exists", value: JS.Data.Aggregate.Exists, type: JS.Data.Aggregate },
                                { name: "Count", value: JS.Data.Aggregate.Count, type: JS.Data.Aggregate },
                                { name: "Max", value: JS.Data.Aggregate.Max, type: JS.Data.Aggregate },
                                { name: "Min", value: JS.Data.Aggregate.Min, type: JS.Data.Aggregate },
                                { name: "Sum", value: JS.Data.Aggregate.Sum, type: JS.Data.Aggregate },
                                { name: "Avg", value: JS.Data.Aggregate.Avg, type: JS.Data.Aggregate }
                            ];
                        case "group":
                            return [
                                { name: "And", value: JS.Data.GroupOperatorType.And, type: JS.Data.GroupOperatorType },
                                { name: "Or", value: JS.Data.GroupOperatorType.Or, type: JS.Data.GroupOperatorType },
                                { name: "Not And", value: JS.Data.GroupOperatorType.And, reverse: true, type: JS.Data.GroupOperatorType },
                                { name: "Not Or", value: JS.Data.GroupOperatorType.Or, reverse: true, type: JS.Data.GroupOperatorType },
                            ];
                    }
                    return [].concat(common);
                };
                CriteriaOperatorSurface.prototype._createLeftPartProperty = function (value) {
                    if (value instanceof JS.Data.OperandProperty) {
                        var surface = this.createChildSurface(value);
                    }
                    else {
                        var surface = this.createChildSurface(value);
                    }
                    surface["canChange"] = false;
                    surface.canRemove = false;
                    if (surface instanceof AggregateOperandSurface) {
                        this.specifics = ko.computed(function () {
                            return surface["aggregatedExpression"]() && surface["aggregatedExpression"]().specifics() || "integer";
                        });
                    }
                    else {
                        this.specifics = surface.specifics;
                    }
                    return surface;
                };
                CriteriaOperatorSurface.prototype.createChildSurface = function (item, path, actions) {
                    return new this.helper.mapper[item.type](item, this, this.fieldListProvider, path || this.path);
                };
                Object.defineProperty(CriteriaOperatorSurface.prototype, "items", {
                    get: function () {
                        return CriteriaOperatorSurface.filterEditorOperators(this.specifics());
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CriteriaOperatorSurface.prototype, "displayType", {
                    get: function () {
                        var _this = this;
                        var item = this.items.filter(function (item) { return _this.operatorType() === item.value && _this.reverse === item.reverse && _this.model.enumType === item.type; })[0];
                        return item && item.name || this.operatorType && this.operatorType() || "";
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
                    if (!surface && type && this.model.enumType === type.type && this.reverse === type.reverse && type.type !== JS.Data.FunctionOperatorType) {
                        this.operatorType(type.value);
                    }
                    else {
                        this.parent.change(type, this);
                    }
                };
                CriteriaOperatorSurface.prototype.remove = function (surface) {
                    this.parent.remove(this);
                };
                return CriteriaOperatorSurface;
            })();
            Widgets.CriteriaOperatorSurface = CriteriaOperatorSurface;
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
                return BinaryOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.BinaryOperandSurface = BinaryOperandSurface;
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
                            parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
                        }
                        else {
                            parent[propertyLocation.name](parent.createChildSurface(model));
                        }
                    };
                }
                OperandSurfaceBase.prototype.getRealParent = function (parent) {
                    if (parent instanceof UnaryOperandSurface) {
                        return this.getRealParent(parent.parent);
                    }
                    else {
                        return parent;
                    }
                };
                OperandSurfaceBase.prototype.getRealProperty = function (property) {
                    if (property.parent instanceof UnaryOperandSurface) {
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
                        var items = [{ name: "Value", instance: JS.Data.OperandValue }];
                        if (this.helper.canChoiceProperty) {
                            items.push({ name: "Property", instance: JS.Data.OperandProperty });
                        }
                        if (this.helper.canChoiceParameters && (this.helper.parameters() && this.helper.parameters().filter(function (item) { return item.specifics && item.specifics.toLowerCase() === _this.parent.specifics(); }).length > 0 || this.helper.canCreateParameters)) {
                            items.push({ name: "Parameter", instance: JS.Data.OperandParameter });
                        }
                        return items;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OperandSurfaceBase;
            })(CriteriaOperatorSurface);
            Widgets.OperandSurfaceBase = OperandSurfaceBase;
            var FunctionOperandSurface = (function (_super) {
                __extends(FunctionOperandSurface, _super);
                function FunctionOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.canRemove = true;
                    this.contentTemplateName = "dx-filtereditor-function";
                    this.operands = ko.observableArray([]);
                    if (operator.operands.length === 0) {
                        if (parent instanceof UnaryOperandSurface) {
                            this.specifics = parent.parent.specifics;
                        }
                        else {
                            this.specifics = parent.specifics;
                        }
                        this.canRemove = false;
                        this.contentTemplateName = "dx-filtereditor-function-lightweight";
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
                return FunctionOperandSurface;
            })(OperandSurfaceBase);
            Widgets.FunctionOperandSurface = FunctionOperandSurface;
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
                        var value = new JS.Data.OperandValue(null);
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
                return InOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.InOperandSurface = InOperandSurface;
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
                return BetweenOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.BetweenOperandSurface = BetweenOperandSurface;
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
                            parent[propertyLocation.name].splice(propertyLocation.index, 1, parent.createChildSurface(model));
                        }
                        else {
                            parent[propertyLocation.name](parent.createChildSurface(model));
                        }
                    };
                    this.values = ko.observable([]);
                    this.isEditable = ko.observable(false);
                    this.templateName = "dx-filtereditor-value";
                    if (parent instanceof UnaryOperandSurface) {
                        this.specifics = parent.parent.specifics;
                        if (parent.model.operatorType === JS.Data.UnaryOperatorType.Minus) {
                            this.reverse = true;
                        }
                    }
                    else {
                        this.specifics = parent.specifics;
                    }
                    this.specifics.subscribe(function (newVal) {
                        operator.specifics = newVal;
                        _this._updateDate(newVal);
                    });
                    this._value(operator.value);
                    this._value.subscribe(function (newVal) {
                        _this.model.value = newVal;
                    });
                    if (this._value() === null || this._value() === undefined || this._value() === "") {
                        this._updateDate(this.specifics());
                    }
                    this.value = ko.computed({
                        read: function () {
                            var value = _this._value();
                            if (value instanceof Date) {
                                value = Globalize["formatDate"](value);
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
                            return value !== null && value !== undefined && value !== "" ? value : OperandValueSurface.defaultDisplay;
                        },
                        write: function (newVal) {
                            if (newVal > 0 && !_this.reverse || newVal < 0 && _this.reverse) {
                                _this._value(newVal);
                            }
                            else if (newVal > 0 && _this.reverse || newVal < 0 && !_this.reverse) {
                                _this.reverse = !_this.reverse;
                                _this._value(newVal < 0 ? 0 - newVal : newVal);
                                _this.changeValue();
                            }
                        }
                    });
                    ko.computed(function () {
                        var itemsProvider = ko.unwrap(fieldListProvider);
                        if (itemsProvider && itemsProvider.getValues && _this.parent.leftPart instanceof OperandPropertySurface) {
                            if (_this.parent.leftPart.propertyName()) {
                                itemsProvider.getValues(new Widgets.PathRequest(ko.unwrap(_this.path) + "." + _this.parent.leftPart.propertyName())).done(function (result) {
                                    _this.values(result);
                                });
                            }
                        }
                    });
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
                OperandValueSurface.defaultDisplay = "Enter a value";
                return OperandValueSurface;
            })(OperandSurfaceBase);
            Widgets.OperandValueSurface = OperandValueSurface;
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
                        { name: JS.Utils.getLocalization("Add group"), value: true },
                        { name: JS.Utils.getLocalization("Add condition"), value: false }
                    ];
                    this.operands((operator.operands || []).map(function (operand) {
                        return _this.createChildSurface(operand);
                    }));
                    this.specifics = ko.observable("group");
                }
                GroupOperandSurface.prototype.change = function (type, surface) {
                    if (surface) {
                        var specifics = surface.specifics() || "integer";
                        var operators = CriteriaOperatorSurface.filterEditorOperators(specifics);
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
                        var newModel = this.model.change(type, surface.model, surface.leftPart instanceof AggregateOperandSurface && surface.leftPart.leftPart.specifics() !== "list");
                        var position = this.operands().indexOf(surface);
                        var operand = this.createChildSurface(newModel);
                        this.operands.splice(position, 1, operand);
                    }
                    else {
                        _super.prototype.change.call(this, type, surface);
                    }
                };
                GroupOperandSurface.prototype.remove = function (surface) {
                    if (surface) {
                        this.model.remove(surface.model);
                        this.operands.remove(surface);
                    }
                    else {
                        this.parent.remove(this);
                    }
                };
                GroupOperandSurface.prototype.create = function (type) {
                    var newModel = this.model.create(type.value, new JS.Data.OperandProperty());
                    this.operands.push(this.createChildSurface(newModel));
                };
                Object.defineProperty(GroupOperandSurface.prototype, "rightPart", {
                    get: function () {
                        return this.operands();
                    },
                    enumerable: true,
                    configurable: true
                });
                return GroupOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.GroupOperandSurface = GroupOperandSurface;
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
                    if (operator.aggregatedExpression) {
                        this.aggregatedExpression(this.createChildSurface(operator.aggregatedExpression, childPath));
                        this.templateName = "dx-filtereditor-aggregate-common";
                    }
                    if (operator.operatorType === JS.Data.Aggregate.Count) {
                        this.templateName = "dx-filtereditor-aggregate-common";
                    }
                    var surface = this.createChildSurface(operator.condition, childPath);
                    surface.canRemove = false;
                    if (surface instanceof UnaryOperandSurface) {
                        surface.operand().canRemove = false;
                    }
                    this.condition(surface);
                    this.change = function (type, surface) {
                        if (surface) {
                            var newModel = _this.model.change(type, surface.model);
                            var condition = _this.createChildSurface(newModel, childPath);
                            condition.canRemove = false;
                            if (condition instanceof UnaryOperandSurface) {
                                condition.operand().canRemove = false;
                            }
                            _this.condition(condition);
                        }
                        else {
                            if (_this.operatorType() === JS.Data.Aggregate.Exists || _this.operatorType() === JS.Data.Aggregate.Count) {
                                _this.parent.change(type, _this);
                            }
                            else {
                                if (type && (type.value === JS.Data.Aggregate.Exists || type.value === JS.Data.Aggregate.Count)) {
                                    _this.parent.change(type, _this);
                                }
                                else {
                                    _super.prototype.change.call(_this, type, surface);
                                }
                            }
                        }
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
                return AggregateOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.AggregateOperandSurface = AggregateOperandSurface;
            var OperandParameterSurface = (function (_super) {
                __extends(OperandParameterSurface, _super);
                function OperandParameterSurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.changeParameter = function (item) {
                        _this.model.parameterName = item.name;
                        _this.parameterName(item.name);
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
            })(OperandSurfaceBase);
            Widgets.OperandParameterSurface = OperandParameterSurface;
            var UnaryOperandSurface = (function (_super) {
                __extends(UnaryOperandSurface, _super);
                function UnaryOperandSurface(operator, parent, fieldListProvider, path) {
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this.contentTemplateName = "dx-filtereditor-unary";
                    this.operand = ko.observable(null);
                    var operand = this.createChildSurface(operator.operand);
                    if (operator.operatorType === JS.Data.UnaryOperatorType.Not) {
                        this.templateName = "dx-filtereditor-not";
                        operand.reverse = true;
                        this.specifics = operand.specifics;
                    }
                    else {
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
                return UnaryOperandSurface;
            })(CriteriaOperatorSurface);
            Widgets.UnaryOperandSurface = UnaryOperandSurface;
            var OperandPropertySurface = (function (_super) {
                __extends(OperandPropertySurface, _super);
                function OperandPropertySurface(operator, parent, fieldListProvider, path) {
                    var _this = this;
                    _super.call(this, operator, parent, fieldListProvider, path);
                    this._displayName = ko.observable("");
                    this.propertyName = ko.observable("");
                    this.specifics = ko.observable("integer");
                    this.valueType = ko.observable("");
                    this.changeProperty = function (item) {
                        _this.fieldsOptions().selected(item);
                    };
                    this.templateName = "dx-filtereditor-property";
                    this.operatorClass = "criteria-operator-item-field";
                    this.propertyName(operator.propertyName);
                    this.fieldsOptions = this.helper.generateTreelistOptions(fieldListProvider, path);
                    this.fieldsOptions().selectedPath.subscribe(function (newVal) {
                        var realName = _this.fieldsOptions().selectedPath().substr(_this.path && _this.path().length > 0 ? _this.path().length + 1 : 0);
                        _this.propertyName(realName);
                        _this.model.propertyName = realName;
                        _this.popupService.visible(false);
                    });
                    this.fieldsOptions().selected.subscribe(function (newVal) {
                        _this._updateDisplayName(path, _this.propertyName(), newVal.displayName);
                        var specifics = newVal.specifics.toLowerCase();
                        if (specifics.indexOf("calc") === 0) {
                            specifics = specifics.split("calc")[1];
                        }
                        if (_this.specifics() !== specifics) {
                            _this.specifics(specifics);
                            _this.parent.change();
                        }
                    });
                    this.fieldsOptions().selectedPath(this.path && !!ko.unwrap(this.path) ? [ko.unwrap(this.path), this.propertyName()].join('.') : this.propertyName());
                    this._updateSpecifics();
                    this.displayName = ko.computed(function () {
                        return _this._displayName() || _this.propertyName();
                    });
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
                        ko.unwrap(this.fieldsOptions).itemsProvider.getItems(new Widgets.PathRequest([this.path()].concat(propertyPath).join('.'))).done(function (result) {
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
            })(OperandSurfaceBase);
            Widgets.OperandPropertySurface = OperandPropertySurface;
            ko.bindingHandlers['dxFilterEditor'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-filtereditor').text(), $element = $(element).append(templateHtml), values = valueAccessor();
                    var itemsProvider = ko.observable(ko.unwrap(values.fieldListProvider));
                    ko.computed(function () {
                        if (values.options().itemsProvider) {
                            itemsProvider(ko.unwrap(values.options().itemsProvider));
                        }
                        else {
                            itemsProvider(ko.unwrap(values.fieldListProvider));
                        }
                    });
                    ko.computed(function () {
                        if (values.getDisplayNameByPath && values.options() && values.options().helper && !values.options().helper.getDisplayPropertyName) {
                            values.options().helper.getDisplayPropertyName = values.getDisplayNameByPath;
                        }
                    });
                    ko.applyBindings(new FilterEditor(values.options, itemsProvider, $(element).closest('.dx-rtl').length > 0), $element.children()[0]);
                    return { controlsDescendantBindings: true };
                }
            };
            ko.components.register("dx-filtereditor-plain", {
                viewModel: {
                    createViewModel: function (params, componentInfo) {
                        var viewModel = new FilterEditor(params.options, ko.observable(params.fieldListProvider));
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
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="treelist.ts" />
/// <reference path="filtereditor.ts" />
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            var operatorNames = [
                { text: "+", image: "addition", description: "Adds the value of one numeric expression to another or concatenates two strings." },
                { text: "-", image: "subtraction", description: "Finds the difference between two numbers." },
                { text: "*", image: "multiplication", description: "Multiplies the value of two expressions." },
                { text: "/", image: "division", description: "Divides the first operand by the second." },
                { text: "%", image: "modulus", hasSeparator: true, description: "Returns the remainder (modulus) obtained by dividing one numeric expression into another." },
                { text: "()", image: "parenthesis", hasSeparator: true },
                { text: "|", description: "Compares each bit of its first operand to the corresponding bit of its second operand. If either bit is 1, the corresponding result bit is set to 1. Otherwise, the corresponding result bit is set to 0." },
                { text: "&", description: "Performs a bitwise logical AND operation between two integer values." },
                { text: "^", description: "Performs a logical exclusion on two Boolean expressions, or a bitwise exclusion on two numeric expressions." },
                { text: "==", image: "equal", description: "Returns true if both operands have the same value; otherwise, it returns false." },
                { text: "!=", image: "not_equal", description: "Returns true if the operands do not have the same value; otherwise, it returns false." },
                { text: "<", image: "less", description: "Less than operator. Used to compare expressions." },
                { text: "<=", image: "less_or_equal", description: "Less than or equal to operator. Used to compare expressions." },
                { text: ">=", image: "greater_or_equal", description: "Greater than or equal to operator. Used to compare expressions." },
                { text: ">", hasSeparator: true, image: "greater", description: "Greater than operator. Used to compare expressions." },
                { text: "In", description: "In (,,,)    Tests for the existence of a property in an object." },
                { text: "Like", description: "Compares a string against a pattern. If the value of the string matches the pattern, then the result is true. If the string does not match the pattern, the result is false. If both string and pattern are empty strings, the result is true." },
                { text: "Between", description: "Between (,)    Specifies a range to test. Returns true if a value is greater than or equal to the first operand and less than or equal to the second operand." },
                { text: "And", image: "and", description: "Performs a logical conjunction on two expressions." },
                { text: "Or", image: "or", description: "Performs a logical disjunction on two Boolean expressions." },
                { text: "Not", image: "not", description: "Performs logical negation on an expression." }
            ];
            Widgets.functionDisplay = [
                {
                    display: "Aggregate",
                    items: {
                        Avg: [{ paramCount: 0, text: "[].Avg()", displayName: "Avg()" }],
                        Count: [{ paramCount: 0, text: "[].Count()", displayName: "Count()" }],
                        Exists: [{ paramCount: 0, text: "[].Exists()", displayName: "Exists()" }],
                        Max: [{ paramCount: 0, text: "[].Max()", displayName: "Max()" }],
                        Min: [{ paramCount: 0, text: "[].Min()", displayName: "Min()" }],
                        Single: [{ paramCount: 0, text: "[].Single()", displayName: "Single()" }],
                        Sum: [{ paramCount: 0, text: "[].Sum()", displayName: "Sum()" }],
                    }
                },
                {
                    display: "Date-Time",
                    items: {
                        LocalDateTimeThisYear: [{ paramCount: 0, text: "LocalDateTimeThisYear()" }],
                        LocalDateTimeThisMonth: [{ paramCount: 0, text: "LocalDateTimeThisMonth()" }],
                        LocalDateTimeLastWeek: [{ paramCount: 0, text: "LocalDateTimeLastWeek()" }],
                        LocalDateTimeThisWeek: [{ paramCount: 0, text: "LocalDateTimeThisWeek()" }],
                        LocalDateTimeYesterday: [{ paramCount: 0, text: "LocalDateTimeYesterday()" }],
                        LocalDateTimeToday: [{ paramCount: 0, text: "LocalDateTimeToday()" }],
                        LocalDateTimeNow: [{ paramCount: 0, text: "LocalDateTimeNow()" }],
                        LocalDateTimeTomorrow: [{ paramCount: 0, text: "LocalDateTimeTomorrow()" }],
                        LocalDateTimeDayAfterTomorrow: [{ paramCount: 0, text: "LocalDateTimeDayAfterTomorrow()" }],
                        LocalDateTimeNextWeek: [{ paramCount: 0, text: "LocalDateTimeNextWeek()" }],
                        LocalDateTimeTwoWeeksAway: [{ paramCount: 0, text: "LocalDateTimeTwoWeeksAway()" }],
                        LocalDateTimeNextMonth: [{ paramCount: 0, text: "LocalDateTimeNextMonth()" }],
                        LocalDateTimeNextYear: [{ paramCount: 0, text: "LocalDateTimeNextYear()" }],
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
                        IsThisWeek: [{ paramCount: 1, text: "IsThisWeek()" }],
                        IsThisMonth: [{ paramCount: 1, text: "IsThisMonth()" }],
                        IsThisYear: [{ paramCount: 1, text: "IsThisYear()" }],
                        DateDiffTick: [{ paramCount: 2, text: "DateDiffTick(, )" }],
                        DateDiffSecond: [{ paramCount: 2, text: "DateDiffSecond(, )" }],
                        DateDiffMilliSecond: [{ paramCount: 2, text: "DateDiffMilliSecond(, )" }],
                        DateDiffMinute: [{ paramCount: 2, text: "DateDiffMinute(, )" }],
                        DateDiffHour: [{ paramCount: 2, text: "DateDiffHour(, )" }],
                        DateDiffDay: [{ paramCount: 2, text: "DateDiffDay(, )" }],
                        DateDiffMonth: [{ paramCount: 2, text: "DateDiffMonth(, )" }],
                        DateDiffYear: [{ paramCount: 2, text: "DateDiffYear(, )" }],
                        GetDate: [{ paramCount: 1, text: "GetDate()" }],
                        GetMilliSecond: [{ paramCount: 1, text: "GetMilliSecond()" }],
                        GetSecond: [{ paramCount: 1, text: "GetSecond()" }],
                        GetMinute: [{ paramCount: 1, text: "GetMinute()" }],
                        GetHour: [{ paramCount: 1, text: "GetHour()" }],
                        GetDay: [{ paramCount: 1, text: "GetDay()" }],
                        GetMonth: [{ paramCount: 1, text: "GetMonth()" }],
                        GetYear: [{ paramCount: 1, text: "GetYear()" }],
                        GetDayOfWeek: [{ paramCount: 1, text: "GetDayOfWeek()" }],
                        GetDayOfYear: [{ paramCount: 1, text: "GetDayOfYear()" }],
                        GetTimeOfDay: [{ paramCount: 1, text: "GetTimeOfDay()" }],
                        Now: [{ paramCount: 0, text: "Now()" }],
                        UtcNow: [{ paramCount: 0, text: "UtcNow()" }],
                        Today: [{ paramCount: 0, text: "Today()" }],
                        AddTimeSpan: [{ paramCount: 2, text: "AddTimeSpan(, )" }],
                        AddTicks: [{ paramCount: 2, text: "AddTicks(, )" }],
                        AddMilliSeconds: [{ paramCount: 2, text: "AddMilliSeconds(, )" }],
                        AddSeconds: [{ paramCount: 2, text: "AddSeconds(, )" }],
                        AddMinutes: [{ paramCount: 2, text: "AddMinutes(, )" }],
                        AddHours: [{ paramCount: 2, text: "AddHours(, )" }],
                        AddDays: [{ paramCount: 2, text: "AddDays(, )" }],
                        AddMonths: [{ paramCount: 2, text: "AddMonths(, )" }],
                        AddYears: [{ paramCount: 2, text: "AddYears(, )" }],
                    },
                }, {
                    display: "Logical",
                    items: {
                        Iif: [{ paramCount: 3, text: "Iif(, , )" }],
                        IsNull: [{ paramCount: 1, text: "IsNull()" }],
                        IsNullOrEmpty: [{ paramCount: 1, text: "IsNullOrEmpty()" }],
                    }
                }, {
                    display: "Math",
                    items: {
                        Abs: [{ paramCount: 1, text: "Abs()" }],
                        Sqr: [{ paramCount: 1, text: "Sqr()" }],
                        Cos: [{ paramCount: 1, text: "Cos()" }],
                        Sin: [{ paramCount: 1, text: "Sin()" }],
                        Atn: [{ paramCount: 1, text: "Atn()" }],
                        Exp: [{ paramCount: 1, text: "Exp()" }],
                        Log: [
                            { paramCount: 1, text: "Log()" },
                            { paramCount: 2, text: "Log(, )" },
                        ],
                        Rnd: [{ paramCount: 0, text: "Rnd()" }],
                        Tan: [{ paramCount: 1, text: "Tan()" }],
                        Power: [{ paramCount: 2, text: "Power(, )" }],
                        Sign: [{ paramCount: 1, text: "Sign()" }],
                        Round: [
                            { paramCount: 1, text: "Round()" },
                            { paramCount: 2, text: "Round(, )" },
                        ],
                        Ceiling: [{ paramCount: 1, text: "Ceiling()" }],
                        Floor: [{ paramCount: 1, text: "Floor()" }],
                        Max: [{ paramCount: 2, text: "Max(, )" }],
                        Min: [{ paramCount: 2, text: "Min(, )" }],
                        Acos: [{ paramCount: 1, text: "Acos()" }],
                        Asin: [{ paramCount: 1, text: "Asin()" }],
                        Atn2: [{ paramCount: 2, text: "Atn2(, )" }],
                        BigMul: [{ paramCount: 2, text: "BigMul(, )" }],
                        Cosh: [{ paramCount: 1, text: "Cosh()" }],
                        Log10: [{ paramCount: 1, text: "Log10()" }],
                        Sinh: [{ paramCount: 1, text: "Sinh()" }],
                        Tanh: [{ paramCount: 1, text: "Tanh()" }],
                        ToInt: [{ paramCount: 1, text: "ToInt()" }],
                        ToLong: [{ paramCount: 1, text: "ToLong()" }],
                        ToFloat: [{ paramCount: 1, text: "ToFloat()" }],
                        ToDouble: [{ paramCount: 1, text: "ToDouble()" }],
                        ToDecimal: [{ paramCount: 1, text: "ToDecimal()" }],
                    }
                }, {
                    display: "String",
                    items: {
                        Trim: [{ paramCount: 1, text: "Trim()" }],
                        Len: [{ paramCount: 1, text: "Len()" }],
                        Substring: [
                            { paramCount: 3, text: "Substring('', , )" },
                            { paramCount: 2, text: "Substring('', )" }
                        ],
                        Upper: [{ paramCount: 1, text: "Upper()" }],
                        Lower: [{ paramCount: 1, text: "Lower()" }],
                        Concat: [{ paramCount: Infinity, text: "Concat(, )" }],
                        Ascii: [{ paramCount: 1, text: "Ascii('')" }],
                        Char: [{ paramCount: 1, text: "Char()" }],
                        ToStr: [{ paramCount: 1, text: "ToStr()" }],
                        Replace: [{ paramCount: 3, text: "Replace('','', '')" }],
                        Reverse: [{ paramCount: 1, text: "Reverse('')" }],
                        Insert: [{ paramCount: 3, text: "Insert('', , '')" }],
                        CharIndex: [
                            { paramCount: 2, text: "CharIndex('','')" },
                            { paramCount: 3, text: "CharIndex('','', )" }],
                        Remove: [{ paramCount: 3, text: "Remove('', , )" }],
                        PadLeft: [
                            { paramCount: 2, text: "PadLeft(, )" },
                            { paramCount: 3, text: "PadLeft(, , '')" }
                        ],
                        PadRight: [
                            { paramCount: 2, text: "PadRight(, )" },
                            { paramCount: 3, text: "PadRight(, , '')" }
                        ],
                        StartsWith: [{ paramCount: 2, text: "StartsWith('', '')" }],
                        EndsWith: [{ paramCount: 2, text: "EndsWith('', '')" }],
                        Contains: [{ paramCount: 0, text: "Contains('', '')" }],
                    }
                }
            ];
            var Tools = (function () {
                function Tools(onClick, parametersOptions, fieldListOptions) {
                    this.popularItems = [];
                    this.toolBox = [];
                    this.description = ko.observable();
                    this._defaultClick = onClick;
                    this.popularItems = this._generatePopularItems(operatorNames.filter(function (item) { return !!item.image; }));
                    this.toolBox = [
                        this._generateList("FUNCTIONS", Widgets.functionDisplay.map(function (item) {
                            return {
                                display: item.display,
                                collapsed: ko.observable(true),
                                items: $.map(item.items, function (value) {
                                    if (value) {
                                        var result = [];
                                        value.forEach(function (item) {
                                            result.push(item);
                                        });
                                        return result;
                                    }
                                })
                            };
                        }), "dx-expressioneditor-functions"),
                        this._generateList("OPERATORS", operatorNames.filter(function (item) { return !!item.description; }))
                    ];
                    this.toolBox.push(this._generateList("FIELDS", { fields: fieldListOptions, parameters: parametersOptions }, "dx-expressioneditor-fields", "37%"));
                }
                Tools.prototype._generateList = function (title, content, templateName, width, click) {
                    var _this = this;
                    if (templateName === void 0) { templateName = null; }
                    return {
                        templateName: templateName,
                        width: width || "30%",
                        title: JS.Utils.getLocalization(title),
                        content: content,
                        click: click || this._defaultClick,
                        selection: function (item) { _this.description(item.description || item.text); }
                    };
                };
                Tools.prototype._generatePopularItems = function (values, click) {
                    var _this = this;
                    return values.map(function (item) {
                        return {
                            templateName: item.templateName || null,
                            text: item.text || item,
                            imgClassName: "dx-image-expressioneditor-" + item.image,
                            hasSeparator: item.hasSeparator,
                            description: item.description,
                            click: click || _this._defaultClick
                        };
                    });
                };
                return Tools;
            })();
            Widgets.Tools = Tools;
            var ExpressionEditorTreeListController = (function (_super) {
                __extends(ExpressionEditorTreeListController, _super);
                function ExpressionEditorTreeListController(fieldName, putSelectionHandler, selectionHandler) {
                    _super.call(this);
                    this.fieldName = fieldName;
                    this.putSelectionHandler = putSelectionHandler;
                    this.selectionHandler = selectionHandler;
                }
                ExpressionEditorTreeListController.prototype.itemsFilter = function (item) {
                    return item.specifics !== "none" && item.name !== ko.unwrap(this.fieldName);
                };
                ExpressionEditorTreeListController.prototype.select = function (value) {
                    this.selectionHandler(ko.unwrap(value.data["type"]));
                };
                ExpressionEditorTreeListController.prototype.getActions = function (item) {
                    var _this = this;
                    return [{ clickAction: function (element) { _this.putSelectionHandler(item.path, element); } }];
                };
                ExpressionEditorTreeListController.prototype.canSelect = function (value) {
                    return true;
                };
                return ExpressionEditorTreeListController;
            })(Widgets.TreeListController);
            Widgets.ExpressionEditorTreeListController = ExpressionEditorTreeListController;
            var ExpressionEditor = (function () {
                function ExpressionEditor(options, fieldListProvider, disabled, rtl, _displayConverter) {
                    var _this = this;
                    if (disabled === void 0) { disabled = ko.observable(false); }
                    if (rtl === void 0) { rtl = false; }
                    this._displayConverter = _displayConverter;
                    this._updateTextAreaValue = function (item, element) {
                        var textArea = _this._getTextArea(element), textAreaValue = _this.textAreaValue().toString(), cursorPosition = textArea && textArea.selectionStart || textAreaValue.length, newAddedText = textAreaValue[cursorPosition - 1] == " " ? (item.text || item) + " " : " " + (item.text || item) + " ";
                        _this.textAreaValue([textAreaValue.slice(0, cursorPosition), newAddedText, textAreaValue.slice(cursorPosition)].join(''));
                        if (textArea && textArea.setSelectionRange) {
                            textArea.focus();
                            var posisition = cursorPosition + (newAddedText.indexOf("(") !== -1 ? newAddedText.indexOf("(") + 1 : newAddedText.length);
                            textArea.setSelectionRange(posisition, posisition);
                        }
                    };
                    this.patchFieldName = function (fieldName) { return fieldName; };
                    this.popupVisible = ko.observable(false);
                    this.value = ko.observable("");
                    this.textAreaValue = ko.observable("");
                    this.isValid = ko.observable(true);
                    this.buttonItems = [];
                    this.rtl = false;
                    if (options.patchFieldName) {
                        this.patchFieldName = options.patchFieldName;
                    }
                    this.value = options.value;
                    this.rtl = rtl;
                    this.textAreaValue(this.value());
                    this.popupVisible.subscribe(function (newVal) {
                        _this.textAreaValue(_this.value());
                    });
                    this.fieldListProvider = ko.unwrap(fieldListProvider);
                    this.disabled = disabled;
                    var self = this;
                    this.save = function (sender) {
                        try {
                            JS.Data.CriteriaOperator.parse(_this.textAreaValue());
                            options.value(_this.textAreaValue());
                            _this.popupVisible(false);
                        }
                        catch (exception) {
                            var result = JS.Data.CriteriaOperator.getNotValidRange(_this.textAreaValue(), exception.message);
                            var textArea = _this._getTextArea(sender.element);
                            textArea && textArea.setSelectionRange(result.start, result.end);
                            _this.isValid(false);
                        }
                    };
                    var treeListOptions = options.path && ko.pureComputed(function () { return _this._createToolsOptions("field", options.path(), options.fieldName); });
                    this.tools = new Tools(this._updateTextAreaValue, this._createToolsOptions("parameter"), treeListOptions);
                    this._createMainPopupButtons();
                }
                ExpressionEditor.prototype._createMainPopupButtons = function () {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: JS.Utils.getLocalization('Save'), onClick: function (sender) { self.save(sender); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: JS.Utils.getLocalization('Cancel'), onClick: function () { self.popupVisible(false); } } },
                        { toolbar: 'bottom', location: 'before', template: function () { return $('#dx-expressioneditor-description'); }, text: self.tools.description }
                    ];
                };
                ExpressionEditor.prototype._getTextArea = function (element) {
                    return element && element.parents(".dx-expressioneditor").find(":input")[0];
                };
                ExpressionEditor.prototype._createToolsOptions = function (objectName, path, fieldName) {
                    var _this = this;
                    if (path === void 0) { path = null; }
                    var putSelectionHandler = function (selectedItemPath, element) {
                        var proposedFieldName = !!path ? selectedItemPath.substring(path.length + 1) : selectedItemPath;
                        var newAddedString = '[' + _this.patchFieldName(proposedFieldName) + ']';
                        if (_this._displayConverter && path !== null) {
                            _this._displayConverter.toDisplayExpression(path, newAddedString)
                                .done(function (result) { _this._updateTextAreaValue(result, element); })
                                .fail(function () { _this._updateTextAreaValue(newAddedString, element); });
                        }
                        else {
                            _this._updateTextAreaValue(newAddedString, element);
                        }
                    };
                    var selectionHandler = function (selectedItemType) {
                        _this.tools.description(selectedItemType && selectedItemType !== "None" ? ("The type of this " + objectName + " is: " + selectedItemType) : "");
                    };
                    return {
                        itemsProvider: this.fieldListProvider,
                        selectedPath: ko.observable(""),
                        path: path || "parameters",
                        templateName: "dx-ee-treelist-item",
                        treeListController: new ExpressionEditorTreeListController(fieldName || "", putSelectionHandler, selectionHandler),
                        rtl: this.rtl
                    };
                };
                return ExpressionEditor;
            })();
            Widgets.ExpressionEditor = ExpressionEditor;
            function wrapExpressionOptionsValue(options, converter, element) {
                if (!(converter && options.path))
                    return options;
                var _displayValue = ko.observable(options.value());
                converter.toDisplayExpression(options.path(), options.value()).done(function (result) {
                    _displayValue(result);
                });
                var subscription = options.value.subscribe(function (newValue) {
                    converter.toDisplayExpression(options.path(), newValue).done(function (result) {
                        _displayValue(result);
                    });
                });
                var displayValue = ko.pureComputed({
                    read: function () { return _displayValue(); },
                    write: function (newValue) {
                        converter.toRealExpression(options.path(), newValue).done(function (result) {
                            options.value(result);
                        }).fail(function () {
                            options.value(newValue);
                        });
                    }
                });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    subscription.dispose();
                    displayValue.dispose();
                });
                return $.extend({}, options, { value: displayValue });
            }
            Widgets.wrapExpressionOptionsValue = wrapExpressionOptionsValue;
            ko.bindingHandlers['dxExpressionEditor'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $element = $(element);
                    $element.children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-expressioneditor').text(), $element = $element.append(templateHtml), values = valueAccessor();
                    var editorOptions = wrapExpressionOptionsValue(ko.unwrap(values.options), values.displayExpressionConverter, element);
                    ko.applyBindings(new ExpressionEditor(editorOptions, values.fieldListProvider, viewModel.disabled, $(element).closest('.dx-rtl').length > 0, values.displayExpressionConverter), $element.children()[0]);
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
            Widgets.formatStringStandardPatterns = {
                'DateTime': { type: 'System.DateTime', value: new Date(Date.now()), patterns: [] },
                'Number': { type: 'System.Int32', value: '123456789', patterns: ['#.00', '#, #', '0.E+0.0', '0.e+0.0', 'n', 'n1', 'n2', 'e', 'e1', 'f', 'f1'] },
                'Percent': { type: 'System.Int32', value: '100', patterns: ['0.00%', '0%'] },
                'Currency': { type: 'System.Int32', value: '100', patterns: ['$0.00', '$0', 'c', 'c1', 'c2'] },
                'Special': { type: 'System.Int32', value: '123456789', patterns: ['(###) ### - ####', '### - ## - ####'] },
                'General': { type: 'System.String', value: '', patterns: ['General format have no specific number format'] }
            };
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
                    this.option("value", value);
                    this.option("disabled", disabled || false);
                    this.option("rtl", rtl || false);
                    this.option("popupContainer", popupContainer || ".dx-viewport");
                    var self = this;
                    this.popupService = new JS.Utils.PopupService();
                    this._standardPatternSource = defaultPatterns || Widgets.formatStringStandardPatterns;
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
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: 'OK', onClick: function () { self.okAction(); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: 'Cancel', onClick: function () { self.popupVisible(false); } } }
                    ];
                };
                FormatStringEditor.prototype._convertArray = function (array, canRemove) {
                    return array.map(function (item) { return { name: item, canRemove: !!canRemove }; });
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
                            _this.previewString('Preview string is not available');
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
                return FormatStringEditor;
            })(DevExpress.JS.Utils.Disposable);
            Widgets.FormatStringEditor = FormatStringEditor;
            ko.bindingHandlers['dxFormatEditor'] = {
                init: function (element, valueAccessor) {
                    $(element).children().remove();
                    $(element).addClass("dx-popup-general");
                    var templateHtml = $('#dx-format-string').text(), $element = $(element).append(templateHtml), values = valueAccessor();
                    var formatEditor = new FormatStringEditor(values.value, values['disabled'], values['standardPatterns'], values['customPatterns'], values['actions'], values['rtl'], values['popupContainer']);
                    ko.applyBindings(formatEditor, $element.children()[0]);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        formatEditor.dispose();
                    });
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Widgets;
        (function (Widgets) {
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
            Widgets.dxPopupWithAutoHeight = dxPopupWithAutoHeight;
            DevExpress.registerComponent("dxPopupWithAutoHeight", dxPopupWithAutoHeight);
        })(Widgets = JS.Widgets || (JS.Widgets = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var JS;
    (function (JS) {
        var Utils;
        (function (Utils) {
            ko.bindingHandlers["focus"] = {
                init: function (element, valueAccessor) {
                    var visible = valueAccessor().on || valueAccessor();
                    var subscription = visible.subscribe(function (newVal) {
                        if (newVal) {
                            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                                $(element).find(":input").focus();
                            }
                        }
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        subscription.dispose();
                    });
                }
            };
        })(Utils = JS.Utils || (JS.Utils = {}));
    })(JS = DevExpress.JS || (DevExpress.JS = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-ko-widgets.js.map
/* parser generated by jison 0.4.17 */
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,16],$V1=[1,11],$V2=[1,29],$V3=[1,4],$V4=[1,27],$V5=[1,10],$V6=[1,21],$V7=[1,19],$V8=[1,30],$V9=[1,32],$Va=[1,25],$Vb=[1,24],$Vc=[1,34],$Vd=[1,31],$Ve=[1,33],$Vf=[1,13],$Vg=[1,5],$Vh=[1,14],$Vi=[1,3],$Vj=[1,12],$Vk=[1,15],$Vl=[1,38],$Vm=[1,47],$Vn=[1,46],$Vo=[1,43],$Vp=[1,39],$Vq=[1,50],$Vr=[1,52],$Vs=[1,53],$Vt=[1,56],$Vu=[1,55],$Vv=[1,51],$Vw=[1,54],$Vx=[1,36],$Vy=[1,37],$Vz=[1,40],$VA=[1,41],$VB=[1,42],$VC=[1,44],$VD=[1,45],$VE=[1,48],$VF=[1,49],$VG=[5,11,17,19,20,23,26,40,41,42,43,44,45,46,50,56,60,61,62,63,64,66,67,68,69],$VH=[1,66],$VI=[5,11,15,16,17,19,20,22,23,26,40,41,42,43,44,45,46,50,56,60,61,62,63,64,66,67,68,69],$VJ=[2,14],$VK=[1,69],$VL=[1,71],$VM=[5,11,17,19,20,23,26,27,40,41,42,43,44,45,46,50,56,60,61,62,63,64,66,67,68,69],$VN=[1,94],$VO=[1,95],$VP=[1,93],$VQ=[1,78],$VR=[1,79],$VS=[1,80],$VT=[1,81],$VU=[1,82],$VV=[1,83],$VW=[1,84],$VX=[1,85],$VY=[1,86],$VZ=[1,87],$V_=[1,88],$V$=[1,89],$V01=[1,90],$V11=[1,91],$V21=[1,92],$V31=[5,11,16,17,19,20,23,26,40,41,42,43,44,45,46,50,56,60,61,62,63,64,66,67,68,69],$V41=[1,96],$V51=[1,97],$V61=[5,11,19,20,23,40,41,42,43,44,45,46,50,56,63,64,66,67,68,69],$V71=[5,11,41,42,50,56],$V81=[1,145],$V91=[16,50],$Va1=[15,16,17,22,25,26,27,28,50],$Vb1=[16,17,20],$Vc1=[5,11,17,19,20,23,26,40,41,42,43,44,45,46,50,56,63,64,66,67,68,69],$Vd1=[5,11,40,41,42,45,46,50,56,66,67],$Ve1=[5,11,19,20,40,41,42,45,46,50,56,66,67,68,69],$Vf1=[11,56],$Vg1=[5,11,16,17,19,20,23,26,27,40,41,42,43,44,45,46,50,56,60,61,62,63,64,66,67,68,69];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"exp":4,"EOF":5,"criteriaList":6,"\\0":7,"queryCollection":8,"expOrSort":9,";":10,",":11,"SORT_ASC":12,"SORT_DESC":13,"type":14,"COL":15,".":16,"+":17,"upcast":18,"OP_LT":19,"OP_GT":20,"column":21,"NUM":22,"^":23,"fieldColumn":24,"something":25,"-":26,"[":27,"=":28,"param":29,"?":30,"property":31,"columnOrAggregate":32,"AGG_COUNT":33,"AGG_AVG":34,"AGG_MAX":35,"AGG_MIN":36,"AGG_SINGLE":37,"AGG_EXISTS":38,"AGG_SUM":39,"OP_LIKE":40,"AND":41,"OR":42,"OP_BETWEEN":43,"OP_IN":44,"NOT":45,"IS":46,"NULL":47,"propertyWithAggregate":48,"compositeProperty":49,"]":50,"field":51,"aggregate":52,"aggregateSuffix":53,"topLevelAggregate":54,"(":55,")":56,"MinStart":57,"MaxStart":58,"CONST":59,"*":60,"/":61,"%":62,"|":63,"&":64,"~":65,"OP_EQ":66,"OP_NE":67,"OP_GE":68,"OP_LE":69,"argumentslist":70,"FUNCTION":71,"commadelimitedlist":72,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"\\0",10:";",11:",",12:"SORT_ASC",13:"SORT_DESC",15:"COL",16:".",17:"+",19:"OP_LT",20:"OP_GT",22:"NUM",23:"^",25:"something",26:"-",27:"[",28:"=",30:"?",33:"AGG_COUNT",34:"AGG_AVG",35:"AGG_MAX",36:"AGG_MIN",37:"AGG_SINGLE",38:"AGG_EXISTS",39:"AGG_SUM",40:"OP_LIKE",41:"AND",42:"OR",43:"OP_BETWEEN",44:"OP_IN",45:"NOT",46:"IS",47:"NULL",50:"]",55:"(",56:")",59:"CONST",60:"*",61:"/",62:"%",63:"|",64:"&",65:"~",66:"OP_EQ",67:"OP_NE",68:"OP_GE",69:"OP_LE",71:"FUNCTION"},
productions_: [0,[3,2],[6,1],[6,2],[8,1],[8,3],[8,3],[9,1],[9,2],[9,2],[14,1],[14,3],[14,3],[18,4],[21,1],[21,2],[21,2],[21,1],[21,1],[24,1],[24,1],[24,2],[24,2],[24,2],[24,1],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[24,3],[29,2],[29,1],[31,1],[31,3],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[32,1],[48,1],[48,3],[49,3],[49,5],[51,1],[51,2],[52,4],[52,3],[52,6],[52,5],[52,4],[52,3],[52,1],[54,1],[53,1],[53,1],[53,3],[53,3],[53,4],[53,4],[53,3],[53,4],[53,2],[53,2],[57,3],[58,3],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,4],[4,2],[4,3],[4,3],[4,3],[4,3],[4,4],[4,3],[4,7],[4,2],[4,2],[4,2],[4,4],[4,4],[70,3],[70,2],[72,1],[72,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 result = new DevExpress.JS.Data.CriteriaOperator(); 
break;
case 3:
 result = $$[$0-1]; 
break;
case 4:
 this.$ = [ $$[$0] ]; 
break;
case 5: case 6:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 7: case 10: case 17: case 39: case 42: case 43: case 44: case 45: case 46: case 47: case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 86: case 87: case 88: case 89:
 this.$ = $$[$0]; 
break;
case 8: case 79: case 80: case 112: case 122:
 this.$ = $$[$0-1]; 
break;
case 9:
 this.$ = new DevExpress.JS.Data.FunctionOperator(DevExpress.JS.Data.FunctionOperatorType.OrderDescToken, $$[$0-1]); 
break;
case 11: case 40:
 this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '.' + $$[$0].propertyName); 
break;
case 12:
 this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '+' + $$[$0].propertyName); 
break;
case 13:
 this.$ = new DevExpress.JS.Data.OperandProperty('<' + $$[$0-2].propertyName + '>' + $$[$0].propertyName); 
break;
case 14: case 20:
 this.$ = new DevExpress.JS.Data.OperandProperty($$[$0]); 
break;
case 15: case 16: case 21:
 this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-1].propertyName + ' ' + $$[$0]); 
break;
case 18:
 this.$ = new DevExpress.JS.Data.OperandProperty("^"); 
break;
case 19:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0]); 
break;
case 22: case 23:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-1].propertyName + ' ' + $$[$0]); 
break;
case 24:
  this.$ = new DevExpress.JS.Data.OperandProperty("^"); 
break;
case 25: case 26: case 27:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '-' + $$[$0]); 
break;
case 28: case 29:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '[' + $$[$0]); 
break;
case 30: case 31: case 32: case 33:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '+' + $$[$0]); 
break;
case 34: case 35: case 36:
  this.$ = new DevExpress.JS.Data.OperandProperty($$[$0-2].propertyName + '=' + $$[$0]); 
break;
case 37:
 this.$ = new DevExpress.JS.Data.OperandParameter($$[$0]); 
break;
case 38:
 this.$ = new DevExpress.JS.Data.OperandValue(undefined); 
break;
case 41:
 this.$ = $$[$0].propertyName; 
break;
case 58:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 59:

  var lst = [];
  lst.push($$[$0-1]);
  this.$ = {
   column: _$[$0-1].first_column,
   line: _$[$0-1].first_line - 1,
   names: lst
  };
 
break;
case 60:

  var propertyNameObject = $$[$0-4];
  propertyNameObject.names.push($$[$0-1]);
  this.$ = propertyNameObject;
 
break;
case 61:
 this.$ = new DevExpress.JS.Data.OperandProperty($$[$0].names.join('.'), $$[$0].column, $$[$0].line); 
break;
case 62:
 this.$ = new DevExpress.JS.Data.OperandProperty(); 
break;
case 63:

		var agg = $$[$0];
		this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate(new DevExpress.JS.Data.OperandProperty(), null, agg.operatorType, agg.aggregatedExpression);
	
break;
case 64:

		var agg = $$[$0];
		this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate(new DevExpress.JS.Data.OperandProperty($$[$0-2].names.join('.'), $$[$0-2].column, $$[$0-2].line), null, agg.operatorType, agg.aggregatedExpression);
	
break;
case 65:

		var agg = $$[$0];
		this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate($$[$0-5], $$[$0-3], agg.operatorType, agg.aggregatedExpression);
	
break;
case 66:

		var agg = $$[$0];
		this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate($$[$0-4], null, agg.operatorType, agg.aggregatedExpression);
	
break;
case 67:
 this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate($$[$0-3], $$[$0-1], DevExpress.JS.Data.Aggregate.Exists, null); 
break;
case 68:
 this.$ = DevExpress.JS.Data.JoinOperand.joinOrAggregate($$[$0-2], null, DevExpress.JS.Data.Aggregate.Exists, null); 
break;
case 71: case 73:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, null, DevExpress.JS.Data.Aggregate.Count, null); 
break;
case 72: case 74:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, null, DevExpress.JS.Data.Aggregate.Exists, null); 
break;
case 75:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, $$[$0-1], DevExpress.JS.Data.Aggregate.Avg, null); 
break;
case 76:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, $$[$0-1], DevExpress.JS.Data.Aggregate.Sum, null); 
break;
case 77:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, new DevExpress.JS.Data.OperandProperty("This"), DevExpress.JS.Data.Aggregate.Single, null); 
break;
case 78:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, $$[$0-1], DevExpress.JS.Data.Aggregate.Single, null); 
break;
case 81:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, $$[$0], DevExpress.JS.Data.Aggregate.Min, null); 
break;
case 82:
 this.$ = new DevExpress.JS.Data.AggregateOperand(null, $$[$0], DevExpress.JS.Data.Aggregate.Max, null); 
break;
case 83:
 this.$ = new DevExpress.JS.Data.ConstantValue($$[$0]); 
break;
case 84:
 this.$ = new DevExpress.JS.Data.ConstantValue(parseFloat($$[$0])); 
break;
case 85:
 this.$ = new DevExpress.JS.Data.ConstantValue(null); 
break;
case 90:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Multiply); 
break;
case 91:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Divide); 
break;
case 92:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Plus); 
break;
case 93:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Minus); 
break;
case 94:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Modulo); 
break;
case 95:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.BitwiseOr); 
break;
case 96:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.BitwiseAnd); 
break;
case 97:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.BitwiseXor); 
break;
case 98:

								this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.Minus, $$[$0]);
							
break;
case 99:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.Plus, $$[$0]); 
break;
case 100:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.BitwiseNot, $$[$0]); 
break;
case 101:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Equal); 
break;
case 102:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.NotEqual); 
break;
case 103:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Greater); 
break;
case 104:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Less); 
break;
case 105:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.GreaterOrEqual); 
break;
case 106:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.LessOrEqual); 
break;
case 107:
 this.$ = new DevExpress.JS.Data.BinaryOperator($$[$0-2], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Like); 
break;
case 108:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.Not, new DevExpress.JS.Data.BinaryOperator($$[$0-3], $$[$0], DevExpress.JS.Data.BinaryOperatorType.Like)); 
break;
case 109:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.Not, $$[$0]); 
break;
case 110:
 this.$ = DevExpress.JS.Data.GroupOperator.combine(DevExpress.JS.Data.GroupOperatorType.And, [$$[$0-2], $$[$0]]); 
break;
case 111:
 this.$ = DevExpress.JS.Data.GroupOperator.combine(DevExpress.JS.Data.GroupOperatorType.Or, [$$[$0-2], $$[$0]]); 
break;
case 113:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.IsNull, $$[$0-2]); 
break;
case 114:
 this.$ = new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.Not, new DevExpress.JS.Data.UnaryOperator(DevExpress.JS.Data.UnaryOperatorType.IsNull, $$[$0-3])); 
break;
case 115:
 this.$ = new DevExpress.JS.Data.InOperator($$[$0-2], $$[$0]); 
break;
case 116:
 this.$ = new DevExpress.JS.Data.BetweenOperator($$[$0-6], $$[$0-3], $$[$0-1]); 
break;
case 117: case 118:
  this.$ = new DevExpress.JS.Data.FunctionOperator(DevExpress.JS.Data.FunctionOperatorType[$$[$0-1]] || $$[$0-1], $$[$0]); 
break;
case 119:
 this.$ = null; 
break;
case 120:
 this.$ = new DevExpress.JS.Data.FunctionOperator(DevExpress.JS.Data.FunctionOperatorType.Min, [$$[$0-3].aggregatedExpression, $$[$0-1]]); 
break;
case 121:
 this.$ = new DevExpress.JS.Data.FunctionOperator(DevExpress.JS.Data.FunctionOperatorType.Max, [$$[$0-3].aggregatedExpression, $$[$0-1]]); 
break;
case 123:
 this.$ = []; 
break;
case 124:

							var lst = [];
							lst.push($$[$0]);
							this.$ = lst;
						
break;
case 125:

							var lst = $$[$0-2];
							lst.push($$[$0]);
							this.$ = lst;
						
break;
}
},
table: [{3:1,4:2,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{1:[3]},{5:[1,35],17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,83]),o($VG,[2,84]),o($VG,[2,85]),o($VG,[2,86]),o($VG,[2,87],{27:[1,57]}),o($VG,[2,88],{16:[1,58]}),o($VG,[2,89]),{4:59,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:60,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:61,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:62,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:63,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,56:[1,64],57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{55:$VH,70:65},o($VI,$VJ,{70:67,55:$VH}),{11:[1,68],56:$VK},{11:[1,70],56:$VL},o($VG,[2,38],{15:[1,72]}),o($VM,[2,61],{16:[1,73]}),{15:$VN,23:$VO,24:77,25:$VP,32:76,33:$VQ,34:$VR,35:$VS,36:$VT,37:$VU,38:$VV,39:$VW,40:$VX,41:$VY,42:$VZ,43:$V_,44:$V$,45:$V01,46:$V11,47:$V21,48:75,50:[1,74]},o($V31,[2,39],{15:$V41,22:$V51}),o($VG,[2,69]),{55:[1,98]},{55:[1,99]},o($VI,[2,17]),o($VI,[2,18]),o($VG,[2,70]),{14:100,15:[1,101]},o($VG,[2,71],{55:[1,102]}),o($VG,[2,72],{55:[1,103]}),{55:[1,104]},{55:[1,105]},{55:[1,106]},{1:[2,1]},{4:107,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:108,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:109,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:110,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:111,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:112,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:113,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:114,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:115,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:116,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:117,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:118,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:119,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:120,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:121,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{40:[1,122]},{4:123,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:124,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{45:[1,126],47:[1,125]},{55:$VH,70:127},{55:[1,128]},{4:129,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,50:[1,130],51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{15:[1,132],18:26,19:$V2,21:131,23:$V4},o($VG,[2,98]),o($VG,[2,99]),o($V61,[2,100],{17:$Vl,26:$Vp,60:$Vx,61:$Vy,62:$Vz}),o($V71,[2,109],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,133],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,119]),o($VG,[2,117]),{4:136,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,56:[1,135],57:17,58:18,59:$Vi,65:$Vj,71:$Vk,72:134},o($VG,[2,118]),{4:137,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},o($VG,[2,79]),{4:138,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},o($VG,[2,80]),o($VG,[2,37]),{27:[1,140],33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,53:139,57:141,58:142},o($VM,[2,62],{16:[1,143]}),{16:$V81,50:[1,144]},o($V91,[2,57]),o($V91,[2,41],{15:[1,146],17:[1,151],22:[1,148],25:[1,147],26:[1,149],27:[1,150],28:[1,152]}),o($V91,[2,42]),o($V91,[2,43]),o($V91,[2,44]),o($V91,[2,45]),o($V91,[2,46]),o($V91,[2,47]),o($V91,[2,48]),o($V91,[2,49]),o($V91,[2,50]),o($V91,[2,51]),o($V91,[2,52]),o($V91,[2,53]),o($V91,[2,54]),o($V91,[2,55]),o($V91,[2,56]),o($Va1,[2,19]),o($Va1,[2,20]),o($Va1,[2,24]),o($VI,[2,15]),o($VI,[2,16]),{4:153,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:154,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{16:[1,156],17:[1,157],20:[1,155]},o($Vb1,[2,10]),{56:[1,158]},{56:[1,159]},{4:160,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:161,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{4:163,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,56:[1,162],57:17,58:18,59:$Vi,65:$Vj,71:$Vk},o($VG,[2,90]),o($VG,[2,91]),o($Vc1,[2,92],{60:$Vx,61:$Vy,62:$Vz}),o($Vc1,[2,93],{60:$Vx,61:$Vy,62:$Vz}),o($VG,[2,94]),o([5,11,19,20,40,41,42,43,44,45,46,50,56,63,66,67,68,69],[2,95],{17:$Vl,23:$Vo,26:$Vp,60:$Vx,61:$Vy,62:$Vz,64:$VB}),o($V61,[2,96],{17:$Vl,26:$Vp,60:$Vx,61:$Vy,62:$Vz}),o([5,11,19,20,23,40,41,42,43,44,45,46,50,56,63,66,67,68,69],[2,97],{17:$Vl,26:$Vp,60:$Vx,61:$Vy,62:$Vz,64:$VB}),o($Vd1,[2,101],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,68:$VE,69:$VF}),o($Vd1,[2,102],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,68:$VE,69:$VF}),o($Ve1,[2,103],{17:$Vl,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB}),o($Ve1,[2,104],{17:$Vl,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB}),o($Ve1,[2,105],{17:$Vl,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB}),o($Ve1,[2,106],{17:$Vl,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB}),o($Vd1,[2,107],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,68:$VE,69:$VF}),{4:164,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},o($V71,[2,110],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),o([5,11,42,50,56],[2,111],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),o($VG,[2,113]),{47:[1,165]},o($VG,[2,115]),{4:166,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,50:[1,167],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,68],{16:[1,168]}),o($V31,[2,40],{15:$V41,22:$V51}),o($VI,$VJ),o($VG,[2,112]),{11:[1,170],56:[1,169]},o($VG,[2,123]),o($Vf1,[2,124],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,171],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,172],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,64]),{15:$VN,23:$VO,24:77,25:$VP,32:76,33:$VQ,34:$VR,35:$VS,36:$VT,37:$VU,38:$VV,39:$VW,40:$VX,41:$VY,42:$VZ,43:$V_,44:$V$,45:$V01,46:$V11,47:$V21,48:173},{56:$VK},{56:$VL},{33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,53:174,57:141,58:142},o($Vg1,[2,59]),{15:$VN,23:$VO,24:77,25:$VP,32:175,33:$VQ,34:$VR,35:$VS,36:$VT,37:$VU,38:$VV,39:$VW,40:$VX,41:$VY,42:$VZ,43:$V_,44:$V$,45:$V01,46:$V11,47:$V21},o($Va1,[2,21]),o($Va1,[2,22]),o($Va1,[2,23]),{15:[1,176],22:[1,178],25:[1,177]},{15:[1,179],22:[1,181],25:[1,180]},{15:[1,182],22:[1,184],25:[1,183]},{15:[1,185],22:[1,187],25:[1,186]},o($Vf1,[2,81],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),o($Vf1,[2,82],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),{15:[1,188]},{15:[1,189]},{15:[1,190]},o($VG,[2,73]),o($VG,[2,74]),{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,191],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,192],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,77]),{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,193],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($Vd1,[2,108],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,43:$Vt,44:$Vu,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,68:$VE,69:$VF}),o($VG,[2,114]),{11:[1,194],17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,67],{16:[1,195]}),{33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,53:196,57:141,58:142},o($VG,[2,122]),{4:197,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},o($VG,[2,120]),o($VG,[2,121]),{16:$V81,50:[1,198]},o($VG,[2,63]),o($V91,[2,58]),o($Va1,[2,25]),o($Va1,[2,26]),o($Va1,[2,27]),o($Va1,[2,28]),o($Va1,[2,29]),o($Va1,[2,30]),o($Va1,[2,31]),o($Va1,[2,32]),o($Va1,[2,33]),o($Va1,[2,34]),o($Va1,[2,35]),o($Va1,[2,36]),o($VI,[2,13]),o($Vb1,[2,11]),o($Vb1,[2,12]),o($VG,[2,75]),o($VG,[2,76]),o($VG,[2,78]),{4:199,15:$V0,17:$V1,18:26,19:$V2,21:22,22:$V3,23:$V4,26:$V5,27:$V6,29:6,30:$V7,31:8,33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,45:$Vf,47:$Vg,49:20,51:7,52:9,53:28,54:23,55:$Vh,57:17,58:18,59:$Vi,65:$Vj,71:$Vk},{33:$V8,34:$V9,35:$Va,36:$Vb,37:$Vc,38:$Vd,39:$Ve,53:200,57:141,58:142},o($VG,[2,66]),o($Vf1,[2,125],{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF}),o($Vg1,[2,60]),{17:$Vl,19:$Vm,20:$Vn,23:$Vo,26:$Vp,40:$Vq,41:$Vr,42:$Vs,43:$Vt,44:$Vu,45:$Vv,46:$Vw,56:[1,201],60:$Vx,61:$Vy,62:$Vz,63:$VA,64:$VB,66:$VC,67:$VD,68:$VE,69:$VF},o($VG,[2,65]),o($VG,[2,116])],
defaultActions: {35:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
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
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 43
break;
case 2:return 44
break;
case 3:return 45
break;
case 4:return 46
break;
case 5:return 47
break;
case 6:return 60
break;
case 7:return 61
break;
case 8:return 26
break;
case 9:return 17
break;
case 10:return 23
break;
case 11:return 67
break;
case 12:return '!'
break;
case 13:return 62
break;
case 14:return 55
break;
case 15:return 56
break;
case 16:return 27
break;
case 17:return 50
break;
case 18:return 67
break;
case 19:return 68
break;
case 20:return 69
break;
case 21:return 20
break;
case 22:return 19
break;
case 23:return 42
break;
case 24:return 41
break;
case 25:return 34
break;
case 26:return 35
break;
case 27:return 36
break;
case 28:return 37
break;
case 29:return 33
break;
case 30:return 38
break;
case 31:return 39
break;
case 32:return 66
break;
case 33:return 66
break;
case 34:return 40
break;
case 35:return 41
break;
case 36:return 42
break;
case 37:return 5
break;
case 38:return 22
break;
case 39:return 16
break;
case 40:return 11
break;
case 41:return 30
break;
case 42:return 59
break;
case 43:return 59
break;
case 44:return 15	
break;
case 45:return 59	
break;
case 46:return 59
break;
case 47:return 25   
break;
case 48:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:Between\b)/,/^(?:In\b)/,/^(?:Not\b)/,/^(?:Is\b)/,/^(?:Null\b)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:\^)/,/^(?:!=)/,/^(?:!)/,/^(?:%)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:<>)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:Avg\b)/,/^(?:Max\b)/,/^(?:Min\b)/,/^(?:Single\b)/,/^(?:Count\b)/,/^(?:Exists\b)/,/^(?:Sum\b)/,/^(?:==)/,/^(?:=)/,/^(?:Like\b)/,/^(?:And\b)/,/^(?:Or\b)/,/^(?:$)/,/^(?:(?:\d*\.)?\d+)/,/^(?:\.)/,/^(?:,)/,/^(?:\?)/,/^(?:True\b)/,/^(?:False\b)/,/^(?:^[a-zA-Z_][a-zA-Z0-9_]*)/,/^(?:'[^']*')/,/^(?:#[^#]*#)/,/^(?:.+(?=\]))/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
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


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = criteriaparser;
exports.Parser = criteriaparser.Parser;
exports.parse = function () { return criteriaparser.parse.apply(criteriaparser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
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
        Designer.BaseActionsProvider = BaseActionsProvider;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
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
                var updateTop = function (value) {
                    var top = (value === 0 || !!value) ? value : $(element).prev().position().top + $(element).prev().height();
                    $(element).css('top', top + "px");
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
                var $element = $(element), parent = $($(element).parents(".dx-designer")[0]), containment = values.containment || ".dxrd-ghost-container", initialScroll = { left: 0, top: 0 }, attachDelta = function (ui) {
                    var $containment = parent.find(containment), $ghost_container = parent.find(".dxrd-ghost-container");
                    ui["delta"] = { left: $ghost_container.offset().left - $containment.offset().left, top: $ghost_container.offset().top - $containment.offset().top };
                    var $viewport = parent.find(".dxrd-viewport");
                    ui["scroll"] = { left: $viewport.scrollLeft() - initialScroll.left, top: $viewport.scrollTop() - initialScroll.top };
                }, options = $.extend({ snap: '.dxrd-drag-snap-line', snapTolerance: Designer.SnapLinesHelper.snapTolerance }, ko.unwrap(values), {
                    start: function (event, ui) {
                        Designer.DragDropHandler.started(true);
                        var draggable = $element.data("ui-draggable");
                        var $viewport = parent.find(".dxrd-viewport");
                        initialScroll.left = $viewport.scrollLeft();
                        initialScroll.top = $viewport.scrollTop();
                        values.startDrag && values.startDrag(ko.dataFor(event.currentTarget || event.toElement));
                    },
                    stop: function (event, ui) {
                        attachDelta(ui);
                        values.stopDrag(ui, ko.dataFor(event.target));
                        Designer.DragDropHandler.started(false);
                    },
                    drag: function (event, ui) {
                        if (event.altKey === true || values.alwaysAlt) {
                            $element.draggable("option", "snap", false);
                        }
                        else {
                            $element.draggable("option", "snap", ".dxrd-drag-snap-line");
                        }
                        attachDelta(ui);
                        values.drag && values.drag(event, ui);
                    },
                    helper: function (event) {
                        $element.draggable("option", "snap", ".dxrd-drag-snap-line");
                        values.helper && values.helper(ko.dataFor(event.currentTarget || event["toElement"]));
                        var $container = parent.find('.dxrd-drag-helper-source').clone().css({ 'display': 'block' });
                        $container.prependTo(parent.find(options.containment));
                        ko.applyBindings(bindingContext.$root, $container[0]);
                        return $container;
                    }
                });
                options.containment = parent.find(options.containment);
                $element.draggable(options);
            }
        };
        ko.bindingHandlers["resizable"] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var values = valueAccessor(), $element = $(element), $selectedNodes = null, options = $.extend({
                    handles: values.handles || "all", ghost: false,
                    stop: function (event, ui) {
                        $selectedNodes.each(function (_, el) {
                            var control = ko.dataFor(el), surface = ko.contextFor(el).$root.surface(), $el = $(el);
                            control.rect(Designer.getControlRect($el, control, surface));
                            $el.removeData("originalPosition");
                            $el.removeData("originalSize");
                        });
                        values.stopped();
                        values.started = false;
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
                    },
                    resize: function (event, ui) {
                        var dw = ui.size.width - ui.originalSize.width, dh = ui.size.height - ui.originalSize.height, dx = ui.position.left - ui.originalPosition.left, dy = ui.position.top - ui.originalPosition.top;
                        if (values.forceResize) {
                            values.forceResize({ size: new Designer.Size(ui.size.width, ui.size.height), delta: { dx: dx, dy: dy, dw: dw, dh: dh } });
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
                    subscription = Designer.DragDropHandler.started.subscribe(function (newVal) {
                        $element.resizable("option", "disabled", newVal);
                        newVal ? $element.children(".ui-resizable-handle").css("display", "none") : $element.children(".ui-resizable-handle").css("display", "block");
                    });
                }
                $element.resizable(options);
                $element.resizable().on("resize", function (event) {
                    event.stopPropagation();
                });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
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
        Designer.cssTransform = ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"];
        ko.bindingHandlers["zoom"] = {
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor() || {});
                for (var i = 0; i < Designer.cssTransform.length; i++) {
                    element.style[Designer.cssTransform[i]] = "scale(" + (value) + ")";
                }
                $(element).addClass("dxrd-transform-origin-left-top");
            }
        };
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
        ko.bindingHandlers["keyDownActions"] = (function () {
            var handlersManager = new KeyDownHandlersManager($(window));
            return {
                init: function (element, valueAccessor) {
                    var actionLists = valueAccessor(), handler = function (e) { actionLists.processShortcut(actionLists.toolbarItems, e); };
                    handlersManager.bindHandler(element, handler);
                }
            };
        })();
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Disposable = (function () {
            function Disposable() {
                this._disposables = [];
                this.isDisposing = false;
            }
            Disposable.prototype.dispose = function () {
                this.isDisposing = true;
                ko.utils.arrayForEach(this._disposables, this.disposeOne);
                ko.utils["objectForEach"](this, this.disposeOne);
                this._disposables = [];
            };
            Disposable.prototype.disposeOne = function (propOrValue, value) {
                var disposable = value || propOrValue;
                if (disposable && !disposable.isDisposing && typeof disposable.dispose === "function") {
                    disposable.dispose();
                }
            };
            return Disposable;
        })();
        Designer.Disposable = Disposable;
        function copyObservables(from, to) {
            for (var name in (from || {})) {
                if (ko.isObservable(from[name])) {
                    to[name](from[name]());
                }
                else {
                    copyObservables(from[name], to[name]);
                }
            }
            ;
        }
        Designer.copyObservables = copyObservables;
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
        Designer.compareObjects = compareObjects;
        var ElementViewModel = (function (_super) {
            __extends(ElementViewModel, _super);
            function ElementViewModel(model, parent, serializer) {
                var _this = this;
                _super.call(this);
                this.actions = [];
                this.update = ko.observable(false);
                this.parentModel = ko.observable(parent);
                this.controlType = this.controlType || this.getControlFactory().getControlType(model);
                serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
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
                            copyObservables(defaultValue, _this[propertyName]);
                        }
                    }
                };
                this.actions.push({ action: this.resetValue, title: "Reset", visible: this.isResettableProperty });
            }
            ElementViewModel.prototype.getPropertyDefaultValue = function (propertyName) {
                var info = this.getPropertyInfo(propertyName);
                return ko.unwrap(info && new DevExpress.JS.Utils.ModelSerializer().deserializeProperty(info, {}));
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
                        return !compareObjects(defaultValue, propertyValue);
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
        })(Disposable);
        Designer.ElementViewModel = ElementViewModel;
        ;
        function findSurface(viewModel) {
            return viewModel["surface"];
        }
        Designer.findSurface = findSurface;
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
            return (Math.round(result * 100) / 100);
        }
        Designer.unitsToPixel = unitsToPixel;
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
            return Math.round(result * 100) / 100;
        }
        Designer.pixelToUnits = pixelToUnits;
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
        Designer.HoverInfo = HoverInfo;
        function createObservableReverseArrayMapCollection(elementModels, target, createItem) {
            elementModels.peek().forEach(function (item) {
                var surface = createItem(item);
                target.splice(0, 0, surface);
            });
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
        Designer.createObservableReverseArrayMapCollection = createObservableReverseArrayMapCollection;
        function createObservableArrayMapCollection(elementModels, target, createItem) {
            elementModels.peek().forEach(function (item) {
                var surface = createItem(item);
                target.push(surface);
            });
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
        Designer.createObservableArrayMapCollection = createObservableArrayMapCollection;
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
                    Designer.createUnitProperties(control, this, unitProperties, this._context.measureUnit, this._context.zoom);
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
            SurfaceElementArea.prototype.rtlLayout = function () {
                return !!ko.unwrap(this._context.rtl);
            };
            SurfaceElementArea.prototype.getControlModel = function () {
                return this._control;
            };
            return SurfaceElementArea;
        })(Disposable);
        Designer.SurfaceElementArea = SurfaceElementArea;
        var SurfaceElementBase = (function (_super) {
            __extends(SurfaceElementBase, _super);
            function SurfaceElementBase(control, context, unitProperties) {
                var _this = this;
                _super.call(this, control, context, unitProperties);
                this._countSelectedChildren = ko.observable(0);
                this.focused = ko.observable(false);
                this.selected = ko.observable(false);
                this.underCursor = ko.observable(new HoverInfo());
                this.allowMultiselect = true;
                this.absolutePosition = new Designer.Point(0, 0);
                this.snapLines = ko.observableArray([]);
                this.getControlModel = function () {
                    return control;
                };
                this.cssCalculator = new Designer.CssCalculator(control, context.rtl);
                if (this._getChildrenHolderName() && control[this._getChildrenHolderName()]) {
                    var collection = ko.observableArray();
                    if (this._getChildrenHolderName() === "controls") {
                        createObservableReverseArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface);
                    }
                    else {
                        createObservableArrayMapCollection(control[this._getChildrenHolderName()], collection, this._createSurface);
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
                    return $.extend({}, _this.cssCalculator.fontCss(), _this.cssCalculator.foreColorCss(), _this.cssCalculator.textAlignmentCss(), _this.cssCalculator.angle(), _this.cssCalculator.paddingsCss());
                });
                this._disposables.push(ko.computed(function () {
                    _this.updateAbsolutePosition();
                }));
                this.absoluteRect = ko.pureComputed(function () {
                    var controlRect = _this.rect(), absolutePositionY = _this.absolutePosition.y();
                    return { top: absolutePositionY, left: controlRect.left, right: controlRect.right, bottom: absolutePositionY + controlRect.height, width: controlRect.width, height: controlRect.height };
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
        Designer.SurfaceElementBase = SurfaceElementBase;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        Designer.localization_values = {
            'Page Header': 'DevExpress.XtraReports.UI.PageHeaderBand',
            'Max Nesting Level': 'DevExpress.XtraReports.UI.XRTableOfContents.MaxNestingLevel',
            'Null Value Text': 'DevExpress.XtraReports.UI.XRControl.NullValueText',
            'Process Null Values': 'DevExpress.XtraReports.UI.XRPictureBox.ProcessNullValues',
            'Actual Value': 'DevExpress.XtraReports.UI.XRGauge.ActualValue',
            'Custom Draw a Series Point': 'DevExpress.XtraReports.UI.XRChartScripts.OnCustomDrawSeriesPoint',
            'Row Count for Preview': 'DevExpress.XtraReports.UI.XtraReport.PreviewRowCount',
            'Image Type': 'DevExpress.XtraReports.UI.XRSparkline.ImageType',
            'Synchronize Bounds': 'DevExpress.XtraReports.UI.WinControlContainer.SyncBounds',
            'Fill Color': 'DevExpress.XtraReports.UI.XRShape.FillColor',
            'Size Changed': 'DevExpress.XtraReports.UI.SubreportBaseScripts.OnSizeChanged',
            'Text': 'ASPxReportsStringId.ExportName_txt',
            'Top': 'DevExpress.XtraReports.UI.XRDockStyle.Top',
            'Format': 'DevExpress.XtraReports.UI.XRPageInfo.Format',
            'Drill-Down Expanded': 'DevExpress.XtraReports.UI.Band.DrillDownExpanded',
            'Group Fields': 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupFields',
            'Use Font': 'DevExpress.XtraReports.UI.StyleUsing.UseFont',
            'Custom Total Cell Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.CustomTotalCellStyle',
            'Process Duplicates Target': 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicatesTarget',
            'Parameter Bindings': 'DevExpress.XtraReports.UI.XRSubreport.ParameterBindings',
            'Lines': 'DevExpress.XtraReports.UI.XRRichText.Lines',
            'Script Security Permissions': 'DevExpress.XtraReports.UI.XtraReport.ScriptSecurityPermissions',
            'Sorting Summary Get Result': 'DevExpress.XtraReports.UI.GroupHeaderBandScripts.OnSortingSummaryGetResult',
            'Use Text Alignment': 'DevExpress.XtraReports.UI.StylePriority.UseTextAlignment',
            'Summary Get Result': 'DevExpress.XtraReports.UI.XRLabelScripts.OnSummaryGetResult',
            'Keep Together': 'DevExpress.XtraReports.UI.XRControl.KeepTogether',
            'Field Value Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.FieldValueStyle',
            'Padding': 'DevExpress.XtraReports.UI.XRBarCode.PaddingInfo',
            'Data Adapter': 'DevExpress.XtraReports.UI.XRPivotGrid.DataAdapter',
            'Data Source': 'DevExpress.XtraReports.UI.XRSparkline.DataSource',
            'Palette Name': 'DevExpress.XtraReports.UI.XRChart.PaletteName',
            'Report Print Options': 'DevExpress.XtraReports.UI.ReportPrintOptions',
            'Filter Separator': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FilterSeparator',
            'Column Width': 'DevExpress.XtraReports.UI.MultiColumn.ColumnWidth',
            'Column Count': 'DevExpress.XtraReports.UI.MultiColumn.ColumnCount',
            'Show Text': 'DevExpress.XtraReports.UI.XRBarCode.ShowText',
            'Line Width': 'DevExpress.XtraReports.UI.XRShape.LineWidth',
            'Line Style': 'DevExpress.XtraReports.UI.XRShape.LineStyle',
            'Parameters': 'DevExpress.XtraReports.UI.XtraReport.Parameters',
            'Location': 'DevExpress.XtraReports.UI.XRControl.Location',
            'Group Union': 'DevExpress.XtraReports.UI.GroupHeaderBand.GroupUnion',
            'Bottom Margin': 'DevExpress.XtraReports.UI.BottomMarginBand',
            'Merge': 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Merge',
            'Leave': 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.Leave',
            'Process Duplicates Mode': 'DevExpress.XtraReports.UI.XRBarCode.ProcessDuplicatesMode',
            'Empty Chart Text': 'DevExpress.XtraReports.UI.XRChart.EmptyChartText',
            'Anchor Horizontally': 'DevExpress.XtraReports.UI.XRControl.AnchorHorizontal',
            'Repeat Every Page': 'DevExpress.XtraReports.UI.GroupBand.RepeatEveryPage',
            'Multiline': 'DevExpress.XtraReports.UI.XRRichTextBoxBase.Multiline',
            'Visual Basic': 'DevExpress.XtraReports.ScriptLanguage.VisualBasic',
            'Average': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Average',
            'Min': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Min',
            'Max': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Max',
            'Variance': 'DevExpress.XtraReports.UI.SortingSummaryFunction.Var',
            'Sum': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Sum',
            'Direction': 'DevExpress.XtraReports.UI.MultiColumn.Direction',
            'Group Header': 'DevExpress.XtraReports.UI.GroupHeaderBand',
            'Font': 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font',
            'Group': 'DevExpress.XtraReports.UI.SummaryRunning.Group',
            'Watermark': 'DevExpress.XtraReports.UI.XtraReport.Watermark',
            'Even Style': 'DevExpress.XtraReports.UI.XRControl.XRControlStyles.EvenStyle',
            'Show Print Status Dialog': 'DevExpress.XtraReports.UI.XtraReport.ShowPrintStatusDialog',
            'Data Member': 'DevExpress.XtraReports.UI.XRSparkline.DataMember',
            'Function': 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Function',
            'Condition': 'DevExpress.XtraReports.UI.FormattingRule.Condition',
            'Scripts': 'DevExpress.XtraReports.UI.Band.Scripts',
            'OLAP Connection String': 'DevExpress.XtraReports.UI.XRPivotGrid.OLAPConnectionString',
            'Bound Data Changed': 'DevExpress.XtraReports.UI.XRChartScripts.OnBoundDataChanged',
            'Snap Line Margin': 'DevExpress.XtraReports.UI.XRControl.SnapLineMargin',
            'Level': 'DevExpress.XtraReports.UI.DetailReportBand.Level',
            'Export Options': 'DevExpress.XtraReports.UI.XtraReport.ExportOptions',
            'Value Range': 'DevExpress.XtraReports.UI.XRSparkline.ValueRange',
            'Average (Distinct)': 'DevExpress.XtraReports.UI.SummaryFunc.DAvg',
            'Summary (Distinct)': 'DevExpress.XtraReports.UI.SummaryFunc.DSum',
            'Variance (Distinct)': 'DevExpress.XtraReports.UI.SummaryFunc.DVar',
            'Population Variance': 'DevExpress.XtraReports.UI.SummaryFunc.VarP',
            'Evaluate Binding': 'DevExpress.XtraReports.UI.SubreportBaseScripts.OnEvaluateBinding',
            'Mouse Up in Preview': 'DevExpress.XtraReports.UI.XRControlEvents.OnPreviewMouseUp',
            'Maximum': 'DevExpress.XtraReports.UI.XRGauge.Maximum',
            'Custom Total Cell': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.CustomTotalCell',
            'No': 'ASPxReportsStringId.ParametersPanel_False',
            'Detect URLs': 'DevExpress.XtraReports.UI.XRRichTextBoxBase.DetectUrls',
            'Series Template': 'DevExpress.XtraReports.UI.XRChart.SeriesTemplate',
            'Pie Series Point Exploded': 'DevExpress.XtraReports.UI.XRChartScripts.OnPieSeriesPointExploded',
            'Custom': 'DevExpress.XtraReports.UI.SortingSummaryFunction.Custom',
            'Palette\'s Base Color Number': 'DevExpress.XtraReports.UI.XRChart.PaletteBaseColorNumber',
            'Percentage': 'DevExpress.XtraReports.UI.SummaryFunc.Percentage',
            'Bookmark Duplicate Suppress': 'DevExpress.XtraReports.UI.XtraReport.BookmarkDuplicateSuppress',
            'Custom Summary': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomSummary',
            'Panel': 'DevExpress.XtraReports.UI.XRPanel',
            'Shape': 'DevExpress.XtraReports.UI.XRShape',
            'Using Style': 'DevExpress.XtraReports.UI.XRControlStyle.StyleUsing',
            'Table': 'DevExpress.XtraReports.UI.XRTable',
            'Start Point': 'DevExpress.XtraReports.UI.XRCrossBandControl.StartPoint',
            'Chart': 'DevExpress.XtraReports.UI.XRChart',
            'Gauge': 'DevExpress.XtraReports.UI.XRGauge',
            'Label': 'DevExpress.XtraReports.UI.XRLabel',
            'Metafile': 'DevExpress.XtraReports.UI.GaugeImageType.Metafile',
            'Use Foreground Color': 'DevExpress.XtraReports.UI.StylePriority.UseForeColor',
            'Yes': 'ASPxReportsStringId.ParametersPanel_True',
            'Sorting Summary': 'DevExpress.XtraReports.UI.GroupHeaderBand.SortingSummary',
            'Running Band': 'DevExpress.XtraReports.UI.XRPageInfo.RunningBand',
            'Before the Band': 'DevExpress.XtraReports.UI.PageBreak.BeforeBand',
            'Double-Click in Preview': 'DevExpress.XtraReports.UI.XRControlEvents.OnPreviewDoubleClick',
            'Field Name': 'DevExpress.XtraReports.UI.XRGroupSortingSummary.FieldName',
            'Request Parameters': 'DevExpress.XtraReports.UI.XtraReport.RequestParameters',
            'Count (Distinct)': 'DevExpress.XtraReports.UI.SortingSummaryFunction.DCount',
            'Field Value Grand Total Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.FieldValueGrandTotalStyle',
            'Table Row': 'DevExpress.XtraReports.UI.XRTableRow',
            'Data Bindings': 'DevExpress.XtraReports.UI.XRControl.DataBindings',
            'Parent Changed': 'DevExpress.XtraReports.UI.XRControlEvents.OnParentChanged',
            'With Last Detail': 'DevExpress.XtraReports.UI.GroupFooterUnion.WithLastDetail',
            'Custom Unbound Field Data': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomUnboundFieldData',
            'Custom Group Interval': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomGroupInterval',
            'Page Information': 'DevExpress.XtraReports.UI.XRPageInfo.PageInfo',
            'Checked': 'DevExpress.XtraReports.UI.XRCheckBox.Checked',
            'Bookmark': 'DevExpress.XtraReports.UI.XRControl.Bookmark',
            'Bitmap': 'DevExpress.XtraReports.UI.WinControlImageType.Bitmap',
            'Height': 'DevExpress.XtraReports.UI.Band.Height',
            'Minimum': 'DevExpress.XtraReports.UI.XRGauge.Minimum',
            'After the Band, Except for the Last Entry': 'DevExpress.XtraReports.UI.PageBreak.AfterBandExceptLastEntry',
            'Indent': 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.Indent',
            'Sorting Summary Reset': 'DevExpress.XtraReports.UI.GroupHeaderBandScripts.OnSortingSummaryReset',
            'Value': 'DevExpress.XtraReports.UI.ProcessDuplicatesTarget.Value',
            'Show Printing Warnings': 'DevExpress.XtraReports.UI.XtraReport.ShowPrintingWarnings',
            'Multi-Column Options': 'DevExpress.XtraReports.UI.MultiColumn',
            'Draw the Watermark': 'DevExpress.XtraReports.UI.XtraReport.DrawWatermark',
            'Median': 'DevExpress.XtraReports.UI.SortingSummaryFunction.Median',
            'Background Color': 'DevExpress.XtraReports.UI.XRControl.BackColor',
            'None': 'DevExpress.XtraReports.UI.MultiColumnMode.None',
            'Group Field': 'DevExpress.XtraReports.UI.GroupField',
            'Glyph Alignment': 'DevExpress.XtraReports.UI.XRCheckBox.GlyphAlignment',
            'Custom ServerMode Sort': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomServerModeSort',
            'Annotations': 'DevExpress.XtraReports.UI.XRChart.Annotations',
            'Sparkline': 'DevExpress.XtraReports.UI.XRSparkline',
            'JScript .NET': 'DevExpress.XtraReports.ScriptLanguage.JScript',
            'Table Cell': 'DevExpress.XtraReports.UI.XRTableCell',
            'Snap to Grid': 'DevExpress.XtraReports.UI.SnappingMode.SnapToGrid',
            'Style Priority': 'DevExpress.XtraReports.UI.XRControl.StylePriority',
            'Rich Text': 'DevExpress.XtraReports.UI.XRRichTextBase.RtfText',
            'Cross-band Box': 'DevExpress.XtraReports.UI.XRCrossBandBox',
            'Line Direction': 'DevExpress.XtraReports.UI.XRLine.LineDirection',
            'Border Width': 'DevExpress.XtraReports.UI.XRControl.BorderWidth',
            'Row Span': 'DevExpress.XtraReports.UI.XRTableCell.RowSpan',
            'Border Color': 'DevExpress.XtraReports.UI.XRControl.BorderColor',
            'Text Alignment': 'DevExpress.XtraReports.UI.XRControl.TextAlignment',
            'Group Sorting Summary': 'DevExpress.XtraReports.UI.XRGroupSortingSummary',
            'Filter String': 'DevExpress.XtraReports.UI.XtraReportBase.FilterString',
            'Custom Cell Value': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomCellValue',
            'Printable Component Container': 'DevExpress.XtraReports.UI.PrintableComponentContainer',
            'Locked in the End-User Designer': 'DevExpress.XtraReports.UI.XRControl.LockedInUserDesigner',
            'Page Footer': 'DevExpress.XtraReports.UI.PageFooterBand',
            'Border Dash Style': 'DevExpress.XtraReports.UI.XRControlStyle.BorderDashStyle',
            'Formatting': 'DevExpress.XtraReports.UI.FormattingRule.Formatting',
            'Standard Deviation': 'DevExpress.XtraReports.UI.SortingSummaryFunction.StdDev',
            'Format String': 'DevExpress.XtraReports.UI.XRBinding.FormatString',
            'Back Color': 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.BackColor',
            'Suppress': 'DevExpress.XtraReports.UI.ValueSuppressType.Suppress',
            'Window Control Options': 'DevExpress.XtraReports.UI.WindowControlOptions',
            'Margins': 'DevExpress.XtraReports.UI.XtraReport.Margins',
            'Using Settings of the Default Printer': 'DevExpress.XtraReports.UI.XtraReport.DefaultPrinterSettingsUsing',
            'Borders': 'DevExpress.XtraReports.UI.XRControl.Borders',
            'Style Sheet': 'DevExpress.XtraReports.UI.XtraReport.StyleSheet',
            'End Point': 'DevExpress.XtraReports.UI.XRCrossBandControl.EndPoint',
            'Fill': 'DevExpress.XtraReports.UI.XRDockStyle.Fill',
            'Annotation Repository': 'DevExpress.XtraReports.UI.XRChart.AnnotationRepository',
            'Page Width': 'DevExpress.XtraReports.UI.XtraReport.PageWidth',
            'Series Data Member': 'DevExpress.XtraReports.UI.XRChart.SeriesDataMember',
            'Check Box': 'DevExpress.XtraReports.UI.XRCheckBox',
            'Use Padding': 'DevExpress.XtraReports.UI.StylePriority.UsePadding',
            'View Theme': 'DevExpress.XtraReports.UI.XRGauge.ViewTheme',
            'View Style': 'DevExpress.XtraReports.UI.XRGauge.ViewStyle',
            'Page Color': 'DevExpress.XtraReports.UI.XtraReport.PageColor',
            'With First Detail': 'DevExpress.XtraReports.UI.GroupUnion.WithFirstDetail',
            'Navigation URL': 'DevExpress.XtraReports.UI.XRControl.NavigateUrl',
            'Report Header': 'DevExpress.XtraReports.UI.ReportHeaderBand',
            'Custom Field Value Cells': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomFieldValueCells',
            'Styles': 'DevExpress.XtraReports.UI.XRPivotGrid.Styles',
            'Standard Deviation (Distinct)': 'DevExpress.XtraReports.UI.SortingSummaryFunction.DStdDev',
            'Series Name Template': 'DevExpress.XtraReports.UI.XRChart.SeriesNameTemplate',
            'Standard Population Deviation (Distinct)': 'DevExpress.XtraReports.UI.SummaryFunc.DStdDevP',
            'XML Data Path': 'DevExpress.XtraReports.UI.XtraReportBase.XmlDataPath',
            'Options Chart Data Source': 'DevExpress.XtraReports.UI.XRPivotGrid.OptionsChartDataSource',
            'Anchor Vertically': 'DevExpress.XtraReports.UI.XRControl.AnchorVertical',
            'Report Source Url': 'DevExpress.XtraReports.UI.XRSubreport.ReportSourceUrl',
            'Data Source\'s Schema': 'DevExpress.XtraReports.UI.XtraReport.DataSourceSchema',
            'Zip Code': 'DevExpress.XtraReports.UI.XRZipCode',
            'Angle': 'DevExpress.XtraReports.UI.XRLabel.Angle',
            'Process Duplicates': 'DevExpress.XtraReports.UI.XRLabel.ProcessDuplicates',
            'Print Field Value': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnPrintFieldValue',
            'Small Chart Text': 'DevExpress.XtraReports.UI.XRChart.SmallChartText',
            'Display Name': 'DevExpress.XtraReports.UI.CalculatedField.DisplayName',
            'Custom Draw an Axis Label': 'DevExpress.XtraReports.UI.XRChartScripts.OnCustomDrawAxisLabel',
            'Detail Count at Design Time': 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountAtDesignTime',
            'Using Parent Style': 'DevExpress.XtraReports.UI.XRControl.ParentStyleUsing',
            'Drawing Method': 'DevExpress.XtraReports.UI.WinControlContainer.DrawMethod',
            'As Image': 'DevExpress.XtraReports.UI.WinControlPrintMode.AsImage',
            'Header Group Line Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.HeaderGroupLineStyle',
            'Start Band': 'DevExpress.XtraReports.UI.XRCrossBandControl.StartBand',
            'Label Scripts': 'DevExpress.XtraReports.UI.XRLabelScripts',
            'Image': 'ASPxReportsStringId.ExportName_png',
            'Suppress and Shrink': 'DevExpress.XtraReports.UI.ProcessDuplicatesMode.SuppressAndShrink',
            'Drill-Down Control': 'DevExpress.XtraReports.UI.Band.DrillDownControl',
            'Row Changed': 'DevExpress.XtraReports.UI.XRSummaryEvents.OnRowChanged',
            'Report Source': 'DevExpress.XtraReports.UI.SubreportBase.ReportSource',
            'Default': 'DevExpress.XtraReports.UI.WinControlPrintMode.Default',
            'Paper Kind': 'DevExpress.XtraReports.UI.XtraReport.PaperKind',
            'Paper Name': 'DevExpress.XtraReports.UI.XtraReport.PaperName',
            'Text Horizontal Alignment': 'DevExpress.XtraReports.UI.XRAppearanceObject.TextHorizontalAlignment',
            'Snapping Mode': 'DevExpress.XtraReports.UI.XtraReport.SnappingMode',
            'Can Publish': 'DevExpress.XtraReports.UI.XRControl.CanPublish',
            'Summary Row Changed': 'DevExpress.XtraReports.UI.XRLabelScripts.OnSummaryRowChanged',
            'Image URL': 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl',
            'Size': 'DevExpress.XtraReports.UI.XRControl.Size',
            'Name': 'DevExpress.XtraReports.UI.XRControl.Name',
            'Control Style': 'DevExpress.XtraReports.UI.XRControlStyle',
            'Foreground Color': 'DevExpress.XtraReports.UI.XRControlStyle.ForeColor',
            'Band Level Changed': 'DevExpress.XtraReports.UI.GroupBandScripts.OnBandLevelChanged',
            'Sort Fields': 'DevExpress.XtraReports.UI.DetailBand.SortFields',
            'Custom Field Sort': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomFieldSort',
            'Data Source Demanded': 'DevExpress.XtraReports.UI.XtraReportScripts.OnDataSourceDemanded',
            'End Band': 'DevExpress.XtraReports.UI.XRCrossBandControl.EndBand',
            'Sorting Summary Row Changed': 'DevExpress.XtraReports.UI.GroupHeaderBandScripts.OnSortingSummaryRowChanged',
            'Cell Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.CellStyle',
            'Print at Bottom': 'DevExpress.XtraReports.UI.ReportFooterBand.PrintAtBottom',
            'Right to Left Layout': 'DevExpress.XtraReports.UI.XtraReport.RightToLeftLayout',
            'Tag': 'DevExpress.XtraReports.UI.XRControl.Tag',
            'Show Print Margins Warning': 'DevExpress.XtraReports.UI.XtraReport.ShowPrintMarginsWarning',
            'Get a Result': 'DevExpress.XtraReports.UI.XRSummaryEvents.OnGetResult',
            'Detail Count': 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCount',
            'Right to Left': 'DevExpress.XtraReports.UI.XRControl.RightToLeft',
            'Sizing': 'DevExpress.XtraReports.UI.XRPictureBox.Sizing',
            'Calculated Fields': 'DevExpress.XtraReports.UI.XtraReport.CalculatedFields',
            'Whole Page': 'DevExpress.XtraReports.UI.GroupUnion.WholePage',
            'Parameters Submitted': 'DevExpress.XtraReports.UI.XtraReportScripts.OnParametersRequestSubmit',
            'Use Column Width': 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnWidth',
            'Use Border Color': 'DevExpress.XtraReports.UI.StyleUsing.UseBorderColor',
            'Total Cell Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.TotalCellStyle',
            'Print Progress': 'DevExpress.XtraReports.UI.XtraReportScripts.OnPrintProgress',
            'Use Column Count': 'DevExpress.XtraReports.UI.MultiColumnMode.UseColumnCount',
            'Inherit': 'DevExpress.XtraReports.UI.RightToLeft.Inherit',
            'Use Border Width': 'DevExpress.XtraReports.UI.StyleUsing.UseBorderWidth',
            'Axis Scale Changed': 'DevExpress.XtraReports.UI.XRChartScripts.OnAxisScaleChanged',
            'View': 'DevExpress.XtraReports.UI.XRSparkline.View',
            'Can Shrink': 'DevExpress.XtraReports.UI.XRControl.CanShrink',
            'Detail Count when Data Source is Empty': 'DevExpress.XtraReports.UI.ReportPrintOptions.DetailCountOnEmptyDataSource',
            'Formatting Rules': 'DevExpress.XtraReports.UI.XRControl.FormattingRules',
            'Before the Band, Except for the First Entry': 'DevExpress.XtraReports.UI.PageBreak.BeforeBandExceptFirstEntry',
            'Chart Scripts': 'DevExpress.XtraReports.UI.XRChartScripts',
            'Draw the Grid': 'DevExpress.XtraReports.UI.XtraReport.DrawGrid',
            'Band Scripts': 'DevExpress.XtraReports.UI.BandScripts',
            'Group Footer': 'DevExpress.XtraReports.UI.GroupFooterBand',
            'Background Image': 'DevExpress.XtraReports.UI.XRChart.BackImage',
            'Trimming': 'DevExpress.XtraReports.UI.XRAppearanceObject.Trimming',
            'Ignore Null Values': 'DevExpress.XtraReports.UI.XRGroupSortingSummary.IgnoreNullValues',
            'Script References': 'DevExpress.XtraReports.UI.XtraReport.ScriptReferences',
            'Ascending': 'DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending',
            'Xlsx Format String': 'DevExpress.XtraReports.UI.XRControl.XlsxFormatString',
            'Fields': 'DevExpress.XtraReports.UI.XRPivotGrid.Fields',
            'Binding': 'DevExpress.XtraReports.Design.DataBinding.Binding',
            'First Down, then Across': 'DevExpress.XtraReports.UI.ColumnDirection.DownThenAcross',
            'Print Options': 'DevExpress.XtraReports.UI.XRPivotGrid.OptionsPrint',
            'Before Print': 'DevExpress.XtraReports.UI.XRControlEvents.OnBeforePrint',
            'Sort Order': 'DevExpress.XtraReports.UI.XRGroupSortingSummary.SortOrder',
            'Use WMPaint Recursively': 'DevExpress.XtraReports.UI.WinControlDrawMethod.UseWMPaintRecursive',
            'Page Info': 'DevExpress.XtraReports.UI.XRPageInfo',
            'Field Value Display Text': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnFieldValueDisplayText',
            'Clip Content': 'DevExpress.XtraReports.UI.PrintableComponentContainer.ClipContent',
            'Appearance Name': 'DevExpress.XtraReports.UI.XRChart.AppearanceName',
            'Small Chart Text Showing': 'DevExpress.XtraReports.UI.XRChartScripts.OnSmallChartTextShowing',
            'Custom Draw a Series': 'DevExpress.XtraReports.UI.XRChartScripts.OnCustomDrawSeries',
            'Custom Column Width': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomColumnWidth',
            'Mode': 'DevExpress.XtraReports.UI.MultiColumn.Mode',
            'Axis Whole Range Changed': 'DevExpress.XtraReports.UI.XRChartScripts.OnAxisWholeRangeChanged',
            'Show Designer\'s Hints': 'DevExpress.XtraReports.UI.XtraReport.ShowDesignerHints',
            'Axis Visual Range Changed': 'DevExpress.XtraReports.UI.XRChartScripts.OnAxisVisualRangeChanged',
            'Fill Empty Space': 'DevExpress.XtraReports.UI.XtraReportScripts.OnFillEmptySpace',
            'Get a Value': 'DevExpress.XtraReports.UI.CalculatedFieldScripts.OnGetValue',
            'Line Scripts': 'DevExpress.XtraReports.UI.XRLineScripts',
            'Bands': 'DevExpress.XtraReports.UI.XtraReportBase.Bands',
            'Symbology': 'DevExpress.XtraReports.UI.XRBarCode.Symbology',
            'Grand Total Cell Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.GrandTotalCellStyle',
            'Sub-Bands': 'DevExpress.XtraReports.UI.Band.SubBands',
            'Control Scripts': 'DevExpress.XtraReports.UI.XRControlScripts',
            'Cross-band Line': 'DevExpress.XtraReports.UI.XRCrossBandLine',
            'Location Changed': 'DevExpress.XtraReports.UI.XRControlEvents.OnLocationChanged',
            'Designer Options': 'DevExpress.XtraReports.UI.XtraReport.DesignerOptions',
            'Series': 'DevExpress.XtraReports.UI.XRChart.Series',
            'Actual Height': 'DevExpress.XtraReports.UI.XRPivotGrid.ActualHeight',
            'Use Borders': 'DevExpress.XtraReports.UI.StyleUsing.UseBorders',
            'Width': 'DevExpress.XtraReports.UI.XRControl.Width',
            'Image Alignment': 'DevExpress.XtraReports.UI.XRPictureBox.ImageAlignment',
            'Filter Separator Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.FilterSeparatorStyle',
            'Diagram': 'DevExpress.XtraReports.UI.XRChart.Diagram',
            'Script Language': 'DevExpress.XtraReports.UI.XtraReport.ScriptLanguage',
            'Word Wrap': 'DevExpress.XtraReports.UI.XRAppearanceObject.WordWrap',
            'Hundredths of an Inch': 'DevExpress.XtraReports.UI.ReportUnit.HundredthsOfAnInch',
            'Page Height': 'DevExpress.XtraReports.UI.XtraReport.PageHeight',
            'Custom Paint': 'DevExpress.XtraReports.UI.XRChartScripts.OnCustomPaint',
            'Count': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Count',
            'Population Variance (Distinct)': 'DevExpress.XtraReports.UI.SortingSummaryFunction.DVarP',
            'Use Border Dash Style': 'DevExpress.XtraReports.UI.StylePriority.UseBorderDashStyle',
            'OLAP Data Provider': 'DevExpress.XtraReports.UI.XRPivotGrid.OLAPDataProvider',
            'Orientation': 'DevExpress.XtraReports.UI.XRBarCode.BarCodeOrientation',
            'Fill Style': 'DevExpress.XtraReports.UI.XRChart.FillStyle',
            'Report Scripts': 'DevExpress.XtraReports.UI.XtraReportScripts',
            'Report Footer': 'DevExpress.XtraReports.UI.ReportFooterBand',
            'Can Grow': 'DevExpress.XtraReports.UI.XRControl.CanGrow',
            'Running Summary': 'DevExpress.XtraReports.UI.SummaryFunc.RunningSum',
            'Property Name': 'DevExpress.XtraReports.UI.XRBinding.PropertyName',
            'Summary': 'DevExpress.XtraReports.UI.XRLabel.Summary',
            'After the Band': 'DevExpress.XtraReports.UI.PageBreak.AfterBand',
            'Prefilter': 'DevExpress.XtraReports.UI.PivotGrid.XRPrefilter',
            'Alignment': 'DevExpress.XtraReports.UI.XRBarCode.Alignment',
            'Page': 'ASPxReportsStringId.ToolBarItemText_PageLabel',
            'Detail': 'DevExpress.XtraReports.UI.DetailBand',
            'Reset': 'ASPxReportsStringId.ParametersPanel_Reset',
            'Summary Reset': 'DevExpress.XtraReports.UI.XRLabelScripts.OnSummaryReset',
            'Text Changed': 'DevExpress.XtraReports.UI.XRControlEvents.OnTextChanged',
            'Pixels': 'DevExpress.XtraReports.UI.ReportUnit.Pixels',
            'Report': 'ASPxReportsStringId.DocumentViewer_RibbonReportGroupText',
            'Bottom': 'DevExpress.XtraReports.UI.XRDockStyle.Bottom',
            'Titles': 'DevExpress.XtraReports.UI.XRChart.Titles',
            'Draw': 'DevExpress.XtraReports.UI.XRControlEvents.OnDraw',
            'First Across, then Down': 'DevExpress.XtraReports.UI.ColumnDirection.AcrossThenDown',
            'Pivot Grid': 'DevExpress.XtraReports.UI.XRPivotGrid',
            'Header Group Line': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.HeaderGroupLine',
            'Descending': 'DevExpress.XtraReports.UI.XRColumnSortOrder.Descending',
            'Table Of Contents Title': 'DevExpress.XtraReports.UI.XRTableOfContentsTitle',
            'Use WMPrint Recursively': 'DevExpress.XtraReports.UI.WinControlDrawMethod.UseWMPrintRecursive',
            'Table Of Contents Level': 'DevExpress.XtraReports.UI.XRTableOfContentsLevel',
            'Custom Chart Data Source Rows': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomChartDataSourceRows',
            'Custom Chart Data Source Data': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomChartDataSourceData',
            'Visible': 'DevExpress.XtraReports.UI.XRControl.Visible',
            'Standard Population Deviation': 'DevExpress.XtraReports.UI.SortingSummaryFunction.StdDevP',
            'Layout': 'DevExpress.XtraReports.UI.MultiColumn.Layout',
            'Snap Grid Size': 'DevExpress.XtraReports.UI.XtraReport.SnapGridSize',
            'Parameters Request Before Show': 'DevExpress.XtraReports.UI.XtraReportScripts.OnParametersRequestBeforeShow',
            'HTML Item Created': 'DevExpress.XtraReports.UI.XRControlEvents.OnHtmlItemCreated',
            'Use WMPrint Method': 'DevExpress.XtraReports.UI.WinControlDrawMethod.UseWMPrint',
            'Use WMPaint Method': 'DevExpress.XtraReports.UI.WinControlDrawMethod.UseWMPaint',
            'Print on Page': 'DevExpress.XtraReports.UI.XRControlEvents.OnPrintOnPage',
            'Windows Forms Control': 'DevExpress.XtraReports.UI.WinControlContainer',
            'Snap Line Padding': 'DevExpress.XtraReports.UI.XRControl.SnapLinePadding',
            'Formatting Rule Sheet': 'DevExpress.XtraReports.UI.XtraReport.FormattingRuleSheet',
            'PivotGrid Scripts': 'DevExpress.XtraReports.UI.XRPivotGridScripts',
            'Show Margin Lines in Preview': 'DevExpress.XtraReports.UI.XtraReport.ShowPreviewMarginLines',
            'Custom Row Height': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomRowHeight',
            'Check State': 'DevExpress.XtraReports.UI.XRCheckBox.CheckState',
            'Segment Width': 'DevExpress.XtraReports.UI.XRZipCode.SegmentWidth',
            'Value Member': 'DevExpress.XtraReports.UI.XRSparkline.ValueMember',
            'Field Header Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.FieldHeaderStyle',
            'Total Cell': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.TotalCell',
            'Vertical Content Splitting': 'DevExpress.XtraReports.UI.XtraReport.VerticalContentSplitting',
            'Sub-Report': 'DevExpress.XtraReports.UI.XRSubreport',
            'Binary Data': 'DevExpress.XtraReports.UI.XRBarCode.BinaryData',
            'Column Spacing': 'DevExpress.XtraReports.UI.MultiColumn.ColumnSpacing',
            'Field Value Total Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.FieldValueTotalStyle',
            'Custom Draw Crosshair': 'DevExpress.XtraReports.UI.XRChartScripts.OnCustomDrawCrosshair',
            'Module': 'DevExpress.XtraReports.UI.XRBarCode.Module',
            'Prefilter Criteria Changed': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnPrefilterCriteriaChanged',
            'Sub-Band': 'DevExpress.XtraReports.UI.SubBand',
            'Line': 'DevExpress.XtraReports.UI.XRLine',
            'Detail Report': 'DevExpress.XtraReports.UI.DetailReportBand',
            'Text Trimming': 'DevExpress.XtraReports.UI.XRControl.TextTrimming',
            'Print Mode': 'DevExpress.XtraReports.UI.WinControlContainer.PrintMode',
            'Levels': 'DevExpress.XtraReports.UI.XRTableOfContents.Levels',
            'Level Title': 'DevExpress.XtraReports.UI.XRTableOfContents.LevelTitle',
            'Calculated Field Scripts': 'DevExpress.XtraReports.UI.CalculatedFieldScripts',
            'Stretch': 'DevExpress.XtraReports.UI.XRShape.Stretch',
            'Pivot Grid Data Source Options': 'DevExpress.XtraReports.UI.XRChart.PivotGridDataSourceOptions',
            'FieldValueGrandTotal': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValueGrandTotal',
            'Keep Together with Detail Reports': 'DevExpress.XtraReports.UI.DetailBand.KeepTogetherWithDetailReports',
            'Print Header': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnPrintHeader',
            'Landscape': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Landscape',
            'Group Header Band Scripts': 'DevExpress.XtraReports.UI.GroupHeaderBandScripts',
            'Data Field Options': 'DevExpress.XtraReports.UI.XRPivotGrid.OptionsDataField',
            'Print Cell': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnPrintCell',
            'Page Break': 'DevExpress.XtraReports.UI.Band.PageBreak',
            'Bar Code': 'DevExpress.XtraReports.UI.XRBarCode',
            'Record Number': 'DevExpress.XtraReports.UI.SummaryFunc.RecordNumber',
            'Top Margin': 'DevExpress.XtraReports.UI.TopMarginBand',
            'Tenths of a Millimeter': 'DevExpress.XtraReports.UI.ReportUnit.TenthsOfAMillimeter',
            'Parameter Name': 'DevExpress.XtraReports.UI.ParameterBinding.ParameterName',
            'C#': 'DevExpress.XtraReports.ScriptLanguage.CSharp',
            'Show Footer': 'DevExpress.XtraReports.Design.GroupSort.GroupSortReflectItem.ShowFooter',
            'Data Source\'s Row Changed': 'DevExpress.XtraReports.UI.XtraReportScripts.OnDataSourceRowChanged',
            'Leader Symbol': 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.LeaderSymbol',
            'Enabled': 'DevExpress.XtraReports.UI.XRGroupSortingSummary.Enabled',
            'Data Options': 'DevExpress.XtraReports.UI.XRPivotGrid.OptionsData',
            'View Options': 'DevExpress.XtraReports.UI.XRPivotGrid.OptionsView',
            'Appearance': 'DevExpress.XtraReports.UI.XRPivotGrid.Appearance',
            'Auto-Module': 'DevExpress.XtraReports.UI.XRBarCode.AutoModule',
            'Band\'s Height Changed': 'DevExpress.XtraReports.UI.XtraReportScripts.OnBandHeightChanged',
            'Show Header': 'DevExpress.XtraReports.Design.GroupSort.GroupSortReflectItem.ShowHeader',
            'Fore Color': 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.ForeColor',
            'Field Header': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldHeader',
            'Merge based on Tag': 'DevExpress.XtraReports.UI.ValueSuppressType.MergeByTag',
            'Expression': 'DevExpress.XtraReports.UI.CalculatedField.Expression',
            'Picture Box': 'DevExpress.XtraReports.UI.XRPictureBox',
            'Automatic Layout': 'DevExpress.XtraReports.UI.XRChart.AutoLayout',
            'Summary Calculated': 'DevExpress.XtraReports.UI.XRLabelScripts.OnSummaryCalculated',
            'Actual Width': 'DevExpress.XtraReports.UI.XRPivotGrid.ActualWidth',
            'Navigation Target': 'DevExpress.XtraReports.UI.XRControl.Target',
            'Field Value': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValue',
            'Parent Bookmark': 'DevExpress.XtraReports.UI.XRControl.BookmarkParent',
            'Table Of Contents': 'DevExpress.XtraReports.UI.XRTableOfContents',
            'Legend': 'DevExpress.XtraReports.UI.XRChart.Legend',
            'Blank Detail Count': 'DevExpress.XtraReports.UI.ReportPrintOptions.BlankDetailCount',
            'Text Vertical Alignment': 'DevExpress.XtraReports.UI.XRAppearanceObject.TextVerticalAlignment',
            'Custom Cell Display Text': 'DevExpress.XtraReports.UI.XRPivotGridScripts.OnCustomCellDisplayText',
            'Auto Width': 'DevExpress.XtraReports.UI.XRLabel.AutoWidth',
            'Roll Paper': 'DevExpress.XtraReports.UI.XtraReport.RollPaper',
            'Print On': 'DevExpress.XtraReports.UI.PageBand.PrintOn',
            'Field Value Total': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.FieldValueTotal',
            'Click in Preview': 'DevExpress.XtraReports.UI.XRControlEvents.OnPreviewClick',
            'Parameters Changed': 'DevExpress.XtraReports.UI.XtraReportScripts.OnParametersRequestValueChanged',
            'Legends': 'DevExpress.XtraReports.UI.XRChart.Legends',
            'Calculated Field': 'DevExpress.XtraReports.UI.CalculatedField',
            'Horizontal Content Splitting': 'DevExpress.XtraReports.UI.XtraReport.HorizontalContentSplitting',
            'Running': 'DevExpress.XtraReports.UI.XRSummary.Running',
            'Lines Style': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridStyles.LinesStyle',
            'Snap Lines': 'DevExpress.XtraReports.UI.SnappingMode.SnapLines',
            'Use Background Color': 'DevExpress.XtraReports.UI.StyleUsing.UseBackColor',
            'Formatting Rule': 'DevExpress.XtraReports.UI.FormattingRule',
            'Merge based on Value': 'DevExpress.XtraReports.UI.ValueSuppressType.MergeByValue',
            'Series Sorting': 'DevExpress.XtraReports.UI.XRChart.SeriesSorting',
            'Mouse Move in Preview': 'DevExpress.XtraReports.UI.XRControlEvents.OnPreviewMouseMove',
            'Mouse Down in Preview': 'DevExpress.XtraReports.UI.XRControlEvents.OnPreviewMouseDown',
            'Printer Name': 'DevExpress.XtraReports.UI.XtraReport.PrinterName',
            'Target Value': 'DevExpress.XtraReports.UI.XRGauge.TargetValue',
            'View Type': 'DevExpress.XtraReports.UI.XRGauge.ViewType',
            'Odd Style': 'DevExpress.XtraReports.UI.XRControl.XRControlStyles.OddStyle',
            'Level Default': 'DevExpress.XtraReports.UI.XRTableOfContents.LevelDefault',
            'Print when Data Source is Empty': 'DevExpress.XtraReports.UI.ReportPrintOptions.PrintOnEmptyDataSource',
            'Start Page Number': 'DevExpress.XtraReports.UI.XRPageInfo.StartPageNumber',
            'Style': 'DevExpress.XtraReports.UI.ConditionFormatting.Style',
            'Indicators Palette Name': 'DevExpress.XtraReports.UI.XRChart.IndicatorsPaletteName',
            'After Print': 'DevExpress.XtraReports.UI.XRControlEvents.OnAfterPrint',
            'As Bricks': 'DevExpress.XtraReports.UI.WinControlPrintMode.AsBricks',
            'Cell': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.Cell',
            'Grand Total Cell': 'DevExpress.XtraReports.UI.PivotGrid.XRPivotGridAppearances.GrandTotalCell',
            'Show Export Warnings': 'DevExpress.XtraReports.UI.XtraReport.ShowExportWarnings',
            'Style Sheet\'s Path': 'DevExpress.XtraReports.UI.XtraReport.StyleSheetPath',
            'Measure Units': 'DevExpress.XtraReports.UI.XtraReport.ReportUnit',
            'Field Type': 'DevExpress.XtraReports.UI.CalculatedField.FieldType',
            'Multi Select': 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.MultiSelect',
            'OLAP Filter Using Where Clause': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.OLAPFilterUsingWhereClause',
            'Show Column Grand Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowColumnGrandTotals',
            'Show Unbound Expression Menu': 'DevExpress.XtraPivotGrid.PivotGridField.Options.ShowUnboundExpressionMenu',
            'ForeColor': 'DevExpress.PivotGrid.Printing.PrintAppearanceObject.ForeColor',
            'Field': 'DevExpress.XtraPivotGrid.PivotGridStyleFormatCondition.Field',
            'Custom Totals': 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.CustomTotals',
            'Show In Expression Editor': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowInExpressionEditor',
            'Summary Type': 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.SummaryType',
            'Totals Visibility': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalsVisibility',
            'OLAP Filter By UniqueName': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.OLAPFilterByUniqueName',
            'Empty': 'DevExpress.XtraPivotGrid.PivotGridAppearances.Empty',
            'Paper Height': 'DevExpress.XtraPivotGrid.Data.PivotGridPageSettings.PaperHeight',
            'TotalCell': 'DevExpress.PivotGrid.Printing.PrintAppearance.TotalCell',
            'Field Value Grand Total': 'DevExpress.XtraPivotGrid.PivotGridAppearancesBase.FieldValueGrandTotal',
            'Column Header Area': 'DevExpress.XtraPivotGrid.PivotGridAppearances.ColumnHeaderArea',
            'GrandTotalCell': 'DevExpress.PivotGrid.Printing.PrintAppearance.GrandTotalCell',
            'Read Only': 'DevExpress.XtraPivotGrid.PivotGridField.Options.ReadOnly',
            'Filter Separator Bar Padding': 'DevExpress.XtraPivotGrid.PivotGridOptionsView.FilterSeparatorBarPadding',
            'Top Value Mode': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueMode',
            'Top Value Type': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueType',
            'Numeric': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Numeric',
            'Visible Count': 'DevExpress.XtraPivotGrid.PivotGridGroup.VisibleCount',
            'Grand Total Cell Format': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GrandTotalCellFormat',
            'Chart Data Vertical': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.ChartDataVertical',
            'Apply To Total Cell': 'DevExpress.XtraPivotGrid.PivotGridStyleFormatCondition.ApplyToTotalCell',
            'After Values': 'DevExpress.XtraPivotGrid.PivotRowTotalsLocation.Far',
            'Show Value Hints': 'DevExpress.XtraPivotGrid.PivotGridOptionsHint.ShowValueHints',
            'Traffic Lights': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.TrafficLights',
            'Summary Display Type': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SummaryDisplayType',
            'Status': 'DevExpress.XtraPivotGrid.PivotKPIType.Status',
            'Show Vert Lines': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowVertLines',
            'Month-Year': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateMonthYear',
            'Cell Format': 'DevExpress.XtraPivotGrid.PivotGridCustomTotalBase.CellFormat',
            'Apply To Grand Total Cell': 'DevExpress.XtraPivotGrid.PivotGridStyleFormatCondition.ApplyToGrandTotalCell',
            'Dimension Attribute': 'DevExpress.XtraPivotGrid.PivotSortMode.DimensionAttribute',
            'Filter Values': 'DevExpress.XtraPivotGrid.PivotGridGroup.FilterValues',
            'Allow Cross-Group Variation': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.AllowCrossGroupVariation',
            'Day': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDay',
            'OLAP None': 'DevExpress.XtraPivotGrid.PivotSortMode.None',
            'Store Layout Options': 'DevExpress.XtraPivotGrid.OptionsLayoutPivotGrid.StoreLayoutOptions',
            'Hide Empty Variation Items': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.HideEmptyVariationItems',
            'Value Format': 'DevExpress.XtraPivotGrid.PivotGridFieldToolTips.ValueFormat',
            'Weight': 'DevExpress.XtraPivotGrid.PivotKPIType.Weight',
            'Month': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateMonth',
            'KPI Graphic': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.KPIGraphic',
            'Horizontal Scrolling': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehavior.HorizontalScrolling',
            'Drill Down Max Row Count': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.DrillDownMaxRowCount',
            'Allow Edit': 'DevExpress.XtraPivotGrid.PivotGridField.Options.AllowEdit',
            'Rank In Column Smallest To Largest': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInColumnSmallestToLargest',
            'Percent Of Row Grand Total': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfRowGrandTotal',
            'Show Button Mode': 'DevExpress.XtraPivotGrid.PivotGridField.Options.ShowButtonMode',
            'Enable Field Value Menu': 'DevExpress.XtraPivotGrid.PivotGridOptionsMenu.EnableFieldValueMenu',
            'Export Empty Cells': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.ExportEmptyCells',
            'Group Interval Numeric Range': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GroupIntervalNumericRange',
            'Percent Of Row': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfRow',
            'Variation for Entire Population': 'DevExpress.Data.PivotGrid.PivotSummaryType.Varp',
            'Allow Filter By Summary': 'DevExpress.XtraPivotGrid.PivotGridOptionsCustomization.AllowFilterBySummary',
            'Show Grand Total': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowGrandTotal',
            'PrefilterPanel': 'DevExpress.XtraPivotGrid.PivotGridAppearances.PrefilterPanel',
            'Column Value Line Count': 'DevExpress.XtraPivotGrid.PivotGridField.ColumnValueLineCount',
            'Data Area': 'DevExpress.XtraPivotGrid.PivotArea.DataArea',
            'Show Row Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowRowTotals',
            'OLAP Key': 'DevExpress.XtraPivotGrid.PivotSortMode.Key',
            'Always': 'DevExpress.XtraPivotGrid.AllowHideFieldsType.Always',
            'Caption': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Caption',
            'XMLA': 'DevExpress.XtraPivotGrid.OLAPDataProvider.Xmla',
            'Unbound Field Name': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundFieldName',
            'All Areas': 'DevExpress.XtraPivotGrid.PivotGridAllowedAreas.All',
            'Faces': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Faces',
            'Show Data Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowDataHeaders',
            'Prefilter Column Name': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.PrefilterColumnName',
            'Print Horizontal Lines': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintHorzLines',
            'Max Point Count By Series': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.MaxPointCountBySeries',
            'Show Filter Separator Bar': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowFilterSeparatorBar',
            'Variation': 'DevExpress.Data.PivotGrid.PivotSummaryType.Var',
            'Show Grand Totals For Single Values': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowGrandTotalsForSingleValues',
            'Allow Sort': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowSort',
            'Allow Drag': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowDrag',
            'Never': 'DevExpress.XtraPivotGrid.PivotOLAPFilterUsingWhereClause.Never',
            'BackColor': 'DevExpress.PivotGrid.Printing.PrintAppearanceObject.BackColor',
            'Criteria': 'DevExpress.XtraPivotGrid.Prefilter.Criteria',
            'Header Filter Button Active': 'DevExpress.XtraPivotGrid.PivotGridAppearances.HeaderFilterButtonActive',
            'Print Data Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintDataHeaders',
            'Draw Focus Rect': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.DrawFocusedCellRect',
            'Column Area': 'DevExpress.XtraPivotGrid.PivotArea.ColumnArea',
            'Data Header Area': 'DevExpress.XtraPivotGrid.PivotGridAppearances.DataHeaderArea',
            'Show Column Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowColumnTotals',
            'Use Aggregate For Single Filter Value': 'DevExpress.XtraPivotGrid.PivotGridOptionsOLAP.UseAggregateForSingleFilterValue',
            'Grand Total Text': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GrandTotalText',
            'Sort By Summary Info': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortBySummaryInfo',
            'Show In Customization Form': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowInCustomizationForm',
            'Custom Total Summary Type': 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.CustomTotalSummaryType',
            'Area Index': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.AreaIndex',
            'Percent Of Grand Total': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfGrandTotal',
            'Use Aggregate Functions': 'DevExpress.XtraPivotGrid.UnboundExpressionMode.UseAggregateFunctions',
            'Page Settings': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PageSettings',
            'Calculations': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Calculations',
            'Image Index': 'DevExpress.XtraPivotGrid.PivotGridField.ImageIndex',
            'OLAP Unique Member Name': 'DevExpress.XtraPivotGrid.PivotGridFieldSortCondition.OLAPUniqueMemberName',
            'Allow Sort By Summary': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowSortBySummary',
            'Status Arrow': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.StatusArrow',
            'Control': 'DevExpress.XtraPivotGrid.PivotGridScrolling.Control',
            'Row Count': 'DevExpress.XtraPivotGrid.PivotGridCells.RowCount',
            'Show Row Grand Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowRowGrandTotals',
            'Show New Values': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.ShowNewValues',
            'Allow Glyph Skinning': 'DevExpress.XtraPivotGrid.PivotGridOptionsView.AllowGlyphSkinning',
            'Area': 'DevExpress.XtraPivotGrid.PivotGridOptionsDataField.Area',
            'Unbound Expression': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundExpression',
            'Year': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateYear',
            'Case Sensitive': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.CaseSensitive',
            'Date-Hour': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHour',
            'Max Height': 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.MaxHeight',
            'Preserve Collapsed Levels': 'DevExpress.XtraPivotGrid.CopyCollapsedValuesMode.PreserveCollapsedLevels',
            'Merge Row Field Values': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.MergeRowFieldValues',
            'Allow Drag In Customization Form': 'DevExpress.XtraPivotGrid.PivotGridOptionsCustomization.AllowDragInCustomizationForm',
            'Show Filter Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowFilterHeaders',
            'Total Cell Format': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalCellFormat',
            'Empty Value Text': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.EmptyValueText',
            'Expanded In Fields Group': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.ExpandedInFieldsGroup',
            'Loading Panel Delay': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehaviorBase.LoadingPanelDelay',
            'Row Totals Location': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.RowTotalsLocation',
            'Print Row Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintRowHeaders',
            'Group Filter Mode': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.GroupFilterMode',
            'Row Value Line Count': 'DevExpress.XtraPivotGrid.PivotGridOptionsDataFieldEx.RowValueLineCount',
            'Row Area': 'DevExpress.XtraPivotGrid.PivotArea.RowArea',
            'Date-Hour-Minute': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHourMinute',
            'Show Cell Hints': 'DevExpress.XtraPivotGrid.PivotGridOptionsHint.ShowCellHints',
            'Copy Field Values To Clipboard Behavior': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehavior.ClipboardCopyCollapsedValuesMode',
            'Top Value Show Others': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueShowOthers',
            'Allow Filter': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowFilter',
            'OleDb': 'DevExpress.XtraPivotGrid.OLAPDataProvider.OleDb',
            'Rank In Row Largest To Smallest': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInRowLargestToSmallest',
            'Adomd': 'DevExpress.XtraPivotGrid.OLAPDataProvider.Adomd',
            'Server Defined': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ServerDefined',
            'Road Signs': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.RoadSigns',
            'Header Height Offset': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.HeaderHeightOffset',
            'Apply Best Fit On Field Dragging': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehavior.ApplyBestFitOnFieldDragging',
            'Allow Expand': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowExpand',
            'Show Column Custom Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.ShowColumnCustomTotals',
            'Reversed Cylinder': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedCylinder',
            'Before Values': 'DevExpress.XtraPivotGrid.PivotTotalsLocation.Near',
            'Total Value Format': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TotalValueFormat',
            'CustomTotalCell': 'DevExpress.PivotGrid.Printing.PrintAppearance.CustomTotalCell',
            'Criteria As String': 'DevExpress.XtraPivotGrid.PrefilterBase.CriteriaString',
            'CellsArea': 'DevExpress.XtraPivotGrid.PivotGridScrolling.CellsArea',
            'Selected Cell': 'DevExpress.XtraPivotGrid.PivotGridAppearances.SelectedCell',
            'Top Value Count': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.TopValueCount',
            'Day Of Year': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDayOfYear',
            'Day Of Week': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateDayOfWeek',
            'Column Totals Location': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ColumnTotalsLocation',
            'Reversed Thermometer': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedThermometer',
            'Cell Editor': 'DevExpress.XtraPivotGrid.PivotGridField.FieldEdit',
            'Use Print Appearance': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.UsePrintAppearance',
            'Copy To Clipboard With Field Values': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehavior.CopyToClipboardWithFieldValues',
            'Year Age': 'DevExpress.XtraPivotGrid.PivotGroupInterval.YearAge',
            'Merge Column Field Values': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.MergeColumnFieldValues',
            'Export As Numbers To Excel': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UseNativeFormat',
            'Use Summary Values': 'DevExpress.XtraPivotGrid.DataFieldUnboundExpressionMode.UseSummaryValues',
            'Quarter-Year': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateQuarterYear',
            'Filter By Visible Fields Only': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.FilterByVisibleFieldsOnly',
            'Shapes': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Shapes',
            'Rank In Row Smallest To Largest': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInRowSmallestToLargest',
            'Row Header Area': 'DevExpress.XtraPivotGrid.PivotGridAppearances.RowHeaderArea',
            'Auto': 'DevExpress.XtraPivotGrid.PivotOLAPFilterUsingWhereClause.Auto',
            'Cylinder': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Cylinder',
            'Filter By UniqueName': 'DevExpress.XtraPivotGrid.PivotGridOptionsOLAP.FilterByUniqueName',
            'Sort Mode': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortMode',
            'Thermometer': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.Thermometer',
            'Standard Deviation for Entire Population': 'DevExpress.Data.PivotGrid.PivotSummaryType.StdDevp',
            'Allow Prefilter': 'DevExpress.XtraPivotGrid.PivotGridOptionsCustomizationEx.AllowPrefilter',
            'Reversed Gauge': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedGauge',
            'Reset Options': 'DevExpress.XtraPivotGrid.OptionsLayoutPivotGrid.ResetOptions',
            'Header Filter Button Show Mode': 'DevExpress.XtraPivotGrid.PivotGridOptionsView.HeaderFilterButtonShowMode',
            'Single Values Only': 'DevExpress.XtraPivotGrid.PivotOLAPFilterUsingWhereClause.SingleValuesOnly',
            'Show Row Custom Totals': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.ShowRowCustomTotals',
            'Allow Customization Form': 'DevExpress.XtraPivotGrid.PivotGridOptionsCustomization.AllowCustomizationForm',
            'Value Text': 'DevExpress.XtraPivotGrid.PivotGridFieldToolTips.ValueText',
            'Empty Cell Text': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.EmptyCellText',
            'Focused Cell': 'DevExpress.XtraPivotGrid.PivotGridAppearances.FocusedCell',
            'Cell Selection': 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.CellSelection',
            'OLAP ID': 'DevExpress.XtraPivotGrid.PivotSortMode.ID',
            'Filter Area': 'DevExpress.XtraPivotGrid.PivotArea.FilterArea',
            'Quarter': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateQuarter',
            'Percent Of Column Grand Total': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfColumnGrandTotal',
            'Show Row Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowRowHeaders',
            'Week Of Year': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateWeekOfYear',
            'Month Age': 'DevExpress.XtraPivotGrid.PivotGroupInterval.MonthAge',
            'Percent': 'DevExpress.XtraPivotGrid.PivotTopValueType.Percent',
            'Allow Run Time Summary Change': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.AllowRunTimeSummaryChange',
            'Parent Field Values': 'DevExpress.XtraPivotGrid.TopValueMode.ParentFieldValues',
            'Show Custom Totals': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowCustomTotals',
            'Duplicate Collapsed Values': 'DevExpress.XtraPivotGrid.CopyCollapsedValuesMode.DuplicateCollapsedValues',
            'All Values': 'DevExpress.XtraPivotGrid.TopValueMode.AllValues',
            'Header Filter Button': 'DevExpress.XtraPivotGrid.PivotGridAppearances.HeaderFilterButton',
            'Percent Variation': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentVariation',
            'Row Header Width': 'DevExpress.XtraPivotGrid.PivotGridOptionsDataField.RowHeaderWidth',
            'Header Area': 'DevExpress.XtraPivotGrid.PivotGridAppearances.HeaderArea',
            'Show In Prefilter': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowInPrefilter',
            'Show Column Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowColumnHeaders',
            'Auto Populated Properties': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.AutoPopulatedProperties',
            'Print Unused Filter Fields': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintUnusedFilterFields',
            'FieldValueTotal': 'DevExpress.PivotGrid.Printing.PrintAppearance.FieldValueTotal',
            'Remove Collapsed Levels': 'DevExpress.XtraPivotGrid.CopyCollapsedValuesMode.RemoveCollapsedLevels',
            'Week Age': 'DevExpress.XtraPivotGrid.PivotGroupInterval.WeekAge',
            'No Totals': 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.None',
            'Show Header Hints': 'DevExpress.XtraPivotGrid.PivotGridOptionsHint.ShowHeaderHints',
            'Sort By Attribute': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.SortByAttribute',
            'Day Age': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DayAge',
            'Rank In Column Largest To Smallest': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.RankInColumnLargestToSmallest',
            'Tool Tips': 'DevExpress.XtraPivotGrid.PivotGridField.ToolTips',
            'Min Width': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.MinWidth',
            'Apply To Custom Total Cell': 'DevExpress.XtraPivotGrid.PivotGridStyleFormatCondition.ApplyToCustomTotalCell',
            'Row Field Value Separator': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.RowFieldValueSeparator',
            'Apply To Cell': 'DevExpress.XtraPivotGrid.PivotGridStyleFormatCondition.ApplyToCell',
            'Variance Arrow': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.VarianceArrow',
            'Options': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Options',
            'Grouping Interval': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.GroupInterval',
            'Data Column Name': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.FieldName',
            'Show Always': 'DevExpress.XtraPivotGrid.PivotShowButtonModeEnum.ShowAlways',
            'Goal': 'DevExpress.XtraPivotGrid.PivotKPIType.Goal',
            'Expand Button': 'DevExpress.XtraPivotGrid.PivotGridAppearances.ExpandButton',
            'Show Column Grand Total Header': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowColumnGrandTotalHeader',
            'Show For The Focused Cell Only': 'DevExpress.XtraPivotGrid.PivotShowButtonModeEnum.ShowForFocusedCell',
            'Display Folder': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.DisplayFolder',
            'Unbound Expression Mode': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundExpressionMode',
            'Minute': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Minute',
            'Show Summary Type Name': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowSummaryTypeName',
            'Second': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Second',
            'Print Headers on Every Page': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintHeadersOnEveryPage',
            'Data Field Unbound Expression Mode': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.DataFieldUnboundExpressionMode',
            'Show Horz Lines': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowHorzLines',
            'Max Series Count': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsChartDataSourceBase.MaxSeriesCount',
            'Header Width Offset': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.HeaderWidthOffset',
            'Conditions': 'DevExpress.XtraPivotGrid.PivotGridFieldSortBySummaryInfo.Conditions',
            'Trend': 'DevExpress.XtraPivotGrid.PivotKPIType.Trend',
            'Week Of Month': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateWeekOfMonth',
            'Show Values': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowValues',
            'Display Text': 'DevExpress.XtraPivotGrid.PivotSortMode.DisplayText',
            'Alphabetical': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Alphabetical',
            'Row Tree Width': 'DevExpress.XtraPivotGrid.PivotGridOptionsViewBase.RowTreeWidth',
            'Allowed Areas': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.AllowedAreas',
            'Show Totals': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.ShowTotals',
            'Running Total': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.RunningTotal',
            'Show Custom Totals For Single Values': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowCustomTotalsForSingleValues',
            'Selection': 'DevExpress.XtraPivotGrid.PivotGridCells.Selection',
            'Add New Groups': 'DevExpress.XtraPivotGrid.OptionsLayoutPivotGrid.AddNewGroups',
            'Enable Header Menu': 'DevExpress.XtraPivotGrid.PivotGridOptionsMenu.EnableHeaderMenu',
            'Field Naming': 'DevExpress.XtraPivotGrid.PivotGridOptionsDataField.FieldNaming',
            'Show When Editor Is Active': 'DevExpress.XtraPivotGrid.PivotShowButtonModeEnum.ShowOnlyInEditor',
            'Show Row Grand Total Header': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowRowGrandTotalHeader',
            'Group Fields in the Customization Window': 'DevExpress.XtraPivotGrid.PivotGridOptionsView.GroupFieldsInCustomizationWindow',
            'FieldValue': 'DevExpress.PivotGrid.Printing.PrintAppearance.FieldValue',
            'Filter Header Area': 'DevExpress.XtraPivotGrid.PivotGridAppearances.FilterHeaderArea',
            'Allow Hide Fields': 'DevExpress.XtraPivotGrid.PivotGridOptionsCustomization.AllowHideFields',
            'Totals Location': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.TotalsLocation',
            'Print Vertical Lines': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintVertLines',
            'Multi Selection': 'DevExpress.XtraPivotGrid.PivotGridCells.MultiSelection',
            'OLAP Use NonEmpty': 'DevExpress.XtraPivotGrid.PivotGridFieldOptions.OLAPUseNonEmpty',
            'Header Text': 'DevExpress.XtraPivotGrid.PivotGridFieldToolTips.HeaderText',
            'Clipboard Copy Multiselection Mode': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehavior.ClipboardCopyMultiSelectionMode',
            'Show Totals For Single Values': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsViewBase.ShowTotalsForSingleValues',
            'Absolute Variation': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.AbsoluteVariation',
            'Row Tree Offset': 'DevExpress.XtraPivotGrid.PivotGridOptionsViewBase.RowTreeOffset',
            'Tree': 'DevExpress.XtraPivotGrid.PivotGroupFilterMode.Tree',
            'List': 'DevExpress.XtraPivotGrid.PivotGroupFilterMode.List',
            'Unbound Type': 'DevExpress.XtraPivotGrid.PivotGridFieldBase.UnboundType',
            'Auto Expand Groups': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.AutoExpandGroups',
            'Standard Arrow': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.StandardArrow',
            'Tree Like': 'DevExpress.XtraPivotGrid.PivotRowTotalsLocation.Tree',
            'Column Field Value Separator': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.ColumnFieldValueSeparator',
            'When Customization Form Visible': 'DevExpress.XtraPivotGrid.AllowHideFieldsType.WhenCustomizationFormVisible',
            'Selection Only': 'DevExpress.XtraPivotGrid.PivotGridOptionsChartDataSource.SelectionOnly',
            'BorderColor': 'DevExpress.PivotGrid.Printing.PrintAppearanceObject.BorderColor',
            'Date': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Date',
            'Hour': 'DevExpress.XtraPivotGrid.PivotGroupInterval.Hour',
            'Date-Hour-Minute-Second': 'DevExpress.XtraPivotGrid.PivotGroupInterval.DateHourMinuteSecond',
            'Reversed Status Arrow': 'DevExpress.XtraPivotGrid.PivotKPIGraphic.ReversedStatusArrow',
            'Print Filter Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintFilterHeaders',
            'FieldHeader': 'DevExpress.PivotGrid.Printing.PrintAppearance.FieldHeader',
            'Print Column Headers': 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PrintColumnHeaders',
            'Absolute': 'DevExpress.XtraPivotGrid.PivotTopValueType.Absolute',
            'Retrieve Nested Fields': 'DevExpress.XtraPivotGrid.PivotGridOptionsData.RetrieveNestedFields',
            'Enable Appearance Focused Cell': 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.EnableAppearanceFocusedCell',
            'Enable Header Area Menu': 'DevExpress.XtraPivotGrid.PivotGridOptionsMenu.EnableHeaderAreaMenu',
            'Sort By Column Indicator Image': 'DevExpress.XtraPivotGrid.PivotGridAppearances.SortByColumnIndicatorImage',
            'Use Async Mode': 'DevExpress.XtraPivotGrid.PivotGridOptionsBehaviorBase.UseAsyncMode',
            'Paper Width': 'DevExpress.XtraPivotGrid.Data.PivotGridPageSettings.PaperWidth',
            'Default Members Behavior': 'DevExpress.XtraPivotGrid.PivotGridOptionsOLAP.DefaultMembersBehavior',
            'Max Width': 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.MaxWidth',
            'Percent Of Column': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.PercentOfColumn',
            'Index': 'DevExpress.Data.PivotGrid.PivotSummaryDisplayType.Index',
            'Update Delay': 'DevExpress.XtraPivotGrid.PivotGridOptionsChartDataSource.UpdateDelay',
            'Automatic Totals': 'DevExpress.XtraPivotGrid.PivotTotalsVisibility.AutomaticTotals',
            'Show Level 76.4%': 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel76_4',
            'Show Level 23.6%': 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel23_6',
            'From Center Horizontal': 'DevExpress.XtraCharts.RectangleGradientMode.FromCenterHorizontal',
            'Right Bottom': 'DevExpress.XtraCharts.DockCorner.RightBottom',
            'Reverse': 'DevExpress.XtraCharts.Axis.Reverse',
            'Close': 'DevExpress.XtraCharts.StockLevel.Close',
            'Line Tension Percent': 'DevExpress.XtraCharts.FullStackedSplineArea3DSeriesView.LineTensionPercent',
            'Equal Bar Width': 'DevExpress.XtraCharts.SideBySideStackedBarSeriesView.EqualBarWidth',
            'Right Outside': 'DevExpress.XtraCharts.LegendAlignmentHorizontal.RightOutside',
            'Diamond': 'DevExpress.XtraCharts.MarkerKind.Diamond',
            'Resolve Overlapping Options': 'DevExpress.XtraCharts.AxisLabel.ResolveOverlappingOptions',
            'Thousands': 'DevExpress.XtraCharts.NumericGridAlignment.Thousands',
            'Label Visibility Mode': 'DevExpress.XtraCharts.Axis2D.LabelVisibilityMode',
            'Axis X': 'DevExpress.XtraCharts.SwiftPlotDiagram.AxisX',
            'Axis Y': 'DevExpress.XtraCharts.SwiftPlotDiagram.AxisY',
            'Left': 'DevExpress.XtraCharts.LegendAlignmentHorizontal.Left',
            'Start To Start': 'DevExpress.XtraCharts.TaskLinkType.StartToStart',
            'Shape Kind': 'DevExpress.XtraCharts.Annotation.ShapeKind',
            'Base Level Text Color': 'DevExpress.XtraCharts.FibonacciIndicatorLabel.BaseLevelTextColor',
            'Retrieve Column Custom Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveColumnCustomTotals',
            'Data Filters': 'DevExpress.XtraCharts.SeriesBase.DataFilters',
            'Scrolling Options': 'DevExpress.XtraCharts.Diagram3D.ScrollingOptions',
            'Custom Panel': 'DevExpress.XtraCharts.SimpleDiagram.CustomPanel',
            'Color': 'DevExpress.XtraCharts.SeriesViewBase.Color',
            'YZX': 'DevExpress.XtraCharts.RotationOrder.YZX',
            'YXZ': 'DevExpress.XtraCharts.RotationOrder.YXZ',
            'ZXY': 'DevExpress.XtraCharts.RotationOrder.ZXY',
            'ZYX': 'DevExpress.XtraCharts.RotationOrder.ZYX',
            'XYZ': 'DevExpress.XtraCharts.RotationOrder.XYZ',
            'XZY': 'DevExpress.XtraCharts.RotationOrder.XZY',
            'Secondary Axes Y': 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesY',
            'Secondary Axes X': 'DevExpress.XtraCharts.XYDiagram.SecondaryAxesX',
            'Border': 'DevExpress.XtraCharts.CustomAxisLabel.Border',
            'Axis': 'DevExpress.XtraCharts.AxisXCoordinate.Axis',
            'Marker Visibility': 'DevExpress.XtraCharts.RadarLineSeriesView.MarkerVisibility',
            'Default Pane': 'DevExpress.XtraCharts.XYDiagram2D.DefaultPane',
            'Plus': 'DevExpress.XtraCharts.MarkerKind.Plus',
            'Star': 'DevExpress.XtraCharts.MarkerKind.Star',
            'Not Equal': 'DevExpress.XtraCharts.DataFilterCondition.NotEqual',
            'Top Outside': 'DevExpress.XtraCharts.LegendAlignmentVertical.TopOutside',
            'Vertical': 'DevExpress.XtraCharts.LayoutDirection.Vertical',
            'Show Additional Levels': 'DevExpress.XtraCharts.FibonacciIndicator.ShowAdditionalLevels',
            'Height to Width Ratio': 'DevExpress.XtraCharts.FunnelSeriesViewBase.HeightToWidthRatio',
            'Millisecond': 'DevExpress.XtraCharts.DateTimeMeasureUnit.Millisecond',
            'Shadow': 'DevExpress.XtraCharts.XYDiagramSeriesViewBase.Shadow',
            'Hatch Style': 'DevExpress.XtraCharts.HatchFillOptions.HatchStyle',
            'Color Each': 'DevExpress.XtraCharts.SeriesView3DColorEachSupportBase.ColorEach',
            'Position': 'DevExpress.XtraCharts.PointSeriesLabel.Position',
            'Value Data Members': 'DevExpress.XtraCharts.SeriesBase.ValueDataMembers',
            'Finish To Finish': 'DevExpress.XtraCharts.TaskLinkType.FinishToFinish',
            'Pyramid': 'DevExpress.XtraCharts.Bar3DModel.Pyramid',
            'Solid': 'DevExpress.XtraCharts.FillMode3D.Solid',
            'Top Left to Bottom Right': 'DevExpress.XtraCharts.RectangleGradientMode.TopLeftToBottomRight',
            'Y': 'DevExpress.XtraCharts.ChartAnchorPoint.Y',
            'X': 'DevExpress.XtraCharts.ChartAnchorPoint.X',
            'Tool Tip Image': 'DevExpress.XtraCharts.Series.ToolTipImage',
            'Bottom Inside': 'DevExpress.XtraCharts.BarSeriesLabelPosition.BottomInside',
            'Retrieve Row Custom Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveRowCustomTotals',
            'Tangent': 'DevExpress.XtraCharts.PieSeriesLabelPosition.Tangent',
            'From Center Vertical': 'DevExpress.XtraCharts.RectangleGradientMode.FromCenterVertical',
            'Minimum Value Label': 'DevExpress.XtraCharts.RangeAreaLabelKind.MinValueLabel',
            'Child Color': 'DevExpress.XtraCharts.TaskLinkColorSource.ChildColor',
            'Chart Measure Unit': 'DevExpress.XtraCharts.ChartRangeControlClientSnapMode.ChartMeasureUnit',
            'Dimension': 'DevExpress.XtraCharts.SimpleDiagram3D.Dimension',
            'Minor Length': 'DevExpress.XtraCharts.TickmarksBase.MinorLength',
            'Show for Zero Values': 'DevExpress.XtraCharts.BarSeriesLabel.ShowForZeroValues',
            'Minor Color': 'DevExpress.XtraCharts.GridLines.MinorColor',
            'Value Numeric Options': 'DevExpress.XtraCharts.PointOptions.ValueNumericOptions',
            'Clockwise': 'DevExpress.XtraCharts.PieSweepDirection.Clockwise',
            'Line Visibility': 'DevExpress.XtraCharts.SeriesLabelBase.LineVisibility',
            'Tens': 'DevExpress.XtraCharts.NumericMeasureUnit.Tens',
            'Ones': 'DevExpress.XtraCharts.NumericMeasureUnit.Ones',
            'Bar Distance': 'DevExpress.XtraCharts.SideBySideFullStackedBar3DSeriesView.BarDistance',
            'Minor Thickness': 'DevExpress.XtraCharts.TickmarksBase.MinorThickness',
            'Allow Stagger': 'DevExpress.XtraCharts.AxisLabelResolveOverlappingOptions.AllowStagger',
            'Text Color': 'DevExpress.XtraCharts.CustomAxisLabel.TextColor',
            'Max Horizontal Percentage': 'DevExpress.XtraCharts.Legend.MaxHorizontalPercentage',
            'Colorizer': 'DevExpress.XtraCharts.SeriesBase.Colorizer',
            'Center': 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.Center',
            'Enable Antialiasing': 'DevExpress.XtraCharts.TitleBase.EnableAntialiasing',
            'AutoSize': 'DevExpress.XtraCharts.TextAnnotation.AutoSize',
            'Rotation Angle Y': 'DevExpress.XtraCharts.Diagram3D.RotationAngleY',
            'Rotation Angle X': 'DevExpress.XtraCharts.Diagram3D.RotationAngleX',
            'Rotation Angle Z': 'DevExpress.XtraCharts.Diagram3D.RotationAngleZ',
            'Marker Size': 'DevExpress.XtraCharts.CustomLegendItem.MarkerSize',
            'Max Allowed Point Count in Series': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.MaxAllowedPointCountInSeries',
            'Numerical': 'DevExpress.XtraCharts.ScaleType.Numerical',
            'Use Mouse Wheel': 'DevExpress.XtraCharts.ZoomingOptions.UseMouseWheel',
            'MinValueAngle': 'DevExpress.XtraCharts.RangeAreaSeriesLabel.MinValueAngle',
            'Length': 'DevExpress.XtraCharts.TickmarksBase.Length',
            'Max Value Internal': 'DevExpress.XtraCharts.AxisRange.MaxValueInternal',
            'AxisValue': 'DevExpress.XtraCharts.StripLimit.AxisValue',
            'Value Level': 'DevExpress.XtraCharts.SingleLevelIndicator.ValueLevel',
            'Top to Bottom': 'DevExpress.XtraCharts.PolygonGradientMode.TopToBottom',
            'Envelope Line Style': 'DevExpress.XtraCharts.MovingAverage.EnvelopeLineStyle',
            'GridAlignment': 'DevExpress.XtraCharts.ChartRangeControlClientDateTimeGridOptions.GridAlignment',
            'Top N Options': 'DevExpress.XtraCharts.SeriesBase.TopNOptions',
            'Inverted Step': 'DevExpress.XtraCharts.StepAreaSeriesView.InvertedStep',
            'Series Indent Fixed': 'DevExpress.XtraCharts.XYDiagram3D.SeriesIndentFixed',
            'Top Right to Bottom Left': 'DevExpress.XtraCharts.PolygonGradientMode.TopRightToBottomLeft',
            'Tail': 'DevExpress.XtraCharts.AnnotationConnectorStyle.Tail',
            'Use Weight': 'DevExpress.XtraCharts.PaneSizeMode.UseWeight',
            'DateTimeOptions': 'DevExpress.XtraCharts.AxisLabel.DateTimeOptions',
            'Show Others': 'DevExpress.XtraCharts.TopNOptions.ShowOthers',
            'Dot': 'DevExpress.XtraCharts.DashStyle.Dot',
            'Rotation Options': 'DevExpress.XtraCharts.Diagram3D.RotationOptions',
            'Point View': 'DevExpress.XtraCharts.PointOptions.PointView',
            'Common Label Position': 'DevExpress.XtraCharts.CrosshairOptions.CommonLabelPosition',
            'Left Outside': 'DevExpress.XtraCharts.LegendAlignmentHorizontal.LeftOutside',
            'Auto Scale Breaks': 'DevExpress.XtraCharts.Axis.AutoScaleBreaks',
            'Shape Fillet': 'DevExpress.XtraCharts.Annotation.ShapeFillet',
            'Tickmarks': 'DevExpress.XtraCharts.RadarAxisY.Tickmarks',
            'Size As Percentage': 'DevExpress.XtraCharts.Pie3DSeriesView.SizeAsPercentage',
            'Currency': 'DevExpress.XtraCharts.NumericFormat.Currency',
            'Precision': 'DevExpress.XtraCharts.NumericOptions.Precision',
            'Size In Pixels': 'DevExpress.XtraCharts.XYDiagramPaneBase.SizeInPixels',
            'Min Value': 'DevExpress.XtraCharts.AxisRange.MinValue',
            'Axis Value': 'DevExpress.XtraCharts.CustomAxisLabel.AxisValue',
            'Parent Color': 'DevExpress.XtraCharts.TaskLinkColorSource.ParentColor',
            'Use Keyboard with Mouse': 'DevExpress.XtraCharts.ZoomingOptions.UseKeyboardWithMouse',
            'Week': 'DevExpress.XtraCharts.DateTimeGridAlignment.Week',
            'Millions': 'DevExpress.XtraCharts.NumericMeasureUnit.Millions',
            'Column Name': 'DevExpress.XtraCharts.DataFilter.ColumnName',
            'Scientific': 'DevExpress.XtraCharts.NumericFormat.Scientific',
            'Grid Alignment': 'DevExpress.XtraCharts.NumericScaleOptions.GridAlignment',
            'Exploded Points': 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodedPoints',
            'Label Mode': 'DevExpress.XtraCharts.Annotation.LabelMode',
            'Resolve Overlapping Min Indent': 'DevExpress.XtraCharts.SeriesLabelBase.ResolveOverlappingMinIndent',
            'Standard': 'DevExpress.XtraCharts.TimeSpanFormat.Standard',
            'Indicators': 'DevExpress.XtraCharts.XYDiagram2DSeriesViewBase.Indicators',
            'Runtime Rotation': 'DevExpress.XtraCharts.Annotation.RuntimeRotation',
            'Whole Range': 'DevExpress.XtraCharts.AxisBase.WholeRange',
            'Offest X': 'DevExpress.XtraCharts.CrosshairLabelPosition.OffsetX',
            'Offest Y': 'DevExpress.XtraCharts.CrosshairLabelPosition.OffsetY',
            'Moving Average And Envelope': 'DevExpress.XtraCharts.MovingAverageKind.MovingAverageAndEnvelope',
            'Max Line Count': 'DevExpress.XtraCharts.SeriesLabelBase.MaxLineCount',
            'Grid Offset': 'DevExpress.XtraCharts.ScaleOptionsBase.GridOffset',
            'Thickness': 'DevExpress.XtraCharts.TickmarksBase.Thickness',
            'Minor Count': 'DevExpress.XtraCharts.AxisBase.MinorCount',
            'Max Limit': 'DevExpress.XtraCharts.Strip.MaxLimit',
            'Transparency': 'DevExpress.XtraCharts.XYDiagram3DSeriesViewBase.Transparency',
            'Stacked Group': 'DevExpress.XtraCharts.SideBySideStackedBar3DSeriesView.StackedGroup',
            'Marker Options': 'DevExpress.XtraCharts.AreaSeriesViewBase.MarkerOptions',
            'Kind': 'DevExpress.XtraCharts.FibonacciIndicator.Kind',
            'Exploded Distance Percentage': 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodedDistancePercentage',
            'LegendItemPattern': 'DevExpress.XtraCharts.RangeColorizer.LegendItemPattern',
            'SweepDirection': 'DevExpress.XtraCharts.PieSeriesViewBase.SweepDirection',
            'Marker Visible': 'DevExpress.XtraCharts.CustomLegendItem.MarkerVisible',
            'Panes': 'DevExpress.XtraCharts.XYDiagram2D.Panes',
            'MinAllowedSizePercentage': 'DevExpress.XtraCharts.PieSeriesView.MinAllowedSizePercentage',
            'Total Seconds': 'DevExpress.XtraCharts.TimeSpanFormat.TotalSeconds',
            'Show Value Labels': 'DevExpress.XtraCharts.CrosshairOptions.ShowValueLabels',
            'Child Point': 'DevExpress.XtraCharts.Relation.ChildPoint',
            'Marker 2': 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2',
            'Marker 1': 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1',
            'Right': 'DevExpress.XtraCharts.RectangleIndents.Right',
            'Value Duration Format': 'DevExpress.XtraCharts.RangePointOptions.ValueDurationFormat',
            'Tool Tip Point Pattern': 'DevExpress.XtraCharts.SeriesBase.ToolTipPointPattern',
            'WorkdaysOnly': 'DevExpress.XtraCharts.DateTimeScaleOptions.WorkdaysOnly',
            'Hole Radius Percent': 'DevExpress.XtraCharts.Doughnut3DSeriesView.HoleRadiusPercent',
            'Polygon': 'DevExpress.XtraCharts.RadarDiagramDrawingStyle.Polygon',
            'Value 2': 'DevExpress.XtraCharts.ValueLevel.Value_2',
            'Value 1': 'DevExpress.XtraCharts.ValueLevel.Value_1',
            'Color2': 'DevExpress.XtraCharts.PaletteEntry.Color2',
            'Left to Right': 'DevExpress.XtraCharts.RadarAxisXLabelTextDirection.LeftToRight',
            'Runtime Moving': 'DevExpress.XtraCharts.Annotation.RuntimeMoving',
            'Bar Width': 'DevExpress.XtraCharts.BarSeriesView.BarWidth',
            'Line Thickness': 'DevExpress.XtraCharts.FinancialSeriesViewBase.LineThickness',
            'Near': 'DevExpress.XtraCharts.ConstantLineTitleAlignment.Near',
            'Labels': 'DevExpress.XtraCharts.FibonacciIndicator.Label',
            'Left Top': 'DevExpress.XtraCharts.DockCorner.LeftTop',
            'Notched Arrow': 'DevExpress.XtraCharts.AnnotationConnectorStyle.NotchedArrow',
            'Border Visible': 'DevExpress.XtraCharts.RadarDiagram.BorderVisible',
            'ApproximateColors': 'DevExpress.XtraCharts.RangeColorizer.ApproximateColors',
            'Max Value Label': 'DevExpress.XtraCharts.RangeBarLabelKind.MaxValueLabel',
            'From Center': 'DevExpress.XtraCharts.PolygonGradientMode.FromCenter',
            'Dock Corner': 'DevExpress.XtraCharts.FreePosition.DockCorner',
            'Show Argument Line': 'DevExpress.XtraCharts.CrosshairOptions.ShowArgumentLine',
            'Counterclockwise': 'DevExpress.XtraCharts.PieSweepDirection.Counterclockwise',
            'Arrow': 'DevExpress.XtraCharts.AnnotationConnectorStyle.Arrow',
            'Pane Distance': 'DevExpress.XtraCharts.XYDiagram2D.PaneDistance',
            'Show Below Line': 'DevExpress.XtraCharts.ConstantLineTitle.ShowBelowLine',
            'Edge2': 'DevExpress.XtraCharts.ScaleBreak.Edge2',
            'Edge1': 'DevExpress.XtraCharts.ScaleBreak.Edge1',
            'Auto Format': 'DevExpress.XtraCharts.DateTimeOptions.AutoFormat',
            'Auto Grid': 'DevExpress.XtraCharts.ScaleOptionsBase.AutoGrid',
            'Straight': 'DevExpress.XtraCharts.ScaleBreakStyle.Straight',
            'Crosshair Axis Label Options': 'DevExpress.XtraCharts.Axis2D.CrosshairAxisLabelOptions',
            'Labels Visibility': 'DevExpress.XtraCharts.SeriesBase.LabelsVisibility',
            'Retrieve Column Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveColumnTotals',
            'Bar Distance Fixed': 'DevExpress.XtraCharts.SideBySideRangeBarSeriesView.BarDistanceFixed',
            'Pane Layout Direction': 'DevExpress.XtraCharts.XYDiagram2D.PaneLayoutDirection',
            'Layout Direction': 'DevExpress.XtraCharts.SimpleDiagram3D.LayoutDirection',
            'Manual': 'DevExpress.XtraCharts.ChartRangeControlClientSnapMode.Manual',
            'Max Size': 'DevExpress.XtraCharts.BubbleSeriesView.MaxSize',
            'Gradient Mode': 'DevExpress.XtraCharts.PolygonGradientFillOptions.GradientMode',
            'Argument and Values': 'DevExpress.XtraCharts.PointView.ArgumentAndValues',
            'Custom Measure Unit': 'DevExpress.XtraCharts.NumericScaleOptions.CustomMeasureUnit',
            'Rotation Type': 'DevExpress.XtraCharts.Diagram3D.RotationType',
            'Circle': 'DevExpress.XtraCharts.MarkerKind.Circle',
            'Automatic: Integral': 'DevExpress.XtraCharts.DateTimeScaleMode.AutomaticIntegral',
            'Retrieve Row Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveRowTotals',
            'Automatic: Average': 'DevExpress.XtraCharts.DateTimeScaleMode.AutomaticAverage',
            'NumericOptions': 'DevExpress.XtraCharts.AxisLabel.NumericOptions',
            'Use Mouse': 'DevExpress.XtraCharts.ScrollingOptions.UseMouse',
            'High': 'DevExpress.XtraCharts.StockLevel.High',
            'Open': 'DevExpress.XtraCharts.StockLevel.Open',
            'SnapMode': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.SnapMode',
            'Use Keyboard': 'DevExpress.XtraCharts.ScrollingOptions.UseKeyboard',
            'Connector Style': 'DevExpress.XtraCharts.Annotation.ConnectorStyle',
            'Less Than Or Equal': 'DevExpress.XtraCharts.DataFilterCondition.LessThanOrEqual',
            'Total Minutes': 'DevExpress.XtraCharts.TimeSpanFormat.TotalMinutes',
            'Item': 'DevExpress.XtraCharts.SeriesPoint.Item',
            'Model': 'DevExpress.XtraCharts.Bar3DSeriesView.Model',
            'Auto Side Margins': 'DevExpress.XtraCharts.Range.AutoSideMargins',
            'Fill Mode': 'DevExpress.XtraCharts.FillStyle3D.FillMode',
            'Axis Y Max Zoom Percent': 'DevExpress.XtraCharts.ZoomingOptions2D.AxisYMaxZoomPercent',
            'Dash Dot': 'DevExpress.XtraCharts.DashStyle.DashDot',
            'Value Line Style': 'DevExpress.XtraCharts.CrosshairOptions.ValueLineStyle',
            'Min Limit': 'DevExpress.XtraCharts.Strip.MinLimit',
            'Alignment Vertical': 'DevExpress.XtraCharts.Legend.AlignmentVertical',
            'Key': 'DevExpress.XtraCharts.SeriesPointFilter.Key',
            'Value Line Color': 'DevExpress.XtraCharts.CrosshairOptions.ValueLineColor',
            'Show Open Close': 'DevExpress.XtraCharts.StockSeriesView.ShowOpenClose',
            'Exploded Points Filters': 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodedPointsFilters',
            'Right Column': 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.RightColumn',
            'Custom Labels': 'DevExpress.XtraCharts.Axis2D.CustomLabels',
            'Always Show Zero Level': 'DevExpress.XtraCharts.VisualRange.AlwaysShowZeroLevel',
            'Staggered': 'DevExpress.XtraCharts.AxisLabel.Staggered',
            'Runtime Resizing': 'DevExpress.XtraCharts.Annotation.RuntimeResizing',
            'Automatic Layout Settings Enabled': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoLayoutSettingsEnabled',
            'Horizontal': 'DevExpress.XtraCharts.TextOrientation.Horizontal',
            'Show Argument Labels': 'DevExpress.XtraCharts.CrosshairOptions.ShowArgumentLabels',
            'Bar Thickness': 'DevExpress.XtraCharts.ScrollBarOptions.BarThickness',
            'Auto-Generated And Custom': 'DevExpress.XtraCharts.AxisLabelVisibilityMode.AutoGeneratedAndCustom',
            'Tuesday': 'DevExpress.XtraCharts.Weekday.Tuesday',
            'Min Size': 'DevExpress.XtraCharts.BubbleSeriesView.MinSize',
            'Argument Scale Type': 'DevExpress.XtraCharts.SeriesBase.ArgumentScaleType',
            'Back Image': 'DevExpress.XtraCharts.XYDiagramPaneBase.BackImage',
            'Total Days': 'DevExpress.XtraCharts.TimeSpanFormat.TotalDays',
            'Use Mouse Advanced': 'DevExpress.XtraCharts.RotationType.UseMouseAdvanced',
            'AggregateFunction': 'DevExpress.XtraCharts.ScaleOptionsBase.AggregateFunction',
            'Hide Overlapped': 'DevExpress.XtraCharts.AxisLabelResolveOverlappingMode.HideOverlapped',
            'Marker 2 Visibility': 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker2Visibility',
            'Long Date': 'DevExpress.XtraCharts.DateTimeFormat.LongDate',
            'Long Time': 'DevExpress.XtraCharts.DateTimeFormat.LongTime',
            'SnapSpacing': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.SnapSpacing',
            'Radial': 'DevExpress.XtraCharts.PieSeriesLabelPosition.Radial',
            'Threshold Value': 'DevExpress.XtraCharts.TopNMode.ThresholdValue',
            'Marker Color': 'DevExpress.XtraCharts.CustomLegendItem.MarkerColor',
            'Crosshair Label Visibility': 'DevExpress.XtraCharts.SeriesBase.CrosshairLabelVisibility',
            'GridOffset': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.GridOffset',
            'Size as Percentage': 'DevExpress.XtraCharts.PieSeriesViewBase.SizeAsPercentage',
            'Start Angle in Degrees': 'DevExpress.XtraCharts.RadarDiagram.StartAngleInDegrees',
            'Marker Image': 'DevExpress.XtraCharts.CustomLegendItem.MarkerImage',
            'Argument Data Member': 'DevExpress.XtraCharts.SeriesBase.ArgumentDataMember',
            'Shape Position': 'DevExpress.XtraCharts.Annotation.ShapePosition',
            'Far': 'DevExpress.XtraCharts.ConstantLineTitleAlignment.Far',
            'Dock Target': 'DevExpress.XtraCharts.CrosshairFreePosition.DockTarget',
            'Hundreds': 'DevExpress.XtraCharts.NumericMeasureUnit.Hundreds',
            'Points': 'DevExpress.XtraCharts.Series.Points',
            'Min Value Internal': 'DevExpress.XtraCharts.Range.MinValueInternal',
            'Base Level Line Style': 'DevExpress.XtraCharts.FibonacciIndicator.BaseLevelLineStyle',
            'Percent Options': 'DevExpress.XtraCharts.SimplePointOptions.PercentOptions',
            'Vertical Indent': 'DevExpress.XtraCharts.Legend.VerticalIndent',
            'Scale Break Options': 'DevExpress.XtraCharts.Axis.ScaleBreakOptions',
            'Bar Color': 'DevExpress.XtraCharts.ScrollBarOptions.BarColor',
            'Strips': 'DevExpress.XtraCharts.Axis2D.Strips',
            'Alignment Horizontal': 'DevExpress.XtraCharts.Legend.AlignmentHorizontal',
            'Hatch': 'DevExpress.XtraCharts.FillMode.Hatch',
            'Dash Style': 'DevExpress.XtraCharts.LineStyle.DashStyle',
            'Color Data Member': 'DevExpress.XtraCharts.SeriesBase.ColorDataMember',
            'One Label': 'DevExpress.XtraCharts.RangeBarLabelKind.OneLabel',
            'Runtime Zooming': 'DevExpress.XtraCharts.Diagram3D.RuntimeZooming',
            'Marker 1 Visibility': 'DevExpress.XtraCharts.RangeAreaSeriesView.Marker1Visibility',
            'Series Distance': 'DevExpress.XtraCharts.XYDiagram3D.SeriesDistance',
            'Keys': 'DevExpress.XtraCharts.KeyColorColorizer.Keys',
            'Others Argument': 'DevExpress.XtraCharts.TopNOptions.OthersArgument',
            'Retrieve Empty Cells': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveEmptyCells',
            'Text Visible': 'DevExpress.XtraCharts.Legend.TextVisible',
            'Inside': 'DevExpress.XtraCharts.PieSeriesLabelPosition.Inside',
            'Use Touch Device': 'DevExpress.XtraCharts.RotationOptions.UseTouchDevice',
            'Show Facet': 'DevExpress.XtraCharts.Bar3DSeriesView.ShowFacet',
            'Values': 'DevExpress.XtraCharts.SeriesPoint.Values',
            'Constant Lines': 'DevExpress.XtraCharts.Axis2D.ConstantLines',
            'Bottom to Top': 'DevExpress.XtraCharts.RadarAxisXLabelTextDirection.BottomToTop',
            'Axis Label Text': 'DevExpress.XtraCharts.Strip.AxisLabelText',
            'Y Axis Scroll Bar Alignment': 'DevExpress.XtraCharts.ScrollBarOptions.YAxisScrollBarAlignment',
            'Legend Text': 'DevExpress.XtraCharts.Strip.LegendText',
            'Resolve Overlapping Mode': 'DevExpress.XtraCharts.SeriesLabelBase.ResolveOverlappingMode',
            'Finish To Start': 'DevExpress.XtraCharts.TaskLinkType.FinishToStart',
            'Others': 'DevExpress.XtraCharts.PieExplodeMode.Others',
            'Min Value Marker': 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarker',
            'Drawing Style': 'DevExpress.XtraCharts.RadarDiagram.DrawingStyle',
            'Perspective Angle': 'DevExpress.XtraCharts.Diagram3D.PerspectiveAngle',
            'Right Top': 'DevExpress.XtraCharts.DockCorner.RightTop',
            'SnapAlignment': 'DevExpress.XtraCharts.ChartRangeControlClientDateTimeGridOptions.SnapAlignment',
            'Area Width': 'DevExpress.XtraCharts.Area3DSeriesView.AreaWidth',
            'Fibonacci Retracement': 'DevExpress.XtraCharts.FibonacciIndicatorKind.FibonacciRetracement',
            'Z Order': 'DevExpress.XtraCharts.Annotation.ZOrder',
            'Min Indent': 'DevExpress.XtraCharts.AxisLabelResolveOverlappingOptions.MinIndent',
            'Square': 'DevExpress.XtraCharts.MarkerKind.Square',
            'Text Pattern': 'DevExpress.XtraCharts.SeriesLabelBase.TextPattern',
            'Holidays': 'DevExpress.XtraCharts.WorkdaysOptions.Holidays',
            'To Center': 'DevExpress.XtraCharts.PolygonGradientMode.ToCenter',
            'Dash': 'DevExpress.XtraCharts.DashStyle.Dash',
            'Max Allowed Series Count': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.MaxAllowedSeriesCount',
            'Use Mouse Standard': 'DevExpress.XtraCharts.RotationType.UseMouseStandard',
            'Border 1': 'DevExpress.XtraCharts.RangeAreaSeriesView.Border1',
            'Border 2': 'DevExpress.XtraCharts.RangeAreaSeriesView.Border2',
            'Show Level 100%': 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel100',
            'Both': 'DevExpress.XtraCharts.StockType.Both',
            'Minor Visible': 'DevExpress.XtraCharts.TickmarksBase.MinorVisible',
            'Ragged': 'DevExpress.XtraCharts.ScaleBreakStyle.Ragged',
            'Justify All Around Point': 'DevExpress.XtraCharts.ResolveOverlappingMode.JustifyAllAroundPoint',
            'Start To Finish': 'DevExpress.XtraCharts.TaskLinkType.StartToFinish',
            'Gradient': 'DevExpress.XtraCharts.FillMode3D.Gradient',
            'All': 'DevExpress.XtraCharts.PieExplodeMode.All',
            'X Axis Scroll Bar Visible': 'DevExpress.XtraCharts.ScrollBarOptions.XAxisScrollBarVisible',
            'End Text': 'DevExpress.XtraCharts.SeriesNameTemplate.EndText',
            'Max Value': 'DevExpress.XtraCharts.Range.MaxValue',
            'Own Color': 'DevExpress.XtraCharts.TaskLinkColorSource.OwnColor',
            'Interlaced Fill Style': 'DevExpress.XtraCharts.RadarAxis.InterlacedFillStyle',
            'Argument': 'DevExpress.XtraCharts.FinancialIndicatorPoint.Argument',
            'Extrapolate to Infinity': 'DevExpress.XtraCharts.TrendLine.ExtrapolateToInfinity',
            'Pane': 'DevExpress.XtraCharts.XYDiagramSeriesViewBase.Pane',
            'Line Color': 'DevExpress.XtraCharts.SeriesLabelBase.LineColor',
            'Child Border Color': 'DevExpress.XtraCharts.TaskLinkColorSource.ChildBorderColor',
            'Custom Grid Alignment': 'DevExpress.XtraCharts.NumericScaleOptions.CustomGridAlignment',
            'Retrieve Column Grand Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveColumnGrandTotals',
            'Value 3': 'DevExpress.XtraCharts.SeriesPointKey.Value_3',
            'Value 4': 'DevExpress.XtraCharts.SeriesPointKey.Value_4',
            'Antialiasing': 'DevExpress.XtraCharts.SwiftPlotSeriesView.Antialiasing',
            'Chart Grid': 'DevExpress.XtraCharts.ChartRangeControlClientGridMode.ChartGrid',
            'Rotation': 'DevExpress.XtraCharts.PieSeriesView.Rotation',
            'Zoom': 'DevExpress.XtraCharts.ChartImageSizeMode.Zoom',
            'Tile': 'DevExpress.XtraCharts.ChartImageSizeMode.Tile',
            'Rotated': 'DevExpress.XtraCharts.XYDiagram.Rotated',
            'Dash Dot Dot': 'DevExpress.XtraCharts.DashStyle.DashDotDot',
            'Outside': 'DevExpress.XtraCharts.RangeBarLabelPosition.Outside',
            'Pie Fill Style': 'DevExpress.XtraCharts.Pie3DSeriesView.PieFillStyle',
            'Saturday': 'DevExpress.XtraCharts.Weekday.Saturday',
            'Color 2': 'DevExpress.XtraCharts.FillOptionsColor2Base.Color2',
            'KeyProvider': 'DevExpress.XtraCharts.KeyColorColorizer.KeyProvider',
            'Top To Bottom': 'DevExpress.XtraCharts.TextOrientation.TopToBottom',
            'Two Labels': 'DevExpress.XtraCharts.RangeAreaLabelKind.TwoLabels',
            'Funnel Fill Style': 'DevExpress.XtraCharts.Funnel3DSeriesView.FunnelFillStyle',
            'Value and Weight': 'DevExpress.XtraCharts.BubbleLabelValueToDisplay.ValueAndWeight',
            'Group Header Pattern': 'DevExpress.XtraCharts.CrosshairOptions.GroupHeaderPattern',
            'GridMode': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.GridMode',
            'Automatic': 'DevExpress.XtraCharts.ScaleMode.Automatic',
            'Argument Line Color': 'DevExpress.XtraCharts.CrosshairOptions.ArgumentLineColor',
            'Zooming Options': 'DevExpress.XtraCharts.Diagram3D.ZoomingOptions',
            'Argument Line Style': 'DevExpress.XtraCharts.CrosshairOptions.ArgumentLineStyle',
            'Date-time Measure Unit': 'DevExpress.XtraCharts.AxisBase.DateTimeMeasureUnit',
            'Billions': 'DevExpress.XtraCharts.NumericGridAlignment.Billions',
            'Parent Border Color': 'DevExpress.XtraCharts.TaskLinkColorSource.ParentBorderColor',
            'Inverted Triangle': 'DevExpress.XtraCharts.MarkerKind.InvertedTriangle',
            'Undefined': 'DevExpress.XtraCharts.PointView.Undefined',
            'Zoom Percent': 'DevExpress.XtraCharts.Diagram3D.ZoomPercent',
            'Show Axis Label': 'DevExpress.XtraCharts.Strip.ShowAxisLabel',
            'RangeStops': 'DevExpress.XtraCharts.RangeColorizer.RangeStops',
            'Total Milliseconds': 'DevExpress.XtraCharts.TimeSpanFormat.TotalMilliseconds',
            'Logarithmic': 'DevExpress.XtraCharts.AxisBase.Logarithmic',
            'Left Column': 'DevExpress.XtraCharts.FunnelSeriesLabelPosition.LeftColumn',
            'Indent from Marker': 'DevExpress.XtraCharts.BubbleSeriesLabel.IndentFromMarker',
            'Legend Point Options': 'DevExpress.XtraCharts.SeriesBase.LegendPointOptions',
            'Date Time': 'DevExpress.XtraCharts.ScaleType.DateTime',
            'GridSpacing': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.GridSpacing',
            'Crosshair Enabled': 'DevExpress.XtraCharts.SeriesBase.CrosshairEnabled',
            'Bar Depth Auto': 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepthAuto',
            'Line Visible': 'DevExpress.XtraCharts.SeriesLabelBase.LineVisible',
            'Crosshair Highlight Points': 'DevExpress.XtraCharts.SeriesBase.CrosshairHighlightPoints',
            'Runtime Anchoring': 'DevExpress.XtraCharts.Annotation.RuntimeAnchoring',
            'Y Axis Scroll Bar Visible': 'DevExpress.XtraCharts.ScrollBarOptions.YAxisScrollBarVisible',
            'Visibility': 'DevExpress.XtraCharts.BorderBase.Visibility',
            'Bottom Left to Top Right': 'DevExpress.XtraCharts.PolygonGradientMode.BottomLeftToTopRight',
            'Base Level Color': 'DevExpress.XtraCharts.FibonacciIndicator.BaseLevelColor',
            'Insert Zero Values': 'DevExpress.XtraCharts.ProcessMissingPointsMode.InsertZeroValues',
            'Range': 'DevExpress.XtraCharts.AxisBase.Range',
            'Color Source': 'DevExpress.XtraCharts.TaskLinkOptions.ColorSource',
            'Min Value Label': 'DevExpress.XtraCharts.RangeBarLabelKind.MinValueLabel',
            'Point Distance': 'DevExpress.XtraCharts.FunnelSeriesViewBase.PointDistance',
            'Tool Tip Series Pattern': 'DevExpress.XtraCharts.SeriesBase.ToolTipSeriesPattern',
            'Show Value Line': 'DevExpress.XtraCharts.CrosshairOptions.ShowValueLine',
            'Value As Duration': 'DevExpress.XtraCharts.RangePointOptions.ValueAsDuration',
            'Envelope Percent': 'DevExpress.XtraCharts.MovingAverage.EnvelopePercent',
            'Show Level 0%': 'DevExpress.XtraCharts.FibonacciIndicator.ShowLevel0',
            'Crosshair Label Mode': 'DevExpress.XtraCharts.CrosshairOptions.CrosshairLabelMode',
            'Begin Text': 'DevExpress.XtraCharts.AxisLabel.BeginText',
            'Maximum Value Label': 'DevExpress.XtraCharts.RangeAreaLabelKind.MaxValueLabel',
            'Use Points': 'DevExpress.XtraCharts.PieExplodeMode.UsePoints',
            'Fibonacci Fans': 'DevExpress.XtraCharts.FibonacciIndicatorKind.FibonacciFans',
            'Fibonacci Arcs': 'DevExpress.XtraCharts.FibonacciIndicatorKind.FibonacciArcs',
            'Bubble Marker Options': 'DevExpress.XtraCharts.BubbleSeriesView.BubbleMarkerOptions',
            'Triangle': 'DevExpress.XtraCharts.MarkerKind.Triangle',
            'Retrieve Data by Columns': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveDataByColumns',
            'AxisY Coordinate': 'DevExpress.XtraCharts.PaneAnchorPoint.AxisYCoordinate',
            'Plane Depth Fixed': 'DevExpress.XtraCharts.XYDiagram3D.PlaneDepthFixed',
            'Equal Pie Size': 'DevExpress.XtraCharts.SimpleDiagram.EqualPieSize',
            'General': 'DevExpress.XtraCharts.DateTimeFormat.General',
            'Low': 'DevExpress.XtraCharts.StockLevel.Low',
            'Outer Indents': 'DevExpress.XtraCharts.FreePosition.OuterIndents',
            'Column Indent': 'DevExpress.XtraCharts.PieSeriesLabel.ColumnIndent',
            'Summary Function': 'DevExpress.XtraCharts.SeriesBase.SummaryFunction',
            'Percentage Accuracy': 'DevExpress.XtraCharts.PercentOptions.PercentageAccuracy',
            'Horizontal Scroll Percent': 'DevExpress.XtraCharts.Diagram3D.HorizontalScrollPercent',
            'Link Options': 'DevExpress.XtraCharts.GanttSeriesView.LinkOptions',
            'Argument Date-time Options': 'DevExpress.XtraCharts.PointOptions.ArgumentDateTimeOptions',
            'Show In Legend': 'DevExpress.XtraCharts.Indicator.ShowInLegend',
            'Title': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Title',
            'Use Scroll Bars': 'DevExpress.XtraCharts.ScrollingOptions2D.UseScrollBars',
            'Short Time': 'DevExpress.XtraCharts.DateTimeFormat.ShortTime',
            'Short Date': 'DevExpress.XtraCharts.DateTimeFormat.ShortDate',
            'Zero': 'DevExpress.XtraCharts.AxisAlignment.Zero',
            'Rotation Order': 'DevExpress.XtraCharts.Diagram3D.RotationOrder',
            'Relations': 'DevExpress.XtraCharts.SeriesPoint.Relations',
            'Date-time Grid Alignment': 'DevExpress.XtraCharts.AxisBase.DateTimeGridAlignment',
            'Total Hours': 'DevExpress.XtraCharts.TimeSpanFormat.TotalHours',
            'Box': 'DevExpress.XtraCharts.Bar3DModel.Box',
            'WorkdaysOptions': 'DevExpress.XtraCharts.DateTimeScaleOptions.WorkdaysOptions',
            'Show Crosshair Labels': 'DevExpress.XtraCharts.CrosshairOptions.ShowCrosshairLabels',
            'Top Level': 'DevExpress.XtraCharts.RadarAxisY.TopLevel',
            'Cone': 'DevExpress.XtraCharts.Bar3DModel.Cone',
            'Scale Breaks': 'DevExpress.XtraCharts.Axis.ScaleBreaks',
            'Text Direction': 'DevExpress.XtraCharts.RadarAxisXLabel.TextDirection',
            'Threshold Percent': 'DevExpress.XtraCharts.TopNOptions.ThresholdPercent',
            'SnapOffset': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.SnapOffset',
            'Automatic Size': 'DevExpress.XtraCharts.BubbleSeriesView.AutoSize',
            'Equally Spaced Items': 'DevExpress.XtraCharts.Legend.EquallySpacedItems',
            'Reduction Options': 'DevExpress.XtraCharts.FinancialSeriesViewBase.ReductionOptions',
            'Automatic Binding Settings Enabled': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.AutoBindingSettingsEnabled',
            'Envelope Color': 'DevExpress.XtraCharts.MovingAverage.EnvelopeColor',
            'Depth': 'DevExpress.XtraCharts.Pie3DSeriesView.Depth',
            'Horizontal Indent': 'DevExpress.XtraCharts.Legend.HorizontalIndent',
            'MaxValueAngle': 'DevExpress.XtraCharts.RangeAreaSeriesLabel.MaxValueAngle',
            'Quarter and Year': 'DevExpress.XtraCharts.DateTimeFormat.QuarterAndYear',
            'Tool Tip Enabled': 'DevExpress.XtraCharts.SeriesBase.ToolTipEnabled',
            'Numeric Options': 'DevExpress.XtraCharts.AxisBase.NumericOptions',
            'Qualitative': 'DevExpress.XtraCharts.ScaleType.Qualitative',
            'Bar Depth': 'DevExpress.XtraCharts.Bar3DSeriesView.BarDepth',
            'Synchronize With Whole Range': 'DevExpress.XtraCharts.VisualRange.SynchronizeWithWholeRange',
            'Two Columns': 'DevExpress.XtraCharts.PieSeriesLabelPosition.TwoColumns',
            'Side Margins Value': 'DevExpress.XtraCharts.Range.SideMarginsValue',
            'Workdays Only': 'DevExpress.XtraCharts.AxisBase.WorkdaysOnly',
            'Thursday': 'DevExpress.XtraCharts.Weekday.Thursday',
            'Parent Point': 'DevExpress.XtraCharts.Relation.ParentPoint',
            'Size Mode': 'DevExpress.XtraCharts.ImageAnnotation.SizeMode',
            'Fixed Point': 'DevExpress.XtraCharts.NumericFormat.FixedPoint',
            'Bottom Outside': 'DevExpress.XtraCharts.LegendAlignmentVertical.BottomOutside',
            'MeasureUnit': 'DevExpress.XtraCharts.DateTimeScaleOptions.MeasureUnit',
            'Exact Workdays': 'DevExpress.XtraCharts.WorkdaysOptions.ExactWorkdays',
            'Vertical Scroll Percent': 'DevExpress.XtraCharts.Diagram3D.VerticalScrollPercent',
            'Dock': 'DevExpress.XtraCharts.DockableTitle.Dock',
            'Scrolling Range': 'DevExpress.XtraCharts.AxisRange.ScrollingRange',
            'Numeric Scale Options': 'DevExpress.XtraCharts.AxisBase.NumericScaleOptions',
            'Month and Year': 'DevExpress.XtraCharts.DateTimeFormat.MonthAndYear',
            'Series Name': 'DevExpress.XtraCharts.PointView.SeriesName',
            'AnchorPoint': 'DevExpress.XtraCharts.Annotation.AnchorPoint',
            'Bottom Right to Top Left': 'DevExpress.XtraCharts.PolygonGradientMode.BottomRightToTopLeft',
            'ShowInLegend': 'DevExpress.XtraCharts.PaletteColorizerBase.ShowInLegend',
            'Date-time Scale Mode': 'DevExpress.XtraCharts.SecondaryAxisX.DateTimeScaleMode',
            'Line Marker Options': 'DevExpress.XtraCharts.LineSeriesView.LineMarkerOptions',
            'Inner Indent': 'DevExpress.XtraCharts.NestedDoughnutSeriesView.InnerIndent',
            'Legend Text Pattern': 'DevExpress.XtraCharts.SeriesBase.LegendTextPattern',
            'Side Margins Enabled': 'DevExpress.XtraCharts.AxisRange.SideMarginsEnabled',
            'Series Points Sorting Key': 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSortingKey',
            'Palette': 'DevExpress.XtraCharts.PaletteColorizerBase.Palette',
            'Skip': 'DevExpress.XtraCharts.ProcessMissingPointsMode.Skip',
            'Tool Tip Hint Data Member': 'DevExpress.XtraCharts.SeriesBase.ToolTipHintDataMember',
            'Value DateTime Options': 'DevExpress.XtraCharts.PointOptions.ValueDateTimeOptions',
            'Align to Center': 'DevExpress.XtraCharts.FunnelSeriesView.AlignToCenter',
            'Point Options': 'DevExpress.XtraCharts.SeriesLabelBase.PointOptions',
            'Top Inside': 'DevExpress.XtraCharts.BarSeriesLabelPosition.TopInside',
            'Highlight Points': 'DevExpress.XtraCharts.CrosshairOptions.HighlightPoints',
            'Max Count': 'DevExpress.XtraCharts.AutoScaleBreaks.MaxCount',
            'Height to Width Ratio Auto': 'DevExpress.XtraCharts.FunnelSeriesView.HeightToWidthRatioAuto',
            'Closed': 'DevExpress.XtraCharts.RadarLineSeriesView.Closed',
            'Show Group Headers': 'DevExpress.XtraCharts.CrosshairOptions.ShowGroupHeaders',
            'ValueProvider': 'DevExpress.XtraCharts.RangeColorizer.ValueProvider',
            'Month and Day': 'DevExpress.XtraCharts.DateTimeFormat.MonthAndDay',
            'Crosshair Label Pattern': 'DevExpress.XtraCharts.SeriesBase.CrosshairLabelPattern',
            'Continuous': 'DevExpress.XtraCharts.ScaleMode.Continuous',
            'Date Time Values': 'DevExpress.XtraCharts.SeriesPoint.DateTimeValues',
            'Link Type': 'DevExpress.XtraCharts.TaskLink.LinkType',
            'Inner Indents': 'DevExpress.XtraCharts.FreePosition.InnerIndents',
            'Date Time Options': 'DevExpress.XtraCharts.AxisBase.DateTimeOptions',
            'Tool Tip Hint': 'DevExpress.XtraCharts.SeriesPoint.ToolTipHint',
            'Max Value Marker Visibility': 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarkerVisibility',
            'Friday': 'DevExpress.XtraCharts.Weekday.Friday',
            'Argument Numeric Options': 'DevExpress.XtraCharts.PointOptions.ArgumentNumericOptions',
            'Workdays': 'DevExpress.XtraCharts.WorkdaysOptions.Workdays',
            'Allow Rotate': 'DevExpress.XtraCharts.AxisLabelResolveOverlappingOptions.AllowRotate',
            'Number': 'DevExpress.XtraCharts.NumericFormat.Number',
            'Bottom To Top': 'DevExpress.XtraCharts.TextOrientation.BottomToTop',
            'Value2 Label': 'DevExpress.XtraCharts.RangeAreaLabelKind.Value2Label',
            'Process Missing Points': 'DevExpress.XtraCharts.ScaleOptionsBase.ProcessMissingPoints',
            'Arrow Height': 'DevExpress.XtraCharts.TaskLinkOptions.ArrowHeight',
            'Show Behind': 'DevExpress.XtraCharts.ConstantLine.ShowBehind',
            'Value Scale Type': 'DevExpress.XtraCharts.SeriesBase.ValueScaleType',
            'Value1 Label': 'DevExpress.XtraCharts.RangeAreaLabelKind.Value1Label',
            'Custom Items': 'DevExpress.XtraCharts.Legend.CustomItems',
            'RangeControlNumericGridOptions': 'DevExpress.XtraCharts.XYDiagram2D.RangeControlNumericGridOptions',
            'Connector Length': 'DevExpress.XtraCharts.RelativePosition.ConnectorLength',
            'AxisX Coordinate': 'DevExpress.XtraCharts.PaneAnchorPoint.AxisXCoordinate',
            'Text Orientation': 'DevExpress.XtraCharts.SeriesLabelBase.TextOrientation',
            'Text Offset': 'DevExpress.XtraCharts.Legend.TextOffset',
            'Interlaced': 'DevExpress.XtraCharts.AxisBase.Interlaced',
            'Perspective Enabled': 'DevExpress.XtraCharts.Diagram3D.PerspectiveEnabled',
            'Points Count': 'DevExpress.XtraCharts.SubsetBasedIndicator.PointsCount',
            'Pentagon': 'DevExpress.XtraCharts.MarkerKind.Pentagon',
            'Runtime Scrolling': 'DevExpress.XtraCharts.Diagram3D.RuntimeScrolling',
            'Hexagon': 'DevExpress.XtraCharts.MarkerKind.Hexagon',
            'Value to Display': 'DevExpress.XtraCharts.BubbleSeriesLabel.ValueToDisplay',
            'Marker Image Size Mode': 'DevExpress.XtraCharts.CustomLegendItem.MarkerImageSizeMode',
            'Minor Line Style': 'DevExpress.XtraCharts.GridLines.MinorLineStyle',
            'Point Marker Options': 'DevExpress.XtraCharts.PointSeriesView.PointMarkerOptions',
            'Runtime Exploding': 'DevExpress.XtraCharts.PieSeriesView.RuntimeExploding',
            'Min Value Marker Visibility': 'DevExpress.XtraCharts.RangeBarSeriesView.MinValueMarkerVisibility',
            'Envelope': 'DevExpress.XtraCharts.MovingAverageKind.Envelope',
            'Waved': 'DevExpress.XtraCharts.ScaleBreakStyle.Waved',
            'Insert Empty Points': 'DevExpress.XtraCharts.ProcessMissingPointsMode.InsertEmptyPoints',
            'Item Visibility Mode': 'DevExpress.XtraCharts.Legend.ItemVisibilityMode',
            'Use Filters': 'DevExpress.XtraCharts.PieExplodeMode.UseFilters',
            'Arrow Width': 'DevExpress.XtraCharts.TaskLinkOptions.ArrowWidth',
            'Data Type': 'DevExpress.XtraCharts.DataFilter.DataType',
            'Logarithmic Base': 'DevExpress.XtraCharts.AxisBase.LogarithmicBase',
            'Explode Mode': 'DevExpress.XtraCharts.PieSeriesViewBase.ExplodeMode',
            'Line Length': 'DevExpress.XtraCharts.SeriesLabelBase.LineLength',
            'Single Page Only': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.SinglePageOnly',
            'Equal': 'DevExpress.XtraCharts.DataFilterCondition.Equal',
            'Use Angles': 'DevExpress.XtraCharts.RotationType.UseAngles',
            'Use Size In Pixels': 'DevExpress.XtraCharts.PaneSizeMode.UseSizeInPixels',
            'LabelFormatProvider': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.LabelFormatProvider',
            'To Center Vertical': 'DevExpress.XtraCharts.RectangleGradientMode.ToCenterVertical',
            'Pattern': 'DevExpress.XtraCharts.CrosshairAxisLabelOptions.Pattern',
            'Monday': 'DevExpress.XtraCharts.Weekday.Monday',
            'RangeControlDateTimeGridOptions': 'DevExpress.XtraCharts.XYDiagram2D.RangeControlDateTimeGridOptions',
            'LabelFormat': 'DevExpress.XtraCharts.ChartRangeControlClientGridOptions.LabelFormat',
            'Allow Hide': 'DevExpress.XtraCharts.AxisLabelResolveOverlappingOptions.AllowHide',
            'Moving Average': 'DevExpress.XtraCharts.MovingAverageKind.MovingAverage',
            'PaletteName': 'DevExpress.XtraCharts.PaletteColorizerBase.PaletteName',
            'Less Than': 'DevExpress.XtraCharts.DataFilterCondition.LessThan',
            'Snap Mode': 'DevExpress.XtraCharts.CrosshairOptions.SnapMode',
            'Cross': 'DevExpress.XtraCharts.MarkerKind.Cross',
            'Justify Around Point': 'DevExpress.XtraCharts.ResolveOverlappingMode.JustifyAroundPoint',
            'Axis X Max Zoom Percent': 'DevExpress.XtraCharts.ZoomingOptions2D.AxisXMaxZoomPercent',
            'Value As Percent': 'DevExpress.XtraCharts.PercentOptions.ValueAsPercent',
            'Offset X': 'DevExpress.XtraCharts.ToolTipPositionWithOffset.OffsetX',
            'Offset Y': 'DevExpress.XtraCharts.ToolTipPositionWithOffset.OffsetY',
            'Grid Spacing Auto': 'DevExpress.XtraCharts.AxisBase.GridSpacingAuto',
            'Series Point': 'DevExpress.XtraCharts.SeriesPointAnchorPoint.SeriesPoint',
            'Measure Unit': 'DevExpress.XtraCharts.NumericScaleOptions.MeasureUnit',
            'Line Join': 'DevExpress.XtraCharts.LineStyle.LineJoin',
            'Point 2': 'DevExpress.XtraCharts.FinancialIndicator.Point2',
            'Point 1': 'DevExpress.XtraCharts.FinancialIndicator.Point1',
            'Series Points Sorting': 'DevExpress.XtraCharts.SeriesBase.SeriesPointsSorting',
            'Greater Than Or Equal': 'DevExpress.XtraCharts.DataFilterCondition.GreaterThanOrEqual',
            'Grid Spacing': 'DevExpress.XtraCharts.ScaleOptionsBase.GridSpacing',
            'Visibility In Panes': 'DevExpress.XtraCharts.Axis2D.VisibilityInPanes',
            'Financial': 'DevExpress.XtraCharts.AggregateFunction.Financial',
            'Rectangle': 'DevExpress.XtraCharts.ShapeKind.Rectangle',
            'Work Days Options': 'DevExpress.XtraCharts.AxisBase.WorkdaysOptions',
            'Ellipse': 'DevExpress.XtraCharts.ShapeKind.Ellipse',
            'Greater Than': 'DevExpress.XtraCharts.DataFilterCondition.GreaterThan',
            'Sunday': 'DevExpress.XtraCharts.Weekday.Sunday',
            'Rotation Direction': 'DevExpress.XtraCharts.RadarDiagram.RotationDirection',
            'Show in a Legend': 'DevExpress.XtraCharts.SeriesBase.ShowInLegend',
            'Star Point Count': 'DevExpress.XtraCharts.BaseMarker.StarPointCount',
            'Is Empty': 'DevExpress.XtraCharts.SeriesPoint.IsEmpty',
            'Series Distance Fixed': 'DevExpress.XtraCharts.XYDiagram3D.SeriesDistanceFixed',
            'Level Line Length': 'DevExpress.XtraCharts.FinancialSeriesViewBase.LevelLineLength',
            'Interlaced Color': 'DevExpress.XtraCharts.AxisBase.InterlacedColor',
            'Rounded Rectangle': 'DevExpress.XtraCharts.ShapeKind.RoundedRectangle',
            'Max Vertical Percentage': 'DevExpress.XtraCharts.Legend.MaxVerticalPercentage',
            'Retrieve Row Grand Totals': 'DevExpress.XtraCharts.PivotGridDataSourceOptions.RetrieveRowGrandTotals',
            'Left Bottom': 'DevExpress.XtraCharts.DockCorner.LeftBottom',
            'Wednesday': 'DevExpress.XtraCharts.Weekday.Wednesday',
            'X Axis Scroll Bar Alignment': 'DevExpress.XtraCharts.ScrollBarOptions.XAxisScrollBarAlignment',
            'Grid Lines': 'DevExpress.XtraCharts.AxisBase.GridLines',
            'ScaleMode': 'DevExpress.XtraCharts.ScaleOptionsBase.ScaleMode',
            'Cross Axis': 'DevExpress.XtraCharts.TickmarksBase.CrossAxis',
            'Max Value Marker': 'DevExpress.XtraCharts.RangeBarSeriesView.MaxValueMarker',
            'To Center Horizontal': 'DevExpress.XtraCharts.RectangleGradientMode.ToCenterHorizontal',
            'Japanese Envelope Chou Number 4': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeChouNumber4',
            'Japanese Envelope Chou Number 3': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeChouNumber3',
            'Expanded Stacked': 'DevExpress.XtraPrinting.BarCode.DataBarType.ExpandedStacked',
            'TimeSpan': 'DevExpress.XtraReports.UI.FieldType.TimeSpan',
            'Charset A': 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetA',
            'Charset B': 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetB',
            'Charset C': 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetC',
            'Use the system default rendering': 'DevExpress.XtraPrinting.TextRenderingMode.SystemDefault',
            'Prc Envelope Number 8 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber8Rotated',
            'Forward Diagonal': 'DevExpress.XtraPrinting.Drawing.DirectionMode.ForwardDiagonal',
            'Center Image': 'DevExpress.XtraPrinting.ImageSizeMode.CenterImage',
            'FNC1 Functional Character': 'DevExpress.XtraPrinting.BarCode.DataMatrixGS1Generator.FNC1Substitute',
            'BCC': 'DevExpress.XtraPrinting.RecipientFieldType.BCC',
            'Expanded': 'DevExpress.XtraPrinting.BarCode.DataBarType.Expanded',
            'Rasterize Images': 'DevExpress.XtraPrinting.XlsExportOptions.RasterizeImages',
            'HTML': 'ASPxReportsStringId.ExportName_html',
            'Allow URLs with JS Content': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.AllowURLsWithJSContent',
            'Remove Old Columns': 'DevExpress.Utils.OptionsColumnLayout.RemoveOldColumns',
            'Executive': 'System.Drawing.Printing.PaperKind.Executive',
            'Italy Envelope': 'System.Drawing.Printing.PaperKind.ItalyEnvelope',
            'Legal Extra': 'System.Drawing.Printing.PaperKind.LegalExtra',
            'Export Mode': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportMode',
            'Human-Readable Text': 'DevExpress.XtraPrinting.BarCode.EAN128Generator.HumanReadableText',
            'Prc Envelope Number 1 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber1Rotated',
            'Zoom Image': 'DevExpress.XtraPrinting.ImageSizeMode.ZoomImage',
            'Stop Page Building': 'DevExpress.XtraPrinting.PrintingSystemCommand.StopPageBuilding',
            'JIS B4 Rotated ': 'System.Drawing.Printing.PaperKind.B4JisRotated',
            'String': 'DevExpress.XtraTreeList.Data.UnboundColumnType.String',
            'Category': 'DevExpress.XtraPrinting.XlDocumentOptions.Category',
            'Different Files': 'DevExpress.XtraPrinting.XlsxExportMode.DifferentFiles',
            'Attachments': 'DevExpress.XtraPrinting.PdfExportOptions.Attachments',
            'Application': 'DevExpress.XtraPrinting.PdfDocumentOptions.Application',
            'RTF Export Options': 'DevExpress.XtraPrinting.RtfExportOptions',
            'Standard 15x11': 'System.Drawing.Printing.PaperKind.Standard15x11',
            'Standard 12x11': 'System.Drawing.Printing.PaperKind.Standard12x11',
            'Standard 10x14': 'System.Drawing.Printing.PaperKind.Standard10x14',
            'Standard 10x11': 'System.Drawing.Printing.PaperKind.Standard10x11',
            'Standard 11x17': 'System.Drawing.Printing.PaperKind.Standard11x17',
            'Zoom to Page Width': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToPageWidth',
            'US Standard Fanfold': 'System.Drawing.Printing.PaperKind.USStandardFanfold',
            'Dash-Dot-Dot': 'DevExpress.XtraPrinting.BorderDashStyle.DashDotDot',
            '8 x 32': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix8x32',
            '8 x 18': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix8x18',
            'Prc 32K Big Rotated': 'System.Drawing.Printing.PaperKind.Prc32KBigRotated',
            'Use Margins': 'DevExpress.XtraPrinting.PrinterSettingsUsing.UseMargins',
            'PDF/A-2b': 'DevExpress.XtraPrinting.PdfExportOptions.PdfACompatible',
            'Letter Small': 'System.Drawing.Printing.PaperKind.LetterSmall',
            'Indeterminate': 'DevExpress.Snap.Extensions.Native.ActionLists.SnapCheckState.Indeterminate',
            'Prc 16K Rotated': 'System.Drawing.Printing.PaperKind.Prc16KRotated',
            'Convert Images to Jpeg': 'DevExpress.XtraPrinting.PdfExportOptions.ConvertImagesToJpeg',
            'Letter Extra': 'System.Drawing.Printing.PaperKind.LetterExtra',
            'Tip\'s Length': 'DevExpress.XtraPrinting.Shape.ShapeBracket.TipLength',
            'Trellis': 'System.Drawing.Drawing2D.HatchStyle.Trellis',
            'PDF Export Options': 'DevExpress.XtraPrinting.PdfExportOptions',
            'Y to X Ratio': 'DevExpress.XtraPrinting.BarCode.PDF417Generator.YToXRatio',
            'Thumbnails': 'DevExpress.XtraPrinting.PrintingSystemCommand.Thumbnails',
            'Wide Upward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.WideUpwardDiagonal',
            'Use ClearType glyph bitmaps and hinting': 'DevExpress.XtraPrinting.TextRenderingMode.ClearTypeGridFit',
            'Fillet': 'DevExpress.XtraPrinting.Shape.ShapeBrace.Fillet',
            'Character Set': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.CharacterSet',
            'Middle Right': 'DevExpress.XtraPrinting.TextAlignment.MiddleRight',
            'Right To Left Document': 'DevExpress.XtraPrinting.XlExportOptionsBase.RightToLeftDocument',
            'Wave': 'System.Drawing.Drawing2D.HatchStyle.Wave',
            'Use Native Format': 'DevExpress.XtraPrinting.XlsExportOptions.UseNativeFormat',
            'Scroll Page Down': 'DevExpress.XtraPrinting.PrintingSystemCommand.ScrollPageDown',
            'Percent 90': 'System.Drawing.Drawing2D.HatchStyle.Percent90',
            'Percent 80': 'System.Drawing.Drawing2D.HatchStyle.Percent80',
            'Percent 50': 'System.Drawing.Drawing2D.HatchStyle.Percent50',
            'Percent 40': 'System.Drawing.Drawing2D.HatchStyle.Percent40',
            'Percent 70': 'System.Drawing.Drawing2D.HatchStyle.Percent70',
            'Percent 75': 'System.Drawing.Drawing2D.HatchStyle.Percent75',
            'Percent 60': 'System.Drawing.Drawing2D.HatchStyle.Percent60',
            'Percent 10': 'System.Drawing.Drawing2D.HatchStyle.Percent10',
            'Percent 05': 'System.Drawing.Drawing2D.HatchStyle.Percent05',
            'Percent 30': 'System.Drawing.Drawing2D.HatchStyle.Percent30',
            'Percent 25': 'System.Drawing.Drawing2D.HatchStyle.Percent25',
            'Percent 20': 'System.Drawing.Drawing2D.HatchStyle.Percent20',
            'Japanese Envelope Kaku Number 3': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeKakuNumber3',
            'Japanese Envelope Kaku Number 2': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeKakuNumber2',
            'Separator': 'DevExpress.XtraPrinting.TextExportOptionsBase.Separator',
            'Page Range': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageRange',
            'Show Grid Lines': 'DevExpress.XtraPrinting.XlsExportOptions.ShowGridLines',
            'XLS Export Options': 'DevExpress.XtraPrinting.XlsExportOptions',
            'Keep Row Height': 'DevExpress.XtraPrinting.RtfExportOptions.KeepRowHeight',
            'Close Preview': 'DevExpress.XtraPrinting.PrintingSystemCommand.ClosePreview',
            'Image Export Options': 'DevExpress.XtraPrinting.ImageExportOptions',
            'B5 Envelope': 'System.Drawing.Printing.PaperKind.B5Envelope',
            'Japanese Postcard Rotated': 'System.Drawing.Printing.PaperKind.JapanesePostcardRotated',
            'Author': 'DevExpress.XtraPrinting.XlDocumentOptions.Author',
            'Dotted Grid': 'System.Drawing.Drawing2D.HatchStyle.DottedGrid',
            'Large Checker Board': 'System.Drawing.Drawing2D.HatchStyle.LargeCheckerBoard',
            'Save Mode': 'DevExpress.XtraPrinting.PrintPreviewOptions.SaveMode',
            'Double': 'DevExpress.XtraReports.UI.FieldType.Double',
            'Single File': 'DevExpress.XtraPrinting.XlsxExportMode.SingleFile',
            'Show Prev Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ShowPrevPage',
            'Fit To Printed Page Width': 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageWidth',
            'Modulo 10': 'DevExpress.XtraPrinting.BarCode.MSICheckSum.Modulo10',
            'A4 Small': 'System.Drawing.Printing.PaperKind.A4Small',
            'Personal Envelope (6 3/4)': 'System.Drawing.Printing.PaperKind.PersonalEnvelope',
            'WinLoss': 'DevExpress.Sparkline.SparklineViewType.WinLoss',
            'Zoom In': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomIn',
            'Integer': 'DevExpress.Data.UnboundColumnType.Integer',
            'A4 Extra': 'System.Drawing.Printing.PaperKind.A4Extra',
            'Stacked Omnidirectional': 'DevExpress.XtraPrinting.BarCode.DataBarType.StackedOmnidirectional',
            'HTML Export Options': 'DevExpress.XtraPrinting.HtmlExportOptions',
            'Alpha Numeric': 'DevExpress.XtraPrinting.BarCode.QRCodeCompactionMode.AlphaNumeric',
            'A5 Extra': 'System.Drawing.Printing.PaperKind.A5Extra',
            'Dark Downward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.DarkDownwardDiagonal',
            'EnableCopying': 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableCopying',
            'Backward Diagonal': 'DevExpress.XtraPrinting.Drawing.DirectionMode.BackwardDiagonal',
            'Hand Tool': 'DevExpress.XtraPrinting.PrintingSystemCommand.HandTool',
            'Binary': 'DevExpress.XtraPrinting.BarCode.PDF417CompactionMode.Binary',
            'Show Last Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ShowLastPage',
            'Large Confetti': 'System.Drawing.Drawing2D.HatchStyle.LargeConfetti',
            'Store All Options': 'DevExpress.Utils.OptionsColumnLayout.StoreAllOptions',
            'B4 Envelope': 'System.Drawing.Printing.PaperKind.B4Envelope',
            'Compaction Mode': 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.CompactionMode',
            'Version': 'DevExpress.XtraPrinting.XpsDocumentOptions.Version',
            'Security Options': 'DevExpress.XtraPrinting.PdfExportOptions.PasswordSecurityOptions',
            'Using a Save File Dialog': 'DevExpress.XtraPrinting.SaveMode.UsingSaveFileDialog',
            'Version 40 (177x177)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version40',
            'Version 26 (121x121)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version26',
            'Version 27 (125x125)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version27',
            'Version 24 (113x113)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version24',
            'Version 25 (117x117)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version25',
            'Version 22 (105x105)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version22',
            'Version 23 (109x109)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version23',
            'Version 20 (97x97)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version20',
            'Version 21 (101x101)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version21',
            'Version 28 (129x129)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version28',
            'Version 29 (133x133)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version29',
            'Version 15 (77x77)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version15',
            'Version 14 (73x73)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version14',
            'Version 17 (85x85)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version17',
            'Version 16 (81x81)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version16',
            'Version 11 (61x61)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version11',
            'Version 10 (57x57)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version10',
            'Version 13 (69x69)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version13',
            'Version 12 (65x65)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version12',
            'Version 19 (93x93)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version19',
            'Version 18 (89x89)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version18',
            'Version 37 (165x165)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version37',
            'Version 36 (161x161)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version36',
            'Version 35 (157x157)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version35',
            'Version 34 (153x153)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version34',
            'Version 33 (149x149)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version33',
            'Version 32 (145x145)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version32',
            'Version 31 (141x141)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version31',
            'Version 30 (137x137)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version30',
            'Version 39 (173x173)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version39',
            'Version 38 (169x169)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version38',
            'Bound': 'DevExpress.Data.UnboundColumnType.Bound',
            'Tail\'s Length': 'DevExpress.XtraPrinting.Shape.ShapeBrace.TailLength',
            'Strikeout': 'System.Drawing.Font.Strikeout',
            'Save': 'ASPxReportsStringId.ReportDesigner_MenuButtons_Save',
            'Copy': 'DevExpress.XtraPrinting.PrintingSystemCommand.Copy',
            'File': 'DevExpress.XtraPrinting.PrintingSystemCommand.File',
            'Find': 'DevExpress.XtraPrinting.PrintingSystemCommand.Find',
            'User Name': 'DevExpress.XtraPrinting.PageInfo.UserName',
            'Standard 9x11': 'System.Drawing.Printing.PaperKind.Standard9x11',
            'Subject': 'DevExpress.XtraPrinting.XlDocumentOptions.Subject',
            'Using Printer Settings': 'DevExpress.XtraPrinting.PrinterSettingsUsing',
            'A5 Transverse': 'System.Drawing.Printing.PaperKind.A5Transverse',
            'Top Justify': 'DevExpress.XtraPrinting.TextAlignment.TopJustify',
            'Top Center': 'System.Drawing.ContentAlignment.TopCenter',
            'Matrix Size': 'DevExpress.XtraPrinting.BarCode.DataMatrixGenerator.MatrixSize',
            'Smart': 'DevExpress.XtraPrinting.VerticalContentSplitting.Smart',
            'Send File': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendFile',
            'A3 Extra': 'System.Drawing.Printing.PaperKind.A3Extra',
            'Send as XLSX': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendXlsx',
            'Exact': 'DevExpress.XtraPrinting.VerticalContentSplitting.Exact',
            'Export Watermarks': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.ExportWatermarks',
            'Dark Vertical': 'System.Drawing.Drawing2D.HatchStyle.DarkVertical',
            'Number Stored As Text': 'DevExpress.XtraPrinting.XlIgnoreErrors.NumberStoredAsText',
            'Slant': 'DevExpress.XtraReports.UI.LineDirection.Slant',
            'Top Left': 'System.Drawing.ContentAlignment.TopLeft',
            'Underline': 'System.Drawing.Font.Underline',
            'Light Vertical': 'System.Drawing.Drawing2D.HatchStyle.LightVertical',
            'Use antialiased glyph bitmaps without hinting': 'DevExpress.XtraPrinting.TextRenderingMode.AntiAlias',
            'Image Tiling': 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTiling',
            'Start and Stop Symbols': 'DevExpress.XtraPrinting.BarCode.CodabarGenerator.StartStopPair',
            'Never Embedded Fonts': 'DevExpress.XtraPrinting.PdfExportOptions.NeverEmbeddedFonts',
            'Pointer': 'DevExpress.XtraPrinting.PrintingSystemCommand.Pointer',
            'Dark Upward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.DarkUpwardDiagonal',
            'Prc Envelope Number 6 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber6Rotated',
            'Zoom Out': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomOut',
            'Export as Image': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportGraphic',
            'Prc Envelope Number 10': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber10',
            'Middle Center': 'DevExpress.XtraPrinting.TextAlignment.MiddleCenter',
            'Document Options': 'DevExpress.XtraPrinting.XlsExportOptions.DocumentOptions',
            'A3 Transverse': 'System.Drawing.Printing.PaperKind.A3Transverse',
            'JIS B5 Transverse': 'System.Drawing.Printing.PaperKind.B5Transverse',
            'X12': 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.X12',
            'C40': 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.C40',
            'Body': 'DevExpress.XtraPrinting.EmailOptions.Body',
            'Invite Envelope': 'System.Drawing.Printing.PaperKind.InviteEnvelope',
            'Number of Sides': 'DevExpress.XtraPrinting.Shape.ShapePolygon.NumberOfSides',
            'Paper Size': 'DevExpress.XtraPrinting.PrintingSystemCommand.PaperSize',
            'High Resolution': 'DevExpress.XtraPrinting.PrintingPermissions.HighResolution',
            'Send as Image': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendGraphic',
            'Retain Background Transparency': 'DevExpress.XtraPrinting.ImageExportOptions.RetainBackgroundTransparency',
            'OpenPassword': 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.OpenPassword',
            'Customize': 'DevExpress.XtraPrinting.PrintingSystemCommand.Customize',
            'Middle Justify': 'DevExpress.XtraPrinting.TextAlignment.MiddleJustify',
            'Scroll Page Up': 'DevExpress.XtraPrinting.PrintingSystemCommand.ScrollPageUp',
            'Prc Envelope Number 9 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber9Rotated',
            'A6': 'System.Drawing.Printing.PaperKind.A6',
            'A4': 'System.Drawing.Printing.PaperKind.A4',
            'A5': 'System.Drawing.Printing.PaperKind.A5',
            'A2': 'System.Drawing.Printing.PaperKind.A2',
            'A3': 'System.Drawing.Printing.PaperKind.A3',
            'B5': 'System.Drawing.Printing.PaperKind.B5',
            'B4': 'System.Drawing.Printing.PaperKind.B4',
            'Suppress 65536 Rows Warning': 'DevExpress.XtraPrinting.XlsExportOptions.Suppress65536RowsWarning',
            'Round': 'System.Drawing.Drawing2D.LineJoin.Round',
            'Pixel Format': 'System.Drawing.Image.PixelFormat',
            'Int32': 'DevExpress.XtraReports.UI.FieldType.Int32',
            'Int16': 'DevExpress.XtraReports.UI.FieldType.Int16',
            'Monarch Envelope': 'System.Drawing.Printing.PaperKind.MonarchEnvelope',
            'Float': 'DevExpress.XtraReports.UI.FieldType.Float',
            'Bevel': 'System.Drawing.Drawing2D.LineJoin.Bevel',
            'Miter': 'System.Drawing.Drawing2D.LineJoin.Miter',
            'Omnidirectional': 'DevExpress.XtraPrinting.BarCode.DataBarType.Omnidirectional',
            'C3 Envelope': 'System.Drawing.Printing.PaperKind.C3Envelope',
            'Large Grid': 'System.Drawing.Drawing2D.HatchStyle.LargeGrid',
            '144 x 144': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix144x144',
            'Ignore Errors': 'DevExpress.XtraPrinting.XlExportOptionsBase.IgnoreErrors',
            'Dashed Horizontal': 'System.Drawing.Drawing2D.HatchStyle.DashedHorizontal',
            'Auto-Size': 'DevExpress.XtraPrinting.ImageSizeMode.AutoSize',
            '120 x 120': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix120x120',
            'Inserting Deleting Rotating': 'DevExpress.XtraPrinting.ChangingPermissions.InsertingDeletingRotating',
            'Skip Empty Rows': 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyRows',
            'Dashed Vertical': 'System.Drawing.Drawing2D.HatchStyle.DashedVertical',
            'Japanese Postcard': 'System.Drawing.Printing.PaperKind.JapanesePostcard',
            'Boolean': 'DevExpress.XtraReports.UI.FieldType.Boolean',
            'Page Border Color': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderColor',
            'C6 Envelope': 'System.Drawing.Printing.PaperKind.C6Envelope',
            'Page Count': 'DevExpress.XtraPrinting.PageInfo.Total',
            'Page Border Width': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.PageBorderWidth',
            '104 x 104': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix104x104',
            'Number 12 Envelope': 'System.Drawing.Printing.PaperKind.Number12Envelope',
            'A3 Extra Transverse': 'System.Drawing.Printing.PaperKind.A3ExtraTransverse',
            'A5 Rotated': 'System.Drawing.Printing.PaperKind.A5Rotated',
            '132 x 132': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix132x132',
            'Small Checker Board': 'System.Drawing.Drawing2D.HatchStyle.SmallCheckerBoard',
            'Export as XLSX': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportXlsx',
            'Export File': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportFile',
            'Additional Recipients': 'DevExpress.XtraPrinting.EmailOptions.AdditionalRecipients',
            'MHT Export Options': 'DevExpress.XtraPrinting.MhtExportOptions',
            'Add Leading Zero': 'DevExpress.XtraPrinting.BarCode.Code128Generator.AddLeadingZero',
            'Legal': 'System.Drawing.Printing.PaperKind.Legal',
            'Iso B4': 'System.Drawing.Printing.PaperKind.IsoB4',
            'Folio': 'System.Drawing.Printing.PaperKind.Folio',
            'JIS B6': 'System.Drawing.Printing.PaperKind.B6Jis',
            'SuperB/SuperB/A3': 'System.Drawing.Printing.PaperKind.BPlus',
            'SuperA/SuperA/A4': 'System.Drawing.Printing.PaperKind.APlus',
            'Truncated': 'DevExpress.XtraPrinting.BarCode.DataBarType.Truncated',
            'Dark Horizontal': 'System.Drawing.Drawing2D.HatchStyle.DarkHorizontal',
            'Image Quality': 'DevExpress.XtraPrinting.PdfExportOptions.ImageQuality',
            'Show Next Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ShowNextPage',
            'Single File (Page-by-Page)': 'DevExpress.XtraPrinting.XlsExportMode.SingleFilePageByPage',
            'Prc Envelope Number 4 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber4Rotated',
            'Middle Left': 'DevExpress.XtraPrinting.TextAlignment.MiddleLeft',
            'PDF Document Options': 'DevExpress.XtraPrinting.PdfDocumentOptions',
            'Sheet Name': 'DevExpress.XtraPrinting.XlsExportOptions.SheetName',
            'Version 4 (33x33)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version4',
            'Version 5 (37x37)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version5',
            'Version 6 (41x41)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version6',
            'Version 7 (45x45)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version7',
            'Version 1 (21x21)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version1',
            'Version 2 (25x25)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version2',
            'Version 3 (29x29)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version3',
            'Version 8 (49x49)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version8',
            'Version 9 (53x53)': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.Version9',
            'Page Layout Continuous': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageLayoutContinuous',
            'Using a Default Path': 'DevExpress.XtraPrinting.SaveMode.UsingDefaultPath',
            'Wide Narrow Ratio': 'DevExpress.XtraPrinting.BarCode.Interleaved2of5Generator.WideNarrowRatio',
            'Keep Size': 'DevExpress.Snap.Core.Fields.UpdateMergeImageFieldMode.KeepSize',
            'CSV Export Options': 'DevExpress.XtraPrinting.CsvExportOptions',
            'Horizontal Brick': 'System.Drawing.Drawing2D.HatchStyle.HorizontalBrick',
            'MiterClipped': 'System.Drawing.Drawing2D.LineJoin.MiterClipped',
            'All Pages': 'DevExpress.XtraReports.UI.PrintOnPages.AllPages',
            'Outlined Diamond': 'System.Drawing.Drawing2D.HatchStyle.OutlinedDiamond',
            'Ignore 256 Columns Limit': 'DevExpress.XtraPrinting.XlsExportOptions.Ignore256ColumnsLimit',
            'Skip Empty Columns': 'DevExpress.XtraPrinting.CsvExportOptions.SkipEmptyColumns',
            'Top Right': 'System.Drawing.ContentAlignment.TopRight',
            'Letter Plus': 'System.Drawing.Printing.PaperKind.LetterPlus',
            'Description': 'DevExpress.XtraPrinting.XpsDocumentOptions.Description',
            'Recipient Name': 'DevExpress.XtraPrinting.EmailOptions.RecipientName',
            'Zoom to Two Pages': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToTwoPages',
            'Horizontal Line Width': 'DevExpress.XtraPrinting.Shape.ShapeCross.HorizontalLineWidth',
            'Use antialiased glyph bitmaps and hinting': 'DevExpress.XtraPrinting.TextRenderingMode.AntiAliasGridFit',
            'PermissionsOptions': 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PermissionsOptions',
            'Ledger': 'System.Drawing.Printing.PaperKind.Ledger',
            'Letter': 'System.Drawing.Printing.PaperKind.Letter',
            'Japanese Envelope Chou Number 4 Rotated': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeChouNumber4Rotated',
            'Text Export Options': 'DevExpress.XtraPrinting.TextExportOptions',
            'Error Correction Level': 'DevExpress.XtraPrinting.BarCode.QRCodeGenerator.ErrorCorrectionLevel',
            'Vertical Line Width': 'DevExpress.XtraPrinting.Shape.ShapeCross.VerticalLineWidth',
            'Number 11 Envelope': 'System.Drawing.Printing.PaperKind.Number11Envelope',
            'Statement': 'System.Drawing.Printing.PaperKind.Statement',
            'Bottom Center': 'System.Drawing.ContentAlignment.BottomCenter',
            'Bar': 'DevExpress.Sparkline.SparklineViewType.Bar',
            'Use glyph bitmaps without hinting': 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixel',
            'Keywords': 'DevExpress.XtraPrinting.XpsDocumentOptions.Keywords',
            'Bottom Right': 'DevExpress.XtraPrinting.ImageAlignment.BottomRight',
            'Action After Export': 'DevExpress.XtraPrinting.PrintPreviewOptions.ActionAfterExport',
            'Signature Options': 'DevExpress.XtraPrinting.PdfExportOptions.SignatureOptions',
            'Continued': 'DevExpress.Snap.Core.Fields.GroupIndexMode.Continued',
            'ISO B5 Extra': 'System.Drawing.Printing.PaperKind.B5Extra',
            'Horizontal Resolution': 'System.Drawing.Image.HorizontalResolution',
            'PrintingPermissions': 'DevExpress.XtraPrinting.PdfPermissionsOptions.PrintingPermissions',
            'Use glyph bitmaps and hinting': 'DevExpress.XtraPrinting.TextRenderingMode.SingleBitPerPixelGridFit',
            'Workbook Color Palette Compliance': 'DevExpress.XtraPrinting.XlsExportOptions.WorkbookColorPaletteCompliance',
            'A6 Rotated': 'System.Drawing.Printing.PaperKind.A6Rotated',
            'GDI Vertical Font': 'System.Drawing.Font.GdiVerticalFont',
            'Light Horizontal': 'System.Drawing.Drawing2D.HatchStyle.LightHorizontal',
            'Multiple Pages': 'DevExpress.XtraPrinting.PrintingSystemCommand.MultiplePages',
            'Not with Report Header and Report Footer': 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeaderAndReportFooter',
            'Export as XLS': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportXls',
            'Export as XPS': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportXps',
            'Export as TXT': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportTxt',
            'Export as PDF': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportPdf',
            'Export as RTF': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportRtf',
            'Export as MHT': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportMht',
            'Export as HTML': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportHtm',
            'Export as CSV': 'DevExpress.XtraPrinting.PrintingSystemCommand.ExportCsv',
            'Text Rendering Mode': 'DevExpress.XtraPrinting.ImageExportOptions.TextRenderingMode',
            'Ignore 65536 Rows Limit': 'DevExpress.XtraPrinting.XlsExportOptions.Ignore65536RowsLimit',
            'Weave': 'System.Drawing.Drawing2D.HatchStyle.Weave',
            'XLSx Export Options': 'DevExpress.XtraPrinting.XlsxExportOptions',
            'Japanese Envelope Chou Number 3 Rotated': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeChouNumber3Rotated',
            'Plaid': 'System.Drawing.Drawing2D.HatchStyle.Plaid',
            'JIS B5 Rotated': 'System.Drawing.Printing.PaperKind.B5JisRotated',
            'Store Appearance': 'DevExpress.Utils.OptionsColumnLayout.StoreAppearance',
            'Unit': 'System.Drawing.Font.Unit',
            'Divot': 'System.Drawing.Drawing2D.HatchStyle.Divot',
            'Bold': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Bold',
            'Restarted': 'DevExpress.Snap.Core.Fields.GroupIndexMode.Restarted',
            'Quote Strings with Separators': 'DevExpress.XtraPrinting.TextExportOptionsBase.QuoteStringsWithSeparators',
            'Bottom Left': 'DevExpress.XtraPrinting.TextAlignment.BottomLeft',
            'D Sheet': 'System.Drawing.Printing.PaperKind.DSheet',
            'Submit Parameters': 'DevExpress.XtraPrinting.PrintingSystemCommand.SubmitParameters',
            'Prc Envelope Number 7 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber7Rotated',
            'Raw Format': 'System.Drawing.Image.RawFormat',
            'Current Date and Time': 'DevExpress.XtraPrinting.PageInfo.DateTime',
            'Keep Scale': 'DevExpress.Snap.Core.Fields.UpdateMergeImageFieldMode.KeepScale',
            'C Sheet': 'System.Drawing.Printing.PaperKind.CSheet',
            'Page Orientation': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageOrientation',
            'Rotate to the Right': 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.RotateRight',
            'Small Confetti': 'System.Drawing.Drawing2D.HatchStyle.SmallConfetti',
            'Tabloid Extra': 'System.Drawing.Printing.PaperKind.TabloidExtra',
            'E Sheet': 'System.Drawing.Printing.PaperKind.ESheet',
            'Page Setup': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageSetup',
            'A4 Plus': 'System.Drawing.Printing.PaperKind.A4Plus',
            'Japanese Envelope You Number 4': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeYouNumber4',
            'Low Resolution': 'DevExpress.XtraPrinting.PrintingPermissions.LowResolution',
            'Upside Down': 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.UpsideDown',
            'Normal': 'DevExpress.XtraPrinting.ImageSizeMode.Normal',
            'RTF': 'ASPxReportsStringId.ExportName_rtf',
            'MHT': 'ASPxReportsStringId.ExportName_mht',
            'DOC': 'DevExpress.Snap.Extensions.Native.ActionLists.TextFormat.DOC',
            'Encoding': 'DevExpress.XtraPrinting.TextExportOptionsBase.Encoding',
            'Wrap': 'DevExpress.Utils.WordWrap.Wrap',
            'Add New Columns': 'DevExpress.Utils.OptionsColumnLayout.AddNewColumns',
            'ASCII': 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.ASCII',
            'C65 Envelope': 'System.Drawing.Printing.PaperKind.C65Envelope',
            'Stretch Image': 'DevExpress.XtraPrinting.ImageSizeMode.StretchImage',
            'Byte': 'DevExpress.XtraPrinting.BarCode.QRCodeCompactionMode.Byte',
            'Type': 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.Type',
            'Company': 'DevExpress.XtraPrinting.XlDocumentOptions.Company',
            'Sphere': 'System.Drawing.Drawing2D.HatchStyle.Sphere',
            'Reduce Palette For Exact Colors': 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.ReducePaletteForExactColors',
            'Suppress 256 Columns Warning': 'DevExpress.XtraPrinting.XlsExportOptions.Suppress256ColumnsWarning',
            'Zoom Track Bar': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomTrackBar',
            'Default Resource File': 'DevExpress.XtraPrinting.PdfExportOptions.DefaultResourceFile',
            'Japanese Double Postcard Rotated': 'System.Drawing.Printing.PaperKind.JapaneseDoublePostcardRotated',
            'Dashed Downward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.DashedDownwardDiagonal',
            'Prc Envelope Number 2 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber2Rotated',
            'Magnifier': 'DevExpress.XtraPrinting.PrintingSystemCommand.Magnifier',
            'PdfPermissionsOptions': 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PdfPermissionsOptions',
            'Number 9 Envelope': 'System.Drawing.Printing.PaperKind.Number9Envelope',
            'Remove Secondary Symbols': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.RemoveSecondarySymbols',
            'Store Layout': 'DevExpress.Utils.OptionsColumnLayout.StoreLayout',
            'A4 Rotated': 'System.Drawing.Printing.PaperKind.A4Rotated',
            'Empty First Page Header/Footer': 'DevExpress.XtraPrinting.RtfExportOptions.EmptyFirstPageHeaderFooter',
            'ChangingPermissions': 'DevExpress.XtraPrinting.PdfPermissionsOptions.ChangingPermissions',
            'C4 Envelope': 'System.Drawing.Printing.PaperKind.C4Envelope',
            'Native Format Options': 'DevExpress.XtraPrinting.NativeFormatOptions',
            'Prc 32K Rotated': 'System.Drawing.Printing.PaperKind.Prc32KRotated',
            'Number 10 Envelope': 'System.Drawing.Printing.PaperKind.Number10Envelope',
            'PermissionsPassword': 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions.PermissionsPassword',
            'Show Options Dialog Before Export': 'DevExpress.XtraPrinting.PrintPreviewOptions.ShowOptionsBeforeExport',
            'Back Slant': 'DevExpress.XtraReports.UI.LineDirection.BackSlant',
            'Japanese Envelope Kaku Number 2 Rotated': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeKakuNumber2Rotated',
            'Ask a User': 'DevExpress.XtraPrinting.ActionAfterExport.AskUser',
            'Light Upward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.LightUpwardDiagonal',
            'Limited': 'DevExpress.XtraPrinting.BarCode.DataBarType.Limited',
            'A4 Transverse': 'System.Drawing.Printing.PaperKind.A4Transverse',
            'Stacked': 'DevExpress.XtraPrinting.BarCode.DataBarType.Stacked',
            'Recipient Address': 'DevExpress.XtraPrinting.EmailOptions.RecipientAddress',
            'Prc Envelope Number 5 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber5Rotated',
            'Small Grid': 'System.Drawing.Drawing2D.HatchStyle.SmallGrid',
            'Hyperlink': 'DevExpress.Snap.Extensions.Native.ActionLists.ContentType.Hyperlink',
            'Japanese Envelope You Number 4 Rotated': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeYouNumber4Rotated',
            'Double Modulo 10': 'DevExpress.XtraPrinting.BarCode.MSICheckSum.DoubleModulo10',
            'View Whole Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ViewWholePage',
            'WordML': 'DevExpress.Snap.Extensions.Native.ActionLists.TextFormat.WordML',
            'Compression': 'DevExpress.XtraPrinting.XpsExportOptions.Compression',
            'Embed Images In HTML': 'DevExpress.XtraPrinting.HtmlExportOptions.EmbedImagesInHTML',
            'German Legal Fanfold': 'System.Drawing.Printing.PaperKind.GermanLegalFanfold',
            'Image View Mode': 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageViewMode',
            'Inline CSS': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.InlineCss',
            'OpenDocument': 'DevExpress.Snap.Extensions.Native.ActionLists.TextFormat.OpenDocument',
            'EnableScreenReaders': 'DevExpress.XtraPrinting.PdfPermissionsOptions.EnableScreenReaders',
            'Print Direct': 'DevExpress.XtraPrinting.PrintingSystemCommand.PrintDirect',
            'Prc 32K': 'System.Drawing.Printing.PaperKind.Prc32K',
            'Prc 16K': 'System.Drawing.Printing.PaperKind.Prc16K',
            'Adjust Colors To Default Palette': 'DevExpress.XtraPrinting.WorkbookColorPaletteCompliance.AdjustColorsToDefaultPalette',
            'Prc Envelope Number 10 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber10Rotated',
            'Quarto': 'System.Drawing.Printing.PaperKind.Quarto',
            'Decimal': 'DevExpress.Data.UnboundColumnType.Decimal',
            'DateTime': 'DevExpress.XtraTreeList.Data.UnboundColumnType.DateTime',
            'Diagonal Cross': 'System.Drawing.Drawing2D.HatchStyle.DiagonalCross',
            'Diagonal Brick': 'System.Drawing.Drawing2D.HatchStyle.DiagonalBrick',
            'Commenting Filling Signing': 'DevExpress.XtraPrinting.ChangingPermissions.CommentingFillingSigning',
            'Use Paper Kind': 'DevExpress.XtraPrinting.PrinterSettingsUsing.UsePaperKind',
            'Dotted Diamond': 'System.Drawing.Drawing2D.HatchStyle.DottedDiamond',
            'Mail Message Export Options': 'DevExpress.XtraPrinting.MailMessageExportOptions',
            'Zig Zag': 'System.Drawing.Drawing2D.HatchStyle.ZigZag',
            'Page Number': 'DevExpress.XtraPrinting.PageInfo.Number',
            'Zoom to Whole Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToWholePage',
            'Use HRef Hyperlinks': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.UseHRefHyperlinks',
            'Guid': 'DevExpress.XtraReports.UI.FieldType.Guid',
            'Count of Star Points': 'DevExpress.XtraPrinting.Shape.ShapeStar.StarPointCount',
            'Page Layout Facing': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageLayoutFacing',
            'Filling Signing': 'DevExpress.XtraPrinting.ChangingPermissions.FillingSigning',
            '80 x 80': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix80x80',
            '88 x 88': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix88x88',
            '96 x 96': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix96x96',
            '64 x 64': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix64x64',
            '72 x 72': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix72x72',
            '48 x 48': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix48x48',
            '40 x 40': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix40x40',
            '44 x 44': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix44x44',
            '52 x 52': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix52x52',
            '26 x 26': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix26x26',
            '24 x 24': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix24x24',
            '22 x 22': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix22x22',
            '20 x 20': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix20x20',
            '36 x 36': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix36x36',
            '32 x 32': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix32x32',
            '16 x 16': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x16',
            '16 x 48': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x48',
            '16 x 36': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix16x36',
            '18 x 18': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix18x18',
            '12 x 26': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x26',
            '12 x 12': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x12',
            '12 x 36': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix12x36',
            '14 x 14': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix14x14',
            '10 x 10': 'DevExpress.XtraPrinting.BarCode.DataMatrixSize.Matrix10x10',
            'Letter Rotated': 'System.Drawing.Printing.PaperKind.LetterRotated',
            'Medium': 'DevExpress.XtraPrinting.PdfJpegImageQuality.Medium',
            'Truncate Symbol': 'DevExpress.XtraPrinting.BarCode.PDF417Generator.TruncateSymbol',
            'Solid Diamond': 'System.Drawing.Drawing2D.HatchStyle.SolidDiamond',
            'Lowest': 'DevExpress.XtraPrinting.PdfJpegImageQuality.Lowest',
            'Text Export Mode': 'DevExpress.XtraPrinting.TextExportOptionsBase.TextExportMode',
            'Physical Dimension': 'System.Drawing.Image.PhysicalDimension',
            'Recipient Address Prefix': 'DevExpress.XtraPrinting.EmailOptions.RecipientAddressPrefix',
            'Light Downward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.LightDownwardDiagonal',
            'Default Send Format': 'DevExpress.XtraPrinting.PrintPreviewOptions.DefaultSendFormat',
            'Creator': 'DevExpress.XtraPrinting.XpsDocumentOptions.Creator',
            'DE': 'DevExpress.XtraPrinting.BarCode.CodabarStartStopPair.DE',
            'AT': 'DevExpress.XtraPrinting.BarCode.CodabarStartStopPair.AT',
            'BN': 'DevExpress.XtraPrinting.BarCode.CodabarStartStopPair.BN',
            'Export Page Breaks': 'DevExpress.XtraPrinting.RtfExportOptions.ExportPageBreaks',
            'Image Transparency': 'DevExpress.XtraPrinting.Drawing.PageWatermark.ImageTransparency',
            'Shingle': 'System.Drawing.Drawing2D.HatchStyle.Shingle',
            'Wide Downward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.WideDownwardDiagonal',
            'Text Transparency': 'DevExpress.XtraPrinting.Drawing.PageWatermark.TextTransparency',
            'Show Print Dialog on Open': 'DevExpress.XtraPrinting.PdfExportOptions.ShowPrintDialogOnOpen',
            'Vertical Resolution': 'System.Drawing.Image.VerticalResolution',
            'Default Export Format': 'DevExpress.XtraPrinting.PrintPreviewOptions.DefaultExportFormat',
            'Narrow Horizontal': 'System.Drawing.Drawing2D.HatchStyle.NarrowHorizontal',
            'Unchecked': 'DevExpress.Snap.Extensions.Native.ActionLists.SnapCheckState.Unchecked',
            'Concavity': 'DevExpress.XtraPrinting.Shape.ShapeStar.Concavity',
            'Edit Page H F': 'DevExpress.XtraPrinting.PrintingSystemCommand.EditPageHF',
            'Excel Document Options': 'DevExpress.XtraPrinting.XlDocumentOptions',
            'A3 Rotated': 'System.Drawing.Printing.PaperKind.A3Rotated',
            'Clip': 'DevExpress.XtraPrinting.Drawing.ImageViewMode.Clip',
            'OpenXML': 'DevExpress.Snap.Extensions.Native.ActionLists.TextFormat.OpenXML',
            'Default Directory': 'DevExpress.XtraPrinting.PrintPreviewOptions.DefaultDirectory',
            'Background': 'DevExpress.XtraPrinting.PrintingSystemCommand.Background',
            'Document Map': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_DocumentMap',
            'C5 Envelope': 'System.Drawing.Printing.PaperKind.C5Envelope',
            'Page Border\'s Color': 'DevExpress.XtraPrinting.ImageExportOptions.PageBorderColor',
            'Compressed': 'DevExpress.XtraPrinting.NativeFormatOptions.Compressed',
            'Comments': 'DevExpress.XtraPrinting.XlDocumentOptions.Comments',
            'Dashed Upward Diagonal': 'System.Drawing.Drawing2D.HatchStyle.DashedUpwardDiagonal',
            'Page Border\'s Width': 'DevExpress.XtraPrinting.ImageExportOptions.PageBorderWidth',
            'Zoom to Text Width': 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToTextWidth',
            'Print Preview Options': 'DevExpress.XtraPrinting.PrintPreviewOptions',
            'Table Layout': 'DevExpress.XtraPrinting.HtmlExportOptionsBase.TableLayout',
            'Squeeze': 'DevExpress.XtraPrinting.ImageSizeMode.Squeeze',
            'CC': 'DevExpress.XtraPrinting.RecipientFieldType.CC',
            'TO': 'DevExpress.XtraPrinting.RecipientFieldType.TO',
            'Any Except Extracting Pages': 'DevExpress.XtraPrinting.ChangingPermissions.AnyExceptExtractingPages',
            'Send as CSV': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendCsv',
            'Send as MHT': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendMht',
            'Send as RTF': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendRtf',
            'Send as TXT': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendTxt',
            'Send as PDF': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendPdf',
            'Send as XPS': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendXps',
            'Send as XLS': 'DevExpress.XtraPrinting.PrintingSystemCommand.SendXls',
            'Auto-Select Version': 'DevExpress.XtraPrinting.BarCode.QRCodeVersion.AutoVersion',
            'Prc Envelope Number 3': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber3',
            'Prc Envelope Number 2': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber2',
            'Prc Envelope Number 1': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber1',
            'Prc Envelope Number 7': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber7',
            'Prc Envelope Number 6': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber6',
            'Prc Envelope Number 5': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber5',
            'Prc Envelope Number 4': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber4',
            'Prc Envelope Number 9': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber9',
            'Prc Envelope Number 8': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber8',
            'XPS Document Options': 'DevExpress.XtraPrinting.XpsDocumentOptions',
            'L': 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.L',
            'M': 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.M',
            'H': 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.H',
            'Q': 'DevExpress.XtraPrinting.BarCode.QRCodeErrorCorrectionLevel.Q',
            'Level 4': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level4',
            'Level 5': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level5',
            'Level 6': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level6',
            'Level 7': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level7',
            'Level 0': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level0',
            'Level 1': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level1',
            'Level 2': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level2',
            'Level 3': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level3',
            'Level 8': 'DevExpress.XtraPrinting.BarCode.ErrorCorrectionLevel.Level8',
            'Number 14 Envelope': 'System.Drawing.Printing.PaperKind.Number14Envelope',
            'Not with Report Header': 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportHeader',
            'Letter Transverse': 'System.Drawing.Printing.PaperKind.LetterTransverse',
            'Pdf Password Security Options': 'DevExpress.XtraPrinting.PdfPasswordSecurityOptions',
            'JIS B6 Rotated': 'System.Drawing.Printing.PaperKind.B6JisRotated',
            'CStar': 'DevExpress.XtraPrinting.BarCode.CodabarStartStopPair.CStar',
            'Japanese Double Postcard': 'System.Drawing.Printing.PaperKind.JapaneseDoublePostcard',
            'Columns': 'DevExpress.XtraPrinting.BarCode.PDF417Generator.Columns',
            'Rasterization resolution': 'DevExpress.XtraPrinting.XlsExportOptions.RasterizationResolution',
            'Segments In Row': 'DevExpress.XtraPrinting.BarCode.DataBarGenerator.SegmentsInRow',
            'Prc Envelope Number 3 Rotated': 'System.Drawing.Printing.PaperKind.PrcEnvelopeNumber3Rotated',
            'B6 Envelope': 'System.Drawing.Printing.PaperKind.B6Envelope',
            'Fill Background': 'DevExpress.XtraPrinting.PrintingSystemCommand.FillBackground',
            'Show Options before Saving': 'DevExpress.XtraPrinting.NativeFormatOptions.ShowOptionsBeforeSave',
            'German Standard Fanfold': 'System.Drawing.Printing.PaperKind.GermanStandardFanfold',
            'Dash-Dot': 'DevExpress.XtraPrinting.BorderDashStyle.DashDot',
            'Italic': 'System.Drawing.Font.Italic',
            'Page Layout': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageLayout',
            'Calculate a Checksum': 'DevExpress.XtraPrinting.BarCode.BarCodeGeneratorBase.CalcCheckSum',
            'Export Hyperlinks': 'DevExpress.XtraPrinting.XlsExportOptions.ExportHyperlinks',
            'Auto Charset': 'DevExpress.XtraPrinting.BarCode.Code128Charset.CharsetAuto',
            'Rotate to the Left': 'DevExpress.XtraPrinting.BarCode.BarCodeOrientation.RotateLeft',
            'Go To Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.GoToPage',
            'MSI Checksum': 'DevExpress.XtraPrinting.BarCode.CodeMSIGenerator.MSICheckSum',
            'Page Number (Roman, Uppercase)': 'DevExpress.XtraPrinting.PageInfo.RomHiNumber',
            '"Current of Total" Page Numbers': 'DevExpress.XtraPrinting.PageInfo.NumberOfTotal',
            'Not with Report Footer': 'DevExpress.XtraReports.UI.PrintOnPages.NotWithReportFooter',
            'Bottom Justify': 'DevExpress.XtraPrinting.TextAlignment.BottomJustify',
            'Plain Text': 'DevExpress.Snap.Extensions.Native.ActionLists.TextFormat.PlainText',
            'Japanese Envelope Kaku Number 3 Rotated': 'System.Drawing.Printing.PaperKind.JapaneseEnvelopeKakuNumber3Rotated',
            'Page Number (Roman, Lowercase)': 'DevExpress.XtraPrinting.PageInfo.RomLowNumber',
            'Print Selection': 'DevExpress.XtraPrinting.PrintingSystemCommand.PrintSelection',
            'Tabloid': 'System.Drawing.Printing.PaperKind.Tabloid',
            'Pdf Permissions Options': 'DevExpress.XtraPrinting.PdfPermissionsOptions',
            'Letter Extra Transverse': 'System.Drawing.Printing.PaperKind.LetterExtraTransverse',
            'Format Type': 'DevExpress.Utils.FormatInfo.FormatType',
            'Rows': 'DevExpress.XtraPrinting.BarCode.PDF417Generator.Rows',
            'E-mail Options': 'DevExpress.XtraPrinting.EmailOptions',
            'Note': 'System.Drawing.Printing.PaperKind.Note',
            'Use Landscape': 'DevExpress.XtraPrinting.PrinterSettingsUsing.UseLandscape',
            'Resolution': 'DevExpress.XtraPrinting.ImageExportOptions.Resolution',
            'Highest': 'DevExpress.XtraPrinting.PdfJpegImageQuality.Highest',
            'DL Envelope': 'System.Drawing.Printing.PaperKind.DLEnvelope',
            'Raw Data Mode': 'DevExpress.XtraPrinting.XlsExportOptions.RawDataMode',
            'Page Margins': 'DevExpress.XtraPrinting.PrintingSystemCommand.PageMargins',
            'Object': 'DevExpress.XtraTreeList.Data.UnboundColumnType.Object',
            'No Wrap': 'DevExpress.Utils.WordWrap.NoWrap',
            '(Collection)': 'System.Collections.CollectionBase',
            'Scale': 'DevExpress.XtraPrinting.PrintingSystemCommand.Scale',
            'Print': 'ASPxReportsStringId.DocumentViewer_RibbonPrintGroupText',
            'Narrow Vertical': 'System.Drawing.Drawing2D.HatchStyle.NarrowVertical',
            'Default File Name': 'DevExpress.XtraPrinting.PrintPreviewOptions.DefaultFileName',
            'Show First Page': 'DevExpress.XtraPrinting.PrintingSystemCommand.ShowFirstPage',
            'Prc 32K Big': 'System.Drawing.Printing.PaperKind.Prc32KBig',
            'Fit To Printed Page Height': 'DevExpress.XtraPrinting.XlExportOptionsBase.FitToPrintedPageHeight',
            'Edifact': 'DevExpress.XtraPrinting.BarCode.DataMatrixCompactionMode.Edifact',
            'GDI Character Set': 'System.Drawing.Font.GdiCharSet',
            'Tags': 'DevExpress.XtraPrinting.XlDocumentOptions.Tags',
            'Additional Metadata': 'DevExpress.XtraPrinting.PdfExportOptions.AdditionalMetadata',
            'Look-Up Settings': 'DevExpress.XtraReports.Parameters.Parameter.LookUpSettings',
            'Address': 'DevExpress.XtraPrinting.Recipient.Address',
            'Slant Line': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.SlantLine',
            'Parameter': 'DevExpress.XtraReports.Parameters.Parameter',
            'Static List': 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings',
            'Multi-Value': 'DevExpress.XtraReports.Parameters.Parameter.MultiValue',
            'Contact Name': 'DevExpress.XtraPrinting.Recipient.ContactName',
            'Bottom Arrow': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.BottomArrow',
            'Backslant Line': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.BackslantLine',
            '3-Point Star': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.ThreePointStar',
            'Dynamic List': 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings',
            'Prefix': 'DevExpress.XtraPrinting.Recipient.Prefix',
            'Right Arrow': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.RightArrow',
            'Brace': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Brace',
            'Octagon': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Octagon',
            '4-Point Star': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.FourPointStar',
            'Look-Up Values': 'DevExpress.XtraReports.Parameters.StaticListLookUpSettings.LookUpValues',
            'Display Member': 'DevExpress.XtraReports.Parameters.DynamicListLookUpSettings.DisplayMember',
            'Bracket': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.Bracket',
            '8-Point Star': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.EightPointStar',
            '5-Point Star': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.FivePointStar',
            'Vertical Line': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.VerticalLine',
            'Horizontal Line': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.HorizontalLine',
            'Left Arrow': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.LeftArrow',
            '6-Point Star': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.SixPointStar',
            'Top Arrow': 'DevExpress.XtraPrinting.Shape.Native.ShapeId.TopArrow',
            'Highlight Negative Points': 'DevExpress.Sparkline.BarSparklineView.HighlightNegativePoints',
            'Highlight Min Point': 'DevExpress.Sparkline.SparklineViewBase.HighlightMinPoint',
            'Max Point Color': 'DevExpress.Sparkline.SparklineViewBase.MaxPointColor',
            'Show Markers': 'DevExpress.Sparkline.LineSparklineView.ShowMarkers',
            'Min Point Color': 'DevExpress.Sparkline.SparklineViewBase.MinPointColor',
            'Max Point Marker Size': 'DevExpress.Sparkline.LineSparklineView.MaxPointMarkerSize',
            'End Point Color': 'DevExpress.Sparkline.SparklineViewBase.EndPointColor',
            'Negative Point Color': 'DevExpress.Sparkline.SparklineViewBase.NegativePointColor',
            'Start Point Color': 'DevExpress.Sparkline.SparklineViewBase.StartPointColor',
            'Is Auto': 'DevExpress.Sparkline.SparklineRange.IsAuto',
            'Limit 1': 'DevExpress.Sparkline.SparklineRange.Limit1',
            'Limit 2': 'DevExpress.Sparkline.SparklineRange.Limit2',
            'Negative Point Marker Size': 'DevExpress.Sparkline.LineSparklineView.NegativePointMarkerSize',
            'Area Opacity': 'DevExpress.Sparkline.AreaSparklineView.AreaOpacity',
            'End Point Marker Size': 'DevExpress.Sparkline.LineSparklineView.EndPointMarkerSize',
            'Highlight Start Point': 'DevExpress.Sparkline.SparklineViewBase.HighlightStartPoint',
            'Min Point Marker Size': 'DevExpress.Sparkline.LineSparklineView.MinPointMarkerSize',
            'Highlight End Point': 'DevExpress.Sparkline.SparklineViewBase.HighlightEndPoint',
            'Start Point Marker Size': 'DevExpress.Sparkline.LineSparklineView.StartPointMarkerSize',
            'Highlight Max Point': 'DevExpress.Sparkline.SparklineViewBase.HighlightMaxPoint',
            'Circular': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeType.Circular',
            'Dashboard Gauge Type': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeType',
            'Half': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle.Half',
            'Full': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle.Full',
            'Three Fourths': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle.ThreeFourth',
            'Dashboard Gauge Theme': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeTheme',
            'Dashboard Gauge Style': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle',
            'Quarter Right': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle.QuarterRight',
            'Flat Light': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeTheme.FlatLight',
            'Linear': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeType.Linear',
            'Flat Dark': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeTheme.FlatDark',
            'Quarter Left': 'DevExpress.XtraGauges.Core.Customization.DashboardGaugeStyle.QuarterLeft',
            'Align to Grid': 'ReportStringId.RibbonXRDesign_AlignToGrid_STipTitle',
            'Save the current report.': 'ReportStringId.RibbonXRDesign_SaveFile_Description',
            'Make Same Width': 'ReportStringId.RibbonXRDesign_SizeToControlWidth_STipTitle',
            'Data': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Data',
            'Load File...': 'ReportStringId.Cmd_RtfLoad',
            'Behavior': 'ReportStringId.CatBehavior',
            'Change the font face.': 'ReportStringId.RibbonXRDesign_FontName_STipContent',
            'This operation will remove all styles. Do you wish to proceed?': 'ReportStringId.Msg_WarningRemoveStyles',
            'Justify': 'ReportStringId.UD_Capt_JustifyJustify',
            'Add the control from the clipboard': 'ReportStringId.UD_Hint_Paste',
            'Remove Vertical Spacing': 'ReportStringId.UD_TTip_VertSpaceConcatenate',
            'Close the report': 'ReportStringId.UD_Hint_Close',
            'Report has been changed. Do you want to save changes ?': 'ReportStringId.UD_Msg_ReportChanged',
            'Font Name': 'ReportStringId.UD_TTip_FormatFontName',
            'Font Size': 'ReportStringId.UD_TTip_FormatFontSize',
            'Paste': 'ReportStringId.UD_Capt_Paste',
            'Edit Bindings...': 'ReportStringId.Verb_EditBindings',
            'Save All': 'ReportStringId.UD_Capt_SaveAll',
            'Cut the selected controls from the report and put them on the Clipboard.': 'ReportStringId.RibbonXRDesign_Cut_STipContent',
            'Set the foreground color of the control': 'ReportStringId.UD_Hint_ForegroundColor',
            'Make the selected controls the same size': 'ReportStringId.UD_Hint_MakeSameSizeBoth',
            'Add New DataSource': 'ReportStringId.UD_Title_FieldList_AddNewDataSourceText',
            'Home': 'ASPxReportsStringId.DocumentViewer_RibbonHomeTabText',
            'Copy the selected controls and put them on the Clipboard.': 'ReportStringId.RibbonXRDesign_Copy_STipContent',
            'Center Vertically': 'ReportStringId.RibbonXRDesign_CenterVertically_STipTitle',
            '{0} {{ PaperKind: {1} }}': 'ReportStringId.RepTabCtl_ReportStatus',
            'Refresh': 'ReportStringId.RibbonXRDesign_HtmlRefresh_STipTitle',
            'Multi-Column Mode': 'ReportStringId.STag_Name_ColumnMode',
            'Change the text background color.': 'ReportStringId.RibbonXRDesign_BackColor_STipContent',
            'Save the report with a new name': 'ReportStringId.UD_Hint_SaveFileAs',
            'Make Vertical Spacing Equal': 'ReportStringId.RibbonXRDesign_VertSpaceMakeEqual_Caption',
            'Space for repeating columns.': 'ReportStringId.MultiColumnDesignMsg1',
            'Controls placed here will be printed incorrectly.': 'ReportStringId.MultiColumnDesignMsg2',
            'Save the current report with a new name.': 'ReportStringId.RibbonXRDesign_SaveFileAs_Description',
            'Navigation': 'ASPxReportsStringId.DocumentViewer_RibbonNavigationGroupText',
            'Can\'t create two instances of a class on a form': 'ReportStringId.Msg_CreateSomeInstance',
            'Printing Settings': 'ReportStringId.PivotGridForm_ItemSettings_Caption',
            'Center in Form': 'ReportStringId.UD_Group_CenterInForm',
            'No bookmarks were found in the report. To create a table of contents, specify a bookmark for at least one report element.': 'ReportStringId.Msg_NoBookmarksWereFoundInReportForXrToc',
            'Make Same Size': 'ReportStringId.RibbonXRDesign_SizeToControl_Caption',
            'Save all modified reports.': 'ReportStringId.RibbonXRDesign_SaveAll_STipContent',
            'Select one or more of the Appearance objects to customize the printing appearances of the corresponding visual elements.': 'ReportStringId.PivotGridFrame_Appearances_DescriptionText',
            'Center Text': 'ReportStringId.RibbonXRDesign_JustifyCenter_STipTitle',
            'An error occurred during deserialization - possible wrong report class name': 'ReportStringId.Msg_WrongReportClassName',
            'Convert To Labels': 'ReportStringId.Cmd_TableConvertToLabels',
            'Show or hide the Scripts Editor.': 'ReportStringId.RibbonXRDesign_Scripts_STipContent',
            'Invalid binding': 'ReportStringId.BindingMapperForm_InvalidBindingWarning',
            'Customize the current XRPivotGrid\'s layout and preview its data.': 'ReportStringId.PivotGridForm_ItemLayout_Description',
            'Size to Grid': 'ReportStringId.UD_Capt_MakeSameSizeSizeToGrid',
            'Right align the selected controls': 'ReportStringId.UD_Hint_AlignRights',
            'Delete': 'ReportStringId.Cmd_Delete',
            'Open...': 'ReportStringId.UD_Capt_OpenFile',
            'Error when trying to populate the datasource. The following exception was thrown:': 'ReportStringId.Msg_FillDataError',
            'Can\'t load the report. The file is possibly corrupted or report\'s assembly is missing.': 'ReportStringId.Msg_FileCorrupted',
            'Open a report.': 'ReportStringId.RibbonXRDesign_OpenFile_STipContent',
            'Assign Style To The XRControl': 'ReportStringId.Cmd_AssignStyleToXRControl',
            'Main settings(Fields, Layout).': 'ReportStringId.PivotGridForm_GroupMain_Description',
            'Decrease the vertical spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_VertSpaceDecrease_STipContent',
            'Done': 'ReportStringId.RibbonXRDesign_StatusBar_HtmlDone',
            'Tile Vertical': 'ReportStringId.UD_Capt_MdiTileVertical',
            'Make the selected controls have the same width': 'ReportStringId.UD_Hint_MakeSameSizeWidth',
            'Data source:': 'ReportStringId.NewParameterEditorForm_DataSource',
            'Standard Controls': 'ReportStringId.UD_XtraReportsToolboxCategoryName',
            'Main Menu': 'ReportStringId.UD_Capt_MainMenuName',
            'Manage fields.': 'ReportStringId.PivotGridForm_ItemFields_Description',
            'Switch between tabbed and window MDI layout modes': 'ReportStringId.UD_Hint_TabbedInterface',
            'Increase Vertical Spacing': 'ReportStringId.RibbonXRDesign_VertSpaceIncrease_STipTitle',
            'The padding should be greater than or equal to 0.': 'ReportStringId.Msg_IncorrectPadding',
            'Undo the last operation': 'ReportStringId.UD_Hint_Undo',
            'Redo the last operation': 'ReportStringId.UD_Hint_Redo',
            'Select or input the zoom factor': 'ReportStringId.UD_Hint_Zoom',
            'Close the designer': 'ReportStringId.UD_Hint_Exit',
            'Copy the control to the clipboard': 'ReportStringId.UD_Hint_Copy',
            'Make Horizontal Spacing Equal': 'ReportStringId.UD_TTip_HorizSpaceMakeEqual',
            'Side margins': 'ReportStringId.SR_Side_Margins',
            'Change the text foreground color.': 'ReportStringId.RibbonXRDesign_ForeColor_STipContent',
            'Toolbar': 'ReportStringId.UD_Capt_ToolbarName',
            'Report Explorer': 'ReportStringId.UD_Title_ReportExplorer',
            'Select Controls With Style': 'ReportStringId.Cmd_SelectControlsWithStyle',
            'Align Rights': 'ReportStringId.RibbonXRDesign_AlignRight_Caption',
            'Align the positions of the selected controls to the grid.': 'ReportStringId.RibbonXRDesign_AlignToGrid_STipContent',
            'Align Lefts': 'ReportStringId.UD_TTip_AlignLeft',
            'Commands': 'ReportStringId.Cmd_Commands',
            'New Report via Wizard...': 'ReportStringId.RibbonXRDesign_NewReportWizard_Caption',
            'Clear': 'ReportStringId.Verb_RTFClear',
            'Back': 'ReportStringId.RibbonXRDesign_HtmlBackward_STipTitle',
            'Align text to both the left and right sides, adding extra space between words as necessary.': 'ReportStringId.RibbonXRDesign_JustifyJustify_STipContent',
            'Forward': 'ReportStringId.RibbonXRDesign_HtmlForward_Caption',
            'Bring to Front': 'ReportStringId.RibbonXRDesign_BringToFront_Caption',
            'A parameter binding assigns a value of an incompatible type to the subreport parameter "{0}".': 'ReportStringId.Msg_ParameterBindingValueTypeMismatch',
            'Underline the font': 'ReportStringId.UD_Hint_FontUnderline',
            'Make the vertical spacing between the selected controls equal.': 'ReportStringId.RibbonXRDesign_VertSpaceMakeEqual_STipContent',
            'HTML View': 'ReportStringId.RibbonXRDesign_HtmlPageText',
            'Project Objects': 'ReportStringId.UD_Title_FieldList_ProjectObjectsText',
            'Invalid leader symbol.': 'ReportStringId.Msg_InvalidLeaderSymbolForXrTocLevel',
            'Align the positions of the selected controls to the grid': 'ReportStringId.UD_Hint_AlignToGrid',
            'Underline the selected text.': 'ReportStringId.RibbonXRDesign_FontUnderline_STipContent',
            'Undo': 'ReportStringId.UD_TTip_Undo',
            'Redo': 'ReportStringId.UD_TTip_Redo',
            'Column To Right': 'ReportStringId.Cmd_TableInsertColumnToRight',
            'Run Designer...': 'ReportStringId.Verb_RunDesigner',
            'Lefts': 'ReportStringId.UD_Capt_AlignLefts',
            'Vertical Spacing': 'ReportStringId.UD_Group_VerticalSpacing',
            'Preview': 'ASPxReportsStringId.ReportDesigner_TooltipButtons_Preview',
            'Formatting Toolbar': 'ReportStringId.UD_Capt_FormattingToolbarName',
            'Delete the control and copy it to the clipboard': 'ReportStringId.UD_Hint_Cut',
            'Column To Left': 'ReportStringId.Cmd_TableInsertColumnToLeft',
            'Clone Formatting Rule': 'ReportStringId.Cmd_CloneFormattingRule',
            'Validate': 'ReportStringId.ScriptEditor_Validate',
            'Data adapter:': 'ReportStringId.NewParameterEditorForm_DataAdapter',
            'Error': 'ReportStringId.Msg_ErrorTitle',
            'Column': 'ReportStringId.Cmd_TableDeleteColumn',
            'New': 'ReportStringId.UD_Capt_NewReport',
            'Click "Validate" to check scripts.': 'ReportStringId.ScriptEditor_ClickValidate',
            'Report StyleSheet files (*.repss)|*.repss|All files (*.*)|*.*': 'ReportStringId.SSForm_Msg_FileFilter',
            'Align the control\'s text to the left': 'ReportStringId.UD_Hint_JustifyLeft',
            'Change the zoom level of the document designer.': 'ReportStringId.RibbonXRDesign_Zoom_STipContent',
            'Incorrect argument\'s value': 'ReportStringId.Msg_IncorrectArgument',
            'Decrease Horizontal Spacing': 'ReportStringId.RibbonXRDesign_HorizSpaceDecrease_Caption',
            'Show/Hide Windows': 'ReportStringId.RibbonXRDesign_Windows_STipTitle',
            'Align the centers of the selected controls horizontally.': 'ReportStringId.RibbonXRDesign_AlignHorizontalCenters_STipContent',
            'Align To Grid': 'ReportStringId.Cmd_AlignToGrid',
            'Show only invalid bindings': 'ReportStringId.BindingMapperForm_ShowOnlyInvalidBindings',
            'No report with the specified URL has been found. Do you want to create a new report?': 'ReportStringId.UD_Msg_ReportSourceUrlNotFound',
            'Vertical\r\npitch': 'ReportStringId.SR_Vertical_Pitch',
            'Row': 'ReportStringId.Cmd_TableDeleteRow',
            'Italicize the text.': 'ReportStringId.RibbonXRDesign_FontItalic_STipContent',
            'Format String...': 'ReportStringId.Verb_FormatString',
            'Assign Even Style To The XRControl': 'ReportStringId.Cmd_AssignEvenStyleToXRControl',
            'Send to Back': 'ReportStringId.UD_Capt_OrderSendToBack',
            'Report Source: {0}\r\n': 'ReportStringId.XRSubreport_ReportSourceInfo',
            'Select All': 'ReportStringId.UD_Capt_SelectAll',
            'You selected more than one formatting rule': 'ReportStringId.FRSForm_Msg_MoreThanOneRule',
            'Hide or show the {0} window': 'ReportStringId.UD_Hint_ViewDockPanels',
            'The following error occurred when the script in procedure {0} was executed:\r\n {1}': 'ReportStringId.Msg_ScriptExecutionError',
            'Make the font italic': 'ReportStringId.UD_Hint_FontItalic',
            'The group header or footer you want to delete is not empty. Do you want to delete this band along with its controls?': 'ReportStringId.Msg_GroupSortWarning',
            'The \'ReportSource\' property of a subreport control cannot be set to a descendant of the current report': 'ReportStringId.Msg_InvalidReportSource',
            'Zoom Factor: {0}%': 'ReportStringId.UD_Capt_ZoomFactor',
            'Edit Formatting Rules...': 'ReportStringId.Cmd_EditFormattingRules',
            'Exact:': 'ReportStringId.RibbonXRDesign_ZoomExact_Caption',
            'There are following errors in script(s):\r\n{0}': 'ReportStringId.Msg_ScriptError',
            'Description:': 'ReportStringId.ExpressionEditor_FieldDescription',
            'Structure': 'ReportStringId.CatStructure',
            'Export warning: The following controls are overlapped and may be exported to HTML, RTF, XLS, XLSX, CSV and Text incorrectly - {0}.': 'ReportStringId.Msg_WarningControlsAreOverlapped',
            'Middles': 'ReportStringId.UD_Capt_AlignMiddles',
            'Data member:': 'ReportStringId.NewParameterEditorForm_DataMember',
            'Appearances': 'ReportStringId.PivotGridForm_ItemAppearances_Caption',
            'Processing...': 'ReportStringId.RibbonXRDesign_StatusBar_HtmlProcessing',
            'Select Controls With Formatting Rule': 'ReportStringId.Cmd_SelectControlsWithFormattingRule',
            'Group and Sort': 'ReportStringId.UD_Title_GroupAndSort',
            'GroupFooter': 'ReportStringId.Cmd_GroupFooter',
            'New Report': 'ReportStringId.RibbonXRDesign_NewReport_Caption',
            'Adjust the printing settings for the current XRPivotGrid.': 'ReportStringId.PivotGridForm_ItemSettings_Description',
            'Align the bottoms of the selected controls.': 'ReportStringId.RibbonXRDesign_AlignBottom_STipContent',
            'Align Left': 'ReportStringId.UD_TTip_FormatAlignLeft',
            'Align the tops of the selected controls': 'ReportStringId.UD_Hint_AlignTops',
            'Move the selected controls to the back': 'ReportStringId.UD_Hint_OrderSendToBack',
            'Edit Text': 'ReportStringId.Verb_EditText',
            'Bring To Front': 'ReportStringId.Cmd_BringToFront',
            'To add a new grouping or sorting level, first provide a data source for the report.': 'ReportStringId.Msg_GroupSortNoDataSource',
            'Create a new report using the Wizard': 'ReportStringId.UD_Hint_NewWizardReport',
            'Arrange all open documents from left to right': 'ReportStringId.UD_Hint_MdiTileVertical',
            ' style': 'ReportStringId.SSForm_Msg_StyleNamePreviewPostfix',
            'The specified expression is invalid.': 'ReportStringId.Msg_InvalidExpressionEx',
            'No styles are selected': 'ReportStringId.SSForm_Msg_NoStyleSelected',
            'Align Bottoms': 'ReportStringId.RibbonXRDesign_AlignBottom_Caption',
            'Cascade': 'ReportStringId.UD_Capt_MdiCascade',
            'Launch the report wizard to create a new report.': 'ReportStringId.RibbonXRDesign_NewReportWizard_STipContent',
            'Create a new blank report.': 'ReportStringId.RibbonXRDesign_NewReport_STipContent',
            'Centers': 'ReportStringId.UD_Capt_AlignCenters',
            'Detail reports don\'t support multicolumn.': 'ReportStringId.Msg_DontSupportMulticolumn',
            'Justify the control\'s text': 'ReportStringId.UD_Hint_JustifyJustify',
            'Custom function \'{0}\' not found.': 'ReportStringId.Msg_NoCustomFunction',
            'Toolbox': 'ReportStringId.RibbonXRDesign_ToolboxControlsPage',
            'Tops': 'ReportStringId.UD_Capt_AlignTops',
            'Right align the selected controls.': 'ReportStringId.RibbonXRDesign_AlignRight_STipContent',
            'This operation will remove all formatting rules. Do you wish to proceed?': 'ReportStringId.Msg_WarningRemoveFormattingRules',
            '(Not set)': 'ReportStringId.UD_PropertyGrid_NotSetText',
            'Elements': 'ReportStringId.CatElements',
            '"{0}" has been changed. Do you want to save changes ?': 'ReportStringId.UD_Msg_MdiReportChanged',
            'Increase the vertical spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_VertSpaceIncrease_STipContent',
            'Save As...': 'ReportStringId.UD_Capt_SaveFileAs',
            'Increase': 'ReportStringId.UD_Capt_SpacingIncrease',
            'Printing': 'ReportStringId.CatPrinting',
            'Are you sure you want to apply these changes?': 'ReportStringId.Msg_ApplyChangesQuestion',
            'Open a report': 'ReportStringId.UD_Hint_OpenFile',
            'Save Report As': 'ReportStringId.RibbonXRDesign_SaveFileAs_STipTitle',
            'Move Down': 'ReportStringId.Cmd_BandMoveDown',
            'The XRTableOfContents control can be placed only into Report Header and Report Footer bands.': 'ReportStringId.Msg_PlacingXrTocIntoIncorrectContainer',
            'All scripts are valid.': 'ReportStringId.ScriptEditor_ScriptsAreValid',
            'Make Same Height': 'ReportStringId.UD_TTip_SizeToControlHeight',
            'GroupHeader': 'ReportStringId.Cmd_GroupHeader',
            'Increase the spacing between the selected controls': 'ReportStringId.UD_Hint_SpacingIncrease',
            'This operation will remove all calculated fields from all data tables. Do you wish to proceed?': 'ReportStringId.Msg_WarningRemoveCalculatedFields',
            'Cut': 'ReportStringId.RibbonXRDesign_Cut_STipTitle',
            'Close the current report.': 'ReportStringId.RibbonXRDesign_Close_STipContent',
            'Undo the last operation.': 'ReportStringId.RibbonXRDesign_Undo_STipContent',
            'Switch to the {0} tab': 'ReportStringId.UD_Hint_ViewTabs',
            'Hide or show the {0}': 'ReportStringId.UD_Hint_ViewBars',
            '(New)': 'ReportStringId.ScriptEditor_NewString',
            'Center Horizontally': 'ReportStringId.RibbonXRDesign_CenterHorizontally_STipTitle',
            'Paste the contents of the Clipboard.': 'ReportStringId.RibbonXRDesign_Paste_STipContent',
            'Loc': 'ReportStringId.DesignerStatus_Location',
            'Modify the XRPivotGrid\'s layout (sorting settings, field arrangement) and click the Apply button to apply the modifications to the current XRPivotGrid. You can also save the layout to an XML file (this can be loaded and applied to other views at design time and runtime).': 'ReportStringId.PivotGridFrame_Layouts_DescriptionText',
            'Add a Sort': 'ReportStringId.GroupSort_AddSort',
            'Zoom Toolbar': 'ReportStringId.UD_Capt_ZoomToolbarName',
            'Preview Row Count': 'ReportStringId.STag_Name_PreviewRowCount',
            'Arrange all open documents cascaded, so that they overlap each other': 'ReportStringId.UD_Hint_MdiCascade',
            'Move the selected controls to the back.': 'ReportStringId.RibbonXRDesign_SendToBack_STipContent',
            'Decrease Vertical Spacing': 'ReportStringId.UD_TTip_VertSpaceDecrease',
            'Set the background color of the control': 'ReportStringId.UD_Hint_BackGroundColor',
            'Bind': 'ReportStringId.Verb_Bind',
            'Save...': 'ReportStringId.Verb_Save',
            'Delete...': 'ReportStringId.Verb_Delete',
            'Align Middles': 'ReportStringId.RibbonXRDesign_AlignHorizontalCenters_Caption',
            'Send To Back': 'ReportStringId.Cmd_SendToBack',
            'Save/Export...': 'ReportStringId.Verb_Export',
            'Top\r\nmargin': 'ReportStringId.SR_Top_Margin',
            'Align the bottoms of the selected controls': 'ReportStringId.UD_Hint_AlignBottoms',
            'Properties': 'ReportStringId.Cmd_Properties',
            'Increase Horizontal Spacing': 'ReportStringId.UD_TTip_HorizSpaceIncrease',
            'Property': 'ReportStringId.BCForm_Lbl_Property',
            'Drag-and-drop this item to create a control bound to it;\r\n- or -\r\nDrag this item with the right mouse button or SHIFT\r\nto select a bound control from the popup menu;\r\n- or -\r\nUse the context menu to add a calculated field or parameter.': 'ReportStringId.UD_TTip_ItemDescription',
            'Horizontally': 'ReportStringId.UD_Capt_CenterInFormHorizontally',
            'Horizontally center the selected controls within a band': 'ReportStringId.UD_Hint_CenterInFormHorizontally',
            'Save File': 'ReportStringId.UD_TTip_FileSave',
            'Open File': 'ReportStringId.UD_TTip_FileOpen',
            'Report Designer': 'ReportStringId.RibbonXRDesign_PageText',
            'Edit Styles...': 'ReportStringId.Cmd_EditStyles',
            'Save all reports': 'ReportStringId.UD_Hint_SaveAll',
            'Value member:': 'ReportStringId.NewParameterEditorForm_ValueMember',
            'Bottoms': 'ReportStringId.UD_Capt_AlignBottoms',
            'Bring the selected controls to the front.': 'ReportStringId.RibbonXRDesign_BringToFront_STipContent',
            'Size the selected controls to the grid': 'ReportStringId.UD_Hint_MakeSameSizeSizeToGrid',
            'Zoom out the design surface': 'ReportStringId.UD_Hint_ZoomOut',
            'Open/Import...': 'ReportStringId.Verb_Import',
            'Insert...': 'ReportStringId.Verb_Insert',
            'Tabbed Interface': 'ReportStringId.UD_Capt_TabbedInterface',
            'Designer': 'ReportStringId.RepTabCtl_Designer',
            'Insert Band': 'ReportStringId.Cmd_InsertBand',
            'Can\'t load the report\'s layout. The file is possibly corrupted or contains incorrect information.': 'ReportStringId.Msg_FileContentCorrupted',
            'Align Right': 'ReportStringId.UD_TTip_FormatAlignRight',
            'Arrange all open documents from top to bottom': 'ReportStringId.UD_Hint_MdiTileHorizontal',
            'DetailReport': 'ReportStringId.Cmd_DetailReport',
            'Vertically center the selected controls within a band': 'ReportStringId.UD_Hint_CenterInFormVertically',
            'Align text to the right.': 'ReportStringId.RibbonXRDesign_JustifyRight_STipContent',
            'Align Centers': 'ReportStringId.RibbonXRDesign_AlignVerticalCenters_STipTitle',
            'Assign Odd Style To The XRControl': 'ReportStringId.Cmd_AssignOddStyleToXRControl',
            'The report currently being edited is of a different type than the one you are trying to open.\r\nDo you want to open the selected report anyway?': 'ReportStringId.Msg_CreateReportInstance',
            'Left align the selected controls.': 'ReportStringId.RibbonXRDesign_AlignLeft_STipContent',
            'Remove Horizontal Spacing': 'ReportStringId.RibbonXRDesign_HorizSpaceConcatenate_Caption',
            'Main': 'ReportStringId.PivotGridForm_GroupMain_Caption',
            'Text is too large.': 'ReportStringId.Msg_LargeText',
            'Align the centers of the selected controls vertically': 'ReportStringId.UD_Hint_AlignCenters',
            'Find the text on this page.': 'ReportStringId.RibbonXRDesign_HtmlFind_STipContent',
            'Number Across': 'ReportStringId.SR_Number_Across',
            'Show or hide the Tool Box, Report Explorer, Field List and Property Grid windows.': 'ReportStringId.RibbonXRDesign_Windows_STipContent',
            'Align Text Left': 'ReportStringId.RibbonXRDesign_JustifyLeft_Caption',
            'TopMargin': 'ReportStringId.Cmd_TopMargin',
            'Zoom in to get a close-up view of the report.': 'ReportStringId.RibbonXRDesign_ZoomIn_STipContent',
            'CenterVertically': 'ReportStringId.UD_TTip_CenterVertically',
            'Align the centers of the selected controls vertically.': 'ReportStringId.RibbonXRDesign_AlignVerticalCenters_STipContent',
            'Horizontal pitch': 'ReportStringId.SR_Horizontal_Pitch',
            'Create a new blank report': 'ReportStringId.UD_Hint_NewReport',
            'Align Tops': 'ReportStringId.RibbonXRDesign_AlignTop_Caption',
            'Edit Parameter Bindings...': 'ReportStringId.SubreportDesigner_EditParameterBindings',
            'Printing option management for the current XRPivotGrid.': 'ReportStringId.PivotGridForm_GroupPrinting_Description',
            'Close the report designer.': 'ReportStringId.RibbonXRDesign_Exit_STipContent',
            '\r\n\r\nDataMember: {0}': 'ReportStringId.UD_TTip_DataMemberDescription',
            'Align Text Right': 'ReportStringId.RibbonXRDesign_JustifyRight_STipTitle',
            'Remove': 'ReportStringId.UD_Capt_SpacingRemove',
            'Printing warning: Save the following reports to preview subreports with recent changes applied - {0}.': 'ReportStringId.Msg_WarningUnsavedReports',
            'Decrease the spacing between the selected controls': 'ReportStringId.UD_Hint_SpacingDecrease',
            'BottomMargin': 'ReportStringId.Cmd_BottomMargin',
            'Left align the selected controls': 'ReportStringId.UD_Hint_AlignLefts',
            'Use Ctrl with the left mouse button to rotate the shape': 'ReportStringId.Msg_ShapeRotationToolTip',
            'Add Style': 'ReportStringId.Cmd_AddStyle',
            'Redo the last operation.': 'ReportStringId.RibbonXRDesign_Redo_STipContent',
            'New via Wizard...': 'ReportStringId.UD_Capt_NewWizardReport',
            'Move back to the previous page.': 'ReportStringId.RibbonXRDesign_HtmlBackward_STipContent',
            'Windows': 'ReportStringId.RibbonXRDesign_Windows_Caption',
            'XtraReports': 'ReportStringId.Msg_Caption',
            'Add a Group': 'ReportStringId.GroupSort_AddGroup',
            'Window': 'ReportStringId.UD_Group_Window',
            'Horizontally center the selected controls within a band.': 'ReportStringId.RibbonXRDesign_CenterHorizontally_STipContent',
            'Edit': 'ReportStringId.UD_Group_Edit',
            'Move Up': 'ReportStringId.Cmd_BandMoveUp',
            'Row Above': 'ReportStringId.Cmd_TableInsertRowAbove',
            'Row Below': 'ReportStringId.Cmd_TableInsertRowBelow',
            'Horizontal Spacing': 'ReportStringId.UD_Group_HorizontalSpacing',
            'one band per page': 'ReportStringId.BandDsg_QuantityPerPage',
            'User Designer': 'ReportStringId.CatUserDesigner',
            'The condition must be Boolean!': 'ReportStringId.Msg_InvalidCondition',
            'Show fields selector': 'ReportStringId.PivotGridFrame_Layouts_SelectorCaption2',
            'Hide fields selector': 'ReportStringId.PivotGridFrame_Layouts_SelectorCaption1',
            ' selected styles...': 'ReportStringId.SSForm_Msg_SelectedStylesText',
            'PageHeader': 'ReportStringId.Cmd_PageHeader',
            'Decrease the horizontal spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_HorizSpaceDecrease_STipContent',
            'ReportFooter': 'ReportStringId.Cmd_ReportFooter',
            'No more instances of XRTableOfContents can be added to the band.': 'ReportStringId.Msg_InvalidXrTocInstanceInBand',
            'There are cyclic bookmarks in the report.': 'ReportStringId.Msg_CyclicBookmarks',
            'Components': 'ReportStringId.UD_Title_ReportExplorer_Components',
            'Unbound': 'ReportStringId.Cmd_InsertUnboundDetailReport',
            'Field List': 'ReportStringId.UD_Title_FieldList',
            'Drag-and-drop this item to create a table with its items;\r\n- or -\r\nDrag this item with the right mouse button or SHIFT\r\nto create a \'header\' table with field names;\r\n- or -\r\nUse the context menu to add a calculated field or parameter.': 'ReportStringId.UD_TTip_TableDescription',
            'Show/Hide Scripts': 'ReportStringId.RibbonXRDesign_Scripts_STipTitle',
            'Zoom in the design surface': 'ReportStringId.UD_Hint_ZoomIn',
            'Design': 'ReportStringId.CatDesign',
            'Report Source Url: {0}\r\n': 'ReportStringId.XRSubreport_ReportSourceUrlInfo',
            'Add Sub-Band': 'ReportStringId.Cmd_AddSubBand',
            'Adjust the print appearances of the current XRPivotGrid.': 'ReportStringId.PivotGridForm_ItemAppearances_Description',
            'Design in Report Wizard...': 'ReportStringId.Verb_ReportWizard',
            'Edit GroupFields...': 'ReportStringId.Verb_EditGroupFields',
            'Center text.': 'ReportStringId.RibbonXRDesign_JustifyCenter_STipContent',
            'Align the control\'s text to the center': 'ReportStringId.UD_Hint_JustifyCenter',
            'No more instances of XRTableOfContents can be added to the report.': 'ReportStringId.Msg_InvalidXrTocInstance',
            'Align the tops of the selected controls.': 'ReportStringId.RibbonXRDesign_AlignTop_STipContent',
            'Delete the control': 'ReportStringId.UD_Hint_Delete',
            'The Font name can\'t be empty.': 'ReportStringId.Msg_WarningFontNameCantBeEmpty',
            'PageFooter': 'ReportStringId.Cmd_PageFooter',
            'File not found.': 'ReportStringId.Msg_FileNotFound',
            'The DrillDownControl property of the \'{0}\' band is not valid.': 'ReportStringId.Msg_InvalidDrillDownControl',
            'You selected more than one style': 'ReportStringId.SSForm_Msg_MoreThanOneStyle',
            'Change the font size.': 'ReportStringId.RibbonXRDesign_FontSize_STipContent',
            'You don\'t have sufficient permission to execute the scripts in this report.\r\n\r\nDetails:\r\n\r\n{0}': 'ReportStringId.Msg_ScriptingPermissionErrorMessage',
            'Nothing': 'ReportStringId.RepTabCtl_NoReportStatus',
            'Data Binding': 'ReportStringId.STag_Name_DataBinding',
            'Align the control\'s text to the right': 'ReportStringId.UD_Hint_JustifyRight',
            'Add Field to Area': 'ReportStringId.Verb_AddFieldToArea',
            'Tasks': 'ReportStringId.STag_Capt_Tasks',
            'ReportHeader': 'ReportStringId.Cmd_ReportHeader',
            'Add Formatting Rule': 'ReportStringId.Cmd_AddFormattingRule',
            'Refresh this page.': 'ReportStringId.RibbonXRDesign_HtmlRefresh_STipContent',
            'Serialization Error': 'ReportStringId.Msg_SerializationErrorTitle',
            'Make the selected controls have the same height': 'ReportStringId.UD_Hint_MakeSameSizeHeight',
            'Entered code is not correct': 'ReportStringId.Msg_ScriptCodeIsNotCorrect',
            '{0} {1}': 'ReportStringId.STag_Capt_Format',
            'Remove All Formatting Rules': 'ReportStringId.Cmd_ClearFormattingRules',
            'Load Report Template...': 'ReportStringId.Verb_LoadReportTemplate',
            'Delete Unused Styles': 'ReportStringId.Cmd_PurgeStyles',
            'Save \'{0}\'': 'ReportStringId.Dlg_SaveFile_Title',
            'Layout Toolbar': 'ReportStringId.UD_Capt_LayoutToolbarName',
            'Move forward to the next page.': 'ReportStringId.RibbonXRDesign_HtmlForward_STipContent',
            'XRPivotGrid Fields': 'ReportStringId.PivotGridFrame_Fields_ColumnsText',
            'Rights': 'ReportStringId.UD_Capt_JustifyRight',
            'About': 'ReportStringId.Verb_About',
            'The specified expression contains invalid symbols (line {0}, character {1}).': 'ReportStringId.Msg_InvalidExpression',
            'to Grid': 'ReportStringId.UD_Capt_AlignToGrid',
            'View Code': 'ReportStringId.Cmd_ViewCode',
            'Edit and Reorder Bands...': 'ReportStringId.Verb_EditBands',
            'one band per report': 'ReportStringId.BandDsg_QuantityPerReport',
            'Importing a report layout. Please, wait...': 'ReportStringId.Msg_ReportImporting',
            'You must select fields for the report before you continue': 'ReportStringId.Wizard_PageChooseFields_Msg',
            'Number\r\nDown': 'ReportStringId.SR_Number_Down',
            'Display member:': 'ReportStringId.NewParameterEditorForm_DisplayMember',
            'Align the centers of the selected controls horizontally': 'ReportStringId.UD_Hint_AlignMiddles',
            'Save Report': 'ReportStringId.RibbonXRDesign_SaveFile_STipTitle',
            'Vertically center the selected controls within a band.': 'ReportStringId.RibbonXRDesign_CenterVertically_STipContent',
            'Make the horizontal spacing between the selected controls equal.': 'ReportStringId.RibbonXRDesign_HorizSpaceMakeEqual_STipContent',
            'Make Same size': 'ReportStringId.UD_TTip_SizeToControl',
            'Open Report': 'ReportStringId.RibbonXRDesign_OpenFile_STipTitle',
            'Vertically': 'ReportStringId.UD_Capt_CenterInFormVertically',
            'Make the selected text bold.': 'ReportStringId.RibbonXRDesign_FontBold_STipContent',
            'Save the report': 'ReportStringId.UD_Hint_SaveFile',
            'Place controls here to keep them together': 'ReportStringId.PanelDesignMsg',
            'Insert': 'ReportStringId.Cmd_TableInsert',
            'Delete Unused Formatting Rules': 'ReportStringId.Cmd_PurgeFormattingRules',
            'Insert Detail Report': 'ReportStringId.Cmd_InsertDetailReport',
            'Status Bar': 'ReportStringId.UD_Capt_StatusBarName',
            'Increase the horizontal spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_HorizSpaceIncrease_STipContent',
            'Make the selected controls have the same width.': 'ReportStringId.RibbonXRDesign_SizeToControlWidth_STipContent',
            'Name: {0}\r\n': 'ReportStringId.XRSubreport_NameInfo',
            'Select and drag field to the PivotGrid fields panel to create PivotGrid field.': 'ReportStringId.PivotGridFrame_Fields_DescriptionText2',
            'You can add and delete XRPivotGrid fields and modify their settings.': 'ReportStringId.PivotGridFrame_Fields_DescriptionText1',
            'Exit': 'ReportStringId.UD_Capt_Exit',
            'Bring the selected controls to the front': 'ReportStringId.UD_Hint_OrderBringToFront',
            'Printing warning: The following controls are outside the right page margin, and this will cause extra pages to be printed - {0}.': 'ReportStringId.Msg_WarningControlsAreOutOfMargin',
            'Select all the controls in the document': 'ReportStringId.UD_Hint_SelectAll',
            'Remove the vertical spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_VertSpaceConcatenate_STipContent',
            'Make the selected controls have the same height.': 'ReportStringId.RibbonXRDesign_SizeToControlHeight_STipContent',
            'Display the home page.': 'ReportStringId.RibbonXRDesign_HtmlHome_STipContent',
            'The error log is unrelated to the actual script, because the script has been changed after its last validation.\r\nTo see the actual script errors, click the Validate button again.': 'ReportStringId.ScriptEditor_ScriptHasBeenChanged',
            'Align': 'ReportStringId.UD_Group_Align',
            'Order': 'ReportStringId.UD_Group_Order',
            'Zoom out to see more of the report at a reduced size.': 'ReportStringId.RibbonXRDesign_ZoomOut_STipContent',
            'Make Equal': 'ReportStringId.UD_Capt_SpacingMakeEqual',
            'Remove the horizontal spacing between the selected controls.': 'ReportStringId.RibbonXRDesign_HorizSpaceConcatenate_STipContent',
            'Scripts Errors': 'ReportStringId.UD_Title_ErrorList',
            'Size the selected controls to the grid.': 'ReportStringId.RibbonXRDesign_SizeToGrid_STipContent',
            'New Report via Wizard': 'ReportStringId.RibbonXRDesign_NewReportWizard_STipTitle',
            'Remove All Styles': 'ReportStringId.Cmd_ClearStyles',
            'This method call is invalid for the object\'s current state': 'ReportStringId.Msg_InvalidMethodCall',
            'Null': 'ReportStringId.XRSubreport_NullReportSourceInfo',
            'Clone Style': 'ReportStringId.Cmd_CloneStyle',
            'Summary...': 'ReportStringId.Verb_SummaryWizard',
            'This operation will remove all parameters. Do you wish to proceed?': 'ReportStringId.Msg_WarningRemoveParameters',
            'Tile Horizontal': 'ReportStringId.UD_Capt_MdiTileHorizontal',
            'Make the font bold': 'ReportStringId.UD_Hint_FontBold',
            'Tab Buttons': 'ReportStringId.UD_Group_TabButtonsList',
            'Make the selected controls have the same size.': 'ReportStringId.RibbonXRDesign_SizeToControl_STipContent',
            'No formatting rules are selected': 'ReportStringId.FRSForm_Msg_NoRuleSelected',
            'Align text to the left.': 'ReportStringId.RibbonXRDesign_JustifyLeft_STipContent',
            'Decrease': 'ReportStringId.UD_Capt_SpacingDecrease',
            'New Blank Report': 'ReportStringId.RibbonXRDesign_NewReport_STipTitle',
            'Tool Box': 'ReportStringId.UD_Title_ToolBox',
            'Property Grid': 'ReportStringId.UD_Title_PropertyGrid',
            'Invalid file format': 'ReportStringId.SSForm_Msg_InvalidFileFormat',
            'Report Files (*{0})|*{1}|All Files (*.*)|*.*': 'ReportStringId.UD_SaveFileDialog_DialogFilter',
            'Save All Reports': 'ReportStringId.RibbonXRDesign_SaveAll_STipTitle',
            'Not enough memory to paint. Zoom level will be reset.': 'ReportStringId.Msg_NotEnoughMemoryToPaint',
            'Toolbars': 'ReportStringId.UD_Group_ToolbarsList',
            'Field Area for a New Field': 'ReportStringId.STag_Name_FieldArea',
            'Incorrect band type': 'ReportStringId.Msg_IncorrectBandType',
            'Remove the spacing between the selected controls': 'ReportStringId.UD_Hint_SpacingRemove',
            'Multi-Column Layout': 'ReportStringId.STag_Name_ColumnLayout',
            'Make the spacing between the selected controls equal': 'ReportStringId.UD_Hint_SpacingMakeEqual',
            'Fields Section Only': 'PivotGridStringId.CustomizationFormTopPanelOnly',
            'Grand Total': 'PivotGridStringId.GrandTotal',
            '[Bottom Panel Only 2 by 2 Layout]': 'PivotGridStringId.Alt_BottomPanelOnly2by2Layout',
            '[Expand]': 'PivotGridStringId.Alt_Expand',
            '[Top Panel Only Layout]': 'PivotGridStringId.Alt_TopPanelOnlyLayout',
            '[Column Area Headers]': 'PivotGridStringId.Alt_ColumnAreaHeaders',
            '(Show Blanks)': 'PivotGridStringId.FilterShowBlanks',
            'Hide': 'PivotGridStringId.PopupMenuHideField',
            'Fields Section and Areas Section Side-By-Side': 'PivotGridStringId.CustomizationFormStackedSideBySide',
            '(Ascending)': 'PivotGridStringId.Alt_SortedAscending',
            'Error retrieving drilldown dataset': 'PivotGridStringId.DrillDownException',
            'Good': 'PivotGridStringId.StatusGood',
            'Bad': 'PivotGridStringId.StatusBad',
            'Collapse All': 'PivotGridStringId.PopupMenuCollapseAll',
            'Collapse': 'PivotGridStringId.PopupMenuCollapse',
            'Row field:': 'PivotGridStringId.SummaryFilterRowField',
            'Drop Column Fields Here': 'PivotGridStringId.ColumnHeadersCustomization',
            'Headers': 'PivotGridStringId.PrintDesignerCategoryHeaders',
            'An error occurs in the Prefilter criteria. Please detect invalid property captions inside the criteria operands and correct or remove them.': 'PivotGridStringId.PrefilterInvalidCriteria',
            'Drop Data Items Here': 'PivotGridStringId.DataHeadersCustomization',
            'Add To': 'PivotGridStringId.CustomizationFormAddTo',
            'Move to Left': 'PivotGridStringId.PopupMenuMovetoLeft',
            'Move to Right': 'PivotGridStringId.PopupMenuMovetoRight',
            'Row Headers': 'PivotGridStringId.PrintDesignerRowHeaders',
            '(Descending)': 'PivotGridStringId.Alt_SortedDescending',
            '{0} StdDev': 'PivotGridStringId.TotalFormatStdDev',
            'Hidden Fields': 'PivotGridStringId.CustomizationFormHiddenFields',
            'Drag Items to the PivotGrid': 'PivotGridStringId.CustomizationFormText',
            'Drag fields between areas below:': 'PivotGridStringId.CustomizationFormHint',
            'Clear Rules from All Measures': 'PivotGridStringId.PopupMenuFormatRulesClearAllRules',
            'Expand All': 'PivotGridStringId.PopupMenuExpandAll',
            '[Filter Area Headers]': 'PivotGridStringId.Alt_FilterAreaHeaders',
            'Vertical Lines': 'PivotGridStringId.PrintDesignerVerticalLines',
            'Measure': 'PivotGridStringId.PopupMenuFormatRulesMeasure',
            'Show Details command cannot be executed when multiple items are selected in a report filter field. Select a single item for each field in the report filter area before performing a drillthrough.': 'PivotGridStringId.OLAPDrillDownFilterException',
            'PivotGrid Prefilter': 'PivotGridStringId.PrefilterFormCaption',
            'Total': 'PivotGridStringId.Total',
            '[Filtered]': 'PivotGridStringId.Alt_FilterButtonActive',
            '[Hidden Field\'s Headers]': 'PivotGridStringId.Alt_FieldListHeaders',
            '[Stacked Side By Side Layout]': 'PivotGridStringId.Alt_StackedSideBySideLayout',
            '[Filter]': 'PivotGridStringId.Alt_FilterButton',
            '[Bottom Panel Only 1 by 4 Layout]': 'PivotGridStringId.Alt_BottomPanelOnly1by4Layout',
            'Max Visible Count': 'PivotGridStringId.SummaryFilterMaxVisibleCount',
            '{0} Count': 'PivotGridStringId.TotalFormatCount',
            '{0} Custom': 'PivotGridStringId.TotalFormatCustom',
            'Print Designer': 'PivotGridStringId.PrintDesigner',
            'Expression Editor...': 'PivotGridStringId.PopupMenuShowExpression',
            'Var': 'PivotGridStringId.SummaryVar',
            'Reload Data': 'PivotGridStringId.PopupMenuRefreshData',
            'Invert Filter': 'PivotGridStringId.FilterInvert',
            'Q{0}': 'PivotGridStringId.DateTimeQuarterFormat',
            'Cancel': 'ASPxReportsStringId.SearchDialog_Cancel',
            'Hidden': 'PivotGridStringId.SummaryFilterLegendHidden',
            'Going Down': 'PivotGridStringId.TrendGoingDown',
            'Expand': 'PivotGridStringId.PopupMenuExpand',
            'PivotGrid Field List': 'PivotGridStringId.CustomizationFormCaption',
            'In order to use the PivotGrid OLAP functionality, you should have a MS OLAP OleDb provider installed on your system.\r\nYou can download it here:': 'PivotGridStringId.OLAPNoOleDbProvidersMessage',
            'Show values from': 'PivotGridStringId.SummaryFilterRangeFrom',
            '(Any)': 'PivotGridStringId.PopupMenuFormatRulesAnyField',
            '(Blank)': 'PivotGridStringId.FilterBlank',
            '[Data Area Headers]': 'PivotGridStringId.Alt_DataAreaHeaders',
            '[Resize]': 'PivotGridStringId.Alt_FilterWindowSizeGrip',
            'KPIs': 'PivotGridStringId.OLAPKPIsCaption',
            'StdDevp': 'PivotGridStringId.SummaryStdDevp',
            'Apply to specific level': 'PivotGridStringId.SummaryFilterApplyToSpecificLevel',
            'Edit Prefilter': 'PivotGridStringId.EditPrefilter',
            'Headers On Every Page': 'PivotGridStringId.PrintDesignerHeadersOnEveryPage',
            'Horizontal Lines': 'PivotGridStringId.PrintDesignerHorizontalLines',
            'Clear Sorting': 'PivotGridStringId.PopupMenuClearSorting',
            'Show Field List': 'PivotGridStringId.PopupMenuShowFieldList',
            'OK': 'PivotGridStringId.FilterOk',
            '[Layout Button]': 'PivotGridStringId.Alt_LayoutButton',
            '[Row Area Headers]': 'PivotGridStringId.Alt_RowAreaHeaders',
            '[Stacked Default Layout]': 'PivotGridStringId.Alt_StackedDefaultLayout',
            'Varp': 'PivotGridStringId.SummaryVarp',
            'No Change': 'PivotGridStringId.TrendNoChange',
            '{0} Varp': 'PivotGridStringId.TotalFormatVarp',
            'Format Rules': 'PivotGridStringId.PopupMenuFormatRules',
            'to': 'PivotGridStringId.SummaryFilterRangeTo',
            'Remove All Sorting': 'PivotGridStringId.PopupMenuRemoveAllSortByColumn',
            'Column Headers': 'PivotGridStringId.PrintDesignerColumnHeaders',
            'Field Values': 'PivotGridStringId.PrintDesignerCategoryFieldValues',
            'Apply only to specific level': 'PivotGridStringId.PopupMenuFormatRulesIntersectionOnly',
            'Drag a field here to customize layout': 'PivotGridStringId.CustomizationFormListBoxText',
            'StdDev': 'PivotGridStringId.SummaryStdDev',
            'This command cannot be used on multiple selections.': 'PivotGridStringId.CannotCopyMultipleSelections',
            'Clear Rules from This Intersection': 'PivotGridStringId.PopupMenuFormatRulesClearIntersectionRules',
            'Sort "{0}" by This Row': 'PivotGridStringId.PopupMenuSortFieldByRow',
            'Going Up': 'PivotGridStringId.TrendGoingUp',
            'Defer Layout Update': 'PivotGridStringId.CustomizationFormDeferLayoutUpdate',
            'Choose fields to add to report:': 'PivotGridStringId.CustomizationFormAvailableFields',
            'Search': 'ASPxReportsStringId.SearchDialog_Header',
            'Unused Filter Fields': 'PivotGridStringId.PrintDesignerUnusedFilterFields',
            'Sort A-Z': 'PivotGridStringId.PopupMenuSortAscending',
            'Sort Z-A': 'PivotGridStringId.PopupMenuSortDescending',
            'Drop Row Fields Here': 'PivotGridStringId.RowHeadersCustomization',
            'Measures': 'PivotGridStringId.OLAPMeasuresCaption',
            '{0} Average': 'PivotGridStringId.TotalFormatAverage',
            'Column field:': 'PivotGridStringId.SummaryFilterColumnField',
            'Drop Filter Fields Here': 'PivotGridStringId.FilterHeadersCustomization',
            'Sort "{0}" by This Column': 'PivotGridStringId.PopupMenuSortFieldByColumn',
            '(invalid property)': 'PivotGridStringId.PrefilterInvalidProperty',
            'Show Prefilter': 'PivotGridStringId.PopupMenuShowPrefilter',
            '{0} Total': 'PivotGridStringId.TotalFormat',
            '{0} StdDevp': 'PivotGridStringId.TotalFormatStdDevp',
            'Move to Beginning': 'PivotGridStringId.PopupMenuMovetoBeginning',
            'Hide Field List': 'PivotGridStringId.PopupMenuHideFieldList',
            'Filter Headers': 'PivotGridStringId.PrintDesignerFilterHeaders',
            'KPI Graphics': 'PivotGridStringId.PopupMenuKPIGraphic',
            'Fields Section and Areas Section Stacked': 'PivotGridStringId.CustomizationFormStackedDefault',
            'Customization Form Layout': 'PivotGridStringId.CustomizationFormLayoutButtonTooltip',
            '(Show All)': 'PivotGridStringId.FilterShowAll',
            'Hide Prefilter': 'PivotGridStringId.PopupMenuHidePrefilter',
            'Clear Rules from This Measure': 'PivotGridStringId.PopupMenuFormatRulesClearMeasureRules',
            'Update': 'PivotGridStringId.CustomizationFormUpdate',
            'Move to End': 'PivotGridStringId.PopupMenuMovetoEnd',
            '[Collapse]': 'PivotGridStringId.Alt_Collapse',
            'Data Headers': 'PivotGridStringId.PrintDesignerDataHeaders',
            'Areas Section Only (2 by 2)': 'PivotGridStringId.CustomizationFormBottomPanelOnly2by2',
            'Areas Section Only (1 by 4)': 'PivotGridStringId.CustomizationFormBottomPanelOnly1by4',
            '(Grand Total)': 'PivotGridStringId.PopupMenuFormatRulesGrandTotal',
            'Neutral': 'PivotGridStringId.StatusNeutral',
            '{0} Var': 'PivotGridStringId.TotalFormatVar',
            '{0} Sum': 'PivotGridStringId.TotalFormatSum',
            '{0} Max': 'PivotGridStringId.TotalFormatMax',
            '{0} Min': 'PivotGridStringId.TotalFormatMin',
            'The palette is default and then can\'t be modified.': 'ChartStringId.MsgModifyDefaultPaletteError',
            'Export the current document in one of the available formats, and save it to the file on a disk.': 'ChartStringId.CmdExportPlaceHolderDescription',
            'Spline': 'ChartStringId.SvnSpline',
            'The distance between the panes should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectPaneDistance',
            'The chart height must be set in pixels.': 'ChartStringId.MsgWebInvalidHeightUnit',
            'Compare values across categories and across series and display a pyramid chart on three axes.': 'ChartStringId.CmdCreatePyramidManhattanBarChartDescription',
            'Relative Position': 'ChartStringId.AnnotationRelativePosition',
            'Chart Control': 'ChartStringId.ChartControlDockTarget',
            'Percentage Error Bars': 'ChartStringId.IndPercentageErrorBars',
            'NarrowVertical': 'ChartStringId.WizHatchNarrowVertical',
            'The indent should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectBarSeriesLabelIndent',
            'Show to what extent values have changed for different points in the same series.': 'ChartStringId.CmdCreateStepLineChartDescription',
            'Fixed Value Error Bars': 'ChartStringId.IndFixedValueErrorBars',
            'Can\'t set the series point, because it should belong to a series, and the series should be contained in the chart\'s collection.': 'ChartStringId.MsgIncorrectAnchorPointSeriesPoint',
            'SUM': 'ChartStringId.FunctionNameSum',
            'MAX': 'ChartStringId.FunctionNameMax',
            'MIN': 'ChartStringId.FunctionNameMin',
            'Chart Type': 'ChartStringId.WizChartTypePageName',
            'Populate the chart\'s datasource with data.': 'ChartStringId.VerbPopulateDescription',
            '100% Stacked Line in 3-D': 'ChartStringId.CmdCreateFullStackedLine3DChartMenuCaption',
            'AxisValue can\'t be set to null for the ConstantLine object.': 'ChartStringId.MsgIncorrectConstantLineAxisValue',
            'The tickmark length should be greater than 0.': 'ChartStringId.MsgIncorrectTickmarkLength',
            'Indicators changed': 'ChartStringId.TrnIndicatorsChanged',
            'Combine the advantages of both the 100% Stacked Column and Clustered Column chart types, so that you can stack different columns, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateSideBySideFullStackedBarChartDescription',
            'The OscillationCount property value should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectElasticEaseOscillationCount',
            'Polar Line': 'ChartStringId.CmdCreatePolarLineChartMenuCaption',
            'Annotations...': 'ChartStringId.VerbAnnotations',
            'Pastel Kit': 'ChartStringId.AppPastelKit',
            'The pane\'s size in pixels should be greater than or equal to 0.': 'ChartStringId.MsgInvalidPaneSizeInPixels',
            'Chameleon': 'ChartStringId.AppChameleon',
            'Print Preview': 'ChartStringId.CmdPrintPreviewMenuCaption',
            'Image Annotation ': 'ChartStringId.ImageAnnotationPrefix',
            'Pie': 'ChartStringId.CmdCreatePieChartMenuCaption',
            'Use Ctrl with the center (wheel) mouse button\r\nto scroll the chart.': 'ChartStringId.Msg3DScrollingToolTip',
            'Use Ctrl with the left mouse button\r\nto resize the annotation.': 'ChartStringId.MsgAnnotationResizingToolTip',
            'Populate': 'ChartStringId.VerbPopulate',
            'The doughnut hole percentage should be greater than or equal to 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectDoughnutHolePercent',
            'There are no visible series to represent in a chart.\r\nTry to add new series, or make sure that\r\nat least one of them is visible.': 'ChartStringId.MsgEmptyChart',
            'DottedDiamond': 'ChartStringId.WizHatchDottedDiamond',
            'Use Ctrl with the left mouse button\r\nto rotate the chart.': 'ChartStringId.Msg3DRotationToolTip',
            'Primary AxisX': 'ChartStringId.PrimaryAxisXName',
            'Customize the view-type-specific options of a series.\r\nNote that you may select a series by clicking it in the chart preview.': 'ChartStringId.WizSeriesViewPageDescription',
            'Primary AxisY': 'ChartStringId.PrimaryAxisYName',
            'Show trends for several series and compare their values for the same points arguments on a circular diagram on the basis of angles.': 'ChartStringId.CmdCreatePolarLineChartDescription',
            '100% Stacked Line': 'ChartStringId.CmdCreateFullStackedLineChartMenuCaption',
            'Side By Side Gantt': 'ChartStringId.SvnSideBySideGantt',
            'Bar 3D': 'ChartStringId.SvnSideBySideBar3D',
            '100% Stacked Column': 'ChartStringId.CmdCreateFullStackedBarChartMenuCaption',
            'The ZOrder should be greater than or equal to 0 and less than 100.': 'ChartStringId.MsgIncorrectAnnotationZOrder',
            'Run the Chart Designer, which allows the properties of the chart to be edited.': 'ChartStringId.VerbDesignerDescription',
            'This page was already unregistered.': 'ChartStringId.MsgUnregisterPageError',
            'Nature Colors': 'ChartStringId.AppNatureColors',
            'FromCenterVertical': 'ChartStringId.WizGradientFromCenterVertical',
            'The data snapshot operation is complete. All series data now statically persist in the chart.\r\nThis also means that now the chart is in unbound mode.\r\n\r\nNOTE: You can undo this operation by pressing Ctrl+Z in the Visual Studio designer.': 'ChartStringId.MsgDataSnapshot',
            '3-D Cylinder': 'ChartStringId.CmdCreateCylinderManhattanBarChartMenuCaption',
            'Side By Side Bar 3D Stacked': 'ChartStringId.SvnSideBySideStackedBar3D',
            'The zoom percent should be greater than or equal to 100.': 'ChartStringId.MsgIncorrectMaxZoomPercent',
            'The {0} property  can\'t be set to non-integer for the date-time scale.': 'ChartStringId.MsgIncorrectDateTimeRangeControlClientSpacing',
            'Strips changed': 'ChartStringId.TrnStripsChanged',
            'Use it when it\'s necessary to show stand-alone data points on the same chart plot.': 'ChartStringId.CmdCreatePointChartDescription',
            'SmallConfetti': 'ChartStringId.WizHatchSmallConfetti',
            'The area width should be greater than 0.': 'ChartStringId.MsgIncorrectAreaWidth',
            'Point': 'ChartStringId.CmdCreatePointChartMenuCaption',
            'Range Area in 3-D': 'ChartStringId.CmdCreateRangeArea3DChartMenuCaption',
            'TopToBottom': 'ChartStringId.WizSeriesLabelTextOrientationTopToBottom',
            'The chart doesn\'t contain an appearance with the {0} name.': 'ChartStringId.MsgIncorrectAppearanceName',
            'Behave similar to 100% Stacked Area Chart in 3D, but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateFullStackedSplineArea3DChartDescription',
            'WideUpwardDiagonal': 'ChartStringId.WizHatchWideUpwardDiagonal',
            'Compare the contribution of each value to a total across categories.': 'ChartStringId.CmdCreatePyramidStackedBar3DChartDescription',
            'Export to PDF': 'ChartStringId.CmdExportToPDFMenuCaption',
            'Auto-created Series': 'ChartStringId.AutocreatedSeriesName',
            'NarrowHorizontal': 'ChartStringId.WizHatchNarrowHorizontal',
            'Axis can\'t be set to null for the AxisYCoordinate object.': 'ChartStringId.MsgNullAxisYCoordinateAxis',
            'Clear Data Source': 'ChartStringId.VerbClearDataSource',
            'Area 3D': 'ChartStringId.SvnArea3D',
            'Side By Side Bar 3D Stacked 100%': 'ChartStringId.SvnSideBySideFullStackedBar3D',
            'The chart doesn\'t contain a palette with the {0} name.': 'ChartStringId.MsgPaletteNotFound',
            '3-D Column': 'ChartStringId.CmdCreateManhattanBarChartMenuCaption',
            'Other': 'ChartStringId.RibbonOtherPageCaption',
            'Export to RTF': 'ChartStringId.CmdExportToRTFMenuCaption',
            'The legend horizontal indent should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectLegendHorizontalIndent',
            'Stacked Line': 'ChartStringId.CmdCreateStackedLineChartMenuCaption',
            'Open the Annotations Collection Editor.': 'ChartStringId.VerbAnnotationsDescription',
            'Microsoft Excel 2007 Work Book': 'ChartStringId.CmdExportToXLSXDescription',
            'The weight of the pane should be greater than 0.': 'ChartStringId.MsgIncorrectPaneWeight',
            'Run the Chart Wizard, which allows the properties of the chart to be edited.': 'ChartStringId.VerbWizardDescription',
            'The maximum width of the label should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectLabelMaxWidth',
            'Auto Size': 'ChartStringId.WizChartImageSizeModeAutoSize',
            'Displays a wide area at the top, indicating the total points\' value, while other areas are proportionally smaller.\r\n\r\nUse it when it is necessary to represent stages in a sales process, show the amount of potential revenue for each stage, as well as identify potential problem areas in an organization\'s sales processes.': 'ChartStringId.CmdCreateFunnelChartDescription',
            'Manhattan Bar': 'ChartStringId.SvnManhattanBar',
            'It is impossible to set a custom range, if the DateTimeScaleMode is not Manual.': 'ChartStringId.MsgUnsupportedManualRangeForAutomaticDateTimeScaleMode',
            'Step Line in 3-D': 'ChartStringId.CmdCreateStepLine3DChartMenuCaption',
            'The length of the minor tickmark should be greater than 0.': 'ChartStringId.MsgIncorrectTickmarkMinorLength',
            'Can\'t set the indicator Legend, because the specified legend isn\'t contained in the charts\'s collection of legends.': 'ChartStringId.MsgIncorrectIndicatorLegend',
            'MaxValueInternal can\'t be set to NaN and Infinity values.': 'ChartStringId.MsgIncorrectAxisRangeMaxValueInternal',
            'Funnel': 'ChartStringId.SvnFunnel',
            'Compare values across categories and display clustered columns in 3-D format.': 'ChartStringId.CmdCreateBar3DChartDescription',
            'The line length should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectSeriesLabelLineLength',
            'Data Source Based Error Bars': 'ChartStringId.IndDataSourceBasedErrorBars',
            'You can\'t manually change the series point\'s value, because a chart is bound to data.': 'ChartStringId.MsgDenyChangeSeriesPointValue',
            'Scatter Radar Line': 'ChartStringId.SvnScatterRadarLine',
            '2-D Area': 'ChartStringId.CmdArea2DGroupPlaceHolderMenuCaption',
            'Compare values across categories and across series and display a cone chart on three axes.': 'ChartStringId.CmdCreateConeManhattanBarChartDescription',
            'Open Value': 'ChartStringId.OpenValuePatternDescription',
            'BottomRightToTopLeft': 'ChartStringId.WizGradientBottomRightToTopLeft',
            'Chart titles changed': 'ChartStringId.TrnChartTitlesChanged',
            'Red Orange': 'ChartStringId.PltRedOrange',
            'Rate of Change': 'ChartStringId.IndRateOfChange',
            'Clustered Pyramid': 'ChartStringId.CmdCreatePyramidBar3DChartMenuCaption',
            'Size in pixels should be greater than or equal to -1 and less than 50.': 'ChartStringId.MsgInvalidSizeInPixels',
            'The {0} SeriesView doesn\'t exist.': 'ChartStringId.MsgSeriesViewDoesNotExist',
            '(invisible)': 'ChartStringId.InvisibleSeriesView',
            'Line 3D': 'ChartStringId.SvnLine3D',
            'Scatte Polar Line': 'ChartStringId.CmdCreateScatterPolarLineChartMenuCaption',
            'The min limit of the strip should be less than the max limit.': 'ChartStringId.MsgIncorrectStripMinLimit',
            'the argument scale type': 'ChartStringId.MsgIncompatibleByArgumentScaleType',
            'Cannot set the InvertedStep property unless the series is added to the chart\'s collection.': 'ChartStringId.MsgIncorrectInvertedStepPropertyUsing',
            'Indicator deleted': 'ChartStringId.TrnIndicatorDeleted',
            'Nested Doughnut': 'ChartStringId.CmdCreateNestedDoughnutChartMenuCaption',
            'Tagged Image File Format': 'ChartStringId.CmdExportToTIFFDescription',
            'Dark Flat': 'ChartStringId.AppDarkFlat',
            'Blue Warm': 'ChartStringId.PltBlueWarm',
            'Bubble': 'ChartStringId.SvnBubble',
            'Stacked Area in 3-D': 'ChartStringId.CmdCreateStackedArea3DChartMenuCaption',
            'Insert a point, funnel, financial, radar, polar, range, or gantt chart.': 'ChartStringId.CmdCreateOtherSeriesTypesChartPlaceHolderDescription',
            'Palettes changed': 'ChartStringId.TrnPalettesChanged',
            'Export to HTML': 'ChartStringId.CmdExportToHTMLMenuCaption',
            'The task link\'s minimum indent should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectTaskLinkMinIndent',
            'The annotation height should be greater than 0.': 'ChartStringId.MsgIncorrectAnnotationHeight',
            'Displays data as a line on a circular grid that has multiple axis along which data can be plotted. The series points are drawn in the circular grid in the same order that they have in the series point collection.': 'ChartStringId.CmdCreateScatterRadarLineChartDescription',
            'TopNOptions can\'t be enabled for this series, because either its ValueScaleType is not Numerical or its data points have more than 1 value.': 'ChartStringId.MsgUnsupportedTopNOptions',
            'The GridAlignment property must be greater than or equal to the current measure unit.': 'ChartStringId.MsgIncorrectDateTimeGridAlignment',
            'Right-top': 'ChartStringId.WizDockCornerRightTop',
            'DashedUpwardDiagonal': 'ChartStringId.WizHatchDashedUpwardDiagonal',
            'The logarithmic base should be greater than 1.': 'ChartStringId.MsgInvalidLogarithmicBase',
            'The fixed series distance should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectSeriesDistanceFixed',
            'JustifyAroundPoint': 'ChartStringId.WizResolveOverlappingModeJustifyAroundPoint',
            'Chaikin\'s Volatility': 'ChartStringId.IndChaikinsVolatility',
            'LightVertical': 'ChartStringId.WizHatchLightVertical',
            'Show variation in stock prices over the course of a day. The Open and Close prices are represented by left and right lines on each point, and the Low and High prices are represented by the bottom and top values of the vertical line which is shown at each point.': 'ChartStringId.CmdCreateStockChartDescription',
            'Bitmap Picture': 'ChartStringId.CmdExportToBMPDescription',
            'numeric': 'ChartStringId.ScaleTypeNumerical',
            'Bar Stacked 100%': 'ChartStringId.SvnFullStackedBar',
            '3-D Area': 'ChartStringId.CmdArea3DGroupPlaceHolderMenuCaption',
            'Annotation deleted': 'ChartStringId.TrnAnnotationDeleted',
            'Foundry': 'ChartStringId.PltFoundry',
            'TopRightToBottomLeft': 'ChartStringId.WizGradientTopRightToBottomLeft',
            'Chart wizard settings applied': 'ChartStringId.TrnChartWizard',
            'Use Ctrl with the left mouse button\r\nto move the annotation.': 'ChartStringId.MsgAnnotationMovingToolTip',
            'DashedDownwardDiagonal': 'ChartStringId.WizHatchDashedDownwardDiagonal',
            '100% Stacked Cylinder': 'ChartStringId.CmdCreateCylinderFullStackedBar3DChartMenuCaption',
            'Click the ellipsis button...': 'ChartStringId.WizSpecifyDataFilters',
            'The series view\'s pane can\'t be set to null.': 'ChartStringId.MsgNullSeriesViewPane',
            'Gantt': 'ChartStringId.CmdGanttGroupPlaceHolderMenuCaption',
            'JustifyAllAroundPoints': 'ChartStringId.WizResolveOverlappingModeJustifyAllAroundPoints',
            'AxisValue can\'t be set to null for the AxisCoordinate object.': 'ChartStringId.MsgIncorrectAxisCoordinateAxisValue',
            'The specified pane either doesn\'t belong to a chart, or doesn\'t show the current axis whose visibility should be changed.': 'ChartStringId.MsgInvalidPane',
            'Series ': 'ChartStringId.SeriesPrefix',
            'The datasource doesn\'t contain a datamember with the "{0}" name.': 'ChartStringId.MsgIncorrectDataMember',
            'Terracotta Pie': 'ChartStringId.PltTerracottaPie',
            'Marquee': 'ChartStringId.PltMarquee',
            'Custom Legend Item ': 'ChartStringId.CustomLegendItemPrefix',
            'Image Annotation': 'ChartStringId.ImageAnnotation',
            'DevExpress Scheduler holidays files (*.xml)|*.xml|Microsoft Office Outlook holidays files (*.hol)|*.hol|Text files (*.txt)|*.txt|All files (*.*)|*.*': 'ChartStringId.HolidaysImportFilter',
            'Combine the advantages of both the 100% Stacked Column and Clustered Column chart types in 3-D format, so that you can stack different columns, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateSideBySideFullStackedBar3DChartDescription',
            'Displays data as filled areas on a diagram, with each data point displayed as a peak or hollow in the area.\r\n\r\nUse it when you need to show trends for several series on the same diagram, and also show the relationship of the parts to the whole.': 'ChartStringId.CmdCreateArea3DChartDescription',
            'Displays the trend of values over time or categories.': 'ChartStringId.CmdCreateAreaChartDescription',
            'Scatter Polar Line': 'ChartStringId.SvnScatterPolarLine',
            'Export to Image': 'ChartStringId.CmdExportToImagePlaceHolderMenuCaption',
            'Behave similar to Stacked Area Chart but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateStackedSplineAreaChartDescription',
            'Image Files(*.gif;*.jpg;*.jpeg;*.bmp;*.wmf;*.png)|*.gif;*.jpg;*.jpeg;*.bmp;*.wmf;*.png|All files(*.*)|*.*': 'ChartStringId.WizBackImageFileNameFilter',
            'Can\'t set the strip Legend, because the specified legend isn\'t contained in the charts\'s collection of legends.': 'ChartStringId.MsgIncorrectStripLegend',
            'Compare values across categories and across series and display a cylinder chart on three axes.': 'ChartStringId.CmdCreateCylinderManhattanBarChartDescription',
            'The chart width must be set in pixels.': 'ChartStringId.MsgWebInvalidWidthUnit',
            'The current measure unit should be greater than 0.': 'ChartStringId.MsgIncorrectNumericMeasureUnit',
            'Displays series as filled areas on a diagram, defined by data points with two values that are minimum and maximum limits.\r\n\r\nUse it when you need to accentuate the delta between the start and end values.': 'ChartStringId.CmdCreateRangeAreaChartDescription',
            'Combine the advantages of both the Stacked Column and Clustered Column chart types in 3-D format, so that you can stack different columns, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateSideBySideStackedBar3DChartDescription',
            'Can\'t set the AxisXCoordinate\'s axis, because the specified axis isn\'t primary and isn\'t contained in the diagram\'s collection of secondary X-axes.': 'ChartStringId.MsgIncorrectAxisXCoordinateAxis',
            'Stacked Column in 3-D': 'ChartStringId.CmdCreateStackedBar3DChartMenuCaption',
            'LightUpwardDiagonal': 'ChartStringId.WizHatchLightUpwardDiagonal',
            'Free Position': 'ChartStringId.CrosshairLabelFreePosition',
            'Red Violet': 'ChartStringId.PltRedViolet',
            'Constant line deleted': 'ChartStringId.TrnConstantLineDeleted',
            'Behave similar to 100% Stacked Area, but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateFullStackedSplineAreaChartDescription',
            'The indent value should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectIndentFromMarker',
            'Williams %R': 'ChartStringId.IndWilliamsR',
            'The connector length should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectRelativePositionConnectorLength',
            'Load a chart from an XML file.': 'ChartStringId.VerbLoadLayoutDescription',
            'LightDownwardDiagonal': 'ChartStringId.WizHatchLightDownwardDiagonal',
            'Annotations changed': 'ChartStringId.TrnAnnotationsChanged',
            'See basic information on XtraCharts.': 'ChartStringId.VerbAboutDescription',
            'Behave similar to Area Chart but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateSplineAreaChartDescription',
            'Compare the contribution of each value to a total across categories by using horizontal rectangles.': 'ChartStringId.CmdCreateRotatedStackedBarChartDescription',
            'Commodity Channel Index': 'ChartStringId.IndCommodityChannelIndex',
            'Red': 'ChartStringId.PltRed',
            'The{0} chart{1}.': 'ChartStringId.AlternateTextPlaceholder',
            'All Colors': 'ChartStringId.StyleAllColors',
            'Percent70': 'ChartStringId.WizHatchPercent70',
            'Percent75': 'ChartStringId.WizHatchPercent75',
            'Percent60': 'ChartStringId.WizHatchPercent60',
            'Percent50': 'ChartStringId.WizHatchPercent50',
            'Percent40': 'ChartStringId.WizHatchPercent40',
            'Percent30': 'ChartStringId.WizHatchPercent30',
            'Percent25': 'ChartStringId.WizHatchPercent25',
            'Percent20': 'ChartStringId.WizHatchPercent20',
            'Percent10': 'ChartStringId.WizHatchPercent10',
            'Percent05': 'ChartStringId.WizHatchPercent05',
            'Percent90': 'ChartStringId.WizHatchPercent90',
            'Percent80': 'ChartStringId.WizHatchPercent80',
            'Add titles to your chart, and customize their options.': 'ChartStringId.WizChartTitlesPageDescription',
            'Spline Area 3D': 'ChartStringId.SvnSpline3DArea',
            'Compare values across categories.': 'ChartStringId.CmdCreateConeBar3DChartDescription',
            'Displayss series on a circular diagram as filled areas, defined by data points with two values that are minimum and maximum limits. Use it when you need to accentuate the delta between the start and end values.': 'ChartStringId.CmdCreatePolarRangeAreaChartDescription',
            'Palettes...': 'ChartStringId.VerbEditPalettes',
            'The GridAlignment property can\'t be modified in the automatic date-time scale mode.': 'ChartStringId.MsgIncorrectDateTimeGridAlignmentPropertyUsing',
            'Compare the percentage each value contributes to a total across categories and display 100% stacked columns in 3-D format.': 'ChartStringId.CmdCreateFullStackedBar3DChartDescription',
            'JPEG': 'ChartStringId.CmdExportToJPEGMenuCaption',
            'Rich Text Format': 'ChartStringId.CmdExportToRTFDescription',
            'Show points from two or more different series on the same circular diagram on the basis of angles.': 'ChartStringId.CmdCreatePolarPointChartDescription',
            'Side By Side Bar Stacked': 'ChartStringId.SvnSideBySideStackedBar',
            'Anchor Point can\'t be null.': 'ChartStringId.MsgIncorrectAnchorPoint',
            'Northern Lights': 'ChartStringId.PltNorthernLights',
            'The PolarAxisX doesn\'t support logarithmic mode.': 'ChartStringId.MsgPolarAxisXLogarithmic',
            'Strip ': 'ChartStringId.StripPrefix',
            'A pane\'s name can\'t be empty.': 'ChartStringId.MsgEmptyPaneName',
            'Select a placeholder to see the preview': 'ChartStringId.PatternEditorPreviewCaption',
            'MaxValue can\'t be set to null.': 'ChartStringId.MsgIncorrectAxisRangeMaxValue',
            'The marker size should be greater than 1.': 'ChartStringId.MsgIncorrectMarkerSize',
            'Reset legend point options': 'ChartStringId.VerbResetLegendPointOptions',
            'The exploded distance percentage value should be greater than 0.': 'ChartStringId.MsgIncorrectExplodedDistancePercentage',
            'AxisValue can\'t be set to null for the CustomAxisLabel object.': 'ChartStringId.MsgIncorrectCustomAxisLabelAxisValue',
            'This view can\'t represent negative\r\nvalues. All values must be either greater\r\nthan or equal to zero.': 'ChartStringId.PieIncorrectValuesText',
            'Relation\'s ChildPointID must be unique.': 'ChartStringId.MsgRelationChildPointIDNotUnique',
            'Select a printer, number of copies and other printing options before printing.': 'ChartStringId.CmdPrintDescription',
            'Color {0}': 'ChartStringId.StyleColorNumber',
            'The scroll bar thickness should be greater than or equal to 3 and less than or equal to 25.': 'ChartStringId.MsgIncorrectScrollBarThickness',
            'A secondary axis name can\'t be empty.': 'ChartStringId.MsgEmptySecondaryAxisName',
            'Combine the advantages of both the Stacked Cone and Clustered Cone chart types, so that you can stack different cones, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateConeSideBySideStackedBar3DChartDescription',
            'Value must be equal or greater then 0.': 'ChartStringId.MsgValueMustBeGreaterThenZero',
            'Combine the advantages of both the Stacked Pyramid and Clustered Pyramid chart types, so that you can stack different pyramids, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreatePyramidSideBySideStackedBar3DChartDescription',
            'ImageUrl property can be used for the WebChartControl only. Please, use the Image property instead.': 'ChartStringId.MsgIncorrectUseImageUrlProperty',
            'The vertical scroll percent should be greater than or equal to -{0} and less than or equal to {0}.': 'ChartStringId.MsgIncorrectVerticalScrollPercent',
            'FromCenterHorizontal': 'ChartStringId.WizGradientFromCenterHorizontal',
            '(incompatible)': 'ChartStringId.IncompatibleSeriesView',
            'Standard Error Bars': 'ChartStringId.IndStandardErrorBars',
            'Since the current Pie series view displays the series created using a series template, the specified series point can\'t be removed from the collection of exploded points. You need to use another Explode Mode instead.': 'ChartStringId.MsgInvalidExplodedModeRemove',
            'Chart Tools': 'ChartStringId.RibbonPageCategoryCaption',
            'LegendPointOptions reset': 'ChartStringId.TrnLegendPointOptionsReset',
            'Run Chart Wizard...': 'ChartStringId.CmdRunWizardMenuCaption',
            'Automatic DateTimeScaleMode can\'t work together with zooming and scrolling.': 'ChartStringId.MsgUnsupportedDateTimeScaleModeWithScrollingZooming',
            'Double-click to edit...': 'ChartStringId.MsgPaletteDoubleClickToEdit',
            'The thickness of the minor tickmark should be greater than 0.': 'ChartStringId.MsgIncorrectTickmarkMinorThickness',
            'Load\r\nTemplate': 'ChartStringId.CmdLoadTemplateMenuCaption',
            'Black and White': 'ChartStringId.PltBlackAndWhite',
            'Add': 'ChartStringId.MenuItemAdd',
            'LargeCheckerBoard': 'ChartStringId.WizHatchLargeCheckerBoard',
            'Stacked Column': 'ChartStringId.CmdCreateStackedBarChartMenuCaption',
            'It\'s impossible to swap autocreated and fixed series.': 'ChartStringId.MsgCantSwapSeries',
            'Series deleted': 'ChartStringId.TrnSeriesDeleted',
            'Clustered Stacked Cone': 'ChartStringId.CmdCreateConeSideBySideStackedBar3DChartMenuCaption',
            'Insert a bar chart.\r\n\r\nBar charts are the best chart type for comparing multiple values.': 'ChartStringId.CmdCreateRotatedBarChartDescription',
            '3-D Line': 'ChartStringId.CmdCreateLine3DChartMenuCaption',
            'Opulent': 'ChartStringId.PltOpulent',
            'Create a template with the same setting as the current chart.': 'ChartStringId.CmdSaveAsTemplateDescription',
            'ExplodedPointsFilters changed': 'ChartStringId.TrnExplodedPointsFilters',
            'The MeasureUnit property can\'t be modified in both the automatic and continuous numeric scale modes.': 'ChartStringId.MsgIncorrectNumericMeasureUnitPropertyUsing',
            'Spline Area Stacked 100%': 'ChartStringId.SvnSplineFullStackedArea',
            'Pane can\'t be set to null for the PaneAnchorPoint object.': 'ChartStringId.MsgNullPaneAnchorPointPane',
            'Empty Legend': 'ChartStringId.LegendEmptyText',
            'Series point can\'t have a relation to itself.': 'ChartStringId.MsgSelfRelatedSeriesPoint',
            'The bar depth should be greater than 0.': 'ChartStringId.MsgIncorrectBarDepth',
            'Axis of values': 'ChartStringId.AxisYDefaultTitle',
            'Tool Tip Position can\'t be null.': 'ChartStringId.MsgIncorrectToolTipPosition',
            'Trek': 'ChartStringId.PltTrek',
            'Flow': 'ChartStringId.PltFlow',
            'Apex': 'ChartStringId.PltApex',
            'Blue': 'ChartStringId.PltBlue',
            'The bar width should be greater than 0.': 'ChartStringId.MsgIncorrectBarWidth',
            'Chart Titles': 'ChartStringId.WizChartTitlesPageName',
            'The {0} value level isn\'t supported by the {1}.': 'ChartStringId.MsgUnsupportedValueLevel',
            'Exact workdays changed': 'ChartStringId.TrnExactWorkdaysChanged',
            'File \'{0}\' isn\'t found.': 'ChartStringId.MsgFileNotFound',
            'Bollinger Bands': 'ChartStringId.IndBollingerBands',
            'The "SynchronizePointOptions" property can\'t be set at runtime.': 'ChartStringId.MsgSynchronizePointOptionsSettingRuntimeError',
            'The points count should be greater than 1.': 'ChartStringId.MsgIncorrectPointsCount',
            'The {0} property should be greater than 0.': 'ChartStringId.MsgIncorrectRangeControlClientSpacing',
            'Chart title deleted': 'ChartStringId.TrnChartTitleDeleted',
            'Regression Line': 'ChartStringId.IndRegressionLine',
            'Fibonacci Indicator': 'ChartStringId.IndFibonacciIndicator',
            'Point Labels': 'ChartStringId.WizSeriesLabelsPageName',
            'Mass Index': 'ChartStringId.IndMassIndex',
            'by {0} with "{1}"': 'ChartStringId.IncompatibleSeriesMessage',
            'Displays the trend of the percentage each value contributes over time or categories.\r\n\r\nUse it to emphasize the trend in the proportion of each series.': 'ChartStringId.CmdCreateFullStackedAreaChartDescription',
            'Candle Stick': 'ChartStringId.CmdCreateCandleStickChartMenuCaption',
            '100% Stacked Pyramid': 'ChartStringId.CmdCreatePyramidFullStackedBar3DChartMenuCaption',
            'There is no panes to anchor to, because the chart\'s diagram type doesn\'t support panes.': 'ChartStringId.IncorrectDiagramTypeToolTipText',
            'A summary function with the name \'{0}\' is not registered.': 'ChartStringId.MsgSummaryFunctionIsNotRegistered',
            'Spline Area Stacked': 'ChartStringId.SvnSplineStackedArea',
            'Swift Plot': 'ChartStringId.SvnSwiftPlot',
            'Combine the advantages of both the Stacked Cylinder and Clustered Cylinder chart types, so that you can stack different cylinders, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateCylinderSideBySideStackedBar3DChartDescription',
            'Exploded points changed': 'ChartStringId.TrnExplodedPoints',
            '{0} data filter(s)': 'ChartStringId.WizDataFiltersEntered',
            'Clustered Column': 'ChartStringId.CmdCreateBarChartMenuCaption',
            'Yellow Orange': 'ChartStringId.PltYellowOrange',
            'Polar Range Area': 'ChartStringId.SvnPolarRangeArea',
            'The max limit of the strip should be greater than the min limit.': 'ChartStringId.MsgIncorrectStripMaxLimit',
            'Combine the advantages of both the 100% Stacked Cone and Clustered Cone chart types, so that you can stack different cones, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateConeSideBySideFullStackedBar3DChartDescription',
            'The PivotGridDataSourceOptions.{0} property is available only if the chart\'s data source is a PivotGrid.': 'ChartStringId.MsgPivotGridDataSourceOptionsNotSupportedProperty',
            'The {0} argument scale type is incompatible with the {1} series view.': 'ChartStringId.MsgIncompatibleArgumentScaleType',
            'It\'s impossible to set the sorting key\'s value to {0}.': 'ChartStringId.MsgInvalidSortingKey',
            'The primary axis can\'t be deleted. If you want to hide it, set its Visible property to false.': 'ChartStringId.IODeleteAxis',
            'The axis thickness should be greater than 0.': 'ChartStringId.MsgIncorrectAxisThickness',
            '100% Stacked Cone': 'ChartStringId.CmdCreateConeFullStackedBar3DChartMenuCaption',
            'Clustered 100% Stacked Pyramid': 'ChartStringId.CmdCreatePyramidSideBySideFullStackedBar3DChartMenuCaption',
            'The percent value should be greater than or equal to 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectPercentValue',
            'Illegal Operation': 'ChartStringId.IOCaption',
            'Area Step Stacked 100%': 'ChartStringId.SvnFullStackedStepArea',
            'Bar 3D Stacked 100%': 'ChartStringId.SvnFullStackedBar3D',
            'Pane Anchor Point': 'ChartStringId.AnnotationPaneAnchorPoint',
            'Gray': 'ChartStringId.AppGray',
            'Dark': 'ChartStringId.AppDark',
            'Displayss series on a circular diagram on the basis of angles as filled areas, defined by data points with two values that are minimum and maximum limits. Use it when you need to accentuate the delta between the start and end values.': 'ChartStringId.CmdCreateRadarRangeAreaChartDescription',
            'The specified overlapping mode isn\'t supported by the current series view.': 'ChartStringId.MsgUnsupportedResolveOverlappingMode',
            'Pie 3D': 'ChartStringId.SvnPie3D',
            'Stock': 'ChartStringId.SvnStock',
            'Hit testing for 3D Chart Types isn\'t supported. So, this method is supported for 2D Chart Types only.': 'ChartStringId.MsgCalcHitInfoNotSupported',
            'Right-bottom': 'ChartStringId.WizDockCornerRightBottom',
            'DashedVertical': 'ChartStringId.WizHatchDashedVertical',
            'This group was already unregistered.': 'ChartStringId.MsgUnregisterGroupError',
            '100% Stacked Area in 3-D': 'ChartStringId.CmdCreateFullStackedArea3DChartMenuCaption',
            'Assign this pane to the\r\nSeries.View.Pane property,\r\nto show a series on this pane': 'ChartStringId.MsgEmptyPaneTextForHorizontalLayout',
            'The specified value to convert to the scale\'s internal representation isn\'t compatible with the current scale type.': 'ChartStringId.MsgInvalidScaleType',
            'Show the variation in the price of stock over the course of a day. The Open and Close prices are represented by a filled rectangle, and the Low and High prices are represented by the bottom and top values of the vertical line which is shown at each point.': 'ChartStringId.CmdCreateCandleStickChartDescription',
            'JPEG Image': 'ChartStringId.CmdExportToJPEGDescription',
            'DarkHorizontal': 'ChartStringId.WizHatchDarkHorizontal',
            'The percentage accuracy should be greater than 0.': 'ChartStringId.MsgIncorrectPercentageAccuracy',
            'Can\'t set the PaneAnchorPoint\'s pane, because the specified pane isn\'t default and isn\'t contained in the diagram\'s collection of panes.': 'ChartStringId.MsgIncorrectPaneAnchorPointPane',
            'Polar Point': 'ChartStringId.SvnPolarPoint',
            'The argument of the financial indicator\'s point can\'t be set to null.': 'ChartStringId.MsgNullFinancialIndicatorArgument',
            'Funnel 3D': 'ChartStringId.SvnFunnel3D',
            'Print and Export': 'ChartStringId.RibbonPrintExportGroupCaption',
            'Weighted Moving Average': 'ChartStringId.IndWeightedMovingAverage',
            'Portable Network Graphics': 'ChartStringId.CmdExportToPNGDescription',
            '(None)': 'ChartStringId.WizNoBackImage',
            'Range Area': 'ChartStringId.SvnRangeArea',
            'MinValueInternal can\'t be set to NaN and Infinity values.': 'ChartStringId.MsgIncorrectAxisRangeMinValueInternal',
            'Holidays changed': 'ChartStringId.TrnHolidaysChanged',
            'Constant Lines changed': 'ChartStringId.TrnConstantLinesChanged',
            'Compare the percentage that each value contributes to a total across categories by using vertical rectangles.\r\n\r\nUse it to emphasize the proportion of each data series.': 'ChartStringId.CmdCreateFullStackedBarChartDescription',
            'Combine the advantages of both the 100% Stacked Pyramid and Clustered Pyramid chart types, so that you can stack different pyramids, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreatePyramidSideBySideFullStackedBar3DChartDescription',
            'Grayscale': 'ChartStringId.PltGrayscale',
            'The minimum and maximum limits of the Strip can not be the same.': 'ChartStringId.MsgIncorrectStripConstructorParameters',
            'Panes changed': 'ChartStringId.TrnXYDiagramPanesChanged',
            'Series title deleted': 'ChartStringId.TrnSeriesTitleDeleted',
            'DashStyle.Empty can only be assigned to a constant line\'s LineStyle property.': 'ChartStringId.MsgIncorrectDashStyle',
            '100% Stacked Step Area': 'ChartStringId.CmdCreateFullStackedStepAreaChartMenuCaption',
            'Owner of the parent series point can\'t be null and must be of the Series type.': 'ChartStringId.MsgIncorrectParentSeriesPointOwner',
            'Relative Strength Index': 'ChartStringId.IndRelativeStrengthIndex',
            'Clustered 100% Stacked Cone': 'ChartStringId.CmdCreateConeSideBySideFullStackedBar3DChartMenuCaption',
            'The palette base color number should be greater than or equal to 0 and less than or equal to the total number of palette colors.': 'ChartStringId.MsgIncorrectPaletteBaseColorNumber',
            'You should specify all of the summary function parameters.': 'ChartStringId.MsgSummaryFunctionParameterIsNotSpecified',
            'Compare the percentage each value contributes to a total across categories using horizontal rectangles.\r\n\r\nUse it when the values on the chart represent durations or when the category text is very long.': 'ChartStringId.CmdCreateRotatedFullStackedBarChartDescription',
            '3-D Spline': 'ChartStringId.CmdCreateSpline3DChartMenuCaption',
            'Cannot set the EqualBarWidth property unless the series is added to the chart\'s collection.': 'ChartStringId.MsgIncorrectEqualBarWidthPropertyUsing',
            'Compare the percentage each value contributes to a total across categories.': 'ChartStringId.CmdCreateConeFullStackedBar3DChartDescription',
            'The nested doughnut inner indent should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectNestedDoughnutInnerIndent',
            'The arrow height should be greater than 0.': 'ChartStringId.MsgIncorrectArrowHeight',
            'Value must be greater than 0. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgInCorrectPercentageErrorBarsPercent',
            'The title indent should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectChartTitleIndent',
            'Radar Point': 'ChartStringId.SvnRadarPoint',
            'Legend Title': 'ChartStringId.LegendDefaultTitle',
            'Clustered 100% Stacked Column in 3-D': 'ChartStringId.CmdCreateSideBySideFullStackedBar3DChartMenuCaption',
            '{0} series': 'ChartStringId.AlternateTextSeriesText',
            'Use Ctrl with the left mouse button\r\nto scroll the chart.': 'ChartStringId.Msg2DScrollingToolTip',
            'The legend vertical indent should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectLegendVerticalIndent',
            'Polar': 'ChartStringId.CmdPolarGroupPlaceHolderMenuCaption',
            'The {0} is abstract, and so an object of this type can\'t be instantiated and added as a wizard page.': 'ChartStringId.MsgWizardAbstractPageType',
            'SeriesPointFilter': 'ChartStringId.DefaultSeriesPointFilterName',
            'You can\'t add any view type in this collection, because at least one view type must be available in the Wizard.': 'ChartStringId.MsgAddLastViewType',
            'Series Group': 'ChartStringId.StackedGroupPatternDescription',
            'Web Page': 'ChartStringId.CmdExportToHTMLDescription',
            'Clustered Cylinder': 'ChartStringId.CmdCreateCylinderBar3DChartMenuCaption',
            'The shape fillet should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectShapeFillet',
            'The specified object isn\'t a ChartControl.': 'ChartStringId.MsgNotChartControl',
            '3-D Clustered Column': 'ChartStringId.CmdCreateBar3DChartMenuCaption',
            'Max count should be greater than 0.': 'ChartStringId.MsgInvalidMaxCount',
            'The grid alignment should be greater than or equal to the current measure unit.': 'ChartStringId.MsgIncorrectNumericGridAlignment',
            'Enable zooming (true)': 'ChartStringId.WizEnableZoomingTrue',
            'Custom Axis Labels changed': 'ChartStringId.TrnCustomAxisLabelChanged',
            'DateTimeScaleMode isn\'t supported for the GanttDiagram.': 'ChartStringId.MsgUnsupportedDateTimeScaleModeForGanttDiagram',
            'The Trees': 'ChartStringId.PltTheTrees',
            'Other Charts': 'ChartStringId.CmdCreateOtherSeriesTypesChartPlaceHolderMenuCaption',
            'The type of the "{0}" value data member isn\'t compatible with the {1} scale.': 'ChartStringId.MsgIncompatibleValueDataMember',
            'Stacked Line in 3-D': 'ChartStringId.CmdCreateStackedLine3DChartMenuCaption',
            'Can\'t set the series Legend, because the specified legend isn\'t contained in the charts\'s collection of legends.': 'ChartStringId.MsgIncorrectSeriesLegend',
            'Export to XLS': 'ChartStringId.CmdExportToXLSMenuCaption',
            'Spline Area 3D Stacked 100%': 'ChartStringId.SvnSplineAreaFullStacked3D',
            'The dimension of the simple diagram should be greater than 0 and less than 100.': 'ChartStringId.MsgIncorrectSimpleDiagramDimension',
            'The top N threshold percent should be greater than 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectTopNThresholdPercent',
            'Stacked Cylinder': 'ChartStringId.CmdCreateCylinderStackedBar3DChartMenuCaption',
            'Pane deleted': 'ChartStringId.TrnPaneDeleted',
            'Displays the contribution of each value to a total.\r\n\r\nUse it when the values can be added together or when you have only one data series and all values are positive.': 'ChartStringId.CmdCreatePieChartDescription',
            'Cannot set the BarDistance property unless the series is added to the chart\'s collection.': 'ChartStringId.MsgIncorrectBarDistancePropertyUsing',
            'Assign this pane to the Series.View.Pane property,\r\nto show a series on this pane': 'ChartStringId.MsgEmptyPaneTextForVerticalLayout',
            'Low Value': 'ChartStringId.LowValuePatternDescription',
            'The top N threshold value should be greater than 0.': 'ChartStringId.MsgIncorrectTopNThresholdValue',
            'PNG': 'ChartStringId.CmdExportToPNGMenuCaption',
            'ZigZag': 'ChartStringId.WizHatchZigZag',
            'The specified summary function string is in an incorrect format.': 'ChartStringId.MsgIncorrectSummaryFunction',
            'Line Stacked 100%': 'ChartStringId.SvnFullStackedLine',
            'Area Stacked 100%': 'ChartStringId.SvnFullStackedArea',
            'Load a chart from template': 'ChartStringId.CmdLoadTemplateDescription',
            '{0}, {1}pt, {2}': 'ChartStringId.FontFormat',
            'The array of values must contain either numerical or date-time values.': 'ChartStringId.MsgIncorrectArrayOfValues',
            'Compare the contribution of each value to a total across categories and display stacked columns in 3-D format.': 'ChartStringId.CmdCreateStackedBar3DChartDescription',
            'Range Area 3D': 'ChartStringId.SvnRangeArea3D',
            'Show how much values have changed for different points of the same series.': 'ChartStringId.CmdCreateStepAreaChartDescription',
            'Compare the contribution of each value to a total across categories by using vertical rectangles.\r\n\r\nUse it to emphasize the total across series for one category.': 'ChartStringId.CmdCreateStackedBarChartDescription',
            '100% Stacked Spline Area in 3-D': 'ChartStringId.CmdCreateFullStackedSplineArea3DChartMenuCaption',
            'Series point can\'t be set to null for the SeriesPointAncherPoint object.': 'ChartStringId.MsgNullAnchorPointSeriesPoint',
            'Spline Area': 'ChartStringId.SvnSplineArea',
            'The column indent should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectPieSeriesLabelColumnIndent',
            'Secondary AxisX ': 'ChartStringId.SecondaryAxisXPrefix',
            'The start angle value should be greater than or equal to -360 and less than or equal to 360 degrees.': 'ChartStringId.MsgIncorrectStartAngle',
            ' showing {0}': 'ChartStringId.AlternateTextSeriesPlaceholder',
            'Copy all the data from the bound datasource to the chart, and then unbind the chart.': 'ChartStringId.VerbDataSnapshotDescription',
            'Doughnut': 'ChartStringId.CmdCreateDoughnutChartMenuCaption',
            'Scatter Line': 'ChartStringId.CmdCreateScatterLineChartMenuCaption',
            'Enable zooming (false)': 'ChartStringId.WizEnableZoomingFalse',
            'A value {0} isn\'t compatible with the current value scale type.': 'ChartStringId.MsgIncompatibleValue',
            'Ease Of Movement': 'ChartStringId.IndEaseOfMovement',
            'Value Duration': 'ChartStringId.ValueDurationPatternDescription',
            'Concourse': 'ChartStringId.PltConcourse',
            'Line 3D Stacked 100%': 'ChartStringId.SvnFullStackedLine3D',
            'The ScaleMode property can\'t be set for the axis Y.': 'ChartStringId.MsgAttemptToSetScaleModeForAxisY',
            'Behave similar to 3D Area Chart, but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateSplineArea3DChartDescription',
            'The range of a polar X-axis can\'t be changed.': 'ChartStringId.MsgPolarAxisXRangeChanged',
            'The {0} object isn\'t a data adapter.': 'ChartStringId.MsgIncorrectDataAdapter',
            'The specified view type is already present in the collection.': 'ChartStringId.MsgAddPresentViewType',
            'The specified {0} parameter type doesn\'t match the appropriate scale type, which is {1} for this axis.': 'ChartStringId.MsgDiagramToPointIncorrectValue',
            'Left-top': 'ChartStringId.WizDockCornerLeftTop',
            'Radar Range Area': 'ChartStringId.SvnRadarRangeArea',
            'An argument {0} isn\'t compatible with the current argument scale type.': 'ChartStringId.MsgIncompatibleArgument',
            'Bar 3D Stacked': 'ChartStringId.SvnStackedBar3D',
            'Displays series as areas on a diagram, so that the value of each data point is aggregated with the underlying data points\' values.': 'ChartStringId.CmdCreateStackedArea3DChartDescription',
            'Clear the chart\'s datasource.': 'ChartStringId.VerbClearDataSourceDescription',
            'Step Area 3D': 'ChartStringId.SvnStepArea3D',
            'The border width should be greater than 0.': 'ChartStringId.MsgIncorrectBorderThickness',
            'Displays all series stacked and is useful when it is necessary to compare how much each series adds to the total aggregate value for specific arguments (as percents).': 'ChartStringId.CmdCreateFullStackedLine3DChartDescription',
            'Area 3D Stacked 100%': 'ChartStringId.SvnFullStackedArea3D',
            'The pie depth should be greater than 0 and less than or equal to 100, since its value is measured in percents.': 'ChartStringId.MsgIncorrectPieDepth',
            'Polar Area': 'ChartStringId.SvnPolarArea',
            'AVERAGE': 'ChartStringId.FunctionNameAverage',
            'Compare values across categories by using vertical rectangles.\r\n\r\nUse it when the order of categories is not important or for displaying item counts such as a histogram.': 'ChartStringId.CmdCreateBarChartDescription',
            'Stacked Step Area': 'ChartStringId.CmdCreateStackedStepAreaChartMenuCaption',
            'The line tension percentage should be greater than or equal to 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectLineTensionPercent',
            'Step Area': 'ChartStringId.SvnStepArea',
            'Step Line': 'ChartStringId.SvnStepLine',
            'The specified series point doesn\'t belong to the current Pie series views\' collection of series points, and so it can\'t be added to the collection of exploded points.': 'ChartStringId.MsgInvalidExplodedSeriesPoint',
            'The Bounciness property value should be greater than 1. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgIncorrectBounceEaseBounciness',
            'You can\'t manually change the series point\'s argument, because a chart is bound to data.': 'ChartStringId.MsgDenyChangeSeriesPointArgument',
            'Combine the advantages of both the 100% Stacked Cylinder and Clustered Cylinder chart types, so that you can stack different cylinders, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateCylinderSideBySideFullStackedBar3DChartDescription',
            'Displays the contribution of each value to a total while comparing series with one doughnut nested in another one.': 'ChartStringId.CmdCreateNestedDoughnutChartDescription',
            'Can\'t set the series view\'s pane, because the specified pane isn\'t default and isn\'t contained in the diagram\'s collection of panes.': 'ChartStringId.MsgIncorrectSeriesViewPane',
            'Compare the percentage values of different point arguments in the same series, and illustrate these values as easy to understand pie slices, but with a hole in its center.': 'ChartStringId.CmdCreateDoughnut3DChartDescription',
            '100% Stacked Spline Area': 'ChartStringId.CmdCreateFullStackedSplineAreaChartMenuCaption',
            'Value must be greater than or equal to 0. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgIncorrectFixedErrorBarsPositiveError',
            'Average True Range': 'ChartStringId.IndAverageTrueRange',
            'Customize the diagram\'s panes.\r\nNote that you may select a pane by clicking it in the chart preview.': 'ChartStringId.WizPanesPageDescription',
            'The palette with the {0} name already exists in the repository.': 'ChartStringId.MsgAddExistingPaletteError',
            'Data Snapshot': 'ChartStringId.VerbDataSnapshot',
            'Displays series as filled area on a circular diagram on the basis of angles.': 'ChartStringId.CmdCreatePolarAreaChartDescription',
            'Step Area in 3-D': 'ChartStringId.CmdCreateStepArea3DChartMenuCaption',
            'The shadow size should be greater than 0.': 'ChartStringId.MsgIncorrectShadowSize',
            'Series point\'s ID must be unique.': 'ChartStringId.MsgSeriesPointIDNotUnique',
            '2-D Pie': 'ChartStringId.CmdPie2DGroupPlaceHolderMenuCaption',
            'The series distance should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectSeriesDistance',
            'The legend marker size should be greater than 0 and less than 1000.': 'ChartStringId.MsgIncorrectLegendMarkerSize',
            'Show trends for several series and compare their values for the same point arguments on a circular diagram on the basis of angles. The series points are drawn in the circular grid in the same order that they have in the series point collection.': 'ChartStringId.CmdCreateScatterPolarLineChartDescription',
            'Use the drop-down list at the top, to set a palette for the chart. It determines the overall look of the chart, by painting its key elements.': 'ChartStringId.CmdChangeAppearancePlaceHolderDescription',
            'The annotation width should be greater than 0.': 'ChartStringId.MsgIncorrectAnnotationWidth',
            'Displays all points from different series in a stacked manner and is useful when it is necessary to compare how much each series adds to the total aggregate value for specific arguments.': 'ChartStringId.CmdCreateStackedLine3DChartDescription',
            'Text Annotation ': 'ChartStringId.TextAnnotationPrefix',
            'The default pane can\'t be deleted.': 'ChartStringId.IODeleteDefaultPane',
            'Green Yellow': 'ChartStringId.PltGreenYellow',
            'Radar Area': 'ChartStringId.CmdCreateRadarAreaChartMenuCaption',
            'DiagonalCross': 'ChartStringId.WizHatchDiagonalCross',
            'DiagonalBrick': 'ChartStringId.WizHatchDiagonalBrick',
            'The types of the MinValue and MaxValue don\'t match.': 'ChartStringId.MsgMinMaxDifferentTypes',
            'You can add only Indicator objects to this collection.': 'ChartStringId.MsgIncorrectIndicator',
            'TIFF': 'ChartStringId.CmdExportToTIFFMenuCaption',
            'Step Line 3D': 'ChartStringId.SvnStepLine3D',
            'The Exponent property value should be greater than negative infinity and less than positive infinity.': 'ChartStringId.MsgIncorrectExponentialEaseExponent',
            'The MeasureUnit property can\'t be set for the axis Y.': 'ChartStringId.MsgMeasureUnitCanNotBeSetForAxisY',
            'Save a chart to an XML file.': 'ChartStringId.VerbSaveLayoutDescription',
            'Range Bar': 'ChartStringId.SvnOverlappedRangeBar',
            'Microsoft Excel 2000-2003 Work Book': 'ChartStringId.CmdExportToXLSDescription',
            'Annotation': 'ChartStringId.DefaultAnnotation',
            'Chart layout loaded': 'ChartStringId.TrnLoadLayout',
            'Incorrect transformation matrix.': 'ChartStringId.MsgIncorrectTransformationMatrix',
            'SmallCheckerBoard': 'ChartStringId.WizHatchSmallCheckerBoard',
            'Secondary AxisY ': 'ChartStringId.SecondaryAxisYPrefix',
            'The number of minor count should be greater than 0 and less than 100.': 'ChartStringId.MsgIncorrectMinorCount',
            'The ProcessMissingPoints property operates with the X-axis scale only.': 'ChartStringId.MsgProcessMissingPointsForValueAxis',
            'The Chart Designer is invoked to help you adjust the main chart settings in one place.': 'ChartStringId.CmdRunDesignerDescription',
            'Palettes Editor': 'ChartStringId.MsgPaletteEditorTitle',
            'Slipstream': 'ChartStringId.PltSlipstream',
            'Parent and child points must belong to the same series.': 'ChartStringId.MsgIncorrectSeriesOfParentAndChildPoints',
            'FromCenter': 'ChartStringId.WizGradientFromCenter',
            'Legends changed': 'ChartStringId.TrnLegendsChanged',
            'Triangular Moving Average': 'ChartStringId.IndTriangularMovingAverage',
            '3-D Cone': 'ChartStringId.CmdCreateConeManhattanBarChartMenuCaption',
            'Choose a palette to color series or their data points. Also choose the style, which specifies the chart\'s appearance depending on the current palette.': 'ChartStringId.WizAppearancePageDescription',
            'The Alignment can\'t be set to Alignment.Zero for the secondary axis.': 'ChartStringId.MsgInvalidZeroAxisAlignment',
            'SolidDiamond': 'ChartStringId.WizHatchSolidDiamond',
            'Stretch (a chart is stretched or shrunk to fit the page\r\non which it is printed)': 'ChartStringId.PrintSizeModeStretch',
            'Show activity columns from different series grouped by their arguments. Each column represents a range of data with two values for each argument value.': 'ChartStringId.CmdCreateSideBySideRangeBarChartDescription',
            'Displays each row or column of data as a 3-D ribbon on three axes.': 'ChartStringId.CmdCreateLine3DChartDescription',
            'The \'{0}\' summary function is incompatible with the {1} scale.': 'ChartStringId.MsgIncompatibleSummaryFunction',
            'This property is intended for internal use only. You\'re not allowed to change its value.': 'ChartStringId.MsgInternalPropertyChangeError',
            'the view type': 'ChartStringId.MsgIncompatibleByViewType',
            'This control doesn\'t contain the specified chart.': 'ChartStringId.MsgNotBelongingChart',
            'The fixed series indent should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectSeriesIndentFixed',
            '100% Stacked Column in 3-D': 'ChartStringId.CmdCreateFullStackedBar3DChartMenuCaption',
            'Current: Office\r\n\r\nChange the palette for the current chart.': 'ChartStringId.CmdChangePalettePlaceHolderDescription',
            'Displays trend overtime (dates, years) or ordered categories. Useful when there are many data points and the order is important.': 'ChartStringId.CmdCreateLineChartDescription',
            'All Holidays': 'ChartStringId.AllHolidays',
            'Label ': 'ChartStringId.CustomAxisLabelPrefix',
            'LeftToRight': 'ChartStringId.WizGradientLeftToRight',
            'The horizontal scroll percent should be greater than or equal to -{0} and less than or equal to {0}.': 'ChartStringId.MsgIncorrectHorizontalScrollPercent',
            'The Chart Wizard is invoked to help you adjust the main chart settings in one place.': 'ChartStringId.CmdRunWizardDescription',
            'Chart Wizard': 'ChartStringId.WizErrorMessageTitle',
            'The angle of the annotation should be greater than or equal to -360 and less than or equal to 360.': 'ChartStringId.MsgIncorrectTextAnnotationAngle',
            'The stock level line length value should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectStockLevelLineLengthValue',
            '3-D Pie': 'ChartStringId.CmdPie3DGroupPlaceHolderMenuCaption',
            'Insert a line chart.\r\n\r\nLine charts are used to display trends overtime.': 'ChartStringId.CmdCreateLineChartPlaceHolderDescription',
            'Value_2': 'ChartStringId.WizValueLevelValue_2',
            'Value_1': 'ChartStringId.WizValueLevelValue_1',
            'Clustered Range Column': 'ChartStringId.CmdCreateSideBySideRangeBarChartMenuCaption',
            'Doughnut in 3-D': 'ChartStringId.CmdCreateDoughnut3DChartMenuCaption',
            'Invalid datasource type (no supported interfaces are implemented).': 'ChartStringId.MsgInvalidDataSource',
            'WideDownwardDiagonal': 'ChartStringId.WizHatchWideDownwardDiagonal',
            'Spline Area 3D Stacked': 'ChartStringId.SvnSplineAreaStacked3D',
            'Templates': 'ChartStringId.RibbonTemplatesGroupCaption',
            '{0} argument scale type cannot be specified, because the existing exploded point filters don\'t correspond to it.': 'ChartStringId.MsgIncorrectPieArgumentScaleType',
            'HideOverlapping': 'ChartStringId.WizResolveOverlappingModeHideOverlapping',
            'Secondary axes X changed': 'ChartStringId.TrnSecondaryAxesXChanged',
            'Close Value': 'ChartStringId.CloseValuePatternDescription',
            'The line thickness should be greater than 0.': 'ChartStringId.MsgIncorrectLineThickness',
            'An invalid chart palette file': 'ChartStringId.MsgPaletteEditorInvalidFile',
            'Combine the advantages of both the Stacked Bar and Clustered Bar chart types, so that you can stack different bars, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateRotatedSideBySideStackedBarChartDescription',
            'LeftColumn': 'ChartStringId.WizPositionLeftColumn',
            'Crosshair Position can\'t be null.': 'ChartStringId.MsgIncorrectCrosshairPosition',
            'The dimension of the {0} summary function isn\'t compatible with the {1} series view ({2} but should be {3}).': 'ChartStringId.MsgIncompatibleSummaryFunctionDimension',
            'Can\'t set the indicator\'s pane, because the specified pane isn\'t default and isn\'t contained in the diagram\'s collection of panes.': 'ChartStringId.MsgIncorrectIndicatorPane',
            'Relative': 'ChartStringId.WizShapePositionKindRelative',
            'Radar': 'ChartStringId.CmdRadarGroupPlaceHolderMenuCaption',
            'OutlinedDiamond': 'ChartStringId.WizHatchOutlinedDiamond',
            'Simple Moving Average': 'ChartStringId.IndSimpleMovingAverage',
            'Invalid placeholder': 'ChartStringId.InvalidPlaceholder',
            'Trend Line': 'ChartStringId.IndTrendLine',
            'Chart Anchor Point': 'ChartStringId.AnnotationChartAnchorPoint',
            'The legend text offset should be greater than or equal to 0 and less than 1000.': 'ChartStringId.MsgIncorrectLegendTextOffset',
            'The envelope percent should be greater than 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectEnvelopePercent',
            'Displays the trend of the percentage each value contributes over time or ordered categories.': 'ChartStringId.CmdCreateFullStackedLineChartDescription',
            'The array of values is empty.': 'ChartStringId.MsgEmptyArrayOfValues',
            'Clustered 100% Stacked Column': 'ChartStringId.CmdCreateSideBySideFullStackedBarChartMenuCaption',
            'Customize the diagram\'s properties.': 'ChartStringId.WizDiagramPageDescription',
            '100% Stacked Bar': 'ChartStringId.CmdCreateRotatedFullStackedBarChartMenuCaption',
            'Since the current Pie series view displays the series created using a series template, the specified series point can\'t be added to the collection of exploded points. You need to use another Explode Mode instead.': 'ChartStringId.MsgInvalidExplodedModeAdd',
            'Technic': 'ChartStringId.PltTechnic',
            'The "PointOptions" property can\'t be set at runtime.': 'ChartStringId.MsgPointOptionsSettingRuntimeError',
            'Single File Web Page': 'ChartStringId.CmdExportToMHTDescription',
            'Can\'t set the constant line Legend, because the specified legend isn\'t contained in the charts\'s collection of legends.': 'ChartStringId.MsgIncorrectConstantLineLegend',
            'Constant Line ': 'ChartStringId.ConstantLinePrefix',
            'This chart diagram can not be displayed in a Range Control.': 'ChartStringId.InvalidRangeControlText',
            'Violet': 'ChartStringId.PltViolet',
            'Can\'t set the indicator\'s Y-axis, because the specified axis isn\'t primary and isn\'t contained in the diagram\'s collection of secondary Y-axes.': 'ChartStringId.MsgIncorrectIndicatorAxisY',
            'The page of the {0} type is already registered. You can\'t add more than one page of a particular type.': 'ChartStringId.MsgWizardNonUniquePageType',
            'To enter data points manually, use the Points tab. Or, use other tabs, to specify data source settings for individual or auto-created series.': 'ChartStringId.WizDataPageDescription',
            'Stacked Bar': 'ChartStringId.CmdCreateRotatedStackedBarChartMenuCaption',
            'ToCenterHorizontal': 'ChartStringId.WizGradientToCenterHorizontal',
            'Stacked Pyramid': 'ChartStringId.CmdCreatePyramidStackedBar3DChartMenuCaption',
            'date-time': 'ChartStringId.ScaleTypeDateTime',
            'Can\'t set the series view\'s X-axis, because the specified axis isn\'t primary and isn\'t contained in the diagram\'s collection of secondary X-axes.': 'ChartStringId.MsgIncorrectSeriesViewAxisX',
            'Can\'t set the series view\'s Y-axis, because the specified axis isn\'t primary and isn\'t contained in the diagram\'s collection of secondary Y-axes.': 'ChartStringId.MsgIncorrectSeriesViewAxisY',
            'Summary function changed': 'ChartStringId.TrnSummaryFunctionChanged',
            'Clustered Stacked Column in 3-D': 'ChartStringId.CmdCreateSideBySideStackedBar3DChartMenuCaption',
            'BMP': 'ChartStringId.CmdExportToBMPMenuCaption',
            'Run Chart Designer...': 'ChartStringId.CmdRunDesignerMenuCaption',
            'The grid spacing of a polar X-axis can\'t be changed.': 'ChartStringId.MsgPolarAxisXGridSpacingChanged',
            '100% Stacked Area': 'ChartStringId.CmdCreateFullStackedAreaChartMenuCaption',
            'Use Ctrl with the left mouse button\r\nto rotate the annotation.': 'ChartStringId.MsgAnnotationRotationToolTip',
            'Run Wizard...': 'ChartStringId.VerbWizard',
            'Area Step Stacked': 'ChartStringId.SvnStackedStepArea',
            'BackwardDiagonal': 'ChartStringId.WizHatchBackwardDiagonal',
            'The perspective angle should be greater than or equal to 0 and less than 180.': 'ChartStringId.MsgIncorrectPerspectiveAngle',
            'The collection doesn\'t contain the specified item.': 'ChartStringId.MsgItemNotInCollection',
            'RightColumn': 'ChartStringId.WizPositionRightColumn',
            'Series Point Anchor Point': 'ChartStringId.AnnotationSeriesPointAnchorPoint',
            'Mouse Position': 'ChartStringId.ToolTipMousePosition',
            'Insert a pie chart.\r\n\r\nPie charts display the contribution of each value to a total.\r\n\r\nUse it when values can be added together or when you have only one data series and all values are positive.': 'ChartStringId.CmdCreatePieChartPlaceHolderDescription',
            'Moving Average Convergence/Divergence': 'ChartStringId.IndMovingAverageConvergenceDivergence',
            'LargeConfetti': 'ChartStringId.WizHatchLargeConfetti',
            'It\'s necessary to specify {0} value data members for the current series view.': 'ChartStringId.MsgIncorrectValueDataMemberCount',
            'The same element is repeated several times in the order array.': 'ChartStringId.MsgOrderRepeatedElementFound',
            'Behaves similarly to the Stacked Area Chart but connects data points using horizontal and vertical lines.': 'ChartStringId.CmdCreateStackedStepAreaChartDescription',
            'Shape Position can\'t be null.': 'ChartStringId.MsgIncorrectShapePosition',
            'Clustered Cone': 'ChartStringId.CmdCreateConeBar3DChartMenuCaption',
            'Bar Stacked': 'ChartStringId.SvnStackedBar',
            'TopLeftToBottomRight': 'ChartStringId.WizGradientTopLeftToBottomRight',
            'The BarSeriesLabelPosition.Top value isn\'t supported for this series view type.': 'ChartStringId.MsgIncorrectBarSeriesLabelPosition',
            'This property can\'t be customized at runtime.': 'ChartStringId.MsgDesignTimeOnlySetting',
            'Spline 3D': 'ChartStringId.SvnSpline3D',
            'Displays horizontal bars along the time axis. Each bar represents a separate event with the start and end values, hence these charts are used to track different activities during the time frame.\r\n\r\nUse it when it\'s necessary to show activity bars from different series one above another, to compare their duration.': 'ChartStringId.CmdCreateSideBySideGanttChartDescription',
            'The BounceCount property value should be greater than or equal to zero.': 'ChartStringId.MsgIncorrectBounceEaseBounceCount',
            'Series...': 'ChartStringId.VerbSeries',
            'The series view\'s X-axis can\'t be set to null.': 'ChartStringId.MsgNullSeriesViewAxisX',
            'The series view\'s Y-axis can\'t be set to null.': 'ChartStringId.MsgNullSeriesViewAxisY',
            'Behaves similarly to the 100% Stacked Area Chart but connects data points using horizontal and vertical lines.': 'ChartStringId.CmdCreateFullStackedStepAreaChartDescription',
            'The summary function \'{0}\' accepts {1} parameters instead of {2}.': 'ChartStringId.MsgIncorrectSummaryFunctionParametersCount',
            'Workday': 'ChartStringId.Workday',
            'Clustered 100% Stacked Bar': 'ChartStringId.CmdCreateRotatedSideBySideFullStackedBarChartMenuCaption',
            'Clustered Stacked Column': 'ChartStringId.CmdCreateSideBySideStackedBarChartMenuCaption',
            'None (a chart is printed with the size identical to that\r\nshown on the form)': 'ChartStringId.PrintSizeModeNone',
            'Zoom (a chart is resized proportionally (without clipping),\r\nso that it best fits the page on which it is printed)': 'ChartStringId.PrintSizeModeZoom',
            'The precision of the percent value should be greater than 0.': 'ChartStringId.MsgIncorrectPercentPrecision',
            'Median Price': 'ChartStringId.IndMedianPrice',
            'The number of star points should be greater than 3 and less than 101.': 'ChartStringId.MsgIncorrectMarkerStarPointCount',
            'The value can\'t be equal to Double.NaN, Double.PositiveInfinity, or Double.NegativeInfinity.': 'ChartStringId.MsgIncorrectDoubleValue',
            'Radar Line': 'ChartStringId.SvnRadarLine',
            'Stacked Spline Area in 3-D': 'ChartStringId.CmdCreateStackedSplineArea3DChartMenuCaption',
            'The line width should be greater than 0.': 'ChartStringId.MsgIncorrectLineWidth',
            'The min value of the axis range should be less than its max value.': 'ChartStringId.MsgIncorrectAxisRange',
            'DataFilter': 'ChartStringId.DefaultDataFilterName',
            'The ProcessMissingPoints property can\'t be specified in the continuous scale mode.': 'ChartStringId.MsgProcessMissingPointsForContinuousScale',
            'Clustered Stacked Cylinder': 'ChartStringId.CmdCreateCylinderSideBySideStackedBar3DChartMenuCaption',
            'Displays the trend of the contribution of each value over time or categories.\r\n\r\nUse it to emphasize the trend in the total across series for one category.': 'ChartStringId.CmdCreateStackedAreaChartDescription',
            'Stacked Cone': 'ChartStringId.CmdCreateConeStackedBar3DChartMenuCaption',
            'Scale breaks changed': 'ChartStringId.TrnScaleBreaksChanged',
            'Graphics Interchange Format': 'ChartStringId.CmdExportToGIFDescription',
            'BottomToTop': 'ChartStringId.WizSeriesLabelTextOrientationBottomToTop',
            'Secondary axis X deleted': 'ChartStringId.TrnSecondaryAxisXDeleted',
            'MinValue can\'t be set to null.': 'ChartStringId.MsgIncorrectAxisRangeMinValue',
            'Can\'t set the AxisYCoordinate\'s axis, because the specified axis isn\'t primary and isn\'t contained in the diagram\'s collection of secondary Y-axes.': 'ChartStringId.MsgIncorrectAxisYCoordinateAxis',
            'Axis visibility changed': 'ChartStringId.TrnAxisVisibilityChanged',
            'Wizard': 'ChartStringId.RibbonWizardGroupCaption',
            'The angle should be greater than or equal to -360 and less than or equal to 360.': 'ChartStringId.MsgIncorrectRelativePositionAngle',
            '': 'ASPxReportsStringId.SearchDialog_Down_AccessKey',
            'Series Binding': 'ChartStringId.WizSeriesDataBindingPageName',
            'Clustered Gantt': 'ChartStringId.CmdCreateSideBySideGanttChartMenuCaption',
            'Compare values across categories and across series on three axes.\r\n\r\nUse it when the categories and series are equally important.': 'ChartStringId.CmdCreateManhattanBarChartDescription',
            'Doughnut 3D': 'ChartStringId.SvnDoughnut3D',
            'Preview and make changes to pages before printing.': 'ChartStringId.CmdPrintPreviewDescription',
            'The unregistered element is found.': 'ChartStringId.MsgOrderUnregisteredElementFound',
            'The arrow width should be always odd and greater than 0.': 'ChartStringId.MsgIncorrectArrowWidth',
            'Track different activities during the time frame.': 'ChartStringId.CmdCreateGanttChartDescription',
            'Construction': 'ChartStringId.WizConstructionGroupName',
            'Custom legend items changed': 'ChartStringId.TrnCustomLegendItemsChanged',
            'Yellow': 'ChartStringId.PltYellow',
            'SmallGrid': 'ChartStringId.WizHatchSmallGrid',
            'Revert the legend point options to their default values.': 'ChartStringId.VerbResetLegendPointOptionsDescription',
            'Scale Break ': 'ChartStringId.ScaleBreakPrefix',
            'Cannot set the BarDistanceFixed property unless the series is added to the chart\'s collection.': 'ChartStringId.MsgIncorrectBarDistanceFixedPropertyUsing',
            '2-D Column': 'ChartStringId.CmdColumn2DGroupPlaceHolderMenuCaption',
            'The MeasureUnit property can\'t be modified in both the automatic and continuous date-time scale modes.': 'ChartStringId.MsgIncorrectDateTimeMeasureUnitPropertyUsing',
            'Error Bars': 'ChartStringId.IndErrorBars',
            'Exploded': 'ChartStringId.ExplodedPointsDialogExplodedColumn',
            'The precision should be greater than or equal to 0.': 'ChartStringId.MsgIncorrectNumericPrecision',
            'Pane ': 'ChartStringId.XYDiagramPanePrefix',
            'In A Fog': 'ChartStringId.AppInAFog',
            'You can\'t manually change this series point collection, because a chart is bound to data.': 'ChartStringId.MsgDenyChangeSeriesPointCollection',
            'Blue Green': 'ChartStringId.PltBlueGreen',
            'Displays data as areas on a diagram, so that the value of each data point is stacked with all the other corresponding data points\' values.\r\n\r\nUse it for comparing the percentage values of several series for the same point arguments.': 'ChartStringId.CmdCreateFullStackedArea3DChartDescription',
            'Pivot Grid Datasource': 'ChartStringId.WizPivotGridDataSourcePageName',
            'Text Annotation': 'ChartStringId.TextAnnotation',
            'There are no visible panes to show in a chart.\r\nTry to set the chart\'s Diagram.DefaultPane.Visible property to True,\r\nor show other panes from the Diagram.Panes collection.': 'ChartStringId.MsgNoPanes',
            'Pie in 3-D': 'ChartStringId.CmdCreatePie3DChartMenuCaption',
            'An argument can\'t be empty.': 'ChartStringId.MsgEmptyArgument',
            'Combine the advantages of both the 100% Stacked Bar and Clustered Bar chart types, so you can stack different bars, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateRotatedSideBySideFullStackedBarChartDescription',
            'Can\'t create an image for the specified size.': 'ChartStringId.MsgIncorrectImageBounds',
            'Side By Side Range Bar': 'ChartStringId.SvnSideBySideRangeBar',
            'LightHorizontal': 'ChartStringId.WizHatchLightHorizontal',
            'Holiday': 'ChartStringId.Holiday',
            'Orange Red': 'ChartStringId.PltOrangeRed',
            'Line Stacked': 'ChartStringId.SvnStackedLine',
            'Area Stacked': 'ChartStringId.SvnStackedArea',
            'Child series point\'s ID must be positive or equal to zero.': 'ChartStringId.MsgIncorrectChildSeriesPointID',
            'The Springiness property value should be greater than or equal to zero. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgIncorrectElasticEaseSpringiness',
            'The ChartControl isn\'t found, or there are several charts on this control. To solve the problem, you should handle the WizardPage.InitializePage event and manually specify the chart.': 'ChartStringId.MsgInitializeChartNotFound',
            'Equity': 'ChartStringId.PltEquity',
            'Secondary axis Y deleted': 'ChartStringId.TrnSecondaryAxisYDeleted',
            'HorizontalBrick': 'ChartStringId.WizHatchHorizontalBrick',
            'Light': 'ChartStringId.AppLight',
            'Left-bottom': 'ChartStringId.WizDockCornerLeftBottom',
            'Open the Series Collection Editor.': 'ChartStringId.VerbSeriesDescription',
            'Clustered Stacked Bar': 'ChartStringId.CmdCreateRotatedSideBySideStackedBarChartMenuCaption',
            'auto': 'ChartStringId.ScaleTypeAuto',
            '2-D Line': 'ChartStringId.CmdLine2DGroupPlaceHolderMenuCaption',
            'The length of the order array isn\'t equal to the total number of registered elements.': 'ChartStringId.MsgOrderArrayLengthMismatch',
            'Owner of the child series point can\'t be null and must be of the Series type.': 'ChartStringId.MsgIncorrectChildSeriesPointOwner',
            'Increase the chart\'s size,\r\nto view its layout.': 'ChartStringId.DefaultSmallChartText',
            'Editing isn\'t allowed.': 'ChartStringId.MsgPaletteEditingIsNotAllowed',
            'Office 2013': 'ChartStringId.PltOffice2013',
            'Origin': 'ChartStringId.PltOrigin',
            'Orange': 'ChartStringId.PltOrange',
            'Use Ctrl with the left mouse button\r\nto explode or collapse slices.': 'ChartStringId.Msg2DPieExplodingToolTip',
            'Office': 'ChartStringId.PltOffice',
            'ToCenter': 'ChartStringId.WizGradientToCenter',
            '3-D Funnel': 'ChartStringId.CmdCreateFunnel3DChartMenuCaption',
            'Open the Palettes Editor.': 'ChartStringId.VerbEditPalettesDescription',
            'The angle of the label should be greater than or equal to -360 and less than or equal to 360.': 'ChartStringId.MsgIncorrectLabelAngle',
            'LargeGrid': 'ChartStringId.WizHatchLargeGrid',
            'Impossible to export a chart to the specified image format.': 'ChartStringId.MsgIncorrectImageFormat',
            'Export to MHT': 'ChartStringId.CmdExportToMHTMenuCaption',
            'The {0} property can\'t be null.': 'ChartStringId.MsgNullProperty',
            'Plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateSplineChartDescription',
            'Displays the contribution of each value to a total like a pie chart, but it can contain multiple series.': 'ChartStringId.CmdCreateDoughnutChartDescription',
            'Failed to import holidays from the \'{0}\' file.': 'ChartStringId.MsgCantImportHolidays',
            'Aspect': 'ChartStringId.PltAspect',
            'The specified file isn\'t a correct image file. Please choose another one.': 'ChartStringId.WizInvalidBackgroundImage',
            'The minimum size should be greater than or equal to 0, and less than the maximum size.': 'ChartStringId.MsgIncorrectBubbleMinSize',
            'Export to XLSX': 'ChartStringId.CmdExportToXLSXMenuCaption',
            'The zoom percent should be greater than 0 and less than or equal to {0}.': 'ChartStringId.MsgIncorrectZoomPercent',
            'Stacked Area': 'ChartStringId.CmdCreateStackedAreaChartMenuCaption',
            'Free': 'ChartStringId.WizShapePositionKindFree',
            'The grid spacing should be greater than 0.': 'ChartStringId.MsgIncorrectGridSpacing',
            'Clustered Stacked Pyramid': 'ChartStringId.CmdCreatePyramidSideBySideStackedBar3DChartMenuCaption',
            'Stacked Spline Area': 'ChartStringId.CmdCreateStackedSplineAreaChartMenuCaption',
            'The edge1 value can\'t be null.': 'ChartStringId.MsgInvalidEdge1',
            'The edge2 value can\'t be null.': 'ChartStringId.MsgInvalidEdge2',
            'The top N values count should be greater than 0.': 'ChartStringId.MsgIncorrectTopNCount',
            'Spline Area in 3-D': 'ChartStringId.CmdCreateSplineArea3DChartMenuCaption',
            'Export': 'ASPxReportsStringId.DocumentViewer_RibbonExportGroupText',
            'Blue II': 'ChartStringId.PltBlueII',
            '3-D Pyramid': 'ChartStringId.CmdCreatePyramidManhattanBarChartMenuCaption',
            'The group with the {0} name is already registered.': 'ChartStringId.MsgWizardNonUniqueGroupName',
            'Displays the trend of the contribution of each value over time or ordered categories.': 'ChartStringId.CmdCreateStackedLineChartDescription',
            'Wizard Page': 'ChartStringId.DefaultWizardPageLabel',
            'The reduction color value can\'t be empty.': 'ChartStringId.MsgIncorrectReductionColorValue',
            'Displays the contribution of each value to a total.': 'ChartStringId.CmdCreatePie3DChartDescription',
            'The specified path cannot be resolved: {0}.': 'ChartStringId.MsgIncorrectPath',
            'Font can\'t be null.': 'ChartStringId.MsgIncorrectFont',
            '2-D Bar': 'ChartStringId.CmdBar2DGroupPlaceHolderMenuCaption',
            'Use Ctrl with the left mouse button\r\nto move the anchor point.': 'ChartStringId.MsgAnchorPointMovingToolTip',
            'The "LegendPointOptions" property can\'t be set at runtime.': 'ChartStringId.MsgLegendPointOptionsSettingRuntimeError',
            'DottedGrid': 'ChartStringId.WizHatchDottedGrid',
            'Create series, and adjust their general properties.\r\nNote that the view type of the first visible series determines the diagram type and its set of specific options.': 'ChartStringId.WizSeriesPageDescription',
            'Incorrect value "{0}" for the property "{1}".': 'ChartStringId.MsgIncorrectPropertyValue',
            'Can\'t add a palette which has an empty name ("") to the palette repository. Please, specify a name for the palette.': 'ChartStringId.MsgInvalidPaletteName',
            'Series changed': 'ChartStringId.TrnSeriesChanged',
            'The type of the "{0}" argument data member isn\'t compatible with the {1} scale.': 'ChartStringId.MsgIncompatibleArgumentDataMember',
            'DashedHorizontal': 'ChartStringId.WizHatchDashedHorizontal',
            'Palette ': 'ChartStringId.PalettePrefix',
            'The AxisValue property cannot be set to null for the StripLimit object.': 'ChartStringId.MsgIncorrectStripLimitAxisValue',
            'Save As\r\nTemplate': 'ChartStringId.CmdSaveAsTemplateMenuCaption',
            'Triple Exponential Moving Average (TRIX)': 'ChartStringId.IndTripleExponentialMovingAverageTrix',
            'Triple Exponential Moving Average (TEMA)': 'ChartStringId.IndTripleExponentialMovingAverageTema',
            'Chart Title': 'ChartStringId.DefaultChartTitle',
            'The "Label" property can\'t be set at runtime.': 'ChartStringId.MsgLabelSettingRuntimeError',
            'An incorrect value is specified. A dock target can only be a pane, or null (meaning the chart control itself).': 'ChartStringId.MsgIncorrectFreePositionDockTarget',
            'Axis of arguments': 'ChartStringId.AxisXDefaultTitle',
            'DarkDownwardDiagonal': 'ChartStringId.WizHatchDarkDownwardDiagonal',
            'The type of the "{0}" point isn\'t compatible with the {1} scale.': 'ChartStringId.MsgIncompatiblePointType',
            'DarkVertical': 'ChartStringId.WizHatchDarkVertical',
            'This series view doesn\'t support relations.': 'ChartStringId.MsgSeriesViewNotSupportRelations',
            'Create and customize annotations anchored to a chart, pane or series point.\r\nNote that you may select an annotation by clicking it in the chart preview.': 'ChartStringId.WizAnnotationsPageDescription',
            'Links': 'ChartStringId.ColumnLinks',
            'The tickmark thickness should be greater than 0.': 'ChartStringId.MsgIncorrectTickmarkThickness',
            'Insert an area chart.\r\n\r\nArea charts emphasize differences between several sets of data over a period of time.': 'ChartStringId.CmdCreateAreaChartPlaceHolderDescription',
            'Show points from two or more different series on the same points arguments on a circular grid that has multiple axes along which data can be plotted.': 'ChartStringId.CmdCreateRadarPointChartDescription',
            'The nested doughnut weight should be greater than 0.': 'ChartStringId.MsgIncorrectNestedDoughnutWeight',
            'Enable scrolling (true)': 'ChartStringId.WizEnableScrollingTrue',
            'Standard Deviation Error Bars': 'ChartStringId.IndStandardDeviationErrorBars',
            'DarkUpwardDiagonal': 'ChartStringId.WizHatchDarkUpwardDiagonal',
            'COUNT': 'ChartStringId.FunctionNameCount',
            'Hint': 'ChartStringId.PointHintPatternDescription',
            'GIF': 'ChartStringId.CmdExportToGIFMenuCaption',
            'Exponential Moving Average': 'ChartStringId.IndExponentialMovingAverage',
            'The maximum size should be greater than the minimum size.': 'ChartStringId.MsgIncorrectBubbleMaxSize',
            'Side By Side Bar Stacked 100%': 'ChartStringId.SvnSideBySideFullStackedBar',
            '(none)': 'ChartStringId.WizDataFiltersDisabled',
            'Enable scrolling (false)': 'ChartStringId.WizEnableScrollingFalse',
            'The Amplitude property value should be greater than or equal to 0. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgIncorrectBackEaseAmplitude',
            'The funnel hole percentage should be greater than or equal to 0 and less than or equal to 100.': 'ChartStringId.MsgIncorrectFunnelHolePercent',
            'Percent Value': 'ChartStringId.PercentValuePatternDescription',
            'Customize the chart\'s properties.': 'ChartStringId.WizChartPageDescription',
            'Range Column': 'ChartStringId.CmdCreateRangeBarChartMenuCaption',
            'Typical Price': 'ChartStringId.IndTypicalPrice',
            'Behave similar to Stacked Area in 3D chart, but plot a fitted curve through each data point in a series.': 'ChartStringId.CmdCreateStackedSplineArea3DChartDescription',
            'Line 3D Stacked': 'ChartStringId.SvnStackedLine3D',
            'The specified XML file can\'t be opened,\r\nbecause it is either not a supported file type,\r\nor because the file has been damaged.': 'ChartStringId.MsgChartLoadingException',
            'ToCenterVertical': 'ChartStringId.WizGradientToCenterVertical',
            'Presentation': 'ChartStringId.WizPresentationGroupName',
            'The GridAlignment property can\'t be modified in the automatic numeric scale mode.': 'ChartStringId.MsgIncorrectNumericGridAlignmentPropertyUsing',
            'DataFilters changed': 'ChartStringId.TrnDataFiltersChanged',
            'Detrended Price Oscillator': 'ChartStringId.IndDetrendedPriceOscillator',
            'Use Shift with the left mouse button\r\nto zoom in the chart.\r\nUse Alt with the left mouse button \r\nto zoom out the chart.': 'ChartStringId.Msg3DZoomToolTip',
            'Violet II': 'ChartStringId.PltVioletII',
            'the value scale type': 'ChartStringId.MsgIncompatibleByValueScaleType',
            'The zero value is not acceptable for the workdays.  Use work days of a week.': 'ChartStringId.MsgUnsupportedWorkdaysForWorkdaysOptions',
            'qualitative': 'ChartStringId.ScaleTypeQualitative',
            'Clustered 100% Stacked Cylinder': 'ChartStringId.CmdCreateCylinderSideBySideFullStackedBar3DChartMenuCaption',
            'The {0} must be inherited from the {1} class.': 'ChartStringId.MsgWizardIncorrectBasePageType',
            'Displays vertical columns along the Y-axis (the axis of values). Each column represents a range of data for each argument value.': 'ChartStringId.CmdCreateRangeBarChartDescription',
            'Displays series as filled area on a circular grid that has multiple axes along which data can be plotted.': 'ChartStringId.CmdCreateRadarAreaChartDescription',
            'Show trends for several series and compare their values for the same points arguments on a circular grid that has multiple axes along which data can be plotted.': 'ChartStringId.CmdCreateRadarLineChartDescription',
            'Urban': 'ChartStringId.PltUrban',
            'Verve': 'ChartStringId.PltVerve',
            'The fixed plane depth should be greater than or equal to 1.': 'ChartStringId.MsgIncorrectPlaneDepthFixed',
            'Paper': 'ChartStringId.PltPaper',
            'Solstice': 'ChartStringId.PltSolstice',
            'Green': 'ChartStringId.PltGreen',
            'Civic': 'ChartStringId.PltCivic',
            'Oriel': 'ChartStringId.PltOriel',
            'The Power property value should be greater than 0. The PositiveInfinity value is not allowed.': 'ChartStringId.MsgIncorrectPowerEasePower',
            'Mixed': 'ChartStringId.PltMixed',
            'Metro': 'ChartStringId.PltMetro',
            'The maximum line count should be greater than or equal to 0 and less than or equal to 20.': 'ChartStringId.MsgIncorrectMaxLineCount',
            'ForwardDiagonal': 'ChartStringId.WizHatchForwardDiagonal',
            'This property can\'t be used if the Direction property is set to {0}.': 'ChartStringId.MsgEquallySpacedItemsNotUsable',
            'Represent series points in the same order that they have in the collection.': 'ChartStringId.CmdCreateScatterLineChartDescription',
            'The SeriesPointRelations collection already contains this relation.': 'ChartStringId.MsgSeriesPointRelationAlreadyExists',
            'Area 3D Stacked': 'ChartStringId.SvnStackedArea3D',
            'This series is incompatible:\r\n': 'ChartStringId.IncompatibleSeriesHeader',
            'Axis can\'t be set to null for the AxisXCoordinate object.': 'ChartStringId.MsgNullAxisXCoordinateAxis',
            'Insert a column chart.\r\n\r\nColumn charts are used to compare values across categories.': 'ChartStringId.CmdCreateBarChartPlaceHolderDescription',
            'Child series point with ID equal to {0} doesn\'t exist.': 'ChartStringId.MsgChildSeriesPointNotExist',
            'The page can\'t be registered in the unregistered group': 'ChartStringId.MsgRegisterPageInUnregisterGroup',
            'Customize the point labels of a series.\r\nNote that you may select labels of a series by clicking them in the chart preview.': 'ChartStringId.WizSeriesLabelsPageDescription',
            'Choose a chart type you want to use. To filter chart types by their groups, use the values in the drop-down box.': 'ChartStringId.WizChartTypePageDescription',
            'The {0} value scale type is incompatible with the {1} series view.': 'ChartStringId.MsgIncompatibleValueScaleType',
            'There is no series in the chart\'s collection with at least one series point.': 'ChartStringId.IncorrectSeriesCollectionToolTipText',
            'Resemble a Scatter chart, but compare sets of three values instead of two. The third value determines the size of the bubble marker.': 'ChartStringId.CmdCreateBubbleChartDescription',
            'Load...': 'ChartStringId.VerbLoadLayout',
            'Secondary axes Y changed': 'ChartStringId.TrnSecondaryAxesYChanged',
            'The {0} ValueLevel is invalid for the current regression line.': 'ChartStringId.MsgIncorrectValueLevel',
            'This PolygonGradientMode isn\'t compatible with AreaSeriesView.': 'ChartStringId.MsgInvalidGradientMode',
            'Axes': 'ChartStringId.WizAxesPageName',
            'Combine the advantages of both the Stacked Column and Clustered Column chart types, so that you can stack different columns, and combine them into groups across the same axis value.': 'ChartStringId.CmdCreateSideBySideStackedBarChartDescription',
            'RightToLeft': 'ChartStringId.WizGradientRightToLeft',
            'Annotation ': 'ChartStringId.AnnotationPrefix',
            'Customize the legend\'s properties.': 'ChartStringId.WizLegendPageDescription',
            'The point distance value should be greater than 0.': 'ChartStringId.MsgIncorrectPointDistance',
            'Customize the X and Y axes of the diagram.\r\nNote that you may select an axis by clicking it in the chart preview.': 'ChartStringId.WizAxesPageDescription',
            'The {0} condition can\'t be applied to the "{1}" data.': 'ChartStringId.MsgInvalidFilterCondition',
            'BottomLeftToTopRight': 'ChartStringId.WizGradientBottomLeftToTopRight',
            'Weighted Close': 'ChartStringId.IndWeightedClose',
            'Series title changed': 'ChartStringId.TrnSeriesTitleChanged',
            'Adobe Portable Document Format': 'ChartStringId.CmdExportToPDFDescription',
            'High Value': 'ChartStringId.HighValuePatternDescription',
            'Series View': 'ChartStringId.WizSeriesViewPageName',
            'It\'s impossible to create an instance of a class: {0} because specified parameters are incorrect.': 'GaugesCoreStringId.MsgInvalidClassCreationParameters',
            'Path can\'t be created.': 'GaugesCoreStringId.MsgPathCreationError',
            'It\'s impossible to create an instance of a class {0} because specified text is incorrect: ': 'GaugesCoreStringId.MsgTextParsingError',
            'The gauge control can\'t be restored correctly, because the specified layout file contians the following invalid elements: {0}.': 'GaugesCoreStringId.MsgGaugeRestoreError',
            'We have all the information needed to process the report.': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportComplete_Description',
            'What summary function would you like to calculate?': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Description',
            'To be able to run the Document Viewer, the client web browser must support HTML5.': 'ASPxReportsStringId.WebDocumentViewer_PlatformNotSupported_Error',
            'Enter the text to find in the document.': 'ASPxReportsStringId.SearchDialog_EnterText',
            'The specified Report Service has not been found.': 'ASPxReportsStringId.DocumentViewer_RemoteSourceConnection_Error',
            'Report Wizard': 'ASPxReportsStringId.ReportDesigner_Wizard_Header',
            'Next': 'ASPxReportsStringId.ReportDesigner_Wizard_Next',
            'Ignore null values': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_IgnoreNullValues',
            'To log in to the Report Server, handle the RequestCredentials event.': 'ASPxReportsStringId.DocumentViewer_RemoteAuthenticatorCredentialHandled_Error',
            'Collapsed': 'ASPxReportsStringId.ReportDesigner_Accordion_Collapsed',
            'Align Left 1': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft1',
            'Align Left 2': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AlignLeft2',
            'It is only possible to assign either the SettingsRemoteSource or ConfigurationRemoteSource property of ASPxDocumentViewer at a time.': 'ASPxReportsStringId.DocumentViewer_RemoteSourceSettingsAndConfiguration_Error',
            'Search result': 'ASPxReportsStringId.WebDocumentViewer_SearchResultText',
            'Last Page': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_LastPage',
            'Insert Group Header Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertGroupHeaderBand',
            'The value cannot be empty.': 'ASPxReportsStringId.ParametersPanel_DateTimeValueValidationError',
            'Finish': 'ASPxReportsStringId.ReportDesigner_Wizard_Finish',
            'To be able to run the Report Designer, the client web browser must support HTML5.': 'ASPxReportsStringId.ReportDesigner_PlatformNotSupported_Error',
            'Size to Control Height': 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlHeight',
            'Display the specified page.': 'ASPxReportsStringId.DocumentViewer_RibbonCurrentPageToolTip',
            'of': 'ASPxReportsStringId.ToolBarItemText_OfLabel',
            'Delete Row': 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteRow',
            'Remove calculated field': 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveCalculatedField',
            'Insert Page Header Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertPageHeaderBand',
            'Choose a Report Layout': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Title',
            'Choose a Table or View': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataMember_Title',
            'Guid should contain 32 digits delimited with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).': 'ASPxReportsStringId.ParametersPanel_GuidValidationError',
            'The report style specifies the appearance of your report.': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Description',
            'Insert Field in the Column Area': 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheColumnArea',
            'Formal': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Formal',
            'Specify the print settings and print the document.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_PrintReport',
            'Outline 2': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline2',
            'Outline 1': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Outline1',
            'Failed to log in with the specified user credentials.': 'ASPxReportsStringId.DocumentViewer_RemoteAuthenticatorLogin_Error',
            'Insert Cell': 'ASPxReportsStringId.ReportDesigner_TableActions_InsertCell',
            'Create Groups': 'ASPxReportsStringId.ReportDesigner_Wizard_CreateGroups_Title',
            'Cannot create a document for the current report': 'ASPxReportsStringId.WebDocumentViewer_DocumentCreationError',
            'Casual': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Casual',
            'The report does not contain any parameters.': 'ASPxReportsStringId.WebDocumentViewer_NoParameters',
            'CSV': 'ASPxReportsStringId.ExportName_csv',
            'XLS': 'ASPxReportsStringId.ExportName_xls',
            'PDF': 'ASPxReportsStringId.ExportName_pdf',
            'Save To File': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_SaveToFile',
            'Error obtaining a build status': 'ASPxReportsStringId.WebDocumentViewer_GetBuildStatusError',
            'An error occurred during search': 'ASPxReportsStringId.WebDocumentViewer_SearchError',
            'Insert Group Footer Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertGroupFooterBand',
            'Match whole word only': 'ASPxReportsStringId.SearchDialog_WholeWord',
            'Insert Sub-Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertSubBand',
            'Select the columns you want to display within your report.': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseColumns_Description',
            'Down': 'ASPxReportsStringId.SearchDialog_Down',
            'Match case': 'ASPxReportsStringId.SearchDialog_Case',
            '(Select All)': 'ASPxReportsStringId.WebDocumentViewer_SelectAll',
            'The DocumentViewerRemoteSourceSettings.CustomTokenStorage property is not assigned.': 'ASPxReportsStringId.DocumentViewer_RemoteSourceSettings_CustomTokenStorage_Error',
            'Print the report': 'ASPxReportsStringId.ToolBarItemText_PrintReport',
            'Parameters Panel': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_ParametersPanel',
            'Portrait': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Portrait',
            'There are no parameters available yet.': 'ASPxReportsStringId.ReportDesigner_FieldList_Parameters',
            'Page Count:': 'ASPxReportsStringId.DocumentViewer_RibbonPageCountText',
            'Size to Control': 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControl',
            'Current Page': 'ASPxReportsStringId.DocumentViewer_RibbonCurrentPageText',
            'Insert Field in the Data Area': 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheDataArea',
            'Create a New Style': 'ASPxReportsStringId.ReportDesigner_StylesEditor_CreateNew',
            'Choose a Report Style': 'ASPxReportsStringId.ReportDesigner_Wizard_Report_Style',
            'Insert Field in the Filter Area': 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheFilterArea',
            'Insert Page Footer Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertPageFooterBand',
            'Display the last document page.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_LastPage',
            'Finished searching the document.': 'ASPxReportsStringId.SearchDialog_Finished',
            'Find Next': 'ASPxReportsStringId.SearchDialog_FindNext',
            'Findnbsp;what': 'ASPxReportsStringId.SearchDialog_FindWhat',
            'Export a report and save it to the disk': 'ASPxReportsStringId.ToolBarItemText_SaveToDisk',
            'Export a report and show it in a new window': 'ASPxReportsStringId.ToolBarItemText_SaveToWindow',
            'Add parameter': 'ASPxReportsStringId.ReportDesigner_FieldListActions_AddParameter',
            'Delete Column': 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteColumn',
            'Insert Top Margin Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertTopMarginBand',
            'Find Text': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_FindText',
            'The report preview initialization has failed': 'ASPxReportsStringId.WebDocumentViewer_InitializationError',
            'Next Page': 'ASPxReportsStringId.ToolBarItemText_NextPage',
            'Cannot supply filtered lookup values to a report parameter editor': 'ASPxReportsStringId.WebDocumentViewer_GetLookUpValuesError',
            'First Page': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_FirstPage',
            'Display the search window': 'ASPxReportsStringId.ToolBarItemText_Search',
            'Preview Parameters': 'ASPxReportsStringId.ReportDesigner_Preview_ParametersTitle',
            'Display the first document page.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_FirstPage',
            'Stepped': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Stepped',
            'Delete Cell': 'ASPxReportsStringId.ReportDesigner_TableActions_DeleteCell',
            'Choose a Data Source to use in your report.': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataSource_Description',
            'Specify the report\'s title': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportComplete_SpecifyTitle',
            'It is only possible to assign either the Local Report or Remote Source of ASPxDocumentViewer at a time.': 'ASPxReportsStringId.DocumentViewer_LocalAndRemoteSource_Error',
            'Save the document to a file in a specified format.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_SaveToFile',
            'Previous Page': 'ASPxReportsStringId.ToolBarItemText_PreviousPage',
            'Display the next document page.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_NextPage',
            'Find text in the document.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_FindText',
            'Print Page': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_PrintPage',
            'Save To Window': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_SaveToWindow',
            'Adjust the field width so all fields fit onto a page': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_AdjustFieldWidth',
            'The RequestCredentials event has not been subscribed to.': 'ASPxReportsStringId.DocumentViewer_RemoteRequestCredentials_Error',
            'To view the remote report, specify the ServerUri or EndpointConfigurationName property of the ASPxDocumentViewer.SettingsRemoteSource.': 'ASPxReportsStringId.DocumentViewer_RemoteSourceSettings_Error',
            'Insert Detail Report Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertDetailReportBand',
            'To display a report, only one of the following actions can be performed at a time:\r\n- assigning the ASPxWebDocumentViewer.ReportSourceId property;\r\n- calling the ASPxWebDocumentViewer.OpenReport method;\r\n- calling the ASPxWebDocumentViewer.OpenReportXmlLayout method.': 'ASPxReportsStringId.WebDocumentViewer_OpenReport_Error',
            'Specify the print settings and print the current page.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_PrintPage',
            'Groups': 'ASPxReportsStringId.ReportDesigner_Groups',
            'Insert Column To the Left': 'ASPxReportsStringId.ReportDesigner_TableActions_InsertColumnToLeft',
            'Columnar': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Columnar',
            'Cannot find a toolbar control with the specified name: \'{0}\'.': 'ASPxReportsStringId.DocumentViewer_ExternalRibbonNotFound_Error',
            'The report layout specifies the manner in which selected data fields are arranged on individual pages.': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Description',
            'Run Wizard': 'ASPxReportsStringId.ReportDesigner_MenuButtons_RunWizard',
            'Compact': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Compact',
            'The table or view you choose determines wich columns will be available in your report.': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataMember_Description',
            'Insert Bottom Margin Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertBottomMarginBand',
            'To view a remote report, enable the PageByPage property of the SettingsReportViewer.': 'ASPxReportsStringId.DocumentViewer_RemotePageByPage_Error',
            'Access and modify the report parameter values.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_ParametersPanel',
            'Insert Detail Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertDetailBand',
            'To create a new item, click Add.': 'ASPxReportsStringId.ReportDesigner_GroupFields_Empty',
            'Insert Report Footer Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertReportFooterBand',
            'Choose Columns to Display in Your Report': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseColumns_Title',
            'Insert Field in the Row Area': 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheRowArea',
            'The user credentials cannot be empty.': 'ASPxReportsStringId.DocumentViewer_RemoteAuthenticatorCredential_Error',
            'This command cannot be executed because a document has not yet been generated.': 'ASPxReportsStringId.DocumentViewer_NoRemoteDocumentInformation_Error',
            'Print the current page': 'ASPxReportsStringId.ToolBarItemText_PrintPage',
            'Export To': 'ASPxReportsStringId.WebDocumentViewer_ExportToText',
            'Display the previous document page.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_PreviousPage',
            'Add Data Items Here': 'ASPxReportsStringId.ReportDesigner_Pivot_AddDataItems',
            'Document is building...': 'ASPxReportsStringId.WebDocumentViewer_DocumentBuilding',
            'Loading...': 'ASPxReportsStringId.WebDocumentViewer_Loading',
            'Remove parameter': 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveParameter',
            'Navigate through the report\'s hierarchy of bookmarks.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_DocumentMap',
            'Tables': 'ASPxReportsStringId.ReportDesigner_Tables',
            'The report does not have any parameters yet. To create a new parameter, click Add Parameter.': 'ASPxReportsStringId.ReportDesigner_Parameters_CreateParameters',
            'Insert Column To the Right': 'ASPxReportsStringId.ReportDesigner_TableActions_InsertColumnToRight',
            'Corporate': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Corporate',
            'Size to Control Width': 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlWidth',
            'XLSX': 'ASPxReportsStringId.ExportName_xlsx',
            'Toggle Multipage Mode': 'ASPxReportsStringId.WebDocumentViewer_ToggleMultipageMode',
            'Submit': 'ASPxReportsStringId.ParametersPanel_Submit',
            'Previous': 'ASPxReportsStringId.ReportDesigner_Wizard_Previous',
            'Selected fields': 'ASPxReportsStringId.ReportDesigner_Wizard_SelectedFields',
            'Save the document in a specified format and display the result in a new window.': 'ASPxReportsStringId.DocumentViewer_RibbonCommandToolTip_SaveToWindow',
            'Insert Row Below': 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowBelow',
            'Insert Row Above': 'ASPxReportsStringId.ReportDesigner_TableActions_InsertRowAbove',
            'Available fields': 'ASPxReportsStringId.ReportDesigner_Wizard_AvailableFields',
            'Add Filter Fields Here': 'ASPxReportsStringId.ReportDesigner_Pivot_AddFilterFields',
            'Cannot obtain additional document data for the current document': 'ASPxReportsStringId.WebDocumentViewer_GetDocumentDataError',
            'Add calculated field': 'ASPxReportsStringId.ReportDesigner_FieldListActions_AddCalculatedField',
            'Data Source Wizard': 'ASPxReportsStringId.ReportDesigner_Wizard_DataSourceHeader',
            'Add Row Fields Here': 'ASPxReportsStringId.ReportDesigner_Pivot_AddRowFields',
            '0 pages': 'ASPxReportsStringId.WebDocumentViewer_0Pages',
            'Tabular': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Tabular',
            'Create multiple groups, each with a single field value, or define several fields in the same group.': 'ASPxReportsStringId.ReportDesigner_Wizard_CreateGroups_Description',
            'Up': 'ASPxReportsStringId.SearchDialog_Up',
            'Justified': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportLayout_Justified',
            'Insert Report Header Band': 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertReportHeaderBand',
            'The Report is Complete': 'ASPxReportsStringId.ReportDesigner_Wizard_ReportComplete_Title',
            'The value is not valid.': 'ASPxReportsStringId.ParametersPanel_GenericRegexValidationError',
            'Choose summary options': 'ASPxReportsStringId.ReportDesigner_Wizard_SummaryOptions_Title',
            'Print Report': 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_PrintReport',
            'Add Column Fields Here': 'ASPxReportsStringId.ReportDesigner_Pivot_AddColumnFields',
            'Choose a Data Source': 'ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataSource_Title'
        };
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="localization_values.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        function getLocalization(text) {
            return (DevExpress.JS.Localization.localize(Designer.localization_values[text]) || DevExpress.JS.Localization.localize(text)) || text;
        }
        Designer.getLocalization = getLocalization;
        function updateLocalization(object) {
            var messages = {};
            for (var name in object) {
                messages[Designer.localization_values[name] ? Designer.localization_values[name] : name] = object[name];
            }
            DevExpress.JS.Localization.addCultureInfo({
                messages: messages
            });
        }
        Designer.updateLocalization = updateLocalization;
        ;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../localization/localization.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        Designer.DEBUG = true;
        function num(v) {
            return parseInt(v, 10) || 0;
        }
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
        Designer.loadTemplates = loadTemplates;
        function getControlRect(element, control, surface) {
            var curleft = num(element.css("left")), curtop = num(element.css("top"));
            if (curtop < 0) {
                curtop = 0;
            }
            if (surface.rtl()) {
                var posLeft = surface.pageWidth() - surface.margins.left() - element.width();
                if (curleft > posLeft) {
                    curleft = posLeft;
                }
            }
            else if (curleft < 0) {
                curleft = 0;
            }
            var bounds = element[0].getBoundingClientRect();
            return { top: curtop, left: curleft, width: bounds.width, height: bounds.height };
        }
        Designer.getControlRect = getControlRect;
        function deserializeChildArray(model, parent, creator) {
            var result = [];
            DevExpress.JS.Utils.getPropertyValues(model).forEach(function (item) {
                var createdItem = creator(item);
                result.push(createdItem);
            });
            return DevExpress.JS.Utils.knockoutArrayWrapper(result, function (array, event) {
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
        Designer.deserializeChildArray = deserializeChildArray;
        function _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback) {
            var message = errorThrown;
            var error = getErrorMessage(jqXHR);
            if (error && error !== message) {
                message += ": " + error;
            }
            try {
                processErrorCallback ? processErrorCallback(message, jqXHR, textStatus) : DevExpress.Designer.NotifyAboutWarning(message);
            }
            finally {
                deferred.reject(jqXHR, textStatus, errorThrown);
            }
        }
        function ajax(uri, action, arg, processErrorCallback) {
            var deferred = $.Deferred();
            $.post(uri, {
                actionKey: action,
                arg: arg
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback);
            })
                .done(function (data, textStatus, jqXHR) {
                if (data.success) {
                    deferred.resolve(data.result);
                }
                else {
                    _processError("Internal Server Error", deferred, jqXHR, textStatus, processErrorCallback);
                }
            });
            return deferred.promise();
        }
        Designer.ajax = ajax;
        function NotifyAboutWarning(msg, showForUser) {
            if (showForUser === void 0) { showForUser = false; }
            if (showForUser) {
                ShowMessage(msg);
            }
            if (Designer.DEBUG) {
                throw new Error(msg);
            }
            else {
                console.warn(msg);
            }
        }
        Designer.NotifyAboutWarning = NotifyAboutWarning;
        function getErrorMessage(jqXHR) {
            return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.error ? jqXHR.responseJSON.error : '';
        }
        Designer.getErrorMessage = getErrorMessage;
        function ShowMessage(msg, type, displayTime, debugInfo) {
            if (type === void 0) { type = "error"; }
            DevExpress.ui.notify({
                message: msg,
                type: type,
                position: { of: $(".dx-designer")[0], my: "bottom", at: "bottom", offset: "0 -10" },
                targetContainer: $(".dx-designer")[0],
                closeOnOutsideClick: true,
                displayTime: displayTime || (type === "error" ? 60000 : 3000)
            });
        }
        Designer.ShowMessage = ShowMessage;
        function checkModelReady(model) {
            return model.isModelReady ? model.isModelReady() : true;
        }
        Designer.checkModelReady = checkModelReady;
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
                            return { name: item.id || item.ref, displayName: item.name, isList: true, specifics: item.specifics || "ListSource", dragData: { noDragable: true } };
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
                    if (dss[i].id === request.id) {
                        request.ref = undefined;
                        return;
                    }
                    if (dss[i].ref === request.ref) {
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
        Designer.FieldListProvider = FieldListProvider;
        function validateName(nameCandidate) {
            return nameCandidate && /^[A-Za-z][A-Za-z0-9_]+$/.test(nameCandidate);
        }
        Designer.validateName = validateName;
        function replaceInvalidSymbols(text) {
            return text.replace(/[\W_]+/g, "_");
        }
        Designer.replaceInvalidSymbols = replaceInvalidSymbols;
        function validateGuid(guid) {
            return guid && (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(guid)
                || /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/.test(guid)
                || /^\([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\)$/.test(guid)
                || /^[0-9a-fA-F]{32}$/.test(guid));
        }
        Designer.validateGuid = validateGuid;
        Designer.nameValidationRules = [{ type: "custom", validationCallback: function (options) { return validateName(options.value); }, message: DevExpress.Designer.getLocalization('Name is required and should be a valid identifier.') }];
        Designer.guidValidationRules = [{ type: "custom", validationCallback: function (options) { return validateGuid(options.value); }, message: DevExpress.Designer.getLocalization('Guid is required and should have a valid format.') }];
        function floatFromModel(val) {
            return ko.observable(val === undefined || val === null ? null : parseFloat(val));
        }
        Designer.floatFromModel = floatFromModel;
        Designer.papperKindMapper = {
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
        function fromEnum(value) {
            var shotEnumValueKey = getShortTypeName(value);
            return ko.observable((this.values && this.values[shotEnumValueKey] !== undefined) ? shotEnumValueKey : value);
        }
        Designer.fromEnum = fromEnum;
        function getTypeNameFromFullName(controlType) {
            return controlType.split(',')[0].trim();
        }
        Designer.getTypeNameFromFullName = getTypeNameFromFullName;
        function getShortTypeName(controlType) {
            var fullTypeName = getTypeNameFromFullName(controlType), typeNameParts = fullTypeName.split('.');
            return typeNameParts[typeNameParts.length - 1];
        }
        Designer.getShortTypeName = getShortTypeName;
        function getControlFullName(value) {
            var displayName = value && (ko.unwrap(value.name) || ko.unwrap(value.displayName)), controlType = value && value.controlType;
            return displayName + (controlType ? (' (' + Designer.getLocalization(getShortTypeName(controlType)) + ')') : '');
        }
        Designer.getControlFullName = getControlFullName;
        function classExists(selector) {
            var lowerCaseSelector = selector.toLowerCase(), result = false;
            for (var i = 0; i < (document.styleSheets || []).length; i++) {
                var rules = document.styleSheets[i]["rules"] ? document.styleSheets[i]["rules"] : document.styleSheets[i]["cssRules"];
                for (var i = 0; i < (rules || []).length; i++) {
                    if (rules[i].selectorText && rules[i].selectorText.toLowerCase() === lowerCaseSelector) {
                        result = true;
                        break;
                    }
                }
                if (result) {
                    break;
                }
            }
            ;
            return result;
        }
        Designer.classExists = classExists;
        function parseBool(val) {
            return ko.observable(val !== void 0 ? String(val).toLowerCase() === "true" : val);
        }
        Designer.parseBool = parseBool;
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
        Designer.colorFromString = colorFromString;
        function saveAsInt(val) {
            return Math.round(val).toString();
        }
        Designer.saveAsInt = saveAsInt;
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
        Designer.colorToString = colorToString;
        var Point = (function () {
            function Point(x, y) {
                this.x = ko.observable(x);
                this.y = ko.observable(y);
            }
            Point.prototype.getInfo = function () {
                return Designer.locationFake;
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
        Designer.Point = Point;
        var Size = (function () {
            function Size(width, height) {
                this.isPropertyDisabled = function (name) { return void 0; };
                this.width = ko.observable(width);
                this.height = ko.observable(height);
            }
            Size.prototype.getInfo = function () {
                return Designer.sizeFake;
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
        Designer.Size = Size;
        var Margins = (function () {
            function Margins(left, right, top, bottom) {
                this.bottom = ko.observable(bottom);
                this.left = ko.observable(left);
                this.right = ko.observable(right);
                this.top = ko.observable(top);
            }
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
        Designer.Margins = Margins;
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
        Designer.Rectangle = Rectangle;
        function createUnitProperty(model, target, propertyName, property, measureUnit, zoom) {
            var lastVal = 0;
            target[propertyName] = ko.pureComputed({
                read: function () {
                    var val = property(model)(), newVal = Designer.unitsToPixel(val, measureUnit.peek(), zoom());
                    if (Math.abs(newVal - lastVal) > 0.2) {
                        lastVal = newVal;
                        return lastVal;
                    }
                    return lastVal;
                },
                write: function (val) {
                    lastVal = val;
                    var result = Designer.pixelToUnits(val, measureUnit.peek(), zoom());
                    property(model)(result);
                }
            });
        }
        Designer.createUnitProperty = createUnitProperty;
        function createUnitProperties(model, target, properties, measureUnit, zoom) {
            if (!properties)
                return;
            for (var propertyName in properties) {
                createUnitProperty(model, target, propertyName, properties[propertyName], measureUnit, zoom);
            }
        }
        Designer.createUnitProperties = createUnitProperties;
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
                for (var i = 0; i < properties.length; i++) {
                    properties[i] = ko.unwrap(properties[i]);
                    if (typeof properties[i] === 'object') {
                        propertiesVisitor(properties[i], visitor, visited, skip);
                    }
                }
            }
        }
        Designer.propertiesVisitor = propertiesVisitor;
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
        Designer.objectsVisitor = objectsVisitor;
        function collectionsVisitor(target, visitor, collectionsToProcess, visited) {
            if (collectionsToProcess === void 0) { collectionsToProcess = ["controls", "bands", "subBands", "crossBandControls", "rows", "cells", "fields"]; }
            if (visited === void 0) { visited = []; }
            if (target && target !== undefined) {
                visited.push(target);
                for (var i = 0, len = collectionsToProcess.length; i < len; i++) {
                    if (target[collectionsToProcess[i]]) {
                        visitor(target[collectionsToProcess[i]]);
                        (target[collectionsToProcess[i]]() || []).forEach(function (item) { return collectionsVisitor(item, visitor, collectionsToProcess, visited); });
                    }
                }
            }
        }
        Designer.collectionsVisitor = collectionsVisitor;
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
        Designer.getImageClassName = getImageClassName;
        function getUniqueNameForNamedObjectsArray(objects, prefix) {
            if (prefix.indexOf("XR") === 0) {
                prefix = prefix[2].toLowerCase() + prefix.slice(3);
            }
            else {
                var indexBand = prefix.indexOf("Band");
                if (indexBand !== -1 && prefix !== "SubBand") {
                    prefix = prefix.slice(0, indexBand) + prefix.slice(indexBand + 4);
                }
            }
            return getUniqueName(objects.map(function (item) { return ko.unwrap(item.name); }), prefix);
        }
        Designer.getUniqueNameForNamedObjectsArray = getUniqueNameForNamedObjectsArray;
        function getUniqueName(names, prefix) {
            var i = 1, result = prefix + i;
            while (names.filter(function (item) { return item === result; }).length > 0) {
                i++;
                result = prefix + i;
            }
            ;
            return result;
        }
        Designer.getUniqueName = getUniqueName;
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
                    if (args.jQueryEvent.keyCode === 27) {
                        _this._showInline(false);
                    }
                    if (args.jQueryEvent.keyCode === 13) {
                        _controlText(_this.text());
                        _this._showInline(false);
                    }
                };
            }
            return InlineTextEdit;
        })(Designer.Disposable);
        Designer.InlineTextEdit = InlineTextEdit;
        ;
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
                    if (!value.name()) {
                        var controlType = value.controlType || "Unknown", initialText = value.getControlInfo && value.getControlInfo().defaultVal && value.getControlInfo().defaultVal["@Text"];
                        var newName = getUniqueNameForNamedObjectsArray(_this.allControls(), controlType);
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
                    DevExpress.Designer.collectionsVisitor(value, function (collection) {
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
                        _this._collectControls(newTarget);
                    }));
                    unwrappedTarget = target.peek();
                }
                this._disposables.push(this.allControls.subscribe(function (args) {
                    args.forEach(function (value) {
                        _this._setName(value);
                    });
                }));
                this._collectControls(unwrappedTarget);
                this._handlers.push.apply(this._handlers, handlers);
            }
            DesignControlsHelper.prototype._collectControls = function (target) {
                var _this = this;
                var allControls = this.allControls();
                allControls.push(target);
                DevExpress.Designer.collectionsVisitor(target, function (collection) {
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
                    allControls.push.apply(allControls, collection());
                }, this.collectionNames);
                this.allControls.valueHasMutated();
            };
            DesignControlsHelper.prototype.getControls = function (target) {
                var controls = ko.observableArray();
                DevExpress.Designer.collectionsVisitor(target, function (collection) {
                    controls.push.apply(controls, collection());
                });
                return controls;
            };
            return DesignControlsHelper;
        })(Designer.Disposable);
        Designer.DesignControlsHelper = DesignControlsHelper;
        var ControlsFactory = (function () {
            function ControlsFactory() {
                this.controlsMap = {};
            }
            ControlsFactory.prototype.getControlType = function (model) {
                var controlType = getTypeNameFromFullName(model["@ControlType"] || "");
                return this.controlsMap[controlType] ? controlType : "Unknown";
            };
            ControlsFactory.prototype.createControl = function (model, parent, serializer) {
                var controlType = this.getControlType(model);
                return new (this.controlsMap[controlType] && this.controlsMap[controlType].type || Designer.ElementViewModel)(model, parent, serializer);
            };
            ControlsFactory.prototype.registerControl = function (typeName, metadata) {
                this.controlsMap[typeName] = metadata;
                this.controlsMap[typeName].info = $.extend(true, [], metadata.info);
            };
            ControlsFactory.prototype.getPropertyInfo = function (controlType, propertyDisplayName) {
                return this.controlsMap[controlType].info.filter(function (property) { return property.displayName === propertyDisplayName; })[0];
            };
            return ControlsFactory;
        })();
        Designer.ControlsFactory = ControlsFactory;
        var SerializableModel = (function (_super) {
            __extends(SerializableModel, _super);
            function SerializableModel(model, serializer, info) {
                _super.call(this);
                if (info) {
                    this.getInfo = function () {
                        return info;
                    };
                }
                serializer = serializer || new DevExpress.JS.Utils.ModelSerializer();
                serializer.deserialize(this, model, info);
            }
            return SerializableModel;
        })(Designer.Disposable);
        Designer.SerializableModel = SerializableModel;
        function cutRefs(model) {
            objectsVisitor(model, function (target) {
                delete target["@Ref"];
            });
            return model;
        }
        Designer.cutRefs = cutRefs;
        function patchPositionByRTL(position, rtl) {
            if (rtl) {
                if (position === "Left")
                    return "Right";
                else if (position === "Right")
                    return "Left";
            }
            return position;
        }
        Designer.patchPositionByRTL = patchPositionByRTL;
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
                this.paddingsCss = function () {
                    return _this.createPadding(control["padding"] && control["padding"]() || "");
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
                fontStyles["fontFamily"] = components[0];
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
            CssCalculator.prototype.createPadding = function (paddings) {
                var padding = {}, paddingModel = new Designer.Widgets.PaddingModel({ value: ko.observable(paddings) });
                padding["paddingLeft"] = paddingModel.left() + "px";
                padding["paddingTop"] = paddingModel.top() + "px";
                padding["paddingRight"] = paddingModel.right() + "px";
                padding["paddingBottom"] = paddingModel.bottom() + "px";
                return padding;
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
            CssCalculator.DEFAULT_BORDER = "solid 1px Silver";
            return CssCalculator;
        })();
        Designer.CssCalculator = CssCalculator;
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
                        displayName: Designer.getLocalization(propertyInfo.displayName),
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
        })(Designer.Disposable);
        Designer.ObjectStructureProviderBase = ObjectStructureProviderBase;
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
                            return { name: item.displayName, displayName: Designer.getLocalization(item.displayName), isList: true, specifics: item.className, dragData: { noDragable: true }, data: ko.unwrap(item.data) };
                        }));
                    }
                    else {
                        var target = rootITems.filter(function (item) { return item.displayName === pathRequest.fullPath.split('.')[0]; })[0];
                        result.resolve(_this.getObjectPropertiesForPath(ko.unwrap(target.model), pathRequest.fullPath, target.displayName));
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
                    result.push({
                        name: propertyName ? propertyName + "." + i.toString() : i.toString(),
                        displayName: ko.unwrap(unwrapArrayValue["displayName"] || unwrapArrayValue["name"]),
                        specifics: this.getClassName(unwrapArrayValue),
                        isList: isList,
                        data: unwrapArrayValue,
                        dragData: { noDragable: !(propertyName === "Styles" || propertyName === "Formatting Rules") }
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
        Designer.ObjectExplorerProvider = ObjectExplorerProvider;
        var ObjectStructureProvider = (function (_super) {
            __extends(ObjectStructureProvider, _super);
            function ObjectStructureProvider(target, displayName) {
                var _this = this;
                _super.call(this);
                this.getItems = function (pathRequest) {
                    var result = $.Deferred();
                    if (!pathRequest.fullPath) {
                        result.resolve([{ name: displayName || ko.unwrap(target["name"]), displayName: Designer.getLocalization(displayName || ko.unwrap(target["name"])), isList: true, specifics: target.className && target.className(), dragData: { noDragable: true } }]);
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
        Designer.ObjectStructureProvider = ObjectStructureProvider;
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
            }
            ObjectStructureTreeListController.prototype.canSelect = function (value) {
                return true;
            };
            return ObjectStructureTreeListController;
        })();
        Designer.ObjectStructureTreeListController = ObjectStructureTreeListController;
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
                return (value.hasItems && !!value.path) || value.data.specifics === "none";
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
        Designer.DataMemberTreeListController = DataMemberTreeListController;
        var TabPanel = (function (_super) {
            __extends(TabPanel, _super);
            function TabPanel(tabs, autoSelectTab, rtl) {
                var _this = this;
                if (autoSelectTab === void 0) { autoSelectTab = false; }
                if (rtl === void 0) { rtl = false; }
                _super.call(this);
                this.tabs = [];
                this.collapsed = ko.observable(false);
                this.toggleCollapsedText = ko.pureComputed(function () { return DevExpress.Designer.getLocalization(_this.collapsed() ? "Open" : "Collapse"); });
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
                    _this.tabs.forEach(function (tab) {
                        tab.active(tab === selectedTab);
                    });
                    _this.collapsed(false);
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
        })(Designer.Disposable);
        Designer.TabPanel = TabPanel;
        var TabInfo = (function (_super) {
            __extends(TabInfo, _super);
            function TabInfo(text, template, model, imageBaseName, computedVisible) {
                var _this = this;
                _super.call(this);
                this.active = ko.observable(false);
                this.visible = ko.observable();
                imageBaseName = imageBaseName || text.toLowerCase();
                this.text = text;
                this.imageClassName = ko.pureComputed(function () {
                    return "dxrd-image-" + imageBaseName + (_this.active() ? "-active" : "-inactive");
                });
                this.template = template;
                this.visible = ko.pureComputed(function () { return computedVisible !== undefined ? computedVisible() : true; });
                this._disposables.push(this.visible.subscribe(function (visibility) {
                    if (!visibility) {
                        _this.active(false);
                    }
                }));
                this.model = model;
            }
            return TabInfo;
        })(Designer.Disposable);
        Designer.TabInfo = TabInfo;
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
        Designer.getFirstItemByPropertyValue = getFirstItemByPropertyValue;
        function findFirstItemMatchesCondition(array, predicate) {
            var result = null;
            array.some(function (value) {
                if (predicate(value)) {
                    result = value;
                }
                return !!result;
            });
            return result;
        }
        Designer.findFirstItemMatchesCondition = findFirstItemMatchesCondition;
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
        Designer.SortedArrayStore = SortedArrayStore;
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
        Designer.ControlsArrayStore = ControlsArrayStore;
        var ControlsStore = (function () {
            function ControlsStore(allControls) {
                this.dataSource = ko.computed(function () {
                    var dataSource = new DevExpress.data.DataSource({
                        store: new ControlsArrayStore(allControls()),
                        pageSize: 100
                    });
                    return dataSource;
                });
                this.visible = ko.computed(function () {
                    return allControls().length > 0;
                });
            }
            return ControlsStore;
        })();
        Designer.ControlsStore = ControlsStore;
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
        Designer.updateSurfaceContentSize = updateSurfaceContentSize;
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
        function generateDefaultParts(model) {
            return [
                { templateName: "dxrd-menubutton-template-base", model: model },
                { templateName: "dxrd-toolbar-template-base", model: model },
                { templateName: "dxrd-toolbox-template-base", model: model },
                { templateName: "dxrd-surface-template-base", model: model },
                { templateName: "dxrd-right-panel-template-base", model: model }
            ];
        }
        Designer.generateDefaultParts = generateDefaultParts;
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
        Designer.deleteSelection = deleteSelection;
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
        Designer.findNextSelection = findNextSelection;
        function getEditorType(typeString) {
            if (typeString === "multiValueWithLookUp") {
                return DevExpress.Designer.Widgets.editorTemplates.multiValue;
            }
            if (typeString === "multiValue") {
                return DevExpress.Designer.Widgets.editorTemplates.multiValueEditable;
            }
            if (typeString === "Enum") {
                return DevExpress.JS.Widgets.editorTemplates.combobox;
            }
            if (typeString === "System.String") {
                return DevExpress.JS.Widgets.editorTemplates.text;
            }
            if (typeString === "System.Guid") {
                return DevExpress.Designer.Widgets.editorTemplates.guid;
            }
            if (typeString === "System.SByte"
                || typeString === "System.Int32"
                || typeString === "System.Int16"
                || typeString === "System.Single"
                || typeString === "System.Double"
                || typeString === "System.Byte"
                || typeString === "System.UInt16"
                || typeString === "System.UInt32"
                || typeString === "System.Byte") {
                return DevExpress.JS.Widgets.editorTemplates.numeric;
            }
            if (typeString === "System.Boolean") {
                return DevExpress.JS.Widgets.editorTemplates.boolSelect;
            }
            if (typeString === "System.DateTime") {
                return DevExpress.JS.Widgets.editorTemplates.date;
            }
            if (typeString === "DevExpress.DataAccess.Expression") {
                return DevExpress.Designer.Widgets.editorTemplates.expressionEditor;
            }
            return DevExpress.JS.Widgets.editorTemplates.text;
        }
        Designer.getEditorType = getEditorType;
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
        Designer.createActionWrappingFunction = createActionWrappingFunction;
        function createDesigner(model, surface, controlsFactory, groups, editors, parts, rtl, selection, designControlsHelper) {
            if (groups === void 0) { groups = {}; }
            if (editors === void 0) { editors = []; }
            var undoEngine = ko.observable(new DevExpress.JS.Utils.UndoEngine(model)), actionUndoEngineWrappingFunction = createActionWrappingFunction("WrapWithUndoEngine", function (model, handler) {
                undoEngine().start();
                handler(model);
                undoEngine().end();
            }), selection = selection || new Designer.SurfaceSelection(), contextActionProviders = [], snapHelper = new Designer.SnapLinesHelper(surface), controlsHelper = designControlsHelper || new DesignControlsHelper(model, [{
                    added: function (control) { },
                    deleted: function (control) { control.surface == selection.focused() && selection.focused(findNextSelection(control.surface)); }
                }]), dragHelperContent = new Designer.DragHelperContent(selection), toolboxItems = Designer.getToolboxItems(controlsFactory.controlsMap), appMenuVisible = ko.observable(false), inlineTextEdit = new InlineTextEdit(selection), editableObject = Designer.CombinedObject.getEditableObject(selection, undoEngine).extend({ throttle: 1 }), popularProperties = new DevExpress.JS.Widgets.ObjectProperties(ko.pureComputed(function () {
                var popularPropertiesObject = { getInfo: function () { return []; } }, editable = editableObject();
                if (editable) {
                    var controlInfo = controlsFactory.controlsMap[editable.controlType], propertiesInfo = createPopularProperties(controlInfo && controlInfo.info || [], controlInfo && controlInfo.popularProperties || []);
                    if (editable["lockedInUserDesigner"]) {
                        popularPropertiesObject["isPropertyDisabled"] = function (name) { return editable["lockedInUserDesigner"](); };
                    }
                    (propertiesInfo).forEach(function (item) {
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
                    popularPropertiesObject["isPropertyVisible"] = editable["isPropertyVisible"];
                }
                return popularPropertiesObject;
            })), tabPanel = new TabPanel([new TabInfo("Properties", "dxrd-propertiestab", new Designer.Widgets.ControlProperties(editableObject, { groups: groups, editors: editors }), undefined)], undefined, rtl);
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
                controlsStore: new ControlsStore(controlsHelper.allControls),
                appMenuVisible: appMenuVisible,
                toggleAppMenu: function () {
                    appMenuVisible(!appMenuVisible());
                },
                actionLists: new Designer.ActionLists(surface, selection, undoEngine, function () { }),
                contextActionProviders: contextActionProviders,
                contextActions: ko.pureComputed(function () {
                    var editable = editableObject(), contextActions = [];
                    contextActionProviders.forEach(function (actionProvider) {
                        contextActions.push.apply(contextActions, actionProvider.getActions(editable));
                    });
                    actionUndoEngineWrappingFunction(contextActions);
                    return contextActions;
                }),
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
                    disabled: Designer.DragDropHandler.started
                },
                snapHelper: snapHelper,
                dragHelperContent: dragHelperContent,
                dragHandler: new Designer.SelectionDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent),
                toolboxDragHandler: new Designer.ToolboxDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory),
                updateFont: function (values) {
                    $.extend(DevExpress.JS.Widgets.availableFonts, values);
                }
            };
            designerModel["popularVisible"] = ko.pureComputed(function () {
                return designerModel.popularProperties._editors().some(function (x) { return x.visible(); }) || designerModel.contextActions().length > 0;
            });
            designerModel.parts = designerModel.parts || generateDefaultParts(designerModel);
            return designerModel;
        }
        Designer.createDesigner = createDesigner;
        function localizeNoneString(noneValue) {
            var value = ko.unwrap(noneValue);
            if (value === "none") {
                return Designer.getLocalization("none");
            }
            else if (value === "(none)") {
                return (Designer.getLocalization("(none)") !== "(none)") ? Designer.getLocalization("(none)") : ("(" + Designer.getLocalization("none") + ")");
            }
            return value;
        }
        Designer.localizeNoneString = localizeNoneString;
        ko.bindingHandlers['cssArray'] = {
            'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                for (var i = 0; i < value.length; i++) {
                    ko.bindingHandlers['css'].update(element, function () { return value[i]; });
                }
            }
        };
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var SnapLine = (function (_super) {
            __extends(SnapLine, _super);
            function SnapLine(x, y, isVertical, maxHeight, maxWidth) {
                var _this = this;
                if (y === void 0) { y = ko.observable(0); }
                if (isVertical === void 0) { isVertical = true; }
                if (maxHeight === void 0) { maxHeight = ko.observable(1001); }
                if (maxWidth === void 0) { maxWidth = ko.observable(1001); }
                _super.call(this);
                this.originalX = ko.observable(0);
                this.originalY = ko.observable(0);
                this.active = ko.observable(false);
                this.position = new Designer.Rectangle();
                this.isVertical = true;
                this.maxHeight = ko.observable(0);
                this.maxWidth = ko.observable(0);
                this.isVertical = isVertical;
                this._disposables.push(ko.computed(function () {
                    _this.maxHeight(maxHeight());
                    _this.maxWidth(maxWidth());
                    _this.originalX(x());
                    _this.originalY(y());
                    if (isVertical) {
                        _this.position.left(x());
                        _this.position.height(maxHeight());
                    }
                    else {
                        _this.position.top(y());
                        _this.position.width(maxWidth());
                    }
                }));
            }
            SnapLine.prototype.activate = function (position) {
                if (this.isVertical) {
                    var top = Math.min(this.originalY(), position.top), bottom = Math.max(this.originalY(), position.top);
                    this.position.height(bottom - top);
                    this.position.top(top);
                }
                else {
                    var left = Math.min(this.originalX(), position.left), right = Math.max(this.originalX(), position.left);
                    this.position.width(right - left);
                    this.position.left(left);
                }
                this.active(this.position.left() + this.position.width() < this.maxWidth() && this.position.height() + this.position.top() < this.maxHeight() && this.position.left() >= 0 && this.position.top() >= 0);
            };
            return SnapLine;
        })(Designer.Disposable);
        Designer.SnapLine = SnapLine;
        var SnapLinesHelper = (function () {
            function SnapLinesHelper(surface) {
                if (surface === void 0) { surface = null; }
                this.snapLines = ko.observableArray([]);
                this._surfaceContext = surface;
            }
            SnapLinesHelper.prototype._getActiveSnapLines = function (position, tolerance) {
                if (tolerance === void 0) { tolerance = SnapLinesHelper.snapTolerance; }
                var result = [], horizontalIndex = null, horizontalDistance = null, verticalIndex = null, verticalDistance = null;
                for (var i = 0; i < this.snapLines().length; i++) {
                    if (this.snapLines()[i].isVertical) {
                        var currentDistance = Math.abs(this.snapLines()[i].position.left() - position.left);
                        if (currentDistance < tolerance && (!verticalDistance || verticalDistance > currentDistance)) {
                            verticalDistance = currentDistance;
                            verticalIndex = i;
                        }
                    }
                    else {
                        var currentDistance = Math.abs(this.snapLines()[i].position.top() - position.top);
                        if (currentDistance < tolerance && (!horizontalDistance || horizontalDistance > currentDistance)) {
                            horizontalDistance = currentDistance;
                            horizontalIndex = i;
                        }
                    }
                }
                verticalIndex !== null && result.push(this.snapLines()[verticalIndex]);
                horizontalIndex !== null && result.push(this.snapLines()[horizontalIndex]);
                return result;
            };
            SnapLinesHelper.prototype.updateSnapLines = function () {
                var controls = [];
                var newSnapLines = [];
                Designer.collectionsVisitor(this._surfaceContext(), function (targetProperty) {
                    controls.push.apply(controls, targetProperty());
                }, ["bands", "controls", "rows", "cells"]);
                for (var i = 0; i < controls.length; i++) {
                    if (controls[i].isSnapTarget) {
                        Array.prototype.push.apply(newSnapLines, controls[i].snapLines());
                    }
                }
                this.snapLines(newSnapLines);
            };
            SnapLinesHelper.prototype.deactivateSnapLines = function () {
                for (var i = 0; i < this.snapLines().length; i++) {
                    this.snapLines()[i].active(false);
                }
                ;
            };
            SnapLinesHelper.prototype.activateSnapLines = function (position) {
                var activeSnapLines = this._getActiveSnapLines(position);
                for (var i = 0; i < activeSnapLines.length; i++) {
                    activeSnapLines[i].activate(position);
                }
            };
            SnapLinesHelper.snapTolerance = 10;
            return SnapLinesHelper;
        })();
        Designer.SnapLinesHelper = SnapLinesHelper;
        var DragHelperContent = (function (_super) {
            __extends(DragHelperContent, _super);
            function DragHelperContent(selectionProvider) {
                _super.call(this);
                this.controls = ko.observableArray([]);
                this.isLocked = ko.observable(false);
                this._selectionProvider = selectionProvider;
            }
            DragHelperContent.prototype.update = function (surface) {
                var _this = this;
                this.controls([]);
                this.left(surface.absolutePosition.x());
                this.top(surface.absolutePosition.y());
                this.width(surface.rect().width);
                this.height(surface.rect().height);
                this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (controlSurface) {
                    if (controlSurface.parent === surface.parent) {
                        _this.controls.push(new Designer.Rectangle(controlSurface.absolutePosition.x() - _this.left(), controlSurface.absolutePosition.y() - _this.top(), controlSurface.rect().width, controlSurface.rect().height));
                    }
                });
            };
            DragHelperContent.prototype.setContent = function (area) {
                this.controls([]);
                this.left(area.left());
                this.top(area.top());
                this.width(area.width());
                this.height(area.height());
                this.controls.push(area);
            };
            return DragHelperContent;
        })(Designer.Rectangle);
        Designer.DragHelperContent = DragHelperContent;
        var DragDropHandler = (function () {
            function DragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                var _this = this;
                this._size = new Designer.Size(0, 0);
                this.alwaysAlt = false;
                this.surface = surface;
                this.selection = selection;
                this.snapHelper = snapHelper;
                this.dragHelperContent = dragHelperContent;
                this.stopDrag = function (ui, draggable) {
                    undoEngine().start();
                    _this.doStopDrag(ui, draggable);
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
                    var controlSurface = Designer.findSurface(control);
                    var width = size.width(), height = size.height();
                    var left = (underCursor.x + width > targetWidth) ? (targetWidth - width - 1) : underCursor.x;
                    controlSurface.rect({ left: left, top: Math.max(underCursor.y, 0), width: width, height: height });
                    this.selection.initialize(controlSurface);
                }
            };
            DragDropHandler.prototype.recalculateSize = function (size) {
                var surface = ko.unwrap(this.surface);
                this._size.width(Designer.unitsToPixel(ko.unwrap(size.width) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
                this._size.height(Designer.unitsToPixel(ko.unwrap(size.height) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
            };
            DragDropHandler.prototype.helper = function (draggable) {
                this.snapHelper && this.snapHelper.updateSnapLines();
            };
            DragDropHandler.prototype.startDrag = function (draggable) { };
            DragDropHandler.prototype.drag = function (event, ui) {
                this.snapHelper && this.snapHelper.deactivateSnapLines();
                if (event.altKey !== true) {
                    var position = this._getAbsoluteSurfacePosition(ui);
                    this.snapHelper && this.snapHelper.activateSnapLines(position);
                    if (this._size.width() !== 0) {
                        this.snapHelper && this.snapHelper.activateSnapLines({ left: position.left + (this._size.width()), top: position.top });
                        this.snapHelper && this.snapHelper.activateSnapLines({ left: position.left, top: position.top + (this._size.height()) });
                    }
                }
                if (this.selection.dropTarget) {
                    var dropTarget = this.selection.dropTarget.getControlModel().getMetaData().isContainer ? this.selection.dropTarget : (this.selection.dropTarget.parent || this.selection.dropTarget), locked = dropTarget.locked;
                    var controlModel = ko.dataFor(event.target).getControlModel && ko.dataFor(event.target).getControlModel();
                    var metaData = controlModel && controlModel.getMetaData() || ko.dataFor(event.target).info;
                    if (metaData && metaData.canDrop) {
                        locked = locked || !metaData.canDrop(dropTarget, controlModel);
                    }
                    if (locked) {
                        this.snapHelper && this.snapHelper.deactivateSnapLines();
                        this.dragHelperContent && this.dragHelperContent.isLocked(true);
                    }
                    else {
                        this.dragHelperContent && this.dragHelperContent.isLocked(false);
                    }
                }
            };
            DragDropHandler.prototype.doStopDrag = function (ui, draggable) { };
            DragDropHandler.started = ko.observable(false);
            return DragDropHandler;
        })();
        Designer.DragDropHandler = DragDropHandler;
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
                    if (!dropTargetSurface || !dropTargetSurface.canDrop()) {
                        return;
                    }
                    var focusedSurface = this.selection.focused();
                    var dropPointRelativeX = ui.position.left;
                    var dropPointRelativeY = ui.position.top;
                    if (dropTargetSurface["absolutePosition"]) {
                        dropPointRelativeX -= dropTargetSurface["absolutePosition"].x();
                        dropPointRelativeY -= dropTargetSurface["absolutePosition"].y();
                        dropTargetSurface.underCursor().x = dropPointRelativeX - focusedSurface.underCursor().offsetX;
                        dropTargetSurface.underCursor().y = dropPointRelativeY - focusedSurface.underCursor().offsetY;
                    }
                    var adjustedTarget = this.adjustDropTarget(dropTargetSurface), focusedModel = focusedSurface.getControlModel(), parent = focusedModel.getNearestParent(adjustedTarget.getControlModel()), adjustedTarget = Designer.findSurface(parent), changeParent = adjustedTarget !== focusedSurface.parent;
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
        })(DragDropHandler);
        Designer.SelectionDragDropHandler = SelectionDragDropHandler;
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
                var size = Designer.Size.fromString(toolboxItem.info["@SizeF"] || toolboxItem.info["size"] || "100,23");
                this.recalculateSize(size);
                this.dragHelperContent.setContent(new Designer.Rectangle(0, 0, this._size.width(), this._size.height()));
            };
            ToolboxDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
                if (this.selection.dropTarget) {
                    var toolboxItem = draggable, control = this._controlsFactory.createControl($.extend({}, toolboxItem.info), null), parent = control.getNearestParent(this.selection.dropTarget.getControlModel()), dropTargetSurface = Designer.findSurface(parent);
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
        })(DragDropHandler);
        Designer.ToolboxDragDropHandler = ToolboxDragDropHandler;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="../utils.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Widgets;
        (function (Widgets) {
            var ControlProperties = (function (_super) {
                __extends(ControlProperties, _super);
                function ControlProperties(target, editorsInfo, level) {
                    var _this = this;
                    if (level === void 0) { level = 0; }
                    _super.call(this, target, editorsInfo, level);
                    this.focusedItem = ko.observable();
                    this.createEditorAddOn = function (editor) {
                        var editorAddOn = new DevExpress.JS.Widgets.EditorAddOn(editor, _this.popupService);
                        return {
                            templateName: editorAddOn.templateName,
                            data: editorAddOn
                        };
                    };
                    this.popupService = new DevExpress.JS.Utils.PopupService();
                    this.createGroups(editorsInfo.groups);
                    this.update(target());
                    this.focusedImageClassName = ko.pureComputed(function () {
                        return Designer.getImageClassName(target() && target().controlType);
                    });
                    this.focusedItem = target;
                    this.displayExpr = function (value) { return DevExpress.Designer.getControlFullName(value); };
                }
                ControlProperties.prototype.update = function (viewModel) {
                    _super.prototype.update.call(this, viewModel);
                    if (viewModel) {
                        (this.groups || []).forEach(function (group) {
                            group.update(viewModel);
                        });
                    }
                };
                ControlProperties.prototype.createGroups = function (groups) {
                    var _this = this;
                    this.groups = $.map(groups, function (groupInfo, displayName) {
                        return new Group(displayName, groupInfo, function (serializationInfo) { return _this.createEditors(serializationInfo); });
                    });
                };
                return ControlProperties;
            })(DevExpress.JS.Widgets.ObjectProperties);
            Widgets.ControlProperties = ControlProperties;
            var Group = (function (_super) {
                __extends(Group, _super);
                function Group(displayName, serializationsInfo, createEditors, collapsed) {
                    var _this = this;
                    if (collapsed === void 0) { collapsed = true; }
                    _super.call(this);
                    this.editors = ko.observableArray();
                    this.editorsCreated = ko.observable(false);
                    this.displayName = displayName;
                    this._serializationsInfo = serializationsInfo;
                    this.collapsed = ko.observable(collapsed);
                    this.visible = ko.observable(false);
                    if (collapsed) {
                        var subscription = this.collapsed.subscribe(function (val) {
                            subscription.dispose();
                            _this.editors(createEditors(serializationsInfo));
                            if (_this._viewModel) {
                                _this.editors().forEach(function (editor) {
                                    editor.update(_this._viewModel);
                                });
                            }
                        });
                    }
                    else {
                        this.editors(createEditors(serializationsInfo));
                    }
                }
                Group.prototype.update = function (viewModel) {
                    var _this = this;
                    this._viewModel = viewModel;
                    if (viewModel) {
                        var isVisible = (viewModel.getInfo && viewModel.getInfo() || this._serializationsInfo).filter(function (modelInfo) {
                            return _this._serializationsInfo.filter(function (info) { return info.propertyName === modelInfo.propertyName; }).length > 0
                                && !!viewModel[modelInfo.propertyName]
                                && ko.unwrap(modelInfo.visible) !== false;
                        }).length > 0;
                        this.visible(isVisible);
                        if (isVisible) {
                            this.editors().forEach(function (editor) {
                                editor.update(_this._viewModel);
                            });
                        }
                    }
                    else {
                        this.visible(false);
                    }
                };
                return Group;
            })(Designer.Disposable);
            Widgets.Group = Group;
            var MultiValuesHelper = (function () {
                function MultiValuesHelper(value, items) {
                    var _this = this;
                    this.selectedItems = ko.observable([]);
                    var values = value();
                    this._items = items.map(function (item) {
                        var selected = ko.observable(_this._isValueSelected(item.value, values));
                        return { selected: selected, value: item.value, displayValue: item.displayValue || item.value, toggleSelected: function () { selected(!selected()); } };
                    });
                    this.selectedItems = ko.pureComputed(function () {
                        return _this._items.filter(function (item) { return item.selected(); });
                    });
                    var selectionInProcess = ko.observable(false), isSelectedAllState, stringValue;
                    this.selectedValuesString = ko.pureComputed({
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
                    });
                    this.isSelectedAll = ko.pureComputed({
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
                    });
                    this.displayItems = [{ selected: this.isSelectedAll, value: null, displayValue: Designer.getLocalization('(Select All)'), toggleSelected: function () { _this.isSelectedAll(!_this.isSelectedAll()); } }].concat(this._items);
                    this.updateValue = function () {
                        value(_this._items.filter(function (item) { return item.selected(); }).map(function (item) { return item.value; }));
                    };
                    this.onOptionChanged = function (e) {
                        if (e.name !== "opened" || e.value)
                            return;
                        _this.updateValue();
                    };
                }
                MultiValuesHelper.prototype._isValueSelected = function (value, array) {
                    if (value instanceof Date) {
                        return array.filter(function (item) { return item - value === 0; }).length > 0;
                    }
                    return array.indexOf(value) !== -1;
                };
                return MultiValuesHelper;
            })();
            Widgets.MultiValuesHelper = MultiValuesHelper;
            var FieldListEditor = (function (_super) {
                __extends(FieldListEditor, _super);
                function FieldListEditor(modelPropertyInfo, level, parentDisabled) {
                    var _this = this;
                    _super.call(this, modelPropertyInfo, level, parentDisabled);
                    this.path = ko.pureComputed(function () {
                        return _this._model() && _this._model()["getPath"] && _this._model()["getPath"](_this.name) || "";
                    });
                    this.treeListController = new DevExpress.JS.Widgets.TreeListController();
                }
                return FieldListEditor;
            })(DevExpress.JS.Widgets.Editor);
            Widgets.FieldListEditor = FieldListEditor;
            var DataMemberEditor = (function (_super) {
                __extends(DataMemberEditor, _super);
                function DataMemberEditor(modelPropertyInfo, level, parentDisabled) {
                    _super.call(this, modelPropertyInfo, level, parentDisabled);
                    this.treeListController = new Designer.DataMemberTreeListController();
                }
                return DataMemberEditor;
            })(FieldListEditor);
            Widgets.DataMemberEditor = DataMemberEditor;
            var ColorPickerEditor = (function (_super) {
                __extends(ColorPickerEditor, _super);
                function ColorPickerEditor(info, level, parentDisabled) {
                    var _this = this;
                    _super.call(this, info, level, parentDisabled);
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
            })(DevExpress.JS.Widgets.Editor);
            Widgets.ColorPickerEditor = ColorPickerEditor;
        })(Widgets = Designer.Widgets || (Designer.Widgets = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
/// <reference path="widgets/propertygrid.ts" />
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Widgets;
        (function (Widgets) {
            Widgets.editorTemplates = {
                guid: { header: "dxrd-guid" },
                borders: { header: "dxrd-borders" },
                controls: { header: "dxrd-controls" },
                objecteditorCustom: { custom: "dxrd-objectEditorContent", editorType: DevExpress.JS.Widgets.PropertyGridEditor },
                treelist: { custom: "dxrd-treelistContent", editorType: DevExpress.JS.Widgets.Editor },
                field: { header: "dxrd-field", editorType: Widgets.FieldListEditor },
                dataMember: { header: "dxrd-field", editorType: Widgets.DataMemberEditor },
                filterEditor: { header: "dxrd-filterstring" },
                formatEditor: { header: "dxrd-formatstring" },
                expressionEditor: { header: "dxrd-expressionstring" },
                multiValue: { header: "dxrd-multivalue" },
                multiValueEditable: { custom: "dxrd-multivalue-editable" },
                customColorEditor: { header: "dxrd-colorpicker", editorType: Widgets.ColorPickerEditor }
            };
        })(Widgets = Designer.Widgets || (Designer.Widgets = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        Designer.sizeFake = [
            { propertyName: "height", displayName: "Height", editor: DevExpress.JS.Widgets.editorTemplates.numeric },
            { propertyName: "width", displayName: "Width", editor: DevExpress.JS.Widgets.editorTemplates.numeric }
        ];
        Designer.locationFake = [
            { propertyName: "x", displayName: "X", editor: DevExpress.JS.Widgets.editorTemplates.numeric },
            { propertyName: "y", displayName: "Y", editor: DevExpress.JS.Widgets.editorTemplates.numeric }
        ];
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var SurfaceSelection = (function () {
            function SurfaceSelection() {
                var _this = this;
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
        Designer.SurfaceSelection = SurfaceSelection;
        var CombinedObject = (function () {
            function CombinedObject() {
            }
            CombinedObject.combineInfo = function (infos) {
                var info = [];
                for (var i = 0; i < infos[0].length; i++) {
                    if (infos.filter(function (info) { return info.filter(function (x) { return x.propertyName === infos[0][i].propertyName; }).length > 0; }).length === infos.length) {
                        info.push(infos[0][i]);
                    }
                }
                return info;
            };
            CombinedObject.collectProperties = function (controls, allProperties) {
                for (var propertyName in controls[0]) {
                    if (CombinedObject.skipPropertyNames.indexOf(propertyName) !== -1) {
                        continue;
                    }
                    if (controls.filter(function (item) { return item[propertyName]; }).length === controls.length) {
                        var property = controls[0][propertyName];
                        if (ko.isObservable(property) && !property["push"]) {
                            allProperties[propertyName] = { properties: [].concat(controls.map(function (item) { return item[propertyName]; })) };
                        }
                        else if ($.isPlainObject(property) && !allProperties[propertyName]) {
                            allProperties[propertyName] = { object: {} };
                            CombinedObject.collectProperties(controls.map(function (item) { return item[propertyName]; }), allProperties[propertyName].object);
                        }
                        else if (propertyName === "getInfo") {
                            allProperties[propertyName] = function () {
                                return CombinedObject.combineInfo(controls.map(function (item) { return item["getInfo"](); }));
                            };
                        }
                        else if (propertyName === "isPropertyDisabled") {
                            allProperties[propertyName] = function (name) {
                                for (var i = 0; i < controls.length; i++) {
                                    if (controls[i]["isPropertyDisabled"](name)) {
                                        return true;
                                    }
                                }
                                return false;
                            };
                        }
                        else if (propertyName === "isPropertyVisible") {
                            allProperties[propertyName] = function (name) {
                                for (var i = 0; i < controls.length; i++) {
                                    if (!controls[i]["isPropertyVisible"](name)) {
                                        return false;
                                    }
                                }
                                return true;
                            };
                        }
                    }
                }
            };
            CombinedObject.createSubscribe = function (object, undoEngine, propertyName, properties) {
                object[propertyName].subscribe(function (val) {
                    undoEngine && undoEngine().start();
                    properties.properties.forEach(function (property) {
                        property(val);
                    });
                    undoEngine && undoEngine().end();
                });
            };
            CombinedObject.generateMergedObject = function (object, allProperties, controlsCount, undoEngine) {
                var isAdded = false;
                for (var propertyName in allProperties) {
                    if (propertyName === "getInfo" || propertyName === "isPropertyVisible" || propertyName === "isPropertyDisabled") {
                        object[propertyName] = allProperties[propertyName];
                    }
                    else if (allProperties[propertyName].object) {
                        var subObject = {};
                        if (CombinedObject.generateMergedObject(subObject, allProperties[propertyName].object, controlsCount, undoEngine)) {
                            isAdded = true;
                            object[propertyName] = subObject;
                        }
                    }
                    else if (allProperties[propertyName].properties && allProperties[propertyName].properties.length === controlsCount) {
                        isAdded = true;
                        var firstValue = allProperties[propertyName].properties[0].peek();
                        object[propertyName] = ko.observable(allProperties[propertyName].properties.every(function (property) { return firstValue === property.peek(); }) ? firstValue : null);
                        CombinedObject.createSubscribe(object, undoEngine, propertyName, allProperties[propertyName]);
                    }
                }
                ;
                return isAdded;
            };
            CombinedObject.mergeControls = function (controls, undoEngine) {
                var allProperties = {}, result = {};
                CombinedObject.collectProperties(controls, allProperties);
                CombinedObject.generateMergedObject(result, allProperties, controls.length, undoEngine);
                $.extend(result, { controlType: "multiselect", displayName: ko.observable("") });
                return result;
            };
            CombinedObject.getEditableObject = function (selectionProvider, undoEngine) {
                var editableObject = ko.observable(null);
                selectionProvider.focused.subscribe(function (newVal) {
                    newVal && editableObject(newVal.getControlModel());
                });
                return ko.pureComputed({
                    read: function () {
                        if (selectionProvider.selectedItems.length > 1) {
                            return CombinedObject.mergeControls(selectionProvider.selectedItems.map(function (item) { return item.getControlModel(); }), undoEngine);
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
            CombinedObject.skipPropertyNames = [];
            return CombinedObject;
        })();
        Designer.CombinedObject = CombinedObject;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        Designer.ActionId = {
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
        Designer.copyPasteStrategy = {
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
        var ActionLists = (function () {
            function ActionLists(surfaceContext, selection, undoEngine, customizeActions, copyPasteStrategy) {
                var _this = this;
                this.toolbarItems = [];
                this.menuItems = [];
                var copyPasteHandler = new CopyPasteHandler(selection, copyPasteStrategy), actions = [];
                var selectionControlsLocked = ko.computed(function () {
                    return selection.selectedItems.some(function (item) { return item.locked; });
                });
                this.keyboardHelper = new KeyboardHelper(selection, undoEngine);
                var zoomStep = ko.observable(0.01);
                actions.push({
                    id: Designer.ActionId.Cut,
                    text: "Cut",
                    imageClassName: "dxrd-image-cut",
                    disabled: ko.pureComputed(function () {
                        return !copyPasteHandler.canCopy() || selectionControlsLocked();
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
                    id: Designer.ActionId.Copy,
                    text: "Copy",
                    imageClassName: "dxrd-image-copy",
                    disabled: ko.pureComputed(function () {
                        return !copyPasteHandler.canCopy() || selectionControlsLocked();
                    }),
                    visible: true,
                    clickAction: function () {
                        copyPasteHandler.copy();
                    },
                    hotKey: { ctrlKey: true, keyCode: "C".charCodeAt(0) }
                });
                actions.push({
                    id: Designer.ActionId.Paste,
                    text: "Paste",
                    imageClassName: "dxrd-image-paste",
                    disabled: ko.pureComputed(function () {
                        return !copyPasteHandler.canPaste() || selectionControlsLocked();
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
                    id: Designer.ActionId.Delete,
                    text: "Delete",
                    imageClassName: "dxrd-image-delete",
                    disabled: ko.pureComputed(function () {
                        if (selection.focused()) {
                            return selection.focused().getControlModel().getMetaData().isDeleteDeny || selectionControlsLocked();
                        }
                        else {
                            return false;
                        }
                    }),
                    visible: true,
                    hotKey: { ctrlKey: false, keyCode: 46 },
                    clickAction: function () {
                        undoEngine().start();
                        Designer.deleteSelection(selection);
                        undoEngine().end();
                    }
                });
                actions.push({
                    id: Designer.ActionId.Undo,
                    text: "Undo",
                    imageClassName: "dxrd-image-undo",
                    disabled: ko.pureComputed(function () { return !undoEngine().undoEnabled() || selectionControlsLocked(); }),
                    visible: true,
                    clickAction: function () {
                        undoEngine().undo();
                    },
                    hotKey: { ctrlKey: true, keyCode: "Z".charCodeAt(0) },
                    hasSeparator: true
                });
                actions.push({
                    id: Designer.ActionId.Redo,
                    text: "Redo",
                    imageClassName: "dxrd-image-redo",
                    disabled: ko.pureComputed(function () { return !undoEngine().redoEnabled() || selectionControlsLocked(); }),
                    visible: true,
                    clickAction: function () {
                        undoEngine().redo();
                    },
                    hotKey: { ctrlKey: true, keyCode: "Y".charCodeAt(0) }
                });
                actions.push({
                    id: Designer.ActionId.ZoomOut,
                    text: "Zoom Out",
                    imageClassName: "dxrd-image-zoomout",
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 109 },
                    zoomStep: zoomStep,
                    clickAction: function () {
                        surfaceContext().zoom(Math.max(surfaceContext().zoom() - zoomStep(), 0.01));
                    },
                    hasSeparator: true
                });
                actions.push({
                    id: Designer.ActionId.ZoomSelector,
                    text: "Zoom 100%",
                    imageClassName: "dxrd-image-zoom",
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 187 },
                    clickAction: function () {
                        surfaceContext().zoom(1);
                    },
                    templateName: "dxrd-zoom-select-template",
                    zoomLevels: ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]),
                    zoom: ko.pureComputed({
                        read: function () { return surfaceContext().zoom(); },
                        write: function (val) { surfaceContext().zoom(val); }
                    })
                });
                actions.push({
                    id: Designer.ActionId.ZoomIn,
                    text: "Zoom In",
                    imageClassName: "dxrd-image-zoomin",
                    disabled: ko.observable(false),
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
                    _this._registerAction(action["container"] === "menu" ? _this.menuItems : _this.toolbarItems, action);
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
                var activeElement = $(document.activeElement);
                if (activeElement.is("textarea") || activeElement.is(":input") && (activeElement.attr("type") === "text" || activeElement.attr("type") === "number")) {
                    return;
                }
                if (!this.keyboardHelper.processShortcut(e)) {
                    for (var i = 0; i < actions.length; i++) {
                        if (actions[i].hotKey && (actions[i].disabled && !actions[i].disabled() || !actions[i].disabled)) {
                            if (actions[i].hotKey.ctrlKey === e.ctrlKey && actions[i].hotKey.keyCode === e.keyCode) {
                                actions[i].clickAction();
                                e.preventDefault();
                            }
                        }
                    }
                }
                else {
                    e.preventDefault();
                }
            };
            return ActionLists;
        })();
        Designer.ActionLists = ActionLists;
        var CopyPasteHandler = (function () {
            function CopyPasteHandler(selectionProvider, _copyPasteStrategy) {
                var _this = this;
                if (_copyPasteStrategy === void 0) { _copyPasteStrategy = Designer.copyPasteStrategy; }
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
                    && pasteTargetSurface.getControlModel().getMetaData().isContainer;
            };
            CopyPasteHandler.prototype.copy = function () {
                if (this.canCopy()) {
                    var serializer = new DevExpress.JS.Utils.ModelSerializer(), copyInfo = {
                        focused: this._selectionProvider.focused(),
                        objects: $.map(this._selectionProvider.selectedItems, function (item) {
                            return serializer.serialize(item.getControlModel());
                        })
                    };
                    this._copyInfo(copyInfo);
                }
            };
            CopyPasteHandler.prototype.cut = function () {
                var serializer = new DevExpress.JS.Utils.ModelSerializer(), cutInfo = {
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
                    var minPoint = new Designer.Point(Number.MAX_VALUE, Number.MAX_VALUE), maxPoint = new Designer.Point(-1, -1);
                    for (var i = 0; i < this._copyInfo().objects.length; i++) {
                        this._copyInfo().objects[i]["@Name"] = undefined;
                        var newControl = this._copyPasteStrategy.createChild(pasteTarget, this._copyInfo().objects[i]);
                        var newControlSurface = Designer.findSurface(newControl);
                        if (!newControlSurface)
                            continue;
                        var posMin = new Designer.Point(newControlSurface.rect().left, newControlSurface.rect().top);
                        var posMax = new Designer.Point(newControlSurface.rect().left + newControlSurface.rect().width, newControlSurface.rect().top + newControlSurface.rect().height);
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
                    var newOriginPoint = new Designer.Point(((pasteTargetSurface.rect().width - pasteTargetSurface["_context"].margins.right()) / 2) - ((maxPoint.x() - minPoint.x()) / 2) + (pasteTargetSurface["rtlLayout"]() ? pasteTargetSurface["_context"].margins.right() : 0), (pasteTargetSurface.rect().height / 2) - ((maxPoint.y() - minPoint.y()) / 2));
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
        Designer.CopyPasteHandler = CopyPasteHandler;
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
                    var asix = item.rect()[axisProperty];
                    if (asix < minAxis) {
                        minAxis = asix;
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
        Designer.KeyboardHelper = KeyboardHelper;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var ToolboxItem = (function () {
            function ToolboxItem(info) {
                this.info = info;
            }
            Object.defineProperty(ToolboxItem.prototype, "type", {
                get: function () {
                    return Designer.getTypeNameFromFullName(this.info["@ControlType"]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ToolboxItem.prototype, "imageClassName", {
                get: function () {
                    return Designer.getImageClassName(this.type);
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
        Designer.ToolboxItem = ToolboxItem;
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
        Designer.getToolboxItems = getToolboxItems;
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
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
            })(Designer.Disposable);
            Widgets.BordersModel = BordersModel;
            ko.bindingHandlers['dxBorderEditor'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(element).children().remove();
                    var templateHtml = $('#dxrd-bordereditor').text(), $element = $(element).append(templateHtml);
                    ko.applyBindings({ value: new BordersModel(valueAccessor(), viewModel.disabled) }, $element.children()[0]);
                    return { controlsDescendantBindings: true };
                }
            };
        })(Widgets = Designer.Widgets || (Designer.Widgets = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var dxFieldListPicker = (function (_super) {
            __extends(dxFieldListPicker, _super);
            function dxFieldListPicker(element, options) {
                _super.call(this, element, $.extend(options, { showClearButton: true }));
                this._path = ko.observable("");
                this._value = ko.observable("");
                this.option("path") && this._path(this.option("path"));
                this.option("value") && this._value(this.option("value"));
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
                return $.extend(_super.prototype._popupConfig.call(this), {
                    container: '.dx-viewport',
                    contentTemplate: this._options._templates.template,
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
                scroll.content().append('<div data-bind="treelist: $data"></div>');
                var context = ko.contextFor(this.element()[0]);
                var childContext = context.createChildContext({
                    itemsProvider: this.option("itemsProvider"), onItemsVisibilityChanged: function () {
                        _this._popup._renderPosition();
                    }, selectedPath: selectedPath, treeListController: this.option("treeListController"), path: this._path
                });
                ko.applyBindings(childContext, scroll.content()[0]);
                this._popup.content().append($scroll);
            };
            return dxFieldListPicker;
        })(DevExpress.ui.dxDropDownEditor);
        Designer.dxFieldListPicker = dxFieldListPicker;
        DevExpress.registerComponent("dxFieldListPicker", dxFieldListPicker);
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Widgets;
        (function (Widgets) {
            var PaddingModel = (function (_super) {
                __extends(PaddingModel, _super);
                function PaddingModel(object) {
                    var _this = this;
                    _super.call(this);
                    var isUpdated = false;
                    this.left = ko.observable(0);
                    this.right = ko.observable(0);
                    this.top = ko.observable(0);
                    this.bottom = ko.observable(0);
                    this.dpi = 100;
                    this._disposables.push(ko.computed(function () {
                        if (isUpdated)
                            return;
                        isUpdated = true;
                        if (object.value()) {
                            var val = object.value();
                            var components = val.split(',');
                            _this.left(parseFloat(components[0]) || 0);
                            _this.right(parseFloat(components[1]) || 0);
                            _this.top(parseFloat(components[2]) || 0);
                            _this.bottom(parseFloat(components[3]) || 0);
                            _this.dpi = parseFloat(components[4]) || 100;
                        }
                        isUpdated = false;
                    }));
                    this._disposables.push(ko.computed(function () {
                        if (_this.left() || _this.right() || _this.top() || _this.bottom()) {
                            var result = _this.left() + "," + _this.right() + "," + _this.top() + "," + _this.bottom() + "," + 100;
                            if (!isUpdated) {
                                object.value(result);
                            }
                        }
                    }));
                }
                return PaddingModel;
            })(Designer.Disposable);
            Widgets.PaddingModel = PaddingModel;
        })(Widgets = Designer.Widgets || (Designer.Widgets = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
//# sourceMappingURL=dx-designer-core.js.map