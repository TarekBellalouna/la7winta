const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'espritla7winta',
  api_key: '193842965837965',
  api_secret: 'cMW8cZvEiZUjrqN8Cn_TfzEvm_4',
});

module.exports = cloudinary;
