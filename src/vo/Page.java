package vo;

import java.util.HashMap;

public class Page {
	private int pageSize;
	private int pageNumber;
	private String sort;
	private String sortOrder;
	public static Page getPageParams(HashMap<String, Object> mapPage) {
		Page page =new Page();
		page.pageNumber=Integer.parseInt((String) mapPage.get("pageNumber"));
		page.sortOrder=(String) mapPage.get("sortOrder");
		page.pageSize=Integer.parseInt((String) mapPage.get("pageSize"));
		page.sort=(String) mapPage.get("sort");
		return page;
	}
	public Page() {

	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	
}
