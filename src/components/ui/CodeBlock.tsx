import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
  highlight?: boolean;
}

export function CodeBlock({ code, className, highlight = false }: CodeBlockProps) {
  // Simple syntax highlighting for Python
  const highlightCode = (text: string) => {
    const keywords = ['def', 'if', 'else', 'elif', 'for', 'while', 'in', 'range', 'print', 'return', 'True', 'False', 'None', 'and', 'or', 'not'];
    
    return text.split('\n').map((line, lineIndex) => {
      let highlighted = line;
      
      // Highlight strings
      highlighted = highlighted.replace(
        /(["'])(.*?)\1/g, 
        '<span class="text-accent">$1$2$1</span>'
      );
      
      // Highlight keywords
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlighted = highlighted.replace(
          regex, 
          '<span class="text-primary font-semibold">$1</span>'
        );
      });
      
      // Highlight numbers
      highlighted = highlighted.replace(
        /\b(\d+)\b/g, 
        '<span class="text-info">$1</span>'
      );
      
      // Highlight blanks
      highlighted = highlighted.replace(
        /____/g, 
        '<span class="bg-primary/20 px-2 py-0.5 rounded text-primary font-bold">____</span>'
      );
      
      return (
        <div key={lineIndex} className="leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <div 
      className={cn(
        "bg-code rounded-2xl p-4 font-mono text-sm overflow-x-auto border border-border/50",
        highlight && "ring-2 ring-primary/30",
        className
      )}
    >
      <pre className="text-code-text">
        {highlightCode(code)}
      </pre>
    </div>
  );
}
