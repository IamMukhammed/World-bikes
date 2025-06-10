import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload, Image as ImageImpl } from '@react-three/drei';
import { ScrollControls, Scroll } from './ScrollControls';
import * as THREE from 'three';

import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const AnimatedText = a(Text);

function Image(props: any) {
	const ref = useRef<THREE.Group>();
	const group = useRef<THREE.Group>();

	return (
		// @ts-ignore
		<group ref={group}>
			<ImageImpl ref={ref} {...props} />
		</group>
	);
}

// function Page({ m = 0.4, urls, ...props }: any) {
// 	const { width } = useThree((state) => state.viewport);
// 	const w = width < 10 ? 1.5 / 3 : 1 / 3;

// 	return (
// 		<group {...props}>
// 		  <Text
// 			position={[-8, 0, 0]}
// 			fontSize={0.8}
// 			color="#ccc"
// 			anchorX="center"
// 			anchorY="middle"
// 			maxWidth={9}
// 		  >
// 			Browse & List Motorcycles Worldwide
// 		  </Text>
// 		  <Text
// 			position={[-10, -1.5, 0]}
// 			fontSize={0.5}
// 			color="#fff"
// 			anchorX="center"
// 			anchorY="middle"
// 			maxWidth={6}
// 		  >
// 			Ride Free. Ride Global.
// 		  </Text>
// 		</group>
// 	  );

function Page({ m = 0.4, urls, ...props }: any) {
	const { width } = useThree((state) => state.viewport);
	// const w = width < 10 ? 1.5 / 3 : 1 / 3;

	const leftSpring = useSpring({
		from: { position: [-width, 0, 0] },
		to: { position: [-8.5, 0.4, 0] },
		config: { mass: 1, tension: 120, friction: 14 },
	});

	// O'ng tarafdan markazga
	const rightSpring = useSpring({
		from: { position: [width, 0, 0] },
		to: { position: [-8.5, -0.8, 0] },
		config: { mass: 1, tension: 120, friction: 14 },
	});

	return (
		<group {...props}>
			<AnimatedText {...leftSpring} fontSize={0.7} color="#ccc" anchorX="center" anchorY="middle" maxWidth={8}>
				{'Browse & List\nMotorcycles Worldwide'}
			</AnimatedText>

			<AnimatedText {...rightSpring} fontSize={0.5} color="#ccc" anchorX="center" anchorY="middle" maxWidth={8}>
				{'Join the Ride Anywhere, Anytime'}
			</AnimatedText>
		</group>
	);
}

function Pages() {
	const { width } = useThree((state) => state.viewport);

	return (
		<>
			<Page position={[width * 0, 0, 0]} texts={['Hello', 'World', 'One']} />
			<Page position={[width * 1, 0, 0]} urls={['/img/fiber/img4.jpg', '/img/fiber/img5.jpg', '/img/fiber/img6.jpg']} />
		</>
	);
}

export default function FiberContainer() {
	return (
		<div className="threeJSContainer" style={{ marginBottom: '160px', width: '100%', height: '412px' }}>
			<Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
				<Suspense fallback={null}>
					<ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
						<Scroll>
							<Pages />
						</Scroll>
					</ScrollControls>
					<Preload />
				</Suspense>
			</Canvas>
		</div>
	);
}
