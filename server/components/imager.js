'use strict';

var lwip = require('lwip');
var ExifImage = require('exif').ExifImage;

function getRotation(data, cb) {
  try {
    new ExifImage({
      image: data
    }, function (err, exif) {
      if (err) {
        return cb(err);
      }

      console.log("Got orientation %d", exif.image.Orientation);

      switch (exif.image.Orientation) {
        case 3:
          return cb(null, 180);

        case 6:
          return cb(null, 90);

        case 8:
          return cb(null, 270);

        default:
          return cb(null, 0);
      }
    });
  } catch (ex) {
    return cb(ex);
  }
}

function scale(data, type, size, cb) {
  lwip.open(data, type, function (err, image) {
    if (err) {
      return cb(err);
    }

    function start(rotation) {
      /* Default ratio */
      var ratio = 1;

      /* If width is largest, use width size */
      if (image.width() > image.height() && image.width() > size) {
        ratio = size / image.width();
      } else if (image.height() > size) {
        ratio = size / image.height();
      }

      /* Create an empty white image canvas */
      lwip.create(image.width(), image.height(), 'white', function (err, canvas) {
        if (err) {
          return cb(err);
        }

        /* Paste the image into the canvas, scale it and convert it to a buffer */
        canvas.batch().paste(0, 0, image).scale(ratio).rotate(rotation, 'white').toBuffer('jpg', {
          quality: 74
        }, function (err, data) {
          if (err) {
            return cb(err);
          }

          cb(null, data);
        });
      });
    }

    /* Rotation */
    if (type === 'jpg') {
      getRotation(data, function (err, rotation) {
        if (err) {
          return cb(err);
        }

        start(rotation);
      });
    } else {
      start(0);
    }
  });
}

function getType(mimetype) {
  var type;

  switch (mimetype) {
    case 'image/jpg':
    case 'image/jpeg':
      type = 'jpg';
      break;

    case 'image/png':
      type = 'png';
      break;

    default:
      type = null;
  }

  return type;
}

module.exports.scale = scale;
module.exports.getType = getType;
