"use client";

import { Manifest } from "@/objects/manifest";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    const func = async () => {
      const response = await fetch(
        "https://r2.twks.nennneko5787.net/manifest.json",
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
          Enter the world of Twitfiend Saga—where obsession never ends. Read for
          free with unlimited access and lose yourself in the endless cycle of
          tweets and madness.
        </p>

        <div className="columns is-multiline is-mobile">
          {manifest.items.map((item) => {
            return (
              <Link
                href={`/item/${item.type}_${item.id}`}
                className="column is-one-third"
                key={`${item.type}_${item.id}`}
              >
                <img
                  src={`https://r2.twks.nennneko5787.net/${item.type}_${item.id}/front.jfif`}
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
