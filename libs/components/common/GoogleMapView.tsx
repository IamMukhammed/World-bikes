// components/common/GoogleMapView.tsx
import React, { useEffect, useRef } from "react";

type GoogleMapViewProps = {
	address: string;
};

const GoogleMapView: React.FC<GoogleMapViewProps> = ({ address }) => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!window.google || !mapRef.current || !address) return;

		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ address }, (results, status) => {
			if (status === "OK" && results && results[0]) {
				const map = new google.maps.Map(mapRef.current!, {
					zoom: 15,
					center: results[0].geometry.location,
				});

				new google.maps.Marker({
					map,
					position: results[0].geometry.location,
				});
			}
		});
	}, [address]);

	return (
		<div
			ref={mapRef}
			style={{ width: "100%", height: "400px", borderRadius: "8px", marginTop: "20px" }}
		></div>
	);
};

export default GoogleMapView;