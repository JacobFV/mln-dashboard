import { createStyles } from '@mantine/core';

var useStyles = createStyles((theme) => ({
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

export default useStyles;
//# sourceMappingURL=NotificationsProvider.styles.js.map
