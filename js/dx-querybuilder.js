/**
* DevExpress HTML/JS Query Builder (dx-querybuilder.js)
* Version: 19.1.9
* Build date: 2020-01-27
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
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
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            Diagram.name = { propertyName: "name", modelName: "@Name", displayName: "Name", editor: Analytics.Widgets.editorTemplates.text, validationRules: Analytics.Internal.nameValidationRules };
            Diagram.text = { propertyName: "text", modelName: "@Text", displayName: "Text", editor: Analytics.Widgets.editorTemplates.text };
            Diagram.size = { propertyName: "size", modelName: "@Size", defaultVal: "100,50", from: Analytics.Elements.Size.fromString, displayName: "Size", editor: Analytics.Widgets.editorTemplates.objecteditor };
            Diagram.location = { propertyName: "location", modelName: "@Location", from: Analytics.Elements.Point.fromString, displayName: "Location", editor: Analytics.Widgets.editorTemplates.objecteditor };
            Diagram.sizeLocation = [Diagram.size, Diagram.location];
            Diagram.unknownSerializationsInfo = [Diagram.name].concat(Diagram.sizeLocation);
            var ConnectingPointDragHandler = (function (_super) {
                __extends(ConnectingPointDragHandler, _super);
                function ConnectingPointDragHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent) || this;
                    _this.startConnectingPoint = null;
                    _this.newConnector = null;
                    _this.cursor = 'arrow';
                    _this.containment = '.dxrd-ghost-container';
                    _this["helper"] = function (draggable) {
                        dragHelperContent.update(draggable);
                    };
                    return _this;
                }
                ConnectingPointDragHandler.prototype.startDrag = function (control) {
                    if (!(control instanceof ConnectingPointSurface)) {
                        throw new Error("ConnectingPointDragHandler can be applied to the ConnectingPoint only.");
                    }
                    this.startConnectingPoint = control;
                    var diagramElement = this.startConnectingPoint.parent.getControlModel();
                    this.newConnector = diagramElement.parentModel().createChild({ "@ControlType": "RoutedConnector" });
                    this.newConnector.startPoint().connectingPoint(this.startConnectingPoint.getControlModel());
                };
                ConnectingPointDragHandler.prototype.drag = function (event, ui) {
                    ui.position.left += ui["scroll"].left;
                    ui.position.top += ui["scroll"].top;
                    var position = this._getAbsoluteSurfacePosition(ui);
                    this.newConnectorSurface.endPoint().rect({ top: position.top, left: position.left });
                };
                ConnectingPointDragHandler.prototype.doStopDrag = function () {
                    this.dragHelperContent.reset();
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel();
                        if (dropTarget instanceof ConnectingPointViewModel) {
                            this.newConnector.endPoint().connectingPoint(dropTarget);
                        }
                        else if (dropTarget instanceof DiagramElementViewModel) {
                            var connectings = dropTarget.connectingPoints();
                            this.newConnector.endPoint().connectingPoint(connectings[0]);
                        }
                        this.selection.initialize(this.newConnectorSurface);
                    }
                };
                Object.defineProperty(ConnectingPointDragHandler.prototype, "newConnectorSurface", {
                    get: function () {
                        return this.newConnector && Analytics.Internal.findSurface(this.newConnector);
                    },
                    enumerable: true,
                    configurable: true
                });
                return ConnectingPointDragHandler;
            }(Analytics.Internal.DragDropHandler));
            Diagram.ConnectingPointDragHandler = ConnectingPointDragHandler;
            var ConnectionPointDragHandler = (function (_super) {
                __extends(ConnectionPointDragHandler, _super);
                function ConnectionPointDragHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent) || this;
                    _this.currentConnectionPoint = null;
                    _this.cursor = 'arrow';
                    _this.containment = '.dxrd-ghost-container';
                    _this["helper"] = function (draggable) {
                        dragHelperContent.update(draggable);
                    };
                    return _this;
                }
                ConnectionPointDragHandler.prototype.startDrag = function (control) {
                    if (!(control instanceof ConnectionPointSurface)) {
                        throw new Error("ConnectionPointDragHandler can be applied to the ConnectionPoint only.");
                    }
                    this.currentConnectionPoint = control;
                };
                ConnectionPointDragHandler.prototype.drag = function (event, ui) {
                    ui.position.left += ui["scroll"].left;
                    ui.position.top += ui["scroll"].top;
                    var position = this._getAbsoluteSurfacePosition(ui);
                    this.currentConnectionPoint.rect({ top: position.top, left: position.left });
                };
                ConnectionPointDragHandler.prototype.doStopDrag = function () {
                    this.dragHelperContent.reset();
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel();
                        if (dropTarget instanceof ConnectingPointViewModel) {
                            var connector = this.currentConnectionPoint.parent.getControlModel();
                            if (this.currentConnectionPoint.getControlModel() === connector.startPoint()) {
                                connector.startPoint().connectingPoint(dropTarget);
                            }
                            else {
                                connector.endPoint().connectingPoint(dropTarget);
                            }
                        }
                        else if (dropTarget instanceof DiagramElementViewModel) {
                            var connector = this.currentConnectionPoint.parent.getControlModel();
                            var connectings = dropTarget.connectingPoints();
                            if (this.currentConnectionPoint.getControlModel() === connector.startPoint()) {
                                connector.startPoint().connectingPoint(connectings[0]);
                            }
                            else {
                                connector.endPoint().connectingPoint(connectings[0]);
                            }
                        }
                    }
                };
                return ConnectionPointDragHandler;
            }(Analytics.Internal.DragDropHandler));
            Diagram.ConnectionPointDragHandler = ConnectionPointDragHandler;
            var DiagramElementBaseViewModel = (function (_super) {
                __extends(DiagramElementBaseViewModel, _super);
                function DiagramElementBaseViewModel(control, parent, serializer) {
                    return _super.call(this, control, parent, serializer) || this;
                }
                DiagramElementBaseViewModel.prototype.getControlFactory = function () {
                    return Diagram.controlsFactory;
                };
                return DiagramElementBaseViewModel;
            }(Analytics.Elements.ElementViewModel));
            Diagram.DiagramElementBaseViewModel = DiagramElementBaseViewModel;
            var DiagramElementViewModel = (function (_super) {
                __extends(DiagramElementViewModel, _super);
                function DiagramElementViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "DiagramElement" }, control), parent, serializer) || this;
                    _this.connectingPoints = Analytics.Utils.deserializeArray(control && control.ConnectingPoints || [], function (item) { return new ConnectingPointViewModel(item, _this, serializer); });
                    if (_this.text() === undefined) {
                        _this.text(_this.name());
                    }
                    return _this;
                }
                return DiagramElementViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.DiagramElementViewModel = DiagramElementViewModel;
            Diagram.diagramElementSerializationInfo = [Diagram.size, Diagram.location, Diagram.name, Diagram.text, { propertyName: "type", modelName: "@Type" }];
            var DiagramElementBaseSurface = (function (_super) {
                __extends(DiagramElementBaseSurface, _super);
                function DiagramElementBaseSurface(control, context, unitProperties) {
                    var _this = _super.call(this, control, context, $.extend({}, DiagramElementBaseSurface._unitProperties, unitProperties)) || this;
                    _this.template = "dx-diagram-element";
                    _this.selectiontemplate = "dx-diagram-element-selection";
                    _this.contenttemplate = "dx-diagram-element-content";
                    _this.margin = ko.observable(0);
                    _this._disposables.push(_this.positionWidthWithoutMargins = ko.pureComputed(function () {
                        return _this["position"].width() - _this.margin() * 2;
                    }));
                    _this._disposables.push(_this.positionLineHeightWithoutMargins = ko.pureComputed(function () {
                        return _this["position"].lineHeight() - _this.margin() * 2;
                    }));
                    return _this;
                }
                DiagramElementBaseSurface._unitProperties = {
                    _height: function (o) {
                        return o.size.height;
                    },
                    _width: function (o) {
                        return o.size.width;
                    },
                    _x: function (o) {
                        return o.location.x;
                    },
                    _y: function (o) {
                        return o.location.y;
                    }
                };
                return DiagramElementBaseSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Diagram.DiagramElementBaseSurface = DiagramElementBaseSurface;
            var DiagramElementSurface = (function (_super) {
                __extends(DiagramElementSurface, _super);
                function DiagramElementSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.contenttemplate = "dxdd-element-content-with-connecting-points";
                    return _this;
                }
                DiagramElementSurface.prototype._getChildrenHolderName = function () { return "connectingPoints"; };
                return DiagramElementSurface;
            }(DiagramElementBaseSurface));
            Diagram.DiagramElementSurface = DiagramElementSurface;
            var DiagramViewModel = (function (_super) {
                __extends(DiagramViewModel, _super);
                function DiagramViewModel(diagramSource) {
                    var _this = this;
                    var serializer = new Analytics.Utils.ModelSerializer();
                    _this = _super.call(this, diagramSource, null, serializer) || this;
                    _this.controlType = "Diagram";
                    _this.controls = ko.observableArray();
                    _this.name("Diagram");
                    return _this;
                }
                DiagramViewModel.prototype.getInfo = function () {
                    return Diagram.diagramSerializationsInfo;
                };
                return DiagramViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.DiagramViewModel = DiagramViewModel;
            Diagram.margins = { propertyName: "margins", modelName: "@Margins", from: Analytics.Elements.Margins.fromString, displayName: "Margins" };
            Diagram.pageWidth = { propertyName: "pageWidth", modelName: "@PageWidth", defaultVal: 850, from: Analytics.Utils.floatFromModel, displayName: "Page Width", editor: Analytics.Widgets.editorTemplates.numeric };
            Diagram.pageHeight = { propertyName: "pageHeight", modelName: "@PageHeight", defaultVal: 1250, from: Analytics.Utils.floatFromModel, displayName: "Page Height", editor: Analytics.Widgets.editorTemplates.numeric };
            Diagram.diagramSerializationsInfo = [Diagram.name, Diagram.pageWidth, Diagram.pageHeight, Diagram.margins];
            var DiagramSurface = (function (_super) {
                __extends(DiagramSurface, _super);
                function DiagramSurface(diagram, zoom) {
                    if (zoom === void 0) { zoom = ko.observable(1); }
                    var _this = _super.call(this, diagram, {
                        measureUnit: ko.observable("Pixels"),
                        zoom: zoom,
                        dpi: ko.observable(100)
                    }, DiagramSurface._unitProperties) || this;
                    _this.measureUnit = ko.observable("Pixels");
                    _this.dpi = ko.observable(100);
                    _this.controls = ko.observableArray();
                    _this.allowMultiselect = false;
                    _this.focused = ko.observable(false);
                    _this.selected = ko.observable(false);
                    _this.underCursor = ko.observable(new Analytics.Internal.HoverInfo());
                    _this.parent = null;
                    _this.templateName = "dx-diagram-surface";
                    _this.margins = { bottom: _this["_bottom"], left: _this["_left"], right: _this["_right"], top: _this["_top"] };
                    _this.zoom = zoom;
                    _this._context = _this;
                    Analytics.Internal.createObservableArrayMapCollection(diagram.controls, _this.controls, _this._createSurface);
                    return _this;
                }
                DiagramSurface.prototype.checkParent = function (surfaceParent) { return false; };
                DiagramSurface.prototype.getChildrenCollection = function () {
                    return ko.observableArray([]);
                };
                DiagramSurface._unitProperties = {
                    _width: function (o) { return o.pageWidth; },
                    _height: function (o) { return o.pageWidth; },
                    pageWidth: function (o) { return o.pageWidth; },
                    pageHeight: function (o) { return o.pageHeight; },
                    _bottom: function (o) { return o.margins.bottom; },
                    _left: function (o) { return o.margins.left; },
                    _right: function (o) { return o.margins.right; },
                    _top: function (o) { return o.margins.top; }
                };
                return DiagramSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Diagram.DiagramSurface = DiagramSurface;
            var ConnectionPointViewModel = (function (_super) {
                __extends(ConnectionPointViewModel, _super);
                function ConnectionPointViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend(control, { "@ControlType": "ConnectionPoint" }), parent, serializer) || this;
                    var _x = _this.location.x, _y = _this.location.y;
                    _this.location.x = ko.pureComputed({
                        read: function () {
                            return _this.connectingPoint() && _this.connectingPoint().location.x() || _x();
                        },
                        write: function (value) {
                            _this.connectingPoint(null);
                            _x(value);
                        }
                    });
                    _this.location.y = ko.pureComputed({
                        read: function () {
                            return _this.connectingPoint() && _this.connectingPoint().location.y() || _y();
                        },
                        write: function (value) {
                            _this.connectingPoint(null);
                            _y(value);
                        }
                    });
                    return _this;
                }
                return ConnectionPointViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.ConnectionPointViewModel = ConnectionPointViewModel;
            Diagram.connectionPointSerializationInfo = [
                Diagram.location,
                { propertyName: "connectingPoint", modelName: "@ConnectingPoint", link: true }
            ];
            var ConnectionPointSurface = (function (_super) {
                __extends(ConnectionPointSurface, _super);
                function ConnectionPointSurface(control, context) {
                    var _this = _super.call(this, control, context, ConnectionPointSurface._unitProperties) || this;
                    _this.template = "dx-diagram-connection-point";
                    _this.selectiontemplate = "dx-diagram-connection-point";
                    _this.relativeX = ko.pureComputed(function () {
                        return _this.rect().left - _this.parent.rect().left;
                    });
                    _this.relativeY = ko.pureComputed(function () {
                        return _this.rect().top - _this.parent.rect().top;
                    });
                    return _this;
                }
                ConnectionPointSurface.prototype.container = function () {
                    return this.getRoot();
                };
                ConnectionPointSurface._unitProperties = {
                    _x: function (o) {
                        return o.location.x;
                    },
                    _y: function (o) {
                        return o.location.y;
                    }
                };
                return ConnectionPointSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Diagram.ConnectionPointSurface = ConnectionPointSurface;
            var ConnectorViewModel = (function (_super) {
                __extends(ConnectorViewModel, _super);
                function ConnectorViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "Connector" }, control), parent, serializer) || this;
                    _this.startPoint(_this.startPoint() || new ConnectionPointViewModel({ "@Location": "0, 0" }, _this, serializer));
                    _this.endPoint(_this.endPoint() || new ConnectionPointViewModel({ "@Location": "150, 75" }, _this, serializer));
                    _this.location = new Analytics.Elements.Point(0, 0);
                    _this.location.x = ko.pureComputed({
                        read: function () {
                            return _this.getX();
                        },
                        write: function (value) {
                            var oldValue = _this.startPoint().location.x() < _this.endPoint().location.x() ? _this.startPoint().location.x() : _this.endPoint().location.x();
                            var delta = value - oldValue;
                            _this.startPoint().location.x(_this.startPoint().location.x() + delta);
                            _this.endPoint().location.x(_this.endPoint().location.x() + delta);
                        }
                    });
                    _this.location.y = ko.pureComputed({
                        read: function () {
                            return _this.getY();
                        },
                        write: function (value) {
                            var oldValue = _this.startPoint().location.y() < _this.endPoint().location.y() ? _this.startPoint().location.y() : _this.endPoint().location.y();
                            var delta = value - oldValue;
                            _this.startPoint().location.y(_this.startPoint().location.y() + delta);
                            _this.endPoint().location.y(_this.endPoint().location.y() + delta);
                        }
                    });
                    _this.size = new Analytics.Elements.Size(0, 0);
                    _this.size.width = ko.pureComputed({
                        read: function () {
                            return _this.getWidth();
                        },
                        write: function (value) {
                            if (_this.startPoint().location.x() < _this.endPoint().location.x()) {
                                _this.endPoint().location.x(_this.startPoint().location.x() + value);
                            }
                            else {
                                _this.startPoint().location.x(_this.endPoint().location.x() + value);
                            }
                        }
                    });
                    _this.size.height = ko.pureComputed({
                        read: function () {
                            return _this.getHeight();
                        },
                        write: function (value) {
                            if (_this.startPoint().location.y() < _this.endPoint().location.y()) {
                                _this.endPoint().location.y(_this.startPoint().location.y() + value);
                            }
                            else {
                                _this.startPoint().location.y(_this.endPoint().location.y() + value);
                            }
                        }
                    });
                    return _this;
                }
                ConnectorViewModel.prototype.getX = function () {
                    return this.startPoint().location.x() < this.endPoint().location.x() ? this.startPoint().location.x() : this.endPoint().location.x();
                };
                ConnectorViewModel.prototype.getY = function () {
                    return this.startPoint().location.y() < this.endPoint().location.y() ? this.startPoint().location.y() : this.endPoint().location.y();
                };
                ConnectorViewModel.prototype.getWidth = function () {
                    return Math.abs(this.startPoint().location.x() - this.endPoint().location.x()) || ConnectorViewModel.MIN_LINE_THICKNESS;
                };
                ConnectorViewModel.prototype.getHeight = function () {
                    return Math.abs(this.startPoint().location.y() - this.endPoint().location.y()) || ConnectorViewModel.MIN_LINE_THICKNESS;
                };
                ConnectorViewModel.MIN_LINE_THICKNESS = 3;
                return ConnectorViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.ConnectorViewModel = ConnectorViewModel;
            var ConnectorSurface = (function (_super) {
                __extends(ConnectorSurface, _super);
                function ConnectorSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.template = "dxdd-connector";
                    _this.selectiontemplate = "dxdd-connector-selection";
                    _this.startPoint = ko.pureComputed(function () {
                        return new ConnectionPointSurface(control.startPoint(), context);
                    });
                    _this.endPoint = ko.pureComputed(function () {
                        return new ConnectionPointSurface(control.endPoint(), context);
                    });
                    return _this;
                }
                return ConnectorSurface;
            }(DiagramElementBaseSurface));
            Diagram.ConnectorSurface = ConnectorSurface;
            var RoutedConnectorViewModel = (function (_super) {
                __extends(RoutedConnectorViewModel, _super);
                function RoutedConnectorViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "RoutedConnector" }, control), parent, serializer) || this;
                    _this._isUpdating = false;
                    _this._getPower = function (_n) {
                        for (var i = 0; i < 10; i++) {
                            if (_n >= Math.pow(2, i) && _n < Math.pow(2, i + 1)) {
                                return i + 1;
                            }
                        }
                        return 1;
                    };
                    _this.seriesNumber = ko.observable(1);
                    _this.routePoints = ko.observable([]);
                    _this.freezeRoute = ko.observable(false);
                    _this._disposables.push(ko.computed(function () {
                        var freezeRoute = !(1 + _this.startPoint().location.x() + _this.startPoint().location.y()
                            + _this.endPoint().location.x() + _this.endPoint().location.y());
                        if (!_this._isUpdating) {
                            _this.freezeRoute(freezeRoute);
                        }
                    }));
                    _this._disposables.push(ko.computed(function () {
                        if (!_this.freezeRoute()) {
                            var result = [];
                            var startPointSide = _this._getStartPointSide();
                            var endPointSide = _this._getEndPointSide();
                            var startPoint = new Analytics.Elements.Point(_this.startPoint().location.x(), _this.startPoint().location.y()), endPoint = new Analytics.Elements.Point(_this.endPoint().location.x(), _this.endPoint().location.y());
                            if (_this.startPoint().connectingPoint()) {
                                _this._fixPoint(startPoint, _this.startPoint().connectingPoint().side());
                                result.push(startPoint);
                            }
                            if (_this.endPoint().connectingPoint()) {
                                _this._fixPoint(endPoint, _this.endPoint().connectingPoint().side());
                            }
                            var baseX = Math.min(startPoint.x(), endPoint.x()), baseY = Math.min(startPoint.y(), endPoint.y()), width = Math.abs(startPoint.x() - endPoint.x()), height = Math.abs(startPoint.y() - endPoint.y());
                            var number = _this.seriesNumber();
                            var ratio = _this._getRatio(number);
                            var indent = (number - 1) * RoutedConnectorViewModel.GRID_SIZE;
                            if (startPoint.y() - endPoint.y() > 0) {
                                if (startPoint.x() - endPoint.x() > 0) {
                                    if (startPointSide === PointSide.North || startPointSide === PointSide.East) {
                                        if (endPointSide === PointSide.North || endPointSide === PointSide.East) {
                                            if (number !== 1) {
                                                width += indent;
                                                result.push(new Analytics.Elements.Point(baseX + width, baseY + height));
                                            }
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height * ratio));
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === PointSide.South || endPointSide === PointSide.West) {
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY + height));
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY));
                                        }
                                    }
                                }
                                else {
                                    if (startPointSide === PointSide.North || startPointSide === PointSide.West) {
                                        if (endPointSide === PointSide.North || endPointSide === PointSide.West) {
                                            if (number !== 1) {
                                                baseX -= indent;
                                                result.push(new Analytics.Elements.Point(baseX, baseY + height));
                                            }
                                            result.push(new Analytics.Elements.Point(baseX, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height * ratio));
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === PointSide.South || endPointSide === PointSide.East) {
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY + height));
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY));
                                        }
                                    }
                                }
                            }
                            else {
                                if (startPoint.x() - endPoint.x() > 0) {
                                    if (startPointSide === PointSide.South || startPointSide === PointSide.East) {
                                        if (endPointSide === PointSide.South || endPointSide === PointSide.East) {
                                            if (number !== 1) {
                                                width += indent;
                                                result.push(new Analytics.Elements.Point(baseX + width, baseY));
                                            }
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height * ratio));
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === PointSide.North || endPointSide === PointSide.West) {
                                            result.push(new Analytics.Elements.Point(baseX, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY));
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY + height));
                                        }
                                    }
                                }
                                else {
                                    if (startPointSide === PointSide.South || startPointSide === PointSide.West) {
                                        if (endPointSide === PointSide.South || endPointSide === PointSide.West) {
                                            if (number !== 1) {
                                                baseX -= indent;
                                                result.push(new Analytics.Elements.Point(baseX, baseY));
                                            }
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX, baseY + height * ratio));
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === PointSide.North || endPointSide === PointSide.East) {
                                            result.push(new Analytics.Elements.Point(baseX + width, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY));
                                            result.push(new Analytics.Elements.Point(baseX + width * ratio, baseY + height));
                                        }
                                    }
                                }
                            }
                            if (_this.endPoint().connectingPoint()) {
                                result.push(endPoint);
                            }
                            _this.routePoints(result);
                        }
                    }));
                    return _this;
                }
                RoutedConnectorViewModel.prototype.getX = function () {
                    var result = _super.prototype.getX.call(this);
                    this.routePoints && this.routePoints().forEach(function (point) {
                        if (point.x() < result) {
                            result = point.x();
                        }
                    });
                    return result;
                };
                RoutedConnectorViewModel.prototype.getY = function () {
                    var result = _super.prototype.getY.call(this);
                    this.routePoints && this.routePoints().forEach(function (point) {
                        if (point.y() < result) {
                            result = point.y();
                        }
                    });
                    return result;
                };
                RoutedConnectorViewModel.prototype.getWidth = function () {
                    var result = _super.prototype.getWidth.call(this);
                    var baseX = this.getX();
                    this.routePoints && [this.startPoint().location, this.endPoint().location].concat(this.routePoints()).forEach(function (point) {
                        if (point.x() - baseX > result) {
                            result = point.x() - baseX;
                        }
                    });
                    return result;
                };
                RoutedConnectorViewModel.prototype.getHeight = function () {
                    var result = _super.prototype.getHeight.call(this);
                    var baseY = this.getY();
                    this.routePoints && [this.startPoint().location, this.endPoint().location].concat(this.routePoints()).forEach(function (point) {
                        if (point.y() - baseY > result) {
                            result = point.y() - baseY;
                        }
                    });
                    return Math.round(result);
                };
                RoutedConnectorViewModel.prototype._fixPoint = function (point, side) {
                    switch (side) {
                        case PointSide.North:
                            point.y(point.y() - RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case PointSide.East:
                            point.x(point.x() + RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case PointSide.West:
                            point.x(point.x() - RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case PointSide.South:
                            point.y(point.y() + RoutedConnectorViewModel.GRID_SIZE);
                    }
                };
                RoutedConnectorViewModel.prototype._getStartPointSide = function () {
                    if (this.startPoint().connectingPoint()) {
                        return this.startPoint().connectingPoint().side();
                    }
                    if (this.startPoint().location.y() !== this.endPoint().location.y()) {
                        if (this.startPoint().location.y() > this.endPoint().location.y()) {
                            return PointSide.North;
                        }
                        else {
                            return PointSide.South;
                        }
                    }
                    else {
                        if (this.startPoint().location.x() > this.endPoint().location.x()) {
                            return PointSide.West;
                        }
                        else {
                            return PointSide.East;
                        }
                    }
                };
                RoutedConnectorViewModel.prototype._getEndPointSide = function () {
                    if (this.endPoint().connectingPoint()) {
                        return this.endPoint().connectingPoint().side();
                    }
                    if (this.startPoint().location.y() !== this.endPoint().location.y()) {
                        if (this.startPoint().location.y() > this.endPoint().location.y()) {
                            return PointSide.South;
                        }
                        else {
                            return PointSide.North;
                        }
                    }
                    else {
                        if (this.startPoint().location.x() > this.endPoint().location.x()) {
                            return PointSide.East;
                        }
                        else {
                            return PointSide.West;
                        }
                    }
                };
                RoutedConnectorViewModel.prototype._getRatio = function (n) {
                    var pow2Delimiter = this._getPower(n);
                    var delimiter = Math.pow(2, pow2Delimiter);
                    var halfDelimeter = Math.pow(2, pow2Delimiter - 1);
                    var arr = [];
                    for (var i = 1; i < halfDelimeter; i++) {
                        if (i % 2 == 0) {
                            continue;
                        }
                        arr.push(delimiter - i);
                        arr.push(i);
                    }
                    arr.reverse();
                    var delta = n - halfDelimeter;
                    var number = arr[delta] || 1;
                    return number / delimiter;
                };
                RoutedConnectorViewModel.prototype.beginUpdate = function () { this._isUpdating = true; };
                RoutedConnectorViewModel.prototype.endUpdate = function () { this._isUpdating = false; };
                RoutedConnectorViewModel.GRID_SIZE = 10;
                return RoutedConnectorViewModel;
            }(ConnectorViewModel));
            Diagram.RoutedConnectorViewModel = RoutedConnectorViewModel;
            var RoutedConnectorSurface = (function (_super) {
                __extends(RoutedConnectorSurface, _super);
                function RoutedConnectorSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.template = "dxdd-routed-connector";
                    _this.selectiontemplate = "dxdd-routed-connector-selection";
                    _this.showArrow = ko.observable(false);
                    _this.isVisible = ko.observable(true);
                    _this.routePoints = ko.observableArray();
                    _this.routePointsSet = ko.pureComputed(function () {
                        var points = [];
                        _this.routePoints().forEach(function (point) {
                            points.push(point.x() + " " + point.y());
                        });
                        return points.join(", ");
                    });
                    _this.routeLineWrappers = ko.pureComputed(function () {
                        var result = [];
                        for (var i = 1; i < _this.routePoints().length; i++) {
                            result.push(_this._createRouteLineWrapper(_this.routePoints()[i - 1], _this.routePoints()[i], i === 1 || i === _this.routePoints().length - 1));
                        }
                        return result;
                    });
                    _this.connectorID = function () { return _this._connectorID; };
                    _this._connectorID = RoutedConnectorSurface._connectorsCount++;
                    _this.startPoint = ko.pureComputed(function () {
                        return new ConnectionPointSurface(control.startPoint(), context);
                    });
                    _this.endPoint = ko.pureComputed(function () {
                        return new ConnectionPointSurface(control.endPoint(), context);
                    });
                    _this._disposables.push(control.routePoints.subscribe(function (routePoints) {
                        _this._updateRoutePoints();
                    }));
                    _this._updateRoutePoints();
                    return _this;
                }
                RoutedConnectorSurface.prototype._createRoutePoint = function (point, base) {
                    var _this = this;
                    return {
                        x: ko.pureComputed(function () {
                            if (_this._context.rtl()) {
                                return Math.round(_this.getControlModel().size.width() - (point.x() - base.x()));
                            }
                            else {
                                return Math.round(point.x() - base.x());
                            }
                        }),
                        y: ko.pureComputed(function () { return Math.round(point.y() - base.y()); }),
                        modelPoint: point
                    };
                };
                RoutedConnectorSurface.prototype._createRouteLineWrapper = function (point1, point2, isLocked) {
                    var _this = this;
                    if (isLocked === void 0) { isLocked = false; }
                    var _self = this, isVerticalLine = Math.abs(point1.x.peek() - point2.x.peek()) < 1, absoluteTop = point1.modelPoint.y.peek(), absoluteLeft = point1.modelPoint.x.peek(), position = {
                        top: Math.min(point1.y.peek(), point2.y.peek()) - 2,
                        left: Math.min(point1.x.peek(), point2.x.peek()) - 2,
                        width: Math.abs(point1.x.peek() - point2.x.peek()) + 6,
                        height: Math.abs(point1.y.peek() - point2.y.peek()) + 6
                    }, resizeHandler = function (params) {
                        _self._control.freezeRoute(true);
                        try {
                            _self._control.beginUpdate();
                            if (isVerticalLine) {
                                if (_this._context.rtl()) {
                                    var newX = absoluteLeft - params.delta.dx;
                                }
                                else {
                                    var newX = absoluteLeft + params.delta.dx;
                                }
                                point1.modelPoint.x(newX);
                                point2.modelPoint.x(newX);
                            }
                            else {
                                var newY = absoluteTop + params.delta.dy;
                                point1.modelPoint.y(newY);
                                point2.modelPoint.y(newY);
                            }
                        }
                        finally {
                            _self._control.endUpdate();
                        }
                    };
                    return {
                        position: position,
                        isVerticalLine: isVerticalLine,
                        resizeHandler: resizeHandler,
                        resizeStopped: function () {
                            _self._control.routePoints.notifySubscribers(_self._control.routePoints());
                        },
                        isLocked: ko.observable(isLocked)
                    };
                };
                RoutedConnectorSurface.prototype._updateRoutePoints = function () {
                    var _this = this;
                    var points = [], control = this.getControlModel(), base = control.location;
                    points.push(this._createRoutePoint(control.startPoint().location, base));
                    control.routePoints().forEach(function (point) {
                        points.push(_this._createRoutePoint(point, base));
                    });
                    points.push(this._createRoutePoint(control.endPoint().location, base));
                    this.routePoints(points);
                };
                RoutedConnectorSurface._connectorsCount = 0;
                return RoutedConnectorSurface;
            }(DiagramElementBaseSurface));
            Diagram.RoutedConnectorSurface = RoutedConnectorSurface;
            var ConnectingPointViewModel = (function (_super) {
                __extends(ConnectingPointViewModel, _super);
                function ConnectingPointViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "ConnectingPoint" }, control), parent, serializer) || this;
                    _this.side = ko.pureComputed(function () {
                        if (_this.percentOffsetY() >= _this.percentOffsetX()) {
                            if (_this.percentOffsetY() > 1 - _this.percentOffsetX()) {
                                return PointSide.South;
                            }
                            else {
                                return PointSide.West;
                            }
                        }
                        else {
                            if (_this.percentOffsetY() > 1 - _this.percentOffsetX()) {
                                return PointSide.East;
                            }
                            else {
                                return PointSide.North;
                            }
                        }
                    });
                    _this.size = new Analytics.Elements.Size(7, 7);
                    _this.location = new Analytics.Elements.Point(0, 0);
                    _this.location.x = ko.pureComputed(function () {
                        var parentModel = _this.parentModel();
                        return parentModel.location.x() + parentModel.size.width() * _this.percentOffsetX();
                    });
                    _this.location.y = ko.pureComputed(function () {
                        var parentModel = _this.parentModel();
                        return parentModel.location.y() + parentModel.size.height() * _this.percentOffsetY();
                    });
                    return _this;
                }
                return ConnectingPointViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.ConnectingPointViewModel = ConnectingPointViewModel;
            Diagram.connectingPointSerializationInfo = [
                { propertyName: "percentOffsetX", modelName: "@PercentOffsetX", defaultVal: 0.5, from: Analytics.Utils.floatFromModel },
                { propertyName: "percentOffsetY", modelName: "@PercentOffsetY", defaultVal: 0.5, from: Analytics.Utils.floatFromModel }
            ];
            var ConnectingPointSurface = (function (_super) {
                __extends(ConnectingPointSurface, _super);
                function ConnectingPointSurface(control, context) {
                    var _this = _super.call(this, control, context, ConnectingPointSurface._unitProperties) || this;
                    _this.template = "dxdd-connecting-point";
                    _this.selectiontemplate = "dxdd-connection-point-selection";
                    _this.contenttemplate = "";
                    return _this;
                }
                ConnectingPointSurface._unitProperties = {
                    _x: function (o) {
                        return ko.pureComputed(function () { return o.location.x() - o.parentModel().location.x(); });
                    },
                    _y: function (o) {
                        return ko.pureComputed(function () { return o.location.y() - o.parentModel().location.y(); });
                    }
                };
                return ConnectingPointSurface;
            }(DiagramElementBaseSurface));
            Diagram.ConnectingPointSurface = ConnectingPointSurface;
            Diagram.controlsFactory = new Analytics.Utils.ControlsFactory();
            function registerControls() {
                Diagram.controlsFactory.registerControl("Unknown", {
                    info: Diagram.unknownSerializationsInfo,
                    type: Analytics.Elements.ElementViewModel,
                    nonToolboxItem: true,
                    surfaceType: Analytics.Elements.SurfaceElementBase
                });
                Diagram.controlsFactory.registerControl("Connector", {
                    info: [
                        Diagram.name,
                        { propertyName: "location", displayName: "Location", editor: Analytics.Widgets.editorTemplates.objecteditor },
                        { propertyName: "startPoint", modelName: "@StartPoint", link: true },
                        { propertyName: "endPoint", modelName: "@EndPoint", link: true }
                    ],
                    surfaceType: ConnectorSurface,
                    type: ConnectorViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("RoutedConnector", {
                    info: [
                        Diagram.name,
                        { propertyName: "location", displayName: "Location", editor: Analytics.Widgets.editorTemplates.objecteditor },
                        { propertyName: "startPoint", modelName: "@StartPoint", link: true },
                        { propertyName: "endPoint", modelName: "@EndPoint", link: true }
                    ],
                    surfaceType: RoutedConnectorSurface,
                    type: RoutedConnectorViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("ConnectionPoint", {
                    info: Diagram.connectionPointSerializationInfo,
                    surfaceType: ConnectionPointSurface,
                    type: ConnectionPointViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                Diagram.controlsFactory.registerControl("Diagram", {
                    info: Diagram.diagramSerializationsInfo,
                    surfaceType: DiagramSurface,
                    popularProperties: ["name"],
                    type: DiagramViewModel,
                    elementActionsTypes: [],
                    isContainer: true,
                    nonToolboxItem: true
                });
                Diagram.controlsFactory.registerControl("DiagramElement", {
                    info: Diagram.diagramElementSerializationInfo,
                    defaultVal: {
                        "@SizeF": "150,50",
                        "ConnectingPoints": {
                            "Item1": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "1",
                                "@PercentOffsetY": "0.5",
                            },
                            "Item2": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "1",
                            },
                            "Item3": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "0",
                            },
                            "Item4": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0",
                                "@PercentOffsetY": "0.5",
                            }
                        }
                    },
                    surfaceType: DiagramElementSurface,
                    popularProperties: ["text"],
                    type: DiagramElementViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("Ellipse", {
                    info: Diagram.diagramElementSerializationInfo,
                    defaultVal: {
                        "@SizeF": "150,50",
                        "@Type": "Ellipse",
                        "ConnectingPoints": {
                            "Item1": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "1",
                                "@PercentOffsetY": "0.5",
                            },
                            "Item2": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "1",
                            },
                            "Item3": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "0",
                            },
                            "Item4": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0",
                                "@PercentOffsetY": "0.5",
                            }
                        }
                    },
                    surfaceType: DiagramElementSurface,
                    popularProperties: ["text"],
                    type: DiagramElementViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("Condition", {
                    info: Diagram.diagramElementSerializationInfo,
                    defaultVal: {
                        "@SizeF": "150,50",
                        "@Type": "Condition",
                        "ConnectingPoints": {
                            "Item1": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "1",
                                "@PercentOffsetY": "0.5",
                            },
                            "Item2": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "1",
                            },
                            "Item3": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0.5",
                                "@PercentOffsetY": "0",
                            },
                            "Item4": {
                                "@ControlType": "ConnectingPoint",
                                "@PercentOffsetX": "0",
                                "@PercentOffsetY": "0.5",
                            }
                        }
                    },
                    surfaceType: DiagramElementSurface,
                    popularProperties: ["text"],
                    type: DiagramElementViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("ConnectingPoint", {
                    info: Diagram.connectingPointSerializationInfo,
                    surfaceType: ConnectingPointSurface,
                    type: ConnectingPointViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
            }
            Diagram.registerControls = registerControls;
            Diagram.groups = {
                "Appearance": { info: [] },
                "Behavior": { info: [] },
                "Design": { info: [Diagram.name] },
                "Layout": { info: [Diagram.location, Diagram.size, Diagram.pageWidth, Diagram.pageHeight] }
            };
            function createDiagramDesigner(element, diagramSource, localization, rtl) {
                if (localization) {
                    Analytics.Utils.addCultureInfo({
                        messages: localization
                    });
                }
                registerControls();
                var diagram = ko.pureComputed(function () { return new DiagramViewModel(diagramSource()); }), surface = ko.pureComputed(function () {
                    var surface = new DiagramSurface(diagram());
                    return surface;
                });
                var designerModel = Analytics.Internal.createDesigner(diagram, surface, Diagram.controlsFactory, Diagram.groups, undefined, undefined, rtl);
                designerModel.connectionPointDragHandler = new ConnectionPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
                designerModel.connectingPointDragHandler = new ConnectingPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
                designerModel.isLoading(false);
                designerModel.selection.focused(surface());
                $(element).children().remove();
                ko.applyBindings(designerModel, element);
                var updateSurfaceContentSize_ = Analytics.Internal.updateSurfaceContentSize(designerModel.surfaceSize, element);
                $(window).bind("resize", function () {
                    updateSurfaceContentSize_();
                });
                designerModel.tabPanel.width.subscribe(function () {
                    updateSurfaceContentSize_();
                });
                updateSurfaceContentSize_();
                return designerModel;
            }
            Diagram.createDiagramDesigner = createDiagramDesigner;
            var PointSide;
            (function (PointSide) {
                PointSide[PointSide["East"] = 0] = "East";
                PointSide[PointSide["South"] = 1] = "South";
                PointSide[PointSide["North"] = 2] = "North";
                PointSide[PointSide["West"] = 3] = "West";
            })(PointSide = Diagram.PointSide || (Diagram.PointSide = {}));
            function determineConnectingPoints(startObject, endObject) {
                var result = { start: null, end: null };
                if (endObject.leftConnectionPoint.location.x() > startObject.rightConnectionPoint.location.x() + Diagram.RoutedConnectorViewModel.GRID_SIZE * 2) {
                    result.start = startObject.rightConnectionPoint;
                    result.end = endObject.leftConnectionPoint;
                }
                else if (startObject.leftConnectionPoint.location.x() > endObject.rightConnectionPoint.location.x() + Diagram.RoutedConnectorViewModel.GRID_SIZE * 2) {
                    result.start = startObject.leftConnectionPoint;
                    result.end = endObject.rightConnectionPoint;
                }
                else {
                    var startCenter = (startObject.rightConnectionPoint.location.x() + startObject.rightConnectionPoint.location.x()) / 2;
                    var endCenter = (endObject.rightConnectionPoint.location.x() + endObject.rightConnectionPoint.location.x()) / 2;
                    if (startCenter > endCenter) {
                        result.start = startObject.rightConnectionPoint;
                        result.end = endObject.rightConnectionPoint;
                    }
                    else {
                        result.start = startObject.leftConnectionPoint;
                        result.end = endObject.leftConnectionPoint;
                    }
                }
                return result;
            }
            Diagram.determineConnectingPoints = determineConnectingPoints;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectingPointDragHandler", "Analytics.Diagram.ConnectingPointDragHandler");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectionPointDragHandler", "Analytics.Diagram.ConnectionPointDragHandler");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectionPointViewModel", "Analytics.Diagram.ConnectionPointViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectionPointSurface", "Analytics.Diagram.ConnectionPointSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectorViewModel", "Analytics.Diagram.ConnectorViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectorSurface", "Analytics.Diagram.ConnectorSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.RoutedConnectorViewModel", "Analytics.Diagram.RoutedConnectorViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.RoutedConnectorSurface", "Analytics.Diagram.RoutedConnectorSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectingPointViewModel", "Analytics.Diagram.ConnectingPointViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.connectingPointSerializationInfo", "Analytics.Diagram.connectingPointSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.ConnectingPointSurface", "Analytics.Diagram.ConnectingPointSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramElementBaseViewModel", "Analytics.Diagram.DiagramElementBaseViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramElementViewModel", "Analytics.Diagram.DiagramElementViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.diagramElementSerializationInfo", "Analytics.Diagram.diagramElementSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramElementBaseSurface", "Analytics.Diagram.DiagramElementBaseSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramElementSurface", "Analytics.Diagram.DiagramElementSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramViewModel", "Analytics.Diagram.DiagramViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.margins", "Analytics.Diagram.margins");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.pageWidth", "Analytics.Diagram.pageWidth");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.pageHeight", "Analytics.Diagram.pageHeight");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.diagramSerializationsInfo", "Analytics.Diagram.diagramSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.DiagramSurface", "Analytics.Diagram.DiagramSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.controlsFactory", "Analytics.Diagram.controlsFactory");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.registerControls", "Analytics.Diagram.registerControls");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.groups", "Analytics.Diagram.groups");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.createDiagramDesigner", "Analytics.Diagram.createDiagramDesigner");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.name", "Analytics.Diagram.name");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.text", "Analytics.Diagram.text");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.size", "Analytics.Diagram.size");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.location", "Analytics.Diagram.location");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.sizeLocation", "Analytics.Diagram.sizeLocation");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.unknownSerializationsInfo", "Analytics.Diagram.unknownSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.PointSide", "Analytics.Diagram.PointSide");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Diagram.determineConnectingPoints", "Analytics.Diagram.determineConnectingPoints");

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
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var Internal;
            (function (Internal) {
                function getDBSchemaCallback(requestWrapper, connection, tables) {
                    var deferred = $.Deferred();
                    requestWrapper.getDbSchema(connection, tables)
                        .done(function (data) {
                        deferred.resolve(new DBSchema(JSON.parse(data.dbSchemaJSON)));
                    })
                        .fail(function (data) {
                        Analytics.Internal.ShowMessage(Analytics.Internal.formatUnicorn(Analytics.Utils.getLocalization('Schema loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), Analytics.Internal.getErrorMessage(data)));
                        deferred.reject();
                    });
                    return deferred.promise();
                }
                Internal.getDBSchemaCallback = getDBSchemaCallback;
                function getDBStoredProceduresCallback(requestWrapper, connection) {
                    var deferred = $.Deferred();
                    requestWrapper.getDbStoredProcedures(connection)
                        .done(function (data) {
                        deferred.resolve(new DBSchema(JSON.parse(data.dbSchemaJSON)).procedures);
                    })
                        .fail(function (data) {
                        Analytics.Internal.ShowMessage(Analytics.Internal.formatUnicorn(Analytics.Utils.getLocalization('Stored procedures loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), Analytics.Internal.getErrorMessage(data)));
                        deferred.reject();
                    });
                    return deferred.promise();
                }
                Internal.getDBStoredProceduresCallback = getDBStoredProceduresCallback;
            })(Internal = Data.Internal || (Data.Internal = {}));
            var DBSchemaProvider = (function (_super) {
                __extends(DBSchemaProvider, _super);
                function DBSchemaProvider(connection, _requestWrapper) {
                    if (_requestWrapper === void 0) { _requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    _this._requestWrapper = _requestWrapper;
                    _this._tables = {};
                    _this._tableRequests = ko.observableArray([]).extend({ deferred: true });
                    _this.connection = connection;
                    _this._disposables.push(_this.connection.name.subscribe(function () {
                        _this._tables = {};
                        _this._dbSchema = null;
                        _this._dbStoredProceduresSchema = null;
                    }));
                    _this._disposables.push(ko.computed(function () {
                        var tableRequests = _this._tableRequests();
                        if (!tableRequests.length)
                            return;
                        _this._tableRequests([]);
                        var tables = tableRequests.map(function (x) { return x.table; });
                        _this._getDBSchema(tables).done(function (dbSchema) {
                            tableRequests.forEach(function (tableRequest) {
                                var schemaTable = dbSchema.tables.filter(function (x) { return x.name === tableRequest.table.name; })[0];
                                if (!schemaTable) {
                                    tableRequest.deferred.reject();
                                    return;
                                }
                                tableRequest.table.columns = schemaTable.columns;
                                tableRequest.deferred.resolve(tableRequest.table);
                            });
                        }).fail(function () { return tableRequests.forEach(function (request) { return request.deferred.reject(); }); });
                    }));
                    _this.getItems = function (pathRequest) {
                        var deferred = $.Deferred();
                        if (!pathRequest.fullPath) {
                            _this.getDbSchema().done(function (dbSchema) {
                                deferred.resolve($.map(dbSchema.tables, function (item) {
                                    var dataMemberInfo = {
                                        name: item.name,
                                        displayName: item.name,
                                        isList: false,
                                        specifics: item.isView ? "view" : "table",
                                        dragData: { noDragable: false }
                                    };
                                    return dataMemberInfo;
                                }));
                            });
                        }
                        else {
                            deferred.resolve([]);
                        }
                        return deferred.promise();
                    };
                    return _this;
                }
                DBSchemaProvider.prototype._getDBSchema = function (tables) {
                    return this._getDBSchemaCallback(this.connection, tables);
                };
                DBSchemaProvider.prototype._getDBSchemaCallback = function (connection, tables) {
                    return Internal.getDBSchemaCallback(this._requestWrapper, connection, tables);
                };
                DBSchemaProvider.prototype._getDBStoredProcedures = function (connection) {
                    return Internal.getDBStoredProceduresCallback(this._requestWrapper, connection);
                };
                DBSchemaProvider.prototype.getDbSchema = function () {
                    if (!this._dbSchema || this._dbSchema.state() === "rejected")
                        this._dbSchema = this._getDBSchema();
                    return this._dbSchema;
                };
                DBSchemaProvider.prototype.getDbStoredProcedures = function () {
                    if (!this._dbStoredProceduresSchema || this._dbStoredProceduresSchema.state() === "rejected")
                        this._dbStoredProceduresSchema = this._getDBStoredProcedures(this.connection);
                    return this._dbStoredProceduresSchema;
                };
                DBSchemaProvider.prototype.getDbTable = function (tableName) {
                    var _this = this;
                    if (!this._tables[tableName]) {
                        var deferred = $.Deferred();
                        this._tables[tableName] = deferred.promise();
                        this.getDbSchema().done(function (dbSchema) {
                            var table = Analytics.Internal.findFirstItemMatchesCondition(dbSchema.tables, function (table) { return table.name === tableName; });
                            if (!table) {
                                deferred.reject();
                                Analytics.Internal.isCustomizedWithUpdateLocalizationMethod("The schema does not contain the specified table: ") ?
                                    Analytics.Utils.getLocalization("The schema does not contain the specified table: ") + "'" + tableName + "'." :
                                    Analytics.Internal.formatUnicorn(Analytics.Utils.getLocalization("The schema does not contain the specified table: \"{0}\".", "DataAccessStringId.TableNotInSchemaValidationException"), tableName);
                            }
                            else if (table.columns.length > 0) {
                                deferred.resolve(table);
                            }
                            else {
                                _this._tableRequests.push({ table: table, deferred: deferred });
                            }
                        }).fail(function () { return deferred.reject(); });
                    }
                    return this._tables[tableName];
                };
                return DBSchemaProvider;
            }(Analytics.Utils.Disposable));
            Data.DBSchemaProvider = DBSchemaProvider;
            var DBStoredProcedure = (function () {
                function DBStoredProcedure(model) {
                    this.name = model["Name"];
                    this.arguments = Internal.deserializeToCollection(model["arguments"], function (argModel) { return new DBStoredProcedureArgument(argModel); });
                }
                return DBStoredProcedure;
            }());
            Data.DBStoredProcedure = DBStoredProcedure;
            var DBStoredProcedureArgumentDirection;
            (function (DBStoredProcedureArgumentDirection) {
                DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["In"] = 0] = "In";
                DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["Out"] = 1] = "Out";
                DBStoredProcedureArgumentDirection[DBStoredProcedureArgumentDirection["InOut"] = 2] = "InOut";
            })(DBStoredProcedureArgumentDirection = Data.DBStoredProcedureArgumentDirection || (Data.DBStoredProcedureArgumentDirection = {}));
            var DBStoredProcedureArgument = (function () {
                function DBStoredProcedureArgument(model) {
                    this.name = model["Name"];
                    this.type = model["Type"];
                    this.direction = model["Direction"];
                }
                return DBStoredProcedureArgument;
            }());
            Data.DBStoredProcedureArgument = DBStoredProcedureArgument;
            var DBTable = (function () {
                function DBTable(model) {
                    this.name = model["Name"];
                    this.isView = model["IsView"] === "true" || model["IsView"] === true;
                    this.columns = Internal.deserializeToCollection(model["columns"], function (columnModel) { return new DBColumn(columnModel); });
                    this.foreignKeys = Internal.deserializeToCollection(model["foreignKeys"], function (columnModel) { return new DBForeignKey(columnModel); });
                }
                return DBTable;
            }());
            Data.DBTable = DBTable;
            var resultSetSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "tables", modelName: "Views", array: true }
            ];
            var ResultSet = (function () {
                function ResultSet(model, serializer) {
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                    this.tables = DevExpress.Analytics.Utils.deserializeArray(model && model["Views"] || [], function (item) {
                        return new ResultTable(item, serializer);
                    });
                }
                ResultSet.prototype.getInfo = function () {
                    return resultSetSerializationInfo;
                };
                ResultSet.from = function (model, serializer) {
                    return model && new ResultSet(model["DataSet"], serializer) || null;
                };
                ResultSet.toJson = function (value, serializer, refs) {
                    return { "DataSet": serializer.serialize(value, resultSetSerializationInfo, refs) };
                };
                return ResultSet;
            }());
            Data.ResultSet = ResultSet;
            var resultTableSerializationInfo = [
                { propertyName: "tableName", modelName: "@Name" },
                {
                    propertyName: "columns", modelName: "Fields", array: true, info: [
                        { propertyName: "name", modelName: "@Name" },
                        { propertyName: "propertyType", modelName: "@Type" }
                    ]
                }
            ];
            var ResultTable = (function () {
                function ResultTable(model, serializer) {
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                ResultTable.prototype.getInfo = function () {
                    return resultTableSerializationInfo;
                };
                return ResultTable;
            }());
            Data.ResultTable = ResultTable;
            var Utils;
            (function (Utils) {
                Utils.SqlQueryType = {
                    customSqlQuery: "CustomSqlQuery",
                    tableQuery: "SelectQuery",
                    storedProcQuery: "StoredProcQuery"
                };
                Utils.JsonSourceType = {
                    fileJsonSource: "FileJsonSource",
                    customJsonSource: "CustomJsonSource",
                    uriJsonSource: "UriJsonSource"
                };
            })(Utils = Data.Utils || (Data.Utils = {}));
            (function (Internal) {
                function generateQueryUniqueName(queries, query) {
                    var name = (query.name() || query.generateName()).replace('.', '_');
                    return Analytics.Internal.findFirstItemMatchesCondition(queries, function (item) { return item.name() === name; }) ?
                        Analytics.Internal.getUniqueNameForNamedObjectsArray(queries, name + "_") : name;
                }
                Internal.generateQueryUniqueName = generateQueryUniqueName;
            })(Internal = Data.Internal || (Data.Internal = {}));
            var JsonNodeType;
            (function (JsonNodeType) {
                JsonNodeType[JsonNodeType["Object"] = 0] = "Object";
                JsonNodeType[JsonNodeType["Array"] = 1] = "Array";
                JsonNodeType[JsonNodeType["Property"] = 2] = "Property";
            })(JsonNodeType = Data.JsonNodeType || (Data.JsonNodeType = {}));
            var JsonNode = (function () {
                function JsonNode(model, serializer) {
                    this.nodes = [];
                    if (!model)
                        return;
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                    var innerNodes = model["Node"];
                    var currentNodes = innerNodes instanceof Array ?
                        Internal.deserializeToCollection(innerNodes, function (nodeModel) { return new JsonNode(nodeModel); }).sort(function (a, b) { return a.name().localeCompare(b.name()); })
                        : !innerNodes ? [] : [new JsonNode(innerNodes)];
                    this.nodes = currentNodes;
                }
                JsonNode.from = function (model, serializer) {
                    return new JsonNode(model, serializer);
                };
                JsonNode.toJsonNodes = function (value, serializer, refs) {
                    return (value || []).map(function (item) { return JsonNode.toJsonNode(item, serializer, refs); });
                };
                JsonNode.toJsonNode = function (value, serializer, refs, recoursive) {
                    if (recoursive === void 0) { recoursive = true; }
                    var obj = serializer.serialize(value, jsonSchemaNodeSerializationInfo, refs);
                    var nodes = recoursive ? JsonNode.toJsonNodes(value.nodes, serializer, refs) : [];
                    if (nodes.length > 0)
                        obj["Node"] = nodes;
                    return obj;
                };
                JsonNode.prototype.getInfo = function () {
                    return jsonSchemaNodeSerializationInfo;
                };
                return JsonNode;
            }());
            Data.JsonNode = JsonNode;
            var JsonSchemaNode = (function (_super) {
                __extends(JsonSchemaNode, _super);
                function JsonSchemaNode(model, serializer) {
                    var _this = _super.call(this, model["Node"], serializer) || this;
                    _this.nodeType = JsonNodeType[JsonNodeType.Object];
                    _this.valueType = "Unknown";
                    _this.displayName = Analytics.Utils.getLocalization("root");
                    _this.selected = ko.observable(false);
                    return _this;
                }
                JsonSchemaNode.from = function (model, serializer) {
                    return new JsonSchemaNode(model || {}, serializer);
                };
                JsonSchemaNode.toJson = function (value, serializer, refs) {
                    if (!value)
                        return {};
                    var obj = { Node: JsonNode.toJsonNode(value, serializer, refs, false) };
                    obj.Node["Node"] = JsonNode.toJsonNodes(value.nodes, serializer, refs);
                    return obj;
                };
                JsonSchemaNode.prototype.getInfo = function () {
                    return jsonSchemaNodeSerializationInfo;
                };
                return JsonSchemaNode;
            }(JsonNode));
            Data.JsonSchemaNode = JsonSchemaNode;
            var JsonSchemaRootNode = (function (_super) {
                __extends(JsonSchemaRootNode, _super);
                function JsonSchemaRootNode(model, serializer) {
                    var _this = _super.call(this, model) || this;
                    _this._rootElementList = null;
                    return _this;
                }
                JsonSchemaRootNode.from = function (model, serializer) {
                    return new JsonSchemaRootNode(model, serializer);
                };
                JsonSchemaRootNode.toJson = function (value, serializer, refs) {
                    return JsonSchemaNode.toJson(value.nodes[0], serializer, refs);
                };
                JsonSchemaRootNode.prototype.getInfo = function () {
                    return jsonSchemaRootNodeSerializationInfo;
                };
                JsonSchemaRootNode.prototype.getRootElementPartList = function () {
                    if (this._rootElementList)
                        return this._rootElementList;
                    if (this.nodes.length === 0)
                        return [];
                    this._rootElementList = [];
                    var node = this.nodes[0];
                    var currentPath = {
                        fullPath: ko.unwrap(node.name),
                        path: "",
                        pathParts: [ko.unwrap(node.name)]
                    };
                    this._fillRootElementList(node, currentPath);
                    this._rootElementList.sort(function (a, b) { return a.fullPath.localeCompare(b.fullPath); });
                    return this._rootElementList;
                };
                JsonSchemaRootNode.prototype._fillRootElementList = function (node, currentPath) {
                    var _this = this;
                    if (node === void 0) { node = this.nodes[0]; }
                    if (currentPath === void 0) { currentPath = { fullPath: "root", path: "", pathParts: ["root"] }; }
                    if (!node)
                        return this._rootElementList;
                    var nodeType = ko.unwrap(node.nodeType);
                    if (nodeType == JsonNodeType[JsonNodeType.Property])
                        return;
                    if (nodeType === JsonNodeType[JsonNodeType.Array]) {
                        this._rootElementList.push(currentPath);
                        return;
                    }
                    if ((nodeType === JsonNodeType[JsonNodeType.Object])) {
                        this._rootElementList.push(currentPath);
                    }
                    (node.nodes || []).forEach(function (x) {
                        var nextPath = _this._getNextPath(currentPath, x.name());
                        _this._fillRootElementList(x, nextPath);
                    });
                    return this._rootElementList;
                };
                JsonSchemaRootNode.prototype._getNextPath = function (currentPath, nodeName) {
                    var _nodeName = !currentPath.fullPath ? nodeName : [currentPath.fullPath, nodeName].join(".");
                    return {
                        pathParts: currentPath.pathParts.concat(nodeName),
                        fullPath: _nodeName,
                        path: nodeName
                    };
                };
                return JsonSchemaRootNode;
            }(JsonNode));
            Data.JsonSchemaRootNode = JsonSchemaRootNode;
            var jsonSchemaNodeSerializationInfo = [
                { propertyName: "nodes", modelName: "Node", from: JsonNode.from, toJsonObject: JsonNode.toJsonNodes },
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "selected", modelName: "@Selected", from: Analytics.Utils.parseBool },
                { propertyName: "nodeType", modelName: "@NodeType" },
                { propertyName: "type", modelName: "@Type" }
            ];
            var jsonSchemaRootNodeSerializationInfo = [
                { propertyName: "nodes", modelName: "Node", from: JsonSchemaRootNode.from, toJsonObject: JsonSchemaRootNode.toJsonNodes }
            ];
            var JsonAuthenticationInfo = (function () {
                function JsonAuthenticationInfo(model, serializer) {
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model || {});
                }
                JsonAuthenticationInfo.from = function (model, serializer) {
                    return new JsonAuthenticationInfo(model, serializer);
                };
                JsonAuthenticationInfo.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                JsonAuthenticationInfo.prototype.getInfo = function () {
                    return [
                        { propertyName: "password", modelName: "@password", defaultVal: "" },
                        { propertyName: "userName", modelName: "@user", defaultVal: "" }
                    ];
                };
                return JsonAuthenticationInfo;
            }());
            Data.JsonAuthenticationInfo = JsonAuthenticationInfo;
            var JsonParameter = (function (_super) {
                __extends(JsonParameter, _super);
                function JsonParameter(model, serializer) {
                    var _this = _super.call(this) || this;
                    _this.namePlaceholder = function () { return Analytics.Utils.getLocalization("Name", "AnalyticsCoreStringId.CollectionEditor_Name_Placeholder"); };
                    _this.valuePlaceholder = function () { return Analytics.Utils.getLocalization("Value", "AnalyticsCoreStringId.CollectionEditor_Value_Placeholder"); };
                    serializer = serializer || new Analytics.Utils.ModelSerializer();
                    serializer.deserialize(_this, model);
                    return _this;
                }
                JsonParameter.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, value.getInfo(), refs);
                };
                JsonParameter.prototype.getInfo = function () {
                    return [
                        { propertyName: "name", modelName: "@Name", displayValue: "Name", editor: Analytics.Widgets.editorTemplates.text },
                        { propertyName: "value", modelName: "@Value", displayValue: "Value", editor: Analytics.Widgets.editorTemplates.text },
                        { propertyName: "itemType", modelName: "@ItemType" }
                    ];
                };
                return JsonParameter;
            }(Analytics.Utils.Disposable));
            Data.JsonParameter = JsonParameter;
            var JsonHeaderParameter = (function (_super) {
                __extends(JsonHeaderParameter, _super);
                function JsonHeaderParameter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.itemType = ko.observable("Header");
                    return _this;
                }
                JsonHeaderParameter.from = function (model, serializer) {
                    return new JsonHeaderParameter(model || {}, serializer);
                };
                return JsonHeaderParameter;
            }(JsonParameter));
            Data.JsonHeaderParameter = JsonHeaderParameter;
            var JsonQueryParameter = (function (_super) {
                __extends(JsonQueryParameter, _super);
                function JsonQueryParameter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.itemType = ko.observable("QueryParameter");
                    return _this;
                }
                JsonQueryParameter.from = function (model, serializer) {
                    return new JsonQueryParameter(model || {}, serializer);
                };
                return JsonQueryParameter;
            }(JsonParameter));
            Data.JsonQueryParameter = JsonQueryParameter;
            var JsonSource = (function (_super) {
                __extends(JsonSource, _super);
                function JsonSource(model, serializer) {
                    if (model === void 0) { model = {}; }
                    var _this = _super.call(this) || this;
                    _this.sourceType = ko.observable();
                    _this.uri = ko.observable();
                    _this.json = ko.observable();
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(_this, model);
                    _this._disposables.push(_this.uri.subscribe(function (newUri) {
                        newUri && _this.sourceType(JsonSource._URIJSONSOURCE_TYPE);
                    }));
                    _this._disposables.push(_this.json.subscribe(function (newJsonString) {
                        newJsonString && _this.sourceType(JsonSource._CUSTOMJSONSOURCE_TYPE);
                    }));
                    _this.queryParameters = Analytics.Utils.deserializeArray(model["QueryParameters"], function (item) { return new JsonQueryParameter(item, serializer); });
                    _this.headers = Analytics.Utils.deserializeArray(model["Headers"], function (item) { return new JsonHeaderParameter(item, serializer); });
                    return _this;
                }
                JsonSource.from = function (model, serializer) {
                    return new JsonSource(model || {}, serializer);
                };
                JsonSource.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, jsonSourceSerializationInfo, refs);
                };
                JsonSource.prototype.getInfo = function () {
                    return jsonSourceSerializationInfo;
                };
                JsonSource.prototype.serialize = function (includeRootTag) {
                    if (includeRootTag === void 0) { includeRootTag = false; }
                    return includeRootTag ? { "Source": this.serialize() } : (new DevExpress.Analytics.Utils.ModelSerializer()).serialize(this);
                };
                JsonSource.prototype.resetSource = function () {
                    this.sourceType("");
                    this.json("");
                    this.uri("");
                };
                JsonSource._URIJSONSOURCE_TYPE = "DevExpress.DataAccess.Json.UriJsonSource";
                JsonSource._CUSTOMJSONSOURCE_TYPE = "DevExpress.DataAccess.Json.CustomJsonSource";
                return JsonSource;
            }(Analytics.Utils.Disposable));
            Data.JsonSource = JsonSource;
            var jsonSourceSerializationInfo = [
                { propertyName: "sourceType", modelName: "@SourceType", defaultVal: "" },
                { propertyName: "json", modelName: "@Json", defaultVal: "" },
                { propertyName: "uri", modelName: "@Uri", defaultVal: "" },
                { propertyName: "authenticationInfo", modelName: "AuthenticationInfo", from: JsonAuthenticationInfo.from, toJsonObject: JsonAuthenticationInfo.toJson },
                { propertyName: "headers", modelName: "Headers", array: true },
                { propertyName: "queryParameters", modelName: "QueryParameters", array: true }
            ];
            var JsonDataSource = (function (_super) {
                __extends(JsonDataSource, _super);
                function JsonDataSource(model, serializer, requestWrapper) {
                    if (requestWrapper === void 0) { requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    serializer = serializer || new Analytics.Utils.ModelSerializer();
                    serializer.deserialize(_this, model);
                    _this.jsonSchemaProvider = new JsonSchemaProvider(_this, requestWrapper);
                    _this.source && _this._disposables.push(_this.source);
                    _this._disposables.push(_this.connectionName.subscribe(function () {
                        _this.source.resetSource();
                    }));
                    return _this;
                }
                JsonDataSource.prototype.getInfo = function () {
                    return jsonDataSourceSerializationInfo;
                };
                JsonDataSource.prototype.clone = function (serializer) {
                    var serializer = serializer || new Analytics.Utils.ModelSerializer();
                    var serialized = serializer.serialize(this);
                    return new JsonDataSource(serialized);
                };
                JsonDataSource.from = function (model, serializer) {
                    return new JsonDataSource(model, serializer);
                };
                JsonDataSource.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, jsonDataSourceSerializationInfo, refs);
                };
                JsonDataSource.prototype.getSchema = function () {
                    var _this = this;
                    var deferred = $.Deferred();
                    this.jsonSchemaProvider.getJsonSchema()
                        .done(function (schema) {
                        _this.schema = schema;
                        deferred.resolve(schema);
                    })
                        .fail(function () {
                        _this.schema = null;
                        deferred.reject();
                    });
                    return deferred.promise();
                };
                return JsonDataSource;
            }(Analytics.Utils.Disposable));
            Data.JsonDataSource = JsonDataSource;
            var jsonDataSourceSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "connectionName", modelName: "@ConnectionName" },
                { propertyName: "rootElement", modelName: "@RootElement", defaultVal: "root" },
                { propertyName: "schema", modelName: "Schema", from: JsonSchemaRootNode.from, toJsonObject: JsonSchemaRootNode.toJson },
                { propertyName: "source", modelName: "Source", from: JsonSource.from, toJsonObject: JsonSource.toJson }
            ];
            (function (Internal) {
                function getJsonSchemaCallback(requestWrapper, jsonDataSource) {
                    var deferred = $.Deferred();
                    requestWrapper.getJsonSchema(jsonDataSource)
                        .done(function (data) {
                        try {
                            var jsonSchema = JSON.parse(data.jsonSchemaJSON);
                            var jsonSchemaModel = new JsonSchemaRootNode(jsonSchema);
                            deferred.resolve(jsonSchemaModel);
                        }
                        finally {
                            if (deferred.state() === "pending")
                                deferred.reject();
                        }
                    })
                        .fail(function (data) {
                        Analytics.Internal.ShowMessage(Analytics.Internal.formatUnicorn(Analytics.Utils.getLocalization('Schema loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), Analytics.Internal.getErrorMessage(data)));
                        deferred.reject();
                    });
                    return deferred.promise();
                }
                Internal.getJsonSchemaCallback = getJsonSchemaCallback;
            })(Internal = Data.Internal || (Data.Internal = {}));
            var JsonSchemaProvider = (function (_super) {
                __extends(JsonSchemaProvider, _super);
                function JsonSchemaProvider(jsonDataSource, _requestWrapper) {
                    if (_requestWrapper === void 0) { _requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    _this._requestWrapper = _requestWrapper;
                    _this._jsonDataSource = jsonDataSource;
                    _this._disposables.push(_this._jsonDataSource.source.sourceType.subscribe(function () {
                        _this._jsonSchemaPromise = null;
                    }));
                    _this.getItems = function (pathRequest) {
                        var getItemsDeferred = $.Deferred();
                        var loadSchemaPromise = !_this._jsonSchema ? _this.getJsonSchema() : $.Deferred().resolve(_this._jsonSchema).promise();
                        loadSchemaPromise
                            .done(function (jsonSchema) {
                            _this._jsonSchema = jsonSchema;
                            var schemaByPath = _this.getSchemaByPath(pathRequest, jsonSchema);
                            getItemsDeferred.resolve(schemaByPath);
                        })
                            .fail(getItemsDeferred.reject);
                        return getItemsDeferred.promise();
                    };
                    return _this;
                }
                JsonSchemaProvider.prototype._getJsonSchema = function () {
                    return this._getJsonSchemaCallback(this._jsonDataSource);
                };
                JsonSchemaProvider.prototype._getJsonSchemaCallback = function (jsonDataSource) {
                    return Internal.getJsonSchemaCallback(this._requestWrapper, jsonDataSource);
                };
                JsonSchemaProvider.prototype.reset = function () {
                    this._jsonSchemaPromise = null;
                };
                JsonSchemaProvider.prototype.mapToDataMemberContract = function (nodes) {
                    return $.map((nodes || []), function (node) {
                        var dataMemberInfo = {
                            name: node.name(),
                            displayName: node.displayName || node.name(),
                            isSelected: node.selected(),
                            isList: node.nodes && node.nodes.length > 0,
                            specifics: "table",
                            dragData: { noDragable: false }
                        };
                        return dataMemberInfo;
                    });
                };
                JsonSchemaProvider.prototype.getSchemaByPath = function (pathRequest, jsonSchema) {
                    if (!pathRequest.fullPath) {
                        return this.mapToDataMemberContract(jsonSchema.nodes);
                    }
                    else {
                        var currentNodes = jsonSchema.nodes;
                        for (var i = 0; i < pathRequest.pathParts.length; i++) {
                            var pathPart = (currentNodes || []).filter(function (node) { return node.name() == pathRequest.pathParts[i]; })[0];
                            if (!pathPart)
                                return [];
                            currentNodes = pathPart.nodes;
                        }
                        return this.mapToDataMemberContract(currentNodes);
                    }
                };
                JsonSchemaProvider.prototype.getJsonSchema = function () {
                    if (!this._jsonSchemaPromise || this._jsonSchemaPromise.state() === "rejected")
                        this._jsonSchemaPromise = this._getJsonSchema();
                    return this._jsonSchemaPromise;
                };
                return JsonSchemaProvider;
            }(Analytics.Utils.Disposable));
            Data.JsonSchemaProvider = JsonSchemaProvider;
            var connectionOptionsSerializationInfo = [
                { propertyName: "closeConnection", modelName: "@CloseConnection", from: Analytics.Utils.parseBool },
                { propertyName: "commandTimeout", modelName: "@DbCommandTimeout", from: function (s) { var val = parseInt(s); if (isNaN(val))
                        val = null; return ko.observable(val); }, defaultVal: null },
            ];
            var ConnectionOptions = (function () {
                function ConnectionOptions(model, serializer) {
                    this.closeConnection = ko.observable(true);
                    this.commandTimeout = ko.observable(null);
                    serializer = serializer || new Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                ConnectionOptions.prototype.getInfo = function () {
                    return connectionOptionsSerializationInfo;
                };
                return ConnectionOptions;
            }());
            Data.ConnectionOptions = ConnectionOptions;
            var Metadata;
            (function (Metadata) {
                Metadata.customQuerySerializationsInfo = [
                    { propertyName: "type", modelName: "@Type" },
                    { propertyName: "name", modelName: "@Name" },
                    { propertyName: "sqlString", modelName: "Sql", defaultVal: "" },
                    { propertyName: "parameters", modelName: "Parameters", array: true },
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Data.Metadata || (Data.Metadata = {}));
            var CustomSqlQuery = (function () {
                function CustomSqlQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new DevExpress.Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Utils.SqlQueryType.customSqlQuery; });
                    this.parameters = DevExpress.Analytics.Utils.deserializeArray(model["Parameters"], function (item) {
                        return new DataSourceParameter(item, serializer);
                    });
                }
                CustomSqlQuery.prototype.getInfo = function () {
                    return Metadata.customQuerySerializationsInfo;
                };
                CustomSqlQuery.prototype.generateName = function () {
                    return "CustomSqlQuery";
                };
                return CustomSqlQuery;
            }());
            Data.CustomSqlQuery = CustomSqlQuery;
            (function (Metadata) {
                Metadata.masterDetailRelationSerializationsInfo = [
                    { propertyName: "masterQuery", modelName: "@Master" },
                    { propertyName: "detailQuery", modelName: "@Detail" },
                    { propertyName: "_customName", modelName: "@Name" },
                    {
                        propertyName: "keyColumns", modelName: "KeyColumns", array: true, info: [
                            { propertyName: "masterColumn", modelName: "@Master" },
                            { propertyName: "detailColumn", modelName: "@Detail" },
                            { propertyName: "itemType", modelName: "@ItemType" }
                        ]
                    },
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Data.Metadata || (Data.Metadata = {}));
            var MasterDetailRelation = (function (_super) {
                __extends(MasterDetailRelation, _super);
                function MasterDetailRelation(model, serializer) {
                    var _this = _super.call(this) || this;
                    _this.name = ko.pureComputed({
                        read: function () {
                            return _this._customName() || _this.masterQuery() + _this.detailQuery();
                        },
                        write: function (value) {
                            _this._customName(value);
                        },
                        deferEvaluation: true
                    });
                    (serializer || new DevExpress.Analytics.Utils.ModelSerializer()).deserialize(_this, $.extend(model, { "@ItemType": "Relation" }));
                    _this._disposables.push(_this.name);
                    return _this;
                }
                MasterDetailRelation.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this.disposeObservableArray(this.keyColumns);
                };
                MasterDetailRelation.prototype.createKeyColumn = function () {
                    var newKeyColumn = {
                        masterColumn: ko.observable(),
                        detailColumn: ko.observable(),
                        itemType: "KeyColumn"
                    };
                    this.keyColumns.push(newKeyColumn);
                };
                MasterDetailRelation.prototype.getInfo = function () {
                    return Metadata.masterDetailRelationSerializationsInfo;
                };
                return MasterDetailRelation;
            }(Analytics.Utils.Disposable));
            Data.MasterDetailRelation = MasterDetailRelation;
            var SqlDataConnection = (function () {
                function SqlDataConnection(model, serializer) {
                    this.name = ko.observable();
                    this.parameteres = ko.observable();
                    this.fromAppConfig = ko.observable(true);
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                }
                SqlDataConnection.from = function (model, serializer) {
                    return new SqlDataConnection(model, serializer);
                };
                SqlDataConnection.toJson = function (value, serializer, refs) {
                    return serializer.serialize(value, sqlDataConnectionSerializationInfo, refs);
                };
                SqlDataConnection.prototype.getInfo = function () {
                    return sqlDataConnectionSerializationInfo;
                };
                return SqlDataConnection;
            }());
            Data.SqlDataConnection = SqlDataConnection;
            var sqlDataConnectionSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "parameteres", modelName: "Parameters" },
                { propertyName: "fromAppConfig", modelName: "@FromAppConfig", defaultVal: false, from: Analytics.Utils.parseBool }
            ];
            var sqlDataSourceSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "connection", modelName: "Connection", from: SqlDataConnection.from, toJsonObject: SqlDataConnection.toJson },
                { propertyName: "queries", modelName: "Queries", array: true },
                { propertyName: "relations", modelName: "Relations", array: true },
                { propertyName: "resultSet", modelName: "ResultSchema", from: ResultSet.from, toJsonObject: ResultSet.toJson },
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
            var SqlDataSource = (function (_super) {
                __extends(SqlDataSource, _super);
                function SqlDataSource(model, serializer, requestWrapper) {
                    if (requestWrapper === void 0) { requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    serializer = serializer || new Analytics.Utils.ModelSerializer();
                    serializer.deserialize(_this, $.extend(model, { "@ItemType": "SqlDataSource" }));
                    var deprecateName = _this["_model"]["Name"];
                    if (deprecateName) {
                        if (!_this.name()) {
                            _this.name(deprecateName);
                        }
                        delete _this["_model"]["Name"];
                    }
                    _this.queries = DevExpress.Analytics.Utils.deserializeArray(model["Queries"], function (item) {
                        return _this.createQuery(item, serializer);
                    });
                    _this.relations = DevExpress.Analytics.Utils.deserializeArray(model["Relations"], function (item) {
                        return new MasterDetailRelation(item, serializer);
                    });
                    if (_this.connection && model["ConnectionOptions"])
                        _this.connection.options = new ConnectionOptions(model["ConnectionOptions"], serializer);
                    _this.dbSchemaProvider = new DBSchemaProvider(_this.connection, requestWrapper);
                    _this._disposables.push(_this.connection.name.subscribe(function () {
                        _this.queries([]);
                        _this.relations([]);
                        _this.resultSet = null;
                    }));
                    return _this;
                }
                SqlDataSource.prototype.getInfo = function () {
                    return sqlDataSourceSerializationInfo;
                };
                SqlDataSource.prototype.createQuery = function (item, serializer) {
                    if (item["@Type"] === Utils.SqlQueryType.customSqlQuery) {
                        return new CustomSqlQuery(item, this, serializer);
                    }
                    else if (item["@Type"] === Utils.SqlQueryType.tableQuery) {
                        return new TableQuery(item, this, serializer);
                    }
                    else if (item["@Type"] === Utils.SqlQueryType.storedProcQuery) {
                        return new StoredProcQuery(item, this, serializer);
                    }
                    else {
                        throw new Error("Unknown sql query type.");
                    }
                };
                return SqlDataSource;
            }(Analytics.Utils.Disposable));
            Data.SqlDataSource = SqlDataSource;
            (function (Metadata) {
                Metadata.storedProcQuerySerializationsInfo = [
                    { propertyName: "type", modelName: "@Type" },
                    { propertyName: "name", modelName: "@Name" },
                    { propertyName: "procName", modelName: "ProcName" },
                    { propertyName: "parameters", modelName: "Parameters", array: true },
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Data.Metadata || (Data.Metadata = {}));
            var StoredProcQuery = (function () {
                function StoredProcQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Utils.SqlQueryType.storedProcQuery; });
                    this.parameters = Analytics.Utils.deserializeArray(model["Parameters"], function (item) {
                        var parameterValueType = item["@Type"];
                        if (parameterValueType === "DevExpress.DataAccess.Expression")
                            parameterValueType = item["@ResultType"] || parameterValueType;
                        return new DataSourceParameter(item, serializer, Metadata.storedProcParameterSerializationsInfo(parameterValueType));
                    });
                }
                StoredProcQuery.prototype.getInfo = function () {
                    return Metadata.storedProcQuerySerializationsInfo;
                };
                StoredProcQuery.prototype.generateName = function () {
                    return this.procName() || "Query";
                };
                return StoredProcQuery;
            }());
            Data.StoredProcQuery = StoredProcQuery;
            (function (Metadata) {
                Metadata.tableQuerySerializationsInfo = [
                    { propertyName: "type", modelName: "@Type" },
                    { propertyName: "name", modelName: "@Name" },
                    { propertyName: "parameters", modelName: "Parameters", array: true },
                    {
                        propertyName: "_tablesObject", modelName: "Tables", info: [
                            {
                                propertyName: "tables", modelName: "SelectedTables", array: true, info: [
                                    { propertyName: "name", modelName: "@Name" },
                                    { propertyName: "alias", modelName: "@Alias" }
                                ]
                            }
                        ]
                    },
                    { propertyName: "filterString", modelName: "Filter", defaultVal: "" },
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Data.Metadata || (Data.Metadata = {}));
            var TableQuery = (function () {
                function TableQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Utils.SqlQueryType.tableQuery; });
                    this.parameters = Analytics.Utils.deserializeArray(model["Parameters"], function (item) { return new DataSourceParameter(item, serializer); });
                }
                TableQuery.prototype.tables = function () {
                    return this["_tablesObject"]["tables"]();
                };
                TableQuery.prototype.getInfo = function () {
                    return Metadata.tableQuerySerializationsInfo;
                };
                TableQuery.prototype.generateName = function () {
                    return this.tables().length > 0 ? (this.tables()[0].alias() || this.tables()[0].name()) : "SelectQuery";
                };
                return TableQuery;
            }());
            Data.TableQuery = TableQuery;
            (function (Metadata) {
                Metadata.dsParameterNameValidationRules = [{
                        type: "custom",
                        validationCallback: function (options) { return DataSourceParameter.validateName(options.value); },
                        get message() {
                            return DevExpress.Analytics.Utils.getLocalization('Name is required and should be a valid identifier.', 'AnalyticsCoreStringId.NameIsRequired_Error');
                        }
                    }];
                Metadata.parameterValueSerializationsInfo = { propertyName: "value", displayName: "Value", localizationId: "DevExpress.DataAccess.Parameter.Value", editor: Analytics.Widgets.editorTemplates.text };
                var dsParameterName = { propertyName: "name", displayName: "Name", localizationId: "DevExpress.DataAccess.Parameter.Name", validationRules: Metadata.dsParameterNameValidationRules, editor: Analytics.Widgets.editorTemplates.text };
                var dsParameterType = {
                    propertyName: "type", displayName: "Type", localizationId: "DevExpress.DataAccess.Parameter.Type", modelName: "@Type", editor: Analytics.Widgets.editorTemplates.combobox, valuesArray: [
                        { value: "System.String", displayValue: "String", localizationId: "AnalyticsCoreStringId.Parameter_Type_String" },
                        { value: "System.DateTime", displayValue: "Date", localizationId: "AnalyticsCoreStringId.Parameter_Type_DateTime" },
                        { value: "System.Int16", displayValue: "Number (16 bit integer)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Int16" },
                        { value: "System.Int32", displayValue: "Number (32 bit integer)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Int32" },
                        { value: "System.Int64", displayValue: "Number (64 bit integer)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Int64" },
                        { value: "System.Single", displayValue: "Number (floating-point)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Float" },
                        { value: "System.Double", displayValue: "Number (double-precision floating-point)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Double" },
                        { value: "System.Decimal", displayValue: "Number (decimal)", localizationId: "AnalyticsCoreStringId.Parameter_Type_Decimal" },
                        { value: "System.Boolean", displayValue: "Boolean", localizationId: "AnalyticsCoreStringId.Parameter_Type_Boolean" },
                        { value: "System.Guid", displayValue: "Guid", localizationId: "AnalyticsCoreStringId.Parameter_Type_Guid" },
                        { value: "DevExpress.DataAccess.Expression", displayValue: "Expression", localizationId: "DataAccessUIStringId.ParametersColumn_Expression" }
                    ]
                };
                var dsExpressionResultType = {
                    propertyName: "resultType",
                    displayName: "Result Type",
                    localizationId: "DataAccessWebStringId.QueryBuilder_ResultType",
                    modelName: "@ResultType",
                    editor: Analytics.Widgets.editorTemplates.combobox,
                    valuesArray: dsParameterType.valuesArray.filter(function (x) { return x.value !== "DevExpress.DataAccess.Expression"; })
                };
                var baseDSParamterSerializationsInfo = [
                    { propertyName: "_name", modelName: "@Name" },
                    { propertyName: "_value", modelName: "#text" },
                    Metadata.parameterValueSerializationsInfo,
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
                Metadata.dsParameterSerializationInfo = [dsParameterName, dsParameterType, dsExpressionResultType].concat(baseDSParamterSerializationsInfo);
                var stroredProcValuesAddition = [
                    { value: "System.Byte", displayValue: "Non-negative number (8 bit integer)", localizationId: "DataAccessStringId.Type_Byte" },
                    { value: "System.SByte", displayValue: "Number (8 bit integer)", localizationId: "DataAccessStringId.Type_SByte" },
                    { value: "System.UInt32", displayValue: "Non-negative number (32 bit integer)", localizationId: "DataAccessStringId.Type_UInt" },
                    { value: "System.UInt16", displayValue: "Non-negative number (16 bit integer)", localizationId: "DataAccessStringId.Type_UShort" },
                    { value: "System.UInt64", displayValue: "Non-negative number (64 bit integer)", localizationId: "DataAccessStringId.Type_ULong" },
                    { value: "System.Char", displayValue: "Char", localizationId: "DataAccessStringId.Type_Char" },
                    { value: "System.Object", displayValue: "Object", localizationId: "DataAccessStringId.Type_Object" },
                    { value: "System.Byte[]", displayValue: "Byte array", localizationId: "DataAccessStringId.Type_ByteArray" },
                    { value: "System.TimeSpan", displayValue: "Time interval", localizationId: "DataAccessStringId.Type_TimeSpan" },
                ];
                function storedProcParameterSerializationsInfo(type) {
                    var copyParamType = $.extend(true, {}, dsParameterType);
                    var newValuesArray = [];
                    newValuesArray.push(dsParameterType.valuesArray.filter(function (item) { return item.value === type; })[0] || stroredProcValuesAddition.filter(function (item) { return item.value === type; })[0]);
                    newValuesArray.push(dsParameterType.valuesArray.filter(function (item) { return item.value === "DevExpress.DataAccess.Expression"; })[0]);
                    copyParamType.valuesArray = newValuesArray;
                    var copyResultType = $.extend(true, {}, dsExpressionResultType);
                    copyResultType.valuesArray = newValuesArray.slice(0, 0);
                    copyResultType.disabled = true;
                    return [
                        $.extend({ disabled: true }, dsParameterName),
                        copyParamType,
                        copyResultType
                    ].concat(baseDSParamterSerializationsInfo);
                }
                Metadata.storedProcParameterSerializationsInfo = storedProcParameterSerializationsInfo;
            })(Metadata = Data.Metadata || (Data.Metadata = {}));
            function integerValueConverter(val) {
                return Analytics.Internal.integerValueConverter(val, this.defaultValue);
            }
            function floatValueConverter(val) {
                return Analytics.Internal.floatValueConverter(val, this.defaultValue);
            }
            function expressionValueConverter(val) {
                if (val instanceof Date) {
                    var prependZero = function (x) { return (x < 10 ? "0" : "") + x; };
                    return Analytics.Internal.formatUnicorn('#{0}/{1}/{2} {3}:{4}#', prependZero(val.getMonth() + 1), prependZero(val.getDate()), val.getFullYear(), prependZero(val.getHours()), prependZero(val.getMinutes()));
                }
                return (val || "").toString();
            }
            var DataSourceParameterTypeValue = (function () {
                function DataSourceParameterTypeValue(name, defaultValue, valueConverter, realTypeName) {
                    this.name = name;
                    this.defaultValue = defaultValue;
                    this.valueConverter = valueConverter;
                    this.realTypeName = realTypeName;
                }
                Object.defineProperty(DataSourceParameterTypeValue.prototype, "specifics", {
                    get: function () {
                        return DBColumn.GetSpecific(this.realTypeName || this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataSourceParameterTypeValue;
            }());
            var tryParseDate = function (val) {
                var date;
                try {
                    date = Analytics.Internal.parseDate(val);
                }
                catch (e) {
                    date = dateDefaultValue();
                }
                return date;
            };
            var dateDefaultValue = function () {
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                return date;
            };
            var DataSourceParameter = (function (_super) {
                __extends(DataSourceParameter, _super);
                function DataSourceParameter(model, serializer, _serializationsInfo) {
                    if (_serializationsInfo === void 0) { _serializationsInfo = Metadata.dsParameterSerializationInfo; }
                    var _this = _super.call(this) || this;
                    _this._serializationsInfo = _serializationsInfo;
                    _this._valueInfo = ko.observable(Metadata.parameterValueSerializationsInfo);
                    _this._parametersFunctions = QueryBuilder.Widgets.expressionFunctions;
                    _this.isValid = ko.observable(true);
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(_this, $.extend(model, { "@ItemType": "Parameter" }));
                    _this.name = ko.pureComputed({
                        read: function () { return _this._name(); },
                        write: function (value) { if (DataSourceParameter.validateName(value))
                            _this._name(value); }
                    });
                    _this._expressionValue = ko.observable({
                        value: _this._value,
                        functions: _this._parametersFunctions
                    });
                    _this._disposables.push(_this.type.subscribe(function (val) {
                        if (val === "DevExpress.DataAccess.Expression") {
                            _this.resultType(_this._previousResultType);
                        }
                        else {
                            _this.resultType(null);
                            _this._previousResultType = val;
                        }
                        _this._updateValueInfo(val);
                    }));
                    _this._previousResultType = (_this.type.peek() === "DevExpress.DataAccess.Expression")
                        ? _this.resultType()
                        : _this.type();
                    _this.value = ko.pureComputed({
                        read: function () {
                            return _this.type() === "DevExpress.DataAccess.Expression" ? _this._expressionValue() : _this._value();
                        },
                        write: function (val) {
                            _this._value(val);
                        }
                    });
                    _this._updateValueInfo(_this.type.peek());
                    return _this;
                }
                DataSourceParameter.prototype._getTypeValue = function (typeName) {
                    var result = DataSourceParameter.typeValues.filter(function (type) { return type.name === typeName; });
                    if (result.length > 0) {
                        if (typeName === "DevExpress.DataAccess.Expression")
                            result[0].realTypeName = this.resultType();
                        return result[0];
                    }
                    return { name: typeName, defaultValue: null, specifics: "String", disableEditor: true };
                };
                DataSourceParameter.prototype._tryConvertValue = function (value, typeValue) {
                    if (!DataSourceParameter._isValueValid(value))
                        return typeValue.defaultValue;
                    var converter = typeValue.valueConverter || (function (val) { return val; }), newValue = converter(value);
                    return DataSourceParameter._isValueValid(newValue) ? newValue : typeValue.defaultValue;
                };
                DataSourceParameter._isValueValid = function (value) {
                    return value !== void 0 && value !== null && !isNaN(typeof value === "string" ? "" : value);
                };
                DataSourceParameter.prototype.getEditorType = function (type) {
                    return Analytics.Internal.getEditorType(type);
                };
                DataSourceParameter.prototype._updateValueInfo = function (newType) {
                    var _this = this;
                    var typeValue = this._getTypeValue(newType);
                    var newValue = this._tryConvertValue(this._value(), typeValue);
                    var expressionOptions = this._expressionValue.peek();
                    this._expressionValue(null);
                    this._value(null);
                    this._valueInfo($.extend({}, Metadata.parameterValueSerializationsInfo, {
                        editor: this.getEditorType(typeValue.name),
                        disabled: typeValue.disableEditor === true,
                        editorOptions: {
                            onFocusOut: function (params) {
                                _this.isValid(params.component.option("isValid"));
                            }
                        }
                    }));
                    this._expressionValue(expressionOptions);
                    this._value(newValue);
                };
                Object.defineProperty(DataSourceParameter.prototype, "specifics", {
                    get: function () {
                        var _this = this;
                        var result = DataSourceParameter.typeValues.filter(function (type) { return type.name === _this.type(); });
                        if (result.length > 0)
                            return result[0].specifics;
                        return "string";
                    },
                    enumerable: true,
                    configurable: true
                });
                DataSourceParameter.validateName = function (nameCandidate) {
                    return nameCandidate && !nameCandidate.match(/[~`!"№;%\^:\?*\(\)&\-\+={}\[\]\|\\\/,\.<>'\s]/);
                };
                DataSourceParameter.prototype.getInfo = function () {
                    if (this.type) {
                        var info = $.extend(true, [], this._serializationsInfo);
                        info.splice(info.indexOf(info.filter(function (prop) { return prop.propertyName === "value"; })[0]), 1, this._valueInfo());
                        return info;
                    }
                    return this._serializationsInfo;
                };
                DataSourceParameter.prototype.isPropertyVisible = function (propName) {
                    if (propName === "resultType")
                        return this.type() === "DevExpress.DataAccess.Expression";
                    return true;
                };
                DataSourceParameter.typeValues = [
                    new DataSourceParameterTypeValue("System.DateTime", dateDefaultValue(), tryParseDate),
                    new DataSourceParameterTypeValue("System.String", ""),
                    new DataSourceParameterTypeValue("System.SByte", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.Int16", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.Int32", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.Int64", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.Byte", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.UInt16", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.UInt32", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.UInt64", "0", integerValueConverter),
                    new DataSourceParameterTypeValue("System.Decimal", "0", floatValueConverter),
                    new DataSourceParameterTypeValue("System.Double", "0", floatValueConverter),
                    new DataSourceParameterTypeValue("System.Single", "0", floatValueConverter),
                    new DataSourceParameterTypeValue("System.Boolean", false, function (val) { return val !== void 0 ? String(val).toLowerCase() === "true" : val; }),
                    new DataSourceParameterTypeValue("System.Guid", "00000000-0000-0000-0000-000000000000"),
                    new DataSourceParameterTypeValue("DevExpress.DataAccess.Expression", "", expressionValueConverter),
                    new DataSourceParameterTypeValue("System.Char", ""),
                ];
                return DataSourceParameter;
            }(Analytics.Utils.Disposable));
            Data.DataSourceParameter = DataSourceParameter;
            var DBColumnType;
            (function (DBColumnType) {
                DBColumnType[DBColumnType["Unknown"] = 0] = "Unknown";
                DBColumnType[DBColumnType["Boolean"] = 1] = "Boolean";
                DBColumnType[DBColumnType["Byte"] = 2] = "Byte";
                DBColumnType[DBColumnType["SByte"] = 3] = "SByte";
                DBColumnType[DBColumnType["Char"] = 4] = "Char";
                DBColumnType[DBColumnType["Decimal"] = 5] = "Decimal";
                DBColumnType[DBColumnType["Double"] = 6] = "Double";
                DBColumnType[DBColumnType["Single"] = 7] = "Single";
                DBColumnType[DBColumnType["Int32"] = 8] = "Int32";
                DBColumnType[DBColumnType["UInt32"] = 9] = "UInt32";
                DBColumnType[DBColumnType["Int16"] = 10] = "Int16";
                DBColumnType[DBColumnType["UInt16"] = 11] = "UInt16";
                DBColumnType[DBColumnType["Int64"] = 12] = "Int64";
                DBColumnType[DBColumnType["UInt64"] = 13] = "UInt64";
                DBColumnType[DBColumnType["String"] = 14] = "String";
                DBColumnType[DBColumnType["DateTime"] = 15] = "DateTime";
                DBColumnType[DBColumnType["Guid"] = 16] = "Guid";
                DBColumnType[DBColumnType["TimeSpan"] = 17] = "TimeSpan";
                DBColumnType[DBColumnType["ByteArray"] = 18] = "ByteArray";
            })(DBColumnType = Data.DBColumnType || (Data.DBColumnType = {}));
            var DBColumn = (function () {
                function DBColumn(model) {
                    this.name = model["Name"];
                    this.type = model["ColumnType"];
                    this.size = model["Size"];
                }
                DBColumn.GetType = function (dbColumnType) {
                    switch (dbColumnType) {
                        case DBColumnType.Boolean:
                            return "System.Boolean";
                        case DBColumnType.Byte:
                            return "System.Byte";
                        case DBColumnType.SByte:
                            return "System.SByte";
                        case DBColumnType.Char:
                            return "System.Char";
                        case DBColumnType.Decimal:
                            return "System.Decimal";
                        case DBColumnType.Double:
                            return "System.Double";
                        case DBColumnType.Single:
                            return "System.Single";
                        case DBColumnType.Int32:
                            return "System.Int32";
                        case DBColumnType.UInt32:
                            return "System.UInt32";
                        case DBColumnType.Int16:
                            return "System.Int16";
                        case DBColumnType.UInt16:
                            return "System.UInt16";
                        case DBColumnType.Int64:
                            return "System.Int64";
                        case DBColumnType.UInt64:
                            return "System.UInt64";
                        case DBColumnType.String:
                            return "System.String";
                        case DBColumnType.DateTime:
                            return "System.DateTime";
                        case DBColumnType.Guid:
                            return "System.Guid";
                        case DBColumnType.TimeSpan:
                            return "System.TimeSpan";
                        case DBColumnType.ByteArray:
                            return "System.Byte[]";
                        default:
                            return "System.Object";
                    }
                };
                DBColumn.GetSpecific = function (type) {
                    switch (type) {
                        case "System.Boolean":
                            return "Bool";
                        case "System.Byte":
                        case "System.SByte":
                        case "System.Int16":
                        case "System.UInt16":
                        case "System.Int32":
                        case "System.UInt32":
                        case "System.Int64":
                        case "System.UInt64":
                            return "Integer";
                        case "System.Char":
                        case "System.Guid":
                        case "System.ByteArray":
                        case "System.String":
                            return "String";
                        case "System.Double":
                        case "System.Single":
                        case "System.Decimal":
                            return "Float";
                        case "System.DateTime":
                        case "System.TimeSpan":
                            return "Date";
                        default:
                            return "String";
                    }
                };
                return DBColumn;
            }());
            Data.DBColumn = DBColumn;
            var DBForeignKey = (function () {
                function DBForeignKey(model) {
                    this.name = model["Name"];
                    this.primaryKeyTable = model["PrimaryKeyTable"];
                    this.column = model["Columns"][0];
                    this.primaryKeyColumn = model["PrimaryKeyTableKeyColumns"][0];
                }
                return DBForeignKey;
            }());
            Data.DBForeignKey = DBForeignKey;
            (function (Internal) {
                function deserializeToCollection(model, createItem, collection) {
                    var collection = collection || [];
                    if (model) {
                        model.forEach(function (value) {
                            collection.push(createItem(value));
                        });
                    }
                    return collection;
                }
                Internal.deserializeToCollection = deserializeToCollection;
            })(Internal = Data.Internal || (Data.Internal = {}));
            var DBSchema = (function () {
                function DBSchema(model) {
                    var tables = Internal.deserializeToCollection(model["Tables"], function (tableModel) { return new DBTable(tableModel); });
                    tables.sort(function (a, b) { return a.name.localeCompare(b.name); });
                    var views = Internal.deserializeToCollection(model["Views"], function (tableModel) { return new DBTable(tableModel); });
                    views.sort(function (a, b) { return a.name.localeCompare(b.name); });
                    this.tables = tables.concat(views);
                    this.procedures = Internal.deserializeToCollection(model["StoredProcedures"], function (procModel) { return new DBStoredProcedure(procModel); });
                }
                return DBSchema;
            }());
            Data.DBSchema = DBSchema;
        })(Data = Analytics.Data || (Analytics.Data = {}));
        var Wizard;
        (function (Wizard) {
            Wizard.DataSourceWizardPageId = {
                ChooseDataSourceTypePage: "chooseDataSourceTypePage",
                ConfigureMasterDetailRelationshipsPage: "configureMasterDetailRelationshipsPage"
            };
            Wizard.SqlDataSourceWizardPageId = {
                ChooseConnectionPage: "chooseSqlConnectionPage",
                ConfigureQueryPage: "configureSqlQueryPage",
                ConfigureParametersPage: "configureSqlParametersPage",
                MultiQueryConfigurePage: "multiSqlQueryConfigurePage",
                MultiQueryConfigureParametersPage: "multiSqlQueryConfigureParametersPage"
            };
            Wizard.JsonDataSourceWizardPageId = {
                ChooseJsonSourcePage: "chooseJsonSourcePage",
                ChooseJsonSchemaPage: "chooseJsonSchemaPage",
                ChooseConnectionPage: "chooseJsonConnectionPage",
                SpecifyJsonConnectionPage: "specifyJsonConnectionPage"
            };
            Wizard.FullscreenDataSourceWizardPageId = {
                ChooseDataSourceTypePage: Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage,
                SpecifySqlDataSourceSettingsPage: "specifySqlDataSourceSettingsPage",
                SpecifyJsonDataSourceSettingsPage: "specifyJsonDataSourceSettingsPage"
            };
            Wizard.FullscreenDataSourceWizardSectionId = {
                SpecifyJsonConnectionPage: Wizard.JsonDataSourceWizardPageId.SpecifyJsonConnectionPage,
                ChooseJsonSchemaPage: Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage,
                ChooseJsonSourcePage: Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage,
                ChooseSqlConnectionPage: Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage,
                ConfigureQueryPage: Wizard.SqlDataSourceWizardPageId.MultiQueryConfigurePage,
                ConfigureQueryParametersPage: Wizard.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage,
                ConfigureMasterDetailRelationshipsPage: Wizard.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage
            };
            function _restoreSqlDataSourceFromState(state, requestWrapper, dataSourceId) {
                var _a, _b;
                var wrapper = new _SqlDataSourceWrapper(state.sqlDataSourceJSON, state.queryName, requestWrapper);
                state.name && wrapper.sqlDataSource.connection.name(state.name);
                var serializer = new Analytics.Utils.ModelSerializer();
                if (state.customQueries && state.customQueries.length > 0) {
                    wrapper.customQueries = state.customQueries.map(function (query) {
                        return wrapper.sqlDataSource.createQuery(JSON.parse(query), serializer);
                    });
                    (_a = wrapper.sqlDataSource.queries).push.apply(_a, wrapper.customQueries);
                }
                if (state.relations && state.relations.length > 0) {
                    (_b = wrapper.sqlDataSource.relations).push.apply(_b, state.relations.map(function (relation) {
                        return new Data.MasterDetailRelation(JSON.parse(relation), serializer);
                    }));
                }
                wrapper.sqlDataSource.id = dataSourceId || Analytics.Internal.guid().replace(/-/g, "");
                return wrapper;
            }
            Wizard._restoreSqlDataSourceFromState = _restoreSqlDataSourceFromState;
            function _restoreJsonDataSourceFromState(state, requestWrapper, dataSourceId) {
                var jsonDataSource = new Data.JsonDataSource({
                    "@Name": state.dataSourceName || "JsonDataSource",
                    "Source": state.jsonSource && JSON.parse(state.jsonSource) || {},
                    "Schema": state.jsonScheme && JSON.parse(state.jsonScheme) || {},
                    "@RootElement": state.rootElement || ""
                }, undefined, requestWrapper);
                state.connectionName && jsonDataSource.connectionName(state.connectionName);
                jsonDataSource.id = dataSourceId || Analytics.Internal.guid().replace(/-/g, "");
                return jsonDataSource;
            }
            Wizard._restoreJsonDataSourceFromState = _restoreJsonDataSourceFromState;
            function _createDefaultDataSourceWizardState(sqlDataSourceWizardState, jsonDataSourceWizardState) {
                if (sqlDataSourceWizardState === void 0) { sqlDataSourceWizardState = {}; }
                if (jsonDataSourceWizardState === void 0) { jsonDataSourceWizardState = { jsonSource: "" }; }
                return {
                    dataSourceType: DataSourceType.Sql,
                    jsonDataSourceWizard: jsonDataSourceWizardState,
                    sqlDataSourceWizard: sqlDataSourceWizardState,
                    dataSourceId: Analytics.Internal.guid().replace(/-/g, "")
                };
            }
            Wizard._createDefaultDataSourceWizardState = _createDefaultDataSourceWizardState;
            var WizardPageBase = (function (_super) {
                __extends(WizardPageBase, _super);
                function WizardPageBase() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._onChange = function () { return void 0; };
                    return _this;
                }
                WizardPageBase.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this._onChange = function () { return void 0; };
                };
                WizardPageBase.prototype.commit = function () {
                    return $.Deferred().resolve().promise();
                };
                WizardPageBase.prototype.onChange = function (callback) {
                    this._onChange = callback;
                };
                WizardPageBase.prototype.initialize = function (state) {
                    return $.Deferred().resolve().promise();
                };
                WizardPageBase.prototype.canNext = function () {
                    return true;
                };
                WizardPageBase.prototype.canFinish = function () {
                    return false;
                };
                return WizardPageBase;
            }(Analytics.Utils.Disposable));
            Wizard.WizardPageBase = WizardPageBase;
            var _WrappedWizardPage = (function (_super) {
                __extends(_WrappedWizardPage, _super);
                function _WrappedWizardPage(pageId, page, template, description) {
                    var _this = _super.call(this) || this;
                    _this.pageId = pageId;
                    _this.page = page;
                    _this.template = template;
                    _this.description = description;
                    _this._isInitialized = false;
                    _this._initDef = null;
                    _this.isChanged = true;
                    if (page.onChange) {
                        _this.onChange = function (callback) { return page.onChange(callback); };
                    }
                    return _this;
                }
                _WrappedWizardPage.prototype.dispose = function () {
                    this.onChange = null;
                    this[BaseWizard.__loadingStateFunctionName] = null;
                    this.page.dispose();
                    this._initDef && this._initDef.reject();
                    this._initDef = null;
                };
                _WrappedWizardPage.prototype.resetCommitedState = function () {
                    this._lastCommitedState = null;
                };
                _WrappedWizardPage.prototype.commit = function () {
                    var _this = this;
                    return this.page.commit().done(function (result) {
                        _this.isChanged = JSON.stringify(_this._lastCommitedState) !== JSON.stringify(result);
                        _this._lastCommitedState = result;
                    });
                };
                _WrappedWizardPage.prototype.initialize = function (state, force) {
                    var _this = this;
                    if (force === void 0) { force = false; }
                    this._initDef && this._initDef.reject();
                    this._initDef = $.Deferred();
                    if (!this._isInitialized || force) {
                        this._isInitialized = true;
                        this.page.initialize(state).fail(function () {
                            _this._isInitialized = false;
                            _this._initDef && _this._initDef.reject();
                        }).done(function (result) {
                            _this._initDef && _this._initDef.resolve(result);
                        });
                    }
                    else {
                        this._initDef.resolve();
                    }
                    return this._initDef.promise();
                };
                return _WrappedWizardPage;
            }(Analytics.Utils.Disposable));
            Wizard._WrappedWizardPage = _WrappedWizardPage;
            var DataSourceType;
            (function (DataSourceType) {
                DataSourceType[DataSourceType["NoData"] = 0] = "NoData";
                DataSourceType[DataSourceType["Sql"] = 1] = "Sql";
                DataSourceType[DataSourceType["Json"] = 2] = "Json";
            })(DataSourceType = Wizard.DataSourceType || (Wizard.DataSourceType = {}));
            var TypeItem = (function () {
                function TypeItem(textDefault, textID, imageClassName, imageTemplateName, type) {
                    this.text = Analytics.Utils.getLocalization(textDefault, textID);
                    this.imageClassName = imageClassName;
                    this.imageTemplateName = imageTemplateName;
                    this.type = type;
                }
                return TypeItem;
            }());
            Wizard.TypeItem = TypeItem;
            var ChooseDataSourceTypePage = (function (_super) {
                __extends(ChooseDataSourceTypePage, _super);
                function ChooseDataSourceTypePage(dataSourceTypeOptions) {
                    var _this = _super.call(this) || this;
                    _this._itemClick = function (item) {
                        _this.selectedItem(item);
                    };
                    _this._IsSelected = function (item) {
                        return _this.selectedItem().type === item.type;
                    };
                    _this.selectedItem = ko.observable();
                    _this.typeItems = [];
                    if (dataSourceTypeOptions.sqlDataSourceAvailable) {
                        _this.typeItems.push(new TypeItem("Database", "DataAccessUIStringId.DSTypeSql", "sqldatasource", "dxrd-svg-wizard-SqlDataSource", DataSourceType.Sql));
                    }
                    if (dataSourceTypeOptions.jsonDataSourceAvailable) {
                        _this.typeItems.push(new TypeItem("JSON", "DataAccessUIStringId.DSTypeJson", "jsondatasource", "dxrd-svg-wizard-JsonDataSource", DataSourceType.Json));
                    }
                    _this._disposables.push(_this.selectedItem.subscribe(function () { return _this._onChange(); }));
                    _this._extendCssClass = $.noop;
                    return _this;
                }
                ChooseDataSourceTypePage.prototype.canNext = function () {
                    return this.selectedItem() != null;
                };
                ChooseDataSourceTypePage.prototype.canFinish = function () {
                    return false;
                };
                ChooseDataSourceTypePage.prototype._goToNextPage = function () {
                    this[BaseWizard.__nextActionFunctionName] && this[BaseWizard.__nextActionFunctionName]();
                };
                ChooseDataSourceTypePage.prototype.commit = function () {
                    return $.Deferred().resolve({ dataSourceType: this.selectedItem().type }).promise();
                };
                ChooseDataSourceTypePage.prototype.initialize = function (state) {
                    var type = state.dataSourceType !== undefined ? state.dataSourceType : DataSourceType.Sql;
                    this.selectedItem(Analytics.Internal.findFirstItemMatchesCondition(this.typeItems, function (item) { return item.type === type; }));
                    return $.Deferred().resolve().promise();
                };
                return ChooseDataSourceTypePage;
            }(WizardPageBase));
            Wizard.ChooseDataSourceTypePage = ChooseDataSourceTypePage;
            function _registerChooseDataSourceTypePage(factory, dataSourceTypeOptions) {
                factory.registerMetadata(Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage, {
                    setState: function (data, state) {
                        state.dataSourceType = data.dataSourceType;
                    },
                    getState: function (state) {
                        return state;
                    },
                    resetState: function (state, defaultState) {
                        state.dataSourceType = defaultState.dataSourceType;
                    },
                    create: function () {
                        return new ChooseDataSourceTypePage(dataSourceTypeOptions);
                    },
                    description: Analytics.Utils.getLocalization("Select the data source type.", "DataAccessUIStringId.WizardPageChooseDSType"),
                    template: "dxrd-page-choose-datasource-type"
                });
            }
            Wizard._registerChooseDataSourceTypePage = _registerChooseDataSourceTypePage;
            var ChooseSqlConnectionPage = (function (_super) {
                __extends(ChooseSqlConnectionPage, _super);
                function ChooseSqlConnectionPage(connectionStrings) {
                    var _this = _super.call(this) || this;
                    _this._connectionStrings = ko.observableArray([]);
                    _this._selectedConnectionString = ko.observableArray([]);
                    _this._connectionStrings = connectionStrings;
                    _this._disposables.push(_this._selectedConnectionString.subscribe(function () { return _this._onChange(); }));
                    return _this;
                }
                ChooseSqlConnectionPage.prototype.initialize = function (state) {
                    var connectionStrings = this._connectionStrings();
                    if (connectionStrings.length === 1) {
                        this._selectedConnectionString([connectionStrings[0]]);
                    }
                    else {
                        var selectedString = Analytics.Internal.getFirstItemByPropertyValue(connectionStrings, "name", state.name) || connectionStrings[0];
                        this._selectedConnectionString(selectedString ? [selectedString] : []);
                    }
                    return $.Deferred().resolve().promise();
                };
                ChooseSqlConnectionPage.prototype.canNext = function () {
                    return this._selectedConnectionString().length !== 0;
                };
                ChooseSqlConnectionPage.prototype.commit = function () {
                    var deferred = $.Deferred();
                    if (this._selectedConnectionString()[0]) {
                        deferred.resolve({
                            name: this._selectedConnectionString()[0].name
                        });
                    }
                    else {
                        deferred.resolve();
                    }
                    return deferred.promise();
                };
                return ChooseSqlConnectionPage;
            }(WizardPageBase));
            Wizard.ChooseSqlConnectionPage = ChooseSqlConnectionPage;
            function _registerChooseSqlConnectionPage(factory, connectionStrings) {
                factory.registerMetadata(Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage, {
                    create: function () {
                        return new ChooseSqlConnectionPage(connectionStrings);
                    },
                    setState: function (data, state) {
                        state.name = data.name;
                    },
                    getState: function (state) {
                        return state.sqlDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.name = defaultState.name;
                    },
                    template: "dxrd-page-connectionstring",
                    description: Analytics.Utils.getLocalization("Choose a data connection", "AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection")
                });
            }
            Wizard._registerChooseSqlConnectionPage = _registerChooseSqlConnectionPage;
            var ChooseAvailableItemPage = (function (_super) {
                __extends(ChooseAvailableItemPage, _super);
                function ChooseAvailableItemPage(items, canCreateNew) {
                    var _a;
                    if (canCreateNew === void 0) { canCreateNew = true; }
                    var _this = _super.call(this) || this;
                    _this.items = items;
                    _this.selectedItems = ko.observableArray([]);
                    _this.operations = [
                        { text: _this.existingOperationText, createNew: false },
                        { text: _this.createNewOperationText, createNew: true }
                    ];
                    _this.selectedOperation = ko.observable(_this.operations[0]);
                    _this._createNew = ko.pureComputed(function () { return _this.selectedOperation().createNew; });
                    _this.canCreateNew = ko.observable(canCreateNew);
                    (_a = _this._disposables).push.apply(_a, Internal.subscribeProperties([_this.selectedOperation, _this.selectedItems], function () { return _this._onChange(); }));
                    return _this;
                }
                ChooseAvailableItemPage.prototype.canNext = function () {
                    return this.selectedItems().length !== 0 || this.selectedOperation().createNew;
                };
                ChooseAvailableItemPage.prototype.initialize = function (state) {
                    var item = this._getSelectedItem(state);
                    this.selectedItems(item ? [item] : []);
                    return $.Deferred().resolve(this).promise();
                };
                ChooseAvailableItemPage.prototype._displayExpr = function (item) {
                    return item.description || item.name;
                };
                ChooseAvailableItemPage.prototype._getSelectedItem = function (state) {
                    return this.items()[0];
                };
                Object.defineProperty(ChooseAvailableItemPage.prototype, "createNewOperationText", {
                    get: function () {
                        return Analytics.Utils.getLocalization("No, I'd like to create a new data source", "AnalyticsCoreStringId.Wizard_CreateNewDataSource");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChooseAvailableItemPage.prototype, "existingOperationText", {
                    get: function () {
                        return Analytics.Utils.getLocalization("Yes, let me choose an existing data source from the list", "AnalyticsCoreStringId.Wizard_ChooseDataSourceFromList");
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChooseAvailableItemPage;
            }(WizardPageBase));
            Wizard.ChooseAvailableItemPage = ChooseAvailableItemPage;
            var ChooseJsonConnectionPage = (function (_super) {
                __extends(ChooseJsonConnectionPage, _super);
                function ChooseJsonConnectionPage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChooseJsonConnectionPage.prototype.commit = function () {
                    return $.Deferred().resolve({
                        connectionName: !this.selectedOperation().createNew ? this.selectedItems()[0].name : null
                    }).promise();
                };
                ChooseJsonConnectionPage.prototype._getSelectedItem = function (data) {
                    return Analytics.Internal.getFirstItemByPropertyValue(this.items(), "name", data.connectionName) || _super.prototype._getSelectedItem.call(this);
                };
                Object.defineProperty(ChooseJsonConnectionPage.prototype, "createNewOperationText", {
                    get: function () {
                        return Analytics.Utils.getLocalization("No, I'd like to create a new data connection", "AnalyticsCoreStringId.JsonDSWizard_CreateNewConnection");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChooseJsonConnectionPage.prototype, "existingOperationText", {
                    get: function () {
                        return Analytics.Utils.getLocalization("Yes, let me choose an existing data connection from the list", "AnalyticsCoreStringId.JsonDSWizard_UseExistingConnection");
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChooseJsonConnectionPage;
            }(ChooseAvailableItemPage));
            Wizard.ChooseJsonConnectionPage = ChooseJsonConnectionPage;
            function _registerChooseJsonConnectionPage(factory, wizardOptions) {
                factory.registerMetadata(Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage, {
                    create: function () {
                        return new ChooseJsonConnectionPage(wizardOptions.connectionStrings && wizardOptions.connectionStrings.json, wizardOptions.canCreateNewJsonDataSource);
                    },
                    description: Analytics.Utils.getLocalization("Do you want to use an existing data connection?", "AnalyticsCoreStringId.JsonDSWizard_ChooseConnection_Description"),
                    getState: function (state) { return state.jsonDataSourceWizard; },
                    setState: function (data, state) { return state.connectionName = data.connectionName; },
                    resetState: function (state, defaultState) {
                        state.connectionName = defaultState.connectionName;
                    },
                    template: "dxrd-page-selectitems"
                });
            }
            Wizard._registerChooseJsonConnectionPage = _registerChooseJsonConnectionPage;
            var SpecifyJsonConnectionPage = (function (_super) {
                __extends(SpecifyJsonConnectionPage, _super);
                function SpecifyJsonConnectionPage(connections, canCreateNewJsonDataSource) {
                    var _this = _super.call(this, connections, canCreateNewJsonDataSource) || this;
                    _this._disposables.push(_this._specifySourceData = new ChooseJsonSourcePage());
                    _this._specifySourceData.onChange(function () { return _this._onChange(); });
                    return _this;
                }
                SpecifyJsonConnectionPage.prototype.commit = function () {
                    var deffered = $.Deferred();
                    var _promise;
                    if (this._createNew()) {
                        _promise = this._specifySourceData.commit();
                    }
                    else {
                        _promise = _super.prototype.commit.call(this);
                    }
                    _promise.done(function (state) {
                        deffered.resolve(state);
                    });
                    return deffered.promise();
                };
                SpecifyJsonConnectionPage.prototype.canNext = function () {
                    if (this._createNew()) {
                        return this._specifySourceData.canNext();
                    }
                    else {
                        return _super.prototype.canNext.call(this);
                    }
                };
                SpecifyJsonConnectionPage.prototype.initialize = function (state) {
                    var _this = this;
                    var deffered = $.Deferred();
                    _super.prototype.initialize.call(this, state).done(function () {
                        _this._specifySourceData.initialize(state).done(function () {
                            deffered.resolve(_this);
                        });
                    });
                    return deffered.promise();
                };
                return SpecifyJsonConnectionPage;
            }(ChooseJsonConnectionPage));
            Wizard.SpecifyJsonConnectionPage = SpecifyJsonConnectionPage;
            function _registerSpecifyJsonConnectionPage(factory, connections, canCreateNewJsonDataSource) {
                factory.registerMetadata(Wizard.JsonDataSourceWizardPageId.SpecifyJsonConnectionPage, {
                    create: function () { return new SpecifyJsonConnectionPage(connections, canCreateNewJsonDataSource); },
                    description: canCreateNewJsonDataSource ?
                        Analytics.Utils.getLocalization("Do you want to use an existing data connection?", "AnalyticsCoreStringId.JsonDSWizard_ChooseConnection_Description") :
                        Analytics.Utils.getLocalization("Choose a data connection.", "AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection"),
                    getState: function (state) { return state.jsonDataSourceWizard; },
                    setState: function (data, state) {
                        state.connectionName = data.connectionName;
                        state.jsonSource = data.jsonSource;
                        state.newConnectionName = data.newConnectionName;
                    },
                    resetState: function (state, defaultState) {
                        state.connectionName = defaultState.connectionName;
                        state.jsonSource = defaultState.jsonSource;
                        state.newConnectionName = defaultState.newConnectionName;
                    },
                    template: "dxrd-page-specify-connection"
                });
            }
            Wizard._registerSpecifyJsonConnectionPage = _registerSpecifyJsonConnectionPage;
            var ChooseJsonSourcePage = (function (_super) {
                __extends(ChooseJsonSourcePage, _super);
                function ChooseJsonSourcePage() {
                    var _this = _super.call(this) || this;
                    _this._requestWrapper = new QueryBuilder.Utils.RequestWrapper();
                    _this.__validationGroup = null;
                    _this.__validationSummary = null;
                    _this._jsonSourceTitle = Analytics.Utils.getLocalization("JSON Source:", "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType");
                    _this._jsonConnectionTitle = Analytics.Utils.getLocalization("Connection Name:", "AnalyticsCoreStringId.ReportDesigner_Wizard_Json_ConnectionName");
                    _this._connectionNameValidationRules = [{
                            type: "required",
                            get message() {
                                return Internal.getLocalizedValidationErrorMessage(null, this._jsonConnectionTitle);
                            }
                        }];
                    _this._connectionName = ko.observable("");
                    _this._validationGroup = {
                        onInitialized: function (args) { return _this._onValidationGroupInitialized(args); },
                        onDisposing: function (args) { return _this._onValidationGroupDisposing(args); }
                    };
                    _this._validationSummary = {
                        onInitialized: function (args) { return _this._onValidationSummaryInitialized(args); },
                        onDisposing: function (args) { return _this._onValidationSummaryDisposing(args); }
                    };
                    _this._sources = [];
                    _this._disposables.push(_this._jsonStringSettings = new Analytics.Wizard.Internal.JsonDataSourceJsonSourcePageStringSettings());
                    _this._jsonStringSettings.onChange(function () { return _this._onChange(); });
                    _this._disposables.push(_this._jsonUriSetting = new Analytics.Wizard.Internal.JsonDataSourceJsonSourcePageUriSettings(_this._requestWrapper));
                    _this._jsonUriSetting.onChange(function () { return _this._onChange(); });
                    _this._sources = [
                        { value: _this._jsonUriSetting, displayValue: "Web Service Endpoint (URI)", localizationId: "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Uri" },
                        { value: _this._jsonStringSettings, displayValue: "JSON String", localizationId: "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Custom" }
                    ];
                    var selectedSource = ko.observable();
                    _this._selectedSource = ko.pureComputed({
                        read: function () { return selectedSource(); },
                        write: function (newVal) {
                            if (selectedSource() === newVal)
                                return;
                            selectedSource(newVal);
                            newVal._validatorsReady && newVal._validatorsReady(false);
                            setTimeout(function () {
                                newVal._validate && newVal._validate();
                            }, 1);
                            _this._onChange();
                        }
                    });
                    _this._selectedSource(_this._sources[0].value);
                    _this._disposables.push(_this._selectedSource);
                    _this._disposables.push(_this._connectionName.subscribe(function () { return _this._onChange(); }));
                    return _this;
                }
                ChooseJsonSourcePage.prototype._onValidationGroupInitialized = function (e) {
                    this.__validationGroup = e.component;
                };
                ChooseJsonSourcePage.prototype._onValidationGroupDisposing = function (e) {
                    this.__validationGroup = null;
                };
                ChooseJsonSourcePage.prototype._onValidationSummaryInitialized = function (e) {
                    var _this = this;
                    this.__validationSummary = e.component;
                    this.__validationGroup && this.__validationSummary && setTimeout(function () {
                        _this.__validationGroup && _this.__validationGroup.validate();
                    }, 1);
                };
                ChooseJsonSourcePage.prototype._onValidationSummaryDisposing = function (e) {
                    this.__validationSummary = null;
                };
                ChooseJsonSourcePage.prototype.canNext = function () {
                    var connectionNameNotEmpty = !!this._connectionName();
                    var isCurrentSourceValid = this._selectedSource().isValid();
                    var isCurrentSourceEmpty = this._selectedSource().isEmpty();
                    return connectionNameNotEmpty && isCurrentSourceValid && !isCurrentSourceEmpty;
                };
                ChooseJsonSourcePage.prototype.commit = function () {
                    var jsonDataSource = new Data.JsonDataSource({});
                    this._selectedSource().applySettings(jsonDataSource);
                    var serialized = new Analytics.Utils.ModelSerializer().serialize(jsonDataSource);
                    return $.Deferred().resolve({
                        jsonSource: JSON.stringify(serialized.Source),
                        newConnectionName: this._connectionName()
                    }).promise();
                };
                ChooseJsonSourcePage.prototype.initialize = function (state) {
                    this.__validationGroup = null;
                    this.__validationSummary = null;
                    var jsonDataSource = Wizard._restoreJsonDataSourceFromState(state);
                    if (jsonDataSource.source.uri()) {
                        this._selectedSource(this._jsonUriSetting);
                    }
                    else if (jsonDataSource.source.json()) {
                        this._selectedSource(this._jsonStringSettings);
                    }
                    this._selectedSource().setValue(jsonDataSource);
                    return $.Deferred().resolve().promise();
                };
                return ChooseJsonSourcePage;
            }(WizardPageBase));
            Wizard.ChooseJsonSourcePage = ChooseJsonSourcePage;
            function _registerChooseJsonSourcePage(factory) {
                factory.registerMetadata(Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage, {
                    setState: function (data, state) {
                        state.jsonSource = data.jsonSource;
                        state.newConnectionName = data.newConnectionName;
                    },
                    getState: function (state) {
                        return state.jsonDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.jsonSource = defaultState.jsonSource;
                    },
                    create: function () {
                        return new ChooseJsonSourcePage();
                    },
                    description: Analytics.Utils.getLocalization("Create a data connection.", "AnalyticsCoreStringId.JsonDSWizard_CreateNewConnectionPage_Description"),
                    template: "dxrd-page-jsonsource"
                });
            }
            Wizard._registerChooseJsonSourcePage = _registerChooseJsonSourcePage;
            var ChooseJsonSchemaPage = (function (_super) {
                __extends(ChooseJsonSchemaPage, _super);
                function ChooseJsonSchemaPage(_requestWrapper) {
                    if (_requestWrapper === void 0) { _requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    _this._requestWrapper = _requestWrapper;
                    _this._rootItems = ko.observableArray([]);
                    _this._fieldListItemsProvider = ko.observable(null);
                    _this._fieldSelectedPath = ko.observable(null);
                    _this._cachedState = {
                        connectionName: null,
                        jsonSource: null
                    };
                    _this._createTreeNode = function (item, isChecked, path) {
                        var node = new DevExpress.Analytics.Wizard.Internal.DataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
                        _this._disposables.push(node.checked.subscribe(function () { return _this._onChange(); }));
                        return node;
                    };
                    _this._createLeafTreeNode = function (item, isChecked, path) {
                        var node = new DevExpress.Analytics.Wizard.Internal.FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
                        _this._disposables.push(node.checked.subscribe(function () { return _this._onChange(); }));
                        return node;
                    };
                    _this._rootElementTitle = Analytics.Utils.getLocalization("Root element:", "DataAccessUIStringId.WizardPageChooseJsonSchema_RootElement");
                    _this._rootElementList = ko.observable([]);
                    _this._selectedRootElement = ko.observable(null);
                    var rootElementSubscription = null;
                    _this._disposables.push(_this._rootElementList.subscribe(function (rootElements) {
                        rootElementSubscription && rootElementSubscription.dispose();
                        rootElementSubscription = _this._selectedRootElement.subscribe(function (selectedPath) {
                            if (!selectedPath)
                                return _this._rootItems([]);
                            var rootNode = _this._getSchemaToDataMemberInfo(selectedPath);
                            if (rootNode) {
                                _this._rootItems([{
                                        name: ko.unwrap(rootNode.name),
                                        isSelected: ko.unwrap(rootNode.selected),
                                        displayName: ko.unwrap(rootNode.displayName) || ko.unwrap(rootNode.name),
                                        data: rootNode,
                                        specifics: rootNode.nodes.length > 0 ? "List" : "Default"
                                    }]);
                            }
                        });
                        _this._selectedRootElement(rootElements[0]);
                    }));
                    var fieldListProvider = new Analytics.Internal.FieldListProvider(_this._createFieldListCallback(), _this._rootItems);
                    _this._fieldListItemsProvider(new Internal.JsonTreeNodeItemsProvider(fieldListProvider, _this._rootItems, _this._createTreeNode, _this._createLeafTreeNode));
                    _this._disposables.push(_this._fieldListItemsProvider());
                    _this._fieldListModel = {
                        expandRootItems: true,
                        itemsProvider: _this._fieldListItemsProvider(),
                        selectedPath: _this._fieldSelectedPath,
                        treeListController: null,
                        templateName: "dxrd-treelist-with-checkbox"
                    };
                    return _this;
                }
                ChooseJsonSchemaPage.prototype._clear = function () {
                    this._rootItems([]);
                    this._fieldSelectedPath("");
                    this._rootElementList([]);
                    this._selectedRootElement(null);
                    this._dataSource && this._dataSource.jsonSchemaProvider.reset();
                    this._cachedState = {
                        connectionName: null,
                        jsonSource: null
                    };
                };
                ChooseJsonSchemaPage.prototype._createFieldListCallback = function () {
                    var _this = this;
                    return function (pathRequest) {
                        var parentNode = new Data.JsonNode({});
                        parentNode.nodes = [_this._rootItems()[0].data];
                        var itemsByPath = _this._getInnerItemsByPath(pathRequest, parentNode);
                        return $.Deferred().resolve(itemsByPath).promise();
                    };
                };
                ChooseJsonSchemaPage.prototype._getSchemaToDataMemberInfo = function (path) {
                    var nodeAcc = this._dataSource.schema;
                    for (var i = 0; i < path.pathParts.length; i++) {
                        nodeAcc = nodeAcc.nodes.filter(function (node) { return node.name() === path.pathParts[i]; })[0];
                        if (!nodeAcc)
                            return null;
                    }
                    return nodeAcc;
                };
                ChooseJsonSchemaPage.prototype._mapJsonNodesToTreelistItems = function (nodes) {
                    return $.map((nodes || []), function (node) {
                        var dataMemberInfo = {
                            name: node.name(),
                            displayName: node.displayName || node.name(),
                            isSelected: node.selected(),
                            isList: node.nodes && node.nodes.length > 0,
                            specifics: "Default"
                        };
                        return dataMemberInfo;
                    });
                };
                ChooseJsonSchemaPage.prototype._getNodesByPath = function (pathRequest, parentNode) {
                    if (!pathRequest.fullPath) {
                        return parentNode.nodes;
                    }
                    else {
                        var currentNodes = parentNode.nodes;
                        for (var i = 0; i < pathRequest.pathParts.length; i++) {
                            var pathPart = (currentNodes || []).filter(function (node) { return node.name() == pathRequest.pathParts[i]; })[0];
                            if (!pathPart)
                                return [];
                            currentNodes = pathPart.nodes;
                        }
                        return currentNodes;
                    }
                };
                ChooseJsonSchemaPage.prototype._getInnerItemsByPath = function (pathRequest, parentNode) {
                    var nodes = this._getNodesByPath(pathRequest, parentNode);
                    return this._mapJsonNodesToTreelistItems(nodes);
                };
                ChooseJsonSchemaPage.prototype._beginInternal = function (state) {
                    var _this = this;
                    if ((state.connectionName && this._cachedState.connectionName === state.connectionName) ||
                        (state.jsonSource && this._cachedState.jsonSource === state.jsonSource))
                        return $.Deferred().resolve().promise();
                    this._clear();
                    this._cachedState = {
                        connectionName: state.connectionName,
                        jsonSource: state.jsonSource
                    };
                    var oldDataSourceId = this._dataSource && this._dataSource.id;
                    this._dataSource = Wizard._restoreJsonDataSourceFromState(state, this._requestWrapper);
                    if ((oldDataSourceId && oldDataSourceId != this._dataSource.id) || !this._dataSource.schema.nodes.length) {
                        return this._dataSource.getSchema()
                            .done(function (schema) { return _this._updatePage(schema); });
                    }
                    return $.Deferred().done(function (schema) { return _this._updatePage(schema); }).resolve(this._dataSource.schema).promise();
                };
                ChooseJsonSchemaPage.prototype._updatePage = function (jsonSchema) {
                    var rootElementList = jsonSchema.getRootElementPartList();
                    if (this._rootElementList() !== rootElementList) {
                        this._rootElementList(rootElementList);
                    }
                    if (this._dataSource.rootElement()) {
                        var dataSourceRootElementPath = ["root", this._dataSource.rootElement()].join('.');
                        var rootElementToSelect = this._rootElementList().filter(function (item) { return item.fullPath === dataSourceRootElementPath; })[0] || this._rootElementList()[0];
                        this._selectedRootElement(rootElementToSelect);
                    }
                    this._onChange();
                };
                ChooseJsonSchemaPage.prototype._resetSelectionRecursive = function (currentNode, selectedRootElement) {
                    var _this = this;
                    if (currentNode === selectedRootElement) {
                        return;
                    }
                    currentNode.selected && currentNode.selected(false);
                    (currentNode.nodes || []).forEach(function (node) { return _this._resetSelectionRecursive(node, selectedRootElement); });
                };
                ChooseJsonSchemaPage.prototype._mapJsonSchema = function (jsonNode, path) {
                    var _this = this;
                    var treelistNode = this._fieldListItemsProvider().getNodeByPath(path);
                    if (!treelistNode)
                        return;
                    jsonNode.selected(treelistNode.checked() !== false);
                    (jsonNode.nodes || []).forEach(function (innerJsonNode) {
                        var nextPathParts = path.pathParts.concat(innerJsonNode.name());
                        var nextFullPath = nextPathParts.join('.');
                        var nextPath = { fullPath: nextFullPath, path: innerJsonNode.name(), id: nextFullPath, pathParts: nextPathParts };
                        _this._mapJsonSchema(innerJsonNode, nextPath);
                    });
                    return jsonNode;
                };
                ChooseJsonSchemaPage.prototype.canNext = function () {
                    return false;
                };
                ChooseJsonSchemaPage.prototype.canFinish = function () {
                    return this._fieldListItemsProvider().hasCheckedItems();
                };
                ChooseJsonSchemaPage.prototype.commit = function () {
                    var rootItem = this._rootItems()[0];
                    if (!rootItem)
                        return;
                    var currentRootNode = this._rootItems()[0].data;
                    this._resetSelectionRecursive(this._dataSource.schema, currentRootNode);
                    var currentRootPath = currentRootNode.name();
                    var pathFromCurrentRoot = { fullPath: currentRootPath, path: "", id: currentRootPath, pathParts: [currentRootPath] };
                    this._mapJsonSchema(this._rootItems()[0].data, pathFromCurrentRoot);
                    var selectedRootElementPath = this._selectedRootElement().pathParts.slice(1).join('.');
                    this._dataSource.rootElement(selectedRootElementPath);
                    var serialized = new Analytics.Utils.ModelSerializer().serialize(this._dataSource);
                    return $.Deferred().resolve({
                        connectionName: this._dataSource.connectionName(),
                        dataSourceName: serialized["@Name"],
                        jsonScheme: JSON.stringify(serialized.Schema),
                        rootElement: serialized["@RootElement"]
                    }).promise();
                };
                ChooseJsonSchemaPage.prototype.initialize = function (state) {
                    return this._beginInternal(state);
                };
                ChooseJsonSchemaPage.prototype.reset = function () {
                    this._clear();
                };
                return ChooseJsonSchemaPage;
            }(WizardPageBase));
            Wizard.ChooseJsonSchemaPage = ChooseJsonSchemaPage;
            function _registerChooseJsonSchemaPage(factory, requestWrapper) {
                factory.registerMetadata(Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage, {
                    setState: function (data, state) {
                        state.dataSourceName = data.dataSourceName;
                        state.jsonScheme = data.jsonScheme;
                        state.rootElement = data.rootElement;
                    },
                    getState: function (state) {
                        return state.jsonDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.dataSourceName = defaultState.dataSourceName;
                        state.jsonScheme = defaultState.jsonScheme;
                        state.rootElement = defaultState.rootElement;
                    },
                    create: function () {
                        return new ChooseJsonSchemaPage(requestWrapper);
                    },
                    description: Analytics.Utils.getLocalization('Select data fields.', 'DataAccessUIStringId.WizardPageChooseJsonSchema'),
                    template: "dxrd-jsondatasource-fields-page"
                });
            }
            Wizard._registerChooseJsonSchemaPage = _registerChooseJsonSchemaPage;
            var _SqlDataSourceWrapper = (function () {
                function _SqlDataSourceWrapper(sqlDataSourceJSON, queryName, requestWrapper) {
                    var _this = this;
                    this.sqlDataSourceJSON = sqlDataSourceJSON;
                    this.customQueries = [];
                    this.sqlDataSource = new Data.SqlDataSource(sqlDataSourceJSON ? JSON.parse(sqlDataSourceJSON) : {}, undefined, requestWrapper);
                    if (queryName) {
                        this.sqlDataSource.queries().some(function (value, index) {
                            if (value.name() === queryName) {
                                _this._queryIndex = index;
                                return true;
                            }
                            return false;
                        });
                    }
                    else {
                        this._queryIndex = this.sqlDataSource.queries().length;
                    }
                }
                Object.defineProperty(_SqlDataSourceWrapper.prototype, "sqlQuery", {
                    get: function () {
                        return this.sqlDataSource.queries()[this._queryIndex];
                    },
                    set: function (val) {
                        if (val)
                            val.parent = this.sqlDataSource;
                        this.sqlDataSource.queries()[this._queryIndex] = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                _SqlDataSourceWrapper.prototype.saveCustomQueries = function () {
                    var serializer = new Analytics.Utils.ModelSerializer();
                    return this.customQueries.length > 0 && this.customQueries.map(function (x) { return JSON.stringify(serializer.serialize(x)); });
                };
                _SqlDataSourceWrapper.prototype.save = function () {
                    return JSON.stringify(new Analytics.Utils.ModelSerializer().serialize(this.sqlDataSource));
                };
                return _SqlDataSourceWrapper;
            }());
            Wizard._SqlDataSourceWrapper = _SqlDataSourceWrapper;
            var ConfigureQueryPage = (function (_super) {
                __extends(ConfigureQueryPage, _super);
                function ConfigureQueryPage(_options) {
                    var _this = _super.call(this) || this;
                    _this._options = _options;
                    _this._connection = function () {
                        return _this._dataSource().connection;
                    };
                    _this._dataSource = function () {
                        return _this._dataSourceWrapper && _this._dataSourceWrapper.sqlDataSource;
                    };
                    _this.queryControl = ko.observable();
                    _this.runQueryBuilderBtnText = ko.pureComputed(function () {
                        return (!_this._selectStatementControl.sqlString() || _this._selectStatementControl.getQuery().type() === Data.Utils.SqlQueryType.tableQuery) ?
                            Analytics.Utils.getLocalization("Run Query Builder...", "DataAccessUIStringId.Button_QueryBuilder") :
                            Analytics.Utils.getLocalization("Create New Query...", "AnalyticsCoreStringId.SqlDSWizard_CreateNewQuery");
                    }).extend({ deferred: true });
                    _this.queryTypeItems = [ConfigureQueryPage.QUERY_TEXT, ConfigureQueryPage.SP_TEXT];
                    _this.selectedQueryType = ko.observable();
                    _this._proceduresList = new Analytics.Wizard.Internal.StoredProceduresQueryControl();
                    _this._selectStatementControl = new Analytics.Wizard.Internal.SelectStatementQueryControl(new Analytics.Wizard.Internal.SelectQuerySqlTextProvider(QueryBuilder.Internal.wrapGetSelectStatement(_this._options.callbacks.selectStatement), _this._connection), _this._options.disableCustomSql);
                    _this._disposables.push(_this.selectedQueryType.subscribe(function (value) {
                        if (value === ConfigureQueryPage.SP_TEXT) {
                            _this._dataSource().dbSchemaProvider.getDbStoredProcedures().done(function (procedures) {
                                _this._proceduresList.storedProcedures([]);
                                _this._proceduresList.storedProcedures(procedures);
                            });
                            _this.queryControl(_this._proceduresList);
                        }
                        else {
                            _this.queryControl(_this._selectStatementControl);
                        }
                    }));
                    _this.selectedQueryType(ConfigureQueryPage.QUERY_TEXT);
                    _this.popupQueryBuilder = new Analytics.Wizard.Internal.QueryBuilderPopup(function (newQuery, isInProcess) {
                        return _this._selectStatementControl.setQuery(newQuery, isInProcess);
                    }, _this._options.rtl, _this._options.callbacks.customizeQBInitData);
                    return _this;
                }
                ConfigureQueryPage.prototype.canNext = function () {
                    return !this.queryControl().isNextDisabled();
                };
                ConfigureQueryPage.prototype.canFinish = function () {
                    return !this.queryControl().isFinishDisabled() || !this.queryControl().isNextDisabled();
                };
                ConfigureQueryPage.prototype.runQueryBuilder = function () {
                    var _this = this;
                    this._dataSource().dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                        var query = _this.queryControl().getQuery();
                        if (query.type() === Data.Utils.SqlQueryType.tableQuery) {
                            _this.popupQueryBuilder.show(query, _this._dataSource());
                        }
                        else {
                            _this.popupQueryBuilder.show(new Data.TableQuery({ "@Name": query.name() }, _this._dataSource()), _this._dataSource());
                        }
                    });
                };
                ConfigureQueryPage.prototype.localizeQueryType = function (queryTypeString) {
                    return ConfigureQueryPage.QUERY_TEXT === queryTypeString ?
                        Analytics.Utils.getLocalization(ConfigureQueryPage.QUERY_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_Query") :
                        Analytics.Utils.getLocalization(ConfigureQueryPage.SP_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_StoredProcedure");
                };
                ConfigureQueryPage.prototype.initialize = function (state) {
                    this._dataSourceWrapper = Wizard._restoreSqlDataSourceFromState(state, this._options.requestWrapper);
                    this._proceduresList.setQuery(new Data.StoredProcQuery({}, this._dataSource()));
                    this._selectStatementControl.setQuery(new Data.CustomSqlQuery({}, this._dataSource()));
                    if (this._dataSourceWrapper.sqlQuery) {
                        this.selectedQueryType(this._dataSourceWrapper.sqlQuery.type() === Data.Utils.SqlQueryType.storedProcQuery ? ConfigureQueryPage.SP_TEXT : ConfigureQueryPage.QUERY_TEXT);
                        this.queryControl().setQuery(this._dataSourceWrapper.sqlQuery);
                    }
                    else {
                        this.selectedQueryType(ConfigureQueryPage.QUERY_TEXT);
                    }
                    this.popupQueryBuilder.isVisible(false);
                    return $.Deferred().resolve().promise();
                };
                ConfigureQueryPage.prototype.commit = function () {
                    var query = this.queryControl().getQuery();
                    if (query) {
                        if (!query.name() || !this._dataSourceWrapper.sqlQuery || this._dataSourceWrapper.sqlQuery.name() !== query.name())
                            query.name(Data.Internal.generateQueryUniqueName(this._dataSource().queries(), query));
                        this._dataSourceWrapper.sqlQuery = query;
                    }
                    return $.Deferred().resolve({
                        queryName: this._dataSourceWrapper.sqlQuery.name(),
                        sqlDataSourceJSON: this._dataSourceWrapper.save()
                    }).promise();
                };
                ConfigureQueryPage.QUERY_TEXT = "Query";
                ConfigureQueryPage.SP_TEXT = "Stored Procedure";
                return ConfigureQueryPage;
            }(WizardPageBase));
            Wizard.ConfigureQueryPage = ConfigureQueryPage;
            function _registerConfigureQueryPage(factory, dataSourceWizardOptions) {
                factory.registerMetadata(Wizard.SqlDataSourceWizardPageId.ConfigureQueryPage, {
                    create: function () {
                        return new ConfigureQueryPage(dataSourceWizardOptions);
                    },
                    setState: function (data, state) {
                        state.queryName = data.queryName;
                        state.sqlDataSourceJSON = data.sqlDataSourceJSON;
                    },
                    getState: function (state) {
                        return state.sqlDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.sqlDataSourceJSON = defaultState.sqlDataSourceJSON;
                        state.queryName = defaultState.queryName;
                    },
                    template: "dxrd-wizard-create-query-page",
                    description: DevExpress.Analytics.Utils.getLocalization("Create a query or select a stored procedure", DevExpress.Analytics.Internal.StringId.WizardPageConfigureQuery)
                });
            }
            Wizard._registerConfigureQueryPage = _registerConfigureQueryPage;
            var ConfigureQueryParametersPage = (function (_super) {
                __extends(ConfigureQueryParametersPage, _super);
                function ConfigureQueryParametersPage(parametersConverter, _requestWrapper) {
                    if (parametersConverter === void 0) { parametersConverter = {
                        createParameterViewModel: function (parameter) { return parameter; },
                        getParameterFromViewModel: function (parameterViewModel) { return parameterViewModel; }
                    }; }
                    var _this = _super.call(this) || this;
                    _this.parametersConverter = parametersConverter;
                    _this._requestWrapper = _requestWrapper;
                    _this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, _this._requestWrapper);
                    _this.removeButtonTitle = Analytics.Utils.getLocalization("Remove", "DataAccessUIStringId.Button_Remove");
                    _this.parametersEditorOptions = {
                        addHandler: function () {
                            return _this.parametersConverter.createParameterViewModel(new Data.DataSourceParameter({
                                "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(_this.parametersEditorOptions.values.peek().peek(), "param"),
                                "@Type": "System.Int32"
                            }));
                        },
                        values: ko.observable(ko.observableArray([])),
                        displayName: "Parameters",
                        level: 0,
                        info: ko.observable({
                            displayName: "Parameters", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Parameters",
                            propertyName: "parameters",
                            modelName: "Parameter",
                            array: true,
                            editor: DevExpress.Analytics.Widgets.editorTemplates.commonCollection,
                            template: "#dxrd-parameter-collection-item"
                        }),
                        editorTemplate: "#dxrd-wizard-datasource-parameters",
                        hideButtons: ko.observable(false),
                        collapsed: false
                    };
                    return _this;
                }
                ConfigureQueryParametersPage.prototype._isParametersValid = function () {
                    return this.getParameters().every(function (x) { return x.isValid(); });
                };
                ConfigureQueryParametersPage.prototype.canNext = function () {
                    return false;
                };
                ConfigureQueryParametersPage.prototype.canFinish = function () {
                    return this._isParametersValid();
                };
                ConfigureQueryParametersPage.prototype.getParameters = function () {
                    return this.parametersEditorOptions.values()();
                };
                ConfigureQueryParametersPage.prototype.initialize = function (data) {
                    var _this = this;
                    this._sqlDataSourceWrapper = Wizard._restoreSqlDataSourceFromState(data, this._requestWrapper);
                    this.parametersEditorOptions.hideButtons(this._sqlDataSourceWrapper.sqlQuery.type() === Data.Utils.SqlQueryType.storedProcQuery);
                    setTimeout(function () {
                        _this.parametersEditorOptions.values(ko.observableArray(_this._sqlDataSourceWrapper.sqlQuery.parameters().map(function (item) { return _this.parametersConverter.createParameterViewModel(item); })));
                    }, 100);
                    return $.Deferred().resolve().promise();
                };
                ConfigureQueryParametersPage.prototype.commit = function () {
                    var _this = this;
                    this._sqlDataSourceWrapper.sqlQuery.parameters(this.parametersEditorOptions.values()().map(function (item) { return _this.parametersConverter.getParameterFromViewModel(item); }));
                    return $.Deferred().resolve({
                        sqlDataSourceJSON: this._sqlDataSourceWrapper.save()
                    }).promise();
                };
                return ConfigureQueryParametersPage;
            }(WizardPageBase));
            Wizard.ConfigureQueryParametersPage = ConfigureQueryParametersPage;
            function _registerConfigureParametersPage(factory, requestWrapper, parametersConverter) {
                factory.registerMetadata(Wizard.SqlDataSourceWizardPageId.ConfigureParametersPage, {
                    create: function () { return new ConfigureQueryParametersPage(parametersConverter, requestWrapper); },
                    getState: function (state) { return state.sqlDataSourceWizard; },
                    setState: function (result, state) { return state.sqlDataSourceJSON = result.sqlDataSourceJSON; },
                    resetState: function () { return void 0; },
                    template: "dxrd-page-configure-parameters",
                    description: Analytics.Utils.getLocalization("Configure query parameters.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters")
                });
            }
            Wizard._registerConfigureParametersPage = _registerConfigureParametersPage;
            var MultiQueryConfigurePage = (function (_super) {
                __extends(MultiQueryConfigurePage, _super);
                function MultiQueryConfigurePage(_options) {
                    var _this = _super.call(this) || this;
                    _this._options = _options;
                    _this._selectedPath = ko.observable(null);
                    _this._connection = "";
                    _this._itemsProvider = ko.observable();
                    _this._customQueries = ko.observableArray([]);
                    _this._checkedQueries = ko.observableArray([]);
                    _this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, undefined);
                    _this._dataSource = function () {
                        return _this._sqlDataSourceWrapper && _this._sqlDataSourceWrapper.sqlDataSource;
                    };
                    _this._dataConnection = function () {
                        return _this._dataSource() && _this._dataSource().connection;
                    };
                    _this._showStatementPopup = function (query) {
                        _this._popupSelectStatement.isVisible(true);
                        _this._popupSelectStatement.query = query;
                        _this._popupSelectStatement.data(query.sqlString());
                    };
                    _this._showQbCallBack = function (name, isCustomQuery) {
                        if (name === void 0) { name = null; }
                        if (isCustomQuery === void 0) { isCustomQuery = false; }
                        if (name !== null) {
                            var query = Analytics.Internal.findFirstItemMatchesCondition(_this._customQueries(), function (item) { return name === (item.name() || item.generateName()); });
                            if (query.type() === Data.Utils.SqlQueryType.customSqlQuery) {
                                _this._queryEditIndex(_this._customQueries().indexOf(query));
                                _this._showStatementPopup(query);
                            }
                            else {
                                _this._queryEditIndex(_this._customQueries().indexOf(query));
                                _this._popupQueryBuilder.show(query, _this._dataSource());
                            }
                        }
                        else {
                            _this._queryEditIndex(-1);
                            if (isCustomQuery) {
                                _this._showStatementPopup(new Data.CustomSqlQuery({ "@Name": null }, _this._dataSource()));
                            }
                            else {
                                var queryNew = new Data.TableQuery({ "@Name": null }, _this._dataSource());
                                _this._popupQueryBuilder.show(queryNew, _this._dataSource());
                            }
                        }
                    };
                    _this._popupSelectStatement = ({
                        isVisible: ko.observable(false),
                        title: function () { return Analytics.Utils.getLocalization("Custom SQL Editor", "AnalyticsCoreStringId.SqlDSWizard_CustomSqlEditor"); },
                        query: null,
                        data: ko.observable(),
                        okButtonText: function () { return DevExpress.Analytics.Utils.getLocalization('OK', 'DataAccessUIStringId.Button_OK'); },
                        okButtonHandler: function (e) {
                            _this._popupSelectStatement.query.sqlString(e.model.data());
                            _this._setCustomSqlQuery(_this._popupSelectStatement.query);
                            e.model.isVisible(false);
                        },
                        aceOptions: QueryBuilder.Widgets.Internal.createDefaultSQLAceOptions(),
                        aceAvailable: Analytics.Widgets.Internal.aceAvailable,
                        additionalOptions: QueryBuilder.Widgets.Internal.createDefaultSQLAdditionalOptions(function (newVal) { _this._popupSelectStatement.data(newVal); }),
                        languageHelper: QueryBuilder.Widgets.Internal.createDefaultSQLLanguageHelper(),
                        closest: function (element, parentSelector) {
                            return $(element).closest(parentSelector);
                        }
                    });
                    _this._customResetOptions = $.noop;
                    _this._queryEditIndex = ko.observable(-1);
                    _this.disableCustomSql = true;
                    _this._scrollViewHeight = "100%";
                    _this._customizeDBSchemaTreeListActions = null;
                    _this._isDataLoadingInProcess = ko.observable(false);
                    _this._callbacks = _this._options.callbacks;
                    _this._sqlTextProvider = new Analytics.Wizard.Internal.SelectQuerySqlTextProvider(QueryBuilder.Internal.wrapGetSelectStatement(_this._callbacks.selectStatement), _this._dataConnection);
                    _this._popupQueryBuilder = new Analytics.Wizard.Internal.QueryBuilderPopup(function (newQuery, isInProcess) { return _this._setTableQuery(newQuery, isInProcess); }, _this._options.rtl, _this._options.callbacks.customizeQBInitData);
                    _this._fieldListModel = ko.observable(null);
                    _this._disposables.push(_this._hasParametersToEdit = ko.pureComputed(function () { return _this._itemsProvider().hasParametersToEdit(); }));
                    _this._disposables.push(_this._isDataLoadingInProcess.subscribe(function (newVal) {
                        if (!newVal)
                            _this._onChange();
                        _this[BaseWizard.__loadingStateFunctionName] && _this[BaseWizard.__loadingStateFunctionName](newVal);
                    }));
                    _this.disableCustomSql = _this._options.disableCustomSql;
                    _this._getItemsAfterCheck = function (node) {
                        _this._resetDataSourceResult();
                        _this._isDataLoadingInProcess(true);
                        if (node.checked.peek() && node.isList) {
                            if (node.name === "tables" || node.name === "views") {
                                _this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest(node.name)).done(function () {
                                    if (node.isList && node.children.peek().length > 0) {
                                        $.when.apply($, node.children.peek().map(function (item) {
                                            return _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest(node.name + "." + item.name));
                                        })).always(function () { return _this._isDataLoadingInProcess(false); });
                                    }
                                    else {
                                        _this._isDataLoadingInProcess(false);
                                    }
                                });
                            }
                            else if (node.specifics === "table" || node.specifics === "view") {
                                _this["_itemsProvider"]().getItems(new DevExpress.Analytics.Utils.PathRequest(node.specifics + "." + node.name))
                                    .always(function () { return _this._isDataLoadingInProcess(false); });
                            }
                            else if (node.name === "procedures") {
                                _this["_itemsProvider"]().getItems(new DevExpress.Analytics.Utils.PathRequest(node.name))
                                    .always(function () { return _this._isDataLoadingInProcess(false); });
                            }
                            else {
                                _this._isDataLoadingInProcess(false);
                            }
                        }
                        else {
                            _this._isDataLoadingInProcess(false);
                        }
                    };
                    return _this;
                }
                MultiQueryConfigurePage.prototype._addQueryAlgorithm = function (elements, specifics, dataSource, customQueries) {
                    if (!elements.unChecked() || specifics === "queries") {
                        if (elements.children().length === 0) {
                            this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest(specifics));
                        }
                        if (specifics === "tables" || specifics === "views") {
                            this._addQueryFromTables(elements, dataSource);
                        }
                        else if (specifics === "procedures") {
                            this._addQueryFromStoredProcedures(elements, dataSource);
                        }
                        else {
                            this._addQueryFromCustomQueries(elements, customQueries, dataSource.queries);
                        }
                    }
                    else {
                        elements.children().forEach(function (node) {
                            MultiQueryConfigurePage._removeQuery(dataSource.queries, node);
                        });
                    }
                };
                MultiQueryConfigurePage.prototype._addQueryFromTables = function (elements, dataSource) {
                    var _self = this;
                    for (var i = 0; i < elements.children().length; i++) {
                        var table = elements.children()[i];
                        if (!table.unChecked()) {
                            var columns = {};
                            var queryJSON = {
                                "Columns": columns,
                                "Tables": {
                                    "SelectedTables": {
                                        "Item1": {
                                            "@Name": table.name,
                                            "@ControlType": "Table",
                                            "@ItemType": "Table"
                                        }
                                    },
                                }
                            };
                            if (table.children().length === 0) {
                                this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest("tables." + table.name)).done(function () {
                                    table.initializeChildren(table.children());
                                });
                            }
                            for (var j = 0; j < table.children().length; j++) {
                                var column = table.children()[j];
                                if (column.checked()) {
                                    columns["Item" + (j + 1)] = {
                                        "@Table": table.name,
                                        "@Name": column.name,
                                        "@ItemType": "Column"
                                    };
                                }
                            }
                            MultiQueryConfigurePage._pushQuery(new Data.TableQuery(queryJSON, dataSource), table, dataSource.queries);
                        }
                        else {
                            MultiQueryConfigurePage._removeQuery(dataSource.queries, table);
                        }
                    }
                };
                MultiQueryConfigurePage.prototype._addQueryFromStoredProcedures = function (elements, dataSource) {
                    for (var i = 0; i < elements.children().length; i++) {
                        var procedure = elements.children()[i];
                        if (procedure.checked()) {
                            var newQuery = new Data.StoredProcQuery({ "@Name": procedure.name, "ProcName": procedure.name }, dataSource);
                            procedure.arguments.forEach(function (arg) {
                                newQuery.parameters.push(new Data.DataSourceParameter({ "@Name": arg.name, "@Type": Data.DBColumn.GetType(arg.type) }, null, Data.Metadata.storedProcParameterSerializationsInfo(Data.DBColumn.GetType(arg.type))));
                            });
                            MultiQueryConfigurePage._pushQuery(newQuery, procedure, dataSource.queries);
                        }
                        else {
                            MultiQueryConfigurePage._removeQuery(dataSource.queries, procedure);
                        }
                    }
                };
                MultiQueryConfigurePage.prototype._addQueryFromCustomQueries = function (elements, queries, allQueries) {
                    for (var i = 0; i < elements.children().length; i++) {
                        var queryNode = elements.children()[i];
                        var query = Analytics.Internal.findFirstItemMatchesCondition(queries.peek(), function (item) { return queryNode.name === (item.name() || item.generateName()); });
                        if (queryNode.checked()) {
                            query.name(Data.Internal.generateQueryUniqueName(allQueries.peek(), query));
                            this._checkedQueries.push(query);
                        }
                    }
                };
                MultiQueryConfigurePage.prototype._getItemsPromise = function (pathRequest) {
                    return this._itemsProvider().getItems(pathRequest);
                };
                MultiQueryConfigurePage.prototype._resetDataSourceResult = function () {
                    this._customResetOptions();
                    this._dataSource().relations([]);
                    this._dataSource().resultSet = null;
                    this._onChange();
                };
                MultiQueryConfigurePage.prototype._setQueryCore = function (query) {
                    var provider = this._fieldListModel().itemsProvider;
                    var queryEditIndex = this._queryEditIndex();
                    if (queryEditIndex >= 0) {
                        this._itemsProvider().queries().children()[queryEditIndex].name = query.name();
                        provider.customQueries().splice(queryEditIndex, 1, query);
                    }
                    else {
                        query.name(Data.Internal.generateQueryUniqueName(provider.customQueries().peek(), query));
                        provider.customQueries().push(query);
                        this._selectedPath("queries." + query.name());
                        var childrens = this._itemsProvider().queries().children();
                        var children = childrens[childrens.length - 1];
                        children.setChecked(true);
                        children["_afterCheckToggled"] && children["_afterCheckToggled"](children);
                    }
                    this._resetDataSourceResult();
                };
                MultiQueryConfigurePage._pushQuery = function (newQuery, node, queries) {
                    if (!Analytics.Internal.findFirstItemMatchesCondition(queries.peek(), function (item) { return item.name() === (newQuery.name() || newQuery.generateName()); })) {
                        newQuery.name(Data.Internal.generateQueryUniqueName(queries.peek(), newQuery));
                        queries.push(newQuery);
                    }
                    node.hasQuery = true;
                };
                MultiQueryConfigurePage._removeQuery = function (queries, node) {
                    if (node.hasQuery) {
                        var queryIndex = -1;
                        var existUncheck = queries.peek().some(function (value, index) {
                            if (value.name() === node.name || value.generateName() === node.name) {
                                queryIndex = index;
                                return true;
                            }
                            return false;
                        });
                        if (existUncheck) {
                            queries.splice(queryIndex, 1);
                        }
                        node.hasQuery = false;
                    }
                };
                MultiQueryConfigurePage.prototype.canNext = function () {
                    return !this._itemsProvider().nextButtonDisabled() && this.canFinish();
                };
                MultiQueryConfigurePage.prototype.canFinish = function () {
                    return this._itemsProvider() && this._itemsProvider().hasCheckedItems() && !this._isDataLoadingInProcess();
                };
                MultiQueryConfigurePage.prototype._AddQueryWithBuilder = function () {
                };
                MultiQueryConfigurePage.prototype._runQueryBuilder = function () {
                };
                MultiQueryConfigurePage.prototype._loadPanelViewModel = function (element) {
                    return PopupWizard._getLoadPanelViewModel(element, this._isDataLoadingInProcess);
                };
                MultiQueryConfigurePage.prototype._setTableQuery = function (query, isInProcess) {
                    var _this = this;
                    isInProcess && isInProcess(true);
                    return this._sqlTextProvider.getQuerySqlText(query)
                        .done(function () { return _this._setQueryCore(query); })
                        .always(function () {
                        isInProcess && isInProcess(false);
                    });
                };
                MultiQueryConfigurePage.prototype._setCustomSqlQuery = function (query) {
                    this._setQueryCore(query);
                };
                MultiQueryConfigurePage.prototype.commit = function () {
                    var _this = this;
                    this._dataSource().queries.removeAll();
                    this._checkedQueries.removeAll();
                    this._addQueryAlgorithm(this._itemsProvider().tables(), "tables", this._dataSource());
                    this._addQueryAlgorithm(this._itemsProvider().views(), "views", this._dataSource());
                    this._addQueryAlgorithm(this._itemsProvider().procedures(), "procedures", this._dataSource());
                    this._addQueryAlgorithm(this._itemsProvider().queries(), "queries", this._dataSource(), this._customQueries);
                    ko.utils.arrayPushAll(this._dataSource().queries(), this._checkedQueries());
                    this._dataSource().queries.valueHasMutated();
                    var checkedCustomQueries = this._itemsProvider().queries().children().filter(function (x) { return x.checked(); }).map(function (query) { return query.name; });
                    var customQueries = this._sqlDataSourceWrapper.sqlDataSource.queries().filter(function (x) {
                        return checkedCustomQueries.some(function (queryName) { return queryName === x.name(); }) || x instanceof Data.StoredProcQuery;
                    });
                    customQueries.forEach(function (item) { return _this._sqlDataSourceWrapper.sqlDataSource.queries.remove(item); });
                    var serializer = new Analytics.Utils.ModelSerializer();
                    return $.Deferred().resolve({
                        sqlDataSourceJSON: this._sqlDataSourceWrapper.save(),
                        customQueries: customQueries.map(function (x) { return JSON.stringify(serializer.serialize(x)); })
                    }).promise();
                };
                MultiQueryConfigurePage.prototype.initialize = function (state) {
                    var _this = this;
                    this._sqlDataSourceWrapper = Wizard._restoreSqlDataSourceFromState(state, this._options.requestWrapper);
                    var customQueriesPromise = this._callbacks.customQueriesPreset
                        ? this._callbacks.customQueriesPreset(this._dataSource())
                        : $.Deferred().resolve([]).promise();
                    var deferred = $.Deferred();
                    customQueriesPromise.done(function (queries) {
                        _this._customQueries(queries);
                        _this._selectedPath("");
                        _this._itemsProvider(new Analytics.Wizard.Internal.DBSchemaItemsProvider(_this._dataSource().dbSchemaProvider, _this._customQueries, _this._showQbCallBack, _this.disableCustomSql, _this._getItemsAfterCheck));
                        _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest("queries"));
                        _this._fieldListModel({
                            itemsProvider: _this._itemsProvider(),
                            selectedPath: _this._selectedPath,
                            treeListController: new Analytics.Wizard.Internal.DBSchemaTreeListController(_this._customizeDBSchemaTreeListActions),
                            templateName: "dxrd-treelist-with-checkbox"
                        });
                        _this._popupQueryBuilder.isVisible(false);
                        _this._dataSource()
                            .dbSchemaProvider.getDbSchema()
                            .done(function () {
                            deferred.resolve();
                        })
                            .fail(deferred.reject);
                    })
                        .fail(deferred.reject);
                    return deferred.promise();
                };
                return MultiQueryConfigurePage;
            }(WizardPageBase));
            Wizard.MultiQueryConfigurePage = MultiQueryConfigurePage;
            function _registerMultiQueryConfigurePage(factory, wizardOptions) {
                factory.registerMetadata(Wizard.SqlDataSourceWizardPageId.MultiQueryConfigurePage, {
                    create: function () {
                        return new MultiQueryConfigurePage(wizardOptions);
                    },
                    setState: function (data, state) {
                        state.sqlDataSourceJSON = data.sqlDataSourceJSON;
                        state.customQueries = data.customQueries;
                    },
                    getState: function (state) {
                        return state.sqlDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.sqlDataSourceJSON = defaultState.sqlDataSourceJSON;
                        state.customQueries = defaultState.customQueries;
                    },
                    description: Analytics.Utils.getLocalization("Columns selected from specific tables and/or views will be automatically included into a separate query.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureMultiQuery"),
                    template: "dxrd-wizard-add-queries-page"
                });
            }
            Wizard._registerMultiQueryConfigurePage = _registerMultiQueryConfigurePage;
            function _canEditQueryParameters(query, customQueries) {
                if (query.type() === Data.Utils.SqlQueryType.tableQuery || query.type() === Data.Utils.SqlQueryType.customSqlQuery) {
                    return customQueries.indexOf(query) > -1;
                }
                return query.type() === Data.Utils.SqlQueryType.storedProcQuery && query.parameters().length > 0;
            }
            Wizard._canEditQueryParameters = _canEditQueryParameters;
            var MultiQueryConfigureParametersPage = (function (_super) {
                __extends(MultiQueryConfigureParametersPage, _super);
                function MultiQueryConfigureParametersPage(parametersConverter, _requestWrapper) {
                    if (parametersConverter === void 0) { parametersConverter = {
                        createParameterViewModel: function (parameter) { return parameter; },
                        getParameterFromViewModel: function (parameterViewModel) { return parameterViewModel; }
                    }; }
                    var _this = _super.call(this) || this;
                    _this.parametersConverter = parametersConverter;
                    _this._requestWrapper = _requestWrapper;
                    _this._sqlDataSourceWrapper = new _SqlDataSourceWrapper(undefined, undefined, _this._requestWrapper);
                    _this._selectedPath = ko.observable(null);
                    _this._rootItems = ko.observableArray();
                    _this._createNewParameter = function (queryName, parameters) {
                        var newParameter = new Data.DataSourceParameter({
                            "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(parameters, "parameter"),
                            "@Type": "System.Int32"
                        });
                        _this._selectedPath(queryName + "." + newParameter.name());
                        return _this.parametersConverter.createParameterViewModel(newParameter);
                    };
                    _this._scrollViewHeight = "100%";
                    _this._fieldListModel = ko.observable(null);
                    _this._removeButtonTitle = Analytics.Utils.getLocalization("Remove", "DataAccessUIStringId.Button_Remove");
                    var callback = function () { return _this._onChange(); };
                    _this._disposables.push(Internal.subscribeArray(_this._rootItems, function (item) {
                        _this._disposables.push(Internal.subscribeArray(item.parameters, function (parameter) {
                            _this._disposables.push(Internal.subscribeObject(parameter.dataSourceParameter, function (value) {
                                var _a;
                                (_a = _this._disposables).push.apply(_a, Internal.subscribeProperties([value.name, value["value"], value["type"]], callback));
                            }, callback));
                        }, callback));
                    }, callback));
                    _this._parametersEditorOptions = {
                        addHandler: function () {
                            return _this.parametersConverter.createParameterViewModel(new Data.DataSourceParameter({
                                "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(_this._parametersEditorOptions.values.peek().peek(), "param"),
                                "@Type": "System.Int32"
                            }));
                        },
                        values: ko.observable(ko.observableArray([])),
                        displayName: "Parameters",
                        level: 0,
                        info: ko.observable({
                            displayName: "Parameters", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Parameters",
                            propertyName: "parameters",
                            modelName: "Parameter",
                            array: true,
                            editor: DevExpress.Analytics.Widgets.editorTemplates.commonCollection,
                            template: "#dxrd-parameter-collection-item"
                        }),
                        editorTemplate: "#dxrd-wizard-datasource-parameters",
                        hideButtons: ko.observable(false),
                        collapsed: false
                    };
                    return _this;
                }
                MultiQueryConfigureParametersPage.prototype._isParametersValid = function () {
                    return this._getParameters().every(function (x) { return x.isValid(); });
                };
                MultiQueryConfigureParametersPage.prototype.canNext = function () {
                    return this._isParametersValid() && this._sqlDataSourceWrapper.sqlDataSource.queries().length > 1;
                };
                MultiQueryConfigureParametersPage.prototype.canFinish = function () {
                    return this._isParametersValid() && this._sqlDataSourceWrapper.sqlDataSource.queries().length >= 1;
                };
                MultiQueryConfigureParametersPage.prototype._getParameters = function () {
                    return [].concat.apply([], (this._rootItems() || []).map(function (x) {
                        return x.parameters().map(function (param) {
                            return param.dataSourceParameter();
                        });
                    }));
                };
                MultiQueryConfigureParametersPage.prototype.initialize = function (state) {
                    var _this = this;
                    var newRootItemsWithParameters = [];
                    var rootItems = this._rootItems();
                    this._sqlDataSourceWrapper = Wizard._restoreSqlDataSourceFromState(state, this._requestWrapper);
                    this._sqlDataSourceWrapper.sqlDataSource.queries().forEach(function (query) {
                        if (Analytics.Wizard._canEditQueryParameters(query, _this._sqlDataSourceWrapper.customQueries)) {
                            var parent = new Analytics.Wizard.Internal.ParametersTreeListRootItem(query);
                            parent.parameters(query.parameters().map(function (parameterModel) {
                                return new Analytics.Wizard.Internal.ParametersTreeListItem(_this.parametersConverter.createParameterViewModel(parameterModel), parent);
                            }));
                            newRootItemsWithParameters.push(parent);
                        }
                    });
                    rootItems.filter(function (x) { return newRootItemsWithParameters.every(function (newItem) { return newItem.name !== x.name; }); }).forEach(function (removedItem) {
                        rootItems.splice(_this._rootItems().indexOf(removedItem), 1);
                    });
                    newRootItemsWithParameters.forEach(function (newItem) {
                        var currentItem = rootItems.filter(function (x) { return x.name === newItem.name; })[0];
                        if (currentItem) {
                            newItem.parameters().filter(function (newParam) { return currentItem.parameters().every(function (x) { return x.name !== newParam.name; }); }).forEach(function (param) {
                                currentItem.parameters.push(param);
                            });
                        }
                        else {
                            rootItems.push(newItem);
                        }
                    });
                    this._rootItems.valueHasMutated();
                    this._fieldListModel({
                        itemsProvider: {
                            getItems: function (pathRequest) {
                                var result = $.Deferred();
                                if (!pathRequest.fullPath) {
                                    result.resolve(_this._rootItems());
                                }
                                else {
                                    var parent = Analytics.Internal.findFirstItemMatchesCondition(_this._rootItems(), function (item) { return item.name === pathRequest.ref; });
                                    result.resolve(parent.parameters());
                                }
                                return result.promise();
                            }
                        },
                        templateName: "dx-treelist-item-with-hover",
                        selectedPath: this._selectedPath,
                        treeListController: new Analytics.Wizard.Internal.ParametersTreeListController(this._rootItems(), this._createNewParameter),
                    });
                    return $.Deferred().resolve().promise();
                };
                MultiQueryConfigureParametersPage.prototype.commit = function () {
                    var _this = this;
                    this._rootItems().forEach(function (item) {
                        item.query().parameters(item.parameters().map(function (parameterViewModel) {
                            return _this.parametersConverter.getParameterFromViewModel(parameterViewModel.dataSourceParameter());
                        }));
                    });
                    return $.Deferred().resolve({
                        sqlDataSourceJSON: this._sqlDataSourceWrapper.sqlDataSourceJSON,
                        customQueries: this._sqlDataSourceWrapper.saveCustomQueries()
                    }).promise();
                };
                return MultiQueryConfigureParametersPage;
            }(WizardPageBase));
            Wizard.MultiQueryConfigureParametersPage = MultiQueryConfigureParametersPage;
            function _registerMultiQueryConfigureParametersPage(factory, requestWrapper, parametersConverter) {
                factory.registerMetadata(Wizard.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage, {
                    create: function () { return new MultiQueryConfigureParametersPage(parametersConverter, requestWrapper); },
                    getState: function (state) { return state.sqlDataSourceWizard; },
                    setState: function (result, state) { return state.customQueries = result.customQueries; },
                    resetState: function () { return void 0; },
                    description: Analytics.Utils.getLocalization("Configure query parameters.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters"),
                    template: "dxrd-configure-query-parameters-page"
                });
            }
            Wizard._registerMultiQueryConfigureParametersPage = _registerMultiQueryConfigureParametersPage;
            var ConfigureMasterDetailRelationshipsPage = (function (_super) {
                __extends(ConfigureMasterDetailRelationshipsPage, _super);
                function ConfigureMasterDetailRelationshipsPage(_sqlDataSourceResultSchema) {
                    var _this = _super.call(this) || this;
                    _this._sqlDataSourceResultSchema = _sqlDataSourceResultSchema;
                    _this._relations = ko.observableArray([]);
                    _this._customResetOptions = $.noop;
                    _this._relationsEditor = ko.observable(null);
                    var callback = function () { return _this._onChange(); };
                    _this._disposables.push(Internal.subscribeArray(_this._relations, function (relation) {
                        var _a;
                        (_a = relation._disposables).push.apply(_a, Internal.subscribeProperties([relation.detailQuery, relation.name, relation.masterQuery], callback));
                        relation._disposables.push(Internal.subscribeArray(relation.keyColumns, function (column) {
                            var _a;
                            (_a = relation._disposables).push.apply(_a, Internal.subscribeProperties([column.detailColumn, column.masterColumn], callback));
                        }, callback));
                    }, callback));
                    return _this;
                }
                ConfigureMasterDetailRelationshipsPage.prototype.dispose = function () {
                    _super.prototype.dispose.call(this);
                    this.disposeObservableArray(this._relations);
                };
                ConfigureMasterDetailRelationshipsPage.prototype._updateRelations = function () {
                    var _this = this;
                    var relations = this._relations();
                    relations.forEach(function (relation, index) {
                        var detailTable = _this._resultSet.tables().filter(function (table) { return table.tableName() === relation.detailQuery(); })[0];
                        var masterTable = _this._resultSet.tables().filter(function (table) { return table.tableName() === relation.masterQuery(); })[0];
                        if (!detailTable || !masterTable) {
                            relations.splice(index, 1);
                            return;
                        }
                        var keyColumns = relation.keyColumns();
                        keyColumns.forEach(function (keyColumn, index) {
                            if (detailTable.columns().every(function (x) { return x.name() !== keyColumn.detailColumn(); }) ||
                                masterTable.columns().every(function (x) { return x.name() !== keyColumn.masterColumn(); }))
                                keyColumns.splice(index, 1);
                        });
                        if (keyColumns.length === 0)
                            relations.splice(index, 1);
                    });
                    this._relations.valueHasMutated();
                };
                ConfigureMasterDetailRelationshipsPage.prototype.canNext = function () {
                    return false;
                };
                ConfigureMasterDetailRelationshipsPage.prototype.canFinish = function () {
                    return this._relations().every(function (relation) { return relation.keyColumns()
                        .every(function (keyColumn) { return !!keyColumn.detailColumn() && !!keyColumn.masterColumn(); }); });
                };
                ConfigureMasterDetailRelationshipsPage.prototype._getResultSet = function (dataSource) {
                    var deferred = $.Deferred();
                    if (dataSource.resultSet) {
                        deferred.resolve((dataSource.resultSet));
                    }
                    else {
                        this._sqlDataSourceResultSchema(dataSource).done((function (result) {
                            deferred.resolve(new Data.ResultSet(JSON.parse(result.resultSchemaJSON)));
                        })).fail(function (result) {
                            deferred.reject(result);
                        });
                    }
                    return deferred.promise();
                };
                ConfigureMasterDetailRelationshipsPage.prototype.initialize = function (state) {
                    var _this = this;
                    this.relationsSubscription && this.relationsSubscription.dispose();
                    this._sqlDataSourceWrapper = Wizard._restoreSqlDataSourceFromState(state);
                    this._disposables.push(this.relationsSubscription = this._relations.subscribe(function (changes) {
                        var isRelationsChanged = changes.some(function (change) {
                            return !change["moved"] && change["moved"] !== 0;
                        });
                        if (isRelationsChanged) {
                            _this._customResetOptions();
                        }
                    }, null, "arrayChange"));
                    return this._getResultSet(this._sqlDataSourceWrapper.sqlDataSource)
                        .done(function (result) {
                        _this._resultSet = result;
                        _this._updateRelations();
                        _this._relationsEditor(new QueryBuilder.Widgets.Internal.MasterDetailEditor(_this._relations, _this._resultSet, $.noop));
                    })
                        .fail(function (result) {
                        if (Analytics.Internal.getErrorMessage(result))
                            Analytics.Internal.ShowMessage(Analytics.Internal.getErrorMessage(result));
                    });
                };
                ConfigureMasterDetailRelationshipsPage.prototype.commit = function () {
                    this.relationsSubscription.dispose();
                    this._sqlDataSourceWrapper.sqlDataSource.relations(this._relations());
                    this._sqlDataSourceWrapper.sqlDataSource.resultSet = this._resultSet;
                    var serializer = new Analytics.Utils.ModelSerializer();
                    return $.Deferred().resolve({
                        sqlDataSourceJSON: this._sqlDataSourceWrapper.sqlDataSourceJSON,
                        customQueries: this._sqlDataSourceWrapper.saveCustomQueries(),
                        relations: this._relations().map(function (x) { return JSON.stringify(serializer.serialize(x)); }),
                    }).promise();
                };
                return ConfigureMasterDetailRelationshipsPage;
            }(WizardPageBase));
            Wizard.ConfigureMasterDetailRelationshipsPage = ConfigureMasterDetailRelationshipsPage;
            function _registerConfigureMasterDetailRelationshipsPage(factory, sqlDataSourceResultSchema) {
                factory.registerMetadata(Wizard.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage, {
                    create: function () {
                        return new ConfigureMasterDetailRelationshipsPage(sqlDataSourceResultSchema);
                    },
                    setState: function (data, state) {
                        state.relations = data.relations;
                    },
                    getState: function (state) {
                        return state.sqlDataSourceWizard;
                    },
                    resetState: function (state, defaultState) {
                        state.relations = defaultState.relations;
                    },
                    description: Analytics.Utils.getLocalization("Configure master-detail relationships.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations"),
                    template: "dxrd-wizard-configure-relations-page"
                });
            }
            Wizard._registerConfigureMasterDetailRelationshipsPage = _registerConfigureMasterDetailRelationshipsPage;
            var PageFactory = (function () {
                function PageFactory() {
                    this.metadata = {};
                }
                PageFactory.prototype.registerMetadata = function (pageId, metadata) {
                    if (!metadata.canFinish)
                        metadata.canFinish = function (page) { return page.canFinish(); };
                    if (!metadata.canNext)
                        metadata.canNext = function (page) { return page.canNext(); };
                    this.metadata[pageId] = metadata;
                };
                PageFactory.prototype.getMetadata = function (pageId) {
                    return this.metadata[pageId];
                };
                PageFactory.prototype.unregisterMetadata = function (pageId) {
                    delete this.metadata[pageId];
                };
                PageFactory.prototype.reset = function () {
                    this.metadata = {};
                };
                return PageFactory;
            }());
            Wizard.PageFactory = PageFactory;
            var StateManager = (function () {
                function StateManager(globalState, pageFactory) {
                    this.globalState = globalState;
                    this.pageFactory = pageFactory;
                    this.defaultState = Analytics.Internal.extend(true, {}, globalState);
                }
                StateManager.prototype._getPageState = function (pageId, state) {
                    if (state === void 0) { state = this.globalState; }
                    return this.pageFactory.getMetadata(pageId).getState(state);
                };
                StateManager.prototype.setPageState = function (pageId, data) {
                    this.pageFactory.getMetadata(pageId).setState(data, this.getPageState(pageId));
                };
                StateManager.prototype.getPageState = function (pageId) {
                    return this._getPageState(pageId);
                };
                StateManager.prototype.resetPageState = function (pageId) {
                    var defaultState = Analytics.Internal.extend(true, {}, this._getPageState(pageId, this.defaultState));
                    this.pageFactory.getMetadata(pageId).resetState(this.getPageState(pageId), defaultState);
                };
                StateManager.prototype.getCurrentState = function () {
                    return this.globalState;
                };
                StateManager.prototype.reset = function () {
                    this.globalState.reset();
                };
                return StateManager;
            }());
            Wizard.StateManager = StateManager;
            var PageIterator = (function (_super) {
                __extends(PageIterator, _super);
                function PageIterator(pageFactory, stateManager, _onResetPage) {
                    if (_onResetPage === void 0) { _onResetPage = function () { return void 0; }; }
                    var _this = _super.call(this) || this;
                    _this.pageFactory = pageFactory;
                    _this.stateManager = stateManager;
                    _this._onResetPage = _onResetPage;
                    _this._pages = [];
                    _this._currentIndex = 0;
                    return _this;
                }
                PageIterator.prototype.dispose = function () {
                    this._pages.forEach(function (x) { return x.dispose(); });
                    this._pages = [];
                };
                PageIterator.prototype.__resetPages = function (fromIndex) {
                    if (fromIndex < this._pages.length) {
                        for (var index = this._pages.length - 1; index >= fromIndex; index--) {
                            this.stateManager.resetPageState(this._pages[index].pageId);
                            this._onResetPage(this._pages[index]);
                            this._pages[index].dispose();
                            this._pages.splice(index, 1);
                        }
                    }
                };
                PageIterator.prototype._nextPage = function () {
                    return this._pages[this._currentIndex + 1];
                };
                PageIterator.prototype._getNextExistingPage = function () {
                    this._currentIndex += 1;
                    var deferred = $.Deferred();
                    deferred.resolve(this._pages[this._currentIndex]);
                    return deferred.promise();
                };
                PageIterator.prototype._resetPages = function () {
                    this.__resetPages(this._currentIndex + 1);
                };
                PageIterator.prototype._getNextNewPage = function (nextPageId) {
                    this._currentIndex += 1;
                    var deferred = $.Deferred();
                    this.__resetPages(this._currentIndex);
                    var pageMetadata = this.pageFactory.getMetadata(nextPageId);
                    var newPage = new _WrappedWizardPage(nextPageId, pageMetadata.create(), pageMetadata.template, pageMetadata.description);
                    this._pages.push(newPage);
                    deferred.resolve(newPage);
                    return deferred.promise();
                };
                PageIterator.prototype._getStartPage = function (pageId) {
                    pageId = pageId || this.getNextPageId();
                    var pageMetadata = this.pageFactory.getMetadata(pageId);
                    var startPage = new _WrappedWizardPage(pageId, pageMetadata.create(), pageMetadata.template, pageMetadata.description);
                    this._pages.push(startPage);
                    return startPage;
                };
                PageIterator.prototype._getNextPage = function () {
                    var currentPage = this._getCurrentPage();
                    if (currentPage.isChanged || !this._nextPage()) {
                        var nextPageId = this.getNextPageId(this._getCurrentPage().pageId);
                        if (!nextPageId)
                            return $.Deferred().reject().promise();
                        currentPage.isChanged = false;
                        return this._getNextNewPage(nextPageId);
                    }
                    else
                        return this._getNextExistingPage();
                };
                PageIterator.prototype._getPreviousPage = function () {
                    var deferred = $.Deferred();
                    if (this._currentIndex - 1 < 0) {
                        deferred.reject(null);
                    }
                    else {
                        this._currentIndex -= 1;
                        deferred.resolve(this._pages[this._currentIndex]);
                    }
                    return deferred.promise();
                };
                PageIterator.prototype._goToPage = function (pageId) {
                    var deferred = $.Deferred();
                    var page = this._pages.filter(function (page) { return page.pageId === pageId; })[0];
                    if (page) {
                        this._currentIndex = this._pages.indexOf(page);
                        deferred.resolve(page);
                    }
                    else {
                        deferred.reject(null);
                    }
                    return deferred.promise();
                };
                PageIterator.prototype._getCurrentPage = function () {
                    return this._pages[this._currentIndex];
                };
                PageIterator.prototype._getCurrentState = function () {
                    return this.stateManager.getCurrentState();
                };
                PageIterator.prototype.getNextPageId = function (pageId) {
                    return "";
                };
                return PageIterator;
            }(Analytics.Utils.Disposable));
            Wizard.PageIterator = PageIterator;
            var BaseWizard = (function (_super) {
                __extends(BaseWizard, _super);
                function BaseWizard(pageFactory, finishCallback) {
                    var _this = _super.call(this) || this;
                    _this.pageFactory = pageFactory;
                    _this.events = new Analytics.Utils.EventManager();
                    _this._loadingTimeout = null;
                    _this.isLoading = ko.observable(false);
                    _this._currentPage = ko.observable();
                    _this.isVisible = ko.observable(false);
                    _this._finishCallback = finishCallback;
                    _this._disposables.push(_this.events);
                    return _this;
                }
                BaseWizard.prototype._createLoadingState = function (page) {
                    var _this = this;
                    if (!page[BaseWizard.__loadingStateFunctionName]) {
                        page[BaseWizard.__loadingStateFunctionName] = function (newVal) { return _this._loadingState(newVal); };
                    }
                };
                BaseWizard.prototype._createNextAction = function (page) {
                    var _this = this;
                    if (!page[BaseWizard.__nextActionFunctionName]) {
                        page[BaseWizard.__nextActionFunctionName] = function () { return _this.nextAction(); };
                    }
                };
                BaseWizard.prototype._loadingState = function (active) {
                    var _this = this;
                    if (active) {
                        this._loadingTimeout && clearTimeout(this._loadingTimeout);
                        this._loadingTimeout = setTimeout(function () {
                            _this.isLoading(true);
                        }, 100);
                    }
                    else {
                        this._loadingTimeout && clearTimeout(this._loadingTimeout);
                        this.isLoading(false);
                    }
                };
                BaseWizard.prototype._callBeforeFinishHandler = function (state, wizardModel) {
                    this.events.call("beforeFinish", { state: state });
                };
                BaseWizard.prototype._callAfterFinishHandler = function (state, result) {
                    this.events.call("afterFinish", { state: state });
                };
                BaseWizard.prototype.onFinish = function () {
                    this.iterator.dispose();
                };
                BaseWizard.prototype.initialize = function (state, createIterator) {
                    if (state === void 0) { state = {}; }
                    if (createIterator === void 0) { createIterator = function (pageFactory, stateManager) { return new PageIterator(pageFactory, stateManager); }; }
                    this.events.call("beforeInitialize", { wizard: this, state: state });
                    this.stateManager = new StateManager(state, this.pageFactory);
                    this.iterator = createIterator(this.pageFactory, this.stateManager);
                    this.events.call("afterInitialize", { wizard: this });
                };
                BaseWizard.prototype.isFirstPage = function () {
                    return this._currentPage() && this._currentPage().pageId == this.iterator.getNextPageId();
                };
                BaseWizard.prototype.canNext = function () {
                    return !this.isLoading() && this._currentPage() && this.pageFactory.getMetadata(this._currentPage().pageId).canNext(this._currentPage().page);
                };
                BaseWizard.prototype.canFinish = function () {
                    return !this.isLoading() && this._currentPage() && this.pageFactory.getMetadata(this._currentPage().pageId).canFinish(this._currentPage().page);
                };
                BaseWizard.prototype._initPage = function (page) {
                    this.events.call("beforePageInitialize", Internal._createBeforeInitializePageEventArgs(page, this));
                    this._createLoadingState(page.page);
                    this._createNextAction(page.page);
                    return page.initialize(this.stateManager.getPageState(page.pageId));
                };
                BaseWizard.prototype.start = function () {
                    var _this = this;
                    this.events.call("beforeStart", { wizard: this });
                    this._loadingState(true);
                    var startPage = this.iterator._getStartPage();
                    this._initPage(startPage).done(function () {
                        _this._currentPage(startPage);
                        _this.events.call("afterPageInitialize", Internal._createPageEventArgs(startPage, _this));
                    }).always(function () { return _this._loadingState(false); }).fail(function () {
                        _this.isVisible(false);
                    });
                };
                BaseWizard.prototype.canRunWizard = function () {
                    return true;
                };
                BaseWizard.prototype.nextAction = function () {
                    var _this = this;
                    if (!this.canNext())
                        return;
                    var currentPage = this.iterator._getCurrentPage();
                    this._loadingState(true);
                    var revertPreviosPage = function () { return _this.iterator._getPreviousPage().always(function () {
                        _this.iterator._resetPages();
                        _this._loadingState(false);
                    }); };
                    currentPage.commit().done(function (result) {
                        if (currentPage.isChanged)
                            _this.stateManager.setPageState(currentPage.pageId, result);
                        _this.iterator._getNextPage().done(function (page) {
                            if (page) {
                                _this._initPage(page).done(function () {
                                    _this._currentPage(page);
                                    _this.events.call("afterPageInitialize", Internal._createPageEventArgs(page, _this));
                                    _this._loadingState(false);
                                }).fail(function () { return revertPreviosPage(); });
                            }
                            else
                                revertPreviosPage();
                        }).fail(function () { return _this._loadingState(false); });
                    }).fail(function () { return _this._loadingState(false); });
                };
                BaseWizard.prototype.previousAction = function () {
                    var _this = this;
                    if (this.isFirstPage())
                        return;
                    this._loadingState(true);
                    this.iterator._getPreviousPage().done(function (page) {
                        if (page) {
                            _this._currentPage(page);
                        }
                    }).always(function () { return _this._loadingState(false); });
                };
                BaseWizard.prototype.goToPage = function (pageId) {
                    var _this = this;
                    this._loadingState(true);
                    this.iterator._goToPage(pageId).done(function (page) {
                        if (page) {
                            _this._currentPage(page);
                        }
                    }).always(function () { return _this._loadingState(false); });
                };
                BaseWizard.prototype.finishAction = function () {
                    var _this = this;
                    if (!this.canFinish())
                        return;
                    this._loadingState(true);
                    var currentPage = this.iterator._getCurrentPage();
                    currentPage.commit().done(function (result) {
                        _this.stateManager.setPageState(currentPage.pageId, result);
                        _this.iterator._resetPages();
                        if (_this._finishCallback) {
                            var currentState = _this.stateManager.getCurrentState();
                            _this._callBeforeFinishHandler(currentState);
                            _this._finishCallback(currentState)
                                .done(function (result) {
                                _this.onFinish();
                                _this._callAfterFinishHandler(currentState, result);
                                _this.isVisible(false);
                            })
                                .always(function () {
                                _this._loadingState(false);
                            });
                        }
                        else {
                            _this._loadingState(false);
                            _this.isVisible(false);
                        }
                    });
                };
                BaseWizard.__loadingStateFunctionName = "__loadingState";
                BaseWizard.__nextActionFunctionName = "__nextAction";
                return BaseWizard;
            }(Analytics.Utils.Disposable));
            Wizard.BaseWizard = BaseWizard;
            var Internal;
            (function (Internal) {
                var WrappedWizardPageSection = (function (_super) {
                    __extends(WrappedWizardPageSection, _super);
                    function WrappedWizardPageSection(pageId, page, metadata) {
                        var _this = _super.call(this, pageId, page, metadata.template, metadata.description) || this;
                        _this.pageId = pageId;
                        _this.page = page;
                        if (page.onChange) {
                            _this.onChange = function (callback) {
                                page.onChange(function () {
                                    callback();
                                    metadata.onChange && metadata.onChange();
                                });
                            };
                        }
                        return _this;
                    }
                    return WrappedWizardPageSection;
                }(_WrappedWizardPage));
                Internal.WrappedWizardPageSection = WrappedWizardPageSection;
                var WizardPageSection = (function () {
                    function WizardPageSection(pageId, metadata) {
                        this.pageId = pageId;
                        this.metadata = metadata;
                        this.page = ko.observable(null);
                    }
                    WizardPageSection.prototype.resetPage = function () {
                        this.page() && this.page().dispose();
                        this.page(null);
                    };
                    WizardPageSection.prototype.setPage = function (page) {
                        if (this.page() !== page)
                            this.page(page);
                    };
                    return WizardPageSection;
                }());
                Internal.WizardPageSection = WizardPageSection;
                var WizardPageSectionIterator = (function () {
                    function WizardPageSectionIterator(pageFactory, stateManager, _resetPageCallback) {
                        this.pageFactory = pageFactory;
                        this.stateManager = stateManager;
                        this._resetPageCallback = _resetPageCallback;
                        this._pagesIds = [];
                        this._pages = [];
                    }
                    WizardPageSectionIterator.prototype._resetPages = function (fromIndex, resetPage) {
                        var _this = this;
                        if (resetPage === void 0) { resetPage = function (pageId) { return _this._resetPage(pageId); }; }
                        if (fromIndex < this._pagesIds.length) {
                            for (var index = this._pagesIds.length - 1; index >= fromIndex; index--) {
                                this._pagesIds[index].forEach(function (pageId) { return resetPage(pageId); });
                                this._pagesIds.splice(index, 1);
                            }
                        }
                    };
                    WizardPageSectionIterator.prototype._tryResetPageByMetadata = function (pageId) {
                        if (this.pageFactory.getMetadata(pageId)["recreate"]) {
                            this._resetPage(pageId);
                            return true;
                        }
                        return false;
                    };
                    WizardPageSectionIterator.prototype._resetPage = function (pageId) {
                        this.stateManager.resetPageState(pageId);
                        this._resetPageCallback(pageId);
                        var page = this._getPage(pageId);
                        if (page) {
                            page.dispose();
                            this._pages.splice(this._pages.indexOf(page), 1);
                        }
                    };
                    WizardPageSectionIterator.prototype._createNewPage = function (nextPageId) {
                        var pageMetadata = this.pageFactory.getMetadata(nextPageId);
                        return new WrappedWizardPageSection(nextPageId, pageMetadata.create(), pageMetadata);
                    };
                    WizardPageSectionIterator.prototype._getPage = function (pageId) {
                        return this._pages.filter(function (x) { return x.pageId === pageId; })[0];
                    };
                    WizardPageSectionIterator.prototype._getNextPage = function (nextPageIds) {
                        var _this = this;
                        return $.Deferred().resolve(nextPageIds.map(function (nextPageId) {
                            var page = _this._getPage(nextPageId);
                            if (!page || _this._tryResetPageByMetadata(nextPageId)) {
                                page = _this._createNewPage(nextPageId);
                                _this._pages.push(page);
                            }
                            return page;
                        })).promise();
                    };
                    WizardPageSectionIterator.prototype._getPageIndex = function (pageId) {
                        return this._pagesIds.indexOf(this._pagesIds.filter(function (x) { return x.some(function (y) { return y === pageId; }); })[0]);
                    };
                    WizardPageSectionIterator.prototype.resetNextPages = function (pageId) {
                        this._resetPages(this._getPageIndex(pageId) + 1);
                    };
                    WizardPageSectionIterator.prototype.getStartPage = function () {
                        var startPageId = this.getNextPageId();
                        var pageMetadata = this.pageFactory.getMetadata(startPageId);
                        var page = new WrappedWizardPageSection(startPageId, pageMetadata.create(), pageMetadata);
                        this._pagesIds.push([startPageId]);
                        return page;
                    };
                    WizardPageSectionIterator.prototype.getNextPage = function (currentPageId) {
                        var _this = this;
                        var index = this._getPageIndex(currentPageId);
                        var nextPageIds = this.getNextPageId(currentPageId);
                        if (!nextPageIds) {
                            this.resetNextPages(currentPageId);
                            return $.Deferred().reject().promise();
                        }
                        if (!nextPageIds["push"]) {
                            nextPageIds = [nextPageIds];
                        }
                        if (JSON.stringify(this._pagesIds[index + 1]) !== JSON.stringify(nextPageIds)) {
                            this._resetPages(index + 1, function (pageId) {
                                if (nextPageIds.indexOf(pageId) === -1) {
                                    _this._resetPage(pageId);
                                }
                            });
                            this._pagesIds.push(nextPageIds);
                        }
                        return this._getNextPage(nextPageIds);
                    };
                    WizardPageSectionIterator.prototype.getCurrentState = function () {
                        return this.stateManager.getCurrentState();
                    };
                    WizardPageSectionIterator.prototype.getNextPageId = function (pageId) {
                        return "";
                    };
                    return WizardPageSectionIterator;
                }());
                Internal.WizardPageSectionIterator = WizardPageSectionIterator;
                var WizardPageSectionFactory = (function (_super) {
                    __extends(WizardPageSectionFactory, _super);
                    function WizardPageSectionFactory() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    WizardPageSectionFactory.prototype.registerMetadata = function (pageId, metadata) {
                        _super.prototype.registerMetadata.call(this, pageId, metadata);
                        if (metadata.position === undefined)
                            metadata.position = Object.keys(this.metadata).length - 1;
                        if (metadata.recreate === undefined)
                            metadata.recreate = false;
                        if (metadata.disabledText === undefined)
                            metadata.disabledText = "";
                    };
                    return WizardPageSectionFactory;
                }(Wizard.PageFactory));
                Internal.WizardPageSectionFactory = WizardPageSectionFactory;
                var WizardPageProcessor = (function (_super) {
                    __extends(WizardPageProcessor, _super);
                    function WizardPageProcessor(pageFactory, _loadingState, _nextAction) {
                        var _this = _super.call(this) || this;
                        _this.pageFactory = pageFactory;
                        _this.events = new Analytics.Utils.EventManager();
                        _this._loadingTimeout = null;
                        _this._changeTimeout = null;
                        _this.sections = [];
                        _this.isLoading = ko.observable(false);
                        if (_loadingState)
                            _this._loadingState = _loadingState;
                        if (_nextAction)
                            _this._extendedNextAction = _nextAction;
                        _this._disposables.push(_this.events);
                        return _this;
                    }
                    WizardPageProcessor.prototype.dispose = function () {
                        _super.prototype.dispose.call(this);
                        this.sections.forEach(function (x) { return x.resetPage(); });
                        this.sections = [];
                    };
                    WizardPageProcessor.prototype._createLoadingState = function (page) {
                        var _this = this;
                        if (!page[WizardPageProcessor.__loadingStateFunctionName]) {
                            page[WizardPageProcessor.__loadingStateFunctionName] = function (newVal) { return _this._loadingState(newVal); };
                        }
                    };
                    WizardPageProcessor.prototype._createNextAction = function (page) {
                        var _this = this;
                        if (!page[BaseWizard.__nextActionFunctionName])
                            page[BaseWizard.__nextActionFunctionName] = function () { return _this._extendedNextAction(); };
                    };
                    WizardPageProcessor.prototype._loadingState = function (active) {
                        var _this = this;
                        if (active) {
                            this._loadingTimeout && clearTimeout(this._loadingTimeout);
                            this._loadingTimeout = setTimeout(function () {
                                _this.isLoading(true);
                            }, 100);
                        }
                        else {
                            this._loadingTimeout && clearTimeout(this._loadingTimeout);
                            this.isLoading(false);
                        }
                    };
                    WizardPageProcessor.prototype._extendedNextAction = function () { };
                    WizardPageProcessor.prototype._resetPageById = function (pageId) {
                        var page = this.getPageById(pageId);
                        page.resetPage();
                    };
                    WizardPageProcessor.prototype.initialize = function (state, createIterator) {
                        var _this = this;
                        if (createIterator === void 0) { createIterator = function (pageFactory, stateManager) { return new WizardPageSectionIterator(pageFactory, stateManager, function (pageId) { return _this._resetPageById(pageId); }); }; }
                        this.events.call("beforeInitialize", { wizard: this, state: state });
                        this.stateManager = new StateManager(state, this.pageFactory);
                        this.iterator = createIterator(this.pageFactory, this.stateManager);
                        this.sections = [];
                        Object.keys(this.pageFactory.metadata).forEach(function (key) {
                            _this.sections.push(new WizardPageSection(key, _this.pageFactory.metadata[key]));
                        });
                        this.sections = this.sections.sort(function (a, b) { return a.metadata.position - b.metadata.position; });
                        this.events.call("afterInitialize", { wizard: this });
                    };
                    WizardPageProcessor.prototype._canNext = function (currentPage) {
                        return !this.isLoading() && currentPage && this.pageFactory.getMetadata(currentPage.pageId).canNext(currentPage.page);
                    };
                    WizardPageProcessor.prototype._canFinish = function (currentPage) {
                        return !this.isLoading() && currentPage && this.pageFactory.getMetadata(currentPage.pageId).canFinish(currentPage.page);
                    };
                    WizardPageProcessor.prototype._initPage = function (page, force) {
                        var _this = this;
                        if (force === void 0) { force = false; }
                        this._createNextAction(page.page);
                        if (page.onChange) {
                            page.onChange(function () {
                                _this._changeTimeout && clearTimeout(_this._changeTimeout);
                                _this._changeTimeout = setTimeout(function () {
                                    _this._nextAction(page);
                                }, 100);
                            });
                        }
                        else
                            throw Error("Page with id " + page.pageId + " cannot be used in AutoNavigation, because it does not have method OnChange");
                        return page.initialize(this.stateManager.getPageState(page.pageId), force).always(function () { return _this._loadingState(false); });
                    };
                    WizardPageProcessor.prototype.getPageById = function (pageId) {
                        return this.sections.filter(function (x) { return x.pageId === pageId; })[0];
                    };
                    WizardPageProcessor.prototype.start = function () {
                        var _this = this;
                        this.events.call("beforeStart", { wizard: this });
                        this._loadingState(true);
                        var page = this.iterator.getStartPage();
                        this.events.call("beforePageInitialize", Internal._createBeforeInitializePageEventArgs(page, this));
                        this._initPage(page).done(function () {
                            _this.getPageById(page.pageId).setPage(page);
                            _this.events.call("afterPageInitialize", Internal._createPageEventArgs(page, _this));
                            _this._nextAction(page);
                        });
                    };
                    WizardPageProcessor.prototype.finishAction = function () {
                        var _this = this;
                        var deferred = $.Deferred();
                        var resolved = false;
                        for (var i = this.sections.length - 1; i >= 0; i--) {
                            if (this.sections[i].page()) {
                                this.sections[i].page().commit().done(function (result) {
                                    if (_this.sections[i].page().isChanged) {
                                        _this.events.call("beforeFinish", { wizardModel: _this, state: _this.stateManager.getCurrentState() });
                                        _this.stateManager.setPageState(_this.sections[i].page().pageId, result);
                                        _this.events.call("afterFinish", { wizardResult: _this, state: _this.stateManager.getCurrentState() });
                                    }
                                }).always(function () { return deferred.resolve(); });
                                resolved = true;
                                break;
                            }
                        }
                        if (!resolved)
                            deferred.resolve();
                        return deferred.promise();
                    };
                    WizardPageProcessor.prototype._nextAction = function (currentPage, parentIsChanged) {
                        var _this = this;
                        if (parentIsChanged === void 0) { parentIsChanged = false; }
                        if (!this._canNext(currentPage) && !this._canFinish(currentPage)) {
                            currentPage.resetCommitedState();
                            return this.iterator.resetNextPages(currentPage.pageId);
                        }
                        this._loadingState(true);
                        currentPage.commit().done(function (result) {
                            if (currentPage.isChanged || parentIsChanged) {
                                _this.stateManager.setPageState(currentPage.pageId, result);
                                _this.iterator.getNextPage(currentPage.pageId).done(function (pages) {
                                    if (pages && pages.length > 0) {
                                        pages.forEach(function (page) {
                                            var containedPage = _this.getPageById(page.pageId);
                                            var page = containedPage && containedPage.page() || page;
                                            _this.events.call("beforePageInitialize", Internal._createBeforeInitializePageEventArgs(page, _this));
                                            _this._initPage(page, !!containedPage.page()).done(function () {
                                                _this.getPageById(page.pageId).setPage(page);
                                                _this.events.call("afterPageInitialize", Internal._createPageEventArgs(page, _this));
                                                _this._nextAction(page, currentPage.isChanged);
                                            });
                                        });
                                    }
                                    else
                                        _this._loadingState(false);
                                    currentPage.isChanged = false;
                                }).fail(function () { return _this._loadingState(false); });
                            }
                            else
                                _this._loadingState(false);
                        }).fail(function () { return _this._loadingState(false); });
                    };
                    WizardPageProcessor.__loadingStateFunctionName = "__loadingState";
                    return WizardPageProcessor;
                }(Analytics.Utils.Disposable));
                Internal.WizardPageProcessor = WizardPageProcessor;
            })(Internal = Wizard.Internal || (Wizard.Internal = {}));
            var PopupWizard = (function (_super) {
                __extends(PopupWizard, _super);
                function PopupWizard(pageFactory, finishCallback) {
                    var _this = _super.call(this, pageFactory, finishCallback) || this;
                    _this.height = ko.observable(505);
                    _this.width = ko.observable(690);
                    _this._extendCssClass = "";
                    _this._container = Analytics.Internal.getParentContainer;
                    _this.nextButton = {
                        text: Analytics.Utils.getLocalization("Next", "AnalyticsCoreStringId.Wizard_Next"),
                        disabled: ko.computed(function () { return !_this.canNext(); }),
                        onClick: function () { return _this.nextAction(); }
                    };
                    _this.cancelButton = {
                        text: Analytics.Utils.getLocalization("Cancel", "AnalyticsCoreStringId.SearchDialog_Cancel"),
                        onClick: function () { return _this.isVisible(false); }
                    };
                    _this.previousButton = {
                        text: Analytics.Utils.getLocalization("Previous", "AnalyticsCoreStringId.Wizard_Previous"),
                        disabled: ko.computed(function () { return _this.isFirstPage(); }),
                        onClick: function () { return _this.previousAction(); }
                    };
                    _this.finishButton = {
                        text: Analytics.Utils.getLocalization("Finish", "AnalyticsCoreStringId.Wizard_Finish"),
                        disabled: ko.computed(function () {
                            return !_this.canFinish();
                        }),
                        onClick: function () { return _this.finishAction(); }
                    };
                    _this._titleTemplate = DevExpress.Analytics.Widgets.Internal.getTemplate('dx-wizard-headerNew');
                    _this.title = "Popup Wizard";
                    return _this;
                }
                PopupWizard._getLoadPanelViewModel = function (element, observableVisible) {
                    var $container = $(element).closest('.dxrd-wizard-content');
                    return {
                        animation: {
                            show: { type: 'fade', from: 0, to: 1, duration: 700 },
                            hide: { type: 'fade', from: 1, to: 0, duration: 700 }
                        },
                        deferRendering: false,
                        message: DevExpress.Analytics.Utils.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading'),
                        visible: observableVisible,
                        shading: true,
                        shadingColor: 'transparent',
                        position: { of: $container },
                        container: $container
                    };
                };
                PopupWizard.prototype.start = function () {
                    _super.prototype.start.call(this);
                    this.isVisible(true);
                };
                PopupWizard.prototype._wizardPopupPosition = function (element) {
                    return {
                        of: Analytics.Internal.getParentContainer(element)
                    };
                };
                PopupWizard.prototype._loadPanelViewModel = function (element) {
                    return this._getLoadPanelViewModel(element, this.isLoading);
                };
                PopupWizard.prototype._getLoadPanelViewModel = function (element, observableVisible) {
                    return PopupWizard._getLoadPanelViewModel(element, observableVisible);
                };
                return PopupWizard;
            }(BaseWizard));
            Wizard.PopupWizard = PopupWizard;
            var _DataSourceWizardOptionsBase = (function () {
                function _DataSourceWizardOptionsBase() {
                    this.connectionStrings = {
                        json: ko.observableArray([]),
                        sql: ko.observableArray([])
                    };
                    this.callbacks = {};
                    this.rtl = false;
                    this.disableCustomSql = false;
                    this.wizardSettings = new DataSourceWizardSettings().createDefault();
                    this.canCreateNewJsonDataSource = false;
                }
                Object.defineProperty(_DataSourceWizardOptionsBase.prototype, "jsonDataSourceAvailable", {
                    get: function () {
                        return this.wizardSettings.enableJsonDataSource && (this.canCreateNewJsonDataSource || (ko.unwrap(this.connectionStrings.json) || []).length > 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(_DataSourceWizardOptionsBase.prototype, "sqlDataSourceAvailable", {
                    get: function () {
                        return this.wizardSettings.enableSqlDataSource && (ko.unwrap(this.connectionStrings.sql) || []).length > 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                return _DataSourceWizardOptionsBase;
            }());
            Wizard._DataSourceWizardOptionsBase = _DataSourceWizardOptionsBase;
            var _DataSourceWizardOptions = (function (_super) {
                __extends(_DataSourceWizardOptions, _super);
                function _DataSourceWizardOptions() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _DataSourceWizardOptions;
            }(_DataSourceWizardOptionsBase));
            Wizard._DataSourceWizardOptions = _DataSourceWizardOptions;
            var DataSourceWizardSettings = (function () {
                function DataSourceWizardSettings() {
                }
                DataSourceWizardSettings.prototype.createDefault = function (settings) {
                    var newSettings = { enableJsonDataSource: true, enableSqlDataSource: true };
                    if (!settings)
                        return newSettings;
                    if (settings.enableJsonDataSource !== undefined)
                        newSettings.enableJsonDataSource = settings.enableJsonDataSource;
                    if (settings.enableSqlDataSource !== undefined)
                        newSettings.enableSqlDataSource = settings.enableSqlDataSource;
                    return newSettings;
                };
                return DataSourceWizardSettings;
            }());
            Wizard.DataSourceWizardSettings = DataSourceWizardSettings;
            var DataSourceWizardPageIterator = (function (_super) {
                __extends(DataSourceWizardPageIterator, _super);
                function DataSourceWizardPageIterator(pageFactory, stateManager, _dataSourceWizardOptions) {
                    var _this = _super.call(this, pageFactory, stateManager) || this;
                    _this._dataSourceWizardOptions = _dataSourceWizardOptions;
                    return _this;
                }
                DataSourceWizardPageIterator.prototype.getNextPageId = function (pageId) {
                    if (!pageId && this._dataSourceWizardOptions.jsonDataSourceAvailable && this._dataSourceWizardOptions.sqlDataSourceAvailable) {
                        return Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage;
                    }
                    else if (!pageId) {
                        return this.getNextPageId(Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage);
                    }
                    else if (pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
                        return Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage;
                    }
                    else if (pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json && this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage;
                    }
                    else if (this._dataSourceWizardOptions.canCreateNewJsonDataSource && pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage;
                    }
                    else if (pageId === Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().jsonDataSourceWizard.connectionName) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
                    }
                    else if (this._dataSourceWizardOptions.canCreateNewJsonDataSource && pageId === Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage && !this._getCurrentState().jsonDataSourceWizard.connectionName) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage;
                    }
                    else if (pageId === Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
                    }
                    else if (pageId === Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().sqlDataSourceWizard.name) {
                        return Wizard.SqlDataSourceWizardPageId.ConfigureQueryPage;
                    }
                    else if (pageId === Wizard.SqlDataSourceWizardPageId.ConfigureQueryPage && this._getCurrentState().sqlDataSourceWizard.sqlDataSourceJSON) {
                        return Wizard.SqlDataSourceWizardPageId.ConfigureParametersPage;
                    }
                };
                return DataSourceWizardPageIterator;
            }(PageIterator));
            Wizard.DataSourceWizardPageIterator = DataSourceWizardPageIterator;
            var DataSourceWizard = (function (_super) {
                __extends(DataSourceWizard, _super);
                function DataSourceWizard(pageFactory, _wizardOptions) {
                    var _this = _super.call(this, pageFactory, _wizardOptions.callbacks.finishCallback) || this;
                    _this._wizardOptions = _wizardOptions;
                    _this._extendCssClass = "dxrd-sqldatasource-wizard";
                    _this.title = Analytics.Utils.getLocalization("Data Source Wizard", "AnalyticsCoreStringId.DSWizard_Title");
                    return _this;
                }
                DataSourceWizard.prototype.initialize = function (state, createIterator) {
                    var _this = this;
                    if (createIterator === void 0) { createIterator = function (pageFactory, stateManager) { return new DataSourceWizardPageIterator(pageFactory, stateManager, _this._wizardOptions); }; }
                    if (this._wizardOptions.sqlDataSourceAvailable || !Analytics.Internal.isEmptyObject(state.sqlDataSourceWizard)) {
                        state.dataSourceType = DataSourceType.Sql;
                    }
                    else if (this._wizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
                        state.dataSourceType = DataSourceType.Json;
                    }
                    _super.prototype.initialize.call(this, state, createIterator);
                };
                DataSourceWizard.prototype.canRunWizard = function () {
                    return this._wizardOptions.jsonDataSourceAvailable || this._wizardOptions.sqlDataSourceAvailable;
                };
                return DataSourceWizard;
            }(PopupWizard));
            Wizard.DataSourceWizard = DataSourceWizard;
            function _registerSqlDataSourceWizardPages(factory, dataSourceWizardOptions) {
                if (factory === void 0) { factory = new PageFactory(); }
                _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions);
                _registerChooseJsonSourcePage(factory);
                _registerChooseJsonConnectionPage(factory, dataSourceWizardOptions);
                _registerChooseJsonSchemaPage(factory, dataSourceWizardOptions.requestWrapper);
                _registerConfigureQueryPage(factory, dataSourceWizardOptions);
                _registerChooseSqlConnectionPage(factory, dataSourceWizardOptions.connectionStrings.sql);
                _registerConfigureParametersPage(factory, dataSourceWizardOptions.requestWrapper);
                return factory;
            }
            Wizard._registerSqlDataSourceWizardPages = _registerSqlDataSourceWizardPages;
            function _createSqlDataSourceWizard(factory, dataSourceWizardOptions) {
                if (factory === void 0) { factory = new PageFactory(); }
                factory = _registerSqlDataSourceWizardPages(factory, dataSourceWizardOptions);
                return new DataSourceWizard(factory, dataSourceWizardOptions);
            }
            Wizard._createSqlDataSourceWizard = _createSqlDataSourceWizard;
            var _MultiQueryDataSourceWizardOptions = (function (_super) {
                __extends(_MultiQueryDataSourceWizardOptions, _super);
                function _MultiQueryDataSourceWizardOptions() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _MultiQueryDataSourceWizardOptions;
            }(_DataSourceWizardOptionsBase));
            Wizard._MultiQueryDataSourceWizardOptions = _MultiQueryDataSourceWizardOptions;
            var MultiQueryDataSourceWizard = (function (_super) {
                __extends(MultiQueryDataSourceWizard, _super);
                function MultiQueryDataSourceWizard(pageFactory, _wizardOptions) {
                    var _this = _super.call(this, pageFactory, _wizardOptions.callbacks.finishCallback) || this;
                    _this._wizardOptions = _wizardOptions;
                    _this.title = Analytics.Utils.getLocalization("Data Source Wizard", "AnalyticsCoreStringId.SqlDSWizard_Title");
                    _this._extendCssClass = "dxrd-multiqueries-sqldatasource-wizard";
                    _this.height(443);
                    return _this;
                }
                MultiQueryDataSourceWizard.prototype.canRunWizard = function () {
                    return this._wizardOptions.jsonDataSourceAvailable || this._wizardOptions.sqlDataSourceAvailable;
                };
                MultiQueryDataSourceWizard.prototype.initialize = function (state, createIterator) {
                    var _this = this;
                    if (createIterator === void 0) { createIterator = function (pageFactory, stateManager) { return new MultiQueryDataSourceWizardPageIterator(pageFactory, stateManager, _this._wizardOptions); }; }
                    if (this._wizardOptions.sqlDataSourceAvailable || !Analytics.Internal.isEmptyObject(state.sqlDataSourceWizard)) {
                        state.dataSourceType = DataSourceType.Sql;
                    }
                    else if (this._wizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
                        state.dataSourceType = DataSourceType.Json;
                    }
                    _super.prototype.initialize.call(this, state, createIterator);
                };
                return MultiQueryDataSourceWizard;
            }(PopupWizard));
            Wizard.MultiQueryDataSourceWizard = MultiQueryDataSourceWizard;
            var MultiQueryDataSourceWizardPageIterator = (function (_super) {
                __extends(MultiQueryDataSourceWizardPageIterator, _super);
                function MultiQueryDataSourceWizardPageIterator(pagesFactory, stateManager, _wizardOptions) {
                    var _this = _super.call(this, pagesFactory, stateManager) || this;
                    _this._wizardOptions = _wizardOptions;
                    return _this;
                }
                MultiQueryDataSourceWizardPageIterator.prototype.getNextPageId = function (pageId) {
                    if (!pageId && this._wizardOptions.jsonDataSourceAvailable && this._wizardOptions.sqlDataSourceAvailable) {
                        return Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage;
                    }
                    else if (!pageId) {
                        return this.getNextPageId(Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage);
                    }
                    else if (pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Sql) {
                        return Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage;
                    }
                    else if (pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json && this._wizardOptions.connectionStrings.json().length > 0) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage;
                    }
                    else if (this._wizardOptions.canCreateNewJsonDataSource && pageId === Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === DataSourceType.Json) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage;
                    }
                    else if (pageId === Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().jsonDataSourceWizard.connectionName) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
                    }
                    else if (this._wizardOptions.canCreateNewJsonDataSource && pageId === Wizard.JsonDataSourceWizardPageId.ChooseConnectionPage && !this._getCurrentState().jsonDataSourceWizard.connectionName) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage;
                    }
                    else if (pageId === Wizard.JsonDataSourceWizardPageId.ChooseJsonSourcePage) {
                        return Wizard.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
                    }
                    else if (pageId === Wizard.SqlDataSourceWizardPageId.ChooseConnectionPage && this._getCurrentState().sqlDataSourceWizard.name) {
                        return Wizard.SqlDataSourceWizardPageId.MultiQueryConfigurePage;
                    }
                    else if (this._getCurrentState().sqlDataSourceWizard.sqlDataSourceJSON && pageId === Wizard.SqlDataSourceWizardPageId.MultiQueryConfigurePage && this._getCurrentState().sqlDataSourceWizard.customQueries.length > 0) {
                        return Wizard.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage;
                    }
                    else if (pageId === Wizard.SqlDataSourceWizardPageId.MultiQueryConfigurePage || pageId === Wizard.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage) {
                        var sqlDataSourceWrapped = Wizard._restoreSqlDataSourceFromState(this._getCurrentState().sqlDataSourceWizard);
                        if (sqlDataSourceWrapped.sqlDataSource.queries().length > 1) {
                            return Wizard.DataSourceWizardPageId.ConfigureMasterDetailRelationshipsPage;
                        }
                    }
                };
                return MultiQueryDataSourceWizardPageIterator;
            }(PageIterator));
            Wizard.MultiQueryDataSourceWizardPageIterator = MultiQueryDataSourceWizardPageIterator;
            function _registerMultiQueryDataSourcePages(factory, dataSourceWizardOptions) {
                if (factory === void 0) { factory = new PageFactory(); }
                _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions);
                _registerChooseJsonConnectionPage(factory, dataSourceWizardOptions);
                _registerChooseJsonSourcePage(factory);
                _registerChooseJsonSchemaPage(factory, dataSourceWizardOptions.requestWrapper);
                _registerChooseSqlConnectionPage(factory, dataSourceWizardOptions.connectionStrings.sql);
                _registerMultiQueryConfigurePage(factory, dataSourceWizardOptions);
                _registerMultiQueryConfigureParametersPage(factory, dataSourceWizardOptions.requestWrapper);
                _registerConfigureMasterDetailRelationshipsPage(factory, QueryBuilder.Internal.wrapRebuildResultSchema(dataSourceWizardOptions.callbacks.sqlDataSourceResultSchema));
                return factory;
            }
            Wizard._registerMultiQueryDataSourcePages = _registerMultiQueryDataSourcePages;
            function _createMultiQueryDataSourceWizard(factory, dataSourceWizardOptions) {
                if (factory === void 0) { factory = new PageFactory(); }
                _registerMultiQueryDataSourcePages(factory, dataSourceWizardOptions);
                return new MultiQueryDataSourceWizard(factory, dataSourceWizardOptions);
            }
            Wizard._createMultiQueryDataSourceWizard = _createMultiQueryDataSourceWizard;
            var FullscreenWizardPageFactory = (function (_super) {
                __extends(FullscreenWizardPageFactory, _super);
                function FullscreenWizardPageFactory() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.metadata = {};
                    return _this;
                }
                FullscreenWizardPageFactory.prototype.registerMetadata = function (pageId, metadata) {
                    _super.prototype.registerMetadata.call(this, pageId, metadata);
                };
                FullscreenWizardPageFactory.prototype.getMetadata = function (key) {
                    return _super.prototype.getMetadata.call(this, key);
                };
                return FullscreenWizardPageFactory;
            }(Analytics.Wizard.PageFactory));
            Wizard.FullscreenWizardPageFactory = FullscreenWizardPageFactory;
            var WizardSectionPosition;
            (function (WizardSectionPosition) {
                WizardSectionPosition[WizardSectionPosition["Left"] = 1] = "Left";
                WizardSectionPosition[WizardSectionPosition["TopLeft"] = 2] = "TopLeft";
                WizardSectionPosition[WizardSectionPosition["BottomLeft"] = 3] = "BottomLeft";
                WizardSectionPosition[WizardSectionPosition["Right"] = 4] = "Right";
                WizardSectionPosition[WizardSectionPosition["TopRight"] = 5] = "TopRight";
                WizardSectionPosition[WizardSectionPosition["BottomRight"] = 6] = "BottomRight";
                WizardSectionPosition[WizardSectionPosition["Top"] = 7] = "Top";
                WizardSectionPosition[WizardSectionPosition["Bottom"] = 8] = "Bottom";
            })(WizardSectionPosition = Wizard.WizardSectionPosition || (Wizard.WizardSectionPosition = {}));
            var FullscreenWizardPage = (function (_super) {
                __extends(FullscreenWizardPage, _super);
                function FullscreenWizardPage() {
                    var _this = _super.call(this) || this;
                    _this._sectionsToUnregister = [];
                    _this._sectionsToRegister = [];
                    _this._sectionPositions = [];
                    _this._initInProgress = ko.observable(false);
                    _this._defaultMargin = 30;
                    _this._parentMarginOffset = _this._defaultMargin + _this._defaultMargin / 2;
                    _this._pageCss = {};
                    _this.events = new Analytics.Utils.EventManager();
                    _this._factory = new Analytics.Wizard.Internal.WizardPageSectionFactory();
                    _this._sectionsProcessor = new Analytics.Wizard.Internal.WizardPageProcessor(_this._factory, function (state) {
                        _this[BaseWizard.__loadingStateFunctionName] && _this[BaseWizard.__loadingStateFunctionName](state);
                    }, function () { return _this[BaseWizard.__nextActionFunctionName] && _this[BaseWizard.__nextActionFunctionName](); });
                    _this._sectionsProcessor.events.addHandler("beforeStart", function () {
                        _this._sections = _this._sectionsProcessor.sections;
                        _this._beforeStart();
                        _this._patchOnChange();
                    });
                    _this._sectionsProcessor.events.addHandler("beforePageInitialize", function (args) {
                        _this.events.call("beforeSectionInitialize", {
                            section: args.page,
                            sectionId: args.pageId,
                            page: _this,
                            state: args.state
                        });
                    });
                    _this._sectionsProcessor.events.addHandler("afterPageInitialize", function (args) {
                        _this.events.call("afterSectionInitialize", {
                            section: args.page,
                            sectionId: args.pageId,
                            page: _this
                        });
                    });
                    return _this;
                }
                FullscreenWizardPage.prototype.dispose = function () {
                    this._sectionsProcessor.dispose();
                    this._factory.reset();
                    this._sections = [];
                };
                FullscreenWizardPage.prototype._patchOnChange = function () {
                    var _this = this;
                    Object.keys(this._factory.metadata).forEach(function (key) {
                        _this._factory.metadata[key].onChange = function () { return _this._onChange(); };
                    });
                };
                FullscreenWizardPage.prototype._getPageStyle = function (position, isVisible) {
                    if (isVisible === void 0) { isVisible = true; }
                    var _clearStyle = "inherit";
                    var _defaultHalfMargin = "-" + (this._defaultMargin / 2) + "px";
                    var _fullSize = 100;
                    var _defaultSize = _fullSize / 2;
                    var _inPercent = function (size) {
                        return size + "%";
                    };
                    if (!position) {
                        return {
                            top: _defaultHalfMargin,
                            bottom: _defaultHalfMargin,
                            left: _defaultHalfMargin,
                            right: _defaultHalfMargin,
                            width: _clearStyle,
                            height: _clearStyle,
                            display: isVisible ? "block" : "none"
                        };
                    }
                    return {
                        top: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right || position === WizardSectionPosition.Top || position === WizardSectionPosition.TopLeft || position === WizardSectionPosition.TopRight) ? _defaultHalfMargin : _clearStyle,
                        bottom: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.BottomLeft || position === WizardSectionPosition.BottomRight) ? _defaultHalfMargin : _clearStyle,
                        left: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.Left || position === WizardSectionPosition.TopLeft || position === WizardSectionPosition.BottomLeft) ? _defaultHalfMargin : _clearStyle,
                        right: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom || position === WizardSectionPosition.Right || position === WizardSectionPosition.TopRight || position === WizardSectionPosition.BottomRight) ? _defaultHalfMargin : _clearStyle,
                        width: (position === WizardSectionPosition.Top || position === WizardSectionPosition.Bottom) ? _clearStyle : _inPercent(_defaultSize),
                        height: (position === WizardSectionPosition.Left || position === WizardSectionPosition.Right) ? _clearStyle : _inPercent(_defaultSize),
                        display: isVisible ? "block" : "none"
                    };
                };
                FullscreenWizardPage.prototype._applyCustomizations = function () {
                    this._sectionsToUnregister.forEach(function (x) { return x(); });
                    this._sectionsToUnregister = [];
                    this._sectionPositions.forEach(function (x) { return x(); });
                    this._sectionPositions = [];
                    this._sectionsToRegister.forEach(function (x) { return x(); });
                    this._sectionsToRegister = [];
                };
                FullscreenWizardPage.prototype._setSectionPosition = function (pageId, position) {
                    this._pageCss[pageId] = ko.observable(this._getPageStyle(position));
                };
                FullscreenWizardPage.prototype.registerSections = function () { };
                FullscreenWizardPage.prototype.canNext = function () {
                    return this._sectionsProcessor.sections.every(function (x) { return !x.page() || x.metadata.canNext(x.page().page); });
                };
                FullscreenWizardPage.prototype.canFinish = function () {
                    for (var i = this._sections.length - 1; i >= 0; i--) {
                        if (this._sections[i].page() && this._sections[i].metadata.canFinish(this._sections[i].page().page))
                            return true;
                    }
                    return false;
                };
                FullscreenWizardPage.prototype.setSectionPosition = function (sectionId, position) {
                    var _this = this;
                    this._sectionPositions.push(function () {
                        _this._setSectionPosition(sectionId, position);
                    });
                };
                FullscreenWizardPage.prototype.registerSection = function (sectionId, metadata) {
                    var _this = this;
                    this._sectionsToRegister.push(function () {
                        _this._factory.registerMetadata(sectionId, metadata);
                    });
                };
                FullscreenWizardPage.prototype.unregisterSection = function (sectionId) {
                    var _this = this;
                    this._sectionsToUnregister.push(function () { return _this._factory.unregisterMetadata(sectionId); });
                };
                FullscreenWizardPage.prototype._loadPanelViewModel = function (element) {
                    return false;
                };
                FullscreenWizardPage.prototype.getNextSectionId = function (sectionId) { return undefined; };
                FullscreenWizardPage.prototype.initialize = function (state) {
                    var _this = this;
                    this.registerSections();
                    this._applyCustomizations();
                    this._sectionsProcessor.initialize($.extend(true, {}, state));
                    this._stateManager = this._sectionsProcessor.stateManager;
                    this._sectionsProcessor.iterator.getNextPageId = function (pageId) { return _this.getNextSectionId(pageId); };
                    this._sectionsProcessor.start();
                    return $.Deferred().resolve().promise();
                };
                FullscreenWizardPage.prototype._beforeStart = function () { };
                FullscreenWizardPage.prototype.commit = function () {
                    var _this = this;
                    var deferred = $.Deferred();
                    this._sectionsProcessor.finishAction().done(function () {
                        deferred.resolve($.extend(true, {}, _this._stateManager.getCurrentState()));
                    });
                    return deferred.promise();
                };
                FullscreenWizardPage.prototype._getPageDescription = function (index, page) {
                    return (index + 1) + ". " + page.metadata.description;
                };
                FullscreenWizardPage.prototype._showPageDescription = function () {
                    return this._sections.length > 1;
                };
                return FullscreenWizardPage;
            }(Analytics.Wizard.WizardPageBase));
            Wizard.FullscreenWizardPage = FullscreenWizardPage;
            var SpecifyJsonDataSourceSettingsPage = (function (_super) {
                __extends(SpecifyJsonDataSourceSettingsPage, _super);
                function SpecifyJsonDataSourceSettingsPage(_dataSourceWizardOptions) {
                    var _this = _super.call(this) || this;
                    _this._dataSourceWizardOptions = _dataSourceWizardOptions;
                    return _this;
                }
                SpecifyJsonDataSourceSettingsPage.prototype.registerSections = function () {
                    if (this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
                        Analytics.Wizard._registerSpecifyJsonConnectionPage(this._factory, this._dataSourceWizardOptions.connectionStrings.json, this._dataSourceWizardOptions.canCreateNewJsonDataSource);
                        this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
                    }
                    if (this._dataSourceWizardOptions.canCreateNewJsonDataSource) {
                        if (this._dataSourceWizardOptions.connectionStrings.json().length === 0) {
                            Analytics.Wizard._registerChooseJsonSourcePage(this._factory);
                            this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Right : WizardSectionPosition.Left);
                            var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage);
                            meta["disabledText"] = Analytics.Utils.getLocalization("To create a data connection, select \"No, I'd like to create a new data connection\".", "AnalyticsCoreStringId.JsonDSWizard_CreateNewConnectionPage_Placeholder");
                        }
                    }
                    Analytics.Wizard._registerChooseJsonSchemaPage(this._factory, this._dataSourceWizardOptions.requestWrapper);
                    this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.Left : WizardSectionPosition.Right);
                    var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage);
                    meta["disabledText"] = Analytics.Utils.getLocalization("To select data fields, choose or create a data connection.", "AnalyticsCoreStringId.JsonDSWizard_ChooseJsonSchemaPage_Placeholder");
                };
                SpecifyJsonDataSourceSettingsPage.prototype.getNextSectionId = function (sectionId) {
                    if (!sectionId && this._dataSourceWizardOptions.connectionStrings.json().length > 0) {
                        return Analytics.Wizard.FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage;
                    }
                    else if (!sectionId) {
                        return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage;
                    }
                    else if (this._dataSourceWizardOptions.canCreateNewJsonDataSource) {
                        if (sectionId === Analytics.Wizard.FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage)
                            return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
                        else if (sectionId === Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage)
                            return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
                    }
                    else {
                        if (sectionId === Analytics.Wizard.FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage)
                            return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage;
                    }
                };
                return SpecifyJsonDataSourceSettingsPage;
            }(FullscreenWizardPage));
            Wizard.SpecifyJsonDataSourceSettingsPage = SpecifyJsonDataSourceSettingsPage;
            function _registerSpecifyJsonDataSourceSettingsPage(factory, dataSourceWizardOptions) {
                factory.registerMetadata(Wizard.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage, {
                    setState: function (data, state) {
                        state.jsonDataSourceWizard.connectionName = data.jsonDataSourceWizard.connectionName;
                        state.jsonDataSourceWizard.newConnectionName = data.jsonDataSourceWizard.newConnectionName;
                        state.jsonDataSourceWizard.jsonSource = data.jsonDataSourceWizard.jsonSource;
                        state.jsonDataSourceWizard.dataSourceName = data.jsonDataSourceWizard.dataSourceName;
                        state.jsonDataSourceWizard.jsonScheme = data.jsonDataSourceWizard.jsonScheme;
                        state.jsonDataSourceWizard.rootElement = data.jsonDataSourceWizard.rootElement;
                    },
                    getState: function (state) { return state; },
                    resetState: function (state, defaultState) {
                        state.jsonDataSourceWizard.connectionName = defaultState.jsonDataSourceWizard.connectionName;
                        state.jsonDataSourceWizard.jsonSource = defaultState.jsonDataSourceWizard.jsonSource;
                        state.jsonDataSourceWizard.dataSourceName = defaultState.jsonDataSourceWizard.dataSourceName;
                        state.jsonDataSourceWizard.newConnectionName = defaultState.jsonDataSourceWizard.newConnectionName;
                        state.jsonDataSourceWizard.jsonScheme = defaultState.jsonDataSourceWizard.jsonScheme;
                        state.jsonDataSourceWizard.rootElement = defaultState.jsonDataSourceWizard.rootElement;
                    },
                    create: function () {
                        return new SpecifyJsonDataSourceSettingsPage(dataSourceWizardOptions);
                    },
                    navigationPanelText: Analytics.Utils.getLocalization("Specify Data Source Settings", "AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage"),
                    template: "dx-wizard-fullscreen-page"
                });
            }
            Wizard._registerSpecifyJsonDataSourceSettingsPage = _registerSpecifyJsonDataSourceSettingsPage;
            var SpecifySqlDataSourceSettingsPage = (function (_super) {
                __extends(SpecifySqlDataSourceSettingsPage, _super);
                function SpecifySqlDataSourceSettingsPage(_dataSourceWizardOptions) {
                    var _this = _super.call(this) || this;
                    _this._dataSourceWizardOptions = _dataSourceWizardOptions;
                    return _this;
                }
                SpecifySqlDataSourceSettingsPage.prototype.getNextSectionId = function (sectionId) {
                    if (!sectionId)
                        return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage;
                    else if (sectionId === Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage && this._stateManager.getCurrentState().sqlDataSourceWizard.name) {
                        return Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryPage;
                    }
                    else if (sectionId === Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryPage) {
                        var sections = [];
                        if (this._stateManager.getCurrentState().sqlDataSourceWizard.customQueries.length > 0) {
                            sections.push(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage);
                        }
                        var sqlDataSourceWrapped = Analytics.Wizard._restoreSqlDataSourceFromState(this._stateManager.getCurrentState().sqlDataSourceWizard);
                        if (sqlDataSourceWrapped.sqlDataSource.queries().length > 1) {
                            sections.push(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage);
                        }
                        return sections;
                    }
                };
                SpecifySqlDataSourceSettingsPage.prototype.registerSections = function () {
                    Analytics.Wizard._registerChooseSqlConnectionPage(this._factory, this._dataSourceWizardOptions.connectionStrings.sql);
                    Analytics.Wizard._registerMultiQueryConfigurePage(this._factory, this._dataSourceWizardOptions);
                    Analytics.Wizard._registerConfigureMasterDetailRelationshipsPage(this._factory, QueryBuilder.Internal.wrapRebuildResultSchema(this._dataSourceWizardOptions.callbacks.sqlDataSourceResultSchema));
                    Analytics.Wizard._registerMultiQueryConfigureParametersPage(this._factory, this._dataSourceWizardOptions.requestWrapper);
                    var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage);
                    meta.description = Analytics.Utils.getLocalization("Choose a data connection.", "AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection");
                    var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryPage);
                    meta["recreate"] = true;
                    meta.description = Analytics.Utils.getLocalization("Choose predefined queries and/or create custom queries.", "AnalyticsCoreStringId.Wizard_Queries_Description");
                    var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage);
                    meta.description = Analytics.Utils.getLocalization("Configure master-detail relationships.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations");
                    meta["disabledText"] = Analytics.Utils.getLocalization("To create a master-detail relationship, select two or more queries.", "AnalyticsCoreStringId.Wizard_MasterDetailRelationship_Placeholder");
                    var meta = this._factory.getMetadata(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage);
                    meta.description = Analytics.Utils.getLocalization("Configure query parameters.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters");
                    meta["disabledText"] = Analytics.Utils.getLocalization("To specify query parameters, select a parameterized stored procedure or create a custom query.", "AnalyticsCoreStringId.Wizard_ConfigureQueryParameters_Placeholder");
                    this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.TopRight : WizardSectionPosition.TopLeft);
                    this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.TopLeft : WizardSectionPosition.TopRight);
                    this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.BottomLeft : WizardSectionPosition.BottomRight);
                    this._setSectionPosition(Analytics.Wizard.FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage, this._dataSourceWizardOptions.rtl ? WizardSectionPosition.BottomRight : WizardSectionPosition.BottomLeft);
                };
                return SpecifySqlDataSourceSettingsPage;
            }(FullscreenWizardPage));
            Wizard.SpecifySqlDataSourceSettingsPage = SpecifySqlDataSourceSettingsPage;
            function _registerSpecifySqlDataSourceSettingsPage(factory, dataSourceWizardOptions) {
                factory.registerMetadata(Wizard.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage, {
                    setState: function (data, state) {
                        state.sqlDataSourceWizard.customQueries = data.sqlDataSourceWizard.customQueries;
                        state.sqlDataSourceWizard.name = data.sqlDataSourceWizard.name;
                        state.sqlDataSourceWizard.queryName = data.sqlDataSourceWizard.name;
                        state.sqlDataSourceWizard.sqlDataSourceJSON = data.sqlDataSourceWizard.sqlDataSourceJSON;
                        state.sqlDataSourceWizard.relations = data.sqlDataSourceWizard.relations;
                    },
                    getState: function (state) { return state; },
                    resetState: function (state, defaulState) {
                        state.sqlDataSourceWizard = Analytics.Internal.extend(true, {}, defaulState);
                    },
                    create: function () {
                        return new SpecifySqlDataSourceSettingsPage(dataSourceWizardOptions);
                    },
                    navigationPanelText: Analytics.Utils.getLocalization("Specify Data Source Settings", "AnalyticsCoreStringId.Wizard_SpecifyDataSourceSettingsPage"),
                    template: "dx-wizard-fullscreen-page"
                });
            }
            Wizard._registerSpecifySqlDataSourceSettingsPage = _registerSpecifySqlDataSourceSettingsPage;
            var FullscreenWizard = (function (_super) {
                __extends(FullscreenWizard, _super);
                function FullscreenWizard(pageFactory, finishCallback) {
                    var _this = _super.call(this, pageFactory, finishCallback) || this;
                    _this._extendCssClass = "dx-wizard-fullscreen";
                    _this.navigationPanel = ko.observable(null);
                    _this.isVisible.subscribe(function (newValue) {
                        if (!newValue) {
                            _this.navigationPanel() && _this.navigationPanel().resetAll();
                            _this.navigationPanel() && _this.navigationPanel().dispose();
                            _this._onCloseCallback && _this._onCloseCallback();
                        }
                    });
                    return _this;
                }
                FullscreenWizard.prototype._onClose = function (callback) {
                    this._onCloseCallback = callback;
                };
                FullscreenWizard.prototype.onFinish = function () {
                    _super.prototype.onFinish.call(this);
                    this.navigationPanel().dispose();
                };
                FullscreenWizard.prototype._initPage = function (page) {
                    var _this = this;
                    if (page.onChange)
                        page.onChange(function () { return _this.navigationPanel()._resetNextPages(page.pageId); });
                    return _super.prototype._initPage.call(this, page);
                };
                FullscreenWizard.prototype._onResetPage = function (page) {
                    this.navigationPanel()._reset(page.pageId);
                };
                FullscreenWizard.prototype.start = function (finishCallback) {
                    if (finishCallback)
                        this["_finishCallback"] = finishCallback;
                    this.navigationPanel() && this.navigationPanel().resetAll();
                    this.navigationPanel() && this.navigationPanel().dispose();
                    this.navigationPanel(new WizardNavigationPanel(this));
                    _super.prototype.start.call(this);
                };
                FullscreenWizard.prototype._pageDescription = function () {
                    var currentStep = this.navigationPanel()._steps.filter(function (x) { return x.isActive(); })[0];
                    if (currentStep) {
                        return currentStep.text;
                    }
                    else {
                        return this.pageFactory.getMetadata(this._currentPage().pageId).description;
                    }
                };
                FullscreenWizard.prototype._description = function () {
                    return "";
                };
                return FullscreenWizard;
            }(Analytics.Wizard.PopupWizard));
            Wizard.FullscreenWizard = FullscreenWizard;
            var WizardNavigationPanel = (function (_super) {
                __extends(WizardNavigationPanel, _super);
                function WizardNavigationPanel(wizard) {
                    var _this = _super.call(this) || this;
                    _this._steps = [];
                    _this._disposables.push(wizard._currentPage.subscribe(function (newPage) {
                        var currentStep = _this._steps.filter(function (step) { return step.pageIds.some(function (x) { return x === newPage.pageId; }); })[0];
                        if (currentStep) {
                            currentStep.currentPageId = newPage.pageId;
                            currentStep.disabled(false);
                            _this._setStepVisible(currentStep.stepIndex);
                        }
                    }));
                    Object.keys(wizard.pageFactory.metadata).forEach(function (pageId) {
                        var item = wizard.pageFactory.metadata[pageId];
                        var navigationItem = _this._steps.filter(function (x) { return x.text === item.navigationPanelText; })[0];
                        if (navigationItem) {
                            navigationItem.pageIds.push(pageId);
                        }
                        else {
                            var navigationStep = {
                                text: item.navigationPanelText,
                                pageIds: [pageId],
                                currentPageId: null,
                                stepIndex: _this._steps.length,
                                disabled: ko.observable(true),
                                visible: ko.observable(true)
                            };
                            _this._disposables.push(navigationStep.isActive = ko.computed(function () {
                                return wizard._currentPage() && navigationStep.currentPageId === wizard._currentPage().pageId;
                            }));
                            navigationStep.clickAction = function () {
                                if (!navigationStep.isActive())
                                    wizard.goToPage(navigationStep.currentPageId);
                            };
                            _this._steps.push(navigationStep);
                        }
                    });
                    _this._disposables.push(_this.isVisible = ko.computed(function () {
                        return _this._steps.filter(function (step) { return step.visible(); }).length > 1;
                    }));
                    return _this;
                }
                WizardNavigationPanel.prototype.resetAll = function () {
                    this._steps.forEach(function (step) {
                        step.disabled(true);
                    });
                };
                WizardNavigationPanel.prototype._reset = function (pageId) {
                    this._steps.filter(function (x) { return x.currentPageId === pageId; })[0].disabled(true);
                };
                WizardNavigationPanel.prototype._resetNextPages = function (pageId) {
                    var currentStep = this._steps.filter(function (x) { return x.currentPageId === pageId; })[0];
                    if (!currentStep)
                        return;
                    for (var i = currentStep.stepIndex + 1; i < this._steps.length; i++) {
                        this._steps[i].disabled(true);
                    }
                };
                WizardNavigationPanel.prototype._setStepVisible = function (currentPageIndex) {
                    var previousSteps = this._steps.filter(function (_, index) { return index < currentPageIndex; });
                    if (previousSteps.length > 0 && !previousSteps.some(function (step) { return !step.disabled(); })) {
                        previousSteps.forEach(function (step) { return step.visible(false); });
                    }
                };
                return WizardNavigationPanel;
            }(Analytics.Utils.Disposable));
            Wizard.WizardNavigationPanel = WizardNavigationPanel;
            var FullscreenDataSourceWizard = (function (_super) {
                __extends(FullscreenDataSourceWizard, _super);
                function FullscreenDataSourceWizard(factory, _dataSourceWizardOptions) {
                    var _this = _super.call(this, factory, _dataSourceWizardOptions.callbacks.finishCallback) || this;
                    _this._dataSourceWizardOptions = _dataSourceWizardOptions;
                    return _this;
                }
                FullscreenDataSourceWizard.prototype.initialize = function (state, createIterator) {
                    var _this = this;
                    if (createIterator === void 0) { createIterator = function (pageFactory, stateManager) { return new FullscreenDataSourceWizardPageIterator(pageFactory, stateManager, _this._dataSourceWizardOptions, function (page) { return _this._onResetPage(page); }); }; }
                    if (this._dataSourceWizardOptions.sqlDataSourceAvailable || !Analytics.Internal.isEmptyObject(state.sqlDataSourceWizard)) {
                        state.dataSourceType = DataSourceType.Sql;
                    }
                    else if (this._dataSourceWizardOptions.jsonDataSourceAvailable || state.jsonDataSourceWizard.jsonSource) {
                        state.dataSourceType = DataSourceType.Json;
                    }
                    _super.prototype.initialize.call(this, state, createIterator);
                };
                FullscreenDataSourceWizard.prototype.canRunWizard = function () {
                    return this._dataSourceWizardOptions.jsonDataSourceAvailable || this._dataSourceWizardOptions.sqlDataSourceAvailable;
                };
                FullscreenDataSourceWizard.prototype._description = function () {
                    return Analytics.Utils.getLocalization("Data Source Wizard", "AnalyticsCoreStringId.DSWizard_Title");
                };
                return FullscreenDataSourceWizard;
            }(FullscreenWizard));
            Wizard.FullscreenDataSourceWizard = FullscreenDataSourceWizard;
            var FullscreenDataSourceWizardPageIterator = (function (_super) {
                __extends(FullscreenDataSourceWizardPageIterator, _super);
                function FullscreenDataSourceWizardPageIterator(factory, stateManager, _dataSourceOptions, onResetPage) {
                    var _this = _super.call(this, factory, stateManager, onResetPage) || this;
                    _this._dataSourceOptions = _dataSourceOptions;
                    return _this;
                }
                FullscreenDataSourceWizardPageIterator.prototype.getNextPageId = function (pageId) {
                    if (!pageId && this._dataSourceOptions.jsonDataSourceAvailable && this._dataSourceOptions.sqlDataSourceAvailable)
                        return Analytics.Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage;
                    else if (!pageId && this._dataSourceOptions.sqlDataSourceAvailable) {
                        return Wizard.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
                    }
                    else if (!pageId && this._dataSourceOptions.jsonDataSourceAvailable) {
                        return Wizard.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
                    }
                    else if (pageId === Analytics.Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === Analytics.Wizard.DataSourceType.Json) {
                        return Wizard.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage;
                    }
                    else if (pageId === Analytics.Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage && this._getCurrentState().dataSourceType === Analytics.Wizard.DataSourceType.Sql) {
                        return Wizard.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage;
                    }
                };
                return FullscreenDataSourceWizardPageIterator;
            }(PageIterator));
            Wizard.FullscreenDataSourceWizardPageIterator = FullscreenDataSourceWizardPageIterator;
            function _createDataSourceFullscreenWizard(dataSourceWizardOptions) {
                var factory = new FullscreenWizardPageFactory();
                Analytics.Wizard._registerChooseDataSourceTypePage(factory, dataSourceWizardOptions);
                factory.getMetadata(Analytics.Wizard.DataSourceWizardPageId.ChooseDataSourceTypePage).navigationPanelText = Analytics.Utils.getLocalization("Select Data Source Type", "AnalyticsCoreStringId.Wizard_SelectDataSourceType");
                _registerSpecifySqlDataSourceSettingsPage(factory, dataSourceWizardOptions);
                _registerSpecifyJsonDataSourceSettingsPage(factory, dataSourceWizardOptions);
                return new FullscreenDataSourceWizard(factory, dataSourceWizardOptions);
            }
            Wizard._createDataSourceFullscreenWizard = _createDataSourceFullscreenWizard;
            var Legacy;
            (function (Legacy) {
                var WizardPage = (function () {
                    function WizardPage(wizard, template, title, description) {
                        var _this = this;
                        this.template = template;
                        this.title = title;
                        this.description = description;
                        this.wizard = wizard;
                        this.isVisible = true;
                        this.actionCancel = new Internal.WizardAction(function () { _this.wizard.cancel(); }, Analytics.Utils.getLocalization("Cancel", "AnalyticsCoreStringId.SearchDialog_Cancel"));
                        this.actionPrevious = new Internal.WizardAction(function () { _this.wizard.goToPrevious(); }, Analytics.Utils.getLocalization("Previous", "AnalyticsCoreStringId.Wizard_Previous"));
                        this.actionNext = new Internal.WizardAction(function () { _this.wizard.goToNext(); }, Analytics.Utils.getLocalization("Next", "AnalyticsCoreStringId.Wizard_Next"));
                        this.actionFinish = new Internal.WizardAction(function () { _this.wizard.finish(); }, Analytics.Utils.getLocalization("Finish", "AnalyticsCoreStringId.Wizard_Finish"));
                    }
                    WizardPage.prototype._begin = function (data) {
                        this.isVisible = true;
                    };
                    WizardPage.prototype.beginAsync = function (data) {
                        this._begin(data);
                        return null;
                    };
                    WizardPage.prototype.commit = function (data) { };
                    WizardPage.prototype.reset = function () { };
                    return WizardPage;
                }());
                Legacy.WizardPage = WizardPage;
                var WizardViewModel = (function () {
                    function WizardViewModel() {
                        var _this = this;
                        this._defaultWizardPage = new WizardPage(this, '', "", "");
                        this._pageToken = null;
                        this._pageIsFirst = ko.observable(true);
                        this._currentStep = ko.observable(this._defaultWizardPage);
                        this.width = ko.observable(WizardViewModel.WIZARD_DEFAULT_WIDTH);
                        this.height = ko.observable(WizardViewModel.WIZARD_DEFAULT_HEIGHT);
                        this.headerTemplate = null;
                        this.extendCssClass = null;
                        this.renderedSteps = ko.observableArray([this._defaultWizardPage]);
                        this.isVisible = ko.observable(false);
                        this.indicatorVisible = ko.observable(false);
                        this.titleTemplate = DevExpress.Analytics.Widgets.Internal.getTemplate('dxrd-wizard-header-custom');
                        this.dispatcher = null;
                        this.container = function (element) { return $(element); };
                        this.isPreviousButtonDisabled = ko.pureComputed({
                            read: function () {
                                return _this.currentStep.actionPrevious.isDisabled() || _this._pageIsFirst();
                            },
                            deferEvaluation: true
                        });
                        this._defaultWizardPage.actionPrevious.isDisabled(true);
                        this._defaultWizardPage.actionNext.isDisabled(true);
                        this._defaultWizardPage.actionFinish.isDisabled(true);
                        this.isVisible.subscribe(function (newValue) {
                            if (newValue === false)
                                _this.resetState();
                        });
                    }
                    WizardViewModel.prototype._goToPage = function (task) {
                        var _this = this;
                        if (task["state"]() === "pending") {
                            this.indicatorVisible(true);
                            task.always(function () { return _this.indicatorVisible(false); });
                        }
                        task.done(function (result) {
                            _this._pageToken = result.token;
                            _this._pageIsFirst(result.isFirst);
                            var page = result.page;
                            if (_this.renderedSteps.indexOf(page) === -1)
                                _this.renderedSteps.push(page);
                            _this._currentStep(page);
                        });
                    };
                    Object.defineProperty(WizardViewModel.prototype, "currentStep", {
                        get: function () { return this._currentStep(); },
                        enumerable: true,
                        configurable: true
                    });
                    WizardViewModel.prototype.loadPanelViewModel = function (element) {
                        return this.getLoadPanelViewModel(element, this.indicatorVisible);
                    };
                    WizardViewModel.prototype.getLoadPanelViewModel = function (element, observableVisible) {
                        var $container = $(element).closest('.dxrd-wizard-content');
                        return {
                            animation: {
                                show: { type: 'fade', from: 0, to: 1, duration: 700 },
                                hide: { type: 'fade', from: 1, to: 0, duration: 700 }
                            },
                            deferRendering: false,
                            message: DevExpress.Analytics.Utils.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading'),
                            visible: observableVisible,
                            shading: true,
                            shadingColor: 'transparent',
                            position: { of: $container },
                            container: $container
                        };
                    };
                    WizardViewModel.prototype.wizardPopupPosition = function (element) {
                        return {
                            of: Analytics.Internal.getParentContainer(element)
                        };
                    };
                    WizardViewModel.prototype.goToNext = function () {
                        this._currentStep().commit(this._data);
                        var promise = this.dispatcher.getNextPage(this._pageToken, this._data);
                        this._goToPage(promise);
                    };
                    WizardViewModel.prototype.goToPrevious = function () {
                        this._currentStep().commit(this._data);
                        var promise = this.dispatcher.getPreviousPage(this._pageToken, this._data);
                        this._goToPage(promise);
                    };
                    WizardViewModel.prototype.cancel = function () {
                        this.isVisible(false);
                    };
                    WizardViewModel.prototype.start = function (data, finishCallback) {
                        if (!this.dispatcher)
                            this.dispatcher = new Legacy.LegacyPageDispathcer(this.steps);
                        this._data = data;
                        this._finishCallback = finishCallback;
                        this._pageToken = null;
                        this._currentStep(this._defaultWizardPage);
                        this.isVisible(true);
                        this._goToPage(this.dispatcher.getFirstPage(data));
                    };
                    WizardViewModel.prototype.finish = function () {
                        var _this = this;
                        this._currentStep().commit(this._data);
                        if (!this._finishCallback) {
                            this.isVisible(false);
                            return;
                        }
                        this.indicatorVisible(true);
                        this._finishCallback(this._data)
                            .done(function (result) { _this.isVisible(false); })
                            .fail(function () { _this.indicatorVisible(false); });
                    };
                    WizardViewModel.prototype.resetState = function () {
                        var pages = this.renderedSteps.splice(1);
                        pages.forEach(function (page) { page.reset(); });
                        this.indicatorVisible(false);
                    };
                    WizardViewModel.chainCallbacks = function (first, second) {
                        if (!first)
                            return second;
                        if (!second)
                            return first;
                        return function (data) {
                            var deferred = $.Deferred();
                            first(data)
                                .done(function (handled) {
                                if (handled)
                                    deferred.resolve(true);
                                else
                                    second(data)
                                        .done(function (handled) { deferred.resolve(handled); })
                                        .fail(function () { deferred.reject(); });
                            })
                                .fail(function () { deferred.reject(); });
                            return deferred.promise();
                        };
                    };
                    WizardViewModel.WIZARD_DEFAULT_WIDTH = "690";
                    WizardViewModel.WIZARD_DEFAULT_HEIGHT = "505";
                    WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT = "100%";
                    return WizardViewModel;
                }());
                Legacy.WizardViewModel = WizardViewModel;
                var CommonParametersPage = (function (_super) {
                    __extends(CommonParametersPage, _super);
                    function CommonParametersPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    CommonParametersPage.prototype.getParameters = function () {
                        return [];
                    };
                    CommonParametersPage.prototype.validateParameters = function () {
                        var _this = this;
                        var oldFinish = this.actionFinish.isDisabled();
                        var oldNext = this.actionNext.isDisabled();
                        this._validation = ko.computed(function () {
                            if (!_this.actionFinish.isDisabled.peek() || !_this.actionNext.isDisabled.peek()) {
                                oldFinish = _this.actionFinish.isDisabled.peek();
                                oldNext = _this.actionNext.isDisabled.peek();
                            }
                            var parameters = _this.getParameters();
                            if (parameters.length === 0 || parameters.every(function (param) {
                                return param.isValid();
                            })) {
                                _this.actionFinish.isDisabled(oldFinish);
                                _this.actionNext.isDisabled(oldNext);
                            }
                            else {
                                _this.actionFinish.isDisabled(true);
                                _this.actionNext.isDisabled(true);
                            }
                        });
                    };
                    CommonParametersPage.prototype.reset = function () {
                        this._validation && this._validation.dispose();
                        _super.prototype.reset.call(this);
                    };
                    CommonParametersPage.prototype.commit = function (data) {
                        this._validation && this._validation.dispose();
                    };
                    return CommonParametersPage;
                }(WizardPage));
                Legacy.CommonParametersPage = CommonParametersPage;
                var DataSourceType;
                (function (DataSourceType) {
                    DataSourceType[DataSourceType["NoData"] = 0] = "NoData";
                    DataSourceType[DataSourceType["Sql"] = 1] = "Sql";
                    DataSourceType[DataSourceType["Json"] = 2] = "Json";
                })(DataSourceType = Legacy.DataSourceType || (Legacy.DataSourceType = {}));
                var TypeItem = (function () {
                    function TypeItem(textDefault, textID, imageClassName, imageTemplateName, type) {
                        this.text = Analytics.Utils.getLocalization(textDefault, textID);
                        this.imageClassName = imageClassName;
                        this.imageTemplateName = imageTemplateName;
                        this.type = type;
                    }
                    return TypeItem;
                }());
                Legacy.TypeItem = TypeItem;
                var ChooseDataSourceTypePage = (function (_super) {
                    __extends(ChooseDataSourceTypePage, _super);
                    function ChooseDataSourceTypePage(wizard, wizardSettings) {
                        var _this = _super.call(this, wizard) || this;
                        _this._isActivated = false;
                        _this.template = "dxrd-page-choose-datasource-type";
                        _this.description = Analytics.Utils.getLocalization("Select the data source type.", "DataAccessUIStringId.WizardPageChooseDSType");
                        _this.selectedItem = ko.observable();
                        _this.itemClick = function (item) {
                            _this.selectedItem(item);
                        };
                        _this.IsSelected = function (item) {
                            return _this.selectedItem().type === item.type;
                        };
                        _this.actionNext.isDisabled = ko.pureComputed(function () {
                            return _this.selectedItem() == null;
                        });
                        _this.actionFinish.isDisabled = ko.pureComputed(function () {
                            return _this.selectedItem() == null;
                        });
                        _this.typeItems = [
                            new TypeItem("Sql DataSource", "DataAccessUIStringId.DSTypeSql", "sqldatasource", "dxrd-svg-wizard-SqlDataSource", DataSourceType.Sql)
                        ];
                        if (wizardSettings && wizardSettings.enableJsonDataSource) {
                            _this.typeItems.push(new TypeItem("JSON", "DataAccessUIStringId.DSTypeJson", "jsondatasource", "dxrd-svg-wizard-JsonDataSource", DataSourceType.Json));
                        }
                        _this.extendCssClass = $.noop;
                        _this.actionPrevious.isVisible(false);
                        return _this;
                    }
                    ChooseDataSourceTypePage.prototype._begin = function (data) {
                        if (!this._isActivated && (data.sqlDataSource.name() || data.jsonDataSource)) {
                            this.isVisible = false;
                        }
                        else {
                            this._isActivated = true;
                            var type = data.dataSourceType !== undefined ? data.dataSourceType : DataSourceType.Sql;
                            this.selectedItem(Analytics.Internal.findFirstItemMatchesCondition(this.typeItems, function (item) { return item.type === type; }));
                        }
                    };
                    ChooseDataSourceTypePage.prototype.commit = function (data) {
                        if (this.isVisible)
                            data.dataSourceType = this.selectedItem().type;
                    };
                    ChooseDataSourceTypePage.prototype.reset = function () {
                        _super.prototype.reset.call(this);
                        this._isActivated = false;
                    };
                    return ChooseDataSourceTypePage;
                }(WizardPage));
                Legacy.ChooseDataSourceTypePage = ChooseDataSourceTypePage;
                var MasterDetailRelationsPage = (function (_super) {
                    __extends(MasterDetailRelationsPage, _super);
                    function MasterDetailRelationsPage(wizard, sqlDataSourceResultSchema) {
                        var _this = _super.call(this, wizard) || this;
                        _this._relations = ko.observableArray([]);
                        _this.template = "dxrd-wizard-configure-relations-page";
                        _this.description = Analytics.Utils.getLocalization("Configure master-detail relationships.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureMasterDetailRelations");
                        _this.relationsEditor = ko.observable(null);
                        _this.customResetOptions = $.noop;
                        _this._sqlDataSourceResultSchema = sqlDataSourceResultSchema;
                        _this.actionNext.isDisabled(true);
                        return _this;
                    }
                    MasterDetailRelationsPage.prototype._getResultSet = function (dataSource) {
                        var deferred = $.Deferred();
                        if (dataSource.resultSet) {
                            deferred.resolve((dataSource.resultSet));
                        }
                        else {
                            this._sqlDataSourceResultSchema(dataSource).done((function (result) {
                                deferred.resolve(new Data.ResultSet(JSON.parse(result.resultSchemaJSON)));
                            })).fail(function (result) {
                                deferred.reject(result);
                            });
                        }
                        return deferred.promise();
                    };
                    MasterDetailRelationsPage.prototype.beginAsync = function (data) {
                        var _this = this;
                        this._relations(data.sqlDataSource.relations());
                        this.relationsSubscription = this._relations.subscribe(function (changes) {
                            var isRelationsChanged = changes.some(function (change) {
                                return !change["moved"] && change["moved"] !== 0;
                            });
                            if (isRelationsChanged) {
                                _this.customResetOptions();
                            }
                        }, null, "arrayChange");
                        return this._getResultSet(data.sqlDataSource)
                            .done(function (result) {
                            _this._resultSet = result;
                            _this.relationsEditor(new QueryBuilder.Widgets.Internal.MasterDetailEditor(_this._relations, _this._resultSet, $.noop));
                        })
                            .fail(function (result) {
                            if (Analytics.Internal.getErrorMessage(result))
                                Analytics.Internal.ShowMessage(Analytics.Internal.getErrorMessage(result));
                            _this.wizard.indicatorVisible(false);
                        });
                    };
                    MasterDetailRelationsPage.prototype.commit = function (data) {
                        this.relationsSubscription.dispose();
                        data.sqlDataSource.relations(this._relations());
                        data.sqlDataSource.resultSet = this._resultSet;
                    };
                    return MasterDetailRelationsPage;
                }(WizardPage));
                Legacy.MasterDetailRelationsPage = MasterDetailRelationsPage;
                var MultiQueryDataSourceWizard = (function (_super) {
                    __extends(MultiQueryDataSourceWizard, _super);
                    function MultiQueryDataSourceWizard(connectionStrings, wizardSettings, callbacks, disableCustomSql, rtl) {
                        if (callbacks === void 0) { callbacks = {}; }
                        if (disableCustomSql === void 0) { disableCustomSql = false; }
                        if (rtl === void 0) { rtl = false; }
                        var _this = _super.call(this) || this;
                        _this.connectionStrings = connectionStrings;
                        _this.height = ko.observable("443");
                        _this.title = Analytics.Utils.getLocalization("Data Source Wizard", "AnalyticsCoreStringId.SqlDSWizard_Title");
                        _this.extendCssClass = "dxrd-multiqueries-sqldatasource-wizard";
                        _this.container = Analytics.Internal.getParentContainer;
                        wizardSettings = wizardSettings || DataSourceWizardSettings.prototype.createDefault();
                        _this.finishCallback = callbacks.finishCallback;
                        _this.steps = [
                            new ChooseDataSourceTypePage(_this, wizardSettings),
                            new JsonSelectConnectionString(_this, connectionStrings.json, ko.pureComputed(function () { return connectionStrings.json().length > 0; })),
                            new JsonDataSourceJsonSourcePage(_this),
                            new JsonDataSourceFieldsPage(_this),
                            new SelectConnectionString(_this, connectionStrings.sql, false),
                            new MultiQueryConfigurePage(_this, callbacks, disableCustomSql, rtl),
                            new MultiQueryConfigureParametersPage(_this),
                            new MasterDetailRelationsPage(_this, QueryBuilder.Internal.wrapRebuildResultSchema(callbacks.sqlDataSourceResultSchema))
                        ];
                        return _this;
                    }
                    MultiQueryDataSourceWizard.prototype.start = function (wizardModel, finishCallback) {
                        this.wizardModel = wizardModel || new MultiQueryDataSourceWizardModel();
                        _super.prototype.start.call(this, this.wizardModel, WizardViewModel.chainCallbacks(finishCallback, this.finishCallback));
                    };
                    return MultiQueryDataSourceWizard;
                }(WizardViewModel));
                Legacy.MultiQueryDataSourceWizard = MultiQueryDataSourceWizard;
                var MultiQueryConfigurePage = (function (_super) {
                    __extends(MultiQueryConfigurePage, _super);
                    function MultiQueryConfigurePage(wizard, callbacks, disableCustomSql, rtl) {
                        if (callbacks === void 0) { callbacks = {}; }
                        if (disableCustomSql === void 0) { disableCustomSql = true; }
                        if (rtl === void 0) { rtl = false; }
                        var _this = _super.call(this, wizard) || this;
                        _this._selectedPath = ko.observable(null);
                        _this._connection = "";
                        _this._itemsProvider = ko.observable();
                        _this._customQueries = ko.observableArray([]);
                        _this._checkedQueries = ko.observableArray([]);
                        _this._dataSource = function () {
                            return _this._data && _this._data.sqlDataSource;
                        };
                        _this._dataConnection = function () {
                            return _this._data && _this._data.sqlDataSource && _this._data.sqlDataSource.connection;
                        };
                        _this.template = "dxrd-wizard-add-queries-page";
                        _this.description = Analytics.Utils.getLocalization("Columns selected from specific tables and/or views will be automatically included into a separate query.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureMultiQuery");
                        _this.scrollViewHeight = WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT;
                        _this.isTablesGenerateColumnsCallBack = ko.observableArray([]);
                        _this.customizeDBSchemaTreeListActions = null;
                        _this.popupSelectStatment = ({
                            isVisible: ko.observable(false),
                            title: function () { return Analytics.Utils.getLocalization("Custom SQL Editor", "AnalyticsCoreStringId.SqlDSWizard_CustomSqlEditor"); },
                            query: null,
                            data: ko.observable(),
                            okButtonText: function () { return DevExpress.Analytics.Utils.getLocalization('OK', 'DataAccessUIStringId.Button_OK'); },
                            okButtonHandler: function (e) {
                                _this.popupSelectStatment.query.sqlString(e.model.data());
                                _this.setCustomSqlQuery(_this.popupSelectStatment.query);
                                e.model.isVisible(false);
                            },
                            aceOptions: QueryBuilder.Widgets.Internal.createDefaultSQLAceOptions(),
                            aceAvailable: Analytics.Widgets.Internal.aceAvailable,
                            additionalOptions: QueryBuilder.Widgets.Internal.createDefaultSQLAdditionalOptions(function (newVal) { _this.popupSelectStatment.data(newVal); }),
                            languageHelper: QueryBuilder.Widgets.Internal.createDefaultSQLLanguageHelper(),
                            closest: function (element, parentSelector) {
                                return $(element).closest(parentSelector);
                            }
                        });
                        _this.showStatementPopup = function (query) {
                            _this.popupSelectStatment.isVisible(true);
                            _this.popupSelectStatment.query = query;
                            _this.popupSelectStatment.data(query.sqlString());
                        };
                        _this.disableCustomSql = true;
                        _this.isDataLoadingInProcess = ko.observable(false);
                        _this.queryEditIndex = ko.observable(-1);
                        _this.showQbCallBack = function (name, isCustomQuery) {
                            if (name === void 0) { name = null; }
                            if (isCustomQuery === void 0) { isCustomQuery = false; }
                            if (name !== null) {
                                var query = Analytics.Internal.findFirstItemMatchesCondition(_this._customQueries(), function (item) { return name === (item.name() || item.generateName()); });
                                if (query.type() === Data.Utils.SqlQueryType.customSqlQuery) {
                                    _this.queryEditIndex(_this._customQueries().indexOf(query));
                                    _this.showStatementPopup(query);
                                }
                                else {
                                    _this.queryEditIndex(_this._customQueries().indexOf(query));
                                    _this.popupQueryBuilder.show(query, _this.dataSourceClone());
                                }
                            }
                            else {
                                _this.queryEditIndex(-1);
                                if (isCustomQuery) {
                                    _this.showStatementPopup(new Data.CustomSqlQuery({ "@Name": null }, _this.dataSourceClone()));
                                }
                                else {
                                    var queryNew = new Data.TableQuery({ "@Name": null }, _this.dataSourceClone());
                                    _this.popupQueryBuilder.show(queryNew, _this.dataSourceClone());
                                }
                            }
                        };
                        _this.customResetOptions = $.noop;
                        _this._callbacks = callbacks;
                        _this._sqlTextProvider = new Internal.SelectQuerySqlTextProvider(QueryBuilder.Internal.wrapGetSelectStatement(_this._callbacks.selectStatement), _this._dataConnection);
                        _this.popupQueryBuilder = new Internal.QueryBuilderPopup(function (newQuery, isInProcess) { return _this.setTableQuery(newQuery, isInProcess); }, rtl, callbacks.customizeQBInitData);
                        _this.fieldListModel = ko.observable(null);
                        _this.actionPrevious.isDisabled = ko.pureComputed(function () { return false; });
                        var isFinishDisabled = ko.pureComputed(function () { return !_this._itemsProvider() || !_this._itemsProvider().hasCheckedItems() || _this.isTablesGenerateColumnsCallBack().length > 0; });
                        _this.actionFinish.isDisabled = isFinishDisabled;
                        _this.actionNext.isDisabled = ko.pureComputed(function () { return _this._itemsProvider().nextButtonDisabled() || isFinishDisabled(); });
                        _this.hasParametersToEdit = ko.pureComputed(function () { return _this._itemsProvider().hasParametersToEdit(); });
                        _this.disableCustomSql = disableCustomSql;
                        _this.actionCancel.handler = function () {
                            wizard.cancel();
                        };
                        _this.getItemsAfterCheck = function (node) {
                            _this._resetDataSourceResult();
                            if (node.checked.peek() && node.isList) {
                                if (node.name === "tables" || node.name === "views") {
                                    _this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest(node.name)).done(function () {
                                        if (node.isList && node.children.peek().length > 0) {
                                            node.children.peek().forEach(function (item) {
                                                _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest(node.name + "." + item.name));
                                            });
                                        }
                                    });
                                }
                                else if (node.specifics === "table" || node.specifics === "view") {
                                    _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest(node.specifics + "." + node.name));
                                }
                                else if (node.name === "procedures") {
                                    _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest(node.name));
                                }
                            }
                        };
                        return _this;
                    }
                    MultiQueryConfigurePage.prototype._addQueryAlgorithm = function (elements, specifics, dataSource, customQueries) {
                        if (!elements.unChecked() || specifics === "queries") {
                            if (elements.children().length === 0) {
                                this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest(specifics));
                            }
                            if (specifics === "tables" || specifics === "views") {
                                this._addQueryFromTables(elements, dataSource);
                            }
                            else if (specifics === "procedures") {
                                this._addQueryFromStoredProcedures(elements, dataSource);
                            }
                            else {
                                this._addQueryFromCustomQueries(elements, customQueries, dataSource.queries);
                            }
                        }
                        else {
                            elements.children().forEach(function (node) {
                                MultiQueryConfigurePage.removeQuery(dataSource.queries, node);
                            });
                        }
                    };
                    MultiQueryConfigurePage.prototype._addQueryFromTables = function (elements, dataSource) {
                        var _self = this;
                        for (var i = 0; i < elements.children().length; i++) {
                            var table = elements.children()[i];
                            if (!table.unChecked()) {
                                var columns = {};
                                var queryJSON = {
                                    "Columns": columns,
                                    "Tables": {
                                        "SelectedTables": {
                                            "Item1": {
                                                "@Name": table.name,
                                                "@ControlType": "Table",
                                                "@ItemType": "Table"
                                            }
                                        },
                                    }
                                };
                                if (table.children().length === 0) {
                                    this._itemsProvider().getItems(new DevExpress.Analytics.Utils.PathRequest("tables." + table.name)).done(function () {
                                        table.initializeChildren(table.children());
                                    });
                                }
                                for (var j = 0; j < table.children().length; j++) {
                                    var column = table.children()[j];
                                    if (column.checked()) {
                                        columns["Item" + (j + 1)] = {
                                            "@Table": table.name,
                                            "@Name": column.name,
                                            "@ItemType": "Column"
                                        };
                                    }
                                }
                                MultiQueryConfigurePage.pushQuery(new Data.TableQuery(queryJSON, dataSource), table, dataSource.queries);
                            }
                            else {
                                MultiQueryConfigurePage.removeQuery(dataSource.queries, table);
                            }
                        }
                    };
                    MultiQueryConfigurePage.prototype._addQueryFromStoredProcedures = function (elements, dataSource) {
                        for (var i = 0; i < elements.children().length; i++) {
                            var procedure = elements.children()[i];
                            if (procedure.checked()) {
                                var newQuery = new Data.StoredProcQuery({ "@Name": procedure.name, "ProcName": procedure.name }, dataSource);
                                procedure.arguments.forEach(function (arg) {
                                    newQuery.parameters.push(new Data.DataSourceParameter({ "@Name": arg.name, "@Type": Data.DBColumn.GetType(arg.type) }, null, Data.Metadata.storedProcParameterSerializationsInfo(Data.DBColumn.GetType(arg.type))));
                                });
                                MultiQueryConfigurePage.pushQuery(newQuery, procedure, dataSource.queries);
                            }
                            else {
                                MultiQueryConfigurePage.removeQuery(dataSource.queries, procedure);
                            }
                        }
                    };
                    MultiQueryConfigurePage.prototype._addQueryFromCustomQueries = function (elements, queries, allQueries) {
                        for (var i = 0; i < elements.children().length; i++) {
                            var queryNode = elements.children()[i];
                            var query = Analytics.Internal.findFirstItemMatchesCondition(queries.peek(), function (item) { return queryNode.name === (item.name() || item.generateName()); });
                            if (queryNode.checked()) {
                                query.name(Data.Internal.generateQueryUniqueName(allQueries.peek(), query));
                                this._checkedQueries.push(query);
                            }
                        }
                    };
                    MultiQueryConfigurePage.prototype._getItemsPromise = function (pathRequest) {
                        var _this = this;
                        var isDone = false;
                        var request = this._itemsProvider().getItems(pathRequest).always(function () {
                            _this.isTablesGenerateColumnsCallBack.remove(request);
                            isDone = true;
                        });
                        if (!isDone) {
                            this.isTablesGenerateColumnsCallBack.push(request);
                        }
                    };
                    MultiQueryConfigurePage.prototype._resetDataSourceResult = function () {
                        this.customResetOptions();
                        this._dataSource().relations([]);
                        this._dataSource().resultSet = null;
                    };
                    MultiQueryConfigurePage.prototype._setQueryCore = function (query) {
                        var provider = this.fieldListModel().itemsProvider;
                        var queryEditIndex = this.queryEditIndex();
                        if (queryEditIndex >= 0) {
                            this._itemsProvider().queries().children()[queryEditIndex].name = query.name();
                            provider.customQueries().splice(queryEditIndex, 1, query);
                        }
                        else {
                            query.name(Data.Internal.generateQueryUniqueName(provider.customQueries().peek(), query));
                            provider.customQueries().push(query);
                            this._selectedPath("queries." + query.name());
                            var childrens = this._itemsProvider().queries().children();
                            var children = childrens[childrens.length - 1];
                            children.setChecked(true);
                            children["_afterCheckToggled"] && children["_afterCheckToggled"](children);
                        }
                        this._resetDataSourceResult();
                    };
                    MultiQueryConfigurePage.pushQuery = function (newQuery, node, queries) {
                        if (!Analytics.Internal.findFirstItemMatchesCondition(queries.peek(), function (item) { return item.name() === (newQuery.name() || newQuery.generateName()); })) {
                            newQuery.name(Data.Internal.generateQueryUniqueName(queries.peek(), newQuery));
                            queries.push(newQuery);
                        }
                        node.hasQuery = true;
                    };
                    MultiQueryConfigurePage.removeQuery = function (queries, node) {
                        if (node.hasQuery) {
                            var queryIndex = -1;
                            var existUncheck = queries.peek().some(function (value, index) {
                                if (value.name() === node.name || value.generateName() === node.name) {
                                    queryIndex = index;
                                    return true;
                                }
                                return false;
                            });
                            if (existUncheck) {
                                queries.splice(queryIndex, 1);
                            }
                            node.hasQuery = false;
                        }
                    };
                    MultiQueryConfigurePage.prototype.dataSourceClone = function () {
                        return this._dataSourceClone;
                    };
                    MultiQueryConfigurePage.prototype.AddQueryWithBuilder = function () {
                    };
                    MultiQueryConfigurePage.prototype.runQueryBuilder = function () {
                    };
                    MultiQueryConfigurePage.prototype.loadPanelViewModel = function (element) {
                        return this.wizard.getLoadPanelViewModel(element, this.isDataLoadingInProcess);
                    };
                    MultiQueryConfigurePage.prototype.setTableQuery = function (query, isInProcess) {
                        var _this = this;
                        isInProcess && isInProcess(true);
                        return this._sqlTextProvider.getQuerySqlText(query)
                            .done(function () { return _this._setQueryCore(query); })
                            .always(function () { isInProcess && isInProcess(false); });
                    };
                    MultiQueryConfigurePage.prototype.setCustomSqlQuery = function (query) {
                        this._setQueryCore(query);
                    };
                    MultiQueryConfigurePage.prototype.beginAsync = function (data) {
                        var _this = this;
                        if (this._data !== data || data.connectionString() !== this._connection) {
                            this._dataSourceClone = new Data.SqlDataSource({}, undefined, data.requestWrapper);
                            this._dataSourceClone.connection.name(data.connectionString());
                            this._dataSourceClone.dbSchemaProvider = data.sqlDataSource.dbSchemaProvider;
                            var customQueriesPromise = this._callbacks.customQueriesPreset
                                ? this._callbacks.customQueriesPreset(this._dataSourceClone)
                                : $.Deferred().resolve([]).promise();
                            var deferred = $.Deferred();
                            customQueriesPromise.done(function (queries) {
                                _this._customQueries(queries);
                                _this._selectedPath("");
                                _this
                                    ._itemsProvider(new Internal.DBSchemaItemsProvider(_this.dataSourceClone().dbSchemaProvider, _this._customQueries, _this.showQbCallBack, _this.disableCustomSql, _this.getItemsAfterCheck));
                                _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest("queries"));
                                _this.fieldListModel({
                                    itemsProvider: _this._itemsProvider(),
                                    selectedPath: _this._selectedPath,
                                    treeListController: new Internal.DBSchemaTreeListController(_this.customizeDBSchemaTreeListActions),
                                    templateName: "dxrd-treelist-with-checkbox"
                                });
                                _this.popupQueryBuilder.isVisible(false);
                                _this.dataSourceClone()
                                    .dbSchemaProvider.getDbSchema()
                                    .done(function () {
                                    _this._connection = data.connectionString();
                                    _this._data = data;
                                    deferred.resolve();
                                })
                                    .fail(deferred.reject);
                            })
                                .fail(deferred.reject);
                            return deferred.promise();
                        }
                        return $.Deferred().resolve({}).promise();
                    };
                    MultiQueryConfigurePage.prototype.commit = function (data) {
                        data.sqlDataSource.queries.removeAll(this._checkedQueries());
                        this._checkedQueries([]);
                        this._addQueryAlgorithm(this._itemsProvider().tables(), "tables", data.sqlDataSource);
                        this._addQueryAlgorithm(this._itemsProvider().views(), "views", data.sqlDataSource);
                        this._addQueryAlgorithm(this._itemsProvider().procedures(), "procedures", data.sqlDataSource);
                        this._addQueryAlgorithm(this._itemsProvider().queries(), "queries", data.sqlDataSource, this._customQueries);
                        data.customQueries = this._customQueries;
                        ko.utils.arrayPushAll(data.sqlDataSource.queries(), this._checkedQueries());
                        data.sqlDataSource.queries.valueHasMutated();
                    };
                    return MultiQueryConfigurePage;
                }(WizardPage));
                Legacy.MultiQueryConfigurePage = MultiQueryConfigurePage;
                var MultiQueryConfigureParametersPage = (function (_super) {
                    __extends(MultiQueryConfigureParametersPage, _super);
                    function MultiQueryConfigureParametersPage(wizard, parametersConverter) {
                        if (parametersConverter === void 0) { parametersConverter = {
                            createParameterViewModel: function (parameter) { return parameter; },
                            getParameterFromViewModel: function (parameterViewModel) { return parameterViewModel; }
                        }; }
                        var _this = _super.call(this, wizard) || this;
                        _this.parametersConverter = parametersConverter;
                        _this._selectedPath = ko.observable(null);
                        _this._createNewParameter = function (queryName, parameters) {
                            var newParameter = new Data.DataSourceParameter({
                                "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(parameters, "parameter"),
                                "@Type": "System.Int32"
                            });
                            _this._selectedPath(queryName + "." + newParameter.name());
                            return _this.parametersConverter.createParameterViewModel(newParameter);
                        };
                        _this.template = "dxrd-configure-query-parameters-page";
                        _this.description = Analytics.Utils.getLocalization("Configure query parameters.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters");
                        _this.scrollViewHeight = WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT;
                        _this.fieldListModel = ko.observable(null);
                        _this.actionPrevious.isDisabled(false);
                        _this.actionFinish.isDisabled(false);
                        return _this;
                    }
                    MultiQueryConfigureParametersPage.prototype._begin = function (data) {
                        var _this = this;
                        this._rootItems = [];
                        data.sqlDataSource.queries().forEach(function (query) {
                            if (_canEditQueryParameters(query, data.customQueries())) {
                                var parent = new Internal.ParametersTreeListRootItem(query);
                                parent.parameters(query.parameters().map(function (parameterModel) {
                                    return new Internal.ParametersTreeListItem(_this.parametersConverter.createParameterViewModel(parameterModel), parent);
                                }));
                                _this._rootItems.push(parent);
                            }
                        });
                        if (this._rootItems.length === 0) {
                            this.isVisible = false;
                            this.fieldListModel(null);
                        }
                        else {
                            this.isVisible = true;
                            this.actionNext.isDisabled(data.sqlDataSource.queries().length < 2);
                            this.fieldListModel({
                                itemsProvider: {
                                    getItems: function (pathRequest) {
                                        var result = $.Deferred();
                                        if (!pathRequest.fullPath) {
                                            result.resolve(_this._rootItems);
                                        }
                                        else {
                                            var parent = Analytics.Internal.findFirstItemMatchesCondition(_this._rootItems, function (item) { return item.name === pathRequest.ref; });
                                            result.resolve(parent.parameters());
                                        }
                                        return result.promise();
                                    }
                                },
                                templateName: "dx-treelist-item-with-hover",
                                selectedPath: this._selectedPath,
                                treeListController: new Internal.ParametersTreeListController(this._rootItems, this._createNewParameter),
                            });
                            this.validateParameters();
                        }
                    };
                    MultiQueryConfigureParametersPage.prototype.getParameters = function () {
                        return [].concat.apply([], (this._rootItems || []).map(function (x) {
                            return x.parameters().map(function (param) {
                                return param.dataSourceParameter();
                            });
                        }));
                    };
                    MultiQueryConfigureParametersPage.prototype.commit = function (data) {
                        var _this = this;
                        _super.prototype.commit.call(this, data);
                        this._rootItems.forEach(function (item) {
                            item.query().parameters(item.parameters().map(function (parameterViewModel) {
                                return _this.parametersConverter.getParameterFromViewModel(parameterViewModel.dataSourceParameter());
                            }));
                        });
                    };
                    return MultiQueryConfigureParametersPage;
                }(CommonParametersPage));
                Legacy.MultiQueryConfigureParametersPage = MultiQueryConfigureParametersPage;
                var MultiQueryDataSourceWizardModel = (function () {
                    function MultiQueryDataSourceWizardModel(requestWrapper) {
                        if (requestWrapper === void 0) { requestWrapper = new QueryBuilder.Utils.RequestWrapper(); }
                        var _this = this;
                        this.requestWrapper = requestWrapper;
                        this.connectionString = ko.observable();
                        this.jsonDataSourceConnectionName = ko.observable();
                        this.customQueries = ko.observableArray();
                        this.sqlDataSource = new Data.SqlDataSource({}, undefined, requestWrapper);
                        this.connectionString = this.sqlDataSource.connection.name;
                        this.connectionString.subscribe(function () {
                            _this.sqlDataSource.relations([]);
                            _this.sqlDataSource.queries([]);
                        });
                    }
                    return MultiQueryDataSourceWizardModel;
                }());
                Legacy.MultiQueryDataSourceWizardModel = MultiQueryDataSourceWizardModel;
                var SelectOptionalConnectionString = (function (_super) {
                    __extends(SelectOptionalConnectionString, _super);
                    function SelectOptionalConnectionString(wizard, availableDataSources, isDataSourceCreationAvailable) {
                        var _this = _super.call(this, wizard) || this;
                        _this.availableDataSources = availableDataSources;
                        _this.template = "dxrd-page-dataSource";
                        _this.description = Analytics.Utils.getLocalization("Choose a Data Source to use in your report.", "ASPxReportsStringId.ReportDesigner_Wizard_ChooseDataSource");
                        _this.selectedDataSource = ko.observableArray([]);
                        _this.dataSourceOperations = [
                            { text: _this.existingOperationText, createNewDataSource: false },
                            { text: _this.createNewDataSourceOperationText, createNewDataSource: true }
                        ];
                        _this.selectedDataSourceOperation = ko.observable(_this.dataSourceOperations[0]);
                        _this.createNewDataSource = ko.pureComputed(function () { return _this.selectedDataSourceOperation().createNewDataSource; });
                        _this.actionNext.isDisabled = ko.pureComputed(function () {
                            return _this.selectedDataSource().length === 0 && !_this.selectedDataSourceOperation().createNewDataSource;
                        });
                        _this.actionFinish.isDisabled(true);
                        _this.isDataSourceCreationAvailable = isDataSourceCreationAvailable;
                        _this.dataSourcesListHeight = ko.pureComputed(function () {
                            if (_this.isDataSourceCreationAvailable())
                                return 282;
                            else
                                return parseInt(WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT);
                        });
                        return _this;
                    }
                    SelectOptionalConnectionString.prototype._begin = function (data) {
                        if (this.isDataSourceCreationAvailable()) {
                            this.isVisible = this.availableDataSources().length > 0;
                            if (!this.isVisible) {
                                this.selectedDataSourceOperation(this.dataSourceOperations[1]);
                            }
                            this.description = Analytics.Utils.getLocalization("Do you want to use an existing data source?", "AnalyticsCoreStringId.Wizard_UseExisting_DataSource");
                        }
                        else {
                            this.isVisible = this.availableDataSources().length !== 0;
                            this.description = Analytics.Utils.getLocalization("Choose a Data Source to use in your report.", "AnalyticsCoreStringId.Wizard_ChooseDataSource_Description");
                        }
                        this.selectedDataSource(this.getSelectedDataSource(data));
                    };
                    SelectOptionalConnectionString.prototype.reset = function () {
                        this.selectedDataSourceOperation(this.dataSourceOperations[0]);
                    };
                    SelectOptionalConnectionString.prototype.getSelectedDataSource = function (data) {
                        return this.availableDataSources()[0];
                    };
                    Object.defineProperty(SelectOptionalConnectionString.prototype, "createNewDataSourceOperationText", {
                        get: function () {
                            return Analytics.Utils.getLocalization("No, I'd like to create a new data source", "AnalyticsCoreStringId.Wizard_CreateNewDataSource");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(SelectOptionalConnectionString.prototype, "existingOperationText", {
                        get: function () {
                            return Analytics.Utils.getLocalization("Yes, let me choose an existing data source from the list", "AnalyticsCoreStringId.Wizard_ChooseDataSourceFromList");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return SelectOptionalConnectionString;
                }(WizardPage));
                Legacy.SelectOptionalConnectionString = SelectOptionalConnectionString;
                var JsonSelectConnectionString = (function (_super) {
                    __extends(JsonSelectConnectionString, _super);
                    function JsonSelectConnectionString(wizard, jsonDataConnections, isDataSourceCreationAvailable) {
                        return _super.call(this, wizard, jsonDataConnections, isDataSourceCreationAvailable) || this;
                    }
                    JsonSelectConnectionString.prototype._begin = function (data) {
                        var isJsonWizard = data.dataSourceType === DataSourceType.Json;
                        this.isVisible = isJsonWizard;
                        if (!isJsonWizard)
                            return;
                        if (data.jsonDataSource && data.jsonDataSource.connectionName()) {
                            data.jsonDataSourceConnectionName(data.jsonDataSource.connectionName());
                        }
                        _super.prototype._begin.call(this, data);
                    };
                    JsonSelectConnectionString.prototype.commit = function (data) {
                        if (!this.isVisible)
                            return;
                        if (this.selectedDataSourceOperation().createNewDataSource) {
                            data.jsonDataSourceConnectionName(null);
                        }
                        else {
                            data.jsonDataSourceConnectionName(this.selectedDataSource()[0] && this.selectedDataSource()[0].name || null);
                        }
                    };
                    JsonSelectConnectionString.prototype.getSelectedDataSource = function (data) {
                        return [Analytics.Internal.getFirstItemByPropertyValue(this.availableDataSources(), "name", data.jsonDataSourceConnectionName()) || _super.prototype.getSelectedDataSource.call(this)];
                    };
                    return JsonSelectConnectionString;
                }(SelectOptionalConnectionString));
                Legacy.JsonSelectConnectionString = JsonSelectConnectionString;
                var JsonDataSourceFieldsPage = (function (_super) {
                    __extends(JsonDataSourceFieldsPage, _super);
                    function JsonDataSourceFieldsPage(wizard) {
                        var _this = _super.call(this, wizard) || this;
                        _this._rootItems = ko.observableArray([]);
                        _this._fieldListItemsProvider = ko.observable(null);
                        _this._fieldSelectedPath = ko.observable(null);
                        _this._subscriptions = [];
                        _this._createTreeNode = function (item, isChecked, path) {
                            return new Analytics.Wizard.Internal.DataMemberTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
                        };
                        _this._createLeafTreeNode = function (item, isChecked, path) {
                            return new Analytics.Wizard.Internal.FieldTreeNode(item.name, item.displayName, item.specifics, isChecked, path);
                        };
                        _this.template = "dxrd-jsondatasource-fields-page";
                        _this.rootElementTitle = Analytics.Utils.getLocalization("Root element:", "DataAccessUIStringId.WizardPageChooseJsonSchema_RootElement");
                        _this.description = Analytics.Utils.getLocalization('Select data fields.', 'DataAccessUIStringId.WizardPageChooseJsonSchema');
                        _this.rootElementList = ko.observable([]);
                        _this.selectedRootElement = ko.observable(null);
                        _this.actionNext.isDisabled = ko.observable(true);
                        _this.actionFinish.isDisabled = ko.pureComputed(function () {
                            return !_this._fieldListItemsProvider().hasCheckedItems();
                        });
                        _this.actionCancel.handler = function () {
                            wizard.cancel();
                        };
                        _this.actionPrevious.isVisible(true);
                        var rootElementSubscription = null;
                        _this.rootElementList.subscribe(function (rootElements) {
                            rootElementSubscription && rootElementSubscription.dispose();
                            rootElementSubscription = _this.selectedRootElement.subscribe(function (selectedPath) {
                                if (!selectedPath)
                                    return _this._rootItems([]);
                                var rootNode = _this._getSchemaToDataMemberInfo(selectedPath);
                                if (rootNode) {
                                    _this._rootItems([{
                                            name: ko.unwrap(rootNode.name),
                                            isSelected: ko.unwrap(rootNode.selected),
                                            displayName: ko.unwrap(rootNode.displayName) || ko.unwrap(rootNode.name),
                                            data: rootNode,
                                            specifics: rootNode.nodes.length > 0 ? "List" : "Default"
                                        }]);
                                }
                            });
                            _this.selectedRootElement(rootElements[0]);
                        });
                        var fieldListProvider = new Analytics.Internal.FieldListProvider(_this._createFieldListCallback(), _this._rootItems);
                        _this._fieldListItemsProvider(new Internal.JsonTreeNodeItemsProvider(fieldListProvider, _this._rootItems, _this._createTreeNode, _this._createLeafTreeNode));
                        _this.fieldListModel = {
                            expandRootItems: true,
                            itemsProvider: _this._fieldListItemsProvider(),
                            selectedPath: _this._fieldSelectedPath,
                            treeListController: null,
                            templateName: "dxrd-treelist-with-checkbox"
                        };
                        return _this;
                    }
                    JsonDataSourceFieldsPage.prototype._clear = function () {
                        this._rootItems([]);
                        this._fieldSelectedPath("");
                        this.rootElementList([]);
                        this.selectedRootElement(null);
                        this._dataSource && this._dataSource.jsonSchemaProvider.reset();
                    };
                    JsonDataSourceFieldsPage.prototype._createFieldListCallback = function () {
                        var _this = this;
                        return function (pathRequest) {
                            var parentNode = new Data.JsonNode({});
                            parentNode.nodes = [_this._rootItems()[0].data];
                            var itemsByPath = _this._getInnerItemsByPath(pathRequest, parentNode);
                            return $.Deferred().resolve(itemsByPath).promise();
                        };
                    };
                    JsonDataSourceFieldsPage.prototype._isDataSourceChanged = function (dataSource) {
                        return !dataSource
                            || !this._dataSource
                            || this._dataSource !== dataSource
                            || this._dataSource.connectionName() !== dataSource.connectionName()
                            || this._dataSource.source !== dataSource.source
                            || this._dataSource.source.json() !== dataSource.source.json()
                            || this._dataSource.source.uri() !== dataSource.source.uri();
                    };
                    JsonDataSourceFieldsPage.prototype._getSchemaToDataMemberInfo = function (path) {
                        var nodeAcc = this._dataSource.schema;
                        for (var i = 0; i < path.pathParts.length; i++) {
                            nodeAcc = nodeAcc.nodes.filter(function (node) { return node.name() === path.pathParts[i]; })[0];
                            if (!nodeAcc)
                                return null;
                        }
                        return nodeAcc;
                    };
                    JsonDataSourceFieldsPage.prototype._mapJsonNodesToTreelistItems = function (nodes) {
                        return $.map((nodes || []), function (node) {
                            var dataMemberInfo = {
                                name: node.name(),
                                displayName: node.displayName || node.name(),
                                isSelected: node.selected(),
                                isList: node.nodes && node.nodes.length > 0,
                                specifics: "Default"
                            };
                            return dataMemberInfo;
                        });
                    };
                    JsonDataSourceFieldsPage.prototype._getNodesByPath = function (pathRequest, parentNode) {
                        if (!pathRequest.fullPath) {
                            return parentNode.nodes;
                        }
                        else {
                            var currentNodes = parentNode.nodes;
                            for (var i = 0; i < pathRequest.pathParts.length; i++) {
                                var pathPart = (currentNodes || []).filter(function (node) { return node.name() == pathRequest.pathParts[i]; })[0];
                                if (!pathPart)
                                    return [];
                                currentNodes = pathPart.nodes;
                            }
                            return currentNodes;
                        }
                    };
                    JsonDataSourceFieldsPage.prototype._getInnerItemsByPath = function (pathRequest, parentNode) {
                        var nodes = this._getNodesByPath(pathRequest, parentNode);
                        return this._mapJsonNodesToTreelistItems(nodes);
                    };
                    JsonDataSourceFieldsPage.prototype._beginInternal = function (data) {
                        var _this = this;
                        if (this._isDataSourceChanged(data.jsonDataSource)) {
                            this._dataSource = data.jsonDataSource || new Data.JsonDataSource({});
                            var initializeFunc = function () {
                                _this._clear();
                            };
                            this._subscriptions.forEach(function (subscription) { return subscription.dispose(); });
                            this._subscriptions = [];
                            this._subscriptions.push(this._dataSource.source.uri.subscribe(initializeFunc));
                            this._subscriptions.push(this._dataSource.source.json.subscribe(initializeFunc));
                            this._subscriptions.push(this._dataSource.connectionName.subscribe(initializeFunc));
                        }
                        var deferred = $.Deferred();
                        this._dataSource.getSchema()
                            .done(function (jsonSchema) {
                            var rootElementList = jsonSchema.getRootElementPartList();
                            if (_this.rootElementList() !== rootElementList) {
                                _this.rootElementList(rootElementList);
                            }
                            if (_this._rootItems().length === 0) {
                                var dataSourceRootElementPath = ["root", _this._dataSource.rootElement()].join('.');
                                var rootElementToSelect = _this.rootElementList().filter(function (item) { return item.fullPath === dataSourceRootElementPath; })[0] || _this.rootElementList()[0];
                                _this.selectedRootElement(rootElementToSelect);
                            }
                            deferred.resolve();
                        })
                            .fail(deferred.reject);
                        return deferred.promise();
                    };
                    JsonDataSourceFieldsPage.prototype._resetSelectionRecursive = function (currentNode, selectedRootElement) {
                        var _this = this;
                        if (currentNode === selectedRootElement) {
                            return;
                        }
                        currentNode.selected && currentNode.selected(false);
                        (currentNode.nodes || []).forEach(function (node) { return _this._resetSelectionRecursive(node, selectedRootElement); });
                    };
                    JsonDataSourceFieldsPage.prototype._mapJsonSchema = function (jsonNode, path) {
                        var _this = this;
                        var treelistNode = this._fieldListItemsProvider().getNodeByPath(path);
                        if (!treelistNode)
                            return;
                        jsonNode.selected(!!treelistNode.checked());
                        (jsonNode.nodes || []).forEach(function (innerJsonNode) {
                            var nextPathParts = path.pathParts.concat(innerJsonNode.name());
                            var nextFullPath = nextPathParts.join('.');
                            var nextPath = { fullPath: nextFullPath, path: innerJsonNode.name(), id: nextFullPath, pathParts: nextPathParts };
                            _this._mapJsonSchema(innerJsonNode, nextPath);
                        });
                        return jsonNode;
                    };
                    JsonDataSourceFieldsPage.prototype._begin = function (data) {
                        this.isVisible = data.dataSourceType === DataSourceType.Json;
                    };
                    JsonDataSourceFieldsPage.prototype.beginAsync = function (data) {
                        this._begin(data);
                        if (!this.isVisible)
                            return $.Deferred().resolve().promise();
                        return this._beginInternal(data);
                    };
                    JsonDataSourceFieldsPage.prototype.commit = function (data) {
                        var rootItem = this._rootItems()[0];
                        if (!rootItem)
                            return;
                        var currentRootNode = this._rootItems()[0].data;
                        this._resetSelectionRecursive(this._dataSource.schema, currentRootNode);
                        var currentRootPath = currentRootNode.name();
                        var pathFromCurrentRoot = { fullPath: currentRootPath, path: "", id: currentRootPath, pathParts: [currentRootPath] };
                        this._mapJsonSchema(this._rootItems()[0].data, pathFromCurrentRoot);
                        var name = this._dataSource.name;
                        name(name() || "JsonDataSource");
                        data.jsonDataSource = this._dataSource;
                        var selectedRootElementPath = this.selectedRootElement().pathParts.slice(1).join('.');
                        this._dataSource.rootElement(selectedRootElementPath);
                    };
                    JsonDataSourceFieldsPage.prototype.reset = function () {
                        this._clear();
                    };
                    return JsonDataSourceFieldsPage;
                }(WizardPage));
                Legacy.JsonDataSourceFieldsPage = JsonDataSourceFieldsPage;
                var JsonDataSourceJsonSourcePage = (function (_super) {
                    __extends(JsonDataSourceJsonSourcePage, _super);
                    function JsonDataSourceJsonSourcePage(wizard) {
                        var _this = _super.call(this, wizard) || this;
                        _this._requestWrapper = new QueryBuilder.Utils.RequestWrapper();
                        _this.template = "dxrd-page-jsonsource";
                        _this.description = Analytics.Utils.getLocalization("Specify JSON-formatted data location.", "DataAccessUIStringId.WizardPageChooseJsonSource");
                        _this.jsonSourceTitle = Analytics.Utils.getLocalization("JSON Source", "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType");
                        _this.sources = [];
                        _this._jsonStringSettings = new Internal.JsonDataSourceJsonSourcePageStringSettings();
                        _this._jsonUriSetting = new Internal.JsonDataSourceJsonSourcePageUriSettings(_this._requestWrapper);
                        _this._jsonUriSetting.onChange(function () { return void 0; });
                        _this._jsonStringSettings.onChange(function () { return void 0; });
                        _this.sources = [
                            { value: _this._jsonUriSetting, displayValue: "Web Service Endpoint (URI)", localizationId: "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Uri" },
                            { value: _this._jsonStringSettings, displayValue: "JSON String", localizationId: "DataAccessUIStringId.WizardPageChooseJsonSource_SourceType_Custom" }
                        ];
                        var selectedSource = ko.observable();
                        _this._selectedSource = ko.pureComputed({
                            read: function () { return selectedSource(); },
                            write: function (newVal) {
                                if (selectedSource() === newVal)
                                    return;
                                selectedSource(newVal);
                                newVal._validatorsReady && newVal._validatorsReady(false);
                                setTimeout(function () {
                                    newVal._validate && newVal._validate();
                                }, 1);
                            }
                        });
                        _this._selectedSource(_this.sources[0].value);
                        _this.grid = new Analytics.Widgets.ObjectProperties(_this._selectedSource);
                        _this.actionPrevious.isVisible(true);
                        _this.actionNext.isDisabled = ko.pureComputed(function () {
                            var selectedSource = _this._selectedSource();
                            var isCurrentSourceValid = selectedSource.isValid();
                            var isCurrentSourceEmpty = selectedSource.isEmpty();
                            return _this.isVisible && (!isCurrentSourceValid || isCurrentSourceEmpty);
                        });
                        _this.actionFinish.isDisabled(true);
                        return _this;
                    }
                    JsonDataSourceJsonSourcePage.prototype._begin = function (data) {
                        var isJsonWizard = data.dataSourceType === DataSourceType.Json;
                        this.isVisible = isJsonWizard;
                        if (!isJsonWizard)
                            return;
                        data.jsonDataSource = data.jsonDataSource || new Data.JsonDataSource({});
                        data.jsonDataSource.connectionName(data.jsonDataSourceConnectionName());
                        if (data.jsonDataSource.connectionName()) {
                            this.isVisible = false;
                        }
                        else if (data.jsonDataSource.source.uri()) {
                            this._jsonUriSetting.setValue(data.jsonDataSource);
                            this._selectedSource(this._jsonUriSetting);
                        }
                        else if (data.jsonDataSource.source.json()) {
                            this._jsonStringSettings.setValue(data.jsonDataSource);
                            this._selectedSource(this._jsonStringSettings);
                        }
                    };
                    JsonDataSourceJsonSourcePage.prototype.reset = function () {
                        this._jsonStringSettings.reset();
                        this._jsonUriSetting.reset();
                        this._selectedSource(this._jsonUriSetting);
                    };
                    JsonDataSourceJsonSourcePage.prototype.commit = function (data) {
                        data.jsonDataSource = data.jsonDataSource || new Data.JsonDataSource({});
                        this._selectedSource().applySettings(data.jsonDataSource);
                    };
                    return JsonDataSourceJsonSourcePage;
                }(WizardPage));
                Legacy.JsonDataSourceJsonSourcePage = JsonDataSourceJsonSourcePage;
                var ConfigureQueryParametersPage = (function (_super) {
                    __extends(ConfigureQueryParametersPage, _super);
                    function ConfigureQueryParametersPage(wizard, parametersConverter) {
                        if (parametersConverter === void 0) { parametersConverter = {
                            createParameterViewModel: function (parameter) { return parameter; },
                            getParameterFromViewModel: function (parameterViewModel) { return parameterViewModel; }
                        }; }
                        var _this = _super.call(this, wizard) || this;
                        _this.parametersConverter = parametersConverter;
                        _this.template = "dxrd-page-configure-parameters";
                        _this.description = Analytics.Utils.getLocalization("Configure query parameters.", "AnalyticsCoreStringId.SqlDSWizard_PageConfigureParameters");
                        _this.removeButtonTitle = Analytics.Utils.getLocalization("Remove", "DataAccessUIStringId.Button_Remove");
                        _this.actionPrevious.isDisabled(false);
                        _this.actionNext.isDisabled(true);
                        _this.actionFinish.isDisabled(false);
                        _this.parametersEditorOptions = {
                            addHandler: function () {
                                return _this.parametersConverter.createParameterViewModel(new Data.DataSourceParameter({
                                    "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(_this.parametersEditorOptions.values.peek().peek(), "param"),
                                    "@Type": "System.Int32"
                                }));
                            },
                            values: ko.observable(ko.observableArray([])),
                            displayName: "Parameters",
                            level: 0,
                            info: ko.observable({
                                displayName: "Parameters", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Parameters",
                                propertyName: "parameters",
                                modelName: "Parameter",
                                array: true,
                                editor: DevExpress.Analytics.Widgets.editorTemplates.commonCollection,
                                template: "#dxrd-parameter-collection-item"
                            }),
                            editorTemplate: "#dxrd-wizard-datasource-parameters",
                            hideButtons: ko.observable(false),
                            collapsed: false
                        };
                        return _this;
                    }
                    ConfigureQueryParametersPage.prototype.getParameters = function () {
                        return this.parametersEditorOptions.values()();
                    };
                    ConfigureQueryParametersPage.prototype._begin = function (data) {
                        var _this = this;
                        this.parametersEditorOptions.hideButtons(data.sqlQuery.type() === Data.Utils.SqlQueryType.storedProcQuery);
                        this.parametersEditorOptions.values(ko.observableArray(data.sqlQuery.parameters().map(function (item) { return _this.parametersConverter.createParameterViewModel(item); })));
                        this.validateParameters();
                    };
                    ConfigureQueryParametersPage.prototype.commit = function (data) {
                        var _this = this;
                        _super.prototype.commit.call(this, data);
                        data.sqlQuery.parameters(this.parametersEditorOptions.values()().map(function (item) { return _this.parametersConverter.getParameterFromViewModel(item); }));
                    };
                    return ConfigureQueryParametersPage;
                }(CommonParametersPage));
                Legacy.ConfigureQueryParametersPage = ConfigureQueryParametersPage;
                var CreateQueryPage = (function (_super) {
                    __extends(CreateQueryPage, _super);
                    function CreateQueryPage(wizard, callbacks, disableCustomSql, rtl) {
                        if (callbacks === void 0) { callbacks = {}; }
                        if (disableCustomSql === void 0) { disableCustomSql = false; }
                        if (rtl === void 0) { rtl = false; }
                        var _this = _super.call(this, wizard) || this;
                        _this._dataSource = function () {
                            return _this._data && _this._data.sqlDataSource;
                        };
                        _this._connection = function () {
                            return _this._data && _this._data.sqlDataSource && _this._data.sqlDataSource.connection;
                        };
                        _this.template = "dxrd-wizard-create-query-page";
                        _this.description = DevExpress.Analytics.Utils.getLocalization("Create a query or select a stored procedure", DevExpress.Analytics.Internal.StringId.WizardPageConfigureQuery);
                        _this.queryTypeItems = [CreateQueryPage.QUERY_TEXT, CreateQueryPage.SP_TEXT];
                        _this.selectedQueryType = ko.observable();
                        _this.queryControl = ko.observable();
                        _this.runQueryBuilderBtnText = ko.pureComputed(function () {
                            return (!_this._selectStatementControl.sqlString() || _this._selectStatementControl.getQuery().type() === Data.Utils.SqlQueryType.tableQuery) ?
                                Analytics.Utils.getLocalization("Run Query Builder...", "DataAccessUIStringId.Button_QueryBuilder") :
                                Analytics.Utils.getLocalization("Create New Query...", "AnalyticsCoreStringId.SqlDSWizard_CreateNewQuery");
                        });
                        _this._proceduresList = new Internal.StoredProceduresQueryControl();
                        _this._selectStatementControl = new Internal.SelectStatementQueryControl(new Internal.SelectQuerySqlTextProvider(QueryBuilder.Internal.wrapGetSelectStatement(callbacks.selectStatement), _this._connection), disableCustomSql);
                        _this.selectedQueryType.subscribe(function (value) {
                            if (value === CreateQueryPage.SP_TEXT) {
                                _this._wrapWizardIndicator(function () {
                                    return _this._dataSource().dbSchemaProvider.getDbStoredProcedures().done(function (procedures) {
                                        _this._proceduresList.storedProcedures([]);
                                        _this._proceduresList.storedProcedures(procedures);
                                    });
                                });
                                _this.queryControl(_this._proceduresList);
                            }
                            else {
                                _this.queryControl(_this._selectStatementControl);
                            }
                        });
                        _this.selectedQueryType(CreateQueryPage.QUERY_TEXT);
                        _this.popupQueryBuilder = new Internal.QueryBuilderPopup(function (newQuery, isInProcess) {
                            return _this._selectStatementControl.setQuery(newQuery, isInProcess);
                        }, rtl, callbacks.customizeQBInitData);
                        _this.actionPrevious.isDisabled = ko.pureComputed(function () { return _this.wizard.indicatorVisible(); });
                        _this.actionNext.isDisabled = ko.pureComputed(function () { return _this.wizard.indicatorVisible() || _this.queryControl().isNextDisabled(); });
                        _this.actionFinish.isDisabled = ko.pureComputed(function () { return _this.wizard.indicatorVisible() || _this.queryControl().isFinishDisabled(); });
                        _this.actionCancel.handler = function () {
                            _this.wizard.indicatorVisible(false);
                            wizard.cancel();
                        };
                        return _this;
                    }
                    CreateQueryPage.prototype._wrapWizardIndicator = function (callBack) {
                        var _this = this;
                        this.wizard.indicatorVisible(true);
                        callBack().always(function () { _this.wizard.indicatorVisible(false); });
                    };
                    CreateQueryPage.prototype.runQueryBuilder = function () {
                        var _this = this;
                        this._wrapWizardIndicator(function () {
                            return _this._dataSource().dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                                var query = _this.queryControl().getQuery();
                                if (query.type() === Data.Utils.SqlQueryType.tableQuery) {
                                    _this.popupQueryBuilder.show(query, _this._dataSource());
                                }
                                else {
                                    _this.popupQueryBuilder.show(new Data.TableQuery({ "@Name": query.name() }, _this._dataSource()), _this._dataSource());
                                }
                            });
                        });
                    };
                    CreateQueryPage.prototype.localizeQueryType = function (queryTypeString) {
                        return CreateQueryPage.QUERY_TEXT === queryTypeString ?
                            Analytics.Utils.getLocalization(CreateQueryPage.QUERY_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_Query") :
                            Analytics.Utils.getLocalization(CreateQueryPage.SP_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_StoredProcedure");
                    };
                    CreateQueryPage.prototype._begin = function (data) {
                        if (this._data !== data || !data.sqlQuery) {
                            this._data = data;
                            this._proceduresList.setQuery(new Data.StoredProcQuery({ "@Name": data.sqlQuery && data.sqlQuery.name() }, data.sqlDataSource));
                            this._selectStatementControl.setQuery(new Data.CustomSqlQuery({ "@Name": data.sqlQuery && data.sqlQuery.name() }, data.sqlDataSource));
                            this.selectedQueryType(CreateQueryPage.QUERY_TEXT);
                        }
                        if (data.sqlQuery) {
                            this.selectedQueryType(data.sqlQuery.type() === Data.Utils.SqlQueryType.storedProcQuery ? CreateQueryPage.SP_TEXT : CreateQueryPage.QUERY_TEXT);
                            this.queryControl().setQuery(data.sqlQuery, this.wizard.indicatorVisible);
                        }
                        this.popupQueryBuilder.isVisible(false);
                    };
                    CreateQueryPage.prototype.commit = function (data) {
                        var query = this.queryControl().getQuery();
                        if (query) {
                            if (!query.name() || !data.sqlQuery || data.sqlQuery.name() !== query.name())
                                query.name(Data.Internal.generateQueryUniqueName(data.sqlDataSource.queries(), query));
                            data.sqlQuery = query;
                        }
                    };
                    CreateQueryPage.QUERY_TEXT = "Query";
                    CreateQueryPage.SP_TEXT = "Stored Procedure";
                    return CreateQueryPage;
                }(WizardPage));
                Legacy.CreateQueryPage = CreateQueryPage;
                var SelectConnectionString = (function (_super) {
                    __extends(SelectConnectionString, _super);
                    function SelectConnectionString(wizard, connectionStrings, _showPageForSingleConnectionString) {
                        if (_showPageForSingleConnectionString === void 0) { _showPageForSingleConnectionString = false; }
                        var _this = _super.call(this, wizard) || this;
                        _this._showPageForSingleConnectionString = _showPageForSingleConnectionString;
                        _this.template = "dxrd-page-connectionstring";
                        _this.description = Analytics.Utils.getLocalization("Choose a data connection", "AnalyticsCoreStringId.SqlDSWizard_PageChooseConnection");
                        _this.connectionStrings = ko.observableArray([]);
                        _this.selectedConnectionString = ko.observableArray([]);
                        _this.actionPrevious.isVisible(true);
                        _this.actionNext.isDisabled = ko.pureComputed(function () {
                            return _this.selectedConnectionString().length === 0;
                        });
                        _this.actionFinish.isDisabled(true);
                        _this.connectionStrings = connectionStrings;
                        return _this;
                    }
                    SelectConnectionString.prototype._begin = function (data) {
                        var connectionStrings = this.connectionStrings();
                        if (data.sqlDataSource.name()) {
                            this.isVisible = false;
                            this.selectedConnectionString([]);
                        }
                        else if (connectionStrings.length === 1) {
                            this.selectedConnectionString([connectionStrings[0]]);
                            this.isVisible = this._showPageForSingleConnectionString;
                        }
                        else {
                            var selectedString = Analytics.Internal.getFirstItemByPropertyValue(connectionStrings, "name", data.sqlDataSource.connection.name()) || connectionStrings[0];
                            this.selectedConnectionString(selectedString ? [selectedString] : []);
                            this.isVisible = true;
                        }
                    };
                    SelectConnectionString.prototype.commit = function (data) {
                        if (this.selectedConnectionString()[0]) {
                            data.sqlDataSource.connection.name(this.selectedConnectionString()[0].name);
                            data.sqlDataSource.connection.parameteres(null);
                            data.sqlDataSource.connection.fromAppConfig(true);
                        }
                    };
                    return SelectConnectionString;
                }(WizardPage));
                Legacy.SelectConnectionString = SelectConnectionString;
                var SqlDataSourceWizard = (function (_super) {
                    __extends(SqlDataSourceWizard, _super);
                    function SqlDataSourceWizard(connectionStrings, wizardSettings, callbacks, disableCustomSql, rtl) {
                        if (callbacks === void 0) { callbacks = {}; }
                        if (disableCustomSql === void 0) { disableCustomSql = false; }
                        if (rtl === void 0) { rtl = false; }
                        var _this = _super.call(this) || this;
                        _this.title = Analytics.Utils.getLocalization("Data Source Wizard", "AnalyticsCoreStringId.DSWizard_Title");
                        _this.extendCssClass = "dxrd-sqldatasource-wizard";
                        _this.container = Analytics.Internal.getParentContainer;
                        wizardSettings = wizardSettings || DataSourceWizardSettings.prototype.createDefault();
                        _this.finishCallback = callbacks.finishCallback;
                        _this.steps = [
                            new ChooseDataSourceTypePage(_this, wizardSettings),
                            new JsonSelectConnectionString(_this, connectionStrings.json, ko.pureComputed(function () { return connectionStrings.json().length > 0; })),
                            new JsonDataSourceJsonSourcePage(_this),
                            new JsonDataSourceFieldsPage(_this),
                            new SelectConnectionString(_this, connectionStrings.sql, false),
                            new CreateQueryPage(_this, callbacks, disableCustomSql, rtl),
                            new ConfigureQueryParametersPage(_this)
                        ];
                        _this.connectionStrings = connectionStrings;
                        return _this;
                    }
                    SqlDataSourceWizard.prototype.start = function (wizardModel, finishCallback) {
                        this._wizardModel = wizardModel || new DataSourceWizardModel();
                        _super.prototype.start.call(this, this._wizardModel, WizardViewModel.chainCallbacks(finishCallback, this.finishCallback));
                    };
                    return SqlDataSourceWizard;
                }(WizardViewModel));
                Legacy.SqlDataSourceWizard = SqlDataSourceWizard;
                var DataSourceWizardModel = (function () {
                    function DataSourceWizardModel(dataSource, queryName) {
                        var _this = this;
                        this.jsonDataSourceConnectionName = ko.observable(null);
                        this.dataSourceType = DataSourceType.Sql;
                        this.sqlDataSource = dataSource || new Data.SqlDataSource({});
                        if (queryName) {
                            this.sqlDataSource.queries().some(function (value, index) {
                                if (value.name() === queryName) {
                                    _this._queryIndex = index;
                                    return true;
                                }
                                return false;
                            });
                        }
                        else {
                            this._queryIndex = this.sqlDataSource.queries().length;
                        }
                    }
                    Object.defineProperty(DataSourceWizardModel.prototype, "sqlQuery", {
                        get: function () {
                            return this.sqlDataSource.queries()[this._queryIndex];
                        },
                        set: function (val) {
                            if (val)
                                val.parent = this.sqlDataSource;
                            this.sqlDataSource.queries()[this._queryIndex] = val;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DataSourceWizardModel.prototype.getQueryIndex = function () {
                        return this._queryIndex;
                    };
                    return DataSourceWizardModel;
                }());
                Legacy.DataSourceWizardModel = DataSourceWizardModel;
            })(Legacy = Wizard.Legacy || (Wizard.Legacy = {}));
            (function (Internal) {
                var JsonStringEditor = (function (_super) {
                    __extends(JsonStringEditor, _super);
                    function JsonStringEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
                        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
                        _this.aceEditorHasErrors = ko.observable(false);
                        _this.aceAvailable = Analytics.Widgets.Internal.aceAvailable;
                        _this.editorContainer = ko.observable();
                        _this.languageHelper = {
                            getLanguageMode: function () { return "ace/mode/json"; },
                            createCompleters: function () { return []; }
                        };
                        _this.aceOptions = {
                            showLineNumbers: false,
                            highlightActiveLine: false,
                            showPrintMargin: false,
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true
                        };
                        _this.isValid = ko.computed(function () {
                            return _this._model() && _this._model().isValid();
                        });
                        _this.additionalOptions = {
                            onChangeAnnotation: function (session) {
                                var annotations = session && session.getAnnotations() || [];
                                _this._model() && _this._model().aceEditorHasErrors && _this._model().aceEditorHasErrors(annotations.filter(function (annotation) { return annotation.type === "error" || annotation.type === "warning"; }).length > 0);
                            },
                            onBlur: function () {
                                var editorContainer = _this.editorContainer();
                                if (editorContainer) {
                                    _this.value(editorContainer.getValue());
                                }
                            }
                        };
                        _this.jsonStringValidationRules = [{
                                type: "custom",
                                reevaluate: true,
                                validationCallback: function (options) { return _this.isValid(); },
                                get message() {
                                    return Internal.getLocalizedValidationErrorMessage(Analytics.Utils.getLocalization('The value cannot be empty and should have a valid format.', 'AnalyticsCoreStringId.ValueIsRequiredOrInvalidFormat_Error'), Analytics.Utils.getLocalization('JSON String:', 'DataAccessUIStringId.WizardPageChooseJsonSource_Custom'));
                                }
                            }];
                        return _this;
                    }
                    JsonStringEditor.prototype.uploadFile = function (e) {
                        var _this = this;
                        if (e && e.event) {
                            e.event.stopPropagation();
                            e.event.preventDefault();
                        }
                        Analytics.Internal.uploadFile({
                            accept: ".json,.txt"
                        }).done(function (result) {
                            var fileContent = atob(result.content);
                            if (fileContent.indexOf("ï»¿") === 0) {
                                fileContent = fileContent.substr("ï»¿".length);
                            }
                            _this.value(fileContent);
                        });
                    };
                    JsonStringEditor.prototype.getUploadTitle = function () {
                        return Analytics.Utils.getLocalization("Upload JSON File", "AnalyticsCoreStringId.UploadJsonFile_Title");
                    };
                    return JsonStringEditor;
                }(Analytics.Widgets.Editor));
                Internal.JsonStringEditor = JsonStringEditor;
            })(Internal = Wizard.Internal || (Wizard.Internal = {}));
            (function (Internal) {
                function getLocalizedValidationErrorMessage(emptyValueErrorMessage, localizedPropertyName, subProperty) {
                    var requiredMessageSuffix = emptyValueErrorMessage || Analytics.Utils.getLocalization('The value cannot be empty', "AnalyticsCoreStringId.ParametersPanel_DateTimeValueValidationError");
                    if (!localizedPropertyName)
                        return requiredMessageSuffix;
                    var propertyNamesPrefix = !subProperty ? localizedPropertyName : Analytics.Internal.formatUnicorn("{0}. {1}", localizedPropertyName, subProperty);
                    if (!Analytics.Utils._stringEndsWith(propertyNamesPrefix, ":"))
                        propertyNamesPrefix += ":";
                    return Analytics.Internal.formatUnicorn("{0} {1}", propertyNamesPrefix, requiredMessageSuffix);
                }
                Internal.getLocalizedValidationErrorMessage = getLocalizedValidationErrorMessage;
                var JsonDataSourceJsonSourcePageSettingsBase = (function (_super) {
                    __extends(JsonDataSourceJsonSourcePageSettingsBase, _super);
                    function JsonDataSourceJsonSourcePageSettingsBase() {
                        var _this = _super.call(this) || this;
                        _this._validationGroup = null;
                        _this._validationSummary = null;
                        _this.validationGroup = {
                            onInitialized: function (args) { return _this._onValidationGroupInitialized(args); },
                            onDisposing: function (args) { return _this._onValidationGroupDisposing(args); },
                            validate: function () { return _this._validate(); }
                        };
                        _this.validationSummary = {
                            onInitialized: function (args) { return _this._onValidationSummaryInitialized(args); },
                            onDisposing: function (args) { return _this._onValidationSummaryDisposing(args); }
                        };
                        _this._disposables.push(_this.grid = new Analytics.Widgets.ObjectProperties(ko.observable(_this)));
                        return _this;
                    }
                    JsonDataSourceJsonSourcePageSettingsBase.prototype.dispose = function () {
                        this._validationSummary && this._validationSummary.dispose();
                        this._validationGroup && this._validationGroup.dispose();
                        this._validationSummary = null;
                        this._validationGroup = null;
                        _super.prototype.dispose.call(this);
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._onValidationGroupInitialized = function (args) {
                        this._validationGroup = args.component;
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._onValidationGroupDisposing = function (args) {
                        this._validationGroup = null;
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._onValidationSummaryInitialized = function (args) {
                        var _this = this;
                        this._validationSummary = args.component;
                        setTimeout(function () { return _this._validate(); }, 1);
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._onValidationSummaryDisposing = function (args) {
                        this._validationSummary = null;
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._repaintSummary = function () {
                        this._validationSummary && this._validationSummary.repaint();
                    };
                    JsonDataSourceJsonSourcePageSettingsBase.prototype._validate = function () {
                        this._validationSummary && this._validationGroup && this._validationGroup.validate();
                    };
                    return JsonDataSourceJsonSourcePageSettingsBase;
                }(Analytics.Utils.Disposable));
                Internal.JsonDataSourceJsonSourcePageSettingsBase = JsonDataSourceJsonSourcePageSettingsBase;
                var JsonDataSourceJsonSourcePageStringSettings = (function (_super) {
                    __extends(JsonDataSourceJsonSourcePageStringSettings, _super);
                    function JsonDataSourceJsonSourcePageStringSettings() {
                        var _this = _super.call(this) || this;
                        _this._validatorsReady = ko.observable(false);
                        _this.isValid = ko.pureComputed(function () {
                            var isJsonValid = _this._isJsonSourceValid(_this.stringSource());
                            var aceHasErrors = _this.aceEditorHasErrors();
                            return isJsonValid && !aceHasErrors;
                        });
                        _this.validationGroup = null;
                        _this.validationSummary = null;
                        _this.stringSource = ko.observable("");
                        _this.aceEditorHasErrors = ko.observable(false);
                        _this.cssClass = { 'dxrd-wizard-json-string-source-grid': true };
                        _this._disposables.push(_this.grid = new Analytics.Widgets.ObjectProperties(ko.observable(_this)));
                        return _this;
                    }
                    JsonDataSourceJsonSourcePageStringSettings.prototype.onChange = function (_onChange) {
                        var _this = this;
                        var timeoutId = null;
                        var localOnChange = function () {
                            _onChange();
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(function () { return _this._validate(); }, 1);
                        };
                        this._disposables.push(this.stringSource.subscribe(function (newVal) { return localOnChange(); }));
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype._isJsonSourceValid = function (jsonString) {
                        if (!jsonString)
                            return false;
                        var isJsonSourceValid = true;
                        try {
                            JSON.parse(jsonString);
                        }
                        catch (ex) {
                            isJsonSourceValid = false;
                        }
                        return isJsonSourceValid;
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype.isEmpty = function () {
                        return !this.stringSource();
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype.reset = function () {
                        this.stringSource("");
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype.setValue = function (dataSource) {
                        this.stringSource(dataSource.source.json());
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype.getInfo = function () {
                        return [
                            {
                                propertyName: "stringSource", defaultVal: "", displayName: "JSON String", editor: {
                                    header: "dx-jsonwizard-jsonstring-editor", editorType: Wizard.Internal.JsonStringEditor, custom: "dx-property-json-string-editor"
                                }
                            }
                        ];
                    };
                    JsonDataSourceJsonSourcePageStringSettings.prototype.applySettings = function (jsonDataSource) {
                        jsonDataSource.source.uri(undefined);
                        jsonDataSource.source.json(this.stringSource());
                        jsonDataSource.source.authenticationInfo = new Data.JsonAuthenticationInfo({});
                        jsonDataSource.source.headers([]);
                        jsonDataSource.source.queryParameters([]);
                    };
                    return JsonDataSourceJsonSourcePageStringSettings;
                }(JsonDataSourceJsonSourcePageSettingsBase));
                Internal.JsonDataSourceJsonSourcePageStringSettings = JsonDataSourceJsonSourcePageStringSettings;
                var JsonDataSourceJsonSourcePageUriSettings = (function (_super) {
                    __extends(JsonDataSourceJsonSourcePageUriSettings, _super);
                    function JsonDataSourceJsonSourcePageUriSettings(_requestWrapper) {
                        var _this = _super.call(this) || this;
                        _this._requestWrapper = _requestWrapper;
                        _this._isUriValid = ko.observable(false);
                        _this._lastValidatedJsonSourceJSON = "";
                        _this._authNameValidatorInstance = null;
                        _this._collectionItemNamePlaceholder = Analytics.Utils.getLocalization("Name", "AnalyticsCoreStringId.CollectionEditor_Name_Placeholder");
                        _this._lastValidateDeferred = null;
                        _this._sourceUriValidatorsReady = ko.observable(true);
                        _this._basicAuthValidatorsReady = ko.observable(false);
                        _this._validationRequested = ko.observable(false).extend({ deferred: true });
                        _this._noEmptyProperties = ko.pureComputed(function () {
                            var isBasicHttpAuthValid = _this._isBasicHttpAuthValid();
                            var isHeadersValid = _this._isHeadersValid();
                            var isQueryParametersValid = _this._isQueryParametersValid();
                            var sourceUriNotEmpty = !!_this.sourceUri();
                            return isBasicHttpAuthValid && isHeadersValid && isQueryParametersValid && sourceUriNotEmpty;
                        });
                        _this._lastValidationMessage = ko.observable();
                        _this._getSerializedUriSource = function (jsonDataSource) {
                            if (jsonDataSource === void 0) { jsonDataSource = new Analytics.Data.JsonDataSource({}); }
                            _this.applySettings(jsonDataSource);
                            return JSON.stringify(jsonDataSource.source.serialize(true));
                        };
                        _this._sourceUriValidationCallback = function (params) {
                            if (!_this._lastValidationMessage())
                                _this._lastValidationMessage(Analytics.Utils.getLocalization("Validation...", "AnalyticsCoreStringId.Validation"));
                            var serverValidationResult = false;
                            var serializedJsonSource = _this._getSerializedUriSource();
                            if (serializedJsonSource != _this._lastValidatedJsonSourceJSON) {
                                _this._validateUriSource().done(function (result) {
                                    serverValidationResult = params.rule.isValid = result.isUriValid;
                                    result.faultMessage && (params.rule.message = result.faultMessage);
                                    _this._lastValidationMessage(result.faultMessage);
                                    params.validator.validate();
                                    setTimeout(function () { return _this._repaintSummary(); }, 1);
                                });
                            }
                            return serverValidationResult;
                        };
                        _this.isValid = ko.pureComputed(function () {
                            var isPropertiesNotEmpty = _this._noEmptyProperties();
                            var isUriValid = _this._isUriValid();
                            return isPropertiesNotEmpty && isUriValid;
                        });
                        _this._validatorsReady = ko.pureComputed({
                            read: function () {
                                var sourceUriValidatorReady = _this._sourceUriValidatorsReady();
                                var authIsEmpty = !_this.basicHttpAuth.password() && !_this.basicHttpAuth.userName();
                                var authInitialized = _this._basicAuthValidatorsReady();
                                return sourceUriValidatorReady && (authInitialized || authIsEmpty);
                            },
                            write: function (newVal) {
                                _this._basicAuthValidatorsReady(newVal);
                            }
                        });
                        _this.sourceUri = ko.observable("");
                        _this.basicHttpAuth = {
                            password: ko.observable(""),
                            userName: ko.observable(""),
                        };
                        _this.queryParameters = ko.observableArray([]);
                        _this.headers = ko.observableArray([]);
                        _this._disposables.push(_this.grid = new Analytics.Widgets.ObjectProperties(ko.observable(_this)));
                        _this._disposables.push(ko.computed(function () {
                            var editorsInitialized = _this._validatorsReady();
                            var validationRequested = _this._validationRequested();
                            if (editorsInitialized && validationRequested) {
                                _this._validate();
                            }
                        }));
                        _this._disposables.push(_this._validatorsReady);
                        return _this;
                    }
                    JsonDataSourceJsonSourcePageUriSettings.prototype._validateUriSource = function () {
                        var _this = this;
                        var defaultValidationErrorMessage = Analytics.Utils.getLocalization('Invalid URI.', "AnalyticsCoreStringId.ReportDesigner_Wizard_JsonSource_UriValidationError");
                        var endpointUriDisplayName = Analytics.Utils.getLocalization('Web Service Endpoint (URI):', 'DataAccessUIStringId.WizardPageChooseJsonSource_URI');
                        this._isUriValid(false);
                        if (this._lastValidateDeferred) {
                            this._lastValidateDeferred.reject();
                        }
                        var resultDeferred = $.Deferred();
                        this._lastValidateDeferred = resultDeferred;
                        try {
                            var jsonDataSource = new Analytics.Data.JsonDataSource({});
                            var serializedJsonSource = this._getSerializedUriSource(jsonDataSource);
                            this._lastValidatedJsonSourceJSON = serializedJsonSource;
                            var validationResultHandler = function (data) {
                                if (resultDeferred.state && resultDeferred.state() === "rejected")
                                    return;
                                _this._isUriValid(data.isUriValid);
                                var faultMessage = Internal.getLocalizedValidationErrorMessage(data.isUriValid ? "" : data && data.faultMessage || defaultValidationErrorMessage, endpointUriDisplayName);
                                resultDeferred.resolve({
                                    isUriValid: data.isUriValid,
                                    faultMessage: faultMessage
                                });
                            };
                            this._requestWrapper.validateJsonUri(jsonDataSource)
                                .done(validationResultHandler)
                                .fail(function (data) {
                                if (data === void 0) { data = {}; }
                                data.isValid = false;
                                validationResultHandler(data);
                            });
                        }
                        catch (ex) {
                            this._isUriValid(false);
                        }
                        return resultDeferred.promise();
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._isCollectionValid = function (collectionName) {
                        return !this[collectionName]().length || this[collectionName]().every(function (x) { return x.name(); });
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._isHeadersValid = function () {
                        return this._isCollectionValid("headers");
                    };
                    ;
                    JsonDataSourceJsonSourcePageUriSettings.prototype._isQueryParametersValid = function () {
                        return this._isCollectionValid("queryParameters");
                    };
                    ;
                    JsonDataSourceJsonSourcePageUriSettings.prototype._isBasicHttpAuthValid = function () {
                        return !this.basicHttpAuth.password() || !!this.basicHttpAuth.userName();
                    };
                    ;
                    JsonDataSourceJsonSourcePageUriSettings.prototype._getSourceUriInfo = function () {
                        var _this = this;
                        var sourceUri = {
                            propertyName: "sourceUri",
                            displayName: "Web Service Endpoint (URI):",
                            localizationId: "DataAccessUIStringId.WizardPageChooseJsonSource_URI",
                            defaultVal: "",
                            editor: Analytics.Widgets.editorTemplates.text,
                            validatorOptions: null
                        };
                        var _self = this;
                        sourceUri.validatorOptions = {
                            onInitialized: function (e) {
                                _this._sourceUriValidatorsReady(true);
                            },
                            onDisposed: function () {
                                _this._sourceUriValidatorsReady(false);
                            },
                            validationRules: [{
                                    type: 'required',
                                    get message() {
                                        return getLocalizedValidationErrorMessage(null, Analytics.Utils.getLocalization(sourceUri.displayName, sourceUri.localizationId));
                                    }
                                }, {
                                    type: "custom",
                                    assignValueFirst: true,
                                    isDeferred: ko.pureComputed(function () { return _this._noEmptyProperties(); }),
                                    get message() {
                                        return _self._lastValidationMessage();
                                    },
                                    validationCallback: this._sourceUriValidationCallback
                                }]
                        };
                        return sourceUri;
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._getBasicHttpAuthInfo = function () {
                        var _this = this;
                        var basicHttpAuthName = {
                            propertyName: "userName", displayName: "Username:", localizationId: "DataAccessUIStringId.WizardPageConfigureJsonConnection_UsernameText", editor: Analytics.Widgets.editorTemplates.text,
                            validatorOptions: undefined,
                        };
                        var basicHttpAuth = {
                            propertyName: "basicHttpAuth", displayName: "Basic HTTP Authentication", localizationId: "DataAccessUIStringId.WizardPageConfigureJsonConnection_BasicHttpAuthText", info: [
                                basicHttpAuthName,
                                { propertyName: "password", displayName: "Password:", localizationId: "DataAccessUIStringId.WizardPageConfigureJsonConnection_PasswordText", editor: Analytics.Widgets.editorTemplates.text, editorOptions: { mode: "password" } },
                            ], editor: Analytics.Widgets.editorTemplates.objecteditor
                        };
                        var onValidatorInitialied = function (e) {
                            var authNmeValidatorInstance = e && e.component;
                            if (_this._authNameValidatorInstance && _this._authNameValidatorInstance != authNmeValidatorInstance) {
                                _this._authNameValidatorInstance.dispose();
                            }
                            _this._authNameValidatorInstance = authNmeValidatorInstance;
                            _this._basicAuthValidatorsReady(true);
                        };
                        var authNameValidatorDisposed = function () {
                            _this._authNameValidatorInstance = null;
                        };
                        basicHttpAuthName.validatorOptions = {
                            onInitialized: onValidatorInitialied,
                            onDisposed: authNameValidatorDisposed,
                            validationRules: [{
                                    type: "custom",
                                    reevaluate: true,
                                    assignValueFirst: true,
                                    get message() {
                                        return getLocalizedValidationErrorMessage(null, Analytics.Utils.getLocalization(basicHttpAuth.displayName, basicHttpAuth.localizationId), Analytics.Utils.getLocalization(basicHttpAuthName.displayName, basicHttpAuthName.localizationId));
                                    },
                                    validationCallback: function (params) {
                                        return _this._isBasicHttpAuthValid();
                                    }
                                }]
                        };
                        return basicHttpAuth;
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._getQueryParametersInfo = function () {
                        var queryParameters = {
                            propertyName: "queryParameters", displayName: "Query Parameters", localizationId: "DataAccessUIStringId.WizardPageConfigureJsonConnection_QueryParametersText",
                            array: true,
                            addHandler: function () { return Data.JsonQueryParameter.from({}); },
                            editor: Analytics.Widgets.editorTemplates.commonCollection,
                            editorOptions: null,
                            template: '#dx-jsonwizard-parametercollection'
                        };
                        queryParameters.editorOptions = {
                            nameValidationRules: [{
                                    type: "required",
                                    get message() {
                                        return getLocalizedValidationErrorMessage(null, Analytics.Utils.getLocalization(queryParameters.displayName, queryParameters.localizationId), this._collectionItemNamePlaceholder);
                                    }
                                }]
                        };
                        return queryParameters;
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._getHttpHeadersInfo = function () {
                        var httpHeaders = {
                            propertyName: "headers", displayName: "HTTP Headers", localizationId: "DataAccessUIStringId.WizardPageConfigureJsonConnection_HttpHeadersText",
                            array: true,
                            addHandler: function () { return Data.JsonHeaderParameter.from({}); },
                            editor: Analytics.Widgets.editorTemplates.commonCollection,
                            editorOptions: null,
                            template: '#dx-jsonwizard-parametercollection'
                        };
                        httpHeaders.editorOptions = {
                            nameValidationRules: [{
                                    type: "required",
                                    get message() {
                                        return getLocalizedValidationErrorMessage(null, Analytics.Utils.getLocalization(httpHeaders.displayName, httpHeaders.localizationId), this._collectionItemNamePlaceholder);
                                    }
                                }]
                        };
                        return httpHeaders;
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.applySettings = function (jsonDataSource) {
                        jsonDataSource.source.uri(this.sourceUri());
                        jsonDataSource.source.json(undefined);
                        jsonDataSource.source.authenticationInfo.password(this.basicHttpAuth.password());
                        jsonDataSource.source.authenticationInfo.userName(this.basicHttpAuth.userName());
                        jsonDataSource.source.headers(this.headers());
                        jsonDataSource.source.queryParameters(this.queryParameters());
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.getInfo = function () {
                        var sourceUri = this._getSourceUriInfo();
                        var basicHttpAuth = this._getBasicHttpAuthInfo();
                        var queryParameters = this._getQueryParametersInfo();
                        var httpHeaders = this._getHttpHeadersInfo();
                        return [sourceUri, basicHttpAuth, queryParameters, httpHeaders];
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.reset = function () {
                        this.sourceUri("");
                        this.basicHttpAuth.password("");
                        this.basicHttpAuth.userName("");
                        this.headers([]);
                        this.queryParameters([]);
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.setValue = function (dataSource) {
                        this.sourceUri(dataSource.source.uri());
                        this.basicHttpAuth.userName(dataSource.source.authenticationInfo.userName());
                        this.basicHttpAuth.password(dataSource.source.authenticationInfo.password());
                        this.headers(dataSource.source.headers());
                        this.queryParameters(dataSource.source.queryParameters());
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.dispose = function () {
                        this._authNameValidatorInstance && this._authNameValidatorInstance.dispose();
                        if (this._lastValidateDeferred) {
                            this._lastValidateDeferred.reject();
                            this._lastValidateDeferred = null;
                        }
                        _super.prototype.dispose.call(this);
                        this.disposeObservableArray(this.headers);
                        this.disposeObservableArray(this.queryParameters);
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.onChange = function (_onChange) {
                        var _this = this;
                        var _a;
                        var timeoutId = null;
                        var localOnChange = function () {
                            _onChange();
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(function () { return _this._validate(); }, 1);
                        };
                        (_a = this._disposables).push.apply(_a, Internal.subscribeProperties([this.sourceUri, this.basicHttpAuth.password, this.basicHttpAuth.userName], localOnChange));
                        [this.headers, this.queryParameters]
                            .forEach(function (arrayProperty) {
                            _this._disposables.push(Internal.subscribeArray(arrayProperty, function (item) {
                                var _a;
                                (_a = item._disposables).push.apply(_a, Internal.subscribeProperties([item.name, item.value], localOnChange));
                            }, localOnChange));
                        });
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype.isEmpty = function () {
                        return !this.sourceUri();
                    };
                    JsonDataSourceJsonSourcePageUriSettings.prototype._validate = function () {
                        if (this._validationSummary && this._validationGroup) {
                            if (this._validatorsReady()) {
                                this._validationGroup.validate();
                                this._validationRequested(false);
                            }
                            else {
                                this._validationRequested(true);
                            }
                        }
                    };
                    return JsonDataSourceJsonSourcePageUriSettings;
                }(JsonDataSourceJsonSourcePageSettingsBase));
                Internal.JsonDataSourceJsonSourcePageUriSettings = JsonDataSourceJsonSourcePageUriSettings;
            })(Internal = Wizard.Internal || (Wizard.Internal = {}));
            (function (Internal) {
                function subscribeArray(array, subscribeItem, onChange) {
                    array().forEach(function (item) { return subscribeItem(item, onChange); });
                    return array.subscribe(function (changeSet) {
                        changeSet.forEach(function (change) {
                            if (change.status === "added") {
                                subscribeItem(change.value, onChange);
                            }
                            else if (change.status === "deleted") {
                                change.value["dispose"] && change.value["dispose"]();
                            }
                        });
                        onChange();
                    }, null, "arrayChange");
                }
                Internal.subscribeArray = subscribeArray;
                function subscribeProperties(properties, onChange) {
                    var subscriptions = [];
                    properties.forEach(function (property) {
                        if (property && property.subscribe) {
                            subscriptions.push(property.subscribe(function () { return onChange(); }));
                        }
                    });
                    return subscriptions;
                }
                Internal.subscribeProperties = subscribeProperties;
                function subscribeObject(object, subscribeProperties, onChange) {
                    subscribeProperties(object(), onChange);
                    return object.subscribe(function (newVal) {
                        subscribeProperties(newVal, onChange);
                        onChange();
                    });
                }
                Internal.subscribeObject = subscribeObject;
                function _createBeforeInitializePageEventArgs(page, self) {
                    return {
                        page: page.page,
                        pageId: page.pageId,
                        wizard: self,
                        state: self.stateManager.getPageState(page.pageId)
                    };
                }
                Internal._createBeforeInitializePageEventArgs = _createBeforeInitializePageEventArgs;
                function _createPageEventArgs(page, self) {
                    return {
                        page: page.page,
                        pageId: page.pageId,
                        wizard: self
                    };
                }
                Internal._createPageEventArgs = _createPageEventArgs;
                var ParametersTreeListItem = (function (_super) {
                    __extends(ParametersTreeListItem, _super);
                    function ParametersTreeListItem(parameter, parent) {
                        var _this = _super.call(this) || this;
                        _this.parent = parent;
                        _this.editor = DevExpress.Analytics.Widgets.editorTemplates.commonCollection;
                        _this.isList = false;
                        _this.contenttemplate = "dx-treelist-accordion-contenttemplate-custom-with-actions";
                        _this.actionsTemplate = "dx-treelist-item-actions";
                        _this.dataSourceParameter = ko.observable(parameter);
                        _this._name = parameter.name;
                        return _this;
                    }
                    Object.defineProperty(ParametersTreeListItem.prototype, "name", {
                        get: function () {
                            return this._name();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ParametersTreeListItem.prototype, "displayName", {
                        get: function () {
                            return this.name;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ParametersTreeListItem.prototype.query = function () {
                        return this.parent.query();
                    };
                    return ParametersTreeListItem;
                }(Analytics.Utils.Disposable));
                Internal.ParametersTreeListItem = ParametersTreeListItem;
                var ParametersTreeListRootItem = (function () {
                    function ParametersTreeListRootItem(query) {
                        this.isList = true;
                        this.specifics = "List";
                        this.name = this.displayName = query.name();
                        this.parameters = ko.observableArray([]);
                        this._query = query;
                    }
                    ParametersTreeListRootItem.prototype.removeChild = function (parameter) {
                        this.parameters.remove(parameter);
                    };
                    ParametersTreeListRootItem.prototype.query = function () {
                        return this._query;
                    };
                    return ParametersTreeListRootItem;
                }());
                Internal.ParametersTreeListRootItem = ParametersTreeListRootItem;
                var ParametersTreeListController = (function (_super) {
                    __extends(ParametersTreeListController, _super);
                    function ParametersTreeListController(rootItems, createNewParameter) {
                        var _this = _super.call(this) || this;
                        _this._createNewParameter = createNewParameter;
                        _this._rootItems = rootItems;
                        return _this;
                    }
                    ParametersTreeListController.prototype.hasItems = function (item) {
                        return item.isList;
                    };
                    ParametersTreeListController.prototype.getActions = function (treeListItem) {
                        var _this = this;
                        var actions = [];
                        if (!treeListItem.data)
                            return actions;
                        if (treeListItem.data.query().type() === Data.Utils.SqlQueryType.storedProcQuery) {
                            return treeListItem.data.isList ? [] : [DevExpress.Analytics.Widgets.Internal.treeListEditAction];
                        }
                        if (treeListItem.data.isList) {
                            var item = treeListItem.data;
                            actions.push({
                                clickAction: function () {
                                    return item.parameters.push(new ParametersTreeListItem(_this._createNewParameter(item.name, item.parameters()), item));
                                },
                                imageClassName: "dxrd-image-add",
                                imageTemplateName: "dxrd-svg-operations-add",
                                text: Analytics.Utils.getLocalization("Add parameter", "AnalyticsCoreStringId.FieldListActions_AddParameter")
                            });
                        }
                        else {
                            var parameter = treeListItem.data;
                            actions.push({
                                clickAction: function () {
                                    parameter.parent.removeChild(parameter);
                                },
                                imageClassName: "dxrd-image-recycle-bin",
                                imageTemplateName: "dxrd-svg-operations-recycle_bin",
                                text: Analytics.Utils.getLocalization("Remove parameter", "DataAccessUIStringId.Button_Remove"),
                            });
                            actions.push(DevExpress.Analytics.Widgets.Internal.treeListEditAction);
                        }
                        return actions;
                    };
                    ParametersTreeListController.prototype.canSelect = function (value) {
                        return true;
                    };
                    return ParametersTreeListController;
                }(Analytics.Widgets.Internal.TreeListController));
                Internal.ParametersTreeListController = ParametersTreeListController;
                var DBSchemaItemsProvider = (function () {
                    function DBSchemaItemsProvider(dbSchemaProvider, customQueries, showQbCallBack, disableCustomSql, afterCheckToggled) {
                        var _this = this;
                        this._callBack = ko.observable({
                            deleteAction: function (name) {
                                _this._customQueries
                                    .remove(Analytics.Internal.findFirstItemMatchesCondition(_this._customQueries(), function (item) { return (item.name() || item.generateName()) === name; }));
                            },
                            showQbCallBack: null,
                            disableCustomSql: false,
                        });
                        this._checkedRootNodesCount = ko.pureComputed(function () {
                            var count = 0;
                            for (var i = 0; i < _this._rootItems.length && count < 2; i++) {
                                count += _this._rootItems[i].countChecked();
                            }
                            return count;
                        });
                        this.hasCheckedItems = ko.pureComputed(function () {
                            return !(_this._checkedRootNodesCount() === 0);
                        });
                        this.nextButtonDisabled = ko.pureComputed(function () {
                            if (_this._checkedRootNodesCount() > 1) {
                                return false;
                            }
                            return !_this.hasParametersToEdit();
                        });
                        this.hasParametersToEdit = ko.pureComputed(function () {
                            for (var i = 0; i < _this._rootItems.length; i++) {
                                if (_this._rootItems[i]["hasParamsToEdit"] && _this._rootItems[i]["hasParamsToEdit"]())
                                    return true;
                            }
                            return false;
                        });
                        this.tables = function () { return _this._tables; };
                        this.views = function () { return _this._views; };
                        this.procedures = function () { return _this._procedures; };
                        this.queries = function () { return _this._queries; };
                        this.customQueries = function () { return _this._customQueries; };
                        this._callBack().showQbCallBack = showQbCallBack;
                        this._callBack().disableCustomSql = disableCustomSql;
                        this._tables = new TreeNode("tables", Analytics.Utils.getLocalization("Tables", "DataAccessStringId.ConfigureMultiQueryPage_TableCategory"), "list", false, afterCheckToggled);
                        this._views = new TreeNode("views", Analytics.Utils.getLocalization("Views", "DataAccessStringId.ConfigureMultiQueryPage_ViewCategory"), "list", false, afterCheckToggled);
                        this._procedures = new ParameterTreeNode("procedures", Analytics.Utils.getLocalization("Stored Procedures", "DataAccessStringId.ConfigureMultiQueryPage_SpCategory"), "list", false, afterCheckToggled);
                        this._queries = new QueriesTreeNode("queries", Analytics.Utils.getLocalization("Queries", "DataAccessStringId.ConfigureMultiQueryPage_QueryCategory"), "list", false, this._callBack, afterCheckToggled);
                        this._rootItems = [
                            this._tables,
                            this._views,
                            this._procedures,
                            this._queries
                        ];
                        this.getItems = function (pathRequest) {
                            var result = $.Deferred();
                            if (!pathRequest.fullPath) {
                                result.resolve(_this._rootItems);
                            }
                            else if (pathRequest.fullPath === "tables") {
                                dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                                    if (_this._tables.children().length === 0) {
                                        var tables = [];
                                        dbSchema.tables.forEach(function (table) {
                                            if (!table.isView) {
                                                tables.push(new TreeNode(table.name, table.name, "table", _this._tables.checked.peek(), afterCheckToggled));
                                            }
                                        });
                                        _this._tables.initializeChildren(tables);
                                        result.resolve(tables);
                                    }
                                    else {
                                        result.resolve(_this._tables.children());
                                    }
                                }).fail(result.reject);
                            }
                            else if (pathRequest.fullPath === "views") {
                                dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                                    if (_this._views.children().length === 0) {
                                        var views = [];
                                        dbSchema.tables.forEach(function (table) {
                                            if (table.isView) {
                                                views.push(new TreeNode(table.name, table.name, "view", _this._views.checked.peek(), afterCheckToggled));
                                            }
                                        });
                                        _this._views.initializeChildren(views);
                                        result.resolve(views);
                                    }
                                    else {
                                        result.resolve(_this._views.children());
                                    }
                                }).fail(result.reject);
                            }
                            else if (pathRequest.fullPath === "procedures") {
                                dbSchemaProvider.getDbStoredProcedures().done(function (storedProcedures) {
                                    if (_this._procedures.children().length === 0) {
                                        var procedures = storedProcedures.map(function (proc) {
                                            return new TreeLeafNode(proc.name, StoredProceduresQueryControl.generateStoredProcedureDisplayName(proc), "procedure", _this._procedures.checked.peek(), proc.arguments, afterCheckToggled);
                                        });
                                        _this._procedures.initializeChildren(procedures);
                                        result.resolve(procedures);
                                    }
                                    else {
                                        result.resolve(_this._procedures.children());
                                    }
                                }).fail(result.reject);
                            }
                            else if (pathRequest.fullPath === "queries") {
                                var queries = customQueries().map(function (query) {
                                    var name = query.name() || query.generateName();
                                    var currentQuery = _this._queries.children().filter(function (q) { return q.name === name; })[0];
                                    if (currentQuery)
                                        return currentQuery;
                                    var queryNode = new TreeQueryNode(name, name, "query", !!currentQuery && currentQuery.checked(), query.parameters, _this._callBack, afterCheckToggled);
                                    queryNode.setObservableName(ko.computed({
                                        read: function () { return query.name() || query.generateName(); },
                                        write: function (newVal) { return query.name(newVal); }
                                    }));
                                    return queryNode;
                                });
                                _this._queries.initializeChildren(queries);
                                result.resolve(queries);
                            }
                            else {
                                dbSchemaProvider.getDbTable(pathRequest.path).done(function (table) {
                                    var tableTreeNode;
                                    if (table.isView) {
                                        tableTreeNode = Analytics.Internal.findFirstItemMatchesCondition(_this._views.children(), function (item) { return item.name === table.name; });
                                    }
                                    else {
                                        tableTreeNode = Analytics.Internal.findFirstItemMatchesCondition(_this._tables.children(), function (item) { return item.name === table.name; });
                                    }
                                    if (tableTreeNode.children().length === 0) {
                                        var columns = table.columns.map(function (column) {
                                            return new TreeLeafNode(column.name, column.name, "column", tableTreeNode.checked.peek(), null, afterCheckToggled);
                                        });
                                        tableTreeNode.initializeChildren(columns);
                                        result.resolve(columns);
                                    }
                                    else {
                                        result.resolve(tableTreeNode.children());
                                    }
                                }).fail(result.reject);
                            }
                            return result.promise();
                        };
                        this._customQueries = customQueries;
                    }
                    return DBSchemaItemsProvider;
                }());
                Internal.DBSchemaItemsProvider = DBSchemaItemsProvider;
                var DBSchemaTreeListController = (function (_super) {
                    __extends(DBSchemaTreeListController, _super);
                    function DBSchemaTreeListController(_customizeDBSchemaTreeListActions) {
                        var _this = _super.call(this) || this;
                        _this._customizeDBSchemaTreeListActions = _customizeDBSchemaTreeListActions;
                        return _this;
                    }
                    DBSchemaTreeListController.prototype.getActions = function (value) {
                        if (!value.data)
                            return [];
                        if (!(value.data instanceof QueriesTreeNode || value.data instanceof TreeQueryNode))
                            return [];
                        var result = value.data.getActions(value);
                        this._customizeDBSchemaTreeListActions && this._customizeDBSchemaTreeListActions(value.data, result);
                        return result;
                    };
                    DBSchemaTreeListController.prototype.canSelect = function (value) {
                        return true;
                    };
                    return DBSchemaTreeListController;
                }(Analytics.Widgets.Internal.TreeListController));
                Internal.DBSchemaTreeListController = DBSchemaTreeListController;
                var QueryBuilderPopup = (function () {
                    function QueryBuilderPopup(applyNewQuery, rtl, customizeQBInitializationData) {
                        if (rtl === void 0) { rtl = false; }
                        if (customizeQBInitializationData === void 0) { customizeQBInitializationData = function (data) { return data; }; }
                        var _this = this;
                        this.customizeQBInitializationData = customizeQBInitializationData;
                        this._query = ko.observable(null);
                        this._dbSchemaProvider = ko.observable(null);
                        this.designer = ko.observable();
                        this.qbOptions = ko.observable(null);
                        this.okButtonDisabled = ko.pureComputed(function () { return _this.designer() && !_this.designer().model().isValid(); });
                        this.isVisible = ko.observable(false);
                        this.showLoadIndicator = ko.observable(false);
                        this.localizationIdMap = {
                            "title": { text: 'Query Builder', localizationId: 'DataAccessUIStringId.QueryBuilder' },
                            "loading": { text: 'Loading...', localizationId: 'AnalyticsCoreStringId.Loading' },
                            "previewResults": { text: 'Preview Results...', localizationId: 'DataAccessUIStringId.QueryBuilderButtons_PreviewResults' },
                            "cancel": { text: 'Cancel', localizationId: 'AnalyticsCoreStringId.SearchDialog_Cancel' },
                            "ok": { text: 'OK', localizationId: 'DataAccessUIStringId.Button_OK' }
                        };
                        this._applyQuery = applyNewQuery;
                        this._rtl = rtl;
                    }
                    QueryBuilderPopup.prototype.show = function (query, dataSource) {
                        this._dataSource = dataSource;
                        this._dbSchemaProvider(dataSource.dbSchemaProvider);
                        this._query(new DevExpress.Analytics.Utils.ModelSerializer().serialize(query));
                        this.qbOptions(this.qbOptions() || this.customizeQBInitializationData({
                            data: {
                                querySource: this._query,
                                dbSchemaProvider: this._dbSchemaProvider
                            },
                            callbacks: { customizeActions: QueryBuilderPopup.customizeQueryBuilderActions },
                            rtl: this._rtl
                        }));
                        this.isVisible(true);
                        this.designer().updateSurface();
                    };
                    QueryBuilderPopup.prototype.cancelHandler = function () {
                        this.isVisible(false);
                    };
                    QueryBuilderPopup.prototype.previewHandler = function () {
                        this.designer().showPreview();
                    };
                    QueryBuilderPopup.prototype.okHandler = function () {
                        var _this = this;
                        this._applyQuery(new Data.TableQuery(this.designer().model().serialize(), this._dataSource), this.showLoadIndicator)
                            .done(function () {
                            _this.isVisible(false);
                        });
                    };
                    QueryBuilderPopup.prototype.onHiddenHandler = function () {
                        this.designer().dataPreview.isVisible(false);
                    };
                    QueryBuilderPopup.prototype.popupViewModel = function (element) {
                        var $container = Analytics.Internal.getParentContainer(element);
                        return {
                            visible: this.isVisible,
                            title: this.getDisplayText('title'),
                            showTitle: true,
                            shading: true,
                            fullScreen: false,
                            width: '95%',
                            height: '95%',
                            container: $container,
                            position: { of: $container },
                            onHidden: this.onHiddenHandler
                        };
                    };
                    QueryBuilderPopup.prototype.getDisplayText = function (key) {
                        return DevExpress.Analytics.Utils.getLocalization(this.localizationIdMap[key].text, this.localizationIdMap[key].localizationId);
                    };
                    QueryBuilderPopup.customizeQueryBuilderActions = function (actions) {
                        var del = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Delete"; }), undo = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Undo"; }), redo = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Redo"; });
                        actions.splice(0, actions.length, del, undo, redo);
                    };
                    return QueryBuilderPopup;
                }());
                Internal.QueryBuilderPopup = QueryBuilderPopup;
                var SelectQuerySqlTextProvider = (function () {
                    function SelectQuerySqlTextProvider(_selectStatementCallback, _connection) {
                        this._selectStatementCallback = _selectStatementCallback;
                        this._connection = _connection;
                    }
                    SelectQuerySqlTextProvider.prototype.getQuerySqlText = function (newQuery) {
                        var queryJSON = JSON.stringify({ "Query": new DevExpress.Analytics.Utils.ModelSerializer().serialize(newQuery) });
                        return this._selectStatementCallback(this._connection(), queryJSON)
                            .fail(function (data) {
                            var error = Analytics.Internal.getErrorMessage(data);
                            Analytics.Internal.ShowMessage("Unable to build a SQL string" + (error ? ": " + error : "."));
                        });
                    };
                    return SelectQuerySqlTextProvider;
                }());
                Internal.SelectQuerySqlTextProvider = SelectQuerySqlTextProvider;
                var SelectStatementQueryControl = (function () {
                    function SelectStatementQueryControl(sqlTextProvider, disableCustomSql) {
                        var _this = this;
                        this._tableQueryString = ko.observable("");
                        this._query = ko.observable();
                        this._needToCustomizeParameters = ko.pureComputed(function () {
                            return _this._query() && (_this._query().type() === Data.Utils.SqlQueryType.customSqlQuery || _this._query().parameters().length > 0);
                        });
                        this.template = "dxrd-select-control";
                        this.aceOptions = DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLAceOptions();
                        this.additionalOptions = DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLAdditionalOptions(function (newVal) { _this.sqlString(newVal); });
                        this.aceAvailable = DevExpress.Analytics.Widgets.Internal.aceAvailable;
                        this.languageHelper = DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLLanguageHelper();
                        this.caption = function () { return DevExpress.Analytics.Utils.getLocalization("SQL string:", "DataAccessUIStringId.QueryControl_SqlString"); };
                        this.sqlString = ko.pureComputed({
                            read: function () {
                                return _this._query() && _this._query().type() === Data.Utils.SqlQueryType.customSqlQuery ? _this._query().sqlString() : _this._tableQueryString();
                            },
                            write: function (val) {
                                if (_this._query().type() !== Data.Utils.SqlQueryType.customSqlQuery) {
                                    var customQuery = new Data.CustomSqlQuery({ "@Name": _this._query().name() }, _this._query().parent);
                                    customQuery.parameters(_this._query().parameters());
                                    customQuery.sqlString(val);
                                    _this._query(customQuery);
                                }
                                else {
                                    _this._query().sqlString(val);
                                }
                            }
                        });
                        this.isNextDisabled = ko.pureComputed(function () {
                            return !_this.sqlString() || !_this._needToCustomizeParameters();
                        });
                        this.isFinishDisabled = ko.pureComputed(function () {
                            return !_this.sqlString() || _this._needToCustomizeParameters();
                        });
                        this._sqlTextProvider = sqlTextProvider;
                        this.disableCustomSql = function () { return disableCustomSql; };
                        this.aceOptions.readOnly = this.disableCustomSql();
                    }
                    SelectStatementQueryControl.prototype.setQuery = function (query, isInProcess) {
                        var _this = this;
                        if (this._query() !== query && query.type() === Data.Utils.SqlQueryType.tableQuery) {
                            isInProcess && isInProcess(true);
                            return this._sqlTextProvider.getQuerySqlText(query)
                                .done(function (response) {
                                if (response.errorMessage)
                                    Analytics.Internal.ShowMessage(response.errorMessage);
                                _this._tableQueryString(response.sqlSelectStatement);
                                _this._query(query);
                            })
                                .always(function () { isInProcess && isInProcess(false); });
                        }
                        else {
                            this._query(query);
                            return $.Deferred().resolve().promise();
                        }
                    };
                    SelectStatementQueryControl.prototype.getQuery = function () {
                        return this._query();
                    };
                    Object.defineProperty(SelectStatementQueryControl.prototype, "runQueryBuilderDisabled", {
                        get: function () {
                            return false;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return SelectStatementQueryControl;
                }());
                Internal.SelectStatementQueryControl = SelectStatementQueryControl;
                var StoredProceduresQueryControl = (function (_super) {
                    __extends(StoredProceduresQueryControl, _super);
                    function StoredProceduresQueryControl() {
                        var _this = _super.call(this) || this;
                        _this.template = "dxrd-procedures-control";
                        _this.storedProcedures = ko.observableArray([]);
                        _this.selectedProcedure = ko.observableArray([]);
                        _this.caption = function () { return DevExpress.Analytics.Utils.getLocalization("Select a stored procedure:", "DataAccessUIStringId.StoredProcControl_Caption"); };
                        _this.generateStoredProcedureDisplayName = function (procedure) { return StoredProceduresQueryControl.generateStoredProcedureDisplayName(procedure); };
                        _this.isNextDisabled = ko.pureComputed(function () {
                            return !_this._selectedProcedure || !_this._needToProcessParameters(_this._selectedProcedure);
                        });
                        _this.isFinishDisabled = ko.pureComputed(function () {
                            return !_this._selectedProcedure || _this._needToProcessParameters(_this._selectedProcedure);
                        });
                        _this.storedProcedures.subscribe(function (newProcedures) {
                            if (!newProcedures) {
                                _this._selectedProcedure = null;
                            }
                            else if (_this._selectedProcedure) {
                                _this._selectedProcedure = Analytics.Internal.getFirstItemByPropertyValue(_this.storedProcedures(), "name", _this._selectedProcedure.name);
                            }
                            else if (_this._query && _this._query.procName()) {
                                _this._selectedProcedure = Analytics.Internal.getFirstItemByPropertyValue(_this.storedProcedures(), "name", _this._query.procName());
                            }
                            else {
                                _this._selectedProcedure = newProcedures[0];
                            }
                        });
                        return _this;
                    }
                    StoredProceduresQueryControl.prototype._needToProcessParameters = function (procedure) {
                        return procedure.arguments.some(StoredProceduresQueryControl._availableConvertToParameter);
                    };
                    StoredProceduresQueryControl._availableConvertToParameter = function (arg) {
                        return arg.direction !== Data.DBStoredProcedureArgumentDirection.Out;
                    };
                    Object.defineProperty(StoredProceduresQueryControl.prototype, "_selectedProcedure", {
                        get: function () {
                            return this.selectedProcedure()[0];
                        },
                        set: function (value) {
                            this.selectedProcedure(value ? [value] : []);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    StoredProceduresQueryControl.prototype.scrollActiveItem = function (e) {
                        var model = e.model;
                        var procedure = model.selectedProcedure.peek();
                        e.component.scrollToItem(procedure[0]);
                    };
                    StoredProceduresQueryControl.generateStoredProcedureDisplayName = function (procedure) {
                        if (procedure.arguments.length === 0)
                            return procedure.name;
                        return procedure.arguments.reduce(function (value, item, index, array) {
                            return value += item.name + (index < array.length - 1 ? ", " : ")");
                        }, procedure.name + "(");
                    };
                    StoredProceduresQueryControl.prototype.setQuery = function (query) {
                        this._query = query;
                        this._selectedProcedure = Analytics.Internal.getFirstItemByPropertyValue(this.storedProcedures(), "name", query.procName());
                    };
                    StoredProceduresQueryControl.prototype.getQuery = function () {
                        var _this = this;
                        if (!this._selectedProcedure)
                            return null;
                        var newQuery = new Data.StoredProcQuery({ "@Name": this._query.name() || this._selectedProcedure.name, "ProcName": this._selectedProcedure.name }, this._query.parent);
                        this._selectedProcedure.arguments.forEach(function (arg) {
                            if (StoredProceduresQueryControl._availableConvertToParameter(arg)) {
                                newQuery.parameters.push(Analytics.Internal.getFirstItemByPropertyValue(_this._query.parameters(), "name", arg.name) || new Data.DataSourceParameter({ "@Name": arg.name, "@Type": Data.DBColumn.GetType(arg.type) }, null, Data.Metadata.storedProcParameterSerializationsInfo(Data.DBColumn.GetType(arg.type))));
                            }
                        });
                        return newQuery;
                    };
                    Object.defineProperty(StoredProceduresQueryControl.prototype, "runQueryBuilderDisabled", {
                        get: function () {
                            return true;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return StoredProceduresQueryControl;
                }(Analytics.Utils.Disposable));
                Internal.StoredProceduresQueryControl = StoredProceduresQueryControl;
                Internal.defaultObjectDataSourceItemSpecifics = "Default";
                var TreeNodeBase = (function () {
                    function TreeNodeBase(name, displayName, specifics, isChecked, afterCheckToggled) {
                        if (isChecked === void 0) { isChecked = false; }
                        var _this = this;
                        this.name = name;
                        this.displayName = displayName;
                        this.specifics = specifics;
                        this.checked = ko.pureComputed(function () { return _this._checked(); });
                        this.isList = false;
                        this._checked = ko.observable(isChecked);
                        this._afterCheckToggled = afterCheckToggled || $.noop;
                    }
                    TreeNodeBase.prototype.unChecked = function () {
                        return this.checked() === false;
                    };
                    TreeNodeBase.prototype.toggleChecked = function () {
                        this.setChecked(!this.checked.peek());
                        this._afterCheckToggled(this);
                    };
                    TreeNodeBase.prototype.setChecked = function (value) {
                        this._checked(value);
                    };
                    return TreeNodeBase;
                }());
                Internal.TreeNodeBase = TreeNodeBase;
                var TreeLeafNode = (function (_super) {
                    __extends(TreeLeafNode, _super);
                    function TreeLeafNode(name, displayName, specifics, isChecked, nodeArguments, afterCheckToggled) {
                        if (isChecked === void 0) { isChecked = false; }
                        if (nodeArguments === void 0) { nodeArguments = null; }
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.name = name;
                        _this.displayName = displayName;
                        _this.specifics = specifics;
                        _this.hasQuery = false;
                        _this.arguments = nodeArguments;
                        return _this;
                    }
                    return TreeLeafNode;
                }(TreeNodeBase));
                Internal.TreeLeafNode = TreeLeafNode;
                var TreeNode = (function (_super) {
                    __extends(TreeNode, _super);
                    function TreeNode(name, displayName, specifics, isChecked, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.countChecked = ko.pureComputed(function () {
                            var count = 0;
                            for (var i = 0; i < _this.children().length; i++) {
                                if (!_this.children()[i].unChecked()) {
                                    if (count > 1)
                                        break;
                                    count++;
                                }
                            }
                            return count;
                        });
                        _this.isList = true;
                        _this.children = ko.observableArray([]);
                        _this.checked = ko.pureComputed({
                            read: function () {
                                if (!_this.initialized()) {
                                    return _this._checked();
                                }
                                else {
                                    var selectedItems = 0;
                                    var partiallySelectedItems = 0;
                                    _this.children().forEach(function (item) {
                                        if (item.checked() === true) {
                                            selectedItems++;
                                        }
                                        else if (item.checked() !== false) {
                                            partiallySelectedItems++;
                                        }
                                    });
                                    if (selectedItems === 0 && partiallySelectedItems === 0) {
                                        return false;
                                    }
                                    if (selectedItems === _this.children.peek().length) {
                                        return true;
                                    }
                                    return undefined;
                                }
                            }
                        });
                        return _this;
                    }
                    TreeNode.prototype.initialized = function () {
                        return this.children().length > 0;
                    };
                    TreeNode.prototype.setChecked = function (value) {
                        this._checked(value);
                        this.children.peek().forEach(function (item) {
                            item.setChecked(value);
                        });
                    };
                    TreeNode.prototype.initializeChildren = function (children) {
                        this.children(children || []);
                    };
                    return TreeNode;
                }(TreeNodeBase));
                Internal.TreeNode = TreeNode;
                var ParameterTreeNode = (function (_super) {
                    __extends(ParameterTreeNode, _super);
                    function ParameterTreeNode(name, displayName, specifics, isChecked, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.countChecked = ko.pureComputed(function () {
                            var count = 0;
                            _this.hasParamsToEdit(false);
                            for (var i = 0; i < _this.children().length; i++) {
                                var child = _this.children()[i];
                                if (!child.unChecked()) {
                                    if (count > 1)
                                        break;
                                    count++;
                                    if (child.arguments && child.arguments.length > 0)
                                        _this.hasParamsToEdit(true);
                                    if (child.specifics === "query")
                                        _this.hasParamsToEdit(true);
                                }
                            }
                            return count;
                        });
                        _this.hasParamsToEdit = ko.observable(false);
                        return _this;
                    }
                    return ParameterTreeNode;
                }(TreeNode));
                Internal.ParameterTreeNode = ParameterTreeNode;
                var QueriesTreeNode = (function (_super) {
                    __extends(QueriesTreeNode, _super);
                    function QueriesTreeNode(name, displayName, specifics, isChecked, callbacks, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.addAction = {
                            clickAction: function (item) {
                                if (_this.disableCustomSql()) {
                                    return _this.addQuery();
                                }
                                else {
                                    return _this.showPopover();
                                }
                            },
                            imageClassName: "dxrd-image-add",
                            imageTemplateName: "dxrd-svg-operations-add",
                            templateName: "dx-treelist-action-with-popover",
                            text: Analytics.Utils.getLocalization("Add query", "AnalyticsCoreStringId.SqlDSWizard_AddQuery")
                        };
                        _this.itemClickAction = function (e) {
                            _this.popoverVisible(false);
                            e.itemData.addAction();
                        };
                        _this.popoverVisible = ko.observable(false);
                        _this.addQuery = function () {
                            callbacks().showQbCallBack();
                        };
                        _this.addCustomQuery = function () {
                            callbacks().showQbCallBack(null, true);
                        };
                        _this.disableCustomSql = function () { return callbacks && callbacks().disableCustomSql; };
                        return _this;
                    }
                    QueriesTreeNode.prototype.getActions = function (context) {
                        var result = [];
                        if (context.path.indexOf("queries") === 0) {
                            result.push(this.addAction);
                        }
                        return result;
                    };
                    QueriesTreeNode.prototype.popoverListItems = function () {
                        var _this = this;
                        return [
                            {
                                name: Analytics.Utils.getLocalization("Run Query Builder", "DataAccessUIStringId.Button_QueryBuilder"),
                                addAction: function () { return _this.addQuery(); }
                            },
                            {
                                name: Analytics.Utils.getLocalization("Write Custom SQL", "AnalyticsCoreStringId.SqlDSWizard_WriteCustomSQL"),
                                addAction: function () { return _this.addCustomQuery(); }
                            }
                        ];
                    };
                    QueriesTreeNode.prototype.showPopover = function () {
                        this.popoverVisible(true);
                    };
                    return QueriesTreeNode;
                }(ParameterTreeNode));
                Internal.QueriesTreeNode = QueriesTreeNode;
                var TreeQueryNode = (function (_super) {
                    __extends(TreeQueryNode, _super);
                    function TreeQueryNode(name, displayName, specifics, isChecked, parameters, callbacks, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, null, afterCheckToggled) || this;
                        _this.editAction = {
                            clickAction: function (item) {
                                return _this.editQuery();
                            },
                            imageClassName: "dx-image-edit",
                            imageTemplateName: "dxrd-svg-operations-edit",
                            text: Analytics.Utils.getLocalization("Edit query", "AnalyticsCoreStringId.SqlDSWizard_EditQuery")
                        };
                        _this.removeAction = {
                            clickAction: function (item) {
                                _this.removeQuery({ model: item.data });
                            },
                            imageClassName: "dxrd-image-recycle-bin",
                            imageTemplateName: "dxrd-svg-operations-recycle_bin",
                            text: Analytics.Utils.getLocalization("Remove query", "AnalyticsCoreStringId.SqlDSWizard_RemoveQuery")
                        };
                        _this.parameters = parameters;
                        _this.removeQuery = function (e) {
                            if (!e.model.unChecked()) {
                                e.model.toggleChecked();
                            }
                            callbacks().deleteAction(e.model.name);
                        };
                        _this.editQuery = function (e) {
                            callbacks().showQbCallBack(_this.name);
                        };
                        _this.hasQuery = true;
                        return _this;
                    }
                    TreeQueryNode.prototype.setObservableName = function (name) {
                        var _this = this;
                        this._name = name;
                        ["name", "displayName"].forEach(function (propertyName) {
                            return Object.defineProperty(_this, propertyName, {
                                get: function () {
                                    return this._name();
                                },
                                set: function (newVal) {
                                    return this._name(newVal);
                                },
                                configurable: true
                            });
                        });
                    };
                    TreeQueryNode.prototype.getActions = function (context) {
                        var result = [];
                        result.push(this.removeAction);
                        result.push(this.editAction);
                        return result;
                    };
                    return TreeQueryNode;
                }(TreeLeafNode));
                Internal.TreeQueryNode = TreeQueryNode;
                var FieldTreeNode = (function (_super) {
                    __extends(FieldTreeNode, _super);
                    function FieldTreeNode(name, displayName, specifics, isChecked, path, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.visible = ko.observable(true);
                        _this.path = path;
                        _this.isComplex = specifics === Internal.defaultObjectDataSourceItemSpecifics;
                        return _this;
                    }
                    return FieldTreeNode;
                }(Analytics.Wizard.Internal.TreeNodeBase));
                Internal.FieldTreeNode = FieldTreeNode;
                var DataMemberTreeNode = (function (_super) {
                    __extends(DataMemberTreeNode, _super);
                    function DataMemberTreeNode(name, displayName, specifics, isChecked, path, afterCheckToggled) {
                        var _this = _super.call(this, name, displayName, specifics, isChecked, afterCheckToggled) || this;
                        _this.visible = ko.observable(true);
                        _this.path = path;
                        _this.isComplex = _this.isList && specifics === Internal.defaultObjectDataSourceItemSpecifics;
                        _this.checked = ko.pureComputed({
                            read: function () {
                                if (!_this.initialized()) {
                                    return _this._checked();
                                }
                                else {
                                    var selectedItems = 0;
                                    var partiallySelectedItems = 0;
                                    var visibleChildren = _this.children().filter(function (item) { return item.visible(); });
                                    visibleChildren.forEach(function (item) {
                                        if (item.checked() === true) {
                                            selectedItems++;
                                        }
                                        else if (item.checked() !== false) {
                                            partiallySelectedItems++;
                                        }
                                    });
                                    if (selectedItems === 0 && partiallySelectedItems === 0) {
                                        return false;
                                    }
                                    if (selectedItems === visibleChildren.length) {
                                        return true;
                                    }
                                    return undefined;
                                }
                            }
                        });
                        return _this;
                    }
                    DataMemberTreeNode.prototype.setChecked = function (value) {
                        _super.prototype.setChecked.call(this, this.visible() ? value : false);
                    };
                    return DataMemberTreeNode;
                }(Analytics.Wizard.Internal.TreeNode));
                Internal.DataMemberTreeNode = DataMemberTreeNode;
                var TreeNodeItemsProvider = (function (_super) {
                    __extends(TreeNodeItemsProvider, _super);
                    function TreeNodeItemsProvider(fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode) {
                        var _this = _super.call(this) || this;
                        _this._fullTreeLoaded = false;
                        _this._rootItems = ko.observableArray([]);
                        _this._checkedRootNodesCount = ko.computed(function () {
                            if (!_this._rootItems || _this._rootItems().length === 0)
                                return 0;
                            var count = 0;
                            for (var i = 0; i < _this._rootItems().length && count < 1; i++) {
                                count += _this._rootItems()[i].unChecked() ? 0 : 1;
                            }
                            return count;
                        });
                        _this.hasCheckedItems = ko.computed(function () {
                            return !(_this._checkedRootNodesCount() === 0);
                        });
                        _this.getRootItems = function () { return _this._rootItems(); };
                        _this.getItems = function (pathRequest, collectChilds) {
                            if (collectChilds === void 0) { collectChilds = false; }
                            var result = $.Deferred();
                            if (!pathRequest.fullPath && pathRequest.pathParts.length === 0) {
                                result.resolve(_this._rootItems());
                            }
                            else {
                                fieldListProvider.getItems(pathRequest).done(function (value) {
                                    var currentParentNode = _this._getParentNode(pathRequest);
                                    if (!currentParentNode)
                                        return result.reject();
                                    if (currentParentNode.children().length === 0) {
                                        var array = [];
                                        var listPath = [];
                                        value.forEach(function (item) {
                                            var isChecked = _this._getDefaultTreeNodeCheckState(item);
                                            if (Analytics.Internal.isList(item)) {
                                                if (pathRequest.pathParts.length <= 5) {
                                                    listPath.push([].concat(pathRequest.fullPath.split('.'), [item.name]));
                                                    array.push(generateTreeNode(item, isChecked, [pathRequest.fullPath, item.name].join(".")));
                                                }
                                            }
                                            else {
                                                array.push(generateTreeLeafNode(item, isChecked, [pathRequest.fullPath, item.name].join(".")));
                                            }
                                        });
                                        currentParentNode.initializeChildren(array);
                                        if (collectChilds)
                                            $.when.apply($, listPath.map(function (x) { return _this.getItems(new Analytics.Utils.PathRequest(x.join('.'), x), collectChilds); })).always(function () { return result.resolve(array); });
                                        else
                                            result.resolve(array);
                                    }
                                    else {
                                        result.resolve(currentParentNode.children());
                                    }
                                });
                            }
                            return result.promise();
                        };
                        _this._disposables.push(rootItems.subscribe(function (newValue) {
                            _this._fullTreeLoaded = false;
                            _this._rootItems(newValue.map(function (item) {
                                var isChecked = _this._getDefaultTreeNodeCheckState(item);
                                return generateTreeNode(item, isChecked, item.name);
                            }));
                        }));
                        _this._disposables.push(_this.hasCheckedItems);
                        return _this;
                    }
                    TreeNodeItemsProvider.prototype._createTree = function () {
                        var _this = this;
                        if (!this._fullTreeLoaded)
                            return $.when.apply($, this._rootItems().map(function (item) { return _this.getItems(new Analytics.Utils.PathRequest(item.path), true); })).always(function () { return _this._fullTreeLoaded = true; });
                        else {
                            return $.Deferred().resolve().promise();
                        }
                    };
                    TreeNodeItemsProvider.prototype._createTreePart = function (pathParts, deferred, checkedPath) {
                        var _this = this;
                        if (deferred === void 0) { deferred = $.Deferred(); }
                        if (this._fullTreeLoaded)
                            return deferred.resolve().promise();
                        if (pathParts.length === 0)
                            return deferred.resolve();
                        if (!checkedPath) {
                            var deferred = $.Deferred();
                            if (pathParts.length === 1) {
                                this.getItems(new Analytics.Utils.PathRequest(pathParts[0], pathParts)).done(function () { return deferred.resolve(); }).fail(function () { return deferred.reject(); });
                            }
                            else
                                this._createTreePart(pathParts.slice(1), deferred, [pathParts[0]]);
                            return deferred;
                        }
                        else {
                            var newParentPath = [].concat([], checkedPath, pathParts[0]);
                            var request = new Analytics.Utils.PathRequest(newParentPath.join('.'), newParentPath);
                            if (!this._getParentNode(request)) {
                                this.getItems(new Analytics.Utils.PathRequest(checkedPath.join('.'), checkedPath)).done(function (res) {
                                    _this._createTreePart(pathParts.slice(1), deferred, newParentPath);
                                }).fail(function () { return deferred.reject(); });
                            }
                            else {
                                this._createTreePart(pathParts.slice(1), deferred, newParentPath);
                            }
                        }
                    };
                    TreeNodeItemsProvider.prototype._setChecked = function (item) {
                        var _this = this;
                        item.setChecked(true);
                        if (item instanceof DataMemberTreeNode) {
                            item.children().forEach(function (x) { return _this._setChecked(x); });
                        }
                    };
                    TreeNodeItemsProvider.prototype.selectAllItems = function (onlyRoot) {
                        var _this = this;
                        if (onlyRoot === void 0) { onlyRoot = true; }
                        var deferred = $.Deferred();
                        this._createTree().always(function () {
                            if (onlyRoot) {
                                _this._rootItems().forEach(function (x) { return x.setChecked(true); });
                            }
                            else {
                                _this._rootItems().forEach(function (x) { return _this._setChecked(x); });
                            }
                            deferred.resolve();
                        });
                        return deferred.promise();
                    };
                    TreeNodeItemsProvider.prototype.selectItemsByPath = function (path) {
                        var _this = this;
                        var deferred = $.Deferred();
                        var pathParts = path.split('.');
                        this._createTreePart(pathParts).done(function () {
                            _this.getItems(new Analytics.Utils.PathRequest(pathParts.join('.'), pathParts)).done(function (items) {
                                items.forEach(function (item) {
                                    if (item instanceof Analytics.Wizard.Internal.TreeNodeBase) {
                                        item.setChecked(true);
                                    }
                                });
                            }).always(function () { return deferred.resolve(); });
                        });
                        return deferred.promise();
                    };
                    TreeNodeItemsProvider.prototype.selectItemByPath = function (path) {
                        var _this = this;
                        var deferred = $.Deferred();
                        var pathParts = path.split('.');
                        this._createTreePart(pathParts).done(function () {
                            var fieldName = pathParts.pop();
                            _this.getItems(new Analytics.Utils.PathRequest(pathParts.join('.'), pathParts)).done(function (items) {
                                var item = items.filter(function (x) { return x.name === fieldName; })[0];
                                if (item instanceof Analytics.Wizard.Internal.TreeNodeBase) {
                                    item.setChecked(true);
                                }
                            }).always(function () { return deferred.resolve(); });
                        });
                        return deferred.promise();
                    };
                    TreeNodeItemsProvider.prototype._getParentNode = function (pathRequest) {
                        var parentNode = this._rootItems().filter(function (item) { return item.path === (pathRequest.id || pathRequest.ref); })[0];
                        if (!parentNode)
                            return;
                        var childPath = parentNode.path;
                        for (var index = 1; index < pathRequest.pathParts.length; index++) {
                            if (!parentNode)
                                return;
                            childPath += "." + pathRequest.pathParts[index];
                            parentNode = parentNode.children().filter(function (item) { return Analytics.Internal.isList(item) && item.path == childPath; })[0];
                        }
                        return parentNode;
                    };
                    TreeNodeItemsProvider.prototype._getDefaultTreeNodeCheckState = function (item) {
                        return false;
                    };
                    return TreeNodeItemsProvider;
                }(Analytics.Utils.Disposable));
                Internal.TreeNodeItemsProvider = TreeNodeItemsProvider;
                var JsonTreeNodeItemsProvider = (function (_super) {
                    __extends(JsonTreeNodeItemsProvider, _super);
                    function JsonTreeNodeItemsProvider(fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode) {
                        return _super.call(this, fieldListProvider, rootItems, generateTreeNode, generateTreeLeafNode) || this;
                    }
                    JsonTreeNodeItemsProvider.prototype._getDefaultTreeNodeCheckState = function (item) {
                        return item.isSelected;
                    };
                    JsonTreeNodeItemsProvider.prototype.getNodeByPath = function (pathRequest) {
                        var listNode = this._rootItems().filter(function (item) { return item.path === (pathRequest.pathParts || [])[0]; })[0];
                        if (!listNode)
                            return;
                        var childPath = listNode.path;
                        for (var index = 1; index < pathRequest.pathParts.length; index++) {
                            if (!listNode)
                                return;
                            childPath += "." + pathRequest.pathParts[index];
                            listNode = listNode.children().filter(function (item) { return item.path == childPath; })[0];
                        }
                        return listNode;
                    };
                    return JsonTreeNodeItemsProvider;
                }(TreeNodeItemsProvider));
                Internal.JsonTreeNodeItemsProvider = JsonTreeNodeItemsProvider;
            })(Internal = Wizard.Internal || (Wizard.Internal = {}));
            (function (Legacy) {
                var LegacyPageDispathcer = (function () {
                    function LegacyPageDispathcer(steps) {
                        this._steps = steps.slice();
                    }
                    LegacyPageDispathcer.prototype.getFirstPage = function (model) {
                        return this._goToFirstVisiblePage(true, 0, model, true);
                    };
                    LegacyPageDispathcer.prototype.getNextPage = function (currentToken, model) {
                        return this._goToFirstVisiblePage(true, currentToken + 1, model, false);
                    };
                    LegacyPageDispathcer.prototype.getPreviousPage = function (currentToken, model) {
                        return this._goToFirstVisiblePage(false, currentToken - 1, model, this._isPageFirst(currentToken), false);
                    };
                    LegacyPageDispathcer.prototype.getPageByIndex = function (index, model) {
                        return this._goToFirstVisiblePage(true, index, model, this._isPageFirst(index), this._isPageLast(index));
                    };
                    LegacyPageDispathcer.prototype._isPageFirst = function (token) {
                        for (var i = token - 1; i >= 0; i--)
                            if (this._steps[i].isVisible) {
                                return false;
                            }
                        return true;
                    };
                    LegacyPageDispathcer.prototype._isPageLast = function (token) { return token === this._steps.length - 1; };
                    LegacyPageDispathcer.prototype._goToFirstVisiblePage = function (goNext, startIndex, model, isFirst, isLast) {
                        var _this = this;
                        var d = $.Deferred();
                        if (startIndex >= this._steps.length || startIndex < 0) {
                            return d.reject("Invalid page index").promise();
                        }
                        var page = this._steps[startIndex];
                        var result = page.beginAsync(model);
                        if (result) {
                            result.done(function () {
                                if (page.isVisible) {
                                    if (isLast === undefined)
                                        isLast = _this._isPageLast(startIndex);
                                    d.resolve({ page: page, token: startIndex, isFirst: isFirst, isLast: isLast });
                                }
                                else {
                                    page.commit(model);
                                    var r = _this._goToFirstVisiblePage(goNext, startIndex + (goNext ? 1 : -1), model, isFirst, isLast);
                                    r.done(function (result) { return d.resolve(result); });
                                    r.fail(function (error) { return d.reject(error); });
                                }
                            });
                            result.fail(function (error) { return d.reject(error); });
                            return d.promise();
                        }
                        else {
                            if (page.isVisible) {
                                if (isLast === undefined)
                                    isLast = this._isPageLast(startIndex);
                                return d.resolve({ page: page, token: startIndex, isFirst: isFirst, isLast: isLast }).promise();
                            }
                            page.commit(model);
                            return this._goToFirstVisiblePage(goNext, startIndex + (goNext ? 1 : -1), model, isFirst, isLast);
                        }
                    };
                    return LegacyPageDispathcer;
                }());
                Legacy.LegacyPageDispathcer = LegacyPageDispathcer;
            })(Legacy = Wizard.Legacy || (Wizard.Legacy = {}));
            (function (Internal) {
                var WizardAction = (function () {
                    function WizardAction(handler, text) {
                        this.handler = handler;
                        this.isVisible = ko.observable(true);
                        this.isDisabled = ko.observable(false);
                        this.text = text;
                    }
                    return WizardAction;
                }());
                Internal.WizardAction = WizardAction;
            })(Internal = Wizard.Internal || (Wizard.Internal = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            Widgets.expressionFunctions = (function (addins) { return Analytics.Widgets.Internal.insertInFunctionDisplay(addins); })({
                "String": {
                    "CreateTable": [{ paramCount: 1, text: "CreateTable(, )", displayName: "CreateTable(Column1, ..., ColumnN)", descriptionStringId: "ExpressionEditorStringId.Function_CreateTable" }]
                }
            });
            var Internal;
            (function (Internal) {
                var UndoEditor = (function (_super) {
                    __extends(UndoEditor, _super);
                    function UndoEditor(info, level, parentDisabled, textToSearch) {
                        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
                    }
                    UndoEditor.prototype.generateValue = function (undoEngine) {
                        var _this = this;
                        if (!this.undoValue) {
                            this._disposables.push(this.undoValue = ko.computed({
                                read: function () {
                                    return _this.value();
                                },
                                write: function (val) {
                                    undoEngine().start();
                                    _this.value(val);
                                    undoEngine().end();
                                }
                            }));
                        }
                        return this.undoValue;
                    };
                    return UndoEditor;
                }(Analytics.Widgets.Editor));
                Internal.UndoEditor = UndoEditor;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
            Widgets.editorTemplates = {
                bool: { header: "dx-boolean-select", custom: "dxqb-property-editor" },
                combobox: { header: "dx-combobox", custom: "dxqb-property-editor" },
                comboboxUndo: { header: "dx-combobox-undo", custom: "dxqb-property-editor", editorType: Internal.UndoEditor },
                text: { header: "dx-text", custom: "dxqb-property-editor" },
                filterEditor: { header: "dxrd-filterstring", custom: "dxqb-property-editor" },
                filterGroupEditor: { header: "dxrd-filterstringgroup", custom: "dxqb-property-editor" },
                numeric: { header: "dx-numeric", custom: "dxqb-property-editor" }
            };
            (function (Internal) {
                function createDefaultSQLAceOptions(readOnly) {
                    if (readOnly === void 0) { readOnly = false; }
                    return {
                        showLineNumbers: false,
                        showPrintMargin: false,
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        readOnly: readOnly,
                        highlightSelectedWord: readOnly,
                        showGutter: false,
                        highlightActiveLine: false
                    };
                }
                Internal.createDefaultSQLAceOptions = createDefaultSQLAceOptions;
                function createDefaultSQLAdditionalOptions(value) {
                    return {
                        onChange: function (session) {
                            value(session.getValue());
                        },
                        onValueChange: function (editor) {
                            editor.resize(true);
                        },
                        changeTimeout: 200,
                        overrideEditorFocus: true,
                        setUseWrapMode: true
                    };
                }
                Internal.createDefaultSQLAdditionalOptions = createDefaultSQLAdditionalOptions;
                function createDefaultSQLLanguageHelper() {
                    return {
                        getLanguageMode: function () { return "ace/mode/sql"; },
                        createCompleters: function () { return []; }
                    };
                }
                Internal.createDefaultSQLLanguageHelper = createDefaultSQLLanguageHelper;
                var GroupFilterEditorSerializer = (function (_super) {
                    __extends(GroupFilterEditorSerializer, _super);
                    function GroupFilterEditorSerializer(_columns) {
                        var _this = _super.call(this) || this;
                        _this._columns = _columns;
                        _this._aggregatePropertyName = function (operand) {
                            var itemColumnAggregate = _this._findAggregatedColumn(function (c) { return c.actualName() === operand.propertyName; });
                            return itemColumnAggregate ? _this._columnDisplayName(itemColumnAggregate) : operand.propertyName;
                        };
                        return _this;
                    }
                    GroupFilterEditorSerializer.prototype._columnDisplayName = function (column) {
                        return column.table() + "." + column.actualName();
                    };
                    GroupFilterEditorSerializer.prototype._findAggregatedColumn = function (predicate) {
                        return Analytics.Internal.find(this._columns(), function (c) { return isAggregatedExpression(c) && predicate(c); });
                    };
                    GroupFilterEditorSerializer.prototype.serializeOperandProperty = function (operand) {
                        var _this = this;
                        var column = this._findAggregatedColumn(function (c) { return operand.propertyName === _this._columnDisplayName(c); });
                        return "[" + (column ? column.actualName() : operand.propertyName) + "]";
                    };
                    GroupFilterEditorSerializer.prototype.deserialize = function (stringCriteria) {
                        var _this = this;
                        var operand = Analytics.Criteria.CriteriaOperator.parse(stringCriteria);
                        if (operand) {
                            Analytics.Criteria.Utils.criteriaForEach(operand, function (operator) {
                                if (operator instanceof DevExpress.Analytics.Criteria.OperandProperty) {
                                    operator["propertyName"] = _this._aggregatePropertyName(operator);
                                }
                            });
                        }
                        return _super.prototype.deserializeOperand.call(this, operand);
                    };
                    return GroupFilterEditorSerializer;
                }(Analytics.Widgets.Internal.FilterEditorSerializer));
                Internal.GroupFilterEditorSerializer = GroupFilterEditorSerializer;
                var OperandParameterQBSurface = (function (_super) {
                    __extends(OperandParameterQBSurface, _super);
                    function OperandParameterQBSurface(operator, parent, fieldListProvider, path) {
                        var _this = _super.call(this, operator, parent, fieldListProvider, path) || this;
                        _this.createParameter = function () {
                            if (_this.canCreateParameters) {
                                _this.model.parameterName = _this.parameterName();
                                _this._createParameter(_this.parameterName(), _this._parameterType);
                                _this.helper.onChange();
                            }
                        };
                        _this._parameterName = ko.observable("");
                        _this.isEditable = ko.observable(false);
                        _this.defaultDisplay = OperandParameterQBSurface.defaultDisplay;
                        _this._parameterName(operator.parameterName);
                        _this.canCreateParameters = _this.helper.canCreateParameters;
                        _this.fieldsOptions = parent.leftPart.fieldsOptions;
                        _this.parameterName = ko.pureComputed({
                            read: function () {
                                return _this._parameterName() || (_this.canCreateParameters && OperandParameterQBSurface.defaultDisplay() || "");
                            },
                            write: function (newVal) {
                                if (newVal !== OperandParameterQBSurface.defaultDisplay() && newVal) {
                                    _this.model.parameterName = ko.unwrap(newVal);
                                    _this._parameterName(_this.model.parameterName);
                                }
                            }
                        });
                        if (_this.canCreateParameters && !_this.isDefaultTextDisplayed() && !ko.unwrap(_this.fieldListProvider).hasParameter(operator.parameterName)) {
                            _this.createParameter();
                        }
                        return _this;
                    }
                    Object.defineProperty(OperandParameterQBSurface.prototype, "_parameterType", {
                        get: function () {
                            return this.fieldsOptions() && this.fieldsOptions().selected() && this.fieldsOptions().selected()["dataType"] || "System.String";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    OperandParameterQBSurface.prototype._createParameter = function (name, dataType) {
                        if (name !== "" && name !== OperandParameterQBSurface.defaultDisplay() && this.helper.parameters().filter(function (parameter) { return parameter.name() === name; }).length === 0) {
                            var parameter = new Analytics.Data.DataSourceParameter({ "@Name": name, "@Type": dataType });
                            this.helper.newParameters.push(parameter);
                        }
                    };
                    OperandParameterQBSurface.prototype.isDefaultTextDisplayed = function () {
                        return this.parameterName() === OperandParameterQBSurface.defaultDisplay();
                    };
                    OperandParameterQBSurface.defaultDisplay = function () { return Analytics.Utils.getLocalization("Create new parameter", "AnalyticsCoreStringId.FilterEditor_Operand_CreateNewParameter"); };
                    return OperandParameterQBSurface;
                }(DevExpress.Analytics.Widgets.Filtering.OperandParameterSurface));
                Internal.OperandParameterQBSurface = OperandParameterQBSurface;
                var OperandPropertyQBSurface = (function (_super) {
                    __extends(OperandPropertyQBSurface, _super);
                    function OperandPropertyQBSurface(operator, parent, fieldListProvider, path) {
                        return _super.call(this, operator, parent, fieldListProvider, path) || this;
                    }
                    OperandPropertyQBSurface.prototype._updateSpecifics = function () {
                        OperandPropertyQBSurface.updateSpecifics(this);
                    };
                    OperandPropertyQBSurface.updateSpecifics = function (propertySurface) {
                        var fieldList = ko.unwrap(propertySurface.fieldListProvider);
                        if (fieldList && fieldList.getColumnInfo) {
                            var item = fieldList.getColumnInfo(propertySurface.propertyName());
                            if (item) {
                                propertySurface.specifics(item.specifics.toLowerCase());
                                propertySurface.dataType(item.dataType);
                                var _fieldsOptions = ko.unwrap(propertySurface.fieldsOptions);
                                if (_fieldsOptions)
                                    _fieldsOptions.selected(item);
                            }
                        }
                    };
                    return OperandPropertyQBSurface;
                }(DevExpress.Analytics.Widgets.Filtering.OperandPropertySurface));
                Internal.OperandPropertyQBSurface = OperandPropertyQBSurface;
                function isAggregatedExpression(object) {
                    return object.aggregate() !== Elements.Metadata.AggregationType.None;
                }
                Internal.isAggregatedExpression = isAggregatedExpression;
                var QueryBuilderObjectsProvider = (function () {
                    function QueryBuilderObjectsProvider(query, objectFilter) {
                        this.getItems = function (pathRequest) {
                            var result = $.Deferred();
                            var items = [];
                            if (pathRequest.fullPath === "") {
                                items = objectFilter.filterTables(query().tables())
                                    .map(QueryBuilderObjectsProvider._createTableInfo);
                            }
                            else {
                                var table = Analytics.Internal.findFirstItemMatchesCondition(query().tables(), function (table) { return table.actualName() === pathRequest.fullPath; });
                                items = objectFilter.filterColumns(table && table.columns() || [])
                                    .map(function (column) { return QueryBuilderObjectsProvider._createColumnInfo(column, objectFilter); });
                            }
                            result.resolve(items);
                            return result.promise();
                        };
                        this.hasParameter = function (name) {
                            return query().parameters().filter(function (parameter) { return parameter.name() === name; }).length > 0;
                        };
                        this.getColumnInfo = function (propertyName) {
                            if (propertyName) {
                                var table = Analytics.Internal.find(query().tables(), function (t) { return propertyName.indexOf(t.actualName() + ".") === 0; });
                                if (table) {
                                    var column = Analytics.Internal.find(objectFilter.filterColumns(table.columns() || []), function (c) { return propertyName === (table.actualName() + "." + objectFilter.getColumnName(c)); });
                                    return column ? QueryBuilderObjectsProvider._createColumnInfo(column, objectFilter) : null;
                                }
                            }
                            return null;
                        };
                    }
                    QueryBuilderObjectsProvider._createTableInfo = function (table) {
                        return {
                            displayName: table.actualName(),
                            name: table.actualName(),
                            isList: true,
                            specifics: "Default",
                            collapsed: ko.observable(true)
                        };
                    };
                    QueryBuilderObjectsProvider._createColumnInfo = function (column, objectFilter) {
                        return {
                            displayName: objectFilter.getColumnName(column),
                            isList: false,
                            specifics: objectFilter.getSpecifics(column),
                            dataType: objectFilter.getDataType(column),
                            name: objectFilter.getColumnName(column)
                        };
                    };
                    QueryBuilderObjectsProvider.whereClauseObjectsFilter = {
                        filterColumns: function (columns) { return columns; },
                        filterTables: function (tables) { return tables; },
                        getColumnName: function (column) { return column.name.peek(); },
                        getSpecifics: function (column) { return column.specifics; },
                        getDataType: function (column) { return column.dataType.peek(); }
                    };
                    QueryBuilderObjectsProvider.groupByObjectsFilter = {
                        filterColumns: function (columns) { return columns.filter(isAggregatedExpression); },
                        filterTables: function (tables) { return tables.filter(function (table) { return table.columns().some(isAggregatedExpression); }); },
                        getColumnName: function (column) { return column.actualName.peek(); },
                        getSpecifics: function (column) {
                            switch (column.aggregate()) {
                                case QueryBuilder.Elements.Metadata.AggregationType.Avg:
                                case QueryBuilder.Elements.Metadata.AggregationType.AvgDistinct:
                                    return "Float";
                                case QueryBuilder.Elements.Metadata.AggregationType.Count:
                                case QueryBuilder.Elements.Metadata.AggregationType.CountDistinct:
                                    return "Integer";
                                default:
                                    return column.specifics;
                            }
                        },
                        getDataType: function (column) { return null; }
                    };
                    return QueryBuilderObjectsProvider;
                }());
                Internal.QueryBuilderObjectsProvider = QueryBuilderObjectsProvider;
                var QBFilterEditorHelper = (function (_super) {
                    __extends(QBFilterEditorHelper, _super);
                    function QBFilterEditorHelper(parametersMode) {
                        var _this = _super.call(this) || this;
                        _this.handlers.changeParameter = function (criteria, popupService) {
                            return {
                                data: new DevExpress.Analytics.Widgets.Internal.FilterEditorAddOn(criteria, popupService, "changeParameter", "items", "dxqb-filtereditor-parameterspopup"),
                                templateName: "dxqb-filtereditor-changeparameter"
                            };
                        };
                        _this.mapper.Parameter = OperandParameterQBSurface;
                        _this.mapper.Property = OperandPropertyQBSurface;
                        if (parametersMode === Elements.Metadata.ParametersMode.ReadWrite) {
                            _this.canCreateParameters = true;
                            _this.newParameters = ko.observableArray([]);
                            _this.onEditorFocusOut = function (criteria) {
                                if (!criteria)
                                    return;
                                var parameters = _this.newParameters();
                                var usesParameters = [];
                                Analytics.Criteria.Utils.criteriaForEach(criteria, function (child) {
                                    if (child instanceof Analytics.Criteria.OperandParameter) {
                                        var parameter = parameters.filter(function (x) { return x.name() === child.parameterName; })[0];
                                        if (parameter)
                                            usesParameters.push(parameter);
                                    }
                                });
                                if (usesParameters.length === 0) {
                                    _this.newParameters.splice(0);
                                    return;
                                }
                                var uselessParameters = parameters.filter(function (x) { return usesParameters.indexOf(x) === -1; });
                                for (var i = 0; i < uselessParameters.length; i++) {
                                    var parameterIndex = parameters.indexOf(uselessParameters[i]);
                                    if (parameterIndex !== -1)
                                        parameters.splice(parameterIndex, 1);
                                }
                                _this.newParameters.valueHasMutated();
                            };
                            _this.onClosing = function () {
                                _this.newParameters([]);
                            };
                        }
                        _this.canSelectLists = false;
                        _this.getDisplayPropertyName = function () { return $.Deferred().resolve("").promise(); };
                        return _this;
                    }
                    return QBFilterEditorHelper;
                }(Analytics.Widgets.FilterEditorHelper));
                Internal.QBFilterEditorHelper = QBFilterEditorHelper;
                Internal.QBFilterEditorHelperDefault = QBFilterEditorHelper;
                var QBFilterStringOptions = (function (_super) {
                    __extends(QBFilterStringOptions, _super);
                    function QBFilterStringOptions(filterString, dataMember, disabled, title) {
                        return _super.call(this, filterString, dataMember, disabled, title) || this;
                    }
                    QBFilterStringOptions.prototype.initializeFilterStringHelper = function (parameters, parametersMode, serializer) {
                        var _this = this;
                        var helper = new Internal.QBFilterEditorHelperDefault(parametersMode);
                        helper.canChoiceParameters = parametersMode !== Elements.Metadata.ParametersMode.Disabled;
                        if (serializer) {
                            helper.serializer = serializer;
                        }
                        if (parametersMode === Elements.Metadata.ParametersMode.ReadWrite) {
                            helper.parameters = ko.computed(function () { return [].concat(parameters(), helper.newParameters()); });
                            helper.onSave = function (operandProperty) {
                                var newParameters = helper.newParameters();
                                parameters.push.apply(parameters, newParameters);
                                helper.newParameters([]);
                            };
                        }
                        else {
                            if (parametersMode === Elements.Metadata.ParametersMode.Read)
                                helper.parameters = parameters;
                            var oldCheckRightPart = helper.criteriaTreeValidator._checkRightPart;
                            helper.criteriaTreeValidator._checkRightPart = function (criteriaOperator) {
                                if (!(criteriaOperator instanceof Analytics.Criteria.OperandParameter))
                                    return oldCheckRightPart.apply(_this, [criteriaOperator]);
                                if (parametersMode === Elements.Metadata.ParametersMode.Disabled) {
                                    return false;
                                }
                                else if (parametersMode === Elements.Metadata.ParametersMode.Read) {
                                    var parameterName = criteriaOperator.parameterName;
                                    return parameters.peek().filter(function (x) { return x.name() === parameterName; }).length !== 0;
                                }
                            };
                        }
                        this.helper = helper;
                    };
                    return QBFilterStringOptions;
                }(Analytics.Widgets.FilterStringOptions));
                Internal.QBFilterStringOptions = QBFilterStringOptions;
                var KeyColumnSurface = (function () {
                    function KeyColumnSurface(column, queryName, _isMaster) {
                        if (_isMaster === void 0) { _isMaster = false; }
                        var _this = this;
                        this._isMaster = _isMaster;
                        this.getTitle = function () { return _this._isMaster ? Analytics.Utils.getLocalization("Master Query", "AnalyticsCoreStringId.Wizard_MasterDetailRelationship_MasterQuery") : Analytics.Utils.getLocalization("Detail Query", "AnalyticsCoreStringId.Wizard_MasterDetailRelationship_DetailQuery"); };
                        this.isSelected = ko.observable(false);
                        this.selectColumnText = function () { return Analytics.Utils.getLocalization("<Select a Column>", "DataAccessUIStringId.JoinEditorEmptyColumnText"); };
                        this.column = column;
                        this.queryName = queryName;
                        this.setColumn = function (resultColumn) {
                            _this.column(resultColumn.name());
                        };
                    }
                    return KeyColumnSurface;
                }());
                Internal.KeyColumnSurface = KeyColumnSurface;
                var MasterDetailEditor = (function () {
                    function MasterDetailEditor(relations, resultSet, saveCallBack) {
                        var _this = this;
                        this.isValid = ko.observable(true);
                        this.popupVisible = ko.observable(false);
                        this.loadPanelVisible = ko.observable(false);
                        this.buttonItems = [];
                        this.masterQueries = ko.observableArray();
                        this.popupService = new DevExpress.Analytics.Internal.PopupService();
                        this.save = function () {
                            var emptyFieldsExist = relations().some(function (relation) {
                                return !relation.detailQuery() || !relation.masterQuery() ||
                                    relation.keyColumns().some(function (column) { return (!column.detailColumn() || !column.masterColumn()); });
                            });
                            if (emptyFieldsExist) {
                                Analytics.Internal.ShowMessage(Analytics.Utils.getLocalization("Some fields are empty. Please fill all empty fields or remove the corresponding conditions to proceed.", "DataAccessUIStringId.JoinEditorFillAllFieldsException"));
                            }
                            else {
                                saveCallBack().done(function () { _this.popupVisible(false); });
                            }
                        };
                        this.createRelation = function (target) {
                            var popupItems = resultSet.tables()
                                .filter(function (table) { return table.tableName() !== target.queryName; })
                                .map(function (table) { return { name: table.tableName() }; });
                            return {
                                data: new MasterDetailEditorPopupManager(target, _this.popupService, "create", popupItems),
                                templateName: "dx-filtereditor-create"
                            };
                        };
                        this.setColumn = function (target) {
                            var table = Analytics.Internal.getFirstItemByPropertyValue(resultSet.tables(), "tableName", target.queryName);
                            return {
                                data: new MasterDetailEditorPopupManager(target, _this.popupService, "setColumn", table ? table.columns() : []),
                                templateName: "dx-masterdetail-editor-setColumn"
                            };
                        };
                        this._createMainPopupButtons();
                        var masterQueries = {};
                        resultSet.tables().forEach(function (table) {
                            masterQueries[table.tableName()] = new MasterQuerySurface(table.tableName(), relations);
                        });
                        relations().forEach(function (relation) {
                            masterQueries[relation.masterQuery()] = masterQueries[relation.masterQuery()] || new MasterQuerySurface(relation.masterQuery(), relations);
                            masterQueries[relation.masterQuery()].add(relation);
                        });
                        this.masterQueries($.map(masterQueries, function (value) { return value; }));
                    }
                    MasterDetailEditor.prototype._createMainPopupButtons = function () {
                        var self = this;
                        this.buttonItems = [
                            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.Utils.getLocalization('Save', DevExpress.Analytics.Internal.StringId.DataAccessBtnOK), onClick: function () { self.save(); } } },
                            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.Utils.getLocalization('Cancel', DevExpress.Analytics.Internal.StringId.DataAccessBtnCancel), onClick: function () { self.popupVisible(false); } } }
                        ];
                    };
                    MasterDetailEditor.prototype.title = function () {
                        return DevExpress.Analytics.Utils.getLocalization('Master-Detail Relation Editor', DevExpress.Analytics.Internal.StringId.MasterDetailRelationsEditor);
                    };
                    return MasterDetailEditor;
                }());
                Internal.MasterDetailEditor = MasterDetailEditor;
                var MasterDetailEditorPopupManager = (function () {
                    function MasterDetailEditorPopupManager(target, popupService, action, popupItems) {
                        var _this = this;
                        this.showPopup = function (_, element) {
                            if (_this._popupService["subscription"]) {
                                _this._popupService["subscription"].dispose();
                            }
                            _this._popupService.title("");
                            _this._updateActions(_this.target);
                            _this._popupService.target(element);
                            _this._popupService.visible(true);
                        };
                        this.target = target;
                        this._action = action;
                        this._popupService = popupService;
                        this._popupItems = popupItems;
                    }
                    MasterDetailEditorPopupManager.prototype._updateActions = function (viewModel) {
                        var _this = this;
                        this._popupService["subscription"] = this._popupService.visible.subscribe(function (newVal) {
                            _this.target.isSelected && _this.target.isSelected(newVal);
                        });
                        this._popupService.data({
                            data: this._popupItems,
                            template: "dx-filtereditor-popup-common",
                            click: function (data) {
                                viewModel[_this._action](data);
                                _this._popupService.visible(false);
                            }
                        });
                    };
                    return MasterDetailEditorPopupManager;
                }());
                Internal.MasterDetailEditorPopupManager = MasterDetailEditorPopupManager;
                var MasterDetailRelationSurface = (function () {
                    function MasterDetailRelationSurface(relation, parent) {
                        var _this = this;
                        this.isEditable = ko.observable(false);
                        this.relationName = relation.name;
                        this.keyColumns = ko.pureComputed(function () {
                            return relation.keyColumns().map(function (item) {
                                return {
                                    master: new KeyColumnSurface(item.masterColumn, relation.masterQuery(), true),
                                    detail: new KeyColumnSurface(item.detailColumn, relation.detailQuery(), false)
                                };
                            });
                        });
                        this.create = function () {
                            relation.createKeyColumn();
                        };
                        this.remove = function (data) {
                            relation.keyColumns.remove(function (item) { return item.masterColumn === data.master.column && item.detailColumn === data.detail.column; });
                            if (relation.keyColumns().length === 0)
                                parent.remove(_this);
                        };
                    }
                    return MasterDetailRelationSurface;
                }());
                Internal.MasterDetailRelationSurface = MasterDetailRelationSurface;
                var MasterQuerySurface = (function () {
                    function MasterQuerySurface(masterQueryName, relations) {
                        var _this = this;
                        this.relations = ko.observableArray();
                        this.queryName = masterQueryName;
                        this.add = function (relation) {
                            _this.relations.push(new MasterDetailRelationSurface(relation, _this));
                        };
                        this.create = function (detailQueryItem) {
                            var newRelation = new Analytics.Data.MasterDetailRelation({ "@Master": _this.queryName, "@Detail": detailQueryItem.name });
                            if (Analytics.Internal.getFirstItemByPropertyValue(_this.relations(), "relationName", newRelation.name())) {
                                newRelation.name(Analytics.Internal.getUniqueName(_this.relations().map(function (item) { return item.relationName(); }), newRelation.name() + '_'));
                            }
                            newRelation.createKeyColumn();
                            _this.add(newRelation);
                            relations.push(newRelation);
                        };
                        this.remove = function (relationSurface) {
                            _this.relations.remove(relationSurface);
                            relations.remove(function (item) { return item.name === relationSurface.relationName; });
                        };
                    }
                    return MasterQuerySurface;
                }());
                Internal.MasterQuerySurface = MasterQuerySurface;
            })(Internal = Widgets.Internal || (Widgets.Internal = {}));
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
        var Metadata;
        (function (Metadata) {
            Metadata.name = { propertyName: "name", modelName: "@Name", displayName: "Name", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Name", disabled: true, editor: Widgets.editorTemplates.text };
            Metadata.alias = { propertyName: "alias", modelName: "@Alias", displayName: "Alias", localizationId: "DataAccessUIStringId.QueryBuilderColumns_Alias", defaultVal: "", editor: Widgets.editorTemplates.text };
            Metadata.text = { propertyName: "text", modelName: "@Text", displayName: "Text", editor: Widgets.editorTemplates.text };
            Metadata.selected = { propertyName: "selected", displayName: "Output", editor: Widgets.editorTemplates.bool, localizationId: "DataAccessUIStringId.QueryBuilderColumns_Output" };
            Metadata.size = { propertyName: "size", modelName: "@Size", defaultVal: "100,125", from: Analytics.Elements.Size.fromString };
            Metadata.location = { propertyName: "location", modelName: "@Location", from: Analytics.Elements.Point.fromString };
            Metadata.sizeLocation = [Metadata.size, Metadata.location];
            Metadata.unknownSerializationsInfo = [Metadata.name].concat(Metadata.sizeLocation);
        })(Metadata = QueryBuilder.Metadata || (QueryBuilder.Metadata = {}));
        var Utils;
        (function (Utils) {
            Utils.ActionId = {
                Save: "dxqb-save",
                DataPreview: "dxqb-data-preview",
                SelectStatementPreview: "dxqb-select-statement-preview"
            };
            Utils.HandlerUri = "DXQB.axd";
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
        var Internal;
        (function (Internal) {
            var QueryBuilderElements = {
                Surface: "dxrd-surface-template-base",
                Toolbar: "dxqb-toolbar",
                RightPanel: "dx-right-panel-lightweight",
                DataPreview: "dxqb-popup#data",
                SqlPreview: "dxqb-popup#sql"
            };
            function customizeDesignerActions(designerModel, nextCustomizer) {
                var query = designerModel.model;
                return (function (actions) {
                    var del = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Delete"; });
                    del.imageClassName = "dx-icon-dxrd-image-recycle-bin";
                    del.imageTemplateName = "dxrd-svg-operations-recycle_bin";
                    var undo = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Undo"; });
                    undo.disabled = ko.pureComputed(function () { return designerModel.isLoading() || !designerModel.undoEngine().undoEnabled(); });
                    var redo = Analytics.Internal.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Redo"; });
                    actions.splice(0, actions.length, del, undo, redo);
                    actions.push({
                        id: Utils.ActionId.Save,
                        text: "Save",
                        displayText: function () { return Analytics.Utils.getLocalization("Save", "AnalyticsCoreStringId.MenuButtons_Save"); },
                        imageClassName: "dxqb-image-save",
                        imageTemplateName: "dxrd-svg-menu-save",
                        disabled: designerModel.isLoading,
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: "S".charCodeAt(0) },
                        clickAction: function () {
                            query().save();
                        },
                        hasSeparator: true
                    });
                    actions.push({
                        id: Utils.ActionId.DataPreview,
                        text: "Preview Results",
                        displayText: function () { return Analytics.Utils.getLocalization("Preview Results", "DataAccessUIStringId.QueryBuilderButtons_PreviewResults"); },
                        imageClassName: "dxrd-image-data-preview",
                        imageTemplateName: "dxrd-svg-queryBuilder-data_preview",
                        disabled: designerModel.isLoading,
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: "P".charCodeAt(0) },
                        clickAction: function () {
                            designerModel.showPreview();
                        },
                        hasSeparator: true
                    });
                    actions.push({
                        id: Utils.ActionId.SelectStatementPreview,
                        text: "Preview Select Statement",
                        displayText: function () { return Analytics.Utils.getLocalization("Preview Select Statement", "AnalyticsCoreStringId.QueryBuilder_PreviewSelectStatement_Tooltip"); },
                        imageClassName: "dxrd-image-selectstatement-preview",
                        imageTemplateName: "dxrd-svg-queryBuilder-select_statment",
                        disabled: designerModel.isLoading,
                        visible: true,
                        hotKey: { ctrlKey: true, keyCode: "E".charCodeAt(0) },
                        clickAction: function () {
                            designerModel.showStatement();
                        },
                        hasSeparator: true
                    });
                    nextCustomizer && nextCustomizer(actions);
                });
            }
            function updateQueryBuilderSurfaceContentSize($root, surfaceSize, surface, updateLayoutCallbacks) {
                return function () {
                    var rightAreaWidth = $root.find(".dxrd-right-panel:visible").outerWidth() || 0;
                    var surfaceWidth = $root.width() - (rightAreaWidth + 5);
                    $root.find(".dxrd-surface-wrapper").css(surface().rtl() ?
                        { "left": rightAreaWidth, "right": 0, "width": surfaceWidth } :
                        { "left": 0, "right": rightAreaWidth, "width": surfaceWidth });
                    surfaceSize(surfaceWidth);
                    surface().pageWidth(surfaceWidth);
                };
            }
            Internal.updateQueryBuilderSurfaceContentSize = updateQueryBuilderSurfaceContentSize;
            function createIsLoadingFlag(model, dbSchemaProvider) {
                var isDbSchemaLoaded = ko.observable(false);
                dbSchemaProvider.subscribe(function () { isDbSchemaLoaded(false); });
                return ko.pureComputed(function () {
                    dbSchemaProvider.peek().getDbSchema().done(function () {
                        isDbSchemaLoaded(true);
                    });
                    if (isDbSchemaLoaded()) {
                        return model().tables.peek().some(function (table) {
                            return !table.isInitialized();
                        });
                    }
                    else {
                        return true;
                    }
                });
            }
            Internal.createIsLoadingFlag = createIsLoadingFlag;
            Internal.isJoinsResolvingDisabled = false;
            function _createQueryBuilder(element, data, callbacks, localization, rtl) {
                if (rtl === void 0) { rtl = false; }
                var _disposableCallBack = callbacks && callbacks.onServerError && Analytics.Internal.processErrorEvent(callbacks.onServerError);
                var wrapper = data.requestWrapper || new Utils.RequestWrapper();
                var parametersMode = data.parametersMode || Elements.Metadata.ParametersMode.ReadWrite;
                var query = ko.observable(), surface = ko.observable(), treeListOptions = ko.observable();
                query.subscribe(function (newValue) {
                    surface(new Elements.QuerySurface(newValue));
                    surface().rtl(rtl);
                });
                var initQuery = function (querySource) {
                    query(new Elements.QueryViewModel(querySource, data.dbSchemaProvider(), parametersMode));
                };
                initQuery(data.querySource());
                var selection = new Analytics.Internal.SurfaceSelection(["alias", "name", "sortOrder"]);
                var designerModel = Analytics.Internal.createDesigner(query, surface, QueryBuilder.Utils.controlsFactory, undefined, undefined, undefined, rtl, selection);
                designerModel.dispose = function () {
                    (_disposableCallBack || {})['dispose'] && _disposableCallBack.dispose();
                };
                designerModel.rootStyle = "dxqb-designer dxd-back-primary2";
                var previewPopupContainer = Analytics.Internal.getParentContainer;
                designerModel.dataPreview = {
                    isLoading: ko.observable(false),
                    isVisible: ko.observable(false),
                    title: function () { return DevExpress.Analytics.Utils.getLocalization("Data Preview (First 100 Rows Displayed)", "AnalyticsCoreStringId.DataPreview_Title"); },
                    template: "dxqb-data-preview",
                    data: {
                        value: ko.observable()
                    },
                    okButtonText: function () { return DevExpress.Analytics.Utils.getLocalization('OK', 'DataAccessUIStringId.Button_OK'); },
                    okButtonHandler: function (e) {
                        e.model.isVisible(false);
                    },
                    container: previewPopupContainer
                };
                designerModel.selectStatmentPreview = {
                    isLoading: ko.observable(false),
                    isVisible: ko.observable(false),
                    template: "dxqb-selectstatment-preview",
                    title: function () { return DevExpress.Analytics.Utils.getLocalization("Select Statement Preview", "AnalyticsCoreStringId.QueryBuilder_SelectStatementPreview_Title"); },
                    data: {
                        value: ko.observable(),
                        aceOptions: DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLAceOptions(true),
                        aceAvailable: DevExpress.Analytics.Widgets.Internal.aceAvailable,
                        additionalOptions: DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLAdditionalOptions(function (newVal) { designerModel.selectStatmentPreview.data.value(newVal); }),
                        languageHelper: DevExpress.QueryBuilder.Widgets.Internal.createDefaultSQLLanguageHelper()
                    },
                    okButtonText: function () { return DevExpress.Analytics.Utils.getLocalization('OK', 'DataAccessUIStringId.Button_OK'); },
                    okButtonHandler: function (e) {
                        e.model.isVisible(false);
                    },
                    container: previewPopupContainer
                };
                designerModel.parts = [
                    { id: QueryBuilderElements.Surface, templateName: QueryBuilderElements.Surface, model: designerModel },
                    { id: QueryBuilderElements.Toolbar, templateName: QueryBuilderElements.Toolbar, model: designerModel },
                    { id: QueryBuilderElements.RightPanel, templateName: QueryBuilderElements.RightPanel, model: designerModel },
                    { id: QueryBuilderElements.DataPreview, templateName: QueryBuilderElements.DataPreview.split("#")[0], model: designerModel.dataPreview },
                    { id: QueryBuilderElements.SqlPreview, templateName: QueryBuilderElements.SqlPreview.split("#")[0], model: designerModel.selectStatmentPreview }
                ];
                designerModel.columnDragHandler = new Internal.ColumnDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
                designerModel.connectionPointDragHandler = designerModel.columnDragHandler;
                designerModel.resizeHandler["handles"] = "e, w";
                designerModel.columnsLoadingMsg = function () { return Analytics.Utils.getLocalization("Loading...", "DataAccessWebStringId.QueryBuilder_ColumnsLoading"); };
                var _searchName = ko.observable("");
                var searchTimeout = null;
                var searchName = ko.computed({
                    read: function () { return _searchName(); },
                    write: function (newVal) {
                        searchTimeout && clearTimeout(searchTimeout);
                        searchTimeout = setTimeout(function () {
                            _searchName(newVal);
                        }, 500);
                    }
                });
                designerModel.searchName = searchName;
                var init = function (querySource) {
                    initQuery(querySource);
                    treeListOptions({
                        itemsProvider: data.dbSchemaProvider(),
                        treeListController: new Internal.QueryBuilderTreeListController(designerModel.undoEngine, query, searchName),
                        selectedPath: ko.observable(),
                        pageSize: 100,
                        templateName: "dxqb-treelist-item-with-search"
                    });
                };
                data.querySource.subscribe(function (newValue) {
                    init(newValue);
                });
                init(data.querySource());
                var tablesTop = ko.observable(355), itemPropertiesTabInfoModel = {
                    editableObject: designerModel.editableObject,
                    properties: new Analytics.Widgets.ObjectProperties(designerModel.editableObject, null, 1),
                    fieldListModel: { treeListOptions: treeListOptions },
                    searchName: searchName,
                    tablesTop: tablesTop,
                    searchPlaceholder: function () { return Analytics.Utils.getLocalization("Enter text to search...", "AnalyticsCoreStringId.QueryBuilder_SearchBox_EmptyText"); }
                };
                var tabPanelItem = new AccordionTabInfo(query, itemPropertiesTabInfoModel, designerModel.undoEngine, selection.focused, parametersMode === Elements.Metadata.ParametersMode.ReadWrite);
                var tabPanel = designerModel.tabPanel;
                tabPanel.tabs.length = 0;
                tabPanel.tabs.push(tabPanelItem);
                tabPanel.width(375);
                designerModel.fieldDragHandler = new Internal.DbObjectDragDropHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
                designerModel.fieldListProvider = new Widgets.Internal.QueryBuilderObjectsProvider(query, Widgets.Internal.QueryBuilderObjectsProvider.whereClauseObjectsFilter);
                designerModel.dataBindingsProvider = designerModel.fieldListProvider;
                designerModel.parametersBindingsProvider = data.parametersItemsProvider || designerModel.dataBindingsProvider;
                designerModel.dataBindingsGroupProvider = new Widgets.Internal.QueryBuilderObjectsProvider(query, Widgets.Internal.QueryBuilderObjectsProvider.groupByObjectsFilter);
                designerModel.isLoading = createIsLoadingFlag(designerModel.model, data.dbSchemaProvider);
                designerModel.actionLists = new Analytics.Internal.ActionLists(surface, designerModel.selection, designerModel.undoEngine, customizeDesignerActions(designerModel, callbacks && callbacks.customizeActions));
                designerModel.selection.focused(surface());
                surface.subscribe(function (newValue) {
                    designerModel.selection.focused(newValue);
                });
                if (!designerModel.isLoading()) {
                    designerModel.undoEngine && designerModel.undoEngine().clearHistory();
                }
                designerModel.isLoading.subscribe(function (value) {
                    designerModel.undoEngine && designerModel.undoEngine().clearHistory();
                });
                designerModel.editableObject.subscribe(function (newValue) {
                    tablesTop.notifySubscribers(null);
                });
                Analytics.Internal.appendStaticContextToRootViewModel(designerModel, DevExpress);
                callbacks.beforeRender && callbacks.beforeRender(designerModel);
                $(element).empty();
                ko.cleanNode(element);
                ko.applyBindings(designerModel, element);
                var updateSurfaceContentSize_ = updateQueryBuilderSurfaceContentSize($(element).find(".dxqb-designer"), designerModel.surfaceSize, surface);
                surface.subscribe(function () { updateSurfaceContentSize_(); });
                $(window).bind("resize", function () {
                    setTimeout(function () { return updateSurfaceContentSize_(); });
                });
                designerModel.tabPanel.width.subscribe(function () {
                    updateSurfaceContentSize_();
                });
                designerModel.updateSurfaceSize = function () {
                    updateSurfaceContentSize_();
                };
                designerModel.updateSurface = function () {
                    updateSurfaceContentSize_();
                    tablesTop(355);
                };
                designerModel.findControl = function (s, e) {
                    var $childs = $(".dxqb-main").children(".dxrd-control");
                    $childs.each(function (_, child) {
                        var $child = $(child);
                        if ($child.offset().top <= e.clientY && $child.offset().left <= e.clientX) {
                            designerModel.selection.focused(ko.dataFor($child[0]));
                            return;
                        }
                    });
                };
                designerModel.updateSurface();
                designerModel.showPreview = function () {
                    designerModel.dataPreview.isLoading(true);
                    designerModel.dataPreview.isVisible(true);
                    wrapper.getDataPreview(data.dbSchemaProvider().connection, JSON.stringify(query().serialize(true))).done(function (data) {
                        designerModel.dataPreview.data.value(JSON.parse(data.dataPreviewJSON));
                        designerModel.dataPreview.isLoading(false);
                    }).fail(function (data) {
                        designerModel.dataPreview.isVisible(false);
                        Analytics.Internal.ShowMessage(Analytics.Internal.getErrorMessage(data));
                    });
                };
                designerModel.showStatement = function () {
                    designerModel.selectStatmentPreview.isLoading(true);
                    designerModel.selectStatmentPreview.isVisible(true);
                    wrapper.getSelectStatement(data.dbSchemaProvider().connection, JSON.stringify(query().serialize(true))).done(function (data) {
                        if (data.errorMessage)
                            Analytics.Internal.ShowMessage(data.errorMessage);
                        designerModel.selectStatmentPreview.data.value(data.sqlSelectStatement);
                        designerModel.selectStatmentPreview.isLoading(false);
                    }).fail(function (data) {
                        designerModel.selectStatmentPreview.isVisible(false);
                        Analytics.Internal.ShowMessage(Analytics.Internal.getErrorMessage(data));
                    });
                };
                return designerModel;
            }
            function createQueryBuilder(element, data, callbacks, localization, rtl) {
                if (rtl === void 0) { rtl = false; }
                if (localization) {
                    Analytics.Utils.addCultureInfo({
                        messages: localization
                    });
                }
                DevExpress.config({ rtlEnabled: !!rtl });
                Internal.registerControls();
                var promises = [];
                callbacks && callbacks.customizeLocalization && callbacks.customizeLocalization(promises);
                return Analytics.Internal.resolveFromPromises(promises, function () { return _createQueryBuilder(element, data, callbacks, localization, rtl); });
            }
            Internal.createQueryBuilder = createQueryBuilder;
            ko.bindingHandlers['dxQueryBuilder'] = {
                init: function (element, valueAccessor) {
                    var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dxrd-querybuilder'), $element = $(element).append(templateHtml);
                    var values = ko.unwrap(valueAccessor());
                    var options = ko.unwrap(values.options);
                    createQueryBuilder($element.children()[0], options.data, options.callbacks, options.localization, options.rtl).done(function (result) {
                        values.designerModel(result);
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            ko.bindingHandlers['dxdTableView'] = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dxd-tableview'), $element = $(element).append(templateHtml), value = ko.unwrap(valueAccessor());
                    ko.applyBindings({
                        data: value,
                        rtl: !!bindingContext.$root.rtl,
                        noDataText: Analytics.Internal.noDataText,
                        isImage: function (index) { return value.schema[index].type === "System.Byte[]"; },
                        isImageTooLarge: function (cellValue) { return cellValue[0] === "!"; },
                        getImageTooLargeText: function (cellValue) { return "Image too large (" + cellValue.substring(1) + " bytes)"; }
                    }, $element.children()[0]);
                    var $titles = $element.find(".dxd-tableview-titles");
                    var $content = $element.find(".dxd-tableview-data table");
                    $element.find(".dxd-tableview-titles .dxd-tableview-resizable").each(function (index, resizable) {
                        var $title = $(resizable).find(".dxd-tableview-cell-text");
                        var $column = $element.find(".dxd-tableview-data .dxd-tableview-resizable" + index);
                        if (index < value.schema.length - 1) {
                            $(resizable).resizable({
                                handles: "e",
                                alsoResize: $column.parent(),
                                resize: function (e, ui) {
                                    $title.outerWidth(ui.size.width);
                                    $column.outerWidth(ui.size.width);
                                }
                            });
                        }
                        var maxWidth = Math.max($title.width(), $column.width());
                        $title.width(maxWidth);
                        $column.width(maxWidth);
                    });
                    var contentScroll = DevExpress.ui.dxScrollView["getInstance"]($(".dxd-tableview-data").get(0));
                    if (contentScroll) {
                        contentScroll.option("onScroll", function (e) {
                            if (e.scrollOffset.left >= 0) {
                                $titles.offset({ left: $content.offset().left, top: $titles.offset().top });
                            }
                        });
                        if (!!bindingContext.$root.rtl) {
                            contentScroll.scrollTo({ left: contentScroll.scrollWidth(), top: 0 });
                        }
                    }
                    Analytics.Internal.addDisposeCallback($element.children()[0], function () {
                        $element.find(".dxd-tableview-titles .dxd-tableview-resizable").each(function (_, resizable) {
                            if ($(resizable).data("ui-resizable"))
                                $(resizable).resizable("destroy");
                        });
                        $element = null;
                    });
                    return { controlsDescendantBindings: true };
                }
            };
            var parametersInfo = { propertyName: "parameters", displayName: "parameters", editor: { custom: "dxqb-parameterspanel" } };
            var selectedItemInfo = { propertyName: "selectedItem", displayName: "selectedItem", editor: { custom: "dxqb-propertygrid" } };
            var fieldsInfo = { propertyName: "fields", displayName: "fields", editor: { custom: "dxqb-fieldspanel" } };
            var queryInfo = { propertyName: "query", displayName: "query", editor: { custom: "dxqb-propertygrid" } };
            var AccordionTabInfo = (function (_super) {
                __extends(AccordionTabInfo, _super);
                function AccordionTabInfo(query, itemPropertiesTabInfoModel, undoEngine, focused, showParameters) {
                    var _this = _super.call(this, {
                        text: "Properties",
                        template: "dxqb-properties-wrapper",
                        model: AccordionTabInfo._createQBPropertyGrid(query, itemPropertiesTabInfoModel, undoEngine, showParameters)
                    }) || this;
                    _this.active(true);
                    _this._getGroupByName("Fields").collapsed(false);
                    _this._disposables.push(focused.subscribe(function (newVal) {
                        if (!(newVal instanceof Elements.QueryViewModel)) {
                            var group = _this._getGroupByName("SelectedItem");
                            group.collapsed(false);
                        }
                    }));
                    return _this;
                }
                AccordionTabInfo._getSelectedItemPropertyName = function (model) {
                    var text = "Selection Properties";
                    var id = "AnalyticsCoreStringId.QueryBuilder_SelectionProperties";
                    switch (model && model.controlType) {
                        case "Query":
                            text = "Query Properties";
                            id = "AnalyticsCoreStringId.QueryBuilder_QueryProperties";
                            break;
                        case "Table":
                            text = "Table Properties";
                            id = "AnalyticsCoreStringId.QueryBuilder_TableProperties";
                            break;
                        case "Column":
                            text = "Column Properties";
                            id = "AnalyticsCoreStringId.QueryBuilder_ColumnProperties";
                            break;
                        case "JoinCondition":
                            text = "Relation Properties";
                            id = "AnalyticsCoreStringId.QueryBuilder_RelationProperties";
                            break;
                    }
                    return Analytics.Utils.getLocalization(text, id);
                };
                AccordionTabInfo._createWrappedObject = function (query, commonModel, undoEngine, showParameters) {
                    var modelProperties = new Analytics.Widgets.ObjectProperties(query, null, 1);
                    var modelValues = ko.computed(function () { return query() && query().parameters; });
                    var info = [queryInfo, selectedItemInfo, fieldsInfo];
                    var object = {
                        selectedItem: commonModel,
                        query: {
                            editableObject: query,
                            properties: modelProperties
                        },
                        fields: commonModel,
                        isPropertyVisible: function (propertyName) {
                            if (propertyName === "selectedItem") {
                                return commonModel.editableObject() !== query();
                            }
                            return true;
                        }
                    };
                    if (showParameters) {
                        object["parameters"] = {
                            values: modelValues,
                            addHandler: function () { return new Elements.ParameterViewModel({ "@Type": "System.String" }); },
                            collapsed: false,
                            undoEngine: undoEngine,
                            isVisibleButton: function (index, button) { return button === "add" || button === "delete"; },
                            template: "#dxqb-collectioneditor-template",
                            textEmptyArray: { text: "Click the Add button to create a parameter.", localizationId: "AnalyticsCoreStringId.QueryBuilder_PageConfigureParametersEmpty" }
                        };
                        info.push(parametersInfo);
                    }
                    object["getInfo"] = function () { return info; };
                    return object;
                };
                AccordionTabInfo._createGroups = function (editableObject, showParameters) {
                    var _this = this;
                    var groups = {
                        "Query": {
                            info: [queryInfo],
                            displayName: function () { return Analytics.Utils.getLocalization("Query Properties", "AnalyticsCoreStringId.QueryBuilder_QueryProperties"); }
                        },
                        "SelectedItem": {
                            info: [selectedItemInfo],
                            displayName: function () { return _this._getSelectedItemPropertyName(editableObject()); }
                        },
                        "Fields": {
                            info: [fieldsInfo],
                            displayName: function () { return Analytics.Utils.getLocalization("Available tables and views", "AnalyticsCoreStringId.QueryBuilder_AvailableTables"); }
                        }
                    };
                    if (showParameters)
                        groups["Parameters"] = {
                            info: [parametersInfo],
                            displayName: function () { return Analytics.Utils.getLocalization("Parameters", "AnalyticsCoreStringId.QueryBuilder_Parameters"); }
                        };
                    return groups;
                };
                AccordionTabInfo._createQBPropertyGrid = function (query, commonModel, undoEngine, showParameters) {
                    var object = this._createWrappedObject(query, commonModel, undoEngine, showParameters);
                    var grid = new Analytics.Internal.ControlProperties(ko.observable(object), {
                        groups: this._createGroups(commonModel.editableObject, showParameters),
                        editors: object["getInfo"]()
                    }, undefined, false);
                    return grid;
                };
                AccordionTabInfo.prototype._getGroupByName = function (name) {
                    return this.model.groups.filter(function (x) { return x["_displayName"] === name; })[0];
                };
                return AccordionTabInfo;
            }(Analytics.Utils.TabInfo));
            Internal.AccordionTabInfo = AccordionTabInfo;
            var ColumnExpressionCollectionHelper = (function () {
                function ColumnExpressionCollectionHelper() {
                }
                ColumnExpressionCollectionHelper.find = function (collection, tableName, columnName) {
                    return Analytics.Internal.findFirstItemMatchesCondition(collection(), function (item) { return item.column() === columnName && item.table() === tableName; });
                };
                ColumnExpressionCollectionHelper.findByName = function (collection, actualName) {
                    return Analytics.Internal.findFirstItemMatchesCondition(collection(), function (item) { return item.actualName() === actualName; });
                };
                ColumnExpressionCollectionHelper.removeDependend = function (collection, tableName) {
                    collection.remove(function (item) { return item.isDepended(tableName); });
                };
                ColumnExpressionCollectionHelper.setUniqueAlias = function (collection, alias) {
                    if (ColumnExpressionCollectionHelper.findByName(collection, alias)) {
                        return Analytics.Internal.getUniqueName(collection().map(function (item) { return item.actualName(); }), alias + "_");
                    }
                    return alias;
                };
                ColumnExpressionCollectionHelper.addNew = function (query, collection, table, column) {
                    var newItem = new Elements.ColumnExpression({ "@Table": table, "@Name": column, "@ItemType": "Column" }, query);
                    if (query.columns === collection && !newItem.alias() && ColumnExpressionCollectionHelper.findByName(collection, newItem.actualName())) {
                        newItem.alias(this.setUniqueAlias(collection, newItem.table() + "_" + newItem.column()));
                    }
                    collection.push(newItem);
                    return newItem;
                };
                ColumnExpressionCollectionHelper.remove = function (collection, tableName, columnName) {
                    collection.remove(function (item) { return item.column() === columnName && item.table() === tableName; });
                };
                return ColumnExpressionCollectionHelper;
            }());
            Internal.ColumnExpressionCollectionHelper = ColumnExpressionCollectionHelper;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
        (function (Utils) {
            Utils.controlsFactory = new Analytics.Utils.ControlsFactory();
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
        (function (Internal) {
            function registerControls() {
                Analytics.Diagram.registerControls();
                QueryBuilder.Utils.controlsFactory.registerControl("Unknown", {
                    info: Metadata.unknownSerializationsInfo,
                    type: Analytics.Elements.ElementViewModel,
                    nonToolboxItem: true,
                    surfaceType: Analytics.Elements.SurfaceElementBase,
                    isDeleteDeny: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Relation", {
                    info: Elements.Metadata.relationSerializationInfo,
                    defaultVal: {},
                    surfaceType: Elements.RelationSurface,
                    popularProperties: [],
                    type: Elements.RelationViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("JoinCondition", {
                    info: Elements.Metadata.joinConditionSerializationInfo,
                    defaultVal: {},
                    surfaceType: Elements.JoinConditionSurface,
                    popularProperties: ["_parentColumnName", "_nestedColumnName", "joinType"],
                    type: Elements.JoinConditionViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Table", {
                    info: Elements.Metadata.tableSerializationInfo,
                    defaultVal: {},
                    surfaceType: Elements.TableSurface,
                    popularProperties: ["name", "alias", "columns"],
                    type: Elements.TableViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Column", {
                    info: Elements.Metadata.columnSerializationInfo,
                    defaultVal: {},
                    surfaceType: Elements.ColumnSurface,
                    popularProperties: ["name", "alias", "selected"],
                    type: Elements.ColumnViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true,
                    isDeleteDeny: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Query", {
                    info: Elements.Metadata.querySerializationsInfo,
                    surfaceType: Elements.QuerySurface,
                    popularProperties: ["name", "filterString", "groupFilterString"],
                    type: Elements.QueryViewModel,
                    elementActionsTypes: [],
                    isContainer: true,
                    nonToolboxItem: true,
                    isDeleteDeny: true
                });
            }
            Internal.registerControls = registerControls;
            var QueryBuilderTreeListController = (function (_super) {
                __extends(QueryBuilderTreeListController, _super);
                function QueryBuilderTreeListController(undoEngine, query, searchName) {
                    var _this = _super.call(this) || this;
                    var dropCallback = QueryBuilder.Internal.DbObjectDragDropHandler.getDropCallback(undoEngine, true);
                    _this.dblClickHandler = function (item) {
                        undoEngine().start();
                        dropCallback(item.data, query());
                        undoEngine().end();
                    };
                    _this.searchName = searchName;
                    _this.itemsFilter = function (item) {
                        return !searchName() || !!DevExpress.Analytics.Internal.findMatchesInString(item.displayName, searchName());
                    };
                    return _this;
                }
                return QueryBuilderTreeListController;
            }(Analytics.Widgets.Internal.TreeListController));
            Internal.QueryBuilderTreeListController = QueryBuilderTreeListController;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
        (function (Utils) {
            var RequestWrapper = (function () {
                function RequestWrapper() {
                }
                RequestWrapper.prototype.sendRequest = function (action, arg) {
                    return Analytics.Internal.ajax(Utils.HandlerUri, action, arg);
                };
                ;
                RequestWrapper.prototype._sendRequest = function (settings) {
                    return Analytics.Internal.ajax(settings);
                };
                RequestWrapper.prototype.getDbSchema = function (connection, tables) {
                    var requestModel = {
                        connectionJSON: this.getConnectionJSON(connection),
                        tables: null,
                        views: null
                    };
                    if (tables && tables.length > 0) {
                        requestModel.tables = (tables || []).filter(function (x) { return !x.isView; }).map(function (x) { return x.name; });
                        requestModel.views = (tables || []).filter(function (x) { return x.isView; }).map(function (x) { return x.name; });
                    }
                    return this.sendRequest("getDBSchema", encodeURIComponent(JSON.stringify(requestModel)));
                };
                RequestWrapper.prototype.getDbStoredProcedures = function (connection) {
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection)
                    });
                    return this.sendRequest("getDBStoredProcedures", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getSelectStatement = function (connection, queryJSON) {
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection),
                        sqlQueryJSON: queryJSON
                    });
                    return this.sendRequest("getSelectStatement", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getDataPreview = function (connection, queryJSON) {
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection),
                        sqlQueryJSON: queryJSON
                    });
                    return this.sendRequest("getDataPreview", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getConnectionJSON = function (connection) {
                    var serializer = new DevExpress.Analytics.Utils.ModelSerializer();
                    var data = { "DataConnection": serializer.serialize(connection) };
                    if (!!connection.options)
                        $.extend(data, { "ConnectionOptions": serializer.serialize(connection.options) });
                    return JSON.stringify(data);
                };
                RequestWrapper.prototype.rebuildResultSchema = function (dataSource, queryName, relationsEditing) {
                    if (relationsEditing === void 0) { relationsEditing = false; }
                    var requestJson = JSON.stringify({
                        sqlDataSourceJSON: JSON.stringify({ "SqlDataSource": new DevExpress.Analytics.Utils.ModelSerializer().serialize(dataSource) }),
                        queryName: queryName,
                        relationsEditing: relationsEditing
                    });
                    return this.sendRequest("rebuildResultSchema", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.validateJsonUri = function (jsonDataSource) {
                    var uriJsonSourceJSON = JSON.stringify(jsonDataSource.source.serialize(true));
                    var requestJson = JSON.stringify({
                        uriJsonSourceJSON: uriJsonSourceJSON
                    });
                    var ajaxSettings = {
                        uri: Utils.HandlerUri,
                        action: "validateJsonEndPoint",
                        arg: encodeURIComponent(requestJson),
                        ignoreError: function () { return true; }
                    };
                    return this._sendRequest(ajaxSettings);
                };
                RequestWrapper.prototype.saveJsonSource = function (connectionName, jsonDataSource) {
                    var jsonSource = jsonDataSource.source;
                    var jsonSourceJSON = JSON.stringify(jsonSource.serialize(true));
                    var requestString = JSON.stringify({
                        connectionName: connectionName,
                        customJson: jsonSource.json(),
                        uriJsonSourceJSON: jsonSourceJSON
                    });
                    return this.sendRequest("saveJsonSource", encodeURIComponent(requestString));
                };
                RequestWrapper.prototype.getJsonSchema = function (jsonDataSource) {
                    var jsonSource = jsonDataSource.source;
                    var jsonSourceJSON = JSON.stringify(jsonSource.serialize(true));
                    var requestString = JSON.stringify({
                        connectionName: jsonDataSource.connectionName(),
                        customJson: jsonSource.json(),
                        uriJsonSourceJSON: jsonSourceJSON
                    });
                    return this.sendRequest("getJsonSchema", encodeURIComponent(requestString));
                };
                return RequestWrapper;
            }());
            Utils.RequestWrapper = RequestWrapper;
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
        (function (Internal) {
            function wrapGetSelectStatement(callback) {
                return function (connection, queryJSON) {
                    if (callback)
                        return callback(connection, queryJSON);
                    return new Utils.RequestWrapper().getSelectStatement(connection, queryJSON);
                };
            }
            Internal.wrapGetSelectStatement = wrapGetSelectStatement;
            function wrapRebuildResultSchema(callback) {
                return function (dataSource, queryName, relationsEditing) {
                    if (callback)
                        return callback(dataSource, queryName, relationsEditing);
                    return new Utils.RequestWrapper().rebuildResultSchema(dataSource, queryName, relationsEditing);
                };
            }
            Internal.wrapRebuildResultSchema = wrapRebuildResultSchema;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
        var Elements;
        (function (Elements) {
            var QueryElementBaseViewModel = (function (_super) {
                __extends(QueryElementBaseViewModel, _super);
                function QueryElementBaseViewModel(control, parent, serializer) {
                    return _super.call(this, control, parent, serializer) || this;
                }
                QueryElementBaseViewModel.prototype.getControlFactory = function () {
                    return QueryBuilder.Utils.controlsFactory;
                };
                return QueryElementBaseViewModel;
            }(Analytics.Elements.ElementViewModel));
            Elements.QueryElementBaseViewModel = QueryElementBaseViewModel;
            var Metadata;
            (function (Metadata) {
                Metadata.allColumnsSerializationInfo = [QueryBuilder.Metadata.name, QueryBuilder.Metadata.selected];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var AllColumnsViewModel = (function (_super) {
                __extends(AllColumnsViewModel, _super);
                function AllColumnsViewModel(parent, serializer) {
                    var _this = _super.call(this, { "@ControlType": "Column" }, parent, serializer) || this;
                    var query = parent.parentModel();
                    var targetColumn = ko.pureComputed(function () {
                        return Analytics.Internal.findFirstItemMatchesCondition(query.columns(), function (item) {
                            return parent.actualName() === item.table() && Metadata.ColumnType.AllColumns === item.itemType();
                        });
                    });
                    _this.selected = ko.pureComputed({
                        read: function () { return !!targetColumn(); },
                        write: function (value) {
                            if (!!targetColumn() === value)
                                return;
                            if (value) {
                                query.columns.push(new ColumnExpression({ "@ItemType": Metadata.ColumnType.AllColumns, "@Table": parent.actualName() }, query, serializer));
                            }
                            else {
                                query.columns.remove(function (item) { return parent.actualName() === item.table() && Metadata.ColumnType.AllColumns === item.itemType(); });
                            }
                        }
                    });
                    var name = Analytics.Utils.getLocalization("(All Columns)", "DataAccessStringId.QueryBuilder_AllColumns");
                    _this.name = ko.pureComputed(function () { return (name.charAt(0) === "*" ? name : "* " + name); });
                    return _this;
                }
                AllColumnsViewModel.prototype.getInfo = function () {
                    return Metadata.allColumnsSerializationInfo;
                };
                return AllColumnsViewModel;
            }(QueryElementBaseViewModel));
            Elements.AllColumnsViewModel = AllColumnsViewModel;
            var AllColumnsSurface = (function (_super) {
                __extends(AllColumnsSurface, _super);
                function AllColumnsSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.template = "dxqb-table-asterisk-field";
                    _this.toggleSelected = function () {
                        _this.getControlModel().selected(!_this.getControlModel().selected());
                    };
                    _this.selectedWrapper = ko.pureComputed(function () {
                        return _this.getControlModel().selected();
                    });
                    _this.isOverAsterisk = ko.pureComputed(function () {
                        return _this.underCursor().isOver && !Analytics.Internal.DragDropHandler.started();
                    });
                    _this.cssClasses = function () {
                        return {
                            'dxd-state-active': _this.selected,
                            'dxd-state-hovered': _this.isOverAsterisk()
                        };
                    };
                    return _this;
                }
                return AllColumnsSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Elements.AllColumnsSurface = AllColumnsSurface;
            (function (Metadata) {
                Metadata.AggregationType = {
                    None: "None",
                    Count: "Count",
                    Max: "Max",
                    Min: "Min",
                    Avg: "Avg",
                    Sum: "Sum",
                    CountDistinct: "CountDistinct",
                    AvgDistinct: "AvgDistinct",
                    SumDistinct: "SumDistinct"
                };
                Metadata.columnSerializationInfo = [
                    QueryBuilder.Metadata.name,
                    { propertyName: "displayType", displayName: "Type", localizationId: "DataAccessUIStringId.ParametersColumn_Type", disabled: true, editor: Widgets.editorTemplates.text },
                    { propertyName: "alias", displayName: "Alias", localizationId: "DataAccessUIStringId.QueryBuilderColumns_Alias", editor: Widgets.editorTemplates.text },
                    QueryBuilder.Metadata.selected,
                    {
                        propertyName: "sortingType",
                        displayName: "Sort Type",
                        editor: Widgets.editorTemplates.combobox,
                        defaultVal: "Unsorted",
                        valuesArray: [
                            { value: "Unsorted", displayValue: "Unsorted", localizationId: "DataAccessUIStringId.SortingTypeNone" },
                            { value: "Ascending", displayValue: "Ascending", localizationId: "DataAccessUIStringId.SortingTypeAscending" },
                            { value: "Descending", displayValue: "Descending", localizationId: "DataAccessUIStringId.SortingTypeDescending" }
                        ],
                        localizationId: "AnalyticsCoreStringId.QueryBuilder_SortType"
                    },
                    { propertyName: "sortOrder", displayName: "Sort Order", editor: Widgets.editorTemplates.numeric, localizationId: "DataAccessUIStringId.QueryBuilderColumns_SortOrder" },
                    { propertyName: "groupBy", displayName: "Group By", editor: Widgets.editorTemplates.bool, defaultVal: false, localizationId: "DataAccessUIStringId.QueryBuilderColumns_GroupBy" },
                    {
                        propertyName: "aggregate",
                        displayName: "Aggregate",
                        editor: Widgets.editorTemplates.comboboxUndo,
                        values: Metadata.AggregationType,
                        defaultVal: Metadata.AggregationType.None,
                        localizationId: "DataAccessUIStringId.QueryBuilderColumns_Aggregate"
                    }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var ColumnViewModel = (function (_super) {
                __extends(ColumnViewModel, _super);
                function ColumnViewModel(model, dbColumn, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "Column" }, model), parent, serializer) || this;
                    _this.displayType = ko.pureComputed(function () {
                        return Analytics.Data.DBColumnType[dbColumn.type] + (dbColumn.size ? '(' + dbColumn.size + ')' : "");
                    });
                    _this.dataType = ko.pureComputed(function () {
                        return Analytics.Data.DBColumn.GetType(dbColumn.type);
                    });
                    _this.actualName = ko.pureComputed(function () {
                        return _this.alias() || _this.name();
                    });
                    var points = parent.getColumnConnectionPoints(_this);
                    _this.rightConnectionPoint = {
                        side: ko.observable(Analytics.Diagram.PointSide.East),
                        location: points.right
                    };
                    _this.leftConnectionPoint = {
                        side: ko.observable(Analytics.Diagram.PointSide.West),
                        location: points.left
                    };
                    var query = parent.parentModel();
                    var targetColumn = ko.pureComputed(function () { return Internal.ColumnExpressionCollectionHelper.find(query.columns, parent.actualName(), _this.name()); });
                    _this.aggregate = ko.pureComputed({
                        read: function () { return targetColumn() ? targetColumn().aggregate() : Metadata.AggregationType.None; },
                        write: function (value) {
                            targetColumn() && targetColumn().aggregate(value);
                        }
                    });
                    _this.alias = ko.pureComputed({
                        read: function () { return targetColumn() ? targetColumn().alias() : ""; },
                        write: function (value) {
                            targetColumn() && targetColumn().alias(value || null);
                        }
                    });
                    var orderByItem = ko.pureComputed(function () { return Internal.ColumnExpressionCollectionHelper.find(query.sorting, parent.actualName(), _this.name()); });
                    _this.sortingType = ko.computed({
                        read: function () {
                            if (!orderByItem())
                                return "Unsorted";
                            return orderByItem().descending() ? "Descending" : "Ascending";
                        },
                        write: function (newValue) {
                            if (newValue !== "Unsorted") {
                                if (orderByItem()) {
                                    orderByItem().descending(newValue === "Descending");
                                }
                                else {
                                    Internal.ColumnExpressionCollectionHelper.addNew(query, query.sorting, parent.actualName(), _this.name())
                                        .descending(newValue === "Descending");
                                }
                            }
                            else if (orderByItem()) {
                                Internal.ColumnExpressionCollectionHelper.remove(query.sorting, parent.actualName(), _this.name());
                            }
                        }
                    });
                    _this.sortOrder = ko.computed({
                        read: function () {
                            var index = query.sorting().indexOf(orderByItem());
                            return index < 0 ? undefined : index + 1;
                        },
                        write: function (newValue) {
                            if (!orderByItem())
                                return;
                            newValue = Math.min(newValue, query.sorting().length);
                            newValue = Math.max(newValue, 1);
                            var oldValue = query.sorting().indexOf(orderByItem());
                            var item = query.sorting.splice(oldValue, 1);
                            query.sorting.splice(newValue - 1, 0, item[0]);
                        }
                    });
                    var groupByItem = ko.computed(function () { return Internal.ColumnExpressionCollectionHelper.find(query.grouping, parent.actualName(), _this.name()); });
                    _this.aggregate.subscribe(function (value) {
                        var parentTable = _this.parentModel();
                        if (value !== Metadata.AggregationType.None) {
                            _this.groupBy(false);
                            if (!_this.alias() || _this._isAliasAutoGenerated(parentTable.actualName())) {
                                var aggregateAlias = _this.name() + '_' + value;
                                _this.alias(Internal.ColumnExpressionCollectionHelper.setUniqueAlias(query.columns, aggregateAlias));
                            }
                        }
                        else if (_this._isAliasAutoGenerated(parentTable.actualName())) {
                            _this.alias(null);
                        }
                    });
                    _this.groupBy = ko.computed({
                        read: function () { return !!groupByItem(); },
                        write: function (value) {
                            if (value) {
                                Internal.ColumnExpressionCollectionHelper.addNew(query, query.grouping, parent.actualName(), _this.name());
                                _this.aggregate(Metadata.AggregationType.None);
                            }
                            else {
                                Internal.ColumnExpressionCollectionHelper.remove(query.grouping, parent.actualName(), _this.name());
                            }
                        }
                    });
                    _this.selected = ko.pureComputed({
                        read: function () { return !!targetColumn(); },
                        write: function (value) {
                            if (!!targetColumn() === value)
                                return;
                            if (value) {
                                Internal.ColumnExpressionCollectionHelper.addNew(query, query.columns, parent.actualName(), _this.name());
                            }
                            else {
                                Internal.ColumnExpressionCollectionHelper.remove(query.columns, parent.actualName(), _this.name());
                                _this.groupBy(false);
                            }
                        }
                    });
                    return _this;
                }
                ColumnViewModel.prototype._isAliasAutoGenerated = function (addedTableName) {
                    if (addedTableName && this.alias() && this.alias().indexOf(addedTableName + '_') === 0) {
                        if (this.alias().substring(addedTableName.length + 1) === this.name())
                            return true;
                    }
                    if (!this.alias() || this.alias().indexOf(this.name() + '_') !== 0)
                        return false;
                    var funcName = this.alias().substring(this.name().length + 1);
                    if (funcName.match(new RegExp('_[0-9]+$')))
                        funcName = funcName.substring(0, funcName.indexOf('_'));
                    return Object.keys(Metadata.AggregationType).indexOf(funcName) > 0;
                };
                ColumnViewModel.prototype.getInfo = function () {
                    return Metadata.columnSerializationInfo;
                };
                ColumnViewModel.prototype.isPropertyDisabled = function (name) {
                    if (name === "sortOrder") {
                        return this.sortingType() === "Unsorted";
                    }
                    else if (name === "aggregate" || name === "alias") {
                        return !this.selected();
                    }
                    else if (name === "groupBy") {
                        var query = this.root;
                        return this.aggregate() && query.aggregatedColumnsCount() === 1;
                    }
                    else
                        return false;
                };
                Object.defineProperty(ColumnViewModel.prototype, "specifics", {
                    get: function () {
                        return Analytics.Data.DBColumn.GetSpecific(this.dataType());
                    },
                    enumerable: true,
                    configurable: true
                });
                return ColumnViewModel;
            }(QueryElementBaseViewModel));
            Elements.ColumnViewModel = ColumnViewModel;
            (function (Metadata) {
                Metadata.ColumnType = {
                    RecordsCount: "RecordsCount",
                    Column: "Column",
                    Expression: "Expression",
                    AllColumns: "AllColumns"
                };
                Metadata.columnExpressionSerializationsInfo = [
                    { propertyName: "expression", modelName: "#text" },
                    { propertyName: "table", modelName: "@Table" },
                    { propertyName: "column", modelName: "@Name" },
                    { propertyName: "aggregate", modelName: "@Aggregate", defaultVal: Metadata.AggregationType.None },
                    { propertyName: "alias", modelName: "@Alias" },
                    { propertyName: "descending", modelName: "@Descending", defaultVal: false },
                    { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var ColumnExpression = (function () {
                function ColumnExpression(model, query, serializer) {
                    var _this = this;
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                    this._dependedTables = [];
                    if (this.table()) {
                        var tableRef = query.getTable(this.table());
                        this.table = ko.pureComputed(function () { return tableRef.actualName(); });
                        this._dependedTables.push(tableRef);
                    }
                    else if (this.expression()) {
                        try {
                            this._criteria = Analytics.Criteria.CriteriaOperator.parse(this.expression());
                            Analytics.Criteria.Utils.criteriaForEach(this._criteria, function (operand) {
                                if (operand instanceof Analytics.Criteria.OperandProperty) {
                                    var dependedTable = Analytics.Internal.findFirstItemMatchesCondition(query.tables(), function (table) { return operand.propertyName.indexOf(table.actualName() + ".") === 0; });
                                    dependedTable && _this._dependedTables.push(dependedTable);
                                }
                            });
                        }
                        catch (e) {
                        }
                    }
                }
                ColumnExpression.prototype.actualName = function () {
                    return this.alias() || this.column();
                };
                ColumnExpression.prototype.getInfo = function () {
                    return Metadata.columnExpressionSerializationsInfo;
                };
                ColumnExpression.prototype.isDepended = function (tableActualName) {
                    return !!Analytics.Internal.findFirstItemMatchesCondition(this._dependedTables, function (depended) { return depended.actualName() === tableActualName; });
                };
                return ColumnExpression;
            }());
            Elements.ColumnExpression = ColumnExpression;
            var ColumnSurface = (function (_super) {
                __extends(ColumnSurface, _super);
                function ColumnSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.template = "dxqb-table-field";
                    _this.toggleSelected = function () {
                        _this.getControlModel().selected(!_this.getControlModel().selected());
                    };
                    _this.selectedWrapper = ko.pureComputed(function () {
                        return _this.getControlModel().selected();
                    });
                    _this.isAggregate = ko.pureComputed(function () { return Widgets.Internal.isAggregatedExpression(_this.getControlModel()); });
                    _this.isAscending = ko.pureComputed(function () {
                        return _this.getControlModel().sortingType() === "Ascending";
                    });
                    _this.isDescending = ko.pureComputed(function () {
                        return _this.getControlModel().sortingType() === "Descending";
                    });
                    _this.cssClasses = function (query, columnDragHandler, parent) {
                        if (!_this._isJoined) {
                            _this._isJoined = ko.pureComputed(function () {
                                return query.isJoined(_this) || _this.getControlModel() === columnDragHandler.getDragColumn();
                            });
                        }
                        if (!_this._isHovered) {
                            _this._isHovered = ko.pureComputed(function () {
                                var isColumnDragStarted = !!columnDragHandler.getDragColumn();
                                var isCurrentTableNotParentForDraggedColumn = isColumnDragStarted && _this.getControlModel().parentModel() !== columnDragHandler.getDragColumn().parentModel();
                                return _this.underCursor().isOver && (!Analytics.Internal.DragDropHandler.started() || isCurrentTableNotParentForDraggedColumn);
                            });
                        }
                        return {
                            'dxd-state-active': _this.selected(),
                            'dxd-state-joined': _this._isJoined,
                            'dxd-state-hovered': _this._isHovered,
                        };
                    };
                    return _this;
                }
                return ColumnSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Elements.ColumnSurface = ColumnSurface;
            (function (Metadata) {
                Metadata.ConditionType = {
                    Equal: "Equal",
                    NotEqual: "NotEqual",
                    Greater: "Greater",
                    GreaterOrEqual: "GreaterOrEqual",
                    Less: "Less",
                    LessOrEqual: "LessOrEqual"
                };
                Metadata.joinConditionSerializationInfo = [
                    { propertyName: "left", displayName: "Left", editor: Widgets.editorTemplates.text, disabled: true, localizationId: "AnalyticsCoreStringId.QueryBuilder_LeftOperand" },
                    { propertyName: "right", displayName: "Right", editor: Widgets.editorTemplates.text, disabled: true, localizationId: "AnalyticsCoreStringId.QueryBuilder_RightOperand" },
                    { propertyName: "parentColumnName", modelName: "@Parent" },
                    { propertyName: "nestedColumnName", modelName: "@Nested" },
                    {
                        propertyName: "joinType",
                        displayName: "Join Type",
                        editor: Widgets.editorTemplates.combobox,
                        defaultVal: "Inner",
                        valuesArray: [
                            { value: "Inner", displayValue: "Inner join", localizationId: "DataAccessStringId.RelationEditorRelationTypeInnerJoin" },
                            { value: "LeftOuter", displayValue: "Left outer join", localizationId: "DataAccessStringId.RelationEditorRelationTypeLeftOuterJoin" }
                        ],
                        localizationId: "AnalyticsCoreStringId.QueryBuilder_JoinType"
                    },
                    {
                        propertyName: "operator",
                        modelName: "@Operator",
                        displayName: "Operator",
                        editor: Widgets.editorTemplates.combobox,
                        defaultVal: Metadata.ConditionType.Equal,
                        valuesArray: [
                            { value: "Equal", displayValue: "Equals to", localizationId: "DataAccessUIStringId.JoinEditorEqualOperator" },
                            { value: "NotEqual", displayValue: "Does not equal to", localizationId: "DataAccessUIStringId.JoinEditorNotEqualOperator" },
                            { value: "Greater", displayValue: "Is greater than", localizationId: "DataAccessUIStringId.JoinEditorGreaterOperator" },
                            { value: "GreaterOrEqual", displayValue: "Is greater than or equal to", localizationId: "DataAccessUIStringId.JoinEditorGreaterOrEqualOperator" },
                            { value: "Less", displayValue: "Is less than", localizationId: "DataAccessUIStringId.JoinEditorLessOperator" },
                            { value: "LessOrEqual", displayValue: "Is less than or equal to", localizationId: "DataAccessUIStringId.JoinEditorLessOrEqualOperator" }
                        ],
                        localizationId: "AnalyticsCoreStringId.QueryBuilder_Operator"
                    },
                    { propertyName: "itemType", modelName: "@itemType" }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var JoinConditionViewModel = (function (_super) {
                __extends(JoinConditionViewModel, _super);
                function JoinConditionViewModel(control, relation, serializer) {
                    var _this = _super.call(this, $.extend(control, { "@ControlType": "JoinCondition", "@ItemType": "KeyColumn" }), relation, serializer) || this;
                    _this.parentColumn = ko.pureComputed(function () { return relation.parentTable().getColumn(_this.parentColumnName()); });
                    _this.nestedColumn = ko.pureComputed(function () { return relation.nestedTable().getColumn(_this.nestedColumnName()); });
                    _this.joinType = relation.joinType;
                    _this.left = ko.pureComputed(function () { return relation.parentTableName() + '.' + _this.parentColumnName(); });
                    _this.right = ko.pureComputed(function () { return relation.nestedTableName() + '.' + _this.nestedColumnName(); });
                    _this._disposables.push(ko.computed(function () {
                        if (_this.parentColumn() && _this.nestedColumn()) {
                            var result = Analytics.Diagram.determineConnectingPoints(_this.parentColumn(), _this.nestedColumn());
                            _this.startPoint().connectingPoint(result.start);
                            _this.endPoint().connectingPoint(result.end);
                        }
                    }));
                    return _this;
                }
                JoinConditionViewModel.prototype.getControlFactory = function () {
                    return QueryBuilder.Utils.controlsFactory;
                };
                JoinConditionViewModel.prototype.preInitProperties = function () {
                    this.startPoint = ko.observable();
                    this.endPoint = ko.observable();
                };
                return JoinConditionViewModel;
            }(Analytics.Diagram.RoutedConnectorViewModel));
            Elements.JoinConditionViewModel = JoinConditionViewModel;
            var JoinConditionSurface = (function (_super) {
                __extends(JoinConditionSurface, _super);
                function JoinConditionSurface(control, context) {
                    var _this = _super.call(this, control, context) || this;
                    _this.showArrow = ko.pureComputed(function () {
                        return control.joinType() === "LeftOuter";
                    });
                    return _this;
                }
                JoinConditionSurface.prototype.container = function () {
                    return this.getRoot();
                };
                return JoinConditionSurface;
            }(Analytics.Diagram.RoutedConnectorSurface));
            Elements.JoinConditionSurface = JoinConditionSurface;
            (function (Metadata) {
                Metadata.ParametersMode = {
                    ReadWrite: "ReadWrite",
                    Read: "Read",
                    Disabled: "Disabled"
                };
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var ParameterViewModel = (function (_super) {
                __extends(ParameterViewModel, _super);
                function ParameterViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ParameterViewModel.prototype.getEditorType = function (type) {
                    if (type === "DevExpress.DataAccess.Expression")
                        return { header: "dxqb-expressionstring" };
                    return Analytics.Internal.getEditorType(type);
                };
                return ParameterViewModel;
            }(Analytics.Data.DataSourceParameter));
            Elements.ParameterViewModel = ParameterViewModel;
            var QueryElementBaseSurface = (function (_super) {
                __extends(QueryElementBaseSurface, _super);
                function QueryElementBaseSurface(control, context, unitProperties) {
                    var _this = _super.call(this, control, context, $.extend({}, QueryElementBaseSurface._unitProperties, unitProperties)) || this;
                    _this.template = "dx-diagram-element";
                    _this.selectiontemplate = "dx-diagram-element-selection";
                    _this.contenttemplate = "dx-diagram-element-content";
                    _this.margin = ko.observable(0);
                    return _this;
                }
                QueryElementBaseSurface._unitProperties = {
                    _height: function (o) {
                        return o.size.height;
                    },
                    _width: function (o) {
                        return o.size.width;
                    },
                    _x: function (o) {
                        return o.location.x;
                    },
                    _y: function (o) {
                        return o.location.y;
                    }
                };
                return QueryElementBaseSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Elements.QueryElementBaseSurface = QueryElementBaseSurface;
            var QueryViewModel = (function (_super) {
                __extends(QueryViewModel, _super);
                function QueryViewModel(querySource, dbSchemaProvider, parametersMode, serializer) {
                    if (parametersMode === void 0) { parametersMode = Metadata.ParametersMode.ReadWrite; }
                    var _this = _super.call(this, $.extend(true, querySource, QueryViewModel.emptyModel, querySource), null, serializer) || this;
                    _this.aggregatedColumnsCount = ko.observable(0);
                    _this._findAncestorsRelations = function (table) {
                        var relations;
                        var result = { inner: 0, outer: 0, relations: [] };
                        _this.relations().forEach(function (item) {
                            if (item.nestedTable() === table) {
                                result.relations.push(item);
                                item.joinType() === "LeftOuter" ? result.outer++ : result.inner++;
                                var parentResult = _this._findAncestorsRelations(item.parentTable());
                                result.inner += parentResult.inner;
                                result.outer += parentResult.outer;
                                result.relations.push.apply(result.relations, parentResult.relations);
                            }
                        });
                        return result;
                    };
                    _this["type"]("SelectQuery");
                    _this.controlType = "Query";
                    _this.dbSchemaProvider = dbSchemaProvider;
                    _this.tables = DevExpress.Analytics.Utils.deserializeArray(querySource["Tables"]["SelectedTables"], function (item) { return new TableViewModel(item, _this, serializer); });
                    _this.columns = DevExpress.Analytics.Utils.deserializeArray(querySource["Columns"], function (item) { return new ColumnExpression(item, _this, serializer); });
                    _this.sorting = DevExpress.Analytics.Utils.deserializeArray(querySource["Sorting"], function (item) { return new ColumnExpression(item, _this, serializer); });
                    _this.grouping = DevExpress.Analytics.Utils.deserializeArray(querySource["Grouping"], function (item) { return new ColumnExpression(item, _this, serializer); });
                    _this.tables().forEach(function (table) { _this._initializeTable(table); });
                    _this.relations = Analytics.Utils.deserializeArray(querySource["Tables"]["Relations"], function (item) { return new RelationViewModel(item, _this, serializer); });
                    _this["_tablesObject"]["tables"] = _this.tables;
                    _this["_tablesObject"]["relations"] = _this.relations;
                    _this.tables().reduce(function (posX, tableModel) {
                        tableModel.location.x(posX);
                        tableModel.location.y(65);
                        return posX + tableModel.size.width() + tableModel.size.width() / 2;
                    }, 30);
                    var parameters = Analytics.Utils.deserializeArray(querySource["Parameters"], function (item) { return new ParameterViewModel(item, serializer); });
                    if (parametersMode === Metadata.ParametersMode.ReadWrite) {
                        _this.parameters = parameters;
                        _this._disposables.push(_this.parameters.subscribe(function (changes) {
                            changes.forEach(function (change) {
                                if (change.status === "added" && !change.value.name())
                                    change.value.name(Analytics.Internal.getUniqueName(_this.parameters().filter(function (x) { return x !== change.value; }).map(function (x) { return x.name(); }), "parameter"));
                            });
                        }, null, "arrayChange"));
                    }
                    else {
                        _this.parameters = ko.computed(function () { return parameters(); });
                    }
                    _this.editableName = ko.observable(_this.name());
                    _this.name = ko.pureComputed({
                        read: _this.editableName,
                        write: function (val) { }
                    });
                    _this.filterString = new Widgets.Internal.QBFilterStringOptions(_this._filterString, null, ko.pureComputed(function () { return (_this.tables().length === 0) && (_this.filterString && _this.filterString.value().length === 0); }));
                    _this.filterString.initializeFilterStringHelper(_this.parameters, parametersMode);
                    var inProcess = false;
                    _this._disposables.push(ko.computed(function () {
                        if (!inProcess) {
                            inProcess = true;
                            var allColumns = _this.getAllColumns();
                            var withoutAggregate = allColumns.filter(function (x) { return x.aggregate() === Metadata.AggregationType.None; });
                            _this.aggregatedColumnsCount(allColumns.length - withoutAggregate.length);
                            if (allColumns.length !== withoutAggregate.length) {
                                withoutAggregate.filter(function (x) { return x.selected() && !x.groupBy.peek(); }).forEach(function (x) { return x.groupBy(true); });
                            }
                            else {
                                if (!allColumns.every(function (x) { return !x.selected.peek() || x.groupBy.peek(); })) {
                                    allColumns.forEach(function (x) { if (x.groupBy.peek()) {
                                        x.groupBy(false);
                                    } });
                                }
                            }
                            inProcess = false;
                        }
                    }));
                    _this.groupFilterString = new Widgets.Internal.QBFilterStringOptions(_this._groupFilterString, null, ko.pureComputed(function () { return !_this.columns().some(Widgets.Internal.isAggregatedExpression) && (_this.groupFilterString && (_this.groupFilterString.value() || '').length === 0); }));
                    _this.groupFilterString.initializeFilterStringHelper(_this.parameters, parametersMode, new Widgets.Internal.GroupFilterEditorSerializer(_this.columns));
                    var _pageWidth = ko.observable(0);
                    _this.pageWidth = ko.pureComputed({
                        read: function () {
                            var result = 500;
                            _this.tables().forEach(function (table) {
                                var right = table.location.x() + table.size.width();
                                if (right > result) {
                                    result = right;
                                }
                            });
                            return Math.max(_pageWidth(), result);
                        },
                        write: function (value) {
                            _pageWidth(value);
                        }
                    });
                    _this.pageHeight = ko.pureComputed(function () {
                        var result = 500;
                        _this.tables().forEach(function (table) {
                            var bottom = table.location.y() + table.size.height();
                            if (bottom > result) {
                                result = bottom + QueryViewModel.pageMargin;
                            }
                        });
                        return result;
                    });
                    _this.margins = Analytics.Elements.Margins.fromString();
                    _this.isValid = ko.pureComputed(function () { return _this._validate(); });
                    var isAllColumnsAllTablesExpression = function (column) { return !column.table() && column.itemType() === Metadata.ColumnType.AllColumns; };
                    _this.allColumnsInTablesSelected = ko.computed({
                        read: function () { return _this.columns().some(isAllColumnsAllTablesExpression); },
                        write: function (value) {
                            if (value) {
                                _this.columns.push(new ColumnExpression({ "@ItemType": "AllColumns" }, _this, serializer));
                            }
                            else {
                                _this.columns.remove(isAllColumnsAllTablesExpression);
                            }
                        }
                    });
                    return _this;
                }
                QueryViewModel.prototype._initializeTable = function (table) {
                    this.dbSchemaProvider.getDbTable(table.name())
                        .done(function (dbTable) {
                        table.createColumns(dbTable);
                    });
                };
                QueryViewModel.prototype.isPropertyDisabled = function (name) {
                    if (name === "skip")
                        return this.skip() === 0 && !this.sorting().length;
                    return false;
                };
                QueryViewModel.prototype.getInfo = function () {
                    return Metadata.querySerializationsInfo;
                };
                QueryViewModel.prototype.createChild = function (info) {
                    if (info["@ControlType"] !== "Table") {
                        return _super.prototype.createChild.call(this, info);
                    }
                    var table = new TableViewModel(info, this);
                    this._initializeTable(table);
                    this.addChild(table);
                    return table;
                };
                QueryViewModel.prototype.getAllColumns = function () {
                    return [].concat.apply([], this.tables().map(function (x) { return x.columns(); }));
                };
                QueryViewModel.prototype.tryToCreateRelationsByFK = function (sourceTable) {
                    var _this = this;
                    if (QueryBuilder.Internal.isJoinsResolvingDisabled)
                        return;
                    this.dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                        var dbSourceTable = dbSchema.tables.filter(function (item) { return item.name === sourceTable.name(); })[0];
                        if (dbSourceTable) {
                            dbSourceTable.foreignKeys.forEach(function (fk) {
                                var pkTable = Analytics.Internal.getFirstItemByPropertyValue(_this.tables.peek(), "name", fk.primaryKeyTable);
                                if (pkTable) {
                                    var column1 = Analytics.Internal.getFirstItemByPropertyValue(sourceTable.columns(), "name", fk.column);
                                    var column2 = Analytics.Internal.getFirstItemByPropertyValue(pkTable.columns(), "name", fk.primaryKeyColumn);
                                    if (column1 && column2) {
                                        _this.cerateJoinCondition(column1, column2);
                                    }
                                }
                            });
                        }
                        _this.tables.peek().forEach(function (table) {
                            var dbTable = dbSchema.tables.filter(function (item) { return item.name === table.name(); })[0];
                            if (dbTable) {
                                dbTable.foreignKeys.forEach(function (fk) {
                                    if (fk.primaryKeyTable === sourceTable.name()) {
                                        var column1 = Analytics.Internal.getFirstItemByPropertyValue(sourceTable.columns(), "name", fk.primaryKeyColumn);
                                        var column2 = Analytics.Internal.getFirstItemByPropertyValue(table.columns(), "name", fk.column);
                                        if (column1 && column2) {
                                            _this.cerateJoinCondition(column2, column1);
                                        }
                                    }
                                });
                            }
                        });
                    });
                };
                QueryViewModel.prototype.addChild = function (control) {
                    if (control instanceof RelationViewModel) {
                        if (this.relations.indexOf(control) > -1)
                            return;
                        control.parentModel(this);
                        this.relations.push(control);
                    }
                    else if (control instanceof TableViewModel) {
                        if (this.tables.indexOf(control) > -1)
                            return;
                        control.parentModel(this);
                        if (Analytics.Internal.getFirstItemByPropertyValue(this.tables(), "actualName", control.name()) !== null) {
                            control.alias(Analytics.Internal.getUniqueName(this.tables().map(function (table) { return table.actualName(); }), control.name() + '_'));
                        }
                        this.tables.push(control);
                    }
                    else {
                        Analytics.Internal.NotifyAboutWarning("Attempt to add wrong child control.");
                    }
                };
                QueryViewModel.prototype.removeChild = function (control) {
                    if (control instanceof RelationViewModel) {
                        if (this.relations().length < 1)
                            return;
                        var relation = control;
                        var indexRelation = this.relations().indexOf(relation);
                        while (relation.conditions().length > 0)
                            relation.conditions.pop();
                        this.relations.splice(indexRelation, 1);
                    }
                    else if (control instanceof TableViewModel) {
                        if (this.tables().length < 1)
                            return;
                        this.tables.splice(this.tables().indexOf(control), 1);
                        var relations = this.relations();
                        for (var i = relations.length - 1; i > -1; i--) {
                            if (relations[i].parentTable() === control || relations[i].nestedTable() === control) {
                                this.removeChild(relations[i]);
                            }
                        }
                        this.sorting.remove(function (item) { return item.isDepended(control.actualName()); });
                        this.grouping.remove(function (item) { return item.isDepended(control.actualName()); });
                        this.columns.remove(function (item) { return item.isDepended(control.actualName()); });
                    }
                    else {
                        Analytics.Internal.NotifyAboutWarning("Attempt to remove wrong child control.");
                    }
                };
                QueryViewModel.prototype.getTable = function (name) {
                    return Analytics.Internal.findFirstItemMatchesCondition(this.tables(), function (item) { return item.actualName() === name; });
                };
                QueryViewModel.prototype._findTableInAncestors = function (child, probablyAncestor) {
                    var _this = this;
                    return this.relations().some(function (relation) {
                        return relation.nestedTable() === child && (relation.parentTable() === probablyAncestor || _this._findTableInAncestors(relation.parentTable(), probablyAncestor));
                    });
                };
                QueryViewModel.prototype._findHead = function (table) {
                    var result = null;
                    this.relations().some(function (relation) {
                        if (relation.nestedTable() === table)
                            result = relation;
                        return !!result;
                    });
                    return result ? this._findHead(result.parentTable()) : table;
                };
                QueryViewModel.prototype._isHead = function (table) {
                    return !this.relations().some(function (relation) { return relation.nestedTable() === table; });
                };
                QueryViewModel.prototype._reverseRelations = function (table, relationsToReverse) {
                    relationsToReverse.forEach(function (item) {
                        var tempTable = item.parentTable();
                        item.parentTable(item.nestedTable());
                        item.nestedTable(tempTable);
                        item.conditions().forEach(function (condition) {
                            var tempColumn = condition.parentColumnName();
                            condition.parentColumnName(condition.nestedColumnName());
                            condition.nestedColumnName(tempColumn);
                        });
                    });
                };
                QueryViewModel.prototype.cerateJoinCondition = function (parentColumn, nestedColumn) {
                    var parentTable = parentColumn.parentModel();
                    var nestedTable = nestedColumn.parentModel();
                    if (parentTable === nestedTable)
                        return null;
                    var isColumnsReplaced = false;
                    var relation = Analytics.Internal.findFirstItemMatchesCondition(this.relations(), function (relation) {
                        isColumnsReplaced = relation.parentTable() === nestedTable && relation.nestedTable() === parentTable;
                        return relation.parentTable() === parentTable && relation.nestedTable() === nestedTable || isColumnsReplaced;
                    });
                    if (relation) {
                    }
                    else if (this._findTableInAncestors(parentTable, nestedTable)) {
                        isColumnsReplaced = true;
                    }
                    else if (this._findHead(parentTable) !== this._findHead(nestedTable) && !this._isHead(nestedTable)) {
                        var parentRelations = this._findAncestorsRelations(parentTable);
                        var nestedRelations = this._findAncestorsRelations(nestedTable);
                        if (parentRelations.outer > nestedRelations.outer) {
                            this._reverseRelations(nestedTable, nestedRelations.relations);
                        }
                        else if (parentRelations.outer < nestedRelations.outer) {
                            this._reverseRelations(parentTable, parentRelations.relations);
                            isColumnsReplaced = true;
                        }
                        else if (parentRelations.inner >= nestedRelations.inner) {
                            this._reverseRelations(nestedTable, nestedRelations.relations);
                        }
                        else if (parentRelations.inner < nestedRelations.inner) {
                            this._reverseRelations(parentTable, parentRelations.relations);
                            isColumnsReplaced = true;
                        }
                    }
                    if (isColumnsReplaced) {
                        var tempTable = parentTable;
                        parentTable = nestedTable;
                        nestedTable = tempTable;
                        var tempColumn = parentColumn;
                        parentColumn = nestedColumn;
                        nestedColumn = tempColumn;
                    }
                    relation = relation || this.createChild({
                        "@ControlType": "Relation",
                        "@Parent": parentTable.actualName(),
                        "@Nested": nestedTable.actualName(),
                        "@Type": "Inner"
                    });
                    var joinCondition = Analytics.Internal.findFirstItemMatchesCondition(relation.conditions(), function (condition) {
                        return condition.parentColumn() === parentColumn && condition.nestedColumn() === nestedColumn;
                    });
                    if (!joinCondition) {
                        joinCondition = relation.createChild({ "@ControlType": "JoinCondition", "@Parent": parentColumn.name(), "@Nested": nestedColumn.name() });
                    }
                    return joinCondition;
                };
                QueryViewModel.prototype._validate = function () {
                    if (this.tables().length === 0)
                        return false;
                    if (!(this.allColumnsInTablesSelected() || this.tables().some(function (t) { return t.asterisk.selected() || t.columns().some(function (c) { return c.selected(); }); })))
                        return false;
                    var tables = this.tables().map(function (table) { return table.actualName(); });
                    this._validateTable(tables, tables[0]);
                    return tables.length < 1;
                };
                QueryViewModel.prototype._validateTable = function (tables, tableName) {
                    var _this = this;
                    var index = tables.indexOf(tableName);
                    if (index < 0)
                        return;
                    tables.splice(index, 1);
                    var connectedTables = this.relations().map(function (relation) {
                        if (relation.parentTableName() === tableName)
                            return relation.nestedTableName();
                        if (relation.nestedTableName() === tableName)
                            return relation.parentTableName();
                        return null;
                    });
                    connectedTables.forEach(function (item) { return _this._validateTable(tables, item); });
                };
                QueryViewModel.prototype.serialize = function (includeRootTag) {
                    if (includeRootTag === void 0) { includeRootTag = false; }
                    return includeRootTag ? { "Query": this.serialize() } : (new DevExpress.Analytics.Utils.ModelSerializer()).serialize(this);
                };
                QueryViewModel.prototype.save = function () {
                    var data = this.serialize(true);
                    if (this.onSave) {
                        this.onSave(data);
                    }
                    return data;
                };
                QueryViewModel.pageMargin = 20;
                QueryViewModel.emptyModel = { "@ItemType": "Query", "Tables": { "SelectedTables": {}, "Relations": {} }, "Columns": {}, "Sorting": {}, "Grouping": {} };
                return QueryViewModel;
            }(QueryElementBaseViewModel));
            Elements.QueryViewModel = QueryViewModel;
            (function (Metadata) {
                Metadata.querySerializationsInfo = [
                    {
                        propertyName: "_tablesObject", modelName: "Tables", info: [
                            { propertyName: "tables", modelName: "SelectedTables", array: true },
                            { propertyName: "relations", modelName: "Relations", array: true }
                        ]
                    },
                    { propertyName: "parameters", modelName: "Parameters", array: true },
                    { propertyName: "type", modelName: "@Type" },
                    { propertyName: "name", modelName: "@Name" },
                    { propertyName: "editableName", displayName: "Name", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Name", editor: Widgets.editorTemplates.text },
                    { propertyName: "_filterString", modelName: "Filter", defaultVal: "" },
                    { propertyName: "filterString", defaultVal: "", displayName: "Filter", localizationId: "DataAccessUIStringId.FiltersView_Filter", editor: Widgets.editorTemplates.filterEditor },
                    { propertyName: "_groupFilterString", modelName: "GroupFilter", defaultVal: "" },
                    { propertyName: "groupFilterString", defaultVal: "", displayName: "Group Filter", localizationId: "DataAccessUIStringId.FiltersView_GroupFilter", editor: Widgets.editorTemplates.filterGroupEditor },
                    { propertyName: "columns", modelName: "Columns", array: true },
                    { propertyName: "sorting", modelName: "Sorting", array: true },
                    { propertyName: "grouping", modelName: "Grouping", array: true },
                    { propertyName: "itemType", modelName: "@ItemType" },
                    { propertyName: "allColumnsInTablesSelected", displayName: "Select All (*)", localizationId: "AnalyticsCoreStringId.QueryBuilder_SelectAll", editor: Widgets.editorTemplates.bool },
                    { propertyName: "top", modelName: "@Top", displayName: "Select Top", defaultVal: 0, from: Analytics.Utils.floatFromModel, localizationId: "AnalyticsCoreStringId.QueryBuilder_SelectTop", editor: Widgets.editorTemplates.numeric, editorOptions: { format: "#0", min: 0 } },
                    { propertyName: "skip", modelName: "@Skip", displayName: "Offset", defaultVal: 0, from: Analytics.Utils.floatFromModel, localizationId: "AnalyticsCoreStringId.QueryBuilder_Offset", editor: Widgets.editorTemplates.numeric, editorOptions: { format: "#0", min: 0 } },
                    { propertyName: "distinct", modelName: "@Distinct", defaultVal: false, from: Analytics.Utils.parseBool, displayName: "Select distinct", localizationId: "AnalyticsCoreStringId.QueryBuilder_SelectDistinct", editor: Widgets.editorTemplates.bool }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var QuerySurface = (function (_super) {
                __extends(QuerySurface, _super);
                function QuerySurface(query, zoom) {
                    if (zoom === void 0) { zoom = ko.observable(1); }
                    var _this = _super.call(this, query, {
                        measureUnit: ko.observable("Pixels"),
                        zoom: zoom,
                        dpi: ko.observable(100)
                    }, QuerySurface._unitProperties) || this;
                    _this.placeholder = function () { return DevExpress.Analytics.Utils.getLocalization('Drop a table or view here to create a query.', 'AnalyticsCoreStringId.QueryBuilder_SurfacePlaceholder'); };
                    _this.tables = ko.observableArray();
                    _this.relations = ko.observableArray();
                    _this.allowMultiselect = false;
                    _this.focused = ko.observable(false);
                    _this.selected = ko.observable(false);
                    _this.underCursor = ko.observable(new Analytics.Internal.HoverInfo());
                    _this.templateName = "dx-query-surface";
                    _this.rtl = ko.observable(false);
                    _this.measureUnit = _this._context.measureUnit;
                    _this.dpi = _this._context.dpi;
                    _this._context = _this;
                    _this.margins = { bottom: _this["_bottom"], left: _this["_left"], right: _this["_right"], top: _this["_top"] };
                    _this.zoom = zoom;
                    Analytics.Internal.createObservableArrayMapCollection(query.tables, _this.tables, _this._createSurface);
                    Analytics.Internal.createObservableArrayMapCollection(query.relations, _this.relations, _this._createSurface);
                    _this._joinedColumns = ko.computed(function () {
                        var resultColumns = [];
                        _this.relations().forEach(function (relation) {
                            relation.conditions().forEach(function (condition) {
                                var joinModel = condition.getControlModel();
                                joinModel.parentColumn() && resultColumns.push(joinModel.parentColumn());
                                joinModel.nestedColumn() && resultColumns.push(joinModel.nestedColumn());
                            });
                        });
                        return resultColumns;
                    });
                    return _this;
                }
                QuerySurface.prototype.checkParent = function (surfaceParent) { return false; };
                QuerySurface.prototype.getChildrenCollection = function () {
                    return this.tables;
                };
                QuerySurface.prototype.isJoined = function (column) {
                    return this._joinedColumns().indexOf(column.getControlModel()) > -1;
                };
                QuerySurface._unitProperties = {
                    _width: function (o) { return o.pageWidth; },
                    _height: function (o) { return o.pageWidth; },
                    pageWidth: function (o) { return o.pageWidth; },
                    pageHeight: function (o) { return o.pageHeight; },
                    _bottom: function (o) { return o.margins.bottom; },
                    _left: function (o) { return o.margins.left; },
                    _right: function (o) { return o.margins.right; },
                    _top: function (o) { return o.margins.top; }
                };
                return QuerySurface;
            }(Analytics.Elements.SurfaceElementBase));
            Elements.QuerySurface = QuerySurface;
            (function (Metadata) {
                Metadata.relationSerializationInfo = [
                    { propertyName: "joinType", modelName: "@Type" },
                    { propertyName: "parentTableName", modelName: "@Parent" },
                    { propertyName: "nestedTableName", modelName: "@Nested" },
                    { propertyName: "conditions", modelName: "KeyColumns", defaultVal: [], array: true },
                    { propertyName: "itemType", modelName: "@itemType" }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var RelationViewModel = (function (_super) {
                __extends(RelationViewModel, _super);
                function RelationViewModel(model, query, serializer) {
                    var _this = _super.call(this, $.extend(model, { "@ControlType": "Relation", "@ItemType": "Relation" }), query, serializer) || this;
                    _this.parentTable = ko.observable(query.getTable(_this.parentTableName.peek()));
                    _this.nestedTable = ko.observable(query.getTable(_this.nestedTableName.peek()));
                    _this.parentTableName = ko.pureComputed(function () { return _this.parentTable().actualName(); });
                    _this.nestedTableName = ko.pureComputed(function () { return _this.nestedTable().actualName(); });
                    _this.conditions = DevExpress.Analytics.Utils.deserializeArray(model["KeyColumns"], function (item) {
                        return new JoinConditionViewModel(item, _this, serializer);
                    });
                    return _this;
                }
                RelationViewModel.prototype._getConditionNumber = function () {
                    var result = this.conditions().length + 1;
                    var existingNumbers = this.conditions().map(function (_c) { return _c.seriesNumber(); });
                    for (var index = 0; index < this.conditions().length; index++) {
                        if (existingNumbers.indexOf(index + 1) !== -1)
                            continue;
                        result = index + 1;
                        break;
                    }
                    return result;
                };
                RelationViewModel.prototype.getInfo = function () {
                    return Metadata.relationSerializationInfo;
                };
                RelationViewModel.prototype.addChild = function (control) {
                    var condition = control;
                    if (this.conditions && this.conditions.indexOf(condition) === -1) {
                        condition.seriesNumber(this._getConditionNumber());
                        condition.parentModel(this);
                        this.conditions.push(condition);
                    }
                };
                RelationViewModel.prototype.removeChild = function (control) {
                    var index = this.conditions().indexOf(control);
                    if (index > -1)
                        this.conditions.splice(index, 1);
                    if (this.conditions().length === 0)
                        this.parentModel().removeChild(this);
                };
                return RelationViewModel;
            }(QueryElementBaseViewModel));
            Elements.RelationViewModel = RelationViewModel;
            var RelationSurface = (function (_super) {
                __extends(RelationSurface, _super);
                function RelationSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.conditions = ko.observableArray();
                    _this.template = "dxqb-relation";
                    Analytics.Internal.createObservableArrayMapCollection(control.conditions, _this.conditions, _this._createSurface);
                    return _this;
                }
                RelationSurface.prototype._getChildrenHolderName = function () {
                    return "conditions";
                };
                return RelationSurface;
            }(Analytics.Elements.SurfaceElementBase));
            Elements.RelationSurface = RelationSurface;
            (function (Metadata) {
                Metadata.tableSerializationInfo = [
                    QueryBuilder.Metadata.name, QueryBuilder.Metadata.alias, { propertyName: "itemType", modelName: "@ItemType" }
                ];
            })(Metadata = Elements.Metadata || (Elements.Metadata = {}));
            var TableViewModel = (function (_super) {
                __extends(TableViewModel, _super);
                function TableViewModel(model, parent, serializer) {
                    var _this = _super.call(this, $.extend(model, { "@ControlType": "Table", "@ItemType": "Table" }), parent, serializer) || this;
                    _this.serializer = serializer;
                    _this._columnsConnectionPointLeftX = ko.pureComputed(function () { return _this.location.x(); });
                    _this._columnsConnectionPointRightX = ko.pureComputed(function () { return _this.location.x() + _this.size.width(); });
                    _this._columns = ko.observableArray();
                    _this._initialized = ko.observable(false);
                    _this.size = new Analytics.Elements.Size(199, 123);
                    _this.location = new Analytics.Elements.Point(0, 0);
                    _this.actualName = ko.pureComputed(function () { return _this.alias() || _this.name(); });
                    _this.isReady = ko.observable(false);
                    _this.allColumnsSelected = ko.computed({
                        read: function () {
                            var selectedColumns = _this.columns().filter(function (item) { return item.selected(); });
                            if (selectedColumns.length === 0) {
                                return false;
                            }
                            if (selectedColumns.length === _this._columns.peek().length) {
                                return true;
                            }
                            return false;
                        },
                        deferEvaluation: true
                    });
                    _this.isInitialized = ko.pureComputed(function () { return _this._initialized(); });
                    _this.size.height = ko.pureComputed({
                        read: function () {
                            if (_this._columns().length === 0) {
                                return TableViewModel.TABLE_DEFAULT_HEIGHT;
                            }
                            return TableViewModel.COLUMNS_OFFSET + (TableViewModel.COLUMN_HEIGHT + TableViewModel.COLUMN_MARGIN) * (_this._columns().length + 1);
                        },
                        write: function () {
                        }
                    });
                    _this.asterisk = new AllColumnsViewModel(_this, _this.serializer);
                    return _this;
                }
                TableViewModel.prototype.columns = function () {
                    return this._columns();
                };
                TableViewModel.prototype.toggleSelectedColumns = function () {
                    var value = !this.allColumnsSelected.peek();
                    this._columns.peek().forEach(function (column) { column.selected(value); });
                };
                TableViewModel.prototype.getColumnConnectionPoints = function (column) {
                    var _this = this;
                    var y = ko.pureComputed({
                        read: function () {
                            var index = _this._columns.indexOf(column) + 1;
                            return _this.location.y() + TableViewModel.COLUMNS_OFFSET + TableViewModel.COLUMN_MARGIN * index + TableViewModel.COLUMN_HEIGHT * (index + 0.5);
                        },
                        deferEvaluation: true
                    });
                    return {
                        left: { x: this._columnsConnectionPointLeftX, y: y },
                        right: { x: this._columnsConnectionPointRightX, y: y }
                    };
                };
                TableViewModel.prototype.getInfo = function () {
                    return Metadata.tableSerializationInfo;
                };
                TableViewModel.prototype.getColumn = function (name) {
                    return Analytics.Internal.getFirstItemByPropertyValue(this._columns(), "name", name);
                };
                TableViewModel.prototype.createColumns = function (dbTable) {
                    var _this = this;
                    var columns = [];
                    dbTable.columns.forEach(function (item) {
                        columns.push(new ColumnViewModel({ "@Name": item.name }, item, _this, _this.serializer));
                    });
                    this._columns(columns);
                    this._initialized(true);
                };
                TableViewModel.COLUMNS_OFFSET = 37;
                TableViewModel.COLUMN_HEIGHT = 32;
                TableViewModel.COLUMN_MARGIN = 1;
                TableViewModel.TABLE_MIN_WIDTH = 80;
                TableViewModel.TABLE_DEFAULT_HEIGHT = 136;
                return TableViewModel;
            }(QueryElementBaseViewModel));
            Elements.TableViewModel = TableViewModel;
            var TableSurface = (function (_super) {
                __extends(TableSurface, _super);
                function TableSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.contenttemplate = "dxqb-table";
                    _this.template = "dxqb-table-main";
                    _this.toggleSelected = function () {
                        _this.getControlModel().toggleSelectedColumns();
                    };
                    _this.selectedWrapper = ko.pureComputed(function () {
                        return _this.getControlModel().allColumnsSelected();
                    });
                    _this.isInitialized = control.isInitialized;
                    _this.columns = ko.pureComputed(function () {
                        return control.columns().map(function (columnVewModel) { return new ColumnSurface(columnVewModel, context); });
                    });
                    _this.asterisk = new AllColumnsSurface(control.asterisk, context);
                    return _this;
                }
                TableSurface.prototype.resizable = function (resizeHandler, element) {
                    return $.extend({}, resizeHandler, {
                        handles: 'e, w',
                        $selectedNodes: $(element),
                        minWidth: TableViewModel.TABLE_MIN_WIDTH,
                    });
                };
                return TableSurface;
            }(QueryElementBaseSurface));
            Elements.TableSurface = TableSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
        (function (Internal) {
            var ColumnDragHandler = (function (_super) {
                __extends(ColumnDragHandler, _super);
                function ColumnDragHandler(querySurface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, querySurface, selection, undoEngine, snapHelper, dragHelperContent) || this;
                    _this.querySurface = querySurface;
                    _this.undoEngine = undoEngine;
                    _this._dragColumn = ko.observable(null);
                    _this._dragConditionSurface = null;
                    _this.dragDropConnector = ko.observable(null);
                    _this.cursor = 'arrow';
                    _this.containment = '.dxrd-ghost-container';
                    _this["helper"] = function (draggable) {
                        dragHelperContent.setContent(new Analytics.Elements.Rectangle(0, 0, draggable.rect().width, draggable.rect().height));
                    };
                    return _this;
                }
                ColumnDragHandler.prototype._needToCreateRelation = function () {
                    if (!(this.selection.dropTarget && this.selection.dropTarget instanceof Elements.ColumnSurface))
                        return false;
                    var table = this.selection.dropTarget.getControlModel().parentModel();
                    return table !== this.getDragColumn().parentModel();
                };
                ColumnDragHandler.prototype.startDrag = function (control) {
                    if (control instanceof Analytics.Diagram.ConnectionPointSurface) {
                        var condition = control.getControlModel().parentModel();
                        this._dragConditionSurface = Analytics.Internal.findSurface(condition);
                        if (!this._dragConditionSurface)
                            return;
                        this._dragConditionSurface.isVisible(false);
                        this._dragColumn((condition.startPoint() === control.getControlModel()) ? condition.nestedColumn() : condition.parentColumn());
                    }
                    else if (!(control instanceof Elements.ColumnSurface)) {
                        throw new Error("ColumnDragHandler can be applied to the Column only.");
                    }
                    else {
                        this._dragColumn(control.getControlModel());
                    }
                    var connectorModel = new Analytics.Diagram.RoutedConnectorViewModel({}, this.querySurface().getControlModel());
                    this.dragDropConnector(new Analytics.Diagram.RoutedConnectorSurface(connectorModel, this.surface()));
                };
                ColumnDragHandler.prototype.setConnectorPoints = function (cursorPosition) {
                    var startColumn = this._dragColumn(), connectorModel = this.dragDropConnector().getControlModel();
                    if (this._needToCreateRelation()) {
                        var points = Analytics.Diagram.determineConnectingPoints(startColumn, this.selection.dropTarget.getControlModel());
                        connectorModel.startPoint().connectingPoint(points.start);
                        connectorModel.endPoint().connectingPoint(points.end);
                    }
                    else {
                        var _leftConnectionPointX = this.querySurface().rtl() ? this.querySurface().pageWidth() - startColumn.leftConnectionPoint.location.x() : startColumn.leftConnectionPoint.location.x();
                        var _rightConnectionPointX = this.querySurface().rtl() ? this.querySurface().pageWidth() - startColumn.rightConnectionPoint.location.x() : startColumn.rightConnectionPoint.location.x();
                        var point = Math.abs(_leftConnectionPointX - cursorPosition.left) > Math.abs(_rightConnectionPointX - cursorPosition.left) ?
                            startColumn.rightConnectionPoint : startColumn.leftConnectionPoint;
                        connectorModel.startPoint().connectingPoint(point);
                        this.dragDropConnector().endPoint().rect({ top: cursorPosition.top, left: cursorPosition.left });
                    }
                };
                ColumnDragHandler.prototype.drag = function (event, ui) {
                    ui.position.left += ui["scroll"].left;
                    ui.position.top += ui["scroll"].top;
                    ui["delta"].left = ui.position.left - this.surface()["underCursor"]().x - 6;
                    ui["delta"].top = ui.position.top - this.surface()["underCursor"]().y - 6;
                    this.setConnectorPoints(this._getAbsoluteSurfacePosition(ui));
                };
                ColumnDragHandler.prototype.doStopDrag = function () {
                    this.dragHelperContent.reset();
                    this.dragDropConnector(null);
                    try {
                        var editableCondition = null;
                        if (this._dragConditionSurface && !this._dragConditionSurface.isVisible()) {
                            editableCondition = this._dragConditionSurface.getControlModel();
                            this._dragConditionSurface.isVisible(true);
                        }
                        var query = this.querySurface().getControlModel();
                        if (this._needToCreateRelation()) {
                            var nestedColumn = this.selection.dropTarget.getControlModel();
                            this.undoEngine().start();
                            if (editableCondition) {
                                editableCondition.parentModel().removeChild(editableCondition);
                            }
                            var condition = query.cerateJoinCondition(this._dragColumn(), nestedColumn);
                            this.undoEngine().end();
                            if (condition !== null) {
                                this.selection.initialize(Analytics.Internal.findSurface(condition));
                            }
                        }
                    }
                    finally {
                        this._dragColumn(null);
                    }
                };
                ColumnDragHandler.prototype.getDragColumn = function () {
                    return this._dragColumn();
                };
                return ColumnDragHandler;
            }(Analytics.Internal.DragDropHandler));
            Internal.ColumnDragHandler = ColumnDragHandler;
            var DbObjectDragDropHandler = (function (_super) {
                __extends(DbObjectDragDropHandler, _super);
                function DbObjectDragDropHandler(surface, selection, _undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, _undoEngine, snapHelper, dragHelperContent) || this;
                    _this._undoEngine = _undoEngine;
                    _this._query = function () { return _this._querySurface().getControlModel(); };
                    _this._querySurface = surface;
                    _this.cursor = 'arrow';
                    _this.containment = '.dxqb-designer';
                    _this["cursorAt"] = {
                        top: 0,
                        left: 0
                    };
                    _this["helper"] = function (draggable) {
                        _super.prototype.helper.call(_this, draggable);
                        _this.recalculateSize(Analytics.Elements.Size.fromString("199, 123"));
                        dragHelperContent.setContent(new Analytics.Elements.Rectangle(0, 0, _this._size.width(), _this._size.height()));
                    };
                    _this._drop = DbObjectDragDropHandler.getDropCallback(_this._undoEngine, false);
                    return _this;
                }
                DbObjectDragDropHandler.prototype.startDrag = function (draggable) {
                    if (draggable && draggable.name) {
                        this._query().dbSchemaProvider.getDbTable(draggable.name);
                    }
                };
                DbObjectDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
                    this.dragHelperContent.reset();
                    if (this.selection.dropTarget) {
                        var position = this._getAbsoluteSurfacePosition(ui);
                        this._querySurface().underCursor().x = position.left - this._querySurface()["absolutePosition"].x();
                        this._querySurface().underCursor().y = position.top - this._querySurface()["absolutePosition"].y();
                        var item = draggable;
                        var control = this._drop(item.data, this._query());
                        this.addControl(control, this._querySurface(), this._size);
                    }
                };
                DbObjectDragDropHandler.prototype.addControl = function (control, dropTargetSurface, size) {
                    dropTargetSurface.getControlModel().addChild(control);
                    var controlSurface = Analytics.Internal.findSurface(control);
                    if (!controlSurface)
                        return;
                    controlSurface.rect({ left: dropTargetSurface.underCursor().x, top: dropTargetSurface.underCursor().y, width: size.width() });
                    this.selection.initialize(controlSurface);
                };
                DbObjectDragDropHandler.getDropCallback = function (undoEngine, suggestLocation) { return (function (memberInfo, query) {
                    var newControl = query.createChild($.extend({ "@ControlType": "Table", "@Name": memberInfo.name }, QueryBuilder.Utils.controlsFactory.controlsMap["Table"].defaultVal));
                    if (newControl.isInitialized()) {
                        query.tryToCreateRelationsByFK(newControl);
                    }
                    else {
                        newControl.isInitialized.subscribe(function () {
                            undoEngine().start();
                            query.tryToCreateRelationsByFK(newControl);
                            undoEngine().end();
                        });
                    }
                    if (suggestLocation) {
                        var posX = Math.max.apply(null, query.tables.peek()
                            .filter(function (t) { return t !== newControl; })
                            .map(function (t) { return t.location.x.peek() + t.size.width.peek() * 3 / 2; })
                            .concat([30]));
                        newControl.location.x(posX);
                        newControl.location.y(65);
                    }
                    return newControl;
                }); };
                return DbObjectDragDropHandler;
            }(Analytics.Internal.DragDropHandler));
            Internal.DbObjectDragDropHandler = DbObjectDragDropHandler;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.ConnectionOptions", "Analytics.Data.ConnectionOptions");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.CustomSqlQuery", "Analytics.Data.CustomSqlQuery");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.customQuerySerializationsInfo", "Analytics.Data.customQuerySerializationsInfo", "Analytics.Data.Metadata.customQuerySerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.masterDetailRelationSerializationsInfo", "Analytics.Data.masterDetailRelationSerializationsInfo", "Analytics.Data.Metadata.masterDetailRelationSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.MasterDetailRelation", "Analytics.Data.MasterDetailRelation");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.SqlDataConnection", "Analytics.Data.SqlDataConnection");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.SqlDataSource", "Analytics.Data.SqlDataSource");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.storedProcQuerySerializationsInfo", "Analytics.Data.storedProcQuerySerializationsInfo", "Analytics.Data.Metadata.storedProcQuerySerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.StoredProcQuery", "Analytics.Data.StoredProcQuery");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.tableQuerySerializationsInfo", "Analytics.Data.tableQuerySerializationsInfo", "Analytics.Data.Metadata.tableQuerySerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.TableQuery", "Analytics.Data.TableQuery");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.dsParameterNameValidationRules", "Analytics.Data.dsParameterNameValidationRules", "Analytics.Data.Metadata.dsParameterNameValidationRules");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.parameterValueSerializationsInfo", "Analytics.Data.parameterValueSerializationsInfo", "Analytics.Data.Metadata.parameterValueSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.dsParameterSerializationInfo", "Analytics.Data.dsParameterSerializationInfo", "Analytics.Data.Metadata.dsParameterSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.storedProcParameterSerializationsInfo", "Analytics.Data.storedProcParameterSerializationsInfo", "Analytics.Data.Metadata.storedProcParameterSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DataSourceParameter", "Analytics.Data.DataSourceParameter");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBColumnType", "Analytics.Data.DBColumnType");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBColumn", "Analytics.Data.DBColumn");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBForeignKey", "Analytics.Data.DBForeignKey");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBSchema", "Analytics.Data.DBSchema");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.getDBSchemaCallback", "Analytics.Data.getDBSchemaCallback", "Analytics.Data.Internal.getDBSchemaCallback");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBSchemaProvider", "Analytics.Data.DBSchemaProvider");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBStoredProcedure", "Analytics.Data.DBStoredProcedure");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBStoredProcedureArgumentDirection", "Analytics.Data.DBStoredProcedureArgumentDirection");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBStoredProcedureArgument", "Analytics.Data.DBStoredProcedureArgument");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.DBTable", "Analytics.Data.DBTable");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.ResultSet", "Analytics.Data.ResultSet");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.ResultTable", "Analytics.Data.ResultTable");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.SqlQueryType", "Analytics.Data.Utils.SqlQueryType");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.generateQueryUniqueName", "Analytics.Data.Utils.generateQueryUniqueName", "Analytics.Data.Internal.generateQueryUniqueName");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.KeyColumnSurface", "QueryBuilder.Widgets.KeyColumnSurface", "QueryBuilder.Widgets.Internal.KeyColumnSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.MasterDetailEditor", "QueryBuilder.Widgets.MasterDetailEditor", "QueryBuilder.Widgets.Internal.MasterDetailEditor");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.MasterDetailEditorPopupManager", "QueryBuilder.Widgets.MasterDetailEditorPopupManager", "QueryBuilder.Widgets.Internal.MasterDetailEditorPopupManager");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.MasterDetailRelationSurface", "QueryBuilder.Widgets.MasterDetailRelationSurface", "QueryBuilder.Widgets.Internal.MasterDetailRelationSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Data.MasterQuerySurface", "QueryBuilder.Widgets.MasterQuerySurface", "QueryBuilder.Widgets.Internal.MasterQuerySurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnDragHandler", "QueryBuilder.Internal.ColumnDragHandler");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.DbObjectDragDropHandler", "QueryBuilder.Internal.DbObjectDragDropHandler");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.allColumnsSerializationInfo", "QueryBuilder.Elements.allColumnsSerializationInfo", "QueryBuilder.Elements.Metadata.allColumnsSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.AllColumnsViewModel", "QueryBuilder.Elements.AllColumnsViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.AllColumnsSurface", "QueryBuilder.Elements.AllColumnsSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnType", "QueryBuilder.Elements.ColumnType", "QueryBuilder.Elements.Metadata.ColumnType");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.columnExpressionSerializationsInfo", "QueryBuilder.Elements.columnExpressionSerializationsInfo", "QueryBuilder.Elements.Metadata.columnExpressionSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnExpression", "QueryBuilder.Elements.ColumnExpression");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnExpressionCollectionHelper", "QueryBuilder.Utils.ColumnExpressionCollectionHelper", "QueryBuilder.Internal.ColumnExpressionCollectionHelper");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.AggregationType", "QueryBuilder.Elements.AggregationType", "QueryBuilder.Elements.Metadata.AggregationType");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.columnSerializationInfo", "QueryBuilder.Elements.columnSerializationInfo", "QueryBuilder.Elements.Metadata.columnSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnViewModel", "QueryBuilder.Elements.ColumnViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ColumnSurface", "QueryBuilder.Elements.ColumnSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ConditionType", "QueryBuilder.Elements.ConditionType", "QueryBuilder.Elements.Metadata.ConditionType");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.joinConditionSerializationInfo", "QueryBuilder.Elements.joinConditionSerializationInfo", "QueryBuilder.Elements.Metadata.joinConditionSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.JoinConditionViewModel", "QueryBuilder.Elements.JoinConditionViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.JoinConditionSurface", "QueryBuilder.Elements.JoinConditionSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QueryElementBaseViewModel", "QueryBuilder.Elements.QueryElementBaseViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QueryElementBaseSurface", "QueryBuilder.Elements.QueryElementBaseSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QueryViewModel", "QueryBuilder.Elements.QueryViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.querySerializationsInfo", "QueryBuilder.Elements.querySerializationsInfo", "QueryBuilder.Elements.Metadata.querySerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QuerySurface", "QueryBuilder.Elements.QuerySurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.relationSerializationInfo", "QueryBuilder.Elements.relationSerializationInfo", "QueryBuilder.Elements.Metadata.relationSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.RelationViewModel", "QueryBuilder.Elements.RelationViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.RelationSurface", "QueryBuilder.Elements.RelationSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.tableSerializationInfo", "QueryBuilder.Elements.tableSerializationInfo", "QueryBuilder.Elements.Metadata.tableSerializationInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.TableViewModel", "QueryBuilder.Elements.TableViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.TableSurface", "QueryBuilder.Elements.TableSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.controlsFactory", "QueryBuilder.Utils.controlsFactory");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.registerControls", "QueryBuilder.Utils.registerControls", "QueryBuilder.Internal.registerControls");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QueryBuilderTreeListController", "QueryBuilder.Utils.QueryBuilderTreeListController", "QueryBuilder.Internal.QueryBuilderTreeListController");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.RequestWrapper", "QueryBuilder.Utils.RequestWrapper");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.editorTemplates", "QueryBuilder.Widgets.editorTemplates");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.UndoEditor", "QueryBuilder.Widgets.UndoEditor", "QueryBuilder.Widgets.Internal.UndoEditor");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "QueryBuilder.Widgets.QBFilterEditorHelper", "QueryBuilder.Widgets.Internal.QBFilterEditorHelper");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "QueryBuilder.Widgets.QBFilterStringOptions", "QueryBuilder.Widgets.Internal.QBFilterStringOptions");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.GroupFilterEditorSerializer", "QueryBuilder.Widgets.GroupFilterEditorSerializer", "QueryBuilder.Widgets.Internal.GroupFilterEditorSerializer");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.OperandParameterQBSurface", "QueryBuilder.Widgets.OperandParameterQBSurface", "QueryBuilder.Widgets.Internal.OperandParameterQBSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.OperandPropertyQBSurface", "QueryBuilder.Widgets.OperandPropertyQBSurface", "QueryBuilder.Widgets.Internal.OperandPropertyQBSurface");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.isAggregatedExpression", "QueryBuilder.Widgets.isAggregatedExpression", "QueryBuilder.Widgets.Internal.isAggregatedExpression");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.QueryBuilderObjectsProvider", "QueryBuilder.Widgets.QueryBuilderObjectsProvider", "QueryBuilder.Widgets.Internal.QueryBuilderObjectsProvider");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.ActionId", "QueryBuilder.ActionId", "QueryBuilder.Utils.ActionId");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.HandlerUri", "QueryBuilder.HandlerUri", "QueryBuilder.Utils.HandlerUri");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.updateQueryBuilderSurfaceContentSize", "QueryBuilder.updateQueryBuilderSurfaceContentSize", "QueryBuilder.Internal.updateQueryBuilderSurfaceContentSize");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.createIsLoadingFlag", "QueryBuilder.createIsLoadingFlag", "QueryBuilder.Internal.createIsLoadingFlag");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.isJoinsResolvingDisabled", "QueryBuilder.isJoinsResolvingDisabled", "QueryBuilder.Internal.isJoinsResolvingDisabled");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.createQueryBuilder", "QueryBuilder.createQueryBuilder", "QueryBuilder.Internal.createQueryBuilder");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.name", "QueryBuilder.name", "QueryBuilder.Metadata.name");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.alias", "QueryBuilder.alias", "QueryBuilder.Metadata.alias");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.text", "QueryBuilder.text", "QueryBuilder.Metadata.text");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.selected", "QueryBuilder.selected", "QueryBuilder.Metadata.selected");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.size", "QueryBuilder.size", "QueryBuilder.Metadata.size");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.location", "QueryBuilder.location", "QueryBuilder.Metadata.location");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.sizeLocation", "QueryBuilder.sizeLocation", "QueryBuilder.Metadata.sizeLocation");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.QueryBuilder.unknownSerializationsInfo", "QueryBuilder.unknownSerializationsInfo", "QueryBuilder.Metadata.unknownSerializationsInfo");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.CommonParametersPage", "Analytics.Wizard.Legacy.CommonParametersPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.LegacyPageDispathcer", "Analytics.Wizard.LegacyPageDispathcer", "Analytics.Wizard.Legacy.LegacyPageDispathcer");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.WizardAction", "Analytics.Wizard.WizardAction", "Analytics.Wizard.Internal.WizardAction");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.WizardViewModel", "Analytics.Wizard.Legacy.WizardViewModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.WizardPage", "Analytics.Wizard.Legacy.WizardPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.MultiQueryConfigurePage", "Analytics.Wizard.Legacy.MultiQueryConfigurePage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.MasterDetailRelationsPage", "Analytics.Wizard.Legacy.MasterDetailRelationsPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.MultiQueryConfigureParametersPage", "Analytics.Wizard.Legacy.MultiQueryConfigureParametersPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.MultiQueryDataSourceWizard", "Analytics.Wizard.Legacy.MultiQueryDataSourceWizard");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.MultiQueryDataSourceWizardModel", "Analytics.Wizard.Legacy.MultiQueryDataSourceWizardModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.ConfigureParametersPage", "Analytics.Wizard.Legacy.ConfigureQueryParametersPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.CreateQueryPage", "Analytics.Wizard.Legacy.CreateQueryPage");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.SqlDataSourceWizardModel", "Analytics.Wizard.SqlDataSourceWizardModel", "Analytics.Wizard.Legacy.DataSourceWizardModel");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.SelectConnectionString", "Analytics.Wizard.Legacy.SelectConnectionString");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.SqlDataSourceWizard", "Analytics.Wizard.Legacy.SqlDataSourceWizard");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.ParametersTreeListItem", "Analytics.Wizard.Utils.ParametersTreeListItem", "Analytics.Wizard.Internal.ParametersTreeListItem");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.ParametersTreeListRootItem", "Analytics.Wizard.Utils.ParametersTreeListRootItem", "Analytics.Wizard.Internal.ParametersTreeListRootItem");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.ParametersTreeListController", "Analytics.Wizard.Utils.ParametersTreeListController", "Analytics.Wizard.Internal.ParametersTreeListController");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.DBSchemaItemsProvider", "Analytics.Wizard.Utils.DBSchemaItemsProvider", "Analytics.Wizard.Internal.DBSchemaItemsProvider");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.DBSchemaTreeListController", "Analytics.Wizard.Utils.DBSchemaTreeListController", "Analytics.Wizard.Internal.DBSchemaTreeListController");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.QueryBuilderPopup", "Analytics.Wizard.Utils.QueryBuilderPopup", "Analytics.Wizard.Internal.QueryBuilderPopup");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.SelectQuerySqlTextProvider", "Analytics.Wizard.Utils.SelectQuerySqlTextProvider", "Analytics.Wizard.Internal.SelectQuerySqlTextProvider");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.SelectStatementQueryControl", "Analytics.Wizard.Utils.SelectStatementQueryControl", "Analytics.Wizard.Internal.SelectStatementQueryControl");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.StoredProceduresQueryControl", "Analytics.Wizard.Utils.StoredProceduresQueryControl", "Analytics.Wizard.Internal.StoredProceduresQueryControl");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.TreeNodeBase", "Analytics.Wizard.Utils.TreeNodeBase", "Analytics.Wizard.Internal.TreeNodeBase");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.TreeLeafNode", "Analytics.Wizard.Utils.TreeLeafNode", "Analytics.Wizard.Internal.TreeLeafNode");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.TreeNode", "Analytics.Wizard.Utils.TreeNode", "Analytics.Wizard.Internal.TreeNode");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.ParameterTreeNode", "Analytics.Wizard.Utils.ParameterTreeNode", "Analytics.Wizard.Internal.ParameterTreeNode");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.QueriesTreeNode", "Analytics.Wizard.Utils.QueriesTreeNode", "Analytics.Wizard.Internal.QueriesTreeNode");
DevExpress.Analytics.Internal._definePropertyByString(DevExpress, "Designer.Report.Wizard.TreeQueryNode", "Analytics.Wizard.Utils.TreeQueryNode", "Analytics.Wizard.Internal.TreeQueryNode");
DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.addTemplates({
    'dxdd-connection-line': '<svg class="dxdd-connection-line" style="width:100%; height: 100%">        <line class="dxd-qb-relationship-line-color" data-bind="attr: { x1: startPoint().relativeX, y1: startPoint().relativeY, x2: endPoint().relativeX, y2: endPoint().relativeY }" />    </svg>',
    'dxdd-connecting-point': '<div class="dxdd-connecting-point" data-bind="styleunit: position, trackCursor: underCursor, style: { \'marginLeft\': -3 * _context.zoom() + \'px\', \'marginTop\': -3 * _context.zoom() + \'px\' }, draggable: $root.connectingPointDragHandler">        <svg style="width:100%; height: 100%">            <line x1="0" y1="0" x2="100%" y2="100%" />            <line x1=0 y1="100%" x2="100%" y2="0" />        </svg>    </div>',
    'dxdd-connection-point-selection': '<div class="dxrd-control" data-bind="draggable: $root.connectionPointDragHandler, styleunit: { top: relativeY, left: relativeX }">    </div>',
    'dxdd-connector': '<div class="dxdd-connector" data-bind="styleunit: position, trackCursor: underCursor">        <!-- ko template: { name: \'dxdd-connection-line\' } -->        <!-- /ko -->    </div>',
    'dxdd-connector-selection': '<div class="dxdd-connector" data-bind="styleunit: position, dxclick: function() {}, draggable: $root.dragHandler">        <!-- ko template: { name: \'dxdd-connection-line\' } -->        <!-- /ko -->        <!-- ko with: startPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko with: endPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->    </div>',
    'dxdd-routed-connection-line': '<svg class="dxdd-connection-line">        <!-- ko if: showArrow -->        <defs>            <marker data-bind="attr: { id: \'dxqb-arrow_\' + connectorID() }" viewBox="0 0 5 10" refX="5" refY="5"                    markerUnits="userSpaceOnUse" orient="auto"                    markerWidth="14" markerHeight="14">                <polyline class="dxd-qb-relationship-line-color" points="0,0 5,5 0,10" />            </marker>        </defs>        <!-- /ko -->        <polyline class="dxd-qb-relationship-line-color" fill="none" data-bind="attr: { points: routePointsSet, \'marker-end\': showArrow() ? \'url(#dxqb-arrow_\' + connectorID() + \')\' : \'\' }, updateConnectorArrow: $data" />    </svg>',
    'dxdd-routed-connector': '<div class="dxdd-connector" data-bind="styleunit: position, visible: isVisible">        <!-- ko template: { name: \'dxdd-routed-connection-line\' } -->        <!-- /ko -->        <!-- ko foreach: routeLineWrappers -->        <div data-bind="styleunit: position" style="position: absolute;">            <!-- ko with: $parent -->            <div class="dxd-selectable" data-bind="trackCursor: underCursor, click: $root.selectItemProperties" style="position: relative; width: 100%; height: 100%;"></div>            <!-- /ko -->        </div>        <!-- /ko -->    </div>',
    'dxdd-routed-connector-selection': '<div class="dxdd-connector dxrd-selected dxd-state-selected" data-bind="styleunit: position, dxclick: function() {}, visible: isVisible">        <!-- ko template: { name: \'dxdd-routed-connection-line\' } -->        <!-- /ko -->        <!-- ko foreach: routeLineWrappers -->        <!-- ko ifnot: isLocked -->        <div data-bind="styleunit: position, style: { cursor: isVerticalLine ? \'ew-resize\' : \'ns-resize\' }, routeLineDraggable: { starting: $root.resizeHandler.starting, stopped: function() { resizeStopped(); $root.resizeHandler.stopped(); }, forceResize: resizeHandler }" style="position: absolute;">        </div>        <!-- /ko -->        <!-- ko if: isLocked -->        <div data-bind="styleunit: position" style="position: absolute;">        </div>        <!-- /ko -->        <!-- /ko -->        <!-- ko with: startPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko with: endPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->    </div>',
    'dx-diagram-element': '<div class="dxrd-control dxd-selectable" data-bind="styleunit: position, trackCursor: underCursor">        <div class="dxrd-control-content-main" data-bind="styleunit: { lineHeight: positionLineHeightWithoutMargins }, style: css">            <div data-bind="template: contenttemplate, styleunit: { \'height\': positionLineHeightWithoutMargins, \'width\': positionWidthWithoutMargins }">            </div>        </div>    </div>',
    'dx-diagram-element-selection': '<div class="dxrd-control" data-bind="event: { dblclick: $root.inlineTextEdit.show }, css: {\'dxrd-selected\': selected, \'dxrd-focused\': focused }, resizable: $root.resizeHandler, draggable: $root.dragHandler, styleunit: position, trackCursor: underCursor">        <!-- ko if: !$root.inlineTextEdit.visible() -->        <div class="dxrd-control-content-main" data-bind="styleunit: { lineHeight: positionLineHeightWithoutMargins }, style: css">            <div data-bind="template: contenttemplate, styleunit: { \'height\': positionLineHeightWithoutMargins, \'width\': positionWidthWithoutMargins}">            </div>        </div>        <!-- /ko -->        <!-- ko if: $root.inlineTextEdit.visible -->        <!-- ko with: $root.inlineTextEdit -->        <div class="inline-text-edit" data-bind="dxTextArea: { value: text, onKeyUp: keypressAction, valueChangeEvent: \'keyup\' }"></div>        <!-- /ko -->        <!-- /ko -->    </div>',
    'dx-diagram-element-content': '<div style="width: 100%; height: 100%; border: 1px solid black">        <div data-bind="text: getControlModel().text"></div>    </div>',
    'dxdd-element-content-with-connecting-points': '<div style="width: 100%; height: 100%; overflow: hidden">        <svg style="top:0; left: 0; width: 100%; height: 100%; stroke: black; fill: transparent; stroke-width: 1">            <!-- ko if: getControlModel().type() === \'Ellipse\' -->            <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />            <!-- /ko -->            <!-- ko if: getControlModel().type() === \'Condition\' -->            <line x1="50%" y1="0" x2="100%" y2="50%" />            <line x1="100%" y1="50%" x2="50%" y2="100%" />            <line x1="50%" y1="100%" x2="0" y2="50%" />            <line x1="0" y1="50%" x2="50%" y2="0" />            <!-- /ko -->            <!-- ko if: !getControlModel().type() -->            <rect height="100%" width="100%" />            <!-- /ko -->            <text x="50%" y="50%" alignment-baseline="middle" style="text-anchor: middle; cursor:default;" data-bind="text: getControlModel().text"></text>        </svg>        <!-- ko foreach: connectingPoints -->        <!-- ko template: \'dxdd-connecting-point\' -->        <!-- /ko -->        <!-- /ko -->    </div>',
    'dx-diagram-surface': '<div class="dxrd-surface" style="height: 100%; display:inline-block;" data-bind="styleunit: { \'width\': Math.min(pageWidth(), $root.surfaceSize()) }, click: function(_, e) { $root.selection.clickHandler(null, e); e.stopPropagation(); }, keyDownActions: $root.actionLists">        <div class="dxrd-viewport" style="overflow:auto;width:inherit;height:inherit;" data-bind="styleunit: { minWidth: Math.min(pageWidth(), $root.surfaceSize()), maxWidth: pageWidth(),  maxHeight: pageHeight() + 20 }">            <div data-bind="selectable: { selection: $root.selection, zoom: zoom }">                <div class="dxrd-ghost-containment">                    <div class="dxrd-ghost-container" style="background: white;position: relative;" data-bind="styleunit: { \'width\': pageWidth(), \'height\': pageHeight() }, trackCursor: underCursor">                        <!-- ko foreach: controls -->                        <!-- ko template: { name: isSelected() ? selectiontemplate : template } -->                        <!-- /ko -->                        <!-- /ko -->                        <div class="dxrd-drag-helper-source" data-bind="styleunit: { top: $root.dragHelperContent.top, left: $root.dragHelperContent.left, width: $root.dragHelperContent.width, height: $root.dragHelperContent.height }" style="display:none">                            <!-- ko foreach: $root.dragHelperContent.controls -->                            <div class="dxrd-drag-helper-item" data-bind="styleunit: $data"></div>                            <!-- /ko -->                        </div>                    </div>                </div>            </div>        </div>    </div>',
    'dxqb-joincondition': '<div class="dxdd-connector" data-bind="styleunit: position, trackCursor: underCursor">        <svg style="width:100%; height: 100%">            <line data-bind="attr: { x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y }" />        </svg>    </div>',
    'dx-query-surface': '<div class="dxrd-surface" style="display:inline-block;" data-bind="styleunit: { \'width\': $root.surfaceSize }, click: function(_, e) { $root.selection.clickHandler(null, e); e.stopPropagation(); }, keyDownActions: $root.actionLists">        <div class="dxrd-viewport" style="width:inherit;height:inherit;">            <div data-bind="dxScrollView: { direction: \'both\', showScrollbar: \'onHover\', scrollByContent: false, scrollByThumb: true, bounceEnabled: false, useNative: false, height: \'100%\' }">                <div style="height:100%;">                    <div class="dxrd-ghost-containment" style="height:100%;">                        <div class="dxrd-ghost-container dxqb-ghost-container" data-bind="styleunit: { \'minWidth\': pageWidth, \'minHeight\': pageHeight }, trackCursor: underCursor">                            <div class="dxqb-main" data-bind="trackCursor: underCursor, style: { \'z-index\' : $parent.dragDropStarted() ? 2 : null }">                                <!-- ko if: tables().length === 0-->                                <div class="dxqb-placeholder dxd-empty-area-placeholder-text-color dxd-text-info" data-bind="text: placeholder()"></div>                                <!-- /ko -->                                <!-- ko foreach: relations -->                                <!-- ko foreach: conditions -->                                <!-- ko if: !isSelected()-->                                <!-- ko template: template -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- ko foreach: tables -->                                <!-- ko template: template -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- ko foreach: relations -->                                <!-- ko foreach: conditions -->                                <!-- ko if: isSelected()-->                                <!-- ko template: selectiontemplate -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- /ko -->                                <!-- ko with: $root.columnDragHandler.dragDropConnector -->                                <svg class="dxdd-connection-line-draggable" data-bind="styleunit: { top: position.top(), left: position.left() }">                                    <!-- ko foreach: routePoints -->                                    <!-- ko if: $index() < ($parent.routePoints().length - 1) -->                                    <line class="dxd-qb-relationship-line-color" fill="none" data-bind="attr: {x1 : $data.x, y1: $data.y, x2: $parent.routePoints()[$index()+1].x, y2: $parent.routePoints()[$index()+1].y }"></line>                                    <!-- /ko -->                                    <!-- /ko -->                                </svg>                                <!-- /ko -->                                <div class="dxrd-drag-helper-source" data-bind="styleunit: { top: $root.dragHelperContent.top, left: $root.dragHelperContent.left, width: $root.dragHelperContent.width, height: $root.dragHelperContent.height }" style="display:none">                                    <!-- ko foreach: $root.dragHelperContent.controls -->                                    <div class="dxrd-drag-helper-item" data-bind="styleunit: { left: $data.left, top: $data.top, width: $data.width, height: $data.height  }"></div>                                    <!-- /ko -->                                </div>                            </div>                        </div>                    </div>                </div>            </div>        </div>    </div>',
    'dxqb-relation': '<!-- ko foreach: conditions -->    <!-- ko template: { name: isSelected() ? selectiontemplate : template } -->    <!-- /ko -->    <!-- /ko -->',
    'dxqb-table-field': '<div class="dx-border-inheritor dxd-border-accented">        <div class="dxqb-table-field dxd-qb-table-field-border-color dxd-qb-table-field-back-color dxd-back-highlighted dxd-qb-table-field-separator-color dxd-border-primary" data-bind="trackCursor: underCursor, draggable: $root.columnDragHandler, css: cssClasses($root.surface(), $root.columnDragHandler, $parent), click: $root.selectItemProperties">            <div class="dxqb-table-field-background dxd-back-accented"></div>            <div class="dxqb-table-field-checkbox-wrapper">                <div class="dxqb-table-field-checkbox" data-bind="dxCheckBox: { value: selectedWrapper }, click: function(surface, e) { surface.toggleSelected(); e.stopPropagation(); return true;  }"></div>            </div>            <div class="dxqb-table-field-content dxd-text-primary" data-bind="attr: { title: getControlModel().actualName }">                <div class="dxqb-table-field-state">                    <!-- ko if:  $data.isAscending() -->                    <div class="dxqb-image-field-state dxqb-image-field-sorting-asc"><!-- ko template: \'dxrd-svg-queryBuilder-sorting_asc\' --><!-- /ko --></div>                    <!-- /ko -->                    <!-- ko if:  $data.isDescending() -->                    <div class="dxqb-image-field-state dxqb-image-field-sorting-desc"><!-- ko template: \'dxrd-svg-queryBuilder-sorting_desc\' --><!-- /ko --></div>                    <!-- /ko -->                    <!-- ko if: $data.getControlModel().groupBy -->                    <div class="dxqb-image-field-state dxqb-image-field-group-by"><!-- ko template: \'dxrd-svg-queryBuilder-group_by\' --><!-- /ko --></div>                    <!-- /ko -->                    <!-- ko if: $data.isAggregate() -->                    <div class="dxqb-image-field-state dxqb-image-field-aggregate"><!-- ko template: \'dxrd-svg-queryBuilder-aggregate\' --><!-- /ko --></div>                    <!-- /ko -->                </div>                <div class="dxqb-table-field-caption">                    <div class="dxqb-table-field-text dxd-qb-table-field-text-color" data-bind="text: getControlModel().actualName"></div>                </div>            </div>        </div>    </div>',
    'dxqb-table-asterisk-field': '<div class="dx-border-inheritor dxd-border-accented">        <div class="dxqb-table-field dxd-qb-table-field-border-color dxd-qb-table-field-back-color dxd-back-highlighted dxd-border-primary" data-bind="trackCursor: underCursor, css: cssClasses(), click: $root.selectItemProperties">            <div class="dxqb-table-field-background dxd-back-accented"></div>            <div class="dxqb-table-field-checkbox-wrapper">                <div class="dxqb-table-field-checkbox" data-bind="dxCheckBox: { value: selectedWrapper }, click: function(surface, e) { surface.toggleSelected(); e.stopPropagation(); return true;  }"></div>            </div>            <div class="dxqb-table-field-content dxd-text-primary" data-bind="attr: { title: getControlModel().name }">                <div class="dxqb-table-field-caption">                    <div class="dxqb-table-field-text dxd-qb-table-field-text-color" data-bind="text: getControlModel().name"></div>                </div>            </div>        </div>    </div>',
    'dxqb-table-main': '<!-- ko if: $data.isSelected() -->    <div class="dxqb-table-resize-ghost" data-bind="resizable: resizable($root.resizeHandler, $element), styleunit: position"></div>    <!-- /ko -->    <div class="dxrd-control" data-bind="css: {\'dxrd-selected\': selected, \'dxrd-focused\': focused }, draggable: $root.dragHandler, styleunit: position, trackCursor: underCursor, click: $root.selectItemProperties">        <div class="dxrd-control-content-main dxd-qb-table-back-color dxd-back-primary2" data-bind="styleunit: { lineHeight: position.lineHeight }, style: css">            <div class="dxqb-table-background dxd-back-accented"></div>            <div class="dx-background-inheritor dxd-back-accented">                <div class="dxqb-table-border dxd-qb-table-border-color dxd-back-highlighted dxd-state-active dxd-state-no-hover"></div>            </div>            <div data-bind="template: contenttemplate, styleunit: { \'height\': position.lineHeight, \'width\': position.width }">            </div>        </div>    </div>',
    'dxqb-table': '<div class="dxqb-table dxd-qb-table-back-color dxd-back-primary2">        <div class="dx-border-inheritor dxd-border-accented">            <div class="dxqb-table-head-field dxd-qb-table-field-border-color dxd-qb-table-field-back-color dxd-back-highlighted dxd-border-primary">                <div class="dxqb-table-checkbox-all">                    <div data-bind="dxCheckBox: { value: selectedWrapper }, click: function(surface, e) {                    $root.undoEngine().start();                    surface.toggleSelected();                    $root.undoEngine().end();                    e.stopPropagation(); return true;                }"></div>                </div>                <div class="dxqb-table-title dxd-text-primary" data-bind="text: getControlModel().actualName, style: { cursor: selected() ? \'move\' : \'default\' }"></div>            </div>        </div>        <div class="dxqb-table-content">            <div class="dxqb-tableFields-wrapper">                <!-- ko ifnot: $data.isInitialized() -->                <div class="dxqb-table-loading">                    <div class="dxqb-table-loading-text dxd-text-primary" data-bind="text: $root.columnsLoadingMsg()"></div>                </div>                <!-- /ko -->                <!-- ko if: $data.isInitialized() -->                <!-- ko template: { name: asterisk.template, data: asterisk } -->                <!-- /ko -->                <!-- ko foreach: columns -->                <!-- ko lazy: { template: $data.template  }-->                <!-- /ko -->                <!-- /ko -->                <!-- /ko -->            </div>        </div>    </div>',
    'dxrd-masterDetail-editor': '<!-- ko if: $data -->    <div>        <div class="dx-filtereditor" data-bind="dxPopup: { showTitle: true, width: \'95%\', height: \'95%\', title: title(), visible: popupVisible,                 toolbarItems: buttonItems, showCloseButton: true, container: $root.getPopupContainer($element), position: { of: $root.getPopupContainer($element) },             }">            <div class="dx-filtereditor-tree dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', direction: \'both\' }" style="cursor: default">                <!-- ko foreach: masterQueries -->                <div class="criteria-operator-group">                    <div class="criteria-operator-group-item">                        <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-group dxd-filter-editor-group-back-color dxd-state-no-hover stylized" data-bind="text: queryName"></div>                        <div data-bind="service: { name: \'createRelation\' }"></div>                    </div>                    <div class="criteria-operator-content">                        <!-- ko template: { name: \'dx-masterDetail-editor-relation\', foreach: relations }-->                        <!-- /ko -->                    </div>                </div>                <!-- /ko -->            </div>        </div>        <div class="dx-selectbox-popup-wrapper dx-dropdownlist-popup-wrapper dx-filtereditor-criteriaoperator-popup dx-dropdowneditor-overlay" data-bind="dxPopupWithAutoHeight: { width: \'170px\', height: \'300px\', focusStateEnabled: false,        position: $root.rtl ? { my: \'right top\', at: \'right bottom\', of: popupService.target } : { my: \'left top\', at: \'left bottom\', of: popupService.target },        container: \'.dx-designer-viewport\',        target: popupService.target,        showTitle: false,        showCloseButton: false,        animation: {},        closeOnOutsideClick: true,        shading: false,        visible: popupService.visible }">            <!-- ko with: popupService-->            <!-- ko with: data -->            <!-- ko template: template-->            <!-- /ko -->            <!-- /ko -->            <!-- /ko -->        </div>    </div>    <!-- /ko -->',
    'dx-masterDetail-editor-keyColumn': '<div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-field dxd-filter-editor-field-back-color dxd-state-no-hover stylized" data-bind="attr: { title: $data.getTitle() }, text: queryName"></div>    <div class="criteria-operator-text dxd-filter-editor-text-color">.</div>    <div class="criteria-operator-text dxd-filter-editor-text-color">        <div data-bind="service: { name: \'setColumn\' }"></div>    </div>',
    'dx-masterDetail-editor-relation': '<div class="criteria-operator-group">        <div class="criteria-operator-group-item">            <div class="criteria-operator-action" data-bind="dxclick: function() {  $parent.remove($data); }">                <div class="criteria-operator-action-image dx-image-filtereditor-remove"><!-- ko template: \'dxrd-svg-filtereditor-remove\' --><!-- /ko --></div>            </div>            <div class="criteria-operator-item" data-bind="visible: isEditable">                <div class="criteria-operator-item-editor" data-bind="dxTextBox: { value: relationName, onFocusOut: function() { isEditable(false); } }, focus: { on: isEditable }"></div>            </div>            <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-value dxd-filter-editor-value-back-color" data-bind="visible: !isEditable()">                <div class="criteria-operator-text dxd-filter-editor-text-color clickable" data-bind="text: relationName, click: function() { isEditable(true); }"></div>            </div>            <div class="criteria-operator-action" data-bind="dxclick: create">                <div class="criteria-operator-action-image dx-image-filtereditor-add"><!-- ko template: \'dxrd-svg-filtereditor-add\' --><!-- /ko --></div>            </div>        </div>        <div class="criteria-operator-content">            <!-- ko foreach: keyColumns -->            <div class="criteria-operator-group">                <div class="criteria-operator-group-item">                    <div class="criteria-operator-action" data-bind="dxclick: function() {  $parent.remove($data); }">                        <div class="criteria-operator-action-image dx-image-filtereditor-remove"><!-- ko template: \'dxrd-svg-filtereditor-remove\' --><!-- /ko --></div>                    </div>                    <!-- ko template: { name: \'dx-masterDetail-editor-keyColumn\', data: master } -->                    <!-- /ko -->                    <div class="criteria-operator-text dxd-filter-editor-text-color"> = </div>                    <!-- ko template: { name: \'dx-masterDetail-editor-keyColumn\', data: detail } -->                    <!-- /ko -->                </div>            </div>            <!-- /ko -->        </div>    </div>',
    'dx-masterdetail-editor-setColumn': '<div class="criteria-operator-text dxd-filter-editor-text-color clickable criteria-operator-item-field dxd-filter-editor-field-back-color" data-bind="text: target.column() || target.selectColumnText(), dxclick: showPopup, css: { \'dxd-state-selected\': target.isSelected, \'default\': !target.column() }"></div>',
    'dxqb-data-preview': '<div style="height: 100%" data-bind="dxdTableView: $data.value"></div>',
    'dxqb-popup': '<div class="dxqb-preview" data-bind="dxPopup: {                animation: {                    show: { type: \'fade\', from: 0, to: 1, duration: 700 },                    hide: { type: \'fade\', from: 1, to: 0, duration: 700 }                },                visible: isVisible,                title: title(),                showTitle: true,                resizeEnabled: true,                shading: true,                shadingColor: \'transparent\',                fullScreen: false,                width: 800,                height: 544,                container: container($element),                position: { of: container($element) },                onHidden: function() { $data.data.value(null) },                focusStateEnabled: false            }">        <div class="dxqb-preview-popup-content">            <!-- ko if: data && !isLoading() -->            <!-- ko template: { name: template, data: data } -->            <!-- /ko -->            <!-- /ko -->            <!-- ko if: isLoading -->            <div style="text-align: center; padding-top: 25%;">                <div data-bind="dxLoadIndicator: { visible: true }"></div>            </div>            <!-- /ko -->        </div>        <div class="dxqb-preview-popup-buttons dxd-border-secondary">            <div class="dxqb-preview-popup-button" data-bind="dxButton: { text: okButtonText(), onClick: okButtonHandler, disabled: isLoading }"></div>        </div>    </div>',
    'dxqb-selectstatment-preview': '<div class="dxqb-show-query-string-content dx-widget">        <!-- ko if: !aceAvailable -->        <div class="dxrd-show-query-string-editor" data-bind="dxTextArea: { value: value, valueChangeEvent: \'keyup\', readOnly: true }"></div>        <!-- /ko -->        <!-- ko if: aceAvailable -->        <div class="dxrd-show-query-string-editor">            <div class="dxrd-show-query-string-editor-content">                <div class="dx-sql_editor dx-disabled-ace dxd-back-primary2" data-bind="dxAceEditor: { value: value, options: aceOptions, additionalOptions: additionalOptions }"></div>            </div>        </div>        <!-- /ko -->    </div>',
    'dxd-tableview': '<div class="dxd-tableview">        <div class="dxd-tableview-titles">            <table>                <tbody>                    <tr>                        <!-- ko foreach: rtl ? data.schema.reverse() : data.schema -->                        <td data-bind="attr: { class: \'dxd-tableview-title-cell dxd-border-secondary dxd-tableview-resizable\' }">                            <div class="dxd-tableview-cell-text dxd-qb-data-preview-cell-text-color dxd-text-info" data-bind="text: name"></div>                        </td>                        <!-- /ko -->                    </tr>                </tbody>            </table>        </div>        <!-- ko if: data.values -->        <div class="dxd-tableview-data" data-bind="dxScrollView: { direction: \'both\', scrollByContent: false, showScrollbar: \'always\', scrollByThumb: true, bounceEnabled: false, useNative: false }">            <table>                <tbody>                    <!-- ko foreach: data.values -->                    <tr>                        <!-- ko foreach: $parent.rtl ? $data.reverse() : $data -->                        <td class="dxd-tableview-cell dxd-border-secondary">                            <!-- ko ifnot: $parents[1].isImage($index()) -->                            <div data-bind="text: $data, attr: { class: \'dxd-tableview-cell-text dxd-text-primary dxd-tableview-resizable\' + $index() }"></div>                            <!-- /ko -->                            <!-- ko if: $parents[1].isImage($index()) -->                            <!-- ko if: $parents[1].isImageTooLarge($data) -->                            <div data-bind="text: $parents[1].getImageTooLargeText($data), attr: { class: \'dxd-tableview-cell-text dxd-text-primary dxd-tableview-resizable\' + $index() }"></div>                            <!-- /ko -->                            <!-- ko ifnot: $parents[1].isImageTooLarge($data) -->                            <div data-bind="attr: { class: \'dxd-tableview-cell-text dxd-text-primary dxd-tableview-resizable\' + $index() }">                                <img data-bind="attr: { src: \'data:image/bmp;base64,\' + $data }" />                            </div>                            <!-- /ko -->                            <!-- /ko -->                        </td>                        <!-- /ko -->                    </tr>                    <!-- /ko -->                    <tr class="dxd-tableview-data-fakerow">                        <!-- ko foreach: data.values[0] -->                        <td class="dxd-tableview-cell dxd-border-secondary">                            <div data-bind="attr: { class: \'dxd-tableview-cell-text dxd-text-primary dxd-tableview-resizable\' + $index() }"></div>                        </td>                        <!-- /ko -->                    </tr>                </tbody>            </table>        </div>        <!-- /ko -->        <!-- ko ifnot: data.values -->        <div class="dxd-tableview-empty-message" data-bind="text: noDataText()" />        <!-- /ko -->    </div>',
    'dxqb-fieldlist-wrapper': '<div id="tree" data-bind="treelist: treeListOptions" style="width:100%; height: 100%;"></div>',
    'dxqb-properties-wrapper': '<div class="dxrd-properties-wrapper" data-bind="visible: active() && visible()">        <div style="height:100%" class="dxd-text-primary">            <!-- ko with: model -->            <div class="dxrd-properties-grid dxd-border-primary" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }" style="top: 0px;">                <div>                    <!-- ko foreach: groups -->                    <div class="dx-fieldset" data-bind="visible: visible">                        <div data-bind="dxdAccordion: { collapsed: collapsed }">                            <div class="dxrd-group-header dx-accordion-header" data-bind="css: { \'dxrd-group-header-collapsed dxd-border-primary\': collapsed() }">                                <div class="dx-collapsing-image" data-bind="template: \'dxrd-svg-collapsed\', css: { \'dx-image-expanded\': !collapsed() }" style="display:inline-block;"></div>                                <span class="dxrd-group-header-text" data-bind="text: displayName()"></span>                            </div>                            <div class="dx-accordion-content dxd-back-primary">                                <!-- ko ifnot: editorsCreated -->                                <div class="dx-accordion-content-loading-panel">                                    <div data-bind="dxLoadIndicator: { visible: !editorsCreated() }"></div>                                </div>                                <!-- /ko -->                                <!-- ko if: $data.editorsRendered() -->                                <div data-bind="visible: editorsCreated">                                    <div class="dx-editors">                                        <!-- ko foreach: editors -->                                        <!-- ko template: editorTemplate -->                                        <!-- /ko -->                                        <!-- ko if: ($index() === $parent.editors().length - 1 && $parent.editorsCreated(true)) -->                                        <!-- /ko -->                                        <!-- /ko -->                                    </div>                                </div>                                <!-- /ko -->                            </div>                        </div>                    </div>                    <!-- /ko -->                </div>            </div>            <!-- /ko -->        </div>    </div>',
    'dxqb-propertygrid': '<!-- ko with: value -->    <div class="dx-fieldset dxqb-selected-properties">        <!-- ko foreach: properties.getEditors() -->        <!-- ko template: editorTemplate -->        <!-- /ko -->        <!-- /ko -->    </div>    <!-- /ko -->',
    'dxqb-fieldspanel': '<!-- ko with: value -->    <div class="dxqb-right-panel-search-box" data-bind="dxTextBox: { value: searchName, valueChangeEvent: \'keyup\', placeholder: searchPlaceholder(), showClearButton: true  }"></div>    <div class="dxqb-right-panel-fields" data-bind="dxScrollView: { showScrollbar: \'onHover\', scrollByContent: false, scrollByThumb: true, bounceEnabled: false, useNative: false }">        <!-- ko template: { name: "dxqb-fieldlist-wrapper", data: fieldListModel } -->        <!-- /ko -->    </div>    <!-- /ko -->',
    'dxqb-parameterspanel': '<!-- ko with: value -->    <div class="dxqb-right-panel-parameters" data-bind="dxScrollView: { showScrollbar: \'onHover\', scrollByContent: false, scrollByThumb: true, bounceEnabled: false, useNative: false }">        <div style="width: 100%" data-bind="dxCollectionEditor: $data"></div>    </div>    <!-- /ko -->',
    'dxqb-collectioneditor-template': '<div class="dxrd-accordion-collection-item" data-bind="dxdAccordion: { collapsed: collapsed }">        <div class="dxrd-group-header dx-accordion-header">            <div>                <div class="propertygrid-editor-collapsed dx-collapsing-image" data-bind="css: { \'dx-image-expanded\': !collapsed() }, template: \'dxrd-svg-collapsed\'"></div>                <div class="dx-group-header-font" data-bind="text: $root.getLocalization($parent.name), attr: { title: $root.getLocalization($parent.name) }"></div>            </div>        </div>        <div class="dx-accordion-content">            <div data-bind="dxPropertyGrid: { target: value, level: 1, parentDisabled: editor.disabled }"></div>        </div>    </div>',
    'dxqb-toolbar': '<div class="dxrd-toolbar-wrapper dxd-toolbar-back-color" data-bind="click: $root.findControl">        <div class="dxqb-toolbar-background dxd-back-primary2"></div>        <div class="dxrd-toolbar" data-bind="template: {name: \'dxqb-toolbar-items\', data: actionLists.toolbarItems }"></div>    </div>',
    'dxqb-toolbar-items': '<!-- ko foreach: $data -->    <!-- ko if: $data.templateName -->    <!-- ko template: templateName  -->    <!-- /ko -->    <!-- /ko -->    <!-- ko if: !$data.templateName -->    <div class="dxrd-toolbar-item" data-bind="visible: visible">        <div class="dxqb-toolbar-item-container">            <div class="dxqb-toolbar-item-background dxd-back-secondary"></div>            <div data-bind="template: {name: ko.unwrap($data.imageTemplateName), if: !!ko.unwrap($data.imageTemplateName)}, attr: { class: \'dxrd-toolbar-item-image dxd-button-back-color dxd-state-normal dxd-back-highlighted \' + (ko.unwrap($data.imageClassName) || \'\'), title: $data.displayText && $data.displayText() || text }, dxclick: function() { if((typeof $data.disabled === \'function\') && !disabled() || !disabled) { clickAction($root.model && $root.model()); } }, css: {\'dxrd-disabled-button\': disabled, \'dxd-state-active\': $data.selected }"> </div>                    </div>        <div class="dxrd-toolbar-item-separator dxd-toolbar-separator-color dxd-border-secondary" data-bind="visible: $data.hasSeparator"></div>    </div>    <!-- /ko -->    <!-- /ko -->',
    'dxqb-property-editor': '<div class="dxrd-editor" data-bind="visible: visible">        <div class="dxrd-editor-header">            <div class="dx-field dxd-back-primary">                <div class="dx-field-label dxd-text-primary">                    <div class="propertygrid-editor-displayName" data-bind="text: displayName, attr: { \'title\': displayName }"></div>                </div>                <div class="dx-field-value">                    <div data-bind="service: { name: \'createEditorAddOn\' }"></div>                    <!-- ko lazy: { template: templateName } -->                    <!-- /ko -->                </div>            </div>        </div>    </div>',
    'dxqb-expressionstring': '<!-- ko if: $data.value() -->    <div data-bind="dxExpressionEditor: getOptions({ options: value, fieldListProvider: $root.parametersBindingsProvider, displayNameProvider: $root.displayNameProvider && $root.displayNameProvider() })"></div>    <!-- /ko -->',
    'dxqb-filtereditor-changeparameter': '<div class="criteria-operator-item" data-bind="visible: target.isEditable">        <div class="criteria-operator-item" data-bind="dxTextBox: { value: target._parameterName, onFocusOut: function() { target.createParameter(); target.isEditable(false); } }"></div>    </div>    <div class="criteria-operator-text dxd-filter-editor-text-color clickable " data-bind="text: target.parameterName, dxclick: showPopup, css: { \'dxd-state-selected\': target.isSelected, \'default\': target.isDefaultTextDisplayed() }, visible: $data.target.isEditable() === false"></div>',
    'dxqb-filtereditor-propertiespopup': '<div class="dx-widget" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">        <!-- ko foreach: data -->        <div data-bind="dxdAccordion: { collapsed: collapsed }">            <div class="dx-accordion-header">                <div class="dx-filtereditor-popup-item dxd-list-item-back-color dx-item dx-list-item dxd-back-highlighted">                    <div class="dx-collapsing-image" data-bind="template: \'dxrd-svg-collapsed\', css: { \'dx-image-expanded\': !collapsed() }" style="display:inline-block;  margin-left: 5px;"></div>                    <span class="dx-item-content dx-list-item-content" style="padding-left: 17px" data-bind="text: name"></span>                </div>            </div>            <div class="dx-accordion-content dxd-back-primary">                <!-- ko foreach: items -->                <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">                    <span class="dx-item-content dx-list-item-content" style="padding-left: 17px" data-bind="text: name, attr: { \'title\': name }, click: function() { $parents[1].click($data); }"></span>                </div>                <!--/ko -->            </div>        </div>        <!--/ko -->    </div>',
    'dxqb-filtereditor-parameterspopup': '<div class="dx-widget" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">        <!-- ko if: $parent.viewModel.canCreateParameters -->        <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">            <span class="dx-item-content dx-list-item-content" data-bind="text: $parent.viewModel.defaultDisplay(), click: function() { $parent.viewModel.isEditable(true); $parent.viewModel._parameterName(\'\'); $parent.visible(false); }"></span>        </div>        <!-- /ko -->        <!-- ko foreach: data -->        <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">            <span class="dx-item-content dx-list-item-content" data-bind="text: name, click: function() { $parent.click($data); } "></span>        </div>        <!-- /ko -->    </div>',
    'dxqb-treelist-item-with-search': '<div data-bind="visible: visible">        <!-- ko template: "dxqb-treelist-header-item-with-search" -->        <!-- /ko -->    </div>',
    'dxqb-treelist-header-item-with-search': '<div class="dx-treelist-item dxd-list-item-back-color dxd-back-highlighted" data-bind="event: { dblclick: function() { $data.dblClickHandler ? $data.dblClickHandler($data) : $data.toggleCollapsed() } }, styleunit: padding, css: { \'dx-treelist-item-selected dxd-state-selected\': isSelected() || isMultiSelected() }">        <div class="dx-treelist-collapsedbutton"></div>        <div class="dx-treelist-caption">            <div class="dx-treelist-selectedcontent" data-bind="click: toggleSelected,  draggable: isDraggable ? dragDropHandler : null">                <div class="dx-treelist-image" data-bind="css: $data.imageClassName, template: {name: $data.imageTemplateName, if: !!ko.unwrap($data.imageTemplateName)}, attr: { title: text }"> </div>                <div class="dx-treelist-text-wrapper">                    <!-- ko if: treeListController && !!$data.treeListController.searchName -->                    <div class="dx-treelist-text dxdr-highlighted-search-text" data-bind="searchHighlighting: { text: text, textToSearch: treeListController.searchName }, attr: { title: text }"></div>                    <!-- /ko -->                </div>            </div>        </div>    </div>',
    'dxrd-page-choose-datasource-type': '<div class="dxrd-wizard-type-page" data-bind="css: $data._extendCssClass(\'type-page\')">        <!-- ko foreach: typeItems -->        <div data-bind="event: { click: $parent._itemClick, dblclick: function() { $parent._goToNextPage() } }, attr: { class: \'dxd-back-highlighted dxd-state-normal dxrd-wizard-type-item dx-fontsize-reestablished dxrd-wizard-type-item-border-color dxd-list-item-back-color \' + $parent._extendCssClass(\'type-item\')}, css: { \'dxd-border-secondary dxd-back-secondary\': $parent._IsSelected($data) } ">            <div data-bind="attr: { class: \'dxrd-wizard-type-image \' + $parent._extendCssClass(\'type-image\') }, css: imageClassName, template: imageTemplateName"> </div>            <div class="dxrd-wizard-type-text" data-bind="text: text, attr: { title: text }, css: $parent._extendCssClass(\'type-text\')"></div>        </div>        <!-- /ko -->    </div>',
    'dx-wizard-fullscreen': '<!-- ko if: $data && $data.isVisible() -->    <div class="dx-fullscreen-wizard dx-editors" data-bind="css: { \'dx-rtl\': $root.rtl, \'dx-ltr\': !$root.rtl }">        <div class="dxrd-wizard dxrd-report-wizard dx-editors dxd-text-primary dxd-back-primary2" data-bind="css: _extendCssClass">            <div class="dxrd-wizard-steps-container dxd-back-primary" data-bind="visible: $data.navigationPanel().isVisible">                <div class="dxrd-wizard-title dxd-border-primary" data-bind="text: _description()"></div>                <!-- ko with: navigationPanel -->                <div class="dxrd-wizard-steps" data-bind="foreach: _steps">                    <div class="dxrd-wizard-steps-relative" style="position:relative" data-bind="visible: $data.visible">                        <div class="dxrd-wizard-steps-content" data-bind="click: $data.clickAction, text: $data.text, attr: {\'title\': $data.text }, css: { \'dxrd-disabled\': $data.disabled, \'dxd-back-secondary\': $data.isActive() }"></div>                        <div class="dxrd-wizard-steps-marker dxd-back-primary2" data-bind="visible: $data.isActive"></div>                    </div>                </div>                <!-- /ko -->            </div>            <div class="dxrd-wizard-content" data-bind="css: { \'withoutPanel\': !$data.navigationPanel().isVisible() }">                <div class="dxrd-wizard-part-description dxd-back-contrast">                    <div class="dxrd-wizard-part-description-text dxd-text-primary dxd-border-primary" data-bind="text: _pageDescription()"></div>                </div>                <!-- ko with: _currentPage -->                <div class="dxrd-wizard-work-content">                    <div class="dxrd-wizard-work-content-relative">                        <div data-bind="template: { name: template, data: page } "></div>                    </div>                </div>                <!-- /ko -->                <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel: _loadPanelViewModel($element)">                </div>                <div class="dxrd-wizard-navigation">                    <div data-bind="dxButton: cancelButton" class="dxrd-wizard-btn left"></div>                    <div data-bind="dxButton: finishButton" class="dxrd-wizard-btn right"></div>                    <div data-bind="dxButton: nextButton" class="dxrd-wizard-btn right"></div>                    <div data-bind="dxButton: previousButton" class="dxrd-wizard-btn right"></div>                </div>            </div>        </div>    </div>    <!-- /ko -->',
    'dx-wizard-fullscreen-page': '<!-- ko if: $data._sections.length > 0 -->    <div style="position:absolute;" data-bind="foreach: _sections, styleunit: { top: _parentMarginOffset, left: _parentMarginOffset, right: _parentMarginOffset, bottom: _parentMarginOffset }">        <div class="dx-border-inheritor dxd-border-accented">            <div class="dxrd-report-page-tile dxd-border-secondary" data-bind="css: { \'dxrd-disabled\': !$data.page() }, style: $parent._pageCss[$data.pageId]">                <div class="dxrd-report-page-tile-title" data-bind="visible: $parent._showPageDescription(), text: $parent._getPageDescription($index(), $data), attr: { title: $parent._getPageDescription($index(), $data) }"></div>                <!-- ko if: $data.page() !== null -->                <!-- ko with: page -->                <div class="dxrd-report-page-tile-content" data-bind="template: { name: $parent.metadata.template, data: page }, dxScrollView: { showScrollbar: \'onHover\'}"></div>                <!-- /ko -->                <!-- /ko -->                <!-- ko if: $data.page() === null -->                <div class="dxrd-report-page-tile-content dx-default-border-style dxd-border-secondary">                    <div class="dxrd-wizard-page dxrd-wizard-disabled-content" data-bind="text: metadata.disabledText"></div>                </div>                <!-- /ko -->            </div>        </div>    </div>    <!-- /ko -->',
    'dxrd-jsondatasource-fields-page': '<div class="dxrd-wizard-page dx-jsonschema-page dx-frameless-style">        <div class="dx-default-border-style dxd-border-secondary dxrd-wizard-dataMember dx-fieldset" style="height:100%">            <div class="dx-field">                <div class="dx-field-label" data-bind="text: _rootElementTitle"></div>                <div class="dx-field-value" data-bind="dxSelectBox: { dataSource: _rootElementList, value: _selectedRootElement, displayExpr: \'fullPath\', displayCustomValue: true, dropDownOptions: { container: $root.getPopupContainer($element) } }"></div>            </div>            <div class="dxrd-wizard-add-queries-page dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">                <div data-bind="treelist: _fieldListModel" style="width:100%; height: 100%;"></div>            </div>        </div>    </div>',
    'dxrd-page-jsonsource': '<div class="dxrd-wizard-page dx-jsonsource-page dx-frameless-style">        <div class="dx-default-border-style dxd-border-secondary dxrd-wizard-dataMember dx-fieldset" style="height: 100%" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true }, dxValidationGroup: $data._validationGroup || {}">            <div class="dx-field">                <div class="dx-field-label" data-bind="text: _jsonConnectionTitle, attr: { \'title\': _jsonConnectionTitle }"></div>                <div class="dx-field-value" data-bind="dxTextBox: { value: _connectionName }, dxValidator: { validationRules: $data._connectionNameValidationRules || [] }"></div>            </div>            <div class="dx-field">                <div class="dx-field-label" data-bind="text: _jsonSourceTitle, attr: { \'title\': _jsonSourceTitle }"></div>                <div class="dx-field-value" data-bind="dxLocalizedSelectBox: { dataSource: _sources, value: _selectedSource, valueExpr:\'value\', displayExpr: \'displayValue\', displayCustomValue: true, dropDownOptions: { container: $root.getPopupContainer($element) } }"></div>            </div>            <!-- ko with: _selectedSource -->            <div data-bind="dxValidationGroup: $data.validationGroup || {}">                <div data-bind="css: $data.cssClass">                    <!-- ko template: { name: \'dx-propertieseditor\', data: grid } -->                    <!-- /ko -->                </div>                <div class="dxrd-wizard-validationsummary" data-bind="dxValidationSummary: $data.validationSummary || {}, visible: $data.validationSummary && !isValid()"></div>            </div>            <!-- /ko -->            <div class="dxrd-wizard-validationsummary" data-bind="dxValidationSummary: $data._validationSummary || {}, visible: $data._validationSummary && _selectedSource().validationSummary && !canNext()"></div>        </div>    </div>',
    'dx-property-json-string-editor': '<div class="dx-field" data-bind="visible: visible">        <!-- ko template: templateName -->        <!-- /ko -->    </div>',
    'dxrd-page-dataSource': '<div class="dxrd-wizard-page">    <!-- ko if: isDataSourceCreationAvailable -->    <div class="dxrd-wizard-datasourceoperation dxrd-radio-nowrap-ellipsis" style="margin-bottom: 15px" data-bind="dxRadioGroup: { value: selectedDataSourceOperation, items: dataSourceOperations, layout: \'vertical\' }">        <div data-options="dxTemplate : { name: \'item\' }">            <div class="dxrd-radio-nowrap-ellipsis-text" data-bind="text: text, attr: { \'title\': text }"></div>        </div>    </div>    <!-- /ko -->    <div class="dxrd-wizard-availabledatasources dx-default-border-style dxd-border-secondary">        <div class="dxrd-wizard-list" data-bind="dxList: { dataSource: availableDataSources, selectedItems: selectedDataSource, focusStateEnabled:false, editEnabled: true, height: dataSourcesListHeight, editConfig: { selectionEnabled: false }, selectionMode: \'single\', activeStateEnabled: false, disabled: createNewDataSource, noDataText: $root.dx.Analytics.Internal.noDataText() }">            <div data-options="dxTemplate : { name: \'item\' }">                <div data-bind="text: name"></div>            </div>        </div>    </div></div>',
    'dxrd-page-selectitems': '<div class="dxrd-wizard-page">        <!-- ko template: { name: \'dxrd-page-selectitems-radio-group\', data: $data } -->        <!-- /ko -->        <!-- ko template: { name: \'dxrd-page-selectitems-list\', data: $data } -->        <!-- /ko -->    </div>',
    'dxrd-page-selectitems-radio-group': '<!-- ko if: canCreateNew -->    <div class="dxrd-wizard-datasourceoperation dxrd-radio-nowrap-ellipsis" style="margin-bottom: 15px" data-bind="dxRadioGroup: { value: selectedOperation, items: operations, layout: \'vertical\' }">        <div data-options="dxTemplate : { name: \'item\' }">            <div class="dxrd-radio-nowrap-ellipsis-text" data-bind="text: text, attr: { \'title\': text }"></div>        </div>    </div>    <!-- /ko -->',
    'dxrd-page-selectitems-list': '<div class="dxrd-wizard-availabledatasources dx-default-border-style dxd-border-secondary" data-bind="styleunit: { top: $data.canCreateNew() ? 65 : 0 }">        <div class="dxrd-wizard-list" data-bind="dxList: { dataSource: items, onSelectionChanged: function(e) { selectedItems(e.addedItems) }, selectedItems: selectedItems.peek(), focusStateEnabled:false, editEnabled: true, height: \'100%\', editConfig: { selectionEnabled: false }, selectionMode: \'single\', activeStateEnabled: false, disabled: _createNew, noDataText: $root.dx.Analytics.Internal.noDataText() }">            <div data-options="dxTemplate : { name: \'item\' }">                <div data-bind="text: $parent._displayExpr($data)"></div>            </div>        </div>    </div>',
    'dxrd-page-specify-connection': '<div class="dxrd-wizard-page">    <!-- ko template: { name: \'dxrd-page-selectitems-radio-group\', data: $data } -->    <!-- /ko -->    <!-- ko if: !_createNew() -->    <!-- ko template: { name: \'dxrd-page-selectitems-list\', data: $data } -->    <!-- /ko -->    <!-- /ko -->    <!-- ko if: _createNew -->    <div style="position:relative; top: 65px; height: calc(100% - 65px)">        <!-- ko template: { name: \'dxrd-page-jsonsource\', data: _specifySourceData } -->        <!-- /ko -->    </div>    <!-- /ko --></div>',
    'dx-jsonwizard-parametercollection': '<div class="dx-field">        <!-- ko with: value -->        <div class="dx-jsonwizard-parameter-left-container">            <div class="dx-jsonwizard-parameter">                <div data-bind="dxTextBox: { value: name, placeholder: $data.namePlaceholder() }, dxValidator: { validationRules: $parent.editor.editorOptions.nameValidationRules || [] }"></div>            </div>        </div>        <div class="dx-jsonwizard-parameter-right-container">            <div class="dx-jsonwizard-parameter">                <div data-bind="dxTextBox: { value: value, placeholder: $data.valuePlaceholder() }"></div>            </div>        </div>        <!-- /ko -->    </div>',
    'dx-jsonwizard-loadfile-editor': '<div data-bind="dxFileImagePicker: { value: value, placeholderId: \'File\', accept:\'.json,.txt\' }"></div>',
    'dx-jsonwizard-jsonstring-editor': '<!-- ko if: !aceAvailable -->    <div class="dxrd-jsonwizard-jsonstring-editor dxd-border-secondary dxd-back-primary2" data-bind="dxTextArea: { value: value, spellcheck: false, isValid: isValid }, dxValidator: $data.validator || { validationRules: jsonStringValidationRules || [] }"></div>    <!-- /ko -->    <!-- ko if: aceAvailable -->    <div class="dx-texteditor dx-editor-outlined dxrd-jsonwizard-jsonstring-editor dxd-wizard-jsoneditor dxd-border-secondary dxd-back-primary2" data-bind="dxAceEditor: { value: value, editorContainer: editorContainer, options: aceOptions, additionalOptions: additionalOptions }, css: { \'dx-invalid\' : !value() || !isValid() }"></div>    <!-- /ko -->    <div class="dxd-upload-file">        <div class="dxd-back-primary2"></div>        <div data-bind="dxButtonWithTemplate: { onClick: uploadFile, hint: $data.getUploadTitle(), icon: \'dxrd-svg-wizard-Download\' }"></div>    </div>',
    'dxrd-wizard-add-queries-page': '<div class="dxrd-wizard-page dxrd-wizard-add-queries-page">        <div class="dxrd-wizard-dataMember dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', height: _scrollViewHeight }">            <div data-bind="treelist: _fieldListModel" style="width:100%; height: 100%;"></div>        </div>        <!-- ko ifnot: $data.disableCustomSql -->        <!-- ko template: { name: \'dxqb-popup-selectStatment\', data: _popupSelectStatement } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko template: { name: \'dxrd-querybuilder-popup\', data: _popupQueryBuilder } -->        <!-- /ko -->        <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel: _loadPanelViewModel($element)">        </div>    </div>',
    'dxrd-configure-query-parameters-page': '<div class="dxrd-wizard-page dxrd-configure-query-parameters-page">        <div class="dxrd-wizard-dataMember dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', height: _scrollViewHeight }">            <!-- ko if: !!$data._fieldListModel() -->            <div data-bind="treelist: _fieldListModel" style="width:100%; height: 100%;"></div>            <!-- /ko -->        </div>    </div>',
    'dxrd-wizard-configure-relations-page': '<div class="dxrd-wizard-page dxrd-wizard-configure-relations-page">        <!-- ko if: $data._relationsEditor() -->        <!-- ko template: { name: \'dxrd-masterDetail-editor-complete-wizard\', data: $data._relationsEditor }-->        <!-- /ko -->        <!-- /ko -->    </div>',
    'dxrd-masterDetail-editor-complete-wizard': '<div class="dx-filtereditor dxrd-masterDetail-editor-complete-wizard dxd-border-secondary">        <!-- ko if: $data -->        <div class="dx-filtereditor-tree dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', direction: \'both\' }" style="cursor: default">            <!-- ko foreach: masterQueries -->            <div class="criteria-operator-group">                <div class="criteria-operator-group-item">                    <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-group dxd-filter-editor-group-back-color stylized" data-bind="text: queryName"></div>                    <div data-bind="service: { name: \'createRelation\' }"></div>                </div>                <div class="criteria-operator-content">                    <!-- ko template: { name: \'dx-masterDetail-editor-relation\', foreach: relations }-->                    <!-- /ko -->                </div>            </div>            <!-- /ko -->        </div>        <div class="dx-selectbox-popup-wrapper dx-dropdownlist-popup-wrapper dx-filtereditor-criteriaoperator-popup dx-dropdowneditor-overlay" data-bind="dxPopupWithAutoHeight: { width: \'170px\', height: \'235px\', focusStateEnabled: false,        position: $root.rtl ? { my: \'right top\', at: \'right bottom\', of: popupService.target } : { my: \'left top\', at: \'left bottom\', of: popupService.target },        container: \'.dx-designer-viewport\',        target: popupService.target,        showTitle: false,        showCloseButton: false,        animation: {},        closeOnOutsideClick: true,        shading: false,        visible: popupService.visible }">            <!-- ko with: popupService-->            <!-- ko with: data -->            <!-- ko template: template-->            <!-- /ko -->            <!-- /ko -->            <!-- /ko -->        </div>        <!-- /ko -->    </div>',
    'dxqb-popup-selectStatment': '<div class="dxqb-preview" data-bind="dxPopup: {                animation: {                    show: { type: \'fade\', from: 0, to: 1, duration: 700 },                    hide: { type: \'fade\', from: 1, to: 0, duration: 700 }                },                visible: isVisible,                title: title(),                showTitle: true,                resizeEnabled: true,                shading: true,                shadingColor: \'transparent\',                fullScreen: false,                width: 800,                height: 544,                container: closest($element, \'.dxrd-wizard\'),                position: { of: closest($element, \'.dx-designer-viewport\') },                onHidden: function() { $data.data(null) },                focusStateEnabled: false            }">        <div class="dxqb-preview-popup-content">            <div class="dxqb-show-query-string-content dx-widget">                <!-- ko if: !aceAvailable -->                <div class="dxrd-show-query-string-editor" data-bind="dxTextArea: { value: data, valueChangeEvent: \'keyup\', disabled: false }"></div>                <!-- /ko -->                <!-- ko if: aceAvailable -->                <div class="dxrd-show-query-string-editor">                    <div class="dxrd-show-query-string-editor-content">                        <div class="dx-sql_editor dxd-back-primary2" data-bind="dxAceEditor: { value: data, additionalOptions: additionalOptions, options: aceOptions }"></div>                    </div>                </div>                <!-- /ko -->            </div>        </div>        <div class="dxqb-preview-popup-buttons dxd-border-secondary">            <div data-bind="dxButton: { text: okButtonText(), onClick: okButtonHandler }" class="dxqb-preview-popup-button"></div>        </div>    </div>',
    'dxrd-treelist-with-checkbox': '<div data-bind="visible: visible">        <!-- ko if: hasContent -->        <!-- ko template: "dx-treelist-accordion-item-with-checkbox" -->        <!-- /ko -->        <!-- /ko -->        <!-- ko ifnot: hasContent -->        <!-- ko template: "dx-treelist-header-item-with-checkbox" -->        <!-- /ko -->        <!-- /ko -->    </div>',
    'dx-treelist-accordion-item-with-checkbox': '<div data-bind="dxdAccordionExt: { collapsed: collapsed, lazyContentRendering: true }">        <!-- ko template: "dx-treelist-header-item-with-checkbox" -->        <!-- /ko -->        <div class="dx-fieldset dx-accordion-content dxd-back-primary">            <!-- ko with: data -->            <!-- ko template: { name: contenttemplate } -->            <!-- /ko -->            <!-- /ko -->        </div>    </div>',
    'dx-treelist-header-item-with-checkbox': '<div class="dx-background-inheritor dxd-back-highlighted dxd-state-selected">    <div class="dx-treelist-item dx-fontsize-reestablished dxd-list-item-back-color" data-bind="event: {         dblclick: function() { $data.dblClickHandler ? $data.dblClickHandler($data) : $data.toggleCollapsed() },         mouseenter: mouseenter,         mouseleave: mouseleave         },         styleunit: padding,         css: { \'dx-treelist-item-selected dxd-state-selected dxd-back-secondary\': isSelected }">        <!-- ko ifnot: $data.hasItems-->        <div class="dx-treelist-collapsedbutton" data-bind="css: nodeImageClass"></div>        <!-- /ko -->        <!-- ko if: $data.hasItems -->        <div class="dx-treelist-collapsedbutton" data-bind="css: nodeImageClass, visible: hasItems, template: \'dxrd-svg-collapsed\', click: toggleCollapsed"></div>        <!-- /ko -->        <div class="dx-treelist-caption">            <!-- ko if: actions && actions.length > 0 -->            <div class="dx-treelist-action-container" data-bind="visible: isSelected() || isHovered()">                <!-- ko foreach: actions -->                <!-- ko if: $data.templateName -->                <!-- ko template: templateName  -->                <!-- /ko -->                <!-- /ko -->                <!-- ko if: !$data.templateName -->                <div class="dx-treelist-action" data-bind="dxButtonWithTemplate: { onClick: function() { clickAction($parent); }, icon: $data.imageTemplateName, iconClass: $data.imageClassName, disabled: $data.disabled && $data.disabled() }, attr: { title: text }"></div>                <!-- /ko -->                <!-- /ko -->            </div>            <!-- /ko  -->            <div class="dx-treelist-selectedcontent" data-bind="event: { dblclick: function() { $data.dblClickHandler && $data.dblClickHandler($data); } }, click: toggleSelected,  draggable: isDraggable ? dragDropHandler : null">                <div class="dx-treelist-text-wrapper">                    <div class="dx-add-queries-page-checkbox" data-bind="dxCheckBox: { value: data.checked }, click: function(treeNode, e) {                         treeNode.data.toggleChecked();                         e.stopPropagation();                         return true;                    }"></div>                    <div class="dx-treelist-text dx-treelist-text-with-checkbox" data-bind="text: text, attr: { title: text }"></div>                </div>            </div>        </div>    </div></div>',
    'dx-treelist-action-with-popover': '<div class="dx-treelist-action-with-popover" style="display: inline-block">        <div class="dx-treelist-action" data-bind="dxButtonWithTemplate: { onClick: function() { clickAction($parent); }, icon: $data.imageTemplateName, iconClass: $data.imageClassName , disabled: $data.disabled && $data.disabled() }, attr: { title: text }"></div>        <div data-bind="dxPopover:{ width: 200, position: !$root.rtl ? \'left\' : \'right\', visible: $parent.data.popoverVisible, target: \'.dx-treelist-action-with-popover\', container: $root.getPopupContainer($element)}">            <div data-bind="dxList: { dataSource: $parent.data.popoverListItems(), onItemClick: $parent.data.itemClickAction }">                <div data-options="dxTemplate : { name: \'item\' }">                    <div class="dx-text-content" data-bind="text: name, attr: { title: name }"></div>                </div>            </div>        </div>    </div>',
    'dx-treelist-accordion-contenttemplate-custom-with-actions': '<div data-bind="dxPropertyGrid: { target: $parent.data.dataSourceParameter, level: $parent.data.editor.level + 1 }"></div>',
    'dxrd-page-configure-parameters': '<div class="dxrd-wizard-page">        <div class="dxrd-datasource-parameters" data-bind="dxCollectionEditor: parametersEditorOptions"></div>    </div>',
    'dxrd-parameter-collection-item': '<div data-bind="dxdAccordion: { collapsed: collapsed }">        <div class="dxrd-group-header dx-accordion-header dxd-text-primary" style="border-bottom: 0" data-bind="styleunit: { \'marginLeft\' : editor.padding }, css: { \'dxrd-group-header-collapsed dxd-border-primary\': collapsed() }">            <div class="dx-collapsing-image" data-bind="template: \'dxrd-svg-collapsed\', css: { \'dx-image-expanded\': !collapsed() }" style="display:inline-block;"></div>            <span class="dxrd-group-header-text dxd-text-primary" data-bind="text: value().name"></span>        </div>        <div class="dx-accordion-content">            <div data-bind="dxPropertyGrid: { target: value, level: editor.level + 1 }"></div>        </div>    </div>',
    'dxrd-wizard-datasource-parameters': '<div class="dx-fieldset" style="height:100%">        <div class="dx-collectioneditor" style="height:100%">            <div class="dxrd-datasource-parameters-collection">                <div class="dxrd-datasource-parameters-container dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', useNative: false, scrollByThumb: true  }">                    <!-- ko if: values().length === 0 -->                    <div class="dx-collectioneditor-empty dxd-empty-area-placeholder-text-color dxd-text-info">                        <span class="dxrd-datasource-parameters-empty-text" data-bind="text: getDisplayTextEmptyArray()"></span>                    </div>                    <!-- /ko -->                    <!-- ko if: values().length !== 0 -->                    <div class="dx-collectioneditor-items" data-bind="foreach: values">                        <div class="dx-background-inheritor dxd-back-highlighted dxd-state-selected" data-bind="with: $parent.createCollectionItemWrapper($parents[1], $index)">                            <div class="dx-collectioneditor-item-container dx-fontsize-reestablished dxd-list-item-back-color" data-bind="dxclick: $parents[1].select, css: { \'dxd-state-selected dxd-back-secondary\' : $parents[1].selectedIndex() === $index() }">                                <div class="dx-collection-item"></div>                            </div>                        </div>                    </div>                    <!-- /ko -->                </div>            </div>            <div class="dxrd-collectioneditor-wizard-buttons" data-bind="visible: showButtons">                <div class="dxrd-collectioneditor-action" data-bind="dxButton: { onClick: add, text: getDisplayTextButton(\'add\') }, attr: { title: getDisplayTextButton(\'add\') }"></div>                <div class="dxrd-collectioneditor-action" data-bind="dxButton: { onClick: remove, disabled: selectedIndex() === null, text: $parent.removeButtonTitle }, attr: { title: $parent.removeButtonTitle }"></div>            </div>        </div>    </div>',
    'dxrd-page-connectionstring': '<div class="dxrd-wizard-page">        <div class="dx-wizard-connections dx-default-border-style dxd-border-secondary">            <div class="dxrd-wizard-list" data-bind="dxList: { items: _connectionStrings, onSelectionChanged: function(e) { _selectedConnectionString(e.addedItems) },  selectedItems: _selectedConnectionString.peek(), editEnabled: true, editConfig: { selectionEnabled: true }, selectionMode: \'single\', activeStateEnabled: false, noDataText: $root.dx.Analytics.Internal.noDataText() }">                <div data-options="dxTemplate : { name: \'item\' }">                    <div data-bind="text: $data[\'description\'] || $data[\'name\']"></div>                </div>            </div>        </div>    </div>',
    'dxrd-select-control': '<div data-bind="text: caption()"></div>    <!-- ko if: !aceAvailable -->    <div class="dxrd-wizard-list dxrd-create-query-page-editor dx-default-border-style dxd-border-secondary" data-bind="dxTextArea: { value: sqlString, valueChangeEvent: \'keyup input blur\', readOnly: disableCustomSql() }"></div>    <!-- /ko -->    <!-- ko if: aceAvailable -->    <div class="dxrd-create-query-page-editor dxrd-create-query-page-editor-border dxd-border-secondary">        <div class="dxrd-create-query-page-editor-content">            <div class="dx-sql_editor dxd-back-primary2" data-bind="dxAceEditor: { value: sqlString, additionalOptions: additionalOptions, options: aceOptions }, css: { \'dx-disabled-ace\': disableCustomSql() }"></div>        </div>    </div>    <!-- /ko -->',
    'dxrd-procedures-control': '<div data-bind="text: caption()"></div>    <div class="dx-default-border-style dxd-border-secondary">        <div class="dxrd-wizard-list dxrd-create-query-page-editor" data-bind="dxList: { items: storedProcedures, onContentReady: scrollActiveItem, selectedItems: selectedProcedure, editEnabled: true, editConfig: { selectionEnabled: true }, selectionMode: \'single\', activeStateEnabled: false, noDataText: $root.dx.Analytics.Internal.noDataText() }">            <div data-options="dxTemplate : { name: \'item\' }">                <div data-bind="text: $parent.generateStoredProcedureDisplayName($data)"></div>            </div>        </div>    </div>',
    'dxrd-wizard-create-query-page': '<div class="dxrd-wizard-page dxrd-wizard-create-query-page">        <div class="dxrd-radio-nowrap-ellipsis" data-bind="dxRadioGroup: { value: selectedQueryType, items: queryTypeItems }">            <div data-options="dxTemplate : { name: \'item\' }">                <div class="dxrd-radio-nowrap-ellipsis-text" data-bind="text: $parent.localizeQueryType($data), attr: { \'title\': $parent.localizeQueryType($data) }"></div>            </div>        </div>        <div class="dxrd-create-query-page-content">            <!-- ko template: { name: queryControl().template, data: queryControl() } -->            <!-- /ko -->        </div>        <div data-bind="dxButton: { text: runQueryBuilderBtnText, onClick: runQueryBuilder, disabled: queryControl().runQueryBuilderDisabled }" class="dxrd-wizard-btn"></div>        <!-- ko template: { name: \'dxrd-querybuilder-popup\', data: popupQueryBuilder } -->        <!-- /ko -->    </div>',
    'dxrd-querybuilder-popup': '<div class="dxrd-querybuilder-popup" data-bind="dxPopup: popupViewModel($element)">        <!-- ko if: qbOptions -->        <!-- ko if: isVisible -->        <div class="dxrd-querybuilder-popup-content">            <div style="height:100%;" data-bind="dxQueryBuilder: { options: qbOptions, designerModel: designer }"></div>        </div>        <!-- /ko -->        <div class="dxrd-querybuilder-popup-buttons dxd-border-secondary">            <div data-bind="dxButton: { text: getDisplayText(\'previewResults\'), onClick: previewHandler, disabled: okButtonDisabled }" class="dxrd-querybuilder-popup-button-left"></div>            <div data-bind="dxButton: { text: getDisplayText(\'cancel\'), onClick: cancelHandler }" class="dxrd-querybuilder-popup-button"></div>            <div data-bind="dxButton: { text: getDisplayText(\'ok\'), onClick: okHandler, disabled: okButtonDisabled }" class="dxrd-querybuilder-popup-button"></div>        </div>        <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel:{            animation: {                show: { type: \'fade\', from: 0, to: 1, duration: 700 },                hide: { type: \'fade\', from: 1, to: 0, duration: 700 }            },            deferRendering: false,            message: getDisplayText(\'loading\'),            visible: showLoadIndicator,            shading: true,            shadingColor: \'transparent\'}">        </div>        <!-- /ko -->    </div>',
    'dxrd-querybuilder': '<div class="dx-designer dx-querybuilder" data-bind="template: \'dxrd-designer\'">    </div>',
    'dx-wizard-headerNew': '<div class="dxrd-wizard-header-custom">        <!-- ko with: _currentPage -->        <div class="dxrd-span-title" data-bind="text: $data.title || $parent.title"></div>        <div class="dxrd-span-description" data-bind="text: description, attr: { title: description }"></div>        <!-- /ko -->    </div>',
    'dx-wizard-newlayout': '<div class="dxrd-wizard dx-editors dxd-text-primary" data-bind="dxPopup: {        visible: isVisible,        title: isVisible() ? title : \'\',        showTitle: true,        fullScreen: false,        width: width,        height: height,        container: _container($element),        titleTemplate: _titleTemplate,        position: _wizardPopupPosition($element)    }, class: _extendCssClass, css: { \'dx-rtl\': $root.rtl, \'dx-ltr\': !$root.rtl }">        <div class="dxrd-wizard-content">            <!-- ko with: _currentPage -->            <div style="height: 100%" data-bind="template: { name: template, data: page } "></div>            <!-- /ko -->            <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel: _loadPanelViewModel($element)"></div>        </div>        <div class="dxrd-wizard-navigation">            <div data-bind="dxButton: cancelButton" class="dxrd-wizard-btn left"></div>            <div data-bind="dxButton: finishButton" class="dxrd-wizard-btn right"></div>            <div data-bind="dxButton: nextButton" class="dxrd-wizard-btn right"></div>            <div data-bind="dxButton: previousButton" class="dxrd-wizard-btn right"></div>        </div>    </div>',
});

if(window["ace"]) {
    var _define = window["ace"].define || define;
    _define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var DocCommentHighlightRules = function() {
            this.$rules = {
                "start": [{
                    token: "comment.doc.tag",
                    regex: "@[\\w\\d_]+" // TODO: fix email addresses
                },
                DocCommentHighlightRules.getTagRule(),
                {
                    defaultToken: "comment.doc",
                    caseInsensitive: true
                }]
            };
        };

        oop.inherits(DocCommentHighlightRules, TextHighlightRules);

        DocCommentHighlightRules.getTagRule = function(start) {
            return {
                token: "comment.doc.tag.storage.type",
                regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
            };
        }

        DocCommentHighlightRules.getStartRule = function(start) {
            return {
                token: "comment.doc", // doc comment
                regex: "\\/\\*(?=\\*)",
                next: start
            };
        };

        DocCommentHighlightRules.getEndRule = function(start) {
            return {
                token: "comment.doc", // closing comment
                regex: "\\*\\/",
                next: start
            };
        };


        exports.DocCommentHighlightRules = DocCommentHighlightRules;

    });

    _define("ace/mode/sql_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules", "ace/mode/doc_comment_highlight_rules"], function(require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var SqlServerHighlightRules = function() {
            /**
             * Transact-SQL Syntax Conventions: https://msdn.microsoft.com/en-us/library/ms177563.aspx
             * Goal: make this imitate SSMS (SQL Server Managment Studio)
             */

            // https://msdn.microsoft.com/en-us/library/ms189773.aspx
            var logicalOperators = "ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|SOME";
            logicalOperators += "|NULL|IS|APPLY|INNER|OUTER|LEFT|RIGHT|JOIN|CROSS"; //SSMS colors these gray too
            //note: manually removed LEFT and RIGHT from built in functions below to color it same way SSMS does


            var builtinFunctions = (
                /* https://msdn.microsoft.com/en-us/library/ms187957.aspx */
                "OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|" +
                /* https://msdn.microsoft.com/en-us/library/ms173454.aspx */
                "AVG|CHECKSUM_AGG|COUNT|COUNT_BIG|GROUPING|GROUPING_ID|MAX|MIN|STDEV|STDEVP|SUM|VAR|VARP|" +
                /* https://msdn.microsoft.com/en-us/library/ms189798.aspx */
                "DENSE_RANK|NTILE|RANK|ROW_NUMBER" +
                /* https://msdn.microsoft.com/en-us/library/ms173823.aspx */
                "@@DATEFIRST|@@DBTS|@@LANGID|@@LANGUAGE|@@LOCK_TIMEOUT|@@MAX_CONNECTIONS|@@MAX_PRECISION|@@NESTLEVEL|@@OPTIONS|@@REMSERVER|@@SERVERNAME|@@SERVICENAME|@@SPID|@@TEXTSIZE|@@VERSION|" +
                /* https://msdn.microsoft.com/en-us/library/hh231076.aspx */
                "CAST|CONVERT|PARSE|TRY_CAST|TRY_CONVERT|TRY_PARSE" +
                /* https://msdn.microsoft.com/en-us/library/ms186285.aspx */
                "@@CURSOR_ROWS|@@FETCH_STATUS|CURSOR_STATUS|" +
                /* https://msdn.microsoft.com/en-us/library/ms186724.aspx */
                "@@DATEFIRST|@@LANGUAGE|CURRENT_TIMESTAMP|DATEADD|DATEDIFF|DATEFROMPARTS|DATENAME|DATEPART|DATETIME2FROMPARTS|DATETIMEFROMPARTS|DATETIMEOFFSETFROMPARTS|DAY|EOMONTH|GETDATE|GETUTCDATE|ISDATE|MONTH|SET DATEFIRST|SET DATEFORMAT|SET LANGUAGE|SMALLDATETIMEFROMPARTS|SP_HELPLANGUAGE|SWITCHOFFSET|SYSDATETIME|SYSDATETIMEOFFSET|SYSUTCDATETIME|TIMEFROMPARTS|TODATETIMEOFFSET|YEAR|" +
                /* https://msdn.microsoft.com/en-us/library/hh213226.aspx */
                "CHOOSE|IIF|" +
                /* https://msdn.microsoft.com/en-us/library/ms177516.aspx */
                "ABS|ACOS|ASIN|ATAN|ATN2|CEILING|COS|COT|DEGREES|EXP|FLOOR|LOG|LOG10|PI|POWER|RADIANS|RAND|ROUND|SIGN|SIN|SQRT|SQUARE|TAN|" +
                /* https://msdn.microsoft.com/en-us/library/ms187812.aspx */
                "@@PROCID|APPLOCK_MODE|APPLOCK_TEST|APP_NAME|ASSEMBLYPROPERTY|COLUMNPROPERTY|COL_LENGTH|COL_NAME|DATABASEPROPERTYEX|DATABASE_PRINCIPAL_ID|DB_ID|DB_NAME|FILEGROUPPROPERTY|FILEGROUP_ID|FILEGROUP_NAME|FILEPROPERTY|FILE_ID|FILE_IDEX|FILE_NAME|FULLTEXTCATALOGPROPERTY|FULLTEXTSERVICEPROPERTY|INDEXKEY_PROPERTY|INDEXPROPERTY|INDEX_COL|OBJECTPROPERTY|OBJECTPROPERTYEX|OBJECT_DEFINITION|OBJECT_ID|OBJECT_NAME|OBJECT_SCHEMA_NAME|ORIGINAL_DB_NAME|PARSENAME|SCHEMA_ID|SCHEMA_NAME|SCOPE_IDENTITY|SERVERPROPERTY|STATS_DATE|TYPEPROPERTY|TYPE_ID|TYPE_NAME|" +
                /* https://msdn.microsoft.com/en-us/library/ms186236.aspx */
                "CERTENCODED|CERTPRIVATEKEY|CURRENT_USER|DATABASE_PRINCIPAL_ID|HAS_PERMS_BY_NAME|IS_MEMBER|IS_ROLEMEMBER|IS_SRVROLEMEMBER|ORIGINAL_LOGIN|PERMISSIONS|PWDCOMPARE|PWDENCRYPT|SCHEMA_ID|SCHEMA_NAME|SESSION_USER|SUSER_ID|SUSER_NAME|SUSER_SID|SUSER_SNAME|SYS.FN_BUILTIN_PERMISSIONS|SYS.FN_GET_AUDIT_FILE|SYS.FN_MY_PERMISSIONS|SYSTEM_USER|USER_ID|USER_NAME|" +
                /* https://msdn.microsoft.com/en-us/library/ms181984.aspx */
                "ASCII|CHAR|CHARINDEX|CONCAT|DIFFERENCE|FORMAT|LEN|LOWER|LTRIM|NCHAR|PATINDEX|QUOTENAME|REPLACE|REPLICATE|REVERSE|RTRIM|SOUNDEX|SPACE|STR|STUFF|SUBSTRING|UNICODE|UPPER|" +
                /* https://msdn.microsoft.com/en-us/library/ms187786.aspx */
                "$PARTITION|@@ERROR|@@IDENTITY|@@PACK_RECEIVED|@@ROWCOUNT|@@TRANCOUNT|BINARY_CHECKSUM|CHECKSUM|CONNECTIONPROPERTY|CONTEXT_INFO|CURRENT_REQUEST_ID|ERROR_LINE|ERROR_MESSAGE|ERROR_NUMBER|ERROR_PROCEDURE|ERROR_SEVERITY|ERROR_STATE|FORMATMESSAGE|GETANSINULL|GET_FILESTREAM_TRANSACTION_CONTEXT|HOST_ID|HOST_NAME|ISNULL|ISNUMERIC|MIN_ACTIVE_ROWVERSION|NEWID|NEWSEQUENTIALID|ROWCOUNT_BIG|XACT_STATE|" +
                /* https://msdn.microsoft.com/en-us/library/ms177520.aspx */
                "@@CONNECTIONS|@@CPU_BUSY|@@IDLE|@@IO_BUSY|@@PACKET_ERRORS|@@PACK_RECEIVED|@@PACK_SENT|@@TIMETICKS|@@TOTAL_ERRORS|@@TOTAL_READ|@@TOTAL_WRITE|FN_VIRTUALFILESTATS|" +
                /* https://msdn.microsoft.com/en-us/library/ms188353.aspx */
                "PATINDEX|TEXTPTR|TEXTVALID|" +
                /* other */
                "COALESCE|NULLIF"
            );


            // https://msdn.microsoft.com/en-us/library/ms187752.aspx
            var dataTypes = ("BIGINT|BINARY|BIT|CHAR|CURSOR|DATE|DATETIME|DATETIME2|DATETIMEOFFSET|DECIMAL|FLOAT|HIERARCHYID|IMAGE|INTEGER|INT|MONEY|NCHAR|NTEXT|NUMERIC|NVARCHAR|REAL|SMALLDATETIME|SMALLINT|SMALLMONEY|SQL_VARIANT|TABLE|TEXT|TIME|TIMESTAMP|TINYINT|UNIQUEIDENTIFIER|VARBINARY|VARCHAR|XML");


            //https://msdn.microsoft.com/en-us/library/ms176007.aspx (these are lower case!)
            var builtInStoredProcedures = "sp_addextendedproc|sp_addextendedproperty|sp_addmessage|sp_addtype|sp_addumpdevice|sp_add_data_file_recover_suspect_db|sp_add_log_file_recover_suspect_db|sp_altermessage|sp_attach_db|sp_attach_single_file_db|sp_autostats|sp_bindefault|sp_bindrule|sp_bindsession|sp_certify_removable|sp_clean_db_file_free_space|sp_clean_db_free_space|sp_configure|sp_control_plan_guide|sp_createstats|sp_create_plan_guide|sp_create_plan_guide_from_handle|sp_create_removable|sp_cycle_errorlog|sp_datatype_info|sp_dbcmptlevel|sp_dbmmonitoraddmonitoring|sp_dbmmonitorchangealert|sp_dbmmonitorchangemonitoring|sp_dbmmonitordropalert|sp_dbmmonitordropmonitoring|sp_dbmmonitorhelpalert|sp_dbmmonitorhelpmonitoring|sp_dbmmonitorresults|sp_db_increased_partitions|sp_delete_backuphistory|sp_depends|sp_describe_first_result_set|sp_describe_undeclared_parameters|sp_detach_db|sp_dropdevice|sp_dropextendedproc|sp_dropextendedproperty|sp_dropmessage|sp_droptype|sp_execute|sp_executesql|sp_getapplock|sp_getbindtoken|sp_help|sp_helpconstraint|sp_helpdb|sp_helpdevice|sp_helpextendedproc|sp_helpfile|sp_helpfilegroup|sp_helpindex|sp_helplanguage|sp_helpserver|sp_helpsort|sp_helpstats|sp_helptext|sp_helptrigger|sp_indexoption|sp_invalidate_textptr|sp_lock|sp_monitor|sp_prepare|sp_prepexec|sp_prepexecrpc|sp_procoption|sp_recompile|sp_refreshview|sp_releaseapplock|sp_rename|sp_renamedb|sp_resetstatus|sp_sequence_get_range|sp_serveroption|sp_setnetname|sp_settriggerorder|sp_spaceused|sp_tableoption|sp_unbindefault|sp_unbindrule|sp_unprepare|sp_updateextendedproperty|sp_updatestats|sp_validname|sp_who|sys.sp_merge_xtp_checkpoint_files|sys.sp_xtp_bind_db_resource_pool|sys.sp_xtp_checkpoint_force_garbage_collection|sys.sp_xtp_control_proc_exec_stats|sys.sp_xtp_control_query_exec_stats|sys.sp_xtp_unbind_db_resource_pool";


            // https://msdn.microsoft.com/en-us/library/ms189822.aspx
            var keywords = "ABSOLUTE|ACTION|ADA|ADD|ADMIN|AFTER|AGGREGATE|ALIAS|ALL|ALLOCATE|ALTER|AND|ANY|ARE|ARRAY|AS|ASC|ASENSITIVE|ASSERTION|ASYMMETRIC|AT|ATOMIC|AUTHORIZATION|BACKUP|BEFORE|BEGIN|BETWEEN|BIT_LENGTH|BLOB|BOOLEAN|BOTH|BREADTH|BREAK|BROWSE|BULK|BY|CALL|CALLED|CARDINALITY|CASCADE|CASCADED|CASE|CATALOG|CHARACTER|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CHECKPOINT|CLASS|CLOB|CLOSE|CLUSTERED|COALESCE|COLLATE|COLLATION|COLLECT|COLUMN|COMMIT|COMPLETION|COMPUTE|CONDITION|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONSTRUCTOR|CONTAINS|CONTAINSTABLE|CONTINUE|CORR|CORRESPONDING|COVAR_POP|COVAR_SAMP|CREATE|CROSS|CUBE|CUME_DIST|CURRENT|CURRENT_CATALOG|CURRENT_DATE|CURRENT_DEFAULT_TRANSFORM_GROUP|CURRENT_PATH|CURRENT_ROLE|CURRENT_SCHEMA|CURRENT_TIME|CURRENT_TRANSFORM_GROUP_FOR_TYPE|CYCLE|DATA|DATABASE|DBCC|DEALLOCATE|DEC|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DENY|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DESTROY|DESTRUCTOR|DETERMINISTIC|DIAGNOSTICS|DICTIONARY|DISCONNECT|DISK|DISTINCT|DISTRIBUTED|DOMAIN|DOUBLE|DROP|DUMP|DYNAMIC|EACH|ELEMENT|ELSE|END|END-EXEC|EQUALS|ERRLVL|ESCAPE|EVERY|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXIT|EXTERNAL|EXTRACT|FETCH|FILE|FILLFACTOR|FILTER|FIRST|FOR|FOREIGN|FORTRAN|FOUND|FREE|FREETEXT|FREETEXTTABLE|FROM|FULL|FULLTEXTTABLE|FUNCTION|FUSION|GENERAL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|HOLD|HOLDLOCK|HOST|HOUR|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IGNORE|IMMEDIATE|IN|INCLUDE|INDEX|INDICATOR|INITIALIZE|INITIALLY|INNER|INOUT|INPUT|INSENSITIVE|INSERT|INTEGER|INTERSECT|INTERSECTION|INTERVAL|INTO|IS|ISOLATION|ITERATE|JOIN|KEY|KILL|LANGUAGE|LARGE|LAST|LATERAL|LEADING|LESS|LEVEL|LIKE|LIKE_REGEX|LIMIT|LINENO|LN|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATOR|MAP|MATCH|MEMBER|MERGE|METHOD|MINUTE|MOD|MODIFIES|MODIFY|MODULE|MULTISET|NAMES|NATIONAL|NATURAL|NCLOB|NEW|NEXT|NO|NOCHECK|NONCLUSTERED|NONE|NORMALIZE|NOT|NULL|NULLIF|OBJECT|OCCURRENCES_REGEX|OCTET_LENGTH|OF|OFF|OFFSETS|OLD|ON|ONLY|OPEN|OPERATION|OPTION|OR|ORDER|ORDINALITY|OUT|OUTER|OUTPUT|OVER|OVERLAPS|OVERLAY|PAD|PARAMETER|PARAMETERS|PARTIAL|PARTITION|PASCAL|PATH|PERCENT|PERCENTILE_CONT|PERCENTILE_DISC|PERCENT_RANK|PIVOT|PLAN|POSITION|POSITION_REGEX|POSTFIX|PRECISION|PREFIX|PREORDER|PREPARE|PRESERVE|PRIMARY|PRINT|PRIOR|PRIVILEGES|PROC|PROCEDURE|PUBLIC|RAISERROR|RANGE|READ|READS|READTEXT|RECONFIGURE|RECURSIVE|REF|REFERENCES|REFERENCING|REGR_AVGX|REGR_AVGY|REGR_COUNT|REGR_INTERCEPT|REGR_R2|REGR_SLOPE|REGR_SXX|REGR_SXY|REGR_SYY|RELATIVE|RELEASE|REPLICATION|RESTORE|RESTRICT|RESULT|RETURN|RETURNS|REVERT|REVOKE|ROLE|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWCOUNT|ROWGUIDCOL|ROWS|RULE|SAVE|SAVEPOINT|SCHEMA|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SECURITYAUDIT|SELECT|SEMANTICKEYPHRASETABLE|SEMANTICSIMILARITYDETAILSTABLE|SEMANTICSIMILARITYTABLE|SENSITIVE|SEQUENCE|SESSION|SET|SETS|SETUSER|SHUTDOWN|SIMILAR|SIZE|SOME|SPECIFIC|SPECIFICTYPE|SQL|SQLCA|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATEMENT|STATIC|STATISTICS|STDDEV_POP|STDDEV_SAMP|STRUCTURE|SUBMULTISET|SUBSTRING_REGEX|SYMMETRIC|SYSTEM|TABLESAMPLE|TEMPORARY|TERMINATE|TEXTSIZE|THAN|THEN|TIMEZONE_HOUR|TIMEZONE_MINUTE|TO|TOP|TRAILING|TRAN|TRANSACTION|TRANSLATE|TRANSLATE_REGEX|TRANSLATION|TREAT|TRIGGER|TRIM|TRUNCATE|TSEQUAL|UESCAPE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARIABLE|VARYING|VAR_POP|VAR_SAMP|VIEW|WAITFOR|WHEN|WHENEVER|WHERE|WHILE|WIDTH_BUCKET|WINDOW|WITH|WITHIN|WITHIN GROUP|WITHOUT|WORK|WRITE|WRITETEXT|XMLAGG|XMLATTRIBUTES|XMLBINARY|XMLCAST|XMLCOMMENT|XMLCONCAT|XMLDOCUMENT|XMLELEMENT|XMLEXISTS|XMLFOREST|XMLITERATE|XMLNAMESPACES|XMLPARSE|XMLPI|XMLQUERY|XMLSERIALIZE|XMLTABLE|XMLTEXT|XMLVALIDATE|ZONE";


            // Microsoft's keyword list is missing a lot of things that are located on various other pages
            // https://msdn.microsoft.com/en-us/library/ms187373.aspx, https://msdn.microsoft.com/en-us/library/ms181714.aspx
            keywords += "|KEEPIDENTITY|KEEPDEFAULTS|IGNORE_CONSTRAINTS|IGNORE_TRIGGERS|XLOCK|FORCESCAN|FORCESEEK|HOLDLOCK|NOLOCK|NOWAIT|PAGLOCK|READCOMMITTED|READCOMMITTEDLOCK|READPAST|READUNCOMMITTED|REPEATABLEREAD|ROWLOCK|SERIALIZABLE|SNAPSHOT|SPATIAL_WINDOW_MAX_CELLS|TABLOCK|TABLOCKX|UPDLOCK|XLOCK|IGNORE_NONCLUSTERED_COLUMNSTORE_INDEX|EXPAND|VIEWS|FAST|FORCE|KEEP|KEEPFIXED|MAXDOP|MAXRECURSION|OPTIMIZE|PARAMETERIZATION|SIMPLE|FORCED|RECOMPILE|ROBUST|PLAN|SPATIAL_WINDOW_MAX_CELLS|NOEXPAND|HINT";
            // https://msdn.microsoft.com/en-us/library/ms173815.aspx
            keywords += "|LOOP|HASH|MERGE|REMOTE";
            // https://msdn.microsoft.com/en-us/library/ms175976.aspx
            keywords += "|TRY|CATCH|THROW";
            // highlighted words in SSMS that I'm not even sure where they come from
            keywords += "|TYPE";


            //remove specific built in types from keyword list
            keywords = keywords.split('|');
            keywords = keywords.filter(function(value, index, self) {
                return logicalOperators.split('|').indexOf(value) === -1 && builtinFunctions.split('|').indexOf(value) === -1 && dataTypes.split('|').indexOf(value) === -1;
            });
            keywords = keywords.sort().join('|');


            var keywordMapper = this.createKeywordMapper({
                "constant.language": logicalOperators,
                "storage.type": dataTypes,
                "support.function": builtinFunctions,
                "support.storedprocedure": builtInStoredProcedures,
                "keyword": keywords
            }, "identifier", true);


            //https://msdn.microsoft.com/en-us/library/ms190356.aspx
            var setStatements = "SET ANSI_DEFAULTS|SET ANSI_NULLS|SET ANSI_NULL_DFLT_OFF|SET ANSI_NULL_DFLT_ON|SET ANSI_PADDING|SET ANSI_WARNINGS|SET ARITHABORT|SET ARITHIGNORE|SET CONCAT_NULL_YIELDS_NULL|SET CURSOR_CLOSE_ON_COMMIT|SET DATEFIRST|SET DATEFORMAT|SET DEADLOCK_PRIORITY|SET FIPS_FLAGGER|SET FMTONLY|SET FORCEPLAN|SET IDENTITY_INSERT|SET IMPLICIT_TRANSACTIONS|SET LANGUAGE|SET LOCK_TIMEOUT|SET NOCOUNT|SET NOEXEC|SET NUMERIC_ROUNDABORT|SET OFFSETS|SET PARSEONLY|SET QUERY_GOVERNOR_COST_LIMIT|SET QUOTED_IDENTIFIER|SET REMOTE_PROC_TRANSACTIONS|SET ROWCOUNT|SET SHOWPLAN_ALL|SET SHOWPLAN_TEXT|SET SHOWPLAN_XML|SET STATISTICS IO|SET STATISTICS PROFILE|SET STATISTICS TIME|SET STATISTICS XML|SET TEXTSIZE|SET XACT_ABORT".split('|');
            var isolationLevels = "READ UNCOMMITTED|READ COMMITTED|REPEATABLE READ|SNAPSHOP|SERIALIZABLE".split('|');
            for(var i = 0; i < isolationLevels.length; i++) {
                setStatements.push('SET TRANSACTION ISOLATION LEVEL ' + isolationLevels[i]);
            }


            this.$rules = {
                start: [{
                    token: "string.start",
                    regex: "'",
                    next: [{
                        token: "constant.language.escape",
                        regex: /''/
                    }, {
                        token: "string.end",
                        next: "start",
                        regex: "'"
                    }, {
                        defaultToken: "string"
                    }]
                },
                DocCommentHighlightRules.getStartRule("doc-start"), {
                    token: "comment",
                    regex: "--.*$"
                }, {
                    token: "comment",
                    start: "/\\*",
                    end: "\\*/"
                }, {
                    token: "constant.numeric", // float
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                }, {
                    token: keywordMapper,
                    regex: "@{0,2}[a-zA-Z_$][a-zA-Z0-9_$]*\\b(?!])" //up to 2 @symbols for some built in functions
                }, {
                    token: "constant.class",
                    regex: "@@?[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    //https://msdn.microsoft.com/en-us/library/ms174986.aspx
                    token: "keyword.operator",
                    regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|=|\\*"
                }, {
                    token: "paren.lparen",
                    regex: "[\\(]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\)]"
                }, {
                    token: "punctuation",
                    regex: ",|;"
                }, {
                    token: "text",
                    regex: "\\s+"
                }],
                comment: [
                    DocCommentHighlightRules.getTagRule(), {
                        token: "comment",
                        regex: "\\*\\/",
                        next: "no_regex"
                    }, {
                        defaultToken: "comment",
                        caseInsensitive: true
                    }]
            };

            //add each set statment as regex at top of rules so that they are processed first because they require multiple words
            //note: this makes the statements not match if they are not upper case.. which is not ideal but I don't know of an easy way to fix this
            for(var i = 0; i < setStatements.length; i++) {
                this.$rules.start.unshift({
                    token: "set.statement",
                    regex: setStatements[i]
                });
            }

            this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
            this.normalizeRules();


            //prepare custom keyword completions used by mode to override default completor
            //this allows for custom 'meta' and proper case of completions
            var completions = [];
            var addCompletions = function(arr, meta) {
                arr.forEach(function(v) {
                    completions.push({
                        name: v,
                        value: v,
                        score: 0,
                        meta: meta
                    });
                });
            };
            addCompletions(builtInStoredProcedures.split('|'), 'procedure');
            addCompletions(logicalOperators.split('|'), 'operator');
            addCompletions(builtinFunctions.split('|'), 'function');
            addCompletions(dataTypes.split('|'), 'type');
            addCompletions(setStatements, 'statement');
            addCompletions(keywords.split('|'), 'keyword');

            this.completions = completions;
        };

        oop.inherits(SqlServerHighlightRules, TextHighlightRules);

        exports.SqlHighlightRules = SqlServerHighlightRules;
    });

    _define("ace/mode/sql", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/sql_highlight_rules", "ace/range"], function(require, exports, module) {
        "use strict";

        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;
        var Range = require("../range").Range;

        var Mode = function() {
            this.HighlightRules = SqlHighlightRules;
        };
        oop.inherits(Mode, TextMode);

        (function() {

            this.lineCommentStart = "--";

            this.$id = "ace/mode/sql";
        }).call(Mode.prototype);

        exports.Mode = Mode;

    });
}