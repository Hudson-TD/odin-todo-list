const userUtilities = {
  init: function () {},

  generateDateValue: function () {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let today = new Date().toLocaleDateString(undefined, options);
    return today;
  },
};

export { userUtilities };
