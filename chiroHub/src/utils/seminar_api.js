// import axios from 'axios'

// export async function getSeminars() {
//     let res = await axios.get(`/api/seminars/`)
//     console.log(res)
//     return res.data
// }


import axios from 'axios';

export async function getSeminars() {
    console.log('Getting seminars attempt');
    try {
        const res = await axios.get('/api/seminars/');
        console.log('Response received:', res.data);
        return res.data; // Make sure to return only the data
    } catch (error) {
        console.error('Error fetching seminars:', error);
        throw error; // Re-throw the error to be handled in the calling function
    }
}
