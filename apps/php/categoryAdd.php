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
    $name = $_POST["name"];
    $sql = "INSERT INTO categories(name) VALUES ('$name') ";
    $query = mysqli_query($conn, $sql);

    if(mysqli_affected_rows($conn) >= 1) {
      header("location:category.php");
    } else {
      header("location:categoryAdd.php?error=1");
    }
  }
?>

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
    <!-- Confirm Modal -->
    <div class="body">
        <div class="add-container">
            <div class="add-header">
                Add Category
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
                    <div class="required">Category Name</div>
                    <input class="input" name="name" required/>
                </form>
            </div>
            <div class="add-content">
                <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
                <button form="addForm" name="submitBtn">Submit</button>
            </div>
        </div>
    </div>
</body>

</html>