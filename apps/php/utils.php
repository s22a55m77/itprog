<?php

    $conn = mysqli_connect("itprog.mysql.database.azure.com", "itprog", "DLSU1234!")
                or die ("Unable to connect!". mysqli_error());
    $db = mysqli_select_db($conn, 'public');

    function verifyLogin() {
        global $conn;

    }


    function checkLogin() {
        session_start();
        if (!isset($_SESSION['getLogin'])) {
            header("location:login.php");
        }
    }

?>