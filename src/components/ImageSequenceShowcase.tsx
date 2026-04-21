import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SensorOverlayPanel, { type SensorPanelData } from './SensorOverlayPanel';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
  totalFrames?: number;
  framePrefix?: string;
  frameFolder?: string;
  frameExtension?: string;
  overlayPanels?: SensorPanelData[];
}

export default function ImageSequenceShowcase({
  totalFrames = 120,
  framePrefix = 'frame_',
  frameFolder = '/1',
  frameExtension = 'png',
  overlayPanels = [],
}: ImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all images
  useEffect(() => {
    console.log(`Loading ${totalFrames} frames from ${frameFolder}/${framePrefix}XXXX.${frameExtension}`);
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNumber = String(i + 1).padStart(4, '0');
      img.src = `${frameFolder}/${framePrefix}${frameNumber}.${frameExtension}`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          console.log('All frames loaded!');
          setLoading(false);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load: ${img.src}`);
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setLoading(false);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, [totalFrames, framePrefix, frameFolder, frameExtension]);

  // Draw frame to canvas
  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || !imagesRef.current[frameIndex]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img.complete) {
      console.warn(`Frame ${frameIndex + 1} not loaded yet`);
      return;
    }

    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fill black background first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate scale to cover
    const scale = Math.max(
      canvas.width / imgWidth,
      canvas.height / imgHeight
    );

    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;

    // Draw image
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

    // Debug: draw frame number
    ctx.fillStyle = '#64c8ff';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`Frame ${frameIndex + 1}`, 20, 50);
  };

  // Update canvas when frame changes
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame]);

  // Setup scroll trigger
  useEffect(() => {
    if (loading || !containerRef.current) return;

    console.log('Setting up ScrollTrigger');
    console.log('Container height:', `${totalFrames * 5}vh`);

    // Fallback: manual scroll listener
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const scrollableHeight = containerHeight - viewportHeight;
      const progress = Math.max(0, Math.min(scrolled / scrollableHeight, 1));
      const frame = Math.floor(progress * (totalFrames - 1));
      const clampedFrame = Math.max(0, Math.min(frame, totalFrames - 1));
      setCurrentFrame(clampedFrame);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.floor(self.progress * (totalFrames - 1));
          const clampedFrame = Math.max(0, Math.min(frame, totalFrames - 1));
          console.log(`GSAP: ${(self.progress * 100).toFixed(1)}% → Frame ${clampedFrame + 1}`);
          setCurrentFrame(clampedFrame);
        },
      });
    });

    return () => {
      console.log('Cleaning up ScrollTrigger');
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, [loading, totalFrames]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrame);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrame]);

  const scrollHeight = totalFrames * 5;

  return (
    <div
      ref={containerRef}
      style={{
        height: `${scrollHeight}vh`,
        position: 'relative',
        background: '#000',
        width: '100%',
      }}
    >
      <div
        className="bg-dot-pattern bg-[length:32px_32px]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: '#050508',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1.5px, transparent 1.5px)',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Ambient background glows — LED-inspired */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '50vh',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '50vw',
            height: '50vh',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: '40vw',
            height: '40vh',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(100,200,255,0.04) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
          {/* Subtle vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          }} />
        </div>
        {loading ? (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#fff',
          }}>
            <div style={{
              width: 60,
              height: 60,
              border: '3px solid rgba(100,200,255,0.2)',
              borderTopColor: '#64c8ff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem',
            }} />
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              Loading {totalFrames} frames... {loadProgress}%
            </p>
          </div>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            />

            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(0,0,0,0.8)',
              padding: '0.6rem 1.2rem',
              borderRadius: '100px',
              color: '#64c8ff',
              fontSize: '0.85rem',
              fontWeight: 700,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(100,200,255,0.3)',
              zIndex: 10,
            }}>
              {currentFrame + 1} / {totalFrames}
            </div>

            <div style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Scroll to explore • {scrollHeight}vh total
            </div>

            {/* Sensor overlay panels */}
            {overlayPanels.map((panel) => (
              <SensorOverlayPanel
                key={panel.id}
                panel={panel}
                visible={currentFrame >= panel.startFrame && currentFrame <= panel.endFrame}
              />
            ))}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes sensorPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px currentColor; }
          50% { opacity: 0.4; box-shadow: 0 0 2px currentColor; }
        }
      `}</style>
    </div>
  );
}

