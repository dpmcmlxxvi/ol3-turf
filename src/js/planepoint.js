import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils,
};

/* globals ol3turf, turf */

// ==================================================
// planepoint control
// --------------------------------------------------
export default (function(ol3turf) {
  'use strict';

  // Control name
  const name = 'planepoint';

  /**
     * Triangulate a point in a plane
     * @private
     */
  const action = function(control) {
    const collection = ol3turf.utils.getCollection(control, 2, 2);
    const pt = ol3turf.utils.getPoints(collection, 1, 1);
    const tr = ol3turf.utils.getPolygons(collection, 1, 1);
    const point = pt[0];
    const triangle = tr[0];

    const output = turf.planepoint(point, triangle);
    const inputs = {
      point: point,
      triangle: triangle,
    };
    control.toolbar.ol3turf.handler.callback(name, output, inputs);
  };

  return {
    /*
         * Create control then attach custom action and it's parent toolbar
         * @param toolbar Parent toolbar
         * @param prefix Selector prefix.
         */
    create: function(toolbar, prefix) {
      const title = 'Triangulate a point in a plane';
      const control = ol3turf.Control.create(toolbar, prefix, name, title, action);
      return control;
    },
  };
}(ol3turf || {}));
