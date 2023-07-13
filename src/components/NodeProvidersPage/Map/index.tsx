import { getDataCenters } from "@site/src/utils/network-stats";
import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { useQuery } from "react-query";
import { Breakpoint } from "./breakpoint";
import useBreakpoint from "./use-breakpoint";

const Map: React.FC = () => {
  const breakpoint: Breakpoint | undefined = useBreakpoint();

  const dataCentersQuery = useQuery("dataCenters", () =>
    getDataCenters().then((res) =>
      res.data_centers.filter((dc) => dc.total_nodes > 0)
    )
  );

  let center: L.LatLngExpression = [29.311319543803894, -9.478870172754636];
  let zoom;
  switch (breakpoint) {
    case Breakpoint.XL:
    case Breakpoint.LG2:
      zoom = 2.75;
      break;
    case Breakpoint.LG1:
      zoom = 2.65;
      break;
    case Breakpoint.MD:
      zoom = 2.3;
      break;
    case Breakpoint.SM:
      zoom = 1.8;
      break;
    case Breakpoint.XS:
      zoom = 0.9;
      break;
    case Breakpoint.XXS:
      zoom = 0.5;
      break;
    default:
      zoom = 0;
      break;
  }

  const bounds = L.latLngBounds([]);

  if (dataCentersQuery.isSuccess && dataCentersQuery.data.length > 0) {
    dataCentersQuery.data.forEach((location, index) => {
      if (index === 0) {
        center = [location.latitude, location.longitude];
      }
      const LAT_LNG = new L.LatLng(location.latitude, location.longitude);
      bounds.extend(LAT_LNG);
    });
  }

  const mapOptions = {
    center: center,
    bounds: bounds,
    zoom: zoom,
    zoomSnap: 0.1, // needed for map padding to work
    worldCopyJump: true,
    zoomControl: false, // turns off leaflet auto generated zoom control so we can use the ZoomControl component for specific position
    gestureHandling: true,
    dragging: !L.Browser.mobile,
  };
  L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

  return (
    breakpoint !== undefined && (
      <>
        <MapContainer className="h-80 md:h-[480px]" {...mapOptions}>
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            detectRetina={true}
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png"
          />
          {dataCentersQuery.isSuccess
            ? dataCentersQuery.data.map((location) => {
                return (
                  <CircleMarker
                    key={location.key}
                    center={[location.latitude, location.longitude]}
                    radius={
                      breakpoint > Breakpoint.SM
                        ? Math.max(location.node_providers * 2, 5)
                        : Math.max(location.node_providers * 2, 5)
                    }
                  >
                    <Tooltip className="" direction="top" opacity={1}>
                      <div className="tw-heading-7 mb-3">{location.name}</div>
                      <div className="flex flex-col gap-0 tw-paragraph-sm">
                        <span className="">Data Center: {location.owner}</span>
                        <span className="">
                          Node providers: {location.node_providers}
                        </span>
                        <span className="">
                          Total nodes: {location.total_nodes}
                        </span>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                );
              })
            : null}
        </MapContainer>
        <div className="absolute top-4 left-4 py-3 px-4 rounded-xl bg-white/10 z-[400] map-legend-fade-in">
          <div className="text-white flex gap-2 items-center tw-paragraph">
            <span className="border-[#3388ff] border-[3px] border-solid w-4 h-4 inline-block rounded-full"></span>
            Node Providers
          </div>
        </div>
      </>
    )
  );
};
export default Map;
