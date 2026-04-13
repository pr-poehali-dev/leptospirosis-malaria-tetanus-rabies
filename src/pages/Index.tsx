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
    name: "Инфаркт миокарда",
    category: "Кардиология",
    stage: "Острое состояние",
    color: "#C0392B",
    stages: ["Ишемия", "Некроз", "Реперфузия", "Рубцевание"],
    description: "Гибель кардиомиоцитов вследствие длительной ишемии миокарда.",
    symptoms: ["Острая боль за грудиной", "Иррадиация в левую руку", "Холодный пот", "Одышка"],
    mechanism: "Разрыв атеросклеротической бляшки → тромбоз коронарной артерии → прекращение кровотока → некроз",
  },
  {
    id: 2,
    name: "Сахарный диабет II типа",
    category: "Эндокринология",
    stage: "Хроническое течение",
    color: "#2471A3",
    stages: ["Резистентность", "Компенсация", "Декомпенсация", "Осложнения"],
    description: "Хроническое нарушение обмена веществ с инсулинорезистентностью тканей.",
    symptoms: ["Полиурия", "Полидипсия", "Снижение зрения", "Онемение конечностей"],
    mechanism: "Инсулинорезистентность → гиперинсулинемия → истощение β-клеток → относительный дефицит инсулина",
  },
  {
    id: 3,
    name: "Бронхиальная астма",
    category: "Пульмонология",
    stage: "Хроническое воспаление",
    color: "#1E8449",
    stages: ["Триггер", "Спазм", "Воспаление", "Ремиссия"],
    description: "Хроническое воспалительное заболевание дыхательных путей с обратимой бронхообструкцией.",
    symptoms: ["Свистящее дыхание", "Приступы удушья", "Кашель ночью", "Одышка при нагрузке"],
    mechanism: "Аллерген/триггер → дегрануляция тучных клеток → бронхоспазм → воспаление слизистой",
  },
];

const GLOSSARY_TERMS = [
  { term: "Ишемия", definition: "Местное уменьшение кровоснабжения ткани вследствие сужения или закупорки артерии." },
  { term: "Некроз", definition: "Патологическая гибель клеток и тканей в живом организме под воздействием повреждающих факторов." },
  { term: "Гипоксия", definition: "Недостаточное обеспечение тканей кислородом или нарушение его утилизации." },
  { term: "Атеросклероз", definition: "Хроническое заболевание артерий с образованием липидных бляшек в их стенках." },
  { term: "Тромбоз", definition: "Прижизненное свёртывание крови в просвете сосуда с образованием тромба." },
  { term: "Воспаление", definition: "Защитная реакция организма на повреждение с классическими признаками: rubor, tumor, calor, dolor, functio laesa." },
  { term: "Инсулинорезистентность", definition: "Снижение чувствительности клеток к действию инсулина при нормальном или повышенном его уровне." },
  { term: "Бронхоспазм", definition: "Острое сужение просвета бронхов вследствие спазма гладкой мускулатуры их стенки." },
];

const TEST_QUESTIONS = [
  {
    id: 1,
    question: "Какой патогенетический механизм лежит в основе инфаркта миокарда?",
    options: [
      "Вирусное поражение миокарда",
      "Тромбоз коронарной артерии",
      "Воспаление перикарда",
      "Дефицит кальция",
    ],
    correct: 1,
    explanation: "Инфаркт миокарда в большинстве случаев развивается вследствие разрыва атеросклеротической бляшки с последующим тромбозом коронарной артерии.",
  },
  {
    id: 2,
    question: "Что такое инсулинорезистентность?",
    options: [
      "Полное отсутствие инсулина",
      "Аллергия на инсулин",
      "Снижение чувствительности клеток к инсулину",
      "Избыточная выработка инсулина",
    ],
    correct: 2,
    explanation: "Инсулинорезистентность — снижение ответа периферических тканей на действие инсулина при его нормальном или повышенном уровне.",
  },
  {
    id: 3,
    question: "Какая клетка является ключевой в патогенезе бронхиальной астмы?",
    options: [
      "Нейтрофил",
      "Тучная клетка",
      "Эритроцит",
      "Остеокласт",
    ],
    correct: 1,
    explanation: "Тучные клетки (мастоциты) при контакте с аллергеном дегранулируют, высвобождая медиаторы воспаления (гистамин, лейкотриены), вызывающие бронхоспазм.",
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
              className="text-center py-1.5 px-2 rounded text-xs font-mono transition-all duration-500"
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
            <div
              className="text-xs transition-all duration-500"
              style={{ color: i < activeStage ? color : "#ddd" }}
            >
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
        <span className="text-xs text-gray-400 font-mono">{disease.stage}</span>
      </div>
      <h3 className="font-cormorant text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-gray-700">
        {disease.name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">{disease.description}</p>
      <AnimatedProcess stages={disease.stages} color={disease.color} />
    </div>
  );
}

function DiseaseModal({ disease, onClose }: { disease: typeof DISEASES[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"symptoms" | "mechanism">("symptoms");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden" style={{ animation: "fadeInUp 0.25s ease" }}>
        <div className="px-8 py-6" style={{ borderBottom: `3px solid ${disease.color}` }}>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase mb-2 block" style={{ color: disease.color }}>
                {disease.category}
              </span>
              <h2 className="font-cormorant text-3xl font-semibold text-gray-900">{disease.name}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 mt-1 transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="px-8 pt-5 pb-8">
          <div className="flex gap-0 mb-6 border-b border-gray-100">
            {(["symptoms", "mechanism"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 text-sm font-mono transition-all duration-200 border-b-2 -mb-px"
                style={{
                  borderColor: tab === t ? disease.color : "transparent",
                  color: tab === t ? disease.color : "#999",
                }}
              >
                {t === "symptoms" ? "Симптомы" : "Механизм"}
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
    return (
      <div className="text-center py-16">
        <div className="font-cormorant text-8xl font-semibold text-gray-900 mb-2">
          {score}/{TEST_QUESTIONS.length}
        </div>
        <p className="text-gray-400 font-mono text-sm mb-8">
          {score === TEST_QUESTIONS.length ? "Отлично! Все ответы верны." : score >= 2 ? "Хороший результат." : "Нужно повторить материал."}
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
              className="w-10 h-1 rounded-full transition-all duration-300"
              style={{ background: i <= current ? "#1a1a2e" : "#e5e7eb" }}
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
              <span className="text-white text-xs font-mono font-bold">М</span>
            </div>
            <span className="font-cormorant text-lg font-semibold text-gray-900 tracking-tight">МедАтлас</span>
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

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
                  Образовательный портал · Медицина
                </span>
                <h1 className="font-cormorant text-6xl md:text-7xl font-semibold text-gray-900 leading-none mb-6">
                  Изучайте<br />
                  <em className="not-italic" style={{ color: "#C0392B" }}>патогенез</em><br />
                  заболеваний
                </h1>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                  Интерактивные схемы, анимированные механизмы развития болезней и системные тесты для глубокого понимания медицинских процессов.
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

              <div className="space-y-3">
                {DISEASES.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 p-4 rounded-sm border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-200 group"
                    onClick={() => { setSelectedDisease(d); setActiveSection("theory"); }}
                  >
                    <div className="w-2 h-12 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-cormorant text-lg font-semibold text-gray-800 group-hover:text-gray-900">{d.name}</div>
                      <div className="text-xs font-mono text-gray-400 mt-0.5">{d.category}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                ))}
                <div className="text-center pt-2">
                  <span className="text-xs font-mono text-gray-300">— 3 нозологии в базе —</span>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: "5", label: "Разделов" },
                { num: "3", label: "Нозологии" },
                { num: "8", label: "Терминов" },
                { num: "3", label: "Тестовых вопроса" },
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
              <p className="text-gray-500 mt-2 text-sm font-mono">Патогенез и клиническая картина заболеваний</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    Нажмите на карточку болезни, чтобы изучить подробный механизм развития и клинические симптомы. Анимации отображают последовательность патогенетических этапов в реальном времени.
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
              <p className="text-gray-500 mt-2 text-sm font-mono">Клинические разборы и диагностические задачи</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DISEASES.map((d, i) => (
                <div key={d.id} className="p-6 border border-gray-100 rounded-sm" style={{ borderLeft: `3px solid ${d.color}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs font-mono tracking-widest uppercase mb-1 block" style={{ color: d.color }}>
                        Клинический случай №{i + 1}
                      </span>
                      <h3 className="font-cormorant text-2xl font-semibold text-gray-900">{d.name}</h3>
                    </div>
                    <span className="text-xs font-mono text-gray-400 border border-gray-200 rounded px-2 py-1 flex-shrink-0 ml-2">
                      {d.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-mono leading-relaxed mb-4">
                    Пациент обращается с характерными жалобами. Проведите дифференциальную диагностику и определите план лечения на основе изученного патогенеза.
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

              <div className="p-6 border border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center text-center min-h-40">
                <Icon name="Plus" size={32} className="text-gray-300 mb-3" />
                <div className="font-cormorant text-xl font-semibold text-gray-400">Добавить случай</div>
                <p className="text-xs font-mono text-gray-300 mt-1">Новые клинические задачи скоро появятся</p>
              </div>
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
              <p className="text-gray-500 mt-2 text-sm font-mono">Проверьте знания по пройденному материалу</p>
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
              <p className="text-gray-500 mt-2 text-sm font-mono">Медицинские термины и определения</p>
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

            <div className="space-y-0 border border-gray-100 rounded-sm overflow-hidden">
              {filteredTerms.map((t, i) => (
                <div
                  key={t.term}
                  className="flex gap-6 p-5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-40 flex-shrink-0">
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
                <div className="p-10 text-center text-gray-400 font-mono text-sm">
                  Термин не найден
                </div>
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
              <span className="text-white text-xs font-mono font-bold">М</span>
            </div>
            <span className="font-cormorant text-base font-semibold text-gray-700">МедАтлас</span>
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
          <span className="text-xs font-mono text-gray-300">© 2026 МедАтлас</span>
        </div>
      </footer>

      {/* Disease Modal */}
      {selectedDisease && (
        <DiseaseModal disease={selectedDisease} onClose={() => setSelectedDisease(null)} />
      )}
    </div>
  );
}
