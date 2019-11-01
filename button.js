/**
* @fileoverview 「状態」関係の処理の為の関数があるよ
* @author Namai
*/
/*
**
* ボタン関係のメソッドの集まり
* @namespace
*/
IslayPub.button = new function(){
	/**
	* 値を1マイナスする
	* @param {Element} ele //マイナスしたい要素のID名
	*/
	this.minus = function(ele_id){
    val = document.getElementById(ele_id);
    val.value--;
    console.log(val.value);
	}

  /**
  * 値を1プラスする
  * @param {Element} ele //プラスしたい要素のID名
  */
	this.plus = function(ele_id){
    val = document.getElementById(ele_id);
    val.value++;
    console.log(val.value);
	}
}
