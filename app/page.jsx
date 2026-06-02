'use client';
import { useState, useRef, useEffect } from 'react';
import curriculum from '@/data/curriculum.json';

const BOARDS = Object.keys(curriculum);

const EXAM_QUESTIONS = {
  'Mathematics':[
    {q:'Sum of first n natural numbers?',opts:['n(n+1)/2','n(n-1)/2','n²','n(n+2)/2'],ans:0,exp:'Sum = n(n+1)/2'},
    {q:'If α,β are roots of ax²+bx+c=0, then α+β=?',opts:['-b/a','b/a','c/a','-c/a'],ans:0,exp:'Sum of roots = -b/a (Vieta\'s formula)'},
    {q:'sin²θ + cos²θ = ?',opts:['0','1','2','-1'],ans:1,exp:'Fundamental Pythagorean identity'},
    {q:'Area of circle with radius r?',opts:['2πr','πr²','πd','2πr²'],ans:1,exp:'Area = πr²'},
    {q:'HCF of 12 and 18?',opts:['3','6','9','12'],ans:1,exp:'Factors: 12→1,2,3,4,6,12. 18→1,2,3,6,9,18. HCF=6'},
  ],
  'Science':[
    {q:'Gas produced during photosynthesis?',opts:['CO₂','N₂','O₂','H₂'],ans:2,exp:'Plants release O₂ during photosynthesis'},
    {q:'Chemical formula of water?',opts:['HO','H₂O','H₃O','H₂O₂'],ans:1,exp:'Water = H₂O'},
    {q:'Newton\'s First Law is also called?',opts:['Law of Acceleration','Law of Inertia','Law of Action','Law of Gravity'],ans:1,exp:'Law of Inertia - objects resist change in motion'},
    {q:'Basic unit of life?',opts:['Tissue','Organ','Cell','Atom'],ans:2,exp:'Cell is the basic unit of life'},
    {q:'Acids turn litmus paper to?',opts:['Blue','Green','Red','Yellow'],ans:2,exp:'Acids = Red litmus. Bases = Blue litmus.'},
  ],
  'Social Science':[
    {q:'Father of the Indian Nation?',opts:['Nehru','Gandhi','Bose','Patel'],ans:1,exp:'Mahatma Gandhi is the Father of the Nation'},
    {q:'India became independent in?',opts:['1945','1946','1947','1948'],ans:2,exp:'Independence Day: August 15, 1947'},
    {q:'Constitution came into effect on?',opts:['Jan 26 1950','Aug 15 1947','Nov 26 1949','Jan 26 1948'],ans:0,exp:'Republic Day: January 26, 1950'},
    {q:'Longest river in India?',opts:['Yamuna','Brahmaputra','Godavari','Ganga'],ans:3,exp:'Ganga is the longest river in India (~2,525 km)'},
    {q:'Fundamental Rights in Indian Constitution?',opts:['5','6','7','8'],ans:1,exp:'There are 6 Fundamental Rights'},
  ],
  'English':[
    {q:'Who wrote "Footprints Without Feet"?',opts:['H.G. Wells','R.L. Stevenson','Mark Twain','O. Henry'],ans:0,exp:'H.G. Wells wrote Footprints Without Feet'},
    {q:'Synonym for "Happy"?',opts:['Sad','Joyful','Angry','Tired'],ans:1,exp:'Joyful = same meaning as Happy'},
    {q:'"She was singing" is which tense?',opts:['Simple Past','Past Continuous','Present Perfect','Past Perfect'],ans:1,exp:'Was + verb-ing = Past Continuous'},
    {q:'Word that describes a noun?',opts:['Verb','Adverb','Adjective','Pronoun'],ans:2,exp:'Adjective modifies a noun'},
    {q:'Plural of "Child"?',opts:['Childs','Childes','Children','Childrens'],ans:2,exp:'Irregular plural: child → children'},
  ],
  'Physics':[
    {q:'Speed of light in vacuum?',opts:['3×10⁶ m/s','3×10⁸ m/s','3×10¹⁰ m/s','3×10⁴ m/s'],ans:1,exp:'c = 3×10⁸ m/s'},
    {q:'SI unit of electric current?',opts:['Volt','Watt','Ampere','Ohm'],ans:2,exp:'Ampere (A) is the SI unit of current'},
    {q:'V = IR is?',opts:['Faraday\'s Law','Newton\'s Law','Ohm\'s Law','Kirchhoff\'s Law'],ans:2,exp:'Ohm\'s Law: V = IR'},
    {q:'Frequency of AC in India?',opts:['50 Hz','60 Hz','100 Hz','25 Hz'],ans:0,exp:'India uses 50 Hz AC supply'},
    {q:'Unit of resistance?',opts:['Ampere','Volt','Ohm','Watt'],ans:2,exp:'Ohm (Ω) is the unit of resistance'},
  ],
  'Chemistry':[
    {q:'Atomic number of Carbon?',opts:['4','6','8','12'],ans:1,exp:'Carbon has 6 protons → atomic number 6'},
    {q:'Chemical symbol for Gold?',opts:['Go','Gd','Au','Ag'],ans:2,exp:'Gold = Au (from Latin "Aurum")'},
    {q:'pH of pure water?',opts:['0','7','14','1'],ans:1,exp:'Pure water pH = 7 (neutral)'},
    {q:'Baking soda is?',opts:['Sodium Chloride','Sodium Carbonate','Sodium Bicarbonate','Sodium Hydroxide'],ans:2,exp:'Baking soda = NaHCO₃ (Sodium Bicarbonate)'},
    {q:'Main gas causing Global Warming?',opts:['O₂','N₂','CO₂','H₂'],ans:2,exp:'CO₂ is the main greenhouse gas'},
  ],
  'Biology':[
    {q:'DNA stands for?',opts:['Deoxyribonucleic Acid','Deoxyribose Nucleic Acid','Dinucleic Acid','Deoxy Nucleic Acid'],ans:0,exp:'DNA = Deoxyribonucleic Acid'},
    {q:'Photosynthesis occurs in?',opts:['Mitochondria','Nucleus','Chloroplast','Ribosome'],ans:2,exp:'Chloroplast is the site of photosynthesis'},
    {q:'Human heart chambers?',opts:['2','3','4','5'],ans:2,exp:'4 chambers: 2 atria + 2 ventricles'},
    {q:'Universal blood donor?',opts:['A','B','AB','O'],ans:3,exp:'Blood group O is universal donor'},
    {q:'Powerhouse of the cell?',opts:['Nucleus','Ribosome','Mitochondria','Golgi Body'],ans:2,exp:'Mitochondria produces ATP energy'},
  ],
};

const VOCAB = [
  {w:'Photosynthesis',d:'Plants convert sunlight, CO₂ and water into glucose and oxygen.'},
  {w:'Mitosis',d:'Cell division producing two genetically identical daughter cells.'},
  {w:'Quadratic Equation',d:'Polynomial of degree 2: ax²+bx+c=0, solved by x=(-b±√(b²-4ac))/2a'},
  {w:'Newton\'s First Law',d:'An object stays at rest or in motion unless acted on by an external force.'},
  {w:'Covalent Bond',d:'Chemical bond formed by sharing electrons between atoms.'},
  {w:'Osmosis',d:'Water movement through semi-permeable membrane from low to high solute concentration.'},
  {w:'Electromagnetic Induction',d:'Production of electric current by a changing magnetic field (Faraday\'s Law).'},
  {w:'Democracy',d:'System of government where power belongs to the people.'},
  {w:'Atom',d:'Smallest unit of a chemical element, made of protons, neutrons and electrons.'},
  {w:'Globalisation',d:'Integration of economies, cultures and societies worldwide.'},
  {w:'Enzyme',d:'Biological catalyst that speeds up chemical reactions in organisms.'},
  {w:'Probability',d:'Likelihood of an event, expressed as a number between 0 and 1.'},
  {w:'Ecosystem',d:'Community of organisms and their physical environment as a system.'},
  {w:'Oxidation',d:'Chemical reaction involving loss of electrons or gain of oxygen.'},
  {w:'Constitution',d:'Fundamental law establishing the structure and limits of government.'},
];

const C = {
  bg:'#060a12', surface:'#0d1421', card:'#111827', border:'#1e2d45',
  accent:'#6366f1', accent2:'#10b981', accent3:'#f59e0b',
  text:'#e8edf5', muted:'#64748b'
};

const btn = (active, color='#6366f1') => ({
  background: active ? `${color}22` : 'transparent',
  border: `1px solid ${active ? color : C.border}`,
  color: active ? color : C.muted,
  padding:'7px 16px', borderRadius:'8px', cursor:'pointer',
  fontSize:'0.82rem', fontWeight:600, whiteSpace:'nowrap',
  fontFamily:'inherit', transition:'all 0.2s'
});

export default function StudyMate() {
  const [tab, setTab] = useState('home');
  const [board, setBoard] = useState(null);
  const [subject, setSubject] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [vi, setVi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [examSub, setExamSub] = useState(null);
  const [examQs, setExamQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

  const boardData = board ? curriculum[board] : null;
  const subjects = boardData ? Object.keys(boardData.subjects) : [];
  const chapters = board && subject && curriculum[board]?.subjects[subject] ? curriculum[board].subjects[subject].chapters : [];

  function startExam(sub) {
    const qs = [...(EXAM_QUESTIONS[sub] || EXAM_QUESTIONS['Science'])].sort(()=>Math.random()-0.5).slice(0,5);
    setExamQs(qs); setExamSub(sub); setQi(0); setScore(0);
    setSel(null); setDone(false); setFinished(false);
  }

  function pickAnswer(i) {
    if (done) return;
    setSel(i); setDone(true);
    if (i === examQs[qi].ans) setScore(s=>s+1);
  }

  function nextQ() {
    if (qi+1 >= examQs.length) { setFinished(true); return; }
    setQi(q=>q+1); setSel(null); setDone(false);
  }

  async function sendMsg() {
    if (!input.trim() || loading) return;
    const userMsg = {role:'user', content:input};
    setMsgs(m=>[...m, userMsg]); setInput(''); setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({messages:[...msgs, userMsg], board, subject})
      });
      const data = await res.json();
      setMsgs(m=>[...m, {role:'assistant', content: data.response || 'Sorry, please try again.'}]);
    } catch {
      setMsgs(m=>[...m, {role:'assistant', content:'Connection error. Please check your API key in Vercel settings.'}]);
    }
    setLoading(false);
  }

  const style = {
    page: {minHeight:'100vh', background:C.bg, color:C.text, fontFamily:'system-ui,sans-serif'},
    header: {background:`linear-gradient(135deg,${C.surface},${C.card})`, borderBottom:`1px solid ${C.border}`, padding:'0 1.5rem', height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:100},
    nav: {background:C.surface, borderBottom:`1px solid ${C.border}`, display:'flex', gap:'4px', padding:'8px 1.5rem', overflowX:'auto'},
    main: {maxWidth:'1100px', margin:'0 auto', padding:'1.5rem'},
    card: {background:C.card, border:`1px solid ${C.border}`, borderRadius:'12px', padding:'1.25rem'},
    sectionLabel: {fontSize:'0.7rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem', fontWeight:700},
  };

  return (
    <div style={style.page}>
      {/* HEADER */}
      <div style={style.header}>
        <div>
          <div style={{fontWeight:800, fontSize:'1.3rem', letterSpacing:'-0.02em'}}>
            📚 Study<span style={{color:C.accent}}>Mate</span><span style={{color:C.muted, fontSize:'0.8rem', fontWeight:500}}>.in</span>
          </div>
          <div style={{fontSize:'0.7rem', color:C.muted}}>AI Tutoring for Indian Students</div>
        </div>
        <div style={{fontSize:'0.72rem', color:C.muted, display:'flex', gap:'1rem'}}>
          <span style={{color:C.accent2}}>● Live</span>
          <span>TN & CBSE Boards</span>
        </div>
      </div>

      {/* NAV */}
      <div style={style.nav}>
        {[['home','🏠 Home'],['lessons','📖 Lessons'],['exam','📝 Exam'],['vocab','💡 Vocab'],['tutor','🤖 AI Tutor'],['pricing','💎 Plans']].map(([id,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={btn(tab===id, C.accent)}>
            {label}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={style.main}>

        {/* HOME */}
        {tab==='home' && (
          <div>
            <div style={{background:`linear-gradient(135deg,#0d1a3a,#0a1628)`, border:`1px solid ${C.border}`, borderRadius:'16px', padding:'2.5rem', marginBottom:'1.5rem', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:'-60px', right:'-40px', width:'300px', height:'300px', background:`radial-gradient(circle,${C.accent}15 0%,transparent 70%)`, pointerEvents:'none'}} />
              <div style={{fontSize:'0.75rem', color:C.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem'}}>🇮🇳 Made for Indian Students</div>
              <h1 style={{fontSize:'2.2rem', fontWeight:800, marginBottom:'0.75rem', lineHeight:1.2}}>
                Your Personal<br/><span style={{color:C.accent}}>AI Study Partner</span>
              </h1>
              <p style={{color:C.muted, marginBottom:'1.75rem', fontSize:'0.95rem', maxWidth:'480px'}}>
                Official TN & CBSE textbooks + AI tutor + MCQ exams. Everything you need to score better.
              </p>
              <div style={{display:'flex', gap:'2rem', flexWrap:'wrap'}}>
                {[['5','Boards'],['34+','Subjects'],['270+','Chapters'],['7','Exam Sets']].map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontSize:'2rem', fontWeight:800, color:C.accent}}>{n}</div>
                    <div style={{fontSize:'0.7rem', color:C.muted, textTransform:'uppercase', letterSpacing:'0.08em'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(175px,1fr))', gap:'1rem'}}>
              {[
                ['📖','Lessons','Browse all chapters from official TN & CBSE textbooks','lessons'],
                ['📝','Exam Mode','MCQ tests with instant results and explanations','exam'],
                ['💡','Vocabulary','Learn key terms with interactive flashcards','vocab'],
                ['🤖','AI Tutor','Ask any doubt and get instant AI-powered answers','tutor'],
              ].map(([icon,title,desc,tabId])=>(
                <div key={title} onClick={()=>setTab(tabId)} style={{...style.card, cursor:'pointer', transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.transform='translateY(-3px)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='none'}}>
                  <div style={{fontSize:'1.75rem', marginBottom:'0.6rem'}}>{icon}</div>
                  <div style={{fontWeight:700, fontSize:'0.95rem', marginBottom:'0.3rem'}}>{title}</div>
                  <div style={{fontSize:'0.75rem', color:C.muted}}>{desc}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop:'1.5rem', background:`${C.accent}10`, border:`1px solid ${C.accent}30`, borderRadius:'12px', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap'}}>
              <span style={{fontSize:'1.2rem'}}>🎯</span>
              <div>
                <div style={{fontWeight:700, fontSize:'0.9rem'}}>Boards Available</div>
                <div style={{fontSize:'0.8rem', color:C.muted}}>TN 10th (Tamil & English Medium) · CBSE 10th · CBSE 12th · TN 12th English Medium</div>
              </div>
            </div>
          </div>
        )}

        {/* LESSONS */}
        {tab==='lessons' && (
          <div>
            <h2 style={{fontSize:'1.5rem', fontWeight:800, marginBottom:'1.25rem'}}>📖 <span style={{color:C.accent}}>Lessons</span></h2>
            <div style={style.sectionLabel}>Select Board</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(165px,1fr))', gap:'0.75rem', marginBottom:'1.5rem'}}>
              {BOARDS.map(b=>(
                <button key={b} onClick={()=>{setBoard(b);setSubject(null);}}
                  style={{background: board===b ? `${C.accent}15` : C.card, border:`2px solid ${board===b ? C.accent : C.border}`, borderRadius:'10px', padding:'1rem', cursor:'pointer', textAlign:'left', color:C.text, transition:'all 0.2s', fontFamily:'inherit'}}>
                  <div style={{fontWeight:700, fontSize:'0.85rem', marginBottom:'4px'}}>{curriculum[b].name}</div>
                  <div style={{fontSize:'0.7rem', color:C.muted}}>{Object.keys(curriculum[b].subjects).length} subjects</div>
                </button>
              ))}
            </div>

            {board && <>
              <div style={{height:'1px', background:C.border, margin:'1.25rem 0'}} />
              <div style={style.sectionLabel}>Select Subject</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:'0.6rem', marginBottom:'1.5rem'}}>
                {subjects.map(s=>(
                  <button key={s} onClick={()=>setSubject(s)}
                    style={{background: subject===s ? `${C.accent2}15` : C.card, border:`2px solid ${subject===s ? C.accent2 : C.border}`, borderRadius:'8px', padding:'0.6rem 1rem', cursor:'pointer', color: subject===s ? C.accent2 : C.text, fontWeight:600, fontSize:'0.82rem', fontFamily:'inherit', transition:'all 0.2s'}}>
                    {s}
                  </button>
                ))}
              </div>
            </>}

            {subject && chapters.length > 0 && <>
              <div style={{height:'1px', background:C.border, margin:'1.25rem 0'}} />
              <div style={style.sectionLabel}>{subject} — {chapters.length} Chapters</div>
              <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                {chapters.map(ch=>(
                  <div key={ch.id} style={{...style.card, display:'flex', alignItems:'center', gap:'1rem', cursor:'pointer', padding:'0.9rem 1.25rem', transition:'all 0.2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.background='#1a2744'}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.card}}>
                    <span style={{fontFamily:'monospace', fontSize:'0.72rem', color:C.muted, minWidth:'24px'}}>{String(ch.id).padStart(2,'0')}</span>
                    <span style={{fontSize:'0.88rem', fontWeight:600, flex:1}}>{ch.title}</span>
                    <span style={{fontSize:'0.7rem', background:`${C.accent}15`, border:`1px solid ${C.accent}40`, color:C.accent, padding:'2px 8px', borderRadius:'4px', whiteSpace:'nowrap'}}>{ch.topic}</span>
                  </div>
                ))}
              </div>
            </>}
          </div>
        )}

        {/* EXAM */}
        {tab==='exam' && (
          <div>
            <h2 style={{fontSize:'1.5rem', fontWeight:800, marginBottom:'0.5rem'}}>📝 <span style={{color:C.accent}}>Exam Mode</span></h2>
            <p style={{color:C.muted, fontSize:'0.85rem', marginBottom:'1.5rem'}}>5 MCQ questions per subject. Get instant results and detailed explanations!</p>

            {!examSub && (
              <>
                <div style={style.sectionLabel}>Choose Subject to Start</div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'0.75rem'}}>
                  {Object.keys(EXAM_QUESTIONS).map(sub=>(
                    <button key={sub} onClick={()=>startExam(sub)}
                      style={{...style.card, cursor:'pointer', textAlign:'center', padding:'1.5rem 1rem', fontFamily:'inherit', transition:'all 0.2s'}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.transform='translateY(-3px)'}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='none'}}>
                      <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>
                        {sub==='Mathematics'?'🔢':sub==='Science'?'🔬':sub==='Social Science'?'🌍':sub==='English'?'📖':sub==='Physics'?'⚡':sub==='Chemistry'?'⚗️':'🧬'}
                      </div>
                      <div style={{fontWeight:700, fontSize:'0.85rem', marginBottom:'0.25rem', color:C.text}}>{sub}</div>
                      <div style={{fontSize:'0.7rem', color:C.muted}}>5 Questions</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {examSub && !finished && examQs.length > 0 && (
              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                  <span style={{fontSize:'0.82rem', color:C.muted, fontWeight:600}}>📝 {examSub}</span>
                  <span style={{fontSize:'0.82rem', color:C.muted}}>Q{qi+1} of {examQs.length} · Score: {score}</span>
                </div>
                <div style={{height:'6px', background:C.border, borderRadius:'3px', marginBottom:'1.5rem', overflow:'hidden'}}>
                  <div style={{height:'100%', background:C.accent, borderRadius:'3px', width:`${((qi+1)/examQs.length)*100}%`, transition:'width 0.4s'}} />
                </div>

                <div style={{...style.card, marginBottom:'1rem', padding:'1.5rem'}}>
                  <div style={{fontSize:'0.72rem', color:C.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem'}}>Question {qi+1}</div>
                  <p style={{fontWeight:700, fontSize:'1rem', lineHeight:1.5}}>{examQs[qi].q}</p>
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'1rem'}}>
                  {examQs[qi].opts.map((opt,i)=>{
                    let bg=C.card, border=C.border, color=C.text;
                    if (done) {
                      if (i===examQs[qi].ans) { bg='#10b98115'; border='#10b981'; color='#10b981'; }
                      else if (i===sel) { bg='#ef444415'; border='#ef4444'; color='#ef4444'; }
                    }
                    return (
                      <button key={i} onClick={()=>pickAnswer(i)}
                        style={{background:bg, border:`2px solid ${border}`, borderRadius:'10px', padding:'1rem 1.25rem', cursor:done?'default':'pointer', textAlign:'left', color, fontWeight:600, fontSize:'0.88rem', fontFamily:'inherit', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'0.75rem'}}>
                        <span style={{width:'26px', height:'26px', borderRadius:'50%', border:`2px solid ${border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', flexShrink:0, fontWeight:800}}>
                          {['A','B','C','D'][i]}
                        </span>
                        <span style={{flex:1}}>{opt}</span>
                        {done && i===examQs[qi].ans && <span>✓</span>}
                        {done && i===sel && i!==examQs[qi].ans && <span>✗</span>}
                      </button>
                    );
                  })}
                </div>

                {done && (
                  <>
                    <div style={{background:`${C.accent3}10`, border:`1px solid ${C.accent3}40`, borderRadius:'10px', padding:'1rem', marginBottom:'1rem'}}>
                      <span style={{fontWeight:700, color:C.accent3, fontSize:'0.8rem'}}>💡 Explanation: </span>
                      <span style={{fontSize:'0.85rem'}}>{examQs[qi].exp}</span>
                    </div>
                    <button onClick={nextQ}
                      style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.75rem', color:'white', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', width:'100%', fontFamily:'inherit'}}>
                      {qi+1>=examQs.length ? '🏁 See Results' : 'Next Question →'}
                    </button>
                  </>
                )}
              </div>
            )}

            {finished && (
              <div style={{textAlign:'center', padding:'2rem'}}>
                <div style={{fontSize:'4rem', marginBottom:'1rem'}}>{score===5?'🏆':score>=4?'🎉':score>=3?'👍':score>=2?'📚':'💪'}</div>
                <h3 style={{fontSize:'2rem', fontWeight:800, marginBottom:'0.5rem'}}>
                  {score}<span style={{fontSize:'1.2rem', color:C.muted}}>/{examQs.length}</span>
                </h3>
                <div style={{fontSize:'1rem', fontWeight:600, color: score>=4?C.accent2:score>=3?C.accent3:C.accent, marginBottom:'0.5rem'}}>
                  {score===5?'Perfect Score! 🌟':score>=4?'Excellent Work!':score>=3?'Good Job! Keep going!':score>=2?'Keep practicing!':'Review and try again!'}
                </div>
                <p style={{color:C.muted, fontSize:'0.85rem', marginBottom:'2rem'}}>You scored {score} out of {examQs.length} in {examSub}</p>
                <div style={{display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap'}}>
                  <button onClick={()=>startExam(examSub)}
                    style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.75rem 1.5rem', color:'white', fontWeight:700, cursor:'pointer', fontFamily:'inherit'}}>
                    Try Again
                  </button>
                  <button onClick={()=>setExamSub(null)}
                    style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'0.75rem 1.5rem', color:C.text, fontWeight:700, cursor:'pointer', fontFamily:'inherit'}}>
                    Other Subjects
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VOCAB */}
        {tab==='vocab' && (
          <div>
            <h2 style={{fontSize:'1.5rem', fontWeight:800, marginBottom:'1.5rem'}}>💡 <span style={{color:C.accent}}>Vocabulary Flashcards</span></h2>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem'}}>
              <div onClick={()=>setFlipped(!flipped)} style={{width:'100%', maxWidth:'500px', height:'200px', cursor:'pointer', perspective:'1000px'}}>
                <div style={{width:'100%', height:'100%', position:'relative', transition:'transform 0.5s', transformStyle:'preserve-3d', transform:flipped?'rotateY(180deg)':'none'}}>
                  <div style={{position:'absolute', width:'100%', height:'100%', backfaceVisibility:'hidden', background:`linear-gradient(135deg,#1a2744,#111827)`, border:`2px solid ${C.accent}`, borderRadius:'16px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', textAlign:'center'}}>
                    <div style={{fontSize:'1.6rem', fontWeight:800, marginBottom:'0.5rem'}}>{VOCAB[vi].w}</div>
                    <div style={{fontSize:'0.75rem', color:C.muted}}>Click card to see definition →</div>
                  </div>
                  <div style={{position:'absolute', width:'100%', height:'100%', backfaceVisibility:'hidden', background:`linear-gradient(135deg,#0f2218,#111827)`, border:`2px solid ${C.accent2}`, borderRadius:'16px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', textAlign:'center', transform:'rotateY(180deg)'}}>
                    <div style={{fontSize:'0.95rem', lineHeight:1.7}}>{VOCAB[vi].d}</div>
                  </div>
                </div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'1.25rem'}}>
                <button onClick={()=>{setVi((vi-1+VOCAB.length)%VOCAB.length);setFlipped(false);}}
                  style={{...style.card, border:`1px solid ${C.border}`, cursor:'pointer', padding:'0.6rem 1.25rem', fontWeight:600, fontSize:'0.85rem', fontFamily:'inherit', background:C.card, color:C.text}}>
                  ← Prev
                </button>
                <span style={{fontFamily:'monospace', fontSize:'0.85rem', color:C.muted}}>{vi+1} / {VOCAB.length}</span>
                <button onClick={()=>{setVi((vi+1)%VOCAB.length);setFlipped(false);}}
                  style={{...style.card, border:`1px solid ${C.border}`, cursor:'pointer', padding:'0.6rem 1.25rem', fontWeight:600, fontSize:'0.85rem', fontFamily:'inherit', background:C.card, color:C.text}}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI TUTOR */}
        {tab==='tutor' && (
          <div>
            <h2 style={{fontSize:'1.5rem', fontWeight:800, marginBottom:'1rem'}}>🤖 <span style={{color:C.accent}}>AI Tutor</span></h2>
            <div style={{display:'flex', flexDirection:'column', height:'calc(100vh - 260px)', maxHeight:'580px'}}>
              <div style={{flex:1, overflowY:'auto', ...style.card, display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1rem', padding:'1.25rem'}}>
                {msgs.length===0 && (
                  <div style={{textAlign:'center', color:C.muted, margin:'auto'}}>
                    <div style={{fontSize:'3rem', marginBottom:'0.75rem'}}>🤖</div>
                    <p style={{fontWeight:600, marginBottom:'0.5rem', color:C.text}}>Hi! I'm your StudyMate AI Tutor</p>
                    <p style={{fontSize:'0.82rem', marginBottom:'1.25rem'}}>Ask me anything about your lessons!</p>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center'}}>
                      {['What is photosynthesis?','Explain Newton\'s laws','Solve: x²-5x+6=0','What is cell division?','Explain Indian Constitution'].map(q=>(
                        <button key={q} onClick={()=>setInput(q)}
                          style={{background:C.surface, border:`1px solid ${C.border}`, borderRadius:'20px', padding:'0.4rem 0.85rem', color:C.muted, fontSize:'0.78rem', cursor:'pointer', fontFamily:'inherit'}}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {msgs.map((m,i)=>(
                  <div key={i} style={{maxWidth:'82%', padding:'0.75rem 1rem', borderRadius:'14px', fontSize:'0.88rem', lineHeight:1.6,
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
              <div style={{display:'flex', gap:'0.5rem'}}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()}
                  placeholder="Ask any doubt (e.g. What is Newton's second law?)"
                  style={{flex:1, background:C.card, border:`1px solid ${C.border}`, borderRadius:'10px', padding:'0.75rem 1.25rem', color:C.text, fontSize:'0.9rem', outline:'none', fontFamily:'inherit'}} />
                <button onClick={sendMsg} disabled={loading}
                  style={{background:C.accent, border:'none', borderRadius:'10px', padding:'0.75rem 1.5rem', color:'white', fontWeight:700, cursor:loading?'not-allowed':'pointer', opacity:loading?0.5:1, fontFamily:'inherit', fontSize:'0.9rem'}}>
                  Send ↑
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRICING */}
        {tab==='pricing' && (
          <div>
            <h2 style={{fontSize:'1.5rem', fontWeight:800, marginBottom:'1.5rem'}}>💎 <span style={{color:C.accent}}>Plans & Pricing</span></h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.25rem'}}>
              {[
                {name:'Free',price:'₹0',period:'',qs:'5 questions/day',color:C.border,features:['5 AI questions/day','All lessons','Vocabulary','All 5 boards'],btnBg:'#334155'},
                {name:'Basic',price:'₹99',period:'/month',qs:'20 questions/day',color:C.border,features:['20 AI questions/day','No ads','Progress tracking','Email support'],btnBg:'#2563eb'},
                {name:'Pro',price:'₹299',period:'/month',qs:'Unlimited',color:C.accent,badge:'Popular',features:['Unlimited questions','Priority support','Download notes','Analytics'],btnBg:C.accent},
                {name:'Premium',price:'₹499',period:'/month',qs:'Everything+',color:'#a855f7',features:['Everything in Pro','1-on-1 tutor','Live classes','Study plan'],btnBg:'#9333ea'},
              ].map(p=>(
                <div key={p.name} style={{background:C.card, border:`2px solid ${p.color}`, borderRadius:'16px', padding:'1.75rem', position:'relative', transition:'transform 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='none'}>
                  {p.badge && <div style={{position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background:C.accent, color:'white', fontSize:'0.7rem', fontWeight:700, padding:'3px 14px', borderRadius:'20px'}}>⭐ Most Popular</div>}
                  <div style={{fontWeight:700, marginBottom:'0.75rem', fontSize:'1rem'}}>{p.name}</div>
                  <div style={{fontSize:'2.2rem', fontWeight:800, marginBottom:'0.25rem'}}>{p.price}<span style={{fontSize:'0.9rem', color:C.muted, fontWeight:400}}>{p.period}</span></div>
                  <div style={{fontSize:'0.78rem', color:C.muted, marginBottom:'1.25rem'}}>{p.qs}</div>
                  <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.5rem'}}>
                    {p.features.map(f=><li key={f} style={{fontSize:'0.82rem', color:'#94a3b8'}}><span style={{color:C.accent2, fontWeight:700}}>✓ </span>{f}</li>)}
                  </ul>
                  <button style={{width:'100%', padding:'0.75rem', borderRadius:'10px', border:'none', background:p.btnBg, color:'white', fontWeight:700, cursor:'pointer', fontSize:'0.9rem', fontFamily:'inherit'}}>
                    {p.name==='Free'?'Get Started':'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
