import { Game } from "../../dto/game"

export interface GamesResponse {
    'data': Game[],
    'meta': {
        'total_pages': number,
        'current_page': number,
        'next_page': number,
        'per_page': number,
        'total_count': number
    }
}
