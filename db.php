<?php

//CONNECTION WITH DATABASE

$host = getenv('HOST');
$port = getenv('PORT');
$db_name = getenv('DATABASE');
$username = getenv('USERNAME');
$password = getenv('PASSWORD');

try{
$db_conn = pg_connect("host=$host port=$port dbname=$db_name user=$username password=$password");
}

catch(Exception $e){
    echo $e->getMessage();
}

?>
