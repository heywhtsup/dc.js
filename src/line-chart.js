dc.lineChart = function(parent) {
    var chart = dc.coordinateGridChart({});

    chart.transitionDuration(500);

    chart.subRender = function(){
        if (chart.dataAreSet()) {
            chart.plotData();
        }

        return chart;
    };

    chart.redraw = function() {
        chart.plotData();
        chart.redrawBrush(chart.g());
        if (chart.elasticY())
            chart.renderYAxis(chart.g());
        return chart;
    };

    chart.plotData = function() {
        chart.g().datum(chart.group().all());

        var path = chart.selectAll("path.line");

        if (path.empty())
            path = chart.g().append("path")
                .attr("class", "line");

        var line = d3.svg.line()
            .x(function(d) {
                return chart.x()(chart.xValue()(d));
            })
            .y(function(d) {
                return chart.y()(chart.yValue()(d));
            });

        path = path
            .attr("transform", "translate(" + chart.margins().left + "," + chart.margins().top + ")");

        dc.transition(path, chart.transitionDuration(), function(t) {
            t.ease("linear")
        }).attr("d", line);
    }

    chart.redrawBrush = function(g) {
        chart._redrawBrush(g);

        fadeDeselectedArea();
    }

    function fadeDeselectedArea() {

    }

    function isSubChart(parent) {
        return (parent instanceof Object);
    }

    dc.registerChart(chart);

    return isSubChart(parent)?chart:chart.anchor(parent);
};
