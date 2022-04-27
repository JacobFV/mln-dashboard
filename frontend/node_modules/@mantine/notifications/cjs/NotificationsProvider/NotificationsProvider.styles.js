'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@mantine/core');

var useStyles = core.createStyles((theme) => ({
  notifications: {
    width: `calc(100% - ${theme.spacing.md * 2}px)`,
    boxSizing: "border-box",
    position: "fixed",
    zIndex: 1e3
  },
  notification: {
    "&:not(:first-of-type)": {
      marginTop: theme.spacing.sm
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=NotificationsProvider.styles.js.map
