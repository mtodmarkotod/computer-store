<?php

    //=======================================
    //             CREATE NEW 
    //=======================================

    include('db.php');

    $name = $_POST['name'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];
    $temp_path = $_FILES['image']['tmp_name'];

    if($image){
    $target_path = 'images/' .$image;
    move_uploaded_file($temp_path, $target_path);

    $insert = "INSERT INTO computer_store (name, price, image) VALUES ('$name', '$price', '$image')";
    pg_query($db_conn,$insert);
    }
    else{
        $image = 'no_image.jpg';
        $insert = "INSERT INTO computer_store (name, price, image) VALUES ('$name', '$price', '$image')";
        pg_query($db_conn,$insert);
    }
    







?>