export const sendXhrRequest = function (
  url: string,
  path: string,
  options: any
) {
  // Make it a little more forgiving if the user accidently adds a leading slash
  if (path.startsWith("/")) path = path.slice(1);
  return fetch(`${url}/${path}`, options)
    .then((response) => {
      if (response.status >= 200 && response.status < 300)
        return response.json();

      // If we get an error status code, sometimes we get a response back that isn't JSON
      return response.text().then((responseText) => {
        try {
          // We mind not be able to parse this response as JSON
          var responseJson = JSON.parse(responseText);
          var errorMessage = responseJson.message;
        } catch {}
        if (!errorMessage) errorMessage = response.statusText;

        if (response.status == 401) {
        }
        var error = new Error(errorMessage);
        throw error;
      });
    })
    .catch((error) => {
      return `Oops! The request is still on the ground as it has failed the preflight check!\n\rError Details: ${error}`;
    });
};
