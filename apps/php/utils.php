<?php

    $conn = mysqli_connect("itprog.mysql.database.azure.com", "itprog", "DLSU1234!")
                or die ("Unable to connect!". mysqli_error());
    $db = mysqli_select_db($conn, 'public');


    function checkLogin() {
        session_start();
        if (!isset($_SESSION['getLogin'])) {
            header("location:login.php");
        }
    }

    function getUsername() {
        global $conn;

        $usernameFromSession = $_SESSION['getLogin'];

        $query = mysqli_query($conn, "SELECT username, password FROM users 
                                           WHERE username='$usernameFromSession'");

        $fetch = mysqli_fetch_array($query);

        return $fetch["username"];
    }

?>