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

$("select[name='systems']").change(function() {
    var str = $("select[name='systems'] option:selected").val();
    if(str != "none") {
        $(".systems.modal-divider").show();
        $(".added-system:contains('" + str + "')").remove();
        $(".col-xs-6.sysRow").append('<div class="row"> \
                                        <div class="col-xs-12"> \
                                            <p class="added-system">' + str + '</p> \
                                        </div> \
                                    </div>')
    }
});

$("select[name='users']").change(function() {
    var str = $("select[name='users'] option:selected").val();
    if(str != "none") {
        $(".users.modal-divider").show();
        $(".added-user:contains('" + str + "')").remove();
        $(".col-xs-6.usersRow").append('<div class="row"> \
                                        <div class="col-xs-12"> \
                                            <p class="added-user">' + str + '</p> \
                                        </div> \
                                    </div>')
    }
});

$(".cancel-create-group").click(function() {
    $(".added-user").parent().parent().remove();
    $(".added-system").parent().parent().remove();
    $(".users.modal-divider").hide();
    $(".systems.modal-divider").hide();
    $("select[name='users']").val("");
    $("select[name='systems']").val("");
});
