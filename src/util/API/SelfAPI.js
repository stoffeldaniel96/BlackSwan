import {get, defaultConfig} from "./Base"

export const Self = {
    read: (accessToken) =>
        get(`/self`, defaultConfig(accessToken))
}