"use strict";

var synth = window.speechSynthesis;
var voices = [];
setTimeout(function () {
  voices = synth.getVoices();
}, 10);

function speak(text, voiceName) {
  var pitch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var rate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var utterance = new SpeechSynthesisUtterance(text);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = voices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var voice = _step.value;

      if (voice.name == voiceName) {
        utterance.voice = voice;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  utterance.pitch = pitch;
  utterance.rate = rate;
  synth.cancel();
  synth.speak(utterance);
}