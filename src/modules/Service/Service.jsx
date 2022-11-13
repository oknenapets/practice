import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useFiltredApplications } from 'shared/hooks';
import { getUsertApplications } from 'store/Applications/selector';

const Service = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userApplications = useSelector(getUsertApplications);
  
  const carParams = searchParams.get('car') || '';
  const completedParams = searchParams.get('completed') || '';
  
  const filtredApplications = useFiltredApplications(carParams, completedParams, userApplications);
  
  return (
    <div className="container">
      <div className="page__service service">{filtredApplications.length ? filtredApplications : <p>Нет заявок </p>}</div>
    </div>
  );
};

export default Service;
