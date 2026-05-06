import { useState, useRef, useEffect, KeyboardEvent, ElementType } from "react";
import { useEditor } from "@/context/EditorContext";

interface Props {
  value: string;
  onSave: (val: string) => void;
  tag?: ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export default function EditableText({
  value,
  onSave,
  tag: Tag = "span",
  className = "",
  multiline = false,
  placeholder,
}: Props) {
  const { isEditMode } = useEditor();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  if (!isEditMode) {
    return <Tag className={className}>{value || placeholder}</Tag>;
  }

  const handleBlur = () => {
    const text = ref.current?.innerText ?? value;
    onSave(text.trim() || value);
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === "Escape") {
      if (ref.current) ref.current.innerText = value;
      setEditing(false);
    }
  };

  return (
    <div
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={() => setEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} ${
        editing
          ? "outline outline-2 outline-orange bg-orange/5 cursor-text px-1 rounded-sm"
          : "cursor-pointer hover:outline hover:outline-2 hover:outline-orange/50 hover:outline-dashed rounded-sm"
      } transition-all`}
      title={
        editing
          ? "Enter — сохранить, Esc — отмена"
          : "Двойной клик — редактировать"
      }
    >
      {value || placeholder}
    </div>
  );
}
