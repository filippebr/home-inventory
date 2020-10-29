import connection from '../../database/connection';

import tableNames from '../../constants/tableNames';

export default function find () {
  return connection(tableNames.state);
}
