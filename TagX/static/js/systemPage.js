var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();

function inTags(value) {
       if (tags.includes(value)) { 
         return true; 
       } else {
        return false;
       }
}

jQuery.validator.addMethod( 
     "exists", 
     function(value, element) { 
       if (tags.includes(value)) { 
         return false; 
       } else {
        return true;
       }
        
     }, 
    "This tag already exists." 
  ); 
  $(document).ready(function() { 
    $(".add-tag-form").validate({ 
      rules: { 
        tag: { 
          exists: true 
        } 
      }, 
    });
    $("#manage-tag-form").validate({ 
      rules: { 
        tag: { 
          exists: true 
        } 
      }, 
    }); 
});

$('form.add-tag-form').submit(function(){
    if($(this)[0].checkValidity() && !inTags($("input[name='tag']").val())) {
        $("input.btn.btn-primary.confirm-add-tag", this).attr('disabled', 'disabled');
    }
});

$(".tags-listed").click(function() {
    $("input[name='tag']").val($(this).text());
    $(".tag-displayed").text($(this).text());
	$("form#manage-tag-form").attr('value', $(this).text());
});

$(".btn.btn-primary.start-manage-tag").click(function() {
    $("input.btn.btn-primary.confirm-manage-tag").show();
    $(this).hide();
    $(".tag-input").show();
    $(".tag-displayed").hide();
    $("span.tag-input").css("display", "block");
});

$(".btn.btn-secondary.cancel-manage-tag").click(function() {
    $("input.btn.btn-primary.confirm-manage-tag").hide();
    $(".btn.btn-primary.start-manage-tag").show();
    $(".tag-input").hide();
    $(".tag-displayed").show();
    $("span.tag-input").css("display", "none");
});

$(".btn.btn-primary.remove-tag").click(function() {
    $(this).addClass('disabled');
    $.post(location.pathname + "removeTag/",
    {
        "tag": $("form#manage-tag-form").attr('value'),
        csrfmiddlewaretoken: csrftoken,
        contentType: "application/json"
    });
    setTimeout(function() {
        window.location = window.location;
    }, 1500);
});

$("input.btn.btn-primary.confirm-manage-tag").click(function() {
	if($("span.tag-input > input").val() == "" || inTags($("span.tag-input > input").val())) {
        $('<input type="submit">').hide().appendTo($("form#manage-tag-form")).click().remove();
        return;
    }
	$("input.btn.btn-primary.confirm-manage-tag").attr('disabled', 'disabled');
    $("input.btn.btn-primary.confirm-manage-tag").addClass("disabled");
    $.post(location.pathname + "editTag/",
    {
        "old": $("form#manage-tag-form").attr('value'),
        "new": $("span.tag-input > input").val(),
        csrfmiddlewaretoken: csrftoken,
        contentType: "application/json"
    });
    setTimeout(function() {
        window.location = window.location;
    }, 1500);
});

$(".add-tag-button").click(function() {
    $("input[name='tag']").val("");
});