var MetaMixin = {
    getYears: function (data) {
        data || (data = this.props.data);

        return _.keys(
            _.groupBy(this.props.data,
                function (d) { return d.submit_date.getFullYear(); })
        );
    },

/*    getStates: function (data) {
        data || (data = this.props.data);

        return _.keys(
            _.groupBy(this.props.data,
                function (d) { return d.state; })
        );
    },*/

    getJobTitles: function (data) {
        data || (data = this.props.data);

        return _.keys(
            _.groupBy(this.props.data,
                function (d) { return d.clean_job_title; })
        );
    },

    getFormatter: function (data) {
        data || (data = this.props.data);

        return d3.scale.linear()
            .domain(d3.extent(this.props.data,
                function (d) { return d.base_salary; }))
            .tickFormat();
    },

    getAllDataByYear: function (year, data) {
        data || (data = this.props.allData);

        return data.filter(function (d) {
            return d.submit_date.getFullYear() == year;
        });
    }
};

Title = React.createClass({
    mixins: [MetaMixin],
    getYearsFragment: function () {
        var years = this.getYears(),
            fragment;
        if (years.length > 1) {
            fragment = "";
        }else{
            fragment = "in "+years[0];
        }
        return fragment;
    },
    render: function () {
        var mean = d3.mean(this.props.data,
            function (d) { return d.base_salary; }),
            format = this.getFormatter();

        mean = mean.toFixed(0);
        var yearsFragment = this.getYearsFragment(),
            title;
        return (
            <h2>H1B workers in the software industry {yearsFragment.length ? "made" : "make"} ${format(mean)}/year {yearsFragment}</h2> );
    }
});

Description = React.createClass({
    mixins: [MetaMixin],
    getYearFragment: function () {
        var years = this.getYears(),
            fragment;
        if (years.length > 1) {
            fragment = "";
        }else{
            fragment = "In "+years[0];
        }
        return fragment;
    },
    getPreviousYearFragment: function () {
        var years = this.getYears().map(Number),
            fragment;
        if (years.length > 1) { fragment = "";
        }else if (years[0] == 2012) { fragment = "";
        }else{
            var year = years[0],
                lastYear = this.getAllDataByYear(year-1),
                percent = ((1-lastYear.length/this.props.data.length)*100).toFixed();
            fragment = ", "+Math.abs(percent)+"% "+(percent > 0 ? "more" : "less")+"\
 than the year before";
        }
        return fragment;
    },
    render: function () {
        var formatter = this.getFormatter(),
            mean = d3.mean(this.props.data,
                function (d) { return d.base_salary; }),
            /*deviation = d3.deviation(this.props.data,
                function (d) { return d.base_salary; });*/
            deviation = 0;
        var yearFragment = this.getYearFragment();
            return (
            <p className="lead">{yearFragment.length ? yearFragment : "Since 2012"} the US software industry {yearFragment.length ? "gave" : "has given"} jobs to {formatter(this.props.data.length)} foreign nationals{this.getPreviousYearFragment()}. Most of them made between ${formatter(mean-deviation)} and ${formatter(mean+deviation)} per year.</p>
        );

    }
});

states = {
    "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
};