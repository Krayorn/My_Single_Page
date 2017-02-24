function isLoggedIn() {
    if(sessionStorage.getItem('user')) {
        return true;
    }
    return false;
}

function redirectIfLoggedIn(){
    if(isLoggedIn()) {
        $('#menu').show();
        $('#user_name').html(sessionStorage.getItem('user'));
        $('#loaded').load("home.html #home_page");
    } else {
        $('#menu').hide();
        $('#loaded').load("form.html fieldset");
    }
}

$(function(){
    redirectIfLoggedIn();
    $(document).on('submit','#login',function(){
        sessionStorage.setItem('user', $(this).find('input[name="pseudo"]').val());
        redirectIfLoggedIn();
        return false;
    });

    $('#disconnected').click(function(){
        sessionStorage.removeItem('user');
        redirectIfLoggedIn();
    });

    $('#user_name').click(function(){
        $('#loaded').load("user.html #user_info", function(){
            $('#user_pseudo').html(sessionStorage.getItem('user'));
        });
    });

   $(document).on('click','#user_pseudo',function(){
        $('#change_name').css('display', 'block');
    });

     $(document).on('submit','#change_name',function(){
        sessionStorage.setItem('user', $(this).find('input[name="pseudo"]').val());
        $('#user_name').html(sessionStorage.getItem('user'));
        $('#user_pseudo').html(sessionStorage.getItem('user'));
        $('#change_name').css('display', 'none');
        return false;
    });

    $('#home').click(function(){
        $('#loaded').load("home.html #home_page");
    });
});