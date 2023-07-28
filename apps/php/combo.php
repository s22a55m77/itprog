<?php
require("utils.php");
require("icon.php");
checkLogin();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span>
        <a style="color: #fff" href="index.php"> Dish Management System </a>
      </span>
    </div>
      <div class="username">
          <div>
            <?php
              echo getUsername();
            ?>
          </div>
          <div class="dropdown">
            <button class="error" name="logout">
              <a href='logout.php' style='color: white'>
                Logout
              </a>
            </button>
          </div>
      </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
        <a class="menu" href="category.php">
            <div style="margin-top: 2px; margin-right: 5px">
              <?php categoryIcon(); ?>
            </div>
            Category
        </a>
        <a class="menu" href="dish.php">
            <div style="margin-top: 5px; margin-right: 5px">
              <?php dishIcon(); ?>
            </div>
            Dish
        </a>
        <a class="menu" href="combo.php">
            <div style="margin-top: 3px; margin-right: 5px">
              <?php comboIcon(); ?>
            </div>
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
            <th>Name</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
          <!-- fetch data from db -->
           <?php
             global $conn;
             $sql = "SELECT DISTINCT c.name, c.discount
                    FROM combos c
                    ORDER BY c.name";
             $query = mysqli_query($conn, $sql); 

             if (mysqli_num_rows($query) > 0) {
                 while ($row = mysqli_fetch_assoc($query)) {
                    echo "<tr>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['discount'] . "</td>";
                    echo "<td  style='display: flex; justify-content: center; gap: 10px'>
                            <form action='delete.php' method='POST'>
                              <input type='hidden' name='type' value='combo' />
                              <button type='submit' name='id' value=".'"'.$row['name'].'"'.">Delete</button>
                            </form>
                            <form action='comboDetails.php' method='POST'>
                              <button type='submit' name='name' value=".'"'.$row['name'].'"'.">Details</button>
                            </form>
                            <form action='comboUpdate.php' method='POST'>
                                  <button type='submit' name='id' value=".$row['name'].">Update</button>
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