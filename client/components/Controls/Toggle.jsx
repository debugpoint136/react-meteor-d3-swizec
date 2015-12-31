Toggle = React.createClass({
    getInitialState() {
      return {
        value: false
      };
    },
    handleClick: function (event) {
        var newState = !this.state.value;
        this.setState({value: newState});
        this.props.onClick(this.props.name, newState);
    },
    componentWillReceiveProps(newProps) {
        this.setState({value: newProps.value});
    },
    
  render() {
      var className = "btn btn-default";

      if (this.state.value) {
          className += " btn-primary";
      }

    return (
      <button className={className} onClick={this.handleClick}>
          {this.props.label}
      </button>
    );
  }
});
