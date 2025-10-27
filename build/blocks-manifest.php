<?php
// This file is generated. Do not modify it manually.
return array(
	'st-map-list-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/st-map-list-block',
		'version' => '0.1.0',
		'title' => 'St Map List Block',
		'category' => 'widgets',
		'icon' => 'star',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'sheetId' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'st-map-list-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
