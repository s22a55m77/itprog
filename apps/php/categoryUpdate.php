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
    $id = $_POST["id"];
    $sql = "UPDATE categories SET name='$name' WHERE id = $id";
    $query = mysqli_query($conn, $sql);

    if(mysqli_affected_rows($conn) >= 1) {
      header("location:category.php");
    } else {
      $_SESSION["id"] = $id;
      header("location:categoryUpdate.php?error=1");
    }
  }
?>

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
    <!-- Confirm Modal -->
    <div class="body">
        <div class="add-container">
            <div class="add-header">
                Add Category
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
                <form action="categoryUpdate.php" method="POST" id="updateForm">
                    <div class="required">Category Name</div>
                        <!--       Get Data from database            -->
                    <?php
                        $sql = "SELECT * FROM categories WHERE id = $id";
                        $query = mysqli_query($conn, $sql);
                        $result = mysqli_fetch_object($query);
                        echo "<input hidden name=\"id\" value=".$id." />";
                        echo "<input class=\"input\" name=\"name\" value=".$result->name." />"
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