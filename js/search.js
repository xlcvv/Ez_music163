let searchInput = document.querySelector( ".search-bar>input" )
let searchList = document.querySelector( ".search-list" )
searchHot()
getInfo()
searchInput.onfocus = function(){
    
    searchInput.onkeyup = function( e ){
        if( searchInput.value == "" ){
            showContainer( document.querySelector( ".search-def" ) )
            getInfo()

        }else{
            if( e.keyCode == 13 ){
                //回车
                showContainer( document.querySelector( ".search-res" ) )
                //离线存储以key:value存在
                // let arr = []
                // arr.push( searchInput.value )
                // JSON.stringify把对象或数组转成json格式的字符串

                /*从离线存储取数据
                    在这个数据上进行push
                */
                let arr = JSON.parse( localStorage.getItem( "singerName" ) ) || []
                if( !arr.includes( searchInput.value ) ){
                    arr.push( searchInput.value )
                    localStorage.setItem( "singerName", JSON.stringify(arr) )
                }
                
                console.log(arr[0])
                //发送搜索
                function getAlbum(){
                    return axios.get( `http://localhost:3000/search/multimatch?keywords=${searchInput.value}` )
                }
                function getSonglist(){
                    return axios.get( `http://localhost:3000/search?keywords=${searchInput.value}` )
                }
                axios.all( [ getAlbum(), getSonglist() ] )
                .then( axios.spread( (getAlbumInfo, getSonglistInfo)=>{
                    console.log(getAlbumInfo)//歌手信息
                    // data.data.result.artist.name 歌手名
                    //data.data.result.artist.picUrl 专辑图片
                    console.log(getSonglistInfo)//专辑信息
                    // data.data.result.album.name
                    // data.data.result.album.blurPicUrl
                    //歌曲列表
                    // data.data.result.songs.name//歌名
                    let albumBox = document.querySelector( ".search-res>ol" )
                    let songListBox = document.querySelector( ".search-res>ul" )
                    let albumStr = ``
                    let songListStr = ``

                    if( Object.keys( getAlbumInfo.data.result ) != 0  ){
                        albumStr +=
                        `
                        <li>
                            <img src="${getAlbumInfo.data.result.artist[0].picUrl}" alt="">
                            <p>${getAlbumInfo.data.result.artist[0].name}</p>
                        </li>
                        <li>
                            <img src="${getAlbumInfo.data.result.album[0].blurPicUrl}" alt="">
                            <p>${getAlbumInfo.data.result.album[0].name}</p>
                        </li>
                        `
                        albumBox.innerHTML = albumStr
                    }
                    if( Object.keys( getSonglistInfo.data.result ) != 0 ){
                        let songArr = getSonglistInfo.data.result.songs
                        for( i = 0; i < songArr.length; i ++ ){
                            songListStr +=
                            `
                            <a href="play.html?id=${getSonglistInfo.data.result.songs[i].id}">
                                    <li>
                                        <div class="play-icon"></div>
                            
                                        <div class="song-title-container">
                                            <div class="song-title">
                                                <p>${songArr[i].name}</p>
                                            </div>
                                        </div>
                                        <div class="singer">
                                            <span class="sqicon"></span> 
                                            ${songArr[i].artists[0].name}
                                            -${songArr[i].album.name}
                                        </div>      
                                    </li>
                                </a>
                            `
                        }
                        songListBox.innerHTML = songListStr
                        changeHeight( $( ".inner>.screen:nth-child(3)" ), $( ".content" ) )
                    }
                } ) )
            }else{
                showContainer( document.querySelector( ".search-rem" ) )
                // changeHeight( ".search-rem" ,".search-rem" )
                searchAdv()
            }
        }
    }
}

function searchHot(){
    fetch( "http://localhost:3000/search/hot", {
        method: "get",
        mode: "cors"
    })
    .then( function( data ){
        return data.json()
    } )
    .then( function( data ){
        // console.log(data.result.hots)
        let box = document.querySelector( ".search-hot" )
        let str = ``
        for( i = 0; i < data.result.hots.length; i ++ ){
            str += 
            `
            <span>
                ${data.result.hots[i].first}
            </span>
            `
        }
        box.innerHTML = str
    } )
}

function getInfo(){
    let arr = JSON.parse( localStorage.getItem( "singerName" ) ) || []
    let str = ``
    for( i = 0; i < arr.length; i ++ ){
        str +=
        `
        <li>
            <p>${arr[i]}</p>
            
            <img onclick = "deInfo(${i})" class="search-list-img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=">
        </li>
        `
    }
    searchList.innerHTML = str
}

function deInfo( x ){
    let arr = JSON.parse( localStorage.getItem( "singerName" ) ) || []
    arr.splice( x, 1 )
    localStorage.setItem( "singerName", JSON.stringify( arr ) )
    getInfo()
}

function searchAdv(){
    let searchBar = document.querySelector( ".search-bar>input" )
    let box = document.querySelector( ".search-rem>.search-list" )
    fetch( `http://localhost:3000/search/suggest?keywords=${searchBar.value}&type=mobile` )
    .then( function( data ){
        return data.json()
    } )
    .then( function( data ){
        console.log( data )
        let strAdv = ``
        for( i = 0; i < data.result.allMatch.length; i ++ ){
            strAdv +=
            `
                <li>${data.result.allMatch[i].keyword}</li>
            `
        }
        box.innerHTML = strAdv
    } )
}
