<?php
require_once ('DB.php');
header('Access-Control-Allow-Origin: *');

//strip_tags
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    //echo "Connected to DB with no issue !";
    
}

$sql = "SELECT * FROM " . $table . " ORDER BY ID DESC LIMIT 1";
$result = $result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0)
{
    $row = mysqli_fetch_assoc($result);
    $ID = $row["ID"];
    $temp = $row["Temp"];
    $time = $row["Time"];
    $output_json = array(
        "ID" => $ID,
        "Temp" => $temp,
        "Time" => $time
    );
    echo $temp;
}
else
{
    echo "<center><h1>No records was located within the table</h1></center>";
}

mysqli_close($conn);
?>
