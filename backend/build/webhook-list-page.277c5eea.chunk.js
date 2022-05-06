(self["webpackChunkdashboard"] = self["webpackChunkdashboard"] || []).push([[4121],{

/***/ 36825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

  
  
  if (true) {
    module.exports = __webpack_require__(32800);
  } else {}
  

/***/ }),

/***/ 32800:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(n,e){ true?module.exports=e(__webpack_require__(53547),__webpack_require__(78384)):0}(this,(function(n,e){return function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=121)}({0:function(n,e,t){n.exports=t(17)()},1:function(e,t){e.exports=n},10:function(n,e,t){var r=t(23),o=t(24),i=t(20),a=t(25);n.exports=function(n,e){return r(n)||o(n,e)||i(n,e)||a()},n.exports.default=n.exports,n.exports.__esModule=!0},121:function(n,e,t){"use strict";t.r(e),t.d(e,"Switch",(function(){return _}));var r,o,i=t(6),a=t.n(i),u=t(5),s=t.n(u),c=t(3),f=t.n(c),l=t(1),d=t.n(l),p=t(0),b=t.n(p),m=t(2),h=t.n(m),g=t(9),y=t(4),v=["label","onChange","onLabel","offLabel","selected","visibleLabels"],x=h.a.div(r||(r=f()(["\n  background: ",";\n  border: none;\n  border-radius: 16px;\n  position: relative;\n  height: ","rem;\n  width: ","rem;\n\n  & span {\n    font-size: ",";\n  }\n\n  &:before {\n    content: '';\n    background: ",";\n    width: 1rem;\n    height: 1rem;\n    border-radius: 50%;\n    position: absolute;\n    transition: all 0.5s;\n    left: ",";\n    top: ",";\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    &:before {\n      transition: none;\n    }\n  }\n"])),(function(n){return n.theme.colors.danger500}),1.5,2.5,(function(n){return n.visibleLabels?"1rem":0}),(function(n){return n.theme.colors.neutral0}),(function(n){return n.theme.spaces[1]}),(function(n){return n.theme.spaces[1]})),O=h.a.button(o||(o=f()(["\n  background: transparent;\n  padding: 0;\n  border: none;\n\n  &[aria-checked='true'] "," {\n    background: ",";\n  }\n\n  &[aria-checked='true'] ",":before {\n    transform: translateX(1rem);\n  }\n"])),x,(function(n){return n.theme.colors.success500}),x),_=d.a.forwardRef((function(n,e){var t=n.label,r=n.onChange,o=n.onLabel,i=n.offLabel,u=n.selected,c=n.visibleLabels,f=s()(n,v);return d.a.createElement(O,a()({ref:e,role:"switch","aria-checked":u,"aria-label":t,onClick:r,visibleLabels:c,type:"button"},f),d.a.createElement(g.Flex,null,d.a.createElement(x,null,d.a.createElement("span",null,o),d.a.createElement("span",null,i)),c&&d.a.createElement(y.Box,{as:"span","aria-hidden":!0,paddingLeft:2,color:u?"success600":"danger600"},u?o:i)))}));_.defaultProps={onLabel:"On",offLabel:"Off",visibleLabels:!1},_.propTypes={label:b.a.string.isRequired,offLabel:b.a.string,onChange:b.a.func.isRequired,onLabel:b.a.string,selected:b.a.bool.isRequired,visibleLabels:b.a.bool},_.displayName="Switch"},13:function(n,e){function t(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(n.exports=t=function(n){return typeof n},n.exports.default=n.exports,n.exports.__esModule=!0):(n.exports=t=function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},n.exports.default=n.exports,n.exports.__esModule=!0),t(e)}n.exports=t,n.exports.default=n.exports,n.exports.__esModule=!0},17:function(n,e,t){"use strict";var r=t(18);function o(){}function i(){}i.resetWarningCache=o,n.exports=function(){function n(n,e,t,o,i,a){if(a!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function e(){return n}n.isRequired=n;var t={array:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:e,element:n,elementType:n,instanceOf:e,node:n,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:o};return t.PropTypes=t,t}},18:function(n,e,t){"use strict";n.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},19:function(n,e){n.exports=function(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r},n.exports.default=n.exports,n.exports.__esModule=!0},2:function(n,t){n.exports=e},20:function(n,e,t){var r=t(19);n.exports=function(n,e){if(n){if("string"==typeof n)return r(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,e):void 0}},n.exports.default=n.exports,n.exports.__esModule=!0},22:function(n,e){n.exports=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o},n.exports.default=n.exports,n.exports.__esModule=!0},23:function(n,e){n.exports=function(n){if(Array.isArray(n))return n},n.exports.default=n.exports,n.exports.__esModule=!0},24:function(n,e){n.exports=function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,i=[],a=!0,u=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(n){u=!0,o=n}finally{try{a||null==t.return||t.return()}finally{if(u)throw o}}return i}},n.exports.default=n.exports,n.exports.__esModule=!0},25:function(n,e){n.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},n.exports.default=n.exports,n.exports.__esModule=!0},3:function(n,e){n.exports=function(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))},n.exports.default=n.exports,n.exports.__esModule=!0},4:function(n,e,t){"use strict";t.r(e),t.d(e,"Box",(function(){return d}));var r,o=t(3),i=t.n(o),a=t(0),u=t.n(a),s=t(2),c=t.n(s),f=t(7),l={color:!0},d=c.a.div.withConfig({shouldForwardProp:function(n,e){return!l[n]&&e(n)}})(r||(r=i()(["\n  // Font\n  font-size: ",";\n\n  // Colors\n  background: ",";\n  color: ",";\n\n  // Spaces\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n\n  // Responsive hiding\n  ","\n  ","\n  \n\n  // Borders\n  border-radius: ",";\n  border-style: ",";\n  border-width: ",";\n  border-color: ",";\n  border: ",";\n\n  // Shadows\n  box-shadow: ",";\n\n  // Handlers\n  pointer-events: ",";\n  &:hover {\n    ","\n  }\n\n  // Display\n  display: ",";\n\n  // Position\n  position: ",";\n  left: ",";\n  right: ",";\n  top: ",";\n  bottom: ",";\n  z-index: ",";\n  overflow: ",";\n  cursor: ",";\n\n  // Size\n  width: ",";\n  max-width: ",";\n  min-width: ",";\n  height: ",";\n  max-height: ",";\n  min-height: ",";\n\n  // Animation\n  transition: ",";\n  transform: ",";\n  animation: ",";\n\n  //Flexbox children props\n  flex-shrink: ",";\n  flex-grow: ",";\n  flex-basis: ",";\n  flex: ",";\n\n  // Text\n  text-align: ",";\n  text-transform: ",";\n  line-height: ",";\n\n  // Cursor\n  cursor: ",";\n"])),(function(n){var e=n.fontSize;return n.theme.fontSizes[e]||e}),(function(n){var e=n.theme,t=n.background;return e.colors[t]}),(function(n){var e=n.theme,t=n.color;return e.colors[t]}),(function(n){var e=n.theme,t=n.padding;return Object(f.a)("padding",t,e)}),(function(n){var e=n.theme,t=n.paddingTop;return Object(f.a)("padding-top",t,e)}),(function(n){var e=n.theme,t=n.paddingRight;return Object(f.a)("padding-right",t,e)}),(function(n){var e=n.theme,t=n.paddingBottom;return Object(f.a)("padding-bottom",t,e)}),(function(n){var e=n.theme,t=n.paddingLeft;return Object(f.a)("padding-left",t,e)}),(function(n){var e=n.theme,t=n.marginLeft;return Object(f.a)("margin-left",t,e)}),(function(n){var e=n.theme,t=n.marginRight;return Object(f.a)("margin-right",t,e)}),(function(n){var e=n.theme,t=n.marginTop;return Object(f.a)("margin-top",t,e)}),(function(n){var e=n.theme,t=n.marginBottom;return Object(f.a)("margin-bottom",t,e)}),(function(n){var e=n.theme;return n.hiddenS?"".concat(e.mediaQueries.tablet," { display: none; }"):void 0}),(function(n){var e=n.theme;return n.hiddenXS?"".concat(e.mediaQueries.mobile," { display: none; }"):void 0}),(function(n){var e=n.theme,t=n.hasRadius,r=n.borderRadius;return t?e.borderRadius:r}),(function(n){return n.borderStyle}),(function(n){return n.borderWidth}),(function(n){var e=n.borderColor;return n.theme.colors[e]}),(function(n){var e=n.theme,t=n.borderColor,r=n.borderStyle,o=n.borderWidth;if(t&&!r&&!o)return"1px solid ".concat(e.colors[t])}),(function(n){var e=n.theme,t=n.shadow;return e.shadows[t]}),(function(n){return n.pointerEvents}),(function(n){var e=n._hover,t=n.theme;return e?e(t):void 0}),(function(n){return n.display}),(function(n){return n.position}),(function(n){var e=n.left;return n.theme.spaces[e]||e}),(function(n){var e=n.right;return n.theme.spaces[e]||e}),(function(n){var e=n.top;return n.theme.spaces[e]||e}),(function(n){var e=n.bottom;return n.theme.spaces[e]||e}),(function(n){return n.zIndex}),(function(n){return n.overflow}),(function(n){return n.cursor}),(function(n){var e=n.width;return n.theme.spaces[e]||e}),(function(n){var e=n.maxWidth;return n.theme.spaces[e]||e}),(function(n){var e=n.minWidth;return n.theme.spaces[e]||e}),(function(n){var e=n.height;return n.theme.spaces[e]||e}),(function(n){var e=n.maxHeight;return n.theme.spaces[e]||e}),(function(n){var e=n.minHeight;return n.theme.spaces[e]||e}),(function(n){return n.transition}),(function(n){return n.transform}),(function(n){return n.animation}),(function(n){return n.shrink}),(function(n){return n.grow}),(function(n){return n.basis}),(function(n){return n.flex}),(function(n){return n.textAlign}),(function(n){return n.textTransform}),(function(n){return n.lineHeight}),(function(n){return n.cursor}));d.displayName="Box",d.defaultProps={background:void 0,borderColor:void 0,color:void 0,hiddenS:!1,hiddenXS:!1,padding:void 0,paddingTop:void 0,paddingRight:void 0,paddingBottom:void 0,paddingLeft:void 0,hasRadius:!1,shadow:void 0,children:null,shrink:void 0,grow:void 0,basis:void 0,flex:void 0,_hover:function(){}},d.propTypes={_hover:u.a.func,background:u.a.string,basis:u.a.oneOfType([u.a.string,u.a.string]),borderColor:u.a.string,children:u.a.oneOfType([u.a.node,u.a.string]),color:u.a.string,flex:u.a.oneOfType([u.a.string,u.a.string]),grow:u.a.oneOfType([u.a.string,u.a.string]),hasRadius:u.a.bool,hiddenS:u.a.bool,hiddenXS:u.a.bool,padding:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingBottom:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingLeft:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingRight:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingTop:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),shadow:u.a.string,shrink:u.a.oneOfType([u.a.string,u.a.string])}},5:function(n,e,t){var r=t(22);n.exports=function(n,e){if(null==n)return{};var t,o,i=r(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(o=0;o<a.length;o++)t=a[o],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i},n.exports.default=n.exports,n.exports.__esModule=!0},6:function(n,e){function t(){return n.exports=t=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},n.exports.default=n.exports,n.exports.__esModule=!0,t.apply(this,arguments)}n.exports=t,n.exports.default=n.exports,n.exports.__esModule=!0},7:function(n,e,t){"use strict";var r=t(10),o=t.n(r),i=t(13),a=t.n(i);e.a=function(n,e,t){var r=e;if(Array.isArray(e)||"object"!==a()(e)||(r=[null==e?void 0:e.desktop,null==e?void 0:e.tablet,null==e?void 0:e.mobile]),void 0!==r){if(Array.isArray(r)){var i=r,u=o()(i,3),s=u[0],c=u[1],f=u[2],l="".concat(n,": ").concat(t.spaces[s],";");return void 0!==c&&(l+="".concat(t.mediaQueries.tablet,"{\n          ").concat(n,": ").concat(t.spaces[c],";\n        }")),void 0!==f&&(l+="".concat(t.mediaQueries.mobile,"{\n          ").concat(n,": ").concat(t.spaces[f],";\n        }")),l}var d=t.spaces[r]||r;return"".concat(n,": ").concat(d,";")}}},9:function(n,e,t){"use strict";t.r(e),t.d(e,"Flex",(function(){return d}));var r,o=t(3),i=t.n(o),a=t(0),u=t.n(a),s=t(2),c=t.n(s),f=t(4),l={direction:!0},d=c()(f.Box).withConfig({shouldForwardProp:function(n,e){return!l[n]&&e(n)}})(r||(r=i()(["\n  display: ",";\n  flex-direction: ",";\n  justify-content: ",";\n  align-items: ",";\n  flex-wrap: ",";\n"])),(function(n){return n.inline?"inline-flex":"flex"}),(function(n){return n.direction}),(function(n){return n.justifyContent}),(function(n){return n.alignItems}),(function(n){return n.wrap}));d.defaultProps={alignItems:"center",basis:void 0,direction:"row",inline:!1,justifyContent:void 0,reverse:!1,wrap:void 0},d.propTypes={alignItems:u.a.string,basis:u.a.oneOfType([u.a.string,u.a.number]),direction:u.a.string,inline:u.a.bool,justifyContent:u.a.string,reverse:u.a.bool,wrap:u.a.string}}})}));

/***/ }),

/***/ 77967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Webhooks_ProtectedListView)
});

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/react/index.js
var react = __webpack_require__(53547);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/index.js
var build = __webpack_require__(68547);
// EXTERNAL MODULE: ./.cache/admin/src/permissions/index.js + 1 modules
var permissions = __webpack_require__(92699);
// EXTERNAL MODULE: ./node_modules/react-router-dom/cjs/react-router-dom.min.js
var react_router_dom_min = __webpack_require__(49656);
// EXTERNAL MODULE: ./node_modules/react-intl/index.js
var react_intl = __webpack_require__(97132);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Layout.js
var Layout = __webpack_require__(35395);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/EmptyStateLayout.js
var EmptyStateLayout = __webpack_require__(92543);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Flex.js
var Flex = __webpack_require__(40264);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Stack.js
var Stack = __webpack_require__(9524);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/IconButton.js
var IconButton = __webpack_require__(49549);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/BaseCheckbox.js
var BaseCheckbox = __webpack_require__(46458);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Table.js
var Table = __webpack_require__(43546);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Typography.js
var Typography = __webpack_require__(33483);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Button.js
var Button = __webpack_require__(64459);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/VisuallyHidden.js
var VisuallyHidden = __webpack_require__(19631);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Switch.js
var Switch = __webpack_require__(36825);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Main.js
var Main = __webpack_require__(80117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/LinkButton.js
var LinkButton = __webpack_require__(31512);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/LiveRegions.js
var LiveRegions = __webpack_require__(67422);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Box.js
var Box = __webpack_require__(94117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Plus.js
var Plus = __webpack_require__(89326);
var Plus_default = /*#__PURE__*/__webpack_require__.n(Plus);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Pencil.js
var Pencil = __webpack_require__(56204);
var Pencil_default = /*#__PURE__*/__webpack_require__.n(Pencil);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Trash.js
var Trash = __webpack_require__(62982);
var Trash_default = /*#__PURE__*/__webpack_require__.n(Trash);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/EmptyDocuments.js
var EmptyDocuments = __webpack_require__(26485);
var EmptyDocuments_default = /*#__PURE__*/__webpack_require__.n(EmptyDocuments);
// EXTERNAL MODULE: ./node_modules/immer/dist/immer.cjs.production.min.js
var immer_cjs_production_min = __webpack_require__(8041);
// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__(36968);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/Webhooks/ListView/reducer.js


const initialState = {
  webhooks: [],
  webhooksToDelete: [],
  webhookToDelete: null,
  loadingWebhooks: true
};
const reducer = (state, action) => (0,immer_cjs_production_min["default"])(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA_SUCCEEDED": {
      draftState.webhooks = action.data;
      draftState.loadingWebhooks = false;
      break;
    }
    case "TOGGLE_LOADING": {
      draftState.loadingWebhooks = !state.loadingWebhooks;
      break;
    }
    case "SET_WEBHOOK_ENABLED": {
      set_default()(draftState, ["webhooks", ...action.keys], action.value);
      break;
    }
    case "SET_WEBHOOK_TO_DELETE": {
      draftState.webhookToDelete = action.id;
      break;
    }
    case "SET_WEBHOOKS_TO_DELETE": {
      if (action.value) {
        draftState.webhooksToDelete.push(action.id);
      } else {
        draftState.webhooksToDelete = state.webhooksToDelete.filter((id) => id !== action.id);
      }
      break;
    }
    case "SET_ALL_WEBHOOKS_TO_DELETE": {
      if (state.webhooksToDelete.length === 0) {
        draftState.webhooksToDelete = state.webhooks.map((webhook) => webhook.id);
      } else {
        draftState.webhooksToDelete = [];
      }
      break;
    }
    case "WEBHOOKS_DELETED": {
      draftState.webhooks = state.webhooks.filter((webhook) => !state.webhooksToDelete.includes(webhook.id));
      draftState.webhooksToDelete = [];
      break;
    }
    case "WEBHOOK_DELETED": {
      draftState.webhooks = state.webhooks.filter((_, index) => index !== action.index);
      draftState.webhookToDelete = null;
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const ListView_reducer = (reducer);


;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/Webhooks/ListView/index.js
/* provided dependency */ var console = __webpack_require__(25108);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

























const ListView = () => {
  const {
    isLoading,
    allowedActions: { canCreate, canRead, canUpdate, canDelete }
  } = (0,build.useRBAC)(permissions/* default.settings.webhooks */.Z.settings.webhooks);
  const toggleNotification = (0,build.useNotification)();
  const isMounted = (0,react.useRef)(true);
  const { formatMessage } = (0,react_intl.useIntl)();
  const [showModal, setShowModal] = (0,react.useState)(false);
  const [{ webhooks, webhooksToDelete, webhookToDelete, loadingWebhooks }, dispatch] = (0,react.useReducer)(ListView_reducer, initialState);
  const { notifyStatus } = (0,LiveRegions.useNotifyAT)();
  (0,build.useFocusWhenNavigate)();
  const { push } = (0,react_router_dom_min.useHistory)();
  const { pathname } = (0,react_router_dom_min.useLocation)();
  const rowsCount = webhooks.length;
  const webhooksToDeleteLength = webhooksToDelete.length;
  const getWebhookIndex = (id) => webhooks.findIndex((webhook) => webhook.id === id);
  (0,react.useEffect)(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  (0,react.useEffect)(() => {
    if (canRead) {
      fetchWebHooks();
    }
  }, [canRead]);
  const fetchWebHooks = () => __async(undefined, null, function* () {
    try {
      const { data } = yield (0,build.request)("/admin/webhooks", {
        method: "GET"
      });
      if (isMounted.current) {
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          data
        });
        notifyStatus("webhooks have been loaded");
      }
    } catch (err) {
      console.log(err);
      if (isMounted.current) {
        if (err.code !== 20) {
          toggleNotification({
            type: "warning",
            message: { id: "notification.error" }
          });
        }
        dispatch({
          type: "TOGGLE_LOADING"
        });
      }
    }
  });
  const handleToggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleConfirmDelete = () => {
    if (webhookToDelete) {
      handleConfirmDeleteOne();
    } else {
      handleConfirmDeleteAll();
    }
  };
  const handleConfirmDeleteOne = () => __async(undefined, null, function* () {
    try {
      yield (0,build.request)(`/admin/webhooks/${webhookToDelete}`, {
        method: "DELETE"
      });
      dispatch({
        type: "WEBHOOK_DELETED",
        index: getWebhookIndex(webhookToDelete)
      });
    } catch (err) {
      if (err.code !== 20) {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error" }
        });
      }
    }
    setShowModal(false);
  });
  const handleConfirmDeleteAll = () => __async(undefined, null, function* () {
    const body = {
      ids: webhooksToDelete
    };
    try {
      yield (0,build.request)("/admin/webhooks/batch-delete", {
        method: "POST",
        body
      });
      if (isMounted.current) {
        dispatch({
          type: "WEBHOOKS_DELETED"
        });
      }
    } catch (err) {
      if (isMounted.current) {
        if (err.code !== 20) {
          toggleNotification({
            type: "warning",
            message: { id: "notification.error" }
          });
        }
      }
    }
    setShowModal(false);
  });
  const handleDeleteClick = (id) => {
    setShowModal(true);
    if (id !== "all") {
      dispatch({
        type: "SET_WEBHOOK_TO_DELETE",
        id
      });
    }
  };
  const handleEnabledChange = (value, id) => __async(undefined, null, function* () {
    const webhookIndex = getWebhookIndex(id);
    const initialWebhookProps = webhooks[webhookIndex];
    const keys = [webhookIndex, "isEnabled"];
    const body = __spreadProps(__spreadValues({}, initialWebhookProps), {
      isEnabled: value
    });
    delete body.id;
    try {
      dispatch({
        type: "SET_WEBHOOK_ENABLED",
        keys,
        value
      });
      yield (0,build.request)(`/admin/webhooks/${id}`, {
        method: "PUT",
        body
      });
    } catch (err) {
      if (isMounted.current) {
        dispatch({
          type: "SET_WEBHOOK_ENABLED",
          keys,
          value: !value
        });
        if (err.code !== 20) {
          toggleNotification({
            type: "warning",
            message: { id: "notification.error" }
          });
        }
      }
    }
  });
  const handleSelectAllCheckbox = () => {
    dispatch({
      type: "SET_ALL_WEBHOOKS_TO_DELETE"
    });
  };
  const handleSelectOneCheckbox = (value, id) => {
    dispatch({
      type: "SET_WEBHOOKS_TO_DELETE",
      value,
      id
    });
  };
  const handleGoTo = (to) => {
    push(`${pathname}/${to}`);
  };
  return /* @__PURE__ */ react.createElement(Layout.Layout, null, /* @__PURE__ */ react.createElement(build.SettingsPageTitle, {
    name: "Webhooks"
  }), /* @__PURE__ */ react.createElement(Main.Main, {
    "aria-busy": isLoading || loadingWebhooks
  }, /* @__PURE__ */ react.createElement(Layout.HeaderLayout, {
    title: formatMessage({ id: "Settings.webhooks.title", defaultMessage: "Webhooks" }),
    subtitle: formatMessage({
      id: "Settings.webhooks.list.description",
      defaultMessage: "Get POST changes notifications"
    }),
    primaryAction: canCreate && !loadingWebhooks && /* @__PURE__ */ react.createElement(LinkButton.LinkButton, {
      startIcon: /* @__PURE__ */ react.createElement((Plus_default()), null),
      variant: "default",
      to: `${pathname}/create`,
      size: "L"
    }, formatMessage({
      id: "Settings.webhooks.list.button.add",
      defaultMessage: "Create new webhook"
    }))
  }), webhooksToDeleteLength > 0 && canDelete && /* @__PURE__ */ react.createElement(Layout.ActionLayout, {
    startActions: /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
      variant: "epsilon",
      textColor: "neutral600"
    }, formatMessage({
      id: "Settings.webhooks.to.delete",
      defaultMessage: "{webhooksToDeleteLength, plural, one {# asset} other {# assets}} selected"
    }, { webhooksToDeleteLength })), /* @__PURE__ */ react.createElement(Button.Button, {
      onClick: () => handleDeleteClick("all"),
      startIcon: /* @__PURE__ */ react.createElement((Trash_default()), null),
      size: "L",
      variant: "danger-light"
    }, formatMessage({
      id: "global.delete",
      defaultMessage: "Delete"
    })))
  }), /* @__PURE__ */ react.createElement(Layout.ContentLayout, null, isLoading || loadingWebhooks ? /* @__PURE__ */ react.createElement(Box.Box, {
    background: "neutral0",
    padding: 6,
    shadow: "filterShadow",
    hasRadius: true
  }, /* @__PURE__ */ react.createElement(build.LoadingIndicatorPage, null)) : /* @__PURE__ */ react.createElement(react.Fragment, null, rowsCount > 0 ? /* @__PURE__ */ react.createElement(Table.Table, {
    colCount: 5,
    rowCount: rowsCount + 1,
    footer: /* @__PURE__ */ react.createElement(Table.TFooter, {
      onClick: () => canCreate ? handleGoTo("create") : {},
      icon: /* @__PURE__ */ react.createElement((Plus_default()), null)
    }, formatMessage({
      id: "Settings.webhooks.list.button.add",
      defaultMessage: "Create new webhook"
    }))
  }, /* @__PURE__ */ react.createElement(Table.Thead, null, /* @__PURE__ */ react.createElement(Table.Tr, null, /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(BaseCheckbox.BaseCheckbox, {
    "aria-label": formatMessage({
      id: "global.select-all-entries",
      defaultMessage: "Select all entries"
    }),
    indeterminate: webhooksToDeleteLength > 0 && webhooksToDeleteLength < rowsCount,
    value: webhooksToDeleteLength === rowsCount,
    onValueChange: handleSelectAllCheckbox
  })), /* @__PURE__ */ react.createElement(Table.Th, {
    width: "20%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({
    id: "global.name",
    defaultMessage: "Name"
  }))), /* @__PURE__ */ react.createElement(Table.Th, {
    width: "60%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({
    id: "Settings.webhooks.form.url",
    defaultMessage: "URL"
  }))), /* @__PURE__ */ react.createElement(Table.Th, {
    width: "20%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({
    id: "Settings.webhooks.list.th.status",
    defaultMessage: "Status"
  }))), /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(VisuallyHidden.VisuallyHidden, null, formatMessage({
    id: "Settings.webhooks.list.th.actions",
    defaultMessage: "Actions"
  }))))), /* @__PURE__ */ react.createElement(Table.Tbody, null, webhooks.map((webhook) => /* @__PURE__ */ react.createElement(Table.Tr, __spreadValues({
    key: webhook.id
  }, (0,build.onRowClick)({
    fn: () => handleGoTo(webhook.id),
    condition: canUpdate
  })), /* @__PURE__ */ react.createElement(Table.Td, __spreadValues({}, build.stopPropagation), /* @__PURE__ */ react.createElement(BaseCheckbox.BaseCheckbox, {
    "aria-label": `${formatMessage({
      id: "global.select",
      defaultMessage: "Select"
    })} ${webhook.name}`,
    value: webhooksToDelete == null ? void 0 : webhooksToDelete.includes(webhook.id),
    onValueChange: (value) => handleSelectOneCheckbox(value, webhook.id),
    id: "select",
    name: "select"
  })), /* @__PURE__ */ react.createElement(Table.Td, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
    fontWeight: "semiBold",
    textColor: "neutral800"
  }, webhook.name)), /* @__PURE__ */ react.createElement(Table.Td, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
    textColor: "neutral800"
  }, webhook.url)), /* @__PURE__ */ react.createElement(Table.Td, null, /* @__PURE__ */ react.createElement(Flex.Flex, __spreadValues({}, build.stopPropagation), /* @__PURE__ */ react.createElement(Switch.Switch, {
    onLabel: formatMessage({
      id: "global.enabled",
      defaultMessage: "Enabled"
    }),
    offLabel: formatMessage({
      id: "global.disabled",
      defaultMessage: "Disabled"
    }),
    label: `${webhook.name} ${formatMessage({
      id: "Settings.webhooks.list.th.status",
      defaultMessage: "Status"
    })}`,
    selected: webhook.isEnabled,
    onChange: () => handleEnabledChange(!webhook.isEnabled, webhook.id),
    visibleLabels: true
  }))), /* @__PURE__ */ react.createElement(Table.Td, null, /* @__PURE__ */ react.createElement(Stack.Stack, __spreadValues({
    horizontal: true,
    spacing: 1
  }, build.stopPropagation), canUpdate && /* @__PURE__ */ react.createElement(IconButton.IconButton, {
    onClick: () => {
      handleGoTo(webhook.id);
    },
    label: formatMessage({
      id: "Settings.webhooks.events.update",
      defaultMessage: "Update"
    }),
    icon: /* @__PURE__ */ react.createElement((Pencil_default()), null),
    noBorder: true
  }), canDelete && /* @__PURE__ */ react.createElement(IconButton.IconButton, {
    onClick: () => handleDeleteClick(webhook.id),
    label: formatMessage({
      id: "global.delete",
      defaultMessage: "Delete"
    }),
    icon: /* @__PURE__ */ react.createElement((Trash_default()), null),
    noBorder: true,
    id: `delete-${webhook.id}`
  }))))))) : /* @__PURE__ */ react.createElement(EmptyStateLayout.EmptyStateLayout, {
    icon: /* @__PURE__ */ react.createElement((EmptyDocuments_default()), {
      width: "160px"
    }),
    content: formatMessage({
      id: "Settings.webhooks.list.empty.description",
      defaultMessage: "No webhooks found"
    }),
    action: /* @__PURE__ */ react.createElement(Button.Button, {
      variant: "secondary",
      startIcon: /* @__PURE__ */ react.createElement((Plus_default()), null),
      onClick: () => canCreate ? handleGoTo("create") : {}
    }, formatMessage({
      id: "Settings.webhooks.list.button.add",
      defaultMessage: "Create new webhook"
    }))
  })))), /* @__PURE__ */ react.createElement(build.ConfirmDialog, {
    isOpen: showModal,
    onToggleDialog: handleToggleModal,
    onConfirm: handleConfirmDelete
  }));
};
/* harmony default export */ const Webhooks_ListView = (ListView);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/SettingsPage/pages/Webhooks/ProtectedListView/index.js




const ProtectedListView = () => /* @__PURE__ */ react.createElement(build.CheckPagePermissions, {
  permissions: permissions/* default.settings.webhooks.main */.Z.settings.webhooks.main
}, /* @__PURE__ */ react.createElement(Webhooks_ListView, null));
/* harmony default export */ const Webhooks_ProtectedListView = (ProtectedListView);


/***/ })

}]);