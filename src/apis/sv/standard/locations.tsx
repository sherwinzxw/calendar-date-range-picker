export const getLocations = (callApi: any) =>
  async function () {
    var references = await callApi();
  };
