package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import tools.JDBCUtil;
import vo.City;
import vo.Province;
import vo.User;

public class ProvinceCityDao {
	public ArrayList<City> querycity(String sql,String param){
		JDBCUtil jb	=new JDBCUtil();
		ArrayList<City> list =new ArrayList<City>();
       try {
        	jb.conn = jb.getConnection();
			jb.pst = jb.conn.prepareStatement(sql);
			jb.pst.setString(1, param);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       try {
		jb.rst = jb.pst.executeQuery();
		 while(jb.rst.next()) { 
	    	   City city =new City(jb.rst.getString("cityName"), jb.rst.getInt("cityCode"),jb.rst.getInt("provinceCode"));
	           list.add(city);    
	       }
		 jb.closeAll();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}    
      return list;
	}


	
	public ArrayList<Province> queryProvince(String sql){
		JDBCUtil jb	=new JDBCUtil();
		ArrayList<Province> list =new ArrayList<Province>();
       try {
        	jb.conn = jb.getConnection();
			jb.pst = jb.conn.prepareStatement(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       try {
		jb.rst = jb.pst.executeQuery();
		 while(jb.rst.next()) { 
	    	   Province pro =new Province(jb.rst.getString("provinceName"), jb.rst.getInt("provinceCode"));
	           list.add(pro);    
	       }
		 jb.closeAll();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}    
      return list;
	}
	public int getProvinceCode(String params) {
		int code=0;
		JDBCUtil jb	=new JDBCUtil();
        String sql="SELECT * FROM t_province WHERE provinceName=?";
        try {        
            Connection conn = jb.getConnection();      
            PreparedStatement pst = conn.prepareStatement(sql);    
            pst.setString(1, params);    
            ResultSet rst = pst.executeQuery();    
            if(rst.next()) {   
            	code=rst.getInt("provinceCode");
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
		return code;    
    }
	public int getCityCode(String params) {
		int code=0;
		JDBCUtil jb	=new JDBCUtil();
        String sql="SELECT * FROM t_city WHERE cityName=?";
        try {        
            Connection conn = jb.getConnection();      
            PreparedStatement pst = conn.prepareStatement(sql);    
            pst.setString(1, params);    
            ResultSet rst = pst.executeQuery();    
            if(rst.next()) {   
            	code=rst.getInt("cityCode");
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
		return code;    
    }
	
	public String getProvinceName(int code) {
		String res=null;
		JDBCUtil jb	=new JDBCUtil();
        String sql="SELECT * FROM t_province WHERE provinceCode=?";
        try {        
            Connection conn = jb.getConnection();      
            PreparedStatement pst = conn.prepareStatement(sql);    
            pst.setLong(1, code);    
            ResultSet rst = pst.executeQuery();    
            if(rst.next()) {   
            	res=rst.getString("provinceName");
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
		return res;    
    }
	public String getCityName(int code) {
		String res=null;
		JDBCUtil jb	=new JDBCUtil();
        String sql="SELECT * FROM t_city WHERE cityCode=?";
        try {        
            Connection conn = jb.getConnection();      
            PreparedStatement pst = conn.prepareStatement(sql);    
            pst.setLong(1, code);    
            ResultSet rst = pst.executeQuery();    
            if(rst.next()) {   
            	res=rst.getString("cityName");
            }    
                
        } catch (SQLException e) {    
            System.out.println(e.getMessage());    
        } finally {    
        	jb.closeAll();    
        }    
		return res;    
    }
	
}
