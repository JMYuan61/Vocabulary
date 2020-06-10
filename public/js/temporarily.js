$(function(){
    temporarily = () => {

        $.ajax({
            type: 'post',
            url: '/temporarily',
            data: {
                number: 10
            },
            dataType: 'json',
            success: function(json) {
                console.log(json)
                $("#message_body").text('successfull Please refresh page')
                $("#message_alert").modal({show: true})
                return false
            }
        })
    }
})