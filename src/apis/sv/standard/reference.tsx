export const getReference = (callApi: any) =>
  async function () {
    var references = await callApi();
  };
