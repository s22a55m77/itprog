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
        echo $_POST["type"];
        echo $_POST["id"];
        echo getUsername();
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
            <!-- TODO update function -->
            <div class="add-content">
                <form action="" method="POST" id="addForm">
                    <div class="required">Category Name</div>
                        <!--       Get Data from database            -->
                    <input class="input" name="name" value="Test" />
                </form>
            </div>
            <div class="add-content">
                <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
                <button form="addForm">Submit</button>
            </div>
        </div>
    </div>
</body>

</html>