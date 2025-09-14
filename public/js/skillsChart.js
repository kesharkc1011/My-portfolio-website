document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("❌ skillsChart canvas not found in DOM");
    return;
  }

  const ctx = canvas.getContext("2d");

  // ✅ Only destroy if chart exists AND destroy is a function
  if (window.skillsChart && typeof window.skillsChart.destroy === "function") {
    window.skillsChart.destroy();
  }

  // Create chart
  window.skillsChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Python",
        "JavaScript",
        "C++",
        "HTML/CSS",
        "React",
        "Node.js",
        "Fast API",
        "Django",
        "Arduino IDE",
      ],
      datasets: [
        {
          label: "Skill level out of 10",
          data: [7, 5, 5, 5, 5, 6, 3, 4, 5],
          backgroundColor: "rgba(117, 116, 30, 0.2)",
          borderColor: "rgba(243, 195, 62, 0.9)",
          pointBackgroundColor: "rgba(104, 78, 234, 1)",
          borderWidth: 2,
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          angleLines: { color: "rgba(0, 0, 0, 0.1)" },
          grid: { color: "rgba(0, 0, 0, 0.05)" },
          suggestedMin: 0,
          suggestedMax: 10,
          pointLabels: {
            color: "#8610edff",
            font: { size: 14, family: "'Inter', sans-serif" },
          },
          ticks: {
            display: false,
            stepSize: 2,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#8610edff",
            font: { size: 14, family: "'Inter', sans-serif" },
            padding: 20,
            boxWidth: 10,
          },
        },
      },
      elements: {
        line: { tension: 0.1 },
      },
    },
  });
});
