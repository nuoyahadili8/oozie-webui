function parseMySQL(str) {
    // parses dates like "yyyy-mm-dd hh:mm:ss"
    var parts = str.split(' ');
    var dateparts = parts[0].split('-');
    var timeparts = parts[1].split(':');
    if ((dateparts.length == 3) && (timeparts.length == 3)) 
        return new XDate(
            parseInt(dateparts[0]), // year
            parseInt(dateparts[0] ? dateparts[0]-1 : 0), // month
            parseInt(dateparts[2]), // day
            parseInt(timeparts[0]), // hours
            parseInt(timeparts[1]), // minutes
            parseInt(timeparts[2])  // seconds
        );
}

XDate.parsers.push(parseMySQL);