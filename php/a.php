<?php
   $a = 30;
   shell_exec("javac recommend.java");
   echo shell_exec("java demo $a");

?>