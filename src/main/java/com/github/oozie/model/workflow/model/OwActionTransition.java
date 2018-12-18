package com.github.oozie.model.workflow.model;

import org.dom4j.Element;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

public class OwActionTransition {
	@XStreamAsAttribute
	private String to;

	public static OwActionTransition parseXml(Element e) {
		OwActionTransition ok = new OwActionTransition();
		ok.to = e.attributeValue("to");
		return ok;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}
}
