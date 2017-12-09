$("li.mysystems").click(function() {
    $("body").load("/static/partials/mySystemsSkeleton.html")
});

$("li.mygroups").click(function() {
    $("body").load("/static/partials/myGroupsSkeleton.html")
});

$("a.navbar-brand").click(function() {
    $("body").load("/static/partials/mySystemsSkeleton.html")
});