<!DOCTYPE html>
<html lang='en'>

<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO get the login credentials here using $_POST 
          redirect to main.php after successfully login
-->
<?php
    $host = "localhost";
    $username = "itprog";
    $password = "DLSU1234!";
    $database = "itprog.mysql.database.azure.com";

    $conn = mysqli_connect($host, $username, $password, $database);

    if (mysqli_connect_errno()) {
        die("Failed to connect to MySQL: " . mysqli_connect_error());
    }

    if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])) {
        $UserID = mysqli_real_escape_string($conn, $_POST['username']);
        $pass = mysqli_real_escape_string($conn, md5($_POST['password']));

        $search = mysqli_query($conn, "SELECT username, password FROM users WHERE username='" . $UserID . "' AND password='" . $pass . "'") or die(mysqli_error($conn));
        $match  = mysqli_num_rows($search);   //search database for user info

        if ($match > 0) {
             $msg = 'Login Complete!';    
             header("location: main.php");
             exit;   
        } else {
             $msg = 'Login Failed!<br /> Please make sure that you enter the correct details.';
        }
    }

    mysqli_close($conn);
?>

<body>
  <div class="navbar">
    <div>
      <span> Dish Management System <span>
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- Confirm Modal -->
    <div class="body">
      <div class="login-container">
        <div class="login-header">
          Login Form
        </div>
        <div class="login-content">
          <form action="login.php" method="POST">
            <input placeholder="username"/>
            <input type="password" placeholder="password"/>
          </form>
        </div>
        <div class="login-content">
          <button>Login</button>
        </div>
      </div>
    </div>
</body>

</html>