(self["webpackChunkdashboard"] = self["webpackChunkdashboard"] || []).push([[3650],{

/***/ 80117:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

  
  
  if (true) {
    module.exports = __webpack_require__(41706);
  } else {}
  

/***/ }),

/***/ 41706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(n,e){ true?module.exports=e(__webpack_require__(53547),__webpack_require__(78384)):0}(this,(function(n,e){return function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=109)}({0:function(n,e,t){n.exports=t(17)()},1:function(e,t){e.exports=n},10:function(n,e,t){var r=t(23),o=t(24),i=t(20),a=t(25);n.exports=function(n,e){return r(n)||o(n,e)||i(n,e)||a()},n.exports.default=n.exports,n.exports.__esModule=!0},109:function(n,e,t){"use strict";t.r(e),t.d(e,"Main",(function(){return v})),t.d(e,"SkipToContent",(function(){return _}));var r,o=t(6),i=t.n(o),a=t(5),u=t.n(a),s=t(3),c=t.n(s),f=t(1),d=t.n(f),p=t(0),l=t.n(p),m=t(2),b=t.n(m),h=["labelledBy"],y=b.a.main(r||(r=c()(["\n  // To prevent global outline on focus visible to force an outline when Main is focused\n  &:focus-visible {\n    outline: none;\n  }\n"]))),v=function(n){var e=n.labelledBy,t=u()(n,h),r=e||"main-content-title";return d.a.createElement(y,i()({"aria-labelledby":r,id:"main-content",tabIndex:-1},t))};v.defaultProps={labelledBy:void 0},v.propTypes={labelledBy:l.a.string};var x,g=t(4),O=b()(g.Box)(x||(x=c()(["\n  text-decoration: none;\n  position: absolute;\n  z-index: 9999;\n  left: -100%;\n  top: -100%;\n\n  &:focus {\n    left: ",";\n    top: ",";\n  }\n"])),(function(n){return n.theme.spaces[3]}),(function(n){return n.theme.spaces[3]})),_=function(n){var e=n.children;return d.a.createElement(O,{as:"a",href:"#main-content",background:"primary600",color:"neutral0",padding:3,hasRadius:!0},e)};_.propTypes={children:l.a.node.isRequired}},13:function(n,e){function t(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(n.exports=t=function(n){return typeof n},n.exports.default=n.exports,n.exports.__esModule=!0):(n.exports=t=function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},n.exports.default=n.exports,n.exports.__esModule=!0),t(e)}n.exports=t,n.exports.default=n.exports,n.exports.__esModule=!0},17:function(n,e,t){"use strict";var r=t(18);function o(){}function i(){}i.resetWarningCache=o,n.exports=function(){function n(n,e,t,o,i,a){if(a!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function e(){return n}n.isRequired=n;var t={array:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:e,element:n,elementType:n,instanceOf:e,node:n,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:o};return t.PropTypes=t,t}},18:function(n,e,t){"use strict";n.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},19:function(n,e){n.exports=function(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r},n.exports.default=n.exports,n.exports.__esModule=!0},2:function(n,t){n.exports=e},20:function(n,e,t){var r=t(19);n.exports=function(n,e){if(n){if("string"==typeof n)return r(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(n,e):void 0}},n.exports.default=n.exports,n.exports.__esModule=!0},22:function(n,e){n.exports=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o},n.exports.default=n.exports,n.exports.__esModule=!0},23:function(n,e){n.exports=function(n){if(Array.isArray(n))return n},n.exports.default=n.exports,n.exports.__esModule=!0},24:function(n,e){n.exports=function(n,e){var t=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,o,i=[],a=!0,u=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(n){u=!0,o=n}finally{try{a||null==t.return||t.return()}finally{if(u)throw o}}return i}},n.exports.default=n.exports,n.exports.__esModule=!0},25:function(n,e){n.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},n.exports.default=n.exports,n.exports.__esModule=!0},3:function(n,e){n.exports=function(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))},n.exports.default=n.exports,n.exports.__esModule=!0},4:function(n,e,t){"use strict";t.r(e),t.d(e,"Box",(function(){return p}));var r,o=t(3),i=t.n(o),a=t(0),u=t.n(a),s=t(2),c=t.n(s),f=t(7),d={color:!0},p=c.a.div.withConfig({shouldForwardProp:function(n,e){return!d[n]&&e(n)}})(r||(r=i()(["\n  // Font\n  font-size: ",";\n\n  // Colors\n  background: ",";\n  color: ",";\n\n  // Spaces\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n\n  // Responsive hiding\n  ","\n  ","\n  \n\n  // Borders\n  border-radius: ",";\n  border-style: ",";\n  border-width: ",";\n  border-color: ",";\n  border: ",";\n\n  // Shadows\n  box-shadow: ",";\n\n  // Handlers\n  pointer-events: ",";\n  &:hover {\n    ","\n  }\n\n  // Display\n  display: ",";\n\n  // Position\n  position: ",";\n  left: ",";\n  right: ",";\n  top: ",";\n  bottom: ",";\n  z-index: ",";\n  overflow: ",";\n  cursor: ",";\n\n  // Size\n  width: ",";\n  max-width: ",";\n  min-width: ",";\n  height: ",";\n  max-height: ",";\n  min-height: ",";\n\n  // Animation\n  transition: ",";\n  transform: ",";\n  animation: ",";\n\n  //Flexbox children props\n  flex-shrink: ",";\n  flex-grow: ",";\n  flex-basis: ",";\n  flex: ",";\n\n  // Text\n  text-align: ",";\n  text-transform: ",";\n  line-height: ",";\n\n  // Cursor\n  cursor: ",";\n"])),(function(n){var e=n.fontSize;return n.theme.fontSizes[e]||e}),(function(n){var e=n.theme,t=n.background;return e.colors[t]}),(function(n){var e=n.theme,t=n.color;return e.colors[t]}),(function(n){var e=n.theme,t=n.padding;return Object(f.a)("padding",t,e)}),(function(n){var e=n.theme,t=n.paddingTop;return Object(f.a)("padding-top",t,e)}),(function(n){var e=n.theme,t=n.paddingRight;return Object(f.a)("padding-right",t,e)}),(function(n){var e=n.theme,t=n.paddingBottom;return Object(f.a)("padding-bottom",t,e)}),(function(n){var e=n.theme,t=n.paddingLeft;return Object(f.a)("padding-left",t,e)}),(function(n){var e=n.theme,t=n.marginLeft;return Object(f.a)("margin-left",t,e)}),(function(n){var e=n.theme,t=n.marginRight;return Object(f.a)("margin-right",t,e)}),(function(n){var e=n.theme,t=n.marginTop;return Object(f.a)("margin-top",t,e)}),(function(n){var e=n.theme,t=n.marginBottom;return Object(f.a)("margin-bottom",t,e)}),(function(n){var e=n.theme;return n.hiddenS?"".concat(e.mediaQueries.tablet," { display: none; }"):void 0}),(function(n){var e=n.theme;return n.hiddenXS?"".concat(e.mediaQueries.mobile," { display: none; }"):void 0}),(function(n){var e=n.theme,t=n.hasRadius,r=n.borderRadius;return t?e.borderRadius:r}),(function(n){return n.borderStyle}),(function(n){return n.borderWidth}),(function(n){var e=n.borderColor;return n.theme.colors[e]}),(function(n){var e=n.theme,t=n.borderColor,r=n.borderStyle,o=n.borderWidth;if(t&&!r&&!o)return"1px solid ".concat(e.colors[t])}),(function(n){var e=n.theme,t=n.shadow;return e.shadows[t]}),(function(n){return n.pointerEvents}),(function(n){var e=n._hover,t=n.theme;return e?e(t):void 0}),(function(n){return n.display}),(function(n){return n.position}),(function(n){var e=n.left;return n.theme.spaces[e]||e}),(function(n){var e=n.right;return n.theme.spaces[e]||e}),(function(n){var e=n.top;return n.theme.spaces[e]||e}),(function(n){var e=n.bottom;return n.theme.spaces[e]||e}),(function(n){return n.zIndex}),(function(n){return n.overflow}),(function(n){return n.cursor}),(function(n){var e=n.width;return n.theme.spaces[e]||e}),(function(n){var e=n.maxWidth;return n.theme.spaces[e]||e}),(function(n){var e=n.minWidth;return n.theme.spaces[e]||e}),(function(n){var e=n.height;return n.theme.spaces[e]||e}),(function(n){var e=n.maxHeight;return n.theme.spaces[e]||e}),(function(n){var e=n.minHeight;return n.theme.spaces[e]||e}),(function(n){return n.transition}),(function(n){return n.transform}),(function(n){return n.animation}),(function(n){return n.shrink}),(function(n){return n.grow}),(function(n){return n.basis}),(function(n){return n.flex}),(function(n){return n.textAlign}),(function(n){return n.textTransform}),(function(n){return n.lineHeight}),(function(n){return n.cursor}));p.displayName="Box",p.defaultProps={background:void 0,borderColor:void 0,color:void 0,hiddenS:!1,hiddenXS:!1,padding:void 0,paddingTop:void 0,paddingRight:void 0,paddingBottom:void 0,paddingLeft:void 0,hasRadius:!1,shadow:void 0,children:null,shrink:void 0,grow:void 0,basis:void 0,flex:void 0,_hover:function(){}},p.propTypes={_hover:u.a.func,background:u.a.string,basis:u.a.oneOfType([u.a.string,u.a.string]),borderColor:u.a.string,children:u.a.oneOfType([u.a.node,u.a.string]),color:u.a.string,flex:u.a.oneOfType([u.a.string,u.a.string]),grow:u.a.oneOfType([u.a.string,u.a.string]),hasRadius:u.a.bool,hiddenS:u.a.bool,hiddenXS:u.a.bool,padding:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingBottom:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingLeft:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingRight:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingTop:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),shadow:u.a.string,shrink:u.a.oneOfType([u.a.string,u.a.string])}},5:function(n,e,t){var r=t(22);n.exports=function(n,e){if(null==n)return{};var t,o,i=r(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(o=0;o<a.length;o++)t=a[o],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i},n.exports.default=n.exports,n.exports.__esModule=!0},6:function(n,e){function t(){return n.exports=t=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},n.exports.default=n.exports,n.exports.__esModule=!0,t.apply(this,arguments)}n.exports=t,n.exports.default=n.exports,n.exports.__esModule=!0},7:function(n,e,t){"use strict";var r=t(10),o=t.n(r),i=t(13),a=t.n(i);e.a=function(n,e,t){var r=e;if(Array.isArray(e)||"object"!==a()(e)||(r=[null==e?void 0:e.desktop,null==e?void 0:e.tablet,null==e?void 0:e.mobile]),void 0!==r){if(Array.isArray(r)){var i=r,u=o()(i,3),s=u[0],c=u[1],f=u[2],d="".concat(n,": ").concat(t.spaces[s],";");return void 0!==c&&(d+="".concat(t.mediaQueries.tablet,"{\n          ").concat(n,": ").concat(t.spaces[c],";\n        }")),void 0!==f&&(d+="".concat(t.mediaQueries.mobile,"{\n          ").concat(n,": ").concat(t.spaces[f],";\n        }")),d}var p=t.spaces[r]||r;return"".concat(n,": ").concat(p,";")}}}})}));

/***/ }),

/***/ 58774:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_App)
});

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/react/index.js
var react = __webpack_require__(53547);
// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__(15482);
// EXTERNAL MODULE: ./node_modules/react-intl/index.js
var react_intl = __webpack_require__(97132);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/index.js
var build = __webpack_require__(68547);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/utils/index.js + 2 modules
var utils = __webpack_require__(50779);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.cjs.js
var styled_components_browser_cjs = __webpack_require__(78384);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Layout.js
var Layout = __webpack_require__(35395);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Main.js
var Main = __webpack_require__(80117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Button.js
var Button = __webpack_require__(64459);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Plus.js
var Plus = __webpack_require__(89326);
var Plus_default = /*#__PURE__*/__webpack_require__.n(Plus);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Box.js
var Box = __webpack_require__(94117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/BaseCheckbox.js
var BaseCheckbox = __webpack_require__(46458);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/UploadAssetDialog/UploadAssetDialog.js + 7 modules
var UploadAssetDialog = __webpack_require__(19839);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/EditAssetDialog/index.js + 11 modules
var EditAssetDialog = __webpack_require__(56219);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/AssetList/index.js + 1 modules
var AssetList = __webpack_require__(71382);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/SortPicker/index.js
var SortPicker = __webpack_require__(45687);
// EXTERNAL MODULE: ./node_modules/react-query/lib/index.js
var lib = __webpack_require__(23724);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/LiveRegions.js
var LiveRegions = __webpack_require__(67422);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/hooks/useAssets.js
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






const useAssets = ({ skipWhen }) => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const toggleNotification = (0,build.useNotification)();
  const { notifyStatus } = (0,LiveRegions.useNotifyAT)();
  const [{ rawQuery }] = (0,build.useQueryParams)();
  const dataRequestURL = (0,utils/* getRequestUrl */.IF)("files");
  const getAssets = () => __async(undefined, null, function* () {
    const { data: data2 } = yield utils/* axiosInstance.get */.be.get(`${dataRequestURL}${rawQuery}`);
    return data2;
  });
  const { data, error, isLoading } = (0,lib.useQuery)([`assets`, rawQuery], getAssets, {
    enabled: !skipWhen,
    staleTime: 0,
    cacheTime: 0
  });
  (0,react.useEffect)(() => {
    if (data) {
      notifyStatus(formatMessage({
        id: "list.asset.at.finished",
        defaultMessage: "The assets have finished loading."
      }));
    }
  }, [data, notifyStatus, formatMessage]);
  (0,react.useEffect)(() => {
    if (error) {
      toggleNotification({
        type: "warning",
        message: { id: "notification.error" }
      });
    }
  }, [error, toggleNotification]);
  return { data, error, isLoading };
};

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Filter.js
var Filter = __webpack_require__(88231);
var Filter_default = /*#__PURE__*/__webpack_require__.n(Filter);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/FilterList/index.js + 1 modules
var FilterList = __webpack_require__(99398);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/FilterPopover/index.js + 2 modules
var FilterPopover = __webpack_require__(32269);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/utils/displayedFilters.js
var displayedFilters = __webpack_require__(62082);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/pages/App/components/Filters.js








const Filters = () => {
  var _a;
  const buttonRef = (0,react.useRef)(null);
  const [isVisible, setVisible] = (0,react.useState)(false);
  const { formatMessage } = (0,react_intl.useIntl)();
  const [{ query }, setQuery] = (0,build.useQueryParams)();
  const filters = ((_a = query == null ? void 0 : query.filters) == null ? void 0 : _a.$and) || [];
  const toggleFilter = () => setVisible((prev) => !prev);
  const handleRemoveFilter = (nextFilters) => {
    setQuery({ filters: { $and: nextFilters }, page: 1 });
  };
  const handleSubmit = (filters2) => {
    setQuery({ filters: { $and: filters2 }, page: 1 });
  };
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Button.Button, {
    variant: "tertiary",
    ref: buttonRef,
    startIcon: /* @__PURE__ */ react.createElement((Filter_default()), null),
    onClick: toggleFilter,
    size: "S"
  }, formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" })), isVisible && /* @__PURE__ */ react.createElement(FilterPopover/* default */.Z, {
    displayedFilters: displayedFilters/* default */.Z,
    filters,
    onSubmit: handleSubmit,
    onToggle: toggleFilter,
    source: buttonRef
  }), /* @__PURE__ */ react.createElement(FilterList/* default */.Z, {
    appliedFilters: filters,
    filtersSchema: displayedFilters/* default */.Z,
    onRemoveFilter: handleRemoveFilter
  }));
};

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Flex.js
var Flex = __webpack_require__(40264);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/PaginationFooter/index.js





const PaginationFooter = ({ pagination }) => {
  return /* @__PURE__ */ react.createElement(Box.Box, {
    paddingTop: 6
  }, /* @__PURE__ */ react.createElement(Flex.Flex, {
    alignItems: "flex-end",
    justifyContent: "space-between"
  }, /* @__PURE__ */ react.createElement(build.PageSizeURLQuery, null), /* @__PURE__ */ react.createElement(build.PaginationURLQuery, {
    pagination
  })));
};
PaginationFooter.defaultProps = {
  pagination: {
    pageCount: 0,
    pageSize: 10,
    total: 0
  }
};
PaginationFooter.propTypes = {
  pagination: prop_types_default().shape({
    page: (prop_types_default()).number,
    pageCount: (prop_types_default()).number,
    pageSize: (prop_types_default()).number,
    total: (prop_types_default()).number
  })
};

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/hooks/useMediaLibraryPermissions.js
var useMediaLibraryPermissions = __webpack_require__(60269);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Typography.js
var Typography = __webpack_require__(33483);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Stack.js
var Stack = __webpack_require__(9524);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Trash.js
var Trash = __webpack_require__(62982);
var Trash_default = /*#__PURE__*/__webpack_require__.n(Trash);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/utils/removeAssetQuery.js
var removeAssetQuery = __webpack_require__(45454);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/hooks/useBulkRemoveAsset.js
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



const bulkRemoveQuery = (assetIds) => {
  const promises = assetIds.map((assetId) => (0,removeAssetQuery/* removeAssetRequest */.H)(assetId));
  return Promise.all(promises);
};
const useBulkRemoveAsset = () => {
  const toggleNotification = (0,build.useNotification)();
  const queryClient = (0,lib.useQueryClient)();
  const mutation = (0,lib.useMutation)(bulkRemoveQuery, {
    onSuccess: () => {
      queryClient.refetchQueries(["assets"], { active: true });
      queryClient.refetchQueries(["asset-count"], { active: true });
      toggleNotification({
        type: "success",
        message: {
          id: "modal.remove.success-label",
          defaultMessage: "The asset has been successfully removed."
        }
      });
    },
    onError: (error) => {
      toggleNotification({ type: "warning", message: error.message });
    }
  });
  const removeAssets = (assetIds) => mutation.mutateAsync(assetIds);
  return __spreadProps(__spreadValues({}, mutation), { removeAssets });
};

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/utils/getTrad.js
var getTrad = __webpack_require__(93593);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/pages/App/components/BulkDeleteButton.js
var BulkDeleteButton_async = (__this, __arguments, generator) => {
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










const BulkDeleteButton = ({ selectedAssets, onSuccess }) => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const [showConfirmDialog, setShowConfirmDialog] = (0,react.useState)(false);
  const { isLoading, removeAssets } = useBulkRemoveAsset();
  const handleConfirmRemove = () => BulkDeleteButton_async(undefined, null, function* () {
    yield removeAssets(selectedAssets.map(({ id }) => id));
    onSuccess();
  });
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Stack.Stack, {
    horizontal: true,
    spacing: 2,
    paddingBottom: 5
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "epsilon",
    textColor: "neutral600"
  }, formatMessage({
    id: (0,getTrad/* default */.Z)("list.assets.selected"),
    defaultMessage: "{number, plural, =0 {No asset} one {1 asset} other {# assets}} selected"
  }, {
    number: selectedAssets.length
  })), /* @__PURE__ */ react.createElement(Button.Button, {
    variant: "danger-light",
    size: "S",
    startIcon: /* @__PURE__ */ react.createElement((Trash_default()), null),
    onClick: () => setShowConfirmDialog(true)
  }, formatMessage({ id: "global.delete", defaultMessage: "Delete" }))), /* @__PURE__ */ react.createElement(build.ConfirmDialog, {
    isConfirmButtonLoading: isLoading,
    isOpen: showConfirmDialog,
    onToggleDialog: () => setShowConfirmDialog(false),
    onConfirm: handleConfirmRemove
  }));
};
BulkDeleteButton.propTypes = {
  selectedAssets: prop_types_default().arrayOf(prop_types_default().shape({})).isRequired,
  onSuccess: (prop_types_default()).func.isRequired
};

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-upload/admin/src/components/EmptyAssets/index.js + 1 modules
var EmptyAssets = __webpack_require__(54053);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/pages/App/MediaLibrary.js





















const BoxWithHeight = (0,styled_components_browser_cjs["default"])(Box.Box)`
  height: ${32 / 16}rem;
  display: flex;
  align-items: center;
`;
const MediaLibrary = () => {
  var _a;
  const {
    canRead,
    canCreate,
    canUpdate,
    canCopyLink,
    canDownload,
    isLoading: isLoadingPermissions
  } = (0,useMediaLibraryPermissions/* useMediaLibraryPermissions */.y)();
  const [{ query }, setQuery] = (0,build.useQueryParams)();
  const { formatMessage } = (0,react_intl.useIntl)();
  const { data, isLoading, error } = useAssets({
    skipWhen: !canRead
  });
  const handleChangeSort = (value) => {
    setQuery({ sort: value });
  };
  const [showUploadAssetDialog, setShowUploadAssetDialog] = (0,react.useState)(false);
  const [assetToEdit, setAssetToEdit] = (0,react.useState)(void 0);
  const [selected, { selectOne, selectAll }] = (0,build.useSelectionState)("id", []);
  const toggleUploadAssetDialog = () => setShowUploadAssetDialog((prev) => !prev);
  (0,build.useFocusWhenNavigate)();
  const loading = isLoadingPermissions || isLoading;
  const assets = data == null ? void 0 : data.results;
  const assetCount = ((_a = data == null ? void 0 : data.pagination) == null ? void 0 : _a.total) || 0;
  const isFiltering = Boolean(query._q || query.filters);
  return /* @__PURE__ */ react.createElement(Layout.Layout, null, /* @__PURE__ */ react.createElement(Main.Main, {
    "aria-busy": loading
  }, /* @__PURE__ */ react.createElement(Layout.HeaderLayout, {
    title: formatMessage({
      id: (0,utils/* getTrad */.OB)("plugin.name"),
      defaultMessage: "Media Library"
    }),
    subtitle: formatMessage({
      id: (0,utils/* getTrad */.OB)(assetCount > 0 ? "header.content.assets-multiple" : "header.content.assets.assets-single"),
      defaultMessage: "0 assets"
    }, { number: assetCount }),
    primaryAction: canCreate ? /* @__PURE__ */ react.createElement(Button.Button, {
      startIcon: /* @__PURE__ */ react.createElement((Plus_default()), null),
      onClick: toggleUploadAssetDialog
    }, formatMessage({
      id: (0,utils/* getTrad */.OB)("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    })) : void 0
  }), /* @__PURE__ */ react.createElement(Layout.ActionLayout, {
    startActions: /* @__PURE__ */ react.createElement(react.Fragment, null, canUpdate && /* @__PURE__ */ react.createElement(BoxWithHeight, {
      paddingLeft: 2,
      paddingRight: 2,
      background: "neutral0",
      hasRadius: true,
      borderColor: "neutral200"
    }, /* @__PURE__ */ react.createElement(BaseCheckbox.BaseCheckbox, {
      "aria-label": formatMessage({
        id: (0,utils/* getTrad */.OB)("bulk.select.label"),
        defaultMessage: "Select all assets"
      }),
      indeterminate: (assets == null ? void 0 : assets.length) > 0 && selected.length > 0 && selected.length !== (assets == null ? void 0 : assets.length),
      value: (assets == null ? void 0 : assets.length) > 0 && selected.length === (assets == null ? void 0 : assets.length),
      onChange: () => selectAll(assets)
    })), canRead && /* @__PURE__ */ react.createElement(SortPicker/* default */.Z, {
      onChangeSort: handleChangeSort
    }), canRead && /* @__PURE__ */ react.createElement(Filters, null)),
    endActions: /* @__PURE__ */ react.createElement(build.SearchURLQuery, {
      label: formatMessage({
        id: (0,utils/* getTrad */.OB)("search.label"),
        defaultMessage: "Search for an asset"
      })
    })
  }), /* @__PURE__ */ react.createElement(Layout.ContentLayout, null, selected.length > 0 && /* @__PURE__ */ react.createElement(BulkDeleteButton, {
    selectedAssets: selected,
    onSuccess: selectAll
  }), loading && /* @__PURE__ */ react.createElement(build.LoadingIndicatorPage, null), error && /* @__PURE__ */ react.createElement(build.AnErrorOccurred, null), !canRead && /* @__PURE__ */ react.createElement(build.NoPermissions, null), canRead && assets && assets.length === 0 && /* @__PURE__ */ react.createElement(EmptyAssets/* EmptyAssets */.i, {
    action: canCreate && !isFiltering ? /* @__PURE__ */ react.createElement(Button.Button, {
      variant: "secondary",
      startIcon: /* @__PURE__ */ react.createElement((Plus_default()), null),
      onClick: toggleUploadAssetDialog
    }, formatMessage({
      id: (0,utils/* getTrad */.OB)("header.actions.add-assets"),
      defaultMessage: "Add new assets"
    })) : void 0,
    content: isFiltering ? formatMessage({
      id: (0,utils/* getTrad */.OB)("list.assets-empty.title-withSearch"),
      defaultMessage: "There are no assets with the applied filters"
    }) : canCreate ? formatMessage({
      id: (0,utils/* getTrad */.OB)("list.assets.empty"),
      defaultMessage: "Upload your first assets..."
    }) : formatMessage({
      id: (0,utils/* getTrad */.OB)("list.assets.empty.no-permissions"),
      defaultMessage: "The asset list is empty"
    })
  }), canRead && assets && assets.length > 0 && /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(AssetList/* AssetList */.l, {
    assets,
    onEditAsset: setAssetToEdit,
    onSelectAsset: selectOne,
    selectedAssets: selected
  }), (data == null ? void 0 : data.pagination) && /* @__PURE__ */ react.createElement(PaginationFooter, {
    pagination: data.pagination
  })))), showUploadAssetDialog && /* @__PURE__ */ react.createElement(UploadAssetDialog/* UploadAssetDialog */.x, {
    onClose: toggleUploadAssetDialog,
    trackedLocation: "upload"
  }), assetToEdit && /* @__PURE__ */ react.createElement(EditAssetDialog/* EditAssetDialog */.s, {
    onClose: () => setAssetToEdit(void 0),
    asset: assetToEdit,
    canUpdate,
    canCopyLink,
    canDownload,
    trackedLocation: "upload"
  }));
};

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-upload/admin/src/pages/App/index.js






const App = () => {
  const [{ rawQuery }, setQuery] = (0,build.useQueryParams)();
  const { formatMessage } = (0,react_intl.useIntl)();
  const title = formatMessage({ id: (0,utils/* getTrad */.OB)("plugin.name"), defaultMessage: "Media Library" });
  (0,react.useEffect)(() => {
    if (!rawQuery) {
      setQuery({ sort: "updatedAt:DESC", page: 1, pageSize: 10 });
    }
  }, [rawQuery, setQuery]);
  if (rawQuery) {
    return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Helmet.Helmet, {
      title
    }), /* @__PURE__ */ react.createElement(MediaLibrary, null));
  }
  return null;
};
/* harmony default export */ const pages_App = (App);


/***/ })

}]);