var app = app || {};

(function () {
	app.TodoFooter = React.createClass({
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<a  href="javascript:;"
						className="clearCompleted"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</a>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<div className="listStatus">
					<span className="itemsLeft">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="statusList">
						<li>
							<a
								href="#/"
								className={classNames({active: nowShowing === app.ALL_TODOS})}>
									All
							</a>
						</li>
						<li>
							<a
								href="#/active"
								className={classNames({active: nowShowing === app.ACTIVE_TODOS})}>
									Active
							</a>
						</li>
						<li>
							<a
								href="#/completed"
								className={classNames({active: nowShowing === app.COMPLETED_TODOS})}>
									Completed
							</a>
						</li>
					</ul>
					{clearButton}
				</div>
			);
		}
	});
})();
