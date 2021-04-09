<?php
   $brand = $_POST['brand'];
   $os = $_POST['os'];
   $ram = $_POST['ram'];
   $display = $_POST['display'];
   $minprice = $_POST['minprice'];
   $maxprice = $_POST['maxprice'];
   $flag = false;
   $con =mysqli_connect("127.0.0.1:3325","root","");
   mysqli_select_db($con,"laptop_recommendor_system");
   $query = "select * from laptops_dataset where UPPER(description) LIKE UPPER('%$brand%') AND UPPER(os) LIKE UPPER('%$os%') AND UPPER(ram) LIKE UPPER('%$ram%') AND UPPER(display) LIKE UPPER('%$display%') AND price BETWEEN '$minprice' AND '$maxprice' order by rating desc,price asc;";
   $num_data = 0;
   $result = mysqli_query($con,$query);
   $send = [];
   if(mysqli_num_rows($result)!=0) {
      $flag = true;
      $num_data = mysqli_num_rows($result);
      for($i = 0; $i < $num_data; $i++) {
         $send[$i] = mysqli_fetch_assoc($result); 
      }
   }
   
   
   echo json_encode(
      array(
         'flag' => $flag,
         'data' => $send,
         'num' => $num_data
      )
   );
   

   
?>