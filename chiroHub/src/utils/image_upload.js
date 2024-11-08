export async function uploadProfilePhoto(image) {
    const formData = new FormData();
    formData.append('profilePhoto', image);

    const response = await fetch('https://chiroseminarhub-australia.onrender.com/chiro/user/uploadProfilePhoto', {
        method: 'POST',
        body: formData,
    });
    return response.json();
}

export async function uploadSeminarImage(formData) {
    const response = await fetch('/chiro/seminar', {
        method: 'POST',
        body: formData,
    });
    return response.json();
}
