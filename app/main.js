var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Expand", "esri/widgets/LayerList", "esri/widgets/BasemapGallery", "./urlParams"], function (require, exports, WebMap, MapView, Legend, Expand, LayerList, BasemapGallery, urlParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        function getValidFields(fields) {
            var validTypes = ["small-integer", "integer", "single", "double", "long", "number", "date"];
            return fields
                .filter(function (field) { return validTypes.indexOf(field.type) > -1; });
        }
        function updateLayerOrderBy(layer, orderBy) {
            console.log("orderBy: ", orderBy);
            layer.orderBy = orderBy;
        }
        function getRendererOrderBy(renderer, mode) {
            var field, valueExpression;
            var sizeVV = rendererHasSizeVV(renderer);
            if (sizeVV) {
                var _a = getOrderBy(sizeVV), field_1 = _a.field, valueExpression_1 = _a.valueExpression;
                return {
                    field: field_1,
                    valueExpression: valueExpression_1,
                    mode: mode
                };
            }
            if (renderer.type === "class-breaks" || renderer.type === "unique-value") {
                var _b = getOrderBy(renderer), field_2 = _b.field, valueExpression_2 = _b.valueExpression;
                return {
                    field: field_2,
                    valueExpression: valueExpression_2,
                    mode: mode
                };
            }
            return {
                field: field,
                valueExpression: valueExpression,
                mode: mode
            };
        }
        function rendererHasSizeVV(renderer) {
            if (renderer.visualVariables) {
                var sizeVV = renderer.visualVariables.find(function (vv) { return vv.type === "size"; });
                return sizeVV;
            }
            return false;
        }
        function getOrderBy(params) {
            if (params.valueExpression && params.valueExpression !== "$view.scale") {
                var valueExpression = params.valueExpression;
                return {
                    valueExpression: valueExpression
                };
            }
            if (params.normalizationField) {
                var valueExpression = "$feature[\"" + params.field + "\"] / $feature[\"" + params.normalizationField + "\"]";
                return {
                    valueExpression: valueExpression
                };
            }
            if (params.field) {
                return {
                    field: params.field
                };
            }
        }
        var webmap, map, view, sortControls, layerList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webmap = urlParams_1.getUrlParams().webmap;
                    map = new WebMap({
                        portalItem: {
                            id: webmap
                        }
                    });
                    return [4 /*yield*/, map.load()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, map.loadAll()];
                case 2:
                    _a.sent();
                    view = new MapView({
                        map: map,
                        container: "viewDiv"
                    });
                    view.ui.add("titleDiv", "top-right");
                    return [4 /*yield*/, view.when()];
                case 3:
                    _a.sent();
                    view.ui.add(new Expand({
                        content: new Legend({ view: view }),
                        view: view,
                        expanded: false
                    }), "bottom-left");
                    view.ui.add(new Expand({
                        content: new BasemapGallery({ view: view }),
                        view: view,
                        expanded: false
                    }), "bottom-left");
                    sortControls = document.getElementById("sort-controls");
                    layerList = new LayerList({
                        view: view,
                        listItemCreatedFunction: function (event) {
                            var item = event.item;
                            var finalLayer = view.map.layers.getItemAt(view.map.layers.length - 1);
                            var showOptions = finalLayer.id === item.layer.id;
                            item.actionsOpen = showOptions;
                            var layer = item.layer;
                            if (layer.type !== "feature") {
                                return;
                            }
                            var fields = getValidFields(layer.fields);
                            item.panel = {
                                content: sortControls.cloneNode(true)
                            };
                            item.panel.content.style.display = "block";
                            var panelContent = item.panel.content;
                            var sortSelect = __spreadArrays(panelContent.getElementsByTagName("calcite-select"))[0];
                            var sortOrder = __spreadArrays(panelContent.getElementsByTagName("calcite-action"))[0];
                            fields.forEach(function (field, i) {
                                var option = document.createElement("calcite-option");
                                option.value = field.name;
                                option.label = field.alias;
                                option.text = field.alias;
                                sortSelect.appendChild(option);
                            });
                            var orderBy = {
                                field: null,
                                valueExpression: null,
                                mode: "ascending"
                            };
                            sortOrder.addEventListener("click", function () {
                                orderBy.mode = orderBy.mode === "ascending" ? "descending" : "ascending";
                                sortOrder.icon = "sort-" + orderBy.mode;
                                refreshOrder();
                            });
                            sortSelect.addEventListener("calciteSelectChange", refreshOrder);
                            function refreshOrder() {
                                var sortValue = sortSelect.selectedOption.value;
                                if (sortValue === "default") {
                                    updateLayerOrderBy(layer, null);
                                    return;
                                }
                                if (sortValue === "renderer") {
                                    orderBy = getRendererOrderBy(layer.renderer, orderBy.mode);
                                    updateLayerOrderBy(layer, orderBy);
                                    return;
                                }
                                orderBy.field = sortValue;
                                orderBy.valueExpression = null;
                                updateLayerOrderBy(layer, orderBy);
                            }
                        }
                    });
                    view.ui.add(new Expand({
                        view: view,
                        content: layerList,
                        group: "top-right"
                    }), "top-right");
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=main.js.map