import {get, defaultConfig} from "./Base"

export const Characters = {
    index: (accessToken) =>
        get(`/character`, defaultConfig(accessToken)),
    single: (accessToken, character_id) =>
        get(`/character/${character_id}`, defaultConfig(accessToken))
}