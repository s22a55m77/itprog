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
          <!-- information of the deleted item -->
        <div class="delete-content">
            <table class="table">
            <?php
                global $conn;
                $id = $_POST["id"];
                $type = $_POST["type"];

                if ($type == "category") {
                    $sql = "SELECT * FROM categories WHERE id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                    echo "<tr class=table-header>";
                    echo "<th>ID</th>";
                    echo "<th>Name</th>";
                    echo "</tr>";
                    echo "<tr>";
                    echo "<th>".$result->id."</th><th>".$result->name."</th>";
                }

                if ($type == "dish") {
                    $sql = "SELECT * FROM dishes WHERE id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                    echo "<tr class=table-header>";
                    echo "<th>ID</th>";
                    echo "<th>Name</th>";
                    echo "</tr>";
                    echo "<tr>";
                    echo "<th>".$result->id."</th><th>".$result->name."</th>";
                }

                if ($type == "combo") {
                    $sql = "SELECT c.id AS id, c.name AS name, d.name AS dish 
                            FROM combos c LEFT JOIN dishes d ON c.dish_id=d.id
                            WHERE c.id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                  echo "<tr class=table-header>";
                  echo "<th>ID</th>";
                  echo "<th>Name</th>";
                  echo "<th>Dish</th>";
                  echo "</tr>";
                  echo "<tr>";
                  echo "<th>".$result->id."</th><th>".$result->name."</th><th>".$result->dish."</th>";
                }

              if ($type == "comboItem") {
                $sql = "SELECT c.id AS id, c.name AS name, d.name AS dish 
                            FROM combos c LEFT JOIN dishes d ON c.dish_id=d.id
                            WHERE d.id = $id";
                $query = mysqli_query($conn, $sql);
                $result = mysqli_fetch_object($query);

                echo "<tr class=table-header>";
                echo "<th>ID</th>";
                echo "<th>Combo Name</th>";
                echo "<th>Dish</th>";
                echo "</tr>";
                echo "<tr>";
                echo "<th>".$result->id."</th><th>".$result->name."</th><th>".$result->dish."</th>";
              }

            ?>
                </tr>
            </table>
        </div>
        <div class="delete-content">
            <form action="confirm.php" method="POST" id="deleteForm">
                <?php
                    echo "<input hidden='true' name='type' value='$type' />";
                    echo "<input hidden='true' name='id' value='$id'/>";
                ?>
            </form>
          <button class="error"><a href="<?php if ($type == "comboItem") echo "combo.php"; else echo "javascript:history.back()"; ?>" style="color: #fff">Cancel</a></button>
          <button type="submit" form="deleteForm">Confirm</button>
        </div>
      </div>
    </div>
</body>

</html>