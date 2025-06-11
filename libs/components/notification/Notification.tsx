import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_NOTIFICATIONS, MARK_NOTIFICATION_AS_READ } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Notification } from '../../types/notification/notification';
import { userVar } from '../../../apollo/store';
import { Badge, Stack } from '@mui/material';
import { NotificationStatus } from '../../enums/notification.enum';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import IconButton from '@mui/material/IconButton';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function NotificationPopover() {
	const user = useReactiveVar(userVar);
	const router = useRouter();
	// const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [notification, setNotification] = React.useState<Notification[]>([]);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
		onCompleted: () => {
			getNotificationsRefetch(); // Re-import notifications after successful update
		},
		onError: (error) => {
			console.error('Error updating notifications:', error);
		},
	});

	const handleClickRead = (notification: Notification) => {
		markNotificationAsRead({
			variables: { notificationId: notification._id },
			onCompleted: () => {
				// Redirect to the member page after marking as read
				switch (notification.notificationGroup) {
					case 'MEMBER':
						router.push(`/member?memberId=${notification.authorId}`);
						break;
					case 'PROPERTY':
						router.push(`/property/detail?id=${notification.propertyId}`);
						break;
					case 'ARTICLE':
						router.push(`/property/detail?id=${notification.articleId}`);
						break;
					default:
						router.push(`/member?memberId=${notification.authorId}`);
				}

				getNotificationsRefetch();
			},
		});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log(notification);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { userId: user._id },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotificationsByUserId) setNotification(data?.getNotificationsByUserId);
		},
	});

	// Fake notification count for demo
	const unreadCount = 3;

	return (
		<div>
			<Badge
				badgeContent={
					notification?.filter(
						(ele) => ele.receiverId === user._id && ele.notificationStatus === NotificationStatus.WAIT,
					).length
				}
				color="secondary"
			>
				<IconButton
					onClick={(event: { currentTarget: React.SetStateAction<HTMLElement | null>; }) => {
						console.log('clicked:', event);
						console.log('target:', event.currentTarget);
						setAnchorEl(event.currentTarget);
					}}
				>
					<NotificationsOutlinedIcon />
				</IconButton>

				<Popover
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				>
					<Typography sx={{ p: 2 }}>Test notification</Typography>
				</Popover>
			</Badge>
			<Popover
				PaperProps={{
					style: {
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '10px',
					},
				}}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				{notification.filter((ele) => ele.receiverId === user._id).length > 0 ? (
					notification?.map((ele: Notification) => {
						if (ele.receiverId === user._id) {
							return (
								<Stack key={ele._id} sx={{ m: 3, cursor: 'pointer' }} onClick={() => handleClickRead(ele)}>
									<div
										style={{
											background: ele.notificationStatus === NotificationStatus.READ ? '#e0dfdf' : '#EEF1FB',
											padding: '15px',
											borderRadius: '10px',
											width: '450px',
										}}
									>
										<Typography>{ele.notificationTitle}</Typography>
										<Typography>{ele.notificationDesc}</Typography>
										<Typography variant="body2" color="textSecondary">
											{dayjs(ele.createdAt).fromNow()}
										</Typography>
									</div>
								</Stack>
							);
						}
					})
				) : (
					<Stack
						sx={{
							m: 3,
							width: '400px',
							height: '100px',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: '10px',
							backgroundColor: '#EEF1FB',
						}}
					>
						<Typography>No notifications</Typography>
					</Stack>
				)}
			</Popover>
		</div>
	);
}
