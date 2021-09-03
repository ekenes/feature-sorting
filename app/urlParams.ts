
export type UrlParams = {
  webmap?: string;
}

export function getUrlParams() {
  const queryParams = document.location.search.substr(1);
  let result: UrlParams = {};

  const defaultWebmapId = "77accf337c2a4d61a154008a0bb9a52b";

  queryParams.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });

  if(!result.webmap){
    result.webmap = defaultWebmapId;
  }

  result = {
    webmap: result.webmap
  };

  setUrlParams(result);
  return result;
}

// function to set an id as a url param
export function setUrlParams(params: UrlParams) {
  const { webmap } = params;
  window.history.pushState("", "", `${window.location.pathname}?webmap=${webmap}`);
}

export function updateUrlParams(params: UrlParams){
  const urlParams = getUrlParams();
  for (const p in params){
    urlParams[p] = params[p];
  };
  setUrlParams(urlParams);
}