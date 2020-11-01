 <%@ page language="java" import="java.util.*"  contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>主页</title>
    <base href="<%=basePath%>">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/usermanage.css">
	<script src="js/jquery-3.5.0.min.js"></script>

  </head>
  
  <body style="background-image: url(images/bg.png);">
   <div id="head">
   	<div id="logo">
   		<img src="images/logo.png"/>
   	</div>
   	<div>
   		<div id="userinfo">     
   		<span>欢迎你： ${chrName} 
	
		</span><a href="servlet/LogoutController.do">【安全退出】</a>
   		</div>
   		<div id="daohang">
			<ul>
				<li><a class="aaa"  href="user.jsp">个人中心</a></li>
				<li><a class="aaa"  href="downloadManage.jsp">资源管理</a></li>
				<li><a class="aaa"  href="userManage.jsp">用户管理</a></li>
				<li><a class="aaa" href="download.jsp">资源下载</a></li>
				<li><a class="aaa" href="main.jsp">首页</a></li>
			</ul>
   		</div>
   	</div>
   </div>
   </div>
   	<div id="content">
		
		<div id="search"> 
			<form id="searchform">
				<input type="text" name="userName"  id="serch_userName" placeholder="输入用户名"/>
				<input type="text" name="chrName"  id="serch_chrName" placeholder="输入姓名"/>
				<input type="text" name="mail"  id="serch_mail" placeholder="输入邮箱地址"/>
				<input type="text" name="provinceName"  id="serch_provinceName" placeholder="输入省份"/>
			</form>
			<div id="bt">
				<a class="inlinebn" href="javascript:;" id="btSearch" style="background:url(images/search.png) left top no-repeat; background-size:contain; font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;查找</a>
				<a class="inlinebn" href="javascript:;" id="btClear" style="background:url(images/reset.png) left top no-repeat; background-size:contain; font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;清空</a>
				<a  class="inlinebn" href="javascript:;" id="btAdd" style="background:url(images/add.png) left top no-repeat; background-size:contain; font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;增加</a>
				<a  class="inlinebn" href="javascript:;" id="btDelete" style="background:url(images/d.png) left top no-repeat; background-size:contain; font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;删除</a>
				<a  class="inlinebn" href="javascript:;" id="btUpdate" style="background:url(images/modify.png) left top no-repeat; background-size:contain; font-size: 20px;">&nbsp;&nbsp;&nbsp;&nbsp;修改</a>
			</div>
		</div>
		<div style="clear: both;"></div>
		
			<table border="1" cellspacing="0" cellpadding="">
				<thead>
					<tr>
						<th width="40"><input type="checkbox" id="ckall" title="选择"/> </th>
						<th id="sortby1"  width="150" style="background:url(images/both.png) right  no-repeat; background-size:contain;">用户名</th>
						<th width="70">真实姓名</th>
						<th width="250" >邮箱</th>
						<th id="sortby2" width="75" style="background:url(images/both.png) right  no-repeat; background-size:contain;">省份</th>
						<th width="60">城市</th>
						<th width="150">操作</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
			
		
		<div id="page">
			<div class="pageSize">
				显示
				<select id="pageSize">
					<option>5</option>
					<option>10</option>
					<option>20</option>
					<option>50</option>
				</select>条&nbsp;&nbsp;第
				<span id="pageNumber"></span>页/共<span id="pageCount"></span>页
			</div>
			<div>
				<a id="first" href="javascript:;">首页</a>
				<a id="back" href="javascript:;">上一页</a>
				<a id="next" href="javascript:;">下一页</a>
				<a id="last" href="javascript:;">尾页</a>
			</div>
				
		</div>
		
	</div>
	<div id="fade" class="black_ovelay" onclick="CloseAll()"></div>
	<div id="MyDiv" class="while_content">
		<div style="text-align: right; height: 20px;">
			<span style="font-size: 24px; cursor: pointer;" title="点击关闭"; onclick="CloseDiv('MyDiv','fade')"><img src="images/x.png" style="width: 50px; height: 50px;"/> </span>
		</div>
			<div class="popForm">
		       <div class="title">
		           <span class="titleRegister" style="text-align: center; margin-left: 35%;">增加用户</span>
		           
		       </div>
		       <form id="registerForm" class="registerForm">
		           <p><input id="userName" name="userName" type="text" placeholder="用户名" />
		               <span class="auth_err" id="userNameError"></span>
		           </p>
		           <p><input id="chrName" name="chrName" type="text" placeholder="真实姓名" />
		               <span class="auth_err" id="chrNameError"></span>
		           </p>
		           <p><input id="mail" name="mail" type="text" placeholder="邮箱" />
		               <span class="auth_err" id="mailError"></span>
		           </p>
		           <p> <select id="province" name="provinceCode">
				         			        <option value="">请选择省份</option>
				         			    </select>
		               <span class="auth_err" id="provinceError"></span>
		           </p>
		           <p> <select id="city" name="cityCode">
		                   <option value="">请选择城市</option>
		               </select>
		               <span class="auth_err" id="cityError"></span>
		           </p>
		           <p><input id="password" name="password" type="password" placeholder="密码" />
		               <span class="auth_err" id="passwordError"></span>
		           </p>
		           <p><input id="password1" name="password1" type="password" placeholder="确认密码" />
		               <span class="auth_err" id="password1Error"></span>
		           </p>
		           <p>
		               <input class="btLogin" id="btLogin" type="button" value="增加用户" />
		               <span class="auth_err" id="checkError"></span>
		           </p>
		       </form>
		   </div>   
	</div>  
	 
	 
	 <div id="updateDiv" class="while_content">
	 	<div style="text-align: right; height: 20px;">
	 		<span style="font-size: 24px; cursor: pointer;" title="点击关闭"; onclick="CloseDiv('updateDiv','fade')"><img src="images/x.png" style="width: 50px; height: 50px;"/></span>
	 	</div>
	 		<div class="popForm">
	 	       <div class="title">
	 	           <span class="titleRegister" style="text-align: center; margin-left: 35%;">修改用户</span>
	 	           
	 	       </div>
	 	       <form id="updateForm"  class="registerForm">
	 	           <p><input id="userName2" name="userName" type="text" placeholder="用户名" />
	 	               <span class="auth_err" id="userNameError2"></span>
	 	           </p>
	 	           <p><input id="chrName2" name="chrName" type="text" placeholder="真实姓名" />
	 	               <span class="auth_err" id="chrNameError2"></span>
	 	           </p>
	 	           <p><input id="mail2" name="mail" type="text" placeholder="邮箱" />
	 	               <span class="auth_err" id="mailError2"></span>
	 	           </p>
	 	           <p> <select id="province2" name="provinceCode">
	 			         			        <option value="">请选择省份</option>
	 			         			    </select>
	 	               <span class="auth_err" id="provinceError2"></span>
	 	           </p>
	 	           <p> <select id="city2" name="cityCode">
	 	                   <option value="">请选择城市</option>
	 	               </select>
	 	               <span class="auth_err" id="cityError2"></span>
	 	           </p>
	 	           <p><input id="password2" name="password" type="password" placeholder="密码" />
	 	               <span class="auth_err" id="passwordError2"></span>
	 	           </p>
	 	           <p><input id="password12" name="password1" type="password" placeholder="确认密码" />
	 	               <span class="auth_err" id="password1Error"></span>
	 	           </p>
	 	           <p>
	 	               <input class="btLogin" id="btLogin2" type="button" value="提交修改" />
	 	               <span class="auth_err" id="checkError2"></span>
	 	           </p>
	 	       </form>
	 	   </div>   
	 </div> 
	
		<div id="modifyDiv" class="while_content">
		<div style="text-align: right; height: 20px;">
			<span style="font-size: 24px; cursor: pointer;" title="点击关闭"; onclick="CloseDiv('modifyDiv','fade')"><img src="images/x.png" style="width: 50px; height: 50px;"/></span>
		</div>
			<div class="popForm">
		       <div class="title">
		           <span class="titleRegister" style="text-align: center; margin-left: 35%;">批量修改用户</span>
		           
		       </div>
		       <form id="modifyform">
						<p><input id="passwdvalue" type="text" name="passwd" placeholder="为该组用户设置密码" style="height: 25px; margin-left: 85px;"/>  </p>
						<a id="passwdset" href="javascript:;" class="modifybt">批量设置密码</a>
						<br />
				
						<p style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为该组用户设置权限角色
						<select id="roleselect" name="role">
							<option value="1">管理员</option>
							<option value="0">普通用户</option>
						</select>
						
						</p>
						<a id="roleset" href="javascript:;" class="modifybt">批量设置权限</a>
						<br />
					
						<a id="shutdownuser"  href="javascript:;" class="modifybt">批量禁用用户</a>
		       </form>
		   </div>   
	</div> 
	


		

  </body>
</html>
<script type="text/javascript" src="js/usermanage.js"></script>
