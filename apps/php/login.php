<!DOCTYPE html>
<html lang='en'>

<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<?php
    require("utils.php");

    if (isset($_POST["loginBtn"])) {
        global $conn;
        $user=$_POST["username"];
        $pass=$_POST["password"];

        $query = mysqli_query($conn, "SELECT username, password FROM users 
                                           WHERE username='$user'
                                           AND password='$pass'");
        $fetch = mysqli_fetch_array($query);

        if($user==$fetch["username"] && $pass==$fetch["password"]) {
            session_start();
            $_SESSION['getLogin'] = $user;
            header("location:main.php");
        } else {
            header("location:login.php?error=1");
        }
    }
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
            <?php
            if(isset($_GET["error"])) {
                $error=$_GET["error"];
                if ($error==1) {
                    echo "<div class='alert'>Username and/or password invalid<br/></div>";
                }
            }
            ?>
          <form action="login.php" method="POST">
            <input name="username" placeholder="username"/>
            <input name="password" type="password" placeholder="password"/>
              <button style="margin-top: 10px" name="loginBtn">Login</button>
          </form>
        </div>
      </div>
    </div>
</body>

</html>