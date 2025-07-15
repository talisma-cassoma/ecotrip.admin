import { RouteModel } from "../../utils/models";
import { MapDriver } from "./MapDriver";
import { StartRouteForm } from "./StartRouteForm";

async function getRoutes(): Promise<RouteModel[]> {
  try {
    const response = await fetch(`${process.env.NEST_API_URL}/routes`, {
      cache: "force-cache",
      next: { tags: ["routes"] },
    });

    // Se o servidor respondeu com erro HTTP, lança exceção para cair no catch
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Falha ao buscar rotas:", err);
    // Retorna array vazio para que a UI continue funcionando
    return [];
  }
}

export default async function DriverPage() {
  const routes = await getRoutes();

  return (
    <div className="flex flex-1 w-full h-full">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>

        <StartRouteForm>
          <select
            id="route_id"
            name="route_id"
            className="mb-2 p-2 border rounded bg-default text-contrast"
            defaultValue=""
          >
            <option value="">Selecione uma rota</option>

            {routes.length > 0 ? (
              routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))
            ) : (
              <option disabled value="">
                Nenhuma rota disponível
              </option>
            )}
          </select>

          <button
            className="bg-main text-primary p-2 rounded text-xl font-bold"
            style={{ width: "100%" }}
          >
            Iniciar a viagem
          </button>
        </StartRouteForm>
      </div>

      {/* Mantém o componente do mapa normalmente */}
      <MapDriver routeIdElementId="route_id" />
    </div>
  );
}
