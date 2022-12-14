import { useEffect, useState } from "react";
import React from "react";
import { ListOfDogs } from "../../components/ListOfDogs";
import { Select } from "../../components/Select";
import { Pagination } from "../../components/Pagination";
import { Button } from "../../components/Button";
import { FilteredDogs } from "../../components/FilteredDogs";
import { Header } from "../../components/Header";
import "./Home.styles.css";

export function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);

  ///Get all data
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs.json"
      );
      return await response.json();
    })()
      .then((data) => {
        //data object into array
        setData(Object.values(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sortedData]);

  ///Sorting method
  const sorting = (key, order = "asc") => {
    const sortOrder = order === "asc" ? 1 : -1;
    return (a, b) => {
      const A = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const B = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      if (A < B) {
        return sortOrder * -1;
      } else if (A > B) {
        return sortOrder * 1;
      } else {
        return 0;
      }
    };
  };

  const handleChange = (e) => {
    setSort(true);
    setSortedData(data.sort(sorting(e, "asc")));
  };

  ///Change page

  const end = currentPage * postPerPage;
  const start = end - postPerPage;

  const paginate = (number) => {
    setCurrentPage(number);
  };

  ///Get current Posts
  let posts;
  posts = !sort ? data.slice(start, end) : sortedData.slice(start, end);

  ///Reset Btn
  const handleClick = (e) => {
    if (sort || filter) {
      setSort(false);
      setSortedData(data.sort(sorting("id", "asc")));
      setFilter(false);
    }
  };

  ///Filter method
  const filterData = (e) => {
    let query = e.target.textContent;
    fetch(
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/groupOfDogs/${query}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilter(true);
        setFilterPosts(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///Display posts
  const nameBtn = {
    name: filter,
  };

  return (
    <div className="">
      <Header />
      <div className="wrapper">
        <div className="aside">
          <div className="sort">
            <Select onChange={handleChange} />
          </div>
          <div className="reset">
            <Button name="reset" title="Reset" onClick={handleClick} />
          </div>
          <h3>7 Major Dog Groups</h3>
          <div className="filter">
            <Button {...nameBtn} title="working" onClick={filterData} />
            <Button {...nameBtn} title="herding" onClick={filterData} />
            <Button {...nameBtn} title="hound" onClick={filterData} />
            <Button {...nameBtn} title="toy" onClick={filterData} />
            <Button {...nameBtn} title="sporting" onClick={filterData} />
            <Button {...nameBtn} title="nonSporting" onClick={filterData} />
            <Button {...nameBtn} title="terrier" onClick={filterData} />
          </div>
        </div>
        <main>
          {!filter && <ListOfDogs posts={posts} loading={loading} />}
          {filter && <FilteredDogs posts={filterPosts} />}
          {!filter && (
            <Pagination
              postPerPage={postPerPage}
              totalPost={data.length}
              onClick={paginate}
            />
          )}
        </main>
      </div>
    </div>
  );
}
