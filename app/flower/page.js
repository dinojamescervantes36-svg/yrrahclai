'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './flower.css';

export default function GlassDomeRose() {
  const [dusts, setDusts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const dustData = [
      [130, 132, 150, 152, 0.15, 2.5, 0.1, 'sub'],
      [65, 63, 300, 299, 0.5, 2, 0.2, 'sub'],
      [70, 70, 150, 150, 0.45, 2, 0.5],
      [75, 78, 160, 170, 0.6, 2, 1],
      [80, 82, 160, 180, 0.6, 1, 0.4],
      [85, 100, 160, 170, 0.5, 2, 0.5],
      [125, 110, 170, 180, 0.25, 3, 1.5],
      [90, 90, 115, 115, 0.4, 2, 2],
      [93, 95, 200, 200, 0.4, 3, 1.5],
      [100, 100, 145, 155, 0.45, 1, 0.5],
      [100, 90, 170, 230, 0.35, 2, 0.75],
      [100, 102, 115, 112, 0.35, 3, 0.25],
      [100, 95, 170, 200, 0.55, 1.5, 0.75],
      [100, 97, 150, 190, 0.7, 2, 1.5],
      [105, 100, 160, 180, 0.5, 1.5, 0.725],
      [125, 125, 180, 190, 0.25, 1, 0.725],
      [130, 130, 135, 135, 0.45, 3, 1.5],
      [135, 132, 170, 190, 0.25, 2.5, 0.75],
      [135, 132, 320, 315, 0.2, 5, 0.3, 'sub'],
    ];

    const dustParticles = dustData.map((data, idx) => ({
      id: idx,
      x1: data[0],
      x2: data[1],
      y1: data[2],
      y2: data[3],
      sizeRatio: data[4],
      fallingTime: data[5],
      animationDelay: data[6],
      node: data[7] || 'main',
    }));

    setDusts(dustParticles);
  }, []);

  return (
    <div id="castle" className="castle-container">
      
      {/* Back Button */}
      <button
              className="close-btn"
              onClick={() => router.push("/flower/for_you")}
            >
              ✕
      </button>

      <div className="text-overlay">
        <h1>"Pretty things exist everywhere but someone like you is one of a kind."</h1>
      </div>

      <div id="table"></div>

      <div className="table-text">
        <p>Even the prettiest rose can't compete with your smile</p>
      </div>

      <div id="main" className="shade-wrap hover-animation">
        <div id="flower-wrap">
          <div id="stem"></div>
          <div id="petal1"></div>
          <div id="petal2"></div>
          <div id="petal3"></div>
          <div id="petal4"></div>
          <div id="petal5"></div>
          <div id="falling-petal"></div>
          <div id="leaf1"></div>
          <div id="leaf2"></div>
        </div>

        {dusts
          .filter((dust) => dust.node === 'main')
          .map((dust) => (
            <div
              key={dust.id}
              className="dustDef"
              style={{
                animation: `blink${dust.id} ${dust.fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${dust.animationDelay}s`,
              }}
            />
          ))}
      </div>

      <div id="sub" className="shade-wrap">
        <div id="shade-main-reflections"></div>
        <div id="shade-main">
          <div id="shade-handle-big"></div>
          <div id="shade-handle-small"></div>
          <div id="bottom-shade"></div>
        </div>

        {dusts
          .filter((dust) => dust.node === 'sub')
          .map((dust) => (
            <div
              key={dust.id}
              className="dustDef"
              style={{
                animation: `blink${dust.id} ${dust.fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${dust.animationDelay}s`,
              }}
            />
          ))}
      </div>
    </div>
  );
}