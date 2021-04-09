<?php
session_start();
$id=$_POST["id"];
$pass=$_POST["pass"];
$_SESSION["id"]=$id;
$flag = false;
$mess = "";
$con =mysqli_connect("127.0.0.1:3325","root","");
mysqli_select_db($con,"laptop_recommendor_system");
$var="select * from users where id='$id' and password='$pass'";

if(mysqli_num_rows(mysqli_query($con,$var))==1) {
	$flag = true;
}
else {
   $mess = "Invalid Credentials";
}

echo json_encode(
	array(
		"mess" => $mess,
		"flag" => $flag
	)
)
?>
