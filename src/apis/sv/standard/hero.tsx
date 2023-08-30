import { sendXhrRequest } from "utils/Request";

const serverUrl = process.env.REACT_APP_URL_SNOWFLAKE_SERVER!;
const accountIdentifier = process.env.REACT_APP_ACCOUNT_IDENTIFIER!;
const pathToResource = "api/v2/statements";

export async function getHeros(token: string) {
  var requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("X-Snowflake-Authorization-Token-Type", "OAUTH");
  requestHeaders.append("Snowflake-Account", accountIdentifier);
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    statement: "SELECT JSON_OBJECT FROM TEST_DATA_SUPERHERO",
    timeout: 60,
    database: "TESTER",
    schema: "TEST_SC",
    warehouse: "API_POC_WH",
    role: "ACCESS_TESTER",
  });

  var requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await sendXhrRequest(
    serverUrl,
    pathToResource,
    requestOptions
  );

  return response;
}

export async function getHerosByName(token: string) {
  var requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("X-Snowflake-Authorization-Token-Type", "OAUTH");
  requestHeaders.append("Snowflake-Account", accountIdentifier);
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    statement:
      "SELECT json_object FROM TESTER.TEST_SC.TEST_DATA_SUPERHERO WHERE json_object:name = 'Madame Uppercut'",
    timeout: 60,
    database: "TESTER",
    schema: "TEST_SC",
    warehouse: "API_POC_WH",
    role: "ACCESS_TESTER",
  });

  var requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await sendXhrRequest(
    serverUrl,
    pathToResource,
    requestOptions
  );

  return response;
}

export async function getHerosByHomeTown(token: string) {
  var requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("X-Snowflake-Authorization-Token-Type", "OAUTH");
  requestHeaders.append("Snowflake-Account", accountIdentifier);
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    statement:
      "SELECT json_object FROM  TESTER.TEST_SC.TEST_DATA_SUPERHERO WHERE json_object:homeTown = 'Metro City'",
    timeout: 60,
    database: "TESTER",
    schema: "TEST_SC",
    warehouse: "API_POC_WH",
    role: "ACCESS_TESTER",
  });
  var requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await sendXhrRequest(
    serverUrl,
    pathToResource,
    requestOptions
  );

  return response;
}

export async function getHerosByAge(token: string) {
  var requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("X-Snowflake-Authorization-Token-Type", "OAUTH");
  requestHeaders.append("Snowflake-Account", accountIdentifier);
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    statement:
      "SELECT json_object FROM  TESTER.TEST_SC.TEST_DATA_SUPERHERO WHERE json_object:age > 1000",
    timeout: 60,
    database: "TESTER",
    schema: "TEST_SC",
    warehouse: "API_POC_WH",
    role: "ACCESS_TESTER",
  });

  var requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await sendXhrRequest(
    serverUrl,
    pathToResource,
    requestOptions
  );

  return response;
}
