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

//used for right arrow
function changeSlideToNextHandler(slider) {

    var current = slider.find(".lw-slide-item.active");

    var next = current.next();
    if (next.length == 0) {
        next = current.parent().children().first();
    }

    switchSlide(current,next);
}

//used for left arrow
function changeSlideToPrevHandler(slider) {

var current = slider.find(".lw-slide-item.active");

var prev = current.prev();
if (prev.length == 0) {
prev = current.parent().children().last();
}

switchSlide(current,prev);


}

//changes to slide by indicator index
function selectedSlider(tergetIndic,slider){
    var current = slider.find(".lw-slide-item.active");
    
    var next= slider.find(".lw-slide-item")[$(tergetIndic).index()];
    switchSlide($(current),$(next));
}

//the core: changes current slide with another 
//(by default next slide)
function switchSlide(current,next){
    var slider=current.closest(".lw-slider");
    if(slider.hasClass("trans")) {
        return;
    }
    slider.addClass("trans");
    toggleUlForSlide(slider, current);
    current.removeClass("active");
    toggleUlForSlide(slider, next);

    setTimeout(function () {
        //end of out transition
        current.addClass("hidden");
        next.removeClass("hidden");
        next.addClass("active");
        setTimeout(function(){
            //end of in transition
        slider.removeClass("trans");

        },2000)
    }, 2000)

}

//changes indicator using slide index
function toggleUlForSlide(slider, slide) {
    var idxIndic = slide.index();
    var ul = slider.find(".indicators").children()[idxIndic];
    $(ul).toggleClass("active");
}