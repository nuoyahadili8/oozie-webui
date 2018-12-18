package com.github.oozie.model.workflow.model.help;

import java.util.ArrayList;
import java.util.List;

import org.dom4j.Element;

public class OwMkdir extends OwAbstractPrepare{

	public OwMkdir(String path) {
		super(path);
	}

	@Override
	public String toString() {
		return "OwMkdir [path=" + path + "]";
	}

	public static List<OwMkdir> parseXml(List<Element> mes) {
		List<OwMkdir> mkdirs =new ArrayList<OwMkdir>();
		for(Element me:mes){
			OwMkdir mk = new OwMkdir(me.attributeValue("path"));
			mkdirs.add(mk);
		}
		return mkdirs;
	}
	
}
