document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("❌ skillsChart canvas not found in DOM");
    return;
  }

  const ctx = canvas.getContext("2d");

  // ✅ Destroy existing chart if it exists
  if (window.skillsChart && typeof window.skillsChart.destroy === "function") {
    window.skillsChart.destroy();
  }

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
          label: "Skill Level (out of 10)",
          data: [7, 5, 5, 5, 5, 6, 3, 4, 5],
          backgroundColor: "rgba(0, 212, 255, 0.1)",
          borderColor: "#00d4ff",
          pointBackgroundColor: "#00d4ff",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#7c3aed",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2000,
        easing: "easeInOutQuart",
      },
      scales: {
        r: {
          angleLines: { color: "rgba(0, 212, 255, 0.3)", lineWidth: 1 },
          grid: { color: "rgba(0, 212, 255, 0.2)", lineWidth: 1 },
          suggestedMin: 0,
          suggestedMax: 10,
          pointLabels: {
            color: "#00d4ff",
            font: {
              size: 14,
              family: "'JetBrains Mono', monospace",
              weight: "500",
            },
          },
          ticks: {
            display: true,
            stepSize: 2,
            color: "rgba(160, 169, 192, 0.6)",
            font: { size: 10, family: "'JetBrains Mono', monospace" },
            backdropColor: "transparent",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#a0a9c0",
            font: {
              size: 16,
              family: "'Space Grotesk', sans-serif",
              weight: "500",
            },
            padding: 30,
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "rgba(26, 26, 46, 0.9)",
          titleColor: "#00d4ff",
          bodyColor: "#ffffff",
          borderColor: "#00d4ff",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          titleFont: {
            family: "'JetBrains Mono', monospace",
            size: 14,
            weight: "600",
          },
          bodyFont: { family: "'Space Grotesk', sans-serif", size: 13 },
        },
      },
      elements: {
        line: { tension: 0.2 },
        point: { hoverBorderWidth: 3 },
      },
      interaction: {
        intersect: false,
        mode: "point",
      },
    },
  });

  // ✅ Animate only when chart comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.skillsChart.update("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(canvas);
});
