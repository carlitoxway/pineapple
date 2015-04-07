<?php
session_start();
require_once("twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "@carlitoxway";
$notweets = 6;
$consumerkey = "tbyWPqJSWRxs8lCbzHNnA";
$consumersecret = "NrveBxs0XbbKfDy2QY8cQPnEumC7Pe3w3x65enCsXo";
$accesstoken = "26759143-5U2uYSFgHeCnCO42GRPuupx3fPe0RtAmHSu6mhPvx";
$accesstokensecret = "rT64egwOid7IO5vrrRv5XaX0QCQdKt5xCfhd2g8GhHxbT";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>