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
  created() {
    this.populateVoices();

    this.date = new Date();

    this.startClock();

    this.rescheduleSpeak();

    this.nextSpeakTime = this.getNextSpeakTime();
  },
  computed: {
    currentTime() {
      return this.date.toLocaleTimeString();
    },

    speakInterval() {
      // schedule speak on the next queue so this computed property has been cached
      setTimeout(() => {
        this.rescheduleSpeak();
      }, 10);

      const unitsMultiplier = {
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
    startClock() {
      this.clockInterval = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },

    populateVoices() {
      setTimeout(() => {
        this.voices = window.speechSynthesis.getVoices();
      }, 10);
    },

    rescheduleSpeak() {
      if (this.speakIntervalId) {
        clearTimeout(this.speakIntervalId);
        this.speakIntervalId = null;
      }

      this.speakIntervalId = setInterval(() => {
        this.speak();
        this.nextSpeakTime = this.getNextSpeakTime();
      }, this.speakInterval);
    },

    getNextSpeakTime() {
      return new Date(new Date().getTime() + this.speakInterval);
    },

    speak() {
      const clockRe = /(\d{1,2})[\:\.](\d{1,2})[\:\.]\d{1,2} ([AP]M)/;
      const match = this.currentTime.match(clockRe);
      const time = `${match[1]}:${match[2]} ${match[3]}`;

      speak(time, this.selectedVoice);
    }
  }
});
