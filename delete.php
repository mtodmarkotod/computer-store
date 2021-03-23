<?php

include('db.php');

//=======================================
//             DELETE ITEM
//=======================================

if(isset($_POST['delete'])){
    $id = $_POST['id'];
    $src = $_POST['src'];


    //delete image from images folder
    if($src == './images/no_image.jpg'){
    $delete_query = "DELETE FROM computer_store WHERE id='$id'";
    pg_query($db_conn,$delete_query);
    }

    else{
        $delete_query = "DELETE FROM computer_store WHERE id='$id'";
        pg_query($db_conn,$delete_query);
        unlink($src);
    }
 
}




?>