"use client";

import { Manifest } from "@/objects/manifest";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [selectedTab, setSelectedTab] = useState("twihai-kaisen");

  useEffect(() => {
    const func = async () => {
      const response = await fetch(
        "https://r2.twihai-kaisen.com/manifest.json",
      );
      setManifest((await response.json()) as Manifest);
    };

    func();
  }, []);

  if (manifest === null) return <></>;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-3">Twitfiend Saga</h1>
        <p className="subtitle">
          Enter the world of ツイ廃廻戦[Twitfiend Saga]—where obsession never ends. Read for
          free with unlimited access and lose yourself in the endless cycle of
          tweets and madness.
        </p>

        <div className="tabs is-centered">
          <ul>
            <li className={selectedTab === "twihai-kaisen" ? "is-active" : ""}>
              <a onClick={() => setSelectedTab("twihai-kaisen")}>Twitfiend Saga</a>
            </li>
            <li className={selectedTab === "zero" ? "is-active" : ""}>
              <a onClick={() => setSelectedTab("zero")}>Twitfiend Saga Zero</a>
            </li>
          </ul>
        </div>

        <div className="columns is-multiline is-mobile">
          {manifest.items.map((item) => {
            if (selectedTab === "twihai-kaisen" && item.type !== "twks") {
              return null;
            }
            if (selectedTab === "zero" && item.type !== "zero") {
              return null;
            }
            return (
              <Link
                href={`/item/${item.type}_${item.id}`}
                className="column is-one-third"
                key={`${item.type}_${item.id}`}
              >
                <img
                  src={`https://r2.twihai-kaisen.com/${item.type}_${item.id}/front.jfif`}
                  loading="lazy"
                ></img>
                <h2 className="title is-6">
                  ツイ廃廻戦 {item.type == "zero" ? "０" : ""} 第{item.id}話{" "}
                  {item.chapter}
                </h2>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
