package com.github.oozie.vo;

public class GlobalVo {
	
	private String id;
	private String global_nameen;
	private String global_namecn;
	private String job_tracker;
	private String name_node;
	private String job_xml;
	private String configuration;
	private String create_user;
	private String create_date;
	private String update_user;
	private String update_date;
	private String tenant;
	
	public String getGlobal_nameen() {
		return global_nameen;
	}
	public void setGlobal_nameen(String global_nameen) {
		this.global_nameen = global_nameen;
	}
	public String getGlobal_namecn() {
		return global_namecn;
	}
	public void setGlobal_namecn(String global_namecn) {
		this.global_namecn = global_namecn;
	}
	public String getTenant() {
		return tenant;
	}
	public void setTenant(String tenant) {
		this.tenant = tenant;
	}
	public String getCreate_user() {
		return create_user;
	}
	public void setCreate_user(String create_user) {
		this.create_user = create_user;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getUpdate_user() {
		return update_user;
	}
	public void setUpdate_user(String update_user) {
		this.update_user = update_user;
	}
	public String getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(String update_date) {
		this.update_date = update_date;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getJob_tracker() {
		return job_tracker;
	}
	public void setJob_tracker(String job_tracker) {
		this.job_tracker = job_tracker;
	}
	public String getName_node() {
		return name_node;
	}
	public void setName_node(String name_node) {
		this.name_node = name_node;
	}
	public String getJob_xml() {
		return job_xml;
	}
	public void setJob_xml(String job_xml) {
		this.job_xml = job_xml;
	}
	public String getConfiguration() {
		return configuration;
	}
	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

}
