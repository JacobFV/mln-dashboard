(self["webpackChunkdashboard"] = self["webpackChunkdashboard"] || []).push([[8853],{

/***/ 19417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_Roles)
});

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/react/index.js
var react = __webpack_require__(53547);
// EXTERNAL MODULE: ./node_modules/react-router-dom/cjs/react-router-dom.min.js
var react_router_dom_min = __webpack_require__(49656);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/index.js
var build = __webpack_require__(68547);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pluginId.js
var src_pluginId = __webpack_require__(83086);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/permissions.js
var permissions = __webpack_require__(51725);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Button.js
var Button = __webpack_require__(64459);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Layout.js
var Layout = __webpack_require__(35395);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Main.js
var Main = __webpack_require__(80117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Table.js
var Table = __webpack_require__(43546);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/VisuallyHidden.js
var VisuallyHidden = __webpack_require__(19631);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Typography.js
var Typography = __webpack_require__(33483);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/LiveRegions.js
var LiveRegions = __webpack_require__(67422);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Plus.js
var Plus = __webpack_require__(89326);
var Plus_default = /*#__PURE__*/__webpack_require__.n(Plus);
// EXTERNAL MODULE: ./node_modules/react-intl/index.js
var react_intl = __webpack_require__(97132);
// EXTERNAL MODULE: ./node_modules/react-query/lib/index.js
var lib = __webpack_require__(23724);
// EXTERNAL MODULE: ./node_modules/match-sorter/dist/match-sorter.cjs.js
var match_sorter_cjs = __webpack_require__(63852);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/index.js + 2 modules
var utils = __webpack_require__(42722);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ListPage/utils/api.js
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

const fetchData = (toggleNotification, notifyStatus) => __async(undefined, null, function* () {
  try {
    const { data } = yield utils/* axiosInstance.get */.be.get((0,utils/* getRequestURL */.Gc)("roles"));
    notifyStatus("The roles have loaded successfully");
    return data;
  } catch (err) {
    toggleNotification({
      type: "warning",
      message: { id: "notification.error" }
    });
    throw new Error("error");
  }
});
const deleteData = (id, toggleNotification) => __async(undefined, null, function* () {
  try {
    yield utils/* axiosInstance.delete */.be["delete"](`${(0,utils/* getRequestURL */.Gc)("roles")}/${id}`);
  } catch (error) {
    toggleNotification({
      type: "warning",
      message: { id: "notification.error", defaultMessage: "An error occured" }
    });
  }
});

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/IconButton.js
var IconButton = __webpack_require__(49549);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Flex.js
var Flex = __webpack_require__(40264);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Pencil.js
var Pencil = __webpack_require__(56204);
var Pencil_default = /*#__PURE__*/__webpack_require__.n(Pencil);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Trash.js
var Trash = __webpack_require__(62982);
var Trash_default = /*#__PURE__*/__webpack_require__.n(Trash);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ListPage/components/TableBody.js
var __defProp = Object.defineProperty;
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












const TableBody = ({ sortedRoles, canDelete, permissions, setRoleToDelete, onDelete }) => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const { push } = (0,react_router_dom_min.useHistory)();
  const [showConfirmDelete, setShowConfirmDelete] = onDelete;
  const checkCanDeleteRole = (role) => canDelete && !["public", "authenticated"].includes(role.type);
  const handleClickDelete = (id) => {
    setRoleToDelete(id);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleClickEdit = (id) => {
    push(`/settings/${src_pluginId/* default */.Z}/roles/${id}`);
  };
  return /* @__PURE__ */ react.createElement(Table.Tbody, null, sortedRoles == null ? void 0 : sortedRoles.map((role) => /* @__PURE__ */ react.createElement(Table.Tr, __spreadValues({
    key: role.name
  }, (0,build.onRowClick)({ fn: () => handleClickEdit(role.id) })), /* @__PURE__ */ react.createElement(Table.Td, {
    width: "20%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, null, role.name)), /* @__PURE__ */ react.createElement(Table.Td, {
    width: "50%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, null, role.description)), /* @__PURE__ */ react.createElement(Table.Td, {
    width: "30%"
  }, /* @__PURE__ */ react.createElement(Typography.Typography, null, `${role.nb_users} ${formatMessage({
    id: "global.users",
    defaultMessage: "users"
  }).toLowerCase()}`)), /* @__PURE__ */ react.createElement(Table.Td, null, /* @__PURE__ */ react.createElement(Flex.Flex, __spreadValues({
    justifyContent: "end"
  }, build.stopPropagation), /* @__PURE__ */ react.createElement(build.CheckPermissions, {
    permissions: permissions.updateRole
  }, /* @__PURE__ */ react.createElement(IconButton.IconButton, {
    onClick: () => handleClickEdit(role.id),
    noBorder: true,
    icon: /* @__PURE__ */ react.createElement((Pencil_default()), null),
    label: formatMessage({ id: "app.component.table.edit", defaultMessage: "Edit {target}" }, { target: `${role.name}` })
  })), checkCanDeleteRole(role) && /* @__PURE__ */ react.createElement(build.CheckPermissions, {
    permissions: permissions.deleteRole
  }, /* @__PURE__ */ react.createElement(IconButton.IconButton, {
    onClick: () => handleClickDelete(role.id),
    noBorder: true,
    icon: /* @__PURE__ */ react.createElement((Trash_default()), null),
    label: formatMessage({ id: "global.delete-target", defaultMessage: "Delete {target}" }, { target: `${role.name}` })
  })))))));
};
/* harmony default export */ const components_TableBody = (TableBody);
TableBody.defaultProps = {
  canDelete: false
};
TableBody.propTypes = {
  onDelete: (prop_types_default()).array.isRequired,
  permissions: (prop_types_default()).object.isRequired,
  setRoleToDelete: (prop_types_default()).func.isRequired,
  sortedRoles: (prop_types_default()).array.isRequired,
  canDelete: (prop_types_default()).bool
};

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ListPage/index.js
var ListPage_async = (__this, __arguments, generator) => {
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



















const RoleListPage = () => {
  const { trackUsage } = (0,build.useTracking)();
  const { formatMessage } = (0,react_intl.useIntl)();
  const { push } = (0,react_router_dom_min.useHistory)();
  const toggleNotification = (0,build.useNotification)();
  const { notifyStatus } = (0,LiveRegions.useNotifyAT)();
  const [{ query }] = (0,build.useQueryParams)();
  const _q = (query == null ? void 0 : query._q) || "";
  const [showConfirmDelete, setShowConfirmDelete] = (0,react.useState)(false);
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = (0,react.useState)(false);
  const [roleToDelete, setRoleToDelete] = (0,react.useState)();
  (0,build.useFocusWhenNavigate)();
  const queryClient = (0,lib.useQueryClient)();
  const updatePermissions = (0,react.useMemo)(() => {
    return {
      create: permissions/* default.createRole */.Z.createRole,
      read: permissions/* default.readRoles */.Z.readRoles,
      update: permissions/* default.updateRole */.Z.updateRole,
      delete: permissions/* default.deleteRole */.Z.deleteRole
    };
  }, []);
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canRead, canDelete }
  } = (0,build.useRBAC)(updatePermissions);
  const {
    isLoading: isLoadingForData,
    data: { roles },
    isFetching
  } = (0,lib.useQuery)("get-roles", () => fetchData(toggleNotification, notifyStatus), {
    initialData: {},
    enabled: canRead
  });
  const isLoading = isLoadingForData || isFetching;
  const handleNewRoleClick = () => {
    trackUsage("willCreateRole");
    push(`/settings/${src_pluginId/* default */.Z}/roles/new`);
  };
  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(!showConfirmDelete);
  };
  const emptyLayout = {
    roles: {
      id: (0,utils/* getTrad */.OB)("Roles.empty"),
      defaultMessage: "You don't have any roles yet."
    },
    search: {
      id: (0,utils/* getTrad */.OB)("Roles.empty.search"),
      defaultMessage: "No roles match the search."
    }
  };
  const pageTitle = formatMessage({
    id: "global.roles",
    defaultMessage: "Roles"
  });
  const deleteMutation = (0,lib.useMutation)((id) => deleteData(id, toggleNotification), {
    onSuccess: () => ListPage_async(undefined, null, function* () {
      yield queryClient.invalidateQueries("get-roles");
    })
  });
  const handleConfirmDelete = () => ListPage_async(undefined, null, function* () {
    setIsConfirmButtonLoading(true);
    yield deleteMutation.mutateAsync(roleToDelete);
    setShowConfirmDelete(!showConfirmDelete);
    setIsConfirmButtonLoading(false);
  });
  const sortedRoles = (0,match_sorter_cjs/* default */.ZP)(roles || [], _q, { keys: ["name", "description"] });
  const emptyContent = _q && !sortedRoles.length ? "search" : "roles";
  const colCount = 4;
  const rowCount = ((roles == null ? void 0 : roles.length) || 0) + 1;
  return /* @__PURE__ */ react.createElement(Layout.Layout, null, /* @__PURE__ */ react.createElement(build.SettingsPageTitle, {
    name: pageTitle
  }), /* @__PURE__ */ react.createElement(Main.Main, {
    "aria-busy": isLoading
  }, /* @__PURE__ */ react.createElement(Layout.HeaderLayout, {
    title: formatMessage({
      id: "global.roles",
      defaultMessage: "Roles"
    }),
    subtitle: formatMessage({
      id: "Settings.roles.list.description",
      defaultMessage: "List of roles"
    }),
    primaryAction: /* @__PURE__ */ react.createElement(build.CheckPermissions, {
      permissions: permissions/* default.createRole */.Z.createRole
    }, /* @__PURE__ */ react.createElement(Button.Button, {
      onClick: handleNewRoleClick,
      startIcon: /* @__PURE__ */ react.createElement((Plus_default()), null),
      size: "L"
    }, formatMessage({
      id: (0,utils/* getTrad */.OB)("List.button.roles"),
      defaultMessage: "Add new role"
    })))
  }), /* @__PURE__ */ react.createElement(Layout.ActionLayout, {
    startActions: /* @__PURE__ */ react.createElement(build.SearchURLQuery, {
      label: formatMessage({
        id: "app.component.search.label",
        defaultMessage: "Search"
      })
    })
  }), /* @__PURE__ */ react.createElement(Layout.ContentLayout, null, !canRead && /* @__PURE__ */ react.createElement(build.NoPermissions, null), (isLoading || isLoadingForPermissions) && /* @__PURE__ */ react.createElement(build.LoadingIndicatorPage, null), canRead && sortedRoles && (sortedRoles == null ? void 0 : sortedRoles.length) ? /* @__PURE__ */ react.createElement(Table.Table, {
    colCount,
    rowCount
  }, /* @__PURE__ */ react.createElement(Table.Thead, null, /* @__PURE__ */ react.createElement(Table.Tr, null, /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({ id: "global.name", defaultMessage: "Name" }))), /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({
    id: "global.description",
    defaultMessage: "Description"
  }))), /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, formatMessage({
    id: "global.users",
    defaultMessage: "Users"
  }))), /* @__PURE__ */ react.createElement(Table.Th, null, /* @__PURE__ */ react.createElement(VisuallyHidden.VisuallyHidden, null, formatMessage({
    id: "global.actions",
    defaultMessage: "Actions"
  }))))), /* @__PURE__ */ react.createElement(components_TableBody, {
    sortedRoles,
    canDelete,
    permissions: permissions/* default */.Z,
    setRoleToDelete,
    onDelete: [showConfirmDelete, setShowConfirmDelete]
  })) : /* @__PURE__ */ react.createElement(build.EmptyStateLayout, {
    content: emptyLayout[emptyContent]
  })), /* @__PURE__ */ react.createElement(build.ConfirmDialog, {
    isConfirmButtonLoading,
    onConfirm: handleConfirmDelete,
    onToggleDialog: handleShowConfirmDelete,
    isOpen: showConfirmDelete
  })));
};
/* harmony default export */ const ListPage = (RoleListPage);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ProtectedListPage/index.js




const ProtectedRolesListPage = () => {
  return /* @__PURE__ */ react.createElement(build.CheckPagePermissions, {
    permissions: permissions/* default.accessRoles */.Z.accessRoles
  }, /* @__PURE__ */ react.createElement(ListPage, null));
};
/* harmony default export */ const ProtectedListPage = (ProtectedRolesListPage);

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Stack.js
var Stack = __webpack_require__(9524);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Box.js
var Box = __webpack_require__(94117);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/TextInput.js
var TextInput = __webpack_require__(99136);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Textarea.js
var Textarea = __webpack_require__(78607);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/ArrowLeft.js
var ArrowLeft = __webpack_require__(87760);
var ArrowLeft_default = /*#__PURE__*/__webpack_require__.n(ArrowLeft);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Check.js
var Check = __webpack_require__(22754);
var Check_default = /*#__PURE__*/__webpack_require__.n(Check);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Link.js
var Link = __webpack_require__(56156);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Grid.js
var Grid = __webpack_require__(39272);
// EXTERNAL MODULE: ./node_modules/formik/dist/index.js
var dist = __webpack_require__(80831);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/getTrad.js
var getTrad = __webpack_require__(97961);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(96486);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/contexts/UsersPermissionsContext/index.js


const UsersPermissions = (0,react.createContext)({});
const UsersPermissionsProvider = ({ children, value }) => {
  return /* @__PURE__ */ react.createElement(UsersPermissions.Provider, {
    value
  }, children);
};
const useUsersPermissions = () => (0,react.useContext)(UsersPermissions);
UsersPermissionsProvider.propTypes = {
  children: (prop_types_default()).node.isRequired,
  value: (prop_types_default()).object.isRequired
};


// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.cjs.js
var styled_components_browser_cjs = __webpack_require__(78384);
// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__(35161);
var map_default = /*#__PURE__*/__webpack_require__.n(map);
// EXTERNAL MODULE: ./node_modules/lodash/tail.js
var tail = __webpack_require__(13217);
var tail_default = /*#__PURE__*/__webpack_require__.n(tail);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/BoundRoute/getMethodColor.js
const getMethodColor = (verb) => {
  switch (verb) {
    case "POST": {
      return {
        text: "success600",
        border: "success200",
        background: "success100"
      };
    }
    case "GET": {
      return {
        text: "secondary600",
        border: "secondary200",
        background: "secondary100"
      };
    }
    case "PUT": {
      return {
        text: "warning600",
        border: "warning200",
        background: "warning100"
      };
    }
    case "DELETE": {
      return {
        text: "danger600",
        border: "danger200",
        background: "danger100"
      };
    }
    default: {
      return {
        text: "neutral600",
        border: "neutral200",
        background: "neutral100"
      };
    }
  }
};
/* harmony default export */ const BoundRoute_getMethodColor = (getMethodColor);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/BoundRoute/index.js










const MethodBox = (0,styled_components_browser_cjs["default"])(Box.Box)`
  margin: -1px;
  border-radius: ${({ theme }) => theme.spaces[1]} 0 0 ${({ theme }) => theme.spaces[1]};
`;
function BoundRoute({ route }) {
  const { formatMessage } = (0,react_intl.useIntl)();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail_default()(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = BoundRoute_getMethodColor(route.method);
  return /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 2
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    as: "h3"
  }, formatMessage({
    id: "users-permissions.BoundRoute.title",
    defaultMessage: "Bound route to"
  }), "\xA0", /* @__PURE__ */ react.createElement("span", null, controller), /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    textColor: "primary600"
  }, ".", action)), /* @__PURE__ */ react.createElement(Stack.Stack, {
    horizontal: true,
    hasRadius: true,
    background: "neutral0",
    borderColor: "neutral200",
    spacing: 0
  }, /* @__PURE__ */ react.createElement(MethodBox, {
    background: colors.background,
    borderColor: colors.border,
    padding: 2
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    fontWeight: "bold",
    textColor: colors.text
  }, method)), /* @__PURE__ */ react.createElement(Box.Box, {
    paddingLeft: 2,
    paddingRight: 2
  }, map_default()(formattedRoute, (value) => /* @__PURE__ */ react.createElement(Typography.Typography, {
    key: value,
    textColor: value.includes(":") ? "neutral600" : "neutral900"
  }, "/", value)))));
}
BoundRoute.defaultProps = {
  route: {
    handler: "Nocontroller.error",
    method: "GET",
    path: "/there-is-no-path"
  }
};
BoundRoute.propTypes = {
  route: prop_types_default().shape({
    handler: (prop_types_default()).string,
    method: (prop_types_default()).string,
    path: (prop_types_default()).string
  })
};
/* harmony default export */ const components_BoundRoute = (BoundRoute);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Policies/index.js








const Policies = () => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const { selectedAction, routes } = useUsersPermissions();
  const path = (0,lodash.without)(selectedAction.split("."), "controllers");
  const controllerRoutes = (0,lodash.get)(routes, path[0]);
  const pathResolved = path.slice(1).join(".");
  const displayedRoutes = (0,lodash.isEmpty)(controllerRoutes) ? [] : controllerRoutes.filter((o) => o.handler.endsWith(pathResolved));
  return /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 5,
    background: "neutral150",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7,
    style: { minHeight: "100%" }
  }, selectedAction ? /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 2
  }, displayedRoutes.map((route, key) => /* @__PURE__ */ react.createElement(components_BoundRoute, {
    key,
    route
  }))) : /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 2
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    as: "h3"
  }, formatMessage({
    id: "users-permissions.Policies.header.title",
    defaultMessage: "Advanced settings"
  })), /* @__PURE__ */ react.createElement(Typography.Typography, {
    as: "p",
    textColor: "neutral600"
  }, formatMessage({
    id: "users-permissions.Policies.header.hint",
    defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
  }))));
};
/* harmony default export */ const components_Policies = (Policies);

// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Accordion.js
var Accordion = __webpack_require__(47949);
// EXTERNAL MODULE: ./node_modules/lodash/upperFirst.js
var upperFirst = __webpack_require__(11700);
var upperFirst_default = /*#__PURE__*/__webpack_require__.n(upperFirst);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/formatPluginName.js

function formatPluginName(pluginSlug) {
  switch (pluginSlug) {
    case "application":
      return "Application";
    case "plugin::content-manager":
      return "Content manager";
    case "plugin::content-type-builder":
      return "Content types builder";
    case "plugin::documentation":
      return "Documentation";
    case "plugin::email":
      return "Email";
    case "plugin::i18n":
      return "i18n";
    case "plugin::upload":
      return "Upload";
    case "plugin::users-permissions":
      return "Users-permissions";
    default:
      return upperFirst_default()(pluginSlug.replace("api::", "").replace("plugin::", ""));
  }
}
/* harmony default export */ const utils_formatPluginName = (formatPluginName);

// EXTERNAL MODULE: ./node_modules/lodash/sortBy.js
var sortBy = __webpack_require__(89734);
var sortBy_default = /*#__PURE__*/__webpack_require__.n(sortBy);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/design-system/Checkbox.js
var Checkbox = __webpack_require__(43499);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/@strapi/icons/Cog.js
var Cog = __webpack_require__(17581);
var Cog_default = /*#__PURE__*/__webpack_require__.n(Cog);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/PermissionRow/CheckboxWrapper.js


const activeCheckboxWrapperStyles = styled_components_browser_cjs.css`
  background: ${(props) => props.theme.colors.primary100};
  svg {
    opacity: 1;
  }
`;
const CheckboxWrapper = (0,styled_components_browser_cjs["default"])(Box.Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    opacity: 0;
    path {
      fill: ${(props) => props.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${(props) => props.isActive && activeCheckboxWrapperStyles}
  &:hover {
    ${activeCheckboxWrapperStyles}
  }
`;
/* harmony default export */ const PermissionRow_CheckboxWrapper = (CheckboxWrapper);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/PermissionRow/SubCategory.js













const Border = styled_components_browser_cjs["default"].div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const SubCategory = ({ subCategory }) => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const {
    onChange,
    onChangeSelectAll,
    onSelectedAction,
    selectedAction,
    modifiedData
  } = useUsersPermissions();
  const currentScopedModifiedData = (0,react.useMemo)(() => {
    return (0,lodash.get)(modifiedData, subCategory.name, {});
  }, [modifiedData, subCategory]);
  const hasAllActionsSelected = (0,react.useMemo)(() => {
    return Object.values(currentScopedModifiedData).every((action) => action.enabled === true);
  }, [currentScopedModifiedData]);
  const hasSomeActionsSelected = (0,react.useMemo)(() => {
    return Object.values(currentScopedModifiedData).some((action) => action.enabled === true) && !hasAllActionsSelected;
  }, [currentScopedModifiedData, hasAllActionsSelected]);
  const handleChangeSelectAll = (0,react.useCallback)(({ target: { name } }) => {
    onChangeSelectAll({ target: { name, value: !hasAllActionsSelected } });
  }, [hasAllActionsSelected, onChangeSelectAll]);
  const isActionSelected = (0,react.useCallback)((actionName) => {
    return selectedAction === actionName;
  }, [selectedAction]);
  return /* @__PURE__ */ react.createElement(Box.Box, null, /* @__PURE__ */ react.createElement(Flex.Flex, {
    justifyContent: "space-between",
    alignItems: "center"
  }, /* @__PURE__ */ react.createElement(Box.Box, {
    paddingRight: 4
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "sigma",
    textColor: "neutral600"
  }, subCategory.label)), /* @__PURE__ */ react.createElement(Border, null), /* @__PURE__ */ react.createElement(Box.Box, {
    paddingLeft: 4
  }, /* @__PURE__ */ react.createElement(Checkbox.Checkbox, {
    name: subCategory.name,
    value: hasAllActionsSelected,
    onValueChange: (value) => handleChangeSelectAll({ target: { name: subCategory.name, value } }),
    indeterminate: hasSomeActionsSelected
  }, formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })))), /* @__PURE__ */ react.createElement(Flex.Flex, {
    paddingTop: 6,
    paddingBottom: 6
  }, /* @__PURE__ */ react.createElement(Grid.Grid, {
    gap: 2,
    style: { flex: 1 }
  }, subCategory.actions.map((action) => {
    const name = `${action.name}.enabled`;
    return /* @__PURE__ */ react.createElement(Grid.GridItem, {
      col: 6,
      key: action.name
    }, /* @__PURE__ */ react.createElement(PermissionRow_CheckboxWrapper, {
      isActive: isActionSelected(action.name),
      padding: 2,
      hasRadius: true
    }, /* @__PURE__ */ react.createElement(Checkbox.Checkbox, {
      value: (0,lodash.get)(modifiedData, name, false),
      name,
      onValueChange: (value) => onChange({ target: { name, value } })
    }, action.label), /* @__PURE__ */ react.createElement("button", {
      type: "button",
      "data-testid": "action-cog",
      onClick: () => onSelectedAction(action.name),
      style: { display: "inline-flex", alignItems: "center" }
    }, /* @__PURE__ */ react.createElement((Cog_default()), null))));
  }))));
};
SubCategory.propTypes = {
  subCategory: (prop_types_default()).object.isRequired
};
/* harmony default export */ const PermissionRow_SubCategory = (SubCategory);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/PermissionRow/index.js
var PermissionRow_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var PermissionRow_getOwnPropSymbols = Object.getOwnPropertySymbols;
var PermissionRow_hasOwnProp = Object.prototype.hasOwnProperty;
var PermissionRow_propIsEnum = Object.prototype.propertyIsEnumerable;
var PermissionRow_defNormalProp = (obj, key, value) => key in obj ? PermissionRow_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var PermissionRow_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (PermissionRow_hasOwnProp.call(b, prop))
      PermissionRow_defNormalProp(a, prop, b[prop]);
  if (PermissionRow_getOwnPropSymbols)
    for (var prop of PermissionRow_getOwnPropSymbols(b)) {
      if (PermissionRow_propIsEnum.call(b, prop))
        PermissionRow_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));





const PermissionRow = ({ name, permissions }) => {
  const subCategories = (0,react.useMemo)(() => {
    return sortBy_default()(Object.values(permissions.controllers).reduce((acc, curr, index) => {
      const currentName = `${name}.controllers.${Object.keys(permissions.controllers)[index]}`;
      const actions = sortBy_default()(Object.keys(curr).reduce((acc2, current) => {
        return [
          ...acc2,
          __spreadProps(PermissionRow_spreadValues({}, curr[current]), {
            label: current,
            name: `${currentName}.${current}`
          })
        ];
      }, []), "label");
      return [
        ...acc,
        {
          actions,
          label: Object.keys(permissions.controllers)[index],
          name: currentName
        }
      ];
    }, []), "label");
  }, [name, permissions]);
  return /* @__PURE__ */ react.createElement(Box.Box, {
    padding: 6
  }, subCategories.map((subCategory) => /* @__PURE__ */ react.createElement(PermissionRow_SubCategory, {
    key: subCategory.name,
    subCategory
  })));
};
PermissionRow.propTypes = {
  name: (prop_types_default()).string.isRequired,
  permissions: (prop_types_default()).object.isRequired
};
/* harmony default export */ const Permissions_PermissionRow = (PermissionRow);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/init.js
var init_defProp = Object.defineProperty;
var init_defProps = Object.defineProperties;
var init_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var init_getOwnPropSymbols = Object.getOwnPropertySymbols;
var init_hasOwnProp = Object.prototype.hasOwnProperty;
var init_propIsEnum = Object.prototype.propertyIsEnumerable;
var init_defNormalProp = (obj, key, value) => key in obj ? init_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var init_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (init_hasOwnProp.call(b, prop))
      init_defNormalProp(a, prop, b[prop]);
  if (init_getOwnPropSymbols)
    for (var prop of init_getOwnPropSymbols(b)) {
      if (init_propIsEnum.call(b, prop))
        init_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var init_spreadProps = (a, b) => init_defProps(a, init_getOwnPropDescs(b));
const init_init = (initialState, permissions) => {
  const collapses = Object.keys(permissions).sort().map((name) => ({ name, isOpen: false }));
  return init_spreadProps(init_spreadValues({}, initialState), { collapses });
};
/* harmony default export */ const Permissions_init = (init_init);

// EXTERNAL MODULE: ./node_modules/immer/dist/immer.cjs.production.min.js
var immer_cjs_production_min = __webpack_require__(8041);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/reducer.js
var reducer_defProp = Object.defineProperty;
var reducer_defProps = Object.defineProperties;
var reducer_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var reducer_getOwnPropSymbols = Object.getOwnPropertySymbols;
var reducer_hasOwnProp = Object.prototype.hasOwnProperty;
var reducer_propIsEnum = Object.prototype.propertyIsEnumerable;
var reducer_defNormalProp = (obj, key, value) => key in obj ? reducer_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var reducer_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (reducer_hasOwnProp.call(b, prop))
      reducer_defNormalProp(a, prop, b[prop]);
  if (reducer_getOwnPropSymbols)
    for (var prop of reducer_getOwnPropSymbols(b)) {
      if (reducer_propIsEnum.call(b, prop))
        reducer_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var reducer_spreadProps = (a, b) => reducer_defProps(a, reducer_getOwnPropDescs(b));

const reducer_initialState = {
  collapses: []
};
const reducer_reducer = (state, action) => (0,immer_cjs_production_min["default"])(state, (draftState) => {
  switch (action.type) {
    case "TOGGLE_COLLAPSE": {
      draftState.collapses = state.collapses.map((collapse, index) => {
        if (index === action.index) {
          return reducer_spreadProps(reducer_spreadValues({}, collapse), { isOpen: !collapse.isOpen });
        }
        return reducer_spreadProps(reducer_spreadValues({}, collapse), { isOpen: false });
      });
      break;
    }
    default:
      return draftState;
  }
});


;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/Permissions/index.js










const Permissions = () => {
  const { modifiedData } = useUsersPermissions();
  const { formatMessage } = (0,react_intl.useIntl)();
  const [{ collapses }, dispatch] = (0,react.useReducer)(reducer_reducer, reducer_initialState, (state) => Permissions_init(state, modifiedData));
  const handleToggle = (index) => dispatch({
    type: "TOGGLE_COLLAPSE",
    index
  });
  return /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 1
  }, collapses.map((collapse, index) => /* @__PURE__ */ react.createElement(Accordion.Accordion, {
    expanded: collapse.isOpen,
    onToggle: () => handleToggle(index),
    key: collapse.name,
    variant: index % 2 === 0 ? "secondary" : void 0
  }, /* @__PURE__ */ react.createElement(Accordion.AccordionToggle, {
    title: utils_formatPluginName(collapse.name),
    description: formatMessage({
      id: "users-permissions.Plugin.permissions.plugins.description",
      defaultMessage: "Define all allowed actions for the {name} plugin."
    }, { name: collapse.name }),
    variant: index % 2 ? "primary" : "secondary"
  }), /* @__PURE__ */ react.createElement(Accordion.AccordionContent, null, /* @__PURE__ */ react.createElement(Box.Box, null, /* @__PURE__ */ react.createElement(Permissions_PermissionRow, {
    permissions: modifiedData[collapse.name],
    name: collapse.name
  }))))));
};
/* harmony default export */ const components_Permissions = (Permissions);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/UsersPermissions/reducer.js
var UsersPermissions_reducer_defProp = Object.defineProperty;
var UsersPermissions_reducer_defProps = Object.defineProperties;
var UsersPermissions_reducer_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var UsersPermissions_reducer_getOwnPropSymbols = Object.getOwnPropertySymbols;
var UsersPermissions_reducer_hasOwnProp = Object.prototype.hasOwnProperty;
var UsersPermissions_reducer_propIsEnum = Object.prototype.propertyIsEnumerable;
var UsersPermissions_reducer_defNormalProp = (obj, key, value) => key in obj ? UsersPermissions_reducer_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var UsersPermissions_reducer_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (UsersPermissions_reducer_hasOwnProp.call(b, prop))
      UsersPermissions_reducer_defNormalProp(a, prop, b[prop]);
  if (UsersPermissions_reducer_getOwnPropSymbols)
    for (var prop of UsersPermissions_reducer_getOwnPropSymbols(b)) {
      if (UsersPermissions_reducer_propIsEnum.call(b, prop))
        UsersPermissions_reducer_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var UsersPermissions_reducer_spreadProps = (a, b) => UsersPermissions_reducer_defProps(a, UsersPermissions_reducer_getOwnPropDescs(b));


const UsersPermissions_reducer_initialState = {
  initialData: {},
  modifiedData: {},
  routes: {},
  selectedAction: "",
  policies: []
};
const UsersPermissions_reducer_reducer = (state, action) => (0,immer_cjs_production_min["default"])(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      const keysLength = action.keys.length;
      const isChangingCheckbox = action.keys[keysLength - 1] === "enabled";
      if (action.value && isChangingCheckbox) {
        const selectedAction = (0,lodash.take)(action.keys, keysLength - 1).join(".");
        draftState.selectedAction = selectedAction;
      }
      (0,lodash.set)(draftState, ["modifiedData", ...action.keys], action.value);
      break;
    }
    case "ON_CHANGE_SELECT_ALL": {
      const pathToValue = ["modifiedData", ...action.keys];
      const oldValues = (0,lodash.get)(state, pathToValue, {});
      const updatedValues = Object.keys(oldValues).reduce((acc, current) => {
        acc[current] = UsersPermissions_reducer_spreadProps(UsersPermissions_reducer_spreadValues({}, oldValues[current]), { enabled: action.value });
        return acc;
      }, {});
      (0,lodash.set)(draftState, pathToValue, updatedValues);
      break;
    }
    case "ON_RESET": {
      draftState.modifiedData = state.initialData;
      break;
    }
    case "ON_SUBMIT_SUCCEEDED": {
      draftState.initialData = state.modifiedData;
      break;
    }
    case "SELECT_ACTION": {
      const { actionToSelect } = action;
      draftState.selectedAction = actionToSelect === state.selectedAction ? "" : actionToSelect;
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const UsersPermissions_reducer = (UsersPermissions_reducer_reducer);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/UsersPermissions/init.js
var UsersPermissions_init_defProp = Object.defineProperty;
var UsersPermissions_init_defProps = Object.defineProperties;
var UsersPermissions_init_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var UsersPermissions_init_getOwnPropSymbols = Object.getOwnPropertySymbols;
var UsersPermissions_init_hasOwnProp = Object.prototype.hasOwnProperty;
var UsersPermissions_init_propIsEnum = Object.prototype.propertyIsEnumerable;
var UsersPermissions_init_defNormalProp = (obj, key, value) => key in obj ? UsersPermissions_init_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var UsersPermissions_init_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (UsersPermissions_init_hasOwnProp.call(b, prop))
      UsersPermissions_init_defNormalProp(a, prop, b[prop]);
  if (UsersPermissions_init_getOwnPropSymbols)
    for (var prop of UsersPermissions_init_getOwnPropSymbols(b)) {
      if (UsersPermissions_init_propIsEnum.call(b, prop))
        UsersPermissions_init_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var UsersPermissions_init_spreadProps = (a, b) => UsersPermissions_init_defProps(a, UsersPermissions_init_getOwnPropDescs(b));
const UsersPermissions_init_init = (state, permissions, routes) => {
  return UsersPermissions_init_spreadProps(UsersPermissions_init_spreadValues({}, state), {
    initialData: permissions,
    modifiedData: permissions,
    routes
  });
};
/* harmony default export */ const UsersPermissions_init = (UsersPermissions_init_init);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/UsersPermissions/index.js
var UsersPermissions_defProp = Object.defineProperty;
var UsersPermissions_defProps = Object.defineProperties;
var UsersPermissions_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var UsersPermissions_getOwnPropSymbols = Object.getOwnPropertySymbols;
var UsersPermissions_hasOwnProp = Object.prototype.hasOwnProperty;
var UsersPermissions_propIsEnum = Object.prototype.propertyIsEnumerable;
var UsersPermissions_defNormalProp = (obj, key, value) => key in obj ? UsersPermissions_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var UsersPermissions_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (UsersPermissions_hasOwnProp.call(b, prop))
      UsersPermissions_defNormalProp(a, prop, b[prop]);
  if (UsersPermissions_getOwnPropSymbols)
    for (var prop of UsersPermissions_getOwnPropSymbols(b)) {
      if (UsersPermissions_propIsEnum.call(b, prop))
        UsersPermissions_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var UsersPermissions_spreadProps = (a, b) => UsersPermissions_defProps(a, UsersPermissions_getOwnPropDescs(b));












const UsersPermissions_UsersPermissions = (0,react.forwardRef)(({ permissions, routes }, ref) => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const [state, dispatch] = (0,react.useReducer)(UsersPermissions_reducer, UsersPermissions_reducer_initialState, (state2) => UsersPermissions_init(state2, permissions, routes));
  (0,react.useImperativeHandle)(ref, () => ({
    getPermissions: () => {
      return {
        permissions: state.modifiedData
      };
    },
    resetForm: () => {
      dispatch({ type: "ON_RESET" });
    },
    setFormAfterSubmit: () => {
      dispatch({ type: "ON_SUBMIT_SUCCEEDED" });
    }
  }));
  const handleChange = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE",
    keys: name.split("."),
    value: value === "empty__string_value" ? "" : value
  });
  const handleChangeSelectAll = ({ target: { name, value } }) => dispatch({
    type: "ON_CHANGE_SELECT_ALL",
    keys: name.split("."),
    value
  });
  const handleSelectedAction = (actionToSelect) => dispatch({
    type: "SELECT_ACTION",
    actionToSelect
  });
  const providerValue = UsersPermissions_spreadProps(UsersPermissions_spreadValues({}, state), {
    onChange: handleChange,
    onChangeSelectAll: handleChangeSelectAll,
    onSelectedAction: handleSelectedAction
  });
  return /* @__PURE__ */ react.createElement(UsersPermissionsProvider, {
    value: providerValue
  }, /* @__PURE__ */ react.createElement(Grid.Grid, {
    gap: 0,
    shadow: "filterShadow",
    hasRadius: true,
    background: "neutral0"
  }, /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 7,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7
  }, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 6
  }, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 2
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    as: "h2"
  }, formatMessage({
    id: (0,getTrad/* default */.Z)("Plugins.header.title"),
    defaultMessage: "Permissions"
  })), /* @__PURE__ */ react.createElement(Typography.Typography, {
    as: "p",
    textColor: "neutral600"
  }, formatMessage({
    id: (0,getTrad/* default */.Z)("Plugins.header.description"),
    defaultMessage: "Only actions bound by a route are listed below."
  }))), /* @__PURE__ */ react.createElement(components_Permissions, null))), /* @__PURE__ */ react.createElement(components_Policies, null)));
});
UsersPermissions_UsersPermissions.propTypes = {
  permissions: (prop_types_default()).object.isRequired,
  routes: (prop_types_default()).object.isRequired
};
/* harmony default export */ const components_UsersPermissions = ((0,react.memo)(UsersPermissions_UsersPermissions));

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useForm/reducer.js

const useForm_reducer_initialState = {
  isLoading: true,
  modifiedData: {}
};
const useForm_reducer_reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA": {
      draftState.isLoading = true;
      draftState.modifiedData = {};
      break;
    }
    case "GET_DATA_SUCCEEDED": {
      draftState.isLoading = false;
      draftState.modifiedData = action.data;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState.isLoading = true;
      break;
    }
    case "ON_SUBMIT_SUCCEEDED": {
      draftState.modifiedData = action.data;
      break;
    }
    default: {
      return draftState;
    }
  }
});
/* harmony default export */ const useForm_reducer = ((/* unused pure expression or super */ null && (useForm_reducer_reducer)));


;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useForm/index.js
/* provided dependency */ var console = __webpack_require__(25108);
var useForm_async = (__this, __arguments, generator) => {
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




const useUserForm = (endPoint, permissions) => {
  const { isLoading: isLoadingForPermissions, allowedActions } = useRBAC(permissions);
  const [{ isLoading, modifiedData }, dispatch] = useReducer(reducer, initialState);
  const toggleNotification = useNotification();
  const isMounted = useRef(true);
  const abortController = new AbortController();
  const { signal } = abortController;
  useEffect(() => {
    const getData = () => useForm_async(undefined, null, function* () {
      try {
        dispatch({
          type: "GET_DATA"
        });
        const data = yield request(getRequestURL(endPoint), { method: "GET", signal });
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          data
        });
      } catch (err) {
        if (isMounted.current) {
          dispatch({
            type: "GET_DATA_ERROR"
          });
          console.error(err);
          toggleNotification({
            type: "warning",
            message: { id: "notification.error" }
          });
        }
      }
    });
    if (!isLoadingForPermissions) {
      getData();
    }
    return () => {
      abortController.abort();
      isMounted.current = false;
    };
  }, [isLoadingForPermissions, endPoint]);
  const dispatchSubmitSucceeded = useCallback((data) => {
    dispatch({
      type: "ON_SUBMIT_SUCCEEDED",
      data
    });
  }, []);
  return {
    allowedActions,
    dispatchSubmitSucceeded,
    isLoading,
    isLoadingForPermissions,
    modifiedData
  };
};
/* harmony default export */ const useForm = ((/* unused pure expression or super */ null && (useUserForm)));

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useRolesList/init.js
var useRolesList_init_defProp = Object.defineProperty;
var useRolesList_init_defProps = Object.defineProperties;
var useRolesList_init_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var useRolesList_init_getOwnPropSymbols = Object.getOwnPropertySymbols;
var useRolesList_init_hasOwnProp = Object.prototype.hasOwnProperty;
var useRolesList_init_propIsEnum = Object.prototype.propertyIsEnumerable;
var useRolesList_init_defNormalProp = (obj, key, value) => key in obj ? useRolesList_init_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var useRolesList_init_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (useRolesList_init_hasOwnProp.call(b, prop))
      useRolesList_init_defNormalProp(a, prop, b[prop]);
  if (useRolesList_init_getOwnPropSymbols)
    for (var prop of useRolesList_init_getOwnPropSymbols(b)) {
      if (useRolesList_init_propIsEnum.call(b, prop))
        useRolesList_init_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var useRolesList_init_spreadProps = (a, b) => useRolesList_init_defProps(a, useRolesList_init_getOwnPropDescs(b));
const useRolesList_init_init = (initialState, shouldFetchData) => {
  return useRolesList_init_spreadProps(useRolesList_init_spreadValues({}, initialState), { isLoading: shouldFetchData });
};
/* harmony default export */ const useRolesList_init = ((/* unused pure expression or super */ null && (useRolesList_init_init)));

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useRolesList/reducer.js

const useRolesList_reducer_initialState = {
  roles: [],
  isLoading: true
};
const useRolesList_reducer_reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA": {
      draftState.isLoading = true;
      draftState.roles = [];
      break;
    }
    case "GET_DATA_SUCCEEDED": {
      draftState.roles = action.data;
      draftState.isLoading = false;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState.isLoading = false;
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const useRolesList_reducer = ((/* unused pure expression or super */ null && (useRolesList_reducer_reducer)));

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useRolesList/index.js
var useRolesList_async = (__this, __arguments, generator) => {
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






const useRolesList = (shouldFetchData = true) => {
  const [{ roles, isLoading }, dispatch] = useReducer(reducer, initialState, () => init(initialState, shouldFetchData));
  const toggleNotification = useNotification();
  const isMounted = useRef(true);
  const abortController = new AbortController();
  const { signal } = abortController;
  useEffect(() => {
    if (shouldFetchData) {
      fetchRolesList();
    }
    return () => {
      abortController.abort();
      isMounted.current = false;
    };
  }, [shouldFetchData]);
  const fetchRolesList = () => useRolesList_async(undefined, null, function* () {
    try {
      dispatch({
        type: "GET_DATA"
      });
      const { roles: roles2 } = yield request(`/${pluginId}/roles`, { method: "GET", signal });
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        data: roles2
      });
    } catch (err) {
      const message = get(err, ["response", "payload", "message"], "An error occured");
      if (isMounted.current) {
        dispatch({
          type: "GET_DATA_ERROR"
        });
        if (message !== "Forbidden") {
          toggleNotification({
            type: "warning",
            message
          });
        }
      }
    }
  });
  return { roles, isLoading, getData: fetchRolesList };
};
/* harmony default export */ const hooks_useRolesList = ((/* unused pure expression or super */ null && (useRolesList)));

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/usePlugins/init.js
var usePlugins_init_defProp = Object.defineProperty;
var usePlugins_init_defProps = Object.defineProperties;
var usePlugins_init_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var usePlugins_init_getOwnPropSymbols = Object.getOwnPropertySymbols;
var usePlugins_init_hasOwnProp = Object.prototype.hasOwnProperty;
var usePlugins_init_propIsEnum = Object.prototype.propertyIsEnumerable;
var usePlugins_init_defNormalProp = (obj, key, value) => key in obj ? usePlugins_init_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var usePlugins_init_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (usePlugins_init_hasOwnProp.call(b, prop))
      usePlugins_init_defNormalProp(a, prop, b[prop]);
  if (usePlugins_init_getOwnPropSymbols)
    for (var prop of usePlugins_init_getOwnPropSymbols(b)) {
      if (usePlugins_init_propIsEnum.call(b, prop))
        usePlugins_init_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var usePlugins_init_spreadProps = (a, b) => usePlugins_init_defProps(a, usePlugins_init_getOwnPropDescs(b));
const usePlugins_init_init = (initialState, shouldFetchData) => {
  return usePlugins_init_spreadProps(usePlugins_init_spreadValues({}, initialState), { isLoading: shouldFetchData });
};
/* harmony default export */ const usePlugins_init = (usePlugins_init_init);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/axiosInstance.js
var axiosInstance = __webpack_require__(65772);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/usePlugins/reducer.js

const usePlugins_reducer_initialState = {
  permissions: {},
  routes: {},
  isLoading: true
};
const usePlugins_reducer_reducer = (state, action) => (0,immer_cjs_production_min["default"])(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA": {
      draftState.isLoading = true;
      draftState.permissions = {};
      draftState.routes = {};
      break;
    }
    case "GET_DATA_SUCCEEDED": {
      draftState.permissions = action.permissions;
      draftState.routes = action.routes;
      draftState.isLoading = false;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState.isLoading = false;
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const usePlugins_reducer = (usePlugins_reducer_reducer);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/usePlugins/index.js
var usePlugins_async = (__this, __arguments, generator) => {
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








const usePlugins = (shouldFetchData = true) => {
  const toggleNotification = (0,build.useNotification)();
  const [{ permissions, routes, isLoading }, dispatch] = (0,react.useReducer)(usePlugins_reducer, usePlugins_reducer_initialState, () => usePlugins_init(usePlugins_reducer_initialState, shouldFetchData));
  const fetchPlugins = (0,react.useCallback)(() => usePlugins_async(undefined, null, function* () {
    try {
      dispatch({
        type: "GET_DATA"
      });
      const [{ permissions: permissions2 }, { routes: routes2 }] = yield Promise.all([`/${src_pluginId/* default */.Z}/permissions`, `/${src_pluginId/* default */.Z}/routes`].map((endpoint) => usePlugins_async(this, null, function* () {
        const res = yield axiosInstance/* default.get */.Z.get(endpoint);
        return res.data;
      })));
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        permissions: (0,utils/* cleanPermissions */.YX)(permissions2),
        routes: routes2
      });
    } catch (err) {
      const message = (0,lodash.get)(err, ["response", "payload", "message"], "An error occured");
      dispatch({
        type: "GET_DATA_ERROR"
      });
      if (message !== "Forbidden") {
        toggleNotification({
          type: "warning",
          message
        });
      }
    }
  }), [toggleNotification]);
  (0,react.useEffect)(() => {
    if (shouldFetchData) {
      fetchPlugins();
    }
  }, [fetchPlugins, shouldFetchData]);
  return {
    permissions,
    routes,
    getData: fetchPlugins,
    isLoading
  };
};
/* harmony default export */ const hooks_usePlugins = (usePlugins);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useFetchRole/reducer.js

const useFetchRole_reducer_initialState = {
  role: {},
  isLoading: true
};
const useFetchRole_reducer_reducer = (state, action) => (0,immer_cjs_production_min["default"])(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA_SUCCEEDED": {
      draftState.role = action.role;
      draftState.isLoading = false;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState.isLoading = false;
      break;
    }
    case "ON_SUBMIT_SUCCEEDED": {
      draftState.role.name = action.name;
      draftState.role.description = action.description;
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const useFetchRole_reducer = (useFetchRole_reducer_reducer);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/useFetchRole/index.js
/* provided dependency */ var useFetchRole_console = __webpack_require__(25108);
var useFetchRole_defProp = Object.defineProperty;
var useFetchRole_defProps = Object.defineProperties;
var useFetchRole_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var useFetchRole_getOwnPropSymbols = Object.getOwnPropertySymbols;
var useFetchRole_hasOwnProp = Object.prototype.hasOwnProperty;
var useFetchRole_propIsEnum = Object.prototype.propertyIsEnumerable;
var useFetchRole_defNormalProp = (obj, key, value) => key in obj ? useFetchRole_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var useFetchRole_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (useFetchRole_hasOwnProp.call(b, prop))
      useFetchRole_defNormalProp(a, prop, b[prop]);
  if (useFetchRole_getOwnPropSymbols)
    for (var prop of useFetchRole_getOwnPropSymbols(b)) {
      if (useFetchRole_propIsEnum.call(b, prop))
        useFetchRole_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var useFetchRole_spreadProps = (a, b) => useFetchRole_defProps(a, useFetchRole_getOwnPropDescs(b));
var useFetchRole_async = (__this, __arguments, generator) => {
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





const useFetchRole = (id) => {
  const [state, dispatch] = (0,react.useReducer)(useFetchRole_reducer, useFetchRole_reducer_initialState);
  const toggleNotification = (0,build.useNotification)();
  const isMounted = (0,react.useRef)(null);
  (0,react.useEffect)(() => {
    isMounted.current = true;
    if (id) {
      fetchRole(id);
    } else {
      dispatch({
        type: "GET_DATA_SUCCEEDED",
        role: {}
      });
    }
    return () => isMounted.current = false;
  }, [id]);
  const fetchRole = (roleId) => useFetchRole_async(undefined, null, function* () {
    try {
      const {
        data: { role }
      } = yield axiosInstance/* default.get */.Z.get(`/${src_pluginId/* default */.Z}/roles/${roleId}`);
      if (isMounted.current) {
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          role
        });
      }
    } catch (err) {
      useFetchRole_console.error(err);
      dispatch({
        type: "GET_DATA_ERROR"
      });
      toggleNotification({
        type: "warning",
        message: { id: "notification.error" }
      });
    }
  });
  const handleSubmitSucceeded = (0,react.useCallback)((data) => {
    dispatch(useFetchRole_spreadValues({
      type: "ON_SUBMIT_SUCCEEDED"
    }, data));
  }, []);
  return useFetchRole_spreadProps(useFetchRole_spreadValues({}, state), { onSubmitSucceeded: handleSubmitSucceeded });
};
/* harmony default export */ const hooks_useFetchRole = (useFetchRole);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/hooks/index.js





// EXTERNAL MODULE: ./node_modules/yup/lib/index.js
var yup_lib = __webpack_require__(53209);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/EditPage/utils/schema.js


const schema = yup_lib/* object */.Ry().shape({
  name: yup_lib/* string */.Z_().required(build.translatedErrors.required),
  description: yup_lib/* string */.Z_().required(build.translatedErrors.required)
});
/* harmony default export */ const utils_schema = (schema);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/EditPage/index.js
/* provided dependency */ var EditPage_console = __webpack_require__(25108);
var EditPage_defProp = Object.defineProperty;
var EditPage_defProps = Object.defineProperties;
var EditPage_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var EditPage_getOwnPropSymbols = Object.getOwnPropertySymbols;
var EditPage_hasOwnProp = Object.prototype.hasOwnProperty;
var EditPage_propIsEnum = Object.prototype.propertyIsEnumerable;
var EditPage_defNormalProp = (obj, key, value) => key in obj ? EditPage_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var EditPage_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (EditPage_hasOwnProp.call(b, prop))
      EditPage_defNormalProp(a, prop, b[prop]);
  if (EditPage_getOwnPropSymbols)
    for (var prop of EditPage_getOwnPropSymbols(b)) {
      if (EditPage_propIsEnum.call(b, prop))
        EditPage_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var EditPage_spreadProps = (a, b) => EditPage_defProps(a, EditPage_getOwnPropDescs(b));
var EditPage_async = (__this, __arguments, generator) => {
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























const EditPage = () => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const [isSubmitting, setIsSubmitting] = (0,react.useState)(false);
  const toggleNotification = (0,build.useNotification)();
  const { lockApp, unlockApp } = (0,build.useOverlayBlocker)();
  const {
    params: { id }
  } = (0,react_router_dom_min.useRouteMatch)(`/settings/${src_pluginId/* default */.Z}/roles/:id`);
  const { isLoading: isLoadingPlugins, routes } = hooks_usePlugins();
  const { role, onSubmitSucceeded, isLoading: isLoadingRole } = hooks_useFetchRole(id);
  const permissionsRef = (0,react.useRef)();
  const handleEditRoleSubmit = (data) => EditPage_async(undefined, null, function* () {
    lockApp();
    setIsSubmitting(true);
    try {
      const permissions = permissionsRef.current.getPermissions();
      yield axiosInstance/* default.put */.Z.put(`/${src_pluginId/* default */.Z}/roles/${id}`, EditPage_spreadProps(EditPage_spreadValues(EditPage_spreadValues({}, data), permissions), { users: [] }));
      onSubmitSucceeded({ name: data.name, description: data.description });
      toggleNotification({
        type: "success",
        message: {
          id: (0,getTrad/* default */.Z)("Settings.roles.edited"),
          defaultMessage: "Role edited"
        }
      });
    } catch (err) {
      EditPage_console.error(err);
      toggleNotification({
        type: "warning",
        message: {
          id: "notification.error",
          defaultMessage: "An error occurred"
        }
      });
    }
    setIsSubmitting(false);
    unlockApp();
  });
  if (isLoadingRole) {
    return /* @__PURE__ */ react.createElement(build.LoadingIndicatorPage, null);
  }
  return /* @__PURE__ */ react.createElement(Main.Main, null, /* @__PURE__ */ react.createElement(build.SettingsPageTitle, {
    name: "Roles"
  }), /* @__PURE__ */ react.createElement(dist.Formik, {
    enableReinitialize: true,
    initialValues: { name: role.name, description: role.description },
    onSubmit: handleEditRoleSubmit,
    validationSchema: utils_schema
  }, ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ react.createElement(build.Form, {
    noValidate: true,
    onSubmit: handleSubmit
  }, /* @__PURE__ */ react.createElement(Layout.HeaderLayout, {
    primaryAction: !isLoadingPlugins && /* @__PURE__ */ react.createElement(Button.Button, {
      disabled: role.code === "strapi-super-admin",
      type: "submit",
      loading: isSubmitting,
      startIcon: /* @__PURE__ */ react.createElement((Check_default()), null)
    }, formatMessage({
      id: "global.save",
      defaultMessage: "Save"
    })),
    title: role.name,
    subtitle: role.description,
    navigationAction: /* @__PURE__ */ react.createElement(Link.Link, {
      startIcon: /* @__PURE__ */ react.createElement((ArrowLeft_default()), null),
      to: "/settings/users-permissions/roles"
    }, formatMessage({
      id: "global.back",
      defaultMessage: "Back"
    }))
  }), /* @__PURE__ */ react.createElement(Layout.ContentLayout, null, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 7
  }, /* @__PURE__ */ react.createElement(Box.Box, {
    background: "neutral0",
    hasRadius: true,
    shadow: "filterShadow",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7
  }, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 4
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    as: "h2"
  }, formatMessage({
    id: (0,getTrad/* default */.Z)("EditPage.form.roles"),
    defaultMessage: "Role details"
  })), /* @__PURE__ */ react.createElement(Grid.Grid, {
    gap: 4
  }, /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 6
  }, /* @__PURE__ */ react.createElement(TextInput.TextInput, {
    name: "name",
    value: values.name || "",
    onChange: handleChange,
    label: formatMessage({
      id: "global.name",
      defaultMessage: "Name"
    }),
    error: errors.name ? formatMessage({ id: errors.name, defaultMessage: "Invalid value" }) : null
  })), /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 6
  }, /* @__PURE__ */ react.createElement(Textarea.Textarea, {
    name: "description",
    value: values.description || "",
    onChange: handleChange,
    label: formatMessage({
      id: "global.description",
      defaultMessage: "Description"
    }),
    error: errors.description ? formatMessage({
      id: errors.description,
      defaultMessage: "Invalid value"
    }) : null
  }))))), !isLoadingPlugins && /* @__PURE__ */ react.createElement(components_UsersPermissions, {
    ref: permissionsRef,
    permissions: role.permissions,
    routes
  }))))));
};
/* harmony default export */ const Roles_EditPage = (EditPage);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ProtectedEditPage/index.js




const ProtectedRolesEditPage = () => /* @__PURE__ */ react.createElement(build.CheckPagePermissions, {
  permissions: permissions/* default.updateRole */.Z.updateRole
}, /* @__PURE__ */ react.createElement(Roles_EditPage, null));
/* harmony default export */ const ProtectedEditPage = (ProtectedRolesEditPage);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/CreatePage/utils/schema.js


const schema_schema = yup_lib/* object */.Ry().shape({
  name: yup_lib/* string */.Z_().required(build.translatedErrors.required),
  description: yup_lib/* string */.Z_().required(build.translatedErrors.required)
});
/* harmony default export */ const CreatePage_utils_schema = (schema_schema);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/CreatePage/index.js
/* provided dependency */ var CreatePage_console = __webpack_require__(25108);
var CreatePage_defProp = Object.defineProperty;
var CreatePage_defProps = Object.defineProperties;
var CreatePage_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var CreatePage_getOwnPropSymbols = Object.getOwnPropertySymbols;
var CreatePage_hasOwnProp = Object.prototype.hasOwnProperty;
var CreatePage_propIsEnum = Object.prototype.propertyIsEnumerable;
var CreatePage_defNormalProp = (obj, key, value) => key in obj ? CreatePage_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var CreatePage_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (CreatePage_hasOwnProp.call(b, prop))
      CreatePage_defNormalProp(a, prop, b[prop]);
  if (CreatePage_getOwnPropSymbols)
    for (var prop of CreatePage_getOwnPropSymbols(b)) {
      if (CreatePage_propIsEnum.call(b, prop))
        CreatePage_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var CreatePage_spreadProps = (a, b) => CreatePage_defProps(a, CreatePage_getOwnPropDescs(b));
var CreatePage_async = (__this, __arguments, generator) => {
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





















const CreatePage_EditPage = () => {
  const { formatMessage } = (0,react_intl.useIntl)();
  const [isSubmitting, setIsSubmitting] = (0,react.useState)(false);
  const toggleNotification = (0,build.useNotification)();
  const { goBack } = (0,react_router_dom_min.useHistory)();
  const { lockApp, unlockApp } = (0,build.useOverlayBlocker)();
  const { isLoading: isLoadingPlugins, permissions, routes } = hooks_usePlugins();
  const { trackUsage } = (0,build.useTracking)();
  const permissionsRef = (0,react.useRef)();
  const handleCreateRoleSubmit = (data) => CreatePage_async(undefined, null, function* () {
    lockApp();
    setIsSubmitting(true);
    try {
      const permissions2 = permissionsRef.current.getPermissions();
      yield axiosInstance/* default.post */.Z.post(`/${src_pluginId/* default */.Z}/roles`, CreatePage_spreadProps(CreatePage_spreadValues(CreatePage_spreadValues({}, data), permissions2), { users: [] }));
      trackUsage("didCreateRole");
      toggleNotification({
        type: "success",
        message: {
          id: (0,getTrad/* default */.Z)("Settings.roles.created"),
          defaultMessage: "Role created"
        }
      });
      goBack();
    } catch (err) {
      CreatePage_console.error(err);
      toggleNotification({
        type: "warning",
        message: {
          id: "notification.error",
          defaultMessage: "An error occurred"
        }
      });
    }
    setIsSubmitting(false);
    unlockApp();
  });
  return /* @__PURE__ */ react.createElement(Main.Main, null, /* @__PURE__ */ react.createElement(build.SettingsPageTitle, {
    name: "Roles"
  }), /* @__PURE__ */ react.createElement(dist.Formik, {
    enableReinitialize: true,
    initialValues: { name: "", description: "" },
    onSubmit: handleCreateRoleSubmit,
    validationSchema: CreatePage_utils_schema
  }, ({ handleSubmit, values, handleChange, errors }) => /* @__PURE__ */ react.createElement(build.Form, {
    noValidate: true,
    onSubmit: handleSubmit
  }, /* @__PURE__ */ react.createElement(Layout.HeaderLayout, {
    primaryAction: !isLoadingPlugins && /* @__PURE__ */ react.createElement(Button.Button, {
      type: "submit",
      loading: isSubmitting,
      startIcon: /* @__PURE__ */ react.createElement((Check_default()), null)
    }, formatMessage({
      id: "global.save",
      defaultMessage: "Save"
    })),
    title: formatMessage({
      id: "Settings.roles.create.title",
      defaultMessage: "Create a role"
    }),
    subtitle: formatMessage({
      id: "Settings.roles.create.description",
      defaultMessage: "Define the rights given to the role"
    })
  }), /* @__PURE__ */ react.createElement(Layout.ContentLayout, null, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 7
  }, /* @__PURE__ */ react.createElement(Box.Box, {
    background: "neutral0",
    hasRadius: true,
    shadow: "filterShadow",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 7,
    paddingRight: 7
  }, /* @__PURE__ */ react.createElement(Stack.Stack, {
    spacing: 4
  }, /* @__PURE__ */ react.createElement(Typography.Typography, {
    variant: "delta",
    as: "h2"
  }, formatMessage({
    id: (0,getTrad/* default */.Z)("EditPage.form.roles"),
    defaultMessage: "Role details"
  })), /* @__PURE__ */ react.createElement(Grid.Grid, {
    gap: 4
  }, /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 6
  }, /* @__PURE__ */ react.createElement(TextInput.TextInput, {
    name: "name",
    value: values.name || "",
    onChange: handleChange,
    label: formatMessage({
      id: "global.name",
      defaultMessage: "Name"
    }),
    error: errors.name ? formatMessage({ id: errors.name, defaultMessage: "Invalid value" }) : null
  })), /* @__PURE__ */ react.createElement(Grid.GridItem, {
    col: 6
  }, /* @__PURE__ */ react.createElement(Textarea.Textarea, {
    name: "description",
    value: values.description || "",
    onChange: handleChange,
    label: formatMessage({
      id: "global.description",
      defaultMessage: "Description"
    }),
    error: errors.description ? formatMessage({
      id: errors.description,
      defaultMessage: "Invalid value"
    }) : null
  }))))), !isLoadingPlugins && /* @__PURE__ */ react.createElement(components_UsersPermissions, {
    ref: permissionsRef,
    permissions,
    routes
  }))))));
};
/* harmony default export */ const CreatePage = (CreatePage_EditPage);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/ProtectedCreatePage/index.js




const ProtectedRolesCreatePage = () => /* @__PURE__ */ react.createElement(build.CheckPagePermissions, {
  permissions: permissions/* default.createRole */.Z.createRole
}, /* @__PURE__ */ react.createElement(CreatePage, null));
/* harmony default export */ const ProtectedCreatePage = (ProtectedRolesCreatePage);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Roles/index.js








const Roles = () => {
  return /* @__PURE__ */ react.createElement(build.CheckPagePermissions, {
    permissions: permissions/* default.accessRoles */.Z.accessRoles
  }, /* @__PURE__ */ react.createElement(react_router_dom_min.Switch, null, /* @__PURE__ */ react.createElement(react_router_dom_min.Route, {
    path: `/settings/${src_pluginId/* default */.Z}/roles/new`,
    component: ProtectedCreatePage,
    exact: true
  }), /* @__PURE__ */ react.createElement(react_router_dom_min.Route, {
    path: `/settings/${src_pluginId/* default */.Z}/roles/:id`,
    component: ProtectedEditPage,
    exact: true
  }), /* @__PURE__ */ react.createElement(react_router_dom_min.Route, {
    path: `/settings/${src_pluginId/* default */.Z}/roles`,
    component: ProtectedListPage,
    exact: true
  }), /* @__PURE__ */ react.createElement(react_router_dom_min.Route, {
    path: "",
    component: build.NotFound
  })));
};
/* harmony default export */ const pages_Roles = (Roles);


/***/ }),

/***/ 65772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9669);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68547);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__);
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


const instance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL: ""
});
instance.interceptors.request.use((config) => __async(undefined, null, function* () {
  config.headers = {
    Authorization: `Bearer ${_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__.auth.getToken()}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  return config;
}), (error) => {
  Promise.reject(error);
});
instance.interceptors.response.use((response) => response, (error) => {
  var _a;
  if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
    _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__.auth.clearAppStorage();
    window.location.reload();
  }
  throw error;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);


/***/ }),

/***/ 42722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "be": () => (/* reexport */ axiosInstance/* default */.Z),
  "YX": () => (/* reexport */ utils_cleanPermissions),
  "Gc": () => (/* reexport */ utils_getRequestURL),
  "OB": () => (/* reexport */ getTrad/* default */.Z)
});

// UNUSED EXPORTS: formatPolicies

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/axiosInstance.js
var axiosInstance = __webpack_require__(65772);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(96486);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/cleanPermissions.js

const cleanPermissions = (permissions) => Object.keys(permissions).reduce((acc, current) => {
  const currentPermission = permissions[current].controllers;
  const cleanedControllers = Object.keys(currentPermission).reduce((acc2, curr) => {
    if ((0,lodash.isEmpty)(currentPermission[curr])) {
      return acc2;
    }
    acc2[curr] = currentPermission[curr];
    return acc2;
  }, {});
  if ((0,lodash.isEmpty)(cleanedControllers)) {
    return acc;
  }
  acc[current] = { controllers: cleanedControllers };
  return acc;
}, {});
/* harmony default export */ const utils_cleanPermissions = (cleanPermissions);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pluginId.js
var pluginId = __webpack_require__(83086);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/getRequestURL.js

const getRequestURL = (endPoint) => `/${pluginId/* default */.Z}/${endPoint}`;
/* harmony default export */ const utils_getRequestURL = (getRequestURL);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/getTrad.js
var getTrad = __webpack_require__(97961);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/index.js







/***/ }),

/***/ 13217:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseSlice = __webpack_require__(14259);

/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 1, length) : [];
}

module.exports = tail;


/***/ })

}]);