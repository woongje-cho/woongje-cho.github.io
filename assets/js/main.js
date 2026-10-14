// EN/KO toggle (English lives in the HTML; Korean swapped in by data-i18n key),
// image-slot auto-fill, and draggable hero stickers.
(function () {
  var KO = {
    "nav.research": "연구",
    "nav.projects": "프로젝트",
    "nav.leadership": "리더십",
    "nav.recruit": "채용 담당자용",
    "hero.hello": "안녕하세요, 조웅제입니다 👋",
    "hero.lead": "로봇과 주행 모델을 만들고, 그걸로 논문을 쓰고, 이제는 모빌리티가 다음에 무엇을 만들지 정하는 일을 하고 싶습니다.",
    "cta.email": "메일 보내기",
    "cta.recruit": "한 장 이력서",
    "plate.cap": "A1 챌린지 본선",
    "st.yax": "YAX 창립자",
    "st.jsa": "前 JSA 분대장",
    "hint": "스티커는 옮길 수 있어요",
    "about.title": "피트 스톱",
    "about.p1": "모델과 의사결정 사이의 문제를 좋아합니다. 어떤 데이터를 모을지, 어떤 위험이 중요한지, 어떤 기능이 만들 가치가 있는지. 이제 이 엔지니어링 현장 감각을 기술 전략과 상품 기획에 쓰고 싶습니다.",
    "num.1": "OntoPlan 목표 달성률 (SayPlan 0.30 대비)",
    "num.2": "1년 만에 YAX 인원 6명에서 17명으로",
    "num.3": "A1 챌린지 2026 본선 10팀 중 순위",
    "num.4": "풀러피 로봇, 팀장 겸 PM으로 15팀 중 순위",
    "route.1": "판문점 JSA 경비대대 분대장 겸 견학 안내 브리핑",
    "route.2": "MLCS 연구실 합류, LLM + PDDL 로봇 계획 연구",
    "route.3": "연세대 최초의 에이전틱·피지컬 AI 커뮤니티 YAX 창립",
    "route.4": "A1 챌린지 본선 6위, 엔드투엔드 주행 모델",
    "route.5": "OntoPlan, NeurIPS 2026 메인 트랙 채택",
    "research.title": "연구 노트",
    "research.sub": "연세대 MLCS 연구실(지도교수 최종은)에서 LLM 에이전트가 크고 복잡한 공간에서도 무너지지 않는 계획을 세우도록 구조화된 세계 지식을 주는 연구를 했습니다.",
    "paper1.desc": "온톨로지 지식그래프로 계획의 근거를 잡고 PDDL로 계획을 검증하는 멀티에이전트 LLM 프레임워크. SayPlan 0.30 대비 목표 달성률 0.79, 토큰은 약 12.7배 절감.",
    "paper1.role": "공저자. 담당: 에이전트 프롬프트 전략, few-shot 평가, 멀티턴·모호한 지시 처리, 3D 장면그래프 평가 환경.",
    "paper2.desc": "1저자 졸업 연구. 자율주행 딜레마 상황에서 온톨로지 지식그래프가 3D 장면그래프보다 LLM의 판단 품질을 높였습니다 (5점 척도, N=300, p<0.001).",
    "projects.title": "만든 것들",
    "projects.sub": "대회와 수업 프로젝트에서 가장 어려웠던 건 당일에 실제로 돌아가게 만드는 일이었습니다.",
    "a1.title": "A1 챌린지 2026",
    "a1.when": "카메라만으로 하는 엔드투엔드 레이싱, AI 오퍼레이터",
    "a1.desc": "수집할 데이터를 다시 정의했습니다. DAgger로 실패하기 쉬운 상황을 모으고, 직진 편향은 조향 가중 손실로, 상호작용은 무작위 상대 봇으로 채웠습니다. 파이프라인을 다시 짜서 추론 속도를 3배 이상 높였습니다.",
    "a1.result": "본선 10팀 중 6위",
    "phy.when": "Phy-AI 26 해커톤, 2026년 3월",
    "phy.desc": "5인 팀을 이끌고 26시간 안에 음성으로 움직이는 약국 조제 보조 로봇을 만들었습니다. <a href=\"https://github.com/woongje-cho/E0509_Hackathon\" target=\"_blank\" rel=\"noopener\">코드</a>",
    "phy.tag": "최우수상",
    "ful.when": "창의제품설계, 2026년 3~6월",
    "ful.desc": "팀장 겸 PM으로 반려식물 로봇 3대를 경쟁 제품 6종 비교부터 원가 상한 안의 완성품까지 이끌었습니다.",
    "ful.tag": "15팀 중 2위",
    "f1.title": "F1TENTH 레이싱카",
    "f1.when": "F1tenth Korea 2025, 2025년 5~11월",
    "f1.desc": "Jetson, LiDAR, ROS 2로 만든 1/10 레이싱카의 팀 리더 겸 하드웨어 총괄.",
    "f1.tag": "팀 리더",
    "hl.title": "HL FMA 자율주행 경진대회",
    "hl.when": "2025년 7~9월",
    "hl.desc": "GPS RTK 차량에서 차선·신호등 인식, 경로 추종, 자율주차를 통합한 시스템 리드.",
    "hl.tag": "장려상",
    "lead.title": "크루 치프",
    "lead.sub": "어려운 목표를 두고 사람을 모으는 일을 가장 좋아합니다.",
    "yax.title": "YAX 창립자 겸 회장",
    "yax.desc": "연세대 최초의 에이전틱·피지컬 AI 커뮤니티를 만들고 세 개 전공 6명에서 17명으로 키웠습니다. 학기마다 6주 부트캠프를 운영하고, 제안 발표로 대회별 지원금을 확보했으며, 전국 대회에 팀을 이끌고 나갔습니다.",
    "sch.title": "산학장학생",
    "sch.desc": "현대자동차가 후원하는 연세대 모빌리티시스템융합 과정의 1년 산학장학생. NeurIPS·KSAE 논문과 A1·Phy-AI 성과가 모두 이 기간에 나왔습니다.",
    "jsa.title": "JSA 분대장",
    "jsa.desc": "판문점에서 외국인을 포함한 방문단의 경호와 현장 브리핑을 맡았습니다. 병장 만기 전역.",
    "contact.title": "박스, 박스!",
    "contact.sub": "모빌리티 기술 전략, 상품 기획, 자율주행 직무에 관한 이야기라면 언제든 환영합니다. 커피는 제가 살게요.",
    "nav.results": "기록",
    "res.title": "레이스 결과",
    "res.sub": "지난 두 시즌의 라이브 타이밍.",
    "res.1": "논문 채택 (공저자)",
    "res.2": "최우수상",
    "res.3n": "창의제품설계 (풀러피)",
    "res.3": "15팀 중 2위",
    "res.4": "본선 10팀 중 6위",
    "res.5n": "연세대 성적우수상",
    "res.5": "2026년 1학기",
    "res.6": "장려상",
    "res.note": "보라색 = 최고 기록. KSAE 2026 1저자 논문은 춘계학술대회에서 발표했습니다.",
    "tyre.key": "소프트 = 기술, 미디엄 = 사람과 기획.",
    "radio.1": "웅제, 새로운 기회 열려 있어요?",
    "radio.2": "카피. 모빌리티 기술 전략, 상품 기획, 자율주행 모두 좋습니다. 커피는 제가 살게요.",
    "cert": "수상 증명서",
    "footer": "2026년 10월 업데이트."
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var EN = {};
  nodes.forEach(function (el) { EN[el.getAttribute("data-i18n")] = el.innerHTML; });
  var btn = document.querySelector(".lang-toggle");

  function apply(lang) {
    var dict = lang === "ko" ? KO : EN;
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key]; // static, author-written strings only
    });
    document.documentElement.lang = lang;
    if (btn) {
      btn.textContent = lang === "ko" ? "EN" : "KO";
      btn.setAttribute("aria-label", lang === "ko" ? "View in English" : "한국어로 보기");
    }
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var param = new URLSearchParams(location.search).get("lang");
  apply(param === "ko" || param === "en" ? param : saved === "ko" ? "ko" : "en");
  if (btn) btn.addEventListener("click", function () {
    apply(document.documentElement.lang === "ko" ? "en" : "ko");
  });

  // Fill an image slot when its file exists.
  document.querySelectorAll(".slot[data-src]").forEach(function (fig) {
    var img = new Image();
    img.alt = fig.getAttribute("aria-label") || "";
    img.onload = function () { fig.innerHTML = ""; fig.appendChild(img); fig.classList.add("filled"); };
    img.src = fig.getAttribute("data-src");
  });

  // Draggable stickers (desktop and touch).
  document.querySelectorAll(".sticker").forEach(function (el) {
    var sx, sy, ox, oy, dragging = false;
    el.addEventListener("pointerdown", function (e) {
      dragging = true; el.setPointerCapture(e.pointerId);
      sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop;
      el.style.right = "auto"; el.style.bottom = "auto";
      el.style.left = ox + "px"; el.style.top = oy + "px"; el.style.zIndex = 5;
    });
    el.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      el.style.left = ox + e.clientX - sx + "px";
      el.style.top = oy + e.clientY - sy + "px";
    });
    el.addEventListener("pointerup", function () { dragging = false; });
  });
})();
