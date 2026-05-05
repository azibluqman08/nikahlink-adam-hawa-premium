function openInvitation() {
  const openingScreen = document.getElementById("openingScreen");
  const mainContent = document.getElementById("mainContent");
  const openButtonText = document.getElementById("openButtonText");

if (openButtonText) {
  openButtonText.innerText = "Membuka...";
}

playWeddingMusic();

  const music = document.getElementById("weddingMusic");
  const musicButton = document.getElementById("musicButton");

  if (music && musicButton) {
    music.volume = 0.5;
    music.play()
      .then(() => {
        isMusicPlaying = true;
        musicButton.classList.add("playing");
        musicButton.innerText = "♫";
      })
      .catch(() => {
        isMusicPlaying = false;
        musicButton.classList.remove("playing");
        musicButton.innerText = "▶";
      });
  }

  setTimeout(() => {
    if (openingScreen) {
      openingScreen.classList.add("hide-opening");
    }

    if (mainContent) {
      mainContent.classList.add("show-content");
    }

    document.body.classList.add("invitation-opened");
  }, 500);

  setTimeout(() => {
    if (openingScreen) {
      openingScreen.style.display = "none";
    }

    revealOnScroll();
  }, 1600);
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const itemTop = item.getBoundingClientRect().top;
    const revealPoint = 105;

    if (itemTop < windowHeight - revealPoint) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

/* COUNTDOWN */
const weddingDate = new Date("May 25, 2026 11:00:00").getTime();

function updateCountdown() {
  const countdown = document.getElementById("countdown");

  if (!countdown) return;

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdown.innerHTML = "<p>Majlis sedang berlangsung / telah selesai.</p>";
    return;
  }

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.innerText = String(days).padStart(2, "0");
  hoursEl.innerText = String(hours).padStart(2, "0");
  minutesEl.innerText = String(minutes).padStart(2, "0");
  secondsEl.innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* MUSIC */
let isMusicPlaying = false;

function playWeddingMusic() {
  const music = document.getElementById("weddingMusic");
  const musicButton = document.getElementById("musicButton");

  if (!music || !musicButton) {
    console.log("Audio atau button tidak dijumpai");
    return;
  }

  music.volume = 0.7;

  music.play()
    .then(() => {
      isMusicPlaying = true;
      musicButton.classList.add("playing");
      musicButton.innerText = "♫";
      console.log("Lagu berjaya dimainkan");
    })
    .catch((error) => {
      console.log("Lagu gagal dimainkan:", error);
      musicButton.innerText = "▶";
    });
}

function pauseWeddingMusic() {
  const music = document.getElementById("weddingMusic");
  const musicButton = document.getElementById("musicButton");

  if (!music || !musicButton) return;

  music.pause();
  isMusicPlaying = false;
  musicButton.classList.remove("playing");
  musicButton.innerText = "▶";
}

document.addEventListener("DOMContentLoaded", function () {
  const musicButton = document.getElementById("musicButton");

  if (musicButton) {
    musicButton.addEventListener("click", function () {
      if (isMusicPlaying) {
        pauseWeddingMusic();
      } else {
        playWeddingMusic();
      }
    });
  }
});
function downloadICS() {
  const eventTitle = "Majlis Perkahwinan Hammani & Haffiez";
  const eventLocation = "Dewan Seri Indah, Terengganu";
  const eventDescription = "Jemputan ke Majlis Perkahwinan Hammani & Haffiez.";

  const startTime = "20260525T110000";
  const endTime = "20260525T160000";

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NikahLink//Wedding Invitation//MS
BEGIN:VEVENT
UID:hammani-haffiez-20260525@nikahlink
DTSTAMP:20260501T000000Z
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${eventTitle}
LOCATION:${eventLocation}
DESCRIPTION:${eventDescription}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "majlis-hammani-haffiez.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
let attendanceStatus = "Hadir";

function openRSVP() {
  const rsvpOverlay = document.getElementById("rsvpOverlay");

  if (rsvpOverlay) {
    rsvpOverlay.classList.add("show");
  }
}

function closeRSVP() {
  const rsvpOverlay = document.getElementById("rsvpOverlay");

  if (rsvpOverlay) {
    rsvpOverlay.classList.remove("show");
  }
}

function setAttendance(status) {
  attendanceStatus = status;

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const guestCount = document.getElementById("guestCount");

  if (status === "Hadir") {
    yesBtn.classList.add("active");
    noBtn.classList.remove("active");
    guestCount.disabled = false;
    guestCount.placeholder = "Jumlah Yang Hadir";
  } else {
    noBtn.classList.add("active");
    yesBtn.classList.remove("active");
    guestCount.value = "";
    guestCount.disabled = true;
    guestCount.placeholder = "Tidak Hadir";
  }
}

function submitRSVP(event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value;
  const phone = document.getElementById("guestPhone").value;
  const count = document.getElementById("guestCount").value || "-";
  const message = document.getElementById("guestMessage").value || "-";

  const whatsappNumber = "60123456789";

  const text =
    `RSVP Majlis Perkahwinan%0A%0A` +
    `Nama: ${name}%0A` +
    `Nombor Telefon: ${phone}%0A` +
    `Kehadiran: ${attendanceStatus}%0A` +
    `Jumlah Hadir: ${count}%0A` +
    `Ucapan: ${message}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

  closeRSVP();
}
function openContact() {
  const contactOverlay = document.getElementById("contactOverlay");

  if (contactOverlay) {
    contactOverlay.classList.add("show");
  }
}

function closeContact() {
  const contactOverlay = document.getElementById("contactOverlay");

  if (contactOverlay) {
    contactOverlay.classList.remove("show");
  }
}