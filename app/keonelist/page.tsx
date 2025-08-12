"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { handle: string; desc: string };

const PER_PAGE = 24;

const uiLangs = {
  en: {
    title: "Nads · search in list",
    subtitle: "Type your handle (with @ or without):",
    desc: "keone list – 1000 nads some of the Nads who make a real difference in the monad mission day in and day out...",
    search: "Search",
    prev: "PREV",
    next: "NEXT",
    placeholder: "e.g., _gvan",
    bubble: "EN",
  },
  ru: {
    title: "Nads · поиск по списку",
    subtitle: "Введи ник (с @ или без):",
    desc: "keone list – 1000 nads — те, кто каждый день делают реальную разницу в миссии monad...",
    search: "SEARCH",
    prev: "PREV",
    next: "NEXT",
    placeholder: "например, _gvan",
    bubble: "RU",
  },
  uk: {
    title: "Nads · пошук у списку",
    subtitle: "Введи нік (з @ або без):",
    desc: "keone list – 1000 nads — ті, хто щодня роблять реальну різницю в місії monad...",
    search: "SEARCH",
    prev: "PREV",
    next: "NEXT",
    placeholder: "напр., _gvan",
    bubble: "UK",
  },
} as const;

export default function KeoneListPage(){
  const [data, setData] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState<keyof typeof uiLangs>("en");
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    fetch("../keonelist.json").then(r => r.json()).then((arr: Item[]) => {
      const cleaned = (arr || []).filter(x => x && typeof x.handle === "string");
      setData(cleaned);
    });
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().replace(/^@/, "").toLowerCase();
    return s ? data.filter(d => d.handle.toLowerCase().includes(s)) : data;
  }, [q, data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageClamped = Math.min(page, totalPages);
  const pageItems = useMemo(() => {
    const start = (pageClamped - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, pageClamped]);

  useEffect(() => { setPage(1); }, [q]);

  const ui = uiLangs[lang];

  const goPrev = () => setPage(p => Math.max(1, p - 1));
  const goNext = () => setPage(p => Math.min(totalPages, p + 1));

  const doSearch = () => {
    if (filtered.length > 0){
      setSelected(filtered[0]);
      const idx = data.findIndex(d => d.handle === filtered[0].handle);
      if (idx >= 0){
        setPage(Math.floor(idx / PER_PAGE) + 1);
      }
    } else {
      setSelected(null);
    }
  };

  return (
    <main className="container">
      <div className="card">
        <button className="langBubble" onClick={() => {
          setLang(lang === "en" ? "ru" : lang === "ru" ? "uk" : "en")
        }}>{ui.bubble}</button>

        <h1 className="title">{ui.title}</h1>
        <p className="subtitle">{ui.subtitle}</p>
        <p className="descline">{ui.desc}</p>

        <div className="searchRow">
          <div className="neonInput">
            <input
              className="inputBase"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={ui.placeholder}
              onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
            />
          </div>
        </div>
        <div className="searchRow" style={{marginTop: '14px'}}>
          <button className="btn" onClick={doSearch}><span>{ui.search}</span></button>
        </div>

        <div className="result" style={{display: selected ? 'block' : 'none'}}>
          <div className="handle">@{selected?.handle}</div>
          <div className="desc">{selected?.desc}</div>
        </div>
      </div>

      <div className="gridWrap">
        <div className="grid">
          {pageItems.map((item) => (
            <button
              key={item.handle}
              className="pill"
              onClick={() => setSelected(item)}
              title={item.desc}
            >
              @{item.handle}
            </button>
          ))}
        </div>

        <div className="pager">
          <button className="btn" onClick={goPrev}><span>{ui.prev}</span></button>
          <span className="pageinfo">{pageClamped} / {totalPages}</span>
          <button className="btn" onClick={goNext}><span>{ui.next}</span></button>
        </div>
      </div>
    </main>
  );
}
