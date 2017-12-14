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
	$('input#bar').on('focus', function() {
	    $('input#button').addClass('focused');
	});
});

$(document).ready(function() {
	$('input#bar').focusout(function() {
	    $('input#button').removeClass('focused');
	});
});

$(document).ready(function() {
	$("tbody tr").click(function() {
		window.location = "/system/" + this.classList[0];
	});
});