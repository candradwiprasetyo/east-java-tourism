export type CoversType = {
  id: number;
  classCover?: string;
  classCoverTitle?: string;
  height: number;
};

import styles from "@/app/ui/home.module.css";

export const coversData: CoversType[] = [
  {
    id: 1,
    classCover: styles.cover1,
    classCoverTitle: styles.coverTitle1,
    height: 72,
  },
  {
    id: 2,
    classCover: styles.cover2,
    classCoverTitle: styles.coverTitle2,
    height: 80,
  },
  {
    id: 3,
    classCover: styles.cover3,
    classCoverTitle: styles.coverTitle3,
    height: 60,
  },
  {
    id: 4,
    classCover: styles.cover4,
    classCoverTitle: styles.coverTitle4,
    height: 70,
  },
  {
    id: 5,
    classCover: styles.cover5,
    classCoverTitle: styles.coverTitle5,
    height: 78,
  },
];
