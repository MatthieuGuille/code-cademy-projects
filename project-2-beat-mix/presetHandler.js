// Use this presets array inside your presetHandler
const presets = require('./presets');

// Complete this function:
const presetHandler = (method, index, newPresetArray) => {
  let response = [0 , ''];
  if (method === 'GET') {
    if (index>=0 && index<=3) {
      response[0] = 200;
      response[1] = presets[index];
    } else {
      response[0] = 404;
    }
  } else if (method === 'PUT') {
    if (index>=0 && index<=3) {
      response[0] = 200;
      presets[index] = newPresetArray;
      response[1] = newPresetArray;
    } else {
      response[0] = 404;
    }
  } else {
    response[0] = 400;
  }

  return response
};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
