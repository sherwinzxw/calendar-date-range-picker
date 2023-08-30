export const getDirectors = (callApi: any) =>
  async function () {
    var references = await callApi();
  };
