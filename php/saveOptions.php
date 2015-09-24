<?php
/*
	Write Options file:
	Input Sample:
	{
		"base_url" : "some url",
		"controller" : "controller name",
		"method" : "method name",
		"send_method" : "send method",
		"form_enctype" : "enctype"
	}
*/
	$inputs = $_POST['options'];
	$file = fopen("../settings/options.json", "w") or die("Unable to open file!");
	fwrite($file, $inputs);
	fclose($file);
	echo "ok";
	?>