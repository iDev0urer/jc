/// <reference path="../../typings/browser/ambient/jquery/index.d.ts" />
$(".nav-link.with-submenu, .nav-item.with-submenu").click(function (e) {
    if ($(this).hasClass("open")) {
        $(this).removeClass("open");
    }
    else {
        $(this).addClass("open");
    }
});
$(".search-item a.nav-link").click(function (e) {
    e.preventDefault();
    var parent = $(this).parent();
    $(parent).addClass("open");
    $(parent).children(".search-field").focus();
});
$(".search-item .close-button").click(function (e) {
    e.preventDefault();
    console.log("clicked");
    var parent = $(this).closest(".search-item");
    $(parent).removeClass("open");
});
$(".search-field").keypress(function (e) {
    if (e.keyCode === 10 || e.keyCode === 13) {
        e.preventDefault();
        // Submit the form, etc.
        console.log($(this).text());
    }
});
$(".menu-toggle").click(function (e) {
    e.preventDefault();
    var menu = $(this).data("menu");
    if ($(menu).hasClass("open")) {
        $(menu).removeClass("open");
    }
    else {
        $(menu).addClass("open");
    }
});
$(".dropdown-toggle").click(function (e) {
    e.preventDefault();
    var menu = $(this).closest(".dropdown");
    if ($(menu).hasClass("open")) {
        $(menu).removeClass("open");
    }
    else {
        $(menu).addClass("open");
    }
});
$(".open-modal").click(function (e) {
    e.preventDefault();
    $("#modal").addClass("active");
    centerModal();
});
$(".modal .close").click(function (e) {
    $(this).parent(".modal").parent(".dimmer").removeClass("active");
});
function centerModal() {
    if ($(".modal.active").length) {
        var el = $(".modal.active"), width = $(el).width(), height = $(el).height();
        if (height < $(document).height()) {
            var margin = $(document).height() - $(el).height();
            $(el).css({ marginTop: (margin / 2), marginBottom: (margin / 2) });
        }
    }
}
$(window).resize(function (e) {
    centerModal();
});
