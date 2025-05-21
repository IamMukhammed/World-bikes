import React, { useRef, useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const Advertisement = () => {
	const device = useDeviceDetect();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = useState(true);

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted;
			setIsMuted(videoRef.current.muted);
		}
	};

	const videoSrc = device === 'mobile' ? '/video/ads.mov' : '/video/123.mp4';

	return (
		<Stack className="video-frame" sx={{ position: 'relative' }}>
			<video
				ref={videoRef}
				autoPlay
				muted={isMuted}
				loop
				playsInline
				preload="auto"
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
			>
				<source src={videoSrc} type="video/mp4" />
			</video>

			<IconButton
				onClick={toggleMute}
				sx={{
					position: 'absolute',
					top: 16,
					right: 16,
					backgroundColor: 'rgba(0,0,0,0.5)',
					color: '#fff',
					':hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
				}}
			>
				{isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
			</IconButton>
		</Stack>
	);
};

export default Advertisement;