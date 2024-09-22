import React, { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import { useDispatch } from "react-redux";
import { clearFilters, filterBySearch } from "../redux/slices/jobSlice";

const Filter = ({ jobs }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  //for every letter when user writing can slow a app so because of that need to fix that and set a like limit
  //when user finish to writing or stop to filter we need to use debounce
  useEffect(() => {
    //we will create a counter and when counter done will progress start.
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "position", text }));
    }, 500);
    //if before count useeffect again work we need to stop older counter.
    return () => clearTimeout(timer);
  }, [text]);
  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form action="">
        <div>
          <label htmlFor="">Search depends Company: </label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <div>
          <label>Situation</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option value="" hidden>
              Select
            </option>
            {statusOpt.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option value="" hidden>
              Select
            </option>
            {typeOpt.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort by</label>

          <select
            onChange={() => dispatch(sortJobs(e.target.value))}
            name="type"
          >
              <option value="" hidden>
              Select
            </option>
            {sortOpt.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => dispatch(clearFilters())}
          type="reset"
          className="button"
        >
          Reset<span className="button-border"></span>
        </button>
      </form>
    </section>
  );
};

export default Filter;
