import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import { useEffect } from "react";
import axios from "axios";
import store from "../redux/store";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";

const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobSlice);

  //taking datas from api and sending to store

  const fetchData = () => {
    // 1)isloading check
    dispatch(setLoading());
    // 2)if data ok,send to store
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  };
  // after calling a function,show the data
  useEffect(() => {
    fetchData();
  }, []);
  console.log(state);
  return (
    <div className="list-page">
      {/* 
    1)is still loading / loader
    2)is loading done and there is error/press to again button
    3)is loading is done and there is no error/push to data card
    */}
      {state.isLoading ? (
        <p>
          <Loader />
        </p>
      ) : state.isError ? (
        <div className="error">
          <Error />
          <button onClick={fetchData}>Try Again</button>
        </div>
      ) : (
        <div className="job-list">
          {state.jobs.map((job) => (
            <Card job={job} key={job.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
