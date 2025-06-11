import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ } from '../../apollo/user/query'; // yo‘lni o‘zgartiring

export function useNotifications() {
	const { data, loading, refetch } = useQuery(GET_NOTIFICATIONS);
	const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ);

	const markNotification = async (id: string) => {
		await markAsRead({ variables: { id } });
		await refetch();
	};

	return {
		notifications: data?.notifications || [],
		loading,
		markNotification,
		refetch,
	};
}
