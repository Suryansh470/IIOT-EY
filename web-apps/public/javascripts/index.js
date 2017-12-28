    var timeDatatemp = [],
        timeDatavib = [],
        timeDatacurr = [],
        temperatureData = [],
        vibrationData = [];
        currentData = [];
        spectrum = [];
    const maxLen = 20;

    $(document).ready(function () {
      var data = {
        labels: timeDatatemp,
        datasets: [
          {
            fill: false,
            label: 'Temperature',
            yAxisID: 'Temperature',
            borderColor: "rgba(255, 204, 0, 1)",
            pointBoarderColor: "rgba(255, 204, 0, 0.4)",
            backgroundColor: "rgba(255, 204, 0, 0.4)",
            pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
            pointHoverBorderColor: "rgba(255, 204, 0, 1)",
            data: temperatureData
          },
          {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 55),
      		fill: false,
      		label: 'Upper Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 0, 0, 1)",
            pointBoarderColor: "rgba(255, 0, 0, 1)",
      		backgroundColor: "rgba(255, 0, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
            pointHoverBorderColor: "rgba(255, 0, 0, 1)",
    	},
        {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 45),
      		fill: false,
      		label: 'Lower Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 140, 0, 1)",
            pointBoarderColor: "rgba(255, 140, 0, 1)",
      		backgroundColor: "rgba(255, 140, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 140, 0, 1)",
            pointHoverBorderColor: "rgba(255, 140, 0, 1)",
    	}
        ]
      }
    
      var data2 = {
        labels: timeDatavib,
        datasets: [
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
          },
          {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 12),
      		fill: false,
      		label: 'Upper Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 0, 0, 1)",
            pointBoarderColor: "rgba(255, 0, 0, 1)",
      		backgroundColor: "rgba(255, 0, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
            pointHoverBorderColor: "rgba(255, 0, 0, 1)",
    	},
        {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 7),
      		fill: false,
      		label: 'Lower Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 140, 0, 1)",
            pointBoarderColor: "rgba(255, 140, 0, 1)",
      		backgroundColor: "rgba(255, 140, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 140, 0, 1)",
            pointHoverBorderColor: "rgba(255, 140, 0, 1)",
    	}
        ]
      }
    
      var data3 = {
        labels: timeDatacurr,
        datasets: [
          {
            fill: false,
            label: 'Current',
            yAxisID: 'Current',
            borderColor: "rgba(30, 129, 68, 1)",
            pointBoarderColor: "rgba(30, 129, 68, 1)",
            backgroundColor: "rgba(30, 129, 68, 0.4)",
            pointHoverBackgroundColor: "rgba(30, 129, 168, 1)",
            pointHoverBorderColor: "rgba(30, 129, 68, 1)",
            data: currentData
          },
          {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 33),
      		fill: false,
      		label: 'Upper Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 0, 0, 1)",
            pointBoarderColor: "rgba(255, 0, 0, 1)",
      		backgroundColor: "rgba(255, 0, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
            pointHoverBorderColor: "rgba(255, 0, 0, 1)",
    	},
        {
      		data: Array.apply(null, new Array(10000)).map(Number.prototype.valueOf, 27),
      		fill: false,
      		label: 'Lower Control Limit',
      		radius: 0,
      		borderColor: "rgba(255, 140, 0, 1)",
            pointBoarderColor: "rgba(255, 140, 0, 1)",
      		backgroundColor: "rgba(255, 140, 0, 0.4)",
      		pointHoverBackgroundColor: "rgba(255, 140, 0, 1)",
            pointHoverBorderColor: "rgba(255, 140, 0, 1)",
    	}
        ]
      }
      
      var basicOption = {
        title: {
          display: true,
          text: 'Temperature Real-time Data',
          fontSize: 36
        },
        scales: {
          yAxes: [{
            id: 'Temperature',
            type: 'linear',
            scaleLabel: {
              labelString: 'Temperature (C)',
              display: true
            },
            position: 'left',
          }]
        }
      }
    
    var basicOption2 = {
        title: {
          display: true,
          text: 'Vibrations Real-time Data',
          fontSize: 36
        },
        scales: {
          yAxes: [{
            id: 'Vibration',
            type: 'linear',
            scaleLabel: {
              labelString: 'Vibration (no./sec)',
              display: true
            },
            position: 'left',
          }]
        }
      }
    
    var basicOption3 = {
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
              labelString: 'Current (A)',
              display: true
            },
            position: 'left',
          }]
        }
      }
      
      
      //Get the context of the canvas element we want to select
      var ctx = document.getElementById("myChart").getContext("2d");
      var ctx2 = document.getElementById("myChart2").getContext("2d");
      var ctx3 = document.getElementById("myChart3").getContext("2d");
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
    
      var myLineChart3 = new Chart(ctx3, {
        type: 'line',
        data: data3,
        options: basicOption3
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
          if(obj.temperature) {
            temperatureData.push(obj.temperature);
            timeDatatemp.push(obj.time);
          }
          // only keep no more than 50 points in the line chart
          if (temperatureData.length > maxLen) {
            timeDatatemp.shift();
            temperatureData.shift();
          }
    
          if (obj.vibration) {
            timeDatavib.push(obj.time);
            vibrationData.push(obj.vibration);
          }
          if (vibrationData.length > maxLen) {
            timeDatavib.shift();
            vibrationData.shift();
          }
    		
          if (obj.current) {
            timeDatacurr.push(obj.time);
          	currentData.push(obj.current);
          }
          if (currentData.length > maxLen) {
            timeDatacurr.shift();
          	currentData.shift();
          }
          
          myLineChart.update();
          myLineChart2.update();
          myLineChart3.update();
        } catch (err) {
          console.error(err);
        }
      }
    });
    
    function Transforms(){
        var fft = new FFT(2048, 44100);
        fft.forward(vibrationData);
        spectrum = fft.spectrum;
        }
