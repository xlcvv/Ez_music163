function showContainer( obj ){
    let box = document.querySelector( ".search-container" )
    let child = box.children
    for( i = 0; i < child.length; i ++ ){
        //遍历子节点，让三个盒子都隐藏
        child[i].style.display = "none"
    }
    obj.style.display = "block"
}