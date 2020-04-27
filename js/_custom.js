// Модальное окно закрытие/открытие
$('.intro__btn').on('click', function(event) {
    event.preventDefault();
    $('#prognosticModal').addClass('active');
    $('body').addClass('active');
})

$('#prognosticClose').on('click', function() {
    $('#prognosticModal').removeClass('active');
    $('body').removeClass('active');
})

$(document).keydown(function(eventObject){
    if (eventObject.which == 27)
        $('#prognosticModal').removeClass('active');
        $('body').removeClass('active');
});


// Вкладки в модальном окне
$('.showLines').on('click', function() {
    $(this).closest('.prognostic__modal__item').toggleClass('active');
})
