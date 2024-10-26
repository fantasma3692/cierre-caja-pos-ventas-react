import Swal from "sweetalert2";
import { supabase } from "./supabase.config";
const tabla = "cierrecaja";
const tabla2 = "ingresos_salidas_caja";
export async function MostrarCierreCajaAperturada(p) {
    const { data } = await supabase
      .from(tabla)
      .select()
      .eq("id_caja", p.id_caja)
      .eq("estado", 0)
      .maybeSingle();
    return data;
  }
  export async function InsertarIngresoSalidaCaja(p) {
    const { error } = await supabase.from(tabla2).insert(p);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...Ingreso de dinero " + error.message,
        text: error.message,
      });
      return;
    }
  }
  export async function AperturarCierreCaja(p) {
    const { error, data } = await supabase
      .from(tabla)
      .insert(p)
      .select()
      .maybeSingle();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...Cierre caja",
        text: error.message,
      });
      return;
    }
    return data;
  }