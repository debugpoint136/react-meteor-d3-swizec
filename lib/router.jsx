FlowRouter.route('/', {
    name: 'H1BGraph',
    action() {
        ReactLayout.render(H1BGraph, {
            content: <Histogram />
        });
    }
});