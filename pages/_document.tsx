// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* SEO Meta Tags */}
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				<meta name="keyword" content="world motorcycles, world-motorcycles.uz, devex mern, mern nestjs fullstack" />
				<meta
					name="description"
					content={
						'Buy and sell motorcycles anytime, anywhere in the USA. Find the best motorcycles at the best prices on world-motorcycles.uz. | ' +
						'Покупайте и продавайте мотоциклы в любое время и в любом месте в США. Лучшие мотоциклы по лучшим ценам на сайте world-motorcycles.uz. | ' +
						'언제 어디서나 미국에서 오토바이를 사고 파세요. 최고의 가격에 최고의 오토바이 – world-motorcycles.uz에서 만나보세요. | ' +
						'Istalgan vaqtda, istalgan joyda AQShda mototsikllarni sotib oling va soting. Eng yaxshi mototsikllar eng qulay narxlarda — faqat world-motorcycles.uz saytida.'
					}
				/>

				{/* Google Maps API */}
				<script
					src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCG9JZU265nKNQKFp5wcJLiOxaUwRE0hyA&libraries=places`}
					async
					defer
				></script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
