var status
fetch("http://localhost:3000/personalized/newsong", {
    method:"get",
    mode:"cors"
})

.then( function( data ){
    return data.json()
} )

.then( function( data ){
    // console.log(data)
    // console.log( data.result )
    // data.result是10个最新歌曲的数组
    // data.result[0].name   //歌曲名
    // data.result[0].song.alias[0] // 副标题
    // data.result[0].song.artists[0].name //歌手名字
    // data.result[0].song.album.name //专辑
    
    let str = ``//定义一个空的字符串  用来接收html模板
    for( i = 0; i < data.result.length; i++ ){
        let des = data.result[i].song.alias[0] || ""
        str +=
        `
        <a href="play.html?id=${data.result[i].id}">
        <li>
            <div class="play-icon"></div>

            <div class="song-title-container">
                <div class="song-title">
                    <p>${data.result[i].name}</p>
                </div>

                <div class="song-des">
                    <p>${des}</p>
                </div>
            </div>

            <div class="singer">
                <span class="sqicon"></span> 
                ${data.result[i].song.artists[0].name}
                -${data.result[i].song.album.name}
            </div>
            
        </li>
    </a>
        `
    }
    let box = document.querySelector( ".newSong>ul" )
    box.innerHTML = str 
} )