

export const env = "qbuy_live"

const URLS = {
    dev: "https://digistoreapi.diginestsolutions.in/public/api/",
    digiResto: "https://digirestoapi.diginestsolutions.in/public/api/",
    fashion: "https://digifashionapi.diginestsolutions.in/public/api/",
    ayur: "https://api.ayurdx.com/public/api",
    backend: 'https://ecom.pearlglobalsolutions.com/backend/api/',
    qbuy: 'https://apiqbuypanda.diginestsolutions.in/public/api/',
    qbuy_live: "https://apilive.qbuypanda.com/public/api/",
    demo: "https://apigreenstore.diginestsolutions.in/public/api/"
}

const IMG_BASEPATH = {
    dev: "https://digistoreapi.diginestsolutions.in/public/api/",
    digiResto: "https://digirestoapi.diginestsolutions.in/public/api/",
    fashion: "https://digifashionapi.diginestsolutions.in/public/api/",
    ayur: "https://api.ayurdx.com/public/api",
    backend: 'https://ecom.pearlglobalsolutions.com/backend/api/',
    qbuy: 'https://apiqbuypanda.diginestsolutions.in/public/',
    qbuy_live: "https://apilive.qbuypanda.com/public/",
    demo: "https://apigreenstore.diginestsolutions.in/public/",
}


export const BASE_URL = URLS[env]

export const IMG_URL = IMG_BASEPATH[env]
