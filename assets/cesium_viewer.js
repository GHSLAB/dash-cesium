export async function setupCesiumViewer(id) {
    // Your access token can be found at: https://ion.cesium.com/tokens.
    // This is the default access token from your ion account
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDA5NWUzOS1hYTk1LTRlMDUtODI0Yi0yZWE1YjVjZDQ3YjAiLCJpZCI6NTA3MzcsImlhdCI6MTYxNzc5NDYxN30.NrmD4vkfsF-LoFz0Na1_CUS1mIfEFyvukGinyBQV-Ts';

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
