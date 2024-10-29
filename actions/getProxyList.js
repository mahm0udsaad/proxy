"use server";

export async function fetchUserInfo() {
  const response = await fetch(
    "https://powerproxy.onrender.com/show-user-info",
  );
  const data = await response.json();

  // Define the list of possible countries
  const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Netherlands", code: "NL" },
    { name: "Australia", code: "AU" },
  ];

  // Map through each object in the array and add a random country
  const updatedData = data.userStatus.map((item) => {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    return {
      ...item,
      net_details: {
        ...item.net_details,
        COUNTRY: randomCountry.name,
        COUNTRYCODE: randomCountry.code,
      },
    };
  });

  return updatedData;
}
