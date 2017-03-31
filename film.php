<?php
$conf = json_decode(file_get_contents(__DIR__.'/../.env'), true);
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://api.themoviedb.org/3/movie/upcoming?api_key=' . $conf['api_key'] . $_GET['page'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "{}",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}