function main() {

    var polygon;

    var map_object = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        legends: false,
        layer_selector: false,
    }).setView([49.2127168, 9.3962733], 10);

    // Zoomfunktion komplett deaktivieren
    map_object.touchZoom.disable();
    map_object.doubleClickZoom.disable();
    map_object.scrollWheelZoom.disable();
    map_object.keyboard.disable();

    var sublayers = [];

    // Leeren TileLayer hinzufügen

    L.tileLayer('', {
        attribution: 'Recherche und Code: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Daten: <a href="http://www.statistik-bw.de/">Statistisches Landesamt</a>'
    }).addTo(map_object);

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/acee326d-57cb-4d82-a854-bc144b2ef8d6/viz.json', {
            legends: false,
            cartodb_logo: false,
            mobile_layout: true,
            force_mobile: $(window).width() < 620
        })
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM btw13",
                cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:0.8;line-color:#FFF;line-width:1;line-opacity:1}#btw13 [ cdu <= 61.3]{polygon-fill:#000;polygon-opacity:1}#btw13 [ cdu <= 52.1]{polygon-fill:#000;polygon-opacity:0.8}#btw13 [ cdu <= 48.4]{polygon-fill:#000;polygon-opacity:0.6}#btw13 [ cdu <= 46.2]{polygon-fill:#000;polygon-opacity:0.4}#btw13 [ cdu <= 43.9]{polygon-fill:#000;polygon-opacity:0.2}'
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#infowindow_template').html());

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
            var LayerActions = {
                cdu: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:0.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [ cdu <= 61.3]{polygon-fill:#000;polygon-opacity:1}#btw13 [ cdu <= 52.1]{polygon-fill:#000;polygon-opacity:0.8}#btw13 [ cdu <= 48.4]{polygon-fill:#000;polygon-opacity:0.6}#btw13 [ cdu <= 46.2]{polygon-fill:#000;polygon-opacity:0.4}#btw13 [ cdu <= 43.9]{polygon-fill:#000;polygon-opacity:0.2}'
                    });
                    return true;
                },
                spd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:0.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [ spd <= 26.4]{polygon-fill:#eb0000;polygon-opacity:1}#btw13 [ spd <= 22.6]{polygon-fill:#eb0000;polygon-opacity:0.8}#btw13 [ spd <= 20.9]{polygon-fill:#eb0000;polygon-opacity:0.6}#btw13 [ spd <= 19.6]{polygon-fill:#eb0000;polygon-opacity:0.4}#btw13 [ spd <= 18]{polygon-fill:#eb0000;polygon-opacity:0.2}'
                    });
                    return true;
                },
                gruene: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [grune<=12.2]{polygon-fill:#5cb813;polygon-opacity:1}#btw13 [grune<=10]{polygon-fill:#5cb813;polygon-opacity:.8}#btw13 [grune<=9]{polygon-fill:#5cb813;polygon-opacity:.6}#btw13 [grune<=8.1]{polygon-fill:#5cb813;polygon-opacity:.4}#btw13 [grune<=6.7]{polygon-fill:#5cb813;polygon-opacity:.2}'
                    });
                    return true;
                },
                linke: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [die_linke<=6.3]{polygon-fill:#540fc6;polygon-opacity:1}#btw13 [die_linke<=5.2]{polygon-fill:#540fc6;polygon-opacity:.8}#btw13 [die_linke<=4.6]{polygon-fill:#540fc6;polygon-opacity:.6}#btw13 [die_linke<=4.1]{polygon-fill:#540fc6;polygon-opacity:.4}#btw13 [die_linke<=3.6]{polygon-fill:#540fc6;polygon-opacity:.2}'
                    });
                    return true;
                },
                fdp: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [fdp<=10.1]{polygon-fill:#ecbd00;polygon-opacity:1}#btw13 [fdp<=8]{polygon-fill:#ecbd00;polygon-opacity:.8}#btw13 [fdp<=7]{polygon-fill:#ecbd00;polygon-opacity:.6}#btw13 [fdp<=6.2]{polygon-fill:#ecbd00;polygon-opacity:.4}#btw13 [fdp<=5.4]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
                afd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM btw13",
                        cartocss: '#btw13{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:2;line-opacity:1}#btw13 [afd<=7.5]{polygon-fill:#00baff;polygon-opacity:1}#btw13 [afd<=6.4]{polygon-fill:#00baff;polygon-opacity:.8}#btw13 [afd<=5.8]{polygon-fill:#00baff;polygon-opacity:.6}#btw13 [afd<=5]{polygon-fill:#00baff;polygon-opacity:.4}#btw13 [afd<=4.1]{polygon-fill:#00baff;polygon-opacity:.2}'
                    });
                    return true;
                },
            }

            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({
                    user: 'dahilzen'
                });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(the_geom) as geom FROM btw13 WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#fff", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });

        });

}

window.onload = main;