import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shoudShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

