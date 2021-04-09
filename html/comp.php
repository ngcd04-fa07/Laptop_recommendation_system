<?php
$q = $_REQUEST["q"];
$q = strtolower($q);
$con= mysqli_connect('127.0.0.1:3325', 'root', '', 'laptop_recommendor_system');
if(!$con){
die("Connection failed: " . mysqli_connect_error());
}
$sql="select * from laptops_dataset where lower(description) like '%$q%'";
$result= mysqli_query($con,$sql);
while($row=mysqli_fetch_array($result))
{
echo $row['description'].'^'.$row['price'].'^'.$row['processor'].'^'.$row['ram'].'^'.$row['os'].'^'.$row['storage'].'^'.$row['display'].'^'.$row['rating'];
break;
}
?>