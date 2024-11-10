import type { WallMetaInfo, User } from "$lib/types/types";

declare global {
    namespace App {
        interface Locals {
            user: {
                id: string;
                userName: string;
                email: string;
                wallInfo: WallMetaInfo;
            } | null;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export { };
