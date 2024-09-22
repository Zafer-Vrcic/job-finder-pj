import React from 'react'

const AddJob = () => {
  return (
    <div className='add-page'>
      <section className='add-sec'>
        <h2>Yeni iş Ekle</h2>
        <form action="">
          <div>
            <label> Pozisyon</label>
            <input name='position' type="text" required />
          </div>
          <div>
            <label> Şirket</label>
            <input name='company' type="text" required />
          </div>
          <div>
            <label> Lokasyon</label>
            <input name='location' type="text" required />
          </div>
          <div>
            <label> Durum</label>
            <select name="status" id=""></select>
          </div>
          <div>
            <label> Tür</label>
            <select name="type" id=""></select>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob