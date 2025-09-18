// Data harga per frame berdasarkan aturan baru
const framePrices = {
    'Cycles': {
        'HD (1280x720)': 380,
        'Full HD (1920x1080)': 480, // Naik Rp100
        '2K (2048x1080)': 580, // Naik Rp100
        '4K (3840x2160)': 680  // Naik Rp100
    },
    'Eevee': {
        'HD (1280x720)': 300,
        'Full HD (1920x1080)': 400, // Naik Rp100
        '2K (2048x1080)': 500, // Naik Rp100
        '4K (3840x2160)': 600  // Naik Rp100
    }
};
// Fungsi untuk mengelola preloader
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    setTimeout(() => {
        preloader.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, 1500); // Tampilkan halaman setelah 1.5 detik
}
// Fungsi untuk mengaplikasikan mode gelap
function applyDarkMode(isDark) {
    const body = document.body;
    const profileImage = document.getElementById('profileImage');
    if (isDark) {
        body.classList.add('dark-mode');
        profileImage.src = './img/logo_white.png';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        profileImage.src = './img/logo_black.png';
        localStorage.setItem('theme', 'light');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (savedTheme === 'dark') {
        applyDarkMode(true);
        darkModeToggle.checked = true;
    } else {
        applyDarkMode(false);
        darkModeToggle.checked = false;
    }
    darkModeToggle.addEventListener('change', (event) => {
        applyDarkMode(event.target.checked);
    });
    // Tambahkan event listener untuk slider
    const frameCountSlider = document.getElementById('frameCount');
    const frameCountValue = document.getElementById('frameCountValue');
    frameCountSlider.addEventListener('input', (event) => {
        frameCountValue.textContent = event.target.value;
    });
});
window.onload = handlePreloader;
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}
function calculatePrice() {
    const frameCountSlider = document.getElementById('frameCount');
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    resultDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');
    setTimeout(() => {
        const frameCount = parseInt(frameCountSlider.value, 10);
        const renderEngine = document.getElementById('renderEngine').value;
        const resolution = document.getElementById('resolution').value;
        const totalPriceP = document.getElementById('totalPrice');
        const totalTimeP = document.getElementById('totalTime');
        const pricePerFrame = framePrices[renderEngine][resolution];
        const totalPrice = pricePerFrame * frameCount;
        totalPriceP.textContent = formatRupiah(totalPrice);
        totalTimeP.textContent = "Waktu rendering akan bervariasi.";
        loadingDiv.classList.add('hidden');
        resultDiv.classList.remove('hidden');
    }, 1000);
}
function orderViaWhatsapp() {
    const renderEngine = document.getElementById('renderEngine').value;
    const blenderVersion = document.getElementById('blenderVersion').value;
    const resolution = document.getElementById('resolution').value;
    const frameCount = document.getElementById('frameCount').value;
    const message = encodeURIComponent(
        `Halo, saya ingin order render proyek 3D:
` +
        `*Render Engine:* ${renderEngine}
` +
        `*Blender Version:* ${blenderVersion}
` +
        `*Resolusi:* ${resolution}
` +
        `*Jumlah Frame:* ${frameCount}`
    );
    const whatsappUrl = `https://wa.me/6289513170863?text=${message}`;
    window.open(whatsappUrl, '_blank');
}