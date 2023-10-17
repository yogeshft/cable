/*
navbar
*/
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar");
  if (window.scrollY >= 20) {
    navbar.style.backgroundColor = "#050519";
    navbar.style.zIndex = "999"; // Add a z-index value
  } else {
    navbar.style.backgroundColor = "transparent";
    navbar.style.zIndex = "auto"; // Reset z-index to default
  }
});
// const element = document.querySelector('#progressBarContainer');
// const scrollbarHeight = element.offsetHeight - element.clientHeight;
// element.style.height = `${scrollbarHeight}px`;

/* *************************************************************************
                          special features
*********************************************************************** */
const coll = document.querySelectorAll(".collapsible-btn");
coll.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    document.querySelectorAll(".collapse-content").forEach((otherContent) => {
      if (otherContent !== content) {
        otherContent.style.display = "none";
        otherContent.previousElementSibling.classList.remove("active");
      }
    });
    button.classList.toggle("active");
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});

/* *************************************************************************
                      globe
*********************************************************************** */
// Themes begin
am4core.useTheme(am4themes_animated);
var chart = am4core.create("chartdiv", am4maps.MapChart);
chart.geodata = am4geodata_worldLow;
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.deltaLatitude = -20;
chart.padding(20, 20, 20, 20);
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#2b72fb");
polygonTemplate.stroke = am4core.color("black");
polygonTemplate.strokeWidth = 0.5;
polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
polygonTemplate.url = "https://www.datadrum.com/main.php?package={id}";
polygonTemplate.urlTarget = "_blank";

var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
chart.backgroundSeries.mapPolygons.template.polygon.fill =
  am4core.color("#ffffff");
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

let animation;
setTimeout(function () {
  animation = chart.animate(
    { property: "deltaLongitude", to: 100000 },
    20000000
  );
}, 3000);

chart.seriesContainer.events.on("down", function () {
  //  animation.stop();
});
$(
  "#chartdiv > div > svg > g > g:nth-child(2) > g:nth-child(2) > g > g:nth-child(3)"
).hide();

// // Assuming you have a map chart
// var map = AmCharts.makeChart("chartdiv", {
//   // Your map configuration here
//   dataProvider: {
//     map: "worldLow",
//     // ... other map properties
//   },
// });

// // Disable tooltips
// map.dataProvider.showDescriptionOnHover = false;
// map.write("chartdiv");
