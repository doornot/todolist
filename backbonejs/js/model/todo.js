var app = app || {};

(function(){
    app.Todo = Backbone.Model.extend({
        defaults: {
            "text": "",
            "completed": false,
        }
    });
})();