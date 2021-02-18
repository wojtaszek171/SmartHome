<?php
$servername = ""; // REPLACE_WITH_YOUR_DATABASE_SERVER
$port = ""; // REPLACE_WITH_YOUR_DATABASE_PORT
$dbname = ""; // REPLACE_WITH_YOUR_DATABASE_NAME
$username = ""; // REPLACE_WITH_YOUR_USERNAME
$password = ""; // REPLACE_WITH_YOUR_PASSWORD

// Keep this API Key value toz be compatible with the ESP32 code provided in the project page. 
// If you change this value, the ESP32 sketch needs to match
$api_key_value = ""; //REPLACE_WITH_API_KEY_FROM_ESP8266

$api_key = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $api_key = test_input($_POST["api_key"]);

    if($api_key == $api_key_value) {
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname, $port);
        // Check connection
        if ($conn->connect_error) {
            echo "Connection failed: ";
            die("Connection failed: " . $conn->connect_error);
        } 
        
        $sql = "SELECT * FROM `Sockets`";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
        } else {
            echo 'Failed to fetch';
        }
    
        $conn->close();
    }
    else {
        echo "Wrong API Key provided.";
    }

}
else {
    echo "No data posted with HTTP POST.";
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}