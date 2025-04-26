function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const response = await fetch('https://location-backend-1-dg92.onrender.com/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ latitude, longitude })
        });

        const result = await response.json();

        if (response.ok) {
          alert(`✅ Location Sent!\nState: ${result.state}\nRegion: ${result.region}`);
        } else {
          alert(`❌ Failed to save location:\n${result.error || 'Unknown error'}`);
        }
      } catch (error) {
        alert(`❌ Fetch failed:\n${error.message}`);
      }
    }, (error) => {
      alert(`❌ Location Error: ${error.message}`);
    });
  } else {
    alert("❌ Geolocation is not supported by this browser.");
  }
}
