import React from "react";
import { MapContainer, TileLayer, LayersControl, Marker } from "react-leaflet";
// ส่วนรายการให้เลือกชั้นแผนที่
const Layers = () => {
  return (
    <div>
      <LayersControl position="topright">
        {/* 1. LayerมาครอบMAp Basemap  */}
        <LayersControl.BaseLayer name="OSM" checked>
          {/* child base map ที่แสดงอยู่ตอนนี้ */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {/* 1. LayerมาครอบMAp Basemap  */}
        <LayersControl.BaseLayer name="worldImagey" checked>
          {/* child base map ที่แสดงอยู่ตอนนี้ */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="test" checked>
            <Marker position={[12,101]}>
            </Marker>
          </LayersControl.Overlay>
      </LayersControl>
    </div>
  );
};

export default Layers;
