<?php

class LanguageText {
  
  const DEFAULT_LANG_CODE = 'en';
  private $lang_code;
  private $lang_translator;

  function __construct($lang_code=self::DEFAULT_LANG_CODE) {
    $this->lang_code = $lang_code;
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
    return __ROOT__.'/languages/lang.'.$this->lang_code.'.php';
  }
}

$lang_codes = new LanguageText('pt-br');

?>