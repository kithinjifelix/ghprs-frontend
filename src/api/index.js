//Test Server
function getUrl() {
  //Local Server
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:5003/api/';
  } else if (process.env.NODE_ENV === 'production') {
    //prod Server
    return 'https://tz-data-portal.azurewebsites.net/api/';
  }
}

// export const url =  'http://52.167.6.24:5050/api/';
export const url = getUrl();
