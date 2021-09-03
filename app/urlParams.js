define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getUrlParams() {
        var queryParams = document.location.search.substr(1);
        var result = {};
        var defaultWebmapId = "77accf337c2a4d61a154008a0bb9a52b";
        queryParams.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        if (!result.webmap) {
            result.webmap = defaultWebmapId;
        }
        result = {
            webmap: result.webmap
        };
        setUrlParams(result);
        return result;
    }
    exports.getUrlParams = getUrlParams;
    // function to set an id as a url param
    function setUrlParams(params) {
        var webmap = params.webmap;
        window.history.pushState("", "", window.location.pathname + "?webmap=" + webmap);
    }
    exports.setUrlParams = setUrlParams;
    function updateUrlParams(params) {
        var urlParams = getUrlParams();
        for (var p in params) {
            urlParams[p] = params[p];
        }
        ;
        setUrlParams(urlParams);
    }
    exports.updateUrlParams = updateUrlParams;
});
//# sourceMappingURL=urlParams.js.map