import React, { useMemo } from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import {
  Map,
  Camera,
  GeoJSONSource,
  Layer,
  Marker,
  NativeUserLocation,
} from '@maplibre/maplibre-react-native';
import { theme } from '@/theme';

interface MarkerData {
  id: string;
  coordinate: [number, number];
  title?: string;
  color?: string;
}

interface MapViewProps {
  centerCoordinate?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  routeLine?: Array<[number, number]>;
  followUserLocation?: boolean;
  style?: ViewStyle;
}

const MAP_STYLE = {
  version: 8 as const,
  sources: {
    openfreemap: {
      type: 'raster' as const,
      tiles: ['https://tiles.openfreemap.org/planet/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: 'OpenFreeMap',
    },
  },
  layers: [
    {
      id: 'openfreemap',
      type: 'raster' as const,
      source: 'openfreemap',
    },
  ],
};

const DEFAULT_CENTER: [number, number] = [-65.1833, -31.9333];
const DEFAULT_ZOOM = 15;

export const MapView: React.FC<MapViewProps> = ({
  centerCoordinate = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  routeLine,
  followUserLocation = false,
  style,
}) => {
  const routeGeoJSON = useMemo(() => {
    if (!routeLine || routeLine.length < 2) return null;
    return {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          geometry: {
            type: 'LineString' as const,
            coordinates: routeLine,
          },
          properties: {},
        },
      ],
    };
  }, [routeLine]);

  return (
    <View style={[styles.container, style]}>
      <Map mapStyle={MAP_STYLE} style={styles.map}>
        <Camera
          center={centerCoordinate}
          zoom={zoom}
          trackUserLocation={
            followUserLocation ? 'default' : undefined
          }
        />

        {followUserLocation && <NativeUserLocation />}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            id={marker.id}
            lngLat={marker.coordinate}
          >
            <View style={styles.markerContainer}>
              <View
                style={[
                  styles.markerCircle,
                  {
                    backgroundColor:
                      marker.color ?? theme.colors.turquoise,
                  },
                ]}
              />
              {marker.title ? (
                <Text style={styles.markerTitle}>{marker.title}</Text>
              ) : null}
            </View>
          </Marker>
        ))}

        {routeGeoJSON && (
          <GeoJSONSource id="route" data={routeGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                'line-color': theme.colors.turquoise,
                'line-width': 3,
              }}
            />
          </GeoJSONSource>
        )}
      </Map>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 12,
    height: 12,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  markerTitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.deepBlue,
    textAlign: 'center',
  },
});
