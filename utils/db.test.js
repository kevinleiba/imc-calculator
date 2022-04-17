const { google } = require("googleapis");
const { listImcs, appendImcs } = require("./db");

const mockGetValues = jest.fn();
const mockAppendValues = jest.fn();

jest.mock("googleapis", () => {
  return {
    google: {
      sheets: jest.fn().mockImplementation(() => ({
        spreadsheets: {
          values: {
            get: mockGetValues,
            append: mockAppendValues,
          },
        },
      })),
    },
  };
});

const AUTH = "sampleAuthString";

const IMCs = [
  ["Sample Test", "123", "123", "12/12/2012", "21", "2022-04-16T21:44:03.998Z"],
];

const SUCCESS_RESULT = {
  config: {
    /* ... */
  },
  data: {
    /* ... */
  },
  headers: {
    /* ... */
  },
  status: 200,
  statusText: "OK",
};

describe("DB", () => {
  describe("listImcs", () => {
    test("Can get all IMC data", async () => {
      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:F");
        callback(null, { data: { values: IMCs } });
      });

      const imcs = await listImcs(AUTH);

      expect(google.sheets).toHaveBeenCalledWith({ version: "v4", auth: AUTH });
      expect(imcs).toEqual(IMCs);
    });

    test("Correct error is rejected", async () => {
      const error = "sample error";

      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:F");
        callback(error, {});
      });

      return expect(listImcs(AUTH)).rejects.toEqual(
        `The API returned an error: ${error}`
      );
    });

    test("If no data, error is rejected", async () => {
      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:F");
        callback(null, { data: { values: null } });
      });

      return expect(listImcs(AUTH)).rejects.toEqual("No data");
    });
  });

  describe("appendImcs", () => {
    test("Can append new IMCs", async () => {
      mockAppendValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:F");
        expect(infos.requestBody).toEqual({ values: IMCs });
        expect(infos.valueInputOption).toBe("raw");

        callback(null, SUCCESS_RESULT);
      });

      const imcs = await appendImcs(AUTH, IMCs);

      expect(google.sheets).toHaveBeenCalledWith({ version: "v4", auth: AUTH });
      expect(imcs).toEqual(IMCs);
    });

    test("Error is rejected", () => {
      const error = "Sample Error";
      mockAppendValues.mockImplementationOnce(async (infos, callback) => {
        callback(error, { ...SUCCESS_RESULT, status: 400, statusText: "NOK" });
      });
      return expect(appendImcs(AUTH)).rejects.toEqual(
        `The API returned an error: ${error}`
      );
    });
  });
});
