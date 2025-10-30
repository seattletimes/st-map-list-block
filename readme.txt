=== St Map List Block ===
Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      6.7
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Seattle Times map list block scaffolded with Create Block tool.

== Description == 
This block was created in order to improve the utility of ST recommendation lists for readers. Currently, readers must manually copy and paste the addresses of places mentioned in the story into Google Maps or Yelp in order to see where it is on a map or find logistical information. 
This map block aims to give readers the logistical information they need to make use of ST reviews without having to leave the site. It is also designed in a way that allows reporters and editors to have full agency over the process without having to get the graphics or development teams involved.

== Potential use cases ==
- New restaurant roundups
- Arts/entertainment guides 
- Weekend activities stories
- Places to celebrate/view/experience [XYZ] stories

These may require adding additional features/style options, but this tool could also be used for:
- Law and justice stories
- Traffic stories
- Climate lab stories
- And more...

== Workflow explanation ==
1. Reporter inputs addresses into a copied version of this Google Sheet (https://docs.google.com/spreadsheets/d/1-wPc2d11ffvzw6neuPJ2yQWWhCz76Y8_n_X8Vf2WepA/edit?gid=1945274273#gid=1945274273), which will geocode the addresses using an app script. Name and address are required, all other fields are optional.

2. In a WordPress story, the reporter will add a new block and select "St map list block"

3. Reporter copies and pastes Google Sheet ID into the WP block, where it is stored as a data attribute

4. `view.js` takes the sheet ID and uses gviz to get the contents as a JSON object

5. A few functions in `view.js` run to add location markers, popups, and sidebar list items based on each row. The map is created using Leaflet and OpenStreetMap tiles. 

6. Reporter previews the page to see the map block. Upon making changes to the sheet, the reporter can refresh the preview page to see the updated version. 

== Future goals == 
In the future, potential opportunities for this tool might include:
- Making multiple subject-specific versions of this tool that have additional filter/style capabilities depending on the subject (i.e. cuisine filters for a restaurant map)
- A version that is more tailored to showing a single location (its details could all be visible in the sidebar rather than hidden in the popup)
- Having the map block live outside of articles (perhaps on a section's landing page)