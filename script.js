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
