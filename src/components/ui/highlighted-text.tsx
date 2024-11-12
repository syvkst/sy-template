type HighlightProps = {
  content: string;
  highlight: string;
};

export function Highlight({ content, highlight }: HighlightProps) {
  const parts = content.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? "text-emerald-500"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}
