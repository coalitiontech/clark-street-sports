var BOLD = BOLD || {};
BOLD.BMS = BOLD.BMS || {};

BOLD.BMS.Common = function($) {
    "use strict";

    function isObjectAvailable(target) {
        let objects = target.split(".");
        let current = window;
        let available = true;

        // If window is the first item, remove it
        if (objects[0] === "window") objects.shift();

        for(var i = 0; i < objects.length; i++) {
            if(current[objects[i]]) {
                current = current[objects[i]];
            } else {
                available = false;
                if(BOLD.DebugMode) console.log("Object not available. Validation failed on '" + objects[i] + "'.");
            }
        }

        return available;
    }

    function getVersion() {
        return getParamByName("view") || "v1";
    }

    function checkVersion(view) {
        let version = getVersion(); 
        return version.toLowerCase() === view.toLowerCase();
    }

    function getParamByName(name, url) {
        url = url || window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function createElement(type, properties, text) {
        let element = document.createElement(type);
        let value = "";
        if(properties){
            for(var key in properties){
                value = properties[key];
                // If is an array, join the items with space
                element.setAttribute(key, Array.isArray(value) ? value.join(" ") : value);
            }
        }
        if(text){
            element.innerHTML = text;
        }
        return element;
    }

    return {
        getVersion: getVersion,
        getParamByName: getParamByName,
        checkVersion: checkVersion,
        createElement: createElement,
        isObjectAvailable: isObjectAvailable
    }
}(BOLD.jQuery || jQuery)