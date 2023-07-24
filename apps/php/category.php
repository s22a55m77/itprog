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
    <?php
      if(isset($_POST['logout'])) {
        session_start();
        session_destroy();
        header("location:login.php");
      }
    ?>
    <div>
      <span>
        <a style="color: #fff" href="main.php"><span>Dish Management System</span></a>
      </span>
    </div>
      <div class="username">
          <div>
            <?php
              echo getUsername();
            ?>
          </div>
          <div class="dropdown">
              <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                  <button class="error" name="logout">Logout</button>
              </form>
          </div>
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