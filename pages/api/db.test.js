const { listImcs } = require("./db");
const { google } = require("googleapis");

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

const IMCs = [["Sample Test", "123", "123", "12/12/2012", "21"]];

describe("DB", () => {
  describe("listImcs", () => {
    test("Can get all IMC data", async () => {
      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:E");
        callback(null, { data: { values: IMCs } });
      });

      const imcs = await listImcs(AUTH);

      expect(google.sheets).toHaveBeenCalledWith({ version: "v4", auth: AUTH });
      expect(imcs).toEqual(IMCs);
    });

    test("Correct error is rejected", async () => {
      const error = "sample error";

      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:E");
        callback(error, {});
      });

      return expect(listImcs(AUTH)).rejects.toEqual(
        `The API returned an error: ${error}`
      );
    });

    test("If no data, error is rejected", async () => {
      const error = "sample error";

      mockGetValues.mockImplementationOnce(async (infos, callback) => {
        expect(infos.range).toBe("IMC!A2:E");
        callback(null, { data: { values: null } });
      });

      return expect(listImcs(AUTH)).rejects.toEqual("No data");
    });
  });
});
