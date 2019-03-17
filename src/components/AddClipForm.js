

import React from 'react'

 function AddClipForm() {

     const submitHandler = (e) => {
         e.preventDefault()

         

         let formData = new FormData

        
         formData.append('audio_file', e.target.fileInput.files[0])
         formData.append('name', e.target.name.value)

         console.log(formData)

         fetch('http://localhost:3000/api/v1/clips', {
             method: 'POST',
             body: formData
         })
             .then(response => response.json())


     } // end of submitHandler



  return (
    <div className="add-clip-form-container">
          <h4>create episode</h4>
          <form onSubmit={submitHandler}>
              <label>Name</label>
              <input name="name"></input>
              <label>File Upload</label>
              <input name="fileInput" type="file"></input>
              <button>submit</button>
          </form>
    </div>
  )
}

export default AddClipForm
