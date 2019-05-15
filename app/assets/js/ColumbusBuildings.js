window.onload = function() {
    const tileServerURL = "https://columbus-building-tileserver.herokuapp.com";

    let map = new mapboxgl.Map({
        container: 'map',
        center: [-82.9988, 39.9612],
        zoom: 12,
        minZoom: 12,
        maxZoom: 18,
        style: tileServerURL + "/styles/base/style.json"
    });

    map.on("load", function () {
        map.addSource("buildings", {
            id: "buildings",
            type: "vector",
            tiles:[tileServerURL + "/data/data/{z}/{x}/{y}.pbf"],
            minzoom: 12,
            maxzoom: 15,
        });

        map.addSource("columbus", {
            id: "columbus",
            type: "vector",
            tiles:[tileServerURL + "/data/columbus/{z}/{x}/{y}.pbf"]
        });

        const min_year = 1800;
        const max_year = 2019;
        const colors = ["#e41a1c", "#ff7f00", "#ffff33", "#4daf4a", "#377eb8"];

        const unavailable_year = 0;
        const unavailable_color = "#eaeae5";

        map.addLayer({
            id: "buildings",
            type: "fill",
            source: "buildings",
            "source-layer": "data",
            paint: {
                "fill-color": {
                    "property": "year_built",
                    "stops": [[unavailable_year, unavailable_color]].concat(colors.map(function (color, index) {
                        return [min_year + (index * (max_year - min_year) / (colors.length - 1)), color]
                    }))
                }
            }
        });
    })
};