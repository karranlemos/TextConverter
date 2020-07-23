<!DOCTYPE html>
<html lang="<?php echo $lang_codes->get_lang_code(); ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/script.js"></script>
  <title><?php echo $lang_codes->translate('Text Conversor'); ?></title>
</head>
<body>
  <div id="container">
    <div id="navbar" class="container-parts">
      <nav>
        <div class="central-navbar">
          <button type="button" data-page-id="converter"><?php echo $lang_codes->translate('Converter'); ?></button>
          <button type="button" data-page-id="about"><?php echo $lang_codes->translate('About'); ?></button>
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
      <?php echo $lang_codes->translate('Created by %s.', 'Karran Lemos'); ?>
    </footer>
  </div>
</body>
</html>