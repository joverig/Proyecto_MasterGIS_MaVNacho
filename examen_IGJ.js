var map, serviceAreaTask, params, clickpoint;

require([
  "esri/map",
  "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/FeatureSet",
  "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
  "esri/geometry/Point", "esri/graphic",
  "dojo/parser", "dojo/dom", "dijit/registry",
  "esri/Color", "dojo/_base/array", "esri/layers/CSVLayer",
  "esri/renderers/SimpleRenderer",
  "dojo/ready", "dijit/form/Button", "dojo/dom",
  "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
  "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dijit/form/HorizontalSlider",
  
  "dojo/domReady!"
], function(
  Map,
  ServiceAreaTask, ServiceAreaParameters, FeatureSet,
  SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
  Point, Graphic,
  parser, dom, registry,
  Color, arrayUtils, CSVLayer,
  SimpleRenderer, ready, Button, dom
) {
  parser.parse();

  map = new Map("map", {
    basemap: "streets-vector",
    center: [-3.71, 40.38],
    zoom: 12
  });

  var myButton = new Button({
    label: "Click me!",
    onClick: function(){
        // Do something:
        dom.byId("result1").innerHTML += "Thank you! ";
    }
}, "progButtonNode");



  map.on("click", mapClickHandler);

  params = new ServiceAreaParameters();
  params.defaultBreaks= [5];
  params.outSpatialReference = map.spatialReference;
  params.returnFacilities = false;
  
  
//   params.restrictionAttributes =  ["RestriccionCoche"]
//   params.restrictionAttributes =  ["RestriccionPeaton"]

  serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area");

//   registry.byId("hslider").on("change", updateHorizontalLabel);
//   updateHorizontalLabel();


  var CentroSaludLayer = new CSVLayer("Centros_de_salud.csv")
  var marker = new SimpleMarkerSymbol();
marker.setPath("M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z");
marker.setStyle(SimpleMarkerSymbol.STYLE_PATH);
marker.setColor(new Color([0, 2, 255, 1]));
var renderer = new SimpleRenderer(marker);

CentroSaludLayer.setRenderer(renderer);

  map.addLayer(CentroSaludLayer)


//   // Create function that updates label when changed
//   function updateHorizontalLabel() {
//     // Get access to nodes/widgets we need to get/set values
//     var hSlider = registry.byId("hslider");
//     var label = dom.byId("decValue");
//     // Update label
//     label.innerHTML = hSlider.get("value");
//     params.defaultBreaks = [ hSlider.value / 60 ];
//     if (clickpoint) {
//       mapClickHandler(clickpoint);
//     }
//   }

var btn = document.getElementById("coche")

    btn.addEventListener("click", mapClickHandler2)

    var btn2 = document.getElementById("pie")

    btn2.addEventListener("click", mapClickHandler)



function mapClickHandler(evt) {
    map.graphics.clear()
   
    params.restrictionAttributes =  ["RestriccionCoche"]

    var features = [];
    for (pj of CentroSaludLayer.graphics){
        features.push(pj)
        // console.log("funciona")
        // console.log(pj)
    }
//   features.push(CentroSaludLayer.graphics[3]);
    var facilities = new FeatureSet();
    facilities.features = features;
    params.facilities = facilities;
    // params.attributeParameterValues = "TiempoPie"
     params.defaultBreaks= [1];
  
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([0,255,0,0.8])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });
    // params.impendanceAttribute = "TiempoCoche"
    
     params.defaultBreaks= [2];
    //  params.attributeParameterValues.TiempoPie = 1
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([200,200,0,0.6])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });
      
    params.defaultBreaks= [4];
    // params.attributeParameterValues.TiempoPie = 10
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([200,0,0,0.1])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });

    
 }





 function mapClickHandler2(evt) {
    map.graphics.clear()
    params.restrictionAttributes =  ["RestriccionPeaton"]

    var features = [];
    for (pj of CentroSaludLayer.graphics){
        features.push(pj)
        // console.log("funciona")
        // console.log(pj)
    }
//   features.push(CentroSaludLayer.graphics[3]);
    var facilities = new FeatureSet();
    facilities.features = features;
    params.facilities = facilities;
    // params.attributeParameterValues = "TiempoPie"
     params.defaultBreaks= [1];
  
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([0,255,0,0.8])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });
    // params.impendanceAttribute = "TiempoCoche"
    
     params.defaultBreaks= [2];
    //  params.attributeParameterValues.TiempoPie = 1
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([200,200,0,0.6])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });
      
    params.defaultBreaks= [4];
    // params.attributeParameterValues.TiempoPie = 10
    serviceAreaTask.solve(params,function(solveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",
        new SimpleLineSymbol("solid", new Color([0,0,0]), 1),
        new Color([200,0,0,0.1])
      );
      arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
        serviceArea.setSymbol(polygonSymbol);
        map.graphics.add(serviceArea);
        console.log(serviceArea)
      });
    });

    
 }

});