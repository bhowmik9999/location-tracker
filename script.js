function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    document.getElementById("status").innerText = "Geolocation is not supported.";
  }
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch("https://your-backend-url.onrender.com/save-location", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ latitude, longitude })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("status").innerText =
        `✅ Sent! Detected: ${data.state}, ${data.region} Region, India`;
    })
    .catch(() => {
      document.getElementById("status").innerText = "❌ Failed to send location.";
    });
}

function error(err) {
  document.getElementById("status").innerText = "Error: " + err.message;
}
