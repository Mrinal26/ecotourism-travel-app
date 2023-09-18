import React, { useEffect, useState } from "react";

import "./destinations.css";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import axios, { Axios } from "axios";
import { Search2Icon } from "@chakra-ui/icons";
import { DestinationsCard } from "./DestinationsCard.jsx";
import { isDisabled } from "@testing-library/user-event/dist/utils/index.js";
import Footer from "./Footer1";
import Navbar from "./Navbar";
let baseURL = "https://long-puce-octopus-wrap.cyclic.cloud/destinations";
export const Destinations = () => {
  const bg__color = "green.100";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [order, setOrder] = useState("");
  const [ratingsFilter, setRatingsFilter] = useState(false);
  const [ratings, setRatings] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  // const Url = (Sort, RatingsFilter, Order, Ratings) => {
  //   let URL = `https://ecotourism-msze.onrender.com/destinations?_limit=12&_page=${page}`;

  //   if (Sort && ratingsFilter) {
  //     return `${URL}&_grade=${ratings}&_sort=fees&_order=${Order}&grade=${ratings}`;
  //   } else if (Sort) {
  //     if (Order == "") {
  //       return URL;
  //     }
  //     return `${URL}&_sort=fees&_order=${Order}`;
  //   } else if (RatingsFilter) {
  //     return `${URL}&grade=${Ratings}`;
  //   }

  //   return URL;
  // };

  // const loadUrl = Url(sort, order);

  const getData = async (URL) => {
    try {
      setLoading(true);
      // console.log("trying");
      // let res = await axios.get(`${URL}`);
      await axios
        .get(baseURL, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log("authenticated");
          console.log(baseURL);
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((e) => {
          console.log("who dis");
          console.log(e);
        });
      //  console.log(res.data);
      // setData(res.data);
      // console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (e) => {
    // if (e.target.value == "") {
    //   setSort(false);
    // } else {
    //   setSort(true);
    // }
    // setOrder(e.target.value);
    // let SortUrl = Url(true, ratingsFilter, e.target.value);
    // console.log(SortUrl);
    // getData(SortUrl);
    baseURL += `?sort=fees&order=asc`;
    getData();
  };

  const handleRating = (e) => {
    // if (e.target.value == "") {
    //   setRatingsFilter(false);
    // } else {
    //   setRatingsFilter(true);
    // }
    // setRatings(e.target.value);
    // let ratingsUrl = Url(sort, true, order, e.target.value);
    // console.log(e.target.value);
    // console.log(ratingsUrl);
    // getData(ratingsUrl);
  };
  // console.log(loadUrl);

  //handle Input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    // console.log("clicked");
    // let Url = `https://ecotourism-msze.onrender.com/destinations?_limit=12&_page=${page}&q=${input}`;
    // getData(Url);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <Box color={"white"} p={3} className="background-image">
        <Heading gap={"3"} marginBottom={"2rem"} key={1}>
          {" "}
          Trending Destinatons
        </Heading>
        <Box display={"flex"} gap={"20px"} margin={5}>
          <Select
            placeholder="Sort By Price"
            width={"300px"}
            textColor={"black"}
            onChange={(e) => handleSort(e)}
          >
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </Select>

          <Select
            placeholder="Filter By Ratings"
            width={"300px"}
            textColor={"black"}
            onChange={(e) => handleRating(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          <Input placeholder="search" onChange={handleInput} />
          <Button>
            <Search2Icon onClick={handleSearch} />
          </Button>
        </Box>
        <Flex wrap={"wrap"} justifyContent={"Center"} gap={3} key={2}>
          {data?.map((e) => {
            return <DestinationsCard key={e.id} prop={e} Loading={loading} />;
          })}
        </Flex>
        <Flex justifyContent={"center"}>
          <Box>
            <Button
              onClick={() => {
                setPage(page - 1);
                getData();
              }}
              isDisabled={page - 1 <= 0}
            >
              PrevPage
            </Button>
            <Button m={"2"}>{page}</Button>
            <Button
              onClick={() => {
                setPage(page + 1);

                getData();
              }}
            >
              NextPage
            </Button>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
