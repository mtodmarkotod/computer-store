<?php
include('db.php');
      
//=======================================
//               EDIT
//=======================================

if(isset($_POST['edit'])){
    $id = $_POST['id'];
    $show_query = "SELECT * FROM computer_store WHERE id=$id";
    $row = pg_query($db_conn, $show_query);
    $record = pg_fetch_assoc($row);
    echo json_encode($record);    
}





?>


















