/**
* @fileoverview 「矢印」のダイアログに関する関数達
* @author 鈴木一臣
*/

/**
* 矢印のダイアログに関するメソッドの集まり
* @namespace
*/
IslayPub.yajirusi_dialog = new function(){
	/**
	* 矢印の遷移条件を編集するダイアログを開く
	* @param {element} 遷移条件を編集したい矢印
	*/
	this.open=function(target){
		//var testing = document.getElementById("yazirushi_condition").value;
		//console.log(testing);
		//console.log(target);
		var add_time = target.getAttribute("add_time");
		var testnum = 4;
		target.setAttribute('test', "hello" + testnum);
		var hello = target.getAttribute("test");

		IslayPub.dialog.open(
			"<form name = 'form' id='transition_form' yajirusi_id=\"" + target.id + "\" >"+
			"<div id='dialog_transition_condition'>◇"+IslayPub.language.transition_condition[lang]+"◇<br>"+
				"<select name = 'test' class='select box' onchange='IslayPub.yajirusi_dialog.action_change([],0,\"" + target + "\");IslayPub.yajirusi_dialog.apply(\"" + target.id + "\");' id = yazirushi_condition>"+//id追加した
					"<option value='transition_condition_none'>"+IslayPub.language.condition_none[lang]+"</option>"+
					"<option value='transition_condition_loop'>"+IslayPub.language.condition_loop[lang]+"</option>"+
				//	"<option value='transition_condition_clicked'>"+IslayPub.language.condition_clicked[lang]+"</option>"+
					"<option value='transition_condition_touched'>"+IslayPub.language.condition_touched[lang]+"</option>"+
					"<option value='transition_condition_bump'>"+IslayPub.language.condition_bump[lang]+"</option>"+
					"<option value='transition_condition_random'>"+IslayPub.language.condition_random[lang]+"</option>"+
				//	"<option value='transition_condition_keydown'>"+IslayPub.language.condition_keydown[lang]+"</option>"+
					"<option value='transition_condition_alone'>"+IslayPub.language.condition_alone[lang]+"</option>"+
					"<option value='transition_condition_notice'>"+IslayPub.language.condition_notice[lang]+"</option>"+
				"</select>"+
			  "<div id='dialog_transition_detail'></div>"+
			"</div>"+
			"</form>"
/*
			"<form name = 'form1'>"+
			"<div id='dialog_transition_condition1'>◇"+IslayPub.language.transition_condition[lang]+"◇<br>"+
			"<select name = 'test1' onchange='IslayPub.yajirusi_dialog.action_change([],1);IslayPub.yajirusi_dialog.apply1(\"" + target.id + "\");' id = yazirushi_condition1>"+//id追加した
				"<option value='transition_condition_none'>"+IslayPub.language.condition_none[lang]+"</option>"+
				"<option value='transition_condition_loop'>"+IslayPub.language.condition_loop[lang]+"</option>"+
				"<option value='transition_condition_clicked'>"+IslayPub.language.condition_clicked[lang]+"</option>"+
				"<option value='transition_condition_bump'>"+IslayPub.language.condition_bump[lang]+"</option>"+
				"<option value='transition_condition_random'>"+IslayPub.language.condition_random[lang]+"</option>"+
				"<option value='transition_condition_keydown'>"+IslayPub.language.condition_keydown[lang]+"</option>"+
				"<option value='transition_condition_alone'>"+IslayPub.language.condition_alone[lang]+"</option>"+
				"<option value='transition_condition_notice'>"+IslayPub.language.condition_notice[lang]+"</option>"+
			"</select>"+
			"<div id='dialog_transition_detail1'></div>"+
			"</div>"+
			"</form>"+

			"<form name = 'form2'>"+
			"<div id='dialog_transition_condition2'>◇"+IslayPub.language.transition_condition[lang]+"◇<br>"+
			"<select name = 'test2' onchange='IslayPub.yajirusi_dialog.action_change([],2);IslayPub.yajirusi_dialog.apply2(\"" + target.id + "\");' id = yazirushi_condition2>"+//id追加した
				"<option value='transition_condition_none'>"+IslayPub.language.condition_none[lang]+"</option>"+
				"<option value='transition_condition_loop'>"+IslayPub.language.condition_loop[lang]+"</option>"+
				"<option value='transition_condition_clicked'>"+IslayPub.language.condition_clicked[lang]+"</option>"+
				"<option value='transition_condition_bump'>"+IslayPub.language.condition_bump[lang]+"</option>"+
				"<option value='transition_condition_random'>"+IslayPub.language.condition_random[lang]+"</option>"+
				"<option value='transition_condition_keydown'>"+IslayPub.language.condition_keydown[lang]+"</option>"+
				"<option value='transition_condition_alone'>"+IslayPub.language.condition_alone[lang]+"</option>"+
				"<option value='transition_condition_notice'>"+IslayPub.language.condition_notice[lang]+"</option>"+
			"</select>"+
			"<div id='dialog_transition_detail2'></div>"+
			"</div>"+
			"</form>"+

			"<div id='inner_test'></div>"+//追加した

			"<div id='dialog_buttons'>"+
				"<input type='button' value='"+IslayPub.language.add[lang]+"' ontouchend='\IslayPub.yajirusi_dialog.add(\"" + target.id + "\");event.preventDefault();'>"+//IslayPub.yajirusi_dialog.open(\"" + target + "\");
			"</div>"+

			"<div id='dialog_buttons1'>"+
				"<input type='button' value='"+IslayPub.language.add[lang]+"' ontouchend='IslayPub.yajirusi_dialog.add(\"" + target.id + "\");event.preventDefault();'>"+
				"<input type='button' value='"+IslayPub.language.remove[lang]+"' ontouchend='IslayPub.yajirusi_dialog.remove(\"" + target.id + "\");'>"+
			"</div>"+

			"<div id='dialog_buttons2'>"+
				"<input type='button' value='"+IslayPub.language.remove[lang]+"' ontouchend='IslayPub.yajirusi_dialog.remove(\"" + target.id + "\");'>"+
			"</div>"*/

		,DIALOG_FLAG);

		//IslayPub.yajirusi_dialog.style_display(add_time);//要素の表示・非表示

		//ダイアログ開いたときに以前選択したものを表示
		var a = target.getAttribute('transition_condition');
		if(a){
			a = a.split(':');
			document.form.test.querySelector('option[value=transition_condition_' + a[0] + ']').selected = true;
			IslayPub.yajirusi_dialog.action_change(a,0);//これがないと矢印の遷移条件の詳細ボックスが出ない?
		}
		/*
		var b = target.getAttribute('transition_condition1');
		if(b){
			b = b.split(':');
			document.form1.test1.querySelector('option[value=transition_condition_' + b[0] + ']').selected = true;
			IslayPub.yajirusi_dialog.action_change(b,1);//これがないと矢印の遷移条件の詳細ボックスが出ない
		}

		var c = target.getAttribute('transition_condition2');
		console.log(c);
		if(c){
			c = c.split(':');
			document.form2.test2.querySelector('option[value=transition_condition_' + c[0] + ']').selected = true;
			IslayPub.yajirusi_dialog.action_change(c,2);//これがないと矢印の遷移条件の詳細ボックスが出ない
		}*/
	}

	/**
	* 矢印ダイアログが開かれた時に内容を初期化する関数
	* @param {array} 初期化するやつ
	* @param {number} 数字で処理の分岐
	*/
	this.action_change=function(init,num,yazirushi){
		Yazirushi_id = document.getElementById("transition_form").getAttribute("yajirusi_id");
		console.log("ID:"+Yazirushi_id);

			if(num == 0){
				//console.log("num==0");
				var target = document.getElementById('dialog_transition_detail');
				var condition = document.querySelector('#dialog_transition_condition>select').options[document.querySelector('#dialog_transition_condition>select').selectedIndex].value;
			}
			else if(num == 1){
				//console.log("num==1");
				var target = document.getElementById('dialog_transition_detail1');
				var condition = document.querySelector('#dialog_transition_condition1>select').options[document.querySelector('#dialog_transition_condition1>select').selectedIndex].value;
			}
			else if(num == 2){
				//console.log("num==2");
				var target = document.getElementById('dialog_transition_detail2');
				var condition = document.querySelector('#dialog_transition_condition2>select').options[document.querySelector('#dialog_transition_condition2>select').selectedIndex].value;
			}
			//switch(document.querySelector('#dialog_transition_condition>select').options[document.querySelector('#dialog_transition_condition>select').selectedIndex].value){
			//var target = document.getElementById('dialog_transition_detail');//3パターン必須
			//console.log("condition:" + condition);
			switch(condition){
				case 'transition_condition_none': target.innerHTML = ''; break;
				case 'transition_condition_loop':
					target.innerHTML=
					"<div id = 'for_apply' onInput='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'ontouchend='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'>"+
						"<input type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"transition_condition_loop\");'>"+
						"<input id='transition_condition_loop' onInput='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");' type='number' minlength='1' value=" + Number((typeof init[1] === "undefined")?1:init[1]) + ">"+IslayPub.language.times[lang]+
						"<input type='button' id='button_plus' value='+' class='btn-circle-border-simple' ontouchend='IslayPub.button.plus(\"transition_condition_loop\");'>"+
					"</div>";
					break;
				case 'transition_condition_clicked':
					target.innerHTML=
					"<div id = 'for_apply' onchange='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");console.log(\"" + Yazirushi_id + "\");'>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_leftclick' name='condition_clicked_type' value='left' " + ((typeof init[1] !== "undefined" && init[1]==='1')?"checked='checked'":'') + ">"+IslayPub.language.left_click[lang]+"</label>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_centerclick' name='condition_clicked_type' value='center' " + ((typeof init[2] !== "undefined" && init[2]==='1')?"checked='checked'":'') + ">"+IslayPub.language.middle_click[lang]+"</label>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_rightclick' name='condition_clicked_type' value='right' " + ((typeof init[3] !== "undefined" && init[3]==='1')?"checked='checked'":'') + ">"+IslayPub.language.right_click[lang]+"</label>"+
					"</div>";
					break;
				case 'transition_condition_touched':target.innerHTML = ''; break;
				case 'transition_condition_bump':
					var tabs = document.getElementsByName('character_tab');
					var a = "<select id='transition_condition_bump_select' class='select box'><option value='something'>"+IslayPub.language.something[lang]+"</option>";
					for(var s = 0; s < tabs.length; s++){
						a += "<option value='" + tabs[s].id.substr('character_tab_'.length) + "' " + ((typeof init[6] !== "undefined" && init[6] === tabs[s].id.substr('character_tab_'.length))?'selected=true':'') + ">" + tabs[s].querySelector("[name='character_tab_name']").textContent + "</option>";
					}
					a += "</select>";
					target.innerHTML=
					"<div id = 'for_apply' onchange='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_bumpleft' name='condition_bump_type' value='left' " + ((typeof init[3] !== "undefined" && init[3]==='1')?"checked='checked'":'') + ">"+IslayPub.language.left_edge[lang]+"</label>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_bumpright' name='condition_bump_type' value='center' " + ((typeof init[4] !== "undefined" && init[4]==='1')?"checked='checked'":'') + ">"+IslayPub.language.right_edge[lang]+"</label><br>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_bumptop' name='condition_bump_type' value='center' " + ((typeof init[1] !== "undefined" && init[1]==='1')?"checked='checked'":'') + ">"+IslayPub.language.top[lang]+"</label>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_bumpbottom' name='condition_bump_type' value='center' " + ((typeof init[2] !== "undefined" && init[2]==='1')?"checked='checked'":'') + ">"+IslayPub.language.bottom[lang]+"</label><br>"+
						"<label style='margin-left:10px;'><input type='checkbox' id='transition_condition_bumpcharacter' name='condition_bump_type' value='right' " + ((typeof init[5] !== "undefined" && init[5]==='1')?"checked='checked'":'') + ">"+IslayPub.language.character[lang]+"</label>"+
						a +
					"</div>";
					break;
				case 'transition_condition_random':
					target.innerHTML =
					"<div id = 'for_apply' onInput='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'ontouchend='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'>"+
						"<input type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"transition_condition_random\");'>"+
						"<input id='transition_condition_random' type='number'  min=1 max=99 value=" + Number((typeof init[1] === "undefined")?50:init[1]) + ">" + "%"+
						"<input type='button' id='button_plus' value='+' class='btn-circle-border-simple' ontouchend='IslayPub.button.plus(\"transition_condition_random\");'>"+
					"</div>";
					break;
				case 'transition_condition_keydown':
					var s = "<select id='transition_condition_keydown_select' onchange='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");'>" +
					"<option value='38'>↑</option>" +
					"<option value='40'>↓</option>" +
					"<option value='37'>←</option>" +
					"<option value='39'>→</option>";
					s += "<option value='32'>"+IslayPub.language.space_key[lang]+"</option><option value='13'>"+IslayPub.language.enter_key[lang]+"</option>"
					for(var q = 0; q <= 9; q++){
						s += "<option value='" + (""+q).charCodeAt() + "'>" + q + "</option>";
					}
					var a = "A".charCodeAt() - 1;
					for(var q = 0; q < 26; q++){
						a++;
						s += "<option value='" + a + "'>" + String.fromCharCode(a) + "</option>";
					}
					s += "</select>";
					target.innerHTML = s;
					if(typeof init[1] !== "undefined"){
						document.querySelector("#transition_condition_keydown_select>option[value=\"" + init[1] + "\"]").selected = true;
					}
					break;
				case 'transition_condition_alone': target.innerHTML = ''; break;
				case 'transition_condition_notice':
					target.innerHTML = "<input type='text' id='transition_condition_notice' onInput='IslayPub.yajirusi_dialog.apply(\"" + Yazirushi_id + "\");' maxlength=20 value='" + ((typeof init[1] === "undefined")?'':init[1]) + "'><br>";
					break;
			}//end of switch
	}

	//add_time増やした
	this.apply = function(target, recursive){
		target = document.getElementById(target);
		var add_time = target.getAttribute("add_time");
		//console.log(add_time);

		if(recursive !== true && target.getAttribute("selected")){
			IslayPub.undo_redo.add_history(["bundle", "start"]);
			Array.prototype.forEach.call(document.querySelectorAll("[name='yajirusi'][selected='yes']"),
				function(e){
					this.apply(e.id, true);
			}, this);
			IslayPub.undo_redo.add_history(["bundle", "end"]);
			return true;
		}

		for(num = 0; num <= add_time; num ++){
			//console.log("in for");
			var new_condition = null;
			if(num == 0){
				var old_condition = target.getAttribute('transition_condition');
				var switch_num = document.querySelector('#dialog_transition_condition>select').options[document.querySelector('#dialog_transition_condition>select').selectedIndex].value
			}
			else {
				var old_condition = target.getAttribute('transition_condition' + num);
				var switch_num = document.querySelector('#dialog_transition_condition' + num + '>select').options[document.querySelector('#dialog_transition_condition' + num + '>select').selectedIndex].value
			}

			switch(switch_num){
				case 'transition_condition_none':
					new_condition = 'none';
					break;
				case 'transition_condition_loop':
				//console.log(document.getElementById('transition_condition_loop'));
					var c = parseInt(document.getElementById('transition_condition_loop').value, 10);
					if(c < 1 || Number.isNaN(c)){alert(IslayPub.language.alert4[lang]);return false;}
					new_condition = 'loop:' + c;
					break;
				case 'transition_condition_clicked':
					new_condition = 'clicked:' +
					((document.getElementById('transition_condition_leftclick').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_centerclick').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_rightclick').checked)?'1':'0');
					break;
				case 'transition_condition_touched':
						new_condition = 'touched';
					break;
				case 'transition_condition_bump':
					new_condition = 'bump:' +
					((document.getElementById('transition_condition_bumptop').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_bumpbottom').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_bumpleft').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_bumpright').checked)?'1':'0') + ':' +
					((document.getElementById('transition_condition_bumpcharacter').checked)?'1':'0') + ':' +
					document.getElementById('transition_condition_bump_select').options[document.getElementById('transition_condition_bump_select').selectedIndex].value;
					break;
				case 'transition_condition_random':
					var c = parseInt(document.getElementById('transition_condition_random').value, 10);
					if(c < 1 || 99 < c || Number.isNaN(c)){alert(IslayPub.language.alert4[lang]);return false;}
					new_condition = 'random:' + c;
					break;
				case 'transition_condition_keydown':
					new_condition = 'keydown:' +
					document.getElementById('transition_condition_keydown_select').options[document.getElementById('transition_condition_keydown_select').selectedIndex].value;
					break;
				case 'transition_condition_alone':
					new_condition = 'alone';
					break;
				case 'transition_condition_notice':
					//if(document.getElementById('transition_condition_notice').value.length == 0){alert(IslayPub.language.alert2[lang]);return false;}
					new_condition = 'notice:' +
					document.getElementById('transition_condition_notice').value;
					break;
			}

			if(old_condition !== new_condition){
				if(num == 0){
						target.setAttribute('transition_condition', new_condition);
				}
				else {
						target.setAttribute('transition_condition' + num, new_condition);
				}
			//	target.setAttribute('transition_condition', new_condition);
				IslayPub.character.yajirusi.tooltip(target);
				IslayPub.undo_redo.add_history(["change_condition", target.parentNode.id.substr("maru_".length), IslayPub.character.yajirusi.get_priority(target), {before:old_condition, after:new_condition}]);
			}
			//console.log("true");
		}//end of for
		return true;
	}


	/**
	* 矢印ダイアログでの変更内容を適用する
	* @param {string} 変更対象の矢印
	* @param {boolean} 再起処理の時に使う。普通に呼び出す時は使わないで
	*/
/*
	this.apply = function(target, recursive){
		console.log("apply:"+target);
		target = document.getElementById(target);

		if(recursive !== true && target.getAttribute("selected")){
			IslayPub.undo_redo.add_history(["bundle", "start"]);
			Array.prototype.forEach.call(document.querySelectorAll("[name='yajirusi'][selected='yes']"),
				function(e){
					console.log("e.id:"+e.id);
					this.apply(e.id, true);
			}, this);
			IslayPub.undo_redo.add_history(["bundle", "end"]);
			return true;
		}
		console.log("recursive");
		var new_condition = null;
		var old_condition = target.getAttribute('transition_condition');
		switch(document.querySelector('#dialog_transition_condition>select').options[document.querySelector('#dialog_transition_condition>select').selectedIndex].value){
			case 'transition_condition_none':
				new_condition = 'none';
				break;
			case 'transition_condition_loop':
			console.log(document.getElementById('transition_condition_loop'));
				var c = parseInt(document.getElementById('transition_condition_loop').value, 10);
				if(c < 1){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'loop:' + c;
				break;
			case 'transition_condition_clicked':
				new_condition = 'clicked:' +
				((document.getElementById('transition_condition_leftclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_centerclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_rightclick').checked)?'1':'0');
				break;
			case 'transition_condition_bump':
				new_condition = 'bump:' +
				((document.getElementById('transition_condition_bumptop').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpbottom').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpleft').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpright').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpcharacter').checked)?'1':'0') + ':' +
				document.getElementById('transition_condition_bump_select').options[document.getElementById('transition_condition_bump_select').selectedIndex].value;
				break;
			case 'transition_condition_random':
				var c = parseInt(document.getElementById('transition_condition_random').value, 10);
				if(c < 1 || 99 < c){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'random:' + c;
				break;
			case 'transition_condition_keydown':
				new_condition = 'keydown:' +
				document.getElementById('transition_condition_keydown_select').options[document.getElementById('transition_condition_keydown_select').selectedIndex].value;
				break;
			case 'transition_condition_alone':
				new_condition = 'alone';
				break;
			case 'transition_condition_notice':
				if(document.getElementById('transition_condition_notice').value.length == 0){alert(IslayPub.language.alert2[lang]);return false;}
				new_condition = 'notice:' +
				document.getElementById('transition_condition_notice').value;
				break;
		}

		if(old_condition !== new_condition){
			target.setAttribute('transition_condition', new_condition);
			IslayPub.character.yajirusi.tooltip(target);
			IslayPub.undo_redo.add_history(["change_condition", target.parentNode.id.substr("maru_".length), IslayPub.character.yajirusi.get_priority(target), {before:old_condition, after:new_condition}]);
		}
		console.log("true");
		return true;
	}
*/

	/**
	* 矢印ダイアログでの変更内容を適用する
	* @param {string} 変更対象の矢印
	* @param {boolean} 再起処理の時に使う。普通に呼び出す時は使わないで
	*/
	/*
	this.apply1 = function(target, recursive){
		console.log("in apply1");
		target = document.getElementById(target);

		if(recursive !== true && target.getAttribute("selected")){
			IslayPub.undo_redo.add_history(["bundle", "start"]);
			Array.prototype.forEach.call(document.querySelectorAll("[name='yajirusi'][selected='yes']"),
				function(e){
					console.log("e.id:"+e.id);
					this.apply1(e.id, true);
			}, this);
			IslayPub.undo_redo.add_history(["bundle", "end"]);
			return true;
		}
		console.log("recursive");
		var new_condition = null;
		var old_condition = target.getAttribute('transition_condition1');
		switch(document.querySelector('#dialog_transition_condition1>select').options[document.querySelector('#dialog_transition_condition1>select').selectedIndex].value){
			case 'transition_condition_none':
				new_condition = 'none';
				break;
			case 'transition_condition_loop':
				var c = parseInt(document.getElementById('transition_condition_loop').value, 10);
				if(c < 1){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'loop:' + c;
				break;
			case 'transition_condition_clicked':
				new_condition = 'clicked:' +
				((document.getElementById('transition_condition_leftclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_centerclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_rightclick').checked)?'1':'0');
				break;
			case 'transition_condition_bump':
				new_condition = 'bump:' +
				((document.getElementById('transition_condition_bumptop').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpbottom').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpleft').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpright').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpcharacter').checked)?'1':'0') + ':' +
				document.getElementById('transition_condition_bump_select').options[document.getElementById('transition_condition_bump_select').selectedIndex].value;
				break;
			case 'transition_condition_random':
				var c = parseInt(document.getElementById('transition_condition_random').value, 10);
				if(c < 1 || 99 < c){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'random:' + c;
				break;
			case 'transition_condition_keydown':
				new_condition = 'keydown:' +
				document.getElementById('transition_condition_keydown_select').options[document.getElementById('transition_condition_keydown_select').selectedIndex].value;
				break;
			case 'transition_condition_alone':
				new_condition = 'alone';
				break;
			case 'transition_condition_notice':
				if(document.getElementById('transition_condition_notice').value.length == 0){alert(IslayPub.language.alert2[lang]);return false;}
				new_condition = 'notice:' +
				document.getElementById('transition_condition_notice').value;
				break;
		}

		if(old_condition !== new_condition){
			target.setAttribute('transition_condition1', new_condition);
			IslayPub.character.yajirusi.tooltip(target);
			IslayPub.undo_redo.add_history(["change_condition", target.parentNode.id.substr("maru_".length), IslayPub.character.yajirusi.get_priority(target), {before:old_condition, after:new_condition}]);
		}
		return true;
	}
	*/

	/**
	* 矢印ダイアログでの変更内容を適用する
	* @param {string} 変更対象の矢印
	* @param {boolean} 再起処理の時に使う。普通に呼び出す時は使わないで
	*/
	/*
	this.apply2 = function(target, recursive){
		console.log("in apply2");
		target = document.getElementById(target);
		//console.log("recursive:"+recursive);
		//console.log("target.id:" + target.id);
		//console.log(target.getAttribute("selected"));
		if(recursive !== true && target.getAttribute("selected")){
			IslayPub.undo_redo.add_history(["bundle", "start"]);
			Array.prototype.forEach.call(document.querySelectorAll("[name='yajirusi'][selected='yes']"),
				function(e){
					console.log("e.id:"+e.id);
					this.apply2(e.id, true);
			}, this);
			IslayPub.undo_redo.add_history(["bundle", "end"]);
			return true;
		}
		console.log("recursive");
		var new_condition = null;
		var old_condition = target.getAttribute('transition_condition2');
		switch(document.querySelector('#dialog_transition_condition2>select').options[document.querySelector('#dialog_transition_condition2>select').selectedIndex].value){
			case 'transition_condition_none':
				new_condition = 'none';
				break;
			case 'transition_condition_loop':
				var c = parseInt(document.getElementById('transition_condition_loop').value, 10);
				if(c < 1){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'loop:' + c;
				break;
			case 'transition_condition_clicked':
				new_condition = 'clicked:' +
				((document.getElementById('transition_condition_leftclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_centerclick').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_rightclick').checked)?'1':'0');
				break;
			case 'transition_condition_bump':
				new_condition = 'bump:' +
				((document.getElementById('transition_condition_bumptop').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpbottom').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpleft').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpright').checked)?'1':'0') + ':' +
				((document.getElementById('transition_condition_bumpcharacter').checked)?'1':'0') + ':' +
				document.getElementById('transition_condition_bump_select').options[document.getElementById('transition_condition_bump_select').selectedIndex].value;
				break;
			case 'transition_condition_random':
				var c = parseInt(document.getElementById('transition_condition_random').value, 10);
				if(c < 1 || 99 < c){alert(IslayPub.language.alert4[lang]);return false;}
				new_condition = 'random:' + c;
				break;
			case 'transition_condition_keydown':
				new_condition = 'keydown:' +
				document.getElementById('transition_condition_keydown_select').options[document.getElementById('transition_condition_keydown_select').selectedIndex].value;
				break;
			case 'transition_condition_alone':
				new_condition = 'alone';
				break;
			case 'transition_condition_notice':
				if(document.getElementById('transition_condition_notice').value.length == 0){alert(IslayPub.language.alert2[lang]);return false;}
				new_condition = 'notice:' +
				document.getElementById('transition_condition_notice').value;
				break;
		}

		if(old_condition !== new_condition){
			target.setAttribute('transition_condition2', new_condition);
			IslayPub.character.yajirusi.tooltip(target);
			IslayPub.undo_redo.add_history(["change_condition", target.parentNode.id.substr("maru_".length), IslayPub.character.yajirusi.get_priority(target), {before:old_condition, after:new_condition}]);
		}
		return true;
	}
*/

	/*
	*増やすボタンが押されたとき
	*/
	/*
	this.add = function(target, recursive){
		event.preventDefault();
		target = document.getElementById(target);
		console.log();
		var attribute1 = target.getAttribute("transition_condition1");
		var attribute2 = target.getAttribute("transition_condition2");
		if(attribute1 == null){
			target.setAttribute('transition_condition1', "none");
			target.setAttribute('add_time', 1);//増やした
		}
		else if(attribute2 == null){
			target.setAttribute('transition_condition2', "none");
			target.setAttribute('add_time', 2);
		}
		var add_time = target.getAttribute("add_time");
		console.log("add_time:"+add_time);

		//IslayPub.yajirusi_dialog.style_display(add_time);//要素の表示・非表示

		return true;
	}
*/

/*
	this.remove = function(target, recursive){
		event.preventDefault();
		target = document.getElementById(target);
		var add_time = target.getAttribute("add_time");
		console.log(add_time);
		//var attribute1 = target.getAttribute("transition_condition1");
		//var attribute2 = target.getAttribute("transition_condition2");
		if(add_time == 1){
			target.removeAttribute('transition_condition1');
			target.setAttribute('add_time', 0);
		}
		else if(add_time == 2){
			target.removeAttribute('transition_condition2');
			target.setAttribute('add_time', 1);
		}
		var add_time = target.getAttribute("add_time");
		console.log("add_time:"+add_time);

		//IslayPub.yajirusi_dialog.style_display(add_time);//要素の表示・非表示

		return true;
	}
*/
		//要素の表示・非表示
	/*this.style_display = function(add_time){
		if(add_time == 0){
			document.getElementById("dialog_transition_condition").style.display="block";
			document.getElementById("dialog_transition_condition1").style.display="none";
			document.getElementById("dialog_transition_condition2").style.display="none";
			document.getElementById("dialog_buttons").style.display="block";
			document.getElementById("dialog_buttons1").style.display="none";
			document.getElementById("dialog_buttons2").style.display="none";
		}
		else if(add_time == 1){
			document.getElementById("dialog_transition_condition").style.display="block";
			document.getElementById("dialog_transition_condition1").style.display="block";
			document.getElementById("dialog_transition_condition2").style.display="none";
			document.getElementById("dialog_buttons").style.display="none";
			document.getElementById("dialog_buttons1").style.display="block";
			document.getElementById("dialog_buttons2").style.display="none";
		}
		else if(add_time == 2){
			document.getElementById("dialog_transition_condition").style.display="block";
			document.getElementById("dialog_transition_condition1").style.display="block";
			document.getElementById("dialog_transition_condition2").style.display="block";
			document.getElementById("dialog_buttons").style.display="none";
			document.getElementById("dialog_buttons1").style.display="none";
			document.getElementById("dialog_buttons2").style.display="block";
		}
	return true;
	}*/
}
