//Test Server
function getUrl() {
  //Local Server
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:5003/api/';
  } else if (process.env.NODE_ENV === 'production') {
    //prod Server
    return 'https://tz-data-portal.southafricanorth.cloudapp.azure.com/api/';
  }
}

const getHubUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:5003/";
  }
  if (window.location.protocol !== "https:") {
    return "https://tz-data-portal.southafricanorth.cloudapp.azure.com/";
  }
  return "https://tz-data-portal.southafricanorth.cloudapp.azure.com/";
};

export const hubUrl = getHubUrl();
export const url = getUrl();
