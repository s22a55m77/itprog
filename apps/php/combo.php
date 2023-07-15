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
    $query = mysqli_query($conn, $sql); 

    if ($query->num_rows > 0) {
        echo("You logged in successfully");
    } else {
        header("Location: login.php");
    }
?>
?>
<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span>
        <a style="color: #fff" href="main.php"> Dish Management System </a>
      </span>
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
      <a class="menu active" href="combo.php">
        Combo
      </a> 
    </div>
    
    <!-- BODY -->
    <div class="body">
      <div class="header">
        Combo
      </div>
      <div class="content">
        <div class="content-header">
          <span>Combo Table</span>
          <div>
            <button>+ New</button>
            <button>
              <a href="combo.php" style="color: #fff;">
                Refresh
              </a>
            </button>
          </div>
        </div>  
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Name</th>
            <th>Dish</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
          <!-- TODO fetch data from db -->
           <?php

             $sql = "SELECT * FROM combos"; 
             $query = mysqli_query($conn, $sql); 

             if (mysqli_num_rows($query) > 0) {
             while ($row = mysqli_fetch_assoc($query)) {
             $id = $row['id'];
             $name = $row['name'];
             $dish_id = $row['dish_id'];
             $discount = $row['discount'];
            
             echo "ID: " . $id . "<br>";
             echo "Name: " . $name . "<br>";
             echo "Dish: " . $dish_id . "<br>";
             echo "Discount: " . $discount . "<br>";
             echo "<br>";
            } 
            } else {
                echo "No data found.";
            }
            mysqli_close($conn);
           ?>
          <tr>
            <td>1</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Chicken</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Mash Potato</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Ice Tea</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <!-- END OF TODO-->
        </table>
      </div>
    </div>
  </div>
</body>
</html>