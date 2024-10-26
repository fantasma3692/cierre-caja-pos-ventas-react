import styled from "styled-components";
import { VolverBtn } from "../../../moleculas/VolverBtn";
import { Btn1 } from "../../../moleculas/Btn1";
import { Device } from "../../../../styles/breakpoints";
import { useCierreCajaStore } from "../../../../store/CierreCajaStore";
export function PantallaCierreCaja() {
  const { stateCierreCaja, setStateCierraCaja } = useCierreCajaStore();
  if (!stateCierreCaja) {
    return;
  }
  return (
    <Container>
      <VolverBtn funcion={setStateCierraCaja} />

      <Fechas>
        Corte de caja desde: 12/10/2024 09:27:18 Hasta: 21/10/2024 07:37:17
      </Fechas>
      <Datos>
        <section>
          Ventas Totales: <span>23</span>
        </section>
        <section>
          Efectivo en CAJA: <span>23</span>
        </section>
      </Datos>
      <Division></Division>

      <Resumen>
        <Tablas>
          <Tabla>
            <h4>Dinero en CAJA</h4>
            <ul>
              <li>
                Fondo de caja: <span>0</span>
              </li>
              <li>
                Ventas en efectivo: <span>23</span>
              </li>
              <li>
                Cobros en efectivo: <span>0</span>
              </li>
              <li>
                Cobros con Tarjeta: <span>0</span>
              </li>
              <li>
                Pagos en efectivo: <span>0</span>
              </li>
              <li>
                Ingresos varios: <span>0</span>
              </li>
              <li>
                Gastos varios: <span>0</span>
              </li>
              <li className="total">
                <Divider />
                23
              </li>
            </ul>
          </Tabla>
          <DivisionY />
          <Tabla>
            <h4>Ventas Totales</h4>
            <ul>
              <li>
                En Efectivo: <span>23</span>
              </li>
              <li>
                Con Tarjeta: <span>0</span>
              </li>
              <li>
                A Crédito: <span>0</span>
              </li>
              <li className="total">
                <Divider />
                23
              </li>
            </ul>
          </Tabla>
          <DivisionY />
          <Tabla>
            <h4>Créditos Aperturados</h4>
            <ul>
              <li>
                Por Cobrar: <span>0</span>
              </li>
              <li>
                Por Pagar: <span>0</span>
              </li>
            </ul>
          </Tabla>
        </Tablas>
      </Resumen>
      <Btn1
        titulo={"CERRAR CAJA"}
        color="#ffffff"
        border="2px"
        bgcolor="#e88018"
      />
    </Container>
  );
}

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color2};
  margin-right: 10px;
`;
const DivisionY = styled.span`
  width: 1px;
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
  text-align: center;
  display: none;
  border-left: 1px dashed ${({ theme }) => theme.color2};
  height: 95%;
  @media ${Device.tablet} {
    display: block;
  }
`;
const Division = styled.span`
  background-color: ${({ theme }) => theme.color2};
  height: 1px;
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
  text-align: center;
  display: block;
  width: 95%;
`;
// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal || "#fff"};
  gap: 20px;
  position: absolute;
  width: 100%;
  justify-content: center;
  z-index: 10;
`;

const VolverWrapper = styled.div`
  align-self: flex-start;
`;

const Fechas = styled.p`
  font-size: 14px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Resumen = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Datos = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-around;
  width: 100%;
`;

const Tablas = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Tabla = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 120%;
  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .total {
    font-weight: bold;
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  }
`;
