
$(function($){

    let resultJson = []
    let skipJson = {}
    /**
     * load learn Data
     */
    loadLearnData = () => {
        $.ajax({
            type: "GET",
            data: "is_get=1",
            dataType: 'json',
            async: false,
            success: function(json){
                resultJson = json
            }
        })
    }
    
    loadLearnData()

    renderText = () => {

        let textObject = resultJson.shift()
        if(typeof(textObject) === "object" ) {

            $("#vocab").text(textObject.vocab)
            $("#level").text(textObject.level)

            $("#English").attr('data-content', textObject.englishMeaning)
            $("#Chinese").attr('data-content', textObject.chineseMeaning)

            $("#Chinese, #English").popover();

            skipJson = textObject

        } else {
            $("#level").text('')
            $("#vocab").text('Nothing word')
            $("#message_body").text('There are no words to learn today, so you can reset the daily review amount')
            $("#message_alert").modal({show: true})
        }

    }

    renderText()
    
    toggleText = (e) => {
        $(e).toggleClass("text-hidden");
    }

    changeLevel = (type = 'skip') => {
        farmiliar(type)
        somewhat(type)
        unfamiliar(type)
        skip(type)
        renderText()
    }

    skip = (type)=> {
        if(type === 'skip' && 'level' in skipJson) {
            resultJson = resultJson.concat([skipJson])
            skipJson = {}
            $("#English").popover('hide')
            $("#Chinese").popover('hide')
        }
    }

    farmiliar = (type) => {

        if(type === 'farmiliar' && 'level' in skipJson) {
            /**
             * 用户所按的按钮	当前熟练度为level0	level1	level2	level3	level4	level5
                                Familiar  level2  level2  level3  level4  level5  level5
             */
            const rule = {
                0: 3,
                1: 4,
                2: 5,
                3: 6,
                4: 7,
                5: 7,
                6: 8,
                7: 8,
                8: 9,
                9: 10,
                10: 10

            }
            
            let level = 0

            if(skipJson.level in rule) {
                level = rule[skipJson.level]
            }

            let data = {
                _id: skipJson._id,
                level: level
            }

            submitFailiar(data)
        }
    }
    somewhat = (type) => {
        if(type === 'somewhat' && 'level' in skipJson) {
            /**
             * 用户所按的按钮	当前熟练度为level0	level1	level2	level3	level4	level5
                                Somewhat  level1  level2  level2  level3  level3  level4
             */
            const rule = {
                0: 2,
                1: 2,
                2: 3,
                3: 4,
                4: 4,
                5: 5,
                6: 5,
                7: 6,
                8: 6,
                9: 7,
                10: 7
            }
            
            let level = 0

            if(skipJson.level in rule) {
                level = rule[skipJson.level]
            }

            let data = {
                _id: skipJson._id,
                level: level
            }

            submitFailiar(data)
        }
    }
    unfamiliar = (type) => {
        if(type === 'unfamiliar' && 'level' in skipJson) {
            
            /**
             * 用户所按的按钮	当前熟练度为level0	level1	level2	level3	level4	level5
                               Unfamiliar level1  level1  level1  level1  level2 level2
             */
            const rule = {
                0: 1,
                1: 1,
                2: 1,
                3: 1,
                4: 2,
                5: 2,
                6: 2,
                7: 2,
                8: 3,
                9: 3,
                10: 3
            }
            
            let level = 0

            if(skipJson.level in rule) {
                level = rule[skipJson.level]
            }

            let data = {
                _id: skipJson._id,
                level: level
            }
            
            submitFailiar(data)
        }
    }

    submitFailiar = (data) => {
        $.post('', data, function(json){
            console.log(json)
        },'json')
    }
    $(document).on("click","div[id*='popover']", function(){
        $("#English, #Chinese").popover('hide')
        // $("#Chinese").popover('hide')
    })
    


})

