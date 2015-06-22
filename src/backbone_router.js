AppRouter = Backbone.Router.extend({
  routes: {
    '': 'list_issues',
    "issue": 'list_issues',
    "issue/new": 'create_issue',
    'issue/:id': 'display_issue',
    '*actions': 'defaultAction'
  },
}