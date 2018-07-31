import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  Meteor.methods({
    'removeS3Data'(image){
          console.log('delete method called ' + image);
          let bucket = "echubbucket";
          let imageUrl = image.replace('https://' + bucket + '.s3-ap-south-1.amazonaws.com/', '');
          AWS.config.update({
              accessKeyId: "AKIAI5EBSBGINYU4YYZA",
              secretAccessKey: "LpGne4WQC+SU2HIRHY8wrGOa1K5WTzhNFzrs71Iq",
              region: "us-east-1",
          });
          console.log('delete method called url ' + imageUrl);

    var s3 = new AWS.S3();
    var params = {
      Bucket: bucket, // 'mybucket'
      Key: imageUrl // 'images/myimage.jpg'
    };
    var paramList = {
      Bucket: bucket
    };
    var listObjects = Meteor.wrapAsync(
      s3.listObjects(paramList,function(error,data){
        if (error) {
          console.log("error list " +error);
        }
        else {
          console.log(data);
        }
      })
    );
    var deleteObject = Meteor.wrapAsync(
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log("error " +error);
        }
        else {
          console.log(data);
        }
      })
    );

    // Meteor.users.update(Meteor.userId(), {$set: {"profile.image": ""}});
  }
  });

  Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "image/jpg"],
    maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
  });
  Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
    bucket: "echubbucket",
    acl: "public-read",
    AWSAccessKeyId: " AKIAI5EBSBGINYU4YYZA",
    AWSSecretAccessKey: "LpGne4WQC+SU2HIRHY8wrGOa1K5WTzhNFzrs71Iq+8f",
    region: "us-east-1",
    authorize: function () {
      //Deny uploads if user is not logged in.
      if (!this.userId) {
        var message = "Please login before posting files";
        throw new Meteor.Error("Login Required", message);
      }
      return true;
    },
    key: function (file,metaContext) {
      //Store file into a directory by the user's username.
      let user = Meteor.users.findOne(this.userId);
      let fileType = file.name.split(".");
      return "patelconstruction/" + file.name;
    }
  });
});
