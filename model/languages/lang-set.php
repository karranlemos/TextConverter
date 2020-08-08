<?php

class LanguageText {
  
  const DEFAULT_LANG_CODE = 'en';
  const LANG_COOKIE_KEY = 'site-language';
  const LANG_POST_KEY = 'site-language';
  const AVAILABLE_LANGUAGES = [
    'en',
    'pt-br'
  ];
  const DECADE_IN_SECONDS = 315360000;
  private $lang_code;
  private $lang_translator;

  function __construct() {

    $this->lang_code = $this->get_language_cookies();
    if (!file_exists($this->create_lang_path()))
      $this->lang_code = self::DEFAULT_LANG_CODE;
    require($this->create_lang_path());
    $this->lang_translator = $lang;
  }

  public function translate($id, ...$args) {
    $output = $this->lang_translator[$id] ?? '';
    if ($output === '')
      $output = $id;
    if (count($args) > 0) {
      $output = call_user_func_array('sprintf', array_merge([$output], $args));
      if ($output === false)
        return $id;
    }
    return $output;
  }

  public function get_lang_code() {
    return $this->lang_code;
  }

  private function create_lang_path() {
    return __DIR__.'/lang.'.$this->lang_code.'.php';
  }

  private function get_language_cookies() {
    if (isset($_POST[self::LANG_POST_KEY]) && in_array($_POST[self::LANG_POST_KEY], self::AVAILABLE_LANGUAGES)) {
      setcookie(self::LANG_COOKIE_KEY, $_POST[self::LANG_POST_KEY], time()+self::DECADE_IN_SECONDS, '/');
      return $_POST[self::LANG_POST_KEY];
    }
    else if (isset($_COOKIE[self::LANG_COOKIE_KEY]) && in_array($_COOKIE[self::LANG_COOKIE_KEY], self::AVAILABLE_LANGUAGES))
      return $_COOKIE[self::LANG_COOKIE_KEY];
    else
      return self::DEFAULT_LANG_CODE;
  }
}

$lang_codes = new LanguageText();

?>