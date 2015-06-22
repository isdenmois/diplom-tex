display_issue: function(id) {
  issue = issues.get(id);
  content_element.html(template('IssledovaniaTemplate')(issue));
  issue.unset('figure');
  issue = new IssueModel({id: id});
  issue.on("sync", this.chart_update);
  issue.fetch();
},