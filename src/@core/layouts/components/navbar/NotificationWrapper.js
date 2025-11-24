import NotificationDropdown from "@layouts/components/navbar/NotificationDropdown";
import React from "react";
import useNotificationsManager from "@hooks/useNotificationsManager";

export default function NotificationWrapper() {
    const {
        errorOnMessageListenerFactory,
        notificationsList,
        fetchNextPage,
        hasNextPage,
        markReadNotificationMutateAsync,
        unReadNotificationsCount,
    } = useNotificationsManager()

    if (errorOnMessageListenerFactory) {
        return null;
    }

    return <NotificationDropdown
        notificationsList={notificationsList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        markReadNotificationMutateAsync={markReadNotificationMutateAsync}
        unReadNotificationsCount={unReadNotificationsCount}
    />
}