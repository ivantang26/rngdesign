import React, { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_SCENARIO, DEMO_SITES, TEXT } from "./demoData";

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [siteId, setSiteId] = useState("group");
  const [scenario, setScenario] = useState(DEFAULT_SCENARIO);
  const site = useMemo(() => DEMO_SITES.find((item) => item.id === siteId) ?? DEMO_SITES[0], [siteId]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    site,
    siteId,
    setSiteId,
    scenario,
    setScenario,
    resetScenario: () => setScenario(DEFAULT_SCENARIO),
    copy: TEXT[language],
  }), [language, scenario, site, siteId]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used inside DemoProvider");
  return value;
}
