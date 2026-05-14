import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SWEETS = [
  { id: 1, name: "Kinder Surprise", price: 1.99, emoji: "🥚", category: "Kinder", desc: "With a toy surprise inside!" },
  { id: 2, name: "Kinder Bueno", price: 2.49, emoji: "🍫", category: "Kinder", desc: "Crispy wafer & hazelnut cream" },
  { id: 3, name: "Haribo Gold Bears", price: 1.49, emoji: "🐻", category: "Haribo", desc: "Classic gummy bears, 200g" },
  { id: 4, name: "Haribo Starmix", price: 1.79, emoji: "⭐", category: "Haribo", desc: "Mixed gummy shapes, 250g" },
  { id: 5, name: "Macarons Box ×6", price: 12.99, emoji: "🍬", category: "Macarons", desc: "French assorted macarons" },
  { id: 6, name: "Rose Macarons ×12", price: 22.99, emoji: "🌹", category: "Macarons", desc: "Rosewater & raspberry cream" },
  { id: 7, name: "Artisan Chocolate Box", price: 18.99, emoji: "🍫", category: "Chocolate", desc: "12 handcrafted truffles" },
  { id: 8, name: "Bubble Tea Kit", price: 14.99, emoji: "🧋", category: "Bubble Tea", desc: "Make your own at home!" },
];

const FASHION = [
  { id: 101, name: "Floral Midi Dress", price: 49.99, emoji: "🌸", category: "Dresses", sizes: ["XS","S","M","L"], colors: ["Pink","White","Blue"] },
  { id: 102, name: "Linen Blazer", price: 79.99, emoji: "✨", category: "Tops", sizes: ["XS","S","M","L","XL"], colors: ["Cream","Black","Navy"] },
  { id: 103, name: "High-Waist Trousers", price: 59.99, emoji: "👖", category: "Bottoms", sizes: ["34","36","38","40","42"], colors: ["Black","Camel","White"] },
  { id: 104, name: "Silk Slip Dress", price: 89.99, emoji: "💫", category: "Dresses", sizes: ["XS","S","M","L"], colors: ["Champagne","Black","Blush"] },
  { id: 105, name: "Cosy Knit Sweater", price: 45.99, emoji: "🧶", category: "Tops", sizes: ["XS","S","M","L","XL"], colors: ["Cream","Rose","Grey"] },
  { id: 106, name: "Denim Mini Skirt", price: 35.99, emoji: "💙", category: "Bottoms", sizes: ["34","36","38","40"], colors: ["Denim","Black","Pink"] },
  { id: 107, name: "Strappy Heeled Sandals", price: 55.99, emoji: "👡", category: "Shoes", sizes: ["36","37","38","39","40"], colors: ["Nude","Black","White"] },
  { id: 108, name: "Gold Hoop Earrings", price: 19.99, emoji: "💍", category: "Accessories", sizes: ["One Size"], colors: ["Gold","Silver"] },
];

const LETTERS = [
  { id: 1, title: "The Day We Met", date: "January 14, 2023", preview: "💌", content: "From the very first moment I saw you, something shifted inside me — like the world had quietly rearranged itself to make room for something extraordinary.\n\nYour smile. The way you laughed. The little crinkle near your eyes. I was completely, hopelessly done for.\n\nI didn't know it then, but that was the best day of my life." },
  { id: 2, title: "Why I Love You", date: "Valentine's Day 2024", preview: "💕", content: "Let me count the ways — though I'd run out of paper long before I ran out of reasons.\n\nI love you for making me laugh until I can't breathe. For being brave when I'm scared. For caring so deeply about everything and everyone.\n\nI love you because you are the most extraordinary human being I have ever had the privilege of knowing. And somehow — impossibly — you chose me too." },
  { id: 3, title: "Our Future Together", date: "Today 🌟", preview: "🌙", content: "I think about our future and I can barely contain the joy of it.\n\nLazy Sunday mornings with coffee and nowhere to be. Adventures in cities we haven't visited yet. The quiet evenings that feel like everything.\n\nI don't know exactly what tomorrow holds, but I know I want to find out with you. Every single day. For the rest of my life." },
];

const MEMORIES = [
  { id: 1, date: "Jan 14, 2023", title: "First Date ✨", caption: "The little coffee shop where it all started. You were nervous. So was I. It was perfect.", emoji: "☕" },
  { id: 2, date: "Feb 14, 2023", title: "First Valentine's 💝", caption: "You showed up with flowers and I forgot every word I'd planned to say.", emoji: "🌹" },
  { id: 3, date: "May 20, 2023", title: "Paris Trip 🗼", caption: "We got lost three times and it was the best thing that ever happened.", emoji: "✈️" },
  { id: 4, date: "Aug 5, 2023", title: "The Picnic 🌸", caption: "You packed everything. I just showed up and ate all the strawberries.", emoji: "🧺" },
  { id: 5, date: "Dec 25, 2023", title: "First Christmas 🎄", caption: "Waking up next to you on Christmas morning — I'll never forget it.", emoji: "🎁" },
];

const SONGS = [
  { title: "Perfect", artist: "Ed Sheeran", ours: true },
  { title: "All of Me", artist: "John Legend", ours: false },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", ours: false },
  { title: "A Thousand Years", artist: "Christina Perri", ours: false },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", ours: false },
  { title: "Make You Feel My Love", artist: "Adele", ours: false },
];

const QUIZ = [
  { q: "What's my favourite food?", opts: ["Pizza 🍕","Sushi 🍣","Pasta 🍝","Tacos 🌮"], correct: 0 },
  { q: "Where was our first date?", opts: ["Restaurant 🍽️","Cinema 🎬","Coffee Shop ☕","Park 🌳"], correct: 2 },
  { q: "What's my biggest dream?", opts: ["Travel the world 🌍","Start a business 💼","Write a book 📚","Be with you forever 💞"], correct: 3 },
  { q: "What do I always say before bed?", opts: ["Good night!","Sweet dreams 💭","I love you ❤️","See you tomorrow!"], correct: 2 },
  { q: "Which one is *our* song?", opts: ["Shape of You","Perfect 💕","Blinding Lights","Stay"], correct: 1 },
];

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Dancing+Script:wght@600;700&family=Nunito:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --pink: #FFB7C5;
    --hot: #FF69B4;
    --deep: #FF1493;
    --blush: #FFF0F5;
    --cream: #FFFAF8;
    --text: #4A4A4A;
    --muted: #9B8B8B;
    --white: #FFFFFF;
    --shadow: 0 8px 32px rgba(255,105,180,0.15);
    --shadow-lg: 0 16px 48px rgba(255,105,180,0.25);
  }

  body { font-family: 'Quicksand', sans-serif; }

  .romantic-heading { font-family: 'Dancing Script', cursive; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-12px) rotate(3deg); }
    66% { transform: translateY(-6px) rotate(-2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255,105,180,0.4), 0 0 40px rgba(255,105,180,0.2); }
    50% { box-shadow: 0 0 30px rgba(255,105,180,0.8), 0 0 60px rgba(255,105,180,0.4); }
  }
  @keyframes bounce-in {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slide-up {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slide-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes heart-beat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.15); }
    50% { transform: scale(1); }
    75% { transform: scale(1.08); }
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes star-pop {
    0% { transform: scale(0) rotate(-20deg); }
    70% { transform: scale(1.3) rotate(10deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .float { animation: float 4s ease-in-out infinite; }
  .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .bounce-in { animation: bounce-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .slide-up { animation: slide-up 0.5s ease forwards; }
  .heart-beat { animation: heart-beat 1.5s ease-in-out infinite; }

  .card-hover {
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    cursor: pointer;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-lg);
  }

  .btn-primary {
    background: linear-gradient(135deg, #FF69B4, #FF1493);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 28px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255,20,147,0.3);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,20,147,0.4);
  }
  .btn-secondary {
    background: white;
    color: #FF1493;
    border: 2px solid #FFB7C5;
    border-radius: 50px;
    padding: 10px 24px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-secondary:hover {
    border-color: #FF69B4;
    background: #FFF0F5;
  }

  .glass {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,183,197,0.3);
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #FFF0F5; }
  ::-webkit-scrollbar-thumb { background: #FFB7C5; border-radius: 3px; }
`;

/* ─────────────────────────────────────────────
   FLOATING HEARTS BACKGROUND
───────────────────────────────────────────── */
function FloatingHeartsBackground() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 16 + Math.random() * 24,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.25,
    emoji: ["❤️","💕","💗","💖","💝","🌸"][i % 6],
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {hearts.map(h => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            bottom: "-50px",
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `confetti-fall ${h.duration}s ${h.delay}s ease-in infinite`,
            animationDirection: "reverse",
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOVE GATE
───────────────────────────────────────────── */
function LoveGate({ onYes }) {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: null, y: null });
  const [tooltip, setTooltip] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const canvasRef = useRef(null);

  const yesScale = Math.min(2.5, 1 + attempts * 0.25);
  const noScale = Math.max(0.25, 1 - attempts * 0.12);

  const tooltips = ["Are you sure? 🥺","Wrong answer! 💕","Try again? 😢","Please say yes! 💖","I'll cry 😭","Don't do this to me! 💔","..........","okay fine but 🥺","LAST CHANCE 💗","(you can't click me hehe)"];

  const handleNoEscape = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setTooltip(true);
    const margin = 80;
    setNoPos({
      x: margin + Math.random() * (window.innerWidth - margin * 2 - 100),
      y: margin + Math.random() * (window.innerHeight - margin * 2 - 50),
    });
    setTimeout(() => setTooltip(false), 1500);
  };

  const handleYes = () => {
    setShowExplosion(true);
    const canvas = canvasRef.current;
    if (!canvas) { setTimeout(onYes, 1200); return; }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const CX = window.innerWidth / 2;
    const CY = window.innerHeight / 2;

    const emojis = ["❤️","💕","💖","💗","💘","💝","🌸","✨","💫","🎉"];
    const particles = Array.from({ length: 100 }, () => ({
      x: CX, y: CY,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18 - 4,
      size: 20 + Math.random() * 30,
      opacity: 1,
      gravity: 0.2 + Math.random() * 0.3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Pink overlay
      ctx.fillStyle = `rgba(255,183,197,${Math.min(0.6, frame / 30)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
        p.opacity = Math.max(0, p.opacity - 0.008);
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, -p.size / 2, p.size / 2);
        ctx.restore();
      });
      frame++;
      if (frame < 160) requestAnimationFrame(animate);
      else { ctx.clearRect(0, 0, canvas.width, canvas.height); onYes(); }
    };
    animate();
  };

  const noStyle = {
    position: noPos.x !== null ? "fixed" : "relative",
    left: noPos.x !== null ? `${noPos.x}px` : "auto",
    top: noPos.y !== null ? `${noPos.y}px` : "auto",
    transform: `scale(${noScale})`,
    transition: "transform 0.3s ease, left 0.25s cubic-bezier(0.34,1.56,0.64,1), top 0.25s cubic-bezier(0.34,1.56,0.64,1)",
    background: "#E0E0E0",
    color: "#888",
    border: "none",
    borderRadius: "50px",
    padding: "12px 28px",
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    userSelect: "none",
    zIndex: 999,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #FFF0F5 0%, #FFE4EE 40%, #FFF8FB 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <FloatingHeartsBackground />

      {/* Big decorative hearts */}
      {["💖","💕","💗"].map((e, i) => (
        <div key={i} className="float" style={{
          position: "absolute",
          fontSize: ["80px","60px","50px"][i],
          opacity: 0.12,
          top: ["10%","70%","15%"][i],
          left: ["5%","85%","80%"][i],
          animationDelay: `${i * 1.5}s`,
          pointerEvents: "none",
        }}>{e}</div>
      ))}

      <div style={{ textAlign: "center", zIndex: 1, padding: "20px", maxWidth: "90vw" }}>
        {/* Big romantic emoji */}
        <div className="heart-beat" style={{ fontSize: "72px", marginBottom: "20px" }}>💌</div>

        {/* Title */}
        <h1 className="romantic-heading" style={{
          fontSize: "clamp(42px, 8vw, 80px)",
          color: "#FF1493",
          marginBottom: "8px",
          lineHeight: 1.2,
          textShadow: "0 4px 20px rgba(255,20,147,0.2)",
        }}>
          Do you love me?
        </h1>

        <p style={{
          fontSize: "clamp(14px, 2.5vw, 18px)",
          color: "#C4748E",
          marginBottom: "48px",
          fontWeight: 500,
        }}>
          Think very carefully before answering... 🥺
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {/* YES */}
          <button
            onClick={handleYes}
            className="pulse-glow"
            style={{
              background: "linear-gradient(135deg, #FF69B4, #FF1493)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "clamp(14px,3vw,20px) clamp(28px,5vw,48px)",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: `clamp(16px, 2vw, ${20 * yesScale}px)`,
              cursor: "pointer",
              transform: `scale(${yesScale})`,
              transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), font-size 0.3s ease",
              transformOrigin: "center",
              userSelect: "none",
              zIndex: 2,
              position: "relative",
            }}
          >
            Yes! 💗
          </button>

          {/* NO */}
          <div style={{ position: "relative" }}>
            {tooltip && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                border: "2px solid #FFB7C5",
                borderRadius: "12px",
                padding: "6px 14px",
                fontSize: "13px",
                color: "#FF69B4",
                fontWeight: 600,
                whiteSpace: "nowrap",
                zIndex: 1000,
                boxShadow: "0 4px 12px rgba(255,105,180,0.2)",
                animation: "bounce-in 0.3s ease",
              }}>
                {tooltips[Math.min(attempts - 1, tooltips.length - 1)]}
              </div>
            )}
            <button
              onMouseEnter={handleNoEscape}
              onClick={handleNoEscape}
              style={noStyle}
            >
              No 😐
            </button>
          </div>
        </div>

        {attempts > 2 && (
          <p style={{
            marginTop: "32px",
            fontSize: "13px",
            color: "#C4748E",
            opacity: 0.8,
            animation: "fade-in 0.5s ease",
          }}>
            {attempts < 6 ? "The answer you're looking for is on the left 💕" : "You can't escape the yes button 🌸"}
          </p>
        )}
      </div>

      {/* Canvas for heart explosion */}
      <canvas ref={canvasRef} style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: showExplosion ? "all" : "none",
        display: showExplosion ? "block" : "none",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "sweets", label: "Sweet Shop", icon: "🍭" },
  { id: "fashion", label: "Fashion", icon: "👗" },
  { id: "letters", label: "Love Letters", icon: "💌" },
  { id: "memories", label: "Memories", icon: "📸" },
  { id: "playlist", label: "Playlist", icon: "🎵" },
  { id: "countdown", label: "Countdown", icon: "⏳" },
  { id: "quiz", label: "Quiz", icon: "🎯" },
  { id: "admin", label: "Admin ✦", icon: "🔐" },
];

function Sidebar({ page, setPage, cartCount, setCartOpen }) {
  return (
    <div style={{
      width: 220,
      minHeight: "100vh",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid rgba(255,183,197,0.4)",
      display: "flex",
      flexDirection: "column",
      padding: "24px 0",
      position: "sticky",
      top: 0,
      boxShadow: "4px 0 24px rgba(255,105,180,0.08)",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center", padding: "0 20px 24px", borderBottom: "1px solid rgba(255,183,197,0.3)" }}>
        <div style={{ fontSize: "32px", marginBottom: "4px" }} className="heart-beat">💝</div>
        <h2 className="romantic-heading" style={{ color: "#FF1493", fontSize: "24px" }}>Love & Shop</h2>
        <p style={{ fontSize: "11px", color: "#C4748E", fontWeight: 500 }}>Just for you 🌸</p>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "11px 14px",
              marginBottom: "4px",
              borderRadius: "14px",
              border: "none",
              background: page === item.id
                ? "linear-gradient(135deg, #FFB7C5, #FF69B4)"
                : "transparent",
              color: page === item.id ? "white" : "#4A4A4A",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: page === item.id ? 700 : 500,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              textAlign: "left",
              boxShadow: page === item.id ? "0 4px 15px rgba(255,105,180,0.3)" : "none",
            }}
            onMouseEnter={e => { if (page !== item.id) e.currentTarget.style.background = "#FFF0F5"; }}
            onMouseLeave={e => { if (page !== item.id) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Cart button */}
      <div style={{ padding: "0 12px" }}>
        <button
          onClick={() => setCartOpen(true)}
          className="btn-primary"
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", position: "relative" }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              background: "#FF1493",
              color: "white",
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              fontSize: "12px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "bounce-in 0.3s ease",
            }}>{cartCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}

function BottomNav({ page, setPage, cartCount, setCartOpen }) {
  const visibleItems = NAV_ITEMS.filter(i => i.id !== "admin");
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,183,197,0.4)",
      display: "flex",
      padding: "8px 4px",
      zIndex: 100,
      boxShadow: "0 -4px 20px rgba(255,105,180,0.1)",
    }}>
      {visibleItems.slice(0, 5).map(item => (
        <button
          key={item.id}
          onClick={() => setPage(item.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            padding: "6px 2px",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: page === item.id ? "#FF1493" : "#B0A0A8",
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: page === item.id ? 700 : 500,
            fontSize: "10px",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: "22px", transform: page === item.id ? "scale(1.2)" : "scale(1)", transition: "transform 0.2s ease", display: "block" }}>
            {item.icon}
          </span>
          {item.label.split(" ")[0]}
        </button>
      ))}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "6px 2px",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "#FF1493",
          fontFamily: "'Quicksand', sans-serif",
          fontSize: "10px",
          position: "relative",
        }}
      >
        <span style={{ fontSize: "22px", display: "block" }}>🛒</span>
        Cart
        {cartCount > 0 && (
          <span style={{
            position: "absolute",
            top: "2px",
            right: "8px",
            background: "#FF1493",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            fontSize: "10px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>{cartCount}</span>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SWEET SHOP
───────────────────────────────────────────── */
function SweetShop({ addToCart }) {
  const [filter, setFilter] = useState("All");
  const [added, setAdded] = useState({});
  const categories = ["All", ...new Set(SWEETS.map(s => s.category))];

  const filtered = filter === "All" ? SWEETS : SWEETS.filter(s => s.category === filter);

  const handleAdd = (sweet) => {
    addToCart(sweet);
    setAdded(prev => ({ ...prev, [sweet.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [sweet.id]: false })), 1200);
  };

  return (
    <PageWrapper title="Sweet Shop 🍭" subtitle="Treat yourself, my love">
      {/* Category filter */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: "50px",
              border: "2px solid",
              borderColor: filter === cat ? "#FF69B4" : "#FFD6E8",
              background: filter === cat ? "linear-gradient(135deg,#FFB7C5,#FF69B4)" : "white",
              color: filter === cat ? "white" : "#C4748E",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {filtered.map((sweet, i) => (
          <div
            key={sweet.id}
            className="card-hover"
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "var(--shadow)",
              border: "1px solid rgba(255,183,197,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              animation: `slide-up 0.4s ease ${i * 0.05}s both`,
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "12px", animation: "float 4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}>
              {sweet.emoji}
            </div>
            <h3 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px", color: "#4A4A4A" }}>{sweet.name}</h3>
            <p style={{ fontSize: "12px", color: "#B0A0A8", marginBottom: "12px" }}>{sweet.desc}</p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#FF69B4", marginBottom: "14px" }}>€{sweet.price.toFixed(2)}</p>
            <button
              onClick={() => handleAdd(sweet)}
              className="btn-primary"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "13px",
                background: added[sweet.id]
                  ? "linear-gradient(135deg,#66BB6A,#43A047)"
                  : "linear-gradient(135deg,#FF69B4,#FF1493)",
                transition: "all 0.3s ease",
              }}
            >
              {added[sweet.id] ? "Added! ✓" : "Add to Cart 🛒"}
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   FASHION
───────────────────────────────────────────── */
function Fashion({ addToCart }) {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState({});
  const categories = ["All", ...new Set(FASHION.map(f => f.category))];

  const filtered = filter === "All" ? FASHION : FASHION.filter(f => f.category === filter);

  const handleAdd = (item, size) => {
    if (!size) return alert("Please select a size! 💕");
    addToCart({ ...item, emoji: item.emoji }, size);
    setAdded(prev => ({ ...prev, [item.id + size]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [item.id + size]: false })), 1200);
  };

  return (
    <PageWrapper title="Fashion ✨" subtitle="Because you deserve to look amazing">
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: "50px",
              border: "2px solid",
              borderColor: filter === cat ? "#FF69B4" : "#FFD6E8",
              background: filter === cat ? "linear-gradient(135deg,#FFB7C5,#FF69B4)" : "white",
              color: filter === cat ? "white" : "#C4748E",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="card-hover"
            style={{
              background: "white",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "var(--shadow)",
              border: "1px solid rgba(255,183,197,0.3)",
              animation: `slide-up 0.4s ease ${i * 0.05}s both`,
            }}
          >
            {/* Product image area */}
            <div style={{
              height: "200px",
              background: `linear-gradient(135deg, #FFF0F5, #FFE4EE)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "72px",
              position: "relative",
              overflow: "hidden",
            }}>
              <span style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>{item.emoji}</span>
              <div style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "white",
                borderRadius: "8px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF1493",
                boxShadow: "0 2px 8px rgba(255,20,147,0.15)",
              }}>
                {item.category}
              </div>
            </div>

            <div style={{ padding: "16px" }}>
              <h3 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{item.name}</h3>
              <p style={{ fontSize: "13px", color: "#B0A0A8", marginBottom: "10px" }}>
                {item.colors.join(" · ")}
              </p>

              {/* Size selector */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                {item.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedItem === item.id && selectedSize === sz ? null : sz)}
                    onMouseEnter={() => setSelectedItem(item.id)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "8px",
                      border: "1.5px solid",
                      borderColor: selectedItem === item.id && selectedSize === sz ? "#FF69B4" : "#FFD6E8",
                      background: selectedItem === item.id && selectedSize === sz ? "#FFF0F5" : "white",
                      color: selectedItem === item.id && selectedSize === sz ? "#FF1493" : "#888",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Quicksand',sans-serif",
                      transition: "all 0.15s ease",
                    }}
                    onClick={() => {
                      setSelectedItem(item.id);
                      setSelectedSize(sz);
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#FF69B4" }}>€{item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAdd(item, selectedItem === item.id ? selectedSize : null)}
                  className="btn-primary"
                  style={{
                    padding: "9px 16px",
                    fontSize: "13px",
                    background: added[item.id + selectedSize]
                      ? "linear-gradient(135deg,#66BB6A,#43A047)"
                      : "linear-gradient(135deg,#FF69B4,#FF1493)",
                  }}
                >
                  {added[item.id + selectedSize] ? "✓" : "Add 🛒"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   LOVE LETTERS
───────────────────────────────────────────── */
function LoveLetters() {
  const [openLetter, setOpenLetter] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [sentNotes, setSentNotes] = useState([]);

  const handleSendNote = () => {
    if (!noteText.trim()) return;
    setSentNotes(prev => [...prev, { text: noteText, date: new Date().toLocaleDateString() }]);
    setNoteText("");
    setNoteSent(true);
    setTimeout(() => setNoteSent(false), 3000);
  };

  return (
    <PageWrapper title="Love Letters 💌" subtitle="Words from my heart to yours">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {LETTERS.map((letter, i) => (
          <div
            key={letter.id}
            className="card-hover"
            onClick={() => setOpenLetter(openLetter === letter.id ? null : letter.id)}
            style={{
              background: openLetter === letter.id
                ? "linear-gradient(135deg,#FFF0F5,#FFE4EE)"
                : "white",
              borderRadius: "20px",
              padding: "24px",
              boxShadow: "var(--shadow)",
              border: `2px solid ${openLetter === letter.id ? "#FFB7C5" : "rgba(255,183,197,0.3)"}`,
              animation: `slide-up 0.4s ease ${i * 0.1}s both`,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "48px", animation: "heart-beat 2s ease-in-out infinite" }}>{letter.preview}</div>
            </div>
            <h3 className="romantic-heading" style={{ fontSize: "22px", color: "#FF1493", marginBottom: "4px", textAlign: "center" }}>
              {letter.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#C4748E", textAlign: "center", marginBottom: "12px" }}>{letter.date}</p>

            {openLetter === letter.id && (
              <div style={{ animation: "slide-up 0.3s ease" }}>
                <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg,#FFB7C5,#FF69B4)", margin: "0 auto 16px", borderRadius: "2px" }} />
                {letter.content.split("\n\n").map((para, j) => (
                  <p key={j} style={{ fontSize: "14px", lineHeight: "1.8", color: "#4A4A4A", marginBottom: "12px", fontStyle: "italic" }}>
                    {para}
                  </p>
                ))}
              </div>
            )}

            <p style={{ textAlign: "center", fontSize: "12px", color: "#C4748E", marginTop: "8px" }}>
              {openLetter === letter.id ? "Click to close 💕" : "Click to read 💌"}
            </p>
          </div>
        ))}
      </div>

      {/* Write a note back */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "var(--shadow)",
        border: "2px solid rgba(255,183,197,0.3)",
      }}>
        <h3 className="romantic-heading" style={{ fontSize: "26px", color: "#FF1493", marginBottom: "8px" }}>
          Write me a note back 🌸
        </h3>
        <p style={{ fontSize: "14px", color: "#C4748E", marginBottom: "16px" }}>I'll treasure every word 💕</p>
        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Dearest love..."
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "16px",
            borderRadius: "14px",
            border: "2px solid #FFD6E8",
            fontFamily: "'Quicksand', sans-serif",
            fontSize: "14px",
            color: "#4A4A4A",
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.2s ease",
            lineHeight: 1.7,
          }}
          onFocus={e => e.target.style.borderColor = "#FF69B4"}
          onBlur={e => e.target.style.borderColor = "#FFD6E8"}
        />
        <button
          onClick={handleSendNote}
          className="btn-primary"
          style={{ marginTop: "12px" }}
        >
          Send with love 💌
        </button>
        {noteSent && (
          <p style={{ color: "#FF69B4", fontSize: "14px", marginTop: "10px", animation: "bounce-in 0.4s ease", fontWeight: 600 }}>
            💕 Message saved to our love vault!
          </p>
        )}

        {sentNotes.map((note, i) => (
          <div key={i} style={{
            marginTop: "12px",
            padding: "14px",
            background: "#FFF0F5",
            borderRadius: "12px",
            fontSize: "14px",
            color: "#4A4A4A",
            fontStyle: "italic",
            borderLeft: "3px solid #FF69B4",
          }}>
            <p>"{note.text}"</p>
            <p style={{ fontSize: "11px", color: "#C4748E", marginTop: "4px" }}>{note.date}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   MEMORIES
───────────────────────────────────────────── */
function Memories() {
  return (
    <PageWrapper title="Our Memories 📸" subtitle="Every moment with you is a treasure">
      <div style={{ position: "relative", paddingLeft: "32px" }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute",
          left: "12px",
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(180deg,#FFB7C5,#FF69B4,#FFB7C5)",
          borderRadius: "2px",
        }} />

        {MEMORIES.map((mem, i) => (
          <div
            key={mem.id}
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "28px",
              animation: `slide-up 0.5s ease ${i * 0.1}s both`,
            }}
          >
            {/* Timeline dot */}
            <div style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#FF69B4,#FF1493)",
              border: "3px solid white",
              boxShadow: "0 0 0 3px #FFB7C5",
              flexShrink: 0,
              marginLeft: "-44px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }} />

            {/* Polaroid card */}
            <div
              className="card-hover"
              style={{
                background: "white",
                borderRadius: "4px",
                padding: "16px 16px 24px",
                boxShadow: `var(--shadow), ${i % 2 === 0 ? "3px 3px 0 #FFD6E8" : "-3px 3px 0 #FFD6E8"}`,
                transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)`,
                maxWidth: "340px",
                border: "1px solid rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "rotate(0deg) scale(1.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = `rotate(${i % 2 === 0 ? 1 : -1}deg) scale(1)`; }}
            >
              <div style={{
                height: "140px",
                background: `linear-gradient(135deg, ${["#FFF0F5","#FFF8E7","#F0FFF4","#F0F8FF","#FFF5F0"][i % 5]}, #FFE4EE)`,
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "60px",
                marginBottom: "12px",
              }}>
                {mem.emoji}
              </div>
              <p style={{ fontSize: "11px", color: "#C4748E", marginBottom: "4px", fontWeight: 600 }}>{mem.date}</p>
              <h3 style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px", color: "#FF1493" }}>{mem.title}</h3>
              <p style={{ fontSize: "13px", color: "#888", fontStyle: "italic", lineHeight: 1.5 }}>{mem.caption}</p>
              <div style={{ marginTop: "10px", fontSize: "18px" }}>❤️ 💕 🌸</div>
            </div>
          </div>
        ))}

        <div style={{
          marginLeft: "0",
          background: "linear-gradient(135deg,#FFF0F5,white)",
          borderRadius: "20px",
          padding: "20px",
          border: "2px dashed #FFB7C5",
          textAlign: "center",
          animation: "slide-up 0.5s ease 0.6s both",
        }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📸</div>
          <p style={{ color: "#C4748E", fontWeight: 600, fontSize: "14px" }}>More memories coming soon 💕</p>
          <p style={{ color: "#C4748E", fontSize: "12px", marginTop: "4px" }}>Every day is a new chapter</p>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   PLAYLIST
───────────────────────────────────────────── */
function Playlist() {
  const [playing, setPlaying] = useState(null);

  return (
    <PageWrapper title="Our Playlist 🎵" subtitle="Songs that remind me of you">
      {/* Music note floating */}
      <div style={{ position: "relative" }}>
        {["🎵","🎶","🎼","🎵"].map((note, i) => (
          <div key={i} style={{
            position: "absolute",
            fontSize: "24px",
            opacity: 0.12,
            top: `${i * 25}%`,
            right: `${i * 8}%`,
            animation: `float ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
            pointerEvents: "none",
          }}>{note}</div>
        ))}

        {SONGS.map((song, i) => (
          <div
            key={i}
            onClick={() => setPlaying(playing === i ? null : i)}
            className="card-hover"
            style={{
              background: playing === i ? "linear-gradient(135deg,#FFF0F5,#FFE4EE)" : "white",
              borderRadius: "16px",
              padding: "16px 20px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "var(--shadow)",
              border: `2px solid ${playing === i ? "#FFB7C5" : "rgba(255,183,197,0.3)"}`,
              animation: `slide-up 0.4s ease ${i * 0.08}s both`,
              transition: "all 0.25s ease",
            }}
          >
            {/* Play button */}
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: playing === i
                ? "linear-gradient(135deg,#FF69B4,#FF1493)"
                : "linear-gradient(135deg,#FFB7C5,#FF69B4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(255,105,180,0.3)",
              animation: playing === i ? "pulse-glow 1.5s ease-in-out infinite" : "none",
            }}>
              {playing === i ? "⏸" : "▶"}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#4A4A4A" }}>{song.title}</h3>
                {song.ours && (
                  <span style={{
                    background: "linear-gradient(135deg,#FF69B4,#FF1493)",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "50px",
                    whiteSpace: "nowrap",
                  }}>Our Song 💕</span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "#B0A0A8" }}>{song.artist}</p>
            </div>

            {/* Fake waveform */}
            {playing === i && (
              <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "32px" }}>
                {Array.from({ length: 8 }).map((_, b) => (
                  <div key={b} style={{
                    width: "3px",
                    background: "linear-gradient(180deg,#FF69B4,#FFB7C5)",
                    borderRadius: "2px",
                    animation: `spin-slow ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                    height: `${10 + Math.random() * 22}px`,
                  }} />
                ))}
              </div>
            )}

            <div style={{ fontSize: "20px" }}>🎵</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "24px",
        padding: "20px",
        background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
        borderRadius: "20px",
        textAlign: "center",
        border: "2px solid rgba(255,183,197,0.4)",
      }}>
        <p style={{ fontSize: "14px", color: "#C4748E", fontStyle: "italic" }}>
          💕 Every song on here makes me think of you. Especially the first one.
        </p>
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   COUNTDOWN
───────────────────────────────────────────── */
function Countdown() {
  const START_DATE = new Date("2023-01-14");
  const ANNIVERSARY = new Date("2026-01-14");
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date(time);
  const msTogetherTotal = now - START_DATE;
  const daysTogetherTotal = Math.floor(msTogetherTotal / 86400000);
  const hours = Math.floor((msTogetherTotal % 86400000) / 3600000);
  const minutes = Math.floor((msTogetherTotal % 3600000) / 60000);
  const seconds = Math.floor((msTogetherTotal % 60000) / 1000);

  const msToAnniversary = ANNIVERSARY - now;
  const daysToAnniversary = Math.max(0, Math.ceil(msToAnniversary / 86400000));

  const FlipUnit = ({ value, label }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: "linear-gradient(180deg,white 50%,#FFF0F5 50%)",
        borderRadius: "12px",
        padding: "16px 20px",
        boxShadow: "0 4px 12px rgba(255,105,180,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
        border: "1px solid rgba(255,183,197,0.4)",
        minWidth: "70px",
        marginBottom: "8px",
      }}>
        <span style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(32px,6vw,48px)",
          fontWeight: 700,
          color: "#FF1493",
          display: "block",
          lineHeight: 1,
        }}>
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p style={{ fontSize: "11px", fontWeight: 600, color: "#C4748E", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
    </div>
  );

  return (
    <PageWrapper title="Our Timeline ⏳" subtitle="Every second counts">
      {/* Days together */}
      <div style={{
        background: "linear-gradient(135deg,#FF69B4,#FF1493)",
        borderRadius: "24px",
        padding: "32px",
        textAlign: "center",
        marginBottom: "24px",
        boxShadow: "0 8px 32px rgba(255,20,147,0.3)",
        color: "white",
        animation: "slide-up 0.5s ease",
      }}>
        <div className="heart-beat" style={{ fontSize: "48px", marginBottom: "12px" }}>💑</div>
        <p style={{ fontSize: "16px", fontWeight: 600, opacity: 0.9, marginBottom: "8px" }}>Together for</p>
        <p className="romantic-heading" style={{ fontSize: "clamp(48px,10vw,80px)", fontWeight: 700, lineHeight: 1, marginBottom: "8px" }}>
          {daysTogetherTotal.toLocaleString()}
        </p>
        <p style={{ fontSize: "20px", fontWeight: 600, opacity: 0.9 }}>beautiful days</p>
      </div>

      {/* Live counter */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        marginBottom: "20px",
        boxShadow: "var(--shadow)",
        border: "2px solid rgba(255,183,197,0.3)",
      }}>
        <h3 style={{ textAlign: "center", fontWeight: 700, color: "#FF1493", marginBottom: "20px", fontSize: "16px" }}>
          ⏱ Live Ticker
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <FlipUnit value={hours} label="Hours" />
          <div style={{ fontSize: "28px", color: "#FF69B4", alignSelf: "center", marginTop: "-20px", animation: "blink 1s step-end infinite" }}>:</div>
          <FlipUnit value={minutes} label="Mins" />
          <div style={{ fontSize: "28px", color: "#FF69B4", alignSelf: "center", marginTop: "-20px", animation: "blink 1s step-end infinite" }}>:</div>
          <FlipUnit value={seconds} label="Secs" />
        </div>
        <p style={{ textAlign: "center", fontSize: "13px", color: "#C4748E", marginTop: "16px" }}>Since 14th January, 2023 💕</p>
      </div>

      {/* Anniversary countdown */}
      <div style={{
        background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
        borderRadius: "20px",
        padding: "24px",
        textAlign: "center",
        border: "2px solid rgba(255,183,197,0.4)",
        animation: "slide-up 0.5s ease 0.2s both",
      }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎂</div>
        <h3 style={{ fontWeight: 700, color: "#FF1493", fontSize: "18px", marginBottom: "4px" }}>Next Anniversary</h3>
        <p style={{ fontSize: "13px", color: "#C4748E", marginBottom: "16px" }}>January 14, 2026 💝</p>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg,#FF69B4,#FF1493)",
          borderRadius: "16px",
          padding: "16px 32px",
          color: "white",
        }}>
          <span className="romantic-heading" style={{ fontSize: "48px", display: "block", lineHeight: 1 }}>
            {daysToAnniversary}
          </span>
          <span style={{ fontSize: "14px", fontWeight: 600, opacity: 0.9 }}>days to go 🌟</span>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   QUIZ
───────────────────────────────────────────── */
function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);

  const q = QUIZ[current];

  const handleAnswer = (idx) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === q.correct) {
      setScore(prev => prev + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
    setTimeout(() => {
      if (current + 1 < QUIZ.length) {
        setCurrent(prev => prev + 1);
        setAnswered(null);
      } else {
        setDone(true);
      }
    }, 1200);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setAnswered(null);
    setDone(false);
  };

  const scoreMessages = [
    "We need to spend more time together! 😅",
    "You know me a little 🥰",
    "Pretty good! You pay attention 💕",
    "Amazing! You know me so well! 💖",
    "PERFECT SCORE! You know me better than anyone! 💝💝💝",
  ];

  return (
    <PageWrapper title="How Well Do You Know Me? 🎯" subtitle="Let's find out!">
      {!done ? (
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          {/* Progress */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#C4748E", fontWeight: 600 }}>Question {current + 1} of {QUIZ.length}</span>
              <span style={{ fontSize: "13px", color: "#FF1493", fontWeight: 700 }}>Score: {score} 💗</span>
            </div>
            <div style={{ height: "8px", background: "#FFE4EE", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${((current) / QUIZ.length) * 100}%`,
                background: "linear-gradient(90deg,#FFB7C5,#FF69B4)",
                borderRadius: "4px",
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>

          {/* Question */}
          <div
            style={{
              background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "20px",
              textAlign: "center",
              border: "2px solid rgba(255,183,197,0.4)",
              animation: shake ? "none" : "bounce-in 0.4s ease",
              transform: shake ? "translateX(-6px)" : "none",
              transition: "transform 0.1s ease",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🤔</div>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(16px,3vw,22px)", color: "#4A4A4A", lineHeight: 1.4 }}>{q.q}</h2>
          </div>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {q.opts.map((opt, idx) => {
              let bg = "white";
              let border = "rgba(255,183,197,0.4)";
              let color = "#4A4A4A";
              if (answered !== null) {
                if (idx === q.correct) { bg = "#E8F5E9"; border = "#66BB6A"; color = "#2E7D32"; }
                else if (idx === answered) { bg = "#FFEBEE"; border = "#EF5350"; color = "#C62828"; }
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    padding: "16px",
                    borderRadius: "16px",
                    border: `2px solid ${border}`,
                    background: bg,
                    color,
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: answered !== null ? "default" : "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={e => { if (answered === null) e.currentTarget.style.borderColor = "#FF69B4"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,183,197,0.4)"; e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", animation: "bounce-in 0.6s ease" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>{score === QUIZ.length ? "🏆" : score >= 3 ? "🌟" : "💕"}</div>
          <h2 className="romantic-heading" style={{ fontSize: "clamp(28px,6vw,48px)", color: "#FF1493", marginBottom: "12px" }}>
            {score}/{QUIZ.length} correct!
          </h2>
          <div style={{
            background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
            borderRadius: "20px",
            padding: "24px",
            border: "2px solid rgba(255,183,197,0.4)",
            marginBottom: "24px",
          }}>
            <p style={{ fontSize: "clamp(14px,2.5vw,18px)", color: "#4A4A4A", lineHeight: 1.6, fontStyle: "italic" }}>
              {scoreMessages[Math.min(score, scoreMessages.length - 1)]}
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={reset} className="btn-primary">Try again! 🎯</button>
          </div>
          {/* Confetti */}
          {score === QUIZ.length && Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: "fixed",
              top: "-20px",
              left: `${Math.random() * 100}%`,
              width: "8px",
              height: "8px",
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: ["#FF69B4","#FFD700","#FF1493","#FFB7C5","#FF6B9D"][i % 5],
              animation: `confetti-fall ${2 + Math.random() * 2}s ${Math.random() * 2}s ease-in forwards`,
              zIndex: 999,
              pointerEvents: "none",
            }} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   ADMIN PANEL
───────────────────────────────────────────── */
function AdminPanel({ orders }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statuses, setStatuses] = useState({});

  const handleLogin = () => {
    if (pw.toLowerCase() === "iloveyou" || pw === "💕") {
      setUnlocked(true);
      setErr(false);
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };

  if (!unlocked) {
    return (
      <PageWrapper title="Admin Panel 🔐" subtitle="">
        <div style={{ maxWidth: "360px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "72px", marginBottom: "20px" }} className="float">🔐</div>
          <h3 style={{ fontWeight: 700, fontSize: "18px", marginBottom: "8px" }}>Protected Route</h3>
          <p style={{ color: "#C4748E", marginBottom: "24px", fontSize: "14px" }}>Hint: what do you say to me? 💕</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Enter the magic words..."
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "14px",
              border: `2px solid ${err ? "#EF5350" : "#FFD6E8"}`,
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "15px",
              outline: "none",
              marginBottom: "12px",
              transition: "border-color 0.2s ease",
              textAlign: "center",
            }}
          />
          {err && <p style={{ color: "#EF5350", fontSize: "13px", marginBottom: "8px" }}>Wrong password 🥺 Try harder!</p>}
          <button onClick={handleLogin} className="btn-primary" style={{ width: "100%" }}>
            Unlock 🔓
          </button>
        </div>
      </PageWrapper>
    );
  }

  const updateStatus = (orderId, status) => {
    setStatuses(prev => ({ ...prev, [orderId]: status }));
  };

  const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);

  return (
    <PageWrapper title="Admin Dashboard 🎀" subtitle="Manage her wishes 💕">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Total Orders", value: orders.length, emoji: "📦" },
          { label: "Items Wished", value: totalItems, emoji: "🌸" },
          { label: "Pending", value: orders.filter(o => !statuses[o.id]).length, emoji: "⏳" },
          { label: "Love Level", value: "100%", emoji: "💖" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px",
            textAlign: "center",
            boxShadow: "var(--shadow)",
            border: "1px solid rgba(255,183,197,0.3)",
            animation: `slide-up 0.4s ease ${i * 0.1}s both`,
          }}>
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>{stat.emoji}</div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#FF1493" }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "#B0A0A8", fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h3 style={{ fontWeight: 700, fontSize: "18px", color: "#FF1493", marginBottom: "16px" }}>
        Incoming Wishes 💌 {orders.length > 0 && (
          <span style={{ fontSize: "13px", background: "#FF1493", color: "white", borderRadius: "50px", padding: "2px 10px", marginLeft: "8px" }}>
            {orders.length} new
          </span>
        )}
      </h3>

      {orders.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "48px 24px",
          background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
          borderRadius: "20px",
          border: "2px dashed rgba(255,183,197,0.5)",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#C4748E", fontWeight: 600 }}>No orders yet</p>
          <p style={{ color: "#C4748E", fontSize: "13px", marginTop: "4px" }}>She hasn't shopped yet — hint hint! 💕</p>
        </div>
      ) : (
        orders.map((order, i) => (
          <div key={order.id} style={{
            background: "white",
            borderRadius: "16px",
            padding: "16px 20px",
            marginBottom: "12px",
            boxShadow: "var(--shadow)",
            border: "2px solid rgba(255,183,197,0.3)",
            animation: `slide-up 0.4s ease ${i * 0.08}s both`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <h4 style={{ fontWeight: 700, color: "#4A4A4A" }}>Order #{String(order.id).slice(-4)}</h4>
                <p style={{ fontSize: "12px", color: "#B0A0A8" }}>{order.date} · €{order.total.toFixed(2)}</p>
              </div>
              <select
                value={statuses[order.id] || "Pending"}
                onChange={e => updateStatus(order.id, e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "10px",
                  border: "2px solid #FFD6E8",
                  background: "white",
                  fontFamily: "'Quicksand',sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#FF1493",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option>Pending</option>
                <option>Ordered ✓</option>
                <option>Delivered 🎉</option>
                <option>Surprise Planned 🎁</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedOrder(selectedOrder === i ? null : i)}
              style={{
                fontSize: "13px",
                color: "#FF69B4",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Quicksand',sans-serif",
                fontWeight: 600,
                padding: 0,
              }}
            >
              {selectedOrder === i ? "Hide items ▲" : `View ${order.items.length} item(s) ▼`}
            </button>

            {selectedOrder === i && (
              <div style={{ marginTop: "12px", animation: "slide-up 0.3s ease" }}>
                {order.items.map((item, j) => (
                  <div key={j} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#FFF8FB",
                    borderRadius: "10px",
                    marginBottom: "6px",
                    fontSize: "13px",
                  }}>
                    <span>{item.emoji} {item.name}{item.size ? ` (${item.size})` : ""}</span>
                    <span style={{ fontWeight: 700, color: "#FF69B4" }}>×{item.qty} · €{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "8px",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#FF1493",
                }}>
                  Total: €{order.total.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────────── */
function CartDrawer({ cart, removeFromCart, cartTotal, onClose, onOrder }) {
  const [confirmed, setConfirmed] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    if (!confirmed) { setConfirmed(true); return; }
    onOrder();
    setOrdered(true);
    setTimeout(() => { setOrdered(false); setConfirmed(false); }, 3000);
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
        zIndex: 200, backdropFilter: "blur(4px)", animation: "fade-in 0.2s ease",
      }} />

      {/* Drawer */}
      <div style={{
        position: "fixed",
        right: 0, top: 0, bottom: 0,
        width: "min(400px, 100vw)",
        background: "white",
        zIndex: 201,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-8px 0 32px rgba(255,105,180,0.2)",
        animation: "slide-right 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,183,197,0.4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
        }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "20px", color: "#FF1493" }}>🛒 Your Wishlist</h2>
            <p style={{ fontSize: "13px", color: "#C4748E" }}>{cart.reduce((s, i) => s + i.qty, 0)} items</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#C4748E" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: "60px", marginBottom: "12px" }}>🛒</div>
              <p style={{ color: "#C4748E", fontWeight: 600 }}>Nothing in your wishlist yet</p>
              <p style={{ color: "#C4748E", fontSize: "13px", marginTop: "4px" }}>Go explore the shop! 🌸</p>
            </div>
          ) : cart.map((item, i) => (
            <div key={`${item.id}-${item.size}`} style={{
              display: "flex",
              gap: "12px",
              padding: "12px",
              background: i % 2 === 0 ? "#FFF8FB" : "white",
              borderRadius: "14px",
              marginBottom: "8px",
              alignItems: "center",
            }}>
              <div style={{ fontSize: "32px", flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: "14px", color: "#4A4A4A" }}>{item.name}</p>
                <p style={{ fontSize: "12px", color: "#B0A0A8" }}>
                  {item.size ? `Size: ${item.size} · ` : ""}€{item.price.toFixed(2)} × {item.qty}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700, color: "#FF69B4", fontSize: "15px" }}>€{(item.price * item.qty).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  style={{ background: "none", border: "none", color: "#EF9A9A", fontSize: "12px", cursor: "pointer", fontFamily: "'Quicksand',sans-serif", fontWeight: 600 }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: "20px 24px",
            borderTop: "1px solid rgba(255,183,197,0.4)",
            background: "linear-gradient(135deg,#FFF0F5,#FFE4EE)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontWeight: 600, color: "#4A4A4A" }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: "20px", color: "#FF1493" }}>€{cartTotal.toFixed(2)}</span>
            </div>

            {ordered ? (
              <div style={{ textAlign: "center", animation: "bounce-in 0.4s ease" }}>
                <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
                <p style={{ fontWeight: 700, color: "#FF1493", fontSize: "16px" }}>Order sent to your love! 💘</p>
                <p style={{ fontSize: "13px", color: "#C4748E", marginTop: "4px" }}>He'll take care of it 💕</p>
              </div>
            ) : (
              <>
                {confirmed && (
                  <p style={{ textAlign: "center", color: "#C4748E", fontSize: "14px", marginBottom: "12px", animation: "slide-up 0.3s ease" }}>
                    Are you sure you want to spoil me? 🥰
                  </p>
                )}
                <button onClick={handleOrder} className="btn-primary" style={{ width: "100%", fontSize: "15px", padding: "14px" }}>
                  {confirmed ? "Yes, send it! 💝" : "Buy / Order for Me 💌"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE WRAPPER
───────────────────────────────────────────── */
function PageWrapper({ title, subtitle, children }) {
  return (
    <div style={{ padding: "clamp(16px,3vw,32px)", maxWidth: "960px", margin: "0 auto", animation: "slide-up 0.4s ease" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 className="romantic-heading" style={{
          fontSize: "clamp(28px,5vw,44px)",
          color: "#FF1493",
          lineHeight: 1.2,
          textShadow: "0 4px 20px rgba(255,20,147,0.15)",
        }}>{title}</h1>
        {subtitle && <p style={{ color: "#C4748E", fontWeight: 500, fontSize: "clamp(13px,2vw,16px)", marginTop: "4px" }}>{subtitle}</p>}
        <div style={{ width: "60px", height: "4px", background: "linear-gradient(90deg,#FFB7C5,#FF69B4)", borderRadius: "2px", marginTop: "12px" }} />
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
function MainApp() {
  const [page, setPage] = useState("sweets");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const addToCart = (product, size = null) => {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => `${i.id}-${i.size}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1, size }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const placeOrder = () => {
    setOrders(prev => [...prev, {
      id: Date.now(),
      items: [...cart],
      total: cartTotal,
      date: new Date().toLocaleDateString(),
    }]);
    setCart([]);
  };

  const pages = {
    sweets: <SweetShop addToCart={addToCart} />,
    fashion: <Fashion addToCart={addToCart} />,
    letters: <LoveLetters />,
    memories: <Memories />,
    playlist: <Playlist />,
    countdown: <Countdown />,
    quiz: <Quiz />,
    admin: <AdminPanel orders={orders} />,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg,#FFF0F5 0%,#FFFAF8 50%,#FFF0F5 100%)",
      fontFamily: "'Quicksand',sans-serif",
      display: "flex",
    }}>
      <FloatingHeartsBackground />

      {/* Sidebar on desktop */}
      {!isMobile && (
        <Sidebar page={page} setPage={setPage} cartCount={cartCount} setCartOpen={setCartOpen} />
      )}

      {/* Main content */}
      <main style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: isMobile ? "80px" : "0",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}>
        {pages[page] || pages.sweets}
      </main>

      {/* Bottom nav on mobile */}
      {isMobile && (
        <BottomNav page={page} setPage={setPage} cartCount={cartCount} setCartOpen={setCartOpen} />
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onOrder={placeOrder}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function App() {
  const [phase, setPhase] = useState("gate");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      {phase === "gate"
        ? <LoveGate onYes={() => setPhase("main")} />
        : <MainApp />
      }
    </>
  );
}
