<?php 

include('db.php');

//=======================================
//           SEARCH ITEMS
//=======================================

if(isset($_POST['inputValue'])){
    $inputValue = $_POST['inputValue'];
    $search = "SELECT * FROM computer_store WHERE name LIKE '$inputValue%'";
    $all_items = pg_query($db_conn, $search);

    //GET NUMBER OF ITEMS
    $num_of_rows = pg_num_rows($all_items);
    $number = array('number' => $num_of_rows);
 
    while($row = pg_fetch_assoc($all_items)){?>
       <div class="item-box">
            <img class="item-image" src="./images/<?php echo($row['image']) ?>">
            <p class="item-info"><?php echo($row['name']) ?></p>
            <p class="item-info"><?php echo($row['price']) ?> &euro;</p>
            <div>
                <button data-id="<?php echo($row['id']) ?>" class="btn btn-primary edit">Edit</button>
                <button data-id="<?php echo($row['id']) ?>" class="btn btn-danger delete" >Delete</button>
            </div>
        </div>
    <?php 
    }
} 

?>












