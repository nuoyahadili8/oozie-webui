package com.github.oozie.controller;

import com.github.oozie.service.IWorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Project:
 * @Description:
 * @Version 1.0.0
 * @Throws SystemException:
 * @Author: <li>2018/12/18/018 Administrator Create 1.0
 * @Copyright ©2018-2019 al.github
 * @Modified By:
 */
@Controller
@RequestMapping("/oozie")
public class OozieController {

    @Autowired
    private IWorkflowService workflowService;

    @ResponseBody
    @RequestMapping("/xml")
    public String getXml(){
        return "a";
    }

    @RequestMapping("/index")
    public String toPage(){
        return "index";
    }

    @RequestMapping("/timeline")
    public String toForm(){
        return "timeline";
    }

    @RequestMapping("/design")
    public String design(){
        return "design";
    }

    @RequestMapping("/getFlowXml")
    @ResponseBody
    public String getFlowXml(HttpServletRequest request, HttpServletResponse response) {
        String taskId = request.getParameter("taskId");
        String flowJson = request.getParameter("flowJson");

        String flowXml = workflowService.workflowJsonToXml(taskId, flowJson);
        // flowXml = HtmlUtils.htmlshow(flowXml);
        return flowXml;
    }

    @RequestMapping("/validFlow")
    @ResponseBody
    public String validFlow(HttpServletRequest request){
        String flowJson = request.getParameter("flowJson");

        String validStr = null;
        try {
            validStr = workflowService.validJson("xx",flowJson);
        } catch (Exception e) {
            e.printStackTrace();
            validStr = e.getMessage();
        }
        if (validStr == null) {
            validStr = "流程校验通过！";
        } else {
            validStr = "流程校验异常：" + validStr;
        }
        return validStr;
    }

}
