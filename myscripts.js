// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

function getSelectedDate() {
    var dateSelected = document.getElementById("tempDate").value;
    if (dateSelected == "") {
        alert("Please Select Date");
    }
    console.log(dateSelected);
    return dateSelected;
}

function getSelectedHumidDate() {
    var dateSelected = document.getElementById("humidDate").value;
    if (dateSelected == "") {
        alert("Please Select Date");
    }
    console.log(dateSelected);
    return dateSelected;
}


function queryFbtemp() {
    var timeValues = [];
    var readingValues = [];
    var result;
    var date = getSelectedDate();
    var ref = firebase.database().ref().child("Temperature_data");
    ref.orderByChild("date").equalTo(date).on("child_added", function(snapshot) {
        if (snapshot == null) {
            alert("No data found");
        }
        result = snapshot.val();

        readingValues.push(result.reading);
        timeValues.push(result.time);
        console.log("Pushed" + timeValues + " " + readingValues);

        createLineChart(timeValues, readingValues);
    });

}

function queryFbhumid() {
    var timeValues = [];
    var readingValues = [];
    var result;
    var date = getSelectedHumidDate();
    var ref = firebase.database().ref().child("Humidity_data");
    ref.orderByChild("date").equalTo(date).on("child_added", function(snapshot) {
        result = snapshot.val();

        readingValues.push(result.reading);
        timeValues.push(result.time);
        console.log("Pushed" + timeValues + " " + readingValues);

        createHumChart(timeValues, readingValues);
    });

}

function createLineChart(xValues, yValues) {
    // var x = 69;
    // var y = 20;
    // var xValues = [x, 2 * x, 3 * x, 4 * x]; //Time of the day
    // var yValues = [y, 3 * y, 2 * y, 6 * y, 5 * y]; //Sensor reading

    new Chart("lineChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Temperature"
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature (in °C)'
                    },
                    ticks: {
                        // min: 6,
                        // max: 16
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                }],
            }
        }
    });

}

function createHumChart(xValues, yValues) {
    // var x = 69;
    // var y = 20;
    // var xValues = [x, 2 * x, 3 * x, 4 * x]; //Time of the day
    // var yValues = [y, 3 * y, 2 * y, 6 * y, 5 * y]; //Sensor reading

    new Chart("humChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Humidity"
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Humidity in %'
                    },
                    ticks: {
                        // min: 6,
                        // max: 16
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                }],
            }
        }
    });

}