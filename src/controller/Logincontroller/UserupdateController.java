package controller.Logincontroller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vo.Page;
import vo.User;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.ProvinceCityDao;
import dao.UserDao;

public class UserupdateController extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String userName = request.getParameter("userName");
		String chrName = request.getParameter("chrName");
		String mail = request.getParameter("mail");
		String provinceCode = request.getParameter("provinceCode");
		String cityCode = request.getParameter("cityCode");
		String password = request.getParameter("password");
		ProvinceCityDao pcdao =new ProvinceCityDao();
		
		String provincename=pcdao.getProvinceName(Integer.parseInt(provinceCode));
		String cityname=pcdao.getCityName(Integer.parseInt(cityCode));
		User user =new User(userName,password,chrName,mail,provincename,cityname);
		Map<String,Object> map =new HashMap<String, Object>();
		UserDao dao =new UserDao();
		if(dao.update(user)){
			
			map.put("code", 0);
			map.put("info", "修改成功");
		}
		else{
			map.put("code", 1);
			map.put("info", "修改失败");
		}
		String jsonStr =new Gson().toJson(map);
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out =response.getWriter();
		out.print(jsonStr);
		out.flush();
		out.close();
	}

}
