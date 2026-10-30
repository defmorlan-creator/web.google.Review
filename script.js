
const form = document.getElementById("reviewForm");
const downloadBtn = document.getElementById("downloadBtn");
const qrContainer = document.getElementById("qrcode");
const message = document.getElementById("message");

let qrGenerated = false;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const storeName =
    document.getElementById("storeName").value.trim();

  const storeAddress =
    document.getElementById("storeAddress").value.trim();

  const storeCategory =
    document.getElementById("storeCategory").value;

  const storePhone =
    document.getElementById("storePhone").value.trim();

  const reviewLink =
    document.getElementById("reviewLink").value.trim();

  // Memastikan link Google Review valid
  try {
    const parsedURL = new URL(reviewLink);

    if (
      parsedURL.protocol !== "https:" ||
      !(
        parsedURL.hostname === "g.page" ||
        parsedURL.hostname.endsWith(".google.com") ||
        parsedURL.hostname === "maps.app.goo.gl" ||
        parsedURL.hostname === "goo.gl"
      )
    ) {
      throw new Error("Link bukan link Google yang didukung.");
    }
  } catch (error) {
    message.textContent =
      "Masukkan link Google Review yang valid.";
    message.style.color = "red";
    return;
  }

  // Menampilkan informasi toko
  document.getElementById("resultName").textContent =
    storeName;

  document.getElementById("resultAddress").textContent =
    storeAddress;

  document.getElementById("resultCategory").textContent =
    storeCategory;

  document.getElementById("resultPhone").textContent =
    storePhone ? "WhatsApp: " + storePhone : "";

  // Membuat QR Code
  qrContainer.innerHTML = "";

  if (typeof QRCode === "undefined") {
    message.textContent =
      "Library QR Code gagal dimuat. Periksa internet.";
    message.style.color = "red";
    return;
  }

  new QRCode(qrContainer, {
    text: reviewLink,
    width: 170,
    height: 170,
    colorDark: "#102b46",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  qrGenerated = true;
  downloadBtn.disabled = false;

  message.textContent =
    "QR Code berhasil dibuat! Silakan unduh.";
  message.style.color = "green";
});

// Download QR Code
downloadBtn.addEventListener("click", function() {
  if (!qrGenerated) return;

  const canvas = qrContainer.querySelector("canvas");

  if (!canvas) {
    message.textContent =
      "QR Code belum siap. Silakan buat ulang.";
    message.style.color = "red";
    return;
  }

  const downloadLink = document.createElement("a");

  downloadLink.download = "Google-Review-QR.png";
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.click();
});
