<?php
$q = $_REQUEST["q"];
$q = strtolower($q);
$con= mysqli_connect('127.0.0.1:3325', 'root', '', 'laptop_recommendor_system');
if(!$con){
die("Connection failed: " . mysqli_connect_error());
}
$sql="select * from laptops_images where lower(descrip) like '%$q%'";
$result= mysqli_query($con,$sql);
if($row=mysqli_fetch_array($result))
{
echo $row['image'];
}
else
{
echo "image/laptop3.jpg";
}
?>