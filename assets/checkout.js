var BOLD=BOLD||{};BOLD.BMS=BOLD.BMS||{},BOLD.BMS.CS=BOLD.BMS.CS||{},BOLD.BMS.CS.Checkout=function(e){"use strict";var v={shippingMethod:"[data-shipping-method-label-title={{- settings.selected_shipping_method | json -}}]"};function _(u){e.extend(!0,v),b.init(u)}var b=function(){function u(h){Shopify.Checkout.step==="shipping_method"&&(e("[data-poll-refresh]").length?e(document).on("page:change",function(){g.init(h)}):e("[data-shipping-method]").length&&g.init(h))}var g=function(){function h(i){var p=S();M(p,i),y(i)}function y(i){e(".shipping-container").on("change","input:radio",function(){m()})}function S(){var i={shipping:[],pickup:[]};return e("[data-shipping-methods] .content-box__row").each(function(p){var t=e(this),l=t.find("[data-shipping-method-label-title]").data("shipping-method-label-title");/pickup/i.test(l)?i.pickup.push(t):i.shipping.push(t)}),i}function M(i,p){var t=BOLD.BMS.Common,l=t.createElement("div",{class:"selected-container"},"Currently Selected: ");l.appendChild(t.createElement("span",{class:"selected-placeholder"})),e(".section__header").append(l);var o=e(t.createElement("div",{class:"shipping-container"})),s=e(t.createElement("ul"));o.append(s),e("[data-shipping-methods]").append(o).addClass("bold-ui");for(var a in i)if(i[a].length>0){var d=a==="pickup"?a+" (Free)":a,n="method-type-"+a,f=t.createElement("li",{class:"tab-item"});f.append(t.createElement("a",{href:"#"+n},d)),s.append(f);var r=e(t.createElement("div",{id:"wrapper-"+n,class:"scroll-wrapper"}));r.append(t.createElement("div",{id:n,class:"shipping-group","data-method-type":a})),o.append(r)}w(i,p),o.tabs()}function w(i,p){for(var t in i)if(i[t].length>0){for(var l=e("#method-type-"+t),o="method-type-"+t,s=0;s<i[t].length;s++){var a=e(i[t][s]);l.append(a.detach())}new IScroll("#wrapper-"+o,{mouseWheel:!0,scrollbars:!0})}var d=[],n;e("#method-type-shipping .content-box__row").each(function(f){var r=e(".radio__label__accessory .content-box__emphasis",this).text().trim(),c=e(".radio__label__primary",this).data("shipping-method-label-title");r!="Free Shipping"&&(r=parseFloat(r.replace("$",""))),c.indexOf("Ground")!=-1?c="Ground":c.indexOf("Priority Mail")!=-1&&(c="Priority Mail"),d[c]=r}),p>4900?n="Free Shipping":d.Ground<d["Priority Mail"]?n="Ground":d["Priority Mail"]?n="Priority Mail":n="Ground",e('[data-shipping-method-label-title*="'+n+'"]').parents(".radio-wrapper").find("input").click(),m()}function m(){var i=e(".shipping-container input:radio:checked").closest(".radio-wrapper").find(".radio__label__primary").data("shipping-method-label-title");e(".selected-container .selected-placeholder").text(i),i.toLowerCase().indexOf("pickup")>-1?e(".will_notify").length||e(".selected-container .selected-placeholder").after('<span class="will_notify">We will notify you when your order is ready for pickup.</span>'):e(".will_notify").remove()}return{init:h}}();return{init:u}}();return{init:_}}(BOLD.jQuery||jQuery);
//# sourceMappingURL=/s/files/1/2242/6395/t/207/assets/checkout.js.map?v=1643906720
