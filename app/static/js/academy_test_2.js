$(document).ready(function(){
	$('p').hover(
		function(){
			$(this).css("color", "#ff6666")
		},
		function(){
			$(this).css("color", "#000000")
		}
		)
})