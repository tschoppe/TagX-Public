var newGroupInput = $(".new-group-input input");
var usersModalDivider = $(".users.modal-divider");
var systemsModalDivider = $(".systems.modal-divider");
var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();


function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

$(".disabled").attr("href", "#");
$(".disabled").attr("onclick", "");
$(".disabled").click(function() {
    return(false);
});

// this funtion adds or removes all the elements that are seen when expanding a group
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
                            <p class="edit-group"> \
                                <i class="fa fa-pencil-square" aria-hidden="true" onclick=changeText("edit",' + myClass + ') type="button" data-toggle="modal" data-target="#createGroupModal"' + myClass + '"></i> \
                                <a onclick=changeText("edit",' + myClass + ') type="button" class="edit-group" data-toggle="modal" data-target="#createGroupModal"' + myClass + '">Edit Group</a> \
                                 | <i onclick=setHref(' + myClass + ') class="fa fa-times-circle remove-group" aria-hidden="true" type="button" data-toggle="modal" data-target="#removeGroupModal"></i> \
                                 <a onclick=setHref(' + myClass + ') class="remove-group-modal-button" type="button" data-toggle="modal" data-target="#removeGroupModal">Remove</a> \
                            </p> \
                        </div> \
                    </div>'
    	$("." + myClass + ".thumbnail").append(subStr);
    }
});


// this function displays tthe system name just selected in the group modal
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


// this function displays tthe user name just selected in the group modal
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


// this function handles deleting everything from the groups modal when the cancel button is clicked
$(".cancel-create-group").click(function() {
    $(".added-user").parent().parent().remove();
    $(".added-system").parent().parent().remove();
    usersModalDivider.hide();
    systemsModalDivider.hide();
    $("select[name='users']").val("");
    $("select[name='systems']").val("");
    newGroupInput.val("");
});


// this function handles what happens when the "Create Group" button in the modal is clicked
function createGroup(url, owner) {
    var systems = $(".added-system").map(function() {
                        return $.trim($(this).attr('value'));
                    }).get();
    var users = $(".added-user").map(function(){
                       return $.trim($(this).text());
                    }).get();
    var name = newGroupInput.val();
    var border = newGroupInput.css("border");
    if(!$(".group-form")[0].checkValidity()) {
        $('<input type="submit">').hide().appendTo($(".group-form")).click().remove();
        return;
    }
    $("a.btn.btn-primary.confirm-create-group").attr('disabled', 'disabled');
    $("a.btn.btn-primary.confirm-create-group").addClass("disabled");
    // if(jQuery.isEmptyObject(systems) && jQuery.isEmptyObject(users)) {
    //     $("label.system-user-label")
    //     .css("color", "red")
    //     .animate({color: "black"}, 1000, function() {
    //         $("label.system-user-label").removeAttr('style');
    //     });
    //     return;
    // }
    $('.loader').show();
    $.post(url,
    {
        "name": name,
        "owner": owner,
        "systems": JSON.stringify(systems),
        "users": JSON.stringify(users),
        csrfmiddlewaretoken: csrftoken,
        contentType: "application/json"
    });
    setTimeout(function() {
        window.location = "/mygroups/";
    }, 1000);
}


// the next two functions simply handle the border color of the group name input in the group modal
newGroupInput.focusin(function() {
    $(this).css("border", "2px solid #0096d6");
});

newGroupInput.focusout(function() {
    $(this).css("border", "2px solid #c3c3c3");
});


// this function handles what happens when the "X" next to a system or user in the 
// group modal is clicked 
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


// this function handles what to display in the create/edit group modal, since 
// the same modal is used for creating a group and editing one
function changeText(button, groupId) {
    if(button == "edit"){
        $("h4#newGroupModal.modal-title").text("Edit Group");
        $("a.btn.btn-primary.confirm-create-group").text("Edit Group");
        $("a.btn.btn-primary.confirm-create-group").off('click');
        $("a.btn.btn-primary.confirm-create-group").click(function() {
            createGroup("/groups/edit/" + zeroPad(groupId, 10) + "/", groups[zeroPad(groupId, 10)].owner);
        });
        newGroupInput.val(groups[zeroPad(groupId, 10)].name);
        if(groups[zeroPad(groupId, 10)].systems.length > 0) {
            systemsModalDivider.show();
            groups[zeroPad(groupId, 10)].systems.forEach(function(system) {
                $(".col-xs-6.sysRow").append('<div class="row"> \
                                            <div class="col-xs-12"> \
                                                <p value="' + system + '" class="added-system">' + systems[system].name + '<i onclick=deleteFunc(this) class="fa fa-times-circle" aria-hidden="true"></i></p> \
                                            </div> \
                                        </div>')
            })
        }
        if(groups[zeroPad(groupId, 10)].users.length > 0) {
            usersModalDivider.show();
            groups[zeroPad(groupId, 10)].users.forEach(function(user) {
                $(".col-xs-6.usersRow").append('<div class="row"> \
                                        <div class="col-xs-12"> \
                                            <p value="' + user + '" class="added-user">' + user + '<i onclick=deleteFunc(this) class="fa fa-times-circle" aria-hidden="true"></i></p> \
                                        </div> \
                                    </div>')
            })
        }
    } else if(button == "create"){
        $("h4#newGroupModal.modal-title").text("Create New Group");
        $("a.btn.btn-primary.confirm-create-group").text("Create Group");
        $("a.btn.btn-primary.confirm-create-group").off('click');
        $("a.btn.btn-primary.confirm-create-group").click(function() {
            createGroup("/groups/new/", "");
        });
    } 
}

// this function handles setting the href for the confirm-remove-group button
function setHref(groupId) {
    $("a.btn.btn-primary.confirm-remove-group").attr('href', "/groups/delete/" + zeroPad(groupId, 10));
}

// this function shows the loading spinner when deleting a group
$("a.btn.btn-primary.confirm-remove-group").click(function() {
    $('.loader').show();
    $(this).attr("disabled", "disabled");
    $(this).addClass("disabled");
});

$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});
