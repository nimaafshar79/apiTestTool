<?php
/*
	Read Setting File
	Ouptut Example:
	{
		"use_localhost" : true 		,
		"autoload_inputs" : false 	,
		"autoload_options" :false
	}
*/
define('fileUrl', '../settings/settings.json');
$file = fopen(fileUrl, 'r') or die("Unable to open file!");
echo fread($file, filesize(fileUrl));
//fclose($file);
?>