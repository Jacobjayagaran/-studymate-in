'use client';
import { useState, useRef, useEffect } from 'react';

// ── ACCURATE CURRICULUM (Matches actual textbooks) ─────────────────────────
const BOARDS = {
  'TN-10-Tamil': {
    label: 'TN 10th Tamil Medium',
    subjects: {
      'தமிழ்': [
        'இயல் 1 - கல்வி அமுதம் (உரைநடை, கவிதை, இலக்கணம்)',
        'இயல் 2 - நீதி வெண்பா (புறநானூறு, திருக்குறள்)',
        'இயல் 3 - தமிழ் இலக்கிய வரலாறு',
        'இயல் 4 - சங்க இலக்கியம்',
        'இயல் 5 - காப்பிய இலக்கியம்',
        'இயல் 6 - நவீன இலக்கியம்',
      ],
      'English': [
        'Unit 1 - His First Flight (Liam O\'Flaherty)',
        'Unit 2 - The Night the Ghost Got In (James Thurber)',
        'Unit 3 - Empowered Women Navigating the World',
        'Unit 4 - The Attic',
        'Unit 5 - Tech Bloomers',
        'Unit 6 - The Last Lesson (Alphonse Daudet)',
        'Unit 7 - The Dying Detective (Arthur Conan Doyle)',
      ],
      'கணிதம்': [
        'அலகு 1 - உறவுகளும் சார்புகளும்',
        'அலகு 2 - எண்களும் தொடர்வரிசைகளும்',
        'அலகு 3 - இயற்கணிதம்',
        'அலகு 4 - வடிவியல்',
        'அலகு 5 - ஆயத்தொலை வடிவியல்',
        'அலகு 6 - முக்கோணவியல்',
        'அலகு 7 - அளவையியல்',
        'அலகு 8 - புள்ளியியல் மற்றும் நிகழ்தகவு',
      ],
      'அறிவியல்': [
        'அலகு 1 - இயக்க விதிகள்',
        'அலகு 2 - ஒளியியல்',
        'அலகு 3 - வெப்ப இயற்பியல்',
        'அலகு 4 - மின்னியல்',
        'அலகு 5 - அணு மற்றும் அணுக்கரு இயற்பியல்',
        'அலகு 6 - தனிமங்களின் ஆவர்த்தன வரிசை',
        'அலகு 7 - வேதிப் பிணைப்பு',
        'அலகு 8 - வேதி வினைகளின் வகைகள்',
        'அலகு 9 - தாவரவியல் - தாவர உலகம்',
        'அலகு 10 - விலங்கியல் - விலங்கு உலகம்',
        'அலகு 11 - மனித உடலமைப்பு',
        'அலகு 12 - தாவர மற்றும் விலங்கு ஹார்மோன்கள்',
        'அலகு 13 - நோய்களும் மருந்துகளும்',
        'அலகு 14 - சுற்றுச்சூழல் மேலாண்மை',
        'அலகு 15 - மரபியல்',
        'அலகு 16 - தாவர இனப்பெருக்கம்',
        'அலகு 17 - மரபுப் பண்புகளும் தொழில்நுட்பமும்',
        'அலகு 18 - தகவல் தொடர்பு',
      ],
      'சமூக அறிவியல்': [
        'வரலாறு 1 - இந்தியாவின் மனித பரிணாம வளர்ச்சி',
        'வரலாறு 2 - தொல்லியல் ஆய்வுகளும் ஆதாரங்களும்',
        'வரலாறு 3 - மெசொப்பொத்தேமியா நாகரிகம்',
        'வரலாறு 4 - ஆரம்பகால தமிழகம்',
        'வரலாறு 5 - கர்நாடக மாநில ஆட்சி',
        'வரலாறு 6 - இஸ்லாமிய உலகமும் மத்திய கால ஐரோப்பாவும்',
        'வரலாறு 7 - தமிழக வரலாறும் பண்பாடும்',
        'வரலாறு 8 - காலனிய ஆட்சியும் தேசியத்தின் தோற்றமும்',
        'புவியியல் 1 - இந்தியா - இடம் நிலம் அமைப்பு',
        'புவியியல் 2 - வளிமண்டலம்',
        'புவியியல் 3 - நீரியல்',
        'புவியியல் 4 - நிலப்பரப்பியல் கூறுகள்',
        'குடிமையியல் 1 - இந்திய அரசியலமைப்பு',
        'குடிமையியல் 2 - மத்திய அரசு',
        'குடிமையியல் 3 - மாநில அரசு',
        'பொருளியல் 1 - பொருளியல் அறிமுகம்',
      ],
    }
  },
  'TN-10-English': {
    label: 'TN 10th English Medium',
    subjects: {
      'English': [
        'Unit 1 - His First Flight (Liam O\'Flaherty)',
        'Unit 2 - The Night the Ghost Got In (James Thurber)',
        'Unit 3 - Empowered Women Navigating the World',
        'Unit 4 - The Attic',
        'Unit 5 - Tech Bloomers',
        'Unit 6 - The Last Lesson (Alphonse Daudet)',
        'Unit 7 - The Dying Detective (Arthur Conan Doyle)',
      ],
      'Mathematics': [
        'Chapter 1 - Relations and Functions',
        'Chapter 2 - Numbers and Sequences',
        'Chapter 3 - Algebra',
        'Chapter 4 - Geometry',
        'Chapter 5 - Coordinate Geometry',
        'Chapter 6 - Trigonometry',
        'Chapter 7 - Mensuration',
        'Chapter 8 - Statistics and Probability',
      ],
      'Science': [
        'Chapter 1 - Laws of Motion',
        'Chapter 2 - Optics',
        'Chapter 3 - Thermal Physics',
        'Chapter 4 - Electricity',
        'Chapter 5 - Acoustics',
        'Chapter 6 - Nuclear Physics',
        'Chapter 7 - Atoms and Molecules',
        'Chapter 8 - Periodic Classification of Elements',
        'Chapter 9 - Solutions',
        'Chapter 10 - Types of Chemical Reactions',
        'Chapter 11 - Carbon and its Compounds',
        'Chapter 12 - Plant Kingdom',
        'Chapter 13 - Animal Kingdom',
        'Chapter 14 - Organisation of Life',
        'Chapter 15 - Nervous System',
        'Chapter 16 - Plant and Animal Hormones',
        'Chapter 17 - Reproduction in Plants',
        'Chapter 18 - Heredity',
      ],
      'Social Science': [
        'History 1 - Early Humans and Society',
        'History 2 - Ancient Civilizations',
        'History 3 - Early Tamil Society',
        'History 4 - Medieval India',
        'History 5 - Social and Religious Reform Movements',
        'History 6 - Colonialism in India',
        'History 7 - Independence Movement',
        'Geography 1 - India - Location Relief and Drainage',
        'Geography 2 - Atmosphere',
        'Geography 3 - Hydrosphere',
        'Civics 1 - Indian Constitution',
        'Civics 2 - Central Government',
        'Economics 1 - Introduction to Economics',
      ],
    }
  },
  'CBSE-10': {
    label: 'CBSE 10th',
    subjects: {
      'English': [
        'Chapter 1 - A Triumph of Surgery',
        'Chapter 2 - The Thief\'s Story',
        'Chapter 3 - The Midnight Visitor',
        'Chapter 4 - A Question of Trust',
        'Chapter 5 - Footprints Without Feet',
        'Chapter 6 - The Making of a Scientist',
        'Chapter 7 - The Necklace',
        'Chapter 8 - The Hack Driver',
        'Chapter 9 - Bholi',
        'Chapter 10 - The Book that Saved the Earth',
      ],
      'Mathematics': [
        'Chapter 1 - Real Numbers',
        'Chapter 2 - Polynomials',
        'Chapter 3 - Pair of Linear Equations in Two Variables',
        'Chapter 4 - Quadratic Equations',
        'Chapter 5 - Arithmetic Progressions',
        'Chapter 6 - Triangles',
        'Chapter 7 - Coordinate Geometry',
        'Chapter 8 - Introduction to Trigonometry',
        'Chapter 9 - Some Applications of Trigonometry',
        'Chapter 10 - Circles',
        'Chapter 11 - Areas Related to Circles',
        'Chapter 12 - Surface Areas and Volumes',
        'Chapter 13 - Statistics',
        'Chapter 14 - Probability',
      ],
      'Science': [
        'Chapter 1 - Chemical Reactions and Equations',
        'Chapter 2 - Acids, Bases and Salts',
        'Chapter 3 - Metals and Non-metals',
        'Chapter 4 - Carbon and its Compounds',
        'Chapter 5 - Periodic Classification of Elements',
        'Chapter 6 - Life Processes',
        'Chapter 7 - Control and Coordination',
        'Chapter 8 - How do Organisms Reproduce?',
        'Chapter 9 - Heredity and Evolution',
        'Chapter 10 - Light - Reflection and Refraction',
        'Chapter 11 - Human Eye and the Colourful World',
        'Chapter 12 - Electricity',
        'Chapter 13 - Magnetic Effects of Electric Current',
        'Chapter 14 - Sources of Energy',
        'Chapter 15 - Our Environment',
        'Chapter 16 - Sustainable Management of Natural Resources',
      ],
      'Social Science': [
        'History 1 - The Rise of Nationalism in Europe',
        'History 2 - Nationalism in India',
        'History 3 - The Making of a Global World',
        'History 4 - The Age of Industrialisation',
        'History 5 - Print Culture and the Modern World',
        'Geography 1 - Resources and Development',
        'Geography 2 - Forest and Wildlife Resources',
        'Geography 3 - Water Resources',
        'Geography 4 - Agriculture',
        'Geography 5 - Minerals and Energy Resources',
        'Geography 6 - Manufacturing Industries',
        'Geography 7 - Lifelines of National Economy',
        'Civics 1 - Power Sharing',
        'Civics 2 - Federalism',
        'Economics 1 - Development',
        'Economics 2 - Sectors of the Indian Economy',
      ],
      'Hindi': [
        'Chapter 1 - सूरदास - पद',
        'Chapter 2 - तुलसीदास - राम-लक्ष्मण-परशुराम संवाद',
        'Chapter 3 - देव - सवैया और कवित्त',
        'Chapter 4 - जयशंकर प्रसाद - आत्मकथ्य',
        'Chapter 5 - सूर्यकांत त्रिपाठी निराला - उत्साह और अट नहीं रही',
      ],
    }
  },
  'CBSE-12': {
    label: 'CBSE 12th',
    subjects: {
      'Physics': [
        'Chapter 1 - Electric Charges and Fields',
        'Chapter 2 - Electrostatic Potential and Capacitance',
        'Chapter 3 - Current Electricity',
        'Chapter 4 - Moving Charges and Magnetism',
        'Chapter 5 - Magnetism and Matter',
        'Chapter 6 - Electromagnetic Induction',
        'Chapter 7 - Alternating Current',
        'Chapter 8 - Electromagnetic Waves',
        'Chapter 9 - Ray Optics and Optical Instruments',
        'Chapter 10 - Wave Optics',
        'Chapter 11 - Dual Nature of Radiation and Matter',
        'Chapter 12 - Atoms',
        'Chapter 13 - Nuclei',
        'Chapter 14 - Semiconductor Electronics',
      ],
      'Chemistry': [
        'Chapter 1 - The Solid State',
        'Chapter 2 - Solutions',
        'Chapter 3 - Electrochemistry',
        'Chapter 4 - Chemical Kinetics',
        'Chapter 5 - Surface Chemistry',
        'Chapter 6 - General Principles of Isolation of Elements',
        'Chapter 7 - The p-Block Elements',
        'Chapter 8 - The d and f Block Elements',
        'Chapter 9 - Coordination Compounds',
        'Chapter 10 - Haloalkanes and Haloarenes',
        'Chapter 11 - Alcohols, Phenols and Ethers',
        'Chapter 12 - Aldehydes, Ketones and Carboxylic Acids',
        'Chapter 13 - Amines',
        'Chapter 14 - Biomolecules',
      ],
      'Biology': [
        'Chapter 1 - Reproduction in Organisms',
        'Chapter 2 - Sexual Reproduction in Flowering Plants',
        'Chapter 3 - Human Reproduction',
        'Chapter 4 - Reproductive Health',
        'Chapter 5 - Principles of Inheritance and Variation',
        'Chapter 6 - Molecular Basis of Inheritance',
        'Chapter 7 - Evolution',
        'Chapter 8 - Human Health and Disease',
        'Chapter 9 - Strategies for Enhancement in Food Production',
        'Chapter 10 - Microbes in Human Welfare',
        'Chapter 11 - Biotechnology: Principles and Processes',
        'Chapter 12 - Biotechnology and its Applications',
        'Chapter 13 - Organisms and Populations',
        'Chapter 14 - Ecosystem',
        'Chapter 15 - Biodiversity and Conservation',
        'Chapter 16 - Environmental Issues',
      ],
      'Mathematics': [
        'Chapter 1 - Relations and Functions',
        'Chapter 2 - Inverse Trigonometric Functions',
        'Chapter 3 - Matrices',
        'Chapter 4 - Determinants',
        'Chapter 5 - Continuity and Differentiability',
        'Chapter 6 - Application of Derivatives',
        'Chapter 7 - Integrals',
        'Chapter 8 - Application of Integrals',
        'Chapter 9 - Differential Equations',
        'Chapter 10 - Vector Algebra',
        'Chapter 11 - Three Dimensional Geometry',
        'Chapter 12 - Linear Programming',
        'Chapter 13 - Probability',
      ],
      'English': [
        'Chapter 1 - The Last Lesson',
        'Chapter 2 - Lost Spring',
        'Chapter 3 - Deep Water',
        'Chapter 4 - The Rattrap',
        'Chapter 5 - Indigo',
        'Chapter 6 - Poets and Pancakes',
        'Chapter 7 - The Interview',
        'Chapter 8 - Going Places',
        'Poem 1 - My Mother at Sixty-six',
        'Poem 2 - An Elementary School Classroom in a Slum',
        'Poem 3 - Keeping Quiet',
        'Poem 4 - A Thing of Beauty',
      ],
      'Accountancy': [
        'Chapter 1 - Accounting for Not-for-Profit Organisation',
        'Chapter 2 - Accounting for Partnership',
        'Chapter 3 - Reconstitution of a Partnership Firm - Admission',
        'Chapter 4 - Reconstitution - Retirement and Death',
        'Chapter 5 - Dissolution of Partnership Firm',
        'Chapter 6 - Accounting for Share Capital',
        'Chapter 7 - Issue and Redemption of Debentures',
        'Chapter 8 - Financial Statements of a Company',
        'Chapter 9 - Analysis of Financial Statements',
        'Chapter 10 - Accounting Ratios',
        'Chapter 11 - Cash Flow Statement',
      ],
    }
  },
  'TN-12-English': {
    label: 'TN 12th English Medium',
    subjects: {
      'English': [
        'Unit 1 - Prose: A Sunny Morning | Poem: Life | Supplementary: The Attic',
        'Unit 2 - Prose: I Cannot Tell Why | Poem: The Hollow Men | Supplementary: The Cuckoo Clock',
        'Unit 3 - Prose: The Last Leaf | Poem: Ode to a Nightingale | Supplementary: The Portrait',
        'Unit 4 - Prose: The Summit Within | Poem: The Second Coming | Supplementary: My Greatest Olympic Prize',
        'Unit 5 - Prose: Where the Mind is Without Fear | Poem: Ozymandias | Supplementary: Old Man at the Bridge',
      ],
      'Physics': [
        'Chapter 1 - Electrostatics',
        'Chapter 2 - Current Electricity',
        'Chapter 3 - Magnetism and Magnetic Effects of Electric Current',
        'Chapter 4 - Electromagnetic Induction and Alternating Current',
        'Chapter 5 - Electromagnetic Waves',
        'Chapter 6 - Ray Optics',
        'Chapter 7 - Wave Optics',
        'Chapter 8 - Dual Nature of Radiation and Matter',
        'Chapter 9 - Atomic and Nuclear Physics',
        'Chapter 10 - Electronics and Communication',
      ],
      'Chemistry': [
        'Chapter 1 - Metallurgy',
        'Chapter 2 - p-Block Elements - I',
        'Chapter 3 - p-Block Elements - II',
        'Chapter 4 - Transition and Inner Transition Elements',
        'Chapter 5 - Coordination Chemistry',
        'Chapter 6 - Solid State',
        'Chapter 7 - Chemical Kinetics',
        'Chapter 8 - Ionic Equilibrium',
        'Chapter 9 - Electro Chemistry',
        'Chapter 10 - Surface Chemistry',
        'Chapter 11 - Hydroxy Compounds and Ethers',
        'Chapter 12 - Carbonyl Compounds and Carboxylic Acids',
        'Chapter 13 - Organic Nitrogen Compounds',
        'Chapter 14 - Biomolecules',
        'Chapter 15 - Chemistry in Everyday Life',
      ],
      'Biology': [
        'Chapter 1 - Asexual and Sexual Reproduction in Plants',
        'Chapter 2 - Classical Genetics',
        'Chapter 3 - Chromosomal Basis of Inheritance',
        'Chapter 4 - Molecular Genetics',
        'Chapter 5 - Environmental Issues',
        'Chapter 6 - Resource Management',
        'Chapter 7 - Biodiversity and its Conservation',
        'Chapter 8 - Microbes in Human Welfare',
        'Chapter 9 - Applications of Biotechnology',
        'Chapter 10 - Human Reproduction',
        'Chapter 11 - Reproductive Health',
        'Chapter 12 - Answers Await',
        'Chapter 13 - Trends in Economic Zoology',
      ],
      'Mathematics': [
        'Chapter 1 - Applications of Matrices and Determinants',
        'Chapter 2 - Complex Numbers',
        'Chapter 3 - Theory of Equations',
        'Chapter 4 - Inverse Trigonometric Functions',
        'Chapter 5 - Two Dimensional Analytical Geometry - II',
        'Chapter 6 - Applications of Vector Algebra',
        'Chapter 7 - Applications of Differential Calculus',
        'Chapter 8 - Differentials and Partial Derivatives',
        'Chapter 9 - Applications of Integration',
        'Chapter 10 - Ordinary Differential Equations',
        'Chapter 11 - Probability Distributions',
        'Chapter 12 - Discrete Mathematics',
      ],
    }
  }
};

const C = {
  bg:'#060a12', surface:'#0d1421', card:'#111827', border:'#1e2d45',
  accent:'#6366f1', green:'#10b981', yellow:'#f59e0b', red:'#ef4444',
  text:'#e8edf5', muted:'#64748b'
};

export default function StudyMate() {
  const [profileKey, setProfileKey] = useState(null);
  const [step, setStep] = useState(1);
  const [cls, setCls] = useState(null);
  const [board, setBoard] = useState(null);
  const [tab, setTab] = useState('tutor');
  const [subject, setSubject] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [examQs, setExamQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loadingExam, setLoadingExam] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

  // Load saved profile
  useEffect(() => {
    const saved = localStorage.getItem('sm_profile');
    if (saved) {
      setProfileKey(saved);
      const d = BOARDS[saved];
      if (d) setSubject(Object.keys(d.subjects)[0]);
    }
  }, []);

  const profile = profileKey ? BOARDS[profileKey] : null;
  const subjects = profile ? Object.keys(profile.subjects) : [];
  const chapters = profile && subject ? profile.subjects[subject] || [] : [];

  function finishSetup(key) {
    localStorage.setItem('sm_profile', key);
    setProfileKey(key);
    const d = BOARDS[key];
    if (d) setSubject(Object.keys(d.subjects)[0]);
    setStep(1); setCls(null); setBoard(null);
  }

  function selectClass(c) { setCls(c); setStep(2); }

  function selectBoard(b) {
    if (b === 'TN' && cls === '10') { setBoard(b); setStep(3); }
    else if (b === 'TN' && cls === '12') { finishSetup('TN-12-English'); }
    else { finishSetup(`CBSE-${cls}`); }
  }

  function selectMedium(m) { finishSetup(`TN-${cls}-${m}`); }

  function changeProfile() {
    localStorage.removeItem('sm_profile');
    setProfileKey(null); setSubject(null); setChapter(null);
    setMsgs([]); setStep(1); setCls(null); setBoard(null);
  }

  function selectChapter(ch) {
    setChapter(ch);
    setMsgs([]);
    setExamMode(false);
    setTab('tutor');
  }

  async function sendMsg(text) {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg = { role:'user', content:msg };
    setMsgs(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          type: 'chat',
          messages: [...msgs, userMsg],
          profile: profile?.label,
          subject,
          chapter
        })
      });
      const data = await res.json();
      setMsgs(m => [...m, {role:'assistant', content: data.response || 'Sorry, please try again.'}]);
    } catch {
      setMsgs(m => [...m, {role:'assistant', content:'Connection error. Please try again.'}]);
    }
    setLoading(false);
  }

  async function generateExam() {
    if (!chapter) { alert('Please select a chapter first!'); return; }
    setLoadingExam(true);
    setExamMode(false);
    try {
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          type: 'exam',
          profile: profile?.label,
          subject,
          chapter
        })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setExamQs(data.questions);
        setQi(0); setSel(null); setAnswered(false);
        setScore(0); setFinished(false);
        setExamMode(true);
        setTab('tutor');
      } else {
        alert('Could not generate exam. Please try again.');
      }
    } catch {
      alert('Error generating exam. Please try again.');
    }
    setLoadingExam(false);
  }

  function pickAnswer(i) {
    if (answered) return;
    setSel(i); setAnswered(true);
    if (i === examQs[qi].correct) setScore(s => s + 1);
  }

  function nextQ() {
    if (qi + 1 >= examQs.length) { setFinished(true); return; }
    setQi(q => q + 1); setSel(null); setAnswered(false);
  }

  const cardStyle = { background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'1.25rem' };

  // ── SETUP SCREEN ───────────────────────────────────────────────────────────
  if (!profileKey) {
    return (
      <div style={{minHeight:'100vh', background:C.bg, color:C.text, fontFamily:'system-ui,sans-serif', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem'}}>
        <div style={{width:'100%', maxWidth:'460px'}}>
          <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <div style={{fontSize:'3rem', marginBottom:'0.5rem'}}>📚</div>
            <div style={{fontWeight:800, fontSize:'2rem'}}>Study<span style={{color:C.accent}}>Mate</span><span style={{color:C.muted, fontSize:'1.1rem'}}>.in</span></div>
            <div style={{color:C.muted, fontSize:'0.85rem', marginTop:'0.25rem'}}>Your Personal AI Study Partner</div>
          </div>

          {step === 1 && (
            <div>
              <h2 style={{fontSize:'1.2rem', fontWeight:800, marginBottom:'1rem', textAlign:'center'}}>Which class are you in?</h2>
              {[['10','10th Standard'],['12','12th Standard']].map(([v,l]) => (
                <button key={v} onClick={() => selectClass(v)}
                  style={{...cardStyle, width:'100%', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.75rem', border:`2px solid ${C.border}`, fontFamily:'inherit', fontSize:'1rem', fontWeight:600, color:C.text, transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.background=`${C.accent}10`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card;}}>
                  <span>🎓 {l}</span><span style={{color:C.muted}}>→</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} style={{background:'none', border:'none', color:C.muted, cursor:'pointer', marginBottom:'1rem', fontSize:'0.85rem', fontFamily:'inherit'}}>← Back</button>
              <h2 style={{fontSize:'1.2rem', fontWeight:800, marginBottom:'1rem', textAlign:'center'}}>Which board do you follow?</h2>
              {[['TN','Tamil Nadu State Board','🏛️'],['CBSE','CBSE - NCERT','📘']].map(([v,l,icon]) => (
                <button key={v} onClick={() => selectBoard(v)}
                  style={{...cardStyle, width:'100%', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.75rem', border:`2px solid ${C.border}`, fontFamily:'inherit', fontSize:'1rem', fontWeight:600, color:C.text, transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.background=`${C.accent}10`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card;}}>
                  <span>{icon} {l}</span><span style={{color:C.muted}}>→</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} style={{background:'none', border:'none', color:C.muted, cursor:'pointer', marginBottom:'1rem', fontSize:'0.85rem', fontFamily:'inherit'}}>← Back</button>
              <h2 style={{fontSize:'1.2rem', fontWeight:800, marginBottom:'1rem', textAlign:'center'}}>Which medium?</h2>
              {[['Tamil','Tamil Medium','தமிழ் வழி'],['English','English Medium','English medium']].map(([v,l,sub]) => (
                <button key={v} onClick={() => selectMedium(v)}
                  style={{...cardStyle, width:'100%', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.75rem', border:`2px solid ${C.border}`, fontFamily:'inherit', fontSize:'1rem', fontWeight:600, color:C.text, transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.background=`${C.accent}10`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card;}}>
                  <div><div>{l}</div><div style={{fontSize:'0.75rem', color:C.muted, fontWeight:400}}>{sub}</div></div>
                  <span style={{color:C.muted}}>→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── MAIN APP ───────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:'100vh', background:C.bg, color:C.text, fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column'}}>

      {/* HEADER */}
      <div style={{background:`linear-gradient(135deg,${C.surface},${C.card})`, borderBottom:`1px solid ${C.border}`, padding:'0 1rem', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100, flexShrink:0}}>
        <div style={{fontWeight:800, fontSize:'1.1rem'}}>📚 Study<span style={{color:C.accent}}>Mate</span></div>
        <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
          <div style={{fontSize:'0.72rem', background:`${C.accent}20`, border:`1px solid ${C.accent}40`, color:C.accent, padding:'3px 8px', borderRadius:'20px', fontWeight:600, maxWidth:'180px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
            {profile.label}
          </div>
          <button onClick={changeProfile} style={{background:'none', border:`1px solid ${C.border}`, borderRadius:'6px', color:C.muted, padding:'3px 7px', cursor:'pointer', fontSize:'0.72rem', fontFamily:'inherit'}}>
            Change
          </button>
        </div>
      </div>

      <div style={{display:'flex', flex:1, overflow:'hidden', height:'calc(100vh - 56px)'}}>

        {/* LEFT SIDEBAR - Subjects & Chapters */}
        <div style={{width:'240px', borderRight:`1px solid ${C.border}`, background:C.surface, display:'flex', flexDirection:'column', flexShrink:0, overflowY:'auto'}}>
          {/* Subject tabs */}
          <div style={{padding:'0.75rem', borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:'0.65rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem', fontWeight:700}}>Subjects</div>
            <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
              {subjects.map(s => (
                <button key={s} onClick={() => { setSubject(s); setChapter(null); setMsgs([]); setExamMode(false); }}
                  style={{background: subject===s ? `${C.accent}20` : 'none', border: subject===s ? `1px solid ${C.accent}40` : '1px solid transparent', borderRadius:'6px', padding:'6px 10px', cursor:'pointer', textAlign:'left', color: subject===s ? C.accent : C.muted, fontWeight: subject===s ? 700 : 400, fontSize:'0.8rem', fontFamily:'inherit', transition:'all 0.15s'}}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div style={{padding:'0.75rem', flex:1, overflowY:'auto'}}>
            <div style={{fontSize:'0.65rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem', fontWeight:700}}>Chapters</div>
            <div style={{display:'flex', flexDirection:'column', gap:'3px'}}>
              {chapters.map((ch, i) => (
                <button key={i} onClick={() => selectChapter(ch)}
                  style={{background: chapter===ch ? `${C.green}15` : 'none', border: chapter===ch ? `1px solid ${C.green}40` : '1px solid transparent', borderRadius:'6px', padding:'6px 8px', cursor:'pointer', textAlign:'left', color: chapter===ch ? C.green : C.text, fontSize:'0.75rem', fontFamily:'inherit', lineHeight:1.4, transition:'all 0.15s'}}
                  onMouseEnter={e=>{ if(chapter!==ch){e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor=C.border;} }}
                  onMouseLeave={e=>{ if(chapter!==ch){e.currentTarget.style.background='none'; e.currentTarget.style.borderColor='transparent';} }}>
                  <span style={{color:C.muted, marginRight:'6px', fontFamily:'monospace', fontSize:'0.65rem'}}>{String(i+1).padStart(2,'0')}</span>
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT MAIN AREA */}
        <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>

          {/* Chapter header + Exam button */}
          {chapter && (
            <div style={{padding:'0.75rem 1rem', borderBottom:`1px solid ${C.border}`, background:C.surface, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0}}>
              <div>
                <div style={{fontSize:'0.65rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:700}}>{subject}</div>
                <div style={{fontWeight:700, fontSize:'0.88rem', color:C.text}}>{chapter}</div>
              </div>
              <button onClick={generateExam} disabled={loadingExam}
                style={{background: loadingExam ? C.card : C.yellow, border:'none', borderRadius:'8px', padding:'6px 14px', color: loadingExam ? C.muted : '#000', fontWeight:700, fontSize:'0.78rem', cursor: loadingExam ? 'not-allowed' : 'pointer', fontFamily:'inherit', opacity: loadingExam ? 0.7 : 1, whiteSpace:'nowrap'}}>
                {loadingExam ? '⏳ Generating...' : '📝 Take Chapter Exam'}
              </button>
            </div>
          )}

          {/* EXAM MODE */}
          {examMode && !finished && examQs.length > 0 && (
            <div style={{flex:1, overflowY:'auto', padding:'1.25rem'}}>
              <div style={{maxWidth:'680px', margin:'0 auto'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.75rem'}}>
                  <span style={{fontSize:'0.82rem', color:C.muted, fontWeight:600}}>📝 Exam: {chapter}</span>
                  <span style={{fontSize:'0.82rem', color:C.muted}}>Q{qi+1}/{examQs.length} · Score: {score}</span>
                </div>
                <div style={{height:'5px', background:C.border, borderRadius:'3px', marginBottom:'1.25rem', overflow:'hidden'}}>
                  <div style={{height:'100%', background:C.accent, width:`${((qi+1)/examQs.length)*100}%`, transition:'width 0.4s', borderRadius:'3px'}} />
                </div>
                <div style={{...cardStyle, marginBottom:'1rem', padding:'1.5rem'}}>
                  <div style={{fontSize:'0.7rem', color:C.accent, fontWeight:700, textTransform:'uppercase', marginBottom:'0.5rem'}}>Question {qi+1}</div>
                  <p style={{fontWeight:700, fontSize:'1rem', lineHeight:1.5}}>{examQs[qi].question}</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'1rem'}}>
                  {examQs[qi].options.map((opt, i) => {
                    let bg=C.card, border=C.border, color=C.text;
                    if (answered) {
                      if (i===examQs[qi].correct) { bg='#10b98115'; border=C.green; color=C.green; }
                      else if (i===sel) { bg='#ef444415'; border=C.red; color=C.red; }
                    }
                    return (
                      <button key={i} onClick={() => pickAnswer(i)}
                        style={{background:bg, border:`2px solid ${border}`, borderRadius:'10px', padding:'0.9rem 1.25rem', cursor:answered?'default':'pointer', textAlign:'left', color, fontWeight:600, fontSize:'0.88rem', fontFamily:'inherit', display:'flex', alignItems:'center', gap:'0.75rem', transition:'all 0.2s'}}>
                        <span style={{width:'26px', height:'26px', borderRadius:'50%', border:`2px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', flexShrink:0, fontWeight:800}}>
                          {['A','B','C','D'][i]}
                        </span>
                        <span style={{flex:1}}>{opt}</span>
                        {answered && i===examQs[qi].correct && <span>✓</span>}
                        {answered && i===sel && i!==examQs[qi].correct && <span>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <>
                    <div style={{background:`${C.yellow}12`, border:`1px solid ${C.yellow}30`, borderRadius:'10px', padding:'1rem', marginBottom:'1rem'}}>
                      <span style={{fontWeight:700, color:C.yellow, fontSize:'0.8rem'}}>💡 Explanation: </span>
                      <span style={{fontSize:'0.85rem'}}>{examQs[qi].explanation}</span>
                    </div>
                    <button onClick={nextQ}
                      style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.75rem', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', width:'100%', fontFamily:'inherit'}}>
                      {qi+1>=examQs.length ? '🏁 See Results' : 'Next Question →'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {examMode && finished && (
            <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem'}}>
              <div style={{textAlign:'center', maxWidth:'400px'}}>
                <div style={{fontSize:'4rem', marginBottom:'1rem'}}>{score===examQs.length?'🏆':score>=examQs.length*0.8?'🎉':score>=examQs.length*0.6?'👍':'📚'}</div>
                <h3 style={{fontSize:'2rem', fontWeight:800, marginBottom:'0.25rem'}}>{score}<span style={{fontSize:'1.2rem', color:C.muted}}>/{examQs.length}</span></h3>
                <p style={{color:C.muted, marginBottom:'0.5rem', fontSize:'0.85rem'}}>
                  {score===examQs.length?'Perfect! 🌟':score>=examQs.length*0.8?'Excellent!':score>=examQs.length*0.6?'Good job!':'Keep studying!'}
                </p>
                <p style={{color:C.muted, fontSize:'0.78rem', marginBottom:'2rem'}}>{chapter}</p>
                <div style={{display:'flex', gap:'0.75rem', justifyContent:'center'}}>
                  <button onClick={generateExam} style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.7rem 1.25rem', color:'white', fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:'0.85rem'}}>
                    Try Again
                  </button>
                  <button onClick={() => {setExamMode(false); setFinished(false);}} style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'0.7rem 1.25rem', color:C.text, fontWeight:700, cursor:'pointer', fontFamily:'inherit', fontSize:'0.85rem'}}>
                    Back to Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CHAT MODE */}
          {!examMode && (
            <>
              <div style={{flex:1, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                {msgs.length === 0 && (
                  <div style={{textAlign:'center', color:C.muted, margin:'auto', padding:'2rem'}}>
                    <div style={{fontSize:'2.5rem', marginBottom:'0.75rem'}}>🤖</div>
                    {chapter ? (
                      <>
                        <p style={{fontWeight:700, color:C.text, marginBottom:'0.4rem', fontSize:'0.95rem'}}>Ready to help with:</p>
                        <p style={{fontSize:'0.85rem', color:C.accent, fontWeight:600, marginBottom:'1rem'}}>{chapter}</p>
                        <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', maxWidth:'400px', margin:'0 auto'}}>
                          {[
                            `Explain ${chapter} in simple terms`,
                            `What are the key points in ${chapter}?`,
                            `Give me examples from ${chapter}`,
                            `What questions can come from ${chapter}?`,
                          ].map(q => (
                            <button key={q} onClick={() => sendMsg(q)}
                              style={{background:C.surface, border:`1px solid ${C.border}`, borderRadius:'20px', padding:'0.4rem 0.85rem', color:C.muted, fontSize:'0.78rem', cursor:'pointer', fontFamily:'inherit', textAlign:'left'}}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p style={{fontWeight:700, color:C.text, marginBottom:'0.4rem'}}>Hi! I'm your {profile.label} Tutor</p>
                        <p style={{fontSize:'0.82rem'}}>👈 Select a chapter from the left to start learning!</p>
                      </>
                    )}
                  </div>
                )}
                {msgs.map((m,i) => (
                  <div key={i} style={{maxWidth:'85%', padding:'0.75rem 1rem', borderRadius:'14px', fontSize:'0.88rem', lineHeight:1.7,
                    background: m.role==='user' ? C.accent : C.surface,
                    border: m.role==='user' ? 'none' : `1px solid ${C.border}`,
                    alignSelf: m.role==='user' ? 'flex-end' : 'flex-start',
                    borderBottomRightRadius: m.role==='user'?'4px':'14px',
                    borderBottomLeftRadius: m.role==='user'?'14px':'4px',
                    whiteSpace:'pre-wrap', wordBreak:'break-word'}}>
                    {m.content}
                  </div>
                ))}
                {loading && (
                  <div style={{alignSelf:'flex-start', padding:'0.75rem 1rem', borderRadius:'14px', background:C.surface, border:`1px solid ${C.border}`, fontSize:'0.85rem', color:C.muted, fontStyle:'italic'}}>
                    Thinking...
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div style={{padding:'0.75rem 1rem', borderTop:`1px solid ${C.border}`, display:'flex', gap:'0.5rem', flexShrink:0}}>
                <input value={input} onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&sendMsg()}
                  placeholder={chapter ? `Ask about "${chapter.substring(0,30)}..."` : 'Select a chapter first...'}
                  disabled={!chapter}
                  style={{flex:1, background:C.card, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'0.7rem 1.1rem', color:C.text, fontSize:'0.88rem', outline:'none', fontFamily:'inherit', opacity: !chapter ? 0.5 : 1}} />
                <button onClick={() => sendMsg()} disabled={loading || !chapter}
                  style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.7rem 1.25rem', color:'white', fontWeight:700, cursor: (loading||!chapter)?'not-allowed':'pointer', opacity:(loading||!chapter)?0.5:1, fontFamily:'inherit', fontSize:'0.88rem'}}>
                  Send ↑
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
