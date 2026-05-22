import { motion } from "framer-motion";

export function SplitText({ text }) {
  let charIndex = 0;

  return (
    <span className="split-text" aria-hidden="true">
      {text.split(" ").map((word, wordIndex) => (
        <span className="split-word" key={word}>
          {word.split("").map((char) => {
            const index = charIndex;
            charIndex += 1;

            return (
              <motion.span
                key={`${char}-${index}`}
                initial={{ y: "72%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.03 + index * 0.004, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  );
}

export function BlurText({ text, className = "" }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ delay: 0.12, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  );
}
