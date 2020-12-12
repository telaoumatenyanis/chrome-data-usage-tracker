function isPositiveNumber(value) {
    return /^\d+$/.test(value);
}

// function getBodySize(body) {
//     if (!body) {
//         return 0;
//     }

//     if (!body.raw) {
//         console.log("raw", body)
//     }

//     return body.raw.reduce((acc, chunk) => acc + chunk.bytes.byteLength, 0)
// }

// function handleRequest({ requestBody }) {
//     const requestBodySize = getBodySize(requestBody)
//     console.log("Request body size", requestBodySize)
// }

// chrome.webRequest.onBeforeRequest.addListener(
//     handleRequest,
//     { urls: ["<all_urls>"] },
//     ["requestBody", "extraHeaders"]
// )

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     (details) => {
//         console.log("ho", details)
//     },
//     { urls: ["<all_urls>"] },
//     ["requestHeaders"]
// )



function handleHeadersSent({ requestHeaders }) {
    //TODO
    console.log("request", requestHeaders)
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    handleHeadersSent,
    { urls: ["<all_urls>"] }, ["requestHeaders"]);

function hasContentLength(header) {
    return header.name && header.name.toLowerCase() == 'content-length' && isPositiveNumber(header.value)
}

function handleHeadersReceived({ responseHeaders }) {
    const contentLengthHeader = responseHeaders.find(hasContentLength)
    if (contentLengthHeader) {
        console.log("Body size:", parseInt(contentLengthHeader.value))
    }
}

chrome.webRequest.onHeadersReceived.addListener(
    handleHeadersReceived,
    { urls: ["<all_urls>"] }, ["responseHeaders"]);