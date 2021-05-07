$(function() {
    let name = $('#Name')
    let ID = $('#ID')

    $('#btnProductAdd').click(function() {

        addUser(
            name.val(),
            ID.val()
        )


    })

})