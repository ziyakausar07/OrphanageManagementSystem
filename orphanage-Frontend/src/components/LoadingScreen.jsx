import React from "react";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

        .sch-loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 35%, #fffbf5 0%, #fff3e2 45%, #fed7aa 100%);
          font-family: 'Poppins', sans-serif;
          backdrop-filter: blur(10px);
          animation: sch-fade-in 0.3s ease-out;
        }

        /* ── Ambient Glow Ring ── */
        .sch-logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .sch-ambient-glow {
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.32) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 75%);
          filter: blur(12px);
          animation: sch-pulse-glow 2.8s ease-in-out infinite;
        }

        /* Rotating Halo Ring */
        .sch-orbit-ring {
          position: absolute;
          width: 154px;
          height: 154px;
          border-radius: 50%;
          border: 2px dashed rgba(249, 115, 22, 0.45);
          animation: sch-spin 12s linear infinite;
        }

        .sch-orbit-ring-reverse {
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          border: 1.5px solid rgba(234, 88, 12, 0.18);
          border-top-color: #f97316;
          border-right-color: #10b981;
          animation: sch-spin-reverse 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* ── Logo Container ── */
        .sch-logo-circle {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 16px 36px rgba(234, 88, 12, 0.22),
            0 4px 12px rgba(0, 0, 0, 0.06),
            inset 0 0 0 4px rgba(255, 247, 237, 0.9);
          position: relative;
          z-index: 2;
          overflow: hidden;
          transition: transform 0.3s ease;
          animation: sch-float 3s ease-in-out infinite;
        }

        .sch-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
        }

        /* ── Brand Typography ── */
        .sch-brand-title {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-align: center;
          background: linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          text-shadow: 0 2px 10px rgba(154, 52, 18, 0.08);
        }

        .sch-brand-tagline {
          font-family: 'Inter', sans-serif;
          margin-top: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #c2410c;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          opacity: 0.88;
        }

        /* ── Loading Message Card ── */
        .sch-loader-box {
          margin-top: 26px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 24px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 999px;
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.12);
        }

        .sch-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .sch-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          animation: sch-dot-wave 1.4s ease-in-out infinite;
        }

        .sch-dot:nth-child(2) { animation-delay: 0.18s; }
        .sch-dot:nth-child(3) { animation-delay: 0.36s; }

        .sch-loading-msg {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #7c2d12;
          letter-spacing: 0.2px;
        }

        /* ── Keyframes ── */
        @keyframes sch-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes sch-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        @keyframes sch-pulse-glow {
          0%, 100% { transform: scale(0.96); opacity: 0.55; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }

        @keyframes sch-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sch-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes sch-dot-wave {
          0%, 80%, 100% {
            transform: scale(0.65);
            opacity: 0.45;
          }
          40% {
            transform: scale(1.35);
            opacity: 1;
          }
        }
      `}</style>

      <div className="sch-loading-overlay">
        <div className="sch-logo-wrapper">
          <div className="sch-ambient-glow" />
          <div className="sch-orbit-ring" />
          <div className="sch-orbit-ring-reverse" />
          <div className="sch-logo-circle">
            <img
              src="/sushanti_logo.png"
              alt="Sushanti Children Home Logo"
              className="sch-logo-img"
              onError={(e) => {
                // Fallback if image path differs
                e.target.onerror = null;
                e.target.src = "/src/assets/sushanti_logo.png";
              }}
            />
          </div>
        </div>

        <h2 className="sch-brand-title">SUSHANTI CHILDREN HOME</h2>
        <div className="sch-brand-tagline">A Place of Love, Hope & Care</div>

        <div className="sch-loader-box">
          <div className="sch-dots">
            <span className="sch-dot" />
            <span className="sch-dot" />
            <span className="sch-dot" />
          </div>
          <span className="sch-loading-msg">{message}</span>
        </div>
      </div>
    </>
  );
}
