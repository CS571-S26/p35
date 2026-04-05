export function uploadSyllabus(input) {

    // get the uploaded file from the user
    const file = input.files[0]
    if (!file) {
        alert("Please Select a file");
        return;
    }


    // Create a form data object 
    const formData = new FormData();
    formData.append('file', file);

    // create the data object 

    const backed_url = 'https://tldr-syllabus-backend.onrender.com/upload'
    // Return the fetch which will include the JSON
    return fetch(backed_url, {
        method: 'POST', 
        body: formData
    })
    .then(r => r.json())



}