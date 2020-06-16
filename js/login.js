var username
var pwd
    function user() {
        username = document.getElementById("user").value
        return username
    }


    function login1(){   //登陆按钮的点击事件
        username = document.getElementById("user").value
        pwd = document.getElementById("pwd").value
        login()
    }

// login()
function login(){
    fetch( "http://localhost:3000/login/cellphone?phone=" + username + "&password=" + pwd, {
        method:"post",
        mode:"cors", 
        credentials: "include"
    } )
    .then( function( data ){
        console.log( "手机号登陆：" )
        console.log( data )
        console.log( data.json() )
        
        if( data.status == 200 ){
            status()
            alert( "登陆成功" )
            window.location.href="index.html";

        }
        else
            alert( "登陆失败" )
    } )
}
//API状态码
function status(){
    fetch( "http://localhost:3000/login/status", {
        method:"get",
        mode:"cors", 
        credentials: "include"
    } )
    .then( function( data2 ){
        console.log( "登陆状态：" )
        console.log(  data2.status )
    } )
}
