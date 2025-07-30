
const tips = {
  moisture: "Keep soil moisture between 40%-60% for healthy lettuce.",
  ph: "Lettuce grows best with pH between 6.0 and 6.5.",
  light: "Provide 12-16 hours of light per day for best growth.",
  humidity: "Ideal humidity is around 50%-70%.",
  temperature: "Soil temperature should be 15-22°C."
};

function showTip(sensor) {
  document.getElementById('infoBox').innerText = tips[sensor];
}

function sendNotification(title, message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body: message });
  }
}

function checkCritical(data) {
  let critical = false;
  if (data.moisture < 40 || data.moisture > 60) critical = true;
  if (data.ph < 6.0 || data.ph > 6.5) critical = true;
  if (data.soilTemp < 15 || data.soilTemp > 22) critical = true;
  if (data.humidity < 50 || data.humidity > 70) critical = true;
  if (data.light < 10000 || data.light > 25000) critical = true;

  if (critical) {
    if (document.getElementById('soundToggle').checked)
      document.getElementById('alertSound').play();
    if (document.getElementById('vibrationToggle').checked)
      navigator.vibrate([200, 100, 200]);
    sendNotification("Lettuce Alert", "One or more conditions are critical!");
  }
}

// Dummy data simulation
setInterval(() => {
  let data = {
    moisture: Math.random() * 100,
    soilTemp: 15 + Math.random() * 10,
    humidity: 40 + Math.random() * 40,
    ph: 5.5 + Math.random(),
    light: 9000 + Math.random() * 20000
  };

  document.getElementById("moisture").textContent = data.moisture.toFixed(1);
  document.getElementById("soilTemp").textContent = data.soilTemp.toFixed(1);
  document.getElementById("humidity").textContent = data.humidity.toFixed(1);
  document.getElementById("ph").textContent = data.ph.toFixed(2);
  document.getElementById("light").textContent = Math.floor(data.light);

  checkCritical(data);
}, 5000);

if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}
