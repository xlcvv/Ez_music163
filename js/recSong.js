// fetch(地址, 配置)
//花括号是对象, 以key value 形式存在例如 {name："xlcvv"}
fetch("http://localhost:3000/personalized/", {
    // method: get 获取 post 上传 delete 删除 update 修改
    method:"get",
    mode:"cors",        //cors no-cors   接口 域名地址， 网络协议一样就不构成跨域   

})
.then( function( data ){
    // console.log( data )
    // console.log( data ) data是数据流 第一步做数据转换 then 都是 function
    return data.json()
} )
.then( function( data ){        //数据接收和呈现
    //data.result 是最新歌单的数据
  //  console.log( data.result )
    // console.log( user() )
    // data.result是一个数组，我们只需要前面留个数据slice切割数组  包前不包后
    data.result.slice(0, 6) //切割之后就是前面六位的数组
    // console.log( data.result.slice(0, 6) )
    let box = document.querySelector( "#rec-song-group" )
    let str = ``
    // box.innerHTML //在盒子中插入内容,可以插入形如<p></p>样式，或者字符串
    for( i = 0; i < data.result.slice(0, 6).length; i ++ )
    {
        str += 
        `<li>
            <a href="recMusic.html?id=${data.result[i].id}">
            <img src="${ data.result[i].picUrl }" alt="">
            <p>${ data.result[i].name }</p> 
            </a>
         </li>`
         //在模板字符串``里面的变量不能直接写，  否则会被当成字符串处理,变量必须加${}
    }
    box.innerHTML = str
    // changeHeight( $( ".inner>.screen:nth-child(1)" ), $( ".newSong" ) )
} )


//如何获取网页页面上的盒子
// document.querySelector document指的是网页  querySelector查找
// querySelector只会找到页面中符合要求的第一个元素
//如果找到所有符合要求元素，用 querySelectorAll 获取到的结果是一个数组
