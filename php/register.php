<?php
   $id = $_POST['id'];
   $fname = $_POST['fname'];
   $lname = $_POST['lname'];
   $email = $_POST['email'];
   $mob = $_POST['mob'];
   $dob = $_POST['dob'];
   $gender = $_POST['gen'];
   $pass = $_POST['pass'];
   $cpass = $_POST['cpass'];
   $mess = "";
   $flag = false;
   if($cpass != $pass){
      $mess = "Passwords Do Not Match";
   }
   else {
      if(!isEmail()){
         $mess = "Invalid Email";
      }
      else {
         $pattern_name="/^[A-Za-z ]+$/";
         $pattern_mobile="/^[7-9]{1}[0-9]{9}$/";
         if(!(preg_match($pattern_name,$fname) && preg_match($pattern_name,$lname))) {
            $mess = "Invalid Name";
         }
         else {
            if(!preg_match($pattern_mobile,$mob)){
               $mess = "Invalid Mobile Number";
            }
            else {
               $con =mysqli_connect("127.0.0.1:3325","root","");
               mysqli_select_db($con,"laptop_recommendor_system");
               $query = "INSERT INTO users(id, fname, lname, email, mobile, dob, gender, password)VALUES('$id','$fname','$lname','$email','$mob','$dob','$gender','$pass')";
               if(mysqli_query($con,$query)){
                  $flag = true;
                  $mess = "Success";
               }
               else {
                  $mess = "Username, Email and Phone Number should be unique";
               }
            }
         }
      }
	}

   function isEmail() {
      $email = ($_POST['email']);
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
			return false;
		}
		else{
			return true;
		}
	}


   echo json_encode(
      array(
         "flag" => $flag,
         "mess" => $mess
      )
   )
?>