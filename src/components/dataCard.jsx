import React from "react";

import styles from "../styles/dataCard.module.css";
import { useRouter } from "next/router";

export default function DataCard({ data }) {
  const route = useRouter();

  const handleClick = () => {
    route.push("/movie/" + data.imdbID);
  };
  return (
    <div className={styles.card} onClick={handleClick}>
      <h3>{data.Title}</h3>
      <img src={data.Poster} alt="" />
    </div>
  );
}
