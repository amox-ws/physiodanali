"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Άμεση εκτίμηση",
    description:
      "Καλέστε ή στείλτε WhatsApp. Συζητάμε το περιστατικό σας με τον φυσικοθεραπευτή.",
  },
  {
    title: "Ραντεβού στο σπίτι σας",
    description:
      "Σας επισκεπτόμαστε με όλο τον φορητό εξοπλισμό. Ίδια ή επόμενη μέρα.",
  },
  {
    title: "Εξατομικευμένο πλάνο",
    description:
      "Συνδυασμός manual therapy, μηχανημάτων και ασκήσεων προσαρμοσμένων σε εσάς.",
  },
  {
    title: "Επιστροφή στη ζωή σας",
    description:
      "Παρακολούθηση προόδου, σταδιακή αυτονομία και πρόληψη υποτροπής.",
  },
];

const STEP_DELAY = 0.55; // seconds between each step lighting up
const STEP_DURATION = 0.55;

export function Process() {
  const gridRef = useRef<HTMLOListElement>(null);
  const inView = useInView(gridRef, {
    once: true,
    margin: "-100px",
  });

  // Line fills in sync with circles: 4 circles → 3 segments.
  // Total fill time = (steps.length - 1) * STEP_DELAY + STEP_DURATION
  const totalFillTime = (steps.length - 1) * STEP_DELAY + STEP_DURATION;

  return (
    <section
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: "#e8eff8" }}
    >
      {/* Soft blue tonal wash (matches WhyUs) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 20%, rgba(30,77,139,0.10) 0%, transparent 65%), radial-gradient(45% 50% at 10% 90%, rgba(126,168,220,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2
            id="process-heading"
            className="display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.025em] text-ink"
          >
            Πώς{" "}
            <span className="display-italic text-cobalt">λειτουργεί.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted lg:text-lg">
            Από το πρώτο τηλέφωνο μέχρι την ανακούφισή σας, σε 4 απλά βήματα.
          </p>
        </Reveal>

        {/* Steps grid */}
        <ol
          ref={gridRef}
          className="relative mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-10"
        >
          {/* Connecting rail (faint baseline) — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[34px] hidden lg:block"
          >
            <div
              className="mx-auto h-px"
              style={{
                width: "calc(100% - 7rem)",
                marginLeft: "3.5rem",
                marginRight: "3.5rem",
                backgroundColor: "rgba(15,37,64,0.10)",
              }}
            />
            {/* Animated fill that travels 1 → 4 in sync with the circles */}
            <motion.div
              className="absolute top-0 h-px origin-left"
              style={{
                width: "calc(100% - 7rem)",
                marginLeft: "3.5rem",
                background:
                  "linear-gradient(to right, rgba(30,77,139,0.0) 0%, rgba(30,77,139,0.85) 12%, rgba(184,153,104,0.95) 100%)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{
                duration: totalFillTime,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            />
          </div>

          {steps.map((step, i) => {
            const delay = i * STEP_DELAY;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay,
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Numbered badge */}
                <div className="relative">
                  {/* Soft halo — pulses in when the step "activates" */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 -m-3 rounded-full bg-cobalt/20 blur-xl"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.6 }
                    }
                    transition={{
                      duration: STEP_DURATION,
                      ease: [0.22, 1, 0.36, 1],
                      delay,
                    }}
                  />
                  {/* Animated ring that draws on activation */}
                  <svg
                    aria-hidden
                    className="absolute -inset-1.5 size-[68px]"
                    viewBox="0 0 68 68"
                  >
                    <motion.circle
                      cx="34"
                      cy="34"
                      r="32"
                      fill="none"
                      stroke="rgba(184,153,104,0.55)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      style={{ rotate: -90, transformOrigin: "center" }}
                      initial={{ pathLength: 0 }}
                      animate={
                        inView ? { pathLength: 1 } : { pathLength: 0 }
                      }
                      transition={{
                        duration: STEP_DURATION,
                        ease: [0.22, 1, 0.36, 1],
                        delay,
                      }}
                    />
                  </svg>
                  <motion.span
                    className="relative flex size-14 items-center justify-center rounded-full text-base shadow-[0_12px_30px_-12px_rgba(15,37,64,0.45)]"
                    style={{
                      background:
                        "linear-gradient(150deg, #1e4d8b 0%, #143661 60%, #0f2540 100%)",
                    }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.5, opacity: 0 }
                    }
                    transition={{
                      duration: STEP_DURATION,
                      ease: [0.34, 1.4, 0.64, 1], // gentle overshoot
                      delay,
                    }}
                  >
                    <span className="display text-snow text-[1.4rem] leading-none">
                      {i + 1}
                    </span>
                  </motion.span>
                </div>

                <motion.h3
                  className="display mt-7 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-[1.2] tracking-[-0.01em] text-ink"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: delay + 0.15,
                  }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="mt-3 max-w-[28ch] text-sm leading-[1.7] text-ink-muted lg:text-[15px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: delay + 0.22,
                  }}
                >
                  {step.description}
                </motion.p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
