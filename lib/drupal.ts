// ./lib/drupal.ts

import { DrupalClient } from "next-drupal"

export const drupal = new DrupalClient(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    {
        frontPage: "/home",
        previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
        auth: {
            clientId: 'IAq501Oh4fDXo9H1zYDJeAHkGSHoDmWJKh2Lr2doaXo',
            clientSecret: '0IsYeKTo1gk_kWUchOn2zN-g_LQluxvjr8b1RLUVNAI',
        },
        forceIframeSameSiteCookie: process.env.NODE_ENV === "development",
    }
)
