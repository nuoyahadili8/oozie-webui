package com.github.oozie.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.oozie.model.workflow.design.FlowApp;
import com.github.oozie.model.workflow.design.FlowLink;
import com.github.oozie.model.workflow.design.FlowNode;
import com.github.oozie.model.workflow.model.OwWorkflowApp;
import com.github.oozie.service.IWorkflowService;
import com.github.oozie.utils.OozieValidUtils;
import com.github.oozie.vo.TaskVo;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @Project:
 * @Description:
 * @Version 1.0.0
 * @Throws SystemException:
 * @Author: <li>2018/12/18/018 Administrator Create 1.0
 * @Copyright ©2018-2019 al.github
 * @Modified By:
 */
@Service
public class WorkflowService implements IWorkflowService {
    @Override
    public String workflowJsonToXml(String flowName, String flowJson) {
        FlowApp app = parseFromJson(flowJson);
        TaskVo taskVo=new TaskVo();
        taskVo.setNameEn("xx");
        OwWorkflowApp workflowApp = new OwWorkflowApp();
        try {
            workflowApp = app.createOwWorkflowApp(taskVo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return workflowApp.toXml();
    }

    @Override
    public String validJson(String flowName,String flowJson) {
        FlowApp app = parseFromJson(flowJson);
        OwWorkflowApp workflowApp = new OwWorkflowApp();
        TaskVo taskVo=new TaskVo();
        taskVo.setNameEn(flowName);
        try {
            workflowApp = app.createOwWorkflowApp(taskVo);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String owVaildStr = workflowApp.valid();
        if (owVaildStr != null){
            return owVaildStr;
        }

        String flowXml = workflowApp.toXml();
        return OozieValidUtils.isValidXml(flowXml);
    }

    private FlowApp parseFromJson(String flowJson) {
        JSONObject flowObj = JSON.parseObject(flowJson);
        JSONArray nodeArray = flowObj.getJSONArray("node");
        JSONArray linkArray = flowObj.getJSONArray("linkarray");

        Map<Integer, FlowNode> nodes = new HashMap<Integer, FlowNode>();
        Set<FlowLink> links = new HashSet<FlowLink>();

        for (int i = 0; i < nodeArray.size(); i++) {
            FlowNode node = JSON.toJavaObject(nodeArray.getJSONObject(i), FlowNode.class);
            nodes.put(node.getNodeid(), node);
        }
        for (int i = 0; i < linkArray.size(); i++) {
            FlowLink link = JSON.toJavaObject(linkArray.getJSONObject(i), FlowLink.class);
            links.add(link);
        }
        return new FlowApp(nodes, links);
    }
}
