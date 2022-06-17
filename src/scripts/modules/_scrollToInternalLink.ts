declare var $: any;

export default function scrollToInternalLink() {
$(function(){
    $('a[href^="#"]').click(function(){
        var adjust = 0;
        var speed = 200;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top + adjust;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});
}