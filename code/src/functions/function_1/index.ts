
import { client } from "@devrev/typescript-sdk";
import axios from 'axios';

async function postCallAPI(
  endpoint: string,
  payload: any,
  authKey: string,
) {
  try {
    const res = await axios.post(endpoint, payload, {
      headers: {
        Authorization:'authKeyeyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJjbEw5NzVKR0c6ZGV2dS8xIiwiZXhwIjoxODEwMzgxMTIzLCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VpZCI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9zdXBlcjphdXRoMF91c2VyL2xpbmtlZGlufDZZT1lCUm9pX0ciLCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VzZXJfaWQiOiJsaW5rZWRpbnw2WU9ZQlJvaV9HIiwiaHR0cDovL2RldnJldi5haS9kZXZvX2RvbiI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yY2xMOTc1SkdHIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtMmNsTDk3NUpHRyIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2dWlkIjoiREVWVS0xIiwiaHR0cDovL2RldnJldi5haS9kaXNwbGF5bmFtZSI6InBvb2ppdGh1a2FyYWRpMDYiLCJodHRwOi8vZGV2cmV2LmFpL2VtYWlsIjoicG9vaml0aHVrYXJhZGkwNkBnbWFpbC5jb20iLCJodHRwOi8vZGV2cmV2LmFpL2Z1bGxuYW1lIjoiUG9vaml0aCBVIEthcmFkaSIsImh0dHA6Ly9kZXZyZXYuYWkvaXNfdmVyaWZpZWQiOnRydWUsImh0dHA6Ly9kZXZyZXYuYWkvdG9rZW50eXBlIjoidXJuOmRldnJldjpwYXJhbXM6b2F1dGg6dG9rZW4tdHlwZTpwYXQiLCJpYXQiOjE3MTU3NzMxMjMsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwianRpIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJjbEw5NzVKR0c6dG9rZW4vMmlXYndlZkoiLCJvcmdfaWQiOiJvcmdfTHV4eG9rOFl3ajNRVkVYVSIsInN1YiI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yY2xMOTc1SkdHOmRldnUvMSJ9.cO28pcWVfL197r6NAs3sfYRp1uagoXLh6bte08BU0_EsIK3MiTM1644RxRrvO3QFoGOEQRuz947Y2h8z9QdwHBnMs1AaSkPI8NudIBZRZV_lXCPtus2T5YEWnbwQ0djr-qjMBMXtwDtrc29Dw3tTtsoNG1yvNht_W6Sdyu_I1VElqrO6eySmEFDR9s_XzWs82bl5XmlI1A4b7WukN6EPU0OEiCqKMPukxxoBw_HgKJlbublfKAD4cfmOs5wbGFyAg4JLOjshaB58yRA19xnfewmzhFOx7wUoV0X8lGQTdBpsrra4O3upQbMuoeFaki2E2qyrU35BnsKECYBHQarORw',
        'Content-type': 'application/json',
      },
    });
    const data = res.data;
    return { success: true, errMessage: 'Data successfully fetched', data: data };
  } catch (error: any) {
    if (error.response) {
      return { success: false, errMessage: error.response.data, data: '' };
    } else if (error.request) {
      return { success: false, errMessage: error.request.data, data: '' };
    } else {
      return { success: false, errMessage: error, data: '' };
    }
  }
}

async function handleEvent(
  event: any,
) {
  const devrevPAT = event.context.secrets.service_account_token;
  const API_BASE = event.execution_metadata.devrev_endpoint;
  const devrevSDK = client.setup({
    endpoint: API_BASE,
    token: devrevPAT,
  })
  const workCreated = event.payload.work_created.work;
  const messageInput = event.input_data.global_values.input_field_1;
  let bodyComment = 'Hello World is printed on the work ' + workCreated.display_id;
 
  const body = {
    object: workCreated.id,
    type: 'timeline_comment',
    body:  bodyComment,
  }

   const response = await postCallAPI(API_BASE + '/works.create', body, devrevPAT);
  if (!response.success) {
    console.log(response.errMessage);
    return response;
  }
  console.log(response.data);
  return response;

}


export const run = async (events: any[]) => {
  for (let event of events) {
    const resp = await handleEvent(event);
    console.log(JSON.stringify(resp.data));
  }
};

export default run;
