import dash
from dash import html
from dash.dependencies import Input, Output
from feffery_dash_utils.style_utils import style

external_css = [
    "https://cesium.com/downloads/cesiumjs/releases/1.127/Build/Cesium/Widgets/widgets.css"
]
external_scripts = [
    {"src": "https://cesium.com/downloads/cesiumjs/releases/1.127/Build/Cesium/Cesium.js"},
    {"src": "/assets/cesium_viewer.js", "type": "module"},  # 引入模块脚本
]

app = dash.Dash(
    __name__,
    title="Cesium Test",
    external_scripts=external_scripts,
    external_stylesheets=external_css,
)

app.layout = html.Div(
    [
        html.Div(id="cesiumContainer", style=style(height="100%", width="100%")),
    ],
    style=style(height="100vh", width="100%"),
)

# 修改 clientside_callback 以引用模块中的函数
app.clientside_callback(
    """
    async function(id) {
        const { setupCesiumViewer } = await import('/assets/cesium_viewer.js');
        return setupCesiumViewer(id);
    }
    """,
    Output("cesiumContainer", "data-done"),
    Input("cesiumContainer", "id"),
)

if __name__ == "__main__":
    app.run_server(debug=True, port=8053, use_reloader=False)
