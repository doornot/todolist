var app = app || {};

(function(){
    var Todos = Backbone.Collection.extend({
        model: app.Todo,
        localStorage: new Backbone.LocalStorage('todos-backbone'),
        completed: function() {
            // return a array
            return this.where({completed : true});
        },
        ongoing: function() {
            return this.where({completed : false});
        },
    });
    app.todos = new Todos();
})();
