$(".group-tag").click(function () {
    $(this).animate({
        height: ($(this).height() == 150) ? 30 : 150
    }, 200);
});
