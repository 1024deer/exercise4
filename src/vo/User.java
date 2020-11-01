package vo;


public class User{
	private String userName;
	private String password;
	private String chrName;
	private String mail;
	private String provinceName;
	private String cityName;
	
	
	public User(String userName, String password) {
		this.userName = userName;
		this.password = password;
	}

	

	public User() {
	}

	public User(String userName, String password, String chrName) {
		this.userName = userName;
		this.password = password;
		this.chrName = chrName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getChrName() {
		return chrName;
	}

	public void setChrName(String chrName) {
		this.chrName = chrName;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}



	public User(String userName, String password, String chrName, String mail,
			String provinceName, String cityName) {
		super();
		this.userName = userName;
		this.password = password;
		this.chrName = chrName;
		this.mail = mail;
		this.provinceName = provinceName;
		this.cityName = cityName;
	}



	public String getProvinceName() {
		return provinceName;
	}



	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}



	public String getCityName() {
		return cityName;
	}



	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	
}
