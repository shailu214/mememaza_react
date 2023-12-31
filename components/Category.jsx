import React, { useEffect, useState } from "react";
import { extractColors } from "extract-colors";

import styles from "@/styles/components/category.module.css";
import Link from "next/link";
import { SITE_URL } from "@/def";

export default function Category({ category, bigger }) {
  const [bgColor, setBgColor] = useState();
  const [fgColor, setFgColor] = useState();

  //   const [colorPallette, setColorPallette] = useState();
  const { image_path: image, name, slug, posts_count, reels_count } = category;

  const isProduction = SITE_URL.includes("https://admin.");

  let imgSrcUntainted = isProduction
    ? image.replace("https://admin.", "https://")
    : image;

  useEffect(() => {
    if (!fgColor && !bgColor) {
      extractColors(imgSrcUntainted, 5)
        .then((palette) => {
          let ci = 0;
          palette = palette.reverse();
          //   setColorPallette(palette);
          setBgColor(
            `hsl(${palette[ci].hue * 360}deg, ${
              palette[ci].saturation * 100
            }%, ${palette[ci].lightness * 100 - 8}%)`
          );
          setFgColor(palette[ci].lightness > 0.5 ? "#000000" : "#ffffff");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  let biggerStyle = {};
  if (bigger) {
    biggerStyle.width = 232;
  }
  return (
    <Link href={`/category/${slug}`}>
      <div
        className={styles.category}
        style={{
          backgroundImage: `url(${imgSrcUntainted})`,
          backgroundSize: "cover",
          ...biggerStyle,
        }}
      >
        <div
          className={styles.categoryDetails}
          style={{ backgroundColor: bgColor, color: fgColor }}
        >
          <p className={styles.categoryTitle}>{name}</p>
          <p className={styles.categoryText}>
            {posts_count + reels_count} Posts
          </p>
        </div>
      </div>
    </Link>
  );
}
