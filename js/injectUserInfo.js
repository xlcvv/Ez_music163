// //用户的头像和昵称

fetch( "http://localhost:3000/login/status", {
        method:"get",
        mode:"cors", 
        credentials: "include"
    } )
.then( function(data2){
    return data2.json()
} )
.then( function( data2 ){
    console.log(data2);
    if(data2.code == 200){
        let userImgBox = document.querySelector( ".userimg" )
        let userNameBox = document.querySelector( ".comment-user>p" )
        let indexUserImgBox = document.querySelector( ".indexAvatar" )
        let userImg = 
        `
        <img src="${data2.profile.avatarUrl}" alt="">
        `
        let userName = 
        `
        ${data2.profile.nickname}
        `
        //判断地址栏是否是recMusic.html
        let urlStr = window.location.pathname
        if( urlStr == '/html/recMusic.html' ){
            userImgBox.innerHTML = userImg
            userNameBox.innerHTML = userName
        }else if( urlStr == '/html/index.html' )
            indexUserImgBox.innerHTML = userImg
    }
} )

// function recDetailUserInfo(){
    //     return axios.get( "http://localhost:3000/login/status" )
    // }
    
    // axios.all( [ recDetailUserInfo()] )
    //     .then( axios.spread( function( recDetailUserInfo ){
    //         console.log( recDetailUserInfo );
            
    //         let userImgBox = document.querySelector( ".userimg" )
    //         let userNameBox = document.querySelector( ".comment-user>p" )
    //         let indexUserImgBox = document.querySelector( ".indexAvatar" )
    //         let userImg = 
    //         `
    //         <img src="${recDetailUserInfo.data.profile.avatarUrl}" alt="">
    //         `
    //         let userName = 
    //         `
    //         ${recDetailUserInfo.data.profile.nickname}
    //         `
    //         //判断地址栏是否是recMusic.html
    //         let urlStr = window.location.pathname
    //         if( urlStr == '/html/recMusic.html' ){
    //             userImgBox.innerHTML = userImg
    //             userNameBox.innerHTML = userName
    //         }else if( urlStr == '/html/index.html' )
    //             indexUserImgBox.innerHTML = userImg
            
    // } ) )