$(function($){
    $("#level_form").on("submit", function() {

        let level = 0
        const number = Number($("#number").val())

        if(number == 0) {
            $("#message_body").text('请确保填写每日复习量')
            $("#message_alert").modal({show: true})
            return false
        }

        $("#level_form input[name*='level']").each((i, n) => {
            level += Number(n.value)
        })
        
        if(level !== 100){
            $("#message_body").text('请确保填写 Lv1 - lv10 之和在 100%')
            $("#message_alert").modal({show: true})
            return false
        }
        return true
    })
})


$(document).ready(function() {
    // Instructions expand/collapse
    var content = $('#instructionBody');
    var trigger = $('#collapseTrigger');
    content.hide();
    $('.collapse-text').text('(Click to expand)');
    trigger.click(function(){
        content.toggle();
        var isVisible = content.is(':visible');
        if(isVisible){
            $('.collapse-text').text('(Click to collapse)');
        }else{
            $('.collapse-text').text('(Click to expand)');
        }
    });
});