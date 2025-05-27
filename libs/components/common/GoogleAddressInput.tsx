// components/GoogleAddressInput.tsx
import React, { useEffect, useRef } from 'react';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyCG9JZU265nKNQKFp5wcJLiOxaUwRE0hyAw'; // ← o‘zingizning API kalitingizni yozing
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const GoogleAddressInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=$AIzaSyCG9JZU265nKNQKFp5wcJLiOxaUwRE0hyAw&libraries=places`;
      script.async = true;
      script.onload = () => initializeAutocomplete();
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'],
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.formatted_address) {
            onChange(place.formatted_address);
          }
        });
      }
    };

    if (!window.google?.maps) {
      loadScript();
    } else {
      initializeAutocomplete();
    }
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="description-input"
      placeholder="Address"
    />
  );
};

export default GoogleAddressInput;