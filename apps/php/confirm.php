<?php
  require('utils.php');
  checkLogin();
  global $conn;
  $id = $_POST["id"];

  if ($_POST["type"] == "category") {
    $sql = "DELETE FROM categories WHERE id = $id";
    $query = mysqli_query($conn, $sql);

    $result = mysqli_affected_rows($conn);
    if ($result >= 1) {
      header("location:category.php");
    }
  }

  if ($_POST["type"] == "dish") {
    $sql = "DELETE FROM dishes WHERE id = $id";
    $query = mysqli_query($conn, $sql);

    $result = mysqli_affected_rows($conn);
    if ($result >= 1) {
      header("location:dish.php");
    }
  }

  if ($_POST["type"] == "combo") {
    $sql = "DELETE FROM combos WHERE name='$id'";
    $query = mysqli_query($conn, $sql);

    $result = mysqli_affected_rows($conn);
    if ($result >= 1) {
      header("location:combo.php");
    }
  }

  if ($_POST["type"] == "comboItem") {
    $sql = "DELETE FROM combos WHERE dish_id=$id";
    $query = mysqli_query($conn, $sql);

    $result = mysqli_affected_rows($conn);
    if ($result >= 1) {
      header("location:combo.php");
    }
  }


?>