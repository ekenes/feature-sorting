import esri = __esri;

import WebMap = require("esri/WebMap");
import MapView = require("esri/views/MapView");
import Legend = require("esri/widgets/Legend");
import Expand = require("esri/widgets/Expand");
import LayerList = require("esri/widgets/LayerList");
import BasemapLayerList = require("esri/widgets/BasemapLayerList");
import ActionToggle = require("esri/support/actions/ActionToggle");
import BasemapGallery = require("esri/widgets/BasemapGallery");
import Color = require("esri/Color");
import SizeVariable = require("esri/renderers/visualVariables/SizeVariable")

import { getUrlParams } from "./urlParams";
import FeatureLayer = require("esri/layers/FeatureLayer");

( async () => {

  interface OrderBy {
    field?: string;
    valueExpression?: string;
    mode: "ascending" | "descending";
  }

  const { webmap } = getUrlParams();

  const map = new WebMap({
    portalItem: {
      id: webmap
    }
  });

  await map.load();
  await map.loadAll();

  const view = new MapView({
    map: map,
    container: "viewDiv"
  });
  view.ui.add("titleDiv", "top-right");

  await view.when();

  view.ui.add(new Expand({
    content: new Legend({ view }),
    view,
    expanded: false
  }), "bottom-left");

  view.ui.add(new Expand({
    content: new BasemapGallery({ view }),
    view,
    expanded: false
  }), "bottom-left");

  const sortControls = document.getElementById("sort-controls") as HTMLDivElement;

  const layerList = new LayerList({
    view,
    listItemCreatedFunction: (event) => {
      const item = event.item as esri.ListItem;

      const finalLayer = view.map.layers.getItemAt(view.map.layers.length-1);
      const showOptions = finalLayer.id === item.layer.id;

      item.actionsOpen = showOptions;

      const layer = item.layer as esri.FeatureLayer;

      if(layer.type !== "feature"){
        return;
      }

      const fields = getValidFields(layer.fields);

      item.panel = {
        content: sortControls.cloneNode(true)
      } as esri.ListItemPanel;
      (item.panel.content as HTMLElement).style.display = "block";

      const panelContent = item.panel.content as any;

      const [ sortSelect ] = [ ...panelContent.getElementsByTagName("calcite-select") ];
      const [ sortOrder ] = [ ...panelContent.getElementsByTagName("calcite-action") ];

      fields.forEach((field, i) => {
        const option = document.createElement("calcite-option") as HTMLOptionElement;
        option.value = field.name;
        option.label = field.name;
        option.text = field.name;
        sortSelect.appendChild(option);
      });

      let orderBy: OrderBy = {
        field: null,
        valueExpression: null,
        mode: "ascending"
      }

      sortOrder.addEventListener("click", () => {
        orderBy.mode === "ascending" ? "descending" : "ascending";
        sortOrder.icon = `sort-${orderBy.mode}`;
        if(sortSelect.value === "default"){
          updateLayerOrderBy(layer, null);
          return;
        }
        updateLayerOrderBy(layer, orderBy);
      });

      sortSelect.addEventListener("calciteSelectChange", () => {
        if(sortSelect.value === "default"){
          updateLayerOrderBy(layer, null);
          return;
        }
        if(sortSelect.value === "renderer"){
          orderBy = getRendererOrderBy(layer.renderer as esri.RendererWithVisualVariables, orderBy.mode);
          updateLayerOrderBy(layer, orderBy);
          return;
        }
        orderBy.field = sortSelect.value;
        orderBy.valueExpression = null;
        updateLayerOrderBy(layer, orderBy);
      });
    }
  });
  view.ui.add(new Expand({
    view,
    content: layerList,
    group: "top-right"
  }), "top-right");

  function getValidFields(fields: esri.Field[]) {
    const validTypes = [ "small-integer", "integer", "single", "double", "long", "number", "date" ];

    return fields
      .filter( field => validTypes.indexOf(field.type) > -1 );
  }

  function updateLayerOrderBy(layer: FeatureLayer, orderBy: OrderBy){
    (layer as any).orderBy = orderBy;
  }

  interface RendererOrderByParams {
    field?: string;
    normalizationField?: string;
    valueExpression?: string;
  }

  function getRendererOrderBy(renderer: esri.RendererWithVisualVariables, mode: OrderBy["mode"]): OrderBy {
    let field, valueExpression;

    const sizeVV = rendererHasSizeVV(renderer);

    if(sizeVV){
      const { field, valueExpression } = getOrderBy(sizeVV);
      return {
        field,
        valueExpression,
        mode
      };
    }
    if(renderer.type === "class-breaks" || renderer.type === "unique-value"){
      const { field, valueExpression } = getOrderBy(renderer);
      return {
        field,
        valueExpression,
        mode
      };
    }
    return {
      field,
      valueExpression,
      mode
    }
  }

  function rendererHasSizeVV(renderer: esri.RendererWithVisualVariables){
    if(renderer.visualVariables){
      const sizeVV = renderer.visualVariables.find(vv => vv.type === "size") as esri.SizeVariable;
      return sizeVV;
    }
    return false;
  }

  function getOrderBy(params: RendererOrderByParams){
    if(params.valueExpression){
      const valueExpression = params.valueExpression;
      return {
        valueExpression
      };
    }
    if(params.normalizationField){
      const valueExpression = `$feature[${params.field}] / $feature[${params.normalizationField}]`;
      return {
        valueExpression
      };
    }
    if(params.field){
      return {
        field: params.field
      };
    }
  }

})();
