H1BGraph = React.createClass({
    componentWillMount() {
      this.loadRawData();
    },
    getInitialState() {
      return {
        rawData: [],
          dataFilter: function () { return true; }
      };
    },
    updateDataFilter: function (filter) {
        this.setState({dataFilter: filter});
    },
    loadRawData() {
        var dateFormat = d3.time.format("%m/%d/%Y");
        d3.csv("/h1bs.csv")
            .row(function (d) {
                if (!d['base salary']) {
                    return null;
                }

                return {employer: d.employer,
                    submit_date: dateFormat.parse(d['submit date']),
                    start_date: dateFormat.parse(d['start date']),
                    case_status: d['case status'],
                    job_title: d['job title'],
                    base_salary: Number(d['base salary']),
                    salary_to: d['salary to'] ? Number(d['salary to']) : null,
                    city: d.city,
                    state: d.state};
            }.bind(this))
            .get(function (error, rows) {
                if (error) {
                    console.error(error);
                    console.error(error.stack);
                }else{
                    this.setState({rawData: rows});
                }
            }.bind(this));
    },
    render() {
        if (!this.state.rawData.length) {
            return (
                <h2>Loading data about 81,000 H1B visas in the software industry</h2>
            );
        }

        var params = {
                bins: 20,
                width: 700,
                height: 500,
                axisMargin: 183,
                topMargin: 10,
                leftMargin: 50,
                bottomMargin: 5,
                value: function (d) { return d.base_salary; }
            },
            fullWidth = 900;

        var filteredData = this.state.rawData.filter(this.state.dataFilter);

        return (
            <div>
                <Title data={filteredData} />
                <Description data={filteredData} allData={this.state.rawData} />
                <div className="row">
                    <div className="col-md-12">
                        <svg width={fullWidth} height={params.height}>
                            <Histogram {...params} data={filteredData} />
                        </svg>
                    </div>
                </div>
                <Controls data={this.state.rawData} updateDataFilter={this.updateDataFilter} />
            </div>

        );
    }
});
