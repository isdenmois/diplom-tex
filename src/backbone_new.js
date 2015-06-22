create_issue: function() {
  var data = algorythms.fetch();
  content_element.html(template('newIssledovanieTemplate')({
    options: data,
    algorythm_params_list: function() {data.render()}
  }));
  $('#submit').submit( function( e ) {
    var data = $(this).serializeArray();
    var issue = new IssueModel(data);
    issue.save();
    issue.once("sync", function(issue){
      issues.add(issue);
    });
    location.href = "#";
    e.preventDefault();
  });
},