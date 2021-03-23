<?php

include('db.php');

//=======================================
//           SHOW total ITEMS
//=======================================

$select_all = "SELECT * FROM computer_store";
$all_contacts = pg_query($db_conn, $select_all);
$num_of_rows = pg_num_rows($all_contacts);
echo($num_of_rows);



?>