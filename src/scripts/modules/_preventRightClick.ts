declare var $: any;

export default function rightClickDisabled() {
    // 右クリック禁止
    $(document).bind("contextmenu",function(e){
        return false;
    });
}