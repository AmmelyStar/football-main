"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const handsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = bgRef.current;
    const hands = handsRef.current;
    const ball = ballRef.current;

    if (!section || !background || !hands || !ball) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let animationFrame: number | null = null;
    let introFrame: number | null = null;
    let introTimer: number | null = null;
    let introComplete = false;

    let settings = {
      handsY: 90,
      ballY: -70,
      handsScale: 1,
      ballScale: 0.8,
    };

    function readSettings() {
      const styles = getComputedStyle(section!);

      const getValue = (name: string, fallback: number) => {
        const value = Number.parseFloat(styles.getPropertyValue(name));
        return Number.isFinite(value) ? value : fallback;
      };

      settings = {
        handsY: getValue("--hero-hands-y", 90),
        ballY: getValue("--hero-ball-y", -70),
        handsScale: getValue("--hero-hands-scale", 1),
        ballScale: getValue("--hero-ball-scale", 0.8),
      };
    }

    function updatePosition() {
      if (!background || !hands || !ball || !section) return;

      const scroll = motionPreference.matches
        ? 0
        : Math.min(
            Math.max(window.scrollY - section.offsetTop, 0),
            section.offsetHeight,
          );

      background.style.transform = `translateY(${scroll * 0.25}px)`;

      hands.style.transform = `
        translateY(${settings.handsY + scroll * 0.1}px)
        scale(${settings.handsScale})
      `;

      ball.style.transform = `
        translateX(-50%)
        translateY(${settings.ballY - scroll * 0.05}px)
        scale(${settings.ballScale})
        rotate(${scroll * 0.4}deg)
      `;
    }

    function stopIntro() {
      if (introFrame !== null) {
        cancelAnimationFrame(introFrame);
        introFrame = null;
      }

      if (introTimer !== null) {
        window.clearTimeout(introTimer);
        introTimer = null;
      }
    }

    function finishIntro() {
      if (!ball || !hands) return;

      stopIntro();

      introComplete = true;
      ball.style.transition = "none";
      hands.style.transition = "none";
      updatePosition();
    }

    function handleScroll() {
      if (!introComplete || motionPreference.matches) return;
      if (animationFrame !== null) return;

      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        updatePosition();
      });
    }

    function handleResize() {
      readSettings();

      if (introComplete) {
        updatePosition();
      }
    }

    function handleMotionChange() {
      finishIntro();
    }

    readSettings();

    if (motionPreference.matches || window.scrollY > 0) {
      finishIntro();
    } else {
      /*
       * Элементы остаются видимыми:
       * вступление анимирует только transform.
       */
      ball.style.transition = "none";
      hands.style.transition = "none";

      ball.style.transform = `
        translateX(-50%)
        translateY(-400px)
        scale(0.3)
        rotate(-150deg)
      `;

      hands.style.transform = "translateY(220px) scale(0.7)";

      introFrame = requestAnimationFrame(() => {
        introFrame = requestAnimationFrame(() => {
          introFrame = null;

          ball.style.transition =
            "transform 0.95s cubic-bezier(0.22, 0.61, 0.36, 1)";

          hands.style.transition =
            "transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1)";

          updatePosition();

          introTimer = window.setTimeout(finishIntro, 1150);
        });
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      stopIntro();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="w-full bg-[#165201]">
      <section
        id="home"
        ref={sectionRef}
        className="hero-section relative mx-auto h-screen min-h-150 max-h-225 w-full max-w-7xl overflow-hidden"
        style={{ clipPath: "inset(0)" }}
      >
        {/* Фон */}
        <div
          ref={bgRef}
          className="hero-background absolute z-0"
          style={{ inset: "-15% 0" }}
        >
          <Image
            src="/hero/bg2.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40"
          />
        </div>

        {/* Мяч */}
        <div
          ref={ballRef}
          className="hero-ball absolute top-50 z-[2]"
          style={{
            left: "50%",
            width: "var(--hero-ball-size)",
            aspectRatio: "1",
          }}
        >
          <Image
            src="/hero/ball.png"
            alt="Fußball"
            fill
            priority
            sizes="(max-width: 380px) 51vw, (max-width: 480px) 54vw, (max-width: 963px) 44vw, 424px"
            className="object-contain"
            style={{
              filter: "drop-shadow(0 12px 32px rgba(0, 0, 0, 0.6))",
            }}
          />
        </div>

        {/* Руки */}
        <div
          ref={handsRef}
          className="hero-hands absolute inset-0 z-[3] mx-2"
        >
          <Image
            src="/hero/hands.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-bottom"
          />
        </div>

        {/* Растушёвка по краям */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background: `
              linear-gradient(
                to right,
                #165201 0%,
                rgba(22, 82, 1, 0) 25%
              ),
              linear-gradient(
                to left,
                #165201 0%,
                rgba(22, 82, 1, 0) 25%
              )
            `,
          }}
        />

        {/* Нижняя растушёвка */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 sm:h-56"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(22, 82, 1, 0) 0%,
                rgba(22, 82, 1, 0.75) 65%,
                #165201 100%
              )
            `,
          }}
        />

        {/* Текст */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <svg
            viewBox="0 0 800 300"
            role="img"
            aria-label="In Form fürs Leben"
            className="-mt-10 w-full max-w-3xl"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path
                id="hero-slogan-arc"
                d="M 50,250 Q 400,0 750,250"
              />
            </defs>

            <text
              fill="white"
              fontWeight="bold"
              fontSize="40"
              letterSpacing="-1"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))",
              }}
            >
              <textPath
                href="#hero-slogan-arc"
                startOffset="50%"
                textAnchor="middle"
              >
                In Form fürs Leben
              </textPath>
            </text>
          </svg>

          <div className="pointer-events-auto mt-16">
            <a
              href="#kontakt"
              className="inline-flex rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-[#165201] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Jetzt mitmachen
            </a>
          </div>

          <p className="mt-20 max-w-xl text-base leading-relaxed text-white drop-shadow sm:mt-40">
            Jeder einzelne muss persönliche Hürden überwinden. Wie schnell wir
            ins Ziel kommen, spielt dabei keine große Rolle. Wichtig ist nur,
            jeden Tag alles zu geben. Stellst du dich der Herausforderung?
          </p>
        </div>

        <style jsx>{`
          .hero-section {
            --hero-ball-size: clamp(260px, 55vw, 530px);
            --hero-ball-y: -70;
            --hero-ball-scale: 0.8;
            --hero-hands-y: 90;
            --hero-hands-scale: 1;
          }

          .hero-ball {
            transform: translateX(-50%)
              translateY(calc(var(--hero-ball-y) * 1px))
              scale(var(--hero-ball-scale));
          }

          .hero-hands {
            transform: translateY(calc(var(--hero-hands-y) * 1px))
              scale(var(--hero-hands-scale));
            transform-origin: bottom center;
          }

          @media (prefers-reduced-motion: no-preference) {
            .hero-background,
            .hero-ball,
            .hero-hands {
              will-change: transform;
            }
          }

          @media (max-width: 480px) {
            .hero-section {
              --hero-ball-size: clamp(220px, 72vw, 320px);
              --hero-ball-y: -35;
              --hero-ball-scale: 0.75;
              --hero-hands-y: 125;
              --hero-hands-scale: 0.85;
            }
          }

          @media (max-width: 380px) {
            .hero-section {
              --hero-ball-size: clamp(190px, 70vw, 280px);
              --hero-ball-y: -20;
              --hero-ball-scale: 0.72;
              --hero-hands-y: 145;
              --hero-hands-scale: 0.78;
            }
          }
        `}</style>
      </section>
    </div>
  );
}