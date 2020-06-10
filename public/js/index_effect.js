$(function($) {
    function alsert_toats() {
        let status = $("#status").val()
        if (status != 0) {
            $("#message_alert").modal({show: true})
        }
    }
    alsert_toats()
});
