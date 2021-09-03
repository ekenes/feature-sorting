import esri = __esri;

import WebMap = require("esri/WebMap");
import MapView = require("esri/views/MapView");
import Legend = require("esri/widgets/Legend");
import Expand = require("esri/widgets/Expand");
import LayerList = require("esri/widgets/LayerList");
import BasemapGallery = require("esri/widgets/BasemapGallery");
import PortalItem = require("esri/portal/PortalItem");

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
  view.ui.add("save-map", "top-left");

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
        option.label = field.alias;
        option.text = field.alias;
        sortSelect.appendChild(option);
      });

      let orderBy: OrderBy = {
        field: null,
        valueExpression: null,
        mode: "ascending"
      }

      sortOrder.addEventListener("click", () => {
        orderBy.mode = orderBy.mode === "ascending" ? "descending" : "ascending";
        sortOrder.icon = `sort-${orderBy.mode}`;
        refreshOrder();
      });

      sortSelect.addEventListener("calciteSelectChange", refreshOrder);

      function refreshOrder() {
        const sortValue = sortSelect.selectedOption.value;
        if(sortValue === "default"){
          updateLayerOrderBy(layer, null);
          return;
        }
        if(sortValue === "renderer"){
          orderBy = getRendererOrderBy(layer.renderer as esri.RendererWithVisualVariables, orderBy.mode);
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
    console.log("orderBy: ", orderBy);
    layer.orderBy = orderBy;
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
    if(params.valueExpression && params.valueExpression !== "$view.scale"){
      const valueExpression = params.valueExpression;
      return {
        valueExpression
      };
    }
    if(params.normalizationField){
      const valueExpression = `$feature["${params.field}"] / $feature["${params.normalizationField}"]`;
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

  const saveBtn = document.getElementById("save-map");
  saveBtn.addEventListener("click", async () => {

    await map.updateFrom(view);

    const authoringAppUrl = `<a target="_blank" href="https://ekenes.github.io/feature-sorting/?webmap=${map.portalItem.id}">Feature sorting app</a>`;

    try{
      const item = await map.saveAs(new PortalItem({
        title: `${map.portalItem.title} [FEATURE Z ORDER TEST]`,
        tags: [ "test", "orderBy", "sort" ],

        description: `Webmap testing feature z order in various layers. MODIFIED in the ${authoringAppUrl}. ORIGINAL ITEM DESCRIPTION: ${map.portalItem.description}`,
        portal: map.portalItem.portal
      }), {
        ignoreUnsupported: false
      });

      const itemPageUrl = `${item.portal.url}/home/item.html?id=${item.id}`;
      const link = `<a target="_blank" href="${itemPageUrl}">${item.title}</a>`;

      statusMessage(
        "Save WebMap",
        "<br> Successfully saved as <i>" + link + "</i>"
      );

    } catch (error){
      statusMessage("Save WebMap", "<br> Error " + error);
    }

  });

  const overlay = document.getElementById("overlayDiv");
  const ok = overlay.getElementsByTagName("input")[0];

  function statusMessage(head: string, info:string) {
    document.getElementById("head").innerHTML = head;
    document.getElementById("info").innerHTML = info;
    overlay.style.visibility = "visible";
  }

  ok.addEventListener("click", function () {
    overlay.style.visibility = "hidden";
  });

})();
