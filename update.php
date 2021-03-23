<?php

include('db.php');
//=======================================
//               UPDATE
//=======================================

if(isset($_POST['update'])){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $current_image = $_POST['image_name'];
    $new_image = $_FILES['new_image']['name'];
    echo($new_image);

    if($new_image){
    //DELETE OLD IMAGE
    $path = 'images/' .$current_image;
    unlink($path);

    //SAVE NEW IMAGE
    $temp_path = $_FILES['new_image']['tmp_name'];
    $target_path = 'images/' .$new_image;

    move_uploaded_file($temp_path, $target_path);

    $update_query = "UPDATE computer_store SET name='$name', price='$price',image='$new_image' WHERE id='$id'";
    pg_query($db_conn,$update_query);
    }
    else{
    $update_query = "UPDATE computer_store SET name='$name', price='$price' WHERE id='$id'";
    pg_query($db_conn,$update_query);
    }
    
}

?>