import React from "react";
import { statusOpt, typeOpt } from "../constants";

const AddJob = () => {
  const handleSubmit= (e)=>{
    e.preventDefault();

    //to react inputs
    const formData= new FormData(e.target);
    const newJob=Object.fromEntries(formData.entries());
    console.log(newJob)
  }
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni iş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label> Pozisyon</label>
            <input name="position" type="text" required />
          </div>
          <div>
            <label> Şirket</label>
            <input name="company" type="text" required />
          </div>
          <div>
            <label> Lokasyon</label>
            <input name="location" type="text" required />
          </div>
          <div>
            <label> Durum</label>
            <select name="status">
              <option value="" hidden>Seçiniz</option>
              {statusOpt.map((i) => (
                <option>{i} </option>
              ))}
            </select>
          </div>
          <div>
            <label> Tür</label>
            <select name="type">
              <option value="" hidden>Seçiniz</option>
              {typeOpt.map((i) => (
                <option>{i} </option>
              ))}
            </select>
          </div>

          <div className="button">
            Add Job<span className="button-border"></span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
