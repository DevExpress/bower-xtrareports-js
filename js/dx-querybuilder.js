/**
* DevExpress HTML/JS Query Builder (dx-querybuilder.js)
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
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            ko.bindingHandlers["routeLineDraggable"] = {
                init: function (element, valueAccessor) {
                    var values = valueAccessor(), options = $.extend({ snap: '.dxrd-drag-snap-line', snapTolerance: Analytics.Internal.SnapLinesHelper.snapTolerance }, ko.unwrap(values), {
                        start: function (event, ui) {
                            values.starting();
                        },
                        stop: function (event, ui) {
                            values.stopped();
                        },
                        drag: function (event, ui) {
                            var dx = ui.position.left - ui["originalPosition"].left, dy = ui.position.top - ui["originalPosition"].top;
                            values.forceResize({ delta: { dx: dx, dy: dy } });
                        }
                    });
                    $(element).draggable(options);
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
            ko.bindingHandlers["updateConnectorArrow"] = {
                init: function (svgNode, valueAccessor, allBindings, viewModel, bindingContext) {
                    var ieVersion = getInternetExplorerVersion();
                    if (ieVersion > -1 && ieVersion <= 11) {
                        var updateSubscription = bindingContext.$data.routePointsSet.subscribe(function () {
                            if (bindingContext.$data.showArrow())
                                svgNode.parentNode.insertBefore(svgNode, svgNode);
                        });
                        ko.utils.domNodeDisposal.addDisposeCallback(svgNode.parentNode, function () { return updateSubscription.dispose(); });
                    }
                }
            };
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            Diagram.controlsFactory = new Analytics.Utils.ControlsFactory();
            function registerControls() {
                Diagram.controlsFactory.registerControl("Unknown", {
                    info: Diagram.unknownSerializationsInfo,
                    type: Analytics.ElementViewModel,
                    nonToolboxItem: true,
                    surfaceType: Analytics.SurfaceElementBase
                });
                Diagram.controlsFactory.registerControl("Connector", {
                    info: [
                        Diagram.name,
                        { propertyName: "location", displayName: "Location", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "startPoint", modelName: "@StartPoint", link: true },
                        { propertyName: "endPoint", modelName: "@EndPoint", link: true }
                    ],
                    surfaceType: Diagram.ConnectorSurface,
                    type: Diagram.ConnectorViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("RoutedConnector", {
                    info: [
                        Diagram.name,
                        { propertyName: "location", displayName: "Location", editor: DevExpress.JS.Widgets.editorTemplates.objecteditor },
                        { propertyName: "startPoint", modelName: "@StartPoint", link: true },
                        { propertyName: "endPoint", modelName: "@EndPoint", link: true }
                    ],
                    surfaceType: Diagram.RoutedConnectorSurface,
                    type: Diagram.RoutedConnectorViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("ConnectionPoint", {
                    info: Diagram.connectionPointSerializationInfo,
                    surfaceType: Diagram.ConnectionPointSurface,
                    type: Diagram.ConnectionPointViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                Diagram.controlsFactory.registerControl("Diagram", {
                    info: Diagram.diagramSerializationsInfo,
                    surfaceType: Diagram.DiagramSurface,
                    popularProperties: ["name"],
                    type: Diagram.DiagramViewModel,
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
                    surfaceType: Diagram.DiagramElementSurface,
                    popularProperties: ["text"],
                    type: Diagram.DiagramElementViewModel,
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
                    surfaceType: Diagram.DiagramElementSurface,
                    popularProperties: ["text"],
                    type: Diagram.DiagramElementViewModel,
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
                    surfaceType: Diagram.DiagramElementSurface,
                    popularProperties: ["text"],
                    type: Diagram.DiagramElementViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: false
                });
                Diagram.controlsFactory.registerControl("ConnectingPoint", {
                    info: Diagram.connectingPointSerializationInfo,
                    surfaceType: Diagram.ConnectingPointSurface,
                    type: Diagram.ConnectingPointViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
            }
            Diagram.registerControls = registerControls;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var ConnectingPointDragHandler = (function (_super) {
                __extends(ConnectingPointDragHandler, _super);
                function ConnectingPointDragHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, undoEngine, snapHelper) || this;
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
                    if (!(control instanceof Diagram.ConnectingPointSurface)) {
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
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel();
                        if (dropTarget instanceof Diagram.ConnectingPointViewModel) {
                            this.newConnector.endPoint().connectingPoint(dropTarget);
                        }
                        else if (dropTarget instanceof Diagram.DiagramElementViewModel) {
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
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var ConnectionPointDragHandler = (function (_super) {
                __extends(ConnectionPointDragHandler, _super);
                function ConnectionPointDragHandler(surface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, undoEngine, snapHelper) || this;
                    _this.currentConnectionPoint = null;
                    _this.cursor = 'arrow';
                    _this.containment = '.dxrd-ghost-container';
                    _this["helper"] = function (draggable) {
                        dragHelperContent.update(draggable);
                    };
                    return _this;
                }
                ConnectionPointDragHandler.prototype.startDrag = function (control) {
                    if (!(control instanceof Diagram.ConnectionPointSurface)) {
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
                    if (this.selection.dropTarget) {
                        var dropTarget = this.selection.dropTarget.getControlModel();
                        if (dropTarget instanceof Diagram.ConnectingPointViewModel) {
                            var connector = this.currentConnectionPoint.parent.getControlModel();
                            if (this.currentConnectionPoint.getControlModel() === connector.startPoint()) {
                                connector.startPoint().connectingPoint(dropTarget);
                            }
                            else {
                                connector.endPoint().connectingPoint(dropTarget);
                            }
                        }
                        else if (dropTarget instanceof Diagram.DiagramElementViewModel) {
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
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            Diagram.name = { propertyName: "name", modelName: "@Name", displayName: "Name", editor: Analytics.Widgets.editorTemplates.text, validationRules: Analytics.Internal.nameValidationRules };
            Diagram.text = { propertyName: "text", modelName: "@Text", displayName: "Text", editor: Analytics.Widgets.editorTemplates.text };
            Diagram.size = { propertyName: "size", modelName: "@Size", defaultVal: "100,50", from: Analytics.Size.fromString, displayName: "Size", editor: Analytics.Widgets.editorTemplates.objecteditor };
            Diagram.location = { propertyName: "location", modelName: "@Location", from: Analytics.Point.fromString, displayName: "Location", editor: Analytics.Widgets.editorTemplates.objecteditor };
            Diagram.sizeLocation = [Diagram.size, Diagram.location];
            Diagram.unknownSerializationsInfo = [Diagram.name].concat(Diagram.sizeLocation);
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var DiagramElementBaseViewModel = (function (_super) {
                __extends(DiagramElementBaseViewModel, _super);
                function DiagramElementBaseViewModel(control, parent, serializer) {
                    return _super.call(this, control, parent, serializer) || this;
                }
                DiagramElementBaseViewModel.prototype.getControlFactory = function () {
                    return Diagram.controlsFactory;
                };
                return DiagramElementBaseViewModel;
            }(Analytics.ElementViewModel));
            Diagram.DiagramElementBaseViewModel = DiagramElementBaseViewModel;
            var DiagramElementViewModel = (function (_super) {
                __extends(DiagramElementViewModel, _super);
                function DiagramElementViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "DiagramElement" }, control), parent, serializer) || this;
                    _this.connectingPoints = Analytics.Utils.deserializeArray(control && control.ConnectingPoints || [], function (item) { return new Diagram.ConnectingPointViewModel(item, _this, serializer); });
                    if (_this.text() === undefined) {
                        _this.text(_this.name());
                    }
                    return _this;
                }
                return DiagramElementViewModel;
            }(DiagramElementBaseViewModel));
            Diagram.DiagramElementViewModel = DiagramElementViewModel;
            Diagram.diagramElementSerializationInfo = [Diagram.size, Diagram.location, Diagram.name, Diagram.text, { propertyName: "type", modelName: "@Type" }];
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var ConnectingPointViewModel = (function (_super) {
                __extends(ConnectingPointViewModel, _super);
                function ConnectingPointViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "ConnectingPoint" }, control), parent, serializer) || this;
                    _this.side = ko.pureComputed(function () {
                        if (_this.percentOffsetY() >= _this.percentOffsetX()) {
                            if (_this.percentOffsetY() > 1 - _this.percentOffsetX()) {
                                return Diagram.PointSide.South;
                            }
                            else {
                                return Diagram.PointSide.West;
                            }
                        }
                        else {
                            if (_this.percentOffsetY() > 1 - _this.percentOffsetX()) {
                                return Diagram.PointSide.East;
                            }
                            else {
                                return Diagram.PointSide.North;
                            }
                        }
                    });
                    _this.size = new Analytics.Size(7, 7);
                    _this.location = new Analytics.Point(0, 0);
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
            }(Diagram.DiagramElementBaseViewModel));
            Diagram.ConnectingPointViewModel = ConnectingPointViewModel;
            Diagram.connectingPointSerializationInfo = [
                { propertyName: "percentOffsetX", modelName: "@PercentOffsetX", defaultVal: 0.5, from: Analytics.Utils.floatFromModel },
                { propertyName: "percentOffsetY", modelName: "@PercentOffsetY", defaultVal: 0.5, from: Analytics.Utils.floatFromModel }
            ];
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
            }(Analytics.SurfaceElementBase));
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
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
            }(Diagram.DiagramElementBaseSurface));
            Diagram.ConnectingPointSurface = ConnectingPointSurface;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
            }(Diagram.DiagramElementBaseViewModel));
            Diagram.ConnectionPointViewModel = ConnectionPointViewModel;
            Diagram.connectionPointSerializationInfo = [
                Diagram.location,
                { propertyName: "connectingPoint", modelName: "@ConnectingPoint", link: true }
            ];
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
            }(Analytics.SurfaceElementBase));
            Diagram.ConnectionPointSurface = ConnectionPointSurface;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var ConnectorViewModel = (function (_super) {
                __extends(ConnectorViewModel, _super);
                function ConnectorViewModel(control, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "Connector" }, control), parent, serializer) || this;
                    _this.startPoint(_this.startPoint() || new Diagram.ConnectionPointViewModel({ "@Location": "0, 0" }, _this, serializer));
                    _this.endPoint(_this.endPoint() || new Diagram.ConnectionPointViewModel({ "@Location": "150, 75" }, _this, serializer));
                    _this.location = new Analytics.Point(0, 0);
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
                    _this.size = new Analytics.Size(0, 0);
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
            }(Diagram.DiagramElementBaseViewModel));
            Diagram.ConnectorViewModel = ConnectorViewModel;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            var ConnectorSurface = (function (_super) {
                __extends(ConnectorSurface, _super);
                function ConnectorSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.template = "dxdd-connector";
                    _this.selectiontemplate = "dxdd-connector-selection";
                    _this.startPoint = ko.pureComputed(function () {
                        return new Diagram.ConnectionPointSurface(control.startPoint(), context);
                    });
                    _this.endPoint = ko.pureComputed(function () {
                        return new Diagram.ConnectionPointSurface(control.endPoint(), context);
                    });
                    return _this;
                }
                return ConnectorSurface;
            }(Diagram.DiagramElementBaseSurface));
            Diagram.ConnectorSurface = ConnectorSurface;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
                            var startPoint = new Analytics.Point(_this.startPoint().location.x(), _this.startPoint().location.y()), endPoint = new Analytics.Point(_this.endPoint().location.x(), _this.endPoint().location.y());
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
                                    if (startPointSide === Diagram.PointSide.North || startPointSide === Diagram.PointSide.East) {
                                        if (endPointSide === Diagram.PointSide.North || endPointSide === Diagram.PointSide.East) {
                                            if (number !== 1) {
                                                width += indent;
                                                result.push(new Analytics.Point(baseX + width, baseY + height));
                                            }
                                            result.push(new Analytics.Point(baseX + width, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width, baseY + height * ratio));
                                            result.push(new Analytics.Point(baseX, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === Diagram.PointSide.South || endPointSide === Diagram.PointSide.West) {
                                            result.push(new Analytics.Point(baseX, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY + height));
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY));
                                        }
                                    }
                                }
                                else {
                                    if (startPointSide === Diagram.PointSide.North || startPointSide === Diagram.PointSide.West) {
                                        if (endPointSide === Diagram.PointSide.North || endPointSide === Diagram.PointSide.West) {
                                            if (number !== 1) {
                                                baseX -= indent;
                                                result.push(new Analytics.Point(baseX, baseY + height));
                                            }
                                            result.push(new Analytics.Point(baseX, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX, baseY + height * ratio));
                                            result.push(new Analytics.Point(baseX + width, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === Diagram.PointSide.South || endPointSide === Diagram.PointSide.East) {
                                            result.push(new Analytics.Point(baseX + width, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY + height));
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY));
                                        }
                                    }
                                }
                            }
                            else {
                                if (startPoint.x() - endPoint.x() > 0) {
                                    if (startPointSide === Diagram.PointSide.South || startPointSide === Diagram.PointSide.East) {
                                        if (endPointSide === Diagram.PointSide.South || endPointSide === Diagram.PointSide.East) {
                                            if (number !== 1) {
                                                width += indent;
                                                result.push(new Analytics.Point(baseX + width, baseY));
                                            }
                                            result.push(new Analytics.Point(baseX + width, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width, baseY + height * ratio));
                                            result.push(new Analytics.Point(baseX, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === Diagram.PointSide.North || endPointSide === Diagram.PointSide.West) {
                                            result.push(new Analytics.Point(baseX, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY));
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY + height));
                                        }
                                    }
                                }
                                else {
                                    if (startPointSide === Diagram.PointSide.South || startPointSide === Diagram.PointSide.West) {
                                        if (endPointSide === Diagram.PointSide.South || endPointSide === Diagram.PointSide.West) {
                                            if (number !== 1) {
                                                baseX -= indent;
                                                result.push(new Analytics.Point(baseX, baseY));
                                            }
                                            result.push(new Analytics.Point(baseX, baseY + height));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX, baseY + height * ratio));
                                            result.push(new Analytics.Point(baseX + width, baseY + height * ratio));
                                        }
                                    }
                                    else {
                                        if (endPointSide === Diagram.PointSide.North || endPointSide === Diagram.PointSide.East) {
                                            result.push(new Analytics.Point(baseX + width, baseY));
                                        }
                                        else {
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY));
                                            result.push(new Analytics.Point(baseX + width * ratio, baseY + height));
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
                        case Diagram.PointSide.North:
                            point.y(point.y() - RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case Diagram.PointSide.East:
                            point.x(point.x() + RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case Diagram.PointSide.West:
                            point.x(point.x() - RoutedConnectorViewModel.GRID_SIZE);
                            break;
                        case Diagram.PointSide.South:
                            point.y(point.y() + RoutedConnectorViewModel.GRID_SIZE);
                    }
                };
                RoutedConnectorViewModel.prototype._getStartPointSide = function () {
                    if (this.startPoint().connectingPoint()) {
                        return this.startPoint().connectingPoint().side();
                    }
                    if (this.startPoint().location.y() !== this.endPoint().location.y()) {
                        if (this.startPoint().location.y() > this.endPoint().location.y()) {
                            return Diagram.PointSide.North;
                        }
                        else {
                            return Diagram.PointSide.South;
                        }
                    }
                    else {
                        if (this.startPoint().location.x() > this.endPoint().location.x()) {
                            return Diagram.PointSide.West;
                        }
                        else {
                            return Diagram.PointSide.East;
                        }
                    }
                };
                RoutedConnectorViewModel.prototype._getEndPointSide = function () {
                    if (this.endPoint().connectingPoint()) {
                        return this.endPoint().connectingPoint().side();
                    }
                    if (this.startPoint().location.y() !== this.endPoint().location.y()) {
                        if (this.startPoint().location.y() > this.endPoint().location.y()) {
                            return Diagram.PointSide.South;
                        }
                        else {
                            return Diagram.PointSide.North;
                        }
                    }
                    else {
                        if (this.startPoint().location.x() > this.endPoint().location.x()) {
                            return Diagram.PointSide.East;
                        }
                        else {
                            return Diagram.PointSide.West;
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
            }(Diagram.ConnectorViewModel));
            Diagram.RoutedConnectorViewModel = RoutedConnectorViewModel;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
                        return new Diagram.ConnectionPointSurface(control.startPoint(), context);
                    });
                    _this.endPoint = ko.pureComputed(function () {
                        return new Diagram.ConnectionPointSurface(control.endPoint(), context);
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
            }(Diagram.DiagramElementBaseSurface));
            Diagram.RoutedConnectorSurface = RoutedConnectorSurface;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
            }(Diagram.DiagramElementBaseViewModel));
            Diagram.DiagramViewModel = DiagramViewModel;
            Diagram.margins = { propertyName: "margins", modelName: "@Margins", from: Analytics.Margins.fromString, displayName: "Margins" };
            Diagram.pageWidth = { propertyName: "pageWidth", modelName: "@PageWidth", defaultVal: 850, from: Analytics.Utils.floatFromModel, displayName: "Page Width", editor: DevExpress.JS.Widgets.editorTemplates.numeric };
            Diagram.pageHeight = { propertyName: "pageHeight", modelName: "@PageHeight", defaultVal: 1250, from: Analytics.Utils.floatFromModel, displayName: "Page Height", editor: DevExpress.JS.Widgets.editorTemplates.numeric };
            Diagram.diagramSerializationsInfo = [Diagram.name, Diagram.pageWidth, Diagram.pageHeight, Diagram.margins];
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
                    Analytics.Utils.createObservableArrayMapCollection(diagram.controls, _this.controls, _this._createSurface);
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
            }(Analytics.SurfaceElementBase));
            Diagram.DiagramSurface = DiagramSurface;
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
            Diagram.groups = {
                "Appearance": { info: [] },
                "Behavior": { info: [] },
                "Design": { info: [Diagram.name] },
                "Layout": { info: [Diagram.location, Diagram.size, Diagram.pageWidth, Diagram.pageHeight] }
            };
            function createDiagramDesigner(element, diagramSource, localization, rtl) {
                if (localization) {
                    DevExpress.JS.Localization.addCultureInfo({
                        messages: localization
                    });
                }
                Diagram.registerControls();
                var diagram = ko.pureComputed(function () { return new Diagram.DiagramViewModel(diagramSource()); }), surface = ko.pureComputed(function () {
                    var surface = new Diagram.DiagramSurface(diagram());
                    return surface;
                });
                var designerModel = Analytics.Utils.createDesigner(diagram, surface, Diagram.controlsFactory, Diagram.groups, undefined, undefined, rtl);
                designerModel.connectionPointDragHandler = new Diagram.ConnectionPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
                designerModel.connectingPointDragHandler = new Diagram.ConnectingPointDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
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
        })(Diagram = Analytics.Diagram || (Analytics.Diagram = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Diagram;
        (function (Diagram) {
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
var DevExpress;
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Diagram;
        (function (Diagram) {
            var ConnectingPointDragHandler = (function (_super) {
                __extends(ConnectingPointDragHandler, _super);
                function ConnectingPointDragHandler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectingPointDragHandler;
            }(DevExpress.Analytics.Diagram.ConnectingPointDragHandler));
            Diagram.ConnectingPointDragHandler = ConnectingPointDragHandler;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectingPointDragHandler");
            var ConnectionPointDragHandler = (function (_super) {
                __extends(ConnectionPointDragHandler, _super);
                function ConnectionPointDragHandler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectionPointDragHandler;
            }(DevExpress.Analytics.Diagram.ConnectionPointDragHandler));
            Diagram.ConnectionPointDragHandler = ConnectionPointDragHandler;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectionPointDragHandler");
            var ConnectionPointViewModel = (function (_super) {
                __extends(ConnectionPointViewModel, _super);
                function ConnectionPointViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectionPointViewModel;
            }(DevExpress.Analytics.Diagram.ConnectionPointViewModel));
            Diagram.ConnectionPointViewModel = ConnectionPointViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectionPointViewModel");
            var ConnectionPointSurface = (function (_super) {
                __extends(ConnectionPointSurface, _super);
                function ConnectionPointSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectionPointSurface;
            }(DevExpress.Analytics.Diagram.ConnectionPointSurface));
            Diagram.ConnectionPointSurface = ConnectionPointSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectionPointSurface");
            var ConnectorViewModel = (function (_super) {
                __extends(ConnectorViewModel, _super);
                function ConnectorViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectorViewModel;
            }(DevExpress.Analytics.Diagram.ConnectorViewModel));
            Diagram.ConnectorViewModel = ConnectorViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectorViewModel");
            var ConnectorSurface = (function (_super) {
                __extends(ConnectorSurface, _super);
                function ConnectorSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectorSurface;
            }(DevExpress.Analytics.Diagram.ConnectorSurface));
            Diagram.ConnectorSurface = ConnectorSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectorSurface");
            var RoutedConnectorViewModel = (function (_super) {
                __extends(RoutedConnectorViewModel, _super);
                function RoutedConnectorViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RoutedConnectorViewModel;
            }(DevExpress.Analytics.Diagram.RoutedConnectorViewModel));
            Diagram.RoutedConnectorViewModel = RoutedConnectorViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "RoutedConnectorViewModel");
            var RoutedConnectorSurface = (function (_super) {
                __extends(RoutedConnectorSurface, _super);
                function RoutedConnectorSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RoutedConnectorSurface;
            }(DevExpress.Analytics.Diagram.RoutedConnectorSurface));
            Diagram.RoutedConnectorSurface = RoutedConnectorSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "RoutedConnectorSurface");
            ;
            var ConnectingPointViewModel = (function (_super) {
                __extends(ConnectingPointViewModel, _super);
                function ConnectingPointViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectingPointViewModel;
            }(DevExpress.Analytics.Diagram.ConnectingPointViewModel));
            Diagram.ConnectingPointViewModel = ConnectingPointViewModel;
            ;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectingPointViewModel");
            Diagram.connectingPointSerializationInfo = DevExpress.Analytics.Diagram.connectingPointSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "connectingPointSerializationInfo");
            var ConnectingPointSurface = (function (_super) {
                __extends(ConnectingPointSurface, _super);
                function ConnectingPointSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ConnectingPointSurface;
            }(DevExpress.Analytics.Diagram.ConnectingPointSurface));
            Diagram.ConnectingPointSurface = ConnectingPointSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "ConnectingPointSurface");
            var DiagramElementBaseViewModel = (function (_super) {
                __extends(DiagramElementBaseViewModel, _super);
                function DiagramElementBaseViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramElementBaseViewModel;
            }(DevExpress.Analytics.Diagram.DiagramElementBaseViewModel));
            Diagram.DiagramElementBaseViewModel = DiagramElementBaseViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramElementBaseViewModel");
            var DiagramElementViewModel = (function (_super) {
                __extends(DiagramElementViewModel, _super);
                function DiagramElementViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramElementViewModel;
            }(DevExpress.Analytics.Diagram.DiagramElementViewModel));
            Diagram.DiagramElementViewModel = DiagramElementViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramElementViewModel");
            Diagram.diagramElementSerializationInfo = DevExpress.Analytics.Diagram.diagramElementSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "diagramElementSerializationInfo");
            var DiagramElementBaseSurface = (function (_super) {
                __extends(DiagramElementBaseSurface, _super);
                function DiagramElementBaseSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramElementBaseSurface;
            }(DevExpress.Analytics.Diagram.DiagramElementBaseSurface));
            Diagram.DiagramElementBaseSurface = DiagramElementBaseSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramElementBaseSurface");
            var DiagramElementSurface = (function (_super) {
                __extends(DiagramElementSurface, _super);
                function DiagramElementSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramElementSurface;
            }(DevExpress.Analytics.Diagram.DiagramElementSurface));
            Diagram.DiagramElementSurface = DiagramElementSurface;
            ;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramElementSurface");
            var DiagramViewModel = (function (_super) {
                __extends(DiagramViewModel, _super);
                function DiagramViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramViewModel;
            }(DevExpress.Analytics.Diagram.DiagramViewModel));
            Diagram.DiagramViewModel = DiagramViewModel;
            ;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramViewModel");
            Diagram.margins = DevExpress.Analytics.Diagram.margins;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "margins");
            Diagram.pageWidth = DevExpress.Analytics.Diagram.pageWidth;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "pageWidth");
            Diagram.pageHeight = DevExpress.Analytics.Diagram.pageHeight;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "pageHeight");
            Diagram.diagramSerializationsInfo = DevExpress.Analytics.Diagram.diagramSerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "diagramSerializationsInfo");
            var DiagramSurface = (function (_super) {
                __extends(DiagramSurface, _super);
                function DiagramSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DiagramSurface;
            }(DevExpress.Analytics.Diagram.DiagramSurface));
            Diagram.DiagramSurface = DiagramSurface;
            ;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "DiagramSurface");
            Diagram.controlsFactory = DevExpress.Analytics.Diagram.controlsFactory;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "controlsFactory");
            Diagram.registerControls = DevExpress.Analytics.Diagram.registerControls;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "registerControls");
            Diagram.groups = DevExpress.Analytics.Diagram.groups;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "groups");
            Diagram.createDiagramDesigner = DevExpress.Analytics.Diagram.createDiagramDesigner;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "createDiagramDesigner");
            Diagram.name = DevExpress.Analytics.Diagram.name;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "name");
            Diagram.text = DevExpress.Analytics.Diagram.text;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "text");
            Diagram.size = DevExpress.Analytics.Diagram.size;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "size");
            Diagram.location = DevExpress.Analytics.Diagram.location;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "location");
            Diagram.sizeLocation = DevExpress.Analytics.Diagram.sizeLocation;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "sizeLocation");
            Diagram.unknownSerializationsInfo = DevExpress.Analytics.Diagram.unknownSerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "unknownSerializationsInfo");
            Diagram.PointSide = DevExpress.Analytics.Diagram.PointSide;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "PointSide");
            Diagram.determineConnectingPoints = DevExpress.Analytics.Diagram.determineConnectingPoints;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Diagram, DevExpress.Analytics.Diagram, "determineConnectingPoints");
        })(Diagram = Designer.Diagram || (Designer.Diagram = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));

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
    var QueryBuilder;
    (function (QueryBuilder) {
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
                    if (!(newVal instanceof QueryBuilder.Elements.QueryViewModel)) {
                        var group = _this._getGroupByName("SelectedItem");
                        group.collapsed(false);
                    }
                }));
                return _this;
            }
            AccordionTabInfo._getSelectedItemPropertyName = function (model) {
                var text = "Selection Properties";
                var id = "ASPxReportsStringId.ReportDesigner_QueryBuilder_SelectionProperties";
                switch (model && model.controlType) {
                    case "Query":
                        text = "Query Properties";
                        id = "ASPxReportsStringId.ReportDesigner_QueryBuilder_QueryProperties";
                        break;
                    case "Table":
                        text = "Table Properties";
                        id = "ASPxReportsStringId.ReportDesigner_QueryBuilder_TableProperties";
                        break;
                    case "Column":
                        text = "Column Properties";
                        id = "ASPxReportsStringId.ReportDesigner_QueryBuilder_ColumnProperties";
                        break;
                    case "JoinCondition":
                        text = "Relation Properties";
                        id = "ASPxReportsStringId.ReportDesigner_QueryBuilder_RelationProperties";
                        break;
                }
                return DevExpress.Analytics.getLocalization(text, id);
            };
            AccordionTabInfo._createWrappedObject = function (query, commonModel, undoEngine, showParameters) {
                var modelProperties = new DevExpress.Analytics.Widgets.ObjectProperties(query, null, 1);
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
                        addHandler: function () { return new QueryBuilder.Elements.ParameterViewModel({ "@Type": "System.String" }); },
                        collapsed: false,
                        undoEngine: undoEngine,
                        isVisibleButton: function (index, button) { return button === "add" || button === "delete"; },
                        template: "#dxqb-collectioneditor-template",
                        textEmptyArray: { text: "Click the Add button to create a parameter.", localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_PageConfigureParametersEmpty" }
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
                        displayName: function () { return DevExpress.Analytics.getLocalization("Query Properties", "ASPxReportsStringId.ReportDesigner_QueryBuilder_QueryProperties"); }
                    },
                    "SelectedItem": {
                        info: [selectedItemInfo],
                        displayName: function () { return _this._getSelectedItemPropertyName(editableObject()); }
                    },
                    "Fields": {
                        info: [fieldsInfo],
                        displayName: function () { return DevExpress.Analytics.getLocalization("Available tables and views", "ASPxReportsStringId.ReportDesigner_QueryBuilder_AvailableTables"); }
                    }
                };
                if (showParameters)
                    groups["Parameters"] = {
                        info: [parametersInfo],
                        displayName: function () { return DevExpress.Analytics.getLocalization("Parameters", "ASPxReportsStringId.ReportDesigner_QueryBuilder_Parameters"); }
                    };
                return groups;
            };
            AccordionTabInfo._createQBPropertyGrid = function (query, commonModel, undoEngine, showParameters) {
                var object = this._createWrappedObject(query, commonModel, undoEngine, showParameters);
                var grid = new DevExpress.Analytics.Widgets.ControlProperties(ko.observable(object), {
                    groups: this._createGroups(commonModel.editableObject, showParameters),
                    editors: object["getInfo"]()
                }, undefined, false);
                return grid;
            };
            AccordionTabInfo.prototype._getGroupByName = function (name) {
                return this.model.groups.filter(function (x) { return x["_displayName"] === name; })[0];
            };
            return AccordionTabInfo;
        }(DevExpress.Analytics.TabInfo));
        QueryBuilder.AccordionTabInfo = AccordionTabInfo;
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        ko.bindingHandlers['dxQueryBuilder'] = {
            init: function (element, valueAccessor) {
                var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dxrd-querybuilder'), $element = $(element).append(templateHtml);
                var values = ko.unwrap(valueAccessor());
                var options = ko.unwrap(values.options);
                values.designerModel(QueryBuilder.createQueryBuilder($element.children()[0], options.data, options.callbacks, options.localization, options.rtl));
                return { controlsDescendantBindings: true };
            }
        };
        ko.bindingHandlers['dxdTableView'] = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var templateHtml = DevExpress.Analytics.Widgets.Internal.getTemplate('dxd-tableview'), $element = $(element).append(templateHtml), value = ko.unwrap(valueAccessor());
                ko.applyBindings({
                    data: value,
                    rtl: !!bindingContext.$root.rtl,
                    noDataText: DevExpress.Analytics.Localization.noDataText,
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
                return { controlsDescendantBindings: true };
            }
        };
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            Data.dsParameterNameValidationRules = [{
                    type: "custom",
                    validationCallback: function (options) { return DataSourceParameter.validateName(options.value); },
                    message: DevExpress.Analytics.getLocalization('Name is required and should be a valid identifier.', 'ASPxReportsStringId.ReportDesigner_NameIsRequired_Error')
                }];
            Data.parameterValueSerializationsInfo = { propertyName: "value", displayName: "Value", localizationId: "DevExpress.DataAccess.Parameter.Value", editor: Analytics.Widgets.editorTemplates.text };
            var dsParameterName = { propertyName: "name", displayName: "Name", localizationId: "DevExpress.DataAccess.Parameter.Name", validationRules: Data.dsParameterNameValidationRules, editor: Analytics.Widgets.editorTemplates.text };
            var dsParameterType = {
                propertyName: "type", displayName: "Type", localizationId: "DevExpress.DataAccess.Parameter.Type", modelName: "@Type", editor: Analytics.Widgets.editorTemplates.combobox, valuesArray: [
                    { value: "System.String", displayValue: "String", localizationId: "UtilsUIStringId.Parameter_Type_String" },
                    { value: "System.DateTime", displayValue: "Date", localizationId: "UtilsUIStringId.Parameter_Type_DateTime" },
                    { value: "System.Int16", displayValue: "Number (16 bit integer)", localizationId: "UtilsUIStringId.Parameter_Type_Int16" },
                    { value: "System.Int32", displayValue: "Number (32 bit integer)", localizationId: "UtilsUIStringId.Parameter_Type_Int32" },
                    { value: "System.Int64", displayValue: "Number (64 bit integer)", localizationId: "UtilsUIStringId.Parameter_Type_Int64" },
                    { value: "System.Single", displayValue: "Number (floating-point)", localizationId: "UtilsUIStringId.Parameter_Type_Float" },
                    { value: "System.Double", displayValue: "Number (double-precision floating-point)", localizationId: "UtilsUIStringId.Parameter_Type_Double" },
                    { value: "System.Decimal", displayValue: "Number (decimal)", localizationId: "UtilsUIStringId.Parameter_Type_Decimal" },
                    { value: "System.Boolean", displayValue: "Boolean", localizationId: "UtilsUIStringId.Parameter_Type_Boolean" },
                    { value: "System.Guid", displayValue: "Guid", localizationId: "UtilsUIStringId.Parameter_Type_Guid" },
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
                Data.parameterValueSerializationsInfo,
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
            Data.dsParameterSerializationInfo = [dsParameterName, dsParameterType, dsExpressionResultType].concat(baseDSParamterSerializationsInfo);
            function storedProcParameterSerializationsInfo(type) {
                var copyParamType = $.extend(true, {}, dsParameterType);
                var newValuesArray = [];
                newValuesArray.push(dsParameterType.valuesArray.filter(function (item) { return item.value === type; })[0]);
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
            Data.storedProcParameterSerializationsInfo = storedProcParameterSerializationsInfo;
            function integerValueConverter(val) {
                return Analytics.Utils.integerValueConverter(val, this.defaultValue);
            }
            Data.integerValueConverter = integerValueConverter;
            function floatValueConverter(val) {
                return Analytics.Utils.floatValueConverter(val, this.defaultValue);
            }
            Data.floatValueConverter = floatValueConverter;
            function expressionValueConverter(val) {
                if (val instanceof Date) {
                    var prependZero = function (x) { return (x < 10 ? "0" : "") + x; };
                    return Analytics.Utils.formatUnicorn('#{0}/{1}/{2} {3}:{4}#', prependZero(val.getMonth() + 1), prependZero(val.getDate()), val.getFullYear(), prependZero(val.getHours()), prependZero(val.getMinutes()));
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
                        return Data.DBColumn.GetSpecific(this.realTypeName || this.name);
                    },
                    enumerable: true,
                    configurable: true
                });
                return DataSourceParameterTypeValue;
            }());
            var tryParseDate = function (val) {
                var date;
                try {
                    date = Analytics.Localization.parseDate(val);
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
                    if (_serializationsInfo === void 0) { _serializationsInfo = Data.dsParameterSerializationInfo; }
                    var _this = _super.call(this) || this;
                    _this._serializationsInfo = _serializationsInfo;
                    _this._valueInfo = ko.observable(Data.parameterValueSerializationsInfo);
                    _this._parametersFunctions = DevExpress.QueryBuilder.Widgets.expressionFunctions;
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
                    this._valueInfo($.extend({}, Data.parameterValueSerializationsInfo, {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            function deserializeToCollection(model, createItem, collection) {
                var collection = collection || [];
                if (model) {
                    model.forEach(function (value) {
                        collection.push(createItem(value));
                    });
                }
                return collection;
            }
            Data.deserializeToCollection = deserializeToCollection;
            var DBSchema = (function () {
                function DBSchema(model) {
                    var tables = deserializeToCollection(model["Tables"], function (tableModel) { return new Data.DBTable(tableModel); });
                    tables.sort(function (a, b) { return a.name.localeCompare(b.name); });
                    var views = deserializeToCollection(model["Views"], function (tableModel) { return new Data.DBTable(tableModel); });
                    views.sort(function (a, b) { return a.name.localeCompare(b.name); });
                    this.tables = tables.concat(views);
                    this.procedures = deserializeToCollection(model["StoredProcedures"], function (procModel) { return new Data.DBStoredProcedure(procModel); });
                }
                return DBSchema;
            }());
            Data.DBSchema = DBSchema;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            function getDBSchemaCallback(requestWrapper, connection, table) {
                var deferred = $.Deferred();
                requestWrapper.getDbSchema(connection, table)
                    .done(function (data) {
                    deferred.resolve(new Data.DBSchema(JSON.parse(data.dbSchemaJSON)));
                })
                    .fail(function (data) {
                    Analytics.Utils.ShowMessage(Analytics.Utils.formatUnicorn(Analytics.getLocalization('Schema loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), Analytics.Utils.getErrorMessage(data)));
                    deferred.reject();
                });
                return deferred;
            }
            Data.getDBSchemaCallback = getDBSchemaCallback;
            function getDBStoredProceduresCallback(requestWrapper, connection) {
                var deferred = $.Deferred();
                requestWrapper.getDbStoredProcedures(connection)
                    .done(function (data) {
                    deferred.resolve(new Data.DBSchema(JSON.parse(data.dbSchemaJSON)).procedures);
                })
                    .fail(function (data) {
                    Analytics.Utils.ShowMessage(Analytics.Utils.formatUnicorn(Analytics.getLocalization('Stored procedures loading failed. {0}', 'DxDesignerStringId.Error_SchemaLoadingFailed'), Analytics.Utils.getErrorMessage(data)));
                    deferred.reject();
                });
                return deferred;
            }
            Data.getDBStoredProceduresCallback = getDBStoredProceduresCallback;
            var DBSchemaProvider = (function (_super) {
                __extends(DBSchemaProvider, _super);
                function DBSchemaProvider(connection, _requestWrapper) {
                    if (_requestWrapper === void 0) { _requestWrapper = new DevExpress.QueryBuilder.Utils.RequestWrapper(); }
                    var _this = _super.call(this) || this;
                    _this._requestWrapper = _requestWrapper;
                    _this._tables = {};
                    _this.connection = connection;
                    _this._disposables.push(_this.connection.name.subscribe(function () {
                        _this._tables = {};
                        _this._dbSchema = null;
                        _this._dbStoredProceduresSchema = null;
                    }));
                    _this.getItems = function (pathRequest) {
                        var result = $.Deferred();
                        if (!pathRequest.fullPath) {
                            _this.getDbSchema().done(function (dbSchema) {
                                result.resolve($.map(dbSchema.tables, function (item) {
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
                            result.resolve([]);
                        }
                        return result.promise();
                    };
                    return _this;
                }
                DBSchemaProvider.prototype._getDBSchema = function (table) {
                    return this._getDBSchemaCallback(this.connection, table);
                };
                DBSchemaProvider.prototype._getDBSchemaCallback = function (connection, table) {
                    return getDBSchemaCallback(this._requestWrapper, connection, table);
                };
                DBSchemaProvider.prototype._getDBStoredProcedures = function (connection) {
                    return getDBStoredProceduresCallback(this._requestWrapper, connection);
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
                            var table = Analytics.Utils.findFirstItemMatchesCondition(dbSchema.tables, function (table) { return table.name === tableName; });
                            if (!table) {
                                deferred.reject();
                                Analytics.isCustomizedWithUpdateLocalizationMethod("The schema does not contain the specified table: ") ?
                                    Analytics.getLocalization("The schema does not contain the specified table: ") + "'" + tableName + "'." :
                                    Analytics.Utils.formatUnicorn(Analytics.getLocalization("The schema does not contain the specified table: \"{0}\".", "DataAccessStringId.TableNotInSchemaValidationException"), tableName);
                            }
                            else if (table.columns.length > 0) {
                                deferred.resolve(table);
                            }
                            else {
                                _this._getDBSchema(table).done(function (dbSchema) {
                                    table.columns = dbSchema.tables[0].columns;
                                    deferred.resolve(table);
                                }).fail(function () { return deferred.reject(); });
                            }
                        }).fail(function () { return deferred.reject(); });
                    }
                    return this._tables[tableName];
                };
                return DBSchemaProvider;
            }(Analytics.Utils.Disposable));
            Data.DBSchemaProvider = DBSchemaProvider;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var DBStoredProcedure = (function () {
                function DBStoredProcedure(model) {
                    this.name = model["Name"];
                    this.arguments = Data.deserializeToCollection(model["arguments"], function (argModel) { return new DBStoredProcedureArgument(argModel); });
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var DBTable = (function () {
                function DBTable(model) {
                    this.name = model["Name"];
                    this.isView = model["IsView"] === "true" || model["IsView"] === true;
                    this.columns = Data.deserializeToCollection(model["columns"], function (columnModel) { return new Data.DBColumn(columnModel); });
                    this.foreignKeys = Data.deserializeToCollection(model["foreignKeys"], function (columnModel) { return new Data.DBForeignKey(columnModel); });
                }
                return DBTable;
            }());
            Data.DBTable = DBTable;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var resultSetSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "tables", modelName: "Views", array: true }
            ];
            var ResultSet = (function () {
                function ResultSet(model, serializer) {
                    serializer = serializer || new DevExpress.Analytics.Utils.ModelSerializer();
                    serializer.deserialize(this, model);
                    this.tables = DevExpress.Analytics.Utils.deserializeArray(model["Views"], function (item) {
                        return new Data.ResultTable(item, serializer);
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            Data.customQuerySerializationsInfo = [
                { propertyName: "type", modelName: "@Type" },
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "sqlString", modelName: "Sql", defaultVal: "" },
                { propertyName: "parameters", modelName: "Parameters", array: true },
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
            var CustomSqlQuery = (function () {
                function CustomSqlQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new DevExpress.Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Data.Utils.SqlQueryType.customSqlQuery; });
                    this.parameters = DevExpress.Analytics.Utils.deserializeArray(model["Parameters"], function (item) {
                        return new Data.DataSourceParameter(item, serializer);
                    });
                }
                CustomSqlQuery.prototype.getInfo = function () {
                    return Data.customQuerySerializationsInfo;
                };
                CustomSqlQuery.prototype.generateName = function () {
                    return "CustomSqlQuery";
                };
                return CustomSqlQuery;
            }());
            Data.CustomSqlQuery = CustomSqlQuery;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            Data.masterDetailRelationSerializationsInfo = [
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
            var MasterDetailRelation = (function () {
                function MasterDetailRelation(model, serializer) {
                    var _this = this;
                    this.name = ko.pureComputed({
                        read: function () {
                            return _this._customName() || _this.masterQuery() + _this.detailQuery();
                        },
                        write: function (value) {
                            _this._customName(value);
                        },
                        deferEvaluation: true
                    });
                    (serializer || new DevExpress.Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Relation" }));
                }
                MasterDetailRelation.prototype.createKeyColumn = function () {
                    var newKeyColumn = {
                        masterColumn: ko.observable(),
                        detailColumn: ko.observable(),
                        itemType: "KeyColumn"
                    };
                    this.keyColumns.push(newKeyColumn);
                };
                MasterDetailRelation.prototype.getInfo = function () {
                    return Data.masterDetailRelationSerializationsInfo;
                };
                return MasterDetailRelation;
            }());
            Data.MasterDetailRelation = MasterDetailRelation;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
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
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var sqlDataSourceSerializationInfo = [
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "connection", modelName: "Connection", from: Data.SqlDataConnection.from, toJsonObject: Data.SqlDataConnection.toJson },
                { propertyName: "queries", modelName: "Queries", array: true },
                { propertyName: "relations", modelName: "Relations", array: true },
                { propertyName: "resultSet", modelName: "ResultSchema", from: Data.ResultSet.from, toJsonObject: Data.ResultSet.toJson },
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
            var SqlDataSource = (function (_super) {
                __extends(SqlDataSource, _super);
                function SqlDataSource(model, serializer, requestWrapper) {
                    if (requestWrapper === void 0) { requestWrapper = new DevExpress.QueryBuilder.Utils.RequestWrapper(); }
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
                        if (item["@Type"] === Data.Utils.SqlQueryType.customSqlQuery) {
                            return new Data.CustomSqlQuery(item, _this, serializer);
                        }
                        else if (item["@Type"] === Data.Utils.SqlQueryType.tableQuery) {
                            return new Data.TableQuery(item, _this, serializer);
                        }
                        else if (item["@Type"] === Data.Utils.SqlQueryType.storedProcQuery) {
                            return new Data.StoredProcQuery(item, _this, serializer);
                        }
                        else {
                            throw new Error("Unknown sql query type.");
                        }
                    });
                    _this.relations = DevExpress.Analytics.Utils.deserializeArray(model["Relations"], function (item) {
                        return new Data.MasterDetailRelation(item, serializer);
                    });
                    if (_this.connection && model["ConnectionOptions"])
                        _this.connection.options = new Data.ConnectionOptions(model["ConnectionOptions"], serializer);
                    _this.dbSchemaProvider = new Data.DBSchemaProvider(_this.connection, requestWrapper);
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
                return SqlDataSource;
            }(Analytics.Utils.Disposable));
            Data.SqlDataSource = SqlDataSource;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            Data.storedProcQuerySerializationsInfo = [
                { propertyName: "type", modelName: "@Type" },
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "procName", modelName: "ProcName" },
                { propertyName: "parameters", modelName: "Parameters", array: true },
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
            var StoredProcQuery = (function () {
                function StoredProcQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Data.Utils.SqlQueryType.storedProcQuery; });
                    this.parameters = Analytics.Utils.deserializeArray(model["Parameters"], function (item) {
                        var parameterValueType = item["@Type"];
                        if (parameterValueType === "DevExpress.DataAccess.Expression")
                            parameterValueType = item["@ResultType"] || parameterValueType;
                        return new Data.DataSourceParameter(item, serializer, Data.storedProcParameterSerializationsInfo(parameterValueType));
                    });
                }
                StoredProcQuery.prototype.getInfo = function () {
                    return Data.storedProcQuerySerializationsInfo;
                };
                StoredProcQuery.prototype.generateName = function () {
                    return this.procName() || "Query";
                };
                return StoredProcQuery;
            }());
            Data.StoredProcQuery = StoredProcQuery;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            Data.tableQuerySerializationsInfo = [
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
            var TableQuery = (function () {
                function TableQuery(model, parent, serializer) {
                    this.parent = parent;
                    (serializer || new Analytics.Utils.ModelSerializer()).deserialize(this, $.extend(model, { "@ItemType": "Query" }));
                    this.type = ko.pureComputed(function () { return Data.Utils.SqlQueryType.tableQuery; });
                    this.parameters = Analytics.Utils.deserializeArray(model["Parameters"], function (item) { return new Data.DataSourceParameter(item, serializer); });
                }
                TableQuery.prototype.tables = function () {
                    return this["_tablesObject"]["tables"]();
                };
                TableQuery.prototype.getInfo = function () {
                    return Data.tableQuerySerializationsInfo;
                };
                TableQuery.prototype.generateName = function () {
                    return this.tables().length > 0 ? (this.tables()[0].alias() || this.tables()[0].name()) : "SelectQuery";
                };
                return TableQuery;
            }());
            Data.TableQuery = TableQuery;
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Data;
        (function (Data) {
            var Utils;
            (function (Utils) {
                Utils.SqlQueryType = {
                    customSqlQuery: "CustomSqlQuery",
                    tableQuery: "SelectQuery",
                    storedProcQuery: "StoredProcQuery"
                };
                function generateQueryUniqueName(queries, query) {
                    var name = (query.name() || query.generateName()).replace('.', '_');
                    return Analytics.Utils.findFirstItemMatchesCondition(queries, function (item) { return item.name() === name; }) ?
                        Analytics.Internal.getUniqueNameForNamedObjectsArray(queries, name + "_") : name;
                }
                Utils.generateQueryUniqueName = generateQueryUniqueName;
            })(Utils = Data.Utils || (Data.Utils = {}));
        })(Data = Analytics.Data || (Analytics.Data = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Internal;
        (function (Internal) {
            var ColumnDragHandler = (function (_super) {
                __extends(ColumnDragHandler, _super);
                function ColumnDragHandler(querySurface, selection, undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, querySurface, selection, undoEngine, snapHelper) || this;
                    _this.querySurface = querySurface;
                    _this.undoEngine = undoEngine;
                    _this._dragColumn = ko.observable(null);
                    _this._dragConditionSurface = null;
                    _this.dragDropConnector = ko.observable(null);
                    _this.cursor = 'arrow';
                    _this.containment = '.dxrd-ghost-container';
                    _this["helper"] = function (draggable) {
                        dragHelperContent.update(draggable);
                    };
                    return _this;
                }
                ColumnDragHandler.prototype._needToCreateRelation = function () {
                    if (!(this.selection.dropTarget && this.selection.dropTarget instanceof QueryBuilder.Elements.ColumnSurface))
                        return false;
                    var table = this.selection.dropTarget.getControlModel().parentModel();
                    return table !== this.getDragColumn().parentModel();
                };
                ColumnDragHandler.prototype.startDrag = function (control) {
                    if (control instanceof DevExpress.Analytics.Diagram.ConnectionPointSurface) {
                        var condition = control.getControlModel().parentModel();
                        this._dragConditionSurface = DevExpress.Analytics.Internal.findSurface(condition);
                        if (!this._dragConditionSurface)
                            return;
                        this._dragConditionSurface.isVisible(false);
                        this._dragColumn((condition.startPoint() === control.getControlModel()) ? condition.nestedColumn() : condition.parentColumn());
                    }
                    else if (!(control instanceof QueryBuilder.Elements.ColumnSurface)) {
                        throw new Error("ColumnDragHandler can be applied to the Column only.");
                    }
                    else {
                        this._dragColumn(control.getControlModel());
                    }
                    var connectorModel = new DevExpress.Analytics.Diagram.RoutedConnectorViewModel({}, this.querySurface().getControlModel());
                    this.dragDropConnector(new DevExpress.Analytics.Diagram.RoutedConnectorSurface(connectorModel, this.surface()));
                };
                ColumnDragHandler.prototype.setConnectorPoints = function (cursorPosition) {
                    var startColumn = this._dragColumn(), connectorModel = this.dragDropConnector().getControlModel();
                    if (this._needToCreateRelation()) {
                        var points = DevExpress.Analytics.Diagram.determineConnectingPoints(startColumn, this.selection.dropTarget.getControlModel());
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
                                this.selection.initialize(DevExpress.Analytics.Internal.findSurface(condition));
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
            }(DevExpress.Analytics.Internal.DragDropHandler));
            Internal.ColumnDragHandler = ColumnDragHandler;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Internal;
        (function (Internal) {
            var DbObjectDragDropHandler = (function (_super) {
                __extends(DbObjectDragDropHandler, _super);
                function DbObjectDragDropHandler(surface, selection, _undoEngine, snapHelper, dragHelperContent) {
                    var _this = _super.call(this, surface, selection, _undoEngine, snapHelper) || this;
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
                        _this.recalculateSize(DevExpress.Analytics.Size.fromString("199, 123"));
                        dragHelperContent.setContent(new DevExpress.Analytics.Rectangle(0, 0, _this._size.width(), _this._size.height()));
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
                    var controlSurface = DevExpress.Analytics.Internal.findSurface(control);
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
            }(DevExpress.Analytics.Internal.DragDropHandler));
            Internal.DbObjectDragDropHandler = DbObjectDragDropHandler;
        })(Internal = QueryBuilder.Internal || (QueryBuilder.Internal = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
            }(DevExpress.Analytics.Widgets.Editor));
            Widgets.UndoEditor = UndoEditor;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            Widgets.editorTemplates = {
                bool: { header: "dx-boolean-select", custom: "dxqb-property-editor" },
                combobox: { header: "dx-combobox", custom: "dxqb-property-editor" },
                comboboxUndo: { header: "dx-combobox-undo", custom: "dxqb-property-editor", editorType: Widgets.UndoEditor },
                text: { header: "dx-text", custom: "dxqb-property-editor" },
                filterEditor: { header: "dxrd-filterstring", custom: "dxqb-property-editor" },
                filterGroupEditor: { header: "dxrd-filterstringgroup", custom: "dxqb-property-editor" },
                numeric: { header: "dx-numeric", custom: "dxqb-property-editor" }
            };
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        QueryBuilder.name = { propertyName: "name", modelName: "@Name", displayName: "Name", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Name", disabled: true, editor: QueryBuilder.Widgets.editorTemplates.text };
        QueryBuilder.alias = { propertyName: "alias", modelName: "@Alias", displayName: "Alias", localizationId: "DataAccessUIStringId.QueryBuilderColumns_Alias", defaultVal: "", editor: QueryBuilder.Widgets.editorTemplates.text };
        QueryBuilder.text = { propertyName: "text", modelName: "@Text", displayName: "Text", editor: QueryBuilder.Widgets.editorTemplates.text };
        QueryBuilder.selected = { propertyName: "selected", displayName: "Output", editor: QueryBuilder.Widgets.editorTemplates.bool, localizationId: "DataAccessUIStringId.QueryBuilderColumns_Output" };
        QueryBuilder.size = { propertyName: "size", modelName: "@Size", defaultVal: "100,125", from: DevExpress.Analytics.Size.fromString };
        QueryBuilder.location = { propertyName: "location", modelName: "@Location", from: DevExpress.Analytics.Point.fromString };
        QueryBuilder.sizeLocation = [QueryBuilder.size, QueryBuilder.location];
        QueryBuilder.unknownSerializationsInfo = [QueryBuilder.name].concat(QueryBuilder.sizeLocation);
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
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
            }(DevExpress.Analytics.ElementViewModel));
            Elements.QueryElementBaseViewModel = QueryElementBaseViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.allColumnsSerializationInfo = [QueryBuilder.name, QueryBuilder.selected];
            var AllColumnsViewModel = (function (_super) {
                __extends(AllColumnsViewModel, _super);
                function AllColumnsViewModel(parent, serializer) {
                    var _this = _super.call(this, { "@ControlType": "Column" }, parent, serializer) || this;
                    var query = parent.parentModel();
                    var targetColumn = ko.pureComputed(function () {
                        return DevExpress.Analytics.Utils.findFirstItemMatchesCondition(query.columns(), function (item) {
                            return parent.actualName() === item.table() && Elements.ColumnType.AllColumns === item.itemType();
                        });
                    });
                    _this.selected = ko.pureComputed({
                        read: function () { return !!targetColumn(); },
                        write: function (value) {
                            if (!!targetColumn() === value)
                                return;
                            if (value) {
                                query.columns.push(new Elements.ColumnExpression({ "@ItemType": Elements.ColumnType.AllColumns, "@Table": parent.actualName() }, query, serializer));
                            }
                            else {
                                query.columns.remove(function (item) { return parent.actualName() === item.table() && Elements.ColumnType.AllColumns === item.itemType(); });
                            }
                        }
                    });
                    var name = DevExpress.Analytics.getLocalization("(All Columns)", "DataAccessStringId.QueryBuilder_AllColumns");
                    _this.name = ko.pureComputed(function () { return (name.charAt(0) === "*" ? name : "* " + name); });
                    return _this;
                }
                AllColumnsViewModel.prototype.getInfo = function () {
                    return Elements.allColumnsSerializationInfo;
                };
                return AllColumnsViewModel;
            }(Elements.QueryElementBaseViewModel));
            Elements.AllColumnsViewModel = AllColumnsViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
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
                        return _this.underCursor().isOver && !DevExpress.Analytics.Internal.DragDropHandler.started();
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
            }(DevExpress.Analytics.SurfaceElementBase));
            Elements.AllColumnsSurface = AllColumnsSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.AggregationType = {
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
            Elements.columnSerializationInfo = [
                QueryBuilder.name,
                { propertyName: "displayType", displayName: "Type", localizationId: "DataAccessUIStringId.ParametersColumn_Type", disabled: true, editor: QueryBuilder.Widgets.editorTemplates.text },
                { propertyName: "alias", displayName: "Alias", localizationId: "DataAccessUIStringId.QueryBuilderColumns_Alias", editor: QueryBuilder.Widgets.editorTemplates.text },
                QueryBuilder.selected,
                {
                    propertyName: "sortingType",
                    displayName: "Sort Type",
                    editor: QueryBuilder.Widgets.editorTemplates.combobox,
                    defaultVal: "Unsorted",
                    valuesArray: [
                        { value: "Unsorted", displayValue: "Unsorted", localizationId: "DataAccessUIStringId.SortingTypeNone" },
                        { value: "Ascending", displayValue: "Ascending", localizationId: "DataAccessUIStringId.SortingTypeAscending" },
                        { value: "Descending", displayValue: "Descending", localizationId: "DataAccessUIStringId.SortingTypeDescending" }
                    ],
                    localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_SortType"
                },
                { propertyName: "sortOrder", displayName: "Sort Order", editor: QueryBuilder.Widgets.editorTemplates.numeric, localizationId: "DataAccessUIStringId.QueryBuilderColumns_SortOrder" },
                { propertyName: "groupBy", displayName: "Group By", editor: QueryBuilder.Widgets.editorTemplates.bool, defaultVal: false, localizationId: "DataAccessUIStringId.QueryBuilderColumns_GroupBy" },
                {
                    propertyName: "aggregate",
                    displayName: "Aggregate",
                    editor: QueryBuilder.Widgets.editorTemplates.comboboxUndo,
                    values: Elements.AggregationType,
                    defaultVal: Elements.AggregationType.None,
                    localizationId: "DataAccessUIStringId.QueryBuilderColumns_Aggregate"
                }
            ];
            var ColumnViewModel = (function (_super) {
                __extends(ColumnViewModel, _super);
                function ColumnViewModel(model, dbColumn, parent, serializer) {
                    var _this = _super.call(this, $.extend({ "@ControlType": "Column" }, model), parent, serializer) || this;
                    _this.displayType = ko.pureComputed(function () {
                        return DevExpress.Data.DBColumnType[dbColumn.type] + (dbColumn.size ? '(' + dbColumn.size + ')' : "");
                    });
                    _this.dataType = ko.pureComputed(function () {
                        return DevExpress.Data.DBColumn.GetType(dbColumn.type);
                    });
                    _this.actualName = ko.pureComputed(function () {
                        return _this.alias() || _this.name();
                    });
                    var points = parent.getColumnConnectionPoints(_this);
                    _this.rightConnectionPoint = {
                        side: ko.observable(DevExpress.Analytics.Diagram.PointSide.East),
                        location: points.right
                    };
                    _this.leftConnectionPoint = {
                        side: ko.observable(DevExpress.Analytics.Diagram.PointSide.West),
                        location: points.left
                    };
                    var query = parent.parentModel();
                    var targetColumn = ko.pureComputed(function () { return QueryBuilder.Utils.ColumnExpressionCollectionHelper.find(query.columns, parent.actualName(), _this.name()); });
                    _this.aggregate = ko.pureComputed({
                        read: function () { return targetColumn() ? targetColumn().aggregate() : Elements.AggregationType.None; },
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
                    var orderByItem = ko.pureComputed(function () { return QueryBuilder.Utils.ColumnExpressionCollectionHelper.find(query.sorting, parent.actualName(), _this.name()); });
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
                                    QueryBuilder.Utils.ColumnExpressionCollectionHelper.addNew(query, query.sorting, parent.actualName(), _this.name())
                                        .descending(newValue === "Descending");
                                }
                            }
                            else if (orderByItem()) {
                                QueryBuilder.Utils.ColumnExpressionCollectionHelper.remove(query.sorting, parent.actualName(), _this.name());
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
                    var groupByItem = ko.computed(function () { return QueryBuilder.Utils.ColumnExpressionCollectionHelper.find(query.grouping, parent.actualName(), _this.name()); });
                    _this.aggregate.subscribe(function (value) {
                        var parentTable = _this.parentModel();
                        if (value !== Elements.AggregationType.None) {
                            _this.groupBy(false);
                            if (!_this.alias() || _this._isAliasAutoGenerated(parentTable.actualName())) {
                                var aggregateAlias = _this.name() + '_' + value;
                                _this.alias(QueryBuilder.Utils.ColumnExpressionCollectionHelper.setUniqueAlias(query.columns, aggregateAlias));
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
                                QueryBuilder.Utils.ColumnExpressionCollectionHelper.addNew(query, query.grouping, parent.actualName(), _this.name());
                                _this.aggregate(Elements.AggregationType.None);
                            }
                            else {
                                QueryBuilder.Utils.ColumnExpressionCollectionHelper.remove(query.grouping, parent.actualName(), _this.name());
                            }
                        }
                    });
                    _this.selected = ko.pureComputed({
                        read: function () { return !!targetColumn(); },
                        write: function (value) {
                            if (!!targetColumn() === value)
                                return;
                            if (value) {
                                QueryBuilder.Utils.ColumnExpressionCollectionHelper.addNew(query, query.columns, parent.actualName(), _this.name());
                            }
                            else {
                                QueryBuilder.Utils.ColumnExpressionCollectionHelper.remove(query.columns, parent.actualName(), _this.name());
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
                    return Object.keys(Elements.AggregationType).indexOf(funcName) > 0;
                };
                ColumnViewModel.prototype.getInfo = function () {
                    return Elements.columnSerializationInfo;
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
                        return DevExpress.Data.DBColumn.GetSpecific(this.dataType());
                    },
                    enumerable: true,
                    configurable: true
                });
                return ColumnViewModel;
            }(Elements.QueryElementBaseViewModel));
            Elements.ColumnViewModel = ColumnViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.ColumnType = {
                RecordsCount: "RecordsCount",
                Column: "Column",
                Expression: "Expression",
                AllColumns: "AllColumns"
            };
            Elements.columnExpressionSerializationsInfo = [
                { propertyName: "expression", modelName: "#text" },
                { propertyName: "table", modelName: "@Table" },
                { propertyName: "column", modelName: "@Name" },
                { propertyName: "aggregate", modelName: "@Aggregate", defaultVal: Elements.AggregationType.None },
                { propertyName: "alias", modelName: "@Alias" },
                { propertyName: "descending", modelName: "@Descending", defaultVal: false },
                { propertyName: "itemType", modelName: "@ItemType" }
            ];
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
                            this._criteria = DevExpress.Analytics.Criteria.CriteriaOperator.parse(this.expression());
                            DevExpress.Analytics.Criteria.Utils.criteriaForEach(this._criteria, function (operand) {
                                if (operand instanceof DevExpress.Analytics.Criteria.OperandProperty) {
                                    var dependedTable = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(query.tables(), function (table) { return operand.propertyName.indexOf(table.actualName() + ".") === 0; });
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
                    return Elements.columnExpressionSerializationsInfo;
                };
                ColumnExpression.prototype.isDepended = function (tableActualName) {
                    return !!DevExpress.Analytics.Utils.findFirstItemMatchesCondition(this._dependedTables, function (depended) { return depended.actualName() === tableActualName; });
                };
                return ColumnExpression;
            }());
            Elements.ColumnExpression = ColumnExpression;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
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
                    _this.isAggregate = ko.pureComputed(function () { return QueryBuilder.Widgets.isAggregatedExpression(_this.getControlModel()); });
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
                                return _this.underCursor().isOver && (!DevExpress.Analytics.Internal.DragDropHandler.started() || isCurrentTableNotParentForDraggedColumn);
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
            }(DevExpress.Analytics.SurfaceElementBase));
            Elements.ColumnSurface = ColumnSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.ConditionType = {
                Equal: "Equal",
                NotEqual: "NotEqual",
                Greater: "Greater",
                GreaterOrEqual: "GreaterOrEqual",
                Less: "Less",
                LessOrEqual: "LessOrEqual"
            };
            Elements.joinConditionSerializationInfo = [
                { propertyName: "left", displayName: "Left", editor: QueryBuilder.Widgets.editorTemplates.text, disabled: true, localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_LeftOperand" },
                { propertyName: "right", displayName: "Right", editor: QueryBuilder.Widgets.editorTemplates.text, disabled: true, localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_RightOperand" },
                { propertyName: "parentColumnName", modelName: "@Parent" },
                { propertyName: "nestedColumnName", modelName: "@Nested" },
                {
                    propertyName: "joinType",
                    displayName: "Join Type",
                    editor: QueryBuilder.Widgets.editorTemplates.combobox,
                    defaultVal: "Inner",
                    valuesArray: [
                        { value: "Inner", displayValue: "Inner join", localizationId: "DataAccessStringId.RelationEditorRelationTypeInnerJoin" },
                        { value: "LeftOuter", displayValue: "Left outer join", localizationId: "DataAccessStringId.RelationEditorRelationTypeLeftOuterJoin" }
                    ],
                    localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_JoinType"
                },
                {
                    propertyName: "operator",
                    modelName: "@Operator",
                    displayName: "Operator",
                    editor: QueryBuilder.Widgets.editorTemplates.combobox,
                    defaultVal: Elements.ConditionType.Equal,
                    valuesArray: [
                        { value: "Equal", displayValue: "Equals to", localizationId: "DataAccessUIStringId.JoinEditorEqualOperator" },
                        { value: "NotEqual", displayValue: "Does not equal to", localizationId: "DataAccessUIStringId.JoinEditorNotEqualOperator" },
                        { value: "Greater", displayValue: "Is greater than", localizationId: "DataAccessUIStringId.JoinEditorGreaterOperator" },
                        { value: "GreaterOrEqual", displayValue: "Is greater than or equal to", localizationId: "DataAccessUIStringId.JoinEditorGreaterOrEqualOperator" },
                        { value: "Less", displayValue: "Is less than", localizationId: "DataAccessUIStringId.JoinEditorLessOperator" },
                        { value: "LessOrEqual", displayValue: "Is less than or equal to", localizationId: "DataAccessUIStringId.JoinEditorLessOrEqualOperator" }
                    ],
                    localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_Operator"
                },
                { propertyName: "itemType", modelName: "@itemType" }
            ];
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
                            var result = DevExpress.Analytics.Diagram.determineConnectingPoints(_this.parentColumn(), _this.nestedColumn());
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
            }(DevExpress.Analytics.Diagram.RoutedConnectorViewModel));
            Elements.JoinConditionViewModel = JoinConditionViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
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
            }(DevExpress.Analytics.Diagram.RoutedConnectorSurface));
            Elements.JoinConditionSurface = JoinConditionSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.ParametersMode = {
                ReadWrite: "ReadWrite",
                Read: "Read",
                Disabled: "Disabled"
            };
            var ParameterViewModel = (function (_super) {
                __extends(ParameterViewModel, _super);
                function ParameterViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ParameterViewModel.prototype.getEditorType = function (type) {
                    if (type === "DevExpress.DataAccess.Expression")
                        return { header: "dxqb-expressionstring" };
                    return DevExpress.Analytics.Internal.getEditorType(type);
                };
                return ParameterViewModel;
            }(DevExpress.Analytics.Data.DataSourceParameter));
            Elements.ParameterViewModel = ParameterViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
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
            }(DevExpress.Analytics.SurfaceElementBase));
            Elements.QueryElementBaseSurface = QueryElementBaseSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            var QueryViewModel = (function (_super) {
                __extends(QueryViewModel, _super);
                function QueryViewModel(querySource, dbSchemaProvider, parametersMode, serializer) {
                    if (parametersMode === void 0) { parametersMode = Elements.ParametersMode.ReadWrite; }
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
                    _this.tables = DevExpress.Analytics.Utils.deserializeArray(querySource["Tables"]["SelectedTables"], function (item) { return new Elements.TableViewModel(item, _this, serializer); });
                    _this.columns = DevExpress.Analytics.Utils.deserializeArray(querySource["Columns"], function (item) { return new Elements.ColumnExpression(item, _this, serializer); });
                    _this.sorting = DevExpress.Analytics.Utils.deserializeArray(querySource["Sorting"], function (item) { return new Elements.ColumnExpression(item, _this, serializer); });
                    _this.grouping = DevExpress.Analytics.Utils.deserializeArray(querySource["Grouping"], function (item) { return new Elements.ColumnExpression(item, _this, serializer); });
                    _this.tables().forEach(function (table) { _this._initializeTable(table); });
                    _this.relations = DevExpress.Analytics.Utils.deserializeArray(querySource["Tables"]["Relations"], function (item) { return new Elements.RelationViewModel(item, _this, serializer); });
                    _this["_tablesObject"]["tables"] = _this.tables;
                    _this["_tablesObject"]["relations"] = _this.relations;
                    _this.tables().reduce(function (posX, tableModel) {
                        tableModel.location.x(posX);
                        tableModel.location.y(65);
                        return posX + tableModel.size.width() + tableModel.size.width() / 2;
                    }, 30);
                    var parameters = DevExpress.Analytics.Utils.deserializeArray(querySource["Parameters"], function (item) { return new Elements.ParameterViewModel(item, serializer); });
                    if (parametersMode === Elements.ParametersMode.ReadWrite) {
                        _this.parameters = parameters;
                        _this._disposables.push(_this.parameters.subscribe(function (changes) {
                            changes.forEach(function (change) {
                                if (change.status === "added" && !change.value.name())
                                    change.value.name(DevExpress.Analytics.Internal.getUniqueName(_this.parameters().filter(function (x) { return x !== change.value; }).map(function (x) { return x.name(); }), "parameter"));
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
                    _this.filterString = new QueryBuilder.Widgets.QBFilterStringOptions(_this._filterString, null, ko.pureComputed(function () { return (_this.tables().length === 0) && (_this.filterString && _this.filterString.value().length === 0); }));
                    _this.filterString.initializeFilterStringHelper(_this.parameters, parametersMode);
                    var inProcess = false;
                    _this._disposables.push(ko.computed(function () {
                        if (!inProcess) {
                            inProcess = true;
                            var allColumns = _this.getAllColumns();
                            var withoutAggregate = allColumns.filter(function (x) { return x.aggregate() === Elements.AggregationType.None; });
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
                    _this.groupFilterString = new QueryBuilder.Widgets.QBFilterStringOptions(_this._groupFilterString, null, ko.pureComputed(function () { return !_this.columns().some(QueryBuilder.Widgets.isAggregatedExpression) && (_this.groupFilterString && (_this.groupFilterString.value() || '').length === 0); }));
                    _this.groupFilterString.initializeFilterStringHelper(_this.parameters, parametersMode, new QueryBuilder.Widgets.GroupFilterEditorSerializer(_this.columns));
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
                    _this.margins = DevExpress.Analytics.Margins.fromString();
                    _this.isValid = ko.pureComputed(function () { return _this._validate(); });
                    var isAllColumnsAllTablesExpression = function (column) { return !column.table() && column.itemType() === Elements.ColumnType.AllColumns; };
                    _this.allColumnsInTablesSelected = ko.computed({
                        read: function () { return _this.columns().some(isAllColumnsAllTablesExpression); },
                        write: function (value) {
                            if (value) {
                                _this.columns.push(new Elements.ColumnExpression({ "@ItemType": "AllColumns" }, _this, serializer));
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
                    return Elements.querySerializationsInfo;
                };
                QueryViewModel.prototype.createChild = function (info) {
                    if (info["@ControlType"] !== "Table") {
                        return _super.prototype.createChild.call(this, info);
                    }
                    var table = new Elements.TableViewModel(info, this);
                    this._initializeTable(table);
                    this.addChild(table);
                    return table;
                };
                QueryViewModel.prototype.getAllColumns = function () {
                    return [].concat.apply([], this.tables().map(function (x) { return x.columns(); }));
                };
                QueryViewModel.prototype.tryToCreateRelationsByFK = function (sourceTable) {
                    var _this = this;
                    if (QueryBuilder.isJoinsResolvingDisabled)
                        return;
                    this.dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                        var dbSourceTable = dbSchema.tables.filter(function (item) { return item.name === sourceTable.name(); })[0];
                        if (dbSourceTable) {
                            dbSourceTable.foreignKeys.forEach(function (fk) {
                                var pkTable = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(_this.tables.peek(), "name", fk.primaryKeyTable);
                                if (pkTable) {
                                    var column1 = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(sourceTable.columns(), "name", fk.column);
                                    var column2 = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(pkTable.columns(), "name", fk.primaryKeyColumn);
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
                                        var column1 = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(sourceTable.columns(), "name", fk.primaryKeyColumn);
                                        var column2 = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(table.columns(), "name", fk.column);
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
                    if (control instanceof Elements.RelationViewModel) {
                        if (this.relations.indexOf(control) > -1)
                            return;
                        control.parentModel(this);
                        this.relations.push(control);
                    }
                    else if (control instanceof Elements.TableViewModel) {
                        if (this.tables.indexOf(control) > -1)
                            return;
                        control.parentModel(this);
                        if (DevExpress.Analytics.Utils.getFirstItemByPropertyValue(this.tables(), "actualName", control.name()) !== null) {
                            control.alias(DevExpress.Analytics.Internal.getUniqueName(this.tables().map(function (table) { return table.actualName(); }), control.name() + '_'));
                        }
                        this.tables.push(control);
                    }
                    else {
                        DevExpress.Analytics.Utils.NotifyAboutWarning("Attempt to add wrong child control.");
                    }
                };
                QueryViewModel.prototype.removeChild = function (control) {
                    if (control instanceof Elements.RelationViewModel) {
                        if (this.relations().length < 1)
                            return;
                        var relation = control;
                        var indexRelation = this.relations().indexOf(relation);
                        while (relation.conditions().length > 0)
                            relation.conditions.pop();
                        this.relations.splice(indexRelation, 1);
                    }
                    else if (control instanceof Elements.TableViewModel) {
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
                        DevExpress.Analytics.Utils.NotifyAboutWarning("Attempt to remove wrong child control.");
                    }
                };
                QueryViewModel.prototype.getTable = function (name) {
                    return DevExpress.Analytics.Utils.findFirstItemMatchesCondition(this.tables(), function (item) { return item.actualName() === name; });
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
                    var relation = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(this.relations(), function (relation) {
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
                    var joinCondition = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(relation.conditions(), function (condition) {
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
            }(Elements.QueryElementBaseViewModel));
            Elements.QueryViewModel = QueryViewModel;
            Elements.querySerializationsInfo = [
                {
                    propertyName: "_tablesObject", modelName: "Tables", info: [
                        { propertyName: "tables", modelName: "SelectedTables", array: true },
                        { propertyName: "relations", modelName: "Relations", array: true }
                    ]
                },
                { propertyName: "parameters", modelName: "Parameters", array: true },
                { propertyName: "type", modelName: "@Type" },
                { propertyName: "name", modelName: "@Name" },
                { propertyName: "editableName", displayName: "Name", localizationId: "DevExpress.DataAccess.Sql.SqlQuery.Name", editor: QueryBuilder.Widgets.editorTemplates.text },
                { propertyName: "_filterString", modelName: "Filter", defaultVal: "" },
                { propertyName: "filterString", defaultVal: "", displayName: "Filter", localizationId: "DataAccessUIStringId.FiltersView_Filter", editor: QueryBuilder.Widgets.editorTemplates.filterEditor },
                { propertyName: "_groupFilterString", modelName: "GroupFilter", defaultVal: "" },
                { propertyName: "groupFilterString", defaultVal: "", displayName: "Group Filter", localizationId: "DataAccessUIStringId.FiltersView_GroupFilter", editor: QueryBuilder.Widgets.editorTemplates.filterGroupEditor },
                { propertyName: "columns", modelName: "Columns", array: true },
                { propertyName: "sorting", modelName: "Sorting", array: true },
                { propertyName: "grouping", modelName: "Grouping", array: true },
                { propertyName: "itemType", modelName: "@ItemType" },
                { propertyName: "allColumnsInTablesSelected", displayName: "Select All (*)", localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_SelectAll", editor: QueryBuilder.Widgets.editorTemplates.bool },
                { propertyName: "top", modelName: "@Top", displayName: "Select Top", defaultVal: 0, from: DevExpress.Analytics.Utils.floatFromModel, localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_SelectTop", editor: QueryBuilder.Widgets.editorTemplates.numeric, editorOptions: { format: "#0", min: 0 } },
                { propertyName: "skip", modelName: "@Skip", displayName: "Offset", defaultVal: 0, from: DevExpress.Analytics.Utils.floatFromModel, localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_Offset", editor: QueryBuilder.Widgets.editorTemplates.numeric, editorOptions: { format: "#0", min: 0 } },
                { propertyName: "distinct", modelName: "@Distinct", defaultVal: false, from: DevExpress.Analytics.Utils.parseBool, displayName: "Select distinct", localizationId: "ASPxReportsStringId.ReportDesigner_QueryBuilder_SelectDistinct", editor: QueryBuilder.Widgets.editorTemplates.bool }
            ];
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            var QuerySurface = (function (_super) {
                __extends(QuerySurface, _super);
                function QuerySurface(query, zoom) {
                    if (zoom === void 0) { zoom = ko.observable(1); }
                    var _this = _super.call(this, query, {
                        measureUnit: ko.observable("Pixels"),
                        zoom: zoom,
                        dpi: ko.observable(100)
                    }, QuerySurface._unitProperties) || this;
                    _this.placeholder = function () { return DevExpress.Analytics.getLocalization('Drop a table or view here to create a query.', 'ASPxReportsStringId.QueryBuilder_SurfacePlaceholder'); };
                    _this.tables = ko.observableArray();
                    _this.relations = ko.observableArray();
                    _this.allowMultiselect = false;
                    _this.focused = ko.observable(false);
                    _this.selected = ko.observable(false);
                    _this.underCursor = ko.observable(new DevExpress.Analytics.Internal.HoverInfo());
                    _this.templateName = "dx-query-surface";
                    _this.rtl = ko.observable(false);
                    _this.measureUnit = _this._context.measureUnit;
                    _this.dpi = _this._context.dpi;
                    _this._context = _this;
                    _this.margins = { bottom: _this["_bottom"], left: _this["_left"], right: _this["_right"], top: _this["_top"] };
                    _this.zoom = zoom;
                    DevExpress.Analytics.Utils.createObservableArrayMapCollection(query.tables, _this.tables, _this._createSurface);
                    DevExpress.Analytics.Utils.createObservableArrayMapCollection(query.relations, _this.relations, _this._createSurface);
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
            }(DevExpress.Analytics.SurfaceElementBase));
            Elements.QuerySurface = QuerySurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.relationSerializationInfo = [
                { propertyName: "joinType", modelName: "@Type" },
                { propertyName: "parentTableName", modelName: "@Parent" },
                { propertyName: "nestedTableName", modelName: "@Nested" },
                { propertyName: "conditions", modelName: "KeyColumns", defaultVal: [], array: true },
                { propertyName: "itemType", modelName: "@itemType" }
            ];
            var RelationViewModel = (function (_super) {
                __extends(RelationViewModel, _super);
                function RelationViewModel(model, query, serializer) {
                    var _this = _super.call(this, $.extend(model, { "@ControlType": "Relation", "@ItemType": "Relation" }), query, serializer) || this;
                    _this.parentTable = ko.observable(query.getTable(_this.parentTableName.peek()));
                    _this.nestedTable = ko.observable(query.getTable(_this.nestedTableName.peek()));
                    _this.parentTableName = ko.pureComputed(function () { return _this.parentTable().actualName(); });
                    _this.nestedTableName = ko.pureComputed(function () { return _this.nestedTable().actualName(); });
                    _this.conditions = DevExpress.Analytics.Utils.deserializeArray(model["KeyColumns"], function (item) {
                        return new Elements.JoinConditionViewModel(item, _this, serializer);
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
                    return Elements.relationSerializationInfo;
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
            }(Elements.QueryElementBaseViewModel));
            Elements.RelationViewModel = RelationViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            var RelationSurface = (function (_super) {
                __extends(RelationSurface, _super);
                function RelationSurface(control, context) {
                    var _this = _super.call(this, control, context, null) || this;
                    _this.conditions = ko.observableArray();
                    _this.template = "dxqb-relation";
                    DevExpress.Analytics.Utils.createObservableArrayMapCollection(control.conditions, _this.conditions, _this._createSurface);
                    return _this;
                }
                RelationSurface.prototype._getChildrenHolderName = function () {
                    return "conditions";
                };
                return RelationSurface;
            }(DevExpress.Analytics.SurfaceElementBase));
            Elements.RelationSurface = RelationSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
            Elements.tableSerializationInfo = [
                QueryBuilder.name, QueryBuilder.alias, { propertyName: "itemType", modelName: "@ItemType" }
            ];
            var TableViewModel = (function (_super) {
                __extends(TableViewModel, _super);
                function TableViewModel(model, parent, serializer) {
                    var _this = _super.call(this, $.extend(model, { "@ControlType": "Table", "@ItemType": "Table" }), parent, serializer) || this;
                    _this.serializer = serializer;
                    _this._columnsConnectionPointLeftX = ko.pureComputed(function () { return _this.location.x(); });
                    _this._columnsConnectionPointRightX = ko.pureComputed(function () { return _this.location.x() + _this.size.width(); });
                    _this._columns = ko.observableArray();
                    _this._initialized = ko.observable(false);
                    _this.size = new DevExpress.Analytics.Size(199, 123);
                    _this.location = new DevExpress.Analytics.Point(0, 0);
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
                    _this.asterisk = new Elements.AllColumnsViewModel(_this, _this.serializer);
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
                    return Elements.tableSerializationInfo;
                };
                TableViewModel.prototype.getColumn = function (name) {
                    return DevExpress.Analytics.Utils.getFirstItemByPropertyValue(this._columns(), "name", name);
                };
                TableViewModel.prototype.createColumns = function (dbTable) {
                    var _this = this;
                    var columns = [];
                    dbTable.columns.forEach(function (item) {
                        columns.push(new Elements.ColumnViewModel({ "@Name": item.name }, item, _this, _this.serializer));
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
            }(Elements.QueryElementBaseViewModel));
            Elements.TableViewModel = TableViewModel;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Elements;
        (function (Elements) {
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
                        return control.columns().map(function (columnVewModel) { return new Elements.ColumnSurface(columnVewModel, context); });
                    });
                    _this.asterisk = new Elements.AllColumnsSurface(control.asterisk, context);
                    return _this;
                }
                TableSurface.prototype.resizable = function (resizeHandler, element) {
                    return $.extend({}, resizeHandler, {
                        handles: 'e, w',
                        $selectedNodes: $(element),
                        minWidth: Elements.TableViewModel.TABLE_MIN_WIDTH,
                    });
                };
                return TableSurface;
            }(Elements.QueryElementBaseSurface));
            Elements.TableSurface = TableSurface;
        })(Elements = QueryBuilder.Elements || (QueryBuilder.Elements = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
            Widgets.createDefaultSQLAceOptions = createDefaultSQLAceOptions;
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
            Widgets.createDefaultSQLAdditionalOptions = createDefaultSQLAdditionalOptions;
            function createDefaultSQLLanguageHelper() {
                return {
                    getLanguageMode: function () { return "ace/mode/sql"; },
                    createCompleters: function () { return []; }
                };
            }
            Widgets.createDefaultSQLLanguageHelper = createDefaultSQLLanguageHelper;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        QueryBuilder.ActionId = {
            Save: "dxqb-save",
            DataPreview: "dxqb-data-preview",
            SelectStatementPreview: "dxqb-select-statement-preview"
        };
        var QueryBuilderElements = {
            Surface: "dxrd-surface-template-base",
            Toolbar: "dxqb-toolbar",
            RightPanel: "dx-right-panel-lightweight",
            DataPreview: "dxqb-popup#data",
            SqlPreview: "dxqb-popup#sql"
        };
        QueryBuilder.HandlerUri = "DXQB.axd";
        function customizeDesignerActions(designerModel, nextCustomizer) {
            var query = designerModel.model;
            return (function (actions) {
                var del = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Delete"; });
                del.imageClassName = "dx-icon-dxrd-image-recycle-bin";
                del.imageTemplateName = "dxrd-svg-operations-recycle_bin";
                var undo = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Undo"; });
                undo.disabled = ko.pureComputed(function () { return designerModel.isLoading() || !designerModel.undoEngine().undoEnabled(); });
                var redo = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Redo"; });
                actions.splice(0, actions.length, del, undo, redo);
                actions.push({
                    id: QueryBuilder.ActionId.Save,
                    text: "Save",
                    displayText: function () { return DevExpress.Analytics.getLocalization("Save", "ASPxReportsStringId.ReportDesigner_MenuButtons_Save"); },
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
                    id: QueryBuilder.ActionId.DataPreview,
                    text: "Preview Results",
                    displayText: function () { return DevExpress.Analytics.getLocalization("Preview Results", "DataAccessUIStringId.QueryBuilderButtons_PreviewResults"); },
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
                    id: QueryBuilder.ActionId.SelectStatementPreview,
                    text: "Preview Select Statement",
                    displayText: function () { return DevExpress.Analytics.getLocalization("Preview Select Statement", "ASPxReportsStringId.ReportDesigner_QueryBuilder_PreviewSelectStatement_Tooltip"); },
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
                var rightAreaWidth = $root.find(".dxrd-right-panel").outerWidth();
                var surfaceWidth = $root.width() - (rightAreaWidth + 5);
                $root.find(".dxrd-surface-wrapper").css(surface().rtl() ?
                    { "left": rightAreaWidth, "right": 0, "width": surfaceWidth } :
                    { "left": 0, "right": rightAreaWidth, "width": surfaceWidth });
                surfaceSize(surfaceWidth);
                surface().pageWidth(surfaceWidth);
            };
        }
        QueryBuilder.updateQueryBuilderSurfaceContentSize = updateQueryBuilderSurfaceContentSize;
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
        QueryBuilder.createIsLoadingFlag = createIsLoadingFlag;
        QueryBuilder.isJoinsResolvingDisabled = false;
        function createQueryBuilder(element, data, callbacks, localization, rtl) {
            if (rtl === void 0) { rtl = false; }
            if (localization) {
                DevExpress.Analytics.Localization.addCultureInfo({
                    messages: localization
                });
            }
            var wrapper = data.requestWrapper || new QueryBuilder.Utils.RequestWrapper();
            DevExpress.config({ rtlEnabled: !!rtl });
            QueryBuilder.Utils.registerControls();
            var parametersMode = data.parametersMode || QueryBuilder.Elements.ParametersMode.ReadWrite;
            callbacks && callbacks.onServerError && DevExpress.Analytics.Internal.processErrorEvent(callbacks.onServerError);
            callbacks && callbacks.customizeLocalization && callbacks.customizeLocalization();
            var query = ko.observable(), surface = ko.observable(), treeListOptions = ko.observable();
            query.subscribe(function (newValue) {
                surface(new QueryBuilder.Elements.QuerySurface(newValue));
                surface().rtl(rtl);
            });
            var initQuery = function (querySource) {
                query(new QueryBuilder.Elements.QueryViewModel(querySource, data.dbSchemaProvider(), parametersMode));
            };
            initQuery(data.querySource());
            var selection = new DevExpress.Analytics.Internal.SurfaceSelection(["alias", "name", "sortOrder"]);
            var designerModel = DevExpress.Analytics.Utils.createDesigner(query, surface, QueryBuilder.Utils.controlsFactory, undefined, undefined, undefined, rtl, selection);
            designerModel.rootStyle = "dxqb-designer dxd-back-primary2";
            var previewPopupContainer = DevExpress.Analytics.Utils.getParentContainer;
            designerModel.dataPreview = {
                isLoading: ko.observable(false),
                isVisible: ko.observable(false),
                title: function () { return DevExpress.Analytics.getLocalization("Data Preview (First 100 Rows Displayed)", "ASPxReportsStringId.ReportDesigner_DataPreview_Title"); },
                template: "dxqb-data-preview",
                data: {
                    value: ko.observable()
                },
                okButtonText: function () { return DevExpress.Analytics.getLocalization('OK', 'PivotGridStringId.FilterOk'); },
                okButtonHandler: function (e) {
                    e.model.isVisible(false);
                },
                container: previewPopupContainer
            };
            designerModel.selectStatmentPreview = {
                isLoading: ko.observable(false),
                isVisible: ko.observable(false),
                template: "dxqb-selectstatment-preview",
                title: function () { return DevExpress.Analytics.getLocalization("Select Statement Preview", "ASPxReportsStringId.ReportDesigner_QueryBuilder_SelectStatementPreview_Title"); },
                data: {
                    value: ko.observable(),
                    aceOptions: DevExpress.QueryBuilder.Widgets.createDefaultSQLAceOptions(true),
                    aceAvailable: DevExpress.Analytics.Widgets.aceAvailable,
                    additionalOptions: DevExpress.QueryBuilder.Widgets.createDefaultSQLAdditionalOptions(function (newVal) { designerModel.selectStatmentPreview.data.value(newVal); }),
                    languageHelper: DevExpress.QueryBuilder.Widgets.createDefaultSQLLanguageHelper()
                },
                okButtonText: function () { return DevExpress.Analytics.getLocalization('OK', 'PivotGridStringId.FilterOk'); },
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
            designerModel.columnDragHandler = new QueryBuilder.Internal.ColumnDragHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
            designerModel.connectionPointDragHandler = designerModel.columnDragHandler;
            designerModel.resizeHandler["handles"] = "e, w";
            designerModel.columnsLoadingMsg = function () { return DevExpress.Analytics.getLocalization("Loading...", "DataAccessWebStringId.QueryBuilder_ColumnsLoading"); };
            var searchName = ko.observable("");
            designerModel.searchName = searchName;
            var init = function (querySource) {
                initQuery(querySource);
                treeListOptions({
                    itemsProvider: data.dbSchemaProvider(),
                    treeListController: new QueryBuilder.Utils.QueryBuilderTreeListController(designerModel.undoEngine, query, searchName),
                    selectedPath: ko.observable(),
                    templateName: "dxqb-treelist-item-with-search"
                });
            };
            data.querySource.subscribe(function (newValue) {
                init(newValue);
            });
            init(data.querySource());
            var tablesTop = ko.observable(355), itemPropertiesTabInfoModel = {
                editableObject: designerModel.editableObject,
                properties: new DevExpress.Analytics.Widgets.ObjectProperties(designerModel.editableObject, null, 1),
                fieldListModel: { treeListOptions: treeListOptions },
                searchName: searchName,
                tablesTop: tablesTop,
                searchPlaceholder: function () { return DevExpress.Analytics.getLocalization("Enter text to search...", "ASPxReportsStringId.ReportDesigner_QueryBuilder_SearchBox_EmptyText"); }
            };
            var tabPanelItem = new QueryBuilder.AccordionTabInfo(query, itemPropertiesTabInfoModel, designerModel.undoEngine, selection.focused, parametersMode === QueryBuilder.Elements.ParametersMode.ReadWrite);
            var tabPanel = designerModel.tabPanel;
            tabPanel.tabs.length = 0;
            tabPanel.tabs.push(tabPanelItem);
            tabPanel.width(375);
            designerModel.fieldDragHandler = new QueryBuilder.Internal.DbObjectDragDropHandler(surface, designerModel.selection, designerModel.undoEngine, designerModel.snapHelper, designerModel.dragHelperContent);
            designerModel.fieldListProvider = new QueryBuilder.Widgets.QueryBuilderObjectsProvider(query, QueryBuilder.Widgets.QueryBuilderObjectsProvider.whereClauseObjectsFilter);
            designerModel.dataBindingsProvider = designerModel.fieldListProvider;
            designerModel.parametersBindingsProvider = data.parametersItemsProvider || designerModel.dataBindingsProvider;
            designerModel.dataBindingsGroupProvider = new QueryBuilder.Widgets.QueryBuilderObjectsProvider(query, QueryBuilder.Widgets.QueryBuilderObjectsProvider.groupByObjectsFilter);
            designerModel.isLoading = createIsLoadingFlag(designerModel.model, data.dbSchemaProvider);
            designerModel.actionLists = new DevExpress.Analytics.Internal.ActionLists(surface, designerModel.selection, designerModel.undoEngine, customizeDesignerActions(designerModel, callbacks && callbacks.customizeActions));
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
            DevExpress.Designer.appendStaticContextToRootViewModel(designerModel);
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
                    DevExpress.Analytics.Utils.ShowMessage(DevExpress.Analytics.Utils.getErrorMessage(data));
                });
            };
            designerModel.showStatement = function () {
                designerModel.selectStatmentPreview.isLoading(true);
                designerModel.selectStatmentPreview.isVisible(true);
                wrapper.getSelectStatement(data.dbSchemaProvider().connection, JSON.stringify(query().serialize(true))).done(function (data) {
                    designerModel.selectStatmentPreview.data.value(data["sqlSelectStatement"]);
                    designerModel.selectStatmentPreview.isLoading(false);
                }).fail(function (data) {
                    designerModel.selectStatmentPreview.isVisible(false);
                    DevExpress.Analytics.Utils.ShowMessage(DevExpress.Analytics.Utils.getErrorMessage(data));
                });
            };
            return designerModel;
        }
        QueryBuilder.createQueryBuilder = createQueryBuilder;
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Utils;
        (function (Utils) {
            var ColumnExpressionCollectionHelper = (function () {
                function ColumnExpressionCollectionHelper() {
                }
                ColumnExpressionCollectionHelper.find = function (collection, tableName, columnName) {
                    return DevExpress.Analytics.Utils.findFirstItemMatchesCondition(collection(), function (item) { return item.column() === columnName && item.table() === tableName; });
                };
                ColumnExpressionCollectionHelper.findByName = function (collection, actualName) {
                    return DevExpress.Analytics.Utils.findFirstItemMatchesCondition(collection(), function (item) { return item.actualName() === actualName; });
                };
                ColumnExpressionCollectionHelper.removeDependend = function (collection, tableName) {
                    collection.remove(function (item) { return item.isDepended(tableName); });
                };
                ColumnExpressionCollectionHelper.setUniqueAlias = function (collection, alias) {
                    if (ColumnExpressionCollectionHelper.findByName(collection, alias)) {
                        return DevExpress.Analytics.Internal.getUniqueName(collection().map(function (item) { return item.actualName(); }), alias + "_");
                    }
                    return alias;
                };
                ColumnExpressionCollectionHelper.addNew = function (query, collection, table, column) {
                    var newItem = new QueryBuilder.Elements.ColumnExpression({ "@Table": table, "@Name": column, "@ItemType": "Column" }, query);
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
            Utils.ColumnExpressionCollectionHelper = ColumnExpressionCollectionHelper;
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Utils;
        (function (Utils) {
            Utils.controlsFactory = new DevExpress.Analytics.Utils.ControlsFactory();
            function registerControls() {
                DevExpress.Analytics.Diagram.registerControls();
                QueryBuilder.Utils.controlsFactory.registerControl("Unknown", {
                    info: QueryBuilder.unknownSerializationsInfo,
                    type: DevExpress.Analytics.ElementViewModel,
                    nonToolboxItem: true,
                    surfaceType: DevExpress.Analytics.SurfaceElementBase,
                    isDeleteDeny: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Relation", {
                    info: QueryBuilder.Elements.relationSerializationInfo,
                    defaultVal: {},
                    surfaceType: QueryBuilder.Elements.RelationSurface,
                    popularProperties: [],
                    type: QueryBuilder.Elements.RelationViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("JoinCondition", {
                    info: QueryBuilder.Elements.joinConditionSerializationInfo,
                    defaultVal: {},
                    surfaceType: QueryBuilder.Elements.JoinConditionSurface,
                    popularProperties: ["_parentColumnName", "_nestedColumnName", "joinType"],
                    type: QueryBuilder.Elements.JoinConditionViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Table", {
                    info: QueryBuilder.Elements.tableSerializationInfo,
                    defaultVal: {},
                    surfaceType: QueryBuilder.Elements.TableSurface,
                    popularProperties: ["name", "alias", "columns"],
                    type: QueryBuilder.Elements.TableViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Column", {
                    info: QueryBuilder.Elements.columnSerializationInfo,
                    defaultVal: {},
                    surfaceType: QueryBuilder.Elements.ColumnSurface,
                    popularProperties: ["name", "alias", "selected"],
                    type: QueryBuilder.Elements.ColumnViewModel,
                    elementActionsTypes: [],
                    nonToolboxItem: true,
                    isDeleteDeny: true
                });
                QueryBuilder.Utils.controlsFactory.registerControl("Query", {
                    info: QueryBuilder.Elements.querySerializationsInfo,
                    surfaceType: QueryBuilder.Elements.QuerySurface,
                    popularProperties: ["name", "filterString", "groupFilterString"],
                    type: QueryBuilder.Elements.QueryViewModel,
                    elementActionsTypes: [],
                    isContainer: true,
                    nonToolboxItem: true,
                    isDeleteDeny: true
                });
            }
            Utils.registerControls = registerControls;
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Utils;
        (function (Utils) {
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
                    var spanProtect = $("<span>"), spanSearch = $("<span>").addClass('dx-datagrid-search-text');
                    _this.searchName = searchName;
                    _this.itemsFilter = function (item) {
                        return !searchName() || !!DevExpress.Analytics.Utils.findMatchesInString(item.displayName, searchName());
                    };
                    return _this;
                }
                return QueryBuilderTreeListController;
            }(DevExpress.Analytics.Widgets.TreeListController));
            Utils.QueryBuilderTreeListController = QueryBuilderTreeListController;
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Utils;
        (function (Utils) {
            function wrapGetSelectStatement(callback) {
                return function (connection, queryJSON) {
                    if (callback)
                        return callback(connection, queryJSON);
                    return new RequestWrapper().getSelectStatement(connection, queryJSON);
                };
            }
            Utils.wrapGetSelectStatement = wrapGetSelectStatement;
            function wrapRebuildResultSchema(callback) {
                return function (dataSource, queryName, relationsEditing) {
                    if (callback)
                        return callback(dataSource, queryName, relationsEditing);
                    return new RequestWrapper().rebuildResultSchema(dataSource, queryName, relationsEditing);
                };
            }
            Utils.wrapRebuildResultSchema = wrapRebuildResultSchema;
            var RequestWrapper = (function () {
                function RequestWrapper() {
                }
                RequestWrapper.prototype.sendRequest = function (action, arg) {
                    return DevExpress.Analytics.Utils.ajax(QueryBuilder.HandlerUri, action, arg);
                };
                ;
                RequestWrapper.prototype.getDbSchema = function (connection, table) {
                    var serializer = new DevExpress.Analytics.Utils.ModelSerializer();
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection),
                        tableName: table && table.name,
                        isView: table && table.isView
                    });
                    return this.sendRequest("getDBSchema", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getDbStoredProcedures = function (connection) {
                    var serializer = new DevExpress.Analytics.Utils.ModelSerializer();
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection)
                    });
                    return this.sendRequest("getDBStoredProcedures", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getSelectStatement = function (connection, queryJSON) {
                    var serializer = new DevExpress.Analytics.Utils.ModelSerializer();
                    var requestJson = JSON.stringify({
                        connectionJSON: this.getConnectionJSON(connection),
                        sqlQueryJSON: queryJSON
                    });
                    return this.sendRequest("getSelectStatement", encodeURIComponent(requestJson));
                };
                RequestWrapper.prototype.getDataPreview = function (connection, queryJSON) {
                    var serializer = new DevExpress.Analytics.Utils.ModelSerializer();
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
                return RequestWrapper;
            }());
            Utils.RequestWrapper = RequestWrapper;
        })(Utils = QueryBuilder.Utils || (QueryBuilder.Utils = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
                    return DevExpress.Analytics.Utils.find(this._columns(), function (c) { return Widgets.isAggregatedExpression(c) && predicate(c); });
                };
                GroupFilterEditorSerializer.prototype.serializeOperandProperty = function (operand) {
                    var _this = this;
                    var column = this._findAggregatedColumn(function (c) { return operand.propertyName === _this._columnDisplayName(c); });
                    return "[" + (column ? column.actualName() : operand.propertyName) + "]";
                };
                GroupFilterEditorSerializer.prototype.deserialize = function (stringCriteria) {
                    var _this = this;
                    var operand = DevExpress.Analytics.Criteria.CriteriaOperator.parse(stringCriteria);
                    if (operand) {
                        DevExpress.Analytics.Criteria.Utils.criteriaForEach(operand, function (operator) {
                            if (operator instanceof DevExpress.Analytics.Criteria.OperandProperty) {
                                operator["propertyName"] = _this._aggregatePropertyName(operator);
                            }
                        });
                    }
                    return _super.prototype.deserializeOperand.call(this, operand);
                };
                return GroupFilterEditorSerializer;
            }(DevExpress.Analytics.Widgets.Internal.FilterEditorSerializer));
            Widgets.GroupFilterEditorSerializer = GroupFilterEditorSerializer;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
                        var parameter = new DevExpress.Data.DataSourceParameter({ "@Name": name, "@Type": dataType });
                        this.helper.newParameters.push(parameter);
                    }
                };
                OperandParameterQBSurface.prototype.isDefaultTextDisplayed = function () {
                    return this.parameterName() === OperandParameterQBSurface.defaultDisplay();
                };
                OperandParameterQBSurface.defaultDisplay = function () { return DevExpress.Analytics.getLocalization("Create new parameter", "ASPxReportsStringId.FilterEditor_Operand_CreateNewParameter"); };
                return OperandParameterQBSurface;
            }(DevExpress.Analytics.Widgets.OperandParameterSurface));
            Widgets.OperandParameterQBSurface = OperandParameterQBSurface;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
            }(DevExpress.Analytics.Widgets.OperandPropertySurface));
            Widgets.OperandPropertyQBSurface = OperandPropertyQBSurface;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            function isAggregatedExpression(object) {
                return object.aggregate() !== QueryBuilder.Elements.AggregationType.None;
            }
            Widgets.isAggregatedExpression = isAggregatedExpression;
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
                            var table = DevExpress.Analytics.Utils.findFirstItemMatchesCondition(query().tables(), function (table) { return table.actualName() === pathRequest.fullPath; });
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
                            var table = DevExpress.Analytics.Utils.find(query().tables(), function (t) { return propertyName.indexOf(t.actualName() + ".") === 0; });
                            if (table) {
                                var column = DevExpress.Analytics.Utils.find(objectFilter.filterColumns(table.columns() || []), function (c) { return propertyName === (table.actualName() + "." + objectFilter.getColumnName(c)); });
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
                            case QueryBuilder.Elements.AggregationType.Avg:
                            case QueryBuilder.Elements.AggregationType.AvgDistinct:
                                return "Float";
                            case QueryBuilder.Elements.AggregationType.Count:
                            case QueryBuilder.Elements.AggregationType.CountDistinct:
                                return "Integer";
                            default:
                                return column.specifics;
                        }
                    },
                    getDataType: function (column) { return null; }
                };
                return QueryBuilderObjectsProvider;
            }());
            Widgets.QueryBuilderObjectsProvider = QueryBuilderObjectsProvider;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            var KeyColumnSurface = (function () {
                function KeyColumnSurface(column, queryName) {
                    var _this = this;
                    this.isSelected = ko.observable(false);
                    this.selectColumnText = function () { return DevExpress.Analytics.getLocalization("DataAccessUIStringId.JoinEditorEmptyColumnText", "<Select a Column>"); };
                    this.column = column;
                    this.queryName = queryName;
                    this.setColumn = function (resultColumn) {
                        _this.column(resultColumn.name());
                    };
                }
                return KeyColumnSurface;
            }());
            Widgets.KeyColumnSurface = KeyColumnSurface;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
                            DevExpress.Analytics.Utils.ShowMessage(DevExpress.Analytics.getLocalization("Some fields are empty. Please fill all empty fields or remove the corresponding conditions to proceed.", "DataAccessUIStringId.JoinEditorFillAllFieldsException"));
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
                            data: new Widgets.MasterDetailEditorPopupManager(target, _this.popupService, "create", popupItems),
                            templateName: "dx-filtereditor-create"
                        };
                    };
                    this.setColumn = function (target) {
                        var table = DevExpress.Analytics.Utils.getFirstItemByPropertyValue(resultSet.tables(), "tableName", target.queryName);
                        return {
                            data: new Widgets.MasterDetailEditorPopupManager(target, _this.popupService, "setColumn", table ? table.columns() : []),
                            templateName: "dx-masterdetail-editor-setColumn"
                        };
                    };
                    this._createMainPopupButtons();
                    var masterQueries = {};
                    resultSet.tables().forEach(function (table) {
                        masterQueries[table.tableName()] = new Widgets.MasterQuerySurface(table.tableName(), relations);
                    });
                    relations().forEach(function (relation) {
                        masterQueries[relation.masterQuery()] = masterQueries[relation.masterQuery()] || new Widgets.MasterQuerySurface(relation.masterQuery(), relations);
                        masterQueries[relation.masterQuery()].add(relation);
                    });
                    this.masterQueries($.map(masterQueries, function (value) { return value; }));
                }
                MasterDetailEditor.prototype._createMainPopupButtons = function () {
                    var self = this;
                    this.buttonItems = [
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('Save', DevExpress.Analytics.StringId.DataAccessBtnOK), onClick: function () { self.save(); } } },
                        { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: DevExpress.Analytics.getLocalization('Cancel', DevExpress.Analytics.StringId.DataAccessBtnCancel), onClick: function () { self.popupVisible(false); } } }
                    ];
                };
                MasterDetailEditor.prototype.title = function () {
                    return DevExpress.Analytics.getLocalization('Master-Detail Relation Editor', DevExpress.Analytics.StringId.MasterDetailRelationsEditor);
                };
                return MasterDetailEditor;
            }());
            Widgets.MasterDetailEditor = MasterDetailEditor;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            var MasterDetailEditorPopupManager = (function () {
                function MasterDetailEditorPopupManager(target, popupService, action, popupItems) {
                    var _this = this;
                    this.showPopup = function (args) {
                        if (_this._popupService["subscription"]) {
                            _this._popupService["subscription"].dispose();
                        }
                        _this._popupService.title("");
                        _this._updateActions(_this.target);
                        _this._popupService.target(args.element);
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
            Widgets.MasterDetailEditorPopupManager = MasterDetailEditorPopupManager;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            var MasterDetailRelationSurface = (function () {
                function MasterDetailRelationSurface(relation, parent) {
                    var _this = this;
                    this.isEditable = ko.observable(false);
                    this.relationName = relation.name;
                    this.keyColumns = ko.pureComputed(function () {
                        return relation.keyColumns().map(function (item) {
                            return {
                                master: new Widgets.KeyColumnSurface(item.masterColumn, relation.masterQuery()),
                                detail: new Widgets.KeyColumnSurface(item.detailColumn, relation.detailQuery())
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
            Widgets.MasterDetailRelationSurface = MasterDetailRelationSurface;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            var MasterQuerySurface = (function () {
                function MasterQuerySurface(masterQueryName, relations) {
                    var _this = this;
                    this.relations = ko.observableArray();
                    this.queryName = masterQueryName;
                    this.add = function (relation) {
                        _this.relations.push(new Widgets.MasterDetailRelationSurface(relation, _this));
                    };
                    this.create = function (detailQueryItem) {
                        var newRelation = new DevExpress.Analytics.Data.MasterDetailRelation({ "@Master": _this.queryName, "@Detail": detailQueryItem.name });
                        if (DevExpress.Analytics.Utils.getFirstItemByPropertyValue(_this.relations(), "relationName", newRelation.name())) {
                            newRelation.name(DevExpress.Analytics.Internal.getUniqueName(_this.relations().map(function (item) { return item.relationName(); }), newRelation.name() + '_'));
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
            Widgets.MasterQuerySurface = MasterQuerySurface;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var WizardPage = (function () {
                function WizardPage(wizard, template, title, description) {
                    var _this = this;
                    this.template = template;
                    this.title = title;
                    this.description = description;
                    this.wizard = wizard;
                    this.isVisible = true;
                    this.actionCancel = new Wizard.WizardAction(function () { _this.wizard.cancel(); }, Analytics.getLocalization("Cancel", "ASPxReportsStringId.SearchDialog_Cancel"));
                    this.actionPrevious = new Wizard.WizardAction(function () { _this.wizard.goToPrevious(); }, Analytics.getLocalization("Previous", "ASPxReportsStringId.ReportDesigner_Wizard_Previous"));
                    this.actionNext = new Wizard.WizardAction(function () { _this.wizard.goToNext(); }, Analytics.getLocalization("Next", "ASPxReportsStringId.ReportDesigner_Wizard_Next"));
                    this.actionFinish = new Wizard.WizardAction(function () { _this.wizard.finish(); }, Analytics.getLocalization("Finish", "ASPxReportsStringId.ReportDesigner_Wizard_Finish"));
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
            Wizard.WizardPage = WizardPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var MasterDetailRelationsPage = (function (_super) {
                __extends(MasterDetailRelationsPage, _super);
                function MasterDetailRelationsPage(wizard, sqlDataSourceResultSchema) {
                    var _this = _super.call(this, wizard) || this;
                    _this._relations = ko.observableArray([]);
                    _this.template = "dxrd-wizard-configure-relations-page";
                    _this.description = Analytics.getLocalization("Configure master-detail relationships.", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageConfigureMasterDetailRelations");
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
                            deferred.resolve(new Analytics.Data.ResultSet(JSON.parse(result.resultSchemaJSON)));
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
                        _this.relationsEditor(new DevExpress.QueryBuilder.Widgets.MasterDetailEditor(_this._relations, _this._resultSet, $.noop));
                    })
                        .fail(function (result) {
                        if (Analytics.Utils.getErrorMessage(result))
                            Analytics.Utils.ShowMessage(Analytics.Utils.getErrorMessage(result));
                        _this.wizard.indicatorVisible(false);
                    });
                };
                MasterDetailRelationsPage.prototype.commit = function (data) {
                    this.relationsSubscription.dispose();
                    data.sqlDataSource.relations(this._relations());
                    data.sqlDataSource.resultSet = this._resultSet;
                };
                return MasterDetailRelationsPage;
            }(Wizard.WizardPage));
            Wizard.MasterDetailRelationsPage = MasterDetailRelationsPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
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
                    _this._chechedQueries = ko.observableArray([]);
                    _this._dataSource = function () {
                        return _this._data && _this._data.sqlDataSource;
                    };
                    _this._dataConnection = function () {
                        return _this._data && _this._data.sqlDataSource && _this._data.sqlDataSource.connection;
                    };
                    _this.template = "dxrd-wizard-add-queries-page";
                    _this.description = Analytics.getLocalization("Columns selected from specific tables and/or views will be automatically included into a separate query.", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageConfigureMultiQuery");
                    _this.scrollViewHeight = Wizard.WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT;
                    _this.isTablesGenerateColumnsCallBack = ko.observableArray([]);
                    _this.customizeDBSchemaTreeListActions = null;
                    _this.popupSelectStatment = ({
                        isVisible: ko.observable(false),
                        title: function () { return Analytics.getLocalization("Custom SQL Editor", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_CustomSqlEditor"); },
                        query: null,
                        data: ko.observable(),
                        okButtonText: function () { return DevExpress.Analytics.getLocalization('OK', 'PivotGridStringId.FilterOk'); },
                        okButtonHandler: function (e) {
                            _this.popupSelectStatment.query.sqlString(e.model.data());
                            _this.setCustomSqlQuery(_this.popupSelectStatment.query);
                            e.model.isVisible(false);
                        },
                        aceOptions: DevExpress.QueryBuilder.Widgets.createDefaultSQLAceOptions(),
                        aceAvailable: Analytics.Widgets.aceAvailable,
                        additionalOptions: DevExpress.QueryBuilder.Widgets.createDefaultSQLAdditionalOptions(function (newVal) { _this.popupSelectStatment.data(newVal); }),
                        languageHelper: DevExpress.QueryBuilder.Widgets.createDefaultSQLLanguageHelper(),
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
                            var query = Analytics.Utils.findFirstItemMatchesCondition(_this._customQueries(), function (item) { return name === (item.name() || item.generateName()); });
                            if (query.type() === Analytics.Data.Utils.SqlQueryType.customSqlQuery) {
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
                                _this.showStatementPopup(new Analytics.Data.CustomSqlQuery({ "@Name": null }, _this.dataSourceClone()));
                            }
                            else {
                                var queryNew = new Analytics.Data.TableQuery({ "@Name": null }, _this.dataSourceClone());
                                _this.popupQueryBuilder.show(queryNew, _this.dataSourceClone());
                            }
                        }
                    };
                    _this.customResetOptions = $.noop;
                    _this._callbacks = callbacks;
                    _this._sqlTextProvider = new Wizard.Utils.SelectQuerySqlTextProvider(DevExpress.QueryBuilder.Utils.wrapGetSelectStatement(_this._callbacks.selectStatement), _this._dataConnection);
                    _this.popupQueryBuilder = new Wizard.Utils.QueryBuilderPopup(function (newQuery, isInProcess) { return _this.setTableQuery(newQuery, isInProcess); }, rtl, callbacks.customizeQBInitData);
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
                            MultiQueryConfigurePage.pushQuery(new Analytics.Data.TableQuery(queryJSON, dataSource), table, dataSource.queries);
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
                            var newQuery = new Analytics.Data.StoredProcQuery({ "@Name": procedure.name, "ProcName": procedure.name }, dataSource);
                            procedure.arguments.forEach(function (arg) {
                                newQuery.parameters.push(new Analytics.Data.DataSourceParameter({ "@Name": arg.name, "@Type": Analytics.Data.DBColumn.GetType(arg.type) }, null, Analytics.Data.storedProcParameterSerializationsInfo(Analytics.Data.DBColumn.GetType(arg.type))));
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
                        var query = Analytics.Utils.findFirstItemMatchesCondition(queries.peek(), function (item) { return queryNode.name === (item.name() || item.generateName()); });
                        if (queryNode.checked()) {
                            query.name(Analytics.Data.Utils.generateQueryUniqueName(allQueries.peek(), query));
                            this._chechedQueries.push(query);
                        }
                    }
                };
                MultiQueryConfigurePage.prototype._getItemsPromise = function (pathRequest) {
                    var _this = this;
                    var isDone = false;
                    var request = this._itemsProvider().getItems(pathRequest).done(function () {
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
                        query.name(Analytics.Data.Utils.generateQueryUniqueName(provider.customQueries().peek(), query));
                        provider.customQueries().push(query);
                        this._selectedPath("queries." + query.name());
                        var children = this._itemsProvider().queries().children();
                        children[children.length - 1].setChecked(true);
                    }
                    this._resetDataSourceResult();
                };
                MultiQueryConfigurePage.pushQuery = function (newQuery, node, queries) {
                    if (!Analytics.Utils.findFirstItemMatchesCondition(queries.peek(), function (item) { return item.name() === (newQuery.name() || newQuery.generateName()); })) {
                        newQuery.name(Analytics.Data.Utils.generateQueryUniqueName(queries.peek(), newQuery));
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
                    var deferred = $.Deferred();
                    if (this._data !== data || data.connectionString() !== this._connection) {
                        this._dataSourceClone = new Analytics.Data.SqlDataSource({}, undefined, data.requestWrapper);
                        this._dataSourceClone.connection.name(data.connectionString());
                        this._dataSourceClone.dbSchemaProvider = data.sqlDataSource.dbSchemaProvider;
                        var customQueriesPromise = this._callbacks.customQueriesPreset
                            ? this._callbacks.customQueriesPreset(this._dataSourceClone)
                            : $.Deferred().resolve([]).promise();
                        customQueriesPromise.done(function (queries) {
                            _this._customQueries(queries);
                            _this._selectedPath("");
                            _this
                                ._itemsProvider(new Wizard.Utils.DBSchemaItemsProvider(_this.dataSourceClone().dbSchemaProvider, _this._customQueries, _this.showQbCallBack, _this.disableCustomSql, _this.getItemsAfterCheck));
                            _this._getItemsPromise(new DevExpress.Analytics.Utils.PathRequest("queries"));
                            _this.fieldListModel({
                                itemsProvider: _this._itemsProvider(),
                                selectedPath: _this._selectedPath,
                                treeListController: new Wizard.Utils.DBSchemaTreeListController(_this.customizeDBSchemaTreeListActions),
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
                    return deferred.resolve({}).promise();
                };
                MultiQueryConfigurePage.prototype.commit = function (data) {
                    data.sqlDataSource.queries.removeAll(this._chechedQueries());
                    this._chechedQueries([]);
                    this._addQueryAlgorithm(this._itemsProvider().tables(), "tables", data.sqlDataSource);
                    this._addQueryAlgorithm(this._itemsProvider().views(), "views", data.sqlDataSource);
                    this._addQueryAlgorithm(this._itemsProvider().procedures(), "procedures", data.sqlDataSource);
                    this._addQueryAlgorithm(this._itemsProvider().queries(), "queries", data.sqlDataSource, this._customQueries);
                    data.customQueries = this._customQueries;
                    ko.utils.arrayPushAll(data.sqlDataSource.queries(), this._chechedQueries());
                    data.sqlDataSource.queries.valueHasMutated();
                };
                return MultiQueryConfigurePage;
            }(Wizard.WizardPage));
            Wizard.MultiQueryConfigurePage = MultiQueryConfigurePage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
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
            }(Wizard.WizardPage));
            Wizard.CommonParametersPage = CommonParametersPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var MultiQueryDataSourceWizardModel = (function () {
                function MultiQueryDataSourceWizardModel(requestWrapper) {
                    var _this = this;
                    if (requestWrapper === void 0) { requestWrapper = new DevExpress.QueryBuilder.Utils.RequestWrapper(); }
                    this.requestWrapper = requestWrapper;
                    this.connectionString = ko.observable();
                    this.customQueries = ko.observableArray();
                    this.sqlDataSource = new Analytics.Data.SqlDataSource({}, undefined, requestWrapper);
                    this.connectionString = this.sqlDataSource.connection.name;
                    this.connectionString.subscribe(function () {
                        _this.sqlDataSource.relations([]);
                        _this.sqlDataSource.queries([]);
                    });
                }
                return MultiQueryDataSourceWizardModel;
            }());
            Wizard.MultiQueryDataSourceWizardModel = MultiQueryDataSourceWizardModel;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            function canEditQueryParameters(query, customQueries) {
                if (query.type() === Analytics.Data.Utils.SqlQueryType.tableQuery || query.type() === Analytics.Data.Utils.SqlQueryType.customSqlQuery) {
                    return customQueries.indexOf(query) > -1;
                }
                return query.type() === Analytics.Data.Utils.SqlQueryType.storedProcQuery && query.parameters().length > 0;
            }
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
                        var newParameter = new Analytics.Data.DataSourceParameter({
                            "@Name": Analytics.Internal.getUniqueNameForNamedObjectsArray(parameters, "parameter"),
                            "@Type": "System.Int32"
                        });
                        _this._selectedPath(queryName + "." + newParameter.name());
                        return _this.parametersConverter.createParameterViewModel(newParameter);
                    };
                    _this.template = "dxrd-configure-query-parameters-page";
                    _this.description = Analytics.getLocalization("Configure query parameters.", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageConfigureParameters");
                    _this.scrollViewHeight = Wizard.WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT;
                    _this.fieldListModel = ko.observable(null);
                    _this.actionPrevious.isDisabled(false);
                    _this.actionFinish.isDisabled(false);
                    return _this;
                }
                MultiQueryConfigureParametersPage.prototype._begin = function (data) {
                    var _this = this;
                    this._rootItems = [];
                    data.sqlDataSource.queries().forEach(function (query) {
                        if (canEditQueryParameters(query, data.customQueries())) {
                            var parent = new Wizard.Utils.ParametersTreeListRootItem(query);
                            parent.parameters(query.parameters().map(function (parameterModel) {
                                return new Wizard.Utils.ParametersTreeListItem(_this.parametersConverter.createParameterViewModel(parameterModel), parent);
                            }));
                            _this._rootItems.push(parent);
                        }
                    });
                    if (this._rootItems.length === 0) {
                        this.isVisible = false;
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
                                        var parent = Analytics.Utils.findFirstItemMatchesCondition(_this._rootItems, function (item) { return item.name === pathRequest.ref; });
                                        result.resolve(parent.parameters());
                                    }
                                    return result.promise();
                                }
                            },
                            templateName: "dx-treelist-item-with-hover",
                            selectedPath: this._selectedPath,
                            treeListController: new Wizard.Utils.ParametersTreeListController(this._rootItems, this._createNewParameter),
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
            }(Wizard.CommonParametersPage));
            Wizard.MultiQueryConfigureParametersPage = MultiQueryConfigureParametersPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var WizardViewModel = (function () {
                function WizardViewModel() {
                    var _this = this;
                    this._defaultWizardPage = new Wizard.WizardPage(this, '', "", "");
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
                        message: DevExpress.Analytics.getLocalization('Loading...', 'ASPxReportsStringId.WebDocumentViewer_Loading'),
                        visible: observableVisible,
                        shading: true,
                        shadingColor: 'transparent',
                        position: { of: $container },
                        container: $container
                    };
                };
                WizardViewModel.prototype.wizardPopupPosition = function (element) {
                    return {
                        of: Analytics.Utils.getParentContainer(element)
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
                        this.dispatcher = new Wizard.LegacyPageDispathcer(this.steps);
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
                WizardViewModel.WIZARD_DEFAULT_SCROLLVIEW_HEIGHT = "286";
                return WizardViewModel;
            }());
            Wizard.WizardViewModel = WizardViewModel;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var MultiQueryDataSourceWizard = (function (_super) {
                __extends(MultiQueryDataSourceWizard, _super);
                function MultiQueryDataSourceWizard(connectionStrings, callbacks, disableCustomSql, rtl) {
                    if (callbacks === void 0) { callbacks = {}; }
                    if (disableCustomSql === void 0) { disableCustomSql = false; }
                    if (rtl === void 0) { rtl = false; }
                    var _this = _super.call(this) || this;
                    _this.connectionStrings = connectionStrings;
                    _this.height = ko.observable("443");
                    _this.title = Analytics.getLocalization("SQL Data Source Wizard", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_Title");
                    _this.extendCssClass = "dxrd-multiqueries-sqldatasource-wizard";
                    _this.container = Analytics.Utils.getParentContainer;
                    _this.finishCallback = callbacks.finishCallback;
                    _this.steps = [
                        new Wizard.SelectConnectionString(_this, connectionStrings, false),
                        new Wizard.MultiQueryConfigurePage(_this, callbacks, disableCustomSql, rtl),
                        new Wizard.MultiQueryConfigureParametersPage(_this),
                        new Wizard.MasterDetailRelationsPage(_this, DevExpress.QueryBuilder.Utils.wrapRebuildResultSchema(callbacks.sqlDataSourceResultSchema))
                    ];
                    return _this;
                }
                MultiQueryDataSourceWizard.prototype.start = function (wizardModel, finishCallback) {
                    this.wizardModel = wizardModel || new Wizard.MultiQueryDataSourceWizardModel();
                    _super.prototype.start.call(this, this.wizardModel, Wizard.WizardViewModel.chainCallbacks(finishCallback, this.finishCallback));
                };
                return MultiQueryDataSourceWizard;
            }(Wizard.WizardViewModel));
            Wizard.MultiQueryDataSourceWizard = MultiQueryDataSourceWizard;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var ConfigureParametersPage = (function (_super) {
                __extends(ConfigureParametersPage, _super);
                function ConfigureParametersPage(wizard, parametersConverter) {
                    if (parametersConverter === void 0) { parametersConverter = {
                        createParameterViewModel: function (parameter) { return parameter; },
                        getParameterFromViewModel: function (parameterViewModel) { return parameterViewModel; }
                    }; }
                    var _this = _super.call(this, wizard) || this;
                    _this.parametersConverter = parametersConverter;
                    _this.template = "dxrd-page-configure-parameters";
                    _this.description = Analytics.getLocalization("Configure query parameters.", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageConfigureParameters");
                    _this.removeButtonTitle = Analytics.getLocalization("Remove", "DataAccessUIStringId.Button_Remove");
                    _this.actionPrevious.isDisabled(false);
                    _this.actionNext.isDisabled(true);
                    _this.actionFinish.isDisabled(false);
                    _this.parametersEditorOptions = {
                        addHandler: function () {
                            return _this.parametersConverter.createParameterViewModel(new Analytics.Data.DataSourceParameter({
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
                ConfigureParametersPage.prototype.getParameters = function () {
                    return this.parametersEditorOptions.values()();
                };
                ConfigureParametersPage.prototype._begin = function (data) {
                    var _this = this;
                    this.parametersEditorOptions.hideButtons(data.sqlQuery.type() === Analytics.Data.Utils.SqlQueryType.storedProcQuery);
                    this.parametersEditorOptions.values(ko.observableArray(data.sqlQuery.parameters().map(function (item) { return _this.parametersConverter.createParameterViewModel(item); })));
                    this.validateParameters();
                };
                ConfigureParametersPage.prototype.commit = function (data) {
                    var _this = this;
                    _super.prototype.commit.call(this, data);
                    data.sqlQuery.parameters(this.parametersEditorOptions.values()().map(function (item) { return _this.parametersConverter.getParameterFromViewModel(item); }));
                };
                return ConfigureParametersPage;
            }(Wizard.CommonParametersPage));
            Wizard.ConfigureParametersPage = ConfigureParametersPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
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
                    _this.description = DevExpress.Analytics.getLocalization("Create a query or select a stored procedure", DevExpress.Analytics.StringId.WizardPageConfigureQuery);
                    _this.queryTypeItems = [CreateQueryPage.QUERY_TEXT, CreateQueryPage.SP_TEXT];
                    _this.selectedQueryType = ko.observable();
                    _this.queryControl = ko.observable();
                    _this.runQueryBuilderBtnText = ko.pureComputed(function () {
                        return (!_this._selectStatementControl.sqlString() || _this._selectStatementControl.getQuery().type() === Analytics.Data.Utils.SqlQueryType.tableQuery) ?
                            Analytics.getLocalization("Run Query Builder...", "DataAccessUIStringId.Button_QueryBuilder") :
                            Analytics.getLocalization("Create New Query...", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_CreateNewQuery");
                    });
                    _this._proceduresList = new Wizard.Utils.StoredProceduresQueryControl();
                    _this._selectStatementControl = new Wizard.Utils.SelectStatementQueryControl(new Wizard.Utils.SelectQuerySqlTextProvider(DevExpress.QueryBuilder.Utils.wrapGetSelectStatement(callbacks.selectStatement), _this._connection), disableCustomSql);
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
                    _this.popupQueryBuilder = new Wizard.Utils.QueryBuilderPopup(function (newQuery, isInProcess) {
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
                            if (query.type() === Analytics.Data.Utils.SqlQueryType.tableQuery) {
                                _this.popupQueryBuilder.show(query, _this._dataSource());
                            }
                            else {
                                _this.popupQueryBuilder.show(new Analytics.Data.TableQuery({ "@Name": query.name() }, _this._dataSource()), _this._dataSource());
                            }
                        });
                    });
                };
                CreateQueryPage.prototype.localizeQueryType = function (queryTypeString) {
                    return CreateQueryPage.QUERY_TEXT === queryTypeString ?
                        Analytics.getLocalization(CreateQueryPage.QUERY_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_Query") :
                        Analytics.getLocalization(CreateQueryPage.SP_TEXT, "DataAccessUIStringId.WizardPageConfigureQuery_StoredProcedure");
                };
                CreateQueryPage.prototype._begin = function (data) {
                    if (this._data !== data || !data.sqlQuery) {
                        this._data = data;
                        this._proceduresList.setQuery(new Analytics.Data.StoredProcQuery({ "@Name": data.sqlQuery && data.sqlQuery.name() }, data.sqlDataSource));
                        this._selectStatementControl.setQuery(new Analytics.Data.CustomSqlQuery({ "@Name": data.sqlQuery && data.sqlQuery.name() }, data.sqlDataSource));
                        this.selectedQueryType(CreateQueryPage.QUERY_TEXT);
                    }
                    if (data.sqlQuery) {
                        this.selectedQueryType(data.sqlQuery.type() === Analytics.Data.Utils.SqlQueryType.storedProcQuery ? CreateQueryPage.SP_TEXT : CreateQueryPage.QUERY_TEXT);
                        this.queryControl().setQuery(data.sqlQuery, this.wizard.indicatorVisible);
                    }
                    this.popupQueryBuilder.isVisible(false);
                };
                CreateQueryPage.prototype.commit = function (data) {
                    var query = this.queryControl().getQuery();
                    if (query) {
                        if (!query.name() || !data.sqlQuery || data.sqlQuery.name() !== query.name())
                            query.name(Analytics.Data.Utils.generateQueryUniqueName(data.sqlDataSource.queries(), query));
                        data.sqlQuery = query;
                    }
                };
                CreateQueryPage.QUERY_TEXT = "Query";
                CreateQueryPage.SP_TEXT = "Stored Procedure";
                return CreateQueryPage;
            }(Wizard.WizardPage));
            Wizard.CreateQueryPage = CreateQueryPage;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var SelectConnectionString = (function (_super) {
                __extends(SelectConnectionString, _super);
                function SelectConnectionString(wizard, connectionStrings, _showPageForSingleConnectionString) {
                    if (_showPageForSingleConnectionString === void 0) { _showPageForSingleConnectionString = false; }
                    var _this = _super.call(this, wizard) || this;
                    _this._showPageForSingleConnectionString = _showPageForSingleConnectionString;
                    _this.template = "dxrd-page-connectionstring";
                    _this.description = Analytics.getLocalization("Choose a data connection", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_PageChooseConnection");
                    _this.connectionStrings = ko.observableArray([]);
                    _this.selectedConnectionString = ko.observableArray([]);
                    _this.actionPrevious.isVisible(false);
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
                        var selectedString = Analytics.Utils.getFirstItemByPropertyValue(connectionStrings, "name", data.sqlDataSource.connection.name()) || connectionStrings[0];
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
            }(Wizard.WizardPage));
            Wizard.SelectConnectionString = SelectConnectionString;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var SqlDataSourceWizardModel = (function () {
                function SqlDataSourceWizardModel(dataSource, queryName) {
                    var _this = this;
                    this.sqlDataSource = dataSource || new Analytics.Data.SqlDataSource({});
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
                Object.defineProperty(SqlDataSourceWizardModel.prototype, "sqlQuery", {
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
                SqlDataSourceWizardModel.prototype.getQueryIndex = function () {
                    return this._queryIndex;
                };
                return SqlDataSourceWizardModel;
            }());
            Wizard.SqlDataSourceWizardModel = SqlDataSourceWizardModel;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var SqlDataSourceWizard = (function (_super) {
                __extends(SqlDataSourceWizard, _super);
                function SqlDataSourceWizard(connectionStrings, callbacks, disableCustomSql, rtl) {
                    if (callbacks === void 0) { callbacks = {}; }
                    if (disableCustomSql === void 0) { disableCustomSql = false; }
                    if (rtl === void 0) { rtl = false; }
                    var _this = _super.call(this) || this;
                    _this.title = Analytics.getLocalization("SQL Data Source Wizard", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_Title");
                    _this.extendCssClass = "dxrd-sqldatasource-wizard";
                    _this.container = Analytics.Utils.getParentContainer;
                    _this.finishCallback = callbacks.finishCallback;
                    _this.steps = [
                        new Wizard.SelectConnectionString(_this, connectionStrings, false),
                        new Wizard.CreateQueryPage(_this, callbacks, disableCustomSql, rtl),
                        new Wizard.ConfigureParametersPage(_this)
                    ];
                    _this.connectionStrings = connectionStrings;
                    return _this;
                }
                SqlDataSourceWizard.prototype.start = function (wizardModel, finishCallback) {
                    this._wizardModel = wizardModel || new Wizard.SqlDataSourceWizardModel();
                    _super.prototype.start.call(this, this._wizardModel, Wizard.WizardViewModel.chainCallbacks(finishCallback, this.finishCallback));
                };
                return SqlDataSourceWizard;
            }(Wizard.WizardViewModel));
            Wizard.SqlDataSourceWizard = SqlDataSourceWizard;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var ParametersTreeListItem = (function () {
                    function ParametersTreeListItem(parameter, parent) {
                        this.parent = parent;
                        this.editor = DevExpress.Analytics.Widgets.editorTemplates.commonCollection;
                        this.isList = false;
                        this.contenttemplate = "dx-treelist-accordion-contenttemplate-custom-with-actions";
                        this.actionsTemplate = "dx-treelist-item-actions";
                        this.dataSourceParameter = ko.observable(parameter);
                        this._name = parameter.name;
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
                }());
                Utils.ParametersTreeListItem = ParametersTreeListItem;
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
                Utils.ParametersTreeListRootItem = ParametersTreeListRootItem;
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
                        if (treeListItem.data.query().type() === Analytics.Data.Utils.SqlQueryType.storedProcQuery) {
                            return treeListItem.data.isList ? [] : [DevExpress.Analytics.Widgets.treeListEditAction];
                        }
                        if (treeListItem.data.isList) {
                            var item = treeListItem.data;
                            actions.push({
                                clickAction: function () {
                                    return item.parameters.push(new ParametersTreeListItem(_this._createNewParameter(item.name, item.parameters()), item));
                                },
                                imageClassName: "dxrd-image-add",
                                imageTemplateName: "dxrd-svg-operations-add",
                                text: Analytics.getLocalization("Add parameter", "ASPxReportsStringId.ReportDesigner_FieldListActions_AddParameter")
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
                                text: Analytics.getLocalization("Remove parameter", "DataAccessUIStringId.Button_Remove"),
                            });
                            actions.push(DevExpress.Analytics.Widgets.treeListEditAction);
                        }
                        return actions;
                    };
                    ParametersTreeListController.prototype.canSelect = function (value) {
                        return true;
                    };
                    return ParametersTreeListController;
                }(Analytics.Widgets.TreeListController));
                Utils.ParametersTreeListController = ParametersTreeListController;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var DBSchemaItemsProvider = (function () {
                    function DBSchemaItemsProvider(dbSchemaProvider, customQueries, showQbCallBack, disableCustomSql, afterCheckToggled) {
                        var _this = this;
                        this._callBack = ko.observable({
                            deleteAction: function (name) {
                                _this._customQueries
                                    .remove(Analytics.Utils.findFirstItemMatchesCondition(_this._customQueries(), function (item) { return (item.name() || item.generateName()) === name; }));
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
                        this._tables = new Utils.TreeNode("tables", Analytics.getLocalization("Tables", "DataAccessStringId.ConfigureMultiQueryPage_TableCategory"), "list", false, afterCheckToggled);
                        this._views = new Utils.TreeNode("views", Analytics.getLocalization("Views", "DataAccessStringId.ConfigureMultiQueryPage_ViewCategory"), "list", false, afterCheckToggled);
                        this._procedures = new Utils.ParameterTreeNode("procedures", Analytics.getLocalization("Stored Procedures", "DataAccessStringId.ConfigureMultiQueryPage_SpCategory"), "list", false, afterCheckToggled);
                        this._queries = new Utils.QueriesTreeNode("queries", Analytics.getLocalization("Queries", "DataAccessStringId.ConfigureMultiQueryPage_QueryCategory"), "list", false, this._callBack, afterCheckToggled);
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
                                                tables.push(new Utils.TreeNode(table.name, table.name, "table", _this._tables.checked.peek(), afterCheckToggled));
                                            }
                                        });
                                        _this._tables.initializeChildren(tables);
                                        result.resolve(tables);
                                    }
                                    else {
                                        result.resolve(_this._tables.children());
                                    }
                                });
                            }
                            else if (pathRequest.fullPath === "views") {
                                dbSchemaProvider.getDbSchema().done(function (dbSchema) {
                                    if (_this._views.children().length === 0) {
                                        var views = [];
                                        dbSchema.tables.forEach(function (table) {
                                            if (table.isView) {
                                                views.push(new Utils.TreeNode(table.name, table.name, "view", _this._views.checked.peek(), afterCheckToggled));
                                            }
                                        });
                                        _this._views.initializeChildren(views);
                                        result.resolve(views);
                                    }
                                    else {
                                        result.resolve(_this._views.children());
                                    }
                                });
                            }
                            else if (pathRequest.fullPath === "procedures") {
                                dbSchemaProvider.getDbStoredProcedures().done(function (storedProcedures) {
                                    if (_this._procedures.children().length === 0) {
                                        var procedures = storedProcedures.map(function (proc) {
                                            return new Utils.TreeLeafNode(proc.name, Utils.StoredProceduresQueryControl.generateStoredProcedureDisplayName(proc), "procedure", _this._procedures.checked.peek(), proc.arguments, afterCheckToggled);
                                        });
                                        _this._procedures.initializeChildren(procedures);
                                        result.resolve(procedures);
                                    }
                                    else {
                                        result.resolve(_this._procedures.children());
                                    }
                                });
                            }
                            else if (pathRequest.fullPath === "queries") {
                                var queries = customQueries().map(function (query) {
                                    var name = query.name() || query.generateName();
                                    var currentQuery = _this._queries.children().filter(function (q) { return q.name === name; })[0];
                                    return new Utils.TreeQueryNode(name, name, "query", !!currentQuery && currentQuery.checked(), query.parameters, _this._callBack, afterCheckToggled);
                                });
                                _this._queries.initializeChildren(queries);
                                result.resolve(queries);
                            }
                            else {
                                dbSchemaProvider.getDbTable(pathRequest.path).done(function (table) {
                                    var tableTreeNode;
                                    if (table.isView) {
                                        tableTreeNode = Analytics.Utils.findFirstItemMatchesCondition(_this._views.children(), function (item) { return item.name === table.name; });
                                    }
                                    else {
                                        tableTreeNode = Analytics.Utils.findFirstItemMatchesCondition(_this._tables.children(), function (item) { return item.name === table.name; });
                                    }
                                    if (tableTreeNode.children().length === 0) {
                                        var columns = table.columns.map(function (column) {
                                            return new Utils.TreeLeafNode(column.name, column.name, "column", tableTreeNode.checked.peek(), null, afterCheckToggled);
                                        });
                                        tableTreeNode.initializeChildren(columns);
                                        result.resolve(columns);
                                    }
                                    else {
                                        result.resolve(tableTreeNode.children());
                                    }
                                });
                            }
                            return result.promise();
                        };
                        this._customQueries = customQueries;
                    }
                    return DBSchemaItemsProvider;
                }());
                Utils.DBSchemaItemsProvider = DBSchemaItemsProvider;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
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
                        if (!(value.data instanceof Utils.QueriesTreeNode || value.data instanceof Utils.TreeQueryNode))
                            return [];
                        var result = value.data.getActions(value);
                        this._customizeDBSchemaTreeListActions && this._customizeDBSchemaTreeListActions(value.data, result);
                        return result;
                    };
                    DBSchemaTreeListController.prototype.canSelect = function (value) {
                        return true;
                    };
                    return DBSchemaTreeListController;
                }(Analytics.Widgets.TreeListController));
                Utils.DBSchemaTreeListController = DBSchemaTreeListController;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var QueryBuilderPopup = (function () {
                    function QueryBuilderPopup(applyNewQuery, rtl, customizeQBInitializationData) {
                        var _this = this;
                        if (rtl === void 0) { rtl = false; }
                        if (customizeQBInitializationData === void 0) { customizeQBInitializationData = function (data) { return data; }; }
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
                            "loading": { text: 'Loading...', localizationId: 'ASPxReportsStringId.WebDocumentViewer_Loading' },
                            "previewResults": { text: 'Preview Results...', localizationId: 'DataAccessUIStringId.QueryBuilderButtons_PreviewResults' },
                            "cancel": { text: 'Cancel', localizationId: 'ASPxReportsStringId.SearchDialog_Cancel' },
                            "ok": { text: 'OK', localizationId: 'PivotGridStringId.FilterOk' }
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
                        this._applyQuery(new Analytics.Data.TableQuery(this.designer().model().serialize(), this._dataSource), this.showLoadIndicator)
                            .done(function () {
                            _this.isVisible(false);
                        });
                    };
                    QueryBuilderPopup.prototype.onHiddenHandler = function () {
                        this.designer().dataPreview.isVisible(false);
                    };
                    QueryBuilderPopup.prototype.popupViewModel = function (element) {
                        var $container = Analytics.Utils.getParentContainer(element);
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
                        return DevExpress.Analytics.getLocalization(this.localizationIdMap[key].text, this.localizationIdMap[key].localizationId);
                    };
                    QueryBuilderPopup.customizeQueryBuilderActions = function (actions) {
                        var del = Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Delete"; }), undo = Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Undo"; }), redo = Analytics.Utils.findFirstItemMatchesCondition(actions, function (action) { return action.text === "Redo"; });
                        actions.splice(0, actions.length, del, undo, redo);
                    };
                    return QueryBuilderPopup;
                }());
                Utils.QueryBuilderPopup = QueryBuilderPopup;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var SelectQuerySqlTextProvider = (function () {
                    function SelectQuerySqlTextProvider(_selectStatementCallback, _connection) {
                        this._selectStatementCallback = _selectStatementCallback;
                        this._connection = _connection;
                    }
                    SelectQuerySqlTextProvider.prototype.getQuerySqlText = function (newQuery) {
                        var queryJSON = JSON.stringify({ "Query": new DevExpress.Analytics.Utils.ModelSerializer().serialize(newQuery) });
                        return this._selectStatementCallback(this._connection(), queryJSON)
                            .fail(function (data) {
                            var error = Analytics.Utils.getErrorMessage(data);
                            Analytics.Utils.ShowMessage("Unable to build a SQL string" + (error ? ": " + error : "."));
                        });
                    };
                    return SelectQuerySqlTextProvider;
                }());
                Utils.SelectQuerySqlTextProvider = SelectQuerySqlTextProvider;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var SelectStatementQueryControl = (function () {
                    function SelectStatementQueryControl(sqlTextProvider, disableCustomSql) {
                        var _this = this;
                        this._tableQueryString = ko.observable("");
                        this._query = ko.observable();
                        this._needToCustomizeParameters = ko.pureComputed(function () {
                            return _this._query() && (_this._query().type() === Analytics.Data.Utils.SqlQueryType.customSqlQuery || _this._query().parameters().length > 0);
                        });
                        this.template = "dxrd-select-control";
                        this.aceOptions = DevExpress.QueryBuilder.Widgets.createDefaultSQLAceOptions();
                        this.additionalOptions = DevExpress.QueryBuilder.Widgets.createDefaultSQLAdditionalOptions(function (newVal) { _this.sqlString(newVal); });
                        this.aceAvailable = DevExpress.Analytics.Widgets.aceAvailable;
                        this.languageHelper = DevExpress.QueryBuilder.Widgets.createDefaultSQLLanguageHelper();
                        this.caption = function () { return DevExpress.Analytics.getLocalization("SQL string:", "DataAccessUIStringId.QueryControl_SqlString"); };
                        this.sqlString = ko.pureComputed({
                            read: function () {
                                return _this._query() && _this._query().type() === Analytics.Data.Utils.SqlQueryType.customSqlQuery ? _this._query().sqlString() : _this._tableQueryString();
                            },
                            write: function (val) {
                                if (_this._query().type() !== Analytics.Data.Utils.SqlQueryType.customSqlQuery) {
                                    var customQuery = new Analytics.Data.CustomSqlQuery({ "@Name": _this._query().name() }, _this._query().parent);
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
                        if (this._query() !== query && query.type() === Analytics.Data.Utils.SqlQueryType.tableQuery) {
                            isInProcess && isInProcess(true);
                            return this._sqlTextProvider.getQuerySqlText(query)
                                .done(function (response) {
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
                Utils.SelectStatementQueryControl = SelectStatementQueryControl;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var StoredProceduresQueryControl = (function (_super) {
                    __extends(StoredProceduresQueryControl, _super);
                    function StoredProceduresQueryControl() {
                        var _this = _super.call(this) || this;
                        _this.template = "dxrd-procedures-control";
                        _this.storedProcedures = ko.observableArray([]);
                        _this.selectedProcedure = ko.observableArray([]);
                        _this.caption = function () { return DevExpress.Analytics.getLocalization("Select a stored procedure:", "DataAccessUIStringId.StoredProcControl_Caption"); };
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
                                _this._selectedProcedure = Analytics.Utils.getFirstItemByPropertyValue(_this.storedProcedures(), "name", _this._selectedProcedure.name);
                            }
                            else if (_this._query && _this._query.procName()) {
                                _this._selectedProcedure = Analytics.Utils.getFirstItemByPropertyValue(_this.storedProcedures(), "name", _this._query.procName());
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
                        return arg.direction !== Analytics.Data.DBStoredProcedureArgumentDirection.Out;
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
                        this._selectedProcedure = Analytics.Utils.getFirstItemByPropertyValue(this.storedProcedures(), "name", query.procName());
                    };
                    StoredProceduresQueryControl.prototype.getQuery = function () {
                        var _this = this;
                        if (!this._selectedProcedure)
                            return null;
                        var newQuery = new Analytics.Data.StoredProcQuery({ "@Name": this._query.name() || this._selectedProcedure.name, "ProcName": this._selectedProcedure.name }, this._query.parent);
                        this._selectedProcedure.arguments.forEach(function (arg) {
                            if (StoredProceduresQueryControl._availableConvertToParameter(arg)) {
                                newQuery.parameters.push(Analytics.Utils.getFirstItemByPropertyValue(_this._query.parameters(), "name", arg.name) || new Analytics.Data.DataSourceParameter({ "@Name": arg.name, "@Type": Analytics.Data.DBColumn.GetType(arg.type) }, null, Analytics.Data.storedProcParameterSerializationsInfo(Analytics.Data.DBColumn.GetType(arg.type))));
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
                Utils.StoredProceduresQueryControl = StoredProceduresQueryControl;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var Utils;
            (function (Utils) {
                var TreeNodeBase = (function () {
                    function TreeNodeBase(name, displayName, specifics, isChecked, afterCheckToggled) {
                        var _this = this;
                        if (isChecked === void 0) { isChecked = false; }
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
                Utils.TreeNodeBase = TreeNodeBase;
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
                Utils.TreeLeafNode = TreeLeafNode;
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
                Utils.TreeNode = TreeNode;
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
                Utils.ParameterTreeNode = ParameterTreeNode;
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
                            text: Analytics.getLocalization("Add query", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_AddQuery")
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
                        if (context.hasItems && context.path.indexOf("queries") === 0) {
                            result.push(this.addAction);
                        }
                        return result;
                    };
                    QueriesTreeNode.prototype.popoverListItems = function () {
                        var _this = this;
                        return [
                            {
                                name: Analytics.getLocalization("Run Query Builder", "DataAccessUIStringId.Button_QueryBuilder"),
                                addAction: function () { return _this.addQuery(); }
                            },
                            {
                                name: Analytics.getLocalization("Write Custom SQL", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_WriteCustomSQL"),
                                addAction: function () { return _this.addCustomQuery(); }
                            }
                        ];
                    };
                    QueriesTreeNode.prototype.showPopover = function () {
                        this.popoverVisible(true);
                    };
                    return QueriesTreeNode;
                }(ParameterTreeNode));
                Utils.QueriesTreeNode = QueriesTreeNode;
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
                            text: Analytics.getLocalization("Edit query", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_EditQuery")
                        };
                        _this.removeAction = {
                            clickAction: function (item) {
                                _this.removeQuery({ model: item.data });
                            },
                            imageClassName: "dxrd-image-recycle-bin",
                            imageTemplateName: "dxrd-svg-operations-recycle_bin",
                            text: Analytics.getLocalization("Remove query", "ASPxReportsStringId.ReportDesigner_SqlDSWizard_RemoveQuery")
                        };
                        _this.parameters = parameters;
                        _this.removeQuery = function (e) {
                            callbacks().deleteAction(e.model.name);
                        };
                        _this.editQuery = function (e) {
                            callbacks().showQbCallBack(_this.name);
                        };
                        _this.hasQuery = true;
                        return _this;
                    }
                    TreeQueryNode.prototype.getActions = function (context) {
                        var result = [];
                        result.push(this.removeAction);
                        result.push(this.editAction);
                        return result;
                    };
                    return TreeQueryNode;
                }(TreeLeafNode));
                Utils.TreeQueryNode = TreeQueryNode;
            })(Utils = Wizard.Utils || (Wizard.Utils = {}));
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
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
                    return this._goToFirstVisiblePage(false, currentToken - 1, model, this._isPageFirst(currentToken, model), false);
                };
                LegacyPageDispathcer.prototype._isPageFirst = function (token, model) {
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
            Wizard.LegacyPageDispathcer = LegacyPageDispathcer;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Wizard;
        (function (Wizard) {
            var WizardAction = (function () {
                function WizardAction(handler, text) {
                    this.handler = handler;
                    this.isVisible = ko.observable(true);
                    this.isDisabled = ko.observable(false);
                    this.text = text;
                }
                return WizardAction;
            }());
            Wizard.WizardAction = WizardAction;
        })(Wizard = Analytics.Wizard || (Analytics.Wizard = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Data;
    (function (Data) {
        var ConnectionOptions = (function (_super) {
            __extends(ConnectionOptions, _super);
            function ConnectionOptions() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ConnectionOptions;
        }(DevExpress.Analytics.Data.ConnectionOptions));
        Data.ConnectionOptions = ConnectionOptions;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "ConnectionOptions");
        var CustomSqlQuery = (function (_super) {
            __extends(CustomSqlQuery, _super);
            function CustomSqlQuery() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CustomSqlQuery;
        }(DevExpress.Analytics.Data.CustomSqlQuery));
        Data.CustomSqlQuery = CustomSqlQuery;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "CustomSqlQuery");
        Data.customQuerySerializationsInfo = DevExpress.Analytics.Data.customQuerySerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "customQuerySerializationsInfo");
        Data.masterDetailRelationSerializationsInfo = DevExpress.Analytics.Data.masterDetailRelationSerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "masterDetailRelationSerializationsInfo");
        var MasterDetailRelation = (function (_super) {
            __extends(MasterDetailRelation, _super);
            function MasterDetailRelation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MasterDetailRelation;
        }(DevExpress.Analytics.Data.MasterDetailRelation));
        Data.MasterDetailRelation = MasterDetailRelation;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "MasterDetailRelation");
        var SqlDataConnection = (function (_super) {
            __extends(SqlDataConnection, _super);
            function SqlDataConnection() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SqlDataConnection;
        }(DevExpress.Analytics.Data.SqlDataConnection));
        Data.SqlDataConnection = SqlDataConnection;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "SqlDataConnection");
        var SqlDataSource = (function (_super) {
            __extends(SqlDataSource, _super);
            function SqlDataSource() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SqlDataSource;
        }(DevExpress.Analytics.Data.SqlDataSource));
        Data.SqlDataSource = SqlDataSource;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "SqlDataSource");
        Data.storedProcQuerySerializationsInfo = DevExpress.Analytics.Data.storedProcQuerySerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "storedProcQuerySerializationsInfo");
        var StoredProcQuery = (function (_super) {
            __extends(StoredProcQuery, _super);
            function StoredProcQuery() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return StoredProcQuery;
        }(DevExpress.Analytics.Data.StoredProcQuery));
        Data.StoredProcQuery = StoredProcQuery;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "StoredProcQuery");
        Data.tableQuerySerializationsInfo = DevExpress.Analytics.Data.tableQuerySerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "tableQuerySerializationsInfo");
        var TableQuery = (function (_super) {
            __extends(TableQuery, _super);
            function TableQuery() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TableQuery;
        }(DevExpress.Analytics.Data.TableQuery));
        Data.TableQuery = TableQuery;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "TableQuery");
        Data.dsParameterNameValidationRules = DevExpress.Analytics.Data.dsParameterNameValidationRules;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "dsParameterNameValidationRules");
        Data.parameterValueSerializationsInfo = DevExpress.Analytics.Data.parameterValueSerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "parameterValueSerializationsInfo");
        Data.dsParameterSerializationInfo = DevExpress.Analytics.Data.dsParameterSerializationInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "dsParameterSerializationInfo");
        Data.storedProcParameterSerializationsInfo = DevExpress.Analytics.Data.storedProcParameterSerializationsInfo;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "storedProcParameterSerializationsInfo");
        Data.integerValueConverter = DevExpress.Analytics.Data.integerValueConverter;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "integerValueConverter");
        Data.floatValueConverter = DevExpress.Analytics.Data.floatValueConverter;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "floatValueConverter");
        var DataSourceParameter = (function (_super) {
            __extends(DataSourceParameter, _super);
            function DataSourceParameter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DataSourceParameter;
        }(DevExpress.Analytics.Data.DataSourceParameter));
        Data.DataSourceParameter = DataSourceParameter;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DataSourceParameter");
        Data.DBColumnType = DevExpress.Analytics.Data.DBColumnType;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBColumnType");
        var DBColumn = (function (_super) {
            __extends(DBColumn, _super);
            function DBColumn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBColumn;
        }(DevExpress.Analytics.Data.DBColumn));
        Data.DBColumn = DBColumn;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBColumn");
        var DBForeignKey = (function (_super) {
            __extends(DBForeignKey, _super);
            function DBForeignKey() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBForeignKey;
        }(DevExpress.Analytics.Data.DBForeignKey));
        Data.DBForeignKey = DBForeignKey;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBForeignKey");
        var DBSchema = (function (_super) {
            __extends(DBSchema, _super);
            function DBSchema() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBSchema;
        }(DevExpress.Analytics.Data.DBSchema));
        Data.DBSchema = DBSchema;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBSchema");
        Data.getDBSchemaCallback = DevExpress.Analytics.Data.getDBSchemaCallback;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "getDBSchemaCallback");
        var DBSchemaProvider = (function (_super) {
            __extends(DBSchemaProvider, _super);
            function DBSchemaProvider() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBSchemaProvider;
        }(DevExpress.Analytics.Data.DBSchemaProvider));
        Data.DBSchemaProvider = DBSchemaProvider;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBSchemaProvider");
        var DBStoredProcedure = (function (_super) {
            __extends(DBStoredProcedure, _super);
            function DBStoredProcedure() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBStoredProcedure;
        }(DevExpress.Analytics.Data.DBStoredProcedure));
        Data.DBStoredProcedure = DBStoredProcedure;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBStoredProcedure");
        Data.DBStoredProcedureArgumentDirection = DevExpress.Analytics.Data.DBStoredProcedureArgumentDirection;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBStoredProcedureArgumentDirection");
        var DBStoredProcedureArgument = (function (_super) {
            __extends(DBStoredProcedureArgument, _super);
            function DBStoredProcedureArgument() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBStoredProcedureArgument;
        }(DevExpress.Analytics.Data.DBStoredProcedureArgument));
        Data.DBStoredProcedureArgument = DBStoredProcedureArgument;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBStoredProcedureArgument");
        var DBTable = (function (_super) {
            __extends(DBTable, _super);
            function DBTable() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DBTable;
        }(DevExpress.Analytics.Data.DBTable));
        Data.DBTable = DBTable;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "DBTable");
        var ResultSet = (function (_super) {
            __extends(ResultSet, _super);
            function ResultSet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ResultSet;
        }(DevExpress.Analytics.Data.ResultSet));
        Data.ResultSet = ResultSet;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "ResultSet");
        var ResultTable = (function (_super) {
            __extends(ResultTable, _super);
            function ResultTable() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ResultTable;
        }(DevExpress.Analytics.Data.ResultTable));
        Data.ResultTable = ResultTable;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data, "ResultTable");
        Data.SqlQueryType = DevExpress.Analytics.Data.Utils.SqlQueryType;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data.Utils, "SqlQueryType");
        Data.generateQueryUniqueName = DevExpress.Analytics.Data.Utils.generateQueryUniqueName;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.Analytics.Data.Utils, "generateQueryUniqueName");
        var KeyColumnSurface = (function (_super) {
            __extends(KeyColumnSurface, _super);
            function KeyColumnSurface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return KeyColumnSurface;
        }(DevExpress.QueryBuilder.Widgets.KeyColumnSurface));
        Data.KeyColumnSurface = KeyColumnSurface;
        ;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.QueryBuilder.Widgets, "KeyColumnSurface");
        var MasterDetailEditor = (function (_super) {
            __extends(MasterDetailEditor, _super);
            function MasterDetailEditor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MasterDetailEditor;
        }(DevExpress.QueryBuilder.Widgets.MasterDetailEditor));
        Data.MasterDetailEditor = MasterDetailEditor;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.QueryBuilder.Widgets, "MasterDetailEditor");
        var MasterDetailEditorPopupManager = (function (_super) {
            __extends(MasterDetailEditorPopupManager, _super);
            function MasterDetailEditorPopupManager() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MasterDetailEditorPopupManager;
        }(DevExpress.QueryBuilder.Widgets.MasterDetailEditorPopupManager));
        Data.MasterDetailEditorPopupManager = MasterDetailEditorPopupManager;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.QueryBuilder.Widgets, "MasterDetailEditorPopupManager");
        var MasterDetailRelationSurface = (function (_super) {
            __extends(MasterDetailRelationSurface, _super);
            function MasterDetailRelationSurface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MasterDetailRelationSurface;
        }(DevExpress.QueryBuilder.Widgets.MasterDetailRelationSurface));
        Data.MasterDetailRelationSurface = MasterDetailRelationSurface;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.QueryBuilder.Widgets, "MasterDetailRelationSurface");
        var MasterQuerySurface = (function (_super) {
            __extends(MasterQuerySurface, _super);
            function MasterQuerySurface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return MasterQuerySurface;
        }(DevExpress.QueryBuilder.Widgets.MasterQuerySurface));
        Data.MasterQuerySurface = MasterQuerySurface;
        DevExpress.Analytics.Internal._defineProperty(DevExpress.Data, DevExpress.QueryBuilder.Widgets, "MasterQuerySurface");
    })(Data = DevExpress.Data || (DevExpress.Data = {}));
})(DevExpress || (DevExpress = {}));
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var QueryBuilder;
        (function (QueryBuilder) {
            var ColumnDragHandler = (function (_super) {
                __extends(ColumnDragHandler, _super);
                function ColumnDragHandler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ColumnDragHandler;
            }(DevExpress.QueryBuilder.Internal.ColumnDragHandler));
            QueryBuilder.ColumnDragHandler = ColumnDragHandler;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Internal, "ColumnDragHandler");
            var DbObjectDragDropHandler = (function (_super) {
                __extends(DbObjectDragDropHandler, _super);
                function DbObjectDragDropHandler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DbObjectDragDropHandler;
            }(DevExpress.QueryBuilder.Internal.DbObjectDragDropHandler));
            QueryBuilder.DbObjectDragDropHandler = DbObjectDragDropHandler;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Internal, "DbObjectDragDropHandler");
            QueryBuilder.allColumnsSerializationInfo = DevExpress.QueryBuilder.Elements.allColumnsSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "allColumnsSerializationInfo");
            var AllColumnsViewModel = (function (_super) {
                __extends(AllColumnsViewModel, _super);
                function AllColumnsViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return AllColumnsViewModel;
            }(DevExpress.QueryBuilder.Elements.AllColumnsViewModel));
            QueryBuilder.AllColumnsViewModel = AllColumnsViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "AllColumnsViewModel");
            var AllColumnsSurface = (function (_super) {
                __extends(AllColumnsSurface, _super);
                function AllColumnsSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return AllColumnsSurface;
            }(DevExpress.QueryBuilder.Elements.AllColumnsSurface));
            QueryBuilder.AllColumnsSurface = AllColumnsSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "AllColumnsSurface");
            QueryBuilder.ColumnType = DevExpress.QueryBuilder.Elements.ColumnType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "ColumnType");
            QueryBuilder.columnExpressionSerializationsInfo = DevExpress.QueryBuilder.Elements.columnExpressionSerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "columnExpressionSerializationsInfo");
            var ColumnExpression = (function (_super) {
                __extends(ColumnExpression, _super);
                function ColumnExpression() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ColumnExpression;
            }(DevExpress.QueryBuilder.Elements.ColumnExpression));
            QueryBuilder.ColumnExpression = ColumnExpression;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "ColumnExpression");
            var ColumnExpressionCollectionHelper = (function (_super) {
                __extends(ColumnExpressionCollectionHelper, _super);
                function ColumnExpressionCollectionHelper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ColumnExpressionCollectionHelper;
            }(DevExpress.QueryBuilder.Utils.ColumnExpressionCollectionHelper));
            QueryBuilder.ColumnExpressionCollectionHelper = ColumnExpressionCollectionHelper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Utils, "ColumnExpressionCollectionHelper");
            QueryBuilder.AggregationType = DevExpress.QueryBuilder.Elements.AggregationType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "AggregationType");
            QueryBuilder.columnSerializationInfo = DevExpress.QueryBuilder.Elements.columnSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "columnSerializationInfo");
            var ColumnViewModel = (function (_super) {
                __extends(ColumnViewModel, _super);
                function ColumnViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ColumnViewModel;
            }(DevExpress.QueryBuilder.Elements.ColumnViewModel));
            QueryBuilder.ColumnViewModel = ColumnViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "ColumnViewModel");
            var ColumnSurface = (function (_super) {
                __extends(ColumnSurface, _super);
                function ColumnSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return ColumnSurface;
            }(DevExpress.QueryBuilder.Elements.ColumnSurface));
            QueryBuilder.ColumnSurface = ColumnSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "ColumnSurface");
            QueryBuilder.ConditionType = DevExpress.QueryBuilder.Elements.ConditionType;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "ConditionType");
            QueryBuilder.joinConditionSerializationInfo = DevExpress.QueryBuilder.Elements.joinConditionSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "joinConditionSerializationInfo");
            var JoinConditionViewModel = (function (_super) {
                __extends(JoinConditionViewModel, _super);
                function JoinConditionViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return JoinConditionViewModel;
            }(DevExpress.QueryBuilder.Elements.JoinConditionViewModel));
            QueryBuilder.JoinConditionViewModel = JoinConditionViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "JoinConditionViewModel");
            var JoinConditionSurface = (function (_super) {
                __extends(JoinConditionSurface, _super);
                function JoinConditionSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return JoinConditionSurface;
            }(DevExpress.QueryBuilder.Elements.JoinConditionSurface));
            QueryBuilder.JoinConditionSurface = JoinConditionSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "JoinConditionSurface");
            var QueryElementBaseViewModel = (function (_super) {
                __extends(QueryElementBaseViewModel, _super);
                function QueryElementBaseViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueryElementBaseViewModel;
            }(DevExpress.QueryBuilder.Elements.QueryElementBaseViewModel));
            QueryBuilder.QueryElementBaseViewModel = QueryElementBaseViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "QueryElementBaseViewModel");
            var QueryElementBaseSurface = (function (_super) {
                __extends(QueryElementBaseSurface, _super);
                function QueryElementBaseSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueryElementBaseSurface;
            }(DevExpress.QueryBuilder.Elements.QueryElementBaseSurface));
            QueryBuilder.QueryElementBaseSurface = QueryElementBaseSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "QueryElementBaseSurface");
            var QueryViewModel = (function (_super) {
                __extends(QueryViewModel, _super);
                function QueryViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueryViewModel;
            }(DevExpress.QueryBuilder.Elements.QueryViewModel));
            QueryBuilder.QueryViewModel = QueryViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "QueryViewModel");
            QueryBuilder.querySerializationsInfo = DevExpress.QueryBuilder.Elements.querySerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "querySerializationsInfo");
            var QuerySurface = (function (_super) {
                __extends(QuerySurface, _super);
                function QuerySurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QuerySurface;
            }(DevExpress.QueryBuilder.Elements.QuerySurface));
            QueryBuilder.QuerySurface = QuerySurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "QuerySurface");
            QueryBuilder.relationSerializationInfo = DevExpress.QueryBuilder.Elements.relationSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "relationSerializationInfo");
            var RelationViewModel = (function (_super) {
                __extends(RelationViewModel, _super);
                function RelationViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RelationViewModel;
            }(DevExpress.QueryBuilder.Elements.RelationViewModel));
            QueryBuilder.RelationViewModel = RelationViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "RelationViewModel");
            var RelationSurface = (function (_super) {
                __extends(RelationSurface, _super);
                function RelationSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RelationSurface;
            }(DevExpress.QueryBuilder.Elements.RelationSurface));
            QueryBuilder.RelationSurface = RelationSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "RelationSurface");
            QueryBuilder.tableSerializationInfo = DevExpress.QueryBuilder.Elements.tableSerializationInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "tableSerializationInfo");
            var TableViewModel = (function (_super) {
                __extends(TableViewModel, _super);
                function TableViewModel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return TableViewModel;
            }(DevExpress.QueryBuilder.Elements.TableViewModel));
            QueryBuilder.TableViewModel = TableViewModel;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "TableViewModel");
            var TableSurface = (function (_super) {
                __extends(TableSurface, _super);
                function TableSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return TableSurface;
            }(DevExpress.QueryBuilder.Elements.TableSurface));
            QueryBuilder.TableSurface = TableSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Elements, "TableSurface");
            QueryBuilder.controlsFactory = DevExpress.QueryBuilder.Utils.controlsFactory;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Utils, "controlsFactory");
            QueryBuilder.registerControls = DevExpress.QueryBuilder.Utils.registerControls;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Utils, "registerControls");
            var QueryBuilderTreeListController = (function (_super) {
                __extends(QueryBuilderTreeListController, _super);
                function QueryBuilderTreeListController() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueryBuilderTreeListController;
            }(DevExpress.QueryBuilder.Utils.QueryBuilderTreeListController));
            QueryBuilder.QueryBuilderTreeListController = QueryBuilderTreeListController;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Utils, "QueryBuilderTreeListController");
            var RequestWrapper = (function (_super) {
                __extends(RequestWrapper, _super);
                function RequestWrapper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return RequestWrapper;
            }(DevExpress.QueryBuilder.Utils.RequestWrapper));
            QueryBuilder.RequestWrapper = RequestWrapper;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Utils, "RequestWrapper");
            QueryBuilder.editorTemplates = DevExpress.QueryBuilder.Widgets.editorTemplates;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "editorTemplates");
            var UndoEditor = (function (_super) {
                __extends(UndoEditor, _super);
                function UndoEditor() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return UndoEditor;
            }(DevExpress.QueryBuilder.Widgets.UndoEditor));
            QueryBuilder.UndoEditor = UndoEditor;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "UndoEditor");
            var GroupFilterEditorSerializer = (function (_super) {
                __extends(GroupFilterEditorSerializer, _super);
                function GroupFilterEditorSerializer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return GroupFilterEditorSerializer;
            }(DevExpress.QueryBuilder.Widgets.GroupFilterEditorSerializer));
            QueryBuilder.GroupFilterEditorSerializer = GroupFilterEditorSerializer;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "GroupFilterEditorSerializer");
            var OperandParameterQBSurface = (function (_super) {
                __extends(OperandParameterQBSurface, _super);
                function OperandParameterQBSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return OperandParameterQBSurface;
            }(DevExpress.QueryBuilder.Widgets.OperandParameterQBSurface));
            QueryBuilder.OperandParameterQBSurface = OperandParameterQBSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "OperandParameterQBSurface");
            var OperandPropertyQBSurface = (function (_super) {
                __extends(OperandPropertyQBSurface, _super);
                function OperandPropertyQBSurface() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return OperandPropertyQBSurface;
            }(DevExpress.QueryBuilder.Widgets.OperandPropertyQBSurface));
            QueryBuilder.OperandPropertyQBSurface = OperandPropertyQBSurface;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "OperandPropertyQBSurface");
            QueryBuilder.isAggregatedExpression = DevExpress.QueryBuilder.Widgets.isAggregatedExpression;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "isAggregatedExpression");
            var QueryBuilderObjectsProvider = (function (_super) {
                __extends(QueryBuilderObjectsProvider, _super);
                function QueryBuilderObjectsProvider() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return QueryBuilderObjectsProvider;
            }(DevExpress.QueryBuilder.Widgets.QueryBuilderObjectsProvider));
            QueryBuilder.QueryBuilderObjectsProvider = QueryBuilderObjectsProvider;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder.Widgets, "QueryBuilderObjectsProvider");
            QueryBuilder.ActionId = DevExpress.QueryBuilder.ActionId;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "ActionId");
            QueryBuilder.HandlerUri = DevExpress.QueryBuilder.HandlerUri;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "HandlerUri");
            QueryBuilder.updateQueryBuilderSurfaceContentSize = DevExpress.QueryBuilder.updateQueryBuilderSurfaceContentSize;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "updateQueryBuilderSurfaceContentSize");
            QueryBuilder.createIsLoadingFlag = DevExpress.QueryBuilder.createIsLoadingFlag;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "createIsLoadingFlag");
            QueryBuilder.isJoinsResolvingDisabled = DevExpress.QueryBuilder.isJoinsResolvingDisabled;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "isJoinsResolvingDisabled");
            QueryBuilder.createQueryBuilder = DevExpress.QueryBuilder.createQueryBuilder;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "createQueryBuilder");
            QueryBuilder.name = DevExpress.QueryBuilder.name;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "name");
            QueryBuilder.alias = DevExpress.QueryBuilder.alias;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "alias");
            QueryBuilder.text = DevExpress.QueryBuilder.text;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "text");
            QueryBuilder.selected = DevExpress.QueryBuilder.selected;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "selected");
            QueryBuilder.size = DevExpress.QueryBuilder.size;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "size");
            QueryBuilder.location = DevExpress.QueryBuilder.location;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "location");
            QueryBuilder.sizeLocation = DevExpress.QueryBuilder.sizeLocation;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "sizeLocation");
            QueryBuilder.unknownSerializationsInfo = DevExpress.QueryBuilder.unknownSerializationsInfo;
            DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.QueryBuilder, DevExpress.QueryBuilder, "unknownSerializationsInfo");
        })(QueryBuilder = Designer.QueryBuilder || (Designer.QueryBuilder = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
(function (DevExpress) {
    var Designer;
    (function (Designer) {
        var Report;
        (function (Report) {
            var Wizard;
            (function (Wizard) {
                var CommonParametersPage = (function (_super) {
                    __extends(CommonParametersPage, _super);
                    function CommonParametersPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return CommonParametersPage;
                }(DevExpress.Analytics.Wizard.CommonParametersPage));
                Wizard.CommonParametersPage = CommonParametersPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "CommonParametersPage");
                var LegacyPageDispathcer = (function (_super) {
                    __extends(LegacyPageDispathcer, _super);
                    function LegacyPageDispathcer() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return LegacyPageDispathcer;
                }(DevExpress.Analytics.Wizard.LegacyPageDispathcer));
                Wizard.LegacyPageDispathcer = LegacyPageDispathcer;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "LegacyPageDispathcer");
                var WizardAction = (function (_super) {
                    __extends(WizardAction, _super);
                    function WizardAction() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return WizardAction;
                }(DevExpress.Analytics.Wizard.WizardAction));
                Wizard.WizardAction = WizardAction;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "WizardAction");
                var WizardViewModel = (function (_super) {
                    __extends(WizardViewModel, _super);
                    function WizardViewModel() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return WizardViewModel;
                }(DevExpress.Analytics.Wizard.WizardViewModel));
                Wizard.WizardViewModel = WizardViewModel;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "WizardViewModel");
                var WizardPage = (function (_super) {
                    __extends(WizardPage, _super);
                    function WizardPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return WizardPage;
                }(DevExpress.Analytics.Wizard.WizardPage));
                Wizard.WizardPage = WizardPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "WizardPage");
                var MultiQueryConfigurePage = (function (_super) {
                    __extends(MultiQueryConfigurePage, _super);
                    function MultiQueryConfigurePage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return MultiQueryConfigurePage;
                }(DevExpress.Analytics.Wizard.MultiQueryConfigurePage));
                Wizard.MultiQueryConfigurePage = MultiQueryConfigurePage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "MultiQueryConfigurePage");
                var MasterDetailRelationsPage = (function (_super) {
                    __extends(MasterDetailRelationsPage, _super);
                    function MasterDetailRelationsPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return MasterDetailRelationsPage;
                }(DevExpress.Analytics.Wizard.MasterDetailRelationsPage));
                Wizard.MasterDetailRelationsPage = MasterDetailRelationsPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "MasterDetailRelationsPage");
                var MultiQueryConfigureParametersPage = (function (_super) {
                    __extends(MultiQueryConfigureParametersPage, _super);
                    function MultiQueryConfigureParametersPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return MultiQueryConfigureParametersPage;
                }(DevExpress.Analytics.Wizard.MultiQueryConfigureParametersPage));
                Wizard.MultiQueryConfigureParametersPage = MultiQueryConfigureParametersPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "MultiQueryConfigureParametersPage");
                var MultiQueryDataSourceWizard = (function (_super) {
                    __extends(MultiQueryDataSourceWizard, _super);
                    function MultiQueryDataSourceWizard() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return MultiQueryDataSourceWizard;
                }(DevExpress.Analytics.Wizard.MultiQueryDataSourceWizard));
                Wizard.MultiQueryDataSourceWizard = MultiQueryDataSourceWizard;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "MultiQueryDataSourceWizard");
                var MultiQueryDataSourceWizardModel = (function (_super) {
                    __extends(MultiQueryDataSourceWizardModel, _super);
                    function MultiQueryDataSourceWizardModel() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return MultiQueryDataSourceWizardModel;
                }(DevExpress.Analytics.Wizard.MultiQueryDataSourceWizardModel));
                Wizard.MultiQueryDataSourceWizardModel = MultiQueryDataSourceWizardModel;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "MultiQueryDataSourceWizardModel");
                var ConfigureParametersPage = (function (_super) {
                    __extends(ConfigureParametersPage, _super);
                    function ConfigureParametersPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ConfigureParametersPage;
                }(DevExpress.Analytics.Wizard.ConfigureParametersPage));
                Wizard.ConfigureParametersPage = ConfigureParametersPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "ConfigureParametersPage");
                var CreateQueryPage = (function (_super) {
                    __extends(CreateQueryPage, _super);
                    function CreateQueryPage() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return CreateQueryPage;
                }(DevExpress.Analytics.Wizard.CreateQueryPage));
                Wizard.CreateQueryPage = CreateQueryPage;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "CreateQueryPage");
                var SqlDataSourceWizardModel = (function (_super) {
                    __extends(SqlDataSourceWizardModel, _super);
                    function SqlDataSourceWizardModel() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SqlDataSourceWizardModel;
                }(DevExpress.Analytics.Wizard.SqlDataSourceWizardModel));
                Wizard.SqlDataSourceWizardModel = SqlDataSourceWizardModel;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "SqlDataSourceWizardModel");
                var SelectConnectionString = (function (_super) {
                    __extends(SelectConnectionString, _super);
                    function SelectConnectionString() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SelectConnectionString;
                }(DevExpress.Analytics.Wizard.SelectConnectionString));
                Wizard.SelectConnectionString = SelectConnectionString;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "SelectConnectionString");
                var SqlDataSourceWizard = (function (_super) {
                    __extends(SqlDataSourceWizard, _super);
                    function SqlDataSourceWizard() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SqlDataSourceWizard;
                }(DevExpress.Analytics.Wizard.SqlDataSourceWizard));
                Wizard.SqlDataSourceWizard = SqlDataSourceWizard;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard, "SqlDataSourceWizard");
                var ParametersTreeListItem = (function (_super) {
                    __extends(ParametersTreeListItem, _super);
                    function ParametersTreeListItem() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ParametersTreeListItem;
                }(DevExpress.Analytics.Wizard.Utils.ParametersTreeListItem));
                Wizard.ParametersTreeListItem = ParametersTreeListItem;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "ParametersTreeListItem");
                var ParametersTreeListRootItem = (function (_super) {
                    __extends(ParametersTreeListRootItem, _super);
                    function ParametersTreeListRootItem() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ParametersTreeListRootItem;
                }(DevExpress.Analytics.Wizard.Utils.ParametersTreeListRootItem));
                Wizard.ParametersTreeListRootItem = ParametersTreeListRootItem;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "ParametersTreeListRootItem");
                var ParametersTreeListController = (function (_super) {
                    __extends(ParametersTreeListController, _super);
                    function ParametersTreeListController() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ParametersTreeListController;
                }(DevExpress.Analytics.Wizard.Utils.ParametersTreeListController));
                Wizard.ParametersTreeListController = ParametersTreeListController;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "ParametersTreeListController");
                var DBSchemaItemsProvider = (function (_super) {
                    __extends(DBSchemaItemsProvider, _super);
                    function DBSchemaItemsProvider() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return DBSchemaItemsProvider;
                }(DevExpress.Analytics.Wizard.Utils.DBSchemaItemsProvider));
                Wizard.DBSchemaItemsProvider = DBSchemaItemsProvider;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "DBSchemaItemsProvider");
                var DBSchemaTreeListController = (function (_super) {
                    __extends(DBSchemaTreeListController, _super);
                    function DBSchemaTreeListController() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return DBSchemaTreeListController;
                }(DevExpress.Analytics.Wizard.Utils.DBSchemaTreeListController));
                Wizard.DBSchemaTreeListController = DBSchemaTreeListController;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "DBSchemaTreeListController");
                var QueryBuilderPopup = (function (_super) {
                    __extends(QueryBuilderPopup, _super);
                    function QueryBuilderPopup() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return QueryBuilderPopup;
                }(DevExpress.Analytics.Wizard.Utils.QueryBuilderPopup));
                Wizard.QueryBuilderPopup = QueryBuilderPopup;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "QueryBuilderPopup");
                var SelectQuerySqlTextProvider = (function (_super) {
                    __extends(SelectQuerySqlTextProvider, _super);
                    function SelectQuerySqlTextProvider() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SelectQuerySqlTextProvider;
                }(DevExpress.Analytics.Wizard.Utils.SelectQuerySqlTextProvider));
                Wizard.SelectQuerySqlTextProvider = SelectQuerySqlTextProvider;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "SelectQuerySqlTextProvider");
                var SelectStatementQueryControl = (function (_super) {
                    __extends(SelectStatementQueryControl, _super);
                    function SelectStatementQueryControl() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SelectStatementQueryControl;
                }(DevExpress.Analytics.Wizard.Utils.SelectStatementQueryControl));
                Wizard.SelectStatementQueryControl = SelectStatementQueryControl;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "SelectStatementQueryControl");
                var StoredProceduresQueryControl = (function (_super) {
                    __extends(StoredProceduresQueryControl, _super);
                    function StoredProceduresQueryControl() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return StoredProceduresQueryControl;
                }(DevExpress.Analytics.Wizard.Utils.StoredProceduresQueryControl));
                Wizard.StoredProceduresQueryControl = StoredProceduresQueryControl;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "StoredProceduresQueryControl");
                var TreeNodeBase = (function (_super) {
                    __extends(TreeNodeBase, _super);
                    function TreeNodeBase() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return TreeNodeBase;
                }(DevExpress.Analytics.Wizard.Utils.TreeNodeBase));
                Wizard.TreeNodeBase = TreeNodeBase;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "TreeNodeBase");
                var TreeLeafNode = (function (_super) {
                    __extends(TreeLeafNode, _super);
                    function TreeLeafNode() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return TreeLeafNode;
                }(DevExpress.Analytics.Wizard.Utils.TreeLeafNode));
                Wizard.TreeLeafNode = TreeLeafNode;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "TreeLeafNode");
                var TreeNode = (function (_super) {
                    __extends(TreeNode, _super);
                    function TreeNode() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return TreeNode;
                }(DevExpress.Analytics.Wizard.Utils.TreeNode));
                Wizard.TreeNode = TreeNode;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "TreeNode");
                var ParameterTreeNode = (function (_super) {
                    __extends(ParameterTreeNode, _super);
                    function ParameterTreeNode() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ParameterTreeNode;
                }(DevExpress.Analytics.Wizard.Utils.ParameterTreeNode));
                Wizard.ParameterTreeNode = ParameterTreeNode;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "ParameterTreeNode");
                var QueriesTreeNode = (function (_super) {
                    __extends(QueriesTreeNode, _super);
                    function QueriesTreeNode() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return QueriesTreeNode;
                }(DevExpress.Analytics.Wizard.Utils.QueriesTreeNode));
                Wizard.QueriesTreeNode = QueriesTreeNode;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "QueriesTreeNode");
                var TreeQueryNode = (function (_super) {
                    __extends(TreeQueryNode, _super);
                    function TreeQueryNode() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return TreeQueryNode;
                }(DevExpress.Analytics.Wizard.Utils.TreeQueryNode));
                Wizard.TreeQueryNode = TreeQueryNode;
                DevExpress.Analytics.Internal._defineProperty(DevExpress.Designer.Report.Wizard, DevExpress.Analytics.Wizard.Utils, "TreeQueryNode");
            })(Wizard = Report.Wizard || (Report.Wizard = {}));
        })(Report = Designer.Report || (Designer.Report = {}));
    })(Designer = DevExpress.Designer || (DevExpress.Designer = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            Widgets.expressionFunctions = (function (addins) { return DevExpress.Analytics.Widgets.Internal.insertInFunctionDisplay(addins); })({
                "String": {
                    "CreateTable": [{ paramCount: 1, text: "CreateTable(, )", displayName: "CreateTable(Column1, ..., ColumnN)", descriptionStringId: "ExpressionEditorStringId.Function_CreateTable" }]
                }
            });
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
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
                    _this.mapper.Parameter = Widgets.OperandParameterQBSurface;
                    _this.mapper.Property = Widgets.OperandPropertyQBSurface;
                    if (parametersMode === QueryBuilder.Elements.ParametersMode.ReadWrite) {
                        _this.canCreateParameters = true;
                        _this.newParameters = ko.observableArray([]);
                        _this.onEditorFocusOut = function (criteria) {
                            if (!criteria)
                                return;
                            var parameters = _this.newParameters();
                            var usesParameters = [];
                            DevExpress.Analytics.Criteria.Utils.criteriaForEach(criteria, function (child) {
                                if (child instanceof DevExpress.Analytics.Criteria.OperandParameter) {
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
            }(DevExpress.Analytics.Widgets.FilterEditorHelper));
            Widgets.QBFilterEditorHelper = QBFilterEditorHelper;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var QueryBuilder;
    (function (QueryBuilder) {
        var Widgets;
        (function (Widgets) {
            var QBFilterStringOptions = (function (_super) {
                __extends(QBFilterStringOptions, _super);
                function QBFilterStringOptions(filterString, dataMember, disabled, title) {
                    return _super.call(this, filterString, dataMember, disabled, title) || this;
                }
                QBFilterStringOptions.prototype.initializeFilterStringHelper = function (parameters, parametersMode, serializer) {
                    var _this = this;
                    var helper = new Widgets.QBFilterEditorHelper(parametersMode);
                    helper.canChoiceParameters = parametersMode !== QueryBuilder.Elements.ParametersMode.Disabled;
                    if (serializer) {
                        helper.serializer = serializer;
                    }
                    if (parametersMode === QueryBuilder.Elements.ParametersMode.ReadWrite) {
                        helper.parameters = ko.computed(function () { return [].concat(parameters(), helper.newParameters()); });
                        helper.onSave = function (operandProperty) {
                            var newParameters = helper.newParameters();
                            parameters.push.apply(parameters, newParameters);
                            helper.newParameters([]);
                        };
                    }
                    else {
                        if (parametersMode === QueryBuilder.Elements.ParametersMode.Read)
                            helper.parameters = parameters;
                        var oldCheckRightPart = helper.criteriaTreeValidator._checkRightPart;
                        helper.criteriaTreeValidator._checkRightPart = function (criteriaOperator) {
                            if (!(criteriaOperator instanceof DevExpress.Analytics.Criteria.OperandParameter))
                                return oldCheckRightPart.apply(_this, [criteriaOperator]);
                            if (parametersMode === QueryBuilder.Elements.ParametersMode.Disabled) {
                                return false;
                            }
                            else if (parametersMode === QueryBuilder.Elements.ParametersMode.Read) {
                                var parameterName = criteriaOperator.parameterName;
                                return parameters.peek().filter(function (x) { return x.name() === parameterName; }).length !== 0;
                            }
                        };
                    }
                    this.helper = helper;
                };
                return QBFilterStringOptions;
            }(DevExpress.Analytics.Widgets.FilterStringOptions));
            Widgets.QBFilterStringOptions = QBFilterStringOptions;
        })(Widgets = QueryBuilder.Widgets || (QueryBuilder.Widgets = {}));
    })(QueryBuilder = DevExpress.QueryBuilder || (DevExpress.QueryBuilder = {}));
})(DevExpress || (DevExpress = {}));
var DevExpress;
(function (DevExpress) {
    var Analytics;
    (function (Analytics) {
        var Templates;
        (function (Templates) {
            DevExpress.Analytics.Widgets.Internal.SvgTemplatesEngine.addTemplates({
                'dxdd-connection-line': '<svg class="dxdd-connection-line" style="width:100%; height: 100%">        <line class="dxd-qb-relationship-line-color" data-bind="attr: { x1: startPoint().relativeX, y1: startPoint().relativeY, x2: endPoint().relativeX, y2: endPoint().relativeY }" />    </svg>',
                'dxdd-connecting-point': '<div class="dxdd-connecting-point" data-bind="styleunit: position, trackCursor: underCursor, style: { \'marginLeft\': -3 * _context.zoom() + \'px\', \'marginTop\': -3 * _context.zoom() + \'px\' }, draggable: $root.connectingPointDragHandler">        <svg style="width:100%; height: 100%">            <line x1="0" y1="0" x2="100%" y2="100%" />            <line x1=0 y1="100%" x2="100%" y2="0" />        </svg>    </div>',
                'dxdd-connection-point-selection': '<div class="dxrd-control" data-bind="draggable: $root.connectionPointDragHandler, styleunit: { top: relativeY, left: relativeX }">    </div>',
                'dxdd-connector': '<div class="dxdd-connector" data-bind="styleunit: position, trackCursor: underCursor">        <!-- ko template: { name: \'dxdd-connection-line\' } -->        <!-- /ko -->    </div>',
                'dxdd-connector-selection': '<div class="dxdd-connector" data-bind="styleunit: position, dxAction: function() {}, draggable: $root.dragHandler">        <!-- ko template: { name: \'dxdd-connection-line\' } -->        <!-- /ko -->        <!-- ko with: startPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko with: endPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->    </div>',
                'dxdd-routed-connection-line': '<svg class="dxdd-connection-line">        <!-- ko if: showArrow -->        <defs>            <marker data-bind="attr: { id: \'dxqb-arrow_\' + connectorID() }" viewBox="0 0 5 10" refX="5" refY="5"                    markerUnits="userSpaceOnUse" orient="auto"                    markerWidth="14" markerHeight="14">                <polyline class="dxd-qb-relationship-line-color" points="0,0 5,5 0,10" />            </marker>        </defs>        <!-- /ko -->        <polyline class="dxd-qb-relationship-line-color" fill="none" data-bind="attr: { points: routePointsSet, \'marker-end\': showArrow() ? \'url(#dxqb-arrow_\' + connectorID() + \')\' : \'\' }, updateConnectorArrow: $data" />    </svg>',
                'dxdd-routed-connector': '<div class="dxdd-connector" data-bind="styleunit: position, visible: isVisible">        <!-- ko template: { name: \'dxdd-routed-connection-line\' } -->        <!-- /ko -->        <!-- ko foreach: routeLineWrappers -->        <div data-bind="styleunit: position" style="position: absolute;">            <!-- ko with: $parent -->            <div class="dxd-selectable" data-bind="trackCursor: underCursor, click: $root.selectItemProperties" style="position: relative; width: 100%; height: 100%;"></div>            <!-- /ko -->        </div>        <!-- /ko -->    </div>',
                'dxdd-routed-connector-selection': '<div class="dxdd-connector dxrd-selected dxd-state-selected" data-bind="styleunit: position, dxAction: function() {}, visible: isVisible">        <!-- ko template: { name: \'dxdd-routed-connection-line\' } -->        <!-- /ko -->        <!-- ko foreach: routeLineWrappers -->        <!-- ko ifnot: isLocked -->        <div data-bind="styleunit: position, style: { cursor: isVerticalLine ? \'ew-resize\' : \'ns-resize\' }, routeLineDraggable: { starting: $root.resizeHandler.starting, stopped: function() { resizeStopped(); $root.resizeHandler.stopped(); }, forceResize: resizeHandler }" style="position: absolute;">        </div>        <!-- /ko -->        <!-- ko if: isLocked -->        <div data-bind="styleunit: position" style="position: absolute;">        </div>        <!-- /ko -->        <!-- /ko -->        <!-- ko with: startPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko with: endPoint -->        <!-- ko template: { name: \'dxdd-connection-point-selection\' } -->        <!-- /ko -->        <!-- /ko -->    </div>',
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
                'dxrd-masterDetail-editor': '<!-- ko if: $data -->    <div>        <div class="dx-filtereditor" data-bind="dxPopup: { showTitle: true, width: \'95%\', height: \'95%\', title: title(), visible: popupVisible,                 toolbarItems: buttonItems, showCloseButton: true, container: $root.getPopupContainer($element), position: { of: $root.getPopupContainer($element) },             }">            <div class="dx-filtereditor-tree dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', direction: \'both\' }" style="cursor: default">                <!-- ko foreach: masterQueries -->                <div class="criteria-operator-group">                    <div class="criteria-operator-group-item">                        <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-group dxd-filter-editor-group-back-color stylized" data-bind="text: queryName"></div>                        <div data-bind="service: { name: \'createRelation\' }"></div>                    </div>                    <div class="criteria-operator-content">                        <!-- ko template: { name: \'dx-masterDetail-editor-relation\', foreach: relations }-->                        <!-- /ko -->                    </div>                </div>                <!-- /ko -->            </div>        </div>        <div class="dx-selectbox-popup-wrapper dx-dropdownlist-popup-wrapper dx-filtereditor-criteriaoperator-popup dx-dropdowneditor-overlay" data-bind="dxPopupWithAutoHeight: { width: \'170px\', height: \'300px\', focusStateEnabled: false,        position: $root.rtl ? { my: \'right top\', at: \'right bottom\', of: popupService.target } : { my: \'left top\', at: \'left bottom\', of: popupService.target },        container: \'.dx-designer-viewport\',        target: popupService.target,        showTitle: false,        showCloseButton: false,        animation: {},        closeOnOutsideClick: true,        shading: false,        visible: popupService.visible }">            <!-- ko with: popupService-->            <!-- ko with: data -->            <!-- ko template: template-->            <!-- /ko -->            <!-- /ko -->            <!-- /ko -->        </div>    </div>    <!-- /ko -->',
                'dx-masterDetail-editor-keyColumn': '<div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-field dxd-filter-editor-field-back-color stylized" data-bind="text: queryName"></div>    <div class="criteria-operator-text dxd-filter-editor-text-color">.</div>    <div class="criteria-operator-text dxd-filter-editor-text-color">        <div data-bind="service: { name: \'setColumn\' }"></div>    </div>',
                'dx-masterDetail-editor-relation': '<div class="criteria-operator-group">        <div class="criteria-operator-group-item">            <div class="criteria-operator-action" data-bind="dxAction: function() {  $parent.remove($data); }">                <div class="criteria-operator-action-image dx-image-filtereditor-remove"><!-- ko template: \'dxrd-svg-filtereditor-remove\' --><!-- /ko --></div>            </div>            <div class="criteria-operator-item" data-bind="visible: isEditable">                <div class="criteria-operator-item-editor" data-bind="dxTextBox: { value: relationName, onFocusOut: function() { isEditable(false); } }, focus: { on: isEditable }"></div>            </div>            <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-value dxd-filter-editor-value-back-color" data-bind="visible: !isEditable()">                <div class="criteria-operator-text dxd-filter-editor-text-color clickable" data-bind="text: relationName, click: function() { isEditable(true); }"></div>            </div>            <div class="criteria-operator-action" data-bind="dxAction: create">                <div class="criteria-operator-action-image dx-image-filtereditor-add"><!-- ko template: \'dxrd-svg-filtereditor-add\' --><!-- /ko --></div>            </div>        </div>        <div class="criteria-operator-content">            <!-- ko foreach: keyColumns -->            <div class="criteria-operator-group">                <div class="criteria-operator-group-item">                    <div class="criteria-operator-action" data-bind="dxAction: function() {  $parent.remove($data); }">                        <div class="criteria-operator-action-image dx-image-filtereditor-remove"><!-- ko template: \'dxrd-svg-filtereditor-remove\' --><!-- /ko --></div>                    </div>                    <!-- ko template: { name: \'dx-masterDetail-editor-keyColumn\', data: master } -->                    <!-- /ko -->                    <div class="criteria-operator-text dxd-filter-editor-text-color"> = </div>                    <!-- ko template: { name: \'dx-masterDetail-editor-keyColumn\', data: detail } -->                    <!-- /ko -->                </div>            </div>            <!-- /ko -->        </div>    </div>',
                'dx-masterdetail-editor-setColumn': '<div class="criteria-operator-text dxd-filter-editor-text-color clickable criteria-operator-item-field dxd-filter-editor-field-back-color" data-bind="text: target.column() || target.selectColumnText(), dxAction: showPopup, css: { \'dxd-state-selected\': target.isSelected, \'default\': !target.column() }"></div>',
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
                'dxqb-toolbar-items': '<!-- ko foreach: $data -->    <!-- ko if: $data.templateName -->    <!-- ko template: templateName  -->    <!-- /ko -->    <!-- /ko -->    <!-- ko if: !$data.templateName -->    <div class="dxrd-toolbar-item" data-bind="visible: visible">        <div class="dxqb-toolbar-item-container">            <div class="dxqb-toolbar-item-background dxd-back-secondary"></div>            <div data-bind="template: {name: ko.unwrap($data.imageTemplateName), if: !!ko.unwrap($data.imageTemplateName)}, attr: { class: \'dxrd-toolbar-item-image dxd-button-back-color dxd-state-normal dxd-back-highlighted \' + (ko.unwrap($data.imageClassName) || \'\'), title: $data.displayText && $data.displayText() || text }, dxAction: function() { if((typeof $data.disabled === \'function\') && !disabled() || !disabled) { clickAction($root.model && $root.model()); } }, css: {\'dxrd-disabled-button\': disabled, \'dxd-state-active\': $data.selected }"> </div>                    </div>        <div class="dxrd-toolbar-item-separator dxd-toolbar-separator-color dxd-border-secondary" data-bind="visible: $data.hasSeparator"></div>    </div>    <!-- /ko -->    <!-- /ko -->',
                'dxqb-property-editor': '<div class="dxrd-editor" data-bind="visible: visible">        <div class="dxrd-editor-header">            <div class="dx-field dxd-back-primary">                <div class="dx-field-label dxd-text-primary">                    <div class="propertygrid-editor-displayName" data-bind="text: displayName, attr: { \'title\': displayName }"></div>                </div>                <div class="dx-field-value">                    <div data-bind="service: { name: \'createEditorAddOn\' }"></div>                    <!-- ko lazy: { template: templateName } -->                    <!-- /ko -->                </div>            </div>        </div>    </div>',
                'dxqb-expressionstring': '<!-- ko if: $data.value() -->    <div data-bind="dxExpressionEditor: getOptions({ options: value, fieldListProvider: $root.parametersBindingsProvider, displayNameProvider: $root.displayNameProvider && $root.displayNameProvider() })"></div>    <!-- /ko -->',
                'dxqb-filtereditor-changeparameter': '<div class="criteria-operator-item" data-bind="visible: target.isEditable">        <div class="criteria-operator-item" data-bind="dxTextBox: { value: target._parameterName, onFocusOut: function() { target.createParameter(); target.isEditable(false); } }"></div>    </div>    <div class="criteria-operator-text dxd-filter-editor-text-color clickable " data-bind="text: target.parameterName, dxAction: showPopup, css: { \'dxd-state-selected\': target.isSelected, \'default\': target.isDefaultTextDisplayed() }, visible: $data.target.isEditable() === false"></div>',
                'dxqb-filtereditor-propertiespopup': '<div class="dx-widget" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">        <!-- ko foreach: data -->        <div data-bind="dxdAccordion: { collapsed: collapsed }">            <div class="dx-accordion-header">                <div class="dx-filtereditor-popup-item dxd-list-item-back-color dx-item dx-list-item dxd-back-highlighted">                    <div class="dx-collapsing-image" data-bind="template: \'dxrd-svg-collapsed\', css: { \'dx-image-expanded\': !collapsed() }" style="display:inline-block;  margin-left: 5px;"></div>                    <span class="dx-item-content dx-list-item-content" style="padding-left: 17px" data-bind="text: name"></span>                </div>            </div>            <div class="dx-accordion-content dxd-back-primary">                <!-- ko foreach: items -->                <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">                    <span class="dx-item-content dx-list-item-content" style="padding-left: 17px" data-bind="text: name, attr: { \'title\': name }, click: function() { $parents[1].click($data); }"></span>                </div>                <!--/ko -->            </div>        </div>        <!--/ko -->    </div>',
                'dxqb-filtereditor-parameterspopup': '<div class="dx-widget" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">        <!-- ko if: $parent.viewModel.canCreateParameters -->        <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">            <span class="dx-item-content dx-list-item-content" data-bind="text: $parent.viewModel.defaultDisplay(), click: function() { $parent.viewModel.isEditable(true); $parent.viewModel._parameterName(\'\'); $parent.visible(false); }"></span>        </div>        <!-- /ko -->        <!-- ko foreach: data -->        <div class="dx-filtereditor-popup-item dx-item dx-list-item dxd-list-item-back-color dxd-back-highlighted">            <span class="dx-item-content dx-list-item-content" data-bind="text: name, click: function() { $parent.click($data); } "></span>        </div>        <!-- /ko -->    </div>',
                'dxqb-treelist-item-with-search': '<div data-bind="visible: visible">        <!-- ko template: "dxqb-treelist-header-item-with-search" -->        <!-- /ko -->    </div>',
                'dxqb-treelist-header-item-with-search': '<div class="dx-treelist-item dxd-list-item-back-color dxd-back-highlighted" data-bind="event: { dblclick: function() { $data.dblClickHandler ? $data.dblClickHandler($data) : $data.toggleCollapsed() } }, styleunit: padding, css: { \'dx-treelist-item-selected dxd-state-selected\': isSelected() || isMultiSelected() }">        <div class="dx-treelist-collapsedbutton"></div>        <div class="dx-treelist-caption">            <div class="dx-treelist-selectedcontent" data-bind="click: toggleSelected,  draggable: isDraggable ? dragDropHandler : null">                <div class="dx-treelist-image" data-bind="css: $data.imageClassName, template: {name: $data.imageTemplateName, if: !!ko.unwrap($data.imageTemplateName)}, attr: { title: text }"> </div>                <div class="dx-treelist-text-wrapper">                    <!-- ko if: treeListController && !!$data.treeListController.searchName -->                    <div class="dx-treelist-text dxdr-highlighted-search-text" data-bind="searchHighlighting: { text: text, textToSearch: treeListController.searchName }, attr: { title: text }"></div>                    <!-- /ko -->                </div>            </div>        </div>    </div>',
                'dxrd-wizard-add-queries-page': '<div class="dxrd-wizard-page dxrd-wizard-add-queries-page">        <div class="dxrd-wizard-dataMember dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', height: scrollViewHeight }">            <div data-bind="treelist: fieldListModel" style="width:100%; height: 100%;"></div>        </div>        <!-- ko ifnot: $data.disableCustomSql -->        <!-- ko template: { name: \'dxqb-popup-selectStatment\', data: popupSelectStatment } -->        <!-- /ko -->        <!-- /ko -->        <!-- ko template: { name: \'dxrd-querybuilder-popup\', data: popupQueryBuilder } -->        <!-- /ko -->        <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel: loadPanelViewModel($element)">        </div>    </div>',
                'dxrd-configure-query-parameters-page': '<div class="dxrd-wizard-page dxrd-configure-query-parameters-page">        <div class="dxrd-wizard-dataMember dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', height: scrollViewHeight }">            <div data-bind="treelist: fieldListModel" style="width:100%; height: 100%;"></div>        </div>    </div>',
                'dxrd-wizard-configure-relations-page': '<div class="dxrd-wizard-page dxrd-wizard-configure-relations-page">        <!-- ko if: $data.relationsEditor() -->        <!-- ko template: { name: \'dxrd-masterDetail-editor-complete-wizard\', data: $data.relationsEditor }-->        <!-- /ko -->        <!-- /ko -->    </div>',
                'dxrd-masterDetail-editor-complete-wizard': '<div class="dx-filtereditor dxrd-masterDetail-editor-complete-wizard dxd-border-secondary">        <!-- ko if: $data -->        <div class="dx-filtereditor-tree dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\', direction: \'both\' }" style="cursor: default">            <!-- ko foreach: masterQueries -->            <div class="criteria-operator-group">                <div class="criteria-operator-group-item">                    <div class="criteria-operator-text dxd-filter-editor-text-color criteria-operator-item-group dxd-filter-editor-group-back-color stylized" data-bind="text: queryName"></div>                    <div data-bind="service: { name: \'createRelation\' }"></div>                </div>                <div class="criteria-operator-content">                    <!-- ko template: { name: \'dx-masterDetail-editor-relation\', foreach: relations }-->                    <!-- /ko -->                </div>            </div>            <!-- /ko -->        </div>        <div class="dx-selectbox-popup-wrapper dx-dropdownlist-popup-wrapper dx-filtereditor-criteriaoperator-popup dx-dropdowneditor-overlay" data-bind="dxPopupWithAutoHeight: { width: \'170px\', height: \'235px\', focusStateEnabled: false,        position: $root.rtl ? { my: \'right top\', at: \'right bottom\', of: popupService.target } : { my: \'left top\', at: \'left bottom\', of: popupService.target },        container: \'.dx-designer-viewport\',        target: popupService.target,        showTitle: false,        showCloseButton: false,        animation: {},        closeOnOutsideClick: true,        shading: false,        visible: popupService.visible }">            <!-- ko with: popupService-->            <!-- ko with: data -->            <!-- ko template: template-->            <!-- /ko -->            <!-- /ko -->            <!-- /ko -->        </div>        <!-- /ko -->    </div>',
                'dxqb-popup-selectStatment': '<div class="dxqb-preview" data-bind="dxPopup: {                animation: {                    show: { type: \'fade\', from: 0, to: 1, duration: 700 },                    hide: { type: \'fade\', from: 1, to: 0, duration: 700 }                },                visible: isVisible,                title: title(),                showTitle: true,                resizeEnabled: true,                shading: true,                shadingColor: \'transparent\',                fullScreen: false,                width: 800,                height: 544,                container: closest($element, \'.dxrd-wizard\'),                position: { of: closest($element, \'.dx-designer-viewport\') },                onHidden: function() { $data.data(null) },                focusStateEnabled: false            }">        <div class="dxqb-preview-popup-content">            <div class="dxqb-show-query-string-content dx-widget">                <!-- ko if: !aceAvailable -->                <div class="dxrd-show-query-string-editor" data-bind="dxTextArea: { value: data, valueChangeEvent: \'keyup\', disabled: false }"></div>                <!-- /ko -->                <!-- ko if: aceAvailable -->                <div class="dxrd-show-query-string-editor">                    <div class="dxrd-show-query-string-editor-content">                        <div class="dx-sql_editor dxd-back-primary2" data-bind="dxAceEditor: { value: data, additionalOptions: additionalOptions, options: aceOptions }"></div>                    </div>                </div>                <!-- /ko -->            </div>        </div>        <div class="dxqb-preview-popup-buttons dxd-border-secondary">            <div data-bind="dxButton: { text: okButtonText(), onClick: okButtonHandler }" class="dxqb-preview-popup-button"></div>        </div>    </div>',
                'dxrd-treelist-with-checkbox': '<div data-bind="visible: visible">        <!-- ko if: hasContent -->        <!-- ko template: "dx-treelist-accordion-item-with-checkbox" -->        <!-- /ko -->        <!-- /ko -->        <!-- ko ifnot: hasContent -->        <!-- ko template: "dx-treelist-header-item-with-checkbox" -->        <!-- /ko -->        <!-- /ko -->    </div>',
                'dx-treelist-accordion-item-with-checkbox': '<div data-bind="dxdAccordionExt: { collapsed: collapsed, lazyContentRendering: true }">        <!-- ko template: "dx-treelist-header-item-with-checkbox" -->        <!-- /ko -->        <div class="dx-fieldset dx-accordion-content dxd-back-primary">            <!-- ko with: data -->            <!-- ko template: { name: contenttemplate } -->            <!-- /ko -->            <!-- /ko -->        </div>    </div>',
                'dx-treelist-header-item-with-checkbox': '<div class="dx-background-inheritor dxd-back-highlighted dxd-state-selected">    <div class="dx-treelist-item dx-fontsize-reestablished dxd-list-item-back-color" data-bind="event: {         dblclick: function() { $data.dblClickHandler ? $data.dblClickHandler($data) : $data.toggleCollapsed() },         mouseenter: mouseenter,         mouseleave: mouseleave         },         styleunit: padding,         css: { \'dx-treelist-item-selected dxd-state-selected dxd-back-secondary\': isSelected }">        <!-- ko ifnot: $data.hasItems-->        <div class="dx-treelist-collapsedbutton" data-bind="css: nodeImageClass"></div>        <!-- /ko -->        <!-- ko if: $data.hasItems -->        <div class="dx-treelist-collapsedbutton" data-bind="css: nodeImageClass, visible: hasItems, template: \'dxrd-svg-collapsed\', click: toggleCollapsed"></div>        <!-- /ko -->        <div class="dx-treelist-caption">            <!-- ko if: actions && actions.length > 0 -->            <div class="dx-treelist-action-container" data-bind="visible: isSelected() || isHovered()">                <!-- ko foreach: actions -->                <!-- ko if: $data.templateName -->                <!-- ko template: templateName  -->                <!-- /ko -->                <!-- /ko -->                <!-- ko if: !$data.templateName -->                <div class="dx-treelist-action" data-bind="dxButtonWithTemplate: { onClick: function() { clickAction($parent); }, icon: $data.imageTemplateName, iconClass: $data.imageClassName, disabled: $data.disabled && $data.disabled() }, attr: { title: text }"></div>                <!-- /ko -->                <!-- /ko -->            </div>            <!-- /ko  -->            <div class="dx-treelist-selectedcontent" data-bind="event: { dblclick: function() { $data.dblClickHandler && $data.dblClickHandler($data); } }, click: toggleSelected,  draggable: isDraggable ? dragDropHandler : null">                <div class="dx-treelist-text-wrapper">                    <div class="dx-add-queries-page-checkbox" data-bind="dxCheckBox: { value: data.checked }, click: function(treeNode, e) {                         treeNode.data.toggleChecked();                         e.stopPropagation();                         return true;                    }"></div>                    <div class="dx-treelist-text dx-treelist-text-with-checkbox" data-bind="text: text, attr: { title: text }"></div>                </div>            </div>        </div>    </div></div>',
                'dx-treelist-action-with-popover': '<div class="dx-treelist-action-with-popover" style="display: inline-block">        <div class="dx-treelist-action" data-bind="dxButtonWithTemplate: { onClick: function() { clickAction($parent); }, icon: $data.imageTemplateName, iconClass: $data.imageClassName , disabled: $data.disabled && $data.disabled() }, attr: { title: text }"></div>        <div data-bind="dxPopover:{ width: 200, position: !$root.rtl ? \'left\' : \'right\', visible: $parent.data.popoverVisible, target: \'.dx-treelist-action-with-popover\', container: $root.getPopupContainer($element)}">            <div data-bind="dxList: { dataSource: $parent.data.popoverListItems(), onItemClick: $parent.data.itemClickAction }">                <div data-options="dxTemplate : { name: \'item\' }">                    <div class="dx-text-content" data-bind="text: name, attr: { title: name }"></div>                </div>            </div>        </div>    </div>',
                'dx-treelist-accordion-contenttemplate-custom-with-actions': '<div data-bind="dxPropertyGrid: { target: $parent.data.dataSourceParameter, level: $parent.data.editor.level + 1 }"></div>',
                'dxrd-page-configure-parameters': '<div class="dxrd-wizard-page">        <div class="dxrd-datasource-parameters" data-bind="dxCollectionEditor: parametersEditorOptions"></div>    </div>',
                'dxrd-parameter-collection-item': '<div data-bind="dxdAccordion: { collapsed: collapsed }">        <div class="dxrd-group-header dx-accordion-header dxd-text-primary" style="border-bottom: 0" data-bind="styleunit: { \'marginLeft\' : editor.padding }, css: { \'dxrd-group-header-collapsed dxd-border-primary\': collapsed() }">            <div class="dx-collapsing-image" data-bind="template: \'dxrd-svg-collapsed\', css: { \'dx-image-expanded\': !collapsed() }" style="display:inline-block;"></div>            <span class="dxrd-group-header-text dxd-text-primary" data-bind="text: value().name"></span>        </div>        <div class="dx-accordion-content">            <div data-bind="dxPropertyGrid: { target: value, level: editor.level + 1 }"></div>        </div>    </div>',
                'dxrd-wizard-datasource-parameters': '<div class="dx-fieldset" style="height:100%">        <div class="dx-collectioneditor" style="height:100%">            <div class="dxrd-datasource-parameters-collection">                <div class="dxrd-datasource-parameters-container dxd-border-secondary" data-bind="dxScrollView: { showScrollbar: \'onHover\' }">                    <!-- ko if: values().length === 0 -->                    <div class="dx-collectioneditor-empty dxd-empty-area-placeholder-text-color dxd-text-info">                        <span class="dxrd-datasource-parameters-empty-text" data-bind="text: getDisplayTextEmptyArray()"></span>                    </div>                    <!-- /ko -->                    <!-- ko if: values().length !== 0 -->                    <div class="dx-collectioneditor-items" data-bind="foreach: values">                        <div class="dx-background-inheritor dxd-back-highlighted dxd-state-selected" data-bind="with: $parent.createCollectionItemWrapper($parents[1], $index)">                            <div class="dx-collectioneditor-item-container dx-fontsize-reestablished dxd-list-item-back-color" data-bind="dxAction: $parents[1].select, css: { \'dxd-state-selected dxd-back-secondary\' : $parents[1].selectedIndex() === $index() }">                                <div class="dx-collection-item"></div>                            </div>                        </div>                    </div>                    <!-- /ko -->                </div>            </div>            <div class="dxrd-collectioneditor-wizard-buttons" data-bind="visible: showButtons">                <div class="dxrd-collectioneditor-action" data-bind="dxButton: { onClick: add, text: getDisplayTextButton(\'add\') }, attr: { title: getDisplayTextButton(\'add\') }"></div>                <div class="dxrd-collectioneditor-action" data-bind="dxButton: { onClick: remove, disabled: selectedIndex() === null, text: $parent.removeButtonTitle }, attr: { title: $parent.removeButtonTitle }"></div>            </div>        </div>    </div>',
                'dxrd-page-connectionstring': '<div class="dxrd-wizard-page">        <div class="dx-default-border-style dxd-border-secondary">            <div class="dxrd-wizard-list" data-bind="dxList: { items: connectionStrings, selectedItems: selectedConnectionString, editEnabled: true, editConfig: { selectionEnabled: true }, selectionMode: \'single\', activeStateEnabled: false, noDataText: $root.dx.Analytics.Localization.noDataText() }">                <div data-options="dxTemplate : { name: \'item\' }">                    <div data-bind="text: $data[\'description\'] || $data[\'name\']"></div>                </div>            </div>        </div>    </div>',
                'dxrd-select-control': '<div data-bind="text: caption()"></div>    <!-- ko if: !aceAvailable -->    <div class="dxrd-wizard-list dxrd-create-query-page-editor dx-default-border-style dxd-border-secondary" data-bind="dxTextArea: { value: sqlString, valueChangeEvent: \'keyup input blur\', readOnly: disableCustomSql() }"></div>    <!-- /ko -->    <!-- ko if: aceAvailable -->    <div class="dxrd-create-query-page-editor dxrd-create-query-page-editor-border dxd-border-secondary">        <div class="dxrd-create-query-page-editor-content">            <div class="dx-sql_editor dxd-back-primary2" data-bind="dxAceEditor: { value: sqlString, additionalOptions: additionalOptions, options: aceOptions }, css: { \'dx-disabled-ace\': disableCustomSql() }"></div>        </div>    </div>    <!-- /ko -->',
                'dxrd-procedures-control': '<div data-bind="text: caption()"></div>    <div class="dx-default-border-style dxd-border-secondary">        <div class="dxrd-wizard-list dxrd-create-query-page-editor" data-bind="dxList: { items: storedProcedures, onContentReady: scrollActiveItem, selectedItems: selectedProcedure, editEnabled: true, editConfig: { selectionEnabled: true }, selectionMode: \'single\', activeStateEnabled: false, noDataText: $root.dx.Analytics.Localization.noDataText() }">            <div data-options="dxTemplate : { name: \'item\' }">                <div data-bind="text: $parent.generateStoredProcedureDisplayName($data)"></div>            </div>        </div>    </div>',
                'dxrd-wizard-create-query-page': '<div class="dxrd-wizard-page dxrd-wizard-create-query-page">        <div data-bind="dxRadioGroup: { value: selectedQueryType, items: queryTypeItems }">            <div data-options="dxTemplate : { name: \'item\' }">                <div data-bind="text: $parent.localizeQueryType($data)"></div>            </div>        </div>        <div class="dxrd-create-query-page-content">            <!-- ko template: { name: queryControl().template, data: queryControl() } -->            <!-- /ko -->        </div>        <div data-bind="dxButton: { text: runQueryBuilderBtnText, onClick: runQueryBuilder, disabled: queryControl().runQueryBuilderDisabled }" class="dxrd-wizard-btn"></div>        <!-- ko template: { name: \'dxrd-querybuilder-popup\', data: popupQueryBuilder } -->        <!-- /ko -->    </div>',
                'dxrd-querybuilder-popup': '<div class="dxrd-querybuilder-popup" data-bind="dxPopup: popupViewModel($element)">        <!-- ko if: qbOptions -->        <div class="dxrd-querybuilder-popup-content">            <div style="height:100%;" data-bind="dxQueryBuilder: { options: qbOptions, designerModel: designer }"></div>        </div>        <div class="dxrd-querybuilder-popup-buttons dxd-border-secondary">            <div data-bind="dxButton: { text: getDisplayText(\'previewResults\'), onClick: previewHandler, disabled: okButtonDisabled }" class="dxrd-querybuilder-popup-button-left"></div>            <div data-bind="dxButton: { text: getDisplayText(\'cancel\'), onClick: cancelHandler }" class="dxrd-querybuilder-popup-button"></div>            <div data-bind="dxButton: { text: getDisplayText(\'ok\'), onClick: okHandler, disabled: okButtonDisabled }" class="dxrd-querybuilder-popup-button"></div>        </div>        <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel:{            animation: {                show: { type: \'fade\', from: 0, to: 1, duration: 700 },                hide: { type: \'fade\', from: 1, to: 0, duration: 700 }            },            deferRendering: false,            message: getDisplayText(\'loading\'),            visible: showLoadIndicator,            shading: true,            shadingColor: \'transparent\'}">        </div>        <!-- /ko -->    </div>',
                'dxrd-querybuilder': '<div class="dx-designer dx-querybuilder" data-bind="template: \'dxrd-designer\'">    </div>',
                'dxrd-wizard-header-custom': '<div class="dxrd-wizard-header-custom">        <div class="dxrd-span-title" data-bind="text: currentStep.title || title"></div>        <div class="dxrd-span-description" data-bind="text: currentStep.description, attr: { title: currentStep.description }"></div>    </div>',
                'dxrd-wizard': '<!-- ko if: $data -->    <div class="dxrd-wizard dx-editors dxd-text-primary" data-bind="dxPopup: {        visible: isVisible,        title: isVisible() ? title : \'\',        showTitle: true,        fullScreen: false,        width: width,        height: height,        container: container($element),        titleTemplate: titleTemplate,        position: wizardPopupPosition($element)    }, css: extendCssClass">        <div class="dxrd-wizard-content">            <!-- ko foreach: renderedSteps -->            <div style="width: 100%; height: 100%" data-bind="visible: $parent.currentStep === $data">                <!-- ko template: { name: $data.template, data: $data } -->                <!-- /ko -->            </div>            <!-- /ko -->            <div class="dxrd-wizard-load-panel dxd-text-primary" data-bind="dxLoadPanel: loadPanelViewModel($element)">            </div>        </div>        <div class="dxrd-wizard-navigation">            <!-- ko with: currentStep.actionCancel  -->            <div data-bind="dxButton: { text: text, onClick: handler, disabled: isDisabled, visible: isVisible }" class="dxrd-wizard-btn left"></div>            <!-- /ko -->            <!-- ko with: currentStep.actionFinish  -->            <div data-bind="dxButton: { text: text, onClick: handler, disabled: isDisabled, visible: isVisible }" class="dxrd-wizard-btn right"></div>            <!-- /ko -->            <!-- ko with: currentStep.actionNext  -->            <div data-bind="dxButton: { text: text, onClick: handler, disabled: isDisabled, visible: isVisible }" class="dxrd-wizard-btn right"></div>            <!-- /ko -->            <!-- ko with: currentStep.actionPrevious  -->            <div data-bind="dxButton: { text: text, onClick: handler, disabled: $parent.isPreviousButtonDisabled, visible: isVisible }" class="dxrd-wizard-btn right"></div>            <!-- /ko -->        </div>    </div>    <!-- /ko -->',
            });
        })(Templates = Analytics.Templates || (Analytics.Templates = {}));
    })(Analytics = DevExpress.Analytics || (DevExpress.Analytics = {}));
})(DevExpress || (DevExpress = {}));

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