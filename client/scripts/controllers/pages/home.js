(function (ng) {
  'use strict';

  ng.module('App').controller('Pages:Home', [
    '$scope', '$log', 'Upload',

    function ($scope, $log, $upload) {

      $scope.files = {
        progress: function progress(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $log.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        },

        success: function success(data, status, headers, config) {
          $log.debug('file ' + config.file.name + 'uploaded. Response: ' + data);
          $log.debug(data, status, headers, config);
        },

        error: function error(data, status, headers, config) {
          $log.debug('error status: ' + status);
          $log.debug(data, status, headers, config);
        },

        upload: function ($files) {
          var self = this;

          if ($files && $files.length) {
            ng.forEach($files, function (file) {
              $upload.upload({
                url: '/api/files',
                file: file
              }).

              progress(self.progress).
              success(self.success).
              error(self.error);
            });
          }
        }
      };

    }

  ]);

}(angular));
