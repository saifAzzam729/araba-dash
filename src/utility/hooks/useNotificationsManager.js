import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "react-query";
import NotificationsService from "@src/common/services/NotificationsService";
import { useAuth } from "@src/utility/context/AuthProvider";
import { useEffect, useState } from "react";
import { onMessageListenerFactory } from "@src/firebase/firebaseConfig";
import NotificationSessionStorageManager from "@src/common/services/NotitficationSessionStorageManager";
import showNotification from "@components/alert/showNotification";
import { useSettingsUiContext } from "@src/providers/SettingsUi/SettingsUiProvider";
import _ from "lodash";

export default function useNotificationsManager() {
	const { user } = useAuth();
	const { preferredTableContentLocale } = useSettingsUiContext();
	const queryClient = useQueryClient();

	const [LatestNotificationItem, setLatestNotificationItem] = useState(null);
	const [notificationsList, setNotificationsList] = useState([]);
	const [unReadNotificationsCount, setUnReadNotificationsCount] = useState(0);
	const [onMessageListener, messaging, error] = onMessageListenerFactory();

	const {
		mutate: notificationsSubscribeMutate,
		mutateAsync,
		isLoading,
	} = useMutation(
		() => {
			if (!messaging) {
				throw new Error("No Messaging Object");
			}
			const isSubscribed =
				NotificationSessionStorageManager.getFirebaseSubscribe();
			if (isSubscribed === "true") {
				throw new Error("Already Fired");
			}
			return NotificationsService.NotificationSubscribe(messaging, [
				"EN-ADMINS",
				"AR-ADMINS",
			]);
		},
		{
			onSuccess: () => {
				NotificationSessionStorageManager.setFirebaseSubscribe();
			},
			onError: () => {
				throw Error("can't subscribe with backend");
			},
		}
	);

	const {
		fetchNextPage,
		hasNextPage,
		refetch: fetchAllNotificationsList,
	} = useInfiniteQuery({
		queryKey: ["all-notifications-list"],
		queryFn: ({ pageParam = 1 }) => {
			return NotificationsService.getPagination({
				page: pageParam,
				direction: "desc",
				sort: "un.id",
				locale: preferredTableContentLocale,
			});
		},
		getNextPageParam: (lastPage) => {
			return lastPage.pagination.page < lastPage.pagination.pages
				? lastPage.pagination.page + 1
				: null;
		},
		onSuccess: (res) => {
			setNotificationsList(
				res?.pages?.flatMap((page) => page.pagination.items)
			);
			setUnReadNotificationsCount(res.pages[0].unReadNotifications);
		},
	});

	const { refetch } = useQuery(
		["latest-notifications-list"],
		() =>
			NotificationsService.getPagination({
				direction: "desc",
				sort: "un.id",
			}),
		{
			onSuccess: (res) => {
				/*
                 list with the newest orders
                 */
				const LatestNotificationsArray = res?.pagination?.items;

				/*
                 then  make the logic's with the receivingNotificationsList
                 */
				const unifiedNotifications = _.unionWith(
					LatestNotificationsArray,
					notificationsList,
					_.isEqual
				);

				/*
                 then set the result array
                 */
				fetchAllNotificationsList();
				setNotificationsList([...unifiedNotifications]);
			},
			onError: () => {
				throw Error("can't get notifications list ");
			},
			enabled: false,
		}
	);

	const { mutate: markAllAsReadNotificationMutate } = useMutation(
		() => NotificationsService.MarkAllAsReadNotification(),
		{
			onSuccess: () => {
				fetchAllNotificationsList();
			},
			onError: () => {
				throw Error("can't mark all notifications read");
			},
		}
	);

	const {
		mutate: markReadNotificationMutate,
		mutateAsync: markReadNotificationMutateAsync,
	} = useMutation((id) => NotificationsService.MarkAsReadNotification(id), {
		onSuccess: () => {
			fetchAllNotificationsList();
		},
		onError: () => {
			throw Error("can't mark notifications read");
		},
	});

	onMessageListener?.().then((res) => {
		setLatestNotificationItem({
			title: res?.notification?.title,
			body: res?.notification?.body,
		});
		refetch();
	});

	useEffect(() => {
		if (user) {
			notificationsSubscribeMutate();
		}
	}, [user && !!NotificationSessionStorageManager.getFirebaseSubscribe()]);

	useEffect(() => {
		if (LatestNotificationItem?.title) {
			showNotification({
				title: LatestNotificationItem.title,
				description: LatestNotificationItem.body,
			});
		}
	}, [LatestNotificationItem]);

	return {
		errorOnMessageListenerFactory: error,
		messaging,

		// mark as read
		markReadNotificationMutateAsync,
		markReadNotificationMutate,
		markAllAsReadNotificationMutate,

		notificationsList,
		fetchNextPage,
		hasNextPage,

		unReadNotificationsCount,
	};
}
