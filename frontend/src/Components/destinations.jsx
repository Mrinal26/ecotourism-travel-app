import React, { useEffect, useState } from "react";

import "./destinations.css";
import { Box, Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { Search2Icon } from "@chakra-ui/icons";
import { DestinationsCard } from "./DestinationsCard.jsx";
import Footer from "./Footer1";
import Navbar from "./Navbar";
let initState = {
  data: [],
  loading: false,
  sort: false,
  order: "",
  ratingsFilter: false,
  ratings: "",
  input: "",
  page: 1,
};
export const Destinations = () => {
  const [pagedata, setPagedata] = useState(initState);
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://long-puce-octopus-wrap.cyclic.cloud/destinations?q=${pagedata.input}`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      setPagedata({ ...pagedata, data: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) => {
    setPagedata({
      ...pagedata,
      input: e.target.value,
    });
  };
  const handleRating = (e) => {
    setPagedata({ ...pagedata, ratings: e.target.value });
  };
  const handleSort = (e) => {
    setPagedata({
      ...pagedata,
      sort: true,
      order: e.target.value,
    });
  };
  const handleReset = () => {
    setPagedata(initState);
  };
  const getData = async () => {
    let url = `https://long-puce-octopus-wrap.cyclic.cloud/destinations?page=${pagedata.page}`;
    if (pagedata.sort && pagedata.ratings)
      url += `&sort=fees&order=${pagedata.order}&rating=${pagedata.ratings}`;
    else if (pagedata.sort) url += `&sort=fees&order=${pagedata.order}`;
    else if (pagedata.ratings) url += `&rating=${pagedata.ratings}`;
    console.log(url);
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      });

      console.log(res);
      setPagedata({
        ...pagedata,
        data: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [pagedata.page, pagedata.sort, pagedata.order, pagedata.ratings]);
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
          <Button onClick={handleReset}>Reset</Button>
        </Box>
        <Flex wrap={"wrap"} justifyContent={"Center"} gap={3} key={2}>
          {pagedata.data?.map((e) => {
            return (
              <DestinationsCard
                key={e.id}
                prop={e}
                Loading={pagedata.loading}
              />
            );
          })}
        </Flex>
        <Flex justifyContent={"center"}>
          <Box>
            <Button
              onClick={() => {
                setPagedata({
                  ...pagedata,
                  page: pagedata.page - 1,
                });
              }}
              isDisabled={pagedata.page - 1 <= 0}
            >
              PrevPage
            </Button>
            <Button m={"2"}>{pagedata.page}</Button>
            <Button
              onClick={() => {
                setPagedata({
                  ...pagedata,
                  page: pagedata.page + 1,
                });
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
