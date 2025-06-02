import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { Member } from '../member/member';

// Member should be defined

export interface Notification {
	_id: string;
	notificationType: NotificationType;
	notificationStatus: NotificationStatus;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	propertyId?: string;
	articleId?: string;
	createdAt: Date;

	/** from aggregation **/

	// memberData?: Member;
}
// @ObjectType()
// export class Notifications {
// 	@Field(() => [Notification])
// 	list: Notification[];
// }
