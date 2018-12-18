package com.github.oozie.model.workflow.model.help;

import java.util.ArrayList;
import java.util.List;

import org.dom4j.Element;

public class OwDelete extends OwAbstractPrepare {

	public OwDelete(String path) {
		super(path);
	}


	@Override
	public String toString() {
		return "OwDelete [path=" + path + "]";
	}

	public static List<OwDelete> parseXml(List<Element> des) {
		List<OwDelete> dels = new ArrayList<OwDelete>();
		for (Element de : des) {
			OwDelete del = new OwDelete(de.attributeValue("path"));
			dels.add(del);
		}
		return dels;
	}

}
