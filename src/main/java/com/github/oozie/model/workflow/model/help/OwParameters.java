package com.github.oozie.model.workflow.model.help;

import java.util.List;
import org.dom4j.Element;
import com.thoughtworks.xstream.annotations.XStreamImplicit;

public class OwParameters {
	@XStreamImplicit(itemFieldName = "property")
	private List<OwProperty> propertys;

	public static OwParameters parseXml(Element parasElm) {
		OwParameters owp = new OwParameters();
		List<Element> propEs = parasElm.elements("property");
		owp.propertys = OwProperty.parseXml(propEs);
		return owp;
	}

	public List<OwProperty> getPropertys() {
		return propertys;
	}

	public void setPropertys(List<OwProperty> propertys) {
		this.propertys = propertys;
	}
}
