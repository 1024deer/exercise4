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

public class SetPasswdController extends HttpServlet {

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String ids = request.getParameter("ids");
		String passwd = request.getParameter("passwd");
		String[] result = ids.split(",");
		UserDao userdao = new UserDao();
		Map<String,Object> map =new HashMap<String, Object>();
		map.put("code", 1);
		map.put("info", "ɾ��ʧ��");
		for (int i=0;i<result.length;i++) {
			System.out.println("�ָ�����: " + result[i]);
			userdao.updatebyUsername(result[i], passwd);
		}
		map.put("code", 0);
		map.put("info", "�޸ĳɹ�");
		String jsonStr =new Gson().toJson(map);
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out =response.getWriter();
		out.print(jsonStr);
		out.flush();
		out.close();
	}

}
