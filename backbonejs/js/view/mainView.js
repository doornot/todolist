(function ($) {
    app.MainView = Backbone.View.extend({
        name: 'MainView',
        el: '.page-main',
        events: {
            'keydown .newTodo': 'saveNewTodo',
            'click .toggleAll': 'toggleAll',
            'click .clearCompleted': 'clearCompleted',
        },
        statusTpl: _.template($('#tpl-todoStatus').html()),
        initialize: function() {
            this.$newTodo = this.$('.newTodo');
            this.$todolists = this.$('.todolists');
            this.$listStatus = this.$('.listStatus');
            this.$todoItem = this.$('#tpl-todoItem');
            this.$todoStatus = this.$('#tpl-todoStatus');

            this.listenTo(app.todos, 'add', this.addOne);
            this.listenTo(app.todos, 'reset', this.addAll);
            this.listenTo(app.todos, 'change:completed', this.completedChange);
            this.listenTo(app.todos, 'all', _.debounce(this.render, 0));
            app.todos.fetch({reset: true});
        },
        render: function() {
            if (app.todos.length > 0) {
                this.$todolists.show();
                this.$listStatus.show();
                this.$listStatus.html(this.statusTpl({
                    'completedNum': app.todos.completed().length,
                    'ongoingNum': app.todos.ongoing().length,
                }));
            } else {
                this.$todolists.hide();
                this.$listStatus.hide();
            }
            this.$('.toggleAll')[0].checked = !app.todos.ongoing().length;
            return this;
        },
        saveNewTodo: function(e) {
            if (e.keyCode === ENTER_KEY && this.$newTodo.val().trim()) {
                app.todos.create({
                    'text': this.$newTodo.val().trim(),
                    'completed': false,
                });
                this.$newTodo.val('');
            }
            this.render();
        },
        toggleAll: function() {
            app.todos.each(function(item) {
                item.save({
                    'completed': this.$('.toggleAll')[0].checked,
                });
            });
        },
        clearCompleted: function() {
            console.log('clearCompleted');
        },
        addOne(todo) {
            var item = new app.TodoItemView({
                model: todo,
            });
            this.$todolists.append(item.render().el);
        },
        addAll() {
            this.$todolists.html('');
            app.todos.each(this.addOne, this);
        },
        completedChange() {
            console.log('completedChange');
        },
    });
})(Zepto);