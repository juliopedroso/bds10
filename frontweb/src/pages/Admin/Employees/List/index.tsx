import './styles.css';

import { AxiosRequestConfig } from 'axios';
import EmployeeCard from 'components/EmployeeCard';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Employee } from 'types/employee';
import { SpringPage } from 'types/vendor/spring';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';

const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();

  const getEmployees = (pageNumber: number) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: "/employees",
      params: {
        page: pageNumber,
        size: 4,
      },
      withCredentials: true
    };

    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      });
  };


  useEffect(() => {
    getEmployees(0);
  }, []);

  return (
    <>
      {hasAnyRoles(['ROLE_ADMIN']) ?
        <Link to="/admin/employees/create" >
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        : ''}
      <div className="row">
        {
          page?.content.map(employee => (
            <div className="col-sm-6 col-md-12" key={employee.id}>
              <EmployeeCard employee={employee} ></EmployeeCard>
            </div>
          ))
        }

      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={(page) ? page?.totalPages : 0}
        range={3}
        onChange={getEmployees}
      />
    </>
  );
};

export default List;
