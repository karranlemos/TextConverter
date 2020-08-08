<!DOCTYPE html>
<html lang="<?=$lang_codes->get_lang_code()?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/css/style.css">
  <script src="/js/script.js"></script>
  <title><?=$lang_codes->translate('Text Conversor')?></title>
</head>
<body>
  <div id="container">
    <div id="navbar" class="container-parts">
      <nav>
        <div class="central-navbar">
          <div class="page-buttons">
            <button type="button" data-page-id="converter"><?=$lang_codes->translate('Converter')?></button>
            <button type="button" data-page-id="about"><?=$lang_codes->translate('About')?></button>
          </div>
          <div class="settings-buttons">
            <button type="button" class="languages-button"></button>
          </div>
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
      <?=$lang_codes->translate('Created by %s.', 'Karran Lemos');?>
    </footer>
  </div>

  <div id="modal-languages" class="modal">
    <div class="modal-viewpoint">
      <div class="modal-content">
        <header><span class="modal-title"><?=$lang_codes->translate('Choose a Language')?></span><span class="modal-close"></span></header>
        <div class="modal-body">
          <form action="" method="post">
            <div class="language-buttons">
  
              <?php
              $language_buttons_data = [
                'pt-br' => 'Português',
                'en' => 'English',
              ];
  
              // <button type="submit" name="site-language"
              //   title="Português" value="pt-br" class="language-button lang-pt-br">
              // </button>
              foreach ($language_buttons_data as $lang_code => $lang_text) {
                $class_marked = ($lang_code === $lang_codes->get_lang_code()) ? 'marked' : '';
  
                echo '<button type="submit" name="site-language" ';
                echo 'title="'.$lang_text.'" value="'.$lang_code.'" class="language-button lang-'.$lang_code.' '.$class_marked.'">';
                echo '</button>';
              }
              ?>
  
            </div>
          </form>
        </div>
      </div>  
    </div>
  </div>
</body>
</html>