import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils
};

/* globals ol3turf, turf */

//==================================================
// intersect control
//--------------------------------------------------
export default (function (ol3turf) {

    "use strict";

    // Control name
    var name = "intersect";

    /**
     * Compute intersection of two polygons
     * @private
     */
    var action = function (control) {

        var collection = ol3turf.utils.getCollection(control, 2, 2);
        var polygons = ol3turf.utils.getPolygonsAll(collection, 2, 2);

        var poly1 = polygons[0];
        var poly2 = polygons[1];
        var output = turf.intersect(poly1, poly2);
        var inputs = {
            poly1: poly1,
            poly2: poly2
        };
        control.toolbar.ol3turf.handler.callback(name, output, inputs);


    };

    return {
        /*
         * Create control then attach custom action and it's parent toolbar
         * @param toolbar Parent toolbar
         * @param prefix Selector prefix.
         */
        create: function (toolbar, prefix) {
            var title = "Create Intersection Polygon";
            var control = ol3turf.Control.create(toolbar, prefix, name, title, action);
            return control;
        }
    };


}(ol3turf || {}));
