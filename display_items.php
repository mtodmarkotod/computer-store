<?php
include('db.php');

//=======================================
//           SHOW ALL ITEMS
//=======================================

$select_all = "SELECT * FROM computer_store";
$all_items = pg_query($db_conn, $select_all);


while($row = pg_fetch_assoc($all_items)){?>
    <div class="item-box">
        <img class="item-image" src="./images/<?php echo($row['image']) ?>" alt="<?php echo($row['image']) ?>">
        <p class="item-info"><?php echo($row['name']) ?></p>
        <p class="item-info"><?php echo($row['price']) ?> &euro;</p>
        <div>
            <button data-id="<?php echo($row['id']) ?>" class="btn btn-primary edit">Edit</button>
            <button data-id="<?php echo($row['id']) ?>" class="btn btn-danger delete" >Delete</button>
        </div>
    </div>
        
    
<?php 

}


?>


