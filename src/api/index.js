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

const getHubUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:5003/";
  }
  if (window.location.protocol !== "https:") {
    return "https://tz-data-portal.azurewebsites.net/";
  }
  return "https://tz-data-portal.azurewebsites.net/";
};

export const hubUrl = getHubUrl();
export const url = getUrl();
