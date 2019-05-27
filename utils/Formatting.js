import numeral from "numeral";
import moment from "moment";

export function initializeMoment() {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1mo",
      MM: "%dmo",
      y: "1y",
      yy: "%dy"
    }
  });
}

export function formatUnixTime(time) {
  return moment(time * 1000).fromNow(true);
}

export function formatNumber(number) {
  return numeral(number).format("0a");
}
