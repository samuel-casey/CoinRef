import axios from 'axios';
const { REACT_APP_YOUTUBE_API_KEY } = process.env;

export const fetchVideos = async (gState, dispatch, ytSearchQuery) => {
	try {
		const search = await axios.get(
			`https://cors-anywhere.herokuapp.com/https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${ytSearchQuery}&key=${REACT_APP_YOUTUBE_API_KEY}`
		);
		return search.data;
	} catch (error) {
		console.log(error);
		dispatch({ type: "ERROR", payload: `No videos found for ${ytSearchQuery}. Please try again or another search term.` })
	}
};
