import { callMyService, encodeHash } from "./Api"
import fetch from 'jest-fetch-mock';

beforeEach(() => {
    fetch.resetMocks();
});

describe("A fresh api service, when used, ", () => {
    it("returns the result", async () => {
        const myAccessToken = "MY_ACCESS_TOKEN";
        const testUrl = "http://nourl"

        fetch.mockResponseOnce(JSON.stringify({ result: true }));

        const result = await callMyService(myAccessToken, testUrl);

        expect(result).toBeTruthy();
    })
})