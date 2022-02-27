import getData from "./../get.ts";

const fetchjsonp = jest.genMockFromModule("fetch-jsonp");

test("adds 1 + 2 to equal 3", async () => {
  const result = await getData(
    "moebiusmania",
    "9e8697f91ee5b93cf684c44101559a9d"
  );
  expect(result).toEqual({});
  document();
});
