import {get, defaultConfig} from "./Base"

export const Items = {
    index: (accessToken) =>
        get(`/item`, defaultConfig(accessToken)),
    single: (accessToken, item_id) =>
        get(`/item/${item_id}`, defaultConfig(accessToken))
}