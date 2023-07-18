<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- add the session guard here
          redirect to login.php if not login
-->
<?php
    require("utils.php");

    checkLogin();
?>

<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span>
        <a style="color: #fff" href="main.php"><span>Dish Management System</span></a>
      </span>
    </div>
    <div>
        <?php
            echo getUsername();
        ?>
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu active" href="category.php">
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
      <div class="header">
        Category
      </div>
      <div class="content">
        <div class="content-header">
          <span>Category Table</span>
          <div>
            <button><a style="color: white" href="categoryAdd.php">+ New</a></button>
            <button>
              <a href="category.php" style="color: #fff;">
                Refresh
              </a>
            </button>
          </div>
        </div>  
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          <!-- TODO fetch data from db @Bryan -->
          <tr>
            <td>1</td>
            <td>Mains</td>
            <td style="display: flex; justify-content: center; gap: 10px">
                <form action="delete.php" method="POST">
                    <input hidden="true" name="type" value="category" />
                    <!-- change the value to the id of the category                   -->
                    <button type="submit" name="id" value="id">Delete</button>
                </form>
                <form action="categoryUpdate.php" method="POST">
                    <!-- same here                   -->
                    <button type="submit" name="id" value="1">Update</button>
                </form>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sides</td>
              <td style="display: flex; justify-content: center; gap: 10px">
                  <form action="delete.php" method="POST">
                      <input hidden="true" name="type" value="category" />
                      <!-- change the value to the id of the category                   -->
                      <button type="submit" name="id" value="id">Delete</button>
                  </form>
                  <form action="categoryUpdate.php" method="POST">
                      <!-- same here                   -->
                      <button type="submit" name="id" value="id">Update</button>
                  </form>
              </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Drink</td>
              <td style="display: flex; justify-content: center; gap: 10px">
                  <form action="delete.php" method="POST">
                      <input hidden="true" name="type" value="category" />
                      <!-- change the value to the id of the category                   -->
                      <button type="submit" name="id" value="id">Delete</button>
                  </form>
                  <form action="categoryUpdate.php" method="POST">
                      <!-- same here                   -->
                      <button type="submit" name="id" value="id">Update</button>
                  </form>
              </td>
          </tr>
          <!-- END OF TODO-->
        </table>
      </div>
    </div>
  </div>
</body>
</html>