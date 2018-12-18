package com.github.oozie.model.workflow.model.help;

import java.util.List;
import org.dom4j.Element;
import com.thoughtworks.xstream.annotations.XStreamImplicit;

public class OwConfiguration {

	@XStreamImplicit(itemFieldName = "property")
	private List<OwProperty> propertys;

	public List<OwProperty> getPropertys() {
		return propertys;
	}

	public void setPropertys(List<OwProperty> propertys) {
		this.propertys = propertys;
	}

	public static OwConfiguration parseXml(Element element) {
		OwConfiguration oc = new OwConfiguration();
		List<Element> propEs = element.elements("property");
		oc.propertys = OwProperty.parseXml(propEs);
		return oc;
	}
}
