"use client";

import { Item } from "@/objects/manifest";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{
    itemId: string;
  }>;
}

export default function Items(props: PageProps) {
  const params = use(props.params);
  const { itemId } = params;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const func = async () => {
      const response = await fetch(
        `https://r2.twks.nennneko5787.net/${itemId}/item.json`,
      );
      setItem((await response.json()) as Item);
    };

    func();
  }, []);

  if (item === null) return <></>;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-3">Twitfiend Saga</h1>
        <p className="subtitle">
          chapter {item.id} {item.chapter} <br />
          <Link href="/">←back</Link>
        </p>

        <div
          className="images"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {[...Array(item.maxPage)].map((_, i) =>
            i == 0 ? (
              <img
                src={`https://r2.twks.nennneko5787.net/${itemId}/front.jfif`}
                key={i}
                style={{ height: "100vh" }}
                loading="lazy"
              />
            ) : (
              <img
                src={`https://r2.twks.nennneko5787.net/${itemId}/${i + 1}.jfif`}
                key={i}
                style={{ height: "100vh" }}
                loading="lazy"
              />
            ),
          )}
        </div>

        <p className="subtitle">
          <Link href="/">←back</Link>
        </p>
      </div>
    </section>
  );
}
