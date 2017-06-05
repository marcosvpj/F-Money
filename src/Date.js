
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

Date.prototype.formatBR = function() {
  return this.getDate() + '/' + this.getMonth() + '/' + this.getFullYear();
}

Date.prototype.getWeeksDays = function(w) {
    firstDay = new Date(2017, 0, 1).getDay();
    var year = 2017;
    var week = w;
    var d = new Date("Jan 01, "+year+" 01:00:00");
    var w = d.getTime() -(3600000*24*(firstDay-1))+ 604800000 * (week-1)
    var n1 = new Date(w);
    var n2 = new Date(w + 518400000)

    return [n1, n2];
}