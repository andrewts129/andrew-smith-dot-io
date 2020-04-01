window.onload = async () => {
    if (!mapboxgl.supported()) {
        window.alert("Sorry, your browser doesn't support the map on this page")
    } else {
        // This comes from a script tag on the page that pulls in an environment variable
        tileServerURL = tileServerURL ? tileServerURL : "http://andrewsmith.io:81";

        const map = new mapboxgl.Map({
            container: 'map',
            center: [-82.9988, 39.9612],
            zoom: 13,
            minZoom: 11,
            maxZoom: 16,
            style: tileServerURL + "/styles/base/style.json",
            antialias: true,
        });

        map.on("load", () => {
            map.addSource("buildings", {
                id: "buildings",
                type: "vector",
                tiles:[tileServerURL + "/data/buildings/{z}/{x}/{y}.pbf"],
                minzoom: 11,
                maxzoom: 15,
            });

            map.addSource("columbus", {
                id: "columbus",
                type: "vector",
                tiles:[tileServerURL + "/data/columbus/{z}/{x}/{y}.pbf"]
            });

            map.addControl(new mapboxgl.FullscreenControl());

            const colors = ["#eaeae5", "#e41a1c", "#f24d0e", "#ff7f00", "#FFBF1A", "#ffff33", "#A6D73F", "#4daf4a", "#429781", "#377eb8", "#6866AE", "#984ea3"];
            const stopYears = [0, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050];

            map.addLayer({
                id: "buildings",
                type: "fill",
                source: "buildings",
                "source-layer": "buildings",
                paint: {
                    "fill-color": {
                        "property": "year_built",
                        "stops": colors.map((color, index) => {
                            return [stopYears[index], color]
                        })
                    }
                },
                layout: { // Sort so that older buildings are on top and undated buildings are at the back
                    "fill-sort-key": ["case",
                        ["==", ["get", "year_built"], 0],
                            -3000,
                        // default
                            ["-", ["to-number", ["get", "year_built"]]]
                    ]
                }
            });
        })
    }
};
