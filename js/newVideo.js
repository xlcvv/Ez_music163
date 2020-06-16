fetch("http://localhost:3000/mv/first?limit=20", {
    // method: get 获取 post 上传 delete 删除 update 修改
    method:"get",
    mode:"cors",        //cors no-cors   接口 域名地址， 网络协议一样就不构成跨域   

})
.then( function( data ){
    return data.json()
} )
.then( function( data ){
    // console.log( data )
    var str = new Array()//MV信息
    let str2 = ``
    let arr = 0 // MV信息数组下标
    let box = document.querySelector( ".video" )
    for( i = 0; i < data.data.length; i++ ){
        // console.log( data.data[i] )
        str[i] = data.data[i].name + "  |  author：" + data.data[i].artistName

        fetch("http://localhost:3000/mv/url?id=" + data.data[i].id,{
            method:"get",
            mode:"cors",
        })
        .then( function( data2 ){
            return data2.json()
        } )
        .then( function( data2 ){
            // console.log("哈哈哈哈哈哈哈"+ data )
            // console.log(str)

            // console.log( data2 )
            str2 +=
            `
            <div class="videoName">
            <p>${str[arr++]}</p>
            </div>
            <video src=${data2.data.url} controls="controls"></video>
            `
            let box2 = document.querySelector( ".video" )
            box2.innerHTML = str2
        } )
    }
    // console.log( str2 )
    // let box = document.querySelector( ".newVideo>ul" )
    // box.innerHTML = str 

    
} )