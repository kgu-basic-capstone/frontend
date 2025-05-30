"use client";

import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { type LatLngExpression, type Icon } from "leaflet";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

// 대한민국 경계 좌표
const SOUTH_KOREA_BOUNDS = {
  north: 38.6,
  south: 33.2,
  east: 129.3,
  west: 124.6,
};

// 랜덤 좌표 생성 함수
const generateRandomCoordinates = (count: number) => {
  const coordinates: LatLngExpression[] = [];
  for (let i = 0; i < count; i++) {
    const lat =
      SOUTH_KOREA_BOUNDS.south +
      Math.random() * (SOUTH_KOREA_BOUNDS.north - SOUTH_KOREA_BOUNDS.south);
    const lng =
      SOUTH_KOREA_BOUNDS.west +
      Math.random() * (SOUTH_KOREA_BOUNDS.east - SOUTH_KOREA_BOUNDS.west);
    coordinates.push([lat, lng]);
  }
  return coordinates;
};

export default function MapView() {
  const position: LatLngExpression = [37.5961, 127.0527];
  const [isMounted, setIsMounted] = useState(false);
  const markers = generateRandomCoordinates(50);
  const [icon, setIcon] = useState<Icon | null>(null);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((L) => {
      setIcon(
        L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      );
    });
  }, []);

  if (!isMounted || !icon) {
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "97.5%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((position, index) => (
        <Marker key={index} position={position} icon={icon} />
      ))}
    </MapContainer>
  );
}
