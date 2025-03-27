document.addEventListener("DOMContentLoaded", function () {
    let text = "Hallow, I am Pipah!!";
    let i = 0;
    let isDeleting = false;
    let speed = 90; // Kecepatan mengetik
    let typingElement = document.querySelector(".typing-text");

    function typeWriter() {
        if (!isDeleting && i < text.length) {
            typingElement.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, speed);
        } else if (isDeleting && i > 0) {
            typingElement.innerHTML = text.substring(0, i - 1);
            i--;
            setTimeout(typeWriter, speed / 2); // Hapus lebih cepat
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeWriter, 500); // Tunggu sebelum balik ketik
        }
    }

    typeWriter();
});


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.querySelector(".list-item1").style.animation = "fadeInUp 0.6s ease-out forwards";
    }, 200);

    setTimeout(() => {
        document.querySelector(".list-item2").style.animation = "fadeInUp 0.6s ease-out forwards";
    }, 400);

    setTimeout(() => {
        document.querySelector(".list-item3").style.animation = "fadeInUp 0.6s ease-out forwards";
    }, 600);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Mencegah reload halaman

        console.log("Form Submitted!"); // Debugging

        const formData = new FormData(this);

        try {
            const response = await fetch("sendEmail.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Response:", result); // Debugging

            const notification = document.getElementById("notification");

            if (!notification) {
                console.error("Elemen notifikasi tidak ditemukan!");
                return;
            }

            if (result.status === "success") {
                notification.innerHTML = `
                    <div class="notification-card success">
                        <div class="icon">✅</div>
                        <h2>SUCCESS!</h2>
                        <p>Email berhasil terkirim.</p>
                        <button class="btn-success" onclick="hideNotification()">Oke</button>
                    </div>
                `;
                notification.className = "notification show";
                this.reset(); // Reset form setelah sukses
            } else {
                notification.innerHTML = `
                    <div class="notification-card error">
                        <div class="icon">⚠️</div>
                        <h2>ERROR!</h2>
                        <p>Email tidak berhasil terkirim.</p>
                        <button class="btn-error" onclick="hideNotification()">Coba Lagi</button>
                    </div>
                `;
                notification.className = "notification show";
            }

            // Hapus notifikasi setelah 5 detik
            setTimeout(() => {
                hideNotification();
            }, 5000);

        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengirim pesan.");
        }
    });
});

function hideNotification() {
    document.getElementById("notification").className = "notification";
}
