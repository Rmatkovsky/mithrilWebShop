var todo = {};

todo.Todo = function(data) {
	this.description = m.prop(data.description);
	this.done = m.prop(false);
};

todo.TodoList = Array;

var task = new todo.Todo({description: 'Lalala'});
var list = new todo.TodoList();

//define the view-model
todo.vm = {
    init: function() {
        //a running list of todos
        todo.vm.list = new todo.TodoList();

        //a slot to store the name of a new todo before it is created
        todo.vm.description = m.prop('123');

        //adds a todo to the list, and clears the description field for user convenience
        todo.vm.add = function(description) {
            if (description()) {
                todo.vm.list.push(new todo.Todo({description: description()}));
                todo.vm.description("");
            }
        };
    }
};
var vm = todo.vm;

todo.controller = function() {
    todo.vm.init()
};

todo.view = function() {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", todo.vm.description), value: todo.vm.description()}),
            m("button", {onclick: todo.vm.add.bind(vm, vm.description)}, "Add"),
            m("table", [
                todo.vm.list.map(function(task, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                        ]),
                        m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
                    ])
                })
            ])
        ])
    ]);
};
todo.vm.init();

todo.vm.description("Write code"); //set the description in the controller
// m.render(document, todo.view()); // input now says "Write code"
m.mount(document, {controller: todo.controller, view: todo.view});