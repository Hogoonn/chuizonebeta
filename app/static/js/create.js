var geocoder;
var map;
var markers = [];
var infowindow = new google.maps.InfoWindow();
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(37.497962,127.027610);
  var mapOptions = {
    zoom: 17,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function(e) {
  	placeMarker(e.latLng, map);
  });

  function placeMarker(position, map) {
  	clearOverlays();
  	var marker = new google.maps.Marker({
  		position: position,
  		map: map
  	});
  	map.panTo(position);
  	markers.push(marker);
  	document.getElementById("latlang_insert").innerHTML = position;	
  	codeLatLng();
  }

}

function codeAddress() {
  var address = document.getElementById('academy_address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      clearOverlays();
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      markers.push(marker);
			document.getElementById("latlang_insert").innerHTML = results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function codeLatLng() {
  var input = markers[0].getPosition();
  var lat = markers[0].position.lat();
  var lng = markers[0].position.lng();
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(17);
        clearOverlays();        
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        markers.push(marker);
        // infowindow.setContent(results[1].formatted_address);
        // infowindow.open(map, marker);
        document.getElementById("academy_formatted_address").innerHTML = results[0].formatted_address;
        $("#academy_address").val(results[0].formatted_address);
        $("#academy_latlng").val(results[0].geometry.location);

      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

function clearOverlays() {
	for (var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
	}
	markers.length = 0;
}

google.maps.event.addDomListener(window, 'load', initialize);



// geocode error 처리 samlple
// function geoCode(addr) {        
// 	var geocoder = new google.maps.Geocoder();

// 	geocoder.geocode( { 'address': addr}, function(results, status) {            
// 		if (status == google.maps.GeocoderStatus.OK) {                
// 			var arrPos = new Array(results.length);    
// 			var marker;

// 			var mapOptions = {
// 				center: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),zoom: 15,
// 				mapTypeId: google.maps.MapTypeId.ROADMAP
// 			};

// 			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);


// 			for(var i=0;i<results.length;i++){                    
// 				arrPos[i] = new google.maps.LatLng(results[i].geometry.location.lat(),results[i].geometry.location.lng());                    
// 				marker = new google.maps.Marker({
// 					map:map,
// 					draggable:true,
// 					animation:google.maps.Animation.DROP,                            
// 					position:arrPos[i],
// 					visible:true
// 				}); 
// 			}

// 			var infowindow = new google.maps.InfoWindow({ 
// 				content: '포인트 상단에 나타나는 메세지', 
// 				size: new google.maps.Size(100,100) 
// 			})
// 			infowindow.open(map, marker);

// 			google.maps.event.addListener(marker, 'click', function(e) {
// 				if(confirm("현재 위치의 좌표를 입력하시겠습니까?")){
// 					var latlng = e.latLng.toString().replace(e.latLng.toString().charAt(0),"");                    
// 					latlng = latlng.replace(latlng.charAt(latlng.length-1),"");
// 					var splitData = latlng.split(",");                        
// 					opener.setPosition($.trim(splitData[0]), $.trim(splitData[1]));
// 					window.close();
// 				}    
// 			});		 
// 		} else {
// 			if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
// 				alert("해당 주소에 대한 결과값이 없습니다.");
// 				return;
// 			}else if(status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
// 				alert("API할당량초과, 관리자에게 문의하세요.");
// 				return;
// 			}else if(status == google.maps.GeocoderStatus.REQUEST_DENIED){
// 				alert("API접근불가, 관리자에게 문의하세요.");
// 				return;
// 			}else if(status == google.maps.GeocoderStatus.INVALID_REQUEST){
// 				alert("주소값이 부정확합니다.");
// 				return;
// 			}else{
// 				alert("원인을 알수 없는 오류가 발생했습니다.");
// 				return;
// 			}
// 		}
// 	});    
// }  