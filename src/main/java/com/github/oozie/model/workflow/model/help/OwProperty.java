package com.github.oozie.model.workflow.model.help;

import java.util.ArrayList;
import java.util.List;
import org.dom4j.Element;

public class OwProperty {
	private String name;
	private String value;
	private String description;

	public static List<OwProperty> parseXml(List<Element> propEs) {
		List<OwProperty> props = new ArrayList<OwProperty>();
		for (Element e : propEs) {
			OwProperty op = new OwProperty();
			op.name = e.elementText("name");
			op.value = e.elementText("value");
			op.description = e.elementText("description");
			props.add(op);
		}
		return props;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
