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

  <div class="navbar">
    <div>
        <a style="color: #fff" href="main.php"><span>Dish Management System</span></a>
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
            <?php
                global $conn;
                $id = $_POST["id"];

                if ($_POST["type"] == "category") {
                    $sql = "SELECT * FROM categories WHERE id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                    echo "ID: ".$result->id." Name: ".$result->name;
                }

                if ($_POST["type"] == "dish") {
                    $sql = "SELECT * FROM dishes WHERE id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                    echo "ID: ".$result->id." Name: ".$result->name;
                }

                if ($_POST["type"] == "combo") {
                    $sql = "SELECT c.id AS id, c.name AS name, d.name AS dish 
                            FROM combos c LEFT JOIN dishes d ON c.dish_id=d.id
                            WHERE c.id = $id";
                    $query = mysqli_query($conn, $sql);
                    $result = mysqli_fetch_object($query);

                    echo "ID: ".$result->id." Name: ".$result->name." Dish: ".$result->dish;
                }

            ?>
        </div>
        <div class="delete-content">
          <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
            <!-- TODO wait for the lesson from networking, use ajax to POST confirm.php to delete    -->
          <button>Confirm</button>
        </div>
      </div>
    </div>
</body>

</html>