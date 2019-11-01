/**
* @fileoverview 「システムダイアログ」に関する関数群
* @author 鈴木一臣
*/

/**
* 「システム」ダイアログ関係のメソッドの集まり
* @namespace
*/
IslayPub.system_dialog = new function(){
	/** システムダイアログを開く */
	this.open=function(){
		var d = IslayPub.dialog.open(
			"<div>"+
				"◇" + IslayPub.language.system_content1[lang] + "◇<br>"+
				"<input type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"system_dialog_speed_input\");'>"+
				//"<button type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"system_dialog_speed_input\");'/>"+
				//"<input type='range' id='system_dialog_speed_input' min=17 max=1000 step=1 value=100 oninput='document.getElementById(\"system_dialog_speed\").textContent=this.value'><br>"+
				"<input type='number' id='system_dialog_speed_input' min=17 max=1000 step=1 value=100>"+
				//"<div id='system_dialog_speed' >100</div>"+
				"<input type='button' value='+' class='btn-circle-border-simple' ontouchend='IslayPub.button.plus(\"system_dialog_speed_input\");'>"+
			"</div>"+

			"<div>"+
				"◇" + IslayPub.language.system_content2[lang] + "◇<br>"+
				IslayPub.language.system_content2_1[lang] + "<input type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"system_dialog_width\");'>"+
				"<input type='number' id='system_dialog_width' min=0 value=480>"+
				"<input type='button' id='button_plus' value='+' class='btn-circle-border-simple' ontouchend='IslayPub.button.plus(\"system_dialog_width\");'>"+
				IslayPub.language.system_content2_2[lang] + "<input type='button' value='-' class='btn-circle-border-simple' ontouchend='IslayPub.button.minus(\"system_dialog_height\");'>"+
				"<input type='number' id='system_dialog_height' min=0 value=320>"+
				"<input type='button' id='button_plus' value='+' class='btn-circle-border-simple' ontouchend='IslayPub.button.plus(\"system_dialog_height\");'>"+
			"</div>"+
			"<div>"+
				"◇" + IslayPub.language.system_content3[lang] + "◇<br>"+
				//"<input class='jscolor' value='ab2567'>"+
				"<select id='system_dialog_background_color' >"+
					"<option value='white' selected>" + IslayPub.language.color_white[lang]  + "</option>"+
					"<option value='red'>" + IslayPub.language.color_red[lang]  + "</option>"+
					"<option value='green'>" + IslayPub.language.color_green[lang]  + "</option>"+
					"<option value='blue'>" + IslayPub.language.color_blue[lang] + "</option>"+
					"<option value='yellow'>" + IslayPub.language.color_yellow[lang] + "</option>"+
					"<option value='gray'>" + IslayPub.language.color_gray[lang] + "</option>"+
				"</select></p>"+
			"</div>"+
			"<div>"+
				"◇" + IslayPub.language.system_content4[lang] + "◇<br>"+
				"<input id='system_dialog_wall_checkbox' type='checkbox' style='display:none'"+
				"onchange='document.getElementById(\"system_dialog_wall\").textContent = this.checked?IslayPub.language.system_content4_1[window.lang]:IslayPub.language.system_content4_2[window.lang];'>"+
				"<label for='system_dialog_wall_checkbox' id='system_dialog_wall'></label>"+
			"</div>"+
			"<div id='dialog_buttons'>"+
				"<input type='button' value='"+IslayPub.language.ok[lang]+"' ontouchend='if(IslayPub.system_dialog.apply()){IslayPub.dialog.close();}'>"+
				"<input type='button' value='"+IslayPub.language.cancel[lang]+"' ontouchend='IslayPub.dialog.close()'>"+
				"<input type='button' value='"+IslayPub.language.apply[lang]+"' ontouchend='IslayPub.system_dialog.apply()'>"+
			"</div>");

		//初期化
	document.getElementById("system_dialog_speed_input").value = document.getElementById("system_speed_input").value;
		//document.getElementById("system_dialog_speed").textContent = document.getElementById("system_speed_input").value;
		document.getElementById("system_dialog_width").value = document.getElementById("system_width").value;
		document.getElementById("system_dialog_height").value = document.getElementById("system_height").value;
		document.getElementById("system_dialog_background_color").value = document.getElementById("system_background_color").value;

		document.getElementById("system_dialog_wall").click();
		if(!document.getElementById("system_wall").checked)document.getElementById("system_dialog_wall").click();
		//どういう意味???
		console.log(document.getElementById("system_dialog_background_color").value);
		console.log(document.getElementById("system_background_color").value);
	}

	/** システムダイアログで行われた変更を適用する */
	this.apply = function(){
		var changed = new Object();
		console.log(document.getElementById("system_dialog_background_color").value);
		console.log(document.getElementById("system_background_color").value);
		if(document.getElementById("system_speed_input").value != document.getElementById("system_dialog_speed_input").value){
			changed["speed"] = {before: document.getElementById("system_speed_input").value, after: document.getElementById("system_dialog_speed_input").value};
			document.getElementById("system_speed_input").value = document.getElementById("system_dialog_speed_input").value;
			console.log("aaa"+document.getElementById("system_speed_input").value);
			console.log("aaa"+document.getElementById("system_dialog_speed_input").value);
		}
		if(document.getElementById("system_width").value != document.getElementById("system_dialog_width").value){
			changed["width"] = {before: document.getElementById("system_width").value, after: document.getElementById("system_dialog_width").value};
			document.getElementById("system_width").value = document.getElementById("system_dialog_width").value;
		}
		if(document.getElementById("system_height").value != document.getElementById("system_dialog_height").value){
			changed["height"] = {before: document.getElementById("system_height").value, after: document.getElementById("system_dialog_height").value};
			document.getElementById("system_height").value = document.getElementById("system_dialog_height").value;
		}
		if(document.getElementById("system_background_color").value != document.getElementById("system_dialog_background_color").value){
			changed["background_color"] = {before: document.getElementById("system_background_color").value, after: document.getElementById("system_dialog_background_color").value};
/*
			var num;
			switch(document.getElementById("system_dialog_background_color").value){//背景色の選択
				case "white" : num = "#ffffff";
					break;
				case "red" : num = "#ff0000";
					break;
				case "green" : num = "#008000";
					break;
				case "blue" : num = "#0000ff";
					break;
				case "yellow" : num = "#ffff00";
					break;
				case "gray" : num = "#808080";
					break;
			}
*/
			document.getElementById("system_background_color").value = document.getElementById("system_dialog_background_color").value;
		}
		if(document.getElementById("system_wall").checked != document.getElementById("system_dialog_wall_checkbox").checked){
			changed["wall"] = {before: document.getElementById("system_wall").checked, after: document.getElementById("system_dialog_wall_checkbox").checked};
			document.getElementById("system_wall").checked = document.getElementById("system_dialog_wall_checkbox").checked;
		}

		IslayPub.undo_redo.add_history(["change_system", changed]);

		return true;
	}
}
