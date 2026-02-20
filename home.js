document.addEventListener('DOMContentLoaded', () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmlraXRhNzgiLCJhIjoiY21scDkyMG1wMThsaDNxc2duOWJoeHZ0MyJ9.T9e4gicDXQvrv4a2fdcVQw';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [11.0767, 49.4520], // Nürnberg als Default-Startpunkt
        zoom: 15.5,
        pitch: 60, // Winkel für den 3D-Effekt
        bearing: -20,
        antialias: true,
        attributionControl: false
    });

    map.on('style.load', () => {
        // 3D Gebäude Layer hinzufügen
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#1a1a24',
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.8
                }
            },
            labelLayerId
        );
    });

    map.on('load', () => {
        // Lade-Animation: Warte kurz, damit die Karte rendern kann, dann ausblenden
        setTimeout(() => {
            const loader = document.getElementById('loader');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1500);
    });

    // Start Drive Button Logic
    const startDriveBtn = document.querySelector('.start-drive-btn');
    startDriveBtn.addEventListener('click', () => {
        // Hier kommt später der Übergang zum Drive Hub hin
        console.log('Drive initiated.');
    });
});
