package com.github.oozie.service;

/**
 * @Project:
 * @Description:
 * @Version 1.0.0
 * @Throws SystemException:
 * @Author: <li>2018/12/18/018 Administrator Create 1.0
 * @Copyright ©2018-2019 al.github
 * @Modified By:
 */
public interface IWorkflowService {

    String workflowJsonToXml(String flowName, String flowJson);
}
