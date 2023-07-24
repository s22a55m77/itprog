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

<?php
  if(isset($_POST["submitBtn"])) {
    global $conn;

    $id = $_POST["id"];
    $changes_occurred = false;

    if (isset($_POST["name"])) {
      $name = $_POST["name"];
      mysqli_query($conn, "UPDATE combos SET name='$name' WHERE name = '$id'");
      $changes_occurred = true;
    }

    if (isset($_POST["discount"])) {
      $discount = $_POST["discount"];
      mysqli_query($conn, "UPDATE combos SET discount='$discount' WHERE name = '$id'");
      $changes_occurred = true;
    }

    if($changes_occurred) {
      header("location:combo.php");
    } else {
      $_SESSION["id"] = $id;
      header("location:comboUpdate.php?error=1");
    }
  }
?>

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
  <!-- Confirm Modal -->
  <div class="body">
    <div class="add-container">
      <div class="add-header">
        Update Combo
      </div>
      <?php
        if (isset($_POST["id"])) {
          $id = $_POST["id"];
        } else {
          $id = $_SESSION["id"];
          unset($_SESSION["id"]);
        }

        if(isset($_GET["error"])) {
          $error=$_GET["error"];
          if ($error==1) {
            echo "<div class='alert'>Update Failed<br/></div>";
          }
        }
      ?>
      <!-- update function -->
      <div class="add-content">
        <form action="comboUpdate.php" method="POST" id="updateForm">
          <div class="required">Combo Name</div>
          <!--       Get Data from database            -->
          <?php
            $sql = "SELECT * FROM combos WHERE name = '$id'";
            $query = mysqli_query($conn, $sql);
            $result = mysqli_fetch_object($query);
            echo "<input hidden name=\"id\" value=".$id." />";
            echo "<input class=\"input\" name=\"name\" value=".$result->name." />"
          ?>
          <br />
          <div class="required">Discount</div>
          <?php
            echo "<input class='input' type='number' name='discount' value='".$result->discount."'/>";
          ?>
        </form>
      </div>
      <div class="add-content">
        <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
        <button form="updateForm" name="submitBtn">Submit</button>
      </div>
    </div>
  </div>
</body>

</html>