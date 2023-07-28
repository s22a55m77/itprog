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


<script>
    function redirectOnChange(selectElement) {
        const selectedValue = selectElement.value;
        if (selectedValue !== "") {
            window.location.href = `comboItemAdd.php?dishNum=${selectedValue}`;
        }
    }
</script>

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
    $name = isset($_GET["combo"]) ? $_GET["combo"] : $_SESSION["combo"];

    $_SESSION["combo"] = $name;
    $dishNum = $_POST["dishNum"];

    $query = mysqli_query($conn, "SELECT * FROM combos WHERE name='$name'");
    $combo = mysqli_fetch_object($query);
    $discount = $combo->discount;
    echo $discount;
    for ($i = 1; $i <= $dishNum; $i++) {
      $dishId = $_POST["dish".$i];
      $sql = "INSERT INTO combos(name, dish_id, discount) VALUES ('$name', '$dishId', '$discount') ";
      $query = mysqli_query($conn, $sql);
    }

    if(mysqli_affected_rows($conn) >= 1) {
      header("location:combo.php");
      unset($_SESSION["name"]);
    } else {
      header("location:comboItemAdd.php?error=1");
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
        Add Combo Item
      </div>
      <!-- add function -->
      <?php
        if(isset($_GET["error"])) {
          $error=$_GET["error"];
          if ($error==1) {
            echo "<div class='alert'>Add Failed<br/></div>";
          }
        }
      ?>
      <div class="add-content">
        <form action="" method="POST" id="addForm">
            <div style="margin-bottom: 10px">
                <div>Number of Dishes</div>
                <div style="display: flex; gap: 10px">
                    <select class="input" style="display: inline-flex; height: auto" name="dishNum" onchange="redirectOnChange(this)">
                      <?php
                        echo "";
                        $dishNum = isset($_GET["dishNum"]) ? $_GET["dishNum"] : 1;
                        for($i = 1; $i <= 10; $i++) {
                          echo "<option value='$i'";
                          if ($dishNum == $i)
                            echo "selected='selected'";
                          echo ">$i</option>";
                        }
                      ?>
                    </select>
                </div>
            </div>
            <div class="required">Dishes</div>
              <?php
                global $conn;
                $combo = isset($_GET["combo"]) ? $_GET["combo"] : $_SESSION["combo"];
                echo "<input hidden='true' name='dishNum' value='$dishNum'>";
                for ($i = 1; $i<=$dishNum; $i++) {
                  echo "<select class='input' style='height: auto' name='dish".$i."'>";
                  $sql = "SELECT id, name FROM dishes WHERE id NOT IN (
                            SELECT dish_id FROM combos WHERE name = '$combo'
                          );";
                  $query = mysqli_query($conn, $sql);

                  while ($row = mysqli_fetch_assoc($query)) {
                    $id = $row['id'];
                    echo "<option value='$id'>" . $row['name'] . "</option>";
                  }
                  echo "</select>";
                }
              ?>
        </form>
      </div>
      <div class="add-content">
        <button class="error"><a href="combo.php" style="color: #fff">Cancel</a></button>
        <button form="addForm" name="submitBtn">Submit</button>
      </div>
    </div>
  </div>
</body>

</html>