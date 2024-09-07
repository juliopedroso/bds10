import { Controller, useForm } from 'react-hook-form';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { Employee } from 'types/employee';
import Select from 'react-select';
import { Department } from 'types/department';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';

const Form = () => {

  const history = useHistory();
  const { register, handleSubmit, formState: { errors }, control } = useForm<Employee>();
  const [selectDepartaments, setSelectDepartaments] = useState<Department[]>([]);
  const onSubmit = (formData: Employee) => {
    console.log(formData)
  }
  const handleCancel = () => {
    history.push("/admin/employees");
  };

  useEffect(() => {

    const config: AxiosRequestConfig = {
      url: '/departments',
     withCredentials: true
    };

    requestBackend(config)   
      .then((response) => {
        setSelectDepartaments(response.data);
      });

  }, [setSelectDepartaments]);


  return (
    <div className="employee-crud-container">
      <div className="base-card employee-crud-form-card">
        <h1 className="employee-crud-form-title">INFORME OS DADOS</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row employee-crud-inputs-container">
            <div className="col employee-crud-inputs-left-container">

              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório'
                  })}
                  type="text"
                  className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder='Nome do Funcionário'
                  name="name"
                  data-testid="name"
                />
                <div className="invalid-feedback d-block">{errors.name?.message}</div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('email', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email do Funcionário"
                  name="email"
                  data-testid="email"
                />
                <div className="invalid-feedback d-block">{errors.email?.message}</div>
              </div>

              <div className="margin-bottom-30">

                <label htmlFor='department' className='d-none'>Departamento</label>
                <Controller
                  name="department"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}
                      options={selectDepartaments}
                      classNamePrefix="departament-crud-select"
                      getOptionLabel={(department: Department) => department.name}
                      getOptionValue={(department: Department) => String(department.id)}
                      inputId='department'
                    />
                  )}
                />
                {errors.department && (<div className="invalid-feedback d-block">Campo obrigatório</div>)}
              </div>

            </div>

          </div>

          <div className="employee-crud-buttons-container">
            <button
              className="btn btn-outline-danger employee-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary employee-crud-button text-white" type="submit">
              SALVAR
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Form;
