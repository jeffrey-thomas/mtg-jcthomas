import { Card } from "../../Data/Card";

const base_uri = 'https://api.scryfall.com/cards';

export interface searchResult {
    total_cards: number | null,
    has_more: boolean,
    data: Card[] | null
}

export const Scryfall = {

    getById: async (id: string): Promise<Card | null> => {
        let response = await fetch(`${base_uri}/multiverse/${id}`);
        if (!response.ok)
            return null;

        let json = await response.json();
        return json;
    },

    getByIds: async (ids: number[]): Promise<Card[] | null> => {

        let body: { identifiers: { multiverse_id: number }[] } = { identifiers: [] }
        ids.forEach((id) => {
            body.identifiers.push({ multiverse_id: id })
        });

        let request: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        request.body = JSON.stringify(body);

        const response = await fetch(`${base_uri}/collection`, request);

        const json = await response.json();

        return json['data'];
    },

    search: async (name: string, set?: string): Promise<searchResult> => {

        let request: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(`${base_uri}/search?q=name:${name}${set ? ` set:${set}` : ''}&unique=prints`, request);

        const json = await response.json();

        return json;
    }

}