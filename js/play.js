// 接收上一个页面的id值

//然后根据这个id值去加载歌曲，进行播放
// console.log( location.search )
//location.search是上一个页面传递过来的id值

// fetch( "http://localhost:3000/song/url" + location.search, {
//     method:"get",
//     mode:"cors"
// } )
// .then( function( data ){
//     return data.json()
// } )
// .then( function( data ){
//     console.log( data.data[0].url )
//     let box = document.querySelector( ".music" )
//     box.innerHTML = `<audio src="${data.data[0].url}" controls></audio>`
// } )

// axios( {
//     method: 'get',
//     url: 'http://localhost:3000/song/url' + location.search,
//     responseType:'stream'
// } )
// .then( function( data ){
//     console.log( data )
// } )
//使用axios同时获取三个数据信息
// 1、获取音乐地址
function getMusicUrl(){
    return axios.get( "http://localhost:3000/song/url" + location.search )
}
// 2、获取专辑图
function getAlbum(){
    return axios.get( "http://localhost:3000/song/detail?ids=" + location.search.slice(4) )
}
//3、获取歌词
function getLyric(){
    return axios.get( "http://localhost:3000/lyric" + location.search )
}

axios.all( [ getMusicUrl(), getAlbum(), getLyric() ] )
    .then( axios.spread( function( musicUrl, album, lyric ){
        console.log( musicUrl.data.data[0].url )//歌曲地址
        console.log( album.data.songs[0].name )//歌名
        console.log( album.data.songs[0].al.picUrl )//专辑图
        // console.log( lyric.data.lrc.lyric )//歌词

        var str = ''
        lyricText = lyric.data.lrc.lyric
        for( i = 0; i < lyricText.length; i++ ){
            if( lyricText[i] == '[' ){
                
                while( 1 ){
                    if( lyricText[i] == ']' && lyricText[i + 1] != '[' )
                        break;
                    i ++;
                }
                i ++;
                if( i > 11 )
                str = str + '<br>'
            }
            str = str + lyricText[i]
        }

        // let musicbox = document.querySelector( '.music>audio' )//音乐
        let musicbox = document.querySelector( '#audio' )
        let lyricboxh2 = document.querySelector( '.song-lyric>h2' )//歌词
        let lyricboxp = document.querySelector( '.lyricscroll>p' )//歌词
        let albumbox = document.querySelector( '.bg>img' )//模糊背景
        let albumCirclebox = document.querySelector( '.song-img>img' )//圆形专辑图
        let disc = document.querySelector( ".disc" )
        let lyricscroll = document.querySelector( ".lyricscroll" )
        let rangeBar = document.querySelector( "#range" )
        /*背景*/ 
        albumCirclebox.setAttribute( "src", album.data.songs[0].al.picUrl )
        albumbox.setAttribute( "src", album.data.songs[0].al.picUrl )
        /*音乐*/
        musicbox.setAttribute( "src", musicUrl.data.data[0].url )
        /*点击播放效果*/
        disc.addEventListener( "click", isPlay )
        let lyricTxt = new window.Lyric( lyric.data.lrc.lyric, function(obj){
            console.log(obj)
            lyricboxp.innerHTML = obj.txt + "<br>"
            // lyricscroll.scrollTop = lyricscroll.scrollHeight
        } )
        function isPlay(){
            console.log( "already play" )
            if( musicbox.paused ){
                musicbox.play()
                disc.classList.remove( "paused" )
                disc.classList.add( "playing" )
                lyricTxt.togglePlay()
            }else{
                musicbox.pause()
                disc.classList.remove( "playing" )
                disc.classList.add( "paused" )
                lyricTxt.togglePlay()

            }
        }
    

        lyricboxh2.innerHTML = album.data.songs[0].name
        
      
        //进度条当前位置
        musicbox.onloadedmetadata = function(){
            //进度条当前位置
            musicbox.ontimeupdate = function(){
                rangeBar.value = musicbox.currentTime * 100 / musicbox.duration
            }
            //进度条拖动效果
           rangeBar.oninput = function(){
               musicbox.currentTime = rangeBar.value * musicbox.duration / 100
                lyricTxt.seek( musicbox.currentTime * 1000 ) 
            } 
        }

    } ) )

    // function getMusicUrl(){
    //     return axios.get( "http://localhost:3000/mv/url?id=" + location.search )
    // }
    // axios.all( [ getMusicUrl()] )
    // .then( axios.spread( function( musicUrl ){
        
    // }