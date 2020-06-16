fetch("http://localhost:3000/top/list?idx=1", {
    method:"get",
    mode:"cors"
})

.then( function( data ){
    return data.json()
} )

.then( function( data ){
    // console.log( data.playlist.tracks )
    let str = ``//定义一个空的字符串  用来接收html模板
    for( i = 0; i < data.playlist.tracks.length; i++ ){
        iStr = ""
        numStr = ""
        let des = data.playlist.tracks[i].alia[0] || ""
        /*个位数数字变成两位*/
        if( i < 9 ){
            iStr = "0" + ( i + 1 )
        }else{
            iStr = i + 1
        }
        /**/
        /*前三变颜色*/
        if( i < 3 ){
            numStr = '<div id="number">'+ iStr + '</div>'
        }else{
            numStr = '<div id="number2">'+ iStr + '</div>'
        }
        /* */
        str +=
        `
        <div class="ull">
        ${numStr}
    <a href="play.html?id=${data.playlist.tracks[i].id}">
        <li>
        <div>
            <div class="play-icon"></div>
            <div class="song-title-container">
                <div class="song-title">
                    <p>${data.playlist.tracks[i].name}</p>
                </div>

                <div class="song-des">
                    <p>${des}</p>
                </div>
            </div>

            <div class="singer">
                <span class="sqicon"></span> 
                ${data.playlist.tracks[i].ar[0].name}
                            -${data.playlist.tracks[i].al.name}
            </div>
            </div>
        </li>
    </a>
    </div>
        `
    }
    let box = document.querySelector( ".hotSong>ul" )
    box.innerHTML = str 
} )