export function secondsToTime(secs) {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes =
    Math.floor(divisor_for_minutes / 60) < 10
      ? '0' + Math.floor(divisor_for_minutes / 60)
      : Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds =
    Math.ceil(divisor_for_seconds) < 10
      ? '0' + Math.ceil(divisor_for_seconds)
      : Math.ceil(divisor_for_seconds);

  var time =
    hours == 0
      ? minutes + ':' + seconds
      : hours + ':' + minutes + ':' + seconds;

  return time;
}
