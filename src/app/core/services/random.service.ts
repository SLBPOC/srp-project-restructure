import { Injectable } from "@angular/core";

@Injectable()
export class RandomService {
    public randomString(possible: string, length: number): string {
        let text = "";
        const possibleLength = possible.length;
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possibleLength));
        }
        return text;
    }
}