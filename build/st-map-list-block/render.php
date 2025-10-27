<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$sheet_id = isset($attributes['sheetId']) ? $attributes['sheetId'] : '';
?>
<link rel="stylesheet" type='text/css' href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

	<div <?php echo get_block_wrapper_attributes(); ?>
      data-sheet-id="<?php echo esc_attr($sheet_id); ?>";
      id="my-data"
   >
	<!-- <div class="random-number-block">
		<button id="generate-btn">Generate Random Number</button>
		<p>Result: <span id="result">Click the button!</span></p>
	</div> -->

	<div id="map-container">
      <div id="map-sidebar">
        <ul id="sidebar-ul">
        </ul>
      </div>
      <div id="map"></div>
    </div>


</div>
</p>
