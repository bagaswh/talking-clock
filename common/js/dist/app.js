'use strict';

new Vue({
  el: '#app',
  data: {
    date: null,
    voices: [],
    selectedVoice: 'Google Bahasa Indonesia',
    rawIntervalNumber: 5,
    intervalTimeUnit: 'seconds',
    nextSpeakTime: null
  },
  created: function created() {
    this.populateVoices();
    this.date = new Date();
    this.startClock();
    this.rescheduleSpeak();
    this.nextSpeakTime = this.getNextSpeakTime();
  },
  computed: {
    currentTime: function currentTime() {
      return this.date.toLocaleTimeString();
    },
    speakInterval: function speakInterval() {
      var _this = this;

      // schedule speak on the next queue so this computed property has been cached
      setTimeout(function() {
        _this.rescheduleSpeak();
      }, 10);
      var unitsMultiplier = {
        seconds: 1,
        minutes: 60,
        hours: 3600
      };
      return (
        this.rawIntervalNumber * unitsMultiplier[this.intervalTimeUnit] * 1000
      );
    }
  },
  methods: {
    startClock: function startClock() {
      var _this2 = this;

      this.clockInterval = setInterval(function() {
        _this2.date = new Date();
      }, 1000);
    },
    populateVoices: function populateVoices() {
      var _this3 = this;

      setTimeout(function() {
        _this3.voices = window.speechSynthesis.getVoices();
      }, 10);
    },
    rescheduleSpeak: function rescheduleSpeak() {
      var _this4 = this;

      if (this.speakIntervalId) {
        clearTimeout(this.speakIntervalId);
        this.speakIntervalId = null;
      }

      this.speakIntervalId = setInterval(function() {
        _this4.speak();

        _this4.nextSpeakTime = _this4.getNextSpeakTime();
      }, this.speakInterval);
    },
    getNextSpeakTime: function getNextSpeakTime() {
      return new Date(new Date().getTime() + this.speakInterval);
    },
    speak: (function(_speak) {
      function speak() {
        return _speak.apply(this, arguments);
      }

      speak.toString = function() {
        return _speak.toString();
      };

      return speak;
    })(function() {
      var clockRe = /(\d{1,2})[\:\.](\d{1,2})[\:\.]\d{1,2} ([AP]M)/;
      var match = this.currentTime.match(clockRe);
      var time = ''
        .concat(match[1], ':')
        .concat(match[2], ' ')
        .concat(match[3]);
      speak(time, this.selectedVoice);
    })
  }
});
