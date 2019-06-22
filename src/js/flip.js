import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils,
};


// Control name
const name = 'flip';

/*
 * Compute feature coordinate flip
 */
const action = function(control) {
  const collection = ol3turf.utils.getCollection(control, 1, Infinity);

  const output = turf.flip(collection);
  const inputs = {
    input: collection,
  };
  control.toolbar.ol3turf.handler.callback(name, output, inputs);
};

export default {
  create: function(toolbar, prefix) {
    const title = 'Flip features coordinates';
    return ol3turf.Control.create(toolbar, prefix, name, title, action);
  },
};

