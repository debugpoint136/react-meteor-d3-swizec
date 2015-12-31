Controls = React.createClass({
    updateYearFilter: function (year, reset) {
        var filter = function (d) {
            return d.submit_date.getFullYear() == year;
        };

        if (reset || !year) {
            filter = function () { return true; };
        }

        this.setState({yearFilter: filter,
            year: year});
    },
    getInitialState() {
      return {
        yearFilter: function() {
            return true;
        }
      };
    },
    componentDidUpdate() {
        this.props.updateDataFilter(
            (function (filters) {
                return function (d) {
                    return filters.yearFilter(d)
                };
            })(this.state)
        );
    },
    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    },


    
  render() {
      var getYears = function (data) {
          return _.keys(_.groupBy(data,
              function (d) {
                  return d.submit_date.getFullYear()
              }))
              .map(Number);
      };
    return (
      <div>
          <div>
              <ControlRow data={this.props.data}
                          getToggleNames={getYears}
                          updateDataFilter={this.updateYearFilter} />
          </div>
      </div>
    );
  }
});
