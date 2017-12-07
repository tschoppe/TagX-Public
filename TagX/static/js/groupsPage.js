$(".thumbnail").click(function () {
    var myClass = this.classList[0];
    var INITIALHEIGHT = 60;
    if(($(this).height() > INITIALHEIGHT)) {
    	$("." + myClass + ".sub").fadeOut('fast', function() {
    		$("." + myClass + ".sub").remove();
    	});
    	$(this).animate({
        	height: INITIALHEIGHT
    	}, 200)
    } else {
    	$(this).animate({
        	height: INITIALHEIGHT + (30 * test[myClass].users.length)
    	}, 200);
    	$("." + myClass + ".thumbnail").append(
	    	'<div class="' + myClass + ' sub row">' + ' \
	    		<div class="col-xs-6"> \
                    <p>System Name: system 1</p> \
                    <p>System Name: system 2</p> \
                    <p>System Name: system 3</p> \
                </div> \
                <div class="col-xs-6"> \
                    <p>User 1</p> \
                    <p>User 2</p> \
                    <p>User 3</p> \
                </div> \
	    	</div>'
	    );
    }
});
