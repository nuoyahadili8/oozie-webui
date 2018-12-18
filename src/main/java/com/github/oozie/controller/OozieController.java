package com.github.oozie.controller;

import com.github.oozie.service.IWorkflowService;
import com.github.oozie.vo.TaskVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
}
