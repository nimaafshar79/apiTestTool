<?php
/*
	Write Setting File
	Input Example:
	{
		"use_localhost" : true 		,
		"autoload_inputs" : false 	,
		"autoload_options" :false
	}
*/
	$inputs = $_POST['settings'];
	$file = fopen("../settings/settings.json", "w") or die("Unable to open file!");
	fwrite($file, $inputs);
	fclose($file);
	echo "ok";

	?>