$(function () {
    $("#centered").lwSlider();
});
$.fn.extend({
    lwSlider: function () {
        var newSlider = this;
        $(newSlider).addClass("lw-slider");
        $(newSlider).find(".lw-slide-item").not(".active").addClass("hidden");
        $(newSlider).find(".indicators li").on("click",function(e){ 
            selectedSlider(e.target,newSlider); })
            $(newSlider).find(".arrow.prev").on("click",function(e){ 
                changeSlideToPrevHandler(newSlider); })
            $(newSlider).find(".arrow.next").on("click",function(e){ 
                changeSlideToNextHandler(newSlider); })
        setInterval(function () { changeSlideToNextHandler(newSlider); }, $(this).attr("data-interval"));
    }
});
function changeSlideToNextHandler(slider) {

    var current = slider.find(".lw-slide-item.active");

    var next = current.next();
    if (next.length == 0) {
        next = current.parent().children().first();
    }

    switchSlide(current,next);
}
function changeSlideToPrevHandler(slider) {

var current = slider.find(".lw-slide-item.active");

var prev = current.prev();
if (prev.length == 0) {
prev = current.parent().children().last();
}

switchSlide(current,prev);


}
function selectedSlider(tergetIndic,slider){
    var current = slider.find(".lw-slide-item.active");
    
    var next= slider.find(".lw-slide-item")[$(tergetIndic).index()];
    switchSlide($(current),$(next));
}

function switchSlide(current,next){
    var slider=current.closest(".lw-slider");
    if(slider.hasClass("trans")) return;
    slider.addClass("trans");
    toggleUlForSlide(slider, current);
    current.removeClass("active");
    toggleUlForSlide(slider, next);

    setTimeout(function () {
        current.addClass("hidden");
        next.removeClass("hidden");
        next.addClass("active");
        slider.removeClass("trans");

    }, 2000)


}
function toggleUlForSlide(slider, slide) {
    var idxIndic = slide.index();
    var ul = slider.find(".indicators").children()[idxIndic];
    $(ul).toggleClass("active");
}