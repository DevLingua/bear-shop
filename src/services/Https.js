export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 404) {
      throw new Error(`Error ${data.status}: ${data.code}`);
    }
    return data;
  } catch (error) {
    if (error.message) {
      return { msg: error.message || "An unknown error occurred!" };
    }
  }
};

