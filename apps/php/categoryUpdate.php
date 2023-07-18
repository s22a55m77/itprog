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
            global $conn;
            echo getUsername();

            if(isset($_POST["submitBtn"])) {
                $name = $_POST["name"];
                $id = $_POST["id"];
                $sql = "UPDATE categories SET name='$name' WHERE id = $id";
                $query = mysqli_query($conn, $sql);

                if(mysqli_affected_rows($conn) >= 1) {
                    header("location:category.php");
                } else {
                    header("location:categoryUpdate.php?error=1");
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
            <?php
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
                        $id = $_POST["id"];
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