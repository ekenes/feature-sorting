var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Legend", "esri/widgets/Expand", "esri/widgets/LayerList", "esri/widgets/BasemapGallery", "esri/portal/PortalItem", "./urlParams", "esri/core/watchUtils"], function (require, exports, WebMap, MapView, Legend, Expand, LayerList, BasemapGallery, PortalItem, urlParams_1, watchUtils_1) {
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
        function getRendererOrderBy(renderer, order) {
            var orderBy;
            if (renderer.type === "class-breaks" || renderer.type === "unique-value") {
                orderBy = getOrderBy(renderer);
            }
            var sizeVV = rendererHasSizeVV(renderer);
            if (sizeVV) {
                orderBy = getOrderBy(sizeVV);
            }
            if (orderBy) {
                return [__assign(__assign({}, orderBy), { order: order })];
            }
            return null;
        }
        function rendererHasSizeVV(renderer) {
            if (renderer.visualVariables) {
                var sizeVV = renderer.visualVariables.find(function (vv) { return vv.type === "size" && vv.valueExpression !== "$view.scale"; });
                return sizeVV;
            }
            return false;
        }
        function getOrderBy(params) {
            if (!params.field && !params.valueExpression) {
                return null;
            }
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
        function statusMessage(head, info) {
            document.getElementById("head").innerHTML = head;
            document.getElementById("info").innerHTML = info;
            overlay.style.visibility = "visible";
        }
        var webmap, map, view, sortControls, layerList, saveBtn, overlay, ok;
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
                    view.ui.add("save-map", "top-left");
                    return [4 /*yield*/, view.when()];
                case 3:
                    _a.sent();
                    map.layers.forEach(function (layer) { return __awaiter(void 0, void 0, void 0, function () {
                        var orderBy, layerView;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("Set orderBy ", layer.title);
                                    orderBy = getRendererOrderBy(layer.renderer, "descending");
                                    return [4 /*yield*/, view.whenLayerView(layer)];
                                case 1:
                                    layerView = _a.sent();
                                    watchUtils_1.whenTrueOnce(layer, "visible", function () {
                                        var start = window.performance.now();
                                        watchUtils_1.whenFalseOnce(layerView, "updating", function () {
                                            var end = window.performance.now();
                                            var duration = end - start;
                                            console.log(layer.title, ": ", duration, " ms", "(" + JSON.stringify(layer.orderBy) + ")");
                                        });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); });
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
                            var order = "ascending";
                            sortOrder.addEventListener("click", function () {
                                order = order === "ascending" ? "descending" : "ascending";
                                sortOrder.icon = "sort-" + order;
                                refreshOrder();
                            });
                            sortSelect.addEventListener("calciteSelectChange", refreshOrder);
                            function refreshOrder(optionIndex) {
                                var sortValue = optionIndex ? sortSelect.children[optionIndex].value : sortSelect.selectedOption.value;
                                if (sortValue === "default") {
                                    updateLayerOrderBy(layer, null);
                                    return;
                                }
                                if (sortValue === "renderer") {
                                    var orderBy = getRendererOrderBy(layer.renderer, order);
                                    updateLayerOrderBy(layer, orderBy);
                                    return;
                                }
                                updateLayerOrderBy(layer, [{
                                        field: sortValue,
                                        order: order
                                    }]);
                            }
                        }
                    });
                    view.ui.add(new Expand({
                        view: view,
                        content: layerList,
                        group: "top-right"
                    }), "top-right");
                    saveBtn = document.getElementById("save-map");
                    saveBtn.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
                        var authoringAppUrl, item, itemPageUrl, link, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, map.updateFrom(view)];
                                case 1:
                                    _a.sent();
                                    authoringAppUrl = "<a target=\"_blank\" href=\"https://ekenes.github.io/feature-sorting/?webmap=" + map.portalItem.id + "\">Feature sorting app</a>";
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, map.saveAs(new PortalItem({
                                            title: map.portalItem.title + " [FEATURE Z ORDER TEST]",
                                            tags: ["test", "orderBy", "sort"],
                                            description: "Webmap testing feature z order in various layers. MODIFIED in the " + authoringAppUrl + ". ORIGINAL ITEM DESCRIPTION: " + map.portalItem.description,
                                            portal: map.portalItem.portal
                                        }), {
                                            ignoreUnsupported: false
                                        })];
                                case 3:
                                    item = _a.sent();
                                    itemPageUrl = item.portal.url + "/home/item.html?id=" + item.id;
                                    link = "<a target=\"_blank\" href=\"" + itemPageUrl + "\">" + item.title + "</a>";
                                    statusMessage("Save WebMap", "<br> Successfully saved as <i>" + link + "</i>");
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _a.sent();
                                    statusMessage("Save WebMap", "<br> Error " + error_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    overlay = document.getElementById("overlayDiv");
                    ok = overlay.getElementsByTagName("input")[0];
                    ok.addEventListener("click", function () {
                        overlay.style.visibility = "hidden";
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=main.js.map