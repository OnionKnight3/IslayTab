/**
* @fileoverview 「グループ」関係の処理の為の関数があるよ
* @author 鈴木一臣
*/

/**
* 編集におけるグループ関係のメソッドの集まり
* @namespace
*/
IslayPub.group = new function(){
	/**
	* グループタブの情報が入る。タブのidが添字となる。
	* @type {Array}
	*/

	this.list = new Array();

	/**
	* グループタブ関係のメソッドの集まり
	* @namespace
	*/
	this.tab = new function(){
		/**
		* 新しいクループタブを生成する
		* @param init_id これで生成するタブのIDを指定できる。
		* @param init_name これで生成するタブの名前を指定できる。
		* @return {element} 作ったタブ
		*/
		this.create = function(init_id, init_name){
			//decide id
			var count = 0;
			if(typeof init_id !== "undefined"){
				count = init_id;
			}else{
				while(count < 10000){//10000:万一予防な
					if(!document.getElementById('group_tab_'+count))break;
					count++;
				}
			}

			//create tab
			IslayPub.group.list[count] = new Array();
			var group_tab = document.createElement('div');
			group_tab.setAttribute('id', 'group_tab_'+count);
			group_tab.setAttribute('style', 'background-color:rgba('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+',0.7)');
			group_tab.setAttribute('class', 'group_tab');
			group_tab.setAttribute('name', 'group_tab');
			group_tab.setAttribute('ontouchstart','start_timer(this,GROUP_FLAG);');
			group_tab.onclick = function(){//ontouchend→onclick ontouchendだとグループの中身と、タブの名前の編集と削除のモーダルが同時に出てしまう

				reset_timer();//長押しのタイマーリセット
				var group_list = document.createElement("div");
				group_list.classList.add("group_members");
				var list_id = this.id.substr("group_tab_".length);
				group_list.dataset.list_id = list_id;
				var list = IslayPub.group.list[list_id];
				console.log("list:"+list);
				list.forEach(function(s){
					var ele = document.getElementById("maru_" + s[0]);
					console.log("ele:"+ele);//nullのときの処理の変更が必須
					if(ele == null){
						return;
					}
					var clone = ele.cloneNode(true);
					//var clone = document.getElementById("maru_" + s[0]).cloneNode(true);
					console.log(clone);
					clone.removeAttribute("id");//ここでid消えてる
					clone.dataset.z_index = s[1];
					clone.setAttribute("ontouchstart", "event.stopPropagation();");//これがないとgroupのじょうたいをタッチするとcloneが増える
					clone.setAttribute("ontouchend", "event.stopPropagation();");//onmousedown→ontouchend
					clone.removeAttribute("style");
					while(clone.querySelector("svg")){
						clone.querySelector("svg").parentNode.removeChild(clone.querySelector("svg"));
					}
					clone.setAttribute("onmouseover", "IslayPub.character.maru.pop_tooltip()");
					var d = function(){
						var target = event.target.parentNode;
						var position = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
						console.log(target.parentNode);
						console.log(target.parentNode.childNodes);
						//console.log(target);
						//console.log("position:" + position);
						IslayPub.group.remove(target.parentNode.dataset.list_id, position);
						target.parentNode.removeChild(target);
					}
					var f = function(){
						var target = event.target.parentNode;
						var position = Array.prototype.indexOf.call(target.parentNode.childNodes, target);
						if(event.target.value < MIN_Z_INDEX || MAX_Z_INDEX < event.target.value){
							event.target.value = target.dataset.z_index;
							return;
						}
						IslayPub.undo_redo.add_history(["change_group_member_z_index", target.parentNode.dataset.list_id, position, target.dataset.z_index, event.target.value]);
						target.dataset.z_index = event.target.value;
						IslayPub.group.list[target.parentNode.dataset.list_id][position][1] = event.target.value;
					}
					clone.innerHTML += "<img src='img/close_button.png' class='close_button' ontouchend='("+d+")()'>"+
						"<input title='"+IslayPub.language.description_z_index[lang]+"' type='number' class='z_index_input' max=10000 min=0 value="+s[1]+" onchange='("+f+")()'>";
					group_list.appendChild(clone);
				});
				IslayPub.dialog.open(group_list.outerHTML).innerHTML += "<button ontouchend='IslayPub.dialog.close()'>"+IslayPub.language.close_button[lang]+"</button>";
				/*else{
					window.onmousemove = (function(a){return function(){IslayPub.group.tab.move(a)}})(this);
				}*/
			}//end of function

			group_tab.innerHTML += "<span name='group_tab_name' title='" + (init_name || (IslayPub.language.group[lang] + count)) + "'>" + (init_name || (IslayPub.language.group[lang] + count)) + '</span>' ;

				/*"<span name='group_tab_name' title='" + (init_name || (IslayPub.language.group[lang] + count)) + "'>" + (init_name || (IslayPub.language.group[lang] + count)) + '</span>' +
				"<img title='"+IslayPub.language.rename[lang]+"' class='group_tab_rename_button' src='./img/pen.png' ontouchend='IslayPub.group.tab.rename(this.parentNode.id.substr(\"group_tab_\".length));event.preventDefault();'>" +
				"<img title='"+IslayPub.language.remove_tab[lang]+"' src='img/close_button.png' class='close_button' ontouchend='IslayPub.group.tab.remove(this.parentNode.id.substr(\"group_tab_\".length));event.preventDefault();'>";
				*/

			document.getElementById('group_tabs').insertBefore(group_tab, document.getElementById("add_group_tab_button"));

			IslayPub.undo_redo.add_history(["create_group", count]);

			return group_tab;
		}

		/**
		*グループのモーダルウィンドウを表示する
		*/
		this.display = function(){
			IslayPub.dialog.close(DIALOG_FLAG);//ダイアログを閉じる
			document.getElementById("modal_group").style.display="block";

			/*チャラクターとじょうたいの選択肢を表示*/
			var target2 = document.getElementById('display_maru');
			var target3 = document.getElementById('display_character');
			var character2 = document.getElementsByName('character_tab');
			var a = "<select id='display_maru_character' onchange='IslayPub.group.selecter_updata(this,document.getElementById(\"display_maru_state\"));IslayPub.group.tab.maru_update();'>";

			for(var s = 0; s < character2.length; s++){
				a += "<option value='" + character2[s].id.substr('character_tab_'.length) + "'>" + character2[s].querySelector("[name='character_tab_name']").textContent + "</option>";
			}
			//target2.innerHTML = a + "</select><select id='display_maru_state' onchange='IslayPub.group.tab.maru_update();'></select>";
			target2.innerHTML = a + "</select>";
			target3.innerHTML = "<select id='display_maru_state' onchange='IslayPub.group.tab.maru_update();'></select>";
			IslayPub.group.selecter_updata(document.getElementById('display_maru_character'),document.getElementById('display_maru_state'));
			IslayPub.group.tab.maru_update();
			//target2.setAttribute("style","display:block");//画像の設定
		}

		/**
		*「じょうたい」の更新をする
		*/
		this.maru_update = function(){
			var character_num = document.getElementById('display_maru_character').options[document.getElementById('display_maru_character').selectedIndex].value;
			var maru_num = document.getElementById('display_maru_state').options[document.getElementById('display_maru_state').selectedIndex].value;
			var canvas = document.getElementById("canvas_"+character_num);//選択されているキャンバスのDOMを取得する

			var maru = canvas.querySelector("#maru_"+maru_num);//選択されている「じょうたい」のDOMを取得する
			//console.log(maru);
			if(maru !== null){
				var chil = maru.children;//子要素
				//console.log(chil);//子要素
				//console.log(chil[0].currentSrc);//エンコードされた文字列
				//console.log(chil[1].innerText);//「じょうたい」名

				var maru_detail = document.getElementById('maru_detail');
				maru_detail.setAttribute("name","maru_" + maru_num);//「じょうたい」のIDをidではなく、nameに設定　グループ追加で使う
				maru_detail.innerHTML =
				"<img src='" +　chil[0].currentSrc + "' width=55 height=55 alt='' class='maru_img' draggable=false ondragstart='return false;'ontouchstart='IslayPub.group.tab.touch_start(maru_detail,event);'>" +//画像の埋め込み
				"<span class='maru_name' name='maru_name'>" + chil[1].innerText + "</span>";//「じょうたい」名の埋め込み
			}
			else{//選択されているキャラクタに「じょうたい」がなかったら
					alert(IslayPub.language.alert20[lang]);
			}
		}

		/**
		* グループに追加する「じょうたい」がタッチされたらの処理
		* @param maru_detail タッチされた「状態」の要素
		* @param event
		*/
		this.touch_start = function(maru_detail,event){
			//console.log(maru_detail);
			var clone = maru_detail.cloneNode(true);
			console.log(clone);
			clone.setAttribute("ontouchstart", "event.stopPropagation();");
			clone.classList.add("adding_group");
			//maru_detail.parentNode.appendChild(clone);
			var test1 = document.getElementById("test1");
			test1.appendChild(clone);
			console.log(maru_detail.parentNode);
			var s = function(event){////////////////////////
				//console.log("in s function");
				//console.log(event.changedTouches[0].pageX+":"+event.changedTouches[0].pageY);
				var rect = maru_detail.parentNode.getBoundingClientRect();
				var x = event.changedTouches[0].pageX-rect.left-MARU_RAD/2;
				var y = event.changedTouches[0].pageY-rect.top-MARU_RAD/2;
				//console.log(x+":"+y);
				clone.setAttribute('style', 'top:'+y+'px;left:'+x+'px;');
			//	maru_detail.setAttribute('style', 'top:'+y+'px;left:'+x+'px;');
				//グループタブにマウスが乗ったらタブを動かして、そのタブが選ばれている事を視覚的に示す。
				var a = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
				if(a.parentNode.getAttribute("name") == "group_tab"){
					a = a.parentNode;
				}
				if(document.querySelector(".hovered_group_tab"))
					document.querySelector(".hovered_group_tab").classList.remove("hovered_group_tab");
				/*if(a.getAttribute("name") == "group_tab" && event.buttons == 1){
					a.classList.add("hovered_group_tab");
				}*/

				if(a.getAttribute("name") == "group_tab"){
					a.classList.add("hovered_group_tab");
				}

				touch_end = function(event){
					var id = maru_detail.getAttribute("name");//var id = clone.name;じゃ取得できない
					//console.log("id:"+id);
					clone.parentNode.removeChild(clone);
					window.ontouchmove = event.stopPropagation();
					window.ontouchend = event.stopPropagation();
					var g = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);

					console.log(g);//<div id="group_tab_0" </div> が正解らしい
					//console.log(g.parentNode.getAttribute('name'));//nullだって

					if(g.parentNode.getAttribute("name") == "group_tab"){
						console.log(g.parentNode.getAttribute('name'));
						g = g.parentNode;
					}else if(g.getAttribute("name") != "group_tab"){
						console.log(g.getAttribute('name'));
						return;
					}
					IslayPub.group.add(g.id.substr('group_tab_'.length), id.substr('maru_'.length));
					alert(IslayPub.language.alert15[lang](clone.querySelector("[name='maru_name']").textContent, g.querySelector("[name='group_tab_name']").textContent));
					//console.log("aaaaa");
				}
				/*this.touch_end = function(){
					alert("ok");
					//console.log("aaaaa");
				}*/
				/*
				if(event.buttons != 1){//clone setAttribute(ontouchend)でできるのでは？
					var id = clone.id;
					clone.parentNode.removeChild(clone);
					window.onmousemove = event.stopPropagation();
					//var g = document.elementFromPoint(event.clientX, event.clientY);
					var g = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
					if(g.parentNode.getAttribute("name") == "group_tab"){
						g = g.parentNode;
					}else if(g.getAttribute("name") != "group_tab"){
						return;
					}
					IslayPub.group.add(g.id.substr('group_tab_'.length), id.substr('maru_'.length));
					alert(IslayPub.language.alert15[lang](clone.querySelector("[name='maru_name']").textContent, g.querySelector("[name='group_tab_name']").textContent));
				}*/
			};//end of s()
			s(event);
			//window.onmousemove = s;
			window.ontouchmove = s;
			window.ontouchend = touch_end;
		}

		/**
		* グループタブの順番を変える事が出来る
		* @param tab 対象となるタブのDOM element
		*/
		this.move = function(tab){
			var rect = document.body.getBoundingClientRect();
			if(event.buttons != 1 || event.clientX < rect.left || rect.right < event.clientX || event.clientY < rect.top || rect.bottom < event.clientY){//ドラッグが終わっていた、もしくはwindowの外にでていた場合
				window.onmousemove = null;
				if(this.old_position !== this.new_position)
					IslayPub.undo_redo.add_history(["group_move", this.old_position, this.new_position]);
				delete this.old_position;
				delete this.new_position;
				return;
			}

			if(typeof this.old_position === "undefined"){
				this.old_position = tab.parentNode.childNodes.search_key_from_value(tab);
				this.new_position = this.old_position;
			}

			var t = document.elementFromPoint(event.clientX, event.clientY);
			if(t.getAttribute("name") != "group_tab"){
				t = t.parentNode;
				if(t.getAttribute("name") != "group_tab")
					return;
			}
			if(tab === t)//自分自身をマウスオーバしている時は何もしない
				return;
			var pos = t.nextElementSibling;
			if(pos){
				if(pos == tab){
					tab.parentNode.insertBefore(tab, t);
				}else{
					tab.parentNode.insertBefore(tab, pos);
				}
			}else{
				tab.parentNode.appendChild(tab);
			}
			this.new_position = tab.parentNode.childNodes.search_key_from_value(tab);
		}

		/**
		* グループタブを削除する。
		* @param id 削除したいグループタブのID
		*/
		this.remove = function(id){
			if(id == 0){//mainグループは削除できない
				alert(IslayPub.language.alert11[lang]);
				return;
			}
			var tab = document.getElementById("group_tab_" + id);

			IslayPub.undo_redo.add_history(["bundle", "start"]);
			while(IslayPub.group.remove(id, 0));
			var action2_makegroup = document.querySelectorAll("div[action2='makegroup:" + id + "']");
			Array.prototype.forEach.call(action2_makegroup, function(a){
				IslayPub.undo_redo.add_history(["change_action", a.id.substr('maru_'.length), {"action2":{"before":a.getAttribute("action2"), "after":"none"}}]);
				a.setAttribute("action2","none");
			});
			IslayPub.undo_redo.add_history(["remove_group", id, tab.querySelector("[name = 'group_tab_name']").textContent, document.getElementById("group_tabs").childNodes.search_key_from_value(tab)]);
			IslayPub.undo_redo.add_history(["bundle", "end"]);

			tab.parentNode.removeChild(tab);
			IslayPub.group.list.splice(id, 1);
		}

		/**
		* グループタブの名前を変更する
		* @param id 変更したいグループタブのID
		* @param new_name 新しい名前。
		*/
		this.rename = function(id, new_name){
			if(id == 0){//mainグループの名前は変更できない
				alert(IslayPub.language.alert12[lang]);
				return;
			}
			var tab = document.getElementById("group_tab_" + id);
			var name_element = tab.querySelector("[name = 'group_tab_name']");
			if(typeof new_name === "undefined"){
				var new_name = prompt(IslayPub.language.alert13[lang] + " " + name_element.textContent,'');
			}
			if(new_name && (new_name = new_name.replace(/(^\s+)|(\s+$)/g, ""))/*前後の空白を取り除く*/){
				IslayPub.undo_redo.add_history(["group_rename", id, name_element.textContent, new_name]);
				name_element.textContent = new_name;
				name_element.title = new_name;
			}
		}
	}//end of tab

	/**
	* セレクトエリアでキャラクタが選択された時、そのキャラクタ内の状態を検索しSelectBoxを更新する
	* @param character キャラクタを選んだセレクトボックスのDOM element
	* @param target 更新したいセレクトボックスのDOM element
	*/
	this.selecter_updata = function(character, target){
		//console.log(target);
		var tab = character.options[character.selectedIndex].value;
		//console.log("tab:"+tab);
		if(tab === "none"){
			target.innerHTML = "<option value='none' selected='selected'>---</option>";
			return;
		}

		var marus = document.getElementById('canvas_'+tab).querySelectorAll("[name='maru']");
		//a = "<option value='none' selected='selected'>---</option>";
		a = "<option value='none' >---</option>";
		var initial_flag = true;//最初の要素を初期状態に設定するフラグ
		for(var s = 0; s < marus.length; s++){
			if(initial_flag == true){
				a += "<option value='" + marus[s].id.substr('maru_'.length) + "' selected='selected'>" + marus[s].querySelector("[name='maru_name']").textContent + "</option>";
				initial_flag = false;
			}
			else{
				a += "<option value='" + marus[s].id.substr('maru_'.length) + "'>" + marus[s].querySelector("[name='maru_name']").textContent + "</option>";
			}
		}
		//console.log(target+":"+a);
		target.innerHTML = a;
	}

	/**
	* グループに「状態」を追加する
	* @param group_id 追加されるグループのID
	* @param maru_id 追加したい状態のID
	* @param z_index これを指定すると追加した状態のz-indexを設定できる
	* @param position これで追加した状態の位置を指定できる
	*/
	this.add = function(group_id, maru_id, z_index, position){
		if(typeof position === "undefined")
			position = this.list[group_id].length;
		if(typeof z_index === "undefined")
			z_index = INITIAL_Z_INDEX;
		this.list[group_id].splice(position, 0, [maru_id, z_index]);

		IslayPub.undo_redo.add_history(["add_group_member", group_id, maru_id]);
	}

	/**
	* 選んだグループの選んだ「状態」を選んだ位置に移動させる事ができる
	* @param group_id 対象となるグループのID
	* @param from_index 対象となる状態のID
	* @param to_index 移動させたい位置
	*/
	this.move_to = function(group_id, from_index, to_index){
		var a = this.list[group_id].splice(from_index, 1);
		this.list[group_id].splice(to_index, 0, a[0]);

		IslayPub.undo_redo.add_history(["move_group_member", group_id, from_index, to_index]);
	}

	/**
	* グループから状態を削除する
	* @param group_id 対象となるグループのID
	* @param position 削除したい「状態」の対象となるグループ内での位置
	*/
	this.remove = function(group_id, position){
		console.log(group_id+":"+position);
		var state = this.list[group_id][position];
		this.list[group_id].splice(position, 1);

		IslayPub.undo_redo.add_history(["remove_group_member", group_id, state, position]);
	}
}
