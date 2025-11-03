import Image from 'next/image'
import BackButtonIcon from '../../app/assets/images/icons/backButton.svg';
import styles from './BackIcon.module.css';

export const BackIcon = () => {
  return (
      <div className={styles.iconContainer}>
        <Image
            src={BackButtonIcon}
            alt="Back button"
            fill
            className={'backButton'}
        />
      </div>
  );
};