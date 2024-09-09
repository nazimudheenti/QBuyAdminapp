

export const env = "qbuy"

const URLS = {
    qbuy: 'https://apiqbuypanda.diginestsolutions.in/public/api/',
    qbuy_live: "https://apilive.qbuypanda.com/public/api/"
}

const IMG_BASEPATH = {
    qbuy: 'https://apiqbuypanda.diginestsolutions.in/public/',
    qbuy_live: "https://apilive.qbuypanda.com/public/"
}


export const BASE_URL = URLS[env]

export const IMG_URL = IMG_BASEPATH[env]
