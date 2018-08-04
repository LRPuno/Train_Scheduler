$(document).ready(function(){
    
    var config = {
        apiKey: "AIzaSyBOyyt0tJIrK5VIsh4BndZUP0oe5Rx-kxk",
        authDomain: "project-x-7087a.firebaseapp.com",
        databaseURL: "https://project-x-7087a.firebaseio.com",
        projectId: "project-x-7087a",
        storageBucket: "project-x-7087a.appspot.com",
        messagingSenderId: "382667771395"
    };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    
    // 2. Button for adding Employees
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();
    
        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainMilitaryTime=$("#military-train-input").val().trim();
        var trainFrequency=$("#frequency-input").val().trim();
    
        // Creates local "temporary" object for holding employee data
        var newTrain = {
        train: trainName,
        destination: trainDestination,
        firstTrain: trainMilitaryTime,
        frequency: trainFrequency
        };
    
        // Uploads employee data to the database
        database.ref().push(newTrain);
    
        // Logs everything to console
        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);
    
    
        alert("Train Successfully Added");
    
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#military-train-input").val("");
        $("#frequency-input").val("");
    });
    
    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
    
        // Store everything into a variable.
        var trainName = childSnapshot.val().train;
        var trainDestination = childSnapshot.val().destination;
        var trainMilitaryTime = childSnapshot.val().firstTrain;
        var trainFrequency = childSnapshot.val().frequency;
    


        //Moment JS Calculations

        //Makes Sure it Comes Before Current Time

        var timeConversion = moment(trainMilitaryTime, "HH:mm").subtract(1, "years");
        console.log(timeConversion);

        //Difference Between The First Train Time and the Current Time
        var diffTime = moment().diff(moment(timeConversion), "minutes");

        //Time Apart (Modulo to Account for Remainder)
        var tRemainder = diffTime % trainFrequency;
        var tMinutesTillTrain = trainFrequency - tRemainder;

        //Train Time Added To See When Train Will Arrive
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        // Converted to a more readable format in terms of time
        var nextTrainConverted=moment(nextTrain).format("hh:mm:ss a")



    
        // Create the new row
        var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrainConverted),
        $("<td>").text(tMinutesTillTrain)
        );
    
        // Append the new row to the table
        $("#train-schedule-table").append(newRow);

    });
});
