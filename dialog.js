/**
* @fileoverview 「ダイアログ」関係の処理の為の関数があるよ
* @author 鈴木一臣
*/

/**
* ダイアログ関係のメソッドの集まり
* @namespace
*/
IslayPub.dialog = new function(){
	/**
	* ダイアログを出す
	* @param inner_html この文字列がダイアログの中身となる
	* @return {element} 開かれたダイアログの要素
	*/
	/*
	this.open = function(inner_html){
		//背景要素の作成
		var background = document.createElement('div');
		background.setAttribute('class', 'dialog_background');
		background.setAttribute('onclick', 'if(event.target == this)IslayPub.dialog.close();');
		background.setAttribute('ontouchend', 'if(event.target == this)IslayPub.dialog.close();');//この機能をどこかに追加する

		document.getElementsByTagName('body')[0].appendChild(background);

		//初期化
		var d = document.createElement('div');
		d.setAttribute("class", "dialog");
		d.innerHTML = "<div onmousedown='IslayPub.dialog.move_start();' class='dialog_header'></div>";
		d.onmousedown='IslayPub.dialog.move_start();';
		d.innerHTML += inner_html;

		background.appendChild(d);

		this.move_center(d);

		return d;
	}*/

	/**
	* ダイアログを出す
	* @param inner_html この文字列がダイアログの中身となる
	* @param flag dialog_backgroundを作るかの判定　undefinedでモーダルウィンドウ、DIALOG_FLAGで普通のダイアログ、PLAY_FLAGで「うごかす」ボタンを押したとき
	* @return {element} 開かれたダイアログの要素
	*/

	this.open = function(inner_html,flag){
		//背景要素の作成
		//alert("flag:"+flag)
		if(flag===undefined){
			var background = document.createElement('div');
			background.setAttribute('class', 'dialog_background');
			background.setAttribute('ontouchend', 'if(event.target == this)IslayPub.dialog.close();');
			document.getElementsByTagName('body')[0].appendChild(background);
		}

		//初期化
		var d = document.createElement('div');
		d.setAttribute("class", "dialog");
		d.innerHTML = "<div onmousedown='IslayPub.dialog.move_start();' class='dialog_header'></div>";
		//d.touchend = "";
		//d.addEventListener('touchend' , function(e){} , false);
		//d.onmousedown='IslayPub.dialog.move_start();';
		d.innerHTML += inner_html;

		if(flag===undefined){
			background.appendChild(d);
			console.log("move_center"+d);
			this.move_center(d);
		}
		else if(flag===DIALOG_FLAG){
			document.getElementsByTagName('body')[0].appendChild(d);
			this.move_bottom(d);
		}

		return d;
	}

	/**
	* 指定した要素を中央寄せする。
	* @param d 中央寄せしたい要素のDOM element
	*/
	this.move_center = function(d){//中央に配置
		d.style.top = ((document.getElementsByTagName('body')[0].clientHeight - d.clientHeight) / 2)+ "px";
		d.style.left = ((document.getElementsByTagName('body')[0].clientWidth - d.clientWidth) / 2) + "px";
		//d.style.top = document.getElementsByTagName('body')[0].clientHeight + "px";
		//d.style.left = (document.getElementsByTagName('body')[0].clientWidth - 200) + "px";
	}

	/**
	* 指定した要素を中央下寄せする。
	* @param d 中央下寄せしたい要素のDOM element
	*/
	this.move_bottom = function(d){//中央下に配置
		d.style.top = (document.getElementsByTagName('body')[0].clientHeight - d.clientHeight - 80) + "px";
		d.style.left = ((document.getElementsByTagName('body')[0].clientWidth - d.clientWidth) / 2) + "px";
	}

	/** 現在アクティブなモーダルウィンドウのダイアログを取得する
	* @return 現在アクティブなダイアログのDOM element
	*/
	this.get_active_dialog_background = function(){
		var db = document.getElementsByClassName("dialog_background");
		return db[db.length - 1];
	}

	/** 現在アクティブなウィンドウのダイアログを取得する
	* @return 現在アクティブなダイアログのDOM element
	*/
	this.get_active_dialog = function(){
		var db = document.getElementsByClassName("dialog");
		if(db !== undefined){
			return db[db.length - 1];
		}
	}


	/**
	* 一番手前のダイアロングを消す。この時、ダイアログの中にボタン(button[name="onclosedialog"])があった場合、それをclickする。
	* @param flag undefinedでモーダルウィンドウ、DIALOG_FLAGで普通のダイアログの判定
	*/
	this.close = function(flag){
		/*function triggerEvent(element, event) {
		   if (document.createEvent) {
		       // IE以外
		       var evt = document.createEvent("HTMLEvents");
		       evt.initEvent(event, true, true ); // event type, bubbling, cancelable
		       return element.dispatchEvent(evt);
		   } else {
		       // IE
		       var evt = document.createEventObject();
		       return element.fireEvent("on"+event, evt)
		   }
		}*/

		if(flag===undefined){
			var dialog = this.get_active_dialog_background();
		}
		else if(flag===DIALOG_FLAG){
				var dialog = this.get_active_dialog();
		}
		if(dialog){
			var a = dialog.querySelector('button[name="onclosedialog"]');
			if(a)a.click();
			//triggerEvent(a, 'touchend');
			dialog.parentNode.removeChild(dialog);
		}
	}

	/** ダイアログの移動を開始する */
	this.move_start = function(){
		var db = this.get_active_dialog_background();
		var d = db.childNodes[0];

		db.onmousemove = function(){
			if(event.buttons != 1){//ドラッグが終わっていた場合
				this.onmousemove = null;
				return;
			}

			var d = IslayPub.dialog.get_active_dialog_background().childNodes[0];

			d.style.left = IslayPub.dialog.move_start_x + event.clientX + "px";
			d.style.top = IslayPub.dialog.move_start_y + event.clientY + "px";
		}

		this.move_start_x = parseInt(d.style.left) - event.clientX;
		this.move_start_y = parseInt(d.style.top) - event.clientY;
	}
}
