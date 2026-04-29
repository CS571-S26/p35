export function uploadSyllabus(input) {

    // 1. Get the uploaded file from the user
    const file = input.files[0]
    if (!file) {
        alert("Please Select a file");
        return;
    }

    // 2. Create a form data object 
    const formData = new FormData();
    formData.append('file', file);

    // 3. Define the backend URL 
    // Choose the one that matches your current environment:
    const backed_url = 'https://syllabus-app-d5nll.ondigitalocean.app/upload' 
    
    // If testing locally, use this instead:
    // const backed_url = 'http://127.0.0.1:5001/upload'

    // 4. Return the fetch which will include the JSON
    return fetch(backed_url, {
        method: 'POST',
        body: formData
    })
    .then(r => {
        if (!r.ok) {
            throw new Error(`Server error: ${r.statusText}`);
        }
        return r.json();
    });
}