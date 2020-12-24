//=============================================================================\\
//                         Temp.JS - Rpi / custom devices                       \\
//                              made by nullcheats                               \\
//================================================================================\\

/*
As you can see here there is 2 arrays a bool and a variable "wait"
The update array stores current times updated (counter)
The temp array stores the current tempature from SQL db
The bool is used to add pi tempature or not
The variable wait is used as the timer (how often it will refresh results)
The wait timer is in ms (1,000 ms = 1second)
*/
let update = [];  // This is the "X" axis
var Temp = []; // This is the "Y" axis
let Pi_monitor = true;
let wait = 2000;

/*
This is the "Charts.js" default code example
Here you can change the colour ect if needed , add labels ect
This will simply plot a dot / join dots on the graph when applicable
*/
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {

    type: 'line',
    data: {
        labels: update,
        datasets: [{
            data: Temp,
            label: "Nulls gaming station",
            borderColor: "#3e95cd",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0
                },
                gridLines: {
                    display: false
                }
            }],
        }
    },
    scales: {
        xAxes: [{
            display: false,
            scaleLabel: {
                display: true,
                labelString: 'Month'
            },
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true,
                steps: 10,
                max: 100
            },
            gridLines: {
                display: false
            }
        }]
    }
});

/*
This is the "infinite" loop , whilst on page it will carry out this function every x ms
The ms can be configured at the top of the script via the "wait" variable
Here you can see we use "Ajax" to grab the tempature from a PHP page "GetTemp.php"
If raspberry PI mode is enabled , it will first POST the current tempature to the SQL db
*/
setInterval(function() {
    if (Pi_monitor == true) {
        var d = new Date(); // for now
        var time = d.getHours() + ":" + d.getMinutes();
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://192.168.0.40/pi.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("{\r\n  \"ID\": \"w\",\r\n  \"Temp\": \"88\",\r\n  \"Time\": \"" + time + "\"\r\n}");
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://192.168.0.40/GetTemp.php");
    oReq.send();
}, wait);

/*
This function is very simple , all it does is grab the response tempature value
The tempature value is added to "Temp" , and each time a counter will be incremented "i"
if "update" array length is more than equal to 7 it wil also start removing the first elements
as you will see "chart.update" is also called each time to display new data on chart
*/
let i = 0;
function reqListener() {
    i++;
    update.push(i);
    Temp.push(this.responseText);
    myChart.update();
    if (update.length >= 7) {
        Temp.shift(i);
        update.shift(i);
        myChart.update();
    }
}
