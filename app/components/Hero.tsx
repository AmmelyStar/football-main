"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const handsRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  const ballRotation = useRef(0);
  const caught = useRef(false);

  const getHeroVar = (name: string, fallback: number) => {
    if (!sectionRef.current) return fallback;

    const value = getComputedStyle(sectionRef.current)
      .getPropertyValue(name)
      .trim();

    return value ? Number.parseFloat(value) : fallback;
  };

  useEffect(() => {
    const ball = ballRef.current;
    const hands = handsRef.current;

    if (!ball || !hands) return;

    const handsFinalY = getHeroVar("--hero-hands-y", 90);
    const ballFinalY = getHeroVar("--hero-ball-y", -70);
    const handsScale = getHeroVar("--hero-hands-scale", 1);
    const ballScale = getHeroVar("--hero-ball-scale", 0.8);

    ball.style.transition = "none";
    hands.style.transition = "none";

    ball.style.opacity = "0";
    ball.style.transform = `
      translateX(-50%)
      translateY(-400px)
      scale(0.3)
      rotate(-150deg)
    `;

    hands.style.opacity = "0";
    hands.style.transform = "translateY(220px) scale(0.7)";
    hands.style.transformOrigin = "bottom center";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ball.style.transition =
          "transform 0.95s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.25s ease";

        ball.style.opacity = "1";
        ball.style.transform = `
          translateX(-50%)
          translateY(${ballFinalY}px)
          scale(${ballScale})
          rotate(0deg)
        `;

        hands.style.transition =
          "transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.35s ease";

        hands.style.opacity = "1";
        hands.style.transform = `
          translateY(${handsFinalY}px)
          scale(${handsScale})
        `;
      });
    });

    const timer = window.setTimeout(() => {
      caught.current = true;
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (!caught.current) return;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        const handsFinalY = getHeroVar("--hero-hands-y", 90);
        const ballFinalY = getHeroVar("--hero-ball-y", -70);
        const handsScale = getHeroVar("--hero-hands-scale", 1);
        const ballScale = getHeroVar("--hero-ball-scale", 0.8);

        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${scrollY * 0.25}px)`;
        }

        if (handsRef.current) {
          handsRef.current.style.transform = `
            translateY(${handsFinalY + scrollY * 0.1}px)
            scale(${handsScale})
          `;
        }

        if (ballRef.current) {
          ballRotation.current = scrollY * 0.4;

          ballRef.current.style.transform = `
            translateX(-50%)
            translateY(${ballFinalY - scrollY * 0.05}px)
            scale(${ballScale})
            rotate(${ballRotation.current}deg)
          `;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
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
        {/* Фоновая фотография */}
        <div
          ref={bgRef}
          className="absolute z-0 will-change-transform"
          style={{ inset: "-15% 0" }}
        >
          <Image
            src="/hero/bg2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Мяч */}
        <div
          ref={ballRef}
          className="absolute top-50 z-[2] will-change-transform"
          style={{
            bottom: "5%",
            left: "50%",
            width: "var(--hero-ball-size)",
            aspectRatio: "1",
            opacity: 0,
          }}
        >
          <Image
            src="/hero/ball.png"
            alt="Football"
            fill
            priority
            sizes="(max-width: 480px) 72vw, 530px"
            className="object-contain"
            style={{
              filter: "drop-shadow(0 12px 32px rgba(0, 0, 0, 0.6))",
            }}
          />
        </div>

        {/* Руки */}
        <div
          ref={handsRef}
          className="absolute inset-0 z-[3] mx-2 will-change-transform"
          style={{
            opacity: 0,
            transformOrigin: "bottom center",
          }}
        >
          <Image
            src="/hero/hands.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Зелёная растушёвка по краям */}
        <div
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
        {/* Нижняя растушёвка между Hero и About */}
<div
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
            className="-mt-10 w-full max-w-3xl"
            style={{ overflow: "visible" }}
          >
            <defs>
              <path id="arc" d="M 50,250 Q 400,0 750,250" />
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
                href="#arc"
                startOffset="50%"
                textAnchor="middle"
              >
                In Form für&apos;s Leben
              </textPath>
            </text>
          </svg>

          <div className="pointer-events-auto mt-16">
            <a
              href="#kontakt"
              className="rounded-md bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-[#165201]"
            >
              Jetzt mitmachen
            </a>
          </div>

          <p className="mt-20 max-w-xl text-base leading-relaxed text-white/90 drop-shadow sm:mt-40">
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