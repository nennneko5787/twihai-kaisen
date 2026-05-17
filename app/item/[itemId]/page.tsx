"use client";

import { Item } from "@/objects/manifest";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    itemId: string;
  }>;
}

type ReadingMode = "vertical" | "horizontal";

export default function Items(props: PageProps) {
  const params = use(props.params);
  const { itemId } = params;
  const [item, setItem] = useState<Item | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [readingMode, setReadingMode] = useState<ReadingMode>("vertical");

  useEffect(() => {
    const func = async () => {
      const response = await fetch(
        `https://r2.twihai-kaisen.com/${itemId}/item.json`,
      );
      setItem((await response.json()) as Item);
    };
    func();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getImageSrc = (i: number) =>
    i === 0
      ? `https://r2.twihai-kaisen.com/${itemId}/front.jfif`
      : `https://r2.twihai-kaisen.com/${itemId}/${i + 1}.jfif`;

  if (item === null) return <></>;

  const isVertical = readingMode === "vertical";

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-3">Twitfiend Saga</h1>
        <p className="subtitle">
          chapter {item.id} {item.chapter} <br />
          <Link href="/">←back</Link>
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={() =>
              setReadingMode(isVertical ? "horizontal" : "vertical")
            }
            className="button is-small"
          >
            {isVertical ? "Switch to horizontal" : "Switch to vertical"}
          </button>
        </div>

        <div
          className="images"
          style={
            isVertical
              ? {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }
              : {
                  display: "flex",
                  flexDirection: "row-reverse",
                  overflowX: "auto",
                  alignItems: "flex-start",
                  gap: "4px",
                }
          }
        >
          {[...Array(item.maxPage)].map((_, i) => (
            <img
              src={getImageSrc(i)}
              key={i}
              style={{
                maxHeight: "100vh",
                cursor: "zoom-in",
                flexShrink: 0,
              }}
              loading="lazy"
              onClick={() => setLightboxSrc(getImageSrc(i))}
            />
          ))}
        </div>

        <p className="subtitle" style={{ marginTop: "1rem" }}>
          <Link href="/">←back</Link>
        </p>
      </div>

      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightboxSrc}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
              cursor: "default",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.25rem",
              background: "none",
              border: "none",
              color: "white",
              fontSize: "2rem",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}