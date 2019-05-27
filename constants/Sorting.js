const SORT_OPTIONS = [
  {
    name: "Best",
    hasTimeRange: false
  },
  {
    name: "Hot",
    hasTimeRange: false
  },
  {
    name: "Top",
    hasTimeRange: true
  },
  {
    name: "New",
    hasTimeRange: false
  },
  {
    name: "Rising",
    hasTimeRange: false
  },
  {
    name: "Controversial",
    hasTimeRange: true
  }
];

const TIME_RANGES = ["Hour", "Day", "Week", "Month", "Year", "All"];

export { SORT_OPTIONS, TIME_RANGES };
