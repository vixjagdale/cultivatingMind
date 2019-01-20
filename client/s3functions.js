import {ProductImage} from '/imports/s3/ProductImage.js';


/*--------------------- Image add to s3 ---------------------*/

addEventImages = function(file,self) {
    if(file.size<=716800){
        uploadInstance = ProductImage.insert({
          file: file,
          meta: {
            locator : self.props.fileLocator,
            userId  : Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams         : 'dynamic',
          chunkSize       : 'dynamic',
          allowWebWorkers : true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
            uploading  : uploadInstance, // Keep track of this instance to use below
            inProgress : true // Show the progress bar now
        });
        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
        });

        uploadInstance.on('end', function (error, fileObj) {
        });

        uploadInstance.on('uploaded',  (error, fileObj) => {
            if(fileObj){
                Meteor.call("addProductImages",fileObj._id,(error,result)=>{
                    if(error){
                        console.log(error);
                        console.log(error.reason);
                    }else{
                        // console.log("my result=> " +result);
                        // Meteor.call("uploadFromDashboard");
                    }
                });

                // Session.set("addNewProductImage",)
            }

            self.setState({
                uploading  : [],
                progress   : 0,
                inProgress : false
            });
        });

        uploadInstance.on('error', function (error, fileObj) {
        });

        uploadInstance.on('progress', function (progress, fileObj) {
            Session.set('imageprogress',progress);
            self.setState({
                progress : progress
            })
        });

        uploadInstance.start(); // Must manually start the uploaded
    }else{

        swal("Please upload image, with size equal or less than 700 kb","","warning");
    }

}

// addPhotoGalleryImages = function(file,self) {
//     if(file.size<=716800){
//         uploadInstance = ProductImage.insert({
//           file: file,
//           meta: {
//             locator : self.props.fileLocator,
//             userId  : Meteor.userId() // Optional, used to check on server for file tampering
//           },
//           streams         : 'dynamic',
//           chunkSize       : 'dynamic',
//           allowWebWorkers : true // If you see issues with uploads, change this to false
//         }, false);

//         self.setState({
//             uploading  : uploadInstance, // Keep track of this instance to use below
//             inProgress : true // Show the progress bar now
//         });
//         // These are the event functions, don't need most of them, it shows where we are in the process
//         uploadInstance.on('start', function () {
//         });

//         uploadInstance.on('end', function (error, fileObj) {
//         });

//         uploadInstance.on('uploaded',  (error, fileObj) => {
//             if(fileObj){
//                 Meteor.call("addProductImages",fileObj._id,(error,result)=>{
//                     if(error){
//                         console.log(error);
//                         console.log(error.reason);
//                     }else{
//                         // console.log("my result=> " +result);
//                         // Meteor.call("uploadFromDashboard");
//                     }
//                 });

//                 // Session.set("addNewProductImage",)
//             }

//             self.setState({
//                 uploading  : [],
//                 progress   : 0,
//                 inProgress : false
//             });
//         });

//         uploadInstance.on('error', function (error, fileObj) {
//         });

//         uploadInstance.on('progress', function (progress, fileObj) {
//             Session.set('imageprogress',progress);
//             self.setState({
//                 progress : progress
//             })
//         });

//         uploadInstance.start(); // Must manually start the uploaded
//     }else{

//         swal("Please upload image, with size equal or less than 700 kb","","warning");
//     }

// }




