
//index界面的登陆按钮

var loginBtn = document.getElementById( "login" )
fetch( "http://localhost:3000/login/status", {
        method:"get",
        mode:"cors", 
        credentials: "include"
    } )
.then( function( data2 ){
    status = data2.status       //登陆状态码
    console.log( status )
    if( status == 200 ){        //登陆成功
        document.getElementById( "login_p" ).innerText = "退出登陆"
        loginBtn.onclick = function(){
            fetch( "http://localhost:3000/logout", {
            method:"get",
            mode:"cors",        
            credentials: "include"
            } )
            .then( function( data ){
                console.log( "logout成功" )
                alert( "可能是API的问题，退出登陆要几分钟后才成功" )
            } )
        }
    }else{          //尚未登陆
        document.getElementById( "login_p" ).innerText = "登陆"
        loginBtn.onclick = function(){
            window.location.href = "../html/login.html"
        }
    }
} )
