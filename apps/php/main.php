<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO add the session guard here
          redirect to login.php if not login
-->
<?php
require 'login.php'; 

    $input=$_POST['input'];
    $username=$_POST['username'];
    $password=$_POST['password'];

$sql= "SELECT * FROM users WHERE username ='$username' and password='$password'";  
$query= mysqli_query($con, $sql); 

while($User=$result->fetch_assoc()) 
{
    if($User['username'] == $username && $User['password'] == $password == 'Admin') 
    {
        header("Location: admin.php"); 
    }else {
        header("Location: login.php");
    }
}
?>

<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span> Dish Management System <span>
    </div>
    <div>
      username
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu" href="category.php">
        Category
      </a> 
      <a class="menu" href="dish.php">
        Dish
      </a> 
      <a class="menu" href="combo.php">
        Combo
      </a> 
    </div>
    
    <!-- BODY -->
    <div class="body">
      1
    </div>
  </div>
</body>
</html>