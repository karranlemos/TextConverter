<?php

const ABOUT_PATH_TEMPLATE = __DIR__.'/translations/about-%s.php';
$about_path = sprintf(ABOUT_PATH_TEMPLATE, $lang_codes->get_lang_code());
if (!file_exists($about_path))
  $about_path = sprintf(ABOUT_PATH_TEMPLATE, LanguageText::DEFAULT_LANG_CODE);
require($about_path);

?>