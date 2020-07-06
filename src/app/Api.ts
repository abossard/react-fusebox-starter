
const encodeHash = (unencoded: string) => {
    return unencoded.toUpperCase();
}

const callMyService = async (accessToken?: string, url = process.env.API_SOLUTIONS_URL as string) => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + accessToken);
    headers.append("Ocp-Apim-Subscription-Key", process.env.API_SUBSCRIPTION_KEY as string);
    const response = await fetch(
        url, {
        headers,
    });
    return await response.json();
};

export { encodeHash, callMyService };
