$(".thumbnail").click(function () {
	var INITIALHEIGHT = 60;
	var LISTINGHEIGHT = 30;
    var myClass = this.classList[0];
    var users = groups[myClass].users;
    var mySystems = groups[myClass].systems;
    var newHeight = ((users.length > mySystems.length) ? users.length : mySystems.length) * LISTINGHEIGHT + INITIALHEIGHT;
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
	    mySystems.forEach(function(system) {
            if(systems[system]) {
    	    	subStr +=  '<p>System Name: \
                                <a href="/system/' + system + '"> \
                                    <kbd class="system ' + system + '">' + systems[system].name + '</kbd> \
                                </a> \
                            </p>'
            }
	    });
	    subStr += '</div><div class="col-xs-6">';
	    users.forEach(function(user) {
	    	subStr += '<p>Username: <kbd>' + user + '</kbd></p>'
	    });
	    subStr += '</div></div>';
    	$("." + myClass + ".thumbnail").append(subStr);
    }
});

$("select").change(function () {
    var str = "";
    $("select option:selected").each(function() {
        str += $(this).text() + " ";
    });
    $(".modal-body").append('<div class="row"> \
                                <div class="col-sm-6"> \
                                    <p>' + $("select option:selected").val() + '</p> \
                                </div> \
                                <div class="col-sm-6"> \
                                    <p>' + $("select option:selected").val() + '</p> \
                                </div> \
                            </div>') 
});
