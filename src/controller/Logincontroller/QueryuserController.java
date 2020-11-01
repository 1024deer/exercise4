package controller.Logincontroller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import vo.Page;
import vo.User;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.UserDao;

public class QueryuserController extends HttpServlet {

	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	String queryParams = request.getParameter("queryParams");
	String pageParams = request.getParameter("pageParams");
	System.out.println(queryParams);
	System.out.println(pageParams);
	Gson gson=new GsonBuilder().serializeNulls().create();
	HashMap<String,Object> mapPage =gson.fromJson(pageParams, HashMap.class);
	System.out.println(mapPage.toString());
	Page page =Page.getPageParams(mapPage);
	System.out.println(page.getPageNumber());
	System.out.println(page.getPageSize());
	System.out.println(page.getSort());
	System.out.println(page.getSortOrder());
	User user =new User();
	if(queryParams !=null	){
		user=gson.fromJson(queryParams, User.class);
		
	}
	UserDao dao =new UserDao();
	ArrayList<User> rows = dao.query(user,page);
	int total = dao.count(user,page);
	System.out.println("data number"+total);
	HashMap<String,Object> mapReturn = new HashMap<String, Object>();
	mapReturn.put("rows", rows);
	mapReturn.put("total", total);
	String jsonStr =gson.toJson(mapReturn);
	response.setContentType("text/html;charset=utf-8");
	PrintWriter out =response.getWriter();
	out.print(jsonStr);
	out.flush();
	out.close();
	
	}

}
