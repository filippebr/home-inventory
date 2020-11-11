import connection from '../../database/connection';

import tableNames from '../../constants/tableNames';

function find () {
  return connection(tableNames.state);
}

export default find;
