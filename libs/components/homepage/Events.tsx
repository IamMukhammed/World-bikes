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
		eventTitle: 'Pacific Coast Moto Cruise',
		city: 'California',
		description:
			'Feel the ocean breeze as you ride the legendary Pacific Coast Highway with fellow motorheads. California’s ultimate coastal motorcycle cruise awaits you!',
		imageSrc: '/img/events/illinois.webp',
	},
	{
		eventTitle: 'Indian Riders Winter Rally',
		city: 'Indiana',
		description:
			'If you’re heading to South Korea this season, don’t miss the Indian Riders Winter Rally in Seoul — where chrome meets the cold and passion roars through the snow!',
		imageSrc: '/img/events/york.webp',
	},
	{
		eventTitle: 'Daytona Ride & Beach Bash',
		city: 'Florida',
		description:
			'Cruise into Daytona for a sun-soaked weekend of motorcycles, beach vibes, and roaring engines. The ultimate biker fest on the Atlantic coast.',
		imageSrc: '/img/events/california.webp',
	},
	{
		eventTitle: 'Harley-Davidson Showcase',
		city: 'Milwaukee',
		description:
			'Feel the power and legacy of the open road at the Harley-Davidson Showcase in Milwaukee — a celebration of iconic design, raw performance, and timeless freedom!',
		imageSrc: '/img/events/harley2.jpg',
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
