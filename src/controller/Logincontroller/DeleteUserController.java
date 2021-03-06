package controller.Logincontroller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.UserDao;

public class DeleteUserController extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String ids = request.getParameter("ids");
		String[] result = ids.split(",");
		for (int r=0;r<result.length;r++) {
		System.out.println("分割结果是: " + result[r]);
		}
		UserDao userdao = new UserDao();
		Map<String,Object> map =new HashMap<String, Object>();
		if(userdao.delete(ids)){
			map.put("code", 0);
			map.put("info", "删除成功");
		}else{
			map.put("code", 1);
			map.put("info", "删除失败");
		}
		String jsonStr =new Gson().toJson(map);
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out =response.getWriter();
		out.print(jsonStr);
		out.flush();
		out.close();
	}

}
