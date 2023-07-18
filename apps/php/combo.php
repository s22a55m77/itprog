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
        <a style="color: #fff" href="main.php"> Dish Management System </a>
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
              <button>
                  <a href="comboAdd.php" style="color: #fff;">
                      + New
                  </a>
              </button>
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
          <!-- fetch data from db -->
           <?php
             global $conn;
             $sql = "SELECT c.id, c.name, c.discount, 
                    d.name as dish_name
                    FROM combos c LEFT JOIN dishes d ON c.dish_id=d.id 
                    ORDER BY c.name";
             $query = mysqli_query($conn, $sql); 

             if (mysqli_num_rows($query) > 0) {
                 while ($row = mysqli_fetch_assoc($query)) {
                     echo "<tr>";
                     echo "<td>" . $row['id'] . "</td>";
                     echo "<td>" . $row['name'] . "</td>";
                     echo "<td>" . $row['dish_name'] . "</td>";
                     echo "<td>" . $row['discount'] . "</td>";
                     echo "<td  style='display: flex; justify-content: center; gap: 10px'>
                                <form action='delete.php' method='POST'>
                                  <input hidden='true' name='type' value='combo' />
                                  <button type='submit' name='id' value=".$row['id'].">Delete</button>
                                </form>
                                <form action='comboUpdate.php' method='POST'>
                                  <button type='submit' name='id' value=".$row['id'].">Update</button>
                                </form>
                            </td>";
                     echo "</tr>";
                }
            } else {
                echo "No data found.";
            }
            mysqli_close($conn);
           ?>
        </table>
      </div>
    </div>
  </div>
</body>
</html>