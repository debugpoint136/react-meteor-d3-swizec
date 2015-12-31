HistogramBar = React.createClass({
  render() {
      var translate = "translate(" + this.props.x + "," + this.props.y + ")",
          label = this.props.percent.toFixed(0)+'%';

      if (this.props.percent < 1) {
          label = this.props.percent.toFixed(2)+"%";
      }

      if (this.props.width < 20) {
          label = label.replace("%", "");
      }

      if (this.props.width < 10) {
          label = "";
      }

      return (
          <g transform={translate} className="bar">
              <rect width={this.props.width}
                    height={this.props.height-2}
                    transform="translate(0, 1)">
              </rect>
              <text textAnchor="end"
                    x={this.props.width-5}
                    y={this.props.height/2+3}>
                  {label}
              </text>
          </g>
      );
  }
});
