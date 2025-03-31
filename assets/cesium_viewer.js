// 引入 accessToken
import { accessToken } from './accessToken.js';

// 使用引入的 accessToken
Cesium.Ion.defaultAccessToken = accessToken;

export async function setupCesiumViewer(id) {
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain(),
    });

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-15.0),
        }
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);
    return true;
}
