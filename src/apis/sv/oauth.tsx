import { sendXhrRequest } from "utils/Request";

export type OktaTokenRequestOptions = {
  username: string;
  password: string;
  contentType: string;
  authorization: string;
  scope: string;
  grant_type: string;
};

export const getOatuhToken = (options: OktaTokenRequestOptions | null) => {
  const URL_OKTA_SERVER = "https://dac-nsw-gov-au.oktapreview.com";
  const OKTA_ACCOUNT_USERNAME = "oauth_tester@dac.nsw.gov.au";
  const OKTA_ACCOUNT_PASSWORD = "nYqhgiE9@Shk";
  const PATH_OKTA_TOKEN_GENERATOR = "oauth2/aus8myrxzcb3IQFzJ1d7/v1/token";
  const xhrHeaders = new Headers();
  xhrHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  xhrHeaders.append(
    "Authorization",
    "Basic MG9hOG15bDJlcVh0QkR1OHoxZDc6NXR4aXI2TUdUUU9WdjRWU0pXRWFCay1HY0NGWldQYkRrVGNxT2taUA=="
  );

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("scope", "session:role:access_tester");
  urlencoded.append("username", OKTA_ACCOUNT_USERNAME);
  urlencoded.append("password", OKTA_ACCOUNT_PASSWORD);

  var requestOptions = {
    method: "POST",
    headers: xhrHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = sendXhrRequest(
    URL_OKTA_SERVER,
    PATH_OKTA_TOKEN_GENERATOR,
    requestOptions
  );
  console.log(response);
};
