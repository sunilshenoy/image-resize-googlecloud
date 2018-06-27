'use strict';

const gcs = require('@google-cloud/storage')();

const path = require('path');
const sharp = require('sharp');
const requestLib = require('request');

exports.imageResize = (request, response) => {
  
  const fileLocation = request.body.file_location //Remote image url
  const imageWidth = parseInt(request.body.width)
  const imageHeight = parseInt(request.body.height)
  
  const options = {
      action: 'read',
      expires: '02-02-2020', //Replace this with date you want the link to expire.
  };
  
  const fileBucket = "storage_bucketname"; //File storage bucket.

  const fileName = path.basename(fileLocation);
  
  const bucket = gcs.bucket(fileBucket);

  // We add a 'thumb_' prefix to thumbnails file name.
  const thumbFileName = `thumb_`+imageWidth+`_${fileName}`;
  
  // Create write stream for uploading thumbnail
  const thumbnailUploadStream = bucket.file(thumbFileName).createWriteStream();

  // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
  const pipeline = sharp();
  
  //Perform the resize operation
  pipeline
    .resize(imageWidth, imageHeight)
    .max()
    .toFormat('png')
    .pipe(thumbnailUploadStream);

  requestLib(fileLocation).pipe(pipeline);
  
  const streamAsPromise = new Promise((resolve, reject) =>
    thumbnailUploadStream.on('finish', resolve).on('error', reject)
  );
  
  //After resize, get signed url from Google Storage
  streamAsPromise.then(() => {
      // Get a signed URL for the file
      gcs.bucket(fileBucket)
      .file(thumbFileName)
        .getSignedUrl(options)
          .then(results => {
            const url = results[0];
            response.status(200).json({
              resized: true,
              thumbnail: url
            });
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
  })
  
};