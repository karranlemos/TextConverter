<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/script.js"></script>
  <title>Conversor de texto</title>
</head>
<body>
  <div id="container">
    <div id="navbar" class="container-parts">
      <nav>
        <div class="central-navbar">
          <button type="button" data-page-id="converter">Conversor</button>
          <button type="button" data-page-id="about">Sobre</button>
        </div>
        <button type="button" class="menu-button"></button>
      </nav>
    </div>

    <div id="container-content" class="container-parts">
      <main id="main">
        
        <?php
        foreach (['converter', 'about'] as $section) {
          echo '<section id="'.$section.'" class="page">';
          require_once(__ROOT__.'/pages/'.$section.'.php');
          echo '</section>';
        }
        ?>
        
      </main>
    </div>

    <footer>
      Criado por Karran Lemos.
    </footer>
  </div>
</body>
</html>