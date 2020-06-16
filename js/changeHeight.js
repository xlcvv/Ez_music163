let tabBtn = document.querySelectorAll( ".tab>label" )
let screen = document.querySelectorAll( ".inner>.screen" )
// screen[0].parentNode.parentNode.style.height = screen[0].offsetHeight + "px"
for( let i = 0; i < tabBtn.length; i ++ ){
    tabBtn[i].onclick = function(){
        changeHeight(screen[i], screen[i].parentNode.parentNode)
    }
}
function changeHeight( obj, target ){
    //obj是获取高度的对象
    //target是控制对象
    target.style.height = obj.offsetHeight + "px"
}