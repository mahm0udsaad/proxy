"use server";
import { parse } from "node-html-parser";

export async function fetchUserInfo() {
  const response = await fetch(`${process.env.BASE_URL}/show-user-info`);
  const data = await response.json();

  return data?.userStatus;
}

export async function rotateProxy(imei) {
  const response = await fetch(`${process.env.BASE_URL}/rotate-ip/${imei}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
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
      body: JSON.stringify({ ipAddress, port, imei, username, password }),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(30000), // 30 seconds timeout
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    const contentType = response.headers.get("content-type");

    // If it's JSON, check for explicit error
    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }
      return json;
    }

    // If it's HTML, parse the content
    const html = await response.text();

    // Validate HTML is not empty
    if (!html || html.trim() === "") {
      throw new Error("Received empty response from speed test");
    }

    const root = parse(html);

    // Robust parsing with fallback values
    const imeiValue =
      root.querySelector("h3")?.text.match(/IMEI: (\d+)/)?.[1] ||
      root
        .querySelector("h3")
        ?.text.split(/IMEI:/i)[1]
        ?.trim()
        .split(/\s/)[0] ||
      imei;

    const nick =
      root.querySelector("h3")?.text.match(/NICK: (\w+)/)?.[1] ||
      root
        .querySelector("h3")
        ?.text.split(/NICK:/i)[1]
        ?.trim()
        .split(/\s/)[0] ||
      "Unknown";

    const downloadSpeed =
      root.querySelector("td")?.textContent.match(/\d+\.\d+mbps/)?.[0] ||
      root
        .querySelectorAll("td")?.[0]
        ?.textContent.trim()
        .match(/\d+\.\d+mbps/)?.[0] ||
      "N/A";

    const uploadSpeed =
      root
        .querySelectorAll("td")?.[1]
        ?.textContent.match(/\d+\.\d+mbps/)?.[0] || "N/A";

    const resultImage =
      root.querySelector("img")?.getAttribute("src") ||
      "https://via.placeholder.com/400x300.png?text=Speed+Test+Result";

    // Validate required fields
    if (!imeiValue || !downloadSpeed || !uploadSpeed) {
      throw new Error("Unable to parse complete speed test results");
    }

    return {
      imei: imeiValue,
      nick,
      downloadSpeed,
      uploadSpeed,
      resultImage,
    };
  } catch (error) {
    console.error("Speed Test Fetch Error:", error);

    // Provide a more user-friendly error message
    if (error.name === "AbortError") {
      throw new Error("Speed test timed out. Please try again.");
    }

    throw new Error(
      error.message ||
        "Failed to perform speed test. Please check your connection and try again.",
    );
  }
}
export async function fetchConnectionResults(imei) {
  const response = await fetch(
    `${process.env.BASE_URL}/connection-results/${imei}`,
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
