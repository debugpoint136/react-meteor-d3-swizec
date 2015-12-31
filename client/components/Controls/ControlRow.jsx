ControlRow = React.createClass({
    makePick: function (picked, newState) {
        var toggleValues = this.state.toggleValues;

        toggleValues = _.mapValues(toggleValues,
            function (value, key) {
                return newState && key == picked;
            });

        // if newState is false, we want to reset
        this.props.updateDataFilter(picked, !newState);

        this.setState({toggleValues: toggleValues});
    },
    getInitialState() {
        var toggles = this.props.getToggleNames(this.props.data),
            toggleValues = _.zipObject(toggles,
                toggles.map(function () { return false; }));
          return {
            toggleValues: toggleValues
          };
    },
    
  render() {
    return (
      <div className="row">
          <div className="col-md-12">
              {this.props.getToggleNames(this.props.data).map(function (name) {
                  var key = "toggle-"+name,
                      label = name;
                  return (
                      <Toggle label={label}
                              name={name}
                              key={key}
                              value={this.state.toggleValues[name]}
                              onClick={this.makePick} />
                  );
              }.bind(this))}
          </div>
      </div>
    );
  }
});
