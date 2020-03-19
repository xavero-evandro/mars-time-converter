/* eslint-disable no-undef */
import {
  getJulianDateUT,
  getJulianDateTT,
  tailOffset,
  getJ2000,
  getMarsSolDate,
  getCoordinatedMarsTime,
  addCommasToMarsSolDate,
  formatMarsSolDateToHMS,
  marsTimeConverter
} from "../src/service/mars-time";
// You can change the timeUTC variable to test differents times

const timeUTC = new Date("2020-03-18T19:56:55Z");
const timeUTCWrong = "20200-03-18T19:56:55Z";
const julianDateUT = getJulianDateUT(timeUTC.getTime());
const wrongJulianDateUT = getJulianDateUT(new Date(timeUTCWrong).getTime());
const julianDateTT = getJulianDateTT(julianDateUT, tailOffset);
const wrongJulianDateTT = getJulianDateTT(new Date(timeUTCWrong).getTime());
const j2000 = getJ2000(julianDateTT);
const wrongJ2000 = getJ2000(new Date(timeUTCWrong).getTime());
const marsSolDate = getMarsSolDate(j2000);
const wrongMarsSolDate = getMarsSolDate(new Date(timeUTCWrong).getTime());
const coordinatedMarsTime = getCoordinatedMarsTime(marsSolDate);
const wrongCoordinatedMarsTime = getCoordinatedMarsTime(
  new Date(timeUTCWrong).getTime()
);

describe("Test Get Julian Date UT from UTC time", () => {
  test("Should return the right value", () => {
    expect(getJulianDateUT(timeUTC.getTime())).toBeTruthy();
    expect(getJulianDateUT(timeUTC.getTime())).toBe(2458927.3311921298);
  });

  test("Using wrong UTC time should be false", () => {
    expect(getJulianDateUT(new Date(timeUTCWrong).getTime())).toBeFalsy();
  });
});

describe("Get Julian Date TT from Julian Date UT time", () => {
  test("Should return the right value", () => {
    expect(getJulianDateTT(julianDateUT, tailOffset)).toBeTruthy();
    expect(getJulianDateTT(julianDateUT, tailOffset)).toBe(2458927.3319928707);
  });

  test("Should return the right value using diferrent tailOffset", () => {
    expect(getJulianDateTT(julianDateUT, 40)).toBeTruthy();
    expect(getJulianDateTT(julianDateUT, 40)).toBe(2458927.3320275927);
  });

  test("Using wrong UT time should be false", () => {
    expect(getJulianDateTT(wrongJulianDateUT, tailOffset)).toBeFalsy();
  });
});

describe("Get j2000 Date from Julian Date TT time", () => {
  test("Should return the right value", () => {
    expect(getJ2000(julianDateTT)).toBeTruthy();
    expect(getJ2000(julianDateTT)).toBe(7382.331992870662);
  });

  test("Using wrong TT time should be false", () => {
    expect(getJ2000(wrongJulianDateTT, 40)).toBeFalsy();
  });
});

describe("Get Mars Sol Date from j2000 time", () => {
  test("Should return the right value", () => {
    expect(getMarsSolDate(j2000)).toBeTruthy();
    expect(getMarsSolDate(j2000)).toBe(51976.43194247951);
  });

  test("Using wrong j2000 time should be false", () => {
    expect(getMarsSolDate(wrongJ2000)).toBeFalsy();
  });
});

describe("Get Coordinated Mars Time from Mar Sol Date", () => {
  test("Should return the right value", () => {
    expect(getCoordinatedMarsTime(marsSolDate)).toBeTruthy();
    expect(getCoordinatedMarsTime(marsSolDate)).toBe(10.366619508247823);
  });

  test("Using wrong Mars Sol Date should be false", () => {
    expect(getCoordinatedMarsTime(wrongMarsSolDate)).toBeFalsy();
  });
});

describe("Get Mars Date Formated", () => {
  test("Should return the right formated Date", () => {
    expect(addCommasToMarsSolDate(marsSolDate)).toBeTruthy();
    expect(addCommasToMarsSolDate(marsSolDate)).toBe("51,976.43194247951");
  });

  test("Using wrong Mars Sol Date should be NaN", () => {
    expect(addCommasToMarsSolDate(wrongMarsSolDate)).toBe("NaN");
  });
});

describe("Get Coordinated Mars Time Formated", () => {
  test("Should return the right formated Date", () => {
    expect(formatMarsSolDateToHMS(coordinatedMarsTime)).toBeTruthy();
    expect(formatMarsSolDateToHMS(coordinatedMarsTime)).toBe("10:21:60");
  });

  test("Using wrong Coordinated Mars Time should be NaN", () => {
    expect(formatMarsSolDateToHMS(wrongCoordinatedMarsTime)).toBe(
      "NaN:NaN:NaN"
    );
  });
});

describe("Mars Time converter", () => {
  test("Should return the right Mars Date", async done => {
    const marsDate = {
      MarsSolDate: "51,976.43194",
      MartianCoordinatedTime: "10:21:60"
    };
    expect(await marsTimeConverter("2020-03-18T19:56:55Z")).toEqual(marsDate);
    done();
  });

  test("Using wrong Mars Sol Date should be false", async done => {
    const wrongReturn = {
      MarsSolDate: "NaN",
      MartianCoordinatedTime: "NaN:NaN:NaN"
    };
    expect(await marsTimeConverter("20200-03-18T19:56:55Z")).toEqual(
      wrongReturn
    );
    done();
  });
});
