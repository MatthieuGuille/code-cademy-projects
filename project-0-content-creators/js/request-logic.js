// We at Content Creators know this code is useful for getting the
// extension off of the supplied filename, but we can't figure out the rest of
// the function to use it! We hope this is useful to you!


function getContentType(filename) {
  var contentType = '';
  const extension = filename.match(/.*\.([^\.]*)$/)[1];
  if (extension === 'html') {
    contentType = 'text/html';
  } else if (extension === 'css') {
    contentType = 'text/css';
  } else if (extension === 'jpeg' || extension === 'jpg') {
    contentType = 'image/jpeg';
  } else {
    contentType = 'text/plain';
  }

  return contentType;
}
