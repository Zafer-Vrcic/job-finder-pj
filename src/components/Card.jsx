import { FaSuitcase } from "react-icons/fa";
import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slices/jobSlice";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const color = {
    "Devam Ediyor": "orangered",
    Mülakat: "green",
    Reddedildi: "red",
  };
  const handleDelete = () => {
    // console.log(job)
    //1)request to db to delete this task
    axios
      .delete(`http://localhost:4000/jobs/${job.id}`)
      //2)if success also delete from the store
      .then(() => {
        toast.info("Delete Success");
        dispatch(deleteJob(job.id));
      })
      //3)if fail show error
      .catch(() => {
        toast.warn("Delete is not Succesful");
      });
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>K</span>
          </div>
          <div className="info">
            <p>frontend</p>
            <p>Udemig</p>
          </div>
        </div>
        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>İzmir</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>Tam Zamanlı</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>2022-02-02</p>
        </div>
        <div className="status">
          <p style={{ background: color[job.status] }}>{job.status} </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
