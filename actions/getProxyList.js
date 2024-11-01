"use server";
import { parse } from "node-html-parser";

export async function fetchUserInfo() {
  const response = await fetch(`${process.env.BASE_URL}/show-user-info`);
  const data = await response.json();

  return data?.userStatus;
}

export async function rotateProxy(imei) {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/rotate-ip/860191063669325`,
      {
        method: "POST",
        // Add timeout and error handling
      },
    );

    if (!response.ok) {
      // Handle non-200 responses
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    const data = await response.json();

    // Additional validation of returned data
    if (!data || (!data.result && !data.EXT_IP1)) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    // Comprehensive error handling
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please check your network connection.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your internet connection.");
    }

    // Re-throw the error with a more informative message
    throw new Error(
      error.message || "Failed to rotate IP. Please try again later.",
    );
  }
}

export async function fetchSpeedTestData({
  ipAddress,
  port,
  imei,
  username,
  password,
}) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/speed-test/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ipAddress: "188.245.37.125",
        port: "7016",
        imei: "860191063669325",
        username: "proxy",
        password: "proxy",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error: ${errorText}`);
    }

    const html = await response.text();
    const root = parse(html);

    // IMEI extraction
    const h3Text = root.querySelector("h3")?.text || "";
    const imeiMatch = h3Text.match(/IMEI:\s*(\d+)/i);
    const imeiValue = imeiMatch ? imeiMatch[1] : null;

    // Nick extraction
    const nickMatch = h3Text.match(/NICK:\s*(\w+)/i);
    const nick = nickMatch ? nickMatch[1] : null;

    // Speed extraction
    const speedRows = root.querySelectorAll("table.modems tr");
    const downloadSpeed = speedRows[1]?.querySelectorAll("td")[0]?.text.trim();
    const uploadSpeed = speedRows[1]?.querySelectorAll("td")[1]?.text.trim();

    // Result image extraction with simple cleanup
    let resultImage = root.querySelector("img")?.getAttribute("src") || "";

    // Extract the actual URL from the string
    const urlMatch = resultImage.match(/http:\/\/.*\.png/);
    resultImage = urlMatch
      ? urlMatch[0].replace("http:", "https:")
      : "https://via.placeholder.com/400x300.png?text=Speed+Test+Result";

    return {
      imei: imeiValue,
      nick: nick || "Unknown",
      downloadSpeed: downloadSpeed || "N/A",
      uploadSpeed: uploadSpeed || "N/A",
      resultImage,
    };
  } catch (error) {
    console.error("Comprehensive Speed Test Error:", error);
    throw error;
  }
}

export async function fetchConnectionResults(imei) {
  const response = await fetch(
    `${process.env.BASE_URL}/connection-results/860191063669325`,
  );
  console.log(response);

  const html = await response.text();
  const root = parse(html);

  // Extract IMEI and Nick
  const imeiValue =
    root.querySelector("h3")?.text.match(/IMEI: (\d+)/)?.[1] || null;
  const nick = root.querySelector("h3")?.text.match(/NICK: (\w+)/)?.[1] || null;

  // Get all table rows except the header row
  const rows = root.querySelectorAll("table.modems tr:not(:first-child)");

  // Parse connection test results
  const results = rows.map((row) => {
    const cells = row.querySelectorAll("td");
    return {
      connections: parseInt(cells[0].textContent.trim()),
      successRate: cells[1].textContent.trim() + "%",
      requestsPerSecond: parseFloat(cells[2].textContent.trim()),
      timePerRequestMs: parseFloat(cells[3].textContent.trim()),
    };
  });
  console.log(results);

  return {
    imei: imeiValue,
    nick,
    results,
  };
}
