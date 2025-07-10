// JavaScript untuk fungsionalitas menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Pastikan elemen ada sebelum menambahkan event listener
if (mobileMenuButton && mobileMenu) { 
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Initialize Swiper for Inspiration Slider
const inspirationSwiperElement = document.querySelector('.inspiration-slider');
// Pastikan elemen Swiper ada sebelum inisialisasi
if (inspirationSwiperElement) { 
    const swiper = new Swiper(inspirationSwiperElement, {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 30,
            },
        }
    });
}

// NEW: Logika untuk rotasi gambar di bagian "Perjalanan Kami"
const rotatingStoryImage = document.getElementById('rotating-story-image');
if (rotatingStoryImage) { // Pastikan elemen gambar ada
    const storyImages = [
        'assets/images/about/galeri1.jpg',
        'assets/images/about/galeri2.jpg',
        'assets/images/about/galeri3.jpg',
        'assets/images/about/galeri4.jpg',
        'assets/images/about/galeri5.jpg',
        'assets/images/about/galeri6.jpg',
        // Tambahkan lebih banyak path gambar di sini jika Anda punya
    ];
    let currentImageIndex = 0;

    function changeImage() {
        // Animasi fade-out gambar saat ini
        gsap.to(rotatingStoryImage, {
            opacity: 0,
            duration: 0.6, // Durasi fade-out
            onComplete: () => {
                // Setelah fade-out selesai, ganti sumber gambar
                currentImageIndex = (currentImageIndex + 1) % storyImages.length;
                rotatingStoryImage.src = storyImages[currentImageIndex];

                // Animasi fade-in gambar baru
                gsap.fromTo(rotatingStoryImage,
                    { opacity: 0 }, // Mulai dari tidak terlihat
                    { opacity: 1, duration: 0.6 } // Fade-in ke terlihat
                );
            }
        });
    }

    // Pastikan gambar awal terlihat sebelum rotasi dimulai
    gsap.set(rotatingStoryImage, { opacity: 1 });

    // Ubah gambar setiap 3 detik (3000 milidetik), termasuk durasi animasi
    // Total siklus: 0.5s fade-out + 0.5s fade-in + 2s jeda = 3s
    setInterval(changeImage, 4000);
}

// Initialize Swiper for Logo Carousel
const logoSwiperElement = document.querySelector('.logo-carousel');
// Pastikan elemen Swiper ada sebelum inisialisasi
if (logoSwiperElement) { 
    const logoSwiper = new Swiper(logoSwiperElement, {
        loop: true,
        slidesPerView: 2, // Default: 2 logo terlihat di mobile
        spaceBetween: 30,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 3000, // Kecepatan pergerakan

        breakpoints: {
            425: {
                slidesPerView: 3,
                spaceBetween: 40,
                speed: 4000,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 50,
                speed: 5000,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 60,
                speed: 6000,
            },
        },
        allowTouchMove: false,
        freeMode: true,
    });
}


// --- GSAP Animations ---
document.addEventListener('DOMContentLoaded', () => {
    // Registrasi plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Atur keadaan awal elemen yang akan dianimasikan (agar tidak terlihat sebelum animasi)
    gsap.set('[data-anim]', {autoAlpha: 1}); // Pastikan elemen terlihat oleh GSAP

    // 1. Animasi Hero Section (saat load) - untuk index.html
    gsap.from('[data-anim="hero-title"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 });
    gsap.from('[data-anim="hero-p"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.5 });
    gsap.from('[data-anim="hero-btn"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.7 });

    // Animasi Hero Section untuk about.html
    gsap.from('[data-anim="about-hero-title"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 });
    gsap.from('[data-anim="about-hero-subtitle"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.5 });

    // Animasi Hero Section untuk products.html
    gsap.from('[data-anim="products-hero-title"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 });
    gsap.from('[data-anim="products-hero-subtitle"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.5 });
    
    // Animasi Hero Section untuk contact.html
    gsap.from('[data-anim="contact-hero-title"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 });
    gsap.from('[data-anim="contact-hero-subtitle"]', { opacity: 0, y: 30, duration: 0.8, delay: 0.5 });

    // 2. Animasi Judul Section (saat scroll)
    const sectionTitles = document.querySelectorAll('[data-anim="section-title"]');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%', // Animasi dimulai saat 85% bagian atas elemen masuk viewport
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
        });
    });
    
    const sectionSubtitles = document.querySelectorAll('[data-anim="section-subtitle"]');
    sectionSubtitles.forEach(subtitle => {
        gsap.from(subtitle, {
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: 0.2
        });
    });

    // 3. Animasi Card Produk, Why Us, dan Kustomisasi dengan Stagger (muncul satu per satu)
    const sectionsWithCards = ['#products', '#why-us', '#customization'];
    sectionsWithCards.forEach(sectionId => {
        gsap.from(`${sectionId} [data-anim="card"]`, {
            scrollTrigger: {
                trigger: sectionId,
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15, // Jeda antar animasi kartu
        });
    });

    // Animasi Kartu Layanan di Bagian 'Layanan Profesional Kami'
    gsap.from('#services [data-anim="service-card"]', {
        scrollTrigger: {
            trigger: '#services',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15, // Jeda antar animasi kartu
    });
    
    // 4. Animasi Section 'About Us' (dari index.html)
    gsap.from('#about [data-anim="about-img"]', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -80, // Bergerak dari kiri
        duration: 1,
    });
    gsap.from('#about [data-anim="about-text"]', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50, // Bergerak dari bawah
        duration: 1,
    });
    
    // 5. Animasi Logo Klien (bagian statis, jika Anda tetap menggunakannya)
    gsap.from('#clients [data-anim="client-logo"]', {
        scrollTrigger: {
            trigger: '#clients',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
    });

    // Animasi untuk Kisah Kami (1 Paragraf) di Halaman About Us
    gsap.from('[data-anim="story-paragraph"]', {
        scrollTrigger: {
            trigger: '#our-story',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 1,
    });

    // Animasi untuk Misi & Visi Cards di Halaman About Us
    gsap.from('[data-anim="mv-card"]', {
        scrollTrigger: {
            trigger: '#mission-vision',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
    });

    // Animasi untuk Value Cards di Halaman About Us
    gsap.from('[data-anim="value-card"]', {
        scrollTrigger: {
            trigger: '#our-values',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
    });

    // Animasi untuk Foto Tim Bersama di Halaman About Us
    gsap.from('[data-anim="team-group-photo"]', {
        scrollTrigger: {
            trigger: '#our-team',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.7)" // Efek pantulan untuk foto
    });
    gsap.from('[data-anim="team-text"]', { // Animasi untuk paragraf di bawah foto tim
        scrollTrigger: {
            trigger: '#our-team', // Trigger the whole section for consistency
            start: 'top 70%', // Adjust start point if needed
            toggleActions: 'play none none none',
        },
        opacity: 0, // Animate from invisible
        y: 30, // Animate from slightly below
        duration: 0.8,
        delay: 0.5 // Delay after the photo animation
    });

    // Animasi untuk Contact Info Card
    gsap.from('[data-anim="contact-info-card"]', {
        scrollTrigger: {
            trigger: '#contact-info-section',
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -50, // Geser dari kiri
        duration: 1,
        ease: "power3.out"
    });

    // Animasi untuk Google Maps
    gsap.from('[data-anim="map-embed"]', {
        scrollTrigger: {
            trigger: '#location-map', // Menggunakan ID yang benar untuk trigger
            start: 'top 70%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out"
    });

    // 6. Animasi CTA Section (untuk semua halaman)
    gsap.from('[data-anim="cta-content"] > *', {
        scrollTrigger: {
            trigger: '#contact-us', // Menggunakan ID baru untuk CTA di halaman kontak
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
    });

    // ===== Products Page Logic (Filtering & Pagination) =====
    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn'); 
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');

    // Hanya jalankan logika halaman produk jika semua elemen DOM yang diperlukan ada
    if (productGrid && prevPageBtn && nextPageBtn && pageNumbersContainer && filterButtons.length > 0) {
        // Data produk mentah (dengan kemungkinan duplikasi jenis box)
        const rawAllProductsData = [
            // Furnitur / Mebel
            { id: 1, type: "Triple Wall Corrugated Box", category: "furnitur", image: "assets/images/products/produk1.png" },
            { id: 2, type: "Double Wall Corrugated Box", category: "furnitur", image: "assets/images/products/produk2.png" },
            { id: 3, type: "Full Overlap Carton (FOL)", category: "furnitur", image: "assets/images/products/produk3.png" },
            { id: 4, type: "Flat Packed Die-Cut Box", category: "furnitur", image: "assets/images/products/produk4.png" },
            { id: 5, type: "Telescoping Box", category: "furnitur", image: "assets/images/products/produk5.png" },
            { id: 6, type: "Edge Protector", category: "furnitur", image: "assets/images/products/produk6.png" },
            { id: 7, type: "Box Pallet", category: "furnitur", image: "assets/images/products/produk7.png" },
            { id: 8, type: "Partitioned Box", category: "furnitur", image: "assets/images/products/produk8.png" },
            { id: 9, type: "Archive Box / Storage Box", category: "furnitur", image: "assets/images/products/produk9.png" },
            { id: 10, type: "Custom Die-Cut Box", category: "furnitur", image: "assets/images/products/produk10.png" },

            // Elektronik
            { id: 11, type: "Triple Wall Corrugated Box", category: "elektronik", image: "assets/images/products/produk1.png" },
            { id: 12, type: "Double Wall Corrugated Box", category: "elektronik", image: "assets/images/products/produk2.png" },
            { id: 13, type: "Full Overlap Carton (FOL)", category: "elektronik", image: "assets/images/products/produk3.png" },
            { id: 14, type: "Telescoping Box", category: "elektronik", image: "assets/images/products/produk5.png" },
            { id: 15, type: "Edge Protector", category: "elektronik", image: "assets/images/products/produk6.png" },
            { id: 16, type: "Box Pallet", category: "elektronik", image: "assets/images/products/produk7.png" },
            { id: 17, type: "Partitioned Box", category: "elektronik", image: "assets/images/products/produk8.png" },
            { id: 18, type: "Custom Die-Cut Box", category: "elektronik", image: "assets/images/products/produk10.png" },

            // Pengiriman
            { id: 19, type: "Double Wall Corrugated Box", category: "pengiriman", image: "assets/images/products/produk2.png" },
            { id: 20, type: "Full Overlap Carton (FOL)", category: "pengiriman", image: "assets/images/products/produk3.png" },
            { id: 21, type: "Flat Packed Die-Cut Box", category: "pengiriman", image: "assets/images/products/produk4.png" },
            { id: 22, type: "Box Pallet", category: "pengiriman", image: "assets/images/products/produk7.png" },
            { id: 23, type: "Mailer Box Tebal", category: "pengiriman", image: "assets/images/products/produk11.png" },
            { id: 24, type: "Partitioned Box", category: "pengiriman", image: "assets/images/products/produk8.png" },
            { id: 25, type: "Custom Die-Cut Box", category: "pengiriman", image: "assets/images/products/produk10.png" },
            { id: 26, type: "Edge Protector", category: "pengiriman", image: "assets/images/products/produk6.png" },

            // Makanan
            { id: 27, type: "Partitioned Box", category: "makanan", image: "assets/images/products/produk8.png" },
            { id: 28, type: "Custom Die-Cut Box", category: "makanan", image: "assets/images/products/produk10.png" },
            { id: 29, type: "Mailer Box Tebal", category: "makanan", image: "assets/images/products/produk11.png" },
            { id: 30, type: "Folding Carton", category: "makanan", image: "assets/images/products/produk12.png" },
            { id: 31, type: "Shelf Ready Packaging", category: "makanan", image: "assets/images/products/produk13.png" },
            { id: 32, type: "Window Box", category: "makanan", image: "assets/images/products/produk14.png" },

            // Pakaian
            { id: 33, type: "Mailer Box Tebal", category: "pakaian", image: "assets/images/products/produk11.png" },
            { id: 34, type: "Folding Carton", category: "pakaian", image: "assets/images/products/produk12.png" },
            { id: 35, type: "Archive Box / Storage Box", category: "pakaian", image: "assets/images/products/produk9.png" },
            { id: 36, type: "Window Box", category: "pakaian", image: "assets/images/products/produk14.png" },
            { id: 37, type: "Custom Die-Cut Box", category: "pakaian", image: "assets/images/products/produk10.png" },
        ];

        // Memproses rawAllProductsData untuk mendapatkan daftar produk dengan jenis box unik
        // Ini akan digunakan sebagai sumber data untuk filter 'all'
        const allProductsUniqueTypes = [];
        const seenTypes = new Set();

        rawAllProductsData.forEach(product => {
            if (!seenTypes.has(product.type)) {
                seenTypes.add(product.type);
                allProductsUniqueTypes.push(product);
            }
        });

        // allProducts akan menjadi sumber data utama yang unik berdasarkan tipe
        // filteredProducts akan diinisialisasi dari sini
        let allProducts = allProductsUniqueTypes; 


        let filteredProducts = [...allProducts]; // Produk yang sedang ditampilkan setelah filter
        let currentPage = 1;
        // productsPerPage akan ditentukan secara dinamis
        let productsPerPage; 

        // Fungsi untuk menentukan jumlah produk per halaman berdasarkan lebar layar
        function getProductsPerPage() {
            if (window.innerWidth < 768) { // Contoh breakpoint untuk mobile (di bawah tablet)
                return 6;
            } else {
                return 12; // Untuk tablet dan desktop
            }
        }

        // Fungsi untuk merender produk ke grid
        function renderProducts() {
            productGrid.innerHTML = ''; // Kosongkan grid
            productsPerPage = getProductsPerPage(); // Perbarui jumlah produk per halaman
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const productsToRender = filteredProducts.slice(startIndex, endIndex);

            if (productsToRender.length === 0) {
                productGrid.innerHTML = '<p class="col-span-full text-center text-gray-600 text-lg">Tidak ada produk yang ditemukan untuk kategori ini.</p>';
                return;
            }

            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card'); // Kelas dari style.css
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.type}" onerror="this.onerror=null;this.src='https://placehold.co/400x200/cccccc/333333?text=Gambar+Tidak+Tersedia';">
                    <div class="p-6">
                        <h3 class="font-semibold text-sm text-gray-900 mb-1">${product.type}</h3> <!-- Hanya menampilkan jenis box -->
                    </div>
                `;
                productGrid.appendChild(productCard);
            });

            // Animasi GSAP untuk kartu produk yang baru dirender - DIHILANGKAN
            // gsap.from('.product-card', {
            //     opacity: 0,
            //     y: 50,
            //     duration: 0.6,
            //     stagger: 0.1,
            //     ease: "power3.out"
            // });
        }

        // Fungsi untuk merender kontrol paginasi
        function renderPaginationControls() {
            pageNumbersContainer.innerHTML = '';
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('pagination-btn', 'px-3', 'py-1', 'rounded-md', 'bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'transition-colors', 'duration-200');
                pageButton.textContent = i;
                if (i === currentPage) {
                    pageButton.classList.add('active-page');
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    renderProducts();
                    renderPaginationControls();
                    productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll to top of products
                });
                pageNumbersContainer.appendChild(pageButton);
            }
        }

        // Event listener untuk tombol filter
        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const category = event.target.dataset.category;

                // Hapus kelas 'active' dari semua tombol filter
                filterButtons.forEach(btn => btn.classList.remove('active-filter-btn'));
                // Tambahkan kelas 'active' ke tombol yang diklik
                event.target.classList.add('active-filter-btn');

                if (category === 'all') {
                    // Ketika 'all' dipilih, gunakan daftar produk dengan jenis unik
                    filteredProducts = [...allProductsUniqueTypes]; 
                } else {
                    // Ketika kategori spesifik dipilih, filter dari rawAllProductsData
                    // dan pastikan jenis box unik dalam kategori tersebut
                    const categorySpecificProducts = rawAllProductsData.filter(product => product.category === category);
                    const uniqueTypesInCategory = [];
                    const seenTypesInCategory = new Set();

                    categorySpecificProducts.forEach(product => {
                        if (!seenTypesInCategory.has(product.type)) {
                            seenTypesInCategory.add(product.type);
                            uniqueTypesInCategory.push(product);
                        }
                    });
                    filteredProducts = uniqueTypesInCategory;
                }
                currentPage = 1; // Reset ke halaman pertama setelah filter
                renderProducts();
                renderPaginationControls();
            });
        });

        // Event listener untuk tombol paginasi "Sebelumnya" dan "Berikutnya"
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
                renderPaginationControls();
                productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
                renderPaginationControls();
                productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Inisialisasi tampilan produk saat halaman dimuat
        // Memastikan ini hanya berjalan jika semua elemen produk ada
        renderProducts();
        renderPaginationControls();

        // Tambahkan event listener untuk resize window
        window.addEventListener('resize', () => {
            // Periksa apakah jumlah produk per halaman berubah
            const newProductsPerPage = getProductsPerPage();
            if (newProductsPerPage !== productsPerPage) { // Hanya render ulang jika ada perubahan
                currentPage = 1; // Opsional: reset ke halaman 1 saat resize
                renderProducts();
                renderPaginationControls();
            }
        });

    } // Akhir dari if (productGrid && ...)
});
