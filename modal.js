/**
* @fileoverview モーダルウィンドウみたいなダイアログ関係
* @author Namai
*/

var modal = document.getElementById('modal_tab_edit_delete');
var modal_group = document.getElementById('modal_group');

window.addEventListener('touchend', function(e) {//背景がタッチされたらモーダルウィンドウを非表示にする
  if (e.target == modal) {//tabの名前の編集と削除のモーダルを非表示
    IslayPub.modal.hide();
  }
  else if( e.target == modal_group){//グループ画面のモーダルを非表示
    IslayPub.modal.hide_modal_group();
  }
});

IslayPub.modal = new function(){
  /**
  * ダイアログを隠す
  */
  this.hide = function(){
    document.getElementById("modal_tab_edit_delete").style.display="none";//タブの名前の編集と削除のモーダルを非表示
    console.log("in modal.hide()");
  }

  this.hide_modal_group = function(){
    document.getElementById("modal_group").style.display="none";//グループ画面を非表示
    console.log("in modal.hide_modal_group()");
  }
}
