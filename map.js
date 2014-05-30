function initialize() {
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(29.56, 106.58)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  map.setMapTypeId(google.maps.MapTypeId.HYBRID);

  var panoramioLayer = new google.maps.panoramio.PanoramioLayer();

  panoramioLayer.setMap(map);
  panoramioLayer.setUserId('7820000')

  var photoPanel = document.getElementById('photo-panel');
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(photoPanel);

  google.maps.event.addListener(panoramioLayer, 'click', function(photo) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.innerHTML = photo.featureDetails.title + ': ' +
        photo.featureDetails.author;
    link.setAttribute('href', photo.featureDetails.url);
    li.appendChild(link);
    photoPanel.appendChild(li);
    photoPanel.style.display = 'block';
  });

   var flightPlanCoordinates = function(latlong){
    var path = [];
    for(var i = 0; i < latlong.length; i++){
      path.push(new google.maps.LatLng(latlong[i][0], latlong[i][1]));
    }
    return path;
  };

  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };

  var flightPath = function(path){
    return new google.maps.Polyline({
      path: flightPlanCoordinates(path),
      geodesic: true,
      strokeColor: '#FFFF00',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
      }],
      map: map
    });
  };

  var trips = {'newZealand':
              [[-43.5300, 172.6203],
              [-33.8600, 151.2111],
              [22.2670, 114.1880],
              [29.5583, 106.5667]],
              'japan':
              [[41.8819, -87.6278],
              [35.6895, 139.6917],
              [35.1794,129.0756],
              [37.5665, 126.9780]],
              'myanmar':
              [[29.5583, 106.5667],
              [22.2670, 114.1880],
              [1.3000, 103.80],
              [13.750, 100.4667],
              [16.8000, 96.1500]],
              'dubai':
              [[41.5908, -93.6208],
              [25.2500, 55.30],
              [24.4667, 54.3667],
              [23.21092, 56.2580],
              [48.1333, 11.5667],
              [41.5908, -93.6208]]
            }

  flightPath(trips.newZealand).setMap(map);
  flightPath(trips.japan).setMap(map);
  flightPath(trips.myanmar).setMap(map);
  flightPath(trips.dubai).setMap(map);


}

google.maps.event.addDomListener(window, 'load', initialize);
