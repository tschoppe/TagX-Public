var newGroupInput = $("input.new-group-input");
var usersModalDivider = $(".users.modal-divider");
var systemsModalDivider = $(".systems.modal-divider");
var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();

$(".thumbnail").click(function () {
	var INITIALHEIGHT = 60;
	var LISTINGHEIGHT = 30;
    var myClass = this.classList[0];
    var users = groups[myClass].users;
    var mySystems = groups[myClass].systems;
    var newHeight = (((users.length > mySystems.length) ? users.length : mySystems.length) * LISTINGHEIGHT) + INITIALHEIGHT + LISTINGHEIGHT;
    if(($(this).height() > INITIALHEIGHT)) {
    	$("." + myClass + ".sub").fadeOut('fast', function() {
    		$("." + myClass + ".sub").remove();
    	});
        $("." + myClass + ".edit-group-footer").fadeOut('fast', function() {
            $("." + myClass + ".edit-group-footer").remove();
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
        subStr += '<div class="edit-group-footer ' + myClass + '"> \
                        <div id="footer"> \
                            <p class="edit-group"><i class="fa fa-pencil-square" aria-hidden="true"></i><a type="button" class="edit-group" data-toggle="modal" data-target="#editGroupModal"' + myClass + '">Edit Group</a></p> \
                        </div> \
                    </div>'
    	$("." + myClass + ".thumbnail").append(subStr);
    }
});

$("select[name='systems']").change(function() {
    var str = $("select[name='systems'] option:selected").text();
    var val = $("select[name='systems'] option:selected").val();
    if(str != "none" && str != "" && $(".added-system:contains('" + str + "')").length == 0) {
        systemsModalDivider.show();
        $(".col-xs-6.sysRow").append('<div class="row"> \
                                        <div class="col-xs-12"> \
                                            <p value="' + val + '" class="added-system">' + str + '<i onclick=deleteFunc(this) class="fa fa-times-circle" aria-hidden="true"></i></p> \
                                        </div> \
                                    </div>')
    }
    $("select[name='systems']").val("");
});

$("select[name='users']").change(function() {
    var str = $("select[name='users'] option:selected").text();
    var val = $("select[name='users'] option:selected").val();
    if(str != "none" && str != "" && $(".added-user:contains('" + str + "')").length == 0) {
        usersModalDivider.show();
        $(".col-xs-6.usersRow").append('<div class="row"> \
                                        <div class="col-xs-12"> \
                                            <p value="' + val + '" class="added-user">' + str + '<i onclick=deleteFunc(this) class="fa fa-times-circle" aria-hidden="true"></i></p> \
                                        </div> \
                                    </div>')
    }
    $("select[name='users']").val("");
});

$(".cancel-create-group").click(function() {
    $(".added-user").parent().parent().remove();
    $(".added-system").parent().parent().remove();
    usersModalDivider.hide();
    systemsModalDivider.hide();
    $("select[name='users']").val("");
    $("select[name='systems']").val("");
    newGroupInput.val("");
});

$(".btn.btn-primary.confirm-create-group").click(function() {
    var systems = $(".added-system").map(function() {
                        return $.trim($(this).attr('value'));
                    }).get();
    var users = $(".added-user").map(function(){
                       return $.trim($(this).text());
                    }).get();
    var name = newGroupInput.val();
    var border = newGroupInput.css("border");
    if(name === "") {
        var original_color = newGroupInput.css('border-color');
        newGroupInput.css("border", "2px solid red").animate({borderColor: original_color}, 800);
        return;
    }
    if(jQuery.isEmptyObject(systems) && jQuery.isEmptyObject(users)) {
        $("label.system-user-label")
        .css("color", "red")
        .animate({color: "black"}, 1000, function() {
            $("label.system-user-label").removeAttr('style');
        });
        return;
    }
    $.post("/groups/new/",
    {
        "name": name,
        "systems": JSON.stringify(systems),
        "users": JSON.stringify(users),
        csrfmiddlewaretoken: csrftoken,
        contentType: "application/json"
    });
    window.location = "/mygroups/";
});

newGroupInput.focusin(function() {
    $(this).css("border", "2px solid #0096d6");
});

newGroupInput.focusout(function() {
    $(this).css("border", "2px solid #c3c3c3");
});

function deleteFunc(elem) {
    $(elem).parent().parent().parent().remove();
    var systems = $(".added-system").map(function() {
                        return $.trim($(this).attr('value'));
                    }).get();
    var users = $(".added-user").map(function(){
                       return $.trim($(this).text());
                    }).get();
    if(jQuery.isEmptyObject(systems)) {
        systemsModalDivider.hide();
    }
    if(jQuery.isEmptyObject(users)) {
        usersModalDivider.hide();
    }
}
