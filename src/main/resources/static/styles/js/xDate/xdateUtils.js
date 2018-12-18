function truncatDateStart(date, cycle) { /* 0秒、1分、2时、3日、4月、5周、6批次 */
	var xDate_this = new XDate(date);
	if (cycle == '0') {
		xDate_this.setSeconds(0);
		return xDate_this;
	} else if (cycle == '1') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		return xDate_this;
	} else if (cycle == '2') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		return xDate_this;
	} else if (cycle == '3') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setSeconds(-86400);
		return xDate_this;
	} else if (cycle == '4') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		return xDate_this;
	} else if (cycle == '5') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.setMonth(0);
		return xDate_this;
	} else if (cycle == '6') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		return xDate_this;
	}
}

function truncatDateEnd(date, cycle) {
	var xDate_this = new XDate(date);
	if (cycle == '0') {
		xDate_this.setSeconds(59);
		return xDate_this;
	} else if (cycle == '1') {
		xDate_this.setSeconds(59);
		xDate_this.setMinutes(59);
		xDate_this.setHours(23);
		return xDate_this;
	} else if (cycle == '2') {
		xDate_this.setSeconds(59);
		xDate_this.setMinutes(59);
		return xDate_this;
	} else if (cycle == '3') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.addMonths(1);
		xDate_this.setSeconds(-1);
		return xDate_this;
	} else if (cycle == '4') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.addMonths(1);
		xDate_this.setSeconds(-1);
		return xDate_this;
	} else if (cycle == '5') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.setMonth(0);
		xDate_this.addYears(1);
		xDate_this.setSeconds(-1);
		return xDate_this;
	} else if (cycle == '6') {
		xDate_this.setSeconds(59);
		xDate_this.setMinutes(59);
		xDate_this.setHours(23);
		return xDate_this;
	}
}

function truncatLastDateEnd(date, cycle) {
	var xDate_this = new XDate(date);
	if (cycle == '0') {
		xDate_this.setSeconds(59);
		return xDate_this;
	} else if (cycle == '1') {
		xDate_this.setSeconds(-300);
		return xDate_this;
	} else if (cycle == '2') {
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		return xDate_this;
	} else if (cycle == '3') {
		xDate_this.addMonths(0);
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setSeconds(-86401);
		return xDate_this;
	} else if (cycle == '4') {
		xDate_this.addMonths(0);
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.setSeconds(-1);
		return xDate_this;
	} else if (cycle == '5') {
		xDate_this.addYears(1);
		xDate_this.setSeconds(0);
		xDate_this.setMinutes(0);
		xDate_this.setHours(0);
		xDate_this.setDate(1);
		xDate_this.setMonth(0);
		xDate_this.setSeconds(-1);
		return xDate_this;
	} else if (cycle == '6') {
		xDate_this.setSeconds(59);
		xDate_this.setMinutes(59);
		xDate_this.setHours(23);
		return xDate_this;
	}
}

function formatDatetime19(datetime) {
	var xDate_this = new XDate(datetime);
	return xDate_this.toString("yyyy-MM-dd HH:mm:ss");
}
