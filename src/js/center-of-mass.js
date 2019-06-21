import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils
};

/* globals ol3turf, turf */

//==================================================
// center-of-mass control
//--------------------------------------------------
export default (function (ol3turf) {

    "use strict";

    // Control name
    var name = "center-of-mass";

    /**
     * Compute center-of-mass
     * @private
     */
    var action = function (control) {

        var collection = ol3turf.utils.getCollection(control, 1, Infinity);
        var output = turf.centerOfMass(collection);
        var inputs = {
            features: collection
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
            var title = "Measure center of mass";
            var control = ol3turf.Control.create(toolbar, prefix, name, title, action);
            return control;
        }
    };


}(ol3turf || {}));
