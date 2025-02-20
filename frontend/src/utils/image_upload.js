export async function uploadProfilePhoto(formData) {
    const response = await fetch('/chiro/user/uploadProfilePhoto', {
        method: 'POST',
        body: formData,
    });
    return response.json();
}

export async function uploadSeminarImage(formData) {
    console.log(formData)
    const response = await fetch('/chiro/seminar', {
        method: 'POST',
        body: formData,
    });
    return response.json();
}
