// src/app.d.ts
declare global {
    namespace App {
        interface Locals {
            user: {
                id: string;
                userName: string;
                email: string;
            } | null;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export { };
