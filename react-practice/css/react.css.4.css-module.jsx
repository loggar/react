// CSS Modules

// ComponentName.module.css
/*
.Red {
  color: #f00;
}

.Blue {
  color: #00f;
}
*/

import styles from "./ComponentName.module.css";

const ComponentA = () => (
  <div>
    <span className={styles.Red}>This text will be red</span>
    <span className={styles.Blue}>This text will be blue</span>
  </div>
);
