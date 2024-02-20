export type googleSearchItem = {
    "title": string,
    "link": string
    "displayLink": string,
    "snippet": string,
    "pagemap": {
        "cse_thumbnail": [
            {
                "src": string,
                "width": string,
                "height": string
            }
        ],
        "metatags": [
            {
                "twitter:description": string
            }
        ]
    }
}