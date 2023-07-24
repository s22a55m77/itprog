<?php
require("utils.php");

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
        <span><?php echo $_POST['name']?></span>
        <div>
          <button>
            <a href="comboItemAdd.php?combo=<?php echo $_POST['name']?>" style="color: #fff;">
              + Add
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
          $name = $_POST['name'];
          $sql = "SELECT d.name as dish_name, d.id
                  FROM combos c LEFT JOIN dishes d ON c.dish_id=d.id
                  WHERE c.name = '$name'";
          $query = mysqli_query($conn, $sql);

          if (mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
              echo "<tr>";
              echo "<td>" . $row['id'] . "</td>";
              echo "<td>" . $row['dish_name'] . "</td>";
              echo "<td  style='display: flex; justify-content: center; gap: 10px'>
                                <form action='delete.php' method='POST'>
                                  <input hidden='true' name='type' value='comboItem' />
                                  <button type='submit' name='id' value=".$row['id'].">Delete</button>
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