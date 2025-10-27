/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import { PanelBody, TextControl } from '@wordpress/components';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
// export default function Edit() {
// 	return (
// 		<p { ...useBlockProps() }>
// 			{ __(
// 				'ST Map List Block – This is what it looks like in the editor.',
// 				'st-map-list-block'
// 			) }
// 		</p>
// 	);
// }

export default function Edit({ attributes, setAttributes }) {
	const {sheetId} = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="Map Settings">
					<TextControl
						label="Google Sheet ID"
						value={sheetId}
						onChange={(value) => setAttributes({ sheetId: value })}
						help="Paste your Google Sheet ID here"
					/>
				</PanelBody>
			</InspectorControls>
			

			<div { ...useBlockProps() }>
					<p style={{ padding: '20px', background: '#b7b7b7', border: '2px dashed #999' }}>
						<strong>ST Map List Block</strong><br />
						{sheetId ? `Sheet ID: ${sheetId}` : 'Enter a Google Sheet ID in the sidebar →'}
					</p>
			</div>
		</>
	);
}

