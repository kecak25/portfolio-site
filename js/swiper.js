// 모달 요소
const modal = document.getElementById("modal");
const modalClose = document.querySelector(".modal-close");
const thumbsWrapper = document.querySelector(".thumbs-swiper .swiper-wrapper");
const mainWrapper = document.querySelector(".main-swiper .swiper-wrapper");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

let mainSwiper = null;
let thumbsSwiper = null;

// ================================
// 모달 열기
// ================================
document.querySelectorAll("#list-C li").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();

    // 데이터
    const title = item.getAttribute("data-title") || "";
    const desc = item.getAttribute("data-desc") || "";
    const url = item.getAttribute("data-url");
    const urlLabels = (item.getAttribute("data-url-label") || "").split(",");
    const images = (item.getAttribute("data-images") || "").split(",");

    // 초기화
    thumbsWrapper.innerHTML = "";
    mainWrapper.innerHTML = "";
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    if (url) {
      // 여러 개 URL 지원
      const urls = url.split(",");
      urls.forEach((u, idx) => {
        // 큰 슬라이드 (iframe)
        const iframeSlide = document.createElement("div");
        iframeSlide.classList.add("swiper-slide");
        iframeSlide.innerHTML = `
          <iframe src="${u.trim()}" style="width:100%; height:100%; border:none;"></iframe>
        `;
        mainWrapper.appendChild(iframeSlide);

        // 썸네일 (글자 라벨)
        const thumbSlide = document.createElement("div");
        thumbSlide.classList.add("swiper-slide");
        const label = (urlLabels[idx] || "HTML PAGE").trim();
        thumbSlide.innerHTML = `
          <div style="background:#333;color:#fff;font-size:12px;
                      display:flex;align-items:center;justify-content:center;
                      width:100%;height:100%;border-radius:4px;">${label}</div>`;
        thumbsWrapper.appendChild(thumbSlide);
      });

    } else if (images && images[0].trim() !== "") {
      // 이미지 여러 장
      images.forEach(img => {
        const clean = img.trim();
        if (!clean) return;

        const mainSlide = document.createElement("div");
        mainSlide.classList.add("swiper-slide");
        mainSlide.innerHTML = `<img src="${clean}" alt="${title}">`;
        mainWrapper.appendChild(mainSlide);

        const thumbSlide = document.createElement("div");
        thumbSlide.classList.add("swiper-slide");
        thumbSlide.innerHTML = `<img src="${clean}" alt="${title}">`;
        thumbsWrapper.appendChild(thumbSlide);
      });

      // 항상 4칸 유지
      const remainder = images.length % 4;
      if (remainder !== 0) {
        for (let i = 0; i < (4 - remainder); i++) {
          const emptySlide = document.createElement("div");
          emptySlide.classList.add("swiper-slide", "empty");
          thumbsWrapper.appendChild(emptySlide);
        }
      }
    }

    // Swiper 재생성
    if (mainSwiper) mainSwiper.destroy(true, true);
    if (thumbsSwiper) thumbsSwiper.destroy(true, true);

    thumbsSwiper = new Swiper(".thumbs-swiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesProgress: true,
      loop: true
    });

    mainSwiper = new Swiper(".main-swiper", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: { swiper: thumbsSwiper },
      effect: "slide",
      speed: 500,
      loop: true
    });

    // 모달 열기
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  });
});

// ================================
// 모달 닫기
// ================================
function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");

  // 초기화
  thumbsWrapper.innerHTML = "";
  mainWrapper.innerHTML = "";
  modalTitle.textContent = "";
  modalDesc.textContent = "";

  if (mainSwiper) mainSwiper.destroy(true, true);
  if (thumbsSwiper) thumbsSwiper.destroy(true, true);
  mainSwiper = null;
  thumbsSwiper = null;
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.style.display === "flex") closeModal(); });
