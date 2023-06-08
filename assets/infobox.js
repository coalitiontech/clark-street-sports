/*!
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function InfoBox(e){e=e||{},google.maps.OverlayView.apply(this,arguments),this.content_=e.content||"",this.disableAutoPan_=e.disableAutoPan||!1,this.maxWidth_=e.maxWidth||0,this.pixelOffset_=e.pixelOffset||new google.maps.Size(0,0),this.position_=e.position||new google.maps.LatLng(0,0),this.zIndex_=e.zIndex||null,this.boxClass_=e.boxClass||"infoBox",this.boxStyle_=e.boxStyle||{},this.closeBoxMargin_=e.closeBoxMargin||"2px",this.closeBoxURL_=e.closeBoxURL||"http://www.google.com/intl/en_us/mapfiles/close.gif",e.closeBoxURL===""&&(this.closeBoxURL_=""),this.infoBoxClearance_=e.infoBoxClearance||new google.maps.Size(1,1),typeof e.visible=="undefined"&&(typeof e.isHidden=="undefined"?e.visible=!0:e.visible=!e.isHidden),this.isHidden_=!e.visible,this.alignBottom_=e.alignBottom||!1,this.pane_=e.pane||"floatPane",this.enableEventPropagation_=e.enableEventPropagation||!1,this.div_=null,this.closeListener_=null,this.moveListener_=null,this.mapListener_=null,this.contextListener_=null,this.eventListeners_=null,this.fixedWidthSet_=null}InfoBox.prototype=new google.maps.OverlayView,InfoBox.prototype.createInfoBoxDiv_=function(){var e,i,t,d=this,o=function(s){s.cancelBubble=!0,s.stopPropagation&&s.stopPropagation()},r=function(s){s.returnValue=!1,s.preventDefault&&s.preventDefault(),d.enableEventPropagation_||o(s)};if(!this.div_){if(this.div_=document.createElement("div"),this.setBoxStyle_(),typeof this.content_.nodeType=="undefined"?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:this.maxWidth_!==0&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(t=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-t.left-t.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),!this.enableEventPropagation_){for(this.eventListeners_=[],i=["mousedown","mouseover","mouseout","mouseup","click","dblclick","touchstart","touchend","touchmove"],e=0;e<i.length;e++)this.eventListeners_.push(google.maps.event.addDomListener(this.div_,i[e],o));this.eventListeners_.push(google.maps.event.addDomListener(this.div_,"mouseover",function(s){this.style.cursor="default"}))}this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",r),google.maps.event.trigger(this,"domready")}},InfoBox.prototype.getCloseBoxImg_=function(){var e="";return this.closeBoxURL_!==""&&(e="<img",e+=" src='"+this.closeBoxURL_+"'",e+=" align=right",e+=" style='",e+=" position: relative;",e+=" cursor: pointer;",e+=" margin: "+this.closeBoxMargin_+";",e+="'>"),e},InfoBox.prototype.addClickHandler_=function(){var e;this.closeBoxURL_!==""?(e=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(e,"click",this.getCloseClickHandler_())):this.closeListener_=null},InfoBox.prototype.getCloseClickHandler_=function(){var e=this;return function(i){i.cancelBubble=!0,i.stopPropagation&&i.stopPropagation(),google.maps.event.trigger(e,"closeclick"),e.close()}},InfoBox.prototype.panBox_=function(e){var i,t,d=0,o=0;if(!e&&(i=this.getMap(),i instanceof google.maps.Map)){i.getBounds().contains(this.position_)||i.setCenter(this.position_),t=i.getBounds();var r=i.getDiv(),s=r.offsetWidth,a=r.offsetHeight,f=this.pixelOffset_.width,l=this.pixelOffset_.height,g=this.div_.offsetWidth,v=this.div_.offsetHeight,_=this.infoBoxClearance_.width,h=this.infoBoxClearance_.height,n=this.getProjection().fromLatLngToContainerPixel(this.position_);if(n.x<-f+_?d=n.x+f-_:n.x+g+f+_>s&&(d=n.x+g+f+_-s),this.alignBottom_?n.y<-l+h+v?o=n.y+l-h-v:n.y+l+h>a&&(o=n.y+l+h-a):n.y<-l+h?o=n.y+l-h:n.y+v+l+h>a&&(o=n.y+v+l+h-a),!(d===0&&o===0)){var u=i.getCenter();i.panBy(d,o)}}},InfoBox.prototype.setBoxStyle_=function(){var e,i;if(this.div_){this.div_.className=this.boxClass_,this.div_.style.cssText="",i=this.boxStyle_;for(e in i)i.hasOwnProperty(e)&&(this.div_.style[e]=i[e]);this.div_.style.WebkitTransform="translateZ(0)",typeof this.div_.style.opacity!="undefined"&&this.div_.style.opacity!==""&&(this.div_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(Opacity='+this.div_.style.opacity*100+')"',this.div_.style.filter="alpha(opacity="+this.div_.style.opacity*100+")"),this.div_.style.position="absolute",this.div_.style.visibility="hidden",this.zIndex_!==null&&(this.div_.style.zIndex=this.zIndex_)}},InfoBox.prototype.getBoxWidths_=function(){var e,i={top:0,bottom:0,left:0,right:0},t=this.div_;return document.defaultView&&document.defaultView.getComputedStyle?(e=t.ownerDocument.defaultView.getComputedStyle(t,""),e&&(i.top=parseInt(e.borderTopWidth,10)||0,i.bottom=parseInt(e.borderBottomWidth,10)||0,i.left=parseInt(e.borderLeftWidth,10)||0,i.right=parseInt(e.borderRightWidth,10)||0)):document.documentElement.currentStyle&&t.currentStyle&&(i.top=parseInt(t.currentStyle.borderTopWidth,10)||0,i.bottom=parseInt(t.currentStyle.borderBottomWidth,10)||0,i.left=parseInt(t.currentStyle.borderLeftWidth,10)||0,i.right=parseInt(t.currentStyle.borderRightWidth,10)||0),i},InfoBox.prototype.onRemove=function(){this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null)},InfoBox.prototype.draw=function(){this.createInfoBoxDiv_();var e=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=e.x+this.pixelOffset_.width+"px",this.alignBottom_?this.div_.style.bottom=-(e.y+this.pixelOffset_.height)+"px":this.div_.style.top=e.y+this.pixelOffset_.height+"px",this.isHidden_?this.div_.style.visibility="hidden":this.div_.style.visibility="visible"},InfoBox.prototype.setOptions=function(e){typeof e.boxClass!="undefined"&&(this.boxClass_=e.boxClass,this.setBoxStyle_()),typeof e.boxStyle!="undefined"&&(this.boxStyle_=e.boxStyle,this.setBoxStyle_()),typeof e.content!="undefined"&&this.setContent(e.content),typeof e.disableAutoPan!="undefined"&&(this.disableAutoPan_=e.disableAutoPan),typeof e.maxWidth!="undefined"&&(this.maxWidth_=e.maxWidth),typeof e.pixelOffset!="undefined"&&(this.pixelOffset_=e.pixelOffset),typeof e.alignBottom!="undefined"&&(this.alignBottom_=e.alignBottom),typeof e.position!="undefined"&&this.setPosition(e.position),typeof e.zIndex!="undefined"&&this.setZIndex(e.zIndex),typeof e.closeBoxMargin!="undefined"&&(this.closeBoxMargin_=e.closeBoxMargin),typeof e.closeBoxURL!="undefined"&&(this.closeBoxURL_=e.closeBoxURL),typeof e.infoBoxClearance!="undefined"&&(this.infoBoxClearance_=e.infoBoxClearance),typeof e.isHidden!="undefined"&&(this.isHidden_=e.isHidden),typeof e.visible!="undefined"&&(this.isHidden_=!e.visible),typeof e.enableEventPropagation!="undefined"&&(this.enableEventPropagation_=e.enableEventPropagation),this.div_&&this.draw()},InfoBox.prototype.setContent=function(e){this.content_=e,this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),typeof e.nodeType=="undefined"?this.div_.innerHTML=this.getCloseBoxImg_()+e:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(e)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px",typeof e.nodeType=="undefined"?this.div_.innerHTML=this.getCloseBoxImg_()+e:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(e))),this.addClickHandler_()),google.maps.event.trigger(this,"content_changed")},InfoBox.prototype.setPosition=function(e){this.position_=e,this.div_&&this.draw(),google.maps.event.trigger(this,"position_changed")},InfoBox.prototype.setZIndex=function(e){this.zIndex_=e,this.div_&&(this.div_.style.zIndex=e),google.maps.event.trigger(this,"zindex_changed")},InfoBox.prototype.setVisible=function(e){this.isHidden_=!e,this.div_&&(this.div_.style.visibility=this.isHidden_?"hidden":"visible")},InfoBox.prototype.getContent=function(){return this.content_},InfoBox.prototype.getPosition=function(){return this.position_},InfoBox.prototype.getZIndex=function(){return this.zIndex_},InfoBox.prototype.getVisible=function(){var e;return typeof this.getMap()=="undefined"||this.getMap()===null?e=!1:e=!this.isHidden_,e},InfoBox.prototype.show=function(){this.isHidden_=!1,this.div_&&(this.div_.style.visibility="visible")},InfoBox.prototype.hide=function(){this.isHidden_=!0,this.div_&&(this.div_.style.visibility="hidden")},InfoBox.prototype.open=function(e,i){var t=this;i&&(this.position_=i.getPosition(),this.moveListener_=google.maps.event.addListener(i,"position_changed",function(){t.setPosition(this.getPosition())}),this.mapListener_=google.maps.event.addListener(i,"map_changed",function(){t.setMap(this.map)})),this.setMap(e),this.div_&&this.panBox_()},InfoBox.prototype.close=function(){var e;if(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.eventListeners_){for(e=0;e<this.eventListeners_.length;e++)google.maps.event.removeListener(this.eventListeners_[e]);this.eventListeners_=null}this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),this.moveListener_=null),this.mapListener_&&(google.maps.event.removeListener(this.mapListener_),this.mapListener_=null),this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null),this.setMap(null)};
//# sourceMappingURL=/s/files/1/2242/6395/t/207/assets/infobox.js.map?v=1643906670
