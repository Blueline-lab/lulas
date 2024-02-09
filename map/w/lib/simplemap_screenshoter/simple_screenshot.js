!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e["leaflet-simple-map-screenshoter"]=e["leaflet-simple-map-screenshoter"]||{})}(this,function(e){"use strict";var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(e,t){return e(t={exports:{}},t.exports),t.exports}var o=n(function(e,n){!function(t){const n={escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:o,mimeType:function(e){return e=o(e).toLowerCase(),function(){var e="application/font-woff",t="image/jpeg";return{woff:e,woff2:e,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:t,jpeg:t,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}()[e]||""},dataAsUrl:function(e,t){return`data:${t};base64,`+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):(t=e,new Promise(function(e){const n=d(t.toDataURL().split(",")[1]);var o=n.length;const r=new Uint8Array(o);for(let e=0;e<o;e++)r[e]=n.charCodeAt(e);e(new Blob([r],{type:"image/png"}))}));var t},resolveUrl:function(e,t){const n=document.implementation.createHTMLDocument(),o=n.createElement("base"),r=(n.head.appendChild(o),n.createElement("a"));return n.body.appendChild(r),o.href=t,r.href=e,r.href},getAndEncode:function(e){let t=h.impl.urlCache.find(function(t){return t.url===e});return t||(t={url:e,promise:null},h.impl.urlCache.push(t)),null===t.promise&&(h.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime()),t.promise=new Promise(function(t){const n=h.impl.options.httpTimeout,o=new XMLHttpRequest;let r;var i;function a(e){console.error(e),t("")}o.onreadystatechange=function(){if(4===o.readyState)if(200!==o.status)r?t(r):a(`cannot fetch resource: ${e}, status: `+o.status);else{const e=new FileReader;e.onloadend=function(){var n=e.result.split(/,/)[1];t(n)},e.readAsDataURL(o.response)}},o.ontimeout=function(){r?t(r):a(`timeout of ${n}ms occured while fetching resource: `+e)},o.responseType="blob",o.timeout=n,h.impl.options.useCredentials&&(o.withCredentials=!0),o.open("GET",e,!0),o.send(),h.impl.options.imagePlaceholder&&(i=h.impl.options.imagePlaceholder.split(/,/))&&i[1]&&(r=i[1])})),t.promise},uid:function(){let e=0;return function(){return"u"+("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)+e++}}(),delay:function(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}},asArray:function(e){const t=[],n=e.length;for(let o=0;o<n;o++)t.push(e[o]);return t},escapeXhtml:function(e){return e.replace(/%/g,"%25").replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(e){return"data:,"!==e?new Promise(function(t,n){const o=new Image;h.impl.options.useCredentials&&(o.crossOrigin="use-credentials"),o.onload=function(){t(o)},o.onerror=n,o.src=e}):Promise.resolve()},width:function(e){var t=r(e,"border-left-width"),n=r(e,"border-right-width");return e.scrollWidth+t+n},height:function(e){var t=r(e,"border-top-width"),n=r(e,"border-bottom-width");return e.scrollHeight+t+n}};function o(e){return(e=/\.([^\.\/]*?)(\?|$)/g.exec(e))?e[1]:""}function r(e,t){const n=f(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}const i=function(){const e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:function(e,n,i){return t(e)?Promise.resolve(e).then(o).then(function(t){let o=Promise.resolve(e);return t.forEach(function(e){o=o.then(function(t){return r(t,e,n,i)})}),o}):Promise.resolve(e)},shouldProcess:t,impl:{readUrls:o,inline:r}};function t(t){return-1!==t.search(e)}function o(t){const o=[];for(var r;null!==(r=e.exec(t));)o.push(r[1]);return o.filter(function(e){return!n.isDataUrl(e)})}function r(e,t,o,r){return Promise.resolve(t).then(function(e){return o?n.resolveUrl(e,o):e}).then(r||n.getAndEncode).then(function(e){return n.dataAsUrl(e,n.mimeType(t))}).then(function(o){return e.replace((r=t,new RegExp(`(url\\(['"]?)(${n.escape(r)})(['"]?\\))`,"g")),`$1${o}$3`);var r})}}(),a={resolveAll:function(){return s().then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})},impl:{readAll:s}};function s(){return Promise.resolve(n.asArray(document.styleSheets)).then(function(e){const t=[];return e.forEach(function(e){if(Object.getPrototypeOf(e).hasOwnProperty("cssRules"))try{n.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(t){console.log("Error while reading CSS rules from "+e.href,t.toString())}}),t}).then(function(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return i.shouldProcess(e.style.getPropertyValue("src"))})}).then(function(t){return t.map(e)});function e(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return i.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}const c={inlineAll:function e(t){return t instanceof Element?function(e){const t=e.style.getPropertyValue("background");return t?i.inlineAll(t).then(function(n){e.style.setProperty("background",n,t)}).then(function(){return e}):Promise.resolve(e)}(t).then(function(){return t instanceof HTMLImageElement?l(t).inline():Promise.all(n.asArray(t.childNodes).map(function(t){return e(t)}))}):Promise.resolve(t)},impl:{newImage:l}};function l(e){return{inline:function(t){return n.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||n.getAndEncode).then(function(t){return n.dataAsUrl(t,n.mimeType(e.src))}).then(function(t){return new Promise(function(n){e.onload=n,e.onerror=n,e.src=t})})}}}const u={imagePlaceholder:void 0,cacheBust:!1,useCredentials:!1,httpTimeout:3e4},h={toSvg:p,toPng:function(e,t){return(t=t||{}).raster=!0,m(e,t).then(function(e){return e.toDataURL()})},toJpeg:function(e,t){return(t=t||{}).raster=!0,m(e,t).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})},toBlob:function(e,t){return(t=t||{}).raster=!0,m(e,t).then(n.canvasToBlob)},toPixelData:function(e,t){return(t=t||{}).raster=!0,m(e,t).then(function(t){return t.getContext("2d").getImageData(0,0,n.width(e),n.height(e)).data})},toCanvas:function(e,t){return(t=t||{}).raster=!0,m(e,t||{})},impl:{fontFaces:a,images:c,util:n,inliner:i,urlCache:[],options:{}}},f=(e.exports=h,t.getComputedStyle||window.getComputedStyle),d=t.atob||window.atob;function p(e,t){var o=t=t||{};return void 0===o.imagePlaceholder?h.impl.options.imagePlaceholder=u.imagePlaceholder:h.impl.options.imagePlaceholder=o.imagePlaceholder,void 0===o.cacheBust?h.impl.options.cacheBust=u.cacheBust:h.impl.options.cacheBust=o.cacheBust,void 0===o.useCredentials?h.impl.options.useCredentials=u.useCredentials:h.impl.options.useCredentials=o.useCredentials,Promise.resolve(e).then(function(e){return function e(t,o,r,i,a=null){return r||!o||o(t)?Promise.resolve(t).then(function(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):"IFRAME"===e.nodeName?html2canvas(e.contentDocument.body).then(e=>e.toDataURL()).then(n.makeImage):e.cloneNode(!1)}).then(function(r){return function(t,r){const a=t.childNodes;return 0===a.length?Promise.resolve(r):function(n,r){const a=f(t);let s=Promise.resolve();return r.forEach(function(t){s=s.then(function(){return e(t,o,!1,i,a)}).then(function(e){e&&n.appendChild(e)})}),s}(r,n.asArray(a)).then(function(){return r})}(t,r)}).then(function(e){return function(e,t,o){return t instanceof Element?Promise.resolve().then(function(){!function(e,t){const i=f(e);i.cssText?(t.style.cssText=i.cssText,function(e,t){t.font=e.font,t.fontFamily=e.fontFamily,t.fontFeatureSettings=e.fontFeatureSettings,t.fontKerning=e.fontKerning,t.fontSize=e.fontSize,t.fontStretch=e.fontStretch,t.fontStyle=e.fontStyle,t.fontVariant=e.fontVariant,t.fontVariantCaps=e.fontVariantCaps,t.fontVariantEastAsian=e.fontVariantEastAsian,t.fontVariantLigatures=e.fontVariantLigatures,t.fontVariantNumeric=e.fontVariantNumeric,t.fontVariationSettings=e.fontVariationSettings,t.fontWeight=e.fontWeight}(i,t.style)):(o?function(e,t,n,o){const r=n.style,i=e.style;for(var a of t){var s=t.getPropertyValue(a),c=i.getPropertyValue(a),l=(i.setProperty(a,o?"initial":"unset"),t.getPropertyValue(a));l!==s?r.setProperty(a,s):r.removeProperty(a),i.setProperty(a,c)}}(e,i,t,r):function(e,t,o){const r=function(e){if(v[e])return v[e];y||((y=document.createElement("iframe")).style.visibility="hidden",y.style.position="fixed",document.body.appendChild(y),y.contentWindow.document.write('<!DOCTYPE html><meta charset="UTF-8"><title>sandbox</title><body>'));const t=document.createElement(e),o=(y.contentWindow.document.body.appendChild(t),t.textContent=".",y.contentWindow.getComputedStyle(t)),r={};return n.asArray(o).forEach(function(e){r[e]="width"===e||"height"===e?"auto":o.getPropertyValue(e)}),y.contentWindow.document.body.removeChild(t),v[e]=r}(o.tagName),i=o.style;n.asArray(e).forEach(function(n){var o=e.getPropertyValue(n);(o!==r[n]||t&&o!==t.getPropertyValue(n))&&i.setProperty(n,o,e.getPropertyPriority(n))})}(i,a,t),r&&(["inset-block","inset-block-start","inset-block-end"].forEach(e=>t.style.removeProperty(e)),["left","right","top","bottom"].forEach(e=>{t.style.getPropertyValue(e)&&t.style.setProperty(e,"0px")})))}(e,t)}).then(function(){[":before",":after"].forEach(function(o){!function(o){const r=f(e,o),i=r.getPropertyValue("content");if(""!==i&&"none"!==i){const e=n.uid(),i=t.getAttribute("class"),a=(i&&t.setAttribute("class",i+" "+e),document.createElement("style"));a.appendChild(function(){const t=`.${e}:`+o,i=(r.cssText?function(){return`${r.cssText} content: ${r.getPropertyValue("content")};`}:function(){return n.asArray(r).map(function(e){return e+": "+r.getPropertyValue(e)+(r.getPropertyPriority(e)?" !important":"")}).join("; ")+";"})();return document.createTextNode(t+`{${i}}`)}()),t.appendChild(a)}}(o)})}).then(function(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}).then(function(){t instanceof SVGElement&&(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t instanceof SVGRectElement&&["width","height"].forEach(function(e){const n=t.getAttribute(e);n&&t.style.setProperty(e,n)}))}).then(function(){return t}):t}(t,e,i)}):Promise.resolve()}(e,t.filter,!0,!t.raster)}).then(g).then(w).then(function(e){t.bgcolor&&(e.style.backgroundColor=t.bgcolor),t.width&&(e.style.width=t.width+"px"),t.height&&(e.style.height=t.height+"px"),t.style&&Object.keys(t.style).forEach(function(n){e.style[n]=t.style[n]});let n=null;return"function"==typeof t.onclone&&(n=t.onclone(e)),Promise.resolve(n).then(function(){return e})}).then(function(o){return o=o,r=t.width||n.width(e),i=t.height||n.height(e),Promise.resolve(o).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(n.escapeXhtml).then(function(e){return`<foreignObject x="0" y="0" width="100%" height="100%">${e}</foreignObject>`}).then(function(e){return`<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${i}">${e}</svg>`}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e});var r,i}).then(function(e){return h.impl.urlCache=[],e})}function m(e,t){return p(e,t).then(n.makeImage).then(n.delay(0)).then(function(o){var r="number"!=typeof t.scale?1:t.scale;const i=function(e,o){const r=document.createElement("canvas");if(r.width=(t.width||n.width(e))*o,r.height=(t.height||n.height(e))*o,t.bgcolor){const e=r.getContext("2d");e.fillStyle=t.bgcolor,e.fillRect(0,0,r.width,r.height)}return r}(e,r),a=i.getContext("2d");return a.mozImageSmoothingEnabled=!1,a.msImageSmoothingEnabled=!1,a.imageSmoothingEnabled=!1,o&&(a.scale(r,r),a.drawImage(o,0,0)),y&&(document.body.removeChild(y),y=null,M&&clearTimeout(M),M=setTimeout(()=>{M=null,v={}},2e4)),i})}function g(e){return a.resolveAll().then(function(t){const n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function w(e){return c.inlineAll(e).then(function(){return e})}let M=null,y=null,v={}}(t)}),r=n(function(e,n){(function(){function n(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){a(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function o(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function r(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(n){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,a=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype?function(e,t,a){var s=i.URL||i.webkitURL,c=document.createElement("a");t=t||e.name||"download",c.download=t,c.rel="noopener","string"==typeof e?(c.href=e,c.origin===location.origin?r(c):o(c.href)?n(e,t,a):r(c,c.target="_blank")):(c.href=s.createObjectURL(e),setTimeout(function(){s.revokeObjectURL(c.href)},4e4),setTimeout(function(){r(c)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,i){if(t=t||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(e,i),t);else if(o(e))n(e,t,i);else{var a=document.createElement("a");a.href=e,a.target="_blank",setTimeout(function(){r(a)})}}:function(e,t,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return n(e,t,o);var a="application/octet-stream"===e.type,s=/constructor/i.test(i.HTMLElement)||i.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||a&&s)&&"object"==typeof FileReader){var l=new FileReader;l.onloadend=function(){var e=l.result;e=c?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},l.readAsDataURL(e)}else{var u=i.URL||i.webkitURL,h=u.createObjectURL(e);r?r.location=h:location.href=h,r=null,setTimeout(function(){u.revokeObjectURL(h)},4e4)}});i.saveAs=a.saveAs=a,e.exports=a})()}),i=L.Control.extend({options:{cropImageByInnerWH:!0,hidden:!1,domtoimageOptions:{},position:"topleft",screenName:"screen",iconUrl:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnIGlkPSJjYW1lcmEiPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsOS41MDFjLTQuNDE5LDAtOCwzLjU4MS04LDhjMCw0LjQxOCwzLjU4MSw4LDgsOGM0LjQxOCwwLDgtMy41ODIsOC04UzIwLjQxOCw5LjUwMSwxNiw5LjUwMXogTTIwLjU1NSwyMS40MDZjLTIuMTU2LDIuNTE2LTUuOTQzLDIuODA3LTguNDU5LDAuNjVjLTIuNTE3LTIuMTU2LTIuODA3LTUuOTQ0LTAuNjUtOC40NTljMi4xNTUtMi41MTcsNS45NDMtMi44MDcsOC40NTktMC42NUMyMi40MiwxNS4xMDIsMjIuNzExLDE4Ljg5MSwyMC41NTUsMjEuNDA2eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsMTMuNTAxYy0yLjIwOSwwLTMuOTk5LDEuNzkxLTQsMy45OTl2MC4wMDJjMCwwLjI3NSwwLjIyNCwwLjUsMC41LDAuNXMwLjUtMC4yMjUsMC41LTAuNVYxNy41YzAuMDAxLTEuNjU2LDEuMzQzLTIuOTk5LDMtMi45OTljMC4yNzYsMCwwLjUtMC4yMjQsMC41LTAuNVMxNi4yNzYsMTMuNTAxLDE2LDEzLjUwMXoiLz48cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTI5LjQ5Miw4LjU0MmwtNC4zMzQtMC43MjNsLTEuMzczLTMuNDM0QzIzLjMyNiwzLjI0LDIyLjIzMiwyLjUsMjEsMi41SDExYy0xLjIzMiwwLTIuMzI2LDAuNzQtMi43ODYsMS44ODZMNi44NDIsNy44MTlMMi41MDksOC41NDJDMS4wNTUsOC43ODMsMCwxMC4wMjcsMCwxMS41djE1YzAsMS42NTQsMS4zNDYsMywzLDNoMjZjMS42NTQsMCwzLTEuMzQ2LDMtM3YtMTVDMzIsMTAuMDI3LDMwLjk0NSw4Ljc4MywyOS40OTIsOC41NDJ6IE0zMCwyNi41YzAsMC41NTMtMC40NDcsMS0xLDFIM2MtMC41NTMsMC0xLTAuNDQ3LTEtMXYtMTVjMC0wLjQ4OSwwLjM1NC0wLjkwNiwwLjgzNi0wLjk4Nkw4LjI4LDkuNjA3bDEuNzkxLTQuNDc4QzEwLjIyNCw0Ljc1LDEwLjU5MSw0LjUsMTEsNC41aDEwYzAuNDA4LDAsMC43NzUsMC4yNDksMC45MjgsMC42MjlsMS43OTEsNC40NzhsNS40NDUsMC45MDdDMjkuNjQ2LDEwLjU5NCwzMCwxMS4wMTEsMzAsMTEuNVYyNi41eiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+",hideElementsWithSelectors:[".leaflet-control-container"],onCropBorderSize:2,caption:null,captionFontSize:15,captionFont:"Arial",captionColor:"black",captionBgColor:"white",captionOffset:5,mimeType:"image/png",debugMode:!1,preventDownload:!1,onPixelDataFail:function(e){var t=e.node,n=e.error;return console.warn("Map node is very big "+t.scrollWidth+"x"+t.scrollHeight),console.warn("Add function: SimpleMapScreenshoter({\n              onPixelDataFail: function({ node, plugin, error, mapPane, domtoimageOptions }) {\n                 // Solutions:\n                 // decrease size of map\n                 // or decrease zoom level\n                 // or remove elements with big distanses\n                 // and after that return image in Promise - plugin._getPixelDataOfNormalMap\n                 return plugin._getPixelDataOfNormalMap(domtoimageOptions)\n              }\n            })"),Promise.reject(n)}},onAdd:function(){return this._container=L.DomUtil.create("div","leaflet-control-simpleMapScreenshoter"),this._link=null,this._screenState={status:1,promise:null},!1===this.options.hidden&&this._addScreenBtn(),this._onUserStartInteractWithMap=this._onUserStartInteractWithMap.bind(this),this._onUserEndInteractWithMap=this._onUserEndInteractWithMap.bind(this),this._map.on("zoomstart",this._onUserStartInteractWithMap),this._map.on("move",this._onUserStartInteractWithMap),this._map.on("zoomend",this._onUserEndInteractWithMap),this._map.on("moveend",this._onUserEndInteractWithMap),this._container},takeScreen:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"blob",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o={};for(var r in this.options)n.hasOwnProperty(r)?o[r]=n[r]:o[r]=this.options[r];return 2===this._screenState.status?this._screenState.promise:(this._map.fire("simpleMapScreenshoter.takeScreen"),this._screenState.status=2,this._setElementsVisible(!1),this._screenState.promise=this._waitEndOfInteractions().then(function(){return e._getPixelData(o)}).then(function(t){return e._setElementsVisible(!0),e._toCanvas(t,o)}).then(function(n){return"image"===t?e._canvasToImage(n,o):"canvas"===t?n:e._canvasToBlob(n,o)}).then(function(t){return e._screenState.status=1,e._map.fire("simpleMapScreenshoter.done"),t}).catch(function(t){return e._setElementsVisible(!0),e._screenState.status=1,e._map.fire("simpleMapScreenshoter.error",{e:t}),Promise.reject(t)}),this._screenState.promise)},_setElementsVisible:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.options.hideElementsWithSelectors.forEach(function(n){var o=e._map._container.querySelectorAll(n),r=!0,i=!1,a=void 0;try{for(var s,c=o[Symbol.iterator]();!(r=(s=c.next()).done);r=!0){s.value.style.opacity=!1===t?0:1}}catch(e){i=!0,a=e}finally{try{!r&&c.return&&c.return()}finally{if(i)throw a}}})},_canvasToImage:function(e,t){var n=t.mimeType,o=e.toDataURL(n);return-1===o.indexOf("base64")?Promise.reject(new Error("Base64 image generation error")):Promise.resolve(o)},_canvasToBlob:function(e,t){var n=t.mimeType;return new Promise(function(t,o){e.toBlob(function(e){t(e)},n)})},_toCanvas:function(e,t){var n=t.captionOffset,o=t.caption,r=t.captionFontSize,i=t.captionFont,a=t.captionColor,s=t.captionBgColor,c=this._node,l=c.screenHeight,u=c.screenWidth,h=document.createElement("canvas");h.width=u,h.height=l;for(var f=h.getContext("2d"),d=f.createImageData(u,l),p=0;p<e.length;++p)d.data[p]=e[p];f.putImageData(d,0,0),d=null;var m=document.createElement("canvas"),g=m.getContext("2d"),w=0,M=0,y=l,v=u;if(!0===this.options.cropImageByInnerWH){for(var L=[],b=0,P=0;P<l;++P){b=0;for(var x=0;x<u;++x)0===e[4*P*u+4*x+4]&&b++;b===u&&L.push(P)}var S=this._getMinAndMaxOnValuesBreak(L);w=S.min;for(var C=u,T=S.max,j=[],D=0,E=M;E<C;++E){D=0;for(var N=0;N<l;++N)0===e[4*N*u+4*E+4]&&D++;D===l&&j.push(E)}var I=this._getMinAndMaxOnValuesBreak(j);M=I.min,C=I.max,(0===M&&0===C||null===C)&&(C=u),(0===w&&0===T||null===T)&&(T=l),!0===this.options.debugMode&&(console.log("emptyYLine",L),console.log("minMaxY",S),console.log("emptyXLine",j),console.log("minMaxX",I),console.log("debugX",{}),console.log("debugY",{})),0===w&&T===l&&0===M&&C===u||(w+=this.options.onCropBorderSize,T-=this.options.onCropBorderSize,M+=this.options.onCropBorderSize,C-=this.options.onCropBorderSize),y=T-w,v=C-M,m.width=v,m.height=y}else m.width=v,m.height=y;var A=null;return o&&(A="function"==typeof o?o.call(this):o),null!==A&&(m.height=m.height+(n+r+n),g.beginPath(),g.rect(0,0,m.width,m.height),g.fillStyle=s,g.fill(),g.save()),g.drawImage(h,M,w,v,y,0,0,v,y),null!==A&&(g.font=r+"px "+i,g.fillStyle=a,g.fillText(A,n,y+n+r)),Promise.resolve(m)},_getMinAndMaxOnValuesBreak:function(e){for(var t=0,n=0,o=!1,r=1;r<e.length;r++){if(e[r]-1!==e[r-1]){n=e[r],o=!0;break}t=e[r]}return!1===o&&e[0]>1?(t=0,n=e[0]):!1===o&&(t=e[e.length-1]||0,n=null),{min:t,max:n}},_getPixelData:function(e){var t=this,n=e.domtoimageOptions,o=void 0===n?{}:n;return this._getPixelDataOfNormalMap(o).catch(function(e){return console.warn("May be map size very big on that zoom level, we have error:",e.toString()),console.warn("You can manually hide map elements with large distances between them for fix that warn"),t._getPixelDataOfBigMap(o)})},_getPixelDataOfNormalMap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this._map.getContainer();return this._node={node:t,screenHeight:t.scrollHeight,screenWidth:t.scrollWidth},o.toPixelData(t,e)},_getPixelDataOfBigMap:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=this._map.getContainer(),r=this._map.getPane("mapPane");r.style.width=2*n.clientWidth+"px",r.style.height=2*n.clientHeight+"px",r.style.overflow="hidden";var i=function(){r.style.width="initial",r.style.height="initial",r.style.overflow="initial"};return this._node={node:n,screenHeight:n.scrollHeight,screenWidth:n.scrollWidth},o.toPixelData(n,t).then(function(e){return i(),e}).catch(function(o){return i(),n.scrollHeight>=4e3||n.scrollWidth>=4e3?e.options.onPixelDataFail({plugin:e,node:n,mapPane:r,error:o,domtoimageOptions:t}):Promise.reject(o)})},_addScreenBtn:function(){this._link=L.DomUtil.create("a","leaflet-control-simpleMapScreenshoter-btn",this._container),this._addCss(),L.DomEvent.addListener(this._link,"click",this._onScreenBtn,this),L.DomEvent.disableClickPropagation(this._link)},_addCss:function(){var e="\n    .leaflet-control-simpleMapScreenshoter{\n       border: 2px solid rgba(0,0,0,0.2);\n       background-clip: padding-box;\n    }\n    .leaflet-control-simpleMapScreenshoter a{\n       background-color: #fff;\n       border-bottom: 1px solid #ccc;\n       width: 30px;\n       height: 30px;\n       line-height: 30px;\n       display: block;\n       text-align: center;\n       text-decoration: none;\n       color: black;\n       overflow: hidden;\n       border-radius: 2px;\n       background-image: url('"+this.options.iconUrl+"');\n       background-position: 46% 41%;\n       background-repeat: no-repeat;\n       background-size: 63%;\n    }\n    .leaflet-control-simpleMapScreenshoter a:hover{\n       cursor: pointer;\n    }\n    ",t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.appendChild(document.createTextNode(e)),t.appendChild(n)},_onScreenBtn:function(){var e=this;this._map.fire("simpleMapScreenshoter.click"),this.options.preventDownload||this.takeScreen().then(function(t){var n="function"==typeof e.options.screenName?e.options.screenName.call(e):e.options.screenName;r.saveAs(t,n+".png")}).catch(function(t){e._map.fire("simpleMapScreenshoter.error",{e:t})})},_onUserStartInteractWithMap:function(){this._interaction=!0},_onUserEndInteractWithMap:function(){this._interaction=!1},_waitEndOfInteractions:function(){var e=this;return new Promise(function(t){var n=setInterval(function(){e._interaction||(t(),clearInterval(n))},100)})}}),a=(L.Control.SimpleMapScreenshoter=i,L.simpleMapScreenshoter=function(e){return new L.Control.SimpleMapScreenshoter(e)},i);e.default=a,e.SimpleMapScreenshoter=i,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=leaflet-simple-map-screenshoter.js.map

