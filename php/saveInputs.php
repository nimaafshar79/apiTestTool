<?php
	/*
		Save Inputs File
		Post Inputs Example:
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
		$inputs = $_POST['inputs'];
		$file = fopen("../settings/inputs.json", "w") or die("Unable to open file!");
		fwrite($file, $inputs);
		fclose($file);
		echo "ok";
?>