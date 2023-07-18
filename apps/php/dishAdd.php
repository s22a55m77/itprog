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
<!-- TODO get the whole sql statement here using POST method
          so that we can know what to delete
-->

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
        <a class="menu active" href="dish.php">
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
                Add Combo
            </div>
            <!-- TODO add function  -->
            <div class="add-content">
                <form action="" method="POST" id="addForm">
                    <div class="required">Combo Name</div>
                    <input class="input" name="name" required/>
                    <br />
                    <div class="required">Category Name</div>
                    <select class="input" style="height: auto" name="category_id">
                        <?php
                            global $conn;
                            $sql = "SELECT c.id, c.name FROM categories c";
                            $query = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($query)) {
                                $id = $row['id'];
                                echo "<option value='$id'>" . $row['name'] . "</option>";
                            }
                        ?>
                    </select>
                    <br />
                    <div class="required">Price</div>
                    <input class="input" type="number" name="price" required/>
                    <br />
                    <div>Description</div>
                    <textarea class="input" name="description" ></textarea>
                    <br />
                    <div>Image</div>
                    <input class="input" style="height: auto" type="file" accept="image/png, image/jpeg"/>
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