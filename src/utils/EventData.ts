import axios from 'axios';

const TM_API_KEY = 'CJW3CDd6i19cYkMJehcyCGyeLp9vqFBU';

const fetchEvents = async (keyword) => {
    try {
        const response = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TM_API_KEY}&keyword=${keyword}`
        );

        // Handle the response and extract event data
        const events = response.data._embedded.events;
        return events;
    } catch (error) {
        console.log('Error fetching events:', error);

    }
};

export default fetchEvents;
