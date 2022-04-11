const ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = window.innerWidth * 0.95;
ctx.canvas.height = window.innerHeight * 0.5;

document.getElementById("createChart").onclick = function () {
    var graphDatesData = localStorage.getItem("dates")
    var graphDates = JSON.parse(graphDatesData)
    var graphRatesData = localStorage.getItem("rates")
    var graphRates = JSON.parse(graphRatesData)
    var graphTitle = localStorage.getItem("title")
    var currency = graphTitle.slice(-4,-1)
    function getIntervalType(dates){
      var lastIndex = (dates.length) - 1
      
      var firstDate = new Date(dates[0].substring(0,4), (dates[0].substring(5,7)) - 1, dates[0].substring(8,10))
      var lastDate = new Date(dates[lastIndex].substring(0,4), (dates[lastIndex].substring(5,7)) -1, dates[lastIndex].substring(8,10))
      
      const diffInMs   = firstDate - lastDate
      const diffInDays = Math.abs(Math.round(diffInMs / (1000 * 60 * 60 * 24)))

      if(diffInDays < 14){
        return "day"
      } else if(diffInDays > 14 && diffInDays < 120){
        return "week"
      } else if(diffInDays > 120 && diffInDays < 366){
        return "month"
      } else{
        return "year"
      }

    }
    var intervalType = getIntervalType(graphDates)
    

    function createDataPoints(dates, rates){
      var dataPointArray = []
      for(var i = 0; i<dates.length; i++){
        var date = new Date(dates[i].substring(0,4), (dates[i].substring(5,7)) -1, dates[i].substring(8,10))
        var rate = Number(rates[i])

        let datapoint = { x: date, y: rate}
        
        dataPointArray.push(datapoint)
      }
      return dataPointArray
    }

    const dataPoints = createDataPoints(graphDates, graphRates)


    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      title:{
        text: graphTitle   
      },
      axisX: {
        interval: 1,
        intervalType: intervalType,
        valueFormatString: "YYYY-MM-DD"
      },
      axisY:{
        title: "Price (in " + currency + ")",
        includeZero: false,
        valueFormatString: "###.## " + currency
      },
      data: [{        
        type: "line",
        markerSize: 12,
        xValueFormatString: "YYYY-MM-DD",
        yValueFormatString: "###.#### " + currency,
        dataPoints: dataPoints
      }]
    });
    chart.render();
    

  };
  