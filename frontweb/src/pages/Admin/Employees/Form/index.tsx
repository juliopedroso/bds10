import { Controller, useForm } from 'react-hook-form';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { Employee } from 'types/employee';
import Select from 'react-select';
const Form = () => {

  const history = useHistory();
  const handleCancel = () => {
    history.push("/admin/employees");
  };
  const { register, formState: { errors }, control } = useForm<Employee>();


  const options = [
    { value: 'sales', label: 'Sales' },
    { value: 'traning', label: 'Traning' },
    { value: 'management', label: 'Management' }
  ]

  return (
    <div className="employee-crud-container">
      <div className="base-card employee-crud-form-card">
        <h1 className="employee-crud-form-title">INFORME OS DADOS</h1>

        <form >
          <div className="row employee-crud-inputs-container">
            <div className="col employee-crud-inputs-left-container">

              <div className="margin-bottom-30">
                <input type="text"
                  className="form-control base-input is-invalid"
                  placeholder='Nome do Funcionário'
                />
                <div className="invalid-feedback d-block">
                  Mensagem de erro
                </div>
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
                  type="text"
                  className={`form-control base-input ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email do Funcionário"
                  name="username"
                />
                <div className="invalid-feedback d-block">{errors.email?.message}</div>
              </div>
              <div className="margin-bottom-30">

                <label htmlFor='departament' className='d-none'>Departamento</label>
                <Controller
                  name="department"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select {...field}
                      options={options}
                      classNamePrefix="departament-crud-select"
                      //inputId='departaments'
                    />
                  )}
                />
                <div className="invalid-feedback d-block">Campo obrigatório</div>
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
            <button className="btn btn-primary employee-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default Form;
