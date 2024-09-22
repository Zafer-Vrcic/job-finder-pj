import React from "react";
import { statusOpt, typeOpt } from "../constants";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //to take a jobs data
  useEffect(() => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    const newJob = Object.fromEntries(formData.entries());
    //date and id
    newJob.id = v4();
    newJob.date = new Date().toLocaleDateString();
    //add date to API
    axios
      .post("http://localhost:4000/jobs", newJob)
      //if success put in the store
      .then(() => {
        toast.success("New Job added");
        navigate("/");
        dispatch(createJob(newJob));
      })
      //if fail show me to error
      .catch(() => console.log(toast.error("when you adding,there is a problem")));
  };
  //delete a data if the same(duplicated)
  const removeDuplicated = (key) => {
    const arr = state.jobs.map((i) => i[key]);
    const filtred = arr.filter((value, index) => arr.indexOf(value) === index);
    return filtred;
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />
            <datalist id="positions">
              {removeDuplicated("position").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Company</label>
            <input list="companies" name="company" type="text" required />
            <datalist id="companies">
              {removeDuplicated("company").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Location</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
              {removeDuplicated("location").map((i) => (
                <option value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Situation</label>
            <select name="status" required>
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
            <select name="type" required>
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
            {/* Changed from div to button and added type="submit" */}
            <button type="submit" className="button">
              Add Job<span className="button-border"></span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
