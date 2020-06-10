$(function($){
    $("#level_form").on("submit", function() {

        let level = 0
        const number = Number($("#number").val())

        if(number == 0) {
            $("#message_body").text('請確填寫每日復習量')
            $("#message_alert").modal({show: true})
            return false
        }

        $("#level_form input[name*='level']").each((i, n) => {
            level += Number(n.value)
        })
        
        if(level !== 100){
            $("#message_body").text('請確保填寫 Lv1 - lv5 之和在 100%')
            $("#message_alert").modal({show: true})
            return false
        }
        return true
    })
})