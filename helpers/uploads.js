var fs = require('fs');
var Q = require('q');
var moment = require('moment');
var path = require('path')

// Throughout the code here we work off of sepearator rather than ever guessing
// as Unix and Windows filesystems work differently
var seperator = path.sep;

var absoluteImageUploadDir = [__dirname, '<DIR>'].join(seperator);
var imageUploadDir = ['<DIR>'].join(seperator);

module.exports = {  
    uploadImage: function(req, res, next, options) {
        var deferred = Q.defer();

        var image = req.files.uploadedImage;

        // Get the temp location of the file that the server would have used on upload
        var tempPath = image.path;
        
        // Current date
        var date = moment().format('MM-YYYY');

        // Set the location where the image should actually live
        var targetFolder = [absoluteImageUploadDir, date].join(seperator);
        var targetPath = [targetFolder, image.name].join(seperator);
        var relativePath = [imageUploadDir, date, image.name].join(seperator);


        // We now need to recursively work our way down to our target folder, creating every folder that doesn't exist along the way
        var dirSteps = targetFolder.split(seperator).length; // We'll work off the entire length, rather than -1 as .slice() works 'up to, but not including'
        var startStep = 0; 
        var currentStep = targetFolder.split(seperator).indexOf("<First dir we definitely know doesn't exist>"); // Bit hacky but realistically we know all is accounted for up to 'content'
        var toCheck = targetFolder.split(seperator).slice(startStep, currentStep).join(seperator);
        
        // Kick off directory checks
        checkDirs();
        
        var moveToNextDir = function() {
            toCheck = targetFolder.split(seperator).slice(startStep, currentStep).join(seperator);
            checkDirs();
        };

        function checkDirs() {
            // If the folder doesn't exist we'll create it
            fs.readdir(toCheck, function(err, files) {
                if (err) {
                    // Doesn't exist so we'll create it
                    fs.mkdir(toCheck, function(err) {
                        if (currentStep !== dirSteps) {
                            currentStep++;                            
                        }
                        moveToNextDir();
                    });

                } else {
                    // Particular directory did exist, but we've still not checked all of them
                    if (currentStep !== dirSteps) {
                        currentStep++;
                        moveToNextDir();
                    } else {
                        handleUpload();
                    }
                }
            });
        }
       

        function handleUpload() {
        
            // Move the file from the temp location to the actual location
            fs.rename(tempPath, targetPath, function(err) {
                if (err) return deferred.reject(err);

                deferred.resolve({
                    // Send back whatever you fancy
                });

                // Check if the file still exists in the temp folder, if it does we can delete it
                fs.open(tempPath, 'r', function(err, file) {
                    if (err) return;

                    // Delete the old temporary file
                    fs.unlink(tempPath, function(err) {
                        if (err) return;
                    });    
                });
                
            });
        }

        return deferred.promise;
    },

    uploadToS3: function() {
        
    }
}