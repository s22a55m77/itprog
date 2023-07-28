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
          <a style="color: #fff" href="index.php"><span>Dish Management System</span></a>
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
        Dish
      </div>
      <div class="content">
        <div class="content-header">
          <span>Dish Table</span>
          <div>
            <button>
              <a href="dishAddXML.php" style="color: #fff;">
                  + Upload XML
              </a>
            </button>
            <button>
                <a href="dishAdd.php" style="color: #fff;">
                    + New
                </a>
            </button>
            <button>
              <a href="dish.php" style="color: #fff;">
                Refresh
              </a>
            </button>
          </div>
        </div>
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Image</th>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          <!-- fetch data from db -->
          <?php
            $sql = "SELECT
                        d.id, d.name, d.description, d.price, d.image,
                        c.name AS category
                    FROM
                        dishes d LEFT JOIN categories c ON d.category_id=c.id
                    ORDER BY d.id, c.name;";

            global $conn;
            // Execute the query
            $result = mysqli_query($conn, $sql);

            // Check if the query was successful
            if ($result) {
                // Loop through the results and print each row
                while ($row = mysqli_fetch_assoc($result)) {
                    echo '<tr>';
                    echo '<td>' . $row['id'] . '</td>';
                    echo '<td><img src="' . $row['image'] . '" alt="' . $row['name'] . '"></td>';
                    echo '<td>' . $row['category'] . '</td>';
                    echo '<td>' . $row['name'] . '</td>';
                    echo '<td>' . $row['description'] . '</td>';
                    echo '<td>' . $row['price'] . '</td>';
                    echo '<td>';
                    echo "<form action='delete.php' method='POST'>";
                    echo "<input type='hidden' name='type' value='dish' />";
                    echo "<button type='submit' name='id' value='" . $row['id'] . "'>Delete</button>";
                    echo "</form>";
                    echo "<form action='dishUpdate.php' method='POST' style='margin-top: 5px'>";
                    echo "<button type='submit' name='id' value='" . $row['id'] . "'>Update</button>";
                    echo "</form>";
                    echo "</td>";
                    echo '</tr>';
                }
            } else {
                // Query failed
                echo 'Error: ' . mysqli_error($conn);
            }
            ?>
        </table>
      </div>
    </div>
  </div>
</body>
</html>
