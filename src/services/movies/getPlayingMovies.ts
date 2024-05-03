import httpInstance from '../httpInstance';

export const getPlaying = async () => {
    let res: any;
    const endpoint = `now_playing?api_key=${process.env.REACT_APP_MBD_API_KEY}&language=en-US`;
    await httpInstance.get(endpoint)
    .then((data) => {
        res = data;
    }).catch((err) => {
        res = err.response;
    });
    return res;
}