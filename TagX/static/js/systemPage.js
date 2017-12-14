var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();

$('form').submit(function(){
    $("input.btn.btn-primary.confirm-add-tag", this).attr('disabled', 'disabled');
});

$(".tags-listed").click(function() {
	$("form#manage-tag-form").attr('value', $(this).text());
});

$("input.btn.btn-primary.confirm-manage-tag").click(function() {
	if(!$("form#manage-tag-form")[0].checkValidity()) {
        $('<input type="submit">').hide().appendTo($("form#manage-tag-form")).click().remove();
        return;
    }
	$("input.btn.btn-primary.confirm-manage-tag").attr('disabled', 'disabled');
    $("input.btn.btn-primary.confirm-manage-tag").addClass("disabled");
    $.post(location.pathname + "editTag/",
    {
        "old": "aaa",
        "new": "bbb",
        csrfmiddlewaretoken: csrftoken,
        contentType: "application/json"
    });
    // setTimeout(function() {
    //     window.location = window.location;
    // }, 1000);
});