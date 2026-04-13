import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "theory", label: "Теория" },
  { id: "practice", label: "Практика" },
  { id: "tests", label: "Тесты" },
  { id: "glossary", label: "Глоссарий" },
];

const DISEASES = [
  {
    id: 1,
    name: "Лептоспироз",
    category: "Бактериальная инфекция",
    pathogen: "Leptospira interrogans",
    stage: "Зоонозная инфекция",
    color: "#B7950B",
    stages: ["Заражение", "Лептоспиремия", "Органные поражения", "Исход"],
    description: "Острое инфекционное зоонозное заболевание с поражением почек, печени и нервной системы.",
    transmission: "Контакт с водой или почвой, заражёнными мочой инфицированных животных (грызуны, крупный рогатый скот).",
    symptoms: [
      "Острая лихорадка 39–40°C",
      "Сильная миалгия (особенно икроножных мышц)",
      "Желтуха (иктерическая форма)",
      "Геморрагический синдром",
      "Острая почечная недостаточность",
      "Конъюнктивит, светобоязнь",
    ],
    mechanism: "Проникновение через кожу/слизистые → лептоспиремия (1–2 нед.) → фиксация в органах → иммунная фаза → поражение почек, печени, ЦНС",
    prevention: "Вакцинация, защитная одежда при контакте с водоёмами, дератизация.",
  },
  {
    id: 2,
    name: "Малярия",
    category: "Протозойная инфекция",
    pathogen: "Plasmodium (P. falciparum, vivax, malariae, ovale)",
    stage: "Трансмиссивная инфекция",
    color: "#1A5276",
    stages: ["Укус комара", "Экзоэритроцитарный цикл", "Эритроцитарный цикл", "Пароксизм"],
    description: "Протозойное трансмиссивное заболевание, передающееся через укусы комаров рода Anopheles.",
    transmission: "Укус инфицированного комара рода Anopheles; реже — трансфузионный и вертикальный пути.",
    symptoms: [
      "Характерные лихорадочные пароксизмы (озноб → жар → пот)",
      "Гепатоспленомегалия",
      "Гемолитическая анемия",
      "Головная боль, миалгии",
      "При P. falciparum — церебральная малярия",
      "Тромбоцитопения",
    ],
    mechanism: "Спорозоит → гепатоциты (шизогония) → мерозоиты → эритроциты → разрушение эритроцитов → пироген + анемия → пароксизм каждые 48–72 ч",
    prevention: "Химиопрофилактика, репелленты, надкроватные сетки, уничтожение мест размножения комаров.",
  },
  {
    id: 3,
    name: "Столбняк",
    category: "Бактериальная инфекция",
    pathogen: "Clostridium tetani",
    stage: "Раневая инфекция",
    color: "#6E2F1A",
    stages: ["Заражение раны", "Выработка токсина", "Блокада ЦНС", "Судороги"],
    description: "Острое инфекционное заболевание с поражением нервной системы и генерализованными судорогами, вызванное экзотоксином C. tetani.",
    transmission: "Споры C. tetani проникают через повреждённую кожу (раны, ожоги, занозы); анаэробные условия необходимы для размножения.",
    symptoms: [
      "Тризм жевательных мышц",
      "Дисфагия",
      "Опистотонус (дугообразное выгибание тела)",
      "Генерализованные тонические судороги",
      "Спазм дыхательной мускулатуры",
      "Сохранение сознания во время судорог",
    ],
    mechanism: "C. tetani в ране → тетаноспазмин → ретроградный транспорт по нейронам → блокада ингибиторных синапсов Реншоу → спастический паралич",
    prevention: "Активная иммунизация АДС-М; экстренная профилактика при ранениях (противостолбнячная сыворотка + анатоксин).",
  },
  {
    id: 4,
    name: "Бешенство",
    category: "Вирусная инфекция",
    pathogen: "Rabies lyssavirus",
    stage: "Зоонозная инфекция",
    color: "#4A235A",
    stages: ["Укус животного", "Репликация в мышцах", "Проникновение в ЦНС", "Энцефалит"],
    description: "Острое вирусное зоонозное заболевание с абсолютно летальным исходом при развитии клиники, передаётся через слюну больных животных.",
    transmission: "Укус или ослюнение повреждённой кожи инфицированным животным (лисы, волки, летучие мыши, собаки, кошки).",
    symptoms: [
      "Продромальный период: боль/зуд в месте укуса",
      "Гидрофобия (спазм глотки при виде воды)",
      "Аэрофобия",
      "Психомоторное возбуждение",
      "Галлюцинации, агрессия",
      "Паралитическая стадия → кома → смерть",
    ],
    mechanism: "Вирус в слюне → мышечные клетки → репликация → нейромышечный синапс → ретроградный аксональный транспорт → ствол мозга → энцефалит",
    prevention: "Вакцинация после укуса (PEP), вакцинация групп риска, контроль популяций животных.",
  },
];

const GLOSSARY_TERMS = [
  { term: "Зооноз", definition: "Инфекционное заболевание, передающееся от животных к человеку естественным путём." },
  { term: "Лептоспиремия", definition: "Фаза лептоспироза, при которой возбудитель циркулирует в крови, обусловливая острый период заболевания." },
  { term: "Пароксизм", definition: "Внезапно возникающий и исчезающий приступ (например, лихорадочный при малярии): стадии — озноб, жар, потоотделение." },
  { term: "Тетаноспазмин", definition: "Нейротоксин Clostridium tetani, блокирующий ингибиторные синапсы спинного мозга и вызывающий генерализованный спазм мышц." },
  { term: "Тризм", definition: "Тонический спазм жевательных мышц с ограничением открывания рта; ранний и характерный признак столбняка." },
  { term: "Опистотонус", definition: "Вынужденное положение тела в виде дуги с запрокинутой головой вследствие тонического спазма разгибателей спины." },
  { term: "Гидрофобия", definition: "Патологический страх воды с рефлекторным спазмом глотки и гортани при её виде или упоминании; патогномоничный симптом бешенства." },
  { term: "Шизогония", definition: "Бесполое множественное деление плазмодия в клетках хозяина (гепатоцитах, эритроцитах) с высвобождением мерозоитов." },
  { term: "Мерозоит", definition: "Инвазивная стадия плазмодия, выходящая из разрушенных клеток и способная заражать новые эритроциты." },
  { term: "Анаэроб", definition: "Микроорганизм, способный жить и размножаться в отсутствие молекулярного кислорода (C. tetani — облигатный анаэроб)." },
  { term: "PEP", definition: "Постэкспозиционная профилактика — комплекс мероприятий после контакта с источником инфекции; критична при бешенстве." },
  { term: "Геморрагический синдром", definition: "Патологическая кровоточивость вследствие поражения сосудистой стенки, тромбоцитопении или нарушения коагуляции; характерна для тяжёлого лептоспироза." },
];

const TEST_QUESTIONS = [
  {
    id: 1,
    question: "Каков основной путь передачи лептоспироза?",
    options: [
      "Воздушно-капельный",
      "Контакт с водой/почвой, заражёнными мочой грызунов",
      "Укус комара",
      "Фекально-оральный",
    ],
    correct: 1,
    explanation: "Лептоспиры выделяются с мочой инфицированных животных. Заражение происходит при контакте повреждённой кожи или слизистых с заражённой водой или почвой.",
  },
  {
    id: 2,
    question: "Что происходит в эритроцитарном цикле при малярии?",
    options: [
      "Размножение плазмодия в клетках печени",
      "Размножение плазмодия в эритроцитах с их последующим разрушением",
      "Половое размножение в кишечнике комара",
      "Формирование спорозоитов",
    ],
    correct: 1,
    explanation: "В эритроцитарном цикле мерозоиты проникают в эритроциты, размножаются путём шизогонии и разрушают клетку. Высвобождение мерозоитов и пирогенов вызывает характерный лихорадочный пароксизм.",
  },
  {
    id: 3,
    question: "Каков механизм действия тетаноспазмина?",
    options: [
      "Активация двигательных нейронов",
      "Блокада ингибиторных синапсов → неконтролируемое возбуждение мотонейронов",
      "Прямое разрушение мышечных волокон",
      "Нарушение нейромышечной передачи по типу ботулотоксина",
    ],
    correct: 1,
    explanation: "Тетаноспазмин блокирует высвобождение глицина и ГАМК в ингибиторных интернейронах Реншоу. В результате мотонейроны непрерывно возбуждаются — возникают тонические судороги.",
  },
  {
    id: 4,
    question: "Какой симптом патогномоничен для бешенства?",
    options: [
      "Желтуха",
      "Тризм",
      "Гидрофобия",
      "Пароксизмальная лихорадка",
    ],
    correct: 2,
    explanation: "Гидрофобия — рефлекторный спазм мышц глотки и гортани при виде воды — патогномоничный симптом бешенства, обусловленный поражением ствола мозга.",
  },
  {
    id: 5,
    question: "Какой вид плазмодия вызывает наиболее тяжёлую малярию с риском церебральных осложнений?",
    options: [
      "Plasmodium vivax",
      "Plasmodium malariae",
      "Plasmodium falciparum",
      "Plasmodium ovale",
    ],
    correct: 2,
    explanation: "P. falciparum вызывает тропическую малярию. Поражённые эритроциты экспрессируют белки, вызывающие их адгезию к стенке сосудов мозга, что приводит к церебральной малярии.",
  },
  {
    id: 6,
    question: "Какое условие необходимо для размножения Clostridium tetani в ране?",
    options: [
      "Наличие кислорода",
      "Влажная поверхность",
      "Анаэробная (бескислородная) среда",
      "Щелочная pH среды",
    ],
    correct: 2,
    explanation: "C. tetani — облигатный анаэроб: размножается только без молекулярного кислорода. Глубокие колотые раны, ожоги с некрозом создают необходимую анаэробную среду.",
  },
];

function AnimatedProcess({ stages, color }: { stages: string[]; color: string }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="flex items-center gap-1 mt-3">
      {stages.map((stage, i) => (
        <div key={i} className="flex items-center gap-1 flex-1">
          <div className="flex-1">
            <div
              className="text-center py-1.5 px-1 rounded text-xs font-mono transition-all duration-500"
              style={{
                background: i === activeStage ? color : "transparent",
                color: i === activeStage ? "#fff" : "#999",
                border: `1px solid ${i <= activeStage ? color : "#e0e0e0"}`,
                transform: i === activeStage ? "scale(1.05)" : "scale(1)",
              }}
            >
              {stage}
            </div>
          </div>
          {i < stages.length - 1 && (
            <div className="text-xs transition-all duration-500" style={{ color: i < activeStage ? color : "#ddd" }}>
              →
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DiseaseCard({ disease, onClick }: { disease: typeof DISEASES[0]; onClick: () => void }) {
  return (
    <div
      className="cursor-pointer p-6 rounded-sm border border-gray-100 hover:border-gray-300 transition-all duration-300 group"
      onClick={onClick}
      style={{ borderLeft: `3px solid ${disease.color}` }}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: disease.color }}>
          {disease.category}
        </span>
      </div>
      <h3 className="font-cormorant text-xl font-semibold text-gray-900 mt-1 mb-0.5 group-hover:text-gray-700">
        {disease.name}
      </h3>
      <p className="text-xs font-mono text-gray-400 italic mb-2">{disease.pathogen}</p>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">{disease.description}</p>
      <AnimatedProcess stages={disease.stages} color={disease.color} />
    </div>
  );
}

function DiseaseModal({ disease, onClose }: { disease: typeof DISEASES[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"symptoms" | "mechanism" | "prevention">("symptoms");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,10,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden" style={{ animation: "fadeInUp 0.25s ease" }}>
        <div className="px-8 py-6" style={{ borderBottom: `3px solid ${disease.color}` }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase mb-1 block" style={{ color: disease.color }}>
                {disease.category}
              </span>
              <h2 className="font-cormorant text-3xl font-semibold text-gray-900">{disease.name}</h2>
              <p className="text-xs font-mono text-gray-400 italic mt-1">{disease.pathogen}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 mt-1 transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-xs font-mono text-gray-500 mt-3">
            <span className="text-gray-400">Передача: </span>{disease.transmission}
          </p>
        </div>

        <div className="px-8 pt-5 pb-8">
          <div className="flex gap-0 mb-6 border-b border-gray-100">
            {(["symptoms", "mechanism", "prevention"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 text-sm font-mono transition-all duration-200 border-b-2 -mb-px"
                style={{
                  borderColor: tab === t ? disease.color : "transparent",
                  color: tab === t ? disease.color : "#999",
                }}
              >
                {t === "symptoms" ? "Симптомы" : t === "mechanism" ? "Патогенез" : "Профилактика"}
              </button>
            ))}
          </div>

          {tab === "symptoms" && (
            <ul className="space-y-2">
              {disease.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5 flex-shrink-0"
                    style={{ background: disease.color }}
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          )}

          {tab === "mechanism" && (
            <div>
              <p className="text-sm text-gray-600 leading-relaxed font-mono bg-gray-50 rounded p-4 mb-2">
                {disease.mechanism}
              </p>
              <AnimatedProcess stages={disease.stages} color={disease.color} />
            </div>
          )}

          {tab === "prevention" && (
            <div className="p-4 rounded bg-gray-50 border border-gray-100">
              <p className="text-sm text-gray-600 font-mono leading-relaxed">{disease.prevention}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = TEST_QUESTIONS[current];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < TEST_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / TEST_QUESTIONS.length) * 100);
    return (
      <div className="text-center py-16">
        <div className="font-cormorant text-8xl font-semibold text-gray-900 mb-2">
          {score}/{TEST_QUESTIONS.length}
        </div>
        <div className="text-xs font-mono text-gray-400 mb-2">{pct}% правильных ответов</div>
        <p className="text-gray-400 font-mono text-sm mb-8">
          {pct === 100 ? "Отличный результат — материал освоен!" : pct >= 67 ? "Хороший результат. Повторите слабые темы." : "Рекомендуем вернуться к теоретическому разделу."}
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-2.5 text-sm font-mono text-white rounded-sm transition-all duration-200 hover:opacity-80"
          style={{ background: "#1a1a2e" }}
        >
          Пройти снова
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-mono text-gray-400 tracking-widest">
          ВОПРОС {current + 1} / {TEST_QUESTIONS.length}
        </span>
        <div className="flex gap-1.5">
          {TEST_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="w-6 h-1 rounded-full transition-all duration-300"
              style={{ background: i < current ? "#4ade80" : i === current ? "#1a1a2e" : "#e5e7eb" }}
            />
          ))}
        </div>
      </div>

      <h3 className="font-cormorant text-2xl font-semibold text-gray-900 mb-6 leading-snug">
        {q.question}
      </h3>

      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => {
          let borderCol = "#e5e7eb";
          let bg = "#fff";
          let textCol = "#374151";
          if (answered) {
            if (i === q.correct) { bg = "#f0fdf4"; borderCol = "#4ade80"; textCol = "#166534"; }
            else if (i === selected && i !== q.correct) { bg = "#fef2f2"; borderCol = "#f87171"; textCol = "#991b1b"; }
            else { bg = "#fafafa"; borderCol = "#f3f4f6"; textCol = "#9ca3af"; }
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left px-5 py-3.5 rounded-sm border transition-all duration-200 text-sm font-mono"
              style={{ background: bg, borderColor: borderCol, color: textCol }}
            >
              <span className="text-gray-300 mr-3">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-sm">
          <p className="text-sm text-blue-800 font-mono leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="px-6 py-2.5 text-sm font-mono text-white rounded-sm transition-all duration-200 hover:opacity-80"
          style={{ background: "#1a1a2e" }}
        >
          {current < TEST_QUESTIONS.length - 1 ? "Следующий вопрос →" : "Завершить тест"}
        </button>
      )}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedDisease, setSelectedDisease] = useState<typeof DISEASES[0] | null>(null);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filteredTerms = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-ibm">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
          borderBottom: "1px solid #f0f0f0",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: "#1a1a2e" }}>
              <span className="text-white text-xs font-mono font-bold">И</span>
            </div>
            <span className="font-cormorant text-lg font-semibold text-gray-900 tracking-tight">ИнфектоАтлас</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="px-4 py-2 text-sm font-mono transition-all duration-200 rounded-sm"
                style={{
                  color: activeSection === item.id ? "#1a1a2e" : "#888",
                  background: activeSection === item.id ? "#f4f4f4" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2.5 text-sm font-mono hover:text-gray-900 transition-colors"
                style={{ color: activeSection === item.id ? "#1a1a2e" : "#888" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Home */}
      {activeSection === "home" && (
        <section className="min-h-screen flex flex-col justify-center pt-16">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-4 block">
                  Образовательный портал · Инфектология
                </span>
                <h1 className="font-cormorant text-6xl md:text-7xl font-semibold text-gray-900 leading-none mb-6">
                  Изучайте<br />
                  <em className="not-italic" style={{ color: "#1A5276" }}>инфекционные</em><br />
                  заболевания
                </h1>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                  Интерактивные схемы патогенеза, клиническая картина и профилактика лептоспироза, малярии, столбняка и бешенства.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSection("theory")}
                    className="px-6 py-3 text-sm font-mono text-white rounded-sm transition-all duration-200 hover:opacity-80"
                    style={{ background: "#1a1a2e" }}
                  >
                    Начать обучение
                  </button>
                  <button
                    onClick={() => setActiveSection("tests")}
                    className="px-6 py-3 text-sm font-mono text-gray-700 rounded-sm border border-gray-200 hover:border-gray-400 transition-all duration-200"
                  >
                    Пройти тест
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {DISEASES.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 p-4 rounded-sm border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-200 group"
                    onClick={() => { setSelectedDisease(d); setActiveSection("theory"); }}
                  >
                    <div className="w-2 h-10 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-cormorant text-lg font-semibold text-gray-800 group-hover:text-gray-900">{d.name}</div>
                      <div className="text-xs font-mono text-gray-400 mt-0.5 italic">{d.pathogen}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "4", label: "Нозологии" },
                { num: "6", label: "Тестовых вопросов" },
                { num: "12", label: "Терминов" },
                { num: "3", label: "Вкладки на тему" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-cormorant text-4xl font-semibold text-gray-900">{s.num}</div>
                  <div className="text-xs font-mono text-gray-400 mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Theory */}
      {activeSection === "theory" && (
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2 block">Раздел 01</span>
              <h2 className="font-cormorant text-5xl font-semibold text-gray-900">Теория</h2>
              <p className="text-gray-500 mt-2 text-sm font-mono">Патогенез, клиника и профилактика инфекционных заболеваний</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DISEASES.map((d) => (
                <DiseaseCard key={d.id} disease={d} onClick={() => setSelectedDisease(d)} />
              ))}
            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "#1a1a2e" }}>
                  <Icon name="Info" size={14} className="text-white" />
                </div>
                <div>
                  <div className="font-cormorant text-xl font-semibold text-gray-900 mb-1">Как пользоваться разделом</div>
                  <p className="text-sm text-gray-500 font-mono leading-relaxed">
                    Нажмите на карточку заболевания, чтобы открыть подробное описание. Три вкладки: симптомы, патогенез с анимацией стадий и меры профилактики.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Practice */}
      {activeSection === "practice" && (
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2 block">Раздел 02</span>
              <h2 className="font-cormorant text-5xl font-semibold text-gray-900">Практика</h2>
              <p className="text-gray-500 mt-2 text-sm font-mono">Клинические разборы и дифференциальная диагностика</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISEASES.map((d, i) => (
                <div key={d.id} className="p-6 border border-gray-100 rounded-sm" style={{ borderLeft: `3px solid ${d.color}` }}>
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-mono tracking-widest uppercase mb-1 block" style={{ color: d.color }}>
                        Клинический случай №{i + 1}
                      </span>
                      <h3 className="font-cormorant text-2xl font-semibold text-gray-900">{d.name}</h3>
                      <p className="text-xs font-mono text-gray-400 italic mt-0.5">{d.pathogen}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-400 border border-gray-200 rounded px-2 py-1 flex-shrink-0">
                      {d.stage}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-mono leading-relaxed mb-4">
                    Пациент поступает с характерными жалобами после контакта с возможным источником инфекции. Проведите дифференциальную диагностику и обоснуйте лечебную тактику.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {d.symptoms.slice(0, 2).map((s, si) => (
                      <span key={si} className="text-xs font-mono px-2.5 py-1 rounded bg-gray-50 text-gray-500 border border-gray-100">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    className="text-sm font-mono flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5"
                    style={{ color: d.color }}
                    onClick={() => { setSelectedDisease(d); setActiveSection("theory"); }}
                  >
                    Изучить теорию <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tests */}
      {activeSection === "tests" && (
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-10">
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2 block">Раздел 03</span>
              <h2 className="font-cormorant text-5xl font-semibold text-gray-900">Тесты</h2>
              <p className="text-gray-500 mt-2 text-sm font-mono">6 вопросов по всем четырём нозологиям</p>
            </div>
            <TestSection />
          </div>
        </section>
      )}

      {/* Glossary */}
      {activeSection === "glossary" && (
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2 block">Раздел 04</span>
              <h2 className="font-cormorant text-5xl font-semibold text-gray-900">Глоссарий</h2>
              <p className="text-gray-500 mt-2 text-sm font-mono">Ключевые термины инфектологии</p>
            </div>

            <div className="relative mb-8 max-w-md">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск термина..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm font-mono border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
              />
            </div>

            <div className="border border-gray-100 rounded-sm overflow-hidden">
              {filteredTerms.map((t, i) => (
                <div
                  key={t.term}
                  className="flex gap-6 p-5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-48 flex-shrink-0">
                    <div className="font-cormorant text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                      {t.term}
                    </div>
                    <div className="text-xs font-mono text-gray-300 mt-0.5">#{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="text-sm text-gray-500 font-mono leading-relaxed pt-0.5">
                    {t.definition}
                  </div>
                </div>
              ))}
              {filteredTerms.length === 0 && (
                <div className="p-10 text-center text-gray-400 font-mono text-sm">Термин не найден</div>
              )}
            </div>

            <p className="text-xs font-mono text-gray-300 mt-4 text-center">
              {filteredTerms.length} из {GLOSSARY_TERMS.length} терминов
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: "#1a1a2e" }}>
              <span className="text-white text-xs font-mono font-bold">И</span>
            </div>
            <span className="font-cormorant text-base font-semibold text-gray-700">ИнфектоАтлас</span>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="text-xs font-mono text-gray-400 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-gray-300">© 2026 ИнфектоАтлас</span>
        </div>
      </footer>

      {selectedDisease && (
        <DiseaseModal disease={selectedDisease} onClose={() => setSelectedDisease(null)} />
      )}
    </div>
  );
}
