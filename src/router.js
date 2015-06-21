/**
 * Created by isden on 23.02.15.
 */

var content_element = $('#content');

window.template = function(id) {
  return _.template( $('#' + id).html() );
};

var IssueModel = Backbone.Model.extend({
  defaults: {
    name: 'test',
    exp: [],
    disp: []
  },
  urlRoot: '/issue'
});

var IssueCollection = Backbone.Collection.extend({
  model: IssueModel,
  url: '/issue'
});

issues = new IssueCollection();

var IssueListView = Backbone.View.extend({
  tagName: 'ol',
  template: template('issue_list_elem_template'),

  initialize: function() {
    this.collection.on('add', this.add_one, this);
    this.collection.on('remove', this.render, this);
  },
  render: function() {
    this.$el.html('');
    this.collection.each(this.add_one, this);
    return this;
  },
  add_one: function(issue) {
    var elem = this.template(issue.toJSON());

    this.$el.append(elem);
    return this;
  }
});

AppRouter = Backbone.Router.extend({
  routes: {
    '': 'list_issues',
    "issue": 'list_issues', // /#/clients
    "issue/new": 'create_issue',
    'issue/:id': 'display_issue',
    // any other action defaults to the following handler
    '*actions': 'defaultAction'
  },
  list_issues: function() {

    issues.fetch();
    issues_view = new IssueListView({collection: issues});
    content_element.html(issues_view.render().$el);

    issues_view.on('route', function() {
      delete issues_view;
    });
  },
  create_issue: function() {
    content_element.html(template('newIssledovanieTemplate'));
    $('#button-cancel').click(function(){
      location.href="#";
      return false;
    });
    $('#new-issue').submit( function( e ) {
      data = $(this).serializeArray();
      var issue = new IssueModel({
        name: data[0].value,
        count: data[3].value,
        figure: data[2].value,
        size: data[4].value
      });
      issue.save();
      issue.once("sync", function(issue){
        issues.add(issue);
      });
      location.href = "#";
      e.preventDefault();
    } );
  },
  chart: null,
  chart_update: function(model) {
    if (this.chart == null) {
      this.chart = new Highcharts.Chart({

        chart: {
          renderTo: 'chart'
        },

        title: {
          text: 'Минимальное доминирующее множество'
        },
        xAxis: {
          title: {
            text: 'Количество вершин'
          }
        },

        yAxis: {
          title: {
            text: 'Значение'
          },
          min: 0
        },
        tooltip: {
          shared: true,
          crosshairs: true
        },

        plotOptions: {
          series: {
            pointStart: 2
          }
        }
      });
    }
    else {
      while (this.chart.series.length > 0) {
        this.chart.series[0].remove(false);
      }
    }

    this.chart.title.text = model.get('name');

    this.chart.addSeries({name: "Математическое ожидание",data: model.get('exp')});
    this.chart.addSeries({name: "Дисперсия",data: model.get('disp')});
  },
  display_issue: function(id) {
    content_element.html(template('IssledovaniaTemplate')({id: id}));
    issue = issues.get(id);
    issue.unset('figure');

    issue = new IssueModel({id: id});
    issue.on("sync", this.chart_update);

    $('#remove-issue').click(function(){
      if (confirm('Вы действительно хотите стереть информацию об этом исследовании?')) {
        issue.destroy();
        location.href='#';
      }
    });

    //this.chart = ;
    issue.fetch();

    //$('#getcsv').click(function () {
    //  alert(chart.getCSV());
    //});
  },
  defaultAction: function(action){
    console.log(action);
  }
});

var issueRouter = new AppRouter();
Backbone.history.start();

