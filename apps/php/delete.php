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

    $username=$_POST['username'];
    $password=$_POST['password'];

$sql= "SELECT * FROM users WHERE username =='$username' and password =='$password'";  
$query= mysqli_query($con, $sql); 

while($User=$result->fetch_assoc()) 
{
    if($User['username'] == $username && $User['password'] == $password ) 
    {
        header("Location: admin.php"); 
    }else {
        header("Location: login.php");
    }
}
?>
<body>
  <!-- TODO get the whole sql statement here using POST method 
            so that we can know what to delete
  -->

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
    <!-- Confirm Modal -->
    <div class="body">
      <div class="delete-container">
        <div class="delete-header">
          Delete Confirm
        </div>
          <!-- TODO information of the deleted item -->
        <div class="delete-content">
          INFORMATION
        </div>
        <div class="delete-content">
          <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
          <button>Confirm</button>
        </div>
      </div>
    </div>
</body>

</html>