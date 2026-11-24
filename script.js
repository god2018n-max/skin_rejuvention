const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "باز کردن منو");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Roshan personalized routine helper
const routineBuilder = document.querySelector("#routineBuilder");
const routineResult = document.querySelector("#routineResult");

const skinRoutineData = {
  normal: {name:"نرمال", cleanser:"شوینده ملایم با بافت دلخواه", moisturizer:"لوسیون یا کرم سبک تا متوسط", note:"اگر پوستت در فصل‌های مختلف تغییر می‌کند، بافت مرطوب‌کننده را متناسب با همان فصل تنظیم کن."},
  dry: {name:"خشک", cleanser:"شوینده کرمی و بدون عطر", moisturizer:"کرم غنی‌تر حاوی سرامید یا گلیسیرین", note:"مرطوب‌کننده را روی پوست کمی نم‌دار بزن و فعلاً از اسکراب و شست‌وشوی داغ دوری کن."},
  oily: {name:"چرب", cleanser:"شوینده ژلی و ملایم؛ بدون حس خشکی پس از شست‌وشو", moisturizer:"ژل‌کرم سبک و غیرکومدون‌زا", note:"پوست چرب هم به مرطوب‌کننده نیاز دارد. شست‌وشوی خشن و چندباره می‌تواند تحریک ایجاد کند."},
  combination: {name:"مختلط", cleanser:"شوینده ملایم مناسب صورت", moisturizer:"لوسیون سبک؛ در صورت نیاز کرم بیشتر روی گونه‌های خشک", note:"می‌توانی برای ناحیه T و گونه‌ها از مقدار یا بافت متفاوت مرطوب‌کننده استفاده کنی."},
  sensitive: {name:"حساس", cleanser:"شوینده بسیار ملایم و بدون عطر", moisturizer:"مرطوب‌کننده ساده و بدون عطر، ترجیحاً حاوی سرامید", note:"محصولات جدید را تک‌به‌تک و با تست موضعی وارد کن. اگر سوزش یا قرمزی پایدار داری، مصرف را متوقف کن."}
};
const skinGoalData = {
  basic:{title:"حفظ سلامت و سادگی", extra:"فعلاً ماده فعال اضافه لازم نیست؛ چند هفته به روتین پایه فرصت بده."},
  acne:{title:"جوش و چربی اضافه", extra:"در صورت تحمل پوست، می‌توان یک محصول حاوی سالیسیلیک اسید را با دفعات کم و طبق برچسب محصول امتحان کرد؛ هم‌زمان چند لایه‌بردار را شروع نکن. آکنه شدید یا دردناک نیاز به ارزیابی متخصص دارد."},
  spots:{title:"لک و ناهماهنگی رنگ پوست", extra:"محافظت منظم در برابر آفتاب پایه اصلی است. در صورت تحمل، یک ترکیب ملایم مثل نیاسینامید را جداگانه و تدریجی اضافه کن؛ لک جدید یا در حال تغییر باید بررسی پزشکی شود."},
  dryness:{title:"خشکی و کم‌آبی", extra:"مرطوب‌کننده را روی پوست کمی نم‌دار استفاده کن و تا بهترشدن خشکی، تونرهای الکلی و لایه‌بردارها را کنار بگذار."},
  texture:{title:"بافت ناهموار پوست", extra:"ابتدا روتین پایه را تثبیت کن. اگر پوستت حساس یا تحریک‌شده نیست، تنها یک لایه‌بردار ملایم را با فاصله و طبق دستور محصول شروع کن."}
};
routineBuilder?.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = skinRoutineData[document.querySelector("#skinType")?.value];
  const goal = skinGoalData[document.querySelector("#skinGoal")?.value];
  if (!type || !goal || !routineResult) return;
  routineResult.innerHTML = `
    <h3>روتین پیشنهادی برای پوست ${type.name}</h3>
    <p>اولویت انتخاب‌شده: ${goal.title}. این یک نقطه شروع عمومی است؛ واکنش پوستت و دستور مصرف روی بسته‌بندی را در نظر بگیر.</p>
    <div class="routine-plan-grid">
      <section class="routine-plan-card"><h4>☀ صبح</h4><ol>
        <li>${type.cleanser}</li><li>${type.moisturizer}</li><li>ضدآفتاب طیف‌گسترده SPF 30 یا بالاتر؛ در فضای باز هر دو ساعت و پس از شنا یا تعریق تمدید کن.</li>
      </ol></section>
      <section class="routine-plan-card"><h4>☾ شب</h4><ol>
        <li>پاک‌کردن آرایش یا ضدآفتاب و شست‌وشوی ملایم</li><li>${goal.title === "حفظ سلامت و سادگی" ? "فعلاً محصول فعال ضروری نیست" : "در صورت نیاز، فقط یک محصول هدفمند و سازگار؛ ابتدا با دفعات کم"}</li><li>${type.moisturizer}</li>
      </ol></section>
    </div>
    <div class="routine-active-tip"><strong>نکته مخصوص تو:</strong> ${type.note} ${goal.extra}</div>
    <div class="routine-links"><a href="#products">دیدن گروه‌های محصولات ↗</a><a href="#skin-selector">مرور شناخت نوع پوست ↗</a></div>
  `;
  routineResult.hidden = false;
  routineResult.scrollIntoView({behavior:"smooth",block:"nearest"});
});

// Filter product recommendations by the skin type they are intended for.
const selectedCompareCards = new Set();
const productFilterButtons = document.querySelectorAll("[data-skin-filter]");
const productFilterCount = document.querySelector("#productFilterCount");
const productGuides = document.querySelectorAll(".products-section .cleanser-guide");
const productSkinKeywords = {
  normal: /نرمال|معمولی|normal|انواع پوست|همه پوست/i,
  dry: /خشک|کم.?آب|اگزما|dry|dehydrated/i,
  oily: /چرب|جوش|آکنه|سرسیاه|مستعد آکنه|oily|acne/i,
  combination: /مختلط|combination/i,
  sensitive: /حساس|سد دفاعی|ترمیم|اگزما|sensitive|barrier/i
};
const productMatchesSkin = (item, skin) => {
  if (skin === "all") return true;
  const label = item.querySelector(".cleanser-skin")?.textContent || "";
  const searchableText = label + " " + (item.querySelector("h4")?.textContent || "");
  if (/انواع پوست|همه پوست/i.test(label)) return true;
  return productSkinKeywords[skin].test(searchableText);
};
const applyProductSkinFilter = (skin) => {
  let visibleCount = 0;
  let retainedCount = 0;
  productGuides.forEach((guide) => {
    const items = guide.querySelectorAll(".cleanser-item");
    let visibleInGuide = 0;
    items.forEach((item) => {
      const matches = productMatchesSkin(item, skin);
      const retainedForCompare = selectedCompareCards.has(item);
      const show = matches || retainedForCompare;
      item.hidden = !show;
      if (matches) visibleCount += 1;
      else if (retainedForCompare) retainedCount += 1;
      if (show) visibleInGuide += 1;

      let note = item.querySelector(".compare-filter-note");
      if (retainedForCompare && !matches) {
        if (!note) {
          note = document.createElement("p");
          note.className = "compare-filter-note";
          note.textContent = "این محصول به‌دلیل انتخاب برای مقایسه، با وجود خارج‌بودن از فیلتر فعلی نمایش داده شده است.";
          item.append(note);
        }
        note.hidden = false;
      } else if (note) {
        note.hidden = true;
      }
    });
    guide.hidden = visibleInGuide === 0;
  });
  productFilterButtons.forEach((button) => {
    const active = button.dataset.skinFilter === skin;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (productFilterCount) {
    const selectedLabel = document.querySelector('[data-skin-filter="' + skin + '"]')?.textContent.trim();
    if (skin === "all") {
      productFilterCount.textContent = "همه " + visibleCount + " پیشنهاد نمایش داده می‌شوند.";
    } else {
      productFilterCount.textContent = visibleCount + " پیشنهاد مرتبط با پوست " + selectedLabel + " نمایش داده می‌شود."
        + (retainedCount ? " " + retainedCount + " محصول انتخاب‌شده برای مقایسه نیز نگه داشته شده است." : "");
    }
  }
};
productFilterButtons.forEach((button) => {
  button.addEventListener("click", () => applyProductSkinFilter(button.dataset.skinFilter));
});
if (productFilterButtons.length) applyProductSkinFilter("all");



// Compare up to three recommended products side by side.
const compareCards = [...document.querySelectorAll(".products-section .cleanser-item")];
const comparePanel = document.querySelector("#productCompare");
const compareCount = document.querySelector("#compareSelectionCount");
const compareEmpty = document.querySelector("#compareEmpty");
const compareWrap = document.querySelector("#compareTableWrap");
const compareBody = document.querySelector("#compareTableBody");
const compareClear = document.querySelector("#compareClear");

const faNumber = (number) => number.toLocaleString("fa-IR");

const renderProductComparison = () => {
  const selected = [...selectedCompareCards];
  if (compareCount) compareCount.textContent = faNumber(selected.length) + " از ۳ محصول";
  if (compareEmpty) compareEmpty.hidden = selected.length > 0;
  if (compareWrap) compareWrap.hidden = selected.length === 0;
  if (compareClear) compareClear.hidden = selected.length === 0;
  if (!compareBody) return;

  compareBody.replaceChildren();
  const rows = [
    ["نام محصول", card => card.querySelector("h4")?.textContent.trim() || "—"],
    ["قیمت تقریبی", card => card.querySelector(".cleanser-price")?.textContent.trim() || "درج نشده"],
    ["نوع پوست", card => card.querySelector(".cleanser-skin")?.textContent.trim() || "ذکر نشده"],
    ["توضیحات", card => card.querySelector("p")?.textContent.trim() || "—"]
  ];
  rows.forEach(([label, getValue]) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = label;
    tr.append(th);
    for (let i = 0; i < 3; i += 1) {
      const td = document.createElement("td");
      td.textContent = selected[i] ? getValue(selected[i]) : "—";
      tr.append(td);
    }
    compareBody.append(tr);
  });

  compareCards.forEach(card => {
    const checkbox = card.querySelector(".compare-pick input");
    if (checkbox) {
      checkbox.checked = selectedCompareCards.has(card);
      checkbox.disabled = selectedCompareCards.size >= 3 && !checkbox.checked;
    }
  });
  const activeFilter = document.querySelector("[data-skin-filter].is-active")?.dataset.skinFilter || "all";
  applyProductSkinFilter(activeFilter);
};
compareCards.forEach((card, index) => {
  const label = document.createElement("label");
  label.className = "compare-pick";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", "افزودن " + (card.querySelector("h4")?.textContent.trim() || "محصول") + " به مقایسه");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked && selectedCompareCards.size < 3) selectedCompareCards.add(card);
    else selectedCompareCards.delete(card);
    renderProductComparison();
  });
  const text = document.createElement("span");
  text.textContent = "انتخاب برای مقایسه";
  label.append(checkbox, text);
  card.append(label);
});
compareClear?.addEventListener("click", () => {
  selectedCompareCards.clear();
  renderProductComparison();
});
if (comparePanel && compareCards.length) renderProductComparison();
