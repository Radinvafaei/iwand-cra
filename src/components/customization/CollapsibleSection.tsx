import { Collapsible } from "@shopify/polaris";
import { useState } from "react";
import arrow from "src/assets/images/arrow.svg";

export const CollapsibleSection = ({ caption, children }: any) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <span className={`duration-300 ${open ? "" : "rotate-180"}`}>
          <img src={arrow} />
        </span>
        <span className="font-semibold select-none">{caption}</span>
      </div>
      <Collapsible id="collapsible-1" open={open}>
        <div className="p-4 px-6">{children} </div>
      </Collapsible>
    </div>
  );
};
