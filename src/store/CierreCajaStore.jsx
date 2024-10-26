import { create } from "zustand";
import {
  MostrarCierreCajaAperturada,
  AperturarCierreCaja,
  InsertarIngresoSalidaCaja,
} from "../supabase/crudCierresCaja";
export const useCierreCajaStore = create((set) => ({
  stateIngresoSalida:false,
  setStateIngresoSalida: (state) => set({ stateIngresoSalida: !state }),
  
  stateCierreCaja: false,
  setStateCierraCaja: (state) => set({ stateCierreCaja: !state }),
  tipoRegistro: "",
  setTipoRegistro: (p) => set({ tipoRegistro: p }),
  dataCierreCaja: null,
  mostrarCierreCaja: async (p) => {
    const response = await MostrarCierreCajaAperturada(p);
    set({ dataCierreCaja: response });
    return response;
  },
  aperturarcaja: async (p) => {
    const response = await AperturarCierreCaja(p);
    set({ dataCierreCaja: response });
    return response;
  },
  insertarIngresoSalidaCaja: async (p) => {
    await InsertarIngresoSalidaCaja(p);
  },
}));
