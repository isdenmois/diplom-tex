list_issues: function() {
  issues.fetch();
  issues_view = new IssueListView({collection: issues});
  content_element.html(issues_view.render().$el);

  issues_view.on('route', function() {
    delete issues_view;
  });
},