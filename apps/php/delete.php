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
    session_start();
    $conn = mysqli_connect("localhost", "root", "DLSU1234!") or die ("Unable to connect!". mysqli_error());
    mysqli_select_db($conn, "itprog.mysql.database.azure.com");

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";  
    $query = mysqli_query($con, $sql); 

    if ($query->num_rows > 0) {
        echo("You logged in successfully");
    } else {
        header("Location: login.php");
    }
?>
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