import { TransitionStatus } from 'react-transition-group';
import { CSSObject } from '@mantine/core';
import { NotificationsProviderPositioning } from '../../types';
interface NotificationStateStylesProps {
    state: TransitionStatus;
    maxHeight: number;
    positioning: NotificationsProviderPositioning;
    transitionDuration: number;
}
export default function getNotificationStateStyles({ state, maxHeight, positioning, transitionDuration, }: NotificationStateStylesProps): CSSObject;
export {};
//# sourceMappingURL=get-notification-state-styles.d.ts.map