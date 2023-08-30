export const getLicences = (callApi: any) =>
  async function () {
    var references = await callApi();
  };
