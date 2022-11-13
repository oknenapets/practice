import { useMemo } from 'react';
import { ServiceItem } from 'modules/Service/components';

export default function useFiltredApplications(carParams, completedParams, userApplications) {
  return useMemo(
    () =>
      userApplications
        .filter((application) => {
          if (carParams) {
            const idEqual = application.car.id === +carParams;
            const statusCompleted = completedParams && application.status.id === 4;
            return carParams && idEqual && statusCompleted;
          }
          return true;
        })
        .map((item) => <ServiceItem key={item.id} value={item} />),
    [carParams, completedParams, userApplications]
  );
}
