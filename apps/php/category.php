<?php
require("utils.php");
require('icon.php');
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
        <a style="color: #fff" href="index.php"><span>Dish Management System</span></a>
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
          <!-- fetch data from db -->
          <?php
            global $conn;

            // Directly execute the SQL query and store the result set in $query
            $sql = "SELECT id, name
                     FROM categories
                     ORDER BY id";
            $query = mysqli_query($conn, $sql);

            // Loop through the data and populate the table rows dynamically
            if ($query && mysqli_num_rows($query) > 0) {
              while ($row = mysqli_fetch_assoc($query)) {
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['name'] . "</td>";
                echo "<td style='display: flex; justify-content: center; gap: 10px'>";
                echo "<form action='delete.php' method='POST'>";
                echo "<input type='hidden' name='type' value='category' />";
                echo "<button type='submit' name='id' value='" . $row['id'] . "'>Delete</button>";
                echo "</form>";
                echo "<form action='categoryUpdate.php' method='POST'>";
                echo "<button type='submit' name='id' value='" . $row['id'] . "'>Update</button>";
                echo "</form>";
                echo "</td>";
                echo "</tr>";
              }
            } else {
              echo "<tr><td colspan='5'>No data found in the table.</td></tr>";
            }
          ?>
        </table>
      </div>
    </div>
  </div>
</body>
</html>