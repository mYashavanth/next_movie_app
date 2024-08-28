import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/loading";
import styles from "../../styles/movieDetails.module.css";
import { AuthContext } from "@/authContext/authContextProvider";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Details() {
  const [loading, setLoadin] = useState(false);
  const [datas, setDatas] = useState({});
  const apiKey = "bdb533ec";
  const { isAuth } = useContext(AuthContext);
  const route = useRouter();
  const { id } = route.query;
  console.log(id);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async (imdbID) => {
    setLoadin(true);
    try {
      let res = await axios.get(
        `https://omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
      );
      setDatas(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(false);
    }
  };
  useEffect(() => {
    if (!isAuth) {
      route.push("/login");
    }
  }, [isAuth]);
  return (
    <>
      <Head>
        <title>{datas.Title}</title>
        <meta name="description" content={`movie details of ${datas.Title}`} />
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.details}>
            <h1>{datas.Title}</h1>
            <img src={datas.Poster} alt="" />
            <p>{datas.Plot}</p>
            <p>Year: {datas.Year}</p>
            <p>Genre: {datas.Genre}</p>
            <p>Rating: {datas.imdbRating}</p>
            <p>Runtime: {datas.Runtime}</p>
            <p>Director: {datas.Director}</p>
            <p>Actors: {datas.Actors}</p>
            <p>Language: {datas.Language}</p>
            <p>Country: {datas.Country}</p>
            <p>Awards: {datas.Awards}</p>
            <p>BoxOffice: {datas.BoxOffice}</p>
            <p>Metascore: {datas.Metascore}</p>
            <p>Released: {datas.Released}</p>
            <p>Writer: {datas.Writer}</p>
            <p>Type: {datas.Type}</p>
            <p>Website: {datas.Website}</p>
            <p>Response: {datas.Response}</p>
            <p>Rated: {datas.Rated}</p>
            <p>Production: {datas.Production}</p>
          </div>
        )}
      </div>
    </>
  );
}
