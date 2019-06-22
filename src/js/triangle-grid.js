import Control from './control';
import utils from './utils';

const ol3turf = {
  Control,
  utils,
};


// Control name
const name = 'triangle-grid';

/*
 * Generate Triangle Grid
 */
const action = function(control) {
  // Define control ids
  const idCancel = ol3turf.utils.getName([name, 'cancel'], control.prefix);
  const idCellSize = ol3turf.utils.getName([name, 'cell-size'], control.prefix);
  const idForm = ol3turf.utils.getName([name, 'form'], control.prefix);
  const idOk = ol3turf.utils.getName([name, 'ok'], control.prefix);
  const idUnits = ol3turf.utils.getName([name, 'units'], control.prefix);

  const onOK = function() {
    try {
      // Gather selected features
      const collection = ol3turf.utils.getCollection(control, 1, Infinity);

      // Get form inputs
      const cellSize = ol3turf.utils.getFormNumber(idCellSize, 'cell size');
      const units = ol3turf.utils.getFormString(idUnits, 'units');

      // Collect polygons
      const bbox = turf.bbox(collection);
      const output = turf.triangleGrid(bbox, cellSize, units);

      // Remove form and display results
      control.showForm();
      const inputs = {
        bbox: bbox,
        cellSize: cellSize,
        units: units,
      };
      control.toolbar.ol3turf.handler.callback(name, output, inputs);
    } catch (e) {
      control.showMessage(e);
    }
  };

  const onCancel = function() {
    control.showForm();
  };

  const controls = [
    ol3turf.utils.getControlNumber(idCellSize, 'Cell Size', 'Dimension of cell', '1', 'any', '0'),
    ol3turf.utils.getControlSelect(idUnits, 'Units', ol3turf.utils.getOptionsUnits()),
    ol3turf.utils.getControlInput(idOk, onOK, '', 'OK'),
    ol3turf.utils.getControlInput(idCancel, onCancel, '', 'Cancel'),
  ];

  control.showForm(controls, idForm);
};

export default {
  create: function(toolbar, prefix) {
    const title = 'Generate Triangle Grid';
    return ol3turf.Control.create(toolbar, prefix, name, title, action);
  },
};

