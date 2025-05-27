import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'Sturgis Motorcycle Rally',
		city: 'Sturgis, South Dakota',
		description:
			'Join hundreds of thousands of riders at the legendary Sturgis Rally — one of the world’s largest motorcycle events since 1938.',
		imageSrc: '/img/events/STURGIS.webp',
	},
	{
		eventTitle: 'Daytona Bike Week',
		city: 'Daytona Beach, Florida',
		description:
			'Rev your engines at Daytona Bike Week — a 10-day celebration of motorcycles, live music, and scenic rides along the coast.',
		imageSrc: '/img/events/DAYTONA.webp',
	},
	{
		eventTitle: 'Laconia Motorcycle Week',
		city: 'Laconia, New Hampshire',
		description:
			'America’s oldest motorcycle rally takes over New Hampshire every summer — ride through mountains, lakes, and history.',
		imageSrc: '/img/events/LACONIA.webp',
	},
	{
		eventTitle: 'Lone Star Rally',
		city: 'Galveston, Texas',
		description:
			'Texas-style fun with thousands of bikers, custom shows, and beachside rides at the Lone Star Rally in Galveston.',
		imageSrc: '/img/events/LONESTAR.webp',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>Events</span>
							<p className={'white'}>Events waiting your attention!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
