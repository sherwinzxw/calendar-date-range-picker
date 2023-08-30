import { sendXhrRequest } from "utils/Request";

const serverUrl = process.env.REACT_APP_URL_MULESOFT_SERVER!;
const pathToResource = "api";

export interface GetHeroOptions {
  startAt: number;
  maxResults: number;
  objectType: string;
}

export async function getHeros(options: GetHeroOptions) {
  const params = Object.entries(options)
    .map(([key, value]) => {
      if (value !== null && value !== undefined && !Number.isNaN(value))
        return `${key}=${value.toString()}`;
    })
    .join("&");

  const path = `${pathToResource}?${params}`;

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await sendXhrRequest(serverUrl, path, requestOptions);
  
  return response;
}
