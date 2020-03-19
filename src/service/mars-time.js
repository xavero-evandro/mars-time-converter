export const tailOffset = 37;

export const getJulianDateUT = millisecs => {
  return 2440587.5 + millisecs / 8.64e7;
};

export const getJulianDateTT = (julianDateUT, tailOffset) => {
  return julianDateUT + (tailOffset + 32.184) / 86400;
};

export const getJ2000 = jdTt => {
  return jdTt - 2451545.0;
};

export const getMarsSolDate = j2000 => {
  return (j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
};

export const getCoordinatedMarsTime = msd => {
  return (24 * msd) % 24;
};

export const addCommasToMarsSolDate = date => {
  date += "";
  const x = date.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? "." + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};

export const formatMarsSolDateToHMS = h => {
  const x = h * 3600;
  let hh = Math.floor(x / 3600);
  if (hh < 10) hh = "0" + hh;
  const y = x % 3600;
  let mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;
  let ss = Math.round(y % 60);
  if (ss < 10) ss = "0" + ss;
  return hh + ":" + mm + ":" + ss;
};

export const marsTimeConverter = async time => {
  try {
    const timeUTC = new Date(time);
    const millis = timeUTC.getTime();
    const jdUt = getJulianDateUT(millis);
    const jdTt = getJulianDateTT(jdUt, tailOffset);
    const j2000 = getJ2000(jdTt);
    const msd = getMarsSolDate(j2000);
    const mtc = getCoordinatedMarsTime(msd);
    const marsSolDate = addCommasToMarsSolDate(msd.toFixed(5));
    const marsCoordinateMarsTime = formatMarsSolDateToHMS(mtc);

    return {
      MarsSolDate: marsSolDate,
      MartianCoordinatedTime: marsCoordinateMarsTime
    };
  } catch (e) {
    return e;
  }
};
