// Drum Arrays
let kicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let snares = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let hiHats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let rideCymbals = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function toggleDrum(arrayName, index) {
  if (index<16 && index >=0) {
    if (arrayName === 'kicks') {
      kicks[index] = !kicks[index];
    } else if (arrayName === 'snares') {
      snares[index] = !snares[index];
    } else if (arrayName === 'hiHats') {
      hiHats[index] = !hiHats[index];
    } else if (arrayName === 'rideCymbals') {
      rideCymbals[index] = !rideCymbals[index];
    }
  }
  return
}

function clear(arrayName) {
  if (arrayName === 'kicks') {
    kicks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  } else if (arrayName === 'snares') {
    snares = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  } else if (arrayName === 'hiHats') {
    hiHats = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  } else if (arrayName === 'rideCymbals') {
    rideCymbals = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  }
return
}


function invert(arrayName) {
  if (arrayName === 'kicks') {
    for (let i=0; i<kicks.length; i++) {
      kicks[i] = !kicks[i];
    }
  } else if (arrayName === 'snares') {
    for (let i=0; i<snares.length; i++) {
      snares[i] = !snares[i];
    }
  } else if (arrayName === 'hiHats') {
    for (let i=0; i<hiHats.length; i++) {
      hiHats[i] = !hiHats[i];
    }
  } else if (arrayName === 'rideCymbals') {
    for (let i=0; i<rideCymbals.length; i++) {
      rideCymbals[i] = !rideCymbals[i];
    }
  }
return
}


function getNeighborPads (x, y, size) {
  let neighborPads = [];

  if(x>=0 && x<size && y>=0 && y<size) {
    if (x-1>=0 && x-1<size) {
      neighborPads.push([x-1, y]);
    }

    if (x+1>=0 && x+1<size) {
      neighborPads.push([x+1, y]);
    }

    if (y-1>=0 && y-1<size) {
      neighborPads.push([x, y-1]);
    }

    if (y+1>=0 && y+1<size) {
      neighborPads.push([x, y+1]);
    }
  }

  return neighborPads
}
