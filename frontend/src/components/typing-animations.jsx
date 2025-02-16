import { useEffect, useState } from "react";

const TypingAnimation = ({
  prompts,
  typingSpeed = 50,
  deletingSpeed = 20,
  delayBetweenPrompts = 1500,
}) => {
  const [text, setText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout;

    if (isDeleting) {
      typingTimeout = setTimeout(() => {
        setText(text.slice(0, text.length - 1));
        if (text === ">") {
          setIsDeleting(false);
          setPromptIndex((promptIndex + 1) % prompts.length);
        }
      }, deletingSpeed);
    } else {
      typingTimeout = setTimeout(() => {
        setText(
          "> " +
            prompts[promptIndex].slice(0, text.length - text.indexOf(">") - 1)
        );
        if (text.length === prompts[promptIndex].length + 1) {
          setIsDeleting(true);
          setTimeout(() => {}, delayBetweenPrompts);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(typingTimeout);
  }, [
    text,
    prompts,
    promptIndex,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    delayBetweenPrompts,
  ]);

  return <div className="text-3xl font-semibold">{text}</div>;
};

export { TypingAnimation };
