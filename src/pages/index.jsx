import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";
import DataCard from "../components/dataCard";
import styles from "../styles/Home.module.css";
import { useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthContext } from "../authContext/authContextProvider";

export default function Home() {
  const [loading, setLoadin] = useState(false);
  const [datas, setDatas] = useState([]);
  const { isAuth } = useContext(AuthContext);
  const NavigateTo = useRouter().push;
  const apiKey = "bdb533ec";
  const { search, setSearch } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    fetchData(search);
  }, [search]);

  const fetchData = async (searchData) => {
    setLoadin(true);
    try {
      let res = await axios.get(
        `https://omdbapi.com/?apikey=${apiKey}&s=${searchData}`
      );
      setDatas(res.data.Search);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadin(false);
    }
  };

  function outer(func, delay) {
    let timer;
    return function inner(query) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(query);
      }, delay);
    };
  }

  const debounce = outer(fetchData, 500);

  const handleChange = (e) => {
    setSearch(e.target.value);
    debounce(e.target.value);
  };

  useEffect(() => {
    if (!isAuth) {
      // alert("Please Login to Access the Home");
      toast({
        title: "Failed.",
        description: "Please Login to Access the Home",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      NavigateTo("/login");
    }
  }, [isAuth]);
  console.log(datas);
  console.log(search);
  return (
    <>
      <Head>
        <title>My First Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      ;
      <div className={styles.search}>
        <h3>Search: {search}</h3>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search Your Movie or Series"
        />
      </div>
      {loading ? (
        <Loading />
      ) : !datas ? (
        <h1>No Data Found</h1>
      ) : (
        <div className={styles.container}>
          {datas.map((data) => (
            <DataCard data={data} key={data.imdbID} />
          ))}
        </div>
      )}
    </>
  );
}
