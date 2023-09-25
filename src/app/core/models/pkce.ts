export interface Pkce {
    method: 'S256';
    challenge: string;
    verifier: string;
}