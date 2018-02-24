(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('YourCtrl', YourCtrl);

  YourCtrl.$inject = ['$timeout'];

  function YourCtrl($timeout) {

    function ssmlToSpeech() {

      // Set your credentials
      AWS.config.region = 'xxx';
      AWS.config.accessKeyId = 'xxxxxxxxx';
      AWS.config.secretAccessKey = 'xxxxxxxxxxxxxxxxxxxxxx';

      var polly = new AWS.Polly();
      var params = {
        OutputFormat: 'mp3', /* required */
        Text: ` <speak>
                   hisaaaa ssd<break time="1s"/>
                   In the middle of the 10/3/2014 <sub alias="World Wide Web Consortium">W3C</sub> meeting
                   he shouted, "Score!" quite loudly. When his boss stared at him, he repeated
                   <amazon:effect name="whispered">"Score"</amazon:effect> in a whisper.
                </speak>`, /* required */
        VoiceId: 'Joanna', /* required */
        SampleRate: '22050',
        TextType: 'ssml'
      };

      polly.synthesizeSpeech(params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('stream ', data);

          var blob = new Blob([data.AudioStream], {type : data.ContentType});

          $timeout(function() {
            var reader = new FileReader();
            reader.onload = function(e) {
              angular.element("#your_html_element").attr("src", e.target.result);
            };
            reader.readAsDataURL(blob);
          });

        }
      });
    }
  }
})()