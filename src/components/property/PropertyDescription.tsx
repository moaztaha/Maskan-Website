"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function PropertyDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`property-description${expanded ? " is-expanded" : ""}`}>
      <p>{description}</p>
      {description.length > 260 && (
        <button type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Read Less" : "Read More"}
          <ChevronDown size={17} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
