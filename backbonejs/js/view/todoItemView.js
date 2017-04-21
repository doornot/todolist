var app = app || {};

(function ($) {
    app.TodoItemView = Backbone.View.extend({
        name: 'todoItemView',
        tagName: "li",
        // className: "",  // editing  completed
        template: _.template($('#tpl-todoItem').html()),
        events: {
            'click .toggleSingle': 'toggleCompleted',
            'dblclick .readonly': 'editTodo',
            'blur .editItem': 'saveEditItem',
            'keydown .editItem': 'handleItem',
            'click .delete': 'deleteItem',
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$('.editItem');
            this.$el.toggleClass('completed', this.model.get('completed'));
            return this;
        },
        toggleCompleted: function() {
            // console.log(this.$input.checked);
            if (this.$input.checked) {
                this.$el.addClass('completed');
            } else {
                this.$el.removeClass('completed');
            }
            this.model.save({
                'completed': !this.model.get('completed'),
            });
        },
        editTodo: function() {
            var view = this;
            if (this.model.get('completed') === false) {
                setTimeout(function() {
                    view.$input.focus();
                },0);
                this.$el.addClass('editing');
            }
        },
        saveEditItem: function(e) {
            if (this.$input.val().trim()) {
                this.model.save({
                    'text': this.$input.val().trim(),
                });
                this.$el.removeClass('editing');
            }
        },
        handleItem: function(e) {
            if (e.keyCode === ESC_KEY) {
                this.$el.removeClass('editing');
            }
            if (e.keyCode === ENTER_KEY) {
                this.saveEditItem();
            }
        },
        deleteItem: function() {
            this.model.destroy();
        },
    });
})(Zepto);