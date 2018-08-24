import { ServiceParams } from './service-params';
export class ListingFilterData {

  data: Array<any>;

  setServiceParams(serviceParams: ServiceParams): ServiceParams {
    const params = [];
    this.data.forEach(cell => {
      if (cell['header']['searchType'] === 'FREETEXT' || cell['header']['searchType'] === 'AUTO_COMPLETE') {
        if (cell['value'].trim()) {
          params.push({column: cell['header']['searchCriteria'], value: cell['value']});
        }
      } else if (cell['header']['searchType'] === 'DATE_TIME_RANGE') {
        if (cell['value'].dfrom || cell['value'].dto) {
          const dateRange = [];
          let from = '-1';
          let to = '-1';
          if (cell['value'].dfrom) {
            from = cell['value'].dfrom.month + '/' + cell['value'].dfrom.day + '/' + cell['value'].dfrom.year;
            from = new Date(from).getTime().toString();
          }
          if (cell['value'].dto) {
            to = cell['value'].dto.month + '/' + cell['value'].dto.day + '/' + cell['value'].dto.year;
            to = (new Date((new Date(to)).setHours(23, 59, 59, 999))).getTime().toString();
          }
          dateRange.push(from);
          dateRange.push(to);
          params.push({column: cell['header']['searchCriteria'], value: dateRange});
        }
      }
    });

    params.forEach(param => {
      serviceParams.conditions.push(param);
    });

    return serviceParams;
  }
}
