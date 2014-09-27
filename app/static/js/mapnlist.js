<script type="text/javascript" src="http://apis.daum.net/maps/maps3.js?apikey=2044740d5825efd04511818f6489e32cbd0b5e71"></script>

$(document).ready(function(){
	
	var position = new daum.maps.LatLng(37.572950635570876,126.9768891413955);
	
	var map = new daum.maps.Map(document.getElementById('map'), {			
		center: position,
		level: 8,
		mapTypeId: daum.maps.MapTypeId.ROADMAP
	});

	var marker = new daum.maps.Marker({
		position: position
	});
	marker.setMap(map);

	var infowindow = new daum.maps.InfoWindow({
		content: "지역을 선택하세요"
	});
		infowindow.open(map, marker);						

	$("#searcher_1").change(function() {
		var gu_latlng = $(this).val().split(",");
		var lat = parseFloat(gu_latlng[0]);
		var lng = parseFloat(gu_latlng[1]);
		var gu_name = $(this).children("option:selected").text();

		var position = new daum.maps.LatLng(lat, lng);

		var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
			mapOption = {
				center: position, // 지도의 중심좌표
				level: 4 // 지도의 확대 레벨
			};
		
		var map = new daum.maps.Map(mapContainer, mapOption);

		var marker = new daum.maps.Marker({
			position: position
		});
		marker.setMap(map);

		var infowindow = new daum.maps.InfoWindow({
			content: gu_name
		});
		infowindow.open(map, marker);

		var points = [];

		$.ajax({
			url : "/mapdata",
			dataType : "json",
			success : function(resp){
				var location_data = resp.data;					
				for (var i = 0; i < location_data.length; i ++){		
					$.each(location_data, function(i){
						var academy_data = location_data[i];
						points.push({title: academy_data.academy_name,latlng: academy_data.academy_latlng});
					}); 
				function addMarker(points){
					for (var i = 0; i < points.length; i++){
						var imageSrc = "http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
						var imageSize = new daum.maps.Size(24, 35);
						var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
						var marker = new daum.maps.Marker({
							map: map,
							position: points[i].latlng,
							image : markerImage
						});				
						marker.setMap(map);							
						console.log(position);

						var infowindow = new daum.maps.InfoWindow({
							content: points[i].title
						});
						infowindow.open(map, marker);
					};
					console.log(content);						
				};						
				};

			},
			error : function(){
				console.log('invalid response!. Server error!');
			} 
		});

		// var content = '<div class="overlaybox">' +
		// 		'    <div class="boxtitle">추천 학원 정보</div>' +
		// 		'    <div class="first">' +
		// 		'        <div class="triangle text">1</div>' +
		// 		'        <div class="academytitle text">LHOOQ</div>' +
		// 		'    </div>' +
		// 		'    <ul>' +
		// 		'        <li class="up">' +
		// 		'            <span class="number">2</span>' +
		// 		'            <span class="title">Sarah garden</span>' +
		// 		'            <span class="arrow up"></span>' +
		// 		'            <span class="count">2</span>' +
		// 		'        </li>' +
		// 		'        <li>' +
		// 		'            <span class="number">3</span>' +
		// 		'            <span class="title">Leather Craft</span>' +
		// 		'            <span class="arrow up"></span>' +
		// 		'            <span class="count">6</span>' +
		// 		'        </li>' +
		// 		'        <li>' +
		// 		'            <span class="number">4</span>' +
		// 		'            <span class="title">My Kitchen</span>' +
		// 		'            <span class="arrow up"></span>' +
		// 		'            <span class="count">3</span>' +
		// 		'        </li>' +
		// 		'        <li>' +
		// 		'            <span class="number">5</span>' +
		// 		'            <span class="title">Chuizone Piano</span>' +
		// 		'            <span class="arrow down"></span>' +
		// 		'            <span class="count">1</span>' +
		// 		'        </li>' +
		// 		'    </ul>' +
		// 		'</div>';

		// var customOverlay = new daum.maps.CustomOverlay({
		// 	position: position,
		// 	content: content,
		// 	xAnchor: -0.1,
		// 	yAnchor: 0
		// });

		// customOverlay.setMap(map);	
	});
});	