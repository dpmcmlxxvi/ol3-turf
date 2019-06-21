import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils
};

/* globals ol3turf, turf */

//==================================================
// pointOnLine control
//--------------------------------------------------
export default (function (ol3turf) {

    "use strict";

    // Control name
    var name = "point-on-line";

    /**
     * Compute point on line
     * @private
     */
    var action = function (control) {

        var collection = ol3turf.utils.getCollection(control, 2, 2);
        var points = ol3turf.utils.getPoints(collection, 1, 1);
        var lines = ol3turf.utils.getLines(collection, 1, 1);
        var line = lines[0];
        var point = points[0];

        var output = turf.pointOnLine(line, point);
        var inputs = {
            line: line,
            point: point
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
            var title = "Project point on line";
            var control = ol3turf.Control.create(toolbar, prefix, name, title, action);
            return control;
        }
    };


}(ol3turf || {}));
