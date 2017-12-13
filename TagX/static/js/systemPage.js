$('form').submit(function(){
    $("input.btn.btn-primary.confirm-add-tag", this).attr('disabled', 'disabled');
});