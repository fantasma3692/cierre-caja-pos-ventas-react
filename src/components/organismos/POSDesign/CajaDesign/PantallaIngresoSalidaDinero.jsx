import styled from "styled-components";
import { useCierreCajaStore } from "../../../../store/CierreCajaStore";
import { VolverBtn } from "../../../moleculas/VolverBtn";
import { InputText2 } from "../../formularios/InputText2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Btn1 } from "../../../moleculas/Btn1";
import { useCajasStore } from "../../../../store/CajasStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
export function PantallaIngresoSalidaDinero() {
  const { tipoRegistro, setStateIngresoSalida, insertarIngresoSalidaCaja } =
    useCierreCajaStore();
  const [startDate, setStartDate] = useState(new Date());
  const { dataCaja } = useCajasStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const insertar = async (data) => {
    const p = {
      fecha: startDate,
      monto: parseFloat(data.monto),
      descripcion: data.motivo,
      id_caja: dataCaja?.id,
      tipo: tipoRegistro,
    };
    
    await insertarIngresoSalidaCaja(p);
 
  };
  const { isPending, mutate: doInsertar,error } = useMutation({
    mutationKey: ["insertar ingresos salidas caja"],
    mutationFn: insertar,
    onSuccess: () => {
      toast.success("🎉 Registrado!!!");
      
      reset();
    },
    onError: () => {
      toast.error("Error al registrar  !!! ");
    },
  });
  const manejadorEnvio = (data) => {
    doInsertar(data);
    
  };

  return (
    <Container>
      <VolverBtn funcion={setStateIngresoSalida} />

      <span className="title">
        {tipoRegistro === "ingreso"
          ? "INGRESAR DINERO A CAJA"
          : "RETIRAR DINERO DE CAJA"}
      </span>
      <form onSubmit={handleSubmit(manejadorEnvio)}>
        <section className="area1">
          <span>Monto:</span>
          <InputText2>
            <input
              className="form__field"
              placeholder="0.00"
              type="number"
              {...register("monto", { required: true })}
            />
            {
              errors.monto?.type==="required" && <p>Campon requerido</p>
            }
          </InputText2>

          <StyledDatePickerWrapper>
            <StyledDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccionar Fecha"
            />
          </StyledDatePickerWrapper>
          <span>Motivo (puede estar en blanco)</span>
          <InputText2>
            <textarea className="form__field" rows="3" placeholder="motivo" type="text"  {...register("motivo")} />
          </InputText2>
          <article className="contentbtn">
            <Btn1
              titulo={"REGISTRAR"}
              color="#ffffff"
              border="2px"
              bgcolor="#1da939"
            />
          </article>
        </section>
      </form>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  position: absolute;
  background-color: ${({ theme }) => theme.bgtotal};
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    font-size: 25px;
    font-weight: bold;
  }
  .area1 {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .contentbtn {
      margin-top: 15px;
      display: flex;
      gap: 12px;
    }
  }
`;
const StyledDatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.color2};
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0px 0px 5px ${({ theme }) => theme.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
`;
