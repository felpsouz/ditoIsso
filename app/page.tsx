"use client";

import { useEffect, useMemo, useState } from "react";

type Municipio = {
  id: string;
  nome: string;
  x: number; // posição % no mapa (esquerda)
  y: number; // posição % no mapa (topo)
  capital?: boolean;
};

const MUNICIPIOS: Municipio[] = [
  { id: "canide-de-sao-francisco", nome: "Canindé de São Francisco", x: 14, y: 10 },
  { id: "poco-redondo", nome: "Poço Redondo", x: 22, y: 18 },
  { id: "porto-da-folha", nome: "Porto da Folha", x: 30, y: 20 },
  { id: "nossa-senhora-da-gloria", nome: "Nossa Senhora da Glória", x: 27, y: 30 },
  { id: "gararu", nome: "Gararu", x: 38, y: 14 },
  { id: "monte-alegre-de-sergipe", nome: "Monte Alegre de Sergipe", x: 18, y: 22 },
  { id: "itabi", nome: "Itabi", x: 24, y: 10 },
  { id: "gracho-cardoso", nome: "Gracho Cardoso", x: 35, y: 27 },
  { id: "feira-nova", nome: "Feira Nova", x: 32, y: 34 },
  { id: "carira", nome: "Carira", x: 29, y: 41 },
  { id: "frei-paulo", nome: "Frei Paulo", x: 39, y: 39 },
  { id: "nossa-senhora-aparecida", nome: "Nossa Senhora Aparecida", x: 34, y: 46 },
  { id: "pedra-mole", nome: "Pedra Mole", x: 23, y: 36 },
  { id: "pinhao", nome: "Pinhão", x: 20, y: 43 },
  { id: "ribeiropolis", nome: "Ribeirópolis", x: 37, y: 33 },
  { id: "propria", nome: "Propriá", x: 57, y: 12 },
  { id: "neopolis", nome: "Neópolis", x: 65, y: 9 },
  { id: "ilha-das-flores", nome: "Ilha das Flores", x: 70, y: 6 },
  { id: "brejo-grande", nome: "Brejo Grande", x: 76, y: 4 },
  { id: "cedro-de-sao-joao", nome: "Cedro de São João", x: 52, y: 15 },
  { id: "canhoba", nome: "Canhoba", x: 46, y: 12 },
  { id: "amparo-de-sao-francisco", nome: "Amparo de São Francisco", x: 55, y: 7 },
  { id: "nossa-senhora-de-lourdes", nome: "Nossa Senhora de Lourdes", x: 43, y: 17 },
  { id: "telha", nome: "Telha", x: 49, y: 19 },
  { id: "santana-do-sao-francisco", nome: "Santana do São Francisco", x: 60, y: 17 },
  { id: "japaratuba", nome: "Japaratuba", x: 62, y: 27 },
  { id: "japoata", nome: "Japoatã", x: 54, y: 25 },
  { id: "pacatuba", nome: "Pacatuba", x: 67, y: 22 },
  { id: "pirambu", nome: "Pirambu", x: 72, y: 30 },
  { id: "sao-francisco", nome: "São Francisco", x: 62, y: 20 },
  { id: "aquidaba", nome: "Aquidabã", x: 42, y: 25 },
  { id: "cumbe", nome: "Cumbe", x: 47, y: 30 },
  { id: "malhada-dos-bois", nome: "Malhada dos Bois", x: 44, y: 23 },
  { id: "muribeca", nome: "Muribeca", x: 49, y: 33 },
  { id: "nossa-senhora-das-dores", nome: "Nossa Senhora das Dores", x: 47, y: 35 },
  { id: "sao-miguel-do-aleixo", nome: "São Miguel do Aleixo", x: 37, y: 30 },
  { id: "areia-branca", nome: "Areia Branca", x: 37, y: 55 },
  { id: "campo-do-brito", nome: "Campo do Brito", x: 42, y: 57 },
  { id: "itabaiana", nome: "Itabaiana", x: 44, y: 50 },
  { id: "macambira", nome: "Macambira", x: 39, y: 60 },
  { id: "malhador", nome: "Malhador", x: 47, y: 55 },
  { id: "moita-bonita", nome: "Moita Bonita", x: 44, y: 45 },
  { id: "sao-domingos", nome: "São Domingos", x: 49, y: 47 },
  { id: "lagarto", nome: "Lagarto", x: 44, y: 64 },
  { id: "riachao-do-dantas", nome: "Riachão do Dantas", x: 49, y: 71 },
  { id: "poco-verde", nome: "Poço Verde", x: 34, y: 69 },
  { id: "simao-dias", nome: "Simão Dias", x: 37, y: 57 },
  { id: "tobias-barreto", nome: "Tobias Barreto", x: 31, y: 76 },
  { id: "capela", nome: "Capela", x: 54, y: 40 },
  { id: "divina-pastora", nome: "Divina Pastora", x: 51, y: 42 },
  { id: "santa-rosa-de-lima", nome: "Santa Rosa de Lima", x: 56, y: 44 },
  { id: "siriri", nome: "Siriri", x: 53, y: 37 },
  { id: "carmopolis", nome: "Carmópolis", x: 61, y: 35 },
  { id: "general-maynard", nome: "General Maynard", x: 58, y: 40 },
  { id: "laranjeiras", nome: "Laranjeiras", x: 55, y: 47 },
  { id: "maruim", nome: "Maruim", x: 58, y: 42 },
  { id: "riachuelo", nome: "Riachuelo", x: 53, y: 50 },
  { id: "rosario-do-catete", nome: "Rosário do Catete", x: 56, y: 50 },
  { id: "santo-amaro-das-brotas", nome: "Santo Amaro das Brotas", x: 61, y: 42 },
  { id: "aracaju", nome: "Aracaju", x: 70, y: 51, capital: true },
  { id: "barra-dos-coqueiros", nome: "Barra dos Coqueiros", x: 73, y: 46 },
  { id: "nossa-senhora-do-socorro", nome: "Nossa Senhora do Socorro", x: 63, y: 51 },
  { id: "sao-cristovao", nome: "São Cristóvão", x: 66, y: 56 },
  { id: "estancia", nome: "Estância", x: 61, y: 70 },
  { id: "indiaroba", nome: "Indiaroba", x: 58, y: 80 },
  { id: "itaporanga-d-ajuda", nome: "Itaporanga d'Ajuda", x: 63, y: 61 },
  { id: "santa-luzia-do-itanhy", nome: "Santa Luzia do Itanhy", x: 55, y: 78 },
  { id: "araua", nome: "Arauá", x: 51, y: 65 },
  { id: "boquim", nome: "Boquim", x: 53, y: 68 },
  { id: "cristinapolis", nome: "Cristinápolis", x: 53, y: 79 },
  { id: "itabaianinha", nome: "Itabaianinha", x: 43, y: 70 },
  { id: "pedrinhas", nome: "Pedrinhas", x: 48, y: 60 },
  { id: "salgado", nome: "Salgado", x: 48, y: 73 },
  { id: "tomar-do-geru", nome: "Tomar do Geru", x: 46, y: 80 },
  { id: "umbauba", nome: "Umbaúba", x: 50, y: 85 },
];

const TOTAL = MUNICIPIOS.length; // 75
const STORAGE_KEY = "expedicao-sergipe-visitados";

function normalize(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Chave "só letras" pra casar o nome do IBGE com o nosso, ignorando acento,
// apóstrofo, espaço, maiúscula etc. Ex: "Itaporanga d'Ajuda" -> "itaporangadajuda"
function nameKey(str: string) {
  return normalize(str).replace(/[^a-z]/g, "");
}

const NOME_PARA_ID: Record<string, string> = Object.fromEntries(
  MUNICIPIOS.map((m) => [nameKey(m.nome), m.id])
);

// Malha oficial dos municípios de Sergipe (código IBGE 28), derivada da
// malha territorial do IBGE. Fonte: github.com/tbrugz/geodata-br (CC0).
const RAW_GEOJSON_URL =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-28-mun.json";

type GeoFeature = {
  type: "Feature";
  properties: { id?: string; name?: string; description?: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};
type GeoCollection = { type: "FeatureCollection"; features: GeoFeature[] };

type MapPath = { id: string | null; nome: string; d: string };

// Projeta lon/lat em coordenadas de SVG (equiretangular simples, escala
// única nos dois eixos pra não distorcer o formato real do estado) e monta
// o atributo "d" de cada município, já pronto pra desenhar.
function buildMapPaths(geo: GeoCollection): { paths: MapPath[]; width: number; height: number } {
  let minLon = Infinity,
    maxLon = -Infinity,
    minLat = Infinity,
    maxLat = -Infinity;

  // Coordenadas de um GeoJSON Polygon/MultiPolygon vêm em arrays aninhados
  // de profundidade variável ([lon,lat] no fundo), por isso o "any" aqui.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eachCoord = (fn: (lon: number, lat: number) => void, coords: any) => {
    if (typeof coords[0] === "number") {
      fn(coords[0], coords[1]);
    } else {
      coords.forEach((c: unknown) => eachCoord(fn, c));
    }
  };

  geo.features.forEach((f) => {
    eachCoord((lon, lat) => {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }, f.geometry.coordinates);
  });

  const targetWidth = 800;
  const scale = targetWidth / (maxLon - minLon);
  const width = targetWidth;
  const height = (maxLat - minLat) * scale;

  const project = (lon: number, lat: number): [number, number] => [
    (lon - minLon) * scale,
    (maxLat - lat) * scale, // inverte o eixo Y (lat cresce pra cima, SVG cresce pra baixo)
  ];

  const ringToPath = (ring: number[][]) =>
    ring
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z";

  const paths: MapPath[] = geo.features.map((f) => {
    const polygons: number[][][][] =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates as number[][][]]
        : (f.geometry.coordinates as number[][][][]);

    const d = polygons
      .map((poly) => poly.map((ring) => ringToPath(ring)).join(" "))
      .join(" ");

    const nome = f.properties.name || f.properties.description || "";
    return { id: NOME_PARA_ID[nameKey(nome)] ?? null, nome, d };
  });

  return { paths, width, height };
}

export default function Home() {
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Contorno real dos municípios (carregado do IBGE em tempo de execução).
  // Enquanto não chega, o mapa cai pro contorno aproximado como fallback.
  const [mapPaths, setMapPaths] = useState<MapPath[] | null>(null);
  const [mapSize, setMapSize] = useState<{ width: number; height: number } | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(RAW_GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Falha ao buscar a malha do IBGE");
        return r.json();
      })
      .then((geo: GeoCollection) => {
        if (cancelled) return;
        const { paths, width, height } = buildMapPaths(geo);
        setMapPaths(paths);
        setMapSize({ width, height });
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Carrega do localStorage ao montar
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setVisited(JSON.parse(raw));
    } catch {
      // localStorage indisponível — segue com estado vazio
    } finally {
      setLoaded(true);
    }
  }, []);

  // Salva sempre que mudar (depois do carregamento inicial)
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    } catch {
      // ignora falha de storage
    }
  }, [visited, loaded]);

  function toggle(id: string) {
    setVisited((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  function resetAll() {
    if (confirm("Desmarcar todos os municípios visitados?")) {
      setVisited({});
    }
  }

  const count = Object.keys(visited).length;
  const pct = Math.round((count / TOTAL) * 100);

  const listaFiltrada = useMemo(() => {
    const arr = [...MUNICIPIOS].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    if (!search) return arr;
    return arr.filter((m) => normalize(m.nome).includes(normalize(search)));
  }, [search]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        {/* Cabeçalho */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-xl">
              🧭
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-black dark:text-zinc-50">
                Expedição Sergipe
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Clique num município para marcar que já foram.
              </p>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-black/[.08] bg-white p-4 dark:border-white/[.1] dark:bg-zinc-950">
          <div className="whitespace-nowrap text-2xl font-extrabold text-black dark:text-zinc-50">
            {count}
            <span className="text-sm font-semibold text-zinc-400"> /{TOTAL}</span>
          </div>
          <div className="h-2.5 min-w-[160px] flex-1 overflow-hidden rounded-full bg-black/[.08] dark:bg-white/[.1]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="whitespace-nowrap text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            {pct}%
          </div>
          <button
            onClick={resetAll}
            className="rounded-lg border border-black/[.08] px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-rose-300 hover:text-rose-500 dark:border-white/[.1] dark:text-zinc-400"
          >
            Zerar tudo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          {/* Mapa */}
          <div className="relative overflow-hidden rounded-2xl border border-black/[.08] bg-zinc-100 dark:border-white/[.1] dark:bg-zinc-950">
            <div
              className="relative h-[440px] sm:h-[560px]"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 55%, rgba(56,130,190,.16), transparent 55%)",
              }}
            >
              {mapPaths && mapSize ? (
                // Contorno real (IBGE): cada município é o polígono oficial dele.
                <svg
                  viewBox={`0 0 ${mapSize.width.toFixed(1)} ${mapSize.height.toFixed(1)}`}
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute inset-0 h-full w-full"
                >
                  {mapPaths.map((p, i) => {
                    const on = !!(p.id && visited[p.id]);
                    return (
                      <path
                        key={p.id ?? `${p.nome}-${i}`}
                        d={p.d}
                        fillRule="evenodd"
                        onClick={() => p.id && toggle(p.id)}
                        vectorEffect="non-scaling-stroke"
                        className={[
                          p.id ? "cursor-pointer" : "pointer-events-none",
                          "stroke-black/25 transition-colors dark:stroke-black/40",
                          on ? "fill-emerald-500 hover:fill-emerald-400" : "fill-rose-400 hover:fill-rose-300",
                        ].join(" ")}
                        strokeWidth={1}
                      >
                        <title>
                          {p.nome}
                          {on ? " — já fomos" : ""}
                        </title>
                      </path>
                    );
                  })}
                </svg>
              ) : (
                <>
                  {/* Contorno aproximado, usado enquanto a malha oficial carrega (ou se a busca falhar) */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <polygon
                      points="16,6 40,5 50,3 58,4 68,3 78,2 83,9 79,18 75,27 77,35 75,45 77,51 70,59 66,67 62,75 56,85 51,91 44,87 38,81 30,79 24,69 18,59 14,47 10,35 10,23 12,12"
                      className="fill-zinc-200 stroke-black/10 dark:fill-zinc-900 dark:stroke-white/10"
                      strokeWidth="0.6"
                    />
                  </svg>

                  {MUNICIPIOS.map((m) => {
                    const on = !!visited[m.id];
                    return (
                      <button
                        key={m.id}
                        onClick={() => toggle(m.id)}
                        title={`${m.nome}${on ? " — já fomos" : ""}`}
                        style={{ left: `${m.x}%`, top: `${m.y}%` }}
                        className={[
                          "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-md border border-black/20 shadow transition-transform hover:z-20 hover:scale-125",
                          m.capital ? "h-[18px] w-[18px] rounded-full" : "h-[14px] w-[14px]",
                          on ? "bg-emerald-500" : "bg-rose-400",
                        ].join(" ")}
                      />
                    );
                  })}

                  {!mapError && (
                    <div className="pointer-events-none absolute inset-x-0 top-2 text-center text-[11px] text-zinc-400 dark:text-zinc-600">
                      Carregando contorno oficial do IBGE…
                    </div>
                  )}
                </>
              )}

              <div className="pointer-events-none absolute right-[6%] top-[45%] text-[11px] italic text-zinc-400 dark:text-zinc-600">
                Oceano
                <br />
                Atlântico
              </div>
              <div className="pointer-events-none absolute right-[10%] top-[2%] text-[9px] tracking-[.14em] text-zinc-400 dark:text-zinc-600">
                ALAGOAS
              </div>
              <div className="pointer-events-none absolute left-[2%] top-[46%] text-[9px] tracking-[.14em] text-zinc-400 dark:text-zinc-600">
                BAHIA
              </div>

              {/* Legenda */}
              <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1.5 rounded-lg border border-black/[.08] bg-white/90 px-3 py-2 text-xs text-zinc-500 backdrop-blur dark:border-white/[.1] dark:bg-zinc-900/90 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Já fomos
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-rose-400" /> Ainda não
                </div>
              </div>
            </div>
          </div>

          {/* Busca + lista */}
          <div className="overflow-hidden rounded-2xl border border-black/[.08] bg-white dark:border-white/[.1] dark:bg-zinc-950">
            <div className="border-b border-black/[.08] p-3 dark:border-white/[.1]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar município..."
                className="w-full rounded-lg border border-black/[.08] bg-zinc-50 px-3 py-2 text-sm outline-none dark:border-white/[.1] dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
            <ul className="max-h-[480px] overflow-y-auto p-2">
              {listaFiltrada.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-zinc-400">
                  Nenhum município encontrado.
                </li>
              )}
              {listaFiltrada.map((m) => {
                const on = !!visited[m.id];
                return (
                  <li
                    key={m.id}
                    onClick={() => toggle(m.id)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/[.03] dark:hover:bg-white/[.06]"
                  >
                    <span
                      className={[
                        "flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-md border text-[11px]",
                        on
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-black/20 dark:border-white/20",
                      ].join(" ")}
                    >
                      {on ? "✓" : ""}
                    </span>
                    <span
                      className={
                        on
                          ? "text-sm font-medium text-black dark:text-zinc-50"
                          : "text-sm text-zinc-500 dark:text-zinc-400"
                      }
                    >
                      {m.nome}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}