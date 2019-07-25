
$(function (){
    
    const socket = io();

    //obteniendo los elementos del DOM desde la interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //obteniendo los elementos del DOM desde el nickName Form
    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickName = $('#nickName');

    $nickForm.submit( e => {
        e.preventDefault();
        socket.emit('new user', $nickName.val(), function(data){
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html(`<div class="alert alert-danger">
                Ese usuario ya existe!
                <div/>`
                );
            }
            $nickName.val('');
        });
    })

    //eventos
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');

    });

    socket.on('new message', function (data){
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
    });
    socket.on('desconectado', function (data){
        $chat.append('<b>' + data.nick + ' Se a desconectado </b>' + '<br/>');
    })
})

$('#post-comment').hide();
$('#btn-toggle-comment').click(function(e){
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$('#btn-like').click(function(e){
    
    e.preventDefault();
    
    let imgId = $(this).data('id');
    
    $.post('/images/' + imgId + '/like').done(data => {
        console.log(data);
        $('.likes-count').text(data.likes);
    });
});

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this = $(this);

    const response = confirm('Estas seguro de Eliminar la imagen?');
    if (response) {
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        }).done(function (result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            //$this.append('<span>Deleted!</span>');
            
        });
    }
});