<?php
/*
	Read Inputs File:
	Output Example:
	[
		{
			"name" : "name",
			"type" : "type"
		},
		{
			"name" : "name",
			"type" : "type"
		},
		{
			"name" : "name",
			"type" : "type"
		}
	]
*/
	define('fileUrl', '../settings/inputs.json');
	$file = fopen(fileUrl, 'r') or die("Unable to open file!");
	echo fread($file,filesize(fileUrl));
	fclose($file);
?>