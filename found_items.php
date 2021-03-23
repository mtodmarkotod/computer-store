<?php 

include('db.php');

//=======================================
//           FOUNDED ITEMS
//=======================================

if(isset($_POST['inputValue'])){
    $inputValue = $_POST['inputValue'];
    $search = "SELECT * FROM computer_store WHERE name LIKE '$inputValue%'";
    $all_items = pg_query($db_conn, $search);

    //GET NUMBER OF ITEMS
    $num_of_rows = pg_num_rows($all_items);
    $number = array('number' => strval($num_of_rows));
    
    echo( json_encode($number));
}



?>