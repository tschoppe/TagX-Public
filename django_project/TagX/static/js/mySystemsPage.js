function changeButton() {
	if($("input#bar").val() == '') {
		$("input#button").css("background-color", "#c3c3c3");
		$("input#button").attr("disabled", "disabled"); 
	}
	else {
		$("input#button").css("background-color", "#0096d6");
		$("input#button").removeAttr("disabled");
	}
}

$(document).ready(function() {
	changeButton();
});

$(document).ready(function() {
	$("input#bar").keyup(function() {
		changeButton();
	});
});