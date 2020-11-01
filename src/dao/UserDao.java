package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.swing.text.html.HTMLDocument.HTMLReader.PreAction;

import com.mysql.cj.protocol.Resultset;

import tools.JDBCUtil;
import vo.Page;
import vo.User;

public class UserDao {
	public User get(String params) {
		JDBCUtil jb	=new JDBCUtil();
        Object object = null;
        User user = null;
        String sql="SELECT * FROM t_user a LEFT JOIN t_province b ON a.provinceCode=b.provinceCode LEFT JOIN t_city c ON a.cityCode=c.cityCode where username=?";
        try {    
            // 获得连接    
            Connection conn = jb.getConnection();    
                
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(sql);    
                
            // 参数赋值    
            pst.setString(1, params);    
                
            // 执行    
            ResultSet rst = pst.executeQuery();    
    
            if(rst.next()) {    
            	user =new User(rst.getString("userName"),rst.getString("password"),rst.getString("chrName"),rst.getString("mail"),rst.getString("provinceName"),rst.getString("cityName"));    
            
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
    
        
		return user;    
    }
	
	public Boolean checkUsermail(String sql, String params) {
		JDBCUtil jb	=new JDBCUtil();
        String mail=null;
        try {    
            // 获得连接    
        	 Connection conn = jb.getConnection();    
             
             // 调用SQL    
             PreparedStatement pst = conn.prepareStatement(sql);    
                 
             // 参数赋值    
             pst.setString(1, params);    
                 
             // 执行    
             ResultSet rst = pst.executeQuery();     
    
            if(rst.next()) {    
            	mail = rst.getString("mail");    
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
        if(mail!=null){
		return true;
        }
        else{
        	return false;
        }
    }
	
	
	public boolean insertUser(String sql, String[] params) {
		JDBCUtil jb	=new JDBCUtil();
		int result = 0;
        try {    
            // 获得连接    
            jb.conn = jb.getConnection();       
            // 调用SQL    
            jb.pst = jb.conn.prepareStatement(sql);       
            // 参数赋值   
            for(int i=0;i<params.length;i++){
            	jb.pst.setString(i+1, params[i]);    
            }
            // 执行    
            result = jb.pst.executeUpdate();   
     
               
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }
        if(result !=0){
        	return true; 
        }
		return false;          
    }

	public ArrayList<User> query(User user, Page page) {
		ArrayList<User> rows = new ArrayList<User>();
		StringBuffer condition =new StringBuffer();
		if (user.getUserName() != null && !"".equals(user.getUserName())) { 
			condition.append(" and userName like '%")
					.append(user.getUserName()).append("%'");
		}
		if (user.getChrName() != null && !"".equals(user.getChrName())) { 
			condition.append(" and chrName like '%").append(user.getChrName())
					.append("%'");
		}
		if (user.getMail() != null && !"".equals(user.getMail())) { 
			condition.append(" and mail like '%").append(user.getMail())
					.append("%'");
		}
		if (user.getProvinceName() != null
				&& !"".equals(user.getProvinceName())) { 
			condition.append(" and provinceName like '%")
					.append(user.getProvinceName()).append("%'");
		}
		if (user.getCityName() != null && !"".equals(user.getCityName())) { 
			condition.append(" and cityName like '%")
					.append(user.getCityName()).append("%'");
		}

		int begin = page.getPageSize() * (page.getPageNumber() - 1);
		String sql = "select userName,password,chrName,mail,A.provinceCode provinceCode,";
		sql = sql + " B.provinceName provinceName,A.cityCode cityCode,C.cityName cityName ";
		sql = sql + " from t_user A left join t_province B ";
		sql = sql + " on A.provinceCode = B.provinceCode left join t_city C on A.cityCode = C.cityCode ";
		sql = sql + " where  1=1 ";
		sql = sql + condition + " order by " + page.getSort() + " "
				+ page.getSortOrder() + " limit " + begin + ","
				+ page.getPageSize();

		System.out.println(sql);

		
		JDBCUtil jb	=new JDBCUtil();
        try {    
            // 获得连接    
        	Connection conn = jb.getConnection();    
            
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(sql);      
            ResultSet rst = pst.executeQuery();   
    
            while(rst.next()) {     
            	user =new User(rst.getString("userName"),rst.getString("password"),rst.getString("chrName"),rst.getString("mail"),rst.getString("provinceName"),rst.getString("cityName"));
            	rows.add(user);
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }
		return rows;
	}

	public int count(User user, Page page) {
		int num =0;
		ArrayList<User> rows = new ArrayList<User>();
		StringBuffer condition =new StringBuffer();
		if (user.getUserName() != null && !"".equals(user.getUserName())) { 
			condition.append(" and userName like '%")
					.append(user.getUserName()).append("%'");
		}
		if (user.getChrName() != null && !"".equals(user.getChrName())) { 
			condition.append(" and chrName like '%").append(user.getChrName())
					.append("%'");
		}
		if (user.getMail() != null && !"".equals(user.getMail())) { 
			condition.append(" and mail like '%").append(user.getMail())
					.append("%'");
		}
		if (user.getProvinceName() != null
				&& !"".equals(user.getProvinceName())) { 
			condition.append(" and provinceName like '%")
					.append(user.getProvinceName()).append("%'");
		}
		if (user.getCityName() != null && !"".equals(user.getCityName())) { 
			condition.append(" and cityName like '%")
					.append(user.getCityName()).append("%'");
		}

		int begin = page.getPageSize() * (page.getPageNumber() - 1);
		String sql = "select COUNT(userName)";
		sql = sql + " from t_user A left join t_province B ";
		sql = sql + " on A.provinceCode = B.provinceCode left join t_city C on A.cityCode = C.cityCode ";
		sql = sql + " where  1=1 ";
		sql = sql + condition + " order by " + page.getSort() + " "
				+ page.getSortOrder();

		System.out.println(sql);

		
		JDBCUtil jb	=new JDBCUtil();
        try {    
            // 获得连接    
        	Connection conn = jb.getConnection();    
            
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(sql);      
            ResultSet rst = pst.executeQuery();   
           
            if(rst.next()) {     
            	num=rst.getInt("COUNT(userName)");
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }
		return num;
	}
	
	public Boolean update(User user) {
		 String sql="UPDATE t_user SET password=?,chrName = ?,mail = ?,provinceCode = ? ,cityCode = ? WHERE userName = ?";
		 ProvinceCityDao pcdao=new ProvinceCityDao();
		 int provincecode=pcdao.getProvinceCode(user.getProvinceName());
		 int citycode=pcdao.getCityCode(user.getCityName());
		 Boolean a=false;
		 JDBCUtil jb	=new JDBCUtil();
        try {    
            // 获得连接    
            Connection conn = jb.getConnection();    
                
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(sql);    
   
            pst.setString(1, user.getPassword());
            pst.setString(2, user.getChrName());
            pst.setString(3, user.getMail());
            pst.setLong(4, provincecode);
            pst.setLong(5, citycode);
            pst.setString(6, user.getUserName());
            System.out.println("citycode"+citycode+"provincecode"+provincecode);    
            // 执行    
            a = pst.execute();    
            a=true;
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
    
        
		return a;    
    }
	
	
	public Boolean delete(String ids) {
		Boolean boo = false;
		String str="DELETE FROM t_user WHERE userName IN ('";
		String[] result = ids.split(",");
		for (int r=0;r<result.length;r++) {
		
			if(r==result.length-1){
				str=str+result[r]+"')";
			}
			else{
				str=str+result[r]+"','";
			}
		}
		JDBCUtil jb	=new JDBCUtil();
        
        try {    
            // 获得连接    
            Connection conn = jb.getConnection();    
                
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(str);    
            System.out.println("sql: " + str);    
            // 参数赋值    
 //           pst.setString(1, params);    
                
            // 执行    
            pst.execute(); 
            boo=true;
    
          
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
    
        
		return boo;    
    }
	
	
	public Boolean addrole(String username,int role) {
		Boolean boo = false;
		String str="insert into t_user_role (roleId, userName) values (?,?)";
		
		JDBCUtil jb	=new JDBCUtil();
        
        try {    
            // 获得连接    
            Connection conn = jb.getConnection();    
                
            // 调用SQL    
            PreparedStatement pst = conn.prepareStatement(str);    
            System.out.println("sql: " + str);    
            // 参数赋值    
            pst.setLong(1, role);    
            pst.setString(2, username);  
            // 执行    
            pst.execute(); 
            boo=true;
    
          
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
    
        
		return boo;    
    }
	
	public Boolean updatebyUsername(String username,String passwd) {
		 String sql="UPDATE t_user SET password=? WHERE userName=?";
		 Boolean a=false;
		 JDBCUtil jb	=new JDBCUtil();
       try {    
           // 获得连接    
           Connection conn = jb.getConnection();    
               
           // 调用SQL    
           PreparedStatement pst = conn.prepareStatement(sql);    
  
           pst.setString(1,passwd);   
           pst.setString(2,username);  
           // 执行    
           a = pst.execute();    
           a=true;
               
       } catch (SQLException e) {    
           System.out.println(e.getMessage());    
       } finally {    
       	jb.closeAll();    
       }    
   
       
		return a;    
   }
	
	
	
	
}
