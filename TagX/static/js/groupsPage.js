$(".thumbnail").click(function () {
	var INITIALHEIGHT = 60;
	var LISTINGHEIGHT = 30;
    var myClass = this.classList[0];
    var users = test[myClass].users;
    var systems = test[myClass].systems;
    var newHeight = ((users.length > systems.length) ? users.length : systems.length) * LISTINGHEIGHT + INITIALHEIGHT;
    if(($(this).height() > INITIALHEIGHT)) {
    	$("." + myClass + ".sub").fadeOut('fast', function() {
    		$("." + myClass + ".sub").remove();
    	});
    	$(this).animate({
        	height: INITIALHEIGHT
    	}, 200)
    } else {
    	$(this).animate({
        	height: newHeight
    	}, 200);
    	var subStr = '<div class="' + myClass + ' sub row">' + ' \
	    				<div class="col-xs-6">';
	    systems.forEach(function(system) {
	    	subStr +=  '<p>System Name: \
                            <a href="/system/' + system + '"> \
                                <kbd class="system ' + system + '">' + system + '</kbd> \
                            </a> \
                        </p>'
	    });
	    subStr += '</div><div class="col-xs-6">';
	    users.forEach(function(user) {
	    	subStr += '<p>Username: <kbd>' + user + '</kbd></p>'
	    });
	    subStr += '</div></div>';
    	$("." + myClass + ".thumbnail").append(subStr);
    }
}); 
