import { useQuery } from "@tanstack/react-query";
import {
  POSTemplate,
  Spinner1,
  SpinnerSecundario,
  useAlmacenesStore,
  useEmpresaStore,
  useProductosStore,
  useSucursalesStore,
  useVentasStore,
} from "../index";
import { useCajasStore } from "../store/CajasStore";
import { useCierreCajaStore } from "../store/CierreCajaStore";
import {PantallaAperturaCaja} from "../components/organismos/POSDesign/CajaDesign/PantallaAperturaCaja"
export function POS() {
  const { dataempresa } = useEmpresaStore();
  const { mostrarAlmacenXsucursal } = useAlmacenesStore();
  const { mostrarventasxsucursal } = useVentasStore();
  const { productosItemSelect } = useProductosStore();
  const { sucursalesItemSelectAsignadas, dataSucursales } =
    useSucursalesStore();
  const { buscarProductos, buscador } = useProductosStore();
  const { mostrarCajaXSucursal } = useCajasStore();
  const { mostrarCierreCaja } = useCierreCajaStore();
  useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarProductos({ id_empresa: dataempresa?.id, buscador: buscador }),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  });

  const { isLoading, error } = useQuery({
    queryKey: [
      "mostrar almacen por sucursal",
      sucursalesItemSelectAsignadas?.id_sucursal,
    ],
    queryFn: () =>
      mostrarAlmacenXsucursal({
        id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal,
      }),
  });
  //mostrar cajas por sucursal
  const { data: dataCaja } = useQuery({
    queryKey: [
      "mostrar caja x sucursal",
      { id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal },
    ],
    queryFn: () =>
      mostrarCajaXSucursal({
        id_sucursal: sucursalesItemSelectAsignadas?.id_sucursal,
      }),
    enabled: !!dataempresa,
    refetchOnWindowFocus: false,
  });
  //mostrar cierres de caja
  const {isLoading:isloadingCierreCaja,data:dataCierreCaja,error:errorcierreCaja} = useQuery({
    queryKey: ["mostrar cierre de caja", { id_caja: dataCaja?.id }],
    queryFn: () => mostrarCierreCaja({ id_caja: dataCaja?.id }),
    enabled: !!dataCaja,
  });
   // Mostrar spinner mientras carga la información de caja y cierre de caja

  if (isloadingCierreCaja) {
    return <SpinnerSecundario texto="cargando ventas..." />;
  }
  // Manejar errores
  if (errorcierreCaja) {
    return <span>Error...{errorcierreCaja.message}</span>;
  }
  // Mostrar AperturaCaja si no hay datos de cierre de caja
  if(!dataCierreCaja){
    if(dataCierreCaja===null){
      return <PantallaAperturaCaja/>
    }
  }
  // Mostrar POSTemplate si hay datos en dataCierreCaja
  if(dataCierreCaja!=null){
    return <POSTemplate />;
  }
  
}
