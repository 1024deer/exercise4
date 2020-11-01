	var pageCount =0;
	var pageNumber=1;
	var pageSize =5;
	var total=0;
	var sort_by1=0;
	var sort_by2=0;
	var sort="userName";
	var sortOrder="desc";
	var userName_correct = false;
	var chrName_correct = false;
	var mail_correct = false;
	var province_correct = false;
	var city_correct = false;
	var password_correct = false;
	var password1_correct = false;
	
function init(){
	var userName_correct = false;
	var chrName_correct = false;
	var mail_correct = false;
	var province_correct = false;
	var city_correct = false;
	var password_correct = false;
	var password1_correct = false;
}
function fillProvince() {
    $.ajax({
        type: "post",
        url: "queryProvinceCity.do",
        data: {},
        dataType: "json",
        success: function(response) {
            var provinceElement = document.getElementById("province");
            //娓呴櫎select鐨勬墍鏈塷ption
			
            provinceElement.options.length = 0;
            //澧炲姞涓€涓€夐」
            provinceElement.add(new Option("请选择省份", ""));
            //寰幆澧炲姞鍏朵粬鎵€鏈夐€夐」
            for (index = 0; index < response.length; index++) {
                provinceElement.add(new Option(response[index].provinceName,
                    response[index].provinceCode));
            }
        }
    });
}

function ShowDiv(show_div, bg_div){
	document.getElementById(show_div).style.display ="block";
	document.getElementById(bg_div).style.display ="block";
	
	var windowHeight =$(window).height();
	var windowWidth =$(window).width();
	var popupHeight = $("#"+show_div).height();
	var popupWidth  = $("#"+show_div).width();
	var posiTop=(windowHeight-popupHeight)/2;
	var posiLeft=(windowWidth-popupWidth)/2;
	$("#"+show_div).css({"left":posiLeft+"px","top":posiTop + "px","display":"block"});
}

function fillProvince2() {
    $.ajax({
        type: "post",
        url: "queryProvinceCity.do",
        data: {},
        dataType: "json",
        success: function(response) {
            var provinceElement = document.getElementById("province2");
            //娓呴櫎select鐨勬墍鏈塷ption
			
            provinceElement.options.length = 0;
            //澧炲姞涓€涓€夐」
            provinceElement.add(new Option("请选择省份", ""));
            //寰幆澧炲姞鍏朵粬鎵€鏈夐€夐」
            for (index = 0; index < response.length; index++) {
                provinceElement.add(new Option(response[index].provinceName,
                    response[index].provinceCode));
            }
        }
    });
}


	function querydata(){
		var queryParams = {"userName":$("#serch_userName").val(),"chrName":$("#serch_chrName").val(),"mail":$("#serch_mail").val(),"provinceName":$("#serch_provinceName").val()}
		var pageParams = {"pageSize":$("#pageSize").val(),"pageNumber":pageNumber.toString(),"sort":sort,"sortOrder":sortOrder};
		$.ajax({
		    type: "post",
		    url: "queryuser.do",
		    data: {
			queryParams:JSON.stringify(queryParams),
			pageParams:JSON.stringify(pageParams)
			},
		    dataType: "json",
		    success: function(response) {
		        total =response.total;
				var rows =response.rows;
				pageSize=$("#pageSize").val();
				pageCount =Math.ceil(total/pageSize);
				$("#pageCount").text(pageCount);
				$("#pageNumber").text(pageNumber);
				$("tbody").empty();
				$.each(rows,function(index,row){
					var s=JSON.stringify(row);
					var str="<tr data='"+s+"'>";
					str=str+'<td width="40"><input type="checkbox" value="' +row.userName+'" class="ck" title="选择"/> </td>';
					str=str+'<td>'+row.userName+'</td>';
					str=str+'<td>'+row.chrName+'</td>';
					str=str+'<td>'+row.mail+'</td>';
					str=str+'<td>'+row.provinceName+'</td>';
					str=str+'<td>'+row.cityName+'</td>';
					str=str+'<td><a href="#" id="btnDel" value="' +row.userName+'">删除</a>';
					str=str+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" id="btnUpdate" value="' +row.userName+'">修改</a></td>';
					str=str+'</tr>';
					$("tbody").append(str);
				});
				$("tbody tr:even").addClass('tr_even');
				$("tbody tr:odd").addClass('tr_odd');
		    }
		});
	}
	
	
function CloseDiv(show_div, bg_div){
	document.getElementById(show_div).style.display ="none";
	document.getElementById(bg_div).style.display ="none";
}
function CloseAll(){
	CloseDiv('MyDiv','fade');
	CloseDiv('updateDiv','fade');
	CloseDiv('modifyDiv','fade');
	
}











$(document).ready(function(){
querydata();

$("#btSearch").click(function(){
		querydata();
	});
	
$("#sortby1 ").click(function(){
	sort_by1=sort_by1+1;
	if(sort_by1==1){
		sort="userName";
		sortOrder="desc";
		$("#sortby1").css({"background":"url(images/down.png) right no-repeat","background-size":"contain"});
	}
	else if(sort_by1==2){
		sortOrder="asc";
		sort="userName";
		$("#sortby1").css({"background":"url(images/up.png) right no-repeat","background-size":"contain"});
	}
	else{
		sort_by1=0;
		sortOrder="desc";
		sort="userName";
		$("#sortby1").css({"background":"url(images/both.png) right no-repeat","background-size":"contain"});
	}
	querydata();
});
$("#sortby2 ").click(function(){
	sort_by2=sort_by2+1;
	if(sort_by2==1){
		sortOrder="desc";
		sort="provinceCode";
		$("#sortby2").css({"background":"url(images/down.png) right no-repeat","background-size":"contain"});
	}
	else if(sort_by2==2){
		sortOrder="asc";
		sort="provinceCode";
		$("#sortby2").css({"background":"url(images/up.png) right no-repeat","background-size":"contain"});
	}
	else{
		sort_by2=0;
		sortOrder="desc";
		sort="provinceCode";
		$("#sortby2").css({"background":"url(images/both.png) right no-repeat","background-size":"contain"});
	}
	querydata();
});
$("#pageSize").change(function(){
  querydata();
});
$("tbody").on("mouseover", "tr", function() {
        $(this).addClass('tr_hover'); //通过jQuery控制实现鼠标悬停上的背景色
 });
 $("tbody").on("mouseout", "tr", function() {
        $(this).removeClass('tr_hover'); //通过jQuery控制实现鼠标悬停上的背景色
 });
$("tbody").on("click", "tr input:checkbox", function() {
        if (this.checked == true) {
            $(this).parents("tr").addClass('tr_select');
        } else {
            $(this).parents("tr").removeClass('tr_select');
        }
 });
$("#ckall").click(function(){
	if (this.checked == true) {
		$(".ck").prop("checked",true);
	    $("tbody tr").addClass('tr_select');
	} else {
		$(".ck").prop("checked",false);
	    $("tbody tr").removeClass('tr_select');
	}
})
$("#last").click(function(){
	pageNumber=pageCount;
	$("#last").val(pageNumber);
	querydata();
});
$("#first").click(function(){
	pageNumber=1;
	$("#first").val(pageNumber);
	querydata();
});
$("#next").click(function(){
	if(pageNumber<pageCount){
	pageNumber=pageNumber+1;
	}
	$("#next").val(pageNumber);
	querydata();
});
$("#back").click(function(){
	if(pageNumber>1){
	pageNumber=pageNumber-1;
	}
	$("#back").val(pageNumber);
	querydata();
});


$('table').on('click','#btnUpdate',function(){
	var userName =$(this).attr("value");
	ShowDiv('updateDiv','fade');
	$("#userName2").val(userName);
});


$('table').on('click','#btnDel',function(){
	var userName =$(this).attr("value");
	$.ajax({
	    type: "post",
	    url: "deleteuser.do",
	    data: { ids:userName },
	    dataType: "json",
	    success: function(response) {
	       alert(response.info);
		   if(response.code == 0){
			   window.location.reload();
		   }
	    }
	});
	
});

$("#btClear").click(function(){
	$("#serch_userName").val("");
	$("#serch_chrName").val("");
	$("#serch_mail").val("");
	$("#serch_provinceName").val("");
});

$("#btUpdate").click(function(){
	var len = $('tbody tr input:Checkbox:checked').length;
	if(len==0){
		alert("请至少选择一项进行修改 ");
		return;
	}
	ShowDiv('modifyDiv','fade');
});


$("#btDelete").click(function(){
	var len = $('tbody tr input:Checkbox:checked').length;
	if(len==0){
		alert("请至少选择一项！");
		return;
	}
	var vals =[];
	$('tbody tr input:Checkbox:checked').each(function(index,item){
		vals.push($(this).val());	
	})
	$.ajax({
	    type: "post",
	    url: "deleteuser.do",
	    data: { ids:vals.join(",") },
	    dataType: "json",
	    success: function(response) {
	       alert(response.info);
		   if(response.code == 0){
			   window.location.reload();
		   }
	    }
	});
})


$("#roleset").click(function(){
	var vals =[];
	$('tbody tr input:Checkbox:checked').each(function(index,item){
		vals.push($(this).val());	
	})
	var role="";
	role=$('#roleselect').val();	
	$.ajax({
	    type: "post",
	    url: "modifyrole.do",
	    data: { ids:vals.join(",") ,roleId:role},
	    dataType: "json",
	    success: function(response) {
	       alert(response.info);
		   if(response.code == 0){
			   window.location.reload();
		   }
	    }
	});
})



$("#passwdset").click(function(){ 
	var vals =[];
	$('tbody tr input:Checkbox:checked').each(function(index,item){
		vals.push($(this).val());	
	})
	var passwd=$('#passwdvalue').val();	
	$.ajax({
	    type: "post",
	    url: "resetpasswd.do",
	    data: { ids:vals.join(",") ,passwd:passwd},
	    dataType: "json",
	    success: function(response) {
	       alert(response.info);
		   if(response.code == 0){
			   window.location.reload();
		   }
	    }
	});
})







$("#btAdd").click(function(){
	ShowDiv('MyDiv','fade');
})


    fillProvince(); //璋冪敤鍑芥暟锛屽～鍏呯渷浠戒笅鎷夋
	fillProvince2();
    /**
     * 鐪佷唤涓嬫媺妗嗛€夋嫨鍙戠敓鏀瑰彉浜嬩欢锛�
     * 娓呯┖鍩庡競涓嬫媺妗嗛€夐」锛屽鍔犻粯璁ゆ彁绀洪」
     * 妫€鏌ユ槸鍚﹂€夋嫨浜嗙渷浠斤紝娌℃湁閫夋嫨鍒欑粰鍑洪敊璇彁绀哄苟杩斿洖
     * 鍚﹀垯锛屾竻闄ら敊璇彁绀轰俊鎭紝鏌ヨ琚€夋嫨鐪佷唤瀵瑰簲鐨勫煄甯備俊鎭紝澧炲姞鍒板煄甯備笅鎷夋鐨勯€夋嫨鍒楄〃涓�
     */
    $("#province").change(function(e) {
        if ($(this).val() == "") {
            $("#provinceError").css("color", " #c00202");
            $("#provinceError").text("省份不能为空");
            return;
        }
        province_correct = true;
        $("#provinceError").text("");
        $("#city").empty();
        $("#city").append($("<option>").val("").text("请选择城市"));

        var provinceCode = $("#province").val();
        $.ajax({
            type: "post",
            url: "queryProvinceCity.do",
            data: { provinceCode: provinceCode },
            dataType: "json",
            success: function(response) {
                for (index = 0; index < response.length; index++) {
                    var option = $("<option>").val(response[index].cityCode)
                        .text(response[index].cityName);
                    $("#city").append(option);
                }
            }
        });
    });

    $("#province").blur(function(e) {
        if ($(this).val() == "") {
            $("#provinceError").css("color", " #c00202");
            $("#provinceError").text("省份不能为空");
        } else {
            $("#provinceError").text("");
            province_correct = true;
        }
    });

    /**
     * 鍩庡競涓嬫媺妗嗛€夋嫨椤瑰彉鍖栦簨浠讹細妫€鏌ユ槸鍚﹂€夋嫨浜嗗煄甯�
     */
    $("#city").blur(function(e) {
        if ($(this).val() == "") {
            $("#cityError").css("color", " #c00202");
            $("#cityError").text("城市不能为空");
        } else {
            $("#cityError").text("");
            city_correct = true;
        }
    });

    //鐢ㄦ埛鍚嶈緭鍏ユ绂诲紑浜嬩欢
    $('#userName').blur(function(event) {
        if ($(this).val() == "") {
            $("#userNameError").css("color", " #c00202");
            $("#userNameError").text("用户名不能为空");
            return;
        }
        if (/^[a-zA-Z][a-zA-Z\d]{3,14}$/.test(this.value) == false) {
            $("#userNameError").css("color", " #c00202");
            $("#userNameError").text("用户名只能使用英文字母和数字，以字母开头，长度为4到15个字符");
            return;
        }
        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { userName: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#userNameError").css("color", "green");
                    $("#userNameError").text("用户名可以使用");
                    userName_correct = true;
                } else {
                    $("#userNameError").css("color", "#c00202");
                    $("#userNameError").text("用户名已存在");
                }
            }
        });
    });
    /**
     * 鐪熷疄濮撳悕杈撳叆妗嗙寮€浜嬩欢
     * 浣跨敤姝ｅ垯琛ㄨ揪寮忚〃杈惧紡妫€鏌ヨ緭鍏ユ槸鍚︾鍚堣姹傦紙蹇呴』涓轰腑鏂囷紝闀垮害2-4锛�
     */
    $('#chrName').blur(function(event) {
        if ($(this).val() == "") {
            $("#chrNameError").css("color", " #c00202");
            $("#chrNameError").text("姓名不能为空");
            return;
        }
        if (/^[\u4e00-\u9fa5]{2,4}$/.test(this.value) == false) {
            $("#chrNameError").css("color", " #c00202");
            $("#chrNameError").text("真实姓名只能是2-4长度的中文");
        } else {
            chrName_correct = true;
            $("#chrNameError").text("");
        }
    });
    /**
     * 閭鍦板潃杈撳叆妗嗙寮€浜嬩欢
     * (1)浣跨敤姝ｅ垯琛ㄨ揪寮忚〃杈惧紡妫€鏌ヨ緭鍏ユ槸鍚︾鍚堣姹�
     * (2)浣跨敤ajax妫€鏌ラ偖绠卞湴鍧€鏄惁宸插瓨鍦�
     */
    $("#mail").blur(function(event) {
        if ($(this).val() == "") {
            $("#mailError").css("color", " #c00202");
            $("#mailError").text("邮箱不能为空");
            return;
        }
        if (/^[a-zA-Z0-9]+([._\\]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.value) == false) {
            $("#mailError").css("color", " #c00202");
            $("#mailError").text("邮箱地址格式不正确");
            return;
        }

        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { mail: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#mailError").css("color", "green");
                    $("#mailError").text("邮箱可以使用");
                    mail_correct = true;
                } else {
                    $("#mailError").css("color", "#c00202");
                    $("#mailError").text("此邮箱已被注册");
                }
            }
        });
    });

    //瀵嗙爜杈撳叆妗嗙寮€浜嬩欢锛�
    $("#password").blur(function() {
        var password_min_length = 4
        if ($("#password").val().length >= password_min_length) {
            $("#passwordError").css("color", "green");
            $("#passwordError").text("密码可以使用");
            password_correct = true;
        } else {
            $("#passwordError").css("color", "#c00202");
            $("#passwordError").text("密码最小长度为4");
        }
    });

    //纭瀵嗙爜绂诲紑浜嬩欢
    $("#password1").blur(function() {
        var password_min_length = 4;
        if ($("#password").val() == $("#password1").val() && $("#password").val().length >= password_min_length) {
            $("#password1Error").css("color", "green");
            $("#password1Error").text("密码可以使用");
            password1_correct = true;
        } else {
            $("#password1Error").css("color", "#c00202");
            $("#password1Error").text("密码不一致或长度不够");

        }
    });
	$("#btLogin").click(function(e) {
	    if (userName_correct && chrName_correct && mail_correct && province_correct && city_correct && password_correct && password1_correct) {
	        $.ajax({
	            type: "post",
	            url: "register.do",
	            data: $("#registerForm").serialize(), //灏嗚〃鍗曞唴瀹瑰簭鍒楀寲鎴愪竴涓猆RL 缂栫爜瀛楃涓�
	            dataType: "json",
	            success: function(response) {
	                if (response.code == 0) {
	                    alert("注册成功");
	                   CloseAll();
					   init();
	                }
	            }
	        });
	    } else {
	        $("#userName").blur();
	        $('#chrName').blur();
	        $("#mail").blur();
	        $("#password").blur();
	        $("#password1").blur();
	        $("#province").blur();
	        $("#city").blur();
	    }
	});






    $("#province2").change(function(e) {
        if ($(this).val() == "") {
            $("#provinceError2").css("color", " #c00202");
            $("#provinceError2").text("省份不能为空");
            return;
        }
        province_correct = true;
        $("#provinceError2").text("");
        $("#city2").empty();
        $("#city2").append($("<option>").val("").text("请选择城市"));

        var provinceCode = $("#province2").val();
        $.ajax({
            type: "post",
            url: "queryProvinceCity.do",
            data: { provinceCode: provinceCode },
            dataType: "json",
            success: function(response) {
                for (index = 0; index < response.length; index++) {
                    var option = $("<option>").val(response[index].cityCode)
                        .text(response[index].cityName);
                    $("#city2").append(option);
                }
            }
        });
    });

    $("#province2").blur(function(e) {
        if ($(this).val() == "") {
            $("#provinceError2").css("color", " #c00202");
            $("#provinceError2").text("省份不能为空");
        } else {
            $("#provinceError2").text("");
            province_correct = true;
        }
    });

    /**
     * 鍩庡競涓嬫媺妗嗛€夋嫨椤瑰彉鍖栦簨浠讹細妫€鏌ユ槸鍚﹂€夋嫨浜嗗煄甯�
     */
    $("#city2").blur(function(e) {
        if ($(this).val() == "") {
            $("#cityError2").css("color", " #c00202");
            $("#cityError2").text("城市不能为空");
        } else {
            $("#cityError2").text("");
            city_correct = true;
        }
    });

    //鐢ㄦ埛鍚嶈緭鍏ユ绂诲紑浜嬩欢
    $('#userName2').blur(function(event) {
        if ($(this).val() == "") {
            $("#userNameError2").css("color", " #c00202");
            $("#userNameError2").text("用户名不能为空");
            return;
        }
        if (/^[a-zA-Z][a-zA-Z\d]{3,14}$/.test(this.value) == false) {
            $("#userNameError2").css("color", " #c00202");
            $("#userNameError2").text("用户名只能使用英文字母和数字，以字母开头，长度为4到15个字符");
            return;
        }
        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { userName: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#userNameError2").css("color", "green");
                    $("#userNameError2").text("用户名可以使用");
                    userName_correct = true;
                } else {
                    $("#userNameError2").css("color", "#c00202");
                    $("#userNameError2").text("用户名已存在");
                }
            }
        });
    });
    /**
     * 鐪熷疄濮撳悕杈撳叆妗嗙寮€浜嬩欢
     * 浣跨敤姝ｅ垯琛ㄨ揪寮忚〃杈惧紡妫€鏌ヨ緭鍏ユ槸鍚︾鍚堣姹傦紙蹇呴』涓轰腑鏂囷紝闀垮害2-4锛�
     */
    $('#chrName2').blur(function(event) {
        if ($(this).val() == "") {
            $("#chrNameError2").css("color", " #c00202");
            $("#chrNameError2").text("姓名不能为空");
            return;
        }
        if (/^[\u4e00-\u9fa5]{2,4}$/.test(this.value) == false) {
            $("#chrNameError2").css("color", " #c00202");
            $("#chrNameError2").text("真实姓名只能是2-4长度的中文");
        } else {
            chrName_correct = true;
            $("#chrNameError2").text("");
        }
    });
    /**
     * 閭鍦板潃杈撳叆妗嗙寮€浜嬩欢
     * (1)浣跨敤姝ｅ垯琛ㄨ揪寮忚〃杈惧紡妫€鏌ヨ緭鍏ユ槸鍚︾鍚堣姹�
     * (2)浣跨敤ajax妫€鏌ラ偖绠卞湴鍧€鏄惁宸插瓨鍦�
     */
    $("#mail2").blur(function(event) {
        if ($(this).val() == "") {
            $("#mailError2").css("color", " #c00202");
            $("#mailError2").text("邮箱不能为空");
            return;
        }
        if (/^[a-zA-Z0-9]+([._\\]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.value) == false) {
            $("#mailError2").css("color", " #c00202");
            $("#mailError2").text("邮箱地址格式不正确");
            return;
        }

        $.ajax({
            type: "post",
            url: "checkExist.do",
            data: { mail: $(this).val() },
            dataType: "json",
            success: function(response) {
                if (response.code == 0) {
                    $("#mailError2").css("color", "green");
                    $("#mailError2").text("邮箱可以使用");
                    mail_correct = true;
                } else {
                    $("#mailError2").css("color", "#c00202");
                    $("#mailError2").text("此邮箱已被注册");
                }
            }
        });
    });

    //瀵嗙爜杈撳叆妗嗙寮€浜嬩欢锛�
    $("#password2").blur(function() {
        var password_min_length = 4
        if ($("#password2").val().length >= password_min_length) {
            $("#passwordError2").css("color", "green");
            $("#passwordError2").text("密码可以使用");
            password_correct = true;
        } else {
            $("#passwordError2").css("color", "#c00202");
            $("#passwordError2").text("密码最小长度为4");
        }
    });

    //纭瀵嗙爜绂诲紑浜嬩欢
    $("#password12").blur(function() {
        var password_min_length = 4;
        if ($("#password2").val() == $("#password1").val() && $("#password").val().length >= password_min_length) {
            $("#password1Error2").css("color", "green");
            $("#password1Error2").text("密码可以使用");
            password1_correct = true;
        } else {
            $("#password1Error2").css("color", "#c00202");
            $("#password1Error2").text("密码不一致或长度不够");

        }
    });
	$("#btLogin2").click(function(e) {
	    if (province_correct && city_correct) {
	        $.ajax({
	            type: "post",
	            url: "userupdate.do",
	            data: $("#updateForm").serialize(), //灏嗚〃鍗曞唴瀹瑰簭鍒楀寲鎴愪竴涓猆RL 缂栫爜瀛楃涓�
	            dataType: "json",
	            success: function(response) {
	                if (response.code == 0) {
	                    alert("注册成功");
	                   CloseAll();
					   init();
	                }
	            }
	        });
	    } else {
	        $("#userName2").blur();
	        $('#chrName2').blur();
	        $("#mail2").blur();
	        $("#password2").blur();
	        $("#password12").blur();
	        $("#province2").blur();
	        $("#city2").blur();
	    }
	});


})