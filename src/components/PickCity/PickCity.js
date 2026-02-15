import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';
import { useState } from 'react';

const PickCity = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (typeof onSubmit !== 'function') return;
    if (!city.trim()) return;

    onSubmit(city);
  };

  return (
    <form className={styles.pickCityForm} onSubmit={handleSubmit}>
      <TextInput
        placeholder="Enter city name..."
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default PickCity;
