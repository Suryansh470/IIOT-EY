$(document).ready(function () {
  var timeData = [],
    temperatureData = [],
    vibrationData = [];
    currentData = [];
  var data = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: "rgba(255, 204, 0, 1)",
        pointBoarderColor: "rgba(255, 204, 0, 1)",
        backgroundColor: "rgba(255, 204, 0, 0.4)",
        pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
        pointHoverBorderColor: "rgba(255, 204, 0, 1)",
        data: temperatureData
      },
      {
        fill: false,
        label: 'Vibration',
        yAxisID: 'Vibration',
        borderColor: "rgba(24, 120, 240, 1)",
        pointBoarderColor: "rgba(24, 120, 240, 1)",
        backgroundColor: "rgba(24, 120, 240, 0.4)",
        pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
        pointHoverBorderColor: "rgba(24, 120, 240, 1)",
        data: vibrationData
      }
    ]
  }

  var data2 = {
    labels: timeData,
    datasets: [
      {
        fill: false,
        label: 'Current',
        yAxisID: 'Current',
        borderColor: "rgba(236, 4, 14, 1)",
        pointBoarderColor: "rgba(236, 4, 14, 1)",
        backgroundColor: "rgba(236, 4, 14, 0.4)",
        pointHoverBackgroundColor: "rgba(236, 4, 14, 1)",
        pointHoverBorderColor: "rgba(236, 4, 14, 1)",
        data: currentData
      }
    ]
  }

  var basicOption = {
    title: {
      display: true,
      text: 'Temperature & Vibration Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature(C)',
          display: true
        },
        position: 'left',
      }, {
          id: 'Vibration',
          type: 'linear',
          scaleLabel: {
            labelString: 'Vibration(n/min)',
            display: true
          },
          position: 'right'
        }]
    }
  }

var basicOption2 = {
    title: {
      display: true,
      text: 'Current Real-time Data',
      fontSize: 36
    },
    scales: {
      yAxes: [{
        id: 'Current',
        type: 'linear',
        scaleLabel: {
          labelString: 'Current(A)',
          display: true
        },
        position: 'left',
      }]
    }
  }
  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var ctx2 = document.getElementById("myChart2").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: basicOption
  });

  var myLineChart2 = new Chart(ctx2, {
    type: 'line',
    data: data2,
    options: basicOption2
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || (!obj.temperature && !obj.vibration && !obj.current)) {
        return;
      }
      timeData.push(obj.time);
      if(obj.temperature) {
        temperatureData.push(obj.temperature);
      }
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
      }

      if (obj.vibration) {
        vibrationData.push(obj.vibration);
      }
      if (vibrationData.length > maxLen) {
        vibrationData.shift();
      }
		
      myLineChart.update();
      if (obj.current) {
      	currentData.push(obj.current);
      }
      if (currentData.length > maxLen) {
      	currentData.shift();
      }
      myLineChart2.update();
    } catch (err) {
      console.error(err);
    }
  }
});
