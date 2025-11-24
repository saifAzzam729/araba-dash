export default function makeGoogleMapsLinkForAddress(country, state, city, streetAddress) {
    let query = '';

    if (country) {
        const encodedCountry = encodeURIComponent(country);
        query += encodedCountry;
    }

    if (state) {
        const encodedState = encodeURIComponent(state);
        query += `${query ? '+' : ''}${encodedState}`;
    }

    if (city) {
        const encodedCity = encodeURIComponent(city);
        query += `${query ? '+' : ''}${encodedCity}`;
    }

    if (streetAddress) {
        const encodedStreetAddress = encodeURIComponent(streetAddress);
        query += `${query ? '+' : ''}${encodedStreetAddress}`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
