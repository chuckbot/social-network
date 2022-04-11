/**
 * Return a formatted date.
 * @param { Object } dates
 * @returns { String }
 */
const formatDate = (dates) => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const date =
    dates.createdAt === dates.updatedAt ? dates.createdAt : dates.updatedAt;

  const splitDate = date.split("T");
  const splitYear = splitDate[0].split("-");
  const splitTime = splitDate[1].slice(0, 5).split(":");

  return dates.createdAt === dates.updatedAt
    ? `Le ${splitYear[2]} ${months[parseInt(splitYear[1]) - 1]} ${
        splitYear[0]
      } à ${splitTime[0]}h ${splitTime[1]}mn`
    : `Modifié le ${splitYear[2]} ${months[parseInt(splitYear[1]) - 1]} ${
        splitYear[0]
      } à ${splitTime[0]}h ${splitTime[1]}mn`;
};

module.exports = {
  formatDate,
};
