$(document).ready(function(){
	
	// search start	
	var current_row = [];
	var category = [];
	var gu_location = [];

	// google map start
	var position_default = new google.maps.LatLng(37.497962,127.027610);

	var neighborhoods = [
	new google.maps.LatLng(37.498275,127.026871),
	new google.maps.LatLng(37.498588,127.027932),
	new google.maps.LatLng(37.499164,127.026566),
	new google.maps.LatLng(37.498608,127.028439)
	];

	var map;
	var markers = [];
	var iterator = 0;
	var image = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';

	function initialize() {
		var mapOptions = {
			zoom: 17,
			center: position_default,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var contentString = '<div class="customoverlay">' +
		'    <span class="title">THANX TO VISIT CHUIZONE~♥<br>지역과 취미를 선택하세요</span>' +
		'  </a>' +
		'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			position: position_default,
		});

		infowindow.setMap(map);
		drop();
	}

	function drop() {
		for (var i = 0; i < neighborhoods.length; i++) {
			setTimeout(function() {
				addMarker();
			}, i * 650);
		}
	}

	function addMarker() {
		markers.push(new google.maps.Marker({
			position: neighborhoods[iterator],
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
			icon: image
		}));
		iterator++;
	}

	// academy data searching	

	$("#map_searcher").click(function() {
		var gu_latlng = $("#searcher_1").val().split(",");
		var lat = parseFloat(gu_latlng[0]);
		var lng = parseFloat(gu_latlng[1]);
		var gu_location = gu_latlng[2];
		var category = $("#searcher_2").val();
		$.cookie('gu_location', gu_location, { expires: 1 });
		$.cookie('category', category, { expires: 1 });
		$.cookie('current_row', 6, { expires: 1 });
		var gu_name = $("#searcher_1").children("option:selected").text();
		// console.log('cookie test:' + gu_location + current_row + category+ lat + lng);
		var position_default = new google.maps.LatLng(lat, lng);		
		// console.log('cookie test:' + gu_name + gu_location + position_default + neighborhoods[3]);

		$.ajax({
			url : "/mapdata",
			dataType : "json",
			data : {
				current_row : current_row,
				gu_location : gu_location,
				category : category
			},
			success : function(resp){
				var location_data = resp.data;
				console.log(location_data);					
				for (var i = 0; i < location_data.length; i ++){		
					$.each(location_data, function(i){
						var academy_data = location_data[i];
						neighborhoods.push({id: academy_data.id, title: academy_data.academy_name, latlng: academy_data.academy_latlng});
					});
					var academy_id = neighborhoods[i].id;						
					var latlng = neighborhoods[i].latlng;
					var split_latlng = latlng.split(",");
					var lat = split_latlng[0];
					var lng = split_latlng[1];
					var marker_title = neighborhoods[i].title;
					var marker_point = new google.maps.LatLng(lat, lng);	

					console.log(latlng, lat, lng, marker_title);
					addMarker();
				};
				var mapOptions = {
					zoom: 17,
					center: position_default,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);				
			},
			error : function(){
				console.log('invalid response!. Server error!');
			} 
		});
	});	
	
	google.maps.event.addDomListener(window, 'load', initialize);

	// academy modal start			
	$(document).on('click tap touchstart', '.thumb-info', function() {
	// $('.thumb-info').click(function(){
		// id = $(this).val().split("_")
		id = $(this).attr('value').split('_')
		console.log("clicked: " + id);
		$.ajax({
			url : "/academy_detail",
			dataType : "html",
			data : {
				id : id[1]
			},
			success : function(resp){
				$("#myModal").append(resp); 
			},
			error : function(resp){
				console.log('invalid response!. Server error!');
			}	
		});
	});

	$('body').on('hidden.bs.modal', '.modal', function () {
		$(".modal-dialog").remove();
		console.log('reset modal')
	});
	// academy modal end
});