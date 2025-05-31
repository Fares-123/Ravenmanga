const worksListEl = document.getElementById("works-list");
const latestListEl = document.getElementById("latest-list");

fetch("manga/data.json")
  .then(res => res.json())
  .then(data => {
    const works = data.works;

    // التحقق من وجود أعمال
    if (!Array.isArray(works) || works.length === 0) {
      worksListEl.innerHTML = "<p>لا توجد أعمال لعرضها حالياً.</p>";
      return;
    }

    // عرض الأعمال
    works.forEach(work => {
      const card = document.createElement("div");
      card.className = "work-card";

      // توليد مسار الغلاف تلقائياً
      const coverPath = `manga/${work.title}/${work.cover}`;

      card.innerHTML = `
        <img src="${coverPath}" alt="${work.title}" class="work-cover" />
        <div class="work-title">${work.title}</div>
        <div class="work-desc">${work.description}</div>
      `;

      card.onclick = () => showChapters(work);
      worksListEl.appendChild(card);
    });

    // جمع جميع الفصول
    let allChapters = [];
    works.forEach(work => {
      (work.chapters || []).forEach(chapter => {
        allChapters.push({
          ...chapter,
          workTitle: work.title,
          workCover: `manga/${work.title}/${work.cover}`,
          workDescription: work.description
        });
      });
    });

    // ترتيب الفصول حسب التاريخ
    allChapters.sort((a, b) => new Date(b.date) - new Date(a.date));

    // عرض آخر 5 فصول
    allChapters.slice(0, 5).forEach(chapter => {
      const item = document.createElement("div");
      item.className = "chapter-item";

      item.innerHTML = `
        <div class="chapter-title">${chapter.workTitle} - ${chapter.title}</div>
        <div class="chapter-date">${new Date(chapter.date).toLocaleDateString("ar-EG")}</div>
      `;

      item.onclick = () => alert(
        `عنوان العمل: ${chapter.workTitle}\n` +
        `الوصف: ${chapter.workDescription}\n` +
        `عنوان الفصل: ${chapter.title}\n` +
        `المجلد: ${chapter.path}`
      );

      latestListEl.appendChild(item);
    });
  })
  .catch(err => {
    console.error("خطأ في تحميل بيانات المانجا:", err);
    worksListEl.innerHTML = "<p>فشل تحميل بيانات المانجا.</p>";
  });

function showChapters(work) {
  let chaptersHTML = `<h3>الفصول الخاصة بـ ${work.title}</h3><ul>`;
  (work.chapters || []).forEach(chap => {
    chaptersHTML += `<li>${chap.title} - ${new Date(chap.date).toLocaleDateString("ar-EG")}</li>`;
  });
  chaptersHTML += "</ul>";
  alert(chaptersHTML);
}
