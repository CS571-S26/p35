export function uploadSyllabus(input) {
    const file = input.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const backedUrl = 'https://syllabus-app-d5nll.ondigitalocean.app/upload';

    return fetch(backedUrl, {
        method: 'POST',
        body: formData
    })
        .then(async (response) => {
            const responseText = await response.text();
            let payload = null;

            try {
                payload = responseText ? JSON.parse(responseText) : null;
            } catch {
                payload = null;
            }

            if (!response.ok) {
                const message =
                    payload?.error ||
                    payload?.message ||
                    responseText ||
                    `Upload failed with status ${response.status}`;

                throw new Error(message);
            }

            if (!payload) {
                throw new Error('The server returned an empty or invalid response.');
            }

            return payload;
        })
        .catch((error) => {
            if (error instanceof TypeError) {
                throw new Error('Could not reach the upload server. It may be offline, blocked by CORS, or still waking up.');
            }

            throw error;
        });
}
