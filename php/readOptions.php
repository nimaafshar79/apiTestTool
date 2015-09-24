<?php
/*
	Read Options File:
	Output Example:
	{
		"base_url" : "some url",
		"controller" : "controller name",
		"method" : "method name",
		"send_method" : "send method",
		"form_enctype" : "enctype"
	}
*/
	define('fileUrl', '../settings/options.json');
	$file = fopen(fileUrl, 'r') or die("Unable to open file!");
	echo fread($file,filesize(fileUrl));
	fclose($file);
?>