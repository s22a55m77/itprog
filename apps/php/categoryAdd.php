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